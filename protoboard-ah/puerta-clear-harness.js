/* Shared 2D/3D paths for the external leads of the clear door arrangement. */
(()=>{'use strict';
 const rows={a:290,b:320,c:350,d:380,e:410,f:500,g:530,h:560,i:590,j:620,'+T':185,'-T':215,'-B':680,'+B':710};
 const compact=ps=>ps.filter((p,i)=>!i||p[0]!==ps[i-1][0]||p[1]!==ps[i-1][1]);
 function prepare(m){
  if(!m.clearLayout||m.clearHarnessVersion)return m;
  window.ComponentAssembly.prepare(m);m.clearHarnessVersion=1;
  const point=h=>h[0]==='EXT'?m.externalTerminals[h[1]+':'+h[2]].point:[95+m.boards[h[0]].xOffset+(h[2]-1)*30,rows[h[1]]];
  let upperIndex=0;
  const names=['ABRIR','CERRAR','STOP','FCA','FCC'];
  for(const wire of m.items.filter(i=>i.externalLead)){
   const spec=wire.externalLead,t=point(wire.a),port=point(wire.b),part=m.items.find(i=>i.partId===spec.partId&&(i.externalControl||i.externalMotor)),e=part.externalControl||part.externalMotor,i=spec.terminal;
   let route,height;
   if(spec.motor){const side=1010+i*18,lane=950+i*22;route=[t,[side,t[1]],[side,lane],[port[0],lane],port];height=1.55+i*.25;}
   else{
    const group=names.indexOf(spec.partId),gutter=e.center[0]-170-i*14,lane=790+group*32+i*9,tail=t[1]+22+i*12;
    route=[t,[t[0],tail],[gutter,tail],[gutter,lane]];
    if(['a','b','c','d','e','+T','-T'].includes(wire.b[1])){
     const edge=1985+upperIndex++*17,approach=wire.b[1].length>1?135+group*7:250+group*10;
     route.push([edge,lane],[edge,approach],[port[0],approach]);
    }else route.push([port[0],lane]);
    route.push(port);height=1.1+(group*3+i)*.22;
   }
   route=compact(route);wire.stage=spec.motor?5:2;wire.route=route;wire.externalPath=route.map((p,j)=>(j?'L':'M')+p[0]+' '+p[1]).join(' ');wire.externalHarness=true;wire.externalRouteHeight=height;
   e.cableRoutes||=[];e.cableHeights||=[];e.cableRoutes[i]=route;e.cableHeights[i]=height;
   wire.note+=' Recorrido ordenado: conserva juntos los tres cables de esta pieza; los tramos superiores rodean el extremo de la placa, sin atravesar el integrado.';
  }
  return m;
 }
 window.DoorClearHarness={prepare};
})();
