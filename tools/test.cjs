const {spawnSync}=require('node:child_process');const fs=require('node:fs');fs.mkdirSync('work/qa',{recursive:true});
const commands=[['verify-components-first.cjs'],['verify-door-lesson.cjs'],['verify-door-ls151.cjs'],['protoboard-ah/verify-door.cjs'],['verify-door-ls.cjs'],['verify-door-sinuln.cjs'],['verify-door-redes.cjs']];
for(const variant of [['--ls151'],['--ls151-compacto'],[],['--ls'],['--sinuln'],['--redes']])for(const script of ['verify-door-layout.cjs','verify-door-routing.cjs','verify-door-guide.mjs','verify-door-3d.mjs']){if(!script.includes('layout')||!variant[0]?.startsWith('--ls151'))commands.push([script,...variant]);}
// The 3D geometry fixtures share a generated module: run sequentially.
for(const args of commands){console.log('\n'+args.join(' '));const r=spawnSync(process.execPath,args,{stdio:'inherit'});if(r.status!==0)process.exit(r.status||1);}
