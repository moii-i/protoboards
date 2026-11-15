// Vista desde arriba de la pista y el carrito. El cálculo vive en seguidor-sim.mjs.
import { createSim, track, mat, car } from './seguidor-sim.mjs';

const surfaces = { negra: { floor: '#f3f2ec', line: '#17191b', edge: '#d9d8cf' }, blanca: { floor: '#17191b', line: '#f3f2ec', edge: '#33373a' } };
const actionText = { avanza: 'Avanza', izquierda: 'Gira a la izquierda', derecha: 'Gira a la derecha', alto: 'Frena' };
const motorWord = { avanza: 'avanza', freno: 'freno', reversa: 'reversa', libre: 'libre' };

export function mountTrack({ canvas, evaluate, selector = 0, onSelector, onReading }) {
  const ctx = canvas.getContext('2d');
  const sim = createSim({ evaluate });
  const $ = id => document.getElementById(id);
  let mode = 'negra', running = false, rate = 1, last = 0, frame = 0, visible = true, trail = [];
  sim.reset({ mode, selector });

  function resize() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2), width = canvas.clientWidth || 900;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(width * ratio * mat.height / mat.width);
    draw();
  }
  function roundRect(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
  function draw() {
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
    // Chasis de acrílico (eje en x = 0, frente hacia +x).
    roundRect(-70, -car.width / 2, car.length, car.width, 18);
    ctx.fillStyle = 'rgba(196,222,232,.72)'; ctx.fill(); ctx.strokeStyle = '#5f7f8b'; ctx.lineWidth = 3; ctx.stroke();
    // Protoboard y pilas.
    roundRect(-6, -28, 82, 56, 6); ctx.fillStyle = '#f6f3ea'; ctx.fill(); ctx.strokeStyle = '#b8b5aa'; ctx.lineWidth = 2; ctx.stroke();
    roundRect(-62, -34, 46, 68, 6); ctx.fillStyle = '#2a2d31'; ctx.fill();
    // Rueda loca.
    ctx.beginPath(); ctx.arc(-56, 0, 9, 0, Math.PI * 2); ctx.fillStyle = '#8b969a'; ctx.fill();
    // Ruedas: verde = avanza, roja = freno.
    for (const [side, m] of [[-1, st.motors.left], [1, st.motors.right]]) {
      const wy = side * half;
      roundRect(-car.wheel / 2, wy - 13 + side * 4, car.wheel, 26, 7); ctx.fillStyle = '#1e2124'; ctx.fill();
      ctx.fillStyle = m === 'avanza' ? '#3ddc97' : '#e0574d';
      ctx.fillRect(-car.wheel / 2 + 8, wy - 3 + side * 4, car.wheel - 16, 6);
    }
    // Sensores: punto verde si ese sensor está sobre la línea; LED rojo del módulo con superficie blanca.
    const gap = car.sensorGap / 2;
    roundRect(car.sensorAhead - 14, -24, 28, 48, 5); ctx.fillStyle = '#1d5fa8'; ctx.fill();
    for (const [name, sy] of [['SI', -gap], ['SD', gap]]) {
      const black = st.sensors[name] === 1, onLine = (black ? 1 : 0) ^ st.selector;
      ctx.beginPath(); ctx.arc(car.sensorAhead, sy, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = onLine ? '#3ddc97' : '#9aa5a0'; ctx.fill();
      ctx.beginPath(); ctx.arc(car.sensorAhead - 9, sy * 3.2, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = black ? '#5a2a26' : '#ff4b3e'; ctx.fill();
    }
    ctx.restore();
  }

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
    if (st.status === 'fuera') text = st.reason + ' Pulsa Reiniciar.';
    else if (st.status === 'alto') text = st.reason + (mismatch ? ' El selector no coincide con la pista: con SW1 en ' + (st.selector ? 'BLANCA' : 'NEGRA') + ' los sensores interpretan la cinta al revés.' : ' Respuesta segura: se queda detenido hasta que un sensor vuelva a ver la línea.');
    else if (running) text = 'Siguiendo la cinta ' + (st.mode === 'negra' ? 'negra' : 'blanca') + ' · ' + actionText[actionOf(st)].toLowerCase() + '.';
    else text = mismatch ? 'El selector no coincide con la pista. Inicia para ver qué pasa.' : 'Listo. Pulsa Iniciar.';
    if ($('simStatus').textContent !== text) $('simStatus').textContent = text;
    $('simRun').textContent = running ? '❚❚ Pausar' : '▶ Iniciar';
    $('simRun').setAttribute('aria-pressed', String(running));
    for (const b of document.querySelectorAll('[data-sim-mode]')) b.setAttribute('aria-pressed', String(b.dataset.simMode === st.mode));
    for (const b of document.querySelectorAll('[data-sim-speed]')) b.setAttribute('aria-pressed', String(Number(b.dataset.simSpeed) === rate));
    onReading?.({ SEL: st.selector, SI: st.sensors.SI, SD: st.sensors.SD });
  }
  function loop(now) {
    frame = 0;
    if (!running) return;
    const dt = Math.min(1 / 30, (now - last) / 1000 || 0) * rate; last = now;
    if (visible) {
      for (let t = 0; t < dt; t += 1 / 240) sim.step(Math.min(1 / 240, dt - t));
      const p = sim.sensorPoints().center;
      trail.push(p); if (trail.length > 900) trail.shift();
      if (sim.state.status === 'alto' || sim.state.status === 'fuera') running = false;
      draw(); paintReadout();
    }
    if (running) frame = requestAnimationFrame(loop);
  }
  function start() { if (running) return; running = true; last = performance.now(); if (sim.state.status === 'alto') sim.state.status = 'listo'; frame = requestAnimationFrame(loop); paintReadout(); }
  function pause() { running = false; cancelAnimationFrame(frame); paintReadout(); }
  function reset() { pause(); trail = []; sim.reset({ mode, selector: sim.state.selector }); draw(); paintReadout(); }

  $('simRun').onclick = () => (running ? pause() : start());
  $('simReset').onclick = reset;
  $('simNudge').onclick = () => { sim.nudge(45); trail = []; draw(); paintReadout(); if (!running) start(); };
  for (const b of document.querySelectorAll('[data-sim-mode]')) b.onclick = () => { mode = b.dataset.simMode; sim.setMode(mode); draw(); paintReadout(); };
  for (const b of document.querySelectorAll('[data-sim-speed]')) b.onclick = () => { rate = Number(b.dataset.simSpeed); paintReadout(); };
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) last = performance.now(); }).observe(canvas);
  document.addEventListener('visibilitychange', () => { if (document.hidden && running) pause(); });
  document.addEventListener('workspace-appearance-change', draw);
  resize(); paintReadout();

  return {
    setSelector(v) { sim.setSelector(v); onSelector?.(sim.state.selector); draw(); paintReadout(); },
    get state() { return sim.state; },
    start, pause, reset,
    laps: () => sim.laps()
  };
}
