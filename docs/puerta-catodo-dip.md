# Puerta 5011AS: revisión compacta de 11 resistencias

La variante publicada en /puerta-catodo usa el inventario confirmado: LS151, LS02, un LS04, NE555, L293D, dos DIP4 SPST, dos 5011AS de cátodo común, un motor TT amarillo, fuentes de 5 V y 6 V. No añade otros tipos de compuertas. El usuario confirma valores 1 kΩ, 2.2 kΩ, 5.1 kΩ, 10 kΩ y 100 Ω; no se conocen todas las cantidades. No se usa el valor ambiguo “720 o 60”.

## Comparación reproducible

| Concepto | Referencia CC anterior | Compacto |
| --- | ---: | ---: |
| Integrados | 6 (dos LS04) | 5 (un LS04) |
| Resistencias | 16 | 11 |
| Jumpers y cables de fuente en placa | 88 | 83 |
| Cables externos de motor, aparte | 2 | 2 |
| Cruces de pares de cables dibujados | 86 | 64 |
| Longitud de trazado, unidades gráficas | 43680 | 35595 |
| Electrolítico de temporización | 100 µF | 100 µF |
| Cerámicos dibujados | 7 × 100 nF | 0 en experimental / 6 en recomendado |

La longitud es una métrica del trazado SVG/3D a paso constante, no una medición de cables cortados. Se compararon seis posiciones U2/U3; cinco eran válidas y una provocaba un corto con la cadena del común, detectado por el generador. U2 en B3 y U3 en B23 dejan menos cruces de las probadas. No se afirma un mínimo matemático global. Cada cable se elimina individualmente en el verificador: su ausencia debe desconectar una red necesaria. Eso prueba irredundancia de esta distribución, no imposibilidad de otra arquitectura.

Los positivos siempre usan rieles diferentes: +T=5 V, +B de A derecha=6 V. No dependen del corte central para aislar voltajes. Negativos comunes, con bancos de GND cableados explícitamente. Alimentaciones de chips bajan al riel cercano; los enlaces de rieles forman un árbol. Ningún agujero aloja dos terminales. En B solo se usan los bancos de riel señalados por los cables, no toda la longitud automáticamente.

## Las 11 resistencias

Los tres LED están alineados en una columna sobre la placa A: rojo arriba, amarillo al centro y verde abajo. Se usan sus propias patas dobladas, sin agregar piezas ni jumpers. La separación mínima entre centros es 6.35 mm sobre la cuadrícula nominal de la placa; comprobar que los cuerpos reales caben y que sus patas no se tocan antes de energizar.

| Pieza | Primera pata | Segunda pata |
| --- | --- | --- |
| Rojo, ánodo / cátodo | A:a50 | A:-T45 |
| Amarillo, ánodo / cátodo | A:b49 | A:c46 |
| Verde, ánodo / cátodo | A:e46 | A:e49 |
| R12 de 1 kΩ, sin polaridad | A:a51 | A:b50 |

La lógica y los valores permanecen iguales. Las tiras superiores 46 y 49 conectan amarillo/verde en antiparalelo; rojo alcanza directamente el riel negativo con su cátodo. El montaje compacto usa la revisión de avance `proteus-11r-v1`, sin borrar ni reutilizar las marcas guardadas de la distribución anterior. El perfil con desacoplo incluye el mismo grupo de LED y conserva 83 cables.

| Función | Cantidad y valor | Justificación |
| --- | --- | --- |
| ABRIR, CERRAR, FCA, FCC | 4 × 1 kΩ | Pull-up independientes; ON cierra a GND. No compartir resistencia entre señales independientes. |
| STOP directo a RESET | 1 × 2.2 kΩ | El contacto cerrado pone S a GND; abierto activa STOP. S alimenta también tres entradas LS. |
| Astable NE555 | 1 × 1 kΩ + 1 × 5.1 kΩ | RA y RB; reemplaza tres resistencias de RB por una 5.1 kΩ disponible. |
| LED rojo | 1 × 1 kΩ | Limitador individual desde Q del 555. |
| LED amarillo / verde | 1 × 1 kΩ | Antiparalelo entre OUT3/OUT4 del L293D. Conducen en sentidos contrarios, solo uno a la vez. |
| Comunes de displays | 2 × 1 kΩ | R2 izquierdo y R4 derecho, como en el Proteus grabado. K3/8 unidos antes del limitador individual de cada display. |
| Total | 9 × 1 kΩ + 1 × 2.2 kΩ + 1 × 5.1 kΩ | 11 piezas |

Una resistencia de mayor valor no reemplaza varios pull-up independientes: uniría entradas. Compartir limitadores solo se ha aplicado al par de LED con polaridad opuesta y a cada común con las limitaciones siguientes. No usar 100 Ω para intentar ganar brillo directamente desde LS.

## STOP y señales

