# Puerta LS151: del esquema de Proteus a dos protoboards

## Versiones independientes

| Variante | Integrados | Resistencias | Estado |
| --- | ---: | ---: | --- |
| /puerta?montaje=ls151 | 5 | 28 | Función, pines y valores de los videos finales de Proteus |
| /puerta?montaje=ls151-compacto | 5 | 26 | Adaptación calculada; requiere prueba eléctrica propia |

Se conservan los montajes anteriores. Las dos nuevas opciones comparten visores, navegación, selección resaltada, animaciones, lupa 2D y controles flotantes. El progreso se guarda por variante.

## Componentes

U1 SN74LS151N DIP16, U2 SN74LS02N DIP14, U3 SN74LS04N DIP14, U4 NE555 DIP8 y U5 L293D DIP16. En Proteus el usuario usó el modelo 74151: equivalencia funcional, sin atribuirle los parámetros eléctricos de LS.

Dos displays de ánodo común, tres LEDs, tres mandos SPDT mantenidos y dos finales SPDT COM/NC/NO. Seis capacitores de 100 nF, uno de 10 nF y uno electrolítico de 10 µF. Fuente lógica regulada 5 V y motor 6 V, tierra común. Motor de corriente compatible con L293D.

La guía presupone display de filas a 15.24 mm: 1=e, 2=d, 3=COM, 4=c, 5=DP, 6=b, 7=a, 8=COM, 9=f, 10=g. Identificar el modelo físico antes de copiar posiciones.

## Qué cambia al reducir de 28 a 26

| Referencias Proteus | Esquema probado | Adaptación compacta |
| --- | --- | --- |
| R13–R26: 14 segmentos | 1 kΩ | 4.7 kΩ |
| R6/R8/R10/R11/R12/R27/R28: 7 pull-up | 2.2 kΩ | 4.7 kΩ |
| R5: RET_NM–NM | 1 kΩ | Se retira; retornos directamente a NM |
| R9: RET_M–M | 1 kΩ | Se retira; retornos directamente a M |
| R1/R3/R4/R7 | 1 kΩ | 1 kΩ |
| R2 | 100 kΩ | 100 kΩ |

Lista compacta: 21 de 4.7 kΩ, 4 de 1 kΩ, 1 de 100 kΩ. No mezclar valores entre variantes ni puentear R5/R9 conservando segmentos de 1 kΩ.

Cada segmento conserva su propia resistencia. Conectar los extremos de retorno de varias resistencias distribuye el mismo nodo; no puentea sus dos terminales. Las comprobaciones reconstruyen las tiras de cinco contactos y buscan resistencias puenteadas o señales unidas por error.

## Cálculo de corriente

Hipótesis conservadoras: 5.25 V máximos, resistencias −5%, Vf LED ≥1.5 V, salida baja ideal 0 V para sobreestimar corriente. No son mediciones.

En compacto: Rmín=4.465 kΩ. M conduce seis segmentos, su pull-up y las entradas LS02, LS04 y ENABLE del L293D:

I_M ≤ 6×(5.25−1.5)/4465 + 5.25/4465 + 0.9 mA = 7.12 mA.

NM ≤2.86 mA; H ≤2.82 mA; NY ≤5.13 mA. Las otras salidas cargadas quedan por debajo de 8 mA. Corriente típica estimada de segmento ~0.6 mA, dependiente de Vf y VOL. Comprobar brillo y nivel alto bajo carga. La resistencia pull-up eleva el nivel de apagado; no es una resistencia en serie con el segmento.

No se sustituye el montaje real por una animación web. En Proteus, SegmentOnCurrent=0.5mA solo ajustó la visualización del display; no certifica su brillo físico.

## Control

M=¬STOP·(ABRIR·¬CERRAR·PA + CERRAR·¬ABRIR·PC).

I=¬(M+STOP), H=¬I, FA=¬PA, NT=¬(H+FA), G=¬(PA+H), NG=¬G, NY=¬M.

