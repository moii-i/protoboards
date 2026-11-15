# Modelo 3D del AGV seguidor de línea

`../agv-seguidor.blend` es la fuente del carrito que muestra `/seguidor#carro`. Los scripts de esta carpeta lo generan desde cero en Blender (5.x), en milímetros (X derecha, Y frente, Z arriba):

1. `lib.py`: utilidades y materiales PBR.
2. `s1_chasis.py`: chasis de acrílico, motores TT con soportes, ruedas y rueda loca.
3. `s2_electronica.py`: sensores en espejo, pilas, protoboard con el circuito y cables dupont. Lee `protoboard.json`, exportado del modelo de la página (`protoboard-ah/seguidor-modelo.mjs`), para que integrados, piezas y jumpers caigan en los mismos agujeros que la guía.
4. `s9_escena.py`: piso, luces y cámara para el render de portada.
5. `s10_exportar.py`: GLB con un nodo `paso_N` por etapa y una malla por material.

En la consola de Python de Blender, define `LIB`, `BOARD_JSON` y `OUT` con rutas absolutas y ejecuta cada script con `exec(open(ruta, encoding='utf-8').read())`. Exporta a `protoboard-ah/agv/agv-seguidor.glb` y renderiza la portada como `protoboard-ah/agv/agv-portada.webp` (1600 × 900).
