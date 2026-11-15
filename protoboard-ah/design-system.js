/* Shared page presentation; circuit controllers keep ownership of their state. */
(()=>{'use strict';
const icons={arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',grid:'<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',view:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M9 5v14"/>',search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',play:'<path d="m9 5 10 7-10 7z"/>',expand:'<path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/>',check:'<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',chip:'<rect x="7" y="5" width="10" height="14" rx="1"/><path d="M3 8h4M3 12h4M3 16h4m10-8h4m-4 4h4m-4 4h4"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',door:'<path d="M5 21V3h14v18M3 21h18M9 21V6h7v15m-3-8h.01"/>'};
const icon=name=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(icons[name]||icons.grid)+'</svg>';
const getJSON=(key,fallback={})=>{try{return JSON.parse(localStorage.getItem(key)||'null')||fallback;}catch{return fallback;}};
const setJSON=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{}};
const path=location.pathname.replace(/\.html$/,'');
const isCatalog=path==='/circuitos',kind=(path==='/puerta'||path==='/puerta-catodo')?'puerta':path==='/555'?'555':path==='/contador'?'contador':path==='/contador-descendente'?'descendente':'letras';
document.documentElement.dataset.circuit=isCatalog?'catalogo':kind;
const defaultDoor='dip-cc-compacto';
const doorProfiles=new Map([
 [defaultDoor,{url:'/puerta-catodo',suffix:'routing:v2:proteus-11r-v1'}],
 ['dip-cc-compacto-filtro',{url:'/puerta-catodo?desacoplo=si',suffix:'routing:v2:proteus-11r-v1'}],
 ['dip-cc',{url:'/puerta-catodo?montaje=anterior',suffix:'routing:v2'}],
 ['ls151-9r',{url:'/puerta?montaje=ls151-9r',suffix:'placement:v3'}],
 ['ls151-6k8',{url:'/puerta?montaje=ls151-6k8',suffix:'placement:v3'}]
]);
const doorProfile=variant=>doorProfiles.get(variant)||doorProfiles.get(defaultDoor);
const doorStorage=variant=>'protoboard:puerta:'+variant+':'+doorProfile(variant).suffix;
const query=new URLSearchParams(location.search);
let doorVariant=query.get('montaje');
if(path==='/puerta-catodo'){
 doorVariant=doorVariant==='anterior'?'dip-cc':query.get('desacoplo')==='si'?'dip-cc-compacto-filtro':defaultDoor;
}else if(!doorProfiles.has(doorVariant)){doorVariant='ls151-9r';}
const doorHref=doorProfile(getJSON('protoboards:last-door:v2',defaultDoor)).url;
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
 const breadcrumb=document.createElement('nav');breadcrumb.className='design-breadcrumb';breadcrumb.setAttribute('aria-label','Ruta de navegación');breadcrumb.innerHTML='<a href="/circuitos">Tus circuitos</a>'+icon('arrow')+'<span aria-current="page"></span>';breadcrumb.lastElementChild.textContent={puerta:'Control de puerta',555:'Temporizador NE555',letras:'Letras A–H',contador:'Contador 0–9',descendente:'Contador 9–0'}[kind];main?.prepend(breadcrumb);
 if(picker)picker.innerHTML='<span>Montajes</span>'+[['descendente','/contador-descendente','chip','Contador 9-0','5 V'],['contador','/contador','chip','Contador 0-9','5 V'],['letras','/','chip','Letras A–H','5 V'],['555','/555','clock','NE555','9 V'],['puerta',doorHref,'door','Puerta automática','5 V']].map(([k,href,i,label,voltage])=>'<a data-circuit="'+k+'" href="'+href+'"'+(k===kind?' aria-current="page"':'')+'>'+icon(i)+label+'<small>'+voltage+'</small></a>').join('');
 const start=document.querySelector('.hero-start');if(start)start.innerHTML='Empezar / continuar '+icon('arrow');
 const footer=document.createElement('footer');footer.className='design-footer';footer.innerHTML='<div><strong>Protoboards</strong> · by moi &amp; chat</div><span><a href="/circuitos">Todos los circuitos</a><a href="#montaje">Volver al montaje ↑</a></span><div>Aprende conectando, a tu ritmo.</div>';main?.append(footer);
 setJSON('protoboards:last-circuit:v1',{kind,variant:doorVariant});
 if(kind==='puerta')setJSON('protoboards:last-door:v2',doorVariant);
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
 if(!scene||!board)return false;if((kind==='puerta'||kind==='contador'||kind==='descendente')&&!window.doorLesson)return false;if(document.querySelector('.design-tool-dock'))return true;
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
  const help=document.createElement('p');help.className='small';help.textContent=kind==='555'||kind==='contador'||kind==='descendente'?'Pulsa una pata, un cable o un componente en el visor para consultar su conexión.':'Pulsa un multiplexor, una pata o una conexión en el visor para ver sus detalles.';explore.append(help);
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
/* Taller: visor primero. Mueve controles existentes a una sola barra; conserva IDs y manejadores. */
function buildTaller(){
 if(document.querySelector('.taller-bar'))return;
 const workspace=document.querySelector('.workspace'),dock=document.querySelector('.design-tool-dock');if(!workspace||!dock)return;
 document.body.classList.add('taller');
 const bar=document.createElement('div');bar.className='taller-bar';bar.setAttribute('role','toolbar');bar.setAttribute('aria-label','Mesa de trabajo');
 const modes=document.querySelector('.learning-mode .mode-options');if(modes){modes.classList.add('taller-modes');bar.append(modes);}
 const tour=document.getElementById('startTour');if(tour)bar.append(tour);
 bar.append(dock);
 const actions=document.querySelector('.design-main-actions');if(actions)bar.append(actions);


 for(const text of document.querySelectorAll('#stageText,.assembly-stage-head p')){text.title='Pulsa para ver todo el texto';text.addEventListener('click',()=>text.classList.toggle('taller-expanded'));}
 workspace.prepend(bar);
 // Algunas piezas (mesa de cable, barra de anchos) se crean después: se ubican al aparecer.
 const settle=()=>{
  const bench=document.querySelector('.bench-controls');if(bench&&bench.parentElement!==bar)bar.append(bench);
  const widths=document.querySelector('.bench-widths'),view=document.getElementById('design-panel-view');if(widths&&view&&widths.parentElement!==view)view.append(widths);
  const context=document.querySelector('.map-context'),head=document.querySelector('.assembly-stage-head .cc-bench-current')||(!document.querySelector('.cable-workbench')&&document.querySelector('.stage-header'));
  if(context&&head&&context.parentElement!==head){context.classList.add('taller-context');head.append(context);}
 };
 settle();let settleTries=0;const settleTimer=setInterval(()=>{settle();if(++settleTries>30)clearInterval(settleTimer);},250);
 const sceneSwitch=document.querySelector('.scene-bar .scene-switch'),stageNav=document.querySelector('.stage-header .stage-nav');if(sceneSwitch&&stageNav){sceneSwitch.classList.add('taller-scene-switch');stageNav.prepend(sceneSwitch);}
 const choice=document.querySelector('.assembly-choice'),layout=document.getElementById('montaje');
 if(choice&&layout&&!choice.contains(layout)){choice.classList.add('taller-config');layout.after(choice);}
 tallerMotion();
 requestAnimationFrame(()=>{
  const pending=document.documentElement.classList.contains('taller-pending');
  document.documentElement.classList.remove('taller-pending');
  // Con la mesa ya armada, vuelve al ancla pedida (p. ej. #montaje) sin saltos posteriores.
  const id=decodeURIComponent(location.hash.slice(1)),target=id&&document.getElementById(id);
  if(pending&&target)target.scrollIntoView({block:'start',behavior:'instant'});
 });
}
// Letras no cerraba la vista ampliada con Escape; las demás guías ya lo hacen.
if(kind==='letras')document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('fullscreen')&&!document.querySelector('.design-tool-group[open],dialog[open]')){document.getElementById('expand')?.click();}});
function tallerMotion(){
 const root=document.documentElement,full=()=>root.dataset.workspaceMotion==='full';
 const stage=()=>document.querySelector('.map-stage');
 let last=null;
 const title=document.getElementById('stageTitle');
 const draw=()=>{
  const active=document.querySelector('.stage-list button.active');if(!active)return;
  const index=[...active.parentElement.querySelectorAll('button')].indexOf(active);
  if(index===last)return;const first=last===null;last=index;if(first||!full())return;
  const s=stage();if(s){s.classList.remove('taller-step-change');void s.offsetWidth;s.classList.add('taller-step-change');setTimeout(()=>s.classList.remove('taller-step-change'),400);}
  const map=document.getElementById('map');if(!map||map.closest('[hidden]'))return;
  const paths=[...map.querySelectorAll('#wires .connection[data-stage="'+index+'"] .colored-wire,#wires .connection[data-stage="'+index+'"] path.wire')].slice(0,40);
  paths.forEach((p,i)=>{p.setAttribute('pathLength','1');p.style.setProperty('--taller-delay',Math.min(i*35,700)+'ms');p.classList.remove('taller-draw');void p.getBBox;p.classList.add('taller-draw');
   const clean=()=>{p.classList.remove('taller-draw');p.removeAttribute('pathLength');p.style.removeProperty('--taller-delay');};p.addEventListener('animationend',clean,{once:true});setTimeout(clean,1600);});
 };
 const list=document.getElementById('stageList');
 if(list)new MutationObserver(()=>requestAnimationFrame(draw)).observe(list,{subtree:true,attributes:true,attributeFilter:['class']});
 if(title)new MutationObserver(()=>requestAnimationFrame(draw)).observe(title,{childList:true,characterData:true,subtree:true});
 draw();
 document.addEventListener('change',e=>{
  if(!e.target.matches('#connectionDone,#ledger input[type=checkbox],#completed'))return;
  const card=document.querySelector('.connection-card');if(!card||!full())return;
  card.classList.remove('taller-pulse');void card.offsetWidth;card.classList.add('taller-pulse');setTimeout(()=>card.classList.remove('taller-pulse'),600);
 });
}
if(!isCatalog){const tallerReady=()=>{if(!initTools())return false;buildTaller();return true;};if(!tallerReady()){let tries=0;const timer=setInterval(()=>{if(tallerReady()||++tries>120)clearInterval(timer);},100);}
 const list=document.getElementById('stageList');if(list){let done=new Set([...list.querySelectorAll('button.done')].map(b=>b.dataset.step||b.textContent));let toastTimer;
 new MutationObserver(()=>{const next=new Set([...list.querySelectorAll('button.done')].map(b=>b.dataset.step||b.textContent));const added=[...next].filter(k=>!done.has(k));done=next;if(!added.length)return;document.querySelector('.design-complete')?.remove();const t=document.createElement('div');t.className='design-complete';t.setAttribute('role','status');t.innerHTML=icon('check')+'<div><strong>Un bloque más, conectado.</strong><small>Tu avance quedó guardado en este navegador.</small></div><button type="button" aria-label="Cerrar aviso">×</button>';t.querySelector('button').onclick=()=>t.remove();document.body.append(t);clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.remove(),4000);tallerCelebrate(next.size,list.querySelectorAll('button').length);}).observe(list,{subtree:true,attributes:true,childList:true,attributeFilter:['class']});
 }
}
function updateCatalog(){
 for(const card of document.querySelectorAll('[data-circuit-card]')){
  const k=card.dataset.circuitCard;
  const counter=k==='contador'||k==='descendente';
  const counterStorage=k==='descendente'?'protoboard:contador-descendente:v1'+(getJSON('protoboard:contador-descendente:v1:perfil')==='10'?':10uf':''):'protoboard:contador:v2'+(getJSON('protoboard:contador:v1:perfil')==='10'?':10uf':'');
  const storage=counter?counterStorage:k==='letras'?'practica21:estudio:v3':k==='555'?'protoboard:ne555:v1':doorStorage(defaultDoor);
  const state=getJSON(storage),count=k==='descendente'?7:k==='contador'?6:k==='letras'?14:k==='555'?7:10;
  const completed=new Set((Array.isArray(state.completed)?state.completed:[]).filter(n=>Number.isInteger(n)&&n>=0&&n<count));const started=completed.size>0||(state.marked?.length>0)||state.step>0;
  card.querySelector('[data-catalog-progress]').textContent=started?completed.size+' de '+count+' bloques completados':'Tu próxima conexión empieza aquí';
  const progress=counter?(state.total?Math.min(100,Math.round(((state.marked?.length||0)+(state.assemblyConfirmed?.length||0))/state.total*100)):0):Math.round(completed.size/count*100);
  card.querySelector('[data-catalog-percent]').textContent=progress+'%';
  card.querySelector('.circuit-card-progress-track i').style.width=progress+'%';
  const href=(k==='descendente'?'/contador-descendente':counter?'/contador':k==='puerta'?doorProfile(defaultDoor).url:k==='555'?'/555':'/')+'#montaje';
  for(const a of card.querySelectorAll('[data-circuit-link]'))a.href=href;
  card.querySelector('[data-catalog-action]').innerHTML=(started?'Continuar montaje':'Empezar montaje')+icon('arrow');
 }
 const recent=getJSON('protoboards:last-circuit:v1',null);if(recent&&['letras','555','puerta','contador','descendente'].includes(recent.kind)){
  const card=document.querySelector('[data-circuit-card="'+recent.kind+'"]'),cta=document.getElementById('catalogContinue');if(card&&cta){cta.href=recent.kind==='puerta'?doorProfile(getJSON('protoboards:last-door:v2',defaultDoor)).url+'#montaje':card.querySelector('[data-circuit-link]').href;cta.innerHTML='Volver a mi montaje '+icon('arrow');}
 }
}
if(isCatalog){updateCatalog();addEventListener('storage',updateCatalog);addEventListener('pageshow',updateCatalog);}
/* Taller 6: pistas animadas en la portada, barra de pasos flotante y celebraciones. */
const tallerFull=()=>document.documentElement.dataset.workspaceMotion==='full';
function tallerSpark(x,y,amount=18,spread=110){
 if(!tallerFull())return;
 const colors=['var(--circuit)','var(--appearance-accent)','var(--appearance-gold)','#ff8a66'];
 for(let i=0;i<amount;i++){
  const s=document.createElement('i');s.className='taller-spark';s.setAttribute('aria-hidden','true');
  const a=Math.random()*Math.PI*2,r=spread*(.35+Math.random()*.75);
  s.style.cssText='--x:'+x+'px;--y:'+y+'px;--dx:'+(Math.cos(a)*r).toFixed(1)+'px;--dy:'+(Math.sin(a)*r-spread*.25).toFixed(1)+'px;--r:'+Math.round(Math.random()*540-270)+'deg;--c:'+colors[i%colors.length]+';animation-delay:'+Math.round(Math.random()*90)+'ms';
  document.body.append(s);setTimeout(()=>s.remove(),1300);
 }
}
function tallerCelebrate(done,total){
 const target=document.querySelector('.taller-stepdock.is-on .taller-stepdock-bar')||document.querySelector('.stage-list button.active');
 const r=target?.getBoundingClientRect();
 const x=r&&r.width?r.left+r.width/2:innerWidth/2,y=r&&r.height?r.top+r.height/2:innerHeight*.7;
 if(total&&done>=total){
  tallerSpark(innerWidth/2,innerHeight*.45,60,Math.min(innerWidth,700)*.45);
  const t=document.querySelector('.design-complete');if(t){t.classList.add('taller-final');const s=t.querySelector('strong'),m=t.querySelector('small');if(s)s.textContent='¡Montaje completo!';if(m)m.textContent='Todos los bloques quedaron marcados. Ahora pruébalo.';}
 }else tallerSpark(x,y,18,90);
}
function tallerStepDock(){
 if(isCatalog||document.querySelector('.taller-stepdock'))return;
 const prev=document.getElementById('prevStep'),next=document.getElementById('nextStep'),list=document.getElementById('stageList');if(!prev||!next||!list)return;
 const dock=document.createElement('nav');dock.className='taller-stepdock';dock.setAttribute('aria-label','Pasos del montaje');
 dock.innerHTML='<button type="button" class="taller-stepdock-prev" aria-label="Paso anterior"><span aria-hidden="true">←</span></button><button type="button" class="taller-stepdock-info" title="Volver al visor"><span class="taller-stepdock-count"></span><strong class="taller-stepdock-title"></strong><i class="taller-stepdock-bar" aria-hidden="true"><b></b></i></button><button type="button" class="taller-stepdock-next">Siguiente <span aria-hidden="true">→</span></button>';
 document.body.append(dock);
 const [p,info,n]=dock.querySelectorAll('button');
 p.addEventListener('click',()=>prev.click());n.addEventListener('click',()=>next.click());
 info.addEventListener('click',()=>{const head=document.querySelector('.assembly-stage-head')||document.querySelector('.stage-header')||document.getElementById('montaje');head?.scrollIntoView({behavior:tallerFull()?'smooth':'auto',block:'start'});});
 const sync=()=>{
  const btns=[...list.querySelectorAll('button')],i=btns.findIndex(b=>b.classList.contains('active')),done=btns.filter(b=>b.classList.contains('done')).length,active=btns[i];
  const title=active?[...active.childNodes].filter(c=>!(c.classList&&c.classList.contains('number'))).map(c=>c.textContent).join(' ').trim():'';
  const num=b=>(b?.querySelector('.number')?.textContent||'').trim(),cur=num(active)||String(i+1),last=num(btns[btns.length-1])||String(btns.length);
  dock.querySelector('.taller-stepdock-count').textContent=btns.length?'Paso '+cur+' de '+last+' · '+done+' listos':'';
  dock.querySelector('.taller-stepdock-title').textContent=title||document.getElementById('stageTitle')?.textContent||'';
  dock.querySelector('.taller-stepdock-bar b').style.width=(btns.length?Math.round(done/btns.length*100):0)+'%';
  p.disabled=prev.disabled||i<=0;n.disabled=next.disabled;
 };
 const watch=new MutationObserver(()=>requestAnimationFrame(sync));
 watch.observe(list,{subtree:true,attributes:true,childList:true,attributeFilter:['class']});
 for(const b of [prev,next])watch.observe(b,{attributes:true,attributeFilter:['disabled']});
 sync();
 // Aparece cuando la cabecera del paso ya quedó arriba de la pantalla.
 const anchor=()=>document.querySelector('.assembly-stage-head')||document.querySelector('.stage-header')||next;
 let target=null;const io=new IntersectionObserver(entries=>{for(const e of entries){const on=!e.isIntersecting&&e.boundingClientRect.top<0;dock.classList.toggle('is-on',on);document.body.classList.toggle('taller-dock-on',on);}});
 const attach=()=>{const a=anchor();if(a&&a!==target){if(target)io.unobserve(target);target=a;io.observe(a);}};
 attach();let tries=0;const timer=setInterval(()=>{attach();if(++tries>20)clearInterval(timer);},300);
}
function tallerCatalogSteps(){
 for(const card of document.querySelectorAll('[data-circuit-card]')){
  const k=card.dataset.circuitCard,count=k==='descendente'?7:k==='contador'?6:k==='letras'?14:k==='555'?7:10,tags=card.querySelector('.circuit-card-tags');
  if(tags&&!tags.querySelector('.taller-steps')){const s=document.createElement('span');s.className='taller-steps';s.textContent=count+' pasos';tags.append(s);}
 }
}
if(isCatalog){tallerCatalogSteps();tallerTurntables();}
else{let dockTries=0;const dockTimer=setInterval(()=>{if(document.querySelector('.taller-bar')){tallerStepDock();clearInterval(dockTimer);}else if(++dockTries>120)clearInterval(dockTimer);},120);}
/* Miniaturas del catálogo: tira de cuadros del visor 3D; el cursor o el dedo giran el montaje. */
function tallerTurntables(){
 const fine=matchMedia('(hover:hover) and (pointer:fine)');
 fetch('./turntable/turntable.json').then(r=>r.ok?r.json():Promise.reject()).then(meta=>{
  for(const card of document.querySelectorAll('[data-circuit-card]')){
   const k=card.dataset.circuitCard,m=meta[k],preview=card.querySelector('.circuit-card-preview');
   if(!m||!preview||preview.querySelector('.taller-turntable'))continue;
   preview.style.setProperty('--turntable-bg',m.background);
   const canvas=document.createElement('canvas');canvas.className='taller-turntable';canvas.setAttribute('aria-hidden','true');
   const hint=document.createElement('span');hint.className='taller-turntable-hint';hint.setAttribute('aria-hidden','true');
   hint.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4"/></svg>'+(fine.matches?'Mueve el cursor para girar':'Desliza para girar');
   preview.append(canvas,hint);
   const ctx=canvas.getContext('2d'),mid=(m.frames-1)/2;
   let img=null,loading=null,cur=mid,target=mid,raf=0,drawn=-1,dragX=null,dragStart=mid,dragged=false;
   const load=()=>loading||(loading=new Promise((res,rej)=>{const i=new Image();i.decoding='async';i.onload=()=>{img=i;res();};i.onerror=rej;i.src='./turntable/'+k+'.webp';}));
   function draw(force){if(!img)return;const f=Math.round(cur);if(f===drawn&&!force)return;drawn=f;const cw=canvas.width,ch=canvas.height,s=Math.max(cw/m.width,ch/m.height),w=m.width*s,h=m.height*s;ctx.fillStyle=m.background;ctx.fillRect(0,0,cw,ch);ctx.drawImage(img,f*m.width,0,m.width,m.height,(cw-w)/2,(ch-h)/2,w,h);}
   const size=()=>{const r=preview.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);canvas.width=Math.max(1,Math.round(r.width*d));canvas.height=Math.max(1,Math.round(r.height*d));draw(true);};
   function tick(){cur+=(target-cur)*.2;if(Math.abs(target-cur)<.03)cur=target;draw();raf=cur===target?0:requestAnimationFrame(tick);}
   const go=t=>{target=Math.max(0,Math.min(m.frames-1,t));if(!raf)raf=requestAnimationFrame(tick);};
   const activate=()=>load().then(()=>{if(!preview.classList.contains('turntable-ready')){size();preview.classList.add('turntable-ready');}}).catch(()=>{});
   preview.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')activate();});
   preview.addEventListener('pointermove',e=>{
    if(!img)return;const r=preview.getBoundingClientRect();
    if(e.pointerType==='mouse')go((e.clientX-r.left)/r.width*(m.frames-1));
    else if(dragX!==null){const dx=e.clientX-dragX;if(Math.abs(dx)>8)dragged=true;if(dragged)go(dragStart+dx/r.width*(m.frames-1)*1.3);}
   });
   preview.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse')go(mid);});
   preview.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'){activate();dragX=e.clientX;dragStart=target;dragged=false;}});
   const end=()=>{dragX=null;};preview.addEventListener('pointerup',end);preview.addEventListener('pointercancel',end);
   preview.addEventListener('click',e=>{if(dragged){e.preventDefault();e.stopPropagation();dragged=false;}},true);
   new ResizeObserver(()=>{if(img)size();}).observe(preview);
   if(!fine.matches)new IntersectionObserver((entries,o)=>{if(entries.some(x=>x.isIntersecting)){activate();o.disconnect();}},{rootMargin:'160px'}).observe(preview);
  }
 }).catch(()=>{});
}
})();
