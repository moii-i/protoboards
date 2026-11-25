# Pasos 5–8: sensores, pilas, protoboard con el circuito de la guía y cables dupont.
# Piezas fieles a las de la lista de compras: módulo MH-Sensor-Series (TCRT5000 + LM393, 4 pines),
# SN74LS86N y L293D en DIP, dos interruptores SS12D00 (SW1 selector y SW2 encendido),
# portapilas 4 × AA abierto (única fuente) y protoboard de 400 puntos (82.5 × 54.5 mm).
# Acomodo del chasis de la foto: sensores bajo el tope frontal, portapilas al frente, protoboard atrás.
import bpy, math, json
import numpy as np
from mathutils import Vector, Matrix
exec(open(LIB, encoding='utf-8').read())
M = materials()
for name in ('S5_Sensores', 'S6_Baterias', 'S7_Protoboard', 'S8_Cables'):
    e = bpy.data.objects.get(name)
    if e:
        for c in list(e.children_recursive): bpy.data.objects.remove(c, do_unlink=True)
        bpy.data.objects.remove(e, do_unlink=True)
DATA = json.load(open(BOARD_JSON, encoding='utf-8'))
PB, PT = 44.0, 47.0
zinc = mat('Acero zincado', (0.70, 0.71, 0.73), rough=.32, metal=1)
foam = mat('Cinta doble cara', (0.55, 0.56, 0.58), rough=.9)
silk = mat('Serigrafía blanca', (0.95, 0.95, 0.93), rough=.6)
gold = mat('Pin dorado', (0.92, 0.72, 0.30), rough=.25, metal=1)
smd_black = mat('SMD negro', (0.04, 0.04, 0.045), rough=.4)
led_green = mat('LED verde', (0.1, 0.85, 0.2), rough=.1, transmission=.5)
blue_disc = mat('Cerámico azul', (0.10, 0.25, 0.62), rough=.4)
spring = mat('Resorte', (0.80, 0.80, 0.82), rough=.25, metal=1)
screw6, post30, nut = pan_screw(6, zinc), standoff(30, M['brass']), hex_nut(zinc)
flat6 = countersunk_screw(6, zinc)

def join(objs, name, parent):
    objs = [o for o in objs if o]
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs: apply_mods(o); o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    if len(objs) > 1: bpy.ops.object.join()
    o = bpy.context.view_layer.objects.active; o.name = name
    o.parent = None
    return link(o, parent)

def flat_text(name, body, loc, size, m, parent, rot=(0, 0, 0)):
    o = text(name, body, loc, size, m, parent)
    o.rotation_euler = rot; return o

