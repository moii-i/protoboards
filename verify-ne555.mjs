// Comprueba el NE555 del visor compartido desde los agujeros dibujados: tiras y rieles,
// agujeros únicos, cortos, patas del NE555 en su red, que conserve los agujeros de la
// guía original y que el ritmo del 555 astable cambie con RV1.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {model,chips,dipHole,point,timing,indicators} from './protoboard-ah/ne555-modelo.mjs';

const parent=new Map(),contacts=new Set();
const strip=([board,row,col])=>board==='FUENTE'?'BAT'+row:row.length>1?row:(row<'f'?'top':'bottom')+':'+col;
function contact(h){if(h[0]==='FUENTE')return strip(h);const k=h.join('/');assert(!contacts.has(k),'Agujero ocupado dos veces: '+k);contacts.add(k);assert(h[2]>=1&&h[2]<=30,'Columna fuera de la placa: '+k);return strip(h);}
const root=k=>{if(!parent.has(k))parent.set(k,k);const n=parent.get(k);return n===k?k:root(n);};
const join=(a,b)=>parent.set(root(a),root(b));

for(const part of model.components)for(const h of part.holes)contact(h);
const wires=model.items.filter(i=>i.kind==='wire');
for(const w of wires){join(contact(w.a),contact(w.b));assert.deepEqual(w.route[0],point(w.a));assert.deepEqual(w.route.at(-1),point(w.b));}
// La batería alimenta los rieles: + = VCC, − = GND.
const byNet=new Map(),byRoot=new Map();
for(const {h,net,ref} of [...model.terminals.filter(t=>t.net),{h:['FUENTE','+',0],net:'VCC',ref:'BAT+'},{h:['FUENTE','-',0],net:'GND',ref:'BAT−'}]){
  const k=root(strip(h));
  if(byNet.has(net))assert.equal(k,byNet.get(net),`Red desconectada ${net} en ${ref}`);
  if(byRoot.has(k))assert.equal(net,byRoot.get(k),`Corto en ${ref}: ${net} con ${byRoot.get(k)}`);
  byNet.set(net,k);byRoot.set(k,net);
}
for(const r of ['+T','+B'])assert.equal(byRoot.get(root(r)),'VCC',r+' sin +9 V');
for(const r of ['-T','-B'])assert.equal(byRoot.get(root(r)),'GND',r+' sin GND');
// Cada pata del NE555 en su red (la 5 queda libre).
const u1=chips[0];
u1.nets.forEach((net,i)=>{const k=root(strip(dipHole(u1,i+1)));if(net)assert.equal(byRoot.get(k),net,'U1.'+(i+1));else assert(!byRoot.has(k)||!wires.some(w=>root(strip(w.a))===k),'La pata 5 debe quedar libre');});
// Ninguna resistencia ni LED queda en cortocircuito por su propia tira.
for(const p of model.items.filter(i=>['res','cap','led','pot'].includes(i.kind)))assert.notEqual(root(strip(p.a)),root(strip(p.b)),p.partId+' en cortocircuito');
// Mismos agujeros que la guía original.
const src=fs.readFileSync('protoboard-ah/ne555-model.js','utf8');
const original=Function(src.replace(/^const model=/,'return ').replace(/;\s*window[\s\S]*$/,''))();
const key=h=>h.join('/');
const ours=new Set(model.items.flatMap(i=>[key(i.a),key(i.b)]));
for(const it of original.items)for(const h of [it.a,it.b])assert(ours.has(key(h)),'Se perdió el agujero original '+key(h)+' de '+it.id);
// Ritmo: RV1 más alto = más rápido; la salida alterna los dos LED.
assert(timing(75).high+timing(75).low<timing(25).high+timing(25).low,'RV1 debe acelerar el ritmo');
assert.deepEqual(indicators(1).leds,{D1:false,D2:true});assert.deepEqual(indicators(0).leds,{D1:true,D2:false});
console.log(JSON.stringify({passed:true,wires:wires.length,components:model.components.length,stages:model.stages.length,cycle50:+(timing(50).high+timing(50).low).toFixed(2),scope:'Continuidad física, cortos, patas del NE555, agujeros originales y ritmo calculado. Brillo y tolerancias quedan para la placa real.'}));
