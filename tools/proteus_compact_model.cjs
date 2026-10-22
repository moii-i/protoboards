/* Netlist independiente para la propuesta con redes de resistencias.
   No modifica la guía web y NO es un proyecto nativo de Proteus. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = vm.createContext({window: {}});
vm.runInContext(fs.readFileSync(path.join(__dirname, '../protoboard-ah/puerta-model.js'), 'utf8'), context);
const original = JSON.parse(JSON.stringify(context.window.DOOR_MODEL));

const pinMap = new Map();
const arrayRoles = {RN1: {}, RN2: {}, RN3: {}};
function replaceResistance(id, array, branch, commonAtPin1 = true, role = id) {
  pinMap.set(id + '.1', array + '.' + (commonAtPin1 ? 1 : branch));
  pinMap.set(id + '.2', array + '.' + (commonAtPin1 ? branch : 1));
  arrayRoles[array][branch] = role;
}
['1a', '1c', '1d', '1f', '2a', '2g'].forEach((seg, i) =>
  replaceResistance('R' + seg, 'RN1', i + 2, true, 'D' + seg[0] + '.' + seg[1]));
replaceResistance('R2c', 'RN2', 2, true, 'D2.c');
replaceResistance('R2d', 'RN2', 3, true, 'D2.d');
arrayRoles.RN2[4] = 'LY.cátodo';
['ABRIR', 'CERRAR', 'STOP', 'P_A', 'P_C'].forEach((name, i) =>
  replaceResistance('RP' + i, 'RN3', i + 2, false, 'Pull-down ' + name));
replaceResistance('R2e', 'RN3', 7, true, 'D2.e');
replaceResistance('R2f', 'RN3', 8, true, 'D2.f');
arrayRoles.RN3[9] = 'LG.cátodo';

const replacedIds = new Set([...pinMap.keys()].map(ref => ref.split('.')[0]));
['RY', 'RG'].forEach(id => replacedIds.add(id));
const components = original.components
  .filter(c => !['rail', 'junction'].includes(c.type) && !replacedIds.has(c.id))
  .map(c => {
    const next = {id: c.id, type: c.type, pins: c.pins, label: c.label};
    for (const key of ['contact', 'polarized', 'color', 'value']) if (c[key] !== undefined) next[key] = c[key];
    if (c.type === 'dip') next.model = c.label.split(' · ')[0];
    if (c.type === 'resistor') next.ohms = c.id === 'RO' ? 100000 : 1000;
    return next;
  });
for (const id of ['RN1', 'RN2', 'RN3']) components.push({
  id, type: 'resistor-array', model: 'SIP9 BUSSED 8x1k', pins: 9,
  value: '8 × 1 kΩ', ohms: 1000, commonPin: 1,
  label: id + ' · red común de ocho resistencias de 1 kΩ',
  physicalExample: 'Bourns 4609X-101-102LF',
  note: 'Pin 1 común en el encapsulado de referencia. Confirmar el terminal común del símbolo escogido en Proteus.'
});

const connections = [], seen = new Set();
function add(stage, from, to, label, note = '') {
  if (from === to) return;
  const signature = [from, to].sort().join('|');
  if (seen.has(signature)) return;
  seen.add(signature);
  connections.push({stage, from, to, label, note});
}
for (const wire of original.connections) {
  const refs = [wire.from, wire.to];
  if (refs.some(ref => /^JP\d+\./.test(ref))) continue;
  if (refs.some(ref => /^(RY|RG|LY|LG)\./.test(ref))) continue;
  if (refs.includes('U4.8') || refs.includes('U4.11')) continue;
  add(wire.stage, pinMap.get(wire.from) || wire.from, pinMap.get(wire.to) || wire.to, wire.label, wire.note);
}
add(4, 'U4.8', 'GND', 'Entrada ULN no utilizada a 0');
add(7, 'LY.1', 'VCC', 'Ánodo amarillo directo a +5 V');
add(7, 'LY.2', 'RN2.4', 'Cátodo amarillo a su resistencia individual de RN2');
add(7, 'U2.13', 'LG.1', 'Salida G de la NOR al ánodo verde', 'Esta salida solo alimenta un LED a través de 1 kΩ; el canal 8 ULN queda sin utilizar.');
add(7, 'LG.2', 'RN3.9', 'Cátodo verde a su resistencia individual de RN3');
connections.sort((a, b) => a.stage - b.stage);
connections.forEach((w, i) => { w.id = 'S' + String(i + 1).padStart(3, '0'); });

const resistiveElements = [];
for (const id of ['RN1', 'RN2', 'RN3']) for (let pin = 2; pin <= 9; pin++) {
  resistiveElements.push({id: id + '.R' + (pin - 1), component: id,
    from: id + '.1', to: id + '.' + pin, ohms: 1000,
    role: arrayRoles[id][pin] || 'Rama libre', used: !!arrayRoles[id][pin]});
}
for (const c of components.filter(c => c.type === 'resistor'))
  resistiveElements.push({id: c.id, component: c.id, from: c.id + '.1', to: c.id + '.2', ohms: c.ohms, used: true,
    role: c.id === 'RO' ? 'Oscilador RC' : c.id === 'RR' ? 'LED rojo' : 'D' + c.id[1] + '.' + c.id[2]});

const unconnected = [...original.unconnected, 'U4.11', 'RN1.8', 'RN1.9', 'RN2.5', 'RN2.6', 'RN2.7', 'RN2.8', 'RN2.9'];
const model = {
  title: 'Control de puerta · propuesta para Proteus con redes de resistencias',
  format: 'Netlist JSON de documentación; no es un archivo .pdsprj ni .dsn.',
  status: 'Lógica verificada por programa. Simulación eléctrica en Proteus y montaje físico pendientes.',
  boardCountTarget: 2,
  components, connections, resistiveElements, arrayRoles, unconnected,
  inputs: {A: 'ABRIR.2', C: 'CERRAR.2', S: 'STOP.2', PA: 'FCA.2', PC: 'FCC.2'},
  nodes: {...original.nodes}, displayPins: {...original.displayPins},
  supplies: [{net: 'VCC', voltage: 5}, {net: 'GND', voltage: 0}, {net: 'VM', voltage: 6}],
  networkCommons: {RN1: 'U4.18', RN2: 'U4.13', RN3: 'GND'},
  notes: [
    'Mantener ABRIR o CERRAR enclavado durante STOP. No hay memoria electrónica independiente.',
    'FCA y FCC son contactos NC: P_A/P_C=1 lejos del extremo y 0 cuando el contacto abre al alcanzarlo.',
    'Cada segmento sigue teniendo su propia resistencia. Las redes agrupan encapsulados; no eliminan resistencias eléctricas.',
    'Todos los pull-down pasan de 10 kΩ a 1 kΩ: 5 mA y 25 mW por contacto cerrado a 5 V.',
    'El verde se alimenta directamente desde U2.13, aproximadamente 2–3 mA mediante su resistencia de 1 kΩ. Usar 74HC02.',
    'No conectar todos los comunes a GND: RN1 y RN2 van a sus respectivas salidas ULN.',
    'El esquema del símbolo de red en Proteus debe mostrar ocho resistencias con un único terminal común. Confirmar su numeración.',
    'Los cuatro capacitores de 100 nF y el capacitor de reserva del motor son necesarios en el montaje físico.',
    'Las ramas libres permanecen desconectadas. No unirlas a otros nodos.'
  ],
  sources: [...original.sources,
    {title: 'Red SIP bussed Bourns 4600X', url: 'https://www.bourns.com/pdfs/4600x.pdf'}],
  counts: {integratedCircuits: 5, resistorArrays: 3, looseResistors1k: 5, looseResistors100k: 1,
    physicalComponents: components.length, usedResistiveElements: resistiveElements.filter(r => r.used).length}
};
if (require.main === module) {
  fs.writeFileSync(path.join(__dirname, 'proteus-compact.json'), JSON.stringify(model, null, 2));
  console.log(JSON.stringify({components: components.length, connections: connections.length, ...model.counts}));
}
module.exports = model;
