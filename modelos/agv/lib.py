# Utilidades para modelar el AGV en Blender (unidades: milímetros convertidos a metros).
import bpy, bmesh, math
from mathutils import Vector, Matrix

MM = 0.001
def v(x, y, z): return Vector((x * MM, y * MM, z * MM))

def clear_scene():
    for o in list(bpy.data.objects): bpy.data.objects.remove(o, do_unlink=True)
    for coll in (bpy.data.meshes, bpy.data.curves, bpy.data.materials, bpy.data.images, bpy.data.lights, bpy.data.cameras):
        for d in list(coll):
            if d.users == 0: coll.remove(d)
    for c in list(bpy.data.collections): bpy.data.collections.remove(c)

def group(name):
    """Empty raíz de un paso del ensamblado (el visor web anima estos grupos)."""
    e = bpy.data.objects.get(name)
    if e: return e
    e = bpy.data.objects.new(name, None)
    e.empty_display_size = 0.02
    bpy.context.scene.collection.objects.link(e)
    return e

def link(obj, parent=None):
    if obj.name not in bpy.context.scene.collection.objects and not obj.users_collection:
        bpy.context.scene.collection.objects.link(obj)
    if parent is not None:
        mw = obj.matrix_world.copy(); obj.parent = parent; obj.matrix_world = mw
    return obj

# ---------- Materiales PBR ----------
def mat(name, color, rough=.5, metal=0., transmission=0., ior=1.45, coat=0., alpha=1.):
    m = bpy.data.materials.get(name)
    if m: return m
    m = bpy.data.materials.new(name); m.use_nodes = True
    b = m.node_tree.nodes.get('Principled BSDF')
    b.inputs['Base Color'].default_value = (*color, 1)
    b.inputs['Roughness'].default_value = rough
    b.inputs['Metallic'].default_value = metal
    b.inputs['IOR'].default_value = ior
    if transmission: b.inputs['Transmission Weight'].default_value = transmission
    if coat: b.inputs['Coat Weight'].default_value = coat
    if alpha < 1:
        b.inputs['Alpha'].default_value = alpha
    return m

def materials():
    return {
        'acrylic': mat('Acrílico transparente', (0.86, 0.93, 0.97), rough=.04, transmission=1, ior=1.49),
        'acrylic_edge': mat('Acrílico soporte', (0.80, 0.90, 0.95), rough=.06, transmission=.9, ior=1.49),
        'yellow': mat('Plástico amarillo TT', (0.93, 0.66, 0.05), rough=.42),
        'rubber': mat('Hule de llanta', (0.018, 0.018, 0.02), rough=.86),
        'steel': mat('Acero', (0.78, 0.78, 0.80), rough=.28, metal=1),
        'chrome': mat('Cromo', (0.9, 0.9, 0.92), rough=.08, metal=1),
        'brass': mat('Latón', (0.86, 0.66, 0.32), rough=.32, metal=1),
        'shaft': mat('Eje blanco', (0.92, 0.91, 0.86), rough=.5),
        'black': mat('Plástico negro', (0.03, 0.03, 0.035), rough=.62),
        'epoxy': mat('Epóxico de integrado', (0.035, 0.035, 0.04), rough=.5),
        'tin': mat('Patas estañadas', (0.82, 0.82, 0.8), rough=.3, metal=1),
        'pcb': mat('PCB azul', (0.04, 0.22, 0.55), rough=.45, coat=.3),
        'ir_blue': mat('Emisor IR', (0.06, 0.1, 0.45), rough=.15, coat=.5),
        'ir_black': mat('Receptor IR', (0.02, 0.02, 0.025), rough=.2, coat=.5),
        'pot_blue': mat('Trimpot', (0.12, 0.35, 0.75), rough=.4),
        'can': mat('Carcasa del motor', (0.72, 0.73, 0.75), rough=.22, metal=1),
        'board': mat('Protoboard', (0.94, 0.93, 0.89), rough=.62),
        'aa': mat('Pila AA', (0.10, 0.12, 0.16), rough=.35, coat=.6),
        'aa_gold': mat('Pila AA franja', (0.78, 0.58, 0.18), rough=.3, metal=.6),
        'nine': mat('Pila 9 V', (0.12, 0.16, 0.22), rough=.4, coat=.4),
        'ceramic': mat('Capacitor cerámico', (0.80, 0.50, 0.22), rough=.45),
        'label': mat('Serigrafía', (0.86, 0.86, 0.84), rough=.6),
        'led_red': mat('LED rojo', (0.9, 0.08, 0.05), rough=.1, transmission=.6),
        'wire_red': mat('Cable rojo', (0.78, 0.08, 0.08), rough=.45),
        'wire_black': mat('Cable negro', (0.03, 0.03, 0.03), rough=.45),
        'wire_yellow': mat('Cable amarillo', (0.9, 0.7, 0.08), rough=.45),
    }

