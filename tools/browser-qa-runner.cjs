// Use wall-clock browser execution: virtual time can finish before WebGL imports.
const fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process');
module.exports=async function runBrowserQA({url,profile,screenshot,resultId,width=1600,height=1100}){
 fs.mkdirSync(profile,{recursive:true});const active=path.join(profile,'DevToolsActivePort');fs.rmSync(active,{force:true});
 const browser=spawn(process.env.PROTOBOARD_CHROME||'C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--no-sandbox','--no-first-run','--no-default-browser-check','--allow-file-access-from-files','--remote-debugging-port=0','--user-data-dir='+profile,'--window-size='+width+','+height,url],{windowsHide:true,stdio:'ignore'});
 let ws;const errors=[];try{
  for(let i=0;i<100&&!fs.existsSync(active);i++)await new Promise(r=>setTimeout(r,100));
  const port=fs.readFileSync(active,'utf8').split('\n')[0],tabs=await(await fetch('http://127.0.0.1:'+port+'/json/list')).json();
  ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});let id=0;const pending=new Map();
  ws.onmessage=e=>{const m=JSON.parse(e.data),p=pending.get(m.id);if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails);if(p){pending.delete(m.id);clearTimeout(p.timer);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}};
  const send=(method,params={})=>new Promise((resolve,reject)=>{const seq=++id,timer=setTimeout(()=>reject(Error('CDP timeout: '+method)),15000);pending.set(seq,{resolve,reject,timer});ws.send(JSON.stringify({id:seq,method,params}));});
  await send('Runtime.enable');let result=null;
  for(let i=0;i<160;i++){const r=await send('Runtime.evaluate',{expression:'document.getElementById('+JSON.stringify(resultId)+')?.textContent',returnByValue:true});if(r.result.value){result=JSON.parse(r.result.value);break;}await new Promise(r=>setTimeout(r,250));}
  const dom=await send('Runtime.evaluate',{expression:'document.documentElement.outerHTML',returnByValue:true});
  const shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(screenshot,Buffer.from(shot.data,'base64'));
  return {result:result||{passed:false,error:'Browser test timed out',exceptions:errors},dom:dom.result.value};
 }finally{ws?.close();browser.kill();}
};
