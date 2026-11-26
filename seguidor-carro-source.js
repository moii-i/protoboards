// Visor del ensamblado del AGV: carga el modelo de Blender (protoboard-ah/agv/agv-seguidor.glb)
// y lo arma por pasos. Cada nodo paso_N del GLB es una etapa; las anteriores quedan en su
// lugar y la actual entra con una transición corta. Se compila con build-seguidor-carro.cjs.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const ease = t => 1 - Math.pow(1 - t, 3);

/**
 * steps: [{offset:[x,y,z] (m, de dónde llega), camera:[x,y,z], target:[x,y,z]}]
 * El modelo usa metros con Y hacia arriba y el frente del carrito hacia -Z.
 */
export function createAssembly({ container, url, steps, background = '#e7ece6', motion = () => true, onReady, onFailure }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.AgXToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.append(renderer.domElement);
  const scene = new THREE.Scene(); scene.background = new THREE.Color(background);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture; scene.environmentIntensity = .9;
  const camera = new THREE.PerspectiveCamera(32, 1, .005, 5);
  camera.position.set(.34, .24, -.42);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, .04, -.035); controls.enableDamping = true; controls.dampingFactor = .12;
  controls.minDistance = .12; controls.maxDistance = 1.1; controls.maxPolarAngle = Math.PI * .56;
  const sun = new THREE.DirectionalLight(0xfff6ea, 2.2); sun.position.set(.35, .6, -.25); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -.25, right: .25, top: .25, bottom: -.25, near: .1, far: 1.5 }); sun.shadow.bias = -.0004; sun.shadow.radius = 4;
  scene.add(sun, new THREE.HemisphereLight(0xffffff, 0x9aa39e, .55));
  // Tapete claro con la cinta negra de la pista: colores físicos, no cambian con el tema.
  const floorShape = new THREE.Shape(), fw = .32, fd = .52, fr = .05;
  floorShape.moveTo(-fw + fr, -fd); floorShape.lineTo(fw - fr, -fd); floorShape.quadraticCurveTo(fw, -fd, fw, -fd + fr); floorShape.lineTo(fw, fd - fr); floorShape.quadraticCurveTo(fw, fd, fw - fr, fd);
  floorShape.lineTo(-fw + fr, fd); floorShape.quadraticCurveTo(-fw, fd, -fw, fd - fr); floorShape.lineTo(-fw, -fd + fr); floorShape.quadraticCurveTo(-fw, -fd, -fw + fr, -fd);
  const floor = new THREE.Mesh(new THREE.ShapeGeometry(floorShape, 8), new THREE.MeshStandardMaterial({ color: 0xebeae4, roughness: .93, envMapIntensity: .6 }));
  floor.rotation.x = -Math.PI / 2; floor.position.z = -.06; floor.receiveShadow = true; scene.add(floor);
  const tape = new THREE.Mesh(new THREE.PlaneGeometry(.019, 1.04), new THREE.MeshStandardMaterial({ color: 0x0f1011, roughness: .78, envMapIntensity: .35 }));
  tape.rotation.x = -Math.PI / 2; tape.position.set(0, .0004, -.06); tape.receiveShadow = true; scene.add(tape);

  const parts = []; let current = -1, anim = null, frame = 0, disposed = false, visible = true;
  // Piezas de fijación (tornillos, tuercas, separadores, sujetadores, ruedas): entran solas por su eje
  // después de la pieza que sujetan. userData viene de Blender: insert (dirección de llegada en
  // coordenadas de Blender), dist (mm) y spin (gira como tornillo).
  const spinQ = new THREE.Quaternion();
  function collectFixings(node) {
    const list = [];
    node.traverse(o => {
      const d = o.userData; if (o === node || !Array.isArray(d?.insert)) return;
      const axis = new THREE.Vector3(d.insert[0], d.insert[2], -d.insert[1]).normalize();
      list.push({ obj: o, home: o.position.clone(), quat: o.quaternion.clone(), axis, dist: (d.dist || 12) / 1000, spin: Boolean(d.spin) });
    });
    return list;
  }
  function settle(p) { for (const f of p.fixings) { f.obj.visible = true; f.obj.position.copy(f.home); f.obj.quaternion.copy(f.quat); } }
  const tmp = new THREE.Vector3();
  function render() { frame = 0; if (disposed) return; const live = tick(performance.now()); controls.update(); renderer.render(scene, camera); if (live) request(); }
  function request() { if (!frame && visible) frame = requestAnimationFrame(render); }
  controls.addEventListener('change', request);
  function tick(now) {
    if (!anim) return false;
    const elapsed = now - anim.start, t = Math.min(1, elapsed / anim.duration), k = ease(t);
    for (const p of anim.parts) p.node.position.copy(p.home).addScaledVector(p.offset, 1 - k);
    camera.position.lerpVectors(anim.fromCam, anim.toCam, k); controls.target.lerpVectors(anim.fromTarget, anim.toTarget, k);
    let pending = false;
    for (const f of anim.fixings) {
      const ft = (elapsed - f.delay) / 620;
      if (ft <= 0) { f.obj.visible = false; pending = true; continue; }
      const fk = ease(Math.min(1, ft)); f.obj.visible = true;
      f.obj.position.copy(f.home).addScaledVector(f.axis, f.dist * (1 - fk));
      if (f.spin) f.obj.quaternion.copy(spinQ.setFromAxisAngle(f.axis, (1 - fk) * Math.PI * 6)).multiply(f.quat);
      if (ft < 1) pending = true; else f.obj.quaternion.copy(f.quat);
    }
    if (t >= 1 && !pending) { anim = null; return true; }
    return true;
  }
  function goTo(index) {
    index = Math.max(0, Math.min(steps.length - 1, index));
    const step = steps[index], entering = [];
    parts.forEach((p, i) => {
      const show = i <= (step.parts ?? index);
      if (show && !p.node.visible && i === (step.parts ?? index)) entering.push(p);
      p.node.visible = show; p.node.position.copy(p.home); settle(p);
    });
    const animate = motion();
    for (const p of entering) if (animate) p.node.position.copy(p.home).add(p.offset);
    // Primero llega la pieza principal; luego cada fijación, una tras otra.
    const fixings = [];
    for (const p of entering) {
      const start = p.hasMain ? 520 : 120;
      p.fixings.forEach((f, i) => { f.delay = start + i * 70; f.obj.visible = !animate; fixings.push(f); });
    }
    const toCam = new THREE.Vector3(...step.camera), toTarget = new THREE.Vector3(...step.target);
    if (animate) anim = { start: performance.now(), duration: 720, parts: entering, fixings, fromCam: camera.position.clone(), toCam, fromTarget: controls.target.clone(), toTarget };
    else { anim = null; camera.position.copy(toCam); controls.target.copy(toTarget); }
    current = index; request();
    return index;
  }
  function resize() {
    const w = container.clientWidth || 800, h = container.clientHeight || 500;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); request();
  }
  const ro = new ResizeObserver(resize); ro.observe(container);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) request(); }); io.observe(container);
  resize();

  new GLTFLoader().load(url, gltf => {
    if (disposed) return;
    const root = gltf.scene;
    root.traverse(o => {
      if (!o.isMesh) return;
      o.castShadow = true; o.receiveShadow = true;
      const m = o.material;
      // El acrílico transparente refracta el entorno; un poco de grosor lo hace creíble.
      if (/Hule|Cinta/.test(m.name)) { m.roughness = .95; m.envMapIntensity = .35; }
      if (m.transmission > 0) { m.thickness = .003; m.roughness = Math.max(m.roughness, .03); m.envMapIntensity = 1.1; o.castShadow = false; }
    });
    scene.add(root);
    for (let i = 1; root.getObjectByName('paso_' + i); i++) {
      const node = root.getObjectByName('paso_' + i), offset = new THREE.Vector3(...(steps[i - 1]?.offset || [0, .06, 0]));
      const fixings = collectFixings(node), fixed = new Set(fixings.map(f => f.obj));
      const hasMain = node.children.some(c => !fixed.has(c));
      parts.push({ node, home: node.position.clone(), offset, fixings, hasMain });
    }
    goTo(0); onReady?.(parts.length);
  }, undefined, error => onFailure?.(error));

  return {
    goTo,
    get step() { return current; },
    get parts() { return parts.length; },
    setBackground(color) { scene.background.set(color); request(); },
    diagnostics() { const info = renderer.info.render; return { calls: info.calls, triangles: info.triangles, step: current, parts: parts.length, fixings: parts.map(p => p.fixings.length), animating: Boolean(anim), visible: parts.map(p => p.node.visible), camera: camera.position.toArray(), target: controls.target.toArray() }; },
    dispose() { disposed = true; cancelAnimationFrame(frame); ro.disconnect(); io.disconnect(); controls.dispose(); renderer.dispose(); pmrem.dispose(); renderer.domElement.remove(); }
  };
}

