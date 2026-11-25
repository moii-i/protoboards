// Geometría y ruteo de la protoboard de 400 puntos del seguidor de línea.
// Mismas reglas que contador-ruteo.mjs (tiras compartidas, rutas ortogonales que
// esquivan encapsulados), con tres diferencias:
//   · 30 columnas y rieles continuos (sin corte central);
//   · una sola fuente: +T y +B = VCC (4 × AA tras SW2), −T y −B = GND;
//   · los cables externos (sensores, motores, baterías) entran directo a una tira.
const rowY={'+T':185,'-T':215,a:290,b:320,c:350,d:380,e:410,f:500,g:530,h:560,i:590,j:620,'-B':680,'+B':710};
export const columns=30;
export const railColumns=Array.from({length:29},(_,i)=>i+2).filter(c=>(c-2)%6<5);
export const point=([,row,column])=>[95+(column-1)*30,rowY[row]];
export const hole=(row,column)=>['A',row,column];
export const strip=([,row,col])=>row.length===1?`${row<'f'?'T':'B'}:${col}`:row;
export const address=([,row,col])=>`${row} · ${col}`;
export const dipHole=(c,p)=>hole(p>c.pins/2?'e':'f',c.start+(p>c.pins/2?c.pins-p:p-1));
export const part=(id,kind,value,a,b,fromNet,toNet,extra={})=>({id:'P_'+id,partId:id,kind,value,a,b,stage:0,label:`${id} · ${value}`,fromNet,toNet,...extra});
export const railNets={'+T':'VCC','-T':'GND','+B':'VCC','-B':'GND'};

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
function clipsBody([a,b],bodies){
  return bodies.some(([l,t,r,d])=>a[0]===b[0]?a[0]>l&&a[0]<r&&Math.min(a[1],b[1])<d&&Math.max(a[1],b[1])>t:a[1]>t&&a[1]<d&&Math.min(a[0],b[0])<r&&Math.max(a[0],b[0])>l);
}
export const packageBodies=chips=>chips.map(c=>[point(hole('e',c.start))[0]-12,420,point(hole('f',c.start+c.pins/2-1))[0]+12,491]);
// Piezas que sobresalen de la placa: los cables no se dibujan a través de ellas.
export function partBodies(passives){
  return passives.filter(p=>['cap','reg','slide'].includes(p.kind)).map(p=>{
    const legs=[p.a,...(p.routedPins||[]).map(([h])=>h),p.b].map(point),xs=legs.map(l=>l[0]),y=legs[0][1];
    if(p.kind==='reg')return [Math.min(...xs)-20,y-22,Math.max(...xs)+20,y+12];
    if(p.kind==='slide')return [Math.min(...xs)-16,y-16,Math.max(...xs)+16,y+16];
    const [[ax,ay],[bx,by]]=[point(p.a),point(p.b)];
    return [Math.min(ax,bx)-8,Math.min(ay,by)-14,Math.max(ax,bx)+8,Math.max(ay,by)+4];
  });
}

/**
 * Coloca integrados, piezas y cables externos y une cada red con el menor
 * número de jumpers que esquivan cuerpos y reutilizan tiras y rieles.
 * stageFor(net, from, to) da la etapa de la guía de cada jumper generado.
 */
export function routeBoard({chips,passives,leads=[],bodies,colors,stageFor}){
  const occupied=new Set(),nodes=new Map(),items=[],wires=[],terminals=[];
  function attach(h,net,ref){
    const key=h.join('/');
    if(occupied.has(key))throw Error('Agujero ocupado: '+address(h));
    occupied.add(key);
    if(!net)return;
    if(h[1].length>1&&railNets[h[1]]!==net)throw Error('Red '+net+' en el riel '+h[1]);
    const k=strip(h),prior=nodes.get(k);
    if(prior&&prior.net!==net)throw Error('Dos redes en una tira: '+k+' ('+prior.net+' y '+net+')');
    nodes.set(k,{h,net,ref:prior?prior.ref:ref});terminals.push({h,net,ref});
  }
  for(const c of chips)c.nets.forEach((n,i)=>attach(dipHole(c,i+1),n,`${c.id}.${i+1}`));
  for(const p of passives){
    attach(p.a,p.fromNet,p.partId+'.1');
    (p.routedPins||[]).forEach(([h,net,ref],i)=>attach(h,net,ref||`${p.partId}.${i+2}`));
    attach(p.b,p.toNet,p.partId+'.'+(2+(p.routedPins||[]).length));
    items.push(p);
  }
  for(const l of leads){attach(l.a,l.net,l.partId+'.'+l.pin);items.push(l);}
  for(const [r,n] of Object.entries(railNets))if(!nodes.has(r))nodes.set(r,{h:hole(r,2),net:n,ref:r});
  const free=h=>!occupied.has(h.join('/'));
  function ports({h}){
    const [,r,c]=h;
    const candidates=r.length===1?[...(r<'f'?'abcde':'fghij')].map(row=>hole(row,c)):railColumns.map(col=>hole(r,col));
    return candidates.filter(free);
  }
  function routeFor(a,b){
    const p=point(a),q=point(b),options=[[p,[p[0],q[1]],q],[p,[q[0],p[1]],q]];
    for(const y of [245,265,335,365,395,455,515,545,575,650,665,695])options.push([p,[p[0],y],[q[0],y],q]);
    for(const x of [65,140,380,620,860,985])options.push([p,[x,p[1]],[x,q[1]],q]);
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
    const w={id:'W'+String(wires.length+1).padStart(2,'0'),kind:'wire',net,signal:net,fromRef,toRef,color:colors[net]||'#166e65',routingClass:['VCC','GND'].includes(net)?'power':'signal',a,b,route,routeHeight,stage,label};
    wires.push(w);items.push(w);
  }
  // Cada par de rieles se une una sola vez, en las últimas columnas libres: GND y VCC.
  for(const [top,bottom,net] of [['-T','-B','GND'],['+T','+B','VCC']]){
    const column=railColumns.filter(c=>['-T','-B','+T','+B'].every(r=>free(hole(r,c)))).at(-1);
    bridge(hole(top,column),hole(bottom,column),net,net+' · unir riel superior e inferior',1,top,bottom);
  }
  const power=new Set(['VCC','GND']);
  for(const net of [...new Set([...nodes.values()].map(n=>n.net))]){
    const parts=[...nodes.values()].filter(n=>n.net===net);
    const connected=power.has(net)?parts.filter(n=>n.h[1].length>1):parts.slice(0,1);
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
      bridge(best.a,best.b,net,`${net} · ${best.from.ref} a ${best.to.ref}`,stageFor(net,best.from,best.to),best.from.ref,best.to.ref);
      connected.push(best.to);todo.splice(todo.indexOf(best.to),1);
    }
  }
  return {items,terminals};
}
