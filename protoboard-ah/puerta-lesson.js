(function lessonController(){
'use strict';if(!window.doorLearning||window.doorLesson)return;
const byId=id=>document.getElementById(id),ns='http://www.w3.org/2000/svg',map=byId('map'),stage=map.closest('.map-stage');
let enabled=false,chosen='M',lastStamp='',signalLayer=null;
const wireGroups=new Map();for(const it of model.items.filter(x=>x.kind==='wire')){const key=it.signal||it.net;if(!wireGroups.has(key))wireGroups.set(key,[]);wireGroups.get(key).push(it);}
const aliases=model.assemblyVariant.startsWith('ls151')?{M:'M',STOP:'STOP',NY:'NY',PA:'PA',PC:'PC',ABRIR:'ABRIR',CERRAR:'CERRAR'}:{M:'M',STOP:'S',PA:'P_A',PC:'P_C',ABRIR:'A',CERRAR:'C'};
for(const k of ['MA','MC'])if(wireGroups.has(k))aliases[k]=k;
const labels={M:'Movimiento habilitado',STOP:'Prioridad de parada',NY:'Retorno del LED amarillo',PA:'Permiso para abrir',PC:'Permiso para cerrar',ABRIR:'Mando de apertura',CERRAR:'Mando de cierre',MA:'Movimiento de apertura',MC:'Movimiento de cierre'};
const signalButton=document.createElement('button');signalButton.type='button';signalButton.id='lessonSignals';signalButton.textContent='Señales';signalButton.setAttribute('aria-pressed','false');
const pdfLink=document.createElement('a');pdfLink.id='lessonPdf';pdfLink.className='lesson-pdf-link';pdfLink.textContent='PDF del montaje';pdfLink.href='./montaje-'+window.DOOR_VARIANT+'.pdf';pdfLink.download='Protoboards-'+window.DOOR_VARIANT+'.pdf';
document.querySelector('.studio-toolbar').append(signalButton,pdfLink);
const toolsFooter=document.createElement('div');toolsFooter.className='lesson-tools-footer';toolsFooter.innerHTML='<button type="button" id="lessonToolsSignals">Explorar señales</button><a href="'+pdfLink.href+'" download="'+pdfLink.download+'">Descargar PDF de esta variante</a>';byId('learningDialog').appendChild(toolsFooter);
byId('lessonToolsSignals').onclick=()=>{doorLearning.close();enableSignals(true);};
const card=document.createElement('section');card.className='lesson-signal-card';card.id='lessonSignalCard';card.hidden=true;card.setAttribute('aria-label','Señales lógicas de la prueba');
card.innerHTML='<div class="learning-card-head"><strong>Señales lógicas</strong><button type="button" id="lessonSignalsClose" aria-label="Cerrar señales">×</button></div><div class="lesson-signal-body"><label for="lessonSignal">Explorar señal</label><select id="lessonSignal">'+Object.keys(aliases).filter(k=>wireGroups.has(aliases[k])).map(k=>'<option value="'+k+'">'+k+' · '+labels[k]+'</option>').join('')+'</select><div class="lesson-value-line"><strong id="lessonValue">—</strong><span id="lessonSignalName">M</span><span id="lessonStatus"></span></div><p id="lessonExplanation"></p><div class="lesson-command-row">'+[['abrir','Abrir'],['cerrar','Cerrar'],['stop','STOP']].map(([key,label])=>'<button type="button" data-lesson-door="'+key+'" aria-pressed="false">'+label+'</button>').join('')+'</div><div class="lesson-command-row">'+[['fca','Final abierto'],['fcc','Final cerrado'],['reset','Reiniciar']].map(([key,label])=>'<button type="button" data-lesson-door="'+key+'">'+label+'</button>').join('')+'</div><div class="lesson-signal-actions"><button type="button" id="lessonPower">Encender prueba</button><button type="button" id="lessonRoute">Ver recorrido</button></div><p class="lesson-signal-note">Representación lógica, no medición eléctrica. Conserva el mando durante STOP y desactívalo antes de invertir.</p></div>';
stage.appendChild(card);
function values(){return DoorSignalLogic.evaluate(door,power);}
function signalSnapshot(){
 if(!enabled||!power||step!==LAST)return null;
 const raw=aliases[chosen],ids=(wireGroups.get(raw)||[]).map(it=>it.id);return {active:true,name:chosen,raw,value:values()[chosen],ids};
}
function explain(name,v){
 if(!power)return 'La prueba está apagada. Enciéndela para ver los estados lógicos.';
 if(step!==LAST)return 'Las señales se muestran durante la prueba del circuito completo.';
 if(name==='M'){if(v===1)return 'M=1: hay una sola orden válida y su final de carrera permite avanzar. El motor está habilitado.';if(door.stop)return 'STOP=1 fuerza M=0: el motor se detiene aunque el mando siga enclavado.';if(door.abrir&&door.cerrar)return 'Los dos mandos están activos: M=0 impide órdenes simultáneas de movimiento.';if(door.abrir&&door.fca||door.cerrar&&door.fcc)return 'El final de carrera del sentido solicitado está alcanzado: M=0 detiene el motor.';return 'Sin una orden válida, M=0 mantiene el motor detenido.';}
 if(name==='STOP')return v?'STOP=1 bloquea el movimiento, muestra SP y habilita el parpadeo rojo. La dirección pendiente permanece en el mando enclavado.':'STOP=0 permite evaluar las órdenes y los finales de carrera.';
 if(name==='NY')return v?'NY=1: el retorno del amarillo está alto y el LED queda apagado.':'NY=0: el retorno del amarillo está bajo; durante el movimiento el LED puede encenderse a través de su resistencia.';
 if(name==='PA'||name==='PC')return v?'Permiso=1: este final está libre; permite avanzar en su sentido si existe una orden válida.':'Permiso=0: el final está alcanzado e impide seguir avanzando en ese sentido.';
 if(name==='ABRIR'||name==='CERRAR')return v?'El mando está enclavado. Conserva esta posición durante STOP para reanudar.':'El mando está desactivado.';
 return v?'Este sentido tiene una orden válida y permiso para moverse.':'Este sentido no está habilitado.';
}
function paintSignalMap(snapshot){
 if(!signalLayer){signalLayer=document.createElementNS(ns,'g');signalLayer.id='lesson-signal-paths';signalLayer.setAttribute('pointer-events','none');byId('scene').appendChild(signalLayer);}
 signalLayer.innerHTML='';map.classList.toggle('lesson-signals',Boolean(snapshot));
 map.querySelectorAll('.lesson-signal-related').forEach(n=>n.classList.remove('lesson-signal-related'));
 if(!snapshot)return;
 for(const id of snapshot.ids){const it=model.items.find(i=>i.id===id),group=map.querySelector('.connection[data-id="'+id+'"]');group?.classList.add('lesson-signal-related');const g=document.createElementNS(ns,'g');g.dataset.signalWire=id;for(const [color,width]of [['#d5ab43',8],[it.color||'#187d70',3]]){const p=document.createElementNS(ns,'path');p.setAttribute('d',roundedRoute(wireRoute(it)));p.setAttribute('fill','none');p.setAttribute('stroke',color);p.setAttribute('stroke-width',width);p.setAttribute('stroke-linejoin','round');p.setAttribute('stroke-linecap','round');p.setAttribute('vector-effect','non-scaling-stroke');g.appendChild(p);}g.style.opacity=snapshot.value===1?'.95':'.55';signalLayer.appendChild(g);}
}
function refreshSignals(force=false){
 if(enabled&&step!==LAST){enabled=false;signalButton.setAttribute('aria-pressed','false');card.hidden=true;}
 const snapshot=signalSnapshot(),v=values(),stamp=JSON.stringify([enabled,chosen,power,step,door.abrir,door.cerrar,door.stop,door.fca,door.fcc,doorMessage]);
 if(force||stamp!==lastStamp){
  lastStamp=stamp;const shown=enabled&&power&&step===LAST?v[chosen]:null;byId('lessonValue').textContent=shown===null?'—':String(shown);byId('lessonValue').dataset.level=shown===null?'off':String(shown);
  byId('lessonSignalName').textContent=chosen+(aliases[chosen]!==chosen?' · '+aliases[chosen]:'');byId('lessonStatus').textContent=!power?'Prueba apagada':step!==LAST?'Fuera de la prueba':doorMessage;
  byId('lessonExplanation').textContent=explain(chosen,shown);byId('lessonPower').textContent=power?'Apagar prueba':'Encender prueba';
  card.querySelectorAll('[data-lesson-door]').forEach(b=>{if(b.dataset.lessonDoor!=='reset')b.setAttribute('aria-pressed',String(door[b.dataset.lessonDoor]));});
  paintSignalMap(snapshot);board3d?.setSignals?.(snapshot);
 }
}
function enableSignals(value){
 enabled=Boolean(value);signalButton.setAttribute('aria-pressed',String(enabled));card.hidden=!enabled;
 if(enabled){doorLearning.cancel();doorStudio.cancel();doorStudio.closeInspector();selectStep(LAST,false,{guided:false});byId('cumulative').checked=true;selected=null;visibility();showDetail();view='all';setCamera();if(!document.body.classList.contains('fullscreen'))stage.scrollIntoView({block:'center',behavior:scrollBehavior()});}
 refreshSignals(true);
}
signalButton.onclick=()=>enableSignals(!enabled);byId('lessonSignalsClose').onclick=()=>enableSignals(false);
byId('lessonSignal').onchange=event=>{chosen=event.target.value;refreshSignals(true);};
byId('lessonPower').onclick=()=>{if(step!==LAST)selectStep(LAST,false,{guided:false});togglePower();refreshSignals();};
byId('lessonRoute').onclick=()=>{const wires=wireGroups.get(aliases[chosen])||[];view='focus';setCamera(fitPoints(wires,100));};
card.querySelectorAll('[data-lesson-door]').forEach(b=>b.onclick=()=>document.querySelector('[data-door="'+b.dataset.lessonDoor+'"]')?.click());
const oldPaint=paintLEDs;paintLEDs=function(...args){const result=oldPaint(...args);if(enabled)refreshSignals();return result;};
const oldSnapshot=doorStudio.snapshot;doorStudio.snapshot=()=>({...oldSnapshot(),signals:signalSnapshot()});
const oldVisibility=visibility;visibility=function(...args){const r=oldVisibility(...args);if(enabled)refreshSignals(true);return r;};
const oldRenderer=showRenderer;showRenderer=function(...args){const r=oldRenderer(...args);if(enabled)refreshSignals(true);return r;};
const movable=new Map();
function installMovable(target,key){
 const header=target.querySelector('.learning-card-head');if(!header)return;
 const tools=document.createElement('span');tools.className='lesson-card-tools';tools.innerHTML='<button type="button" data-card-move aria-label="Mover tarjeta; usa arrastre o flechas" title="Arrastra para mover; también puedes usar las flechas">⠿</button><button type="button" data-card-fold aria-label="Plegar tarjeta" aria-expanded="true">−</button><button type="button" data-card-reset aria-label="Restablecer posición" title="Restablecer posición">↺</button>';header.insertBefore(tools,header.lastElementChild);
 let drag=null,prefs={},device='';const storageKey='protoboard:cards:'+key+':v1';
 try{prefs=JSON.parse(localStorage.getItem(storageKey)||'{}')||{};}catch{}
 const mode=()=>innerWidth<=720?'mobile':'desktop',settings=()=>prefs[mode()]||(prefs[mode()]={collapsed:false,x:null,y:null});
 const save=()=>{try{localStorage.setItem(storageKey,JSON.stringify(prefs));}catch{}};
 function limits(){const s=stage.getBoundingClientRect(),r=target.getBoundingClientRect(),minY=document.body.classList.contains('fullscreen')?(parseFloat(stage.style.getPropertyValue('--assembly-island-space'))||150)+6:8;return {s,r,minX:8,minY,maxX:Math.max(8,s.width-r.width-8),maxY:Math.max(minY,s.height-r.height-8)};}
 function setPosition(x,y,persist=false){const l=limits(),px=Math.max(l.minX,Math.min(l.maxX,x)),py=Math.max(l.minY,Math.min(l.maxY,y)),p=settings();target.classList.add('lesson-positioned');target.style.setProperty('--card-left',px+'px');target.style.setProperty('--card-top',py+'px');p.x=l.maxX===l.minX?0:(px-l.minX)/(l.maxX-l.minX);p.y=l.maxY===l.minY?0:(py-l.minY)/(l.maxY-l.minY);if(persist)save();}
 function layout(){
  if(target.hidden)return;device=mode();const p=settings();target.classList.toggle('lesson-card-folded',Boolean(p.collapsed));tools.querySelector('[data-card-fold]').setAttribute('aria-expanded',String(!p.collapsed));tools.querySelector('[data-card-fold]').textContent=p.collapsed?'+':'−';tools.querySelector('[data-card-fold]').setAttribute('aria-label',p.collapsed?'Desplegar tarjeta':'Plegar tarjeta');
  if(Number.isFinite(p.x)&&Number.isFinite(p.y)){const l=limits();setPosition(l.minX+p.x*(l.maxX-l.minX),l.minY+p.y*(l.maxY-l.minY));}else target.classList.remove('lesson-positioned');
 }
 const handle=tools.querySelector('[data-card-move]');handle.onpointerdown=event=>{if(event.button!==0)return;event.preventDefault();event.stopPropagation();const l=limits();drag={pointer:event.pointerId,x:event.clientX,y:event.clientY,left:l.r.left-l.s.left,top:l.r.top-l.s.top};handle.setPointerCapture(event.pointerId);target.classList.add('lesson-card-dragging');};
 handle.onpointermove=event=>{if(!drag||drag.pointer!==event.pointerId)return;event.preventDefault();setPosition(drag.left+event.clientX-drag.x,drag.top+event.clientY-drag.y);};
 function finishDrag(event){if(!drag)return;if(handle.hasPointerCapture?.(event.pointerId))handle.releasePointerCapture(event.pointerId);drag=null;target.classList.remove('lesson-card-dragging');save();}
 handle.onpointerup=finishDrag;handle.onpointercancel=finishDrag;
 handle.onkeydown=event=>{if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();event.stopPropagation();const l=limits(),amount=event.shiftKey?40:10;setPosition(l.r.left-l.s.left+(event.key==='ArrowLeft'?-amount:event.key==='ArrowRight'?amount:0),l.r.top-l.s.top+(event.key==='ArrowUp'?-amount:event.key==='ArrowDown'?amount:0),true);};
 tools.querySelector('[data-card-fold]').onclick=()=>{const p=settings();p.collapsed=!p.collapsed;save();layout();};
 tools.querySelector('[data-card-reset]').onclick=()=>{Object.assign(settings(),{x:null,y:null});save();target.classList.remove('lesson-positioned');target.style.removeProperty('--card-left');target.style.removeProperty('--card-top');};
 const observer=new ResizeObserver(()=>{if(!drag)layout();});observer.observe(stage);observer.observe(target);
 const hiddenObserver=new MutationObserver(()=>layout());hiddenObserver.observe(target,{attributes:true,attributeFilter:['hidden']});
 window.addEventListener('resize',()=>{if(device!==mode())layout();});movable.set(key,{layout,target});layout();
}
installMovable(document.querySelector('.learning-placement-card'),'placement');installMovable(card,'signals');
window.doorLesson={enable:enableSignals,select(name){if(!aliases[name]||!wireGroups.has(aliases[name]))return false;chosen=name;byId('lessonSignal').value=name;refreshSignals(true);return true;},refresh:()=>refreshSignals(true),getState:()=>({enabled,chosen,signals:values(),snapshot:signalSnapshot(),pdf:pdfLink.getAttribute('href')})};
refreshSignals();
})();