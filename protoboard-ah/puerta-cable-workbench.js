/* Cable navigation floats; explanations and animation controls use the side area.
   All electrical geometry and explicit progress marking remain in the guide. */
(()=>{
 'use strict';
 if(!window.doorWorkspace||window.doorCableWorkbench)return;
 const byId=id=>document.getElementById(id),stage=document.querySelector('.map-stage'),box=document.querySelector('.mapbox'),map=byId('map'),actions=document.querySelector('.assembly-stage-actions');
 const uiKey='protoboard:cable-ui:v1',viewKey=stateKey+':view-memory:v1';
 let prefs={folded:false,width:1,intensity:1,positions:{}},views={};
 try{const raw=JSON.parse(localStorage.getItem(uiKey)||'{}');prefs.folded=raw.folded===true;if([1,1.4,1.8].includes(raw.width))prefs.width=raw.width;if([.5,.8,1].includes(raw.intensity))prefs.intensity=raw.intensity;for(const key of ['desktop','mobile','landscape']){const p=raw.positions?.[key];if(p&&[p.x,p.y].every(n=>Number.isFinite(n)&&n>=0&&n<=1))prefs.positions[key]={x:p.x,y:p.y};}}catch{}
 const validBox=b=>Array.isArray(b)&&b.length===4&&b.every(Number.isFinite)&&b[2]>0&&b[3]>0;
 try{const raw=JSON.parse(localStorage.getItem(viewKey)||'{}');if(raw.layoutVersion===model.layoutVersion)for(const[k,v]of Object.entries(raw.views||{}))if(/^(2d|3d):(A|B|all)$/.test(k)&&validBox(v.box))views[k]=v;}catch{}
 let activeView=['A','B','all'].includes(view)?view:'all',drag=null,raf=0;
 const saveUI=()=>{try{localStorage.setItem(uiKey,JSON.stringify(prefs));}catch{}};
 const saveViews=()=>{try{localStorage.setItem(viewKey,JSON.stringify({layoutVersion:model.layoutVersion,views}));}catch{}};
 const device=()=>innerWidth<=650?'mobile':innerHeight<500?'landscape':'desktop';
 const island=document.createElement('section');island.className='cable-island';island.hidden=true;island.setAttribute('aria-label','Navegación flotante cable por cable');
 island.innerHTML='<button type="button" id="cableDrag" aria-label="Mover isla: arrastra o usa las flechas" title="Mover isla: arrastra o usa las flechas">⠿</button><button type="button" id="cablePrev" aria-label="Conexión anterior">←</button><span id="cableCounter" role="status" aria-live="polite"></span><button type="button" id="cableNext" aria-label="Siguiente conexión">→</button><button type="button" id="cableMark" aria-label="Marcar realizada y seguir">✓ <span>Marcar y seguir</span></button><button type="button" id="cableFold" aria-label="Plegar isla" aria-expanded="true">−</button><button type="button" id="cableMore" aria-label="Herramientas del cable" aria-expanded="false" aria-controls="cableTools">···</button>';
 box.append(island);
 let endpoints;
 if(model.dipCathode){
  endpoints=document.createElement('div');endpoints.className='cable-locations';endpoints.hidden=true;
  endpoints.setAttribute('role','group');endpoints.setAttribute('aria-label','Extremos de la conexión');
  endpoints.innerHTML='<button type="button"><small>Origen</small><strong></strong></button><button type="button"><small>Destino</small><strong></strong></button>';
  actions.after(endpoints);
  [...endpoints.children].forEach((button,i)=>button.onclick=()=>locate(i?'b':'a'));
 }
 const stepMode=document.createElement('button');stepMode.id='cableStepMode';stepMode.type='button';stepMode.textContent='Por pasos';stepMode.hidden=true;stepMode.onclick=()=>setMode('step');actions.append(stepMode);
 const renderers=document.querySelector('.island-renderers'),close=byId('closeExpanded'),renderHome=document.createComment('renderer-home'),closeHome=document.createComment('close-home');
 renderers.before(renderHome);close.before(closeHome);
 const tools=document.createElement('section');tools.id='cableTools';tools.className='cable-tools';tools.hidden=true;
 tools.innerHTML='<div class="cable-tools-head"><h3>Revisa esta conexión</h3><button type="button" id="cableToolsClose" aria-label="Cerrar herramientas del cable">×</button></div><p id="cableToolName"></p><label for="cableScrub">Recorrido de la animación</label><input id="cableScrub" type="range" min="0" max="100" value="100" step="1"><output id="cablePhase" for="cableScrub"></output><div class="cable-tool-actions"><button type="button" id="cableReplay">Repetir</button><button type="button" id="cablePause">Pausar</button></div><label for="cableSpeed">Velocidad</label><select id="cableSpeed"><option value="0.5">Lenta</option><option value="1">Normal</option><option value="2">Rápida</option></select><p>Recorrer o reproducir no marca el cable como realizado. Comprueba tu montaje y usa Marcar y seguir.</p><fieldset><legend>Encuadres de trabajo</legend><div class="cable-tool-actions"><button type="button" data-cable-view="A">Placa A</button><button type="button" data-cable-view="B">Placa B</button><button type="button" data-cable-view="all">Conjunto</button></div><button type="button" id="cableResetView">Restablecer esta vista</button><button type="button" id="cableResetPosition">Centrar la isla</button><p>Se recuerda el encuadre de cada placa en este navegador.</p></fieldset><fieldset><legend>Resaltado del cable</legend><label for="cableWidth">Grosor del contorno</label><select id="cableWidth"><option value="1">Normal</option><option value="1.4">Medio</option><option value="1.8">Grueso</option></select><label for="cableIntensity">Intensidad del contorno</label><select id="cableIntensity"><option value="1">Alta</option><option value="0.8">Media</option><option value="0.5">Suave</option></select><p>Solo ajusta la ayuda de selección; conserva el color del cable.</p></fieldset>';
 doorWorkspace.registerTool(tools);
 function openTools(value){tools.hidden=!value;doorWorkspace.refreshTools();byId('cableMore').setAttribute('aria-expanded',String(value));if(value)byId('cableToolsClose').focus({preventScroll:true});else if(!island.hidden)byId('cableMore').focus({preventScroll:true});}
 byId('cableMore').onclick=()=>openTools(tools.hidden);byId('cableToolsClose').onclick=()=>openTools(false);
 byId('cablePrev').onclick=()=>byId('islandPrev').click();byId('cableNext').onclick=()=>byId('islandNext').click();byId('cableMark').onclick=()=>byId('islandMark').click();
 function bounds(){const r=box.getBoundingClientRect(),b=island.getBoundingClientRect(),loupe=byId('detailLoupe'),lr=loupe.getBoundingClientRect();const height=rendererMode==='2d'&&!loupe.hidden&&lr.height>0&&lr.top>r.top?Math.min(r.height,lr.top-r.top):r.height;return {r,minX:8,minY:8,maxX:Math.max(8,r.width-b.width-8),maxY:Math.max(8,height-b.height-8)};}
 function position(x,y,persist=false){const b=bounds(),left=Math.max(b.minX,Math.min(b.maxX,x)),top=Math.max(b.minY,Math.min(b.maxY,y));island.style.left=left+'px';island.style.top=top+'px';if(persist){prefs.positions[device()]={x:b.maxX===b.minX?0:(left-b.minX)/(b.maxX-b.minX),y:b.maxY===b.minY?0:(top-b.minY)/(b.maxY-b.minY)};saveUI();}}
 function restorePosition(){if(island.hidden||drag)return;const b=bounds(),p=prefs.positions[device()]||{x:.5,y:0};position(b.minX+p.x*(b.maxX-b.minX),b.minY+p.y*(b.maxY-b.minY));}
 byId('cableFold').onclick=()=>{prefs.folded=!prefs.folded;saveUI();sync();};
 byId('cableResetPosition').onclick=()=>{delete prefs.positions[device()];saveUI();restorePosition();};
 const handle=byId('cableDrag');
 handle.onpointerdown=e=>{if(e.button!==0)return;e.preventDefault();e.stopPropagation();const r=island.getBoundingClientRect(),b=box.getBoundingClientRect();drag={id:e.pointerId,x:e.clientX,y:e.clientY,left:r.left-b.left,top:r.top-b.top};handle.setPointerCapture(e.pointerId);island.classList.add('is-dragging');};
 handle.onpointermove=e=>{if(!drag||drag.id!==e.pointerId)return;e.preventDefault();position(drag.left+e.clientX-drag.x,drag.top+e.clientY-drag.y);};
 const finish=e=>{if(!drag)return;const r=island.getBoundingClientRect(),b=box.getBoundingClientRect();if(handle.hasPointerCapture?.(e.pointerId))handle.releasePointerCapture(e.pointerId);drag=null;island.classList.remove('is-dragging');position(r.left-b.left,r.top-b.top,true);};
 handle.onpointerup=finish;handle.onpointercancel=finish;
 handle.onkeydown=e=>{if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();e.stopPropagation();const r=island.getBoundingClientRect(),b=box.getBoundingClientRect(),n=e.shiftKey?30:10;position(r.left-b.left+(e.key==='ArrowLeft'?-n:e.key==='ArrowRight'?n:0),r.top-b.top+(e.key==='ArrowUp'?-n:e.key==='ArrowDown'?n:0),true);};
 const resize=new ResizeObserver(()=>{if(!raf)raf=requestAnimationFrame(()=>{raf=0;restorePosition();});});resize.observe(box);resize.observe(island);
 function styleSelection(){map.style.setProperty('--selection-halo-width',7*prefs.width+'px');map.style.setProperty('--selection-halo-opacity',String(prefs.intensity));board3d?.setSelectionStyle?.({scale:prefs.width,intensity:prefs.intensity});byId('cableWidth').value=String(prefs.width);byId('cableIntensity').value=String(prefs.intensity);}
 byId('cableWidth').onchange=e=>{const n=Number(e.target.value);if([1,1.4,1.8].includes(n)){prefs.width=n;saveUI();styleSelection();}};
 byId('cableIntensity').onchange=e=>{const n=Number(e.target.value);if([.5,.8,1].includes(n)){prefs.intensity=n;saveUI();styleSelection();}};
 byId('cableScrub').oninput=e=>doorStudio.seek(Number(e.target.value)/100);
 byId('cableReplay').onclick=()=>doorStudio.play();byId('cablePause').onclick=()=>doorStudio.pause();
 byId('cableSpeed').onchange=e=>{const original=document.querySelector('.studio-speed [data-studio-speed]');original.value=e.target.value;original.dispatchEvent(new Event('change'));syncTools();};
 function syncTools(){const it=model.items.find(i=>i.id===selected),state=doorStudio.getState(),a=state.animation,wire=it?.kind==='wire';byId('cableToolName').textContent=it?it.label:'Selecciona un cable del recorrido.';byId('cableScrub').disabled=!wire;const t=a?.id===selected?a.progress:1;byId('cableScrub').value=String(Math.round(t*100));byId('cablePhase').textContent=!wire?'La tira compartida no necesita un jumper.':t<.22?'1/3 · Inserción del primer extremo':t<.78?'2/3 · Tendido del jumper':t<1?'3/3 · Inserción del segundo extremo':'Recorrido completo · revisa antes de marcar';byId('cableReplay').disabled=!wire||!canAnimate();byId('cablePause').disabled=!a||a.progress>=1||!canAnimate();byId('cablePause').textContent=a?.playing?'Pausar':'Continuar';byId('cableSpeed').value=String(state.prefs.speed);}
 function sync(){const active=mode==='cable';stage.classList.toggle('is-cable',active);island.hidden=!active;stepMode.hidden=!active;if(active){if(renderers.parentNode!==actions)actions.append(renderers,close);}else{renderHome.after(renderers);closeHome.after(close);tools.hidden=true;byId('cableMore').setAttribute('aria-expanded','false');}
  const xs=navigationItems(),index=xs.findIndex(i=>i.id===selected),it=xs[index];
  if(endpoints){
   endpoints.hidden=!active||it?.kind!=='wire';
   if(!endpoints.hidden)[it.a,it.b].forEach((h,i)=>{
    const button=endpoints.children[i],coord=hole(h);
    button.lastElementChild.textContent=coord;
    button.setAttribute('aria-label',(i?'Localizar destino, ':'Localizar origen, ')+coord);
   });
  }
  byId('cableCounter').textContent=index>=0?(index+1)+' / '+xs.length:'Paso '+(step+1);byId('cablePrev').disabled=byId('islandPrev').disabled;byId('cableNext').disabled=byId('islandNext').disabled;byId('cableMark').disabled=!it;byId('cableMark').setAttribute('aria-label',it&&marked.has(it.id)?'Ya realizada: seguir':'Marcar realizada y seguir');island.classList.toggle('is-folded',prefs.folded);byId('cableFold').setAttribute('aria-expanded',String(!prefs.folded));byId('cableFold').setAttribute('aria-label',prefs.folded?'Desplegar isla':'Plegar isla');byId('cableFold').textContent=prefs.folded?'+':'−';syncTools();restorePosition();}
 const baseSync=syncAssemblyIsland;syncAssemblyIsland=function(...args){const r=baseSync(...args);sync();return r;};
 for(const name of ['selectCable','selectStep','setMode']){const original=window[name];window[name]=function(...args){const r=original(...args);sync();return r;};}
 const bodyObserver=new MutationObserver(sync);bodyObserver.observe(document.body,{attributes:true,attributeFilter:['class']});
 document.addEventListener('door-wire-animation',syncTools);
 const originalMotion=synchronizeMotion;synchronizeMotion=function(...args){const r=originalMotion(...args);syncTools();return r;};
 motionQuery.addEventListener('change',syncTools);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!tools.hidden&&!document.querySelector('dialog[open]')){e.preventDefault();e.stopImmediatePropagation();openTools(false);}},true);
 function remember(){const key=rendererMode+':'+activeView;const b=map.getAttribute('viewBox').split(/\s+/).map(Number);if(!validBox(b))return;views[key]={box:b,view:activeView};if(rendererMode==='3d'&&board3d)views[key].camera=board3d.getViewState();saveViews();}
 function chooseView(name,reset=false){if(!['A','B','all'].includes(name))return false;remember();activeView=name;const key=rendererMode+':'+name,saved=reset?null:views[key];if(reset){delete views[key];saveViews();}view=name;setCamera();stopCamera(true);if(saved){paintCamera(saved.box);if(rendererMode==='3d'&&saved.camera)board3d?.restoreViewState(saved.camera);}else if(rendererMode==='3d')board3d?.focusBox(map.getAttribute('viewBox').split(/\s+/).map(Number),false);syncLoupe();restorePosition();return true;}
 for(const name of ['A','B','all']){const b=document.querySelector('[data-view="'+name+'"]');b.onclick=()=>chooseView(name);}
 tools.querySelectorAll('[data-cable-view]').forEach(b=>b.onclick=()=>chooseView(b.dataset.cableView));byId('cableResetView').onclick=()=>chooseView(activeView,true);
 const originalRenderer=setRenderer;setRenderer=async function(value){remember();const r=await originalRenderer(value);styleSelection();sync();return r;};
 const originalShow=showRenderer;showRenderer=function(...args){const r=originalShow(...args);styleSelection();return r;};
 window.addEventListener('pagehide',remember);
 box.addEventListener('pointerup',e=>{if(!e.target.closest('.cable-island'))remember();});
 let wheelTimer=0;box.addEventListener('wheel',e=>{if(e.target.closest('.cable-island'))return;clearTimeout(wheelTimer);wheelTimer=setTimeout(remember,180);},{passive:true});
 if(!model.dipCathode){
  const cards=document.createElement('div');cards.className='assembly-option-cards';cards.setAttribute('aria-label','Alternativas de montaje');
  for(const[v,title,inventory,rate,eyebrow]of [['ls151-9r','9 resistencias','9 de 1 kΩ','2.06 Hz','Con tus materiales'],['ls151-6k8','7 resistencias','6 de 1 kΩ + 1 de 6.8 kΩ','0.99 Hz','Menos piezas']]){const a=document.createElement('a'),url=new URL(location.href);url.searchParams.set('montaje',v);a.href=url.href;a.className='assembly-option';a.dataset.assemblyOption=v;if(v===window.DOOR_VARIANT)a.setAttribute('aria-current','true');a.innerHTML='<span class="option-eyebrow">'+eyebrow+'</span><strong>'+title+'</strong><small>'+inventory+' · rojo ≈ '+rate+'</small><span class="option-status">'+(v===window.DOOR_VARIANT?'Seleccionado':'Elegir este montaje →')+'</span>';cards.append(a);}
  document.querySelector('.assembly-choice-head').after(cards);document.querySelector('.assembly-control').hidden=true;byId('assemblySummary').textContent='Mismo control de puerta en dos placas. El avance se guarda por separado para cada alternativa.';
 }
 const reference=document.querySelector('.clear-layout-summary');if(reference){const detail=document.createElement('details');detail.className='assembly-reference';detail.innerHTML='<summary>Distribución, conexiones entre placas y notas de montaje</summary>';detail.append(reference);document.querySelector('.resource-grid').before(detail);}
 document.body.classList.add('cable-page');stage.classList.add('cable-workbench');styleSelection();sync();
 window.doorCableWorkbench={chooseView,remember,openTools:()=>openTools(true),closeTools:()=>openTools(false),getState:()=>({active:mode==='cable',folded:prefs.folded,device:device(),positions:JSON.parse(JSON.stringify(prefs.positions)),style:{scale:prefs.width,intensity:prefs.intensity},activeView,viewKeys:Object.keys(views),toolsOpen:!tools.hidden})};
})();