def assign(obj, m):
    obj.data.materials.clear(); obj.data.materials.append(m); return obj

def box(name, size, loc, m, parent=None, bevel=0.0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=v(*loc))
    o = bpy.context.active_object; o.name = name
    o.scale = (size[0] * MM, size[1] * MM, size[2] * MM)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if bevel:
        mod = o.modifiers.new('bevel', 'BEVEL'); mod.width = bevel * MM; mod.segments = 3; mod.limit_method = 'ANGLE'
    assign(o, m); return link(o, parent)

def cyl(name, r, depth, loc, m, axis='Z', parent=None, verts=32, bevel=0.0):
    bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r * MM, depth=depth * MM, location=v(*loc))
    o = bpy.context.active_object; o.name = name
    if axis == 'X': o.rotation_euler = (0, math.pi / 2, 0)
    if axis == 'Y': o.rotation_euler = (math.pi / 2, 0, 0)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
    if bevel:
        mod = o.modifiers.new('bevel', 'BEVEL'); mod.width = bevel * MM; mod.segments = 3; mod.limit_method = 'ANGLE'
    assign(o, m); o.data.polygons.foreach_set('use_smooth', [True] * len(o.data.polygons))
    return link(o, parent)

def boolean(target, cutter, op='DIFFERENCE'):
    keep = target.data.materials[0] if target.data.materials else None
    mod = target.modifiers.new('bool', 'BOOLEAN'); mod.object = cutter; mod.operation = op; mod.solver = 'EXACT'
    bpy.context.view_layer.objects.active = target
    bpy.ops.object.modifier_apply(modifier=mod.name)
    bpy.data.objects.remove(cutter, do_unlink=True)
    # Las caras del corte heredan el material del cortador: la pieza conserva el suyo.
    if keep is not None and len(target.data.materials) > 1:
        target.data.materials.clear(); target.data.materials.append(keep)
        target.data.polygons.foreach_set('material_index', [0] * len(target.data.polygons))

def apply_mods(o):
    bpy.context.view_layer.objects.active = o
    for mod in list(o.modifiers): bpy.ops.object.modifier_apply(modifier=mod.name)

def smooth(o, angle=35):
    bpy.context.view_layer.objects.active = o
    o.select_set(True)
    try: bpy.ops.object.shade_auto_smooth(angle=math.radians(angle))
    except Exception: bpy.ops.object.shade_smooth()
    o.select_set(False)

def text(name, body, loc, size, m, parent=None, rot_z=0.0):
    curve = bpy.data.curves.new(name, 'FONT'); curve.body = body; curve.size = size * MM
    curve.align_x = 'CENTER'; curve.align_y = 'CENTER'
    o = bpy.data.objects.new(name, curve); o.location = v(*loc); o.rotation_euler = (0, 0, rot_z)
    bpy.context.scene.collection.objects.link(o)
    bpy.context.view_layer.objects.active = o; o.select_set(True)
    bpy.ops.object.convert(target='MESH'); o.select_set(False)
    assign(o, m); return link(o, parent)

def tube(name, points_mm, radius, m, parent=None, resolution=6):
    """Cable o jumper: curva por puntos con radio de forro; se convierte a malla."""
    cd = bpy.data.curves.new(name, 'CURVE'); cd.dimensions = '3D'
    cd.bevel_depth = radius * MM; cd.bevel_resolution = 3; cd.use_fill_caps = True
    sp = cd.splines.new('BEZIER'); sp.bezier_points.add(len(points_mm) - 1)
    for bp, p in zip(sp.bezier_points, points_mm):
        bp.co = v(*p); bp.handle_left_type = bp.handle_right_type = 'AUTO'
    cd.resolution_u = resolution
    o = bpy.data.objects.new(name, cd); bpy.context.scene.collection.objects.link(o)
    bpy.context.view_layer.objects.active = o; o.select_set(True)
    bpy.ops.object.convert(target='MESH'); o.select_set(False)
    assign(o, m); return link(o, parent)

def poly(name, points_mm, radius, m, parent=None):
    """Jumper rígido: tramos rectos con esquinas definidas."""
    cd = bpy.data.curves.new(name, 'CURVE'); cd.dimensions = '3D'
    cd.bevel_depth = radius * MM; cd.bevel_resolution = 2; cd.use_fill_caps = True
    sp = cd.splines.new('POLY'); sp.points.add(len(points_mm) - 1)
    for p, c in zip(sp.points, points_mm): p.co = (*v(*c), 1)
    o = bpy.data.objects.new(name, cd); bpy.context.scene.collection.objects.link(o)
    bpy.context.view_layer.objects.active = o; o.select_set(True)
    bpy.ops.object.convert(target='MESH'); o.select_set(False)
    assign(o, m); return link(o, parent)

