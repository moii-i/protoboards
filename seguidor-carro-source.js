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
