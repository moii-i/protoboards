# Puerta: alternativa sin ULN2803A

**El NE555 no sustituye al ULN pata por pata.** Se retira la etapa de ocho canales y se recablean los retornos de los segmentos. El 555 solo genera el parpadeo rojo.

| Referencia | Integrado | Placa / columnas |
| --- | --- | --- |
| U1 | SN74LS02N | A / 3–9 |
| U2 | 74HC02 | A / 15–21 |
| U3 | 74HC14 | A / 26–32 |
| U4 | NE555L o NE555 DIP8 | A / 37–40 |
| U5 | L293D | A / 51–58 |
| U6 | SN74LS08N | B / 57–63 |

Muescas a la izquierda; pin 1 abajo a la izquierda, cruzando la ranura. U2/U3 deben ser HC. La guía muestra los agujeros y el orden exacto.

Se conservan las 14 resistencias de 1 kΩ de los segmentos y las tres de los LED. Se agregan RL1, RL6 y RA de 1 kΩ y CD4 de 100 nF. Se reutilizan RO de 100 kΩ y CT de 10 µF. Total: 6 integrados, 28 resistencias, 8 capacitores, 3 interruptores enclavados, 2 finales de carrera, 3 LED, 2 displays y un motor: 53 piezas principales.

| Carga | Retorno / conexión nueva |
| --- | --- |
| D1 a,c,d,f y D2 a,g | Cada resistencia individual → grupo RL1 de 1 kΩ → M, U3.2 |
| D1 b | Resistencia individual → H, U3.6 |
| D1 e | Resistencia individual → STOP |
| D1 g | Resistencia individual → I, U2.4 |
| D2 b | Resistencia individual → NT, U2.10 |
| D2 c,d y amarillo | Cada resistencia individual → grupo RL6 de 1 kΩ → NM, U2.1 |
| D2 e,f | Cada resistencia individual → GND |
| Verde | G, U2.13 → RG de 1 kΩ → ánodo; cátodo → GND |
| Rojo | U4.3 OUT → RR de 1 kΩ → ánodo; cátodo → GND |

RL1 y RL6 son obligatorias, además de las resistencias individuales. No se unen salidas de compuertas. Displays de ánodo común, con pinout 1=e, 2=d, 3=COM, 4=c, 5=DP libre, 6=b, 7=a, 8=COM, 9=f, 10=g; debe coincidir con el modelo comprado.

| Pata NE555 | Conexión |
| --- | --- |
| 1 GND | Tierra común |
| 2 TRIG | Unida a 6 y CT positivo |
| 3 OUT | RR de 1 kΩ → ánodo rojo |
| 4 RESET | STOP |
| 5 CONT | Libre; 10 nF a GND opcional |
| 6 THRES | Unida a 2 y CT positivo |
| 7 DISCH | Unión RA / RO |
| 8 VCC | +5 V |

RA de 1 kΩ va de +5 V a 7; RO de 100 kΩ de 7 a 2/6; CT de 10 µF tiene positivo en 2/6 y negativo a GND. CD4 de 100 nF desacopla 5 V/GND cerca del integrado. Ritmo nominal ~0.72 Hz. STOP=0 mantiene RESET y OUT bajos y apaga el rojo. STOP=1 habilita el parpadeo.

Retira la antigua red RC de U3.12/U3.13. U3.13 pasa a GND; U3.12, U3.4 y U3.8 quedan sin conexión externa.

Con 4.75–5.25 V, resistencias ±5% y caída LED mínima asumida de 1.5 V, las cotas calculadas de corriente son 3.49 mA para seis segmentos y las entradas asociadas, 2.96 mA para dos segmentos y amarillo, y 3.95 mA para una rama individual. Se comparan con características HC a 4 mA. El brillo será reducido y desigual entre grupos; no son mediciones.

El control LS conserva cinco pull-down de 470 Ω y dos pull-up de 2.2 kΩ de MA/MC a +5 V. El motor conserva L293D con fuente de 6 V y tierra común. Las 64 combinaciones digitales y coordenadas están verificadas; falta validar en Proteus eléctrico y en protoboard niveles, corriente, brillo y comportamiento con el motor.

Referencias:

- NE555: https://www.ti.com/lit/ds/symlink/ne555.pdf
- SN74HC02: https://www.ti.com/lit/ds/symlink/sn74hc02.pdf
- SN74HC14: https://www.ti.com/lit/ds/symlink/sn74hc14.pdf
- L293D: https://www.ti.com/lit/ds/symlink/l293.pdf
- Interfaz LS–HC: https://www.ti.com/jp/lit/pdf/scla007
