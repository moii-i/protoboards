# AGV seguidor de línea (examen 3er parcial)

Página: `/seguidor`. Modelo: `protoboard-ah/seguidor-modelo.mjs`. Ruteo: `seguidor-ruteo.mjs`. Simulación: `seguidor-sim.mjs` (cálculo) y `seguidor-pista.mjs` (canvas). Prueba: `verify-seguidor.mjs` (incluida en `npm test`). Entrega: 25 de noviembre de 2026.

## Requisitos del examen

Control por compuertas, multiplexores o GAL22V10, sin microcontrolador. Selector físico de dos posiciones en el chasis: 0 = línea negra sobre blanco, 1 = línea blanca sobre negro, sin recablear ni reprogramar. Pruebas: línea negra, línea blanca, curva izquierda, curva derecha, pérdida de línea con respuesta segura y cambio de modo con el selector.

## Arquitectura elegida: Opción 1 con dos XOR

| Señal | Origen | Significado |
| --- | --- | --- |
| SI, SD | DO de los sensores | 1 sobre negro (no refleja), 0 sobre blanco |
| SEL | SW1 | 0 = NEGRA (GND), 1 = BLANCA (+5 V) |
| li, ld | SI ⊕ SEL, SD ⊕ SEL | Ese sensor está sobre la línea |
| MI | pin 8 del 74LS86 = SD ⊕ SEL | Motor izquierdo: 1 avanza, 0 freno |
| MD | pin 11 del 74LS86 = SI ⊕ SEL | Motor derecho: 1 avanza, 0 freno |

- Los dos sensores van **sobre** la cinta (centros a unos 12 mm, cinta de 19 mm). Así cada combinación tiene un solo significado: 11 avanza, 10 gira a la izquierda, 01 gira a la derecha, 00 línea perdida.
- Con sensores por fuera de la línea, «ninguno la ve» significaría a la vez «recto» y «perdida»: no se puede detectar la pérdida.
- Motores cruzados: si la línea se va a la izquierda, el sensor derecho la pierde, el motor izquierdo frena y el carrito gira hacia la línea.
- Pérdida de línea: MI = MD = 0. En el L293D, 1A = 2A = 0 con EN = 1 es **freno dinámico**. El carrito se detiene y arranca de nuevo si un sensor vuelve a ver la cinta.
- Cada salida depende de un sensor y del selector: el mapa de K es un tablero de ajedrez y la forma mínima es la propia XOR.

| SEL | SI SD | li ld | MI MD | Acción |
| --- | --- | --- | --- | --- |
| 0 | 1 1 | 1 1 | 1 1 | Avanza |
| 0 | 1 0 | 1 0 | 0 1 | Gira a la izquierda |
| 0 | 0 1 | 0 1 | 1 0 | Gira a la derecha |
| 0 | 0 0 | 0 0 | 0 0 | Frena (línea perdida) |
| 1 | 0 0 | 1 1 | 1 1 | Avanza |
| 1 | 0 1 | 1 0 | 0 1 | Gira a la izquierda |
| 1 | 1 0 | 0 1 | 1 0 | Gira a la derecha |
| 1 | 1 1 | 0 0 | 0 0 | Frena (línea perdida) |

Alternativas evaluadas (jumpers estimados, no ruteados): tres sensores con 74LS86 + 74LS02 (≈35 jumpers, más margen en curvas cerradas), dos 74LS151 (≈40), GAL22V10 (≈20 más programador y WinCUPL). Solo pasar a tres sensores si la pista real lo exige.

## Montaje (protoboard de 400 puntos)

U1 74LS86 en la columna 4, U2 L293D en la 14, U3 7805 en d25–d27 (IN, GND, OUT), C1 0.33 µF en b25–b26, C2 0.1 µF en a26–a27 y SW1 en b2–b4. El tiro derecho de SW1 comparte la tira del pin 14 (VCC) y no necesita jumper. 24 jumpers y 14 cables dupont.

