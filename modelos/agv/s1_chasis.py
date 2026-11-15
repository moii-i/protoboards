# Paso 1–4: chasis de acrílico, motorreductores TT, ruedas y rueda loca.
import bpy, bmesh, math
exec(open(LIB, encoding='utf-8').read())
clear_scene()
M = materials()
PLATE_Z = 46.0; T = 3.0

def rounded_outline():
    """Contorno del chasis: parte trasera angosta (ruedas) y frente más ancho."""
    def arc(cx, cy, r, a0, a1, n=8):
        return [(cx + r * math.cos(math.radians(a0 + (a1 - a0) * i / n)), cy + r * math.sin(math.radians(a0 + (a1 - a0) * i / n))) for i in range(n + 1)]
    pts = []
    pts += arc(-43, -54, 8, 180, 270)          # trasera izquierda
    pts += arc(43, -54, 8, 270, 360)           # trasera derecha
    pts += [(51, 34), (58, 44)]                # hombro derecho
    pts += arc(44, 124, 14, 0, 90)             # frente derecho
    pts += arc(-44, 124, 14, 90, 180)          # frente izquierdo
    pts += [(-58, 44), (-51, 34)]
    return pts

S1 = group('S1_Chasis')
bm = bmesh.new()
verts = [bm.verts.new((x * MM, y * MM, PLATE_Z * MM)) for x, y in rounded_outline()]
face = bm.faces.new(verts)
ext = bmesh.ops.extrude_face_region(bm, geom=[face])
bmesh.ops.translate(bm, vec=(0, 0, T * MM), verts=[e for e in ext['geom'] if isinstance(e, bmesh.types.BMVert)])
bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
mesh = bpy.data.meshes.new('Chasis'); bm.to_mesh(mesh); bm.free()
plate = bpy.data.objects.new('Chasis acrílico', mesh); bpy.context.scene.collection.objects.link(plate)
assign(plate, M['acrylic'])
# Ranuras y agujeros: paso de cables, soportes de motor, rueda loca y separadores de sensores.
cutters = []
def hole(x, y, r):
    cutters.append(cyl('c', r, 12, (x, y, PLATE_Z + 1.5), M['steel'], verts=24))
def slot(x, y, w, h):
    cutters.append(box('c', (w, h, 12), (x, y, PLATE_Z + 1.5), M['steel']))
slot(0, 108, 52, 6)                                     # cables de sensores
for sx in (-1, 1):
    hole(sx * 40, 52, 4)                                # cables de motores
    for bx in (20.5, 45.5): slot(sx * bx, 8, 3.3, 28)   # soportes de motor
    hole(sx * 18, 128, 1.7)                             # separadores de sensores
    hole(sx * 9, 92, 1.7)                               # rueda loca
for x in range(-40, 41, 16):
    for y in (-46, -24, 20):
        if abs(x) < 36: hole(x, y, 1.6)                 # rejilla del kit para tornillos
for c in cutters: boolean(plate, c)
bev = plate.modifiers.new('bevel', 'BEVEL'); bev.width = 0.6 * MM; bev.segments = 2; bev.limit_method = 'ANGLE'
apply_mods(plate); link(plate, S1)

