// NE555 astable con dos LED alternados, para el visor compartido (2D/3D, paso a paso y cable por cable).
// Conserva exactamente los agujeros de la guía original (ne555-model.js): solo agrega rutas,
// patas por red y la lista de piezas que usan los demás visores. Placa de 30 columnas con
// rieles continuos (o las primeras 30 columnas de una protoboard grande). Alimentación: 9 V.
export const columns=30;
const rowY={'+T':185,'-T':215,a:290,b:320,c:350,d:380,e:410,f:500,g:530,h:560,i:590,j:620,'-B':680,'+B':710};
export const point=([board,row,column])=>board==='FUENTE'?sourceTerminals[row]:[95+(column-1)*30,rowY[row]];
export const hole=(row,column)=>['A',row,column];
export const dipHole=(c,p)=>hole(p>c.pins/2?'e':'f',c.start+(p>c.pins/2?c.pins-p:p-1));
export const address=([board,row,col])=>board==='FUENTE'?'batería '+row:`${row} · ${col}`;
export const sourceTerminals={'+':[140,96],'-':[205,96]};
export const colors={VCC:'#d3383d',GND:'#293d52',TIEMPO:'#1c8757',DESCARGA:'#c17814',SALIDA:'#087f93',D1_K:'#7950a0',D2_K:'#7950a0'};

export const chips=[
  {id:'U1',label:'NE555',name:'Temporizador astable',board:'A',start:10,pins:8,nets:['GND','TIEMPO','SALIDA','VCC',null,'TIEMPO','DESCARGA','VCC']},
];
export const potPins=[hole('a',17),hole('a',18),hole('a',19)];

const part=(id,kind,value,a,b,fromNet,toNet,extra={})=>({id:'P_'+id,partId:id,kind,value,a,b,stage:0,net:fromNet,signal:fromNet,label:`${id} · ${value}`,fromNet,toNet,...extra});
export const passives=[
  part('R1','res','1 kΩ',hole('+T',11),hole('b',11),'VCC','DESCARGA',{label:'R1 · 1 kΩ · +9 V a DESCARGA (pata 7)'}),
  part('C1','cap','100 µF',hole('f',6),hole('f',8),'TIEMPO','GND',{polarized:true,label:'C1 · 100 µF · positivo a la izquierda'}),
  part('RV1','pot','20 kΩ',hole('a',17),hole('a',19),'TIEMPO','DESCARGA',{routedPins:[[hole('a',18),'TIEMPO','RV1.2 (cursor)']],label:'RV1 · 20 kΩ · velocidad del parpadeo'}),
  part('D1','led','D1',hole('f',20),hole('f',21),'VCC','D1_K',{color:'#d8443a',label:'D1 · LED · ánodo (+) a la izquierda'}),
  part('R2','res','680 Ω',hole('i',21),hole('i',24),'D1_K','SALIDA',{label:'R2 · 680 Ω · de D1 a SALIDA'}),
  part('D2','led','D2',hole('f',26),hole('f',27),'SALIDA','D2_K',{color:'#d8443a',label:'D2 · LED · ánodo (+) a la izquierda'}),
  part('R3','res','680 Ω',hole('i',27),hole('i',30),'D2_K','GND',{label:'R3 · 680 Ω · de D2 a GND'}),
];

