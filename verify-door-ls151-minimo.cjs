const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const variant=process.argv.includes('--claro')?'ls151-claro':'ls151-minimo';
const ctx=vm.createContext({window:{}});vm.runInContext(fs.readFileSync('protoboard-ah/puerta-'+variant+'-model.js','utf8')+fs.readFileSync('protoboard-ah/puerta-'+variant+'-layout.js','utf8')+';window.layout=model;',ctx);
const src=ctx.window.DOOR_MODEL,m=ctx.window.layout;
function union(){const p=new Map(),find=x=>{if(!p.has(x))p.set(x,x);if(p.get(x)!==x)p.set(x,find(p.get(x)));return p.get(x);};return{find,join:(a,b)=>p.set(find(a),find(b))};}
const physical=union(),logical=union(),used=new Map();
function hole(ref){const[id,pn]=ref.split('.'),c=src.components.find(c=>c.id===id),p=+pn,h=c.holes?.[p]||{col:c.col+(p<=c.pins/2?p-1:c.pins-p),row:p<=c.pins/2?'f':'e'};return[c.board===2?'B':'A',({'+':'+T','-':'-T',VM:'+B'})[h.row]||h.row,h.col];}
const strip=h=>h[0]==='FUENTE'?'SUPPLY:'+h[1]:h[1].length>1?h[0]+':'+h[1]+':'+(h[2]<=31?'L':'R'):h[0]+':'+('abcde'.includes(h[1])?'top':'bottom')+':'+h[2];
const supplies={VCC:'SUPPLY:+5',GND:'SUPPLY:G5',VM:'SUPPLY:+6'},real=r=>supplies[r]||strip(hole(r));
function reserve(h,owner){if(h[0]==='FUENTE')return;assert(m.boards[h[0]],'unknown board '+h[0]);assert(h[2]>=1&&h[2]<=63);assert(!(h[1].length>1&&h[2]===32));const key=h.join(':');assert(!used.has(key),'hole used twice '+key+' '+owner+' '+used.get(key));used.set(key,owner);}
for(const c of src.components.filter(c=>c.type!=='rail'))for(let p=1;p<=c.pins;p++)reserve(hole(c.id+'.'+p),c.id+'.'+p);
for(const i of m.items.filter(i=>i.kind==='wire')){reserve(i.a,i.id);reserve(i.b,i.id);physical.join(strip(i.a),strip(i.b));}
for(const w of src.connections){logical.join(w.from,w.to);assert.equal(physical.find(real(w.from)),physical.find(real(w.to)),'missing '+w.id+' '+w.from+' '+w.to);}
for(const[a,b]of [['VCC','GND'],['VM','GND'],['VCC','VM']])assert.notEqual(physical.find(real(a)),physical.find(real(b)),'supply short');
assert.equal(physical.find('SUPPLY:G5'),physical.find('SUPPLY:G6'));
const seen=new Map();for(const c of src.components.filter(c=>c.type!=='rail'))for(let p=1;p<=c.pins;p++){const ref=c.id+'.'+p,k=physical.find(real(ref)),l=logical.find(ref);if(seen.has(k))assert.equal(seen.get(k).l,l,'unintended copper short '+ref+' '+seen.get(k).ref);else seen.set(k,{l,ref});}
for(const c of src.components.filter(c=>['resistor','led','cap','motor'].includes(c.type)))assert.notEqual(physical.find(real(c.id+'.1')),physical.find(real(c.id+'.2')),'bypassed component '+c.id);
for(const ref of src.unconnected)assert(!src.connections.some(w=>w.from===ref||w.to===ref),'unconnected pin wired '+ref);
assert.equal(Object.keys(m.boards).length,variant==='ls151-claro'?2:1);assert.equal(src.components.filter(c=>c.type==='resistor').length,13);assert(src.components.filter(c=>c.type==='resistor').every(c=>c.ohms===1000));
assert.equal(src.components.filter(c=>c.type==='cap').length,1);assert.equal(src.components.find(c=>c.type==='cap').value,'100 µF');assert.equal(src.components.filter(c=>c.type==='dip').length,5);
const same=(a,b)=>physical.find(real(a))===physical.find(real(b));
for(const[d,r]of [['D1','RDA'],['D2','RDB']]){assert(same(r+'.1','VCC'));assert(same(r+'.2',d+'.3'));assert(same(d+'.3',d+'.8'));assert(!same(d+'.3','VCC'));}
assert(!same('D1.3','D2.3'));
if(src.clearLayout){
 const before={window:{}};vm.runInNewContext(fs.readFileSync('protoboard-ah/puerta-ls151-minimo-model.js','utf8'),before);
 for(const[ref,n]of Object.entries(before.window.DOOR_MODEL.bindings))assert.equal(src.bindings[ref],ref==='U3.13'?'VCC':n,'used electrical net changed '+ref);
 assert.equal(m.interboardConnections.length,7);assert.equal(m.interboardConnections.filter(i=>i.signal).map(i=>i.signal).sort().join(','),'G,M,NM,PA,STOP');
 for(const i of m.items.filter(i=>i.kind==='wire'))for(const h of [i.a,i.b])if(h[0]==='B')assert(h[1]!=='-T'&&h[1]!=='+B'&&!(h[1]==='-B'&&h[2]>31),'unused rail wired '+i.id);
 for(const d of m.displays)for(const i of m.items.filter(i=>i.kind==='wire'))for(const h of [i.a,i.b])if(h[0]==='B'&&Object.values(d.pins).some(p=>p[2]===h[2]))assert(['a','b','h','i','j','+T','-B'].includes(h[1]),'inaccessible hole under display '+i.id);
 const groups=new Map();for(const[ref,net]of Object.entries(src.bindings)){if(!groups.has(net))groups.set(net,[]);groups.get(net).push(strip(hole(ref)));}
 for(const[n,key]of Object.entries(supplies))groups.get(n).push(key);
 groups.get('GND').push('SUPPLY:G6');
 // Removing any jumper must break an actual terminal net, not just a virtual
 // rail reference. This rejects decorative or duplicate wiring.
 for(const removed of m.items.filter(i=>i.kind==='wire')){const u=union();for(const i of m.items.filter(i=>i.kind==='wire'&&i.id!==removed.id))u.join(strip(i.a),strip(i.b));assert([...groups.values()].some(refs=>refs.some(r=>u.find(r)!==u.find(refs[0]))),'unnecessary jumper '+removed.id);}
}
const glyph={O:'abcdef',F:'aefg',P:'abefg',r:'eg',U:'bcdef',S:'acdfg'};
let cases=0;for(let mask=0;mask<32;mask++)for(let blink=0;blink<2;blink++){
 const[A,C,S,PA,PC]=[0,1,2,3,4].map(i=>(mask>>i)&1),values=new Map();
 const set=(ref,v)=>{const k=physical.find(real(ref));if(values.has(k))assert.equal(values.get(k),v,'driver conflict '+ref);values.set(k,v);},get=ref=>values.get(physical.find(real(ref)));
 for(const[r,v]of [['VCC',1],['GND',0],['VM',1],['ABRIR.2',A],['CERRAR.2',C],['STOP.2',S],['FCA.2',PA],['FCC.2',PC]])set(r,v);
 const select=get('U1.11')+2*get('U1.10')+4*get('U1.9'),data=[4,3,2,1,15,14,13,12][select],M=get('U1.7')?0:get('U1.'+data);set('U1.5',M);set('U1.6',1-M);
 for(let pass=0;pass<10;pass++){
  for(const[u,ins,out]of [['U2',[2,3],1],['U2',[5,6],4],['U2',[8,9],10],['U2',[11,12],13],['U3',[1],2],['U3',[3],4],['U3',[5],6],['U3',[9],8],['U3',[11],10],['U3',[13],12]]){const v=ins.map(p=>get(u+'.'+p));if(v.every(x=>x!==undefined))set(u+'.'+out,v.some(Boolean)?0:1);}
 }
 set('U4.3',S?blink:0);assert.equal(get('U4.4'),S);assert.equal(get('U5.9'),1);set('U5.11',get('U5.10'));set('U5.14',get('U5.15'));
 const expectedM=+(!S&&((A&&!C&&PA)||(C&&!A&&PC))),message=S?'SP':expectedM?'rU':PA===0?'OP':'OF';assert.equal(M,expectedM);assert.equal(get('U2.13'),M);assert.equal(get('U5.1'),M);if(M)assert.notEqual(get('U5.2'),get('U5.7'));
 for(let d=1;d<=2;d++){let lit='';for(const seg of 'abcdefg')if(get('D'+d+'.'+src.displayPins[seg])===0)lit+=seg;assert.equal(lit,glyph[message[d-1]],'display '+d+' '+mask);}
 for(const[led,r,expected]of [['LY','R4',!!expectedM],['LG','R7',message==='OP'],['LR','R3',!!(S&&blink)]]){assert(same(led+'.2','GND'));assert(same(r+'.2',led+'.1'));assert.equal(!!get(r+'.1'),expected,led+' '+mask);}
 cases++;
}
// Entire digit current is bounded even if a segment were a short (Vf = 0).
const digitMax=5.25/950*1000,lsBounds={M:digitMax+.6,NM:digitMax+.8,MD:digitMax,H:digitMax+.8,I:digitMax+.4,NT:digitMax,ZERO:digitMax,SB:digitMax,NSB:.4,G:.1,FA:.4};
assert(Object.values(lsBounds).every(ma=>ma<8));
const ledMax=6.3/950*1000;assert(ledMax<7);assert(6.3*6.3/950<.125);
for(let i=0;i<7;i++){const id='R2'+String.fromCharCode(65+i);if(i===0)assert(same(id+'.1','U4.7'));if(i===6)assert(same(id+'.2','U4.6'));else assert(same(id+'.2','R2'+String.fromCharCode(66+i)+'.1'));}
assert(same('C4.1','U4.2')&&same('C4.1','U4.6')&&same('C4.2','GND'));
const frequency=1/(Math.LN2*(1000+2*7000)*100e-6);assert(frequency>.95&&frequency<.98);
const report={variant,digitalCases:cases,boards:Object.keys(m.boards).length,resistors:13,resistorOhms:1000,capacitors:1,timingMicrofarads:100,jumpers:m.items.filter(i=>i.kind==='wire').length,nominalBlinkHz:+frequency.toFixed(3),worstLSLowMilliAmps:lsBounds,checks:['no hole reuse','no accidental copper shorts','all nets continuous','common-anode series limits','independent LED driver channels','STOP and interlock','RC series chain'],pending:['analog simulation','display brightness and off-state levels','power integrity without bypass','physical build']};
fs.writeFileSync('work/'+variant+'-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));
const prep=vm.createContext({window:{}});vm.runInContext(fs.readFileSync('protoboard-ah/component-assembly.js','utf8')+';const model='+JSON.stringify(m)+';window.ComponentAssembly.prepare(model);window.prepared=model;',prep);
assert.equal(prep.window.prepared.items.filter(i=>i.externalLead).length,17);
assert(prep.window.prepared.items.filter(i=>!['wire','link'].includes(i.kind)).every(i=>i.stage===0));
