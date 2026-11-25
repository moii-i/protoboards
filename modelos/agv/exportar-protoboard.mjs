// Exporta la protoboard de la guía (protoboard-ah/seguidor-modelo.mjs) para el modelo de Blender.
//   node modelos/agv/exportar-protoboard.mjs
// s2_electronica.py lee el resultado (protoboard.json): integrados, piezas, jumpers con su ruta y cables externos.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {model} from '../../protoboard-ah/seguidor-modelo.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const chips = model.chips.map(({id, label, start, pins}) => ({id, label, start, pins}));
const items = model.items.map(it => {
  const out = {id: it.id, kind: it.kind, lead: Boolean(it.lead)};
  if (it.partId) out.partId = it.partId;
  if (it.value) out.value = it.value;
  Object.assign(out, {a: it.a, b: it.b, routed: (it.routedPins || []).map(([h]) => h)});
  if (it.route) Object.assign(out, {route: it.route, routeHeight: it.routeHeight});
  for (const key of ['color', 'net', 'module', 'pin', 'stage']) if (it[key] != null) out[key] = it[key];
  return out;
});
fs.writeFileSync(path.join(here, 'protoboard.json'), JSON.stringify({chips, items}));
console.log(JSON.stringify({chips: chips.length, items: items.length, wires: items.filter(i => i.kind === 'wire').length, leads: items.filter(i => i.lead).length}));
