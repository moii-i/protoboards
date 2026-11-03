"""Build the editable Blender library from the viewer's shared dimensions (mm)."""

import json
import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
SPEC = json.loads((ROOT / 'component-models.json').read_text(encoding='utf-8'))
OUT = Path(sys.argv[sys.argv.index('--') + 1])
OUT.mkdir(parents=True, exist_ok=True)


def linear(hex_color):
    rgb = [int(hex_color.lstrip('#')[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return tuple(c / 12.92 if c < 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in rgb) + (1,)


def material(name, color, roughness, metallic=0, grain=0, coat=0, emission=0):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = linear(color)
    mat.use_nodes = True
    nodes, links = mat.node_tree.nodes, mat.node_tree.links
    shader = nodes.get('Principled BSDF')
    shader.inputs['Base Color'].default_value = mat.diffuse_color
    shader.inputs['Roughness'].default_value = roughness
    shader.inputs['Metallic'].default_value = metallic
    shader.inputs['Coat Weight'].default_value = coat
    shader.inputs['Coat Roughness'].default_value = .24
    if grain:
        coords = nodes.new('ShaderNodeTexCoord')
        coords.location = (-650, 120)
        noise = nodes.new('ShaderNodeTexNoise')
        noise.location = (-420, 120)
        noise.inputs['Scale'].default_value = grain
        noise.inputs['Detail'].default_value = 2.2
        bump = nodes.new('ShaderNodeBump')
        bump.location = (-180, -70)
        bump.inputs['Strength'].default_value = .19
        bump.inputs['Distance'].default_value = .022
        vary = nodes.new('ShaderNodeMapRange')
        vary.location = (-170, 210)
        vary.inputs['To Min'].default_value = max(.06, roughness - .09)
        vary.inputs['To Max'].default_value = min(.94, roughness + .09)
        links.new(coords.outputs['Object'], noise.inputs['Vector'])
        links.new(noise.outputs['Fac'], bump.inputs['Height'])
        links.new(noise.outputs['Fac'], vary.inputs['Value'])
        links.new(bump.outputs['Normal'], shader.inputs['Normal'])
        links.new(vary.outputs['Result'], shader.inputs['Roughness'])
    if emission:
        shader.inputs['Emission Color'].default_value = mat.diffuse_color
        shader.inputs['Emission Strength'].default_value = emission
    return mat


def collection(name, description=None):
    group = bpy.data.collections.new(name)
    if description:
        group.asset_mark()
        group.asset_data.description = description
        group.asset_data.author = 'PROTOBOARDS by Moi & Chat'
        for tag in ('Protoboards', 'Electrónica', 'Milímetros'):
            group.asset_data.tags.new(tag)
    return group


def move(obj, group):
    for old in list(obj.users_collection):
        old.objects.unlink(obj)
    group.objects.link(obj)
    return obj


def bevel(obj, width, steps=3):
    mod = obj.modifiers.new('Microbisel de fabricación', 'BEVEL')
    mod.width = width
    mod.segments = steps
    mod.harden_normals = True
    obj.modifiers.new('Normales ponderadas', 'WEIGHTED_NORMAL')


def box(group, name, location, dimensions, mat, radius=.12):
    bpy.ops.mesh.primitive_cube_add(size=1, location=location)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    move(obj, group)
    obj.data.materials.append(mat)
    if radius:
        bevel(obj, radius)
    return obj


def surface(group, name, vertices, faces, materials):
    mesh = bpy.data.meshes.new(name)
    mesh.from_pydata(vertices, [], faces)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    group.objects.link(obj)
    for mat in materials:
        mesh.materials.append(mat)
    return obj


def tube(group, name, points, radius, mat):
    data = bpy.data.curves.new(name, 'CURVE')
    data.dimensions = '3D'
    data.resolution_u = 22
    data.bevel_depth = radius
    data.bevel_resolution = 5
    data.use_fill_caps = True
    spline = data.splines.new('BEZIER')
    spline.bezier_points.add(len(points) - 1)
    for node, xyz in zip(spline.bezier_points, points):
        node.co = xyz
        node.handle_left_type = node.handle_right_type = 'AUTO'
    obj = bpy.data.objects.new(name, data)
    group.objects.link(obj)
    obj.data.materials.append(mat)
    return obj


def stamp(group, name, body, location, size, mat):
    data = bpy.data.curves.new(name, 'FONT')
    data.body, data.size = body, size
    obj = bpy.data.objects.new(name, data)
    obj.location = location
    group.objects.link(obj)
    obj.data.materials.append(mat)
    return obj


def resistor_body(group, materials):
    spec = SPEC['resistor']
    samples = sorted({x for x, _ in spec['profile']} | {x for pair in spec['bands'] for x in pair})
    profile = spec['profile']
    sides = 64
    vertices = []
    for x in samples:
        i = next(j for j, (limit, _) in enumerate(profile) if limit >= x)
        x0, r0 = profile[max(0, i - 1)]
        x1, r1 = profile[i]
        radius = r1 if x0 == x1 else r0 + (r1 - r0) * (x - x0) / (x1 - x0)
        for j in range(sides):
            angle = math.tau * j / sides
            vertices.append((x, radius * math.cos(angle), 1.65 + radius * math.sin(angle)))
    faces, slots = [], []
    for i, (a, b) in enumerate(zip(samples, samples[1:])):
        slot = next((j + 1 for j, (start, end) in enumerate(spec['bands']) if start < (a + b) / 2 < end), 0)
        for j in range(sides):
            k = (j + 1) % sides
            faces.append((i*sides+j, i*sides+k, (i+1)*sides+k, (i+1)*sides+j))
            slots.append(slot)
    faces += [tuple(reversed(range(sides))), tuple(range(len(vertices)-sides,len(vertices)))]
    obj = surface(group, 'Cuerpo axial | anillos continuos', vertices, faces, materials)
    for face, slot in zip(obj.data.polygons, slots):
        face.material_index = slot
        face.use_smooth = True
    obj['Longitud del cuerpo (mm)'] = 6.3
    obj['Diámetro nominal (mm)'] = 2.4
    return obj


def prism(group, name, points, z, thickness, mat):
    outline = [(x,-y) for x,y in points]
    signed_area = sum(x0*y1-x1*y0 for (x0,y0),(x1,y1) in zip(outline, outline[1:]+outline[:1]))
    if signed_area < 0:
        outline.reverse()
    vertices = [(x,y,level) for level in (z-thickness,z) for x,y in outline]
    n = len(outline)
    faces = [tuple(reversed(range(n))),tuple(range(n,2*n))]
    faces += [(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]
    obj = surface(group,name,vertices,faces,[mat])
    bevel(obj, .055, 2)
    return obj


def lens_color(obj, inactive, active):
    obj.data.materials[0] = inactive
    obj.data.materials.append(active)
    obj['Material 1'] = 'Difusor apagado'
    obj['Material 2'] = 'Difusor rojo encendido'


def instance(scene, group, name, location, angle=0):
    obj = bpy.data.objects.new(name,None)
    obj.instance_type = 'COLLECTION'
    obj.instance_collection = group
    obj.location = location
    obj.rotation_euler.z = math.radians(angle)
    scene.collection.objects.link(obj)
    return obj


def point_at(obj, target):
    obj.rotation_euler = (Vector(target) - obj.location).to_track_quat('-Z','Y').to_euler()


def area(scene, name, location, target, energy, size, color):
    data = bpy.data.lights.new(name,'AREA')
    data.energy, data.shape, data.size, data.color = energy,'DISK',size,color
    obj = bpy.data.objects.new(name,data)
    scene.collection.objects.link(obj)
    obj.location = location
    point_at(obj,target)


scene = bpy.context.scene
scene.name = '01 · Estudio de componentes'
scene.unit_settings.system = 'METRIC'
scene.unit_settings.scale_length = .001
scene.unit_settings.length_unit = 'MILLIMETERS'
for obj in list(scene.objects):
    bpy.data.objects.remove(obj,do_unlink=True)

tin = material('Metal | cobre estañado', '#c6c9ca', .26, .88, 15)
contact = material('Metal | contacto chapado', '#d0bd84', .24, .82, 16)
nylon = material('Polímero negro | molde satinado', '#202126', .43, grain=13)
cap = material('Polímero negro | collar flexible', '#292a2d', .50, grain=12)
ink = material('Tinta | serigrafía cálida', '#a9a29b', .60)
mat_solid = material('PVC | azul cobalto', '#164fb6', .38, grain=13, coat=.10)
mat_flex = material('PVC | bermellón', '#bb2d30', .40, grain=11, coat=.12)
res = SPEC['resistor']
shell = material('Resistencia | recubrimiento beige',res['shell'],.5,grain=18,coat=.08)
colors = {i:material('Banda '+str(i),res['palette'][i],.46,grain=16,coat=.08) for i in (0,1,2,5)}
gold = material('Banda oro | tolerancia 5%',res['gold'],.4,.54,12)

resistors = {}
for value, bands in [('1 kΩ',(1,0,2)),('2.2 kΩ',(2,2,2)),('5.1 kΩ',(5,1,2))]:
    group = collection('Resistencia axial · '+value,'Película de carbón, tipo CFR-25, cuerpo de 6.3 × Ø2.4 mm. Patas y bandas editables.')
    resistor_body(group,[shell,*[colors[i] for i in bands],gold])
    for sign, side in [(-1,'A'),(1,'B')]:
        tube(group,'Terminal '+side,[(sign*3.1,0,1.65),(sign*5.6,0,1.65),(sign*7.9,0,1.65)],res['leadDiameter']/2,tin)
    resistors[value] = group

solid = collection('Jumper rígido · 22 AWG','Cable preformado 3M de referencia, PVC y cobre estañado. Tramo editable; puntas de 6.35 mm.')
j = SPEC['jumper']['solid']
tube(solid,'Aislamiento PVC', [(-12.7,0,1.1),(-11.4,0,2.2),(0,0,2.35),(11.4,0,2.2),(12.7,0,1.1)],j['jacketDiameter']/2,mat_solid)
for sign in (-1,1):
    tube(solid,'Punta estañada',[(sign*12.7,0,1.10),(sign*12.7,0,-1.65),(sign*12.7,0,1.10-j['bareLength'])],j['conductorDiameter']/2,tin)

flex = collection('Jumper flexible · macho–macho','Referencia tipo Dupont. Cable flexible, dos carcasas negras moldeadas y contactos macho separados.')
j = SPEC['jumper']['flexible']
tube(flex,'Cable flexible | curva editable',[(-16,3,4),(-9,4,6),(1,-1.4,4),(10,-2.4,2.8),(18,2.4,3)],j['jacketDiameter']/2,mat_flex)
for sign,x,y,z in [(-1,-16,3,4),(1,18,2.4,3)]:
    width,length = j['housingWidth'],j['housingLength']
    box(flex,'Carcasa moldeada',(x+sign*length/2,y,z),(length,width,width),nylon,.18)
    box(flex,'Unión del molde',(x+sign*length/2,y,z+1.195),(length-1.1,.055,.035),cap,.012)
    box(flex,'Retén del contacto',(x+sign*5.4,y,z+1.20),(1.55,.83,.085),cap,.07)
    tube(flex,'Collar de salida',[(x-sign*1.25,y,z),(x,y,z),(x+sign*.45,y,z)],j['strainReliefDiameter']/2,cap)
    contact_width,pin_length = j['contactWidth'],j['contactLength']
    box(flex,'Contacto cuadrado',(x+sign*(length+pin_length/2-.15),y,z),(pin_length,contact_width,contact_width),contact,.13)

d = SPEC['display']
display = collection('Display 5011AS · cátodo común','XLITX de 0.50 pulgadas. Diez patas numeradas, segmentos A–G y DP separados con material activo alternativo.')
housing = material('5011AS | carcasa de polímero negro',d['housing'],.40,grain=12)
face_mat = material('5011AS | cara de epoxi grafito',d['face'],.66,grain=16)
face_mat.node_tree.nodes.get('Principled BSDF').inputs['Specular IOR Level'].default_value = .24
diffuser = material('5011AS | difusor lechoso apagado',d['lens'],.51,grain=24,coat=.08)
active = material('5011AS | LED rojo encendido','#f20805',.34,coat=.08,emission=1.55)
height = d['height']
box(display,'Carcasa 12.7 × 19.0 × 8.0',(0,0,(height-.27)/2),(d['width'],d['length'],height-.27),housing,.26)
box(display,'Máscara frontal',(0,0,height-.18),(d['width']-.48,d['length']-.48,.36),face_mat,.15)
for key,outline in d['segments'].items():
    lens_color(prism(display,'Difusor '+key.upper(),outline,height+.048,.19,diffuser),diffuser,active)
x,y,r = d['decimal']
points = [(x+r*math.cos(i*math.tau/32),y+r*math.sin(i*math.tau/32)) for i in range(32)]
lens_color(prism(display,'Difusor DP',points,height+.048,.19,diffuser),diffuser,active)
for row in range(2):
    for column in range(5):
        pin = (1+column) if row==0 else (10-column)
        wire = d['leadDiameter']
        length = d['leadLength']
        obj = box(display,f'Pin {pin:02}',((column-2)*SPEC['pitch'],(row-.5)*d['rowSpan'],-length/2+.15),(wire,wire,length+.3),tin,.07)
        obj['Pin'] = pin
        obj['Función'] = {1:'E',2:'D',3:'COM',4:'C',5:'DP',6:'B',7:'A',8:'COM',9:'F',10:'G'}[pin]
stamp(display,'Marcado de modelo','5011AS',(-5.15,-8.18,height+.012),.78,ink)
mark = [(-5.52,7.76),(-4.85,7.76),(-5.52,8.46)]
prism(display,'Marca de orientación · pin 1',mark,height+.017,.018,ink)

instance(scene,solid,'Jumper rígido',(-19,8,0),-13)
instance(scene,flex,'Jumper flexible',(16,-10,-7.6),12)
for i,(value,group) in enumerate(resistors.items()):
    instance(scene,group,'Resistencia '+value,(-22,-4-i*4.7,-6.6),-13)
instance(scene,display,'Display apagado',(1,10,6.3),13)

# The demonstration digit shares geometry with the reusable component.
lit_copy = collection('Demostración · segmento activo')
for obj in display.objects:
    copy = obj.copy()
    if obj.name in {'Difusor '+k for k in 'ABCDFG'}:
        copy.data = obj.data.copy()
        copy.data.materials[0] = active
    lit_copy.objects.link(copy)
instance(scene,lit_copy,'Display encendido',(18,14,6.3),13)

stage = collection('Estudio · iluminación y fondo')
scene.collection.children.link(stage)
floor = material('Estudio | grafito', '#283132', .64, grain=3)
box(stage,'Superficie de estudio',(0,0,-6.9),(260,260,1),floor,0)
camera_data = bpy.data.cameras.new('Cámara macro')
camera = bpy.data.objects.new('Cámara macro',camera_data)
scene.collection.objects.link(camera)
camera.location = (32,-68,80)
point_at(camera,(0,0,0))
camera_data.type = 'ORTHO'
camera_data.ortho_scale = 91
scene.camera = camera
area(scene,'Caja suave principal',(-27,-35,60),(0,0,2),66000,37,(1,.94,.86))
area(scene,'Relleno lateral',(42,-4,34),(0,0,4),26000,29,(.82,.91,1))
area(scene,'Contraluz',(3,32,51),(0,0,0),58000,30,(.82,1,.94))
scene.world = bpy.data.worlds.new('Estudio difuso')
scene.world.use_nodes = True
scene.world.node_tree.nodes['Background'].inputs[0].default_value = (.19,.21,.23,1)
scene.world.node_tree.nodes['Background'].inputs[1].default_value = .44
scene.render.engine = 'CYCLES'
scene.cycles.samples = 32
scene.cycles.use_denoising = True
scene.render.resolution_x,scene.render.resolution_y = 1500,1040
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = 'PNG'
scene.view_settings.view_transform = 'AgX'
scene.view_settings.look = 'AgX - Medium High Contrast'
scene.view_settings.exposure = .1
scene.render.filepath = '//Componentes_Protoboards_Macro.png'

library_scene = bpy.data.scenes.new('02 · Colecciones editables')
library_scene.unit_settings.system = 'METRIC'
library_scene.unit_settings.scale_length = .001
library_scene.unit_settings.length_unit = 'MILLIMETERS'
for group in [*resistors.values(),solid,flex,display]:
    library_scene.collection.children.link(group)
    group['Escala de escena'] = '1 unidad interna = 1 mm'
    group['Origen'] = 'Centro del cuerpo; Z=0 en la base nominal de la pieza'
info = bpy.data.texts.new('LEEME · Bibliografía y reutilización')
info.write('''PROTOBOARDS by Moi & Chat | Biblioteca de componentes

01: estudio macro con instancias. 02: colecciones fuente editables.
Las piezas fuente comparten origen para poder alinearse en otros circuitos.
Append > Collection, o añade la carpeta a Asset Libraries para reutilizarlas.
En el 5011AS, cada lente dispone de materiales separados apagado y encendido.
Escala métrica: 1 unidad interna = 1 mm. En una escena a escala 1 m,
reduce la instancia a 0.001 si necesitas conservar el tamaño real.
Materiales procedurales internos, sin imágenes externas.

XLITX 5011AS, dibujo mecánico y pines, pág. 2: https://www.xlitx.com/datasheet/5011AS.pdf
Yageo CFR, dimensiones CFR-25: https://yageogroup.com/content/datasheet/asset/file/YAGEO-CFR_DATASHEET
3M jumpers preformados: https://multimedia.3m.com/mws/media/517950O/jumper-wires-for-solderless-breadboards.pdf
Adafruit cable macho–macho 28 AWG: https://www.adafruit.com/product/1957
Las medidas de la carcasa flexible son de referencia genérica, no de fabricación.
''')

for screen in bpy.data.screens:
    for view in screen.areas:
        if view.type == 'VIEW_3D':
            view.spaces.active.region_3d.view_perspective = 'CAMERA'
            view.spaces.active.clip_end = 1000
bpy.context.preferences.filepaths.save_version = 0
bpy.ops.wm.save_as_mainfile(filepath=str(OUT / 'Componentes_Protoboards.blend'),compress=True)
scene.render.filepath = str(OUT / 'Componentes_Protoboards_Macro.png')
bpy.ops.render.render(write_still=True)
