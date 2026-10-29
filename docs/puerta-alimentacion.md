# Revisión de alimentación de la puerta, 29 de octubre de 2026

Se revisó el perfil actual de cátodo común, 5 IC y 11 resistencias, tanto con seis bypass opcionales como sin ellos. El modelo previsto no contiene uniones directas entre fuentes ni salidas push-pull enfrentadas. Esto no confirma el estado del montaje físico.

## Evidencia física y punto por comprobar

La grabación `WhatsApp Video 2026-10-29 at 11.46.59 AM.mp4` dura 47.88 s y muestra dos protoboards, el motor amarillo, una placa de control por USB y, al final, un módulo de alimentación conectado junto a los displays. Su indicador verde enciende y se aprecia un segmento rojo en uno de los displays. La resolución no permite identificar todos los agujeros, valores, selectores ni polaridades. No se observa una medición de tensión o continuidad.

En el modelo de bandas partidas, B:+T derecha no tiene puente a B:+T izquierda. Cambiar la entrada de +5 V a B:+T63 deja sin VCC a los cinco IC y a EN2 del L293D. GND por B:-T63 sí llega a los integrados; por B:-B63 aislado, no. En bandas continuas ambas entradas funcionan. Un módulo puede unir internamente los negativos de sus dos canales; no se debe inferir que falta un segundo puente de tierra sin medir.

Para reproducir el mapa, los puntos de entrada son +5 V en A:+T14, GND de lógica en A:-T14, +6 V en A:+B43 y negativo de 6 V en A:-B39. Se puede usar una salida identificada de 5 V/GND del módulo en lugar de la placa Arduino. Solo una fuente alimenta la red de 5 V; se mantienen separados ambos positivos y unidos los negativos.

Si se decide alimentar por el extremo de B, comprobar sin energía si existe corte entre B:+T31 y B:+T33. Si ese corte es la causa, basta un puente corto entre esas mitades para restablecer el positivo; no se cambia el circuito por una hipótesis no medida. Comprobar GND por separado. Los módulos visualmente similares tienen configuraciones de salida y funciones USB distintas; se necesita su serigrafía/manual y medir la salida seleccionada.

## Comprobaciones reproducibles

`npm run test:power` crea un grafo de las tiras de cinco agujeros, los bancos de alimentación, el cableado y los ocho contactos de ambos DIP. Comprueba 256 combinaciones × dos fases del 555 = 512 casos por perfil y configuración de bandas, 2048 casos en total.

- Compara los pines de alimentación con las fichas de los cinco integrados.
- Comprueba tierras comunes, separación de positivos, comunes de los displays antes de sus limitadores, resistencias de LED sin puente y polaridad/nodo del capacitor de temporización.
- Detecta salidas push-pull unidas directamente a fuentes o a otras salidas incluso si coinciden sus niveles lógicos.
- Incluye el transistor de descarga del 555: puentear R11 puede enfrentar DISCH con VCC.
- Inyecta fallos de columna en W050/W052/W076, bypass de resistencia, salidas unidas y fuentes conectadas a bandas aisladas. Los fallos deben detectarse.
- Genera los datos del panel de la web y comprueba que no estén desactualizados.

La comprobación usa niveles ideales. No mide corriente, capacidad de fuente, caída de tensión, ruido, temperatura, arranque/bloqueo del motor, contactos defectuosos ni componentes dañados. El reparto de corriente entre segmentos con una resistencia común tampoco se simula.

## Mediciones para separar causas

Con ambas fuentes retiradas, verificar continuidad desde la entrada hasta VCC/GND de cada IC. Para probar lógica, desconectar primero motor y fuente de 6 V. Medir directamente sobre las patas: LS151, VCC16/GND8; LS02 y LS04, VCC14/GND7; NE555, VCC8/GND1; L293D, VCC1=16 y GND4/5/12/13. Los LS requieren 4.75–5.25 V. Sin 6 V no se esperan el motor ni amarillo/verde de la segunda mitad del L293D.

Si la alimentación llega correctamente, revisar niveles de salida con los displays conectados y totalmente desconectados del circuito. NM del LS151 alimenta cuatro segmentos de D1 y una entrada LS04; el límite de corriente HIGH garantizado es 0.4 mA. Una resistencia de 1 kΩ en el común reproduce el Proteus, pero no demuestra capacidad de corriente o brillo físico. No se añaden compuertas o resistencias para ocultar una alimentación todavía no medida.

## Referencias primarias

- [TI SN74LS151](https://www.ti.com/lit/ds/symlink/sn74ls151.pdf)
- [TI SN74LS02](https://www.ti.com/lit/ds/symlink/sn74ls02.pdf)
- [TI SN74LS04](https://www.ti.com/lit/ds/symlink/sn74ls04.pdf)
- [TI NE555](https://www.ti.com/lit/ds/symlink/ne555.pdf)
- [TI L293D](https://www.ti.com/lit/ds/symlink/l293.pdf)
- [XLITX 5011AS](https://www.xlitx.com/datasheet/5011AS.pdf)
- [Keyestudio KS0280](https://docs.keyestudio.com/projects/KS0280/en/latest/docs/KS0280.html): ejemplo de módulo alimentado por USB; no identifica el módulo del video.
- [SunFounder MB102](https://www.sunfounder.com/products/mb102-breadboard-power-module): ejemplo donde USB-A se documenta como salida; no identifica el módulo del video.
