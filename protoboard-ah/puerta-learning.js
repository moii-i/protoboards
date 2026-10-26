(function learningController(){
'use strict';
if(!window.doorStudio||window.doorLearning)return;
const el=id=>document.getElementById(id),ns='http://www.w3.org/2000/svg',map=el('map'),stage=map.closest('.map-stage');
const normalize=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const chipHoles=c=>Array.from({length:c.pins},(_,i)=>{const p=i+1;return [c.board,p>c.pins/2?'e':'f',c.start+(p>c.pins/2?c.pins-p:p-1)];});
const catalog=[
 ...model.chips.map(c=>({id:c.id,label:c.label,kind:'chip',stage:0,holes:chipHoles(c),selector:'[data-chip="'+c.id+'"]',note:'Cruza la ranura central. Muesca a la izquierda; pata 1 en la fila f. Confirma la orientación antes de insertar.'})),
 ...model.displays.map(d=>({id:d.id,label:'Display de 7 segmentos',kind:'display',stage:0,holes:Object.values(d.pins),selector:'[data-placement-id="'+d.id+'"]',note:'Respeta las dos filas de patas y el pinout de tu display. La vista indica los agujeros de este montaje; confirma el tipo de común.'})),
 ...(model.arrays||[]).map(a=>({id:a.id,label:'Red de resistencias',kind:'array',stage:0,holes:Object.values(a.pinHoles),selector:'[data-placement-id="'+a.id+'"]',note:'El punto identifica la pata común. Conecta COM al nodo indicado en esta variante.'})),
 ...model.items.filter(it=>['res','cap','led','pot'].includes(it.kind)).map(it=>({id:it.partId||it.id,label:it.label.replace(/^Coloca\s+/i,''),kind:it.kind,stage:it.stage,item:it,holes:[it.a,it.b],selector:'.connection[data-id="'+it.id+'"]',note:it.kind==='res'?'No tiene polaridad. Una pata en cada agujero resaltado; conserva el valor indicado.':it.kind==='led'?'Ánodo (+) en el primer agujero; cátodo (−) en el segundo. Comprueba la cara plana y el pinout de tu LED.':it.polarized?'Capacitor polarizado: positivo en el primer agujero; la franja negativa corresponde al segundo.':it.kind==='cap'?'Capacitor sin polaridad. Comprueba su valor y coloca una pata en cada agujero.':'Respeta la función de cada terminal según la guía.'}))
];
const originals={selectCable,selectStep,animateSelection,synchronizeMotion,snapshot:doorStudio.snapshot,inspect:doorStudio.inspect};
let placement=null,placementFrame=0,placementTime=0,placementNode=null,ghost=null,guideLayer=null,internal=false,lastPlacementPhase='',lastLauncher=null,tab='search';
const reviewKey=stateKey+':reviews:v1';let reviews={};try{reviews=JSON.parse(localStorage.getItem(reviewKey)||'{}')||{};}catch{}
const button=document.createElement('button');button.type='button';button.id='learningOpen';button.textContent='Buscar / piezas';button.setAttribute('aria-haspopup','dialog');button.title='Buscar componente, pata, señal o cable (Ctrl+K)';document.querySelector('.studio-toolbar').prepend(button);
const islandButton=document.createElement('button');islandButton.type='button';islandButton.className='learning-island-open';islandButton.setAttribute('aria-label','Buscar, colocar piezas y revisar bloque');islandButton.title='Buscar y herramientas (Ctrl+K)';islandButton.innerHTML='<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="2"/><path d="m15 15 6 6" stroke="currentColor" stroke-width="2"/></svg>';el('studioMore').before(islandButton);
const checkButton=document.createElement('button');checkButton.type='button';checkButton.id='learningReviewOpen';checkButton.textContent='Revisar bloque';document.querySelector('.check-stage').appendChild(checkButton);
const dialog=document.createElement('dialog');dialog.id='learningDialog';dialog.className='learning-dialog';dialog.setAttribute('aria-labelledby','learningTitle');
dialog.innerHTML='<div class="learning-head"><div><small>TALLER DE MONTAJE</small><h2 id="learningTitle">Encuentra y prepara tu conexión</h2></div><button type="button" data-learning-close aria-label="Cerrar herramientas">×</button></div><div class="learning-tabs" role="tablist" aria-label="Herramientas de montaje"><button role="tab" id="learnTabSearch" data-learn-tab="search" aria-controls="learnSearch">Buscar</button><button role="tab" id="learnTabPieces" data-learn-tab="pieces" aria-controls="learnPieces">Colocar piezas</button><button role="tab" id="learnTabReview" data-learn-tab="review" aria-controls="learnReview">Revisar bloque</button></div><section id="learnSearch" role="tabpanel" aria-labelledby="learnTabSearch"><label class="learning-search-label" for="learnQuery">Componente, pata, señal o cable</label><input id="learnQuery" type="search" placeholder="Ej.: NE555, U1.11, STOP, W001…" autocomplete="off" aria-controls="learnResults"><div class="learning-examples"></div><p id="learnResultCount" class="learning-muted" role="status"></p><div id="learnResults" class="learning-results"></div></section><section id="learnPieces" role="tabpanel" aria-labelledby="learnTabPieces" hidden><label class="learning-search-label" for="learnComponent">Elige una pieza del montaje</label><select id="learnComponent"></select><p id="learnComponentNote"></p><p class="learning-muted">Los anillos indican los agujeros; el ámbar destaca la primera pata. Comprueba la orientación con las fuentes desconectadas.</p><button type="button" id="learnPlace">Ver colocación</button></section><section id="learnReview" role="tabpanel" aria-labelledby="learnTabReview" hidden></section>';
stage.appendChild(dialog);
const card=document.createElement('section');card.className='learning-placement-card';card.hidden=true;card.setAttribute('aria-label','Colocación de componente');
card.innerHTML='<div class="learning-card-head"><strong id="learnPlacementName"></strong><button type="button" id="learnPlacementClose" aria-label="Cerrar colocación">×</button></div><p id="learnPlacementNote"></p><p id="learnPlacementHoles" class="learning-muted"></p><p id="learnPlacementPhase" role="status"></p><div class="learning-placement-actions"><button type="button" id="learnReplay">Repetir</button><button type="button" id="learnPause">Pausar</button><button type="button" id="learnNextPart">Siguiente pieza →</button></div>';
stage.appendChild(card);
function closeDialog(){if(dialog.open)dialog.close();else dialog.hidden=true;}
function openDialog(which='search',launcher=document.activeElement){
 lastLauncher=launcher;if(placement?.playing)pausePlacement();if(doorStudio.getState().animation?.playing)doorStudio.pause();
 showTab(which);if(!dialog.open)dialog.showModal();requestAnimationFrame(()=>{if(which==='search'){el('learnQuery').focus();el('learnQuery').select();}else if(which==='pieces')el('learnComponent').focus();else el('learnReview').querySelector('input,button')?.focus();});
}
function showTab(which){
 tab=which;for(const name of ['search','pieces','review']){const active=name===which;el('learn'+name[0].toUpperCase()+name.slice(1)).hidden=!active;const b=dialog.querySelector('[data-learn-tab="'+name+'"]');b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;}
 if(which==='search')renderSearch();if(which==='review')renderReview();
}
button.onclick=()=>openDialog('search',button);islandButton.onclick=()=>openDialog('search',islandButton);checkButton.onclick=()=>openDialog('review',checkButton);
dialog.querySelector('[data-learning-close]').onclick=closeDialog;dialog.addEventListener('close',()=>lastLauncher?.isConnected&&lastLauncher.focus({preventScroll:true}));
dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog();});
dialog.querySelectorAll('[data-learn-tab]').forEach(b=>{b.onclick=()=>showTab(b.dataset.learnTab);b.onkeydown=event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const names=['search','pieces','review'],i=names.indexOf(tab),n=event.key==='Home'?0:event.key==='End'?2:(i+(event.key==='ArrowRight'?1:2))%3;showTab(names[n]);dialog.querySelector('[data-learn-tab="'+names[n]+'"]').focus();}};});
document.addEventListener('keydown',event=>{
 const editing=event.target.closest?.('input,textarea,select,[contenteditable=true]');
 if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'||event.key==='/'&&!editing){event.preventDefault();openDialog('search');}
 if(event.key==='Escape'&&dialog.open){event.preventDefault();event.stopImmediatePropagation();closeDialog();}
},true);
const index=[];
for(const c of catalog){
 index.push({key:'component:'+c.id,type:'component',owner:c,title:c.id+' · '+c.label,detail:'Pieza · '+(c.holes[0]?.[0]||'')+' · ver colocación',text:normalize(c.id+' '+c.label+' '+c.kind)});
 if(['chip','display','array'].includes(c.kind))c.holes.forEach((h,i)=>{const p=i+1,fn=model.pinNames?.[c.id]?.[p]||hole(h);index.push({key:'pin:'+c.id+'.'+p,type:'pin',owner:c,pin:p,title:c.id+' · pata '+p+' · '+fn,detail:hole(h)+' · '+c.label,text:normalize(c.id+' '+c.label+' pata '+p+' pin '+p+' '+fn+' '+hole(h))});});
}
for(const it of model.items)index.push({key:'wire:'+it.id,type:'wire',item:it,title:it.id+' · '+it.label,detail:(it.kind==='link'?'Misma tira':'Conexión')+' · '+hole(it.a)+' → '+hole(it.b),text:normalize([it.id,it.label,it.partId,it.signal,it.net,it.fromRef,it.toRef,hole(it.a),hole(it.b)].filter(Boolean).join(' '))});
const signals=new Map();for(const it of model.items.filter(it=>it.kind==='wire')){const name=it.signal||it.net;if(!name||['Signal','Part'].includes(name))continue;if(!signals.has(name))signals.set(name,[]);signals.get(name).push(it);}
for(const [name,wires]of signals)index.push({key:'signal:'+name,type:'signal',title:'Señal '+name,detail:wires.length+' conexiones · ver primera conexión',text:normalize('señal '+name),item:wires[0],name});
function find(query){
 const q=normalize(query);if(!q)return index.filter(r=>r.type==='component').slice(0,8);
 const pinMatch=q.match(/^(.*?)\s+(?:pata|pin)\s*(\d+)$/)||q.match(/^(u\d+)\s+(\d+)$/);
 if(pinMatch){const chip=catalog.find(c=>normalize(c.id)===pinMatch[1]||normalize(c.label)===pinMatch[1]);if(chip)return index.filter(r=>r.type==='pin'&&r.owner.id===chip.id&&r.pin===Number(pinMatch[2]));}
 const terms=q.split(/\s+/);return index.filter(r=>terms.every(t=>r.text.includes(t))).map(r=>({r,score:(normalize(r.owner?.id||r.item?.id||r.name)===q?100:0)+(r.type==='component'?25:r.type==='signal'?20:0)+(r.text.startsWith(q)?10:0)})).sort((a,b)=>b.score-a.score).map(x=>x.r);
}
function renderSearch(){
 const query=el('learnQuery').value,results=find(query);el('learnResults').replaceChildren();
 el('learnResultCount').textContent=results.length?(normalize(query)?results.length+' coincidencias':'Piezas para comenzar')+(results.length>24?' · mostrando 24':''):'Sin resultados. Prueba con U1, una señal o un código de cable.';
 for(const result of results.slice(0,24)){const b=document.createElement('button');b.type='button';b.dataset.result=result.key;const title=document.createElement('strong'),detail=document.createElement('small');title.textContent=result.title;detail.textContent=result.detail;b.append(title,detail);b.onclick=()=>activate(result);el('learnResults').appendChild(b);}
}
function revealScene(){if(!document.body.classList.contains('fullscreen'))stage.scrollIntoView({block:'center',behavior:scrollBehavior()});}
function activate(result){
 closeDialog();
 if(result.type==='pin'&&result.owner.kind==='chip'){cancelPlacement();doorStudio.inspect(result.owner.id,result.pin);}
 else if(result.type==='component'||result.type==='pin')place(result.owner.id,{pin:result.pin});
 else{selectCable(result.item.id,{follow:false,scroll:false});view='focus';setCamera(detailCameraBox());}
 revealScene();
}
const examples=[catalog.find(c=>c.label==='NE555')?.id||catalog[0].id,'U1.11','STOP','W001'];
for(const text of examples){const b=document.createElement('button');b.type='button';b.textContent=text;b.onclick=()=>{el('learnQuery').value=text;renderSearch();el('learnQuery').focus();};dialog.querySelector('.learning-examples').appendChild(b);}
el('learnQuery').oninput=renderSearch;
el('learnQuery').onkeydown=event=>{if(['Enter','ArrowDown'].includes(event.key)){const first=el('learnResults').querySelector('button');if(first){event.preventDefault();event.key==='Enter'?first.click():first.focus();}}};
el('learnResults').onkeydown=event=>{if(!['ArrowDown','ArrowUp'].includes(event.key))return;const buttons=[...el('learnResults').querySelectorAll('button')],i=buttons.indexOf(document.activeElement);event.preventDefault();if(event.key==='ArrowUp'&&i===0)el('learnQuery').focus();else buttons[Math.max(0,Math.min(buttons.length-1,i+(event.key==='ArrowDown'?1:-1)))]?.focus();};
el('learnComponent').innerHTML=catalog.map(c=>'<option value="'+safe(c.id)+'">'+safe(c.id+' · '+c.label)+'</option>').join('');
function updateCatalogNote(){el('learnComponentNote').textContent=catalog.find(c=>c.id===el('learnComponent').value)?.note||'';}
el('learnComponent').onchange=updateCatalogNote;updateCatalogNote();el('learnPlace').onclick=()=>{const id=el('learnComponent').value;closeDialog();place(id);};
function componentBox(c){
 const points=c.holes.map(point),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);return [Math.min(...xs)-110,Math.min(...ys)-125,Math.max(330,Math.max(...xs)-Math.min(...xs)+220),Math.max(340,Math.max(...ys)-Math.min(...ys)+250)];
}
function clearPose(){
 placementNode?.classList.remove('learning-part-hidden');placementNode=null;ghost?.remove();guideLayer?.remove();ghost=null;guideLayer=null;board3d?.setPlacement?.(null);
}
function cancelPlacement(){
 if(placementFrame)cancelAnimationFrame(placementFrame);placementFrame=0;placementTime=0;clearPose();placement=null;lastPlacementPhase='';card.hidden=true;
}
function buildPose(c){
 placementNode=map.querySelector(c.selector);guideLayer=document.createElementNS(ns,'g');guideLayer.setAttribute('class','learning-guides');guideLayer.setAttribute('pointer-events','none');
 const hs=placement.pin?[c.holes[placement.pin-1]]:c.holes;
 guideLayer.innerHTML=hs.filter(Boolean).map((h,i)=>{const [x,y]=point(h);return '<circle cx="'+x+'" cy="'+y+'" r="'+(i===0?10:7)+'" fill="none" stroke="'+(i===0?'#bd8d25':'#19765c')+'" stroke-width="2" vector-effect="non-scaling-stroke"/>';}).join('');
 el('scene').appendChild(guideLayer);
 if(placementNode){ghost=document.createElementNS(ns,'g');ghost.setAttribute('class','learning-placement-ghost');ghost.setAttribute('pointer-events','none');const clone=placementNode.cloneNode(true);clone.classList.remove('hidden','future','dim','old','selected','learning-part-hidden');clone.querySelectorAll('[tabindex]').forEach(n=>n.removeAttribute('tabindex'));clone.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));clone.removeAttribute('tabindex');clone.removeAttribute('role');ghost.appendChild(clone);el('scene').appendChild(ghost);}
}
function drawPlacement(){
 if(!placement)return;const c=catalog.find(c=>c.id===placement.id),t=placement.progress,u=Math.max(0,Math.min(1,(t-.24)/.76)),ease=u*u*(3-2*u);
 if(rendererMode==='2d'&&!guideLayer)buildPose(c);
 if(ghost){const ps=c.holes.map(point),cx=ps.reduce((n,p)=>n+p[0],0)/ps.length,cy=ps.reduce((n,p)=>n+p[1],0)/ps.length,scale=1+.12*(1-ease);ghost.setAttribute('transform','translate('+cx+' '+cy+') scale('+scale+') translate('+(-cx)+' '+(-cy)+')');ghost.style.opacity=String(.5+.5*ease);ghost.style.display=t<1?'':'none';}
 placementNode?.classList.toggle('learning-part-hidden',t<1);
 if(rendererMode==='3d')board3d?.setPlacement?.({id:c.id,progress:t});
 const phase=t<.24?'0':t<1?'1':'2',stamp=phase+placement.playing+canAnimate();
 if(stamp!==lastPlacementPhase){lastPlacementPhase=stamp;el('learnPlacementPhase').textContent=!canAnimate()?'Vista fija · movimiento desactivado':(placement.playing?'':'Pausa · ')+(phase==='0'?'Alinea las patas con los anillos':phase==='1'?'Inserta la pieza sin cambiar su orientación':'Pieza mostrada · comprueba tu montaje');el('learnPause').disabled=t>=1||!canAnimate();el('learnPause').textContent=placement.playing?'Pausar':'Continuar';el('learnReplay').disabled=!canAnimate();}
}
function tickPlacement(now){
 placementFrame=0;if(!placement?.playing)return;const dt=placementTime?Math.min(100,now-placementTime):0;placementTime=now;placement.progress=Math.min(1,placement.progress+dt*(doorStudio.getState().prefs.speed||1)/2400);if(placement.progress===1)placement.playing=false;drawPlacement();if(placement.playing)placementFrame=requestAnimationFrame(tickPlacement);
}
function place(id,{pin=null,navigate=true,focus=true}={}){
 const c=catalog.find(c=>c.id===id);if(!c)return false;
 cancelPlacement();doorStudio.cancel();doorStudio.closeInspector();internal=true;
 if(navigate){if(c.item)selectCable(c.item.id,{follow:false,scroll:false});else selectStep(0,false,{guided:false});}
 internal=false;selected=c.item?.id||null;visibility();showDetail();stopFeedback();board3d?.stopReplay?.();view='focus';if(focus)setCamera(componentBox(c));
 placement={id:c.id,pin,progress:canAnimate()?0:1,playing:canAnimate()};card.hidden=false;el('learnPlacementName').textContent=c.id+' · '+c.label;el('learnPlacementNote').textContent=c.note;
 el('learnPlacementHoles').textContent=(pin?'Pata '+pin+': '+hole(c.holes[pin-1]):c.holes.length>2?c.holes.length+' patas · '+hole(c.holes[0])+' … '+hole(c.holes.at(-1)):c.holes.map(hole).join(' → '));
 el('learnComponent').value=c.id;updateCatalogNote();el('learnNextPart').disabled=catalog.indexOf(c)===catalog.length-1;
 drawPlacement();placementTime=0;if(placement.playing)placementFrame=requestAnimationFrame(tickPlacement);if(focus)revealScene();return true;
}
function pausePlacement(){
 if(!placement||placement.progress>=1||!canAnimate())return;
 placement.playing=!placement.playing;if(placementFrame)cancelAnimationFrame(placementFrame);placementFrame=0;placementTime=0;drawPlacement();if(placement.playing)placementFrame=requestAnimationFrame(tickPlacement);
}
el('learnReplay').onclick=()=>placement&&place(placement.id,{pin:placement.pin,navigate:false});el('learnPause').onclick=pausePlacement;el('learnPlacementClose').onclick=cancelPlacement;
el('learnNextPart').onclick=()=>{const i=catalog.findIndex(c=>c.id===placement?.id);if(i>=0&&catalog[i+1])place(catalog[i+1].id);};
map.addEventListener('click',event=>{if(pan2D.suppress)return;const target=event.target.closest('[data-placement-id]');if(target){event.preventDefault();event.stopImmediatePropagation();place(target.dataset.placementId);}},true);
const inspectObserver=new MutationObserver(()=>{if(!el('studioInspector').hidden&&!el('learnInspectorPlace')){const c=doorStudio.getState().chip;if(!c)return;const b=document.createElement('button');b.type='button';b.id='learnInspectorPlace';b.textContent='Ver colocación de '+c;b.onclick=()=>place(c);el('studioInspector').querySelector('.studio-inspector-head').after(b);}});
inspectObserver.observe(el('studioInspector'),{childList:true});
function blockChecks(n){
 const title=model.stages[n]?.[0]||'',ls=model.assemblyVariant.startsWith('ls151');
 const groups=[
 ['Comparé valores y referencias con los materiales de esta variante.','Revisé muescas, pata 1 y separación de las filas de los integrados.','Confirmé el pinout real de displays, LED y capacitores polarizados.'],
 ['Monté con ambas fuentes desconectadas.','Revisé puentes de los rieles y GND común según el montaje.','Separé la alimentación lógica de 5 V de la alimentación del motor.'],
 ['Verifiqué que ABRIR, CERRAR y STOP conservan su posición.','Identifiqué los contactos de los finales con continuidad, sin alimentación.','Comparé sus terminales y estados con la descripción de este bloque.'],
 ['Revisé las entradas de mando y finales en los pines indicados.','Conecté las entradas fijas y de habilitación según esta variante.','Comparé cada salida con su nombre de señal; no uní salidas entre sí.'],
 ['Revisé cada entrada y salida de las compuertas con su pinout.','Conservé los valores y destinos de las resistencias de esta variante.',ls?'El amarillo usa NY y no el retorno compartido de los displays.':'Conecté las entradas libres según el montaje; dejé libres las salidas indicadas.'],
 ['Verifiqué alimentación lógica, alimentación de motor y GND del puente H.','Comprobé que motor y fuente sean adecuados al driver.','Revisé las dos salidas hacia el motor y las entradas de dirección.'],
 ['Revisé valores y orientación de las piezas del generador de parpadeo.','Comprobé la resistencia del LED rojo y su polaridad.','Comparé la señal de habilitación con la descripción de este bloque.'],
 ['Identifiqué tipo de común y pinout real de ambos displays.','Cada segmento y LED conserva su resistencia indicada.','Revisé ánodo/cátodo de los LED y los retornos de los displays.'],
 ['Revisé que ningún jumper una directamente +5 V y GND.','Comprobé valores, polaridades y orientación de los integrados.','Revisé todos los bloques antes de conectar las fuentes.'],
 ['Probé puerta cerrada: OF y orden de cierre sin movimiento.','Probé apertura y cierre: amarillo durante movimiento y parada en ambos finales.','Probé puerta abierta: OP, verde y orden de apertura sin movimiento.','Probé STOP: motor detenido, SP y rojo intermitente.','Liberé STOP manteniendo el mando: reanuda en la misma dirección.']
 ];
 return (groups[n]||groups[8]).map((text,i)=>({id:n+':'+i,text,title,related:model.items.find(it=>it.stage===n)?.id}));
}
function saveReviews(){try{localStorage.setItem(reviewKey,JSON.stringify(reviews));}catch{}}
function renderReview(){
 const n=step,checks=blockChecks(n),done=checks.filter(c=>reviews[c.id]===true).length;el('learnReview').innerHTML='<h3>'+safe(model.stages[n][0].replace(/^\d+\.\s*/,''))+'</h3><p class="learning-muted">Confirmación manual de tu montaje. Estas casillas no certifican una medición ni marcan cables como realizados.</p><p class="learning-review-count" role="status">'+done+' / '+checks.length+' comprobaciones confirmadas</p><div class="learning-checks">'+checks.map(c=>'<label><input type="checkbox" data-review="'+c.id+'" '+(reviews[c.id]===true?'checked':'')+'><span>'+safe(c.text)+'</span></label>').join('')+'</div><details class="learning-block-notes"><summary>Consultar instrucciones del bloque</summary><p>'+safe(model.stages[n][1])+'</p></details><div class="learning-review-actions"><button type="button" id="learnReviewLocate">Ver conexiones del bloque</button><button type="button" id="learnReviewReset">Desmarcar esta revisión</button></div>';
 el('learnReview').querySelectorAll('[data-review]').forEach(input=>input.onchange=()=>{reviews[input.dataset.review]=input.checked;saveReviews();const count=checks.filter(c=>reviews[c.id]===true).length;el('learnReview').querySelector('.learning-review-count').textContent=count+' / '+checks.length+' comprobaciones confirmadas';updateReviewBadge();});
 el('learnReviewLocate').onclick=()=>{closeDialog();selectStep(n,false,{guided:false});view='step';setCamera();};
 el('learnReviewReset').onclick=()=>{checks.forEach(c=>delete reviews[c.id]);saveReviews();renderReview();updateReviewBadge();};
}
function updateReviewBadge(){const cs=blockChecks(step),count=cs.filter(c=>reviews[c.id]===true).length;checkButton.textContent='Revisar bloque · '+count+'/'+cs.length;}
selectCable=function(...args){if(!internal)cancelPlacement();const result=originals.selectCable(...args);updateReviewBadge();return result;};
selectStep=function(...args){if(!internal)cancelPlacement();const result=originals.selectStep(...args);updateReviewBadge();return result;};
animateSelection=function(...args){const it=model.items.find(i=>i.id===selected);if(!internal&&it&&catalog.some(c=>c.item?.id===it.id)&&doorStudio.getState().prefs.auto&&canAnimate())place(it.partId||it.id,{navigate:false,focus:false});else originals.animateSelection(...args);};
doorStudio.inspect=function(...args){cancelPlacement();return originals.inspect(...args);};
doorStudio.snapshot=()=>({...originals.snapshot(),placement:placement?{id:placement.id,progress:placement.progress}:null});
synchronizeMotion=function(...args){originals.synchronizeMotion(...args);if(placement&&!canAnimate()){if(placementFrame)cancelAnimationFrame(placementFrame);placementFrame=0;placement.progress=1;placement.playing=false;drawPlacement();}};
const originalRenderer=showRenderer;showRenderer=function(...args){originalRenderer(...args);if(placement)drawPlacement();};
document.addEventListener('visibilitychange',()=>{if(document.hidden&&placement?.playing){placement.playing=false;if(placementFrame)cancelAnimationFrame(placementFrame);placementFrame=0;placementTime=0;lastPlacementPhase='';}});
motionQuery.addEventListener('change',()=>{if(placement&&!canAnimate()){if(placementFrame)cancelAnimationFrame(placementFrame);placementFrame=0;placement.progress=1;placement.playing=false;drawPlacement();}});
map.addEventListener('click',event=>{if(event.target.closest('[data-chip]'))cancelPlacement();},true);
window.doorLearning={open:openDialog,close:closeDialog,place,pause:pausePlacement,cancel:cancelPlacement,find:q=>find(q).map(r=>({key:r.key,title:r.title,type:r.type})),getState:()=>({placement:placement?{...placement}:null,reviewKey,reviews:{...reviews},catalog:catalog.map(c=>({id:c.id,kind:c.kind,holes:c.holes})),tab,open:dialog.open})};
updateReviewBadge();renderSearch();
})();