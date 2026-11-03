(()=>{
 'use strict';
 const requested=new URLSearchParams(location.search).get('montaje');
 if(requested==='dip-cc'){location.replace('./puerta-catodo'+location.hash);return;}
 const ccLink=document.createElement('p');ccLink.className='assembly-helper';ccLink.innerHTML='<a href="./puerta-catodo">Nueva variante: 5011AS de cátodo común y dos DIP de 4 posiciones →</a>';document.querySelector('.assembly-choice').after(ccLink);
 const variants=['ls151-9r','ls151-6k8'];
 const variant=variants.includes(requested)?requested:'ls151-9r';
 window.DOOR_VARIANT=variant;
 // Old bookmarks, including removed HC variants, open the current inventory option.
 if(requested!==variant){const url=new URL(location.href);url.searchParams.set('montaje',variant);history.replaceState(null,'',url);}
 const byId=id=>document.getElementById(id),choice=byId('assemblyVariant'),status=byId('assemblyStatus');
 choice.value=variant;
 choice.onchange=()=>{const url=new URL(location.href);url.searchParams.set('montaje',choice.value);location.assign(url.href);};
 byId('assemblyRetry').onclick=()=>location.reload();
 document.querySelectorAll('.circuit-picker a').forEach(a=>{a.removeAttribute('aria-current');if(a.getAttribute('href')==='/puerta')a.setAttribute('aria-current','page');});
 const external=document.createElement('details');external.className='external-controls-note';
 external.innerHTML='<summary>Mandos externos: 3 SCMM-122 + 2 SS0501A</summary><p>ABRIR, CERRAR y STOP conservan su posición. Los finales se accionan con su palanca. Identifica COM/NC/NA con multímetro: el orden de terminales dibujado es ilustrativo.</p><p>Suelda y aísla tres cables por mando; lleva sus extremos a los agujeros indicados. Mantén la orden enclavada durante STOP para reanudarla.</p><a href="#montaje" class="external-controls-focus">Ver mandos y sus cables</a>';
 document.querySelector('.assembly-choice').after(external);
 external.querySelector('a').onclick=e=>{e.preventDefault();document.querySelector('[data-view=controls]')?.click();document.querySelector('.map-stage').scrollIntoView({block:'center',behavior:'smooth'});};
 function loadScript(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.async=false;s.onload=resolve;s.onerror=()=>reject(Error('No se pudo cargar '+src));document.body.append(s);});}
 function showAssembly(source){
  const t=source.timingOption;
  byId('assemblySummary').textContent=t.inventory+'. '+(t.id==='6k8'?'Sustituye la cadena de siete resistencias por una de 6.8 kΩ; necesitas conseguir ese valor.':'Usa tus resistencias de 1 kΩ; la cadena del 555 queda en tres piezas.')+' Parpadeo calculado: '+t.hz.toFixed(2)+' Hz. Las dos opciones usan dos protoboards y el mismo control de puerta.';
  byId('assemblyResistors').textContent=t.resistors+' resistencias en total';
  byId('assemblyCount').textContent=source.counts.physicalComponents+' piezas principales';
  byId('assemblyChips').textContent='5 integrados · 2 placas';byId('heroChipCount').textContent='5 integrados';
  const roles=[['Control','U1 · SN74LS151N'],['Estados y buffer','U2 · SN74LS02N'],['Inversión','U3 · SN74LS04N'],['Parpadeo','U4 · NE555 · '+t.hz.toFixed(2)+' Hz'],['Motor y dos LED','U5 · L293D'],['Montaje','Dos protoboards · bloques separados']];
  byId('assemblyPinRoles').replaceChildren(...roles.map(([name,detail])=>{const row=document.createElement('span'),b=document.createElement('b'),small=document.createElement('small');b.textContent=name;small.textContent=detail;row.append(b,small);return row;}));
  byId('assemblyElectricalNote').textContent='RA=R1=1 kΩ. RB: '+t.rbDescription+'. C4=100 µF. Conserva una resistencia de 1 kΩ en cada LED y en el común de cada display. Sigue las coordenadas de esta opción; el avance se guarda por separado.';
  const list=byId('assemblyMaterials');list.replaceChildren(...source.materials.map(material=>{const li=document.createElement('li'),b=document.createElement('b'),span=document.createElement('span');b.textContent=material.quantity+' × '+material.name;span.textContent=/Protoboard/.test(material.name)?'A: control, motor y 555. B: lógica de indicación y displays.':/6\.8/.test(material.name)?'R2 del 555: azul, gris, rojo y oro. Sustituye toda la cadena anterior.':/Resistencia/.test(material.name)?'Respeta el valor y la función indicados en cada paso.':/100/.test(material.name)?'Temporización del 555: positivo a T, negativo a GND.':'Coloca y conecta según la etapa de esta opción.';li.append(b,span);return li;}));
  byId('materialsTimingNote').textContent='NE555: RA=1 kΩ, RB='+(t.rbOhms/1000)+' kΩ y C4=100 µF. Frecuencia ideal '+t.hz.toFixed(2)+' Hz; depende de la tolerancia de las piezas. Un solo motor TT amarillo, lógica a 5 V y VM a 6 V, con GND común.';
 }
 async function start(){
  const prefix='./puerta-'+variant;
  await loadScript(prefix+'-model.js');showAssembly(window.DOOR_MODEL);
  await loadScript(prefix+'-layout.js');
  const css=document.createElement('link');css.rel='stylesheet';css.href='./puerta-clear-layout.css';document.head.append(css);
  await loadScript('./puerta-clear-harness.js');await loadScript('./puerta-clear-layout.js');
  for(const [view,label]of [['motor','Motor externo'],['controls','Mandos externos']]){const b=document.createElement('button');b.type='button';b.dataset.view=view;b.textContent=label;b.setAttribute('aria-pressed','false');document.querySelector('.view-buttons').append(b);}
  for(const script of ['external-controls-svg','puerta-map','puerta-guide','puerta-studio','puerta-learning','puerta-signal-logic','puerta-lesson']){await loadScript('./'+script+'.js'+(script==='puerta-guide'?'?v=jumpers-v2':script==='puerta-map'?'?v=componentes-v1':''));if(script==='puerta-map'){const baseBands=window.bands;window.bands=value=>/^6[.,]8\s*k/.test(value)?['#176eb2','#788183','#c73b42','#c9a145']:baseBands(value);}}
  if(!window.doorGuide)throw Error('La guía no terminó de iniciar.');
  await loadScript('./puerta-workspace.js?v=apariencia-v1');
  await loadScript('./puerta-cable-workbench.js');
  document.dispatchEvent(new CustomEvent('door-guide-ready',{detail:{variant}}));
 }
 window.doorReady=start().catch(error=>{status.textContent='No pudimos cargar el montaje. Vuelve a intentarlo.';status.setAttribute('role','alert');byId('assemblyRetry').hidden=false;console.error(error);});
})();
