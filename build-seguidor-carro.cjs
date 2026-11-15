// Compila el visor del ensamblado del AGV (seguidor-carro-source.js) con three.js.
const path=require('path');
const deps=process.env.PROTOBOARD_TOOLS||path.resolve('node_modules');
require(path.join(deps,'esbuild')).buildSync({entryPoints:[path.resolve('seguidor-carro-source.js')],nodePaths:[deps],bundle:true,format:'esm',minify:true,target:['es2022'],outfile:path.resolve('protoboard-ah/seguidor-carro-3d.js'),legalComments:'eof'});
console.log('Visor del ensamblado del AGV compilado.');
