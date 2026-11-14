const rowY={'+T':185,'-T':215,a:290,b:320,c:350,d:380,e:410,f:500,g:530,h:560,i:590,j:620,'-B':680,'+B':710};
export const railColumns=Array.from({length:59},(_,i)=>i+3).filter(c=>(c-3)%6<5);
export const bounds=[40,130,1950,640];
export const point=([,row,column])=>[95+(column-1)*30,rowY[row]];
const hole=(row,column)=>['A',row,column];
const strip=([,row,col])=>row.length===1?`${row<'f'?'T':'B'}:${col}`:`${row}:${col<=31?'I':'D'}`;
export const address=([,row,col])=>`${row} · ${col}`;

const chips=[
  {id:'U5',label:'NE555P',name:'Reloj astable',start:5,nets:['GND','TIEMPO','RELOJ','VCC','CONTROL','TIEMPO','DESCARGA','VCC']},
  {id:'U1',label:'SN74LS73A',name:'JK · bits 1 y 2',start:13,nets:['RELOJ','BORRA_N','VCC','VCC','1','BORRA_N','VCC','LED2_N','2','VCC','GND','1','LED1_N','VCC']},
  {id:'U2',label:'SN74LS73A',name:'JK · bits 4 y 8',start:23,nets:['2','BORRA_N','VCC','VCC','4','BORRA_N','VCC','LED8_N','8','VCC','GND','4','LED4_N','VCC']},
  {id:'U3',label:'SN74LS00N',name:'NAND · borrado en 10',start:33,nets:['2','8','BORRA_N',null,null,null,'GND',null,null,null,null,null,null,'VCC']},
  {id:'U4',label:'SN74LS48N',name:'BCD a siete segmentos',start:43,nets:['2','4','VCC','BLANCO_N','VCC','8','1','GND','e','d','c','b','a','g','f','VCC']},
].map(c=>({...c,board:'A',pins:c.nets.length}));
export const dipHole=(c,p)=>hole(p>c.pins/2?'e':'f',c.start+(p>c.pins/2?c.pins-p:p-1));
const display={id:'DS1',label:'5011AS',name:'Display · cátodo común',pins:Object.fromEntries(Array.from({length:10},(_,i)=>[i+1,hole(i<5?'h':'d',55+(i<5?i:9-i))])),nets:['e','d','GND','c',null,'b','a','GND','f','g']};
const LEDs=[{id:'D1',bit:8,anode:30,cathode:29},{id:'D2',bit:4,anode:22,cathode:24},{id:'D3',bit:2,anode:20,cathode:19},{id:'D4',bit:1,anode:12,cathode:14}];
const color={VCC:'#b92c49',GND:'#246190',RELOJ:'#a75b15',BORRA_N:'#a03370','1':'#38824c','2':'#006b87','4':'#6354b3','8':'#94631d'};
const stages=[['Coloca las piezas','Orienta las muescas hacia la izquierda. Coloca primero los integrados, luego el display, los pasivos y los LED.'],['Alimentación de 5 V','Une ambos lados de cada riel y lleva alimentación y tierra a los integrados.'],['Reloj con NE555','Conecta DESCARGA, TIEMPO y CONTROL. El pin 3 entrega RELOJ al primer flip-flop.'],['Cadena JK y borrado','Las salidas 1, 2 y 4 encadenan el reloj. La NAND borra cuando 2 y 8 están altas.'],['Display y LED','Lleva BCD al 74LS48 y sus siete salidas al 5011AS. Los LED se alimentan con las salidas invertidas.'],['Prueba 0 a 9','Comprueba la secuencia completa. Al salir de 9, BORRA_N se activa brevemente y vuelve a aparecer 0.']];

const part=(id,kind,value,a,b,fromNet,toNet,extra={})=>({id:'P_'+id,partId:id,kind,value,a,b,stage:0,label:`${id} · ${value}`,fromNet,toNet,...extra});
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

