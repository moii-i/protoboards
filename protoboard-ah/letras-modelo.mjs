// Letras A–H para el visor compartido: siete 74LS151 eligen los segmentos de un display de
// ánodo común según el DIP (S2 S1 S0). Conserva los agujeros de la guía original
// (letras-datos.mjs) y agrega rutas, patas por red, DIP y display para 2D/3D.
// El orden de patas del display es configurable: los cables marcados con displayTarget
// llegan a la pata que el estudiante declara para su display.
import {base} from './letras-datos.mjs';

export const boards={A:{...base.boards.A},B:{...base.boards.B}};
const rowY={a:290,b:320,c:350,d:380,e:410,f:500,g:530,h:560,i:590,j:620,'+T':185,'-T':215,'-B':680,'+B':710};
export const sourceTerminals={'+':[180,100],'-':[340,100]};
export const point=h=>h[0]==='FUENTE'?sourceTerminals[h[1]]:[95+boards[h[0]].xOffset+(h[2]-1)*30,rowY[h[1]]+boards[h[0]].yOffset];
export const dipHole=(c,p)=>[c.board,p>c.pins/2?'e':'f',c.start+(p>c.pins/2?c.pins-p:p-1)];
export const defaultPins={...base.displayPins};
export const validPins=p=>Boolean(p)&&Object.keys(defaultPins).every(k=>Number.isInteger(p[k])&&p[k]>=1&&p[k]<=10)&&new Set(Object.keys(defaultPins).map(k=>p[k])).size===9;
export const ledHole=p=>['B',p>=6?'a':'j',base.displayStart+(p>=6?10-p:p-1)];
// El cable llega a la misma tira que la pata, en el agujero contiguo (b arriba, i abajo): nunca dos terminales en un agujero.
export const wireHole=p=>['B',p>=6?'b':'i',base.displayStart+(p>=6?10-p:p-1)];
export const segmentsOf='abcdefg';
export const {patterns,letters,data,starts}=base;
export const colors={...base.colors,VCC:base.colors['5V'],COM:'#7950a0'};

// Cada 74LS151: X0–X7 fijos a +5 V o GND según la tabla, selectores S2/S1/S0, /G y GND a tierra, W (pin 6) al segmento.
export const chips=[
  ...starts.map((start,u)=>{const nets=Array(16).fill(null);base.pins.forEach((pin,k)=>{nets[pin-1]=data[u][k]?'5V':'GND';});
    Object.assign(nets,{6:'GND',7:'GND',8:'S2',9:'S1',10:'S0',15:'5V'});nets[5]='SEG_'+segmentsOf[u];nets[4]=null;
    return {id:'U'+(u+1),label:'SN74LS151N',name:'Multiplexor · segmento '+segmentsOf[u],board:'A',start,pins:16,nets};}),
  // DIP de 4 vías: pin p (abajo, f) con pin 9−p (arriba, e). Arriba +5 V; abajo los nodos S2, S1 y S0. La vía 4 no se usa.
  {id:'SW1',label:'DIP 4 · SW1',name:'Selector S2 S1 S0',board:'B',start:1,pins:8,dipSwitch:true,functions:{1:'S2',2:'S1',3:'S0'},nets:['S2','S1','S0',null,null,'5V','5V','5V']},
];

const routable=it=>it.kind==='wire';
const resName={C042:'RE1',C044:'RE2',C046:'RE3',C132:'RLED'};

