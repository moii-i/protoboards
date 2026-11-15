# Pasos 5–8: sensores, pilas, protoboard con el circuito de la guía y cables dupont.
import bpy, math, json
import numpy as np
exec(open(LIB, encoding='utf-8').read())
M = materials()
for name in ('S5_Sensores', 'S6_Baterias', 'S7_Protoboard', 'S8_Cables'):
    e = bpy.data.objects.get(name)
    if e:
        for c in list(e.children_recursive): bpy.data.objects.remove(c, do_unlink=True)
        bpy.data.objects.remove(e, do_unlink=True)
DATA = json.load(open(BOARD_JSON, encoding='utf-8'))
foam = mat('Cinta doble cara', (0.55, 0.56, 0.58), rough=.9)

# ---------- Sensores en espejo: TCRT5000 hacia el centro, 12 mm entre ellos ----------
S5 = group('S5_Sensores')
SENSOR_PINS = {}
for side, key, name in ((-1, 'SI', 'izquierdo'), (1, 'SD', 'derecho')):
    pcb = box('PCB sensor ' + name, (32, 14, 1.6), (side * 18, 128, 14.8), M['pcb'], S5, bevel=.3)
    box('TCRT5000 ' + name, (5.8, 10.2, 6.4), (side * 6, 128, 10.8), M['black'], S5, bevel=.4)
    cyl('Emisor IR ' + name, 2.4, 1.2, (side * 6, 125.6, 7.2), M['ir_blue'], parent=S5, verts=24)
    cyl('Receptor IR ' + name, 2.4, 1.2, (side * 6, 130.4, 7.2), M['ir_black'], parent=S5, verts=24)
    box('Trimpot ' + name, (6.5, 6.5, 4.5), (side * 13.5, 128, 17.85), M['pot_blue'], S5, bevel=.4)
    cyl('Tornillo del trimpot ' + name, 1.6, .8, (side * 13.5, 128, 20.4), M['brass'], parent=S5, verts=20)
    box('LM393 ' + name, (4, 5, 1.5), (side * 24, 124, 16.35), M['epoxy'], S5, bevel=.2)
    for dy, mm in ((131.5, M['led_red']), (125, M['led_red'])): box('LED SMD ' + name, (1.6, .8, .6), (side * 25.5, dy, 15.9), mm, S5)
    for i, (pin, y) in enumerate((('VCC', 124.5), ('GND', 128), ('OUT', 131.5))):
        box('Pin ' + pin + ' ' + name, (.64, .64, 9), (side * 31, y, 19.6), M['tin'], S5)
        box('Base del pin ' + name, (2.5, 2.5, 2.5), (side * 31, y, 16.9), M['black'], S5)
        SENSOR_PINS[(key, pin)] = (side * 31, y, 24)
    cyl('Separador de latón 30 mm ' + name, 2.6, 30.4, (side * 18, 128, 30.8), M['brass'], parent=S5, verts=6)
    cyl('Tornillo inferior ' + name, 2.7, 1.8, (side * 18, 128, 13.1), M['steel'], parent=S5, verts=20, bevel=.4)
    cyl('Tornillo superior ' + name, 2.7, 1.8, (side * 18, 128, 49.9), M['steel'], parent=S5, verts=20, bevel=.4)

# ---------- Pilas: 4 × AA atrás y 9 V al frente ----------
S6 = group('S6_Baterias')
box('Cinta del portapilas', (54, 58, .8), (0, -30, 49.4), foam, S6)
holder = box('Portapilas 4 × AA', (58, 62, 15), (0, -30, 57.3), M['black'], S6, bevel=1.2)
apply_mods(holder)
boolean(holder, box('c', (55, 56, 15), (0, -30, 61.2), M['steel']))
for i, x in enumerate((-21.75, -7.25, 7.25, 21.75)):
    cell = cyl('Pila AA', 7.25, 50.5, (x, -30, 58.5), M['aa'], axis='Y', parent=S6, verts=40, bevel=.6)
    cyl('Franja de la pila AA', 7.3, 6, (x, -30 + (18 if i % 2 else -18), 58.5), M['aa_gold'], axis='Y', parent=S6, verts=40)
    cyl('Polo de la pila AA', 2.6, 1.6, (x, -30 + (26 if i % 2 else -26), 58.5), M['steel'], axis='Y', parent=S6, verts=20)
