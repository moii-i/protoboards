import { model as wiring, createLogic, action } from './seguidor-modelo.mjs';
import * as art from './seguidor-2d.mjs';
import { mountTrack } from './seguidor-pista.mjs';
import { mountAssembly } from './seguidor-carro.mjs';

const el = id => document.getElementById(id);
const selKey = 'protoboard:seguidor:v1:selector';
const read = key => { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } };
const write = (key, data) => { try { localStorage.setItem(key, JSON.stringify(data)); } catch {} };

const model = structuredClone(wiring);
// La prueba lee las redes de las patas del modelo: no es una tabla escrita a mano.
const logic = createLogic(model.chips);
const test = { SEL: read(selKey) === 1 ? 1 : 0, SI: 1, SD: 1 };
let timer = null;
let combo = 0;
const COMBOS = [0, 1].flatMap(SEL => [[1, 1], [1, 0], [0, 1], [0, 0]].map(([a, b]) => SEL ? { SEL, SI: 1 - a, SD: 1 - b } : { SEL, SI: a, SD: b }));
const actionText = { avanza: 'Avanza', izquierda: 'Gira a la izquierda', derecha: 'Gira a la derecha', alto: 'Frena · línea perdida' };
const motorText = { avanza: 'avanza', freno: 'freno', reversa: 'reversa', libre: 'libre' };
let track = null;

function setSelector(v) {
  test.SEL = v ? 1 : 0;
  write(selKey, test.SEL);
  track?.setSelector(test.SEL);
  paintTest();
  window.paintLEDs?.();
}
function stop() { clearInterval(timer); timer = null; }
function tick() {
  Object.assign(test, COMBOS[combo % COMBOS.length]);
  combo++;
  track?.setSelector(test.SEL);
  window.paintLEDs();
}

const meaning = {
  SEL: 'Selector SW1. 0 V con la palanca en NEGRA, 5 V en BLANCA. Llega a los pines 10 y 12 del 74LS86.',
  SI: 'Salida digital del sensor izquierdo: 1 sobre negro, 0 sobre blanco. Entra al pin 13 del 74LS86.',
  SD: 'Salida digital del sensor derecho: 1 sobre negro, 0 sobre blanco. Entra al pin 9 del 74LS86.',
  MI: 'SD ⊕ SEL (pin 8). Manda al motor izquierdo por el pin 10 del L293D: 1 avanza, 0 frena.',
  MD: 'SI ⊕ SEL (pin 11). Manda al motor derecho por el pin 2 del L293D: 1 avanza, 0 frena.'
};
const signalNames = Object.keys(meaning);

