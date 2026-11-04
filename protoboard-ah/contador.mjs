import {model,point,address,pulse,indicators} from './contador-modelo.mjs?v=1';
import {drawBoard} from './contador-2d.mjs?v=1';

const el=id=>document.getElementById(id);
const svg=el('board2d'),host=el('board3d'),last=model.stages.length-1;
const appearance=window.protoboardsAppearance;
const baseKey='protoboard:contador:v1';
const get=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
const set=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));}catch{}};
const newState=()=>({step:0,marked:[],completed:[],selected:null});
let profile=get(baseKey+':perfil','47')==='10'?'10':'47';
let state,board,step=0,selected=null,box=[...model.bounds],viewer=null,mode='2d',loadVersion=0;
let value=0,timer=0,resetUntil=0,animation=0,frame=0,animatedPart=null;

const cap=()=>profile==='10'?'10 µF':'4.7 µF';
const interval=()=>Math.round(.693*(10000+2*100000)*(profile==='10'?10e-6:4.7e-6)*1000);
const allItems=()=>[...board.components,...board.items.filter(i=>i.kind==='wire')];
const storage=()=>baseKey+(profile==='10'?':10uf':'');
const reduced=()=>appearance?.getState().effects!=='full';

function save(){
  state.step=step;state.selected=selected;state.total=allItems().length;
  state.completed=board.stages.flatMap((_,i)=>{const list=itemsAt(i);return list.length&&list.every(n=>state.marked.includes(n.id))?[i]:[];});
  set(storage(),state);set(baseKey+':perfil',profile);set('protoboards:last-circuit:v1',{kind:'contador'});
}

function loadProfile(){
  board=structuredClone(model);
  const c=board.items.find(i=>i.id==='P_C1');c.value=cap();c.label='C1 · '+cap();
  const part=board.components.find(i=>i.id==='C1');part.value=cap();part.name=c.label;
  const data=get(storage(),newState());
  const valid=new Set(allItems().map(i=>i.id));
  state={...newState(),...data,marked:Array.isArray(data?.marked)?[...new Set(data.marked.filter(id=>valid.has(id)))]:[]};
  step=Number.isInteger(state.step)&&state.step>=0&&state.step<=last?state.step:0;
  selected=itemsAt(step).some(i=>i.id===state.selected)?state.selected:itemsAt(step)[0]?.id||null;
  el('profile47').setAttribute('aria-pressed',String(profile==='47'));el('profile10').setAttribute('aria-pressed',String(profile==='10'));
  drawBoard(svg,board);setBox(board.bounds);save();render();
}

function itemsAt(index){return index===0?board.components:board.items.filter(i=>i.kind==='wire'&&i.stage===index);}
function current(){return allItems().find(i=>i.id===selected);}
function title(item){return item?.kind==='wire'?item.label:item?.name||'Vista del contador';}
function description(item){
  if(!item)return 'Observa el display y los LED a medida que cambia el número.';
  if(item.kind==='wire')return `Desde ${address(item.a)} hasta ${address(item.b)}.`;
  return `${item.value} · ${item.holes.slice(0,2).map(address).join(' a ')}${item.holes.length>2?' · primer par de patas':''}`;
}

function setBox(next){box=[...next];svg.setAttribute('viewBox',box.join(' '));}
function framed(item){
  if(!item)return board.bounds;
  const points=item.route||item.holes.map(point);
  const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
  const centerX=(Math.min(...xs)+Math.max(...xs))/2,centerY=(Math.min(...ys)+Math.max(...ys))/2;
  const w=Math.max(260,Math.max(...xs)-Math.min(...xs)+118),h=Math.max(220,Math.max(...ys)-Math.min(...ys)+122);
  return [centerX-w/2,centerY-h/2,w,h];
}
function focus(next=framed(current())){setBox(next);if(mode==='3d')viewer?.focusBox(next,!reduced());}

function renderSteps(){
  el('steps').replaceChildren(...board.stages.map(([name],i)=>{
    const li=document.createElement('li'),button=document.createElement('button'),number=document.createElement('span'),caption=document.createElement('span');
    button.type='button';button.dataset.step=i;
    if(i===step)button.setAttribute('aria-current','step');
    number.textContent=state.completed.includes(i)?'✓':String(i+1).padStart(2,'0');caption.textContent=name;
    button.append(number,caption);li.append(button);return li;
  }));
  const percent=Math.round(state.marked.length/allItems().length*100);
  el('progressLabel').textContent=percent+' %';el('progressMeter').value=percent;
}

