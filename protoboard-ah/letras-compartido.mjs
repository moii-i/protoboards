// Página de Letras A–H sobre el visor compartido: mismos agujeros que la guía original,
// paso a paso y cable por cable, 2D/3D, recorrido animado, DIP S2 S1 S0 y display configurable.
import { buildLetras, useRoutes, defaultPins, validPins, patterns, letters, segmentsOf } from './letras-modelo.mjs';
import * as art from './letras-2d.mjs';

const el = id => document.getElementById(id);
const read = key => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
const write = (key, data) => { try { localStorage.setItem(key, JSON.stringify(data)); } catch {} };
const pinsKey = 'protoboard:letras:v2:pines';
// La guía clásica guardaba el orden de patas en su propio estado: se reutiliza si existe.
const legacy = read('practica21:estudio:v3')?.displayPins;
const pins = validPins(read(pinsKey)) ? read(pinsKey) : validPins(legacy) ? legacy : { ...defaultPins };

const routes = await fetch('./letras-rutas.json?v=1').then(r => r.ok ? r.json() : null).catch(() => null);
if (routes) useRoutes(routes);
const model = buildLetras(pins);

let code = 0;
const bits = { S2: 2, S1: 1, S0: 0 };
const bit = name => (code >> bits[name]) & 1;
const segmentsFor = c => Object.fromEntries([...patterns[c]].map(s => [s, true]));

const signalNames = ['S2', 'S1', 'S0', ...[...segmentsOf].map(s => 'SEG_' + s)];
const meaning = {
  S2: 'Vía 1 del DIP. Llega al pin 9 (C) de los siete 74LS151. Cerrada = 1.',
  S1: 'Vía 2 del DIP. Llega al pin 10 (B) de los siete 74LS151.',
  S0: 'Vía 3 del DIP. Llega al pin 11 (A) de los siete 74LS151.'
};
for (const [i, s] of [...segmentsOf].entries()) meaning['SEG_' + s] = 'Pin 6 (W) de U' + (i + 1) + ' al segmento ' + s + '. W es la salida invertida: 0 enciende el segmento del display de ánodo común.';

Object.assign(model, {
  art,
  slug: 'letras',
  viewerName: 'Letras A–H',
  singleSupply: true,
  assemblyVariant: 'contador',
  layoutVersion: 'letras-grande-chica-v7',
  progressKey: 'protoboard:letras:v2',
  progressTotal: model.components.length + model.items.filter(item => item.kind === 'wire').length,
  reviewStage: 11,
  viewBoxes: { A: [40, 120, 1960, 680], B: [520, 945, 1000, 680] },
  viewLabels: { A: 'Placa grande A', B: 'Placa chica B' },
  pinNames: Object.fromEntries([
    ...model.chips.filter(c => !c.dipSwitch).map(c => [c.id, { 1: 'X3', 2: 'X2', 3: 'X1', 4: 'X0', 5: 'Y · libre', 6: 'W · segmento ' + c.nets[5].slice(4), 7: '/G · GND', 8: 'GND', 9: 'C · S2', 10: 'B · S1', 11: 'A · S0', 12: 'X7', 13: 'X6', 14: 'X5', 15: 'X4', 16: 'VCC · +5 V' }]),
    ['SW1', { 1: 'Vía 1 · S2', 2: 'Vía 2 · S1', 3: 'Vía 3 · S0', 4: 'Vía 4 · libre', 5: 'Vía 4 · libre', 6: 'Vía 3 · +5 V', 7: 'Vía 2 · +5 V', 8: 'Vía 1 · +5 V' }]
  ]),
  checkpoints: model.stages.map((_, i) => [
    'Muescas a la izquierda en U1–U7. DIP en B columnas 1–4, cruzando la ranura. Display con el punto decimal abajo a la derecha.',
    'Puentea 31 con 34 en los cuatro rieles de A. +5 V y GND llegan a B. Fuente apagada mientras cableas.',
    'Un lado de cada vía a +5 V; el otro a RE1–RE3 (150 Ω) hacia GND. La vía 4 queda libre.',
    'S2 al pin 9, S1 al pin 10 y S0 al pin 11 de los siete U, en cadena de U a U.',
    ...[...segmentsOf].map((s, u) => 'U' + (u + 1) + ' controla el segmento ' + s + ': cada X a +5 V o GND según la tabla. /G (pin 7) y GND (pin 8) a tierra.'),
    'Pin 6 (W) de cada U listo para su segmento. Pin 5 (Y) libre.',
    '+5 V → RLED de 1 kΩ → los dos comunes. Cada pin 6 a su segmento, según las patas declaradas de tu display.',
    'Mueve el DIP de 000 a 111: A, b, C, d, E, F, G y H.'
  ][i] || ''),
  reviewChecks: model.stages.map(() => ['Revisé las conexiones de este paso.', 'Comparé con la tabla de la guía.']),
  diagnostics: {
    dark: [[1, 'Alimentación', 'Mide 5 V entre los rieles de A y de B. Revisa los puentes 31–34 de los rieles de A.'], [12, 'RLED y comunes', '+5 V → RLED de 1 kΩ → los dos comunes del display. Si declaraste otras patas, revisa que los comunes coincidan.']],
    fixed: [[2, 'DIP y RE1–RE3', 'Un lado de cada vía a +5 V y el otro a su RE de 150 Ω hacia GND. Sin las RE, la entrada queda flotando.'], [3, 'Selectores', 'S2, S1 y S0 deben llegar a los pines 9, 10 y 11 de los siete U.']],
    wrong: [[12, 'Patas del display', 'Si cambia pero muestra otra letra, el orden de patas no coincide con tu display. Ajusta las patas en "Conoce las patas de tu display".'], [4, 'Tabla de datos', 'Revisa las entradas X de cada U contra la tabla del paso.']],
    dp: [[12, 'Punto decimal', 'El DP queda libre. Si se enciende, una salida W llegó a su pata: revisa la asignación de patas.']]
  },
  demo: {
    signalNames,
    explain: (name, v) => (meaning[name] || '') + (v == null ? '' : ' Nivel actual: ' + v + '.'),
    indicators: () => ({ leds: {}, segments: { DS1: segmentsFor(code) }, switches: { S2: Boolean(bit('S2')), S1: Boolean(bit('S1')), S0: Boolean(bit('S0')) } }),
    signals: () => ({ S2: bit('S2'), S1: bit('S1'), S0: bit('S0'), ...Object.fromEntries([...segmentsOf].map(s => ['SEG_' + s, patterns[code].includes(s) ? 0 : 1])) }),
    // Tocar una palanca del DIP en 3D cambia su bit.
    press(name) { if (!(name in bits)) return false; code ^= 1 << bits[name]; window.paintLEDs(); return true; },
    paint(signals, active) {
      const value = code.toString(2).padStart(3, '0');
      for (const node of document.querySelectorAll('[data-letras-bit]')) { const v = bit(node.dataset.letrasBit); node.setAttribute('aria-pressed', String(Boolean(v))); node.querySelector('b').textContent = v; }
      for (const node of document.querySelectorAll('[data-letras-expected]')) node.innerHTML = value + ' → <strong>' + letters[code] + '</strong>';
      for (const node of document.querySelectorAll('[data-display]')) node.classList.toggle('on', active && Boolean(signals.segments?.[node.dataset.display]?.[node.dataset.segment]));
      for (const node of document.querySelectorAll('[data-demo-seg]')) node.classList.toggle('on', patterns[code].includes(node.dataset.demoSeg));
      for (const row of document.querySelectorAll('[data-code]')) row.classList.toggle('current', Number(row.dataset.code) === code);
      el('viewerTestToggle').classList.toggle('is-running', code > 0);
    },
    stop() {},
    toggle() { code = (code + 1) % 8; window.paintLEDs(); }
  }
});

