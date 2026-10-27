const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const core=fs.readFileSync('protoboard-ah/component-assembly.js','utf8');
const letterSource=fs.readFileSync('protoboard-ah/index.html','utf8').match(/const model=(.*?);\r?\n/)[1];
for(const [name,file]of [['letras',null],['555','ne555-model.js'],...['ls151','ls151-compacto','sinuln','ls','comunes','redes'].map(v=>[v,(v==='comunes'?'puerta':'puerta-'+v)+'-layout.js'])]){
 const ctx=vm.createContext({window:{}});vm.runInContext(core,ctx);
 vm.runInContext(file?fs.readFileSync('protoboard-ah/'+file,'utf8'):'const model='+letterSource+';',ctx);
 const before=vm.runInContext('JSON.stringify(model)',ctx),old=JSON.parse(before);
 vm.runInContext('window.ComponentAssembly.prepare(model);window.result={model,catalog:window.ComponentAssembly.catalog(model)};',ctx);
 const m=JSON.parse(JSON.stringify(ctx.window.result.model)),parts=ctx.window.result.catalog;
 assert.equal(m.layoutVersion,old.layoutVersion);assert.equal(m.items.length,old.items.length);
 assert(m.items.filter(i=>!['wire','link'].includes(i.kind)).every(i=>i.stage===0));
 for(let i=0;i<m.items.length;i++){const item={...m.items[i]};if(!['wire','link'].includes(item.kind)){item.stage=item.wiringStage;delete item.wiringStage;}assert.deepEqual(item,old.items[i],name+' electrical item '+item.id);}
 assert.equal(new Set(parts.map(p=>p.id)).size,parts.length,name+' unique components');
 assert(parts.every(p=>p.holes.length>0));const prepared=JSON.stringify(m);
 vm.runInContext('window.ComponentAssembly.prepare(model);',ctx);assert.equal(vm.runInContext('JSON.stringify(model)',ctx),prepared);
 console.log('PASS '+name+': '+parts.length+' components first; original electrical endpoints, wires, IDs, routing and layout version preserved.');
}
