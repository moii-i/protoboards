const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
fs.mkdirSync('work/qa',{recursive:true});
const base=process.env.PROTOBOARD_QA_URL||'http://127.0.0.1:4173';
const log=fs.openSync('work/qa/components-first-browser.log','w'),browser=spawn(process.env.PROTOBOARD_CHROME||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':'google-chrome'),['--headless=new','--no-sandbox','--disable-crash-reporter','--no-first-run','--no-default-browser-check','--remote-debugging-port=9275','--user-data-dir='+path.resolve('work/chrome-components-first-qa'),'about:blank'],{windowsHide:true,stdio:['ignore',log,log]});
async function main(){
 let targets;for(let i=0;i<50;i++){try{targets=await(await fetch('http://127.0.0.1:9275/json/list',{signal:AbortSignal.timeout(500)})).json();break;}catch{}await new Promise(r=>setTimeout(r,200));}assert(targets,'No browser debug connection');
 const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});let id=0;const pending=new Map(),errors=[],failed=[];
 ws.onmessage=e=>{const r=JSON.parse(e.data);if(pending.has(r.id)){const p=pending.get(r.id);pending.delete(r.id);clearTimeout(p.timer);r.error?p.reject(Error(JSON.stringify(r.error))):p.resolve(r.result);}if(r.method==='Runtime.consoleAPICalled'&&['warning','error'].includes(r.params.type))console.error(JSON.stringify(r.params.args.map(a=>a.value||a.description)));if(r.method==='Runtime.exceptionThrown')errors.push(r.params.exceptionDetails);if(r.method==='Network.responseReceived'&&r.params.response.status>=400&&!r.params.response.url.endsWith('/favicon.ico'))failed.push({url:r.params.response.url,status:r.params.response.status});};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const seq=++id,timer=setTimeout(()=>{pending.delete(seq);reject(Error('CDP timeout '+method));},30000);pending.set(seq,{resolve,reject,timer});ws.send(JSON.stringify({id:seq,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 const waitFor=async expression=>{for(let i=0;i<100;i++){if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timed out: '+expression+' '+JSON.stringify(await evaluate("({renderer:rendererMode,message:document.querySelector('#threeStatus')?.textContent})")));};
 const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('work/qa/'+name+'.png',Buffer.from(r.data,'base64'));};
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');


 const results=[];
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await send('Page.addScriptToEvaluateOnNewDocument',{source:"sessionStorage.setItem('protoboards:welcome:v1','1');"});
 for(const route of ['/', '/555',...['ls151','ls151-compacto','sinuln','ls','comunes','redes'].map(v=>'/puerta?montaje='+v)].filter(r=>!process.env.PROTOBOARD_ONLY||r===process.env.PROTOBOARD_ONLY)){
  await send('Page.navigate',{url:base+route});await waitFor("Boolean(window.componentAssembly)");
  await evaluate("motionEnabled=true;synchronizeMotion();selectStep(0,false,{guided:false});setRenderer('2d');");
  const state=await evaluate("componentAssembly.getState()");assert(state.parts.length>0);assert(state.parts.every(c=>c.registered),JSON.stringify(state.parts.filter(c=>!c.registered)));
  assert(await evaluate("model.items.filter(it=>!ComponentAssembly.isWire(it)).every(it=>it.stage===0)"));
  assert.equal(await evaluate("document.querySelectorAll('#map .connection:not(.part):not(.hidden)').length"),0);
  const originalMarks=await evaluate("JSON.stringify([...marked].sort())");
  const passive=state.parts.findIndex(c=>['res','cap','led'].includes(c.kind));
  await evaluate("componentAssembly.seek("+passive+",0);");
  assert(await evaluate("componentAssembly.getState().pose.progress===0"));
  const moved2D=await evaluate("document.querySelector('[data-assembly-id=\"'+componentAssembly.getState().parts["+passive+"].id+'\"]').getAttribute('transform')");
  assert(moved2D.includes('-90'));
  await evaluate("setRenderer('3d');");await waitFor("rendererMode==='3d'&&Boolean(board3d?.diagnostics().componentAssembly)");
  const d0=await evaluate("board3d.diagnostics().componentAssembly");assert.equal(d0.components.length,state.parts.length,route);
  const c0=d0.components.find(c=>c.id===state.parts[passive].id);assert(c0.position[1]>c0.home[1]+5.4);
  await evaluate("componentAssembly.seek("+passive+",1);");
  const d1=await evaluate("board3d.diagnostics().componentAssembly");const c1=d1.components.find(c=>c.id===c0.id);assert.equal(c1.position[1],c1.home[1]);
  await evaluate("componentAssembly.seek(0,.3);componentAssembly.pause();");await new Promise(r=>setTimeout(r,120));await evaluate("componentAssembly.pause();");
  await evaluate("selectStep(1,false,{guided:false});document.querySelector('#cumulative').checked=false;visibility();");
  assert(await evaluate("stageItems().every(ComponentAssembly.isWire)&&navigationItems().every(ComponentAssembly.isWire)"));
  assert(await evaluate("componentAssembly.getState().pose===null&&board3d.diagnostics().componentAssembly.components.every(c=>c.visible)"));
  assert.equal(await evaluate("JSON.stringify([...marked].sort())"),originalMarks);
  if(route.includes('ls151')){
   await evaluate("componentAssembly.seek(7,.35,'leads');");
   const a=await evaluate("board3d.diagnostics().externalControls.flatMap(c=>c.cables)");
   assert.equal(a.filter(c=>c.visible).length,15);assert(a[7].drawCount>0&&a[7].progress===.35);
   await evaluate("componentAssembly.seek(7,.75,'leads');");
   const b=await evaluate("board3d.diagnostics().externalControls.flatMap(c=>c.cables)");assert(b[7].drawCount>a[7].drawCount);assert.notDeepEqual(b[7].tip,a[7].tip);
   await evaluate("setRenderer('2d');componentAssembly.seek(7,.5,'leads');");
   assert(await evaluate("document.querySelector('.studio-assembly-overlay')?.dataset.reveal>0"));
   await evaluate("document.querySelector('#expand').click();");await shot(route.includes('compacto')?'components-compact-external-leads':'components-ls151-external-leads');await evaluate("setRenderer('3d');");await waitFor("rendererMode==='3d'&&!board3d.diagnostics().moving");await shot(route.includes('compacto')?'components-compact-external-leads-3d':'components-ls151-external-leads-3d');await evaluate("componentAssembly.cancel();selectStep(0,false,{guided:false});componentAssembly.seek(7,.45);");await waitFor("!board3d.diagnostics().moving");await shot(route.includes('compacto')?'components-compact-placement-3d':'components-ls151-placement-3d');await evaluate("document.querySelector('#closeExpanded').click();");
  }
  await evaluate("componentAssembly.cancel();selectStep(0,false,{guided:false});setRenderer('2d');");
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  assert(await evaluate("document.documentElement.scrollWidth<=innerWidth+2"),route);
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await evaluate("componentAssembly.play();");assert(await evaluate("componentAssembly.getState().pose===null"));
  await send('Emulation.setEmulatedMedia',{features:[]});
  // Replay preserves legacy wire and part marks and the physical board layout.
  const seed=await evaluate("({key:stateKey,value:{layoutVersion:model.layoutVersion,marked:[model.items.find(ComponentAssembly.isWire).id,model.items.find(it=>!ComponentAssembly.isWire(it)).id],completed:[0],step:0,renderer:'2d',motion:true}})");
  const token='seed-'+Math.random();const injected=await send('Page.addScriptToEvaluateOnNewDocument',{source:'localStorage.setItem('+JSON.stringify(seed.key)+','+JSON.stringify(JSON.stringify(seed.value))+');window.__assemblySeed='+JSON.stringify(token)+';'});
  await send('Page.reload');await waitFor('window.__assemblySeed==='+JSON.stringify(token)+'&&Boolean(window.componentAssembly)');await send('Page.removeScriptToEvaluateOnNewDocument',{identifier:injected.identifier});
  assert.deepEqual((await evaluate("[...marked]")).sort(),seed.value.marked.sort());assert(await evaluate("componentAssembly.getState().parts.filter(p=>!model.items.some(it=>it.id===p.id||it.partId===p.id)).every(p=>p.confirmed)"));
  results.push({route,parts:state.parts.length,allRegistered:true,onlyWiresAfterPlacement:true,pose2D3D:true,mobile:true,reducedMotion:true,progressPreserved:true});console.log(JSON.stringify(results.at(-1)));
 }
 assert.equal(errors.length,0,JSON.stringify(errors));assert.equal(failed.length,0,JSON.stringify(failed));
 fs.writeFileSync('work/qa/components-first-results.json',JSON.stringify({base,results,errors,failed},null,2));console.log(JSON.stringify({pass:true,results,errors:errors.length,failed:failed.length}));ws.close();

}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{browser.kill();fs.closeSync(log);});
