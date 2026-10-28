# Simplificación del control de puerta con el inventario disponible

## Punto de partida y alcance

Inventario confirmado en esta revisión: 22 resistencias de 1 kΩ, dos displays de ánodo común para el examen y un electrolítico de 100 µF. Se parte de los cinco integrados del montaje LS151 existente: SN74LS151N, SN74LS02N, SN74LS04N, NE555 y L293D. Esto no constituye una nueva verificación de las marcas físicas de los integrados ni del pinout de los displays.

La versión de 26 resistencias necesitaba valores de 4.7 kΩ que no coinciden con ese inventario. También suponía un limitador por segmento y conservaba siete pull-up. Esas decisiones no demuestran que 26 sea un mínimo universal. Para reducir más hay que estudiar otra distribución de corriente y aprovechar recursos libres de los integrados.

El perfil `ls151-minimo` es una propuesta de laboratorio calculada, independiente del original. No se atribuyen a esta propuesta capturas de Proteus ni pruebas físicas que no se han realizado. Las verificaciones por programa comprueban nodos, agujeros, funciones y cotas de corriente; no simulan ruido de alimentación ni acreditan brillo real.

## Resultado del rediseño

| Recurso | Perfil mínimo |
| --- | --- |
| Resistencias físicas | 13, todas de 1 kΩ; quedan 9 de las 22 |
| Displays | 2 de ánodo común |
| Integrados | Los mismos cinco del LS151 |
| Protoboards | 1 de 63 columnas |
| Temporización | 1 electrolítico de 100 µF |
| Jumpers del montaje | 68, frente a 86 del ahorro anterior y 135 del original |
| Cables de los elementos externos | 15 de mandos/finales y 2 del único motor |
| Cerámicos en el perfil mínimo | No incluidos; estabilidad y bypass pendientes |

Las coordenadas son nuevas. No se deben retirar componentes de otro montaje y copiar solamente algunos cables: cambia el uso del segundo par del L293D, el cuarto NOR y los comunes de los displays.

## Cómo se distribuyen las trece resistencias

| Función | Referencias | Cantidad |
| --- | --- | ---: |
| Limitación total del display D1 | RDA, 1 kΩ | 1 |
| Limitación total del display D2 | RDB, 1 kΩ | 1 |
| LED rojo, amarillo y verde | R3, R4 y R7, 1 kΩ cada una | 3 |
| RA del 555 | R1, 1 kΩ | 1 |
| RB del 555 | R2A–R2G, siete de 1 kΩ en serie | 7 |
| **Total físico** | Todas de 1 kΩ | **13** |

RB=7 kΩ es un valor equivalente formado con siete piezas reales. No se contabiliza como una sola resistencia. RA=1 kΩ, RB=7 kΩ y C=100 µF dan, con la fórmula ideal del astable del NE555, aproximadamente 0.962 Hz: encendido 0.554 s y apagado 0.485 s. La tolerancia del electrolítico y las características del 555 hacen variar esos tiempos.

## Comunes de los displays y corriente

RDA y RDB se colocan directamente entre el riel positivo y la tira del común de su display. Los dos comunes de un display quedan después de su resistencia, nunca uno antes y otro después. D1 y D2 no comparten una sola resistencia.

La recomendación habitual del fabricante de displays es limitar cada segmento individualmente para controlar su corriente y uniformidad. Aquí se estudia una alternativa de poca corriente: una resistencia común limita el total del display. El reparto entre segmentos no queda igualado y el brillo puede cambiar entre O, F, P, r, U y S. No se debe describir esta opción como equivalente en uniformidad a catorce limitadores individuales.

Se usa una cota deliberadamente conservadora, sin depender de una caída mínima del LED: VCC máximo de 5.25 V y una resistencia de 1 kΩ con -5% dan I_total ≤ 5.25/950 = 5.53 mA por display, incluso considerando una caída de LED de cero voltios. Ningún segmento puede recibir más que ese total. Debe confirmarse que el display real admite esa corriente y que el brillo es suficiente; los displays habituales de esta clase suelen especificarse a corrientes mayores, pero su modelo no se identifica por su aspecto.

Para no sumar los dos displays en una salida LS, el cuarto NOR del LS02 invierte NM y obtiene MD=M. MD alimenta los segmentos M de D1; M del multiplexor alimenta los de D2. Incluyendo cargas de entradas, la mayor cota calculada de una salida LS es 6.33 mA, inferior al límite de 8 mA utilizado para estos SN74LS. Esto es una comprobación de corriente continua, no una prueba de transitorios.

