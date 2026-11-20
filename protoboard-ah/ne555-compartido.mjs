// Página del NE555 sobre el visor compartido: mismos agujeros que la guía original,
// con paso a paso, cable por cable, 2D/3D, recorrido animado y prueba del ritmo.
import { model as wiring, timing, rb, indicators } from './ne555-modelo.mjs';
import * as art from './ne555-2d.mjs';

const el = id => document.getElementById(id);
const read = key => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
const write = (key, data) => { try { localStorage.setItem(key, JSON.stringify(data)); } catch {} };
const potKey = 'protoboard:ne555:v2:rv1';
let pot = Number.isFinite(read(potKey)) ? Math.max(0, Math.min(100, read(potKey))) : 50;
const secs = s => s.toLocaleString('es-MX', { maximumFractionDigits: 2 });
const model = structuredClone(wiring);

let out = 0;
let timer = null;
function stop() { clearTimeout(timer); timer = null; }
// Cada medio ciclo dura lo que indica la fórmula del 555 astable con el ajuste actual de RV1.
function schedule() {
  const t = timing(pot);
  timer = setTimeout(() => { out ^= 1; window.paintLEDs(); schedule(); }, Math.max(60, Math.round((out ? t.high : t.low) * 1000)));
}
function setPot(value) {
  pot = Math.max(0, Math.min(100, Math.round(Number(value))));
  write(potKey, pot);
  if (timer) { stop(); schedule(); }
  window.paintLEDs?.();
}

const signalNames = ['SALIDA', 'TIEMPO', 'DESCARGA'];
const meaning = {
  SALIDA: 'Pata 3. En alto enciende D2 (de SALIDA a GND); en bajo enciende D1 (de +9 V a SALIDA).',
  TIEMPO: 'Patas 2 y 6 con el positivo de C1. Sube entre 3 y 6 V mientras C1 se carga y baja cuando se descarga.',
  DESCARGA: 'Pata 7. Cuando la salida está en bajo, descarga C1 a través de la parte de RV1 entre DESCARGA y TIEMPO.'
};