- 74LS86: 1, 2, 4, 5 y 7 a GND · 8 MI · 9 SD · 10 SEL · 11 MD · 12 SEL · 13 SI · 14 VCC · 3 y 6 libres.
- L293D: 1 y 9 (EN) a +5 V · 2 MD · 3/6 motor derecho · 4, 5, 12, 13 GND · 7 y 15 (2A, 4A) GND · 8 VM · 10 MI · 11/14 motor izquierdo · 16 +5 V.
- Rieles: +T = 5 V del 7805, +B = VM (4 × AA), −T y −B = GND unidos por un jumper. 5 V y VM no se tocan.
- Cables externos directo a la tira de su pata (sin jumper): sensor izquierdo OUT → a5 (pin 13), derecho OUT → a9 (pin 9); motor izquierdo → a19 y a16; derecho → j16 y j19; pila de 9 V → c25 (IN del 7805) y −T; 4 × AA → +B y −B.

## Potencia

- Lógica: pila de 9 V → 7805 → 5 V para 74LS86, VCC1 del L293D y sensores (≈ 120 mA). C1 y C2 son los valores de la hoja de datos del 7805 (estabilidad de entrada y respuesta transitoria).
- Motores: 4 × AA (6 V) a VM. El L293D pierde de 1.4 a 2.6 V: el motor TT recibe unos 4 V, velocidad moderada. El L293D (con D) trae diodos de protección; el L293 no.
- Baterías separadas: el arranque de los motores no baja los 5 V de la lógica. Alternativas: módulo MB102 con la pila de 9 V en lugar de U3, C1 y C2; o 2 × 18650 (7.4 V) para todo, con el 7805 para la lógica.

## Sensor y calibración

Módulo con TCRT5000 (o el ARD-377 de Steren) y comparador LM393, salida digital DO. Antes de armar, medir DO: debe dar 1 (unos 5 V) sobre negro. Si da 0 sobre negro, intercambiar una sola vez los dos tiros de SW1 (GND ↔ +5 V): el 0 vuelve a ser NEGRA sin tocar la lógica. Ajustar el potenciómetro de cada módulo a 3–8 mm del piso, en cada pista (el contraste cambia entre negra y blanca).

## Simulación del recorrido

Tapete de 1.8 × 1.2 m con forma de riñón (curvas a la izquierda y una a la derecha), cinta de 19 mm. Tracción diferencial con las medidas del modelo 3D: ruedas a 134 mm entre centros y sensores 128 mm delante del eje. Cada rueda pasa de 0 a su velocidad con un retardo de 70 ms. La lógica sale de `createLogic` con las redes de las patas. `verify-seguidor.mjs` da más de tres vueltas en los dos modos a 250, 320 y 450 mm/s y con un motor 10 % más lento, y comprueba que frena con el selector equivocado y al sacar el carrito de la línea.

## Ensamblado del carrito (modelo 3D)

Sección «Dónde va cada pieza» (`#carro`): visor de nueve pasos sobre `protoboard-ah/agv/agv-seguidor.glb` con portada `agv-portada.webp` (render de Blender). Fuente en `modelos/agv-seguidor.blend` y los scripts de `modelos/agv/`, que leen las rutas de la protoboard del propio modelo de la página. Visor: `seguidor-carro-source.js` → `node build-seguidor-carro.cjs` → `seguidor-carro-3d.js`; pasos y cámaras en `seguidor-carro.mjs`.

- Kit ZK-2WD (manual del fabricante): placa de acrílico de 3 mm a 44 mm del piso. Cada motor TT va bajo la placa entre dos sujetadores de acrílico en T, con el encoder en el eje interior y dos tornillos M3 × 30 de fuera hacia dentro con tuerca. Ruedas de 65 mm a 139 mm entre centros. Rueda loca giratoria adelante sobre 4 postes de latón L12 con 8 tornillos M3 × 6.
- Sensores **en espejo**, con el TCRT5000 de cada módulo hacia el centro: es la única forma de que dos módulos de 14 mm de ancho queden a 12 mm. Un poste de latón M3 hembra-hembra de 30 mm por módulo (tornillo M3 × 6 arriba y abajo); TCRT5000 a unos 5 mm del piso, 128 mm delante del eje. Módulo modelado: MH-Sensor-Series de UNIT (PCB azul 32 × 14 mm, 4 pines VCC GND D0 A0; A0 queda libre).
- Arriba: protoboard atrás sobre el eje (fila a al frente, columna 1 a la izquierda; SW1 en la esquina frontal izquierda), portapilas 4 × AA al centro con dos tornillos M3 × 6 de cabeza plana y tuerca, y pila de 9 V al frente derecho con cinta doble cara. Esta distribución evita las barras de los sujetadores y las cabezas de los tornillos de la rueda loca.
- Cables: los de los sensores bajan por las dos ranuras frontales; los de cada motor suben por su agujero; pilas al final. Interruptor del kit sin usar.
- Modelo: `blender -b -P modelos/agv/run.py -- s1 s2 s9 s10 guardar portada` regenera el .blend, el GLB y la portada. Cada tornillo, tuerca, poste, sujetador, encoder y rueda se exporta como nodo con `insert`/`dist`/`spin` y el visor lo anima atornillándose.

