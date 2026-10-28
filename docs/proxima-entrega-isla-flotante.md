# Entrega: isla flotante y controles del visor

Estado: implementada tras autorización del usuario. Conserva el circuito y los progresos de cada alternativa.

## 1. Recuperar la isla flotante de Cable por cable

- Dentro del visor 2D y 3D, con el tamaño compacto solicitado. Visible durante el recorrido Cable por cable; la navegación Por pasos conserva su presentación propia.
- Acciones principales: anterior, contador de conexión, siguiente y marcar/seguir. Repetición, pausa y opciones secundarias se despliegan a petición.
- Plegable y reposicionable dentro de los límites del visor; guardar su ubicación según tamaño de pantalla. Evitar cambios automáticos de posición mientras el alumno está interactuando.
- Recuperar espacio para el circuito al retirar la franja reservada exclusivamente para la isla. Mantener la ayuda y la personalización en sus áreas laterales/inferiores.
- Sin rótulos sobre los extremos de cables y sin botones grandes encima del ensamblado. Conservar contorno y anillos pequeños de selección.
- Recorrer o reproducir una conexión nunca la marca como físicamente realizada: el marcado sigue siendo explícito.

## 2. Control manual de la animación

Un control de recorrido permite examinar inserción inicial, tendido e inserción final del jumper. Se mantiene la misma conexión en 2D/3D, con pausa y repetición, sin cambiar el avance del montaje.

## 3. Vistas recordadas por bloque

Guardar el encuadre ajustado por el alumno para placa A, placa B y conjunto. Volver a una placa recupera su zoom/posición; un botón permite restablecer la vista de referencia.

## 4. Resaltado ajustable

Permitir elegir intensidad y grosor del contorno de selección. Afecta a la ayuda visual; conserva los colores reales de los cables y componentes y no añade etiquetas.

## 5. Dos tarjetas para las alternativas actuales

Mostrar 9 resistencias de 1 kΩ frente a 7 resistencias (6 de 1 kΩ + 1 de 6.8 kΩ), materiales necesarios y ritmo del rojo. Conservar únicamente estas dos alternativas y sus progresos independientes.

## 6. Menos recorrido hasta el montaje

Reducir información introductoria repetida y agrupar teoría/materiales en secciones desplegables. Pulir transiciones de los paneles y del selector respetando el movimiento reducido y los controles del estudiante.

## Verificación antes de publicar

Revisar isla plegada/desplegada, arrastre y límites, 2D/3D, móvil vertical/horizontal, selección persistente, ausencia de etiquetas sobre extremos y marcado siempre manual. Probar también temas, perfiles y restauración de cámara, sin modificar redes ni coordenadas del circuito.

## Validación de la entrega

`npm run test:cables` comprueba las ocho situaciones: escritorio, móvil vertical/horizontal, tema nocturno, 3D, cable externo, recarga y cambio de alternativa. Verifica límites de la isla, plegado, teclado, recorrido manual, encuadres recordados, contorno y marcado explícito. `npm run test:workspace` conserva doce verificaciones de apariencia, paneles y cámara. `npm run check` comprueba construcción y los invariantes de los montajes. Estas pruebas no constituyen evidencias de simulación analógica ni de construcción física.
