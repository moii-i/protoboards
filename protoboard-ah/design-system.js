/* Shared page presentation; circuit controllers keep ownership of their state. */
(()=>{'use strict';
const icons={arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',grid:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',view:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M9 5v14"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',play:'<path d="m9 5 10 7-10 7z"/>',expand:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',check:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',chip:'<rect x="7" y="5" width="10" height="14" rx="1"/><path d="M3 8h4M3 12h4M3 16h4m10-8h4m-4 4h4m-4 4h4"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',door:'<path d="M5 21V3h14v18M3 21h18M9 21V6h7v15m-3-8h.01"/>'};
const icon=name=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(icons[name]||icons.grid)+'</svg>';
const getJSON=(key,fallback={})=>{try{return JSON.parse(localStorage.getItem(key)||'null')||fallback;}catch{return fallback;}};
const setJSON=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{}};
const path=location.pathname.replace(/\.html$/,'');
const isCatalog=path==='/circuitos',kind=path==='/puerta'?'puerta':path==='/555'?'555':'letras';
const variants=['ls151','ls151-compacto','sinuln','ls','comunes','redes'];
let doorVariant=new URLSearchParams(location.search).get('montaje');
if(!variants.includes(doorVariant))doorVariant='sinuln';
const lastDoor=getJSON('protoboards:last-door:v1','ls151');
const doorHref='/puerta?montaje='+(variants.includes(lastDoor)?lastDoor:'ls151');
document.body.classList.add('design-enhanced');
document.querySelector('.brand')?.setAttribute('href','/circuitos');
const nav=document.querySelector('.site-header .nav');
if(nav&&!nav.querySelector('.design-catalog-link')){const a=document.createElement('a');a.className='design-catalog-link';a.href='/circuitos';a.textContent='Circuitos';if(isCatalog)a.setAttribute('aria-current','page');nav.prepend(a);}
if(nav){
 const links=[...nav.querySelectorAll('a:not(.design-catalog-link)')];
 if(links.length){const menu=document.createElement('details');menu.className='design-nav-menu';menu.innerHTML='<summary aria-label="Navegación de la página" aria-controls="design-nav-links"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg></summary><div id="design-nav-links"></div>';for(const link of links){const a=link.cloneNode(true);a.onclick=()=>{menu.open=false;};menu.lastElementChild.append(a);}nav.append(menu);
 menu.querySelector('summary').setAttribute('aria-expanded','false');menu.addEventListener('toggle',()=>menu.querySelector('summary').setAttribute('aria-expanded',String(menu.open)));
 document.addEventListener('pointerdown',e=>{if(!menu.contains(e.target))menu.open=false;});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.open){menu.open=false;menu.querySelector('summary').focus();}});
 }
}
if(!isCatalog){
 const main=document.querySelector('main.wrap'),picker=document.querySelector('.circuit-picker');
 const breadcrumb=document.createElement('nav');breadcrumb.className='design-breadcrumb';breadcrumb.setAttribute('aria-label','Ruta de navegación');breadcrumb.innerHTML='<a href="/circuitos">Tus circuitos</a>'+icon('arrow')+'<span aria-current="page"></span>';breadcrumb.lastElementChild.textContent={puerta:'Control de puerta',555:'Temporizador NE555',letras:'Letras A–H'}[kind];main?.prepend(breadcrumb);
 if(picker)picker.innerHTML='<span>Montajes</span>'+[['letras','/','chip','Letras A–H','5 V'],['555','/555','clock','NE555','9 V'],['puerta',doorHref,'door','Puerta automática','5 V']].map(([k,href,i,label,voltage])=>'<a href="'+href+'"'+(k===kind?' aria-current="page"':'')+'>'+icon(i)+label+'<small>'+voltage+'</small></a>').join('');
 const start=document.querySelector('.hero-start');if(start)start.innerHTML='Empezar / continuar '+icon('arrow');
 const footer=document.createElement('footer');footer.className='design-footer';footer.innerHTML='<div><strong>Protoboards</strong> · by moi &amp; chat</div><span><a href="/circuitos">Todos los circuitos</a><a href="#montaje">Volver al montaje ↑</a></span><div>Aprende conectando, a tu ritmo.</div>';main?.append(footer);
 setJSON('protoboards:last-circuit:v1',{kind,variant:doorVariant});
 if(kind==='puerta')setJSON('protoboards:last-door:v1',doorVariant);
}
function setToolOpen(details,open,focus=false){
 if(window.protoboardsWorkbench){window.protoboardsWorkbench.setToolOpen(details,open,focus);return;}
 details.open=open;if(focus)details.querySelector('summary')?.focus();
}
function toolGroup(dock,name,label,title){
 const details=document.createElement('details');details.className='design-tool-group';details.dataset.designTool=name;
 details.innerHTML='<summary aria-controls="design-panel-'+name+'">'+icon(name==='view'?'view':name==='explore'?'search':'play')+label+'</summary><div class="design-tool-panel" id="design-panel-'+name+'"><div class="design-panel-head"><strong>'+title+'</strong><button class="design-panel-close" type="button" aria-label="Cerrar '+label.toLowerCase()+'">×</button></div></div>';dock.append(details);
 details.querySelector('.design-panel-close').onclick=()=>setToolOpen(details,false,true);
 details.querySelector('summary').addEventListener('click',e=>{e.preventDefault();setToolOpen(details,!details.open||details.dataset.benchClosing==='true');});
 details.addEventListener('toggle',()=>{details.querySelector('summary').setAttribute('aria-expanded',String(details.open&&details.dataset.benchClosing!=='true'));if(details.open&&details.dataset.benchClosing!=='true')for(const other of dock.querySelectorAll('details[open]'))if(other!==details&&other.dataset.benchClosing!=='true')setToolOpen(other,false);});details.querySelector('summary').setAttribute('aria-expanded','false');return details.querySelector('.design-tool-panel');
}
function closeTools(focus=false){for(const d of document.querySelectorAll('.design-tool-group[open]'))setToolOpen(d,false,focus);}
document.addEventListener('pointerdown',e=>{if(!e.target.closest('.design-tool-dock'))closeTools();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.querySelector('.design-tool-group[open]')){closeTools(true);e.preventDefault();}});
function initTools(){
 const scene=document.querySelector('.scene-bar'),board=document.querySelector('.board-toolbar');
 if(!scene||!board)return false;if(kind==='puerta'&&!window.doorLesson)return false;if(document.querySelector('.design-tool-dock'))return true;
 const dock=document.createElement('div');dock.className='design-tool-dock';dock.setAttribute('aria-label','Herramientas del visor');
 const label=document.createElement('span');label.className='design-dock-label';label.textContent='Herramientas';dock.append(label);
 const view=toolGroup(dock,'view','Vista','Encuadre y visibilidad');
 const explore=toolGroup(dock,'explore','Explorar','Piezas y conexiones');
 const motion=toolGroup(dock,'motion','Animación','Movimiento y ensamblaje');
 scene.after(dock);
 const actions=document.createElement('div');actions.className='design-main-actions';
 for(const id of ['zoom','expand']){const el=document.getElementById(id);if(el){if(id==='expand'){el.insertAdjacentHTML('afterbegin',icon('expand'));}actions.append(el);}}
 scene.append(actions);
 const expandButton=document.getElementById('expand');if(expandButton)new MutationObserver(()=>{if(!expandButton.querySelector('svg'))expandButton.insertAdjacentHTML('afterbegin',icon('expand'));}).observe(expandButton,{childList:true});
 const motionLabel=document.getElementById('motion')?.closest('label');if(motionLabel)motion.append(motionLabel);
 view.append(board);
 const extra=document.createElement('div');extra.className='design-panel-section';for(const sel of ['.scene-bar .loupe-toggle','.scene-bar .framing-control']){const el=document.querySelector(sel);if(el)extra.append(el);}if(extra.childElementCount)view.append(extra);
 const three=document.getElementById('threeTools');if(three)view.append(three);
 const studio=document.querySelector('.studio-toolbar');
 if(studio){for(const el of [...studio.children])if(el.matches('[data-studio-action],.studio-speed,.studio-auto,#studioPhase'))motion.append(el);studio.querySelector('.studio-divider')?.remove();explore.append(studio);}
 else{
  const help=document.createElement('p');help.className='small';help.textContent=kind==='555'?'Pulsa una pata, un cable o un componente en el visor para consultar su conexión.':'Pulsa un multiplexor, una pata o una conexión en el visor para ver sus detalles.';explore.append(help);
  const connection=document.createElement('button');connection.type='button';connection.textContent='Ver detalle de la conexión';connection.onclick=()=>{closeTools();document.querySelector('.connection-card')?.scrollIntoView({behavior:'auto',block:'center'});};explore.append(connection);
 }
 const status=document.createElement('span');status.className='design-dock-status';status.innerHTML='<i aria-hidden="true"></i> Mismo montaje · 2D / 3D';dock.append(status);
 // Existing controllers retain their original element references and listeners.
 document.querySelector('.routing-help')?.classList.add('design-viewer-hint');
 document.getElementById('expand')?.addEventListener('click',()=>closeTools());
 document.getElementById('lessonSignals')?.addEventListener('click',()=>closeTools());
 document.getElementById('learningOpen')?.addEventListener('click',()=>closeTools());
 window.protoboardsDesign={openTools(name){const d=dock.querySelector('[data-design-tool="'+name+'"]');if(d)setToolOpen(d,true);},closeTools};
 return true;
}
if(!isCatalog){if(!initTools()){let tries=0;const timer=setInterval(()=>{if(initTools()||++tries>120)clearInterval(timer);},100);}
 const list=document.getElementById('stageList');if(list){let done=new Set([...list.querySelectorAll('button.done')].map(b=>b.dataset.step||b.textContent));let toastTimer;
 new MutationObserver(()=>{const next=new Set([...list.querySelectorAll('button.done')].map(b=>b.dataset.step||b.textContent));const added=[...next].filter(k=>!done.has(k));done=next;if(!added.length)return;document.querySelector('.design-complete')?.remove();const t=document.createElement('div');t.className='design-complete';t.setAttribute('role','status');t.innerHTML=icon('check')+'<div><strong>Un bloque más, conectado.</strong><small>Tu avance quedó guardado en este navegador.</small></div><button type="button" aria-label="Cerrar aviso">×</button>';t.querySelector('button').onclick=()=>t.remove();document.body.append(t);clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.remove(),4000);}).observe(list,{subtree:true,attributes:true,childList:true,attributeFilter:['class']});
 }
}
function updateCatalog(){
 for(const card of document.querySelectorAll('[data-circuit-card]')){
  const k=card.dataset.circuitCard;const variant=variants.includes(lastDoor)?lastDoor:'ls151';
  const storage=k==='letras'?'practica21:estudio:v3':k==='555'?'protoboard:ne555:v1':'protoboard:puerta:'+variant+(variant.startsWith('ls151')?':placement:v3':':routing:v2');
  const state=getJSON(storage),count=k==='letras'?14:k==='555'?7:variant.startsWith('ls151')?10:10;
  const completed=new Set((Array.isArray(state.completed)?state.completed:[]).filter(n=>Number.isInteger(n)&&n>=0&&n<count));const started=completed.size>0||(state.marked?.length>0)||state.step>0;
  card.querySelector('[data-catalog-progress]').textContent=started?completed.size+' de '+count+' bloques completados':'Tu próxima conexión empieza aquí';
  card.querySelector('[data-catalog-percent]').textContent=Math.round(completed.size/count*100)+'%';
  card.querySelector('.circuit-card-progress-track i').style.width=Math.round(completed.size/count*100)+'%';
  const href=(k==='puerta'?doorHref:k==='555'?'/555':'/')+'#montaje';
  for(const a of card.querySelectorAll('[data-circuit-link]'))a.href=href;
  card.querySelector('[data-catalog-action]').innerHTML=(started?'Continuar montaje':'Empezar montaje')+icon('arrow');
 }
 const recent=getJSON('protoboards:last-circuit:v1',null);if(recent&&['letras','555','puerta'].includes(recent.kind)){
  const card=document.querySelector('[data-circuit-card="'+recent.kind+'"]'),cta=document.getElementById('catalogContinue');if(card&&cta){cta.href=card.querySelector('[data-circuit-link]').href;cta.innerHTML='Volver a mi montaje '+icon('arrow');}
 }
}
if(isCatalog){updateCatalog();addEventListener('storage',updateCatalog);addEventListener('pageshow',updateCatalog);}
})();