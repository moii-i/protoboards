const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
fs.mkdirSync('work/qa',{recursive:true});
const base=process.env.PROTOBOARD_QA_URL||'http://127.0.0.1:4173';
const log=fs.openSync('work/qa/external-controls-browser.log','w'),browser=spawn(process.env.PROTOBOARD_CHROME||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':'google-chrome'),['--headless=new','--no-sandbox','--disable-crash-reporter','--no-first-run','--no-default-browser-check','--remote-debugging-port=9270','--user-data-dir='+path.resolve('work/chrome-external-controls-qa'),'about:blank'],{windowsHide:true,stdio:['ignore',log,log]});
async function main(){
 let targets;for(let i=0;i<50;i++){try{targets=await(await fetch('http://127.0.0.1:9270/json/list',{signal:AbortSignal.timeout(500)})).json();break;}catch{}await new Promise(r=>setTimeout(r,200));}assert(targets,'No browser debug connection');
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
  await send('Page.navigate',{url:base+'/puerta?montaje='+variant});await waitFor('Boolean(window.doorLesson)&&Boolean(window.protoboardsDesign)');
  await evaluate("motionEnabled=false;synchronizeMotion();setRenderer('2d');protoboardsDesign.openTools('view');");
  const marked=await evaluate("JSON.stringify({marked:[...marked],completed:[...completed]})");
  await evaluate("document.querySelector('[data-view=controls]').click();protoboardsDesign.closeTools();document.querySelector('.map-stage').scrollIntoView({block:'center',behavior:'instant'});");
  await waitFor("view==='controls'&&step===2");
  assert.equal(await evaluate("document.querySelectorAll('.external-control[data-control-model=scmm-122]').length"),3);
  assert.equal(await evaluate("document.querySelectorAll('.external-control[data-control-model=ss0501a]').length"),2);
  assert.equal(await evaluate("document.querySelectorAll('[data-control-slider]').length"),3);
  assert.equal(await evaluate("document.querySelectorAll('[data-control-lever]').length"),2);
  await evaluate("document.querySelector('#expand').click();");await shot('external-controls-'+variant+'-2d');
  await evaluate("setRenderer('3d');");await waitFor("rendererMode==='3d'&&Boolean(protoboard3D.diagnostics()?.externalControls?.length===5)");
  const d=await evaluate("protoboard3D.diagnostics()");
  assert.equal(d.externalControls.filter(c=>c.model==='scmm-122').length,3);assert.equal(d.externalControls.filter(c=>c.model==='ss0501a').length,2);
  for(const c of d.externalControls){assert(c.bounds[1]>750);assert.equal(c.connections.length,3);}
  await shot('external-controls-'+variant+'-3d');
  // Actuate the actual 3D slide and verify its mechanical pose and electrical command.
  await evaluate("selectStep(LAST,false,{guided:false});view='controls';setCamera();updateDemo();");
  await waitFor("protoboard3D.diagnostics().externalControls.some(c=>c.id==='ABRIR'&&!c.actuated)");
  const before=await evaluate("({pose:protoboard3D.diagnostics().externalControls.find(c=>c.id==='ABRIR').actuator,door:{...door}})");
  const target=await evaluate("(()=>{const p=protoboard3D.diagnostics().targets.switches[0];return {x:p[0],y:p[1]}})()");
  await send('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...target});
  await send('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,...target});
  await waitFor("door.abrir===true&&protoboard3D.diagnostics().externalControls.find(c=>c.id==='ABRIR').actuated");
  const after=await evaluate("protoboard3D.diagnostics().externalControls.find(c=>c.id==='ABRIR').actuator");
  assert(after[0]>before.pose[0]+1.4);
  // STOP, both limit levers and the SVG share the existing controller.
  await evaluate("document.querySelector('[data-door=stop]').click();document.querySelector('[data-door=fca]').click();");
  assert(await evaluate("protoboard3D.diagnostics().externalControls.find(c=>c.id==='STOP').actuated"));
  assert(await evaluate("protoboard3D.diagnostics().externalControls.find(c=>c.id==='FCA').actuated"));
  await evaluate("document.querySelector('[data-door=reset]').click();if(power)togglePower();setRenderer('2d');view='controls';setCamera();");
  const svgTarget=await evaluate("(()=>{const n=document.querySelector('[data-id=P_STOP] [data-external-actuator]');const r=n.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()");
  await send('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...svgTarget});
  await send('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,...svgTarget});
  await waitFor("door.stop===true&&document.querySelector('[data-control-slider=STOP]').dataset.actuated==='true'");
  assert.equal(await evaluate("JSON.stringify({marked:[...marked],completed:[...completed]})"),marked);
  await evaluate("document.querySelector('#closeExpanded').click();if(power)togglePower();");
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await evaluate("document.querySelector('.external-controls-note').open=true;document.querySelector('.external-controls-note').scrollIntoView({block:'start',behavior:'instant'});");
  assert(await evaluate("document.documentElement.scrollWidth<=innerWidth+2"));
  await shot('external-controls-'+variant+'-mobile');
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  results.push({variant,externalBodies:5,physicalLeads:15,slideActuation:true,leverActuation:true,svgActuation:true,progressPreserved:true,mobile:true});
 }
 assert.equal(errors.length,0,JSON.stringify(errors));assert.equal(failed.length,0,JSON.stringify(failed));
 fs.writeFileSync('work/qa/external-controls-browser-results.json',JSON.stringify({base,results,errors,failed},null,2));
 console.log(JSON.stringify({pass:true,results,errors:errors.length,failed:failed.length}));ws.close();
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{browser.kill();fs.closeSync(log);});