La ausencia de luces residuales se debe comprobar con los displays reales. Cuando hay segmentos encendidos, el común cae por debajo del riel mediante su resistencia y las uniones LED. Los márgenes de apagado y la uniformidad dependen de sus curvas y de las tensiones reales de las salidas.

Los segmentos fijos D2.e/f usan ZERO desde una salida del LS04, y D1.e usa STOP pasado por dos inversores (SB). Se evita mezclar en un mismo display una descarga directa a GND con otras mediante salidas TTL: la diferencia de tensión baja podría concentrar corriente en los segmentos conectados directamente a tierra. Estos buffers ya estaban disponibles en el LS04; no añaden integrados. Aun así, no igualan las curvas de los LED ni acreditan uniformidad real.

## Segundo par del L293D aprovechado

El motor conserva el primer par de salidas: ENABLE1=M, IN1=ABRIR e IN2=CERRAR. El segundo par ya estaba en el integrado:

| Pin L293D | Conexión mínima |
| --- | --- |
| 9, ENABLE2 | +5 V |
| 10, IN3 | M |
| 11, OUT3 | R4 de 1 kΩ → ánodo amarillo; cátodo a GND |
| 15, IN4 | G, estado abierta y sin STOP/movimiento |
| 14, OUT4 | R7 de 1 kΩ → ánodo verde; cátodo a GND |

Así los dos LED no dependen de una salida TTL alta cercana al umbral del propio LED ni necesitan sus pull-up. VM debe mantenerse en 6 V en este montaje. Con VM máximo supuesto de 6.3 V y R mínimo de 950 Ω, incluso la cota sin caída LED es 6.63 mA por indicador. Es una carga pequeña para esos canales. Las salidas 11/14 no se conectan al motor ni entre sí.

El driver tiene diodos de protección internos, pero éstos no hacen innecesaria una alimentación adecuada ni garantizan que cualquier motor amarillo cumpla el límite de corriente, especialmente al arrancar o atascarse.

## Qué ocurre con los capacitores

| Capacitor / función | Conclusión de la revisión |
| --- | --- |
| 100 µF entre T y GND | Temporización del 555. Se conserva y se respeta su polaridad. |
| 10 nF en CONT, pin 5 | Filtrado del nodo de control. El perfil mínimo lo omite y deja CONT abierto, usando el divisor interno. Puede hacer falta ante ruido. |
| Bypass de 100 nF de lógica / 555 | Recomendados para integridad de alimentación; retirarlos puede funcionar en banco y reduce margen frente a perturbaciones. |
| Bypass de VCC1 y VCC2 del L293D | El fabricante indica usarlos en ambas alimentaciones. El perfil mínimo no acredita cumplimiento de esa recomendación. |
| Electrolítico entre alimentación y GND | Reserva de baja frecuencia. Un electrolítico usado como temporizador no puede cumplir simultáneamente esta conexión. |

Que otro montaje funcione sin cerámicos es compatible con que esos capacitores sean útiles: influyen la fuente, sus filtros ya incorporados, longitud de retornos, motor y disposición. No corresponde afirmar que el circuito se dañará automáticamente al omitirlos. Tampoco corresponde garantizar funcionamiento estable o ausencia de picos por haber superado una prueba ideal o por observar otro circuito.

El color naranja no es el criterio técnico. Valor, tipo, función y ubicación sí lo son. El mínimo sin cerámicos es una opción experimental para comprobar en laboratorio; una versión robusta debe contemplar el desacoplo indicado por los fabricantes, colocado directamente en los pines y rieles para no añadir jumpers innecesarios.

## Técnicas de montaje que pasan a ser criterio del proyecto