// Mismos cables y agujeros que la guía original (C001…C024 sin las piezas).
const W=(id,stage,net,a,b,label)=>({id,kind:'wire',stage,net,signal:net,a,b,label,color:colors[net],routingClass:['VCC','GND'].includes(net)?'power':'signal'});
const F=side=>['FUENTE',side,0];
const wireList=[
  W('C001',1,'VCC',F('+'),hole('+T',1),'Batería (+) al riel +9 V'),
  W('C002',1,'GND',F('-'),hole('-T',1),'Batería (−) al riel GND'),
  W('C003',1,'VCC',hole('+T',30),hole('+B',30),'Une los dos rieles positivos'),
  W('C004',1,'GND',hole('-T',30),hole('-B',30),'Une los dos rieles negativos'),
  W('C005',1,'VCC',hole('a',10),hole('+T',10),'Pata 8 (VCC) a +9 V'),
  W('C006',1,'GND',hole('j',10),hole('-B',10),'Pata 1 (GND) al negativo'),
  W('C007',1,'VCC',hole('j',13),hole('+B',13),'Pata 4 (RESET) a +9 V'),
  W('C009',2,'TIEMPO',hole('g',11),hole('d',12),'Une patas 2 (TRIG) y 6 (THRESH)'),
  W('C011',2,'TIEMPO',hole('g',6),hole('h',11),'Positivo de C1 a TIEMPO'),
  W('C012',2,'GND',hole('g',8),hole('-B',8),'Negativo de C1 a GND'),
  W('C014',3,'TIEMPO',hole('b',17),hole('b',18),'Une extremo izquierdo y cursor de RV1'),
  W('C015',3,'TIEMPO',hole('c',18),hole('b',12),'Cursor de RV1 a TIEMPO (pata 6)'),
  W('C016',3,'DESCARGA',hole('c',19),hole('c',11),'Extremo derecho de RV1 a DESCARGA (pata 7)'),
  W('C019',4,'VCC',hole('g',20),hole('+B',20),'Ánodo de D1 a +9 V'),
  W('C020',4,'SALIDA',hole('h',12),hole('h',24),'Pata 3 (OUT) a la salida de R2'),
  W('C023',4,'SALIDA',hole('g',24),hole('g',26),'SALIDA al ánodo de D2'),
  W('C024',4,'GND',hole('j',30),hole('-B',29),'Salida de R3 a GND'),
];

export const stages=[
  ['Coloca las piezas','Batería desconectada. NE555 cruzando la ranura con la muesca a la izquierda: patas 1–4 en f10–f13 y 8–5 en e10–e13. C1 en f6–f8 (positivo a la izquierda), RV1 en a17–a19, R1 de +T11 a b11, D1 en f20–f21 y D2 en f26–f27 con el ánodo a la izquierda, R2 de i21 a i24 y R3 de i27 a i30.'],
  ['Alimentación de 9 V','La batería llega a los rieles superiores; une los dos rieles positivos y los dos negativos. Pata 8 y pata 4 (RESET) a +9 V; pata 1 a GND.'],
  ['Resistencia y capacitor de tiempo','Une las patas 2 y 6 (TIEMPO). El positivo de C1 va a TIEMPO y su franja negativa a GND. R1 lleva +9 V a la pata 7 (DESCARGA).'],
  ['Potenciómetro de 20 kΩ','Une el extremo izquierdo de RV1 con su cursor y llévalos a TIEMPO. El extremo derecho va a DESCARGA. Empieza con el tornillo al 50 %.'],
  ['Los dos LED y sus resistencias','D1: +9 V → LED → R2 → SALIDA. D2: SALIDA → LED → R3 → GND. Cuando la salida está en alto enciende D2; en bajo, D1.'],
  ['Revisa antes de encender','Batería desconectada mientras revisas. Pata 5 libre, cada resistencia entre dos tiras distintas y la franja de C1 en GND.'],
  ['Circuito completo: prueba los LED','Conecta la batería de 9 V. Los LED se alternan; gira RV1 para cambiar el ritmo.'],
];

