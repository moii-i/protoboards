# Puerta 5011AS: revisión compacta de 13 resistencias

La variante publicada en /puerta-catodo usa el inventario confirmado: LS151, LS02, un LS04, NE555, L293D, dos DIP4 SPST, dos 5011AS de cátodo común, un motor TT amarillo, fuentes de 5 V y 6 V. No añade otros tipos de compuertas. El usuario confirma valores 1 kΩ, 2.2 kΩ, 5.1 kΩ, 10 kΩ y 100 Ω; no se conocen todas las cantidades. No se usa el valor ambiguo “720 o 60”.

## Comparación reproducible

| Concepto | Referencia CC anterior | Compacto |
| --- | ---: | ---: |
| Integrados | 6 (dos LS04) | 5 (un LS04) |
| Resistencias | 16 | 13 |
| Jumpers y cables de fuente en placa | 88 | 83 |
| Cables externos de motor, aparte | 2 | 2 |
| Cruces de pares de cables dibujados | 86 | 64 |
| Longitud de trazado, unidades gráficas | 43680 | 35595 |
| Electrolítico de temporización | 100 µF | 100 µF |
| Cerámicos dibujados | 7 × 100 nF | 0 en experimental / 6 en recomendado |

La longitud es una métrica del trazado SVG/3D a paso constante, no una medición de cables cortados. Se compararon seis posiciones U2/U3; cinco eran válidas y una provocaba un corto con la cadena del común, detectado por el generador. U2 en B3 y U3 en B23 dejan menos cruces de las probadas. No se afirma un mínimo matemático global. Cada cable se elimina individualmente en el verificador: su ausencia debe desconectar una red necesaria. Eso prueba irredundancia de esta distribución, no imposibilidad de otra arquitectura.

Los positivos siempre usan rieles diferentes: +T=5 V, +B de A derecha=6 V. No dependen del corte central para aislar voltajes. Negativos comunes, con bancos de GND cableados explícitamente. Alimentaciones de chips bajan al riel cercano; los enlaces de rieles forman un árbol. Ningún agujero aloja dos terminales. En B solo se usan los bancos de riel señalados por los cables, no toda la longitud automáticamente.

## Las 13 resistencias

Los tres LED están alineados en una columna sobre la placa A: rojo arriba, amarillo al centro y verde abajo. Se usan sus propias patas dobladas, sin agregar piezas ni jumpers. La separación mínima entre centros es 6.35 mm sobre la cuadrícula nominal de la placa; comprobar que los cuerpos reales caben y que sus patas no se tocan antes de energizar.

| Pieza | Primera pata | Segunda pata |
| --- | --- | --- |
| Rojo, ánodo / cátodo | A:a50 | A:-T45 |
| Amarillo, ánodo / cátodo | A:b49 | A:c46 |
| Verde, ánodo / cátodo | A:e46 | A:e49 |
| R3 de 1 kΩ, sin polaridad | A:a51 | A:b50 |

La lógica y los valores permanecen iguales. Las tiras superiores 46 y 49 conectan amarillo/verde en antiparalelo; rojo alcanza directamente el riel negativo con su cátodo. El montaje compacto usa la revisión de avance `leds-v3`, sin borrar ni reutilizar las marcas guardadas de la distribución anterior. El perfil con desacoplo incluye el mismo grupo de LED y conserva 83 cables.

| Función | Cantidad y valor | Justificación |
| --- | --- | --- |
| ABRIR, CERRAR, FCA, FCC | 4 × 1 kΩ | Pull-up independientes; ON cierra a GND. No compartir resistencia entre señales independientes. |
| STOP directo a RESET | 1 × 2.2 kΩ | El contacto cerrado pone S a GND; abierto activa STOP. S alimenta también tres entradas LS. |
| Astable NE555 | 1 × 1 kΩ + 1 × 5.1 kΩ | RA y RB; reemplaza tres resistencias de RB por una 5.1 kΩ disponible. |
| LED rojo | 1 × 1 kΩ | Limitador individual desde Q del 555. |
| LED amarillo / verde | 1 × 1 kΩ | Antiparalelo entre OUT3/OUT4 del L293D. Conducen en sentidos contrarios, solo uno a la vez. |
| Comunes de displays | 4 × 10 kΩ | Dos en serie por display, 20 kΩ por común. Ambos K3/8 antes de la cadena; no puentearla. |
| Total | 7 × 1 kΩ + 1 × 2.2 kΩ + 1 × 5.1 kΩ + 4 × 10 kΩ | 13 piezas |

