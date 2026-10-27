/* Components first; electrical nodes, routing IDs and saved wire marks stay stable. */
(()=>{'use strict';
const ns='http://www.w3.org/2000/svg',wire=it=>it.kind==='wire'||it.kind==='link';
function addExternalWires(m){
 if(m.externalWiresVersion)return;
 m.externalWiresVersion=1;m.externalTerminals={};
 const rows={a:290,b:320,c:350,d:380,e:410,f:500,g:530,h:560,i:590,j:620,'+T':185,'-T':215,'-B':680,'+B':710};
 const xy=h=>[95+m.boards[h[0]].xOffset+(h[2]-1)*30,rows[h[1]]+m.boards[h[0]].yOffset];
 const added=[];
 for(const part of m.items.filter(p=>p.externalControl||p.externalMotor)){
  const e=part.externalControl||part.externalMotor,motor=!!part.externalMotor,hs=[part.a,part.b,...part.third?[part.third]:[]],name=part.partId;
  e.terminals.forEach((t,i)=>{
   const port=xy(hs[i]),key=name+':'+(i+1),id='EXT_'+name+'_'+(i+1),fn=motor?'Terminal '+(i+1):e.functions[i],color=motor?(i?'#33495a':'#d85c51'):e.colors[i];
   m.externalTerminals[key]={point:t,label:name+' · '+fn,height:motor?2.15:1.02};
   let d,route;
   if(motor){d='M'+t[0]+' '+t[1]+' Q'+port[0]+' '+(820+i*28)+' '+port[0]+' '+(780+i*28)+' V'+port[1];route=[t,[port[0],820+i*28],port];}
   else{const [x,y]=e.center,left=x-150-i*18,lane=815+i*22,front=y+140+i*10;d='M'+t[0]+' '+t[1]+' V'+(t[1]+22)+' C'+t[0]+' '+front+' '+left+' '+front+' '+left+' '+y+' C'+left+' '+(lane+35)+' '+port[0]+' '+(lane+55)+' '+port[0]+' '+lane+' V'+port[1];route=[t,[t[0],front],[left,front],[left,y],[port[0],lane+55],port];}
   added.push({id,kind:'wire',stage:part.wiringStage??part.stage,a:['EXT',name,i+1],b:hs[i],net:part.net||name,color,signal:'EXT:'+name,partId:name,fromRef:name+'.'+(i+1),toRef:hs[i].join(':'),label:name+' · '+fn+' → '+hs[i][0]+':'+hs[i][1]+hs[i][2],note:'Cable externo propio de la pieza. Identifica el terminal real, suelda y aísla la unión y lleva el extremo macho al agujero indicado.',externalLead:{partId:name,terminal:i,motor},externalPath:d,route});
  });
 }
 m.items.push(...added);
}

function prepare(m){
 if(m.componentAssemblyVersion)return m;
 m.componentAssemblyVersion='components-first-v1';
 m.wiringStages=m.stages.map(s=>[...s]);
 for(const it of m.items)if(!wire(it)){it.wiringStage=it.stage;it.stage=0;}
 m.stages[0]=['0. Coloca todos los componentes','Con las fuentes desconectadas, coloca integrados, resistencias, capacitores, LED, potenciómetro, displays y mandos según los materiales de este circuito. Respeta valores, muescas y polaridades. Los mandos y el motor externos quedan fuera de la protoboard. En este paso no añadas jumpers; después conectarás los bloques con las piezas ya colocadas.'];
 for(let i=1;i<m.stages.length-1;i++)m.stages[i]=[m.stages[i][0].replace(/^(\d+\. )/,'$1Cableado · '),'Las piezas ya están colocadas. Conecta únicamente los cables de este bloque y comprueba sus nodos. '+m.stages[i][1].replace(/Coloca /g,'Comprueba la colocación de ')];
 if(m.checkpoints)m.checkpoints[0]='Todos los componentes colocados, con valores y polaridad revisados. Sin jumpers ni fuentes conectadas.';
 addExternalWires(m);return m;
}
function catalog(m){
 const dipHoles=c=>Array.from({length:c.pins},(_,i)=>{const p=i+1;return[c.board,p>c.pins/2?'e':'f',c.start+(p>c.pins/2?c.pins-p:p-1)];});
 const out=[];
 if(m.chips){for(const c of m.chips)out.push({id:c.id,label:c.label,kind:'chip',holes:dipHoles(c),selector:'[data-chip="'+c.id+'"]'});for(const d of m.displays)out.push({id:d.id,label:'Display de 7 segmentos',kind:'display',holes:Object.values(d.pins),selector:'[data-placement-id="'+d.id+'"]'});for(const a of m.arrays||[])out.push({id:a.id,label:a.label||'Red de resistencias',kind:'array',holes:Object.values(a.pinHoles),selector:'[data-array="'+a.id+'"]'});}
 else if(m.letters){m.starts.forEach((start,i)=>out.push({id:'U'+(i+1),label:'SN74LS151N · segmento '+('abcdefg'[i]),kind:'chip',holes:dipHoles({board:'A',start,pins:16}),selector:'[data-assembly-component="U'+(i+1)+'"]'}));out.push({id:'SW1',label:'Switch DIP · selectores',kind:'switch',holes:['e','f'].flatMap(r=>[1,2,3,4].map(c=>[m.dipBoard,r,c])),selector:'#dip-component'},{id:'DISPLAY1',label:'Display de ánodo común',kind:'display',holes:Array.from({length:10},(_,i)=>[m.dipBoard,i>=5?'d':'h',m.displayStart+(i>=5?9-i:i)]),selector:'[data-assembly-component="DISPLAY1"]'});}
 else out.push({id:'U1',label:'NE555',kind:'chip',holes:dipHoles({board:'A',start:10,pins:8}),selector:'[data-assembly-component="U1"]'});
 for(const it of m.items.filter(it=>!wire(it)))out.push({id:it.partId||it.id,itemId:it.id,label:it.externalControl?it.externalControl.model.toUpperCase():it.kind==='led'?({LY:'LED amarillo',LG:'LED verde',LR:'LED rojo'}[it.value]||'LED'):it.kind==='motor'?'Motor externo':it.kind==='switch'?'Mando':it.value||it.label,kind:it.kind,external:!!(it.externalControl||it.externalMotor),bounds:it.externalControl?.bounds||it.externalMotor?.bounds,holes:it.kind==='pot'?m.potPins:[it.a,it.b,...it.third?[it.third]:[]],selector:'.connection[data-id="'+it.id+'"]',note:it.note||''});
 return out;
}
const api=window.ComponentAssembly={prepare,catalog,isWire:wire};
function init(){
 if(api.ready||typeof model==='undefined'||typeof selectStep!=='function'||!document.getElementById('map'))return;
 api.ready=true;prepare(model);
 const q=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)],map=q('#map'),scene=q('#scene'),stage=q('.map-stage'),parts=catalog(model);
 const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let confirmed=new Set(Array.isArray(saved.assemblyConfirmed)?saved.assemblyConfirmed:[]);
 if(!saved.assemblyVersion&&completed.has(0))for(const c of parts.filter(c=>!c.itemId))confirmed.add(c.id);
 let pose=null,frame=0,last=0,speed=1,groupKey='',guide=null,tip=null,paintStamp='';
 const original={selectStep,selectCable,visibility,progress,showDetail,overview,save,sync3d,showRenderer,synchronizeMotion,markConnection};
 const panel=document.createElement('section');panel.className='component-assembly-panel';panel.setAttribute('aria-label','Colocación y cableado de componentes');
 panel.innerHTML='<div class="component-assembly-heading"><strong>Primero las piezas, después los cables</strong><span class="assembly-counter"></span></div><p class="assembly-context"></p><div class="assembly-actions"><button type="button" data-assembly-play>Animar colocación</button><button type="button" data-assembly-pause hidden>Pausar</button><button type="button" data-assembly-prev aria-label="Pieza anterior">←</button><button type="button" data-assembly-next aria-label="Pieza siguiente">→</button><label class="assembly-speed">Velocidad <select data-assembly-speed><option value=".5">0.5×</option><option value="1" selected>1×</option><option value="2">2×</option><option value="3">3×</option></select></label><button type="button" data-assembly-close hidden>Ver todas</button></div><label class="assembly-choose">Componente <select data-assembly-choose></select></label><p class="assembly-current" role="status" aria-live="polite"></p><p class="assembly-holes"></p><p class="assembly-orientation"></p><details class="assembly-inventory"><summary>Lista de componentes · confirma tu montaje</summary><div class="assembly-checklist"></div></details><small>Ver la animación no marca piezas ni cables como realizados.</small>';
 stage.prepend(panel);
 const get=s=>panel.querySelector(s),done=c=>c.itemId?marked.has(c.itemId):confirmed.has(c.id);
 const leads=model.items.filter(it=>it.externalLead).map(it=>({id:it.id,stage:it.stage,control:it.externalLead.partId,terminal:it.externalLead.terminal,label:it.label,holes:[it.a,it.b],bounds:model.items.find(p=>p.partId===it.partId&&(p.externalControl||p.externalMotor))?.externalControl?.bounds||model.items.find(p=>p.partId===it.partId&&p.externalMotor)?.externalMotor.bounds,external:true}));
 const externalMode=()=>step>0&&leads.some(c=>c.stage===step);
 function wirePose(){const index=leads.findIndex(c=>c.id===selected);if(index<0)return null;const a=window.doorStudio?.getState().animation;return {kind:'leads',index,progress:a?.id===selected?a.progress:1,playing:a?.id===selected&&a.playing};}

 const sequence=()=>pose?.kind==='leads'?leads:parts;
 const order=parts.map(c=>c.id),nodes=new Map(parts.map(c=>[c.id,scene.querySelector(c.selector)]));for(const c of parts)if(c.itemId&&nodes.get(c.id))nodes.get(c.id).dataset.stage='0';
 for(const [id,n]of nodes)if(n){n.dataset.assemblyId=id;n.dataset.assemblyHome=n.getAttribute('transform')||'';}
 function completePlacement(){if(parts.every(done))completed.add(0);else completed.delete(0);}
 function inventory(){get('.assembly-checklist').innerHTML=parts.map(c=>'<label><input type="checkbox" data-assembly-mark="'+safe(c.id)+'" '+(done(c)?'checked':'')+'><span><b>'+safe(c.id)+'</b> '+safe(c.label)+'</span></label>').join('');}
 function clearSvg(){for(const n of nodes.values())if(n){n.style.removeProperty('display');n.setAttribute('transform',n.dataset.assemblyHome);n.classList.remove('assembly-active');}for(const n of all('[data-external-lead]'))n.style.removeProperty('display');for(const n of all('[data-external-cable]')){n.style.removeProperty('stroke-dasharray');n.style.removeProperty('stroke-dashoffset');}guide?.remove();guide=null;tip=null;groupKey='';}
 function stop(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;}
 function cancel(){window.doorStudio?.cancel();stop();pose=null;clearSvg();board3d?.setComponentSequence?.(null);board3d?.setExternalCable?.(null);original.visibility();ui();}
 function pointBox(c){if(c.bounds)return[c.bounds[0]-90,Math.min(c.bounds[1]-70,...c.holes.map(h=>point(h)[1]-65)),c.bounds[2]-c.bounds[0]+180,c.bounds[3]-Math.min(c.bounds[1]-70,...c.holes.map(h=>point(h)[1]-65))+90];const ps=c.holes.map(point),xs=ps.map(p=>p[0]),ys=ps.map(p=>p[1]);return[Math.min(...xs)-95,Math.min(...ys)-140,Math.max(460,Math.max(...xs)-Math.min(...xs)+190),Math.max(400,Math.max(...ys)-Math.min(...ys)+235)];}
 function focus(c){view='step';setCamera(pointBox(c));}
 function makeGuides(c){guide?.remove();guide=document.createElementNS(ns,'g');guide.setAttribute('pointer-events','none');guide.dataset.assemblyGuides='true';const points=c.external&&pose.kind==='parts'&&c.bounds?[[c.bounds[0]+(c.bounds[2]-c.bounds[0])/2,c.bounds[1]+75]]:c.holes.map(point);points.forEach(([x,y],i)=>{const ring=document.createElementNS(ns,'circle');for(const [k,v]of Object.entries({cx:x,cy:y,r:i?10:13,fill:'none',stroke:i?'#168270':'#bd8b2c','stroke-width':2.5,'vector-effect':'non-scaling-stroke'}))ring.setAttribute(k,v);guide.append(ring);});tip=document.createElementNS(ns,'circle');tip.setAttribute('r','9');tip.setAttribute('fill','#e0aa39');tip.setAttribute('stroke','#fff9e9');tip.setAttribute('stroke-width','3');tip.hidden=true;guide.append(tip);scene.append(guide);}
 function draw(){
  if(!pose)return;const xs=sequence(),c=xs[pose.index];if(!c)return;
  if(groupKey!==pose.kind+':'+c.id){clearSvg();groupKey=pose.kind+':'+c.id;makeGuides(c);}
  const t=pose.progress,k=Math.max(0,Math.min(1,(t-.18)/.82)),ease=k*k*(3-2*k);
  if(pose.kind==='parts'){
   parts.forEach((part,i)=>{const n=nodes.get(part.id);if(!n)return;n.style.display=i>pose.index?'none':'';n.classList.toggle('assembly-active',i===pose.index);n.setAttribute('transform',(i===pose.index?(part.external?'translate('+(65*(1-ease))+' '+(-18*(1-ease))+') ':'translate(0 '+(-90*(1-ease))+') '):'')+n.dataset.assemblyHome);});
   board3d?.setComponentSequence?.({id:c.id,index:pose.index,progress:t,order});
  }
  ui();
 }
 function ui(){
  panel.hidden=step!==0&&!externalMode();const shown=pose||wirePose(),activeList=shown?.kind==='leads'?leads:parts,external=externalMode(),kind=external?'leads':'parts',xs=external?leads:parts,c=shown?activeList[shown.index]:null;
  get('.component-assembly-heading strong').textContent=external?'Cableado de botones y motor':'Paso 1 · coloca todos los componentes';
  get('.assembly-context').textContent=external?'Selecciona un cable externo: comparte recorrido, pausa y contorno con los demás cables.':'Integrados y componentes en su posición, sin jumpers. Los mandos y el motor externos quedan fuera de la placa.';
  get('.assembly-counter').textContent=shown?(shown.index+1)+' / '+activeList.length:parts.filter(done).length+' / '+parts.length+' confirmados';
  get('[data-assembly-play]').textContent=shown?.playing?'Repetir desde el inicio':external?'Animar cable seleccionado':'Animar colocación';
  get('[data-assembly-pause]').hidden=!shown;get('[data-assembly-pause]').textContent=shown?.playing?'Pausar':'Continuar';get('[data-assembly-pause]').disabled=!canAnimate()||shown?.progress===1&&shown?.index===activeList.length-1;
  get('[data-assembly-close]').hidden=!shown;get('[data-assembly-prev]').setAttribute('aria-label',external?'Cable anterior':'Pieza anterior');get('[data-assembly-next]').setAttribute('aria-label',external?'Cable siguiente':'Pieza siguiente');get('[data-assembly-prev]').disabled=!!shown&&shown.index===0;get('[data-assembly-next]').disabled=!!shown&&shown.index===activeList.length-1;
  get('.assembly-inventory').hidden=external;get('.assembly-choose').firstChild.textContent=external?'Cable ':'Componente ';
  if(panel.dataset.kind!==kind){get('[data-assembly-choose]').innerHTML=xs.map((p,i)=>'<option value="'+i+'">'+safe(p.id+' · '+p.label)+'</option>').join('');panel.dataset.kind=kind;}
  if(shown)get('[data-assembly-choose]').value=shown.index;
  const stamp=c?.id+':'+(shown?.progress===1)+':'+(shown?.playing||false);
  if(stamp!==paintStamp){paintStamp=stamp;get('.assembly-current').textContent=c?(shown.playing?'Mostrando · ':'Pausa · ')+c.id+' · '+c.label:'Elige una pieza o reproduce el ensamblado completo.';get('.assembly-orientation').textContent=c?(shown.kind==='leads'?'Identifica la función del terminal en la pieza real; suelda y aísla la unión antes de conectar.':c.external?'Prepara la carcasa fuera de la placa. Sus terminales se conectarán con cables.':c.kind==='chip'?'Muesca a la izquierda. La primera pata se identifica con el anillo ámbar.':c.kind==='res'?'Sin polaridad. Conserva el valor indicado y usa dos tiras diferentes.':c.kind==='led'?'Ánodo (+) en el primer agujero; cátodo (−) en el segundo.':c.kind==='cap'?(/µF/.test(c.label)?'Positivo en el primer agujero; franja negativa hacia el segundo.':'Capacitor sin polaridad. Comprueba el valor indicado.'):c.kind==='pot'?'La pata central es el cursor. Empieza con el ajuste a la mitad.':'Comprueba el pinout y la orientación de tu pieza real.'):'';get('.assembly-holes').textContent=c?(c.external&&shown.kind==='parts'?'Se prepara fuera de la protoboard; sus cables se conectan después.':c.holes.map(hole).join(' · ')):'Revisa muescas, valores y polaridades antes de conectar las fuentes.';}
  get('[data-assembly-speed] option[value="3"]').disabled=external;
  if(step===0){get('.assembly-inventory').hidden=false;q('#ledgerDetails').hidden=true;q('#placement').hidden=true;}
 }
 function start(kind,index=0,play=true){
  if(kind==='leads'){cancel();if(!leads.length)return;const c=leads[Math.max(0,Math.min(leads.length-1,index))];window.doorLearning?.cancel();selectCable(c.id,{follow:false,scroll:false});view='focus';focus(c);if(play&&canAnimate())window.doorStudio?.play();else window.doorStudio?.seek(1);ui();return;}

  cancel();window.doorLearning?.cancel();window.doorStudio?.cancel();if(step!==(kind==='leads'?2:0))selectStep(kind==='leads'?2:0,false,{guided:false});
  selected=null;visibility();showDetail();const xs=kind==='leads'?leads:parts;
  if(!canAnimate()&&play){get('.assembly-current').textContent='Movimiento reducido: todas las piezas y cables de este paso se muestran en su posición final.';return;}
  pose={kind,index:Math.max(0,Math.min(xs.length-1,index)),progress:play?0:1,playing:play&&canAnimate()};focus(xs[pose.index]);draw();last=0;if(pose.playing)frame=requestAnimationFrame(tick);
 }
 function tick(now){frame=0;if(!pose?.playing)return;const dt=last?Math.min(100,now-last):0;last=now;pose.progress=Math.min(1,pose.progress+dt*speed/(pose.kind==='leads'?1800:1500));draw();if(pose.progress===1){if(pose.index<sequence().length-1){pose.index++;pose.progress=0;focus(sequence()[pose.index]);}else pose.playing=false;}if(pose.playing)frame=requestAnimationFrame(tick);else ui();}
 function pause(){if(!pose){if(wirePose())window.doorStudio?.pause();ui();return;}if(!canAnimate())return;pose.playing=!pose.playing;stop();if(pose.playing)frame=requestAnimationFrame(tick);ui();}
 selectCable=function(...args){if(pose)cancel();return original.selectCable(...args);};
 selectStep=function(...args){if(pose)cancel();const r=original.selectStep(...args);ui();return r;};
 visibility=function(...args){const r=original.visibility(...args);for(const c of parts){const n=nodes.get(c.id);if(n){n.classList.remove('hidden','future');if(!selected)n.classList.remove('dim','old');}}for(const n of all('[data-external-wiring]'))n.style.display=step<Number(n.dataset.wiringStage||2)?'none':'';if(pose)draw();return r;};
 sync3d=function(...args){const r=original.sync3d(...args);if(pose)draw();return r;};
 showRenderer=function(...args){const r=original.showRenderer(...args);if(pose){draw();stopCamera(true);focus(sequence()[pose.index]);}else if(wirePose()){stopCamera(true);focus(leads[wirePose().index]);}return r;};
 showDetail=function(...args){original.showDetail(...args);if(step===0&&!selected){q('#connectionTitle').textContent='Coloca todos los componentes';q('#detail').textContent='La lista de colocación incluye integrados, displays, resistencias, capacitores y mandos. Los pasos siguientes contienen únicamente cableado.';}ui();};
 overview=function(...args){original.overview(...args);if(step===0){q('#mapStatus').textContent=parts.length+' componentes · sin jumpers';q('#stepParts').innerHTML='<span>'+parts.length+' componentes</span>';}ui();};
 progress=function(...args){original.progress(...args);const wires=model.items.filter(wire),count=wires.filter(it=>marked.has(it.id)).length;q('#progressText').textContent=count+' de '+wires.length+' conexiones de cableado marcadas';q('#mobileProgress').textContent=count+'/'+wires.length+' conexiones';const pct=Math.round(100*count/wires.length);q('#progressFill').style.width=pct+'%';q('.progress').setAttribute('aria-valuenow',pct);if(step===0)q('#stepMarked').textContent=parts.filter(done).length+' / '+parts.length+' piezas confirmadas';inventory();ui();};
 save=function(...args){original.save(...args);try{const value=JSON.parse(localStorage.getItem(stateKey)||'{}');value.assemblyVersion='components-first-v1';value.assemblyConfirmed=[...confirmed];localStorage.setItem(stateKey,JSON.stringify(value));}catch{}};
 markConnection=function(id,value){original.markConnection(id,value);completePlacement();original.progress();progress();save();};
 synchronizeMotion=function(...args){original.synchronizeMotion(...args);if(pose&&!canAnimate()){stop();pose.progress=1;pose.playing=false;draw();}else ui();};
 const completedChange=q('#completed').onchange;q('#completed').onchange=e=>{completedChange(e);if(step===0){for(const c of parts.filter(c=>!c.itemId))e.target.checked?confirmed.add(c.id):confirmed.delete(c.id);completePlacement();progress();save();}};
 panel.addEventListener('change',e=>{if(e.target.matches('[data-assembly-mark]')){const c=parts.find(c=>c.id===e.target.dataset.assemblyMark);if(c.itemId){if(e.target.checked)marked.add(c.itemId);else marked.delete(c.itemId);}else if(e.target.checked)confirmed.add(c.id);else confirmed.delete(c.id);completePlacement();progress();save();}if(e.target.matches('[data-assembly-speed]')){speed=Number(e.target.value);if(externalMode()){const control=document.querySelector('[data-studio-speed]');if(control){control.value=String(Math.min(2,speed));control.onchange();}}}if(e.target.matches('[data-assembly-choose]'))start(panel.dataset.kind,Number(e.target.value),false);});
 get('[data-assembly-play]').onclick=()=>start(externalMode()?'leads':'parts',externalMode()?(wirePose()?.index??leads.findIndex(c=>c.stage===step)):0);get('[data-assembly-pause]').onclick=pause;get('[data-assembly-close]').onclick=cancel;get('[data-assembly-next]').onclick=()=>start(externalMode()?'leads':'parts',(pose||wirePose())?(pose||wirePose()).index+1:0,false);get('[data-assembly-prev]').onclick=()=>start(externalMode()?'leads':'parts',(pose||wirePose())?(pose||wirePose()).index-1:0,false);
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&pose?.playing){pose.playing=false;stop();}if(pose)ui();});
 motionQuery.addEventListener('change',()=>{if(pose&&!canAnimate()){stop();pose.progress=1;pose.playing=false;draw();}else ui();});
 document.addEventListener('door-wire-animation',()=>{if(!pose)ui();});
 completePlacement();inventory();visibility();overview();showDetail();progress();save();
 window.componentAssembly={play:()=>start('parts'),playExternal:()=>start('leads'),pause,cancel,seek:(index,t=1,kind='parts')=>{start(kind,index,false);if(kind==='leads'){window.doorStudio?.seek(t);ui();}else{pose.progress=Math.max(0,Math.min(1,t));draw();}},getState:()=>({pose:pose?{...pose}:wirePose(),parts:parts.map(c=>({id:c.id,kind:c.kind,external:c.external,holes:c.holes,registered:!!nodes.get(c.id),confirmed:done(c)})),leads:leads.map(c=>({id:c.id,holes:c.holes})),wireIds:model.items.filter(wire).map(i=>i.id)})};
}
api.init=init;
if(typeof document!=='undefined'&&document.addEventListener){document.addEventListener('DOMContentLoaded',()=>{if(typeof model!=='undefined'&&!model.chips)init();});document.addEventListener('door-guide-ready',init);}
})();
