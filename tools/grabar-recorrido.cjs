// Graba la simulación 3D de /seguidor cuadro por cuadro (30 fps) y arma un MP4 con ffmpeg.
//   node tools/grabar-recorrido.cjs <carpeta de cuadros> <video.mp4> [segundos por pista]
// Necesita el servidor local (node tools/dev-server.cjs), Chrome y ffmpeg. Los cuadros y el video no van al repo.
// Cada cuadro: la simulación avanza 1/30 s, el visor dibuja y se copia el canvas WebGL con el rótulo encima.
const fs = require('fs'), path = require('path'), { spawn, execFileSync } = require('child_process');
const [framesDir, out, perTrack = '20'] = process.argv.slice(2);
const base = 'http://127.0.0.1:4173', chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe', W = 1280, H = 720, FPS = 30;
fs.rmSync(framesDir, { recursive: true, force: true }); fs.mkdirSync(framesDir, { recursive: true });
const profile = path.join(framesDir, '..', 'chrome-grabar');
const browser = spawn(chrome, ['--headless=new', '--no-first-run', '--no-default-browser-check', '--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--remote-debugging-port=9277', '--user-data-dir=' + profile, '--window-size=1280,720', 'about:blank'], { windowsHide: true, stdio: 'ignore' });
const delay = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  let targets; for (let i = 0; i < 60; i++) { try { targets = await fetch('http://127.0.0.1:9277/json/list').then(r => r.json()); break; } catch {} await delay(250); }
  const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl); await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let seq = 0; const pending = new Map();
  ws.onmessage = e => { const m = JSON.parse(e.data); if (pending.has(m.id)) { const p = pending.get(m.id); pending.delete(m.id); m.error ? p.reject(Error(JSON.stringify(m.error))) : p.resolve(m.result); } };
  const send = (method, params = {}) => new Promise((resolve, reject) => { const id = ++seq; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => { const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails).slice(0, 600)); return r.result.value; };
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: base + '/seguidor?grabar=1#simulacion' });
  for (let i = 0; i < 120; i++) { if (await evaluate("Boolean(window.followerTrack) && !document.documentElement.classList.contains('taller-pending')").catch(() => false)) break; await delay(250); }
  console.log('GPU', await evaluate("(()=>{const g=document.createElement('canvas').getContext('webgl2');const d=g.getExtension('WEBGL_debug_renderer_info');return d?g.getParameter(d.UNMASKED_RENDERER_WEBGL):'?';})()"));
  await evaluate(`(async()=>{
    document.querySelector('[data-sim-view="3d"]').click();
    await followerTrack.ready();
    window.agvAssembly?.dispose?.();
    // El escenario pasa al cuerpo del documento, a pantalla completa; lo demás se oculta.
    const s=document.getElementById('sim3d');document.body.append(s);
    const st=document.createElement('style');st.textContent='body>*:not(#sim3d){display:none!important}html,body{overflow:hidden!important;background:#000!important}';document.head.append(st);
    Object.assign(s.style,{position:'fixed',left:'0',top:'0',width:'${W}px',height:'${H}px',zIndex:'2147483646',borderRadius:'0',border:'0',aspectRatio:'auto'});
    await new Promise(r=>setTimeout(r,300));
    followerRide.useSimClock(true);
    const out=document.createElement('canvas');out.width=${W};out.height=${H};const g=out.getContext('2d');
    const box=(x,y,w,h,r,c)=>{g.beginPath();g.roundRect(x,y,w,h,r);g.fillStyle=c;g.fill();};
    window.grab=(title)=>{
      followerTrack.advance(${1 / FPS});followerRide.renderNow();
      g.drawImage(document.querySelector('#sim3d canvas'),0,0,${W},${H});
      const t=followerTrack.state,line='SI '+t.sensors.SI+' · SD '+t.sensors.SD+' · SEL '+t.selector+'   →   motor izq. '+t.motors.left+' · der. '+t.motors.right+'   ·   vueltas '+Math.max(0,followerTrack.laps()).toFixed(1);
      g.font='800 22px Segoe UI, system-ui, sans-serif';const w1=g.measureText(title).width;g.font='500 18px Segoe UI, system-ui, sans-serif';const w2=g.measureText(line).width;
      box(26,${H}-104,Math.max(w1,w2)+36,80,13,'rgba(10,16,13,.74)');
      g.fillStyle='#f4fff9';g.font='800 22px Segoe UI, system-ui, sans-serif';g.fillText(title,44,${H}-70);
      g.fillStyle='#cfe9dc';g.font='500 18px Segoe UI, system-ui, sans-serif';g.fillText(line,44,${H}-41);
      const brand='Protoboards · AGV seguidor de línea';g.font='700 17px Segoe UI, system-ui, sans-serif';const wb=g.measureText(brand).width;
      box(${W}-wb-52,22,wb+28,38,10,'rgba(10,16,13,.62)');g.fillStyle='#f4fff9';g.fillText(brand,${W}-wb-38,47);
      return out.toDataURL('image/jpeg',.93).split(',')[1];
    };
    return true;})()`);
  let n = 0;
  const T = Number(perTrack), t0 = Date.now();
  for (const [mode, title] of [['negra', 'Pista blanca con cinta negra · SW1 en NEGRA'], ['blanca', 'Pista negra con cinta blanca · SW1 en BLANCA']]) {
    await evaluate(`followerTrack.pause();followerTrack.setMode('${mode}');followerTrack.reset();followerRide.resetTrail();followerRide.setCameraNow('arriba');true`);
    const cuts = [[3.5, 'seguir'], [T - 4.5, 'arriba']];
    for (let f = 0; f < T * FPS; f++) {
      const t = f / FPS, cut = cuts.find(([at]) => Math.abs(at - t) < 1e-6);
      if (cut) await evaluate(`followerRide.setCamera('${cut[1]}');true`);
      const data = await evaluate(`grab(${JSON.stringify(title)})`);
      fs.writeFileSync(path.join(framesDir, 'f' + String(++n).padStart(5, '0') + '.jpg'), Buffer.from(data, 'base64'));
      if (f % 90 === 0) console.log(mode, t.toFixed(1) + ' s', await evaluate('followerTrack.state.status+" "+followerTrack.laps().toFixed(2)'), ((Date.now() - t0) / n).toFixed(0) + ' ms/cuadro');
    }
  }
  ws.close(); browser.kill();
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(framesDir, 'f%05d.jpg'), '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]);
  console.log('VIDEO', out, fs.statSync(out).size, 'bytes,', n, 'cuadros');
})().catch(e => { console.error(e); browser.kill(); process.exit(1); });
