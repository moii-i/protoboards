# Protoboards

La prioridad de ensamblado y el inventario se documentan en `AGENTS.md`. La revisión de alternativas, corrientes, capacitores y técnicas de montaje está en [Simplificación del ensamblado](docs/simplificacion-ensamblado.md). El perfil independiente `ls151-minimo` estudia 13 resistencias de 1 kΩ, 100 µF y una placa; requiere validación analógica y física, especialmente brillo y alimentación sin bypass.

Guías para Diseño Digital: montaje sobre protoboard, cable por cable, en 2D y 3D.

Catálogo: https://protoboard-ah.vercel.app/circuitos · Seguidor de línea: https://protoboard-ah.vercel.app/seguidor · Contador 9→0: https://protoboard-ah.vercel.app/contador-descendente · Contador 0→9: https://protoboard-ah.vercel.app/contador · Letras: https://protoboard-ah.vercel.app/ · Examen: https://protoboard-ah.vercel.app/puerta

Incluye letras A–H, LED alternados con NE555, contadores BCD ascendente y descendente con 74LS73A y control automático de puerta. Las prácticas conservan una identidad visual compartida.

## Contadores BCD

Los dos contadores comparten una protoboard de 830 puntos, el bloque NE555, la geometría de `contador-ruteo.mjs` (agujeros, rieles y ruteo automático de jumpers) y el arte 2D de `contador-2d.mjs`. El 3D usa el visor común con la presentación `contador`.

- `/contador`: 0→9 con borrado asíncrono en 1010 y cuatro LED.
- `/seguidor`: AGV seguidor de línea del examen del 3er parcial. Dos XOR de un 74LS86 deciden los motores (L293D) y un selector en el chasis cambia entre línea negra y blanca. Protoboard de 400 puntos, 24 jumpers, guía 2D/3D y simulación del recorrido. Ver docs/seguidor-linea.md.
- `/contador-descendente`: 9→0 con 2 × 74LS73A, 3 NAND de un 74LS00, 74LS48 y 5011AS. Arquitectura ÷2 × ÷5: A y D se guardan invertidos, así CLEAR deja 1001 sin PRESET, y 0→9 sale de las ecuaciones JK. Arranque en 9 al encender con R8 y C3 (sin botón) y velocidad ajustable con RV1 de 20 kΩ. Detalle en [docs/contador-descendente.md](docs/contador-descendente.md).

`node verify-counter-descendente.mjs` reconstruye las tiras, busca cortos y entradas flotantes, obtiene la red de cada pata desde los agujeros y simula tres ciclos y los 16 estados de arranque. Ambos verificadores corren en `npm test`.

## Desarrollo

Requiere Node.js 22 o posterior. La web publicada es estática.

```sh
npm ci --ignore-scripts
npm run dev
```

Abre http://127.0.0.1:4173/puerta. El servidor escucha únicamente en tu equipo. Ejecuta `npm run check` para regenerar los modelos y comprobar cableado, lógica e interacción.

## Interfaz compartida

El catálogo en `/circuitos` presenta las tres prácticas con capturas reales del visor 3D, progreso por bloques y un enlace para continuar el último montaje. La marca y el botón Circuitos abren este catálogo; `/`, `/555` y `/puerta` conservan sus montajes. El progreso sigue usando las claves de cada guía. Los nuevos registros de última visita solo determinan los enlaces del catálogo.

La presentación común se mantiene en `protoboard-ah/design-system.css` y `design-system.js`: Manrope alojada con el proyecto (licencia OFL incluida), paleta verde/marfil, iconos SVG y herramientas agrupadas en Vista, Explorar y Animación. Los paneles usan detalles nativos, cierran con Escape y clic exterior, y se presentan junto al borde inferior en móvil. El visor ampliado conserva su isla de navegación original. Mover controles conserva sus IDs, referencias y manejadores. Los colores eléctricos y los modelos no se cambian.

Con el servidor local en ejecución, `npm run test:design` comprueba las tres páginas, los controles, 2D/3D, pantalla ampliada, progreso, catálogo, imágenes, fuente local y tamaños móviles de 320 y 390 px. Usa `PROTOBOARD_QA_URL` para otro puerto y `PROTOBOARD_CHROME` para otra ruta de Chrome. `npm run build:previews` regenera las tres imágenes desde los montajes reales en 3D; no añade piezas ni edita el circuito.

## Miniaturas y entrada al montaje

