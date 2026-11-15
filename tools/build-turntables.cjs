// Versión en Node de build-turntables.py (para equipos sin Python).
// Uso, con el servidor local encendido:  node tools/build-turntables.cjs seguidor
// Mismo encuadre y salida: turntable/<clave>.webp (13 cuadros ±30°), <clave>-poster.webp
// y la entrada de turntable.json. El recorte y el WebP se hacen en el propio Chrome.
const fs=require('fs'),path=require('path'),{spawn}=require('child_process');
const BASE=process.env.PROTOBOARD_QA_URL||'http://127.0.0.1:4173';
const CHROME=process.env.PROTOBOARD_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe';
const OUT=path.resolve(__dirname,'../protoboard-ah/turntable');
const PAGES={seguidor:'/seguidor',descendente:'/contador-descendente',contador:'/contador',puerta:'/puerta-catodo','555':'/555',letras:'/'};
const STEPS=6,STEP=1/6,W=1440,H=900,FW=720,FH=380;
const SETUP="document.querySelector('.brand-intro')?.remove();selectStep(model.stages.length-1,false,{guided:false});const c=document.querySelector('#cumulative');if(c)c.checked=true;try{visibility()}catch(e){};try{view='all'}catch(e){};setRenderer('3d');try{setCamera()}catch(e){}";
const HIDE=".canvas-caption,.studio-inspector,.map-loupe,.detail-loupe,.learning-placement-card,.lesson-signal-card,.showcase-viewer-cover,.taller-stepdock,.design-complete,.assembly-island,.map-nav,.viewer-test,.three-status,.component-assembly-panel,.assembly-footer,.close-expanded,.map-context,.three-hologram,.hologram{display:none!important}";
const delay=ms=>new Promise(r=>setTimeout(r,ms));

// Se ejecuta dentro del navegador: recorta todos los cuadros con la misma caja y arma la tira.
function compose(shots,FW,FH,STEPS){
  return Promise.all(shots.map(src=>new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src='data:image/png;base64,'+src;}))).then(images=>{
    const w=images[0].width,h=images[0].height,work=document.createElement('canvas');work.width=w;work.height=h;
    const ctx=work.getContext('2d',{willReadFrequently:true});ctx.drawImage(images[STEPS],0,0);
    const bg=[...ctx.getImageData(80,80,1,1).data.slice(0,3)],css='rgb('+bg.join(',')+')';
    let x0=w,y0=h,x1=0,y1=0;
    for(const img of images){
      ctx.drawImage(img,0,0);ctx.fillStyle=css;
      for(const [x,y] of [[0,0],[w-70,0],[0,h-70],[w-70,h-70]])ctx.fillRect(x,y,70,70);
      const d=ctx.getImageData(0,0,w,h).data;
      for(let y=0;y<h;y+=2)for(let x=0;x<w;x+=2){const k=(y*w+x)*4;if(Math.max(Math.abs(d[k]-bg[0]),Math.abs(d[k+1]-bg[1]),Math.abs(d[k+2]-bg[2]))>22){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}}
    }
    const cx=(x0+x1)/2,cy=(y0+y1)/2,ratio=FW/FH;let bw=(x1-x0)*1.08,bh=(y1-y0)*1.12;
    if(bw/bh<ratio)bw=bh*ratio;else bh=bw/ratio;
    const sx=Math.round(cx-bw/2),sy=Math.round(cy-bh/2);
    const strip=document.createElement('canvas');strip.width=FW*images.length;strip.height=FH;const sc=strip.getContext('2d');
    sc.fillStyle=css;sc.fillRect(0,0,strip.width,FH);sc.imageSmoothingQuality='high';
    images.forEach((img,i)=>sc.drawImage(img,sx,sy,bw,bh,i*FW,0,FW,FH));
    const poster=document.createElement('canvas');poster.width=FW;poster.height=FH;poster.getContext('2d').drawImage(strip,STEPS*FW,0,FW,FH,0,0,FW,FH);
    return {strip:strip.toDataURL('image/webp',.74).split(',')[1],poster:poster.toDataURL('image/webp',.82).split(',')[1],background:'#'+bg.map(v=>v.toString(16).padStart(2,'0')).join('')};
  });
}

