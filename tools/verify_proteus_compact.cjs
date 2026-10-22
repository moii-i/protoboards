/* Prueba independiente del cableado propuesto; no ejecuta Proteus ni modela corrientes/RC. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const model = require('./proteus_compact_model.cjs');
const components = new Map(model.components.map(c => [c.id, c]));
assert.equal(model.components.length, 31);
assert.equal(model.components.filter(c => c.type === 'dip').length, 5);
assert.equal(model.components.filter(c => c.type === 'resistor-array').length, 3);
assert.equal(model.components.filter(c => c.type === 'resistor' && c.ohms === 1000).length, 5);
assert.equal(model.components.filter(c => c.type === 'resistor' && c.ohms === 100000).length, 1);
assert.equal(model.resistiveElements.length, 30);
assert.equal(model.resistiveElements.filter(r => r.used).length, 23);
for (const id of ['R1a','R1c','R1d','R1f','R2a','R2g','R2c','R2d','R2e','R2f','RP0','RP1','RP2','RP3','RP4','RY','RG'])
  assert(!components.has(id), 'obsolete component ' + id);

const parents = new Map();
function find(ref) { if (!parents.has(ref)) parents.set(ref, ref); if (parents.get(ref) !== ref) parents.set(ref, find(parents.get(ref))); return parents.get(ref); }
function join(a, b) { parents.set(find(a), find(b)); }
for (const w of model.connections) {
  for (const ref of [w.from, w.to]) if (!['VCC', 'GND', 'VM'].includes(ref)) {
    const [id, p] = ref.split('.');
    assert(components.has(id), 'unknown component ' + ref);
    assert(Number(p) >= 1 && Number(p) <= components.get(id).pins, 'invalid pin ' + ref);
  }
  join(w.from, w.to);
}
const same = (a, b) => find(a) === find(b);
for (const [a,b] of [['VCC','GND'],['VM','VCC'],['VM','GND']]) assert(!same(a,b), 'supply short ' + a + '/' + b);
for (const r of model.resistiveElements) assert(!same(r.from, r.to), r.id + ' bypassed by wiring');
for (const c of model.components.filter(c => ['cap','led','motor'].includes(c.type))) assert(!same(c.id+'.1',c.id+'.2'), c.id+' bypassed');
for (const ref of model.unconnected) assert(!model.connections.some(w => w.from === ref || w.to === ref), ref + ' should remain open');
for (const [pin, supply] of [
  ['U1.16','VCC'],['U1.8','GND'],['U2.14','VCC'],['U2.7','GND'],['U3.14','VCC'],['U3.7','GND'],['U4.9','GND'],['U4.8','GND'],
  ['U5.16','VCC'],['U5.8','VM'],['U5.4','GND'],['U5.5','GND'],['U5.12','GND'],['U5.13','GND'],['U5.9','GND'],['U5.10','GND'],['U5.15','GND']
]) assert(same(pin,supply), pin+' supply');
for (const pin of [3,4,6,10,11,13]) assert(same('U1.'+pin,'GND'));
for (const [array,common] of Object.entries(model.networkCommons)) assert(same(array+'.1',common), array+' common');
assert(same('LY.1','VCC') && same('LY.2','RN2.4'));
assert(same('LG.1','U2.13') && same('LG.2','RN3.9'));
assert(same('U5.3','MOTOR.1') && same('U5.6','MOTOR.2'));
for(const pin of [1,2])for(const net of ['VCC','GND','VM'])assert(!same('MOTOR.'+pin,net));
for(const d of ['D1','D2'])for(const p of [3,8])assert(same(d+'.'+p,'VCC'));

const nor = [[2,3,1],[5,6,4],[8,9,10],[11,12,13]], inverter = [[1,2],[3,4],[5,6],[9,8],[11,10],[13,12]], mux = [[1,7,[6,5,4,3]],[15,9,[10,11,12,13]]];
const inputs = ['ABRIR.2','CERRAR.2','STOP.2','FCA.2','FCC.2'];
const outputs = ['U1.7','U1.9',...nor.map(p=>'U2.'+p[2]),...inverter.map(p=>'U3.'+p[1])];
const drivers = new Map();
for (const ref of ['VCC','GND',...inputs,'U3.13',...outputs]) {
  assert(!drivers.has(find(ref)), ref+' shorts driven output '+drivers.get(find(ref)));
  drivers.set(find(ref),ref);
}
function evaluate(input, blink) {
  const values = new Map();
  function set(ref,value) {
    const net=find(ref);
    if(values.has(net)){assert.equal(values.get(net),value,'conflicting driver '+ref);return false;}
    values.set(net,value);return true;
  }
  const get=ref=>values.get(find(ref));
  set('VCC',1);set('GND',0);
  const A=input&1,C=(input>>1)&1,S=(input>>2)&1,FA=(input>>3)&1,FC=(input>>4)&1;
  [A,C,S,1-FA,1-FC].forEach((v,i)=>set(inputs[i],v));set('U3.13',1-blink);
  for(let pass=0;pass<20;pass++){
    let changed=false;
    for(const[g,o,data]of mux){const enable=get('U1.'+g),a=get('U1.14'),b=get('U1.2');if(enable===1)changed=set('U1.'+o,0)||changed;else if(enable===0&&a!==undefined&&b!==undefined){const v=get('U1.'+data[a+2*b]);if(v!==undefined)changed=set('U1.'+o,v)||changed;}}
    for(const[a,b,o]of nor){const x=get('U2.'+a),y=get('U2.'+b);if(x!==undefined&&y!==undefined)changed=set('U2.'+o,+(x===0&&y===0))||changed;}
    for(const[a,o]of inverter){const x=get('U3.'+a);if(x!==undefined)changed=set('U3.'+o,1-x)||changed;}
    if(!changed)break;assert(pass<19,'logic did not settle');
  }
  const refs=[...[1,2,3,4,5,6,10,11,12,13,14,15].map(p=>'U1.'+p),...nor.flatMap(([a,b])=>['U2.'+a,'U2.'+b]),...inverter.map(([a])=>'U3.'+a),...Array.from({length:8},(_,i)=>'U4.'+(i+1)),...[1,2,7,9,10,15].map(p=>'U5.'+p)];
  refs.forEach(ref=>assert([0,1].includes(get(ref)),'undriven input '+ref));
  return {get,A,C,S,FA,FC};
}
function connectedResistor(ref){
  const rs=model.resistiveElements.filter(r=>same(r.from,ref)||same(r.to,ref));
  assert.equal(rs.length,1,ref+' must have exactly one individual resistor');
  const r=rs[0];assert.equal(r.ohms,1000);return {resistor:r,other:same(r.from,ref)?r.to:r.from};
}
function sinkOn(get,ref){if(same(ref,'GND'))return true;for(let ch=1;ch<=8;ch++)if(same(ref,'U4.'+(19-ch)))return get('U4.'+ch)===1;throw Error('not a current sink '+ref);}
const pins={a:7,b:6,c:4,d:2,e:1,f:9,g:10};
function segments(get,d){let lit='';for(const s of 'abcdefg'){const{other}=connectedResistor('D'+d+'.'+pins[s]);if(sinkOn(get,other))lit+=s;}return lit;}
const expected={OF:['abcdef','aefg'],OP:['abcdef','abefg'],rU:['eg','bcdef'],SP:['acdfg','abefg']};
const red=connectedResistor('LR.1'),yellow=connectedResistor('LY.2'),green=connectedResistor('LG.2');
assert(same(red.other,'STOP.2'));assert(same(yellow.other,'U4.13'));assert(same(green.other,'GND'));
for(let i=0;i<5;i++){
  const pulls=model.resistiveElements.filter(r=>(same(r.from,inputs[i])&&same(r.to,'GND'))||(same(r.to,inputs[i])&&same(r.from,'GND')));
  assert.equal(pulls.length,1,'one pulldown for '+inputs[i]);assert.equal(pulls[0].ohms,1000);
}
let checked=0;
for(let input=0;input<32;input++)for(let blink=0;blink<2;blink++){
  const{get,A,C,S,FA}=evaluate(input,blink),FC=(input>>4)&1;
  const MA=+(A&&!C&&!FA&&!S),MC=+(C&&!A&&!FC&&!S),M=MA|MC,label=S?'SP':M?'rU':FA?'OP':'OF',tag='input='+input+' blink='+blink;
  assert.equal(get('U5.2'),MA,tag+' open');assert.equal(get('U5.7'),MC,tag+' close');assert.equal(get('U5.1'),M,tag+' enable');assert(!(MA&&MC),tag+' interlock');
  assert.deepEqual([segments(get,1),segments(get,2)],expected[label],tag+' message '+label);
  assert.equal(get('LY.1')===1&&sinkOn(get,yellow.other),!!M,tag+' yellow');
  assert.equal(get('LG.1')===1&&sinkOn(get,green.other),!!(FA&&!M&&!S),tag+' green');
  assert.equal(get(red.other)===1&&sinkOn(get,'LR.2'),!!(S&&blink),tag+' red');checked++;
}
for(const[cmd,pin]of [[1,'U5.2'],[2,'U5.7']]){
  assert.equal(evaluate(cmd,0).get(pin),1);assert.equal(evaluate(cmd|4,0).get('U5.1'),0);
  assert.equal(evaluate(cmd,0).get(pin),1);assert.equal(evaluate(4,0).get('U5.1'),0);assert.equal(evaluate(0,0).get('U5.1'),0);
}
// RC topology is checked, not its analog oscillation or exact frequency.
const ro=model.resistiveElements.find(r=>r.id==='RO');assert.equal(ro.ohms,100000);
assert(same(ro.from,'U3.12')&&same(ro.to,'U3.13'));assert(same('CT.1','U3.13')&&same('CT.2','GND'));
console.log(`PASS: ${checked} digital cases; 31 physical components, three bussed SIP9 networks, five loose 1k resistors, direct green LED, displays, STOP, NC limits, motor interlock, driven inputs and RC topology.`);
console.log('No actual Proteus electrical simulation; analog timing, currents, contact bounce and physical mounting remain unvalidated.');
fs.writeFileSync(path.join(__dirname,'proteus-compact-verification.json'),JSON.stringify({passed:true,cases:checked,components:model.components.length,simulation:'Boolean netlist only; not Proteus',checkedAt:new Date().toISOString()},null,2));
