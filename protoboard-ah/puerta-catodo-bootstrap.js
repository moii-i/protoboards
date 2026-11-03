// Common-cathode profiles use independent progress keys and never reuse CA wiring.
(()=>{'use strict';
 const q=new URLSearchParams(location.search),previous=q.get('montaje')==='anterior',filtered=!previous&&q.get('desacoplo')==='si';
 const variant=previous?'dip-cc':filtered?'dip-cc-compacto-filtro':'dip-cc-compacto';
 window.DOOR_VARIANT=variant;const el=id=>document.getElementById(id);
 const load=(src,version='mesa-v1')=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='./'+src+'.js?v='+version;s.onload=resolve;s.onerror=()=>reject(Error('No se pudo cargar '+src));document.body.append(s);});
 const revision={'puerta-workspace':'apariencia-v1','puerta-cable-workbench':'ficha-v1','puerta-catodo-tools':'ficha-v1'};
 for(const link of document.querySelectorAll('[data-cc-profile]')){
  if(link.dataset.ccProfile===variant)link.setAttribute('aria-current','page');
  else link.removeAttribute('aria-current');
 }
 el('assemblyChoiceTitle').textContent='5011AS · '+(previous?'Versión anterior':filtered?'Con desacoplo':'Como en Proteus');
 el('heroAssembly').textContent='Sigue la colocación y el cableado de dos DIP4, dos displays 5011AS y un motor TT amarillo.';
 el('assemblySummary').textContent=(previous?'12 × 1 kΩ y 4 × 10 kΩ.':'9 × 1 kΩ, 1 × 2.2 kΩ y 1 × 5.1 kΩ.')+' El avance se guarda por separado para cada perfil.';
 el('ccProteusNotes').textContent=previous?'La versión anterior conserva dos resistencias de 10 kΩ en serie por display.':'SW1.3 ON = RUN y OFF = STOP. Cada display usa una resistencia de 1 kΩ hacia GND, R2 para el izquierdo y R4 para el derecho. En el visor, pulsa la posición del DIP para cambiar su contacto o el pin para inspeccionarlo.';
 el('ccDecouplingNotes').textContent=(previous?'Este perfil dibuja siete capacitores de desacoplo.':filtered?'Este perfil incluye seis capacitores de desacoplo de 100 nF.':'El perfil de Proteus reproduce el montaje grabado sin capacitores cerámicos.')+' El capacitor de 100 µF se usa para el parpadeo.';
 el('assemblyRetry').onclick=()=>location.reload();
 async function start(){
  await load('puerta-'+variant+'-model');await load('puerta-'+variant+'-layout');
  document.querySelector('[data-view="A"]').textContent='A · DIP, control y motor';document.querySelector('[data-view="B"]').textContent='B · Lógica y displays';
  const counts=window.DOOR_MODEL.counts;
  el('assemblyCount').textContent=counts.physicalComponents+' piezas principales.';
  el('assemblyResistors').textContent=counts.looseResistors;
  el('assemblyChips').textContent=counts.integratedCircuits;
  el('heroChipCount').textContent=counts.integratedCircuits+' integrados';
  el('assemblyMaterials').replaceChildren(...window.DOOR_MODEL.materials.map(m=>{const li=document.createElement('li');li.textContent=m.quantity+' × '+m.name;return li;}));
  el('assemblyPinRoles').replaceChildren(...model.chips.map(c=>{const s=document.createElement('span');s.textContent=c.id+' · '+c.label;s.style.padding='8px';return s;}));
  el('assemblyElectricalNote').textContent=previous?'Referencia anterior con dos LS04. Positivos separados: +T=5 V y +B de A=6 V.':'Un solo LS04. SW1.3 ON=RUN / OFF=STOP. Verde y amarillo en antiparalelo entre OUT3/OUT4, con R13 compartida. Positivos separados: +T=5 V y +B de A derecha=6 V.';
  el('materialsTimingNote').textContent=previous?'RA=1 kΩ; RB=3×1 kΩ; C4=100 µF, 2.06 Hz ideal.':'R11=1 kΩ; R6=5.1 kΩ; C1=100 µF, 1.29 Hz ideal. R2/R4: una sola resistencia de 1 kΩ a GND por display, como en Proteus.';
  for(const script of ['puerta-proteus-logic','external-controls-svg','puerta-map','puerta-guide','puerta-studio','puerta-learning','puerta-signal-logic','puerta-lesson','puerta-workspace','puerta-cable-workbench','puerta-catodo-tools','puerta-power-data','puerta-alimentacion'])await load(script,revision[script]);
  await load('puerta-catodo-workbench','mesa-v3');
  document.dispatchEvent(new CustomEvent('door-guide-ready',{detail:{variant}}));
  for(const a of document.querySelectorAll('#lessonPdf,.lesson-tools-footer a'))a.hidden=true;
  el('assemblyStatus').hidden=true;
 }
 window.doorReady=start().catch(e=>{el('assemblyStatus').textContent=e.message;el('assemblyStatus').setAttribute('role','alert');el('assemblyRetry').hidden=false;console.error(e);});
})();