# ---------- Motorreductores TT con soportes ----------
S2 = group('S2_Motores')
for side, name in ((-1, 'izquierdo'), (1, 'derecho')):
    cx = side * 33
    gear = box('Caja reductora ' + name, (22, 52, 24), (cx, 12, 33), M['yellow'], S2, bevel=1.2)
    box('Tapa de caja ' + name, (22.4, 30, 1.2), (cx, 2, 45.3), M['yellow'], S2)
    can = cyl('Motor CC ' + name, 10, 26, (cx, 51, 33), M['can'], axis='Y', parent=S2, verts=40, bevel=.8)
    can.scale = (.78, 1, 1); bpy.context.view_layer.objects.active = can; bpy.ops.object.transform_apply(scale=True)
    cyl('Tapa trasera ' + name, 8.2, 2, (cx, 65, 33), M['black'], axis='Y', parent=S2, verts=32).scale = (.78, 1, 1)
    for dz in (-5, 5): box('Terminal ' + name, (3, 3, 1), (cx, 66.5, 33 + dz), M['brass'], S2)
    cyl('Eje ' + name, 2.7, 16, (side * 51, 0, 33), M['shaft'], axis='X', parent=S2, verts=20)
    for bx in (20.5, 45.5):
        box('Soporte acrílico ' + name, (3, 28, 27), (side * bx, 8, 33.5), M['acrylic_edge'], S2, bevel=.4)
        box('Lengüeta del soporte ' + name, (3, 26, 3), (side * bx, 8, 47.5), M['acrylic_edge'], S2)
    for y, z in ((1, 38), (16, 27)):
        cyl('Tornillo M3 ' + name, 1.5, 33, (side * 33, y, z), M['steel'], axis='X', parent=S2, verts=16)
        cyl('Cabeza ' + name, 2.8, 2, (side * 18, y, z), M['steel'], axis='X', parent=S2, verts=20, bevel=.4)
        cyl('Tuerca ' + name, 3.1, 2.4, (side * 48.5, y, z), M['steel'], axis='X', parent=S2, verts=6)

# ---------- Ruedas de 66 mm ----------
S3 = group('S3_Ruedas')
for side, name in ((-1, 'izquierda'), (1, 'derecha')):
    cx = side * 67
    tire = cyl('Llanta ' + name, 33, 26, (cx, 0, 33), M['rubber'], axis='X', verts=96)
    boolean(tire, cyl('c', 26.2, 30, (cx, 0, 33), M['steel'], axis='X', verts=96))
    grooves = []
    for i in range(40):
        a = 2 * math.pi * i / 40
        g = box('c', (30, 1.5, 2.4), (cx, 33 * math.cos(a), 33 + 33 * math.sin(a)), M['steel'])
        g.rotation_euler = (a, 0, 0); grooves.append(g)
    bpy.ops.object.select_all(action='DESELECT')
    for g in grooves: g.select_set(True)
    bpy.context.view_layer.objects.active = grooves[0]; bpy.ops.object.join()
    boolean(tire, grooves[0])
    b = tire.modifiers.new('bevel', 'BEVEL'); b.width = 2.5 * MM; b.segments = 4; b.limit_method = 'ANGLE'; b.angle_limit = math.radians(60)
    apply_mods(tire); smooth(tire); link(tire, S3)
    rim = cyl('Rin ' + name, 26.4, 22, (cx, 0, 33), M['yellow'], axis='X', verts=64)
    for i in range(5):
        a = 2 * math.pi * i / 5 + .3
        boolean(rim, cyl('c', 6.2, 30, (cx, 15 * math.cos(a), 33 + 15 * math.sin(a)), M['steel'], axis='X', verts=24))
    boolean(rim, cyl('c', 2.2, 30, (cx, 0, 33), M['steel'], axis='X', verts=16))
    b = rim.modifiers.new('bevel', 'BEVEL'); b.width = .8 * MM; b.segments = 2; b.limit_method = 'ANGLE'
    apply_mods(rim); smooth(rim); link(rim, S3)
    cyl('Maza ' + name, 6, 24, (cx, 0, 33), M['yellow'], axis='X', parent=S3, verts=32, bevel=.6)

# ---------- Rueda loca de bola ----------
S4 = group('S4_RuedaLoca')
ball = bpy.ops.mesh.primitive_uv_sphere_add(segments=48, ring_count=24, radius=6 * MM, location=v(0, 92, 6))
ball = bpy.context.active_object; ball.name = 'Bola de acero'; assign(ball, M['chrome']); smooth(ball, 80); link(ball, S4)
cyl('Copa de la rueda loca', 9, 7, (0, 92, 12.5), M['black'], parent=S4, verts=40, bevel=1)
box('Base de la rueda loca', (30, 12, 2.5), (0, 92, 17), M['black'], S4, bevel=1)
for sx in (-1, 1):
    cyl('Separador de latón 29 mm', 2.6, 28.8, (sx * 9, 92, 32.6), M['brass'], parent=S4, verts=6)
    cyl('Tornillo de la rueda loca', 2.7, 1.8, (sx * 9, 92, 49.9), M['steel'], parent=S4, verts=20, bevel=.4)

result = {'objects': len(bpy.data.objects)}
