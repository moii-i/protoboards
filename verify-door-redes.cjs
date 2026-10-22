/* Validate the OPTIONAL SIP9 variant against its RENDERED breadboard wires.
   This is Boolean/physical-coordinate verification, not a Proteus simulation. */
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const ctx=vm.createContext({window:{}});
vm.runInContext(fs.readFileSync('protoboard-ah/puerta-redes-model.js','utf8')+'\n'+fs.readFileSync('protoboard-ah/puerta-redes-layout.js','utf8')+';window.layout=model;',ctx);
const model=JSON.parse(JSON.stringify(ctx.window.DOOR_MODEL));
const layout=JSON.parse(JSON.stringify(ctx.window.layout));
const physicalParts=model.components.filter(c=>!['rail','junction'].includes(c.type));
const components=new Map(model.components.map(c=>[c.id,c]));
assert.equal(physicalParts.length,31);assert.equal(layout.chips.length,5);assert.equal(layout.arrays.length,3);
assert.deepEqual(Object.keys(layout.boards),['A','B']);
assert.equal(physicalParts.filter(c=>c.type==='resistor-array').length,3);
assert.equal(physicalParts.filter(c=>c.type==='resistor'&&c.ohms===1000).length,5);
assert.equal(physicalParts.filter(c=>c.type==='resistor'&&c.ohms===100000).length,1);
assert.equal(model.resistiveElements.length,30);assert.equal(model.resistiveElements.filter(r=>r.used).length,23);
const boardNames={1:'A',2:'B'},powerRows={'+':'+T','-':'-T',VM:'+B'};
function physical(ref){
  const[id,pText]=ref.split('.'),c=components.get(id),p=Number(pText);
  assert(c,'unknown component '+ref);assert(Number.isInteger(p)&&p>=1&&p<=c.pins,'invalid pin '+ref);
  const half=c.pins/2,h=c.holes?.[p]||{row:p<=half?'f':'e',col:c.col+(p<=half?p-1:c.pins-p)};
  return[boardNames[c.board],powerRows[h.row]||h.row,h.col];
}
function terminal(h){
  if(h[0]==='FUENTE')return'SUPPLY:'+h[1];
  assert(layout.boards[h[0]],'invalid board '+h[0]);assert(h[2]>=1&&h[2]<=63,'invalid column');
  if(h[1].length>1){assert.notEqual(h[2],32,'no contact at split-rail gap');return`STRIP:${h[0]}:${h[1]}:${h[2]<=31?'L':'R'}`;}
  return`STRIP:${h[0]}:${'abcde'.includes(h[1])?'top':'bottom'}:${h[2]}`;
}
const parents=new Map();
function find(ref){if(!parents.has(ref))parents.set(ref,ref);if(parents.get(ref)!==ref)parents.set(ref,find(parents.get(ref)));return parents.get(ref);}
function join(a,b){parents.set(find(a),find(b));}
const used=new Map();
function reserve(h,desc){terminal(h);if(h[0]==='FUENTE')return;const key=h.join(':');assert(!used.has(key),'occupied hole '+key+' '+used.get(key)+' / '+desc);used.set(key,desc);}
// Internal five-hole strips join every real pin and rail anchor to its conductor.
for(const c of model.components)for(let p=1;p<=c.pins;p++){
  const ref=c.id+'.'+p,h=physical(ref);join(ref,terminal(h));
  if(!['rail','junction'].includes(c.type))reserve(h,ref);
}
// Deliberately do not join source.connections here. Only displayed wire endpoints
// form jumper connections, so a wrong rendered endpoint cannot be hidden by the
// correct source netlist.
for(const it of layout.items)if(it.kind==='wire'){
  reserve(it.a,it.id+' origin');reserve(it.b,it.id+' destination');join(terminal(it.a),terminal(it.b));
}
join('VCC','SUPPLY:+5');join('GND','SUPPLY:G5');join('VM','SUPPLY:+6');
const same=(a,b)=>find(a)===find(b);
assert(same('SUPPLY:G6','GND'),'motor and logic negatives must share GND');
for(const w of model.connections)assert(same(w.from,w.to),'rendered wire misses intended net '+w.id+' '+w.from+' / '+w.to);
for(const[a,b]of[['VCC','GND'],['VM','VCC'],['VM','GND']])assert(!same(a,b),'supply short '+a+'/'+b);
for(const r of model.resistiveElements)assert(!same(r.from,r.to),r.id+' resistor bypassed by physical strip/wire');
for(const c of physicalParts.filter(c=>['cap','led','motor'].includes(c.type)))assert(!same(c.id+'.1',c.id+'.2'),c.id+' bypassed');
for(const c of physicalParts.filter(c=>!['dip','display','resistor-array'].includes(c.type))){
  const it=layout.items.find(it=>it.id==='P_'+c.id);assert(it,'missing visible part '+c.id);
  assert.deepEqual(it.a,physical(c.id+'.1'));assert.deepEqual(it.b,physical(c.id+'.2'));
}
for(const array of layout.arrays)for(let p=1;p<=array.pins;p++)assert.deepEqual(array.pinHoles[p],physical(array.id+'.'+p));
const physicalPins=[];for(const c of physicalParts)for(let p=1;p<=c.pins;p++)physicalPins.push(c.id+'.'+p);
for(const ref of model.unconnected){
  assert(!model.connections.some(w=>w.from===ref||w.to===ref),ref+' must have no jumper');
  assert.deepEqual(physicalPins.filter(p=>same(p,ref)),[ref],ref+' unintentionally shares a physical strip/net');
}
for(const[pin,supply]of[
 ['U1.16','VCC'],['U1.8','GND'],['U2.14','VCC'],['U2.7','GND'],['U3.14','VCC'],['U3.7','GND'],['U4.9','GND'],['U4.8','GND'],
 ['U5.16','VCC'],['U5.8','VM'],['U5.4','GND'],['U5.5','GND'],['U5.12','GND'],['U5.13','GND'],['U5.9','GND'],['U5.10','GND'],['U5.15','GND']
])assert(same(pin,supply),pin+' power connection');
for(const pin of[3,4,6,10,11,13])assert(same('U1.'+pin,'GND'));
for(const[array,common]of Object.entries(model.networkCommons))assert(same(array+'.1',common),array+' common');
for(const id of['ABRIR','CERRAR','STOP','FCA','FCC'])assert(same(id+'.1','VCC'),id+' contact supply');
assert(same('LY.1','VCC')&&same('LY.2','RN2.4'));assert(same('LG.1','U2.13')&&same('LG.2','RN3.9'));
assert(same('U5.3','MOTOR.1')&&same('U5.6','MOTOR.2'));
for(const pin of[1,2])for(const net of['VCC','GND','VM'])assert(!same('MOTOR.'+pin,net));
for(const d of['D1','D2'])for(const p of[3,8])assert(same(d+'.'+p,'VCC'));

