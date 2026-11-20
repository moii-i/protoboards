// Comprueba Letras A–H del visor compartido desde los agujeros dibujados: tiras de las dos
// placas (rieles de A cortados en 31), agujeros únicos, cortos, patas de U1–U7, DIP y display,
// las ocho letras desde las redes físicas y un orden de patas del display distinto al de referencia.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {buildLetras,useRoutes,chips,dipHole,point,defaultPins,patterns,letters,data,segmentsOf,boards} from './protoboard-ah/letras-modelo.mjs';

useRoutes(JSON.parse(fs.readFileSync('protoboard-ah/letras-rutas.json','utf8')));

function check(pins){
  const model=buildLetras(pins);
  const parent=new Map(),contacts=new Set();
  const strip=([b,row,col])=>{if(b==='FUENTE')return 'FUENTE'+row;if(row.length>1){const brk=boards[b].railBreak;return b+row+(brk&&col>brk?'R':'L');}return b+(row<'f'?'top':'bot')+col;};
  const contact=h=>{if(h[0]==='FUENTE')return strip(h);const k=h.join('/');assert(!contacts.has(k),'Agujero ocupado dos veces: '+k);contacts.add(k);assert(h[2]>=1&&h[2]<=boards[h[0]].columns,'Fuera de la placa: '+k);return strip(h);};
  const root=k=>{if(!parent.has(k))parent.set(k,k);const n=parent.get(k);return n===k?k:root(n);};
  const join=(a,b)=>parent.set(root(a),root(b));
  for(const part of model.components)for(const h of part.holes)contact(h);
  const wires=model.items.filter(i=>i.kind==='wire');
  assert.equal(wires.length,123);
  for(const w of wires){join(contact(w.a),contact(w.b));assert.deepEqual(w.route[0],point(w.a),w.id);assert.deepEqual(w.route.at(-1),point(w.b),w.id);}
  const terminals=[{h:['FUENTE','+',0],net:'5V',ref:'Fuente +'},{h:['FUENTE','-',0],net:'GND',ref:'Fuente −'}];
  for(const c of chips)c.nets.forEach((net,i)=>net&&terminals.push({h:dipHole(c,i+1),net,ref:c.id+'.'+(i+1)}));
  const ds=model.displays[0];Object.entries(ds.pins).forEach(([p,h])=>ds.nets[p-1]&&terminals.push({h,net:ds.nets[p-1],ref:'DS1.'+p}));
  for(const r of model.items.filter(i=>i.kind==='res')){const [na,nb]=r.partId==='RLED'?['5V','COM']:[r.net,'GND'];terminals.push({h:r.a,net:na,ref:r.partId+'.1'},{h:r.b,net:nb,ref:r.partId+'.2'});}
  const byNet=new Map(),byRoot=new Map();
  for(const {h,net,ref} of terminals){
    const k=root(strip(h));
    if(byNet.has(net))assert.equal(k,byNet.get(net),`Red desconectada ${net} en ${ref}`);
    if(byRoot.has(k))assert.equal(net,byRoot.get(k),`Corto en ${ref}: ${net} con ${byRoot.get(k)}`);
    byNet.set(net,k);byRoot.set(k,net);
  }
  for(const b of ['A','B'])for(const r of ['+T','+B'])for(const side of ['L','R'])if(parent.has(b+r+side)||b==='A')assert.equal(byRoot.get(root(b+r+side)),'5V',b+r+side+' sin +5 V');
  // Las ocho letras desde las redes: X fijo de cada U → W invertida → segmento encendido si W = 0.
  const net=(c,p)=>c.nets[p-1];
  for(let code=0;code<8;code++){
    const lit=chips.filter(c=>!c.dipSwitch).filter((c,u)=>{const xPins=[4,3,2,1,15,14,13,12];return net(c,xPins[code])==='5V';}).map(c=>net(c,6).slice(4)).sort().join('');
    assert.equal(lit,[...patterns[code]].sort().join(''),'Código '+code+' debería formar '+letters[code]);
  }
  // Cada salida W llega a la pata declarada para su segmento.
  segmentsOf.split('').forEach((s,u)=>assert.equal(root(strip(ds.pins[model.displayPins[s]])),root(strip(dipHole(chips[u],6))),'Segmento '+s));
  return {wires:wires.length,components:model.components.length};
}

const reference=check(defaultPins);
// Otro display: segmentos y comunes en patas distintas (solo cambian los cables del display).
const other={a:1,b:2,c:3,d:4,e:5,f:6,g:7,com1:9,com2:10};
check(other);
assert.deepEqual(Object.keys(data).length,7);
console.log(JSON.stringify({passed:true,...reference,letters:letters.join(''),customPinout:true,scope:'Continuidad física en dos placas, cortos, patas de U1–U7, DIP y display, ocho letras desde las redes y orden de patas configurable. Brillo con RLED común y continuidad de los rieles reales quedan para la placa.'}));