// ---------- Recorrido en 3D: el mismo carrito sobre la pista de la simulación ----------
/**
 * Dibuja la simulación de seguidor-sim.mjs con el modelo real. No calcula el recorrido:
 * update(state, dt, center) recibe el estado (mm, s, rad) y mueve el carrito, gira cada rueda con
 * la velocidad de su motor y pinta lo que lee cada sensor. track.path y mat en mm; car en mm.
 * Pista en el plano XZ (x = x del tapete, z = y del tapete) y carrito con su frente hacia −Z.
 */
export function createRide({ container, url, track, mat, car, background = '#e7ece6', mode = 'negra', onReady, onFailure }) {
  const MM = .001, W = mat.width * MM, H = mat.height * MM;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.AgXToneMapping; renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.append(renderer.domElement);
  // Estudio claro y parejo (no depende del tema): la mesa se funde con el fondo por la niebla. El fondo es una
  // cúpula con el mismo color que la niebla para que el horizonte no se note (los dos pasan por el mismo mapeo de tono).
  const studio = new THREE.Color('#d6dbd6');
  const scene = new THREE.Scene(); scene.fog = new THREE.Fog(studio, 2, 5.6);
  const dome = new THREE.Mesh(new THREE.SphereGeometry(9, 32, 16), new THREE.MeshBasicMaterial({ color: studio, side: THREE.BackSide, fog: false, depthWrite: false }));
  dome.position.set(mat.width * MM / 2, 0, mat.height * MM / 2); dome.renderOrder = -1; scene.add(dome);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture; scene.environmentIntensity = .85;
  const camera = new THREE.PerspectiveCamera(38, 1.5, .01, 20);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = .12; controls.enabled = false;
  controls.minDistance = .14; controls.maxDistance = 3.2; controls.maxPolarAngle = Math.PI * .47;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8d958f, .6));
  // El sol acompaña al carrito: la sombra nítida solo hace falta alrededor de él.
  const sun = new THREE.DirectionalLight(0xfff5e6, 2.1); sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -.3, right: .3, top: .3, bottom: -.3, near: .1, far: 2.4 });
  sun.shadow.bias = -.0005; sun.shadow.normalBias = .002; sun.shadow.radius = 3;
  scene.add(sun, sun.target);

  // Mesa bajo el tapete (se pierde en la niebla) y el tapete de cartulina con la cinta de 19 mm.
  const table = new THREE.Mesh(new THREE.PlaneGeometry(14, 14), new THREE.MeshStandardMaterial({ color: 0xc4cac5, roughness: .95, envMapIntensity: .4 }));
  table.rotation.x = -Math.PI / 2; table.position.set(W / 2, -.003, H / 2); table.receiveShadow = true; scene.add(table);
  const board = new THREE.Mesh(new THREE.BoxGeometry(W, .0025, H), new THREE.MeshStandardMaterial({ color: 0x9aa09b, roughness: .9 }));
  board.position.set(W / 2, -.00125, H / 2); board.receiveShadow = true; scene.add(board);
  const paper = document.createElement('canvas'); paper.width = 2560; paper.height = Math.round(2560 * mat.height / mat.width);
  const texture = new THREE.CanvasTexture(paper); texture.colorSpace = THREE.SRGBColorSpace; texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const surface = new THREE.Mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshStandardMaterial({ map: texture, roughness: .9, envMapIntensity: .55 }));
  surface.rotation.x = -Math.PI / 2; surface.position.set(W / 2, .0002, H / 2); surface.receiveShadow = true; scene.add(surface);
  const colors = { negra: { floor: '#f2f1eb', line: '#141618' }, blanca: { floor: '#17191b', line: '#f1f0ea' } };
  function paintMat(m) {
    const ctx = paper.getContext('2d'), s = paper.width / mat.width, c = colors[m] || colors.negra;
    ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = c.floor; ctx.fillRect(0, 0, paper.width, paper.height);
    ctx.setTransform(s, 0, 0, s, 0, 0); ctx.lineJoin = ctx.lineCap = 'round';
    ctx.beginPath(); track.path.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath();
    ctx.strokeStyle = c.line; ctx.lineWidth = mat.line; ctx.stroke();
    const [x0, y0] = track.path[0], [x1, y1] = track.path[3], a = Math.atan2(y1 - y0, x1 - x0);
    ctx.save(); ctx.translate(x0, y0); ctx.rotate(a); ctx.fillStyle = '#c9a256'; ctx.fillRect(-3, -48, 6, 30); ctx.fillRect(-3, 18, 6, 30); ctx.restore();
    texture.needsUpdate = true;
  }
  paintMat(mode);

  // Carrito: el GLB del ensamblado completo. Ruedas, rines y encoders giran sobre su eje.
  const carRoot = new THREE.Group(); scene.add(carRoot);
  const wheels = []; let angleL = 0, angleR = 0, ready = false;
  const ringGeo = new THREE.RingGeometry(.0034, .0052, 32);
  // Lectura de cada sensor sobre el piso: verde si ve la línea (SI ⊕ SEL = 1).
  const readings = ['SI', 'SD'].map((name, i) => {
    const m = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0x9aa5a0, transparent: true, opacity: .95, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }));
    m.rotation.x = -Math.PI / 2; m.position.set((i ? 1 : -1) * car.sensorGap / 2 * MM, .0009, -car.sensorAhead * MM); m.renderOrder = 2; carRoot.add(m); return m;
  });
  // LED de salida (D0) de cada módulo: se enciende con superficie blanca, igual que el MH-Sensor-Series.
  const leds = [[-.030, .0143, -.1162], [.030, .0143, -.1198]].map(p => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(.0011, 12, 8), new THREE.MeshBasicMaterial({ color: 0x46ff84 })); m.position.set(...p); m.visible = false; carRoot.add(m); return m;
  });
  // Rastro de los sensores sobre la cinta.
  const TRAIL = 380, trailPos = new Float32Array(TRAIL * 3); let trailCount = 0;
  const trailGeo = new THREE.BufferGeometry(); trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3)); trailGeo.setDrawRange(0, 0);
  const trail = new THREE.Line(trailGeo, new THREE.LineBasicMaterial({ color: 0x3ddc97, transparent: true, opacity: .55, depthWrite: false })); trail.frustumCulled = false; scene.add(trail);
  function pushTrail([x, y]) {
    if (trailCount) { const i = (trailCount - 1) * 3; if (Math.hypot(trailPos[i] - x * MM, trailPos[i + 2] - y * MM) < .004) return; }
    if (trailCount === TRAIL) { trailPos.copyWithin(0, 3); trailCount--; }
    trailPos.set([x * MM, .0011, y * MM], trailCount * 3); trailCount++;
    trailGeo.attributes.position.needsUpdate = true; trailGeo.setDrawRange(0, trailCount);
  }

  // Cámaras: seguir al carrito, toda la pista o libre (órbita que acompaña al carrito).
  let camMode = 'seguir', frame = 0, visible = true, disposed = false, last = performance.now(), snapNext = true, simClock = false, simDt = 0;
  const desiredPos = new THREE.Vector3(), desiredTarget = new THREE.Vector3(), lookAt = new THREE.Vector3(), lastCar = new THREE.Vector3();
  const tmp = new THREE.Vector3(), up = new THREE.Vector3(0, 1, 0);
  const overview = { pos: new THREE.Vector3(W / 2, 1.38, H / 2 + 1.52), target: new THREE.Vector3(W / 2, 0, H / 2 + .04) };
  const motionOK = () => !matchMedia('(prefers-reduced-motion: reduce)').matches;
  function desired() {
    if (camMode === 'arriba') { desiredPos.copy(overview.pos); desiredTarget.copy(overview.target); return; }
    // Detrás y arriba del carrito (su +Z local es la parte trasera), mirando un poco por delante de los sensores.
    desiredPos.set(.06, .155, .37).applyAxisAngle(up, carRoot.rotation.y).add(carRoot.position);
    desiredTarget.set(0, .018, -.13).applyAxisAngle(up, carRoot.rotation.y).add(carRoot.position);
  }
  function setCamera(name) {
    camMode = name; controls.enabled = name === 'libre';
    if (name === 'libre') {
      controls.target.copy(carRoot.position).add(tmp.set(0, .035, 0));
      camera.position.copy(carRoot.position).add(tmp.set(.34, .26, .34));
      camera.lookAt(controls.target); controls.update();
    } else snapNext = !motionOK();
    request();
  }

  function render() {
    frame = 0; if (disposed) return;
    const now = performance.now(), dt = simClock ? simDt : Math.min(.1, (now - last) / 1000); last = now; simDt = 0;
    let moving = false;
    if (camMode === 'libre') moving = controls.update();
    else {
      desired();
      if (snapNext) { camera.position.copy(desiredPos); lookAt.copy(desiredTarget); snapNext = false; }
      else {
        const k = 1 - Math.exp(-dt * (camMode === 'arriba' ? 3 : 4.5));
        camera.position.lerp(desiredPos, k); lookAt.lerp(desiredTarget, k);
        moving = camera.position.distanceToSquared(desiredPos) > 1e-8 || lookAt.distanceToSquared(desiredTarget) > 1e-8;
      }
      camera.lookAt(lookAt);
    }
    renderer.render(scene, camera);
    if (moving) request();
  }
  function request() { if (!frame && visible && !disposed) frame = requestAnimationFrame(render); }
  controls.addEventListener('change', request);

  /** state: estado de createSim · dt: segundos simulados (0 = solo redibujar) · center: punto entre sensores (mm). */
  function update(state, dt = 0, center) {
    carRoot.position.set(state.x * MM, 0, state.y * MM); carRoot.rotation.y = -state.heading - Math.PI / 2;
    if (camMode === 'libre') { tmp.subVectors(carRoot.position, lastCar); camera.position.add(tmp); controls.target.add(tmp); }
    lastCar.copy(carRoot.position);
    // Rodar hacia adelante (−Z) es girar en sentido negativo sobre X: ángulo = −v / r.
    simDt += dt;
    const r = car.wheel / 2; angleL -= state.vl / r * dt; angleR -= state.vr / r * dt;
    for (const w of wheels) w.obj.rotation.x = w.left ? angleL : angleR;
    ['SI', 'SD'].forEach((name, i) => {
      const onLine = (state.sensors[name] ^ state.selector) === 1;
      readings[i].material.color.set(onLine ? 0x2fd486 : 0x9aa5a0);
      leds[i].visible = state.sensors[name] === 0;
    });
    sun.position.copy(carRoot.position).add(tmp.set(.55, 1.1, .4)); sun.target.position.copy(carRoot.position);
    if (center) pushTrail(center);
    request();
  }

  function resize() {
    const w = container.clientWidth || 900, h = container.clientHeight || 600;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); request();
  }
  const ro = new ResizeObserver(resize); ro.observe(container);
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { last = performance.now(); request(); } }); io.observe(container);
  resize();

  new GLTFLoader().load(url, async gltf => {
    if (disposed) return;
    const root = gltf.scene;
    root.traverse(o => {
      if (/Llanta|Rin_de|Rin de|Encoder/.test(o.name) && o.parent?.name?.startsWith('paso_')) wheels.push({ obj: o, left: /izquierd/.test(o.name) });
      if (!o.isMesh) return;
      o.castShadow = true; o.receiveShadow = true;
      const m = o.material;
      if (m.transmission > 0) { m.thickness = .003; m.roughness = Math.max(m.roughness, .03); m.envMapIntensity = 1.1; o.castShadow = false; }
    });
    carRoot.add(root);
    try { await renderer.compileAsync?.(scene, camera); } catch {}
    ready = true; snapNext = true; onReady?.(); request();
  }, undefined, error => onFailure?.(error));

  return {
    update, setCamera, request,
    setMode(m) { paintMat(m); request(); },
    resetTrail() { trailCount = 0; trailGeo.setDrawRange(0, 0); request(); },
    setBackground() { /* estudio fijo: colores físicos que no cambian con el tema */ },
    /** Dibuja ya (para grabar cuadro por cuadro sin esperar al siguiente requestAnimationFrame). */
    renderNow() { cancelAnimationFrame(frame); frame = 0; render(); },
    /** true: la cámara se suaviza con el tiempo simulado (grabación cuadro por cuadro), no con el reloj. */
    useSimClock(on) { simClock = Boolean(on); simDt = 0; },
    setCameraNow(name) { this.setCamera(name); snapNext = true; },
    get camera() { return camMode; },
    diagnostics() {
      const info = renderer.info.render;
      return { ready, camera: camMode, wheels: wheels.length, angle: [angleL, angleR], car: carRoot.position.toArray(), heading: carRoot.rotation.y, trail: trailCount, calls: info.calls, triangles: info.triangles };
    },
    dispose() { disposed = true; cancelAnimationFrame(frame); ro.disconnect(); io.disconnect(); controls.dispose(); renderer.dispose(); pmrem.dispose(); texture.dispose(); renderer.domElement.remove(); }
  };
}
