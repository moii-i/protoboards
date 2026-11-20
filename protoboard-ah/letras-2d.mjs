// Dibujo 2D de las dos placas de Letras A–H y la fuente de 5 V para el visor compartido.
// Integrados, DIP, display, resistencias y cables los dibuja el mapa compartido.
import {boards,point,sourceTerminals} from './letras-modelo.mjs';

const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const text=(x,y,value,size=16,color='#344a40',anchor='start',extra='')=>`<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" fill="${color}" text-anchor="${anchor}" ${extra}>${esc(value)}</text>`;
const names={A:'PLACA A · GRANDE · 63 COLUMNAS',B:'PLACA B · CHICA · 30 COLUMNAS'};

function boardSVG(id,b){
  const x=60+b.xOffset,y=145+b.yOffset,w=(b.columns-1)*30+70;
  let out=`<g class="breadboard"><rect x="${x}" y="${y}" width="${w}" height="605" rx="15" fill="#faf9ef" stroke="#c4ccc4" stroke-width="2"/><rect x="${x+20}" y="${y+278}" width="${w-40}" height="65" rx="4" fill="#d2d9d3"/>`+text(x+18,y+23,names[id],15);
  for(const row of [...'abcdefghij','+T','-T','-B','+B']){
    const color=row.startsWith('+')?'#bd444b':row.startsWith('-')?'#3e81b5':'#586b60',[,py]=point([id,row,1]);
    out+=text(x+9,py+5,row,13,color);
    if(row.length>1)out+=b.railBreak?`<path d="M${x+28} ${py-13}H${x+925}M${x+985} ${py-13}H${x+w-20}" stroke="${color}" stroke-width="2"/>`:`<path d="M${x+28} ${py-13}H${x+w-20}" stroke="${color}" stroke-width="2"/>`;
    for(let c=1;c<=b.columns;c++){const [px]=point([id,row,c]);out+=`<rect x="${px-5}" y="${py-5}" width="10" height="10" rx="2" fill="#505a52" stroke="#bec8bd" stroke-width="2"/>`;}
  }
  for(let c=1;c<=b.columns;c++)if(c===1||c%5===0||c===b.columns)out+=text(point([id,'a',c])[0],260+b.yOffset,c,14,'#586b60','middle');
  out+=text(x+18,y+638,b.railBreak?'Rieles cortados a la mitad: puentea 31 con 34 en los cuatro · +T y +B = 5 V · −T y −B = GND':'Rieles continuos · +T y +B = 5 V · −T y −B = GND',14);
  return out+'</g>';
}

function supply(){
  const [px,py]=sourceTerminals['+'],[nx]=sourceTerminals['-'],left=px-60,w=nx-px+120;
  return `<g class="supply-cc"><rect x="${left}" y="${py-75}" width="${w}" height="95" rx="10" fill="#e0e8e2" stroke="#c1cfc4"/>${text(left+w/2,py-50,'FUENTE · 5 V REGULADOS',14,'#345349','middle','font-weight="700"')}<circle cx="${px}" cy="${py}" r="7" fill="#c4414b"/><circle cx="${nx}" cy="${py}" r="7" fill="#35433b"/>${text(px,py-14,'+5 V',12,'#345349','middle')}${text(nx,py-14,'GND',12,'#345349','middle')}</g>`;
}

export const board=()=>Object.entries(boards).map(([id,b])=>boardSVG(id,b)).join('')+supply();