Las tarjetas del catálogo reproducen estados capturados del visor real: A/b/H, LED 1/2 y OF/rU/SP/OP. En computadora se activan al pasar el cursor; el botón Vista previa permite reproducir o pausar también en móvil. Las imágenes adicionales se descargan al solicitar la vista previa. Al salir de pantalla o cambiar de pestaña, la secuencia se detiene. Con movimiento reducido, el botón avanza un único estado por pulsación.

Los enlaces siguen siendo enlaces nativos. `showcase.js` registra las transiciones entre documentos antes de la primera oportunidad de dibujo y `showcase.css` opta por una transición corta entre la tarjeta y el área del montaje. En navegadores sin esta función se conserva la navegación habitual y una entrada breve cuando corresponde. La preferencia de movimiento reducido desactiva estos efectos. La intención de navegación se guarda de forma temporal en sessionStorage y se elimina al llegar.

Al preparar por primera vez el 3D se presenta una imagen de referencia del circuito. La cubierta se desvanece al estar listo el visor; volver a 2D la retira inmediatamente. Alternar un visor ya preparado no repite la cubierta. Las conexiones marcadas, el paso y la selección siguen perteneciendo a los controladores originales.

Con el servidor local activo, `npm run build:showcase` regenera las nueve imágenes y su registro de estados (`npm run build:showcase -- --door` actualiza solo puerta y su imagen de portada); `npm run test:showcase` comprueba secuencias, pausas, movimiento reducido, navegación nativa, carga 3D retenida, cancelación y progreso sin cambios.

## Mandos externos del circuito LS151

El montaje LS151 y su adaptación compacta muestran los tres SCMM-122 de ABRIR/CERRAR/STOP y los dos SS0501A de los finales fuera de la protoboard. El botón Mandos externos abre un encuadre conjunto en 2D/3D; selecciona cada pieza para consultar sus cables. El cuerpo, los terminales soldados y el aislamiento son ilustrativos: confirma el orden COM/NC/NA de tu pieza con multímetro. Los contactos de la placa, la lógica y el avance guardado se conservan.

Las correderas y las palancas responden a la prueba de la puerta. El material visual de referencia procede de las fichas oficiales de Steren enlazadas en [la documentación LS151](docs/circuito-ls151.md); el sitio utiliza geometría propia. `npm run test:external-controls` comprueba las dos variantes, el accionamiento de piezas en 2D/3D y el avance conservado.

## Mesa de trabajo adaptable

Las guías de letras, NE555 y puerta comparten un panel de pasos plegable. En escritorio puedes elegir Compacto, Normal o Amplio, arrastrar el separador o ajustarlo con las flechas del teclado. La elección se guarda; el móvil conserva su propia preferencia de panel visible. Los cambios de etapa coordinan el encabezado y una señal visual breve en el visor sin marcar conexiones.

En móvil, los paneles Vista, Explorar y Animación tienen un tirador para alternar entre media pantalla y pantalla amplia. Arrástralo hacia arriba para ampliar; hacia abajo para reducir y después cerrar. Escape y el botón de cierre devuelven el foco a su herramienta. Se respeta el movimiento reducido y el interruptor de animaciones.

Con el servidor local activo, `npm run test:workbench` comprueba tamaño y persistencia, plegado, teclado, arrastre, cambios de paso, gestos móviles, 3D, pantalla ampliada y progreso conservado. `PROTOBOARD_QA_URL` permite repetirlo sobre la web publicada.

## Usar la guía

- Paso por paso: sigue una etapa del montaje.
- Cable por cable: avanza por todas las conexiones. Avanzar no las marca como realizadas.
- Encuadre: montaje completo, placa completa o acercamiento por cable. La elección se recuerda.
- Visor 2D de puerta: rueda para zoom, arrastrar para desplazar y doble clic para ajustar. Botón Motor externo en las versiones LS151.
- Lupa 2D: consulta la conexión o sus extremos mientras conservas la vista general.
- 3D: arrastra para girar y usa la rueda para acercar. El contorno seleccionado permanece visible con las animaciones apagadas. Puedes aislar un cable.
- Ampliar mapa: la isla superior conserva la etapa y el progreso al alternar 2D/3D. Escape restaura la vista.

El progreso se guarda localmente por montaje. Se respeta el movimiento reducido. Los cruces de cables no representan uniones eléctricas. Las coordenadas se muestran en la tarjeta, sin etiquetas flotantes encima de los extremos.

