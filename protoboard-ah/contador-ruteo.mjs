// Shared geometry and wire router for the single 830-point counter boards.
// Both counters (0→9 and 9→0) use the same holes, rails and routing rules.
const rowY={'+T':185,'-T':215,a:290,b:320,c:350,d:380,e:410,f:500,g:530,h:560,i:590,j:620,'-B':680,'+B':710};
export const railColumns=Array.from({length:59},(_,i)=>i+3).filter(c=>(c-3)%6<5);
export const bounds=[40,130,1950,640];
export const point=([,row,column])=>[95+(column-1)*30,rowY[row]];
export const hole=(row,column)=>['A',row,column];
export const strip=([,row,col])=>row.length===1?`${row<'f'?'T':'B'}:${col}`:`${row}:${col<=31?'I':'D'}`;
export const address=([,row,col])=>`${row} · ${col}`;
export const dipHole=(c,p)=>hole(p>c.pins/2?'e':'f',c.start+(p>c.pins/2?c.pins-p:p-1));
export const part=(id,kind,value,a,b,fromNet,toNet,extra={})=>({id:'P_'+id,partId:id,kind,value,a,b,stage:0,label:`${id} · ${value}`,fromNet,toNet,...extra});

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
export const packageBodies=chips=>[...chips.map(c=>[point(hole('e',c.start))[0]-12,420,point(hole('f',c.start+c.pins/2-1))[0]+12,491]),[1700,358,1850,582]];
// Bodies of components that stand above the board. Wires must not be drawn through them.
export function partBodies(passives){
  return passives.filter(part=>part.kind==='led'||part.kind==='cap'||part.tactile).map(part=>{
    if(part.tactile){
      const legs=[part.a,part.b,...(part.extraPins||[]).map(([h])=>h)].map(point),xs=legs.map(p=>p[0]),ys=legs.map(p=>p[1]);
      return [Math.min(...xs)-14,Math.min(...ys)-14,Math.max(...xs)+14,Math.max(...ys)+14];
    }
    const [[ax,ay],[bx,by]]=[point(part.a),point(part.b)];
    const x=(ax+bx)/2,y=(ay+by)/2-(part.kind==='led'?35:0);
    const halfWidth=part.kind==='cap'&&!part.polarized?22:24;
    const halfHeight=part.kind==='cap'&&!part.polarized?18:24;
    return [x-halfWidth,y-halfHeight,x+halfWidth,y+halfHeight];
  });
}

/**
 * Places chips, display and passives, then joins every net with the shortest
 * jumper set that avoids component bodies and reuses strips and rails.
 * stageFor(net, from, to) returns the guide stage of a generated wire.
 */
export function routeBoard({chips,display,passives,bodies,colors,stageFor,extraHoles=[]}){
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
  display.nets.forEach((n,i)=>attach(display.pins[i+1],n,`${display.id}.${i+1}`));
  for(const p of passives){
    attach(p.a,p.fromNet,p.partId+'.1');attach(p.b,p.toNet,p.partId+'.2');
    // Extra legs are joined inside the part (pulsador de 4 patas): they occupy a hole,
    // report their net, but never ask the router for another jumper.
    (p.extraPins||[]).forEach(([h,net],i)=>{attach(h,null);terminals.push({h,net,ref:`${p.partId}.${i+3}`,internal:true});});
    items.push(p);
  }
  for(const [h,net,ref] of extraHoles)attach(h,net,ref);
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
    const w={id:'W'+String(wires.length+1).padStart(2,'0'),kind:'wire',net,signal:net,fromRef,toRef,color:colors[net]||'#166e65',routingClass:['VCC','GND'].includes(net)?'power':'signal',a,b,route,routeHeight,stage,label};
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
      bridge(best.a,best.b,net,`${net} · ${best.from.ref} a ${best.to.ref}`,power?1:stageFor(net,best.from,best.to),best.from.ref,best.to.ref);
      connected.push(best.to);todo.splice(todo.indexOf(best.to),1);
    }
  }
  return {items,terminals,feeds};
}