const nor=[[2,3,1],[5,6,4],[8,9,10],[11,12,13]],inverter=[[1,2],[3,4],[5,6],[9,8],[11,10],[13,12]],mux=[[1,7,[6,5,4,3]],[15,9,[10,11,12,13]]];
const inputs=['ABRIR.2','CERRAR.2','STOP.2','FCA.2','FCC.2'];
const outputs=['U1.7','U1.9',...nor.map(p=>'U2.'+p[2]),...inverter.map(p=>'U3.'+p[1])];
const drivers=new Map();
for(const ref of['VCC','GND',...inputs,'U3.13',...outputs]){assert(!drivers.has(find(ref)),ref+' physically shorts driven output '+drivers.get(find(ref)));drivers.set(find(ref),ref);}
function evaluate(input,blink){
 const values=new Map();
 function set(ref,value){const net=find(ref);if(values.has(net)){assert.equal(values.get(net),value,'conflicting driver '+ref);return false;}values.set(net,value);return true;}
 const get=ref=>values.get(find(ref));set('VCC',1);set('GND',0);
 const A=input&1,C=(input>>1)&1,S=(input>>2)&1,FA=(input>>3)&1,FC=(input>>4)&1;
 [A,C,S,1-FA,1-FC].forEach((v,i)=>set(inputs[i],v));set('U3.13',1-blink);
 for(let pass=0;pass<20;pass++){
  let changed=false;
  for(const[g,o,data]of mux){const enable=get('U1.'+g),a=get('U1.14'),b=get('U1.2');if(enable===1)changed=set('U1.'+o,0)||changed;else if(enable===0&&a!==undefined&&b!==undefined){const v=get('U1.'+data[a+2*b]);if(v!==undefined)changed=set('U1.'+o,v)||changed;}}
  for(const[a,b,o]of nor){const x=get('U2.'+a),y=get('U2.'+b);if(x!==undefined&&y!==undefined)changed=set('U2.'+o,+(x===0&&y===0))||changed;}
  for(const[a,o]of inverter){const x=get('U3.'+a);if(x!==undefined)changed=set('U3.'+o,1-x)||changed;}
  if(!changed)break;assert(pass<19,'physical netlist did not settle');
 }
 const refs=[...[1,2,3,4,5,6,10,11,12,13,14,15].map(p=>'U1.'+p),...nor.flatMap(([a,b])=>['U2.'+a,'U2.'+b]),...inverter.map(([a])=>'U3.'+a),...Array.from({length:8},(_,i)=>'U4.'+(i+1)),...[1,2,7,9,10,15].map(p=>'U5.'+p)];
 refs.forEach(ref=>assert([0,1].includes(get(ref)),'undriven physical input '+ref));return{get,A,C,S,FA,FC};
}
function connectedResistor(ref){const rs=model.resistiveElements.filter(r=>same(r.from,ref)||same(r.to,ref));assert.equal(rs.length,1,ref+' must have exactly one individual resistor');const r=rs[0];assert.equal(r.ohms,1000);return{resistor:r,other:same(r.from,ref)?r.to:r.from};}
function sinkOn(get,ref){if(same(ref,'GND'))return true;for(let ch=1;ch<=8;ch++)if(same(ref,'U4.'+(19-ch)))return get('U4.'+ch)===1;throw Error('no sink for '+ref);}
const pins={a:7,b:6,c:4,d:2,e:1,f:9,g:10};
function segments(get,d){let lit='';for(const s of'abcdefg'){const{other}=connectedResistor('D'+d+'.'+pins[s]);if(sinkOn(get,other))lit+=s;}return lit;}
const expected={OF:['abcdef','aefg'],OP:['abcdef','abefg'],rU:['eg','bcdef'],SP:['acdfg','abefg']};
const red=connectedResistor('LR.1'),yellow=connectedResistor('LY.2'),green=connectedResistor('LG.2');
assert(same(red.other,'STOP.2'));assert(same(yellow.other,'U4.13'));assert(same(green.other,'GND'));
for(let i=0;i<5;i++){const pulls=model.resistiveElements.filter(r=>(same(r.from,inputs[i])&&same(r.to,'GND'))||(same(r.to,inputs[i])&&same(r.from,'GND')));assert.equal(pulls.length,1,'one physical pull-down for '+inputs[i]);assert.equal(pulls[0].ohms,1000);}
let cases=0;
for(let input=0;input<32;input++)for(let blink=0;blink<2;blink++){
 const{get,A,C,S,FA,FC}=evaluate(input,blink),MA=+(A&&!C&&!FA&&!S),MC=+(C&&!A&&!FC&&!S),M=MA|MC,label=S?'SP':M?'rU':FA?'OP':'OF',tag=`input=${input} blink=${blink}`;
 assert.equal(get('U5.2'),MA,tag+' open');assert.equal(get('U5.7'),MC,tag+' close');assert.equal(get('U5.1'),M,tag+' enable');assert(!(MA&&MC),tag+' simultaneous directions');
 assert.deepEqual([segments(get,1),segments(get,2)],expected[label],tag+' display');
 assert.equal(get('LY.1')===1&&sinkOn(get,yellow.other),!!M,tag+' yellow');
 assert.equal(get('LG.1')===1&&sinkOn(get,green.other),!!(FA&&!M&&!S),tag+' green');
 assert.equal(get(red.other)===1&&sinkOn(get,'LR.2'),!!(S&&blink),tag+' red');cases++;
}
for(const[cmd,pin]of[[1,'U5.2'],[2,'U5.7']]){assert.equal(evaluate(cmd,0).get(pin),1);assert.equal(evaluate(cmd|4,0).get('U5.1'),0);assert.equal(evaluate(cmd,0).get(pin),1);assert.equal(evaluate(4,0).get('U5.1'),0);assert.equal(evaluate(0,0).get('U5.1'),0);}
const ro=model.resistiveElements.find(r=>r.id==='RO');assert.equal(ro.ohms,100000);assert(same(ro.from,'U3.12')&&same(ro.to,'U3.13'));assert(same('CT.1','U3.13')&&same('CT.2','GND'));
console.log(`PASS: ${cases} digital cases using rendered breadboard wires and actual five-hole strips; 31 physical components, 3 SIP9 arrays, no duplicate holes/bypassed resistors/floating inputs, all segment and LED outputs, STOP/NC/motor interlock and common source ground.`);
console.log('Boolean and coordinate verification only; Proteus electrical simulation, analog RC timing/current and physical testing remain pending.');
