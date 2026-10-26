# Protoboards

Guías para Diseño Digital: montaje sobre protoboard, cable por cable, en 2D y 3D.

Catálogo: https://protoboard-ah.vercel.app/circuitos · Letras: https://protoboard-ah.vercel.app/ · Examen: https://protoboard-ah.vercel.app/puerta

Incluye letras A–H, LED alternados con NE555 y control automático de puerta. Las prácticas conservan una identidad visual compartida.

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

El proyecto está preparado para incorporarlo a un repositorio con historial, revisiones y comprobación automática. Antes de ofrecerlo públicamente, define la licencia del código propio; las dependencias conservan sus licencias. Consulta [CONTRIBUTING.md](CONTRIBUTING.md).

El paquete descargable incluye `Protoboards_Historial.bundle`. Para recuperar el repositorio con su historial, descomprime el paquete y ejecuta `git clone Protoboards_Historial.bundle protoboards`. Después puedes conectar ese repositorio al remoto de GitHub que elijas.

### Herramientas de la segunda entrega

En Puerta, Buscar / piezas (Ctrl+K) permite localizar referencias, patas, señales y conexiones. Colocar piezas muestra el descenso hasta los agujeros del montaje con pistas de orientación. Revisar bloque guarda comprobaciones manuales por etapa, separadas de los cables marcados. En pantalla ampliada se abre desde la lupa de la isla. La animación respeta el movimiento reducido y el encuadre elegido durante el recorrido automático.

### Señales y material de laboratorio

Señales permite explorar los valores lógicos durante la prueba y seguir los cables asociados en 2D/3D. Las tarjetas se pueden arrastrar, plegar y recolocar con teclado; el botón circular restablece la posición. PDF del montaje descarga materiales, posiciones y conexiones de la variante elegida. `npm run build:pdf` regenera las seis hojas con Chrome local; `npm run check` verifica que sus fuentes no hayan cambiado. Los PDF son hojas de montaje, no un reporte de evidencias físicas.
