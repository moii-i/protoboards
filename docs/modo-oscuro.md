# Modo oscuro del espacio de montaje

Personalizar → Oscuro usa una paleta común para toda la página de puerta: fondo, superficies, texto principal/secundario, enlaces, bordes, foco y estados seleccionados. Las variables del sistema visual se enlazan con las del espacio de montaje para evitar texto claro sobre superficies heredadas blancas. Las advertencias, STOP y los indicadores conservan estados distinguibles con fondos y textos coordinados.

Se incluyen instrucciones, materiales, tabla de conexiones y selección de filas, Personalizar, inspector de pines, buscador de componentes, señales, prueba de puerta, lupa y navegación flotante. El fondo 3D lee la misma variable CSS del lienzo. La leyenda situada fuera de cada protoboard se adapta al fondo; marcas físicas, materiales, trazado y colores eléctricos permanecen intactos. La apariencia conserva su clave de almacenamiento y no modifica el avance.

`npm run test:theme` ejecuta Chrome en doce escenarios: página, Personalizar, inspector, señales, diálogo, móvil, 3D, claro, referencia de ánodo común, STOP, movimiento y contraste. Calcula contraste de texto HTML visible contra el fondo compuesto: 4.5:1 para texto normal y 3:1 para texto grande. Excluye controles deshabilitados y dibujos físicos SVG/canvas. Comprueba también ausencia de desbordamiento, persistencia de preferencia, retorno a claro, estabilidad de marcas y colores de cables. No sustituye una auditoría integral de accesibilidad ni mide el contraste de texturas 3D, pseudo-elementos o todos los estados de interacción posibles.

La suite de espacio de trabajo cubre además recarga, teclado, encuadre y separación de herramientas respecto al circuito. Las capturas de escritorio, móvil y 3D se inspeccionan visualmente antes de publicar.
