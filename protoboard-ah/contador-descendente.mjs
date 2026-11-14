import { model as wiring, createLogic, indicators } from './contador-descendente-modelo.mjs';
import * as art from './contador-2d.mjs';

const el = id => document.getElementById(id);
const profileKey = 'protoboard:contador-descendente:v1:perfil';
const read = key => {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
};
const write = (key, data) => {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
};
const query = new URLSearchParams(location.search);
const requested = query.get('c1');
const profile = requested === '10' || (requested !== '100' && read(profileKey) === '10') ? '10' : '100';
const capacitor = profile === '10' ? '10 µF' : '100 µF';
const farads = profile === '10' ? 10e-6 : 100e-6;
const potKey = 'protoboard:contador-descendente:v1:rv1';
// RV1 al 0 % = 20 kΩ (lento); al 100 % = 0 Ω (rápido). R7 evita que RB llegue a cero.
let pot = Number.isFinite(read(potKey)) ? Math.max(0, Math.min(100, read(potKey))) : 50;
const periodFor = p => .693 * (10000 + 2 * (1000 + 20000 * (1 - p / 100))) * farads;
const secs = s => s.toLocaleString('es-MX', { maximumFractionDigits: 2 });
const interval = () => Math.max(40, Math.round(periodFor(pot) * 1000));
const model = structuredClone(wiring);
for (const target of [model.items.find(item => item.id === 'P_C1'), model.components.find(part => part.id === 'C1')]) {
  target.value = capacitor;
  if ('label' in target) target.label = 'C1 · ' + capacitor;
  else target.name = 'C1 · ' + capacitor;
}

// La prueba lee las redes de las patas del modelo: no es una secuencia escrita a mano.
const logic = createLogic(model.chips);
let state = logic.reset();
let timer = null;
let pressed = false;
let releaseTimer = null;
function restartClock() {
  if (!timer) return;
  clearInterval(timer);
  timer = setInterval(tick, interval());
}
function setPot(value) {
  pot = Math.max(0, Math.min(100, Math.round(Number(value))));
  write(potKey, pot);
  restartClock();
  window.paintLEDs?.();
}
let ripple = '';
const value = () => logic.value(state);
function stop() {
  clearInterval(timer);
  timer = null;
}
function tick() {
  if (pressed) return;
  const before = value();
  const result = logic.fall(state);
  state = result.state;
  const passing = result.trace.slice(0, -1).filter(v => v !== result.value);
  ripple = before === 0 ? '0 → 9 sin compuertas de borrado: los JK llegan a 1001 por sus ecuaciones' : passing.length ? before + ' → ' + result.value + ' · rizado breve por ' + passing.join(', ') + ' (estado válido)' : '';
  window.paintLEDs();
}
function press(ms = 450) {
  pressed = true;
  state = logic.reset();
  ripple = 'Encendido: C3 mantiene INICIO_N en bajo, CLEAR deja Q = 0 en los cuatro JK y se lee 1001';
  clearTimeout(releaseTimer);
  releaseTimer = setTimeout(() => {
    pressed = false;
    releaseTimer = null;
    window.paintLEDs();
  }, ms);
  window.paintLEDs();
}

const signalNames = ['A', 'B', 'C', 'D', 'A_N', 'INICIO_N', 'JB', 'KD'];
const meaning = {
  A: 'Bit de peso 1. Sale de Q̄ de U1 (pin 13) porque ese flip-flop guarda A invertido.',
  B: 'Bit de peso 2. Q de U1 (pin 9).',
  C: 'Bit de peso 4. Q de U2 (pin 12).',
  D: 'Bit de peso 8. Sale de Q̄ de U2 (pin 8) porque ese flip-flop guarda D invertido.',
  A_N: 'Reloj de B, C y D. Baja cuando A sube: 0→9, 8→7, 6→5, 4→3 y 2→1.',
  INICIO_N: 'CLEAR activo en bajo de los cuatro flip-flops. C3 la mantiene en 0 al encender; R8 la sube a 5 V.',
  JB: 'NAND(C̄, D̄) = C + D. Entrada J del flip-flop B.',
  KD: 'B̄·C̄. Entrada K del flip-flop que guarda D invertido; solo vale 1 en 0000.'
};

