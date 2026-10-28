# Primera entrega: espacio libre, continuidad y apariencia

Se aplica a las dos opciones activas de la puerta, conservando sus modelos y coordenadas. No reintroduce rótulos de origen/destino sobre el montaje.

- La barra compacta tiene una franja reservada encima del visor ampliado. La navegación de conexiones, prueba de puerta y personalización permanecen fuera del canvas.
- Inspector, ayuda de colocación, señales, información de tiras y prueba usan una columna propia. En móvil se ubican debajo; en horizontal con poca altura se conserva una columna lateral. Los controles de mover tarjetas se ocultan porque las tarjetas ya tienen espacio fijo fuera del circuito.
- La descripción de vista ocupa un pie, fuera del montaje. La lupa conserva su área separada.
- El intercambio 2D/3D mantiene la selección. Se conserva la cámara 3D y el área del plano se transfiere al regresar después de desplazar/acercar el 3D. Un botón permite recuperar el encuadre 2D anterior. Un cambio de etapa, vista o selección establece un nuevo contexto.
- Abrir/cerrar herramientas, cambiar resolución o redimensionar el visor actualiza su superficie sin reiniciar la cámara 3D. Las peticiones rápidas de 2D cancelan una apertura pendiente de 3D.
- Personalización: claro, oscuro y alto contraste; tres tamaños de instrucciones; controles cómodos/compactos; calidad 3D equilibrada/ligera/nítida; efectos de interfaz según dispositivo, suaves, reducidos o desactivados.
- Perfiles Estudiar, Montar y Presentar ajustan lectura, densidad, efectos y resolución. No marcan conexiones ni cambian el circuito. Los colores y geometría de piezas, placas y cables pertenecen al modelo, no al tema.
- Apariencia guardada localmente, con listas de valores permitidos. Se carga antes del primer pintado. El progreso sigue guardándose por variante en su clave existente.
- El movimiento de interfaz se controla separadamente de las demostraciones de montaje y del parpadeo del circuito. También se respeta la preferencia del dispositivo.

Verificación: `npm test`, `node tools/verify-door-options-browser.cjs` y `node tools/verify-door-workspace-browser.cjs`. Las pruebas de navegador comprueban regiones sin solapamiento, selección, continuidad de cámara, preferencias al recargar, teclado/Escape, móvil vertical/horizontal, temas, calidad y ausencia de cambios de avance/redes.

Esta entrega no implementa transparencia selectiva por oclusión ni las tarjetas nuevas de elección de circuito. Tampoco acredita pruebas físicas o simulación analógica de electrónica.
