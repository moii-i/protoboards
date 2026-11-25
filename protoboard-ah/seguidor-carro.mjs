// Sección «Ensamblado del carrito»: pasos, controles y carga diferida del visor 3D.
// Coordenadas del modelo: metros, Y hacia arriba, frente del carrito hacia −Z.
export const assemblySteps = [
  { title: 'Chasis y sujetadores', parts: 0, offset: [0, .06, 0], camera: [.22, .21, -.25], target: [0, .045, -.027],
    text: 'Quita el papel protector de la placa y de los cuatro sujetadores. El tope ancho es el frente. Mete cada sujetador por su ranura en cruz, dos por motor, con la barra apoyada sobre la placa.', need: 'Placa de acrílico del kit 2WD y 4 sujetadores' },
  { title: 'Motores', parts: 1, offset: [0, -.05, 0], camera: [.17, .045, .1], target: [.035, .03, -.02],
    text: 'Pon el encoder en el eje interior de cada motor. El motor va bajo la placa, entre sus dos sujetadores, con la lata hacia el frente. Atornilla desde afuera con dos M3 × 30 y aprieta las tuercas por dentro.', need: '2 motores TT, 2 encoders, 4 tornillos M3 × 30, 4 tuercas M3, desarmador de cruz' },
  { title: 'Ruedas', parts: 2, offset: [0, 0, 0], camera: [.27, .09, .06], target: [0, .03, -.01],
    text: 'Empuja cada rueda en el eje en forma de D hasta el tope. Quedan por fuera de la placa: deben girar sin rozarla ni tocar las cabezas de los tornillos.', need: '2 ruedas de 65 mm' },
  { title: 'Rueda loca', parts: 3, offset: [0, -.04, 0], camera: [.17, .05, .22], target: [0, .022, .05],
    text: 'Va atrás, en el extremo angosto. Atornilla los cuatro postes de latón de 12 mm bajo la placa con M3 × 6 desde arriba; después la rueda loca con otros cuatro M3 × 6. La placa queda a 44 mm del piso, igual que sobre el eje de las ruedas.', need: 'Rueda loca giratoria, 4 postes L12, 8 tornillos M3 × 6' },
  { title: 'Sensores', parts: 4, offset: [0, -.035, 0], camera: [.08, .022, -.205], target: [0, .016, -.118],
    text: 'Van bajo el tope, en espejo, con el TCRT5000 hacia el centro y los pines hacia afuera: así quedan a 12 mm y caben sobre una cinta de 19 mm. Cada uno cuelga de un poste de 30 mm atornillado en la ranura del tope, a unos 5 mm del piso.', need: '2 módulos TCRT5000 (MH-Sensor-Series), 2 postes M3 de 30 mm, 4 tornillos M3 × 6' },
  { title: 'Portapilas', parts: 5, offset: [0, .07, 0], camera: [.21, .2, -.2], target: [0, .055, -.059],
    text: 'El portapilas 4 × AA va al frente, sobre las ventanas en cruz, con dos tornillos de cabeza plana y tuerca. Es la única fuente del carrito: no lleva pila de 9 V. Pon las pilas hasta el final.', need: 'Portapilas 4 × AA, 2 tornillos M3 × 6 de cabeza plana con tuerca' },
  { title: 'Protoboard', parts: 6, offset: [0, .07, 0], camera: [.035, .2, .12], target: [0, .057, .017],
    text: 'Arma el circuito fuera del carrito con la guía de arriba y pega la protoboard atrás, entre los sujetadores y la rueda loca: fila a hacia el frente y columna 1 a la izquierda. SW1 queda en la esquina frontal izquierda y SW2 a la derecha, en OFF.', need: 'Protoboard armada (guía de montaje)' },
  { title: 'Cables', parts: 7, offset: [0, .04, 0], camera: [.23, .17, -.27], target: [0, .05, -.03],
    text: 'Los cables de cada sensor bajan por las tres ventanas de su lado del tope; los de cada motor, por el agujero junto a su lata. Al último, con SW2 en OFF, conecta el portapilas: rojo a a25 y negro al riel azul.', need: '10 cables dupont macho-hembra de 20 cm' },
  { title: 'Listo para la pista', parts: 7, camera: [.27, .17, -.31], target: [0, .04, -.03],
    text: 'Pasa SW2 a ON. Revisa la altura de los sensores y que las ruedas giren hacia adelante. SW1 en NEGRA sobre cinta negra; en BLANCA sobre cinta blanca, sin mover ningún cable.', need: 'Pista de prueba con cinta negra y blanca' }
];