# ---------- Paso 5: módulos MH-Sensor-Series en espejo (giro de 180°, no reflejo) ----------
S5 = group('S5_Sensores')
SENSOR_PINS = {}
PIN_ORDER = ('VCC', 'GND', 'D0', 'A0')
SENSOR_Y = 118.0                                            # poste en la ranura del tope, 118 mm delante del eje
def sensor_module(side, key, label):
    """Se construye del lado derecho (TCRT5000 hacia el centro, pines hacia fuera) y se gira 180° para el izquierdo."""
    cx, cy, zb, zt = 18.0, SENSOR_Y, 12.4, 14.0
    parts = []
    pcb = box('PCB MH-Sensor ' + label, (32, 14, 1.6), (cx, cy, (zb + zt) / 2), M['pcb'], bevel=.35); apply_mods(pcb)
    boolean(pcb, cyl('c', 1.6, 4, (cx, cy, 13.2), M['steel'], verts=20)); parts.append(pcb)
    # Cara del sensor (abajo): TCRT5000, encabezado de 4 pines y serigrafía.
    tcrt = box('TCRT5000 ' + label, (5.8, 10.2, 7), (cx - 16 + 4, cy, zb - 3.5), M['black'], bevel=.35); apply_mods(tcrt)
    boolean(tcrt, box('c', (6.5, .9, 4.5), (cx - 16 + 4, cy, zb - 7), M['steel']))  # separador entre emisor y receptor
    parts.append(tcrt)
    for dy, m in ((-2.6, M['ir_blue']), (2.6, M['ir_black'])):
        parts.append(cyl('Lente ' + label, 1.75, 1.2, (cx - 16 + 4, cy + dy, zb - 7.2), m, verts=24, bevel=.5))
    hx = cx + 16 - 1.6
    parts.append(box('Cuerpo del encabezado ' + label, (2.54, 10.16, 2.54), (hx, cy, zb - 1.27), M['black'], bevel=.2))
    for i, pin in enumerate(PIN_ORDER):
        py = cy - 3.81 + i * 2.54
        parts.append(box('Pin ' + pin, (.64, .64, 4.2), (hx, py, zb - .3), gold))
        parts.append(box('Pin ' + pin, (8.5, .64, .64), (hx + 4.0, py, zb - 1.27), gold))
        SENSOR_PINS[(key, pin)] = (hx + 8.2, py, zb - 1.27)
    for i, pin in enumerate(PIN_ORDER):
        t = flat_text('Serigrafía ' + pin, pin, (hx - 3.4, cy - 3.81 + i * 2.54, zb - .01), .9, silk, None, rot=(math.pi, 0, 0)); parts.append(t)
    parts.append(flat_text('Serigrafía MH', 'MH-Sensor-Series', (cx + 1.5, cy - 5.2, zb - .01), 1.2, silk, None, rot=(math.pi, 0, 0)))
    # Cara superior: trimpot 3296W, LM393 (SOIC-8), LED de encendido y de salida, resistencias SMD.
    pot = box('Trimpot 3296W ' + label, (9.5, 4.8, 9.7), (cx - 9.5, cy + 3.5, zt + 4.85), M['pot_blue'], bevel=.4); parts.append(pot)
    for k in range(6): parts.append(box('Estría del trimpot', (.4, 4.9, 9), (cx - 13.2 + k * 1.5, cy + 3.5, zt + 4.85), M['pot_blue']))
    parts.append(cyl('Tornillo del trimpot ' + label, 1.1, .8, (cx - 13.0, cy + 3.5, zt + 10.0), M['brass'], verts=16))
    parts.append(box('LM393 ' + label, (4.9, 3.9, 1.5), (cx + 6.5, cy - 2.5, zt + .85), smd_black, bevel=.15))
    for k in range(4):
        for s in (-1, 1): parts.append(box('Pata SOIC', (.4, 1.2, .25), (cx + 4.6 + k * 1.27, cy - 2.5 + s * 2.4, zt + .2), M['tin']))
    parts.append(box('LED encendido', (1.6, .8, .6), (cx + 12, cy + 4.2, zt + .3), M['led_red']))
    parts.append(box('LED salida D0', (1.6, .8, .6), (cx + 12, cy + 1.8, zt + .3), led_green))
    for k in range(3): parts.append(box('Resistencia SMD', (1.6, .8, .45), (cx + 1.5 + k * 2.4, cy + 4.5, zt + .25), smd_black))
    obj = join(parts, 'Sensor MH-Sensor-Series ' + label, None)
    if side < 0:
        bpy.context.view_layer.update()
        rot = Matrix.Translation(v(0, cy, 0)) @ Matrix.Rotation(math.pi, 4, 'Z') @ Matrix.Translation(v(0, -cy, 0))
        obj.matrix_world = rot @ obj.matrix_world
        for pin in PIN_ORDER:
            x, y, z = SENSOR_PINS[(key, pin)]; SENSOR_PINS[(key, pin)] = (-x, 2 * cy - y, z)
    link(obj, S5)
    x = side * cx
    place(post30, 'Separador de latón 30 mm', (x, cy, PB), (0, 0, -1), S5, insert=(0, 0, -1), dist=34)
    place(screw6, 'Tornillo M3 × 6 (placa)', (x, cy, PT), (0, 0, -1), S5, insert=(0, 0, 1), dist=12)
    place(screw6, 'Tornillo M3 × 6 (sensor)', (x, cy, zb), (0, 0, 1), S5, insert=(0, 0, -1), dist=12)
sensor_module(1, 'SD', 'derecho')
sensor_module(-1, 'SI', 'izquierdo')

