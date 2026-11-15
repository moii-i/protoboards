// AGV seguidor de línea con compuertas (Opción 1): un 74LS86 y un L293D.
//
//   SI, SD  salidas digitales de los sensores (1 = superficie negra, 0 = blanca).
//   SEL     selector del chasis: 0 = línea negra, 1 = línea blanca.
//   Sobre la línea:  li = SI ⊕ SEL   ·   ld = SD ⊕ SEL
//   Motores cruzados: MI (motor izquierdo) = ld · MD (motor derecho) = li
//     li ld = 1 1 → avanza · 1 0 → gira a la izquierda · 0 1 → a la derecha · 0 0 → frena (línea perdida)
// Los dos sensores van sobre la cinta (separación menor que su ancho). Dos de las
// cuatro XOR resuelven todo; las otras dos quedan con sus entradas a GND.
import {columns,railColumns,point,hole,address,dipHole,part,packageBodies,partBodies,routeBoard} from './seguidor-ruteo.mjs';
export {columns,railColumns,point,address,dipHole};

export const chips=[
  {id:'U1',label:'SN74LS86N',name:'XOR · selector de línea',start:4,nets:['GND','GND',null,'GND','GND',null,'GND','MI','SD','SEL','MD','SEL','SI','VCC']},
  {id:'U2',label:'L293D',name:'Puente H · dos motores',start:14,nets:['VCC','MD','MDA','GND','GND','MDB','GND','VM','VCC','MI','MIA','GND','GND','MIB','GND','VCC']},
].map(c=>({...c,board:'A',pins:c.nets.length}));

export const colors={VCC:'#b92c49',GND:'#246190',VM:'#c4661f',V9:'#8e2f6a',SEL:'#a03370',SI:'#2f8a57',SD:'#2f6fb0',MI:'#6a4bb0',MD:'#a7741a',MIA:'#6b6f73',MIB:'#6b6f73',MDA:'#6b6f73',MDB:'#6b6f73'};

// Módulos fuera de la placa. anchor: punto (coordenadas del mapa) donde vive el módulo.
export const modules={
  SI:{name:'Sensor izquierdo',value:'TCRT5000 · LM393',type:'sensor',anchor:[260,40]},
  SD:{name:'Sensor derecho',value:'TCRT5000 · LM393',type:'sensor',anchor:[430,40]},
  MI:{name:'Motor izquierdo',value:'Motorreductor TT',type:'motor',anchor:[-110,330]},
  MD:{name:'Motor derecho',value:'Motorreductor TT',type:'motor',anchor:[1180,600]},
  BM:{name:'Pilas de motores',value:'4 × AA · 6 V',type:'battery',anchor:[700,880]},
  BL:{name:'Pila de lógica',value:'9 V',type:'battery9',anchor:[880,40]},
};
const lead=(module,pin,h,net,stage,color)=>({id:'X_'+module+'_'+pin,kind:'link',lead:true,partId:module,module,pin,a:h,b:h,net,stage,color:color||colors[net],anchor:modules[module].anchor,label:modules[module].name+' · '+pin});
// Dupont: rojo a +5 V, negro a GND, amarillo a la señal. Cada uno entra a la tira de su pata.
export const leads=[
  lead('SI','VCC',hole('+T',9),'VCC',4,'#c6303b'),lead('SI','GND',hole('-T',10),'GND',4,'#25282b'),lead('SI','OUT',hole('a',5),'SI',4,'#d9b31f'),
  lead('SD','VCC',hole('+T',11),'VCC',4,'#c6303b'),lead('SD','GND',hole('-T',12),'GND',4,'#25282b'),lead('SD','OUT',hole('a',9),'SD',4,'#d9b31f'),
  lead('MI','A',hole('a',19),'MIA',5,'#c6303b'),lead('MI','B',hole('a',16),'MIB',5,'#25282b'),
  lead('MD','A',hole('j',16),'MDA',5,'#c6303b'),lead('MD','B',hole('j',19),'MDB',5,'#25282b'),
  lead('BM','+',hole('+B',26),'VM',5,'#c6303b'),lead('BM','−',hole('-B',26),'GND',5,'#25282b'),
  lead('BL','+',hole('c',25),'V9',5,'#c6303b'),lead('BL','−',hole('-T',28),'GND',5,'#25282b'),
];
// slot: orden del cable dentro de su módulo, para separar cables paralelos al dibujarlos.
leads.forEach((l,i)=>{const group=leads.filter(x=>x.module===l.module);l.firstOfModule=group[0]===l;l.slot=group.indexOf(l);l.slots=group.length;});

export const stages=[
  ['Coloca las piezas','Muescas a la izquierda. Coloca el 74LS86, el L293D, el regulador 7805 con la cara metálica hacia atrás, C1, C2 y el selector SW1 en la esquina frontal izquierda.'],
  ['Alimentación','+5 V del 7805 al riel rojo superior, GND a los dos rieles azules unidos y VM al riel rojo inferior. 5 V y VM nunca se unen. VCC y GND de cada integrado.'],
  ['Selector y compuertas XOR','SW1 entrega SEL: 0 V en NEGRA y 5 V en BLANCA. SEL llega a una entrada de cada XOR usada (pines 10 y 12). Las cuatro entradas sobrantes van a GND.'],
  ['Puente H','Cada XOR manda al motor del lado contrario: pin 11 (MD) al pin 2 del L293D y pin 8 (MI) al pin 10. EN1 y EN2 a +5 V; 2A y 4A a GND.'],
  ['Sensores','Tres cables dupont por sensor: VCC al riel rojo superior, GND al azul y OUT a la tira de su compuerta (izquierdo → pin 13, derecho → pin 9).'],
  ['Motores y pilas','Motor izquierdo a los pines 11 y 14 del L293D; derecho a los pines 3 y 6. Al final, las 4 AA al riel de VM y la pila de 9 V al 7805.'],
  ['Prueba en pista','Selector en NEGRA sobre cinta negra: avanza. Saca un sensor de la línea: gira hacia el otro lado. Saca los dos: frena. Repite en BLANCA sobre cinta blanca.'],
];

