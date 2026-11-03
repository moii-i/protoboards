const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process'),{pathToFileURL}=require('node:url');
const root=path.resolve(__dirname,'..'),app=path.join(root,'protoboard-ah'),out=path.join(root,'work/qa');fs.mkdirSync(out,{recursive:true});
const modes=process.argv.slice(2).length?process.argv.slice(2):['page','preferences','inspector','signals','dialog','mobile','3d','paper','reference','stop','moving','contrast','power'];
for(const mode of modes){
const test=`<script>(async()=>{const wait=ms=>new Promise(r=>setTimeout(r,ms)),check=(x,m)=>{if(!x)throw Error(m)};let result={mode:${JSON.stringify(mode)},passed:false};try{
for(let i=0;i<200&&!window.doorReady;i++)await wait(50);await window.doorReady;document.querySelector('.intro-skip')?.click();await wait(450);await document.fonts.ready;
const ws=doorWorkspace,topology=JSON.stringify(model.bindings),progress=JSON.stringify({marked:doorGuide.getState().marked,completed:doorGuide.getState().completed}),electrical=[...document.querySelectorAll('#map .colored-wire')].map(n=>n.getAttribute('stroke'));
ws.setPreference('effects','off');ws.setPreference('theme',result.mode==='paper'?'paper':result.mode==='contrast'?'contrast':'night');motionEnabled=false;synchronizeMotion();selectStep(LAST);setMode('cable');selectCable(model.items.find(i=>i.kind==='wire').id,{scroll:false});
if(['preferences','inspector','signals','mobile','3d'].includes(result.mode)){document.querySelector('#expand').click();ws.open();}
if(result.mode==='inspector'){doorStudio.inspect('U4');await wait(80);document.querySelector('.studio-pins button')?.click();}
if(result.mode==='power'){document.querySelector('#powerReview').open=true;document.querySelectorAll('#powerReview details').forEach(d=>d.open=true);}
if(result.mode==='signals')document.querySelector('#lessonSignals')?.click();
if(result.mode==='dialog'){const dialog=document.querySelector('.learning-dialog');dialog.showModal();}
if(['stop','moving'].includes(result.mode)){power=true;Object.assign(door,{abrir:true,cerrar:false,stop:result.mode==='stop',fca:false,fcc:false});paintLEDs();document.querySelector('#lessonSignals')?.click();document.querySelector('#viewerTestToggle')?.click();}
if(result.mode==='3d'){await setRenderer('3d');check(board3d,'3D loaded');check(board3d.getAppearance().background===getComputedStyle(document.documentElement).getPropertyValue('--ws-canvas').trim(),'3D background matches theme');}
await wait(150);
function rgb(s){const x=s.match(/[\\d.]+/g)?.map(Number)||[0,0,0];return [x[0],x[1],x[2],x[3]??1];}
function over(a,b){const t=a[3]+b[3]*(1-a[3]);return [0,1,2].map(i=>(a[i]*a[3]+b[i]*b[3]*(1-a[3]))/(t||1)).concat(t);}
function bg(n){const c=rgb(getComputedStyle(n).backgroundColor);return c[3]>=1?c:over(c,n.parentElement?bg(n.parentElement):[255,255,255,1]);}
function lum(c){return c.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4;}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);}
function ratio(a,b){const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
const failures=[],gradients=[],seen=new Set();let checked=0;
for(const n of document.querySelectorAll('body *')){
if(n.closest('svg,canvas,script,style,[hidden],#theme-qa-result,button:disabled,[aria-disabled=true]'))continue;
const s=getComputedStyle(n);if(s.visibility!=='visible'||!n.getClientRects().length)continue;
let txt=[...n.childNodes].filter(x=>x.nodeType===3).map(x=>x.textContent).join(' ').trim();if(n.tagName==='SELECT')txt=n.selectedOptions[0]?.textContent;if(!txt)continue;
const back=bg(n),front=over(rgb(s.color),back),r=ratio(front,back),large=parseFloat(s.fontSize)>=24||(parseFloat(s.fontSize)>=18.66&&parseFloat(s.fontWeight)>=700),minimum=large?3:4.5;
checked++;if(r+.01<minimum){const key=n.tagName+'.'+n.className+' '+s.color+' '+s.backgroundColor;if(!seen.has(key)){seen.add(key);failures.push({selector:n.tagName.toLowerCase()+(n.id?'#'+n.id:'.'+String(n.className).trim().replace(/\\s+/g,'.')),text:txt.slice(0,75),ratio:+r.toFixed(2),minimum,color:s.color,background:back});}}
if(s.backgroundImage!=='none')gradients.push(n.className);
}
check(topology===JSON.stringify(model.bindings),'theme changes electrical topology');check(electrical.join('|')===[...document.querySelectorAll('#map .colored-wire')].map(n=>n.getAttribute('stroke')).join('|'),'theme recolors electrical wires');
// Navigation may change selection but theme itself must never mark a connection.
check(progress===JSON.stringify({marked:doorGuide.getState().marked,completed:doorGuide.getState().completed}),'theme changes assembly marks');
check(document.documentElement.scrollWidth<=innerWidth+1,'horizontal overflow');
if(result.mode==='preferences'){const saved=JSON.parse(localStorage.getItem('protoboards:appearance:v1'));check(saved.theme==='night','saved night');ws.setPreference('theme','paper');check(getComputedStyle(document.body).color==='rgb(33, 56, 45)','paper restored');ws.setPreference('theme','night');}
result={...result,passed:failures.length===0,checked,failures,gradients};
}catch(e){result.error=e.stack||e.message;}const p=document.createElement('pre');p.id='theme-qa-result';p.textContent=JSON.stringify(result);p.style.cssText='position:fixed;bottom:0;left:0;z-index:999999;background:white;color:black;font:9px Arial;max-width:95vw';document.body.append(p);})();</script>`;
const fixture=path.join(out,'theme-'+mode+'.html'),page=mode==='reference'?'puerta.html':'puerta-catodo.html';
fs.writeFileSync(fixture,fs.readFileSync(path.join(app,page),'utf8').replace('<head>','<head><base href="'+pathToFileURL(app+path.sep).href+'">').replace('</body>',test+'</body>'));
let url=pathToFileURL(fixture).href+(mode==='reference'?'?montaje=ls151-9r':'');
if(mode==='mobile'){const frame=path.join(out,'theme-mobile-frame.html');fs.writeFileSync(frame,'<!doctype html><style>body{margin:0}iframe{width:390px;height:844px;border:0}</style><iframe id=q src='+JSON.stringify(url)+'></iframe><script>(async()=>{for(let i=0;i<400;i++){const p=document.querySelector("#q").contentDocument?.querySelector("#theme-qa-result");if(p){document.body.append(p.cloneNode(true));return;}await new Promise(r=>setTimeout(r,50));}})();</script>');url=pathToFileURL(frame).href;}
const r=spawnSync('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--no-sandbox','--no-first-run','--no-default-browser-check','--allow-file-access-from-files','--user-data-dir='+path.join(root,'work/chrome-theme-'+mode),'--window-size='+(mode==='mobile'?'390,844':'1600,1100'),'--virtual-time-budget=23000','--run-all-compositor-stages-before-draw','--dump-dom','--screenshot='+path.join(out,'theme-'+mode+'.png'),url],{windowsHide:true,encoding:'utf8',timeout:50000,maxBuffer:12*1024*1024});
fs.writeFileSync(path.join(out,'theme-'+mode+'-dom.html'),r.stdout||'');const match=r.stdout?.match(/<pre id="theme-qa-result"[^>]*>(.*?)<\/pre>/s);const result=match?JSON.parse(match[1].replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')):{mode,passed:false,error:r.stderr?.slice(-500)||String(r.error)};fs.writeFileSync(path.join(out,'theme-'+mode+'.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));if(!result.passed)process.exitCode=1;
}
