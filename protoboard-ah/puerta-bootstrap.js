(()=>{
  'use strict';
  const requested=new URLSearchParams(window.location.search).get('montaje');
  const variant=['comunes','redes','ls','sinuln','ls151','ls151-compacto'].includes(requested)?requested:'sinuln';
  window.DOOR_VARIANT=variant;
  document.querySelectorAll('.circuit-picker a').forEach(a=>{a.removeAttribute('aria-current');if(a.getAttribute('href')===(variant.startsWith('ls151')?'/puerta?montaje=ls151':'/puerta'))a.setAttribute('aria-current','page');});
  const choice=document.getElementById('assemblyVariant');
  const summary=document.getElementById('assemblySummary');
  const resistorCount=document.getElementById('assemblyResistors');
  const pieceCount=document.getElementById('assemblyCount');
  const status=document.getElementById('assemblyStatus');
  const retry=document.getElementById('assemblyRetry');
  choice.value=variant;
  const descriptions={
    ls151:'Nuevo · Circuito de tus videos de Proteus. Cinco integrados: LS151, LS02, LS04, NE555 y L293D. 28 resistencias, dos placas y mandos SPDT. Sin ULN ni compuertas HC.',
    'ls151-compacto':'Adaptación calculada para simplificar el físico: mismos cinco integrados, 26 resistencias. Segmentos y pull-up de 4.7 kΩ; se retiran R5/R9. Prueba eléctrica de esta adaptación pendiente; no mezcles valores con la versión de Proteus.',
    sinuln:'Sin ULN2803A: conserva tus LS02/LS08, 74HC02 y 74HC14. El NE555 se dedica al rojo; las compuertas HC controlan los displays con corriente limitada. Agrega tres resistencias de 1 kΩ y un capacitor de 100 nF. Los displays tendrán menos brillo. Sigue este recableado completo.',
    ls:'Usa los SN74LS02N y SN74LS08N que ya tienes. Dos resistencias de 2.2 kΩ adaptan las salidas LS a la lógica HC; las cinco entradas llevan 470 Ω a GND. No necesitas conseguir un 74HC153 ni otro integrado de adaptación.',
    comunes:'Este montaje usa un 74HC153 y resistencias individuales. Elige esta opción si tienes ese multiplexor; no requiere redes resistivas.',
    redes:'Este montaje usa un 74HC153 y tres redes SIP9 que agrupan resistencias con un nodo común. Cada segmento conserva su propia resistencia.'
  };
  summary.textContent=descriptions[variant];
  choice.addEventListener('change',()=>{
    const url=new URL(window.location.href);
    if(choice.value==='sinuln')url.searchParams.delete('montaje');
    else url.searchParams.set('montaje',choice.value);
    window.location.assign(url.href);
  });
  retry.addEventListener('click',()=>window.location.reload());

  function loadScript(src){
    return new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src=src;
      script.async=false;
      script.onload=resolve;
      script.onerror=()=>reject(new Error('No se pudo cargar '+src));
      document.body.appendChild(script);
    });
  }

  function showAssembly(source){
    const parts=source.components||[];
    const chips=source.counts?.integratedCircuits??parts.filter(p=>p.type==='dip').length;
    const arrays=source.counts?.resistorArrays??parts.filter(p=>p.type==='resistor-array').length;
    const resistors=source.counts?.looseResistors??source.individualResistorCount??parts.filter(p=>p.type==='resistor').length;
    const pieces=source.counts?.physicalComponents??source.physicalPartCount??parts.filter(p=>!['rail','junction'].includes(p.type)).length;
    const boards=source.boardCount||2;
    resistorCount.textContent=(arrays?arrays+' redes + ':'')+resistors+' resistencias sueltas';
    pieceCount.textContent=pieces+' piezas principales';
    document.getElementById('assemblyChips').textContent=chips+' integrados · '+boards+' placas';
    document.getElementById('heroChipCount').textContent=chips+' integrados';
    document.getElementById('heroAssembly').textContent=variant==='sinuln'
      ?'Arma la puerta con tus compuertas y un NE555 para el parpadeo rojo, sin ULN2803A. Recorre cada conexión en 2D o 3D, con el montaje completo a la vista. Tu avance se guarda. '+chips+' integrados sobre '+boards+' protoboards; displays con brillo reducido.'
      :variant==='ls'
      ?'Arma el control automático de puerta con los SN74LS02N y SN74LS08N. Sigue cada paso completo o recorre cable por cable; el 2D y el 3D muestran las mismas conexiones. Tu avance se guarda. Montaje con '+chips+' integrados sobre '+boards+' protoboards.'
      :'Arma el control automático de puerta por etapas. Sigue cada paso completo o recorre cable por cable; el 2D y el 3D muestran las mismas conexiones. Tu avance se guarda. Montaje con 74HC153: '+chips+' integrados sobre '+boards+' protoboards.';
    const roles=variant==='sinuln'
      ?[['Órdenes','U1 · SN74LS02N · NOR'],['Permisos y finales','U6 · SN74LS08N · AND · placa B'],['Control y retornos','U2 · 74HC02 · conserva HC'],['Señales y retornos','U3 · 74HC14 · conserva HC'],['Parpadeo rojo','U4 · NE555L / NE555 · 8 patas'],['Potencia','U5 · L293D · puente H']]
      :variant==='ls'
      ?[['Órdenes','U1 · SN74LS02N · NOR'],['Permisos y finales','U6 · SN74LS08N · AND · placa B'],['Control','U2 · 74HC02 · cuatro NOR'],['Señales y parpadeo','U3 · 74HC14 · seis Schmitt'],['Displays y LED','U4 · ULN2803A · en Proteus: ULN2803'],['Potencia','U5 · L293D · puente H']]
      :[['Órdenes','74HC153 · multiplexor doble'],['Control','74HC02 · cuatro NOR'],['Señales y parpadeo','74HC14 · seis Schmitt'],['Displays y LED','ULN2803A · en Proteus: ULN2803'],['Potencia','L293D · puente H'],['Dos placas','63 columnas por placa']];
    if(variant.startsWith('ls151')){roles.splice(0,roles.length,['Control','U1 · SN74LS151N'],['Estados','U2 · SN74LS02N'],['Inversión y amarillo','U3 · SN74LS04N'],['Rojo intermitente','U4 · NE555'],['Motor','U5 · L293D']);document.getElementById('heroAssembly').textContent='El circuito que construimos por bloques en Proteus, ahora cable por cable en dos protoboards. Cinco integrados disponibles, entradas SPDT y retornos independientes para amarillo y displays. '+(variant==='ls151'?'Versión de 28 resistencias probada en los videos.':'26 resistencias: reducción calculada con segmentos y pull-up de 4.7 kΩ; comprobar antes del montaje.');}
    const grid=document.getElementById('assemblyPinRoles');
    grid.replaceChildren(...roles.map(([title,description])=>{
      const row=document.createElement('span'),label=document.createElement('b'),detail=document.createElement('small');
      label.textContent=title;detail.textContent=description;row.append(label,detail);return row;
    }));
    document.querySelector('[data-view="B"]').textContent=['ls','sinuln'].includes(variant)?'B · Entradas, displays y U6':'B · Entradas y displays';
    const note=document.getElementById('assemblyElectricalNote');
    note.hidden=!['ls','sinuln'].includes(variant)&&!variant.startsWith('ls151');
    note.textContent=variant==='sinuln'?'El NE555 no reemplaza al ULN pata por pata. U4 ahora tiene 8 patas y ocupa A37–40. RL1 y RL6 de 1 kΩ son obligatorias además de las resistencias individuales: limitan la corriente de los grupos. U2/U3 deben ser 74HC02 y 74HC14. El verde cambia a alimentación desde U2.13. Sigue todos los pasos de esta variante con las fuentes desconectadas.':'Sigue este montaje completo: las resistencias de 2.2 kΩ van de MA y MC a +5 V; las de 470 Ω van de cada entrada a GND. U1 y U6 son de 14 patas: no sustituyen al multiplexor pata por pata. U6 se coloca en la placa B. Mantén el 74HC02 y el 74HC14 indicados en la guía.';
    if(variant.startsWith('ls151'))note.textContent=variant==='ls151'?'Mismos pines y valores del esquema de Proteus. Amarillo separado en NY; R5/R9 son limitadores compartidos, además de las resistencias de segmento. Mandos y finales SPDT de tres terminales. Montaje físico pendiente.':'Solo cambian resistencias: 14 segmentos y 7 pull-up pasan a 4.7 kΩ; R5/R9 desaparecen. No añadas puentes sobre resistencias de 1 kΩ: sigue el montaje completo de esta variante. Brillo moderado; adaptación calculada pendiente de prueba eléctrica.';
  }

  function showMaterials(source){
    const list=document.getElementById('assemblyMaterials');
    if(!source?.materials?.length)return;
    const fragment=document.createDocumentFragment();
    for(const material of source.materials){
      const item=document.createElement('li'),title=document.createElement('b');
      const name=String(material.name),quantity=material.quantity;
      title.textContent=quantity===3&&/^LED amarillo, verde y rojo$/i.test(name)
        ?'3 LED: amarillo, verde y rojo'
        :quantity==='según la guía'?name:quantity+' × '+name;
      item.appendChild(title);
      const detail=document.createElement('span');
      if(/NE555/i.test(name))detail.textContent='U4 de 8 patas: genera el parpadeo rojo. Sigue el pinout nuevo; no es un sustituto directo del ULN.';
      else if(/ULN2803/i.test(name))detail.textContent='En Proteus selecciona ULN2803; revisa sus terminales.';
      else if(/SIP9|red.*resisten/i.test(name))detail.textContent='Ocho resistencias por red. Comprueba su pin común antes de conectar.';
      else if(/74LS02/i.test(name))detail.textContent='U1: NOR para bloquear STOP y la orden contraria. DIP de 14 patas, placa A.';
      else if(/74LS08/i.test(name))detail.textContent='U6: AND para combinar la orden permitida y su final de carrera. DIP de 14 patas, placa B.';
      else if(/Display/i.test(name))detail.textContent='Ánodo común; confirma pinout y separación de filas del modelo comprado.';
      else if(/enclavamiento/i.test(name))detail.textContent='Mantén la orden activa durante STOP y libérala al terminar el recorrido.';
      else if(/Final de carrera/i.test(name))detail.textContent='Usa COM y NC; el contacto abre al alcanzar su extremo.';
      else if(/Motor CC/i.test(name))detail.textContent='Comprueba corriente de bloqueo y capacidad del L293D.';
      else if(/^Protoboard/i.test(name))detail.textContent=['ls','sinuln'].includes(variant)?'Placa A: cinco integrados. Placa B: entradas, indicadores y U6 · 74LS08.':'Placa A: integrados. Placa B: entradas e indicadores.';
      else if(/Cables/i.test(name))detail.textContent='Sigue los extremos exactos de cada conexión del visor.';
      else if(/Fuente/i.test(name))detail.textContent='Lógica a 5 V y motor a 6 V, con tierras comunes.';
      else if(/2[.,]2\s*k/i.test(name))detail.textContent='Pull-up de MA y MC a +5 V: permite conectar las salidas LS con la lógica HC.';
      else if(/470\s*(Ω|ohm)/i.test(name))detail.textContent='Pull-down de las cinco entradas a GND. En esta variante no uses 10 kΩ.';
      else if(/Resistencia/i.test(name))detail.textContent='Respeta el valor indicado; cada segmento mantiene su resistencia.';
      else if(/Capacitor/i.test(name))detail.textContent='Revisa la polaridad cuando el capacitor sea electrolítico.';
      else detail.textContent='Coloca y conecta esta pieza en la etapa indicada por la guía.';
      if(variant.startsWith('ls151')){if(/74LS151/.test(name))detail.textContent='U1, DIP16: utiliza uno de tus seis multiplexores.';else if(/74LS02/.test(name))detail.textContent='U2, DIP14: tres NOR de estados, una libre.';else if(/74LS04/.test(name))detail.textContent='U3, DIP14: inversión de estados y salida NY independiente.';else if(/NE555/.test(name))detail.textContent='U4, DIP8: solo parpadeo rojo; 0.72 Hz nominal.';else if(/^Protoboard/.test(name))detail.textContent='A: cinco integrados y alimentación. B: displays, LEDs y conexiones de mandos externos.';else if(/Final de carrera/.test(name))detail.textContent='COM=señal; NC=5 V y NO=GND. Permiso 0 al llegar al extremo.';else if(/SPDT/.test(name))detail.textContent='Tres terminales; COM elige +5 V o GND. Mantén la orden durante STOP.';else if(/Resistencia/.test(name))detail.textContent='Usa este valor en la variante seleccionada. Su función se indica en cada paso.';}
      item.appendChild(detail);fragment.appendChild(item);
    }
    list.replaceChildren(fragment);
  }

  async function start(){
    const prefix=variant.startsWith('ls151')?'puerta-'+variant:variant==='sinuln'?'puerta-sinuln':variant==='ls'?'puerta-ls':variant==='redes'?'puerta-redes':'puerta';
    await loadScript('./'+prefix+'-model.js');
    showAssembly(window.DOOR_MODEL);showMaterials(window.DOOR_MODEL);
    await loadScript('./'+prefix+'-layout.js');
    if(variant.startsWith('ls151')){const b=document.createElement('button');b.type='button';b.dataset.view='motor';b.textContent='Motor externo';b.setAttribute('aria-pressed','false');document.querySelector('.view-buttons').appendChild(b);const badge=document.createElement('span');badge.textContent='14 jumpers menos · resistencias junto al display';document.querySelector('.assembly-badges').appendChild(badge);}
    await loadScript('./puerta-map.js');
    await loadScript('./puerta-guide.js');
    await loadScript('./puerta-studio.js');
    if(!window.doorGuide)throw new Error('La guía no terminó de iniciar.');
    status.textContent='Montaje cargado. Lógica comprobada por programa; validación eléctrica en Proteus y prueba física pendientes.';
    if(variant.startsWith('ls151'))status.textContent=variant==='ls151'?'Lógica funcional observada en tus videos de Proteus. Coordenadas y conexiones verificadas por programa. Brillo y montaje físico pendientes.':'Adaptación calculada: coordenadas y lógica verificadas por programa. Resistencias modificadas pendientes de prueba eléctrica en Proteus y montaje físico.';
    document.dispatchEvent(new CustomEvent('door-guide-ready',{detail:{variant}}));
  }
  window.doorReady=start().catch(error=>{
    status.textContent='No pudimos cargar el montaje completo. Revisa tu conexión y vuelve a intentarlo.';
    status.setAttribute('role','alert');retry.hidden=false;
    console.error('No se pudo iniciar la guía de puerta:',error);
  });
})();
