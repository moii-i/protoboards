// Comprueba el AGV seguidor de línea desde los agujeros dibujados: tiras, rieles,
// cortos, separación de 5 V y VM, patas de cada integrado, la tabla de verdad
// obtenida de las redes físicas y el recorrido de la simulación en los dos modos.
import assert from 'node:assert/strict';
import {model,chips,leads,columns,railColumns,point,dipHole,createLogic,action} from './protoboard-ah/seguidor-modelo.mjs';
import {createSim,track} from './protoboard-ah/seguidor-sim.mjs';
import {assemblySteps} from './protoboard-ah/seguidor-carro.mjs';
import fs from 'node:fs';

const parent=new Map(),contacts=new Set();
function strip([board,row,column]){
  assert.equal(board,'A');
  if(row.length>1){
    assert.match(row,/^[+-][TB]$/);
    assert(railColumns.includes(column),`No hay agujero de riel en ${row}${column}`);
    return row; // rieles continuos en la protoboard de 400 puntos
  }
  assert.match(row,/^[a-j]$/);
  assert(column>=1&&column<=columns);
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

assert.equal(columns*10+railColumns.length*4,400,'Protoboard de 400 puntos');
for(const part of model.components)for(const hole of part.holes)contact(hole);
const links=model.items.filter(item=>item.kind==='link');
assert.equal(links.length,14,'Tres cables por sensor, dos por motor y dos por batería');
assert(links.every(l=>l.lead&&Array.isArray(l.anchor)),'Cada cable externo tiene su módulo');
for(const l of links)contact(l.a);
const wires=model.items.filter(item=>item.kind==='wire');
for(const wire of wires){
  join(contact(wire.a),contact(wire.b));
  assert.deepEqual(wire.route[0],point(wire.a));
  assert.deepEqual(wire.route.at(-1),point(wire.b));
}
const byNet=new Map(),byRoot=new Map();
for(const {h,net,ref} of model.terminals){
  const key=root(strip(h));
  if(byNet.has(net))assert.equal(key,byNet.get(net),`Red desconectada ${net} en ${ref}`);
  if(byRoot.has(key))assert.equal(net,byRoot.get(key),`Corto en ${ref}: ${net} con ${byRoot.get(key)}`);
  byNet.set(net,key);byRoot.set(key,net);
}
// Tres potenciales: 5 V arriba, VM abajo y una sola tierra en los dos rieles azules.
assert.equal(root('+T'),byNet.get('VCC'),'Riel +T sin 5 V');
assert.equal(root('+B'),byNet.get('VM'),'Riel +B sin VM');
assert.equal(root('-T'),byNet.get('GND'));assert.equal(root('-B'),byNet.get('GND'),'Rieles de GND sin unir');
assert.notEqual(byNet.get('VCC'),byNet.get('VM'),'5 V y VM unidos');
assert.notEqual(byNet.get('V9'),byNet.get('VCC'),'La pila de 9 V llega a la lógica sin pasar por el 7805');
// Capacitores y el regulador no quedan puenteados por su propia tira.
for(const p of model.items.filter(i=>['cap','reg','slide'].includes(i.kind))){
  const legs=[p.a,...(p.routedPins||[]).map(([h])=>h),p.b].map(h=>root(strip(h)));
  assert.equal(new Set(legs).size,legs.length,`${p.partId} en cortocircuito`);
}
const reg=model.items.find(i=>i.partId==='U3'),sw=model.items.find(i=>i.partId==='SW1');
assert.deepEqual([reg.a,reg.routedPins[0][0],reg.b].map(h=>byRoot.get(root(strip(h)))),['V9','GND','VCC'],'7805: IN, GND, OUT');
assert.deepEqual([sw.a,sw.routedPins[0][0],sw.b].map(h=>byRoot.get(root(strip(h)))),['GND','SEL','VCC'],'SW1: NEGRA = GND, común = SEL, BLANCA = 5 V');

// Patas reconstruidas desde las tiras físicas.
const physical=chips.map(chip=>({...chip,nets:chip.nets.map((_,i)=>byRoot.get(root(strip(dipHole(chip,i+1))))??null)}));
for(const chip of physical)chip.nets.forEach((n,i)=>assert.equal(n,chips.find(c=>c.id===chip.id).nets[i],`${chip.id}.${i+1}`));
const ls86=physical.find(c=>c.label==='SN74LS86N'),l293=physical.find(c=>c.label==='L293D');
assert.equal(ls86.nets[13],'VCC');assert.equal(ls86.nets[6],'GND');
assert.deepEqual([16,8].map(p=>l293.nets[p-1]),['VCC','VM'],'L293D: VCC1 = 5 V y VCC2 = VM');
for(const p of [4,5,12,13])assert.equal(l293.nets[p-1],'GND',`L293D pin ${p} sin GND`);
// Ninguna entrada flotante: cada entrada del 74LS86 y del L293D tiene quien la maneje.
const driven=new Set(['VCC','GND','VM','SEL','SI','SD','MI','MD']);
for(const p of [1,2,4,5,9,10,12,13])assert(driven.has(ls86.nets[p-1]),`74LS86 pin ${p} flotante`);
for(const p of [1,2,7,9,10,15])assert(driven.has(l293.nets[p-1]),`L293D pin ${p} flotante`);
// Cada cable externo llega a la red que dice su etiqueta.
for(const l of links)assert.equal(byRoot.get(root(strip(l.a))),l.net,`${l.label} fuera de su red`);

// Tabla de verdad desde las patas físicas.
const logic=createLogic(physical,leads);
const expected={avanza:[1,1],izquierda:[1,0],derecha:[0,1],alto:[0,0]};
for(const SEL of [0,1])for(const SI of [0,1])for(const SD of [0,1]){
  const li=SI^SEL,ld=SD^SEL,out=logic.evaluate({SI,SD,SEL}),act=action(out.left,out.right);
  assert.deepEqual(expected[act],[li,ld],`SEL ${SEL} SI ${SI} SD ${SD}: ${act}`);
  assert.equal(out.left,ld?'avanza':'freno');assert.equal(out.right,li?'avanza':'freno');
}

// Recorrido: varias vueltas en los dos modos, con motores desiguales y a varias velocidades.
const laps=[];
for(const [mode,SEL] of [['negra',0],['blanca',1]])for(const speed of [250,320,450]){
  const sim=createSim({evaluate:logic.evaluate,speed});sim.reset({mode,selector:SEL});
  for(let i=0;i<60*240&&sim.state.status!=='alto'&&sim.state.status!=='fuera';i++)sim.step(1/240);
  assert.equal(sim.state.status,'corriendo',`${mode} a ${speed} mm/s: ${sim.state.reason}`);
  assert(sim.laps()>3,`${mode} a ${speed} mm/s: solo ${sim.laps().toFixed(2)} vueltas`);
  laps.push(+sim.laps().toFixed(2));
}
// Motor izquierdo 10 % más lento que el derecho: la lógica sigue corrigiendo.
for(const trim of [{left:.9,right:1},{left:1,right:.9}]){
  const uneven=createSim({evaluate:logic.evaluate,speed:320,trim});uneven.reset({mode:'negra',selector:0});
  for(let i=0;i<40*240&&uneven.state.status!=='alto'&&uneven.state.status!=='fuera';i++)uneven.step(1/240);
  assert(uneven.state.status==='corriendo'&&uneven.laps()>2,'Con motores desiguales también da vueltas');
}
// Selector equivocado: los sensores leen la cinta al revés y el carrito frena.
for(const [mode,SEL] of [['negra',1],['blanca',0]]){
  const sim=createSim({evaluate:logic.evaluate});sim.reset({mode,selector:SEL});
  for(let i=0;i<5*240&&sim.state.status!=='alto';i++)sim.step(1/240);
  assert.equal(sim.state.status,'alto',`Selector ${SEL} en pista ${mode} debería frenar`);
}
// Pérdida de línea: sacarlo 45 mm de lado lo detiene.
const lost=createSim({evaluate:logic.evaluate});lost.reset({mode:'negra',selector:0});
for(let i=0;i<2*240;i++)lost.step(1/240);
lost.nudge(45);for(let i=0;i<240;i++)lost.step(1/240);
assert.equal(lost.state.status,'alto','Línea perdida: alto seguro');

// Modelo 3D del ensamblado: un nodo paso_N por etapa y cada paso del visor apunta a uno.
const glb=fs.readFileSync('protoboard-ah/agv/agv-seguidor.glb');
assert.equal(glb.toString('utf8',0,4),'glTF');assert(glb.length<4e6,'GLB demasiado pesado: '+glb.length);
const gltf=JSON.parse(glb.toString('utf8',20,20+glb.readUInt32LE(12)));
const pasos=gltf.nodes.filter(n=>/^paso_[0-9]+$/.test(n.name)).map(n=>n.name);
assert.deepEqual(pasos.sort(),Array.from({length:8},(_,i)=>'paso_'+(i+1)).sort(),'Nodos paso_1…paso_8');
assert(assemblySteps.every(s=>s.parts>=0&&s.parts<pasos.length&&s.camera.length===3&&s.target.length===3&&s.text&&s.need),'Pasos del ensamblado');
assert.equal(assemblySteps.at(-1).parts,pasos.length-1,'El último paso muestra todo el carrito');
console.log(JSON.stringify({passed:true,assemblyModel:{bytes:glb.length,steps:assemblySteps.length,nodes:pasos.length},board:'400 puntos',jumpers:wires.length,externalLeads:links.length,chips:physical.map(c=>c.label),truthTable:8,trackMm:Math.round(track.length),laps,scope:'Lógica booleana, continuidad física sin agujeros compartidos, 5 V separado de VM, entradas manejadas y recorrido geométrico. Velocidad real, calibración de sensores y caída del L293D quedan para la pista real y Proteus.'}));
