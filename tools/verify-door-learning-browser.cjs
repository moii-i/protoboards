const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
fs.mkdirSync('work/qa',{recursive:true});
const base=process.env.PROTOBOARD_QA_URL||'http://127.0.0.1:4173';
const log=fs.openSync('work/qa/browser-polish.log','w'),browser=spawn(process.env.PROTOBOARD_CHROME||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':'google-chrome'),['--headless=new','--no-sandbox','--disable-crash-reporter','--no-first-run','--no-default-browser-check','--remote-debugging-port=9247','--user-data-dir='+path.resolve('work/chrome-learning-qa'),'about:blank'],{windowsHide:true,stdio:['ignore',log,log]});
async function main(){
 let targets;for(let i=0;i<50;i++){try{targets=await(await fetch('http://127.0.0.1:9247/json/list',{signal:AbortSignal.timeout(500)})).json();break;}catch{}await new Promise(r=>setTimeout(r,200));}assert(targets,'No browser debug connection');
 const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});let id=0;const pending=new Map(),errors=[],failed=[];
 ws.onmessage=e=>{const r=JSON.parse(e.data);if(pending.has(r.id)){const p=pending.get(r.id);pending.delete(r.id);clearTimeout(p.timer);r.error?p.reject(Error(JSON.stringify(r.error))):p.resolve(r.result);}if(r.method==='Runtime.exceptionThrown')errors.push(r.params.exceptionDetails);if(r.method==='Network.responseReceived'&&r.params.response.status>=400&&!r.params.response.url.endsWith('/favicon.ico'))failed.push({url:r.params.response.url,status:r.params.response.status});};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const seq=++id,timer=setTimeout(()=>{pending.delete(seq);reject(Error('CDP timeout '+method));},30000);pending.set(seq,{resolve,reject,timer});ws.send(JSON.stringify({id:seq,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 const waitFor=async expression=>{for(let i=0;i<100;i++){if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timed out: '+expression);};
 const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('work/qa/'+name+'.png',Buffer.from(r.data,'base64'));};
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');



 const results=[],delay=ms=>new Promise(r=>setTimeout(r,ms));
 for(const variant of ['ls151','ls151-compacto']){
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await send('Page.navigate',{url:base+'/puerta?montaje='+variant});await waitFor('Boolean(window.doorLearning)');
  await evaluate("document.querySelector('.brand-intro')?.remove();motionEnabled=true;synchronizeMotion();document.querySelector('[data-studio-speed]').value='1';document.querySelector('[data-studio-speed]').onchange();setRenderer('2d');");
  const marked=await evaluate('doorGuide.getState().marked');
  await evaluate("doorStudio.inspect('U1',1);");
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'k',code:'KeyK',modifiers:2});
  assert(await evaluate("document.querySelector('#learningDialog').open"),'Ctrl+K opens tools while inspecting');
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});
  assert(await evaluate("!document.querySelector('#learningDialog').open"),'Escape closes tools before the underlying inspector or fullscreen');
  await evaluate("doorStudio.closeInspector();");

  await evaluate("document.querySelector('#learningOpen').click();document.querySelector('#learnQuery').value='U1.11';document.querySelector('#learnQuery').oninput();");
  assert.equal(await evaluate("document.querySelectorAll('#learnResults button').length"),1);
  assert((await evaluate("document.querySelector('#learnResults').textContent")).includes('ABRIR'));
  await evaluate("document.querySelector('#learnResults button').click();");await delay(700);
  assert.equal(await evaluate("doorStudio.getState().pin"),11);assert.equal(await evaluate("doorStudio.getState().chip"),'U1');
  await evaluate("doorStudio.closeInspector();doorLearning.open('search');document.querySelector('#learnQuery').value='R13';document.querySelector('#learnQuery').oninput();");
  assert(await evaluate("document.querySelector('#learnResults button').dataset.result==='component:R13'"));
  await evaluate("document.querySelector('#learnQuery').value='NOT_A_REAL_PART';document.querySelector('#learnQuery').oninput();");
  assert.equal(await evaluate("document.querySelectorAll('#learnResults button').length"),0);
  await evaluate("document.querySelector('#learnQuery').value='NY';document.querySelector('#learnQuery').oninput();document.querySelector('[data-result=\"signal:NY\"]').click();");
  assert(await evaluate("model.items.find(x=>x.id===selected).signal==='NY'"));
  await evaluate("doorLearning.open('pieces');document.querySelector('#learnComponent').value='U4';document.querySelector('#learnComponent').onchange();document.querySelector('#learnPlace').click();");
  await waitFor("doorLearning.getState().placement?.progress>.34");await evaluate("doorLearning.pause();");
  const p=await evaluate("doorLearning.getState().placement");assert(p.progress<1);
  assert.equal(await evaluate("document.querySelectorAll('.learning-guides circle').length"),8);
  assert(await evaluate("document.querySelector('[data-chip=U4]').classList.contains('learning-part-hidden')"));
  await delay(180);assert.equal(await evaluate("doorLearning.getState().placement.progress"),p.progress);
  await delay(650);await shot('learning-'+variant+'-placement-2d');
  await evaluate("document.querySelector('#expand').click();setRenderer('3d');");await waitFor("rendererMode==='3d'&&Boolean(board3d)");await delay(800);
  const pose=await evaluate("board3d.diagnostics().studio.placement");assert.equal(pose.id,'U4');assert.equal(pose.progress,p.progress);assert.equal(pose.holes.length,8);assert(pose.height>0&&pose.height<5.5);
  assert(await evaluate("document.querySelector('#assemblyIsland').getBoundingClientRect().height<180"));
  await shot('learning-'+variant+'-placement-3d');
  await evaluate("doorLearning.pause();");await waitFor("doorLearning.getState().placement.progress===1");
  assert.equal(await evaluate("board3d.diagnostics().studio.placement.height"),0);
  await evaluate("doorLearning.place('C4');");assert((await evaluate("document.querySelector('#learnPlacementNote').textContent")).includes('positivo'));
  await evaluate("doorLearning.place('D1');");assert.equal(await evaluate("doorLearning.getState().catalog.find(c=>c.id==='D1').holes.length"),10);
  await evaluate("selectStep(1,false,{guided:false});");
  assert.equal(await evaluate("doorLearning.getState().placement"),null);
  assert.equal(await evaluate("board3d.diagnostics().studio.placement"),null);
  assert.deepEqual(await evaluate("doorGuide.getState().marked"),marked);
  await evaluate("doorLearning.open('review');document.querySelector('#learnReviewReset').click();document.querySelector('#learnReview input').click();");
  assert((await evaluate("document.querySelector('.learning-review-count').textContent")).startsWith('1 /'));
  await shot('learning-'+variant+'-checks');
  await evaluate("doorLearning.close();window.qaReloadToken=true;");await send('Page.reload');await waitFor("Boolean(window.doorLearning)&&!window.qaReloadToken");
  await evaluate("doorLearning.open('review');");assert(await evaluate("document.querySelector('#learnReview input').checked"));assert.deepEqual(await evaluate("doorGuide.getState().marked"),marked);
  await evaluate("document.querySelector('#learnReviewReset').click();doorLearning.close();motionEnabled=true;synchronizeMotion();doorLearning.place('U1');");
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await delay(100);
  await waitFor("motionQuery.matches&&doorLearning.getState().placement.progress===1");assert(await evaluate("document.querySelector('#learnReplay').disabled"));
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await evaluate("doorLearning.cancel();doorLearning.open('search');document.querySelector('#learnQuery').value='NE555';document.querySelector('#learnQuery').oninput();");await delay(200);
  assert(await evaluate("document.documentElement.scrollWidth<=innerWidth+2"));
  assert(await evaluate("document.querySelector('#learningDialog').getBoundingClientRect().width<=innerWidth"));
  await shot('learning-'+variant+'-search-mobile');
  await evaluate("doorLearning.close();doorLearning.place('R13');");await delay(800);await shot('learning-'+variant+'-placement-mobile');
  assert(await evaluate("document.documentElement.scrollWidth<=innerWidth+2"));
  results.push({variant,searchPin:true,searchComponent:true,signal:true,emptySearch:true,placement2D:true,placement3D:true,pause:true,noAutomaticMarking:true,reviewPersistence:true,reducedMotion:true,mobile:true});
 }
 for(const variant of ['comunes','ls','sinuln','redes']){
  await send('Page.navigate',{url:base+'/puerta?montaje='+variant});await waitFor('Boolean(window.doorLearning)');
  assert((await evaluate("doorLearning.find('U1').length"))>0);await evaluate("doorLearning.place('U1');");await delay(80);await evaluate("doorLearning.cancel();doorLearning.open('review');");
 }
 assert.equal(errors.length,0,JSON.stringify(errors));assert.equal(failed.length,0,JSON.stringify(failed));fs.writeFileSync('work/qa/learning-browser-results.json',JSON.stringify({base,results,errors,failed},null,2));console.log(JSON.stringify({pass:true,base,results,errors:errors.length,failed:failed.length}));ws.close();
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{browser.kill();fs.closeSync(log);});
