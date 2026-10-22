/* Physical two-board placement for the OPTIONAL bussed resistor-network variant.
   The ordinary-parts guide remains the default and is not modified here. */
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = __dirname;
const abstract = require(path.join(root, 'tools/proteus_compact_model.cjs'));
const context = vm.createContext({window: {}});
vm.runInContext(fs.readFileSync(path.join(root, 'protoboard-ah/puerta-model.js'), 'utf8'), context);
const common = JSON.parse(JSON.stringify(context.window.DOOR_MODEL));
const byId = new Map(common.components.map(c => [c.id, c]));
const components = abstract.components.map(c => {
  const original = byId.get(c.id);
  return original ? {...original, ...c} : {...c};
});
const get = id => components.find(c => c.id === id);
function pair(id, col, row = 'f', board = 2) {
  const c = get(id);
  if (!c) throw new Error('Missing component ' + id);
  c.board = board; c.col = col;
  c.holes = {1: {col, row}, 2: {col: col + 1, row}};
}

// Keep the five ICs, decoupling, oscillator and motor in the same positions as
// the normal guide. The displays retain their 15.24 mm c/g footprint.
for (const [id, start] of [['RN1', 22], ['RN2', 34], ['RN3', 46]]) {
  const c = get(id);
  c.board = 2; c.col = start; c.pins = 9;
  c.type = 'resistor-array'; c.value = '8 x 1 kΩ';
  c.label = id + ' · SIP9 común, ocho resistencias de 1 kΩ';
  c.holes = Object.fromEntries(Array.from({length: 9}, (_, i) => [i + 1, {col: start + i, row: 'a'}]));
  c.commonPin = 1;
  c.note = 'Red bussed SIP9 de 1 kΩ por rama. El pin 1 marcado es COM en la referencia física. No es una red de resistencias aisladas.';
}
['ABRIR','CERRAR','STOP','FCA','FCC'].forEach((id, i) => pair(id, 22 + i * 4));
[['R1b',1],['R1e',8],['R1g',10],['R2b',18],['RR',20]].forEach(([id,col]) => {
  pair(id, col);
  Object.assign(get(id), {value:'1 kΩ', mount:'upright', note:'Resistencia de pie: patas en columnas contiguas; dobla una pata sin forzar el cuerpo.'});
});
[['LY',44],['LG',49],['LR',54]].forEach(([id,col]) => pair(id,col));
Object.assign(get('RO'), {mount:'upright'});

// Use actual ordinary rail jumpers and source terminals, just as in the
// common-parts guide. They are distribution annotations, not bought ICs.
components.push(...common.components.filter(c => c.type === 'rail'));
const railConnections = common.connections.filter(w => [w.from,w.to].some(ref => /^JP\d+\./.test(ref)));
const connections = [
  ...abstract.connections.map(w => ({...w})),
  ...railConnections.map(w => ({...w}))
].sort((a,b) => a.stage - b.stage);
connections.forEach((w,i) => {
  w.id = 'W' + String(i + 1).padStart(3,'0');
  w.color ||= w.to === 'GND' ? '#243344' : w.to === 'VCC' ? '#ed5269' : w.to === 'VM' ? '#f09a42' : '#5fa8ff';
});

const stages = common.stages.map(s => ({...s}));
stages[1].description = 'Tres botones de enclavamiento y dos finales NC. RN3 reúne los cinco pull-down de 1 kΩ: 5 mA por contacto cerrado. P_A/P_C = 1 lejos del extremo y 0 al alcanzarlo. El pin 1 común de RN3 va a GND.';
stages[3].description = 'Las mismas cuatro NOR y seis compuertas Schmitt. El verde se alimenta directamente desde U2.13 mediante una rama de 1 kΩ de RN3; U4.8 queda a GND y U4.11 libre.';
stages[6].description = 'Tres redes bussed SIP9 agrupan resistencias sin quitarlas del circuito: RN1 común a U4.18; RN2 común a U4.13; RN3 común a GND. Cada segmento conserva su resistencia individual. Las cinco resistencias sueltas de 1 kΩ y RO de 100 kΩ se montan de pie.';
stages[7].description = 'Comprueba el pin marcado de cada SIP9. COM no significa siempre tierra: RN1 y RN2 van al ULN. Mantén la orden enclavada durante STOP. Este montaje opcional aún requiere validación eléctrica en Proteus y prueba física.';