Object.assign(model, {
  art,
  slug: 'seguidor',
  viewerName: 'AGV seguidor de línea',
  singleSupply: true,
  assemblyVariant: 'contador',
  layoutVersion: 'seguidor-400-v1',
  progressKey: 'protoboard:seguidor:v1',
  // Integrados y piezas, más cada jumper y cada cable externo (sensores, motores y pilas).
  progressTotal: model.components.length + model.items.filter(item => item.kind === 'wire' || item.kind === 'link').length,
  reviewStage: -1,
  viewBoxes: { A: model.bounds },
  pinNames: Object.fromEntries(model.chips.map(chip => [chip.id, Object.fromEntries(chip.nets.map((net, i) => [i + 1, net || 'libre']))])),
  checkpoints: [
    'Muescas a la izquierda en U1 y U2. Pestaña metálica del 7805 hacia el riel superior. SW1 en la esquina frontal izquierda.',
    'Sin pilas: continuidad de cada riel y de la unión de los dos azules. +5 V (riel rojo superior) y VM (riel rojo inferior) separados. 74LS86: VCC 14, GND 7. L293D: VCC1 16, VCC2 8, GND 4, 5, 12 y 13.',
    'SEL llega a los pines 10 y 12 del 74LS86. Pines 1, 2, 4 y 5 a GND. Mide SEL: 0 V en NEGRA y 5 V en BLANCA.',
    'Pin 11 del 74LS86 al pin 2 del L293D; pin 8 al pin 10. EN1 (1) y EN2 (9) a +5 V. 2A (7) y 4A (15) a GND.',
    'Sensor izquierdo al pin 13 y derecho al pin 9. Con el sensor sobre negro su LED se apaga y la salida mide unos 5 V.',
    'Motor izquierdo en los pines 11 y 14; derecho en 3 y 6. Si una rueda gira hacia atrás, intercambia sus dos cables.',
    'Pon el carrito sobre la cinta negra con SW1 en NEGRA: avanza y corrige. Cambia a cinta blanca y SW1 en BLANCA sin mover ningún cable.'
  ],
  reviewChecks: [
    ['Revisé muescas y el pin 1 de U1 y U2.', 'El 7805 tiene IN, GND y OUT en ese orden de izquierda a derecha.'],
    ['Medí continuidad de rieles sin pilas.', 'Comprobé que +5 V y VM no se tocan.'],
    ['SEL cambia de 0 V a 5 V con SW1.', 'Las entradas sobrantes del 74LS86 están en GND.'],
    ['Cada XOR llega al motor del lado contrario.', 'EN1 y EN2 en +5 V; 2A y 4A en GND.'],
    ['Ajusté el potenciómetro de cada sensor sobre la pista.', 'Los dos sensores caben dentro de la cinta.'],
    ['Las dos ruedas giran hacia adelante.', 'Conecté las pilas al final.'],
    ['Siguió la línea negra y la blanca.', 'Al sacarlo de la línea se detuvo.']
  ],
  diagnostics: {
    still: [[1, '5 V de la lógica', 'Mide 5 V en el pin 14 del 74LS86 y en el pin 16 del L293D. Revisa la pila de 9 V, el 7805 (IN, GND, OUT) y el puente entre los rieles azules.'], [3, 'Habilitación', 'EN1 (pin 1) y EN2 (pin 9) del L293D deben estar en +5 V. VM (pin 8) necesita las 4 AA.'], [4, 'Sensores', 'Con los dos sensores sobre la cinta, MI (pin 8) y MD (pin 11) deben medir unos 4 V. Si miden 0, revisa SW1 y el ajuste de los sensores.']],
    spin: [[4, 'Un sensor fijo', 'Pasa la mano bajo cada sensor: su LED debe cambiar. Si uno no cambia, gira su potenciómetro o revisa su cable OUT.'], [3, 'Cruce de salidas', 'El pin 11 (MD) va al pin 2 del L293D y el pin 8 (MI) al pin 10. Si están al revés, el carrito gira hacia afuera.']],
    away: [[3, 'Motores cruzados', 'El sensor derecho manda al motor izquierdo. Si el carrito huye de la línea, intercambia los cables de los dos motores entre sí (izquierdo ↔ derecho).'], [6, 'Velocidad', 'Si llega tarde a las curvas, reduce la velocidad: usa pilas recargables de 1.2 V (4.8 V) o acerca los sensores al eje.']],
    back: [[5, 'Polaridad del motor', 'Intercambia los dos cables de ese motor en la protoboard. No cambia la lógica.']],
    white: [[2, 'Selector', 'Con SW1 en BLANCA, SEL debe medir 5 V. Revisa el tiro derecho de SW1 (columna 4, la misma tira que el pin 14).'], [4, 'Calibración', 'Sobre fondo negro y cinta blanca el contraste cambia: ajusta el potenciómetro de cada sensor en esa pista.']],
    reset: [[1, 'Baterías separadas', 'Los motores deben tomar corriente solo de las 4 AA (riel VM). Si la lógica se apaga al arrancar, revisa que el 7805 reciba la pila de 9 V y no el riel VM.'], [1, 'Tierra común', 'Un solo jumper une los rieles azules; sin él, las señales del 74LS86 no tienen referencia para el L293D.']]
  },
  demo: {
    signalNames,
    explain: (name, v) => (meaning[name] || '') + (v == null ? '' : ' Nivel actual: ' + v + '.'),
    indicators: () => ({ leds: {}, segments: {}, switches: { SW1: Boolean(test.SEL) } }),
    signals: () => {
      const { nets } = logic.evaluate(test);
      return Object.fromEntries(signalNames.map(name => [name, nets[name]]));
    },
    paint() {
      paintTest();
      for (const button of [el('viewerPower'), el('power')]) {
        button.textContent = timer ? 'Detener recorrido' : (button.id === 'viewerPower' ? '▶ Recorrer las 8 combinaciones' : 'Recorrer las 8 combinaciones');
        button.setAttribute('aria-pressed', String(Boolean(timer)));
      }
      el('viewerTestToggle').classList.toggle('is-running', Boolean(timer));
    },
    stop,
    toggle() {
      if (timer) stop();
      else { tick(); timer = setInterval(tick, 1400); }
      window.paintLEDs();
    }
  }
});

