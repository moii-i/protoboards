(function studioController(){
'use strict';
if(!window.doorGuide||window.doorStudio)return;
const $s=id=>document.getElementById(id),svgNS='http://www.w3.org/2000/svg',map=$s('map'),mapbox=map.closest('.mapbox'),stage=map.closest('.map-stage');
let prefs={auto:true,strips:false,speed:1,compact:true};try{Object.assign(prefs,JSON.parse(localStorage.getItem('protoboard:studio:v1')||'{}'));}catch{}
prefs.speed=[.5,1,2].includes(Number(prefs.speed))?Number(prefs.speed):1;
const state={chip:null,pin:null,related:[],strip:null,animation:null},original={selectCable,selectStep,visibility,showRenderer,animateSelection,synchronizeMotion};
let raf=0,lastTime=0,keepInspector=false,overlay=null,overlayPath=null,overlayBoots=[],pathLength=1,overlayPaths=[],measurePath=null,routeSamples=[],routeCommands=[],animationElement=null,phaseStamp='';
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
const toolbar=document.createElement('div');toolbar.className='studio-toolbar';toolbar.setAttribute('aria-label','Herramientas de ensamblaje');
toolbar.innerHTML=`<label class="studio-pick">Explorar <select id="studioChip" aria-label="Explorar integrado"><option value="">Elige un integrado</option>${model.chips.map(c=>`<option value="${safe(c.id)}">${safe(c.id+' · '+c.label)}</option>`).join('')}</select></label><button type="button" id="studioStrips" aria-pressed="${Boolean(prefs.strips)}">Tiras internas</button><span class="studio-divider"></span><button type="button" data-studio-action="play">Conectar jumper</button><button type="button" data-studio-action="pause" disabled>Pausar</button><label class="studio-speed">Velocidad <select data-studio-speed aria-label="Velocidad de ensamblaje"><option value="0.5">Lenta</option><option value="1">Normal</option><option value="2">Rápida</option></select></label><label class="studio-auto"><input id="studioAuto" type="checkbox" ${prefs.auto?'checked':''}> Al seleccionar</label><span id="studioPhase" role="status">Selecciona un cable o un integrado</span>`;
document.querySelector('.board-toolbar').after(toolbar);
const panel=document.createElement('aside');panel.className='studio-inspector';panel.id='studioInspector';panel.hidden=true;panel.setAttribute('aria-label','Inspector de integrado');mapbox.appendChild(panel);
const stripInfo=document.createElement('div');stripInfo.className='studio-strip-info';stripInfo.id='studioStripInfo';stripInfo.hidden=true;stage.appendChild(stripInfo);
const stripLayer=document.createElementNS(svgNS,'g');stripLayer.id='studio-strips';stripLayer.setAttribute('pointer-events','none');$s('scene').appendChild(stripLayer);
const quick=document.createElement('div');quick.className='studio-quick';quick.innerHTML='<button type="button" data-studio-action="play">Repetir conexión</button><button type="button" data-studio-action="pause" disabled>Pausar</button>';quick.insertAdjacentHTML('beforeend','<label class="studio-motion"><input type="checkbox" data-studio-motion> Animaciones</label><select data-studio-speed aria-label="Velocidad de ensamblaje"><option value="0.5">0.5×</option><option value="1">1×</option><option value="2">2×</option></select>');document.querySelector('.island-navigation').appendChild(quick);
const quickStatus=document.createElement('span');quickStatus.className='studio-quick-status';quickStatus.hidden=true;document.querySelector('.island-context').appendChild(quickStatus);
const more=document.createElement('button');more.type='button';more.id='studioMore';more.textContent=prefs.compact?'Más controles':'Compactar';more.setAttribute('aria-expanded',String(!prefs.compact));document.querySelector('.island-top').insertBefore(more,document.querySelector('.island-renderers'));
function savePrefs(){try{localStorage.setItem('protoboard:studio:v1',JSON.stringify(prefs));}catch{}}
function pinHole(c,p){return [c.board,p>c.pins/2?'e':'f',c.start+(p>c.pins/2?c.pins-p:p-1)];}
function stripKey(h){if(!h||h[0]==='FUENTE')return '';return h[0]+':'+(h[1].length>1?h[1]+':'+(h[2]<=31?'L':'R'):('abcde'.includes(h[1])?'top':'bottom')+':'+h[2]);}
function pinItems(c,p){const ref=c.id+'.'+p,key=stripKey(pinHole(c,p));return model.items.filter(it=>['wire','link'].includes(it.kind)&&([it.fromRef,it.toRef].includes(ref)||stripKey(it.a)===key||stripKey(it.b)===key));}
function chipBox(c){const [x,y]=point([c.board,'a',c.start]);return [x-95,y-110,(c.pins/2-1)*30+220,520];}
function closeInspector(){state.chip=null;state.pin=null;state.related=[];panel.hidden=true;mapbox.classList.remove('studio-inspecting');$s('studioChip').value='';document.querySelectorAll('.chip-package,.pin').forEach(el=>el.classList.remove('studio-chip-active','studio-pin-active'));original.visibility();applyInspection();sync3d();}
function inspect(id,p=null){
window.doorLearning?.cancel();
const c=model.chips.find(c=>c.id===String(id)||c.id==='U'+id);if(!c)return;
cancelAssembly();selected=null;showDetail();state.chip=c.id;state.pin=p===null?null:Number(p);state.related=[...new Set((state.pin?pinItems(c,state.pin):Array.from({length:c.pins},(_,i)=>pinItems(c,i+1)).flat()).map(it=>it.id))];
panel.hidden=false;mapbox.classList.add('studio-inspecting');$s('studioChip').value=c.id;
panel.innerHTML=`<div class="studio-inspector-head"><div><small>INSPECTOR · ${safe(c.board)}</small><h3>${safe(c.id+' · '+c.label)}</h3></div><button type="button" data-studio-close aria-label="Cerrar inspector">×</button></div><p class="studio-inspector-note">Muesca a la izquierda · pata 1 abajo. Las conexiones se pueden explorar antes de montarlas.</p><div class="studio-pins">${Array.from({length:c.pins},(_,i)=>{const n=i+1,items=pinItems(c,n);return `<button type="button" data-studio-pin="${n}" aria-pressed="${state.pin===n}"><b>${n}</b><span>${safe(model.pinNames?.[c.id]?.[n]||'Consultar conexión')}</span><small>${items.length}</small></button>`;}).join('')}</div><div class="studio-inspector-detail"><h4>${state.pin?'Pata '+state.pin+' · '+safe(hole(pinHole(c,state.pin))):'Conexiones del integrado'}</h4><p>${state.pin?safe(model.pinNames?.[c.id]?.[state.pin]||'Sin función registrada'):'Selecciona una pata para ver su tira y conexiones.'}</p><div class="studio-pin-wires">${state.related.length?state.related.map(id=>{const it=model.items.find(x=>x.id===id);return `<button type="button" data-studio-wire="${id}"><b>${id}</b><span>${safe(it.label)}</span><small>${it.kind==='link'?'Misma tira · sin jumper':'Ir a la conexión →'}</small></button>`;}).join(''):'<p>Esta pata no lleva una conexión externa en este montaje.</p>'}</div></div>`;
panel.querySelector('[data-studio-close]').onclick=closeInspector;
panel.querySelectorAll('[data-studio-pin]').forEach(b=>b.onclick=()=>inspect(c.id,Number(b.dataset.studioPin)));
panel.querySelectorAll('[data-studio-wire]').forEach(b=>b.onclick=()=>{keepInspector=true;selectCable(b.dataset.studioWire,{scroll:false});keepInspector=false;applyInspection();});
if(state.pin){state.strip=pinHole(c,state.pin);paintStrips();}
original.visibility();applyInspection();view='focus';requestAnimationFrame(()=>{setCamera(chipBox(c));sync3d();});syncToolbar();
}
function applyInspection(){
document.querySelectorAll('.chip-package').forEach(el=>el.classList.toggle('studio-chip-active',el.dataset.chip===state.chip));
document.querySelectorAll('.pin').forEach(el=>el.classList.toggle('studio-pin-active',el.dataset.u===state.chip&&Number(el.dataset.pin)===state.pin));
map.classList.toggle('studio-inspect-active',Boolean(state.chip));
document.querySelectorAll('.connection').forEach(el=>{const relevant=state.related.includes(el.dataset.id);el.classList.toggle('studio-related',Boolean(state.chip)&&relevant);el.classList.toggle('studio-unrelated',Boolean(state.chip)&&!relevant);if(state.chip&&relevant){el.classList.remove('hidden','future');}});
paintStrips();
}
function stripHoles(h){if(!h||h[0]==='FUENTE')return [];if(h[1].length>1){const board=model.boards[h[0]],first=board.railBreak?(h[2]<=board.railBreak?1:board.railBreak+2):1,last=board.railBreak&&h[2]<=board.railBreak?board.railBreak:board.columns;return Array.from({length:last-first+1},(_,i)=>[h[0],h[1],first+i]);}return [...('abcde'.includes(h[1])?'abcde':'fghij')].map(r=>[h[0],r,h[2]]);}
function paintStrips(){
const hs=stripHoles(state.strip);stripLayer.innerHTML='';stripInfo.hidden=!hs.length;if(!hs.length)return;
const ps=hs.map(point),[a,b]=[ps[0],ps.at(-1)];
stripLayer.innerHTML=`<path d="M${a.join(' ')} L${b.join(' ')}" stroke="#d4a33f" stroke-opacity=".38" stroke-width="19" stroke-linecap="round"/>`+ps.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="8" fill="none" stroke="#a26e16" stroke-width="2" vector-effect="non-scaling-stroke"/>`).join('');
stripInfo.textContent=hs.length===5?`${hs[0][0]} · columna ${hs[0][2]} · ${hs[0][1]}–${hs.at(-1)[1]} comparten contacto. La ranura central separa las dos mitades.`:`${hs[0][0]} · riel ${hs[0][1]} · contactos ${hs[0][2]}–${hs.at(-1)[2]}. La separación central requiere un puente.`;
}
function showStrip(h){if(!prefs.strips)return;state.strip=h?.slice();paintStrips();sync3d();syncToolbar();}
function holeAt(event){
const m=map.getScreenCTM?.();if(!m||!map.createSVGPoint)return null;const p=map.createSVGPoint();p.x=event.clientX;p.y=event.clientY;const q=p.matrixTransform(m.inverse());
for(const [id,b] of Object.entries(model.boards)){const col=Math.round((q.x-95-b.xOffset)/30)+1;if(col<1||col>b.columns)continue;const row=Object.keys(rowsY).sort((a,b2)=>Math.abs(q.y-rowsY[a]-(b.yOffset||0))-Math.abs(q.y-rowsY[b2]-(b.yOffset||0)))[0];if(row.length>1&&col===32)continue;const pos=point([id,row,col]);if(Math.hypot(q.x-pos[0],q.y-pos[1])<=14)return [id,row,col];}return null;
}
map.addEventListener('click',e=>{if(pan2D.suppress)return;const pin=e.target.closest('.pin'),chip=e.target.closest('[data-chip]');if(chip){e.preventDefault();e.stopImmediatePropagation();inspect(chip.dataset.chip,pin?Number(pin.dataset.pin):null);return;}if(prefs.strips){const h=holeAt(e);if(h){e.preventDefault();e.stopImmediatePropagation();showStrip(h);}}},true);
map.addEventListener('keydown',e=>{const chip=e.target.closest('[data-chip]');if(chip&&['Enter',' '].includes(e.key)){e.preventDefault();e.stopImmediatePropagation();const pin=e.target.closest('.pin');inspect(chip.dataset.chip,pin?Number(pin.dataset.pin):null);}},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&state.chip&&!document.getElementById('learningDialog')?.open){e.preventDefault();e.stopImmediatePropagation();closeInspector();}},true);
$s('studioChip').onchange=e=>e.target.value?inspect(e.target.value):closeInspector();
$s('studioStrips').onclick=()=>{prefs.strips=!prefs.strips;$s('studioStrips').setAttribute('aria-pressed',String(prefs.strips));if(!prefs.strips){state.strip=null;paintStrips();}savePrefs();sync3d();syncToolbar();};
$s('studioAuto').onchange=e=>{prefs.auto=e.target.checked;savePrefs();};
more.onclick=()=>{prefs.compact=!prefs.compact;savePrefs();setCompact();};
function setCompact(){$s('assemblyIsland').classList.toggle('studio-compact',Boolean(prefs.compact));more.textContent=prefs.compact?'Más controles':'Compactar';more.setAttribute('aria-expanded',String(!prefs.compact));requestAnimationFrame(updateIslandInset);}
function ensureOverlay(it){
if(overlay)return;overlay=document.createElementNS(svgNS,'g');overlay.setAttribute('class','studio-assembly-overlay');overlay.setAttribute('pointer-events','none');$s('scene').appendChild(overlay);
measurePath=document.createElementNS(svgNS,'path');measurePath.setAttribute('d',roundedRoute(wireRoute(it)));pathLength=measurePath.getTotalLength();
const count=Math.max(8,Math.min(2048,Math.ceil(pathLength/4)));routeSamples=Array.from({length:count+1},(_,i)=>measurePath.getPointAtLength(pathLength*i/count));routeCommands=routeSamples.slice(1).map(p=>' L'+p.x.toFixed(3)+' '+p.y.toFixed(3));
overlayPaths=[['#173e33',7],[it.color||'#147c75',3]].map(([color,width])=>{const p=document.createElementNS(svgNS,'path');p.setAttribute('fill','none');p.setAttribute('stroke',color);p.setAttribute('stroke-width',width);p.setAttribute('vector-effect','non-scaling-stroke');p.setAttribute('stroke-linecap','round');p.setAttribute('stroke-linejoin','round');overlay.appendChild(p);return p;});overlayPath=overlayPaths.at(-1);
overlayBoots=[it.a,it.b].map(h=>{const [x,y]=point(h),g=document.createElementNS(svgNS,'g');g.innerHTML='<rect x="-5" y="-5" width="10" height="10" rx="2" fill="#293e45"/><rect x="-3" y="-3" width="6" height="6" rx="1" fill="'+(it.color||'#147c75')+'"/>';overlay.appendChild(g);return {g,x,y};});
}
function drawAnimation(){
const a=state.animation;if(!a)return;const it=model.items.find(x=>x.id===a.id);if(!it)return;const t=a.progress,reveal=smooth((t-.22)/.56),first=smooth(t/.22),second=smooth((t-.78)/.22);
if(rendererMode==='2d'){
ensureOverlay(it);
const count=routeSamples.length-1,whole=Math.floor(reveal*count),tip=measurePath.getPointAtLength(pathLength*reveal),origin=routeSamples[0],d='M'+origin.x+' '+origin.y+routeCommands.slice(0,whole).join('')+(whole<count?' L'+tip.x+' '+tip.y:'');
for(const p of overlayPaths){p.setAttribute('d',d);p.style.opacity=reveal>0?'1':'0';}
overlay.dataset.reveal=String(reveal);overlay.dataset.tip=tip.x+','+tip.y;
overlayBoots.forEach(({g,x,y},i)=>{const v=i?second:first;g.setAttribute('transform','translate('+x+' '+y+') scale('+(1+.65*(1-v))+')');g.style.opacity=String(v);});
}
animationElement?.classList.toggle('studio-assembling',t<1);
if(rendererMode==='3d')board3d?.setAssembly?.({id:a.id,progress:t});
const phase=t<.22?0:t<.78?1:t<1?2:3,stamp=phase+':'+a.playing;
if(stamp!==phaseStamp){
phaseStamp=stamp;$s('studioPhase').textContent=(a.playing?'':'Pausa · ')+['1/3 · Inserta el primer extremo','2/3 · Tiende el jumper','3/3 · Inserta el segundo extremo','Conexión mostrada · compruébala antes de marcar'][phase];
quickStatus.hidden=false;quickStatus.textContent=$s('studioPhase').textContent;
document.querySelectorAll('[data-studio-action="pause"]').forEach(b=>{b.disabled=t>=1;b.textContent=a.playing?'Pausar':'Continuar';b.setAttribute('aria-pressed',String(!a.playing&&t<1));});
}
}
function tick(now){raf=0;const a=state.animation;if(!a||!a.playing)return;const dt=lastTime?Math.min(100,now-lastTime):0;lastTime=now;a.progress=Math.min(1,a.progress+dt*prefs.speed/3000);if(a.progress>=1)a.playing=false;drawAnimation();if(a.playing)raf=requestAnimationFrame(tick);}
function cancelAssembly(){if(raf)cancelAnimationFrame(raf);raf=0;lastTime=0;state.animation=null;overlay?.remove();overlay=null;overlayPath=null;overlayBoots=[];overlayPaths=[];measurePath=null;routeSamples=[];routeCommands=[];phaseStamp='';animationElement?.classList.remove('studio-assembling');animationElement=null;board3d?.setAssembly?.(null);}
function playAssembly(){
const it=model.items.find(x=>x.id===selected);if(!it||it.kind!=='wire'||!canAnimate())return;cancelAssembly();stopFeedback();board3d?.stopReplay?.();state.animation={id:it.id,progress:0,playing:true};animationElement=map.querySelector('.connection[data-id="'+it.id+'"]');drawAnimation();lastTime=0;raf=requestAnimationFrame(tick);syncToolbar();
}
function pauseAssembly(){const a=state.animation;if(!a)return;a.playing=!a.playing;if(raf)cancelAnimationFrame(raf);raf=0;lastTime=0;if(a.playing&&a.progress<1)raf=requestAnimationFrame(tick);drawAnimation();}
function syncToolbar(){
document.querySelectorAll('[data-studio-motion]').forEach(el=>{el.checked=canAnimate();el.disabled=motionQuery.matches;el.title=motionQuery.matches?'Tu dispositivo tiene activado el movimiento reducido':'Activar animaciones de ensamblaje';});
const it=model.items.find(x=>x.id===selected);document.querySelectorAll('[data-studio-action="play"]').forEach(b=>{b.disabled=it?.kind!=='wire'||!canAnimate();b.title=!canAnimate()?'Activa Animaciones para mostrar la conexión':it?.kind==='link'?'Estos terminales ya comparten la misma tira':'Mostrar la conexión del jumper';});
if(state.chip&&!selected){$s('islandProgress').textContent='Explorando '+state.chip+(state.pin?' · pata '+state.pin:'');$s('islandEndpoints').textContent=state.pin?hole(pinHole(model.chips.find(c=>c.id===state.chip),state.pin)):'Elige una pata para ver sus conexiones.';}
if(!state.animation){quickStatus.hidden=true;document.querySelectorAll('[data-studio-action="pause"]').forEach(b=>{b.disabled=true;b.textContent='Pausar';});$s('studioPhase').textContent=it?.kind==='link'?'Misma tira · no hace falta otro jumper':prefs.strips?'Pulsa un agujero para ver su tira':state.chip?'Selecciona una pata o una conexión':!canAnimate()?'Animaciones desactivadas · exploración disponible':'Selecciona un cable o un integrado';}
}
document.querySelectorAll('[data-studio-action]').forEach(b=>b.onclick=()=>b.dataset.studioAction==='play'?playAssembly():pauseAssembly());
document.querySelectorAll('[data-studio-motion]').forEach(el=>el.onchange=()=>{motionEnabled=el.checked;synchronizeMotion();save();});
document.querySelectorAll('[data-studio-speed]').forEach(el=>{el.value=String(prefs.speed);el.onchange=()=>{prefs.speed=Number(el.value);document.querySelectorAll('[data-studio-speed]').forEach(x=>x.value=el.value);savePrefs();};});
selectCable=function(...args){cancelAssembly();if(state.chip&&!keepInspector)closeInspector();original.selectCable(...args);applyInspection();syncToolbar();};
selectStep=function(...args){cancelAssembly();if(state.chip&&!keepInspector)closeInspector();original.selectStep(...args);syncToolbar();};
visibility=function(...args){original.visibility(...args);applyInspection();if(state.animation)drawAnimation();};
showRenderer=function(...args){original.showRenderer(...args);if(state.animation)drawAnimation();sync3d();};
animateSelection=function(){const it=model.items.find(x=>x.id===selected);if(prefs.auto&&it?.kind==='wire'&&canAnimate())playAssembly();else original.animateSelection();};
synchronizeMotion=function(...args){original.synchronizeMotion(...args);if(!canAnimate())cancelAssembly();syncToolbar();};
document.addEventListener('visibilitychange',()=>{if(document.hidden&&state.animation?.playing)pauseAssembly();});
motionQuery.addEventListener('change',()=>{if(!canAnimate())cancelAssembly();syncToolbar();});
window.doorStudio={inspect,closeInspector,showStrip,play:playAssembly,pause:pauseAssembly,cancel:cancelAssembly,sync:()=>{applyInspection();syncToolbar();},snapshot:()=>({chip:state.chip,pin:state.pin,related:state.related,strip:state.strip,stripHoles:stripHoles(state.strip),assembly:state.animation?{id:state.animation.id,progress:state.animation.progress}:null}),getState:()=>({chip:state.chip,pin:state.pin,related:[...state.related],strip:state.strip,stripHoles:stripHoles(state.strip),animation:state.animation?{...state.animation}:null,prefs:{...prefs}})};
setCompact();syncToolbar();sync3d();
})();