async function run(keys){
  const port=9361,profile=path.resolve('work/chrome-turntable');
  const browser=spawn(CHROME,['--headless=new','--no-sandbox','--no-first-run','--hide-scrollbars','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--remote-debugging-port='+port,'--user-data-dir='+profile,'about:blank'],{stdio:'ignore'});
  try{
    let targets;for(let i=0;i<60;i++){try{targets=await fetch('http://127.0.0.1:'+port+'/json/list').then(r=>r.json());break;}catch{}await delay(200);}
    const ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);
    let id=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id);}};
    const send=(method,params={})=>new Promise(r=>{const i=++id;pending.set(i,r);ws.send(JSON.stringify({id:i,method,params}));});
    const evaluate=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.result.exceptionDetails)throw Error(JSON.stringify(r.result.exceptionDetails.exception?.description));return r.result.result.value;};
    const waitFor=async(expression,ms=60000)=>{for(const end=Date.now()+ms;Date.now()<end;await delay(200))if(await evaluate(expression).catch(()=>false))return;throw Error('Tiempo agotado: '+expression);};
    await send('Page.enable');await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride',{width:W,height:H,deviceScaleFactor:1,mobile:false});
    await send('Page.addScriptToEvaluateOnNewDocument',{source:"localStorage.setItem('protoboards:appearance:v1',JSON.stringify({theme:'paper',rev:2,effects:'off',quality:'sharp'}))"});
    const manifestPath=path.join(OUT,'turntable.json'),manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
    for(const key of keys){
      await send('Page.navigate',{url:BASE+PAGES[key]});
      await waitFor("typeof selectStep==='function'&&typeof setRenderer==='function'&&!!document.querySelector('.taller-bar')");
      await delay(800);await evaluate(SETUP);
      await waitFor("typeof board3d!=='undefined'&&board3d&&document.querySelector('.mapbox')?.classList.contains('in-3d')");
      await evaluate("document.querySelector('#expand').click()");await waitFor("document.body.classList.contains('fullscreen')");
      await evaluate(`(()=>{const s=document.createElement('style');s.textContent=${JSON.stringify(HIDE)};document.head.append(s)})()`);
      await delay(900);await evaluate("try{setCamera()}catch(e){};window.dispatchEvent(new Event('resize'))");await delay(1500);
      const rect=await evaluate("(()=>{const r=document.querySelector('#threeViewport canvas').getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}})()");
      await evaluate(`board3d.rotate(${-STEPS*STEP})`);
      const shots=[];
      for(let i=0;i<2*STEPS+1;i++){
        await delay(450);
        shots.push((await send('Page.captureScreenshot',{format:'png',clip:{...rect,scale:1}})).result.data);
        if(i<2*STEPS)await evaluate(`board3d.rotate(${STEP})`);
      }
      const out=await evaluate(`(${compose})(${JSON.stringify(shots)},${FW},${FH},${STEPS})`);
      fs.writeFileSync(path.join(OUT,key+'.webp'),Buffer.from(out.strip,'base64'));
      fs.writeFileSync(path.join(OUT,key+'-poster.webp'),Buffer.from(out.poster,'base64'));
      manifest[key]={frames:shots.length,width:FW,height:FH,background:out.background,bytes:fs.statSync(path.join(OUT,key+'.webp')).size};
      console.log(key,manifest[key]);
    }
    fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2));
    ws.close();
  }finally{browser.kill();}
}
const keys=process.argv.slice(2).length?process.argv.slice(2):Object.keys(PAGES);
for(const k of keys)if(!PAGES[k])throw Error('Circuito desconocido: '+k);
run(keys).catch(e=>{console.error(e);process.exitCode=1;});