## Explorar y ensamblar

En la guía de puerta, pulsa un integrado para inspeccionar sus patas y cables. Tiras internas permite consultar los contactos compartidos. Conectar jumper reproduce la inserción de los dos extremos y el tendido del cable; puedes pausar y ajustar velocidad. La barra ampliada es compacta y Más controles recupera el resto. La animación no marca conexiones como completadas. Respeta movimiento reducido.

## Montajes de puerta

Todos usan dos protoboards de 63 columnas. Los conteos excluyen fuentes, placas y cables.

| URL / montaje | Integrados | Piezas principales | Resistencias |
| --- | ---: | ---: | --- |
| ?montaje=ls151 · nuevo, esquema Proteus | 5 | 52 | 28 individuales |
| ?montaje=ls151-compacto · adaptación calculada | 5 | 50 | 26 individuales |
| `/puerta` o `?montaje=sinuln` | 6 | 53 | 28 individuales |
| `?montaje=ls` · LS02/LS08 con ULN | 6 | 49 | 25 individuales |
| `?montaje=comunes` · 74HC153 con ULN | 5 | 45 | 23 individuales |
| `?montaje=redes` · 74HC153 con ULN y SIP9 | 5 | 31 | 6 individuales + 3 redes |

Sin ULN se usan SN74LS02N, SN74LS08N, **74HC02 y 74HC14**, NE555 y L293D. El NE555 solo genera el parpadeo rojo; las compuertas HC controlan los retornos de los displays con corriente limitada. Se agregan tres resistencias de 1 kΩ y un capacitor de 100 nF respecto a la variante LS con ULN. El brillo será menor. Consulta [conexiones y límites](docs/circuito-sin-uln.md).

Las órdenes se conservan mediante botones de enclavamiento mecánico: mantén ABRIR/CERRAR durante STOP para reanudar. Soltar la orden cancela su dirección pendiente. Libera la orden anterior al terminar el recorrido y antes de invertir. Ambas órdenes simultáneas inhiben el motor. Los finales de carrera usan COM y NC, que abre al llegar al extremo. El reposo entre extremos muestra OF por defecto y no acredita una puerta cerrada.

La nueva versión usa **SN74LS151N, SN74LS02N, SN74LS04N, NE555 y L293D**, sin ULN ni lógica HC. Los cinco contactos son SPDT de tres terminales: COM elige 5 V o GND. Consulta [el esquema LS151 y la reducción de resistencias](docs/circuito-ls151.md). El modo de 28 resistencias conserva los valores observados en los videos de Proteus; la adaptación de 26 necesita su propia prueba eléctrica. Ambos requieren validación física.

## Código y generación

| Ubicación | Función |
| --- | --- |
| `protoboard-ah/` | Archivos estáticos publicados |
| `build-door-*.cjs` | Generadores de modelos, colocación, controlador y bundle |
| `route-door-wires.cjs` | Rutas compartidas por 2D/3D y alturas de cruces |
| `puerta-viewer-source.js` | Fuente mantenida del visor Three.js |
| `verify-door-*` | Pruebas de lógica, coordenadas, interfaz y geometría |
| `tools/` | Servidor local, compilación y pruebas |
| `.github/workflows/check.yml` | Verificación de cambios en GitHub |

Los archivos generados se incluyen para desplegar la web estática. Modifica los generadores y ejecuta `npm run build`. No se necesitan rutas personales del equipo. `PROTOBOARD_TOOLS` permite indicar otro directorio de dependencias para el bundle 3D y su prueba de geometría.

## Verificación

Las pruebas reconstruyen las redes desde los agujeros dibujados y las tiras reales de cinco contactos. Comprueban agujeros libres, resistencias sin puentear, rieles divididos, alimentaciones con tierra común y 64 casos por variante: mensajes, LED, interbloqueo, STOP y reanudación. También cubren la navegación, la isla ampliada y todos los extremos 2D/3D.

La revisión en Chrome con WebGL cubre escritorio 1440×1000 y teléfono 390×844, las cuatro variantes, ausencia de excepciones JavaScript y recursos fallidos.

**Pendiente:** Proteus eléctrico, niveles y brillo bajo carga, tolerancias RC, rebote de contactos, corriente de bloqueo del motor y montaje físico. La prueba interactiva ilustra la lógica esperada; no es un simulador eléctrico.