# ---------- Tornillería con malla compartida (una malla por tipo, muchas instancias) ----------
# Cada pieza de fijación guarda en sus propiedades de dónde entra (insert, en mm y coordenadas
# de Blender), cuánto recorre (dist) y si gira al entrar (spin). El exportador las deja como
# nodos propios con esas propiedades y el visor web las anima atornillándose.
PROTOS = {}

def _proto(key, build):
    if key in PROTOS and PROTOS[key].name in bpy.data.objects: return PROTOS[key]
    o = build(); o.name = 'Prototipo ' + key; o['prototype'] = True
    apply_mods(o)
    # La malla queda referida al origen del mundo: la cabeza (o la cara superior) en (0, 0, 0).
    bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    o.hide_render = True; o.hide_viewport = True
    PROTOS[key] = o; return o

def _cross_recess(head, top_z, r):
    for rot in (0, math.pi / 2):
        c = box('c', (r * 1.25, .7, 1.4), (0, 0, top_z), M_STEEL_CUT())
        c.rotation_euler = (0, 0, rot); bpy.context.view_layer.objects.active = c; bpy.ops.object.transform_apply(rotation=True)
        boolean(head, c)

def M_STEEL_CUT():
    return bpy.data.materials.get('Acero') or mat('Acero', (0.78, 0.78, 0.80), rough=.28, metal=1)

def pan_screw(length, m):
    """Tornillo M3 de cabeza redonda con ranura en cruz. Cabeza en el origen; la caña baja por −Z."""
    def build():
        head = cyl('cabeza', 2.75, 2.1, (0, 0, 1.05), m, verts=28, bevel=.6); apply_mods(head)
        _cross_recess(head, 2.1, 2.75)
        shank = cyl('caña', 1.45, length, (0, 0, -length / 2), m, verts=14)
        # Rosca sugerida: anillos finos cada 0.5 mm (solo geometría barata).
        rings = [cyl('rosca', 1.5, .18, (0, 0, -1 - i * .5), m, verts=14) for i in range(int((length - 1.5) / .5))]
        bpy.ops.object.select_all(action='DESELECT')
        for o in [head, shank] + rings: o.select_set(True)
        bpy.context.view_layer.objects.active = head; bpy.ops.object.join(); return head
    return _proto('M3x%g' % length, build)

def countersunk_screw(length, m):
    def build():
        bpy.ops.mesh.primitive_cone_add(vertices=28, radius1=1.45 * MM, radius2=2.9 * MM, depth=1.7 * MM, location=v(0, 0, -.85))
        head = bpy.context.active_object; assign(head, m); _cross_recess(head, 0, 2.9)
        shank = cyl('caña', 1.45, length - 1.7, (0, 0, -1.7 - (length - 1.7) / 2), m, verts=14)
        bpy.ops.object.select_all(action='DESELECT'); head.select_set(True); shank.select_set(True)
        bpy.context.view_layer.objects.active = head; bpy.ops.object.join(); return head
    return _proto('M3x%g plano' % length, build)

def hex_nut(m):
    def build():
        n = cyl('tuerca', 3.175, 2.4, (0, 0, -1.2), m, verts=6, bevel=.25); apply_mods(n)
        boolean(n, cyl('c', 1.3, 4, (0, 0, -1.2), m, verts=16)); return n
    return _proto('tuerca M3', build)

def standoff(length, m):
    """Separador hexagonal de latón hembra-hembra (5 mm entre caras). Origen arriba; baja por −Z."""
    def build():
        s = cyl('separador', 2.887, length, (0, 0, -length / 2), m, verts=6, bevel=.2); apply_mods(s)
        boolean(s, cyl('c', 1.25, length + 2, (0, 0, -length / 2), m, verts=14)); return s
    return _proto('separador %g' % length, build)

def place(proto, name, loc, direction, parent, insert=None, dist=12, spin=True):
    """Instancia (malla compartida) con la caña hacia 'direction'. insert: de dónde llega."""
    o = bpy.data.objects.new(name, proto.data); bpy.context.scene.collection.objects.link(o)
    d = Vector(direction).normalized()
    q = Vector((0, 0, -1)).rotation_difference(d)
    o.rotation_mode = 'QUATERNION'; o.rotation_quaternion = q; o.location = v(*loc)
    o.matrix_world = Matrix.Translation(v(*loc)) @ q.to_matrix().to_4x4()  # sin esperar al depsgraph
    o['fixing'] = True; o['insert'] = list(insert if insert is not None else (-d).to_tuple()); o['dist'] = dist; o['spin'] = spin
    return link(o, parent)

def mark_insert(o, insert, dist=20, spin=False):
    """Pieza que entra sola (sujetadores, ruedas, encoders) en vez de con todo su paso."""
    o['fixing'] = True; o['insert'] = list(insert); o['dist'] = dist; o['spin'] = spin; return o