**Cambio de montaje: SW1.3 ON = RUN; SW1.3 OFF = STOP.** El contacto cerrado pone S y RESET directamente a GND. Así se elimina el inversor intermedio y se evita exigir a una salida LS la corriente de RESET. No copiar la conexión STOP del perfil anterior. Una rotura de este contacto simula STOP; no se certifica como parada de seguridad industrial.

SW1: 1 ABRIR, 2 CERRAR, 3 RUN/STOP, 4 libre. SW2: 1 FCA, 2 FCC, 3/4 libres. Contactos 1-8,2-7,3-6,4-5: confirmar pieza real. Las posiciones libres quedan sin conectar. Inicial: SW1.1/2 OFF, SW1.3 ON; SW2.FCC ON y FCA OFF.

Los DIP de finales se accionan manualmente. No detectan automáticamente posición. La orden de dirección se conserva en su DIP durante STOP, sin memoria electrónica independiente. Ambos mandos activos inhiben el motor. M=¬S·(¬A_N·C_N·PA+A_N·¬C_N·PC). PA/PC=0 al accionar su final.

NE555: tH=ln(2)·6100·100 µF≈0.423 s, tL≈0.354 s, f≈1.288 Hz. Es cálculo nominal, no medición. El 100 µF electrolítico va de T a GND y es necesario para este parpadeo astable.

L293D: 16=5 V,8=6 V,4/5/12/13=GND. EN1=M, IN1=A_N, IN2=C_N, motor OUT2/OUT1. EN2=5 V, IN3=M, IN4=G. OUT3→R13→LED_PAIR; amarillo ánodo LED_PAIR/cátodo OUT4; verde ánodo OUT4/cátodo LED_PAIR. Los dos se limitan entre sí en tensión inversa. El rojo sigue Q→1k→LED→GND. M·G=0 en todas las combinaciones. La corriente ideal del par queda por debajo de 6.7 mA con VM≤6.3 V, R±5%, incluso tomando Vf=0. Caídas del puente y Vf reales pueden reducir brillo. Medir corriente del TT: L293D admite 600 mA continuos y pierde tensión en sus transistores; 6 V de fuente no implican 6 V en el motor.

## Capacitores: encender y ser estable son comprobaciones distintas

El perfil predeterminado experimental retira los cerámicos para permitir estudiar el montaje mínimo que pide el usuario. **No afirma estabilidad eléctrica sin desacoplo.** Ver encendido en clase demuestra ese encendido en esas condiciones, no inmunidad al ruido, arranques del motor o transitorios.

El segundo perfil /puerta-catodo?desacoplo=si conserva exactamente lógica y cableado, y añade seis 100 nF: uno por integrado y otro para VM del L293D. TI recomienda al menos 0.1 µF en ambas alimentaciones del L293D; en NE555 el bypass de alimentación es altamente recomendado. Estos capacitores no crean estados ni cambian ecuaciones. El 100 µF de temporización no sustituye esos bypass. El pin CONT5 del 555 queda libre en esta propuesta; un filtro de CONT se evalúa por ruido, no se añade por plantilla.

Los 100 nF en riel junto al pin de alimentación tienen recorrido corto, pero una protoboard con patas largas no equivale a desacoplo de una PCB. No se promete que añadirlos arregle un fallo desconocido. No se utilizan capacitores decorativos o sin función.

## Límites eléctricos del display

Pinout 5011AS: K3/8, a7,b6,c4,d2,e1,f9,g10,dp5. D1: a/c/d/f=NM,b=I,e=NS_D,g=H. D2: a/g=NM_D2,b=NNT_D,c/d=M_D,e/f=HIGH_D.

La referencia del usuario muestra una sola resistencia de 1 kΩ por común: R2 en el display izquierdo y R4 en el derecho. Se sustituyen las cuatro de 10 kΩ de la revisión web anterior por estas dos piezas. No se añaden inversores ni drivers. Compartir el limitador del común reproduce la simulación; reparte corriente entre segmentos y no equivale a limitadores por segmento.

El modelo de Proteus del multiplexor se identifica como **74151**, mientras el inventario y la web indican **SN74LS151N**. Comparten distribución de patas y función lógica; sus modelos eléctricos no son equivalentes. La familia LS04 garantiza niveles HIGH a IOH=-0.4 mA. Con 1 kΩ, V/R da una cota ideal de 5.53 mA por común para 5.25 V y R−5%; no demuestra que las salidas mantengan nivel ni corriente admisible. Tampoco incluye todos los caminos de fuga inversa entre segmentos. Por ello se reproduce el montaje solicitado sin certificar corriente o brillo físicos a partir de la animación.

## Cotejo con la evidencia del usuario — 29 de octubre de 2026

Se inspeccionaron ocho capturas y dos grabaciones: 014409 (27 s, Proteus) y 101344 (66 s, alterna web/Proteus). Se observaron OF, OP, rU y SP en la simulación. El video no sustituye una prueba de las 32 combinaciones ni una medición física.