function renderList(){
  const list=itemsAt(step),parent=el('assemblyList');
  const scroll=parent.scrollTop;
  el('listPanel').hidden=!list.length;
  el('listHeading').textContent=step?'Conexiones de este paso':'Piezas de este paso';
  el('listCount').textContent=list.filter(i=>state.marked.includes(i.id)).length+' / '+list.length;
  parent.replaceChildren(...list.map(item=>{
    const li=document.createElement('li'),check=document.createElement('input'),button=document.createElement('button'),detail=document.createElement('small');
    check.type='checkbox';check.checked=state.marked.includes(item.id);check.dataset.mark=item.id;check.setAttribute('aria-label','Marcar '+title(item));
    button.type='button';button.dataset.select=item.id;button.textContent=title(item);
    if(item.id===selected)button.setAttribute('aria-current','true');
    detail.textContent=description(item);button.append(detail);li.append(check,button);return li;
  }));
  parent.scrollTop=scroll;
}

function renderBoard(){
  const active=current();
  for(const group of svg.querySelectorAll('[data-wire]')){
    const wire=board.items.find(i=>i.id===group.dataset.wire);
    const visible=step===last||wire.stage<=step;
    group.style.display=visible?'':'none';group.classList.toggle('is-selected',wire.id===selected);
    group.classList.toggle('is-muted',step!==last&&wire.stage!==step);
  }
  for(const group of svg.querySelectorAll('[data-part]'))group.classList.toggle('is-selected',group.dataset.part===selected);
  const ends=active?.kind==='wire'?[active.a,active.b]:active?.holes||[];
  el('counterMarkers').innerHTML=ends.map((h,i)=>{
    const [x,y]=point(h);return `<circle cx="${x}" cy="${y}" r="${ends.length>2?9:12}" fill="none" stroke="${i?'#405bc6':'#007e61'}" stroke-width="3.4" vector-effect="non-scaling-stroke"/>`;
  }).join('');
  update3d();
  paintDemo();
}

function render(){
  const item=current(),[name,hint]=board.stages[step];
  el('stageIndex').textContent=`Paso ${step+1} de ${board.stages.length}`;el('stageTitle').textContent=name;el('stageHint').textContent=hint;
  el('previous').disabled=step===0;el('next').disabled=step===last;el('demo').hidden=step!==last;
  el('selectionKind').textContent=item?.kind==='wire'?'Jumper seleccionado':item?'Pieza seleccionada':'Prueba funcional';
  el('selectedLabel').textContent=title(item);el('selectedDetail').textContent=description(item);
  el('playPlacement').disabled=!item;el('playPlacement').textContent=item?.kind==='wire'?'Reproducir cable':'Ver colocación';
  el('markItem').disabled=!item;const done=state.marked.includes(selected);
  el('markItem').setAttribute('aria-pressed',String(done));el('markItem').textContent=done?'✓ Hecho':'Marcar hecho';
  renderSteps();renderList();renderBoard();
}

function select(id,{center=false,refocus=false}={}){
  const item=allItems().find(i=>i.id===id);if(!item)return;
  stopPlacement();const index=item.kind==='wire'?item.stage:0;
  if(index!==step&&step!==last){step=index;stopDemo();}
  selected=item.id;save();render();
  if(center)focus();
  if(refocus)el('assemblyList').querySelector(`[data-select="${id}"]`)?.focus();
}

function go(index){
  if(index<0||index>last)return;
  stopPlacement();stopDemo();step=index;selected=itemsAt(step)[0]?.id||null;save();render();focus(board.bounds);
  el('steps').querySelector('[aria-current=step]')?.scrollIntoView({block:'nearest',inline:'nearest'});
}

function mark(id,done){
  if(!allItems().some(i=>i.id===id))return;
  state.marked=done?[...new Set([...state.marked,id])]:state.marked.filter(x=>x!==id);save();render();
}

function update3d(){
  if(!viewer||mode!=='3d')return;
  const active=current(),part=active&&board.items.find(i=>i.partId===active.id);
  viewer.update({step,previous:true,selected:active?.kind==='wire'?active.id:part?.id||null,animate:!reduced(),cableFocus:true,clarity:true,studio:active&&board.chips.some(c=>c.id===active.id)?{chip:active.id,related:[]}:null,...(step===last?indicators(value):{})});
}

