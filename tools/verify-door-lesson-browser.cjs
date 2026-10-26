const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
fs.mkdirSync('work/qa',{recursive:true});
const base=process.env.PROTOBOARD_QA_URL||'http://127.0.0.1:4173';
const log=fs.openSync('work/qa/browser-polish.log','w'),browser=spawn(process.env.PROTOBOARD_CHROME||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':'google-chrome'),['--headless=new','--no-sandbox','--disable-crash-reporter','--no-first-run','--no-default-browser-check','--remote-debugging-port=9253','--user-data-dir='+path.resolve('work/chrome-lesson-qa'),'about:blank'],{windowsHide:true,stdio:['ignore',log,log]});
async function main(){
 let targets;for(let i=0;i<50;i++){try{targets=await(await fetch('http://127.0.0.1:9253/json/list',{signal:AbortSignal.timeout(500)})).json();break;}catch{}await new Promise(r=>setTimeout(r,200));}assert(targets,'No browser debug connection');
 const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});let id=0;const pending=new Map(),errors=[],failed=[];
 ws.onmessage=e=>{const r=JSON.parse(e.data);if(pending.has(r.id)){const p=pending.get(r.id);pending.delete(r.id);clearTimeout(p.timer);r.error?p.reject(Error(JSON.stringify(r.error))):p.resolve(r.result);}if(r.method==='Runtime.exceptionThrown')errors.push(r.params.exceptionDetails);if(r.method==='Network.responseReceived'&&r.params.response.status>=400&&!r.params.response.url.endsWith('/favicon.ico'))failed.push({url:r.params.response.url,status:r.params.response.status});};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const seq=++id,timer=setTimeout(()=>{pending.delete(seq);reject(Error('CDP timeout '+method));},30000);pending.set(seq,{resolve,reject,timer});ws.send(JSON.stringify({id:seq,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 const waitFor=async expression=>{for(let i=0;i<100;i++){if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timed out: '+expression);};
 const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('work/qa/'+name+'.png',Buffer.from(r.data,'base64'));};
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');




 const results=[],delay=ms=>new Promise(r=>setTimeout(r,ms));
 for(const variant of ['ls151','ls151-compacto','sinuln']){
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await send('Page.navigate',{url:base+'/puerta?montaje='+variant});await waitFor('Boolean(window.doorLesson)');
  await evaluate("document.querySelector('.brand-intro')?.remove();setRenderer('2d');localStorage.removeItem('protoboard:cards:signals:v1');localStorage.removeItem('protoboard:cards:placement:v1');selectStep(LAST,false,{guided:false});power=false;Object.assign(door,{abrir:false,cerrar:false,stop:false,fca:false,fcc:true,direction:0,position:0});updateDemo();doorLesson.enable(true);");
  assert.equal(await evaluate("document.querySelector('#lessonValue').textContent"),'—');
  const marked=await evaluate('doorGuide.getState().marked');
  await evaluate("document.querySelector('#lessonPower').click();document.querySelector('[data-lesson-door=abrir]').click();");
  assert.equal(await evaluate('doorLesson.getState().signals.M'),1);assert.equal(await evaluate('doorLesson.getState().signals.NY'),0);
  assert.equal(await evaluate("document.querySelector('#lessonValue').textContent"),'1');assert(await evaluate("document.querySelectorAll('#lesson-signal-paths>g').length>0"));
  const colors=await evaluate("(()=>{const ids=doorLesson.getState().snapshot.ids;return ids.every(id=>document.querySelector('[data-signal-wire=\\\"'+id+'\\\"] path:last-child').getAttribute('stroke')===model.items.find(x=>x.id===id).color)})()");
  assert(colors,'Preserve the physical wire colors');
  if(variant.startsWith('ls151')){await evaluate("doorLesson.select('NY');");assert.equal(await evaluate("document.querySelector('#lessonValue').textContent"),'0');assert(await evaluate("indicators().leds.LY"));}
  await evaluate("document.querySelector('[data-lesson-door=stop]').click();doorLesson.select('STOP');");assert.equal(await evaluate("document.querySelector('#lessonValue').textContent"),'1');assert.equal(await evaluate('doorLesson.getState().signals.M'),0);
  await shot('lesson-'+variant+'-stop-2d');
  await evaluate("document.querySelector('[data-lesson-door=stop]').click();doorLesson.select('M');");assert.equal(await evaluate('doorLesson.getState().signals.M'),1);
  await evaluate("document.querySelector('[data-lesson-door=fca]').click();");assert.equal(await evaluate('doorLesson.getState().signals.M'),0);assert.equal(await evaluate('doorMessage'),'OP');
  await evaluate("document.querySelector('[data-lesson-door=reset]').click();document.querySelector('[data-lesson-door=abrir]').click();document.querySelector('[data-lesson-door=cerrar]').click();");
  assert.equal(await evaluate('doorLesson.getState().signals.M'),0);
  await evaluate("document.querySelector('#expand').click();setRenderer('3d');doorLesson.select('PA');");await waitFor("rendererMode==='3d'&&Boolean(board3d)");await delay(800);
  let d=await evaluate('board3d.diagnostics().studio.signals');assert.equal(d.name,'PA');assert.equal(d.value,1);assert(d.ids.length>0);
  const builds=d.builds;await evaluate("document.querySelector('[data-lesson-door=fca]').click();");d=await evaluate('board3d.diagnostics().studio.signals');assert.equal(d.value,0);assert.equal(d.builds,builds,'Do not rebuild curves when only the bit changes');
  await shot('lesson-'+variant+'-signals-3d');
  const beforeFold=await evaluate("document.querySelector('#lessonSignalCard').getBoundingClientRect().height");
  await evaluate("document.querySelector('#lessonSignalCard [data-card-fold]').click();");assert(await evaluate("document.querySelector('#lessonSignalCard').getBoundingClientRect().height<"+(beforeFold-50)));
  await evaluate("document.querySelector('#lessonSignalCard [data-card-fold]').click();document.querySelector('#lessonSignalCard [data-card-reset]').click();");
  const rect=await evaluate("(()=>{const r=document.querySelector('#lessonSignalCard').getBoundingClientRect(),h=document.querySelector('#lessonSignalCard [data-card-move]').getBoundingClientRect();return {left:r.left,top:r.top,x:h.x+h.width/2,y:h.y+h.height/2}})()");
  await send('Input.dispatchMouseEvent',{type:'mousePressed',x:rect.x,y:rect.y,button:'left',buttons:1,clickCount:1});await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:rect.x+170,y:rect.y+65,button:'left',buttons:1});await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:rect.x+170,y:rect.y+65,button:'left',buttons:0,clickCount:1});
  assert(await evaluate("document.querySelector('#lessonSignalCard').getBoundingClientRect().left>"+(rect.left+100)),'Native card drag');
  await evaluate("doorLearning.place('U4');");await delay(100);
  await evaluate("if(document.querySelector('.learning-placement-card').classList.contains('lesson-card-folded'))document.querySelector('.learning-placement-card [data-card-fold]').click();");
  assert(await evaluate("!doorLesson.getState().enabled&&document.querySelector('#lessonSignalCard').hidden"),'Leaving the test clears signal mode to avoid overlapping placement');
  const placementHeight=await evaluate("document.querySelector('.learning-placement-card').getBoundingClientRect().height");await evaluate("document.querySelector('.learning-placement-card [data-card-fold]').click();");
  assert(await evaluate("document.querySelector('.learning-placement-card').getBoundingClientRect().height<"+placementHeight));
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await delay(300);
  assert(await evaluate("(()=>{const r=document.querySelector('.learning-placement-card').getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+1&&r.bottom<=innerHeight+1})()"));
  await shot('lesson-'+variant+'-mobile-card');
  await evaluate("doorLearning.cancel();doorLesson.enable(true);");await delay(200);assert(await evaluate("document.documentElement.scrollWidth<=innerWidth+2"));
  await shot('lesson-'+variant+'-mobile-signals');
  const pdf=await evaluate("(async()=>{const a=document.querySelector('#lessonPdf'),r=await fetch(a.href),b=new Uint8Array(await r.arrayBuffer());return {status:r.status,mime:r.headers.get('content-type'),signature:String.fromCharCode(...b.slice(0,5)),size:b.length,url:a.getAttribute('href')};})()");
  assert.equal(pdf.status,200);assert.equal(pdf.mime,'application/pdf');assert.equal(pdf.signature,'%PDF-');assert(pdf.url.includes(variant));
  assert.deepEqual(await evaluate('doorGuide.getState().marked'),marked);
  await evaluate("doorLesson.enable(false);");assert.equal(await evaluate("document.querySelector('#lesson-signal-paths').children.length"),0);assert.equal(await evaluate('board3d.diagnostics().studio.signals'),null);
  results.push({variant,signalStates:true,stopResume:true,limit:true,interlock:true,originalWireColors:true,signals3D:true,stableGeometry:true,fold:true,nativeDrag:true,mobile:true,pdf});
 }
 assert.equal(errors.length,0,JSON.stringify(errors));assert.equal(failed.length,0,JSON.stringify(failed));fs.writeFileSync('work/qa/lesson-browser-results.json',JSON.stringify({base,results,errors,failed},null,2));console.log(JSON.stringify({pass:true,base,results,errors:errors.length,failed:failed.length}));ws.close();
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{browser.kill();fs.closeSync(log);});
