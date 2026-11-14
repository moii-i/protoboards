import { model as wiring, buildCounter, pulse, indicators } from './contador-modelo.mjs';
import * as art from './contador-2d.mjs';

const el = id => document.getElementById(id);
const profileKey = 'protoboard:contador:v1:perfil';
const read = key => {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
};
const write = (key, data) => {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
};
const query = new URLSearchParams(location.search);
const previous = query.get('distribucion') === 'anterior';
const requested = query.get('c1');
const profile = requested === '10' || (requested !== '4.7' && read(profileKey) === '10') ? '10' : '47';
const capacitor = profile === '10' ? '10 µF' : '4.7 µF';
const interval = Math.round(.693 * (10000 + 2 * 100000) * (profile === '10' ? 10e-6 : 4.7e-6) * 1000);
const period = (interval / 1000).toLocaleString('es-MX');
const model = previous ? buildCounter({ previous: true }) : structuredClone(wiring);
const cap = model.items.find(item => item.id === 'P_C1');
cap.value = capacitor;
cap.label = 'C1 · ' + capacitor;
const capacitorPart = model.components.find(part => part.id === 'C1');
capacitorPart.value = capacitor;
capacitorPart.name = cap.label;

let value = 0;
let timer = null;
let resetTimer = null;
function stop() {
  clearInterval(timer);
  clearTimeout(resetTimer);
  timer = resetTimer = null;
}
function tick() {
  const next = pulse(value);
  value = next.value;
  clearTimeout(resetTimer);
  resetTimer = next.reset ? setTimeout(() => {
    resetTimer = null;
    window.paintLEDs();
  }, Math.min(520, interval * .75)) : null;
  window.paintLEDs();
}

Object.assign(model, {
  art,
  slug: 'contador',
  viewerName: 'Contador de 0 a 9',
  singleSupply: true,
  assemblyVariant: 'contador',
  layoutVersion: previous ? 'contador-830-v1' : 'contador-830-v2',
  progressKey: (previous ? 'protoboard:contador:v1' : 'protoboard:contador:v2') + (profile === '10' ? ':10uf' : ''),
  progressTotal: model.components.length + model.items.filter(item => item.kind === 'wire').length,
  reviewStage: -1,
  viewBoxes: { A: model.bounds },
  pinNames: Object.fromEntries(model.chips.map(chip => [chip.id, Object.fromEntries(chip.nets.map((net, i) => [i + 1, net]))])),
  checkpoints: [
    'Confirma la muesca a la izquierda, el cátodo de cada LED y la polaridad del electrolítico.',
    'Comprueba continuidad entre los rieles del mismo potencial y separación entre +5 V y GND.',
    'Pines 2 y 6 a TIEMPO. R6 va de +5 V a DESCARGA; R7 va de DESCARGA a TIEMPO.',
    'BORRA_N llega al borrado de los cuatro flip-flops. La NAND lee los bits de peso 2 y 8.',
    'Revisa los siete segmentos, los comunes del 5011AS y las cuatro salidas invertidas de los JK.',
    'Avanza diez pulsos. El display vuelve a 0 y los cuatro LED quedan apagados.'
  ],
  reviewChecks: [
    ['Revisé la orientación de los cinco integrados y el pin 1.', 'Verifiqué los valores y la polaridad de los componentes.'],
    ['Medí continuidad de los puentes de riel con la fuente desconectada.', 'Identifiqué +5 V y GND antes de energizar.'],
    ['Uní los pines 2 y 6 al positivo de C1.', 'Identifiqué RELOJ en el pin 3 y comprobé el valor de R6 y R7.'],
    ['Comparé el orden de las salidas JK con la cadena del reloj.', 'Verifiqué que BORRA_N llega a los cuatro borrados.'],
    ['Conecté los cátodos comunes 3 y 8 a GND.', 'Verifiqué los segmentos a–g y la polaridad de los cuatro LED.'],
    ['Comprobé la secuencia de 0 a 9.', 'Verifiqué el regreso de 9 a 0 y la correspondencia de los LED con los bits.']
  ],
  diagnostics: {
    dark: [[1, 'Rieles de 5 V', 'Revisa alimentación en cada integrado. El 74LS73A usa VCC en pin 4 y GND en pin 11.'], [4, 'Comunes del 5011AS', 'Los pines 3 y 8 van a GND. Revisa también R1 y BLANCO_N del 74LS48.']],
    one: [[4, 'Orden BCD', 'Comprueba los pesos 1, 2, 4 y 8 y después las salidas a–g del decodificador.']],
    fixed: [[3, 'Borrado activo en bajo', 'La NAND toma los bits de peso 2 y 8 y lleva BORRA_N a las cuatro entradas de borrado.']],
    slow: [[2, 'Salida del NE555', 'Mide el pin 3. Verifica que RESET esté a +5 V y que TIEMPO una los pines 2 y 6 con el positivo de C1.']]
  },
  demo: {
    indicators: () => ({ ...indicators(value), switches: {} }),
    signals: () => ({ '1': value & 1, '2': (value >> 1) & 1, '4': (value >> 2) & 1, '8': (value >> 3) & 1, BORRA_N: Number(!resetTimer) }),
    paint(signals, active) {
      const status = resetTimer ? '9 → 0 · La NAND activó BORRA_N' : timer ? 'Reloj activo · ' + period + ' s por pulso' : 'Reloj pausado';
      for (const node of document.querySelectorAll('[data-counter-status]')) if (node.textContent !== status) node.textContent = status;
      for (const node of document.querySelectorAll('[data-counter-digit]')) node.value = String(value);
      for (const node of document.querySelectorAll('[data-counter-bit]')) node.classList.toggle('on', Boolean(value & Number(node.dataset.counterBit)));
      for (const node of document.querySelectorAll('[data-led]')) node.classList.toggle('on', active && Boolean(signals.leds[node.dataset.led]));
      for (const node of document.querySelectorAll('[data-display]')) node.classList.toggle('on', active && Boolean(signals.segments[node.dataset.display]?.[node.dataset.segment]));
      for (const button of [el('viewerPower'), el('power')]) {
        button.textContent = timer ? 'Pausar reloj' : 'Iniciar reloj';
        button.setAttribute('aria-pressed', String(Boolean(timer)));
      }
      el('viewerTestToggle').classList.toggle('is-running', Boolean(timer));
    },
    stop,
    toggle() {
      if (timer) stop();
      else timer = setInterval(tick, interval);
      window.paintLEDs();
    }
  }
});