function applyAppearance(){
  const a=appearance?.getState();
  if(!a)return;
  const background={paper:'#e8eee9',night:'#25322c',contrast:'#e1e8e0'}[a.preferences.theme];
  viewer?.setAppearance({quality:a.preferences.quality,background,motion:a.effects});
  if(a.effects!=='full')stopPlacement();
}

async function changeMode(next){
  const version=++loadVersion;stopPlacement();
  const status=el('viewerStatus');
  if(next==='3d'&&!viewer){
    status.hidden=false;status.textContent='Preparando el visor 3D…';
    try{
      const {createViewer}=await import('./visor-puerta-3d.js?v=contador-v1');
      if(version!==loadVersion)return;
      host.hidden=false;
      viewer=createViewer({container:host,model:board,point,hole:address,onConnection:id=>{
        const part=board.items.find(i=>i.id===id);if(part)select(part.partId||part.id);
      },onChip:select,onPin:(id,p)=>{select(id);const c=board.chips.find(c=>c.id===id);if(c)el('selectedDetail').textContent=`Pin ${p} · ${c.nets[p-1]||'Sin conexión en esta práctica'}`;},onSwitch:()=>{},onFailure:()=>{viewer?.dispose();viewer=null;changeMode('2d');status.hidden=false;status.textContent='El visor 3D se interrumpió. Puedes continuar en 2D.';}});
    }catch{
      host.replaceChildren();host.hidden=true;status.hidden=false;status.textContent='El visor 3D no está disponible en este navegador. Puedes continuar en 2D.';return;
    }
  }
  mode=next;status.hidden=true;svg.toggleAttribute('hidden',next==='3d');host.hidden=next!=='3d';viewer?.setActive(next==='3d');
  el('mode2d').setAttribute('aria-pressed',String(next==='2d'));el('mode3d').setAttribute('aria-pressed',String(next==='3d'));
  if(next==='3d'){applyAppearance();update3d();viewer.focusBox(box,false);}
}

function stopPlacement(){
  cancelAnimationFrame(animation);animation=0;frame=0;
  if(animatedPart){for(const node of animatedPart.querySelectorAll('path')){node.style.strokeDasharray='';node.style.strokeDashoffset='';}animatedPart.style.translate='';animatedPart.style.opacity='';animatedPart=null;}
  viewer?.setAssembly(null);viewer?.setPlacement(null);
}

function replayPlacement(){
  const item=current();if(!item)return;stopPlacement();focus();if(reduced())return;
  const wire=item.kind==='wire';
  if(mode==='2d')animatedPart=svg.querySelector(`[data-${wire?'wire':'part'}="${item.id}"]`);
  const started=performance.now(),paths=wire&&animatedPart?[...animatedPart.querySelectorAll('path')]:[],length=paths[0]?.getTotalLength()||0;
  function animate(now){
    frame=Math.min(1,(now-started)/(wire?2200:1350));
    if(mode==='3d'){if(wire)viewer.setAssembly({id:item.id,progress:frame});else viewer.setPlacement({id:item.id,progress:frame});}
    else if(wire){for(const path of paths){path.style.strokeDasharray=String(length);path.style.strokeDashoffset=String(length*(1-frame));}}
    else if(animatedPart){animatedPart.style.translate=`0 ${-(1-frame)*24}px`;animatedPart.style.opacity=String(.3+.7*frame);}
    if(frame<1)animation=requestAnimationFrame(animate);else stopPlacement();
  }
  animation=requestAnimationFrame(animate);
}

function paintDemo(){
  const active=step===last,signals=active?indicators(value):{leds:{},segments:{DS1:{}}};
  for(const n of svg.querySelectorAll('[data-segment]'))n.classList.toggle('is-lit',Boolean(signals.segments.DS1[n.dataset.segment]));
  for(const n of svg.querySelectorAll('[data-led]'))n.classList.toggle('is-lit',Boolean(signals.leds[n.dataset.led]));
  if(!active)return;
  el('digit').value=String(value);
  el('bits').innerHTML=[8,4,2,1].map(bit=>`<span class="counter-bit" data-on="${Boolean(value&bit)}"><small>${bit}</small><b>${value&bit?1:0}</b></span>`).join('');
  el('demoState').textContent=resetUntil?'9 → 0 · la NAND activó BORRA_N':timer?`Reloj activo · ${cap()} · ${(interval()/1000).toLocaleString('es-MX')} s por pulso`:'Pulso detenido';
  el('run').setAttribute('aria-pressed',String(Boolean(timer)));el('run').textContent=timer?'Pausar reloj':'Iniciar reloj';
  if(mode==='3d')viewer?.setIndicators(signals);
}

