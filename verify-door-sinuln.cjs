/* Reconstruct the LS variant only from rendered wires and breadboard strips.
   Resistors, capacitors, contacts and IC gates are never treated as jumpers.
   Boolean and physical-coordinate checks do not replace analog/Proteus tests. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const ctx=vm.createContext({window:{}});
vm.runInContext(fs.readFileSync('protoboard-ah/puerta-sinuln-model.js','utf8')+'\n'+fs.readFileSync('protoboard-ah/puerta-sinuln-layout.js','utf8')+';window.layout=model;',ctx);
const model=JSON.parse(JSON.stringify(ctx.window.DOOR_MODEL)),layout=JSON.parse(JSON.stringify(ctx.window.layout));
const parts=model.components.filter(c=>!['rail','junction'].includes(c.type)),components=new Map(model.components.map(c=>[c.id,c]));
assert.equal(parts.length,53);assert.equal(layout.chips.length,6);assert.equal(layout.chips.reduce((n,c)=>n+c.pins,0),80);
assert.equal(parts.filter(c=>c.type==='resistor').length,28);assert.equal(parts.filter(c=>c.type==='cap').length,8);
assert.equal(layout.arrays.length,0);assert.deepEqual(Object.keys(layout.boards),['A','B']);
const resistors=parts.filter(c=>c.type==='resistor').map(c=>({id:c.id,from:c.id+'.1',to:c.id+'.2',ohms:c.ohms}));
assert.equal(resistors.filter(r=>r.ohms===1000).length,20);assert.equal(resistors.filter(r=>r.ohms===470).length,5);
assert.equal(resistors.filter(r=>r.ohms===2200).length,2);assert.equal(resistors.filter(r=>r.ohms===100000).length,1);
const boards={1:'A',2:'B'},rows={'+':'+T','-':'-T',VM:'+B'};
function physical(ref){const[id,pText]=ref.split('.'),c=components.get(id),p=Number(pText);assert(c,'unknown part '+ref);assert(p>=1&&p<=c.pins,'invalid pin '+ref);const half=c.pins/2,h=c.holes?.[p]||{row:p<=half?'f':'e',col:c.col+(p<=half?p-1:c.pins-p)};return[boards[c.board],rows[h.row]||h.row,h.col];}
function terminal(h){if(h[0]==='FUENTE')return'SUPPLY:'+h[1];assert(layout.boards[h[0]],'unknown board');assert(h[2]>=1&&h[2]<=63,'out of board');if(h[1].length>1){assert.notEqual(h[2],32,'split-rail void');return`STRIP:${h[0]}:${h[1]}:${h[2]<=31?'L':'R'}`;}return`STRIP:${h[0]}:${'abcde'.includes(h[1])?'top':'bottom'}:${h[2]}`;}
const parents=new Map(),used=new Map();
function find(x){if(!parents.has(x))parents.set(x,x);if(parents.get(x)!==x)parents.set(x,find(parents.get(x)));return parents.get(x);}
const join=(a,b)=>parents.set(find(a),find(b)),same=(a,b)=>find(a)===find(b);
function reserve(h,label){terminal(h);if(h[0]==='FUENTE')return;const k=h.join(':');assert(!used.has(k),'occupied hole '+k+' '+used.get(k)+' / '+label);used.set(k,label);}
for(const c of model.components)for(let p=1;p<=c.pins;p++){const ref=c.id+'.'+p,h=physical(ref);join(ref,terminal(h));if(!['rail','junction'].includes(c.type))reserve(h,ref);}
// The source netlist is intentionally not joined. Only physical rendered jumpers.
for(const it of layout.items)if(it.kind==='wire'){reserve(it.a,it.id+' source');reserve(it.b,it.id+' destination');join(terminal(it.a),terminal(it.b));}
join('VCC','SUPPLY:+5');join('GND','SUPPLY:G5');join('VM','SUPPLY:+6');
assert(same('SUPPLY:G6','GND'),'common power ground');
for(const w of model.connections)assert(same(w.from,w.to),'wrong rendered net '+w.id+' '+w.from+'/'+w.to);
for(const[a,b]of[['VCC','GND'],['VM','GND'],['VM','VCC']])assert(!same(a,b),'power short '+a+'/'+b);
for(const c of parts.filter(c=>['resistor','cap','led','motor'].includes(c.type)))assert(!same(c.id+'.1',c.id+'.2'),'bypassed '+c.id);
for(const c of parts.filter(c=>!['dip','display'].includes(c.type))){const item=layout.items.find(i=>i.id==='P_'+c.id);assert(item,'missing physical item '+c.id);assert.deepEqual(item.a,physical(c.id+'.1'));assert.deepEqual(item.b,physical(c.id+'.2'));}
const allPins=parts.flatMap(c=>Array.from({length:c.pins},(_,i)=>c.id+'.'+(i+1)));
for(const ref of model.unconnected){assert(!model.connections.some(w=>w.from===ref||w.to===ref),'jumper at unconnected '+ref);assert.deepEqual(allPins.filter(p=>same(p,ref)),[ref],'unused pin shares conductor '+ref);}
for(const[pin,supply]of[['U1.14','VCC'],['U1.7','GND'],['U6.14','VCC'],['U6.7','GND'],['U2.14','VCC'],['U2.7','GND'],['U3.14','VCC'],['U3.7','GND'],['U4.1','GND'],['U4.8','VCC'],['U5.16','VCC'],['U5.8','VM'],...[4,5,12,13,9,10,15].map(p=>['U5.'+p,'GND'])])assert(same(pin,supply),'incorrect supply '+pin);
for(const p of[8,9,11,12])assert(same('U1.'+p,'GND'),'unused NOR input '+p);
for(const p of[10,13])assert(model.unconnected.includes('U1.'+p));
const inputs=['ABRIR.2','CERRAR.2','STOP.2','FCA.2','FCC.2'];
for(let i=0;i<5;i++){assert(same(inputs[i].split('.')[0]+'.1','VCC'));const r=resistors.filter(r=>(same(r.from,inputs[i])&&same(r.to,'GND'))||(same(r.to,inputs[i])&&same(r.from,'GND')));assert.equal(r.length,1,'one pull-down per input');assert.equal(r[0].ohms,470);}
for(const[id,out]of[['RMA','U6.6'],['RMC','U6.11']]){const r=resistors.find(r=>r.id===id);assert.equal(r.ohms,2200);assert((same(r.from,out)&&same(r.to,'VCC'))||(same(r.to,out)&&same(r.from,'VCC')),'pull-up destination '+id);assert(!same(out,'VCC'),'pull-up bypassed');}
assert(same('U5.3','MOTOR.1')&&same('U5.6','MOTOR.2'));assert(!same('MOTOR.1','MOTOR.2'));
for(const p of[1,2])for(const net of['VCC','GND','VM'])assert(!same('MOTOR.'+p,net));
for(const d of['D1','D2'])for(const p of[3,8])assert(same(d+'.'+p,'VCC'));
const nor=[[2,3,1],[5,6,4],[8,9,10],[11,12,13]],and=[[1,2,3],[4,5,6],[9,10,8],[12,13,11]],invert=[[1,2],[3,4],[5,6],[9,8],[11,10],[13,12]];
const outputs=[...['U1','U2'].flatMap(id=>nor.map(p=>id+'.'+p[2])),...and.map(p=>'U6.'+p[2]),...invert.map(p=>'U3.'+p[1])];
const drivers=new Map();for(const ref of['VCC','GND',...inputs,'U4.3',...outputs]){assert(!drivers.has(find(ref)),'shorted drivers '+ref+' / '+drivers.get(find(ref)));drivers.set(find(ref),ref);}
function evaluate(n,blink){const values=new Map();function set(ref,value){const k=find(ref);if(values.has(k)){assert.equal(values.get(k),value,'conflicting drive '+ref);return false;}values.set(k,value);return true;}const get=ref=>values.get(find(ref));set('VCC',1);set('GND',0);const A=n&1,C=(n>>1)&1,S=(n>>2)&1,FA=(n>>3)&1,FC=(n>>4)&1;[A,C,S,1-FA,1-FC].forEach((v,i)=>set(inputs[i],v));set('U4.3',S?blink:0);
 for(let pass=0;pass<20;pass++){let changed=false;for(const id of['U1','U2'])for(const[a,b,o]of nor){const x=get(id+'.'+a),y=get(id+'.'+b);if(x!==undefined&&y!==undefined)changed=set(id+'.'+o,+(x===0&&y===0))||changed;}for(const[a,b,o]of and){const x=get('U6.'+a),y=get('U6.'+b);if(x!==undefined&&y!==undefined)changed=set('U6.'+o,x&y)||changed;}for(const[a,o]of invert){const x=get('U3.'+a);if(x!==undefined)changed=set('U3.'+o,1-x)||changed;}if(!changed)break;assert(pass<19,'logic failed to settle');}
 const refs=[...['U1','U2'].flatMap(id=>nor.flatMap(([a,b])=>[id+'.'+a,id+'.'+b])),...and.flatMap(([a,b])=>['U6.'+a,'U6.'+b]),...invert.map(([a])=>'U3.'+a),'U4.4',...[1,2,7,9,10,15].map(p=>'U5.'+p)];for(const ref of refs)assert([0,1].includes(get(ref)),'floating input '+ref);return{get,A,C,S,FA,FC};}
function resistorAt(ref,ohms=1000){const r=resistors.filter(r=>same(r.from,ref)||same(r.to,ref));assert.equal(r.length,1,'one resistor at '+ref);assert.equal(r[0].ohms,ohms);return same(r[0].from,ref)?r[0].to:r[0].from;}
function sink(get,ref,seen=new Set()){
 const net=find(ref);if(seen.has(net))return false;seen.add(net);
 if(same(ref,'GND'))return true;
 const v=get(ref);if(v!==undefined)return v===0;
 // A shared limiter is a resistor edge, never an electrical short.
 const rs=resistors.filter(r=>same(r.from,ref)||same(r.to,ref));
 const limit=rs.find(r=>r.id==='RL1'||r.id==='RL6');
 assert(limit,'No HC return or mandatory common limiter at '+ref);
 return sink(get,same(limit.from,ref)?limit.to:limit.from,seen);
}
function led(get,id,r){const supply=resistorAt(id+'.1');assert(same(supply,r),'LED supply '+id);return get(supply)===1&&sink(get,id+'.2');}
const dp={a:7,b:6,c:4,d:2,e:1,f:9,g:10},glyph={OF:['abcdef','aefg'],OP:['abcdef','abefg'],rU:['eg','bcdef'],SP:['acdfg','abefg']};
function segments(get,d){return[...'abcdefg'].filter(s=>sink(get,resistorAt('D'+d+'.'+dp[s]))).join('');}
let cases=0;for(let n=0;n<32;n++)for(let blink=0;blink<2;blink++){const{get,A,C,S,FA,FC}=evaluate(n,blink),MA=+(A&&!C&&!FA&&!S),MC=+(C&&!A&&!FC&&!S),M=MA|MC,label=S?'SP':M?'rU':FA?'OP':'OF',tag='n='+n+' blink='+blink;assert.equal(get('U5.2'),MA,tag+' opening');assert.equal(get('U5.7'),MC,tag+' closing');assert.equal(get('U5.1'),M,tag+' enable');assert(!(get('U5.2')&&get('U5.7')),tag+' opposing outputs');assert.deepEqual([segments(get,1),segments(get,2)],glyph[label],tag+' displays');assert.equal(led(get,'LY','VCC'),!!M,tag+' yellow');assert.equal(led(get,'LG','U2.13'),!!(FA&&!M&&!S),tag+' green');assert.equal(led(get,'LR','U4.3'),!!(S&&blink),tag+' red');cases++;}
for(const[cmd,pin]of[[1,'U5.2'],[2,'U5.7']]){assert.equal(evaluate(cmd,0).get(pin),1);assert.equal(evaluate(cmd|4,0).get('U5.1'),0);assert.equal(evaluate(cmd,0).get(pin),1);assert.equal(evaluate(4,0).get('U5.1'),0);assert.equal(evaluate(0,0).get('U5.1'),0);}
const ro=resistors.find(r=>r.id==='RO'),ra=resistors.find(r=>r.id==='RA');
assert.equal(ra.ohms,1000);assert(same(ra.from,'VCC')&&same(ra.to,'U4.7'));assert(same(ro.from,'U4.7')&&same(ro.to,'U4.2'));assert(same('U4.2','U4.6'));assert(same('CT.1','U4.2')&&same('CT.2','GND'));assert(same('U4.4','STOP.2'));assert(same('U3.13','GND'));
for(const [r,driver,branch]of [['RL1','U3.2','R1a.1'],['RL6','U2.1','R2c.1']]){assert.equal(components.get(r).ohms,1000);assert(same(r+'.2',driver));assert(same(r+'.1',branch));assert(!same(driver,branch),'Common limiter bypassed');}
assert(same('CD4.1','VCC')&&same('CD4.2','GND'));
const minR=1000*.95,maxDelta=5.25-1.5,six=maxDelta/(minR+minR/6)+.0001+.000003,three=maxDelta/(minR+minR/3)+.000001,single=maxDelta/minR;
assert(six<.004&&three<.004&&single<.004,'HC output exceeds rated 4mA test current');assert(six+three+single*3<.05,'HC package current');
assert.equal(components.get('U2').label.split(' ')[0],'74HC02');assert.equal(components.get('U3').label.split(' ')[0],'74HC14');
console.log('Conservative HC output bounds: six branches '+(six*1000).toFixed(2)+'mA; three branches '+(three*1000).toFixed(2)+'mA; individual '+(single*1000).toFixed(2)+'mA. LED Vf >=1.5V assumed; analog brightness untested.');
// Paper design margins using TI limits, not measured analog behavior.
const maxInputLow=2*0.0004*(470*1.05),maxInputPower=5.25**2/(470*.95),minOutputHigh=4.75-(2200*1.05)*.000101,maxLowSink=(5.25-.4)/(2200*.95)+.000011;
assert(maxInputLow<.4);assert(maxInputPower<.25);assert(minOutputHigh>4.5);assert(maxLowSink<.004);
console.log(`PASS: ${cases} digital cases reconstructed from displayed wires and real strips; 53 parts, 6 ICs, 28 resistors, no ULN, no occupied-hole reuse or bypasses; STOP/NC/resume/interlock, four messages and LEDs.`);
console.log('Design-margin calculations: input low <= '+maxInputLow.toFixed(3)+' V; output high >= '+minOutputHigh.toFixed(3)+' V; sink load <= '+(maxLowSink*1000).toFixed(2)+' mA.');
console.log('Boolean/coordinate verification and paper margins only. Proteus electrical simulation, actual levels, capacitance, RC timing, contact bounce and physical testing remain pending.');
