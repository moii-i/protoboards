# Pasos 1–4 del kit ZK-2WD (manual del fabricante: placa de acrílico de 3 mm, 4 sujetadores,
# 2 motorreductores TT 1:48 con encoder, 4 tornillos M3 × 30 con tuerca, 2 ruedas de 65 mm,
# rueda loca giratoria con 4 postes de latón L12 y 8 tornillos M3 × 6).
# Milímetros; X derecha, Y frente, Z arriba. Eje de las ruedas en Y = 0, Z = 32.5.
import bpy, bmesh, math
from mathutils import Vector
exec(open(LIB, encoding='utf-8').read())
clear_scene()
M = materials()
PB, PT = 44.0, 47.0          # cara inferior y superior de la placa
AXLE_Z = 32.5                # rueda de 65 mm
GB_IN, GB_OUT = 29.2, 48.0   # caras de la caja reductora (18.8 mm), lado derecho
WHEEL_X = 68.5             # 137 mm entre centros de las ruedas
BODY, REAR = 53.0, -78.0     # placa angosta de 106 mm; extremo trasero (rueda loca)
TIP_X, TIP_Y, FRONT = 73.5, 89.5, 132.0   # tope frontal de 147 mm de ancho
FAST_Y, HOLE_Z = 18.5, (24.5, 40.5)
zinc = mat('Acero zincado', (0.70, 0.71, 0.73), rough=.32, metal=1)
nylon = mat('Nylon blanco', (0.90, 0.90, 0.88), rough=.35, transmission=.25)
white = mat('Plástico blanco', (0.93, 0.93, 0.91), rough=.45)
encoder = mat('Encoder negro', (0.02, 0.02, 0.022), rough=.55)

def arc(cx, cy, r, a0, a1, n=10):
    return [(cx + r * math.cos(math.radians(a0 + (a1 - a0) * i / n)), cy + r * math.sin(math.radians(a0 + (a1 - a0) * i / n))) for i in range(n + 1)]

def outline():
    """Contorno de la placa (medido en la foto del chasis armado): cuerpo angosto de 106 mm con las
    ruedas por fuera, tope frontal curvo de 147 mm y extremo trasero redondeado; 210 mm de largo."""
    right = arc(BODY - 10, REAR + 10, 10, -90, 0, 6) + [(BODY, 84), (70, 86)] + arc(70, TIP_Y, 3.5, -90, 0, 4)[1:]
    front = [(TIP_X * math.cos(math.pi * i / 40), TIP_Y + (FRONT - TIP_Y) * math.sin(math.pi * i / 40)) for i in range(41)]
    p = [(0, REAR)] + right + front[1:] + [(-x, y) for x, y in reversed(right)]
    out = []
    for q in p:
        if not out or (abs(out[-1][0] - q[0]) > 1e-6 or abs(out[-1][1] - q[1]) > 1e-6): out.append(q)
    return out

# ---------- Paso 1: placa y sujetadores ----------
S1 = group('S1_Chasis')
bm = bmesh.new()
verts = [bm.verts.new((x * MM, y * MM, PB * MM)) for x, y in outline()]
face = bm.faces.new(verts)
ext = bmesh.ops.extrude_face_region(bm, geom=[face])
bmesh.ops.translate(bm, vec=(0, 0, (PT - PB) * MM), verts=[e for e in ext['geom'] if isinstance(e, bmesh.types.BMVert)])
bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
me = bpy.data.meshes.new('Chasis'); bm.to_mesh(me); bm.free()
plate = bpy.data.objects.new('Chasis acrílico ZK-2WD', me); bpy.context.scene.collection.objects.link(plate)
assign(plate, M['acrylic'])
cutters = []
def hole(x, y, r): cutters.append(cyl('c', r, 12, (x, y, PB + 1.5), M['steel'], verts=16 if r < 2 else 32))
def slot(x, y, w, h): cutters.append(box('c', (w, h, 12), (x, y, PB + 1.5), M['steel']))
def prism(pts):
    """Un solo cortador con el contorno completo (cruces y ranuras redondas): el booleano no falla
    con piezas encimadas ni tangentes."""
    bm = bmesh.new(); f = bm.faces.new([bm.verts.new((x * MM, y * MM, (PB - 4.5) * MM)) for x, y in pts])
    e = bmesh.ops.extrude_face_region(bm, geom=[f])
    bmesh.ops.translate(bm, vec=(0, 0, 12 * MM), verts=[g for g in e['geom'] if isinstance(g, bmesh.types.BMVert)])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new('c'); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new('c', me); bpy.context.scene.collection.objects.link(o); assign(o, M['steel']); cutters.append(o)