function compress(points){
  const clean=points.filter((p,i)=>!i||p[0]!==points[i-1][0]||p[1]!==points[i-1][1]);
  return clean.filter((p,i)=>!i||i===clean.length-1||!((clean[i-1][0]===p[0]&&clean[i+1][0]===p[0])||(clean[i-1][1]===p[1]&&clean[i+1][1]===p[1])));
}
const distance=(a,b)=>Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1]);
const between=(v,a,b)=>v>=Math.min(a,b)&&v<=Math.max(a,b);
const segments=p=>p.slice(1).map((b,i)=>[p[i],b]);
function intersections([a,b],[c,d]){
  const horizontal=a[1]===b[1];
  if(horizontal!==(c[1]===d[1])){
    const [p,q,u,v]=horizontal?[a,b,c,d]:[c,d,a,b];
    return between(u[0],p[0],q[0])&&between(p[1],u[1],v[1])?1:0;
  }
  const axis=horizontal?0:1;
  if(a[1-axis]!==c[1-axis])return 0;
  return Math.min(Math.max(a[axis],b[axis]),Math.max(c[axis],d[axis]))>Math.max(Math.min(a[axis],b[axis]),Math.min(c[axis],d[axis]))?3:0;
}
const packages=[...chips.map(c=>[point(hole('e',c.start))[0]-12,420,point(hole('f',c.start+c.pins/2-1))[0]+12,491]),[1700,358,1850,582]];
function clipsBody([a,b],bodies){
  return bodies.some(([l,t,r,d])=>a[0]===b[0]?a[0]>l&&a[0]<r&&Math.min(a[1],b[1])<d&&Math.max(a[1],b[1])>t:a[1]>t&&a[1]<d&&Math.min(a[0],b[0])<r&&Math.max(a[0],b[0])>l);
}

