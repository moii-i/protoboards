const fs=require('fs'),path=require('path'),assert=require('assert/strict'),{spawn}=require('child_process');
const base=process.env.PROTOBOARD_QA_URL||'http://127.0.0.1:4173',chrome=process.env.PROTOBOARD_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe';
fs.mkdirSync('work/qa',{recursive:true});const log=fs.openSync('work/qa/showcase-browser.log','w');
const browser=spawn(chrome,['--headless=new','--no-sandbox','--no-first-run','--no-default-browser-check','--remote-debugging-port=9260','--user-data-dir='+path.resolve('work/chrome-showcase-qa'),'about:blank'],{windowsHide:true,stdio:['ignore',log,log]});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
async function main(){
 let targets;for(let i=0;i<50;i++){try{targets=await fetch('http://127.0.0.1:9260/json/list').then(r=>r.json());break;}catch{}await delay(200);}assert(targets);
 const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});let seq=0;const pending=new Map(),errors=[],failed=[];
 ws.onmessage=e=>{const r=JSON.parse(e.data);if(r.method==='Fetch.requestPaused')pauses.push(r.params);if(pending.has(r.id)){const p=pending.get(r.id);pending.delete(r.id);clearTimeout(p.timer);r.error?p.reject(Error(JSON.stringify(r.error))):p.resolve(r.result);}if(r.method==='Runtime.exceptionThrown')errors.push(r.params.exceptionDetails);if(r.method==='Network.responseReceived'&&r.params.response.status>=400&&!r.params.response.url.endsWith('/favicon.ico'))failed.push({url:r.params.response.url,status:r.params.response.status});};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq,timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP '+method));},30000);pending.set(id,{resolve,reject,timer});ws.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 const waitFor=async ex=>{for(let i=0;i<150;i++){if(await evaluate(ex))return;await delay(100);}throw Error('Wait '+ex);};
 const shot=async(name,file)=>{const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(file||'work/qa/'+name+'.png',Buffer.from(r.data,'base64'));};
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 const results=[];

 const pauses=[]; // Request interception holds the first 3D bundle to exercise the actual loading state.
 await send('Storage.clearDataForOrigin',{origin:base,storageTypes:'local_storage'});await send('Network.setCacheDisabled',{cacheDisabled:true});
 await send('Page.addScriptToEvaluateOnNewDocument',{source:"window.addEventListener('pagereveal',e=>{window.__showcaseNativeTransition=Boolean(e.viewTransition);});"});
 await send('Page.navigate',{url:base+'/circuitos'});await waitFor('Boolean(window.protoboardsShowcase)');
 await waitFor("[...document.querySelectorAll('.circuit-card-preview>img:first-child')].every(i=>i.complete&&i.naturalWidth>0)");
 assert.equal(await evaluate("document.querySelectorAll('.showcase-preview-play').length"),3);
 const previews=[];
 for(let i=0;i<3;i++){
  await evaluate("document.querySelectorAll('.showcase-preview-play')["+i+"].scrollIntoView({block:'center',behavior:'instant'});document.querySelectorAll('.showcase-preview-play')["+i+"].click();");
  await waitFor("protoboardsShowcase.getState().previews["+i+"].running");
  const first=await evaluate("protoboardsShowcase.getState().previews["+i+"].index");await delay(1350);
  assert.notEqual(await evaluate("protoboardsShowcase.getState().previews["+i+"].index"),first,'Preview advances');
  assert(await evaluate("document.querySelectorAll('.showcase-frame')["+i+"].naturalWidth===960"));
  previews.push(await evaluate("protoboardsShowcase.getState().previews["+i+"]"));await evaluate('protoboardsShowcase.stopPreviews()');
 }
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
 await delay(200);await evaluate("document.querySelectorAll('.showcase-preview-play')[1].scrollIntoView({block:'center',behavior:'instant'});document.querySelectorAll('.showcase-preview-play')[1].click()");await waitFor("protoboardsShowcase.getState().previews[1].index===0");
 await delay(1400);assert.equal(await evaluate('protoboardsShowcase.getState().previews[1].index'),0);assert.equal(await evaluate('protoboardsShowcase.getState().previews[1].running'),false);
 await evaluate("document.querySelectorAll('.showcase-preview-play')[1].click()");await waitFor("protoboardsShowcase.getState().previews[1].index===1");
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
 // Use the browser's native link navigation so cross-document snapshots are exercised.
 await evaluate("protoboardsShowcase.stopPreviews();document.querySelectorAll('[data-catalog-action]')[1].scrollIntoView({block:'center',behavior:'instant'});");
 const link=await evaluate("(()=>{const r=document.querySelectorAll('[data-catalog-action]')[1].getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()");
 await send('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',buttons:1,clickCount:1,...link});await send('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',buttons:0,clickCount:1,...link});
 await waitFor("location.pathname==='/555'&&Boolean(window.protoboardsShowcase)");
 await waitFor("typeof window.__showcaseNativeTransition==='boolean'");const native=await evaluate('Boolean(window.__showcaseNativeTransition)');
 if(native)await waitFor("protoboardsShowcase.getState().transition==='finished'");
 assert.equal(await evaluate("sessionStorage.getItem('protoboards:transition:v1')"),null);
 const transition=await evaluate('protoboardsShowcase.getState().transition');await shot('showcase-arrival-555');
 const viewerResults=[];
 for(const [key,route] of [['letras','/'],['555','/555'],['puerta','/puerta?montaje=ls151']]){
  await send('Page.navigate',{url:base+route});await waitFor("Boolean(window.protoboardsShowcase)&&Boolean(document.getElementById('threeViewport')?.dataset.showcaseInstalled)");
  await evaluate("document.querySelector('.brand-intro')?.remove();setRenderer('2d');document.querySelector('.map-stage').scrollIntoView({block:'center',behavior:'instant'});");
  const progress=await evaluate('JSON.stringify({marked:[...marked],completed:[...completed],step,selected})');
  pauses.length=0;await send('Fetch.enable',{patterns:[{urlPattern:'*visor-*-3d.js*',requestStage:'Request'}]});
  await evaluate("setRenderer('3d');true");await waitFor("!document.querySelector('.showcase-viewer-cover').hidden");
  for(let i=0;i<100&&!pauses.length;i++)await delay(50);assert(pauses.length,'The bundle is held during loading');
  assert.equal(await evaluate("document.querySelector('.mapbox').getAttribute('aria-busy')"),'true');
  await waitFor("document.querySelector('.showcase-viewer-cover img').complete&&document.querySelector('.showcase-viewer-cover img').naturalWidth===960");
  assert(await evaluate("document.querySelector('.showcase-viewer-cover img').naturalWidth===960"));
  await shot('showcase-loading-'+key);
  if(key==='555'){await evaluate("setRenderer('2d');true");assert(await evaluate("document.querySelector('.showcase-viewer-cover').hidden"));assert.equal(await evaluate('rendererMode'),'2d');}
  for(const p of pauses.splice(0))await send('Fetch.continueRequest',{requestId:p.requestId});await send('Fetch.disable');
  if(key==='555'){await delay(400);assert.equal(await evaluate('rendererMode'),'2d');await evaluate("setRenderer('3d');");}
  await waitFor("rendererMode==='3d'&&document.querySelector('.showcase-viewer-cover').hidden");
  assert.equal(await evaluate("document.querySelector('.mapbox').getAttribute('aria-busy')"),'false');
  assert.equal(await evaluate('JSON.stringify({marked:[...marked],completed:[...completed],step,selected})'),progress);
  const loads=await evaluate('protoboardsShowcase.getState().viewerLoads');
  await evaluate("setRenderer('2d');");await evaluate("setRenderer('3d');");assert.equal(await evaluate('protoboardsShowcase.getState().viewerLoads'),loads,'Cached 3D skips cover');
  viewerResults.push({key,heldBundle:true,referenceImage:true,readyFade:true,progressUnchanged:true,cachedLoad:true,cancelTest:key==='555'});
 }
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 await send('Emulation.setEmulatedMedia',{features:[{name:'hover',value:'none'},{name:'prefers-reduced-motion',value:'no-preference'}]});
 await send('Page.navigate',{url:base+'/circuitos'});await waitFor('Boolean(window.protoboardsShowcase)');
 await evaluate("document.querySelectorAll('.showcase-preview-play')[0].scrollIntoView({block:'center',behavior:'instant'});document.querySelectorAll('.showcase-preview-play')[0].click();");await waitFor("protoboardsShowcase.getState().previews[0].running");assert(await evaluate("document.documentElement.scrollWidth<=innerWidth+2"));await shot('showcase-mobile-preview');
 await evaluate("document.querySelector('.design-footer').scrollIntoView({block:'end',behavior:'instant'});");await waitFor("!protoboardsShowcase.getState().previews[0].running");
 assert.equal(errors.length,0,JSON.stringify(errors));assert.equal(failed.length,0,JSON.stringify(failed));
 const result={pass:true,previews,native,transition,viewerResults,reducedMotion:true,mobile:true,offscreenPause:true,errors:errors.length,failed:failed.length};fs.writeFileSync('work/qa/showcase-browser-results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));ws.close();
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{browser.kill();fs.closeSync(log);});