export function mountAssembly(section) {
  const $ = s => section.querySelector(s), stage = $('.car-stage'), list = $('.car-steps'), status = $('.car-status');
  let viewer = null, loading = null, step = 0, timer = null;
  const motion = () => document.documentElement.dataset.workspaceMotion === 'full' && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvasColor = () => getComputedStyle(document.documentElement).getPropertyValue('--appearance-canvas').trim() || '#e7ece6';
  assemblySteps.forEach((s, i) => {
    const li = document.createElement('li'), b = document.createElement('button');
    b.type = 'button'; b.dataset.carStep = i; b.innerHTML = '<span>' + (i + 1) + '</span><b></b>'; b.querySelector('b').textContent = s.title;
    b.onclick = () => { stop(); show(i); };
    li.append(b); list.append(li);
  });
  function paint() {
    const s = assemblySteps[step];
    for (const b of list.querySelectorAll('[data-car-step]')) b.setAttribute('aria-current', Number(b.dataset.carStep) === step ? 'step' : 'false');
    $('.car-step-title').textContent = (step + 1) + ' · ' + s.title;
    $('.car-step-text').textContent = s.text;
    $('.car-step-need').textContent = s.need;
    $('[data-car-prev]').disabled = step === 0;
    $('[data-car-next]').disabled = step === assemblySteps.length - 1;
    $('[data-car-play]').textContent = timer ? '❚❚ Pausar' : '▶ Ver todo el ensamblado';
    $('[data-car-play]').setAttribute('aria-pressed', String(Boolean(timer)));
  }
  function show(i) { step = Math.max(0, Math.min(assemblySteps.length - 1, i)); viewer?.goTo(step); paint(); }
  function stop() { clearInterval(timer); timer = null; paint(); }
  function play() {
    if (timer) return stop();
    if (step === assemblySteps.length - 1) show(0);
    timer = setInterval(() => { if (step >= assemblySteps.length - 1) return stop(); show(step + 1); }, 3600); // da tiempo a que entren los tornillos de cada paso
    paint();
  }
  function load() {
    if (loading) return loading;
    status.textContent = 'Cargando el modelo 3D del carrito…';
    loading = import('./seguidor-carro-3d.js?v=3').then(({ createAssembly }) => new Promise((resolve, reject) => {
      viewer = createAssembly({ container: stage, url: './agv/agv-seguidor.glb?v=3', steps: assemblySteps, background: canvasColor(), motion,
        onReady: () => { section.classList.add('is-ready'); status.textContent = ''; viewer.goTo(step); resolve(viewer); },
        onFailure: error => { status.textContent = 'No se pudo cargar el modelo 3D. La imagen muestra el carrito armado.'; reject(error); } });
      window.agvAssembly = viewer;
    })).catch(error => console.error(error));
    return loading;
  }
  $('[data-car-prev]').onclick = () => { stop(); show(step - 1); };
  $('[data-car-next]').onclick = () => { stop(); show(step + 1); };
  $('[data-car-play]').onclick = () => { load(); play(); };
  document.addEventListener('workspace-appearance-change', () => viewer?.setBackground(canvasColor()));
  new IntersectionObserver((entries, io) => { if (entries.some(e => e.isIntersecting)) { io.disconnect(); load(); } }, { rootMargin: '600px 0px' }).observe(section);
  paint();
  return { show, load, get step() { return step; } };
}
