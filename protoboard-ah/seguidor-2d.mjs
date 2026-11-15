import {point,railColumns,columns} from './seguidor-ruteo.mjs';
import {modules} from './seguidor-modelo.mjs';

const gradients=`<defs>
  <linearGradient id="boardPlastic" x2="0" y2="1"><stop stop-color="#fffdf5"/><stop offset="1" stop-color="#eeeade"/></linearGradient>
  <linearGradient id="metalLead" x2="1" y2="1"><stop stop-color="#8b9494"/><stop offset=".45" stop-color="#edf2ef"/><stop offset="1" stop-color="#8e9a96"/></linearGradient>
  <linearGradient id="chipMold" x2="0" y2="1"><stop stop-color="#41444a"/><stop offset=".18" stop-color="#2d3034"/><stop offset=".82" stop-color="#23272a"/><stop offset="1" stop-color="#16191c"/></linearGradient>
  <linearGradient id="tabMetal" x2="1"><stop stop-color="#9aa3a6"/><stop offset=".5" stop-color="#e3e8ea"/><stop offset="1" stop-color="#9aa3a6"/></linearGradient>
  <g id="counterHole"><rect x="-6" y="-6" width="12" height="12" rx="2" fill="#c6c6b9"/><path d="M-4 -4h8v8h-8z" fill="#424940"/><path d="M-4 3h8" stroke="#9a9d8b" stroke-width="1.3"/></g>
</defs>`;
const at=(x,y)=>`translate(${x} ${y})`;
const text=(value,x,y,cls,anchor='middle')=>`<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${value}</text>`;
const pin=h=>`<use href="#counterHole" transform="${at(...point(h))}"/>`;
const right=95+(columns-1)*30+35;

function baseboard(){
  let svg=`<rect x="61" y="151" width="${right-60}" height="604" rx="21" fill="#000" opacity=".15"/><rect x="60" y="145" width="${right-60}" height="605" rx="18" fill="url(#boardPlastic)" stroke="#aaada4" stroke-width="2"/>`;
  svg+=`<rect x="80" y="429" width="${right-100}" height="52" rx="7" fill="#d4d4c7"/><path d="M91 435H${right-21}M91 474H${right-21}" stroke="#b3b8ae" stroke-width="2"/>`;
  svg+=text('400 PUNTOS · PASO 2,54 mm',78,164,'board-print','start');
  for(const row of ['+T','-T','a','b','c','d','e','f','g','h','i','j','-B','+B']){
    const y=point(['A',row,1])[1],rail=row.length>1;
    if(rail){const ink=row.startsWith('+')?'#ac3e4c':'#3c688b';svg+=`<path d="M82 ${y-13}H${right-22}" stroke="${ink}" stroke-width="2"/>`;}
    svg+=text(row,67,y+4,'board-row');
    for(const column of rail?railColumns:Array.from({length:columns},(_,i)=>i+1))svg+=pin(['A',row,column]);
  }
  for(let c=1;c<=columns;c++)if(c===1||c%5===0){const [x]=point(['A','a',c]);svg+=text(c,x,270,'board-column')+text(c,x,647,'board-column');}
  for(const [row,color,name] of [['+T','#b92c49','+5 V'],['-T','#246190','GND'],['+B','#c4661f','VM 6 V'],['-B','#246190','GND']]){
    const [,y]=point(['A',row,1]);
    svg+=text(name,right-28,y+4,'board-print','end').replace('class="board-print"',`class="board-print" fill="${color}"`);
  }
  // Frente del carrito: los sensores van por delante (arriba en el mapa).
  svg+=`<path d="M${right+40} 330V190" stroke="#7d8b84" stroke-width="3"/><path d="M${right+40} 176l-10 16h20z" fill="#7d8b84"/>`+text('FRENTE',right+40,352,'module-label');
  return svg;
}

function moduleArt(m,[x,y],above){
  const label=(value,below)=>text(value,0,above?-(below+18):below,'module-label');
  if(m.type==='sensor')return `<g transform="${at(x,y)}"><rect x="-58" y="-22" width="116" height="44" rx="6" fill="#1d5fa8" stroke="#123f72" stroke-width="2"/><circle cx="-34" cy="-2" r="9" fill="#23308f"/><circle cx="-12" cy="-2" r="9" fill="#141414"/><rect x="8" y="-12" width="22" height="22" rx="3" fill="#20262c"/><circle cx="44" cy="-6" r="6" fill="#c9a256"/>${label(m.name,42)}</g>`;
  if(m.type==='motor')return `<g transform="${at(x,y)}"><rect x="-44" y="-36" width="88" height="72" rx="8" fill="#f2d548" stroke="#c4a52c" stroke-width="2"/><rect x="${x<0?-70:44}" y="-48" width="26" height="96" rx="6" fill="#26292d"/><circle cx="0" cy="0" r="12" fill="#e6c63c" stroke="#b39223"/>${label(m.name,64)}</g>`;
  if(m.type==='battery')return `<g transform="${at(x,y)}"><rect x="-130" y="-34" width="260" height="68" rx="8" fill="#24272b"/>${[0,1,2,3].map(i=>`<rect x="${-118+i*60}" y="-22" width="52" height="44" rx="10" fill="#c8a640"/><rect x="${-118+i*60}" y="-22" width="12" height="44" rx="4" fill="#9a7f2c"/>`).join('')}${label(m.name+' · '+m.value,58)}</g>`;
  return `<g transform="${at(x,y)}"><rect x="-26" y="-34" width="52" height="68" rx="6" fill="#2d3a46"/><rect x="-18" y="-44" width="14" height="12" rx="3" fill="#b9c1c4"/><rect x="4" y="-44" width="14" height="12" rx="3" fill="#b9c1c4"/>${text('9 V',0,6,'led-number')}${label(m.name,58)}</g>`;
}