# ---------- Paso 6: portapilas 4 × AA al frente, atornillado (única fuente) ----------
S6 = group('S6_Baterias')
HX, HY, HB = 0.0, 59.0, PT
frame = box('Portapilas 4 × AA', (58, 62, 15), (HX, HY, HB + 7.5), M['black'], bevel=1); apply_mods(frame)
boolean(frame, box('c', (55.6, 57, 15), (HX, HY, HB + 8.7), M['steel']))          # hueco de las pilas
for x in (-14.5, 0, 14.5): frame_div = box('Divisor', (1, 56, 5), (HX + x, HY, HB + 3.7), M['black'], S6)
link(frame, S6)
for i, x in enumerate((-21.75, -7.25, 7.25, 21.75)):
    up = i % 2 == 0                                                                # polaridad alterna
    cyl('Pila AA', 7.25, 50.5, (x, HY, HB + 9.45), M['aa'], axis='Y', parent=S6, verts=40, bevel=.6)
    cyl('Franja de la pila AA', 7.3, 8, (x, HY + (20 if up else -20), HB + 9.45), M['aa_gold'], axis='Y', parent=S6, verts=40)
    cyl('Polo positivo', 2.6, 1.4, (x, HY + (26 if up else -26), HB + 9.45), M['steel'], axis='Y', parent=S6, verts=20)
    for k in range(5):                                                             # resorte en el polo negativo
        cyl('Resorte', 4.2 - k * .3, .5, (x, HY + (-27.6 + k * .9 if up else 27.6 - k * .9), HB + 9.45), spring, axis='Y', parent=S6, verts=20)
    box('Contacto plano', (7, .4, 7), (x, HY + (28.3 if up else -28.3), HB + 9.45), M['steel'], S6)
for y in (HY - 20, HY + 20):
    place(flat6, 'Tornillo M3 × 6 cabeza plana', (0, y, HB + 2.2), (0, 0, -1), S6, insert=(0, 0, 1), dist=14)
    place(nut, 'Tuerca M3', (0, y, PB), (0, 0, -1), S6, insert=(0, 0, -1), dist=10)
# Cables propios del portapilas: salen por su extremo trasero, rojo (+) y negro (−).
HOLDER_WIRE = {'+': (4.0, HY - 31.5, HB + 10), '−': (-4.0, HY - 31.5, HB + 10)}

# ---------- Paso 7: protoboard de 400 puntos con el circuito de la guía ----------
S7 = group('S7_Protoboard')
K = 2.54 / 30; CXm, CYm = 530, 447.5; BX, BY = 0.0, -17.25   # entre los sujetadores y la rueda loca
BW, BD, BH = 82.5, 54.5, 8.5
TOP = PT + .8 + BH
ROW = {'+T': 185, '-T': 215, 'a': 290, 'b': 320, 'c': 350, 'd': 380, 'e': 410, 'f': 500, 'g': 530, 'h': 560, 'i': 590, 'j': 620, '-B': 680, '+B': 710}
def px(x, y, z=TOP): return (BX + (x - CXm) * K, BY - (y - CYm) * K, z)
def hole_xy(h, z=TOP):
    _, row, col = h; return px(95 + (col - 1) * 30, ROW[row], z)
box('Adhesivo de la protoboard', (BW - 3, BD - 3, .8), (BX, BY, PT + .4), foam, S7)
box('Protoboard 400 puntos', (BW, BD, BH), (BX, BY, PT + .8 + BH / 2), M['board'], S7, bevel=.8)
W, H = 2048, int(2048 * BD / BW)
img = bpy.data.images.get('protoboard_400.png') or bpy.data.images.new('protoboard_400.png', W, H)
a = np.ones((H, W, 4), dtype=np.float32); a[..., :3] = (0.95, 0.94, 0.90)
UW, UH = BW / K, BD / K; U0, V0 = CXm - UW / 2, CYm - UH / 2
def rect(x0, y0, x1, y1, c):
    r0, r1 = int(H - (y1 - V0) / UH * H), int(H - (y0 - V0) / UH * H); c0, c1 = int((x0 - U0) / UW * W), int((x1 - U0) / UW * W)
    a[max(0, r0):max(0, r1), max(0, c0):max(0, c1), :3] = c
rect(U0, 431, U0 + UW, 479, (0.84, 0.84, 0.80)); rect(U0, 451, U0 + UW, 459, (0.72, 0.72, 0.68))
for y, c in ((168, (0.78, 0.18, 0.22)), (232, (0.17, 0.36, 0.62)), (663, (0.17, 0.36, 0.62)), (727, (0.78, 0.18, 0.22))): rect(70, y - 2, 990, y + 2, c)
rails = [c for c in range(2, 31) if (c - 2) % 6 < 5]
for row, y in ROW.items():
    for c in (rails if len(row) > 1 else range(1, 31)):
        x = 95 + (c - 1) * 30
        rect(x - 7.5, y - 7.5, x + 7.5, y + 7.5, (0.66, 0.66, 0.62)); rect(x - 4.8, y - 4.8, x + 4.8, y + 4.8, (0.06, 0.06, 0.06))
