// Contador BCD descendente 9 → 0 con dos 74LS73A (JK, flanco de bajada, solo CLEAR).
//
// Arquitectura ÷2 × ÷5 (como el 74LS90, pero descendente):
//   FF A  (U1·1) cambia con cada flanco de bajada del NE555. Guarda A invertido: a = A'.
//   FF B, C, D (U1·2, U2·1, U2·2) forman un contador síncrono ÷5 descendente (4,3,2,1,0)
//   con reloj A_N = Q de U1·1. A_N baja justo cuando A sube (0→9, 8→7, 6→5, 4→3, 2→1).
//   FF D guarda D invertido: d = D'.
// CLEAR deja los cuatro flip-flops en Q=0. Como A y D se leen de Q̄, el estado leído es 1001 = 9.
// Ecuaciones de la sección ÷5 (estados DCB 100,011,010,001,000; 101,110,111 no usados):
//   JB = C + D = NAND(C', D')   KB = 1
//   JC = D                       KC = B'
//   Jd = KD = 1                  Kd = JD = B'·C' = NOT(NAND(B', C'))
// Tres compuertas de un solo 74LS00 y ningún integrado extra respecto al contador 0→9.
import {railColumns,bounds,point,hole,address,dipHole,part,packageBodies,partBodies,routeBoard} from './contador-ruteo.mjs';
export {railColumns,bounds,point,address,dipHole};

export const chips=[
  {id:'U5',label:'NE555P',name:'Reloj astable',start:5,nets:['GND','TIEMPO','RELOJ','VCC',null,'TIEMPO','DESCARGA','VCC']},
  {id:'U1',label:'SN74LS73A',name:'JK · bits A (invertido) y B',start:13,nets:['RELOJ','INICIO_N','VCC','VCC','A_N','INICIO_N','JB','B_N','B','VCC','GND','A_N','A','VCC']},
  {id:'U2',label:'SN74LS73A',name:'JK · bits C y D (invertido)',start:23,nets:['A_N','INICIO_N','B_N','VCC','A_N','INICIO_N','VCC','D','D_N','KD','GND','C','C_N','D']},
  {id:'U3',label:'SN74LS00N',name:'NAND · JB y KD',start:33,nets:['C_N','D_N','JB','B_N','C_N','BC','GND','KD','BC','BC',null,'GND','GND','VCC']},
  {id:'U4',label:'SN74LS48N',name:'BCD a siete segmentos',start:43,nets:['B','C','VCC','BLANCO_N','VCC','D','A','GND','e','d','c','b','a','g','f','VCC']},
].map(c=>({...c,board:'A',pins:c.nets.length}));
export const display={id:'DS1',label:'5011AS',name:'Display · cátodo común',pins:Object.fromEntries(Array.from({length:10},(_,i)=>[i+1,hole(i<5?'h':'d',55+(i<5?i:9-i))])),nets:['e','d','GND','c',null,'b','a','GND','f','g']};

const color={VCC:'#b92c49',GND:'#246190',RELOJ:'#a75b15',TIEMPO:'#1c8757',INICIO_N:'#a03370',A:'#38824c',A_N:'#2f9a8a',B:'#006b87',B_N:'#3d8fc4',C:'#6354b3',C_N:'#8a5cc2',D:'#94631d',D_N:'#b58424',JB:'#7a3f7f',KD:'#5b6b1f',BC:'#6f7f39'};

