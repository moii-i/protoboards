/* Digital verification of the five-chip guide's actual physical netlist.
   RC frequency, contact bounce, propagation delay and currents are not modeled. */
const assert = require('node:assert/strict');
global.window = {};
require('./puerta-model.js');
const model = window.DOOR_MODEL;
const components = new Map(model.components.map(c => [c.id, c]));
assert.equal(model.boardCount, 2, 'compact proposal: two boards');
assert.deepEqual(model.components.filter(c => c.type === 'dip').map(c => c.id),
  ['U1', 'U2', 'U3', 'U4', 'U5'], 'exactly five DIP ICs');

// Strips share their five holes, never the center trench. Rails remain split
// until the guide's explicit midpoint jumpers join the two halves.
const parents = new Map();
function find(x) {
  if (!parents.has(x)) parents.set(x, x);
  if (parents.get(x) !== x) parents.set(x, find(parents.get(x)));
  return parents.get(x);
}
function join(a, b) { parents.set(find(a), find(b)); }
const strips = new Map();
for (const c of model.components) for (let p = 1; p <= c.pins; p++) {
  const h = c.holes?.[p] || {col: c.col + (p <= c.pins / 2 ? p - 1 : c.pins - p),
    row: p <= c.pins / 2 ? 'f' : 'e'};
  const key = ['+', '-', 'VM'].includes(h.row)
    ? `${c.board}:rail:${h.row}:${h.col <= 31 ? 'L' : 'R'}`
    : `${c.board}:${h.col}:${'abcde'.includes(h.row) ? 'top' : 'bottom'}`;
  const ref = `${c.id}.${p}`;
  if (strips.has(key)) join(ref, strips.get(key)); else strips.set(key, ref);
}
for (const w of model.connections) join(w.from, w.to);
const same = (a, b) => find(a) === find(b);
for (const c of model.components.filter(c => ['resistor', 'cap', 'led'].includes(c.type)))
  assert(!same(`${c.id}.1`, `${c.id}.2`), `${c.id} is bypassed by its strip or wires`);
for (const [a, b] of [['VCC', 'GND'], ['VM', 'VCC'], ['VM', 'GND']])
  assert(!same(a, b), `${a}/${b} supply short`);
for (const [pin, supply] of [
  ['U1.16', 'VCC'], ['U1.8', 'GND'], ['U2.14', 'VCC'], ['U2.7', 'GND'],
  ['U3.14', 'VCC'], ['U3.7', 'GND'], ['U4.9', 'GND'], ['U5.16', 'VCC'],
  ['U5.8', 'VM'], ['U5.4', 'GND'], ['U5.5', 'GND'], ['U5.12', 'GND'],
  ['U5.13', 'GND'], ['U5.9', 'GND'], ['U5.10', 'GND'], ['U5.15', 'GND']
]) assert(same(pin, supply), `${pin} must connect to ${supply}`);
for (const pin of [3, 4, 6, 10, 11, 13])
  assert(same(`U1.${pin}`, 'GND'), `unused mux data input ${pin} must be low`);
assert(same('U1.5', 'FCA.2') && same('U1.12', 'FCC.2'), 'NC limit permissions');
assert(same('U1.1', 'STOP.2') && same('U1.15', 'STOP.2'), 'STOP inhibits both muxes');
assert(same('U5.3', 'MOTOR.1') && same('U5.6', 'MOTOR.2'), 'first bridge motor outputs');
assert(!same('MOTOR.1', 'MOTOR.2'), 'motor terminals must stay separate');
for (const p of [1, 2]) for (const rail of ['VCC', 'GND', 'VM'])
  assert(!same(`MOTOR.${p}`, rail), `motor terminal ${p} directly shorts ${rail}`);
for (const d of ['D1', 'D2']) for (const p of [3, 8])
  assert(same(`${d}.${p}`, 'VCC'), `${d} common anode ${p}`);

const norPins = [[2, 3, 1], [5, 6, 4], [8, 9, 10], [11, 12, 13]];
const invertPins = [[1, 2], [3, 4], [5, 6], [9, 8], [11, 10], [13, 12]];
const muxes = [[1, 7, [6, 5, 4, 3]], [15, 9, [10, 11, 12, 13]]];
const inputs = ['ABRIR.2', 'CERRAR.2', 'STOP.2', 'FCA.2', 'FCC.2'];
const outputs = ['U1.7', 'U1.9', ...norPins.map(p => `U2.${p[2]}`),
  ...invertPins.map(p => `U3.${p[1]}`)];
const drivers = new Map();
for (const ref of ['VCC', 'GND', ...inputs, 'U3.13', ...outputs]) {
  const net = find(ref);
  assert(!drivers.has(net), `${ref} shorts another driver ${drivers.get(net)}`);
  drivers.set(net, ref);
}

