# Exporta el carrito a GLB: un nodo paso_N por etapa. Dentro de cada etapa, las piezas
# grandes se unen por material (pocas llamadas de dibujo) y cada pieza de fijación
# (tornillos, tuercas, separadores, sujetadores, ruedas, encoders) queda como nodo propio
# con sus propiedades insert/dist/spin para que el visor la anime atornillándose.
# Las instancias comparten malla, así que repetir tornillos casi no pesa.
import bpy, os
STEPS = ['S1_Chasis', 'S2_Motores', 'S3_Ruedas', 'S4_RuedaLoca', 'S5_Sensores', 'S6_Baterias', 'S7_Protoboard', 'S8_Cables']
def cleanup():
    for o in list(bpy.data.objects):
        if o.get('export_copy'):
            me = o.data if o.type == 'MESH' and o.get('owns_mesh') else None
            bpy.data.objects.remove(o, do_unlink=True)
            if me and me.users == 0: bpy.data.meshes.remove(me)
cleanup()
dg = bpy.context.evaluated_depsgraph_get()
fixings = 0; meshes = 0
for i, name in enumerate(STEPS, 1):
    g = bpy.data.objects[name]
    root = bpy.data.objects.new('paso_%d' % i, None); root['export_copy'] = True
    bpy.context.scene.collection.objects.link(root)
    by_mat = {}
    for c in g.children_recursive:
        if c.type != 'MESH': continue
        if c.get('fixing'):
            o = bpy.data.objects.new('fijacion_%d %s' % (i, c.name), c.data)    # misma malla
            for k in ('insert', 'dist', 'spin'): o[k] = c[k]
            o['export_copy'] = True; bpy.context.scene.collection.objects.link(o)
            o.parent = root; o.matrix_world = c.matrix_world.copy(); fixings += 1
            continue
        me = bpy.data.meshes.new_from_object(c.evaluated_get(dg)); me.transform(c.matrix_world)
        o = bpy.data.objects.new(c.name + ' (export)', me); o['export_copy'] = True; o['owns_mesh'] = True
        bpy.context.scene.collection.objects.link(o)
        by_mat.setdefault(me.materials[0].name if me.materials else 'sin material', []).append(o.name)
    for key, names in by_mat.items():
        bpy.ops.object.select_all(action='DESELECT')
        objs = [bpy.data.objects[n] for n in names]
        for o in objs: o.select_set(True)
        bpy.context.view_layer.objects.active = objs[0]
        if len(objs) > 1: bpy.ops.object.join()
        joined = bpy.context.view_layer.objects.active; joined.name = 'paso_%d_%s' % (i, key)
        joined['export_copy'] = True; joined['owns_mesh'] = True; joined.parent = root; meshes += 1
bpy.ops.object.select_all(action='DESELECT')
copies = [o for o in bpy.data.objects if o.get('export_copy')]
for o in copies: o.select_set(True)
bpy.ops.export_scene.gltf(filepath=OUT, export_format='GLB', use_selection=True, export_apply=False, export_yup=True,
                          export_image_format='WEBP', export_texcoords=True, export_normals=True, export_materials='EXPORT',
                          export_cameras=False, export_lights=False, export_extras=True)
cleanup()
result = {'bytes': os.path.getsize(OUT), 'meshes': meshes, 'fixings': fixings}