function paintTest() {
      const out = logic.evaluate(test), act = action(out.left, out.right);
      const status = 'SEL ' + test.SEL + ' · SI ' + test.SI + ' · SD ' + test.SD + ' → ' + actionText[act];
      for (const node of document.querySelectorAll('[data-follower-status]')) if (node.textContent !== status) node.textContent = status;
      for (const button of document.querySelectorAll('[data-follower-sel]')) button.setAttribute('aria-pressed', String(Number(button.dataset.followerSel) === test.SEL));
      for (const button of document.querySelectorAll('[data-follower-sensor]')) {
        const black = Boolean(test[button.dataset.followerSensor]);
        button.setAttribute('aria-pressed', String(black));
        button.querySelector('small').textContent = black ? 'negro · 1' : 'blanco · 0';
      }
      for (const node of document.querySelectorAll('[data-follower-motor]')) {
        const state = out[node.dataset.followerMotor];
        node.dataset.state = state;
        node.querySelector('b').textContent = motorText[state];
      }
      highlightTruth(test.SEL, test.SI, test.SD);
      for (const lever of document.querySelectorAll('.follower-slide')) lever.classList.toggle('is-white', Boolean(test.SEL));
}

let truthSource = null;
function highlightTruth(SEL, SI, SD, source = 'test') {
  if (source === 'sim') truthSource = SEL + '' + SI + SD;
  const key = source === 'sim' ? truthSource : SEL + '' + SI + SD;
  for (const row of document.querySelectorAll('[data-truth-row]')) row.classList.toggle('current', row.dataset.truthRow === key);
}

window.model = model;
window.DOOR_VARIANT = 'contador';
el('assemblyRetry').onclick = () => location.reload();
const wires = model.items.filter(item => item.kind === 'wire').length;
for (const node of [el('followerWires'), ...document.querySelectorAll('[data-follower-wires]')]) if (node) node.textContent = String(wires);
for (const label of ['1 × 74LS86 (dos de sus cuatro XOR)', '1 × L293D (puente H con diodos)', '1 × regulador 7805 (U3, TO-220)', '1 × capacitor cerámico 0.33 µF (C1) y 1 × 0.1 µF (C2)', '1 × interruptor deslizable 1P2T (SW1)', '2 × sensores TCRT5000 (MH-Sensor-Series, salida D0)', '1 × kit chasis ZK-2WD: 2 motores TT, 2 ruedas, rueda loca, portapilas 4 × AA y su tornillería', '2 × postes de latón M3 hembra-hembra de 30 mm y 6 × tornillos M3 × 6 (4 cabeza redonda, 2 cabeza plana)', '1 × pila de 9 V con broche', '1 × protoboard de 400 puntos', wires + ' jumpers y 14 cables dupont macho-hembra']) {
  const item = document.createElement('li');
  item.textContent = label;
  el('assemblyMaterials').append(item);
}

mountAssembly(el('carro'));

// Pista: comparte el selector con la prueba del visor.
track = mountTrack({
  canvas: el('simCanvas'),
  evaluate: logic.evaluate,
  selector: test.SEL,
  onSelector: v => { if (v !== test.SEL) setSelector(v); },
  onReading: ({ SEL, SI, SD }) => highlightTruth(SEL, SI, SD, 'sim')
});

for (const button of document.querySelectorAll('[data-follower-sel]')) button.onclick = () => { stop(); setSelector(Number(button.dataset.followerSel)); };
for (const button of document.querySelectorAll('[data-follower-sensor]')) button.onclick = () => {
  stop();
  const name = button.dataset.followerSensor;
  test[name] = test[name] ? 0 : 1;
  paintTest();
  window.paintLEDs?.();
};
paintTest();

const load = name => new Promise((resolve, reject) => {
  const script = document.createElement('script');
  script.src = './' + name + '.js?v=seguidor-v1';
  script.onload = resolve;
  script.onerror = () => reject(new Error('No se pudo cargar ' + name));
  document.body.append(script);
});
window.doorReady = (async () => {
  for (const name of ['puerta-map', 'puerta-guide', 'puerta-studio', 'puerta-learning', 'puerta-signal-logic', 'puerta-lesson', 'puerta-workspace', 'puerta-cable-workbench', 'puerta-catodo-workbench']) await load(name);
  document.dispatchEvent(new CustomEvent('door-guide-ready', { detail: { variant: 'contador' } }));
  for (const link of document.querySelectorAll('#lessonPdf,.lesson-tools-footer a')) link.hidden = true;
  document.addEventListener('workspace-appearance-change', () => window.synchronizeMotion?.());
  el('assemblyStatus').hidden = true;
  window.paintLEDs();
})().catch(error => {
  el('assemblyStatus').textContent = error.message;
  el('assemblyStatus').setAttribute('role', 'alert');
  el('assemblyRetry').hidden = false;
  console.error(error);
});