function tick(){
  const next=pulse(value);value=next.value;clearTimeout(resetUntil);resetUntil=0;
  if(next.reset)resetUntil=setTimeout(()=>{resetUntil=0;paintDemo();},Math.min(520,interval()*.75));
  paintDemo();
}
function stopDemo(){clearInterval(timer);timer=0;clearTimeout(resetUntil);resetUntil=0;}

el('steps').addEventListener('click',e=>{const button=e.target.closest('[data-step]');if(button){go(Number(button.dataset.step));el('steps').querySelector('[aria-current=step]')?.focus({preventScroll:true});}});
el('previous').onclick=()=>go(step-1);el('next').onclick=()=>go(step+1);
el('assemblyList').addEventListener('click',e=>{const b=e.target.closest('[data-select]');if(b)select(b.dataset.select,{refocus:true});});
el('assemblyList').addEventListener('change',e=>{if(e.target.dataset.mark){const id=e.target.dataset.mark;mark(id,e.target.checked);el('assemblyList').querySelector(`[data-mark="${id}"]`)?.focus();}});
el('markItem').onclick=()=>{if(selected)mark(selected,!state.marked.includes(selected));};
el('playPlacement').onclick=replayPlacement;
el('mode2d').onclick=()=>changeMode('2d');el('mode3d').onclick=()=>changeMode('3d');
el('focus').onclick=()=>focus();el('fit').onclick=()=>focus(board.bounds);
el('zoom').onclick=()=>{if(mode==='3d')viewer?.zoom();else zoom(1.3);};
function toggleExpanded(){const expanded=document.body.classList.toggle('counter-expanded');el('expand').setAttribute('aria-pressed',String(expanded));el('expand').setAttribute('aria-label',expanded?'Cerrar visor ampliado':'Ampliar visor');}
el('expand').onclick=toggleExpanded;
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('counter-expanded'))toggleExpanded();});

el('run').onclick=()=>{if(timer)stopDemo();else timer=setInterval(tick,interval());paintDemo();};
el('pulse').onclick=()=>{stopDemo();tick();};
el('reset').onclick=()=>{stopDemo();value=0;paintDemo();};
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopDemo();paintDemo();}});
function switchProfile(next){
  if(next===profile)return;
  stopDemo();stopPlacement();loadVersion++;const lastMode=mode;viewer?.dispose();viewer=null;host.replaceChildren();profile=next;value=0;
  loadProfile();changeMode(lastMode);
}
el('profile47').onclick=()=>switchProfile('47');el('profile10').onclick=()=>switchProfile('10');
document.addEventListener('workspace-appearance-change',applyAppearance);

function zoom(scale){
  const [x,y,w,h]=box,nw=w/scale,nh=h/scale;
  if(nw<135||nw>board.bounds[2]*1.7)return;
  setBox([x+(w-nw)/2,y+(h-nh)/2,nw,nh]);
}
let drag=null,moved=false;
svg.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?1.16:1/1.16);},{passive:false});
svg.addEventListener('pointerdown',e=>{drag={id:e.pointerId,x:e.clientX,y:e.clientY,box:[...box]};moved=false;});
svg.addEventListener('pointermove',e=>{
  if(drag?.id!==e.pointerId)return;
  const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)<6&&!moved)return;
  if(!moved)svg.setPointerCapture(e.pointerId);moved=true;
  const [x,y,w,h]=drag.box,scale=Math.max(w/svg.clientWidth,h/svg.clientHeight);setBox([x-dx*scale,y-dy*scale,w,h]);
});
for(const event of ['pointerup','pointercancel','lostpointercapture'])svg.addEventListener(event,()=>{drag=null;});
function selectFromMap(e){const group=e.target.closest('[data-wire],[data-part]');if(group)select(group.dataset.wire||group.dataset.part);}
svg.addEventListener('click',e=>{if(!moved)selectFromMap(e);});
svg.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectFromMap(e);}});

loadProfile();
