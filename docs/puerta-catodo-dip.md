# Puerta: 5011AS, dos DIP4 e inventario LS

Esta es una variante independiente en `/puerta-catodo`. La referencia anterior es de ánodo común y conserva sus posiciones y avance. No copiar conexiones entre ambas.

El usuario confirma displays 5011AS de cátodo común, dos DIP de cuatro posiciones, resistencias de 1 kΩ y también de 10 kΩ, fuentes de 5 V y 6 V, y disponibilidad de LS02/04/08/86/32/00 y LS151. La cantidad disponible de resistencias de 10 kΩ no se confirmó: este montaje requiere cuatro. Se conservan NE555 y L293D del proyecto. No se utiliza LS240, HCT ni transistores adicionales.

## Componentes y simplificación

Seis integrados: LS151, LS02, dos LS04, NE555 y L293D. Un LS04 adicional separa cargas de displays y genera la polaridad positiva. No se conectan salidas en paralelo.

| Función | Resistencias |
| --- | --- |
| Cinco entradas DIP definidas con pull-up | 5 × 1 kΩ |
| NE555: RA=1k, RB=3k en serie | 4 × 1 kΩ |
| Tres LED | 3 × 1 kΩ |
| Comunes de displays, 20k cada uno | 4 × 10 kΩ |
| Total | 16 |

Se agrupan los LED, se usan dos placas y se retiran los cinco mandos externos. Solo el motor TT lleva cables externos. Resistencias y capacitores comparten las tiras de sus nodos; el generador no añade jumpers sobre componentes pasivos. La prueba retira cada jumper por separado y exige que se desconecte una red necesaria.

Se dibuja desacoplo recomendado: 100 nF por integrado y otro para VM del L293D, siete en total. Su disponibilidad no está confirmada. El único 100 µF confirmado sigue siendo temporización, entre T y GND: no sustituye un capacitor de alimentación. Los bypass del L293D y la recomendación de alimentación del 555 se documentan en sus hojas de datos.

## Corriente y límite de esta opción

La familia LS04 garantiza HIGH con 0.4 mA de fuente; no se trata de un driver de segmentos de varios miliamperios. Cada común tiene dos 10 kΩ en serie. Con VCC≤5.25 V y resistencias de tolerancia ±5%, la corriente total de un display queda acotada por 5.25/19000=0.2764 mA, incluso tomando Vf=0. Cada display tiene su propio buffer para el grupo NM. El nodo H comparte hasta tres entradas LS (60 µA): cota total de 0.3364 mA.

**La corriente es muy baja y la legibilidad no está demostrada.** Un cálculo típico de (3.4−1.8)/20k da unos 80 µA repartidos entre segmentos, con brillo desigual. La animación muestra estados lógicos, no brillo físico. No reducir resistencias basándose en la animación. Esta publicación prepara la revisión en Proteus; no certifica que el display real resulte suficientemente visible.

## DIP y fuentes

SW1: ABRIR, CERRAR, STOP, libre. SW2: FCA, FCC, libre, libre. Pares funcionales de cada DIP: 1–8, 2–7, 3–6, 4–5; confirmar la pieza real con continuidad. Cinco contactos ON a GND y cinco pull-ups independientes. Vías libres sin conectar. Los DIP simulan finales manuales; no sustituyen la detección mecánica automática.

Se mantienen cinco entradas y prioridad STOP. Para reanudar debe permanecer activo el mando de dirección. Los dos mandos activos inhiben el motor; no existe memoria electrónica independiente.

En A: +T=5 V y +B=6 V solo motor. Los cinco pull-up van del riel superior +5 V directamente a la tira superior del DIP; sus contactos opuestos van a GND. Nunca unir +T con +B, aunque la protoboard tenga rieles continuos. En B, +T izquierdo=5 V; su mitad derecha no se utiliza. -T comparte GND en ambas placas. No asumir que un riel no cableado tenga alimentación. Los negativos de ambas fuentes están unidos; los positivos separados.

Antes de energizar se debe medir directamente entre alimentación y GND de cada integrado. Los 5 V medidos solo en la fuente no demuestran que lleguen a las patas. L293D: pin16=5V, pin8=6V; GND4/5/12/13. Su límite continuo es 600mA y su caída reduce la tensión que llega al motor. La corriente del TT concreto aún debe medirse.

## Comprobaciones realizadas

`node verify-door-dip-cc.cjs`: 32 combinaciones evaluadas desde las conexiones reales de los chips, OF/rU/OP/SP, movimiento exclusivo, continuidad, separación 5V/6V, ningún agujero duplicado, ningún jumper redundante y cotas de corriente de display.

`node tools/verify-door-catodo-browser.cjs`: escritorio, móvil y Three.js real, dos DIP4 con ocho posiciones y cinco asignadas, un motor, dos cables externos, STOP/reanudación, finales manuales, navegación y ausencia de rótulos sobre extremos. Se mantiene el marcado manual del montaje.

Pendientes: simulación eléctrica en Proteus, brillo y reparto de corriente, contactos reales, ruido al arrancar, corriente del motor y montaje físico. No se han generado evidencias de laboratorio.

## Fuentes primarias

- XLITX, [5011AS](https://www.xlitx.com/datasheet/5011AS.pdf): cátodo común, K3/8; a7,b6,c4,d2,e1,f9,g10,dp5.
- TI, [SN74LS04](https://www.ti.com/lit/ds/symlink/sn74ls04.pdf): IOH −0.4mA, IOL8mA y niveles TTL.
- TI, [L293D](https://www.ti.com/lit/ds/symlink/l293.pdf): fuentes separadas, corriente, caída y bypass.
- TI, [NE555](https://www.ti.com/lit/ds/symlink/ne555.pdf): astable, RESET y desacoplo.