box('Cinta de la pila 9 V', (44, 22, .8), (0, 79.25, 49.4), foam, S6)
nine = box('Pila 9 V', (48.5, 26.5, 17.5), (0, 79.25, 58.55), M['nine'], S6, bevel=1.5)
box('Etiqueta 9 V', (30, 26.7, 9), (-4, 79.25, 58.55), M['label'], S6)
text('Texto 9 V', '9 V', (-4, 79.25, 67.4), 7, M['nine'], S6)
for dy, r, verts in ((-6.35, 4, 6), (6.35, 3.2, 24)):
    cyl('Borne 9 V', r, 3, (25.8, 79.25 + dy, 58.55), M['steel'], axis='X', parent=S6, verts=verts)
box('Broche de 9 V', (6, 24, 12), (30.3, 79.25, 58.55), M['black'], S6, bevel=1)

# ---------- Protoboard de 400 puntos con el circuito de la guía ----------
S7 = group('S7_Protoboard')
K = 2.54 / 30; CX, CY, TOP = 530, 447.5, 57.5; BY = 31.5
ROW = {'+T': 185, '-T': 215, 'a': 290, 'b': 320, 'c': 350, 'd': 380, 'e': 410, 'f': 500, 'g': 530, 'h': 560, 'i': 590, 'j': 620, '-B': 680, '+B': 710}
def px(x, y, z=TOP): return ((x - CX) * K, BY - (y - CY) * K, z)
def hole_xy(h, z=TOP):
    _, row, col = h; return px(95 + (col - 1) * 30, ROW[row], z)
box('Adhesivo de la protoboard', (78, 50, .8), (0, BY, 49.4), foam, S7)
body = box('Protoboard 400 puntos', (79.6, 51.2, 7.7), (0, BY, 53.65), M['board'], S7, bevel=.8)
# Textura de la cara superior: agujeros, rieles y canal central (misma geometría que el mapa 2D).
W, H = 2048, 1318
img = bpy.data.images.get('protoboard_400.png') or bpy.data.images.new('protoboard_400.png', W, H)
a = np.ones((H, W, 4), dtype=np.float32); a[..., :3] = (0.94, 0.93, 0.89)
sx, sy = W / 940, H / 605
def rect(x0, y0, x1, y1, c):
    r0, r1 = int(H - (y1 - 145) * sy), int(H - (y0 - 145) * sy); c0, c1 = int((x0 - 60) * sx), int((x1 - 60) * sx)
    a[max(0, r0):max(0, r1), max(0, c0):max(0, c1), :3] = c
rect(80, 431, 980, 479, (0.80, 0.80, 0.76))
rect(80, 449, 980, 461, (0.70, 0.70, 0.66))
for y, c in ((172, (0.72, 0.25, 0.30)), (228, (0.23, 0.41, 0.56)), (667, (0.23, 0.41, 0.56)), (723, (0.72, 0.25, 0.30))): rect(82, y - 1.5, 978, y + 1.5, c)
rails = [c for c in range(2, 31) if (c - 2) % 6 < 5]
for row, y in ROW.items():
    cols = rails if len(row) > 1 else range(1, 31)
    for c in cols:
        x = 95 + (c - 1) * 30
        rect(x - 7, y - 7, x + 7, y + 7, (0.62, 0.62, 0.58)); rect(x - 4.5, y - 4.5, x + 4.5, y + 4.5, (0.08, 0.08, 0.08))
