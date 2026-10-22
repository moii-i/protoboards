// Rebuild the door viewer from its maintained shared Three.js source.
const fs=require('fs'),path=require('path');
const deps=process.env.PROTOBOARD_TOOLS||path.resolve('node_modules');
require(path.join(deps,'esbuild')).buildSync({entryPoints:[path.resolve('puerta-viewer-source.js')],nodePaths:[deps],bundle:true,format:'esm',minify:true,target:['es2022'],outfile:path.resolve('protoboard-ah/visor-puerta-3d.js'),legalComments:'eof'});
console.log('Door viewer bundled from the shared Three.js source.');
