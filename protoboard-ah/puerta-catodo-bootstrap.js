// Dedicated inventory-based CC guide; old common-anode bookmarks stay separate.
(()=>{'use strict';
 window.DOOR_VARIANT='dip-cc';const el=id=>document.getElementById(id);
 const load=src=>new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='./'+src+'.js';s.onload=resolve;s.onerror=()=>reject(Error('No se pudo cargar '+src));document.body.append(s);});
 el('assemblyVariant').innerHTML='<option value="dip-cc">5011AS · dos DIP4 · 16 resistencias</option>';
 el('assemblyChoiceTitle').textContent='Tu variante de cátodo común.';
 el('heroAssembly').textContent='Dos DIP de 4 posiciones, dos displays 5011AS y un solo motor TT amarillo. Seis integrados de tu lista: LS151, LS02, dos LS04, NE555 y L293D.';
 el('assemblySummary').textContent='12 resistencias de 1 kΩ + 4 de 10 kΩ. Avance independiente del montaje de ánodo común.';
 el('assemblyResistors').textContent='16 resistencias en total';el('assemblyChips').textContent='6 integrados + 2 DIP4 · 2 placas';el('heroChipCount').textContent='6 integrados';
 const note=document.createElement('section');note.className='cc-status';note.innerHTML='<strong>Antes de copiar el montaje</strong><p>Los comunes 3/8 del 5011AS van a GND mediante <b>20 kΩ por display</b>. El montaje anterior era de ánodo común: no basta intercambiar una alimentación.</p><p><b>Brillo por comprobar:</b> la corriente es muy baja para respetar las salidas LS. La web muestra los segmentos lógicos, no su luminosidad real. Esta variante es una propuesta para revisar después en Proteus.</p><p>Usa cuatro resistencias de 10 kΩ y doce de 1 kΩ. Se dibujan siete 100 nF de desacoplo recomendado; su disponibilidad no está confirmada. El 100 µF se conserva para temporización.</p><a href="./puerta?montaje=ls151-9r">Abrir referencia anterior de ánodo común</a>';
 document.querySelector('.assembly-choice').after(note);
 el('assemblyRetry').onclick=()=>location.reload();
 async function start(){
  await load('puerta-dip-cc-model');await load('puerta-dip-cc-layout');
  el('assemblyCount').textContent=window.DOOR_MODEL.counts.physicalComponents+' piezas principales';
  el('assemblyMaterials').replaceChildren(...window.DOOR_MODEL.materials.map(m=>{const li=document.createElement('li'),b=document.createElement('b');b.textContent=m.quantity+' × '+m.name;li.append(b);return li;}));
  el('assemblyPinRoles').replaceChildren(...model.chips.map(c=>{const s=document.createElement('span');s.textContent=c.id+' · '+c.label;s.style.padding='8px';return s;}));
  el('assemblyElectricalNote').textContent='U3 y U6 son SN74LS04N. SW1: ABRIR/CERRAR/STOP/libre. SW2: FCA/FCC/libre/libre. En A, +T=5 V y+B=6 V solo motor; nunca unir estos dos rieles positivos.';
  el('materialsTimingNote').textContent='NE555: RA=1 kΩ, RB=3×1 kΩ, C4=100 µF. Frecuencia ideal 2.06 Hz. Dos resistencias de 10 kΩ en serie por común. No reducirlas sin recalcular la corriente.';
  document.querySelector('.assembly-helper').textContent='Los cinco pull-up definen entradas DIP. Los finales se simulan manualmente. Ambas fuentes comparten GND y mantienen sus positivos separados.';
  for(const script of ['external-controls-svg','puerta-map','puerta-guide','puerta-studio','puerta-learning','puerta-signal-logic','puerta-lesson','puerta-workspace','puerta-cable-workbench','puerta-catodo-tools'])await load(script);
  document.dispatchEvent(new CustomEvent('door-guide-ready',{detail:{variant:'dip-cc'}}));
  for(const a of document.querySelectorAll('#lessonPdf,.lesson-tools-footer a'))a.hidden=true;
  el('assemblyStatus').textContent='Lógica y continuidad comprobables por programa. Simulación eléctrica en Proteus, brillo y montaje físico pendientes.';
 }
 window.doorReady=start().catch(e=>{el('assemblyStatus').textContent=e.message;el('assemblyStatus').setAttribute('role','alert');el('assemblyRetry').hidden=false;console.error(e);});
})();
