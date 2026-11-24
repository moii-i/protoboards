# Genera el carrito sin abrir la ventana de Blender:
#   blender -b -P modelos/agv/run.py -- [s1 s2 s9 s10 render revisar guardar]
# Rutas relativas a este archivo. "revisar" deja renders rápidos (Workbench) en modelos/agv/revision/.
import bpy, sys, os, math, json
from mathutils import Vector
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
LIB = os.path.join(HERE, 'lib.py')
BOARD_JSON = os.path.join(HERE, 'protoboard.json')
OUT = os.path.join(ROOT, 'protoboard-ah', 'agv', 'agv-seguidor.glb')
BLEND = os.path.join(ROOT, 'modelos', 'agv-seguidor.blend')
args = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else ['s1', 's2', 's9', 'guardar']
scripts = {'s1': 's1_chasis.py', 's2': 's2_electronica.py', 's9': 's9_escena.py', 's10': 's10_exportar.py'}
log = {}
for a in args:
    if a in scripts:
        g = {'LIB': LIB, 'BOARD_JSON': BOARD_JSON, 'OUT': OUT, '__name__': '__main__'}
        exec(open(os.path.join(HERE, scripts[a]), encoding='utf-8').read(), g)
        log[a] = g.get('result')
    elif a == 'guardar':
        bpy.ops.wm.save_as_mainfile(filepath=BLEND, compress=True); log['guardar'] = BLEND
    elif a == 'abrir':
        bpy.ops.wm.open_mainfile(filepath=BLEND)
    elif a == 'portada':
        s = bpy.context.scene; s.render.engine = 'CYCLES'; s.cycles.samples = 96; s.cycles.use_denoising = True
        s.render.resolution_x, s.render.resolution_y = 1600, 900; s.render.image_settings.file_format = 'WEBP'; s.render.image_settings.quality = 82
        s.camera = bpy.data.objects['Cámara AGV']; s.render.filepath = os.path.join(ROOT, 'protoboard-ah', 'agv', 'agv-portada.webp')
        bpy.ops.render.render(write_still=True); log['portada'] = s.render.filepath
    elif a.startswith('info='):
        key = a[5:]; rows = []
        for o in bpy.data.objects:
            if key in o.name and o.type == 'MESH':
                bb = [o.matrix_world @ Vector(c) for c in o.bound_box]
                rows.append([o.name, [round(x * 1000, 1) for x in o.matrix_world.translation], [round(min(p[i] for p in bb) * 1000, 1) for i in range(3)], [round(max(p[i] for p in bb) * 1000, 1) for i in range(3)]])
        log[a] = rows
    elif a == 'revisar':
        out = os.path.join(HERE, 'revision'); os.makedirs(out, exist_ok=True)
        s = bpy.context.scene; s.render.engine = 'BLENDER_WORKBENCH'
        s.display.shading.light = 'STUDIO'; s.display.shading.color_type = 'MATERIAL'
        s.display.shading.show_shadows = True; s.display.shading.show_cavity = True
        s.render.resolution_x, s.render.resolution_y = 1400, 900
        cam = bpy.data.objects.get('Revisión') or bpy.data.objects.new('Revisión', bpy.data.cameras.new('Revisión'))
        if cam.name not in s.collection.objects: s.collection.objects.link(cam)
        cam.data.lens = 50; s.camera = cam
        views = {'tres_cuartos': ((.30, .30, .22), (0, .04, .03)), 'abajo': ((.22, .12, -.16), (0, .05, .02)),
                 'lado': ((.38, .02, .06), (0, .04, .03)), 'arriba': ((0, .045, .42), (0, .045, .0)),
                 'motor': ((.16, -.06, .05), (.045, .015, .033)), 'sensores': ((.09, .23, .03), (0, .125, .012)),
                 'protoboard': ((.05, -.06, .17), (0, -.03, .055))}
        for name, (loc, tgt) in views.items():
            cam.location = loc; cam.rotation_euler = (Vector(tgt) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
            s.render.filepath = os.path.join(out, name + '.png'); bpy.ops.render.render(write_still=True)
        log['revisar'] = out
print('RESULTADO ' + json.dumps(log, ensure_ascii=False, default=str))
