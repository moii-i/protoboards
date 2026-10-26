const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
fs.mkdirSync('work/qa',{recursive:true});
const base=process.env.PROTOBOARD_QA_URL||'http://127.0.0.1:4173';
const log=fs.openSync('work/qa/browser-polish.log','w'),browser=spawn(process.env.PROTOBOARD_CHROME||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':'google-chrome'),['--headless=new','--no-sandbox','--disable-crash-reporter','--no-first-run','--no-default-browser-check','--remote-debugging-port=9243','--user-data-dir='+path.resolve('work/chrome-studio-qa'),'about:blank'],{windowsHide:true,stdio:['ignore',log,log]});
async function main(){
 let targets;for(let i=0;i<50;i++){try{targets=await(await fetch('http://127.0.0.1:9243/json/list',{signal:AbortSignal.timeout(500)})).json();break;}catch{}await new Promise(r=>setTimeout(r,200));}assert(targets,'No browser debug connection');
 const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});let id=0;const pending=new Map(),errors=[],failed=[];
 ws.onmessage=e=>{const r=JSON.parse(e.data);if(pending.has(r.id)){const p=pending.get(r.id);pending.delete(r.id);clearTimeout(p.timer);r.error?p.reject(Error(JSON.stringify(r.error))):p.resolve(r.result);}if(r.method==='Runtime.exceptionThrown')errors.push(r.params.exceptionDetails);if(r.method==='Network.responseReceived'&&r.params.response.status>=400&&!r.params.response.url.endsWith('/favicon.ico'))failed.push({url:r.params.response.url,status:r.params.response.status});};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const seq=++id,timer=setTimeout(()=>{pending.delete(seq);reject(Error('CDP timeout '+method));},30000);pending.set(seq,{resolve,reject,timer});ws.send(JSON.stringify({id:seq,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 const waitFor=async expression=>{for(let i=0;i<100;i++){if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timed out: '+expression);};
 const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('work/qa/'+name+'.png',Buffer.from(r.data,'base64'));};
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');


 const results=[];
 const delay=ms=>new Promise(r=>setTimeout(r,ms));
 for(const variant of ['ls151','ls151-compacto']){
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  await send('Page.navigate',{url:base+'/puerta?montaje='+variant});await waitFor('Boolean(window.doorStudio)');
  await evaluate("document.querySelector('.brand-intro')?.remove();motionEnabled=true;synchronizeMotion();setRenderer('2d');framing='all';selectStep(LAST,false,{guided:false});document.querySelector('#cumulative').checked=true;visibility();document.querySelector('#expand').click();setCamera([100,160,650,580]);");await delay(800);
  assert(await evaluate("document.querySelector('#assemblyIsland').getBoundingClientRect().height<180"),'Compact bar uses less height');
  await evaluate("document.querySelector('#studioMore').click();document.querySelector('[data-studio-motion]').click();");assert(await evaluate("document.querySelector('[data-studio-action=\"play\"]').disabled"));await evaluate("document.querySelector('[data-studio-motion]').click();document.querySelector('#studioMore').click();");
  const click=async p=>{await send('Input.dispatchMouseEvent',{type:'mousePressed',x:Math.round(p[0]),y:Math.round(p[1]),button:'left',buttons:1,clickCount:1});await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:Math.round(p[0]),y:Math.round(p[1]),button:'left',buttons:0,clickCount:1});};
  const target=await evaluate("(()=>{const s=document.querySelector('#map'),p=s.createSVGPoint();p.x=260;p.y=455;const q=p.matrixTransform(s.getScreenCTM());return [q.x,q.y]})()");await click(target);await waitFor("doorStudio.getState().chip==='U1'");await delay(750);
  await evaluate("document.querySelector('[data-studio-pin=\"16\"]').click();");await delay(100);
  const pin=await evaluate("doorStudio.getState()");assert.equal(pin.pin,16);assert.equal(pin.stripHoles.length,5);assert(pin.related.length>0);
  await shot('studio-'+variant+'-inspector-2d');
  await evaluate("doorStudio.closeInspector();if(!doorStudio.getState().prefs.strips)document.querySelector('#studioStrips').click();doorStudio.showStrip(['A','+T',15]);");assert(await evaluate("doorStudio.getState().stripHoles.length===31&&doorStudio.getState().stripHoles.at(-1)[2]===31"));
  await evaluate("doorStudio.showStrip(['A','+T',45]);");assert(await evaluate("doorStudio.getState().stripHoles[0][2]===33&&doorStudio.getState().stripHoles.at(-1)[2]===63"));
  await evaluate("setCamera([300,230,450,460]);");await delay(750);const hole2D=await evaluate("(()=>{const s=document.querySelector('#map'),p=s.createSVGPoint();p.x=425;p.y=380;const q=p.matrixTransform(s.getScreenCTM());return [q.x,q.y];})()");await click(hole2D);assert(await evaluate("doorStudio.getState().strip?.[2]===12&&doorStudio.getState().stripHoles.length===5"),'Native 2D hole click');
  const initialMarked=await evaluate('doorGuide.getState().marked.length');
  await evaluate("setMode('cable');selectCable(model.items.find(it=>it.kind==='wire').id,{scroll:false});document.querySelector('[data-studio-action=\"play\"]').click();");await delay(450);
  await evaluate("document.querySelector('[data-studio-action=\"pause\"]').click();");const paused=await evaluate('doorStudio.getState().animation.progress');await delay(180);assert.equal(await evaluate('doorStudio.getState().animation.progress'),paused);
  assert(await evaluate("document.querySelector('.studio-assembly-overlay')!==null"));
  await shot('studio-'+variant+'-jumper-2d');
  await evaluate("document.querySelector('[data-studio-speed]').value='2';document.querySelector('[data-studio-speed]').onchange();document.querySelector('[data-studio-action=\"pause\"]').click();");await delay(1800);
  assert.equal(await evaluate('doorStudio.getState().animation.progress'),1);assert.equal(await evaluate('doorGuide.getState().marked.length'),initialMarked);
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await delay(100);assert(await evaluate("document.querySelector('[data-studio-action=\"play\"]').disabled"));assert.equal(await evaluate('doorStudio.getState().animation'),null);
  await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});await delay(100);
  await evaluate("view='all';setCamera();document.querySelector('[data-renderer=\"3d\"]').click();");await waitFor("rendererMode==='3d'&&Boolean(board3d)");await delay(800);
  await evaluate("setCamera([740,200,650,550]);");await delay(800);const chipTarget=await evaluate("board3d.diagnostics().targets.chips.find(x=>x.id==='U3').screen");await click(chipTarget);await waitFor("doorStudio.getState().chip==='U3'");await delay(750);
  await evaluate("document.querySelector('[data-studio-pin=\"13\"]').click();");await delay(200);const d=await evaluate('board3d.diagnostics()');assert.equal(d.studio.chip,'U3');assert.equal(d.studio.stripHoles.length,5);await shot('studio-'+variant+'-inspector-3d');
  await evaluate("doorStudio.closeInspector();setCamera([300,230,450,460]);board3d.preset('top');");await delay(800);const hole3D=await evaluate("board3d.diagnostics().targets.contacts[0]");await click(hole3D);assert(await evaluate("doorStudio.getState().strip?.[2]===12&&doorStudio.getState().stripHoles.length===5"),'Native 3D hole click');
  await evaluate("doorStudio.closeInspector();selectCable(model.items.find(it=>it.kind==='wire'&&it.fromRef==='U3.13').id,{scroll:false});document.querySelector('[data-studio-speed]').value='1';document.querySelector('[data-studio-speed]').onchange();document.querySelector('[data-studio-action=\"play\"]').click();");await delay(1100);await evaluate("document.querySelector('[data-studio-action=\"pause\"]').click();");
  const partial=await evaluate('board3d.diagnostics().studio');assert(partial.assembly.progress>.22&&partial.assembly.progress<.78);assert(partial.partialDrawCount>0);await shot('studio-'+variant+'-jumper-3d');
  assert((await evaluate('board3d.diagnostics().studio.reveal.tipError'))<.0001,'The cable tip and contour must coincide in WebGL');
  await evaluate("setRenderer('2d');framing='detail';selectCable(model.items.filter(it=>it.kind==='wire'&&it.route.length>4)[0].id,{scroll:false});doorStudio.play();");
  await waitFor("doorStudio.getState().animation.progress>.43");await evaluate('doorStudio.pause()');
  const tip2D=await evaluate("(()=>{const a=doorStudio.getState().animation,el=document.querySelector('.studio-assembly-overlay'),p=document.querySelector('.connection[data-id=\\\"'+a.id+'\\\"] .colored-wire'),f=Number(el.dataset.reveal),tip=el.dataset.tip.split(',').map(Number),want=p.getPointAtLength(p.getTotalLength()*f);return {error:Math.hypot(tip[0]-want.x,tip[1]-want.y),lengthError:Math.abs(document.querySelector('.studio-assembly-overlay path').getTotalLength()-p.getTotalLength()*f),progress:a.progress};})()");
  assert(tip2D.error<.001);assert(tip2D.lengthError<.4,'2D reveal must follow real route length');
  await shot('motion-'+variant+'-2d');
  const unchanged=await evaluate("document.querySelector('.studio-assembly-overlay').dataset.tip");
  for(const width of [500,1400,250]){await evaluate('setCamera([1700,130,'+width+',650])');await delay(720);assert.equal(await evaluate("document.querySelector('.studio-assembly-overlay').dataset.tip"),unchanged,'Zoom must not change the reveal position');}
  await evaluate("setRenderer('3d');");await delay(250);assert.equal(await evaluate('doorStudio.getState().animation.progress'),tip2D.progress);
  assert((await evaluate('board3d.diagnostics().studio.reveal.tipError'))<.0001,'Switching views preserves the same frontier');
  await evaluate("document.querySelector('[data-studio-speed]').value='2';document.querySelector('[data-studio-speed]').onchange();doorStudio.pause();");await waitFor('doorStudio.getState().animation.progress===1');
  assert.equal(await evaluate('doorGuide.getState().marked.length'),initialMarked);
  await evaluate("selectStep(0,false,{guided:false});");assert.equal(await evaluate('doorStudio.getState().animation'),null);assert.equal(await evaluate('board3d.diagnostics().studio.assembly.id'),null);
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await evaluate("doorStudio.inspect('U2',2);");await delay(200);assert(await evaluate("document.documentElement.scrollWidth<=innerWidth+2"),'No mobile overflow');await shot('studio-'+variant+'-mobile');
  results.push({variant,chipClick2D:true,pins:true,railBreak:true,animation2D:true,pause:true,completedWithoutMarking:true,reducedMotion:true,chipClick3D:true,animation3D:true,synchronizedTips:true,zoomIndependentReveal2D:true,mobile:true});
 }
 assert.equal(errors.length,0,JSON.stringify(errors));assert.equal(failed.length,0,JSON.stringify(failed));fs.writeFileSync('work/qa/studio-browser-results.json',JSON.stringify({base,results,errors,failed},null,2));console.log(JSON.stringify({pass:true,base,results,errors:errors.length,failed:failed.length}));ws.close();
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{browser.kill();fs.closeSync(log);});
