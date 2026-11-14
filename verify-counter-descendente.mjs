// Comprueba el contador 9→0 desde los agujeros dibujados: tiras, rieles, cortos,
// patas de cada integrado y la secuencia lógica obtenida de las redes físicas.
import assert from 'node:assert/strict';
import {model,chips,railColumns,point,dipHole,createLogic,indicators,segmentsFor} from './protoboard-ah/contador-descendente-modelo.mjs';

const parent=new Map(),contacts=new Set();
function strip([board,row,column]){
  assert.equal(board,'A');
  if(row.length>1){
    assert.match(row,/^[+-][TB]$/);
    assert(railColumns.includes(column),`No hay agujero de riel en ${row}${column}`);
    return row+':'+(column<=31?'left':'right');
  }
  assert.match(row,/^[a-j]$/);
  assert(column>=1&&column<=63);
  return (row<'f'?'top':'bottom')+':'+column;
}
function contact(hole){
  const key=hole.join('/');
  assert(!contacts.has(key),`Agujero ocupado dos veces: ${key}`);
  contacts.add(key);
  return strip(hole);
}
const root=key=>{if(!parent.has(key))parent.set(key,key);const next=parent.get(key);return next===key?key:root(next);};
const join=(a,b)=>parent.set(root(a),root(b));

assert.equal(model.boards.A.columns*10+railColumns.length*4,830);
for(const part of model.components)for(const hole of part.holes)contact(hole);
for(const hole of Object.values(model.feeds))contact(hole);
const wires=model.items.filter(item=>item.kind==='wire');
for(const wire of wires){
  join(contact(wire.a),contact(wire.b));
  assert.deepEqual(wire.route[0],point(wire.a));
  assert.deepEqual(wire.route.at(-1),point(wire.b));
}
// The tactile switch joins its own pair of legs (same side) across the channel.
const sw=model.items.find(item=>item.partId==='SW1');
join(strip(sw.a),strip(sw.extraPins[0][0]));
join(strip(sw.b),strip(sw.extraPins[1][0]));

const byNet=new Map(),byRoot=new Map();
for(const {h,net,ref} of model.terminals){
  const key=root(strip(h));
  if(byNet.has(net))assert.equal(key,byNet.get(net),`Red desconectada ${net} en ${ref}`);
  if(byRoot.has(key))assert.equal(net,byRoot.get(key),`Corto en ${ref}: ${net} con ${byRoot.get(key)}`);
  byNet.set(net,key);byRoot.set(key,net);
}
for(const end of [3,33])for(const side of ['T','B'])for(const [polarity,net] of [['+','VCC'],['-','GND']]){
  assert.equal(root(strip(['A',polarity+side,end])),byNet.get(net),`Riel ${polarity}${side} sin ${net}`);
}
// Resistors and capacitors never bridge their own two nets.
for(const p of model.items.filter(i=>['res','cap'].includes(i.kind)))assert.notEqual(root(strip(p.a)),root(strip(p.b)),`${p.partId} en cortocircuito`);
assert.notEqual(root(strip(sw.a)),root(strip(sw.b)),'El pulsador queda puenteado');

// Rebuild every pin's net from the physical strips, then run the logic on that netlist.
const physical=chips.map(chip=>({...chip,nets:chip.nets.map((_,i)=>byRoot.get(root(strip(dipHole(chip,i+1))))??null)}));
for(const chip of physical)chip.nets.forEach((n,i)=>assert.equal(n,chips.find(c=>c.id===chip.id).nets[i],`${chip.id}.${i+1}`));
const power={'NE555P':[8,1],'SN74LS73A':[4,11],'SN74LS00N':[14,7],'SN74LS48N':[16,8]};
for(const chip of physical){const [vcc,gnd]=power[chip.label];assert.equal(chip.nets[vcc-1],'VCC',chip.id+' sin VCC');assert.equal(chip.nets[gnd-1],'GND',chip.id+' sin GND');}
// No TTL input of U1–U4 may float.
const inputs={'SN74LS73A':[1,2,3,5,6,7,10,14],'SN74LS00N':[1,2,4,5,9,10,12,13],'SN74LS48N':[1,2,3,4,5,6,7]};
for(const chip of physical)for(const p of inputs[chip.label]||[])assert(chip.nets[p-1],`${chip.id}.${p} flotante`);

const logic=createLogic(physical);
let q=logic.reset();
assert.equal(logic.value(q),9,'CLEAR debe mostrar 9');
const seen=[9];
for(let i=0;i<30;i++){
  const r=logic.fall(q);
  q=r.state;seen.push(r.value);
  for(const t of r.trace)assert(t>=0&&t<=9,'Estado intermedio no válido: '+t);
}
assert.deepEqual(seen.slice(0,11),[9,8,7,6,5,4,3,2,1,0,9]);
for(let i=0;i<seen.length;i++)assert.equal(seen[i],(9-i%10+10)%10);
// Any power-up state reaches the sequence within two pulses and never sticks.
for(let v=0;v<16;v++){
  let s=logic.fromValue(v);
  assert.equal(logic.value(s),v);
  const path=[];
  for(let i=0;i<3;i++){s=logic.fall(s).state;path.push(logic.value(s));}
  assert(path.slice(1).every(x=>x<=9),`El estado ${v} no se corrige: ${path}`);
}
assert.equal(segmentsFor[6],'cdefg');
assert.equal(Object.keys(indicators(8).segments.DS1).length,7);
const gates=physical.find(c=>c.id==='U3').nets.filter(Boolean);
console.log(`Contador 9→0 verificado: ${byNet.size} redes, ${wires.length} cables, 830 agujeros, ${gates.length} patas usadas en U3, tres ciclos completos y 16 estados de arranque.`);