def cross(x, y, a, b, x0, x1, c):
    """Ranura vertical de ±a × ±b con brazo horizontal de x0 a x1 y ±c."""
    x0, x1 = min(x0, x - a), max(x1, x + a)
    pts = [(x - a, y - b), (x + a, y - b), (x + a, y - c), (x1, y - c), (x1, y + c), (x + a, y + c), (x + a, y + b),
           (x - a, y + b), (x - a, y + c), (x0, y + c), (x0, y - c), (x - a, y - c)]
    prism([p for i, p in enumerate(pts) if p != pts[i - 1]])
def oval(x, y, length, width, angle=0, n=10):
    s, r = length / 2 - width / 2, width / 2; ca, sa = math.cos(angle), math.sin(angle)
    local = [(s + r * math.cos(t), r * math.sin(t)) for t in (math.pi * (i / n - .5) for i in range(n + 1))]
    local += [(-s - r * math.cos(t), -r * math.sin(t)) for t in (math.pi * (i / n - .5) for i in range(n + 1))]
    prism([(x + u * ca - w * sa, y + u * sa + w * ca) for u, w in local])
CASTER_Y = -62.0
for sx in (-1, 1):
    for fx in (GB_IN - 1.5, GB_OUT + 1.5):                 # ranuras en cruz de los sujetadores
        x = sx * fx; arm = (x - 4.5, x + 4.5) if fx < 40 else ((x - 3.5, x + 1.7) if sx > 0 else (x - 1.7, x + 3.5))
        cross(x, FAST_Y, 1.7, 4.2, arm[0], arm[1], 1.7)
    hole(sx * 34, 64, 3)                                   # cables de los motores, junto a la lata
    cross(sx * 22, 47, 3, 10, sx * 22 - 6.5, sx * 22 + 6.5, 3)   # ventanas en cruz junto a los motores
    oval(sx * 19, 118, 30, 4.5)                            # ranuras de los sensores en el tope
    oval(sx * 54, 105, 26, 4.5, angle=sx * -0.54)          # ranuras diagonales del tope
    for t in (.48, .66, .84): hole(sx * 69 * math.cos(t), TIP_Y + 38 * math.sin(t), 1.6)
    for x in (28, 35, 42): slot(sx * x, 94, 4.5, 9)        # tres ventanas por lado: cables de los sensores
    for x, y in ((9, 126), (25, 108), (46, 78), (46, 70), (40, 52), (40, 40), (10, 47), (14, 6), (46, -24), (46, -62), (32, -72)):
        hole(sx * x, y, 1.6)
    oval(sx * 18, -23, 15, 4.5)                            # óvalos detrás del eje
    for y in (-34, -40, -46): slot(sx * 42, y, 8, 3)       # rejilla trasera
    for dy in (-11.5, 11.5): hole(sx * 11.5, CASTER_Y + dy, 1.6)   # rueda loca
hole(0, 100, 9.5)                                          # ventana redonda del tope
slot(0, 18, 9, 12)                                         # ventana central entre los motores
for y in (39, 79): hole(0, y, 1.6)                          # tornillos del portapilas
hole(0, 58, 1.6)
for c in cutters: boolean(plate, c)
bev = plate.modifiers.new('bevel', 'BEVEL'); bev.width = .5 * MM; bev.segments = 1; bev.limit_method = 'ANGLE'
apply_mods(plate); link(plate, S1)