Una resistencia de mayor valor no reemplaza varios pull-up independientes: uniría entradas. Compartir limitadores solo se ha aplicado al par de LED con polaridad opuesta y a cada común con las limitaciones siguientes. No usar 100 Ω para intentar ganar brillo directamente desde LS.

## STOP y señales

**Cambio de montaje: SW1.3 ON = RUN; SW1.3 OFF = STOP.** El contacto cerrado pone S y RESET directamente a GND. Así se elimina el inversor intermedio y se evita exigir a una salida LS la corriente de RESET. No copiar la conexión STOP del perfil anterior. Una rotura de este contacto simula STOP; no se certifica como parada de seguridad industrial.

SW1: 1 ABRIR, 2 CERRAR, 3 RUN/STOP, 4 libre. SW2: 1 FCA, 2 FCC, 3/4 libres. Contactos 1-8,2-7,3-6,4-5: confirmar pieza real. Las posiciones libres quedan sin conectar. Inicial: SW1.1/2 OFF, SW1.3 ON; SW2.FCC ON y FCA OFF.

Los DIP de finales se accionan manualmente. No detectan automáticamente posición. La orden de dirección se conserva en su DIP durante STOP, sin memoria electrónica independiente. Ambos mandos activos inhiben el motor. M=¬S·(¬A_N·C_N·PA+A_N·¬C_N·PC). PA/PC=0 al accionar su final.

NE555: tH=ln(2)·6100·100 µF≈0.423 s, tL≈0.354 s, f≈1.288 Hz. Es cálculo nominal, no medición. El 100 µF electrolítico va de T a GND y es necesario para este parpadeo astable.

L293D: 16=5 V,8=6 V,4/5/12/13=GND. EN1=M, IN1=A_N, IN2=C_N, motor OUT2/OUT1. EN2=5 V, IN3=M, IN4=G. OUT3→R4→LED_PAIR; amarillo ánodo LED_PAIR/cátodo OUT4; verde ánodo OUT4/cátodo LED_PAIR. Los dos se limitan entre sí en tensión inversa. El rojo sigue Q→1k→LED→GND. M·G=0 en todas las combinaciones. La corriente ideal del par queda por debajo de 6.7 mA con VM≤6.3 V, R±5%, incluso tomando Vf=0. Caídas del puente y Vf reales pueden reducir brillo. Medir corriente del TT: L293D admite 600 mA continuos y pierde tensión en sus transistores; 6 V de fuente no implican 6 V en el motor.

## Capacitores: encender y ser estable son comprobaciones distintas

El perfil predeterminado experimental retira los cerámicos para permitir estudiar el montaje mínimo que pide el usuario. **No afirma estabilidad eléctrica sin desacoplo.** Ver encendido en clase demuestra ese encendido en esas condiciones, no inmunidad al ruido, arranques del motor o transitorios.

El segundo perfil /puerta-catodo?desacoplo=si conserva exactamente lógica y cableado, y añade seis 100 nF: uno por integrado y otro para VM del L293D. TI recomienda al menos 0.1 µF en ambas alimentaciones del L293D; en NE555 el bypass de alimentación es altamente recomendado. Estos capacitores no crean estados ni cambian ecuaciones. El 100 µF de temporización no sustituye esos bypass. El pin CONT5 del 555 queda libre en esta propuesta; un filtro de CONT se evalúa por ruido, no se añade por plantilla.