export function buildCounter({previous=false}={}){
  const passives=buildPassives(previous);
  const indicatorBodies=passives.filter(part=>part.kind==='led'||part.kind==='cap').map(part=>{
    const [[ax,ay],[bx,by]]=[point(part.a),point(part.b)];
    const x=(ax+bx)/2,y=(ay+by)/2-(part.kind==='led'?35:0);
    const halfWidth=part.kind==='cap'&&!part.polarized?22:24;
    const halfHeight=part.kind==='cap'&&!part.polarized?18:24;
    return [x-halfWidth,y-halfHeight,x+halfWidth,y+halfHeight];
  });
  const bodies=previous?packages:[...packages,...indicatorBodies];
  const occupied=new Set(),nodes=new Map(),items=[],wires=[],terminals=[];
  function attach(h,net,ref){
    const key=h.join('/');
    if(occupied.has(key))throw Error('Agujero ocupado: '+address(h));
    occupied.add(key);
    if(!net)return;
    const k=strip(h),prior=nodes.get(k);
    if(prior&&prior.net!==net)throw Error('Dos redes en una tira: '+k);
    nodes.set(k,{h,net,ref:prior?prior.ref:ref});terminals.push({h,net,ref});
  }
  for(const c of chips)c.nets.forEach((n,i)=>attach(dipHole(c,i+1),n,`${c.id}.${i+1}`));
  display.nets.forEach((n,i)=>attach(display.pins[i+1],n,`DS1.${i+1}`));
  for(const p of passives){attach(p.a,p.fromNet,p.partId+'.1');attach(p.b,p.toNet,p.partId+'.2');items.push(p);}
  for(const [r,n] of [['+T','VCC'],['-T','GND'],['+B','VCC'],['-B','GND']])for(const c of [3,33]){
    if(!nodes.has(strip(hole(r,c))))nodes.set(strip(hole(r,c)),{h:hole(r,c),net:n,ref:r});
  }
  const feeds={VCC:hole('+T',4),GND:hole('-T',4)};
  for(const [n,h] of Object.entries(feeds))attach(h,n,'FUENTE.'+n);
  const free=h=>!occupied.has(h.join('/'));
  function ports({h}){
    const [,r,c]=h;
    const candidates=(r.length===1?[...(r<'f'?'abcde':'fghij')].map(row=>hole(row,c)):railColumns.filter(col=>(col<=31)===(c<=31)).map(col=>hole(r,col)));
    return candidates.filter(free);
  }
  function routeFor(a,b){
    const p=point(a),q=point(b),options=[[p,[p[0],q[1]],q],[p,[q[0],p[1]],q]];
    for(const y of [245,265,335,365,395,455,515,545,575,650,665,695])options.push([p,[p[0],y],[q[0],y],q]);
    for(const x of [65,200,410,680,980,1280,1580,1670,1860,1965])options.push([p,[x,p[1]],[x,q[1]],q]);
    let best;
    for(const option of options){
      const route=compress(option),edges=segments(route);
      if(edges.some(edge=>clipsBody(edge,bodies)))continue;
      const crossing=wires.map(w=>segments(w.route).reduce((sum,s)=>sum+edges.reduce((n,e)=>n+intersections(s,e),0),0));
      const cost=edges.reduce((sum,e)=>sum+distance(...e),0)+route.length*8+crossing.reduce((sum,n)=>sum+n*18,0);
      if(!best||cost<best.cost)best={route,cost,crossing};
    }
    return best;
  }
  function bridge(a,b,net,label,stage,fromRef,toRef){
    const found=routeFor(a,b);
    if(!found)throw Error('No hay ruta alrededor de los encapsulados: '+net);
    const {route,crossing}=found,used=new Set(wires.filter((_,i)=>crossing[i]).map(w=>w.routeHeight));
    let routeHeight=.72;
    while(used.has(routeHeight))routeHeight=Math.round((routeHeight+.32)*100)/100;
    attach(a,net,label);attach(b,net,label);
    const w={id:'W'+String(wires.length+1).padStart(2,'0'),kind:'wire',net,signal:net,fromRef,toRef,color:color[net]||'#166e65',routingClass:['VCC','GND'].includes(net)?'power':'signal',a,b,route,routeHeight,stage,label};
    wires.push(w);items.push(w);
  }
  for(const [r,n] of [['+T','VCC'],['-T','GND'],['+B','VCC'],['-B','GND']])bridge(hole(r,31),hole(r,33),n,`${n} · puente del riel ${r}`,1);
  bridge(hole('+T',3),hole('+B',3),'VCC','VCC · unir riel superior e inferior',1);
  bridge(hole('-T',5),hole('-B',5),'GND','GND · unir riel superior e inferior',1);

  for(const net of [...new Set([...nodes.values()].map(n=>n.net))]){
    const parts=[...nodes.values()].filter(n=>n.net===net),power=net==='VCC'||net==='GND';
    const connected=power?parts.filter(n=>n.h[1].length>1):parts.slice(0,1);
    const todo=parts.filter(n=>!connected.includes(n));
    while(todo.length){
      const choices=[];
      for(const from of connected)for(const to of todo){
        for(const a of ports(from))for(const b of ports(to))choices.push({a,b,from,to,len:distance(point(a),point(b))});
      }
      choices.sort((a,b)=>a.len-b.len);
      let best;
      for(const c of choices.slice(0,160)){
        const r=routeFor(c.a,c.b);
        if(r&&(!best||r.cost<best.cost))best={...c,cost:r.cost};
      }
      if(!best)throw Error('Red sin agujeros libres: '+net);
      const stage=power?1:['RELOJ','TIEMPO','DESCARGA','CONTROL'].includes(net)?2:/^[a-g]$/.test(net)||net.startsWith('LED')||best.to.ref.startsWith('U4.')||best.from.ref.startsWith('U4.')?4:3;
      bridge(best.a,best.b,net,`${net} · ${best.from.ref} a ${best.to.ref}`,stage,best.from.ref,best.to.ref);
      connected.push(best.to);todo.splice(todo.indexOf(best.to),1);
    }
  }
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