def t_fastener(name, x):
    """Sujetador de acrílico en T: la barra superior se apoya en la placa y el vástago baja junto al motor."""
    bm = bmesh.new()
    prof = [(-4, 20.0), (4, 20.0), (4, PT), (7, PT), (7, PT + 3), (-7, PT + 3), (-7, PT), (-4, PT)]
    vs = [bm.verts.new((x * MM - 1.5 * MM, (FAST_Y + py) * MM, z * MM)) for py, z in prof]
    f = bm.faces.new(vs); e = bmesh.ops.extrude_face_region(bm, geom=[f])
    bmesh.ops.translate(bm, vec=(3 * MM, 0, 0), verts=[g for g in e['geom'] if isinstance(g, bmesh.types.BMVert)])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name); bm.to_mesh(me); bm.free()
    o = bpy.data.objects.new(name, me); bpy.context.scene.collection.objects.link(o); assign(o, M['acrylic_edge'])
    for z in HOLE_Z: boolean(o, cyl('c', 1.6, 8, (x, FAST_Y, z), M['steel'], axis='X', verts=20))
    return mark_insert(link(o, S1), (0, 0, 1), dist=30)
for sx in (-1, 1):
    for fx in (GB_IN - 1.5, GB_OUT + 1.5): t_fastener('Sujetador de acrílico', sx * fx)

# ---------- Paso 2: motorreductores TT 1:48, encoders, tornillos M3 × 30 y tuercas ----------
S2 = group('S2_Motores')
screw30, nut = pan_screw(30, zinc), hex_nut(zinc)
for sx, name in ((-1, 'izquierdo'), (1, 'derecho')):
    cx = sx * (GB_IN + GB_OUT) / 2
    for half, (a, b) in enumerate(((GB_IN, (GB_IN + GB_OUT) / 2 - .1), ((GB_IN + GB_OUT) / 2 + .1, GB_OUT))):
        shell = box('Caja reductora TT ' + name, (b - a, 48, 22.5), (sx * (a + b) / 2, 12.5, AXLE_Z), M['yellow'], S2, bevel=1.4)
        apply_mods(shell)
        for z in HOLE_Z: boolean(shell, cyl('c', 1.6, 30, (cx, FAST_Y, z), M['steel'], axis='X', verts=20))
    for face_x in (GB_IN - .7, GB_OUT + .7):                # bujes del eje en ambas caras
        cyl('Buje del eje ' + name, 4.6, 1.4, (sx * face_x, 0, AXLE_Z), M['yellow'], axis='X', parent=S2, verts=28, bevel=.3)
    for y in (-6, 31): cyl('Tornillo de la carcasa ' + name, 1.1, .6, (sx * (GB_OUT + .3), y, AXLE_Z + 7), M['steel'], axis='X', parent=S2, verts=12)
    # Eje doble en D (blanco): sale 9.5 mm por cada lado de la caja.
    shaft = cyl('Eje en D ' + name, 2.7, 38.5, (sx * (GB_IN + GB_OUT) / 2, 0, AXLE_Z), M['shaft'], axis='X', verts=20)
    boolean(shaft, box('c', (40, 6, 2), (sx * (GB_IN + GB_OUT) / 2, 0, AXLE_Z + 2.85), M['steel']))
    link(shaft, S2)
    # Motor CC: lata ovalada plateada, tapa trasera negra, terminales de latón y abrazadera blanca.
    can = cyl('Motor CC ' + name, 10, 22, (cx, 47.5, AXLE_Z), M['can'], axis='Y', verts=40, bevel=.8)
    can.scale = (.77, 1, 1); bpy.context.view_layer.objects.active = can; bpy.ops.object.transform_apply(scale=True); link(can, S2)
    cyl('Tapa trasera ' + name, 7.4, 2.2, (cx, 59.6, AXLE_Z), M['black'], axis='Y', parent=S2, verts=32).scale = (.77, 1, 1)
    for dz in (-4.5, 4.5): box('Terminal de latón ' + name, (2.4, 3, .4), (cx, 61.8, AXLE_Z + dz), M['brass'], S2)
    box('Abrazadera del motor ' + name, (16.6, 4, 21), (cx, 44, AXLE_Z), white, S2, bevel=.8)
    # Encoder de 20 ranuras en el eje interior.
    disc = cyl('Encoder ' + name, 11.4, 1.2, (sx * (GB_IN - 6.5), 0, AXLE_Z), encoder, axis='X', verts=48)
    for i in range(20):
        a = 2 * math.pi * i / 20
        cut = box('c', (4, 2.2, 3.6), (sx * (GB_IN - 6.5), 9.2 * math.cos(a), AXLE_Z + 9.2 * math.sin(a)), M['steel'])
        cut.rotation_euler = (a, 0, 0); boolean(disc, cut)
    boolean(disc, cyl('c', 2.8, 4, (sx * (GB_IN - 6.5), 0, AXLE_Z), M['steel'], axis='X', verts=16))
    mark_insert(link(disc, S2), (-sx, 0, 0), dist=14)
    # Tornillos de fuera hacia dentro y tuercas por el lado interior.
    for z in HOLE_Z:
        place(screw30, 'Tornillo M3 × 30 ' + name, (sx * (GB_OUT + 3), FAST_Y, z), (-sx, 0, 0), S2, insert=(sx, 0, 0), dist=26)
        place(nut, 'Tuerca M3 ' + name, (sx * (GB_IN - 3), FAST_Y, z), (-sx, 0, 0), S2, insert=(-sx, 0, 0), dist=10)

