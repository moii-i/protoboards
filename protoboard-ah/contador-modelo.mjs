import {railColumns,bounds,point,hole,address,dipHole,part,packageBodies,partBodies,routeBoard} from './contador-ruteo.mjs';
export {railColumns,bounds,point,address,dipHole};

const chips=[
  {id:'U5',label:'NE555P',name:'Reloj astable',start:5,nets:['GND','TIEMPO','RELOJ','VCC','CONTROL','TIEMPO','DESCARGA','VCC']},
  {id:'U1',label:'SN74LS73A',name:'JK · bits 1 y 2',start:13,nets:['RELOJ','BORRA_N','VCC','VCC','1','BORRA_N','VCC','LED2_N','2','VCC','GND','1','LED1_N','VCC']},
  {id:'U2',label:'SN74LS73A',name:'JK · bits 4 y 8',start:23,nets:['2','BORRA_N','VCC','VCC','4','BORRA_N','VCC','LED8_N','8','VCC','GND','4','LED4_N','VCC']},
  {id:'U3',label:'SN74LS00N',name:'NAND · borrado en 10',start:33,nets:['2','8','BORRA_N',null,null,null,'GND',null,null,null,null,null,null,'VCC']},
  {id:'U4',label:'SN74LS48N',name:'BCD a siete segmentos',start:43,nets:['2','4','VCC','BLANCO_N','VCC','8','1','GND','e','d','c','b','a','g','f','VCC']},
].map(c=>({...c,board:'A',pins:c.nets.length}));
const display={id:'DS1',label:'5011AS',name:'Display · cátodo común',pins:Object.fromEntries(Array.from({length:10},(_,i)=>[i+1,hole(i<5?'h':'d',55+(i<5?i:9-i))])),nets:['e','d','GND','c',null,'b','a','GND','f','g']};
const LEDs=[{id:'D1',bit:8,anode:30,cathode:29},{id:'D2',bit:4,anode:22,cathode:24},{id:'D3',bit:2,anode:20,cathode:19},{id:'D4',bit:1,anode:12,cathode:14}];
const color={VCC:'#b92c49',GND:'#246190',RELOJ:'#a75b15',BORRA_N:'#a03370','1':'#38824c','2':'#006b87','4':'#6354b3','8':'#94631d'};
const stages=[['Coloca las piezas','Orienta las muescas hacia la izquierda. Coloca primero los integrados, luego el display, los pasivos y los LED.'],['Alimentación de 5 V','Une ambos lados de cada riel y lleva alimentación y tierra a los integrados.'],['Reloj con NE555','Conecta DESCARGA, TIEMPO y CONTROL. El pin 3 entrega RELOJ al primer flip-flop.'],['Cadena JK y borrado','Las salidas 1, 2 y 4 encadenan el reloj. La NAND borra cuando 2 y 8 están altas.'],['Display y LED','Lleva BCD al 74LS48 y sus siete salidas al 5011AS. Los LED se alimentan con las salidas invertidas.'],['Prueba 0 a 9','Comprueba la secuencia completa. Al salir de 9, BORRA_N se activa brevemente y vuelve a aparecer 0.']];

function buildPassives(previous){
  const ledRow=previous?'a':'d',resistorRow=previous?'b':'a',timingRow=previous?'a':'d';
  return [
    part('R1','res','10 kΩ',hole('j',46),hole('+B',46),'BLANCO_N','VCC'),
    ...LEDs.map((l,i)=>part('R'+(i+2),'res','1 kΩ',hole(resistorRow,l.anode),hole('+T',l.anode===20?21:l.anode),'ANODO_'+l.bit,'VCC')),
    part('R6','res','10 kΩ',hole('a',6),hole('+T',6),'DESCARGA','VCC'),
    part('R7','res','100 kΩ',hole('b',6),hole('b',7),'DESCARGA','TIEMPO'),
    part('C1','cap','4.7 µF',hole(timingRow,7),hole(timingRow,9),'TIEMPO','GND',{polarized:true}),
    part('C2','cap','100 nF',hole('a',8),hole('b',9),'CONTROL','GND'),
    ...LEDs.map(l=>part(l.id,'led',l.id,hole(ledRow,l.anode),hole(ledRow,l.cathode),'ANODO_'+l.bit,'LED'+l.bit+'_N',{color:'#a63fe0',bit:l.bit,label:`${l.id} · LED de peso ${l.bit}`})),
  ];
}

export function buildCounter({previous=false}={}){
  const passives=buildPassives(previous);
  const packages=packageBodies(chips);
  const bodies=previous?packages:[...packages,...partBodies(passives)];
  const stageFor=(net,from,to)=>['RELOJ','TIEMPO','DESCARGA','CONTROL'].includes(net)?2:/^[a-g]$/.test(net)||net.startsWith('LED')||to.ref.startsWith('U4.')||from.ref.startsWith('U4.')?4:3;
  const {items,terminals,feeds}=routeBoard({chips,display,passives,bodies,colors:color,stageFor});
  const components=[...chips.map(c=>({id:c.id,name:c.name,value:c.label,holes:c.nets.map((_,i)=>dipHole(c,i+1))})),{id:'DS1',name:display.name,value:display.label,holes:Object.values(display.pins)},...passives.map(p=>({id:p.partId,name:p.label,value:p.value,holes:[p.a,p.b],bit:p.bit}))];
  return {bounds,stages,chips,displays:[display],items,components,terminals,feeds,colors:color,boards:{A:{columns:63,xOffset:0,yOffset:0,railBreak:31,railColumns}},presentation:'contador'};
}

export const model=buildCounter();
// TI 74LS48 T2 truth table. The original patterns omit a on 6 and d on 9.
export const segmentsFor=['abcdef','bc','abdeg','abcdg','bcfg','acdfg','cdefg','abc','abcdefg','abcfg'];

export function pulse(value){
  const bits=Array.from({length:4},(_,i)=>(value>>i)&1);
  for(let i=0;i<bits.length;i++){
    bits[i]^=1;
    if(bits[1]&&bits[3])return {value:0,reset:true};
    if(bits[i])break;
  }
  return {value:bits.reduce((sum,bit,i)=>sum+(bit<<i),0),reset:false};
}

export function indicators(value){
  const leds=Object.fromEntries(LEDs.map(l=>[l.id,Boolean(value&l.bit)]));
  const segments={DS1:Object.fromEntries([...segmentsFor[value]].map(s=>[s,true]))};
  return {leds,segments};
}
