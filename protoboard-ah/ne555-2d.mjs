// Dibujo 2D del NE555 para el visor compartido: placa de 30 columnas con rieles continuos,
// pila de 9 V y piezas con el mismo estilo que los contadores (bandas reales de 680 Ω).
import {passive as counterPassive} from './contador-2d.mjs';
import {point,columns,sourceTerminals} from './ne555-modelo.mjs';

const gradients=`<defs>
  <linearGradient id="boardPlastic" x2="0" y2="1"><stop stop-color="#fffdf5"/><stop offset="1" stop-color="#eeeade"/></linearGradient>
  <linearGradient id="metalLead" x2="1" y2="1"><stop stop-color="#8b9494"/><stop offset=".45" stop-color="#edf2ef"/><stop offset="1" stop-color="#8e9a96"/></linearGradient>
  <linearGradient id="chipMold" x2="0" y2="1"><stop stop-color="#41444a"/><stop offset=".18" stop-color="#2d3034"/><stop offset=".82" stop-color="#23272a"/><stop offset="1" stop-color="#16191c"/></linearGradient>
  <linearGradient id="resShell" x2="0" y2="1"><stop stop-color="#f1d3a6"/><stop offset=".52" stop-color="#d2ab7d"/><stop offset="1" stop-color="#a87b54"/></linearGradient>
  <linearGradient id="electrolytic" x2="1" y2="1"><stop stop-color="#31505d"/><stop offset="1" stop-color="#172d39"/></linearGradient>
  <g id="counterHole"><rect x="-6" y="-6" width="12" height="12" rx="2" fill="#c6c6b9"/><path d="M-4 -4h8v8h-8z" fill="#424940"/><path d="M-4 3h8" stroke="#9a9d8b" stroke-width="1.3"/></g>
</defs>`;
const at=(x,y)=>`translate(${x} ${y})`;
const text=(value,x,y,cls,anchor='middle')=>`<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${value}</text>`;
const pin=h=>`<use href="#counterHole" transform="${at(...point(h))}"/>`;
const right=95+(columns-1)*30+35;

function baseboard(){
  let svg=`<rect x="61" y="151" width="${right-60}" height="604" rx="21" fill="#000" opacity=".15"/><rect x="60" y="145" width="${right-60}" height="605" rx="18" fill="url(#boardPlastic)" stroke="#aaada4" stroke-width="2"/>`;
  svg+=`<rect x="80" y="429" width="${right-100}" height="52" rx="7" fill="#d4d4c7"/><path d="M91 435H${right-21}M91 474H${right-21}" stroke="#b3b8ae" stroke-width="2"/>`;
  svg+=text('30 COLUMNAS · PASO 2,54 mm',78,164,'board-print','start');
  for(const row of ['+T','-T','a','b','c','d','e','f','g','h','i','j','-B','+B']){
    const y=point(['A',row,1])[1],rail=row.length>1;
    if(rail){const ink=row.startsWith('+')?'#ac3e4c':'#3c688b';svg+=`<path d="M82 ${y-13}H${right-22}" stroke="${ink}" stroke-width="2"/>`;}
    svg+=text(row,67,y+4,'board-row');
    for(let column=1;column<=columns;column++)svg+=pin(['A',row,column]);
  }
  for(let c=1;c<=columns;c++)if(c===1||c%5===0){const [x]=point(['A','a',c]);svg+=text(c,x,270,'board-column')+text(c,x,647,'board-column');}
  for(const [row,color,name] of [['+T','#b92c49','+9 V'],['-T','#246190','GND'],['+B','#b92c49','+9 V'],['-B','#246190','GND']]){
    const [,y]=point(['A',row,1]);
    svg+=text(name,right-28,y+4,'board-print','end').replace('class="board-print"',`class="board-print" fill="${color}"`);
  }
  return svg;
}

// Pila de 9 V con su broche: los dos cables salen de estos terminales.
function battery(){
  const [px,py]=sourceTerminals['+'],[nx]=sourceTerminals['-'],cx=(px+nx)/2;
  return `<g class="ne555-battery"><rect x="${cx-95}" y="${py-62}" width="190" height="54" rx="8" fill="#2d3a46"/><rect x="${cx-95}" y="${py-62}" width="44" height="54" rx="8" fill="#c8a640"/>${text('9 V',cx+18,py-28,'led-number')}<rect x="${px-9}" y="${py-10}" width="18" height="14" rx="3" fill="#b9c1c4"/><rect x="${nx-9}" y="${py-10}" width="18" height="14" rx="3" fill="#b9c1c4"/>${text('+',px,py-16,'lead-pin')}${text('−',nx,py-16,'lead-pin')}${text('Batería de 9 V',cx+110,py-30,'module-label','start')}</g>`;
}

const bands={'1 kΩ':['#71462e','#252125','#b72e30'],'680 Ω':['#2f5fa8','#8a8d90','#71462e']};
export function passive(item){
  if(item.kind!=='res')return counterPassive(item);
  const [a,b]=[point(item.a),point(item.b)],x=(a[0]+b[0])/2,y=(a[1]+b[1])/2;
  const angle=Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI,standing=Math.hypot(b[0]-a[0],b[1]-a[1])<72,width=standing?30:66;
  return `<path d="M${a.join(' ')}L${b.join(' ')}" stroke="url(#metalLead)" stroke-width="6"/><g transform="${at(standing?a[0]:x,standing?a[1]:y)} rotate(${angle})"><path d="M${-width/2} -9Q${-width/2+3} -15 ${-width/2+10} -13H${width/2-10}Q${width/2-3} -15 ${width/2} -9V9Q${width/2-3} 15 ${width/2-10} 13H${-width/2+10}Q${-width/2+3} 15 ${-width/2} 9Z" fill="url(#resShell)"/>${[...(bands[item.value]||bands['1 kΩ']),'#a78740'].map((c,i)=>`<rect x="${(-.37+i*.21)*width}" y="-13" width="${Math.max(2.2,width*.076)}" height="26" rx="1" fill="${c}"/>`).join('')}</g>`;
}

export const board=()=>gradients+baseboard()+battery();
export const display=()=> '';
