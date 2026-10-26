const fs=require('fs'),path=require('path'),assert=require('assert/strict'),{spawn}=require('child_process');
const base=process.env.PROTOBOARD_QA_URL||'http://127.0.0.1:4173',chrome=process.env.PROTOBOARD_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe';
fs.mkdirSync('work/qa',{recursive:true});const log=fs.openSync('work/qa/design-browser.log','w');
const browser=spawn(chrome,['--headless=new','--no-sandbox','--no-first-run','--no-default-browser-check','--remote-debugging-port=9258','--user-data-dir='+path.resolve('work/chrome-design-qa'),'about:blank'],{windowsHide:true,stdio:['ignore',log,log]});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
async function main(){
 let targets;for(let i=0;i<50;i++){try{targets=await fetch('http://127.0.0.1:9258/json/list').then(r=>r.json());break;}catch{}await delay(200);}assert(targets);
 const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});let seq=0;const pending=new Map(),errors=[],failed=[];
 ws.onmessage=e=>{const r=JSON.parse(e.data);if(pending.has(r.id)){const p=pending.get(r.id);pending.delete(r.id);clearTimeout(p.timer);r.error?p.reject(Error(JSON.stringify(r.error))):p.resolve(r.result);}if(r.method==='Runtime.exceptionThrown')errors.push(r.params.exceptionDetails);if(r.method==='Network.responseReceived'&&r.params.response.status>=400&&!r.params.response.url.endsWith('/favicon.ico'))failed.push({url:r.params.response.url,status:r.params.response.status});};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq,timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP '+method));},30000);pending.set(id,{resolve,reject,timer});ws.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 const waitFor=async ex=>{for(let i=0;i<150;i++){if(await evaluate(ex))return;await delay(100);}throw Error('Wait '+ex);};
 const shot=async(name,file)=>{const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(file||'work/qa/'+name+'.png',Buffer.from(r.data,'base64'));};
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 const results=[];
 if(process.argv.includes('--previews')){
  const catalog=[];
  for(const [key,route] of [['letras','/'],['555','/555'],['puerta','/puerta?montaje=ls151']]){
   await send('Page.navigate',{url:base+route});await waitFor('Boolean(window.protoboardsDesign)');await evaluate("document.querySelector('.brand-intro')?.remove();selectStep(model.stages.length-1,false,{guided:false});document.querySelector('#cumulative').checked=true;visibility();view='all';setRenderer('3d');setCamera();");
   await waitFor("Boolean(board3d)&&rendererMode==='3d'");await send('Emulation.setDeviceMetricsOverride',{width:960,height:600,deviceScaleFactor:1,mobile:false});
   await evaluate("(()=>{const s=document.createElement('style');s.textContent='.mapbox{position:fixed!important;inset:0!important;width:960px!important;height:600px!important;z-index:99999!important;border:0!important;border-radius:0!important;background:#f0f3eb!important}.canvas-caption,.studio-inspector,.map-loupe,.learning-placement-card,.lesson-signal-card{display:none!important}';document.head.append(s);document.body.classList.add('motion-off');document.body.style.overflow='hidden';document.documentElement.style.overflow='hidden';view='all';setCamera();})()");await delay(1500);
   await shot('', 'protoboard-ah/preview-'+key+'.png');
   catalog.push(await evaluate("({key:"+JSON.stringify(key)+",stages:model.stages.length,connections:model.items.length})"));
  }
  fs.writeFileSync('protoboard-ah/circuit-catalog.json',JSON.stringify(catalog,null,2));console.log(JSON.stringify({previews:catalog}));ws.close();return;
 }
 for(const [key,route] of [['letras','/'],['555','/555'],['puerta','/puerta?montaje=ls151']]){
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await send('Page.navigate',{url:base+route});await waitFor('Boolean(window.protoboardsDesign)');await evaluate("document.querySelector('.brand-intro')?.remove();");await evaluate('document.fonts.ready');
  assert(await evaluate("document.fonts.check('600 14px Manrope')"));
  assert.equal(await evaluate("document.querySelector('.brand').getAttribute('href')"),'/circuitos');
  assert.equal(await evaluate("document.querySelectorAll('.design-tool-group').length"),3);
  assert.equal(await evaluate("document.querySelectorAll('.circuit-picker a[aria-current=page]').length"),1);
  const initial=await evaluate("({marked:[...marked],completed:[...completed],step})");
  await evaluate("protoboardsDesign.openTools('view')");await delay(100);
  assert(await evaluate("document.querySelector('[data-design-tool=view]').open"));
  await evaluate("document.querySelector('[data-view=all]').click();");assert.equal(await evaluate('view'),'all');
  await evaluate("protoboardsDesign.openTools('motion')");await waitFor("!document.querySelector('[data-design-tool=view]').open");assert(await evaluate("!document.querySelector('[data-design-tool=view]').open"));
  const motion=await evaluate('motionEnabled');await evaluate("document.getElementById('motion').click()");assert.equal(await evaluate('motionEnabled'),!motion);await evaluate("document.getElementById('motion').click()");
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});await waitFor("!document.querySelector('.design-tool-group[open]')");assert(await evaluate("!document.querySelector('.design-tool-group[open]')"));
  await evaluate("setRenderer('3d');");await waitFor("Boolean(board3d)&&rendererMode==='3d'");await delay(500);assert(await evaluate("document.querySelector('.three-viewport canvas').getBoundingClientRect().height>100"));
  await evaluate("protoboardsDesign.openTools('view');document.querySelector('[data-angle=top]').click();");await delay(150);
  await evaluate("protoboardsDesign.closeTools();document.querySelector('#expand').click();");await delay(200);assert(await evaluate("document.body.classList.contains('fullscreen')"));assert(await evaluate("getComputedStyle(document.querySelector('.design-tool-dock')).display==='none'"));
  if(await evaluate("Boolean(document.querySelector('#closeExpanded'))"))await evaluate("document.querySelector('#closeExpanded').click()");else await evaluate("document.querySelector('#expand').click()");
  await evaluate("setRenderer('2d');document.querySelector('#montaje').scrollIntoView({block:'start'});");await delay(200);
  await shot('design-'+key+'-desktop');
  assert.deepEqual(await evaluate('[...marked]'),initial.marked);assert.deepEqual(await evaluate('[...completed]'),initial.completed);
  for(const width of [390,320]){
   await send('Emulation.setDeviceMetricsOverride',{width,height:844,deviceScaleFactor:1,mobile:true});await delay(200);
   assert(await evaluate("document.documentElement.scrollWidth<=innerWidth+2"),key+' overflow '+width);
   await evaluate("document.querySelector('.design-nav-menu').open=true");await delay(100);assert(await evaluate("document.querySelector('.design-nav-menu a').getBoundingClientRect().width>0"));await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape'});assert(await evaluate("!document.querySelector('.design-nav-menu').open"));
   await evaluate("protoboardsDesign.openTools('view')");await delay(250);
   assert(await evaluate("(()=>{const r=document.querySelector('[data-design-tool=view] .design-tool-panel').getBoundingClientRect();return r.left>=0&&r.right<=innerWidth+1&&r.bottom<=innerHeight+1})()"),key+' panel bounds');
   await shot('design-'+key+'-mobile-'+width);await evaluate('protoboardsDesign.closeTools()');
  }
  results.push({key,font:true,toolbar:true,toggleControls:true,renderer3D:true,fullscreen:true,savedConnectionsUnchanged:true,mobileWidths:[320,390]});
 }
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await send('Page.navigate',{url:base+'/circuitos'});await waitFor("document.querySelectorAll('.circuit-card').length===3");await evaluate('document.fonts.ready');await waitFor("[...document.images].every(i=>i.complete&&i.naturalWidth>0)");
 const before=await evaluate("localStorage.getItem('protoboard:ne555:v1')");
 await evaluate("localStorage.setItem('protoboard:ne555:v1',JSON.stringify({completed:[1,2],step:3,marked:['C001']}));");await send('Page.reload');await waitFor("document.querySelector('[data-circuit-card=\\\"555\\\"] [data-catalog-percent]')?.textContent==='29%'");
 assert.equal(await evaluate("document.querySelector('[data-circuit-card=\\\"555\\\"] [data-catalog-action]').textContent.trim()"),'Continuar montaje');
 await shot('design-catalog-desktop');
 if(before===null)await evaluate("localStorage.removeItem('protoboard:ne555:v1')");else await evaluate("localStorage.setItem('protoboard:ne555:v1',"+JSON.stringify(before)+")");
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await send('Page.reload');await waitFor("[...document.images].every(i=>i.complete&&i.naturalWidth>0)");assert(await evaluate("document.documentElement.scrollWidth<=innerWidth+2"));await shot('design-catalog-mobile');
 await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});assert.equal(await evaluate("getComputedStyle(document.querySelector('.circuit-card')).transitionDuration"),'0s');
 assert.equal(errors.length,0,JSON.stringify(errors));assert.equal(failed.length,0,JSON.stringify(failed));fs.writeFileSync('work/qa/design-browser-results.json',JSON.stringify({base,results,catalog:{cards:3,images:true,progress:true,mobile:true,reducedMotion:true},errors,failed},null,2));console.log(JSON.stringify({pass:true,results,catalog:true,errors:errors.length,failed:failed.length}));ws.close();
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{browser.kill();fs.closeSync(log);});