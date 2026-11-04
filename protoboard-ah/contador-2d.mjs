import {point,dipHole,railColumns} from './contador-modelo.mjs';

const gradients=`<defs>
  <linearGradient id="boardPlastic" x2="0" y2="1"><stop stop-color="#fffdf5"/><stop offset="1" stop-color="#eeeade"/></linearGradient>
  <linearGradient id="metalLead" x2="1" y2="1"><stop stop-color="#8b9494"/><stop offset=".45" stop-color="#edf2ef"/><stop offset="1" stop-color="#8e9a96"/></linearGradient>
  <linearGradient id="chipMold" x2="0" y2="1"><stop stop-color="#41444a"/><stop offset=".18" stop-color="#2d3034"/><stop offset=".82" stop-color="#23272a"/><stop offset="1" stop-color="#16191c"/></linearGradient>
  <linearGradient id="resShell" x2="0" y2="1"><stop stop-color="#f1d3a6"/><stop offset=".52" stop-color="#d2ab7d"/><stop offset="1" stop-color="#a87b54"/></linearGradient>
  <radialGradient id="ledLens" cx=".28" cy=".27" r=".83"><stop stop-color="#d8a3ef"/><stop offset=".46" stop-color="#9f55c2"/><stop offset="1" stop-color="#432757"/></radialGradient>
  <radialGradient id="ledOn" cx=".35" cy=".25" r=".85"><stop stop-color="#fff0ff"/><stop offset=".34" stop-color="#ed9aff"/><stop offset="1" stop-color="#9c3ada"/></radialGradient>
  <linearGradient id="electrolytic" x2="1" y2="1"><stop stop-color="#31505d"/><stop offset="1" stop-color="#172d39"/></linearGradient>
  <g id="counterHole"><rect x="-6" y="-6" width="12" height="12" rx="2" fill="#c6c6b9"/><path d="M-4 -4h8v8h-8z" fill="#424940"/><path d="M-4 3h8" stroke="#9a9d8b" stroke-width="1.3"/></g>
</defs>`;
const at=(x,y)=>`translate(${x} ${y})`;
const text=(value,x,y,cls)=>`<text x="${x}" y="${y}" class="${cls}">${value}</text>`;
const pin=(h)=>`<use href="#counterHole" transform="${at(...point(h))}"/>`;

function baseboard(){
  let svg='<rect x="61" y="151" width="1930" height="604" rx="21" fill="#000" opacity=".15"/><rect x="60" y="145" width="1930" height="605" rx="18" fill="url(#boardPlastic)" stroke="#aaada4" stroke-width="2"/>';
  svg+='<rect x="80" y="429" width="1890" height="52" rx="7" fill="#d4d4c7"/><path d="M91 435h1868M91 474h1868" stroke="#b3b8ae" stroke-width="2"/>';
  svg+=text('830 PUNTOS · PASO 2,54 mm',78,164,'board-print');
  for(const row of ['+T','-T','a','b','c','d','e','f','g','h','i','j','-B','+B']){
    const y=point(['A',row,1])[1],rail=row.length>1;
    if(rail){const ink=row.startsWith('+')?'#ac3e4c':'#3c688b';svg+=`<path d="M82 ${y-13}h940m42 0h895" stroke="${ink}" stroke-width="2"/>`;}
    svg+=text(row,67,y+4,'board-row');
    for(const column of rail?railColumns:Array.from({length:63},(_,i)=>i+1))svg+=pin(['A',row,column]);
  }
  for(let c=1;c<=63;c++)if(c===1||c%5===0||c===63){const [x]=point(['A','a',c]);svg+=text(c,x,270,'board-column')+text(c,x,647,'board-column');}
  for(const [row,color,name] of [['+T','#b92c49','+5 V'],['-T','#246190','GND']]){
    const [x,y]=point(['A',row,4]);
    svg+=`<circle cx="${x}" cy="${y}" r="10" fill="none" stroke="${color}" stroke-width="3"/>${text(name,x+15,y-5,'board-print')}`;
  }
  return svg;
}

function chip(c){
  const [x]=point(dipHole(c,1)),left=x-12,width=(c.pins/2-1)*30+24,right=left+width;
  let svg=`<g class="counter-part" data-part="${c.id}" tabindex="0" role="button" aria-label="${c.id} ${c.label}"><title>${c.label} · ${c.name}</title>`;
  for(let p=1;p<=c.pins;p++){
    const [px,py]=point(dipHole(c,p)),edge=p>c.pins/2?423:488;
    svg+=`<path d="M${px} ${py}V${edge}" stroke="#495450" stroke-width="10" stroke-linecap="round"/><path d="M${px} ${py}V${edge}" stroke="url(#metalLead)" stroke-width="7" stroke-linecap="round"/>`;
  }
  svg+=`<path d="M${left+7} 421H${right-7}Q${right} 421 ${right} 428V483Q${right} 490 ${right-7} 490H${left+7}Q${left} 490 ${left} 483V466A11 11 0 0 0 ${left} 445V428Q${left} 421 ${left+7} 421Z" fill="url(#chipMold)" stroke="#151919" stroke-width="2"/>`;
  svg+=`<circle cx="${left+16}" cy="478" r="3.2" fill="#949692"/>${text(c.label,left+width/2,451,'chip-print')}${text(c.id,left+width/2,473,'chip-subprint')}</g>`;
  return svg;
}

