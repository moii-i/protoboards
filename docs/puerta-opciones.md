# Opciones actuales de la puerta

El selector ofrece dos montajes LS151, ambos en dos protoboards. Se retiran las variantes HC del recorrido activo. Los archivos anteriores permanecen como referencia; los enlaces antiguos abren la opción actual de 9 resistencias y el avance no se mezcla con el montaje anterior.

| Opción | Resistencias físicas | RB del NE555 | Frecuencia ideal |
| --- | --- | --- | --- |
| `ls151-9r` (predeterminada) | 9 de 1 kΩ | R2A, R2B, R2C en serie: 3 kΩ | 2.061 Hz |
| `ls151-6k8` | 6 de 1 kΩ y una de 6.8 kΩ | R2: 6.8 kΩ | 0.988 Hz |

En ambas: RA=R1=1 kΩ, C4=100 µF. RB une DISCH (pin 7) con T (pines 2/6). Se conservan las tres resistencias de LED y las dos de común de display. Se usan las patas y las tiras compartidas para conectar RB sin jumpers adicionales.

La opción de 6.8 kΩ requiere conseguir ese valor; no forma parte del inventario confirmado. La opción de 9 resistencias usa el inventario existente. La rúbrica pide parpadeo, sin fijar una frecuencia.

El resto del control conserva pines, redes, posiciones, LED agrupados, 17 cables externos organizados, un solo motor TT y siete conexiones entre placas. Ambas mantienen 71 jumpers internos/de fuente: la cadena anterior ya compartía tiras, por lo que retirar resistencias no elimina esos cables.

El 2D incluye las bandas azul/gris/rojo/oro de 6.8 kΩ y el 3D muestra el mismo valor. La animación del rojo usa los tiempos RC de cada opción. Materiales, pasos, ayuda y guía de Proteus corresponden al perfil seleccionado. Se ocultan los PDF de montajes anteriores para evitar entregar coordenadas distintas.

Verificación: `npm run build`, `npm test` y `node tools/verify-door-options-browser.cjs`. Se comprueban 64 casos digitales por opción, continuidad sobre tiras reales, ausencia de cortocircuitos y agujeros repetidos, necesidad de cada jumper, red RC, STOP/reanudación, selector, progreso independiente, móvil y ambos visores.

La frecuencia se calcula con f=1/[ln(2)·(RA+2RB)·C]. La simulación analógica de estas dos modificaciones y el montaje físico quedan pendientes. El ajuste ION de Proteus afecta la indicación gráfica; no acredita brillo real. Se conservan las limitaciones del perfil sin desacoplo cerámico.

Referencia: [Texas Instruments, NE555, operación astable](https://www.ti.com/lit/ds/symlink/ne555.pdf).