img.pixels.foreach_set(a.ravel()); img.update(); img.pack()
face_mat = bpy.data.materials.get('Protoboard serigrafía') or mat('Protoboard serigrafía', (1, 1, 1), rough=.62)
tex = face_mat.node_tree.nodes.get('Textura') or face_mat.node_tree.nodes.new('ShaderNodeTexImage'); tex.name = 'Textura'; tex.image = img
face_mat.node_tree.links.new(tex.outputs['Color'], face_mat.node_tree.nodes['Principled BSDF'].inputs['Base Color'])
bpy.ops.mesh.primitive_plane_add(size=1, location=v(BX, BY, TOP + .02)); top = bpy.context.active_object
top.name = 'Cara de la protoboard'; top.scale = (BW * MM, BD * MM, 1); bpy.ops.object.transform_apply(scale=True)
assign(top, face_mat); link(top, S7)

def dip(chip):
    """DIP de plástico negro: muesca y punto del pin 1, patas con hombro ancho y punta angosta."""
    n = chip['pins'] // 2; x0 = 95 + (chip['start'] - 1) * 30; x1 = x0 + (n - 1) * 30
    cx, cy, _ = px((x0 + x1) / 2, 455); length = 19.3 if n == 7 else 19.8
    parts = []
    body = box('cuerpo', (length, 6.35, 3.3), (cx, cy, TOP + .5 + 1.65), M['epoxy'], bevel=.45); apply_mods(body)
    boolean(body, cyl('c', .95, 3, (cx - length / 2, cy, TOP + 3.8), M['steel'], verts=24))        # muesca
    boolean(body, cyl('c', .6, .4, (cx - length / 2 + 1.6, cy - 1.9, TOP + 3.8), M['steel'], verts=20))  # punto del pin 1
    parts.append(body)
    for p in range(1, chip['pins'] + 1):
        row = 'f' if p <= n else 'e'; col = chip['start'] + (p - 1 if p <= n else chip['pins'] - p)
        x, y, _ = hole_xy(('A', row, col)); s = 1 if row == 'e' else -1     # e arriba (frente): +Y
        parts.append(box('hombro', (1.52, .7, .25), (x, cy + s * 3.5, TOP + 2.2), M['tin']))
        parts.append(box('pata', (1.52, .25, 1.7), (x, y, TOP + 1.35), M['tin']))
        parts.append(box('punta', (.46, .25, 3.2), (x, y, TOP - 1.1), M['tin']))
    o = join(parts, chip['id'] + ' ' + chip['label'], S7)
    text('Marca ' + chip['id'], chip['label'], (cx + .4, cy + .3, TOP + 3.81), 1.25 if len(chip['label']) > 6 else 1.6, silk, S7)
    return o
for chip in DATA['chips']: dip(chip)

items = {it['id']: it for it in DATA['items']}
def legs(item): return [item['a']] + [r for r in item['routed']] + [item['b']]
# SW1 (selector) y SW2 (encendido): deslizables SS12D00 (1P2T, 3 patas a 2.54 mm), palanca a la izquierda.
def slide_switch(item, name):
    pts = [hole_xy(h) for h in legs(item)]; sx0 = sum(p[0] for p in pts) / 3; sy0 = pts[0][1]
    parts = [box('base', (8.6, 3.6, 3.2), (sx0, sy0, TOP + 1.6), M['black'], bevel=.2),
             box('tapa metálica', (8.7, 3.7, .3), (sx0, sy0, TOP + 3.35), zinc),
             box('pestaña', (.3, 3.7, 2.8), (sx0 - 4.35, sy0, TOP + 2), zinc), box('pestaña', (.3, 3.7, 2.8), (sx0 + 4.35, sy0, TOP + 2), zinc),
             box('palanca', (1.5, 1.5, 4), (sx0 - 1.5, sy0, TOP + 5.5), M['black'], bevel=.2)]
    for x, y, _ in pts: parts.append(box('pata', (.5, .3, 4), (x, y, TOP - 1), M['tin']))
    join(parts, name, S7)