## Compras

| Pieza | Para qué | Dónde |
| --- | --- | --- |
| 3 sensores TCRT5000 con DO (2 + 1 de repuesto) | SI, SD | UNIT [TCRT5000 MH-Sensor-Series](https://uelectronics.com/producto/sensor-seguidor-de-linea-tcrt5000-optico-infrarrojo/) (el del modelo 3D: 14 mm de ancho, 4 pines); Steren [ARD-377](https://www.steren.com.mx/sensor-seguidor-de-linea.html) ($39, LM393) también sirve, pero es negro, más angosto y de 3 pines: revisa la separación de 12 mm |
| Kit ZK-2WD: placa, 2 motores TT, 2 encoders, 2 ruedas, rueda loca, portapilas 4 × AA, 4 sujetadores, 4 M3 × 30, 8 M3 × 6, tuercas y 4 postes L12 | Tracción | UNIT [Kit carrito robot seguidor](https://uelectronics.com/producto/kit-carrito-robot-seguidor-lineas-con-accesorios/) ($117, [diagrama de armado](https://uelectronics.com/wp-content/uploads/2018/10/manual.jpg)); [Mercado Libre](https://listado.mercadolibre.com.mx/chasis-carro-robot-2wd) |
| 2 postes de latón M3 hembra-hembra de 30 mm, 4 tornillos M3 × 6 y 2 M3 × 6 de cabeza plana | Sensores y portapilas | Ferreterías y tiendas de electrónica |
| 7805 TO-220, cerámicos 0.33 µF (334) y 0.1 µF (104) | 5 V de la lógica | UNIT [L7805CV](https://uelectronics.com/producto/l7805cv-regulador-5v-1-5a/); refaccionarias del centro |
| Interruptor deslizable 1P2T de 2.54 mm | SW1 | UNIT [1 polo 2 tiros](https://uelectronics.com/producto/interruptor-1-polo-2-tiros-3p-2-54mm-pitch/). Sin compra: un interruptor del DIP4 + 1 kΩ de SEL a +5 V (ON = NEGRA) |
| Pila de 9 V con broche, 4 pilas AA, cables dupont macho-hembra | Energía y conexiones | Steren |
| Cinta de aislar negra y blanca de 19 mm, cartulina blanca y negra | Pistas de prueba | Steren, papelerías |

Ya en inventario: L293D, motor TT (uno), 74LS86 (en la lista de integrados permitidos; confirmar existencia), protoboard y jumpers.

### Villahermosa (confirmar existencias por teléfono)

- **Steren Centro**: Av. Constitución 334, Col. Centro, CP 86000 · (993) 314 5506 · lun–vie 9–18, sáb 9–14.
- **Steren Niños Héroes**: Niños Héroes 158-C, Col. Atasta, CP 86100 · (993) 354 9268 · lun–vie 9–19, sáb 9–14.
- **Steren Shop Plaza Altabrisa**: Periférico Carlos Pellicer Cámara 129, CP 86190 · (993) 253 5043 · todos los días 11–21.
- **Electrónica La Bocina**: calle Manuel Sánchez Mármol, Centro (número sin confirmar) · refacciones, reguladores e integrados · [Facebook](https://www.facebook.com/electronicalabocina/).
- En línea: UNIT Electronics (envío desde CDMX) y Mercado Libre. Contar los días de paquetería antes del 25 de noviembre.

## Pendiente de validar

Simulación en Proteus, polaridad real de DO del módulo comprado, separación de sensores frente al ancho de la cinta del profesor, velocidad en curvas cerradas con 6 V en VM (si se sale, bajar a 4 × NiMH de 1.2 V o acercar los sensores al eje), consumo y duración de la pila de 9 V, y el freno del L293D con los motores reales.