function evaluate(input, blink) {
  const values = new Map();
  const set = (ref, value) => {
    const net = find(ref);
    if (values.has(net)) {
      assert.equal(values.get(net), value, `conflicting drive at ${ref}`);
      return false;
    }
    values.set(net, value); return true;
  };
  const get = ref => values.get(find(ref));
  set('VCC', 1); set('GND', 0);
  const A = input & 1, C = (input >> 1) & 1, S = (input >> 2) & 1;
  const FA = (input >> 3) & 1, FC = (input >> 4) & 1;
  // NC contacts open when actuated, so physical nodes are the permissions.
  [A, C, S, 1 - FA, 1 - FC].forEach((value, i) => set(inputs[i], value));
  // Two injected oscillator phases verify digital routing, not analog timing.
  set('U3.13', 1 - blink);
  for (let pass = 0; pass < 20; pass++) {
    let changed = false;
    for (const [enable, out, data] of muxes) {
      const g = get(`U1.${enable}`), a = get('U1.14'), b = get('U1.2');
      if (g === 1) changed = set(`U1.${out}`, 0) || changed;
      else if (g === 0 && a !== undefined && b !== undefined) {
        const value = get(`U1.${data[a + 2 * b]}`);
        if (value !== undefined) changed = set(`U1.${out}`, value) || changed;
      }
    }
    for (const [a, b, out] of norPins) {
      const x = get(`U2.${a}`), y = get(`U2.${b}`);
      if (x !== undefined && y !== undefined)
        changed = set(`U2.${out}`, +(x === 0 && y === 0)) || changed;
    }
    for (const [a, out] of invertPins) {
      const x = get(`U3.${a}`);
      if (x !== undefined) changed = set(`U3.${out}`, 1 - x) || changed;
    }
    if (!changed) break;
    assert(pass < 19, 'logic did not settle');
  }
  const finiteInputs = [
    ...[1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15].map(p => `U1.${p}`),
    ...norPins.flatMap(([a, b]) => [`U2.${a}`, `U2.${b}`]),
    ...invertPins.map(([a]) => `U3.${a}`),
    ...Array.from({length: 8}, (_, i) => `U4.${i + 1}`),
    ...[1, 2, 7, 9, 10, 15].map(p => `U5.${p}`)
  ];
  for (const ref of finiteInputs)
    assert([0, 1].includes(get(ref)), `floating logic input ${ref}`);
  return {get, A, C, S, FA, FC};
}
function cathodeLow(get, ref) {
  if (same(ref, 'GND')) return true;
  for (let channel = 1; channel <= 8; channel++)
    if (same(ref, `U4.${19 - channel}`)) return get(`U4.${channel}`) === 1;
  throw Error(`cathode ${ref} must connect to GND or ULN output`);
}
function resistorOtherEnd(id, ref) {
  const c = components.get(id);
  assert(c?.type === 'resistor' && c.pins === 2, `${id} must be a resistor`);
  assert(!same(`${id}.1`, `${id}.2`), `${id} is bypassed by its strip`);
  const ends = [1, 2].filter(p => same(`${id}.${p}`, ref));
  assert.equal(ends.length, 1, `${id} must connect exactly one end to ${ref}`);
  return `${id}.${3 - ends[0]}`;
}
const displayPins = {a: 7, b: 6, c: 4, d: 2, e: 1, f: 9, g: 10};
function segments(get, d) {
  let lit = '';
  for (const s of 'abcdefg')
    if (cathodeLow(get, resistorOtherEnd(`R${d}${s}`, `D${d}.${displayPins[s]}`))) lit += s;
  return lit;
}
function led(get, id, resistance) {
  const supply = get(resistorOtherEnd(resistance, `${id}.1`));
  assert([0, 1].includes(supply), `${id} anode supply must be driven`);
  return supply === 1 && cathodeLow(get, `${id}.2`);
}
assert(same(resistorOtherEnd('RR', 'LR.1'), 'STOP.2'), 'red resistor fed by STOP contact');
assert(same(resistorOtherEnd('RY', 'LY.1'), 'VCC'));
assert(same(resistorOtherEnd('RG', 'LG.1'), 'VCC'));
const glyphs = {OF: ['abcdef', 'aefg'], OP: ['abcdef', 'abefg'],
  rU: ['eg', 'bcdef'], SP: ['acdfg', 'abefg']};
let checked = 0;
for (let input = 0; input < 32; input++) for (let blink = 0; blink < 2; blink++) {
  const {get, A, C, S, FA, FC} = evaluate(input, blink);
  const MA = +(A && !C && !FA && !S), MC = +(C && !A && !FC && !S), M = MA | MC;
  const label = S ? 'SP' : M ? 'rU' : FA ? 'OP' : 'OF';
  const context = `input ${input.toString(2).padStart(5, '0')}, blink ${blink}`;
  assert.equal(get('U5.2'), MA, `${context}: opening`);
  assert.equal(get('U5.7'), MC, `${context}: closing`);
  assert.equal(get('U5.1'), M, `${context}: bridge enable`);
  assert(!(get('U5.2') && get('U5.7')), `${context}: opposing commands`);
  assert.equal(led(get, 'LY', 'RY'), !!M, `${context}: yellow`);
  assert.equal(led(get, 'LG', 'RG'), !!(FA && !M && !S), `${context}: green`);
  assert.equal(led(get, 'LR', 'RR'), !!(S && blink), `${context}: red`);
  assert.deepEqual([segments(get, 1), segments(get, 2)], glyphs[label],
    `${context}: physical segment/ULN wiring shows ${label}`);
  checked++;
}
// No electronic memory: the command must remain mechanically latched in STOP.
for (const [command, pin] of [[1, 'U5.2'], [2, 'U5.7']]) {
  assert.equal(evaluate(command, 0).get(pin), 1, 'start travel');
  assert.equal(evaluate(command | 4, 0).get('U5.1'), 0, 'STOP inhibits travel');
  assert.equal(evaluate(command, 0).get(pin), 1, 'latched command resumes');
  assert.equal(evaluate(4, 0).get('U5.1'), 0, 'release command during STOP');
  assert.equal(evaluate(0, 0).get('U5.1'), 0, 'no direction memory after release');
}
console.log(`PASS: ${checked} actual physical netlist cases (32 inputs x two blink phases), four glyphs, motor interlock, STOP, NC limits, eight ULN channels, latched protocol, driven inputs and separate supplies.`);
console.log('Digital netlist only; Proteus electrical simulation and physical validation remain pending.');
