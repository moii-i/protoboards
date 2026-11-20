/* Presentation only: native links, actual viewer captures and optional short transitions. */
(()=>{'use strict';
const reduced=matchMedia('(prefers-reduced-motion:reduce)'),fine=matchMedia('(hover:hover) and (pointer:fine)');
const limited=()=>reduced.matches||['reduced','off'].includes(document.documentElement.dataset.workspaceMotion);
const cleanPath=s=>s.replace(/\.html$/,'');
const page=cleanPath(location.pathname),catalog=page==='/circuitos';
const kind=page==='/puerta-catodo'?'puerta-catodo':page==='/puerta'?'puerta':page==='/555'?'555':page==='/contador'?'contador':page==='/contador-descendente'?'descendente':page==='/seguidor'?'seguidor':'letras';
const coverImage={letras:'turntable/letras-poster.webp',555:'turntable/555-poster.webp',puerta:'preview-puerta.png','puerta-catodo':'turntable/puerta-poster.webp',contador:'turntable/contador-poster.webp',descendente:'turntable/descendente-poster.webp',seguidor:'turntable/seguidor-poster.webp'}[kind];
const frames={letras:[['a','Letra A'],['b','Letra b'],['h','Letra H']],555:[['uno','LED 1 encendido'],['dos','LED 2 encendido']],puerta:[['cerrada','Cerrada · OF'],['movimiento','En movimiento · rU'],['abierta','Abierta · OP'],['pausa','Pausa · SP']]};
const playIcon='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 3 7 5-7 5z"/></svg>';
const pauseIcon='<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><path d="M6 3v10M10 3v10"/></svg>';
const intentKey='protoboards:transition:v1';let clickedCard=null,intent=null;
const diagnostics={transition:'idle',viewer:'idle',viewerLoads:0,previewFrames:0};
const controllers=[];
function safeRead(){try{return JSON.parse(sessionStorage.getItem(intentKey)||'null');}catch{return null;}}
function safeClear(){try{sessionStorage.removeItem(intentKey);}catch{}}
function keyFor(url){const p=cleanPath(url.pathname);return p==='/puerta'||p==='/puerta-catodo'?'puerta':p==='/555'?'555':p==='/'||p==='/index'?'letras':null;}
function sameDestination(record){try{const a=new URL(record.url,location.origin),b=new URL(location.href);return a.origin===b.origin&&cleanPath(a.pathname)===cleanPath(b.pathname)&&a.search===b.search&&Date.now()-record.at<20000;}catch{return false;}}
function clearTransitionNames(){document.querySelectorAll('[data-showcase-transition]').forEach(el=>{el.style.viewTransitionName='';el.removeAttribute('data-showcase-transition');});}
document.addEventListener('click',e=>{
 const a=e.target.closest('a[href]');if(!catalog||!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||(a.target&&a.target!=='_self'))return;
 const url=new URL(a.href,location.href),key=keyFor(url);if(url.origin!==location.origin||!key)return;
 clickedCard=a.closest('[data-circuit-card]')||document.querySelector('[data-circuit-card="'+key+'"]');
 try{sessionStorage.setItem(intentKey,JSON.stringify({url:url.href,kind:key,at:Date.now()}));}catch{}
});
addEventListener('pageswap',e=>{
 if(!e.viewTransition)return;if(limited()){e.viewTransition.skipTransition();return;}
 if(!catalog)return;
 const target=e.activation?.entry?.url;const key=target?keyFor(new URL(target)):null;
 const card=clickedCard||(key&&document.querySelector('[data-circuit-card="'+key+'"]'));
 if(!card)return;const preview=card.querySelector('.circuit-card-preview');if(!preview)return;
 preview.style.viewTransitionName='circuit-surface';preview.dataset.showcaseTransition='';diagnostics.transition='outgoing';
 e.viewTransition.finished.finally(clearTransitionNames).catch(()=>{});
});
addEventListener('pagereveal',e=>{
 intent=safeRead();if(!intent||catalog||!sameDestination(intent)){if(intent&&!sameDestination(intent))safeClear();return;}
 safeClear();if(!e.viewTransition||limited()){if(e.viewTransition)e.viewTransition.skipTransition();return;}
 const stage=document.querySelector('.map-stage');if(!stage)return;
 stage.style.viewTransitionName='circuit-surface';stage.dataset.showcaseTransition='';diagnostics.transition='incoming';
 e.viewTransition.ready.then(()=>{diagnostics.transition='running';clearTransitionNames();}).catch(()=>clearTransitionNames());
 e.viewTransition.finished.then(()=>{diagnostics.transition='finished';}).catch(()=>{diagnostics.transition='skipped';});
});
function setupPreviews(){
 for(const card of document.querySelectorAll('[data-circuit-card]')){
  const key=card.dataset.circuitCard,preview=card.dataset.preview||key,list=frames[key],anchor=card.querySelector('.circuit-card-preview');if(!list||!anchor)continue;
  const poster=anchor.querySelector('img'),name=card.querySelector('h1,h2,h3').textContent;
  const layers=Array.from({length:2},()=>{
   const frame=poster.cloneNode(false);frame.className='showcase-frame';frame.removeAttribute('fetchpriority');anchor.append(frame);return frame;
  });
  const state=document.createElement('span');state.className='showcase-preview-state';state.setAttribute('aria-hidden','true');anchor.append(state);
  const button=document.createElement('button');button.type='button';button.className='showcase-preview-play';card.insertBefore(button,card.querySelector('.circuit-card-body'));
  let timer=null,index=-1,pinned=false,token=0,loaded=null,running=false,manual=false,front=0;
  const label=()=>{button.innerHTML=(running?pauseIcon:playIcon)+'<span>'+(limited()?'Ver estado':running?'Pausar':'Vista previa')+'</span>';button.setAttribute('aria-pressed',String(running));button.setAttribute('aria-label',(limited()?'Ver siguiente estado de ':running?'Pausar vista previa de ':'Reproducir vista previa de ')+name);};
  const load=()=>loaded||(loaded=Promise.all(list.map(([id])=>{const img=new Image();img.src='./preview-'+preview+'-'+id+'.png';return img.decode().then(()=>img);})));
  function show(n){index=(n+list.length)%list.length;front=1-front;layers[front].src='./preview-'+preview+'-'+list[index][0]+'.png';layers.forEach((frame,i)=>frame.classList.toggle('is-current',i===front));state.textContent=list[index][1];card.classList.add('showcase-playing');diagnostics.previewFrames++;}
  function stop(reset=true){token++;clearInterval(timer);timer=null;running=false;pinned=false;button.classList.remove('is-loading');if(reset){card.classList.remove('showcase-playing');layers.forEach(frame=>frame.classList.remove('is-current'));index=-1;manual=false;}label();}
  async function start(pin=false){
   pinned=pin;if(running)return;const request=++token;button.classList.add('is-loading');
   try{await load();if(request!==token||document.hidden)return;button.classList.remove('is-loading');show(index+1);
    if(limited()){manual=true;running=false;label();return;}
    running=true;label();timer=setInterval(()=>show(index+1),key==='puerta'?1200:900);
   }catch{if(request!==token)return;stop();button.disabled=true;button.title='La vista previa no está disponible. Puedes abrir el montaje.';}
  }
  button.onclick=()=>{if(limited()){start(true);return;}if(running){stop();}else start(true);};
  // Al pasar el cursor, la miniatura gira (design-system.js); los estados se ven con el botón.
  card.addEventListener('pointerleave',()=>{if(!pinned&&!manual)stop();});
  card.addEventListener('focusout',e=>{if(!card.contains(e.relatedTarget)&&!pinned&&!manual)stop();});
  const controller={stop,card,get state(){return {key,running,index,pinned,manual};}};controllers.push(controller);label();
 }
 const observer=new IntersectionObserver(entries=>{for(const e of entries)if(!e.isIntersecting)controllers.find(c=>c.card===e.target)?.stop();},{threshold:0});controllers.forEach(c=>observer.observe(c.card));
}
function installViewer(){
 const viewport=document.getElementById('threeViewport'),mapbox=document.querySelector('.mapbox');
 if(!viewport||!mapbox||typeof window.setRenderer!=='function'||kind.startsWith('puerta')&&!window.doorLesson)return false;
 if(viewport.dataset.showcaseInstalled)return true;viewport.dataset.showcaseInstalled='true';
 const cover=document.createElement('div');cover.className='showcase-viewer-cover';cover.hidden=true;cover.setAttribute('role','status');cover.setAttribute('aria-live','polite');
 cover.innerHTML='<div class="showcase-load-stage"><img src="./'+coverImage+'" alt="" width="720" height="380"><i class="showcase-load-sweep" aria-hidden="true"></i></div><div class="showcase-load-caption"><span class="showcase-load-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/></svg></span><div><strong>Preparando tu vista 3D</strong><small>Vista de referencia del montaje</small><div class="showcase-load-line" aria-hidden="true"></div></div></div>';mapbox.append(cover);
 let generation=0,hideTimer=0;
 function reveal(){clearTimeout(hideTimer);cover.classList.remove('is-leaving');cover.hidden=false;mapbox.setAttribute('aria-busy','true');diagnostics.viewer='loading';diagnostics.viewerLoads++;}
 function finish(){mapbox.setAttribute('aria-busy','false');diagnostics.viewer='ready';if(cover.hidden)return;cover.classList.add('is-leaving');clearTimeout(hideTimer);hideTimer=setTimeout(()=>{cover.hidden=true;cover.classList.remove('is-leaving');},reduced.matches||document.getElementById('motion')?.checked===false?0:250);}
 function cancel(){generation++;clearTimeout(hideTimer);cover.hidden=true;cover.classList.remove('is-leaving');mapbox.setAttribute('aria-busy','false');diagnostics.viewer='idle';}
 const original=window.setRenderer;
 window.setRenderer=async function(value,...rest){
  const request=++generation;if(value!=='3d'){cancel();return original.call(this,value,...rest);}
  if(viewport.dataset.ready!=='true')reveal();
  try{const result=await original.call(this,value,...rest);if(request!==generation)return result;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));if(request!==generation)return result;if(mapbox.classList.contains('in-3d'))finish();else cancel();return result;}catch(error){cancel();throw error;}
 };
 // A saved 3D preference can start loading before this presentation module initializes.
 const busy=()=>Boolean(document.querySelector('[data-renderer="3d"][aria-busy="true"]'));
 if(busy()&&viewport.dataset.ready!=='true')reveal();
 const observer=new MutationObserver(()=>{if(diagnostics.viewer==='loading'&&viewport.dataset.ready==='true'&&mapbox.classList.contains('in-3d'))finish();else if(diagnostics.viewer==='loading'&&!busy()&&!mapbox.classList.contains('in-3d'))cancel();});
 observer.observe(viewport,{attributes:true,attributeFilter:['data-ready','hidden']});observer.observe(mapbox,{attributes:true,attributeFilter:['class']});
 return true;
}
function init(){
 intent=intent||safeRead();
 if(!catalog&&intent&&sameDestination(intent)&&!limited()&&!('onpagereveal' in window)){document.body.classList.add('showcase-arrive');safeClear();setTimeout(()=>document.body.classList.remove('showcase-arrive'),500);}
 if(catalog)setupPreviews();else if(!installViewer()){let tries=0;const timer=setInterval(()=>{if(installViewer()||++tries>120)clearInterval(timer);},100);}
 window.protoboardsShowcase={getState:()=>({...diagnostics,previews:controllers.map(c=>c.state)}),stopPreviews:()=>controllers.forEach(c=>c.stop())};
}
reduced.addEventListener('change',()=>controllers.forEach(c=>c.stop()));
let effectsLimited=limited();
document.addEventListener('workspace-appearance-change',()=>{
 const next=limited();if(next===effectsLimited)return;effectsLimited=next;controllers.forEach(c=>c.stop());
});
document.addEventListener('visibilitychange',()=>{if(document.hidden)controllers.forEach(c=>c.stop());});
addEventListener('pagehide',()=>controllers.forEach(c=>c.stop()));
addEventListener('pageshow',()=>{clickedCard=null;});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
