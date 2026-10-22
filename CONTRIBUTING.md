# Colaborar en Protoboards

El código y el cableado físico se revisan juntos. Antes de proponer cambios:

1. Ejecuta `npm ci`, `npm run check` y `npm run dev`.
2. Comprueba las vistas 2D/3D en escritorio y teléfono, los modos de recorrido y la isla del mapa ampliado.
3. Conserva los identificadores de conexiones cuando sus extremos no cambian. Si cambian agujeros, actualiza la versión del montaje y documenta la migración del progreso.
4. Modifica los generadores y vuelve a generar los archivos publicados. Los archivos `*-model.js`, `*-layout.js`, `puerta-guide.js` y `visor-puerta-3d.js` se incluyen para poder desplegar la web estática.
5. Un cambio de componente requiere revisar pinout, niveles lógicos, corriente, polaridad y disponibilidad física. Una verificación booleana no demuestra funcionamiento analógico.

Describe el problema, el comportamiento resultante y las comprobaciones realizadas. No incluyas evidencias o datos personales del estudiante, credenciales, perfiles de navegador, archivos `.env` ni estados locales.

La publicación en Vercel usa únicamente el directorio `protoboard-ah/`. Las pruebas y herramientas no forman parte del sitio público.