img.pixels.foreach_set(a.ravel()); img.update(); img.pack()
face_mat = bpy.data.materials.get('Protoboard serigrafía') or mat('Protoboard serigrafía', (1, 1, 1), rough=.62)
tex = face_mat.node_tree.nodes.get('Textura') or face_mat.node_tree.nodes.new('ShaderNodeTexImage'); tex.name = 'Textura'; tex.image = img
face_mat.node_tree.links.new(tex.outputs['Color'], face_mat.node_tree.nodes['Principled BSDF'].inputs['Base Color'])
bpy.ops.mesh.primitive_plane_add(size=1, location=v(0, BY, TOP + .02)); top = bpy.context.active_object
top.name = 'Cara de la protoboard'; top.scale = (79.6 * MM, 51.2 * MM, 1); bpy.ops.object.transform_apply(scale=True)
assign(top, face_mat); link(top, S7)

def leg(h, height=3.2, parent=S7, m=None):
    x, y, _ = hole_xy(h); box('Pata', (.5, .5, height + 1.2), (x, y, TOP + height / 2 - .6), m or M['tin'], parent)
for chip in DATA['chips']:
    n = chip['pins'] // 2; x0 = 95 + (chip['start'] - 1) * 30; x1 = x0 + (n - 1) * 30
    cx, cy, _ = px((x0 + x1) / 2, 455); length = (n - 1) * 2.54 + 2.6
    dip = box(chip['id'] + ' ' + chip['label'], (length, 6.4, 3.3), (cx, cy, TOP + 2.65), M['epoxy'], S7, bevel=.35)
    apply_mods(dip)
    boolean(dip, cyl('c', 1, 6, (cx - length / 2, cy, TOP + 4.3), M['steel'], verts=20))
    cyl('Marca pin 1', .55, .1, (cx - length / 2 + 1.6, cy - 1.8, TOP + 4.31), M['label'], parent=S7, verts=16)
    text('Rótulo ' + chip['id'], chip['label'], (cx, cy + .6, TOP + 4.32), 1.5 if len(chip['label']) > 6 else 1.9, M['label'], S7)
    for p in range(1, chip['pins'] + 1):
        row = 'f' if p <= n else 'e'; col = chip['start'] + (p - 1 if p <= n else chip['pins'] - p)
        x, y, _ = hole_xy(('A', row, col)); toward = 1 if row == 'f' else -1
        box('Pata ' + chip['id'], (.5, .3, 4), (x, y, TOP + 1.2), M['tin'], S7)
        box('Hombro ' + chip['id'], (.5, 1.2, .3), (x, y + toward * .5, TOP + 3.1), M['tin'], S7)

items = {it['id']: it for it in DATA['items']}
reg = items['P_U3']
legs = [reg['a'], reg['routed'][0], reg['b']]
pts = [hole_xy(h) for h in legs]; rx = sum(p[0] for p in pts) / 3; ry = pts[0][1]
for h in legs: leg(h, 5)
box('U3 7805', (10.2, 4.5, 9), (rx, ry, TOP + 9.5), M['epoxy'], S7, bevel=.4)
tab = box('Pestaña del 7805', (10.2, 1.3, 15.5), (rx, ry + 2.9, TOP + 12.8), M['steel'], S7)
apply_mods(tab); boolean(tab, cyl('c', 1.8, 6, (rx, ry + 2.9, TOP + 17.3), M['steel'], axis='Y', verts=24))
text('Rótulo 7805', '7805', (rx, ry - 2.27, TOP + 10), 2.2, M['label'], S7, rot_z=0).rotation_euler = (math.pi / 2, 0, math.pi)
for key, label in (('P_C1', '334'), ('P_C2', '104')):
    c = items[key]; a1, b1 = hole_xy(c['a']), hole_xy(c['b']); mx, my = (a1[0] + b1[0]) / 2, (a1[1] + b1[1]) / 2
    for h in (c['a'], c['b']): leg(h, 3.5)
    disc = cyl(c['partId'] + ' ' + label, 2.6, 1.6, (mx, my, TOP + 5.6), M['ceramic'], axis='Y', parent=S7, verts=32, bevel=.5)
