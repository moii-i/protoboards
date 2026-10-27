const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
fs.mkdirSync('work/qa',{recursive:true});
const base=process.env.PROTOBOARD_QA_URL||'http://127.0.0.1:4173';
const log=fs.openSync('work/qa/native-external-wires-browser.log','w'),browser=spawn(process.env.PROTOBOARD_CHROME||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':'google-chrome'),['--headless=new','--no-sandbox','--disable-crash-reporter','--no-first-run','--no-default-browser-check','--remote-debugging-port=9280','--user-data-dir='+path.resolve('work/chrome-native-external-wires-qa'),'about:blank'],{windowsHide:true,stdio:['ignore',log,log]});
async function main(){
 let targets;for(let i=0;i<50;i++){try{targets=await(await fetch('http://127.0.0.1:9280/json/list',{signal:AbortSignal.timeout(500)})).json();break;}catch{}await new Promise(r=>setTimeout(r,200));}assert(targets,'No browser debug connection');
 const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});let id=0;const pending=new Map(),errors=[],failed=[];
 ws.onmessage=e=>{const r=JSON.parse(e.data);if(pending.has(r.id)){const p=pending.get(r.id);pending.delete(r.id);clearTimeout(p.timer);r.error?p.reject(Error(JSON.stringify(r.error))):p.resolve(r.result);}if(r.method==='Runtime.exceptionThrown')errors.push(r.params.exceptionDetails);if(r.method==='Network.responseReceived'&&r.params.response.status>=400&&!r.params.response.url.endsWith('/favicon.ico'))failed.push({url:r.params.response.url,status:r.params.response.status});};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const seq=++id,timer=setTimeout(()=>{pending.delete(seq);reject(Error('CDP timeout '+method));},30000);pending.set(seq,{resolve,reject,timer});ws.send(JSON.stringify({id:seq,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 const waitFor=async expression=>{for(let i=0;i<100;i++){if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timed out: '+expression);};
 const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('work/qa/'+name+'.png',Buffer.from(r.data,'base64'));};
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');


 const results=[];
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await send('Page.addScriptToEvaluateOnNewDocument',{source:"sessionStorage.setItem('protoboards:welcome:v1','1');"});
 for(const variant of ['ls151','ls151-compacto']){
  await send('Page.navigate',{url:base+'/puerta?montaje='+variant});await waitFor("Boolean(window.componentAssembly)&&Boolean(window.doorStudio)");
  await evaluate("motionEnabled=true;synchronizeMotion();document.querySelector('#studioAuto').checked=false;document.querySelector('#studioAuto').dispatchEvent(new Event('change',{bubbles:true}));selectStep(0,false,{guided:false});");
  const ids=await evaluate("model.items.filter(it=>it.externalLead).map(it=>it.id)");assert.equal(ids.length,17);
  assert.equal(await evaluate("document.querySelectorAll('#map .external-wire').length"),17);
  assert.equal(await evaluate("document.querySelectorAll('#map .external-control [data-external-cable]').length"),0,'No embedded duplicate cables');
  const beforeMarks=await evaluate("JSON.stringify([...marked].sort())");
  const standard=await evaluate("setRenderer('3d')");await waitFor("rendererMode==='3d'&&Boolean(board3d)");
  await evaluate("selectCable('W001',{follow:false,scroll:false});");const widths=await evaluate("board3d.diagnostics().selection.widths");
  for(const id of ids){
   // Use the real ledger and its ordinary selection handler.
   await evaluate("setRenderer('2d');selectStep(model.items.find(it=>it.id==="+JSON.stringify(id)+").stage,false,{guided:false});document.querySelector('[data-inspect=\""+id+"\"]').click();doorStudio.seek(.46);");
   assert.equal(await evaluate("selected"),id);assert.equal(await evaluate("doorStudio.getState().animation.id"),id);
   const svg=await evaluate("(()=>{const p=document.querySelector('#map .connection[data-id=\""+id+"\"] .colored-wire'),o=document.querySelector('.studio-assembly-overlay'),f=(.46-.22)/.56,k=f*f*(3-2*f),e=p.getPointAtLength(p.getTotalLength()*k),actual=o.dataset.tip.split(',').map(Number);return {selected:p.closest('.connection').classList.contains('selected'),error:Math.hypot(e.x-actual[0],e.y-actual[1]),outline:o.querySelector('path').getAttribute('stroke'),start:[p.getPointAtLength(0).x,p.getPointAtLength(0).y],expected:point(model.items.find(it=>it.id==="+JSON.stringify(id)+").a)}})()");
   assert(svg.selected);assert(svg.error<.01);assert.equal(svg.outline,'#173e33');assert.deepEqual(svg.start,svg.expected);
   await evaluate("setRenderer('3d');");await waitFor("rendererMode==='3d'");
   await evaluate("doorStudio.seek(.46);");
   const d=await evaluate("board3d.diagnostics()");
   assert.equal(d.selection.id,id);assert(d.selection.visible);assert.deepEqual(d.selection.widths,widths);assert.equal(d.selection.depthTest,false);assert(d.studio.reveal.tipError<1e-5,JSON.stringify(d.studio.reveal));
   assert(d.studio.reveal.visibleSegments>0&&d.studio.reveal.visibleSegments<d.studio.reveal.segments);
   assert(Math.hypot(...d.selection.curveA.map((v,i)=>v-d.endpoints[id].worldA[i]))<1e-5);assert(Math.hypot(...d.selection.curveB.map((v,i)=>v-d.endpoints[id].worldB[i]))<1e-5);
   const frozen=await evaluate("doorStudio.getState().animation.progress");await new Promise(r=>setTimeout(r,60));assert.equal(await evaluate("doorStudio.getState().animation.progress"),frozen);
   // The normal toolbar, rather than a separate external-wire player, owns motion.
   if(id==='EXT_ABRIR_1'||id==='EXT_MOTOR_1'){
    await evaluate("document.querySelector('[data-studio-action=play]').click();");await waitFor("doorStudio.getState().animation.progress>.18");
    await evaluate("document.querySelector('[data-studio-action=pause]').click();");
    const paused=await evaluate("doorStudio.getState().animation.progress");await new Promise(r=>setTimeout(r,150));assert.equal(await evaluate("doorStudio.getState().animation.progress"),paused);
    await evaluate("document.querySelector('[data-studio-action=pause]').click();");await waitFor("doorStudio.getState().animation.progress>"+(paused+.04));
    await evaluate("doorStudio.seek(1);");
    assert(await evaluate("board3d.diagnostics().selection.visible"));
    await evaluate("framing='cable';view='focus';setCamera();board3d.preset('iso');");await waitFor("!board3d.diagnostics().moving");
    if(!await evaluate("document.body.classList.contains('fullscreen')"))await evaluate("document.querySelector('#expand').click();");
    await waitFor("!board3d.diagnostics().moving");const beforeDoor=await evaluate('JSON.stringify(door)');await evaluate("isolateWires=true;sync3d();");const target=await evaluate('board3d.diagnostics().targets.wires['+JSON.stringify(id)+']');await send('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,x:target[0],y:target[1]});await send('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,x:target[0],y:target[1]});assert.equal(await evaluate('selected'),id);assert.equal(await evaluate('JSON.stringify(door)'),beforeDoor);assert(await evaluate('board3d.diagnostics().selection.visible'));await evaluate("isolateWires=false;sync3d();");await shot('native-'+variant+'-'+id);
    await evaluate("document.querySelector('#closeExpanded').click();");
   }
   await evaluate("doorStudio.seek(1);motionEnabled=false;synchronizeMotion();board3d.rotate(1);");
   const end=await evaluate("board3d.diagnostics().selection");assert(end.visible);assert.equal(end.id,id);assert.deepEqual(end.widths,widths);
   await evaluate("motionEnabled=true;synchronizeMotion();");
  }
  assert.equal(await evaluate("JSON.stringify([...marked].sort())"),beforeMarks);
  await evaluate("selectStep(0,false,{guided:false});setRenderer('2d');");assert.equal(await evaluate("document.querySelectorAll('#map .external-wire:not(.hidden)').length"),0);
  results.push({variant,cables:17,controls:15,motor:2,nativeSelection:true,normalPlayPause:true,exact2DPath:true,exact3DOutline:true,persistentOutline:true,marksUnchanged:true});console.log(JSON.stringify(results.at(-1)));
 }
 assert.equal(errors.length,0,JSON.stringify(errors));assert.equal(failed.length,0,JSON.stringify(failed));
 fs.writeFileSync('work/qa/native-external-wires-results.json',JSON.stringify({base,results,errors,failed},null,2));console.log(JSON.stringify({pass:true,results}));ws.close();

}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{browser.kill();fs.closeSync(log);});
