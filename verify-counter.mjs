import assert from 'node:assert/strict';
import {model,railColumns,point,dipHole,pulse,indicators,segmentsFor} from './protoboard-ah/contador-modelo.mjs';

const parent=new Map();
const contacts=new Set();
function strip([board,row,column]){
  assert.equal(board,'A');
  if(row.length>1){
    assert.match(row,/^[+-][TB]$/);
    assert(railColumns.includes(column),`No rail hole at ${row}${column}`);
    return row+':'+(column<=31?'left':'right');
  }
  assert.match(row,/^[a-j]$/);
  assert(column>=1&&column<=63);
  return (row<'f'?'top':'bottom')+':'+column;
}
function contact(hole){
  const key=hole.join('/');
  assert(!contacts.has(key),`Occupied hole ${key}`);
  contacts.add(key);
  return strip(hole);
}
function root(key){
  if(!parent.has(key))parent.set(key,key);
  const next=parent.get(key);
  return next===key?key:root(next);
}
function join(a,b){parent.set(root(a),root(b));}

assert.equal(model.boards.A.columns*10+railColumns.length*4,830);
for(const part of model.components)for(const hole of part.holes)contact(hole);
for(const hole of Object.values(model.feeds))contact(hole);
for(const wire of model.items.filter(item=>item.kind==='wire')){
  join(contact(wire.a),contact(wire.b));
  assert.deepEqual(wire.route[0],point(wire.a));
  assert.deepEqual(wire.route.at(-1),point(wire.b));
}

const byNet=new Map(),byRoot=new Map();
for(const {h,net,ref} of model.terminals){
  const key=root(strip(h));
  if(byNet.has(net))assert.equal(key,byNet.get(net),`Disconnected ${net} at ${ref}`);
  if(byRoot.has(key))assert.equal(net,byRoot.get(key),`Short at ${ref}`);
  byNet.set(net,key);byRoot.set(key,net);
}
for(const end of [3,33])for(const side of ['T','B'])for(const [polarity,net] of [['+','VCC'],['-','GND']]){
  assert.equal(root(strip(['A',polarity+side,end])),byNet.get(net));
}

const net=(id,p)=>{
  const chip=model.chips.find(c=>c.id===id);
  const key=root(strip(dipHole(chip,p)));
  return byRoot.get(key);
};
assert.deepEqual([1,2,3,4,5,6,7,8].map(p=>net('U5',p)),['GND','TIEMPO','RELOJ','VCC','CONTROL','TIEMPO','DESCARGA','VCC']);
assert.deepEqual([1,2,3].map(p=>net('U3',p)),['2','8','BORRA_N']);
for(const [id,first,second] of [['U1','RELOJ','1'],['U2','2','4']]){
  assert.deepEqual([1,5].map(p=>net(id,p)),[first,second]);
  for(const p of [2,6])assert.equal(net(id,p),'BORRA_N');
  for(const p of [3,4,7,10,14])assert.equal(net(id,p),'VCC');
  assert.equal(net(id,11),'GND');
}
assert.deepEqual([7,1,2,6,13,12,11,10,9,15,14].map(p=>net('U4',p)),['1','2','4','8','a','b','c','d','e','f','g']);
const display=model.displays[0];
assert.deepEqual(Object.values(display.pins).map(h=>byRoot.get(root(strip(h)))),['e','d','GND','c',undefined,'b','a','GND','f','g']);

let current=0;
for(let i=1;i<=20;i++){
  const next=pulse(current);
  assert.equal(next.value,i%10);
  assert.equal(next.reset,i%10===0);
  current=next.value;
  assert.deepEqual(Object.values(indicators(current).leds),[8,4,2,1].map(bit=>Boolean(current&bit)));
}
assert.equal(segmentsFor[6],'cdefg');
assert.equal(segmentsFor[9],'abcfg');
console.log(`Counter verified: ${byNet.size} connected nets, 830 holes, two complete 0–9 cycles.`);
