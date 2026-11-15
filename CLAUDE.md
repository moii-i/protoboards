# Protoboards · guía para Claude Code

Lee primero AGENTS.md: ahí están los criterios de diseño de los circuitos y las notas de cada rediseño.

@AGENTS.md

## Cómo se trabaja en este repo
- El sitio estático vive en `protoboard-ah/`. Vercel está conectado al repo: cada push a `main` se publica solo (ver `vercel.json` en la raíz).
- Servidor local: `node tools/dev-server.cjs` (http://127.0.0.1:4173).
- Pruebas: `npm test` y las suites de interfaz `npm run test:workbench`, `test:theme`, `test:showcase`, `test:external-controls`. `test:design` ya fallaba antes del rediseño (selector en /puerta?montaje=ls151).
- Estilos: el CSS heredado está intacto en `protoboard-ah/legado/` dentro de `@layer legacy`; los cambios van en `protoboard-ah/appearance.css` (sin capa). La barra única y el resto del acomodo "Taller" los arma `protoboard-ah/design-system.js`.
- Miniaturas 3D del catálogo: `python tools/build-turntables.py` con el servidor local encendido.
- ADN visual: profesional y limpio. Nada de animaciones decorativas que distraigan; transiciones cortas y fluidas.
- Un commit por cambio, para poder revertirlo con `git revert`.
