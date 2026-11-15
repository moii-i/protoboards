// Sección «Ensamblado del carrito»: pasos, controles y carga diferida del visor 3D.
// Coordenadas del modelo: metros, Y hacia arriba, frente del carrito hacia −Z.
export const assemblySteps = [
  { title: 'Chasis', parts: 0, offset: [0, .08, 0], camera: [.21, .2, -.24], target: [0, .045, -.04],
    text: 'Quita el papel protector del acrílico. La ranura ancha va al frente: por ahí bajan los cables de los sensores.', need: 'Placa de acrílico del kit' },
  { title: 'Motores', parts: 1, offset: [0, -.05, 0], camera: [.25, .06, .04], target: [0, .03, -.005],
    text: 'Cada motorreductor TT va bajo la placa entre dos soportes de acrílico, con dos tornillos M3 de 30 mm. Las terminales miran al frente. Si los motores no traen cables, suelda uno rojo y uno negro antes de montarlos.', need: '2 motores TT, 4 soportes, 4 tornillos M3 × 30 con tuerca, destornillador' },
  { title: 'Ruedas', parts: 2, offset: [0, .07, 0], camera: [.26, .11, .02], target: [0, .03, -.01],
    text: 'Empuja cada rueda en el eje en forma de D hasta el tope. Deben girar sin rozar la placa ni los soportes.', need: '2 ruedas de 66 mm' },
  { title: 'Rueda loca', parts: 3, offset: [0, -.045, 0], camera: [.16, .045, -.26], target: [0, .02, -.09],
    text: 'Adelante y centrada, con dos separadores de unos 30 mm: la placa debe quedar horizontal, a unos 46 mm del piso, igual que en el eje de las ruedas.', need: 'Rueda loca de bola, 2 separadores, 2 tornillos M3' },
  { title: 'Sensores', parts: 4, offset: [0, -.04, 0], camera: [.11, .035, -.3], target: [0, .014, -.125],
    text: 'Los dos módulos van en espejo, con el TCRT5000 de cada uno hacia el centro: así quedan a 12 mm y caben sobre una cinta de 19 mm. Un separador de latón por módulo los deja a 3–8 mm del piso.', need: '2 sensores, 2 separadores de 30 mm, tornillos M3' },
  { title: 'Pilas', parts: 5, offset: [0, .08, 0], camera: [.24, .23, -.15], target: [0, .055, -.02],
    text: 'El portapilas 4 × AA va atrás, sobre los motores, y la pila de 9 V al frente con el broche hacia la derecha. Usa cinta doble cara; pon las pilas hasta el final.', need: 'Portapilas 4 × AA, pila de 9 V con broche, cinta doble cara' },
  { title: 'Protoboard', parts: 6, offset: [0, .08, 0], camera: [.04, .24, -.09], target: [0, .057, -.032],
    text: 'Arma el circuito fuera del carrito con la guía de arriba y después pega la protoboard al centro: fila a hacia el frente y columna 1 a la izquierda. SW1 queda en la esquina frontal izquierda.', need: 'Protoboard armada (guía de montaje)' },
  { title: 'Cables', parts: 7, offset: [0, .05, 0], camera: [.21, .17, -.27], target: [0, .05, -.06],
    text: 'Los seis cables de los sensores bajan por la ranura frontal. Los de cada motor suben por su agujero lateral. Al último, el broche de 9 V y el portapilas a los rieles, con el carrito levantado.', need: '14 cables dupont macho-hembra' },
  { title: 'Listo para la pista', parts: 7, camera: [.25, .17, -.3], target: [0, .04, -.04],
    text: 'Revisa la altura de los sensores y que las ruedas giren hacia adelante. SW1 en NEGRA sobre cinta negra; en BLANCA sobre cinta blanca, sin mover ningún cable.', need: 'Pista de prueba con cinta negra y blanca' }
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
    timer = setInterval(() => { if (step >= assemblySteps.length - 1) return stop(); show(step + 1); }, 2600);
    paint();
  }
  function load() {
    if (loading) return loading;
    status.textContent = 'Cargando el modelo 3D del carrito…';
    loading = import('./seguidor-carro-3d.js?v=1').then(({ createAssembly }) => new Promise((resolve, reject) => {
      viewer = createAssembly({ container: stage, url: './agv/agv-seguidor.glb', steps: assemblySteps, background: canvasColor(), motion,
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
