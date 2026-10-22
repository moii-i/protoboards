(()=>{
  'use strict';
  const requested=new URLSearchParams(window.location.search).get('montaje');
  const variant=['comunes','redes','ls','sinuln'].includes(requested)?requested:'sinuln';
  window.DOOR_VARIANT=variant;
  const choice=document.getElementById('assemblyVariant');
  const summary=document.getElementById('assemblySummary');
  const resistorCount=document.getElementById('assemblyResistors');
  const pieceCount=document.getElementById('assemblyCount');
  const status=document.getElementById('assemblyStatus');
  const retry=document.getElementById('assemblyRetry');
  choice.value=variant;
  const descriptions={
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
    const grid=document.getElementById('assemblyPinRoles');
    grid.replaceChildren(...roles.map(([title,description])=>{
      const row=document.createElement('span'),label=document.createElement('b'),detail=document.createElement('small');
      label.textContent=title;detail.textContent=description;row.append(label,detail);return row;
    }));
    document.querySelector('[data-view="B"]').textContent=['ls','sinuln'].includes(variant)?'B · Entradas, displays y U6':'B · Entradas y displays';
    const note=document.getElementById('assemblyElectricalNote');
    note.hidden=!['ls','sinuln'].includes(variant);
    note.textContent=variant==='sinuln'?'El NE555 no reemplaza al ULN pata por pata. U4 ahora tiene 8 patas y ocupa A37–40. RL1 y RL6 de 1 kΩ son obligatorias además de las resistencias individuales: limitan la corriente de los grupos. U2/U3 deben ser 74HC02 y 74HC14. El verde cambia a alimentación desde U2.13. Sigue todos los pasos de esta variante con las fuentes desconectadas.':'Sigue este montaje completo: las resistencias de 2.2 kΩ van de MA y MC a +5 V; las de 470 Ω van de cada entrada a GND. U1 y U6 son de 14 patas: no sustituyen al multiplexor pata por pata. U6 se coloca en la placa B. Mantén el 74HC02 y el 74HC14 indicados en la guía.';
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
      item.appendChild(detail);fragment.appendChild(item);
    }
    list.replaceChildren(fragment);
  }

  async function start(){
    const prefix=variant==='sinuln'?'puerta-sinuln':variant==='ls'?'puerta-ls':variant==='redes'?'puerta-redes':'puerta';
    await loadScript('./'+prefix+'-model.js');
    showAssembly(window.DOOR_MODEL);showMaterials(window.DOOR_MODEL);
    await loadScript('./'+prefix+'-layout.js');
    await loadScript('./puerta-map.js');
    await loadScript('./puerta-guide.js');
    if(!window.doorGuide)throw new Error('La guía no terminó de iniciar.');
    status.textContent='Montaje cargado. Lógica comprobada por programa; validación eléctrica en Proteus y prueba física pendientes.';
    document.dispatchEvent(new CustomEvent('door-guide-ready',{detail:{variant}}));
  }
  window.doorReady=start().catch(error=>{
    status.textContent='No pudimos cargar el montaje completo. Revisa tu conexión y vuelve a intentarlo.';
    status.setAttribute('role','alert');retry.hidden=false;
    console.error('No se pudo iniciar la guía de puerta:',error);
  });
})();