const legacy = read(model.progressKey);
if (Array.isArray(legacy?.marked) && !legacy.layoutVersion) {
  const marked = new Set(legacy.marked);
  const itemIds = new Set(model.items.map(item => item.id));
  const packages = [...model.chips, ...model.displays].map(part => part.id);
  write(model.progressKey, {
    ...legacy,
    marked: [...marked].map(id => itemIds.has(id) ? id : 'P_' + id).filter(id => itemIds.has(id)),
    assemblyConfirmed: packages.filter(id => marked.has(id)),
    cursors: legacy.selected ? { [legacy.step]: legacy.selected } : {}
  });
}
write(profileKey, profile);
window.model = model;
window.DOOR_VARIANT = 'contador';
el('assemblyRetry').onclick = () => location.reload();
const layoutLink = el('counterLayout');
if (previous) {
  layoutLink.href = '/contador#montaje';
  layoutLink.textContent = 'Volver a la distribución actual';
  for (const link of document.querySelectorAll('[data-counter-profile]')) {
    const target = new URL(link.href);
    target.searchParams.set('distribucion', 'anterior');
    link.href = target.href;
  }
}
document.querySelector('[data-counter-profile="' + profile + '"]').setAttribute('aria-current', 'true');
el('counterTiming').textContent = 'C1: ' + capacitor + ' · R6: 10 kΩ · R7: 100 kΩ · Periodo nominal: ' + period + ' s.';
el('viewerTiming').textContent = capacitor + ' · ' + period + ' s por pulso';
for (const label of ['2 × 74LS73A', '1 × 74LS00', '1 × 74LS48', '1 × NE555', '1 × 5011AS', '4 × LED', '4 × 1 kΩ', '2 × 10 kΩ', '1 × 100 kΩ', '1 × ' + capacitor, '1 × 100 nF', '1 × protoboard de 830 puntos', 'Jumpers y fuente de 5 V']) {
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
  for (const button of document.querySelectorAll('[data-counter-action]')) {
    button.onclick = () => {
      if (window.doorGuide.getState().step !== model.stages.length - 1) window.selectStep(model.stages.length - 1);
      stop();
      if (button.dataset.counterAction === 'pulse') tick();
      else {
        value = 0;
        window.paintLEDs();
      }
    };
  }
  document.addEventListener('workspace-appearance-change', () => window.synchronizeMotion());
  el('assemblyStatus').hidden = true;
})().catch(error => {
  el('assemblyStatus').textContent = error.message;
  el('assemblyStatus').setAttribute('role', 'alert');
  el('assemblyRetry').hidden = false;
  console.error(error);
});