const networks = ['RN1','RN2','RN3'].map(id => ({
  id, board:2, col:get(id).col, start:get(id).col, pins:9,
  commonPin:1, value:'8 x 1 kΩ', label:id+' · SIP9 bussed',
  commonNet:abstract.networkCommons[id], roles:abstract.arrayRoles[id],
  holes:get(id).holes
}));
const model = {
  ...common,
  title:'Control automático de puerta · redes resistivas opcionales',
  assemblyVariant:'redes',
  assemblyLabel:'Con 3 redes SIP9',
  components, connections, stages, networks,
  boardCount:2, boards:[1,2],
  materials:[
    {name:'Protoboard completa de 63 columnas',quantity:2},
    ...components.filter(c=>c.type==='dip').map(c=>({name:c.label.split(' · ')[0]+' DIP',quantity:1})),
    {name:'Red SIP9 bussed: ocho resistencias de 1 kΩ con común',quantity:3},
    {name:'Resistencia de 1 kΩ individual',quantity:5},
    {name:'Resistencia de 100 kΩ para oscilador',quantity:1},
    {name:'Capacitor cerámico de 100 nF',quantity:4},
    {name:'Capacitor electrolítico de 10 µF',quantity:1},
    {name:'Capacitor electrolítico de 100 µF',quantity:1},
    {name:'Display de ánodo común DIP10 (filas a 15.24 mm)',quantity:2},
    {name:'Botón o interruptor de enclavamiento',quantity:3},
    {name:'Final de carrera con contacto NC',quantity:2},
    {name:'LED amarillo, verde y rojo',quantity:3},
    {name:'Motor CC de baja corriente compatible con L293D',quantity:1},
    {name:'Fuente regulada de 5 V y fuente de motor de 6 V, GND común',quantity:1},
    {name:'Cables de protoboard',quantity:'según la guía'}
  ],
  counts:{integratedCircuits:5,resistorArrays:3,looseResistors:6,physicalComponents:31},
  networkCommons:abstract.networkCommons,
  arrayRoles:abstract.arrayRoles,
  resistiveElements:abstract.resistiveElements,
  unconnected:abstract.unconnected,
  sources:abstract.sources,
  logicHtml:common.logicHtml
    .replace('Seis grupos dinámicos de segmentos usan ULN2803A.', 'Seis grupos dinámicos de segmentos usan ULN2803A. En esta variante los segmentos e/f del display derecho y los cinco pull-down forman parte de RN3.')
    .replace('El canal 6 también controla el amarillo; el 7 conmuta el rojo; el 8 controla el verde.', 'El canal 6 controla el amarillo mediante RN2; el 7 conmuta el rojo. El verde recibe corriente directamente de U2.13 a través de la rama RN3.9. U4.8 queda a GND y U4.11 libre.')
    + '<h3>Opción con redes, no requisito de compra</h3><p>Solo selecciona este montaje si ya dispones de tres redes bussed SIP9 de ocho resistencias de 1 kΩ. Una red aislada no es equivalente. El pin 1 físico de la referencia Bourns es común; comprueba el modelo comprado y la numeración de su símbolo en Proteus.</p><p>RN1.1 va a U4.18, RN2.1 a U4.13 y RN3.1 a GND. RN1.8/9 y RN2.5–9 quedan libres. Cada rama mantiene una resistencia individual; se reduce el número de encapsulados, no la protección de los segmentos.</p><p>Son 31 piezas principales en dos placas. Las pruebas de lógica y coordenadas no sustituyen validar umbrales, oscilación, corrientes y montaje físico. Los terminales DEFAULT de Proteus simplifican el dibujo; en protoboard cada conexión sigue necesitando su conductor.</p>'
};
fs.writeFileSync(path.join(root,'protoboard-ah/puerta-redes-model.js'), '(function(){\n\'use strict\';\nwindow.DOOR_MODEL='+JSON.stringify(model)+';\n})();\n');
console.log(JSON.stringify({variant:model.assemblyVariant,components:components.filter(c=>c.type!=='rail').length,connections:connections.length,networks:networks.length}));
