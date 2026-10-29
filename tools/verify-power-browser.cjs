const fs=require('node:fs'),path=require('node:path'),{pathToFileURL}=require('node:url'),run=require('./browser-qa-runner.cjs');
const root=path.resolve(__dirname,'..'),app=path.join(root,'protoboard-ah'),out=path.join(root,'work/qa');fs.mkdirSync(out,{recursive:true});
(async()=>{for(const mode of process.argv.slice(2).length?process.argv.slice(2):['desktop','mobile','night','filtered','reference']){
 const fixture=path.join(out,'power-'+mode+'.html');fs.writeFileSync(fixture,fs.readFileSync(path.join(app,'puerta-catodo.html'),'utf8').replace('<head>','<head><base href="'+pathToFileURL(app+path.sep).href+'">'));
 const suffix=mode==='filtered'?'?desacoplo=si':mode==='reference'?'?montaje=anterior':'';
 const result=await run({url:pathToFileURL(fixture).href+suffix,profile:path.join(root,'work/chrome-power-'+mode),screenshot:path.join(out,'power-'+mode+'.png'),resultId:'power-qa-result',width:mode==='mobile'?390:1600,height:mode==='mobile'?844:1100,interact:async({send,evaluate})=>{
  if(mode==='mobile')await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
  await evaluate(`(async()=>{for(let i=0;i<200&&!window.doorReady;i++)await new Promise(r=>setTimeout(r,50));await window.doorReady;document.querySelector('.intro-skip')?.click();await new Promise(r=>setTimeout(r,450));document.fonts&&await document.fonts.ready;})()`);
  await evaluate(`(()=>{const mode=${JSON.stringify(mode)},check=(x,m)=>{if(!x)throw Error(m);},panel=document.querySelector('#powerReview');
   if(mode==='reference'){check(!panel,'Do not apply current power coordinates to old profile');}
   else{
    const progress=JSON.stringify({marked:doorGuide.getState().marked,completed:doorGuide.getState().completed}),wiring=JSON.stringify(model.items),bindings=JSON.stringify(model.bindings);
    check(panel&&!panel.open,'Power help starts closed');check(!document.querySelector('#interactive').contains(panel),'Help stays outside assembly viewer');
    check(DOOR_POWER_AUDIT.passed&&DOOR_POWER_AUDIT.cases===512,'Current audit data loaded');
    check(DOOR_POWER_AUDIT.rows.length===5,'All five IC power pin tables');
    check(DOOR_POWER_AUDIT.rails.find(r=>r.board==='B'&&r.row==='+T'&&r.bank==='derecha').net===null,'Far-end supply bank correctly identified');
    if(mode==='night')doorWorkspace.setPreference('theme','night');
    panel.open=true;panel.querySelectorAll('details').forEach(d=>d.open=true);
    for(const b of panel.querySelectorAll('[data-power-wire]'))check(model.items.some(w=>w.kind==='wire'&&w.id===b.dataset.powerWire),'Real cable target '+b.dataset.powerWire);
    panel.querySelector('[data-power-wire=W076]').click();check(doorGuide.getState().selected==='W076','Select exact motor supply wire');
    check(progress===JSON.stringify({marked:doorGuide.getState().marked,completed:doorGuide.getState().completed}),'Help never marks assembly');
    check(wiring===JSON.stringify(model.items)&&bindings===JSON.stringify(model.bindings),'Help preserves circuit');
    check(model.counts.looseResistors===11&&model.items.filter(i=>i.kind==='wire'&&!i.externalLead).length===83,'No extra resistors or cables');
    check(panel.innerText.includes('4.75')&&panel.innerText.includes('5.25 V'),'Measurable LS supply limits');check(panel.innerText.includes('SW1.3'),'RUN contact explained');
    check(document.documentElement.scrollWidth<=innerWidth+1,'No page horizontal overflow');panel.querySelectorAll('details').forEach(d=>d.open=false);panel.scrollIntoView({behavior:'instant',block:'start'});
    const rect=panel.querySelector('summary').getBoundingClientRect();check(rect.top>=76&&rect.bottom<innerHeight,'Power help visible in screenshot '+JSON.stringify(rect.toJSON()));
    check(!document.querySelector('.brand-intro'),'Intro dismissed for visual review');
   }
   const p=document.createElement('pre');p.id='power-qa-result';p.textContent=JSON.stringify({passed:true,mode});document.body.append(p);
  })()`);
 }});fs.writeFileSync(path.join(out,'power-'+mode+'.json'),JSON.stringify(result.result,null,2));console.log(JSON.stringify(result.result));if(!result.result.passed)process.exitCode=1;
}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
