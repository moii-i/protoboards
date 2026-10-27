const fs=require('fs'),path=require('path'),assert=require('assert/strict'),{spawn}=require('child_process');
const base=process.env.PROTOBOARD_QA_URL||'http://127.0.0.1:4173',chrome=process.env.PROTOBOARD_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe';
fs.mkdirSync('work/qa',{recursive:true});const log=fs.openSync('work/qa/showcase-build.log','w');
const browser=spawn(chrome,['--headless=new','--no-sandbox','--no-first-run','--no-default-browser-check','--remote-debugging-port=9259','--user-data-dir='+path.resolve('work/chrome-showcase-build'),'about:blank'],{windowsHide:true,stdio:['ignore',log,log]});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
async function main(){
 let targets;for(let i=0;i<50;i++){try{targets=await fetch('http://127.0.0.1:9259/json/list').then(r=>r.json());break;}catch{}await delay(200);}assert(targets);
 const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});let seq=0;const pending=new Map(),errors=[],failed=[];
 ws.onmessage=e=>{const r=JSON.parse(e.data);if(pending.has(r.id)){const p=pending.get(r.id);pending.delete(r.id);clearTimeout(p.timer);r.error?p.reject(Error(JSON.stringify(r.error))):p.resolve(r.result);}if(r.method==='Runtime.exceptionThrown')errors.push(r.params.exceptionDetails);if(r.method==='Network.responseReceived'&&r.params.response.status>=400&&!r.params.response.url.endsWith('/favicon.ico'))failed.push({url:r.params.response.url,status:r.params.response.status});};
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq,timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP '+method));},30000);pending.set(id,{resolve,reject,timer});ws.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
 const waitFor=async ex=>{for(let i=0;i<150;i++){if(await evaluate(ex))return;await delay(100);}throw Error('Wait '+ex);};
 const shot=async(name,file)=>{const r=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});fs.writeFileSync(file||'work/qa/'+name+'.png',Buffer.from(r.data,'base64'));};
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 const results=[];

 const onlyDoor=process.argv.includes('--door');
 const captures=onlyDoor?JSON.parse(fs.readFileSync('protoboard-ah/showcase-previews.json','utf8')).filter(c=>c.key!=='puerta'):[];
 for(const [key,route] of [['letras','/'],['555','/555'],['puerta','/puerta?montaje=ls151']].filter(([key])=>!onlyDoor||key==='puerta')){
  await send('Page.navigate',{url:base+route});await waitFor('Boolean(window.protoboardsDesign)&&Boolean(window.protoboardsShowcase)');
  await evaluate("document.querySelector('.brand-intro')?.remove();selectStep(model.stages.length-1,false,{guided:false});document.querySelector('#cumulative').checked=true;visibility();view='all';setRenderer('3d');setCamera();");
  await waitFor("Boolean(board3d)&&rendererMode==='3d'");await send('Emulation.setDeviceMetricsOverride',{width:960,height:600,deviceScaleFactor:1,mobile:false});
  await evaluate("(()=>{const s=document.createElement('style');s.textContent='.mapbox{position:fixed!important;inset:0!important;width:960px!important;height:600px!important;z-index:99999!important;border:0!important;border-radius:0!important}.canvas-caption,.studio-inspector,.map-loupe,.learning-placement-card,.lesson-signal-card,.showcase-viewer-cover{display:none!important}';document.head.append(s);document.body.classList.add('motion-off');document.body.style.overflow='hidden';document.documentElement.style.overflow='hidden';view='all';setCamera();})()");await delay(1300);
  const states=key==='letras'?[['a',0],['b',1],['h',7]]:key==='555'?[['uno',{D1:true,D2:false}],['dos',{D1:false,D2:true}]]:[['cerrada',{abrir:false,cerrar:false,stop:false,fca:false,fcc:true,position:0}],['movimiento',{abrir:true,cerrar:false,stop:false,fca:false,fcc:false,position:.4}],['pausa',{abrir:true,cerrar:false,stop:true,fca:false,fcc:false,position:.4}],['abierta',{abrir:false,cerrar:false,stop:false,fca:true,fcc:false,position:1}]];
  for(const [name,value] of states){
   if(key==='letras')await evaluate('code='+value+';updateDemo();sync3d();');
   else if(key==='555')await evaluate('currentLEDs='+JSON.stringify(value)+';sync3d();board3d.setLEDs(currentLEDs);');
   else await evaluate('power=true;demoStarted=performance.now();Object.assign(door,'+JSON.stringify(value)+');updateDemo();if(demoFrame)cancelAnimationFrame(demoFrame);demoFrame=0;');
   await delay(100);const filename='preview-'+key+'-'+name+'.png';await shot('', 'protoboard-ah/'+filename);if(key==='puerta'&&name==='cerrada')fs.copyFileSync('protoboard-ah/'+filename,'protoboard-ah/preview-puerta.png');
   const state=await evaluate(key==='letras'?'model.letters[code]':key==='555'?'currentLEDs':'({message:doorMessage,leds:indicators().leds})');
   captures.push({key,name,file:filename,state,bytes:fs.statSync('protoboard-ah/'+filename).size});
  }
 }
 fs.writeFileSync('protoboard-ah/showcase-previews.json',JSON.stringify(captures,null,2));console.log(JSON.stringify({pass:true,captures}));ws.close();
}
main().catch(e=>{console.error(e);process.exitCode=1}).finally(()=>{browser.kill();fs.closeSync(log);});