Los 100 nF en riel junto al pin de alimentación tienen recorrido corto, pero una protoboard con patas largas no equivale a desacoplo de una PCB. No se promete que añadirlos arregle un fallo desconocido. No se utilizan capacitores decorativos o sin función.

## Límites eléctricos del display

Pinout 5011AS: K3/8, a7,b6,c4,d2,e1,f9,g10,dp5. D1: a/c/d/f=NM,b=I,e=NS_D,g=H. D2: a/g=NM_D2,b=NNT_D,c/d=M_D,e/f=HIGH_D.

La familia LS no es un driver de segmentos de varios mA: LS04 garantiza niveles HIGH a IOH=-0.4 mA. Los dos 10 kΩ del común dan una cota ideal de 5.25/19000≈0.2763 mA **solo para corriente que vuelve por esa resistencia**. H añade dos entradas LS (40 µA), NM una (20 µA). M maneja dos entradas LS, una entrada ENABLE y una entrada A del L293D, suma 150 µA nominales de máximos publicados IIH. STOP abierto mantiene al menos 3.687 V usando 4.75 V, R+5%, RESET 0.4 mA y tres LS de 20 µA.

**Corrección de la revisión anterior:** la cota V/R del común no demuestra toda la corriente de cada salida. Puede existir un camino HIGH→segmento directo→común→segmento en inversa→salida LOW, que no pasa por esa resistencia. XLITX indica IR máx. 50 µA a VR=5 V; no publica un máximo a los menores voltajes inversos de este circuito. No se presenta la cota ideal como garantía eléctrica integral.

El cálculo típico (3.4-1.8)/20k≈80 µA por display se reparte entre segmentos. Brillo desigual y legibilidad pueden resultar insuficientes. La web pinta estados, no intensidad. No se ha demostrado que esta opción reduzca piezas manteniendo luminosidad suficiente en las piezas reales. No bajar resistencias sin revisar cargas, fugas y niveles; si falla la prueba, cambiar la arquitectura o aceptar más piezas, documentándolo.

## Perfiles, validación y pendientes

- /puerta-catodo: compacto experimental sin cerámicos.
- /puerta-catodo?desacoplo=si: compacto con seis bypass recomendados, sin cables extra.
- /puerta-catodo?montaje=anterior: referencia 6IC/16R, conserva conexiones y progreso.
- Referencias de ánodo común permanecen en /puerta y no son intercambiables.

Los tres perfiles de cátodo usan claves de avance distintas. El compacto cambia posición de componentes y cables: no reutilizar marcas anteriores. Se conservan la isla flotante de navegación, marcado explícito, vista amplia y ausencia de rótulos sobre los extremos.

Verificadores: node verify-door-dip-cc-compacto.cjs y con --bypass comprueban 32 entradas desde pines, exclusión motor/LED, mensajes OF/rU/OP/SP, continuidad, separación de voltajes, agujeros únicos y necesidad de cada jumper. node tools/verify-door-catodo-browser.cjs prueba escritorio, móvil, 3D, perfiles, STOP físico y semántico, reanudación y finales manuales. npm run check cubre las referencias anteriores.

**Pendientes:** simulación eléctrica en Proteus, brillo y fugas con el 5011AS real, arranque/ruido sin y con bypass, contactos reales, corriente del motor y montaje físico. No se han generado evidencias de laboratorio. “Irredundante” no significa “mínimo absoluto”.

## Fuentes primarias

- XLITX: https://www.xlitx.com/datasheet/5011AS.pdf
- TI LS04: https://www.ti.com/lit/ds/symlink/sn74ls04.pdf
- TI LS151: https://www.ti.com/lit/ds/symlink/sn74ls151.pdf
- TI LS02: https://www.ti.com/lit/ds/symlink/sn74ls02.pdf
- TI L293D: https://www.ti.com/lit/ds/symlink/l293.pdf
- TI NE555: https://www.ti.com/lit/ds/symlink/ne555.pdf