window.model = model;
window.DOOR_VARIANT = 'contador';
el('assemblyRetry').onclick = () => location.reload();

// Tabla de verdad y display de la prueba.
el('truth').innerHTML = letters.map((l, c) => `<tr data-code="${c}"><td>${c.toString(2).padStart(3, '0')}</td><td><b>${l}</b></td><td>${patterns[c]}</td></tr>`).join('');
const shapes = { a: [28, 10, 100, 16], b: [128, 26, 16, 60], c: [128, 94, 16, 60], d: [28, 154, 100, 16], e: [12, 94, 16, 60], f: [12, 26, 16, 60], g: [28, 82, 100, 16] };
el('demoSegments').innerHTML = Object.entries(shapes).map(([s, [x, y, w, h]]) => `<rect data-demo-seg="${s}" x="${x}" y="${y}" width="${w}" height="${h}" rx="7"/>`).join('');

// Patas del display: se guardan y se vuelve a armar el montaje con ese orden.
const selects = [...document.querySelectorAll('[data-function]')];
for (const s of selects) s.value = String(pins[s.dataset.function]);
el('applyPins').onclick = () => {
  const proposed = Object.fromEntries(selects.map(s => [s.dataset.function, Number(s.value)]));
  if (!validPins(proposed)) { el('configError').textContent = 'Hay patas repetidas. Usa una pata distinta por segmento y común.'; return; }
  write(pinsKey, proposed);
  el('configError').textContent = 'Asignación guardada. Se vuelve a trazar el display…';
  location.reload();
};
el('resetPins').onclick = () => { write(pinsKey, { ...defaultPins }); location.reload(); };

const load = name => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = './' + name + '.js?v=descendente-v1';
  script.onload = resolve;
  script.onerror = () => reject(new Error('No se pudo cargar ' + name));
  document.body.append(script);
});
window.doorReady = (async () => {
  for (const name of ['puerta-map', 'puerta-guide', 'puerta-studio', 'puerta-learning', 'puerta-signal-logic', 'puerta-lesson', 'puerta-workspace', 'puerta-cable-workbench', 'puerta-catodo-workbench']) await load(name);
  document.dispatchEvent(new CustomEvent('door-guide-ready', { detail: { variant: 'contador' } }));
  for (const link of document.querySelectorAll('#lessonPdf,.lesson-tools-footer a')) link.hidden = true;
  for (const button of document.querySelectorAll('[data-letras-bit]')) button.onclick = () => model.demo.press(button.dataset.letrasBit);
  document.addEventListener('workspace-appearance-change', () => window.synchronizeMotion());
  el('assemblyStatus').hidden = true;
  window.paintLEDs();
})().catch(error => {
  el('assemblyStatus').textContent = error.message;
  el('assemblyStatus').setAttribute('role', 'alert');
  el('assemblyRetry').hidden = false;
  console.error(error);
});