Object.assign(model, {
  art,
  slug: 'contador-descendente',
  viewerName: 'Contador de 9 a 0',
  singleSupply: true,
  assemblyVariant: 'contador',
  layoutVersion: 'contador-descendente-830-v1',
  progressKey: 'protoboard:contador-descendente:v1' + (profile === '10' ? ':10uf' : ''),
  progressTotal: model.components.length + model.items.filter(item => item.kind === 'wire').length,
  reviewStage: -1,
  viewBoxes: { A: model.bounds },
  pinNames: Object.fromEntries(model.chips.map(chip => [chip.id, Object.fromEntries(chip.nets.map((net, i) => [i + 1, net || 'libre']))])),
  checkpoints: [
    'Muesca a la izquierda en los cinco integrados. La franja (−) de C1 y C3 va al riel azul. RV1 con el tornillo hacia arriba.',
    'Continuidad entre los tramos de cada riel y separación entre +5 V y GND. Pin 4 = VCC y pin 11 = GND en los 74LS73A.',
    'Pines 2 y 6 del NE555 a TIEMPO. R6 de +5 V a DESCARGA; R7 de DESCARGA a la pata 1 de RV1; cursor de RV1 a TIEMPO. Pin 5 libre.',
    'Mide INICIO_N: unos 5 V con el circuito encendido. Llega a los pines 2 y 6 de U1 y U2. R8 va a +5 V y C3 a GND.',
    'Pin 12 de U1 (A_N) alimenta los pines 5 de U1 y 1 y 5 de U2. Entradas sobrantes de U3 (12 y 13) a GND.',
    'A sale del pin 13 de U1 y D del pin 8 de U2: son las salidas Q̄. B y C salen de Q.',
    'Enciende y comprueba que aparece 9. Observa 8, 7, …, 0 y otra vez 9 sin parpadeos de 10–15. Gira RV1 para cambiar la velocidad.'
  ],
  reviewChecks: [
    ['Revisé muescas, pin 1 y la posición de RV1.', 'Verifiqué valores y polaridad de C1 y C3.'],
    ['Medí continuidad de los puentes de riel sin energía.', 'Identifiqué +5 V y GND antes de energizar.'],
    ['Uní los pines 2 y 6 al positivo de C1.', 'Comprobé RELOJ en el pin 3 y que RV1 cambia la velocidad.'],
    ['Medí INICIO_N con el circuito encendido.', 'Los cuatro CLEAR comparten INICIO_N.'],
    ['A_N llega al reloj de los tres flip-flops superiores.', 'Revisé JB (pin 3 de U3) y KD (pin 8 de U3).'],
    ['A y D salen de Q̄; B y C salen de Q.', 'Los cátodos 3 y 8 del 5011AS están en GND.'],
    ['Al encender aparece 9.', 'Vi la secuencia 9→0, el regreso a 9 y el cambio de velocidad con RV1.']
  ],
  diagnostics: {
    dark: [[1, 'Rieles de 5 V', 'Revisa VCC y GND de cada integrado. El 74LS73A usa VCC en el pin 4 y GND en el 11.'], [5, 'Comunes del 5011AS', 'Los pines 3 y 8 van a GND. Revisa R1 y BLANCO_N (pin 4 del 74LS48).']],
    start: [[3, 'INICIO_N', 'C3 descargado mantiene los pines 2 y 6 de U1 y U2 en bajo al encender. Si no arranca en 9, apaga, espera unos segundos a que C3 se descargue y vuelve a encender. Un cable de INICIO_N a GND hace lo mismo.'], [5, 'Bits invertidos', 'Tras el CLEAR todos los Q valen 0. Solo A y D se leen de Q̄; por eso aparece 1001. Si sale 6 o 0, revisa que A venga del pin 13 de U1 y D del pin 8 de U2.']],
    skip: [[4, 'Reloj de B, C y D', 'Los pines 5 de U1 y 1 y 5 de U2 deben recibir A_N (pin 12 de U1), no el reloj del NE555.'], [4, 'Compuertas', 'JB = NAND(C̄, D̄) en el pin 3 de U3. KD sale del pin 8 tras invertir NAND(B̄, C̄).']],
    invalid: [[4, 'JB y KD', 'Si aparecen 10–15, revisa las patas 1, 2, 4, 5, 9 y 10 de U3 y que sus entradas sobrantes 12 y 13 estén en GND.'], [5, 'Orden BCD', 'Pines del 74LS48: A=7, B=1, C=2, D=6.']],
    slow: [[2, 'Salida del NE555', 'Mide el pin 3. RESET (pin 4) a +5 V y TIEMPO uniendo los pines 2 y 6, el cursor de RV1 y el positivo de C1. Gira RV1: con 100 µF va de unos 3.6 s a 0.8 s por número.']]
  },
  demo: {
    signalNames,
    explain: (name, v) => (meaning[name] || '') + (v == null ? '' : ' Nivel actual: ' + v + '.'),
    indicators: () => ({ ...indicators(value()), switches: { INICIO: pressed } }),
    signals: () => {
      const nets = logic.signals(state);
      return Object.fromEntries(signalNames.map(name => [name, name === 'INICIO_N' ? Number(!pressed) : nets[name]]));
    },
    pot: () => pot,
    paint(signals, active) {
      const n = value();
      const period = secs(periodFor(pot));
      const status = pressed ? 'Encendiendo · CLEAR activo por C3 · se muestra 9' : ripple || (timer ? 'Reloj activo · ' + period + ' s por número' : 'Reloj pausado');
      for (const node of [el('viewerPot'), el('counterPot')]) if (node && Number(node.value) !== pot) node.value = String(pot);
      for (const node of [el('viewerPotValue'), el('counterPotValue')]) if (node) node.textContent = pot + ' % · ' + period + ' s';
      el('viewerTiming').textContent = 'C1 ' + capacitor + ' · ' + period + ' s por número';
      for (const node of document.querySelectorAll('[data-counter-status]')) if (node.textContent !== status) node.textContent = status;
      for (const node of document.querySelectorAll('[data-counter-digit]')) node.value = String(n);
      for (const node of document.querySelectorAll('[data-counter-bit]')) node.classList.toggle('on', Boolean(n & Number(node.dataset.counterBit)));
      for (const node of document.querySelectorAll('[data-display]')) node.classList.toggle('on', active && Boolean(signals.segments[node.dataset.display]?.[node.dataset.segment]));
      for (const node of document.querySelectorAll('[data-counter-button]')) node.classList.toggle('pressed', pressed);
      for (const row of document.querySelectorAll('[data-state-row]')) row.classList.toggle('current', Number(row.dataset.stateRow) === n);
      for (const button of [el('viewerPower'), el('power')]) {
        button.textContent = timer ? 'Pausar reloj' : 'Iniciar reloj';
        button.setAttribute('aria-pressed', String(Boolean(timer)));
      }
      el('viewerTestToggle').classList.toggle('is-running', Boolean(timer));
    },
    stop,
    toggle() {
      if (timer) stop();
      else timer = setInterval(tick, interval());
      window.paintLEDs();
    }
  }
});

