# Criterio de diseño de Protoboards

La prioridad del usuario es facilitar al máximo el ensamblado físico y su reproducción en Proteus. Esta prioridad se aplica a nuevos circuitos y a revisiones del proyecto.

- Partir del inventario confirmado; distinguirlo de los componentes que recomendó un asistente. Para esta revisión se confirmaron 22 resistencias de 1 kΩ, displays de ánodo común y un electrolítico de 100 µF. Los cinco integrados del perfil LS151 son la base de trabajo existente, no una nueva confirmación de inventario.
- Evaluar cambios de arquitectura antes de aceptar un conteo elevado de resistencias, capacitores o integrados. Aprovechar compuertas y canales libres de los integrados existentes.
- Comparar número de piezas, jumpers, placas, longitud de conexiones y facilidad de montaje; no optimizar solamente un contador.
- El usuario autoriza dos protoboards y prioriza espacio, claridad y facilidad de cableado. Comparar agrupaciones por función; mantener los segmentos cerca de sus compuertas y pasar entre placas sólo las señales necesarias. No añadir piezas para ocupar la segunda placa.
- Colocar los componentes por conectividad física. Un pull-up o pull-down debe compartir la tira del pin y alcanzar el riel cercano cuando sea posible; no enviarlo a otra placa para volver con un jumper.
- Usar patas de componentes, tiras internas y rieles para conexiones reales; nunca tratar una resistencia o capacitor como un cortocircuito. No insertar dos terminales en un solo agujero. Verificar rieles partidos y separar 5 V de VM.
- Acercar el 555 a su red RC, el driver al motor y la lógica de indicación a los displays. Evaluar una sola protoboard antes de ampliar a dos.
- En Proteus, usar terminales DEFAULT con nombres coherentes y diagramas por bloques; esos nombres no eliminan las conexiones físicas.
- Justificar cada capacitor por su función: temporización, desacoplo o reserva. No añadirlos por plantilla ni prometer estabilidad al retirarlos sin pruebas. El color de un capacitor no determina su función.
- Se pueden estudiar limitadores compartidos de display si se acota toda la corriente y se declara la variación de brillo; no presentarlos como equivalentes a una resistencia por segmento.
- Un resultado booleano, un cálculo de corriente y una animación no acreditan simulación analógica ni montaje real. Mantener visibles los pendientes de validación. No inventar evidencias del examen.
- Conservar los montajes de referencia y separar el avance cuando cambien agujeros, piezas o valores. Documentar cambios y publicar solamente la versión verificada dentro de su alcance.