| Bloque observado | Correspondencia en la web |
| --- | --- |
| 74151 / LS02 / LS04 | Se conservan los números de pin y las redes lógicas. |
| Astable | R11=1 kΩ, R6=5.1 kΩ, C1=100 µF; RESET=S. |
| Entradas DIP | R7 ABRIR, R8 CERRAR, R9 FCA, R10 FCC: 1 kΩ; R5 STOP: 2.2 kΩ. |
| LED rojo | R12=1 kΩ desde la salida del 555. |
| Amarillo y verde | R13=1 kΩ compartida, LED antiparalelos en OUT3/OUT4. |
| Displays | R2/R4=1 kΩ, una por común; decimal libre. |
| Potencia | Un motor, 5 V lógica y 6 V motor; negativos unidos. GND4/5/12/13 del L293D se mantienen conectados. |

También se corrigió el accionamiento 3D: pulsar una columna de la carcasa del DIP actúa su contacto, igual que la corredera; las patas conservan inspección. Antes, pulsar la carcasa abría el inspector y podía dejar STOP activo. No se cambian ecuaciones para compensar esa interacción. La revisión separa el avance porque cambian piezas, valores e identificadores.

## Perfiles, validación y pendientes

La prueba de la revisión `proteus-contactos-v2` calcula segmentos, LED y sentido del motor mediante los pines del LS151, LS02, LS04, RESET del NE555 y L293D. Se retiró la selección de mensajes por estados ideales en este perfil. Las resistencias y los contactos SPST definen los niveles de entrada. El temporizador conserva su fase nominal; no se simulan corrientes, brillo o transitorios analógicos.

Los controles 2D, 3D y botones usan una sola función de accionamiento. STOP conserva su polaridad del cableado: contacto cerrado=RUN, abierto=STOP. El nombre flotante del DIP seleccionado muestra las posiciones ON/OFF actuales. Enter y Espacio accionan también los contactos en 2D. No se añadieron componentes ni jumpers, y el avance de montaje se conserva.

`tests/fixtures/puerta-proteus-observado.json` registra 85 asignaciones de pin cotejadas y cuatro observaciones consistentes de la tanda reciente: OP, SP, SP y rU de cierre. Los lados de un contacto SPST son intercambiables; se comparan sus pares de redes. La pareja de capturas 164025/164029 no permite una correlación inequívoca de los niveles con el mensaje y no se fuerza como caso de prueba. Las fotografías separadas no registran las acciones entre capturas.

`npm run test:proteus` comprueba los cuatro casos, las 32 combinaciones y fallos deliberados de un segmento y del ENABLE del motor. En Chrome reproduce los contactos con eventos reales de ratón, STOP y reanudación, parpadeo observado durante un periodo, teclado y conservación del progreso. Los finales manuales permanecen independientes, incluso si se activan ambos, como en el circuito de Proteus.

- /puerta-catodo: compacto experimental sin cerámicos.
- /puerta-catodo?desacoplo=si: compacto con seis bypass recomendados, sin cables extra.
- /puerta-catodo?montaje=anterior: referencia 6IC/16R, conserva conexiones y progreso.
- Referencias de ánodo común permanecen en /puerta y no son intercambiables.

Los tres perfiles de cátodo usan claves de avance distintas. El compacto cambia posición de componentes y cables: no reutilizar marcas anteriores. Se conservan la isla flotante de navegación, marcado explícito, vista amplia y ausencia de rótulos sobre los extremos.

Verificadores: node verify-door-dip-cc-compacto.cjs y con --bypass comprueban 32 entradas desde pines, exclusión motor/LED, mensajes OF/rU/OP/SP, continuidad, separación de voltajes, agujeros únicos y necesidad de cada jumper. node tools/verify-door-catodo-browser.cjs prueba escritorio, móvil, 3D, perfiles, STOP físico y semántico, reanudación y finales manuales. npm run check cubre las referencias anteriores.

**Pendientes:** reproducción independiente del archivo Proteus, brillo y fugas con el 5011AS real, arranque/ruido sin y con bypass, contactos reales, corriente del motor y montaje físico. No se han generado evidencias de laboratorio. “Irredundante” no significa “mínimo absoluto”.

## Fuentes primarias

- XLITX: https://www.xlitx.com/datasheet/5011AS.pdf
- TI LS04: https://www.ti.com/lit/ds/symlink/sn74ls04.pdf
- TI LS151: https://www.ti.com/lit/ds/symlink/sn74ls151.pdf
- TI LS02: https://www.ti.com/lit/ds/symlink/sn74ls02.pdf
- TI L293D: https://www.ti.com/lit/ds/symlink/l293.pdf
- TI NE555: https://www.ti.com/lit/ds/symlink/ne555.pdf
