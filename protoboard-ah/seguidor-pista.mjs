// Pista y carrito: vista 3D con el modelo real (seguidor-carro-3d.js) o vista desde arriba (canvas).
// Las dos dibujan la misma simulación; el cálculo vive en seguidor-sim.mjs.
import { createSim, track, mat, car } from './seguidor-sim.mjs';

const surfaces = { negra: { floor: '#f3f2ec', line: '#17191b', edge: '#d9d8cf' }, blanca: { floor: '#17191b', line: '#f3f2ec', edge: '#33373a' } };
const actionText = { avanza: 'Avanza', izquierda: 'Gira a la izquierda', derecha: 'Gira a la derecha', alto: 'Frena' };
const motorWord = { avanza: 'avanza', freno: 'freno', reversa: 'reversa', libre: 'libre' };
const RIDE_URL = './seguidor-carro-3d.js?v=4', GLB_URL = './agv/agv-seguidor.glb?v=4';
const webgl = () => { try { return Boolean(document.createElement('canvas').getContext('webgl2')); } catch { return false; } };
const canvasColor = () => getComputedStyle(document.documentElement).getPropertyValue('--appearance-canvas').trim() || '#e7ece6';

export function mountTrack({ canvas, stage3d, evaluate, selector = 0, onSelector, onReading }) {
  const ctx = canvas.getContext('2d');
  const sim = createSim({ evaluate });
  const $ = id => document.getElementById(id);
  const stage = canvas.parentElement;
  let mode = 'negra', running = false, rate = 1, last = 0, frame = 0, visible = true, trail = [];
  let view = stage3d && webgl() ? '3d' : '2d', cameraMode = 'seguir', ride = null, rideLoading = null, rideFailed = false;
  sim.reset({ mode, selector });

  function resize() {
    if (view !== '2d') return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2), width = canvas.clientWidth || 900;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(width * ratio * mat.height / mat.width);
    draw();
  }
  function roundRect(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
  function draw() {
    if (view !== '2d') return;
    const s = canvas.width / mat.width, st = sim.state, colors = surfaces[st.mode];
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = colors.floor; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(s, 0, 0, s, 0, 0);
    // Cinta: línea central con el ancho real.
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.beginPath();
    track.path.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
    ctx.closePath();
    ctx.strokeStyle = colors.line; ctx.lineWidth = mat.line; ctx.stroke();
    // Salida: marca perpendicular junto a la cinta.
    const [x0, y0] = track.path[0], [x1, y1] = track.path[3], a = Math.atan2(y1 - y0, x1 - x0);
    ctx.save(); ctx.translate(x0, y0); ctx.rotate(a);
    ctx.fillStyle = '#c9a256'; ctx.fillRect(-3, -48, 6, 30); ctx.fillRect(-3, 18, 6, 30);
    ctx.restore();
    // Rastro de los sensores.
    if (trail.length > 1) {
      ctx.beginPath(); trail.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.strokeStyle = 'rgba(61,170,120,.55)'; ctx.lineWidth = 3; ctx.stroke();
    }
    drawCar(st);
  }
  function drawCar(st) {
    const { x, y, heading } = st, half = car.track / 2;
    ctx.save(); ctx.translate(x, y); ctx.rotate(heading);
    // Rueda loca atrás, en el extremo angosto.
    ctx.beginPath(); ctx.arc(-62, 0, 9, 0, Math.PI * 2); ctx.fillStyle = '#8b969a'; ctx.fill();
    // Placa de acrílico como el modelo 3D: cuerpo de 106 mm y tope curvo de 147 mm al frente (eje en x = 0, frente hacia +x).
    ctx.beginPath(); ctx.moveTo(84, -53); ctx.lineTo(-68, -53); ctx.arcTo(-78, -53, -78, -43, 10); ctx.lineTo(-78, 43); ctx.arcTo(-78, 53, -68, 53, 10); ctx.lineTo(84, 53); ctx.lineTo(86, 70);
    ctx.ellipse(89.5, 0, 42.5, 73.5, 0, Math.PI / 2, -Math.PI / 2, true); ctx.lineTo(86, -70); ctx.closePath();
    ctx.fillStyle = 'rgba(196,222,232,.66)'; ctx.fill(); ctx.strokeStyle = '#5f7f8b'; ctx.lineWidth = 3; ctx.stroke();
    // Portapilas 4 × AA al frente y protoboard atrás, entre los sujetadores y la rueda loca.
    roundRect(28, -29, 62, 58, 6); ctx.fillStyle = '#2a2d31'; ctx.fill();
    roundRect(-44.5, -41, 54.5, 82, 5); ctx.fillStyle = '#f6f3ea'; ctx.fill(); ctx.strokeStyle = '#b8b5aa'; ctx.lineWidth = 2; ctx.stroke();
    // Ruedas por fuera de la placa: verde = avanza, roja = freno.
    for (const [side, m] of [[-1, st.motors.left], [1, st.motors.right]]) {
      const wy = side * half;
      roundRect(-car.wheel / 2, wy - 13, car.wheel, 26, 7); ctx.fillStyle = '#1e2124'; ctx.fill();
      ctx.fillStyle = m === 'avanza' ? '#3ddc97' : '#e0574d';
      ctx.fillRect(-car.wheel / 2 + 8, wy - 3, car.wheel - 16, 6);
    }
    // Sensores bajo el tope: punto verde si ese sensor está sobre la línea; LED del módulo encendido con superficie blanca.
    const gap = car.sensorGap / 2;
    for (const sy of [-1, 1]) { roundRect(car.sensorAhead - 7, sy * 2 - (sy < 0 ? 32 : 0), 14, 32, 4); ctx.fillStyle = '#1d5fa8'; ctx.fill(); }
    for (const [name, sy] of [['SI', -gap], ['SD', gap]]) {
      const black = st.sensors[name] === 1, onLine = (black ? 1 : 0) ^ st.selector;
      ctx.beginPath(); ctx.arc(car.sensorAhead, sy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = onLine ? '#3ddc97' : '#9aa5a0'; ctx.fill();
      ctx.beginPath(); ctx.arc(car.sensorAhead + 2, sy * 4.6, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = black ? '#1f3d2a' : '#46ff84'; ctx.fill();
    }
    ctx.restore();
  }

  // Vista 3D: carga diferida del mismo bundle del ensamblado (three.js una sola vez).
  function loadRide() {
    if (ride || rideLoading || rideFailed || !stage3d) return rideLoading;
    stage3d.dataset.state = 'loading';
    rideLoading = import(RIDE_URL).then(({ createRide }) => new Promise((resolve, reject) => {
      const r = createRide({ container: stage3d, url: GLB_URL, track, mat, car, background: canvasColor(), mode: sim.state.mode,
        onReady: () => { ride = r; stage3d.dataset.state = 'ready'; ride.setCamera(cameraMode); refresh(); paintReadout(); resolve(r); },
        onFailure: error => reject(error) });
      window.followerRide = r;
    })).catch(error => { console.error(error); rideFailed = true; rideLoading = null; stage3d.dataset.state = 'failed'; setView('2d'); paintReadout(); });
    return rideLoading;
  }
  function setView(v) {
    view = v === '3d' && stage3d && !rideFailed ? '3d' : '2d';
    if (stage3d) stage3d.hidden = view !== '3d';
    canvas.hidden = view !== '2d';
    stage.classList.toggle('is-3d', view === '3d');
    if (view === '3d') loadRide(); else resize();
    refresh(); paintReadout();
  }
  function setCamera(name) {
    cameraMode = name; ride?.setCamera(name);
    if (stage3d) stage3d.classList.toggle('is-free', name === 'libre');
    paintReadout();
  }
  // Redibuja la vista activa sin avanzar la simulación.
  function refresh() { if (view === '3d') ride?.update(sim.state, 0); else draw(); }

  const lineState = st => ({ li: st.sensors.SI ^ st.selector, ld: st.sensors.SD ^ st.selector });
  function actionOf(st) {
    const { left, right } = st.motors;
    if (left === 'avanza' && right === 'avanza') return 'avanza';
    if (right === 'avanza') return 'izquierda';
    if (left === 'avanza') return 'derecha';
    return 'alto';
  }
  function paintReadout() {
    const st = sim.state, { li, ld } = lineState(st);
    $('simSensors').textContent = st.sensors.SI + ' · ' + st.sensors.SD;
    $('simSel').textContent = st.selector + (st.selector ? ' · BLANCA' : ' · NEGRA');
    $('simLine').textContent = li + ' · ' + ld;
    $('simMotors').textContent = 'izq. ' + motorWord[st.motors.left] + ' · der. ' + motorWord[st.motors.right];
    $('simAction').textContent = actionText[actionOf(st)];
    $('simLaps').textContent = Math.max(0, sim.laps()).toLocaleString('es-MX', { maximumFractionDigits: 1 });
    const mismatch = (st.mode === 'negra') !== (st.selector === 0);
    let text = '';
    if (view === '3d' && !ride && !rideFailed) text = 'Cargando el carrito en 3D…';
    else if (st.status === 'fuera') text = st.reason + ' Pulsa Reiniciar.';
    else if (st.status === 'alto') text = st.reason + (mismatch ? ' El selector no coincide con la pista: con SW1 en ' + (st.selector ? 'BLANCA' : 'NEGRA') + ' los sensores interpretan la cinta al revés.' : ' Respuesta segura: se queda detenido hasta que un sensor vuelva a ver la línea.');
    else if (running) text = 'Siguiendo la cinta ' + (st.mode === 'negra' ? 'negra' : 'blanca') + ' · ' + actionText[actionOf(st)].toLowerCase() + '.';
    else text = mismatch ? 'El selector no coincide con la pista. Inicia para ver qué pasa.' : 'Listo. Pulsa Iniciar.';
    if (rideFailed && view === '2d' && stage3d) text = 'No se pudo cargar la vista 3D; se muestra la pista desde arriba. ' + text;
    if ($('simStatus').textContent !== text) $('simStatus').textContent = text;
    $('simRun').textContent = running ? '❚❚ Pausar' : '▶ Iniciar';
    $('simRun').setAttribute('aria-pressed', String(running));
    for (const b of document.querySelectorAll('[data-sim-mode]')) b.setAttribute('aria-pressed', String(b.dataset.simMode === st.mode));
    for (const b of document.querySelectorAll('[data-sim-speed]')) b.setAttribute('aria-pressed', String(Number(b.dataset.simSpeed) === rate));
    for (const b of document.querySelectorAll('[data-sim-view]')) b.setAttribute('aria-pressed', String(b.dataset.simView === view));
    for (const b of document.querySelectorAll('[data-sim-camera]')) b.setAttribute('aria-pressed', String(b.dataset.simCamera === cameraMode));
    const cams = $('simCameras'); if (cams) cams.hidden = view !== '3d';
    onReading?.({ SEL: st.selector, SI: st.sensors.SI, SD: st.sensors.SD });
  }
  // Avanza la simulación dt segundos en pasos de 1/240 s y actualiza la vista activa.
  function advance(dt) {
    for (let t = 0; t < dt - 1e-9; t += 1 / 240) sim.step(Math.min(1 / 240, dt - t));
    const p = sim.sensorPoints().center;
    if (view === '3d') ride?.update(sim.state, dt, p);
    else { trail.push(p); if (trail.length > 900) trail.shift(); draw(); }
    return sim.state;
  }
  function loop(now) {
    frame = 0;
    if (!running) return;
    const dt = Math.min(1 / 30, (now - last) / 1000 || 0) * rate; last = now;
    if (visible) {
      advance(dt);
      if (sim.state.status === 'alto' || sim.state.status === 'fuera') running = false;
      paintReadout();
    }
    if (running) frame = requestAnimationFrame(loop);
  }
  function start() { if (running) return; running = true; last = performance.now(); if (sim.state.status === 'alto') sim.state.status = 'listo'; frame = requestAnimationFrame(loop); paintReadout(); }
  function pause() { running = false; cancelAnimationFrame(frame); paintReadout(); }
  function reset() { pause(); trail = []; ride?.resetTrail(); sim.reset({ mode, selector: sim.state.selector }); refresh(); paintReadout(); }

  $('simRun').onclick = () => (running ? pause() : start());
  $('simReset').onclick = reset;
  $('simNudge').onclick = () => { sim.nudge(45); trail = []; ride?.resetTrail(); refresh(); paintReadout(); if (!running) start(); };
  // Cambiar de pista mueve SW1 a su posición; después se puede cambiar SW1 para ver qué pasa si no coinciden.
  for (const b of document.querySelectorAll('[data-sim-mode]')) b.onclick = () => { mode = b.dataset.simMode; sim.setMode(mode); sim.setSelector(mode === 'blanca' ? 1 : 0); onSelector?.(sim.state.selector); ride?.setMode(mode); refresh(); paintReadout(); };
  for (const b of document.querySelectorAll('[data-sim-speed]')) b.onclick = () => { rate = Number(b.dataset.simSpeed); paintReadout(); };
  for (const b of document.querySelectorAll('[data-sim-view]')) b.onclick = () => setView(b.dataset.simView);
  for (const b of document.querySelectorAll('[data-sim-camera]')) b.onclick = () => setCamera(b.dataset.simCamera);
  new ResizeObserver(resize).observe(canvas);
  // La vista 3D se carga al acercarse a la sección; mientras tanto no cuesta nada.
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) { last = performance.now(); if (view === '3d') loadRide(); } }, { rootMargin: '400px 0px' }).observe(stage);
  document.addEventListener('visibilitychange', () => { if (document.hidden && running) pause(); });
  document.addEventListener('workspace-appearance-change', () => { ride?.setBackground(canvasColor()); draw(); });
  setView(view);

  return {
    setSelector(v) { sim.setSelector(v); onSelector?.(sim.state.selector); refresh(); paintReadout(); },
    get state() { return sim.state; },
    get view() { return view; },
    start, pause, reset, advance, setView, setCamera,
    setMode(m) { mode = m; sim.setMode(m); sim.setSelector(m === 'blanca' ? 1 : 0); onSelector?.(sim.state.selector); ride?.setMode(m); refresh(); paintReadout(); },
    ready: () => loadRide() || Promise.resolve(ride),
    laps: () => sim.laps()
  };
}