// Un cable dupont sale de su agujero hacia el borde más cercano de la placa y la rodea
// por fuera hasta su módulo: nunca cruza por encima del montaje.
export function leadPath(item){
  const [x,y]=point(item.a),[ax,ay]=item.anchor,top=item.a[1].length>1?item.a[1].endsWith('T'):item.a[1]<'f';
  const spread=(item.slot-(item.slots-1)/2),edgeY=top?126-item.slot*9:770+item.slot*9,endX=ax+spread*14;
  return [[x,y],[x,edgeY],[endX,edgeY],[endX,ay]];
}
function rounded(points,r=16){
  let d=`M${points[0][0]} ${points[0][1]}`;
  for(let i=1;i<points.length-1;i++){
    const [px,py]=points[i-1],[cx,cy]=points[i],[nx,ny]=points[i+1];
    const a=Math.min(r,Math.hypot(cx-px,cy-py)/2),b=Math.min(r,Math.hypot(nx-cx,ny-cy)/2);
    const ux=Math.sign(cx-px),uy=Math.sign(cy-py),vx=Math.sign(nx-cx),vy=Math.sign(ny-cy);
    d+=`L${cx-ux*a} ${cy-uy*a}Q${cx} ${cy} ${cx+vx*b} ${cy+vy*b}`;
  }
  const [lx,ly]=points.at(-1);return d+`L${lx} ${ly}`;
}
function leadArt(item){
  const [x,y]=point(item.a),d=rounded(leadPath(item));
  return `<g class="follower-lead" data-lead="${item.id}"><path d="${d}" class="lead-halo" stroke-width="9" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${item.color}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="${x-8}" y="${y-15}" width="16" height="26" rx="3" fill="#1d1f22"/>${text(item.pin,x+14,y-8,'lead-pin','start')}</g>`+(item.firstOfModule?moduleArt(modules[item.module],item.anchor,leadPath(item)[1][1]>item.anchor[1]):'');
}

// 'link' = conexión sin jumper; lead marca los cables dupont de módulos externos.
export const kinds=['reg','slide','link'];
export function passive(item){
  if(item.lead)return leadArt(item);
  const legs=[item.a,...(item.routedPins||[]).map(([h])=>h),item.b].map(point);
  const cx=legs.reduce((s,p)=>s+p[0],0)/legs.length,cy=legs[0][1];
  if(item.kind==='reg')return `<g><rect x="${cx-50}" y="${cy-17}" width="100" height="7" rx="2" fill="url(#tabMetal)"/><rect x="${cx-52}" y="${cy-11}" width="104" height="22" rx="4" fill="url(#chipMold)"/>${text('7805',cx,cy+5,'led-number')}${['IN','GND','OUT'].map((n,i)=>text(n,legs[i][0],cy+28,'lead-pin')).join('')}</g>`;
  if(item.kind==='slide')return `<g class="follower-slide">${legs.map(([lx,ly])=>`<path d="M${lx} ${ly}V${ly-6}" stroke="url(#metalLead)" stroke-width="6"/>`).join('')}<rect x="${cx-48}" y="${cy-24}" width="96" height="34" rx="5" fill="#2a2e33" stroke="#0f1113" stroke-width="2"/><rect x="${cx-40}" y="${cy-16}" width="80" height="18" rx="3" fill="#c4c9cc"/><rect class="follower-lever" x="${cx-36}" y="${cy-19}" width="28" height="24" rx="4" fill="#f0eee6" stroke="#8a8f92"/>${text('NEGRA',cx-56,cy-30,'lead-pin','start')}${text('BLANCA',cx+56,cy-30,'lead-pin','end')}</g>`;
  if(item.kind==='cap'){
    const [[ax,ay],[bx,by]]=[point(item.a),point(item.b)],x=(ax+bx)/2,y=(ay+by)/2;
    return `<path d="M${ax} ${ay}L${x-6} ${y-8}M${bx} ${by}L${x+6} ${y-8}" stroke="url(#metalLead)" stroke-width="5"/><ellipse cx="${x}" cy="${y-12}" rx="20" ry="14" fill="#bc7a47" stroke="#795338" stroke-width="2"/>${text(item.value==='0.1 µF'?'104':'334',x,y-8,'led-number')}`;
  }
  return '';
}

export const board=()=>gradients+baseboard();
export const display=()=> '';
