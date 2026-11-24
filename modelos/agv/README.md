# Modelo 3D del AGV seguidor de línea

`../agv-seguidor.blend` es la fuente del carrito que muestra `/seguidor#carro`. Los scripts de esta carpeta lo generan desde cero en Blender 5.x, en milímetros (X derecha, Y frente, Z arriba), con las piezas de la lista de compras:

1. `lib.py`: utilidades, materiales PBR y tornillería con malla compartida (tornillos M3 de cabeza redonda o plana, tuercas, postes de latón). Cada pieza de fijación guarda `insert` (de dónde entra), `dist` y `spin`.
2. `s1_chasis.py`: kit ZK-2WD según el manual del fabricante: placa de acrílico de 3 mm con ranuras en cruz, 4 sujetadores en T, motores TT 1:48 con encoder, 4 tornillos M3 × 30 con tuerca, ruedas de 65 mm (rin de 5 rayos y llanta con taco) y rueda loca giratoria sobre 4 postes L12 con 8 tornillos M3 × 6.
3. `s2_electronica.py`: módulos MH-Sensor-Series (TCRT5000 + LM393, 4 pines) en espejo sobre postes de 30 mm, portapilas 4 × AA atornillado, pila de 9 V con broche, protoboard de 400 puntos (82.5 × 54.5 mm) con SN74LS86N, L293D, L7805CV, cerámicos 334/104, SW1 SS12D00 y los jumpers de la guía (lee `protoboard.json`, exportado de `protoboard-ah/seguidor-modelo.mjs`), y cables dupont.
4. `s9_escena.py`: piso, luces y cámara para la portada.
5. `s10_exportar.py`: GLB con un nodo `paso_N` por etapa; piezas grandes unidas por material y cada fijación como nodo propio con sus propiedades (extras de glTF).

Sin abrir Blender:

```
blender -b -P modelos/agv/run.py -- s1 s2 s9 s10 guardar portada
```

`revisar` deja renders rápidos en `modelos/agv/revision/` (no se publican) e `info=Texto` imprime posición y tamaño de los objetos cuyo nombre lo contiene. El GLB va a `protoboard-ah/agv/agv-seguidor.glb` (menos de 4 MB, lo comprueba `verify-seguidor.mjs`) y la portada a `protoboard-ah/agv/agv-portada.webp`.