export const stages=[
  ['Coloca las piezas','Muescas a la izquierda. Coloca los cinco integrados y el display; después RV1, las resistencias y los dos electrolíticos con su franja (−) hacia el riel azul.'],
  ['Alimentación de 5 V','Une ambos lados de cada riel y lleva +5 V y GND a los cinco integrados. 74LS73A: VCC en el pin 4 y GND en el 11.'],
  ['Reloj con NE555 y RV1','R6 de +5 V a DESCARGA; R7 y RV1 en serie de DESCARGA a TIEMPO; C1 de TIEMPO a GND. Girar RV1 cambia la velocidad. El pin 5 queda libre y el pin 3 entrega RELOJ al pin 1 de U1.'],
  ['Inicialización en 9','INICIO_N une los cuatro CLEAR (pines 2 y 6 de U1 y U2). Al encender, C3 la mantiene en bajo un momento y después R8 la sube a 5 V: el contador arranca en 9.'],
  ['Flip-flops JK y compuertas','A_N (pin 12 de U1) es el reloj de los otros tres flip-flops. Tres NAND del 74LS00 generan JB y KD. Las cuatro entradas sobrantes van a GND.'],
  ['Decodificador y display','Lleva A, B, C y D al 74LS48 y sus siete salidas al 5011AS. A y D salen de Q̄ porque esos flip-flops guardan el bit invertido.'],
  ['Prueba de 9 a 0','Pulsa INICIO: debe aparecer 9. Avanza diez pulsos: 9, 8, …, 1, 0 y de nuevo 9.'],
];

function buildPassives(){
  return [
    part('R1','res','10 kΩ',hole('j',46),hole('+B',46),'BLANCO_N','VCC'),
    part('R6','res','10 kΩ',hole('a',6),hole('+T',6),'DESCARGA','VCC'),
    part('R7','res','1 kΩ',hole('b',6),hole('b',9),'DESCARGA','RB'),
    // RV1 como resistencia variable: pata 1 en RB, cursor en TIEMPO, pata 3 libre.
    part('RV1','pot','20 kΩ',hole('a',9),hole('a',11),'RB',null,{routedPins:[[hole('a',10),'TIEMPO','RV1.2 (cursor)']],label:'RV1 · 20 kΩ · velocidad'}),
    part('C1','cap','100 µF',hole('j',6),hole('-B',7),'TIEMPO','GND',{polarized:true}),
    part('R8','res','10 kΩ',hole('j',14),hole('+B',15),'INICIO_N','VCC'),
    part('C3','cap','10 µF',hole('i',14),hole('-B',13),'INICIO_N','GND',{polarized:true}),
  ];
}

const stageFor=(net,from,to)=>{
  if(['RELOJ','TIEMPO','DESCARGA','RB'].includes(net))return 2;
  if(net==='INICIO_N')return 3;
  if(/^[a-g]$/.test(net)||net==='BLANCO_N'||from.ref.startsWith('U4.')||to.ref.startsWith('U4.'))return 5;
  return 4;
};

export function buildCounter(){
  const passives=buildPassives();
  const bodies=[...packageBodies(chips),...partBodies(passives)];
  const {items,terminals,feeds}=routeBoard({chips,display,passives,bodies,colors:color,stageFor});
  const components=[
    ...chips.map(c=>({id:c.id,name:c.name,value:c.label,holes:c.nets.map((_,i)=>dipHole(c,i+1))})),
    {id:'DS1',name:display.name,value:display.label,holes:Object.values(display.pins)},
    ...passives.map(p=>({id:p.partId,name:p.label,value:p.value,holes:[p.a,p.b,...(p.extraPins||[]).map(([h])=>h),...(p.routedPins||[]).map(([h])=>h)]})),
  ];
  const pot=passives.find(p=>p.kind==='pot');
  return {potPins:[pot.a,pot.routedPins[0][0],pot.b],bounds,stages,chips,displays:[display],items,components,terminals,feeds,colors:color,boards:{A:{columns:63,xOffset:0,yOffset:0,railBreak:31,railColumns}},presentation:'contador'};
}

export const model=buildCounter();

// TI 74LS48: patrones de la tabla de verdad (el 6 sin a y el 9 sin d).
export const segmentsFor=['abcdef','bc','abdeg','abcdg','bcfg','acdfg','cdefg','abc','abcdefg','abcfg'];