write(profileKey, profile);
window.model = model;
window.DOOR_VARIANT = 'contador';
el('assemblyRetry').onclick = () => location.reload();
document.querySelector('[data-counter-profile="' + profile + '"]').setAttribute('aria-current', 'true');
el('counterTiming').textContent = 'C1: ' + capacitor + ' · R6: 10 kΩ · R7: 1 kΩ · RV1: 0–20 kΩ · de ' + secs(periodFor(0)) + ' s a ' + secs(periodFor(100)) + ' s por número.';
const wires = model.items.filter(item => item.kind === 'wire').length;
el('counterWires').textContent = String(wires);
for (const label of ['2 × 74LS73A', '1 × 74LS00', '1 × 74LS48', '1 × NE555', '1 × 5011AS cátodo común', '1 × potenciómetro de 20 kΩ (RV1, el del NE555)', '3 × 10 kΩ (R1, R6, R8)', '1 × 1 kΩ (R7)', '1 × ' + capacitor + ' electrolítico (C1)', '1 × ' + (profile === '10' ? '100 µF' : '10 µF') + ' electrolítico (C3)', '1 × protoboard de 830 puntos', wires + ' jumpers y fuente de 5 V']) {
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
  const goTest = () => {
    if (window.doorGuide.getState().step !== model.stages.length - 1) window.selectStep(model.stages.length - 1);
  };
  for (const button of document.querySelectorAll('[data-counter-action]')) {
    button.onclick = () => {
      goTest();
      stop();
      if (button.dataset.counterAction === 'pulse') tick();
      else press();
    };
  }
  for (const node of [el('viewerPot'), el('counterPot')]) if (node) node.oninput = event => setPot(event.target.value);
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