Object.assign(model, {
  art,
  slug: '555',
  viewerName: 'NE555 · LED alternados',
  singleSupply: true,
  assemblyVariant: 'contador',
  layoutVersion: 'ne555-30-v2',
  progressKey: 'protoboard:ne555:v2',
  progressTotal: model.components.length + model.items.filter(item => item.kind === 'wire').length,
  reviewStage: 5,
  viewBoxes: { A: model.bounds },
  pinNames: { U1: { 1: 'GND', 2: 'TRIG · TIEMPO', 3: 'OUT · SALIDA', 4: 'RESET · +9 V', 5: 'CONTROL · libre', 6: 'THRESH · TIEMPO', 7: 'DISCH · DESCARGA', 8: 'VCC · +9 V' } },
  checkpoints: [
    'La muesca del NE555 mira a la izquierda. C1 con el positivo a la izquierda y la franja (−) a la derecha. LED con el ánodo (pata larga) a la izquierda.',
    'Pata 8 y pata 4 a +9 V; pata 1 a GND. Los dos rieles positivos y los dos negativos quedan unidos.',
    'Patas 2 y 6 unidas (TIEMPO). Positivo de C1 a TIEMPO y negativo a GND. R1 llega a la pata 7.',
    'Cursor y extremo izquierdo de RV1 a TIEMPO; extremo derecho a DESCARGA. Ajuste inicial: 50 %.',
    'D1: +9 V → LED → 680 Ω → SALIDA. D2: SALIDA → LED → 680 Ω → GND.',
    'Batería desconectada mientras revisas. Pata 5 libre; cada resistencia entre dos tiras diferentes.',
    'Conecta la batería: los LED se alternan. La prueba visual muestra el ritmo esperado; compruébalo en tu circuito real.'
  ],
  reviewChecks: [
    ['Revisé la muesca del NE555 y la pata 1.', 'Verifiqué la polaridad de C1 y de los dos LED.'],
    ['Identifiqué +9 V y GND antes de conectar la batería.', 'Uní los dos rieles positivos y los dos negativos.'],
    ['Uní las patas 2 y 6.', 'R1 va de +9 V a la pata 7.'],
    ['Cursor y extremo izquierdo de RV1 en TIEMPO.', 'Extremo derecho de RV1 en DESCARGA.'],
    ['D1 lleva +9 V a R2 y a SALIDA.', 'D2 lleva SALIDA a R3 y a GND.'],
    ['Pata 5 libre.', 'Cada resistencia queda entre dos tiras distintas.'],
    ['Los LED se alternan.', 'Al girar RV1 cambia el ritmo.']
  ],
  diagnostics: {
    dark: [[1, 'Alimentación', 'Mide 9 V entre los rieles. Pata 8 y pata 4 a +9 V; pata 1 a GND.'], [4, 'Polaridad de los LED', 'La pata larga (ánodo) va a la izquierda en f20 y f26.']],
    one: [[4, 'LED que no cambia', 'Si uno siempre está encendido, revisa la resistencia del otro (R2 o R3) y su tira.'], [2, 'TIEMPO', 'Si la salida no cambia, revisa que las patas 2 y 6 estén unidas y el positivo de C1 en TIEMPO.']],
    fixed: [[3, 'RV1', 'Con RV1 cerca del 100 % casi no queda resistencia entre DESCARGA y TIEMPO: D1 apenas destella y parece que D2 se queda fijo. Vuelve al 50 %.'], [2, 'TIEMPO', 'Si la salida no cambia, revisa que las patas 2 y 6 estén unidas y el positivo de C1 en TIEMPO.']],
    slow: [[2, 'C1', 'Con 100 µF cada encendido dura cerca de un segundo. Un capacitor mayor lo hace más lento.'], [3, 'RV1', 'Al 0 % RV1 deja 20 kΩ entre DESCARGA y TIEMPO: es el ritmo más lento.']]
  },
  demo: {
    signalNames,
    explain: (name, v) => (meaning[name] || '') + (v == null ? '' : ' Nivel actual: ' + v + '.'),
    indicators: () => ({ ...indicators(out), switches: {} }),
    signals: () => ({ SALIDA: out, TIEMPO: out ? 1 : 0, DESCARGA: out ? 0 : 1 }),
    pot: () => pot,
    paint(signals, active) {
      const t = timing(pot), cycle = secs(t.high + t.low);
      const status = timer ? (out ? 'SALIDA en alto · D2 encendido' : 'SALIDA en bajo · D1 encendido') + ' · ciclo de ' + cycle + ' s' : 'Batería desconectada en la prueba';
      for (const node of [el('viewerPot'), el('ne555Pot')]) if (node && Number(node.value) !== pot) node.value = String(pot);
      for (const node of [el('viewerPotValue'), el('ne555PotValue')]) if (node) node.textContent = pot + ' % · ' + cycle + ' s';
      el('viewerTiming').textContent = 'RB = ' + secs(rb(pot) / 1000) + ' kΩ · D2 ' + secs(t.high) + ' s · D1 ' + secs(t.low) + ' s';
      for (const node of document.querySelectorAll('[data-ne555-status]')) if (node.textContent !== status) node.textContent = status;
      for (const node of document.querySelectorAll('[data-viewer-led],[data-demo-led]')) node.classList.toggle('on', Boolean(timer) && Boolean(signals.leds?.[node.dataset.viewerLed || node.dataset.demoLed]));
      for (const button of [el('viewerPower'), el('power')]) if (button) {
        button.textContent = timer ? 'Desconectar batería' : '▶ Conectar batería';
        button.setAttribute('aria-pressed', String(Boolean(timer)));
      }
      el('viewerTestToggle').classList.toggle('is-running', Boolean(timer));
    },
    stop,
    toggle() {
      if (timer) stop();
      else { out = 1; schedule(); }
      window.paintLEDs();
    }
  }
});

window.model = model;
window.DOOR_VARIANT = 'contador';
el('assemblyRetry').onclick = () => location.reload();
const wires = model.items.filter(item => item.kind === 'wire').length;
for (const label of ['1 × NE555 en DIP de 8 patas (U1)', '1 × 1 kΩ (R1)', '2 × 680 Ω (R2 y R3)', '1 × 100 µF electrolítico (C1)', '1 × potenciómetro de 20 kΩ (RV1)', '2 × LED (D1 y D2)', '1 × batería de 9 V con broche', '1 × protoboard (30 columnas)', wires + ' jumpers']) {
  const item = document.createElement('li');
  item.textContent = label;
  el('assemblyMaterials').append(item);
}

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
  for (const node of [el('viewerPot'), el('ne555Pot')]) if (node) node.oninput = event => setPot(event.target.value);
  for (const button of document.querySelectorAll('[data-pot-preset]')) button.onclick = () => setPot(button.dataset.potPreset);
  document.addEventListener('workspace-appearance-change', () => window.synchronizeMotion());
  el('assemblyStatus').hidden = true;
  window.paintLEDs();
})().catch(error => {
  el('assemblyStatus').textContent = error.message;
  el('assemblyStatus').setAttribute('role', 'alert');
  el('assemblyRetry').hidden = false;
  console.error(error);
});
