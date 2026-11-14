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

Mismas columnas que el contador 0→9: U5 NE555 (5), U1 (13), U2 (23), U3 74LS00 (33), U4 74LS48 (43), DS1 5011AS (55). Se retiran los 4 LED y sus 4 resistencias. Se añaden SW1 (pulsador de 4 patas sobre el canal, columnas 20 y 22), R8 10 kΩ (j20 → +B) y C3 10 µF (h20 + / h22 −). U3 pines 12 y 13 a GND.

C3: retiene INICIO_N en bajo al encender para arrancar en 9. Con 100 µF funciona igual con un arranque más lento. Sin C3 hay que pulsar INICIO tras encender.

## Pendiente de validar

Simulación en Proteus, arranque real con C3 según la rampa de la fuente, rebote del pulsador (CLEAR es asíncrono: el rebote solo repite el borrado) y brillo del display con las salidas del 74LS48.
