// One orthogonal route is consumed by both the SVG and Three.js viewers.
module.exports=function routeWires(model){
 const ys={a:290,b:320,c:350,d:380,e:410,f:500,g:530,h:560,i:590,j:620,'+T':185,'-T':215,'-B':680,'+B':710};
 const point=h=>h[0]==='FUENTE'?model.sourceTerminals[h[1]]:[95+model.boards[h[0]].xOffset+(h[2]-1)*30,ys[h[1]]];
 const step=15,x0=5,y0=5,nx=277,ny=70,N=nx*ny,blocked=new Uint8Array(N),horizontal=new Uint16Array(N),vertical=new Uint16Array(N),edges=new Map();
 const xy=n=>[x0+(n%nx)*step,y0+Math.floor(n/nx)*step],node=p=>Math.round((p[0]-x0)/step)+Math.round((p[1]-y0)/step)*nx;
 const rects=[];
 for(const c of model.chips){const x=point([c.board,'e',c.start])[0];rects.push([x-18,420,x+(c.pins/2-1)*30+18,490]);}
 for(const d of model.displays){const [x,y]=point(d.pins[10]);rects.push([x-20,y-27.5,x+140,y+207.5]);}
 for(const a of model.arrays||[]){const p=Object.values(a.pinHoles).map(point);rects.push([Math.min(...p.map(p=>p[0]))-17,258,Math.max(...p.map(p=>p[0]))+17,287]);}
 for(const it of model.items.filter(x=>['cap','led','res'].includes(x.kind))){const a=point(it.a),b=point(it.b),x=(a[0]+b[0])/2,y=(a[1]+b[1])/2;if(it.kind==='cap')rects.push([x-22,y-(it.polarized?67:54),x+22,y-11]);if(it.kind==='led')rects.push([x-23,y-59,x+23,y-12]);if(it.kind==='res')rects.push([a[0]-12,a[1]-12,a[0]+12,a[1]+12]);}
 if(model.externalMotor)rects.push(model.externalMotor.bounds);
 for(let n=0;n<N;n++){const[x,y]=xy(n);if(rects.some(r=>x>=r[0]&&x<=r[2]&&y>=r[1]&&y<=r[3]))blocked[n]=1;}
 class Heap{constructor(){this.a=[];}push(v){let i=this.a.length;this.a.push(v);while(i){const p=(i-1)>>1;if(this.a[p][0]<=v[0])break;this.a[i]=this.a[p];i=p;}this.a[i]=v;}pop(){const a=this.a,out=a[0],v=a.pop();if(a.length){let i=0;while(i*2+1<a.length){let c=i*2+1;if(c+1<a.length&&a[c+1][0]<a[c][0])c++;if(a[c][0]>=v[0])break;a[i]=a[c];i=c;}a[i]=v;}return out;}get length(){return this.a.length;}}
 const wireItems=model.items.filter(it=>it.kind==='wire'),length=it=>{const a=point(it.a),b=point(it.b);return Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1]);};
 const compact=ps=>ps.filter((p,i)=>!i||p[0]!==ps[i-1][0]||p[1]!==ps[i-1][1]).filter((p,i,all)=>!i||i===all.length-1||!((all[i-1][0]===p[0]&&p[0]===all[i+1][0])||(all[i-1][1]===p[1]&&p[1]===all[i+1][1])));
 const sorted=[...wireItems].sort((a,b)=>(a.stage===1?0:1)-(b.stage===1?0:1)||length(a)-length(b));
 for(const it of sorted){
  const a=point(it.a),b=point(it.b),start=node(a),goal=node(b),dist=new Float64Array(N*3),prev=new Int32Array(N*3),heap=new Heap();dist.fill(Infinity);prev.fill(-1);const root=start*3;dist[root]=0;
  const heuristic=n=>{const p=xy(n),q=xy(goal);return Math.abs(p[0]-q[0])+Math.abs(p[1]-q[1]);};heap.push([heuristic(start),root,0]);let end=-1;
  while(heap.length){const [,state,g]=heap.pop();if(g!==dist[state])continue;const n=Math.floor(state/3),dir=state%3;if(n===goal){end=state;break;}const x=n%nx,y=Math.floor(n/nx);
   for(const [next,axis]of [[x? n-1:-1,1],[x<nx-1?n+1:-1,1],[y?n-nx:-1,2],[y<ny-1?n+nx:-1,2]]){if(next<0||(blocked[next]&&next!==goal&&next!==start))continue;const ek=Math.min(n,next)+':'+Math.max(n,next),overlap=edges.get(ek)||0,cross=(axis===1?vertical[next]:horizontal[next]);const cost=step+(dir&&dir!==axis?19:0)+overlap*160+(next!==goal&&next!==start?cross*42:0),ns=next*3+axis,ng=g+cost;if(ng<dist[ns]){dist[ns]=ng;prev[ns]=state;heap.push([ng+heuristic(next),ns,ng]);}}
  }
  if(end<0)throw Error('No orthogonal route for '+it.id);
  const nodes=[];for(let q=end;q>=0;q=prev[q])nodes.push(Math.floor(q/3));nodes.reverse();
  for(let i=1;i<nodes.length;i++){const n=nodes[i-1],q=nodes[i],axis=Math.abs(n-q)===1?1:2,ek=Math.min(n,q)+':'+Math.max(n,q);edges.set(ek,(edges.get(ek)||0)+1);(axis===1?horizontal:vertical)[n]++;(axis===1?horizontal:vertical)[q]++;}
  const path=nodes.map(xy),first=path[0],last=path[path.length-1];
  // Source terminals are the only points outside the 15 px hole grid.
  const prefix=a[0]===first[0]||a[1]===first[1]?[a]:[a,[first[0],a[1]]],suffix=b[0]===last[0]||b[1]===last[1]?[b]:[[last[0],b[1]],b];
  it.route=compact([...prefix,...path,...suffix]);it.routingClass=it.a[0]==='FUENTE'?'external':it.signal==='GND'||it.signal==='VCC'||it.signal==='VM'?'power':it.a[0]!==it.b[0]?'bus':'local';it.routeHeight=it.routingClass==='bus'?1.05:it.routingClass==='external'?.88:.65;it.routeLength=it.route.slice(1).reduce((s,p,i)=>s+Math.abs(p[0]-it.route[i][0])+Math.abs(p[1]-it.route[i][1]),0);
 }
 const segments=it=>it.route.slice(1).map((b,i)=>({a:it.route[i],b}));
 const conflict=(a,b)=>segments(a).some(p=>segments(b).some(q=>{const ph=p.a[1]===p.b[1],qh=q.a[1]===q.b[1];if(ph===qh)return false;const h=ph?p:q,v=ph?q:p;return v.a[0]>Math.min(h.a[0],h.b[0])&&v.a[0]<Math.max(h.a[0],h.b[0])&&h.a[1]>Math.min(v.a[1],v.b[1])&&h.a[1]<Math.max(v.a[1],v.b[1]);}));
 // Crossings are insulated jumpers, never junctions. Distinct heights keep
 // crossing tubes from occupying the same space in the 3D view.
 const assigned=[];let crossings=0;for(const it of sorted){const hits=assigned.filter(other=>conflict(it,other)),used=new Set(hits.map(x=>x.routeLevel));crossings+=hits.length;let level=0;while(used.has(level))level++;it.routeLevel=level;it.routeHeight=.65+level*.28;assigned.push(it);}
 const all=wireItems.flatMap(it=>it.route);const bottom=Math.max(850,model.externalMotor?.bounds[3]||0,...all.map(p=>p[1]+45));model.bounds=[0,0,4180,bottom];model.viewBoxes={A:[0,0,2070,bottom],B:[2070,0,2110,bottom]};if(model.externalMotor)model.viewBoxes.motor=[1100,540,980,740];model.layoutVersion='door-'+model.assemblyVariant+(model.externalMotor?'-placement-v3':'-routing-v2');model.routingStats={wires:wireItems.length,orthogonal:true,lowerGroundBridges:4,crossingWirePairs:crossings,totalLength:Math.round(wireItems.reduce((s,it)=>s+it.routeLength,0)),powerLeadLength:Math.round(wireItems.filter(it=>['VCC','GND','VM'].includes(it.toRef)).reduce((s,it)=>s+length(it),0))};
};
