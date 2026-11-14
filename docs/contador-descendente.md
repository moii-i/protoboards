# Contador BCD descendente 9 → 0 (Práctica 3.2)

Página: `/contador-descendente`. Modelo: `protoboard-ah/contador-descendente-modelo.mjs`. Prueba: `verify-counter-descendente.mjs`.

## Requisitos de la práctica

74LS73A como almacenamiento, BCD módulo 10 descendente, inicio en 9, regreso automático de 0 a 9, display de 7 segmentos, mecanismo de inicialización y sin estados no válidos. El 74LS73A solo tiene CLEAR; no vale suponer que CLEAR carga un 9.

## Arquitectura elegida: ÷2 × ÷5

| Flip-flop | Guarda | Reloj | J | K | Bit leído |
| --- | --- | --- | --- | --- | --- |
| U1·1 | a = Ā | RELOJ (NE555) | 1 | 1 | A = Q̄ (pin 13) |
| U1·2 | B | A_N (pin 12 de U1) | JB = NAND(C̄, D̄) | 1 | B = Q (pin 9) |
| U2·1 | C | A_N | D | B̄ | C = Q (pin 12) |
| U2·2 | d = D̄ | A_N | 1 | KD = B̄·C̄ | D = Q̄ (pin 8) |

- A_N baja cuando A pasa de 0 a 1 (0→9, 8→7, 6→5, 4→3, 2→1): son los únicos momentos en que cambian B, C o D.
- CLEAR deja Q = 0 en los cuatro: el 74LS48 recibe 1001. Es una asignación de estados, no un PRESET.
- 0→9 sale de JD = B̄·C̄; no hay compuerta de borrado.
- Rizado: el número impar intermedio (8 → 9 → 7) dura un retardo de flip-flop y siempre es BCD válido. Nada lo decodifica.
- Estados 10–15 vuelven a la secuencia en uno o dos pulsos.

Comparado con un síncrono completo (JB = Ā(C+D), KB = Ā, JC = ĀD, KC = ĀB̄, JD = ĀB̄C̄, KD = Ā: cinco compuertas AND/OR en dos integrados), esta versión usa tres NAND de un solo 74LS00.

## Montaje

Mismas columnas que el contador 0→9: U5 NE555 (5), U1 (13), U2 (23), U3 74LS00 (33), U4 74LS48 (43), DS1 5011AS (55). Sin LED: la práctica solo pide el display. Sin botón ni capacitor cerámico (pin 5 del NE555 libre), como el montaje físico del 0→9.

- Reloj: R6 10 kΩ (a6 → +T), R7 1 kΩ (b6 → b9), RV1 20 kΩ como resistencia variable (pata 1 a9, cursor a10 a TIEMPO, pata 3 a11 libre), C1 100 µF (j6 + → −B). T = 0.693·(R6 + 2·(R7 + RV1))·C1: de 0.83 s a 3.6 s por número; con C1 = 10 µF, de 0.08 s a 0.36 s. R7 evita RB = 0. RV1 cubre «respuesta ante diferentes frecuencias».
- Inicio: R8 10 kΩ (j14 → +B) y C3 10 µF (i14 + → −B) en la tira del pin 2 de U1. Al encender, C3 descargado mantiene INICIO_N en bajo y los cuatro CLEAR dejan 1001. Para repetir: apagar, esperar a que C3 se descargue y encender, o tocar INICIO_N con un cable a GND.
- U3 pines 12 y 13 a GND.

## Pendiente de validar

Simulación en Proteus, arranque real con C3 según la rampa de la fuente (si la fuente sube muy lento, el pulso puede no bastar), rango real de RV1 y brillo del display con las salidas del 74LS48.