# ---------- Paso 3: ruedas de 65 mm (rin amarillo de 5 rayos y llanta de goma con taco) ----------
S3 = group('S3_Ruedas')
for sx, name in ((-1, 'izquierda'), (1, 'derecha')):
    cx = sx * WHEEL_X
    tire = cyl('Llanta ' + name, 32.5, 26, (cx, 0, AXLE_Z), M['rubber'], axis='X', verts=96)
    boolean(tire, cyl('c', 26, 30, (cx, 0, AXLE_Z), M['steel'], axis='X', verts=96))
    cuts = []
    for i in range(36):                                    # tacos alternados a cada lado del centro
        a = 2 * math.pi * i / 36
        side = 6.5 if i % 2 else -6.5
        g = box('c', (11, 2.4, 3), (cx + side, 32.5 * math.cos(a), AXLE_Z + 32.5 * math.sin(a)), M['steel'])
        g.rotation_euler = (a, 0, 0); cuts.append(g)
    rim_groove = cyl('c', 33, 1.6, (cx, 0, AXLE_Z), M['steel'], axis='X', verts=96)
    boolean(rim_groove, cyl('c', 31.2, 4, (cx, 0, AXLE_Z), M['steel'], axis='X', verts=96)); cuts.append(rim_groove)  # ranura central
    bpy.ops.object.select_all(action='DESELECT')
    for g in cuts: g.select_set(True)
    bpy.context.view_layer.objects.active = cuts[0]; bpy.ops.object.join(); boolean(tire, cuts[0])
    b = tire.modifiers.new('bevel', 'BEVEL'); b.width = 1.6 * MM; b.segments = 3; b.limit_method = 'ANGLE'; b.angle_limit = math.radians(60)
    apply_mods(tire); smooth(tire); mark_insert(link(tire, S3), (sx, 0, 0), dist=40)
    ring = cyl('Rin ' + name, 26.2, 20, (cx, 0, AXLE_Z), M['yellow'], axis='X', verts=64)
    boolean(ring, cyl('c', 22.5, 24, (cx, 0, AXLE_Z), M['steel'], axis='X', verts=64))
    parts = [ring, cyl('Maza ' + name, 6.5, 25, (cx - sx * 6, 0, AXLE_Z), M['yellow'], axis='X', verts=32, bevel=.6)]  # cubre el eje desde x = 51
    for i in range(5):                                      # cinco rayos
        a = 2 * math.pi * i / 5 + .3
        s = box('Rayo ' + name, (6, 17, 4.5), (cx + sx * 5, 14.5 * math.cos(a), AXLE_Z + 14.5 * math.sin(a)), M['yellow'], bevel=.8)
        s.rotation_euler = (a, 0, 0); parts.append(s)  # rayo radial
    face = cyl('Cara del rin ' + name, 23, 1.6, (cx + sx * 7.8, 0, AXLE_Z), M['yellow'], axis='X', verts=64)
    for i in range(5):
        a = 2 * math.pi * i / 5 + .3 + math.pi / 5
        boolean(face, cyl('c', 6.6, 6, (cx + sx * 7.8, 14.5 * math.cos(a), AXLE_Z + 14.5 * math.sin(a)), M['steel'], axis='X', verts=24))
    boolean(face, cyl('c', 6, 6, (cx + sx * 7.8, 0, AXLE_Z), M['steel'], axis='X', verts=24)); parts.append(face)
    bpy.ops.object.select_all(action='DESELECT')
    for p in parts: apply_mods(p); p.select_set(True)
    bpy.context.view_layer.objects.active = ring; bpy.ops.object.join()
    boolean(ring, cyl('c', 2.75, 30, (cx, 0, AXLE_Z), M['steel'], axis='X', verts=16))
    ring.name = 'Rin de 5 rayos ' + name; smooth(ring, 40); mark_insert(link(ring, S3), (sx, 0, 0), dist=40)