slide_switch(items['P_SW1'], 'SW1 SS12D00 selector (NEGRA)')
slide_switch(items['P_SW2'], 'SW2 SS12D00 encendido (ON)')
# Jumpers rígidos: mismas rutas que el mapa 2D, con las puntas peladas en el agujero.
WIRE = {}
def wire_mat(color):
    if color not in WIRE:
        r, g, b = (int(color[i:i + 2], 16) / 255 for i in (1, 3, 5)); WIRE[color] = mat('Jumper ' + color, ((r * .85) ** 2.2, (g * .85) ** 2.2, (b * .85) ** 2.2), rough=.42)
    return WIRE[color]
for it in DATA['items']:
    if it['kind'] != 'wire': continue
    z = TOP + 1.1 + (it['routeHeight'] - .72) * 2.4
    a1, b1 = hole_xy(it['a']), hole_xy(it['b'])
    path = [(a1[0], a1[1], TOP + .3), (a1[0], a1[1], z)] + [px(x, y, z) for x, y in it['route'][1:-1]] + [(b1[0], b1[1], z), (b1[0], b1[1], TOP + .3)]
    poly('Jumper ' + it['id'] + ' ' + it['net'], path, .42, wire_mat(it['color']), S7)
    for x, y, _ in (a1, b1): box('Punta pelada', (.5, .5, 3), (x, y, TOP - 1.2), M['tin'], S7)

# ---------- Paso 8: cables dupont (macho en la protoboard, hembra en los sensores) ----------
S8 = group('S8_Cables')
color = {'#c6303b': M['wire_red'], '#25282b': M['wire_black'], '#d9b31f': M['wire_yellow']}
def male(x, y):
    box('Conector dupont macho', (2.5, 2.5, 14), (x, y, TOP + 7.6), M['black'], S8, bevel=.2)
    box('Pin dupont', (.64, .64, 4), (x, y, TOP - 1.2), gold, S8)
    return (x, y, TOP + 14.6)
def female_horizontal(x, y, z, sx):
    # x: punta del pin; la hembra cubre el pin desde el cuerpo del encabezado.
    box('Conector dupont hembra', (14, 2.5, 2.5), (x, y, z), M['black'], S8, bevel=.2)
    return (x + sx * 7, y, z)
SLOT = {'VCC': 42, 'GND': 35, 'OUT': 28}                 # ventanas del tope por donde bajan
LANE = {'VCC': 38.6, 'GND': 37.3, 'OUT': 36.0}
for it in DATA['items']:
    if not it['lead']: continue
    hx, hy, _ = hole_xy(it['a']); top = male(hx, hy)
    mod, pin, m = it['module'], it['pin'], color.get(it['color'], M['wire_black'])
    rise = (hx, hy + 3, top[2] + 5)
    if mod in ('SI', 'SD'):
        # Por fuera del portapilas hasta el tope, bajan por su ventana y llegan al pin bajo el tope.
        sx = -1 if mod == 'SI' else 1; px0, py0, pz0 = SENSOR_PINS[(mod, 'D0' if pin == 'OUT' else pin)]
        end = female_horizontal(px0, py0, pz0, sx); lane, slot_x = sx * LANE[pin], sx * SLOT[pin]
        path = [top, rise, (lane, hy + 14, 72), (lane, 84, 70), (slot_x, 94, 58), (slot_x, 94, 38), (sx * 47, py0 - 8, 20), end]
    elif mod in ('MI', 'MD'):
        # Bajan por el agujero junto a la lata de su motor hasta las terminales.
        # Motores iguales: el rojo va a la terminal de arriba en los dos; el derecho lo cruza en la protoboard.
        sx = -1 if mod == 'MI' else 1; tz = 32.5 + (4.5 if it['color'] == '#c6303b' else -4.5)
        end = (sx * 38.6, 62.6, tz)
        path = [top, rise, (sx * 33, hy + 12, 72), (sx * 33, 56, 68), (sx * 34, 64, 54), (sx * 34, 64, 40), (sx * 36.5, 64, tz), end]
    else:
        # Cables del portapilas: de su extremo trasero a la tira de SW2 (+) y al riel azul (−).
        start = HOLDER_WIRE[pin]
        path = [top, rise, (hx, 16, 70), (start[0], 22, 64), start]
    tube('Cable ' + mod + ' ' + pin, path, .7, m, S8, resolution=12)
result = {'objects': len(bpy.data.objects), 'sensor_pins': {k[0] + '.' + k[1]: [round(c, 1) for c in v] for k, v in SENSOR_PINS.items()}}
