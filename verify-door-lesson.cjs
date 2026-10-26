const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),crypto=require('crypto');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync('protoboard-ah/puerta-signal-logic.js','utf8'),ctx);
for(let mask=0;mask<32;mask++){
 const [A,C,S,PA,PC]=[0,1,2,3,4].map(i=>(mask>>i)&1),input={abrir:A,cerrar:C,stop:S,fca:!PA,fcc:!PC},v=ctx.window.DoorSignalLogic.evaluate(input);
 const mux=[0,PA,PC,0][A+2*C],m=S?0:mux;assert.equal(v.M,m);assert.equal(v.NY,1-m);assert.equal(v.STOP,S);assert.equal(v.PA,PA);assert.equal(v.PC,PC);assert.equal(v.MA+v.MC,m);assert(!(v.MA&&v.MC));
 assert(Object.values(ctx.window.DoorSignalLogic.evaluate(input,false)).every(x=>x===null));
}
const hash=b=>crypto.createHash('sha256').update(b).digest('hex'),manifest=JSON.parse(fs.readFileSync('protoboard-ah/montajes-pdf.json','utf8'));const textHash=b=>hash(Buffer.from(b.toString('utf8').replace(/\r\n/g,'\n')));assert.equal(manifest.generatorHash,textHash(fs.readFileSync(manifest.generator)));
for(const [variant,entry]of Object.entries(manifest.variants)){
 const bytes=fs.readFileSync('protoboard-ah/'+entry.file);assert.equal(bytes.subarray(0,5).toString(),'%PDF-');assert.equal(hash(bytes),entry.sha256);assert(entry.pages>=3&&entry.pages<=20);assert.equal(textHash(Buffer.concat(entry.sourceFiles.map(f=>fs.readFileSync('protoboard-ah/'+f)))),entry.sourceHash,'Regenerate stale PDF '+variant);
 const context={window:{}};vm.runInNewContext(fs.readFileSync('protoboard-ah/'+entry.sourceFiles[1],'utf8')+';window.m=model;',context);assert.equal(context.window.m.items.length,entry.connections);
}
assert.equal(Object.keys(manifest.variants).length,6);console.log('PASS: 32 signal truth cases, powered-off state, six PDF source hashes and matching variant connection counts.');
