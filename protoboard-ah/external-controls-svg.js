/* Functional top view of the externally mounted hardware. */
function externalControlSVG(it){
 const e=it.externalControl,[x,y]=e.center,slide=e.model==='scmm-122',holes=[it.a,it.b,it.third];
 const leads=e.terminals.map(([tx,ty],i)=>{
  const [hx,hy]=point(holes[i]),lane=815+i*22,left=x-150-i*18;
  return '<path d="M'+hx+' '+hy+' V'+lane+' C'+hx+' '+(lane+55)+' '+left+' '+(lane+35)+' '+left+' '+y+' C'+left+' '+(y+140+i*10)+' '+tx+' '+(y+140+i*10)+' '+tx+' '+(ty+22)+' V'+ty+'" stroke="'+e.colors[i]+'" stroke-width="6" fill="none" stroke-linecap="round"/><rect x="'+(hx-5)+'" y="'+(hy-6)+'" width="10" height="16" rx="2" fill="#263735"/><circle cx="'+hx+'" cy="'+hy+'" r="4" fill="'+e.colors[i]+'"/><rect x="'+(tx-7)+'" y="'+(ty+6)+'" width="14" height="25" rx="4" fill="#263735"/><circle cx="'+tx+'" cy="'+ty+'" r="7" fill="#c9ceca" stroke="#718177" stroke-width="2"/>'+svgText(tx,ty+48,(slide?['+5','COM','GND']:['NC','COM','NA'])[i],15,i===0?'#ae4447':'#3b594d','middle');
 }).join('');
 let body='';
 if(slide){
  body='<rect x="'+(x-71)+'" y="'+(y-31)+'" width="142" height="71" rx="4" fill="#a57a37"/><rect x="'+(x-69)+'" y="'+(y-34)+'" width="138" height="66" rx="5" fill="#252d2d"/><rect x="'+(x-121)+'" y="'+(y-38)+'" width="242" height="76" rx="7" fill="#646d68" stroke="#3e4b45" stroke-width="3"/>'+[-95,95].map(dx=>'<ellipse cx="'+(x+dx)+'" cy="'+y+'" rx="14" ry="10" fill="#edf1ed" stroke="#404f47" stroke-width="2"/>').join('')+'<rect x="'+(x-42)+'" y="'+(y-15)+'" width="84" height="30" rx="3" fill="#152624"/><g data-control-slider="'+it.value+'" transform="translate(-20 0)"><rect x="'+(x-16)+'" y="'+(y-22)+'" width="32" height="44" rx="4" fill="#202828" stroke="#111f1d" stroke-width="2"/>'+[0,1,2,3,4].map(i=>'<path d="M'+(x-12+i*6)+' '+(y-17)+' V'+(y+17)+'" stroke="#5e6861" stroke-width="2"/>').join('')+'</g>';
 }else{
  body='<rect x="'+(x-99)+'" y="'+(y-39)+'" width="198" height="78" rx="7" fill="#4ca6a0" stroke="#297f7b" stroke-width="4"/>'+[-56,56].map(dx=>'<circle cx="'+(x+dx)+'" cy="'+(y+15)+'" r="12" fill="#203d39" stroke="#6dc1b7" stroke-width="4"/>').join('')+'<rect x="'+(x+30)+'" y="'+(y-28)+'" width="25" height="23" rx="4" fill="#253d39"/><g data-control-lever="'+it.value+'" data-pivot-x="'+(x-77)+'" data-pivot-y="'+(y-28)+'" transform="rotate(-10 '+(x-77)+' '+(y-28)+')"><path d="M'+(x-77)+' '+(y-28)+' H'+(x+131)+' l12 -8" fill="none" stroke="#a8b8b3" stroke-width="11" stroke-linecap="round"/><path d="M'+(x-70)+' '+(y-31)+' H'+(x+128)+'" stroke="#e4ede6" stroke-width="3"/></g><circle cx="'+(x-77)+'" cy="'+(y-28)+'" r="8" fill="#cad5d0" stroke="#6d8279" stroke-width="3"/>';
 }
 body+=e.terminals.map(([tx,ty])=>'<path d="M'+tx+' '+(y+32)+' V'+ty+'" stroke="#af9c6d" stroke-width="6"/>').join('');
 return '<g class="external-control" data-control-model="'+e.model+'">'+leads+'<g data-external-actuator="'+it.value+'">'+body+'</g>'+svgText(x,y-78,it.value+' · '+e.model.toUpperCase(),21,it.value==='STOP'?'#a14448':'#355a4b','middle','font-weight="700"')+svgText(x,y+225,slide?'Deslizable · mantiene la posición':'Palanca · vuelve al soltar',17,'#506e5d','middle')+'</g>';
}
