# Estudio para revisar y renderizar: piso, luces de área, mundo y cámara 3/4.
import bpy, math
from mathutils import Vector
exec(open(LIB, encoding='utf-8').read())
STUDIO = 'Estudio'
for o in [o for o in bpy.data.objects if o.get('studio')]: bpy.data.objects.remove(o, do_unlink=True)
def keep(o): o['studio'] = True; return o

floor_mat = mat('Piso estudio', (0.80, 0.81, 0.79), rough=.55)
bpy.ops.mesh.primitive_plane_add(size=3, location=(0, 0.03, 0)); floor = keep(bpy.context.active_object); floor.name = 'Piso'; assign(floor, floor_mat)
# Cinta negra bajo los sensores para dar contexto.
tape = mat('Cinta de aislar', (0.015, 0.015, 0.016), rough=.35)
bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0.06, 0.0002)); t = keep(bpy.context.active_object); t.name = 'Cinta'; t.scale = (0.019, 0.9, 1); assign(t, tape)

def area(name, loc, energy, size, color=(1, 1, 1)):
    ld = bpy.data.lights.new(name, 'AREA'); ld.energy = energy; ld.size = size; ld.color = color
    o = bpy.data.objects.new(name, ld); bpy.context.scene.collection.objects.link(o); o.location = loc
    d = Vector((0, 0.03, 0.03)) - Vector(loc); o.rotation_euler = d.to_track_quat('-Z', 'Y').to_euler(); return keep(o)
area('Luz principal', (0.3, 0.35, 0.45), 9, 0.5, (1, 0.97, 0.92))
area('Relleno', (-0.4, 0.1, 0.25), 3.5, 0.6, (0.9, 0.95, 1))
area('Contraluz', (-0.1, -0.4, 0.35), 6, 0.4)

w = bpy.context.scene.world or bpy.data.worlds.new('World'); bpy.context.scene.world = w; w.use_nodes = True
bg = w.node_tree.nodes.get('Background'); bg.inputs['Color'].default_value = (0.70, 0.73, 0.72, 1); bg.inputs['Strength'].default_value = .35

cam = bpy.data.objects.get('Cámara AGV')
if not cam:
    cd = bpy.data.cameras.new('Cámara AGV'); cam = bpy.data.objects.new('Cámara AGV', cd); bpy.context.scene.collection.objects.link(cam); keep(cam)
cam.data.lens = 60; cam.data.sensor_width = 36
cam.location = (0.27, 0.36, 0.2)
target = Vector((0, 0.035, 0.035)); cam.rotation_euler = (target - cam.location).to_track_quat('-Z', 'Y').to_euler()
cam.data.dof.use_dof = True; cam.data.dof.focus_distance = (target - cam.location).length; cam.data.dof.aperture_fstop = 8
bpy.context.scene.camera = cam
s = bpy.context.scene; s.render.resolution_x = 1600; s.render.resolution_y = 900; s.render.film_transparent = False
s.view_settings.view_transform = 'AgX'; s.view_settings.look = 'AgX - Medium High Contrast'
result = {'camera': list(cam.location)}