// ---- Rutas ortogonales: esquivan integrados, DIP y display; entre placas usan el espacio libre ----
const compress=points=>{const c=points.filter((p,i)=>!i||p[0]!==points[i-1][0]||p[1]!==points[i-1][1]);return c.filter((p,i)=>!i||i===c.length-1||!((c[i-1][0]===p[0]&&c[i+1][0]===p[0])||(c[i-1][1]===p[1]&&c[i+1][1]===p[1])));};
const distance=(a,b)=>Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1]);
const between=(v,a,b)=>v>=Math.min(a,b)&&v<=Math.max(a,b);
const segs=p=>p.slice(1).map((b,i)=>[p[i],b]);
function crosses([a,b],[c,d]){
  const h=a[1]===b[1];
  if(h!==(c[1]===d[1])){const [p,q,u,v]=h?[a,b,c,d]:[c,d,a,b];return between(u[0],p[0],q[0])&&between(p[1],u[1],v[1])?1:0;}
  const ax=h?0:1;if(a[1-ax]!==c[1-ax])return 0;
  return Math.min(Math.max(a[ax],b[ax]),Math.max(c[ax],d[ax]))>Math.max(Math.min(a[ax],b[ax]),Math.min(c[ax],d[ax]))?3:0;
}
function bodiesFor(){
  const chipBodies=chips.map(c=>{const [x1,y1]=point(dipHole(c,c.pins)),[x2]=point(dipHole(c,c.pins/2));return [x1-12,y1+10,x2+12,y1+81];});
  const [dx,dyt]=point(ledHole(10)),dyb=point(ledHole(1))[1],cy=(dyt+dyb)/2;
  return [...chipBodies,[dx-15,cy-112,dx+135,cy+112]];
}
const bodies=bodiesFor();
const clips=([a,b])=>bodies.some(([l,t,r,d])=>a[0]===b[0]?a[0]>l&&a[0]<r&&Math.min(a[1],b[1])<d&&Math.max(a[1],b[1])>t:a[1]>t&&a[1]<d&&Math.min(a[0],b[0])<r&&Math.max(a[0],b[0])>l);
const yA=[245,265,335,365,395,455,515,545,575,650,665,695],yGap=[770,795,820,845,870,895,920,945],yB=yA.map(y=>y+825);
const xGap=[9,18,27,36,45,54,63].map(c=>95+(c-1)*30+15).concat([65]),xB=[5,10,15,20,24].map(c=>590+(c-1)*30+15);
function options(p,q){
  const out=[[p,[p[0],q[1]],q],[p,[q[0],p[1]],q]];
  for(const y of [...yA,...yGap,...yB])out.push([p,[p[0],y],[q[0],y],q]);
  for(const x of [...xGap,...xB])out.push([p,[x,p[1]],[x,q[1]],q]);
  // De la placa B a la fila superior de A (o al revés): baja/sube por un pasillo entre integrados.
  for(const y1 of yGap)for(const x of xGap)for(const y2 of [245,265,695])out.push([p,[p[0],y1],[x,y1],[x,y2],[q[0],y2],q],[p,[p[0],y2],[x,y2],[x,y1],[q[0],y1],q]);
  return out;
}
export function routeAll(list,done=[]){
  for(const w of list){
    const p=point(w.a),q=point(w.b);let best;
    for(const pass of [true,false]){
      for(const option of options(p,q)){
        const route=compress(option),edges=segs(route);if(pass&&edges.some(clips))continue;
        const crossing=done.map(o=>{let n=0;for(const e1 of segs(o.route))for(const e2 of edges)n+=crosses(e1,e2);return n;});
        const cost=edges.reduce((s,e)=>s+distance(...e),0)+route.length*10+crossing.reduce((s,n)=>s+n*18,0);
        if(!best||cost<best.cost)best={route,cost,crossing};
      }
      if(best)break;
    }
    const used=new Set(done.filter((_,i)=>best.crossing[i]).map(o=>o.routeHeight));
    let routeHeight=.72;while(used.has(routeHeight))routeHeight=Math.round((routeHeight+.32)*100)/100;
    Object.assign(w,{route:best.route,routeHeight});done.push(w);
  }
  return done;
}

// Rutas precalculadas para el orden de patas de referencia (evita rutear 123 cables al abrir la página).
let cached=null;
export function useRoutes(table){cached=table;}

export function buildLetras(pins=defaultPins){
  const displayPins=validPins(pins)?pins:defaultPins;
  const items=base.items.map(src=>{
    const it={...src,signal:src.net};
    if(it.displayTarget){const h=wireHole(displayPins[it.displayTarget]);if(it.displayTarget.startsWith('com'))it.a=h;else it.b=h;}
    if(it.kind==='res')Object.assign(it,{id:'P_'+resName[it.id],partId:resName[it.id],stage:0,label:it.label});
    if(routable(it))it.color=colors[it.net]||'#166e65';
    return it;
  });
  const wires=items.filter(routable),custom=Object.keys(defaultPins).some(k=>displayPins[k]!==defaultPins[k]);
  if(cached&&!custom){for(const w of wires)Object.assign(w,cached[w.id]);}
  else if(cached){const fixed=wires.filter(w=>!w.displayTarget);for(const w of fixed)Object.assign(w,cached[w.id]);routeAll(wires.filter(w=>w.displayTarget),fixed);}
  else routeAll(wires);
  const display={id:'DS1',label:'Display ánodo común',pins:Object.fromEntries(Array.from({length:10},(_,i)=>[i+1,ledHole(i+1)])),nets:Array.from({length:10},(_,i)=>{const k=Object.keys(displayPins).find(k=>displayPins[k]===i+1);return k?(k.startsWith('com')?'COM':'SEG_'+k):null;})};
  const parts=items.filter(it=>it.kind==='res');
  const components=[
    ...chips.map(c=>({id:c.id,name:c.name,value:c.label,holes:c.nets.map((_,i)=>dipHole(c,i+1))})),
    {id:'DS1',name:'Display de ánodo común',value:'7 segmentos',holes:Object.values(display.pins)},
    ...parts.map(p=>({id:p.partId,name:p.label,value:p.value,holes:[p.a,p.b]})),
  ];
  const stages=base.stages.map(([title,text],i)=>[title.replace(/^\d+\.\s*/,''),i===0?text+' Coloca también RE1–RE3 (150 Ω de g1–g3 a −B) y RLED (1 kΩ de b7 a b8).':text]);
  return {bounds:[40,20,1960,1640],stages,chips,displays:[display],items,components,colors,sourceTerminals,boards,displayPins,presentation:'contador'};
}