1. Dibujar primero los nodos reales y contar piezas disponibles. Evaluar recursos libres y estados del examen antes de copiar una plantilla.
2. Unir a la misma tira de cinco contactos los terminales que deban compartir nodo. No confundir una columna de cinco agujeros con una fila horizontal completa.
3. Llevar pull-up o pull-down desde la tira del pin al riel inmediato. Cambiar su posición física conserva el circuito y puede eliminar todo un jumper largo.
4. Poner limitadores de display junto a su común o segmento, según la arquitectura seleccionada. Poner resistencias de LED junto al LED o la salida cuando una pata complete la conexión.
5. Encadenar resistencias en serie compartiendo una tira intermedia libre, sin cables adicionales. No usar columnas que ya pertenezcan a otros pines o señales.
6. Acercar el 555 a su red RC, los estados a los displays y el driver a los terminales de potencia. Estudiar una placa antes de dos.
7. Usar alambre rígido cortado a longitud, rutas cortas y colores estables. Un cruce de cables aislados no es una conexión.
8. Verificar continuidad de los rieles, incluidas sus mitades. Los negativos de 5 V y 6 V se unen; los positivos permanecen separados.
9. En Proteus, usar terminales DEFAULT para organizar el esquema sin cruces innecesarios. Un nombre de red no reduce por sí mismo los cables físicos.
10. Hacer una revisión por bloques antes de conectar el motor; no añadir capacitores, resistencias o integrados sin función explicada.

## Comparación de alternativas

| Alternativa | Ventaja | Coste o condición |
| --- | --- | --- |
| Reubicar piezas, mismo esquema | Ahorra cables sin cambiar corrientes | No reduce necesariamente resistencias |
| Un limitador por segmento | Mejor control de brillo | Catorce resistencias sólo para los dos displays |
| Limitador común de poca corriente | Dos resistencias para los displays | Brillo variable; requiere verificación de legibilidad y cargas |
| Redes de resistencias | Menos encapsulados y montaje ordenado | No elimina resistencias eléctricas; exige otra pieza disponible |
| Multiplexar displays en el tiempo | Puede compartir siete limitadores | Añade selección de dígito, conmutación y posiblemente drivers; evaluar el total, no sólo las siete resistencias |
| Decodificador BCD convencional | Simplifica números | No genera por sí solo todas las letras requeridas ni siempre coincide con ánodo común |
| Driver dedicado de corriente | Puede simplificar limitación y mejorar brillo | Otro integrado y control; no forma parte del inventario confirmado |

## Pruebas antes de usarlo como entrega

- Medir/identificar el pinout del display y el común de cada SPDT.
- En Proteus, reproducir la nueva asignación del cuarto NOR y los cuatro canales del L293D; verificar todas las condiciones de la rúbrica con el 555 y el electrolítico de 100 µF.
- Comprobar OF/OP/rU/SP: segmentos legibles y ningún LED amarillo/verde residual durante STOP.
- Comprobar aproximadamente un parpadeo por segundo y reanudación con el mando enclavado sin cambiarlo durante STOP.
- En físico, empezar por alimentación y lógica con el motor desconectado. Luego verificar alimentación al arrancar y detener el motor, ausencia de estados falsos y calentamiento del driver. La corriente de arranque/bloqueo debe ser compatible con L293D.
- Si hay inestabilidad, no declarar finalizado el mínimo ni atribuirla automáticamente al cableado: revisar fuente, retornos, contactos y desacoplo. Registrar las modificaciones reales.
- El reporte del examen y los dos videos deben mostrar el diseño que efectivamente se construya y pruebe. Esta documentación no inventa esas evidencias.

## Referencias primarias consultadas

- TI, SN74LS151: https://www.ti.com/lit/ds/symlink/sn74ls151.pdf
- TI, SN74LS02: https://www.ti.com/lit/ds/symlink/sn74ls02.pdf
- TI, SN74LS04: https://www.ti.com/lit/ds/symlink/sn74ls04.pdf
- TI, NE555, operación astable y recomendaciones de alimentación: https://www.ti.com/lit/ds/symlink/ne555.pdf
- TI, L293D, funciones de canales, límites y bypass: https://www.ti.com/lit/ds/symlink/l293.pdf
- Toshiba, desacoplo de lógica, ruido y ubicación: https://toshiba.semicon-storage.com/us/semiconductor/knowledge/faq/logic_common/logic_common_06.html
- OPTO PLUS, ánodo común, limitación individual y brillo: https://www.opledtw.com/blog/led-configuration-commonanode-cathode-direct/
- SparkFun, anatomía y conectividad de protoboard: https://learn.sparkfun.com/tutorials/how-to-use-a-breadboard/all
- Adafruit, colocación de piezas y jumpers: https://learn.adafruit.com/breadboards-for-beginners/breadboard-usage