## Publicación y colaboración

Publica únicamente `protoboard-ah/` en el proyecto Vercel existente **protoboard-ah**. `vercel.json` habilita rutas limpias. No publiques `work/`, `outputs/`, perfiles de navegador o archivos de entorno. Los antiguos `puerta.js` y `puerta-viewer.js` quedaron fuera del flujo vigente.

Repositorio privado: [moii-i/protoboards](https://github.com/moii-i/protoboards). Incluye el historial, las fuentes y la comprobación automática de los montajes. Antes de ofrecerlo públicamente, define la licencia del código propio; las dependencias conservan sus licencias. Consulta [CONTRIBUTING.md](CONTRIBUTING.md).

Para descargar el proyecto con todo su historial:

```sh
git clone https://github.com/moii-i/protoboards.git
cd protoboards
npm ci --ignore-scripts
npm run dev
```

### Herramientas de la segunda entrega

En Puerta, Buscar / piezas (Ctrl+K) permite localizar referencias, patas, señales y conexiones. Colocar piezas muestra el descenso hasta los agujeros del montaje con pistas de orientación. Revisar bloque guarda comprobaciones manuales por etapa, separadas de los cables marcados. En pantalla ampliada se abre desde la lupa de la isla. La animación respeta el movimiento reducido y el encuadre elegido durante el recorrido automático.

### Señales y material de laboratorio

Señales permite explorar los valores lógicos durante la prueba y seguir los cables asociados en 2D/3D. Las tarjetas se pueden arrastrar, plegar y recolocar con teclado; el botón circular restablece la posición. PDF del montaje descarga materiales, posiciones y conexiones de la variante elegida. `npm run build:pdf` regenera las seis hojas con Chrome local; `npm run check` verifica que sus fuentes no hayan cambiado. Los PDF son hojas de montaje, no un reporte de evidencias físicas.

## Componentes primero, cableado después

Las ocho guías (A–H, NE555 y seis montajes de puerta) agrupan las piezas en el paso 1. Integrados, displays, redes, resistencias, capacitores, LED y mandos se colocan antes de los jumpers. Los mandos y el motor externos permanecen fuera de la placa. La secuencia 2D/3D permite pausar, repetir, elegir pieza y ajustar la velocidad; con movimiento reducido muestra la posición final. Reproducir no confirma el montaje.

La lista del paso 1 permite confirmar cada pieza por separado. Se conservan los IDs, agujeros, rutas, versión del montaje y marcas anteriores; las confirmaciones de los integrados del antiguo primer paso también se migran. El contador principal muestra las conexiones de cableado, incluidas las tiras compartidas que no necesitan jumper. Los pasos siguientes recorren solo cables y tiras compartidas; las piezas siguen visibles incluso al ocultar cableado anterior.

Los quince cables de los mandos y los dos del motor LS151 son conexiones normales con IDs EXT_*. Aparecen en la lista y en Cable por cable, en sus bloques de cableado. Reutilizan selección, Repetir conexión, pausa, velocidad, Solo este cable y el contorno permanente del visor; no dependen de un reproductor aparte. El trazado 2D sigue el path visible y el contorno 3D muestrea la misma curva del tubo. `npm run test:components` comprueba las ocho guías en navegador; `npm test` incluye los invariantes eléctricos de esta reorganización.

`npm run test:native-wires` comprueba los 17 cables externos de ambas variantes LS151: selección desde la lista, animación con la barra normal, pausa/reanudación, trazado 2D exacto, frontera 3D y contorno visible con animaciones desactivadas. No añade componentes ni cambia los nodos originales.

## LS151: alternativa con ahorro de cables y componentes

La opción independiente `/puerta?montaje=ls151-ahorro` combina la adaptación calculada de 26 resistencias con la distribución de 86 jumpers (49 menos que los 135 del LS151 original). Conserva los cinco integrados y los 17 cables externos: 15 de mandos y dos de un único motor amarillo. Se retiran R5/R9 y se cambian los 14 segmentos y siete pull-up a 4.7 kΩ. R1/R3/R4/R7 siguen en 1 kΩ y R2 en 100 kΩ. Doce resistencias llegan al riel; R15 y R16 comparten M en B:columna 2 inferior, conservando sus dos resistencias individuales. Se mantienen los ocho capacitores. El original de 28 resistencias `/puerta?montaje=ls151` permanece separado.

Generadores: `build-door-ls151-ahorro.cjs` y `optimize-ls151-ahorro-layout.cjs`. El optimizador retira únicamente conexiones ya realizadas por cobre o cables anteriores, sin unir a través de resistencias o capacitores. Las pruebas reconstruyen los nodos físicos, comprueban 32 combinaciones y derivan las cargas de cada salida a partir del netlist. Cota de M: 7.12 mA con VCC=5.25 V, resistencias -5%, Vf=1.5 V y VOL=0 V. Es un cálculo condicionado a esas hipótesis, no una medición ni una simulación analógica. Niveles, brillo, contacto real y corriente del motor requieren validación eléctrica y física.

El PDF y el avance son independientes. `door-ls151-ahorro-26-v2` evita reutilizar confirmaciones de posiciones y valores anteriores. Reducir a 13 resistencias exigiría revisar otra arquitectura; esta variante mantiene una resistencia por cada uno de los 14 segmentos, tres para LEDs, dos del 555 y siete pull-up. No comparte un solo limitador entre varios segmentos en paralelo.

## Isla flotante y controles del visor de puerta

Cable por cable recupera una isla compacta, plegable y movible con arrastre o flechas de teclado. Las herramientas se abren en el área lateral: recorrido manual de la animación, repetición/pausa, velocidad, encuadres recordados para placa A/B y conjunto, y grosor/intensidad del contorno. No añade rótulos sobre los extremos ni cambia redes, colores, coordenadas o marcas de montaje.

Las dos tarjetas actuales comparan 9 resistencias de 1 kΩ con 6 de 1 kΩ + 1 de 6.8 kΩ, con avance independiente. Las notas de distribución quedan en un desplegable. `npm run test:cables` verifica la entrega en navegador; `npm run test:workspace` verifica los ajustes de apariencia y cámara.

## Puerta con 5011AS y dos DIP4

La revisión de `/puerta-catodo` reproduce las conexiones observadas en las grabaciones del usuario: LS151, LS02, un LS04, NE555 y L293D; **11 resistencias: 9×1 kΩ + 2.2 kΩ + 5.1 kΩ**. Cada display usa una sola 1 kΩ a GND, R2/R4. Conserva 83 cables de placa y dos del único motor. SW1.3 ON=RUN/OFF=STOP; finales DIP manuales. Pulsar la carcasa del DIP también actúa su contacto. El montaje principal conserva solo el 100 µF del 555; `?desacoplo=si` ofrece seis bypass sin más cables. El video acredita los estados observados en Proteus; corriente, brillo y montaje físico siguen pendientes. Ver [revisión y alcance](docs/puerta-catodo-dip.md). `npm run test:catodo` comprueba redes, estados y visores.

En 3D, LED, resistencias y switches muestran un único nombre flotante al seleccionarlos, con halo sobre la pieza. No hay nombres planos de esas piezas ni etiquetas de cables. Escape, seleccionar un cable o volver a 2D lo ocultan. `npm run test:hologram` verifica clics reales del visor, estados de DIP, temas y tamaños de pantalla.

La prueba de cátodo usa los contactos físicos de los DIP y evalúa los pines del circuito grabado en Proteus. Los visores y botones comparten accionamiento; el DIP seleccionado indica ON/OFF sin etiquetas permanentes. `npm run test:proteus` coteja 85 pines, cuatro casos registrados, las 32 combinaciones y clics de ratón reales en escritorio/móvil, STOP/reanudación, parpadeo y teclado. Los finales siguen siendo manuales e independientes.


Alimentación (2026-10-29): `npm run test:power` reconstruye tiras y bandas físicas, compara pines de alimentación con fichas técnicas y comprueba 512 combinaciones por perfil y tipo de riel. Detecta fuentes enfrentadas, salidas push-pull unidas entre sí o a rieles, bypass de resistencias y alimentación en bancos aislados. La guía `/puerta-catodo#powerReview` muestra tablas de pines y bandas fuera del visor; sus botones localizan cables sin marcar avance. La grabación física 11.46.59 muestra el módulo junto a los displays y un segmento visible al final; no permite leer todos los agujeros ni medir tensión. Alimentar B:+T derecha en rieles partidos no llega a la lógica del mapa. Es una hipótesis para medir, no un corto físico confirmado. La auditoría no verifica corrientes, ruido, daño previo ni estabilidad analógica; la carga de displays sobre salidas LS sigue pendiente de medición.
