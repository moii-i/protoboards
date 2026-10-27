const fs=require('node:fs'),path=require('node:path');
const destination=path.resolve(process.argv[2]||'work/release-source');fs.mkdirSync(destination,{recursive:true});
const files=['.gitignore','.gitattributes','README.md','CONTRIBUTING.md','package.json','package-lock.json','puerta-viewer-source.js','external-controls-geometry.mjs','verify-components-first.cjs','route-door-wires.cjs',...fs.readdirSync('.').filter(f=>/^(build-door-|verify-door-)/.test(f))];
for(const directory of ['.github','docs','tools','protoboard-ah']){
 const walk=dir=>{for(const entry of fs.readdirSync(dir,{withFileTypes:true})){if(entry.name.startsWith('.')&&directory==='protoboard-ah')continue;const file=path.join(dir,entry.name);if(entry.isDirectory())walk(file);else if(!['puerta.js','puerta-viewer.js'].includes(entry.name))files.push(file);}};walk(directory);
}
for(const file of files){const to=path.join(destination,file);fs.mkdirSync(path.dirname(to),{recursive:true});fs.copyFileSync(file,to);}
console.log(JSON.stringify({files:files.length,destination}));