// ---- Rutas: ortogonales, esquivan el cuerpo del NE555 y suben de altura al cruzarse (3D) ----
const compress=points=>{const c=points.filter((p,i)=>!i||p[0]!==points[i-1][0]||p[1]!==points[i-1][1]);return c.filter((p,i)=>!i||i===c.length-1||!((c[i-1][0]===p[0]&&c[i+1][0]===p[0])||(c[i-1][1]===p[1]&&c[i+1][1]===p[1])));};
const distance=(a,b)=>Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1]);
const between=(v,a,b)=>v>=Math.min(a,b)&&v<=Math.max(a,b);
const segments=p=>p.slice(1).map((b,i)=>[p[i],b]);
function intersections([a,b],[c,d]){
  const horizontal=a[1]===b[1];
  if(horizontal!==(c[1]===d[1])){const [p,q,u,v]=horizontal?[a,b,c,d]:[c,d,a,b];return between(u[0],p[0],q[0])&&between(p[1],u[1],v[1])?1:0;}
  const axis=horizontal?0:1;if(a[1-axis]!==c[1-axis])return 0;
  return Math.min(Math.max(a[axis],b[axis]),Math.max(c[axis],d[axis]))>Math.max(Math.min(a[axis],b[axis]),Math.min(c[axis],d[axis]))?3:0;
}
const bodies=chips.map(c=>[point(hole('e',c.start))[0]-12,420,point(hole('f',c.start+c.pins/2-1))[0]+12,491]);
const clips=([a,b])=>bodies.some(([l,t,r,d])=>a[0]===b[0]?a[0]>l&&a[0]<r&&Math.min(a[1],b[1])<d&&Math.max(a[1],b[1])>t:a[1]>t&&a[1]<d&&Math.min(a[0],b[0])<r&&Math.max(a[0],b[0])>l);
function routeWires(list){
  const done=[];
  for(const w of list){
    const p=point(w.a),q=point(w.b),options=[[p,[p[0],q[1]],q],[p,[q[0],p[1]],q]];
    for(const y of [140,245,265,335,365,395,455,515,545,575,650])options.push([p,[p[0],y],[q[0],y],q]);
    for(const x of [320,500,65,1010])options.push([p,[x,p[1]],[x,q[1]],q]);
    let best;
    for(const pass of [true,false]){if(best)break;for(const option of options){
      const route=compress(option),edges=segments(route);if(pass&&edges.some(clips))continue;
      const crossing=done.map(o=>segments(o.route).reduce((s,e1)=>s+edges.reduce((n,e2)=>n+intersections(e1,e2),0),0));
      const cost=edges.reduce((s,e)=>s+distance(...e),0)+route.length*8+crossing.reduce((s,n)=>s+n*18,0);
      if(!best||cost<best.cost)best={route,cost,crossing};
    }}
    const used=new Set(done.filter((_,i)=>best.crossing[i]).map(o=>o.routeHeight));
    let routeHeight=.72;while(used.has(routeHeight))routeHeight=Math.round((routeHeight+.32)*100)/100;
    Object.assign(w,{route:best.route,routeHeight,routeLength:Math.round(best.cost)});done.push(w);
  }
  return list;
}

export function buildNe555(){
  const items=[...passives,...routeWires(wireList.map(w=>({...w})))];
  const components=[
    ...chips.map(c=>({id:c.id,name:c.name,value:c.label,holes:c.nets.map((_,i)=>dipHole(c,i+1))})),
    ...passives.map(p=>({id:p.partId,name:p.label,value:p.value,holes:[p.a,...(p.routedPins||[]).map(([h])=>h),p.b]})),
  ];
  const terminals=[...chips.flatMap(c=>c.nets.map((net,i)=>({h:dipHole(c,i+1),net,ref:`${c.id}.${i+1}`}))),...passives.flatMap(p=>[{h:p.a,net:p.fromNet,ref:p.partId+'.1'},...(p.routedPins||[]).map(([h,net,ref])=>({h,net,ref})),{h:p.b,net:p.toNet,ref:p.partId+'.'+(2+(p.routedPins||[]).length)}])];
  return {bounds:[40,20,1000,740],stages,chips,displays:[],items,components,terminals,potPins,colors,sourceTerminals,boards:{A:{columns,xOffset:0,yOffset:0,railBreak:null}},presentation:'contador',boardLabel:'30 COLUMNAS · PASO 2,54 mm'};
}
export const model=buildNe555();

// ---- Ritmo: 555 astable con RA = R1 y RB = la parte de RV1 entre DESCARGA y TIEMPO ----
// RV1 al 0 % = 20 kΩ (lento); al 100 % = casi 0 Ω (rápido). Se deja un mínimo de 200 Ω para que la salida siga alternando.
export const C1=100e-6,R1=1000;
export const rb=pot=>Math.max(200,20000*(1-pot/100));
export const timing=pot=>({high:.693*(R1+rb(pot))*C1,low:.693*rb(pot)*C1});
// SALIDA en alto: corriente de SALIDA a GND por D2. SALIDA en bajo: de +9 V a SALIDA por D1.
export const indicators=out=>({leds:{D1:!out,D2:Boolean(out)},segments:{}});