# ---------- Paso 4: rueda loca giratoria con 4 postes L12 y 8 tornillos M3 × 6 ----------
S4 = group('S4_RuedaLoca')
CX, CY, PLATE_TOP = 0.0, CASTER_Y, 32.0                   # atrás, en el extremo angosto
base = box('Placa de la rueda loca', (31, 31, 1.4), (CX, CY, PLATE_TOP - .7), zinc, bevel=1.5); apply_mods(base)
for sx in (-1, 1):
    for sy in (-1, 1): boolean(base, cyl('c', 1.7, 4, (CX + sx * 11.5, CY + sy * 11.5, PLATE_TOP), zinc, verts=16))
link(base, S4)
cyl('Rodamiento giratorio', 12, 3, (CX, CY, PLATE_TOP - 2.9), zinc, parent=S4, verts=40, bevel=.6)
WY, WZ = CY - 9, 12.5                                     # la rueda va detrás del pivote
for sx in (-1, 1):
    arm = box('Horquilla', (1.4, 22, 18), (CX + sx * 6.4, CY - 5, PLATE_TOP - 13.5), zinc, S4, bevel=.6)
cyl('Rueda de nylon', 12.5, 10, (CX, WY, WZ), nylon, axis='X', parent=S4, verts=48, bevel=1.2)
cyl('Buje de la rueda', 5, 11, (CX, WY, WZ), zinc, axis='X', parent=S4, verts=24)
cyl('Eje de la horquilla', 1.4, 15.5, (CX, WY, WZ), zinc, axis='X', parent=S4, verts=12)
post, screw6 = standoff(12, M['brass']), pan_screw(6, zinc)
for sx in (-1, 1):
    for sy in (-1, 1):
        x, y = CX + sx * 11.5, CY + sy * 11.5
        place(post, 'Poste de latón L12', (x, y, PB), (0, 0, -1), S4, insert=(0, 0, -1), dist=16)
        place(screw6, 'Tornillo M3 × 6 (placa)', (x, y, PT), (0, 0, -1), S4, insert=(0, 0, 1), dist=12)
        place(screw6, 'Tornillo M3 × 6 (rueda loca)', (x, y, PLATE_TOP - 1.4), (0, 0, 1), S4, insert=(0, 0, -1), dist=12)

result = {'objects': len(bpy.data.objects)}