// ---- Simulación lógica a partir de las patas declaradas ----
// No es un simulador eléctrico: lee qué red llega a cada pata de U1–U4 y aplica
// el comportamiento de 74LS73A (flanco de bajada, CLEAR asíncrono), 74LS00 y 74LS48.
const FF={1:{clk:1,clr:2,k:3,j:14,q:12,qn:13},2:{clk:5,clr:6,j:7,k:10,q:9,qn:8}};
const NAND=[[1,2,3],[4,5,6],[9,10,8],[12,13,11]];
export function createLogic(netlist=chips){
  const byId=Object.fromEntries(netlist.map(c=>[c.id,c]));
  const flops=netlist.filter(c=>/74LS73/.test(c.label)).flatMap(c=>[1,2].map(n=>({id:c.id+'·'+n,chip:c,pins:FF[n]})));
  const gates=netlist.filter(c=>/74LS00/.test(c.label)).flatMap(c=>NAND.map(([x,y,o])=>({in:[c.nets[x-1],c.nets[y-1]],out:c.nets[o-1]})).filter(g=>g.out&&g.in.every(Boolean)));
  const decoder=netlist.find(c=>/74LS48/.test(c.label));
  const pinNet=(ff,pin)=>ff.chip.nets[ff.pins[pin]-1];
  function nets(q,inputs){
    const v={VCC:1,GND:0,...inputs};
    for(const f of flops){v[pinNet(f,'q')]=q[f.id];v[pinNet(f,'qn')]=1-q[f.id];}
    for(let i=0;i<gates.length+1;i++)for(const g of gates)if(g.in.every(n=>n in v))v[g.out]=1-(v[g.in[0]]&v[g.in[1]]);
    return v;
  }
  const read=v=>{const bit=p=>v[decoder.nets[p-1]];return bit(7)+2*bit(1)+4*bit(2)+8*bit(6);};
  function clear(q,inputs){const v=nets(q,inputs),next={...q};for(const f of flops)if(v[pinNet(f,'clr')]===0)next[f.id]=0;return next;}
  // Un flanco de bajada de RELOJ. Devuelve los estados intermedios del rizado.
  function fall(q,inputs={}){
    let state={...q},before=nets(state,{...inputs,RELOJ:1}),after=nets(state,{...inputs,RELOJ:0});
    const trace=[];
    for(let guard=0;guard<8;guard++){
      const clocked=flops.filter(f=>before[pinNet(f,'clk')]===1&&after[pinNet(f,'clk')]===0);
      if(!clocked.length)break;
      const next={...state};
      for(const f of clocked){
        if(after[pinNet(f,'clr')]===0)continue;
        const j=before[pinNet(f,'j')],k=before[pinNet(f,'k')],o=state[f.id];
        next[f.id]=j&&k?1-o:j?1:k?0:o;
      }
      state=clear(next,{...inputs,RELOJ:0});
      before=after;after=nets(state,{...inputs,RELOJ:0});
      trace.push(read(after));
    }
    return {state,value:read(after),trace};
  }
  const zero=Object.fromEntries(flops.map(f=>[f.id,0]));
  return {
    flops:flops.map(f=>f.id),
    reset:()=>clear(zero,{INICIO_N:0,RELOJ:1}),
    fall,
    value:q=>read(nets(q,{INICIO_N:1,RELOJ:1})),
    signals:q=>nets(q,{INICIO_N:1,RELOJ:1}),
    fromValue(v){const target={A:v&1,B:(v>>1)&1,C:(v>>2)&1,D:(v>>3)&1},q={};for(const f of flops){const qNet=pinNet(f,'q'),qnNet=pinNet(f,'qn');q[f.id]=qNet in target?target[qNet]:1-target[qnNet.replace('_N','')];}return q;}
  };
}

export function indicators(value){
  return {leds:{},segments:{DS1:Object.fromEntries([...segmentsFor[value]||''].map(s=>[s,true]))}};
}