sw = items['P_SW1']; legs = [sw['a'], sw['routed'][0], sw['b']]; pts = [hole_xy(h) for h in legs]
sx0 = sum(p[0] for p in pts) / 3; sy0 = pts[0][1]
for h in legs: leg(h, 1.5)
box('SW1 selector', (8.6, 3.6, 3.6), (sx0, sy0, TOP + 2.6), M['black'], S7, bevel=.3)
box('Cubierta metálica SW1', (8.8, 3.8, .3), (sx0, sy0, TOP + 4.5), M['steel'], S7)
box('Palanca SW1 (NEGRA)', (1.6, 1.6, 3.6), (sx0 - 1.9, sy0, TOP + 6.3), M['black'], S7, bevel=.3)
# Jumpers: mismas rutas que el mapa 2D.
WIRE = {}
def wire_mat(color):
    if color not in WIRE: r, g, b = (int(color[i:i + 2], 16) / 255 for i in (1, 3, 5)); WIRE[color] = mat('Jumper ' + color, ((r * .85) ** 2.2, (g * .85) ** 2.2, (b * .85) ** 2.2), rough=.42)
    return WIRE[color]
for it in DATA['items']:
    if it['kind'] != 'wire': continue
    z = TOP + 1.1 + (it['routeHeight'] - .72) * 2.4
    route = it['route']; a1 = hole_xy(it['a']); b1 = hole_xy(it['b'])
    path = [(a1[0], a1[1], TOP - 1.5), (a1[0], a1[1], z)] + [px(x, y, z) for x, y in route[1:-1]] + [(b1[0], b1[1], z), (b1[0], b1[1], TOP - 1.5)]
    poly('Jumper ' + it['id'] + ' ' + it['net'], path, .42, wire_mat(it['color']), S7)

# ---------- Cables dupont a sensores, motores y pilas ----------
S8 = group('S8_Cables')
color = {'#c6303b': M['wire_red'], '#25282b': M['wire_black'], '#d9b31f': M['wire_yellow']}
def dupont(h_or_point, top=True):
    x, y, z = h_or_point
    box('Conector dupont', (2.5, 2.5, 14), (x, y, z + 7), M['black'], S8, bevel=.2)
    return (x, y, z + 14)
for it in DATA['items']:
    if not it['lead']: continue
    hx, hy, _ = hole_xy(it['a']); top = dupont((hx, hy, TOP - 1))
    mod, pin, m = it['module'], it['pin'], color.get(it['color'], M['wire_black'])
    if mod in ('SI', 'SD'):
        side = -1 if mod == 'SI' else 1; px0, py0, pz0 = SENSOR_PINS[(mod, pin)]
        end = dupont((px0, py0, pz0))
        path = [top, (hx, hy + 6, top[2] + 6), (side * 10 + hx * .3, 100, 76), (side * (14 + {'VCC': 0, 'GND': 2, 'OUT': 4}[pin]), 108, 52), (side * 22, 112, 42), end]
    elif mod in ('MI', 'MD'):
        side = -1 if mod == 'MI' else 1; tz = 38 if pin == 'A' else 28
        end = (side * 33 + side * 1.5, 67.5, tz)
        path = [top, (hx, hy + 4, top[2] + 6), (side * 40, 56, 66), (side * 40, 52, 47), (side * 38, 64, 42), end]
    elif mod == 'BM':
        dx = 4 if pin == '+' else -4; end = (dx, 1.5, 60)
        path = [top, (hx, hy - 3, top[2] + 3), (dx * 2 + 10, 3, 66), end]
    else:
        dy = -3 if pin == '+' else 3; end = (31, 79.25 + dy, 64)
        path = [top, (hx + 2, hy + 6, top[2] + 4), (33, 74 + dy, 72), end]
    tube('Cable ' + it['module'] + ' ' + it['pin'], path, .7, m, S8, resolution=10)
result = {'objects': len(bpy.data.objects)}
