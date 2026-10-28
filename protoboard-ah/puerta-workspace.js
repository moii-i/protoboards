/* First workspace delivery: a reserved control area, side tools and view continuity.
   This controller never edits a component, an electrical connection or progress. */
(()=>{
 'use strict';
 if(!window.doorGuide||window.doorWorkspace)return;
 const $w=s=>document.querySelector(s),root=document.documentElement,stage=$w('.map-stage'),map=$w('#map'),mapbox=$w('.mapbox'),island=$w('#assemblyIsland');
 const storage='protoboards:appearance:v1';
 const defaults={theme:'paper',density:'comfortable',text:'normal',quality:'auto',effects:'system',profile:'custom'};
 const allowed={theme:['paper','night','contrast'],density:['compact','comfortable'],text:['normal','large','larger'],quality:['auto','economy','sharp'],effects:['system','full','reduced','off'],profile:['custom','study','build','present']};
 let prefs={...defaults};try{const raw=JSON.parse(localStorage.getItem(storage)||'{}');for(const key of Object.keys(allowed))if(allowed[key].includes(raw[key]))prefs[key]=raw[key];}catch{}
 let open=false,sideFrame=0,request=0,pendingMode=null,threeCache=null,twoCache=null,lastLauncher=null;
 const head=document.createElement('div');head.className='assembly-stage-head';
 const actions=document.createElement('div');actions.className='assembly-stage-actions';
 actions.innerHTML='<span>Tu espacio de montaje</span><button type="button" id="workspaceReturn" hidden>Volver al encuadre anterior</button><button type="button" id="workspacePreferences" aria-expanded="false" aria-controls="workspacePreferencesPanel">Personalizar</button>';
 head.append(island,actions);stage.prepend(head);
 const navigation=$w('#mapNav');if(navigation)actions.append(navigation);
 const viewports=document.createElement('div');viewports.className='assembly-viewports';
 const aside=document.createElement('aside');aside.className='assembly-side';aside.hidden=true;aside.setAttribute('aria-label','Herramientas junto al montaje');
 mapbox.before(viewports);viewports.append(mapbox,aside);
 const footer=document.createElement('div');footer.className='assembly-footer';const caption=$w('.canvas-caption');if(caption)footer.append(caption);stage.append(footer);
 const test=$w('.viewer-test');if(test)actions.append(test);
 const panel=document.createElement('section');panel.id='workspacePreferencesPanel';panel.className='workspace-preferences';panel.hidden=true;panel.setAttribute('aria-labelledby','workspacePreferencesTitle');
 panel.innerHTML='<div class="workspace-preferences-head"><h3 id="workspacePreferencesTitle">A tu manera</h3><button type="button" id="appearanceClose" aria-label="Cerrar personalización">×</button></div><p>Elige cómo se ve tu mesa. Tus ajustes se guardan en este navegador.</p><fieldset><legend>Un punto de partida</legend><div class="appearance-choices"><button type="button" data-profile="study" aria-pressed="false">Estudiar</button><button type="button" data-profile="build" aria-pressed="false">Montar</button><button type="button" data-profile="present" aria-pressed="false">Presentar</button></div><p class="appearance-note">Ajusta lectura, espacio y calidad; puedes cambiar cada opción después.</p></fieldset><fieldset><legend>Apariencia</legend><div class="appearance-choices"><button type="button" data-theme-choice="paper" aria-pressed="false"><i class="theme-swatch" aria-hidden="true"></i>Claro</button><button type="button" data-theme-choice="night" aria-pressed="false"><i class="theme-swatch" aria-hidden="true"></i>Oscuro</button><button type="button" data-theme-choice="contrast" aria-pressed="false"><i class="theme-swatch" aria-hidden="true"></i>Contraste</button></div><label>Texto de las instrucciones<select id="appearanceText"><option value="normal">Normal</option><option value="large">Grande</option><option value="larger">Más grande</option></select></label><label>Espacio de los controles<select id="appearanceDensity"><option value="comfortable">Cómodo</option><option value="compact">Compacto</option></select></label></fieldset><fieldset><legend>Movimiento y rendimiento</legend><label>Transiciones de la interfaz<select id="appearanceEffects"><option value="system">Seguir mi dispositivo</option><option value="full">Suaves</option><option value="reduced">Reducidas</option><option value="off">Desactivadas</option></select></label><p class="appearance-note">Las demostraciones de montaje conservan sus controles de pausa y velocidad.</p><label>Calidad del visor 3D<select id="appearanceQuality"><option value="auto">Equilibrada</option><option value="economy">Ligera</option><option value="sharp">Nítida</option></select></label><p class="appearance-note">Ligera prioriza fluidez. Nítida usa más resolución en pantallas compatibles.</p></fieldset><button type="button" id="appearanceReset">Restablecer apariencia</button><p id="appearanceSaved" role="status" aria-live="polite"></p>';
 aside.append(panel);
 const tools=['#studioInspector','.learning-placement-card','.lesson-signal-card','#studioStripInfo','#viewerTestPanel'].map(s=>$w(s)).filter(Boolean);
 for(const tool of tools)aside.append(tool);
 const sidePanels=[panel,...tools];
 function syncSide(){sideFrame=0;const visible=sidePanels.some(p=>!p.hidden);aside.hidden=!visible;viewports.classList.toggle('has-side',visible);}
 function scheduleSide(){if(!sideFrame)sideFrame=requestAnimationFrame(syncSide);}
 const hiddenObserver=new MutationObserver(scheduleSide);for(const tool of sidePanels)hiddenObserver.observe(tool,{attributes:true,attributeFilter:['hidden']});
 const reduced=matchMedia('(prefers-reduced-motion:reduce)');
 const effectiveMotion=()=>prefs.effects==='system'?(reduced.matches?'reduced':'full'):prefs.effects;
 const originalMoveCamera=moveCamera,originalScrollBehavior=scrollBehavior;
 moveCamera=function(box,animate){return originalMoveCamera(box,animate&&effectiveMotion()==='full');};
 scrollBehavior=()=>effectiveMotion()==='full'?originalScrollBehavior():'auto';
 function appearance(){return {background:prefs.theme==='night'?'#122421':prefs.theme==='contrast'?'#e8eeea':'#edf1e9',quality:prefs.quality,motion:effectiveMotion()};}
 function apply(savePrefs=true){
  root.dataset.workspaceTheme=prefs.theme;root.dataset.workspaceDensity=prefs.density;root.dataset.workspaceText=prefs.text;root.dataset.workspaceMotion=effectiveMotion();
  panel.querySelectorAll('[data-theme-choice]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.themeChoice===prefs.theme)));
  panel.querySelectorAll('[data-profile]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.profile===prefs.profile)));
  for(const [id,key]of [['appearanceText','text'],['appearanceDensity','density'],['appearanceEffects','effects'],['appearanceQuality','quality']])document.getElementById(id).value=prefs[key];
  board3d?.setAppearance?.(appearance());
  const replay=$w('.brand-replay');if(replay)replay.hidden=reduced.matches||effectiveMotion()!=='full';
  document.dispatchEvent(new CustomEvent('workspace-appearance-change',{detail:{effects:effectiveMotion()}}));
  if(savePrefs){try{localStorage.setItem(storage,JSON.stringify(prefs));$w('#appearanceSaved').textContent='Ajustes guardados.';}catch{$w('#appearanceSaved').textContent='Ajustes aplicados durante esta sesión.';}}
 }
 function setPreference(key,value){if(!allowed[key]?.includes(value))return false;prefs[key]=value;prefs.profile='custom';apply();return true;}
 const profiles={study:{density:'comfortable',text:'large',quality:'auto',effects:'system'},build:{density:'compact',text:'normal',quality:'auto',effects:'reduced'},present:{density:'comfortable',text:'large',quality:'sharp',effects:'full'}};
 function setProfile(name){if(!profiles[name])return false;Object.assign(prefs,profiles[name],{profile:name});apply();return true;}
 function togglePreferences(value,launcher=document.activeElement){open=Boolean(value);panel.hidden=!open;$w('#workspacePreferences').setAttribute('aria-expanded',String(open));syncSide();if(open){lastLauncher=launcher;$w('#appearanceClose').focus({preventScroll:true});}else if(lastLauncher?.isConnected)lastLauncher.focus({preventScroll:true});}
 $w('#workspacePreferences').onclick=()=>togglePreferences(!open,$w('#workspacePreferences'));
 $w('#appearanceClose').onclick=()=>togglePreferences(false);
 panel.querySelectorAll('[data-theme-choice]').forEach(b=>b.onclick=()=>setPreference('theme',b.dataset.themeChoice));
 panel.querySelectorAll('[data-profile]').forEach(b=>b.onclick=()=>setProfile(b.dataset.profile));
 for(const [id,key]of [['appearanceText','text'],['appearanceDensity','density'],['appearanceEffects','effects'],['appearanceQuality','quality']])document.getElementById(id).onchange=e=>setPreference(key,e.target.value);
 $w('#appearanceReset').onclick=()=>{prefs={...defaults};apply();};
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&open&&!$w('dialog[open]')){e.preventDefault();e.stopImmediatePropagation();togglePreferences(false);}},true);
 reduced.addEventListener('change',()=>apply(false));
 const readBox=()=>map.getAttribute('viewBox').trim().split(/\s+/).map(Number);
 const context=()=>JSON.stringify([step,selected,view,readBox()]);
 const validBox=b=>Array.isArray(b)&&b.length===4&&b.every(Number.isFinite)&&b[2]>0&&b[3]>0;
 const cameraDiff=(a,b)=>!a||!b||a.camera.some((v,i)=>Math.abs(v-b.camera[i])>1e-5)||a.target.some((v,i)=>Math.abs(v-b.target[i])>1e-5);
 const showReturn=()=>{$w('#workspaceReturn').hidden=!twoCache;};
 // Keep each view's camera. A deliberate pan/zoom in 3D transfers its plan area
 // back to 2D; the previous 2D framing is one explicit button away.
 const originalRenderer=setRenderer;
 setRenderer=async function(value){
  if(!['2d','3d'].includes(value)||(value===rendererMode&&!pendingMode))return;
  const serial=++request;pendingMode=value;
  if(value==='2d'&&rendererMode==='2d'){await originalRenderer(value);if(serial===request)pendingMode=null;return;}
  try{
  if(rendererMode==='2d'){
   stopCamera(true);twoCache={box:readBox(),width:map.style.width,height:map.style.height,view};
   const same=threeCache?.context===context();
   await originalRenderer(value);if(serial!==request||rendererMode!=='3d')return;
   if(same)board3d.restoreViewState?.(threeCache.state);
   board3d.setAppearance?.(appearance());threeCache={state:board3d.getViewState?.(),context:context()};showReturn();
  }else{
   const state=board3d?.getViewState?.(),changed=cameraDiff(state,threeCache?.state),box=board3d?.getPlanViewBox?.();
   await originalRenderer(value);if(serial!==request||rendererMode!=='2d')return;
   if(changed&&validBox(box)){view='focus';map.style.width='100%';map.style.height='100%';paintCamera(box);syncLoupe();}
   threeCache={state,context:context()};showReturn();
  }
  }finally{if(serial===request)pendingMode=null;}
 };
 $w('#workspaceReturn').onclick=()=>{if(!twoCache)return;view=twoCache.view;stopCamera(true);paintCamera(twoCache.box);map.style.width=twoCache.width;map.style.height=twoCache.height;board3d?.focusBox(twoCache.box,false);syncLoupe();threeCache=null;twoCache=null;showReturn();};
 // When a saved 3D view finishes its first asynchronous load, apply appearance too.
 const originalShow=showRenderer;
 showRenderer=function(...args){const result=originalShow(...args);board3d?.setAppearance?.(appearance());return result;};
 stage.classList.add('clean-workspace');syncSide();apply(false);
 window.doorWorkspace={setPreference,setProfile,open:()=>togglePreferences(true,$w('#workspacePreferences')),close:()=>togglePreferences(false),getState:()=>({preferences:{...prefs},effectiveMotion:effectiveMotion(),open,sideVisible:!aside.hidden,cached2D:twoCache?{box:[...twoCache.box],view:twoCache.view}:null,cached3D:Boolean(threeCache),renderer:rendererMode})};
})();
