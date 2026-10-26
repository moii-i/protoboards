/* Layout and motion only; original circuit controllers retain all state. */
(()=>{
'use strict';
const layout=document.querySelector('.layout'),sidebar=layout?.querySelector('.sidebar');
if(!layout||!sidebar)return;
const small=matchMedia('(max-width:800px)'),mobile=matchMedia('(max-width:650px)'),reduced=matchMedia('(prefers-reduced-motion:reduce)');
const storage='protoboards:workbench:v1',presets={compact:184,normal:225,wide:300};
let saved={};try{saved=JSON.parse(localStorage.getItem(storage)||'{}')||{};}catch{}
let width=Number.isFinite(saved.width)?Math.min(340,Math.max(180,saved.width)):225;
let collapsed=Boolean(saved.collapsed),mobileCollapsed=typeof saved.mobileCollapsed==='boolean'?saved.mobileCollapsed:true;
let transitions=0,lastTitle='',frame=0,stepAnimations=[],resizeDrag=null;
const animations=new WeakMap(),sheets=new WeakSet();
const canMove=()=>!reduced.matches&&document.getElementById('motion')?.checked!==false;
const save=()=>{try{localStorage.setItem(storage,JSON.stringify({width,collapsed,mobileCollapsed}));}catch{}};
sidebar.id=sidebar.id||'workbenchSteps';
layout.classList.add('bench-layout');document.body.classList.add('workbench-active');
const toolbar=document.createElement('div');toolbar.className='bench-toolbar';
toolbar.innerHTML='<div class="bench-toolbar-title"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M9 4v16M5.5 8h1M5.5 12h1M5.5 16h1"/></svg><div><strong>Tu mesa de trabajo</strong><span id="benchCurrentStep">Elige tu siguiente conexión</span></div></div><div class="bench-controls"><div class="bench-widths" role="group" aria-label="Ancho del panel de pasos"><button type="button" data-bench-size="compact" aria-pressed="false">Compacto</button><button type="button" data-bench-size="normal" aria-pressed="true">Normal</button><button type="button" data-bench-size="wide" aria-pressed="false">Amplio</button></div><button type="button" class="bench-toggle" aria-controls="'+sidebar.id+'" aria-expanded="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="m11.5 5-5 5 5 5"/></svg><span>Ocultar pasos</span></button></div>';
layout.before(toolbar);
const toggle=toolbar.querySelector('.bench-toggle'),current=toolbar.querySelector('#benchCurrentStep');
const separator=document.createElement('div');separator.className='bench-resizer';separator.tabIndex=0;
separator.setAttribute('role','separator');separator.setAttribute('aria-label','Ajustar ancho del panel de pasos');
separator.setAttribute('aria-orientation','vertical');separator.setAttribute('aria-valuemin','180');separator.setAttribute('aria-valuemax','340');separator.setAttribute('aria-controls',sidebar.id);
separator.title='Arrastra para ajustar. Usa las flechas del teclado o doble clic para restablecer.';
separator.innerHTML='<span aria-hidden="true"></span>';layout.append(separator);
function isCollapsed(){return small.matches?mobileCollapsed:collapsed;}
function paint(){
 const hide=isCollapsed();
 if(hide&&sidebar.contains(document.activeElement))toggle.focus({preventScroll:true});
 sidebar.inert=hide;sidebar.setAttribute('aria-hidden',String(hide));
 layout.dataset.collapsed=String(hide);layout.style.setProperty('--bench-sidebar',width+'px');
 toggle.setAttribute('aria-expanded',String(!hide));toggle.querySelector('span').textContent=hide?'Ver pasos':'Ocultar pasos';
 toolbar.dataset.collapsed=String(hide);
 for(const b of toolbar.querySelectorAll('[data-bench-size]')){b.setAttribute('aria-pressed',String(Math.abs(width-presets[b.dataset.benchSize])<1));b.disabled=hide;}
 separator.tabIndex=hide||small.matches?-1:0;separator.setAttribute('aria-valuenow',String(Math.round(width)));
 separator.setAttribute('aria-valuetext',Math.round(width)+' píxeles');
}
toggle.onclick=()=>{if(small.matches)mobileCollapsed=!mobileCollapsed;else collapsed=!collapsed;paint();save();};
for(const b of toolbar.querySelectorAll('[data-bench-size]'))b.onclick=()=>{width=presets[b.dataset.benchSize];paint();save();};
function finishResize(){
 if(!resizeDrag)return;resizeDrag=null;layout.classList.remove('bench-resizing');save();
}
separator.addEventListener('pointerdown',e=>{
 if(e.button!==0||small.matches||isCollapsed())return;
 resizeDrag={x:e.clientX,width,id:e.pointerId};separator.setPointerCapture(e.pointerId);layout.classList.add('bench-resizing');e.preventDefault();
});
separator.addEventListener('pointermove',e=>{
 if(!resizeDrag||resizeDrag.id!==e.pointerId)return;
 const max=Math.max(180,Math.min(340,layout.clientWidth-520));
 width=Math.round(Math.max(180,Math.min(max,resizeDrag.width+e.clientX-resizeDrag.x)));paint();
});
separator.addEventListener('pointerup',finishResize);separator.addEventListener('pointercancel',finishResize);separator.addEventListener('lostpointercapture',finishResize);
separator.addEventListener('dblclick',()=>{width=presets.normal;paint();save();});
separator.addEventListener('keydown',e=>{
 const key=e.key;if(!['ArrowLeft','ArrowRight','Home','End'].includes(key))return;e.preventDefault();
 width=key==='Home'?180:key==='End'?340:Math.min(340,Math.max(180,width+(key==='ArrowRight'?1:-1)*(e.shiftKey?20:10)));
 paint();save();
});
small.addEventListener('change',()=>{finishResize();paint();});paint();
function cancelStepMotion(){for(const a of stepAnimations)a.cancel();stepAnimations=[];}
const title=document.getElementById('stageTitle'),header=document.querySelector('.stage-header'),list=document.getElementById('stageList');
function updateStep(){
 const label=title?.textContent.trim()||'',select=document.getElementById('step'),active=list?.querySelector('button.active');
 const count=select?.options.length||list?.querySelectorAll('button').length||0;
 const index=select?.selectedIndex>=0?select.selectedIndex:[...(list?.querySelectorAll('button')||[])].indexOf(active);
 current.textContent=label?(index>=0?'Paso '+(index+1)+' de '+count+' · ':'')+label:'Elige tu siguiente conexión';
 if(label&&lastTitle&&label!==lastTitle){
  cancelStepMotion();transitions++;
  if(canMove()){
   const targets=[header?.querySelector('.stage-tag'),title,document.getElementById('stageText'),header?.querySelector('.step-parts')].filter(Boolean);
   targets.forEach((el,i)=>stepAnimations.push(el.animate([{opacity:.35,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],{duration:220,delay:i*24,easing:'cubic-bezier(.2,.7,.3,1)'})));
   const stage=document.querySelector('.map-stage');
   if(stage)stepAnimations.push(stage.animate([{boxShadow:'inset 0 0 0 2px #76a05a88'},{boxShadow:'inset 0 0 0 2px transparent'}],{duration:480,easing:'ease-out'}));
  }
 }
 if(label)lastTitle=label;
}
const queueStep=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(updateStep);};
if(header)new MutationObserver(queueStep).observe(header,{subtree:true,childList:true,characterData:true});
if(list)new MutationObserver(queueStep).observe(list,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
updateStep();
function panelFrames(open){
 const distance=mobile.matches?18:7;
 return open?[{opacity:0,transform:'translateY('+distance+'px) scale(.99)'},{opacity:1,transform:'translateY(0) scale(1)'}]:[{opacity:1,transform:'translateY(0) scale(1)'},{opacity:0,transform:'translateY('+distance+'px) scale(.99)'}];
}
function setToolOpen(details,open,focus=false){
 const panel=details.querySelector('.design-tool-panel'),summary=details.querySelector('summary');
 if(!panel||!summary)return;
 enhanceTool(details);
 const prev=animations.get(details);if(prev){prev.onfinish=null;prev.cancel();animations.delete(details);}
 if(open){
  for(const other of details.parentElement.querySelectorAll('.design-tool-group[open]'))if(other!==details)setToolOpen(other,false);
  delete details.dataset.benchClosing;panel.inert=false;details.open=true;summary.setAttribute('aria-expanded','true');
 }else{
  if(focus||panel.contains(document.activeElement))summary.focus({preventScroll:true});
  summary.setAttribute('aria-expanded','false');panel.inert=true;
  if(!details.open){panel.inert=false;return;}details.dataset.benchClosing='true';
 }
 const finish=()=>{
  animations.delete(details);
  if(!open){details.open=false;delete details.dataset.benchClosing;panel.inert=false;}
 };
 if(!canMove()){finish();return;}
 const a=panel.animate(panelFrames(open),{duration:open?200:150,easing:open?'cubic-bezier(.2,.8,.3,1)':'ease-in',fill:'none'});
 animations.set(details,a);a.onfinish=finish;
}
function enhanceTool(details){
 if(sheets.has(details))return;sheets.add(details);
 const panel=details.querySelector('.design-tool-panel'),label=panel?.querySelector('.design-panel-head strong')?.textContent||'herramientas';
 if(!panel)return;details.dataset.sheetSize='half';
 const grip=document.createElement('button');grip.type='button';grip.className='bench-sheet-grip';grip.innerHTML='<span aria-hidden="true"></span>';
 const size=full=>{details.dataset.sheetSize=full?'full':'half';grip.setAttribute('aria-expanded',String(full));grip.setAttribute('aria-label',(full?'Reducir':'Ampliar')+' panel de '+label.toLowerCase());};
 size(false);panel.prepend(grip);
 let gesture=null,suppress=false;
 grip.onclick=()=>{if(suppress){suppress=false;return;}size(details.dataset.sheetSize!=='full');};
 grip.addEventListener('pointerdown',e=>{
  if(e.button!==0||!mobile.matches)return;
  gesture={y:e.clientY,height:panel.getBoundingClientRect().height,id:e.pointerId,delta:0,full:details.dataset.sheetSize==='full'};
  grip.setPointerCapture(e.pointerId);
 });
 grip.addEventListener('pointermove',e=>{
  if(!gesture||e.pointerId!==gesture.id)return;gesture.delta=e.clientY-gesture.y;
  if(Math.abs(gesture.delta)>7){panel.classList.add('bench-sheet-dragging');panel.style.height=Math.max(180,Math.min(innerHeight*.86,gesture.height-gesture.delta))+'px';}
 });
 const end=e=>{
  if(!gesture||e.pointerId!==gesture.id)return;
  const g=gesture;gesture=null;panel.style.height='';panel.classList.remove('bench-sheet-dragging');
  suppress=Math.abs(g.delta)>7;
  if(g.delta< -45)size(true);
  else if(g.delta>65){if(g.full)size(false);else setToolOpen(details,false,true);}
 };
 grip.addEventListener('pointerup',end);
 grip.addEventListener('pointercancel',()=>{gesture=null;panel.style.height='';panel.classList.remove('bench-sheet-dragging');});
 grip.addEventListener('lostpointercapture',()=>{if(gesture){gesture=null;panel.style.height='';panel.classList.remove('bench-sheet-dragging');}});
}
function enhanceTools(){document.querySelectorAll('.design-tool-group').forEach(enhanceTool);}
enhanceTools();
const toolsObserver=new MutationObserver(()=>{if(document.querySelector('.design-tool-dock')){enhanceTools();toolsObserver.disconnect();}});
if(!document.querySelector('.design-tool-dock'))toolsObserver.observe(document.querySelector('.workspace')||layout,{childList:true,subtree:true});
function stopMotion(){
 document.body.classList.toggle('bench-motion-off',!canMove());
 if(canMove())return;cancelStepMotion();
 document.querySelectorAll('.design-tool-group').forEach(d=>{const a=animations.get(d);if(!a)return;const close=d.dataset.benchClosing==='true';a.onfinish=null;a.cancel();animations.delete(d);if(close){d.open=false;delete d.dataset.benchClosing;}d.querySelector('.design-tool-panel').inert=false;});
}
reduced.addEventListener('change',stopMotion);document.getElementById('motion')?.addEventListener('change',stopMotion);stopMotion();
window.protoboardsWorkbench={setToolOpen,getState(){return {width,collapsed:isCollapsed(),mobile:small.matches,transitions,motion:canMove(),panels:[...document.querySelectorAll('.design-tool-group')].map(d=>({name:d.dataset.designTool,open:d.open,closing:d.dataset.benchClosing==='true',size:d.dataset.sheetSize}))};}};
})();