function buildPassives(){
  return [
    part('U3','reg','7805',hole('d',25),hole('d',27),'V9','VCC',{routedPins:[[hole('d',26),'GND','U3.2 (GND)']],label:'U3 · 7805 · regulador 5 V'}),
    part('C1','cap','0.33 µF',hole('b',25),hole('b',26),'V9','GND',{label:'C1 · 0.33 µF · entrada del 7805'}),
    part('C2','cap','0.1 µF',hole('a',26),hole('a',27),'GND','VCC',{label:'C2 · 0.1 µF · salida del 7805'}),
    // Selector deslizable de 1 polo 2 tiros: palanca a la izquierda = GND (NEGRA), a la derecha = 5 V (BLANCA).
    part('SW1','slide','NEGRA | BLANCA',hole('b',2),hole('b',4),'GND','VCC',{routedPins:[[hole('b',3),'SEL','SW1.2 (común)']],label:'SW1 · selector de línea'}),
  ];
}

const stageFor=(net,from,to)=>{
  const refs=[from.ref,to.ref].join(' ');
  if(net==='SEL'||/U1\.(1|2|4|5)\b/.test(refs))return 2;
  if(net==='MI'||net==='MD'||/U2\.(1|7|9|15)\b/.test(refs))return 3;
  return 1;
};

export function buildFollower(){
  const passives=buildPassives();
  const bodies=[...packageBodies(chips),...partBodies(passives)];
  const {items,terminals}=routeBoard({chips,passives,leads,bodies,colors,stageFor});
  const components=[
    ...chips.map(c=>({id:c.id,name:c.name,value:c.label,holes:c.nets.map((_,i)=>dipHole(c,i+1))})),
    ...passives.map(p=>({id:p.partId,name:p.label,value:p.value,holes:[p.a,...(p.routedPins||[]).map(([h])=>h),p.b]})),
  ];
  const xs=Object.values(modules).map(m=>m.anchor[0]),ys=Object.values(modules).map(m=>m.anchor[1]);
  const bounds=[Math.min(...xs)-110,Math.min(...ys)-95,Math.max(...xs)-Math.min(...xs)+220,Math.max(...ys)-Math.min(...ys)+180];
  return {bounds,stages,chips,displays:[],items,components,terminals,modules,colors,boards:{A:{columns,xOffset:0,yOffset:0,railColumns}},presentation:'contador',boardLabel:'400 PUNTOS · PASO 2,54 mm'};
}

export const model=buildFollower();

// ---- Lógica a partir de las patas declaradas ----
// No es un simulador eléctrico: lee qué red llega a cada pata de U1 (74LS86) y U2 (L293D)
// y aplica la tabla de cada integrado. Devuelve el estado de cada motor.
const XOR=[[1,2,3],[4,5,6],[9,10,8],[12,13,11]];
const HALF=[{en:1,inputs:[2,7],outputs:[3,6]},{en:9,inputs:[10,15],outputs:[11,14]}];
export function createLogic(netlist=chips,leadList=leads){
  const xor=netlist.filter(c=>/74LS86/.test(c.label)).flatMap(c=>XOR.map(([a,b,o])=>({in:[c.nets[a-1],c.nets[b-1]],out:c.nets[o-1]})).filter(g=>g.out&&g.in.every(Boolean)));
  const bridge=netlist.find(c=>/L293/.test(c.label));
  const motorOf=id=>leadList.filter(l=>l.module===id).map(l=>l.net);
  function nets(inputs){
    const v={VCC:1,GND:0,VM:1,...inputs};
    for(const g of xor)if(g.in.every(n=>n in v))v[g.out]=v[g.in[0]]^v[g.in[1]];
    for(const h of HALF){
      const en=v[bridge.nets[h.en-1]];
      h.inputs.forEach((p,i)=>{const out=bridge.nets[h.outputs[i]-1],a=v[bridge.nets[p-1]];v[out]=en?a:null;});
    }
    return v;
  }
  function motor(v,id){
    const [a,b]=motorOf(id).map(n=>v[n]);
    if(a==null||b==null)return 'libre';
    return a===b?'freno':a?'avanza':'reversa';
  }
  function evaluate({SI,SD,SEL}){
    const v=nets({SI,SD,SEL});
    return {nets:v,left:motor(v,'MI'),right:motor(v,'MD')};
  }
  return {evaluate};
}

// Qué hace el carrito con cada combinación (para la tabla y la simulación).
export function action(left,right){
  if(left==='avanza'&&right==='avanza')return 'avanza';
  if(left!=='avanza'&&right==='avanza')return 'izquierda';
  if(left==='avanza'&&right!=='avanza')return 'derecha';
  return 'alto';
}
