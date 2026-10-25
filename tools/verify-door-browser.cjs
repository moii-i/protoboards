const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{spawn}=require('node:child_process');
fs.mkdirSync('work/qa',{recursive:true});
const base=process.env.PROTOBOARD_QA_URL||'http://127.0.0.1:4173';
const log=fs.openSync('work/qa/browser-polish.log','w'),browser=spawn(process.env.PROTOBOARD_CHROME||(process.platform==='win32'?'C:/Program Files/Google/Chrome/Application/chrome.exe':'google-chrome'),['--headless=new','--no-sandbox','--disable-crash-reporter','--no-first-run','--no-default-browser-check','--remote-debugging-port=9241','--user-data-dir='+path.resolve('work/chrome-wiring-polish-qa'),'about:blank'],{windowsHide:true,stdio:['ignore',log,log]});
async function main(){
 let targets;for(let i=0;i<50;i++){try{targets=await(await fetch('http://127.0.0.1:9241/json/list',{signal:AbortSignal.timeout(500)})).json();break;}catch{}await new Promise(r=>setTimeout(r,200));}assert(targets,'No browser debug connection');
 const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});let id=0;const pending=new Map(),errors=[],failed=[];
 ws.onmessage=e=>{const r=JSON.parse(e.data);if(pending.has(r.id)){const p=pending.get(r.id);pending.delete(r.id);clearTimeout(p.timer);r.error?p.reject(Error(JSON.stringify(r.error))):p.resolve(r.result);}if(r.method==='Runtime.exceptionThrown')errors.push(r.params.exceptionDetails);if(r.method==='Network.responseReceived'&&r.params.response.status>=400&&!r.params.response.url.endsWith('/favicon.ico'))failed.push({url:r.params.response.url,status:r.params.response.status});};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const seq=++id,timer=setTimeout(()=>{pending.delete(seq);reject(Error('CDP timeout '+method));},30000);pending.set(seq,{resolve,reject,timer});ws.send(JSON.stringify({id:seq,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 const waitFor=async expression=>{for(let i=0;i<100;i++){if(await evaluate(expression))return;await new Promise(r=>setTimeout(r,100));}throw Error('Timed out: '+expression);};
 const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync('work/qa/'+name+'.png',Buffer.from(r.data,'base64'));};
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');

 const results=[];
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 for(const variant of ['ls151','ls151-compacto']){
  await send('Page.navigate',{url:base+'/puerta?montaje='+variant});await waitFor('Boolean(window.doorGuide)');
  await evaluate("document.querySelector('.brand-intro')?.remove();motionEnabled=false;synchronizeMotion();setRenderer('2d');framing='all';syncFraming();selectStep(LAST,false,{guided:false});document.querySelector('#cumulative').checked=true;visibility();document.querySelector('#expand').click();");
  assert(await evaluate("model.externalMotor.model==='tt-yellow'&&model.externalMotor.bounds[1]>750&&model.bounds[3]>=model.externalMotor.bounds[3]"));
  await shot('wiring-'+variant+'-2d');
  const before=await evaluate("(()=>{const s=document.querySelector('#map'),r=s.getBoundingClientRect(),x=Math.round(r.left+r.width*.55),y=Math.round(r.top+r.height*.6),p=s.createSVGPoint();p.x=x;p.y=y;const w=p.matrixTransform(s.getScreenCTM().inverse());return {x,y,world:[w.x,w.y],box:s.getAttribute('viewBox').split(/\\s+/).map(Number),scroll:scrollY};})()");
  await send('Input.dispatchMouseEvent',{type:'mouseWheel',x:before.x,y:before.y,deltaX:0,deltaY:-180});await new Promise(r=>setTimeout(r,100));
  const after=await evaluate("(()=>{const s=document.querySelector('#map'),p=s.createSVGPoint();p.x="+before.x+";p.y="+before.y+";const w=p.matrixTransform(s.getScreenCTM().inverse());return {world:[w.x,w.y],box:s.getAttribute('viewBox').split(/\\s+/).map(Number),scroll:scrollY};})()");
  assert(after.box[2]<before.box[2],'Wheel must zoom SVG');assert.equal(after.scroll,before.scroll,'Wheel must not move page');assert(Math.abs(after.world[0]-before.world[0])<.02&&Math.abs(after.world[1]-before.world[1])<.02,'Zoom must anchor cursor '+JSON.stringify({before,after}));
  const selected=await evaluate('selected');
  await send('Input.dispatchMouseEvent',{type:'mousePressed',x:before.x,y:before.y,button:'left',buttons:1,clickCount:1});
  await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:before.x+70,y:before.y+40,button:'left',buttons:1});
  await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:before.x+70,y:before.y+40,button:'left',buttons:0,clickCount:1});
  const moved=await evaluate("document.querySelector('#map').getAttribute('viewBox').split(/\\s+/).map(Number)");assert(Math.abs(moved[0]-after.box[0])>10,'Drag must pan SVG');assert.equal(await evaluate('selected'),selected,'Drag must not select cable');
  await send('Input.dispatchMouseEvent',{type:'mousePressed',x:before.x,y:before.y,button:'left',buttons:1,clickCount:2});await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:before.x,y:before.y,button:'left',buttons:0,clickCount:2});
  assert(await evaluate("document.querySelector('#map').getAttribute('viewBox').split(/\\s+/).map(Number).every((n,i)=>n===model.bounds[i])"),'Double click must fit all');
  await evaluate("setMode('cable');selectCable('P_MOTOR',{scroll:false});focusCable();");assert(await evaluate("(()=>{const b=detailCameraBox(),e=model.externalMotor.bounds;return b[0]<=e[0]&&b[1]<=e[1]&&b[0]+b[2]>=e[2]&&b[1]+b[3]>=e[3];})()"),'Motor focus must include outside body');
  await shot('wiring-'+variant+'-motor-2d');
  await evaluate("view='all';setCamera();document.querySelector('[data-renderer=\"3d\"]').click();");await waitFor("rendererMode==='3d'&&Boolean(board3d)");await evaluate("board3d.preset('iso');");await new Promise(r=>setTimeout(r,300));await shot('wiring-'+variant+'-3d');
  await evaluate("board3d.focusBox([1100,500,1000,750],false);");await new Promise(r=>setTimeout(r,100));await shot('wiring-'+variant+'-motor-3d');
  const d=await evaluate('board3d.diagnostics()');assert.equal(d.pinCount,68);assert.equal(d.routedConnections,variant==='ls151'?135:133);
  results.push({variant,wheel:true,cursorAnchored:true,pan:true,doubleClickFit:true,motorOutside:true,routedConnections:d.routedConnections});
 }
 assert.equal(errors.length,0,JSON.stringify(errors));assert.equal(failed.length,0,JSON.stringify(failed));fs.writeFileSync('work/qa/wiring-browser-results.json',JSON.stringify({base,results,errors,failed},null,2));console.log(JSON.stringify({pass:true,base,results,errors:errors.length,failed:failed.length}));ws.close();
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{browser.kill();fs.closeSync(log);});