const segmentShapes={a:'-36,-77 36,-77 44,-70 36,-64 -36,-64 -44,-70',b:'37,-61 45,-68 52,-61 52,-12 45,-5 37,-12',c:'37,12 45,5 52,12 52,61 45,68 37,61',d:'-36,64 36,64 44,70 36,77 -36,77 -44,70',e:'-52,12 -45,5 -37,12 -37,61 -45,68 -52,61',f:'-52,-61 -45,-68 -37,-61 -37,-12 -45,-5 -52,-12',g:'-36,-6 36,-6 44,0 36,6 -36,6 -44,0'};
function display(d){
  const [x]=point(d.pins[3]),y=(point(d.pins[3])[1]+point(d.pins[8])[1])/2;
  return `<g class="counter-part" data-part="${d.id}" transform="${at(x,y)}" tabindex="0" role="button" aria-label="${d.label} cátodo común"><rect x="-74" y="-109" width="148" height="223" rx="11" fill="#15171c" stroke="#555457" stroke-width="2"/><rect x="-67" y="-102" width="134" height="209" rx="7" fill="#2b272c"/>${Object.entries(segmentShapes).map(([id,poly])=>`<polygon class="counter-seg" data-segment="${id}" points="${poly}" transform="skewX(-7)"/>`).join('')}<circle cx="53" cy="71" r="7" fill="#7f7075"/>${text(d.label,0,95,'chip-subprint')}</g>`;
}

const bands={'1 kΩ':['#71462e','#252125','#b72e30'],'10 kΩ':['#71462e','#252125','#d76726'],'100 kΩ':['#71462e','#252125','#d8b53c']};
function passive(item){
  const [a,b]=[point(item.a),point(item.b)],x=(a[0]+b[0])/2,y=(a[1]+b[1])/2;
  let shape;
  if(item.kind==='res'){
    const angle=Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI;
    const standing=Math.hypot(b[0]-a[0],b[1]-a[1])<72;
    const width=standing?30:66;
    shape=`<path d="M${a.join(' ')}L${b.join(' ')}" stroke="url(#metalLead)" stroke-width="6"/><g transform="${at(standing?a[0]:x,standing?a[1]:y)} rotate(${angle})"><path d="M${-width/2} -9Q${-width/2+3} -15 ${-width/2+10} -13H${width/2-10}Q${width/2-3} -15 ${width/2} -9V9Q${width/2-3} 15 ${width/2-10} 13H${-width/2+10}Q${-width/2+3} 15 ${-width/2} 9Z" fill="url(#resShell)"/>${[...(bands[item.value]||bands['1 kΩ']),'#a78740'].map((c,i)=>`<rect x="${(-.37+i*.21)*width}" y="-13" width="${Math.max(2.2,width*.076)}" height="26" rx="1" fill="${c}"/>`).join('')}</g>`;
  }else if(item.kind==='led'){
    shape=`<path d="M${a.join(' ')}L${b.join(' ')}" stroke="url(#metalLead)" stroke-width="6"/><g transform="${at(x,y)}"><circle r="29" fill="#54325e"/><circle class="counter-led" data-led="${item.value}" r="25"/><path d="M${b[0]>a[0]?21:-21} -14v28" stroke="#d3a7dd" stroke-opacity=".6" stroke-width="2"/>${text(item.bit,0,5,'led-number')}</g>`;
  }else{
    shape=`<path d="M${a.join(' ')}L${b.join(' ')}" stroke="url(#metalLead)" stroke-width="6"/>`;
    shape+=item.polarized?`<g transform="${at(x,y)}"><circle r="23" fill="url(#electrolytic)"/><circle r="18" fill="#9caeb3"/><path d="M-9 0h18M0-9v18" stroke="#657c82" stroke-width="2"/>${text('+',-30,5,'board-print')}${text('−',25,5,'board-print')}</g>`:`<ellipse cx="${x}" cy="${y}" rx="20" ry="16" fill="#bc7a47" stroke="#795338" stroke-width="2"/>${text('104',x,y+4,'led-number')}`;
  }
  return `<g class="counter-part" data-part="${item.partId}" tabindex="0" role="button" aria-label="${item.label}"><title>${item.label}</title>${shape}</g>`;
}

function jumper(item){
  const p=item.route.map((pos,i)=>(i?'L':'M')+pos.join(' ')).join(' ');
  return `<g class="counter-jumper" data-wire="${item.id}" tabindex="0" role="button" aria-label="${item.label}"><title>${item.label}</title><path class="jumper-hit" d="${p}"/><path class="jumper-outline" d="${p}"/><path class="jumper-core" d="${p}" stroke="${item.color}"/><path class="jumper-shine" d="${p}"/></g>`;
}

export function drawBoard(svg,model){
  svg.innerHTML=gradients+baseboard()+[...model.items.filter(i=>i.kind==='wire')].sort((a,b)=>a.routeHeight-b.routeHeight).map(jumper).join('')+model.chips.map(chip).join('')+model.displays.map(display).join('')+model.items.filter(i=>i.kind!=='wire').map(passive).join('')+'<g id="counterMarkers" pointer-events="none"></g>';
  svg.setAttribute('viewBox',model.bounds.join(' '));
}