STOP inhibe M. Ambos mandos activos inhiben movimiento. La orden mantenida mecánicamente conserva la dirección durante STOP; no hay memoria electrónica independiente. Libera el mando al terminar y antes de pedir el contrario. Fuera de extremos, sin orden, OF es el reposo por defecto.

Finales: NC=5 V, NO=GND, COM=PA/PC. Permiso=1 lejos del extremo, 0 al llegar. Mandos: COM=señal, contactos a 5 V y GND. Identifica los terminales reales con multímetro; los puntos del visor no indican el orden de patas de todos los modelos comerciales.

## Verificación

- Los videos finales muestran OF/rU/OP/SP, amarillo durante movimiento, verde abierto y rojo en STOP.
- Pruebas automatizadas de ambos modelos: 32 combinaciones, bloqueo simultáneo, segmentos, LEDs y ENABLE.
- Reconstrucción de todos los nodos del montaje: no se reutilizan agujeros ni se cortocircuitan señales; rieles partidos y tierras comunes comprobados.
- Rutas 2D y 3D con los mismos extremos; cruces a alturas distintas; alimentación al contacto libre más cercano.
- Modo de guía, avance guardado por perfil, isla flotante y cambio de visor.
- Pendientes: adaptación de 26 resistencias en Proteus; brillo y niveles físicos, corriente de arranque del motor y construcción real de ambas variantes.

## Referencias primarias

- https://www.ti.com/lit/ds/symlink/sn74ls151.pdf
- https://www.ti.com/lit/ds/symlink/sn74ls02.pdf
- https://www.ti.com/lit/ds/symlink/sn74ls04.pdf
- https://www.ti.com/lit/ds/symlink/ne555.pdf
- https://www.ti.com/lit/ds/symlink/l293.pdf

## Distribución v3 y navegación

El motorreductor TT amarillo se muestra fuera de la placa A; sus dos cables llegan a A:j59/j60 y de allí al L293D. El cuerpo no se inserta en agujeros. Hay un botón Motor externo en ambos visores.

Las resistencias de segmentos se colocan alrededor de D1/D2: una pata comparte la tira de su segmento, sin jumper adicional. Se ahorran 14 cables: 149→135 en LS151 y 147→133 en compacto. La guía identifica esas uniones como tiras compartidas. Los pull-up y los límites se agrupan en B; R2/C4 se acercan al NE555. Permanecen los mismos valores y nodos eléctricos.

Cruces entre pares de rutas: 219→146 y 225→110, respectivamente. Las rutas son ortogonales, conservan el contacto libre de alimentación más cercano y se separan en altura en 3D. Los cruces de jumpers aislados no son uniones eléctricas.

En 2D: rueda para zoom centrado en el cursor, arrastrar con ratón para desplazar, doble clic o tecla 0 para ajustar. +/− también acercan/alejan. El desplazamiento no selecciona cables. La rueda fuera del SVG conserva el scroll de la página. En pantalla táctil se conserva el desplazamiento normal.

La colocación cambió: el avance se guarda en un espacio nuevo placement:v3 para no marcar como realizadas conexiones de la distribución anterior. Los otros circuitos conservan su progreso.

Prueba de navegador reproducible: con npm run dev activo, ejecuta node tools/verify-door-browser.cjs. Requiere Chrome local (PROTOBOARD_CHROME permite indicar su ruta). Comprueba rueda, cursor, arrastre, doble clic, enfoque de motor y render 3D de ambos perfiles; guarda resultados internos en work/qa.

## Visor 2D sin franjas de recorte

La escena compartida no se recorta a los límites del viewBox. El recorte se aplica únicamente al borde del SVG visible, tanto en el mapa como en la lupa. Así, al hacer zoom, los componentes adyacentes siguen dibujándose en toda el área disponible, sin estirar el circuito ni cambiar su cableado. La prueba de navegador comprueba mediante hit-testing que un capacitor situado fuera de un viewBox estrecho, pero dentro del viewport, continúa visible.
