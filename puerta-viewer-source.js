import {createComponentRig} from './protoboard-ah/component-placement-3d.mjs';
import {createComponentHologram} from './protoboard-ah/component-hologram-3d.mjs';
import {buildExternalControl,updateExternalControl,revealExternalCable,externalCableCurve} from './external-controls-geometry.mjs';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import {pitch,resistor,display as displaySpec,jumper,componentGrain,resistorBandDigits,resistorBodyGeometry,displayLensGeometry} from './component-geometry.mjs';

// Positions come from the same hole coordinates as the SVG, at one unit per pitch.
// Cable bends are illustrative; their two endpoints define the electrical connection.
export function createViewer({container, model, point, hole, onConnection, onPin, onSwitch, onFailure, onChip=()=>{}, onHole=()=>{}}) {
  const counter=model.presentation==='contador';
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#edf1ed');
  const camera = new THREE.PerspectiveCamera(40, 1, .1, 1600);
  const renderer = new THREE.WebGLRenderer({antialias:true, alpha:false});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  container.append(renderer.domElement);
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute('aria-label', 'Circuito en 3D. Arrastra para girar; usa la rueda para acercar. La lista de conexiones ofrece los mismos detalles con teclado.');
  canvas.setAttribute('aria-describedby', 'threeHelp');
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = .13;
  controls.minDistance = 5;
  controls.maxDistance = 500;
  controls.minPolarAngle = .01;
  controls.maxPolarAngle = Math.PI / 2 - .05;
  controls.listenToKeyEvents(canvas);
  controls.zoomToCursor = true;
  scene.add(new THREE.HemisphereLight(0xffffff, 0xb3bcb8, 2.4));
  const light = new THREE.DirectionalLight(0xffffff, 3.2);
  light.position.set(-25, 65, 30);
  scene.add(light);
  const fill = new THREE.DirectionalLight(0xe4f0ff, 1.1);
  fill.position.set(35, 25, -30);scene.add(fill);
  const connections = new Map(), pickables = [], pinMeshes = [], pinLabels = new Map(), arrayPinMeshes = [], switches = [], segments = new Map(), ledLenses = new Map(), ledGlows = new Map();
  let contactStates={};let potSlot=null;const externalControlBodies=[],externalMotorWiring=[];let externalCablePose=null;
  const dummy = new THREE.Object3D();
  const componentGroups=new Map(),placementGuides=new THREE.Group();scene.add(placementGuides);
  let placementPose=null,placementGuideId=null;
  function collectComponent(id,before,holes){
    const children=scene.children.filter(o=>!before.has(o)&&!o.userData.softShadow),group=new THREE.Group();
    children.forEach(o=>group.add(o));scene.add(group);componentGroups.set(id,{group,holes,home:group.position.clone()});
  }
  const chipBodies=new Map(),stripGroup=new THREE.Group();scene.add(stripGroup);let stripStamp="",assemblyPose={id:null,progress:1};
  const plastic = new THREE.MeshStandardMaterial({color:0xfaf9ef, roughness:.82});
  const dark = new THREE.MeshStandardMaterial({color:0x222a2d, roughness:.7});
  const metal = new THREE.MeshStandardMaterial({color:0xb6c0c1, roughness:.35, metalness:.7});
  const grain=componentGrain();
  const textured=(color,roughness,bumpScale=.025)=>new THREE.MeshStandardMaterial({color,roughness,bumpMap:grain,bumpScale});
  const moldedEpoxy=textured('#202126',.64,.018);
  const resistorBody=resistorBodyGeometry(),resistorShell=textured(resistor.shell,.57);
  const bandMaterials=resistor.palette.map(color=>textured(color,.47));
  const goldBand=new THREE.MeshStandardMaterial({color:resistor.gold,roughness:.4,metalness:.35,bumpMap:grain,bumpScale:.018});
  const displayHousing=textured(displaySpec.housing,.43),displayFace=textured(displaySpec.face,.56);
  const lensShapes=Object.fromEntries(Object.entries(displaySpec.segments).map(([key,points])=>[key,displayLensGeometry(points)]));
  const [decimalX,decimalZ,decimalRadius]=displaySpec.decimal;
  lensShapes.dp=displayLensGeometry(Array.from({length:16},(_,i)=>[decimalX+decimalRadius*Math.cos(i*Math.PI/8),decimalZ+decimalRadius*Math.sin(i*Math.PI/8)]));
  const flexible=jumper.flexible;
  const bootWidth=flexible.housingWidth/pitch,bootLength=flexible.housingLength/pitch;
  const bootBase=.18,bootTop=bootBase+bootLength,collarHeight=.65,collarBase=bootTop-.14;
  const jacketPort=collarBase+collarHeight-.05,insertionTravel=.85;
  const bootGeometry=new RoundedBoxGeometry(bootWidth,bootLength,bootWidth,2,.073);
  const bootMaterial=textured('#27282b',.51,.016);
  const collarMaterial=textured('#303136',.56,.014);
  const collarGeometry=new THREE.CylinderGeometry(.23,flexible.strainReliefDiameter/pitch/2,collarHeight,16);
  const contactWidth=flexible.contactWidth/pitch;
  const contactGeometry=new RoundedBoxGeometry(contactWidth,.48,contactWidth,1,.027);
  const contactMaterial=new THREE.MeshStandardMaterial({color:0xb3a071,roughness:.36,metalness:.46});
  const seamGeometry=new THREE.BoxGeometry(.022,bootLength-.42,.025);
  const latchGeometry=new RoundedBoxGeometry(.3,.49,.045,1,.02);
  const solidTipGeometry=new THREE.CylinderGeometry(jumper.solid.conductorDiameter/pitch/2,jumper.solid.conductorDiameter/pitch/2,.32,8);
  const centerX=model.bounds[0]+model.bounds[2]/2,centerZ=model.bounds[1]+model.bounds[3]/2;
  const toWorld = ([x,z], y=.1) => new THREE.Vector3((x-centerX)/30, y, (z-centerZ)/30);
  const hpos = (h,y=.1) => toWorld(point(h),y);
  let active = false, raf = 0, cameraTween = null, routeTween = null, settleFrames = 0, snapshot = null;
  let lastBox = [...model.bounds], topView = false, lastPins = '', selectedId = null;
  let fitDistance=1,viewAppearance={quality:'auto',background:'#edf1ed',motion:'full'},selectionStyle={scale:1,intensity:1};
  let renderedFrames = 0, moved = false, wireClarity = true, isolateWires = false;
  const componentHologram=createComponentHologram({THREE,scene,container,camera,canvas,requestRender});
  const signalTrace=new THREE.Group();scene.add(signalTrace);let signalStamp='',signalPose=null,signalBuilds=0;
  function updateSignalTrace(value){
    signalPose=value?.active?value:null;const ids=signalPose?.ids||[],stamp=ids.join('|');
    if(stamp!==signalStamp){signalTrace.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});signalTrace.clear();signalStamp=stamp;
      for(const id of ids){const c=connections.get(id);if(!c||c.it.kind!=='wire')continue;
        const geometry=new LineGeometry();geometry.setPositions(Array.from({length:c.wire.geometry.parameters.tubularSegments+1},(_,i)=>c.curve.getPointAt(i/c.wire.geometry.parameters.tubularSegments)).flatMap(p=>p.toArray()));
        for(const [color,width]of [[0xe1b445,8],[c.material.color,3]]){const material=new LineMaterial({color,linewidth:width,worldUnits:false,transparent:true,depthTest:false,depthWrite:false,toneMapped:false});const line=new Line2(geometry,material);line.userData.signal=id;line.renderOrder=21;line.frustumCulled=false;signalTrace.add(line);}signalBuilds++;
      }
    }
    const rect=container.getBoundingClientRect();signalTrace.visible=Boolean(signalPose);
    for(const line of signalTrace.children){line.visible=Boolean(connections.get(line.userData.signal)?.group.visible);line.material.opacity=signalPose?.value===1?.9:.5;line.material.resolution.set(rect.width||1,rect.height||1);}
  }
  function setSignals(value){
    if(JSON.stringify(value||null)===JSON.stringify(signalPose))return;
    if(snapshot)update({...snapshot,studio:{...snapshot.studio,signals:value}});
    else{updateSignalTrace(value);requestRender();}
  }

  function mesh(geometry, material, position, parent=scene) {
    const m = new THREE.Mesh(geometry, material);
    m.position.copy(position); parent.add(m); return m;
  }
  function box(width,height,depth,pos,material,parent=scene) {
    return mesh(new THREE.BoxGeometry(width,height,depth),material,pos,parent);
  }
  function roundedBox(width,height,depth,pos,material,parent=scene,radius=.08){return mesh(new RoundedBoxGeometry(width,height,depth,2,radius),material,pos,parent);}
  function lead(points,parent,radius=.046){return mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points,false,'centripetal'),16,radius,8,false),metal.clone(),new THREE.Vector3(),parent);}
  // Fillets stay inside each orthogonal corner. Catmull-Rom splines may bow
  // outside the planned lanes and back across components, so routed jumpers
  // use short straight segments joined by quadratic bends instead.
  function roundedRoute(points,radius=.22){
    const clean=points.filter((p,i)=>i===0||p.distanceTo(points[i-1])>1e-6),path=new THREE.CurvePath();
    let cursor=clean[0];
    for(let i=1;i<clean.length-1;i++){
      const corner=clean[i],before=clean[i-1],after=clean[i+1],r=Math.min(radius,before.distanceTo(corner)/3,after.distanceTo(corner)/3);
      const enter=corner.clone().addScaledVector(before.clone().sub(corner).normalize(),r),leave=corner.clone().addScaledVector(after.clone().sub(corner).normalize(),r);
      if(cursor.distanceTo(enter)>1e-6)path.add(new THREE.LineCurve3(cursor,enter));
      path.add(new THREE.QuadraticBezierCurve3(enter,corner,leave));cursor=leave;
    }
    const end=clean[clean.length-1];if(cursor.distanceTo(end)>1e-6)path.add(new THREE.LineCurve3(cursor,end));
    return path;
  }
  function flexibleRoute(a,b,route,height){
    const points=(route||[a,b]).map(p=>p.clone().setY(height)).filter((p,i,list)=>!i||p.distanceTo(list[i-1])>1e-6);
    const first=points[0],last=points.at(-1);
    const startDirection=points[1].clone().sub(first).normalize(),endDirection=last.clone().sub(points.at(-2)).normalize();
    const startRun=Math.min(2.45,first.distanceTo(points[1])*.44),endRun=Math.min(2.45,last.distanceTo(points.at(-2))*.44);
    const enter=first.clone().addScaledVector(startDirection,startRun),leave=last.clone().addScaledVector(endDirection,-endRun);
    const start=a.clone().add(new THREE.Vector3(0,jacketPort,0)),end=b.clone().add(new THREE.Vector3(0,jacketPort,0));
    const raisedStart=start.clone().add(new THREE.Vector3(0,.62,0)),raisedEnd=end.clone().add(new THREE.Vector3(0,insertionTravel,0));
    const curve=new THREE.CurvePath();
    // CurvePath already parameterizes by length. Use the same distances for the tube and its outline.
    curve.getPointAt=curve.getPoint.bind(curve);
    curve.getTangentAt=curve.getTangent.bind(curve);
    curve.add(new THREE.LineCurve3(start,raisedStart));
    curve.add(new THREE.CubicBezierCurve3(raisedStart,raisedStart.clone().add(new THREE.Vector3(0,.62,0)),enter.clone().addScaledVector(startDirection,-startRun*.52),enter));
    for(const piece of roundedRoute([enter,...points.slice(1,-1),leave]).curves)curve.add(piece);
    curve.add(new THREE.CubicBezierCurve3(leave,leave.clone().addScaledVector(endDirection,endRun*.52),raisedEnd.clone().add(new THREE.Vector3(0,.64,0)),raisedEnd));
    curve.add(new THREE.LineCurve3(raisedEnd,end));
    return curve;
  }
  function flexiblePlug(end,parent,materials,id){
    const plug=new THREE.Group();plug.position.copy(end);parent.add(plug);
    const add=(geometry,material,x,y,z)=>mesh(geometry,material,new THREE.Vector3(x,y,z),plug);
    const pin=add(contactGeometry,materials.pin,0,bootBase-.18,0);
    const housing=add(bootGeometry,materials.housing,0,bootBase+bootLength/2,0);
    const collar=add(collarGeometry,materials.collar,0,collarBase+collarHeight/2,0);
    for(const face of [-1,1]){
      add(seamGeometry,materials.collar,bootWidth*.28,bootBase+bootLength/2,face*bootWidth*.499);
      add(latchGeometry,materials.collar,0,bootBase+bootLength*.37,face*bootWidth*.499);
    }
    for(const part of [pin,housing,collar]){part.userData={id};pickables.push(part);}
    return plug;
  }
  function texture(draw,width=1024,height=512) {
    const c=document.createElement('canvas');c.width=width;c.height=height;
    draw(c.getContext('2d'),width,height);
    const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());return t;
  }
  function topLabel(text,position,width,depth,{color='#dbe5e1',background='#222a2d',size=48}={}) {
    const t=texture((ctx,w,h)=>{ctx.fillStyle=background;ctx.fillRect(0,0,w,h);ctx.fillStyle=color;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='600 '+size+'px Arial';text.split('\n').forEach((line,i,lines)=>ctx.fillText(line,w/2,h/2+(i-(lines.length-1)/2)*size*1.45));},512,256);
    const p=mesh(new THREE.PlaneGeometry(width,depth),new THREE.MeshBasicMaterial({map:t}),position);
    p.rotation.x=-Math.PI/2;p.userData.viewerLabel=true;p.userData.labelText=text;return p;
  }
  function moldedDIP(length,center){
    const x=length/2,z=1.23,r=.12;
    const shape=new THREE.Shape();
    shape.moveTo(-x+r,-z);shape.lineTo(x-r,-z);shape.quadraticCurveTo(x,-z,x,-z+r);
    shape.lineTo(x,z-r);shape.quadraticCurveTo(x,z,x-r,z);shape.lineTo(-x+r,z);
    shape.quadraticCurveTo(-x,z,-x,z-r);shape.lineTo(-x,.36);
    shape.bezierCurveTo(-x+.49,.36,-x+.49,-.36,-x,-.36);
    shape.lineTo(-x,-z+r);shape.quadraticCurveTo(-x,-z,-x+r,-z);
    const geometry=new THREE.ExtrudeGeometry(shape,{depth:1.06,bevelEnabled:true,bevelSize:.05,bevelThickness:.06,bevelSegments:2,curveSegments:12});
    geometry.rotateX(-Math.PI/2);
    return mesh(geometry,moldedEpoxy.clone(),center.clone().setY(.27));
  }
  function packageMark(chip,center,length){
    const mark=texture((ctx,w,h)=>{
      ctx.fillStyle='#c7c8c5';ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='600 56px monospace';
      ctx.fillText(chip.label,w/2,h*.37,w*.96);
      ctx.fillStyle='#999c9c';ctx.font='30px monospace';ctx.fillText(chip.id,w/2,h*.71);
    },768,224);
    const label=mesh(new THREE.PlaneGeometry(length-.65,1.75),new THREE.MeshBasicMaterial({map:mark,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1}),center.clone().setY(1.394));
    label.rotation.x=-Math.PI/2;
  }
  const shadowTexture=texture((ctx,w,h)=>{const g=ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,w/2);g.addColorStop(0,'#1b322344');g.addColorStop(.5,'#1b32231b');g.addColorStop(1,'#1b322300');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);},128,128);
  function contactShadow(pos,width,depth,parent=scene){const shadow=mesh(new THREE.PlaneGeometry(width,depth),new THREE.MeshBasicMaterial({map:shadowTexture,transparent:true,depthWrite:false}),pos.clone().setY(.045),parent);shadow.rotation.x=-Math.PI/2;shadow.userData.softShadow=true;return shadow;}
  const glowTexture=texture((ctx,w,h)=>{const g=ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,w/2);g.addColorStop(0,'#ffca9566');g.addColorStop(.3,'#ff6b4638');g.addColorStop(1,'#ff6b4600');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);},128,128);
  for(const [name,b] of Object.entries(model.boards)) {
    const width=(b.columns-1)*30+70, x=60+b.xOffset, z=145+b.yOffset;
    roundedBox(width/30,1.25,605/30,toWorld([x+width/2,z+302.5],-.625),counter?textured('#f2eee5',.79,.015):plastic,scene,.2);
    if(counter)roundedBox((width-65)/30,.12,55/30,toWorld([x+width/2,455.5+b.yOffset],.01),textured('#b9b9af',.91,.012),scene,.06);
    else box((width-45)/30,.06,65/30,toWorld([x+20+(width-45)/2,455.5+b.yOffset],.035),new THREE.MeshStandardMaterial({color:0xd0d8d2,roughness:1}));
    const print=texture((ctx,w,h)=>{
      ctx.scale(w/width,h/605);ctx.fillStyle='#faf9ef';ctx.fillRect(0,0,width,605);
      ctx.font='bold 14px Arial';ctx.fillStyle='#475b52';ctx.fillText(counter?'830 PUNTOS · PASO 2,54 mm':'PLACA '+name+' · '+b.columns+' COLUMNAS',12,23);
      ctx.font='13px Arial';ctx.textAlign='center';
      for(let c=1;c<=b.columns;c++)if(c===1||c%5===0||c===b.columns)ctx.fillText(c,35+(c-1)*30,116);
      ctx.textAlign='left';for(const row of 'abcdefghij')ctx.fillText(row,10,point([name,row,1])[1]-z+5);
      for(const row of ['+T','-T','-B','+B']){
        const y=point([name,row,1])[1]-z;ctx.fillStyle=row[0]==='+'?'#bc444c':'#3e81b5';ctx.fillText(row,8,y+5);ctx.lineWidth=2;
        ctx.strokeStyle=ctx.fillStyle;ctx.beginPath();ctx.moveTo(25,y-13);
        if(b.railBreak){ctx.lineTo(945,y-13);ctx.moveTo(1005,y-13);}
        ctx.lineTo(width-20,y-13);ctx.stroke();
      }
    },2048,640);
    const sheetMaterial=counter?new THREE.MeshStandardMaterial({map:print,roughness:.88,bumpMap:grain,bumpScale:.01}):new THREE.MeshBasicMaterial({map:print});
    const sheet=mesh(new THREE.PlaneGeometry(width/30,605/30),sheetMaterial,toWorld([x+width/2,z+302.5],.008));sheet.rotation.x=-Math.PI/2;
    // One draw call for all recessed contacts on each plate.
    const holes=[];for(const row of [...'abcdefghij','+T','-T','-B','+B'])for(let c=1;c<=b.columns;c++){
      if(row.length>1&&(b.railColumns?!b.railColumns.includes(c):b.railBreak&&c===b.railBreak+1))continue;holes.push([name,row,c]);
    }
    const layers=counter?[[.48,.017,0xcdc9bd,.03],[.36,.039,0x797b72,.022],[.235,.052,0x353938,.01],[.10,.063,0x9a9b91,.005]]:[[.38,.018,0xb8c0b9,0],[.255,.03,0x48514e,0]];
    for(const [size,y,color,radius] of layers){
      const geometry=radius?new RoundedBoxGeometry(size,.024,size,1,radius):new THREE.BoxGeometry(size,.012,size);
      const inst=new THREE.InstancedMesh(geometry,new THREE.MeshStandardMaterial({color,roughness:.87}),holes.length);
      holes.forEach((h,i)=>{dummy.position.copy(hpos(h,y));dummy.updateMatrix();inst.setMatrixAt(i,dummy.matrix);});scene.add(inst);inst.userData={holes};if(!counter||size===.48)pickables.push(inst);
    }
  }
  // External supply terminals share the same coordinates as the 2D map.
  for(const [label,a,b] of counter?[]:[['LÓGICA · 5 V REGULADOS','+5','G5'],['MOTOR · 6 V','+6','G6']]){
    const pa=hpos(['FUENTE',a,0]),pb=hpos(['FUENTE',b,0]),center=pa.clone().lerp(pb,.5);
    topLabel(label,center.clone().setY(.2).add(new THREE.Vector3(0,0,-.9)),9,1.4,{background:'#e0e8e2',color:'#345349',size:34});
    for(const [p,color] of [[pa,0xc4414b],[pb,0x35433b]])mesh(new THREE.CylinderGeometry(.23,.23,.35,14),new THREE.MeshStandardMaterial({color}),p.clone().setY(.2));
  }
  for(const chip of model.chips||[]){
    const before=new Set(scene.children);
    const n=chip.pins,half=n/2,start=chip.start,first=hpos([chip.board,'e',start]),last=hpos([chip.board,'f',start+half-1]);
    const center=first.clone().lerp(last,.5).setY(.8),length=half+.2;
    const chipBody=counter?moldedDIP(length,center):roundedBox(length,1.25,2.45,center,chip.dipSwitch?new THREE.MeshStandardMaterial({color:0xad2e37,roughness:.55}):dark.clone(),scene,.13);chipBody.userData={chip:chip.id};pickables.push(chipBody);
    const outlineBox=new THREE.BoxGeometry(length+.08,1.32,2.52);const outlineEdges=new THREE.EdgesGeometry(outlineBox);outlineBox.dispose();const outline=new THREE.LineSegments(outlineEdges,new THREE.LineBasicMaterial({color:0xd9ac42,depthTest:false}));outline.position.copy(center);outline.renderOrder=18;outline.visible=false;scene.add(outline);chipBodies.set(chip.id,{body:chipBody,outline});
    contactShadow(center,length+.5,2.8);
    if(!counter){const notch=mesh(new THREE.CircleGeometry(.27,28,Math.PI/2,Math.PI),new THREE.MeshStandardMaterial({color:0x12191b,roughness:.9}),center.clone().add(new THREE.Vector3(-length/2+.04,.637,0)));notch.rotation.x=-Math.PI/2;}
    if(chip.dipSwitch){
      for(let p=1;p<=4;p++){const bit=chip.functions?.[p],pos=center.clone().add(new THREE.Vector3(p-2.5,.77,.36));box(.65,.04,1.45,pos.clone().setY(center.y+.645).setZ(center.z),new THREE.MeshStandardMaterial({color:0x611d25}));const slider=box(.51,.16,.62,pos,new THREE.MeshStandardMaterial({color:bit?0xf6eee3:0x9e8d85}));if(bit){slider.userData={bit,switchId:bit,dipSlider:true,dipPosition:p,homeZ:center.z,componentHint:chip.id};pickables.push(slider);switches.push(slider);}topLabel(String(p),center.clone().add(new THREE.Vector3(p-2.5,.66,-.95)),.45,.35,{background:'#ad2e37',color:'#fff5ed',size:60});}
    }else if(counter)packageMark(chip,center,length);
    else topLabel(chip.label+'\n'+chip.id,center.clone().add(new THREE.Vector3(.12,.637,0)),Math.max(2,length-.9),1.75,{size:38});
    const dot=mesh(new THREE.CircleGeometry(counter?.15:.09,16),new THREE.MeshBasicMaterial({color:counter?0x77787a:0x87918c}),center.clone().add(new THREE.Vector3(-length/2+.4,counter?.594:.638,.63)));dot.rotation.x=-Math.PI/2;
    for(let p=1;p<=n;p++){
      const upper=p>half,h=[chip.board,upper?'e':'f',start+(upper?n-p:p-1)],pos=hpos(h,.13),inner=pos.clone();inner.z=center.z+(upper?-1.18:1.18);inner.y=.5;
      const curve=new THREE.CatmullRomCurve3([pos,pos.clone().add(new THREE.Vector3(0,.4,0)),inner]);
      const leg=mesh(new THREE.TubeGeometry(curve,16,counter?.116:.07,4,false),metal,new THREE.Vector3());leg.userData={u:chip.id,p,h};pickables.push(leg);pinMeshes.push(leg);
      const shoulder=box(.22,.12,.32,inner.clone().setY(.54),metal);shoulder.userData={u:chip.id,p,h};pickables.push(shoulder);
      pinLabels.set(chip.id+'.'+p,topLabel(String(p),pos.clone().add(new THREE.Vector3(0,.025,upper?-.4:.4)),.55,.45,{color:'#35433e',background:'#faf9ef',size:95}));
    }
    collectComponent(chip.id,before,Array.from({length:n},(_,i)=>{const p=i+1;return [chip.board,p>half?'e':'f',start+(p>half?n-p:p-1)];}));
    if(counter)componentHologram.register({id:chip.id,type:'chip',title:chip.id+' · '+chip.label,detail:chip.name,anchor:center.clone().setY(1.57),hitPoint:center.clone(),group:componentGroups.get(chip.id).group});
    if(chip.dipSwitch)componentHologram.register({id:chip.id,type:'switch',title:chip.id+' · DIP de 4 posiciones',detail:()=>Object.entries(chip.functions).map(([p,bit])=>p+' '+({ABRIR:'Abrir',CERRAR:'Cerrar',STOP:model.stopClosedRun?'RUN':'STOP',FCA:'Final abierta',FCC:'Final cerrada'}[bit])+' '+(contactStates[chip.id]?.[p]?'ON':'OFF')).join(' · '),anchor:center.clone().setY(1.85),hitPoint:center.clone(),group:componentGroups.get(chip.id).group});
  }
  // SIP resistor networks are passive packages, not extra logic ICs.
  // Every lead uses its explicit breadboard hole; COM is a pin function, not GND.
  for(const array of model.arrays||[]){
    const before=new Set(scene.children);
    const holes=Object.entries(array.pinHoles||{}).sort((a,b)=>Number(a[0])-Number(b[0]));
    if(!holes.length)continue;
    const positions=holes.map(([,h])=>hpos(h,.1));
    const first=positions[0],last=positions[positions.length-1],center=first.clone().lerp(last,.5).setY(1.5);
    const length=first.distanceTo(last)+.98,bodyMat=new THREE.MeshStandardMaterial({color:0x563e35,roughness:.65});
    roundedBox(length,1.9,.8,center,bodyMat,scene,.12);contactShadow(center,length+.3,1.35);
    topLabel(array.id+'  8 x 1k',center.clone().setY(2.46),length-.55,.7,{background:'#563e35',color:'#f2e8dc',size:35});
    holes.forEach(([pin,h])=>{
      const pos=hpos(h,.1),upper=pos.clone().setY(.58),leg=lead([pos,upper],scene);
      leg.userData={array:array.id,p:Number(pin),h,common:Number(pin)===(array.commonPin||1)};
      arrayPinMeshes.push(leg);
      const label=Number(pin)===(array.commonPin||1)?pin+' COM':pin;
      topLabel(label,pos.clone().setY(.055).add(new THREE.Vector3(0,0,.82)),Number(pin)===(array.commonPin||1)?1.15:.5,.4,{background:'#faf9ef',color:'#35433e',size:Number(pin)===(array.commonPin||1)?40:80});
    });
    const commonHole=array.pinHoles?.[array.commonPin||1];
    if(commonHole){const dot=mesh(new THREE.CircleGeometry(.095,20),new THREE.MeshBasicMaterial({color:0xf3d19c}),hpos(commonHole,2.462),scene);dot.rotation.x=-Math.PI/2;}
    collectComponent(array.id,before,holes.map(([,h])=>h));
  }
  for(const display of model.displays||[]){
    const before=new Set(scene.children);
    const positions=Object.values(display.pins).map(h=>hpos(h));
    const center=positions.reduce((v,p)=>v.add(p),new THREE.Vector3()).multiplyScalar(1/positions.length);
    const {width,length,height,leadDiameter}=displaySpec;
    const housingWidth=width/pitch,housingLength=length/pitch,housingHeight=height/pitch,base=.26,face=base+housingHeight;
    roundedBox(housingWidth,housingHeight-.07,housingLength,center.clone().setY(base+(housingHeight-.07)/2),displayHousing,scene,.11);
    roundedBox(housingWidth-.18,.15,housingLength-.18,center.clone().setY(face-.075),displayFace,scene,.065);
    contactShadow(center,housingWidth+.4,housingLength+.4);
    for(const [p,h] of Object.entries(display.pins)){
      const pos=hpos(h,.1),diameter=leadDiameter/pitch;
      roundedBox(diameter,.38,diameter,pos.clone().setY(.18),metal,scene,.024);
      topLabel(String(p),pos.clone().add(new THREE.Vector3(0,.025,Number(p)<=5?1.1:-1.1)),.45,.35,{background:'#faf9ef',color:'#35433e',size:80});
    }
    for(const [seg,geometry] of Object.entries(lensShapes)){
      const mat=textured(displaySpec.lens,.42,.018);
      const lens=mesh(geometry,mat,center.clone().setY(face+.015));
      segments.set(display.id+'.'+seg,lens);
    }
    topLabel(display.id,center.clone().setY(face+.017).add(new THREE.Vector3(0,0,3.22)),2,.31,{background:displaySpec.face,color:'#cfbeb8',size:45});
    mesh(new THREE.SphereGeometry(.06,10,8),new THREE.MeshStandardMaterial({color:0xb0a6a0}),center.clone().setY(face+.012).add(new THREE.Vector3(-2.04,0,3.15)));
    collectComponent(display.id,before,Object.values(display.pins));
  }

  function makeConnection(it) {
    if(it.externalLead)return;
    const a=hpos(it.a),b=hpos(it.b),len=a.distanceTo(b),isRes=it.kind==='res',isPart=it.kind!=='wire';
    const routed=!isPart&&Array.isArray(it.route)&&it.route.length>=2;
    const hasHousing=!isPart&&it.a[0]!==it.b[0];
    const height=isPart?.6:routed?Math.max(.48,Number(it.routeHeight)||.78):it.a[0]!==it.b[0]?2.6+(Number(it.id.slice(1))%3)*.22:Math.min(2.25,.65+len*.065);
    const group=new THREE.Group(),plugs=[];scene.add(group);const mid=a.clone().lerp(b,.5);mid.y=height;
    // A flexible jumper's metal contacts reach the holes; its jacket meets the two collars.
    const routePoints=routed?[a,...it.route.map(p=>toWorld(p,height)),b]:null;
    const curve=hasHousing?flexibleRoute(a,b,routePoints,height):routed?roundedRoute(routePoints):new THREE.CatmullRomCurve3(isRes?[a,a.clone().setY(.45),a.clone().setY(1.65),a.clone().setY(2.8),a.clone().setY(3.14),b.clone().setY(3.14),b.clone().setY(2.7),b]:[a,a.clone().setY(.36),a.clone().lerp(b,.18).setY(height),mid,a.clone().lerp(b,.82).setY(height),b.clone().setY(.36),b],false,'centripetal');
    const material=new THREE.MeshStandardMaterial({color:it.color||(model.colors||{})[it.net]||'#087f93',roughness:.42,metalness:.02});
    const samples=hasHousing?Math.max(64,Math.ceil(curve.getLength()*3)):routed?Math.max(48,routePoints.length*12):len>12?64:40;
    const wire=mesh(new THREE.TubeGeometry(curve,samples,isPart?.046:it.routingClass==='power'?.145:.125,10,false),isPart?metal.clone():material,new THREE.Vector3(),group);wire.visible=it.kind==='wire';wire.userData={id:it.id};pickables.push(wire);
    if(!isPart){
      const terminalMaterials=hasHousing?{pin:contactMaterial.clone(),housing:bootMaterial.clone(),collar:collarMaterial.clone()}:{pin:metal.clone()};
      for(const end of [a,b]){
        const terminal=hasHousing?flexiblePlug(end,group,terminalMaterials,it.id):mesh(solidTipGeometry,terminalMaterials.pin,end.clone().setY(.09),group);
        plugs.push([{mesh:terminal,home:terminal.position.clone()}]);
      }
    }
    if(isRes){
      const flat=counter&&len>=2.8;
      const bodyCenter=flat?mid.clone().setY(.68):a.clone().setY(1.65);
      const [first,second,multiplier]=resistorBandDigits(it.value);
      const bands=[resistorShell,bandMaterials[first],bandMaterials[second],multiplier===-1?goldBand:bandMaterials[multiplier]||bandMaterials[2],goldBand];
      const body=mesh(resistorBody,bands.map(material=>material.clone()),bodyCenter,group);body.userData={id:it.id};pickables.push(body);
      const radius=resistor.leadDiameter/pitch/2;
      let firstPath=[a,a.clone().setY(.47)],returnPath=[a.clone().setY(2.86),a.clone().setY(3.14),b.clone().setY(3.14),b.clone().setY(2.7),b];
      if(flat){
        const along=b.clone().sub(a).normalize(),halfLength=resistor.profile.at(-1)[0]/pitch;
        body.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),along);
        firstPath=[a,a.clone().setY(.5),bodyCenter.clone().addScaledVector(along,-halfLength)];
        returnPath=[bodyCenter.clone().addScaledVector(along,halfLength),b.clone().setY(.5),b];
      }
      const firstLead=lead(firstPath,group,radius),returnLead=lead(returnPath,group,radius);
      firstLead.userData=returnLead.userData={id:it.id};pickables.push(firstLead,returnLead);
      componentHologram.register({id:it.partId||it.id,connectionId:it.id,type:'res',title:(it.partId||it.id)+' · Resistencia',detail:it.value,anchor:bodyCenter.clone().setY(flat?1.25:2.95),hitPoint:bodyCenter.clone(),group});
    }
    const electrolytic=it.kind==='cap'&&(it.polarized||/^(10|100)\s*(µ|μ|u)/i.test(it.value));
    if(it.kind==='cap'&&!electrolytic){const center=mid.clone().setY(.95);const body=mesh(new THREE.SphereGeometry(.43,20,14),new THREE.MeshStandardMaterial({color:0xc88c41,roughness:.72}),center,group);body.scale.set(1,1,.38);body.userData={id:it.id};pickables.push(body);for(const [i,h] of [a,b].entries())lead([h,h.clone().setY(.32),center.clone().add(new THREE.Vector3(i?.2:-.2,-.2,0))],group);if(!counter){const label=topLabel(it.value,center.clone().add(new THREE.Vector3(0,.5,0)),1.8,.5,{background:'#c88c41',color:'#30271c',size:43});group.add(label);}}
    if(electrolytic){
      const center=mid.clone().setY(1.45),sleeve=texture((ctx,w,h)=>{ctx.fillStyle='#24485a';ctx.fillRect(0,0,w,h);ctx.fillStyle='#d2ddd5';ctx.fillRect(w*.21,0,w*.16,h);ctx.fillStyle='#24485a';ctx.font='bold 30px Arial';ctx.textAlign='center';for(let y=30;y<h;y+=50)ctx.fillText('−',w*.29,y);ctx.fillStyle='#dde6e3';ctx.font='600 32px Arial';ctx.fillText(it.value,w*.67,h*.38);ctx.font='26px Arial';ctx.fillText('16 V',w*.67,h*.65);},512,256);
      const body=mesh(new THREE.CylinderGeometry(.64,.64,1.8,40),[new THREE.MeshStandardMaterial({map:sleeve,roughness:.4}),metal.clone(),dark.clone()],center,group);body.userData={id:it.id};pickables.push(body);body.rotation.y=Math.PI/2-Math.PI*2*.29;
      for(const [i,h] of [a,b].entries())lead([h,h.clone().setY(.4),center.clone().setY(.55).add(new THREE.Vector3(i?.28:-.28,0,0))],group);
      const top=center.clone().setY(2.359);box(.76,.008,.022,top,dark.clone(),group).rotation.y=Math.PI/4;box(.76,.008,.022,top,dark.clone(),group).rotation.y=-Math.PI/4;contactShadow(center,2.1,1.8,group);
      if(!counter){const label=topLabel(it.id+' · '+it.value,center.clone().setY(.055).add(new THREE.Vector3(0,0,1.02)),2.4,.45,{background:'#faf9ef',color:'#345349',size:43});group.add(label);}
    }
    if(it.kind==='pot'){
      const center=mid.clone().setY(1.02),body=roundedBox(2.65,1.35,1.6,center,new THREE.MeshStandardMaterial({color:0x176994,roughness:.36}),group,.11);body.userData={id:it.id};pickables.push(body);box(2.44,.08,1.42,center.clone().setY(.39),new THREE.MeshStandardMaterial({color:0x10415e}),group);
      mesh(new THREE.CylinderGeometry(.59,.59,.04,32),new THREE.MeshStandardMaterial({color:0x174056}),center.clone().setY(1.717),group);
      const knob=mesh(new THREE.CylinderGeometry(.51,.51,.16,40),new THREE.MeshStandardMaterial({color:0xbf9b50,metalness:.8,roughness:.24}),center.clone().setY(1.79),group);knob.userData={id:it.id};pickables.push(knob);potSlot=box(.79,.018,.11,center.clone().setY(1.879),dark.clone(),group);
      const stamp=topLabel('203',center.clone().add(new THREE.Vector3(.76,.679,-.4)),.68,.39,{background:'#176994',color:'#e6f0ec',size:77});group.add(stamp);
      for(const h of model.potPins){const pin=hpos(h);lead([pin,pin.clone().setY(.4)],group);}contactShadow(center,3.3,2.3,group);
      const label=topLabel('RV1 · 20 kΩ',center.clone().setY(.06).add(new THREE.Vector3(0,0,-1.08)),3,.55,{background:'#faf9ef',color:'#345349',size:42});group.add(label);
      for(let i=0;i<3;i++){const p=hpos(model.potPins[i],.035),label=topLabel(String(i+1),p.clone().add(new THREE.Vector3(0,0,.95)),.55,.4,{background:'#faf9ef',color:'#345349',size:85});group.add(label);}
    }
    if(it.kind==='led'){
      const center=mid.clone().setY(1.22),mat=new THREE.MeshPhysicalMaterial({color:0xc24332,emissive:0x000000,roughness:.18,metalness:0,clearcoat:1,clearcoatRoughness:.1,transparent:true,opacity:.88,depthWrite:false});
      const radius=counter?.92:.52;
      const base=mesh(new THREE.CylinderGeometry(radius,radius,.8,32),mat,center,group),lens=mesh(new THREE.SphereGeometry(radius,32,20,0,Math.PI*2,0,Math.PI/2),mat,center.clone().setY(1.62),group),flange=mesh(new THREE.CylinderGeometry(radius+.08,radius+.08,.14,32),mat,center.clone().setY(.77),group);
      for(const obj of [base,lens,flange]){obj.userData={id:it.id,baseOpacity:.88};pickables.push(obj);}mat.userData.baseColor=it.color||({LY:'#eab83f',LG:'#2cab66',LR:'#d34436'})[it.value]||'#d34436';mat.color.set(mat.userData.baseColor);ledLenses.set(it.value,mat);
      for(const [i,h] of [a,b].entries()){const inner=center.clone().setY(1.27).add(new THREE.Vector3(i?.18:-.18,0,0));lead([h,h.clone().setY(.48),inner.clone().setY(.72),inner],group);}box(.18,.19,.18,center.clone().setY(1.33).add(new THREE.Vector3(.18,0,0)),metal.clone(),group);
      const cup=mesh(new THREE.SphereGeometry(.18,16,10,0,Math.PI*2,0,Math.PI/2),new THREE.MeshStandardMaterial({color:0xc4ccce,metalness:.8,roughness:.2,side:THREE.DoubleSide}),center.clone().add(new THREE.Vector3(.18,.23,0)),group);cup.rotation.x=Math.PI;
      mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([center.clone().add(new THREE.Vector3(-.18,.1,0)),center.clone().add(new THREE.Vector3(-.05,.43,0)),center.clone().add(new THREE.Vector3(.18,.28,0))]),12,.012,5,false),metal,new THREE.Vector3(),group);
      box(.04,.11,.42,center.clone().add(new THREE.Vector3(counter?Math.sign(b.x-a.x)*(radius+.035):.56,-.45,0)),new THREE.MeshStandardMaterial({color:counter?0x532462:0x984236,roughness:.55}),group);
      const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTexture,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending}));glow.position.copy(center).setY(1.47);glow.scale.set(2.6,2.6,1);glow.visible=false;group.add(glow);ledGlows.set(it.value,glow);contactShadow(center,1.7,1.7,group);
      componentHologram.register({id:it.partId||it.id,connectionId:it.id,type:'led',title:counter?'LED · peso '+it.bit:({LR:'LED rojo',LY:'LED amarillo',LG:'LED verde'})[it.value]||'LED',detail:counter?'Cátodo hacia LED'+it.bit+'_N':({LR:'STOP · parpadeo',LY:'Puerta en movimiento',LG:'Puerta completamente abierta'})[it.value]||it.value,anchor:center.clone().setY(counter?2.65:2.25),hitPoint:center.clone(),group});
    }
    if(it.kind==='motor'&&!it.externalMotor){
      const center=mid.clone().setY(1.2),housing=new THREE.MeshStandardMaterial({color:0xa1adb2,metalness:.78,roughness:.28}),body=mesh(new THREE.CylinderGeometry(.9,.9,2.4,32),housing,center,group);body.rotation.z=Math.PI/2;
      for(const offset of [-1.17,1.17]){const cap=mesh(new THREE.CylinderGeometry(.86,.86,.14,32),offset<0?dark:metal,center.clone().add(new THREE.Vector3(offset,0,0)),group);cap.rotation.z=Math.PI/2;}
      const shaft=mesh(new THREE.CylinderGeometry(.12,.12,1,16),metal,center.clone().add(new THREE.Vector3(1.65,0,0)),group);shaft.rotation.z=Math.PI/2;
      for(const z of [-.42,.42])box(.58,.025,.18,center.clone().add(new THREE.Vector3(-.55,.8,z)),dark,group);
      [a,b].forEach((h,i)=>{const terminal=center.clone().add(new THREE.Vector3(-1.27,i?.28:-.28,0));box(.12,.2,.3,terminal,metal,group);lead([h,h.clone().setY(.5),terminal],group);});
      const label=topLabel('MOTOR CC · EXTERNO',center.clone().add(new THREE.Vector3(0,1.22,0)),3.2,.6,{background:'#53676e',color:'#fff',size:36});group.add(label);
    }

    if(it.kind==='motor'&&it.externalMotor){
      const e=it.externalMotor,c=toWorld(e.center,3.7),yellow=new THREE.MeshStandardMaterial({color:0xf2d548,roughness:.4}),edge=new THREE.MeshStandardMaterial({color:0xd6b932,roughness:.55}),silver=new THREE.MeshStandardMaterial({color:0xb8c2c6,metalness:.82,roughness:.28});
      const gearbox=roundedBox(13.2,7.1,7.3,c.clone().add(new THREE.Vector3(-3.4,0,0)),yellow,group,.55);
      gearbox.userData={id:it.id};pickables.push(gearbox);contactShadow(c,29,12,group);
      roundedBox(12.2,.16,6.4,c.clone().add(new THREE.Vector3(-3.4,3.62,0)),edge,group,.12);
      const can=mesh(new THREE.CylinderGeometry(2.65,2.65,8.8,40),silver,c.clone().add(new THREE.Vector3(7.1,0,0)),group);can.rotation.z=Math.PI/2;can.userData={id:it.id};pickables.push(can);
      const rear=mesh(new THREE.CylinderGeometry(2.56,2.56,1.25,32),dark,c.clone().add(new THREE.Vector3(11.9,0,0)),group);rear.rotation.z=Math.PI/2;
      for(const z of [-1.2,1.2])roundedBox(3.3,.12,.65,c.clone().add(new THREE.Vector3(9,2.3,z)),dark,group,.08);
      for(const x of [-7.8,1.1])for(const z of [-2.75,2.75]){const screw=mesh(new THREE.CylinderGeometry(.24,.24,.08,16),metal,c.clone().add(new THREE.Vector3(x,3.74,z)),group);box(.32,.02,.06,screw.position.clone().add(new THREE.Vector3(0,.06,0)),dark,group);}
      const boss=mesh(new THREE.CylinderGeometry(1.3,1.3,.65,28),edge,c.clone().add(new THREE.Vector3(-3.6,0,3.92)),group);boss.rotation.x=Math.PI/2;
      const axle=mesh(new THREE.CylinderGeometry(.78,.78,3.1,28),plastic,c.clone().add(new THREE.Vector3(-3.6,0,5.55)),group);axle.rotation.x=Math.PI/2;box(1.1,.18,2.7,c.clone().add(new THREE.Vector3(-3.6,.71,5.55)),plastic,group);
      const motorWires=new THREE.Group();group.add(motorWires);const motorCables=[];externalMotorWiring.push({id:it.partId,group:motorWires,cables:motorCables,stage:it.wiringStage??it.stage});const terminals=e.terminals.map(p=>toWorld(p,2.15));
      terminals.forEach((t,i)=>{box(.18,.55,.65,t,metal,group);const pin=i?b:a,curve=e.cableRoutes?.[i]?externalCableCurve(THREE,e.cableRoutes[i],toWorld,t,pin,e.cableHeights[i]):new THREE.CatmullRomCurve3([t,toWorld([point(i?it.b:it.a)[0],790+i*28],1.2),pin.clone().setY(.55),pin],false,'centripetal'),cableGroup=new THREE.Group();motorWires.add(cableGroup);const material=new THREE.MeshStandardMaterial({color:i?0x33495a:0xd85c51,roughness:.45}),wire=mesh(new THREE.TubeGeometry(curve,96,.13,10,false),material,new THREE.Vector3(),cableGroup),plug=box(.3,.46,.3,pin.clone().setY(.23),dark,cableGroup);wire.userData={id:it.id};pickables.push(wire);motorCables.push({group:cableGroup,wire,curve,plug,terminal:i,progress:1});});
      const label=topLabel(e.label||'MOTORREDUCTOR TT · EXTERNO',toWorld([e.center[0],e.bounds[1]+24],.12),22,.9,{background:'#f3f2e8',color:'#345349',size:35});group.add(label);
    }

    if(it.kind==='switch'&&it.externalControl){externalControlBodies.push(buildExternalControl({THREE,it,group,mesh,box,roundedBox,toWorld,hpos,point,topLabel,contactShadow,pickables,switches,metal,dark,componentLabels:false}));componentHologram.register({id:it.partId||it.id,connectionId:it.id,type:'switch',title:'Interruptor '+it.value,detail:it.externalControl.model.toUpperCase(),anchor:toWorld(it.externalControl.center,4.1),group});}
    if(it.kind==='switch'&&!it.externalControl){
      const center=(it.spdt?a.clone().lerp(hpos(it.third),.5):mid.clone()).setY(.65),body=roundedBox(it.spdt?2.8:1.8,.9,1.35,center,new THREE.MeshStandardMaterial({color:0x344943}),group,.12);
      const rocker=roundedBox(1.12,.28,.9,center.clone().add(new THREE.Vector3(0,.58,0)),new THREE.MeshStandardMaterial({color:0x245f95}),group,.08);rocker.userData={bit:it.value||it.id};pickables.push(rocker);switches.push(rocker);rocker.userData.switchId=it.value||it.id;
      [a,b,...(it.third?[hpos(it.third)]:[])].forEach(h=>lead([h,h.clone().setY(.5)],group));componentHologram.register({id:it.partId||it.id,connectionId:it.id,type:'switch',title:'Interruptor '+(it.value||it.id),detail:it.contact==='NC'?'Final de carrera':'Mando de puerta',anchor:center.clone().setY(1.9),group});
      if(it.contact==='NC'||it.contact==='limit-spdt'){
        rocker.visible=false;
        const lever=box(2.45,.085,.24,center.clone().add(new THREE.Vector3(.5,.58,0)),metal,group);lever.rotation.z=-.15;
        const roller=mesh(new THREE.CylinderGeometry(.22,.22,.36,20),dark,center.clone().add(new THREE.Vector3(1.65,.41,0)),group);roller.rotation.x=Math.PI/2;
      }else{
        const stop=(it.value||'')==='STOP';rocker.material.color.set(stop?'#bd4139':'#245f95');rocker.userData.baseColor=stop?'#bd4139':'#245f95';
        const glyph=topLabel(stop?'STOP':'I / O',center.clone().add(new THREE.Vector3(0,.73,0)),.9,.4,{background:stop?'#bd4139':'#245f95',color:'#fff',size:40});group.add(glyph);
      }
    }
    const approach=hasHousing?1-insertionTravel/curve.getLength():1;
    connections.set(it.id,{group,wire,material,curve,a,b,it,routed,routePoints,height,plugs,approach});
    if(!['wire','link'].includes(it.kind))componentGroups.set(it.partId||it.id,{group,holes:[it.a,it.b,...it.third?[it.third]:[]],external:Boolean(it.externalControl||it.externalMotor),home:group.position.clone()});
  }
  model.items.forEach(makeConnection);
  for(const it of model.items.filter(it=>it.externalLead)){
    const spec=it.externalLead,owner=spec.motor?externalMotorWiring.find(m=>m.id===spec.partId):externalControlBodies.find(c=>c.id===spec.partId),c=owner?.cables[spec.terminal];if(!c)throw new Error('Missing external cable '+it.id);
    scene.add(c.group);c.nativeId=it.id;c.wire.userData={id:it.id};if(c.tip)c.tip.visible=false;
    const a=c.curve.getPoint(0),b=c.curve.getPoint(1);connections.set(it.id,{group:c.group,wire:c.wire,material:c.wire.material,curve:c.curve,a,b,it,routed:false,routePoints:null,height:1.8,plugs:[[],[{mesh:c.plug,home:c.plug.position.clone()}]]});
  }
  // A persistent, pixel-sized outline follows the original 3D curve exactly.
  // Only one selected route is allocated; simulation updates do not rebuild it.
  const selectedTrace=new THREE.Group();selectedTrace.visible=false;scene.add(selectedTrace);
  let traceGeometry=new LineGeometry(),traceConnection=null,traceBuilds=0,tracePoints=[],traceFrontier=-1;
  const revealPoint=new THREE.Vector3(),revealNormal=new THREE.Vector3();
  const revealCap=mesh(new THREE.SphereGeometry(1,12,8),new THREE.MeshStandardMaterial(),new THREE.Vector3());
  const revealCapMaterial=revealCap.material;
  revealCap.visible=false;
  const smooth=t=>{t=THREE.MathUtils.clamp(t,0,1);return t*t*(3-2*t);};
  const traceLayers=[[0x18382f,10],[0xffd16a,7],[0x087f93,3]].map(([color,width],i)=>{
    const material=new LineMaterial({color,linewidth:width,worldUnits:false,transparent:true,depthTest:false,depthWrite:false,toneMapped:false});
    const line=new Line2(traceGeometry,material);line.renderOrder=24+i;line.frustumCulled=false;selectedTrace.add(line);return line;
  });
  function updateSelectedTrace(connection){
    selectedTrace.visible=Boolean(connection?.group.visible&&connection.it.kind==='wire');
    if(!selectedTrace.visible){traceConnection=null;return;}
    if(traceConnection===connection.it.id)return;
    // Use the very same arc-length samples as TubeGeometry, including its live tip.
    const count=connection.wire.geometry.parameters.tubularSegments;
    tracePoints=Array.from({length:count+1},(_,i)=>connection.curve.getPointAt(i/count));traceFrontier=-1;
    const geometry=new LineGeometry();geometry.setPositions(tracePoints.flatMap(p=>p.toArray()));
    traceGeometry.dispose();traceGeometry=geometry;traceLayers.forEach(line=>{line.geometry=geometry;});
    traceLayers[2].material.color.copy(connection.material.color);traceConnection=connection.it.id;traceBuilds++;
  }
  const markers=[0,1].map(i=>{
    const ring=mesh(new THREE.TorusGeometry(.35,.075,8,24),new THREE.MeshBasicMaterial({color:i?0x415fc4:0x0d7665,depthTest:false,depthWrite:false}),new THREE.Vector3());ring.rotation.x=-Math.PI/2;ring.renderOrder=15;
    ring.visible=false;return {ring};
  });
  const traveler=mesh(new THREE.SphereGeometry(.17,12,8),new THREE.MeshBasicMaterial({color:0xffdc86,depthTest:false,depthWrite:false}),new THREE.Vector3());traveler.renderOrder=32;traveler.visible=false;
  const pinMarkers=[0,1].map(()=>{
    const ring=mesh(new THREE.TorusGeometry(.22,.06,8,24),new THREE.MeshBasicMaterial({color:0xf1b63d,depthTest:false}),new THREE.Vector3());
    ring.rotation.x=-Math.PI/2;ring.renderOrder=16;ring.visible=false;return ring;
  });

  function visibleInTree(obj){while(obj){if(!obj.visible)return false;obj=obj.parent;}return true;}
  const raycaster=new THREE.Raycaster(),cursor=new THREE.Vector2();let pointerStart=null;
  canvas.addEventListener('pointerdown',e=>{pointerStart=[e.clientX,e.clientY];});
  canvas.addEventListener('pointerup',e=>{
    if(!pointerStart||Math.hypot(e.clientX-pointerStart[0],e.clientY-pointerStart[1])>6||e.button!==0)return;
    const rect=canvas.getBoundingClientRect();cursor.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);raycaster.setFromCamera(cursor,camera);
    const hit=raycaster.intersectObjects(pickables,false).find(h=>visibleInTree(h.object));if(!hit){componentHologram.dismiss();return;}
    const data=hit.object.userData,dip=model.chips?.find(c=>c.id===data.chip&&c.dipSwitch);let dipBit=null;
    if(dip){const center=hit.object.getWorldPosition(new THREE.Vector3()),position=THREE.MathUtils.clamp(Math.floor(hit.point.x-center.x+2)+1,1,4);dipBit=dip.functions?.[position];}
    if(dipBit)onSwitch(dipBit);else if(data.id)onConnection(data.id);else if(data.p)onPin(data.u||data.array,data.p);else if(data.chip)onChip(data.chip);else if(data.holes&&hit.instanceId!==undefined)onHole(data.holes[hit.instanceId]);else if(data.bit!==undefined)onSwitch(data.bit);
    const switchPart=data.bit!==undefined?model.items.find(it=>it.kind==='switch'&&it.value===data.bit):null;
    componentHologram.select(data.componentHint||data.id||data.chip||data.u||switchPart?.partId||switchPart?.id);
  });
  controls.addEventListener('start',()=>{cameraTween=null;topView=false;canvas.dataset.moving='false';settleFrames=50;});
  controls.addEventListener('change',()=>{moved=true;requestRender();});
  controls.addEventListener('end',()=>{settleFrames=50;requestRender();});
  function requestRender(){if(active&&!document.hidden&&!raf)raf=requestAnimationFrame(frame);}
  function layoutSelectionMarkers(){
    const c=connections.get(selectedId);if(!c?.group.visible)return;
    const {width,height}=container.getBoundingClientRect();if(!width||!height)return;
    if(!snapshot?.cableFocus||c.it.kind!=='wire'||routeTween)return;
    // Keep the rings readable in the full assembly and small at pin-level zoom.
    const worldPerPixel=2*Math.tan(camera.fov*Math.PI/360)/height;
    for(const {ring} of markers){
      const depth=ring.position.clone().sub(camera.position).dot(camera.getWorldDirection(new THREE.Vector3()));
      ring.scale.setScalar(THREE.MathUtils.clamp(depth*worldPerPixel*5/.35,1,2.6));
    }
  }
  function frame(now){
    raf=0;if(!active||document.hidden)return;
    moved=false;
    if(cameraTween){
      const t=THREE.MathUtils.clamp((now-cameraTween.started)/680,0,1),ease=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
      camera.position.lerpVectors(cameraTween.fromPos,cameraTween.toPos,ease);controls.target.lerpVectors(cameraTween.fromTarget,cameraTween.toTarget,ease);
      if(t===1){cameraTween=null;canvas.dataset.moving='false';}
    }
    if(routeTween){const t=THREE.MathUtils.clamp((now-routeTween.started)/routeTween.duration,0,1);traveler.position.copy(routeTween.curve.getPointAt(t));traveler.visible=t<1;markers.forEach(({ring})=>ring.scale.setScalar(1+.25*Math.sin(t*Math.PI*2)));if(t===1){routeTween=null;markers.forEach(({ring})=>ring.scale.setScalar(1));}}
    controls.update();layoutSelectionMarkers();componentHologram.layout();renderer.render(scene,camera);renderedFrames++;
    if(cameraTween||routeTween||(moved&&settleFrames-->0))requestRender();
  }
  function finishMotion(){
    if(cameraTween){camera.position.copy(cameraTween.toPos);controls.target.copy(cameraTween.toTarget);cameraTween=null;controls.update();}
    routeTween=null;traveler.visible=false;markers.forEach(({ring})=>ring.scale.setScalar(1));canvas.dataset.moving='false';requestRender();
  }
  function focusBox(rect,animate=true){
    lastBox=[...rect];const [x,z,w,d]=rect,center=toWorld([x+w/2,z+d/2],1.6);
    const direction=topView?new THREE.Vector3(0,1,.001):camera.position.clone().sub(controls.target).normalize();
    if(direction.length()<.5)direction.set(.18,1.15,1.2).normalize();
    const right=new THREE.Vector3().crossVectors(camera.up,direction).normalize(),up=new THREE.Vector3().crossVectors(direction,right).normalize();
    let distance=8;const tangent=Math.tan(camera.fov*Math.PI/360);
    for(const px of [-w/60,w/60])for(const pz of [-d/60,d/60])for(const py of [-1.6,4]){const v=new THREE.Vector3(px,py,pz);distance=Math.max(distance,v.dot(direction)+1.08*Math.abs(v.dot(right))/(tangent*camera.aspect),v.dot(direction)+1.08*Math.abs(v.dot(up))/tangent);}
    fitDistance=distance;const to=center.clone().addScaledVector(direction,distance);cameraTween=null;
    if(animate&&snapshot?.animate&&active&&viewAppearance.motion==='full'){cameraTween={fromPos:camera.position.clone(),toPos:to,fromTarget:controls.target.clone(),toTarget:center,started:performance.now()};canvas.dataset.moving='true';}
    else{camera.position.copy(to);controls.target.copy(center);controls.update();canvas.dataset.moving='false';}requestRender();
  }
  function update(next){
    snapshot=next;selectedId=next.selected;
    if(typeof next.clarity==='boolean')wireClarity=next.clarity;
    else if(typeof next.routingFocus==='boolean')wireClarity=next.routingFocus;
    if(typeof next.isolate==='boolean')isolateWires=next.isolate;
    const studio=next.studio,inspecting=Boolean(studio?.chip),inspectIds=new Set(studio?.related||[]),signalIds=new Set(studio?.signals?.active?studio.signals.ids:[]);
    const selected=connections.get(next.selected),clarityFocus=wireClarity&&Boolean(selected),selectedPart=selected?.it.partId;
    const references=new Set([selectedPart,...[selected?.it.fromRef,selected?.it.toRef].filter(Boolean).map(ref=>ref.split('.')[0])].filter(Boolean));
    const focusWire=next.cableFocus&&clarityFocus&&selected?.it.kind==='wire';
    const selectedPins=[selected?.it.fromRef,selected?.it.toRef].filter(ref=>/^U\d+\.\d+$/.test(ref||''));
    for(const [id,c] of connections){
      const current=!['wire','link'].includes(c.it.kind)||next.step===model.stages.length-1||c.it.stage===next.step;
      c.group.visible=(current||(next.previous&&c.it.stage<next.step)||(inspecting&&inspectIds.has(id)))&&!(isolateWires&&selected?.it.kind==='wire'&&c.it.kind==='wire'&&id!==next.selected);
      const relatedPart=references.has(c.it.partId),relatedSignal=c.it.kind==='wire'&&selected?.it.kind==='wire'&&selected.it.signal&&c.it.signal===selected.it.signal;
      const relatedPartWire=c.it.kind==='wire'&&selectedPart&&[c.it.fromRef,c.it.toRef].some(ref=>ref?.startsWith(selectedPart+'.'));
      const emphasis=focusWire&&!inspecting&&!studio?.signals?.active?(c.it.kind==='wire'&&id!==next.selected?(relatedSignal?.32:.22):1):studio?.signals?.active&&c.it.kind==='wire'?(signalIds.has(id)?1:.16):inspecting?(inspectIds.has(id)?1:c.it.kind==='wire'?.1:.8):id===next.selected?1:clarityFocus?(c.it.kind==='wire'?(relatedSignal||relatedPartWire?.32:.16):relatedPart?1:.92):next.selected?.4:current?1:.75;
      c.group.traverse(obj=>{
        if(obj.userData.viewerLabel)obj.visible=!clarityFocus||id===next.selected||relatedPart;
        if(obj.isMesh)for(const mat of [].concat(obj.material)){const base=obj.userData.baseOpacity??1;mat.transparent=emphasis<1||base<1||Boolean(obj.userData.softShadow);mat.opacity=emphasis*base;mat.depthWrite=emphasis>.6&&base===1&&!obj.userData.softShadow;}
      });
      c.material.emissive.set(id===next.selected?c.material.color:0x000000);c.material.emissiveIntensity=id===next.selected?.3:0;
    }
    updateSelectedTrace(selected);
    for(const [ref,label] of pinLabels)label.visible=inspecting?ref.startsWith(studio.chip+'.')&&(!studio.pin||ref===studio.chip+'.'+studio.pin):!clarityFocus||selectedPins.includes(ref);
    pinMarkers.forEach((ring,i)=>{
      const ref=selectedPins[i],pin=pinMeshes.find(mesh=>mesh.userData.u+'.'+mesh.userData.p===ref);
      ring.visible=Boolean(clarityFocus&&pin);if(pin)ring.position.copy(hpos(pin.userData.h,.23));
    });
    markers.forEach(({ring},i)=>{const c=connections.get(next.selected);ring.visible=Boolean(c?.group.visible);ring.scale.setScalar(1);if(c)ring.position.copy(i?c.b:c.a).add(new THREE.Vector3(0,.14,0));});
    if(potSlot)potSlot.rotation.y=(next.pot/100-.5)*Math.PI;
    updateStudio(studio);
    componentHologram.sync(next.selected||studio?.chip||'',next.selected||studio?.chip);
    setIndicators(next);setExternalCable(externalCablePose);for(const wiring of externalMotorWiring)wiring.group.visible=next.step>=wiring.stage;
    container.dataset.selected=next.selected||'';container.dataset.step=next.step;container.dataset.wireClarity=String(wireClarity);container.dataset.isolateWires=String(isolateWires);container.dataset.visibleConnections=[...connections.values()].filter(c=>c.group.visible).length;
    if(!next.animate)finishMotion();requestRender();
  }
  function setExternalCable(value){externalCablePose=value;let index=0;for(const body of externalControlBodies)for(const cable of body.cables){if(cable.nativeId){index++;continue;}const current=value&&body.id===value.id&&cable.terminal===value.terminal;cable.group.visible=snapshot?.step>=(body.wiringStage||2)&&(!value||index<=value.index);revealExternalCable(cable,current?value.progress:1);index++;}requestRender();}
  function setWireClarity(value){const enabled=Boolean(value);if(enabled===wireClarity)return;wireClarity=enabled;if(snapshot)update({...snapshot,clarity:enabled});else{container.dataset.wireClarity=String(enabled);requestRender();}}
  function setLEDs(leds){let changed=false;for(const [name,mat] of ledLenses){const lit=Boolean(leds[name]);if(mat.userData.lit!==lit){mat.userData.lit=lit;mat.color.set(mat.userData.baseColor);mat.emissive.set(lit?mat.userData.baseColor:'#000000');mat.emissiveIntensity=lit?.9:0;ledGlows.get(name).visible=lit;changed=true;}}if(changed)requestRender();}
  function setIndicators(state={}){contactStates=state.contacts||Object.fromEntries((model.chips||[]).filter(c=>c.dipSwitch).map(c=>[c.id,Object.fromEntries(Object.entries(c.functions).map(([p,bit])=>[p,model.stopClosedRun&&bit==='STOP'?!state.switches?.[bit]:Boolean(state.switches?.[bit])]))]));setLEDs(state.leds||{});for(const [key,seg] of segments){const [d,s]=key.split('.'),lit=Boolean(state.segments?.[key]??state.segments?.[d]?.[s]);seg.material.color.set(lit?displaySpec.lit:displaySpec.lens);seg.material.emissive.set(lit?displaySpec.lit:'#000000');seg.material.emissiveIntensity=lit?1.35:0;}for(const rocker of switches){if(rocker.userData.dipSlider){const semantic=Boolean(state.switches?.[rocker.userData.switchId]),on=contactStates[rocker.userData.componentHint]?.[rocker.userData.dipPosition]??(model.stopClosedRun&&rocker.userData.switchId==='STOP'?!semantic:semantic);rocker.position.z=rocker.userData.homeZ+(on?-.36:.36);continue;}if(rocker.userData.externalControl){updateExternalControl(rocker,Boolean(state.switches?.[rocker.userData.switchId]));continue;}rocker.rotation.z=state.switches?.[rocker.userData.switchId]?-.18:.18;rocker.material.color.set(state.switches?.[rocker.userData.switchId]?'#da7044':(rocker.userData.baseColor||'#245f95'));}requestRender();}
  function replay(){const c=connections.get(selectedId);if(!c||!c.group.visible||!snapshot?.animate||!active)return;routeTween={curve:c.curve,started:performance.now(),duration:Math.min(6000,Math.max(2200,c.curve.getLength()*60))};traveler.visible=true;requestRender();}

 function updateStrip(studio){
  const holes=studio?.stripHoles||[],key=JSON.stringify(holes);if(key===stripStamp)return;stripStamp=key;
  stripGroup.traverse(o=>{o.geometry?.dispose();if(o.material)for(const m of [].concat(o.material))m.dispose();});stripGroup.clear();if(!holes.length)return;
  const a=hpos(holes[0],.09),b=hpos(holes.at(-1),.09),middle=a.clone().lerp(b,.5),horizontal=Math.abs(a.x-b.x)>Math.abs(a.z-b.z);
  box(horizontal?a.distanceTo(b)+.6:.62,.045,horizontal?.62:a.distanceTo(b)+.6,middle,new THREE.MeshBasicMaterial({color:0xd8a533,transparent:true,opacity:.38,depthTest:false,depthWrite:false}),stripGroup);
  for(const h of holes){const ring=mesh(new THREE.TorusGeometry(.27,.045,8,20),new THREE.MeshBasicMaterial({color:0xa87820,depthTest:false,depthWrite:false}),hpos(h,.13),stripGroup);ring.rotation.x=-Math.PI/2;ring.renderOrder=18;}
 }
 function restoreFrontier(c){
  const cache=c?.reveal;if(!cache||cache.ring<0)return;
  const geometry=c.wire.geometry,first=cache.ring*cache.stride,last=first+cache.stride;
  for(const name of ['position','normal']){const attr=geometry.getAttribute(name);attr.array.set(cache[name].subarray(first,last),first);attr.addUpdateRange(first,cache.stride);attr.needsUpdate=true;}
  cache.ring=-1;
 }
 function restoreTraceFrontier(){
  if(traceFrontier<0)return;const attr=traceGeometry.getAttribute('instanceEnd'),point=tracePoints[traceFrontier+1];
  if(attr&&point){attr.setXYZ(traceFrontier,point.x,point.y,point.z);attr.data.needsUpdate=true;}traceFrontier=-1;
 }
 function restoreAssembly(c){
  if(!c)return;restoreFrontier(c);c.wire.geometry.setDrawRange(0,Infinity);
  revealCap.visible=false;
  for(const pair of c.plugs||[])for(const p of pair){p.mesh.visible=true;p.mesh.position.copy(p.home);}
 }
 function jacketProgress(c,t){
  const approach=c.approach??1;
  return t<.78?approach*smooth((t-.22)/.56):approach+(1-approach)*smooth((t-.78)/.22);
 }
 function setAssembly(value){
  if(assemblyPose.id&&assemblyPose.id!==value?.id)restoreAssembly(connections.get(assemblyPose.id));
  restoreTraceFrontier();
  if(!value){if(assemblyPose.id)restoreAssembly(connections.get(assemblyPose.id));assemblyPose={id:null,progress:1};traceGeometry.instanceCount=traceGeometry.getAttribute('instanceStart')?.count||0;requestRender();return;}
  const c=connections.get(value.id);if(!c||c.it.kind!=='wire')return;assemblyPose={id:value.id,progress:THREE.MathUtils.clamp(value.progress,0,1)};
  routeTween=null;traveler.visible=false;
  const t=assemblyPose.progress,fraction=jacketProgress(c,t),geometry=c.wire.geometry;
  restoreFrontier(c);
  const segments=geometry.parameters.tubularSegments,radial=geometry.parameters.radialSegments,scaled=fraction*segments,whole=Math.floor(scaled),partial=scaled-whole,ring=Math.min(segments,whole+1);
  // Only move the advancing ring. No geometry allocation or growing triangles per frame.
  if(fraction>0&&fraction<1&&partial>1e-8){
    c.reveal||={position:new Float32Array(geometry.getAttribute('position').array),normal:new Float32Array(geometry.getAttribute('normal').array),stride:(radial+1)*3,ring:-1};
    const cache=c.reveal,position=geometry.getAttribute('position'),normal=geometry.getAttribute('normal'),radius=geometry.parameters.radius;
    c.curve.getPointAt(fraction,revealPoint);
    for(let j=0;j<=radial;j++){
      const lo=(whole*(radial+1)+j)*3,hi=(ring*(radial+1)+j)*3;
      revealNormal.set(cache.normal[lo]+(cache.normal[hi]-cache.normal[lo])*partial,cache.normal[lo+1]+(cache.normal[hi+1]-cache.normal[lo+1])*partial,cache.normal[lo+2]+(cache.normal[hi+2]-cache.normal[lo+2])*partial).normalize();
      position.setXYZ(ring*(radial+1)+j,revealPoint.x+radius*revealNormal.x,revealPoint.y+radius*revealNormal.y,revealPoint.z+radius*revealNormal.z);
      normal.setXYZ(ring*(radial+1)+j,revealNormal.x,revealNormal.y,revealNormal.z);
    }
    cache.ring=ring;
    for(const attr of [position,normal]){attr.addUpdateRange(ring*cache.stride,cache.stride);attr.needsUpdate=true;}
  }else c.curve.getPointAt(fraction,revealPoint);
  const visibleSegments=fraction<=0?0:Math.ceil(scaled);
  geometry.setDrawRange(0,visibleSegments*radial*6);
  // Cap the advancing jacket on the same sampled position as the highlighted wire.
  revealCap.visible=c.group.visible&&fraction>0&&fraction<1&&!(c.approach<1&&t>=.78);
  if(revealCap.visible){
    revealCap.position.copy(revealPoint);
    revealCap.scale.setScalar(geometry.parameters.radius);
    revealCapMaterial.color.copy(c.material.color);
    revealCapMaterial.roughness=c.material.roughness;
  }
  if(traceConnection===value.id){
    traceGeometry.instanceCount=visibleSegments;
    if(visibleSegments>0&&fraction<1){const attr=traceGeometry.getAttribute('instanceEnd');traceFrontier=visibleSegments-1;attr.setXYZ(traceFrontier,revealPoint.x,revealPoint.y,revealPoint.z);attr.data.needsUpdate=true;}
  }
  (c.plugs||[]).forEach((pair,i)=>{const k=smooth(i?(t-.78)/.22:t/.22);for(const p of pair){p.mesh.visible=i?t>=.78:true;p.mesh.position.copy(p.home);p.mesh.position.y+=insertionTravel*(1-k);}});
  requestRender();
 }
 function assemblyDiagnostics(){
  const c=connections.get(assemblyPose.id);if(!c)return null;
  const geometry=c.wire.geometry,radial=geometry.parameters.radialSegments,segments=geometry.parameters.tubularSegments,fraction=jacketProgress(c,assemblyPose.progress),ring=Math.ceil(fraction*segments),attr=geometry.getAttribute('position'),tip=new THREE.Vector3();
  const start=c.curve.getPointAt(0);
  if(ring>0){for(let j=0;j<radial;j++){const offset=ring*(radial+1)+j;tip.x+=attr.getX(offset);tip.y+=attr.getY(offset);tip.z+=attr.getZ(offset);}tip.divideScalar(radial);}else tip.copy(start);
  const ends=traceGeometry.getAttribute('instanceEnd'),index=traceGeometry.instanceCount-1,traceTip=index>=0?new THREE.Vector3(ends.getX(index),ends.getY(index),ends.getZ(index)):start;
  const destination=c.approach<1&&assemblyPose.progress>=.78?c.plugs[1][0].mesh.position:null;
  const plugTipError=destination?Math.hypot(tip.x-destination.x,tip.y-destination.y-jacketPort,tip.z-destination.z):null;
  return {fraction,wireTip:tip.toArray(),traceTip:traceTip.toArray(),tipError:tip.distanceTo(traceTip),plugTipError,visibleSegments:ring,segments,traceSegments:traceGeometry.instanceCount};
 }
 function setPlacement(value){
  if(placementPose?.id&&placementPose.id!==value?.id){const old=componentGroups.get(placementPose.id);if(old)old.group.position.copy(old.home);}
  const c=componentGroups.get(value?.id);placementPose=c?{id:value.id,progress:THREE.MathUtils.clamp(value.progress,0,1)}:null;
  if(placementGuideId!==placementPose?.id){
    placementGuides.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});placementGuides.clear();placementGuideId=placementPose?.id;
    for(const [i,h]of (c?.holes||[]).entries()){const ring=mesh(new THREE.TorusGeometry(i===0?.3:.23,.045,8,20),new THREE.MeshBasicMaterial({color:i===0?0xc7982e:0x177963,depthTest:false,depthWrite:false}),hpos(h,.15),placementGuides);ring.rotation.x=-Math.PI/2;ring.renderOrder=19;}
  }
  if(c){const p=placementPose.progress,k=smooth((p-.24)/.76);c.group.position.copy(c.home);c.group.position.y+=5.5*(1-k);}
  requestRender();
 }
 function updateStudio(studio){
  updateStrip(studio);
  for(const [id,o] of chipBodies){o.outline.visible=id===studio?.chip;o.body.material.transparent=Boolean(studio?.chip&&id!==studio.chip);o.body.material.opacity=studio?.chip&&id!==studio.chip?.toString()? .52:1;}
  setAssembly(studio?.assembly||null);
  setPlacement(studio?.placement||null);
  updateSignalTrace(studio?.signals||null);
 }

  function resize(){const {width,height}=container.getBoundingClientRect();if(!width||!height)return;camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height,false);traceLayers.forEach(line=>line.material.resolution.set(width,height));for(const line of signalTrace.children)line.material.resolution.set(width,height);requestRender();}
  const observer=new ResizeObserver(resize);observer.observe(container);
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();setActive(false);onFailure('Tu navegador perdió la vista 3D. Puedes seguir en 2D y volver a intentarlo.');});
  const visibility=()=>{if(document.hidden){finishMotion();if(raf)cancelAnimationFrame(raf);raf=0;}else requestRender();};document.addEventListener('visibilitychange',visibility);
  function setActive(value){active=value;componentHologram.setActive(value);if(!value){finishMotion();if(raf)cancelAnimationFrame(raf);raf=0;}else{resize();requestRender();}}
  camera.position.set(12,70,75);controls.target.set(0,0,0);controls.update();
  function selectionDiagnostics(){
    const first=traceGeometry.getAttribute('instanceStart'),last=traceGeometry.getAttribute('instanceEnd');
    return {visible:selectedTrace.visible,id:traceConnection,builds:traceBuilds,isolate:isolateWires,widths:traceLayers.map(line=>line.material.linewidth),resolution:traceLayers[0].material.resolution.toArray(),depthTest:traceLayers.some(line=>line.material.depthTest),curveA:first?[first.getX(0),first.getY(0),first.getZ(0)]:null,curveB:last?[last.getX(last.count-1),last.getY(last.count-1),last.getZ(last.count-1)]:null,visibleWires:[...connections].filter(([,c])=>c.it.kind==='wire'&&c.group.visible).map(([id])=>id),endpointLabels:[],endpointRings:markers.map(({ring})=>ring.visible),replayDuration:routeTween?.duration||null};
  }
  const sequenceGuides=new THREE.Group();scene.add(sequenceGuides);const componentRig=createComponentRig({groups:componentGroups,guideLayer:sequenceGuides,requestRender,makeRing:(h,i)=>{const ring=mesh(new THREE.TorusGeometry(i===0?.3:.23,.045,8,20),new THREE.MeshBasicMaterial({color:i===0?0xc7982e:0x177963,depthTest:false,depthWrite:false}),hpos(h,.15),sequenceGuides);ring.rotation.x=-Math.PI/2;ring.renderOrder=19;return ring;}});
  return {
    setComponentSequence:componentRig.apply,setExternalCable,update,focusBox,replay,setActive,setLEDs,setIndicators,setWireClarity,setAssembly,setPlacement,setSignals,
    dismissComponentLabel:componentHologram.dismiss,
    getComponentLabel(){const report=componentHologram.diagnostics();let flatNameCount=0;for(const target of report.targets){componentGroups.get(target.id)?.group.traverse(o=>{if(o.userData.viewerLabel&&!/^(\d+|I \/ O|STOP|SS0501A)$/.test(o.userData.labelText||''))flatNameCount++;});}return {...report,flatNameCount};},
    getViewState(){return {camera:camera.position.toArray(),target:controls.target.toArray(),box:[...lastBox],fitDistance,topView};},
    getPlanViewBox(){const scale=camera.position.distanceTo(controls.target)/Math.max(.01,fitDistance),w=lastBox[2]*scale,h=lastBox[3]*scale;return [centerX+controls.target.x*30-w/2,centerZ+controls.target.z*30-h/2,w,h];},
    restoreViewState(value){if(!value||!['camera','target'].every(k=>Array.isArray(value[k])&&value[k].length===3&&value[k].every(Number.isFinite)))return false;const distance=new THREE.Vector3().fromArray(value.camera).distanceTo(new THREE.Vector3().fromArray(value.target));if(distance<controls.minDistance||distance>controls.maxDistance)return false;cameraTween=null;const damping=controls.enableDamping;controls.enableDamping=false;controls.update();camera.position.fromArray(value.camera);controls.target.fromArray(value.target);topView=Boolean(value.topView);if(Array.isArray(value.box)&&value.box.length===4&&value.box.every(Number.isFinite)&&value.box[2]>0&&value.box[3]>0)lastBox=[...value.box];if(Number.isFinite(value.fitDistance)&&value.fitDistance>0)fitDistance=value.fitDistance;controls.update();controls.enableDamping=damping;canvas.dataset.moving='false';requestRender();return true;},
    setAppearance(value={}){if(['auto','economy','sharp'].includes(value.quality)&&value.quality!==viewAppearance.quality){viewAppearance.quality=value.quality;renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,value.quality==='economy'?1:value.quality==='sharp'?2:1.6));resize();}if(['full','reduced','off'].includes(value.motion))viewAppearance.motion=value.motion;if(value.background&&value.background!==viewAppearance.background){scene.background.set(value.background);viewAppearance.background=value.background;}if(viewAppearance.motion!=='full'&&cameraTween){camera.position.copy(cameraTween.toPos);controls.target.copy(cameraTween.toTarget);cameraTween=null;controls.update();canvas.dataset.moving='false';}requestRender();},
    getAppearance(){return {...viewAppearance};},
    setSelectionStyle(value={}){if([1,1.4,1.8].includes(value.scale))selectionStyle.scale=value.scale;if([.5,.8,1].includes(value.intensity))selectionStyle.intensity=value.intensity;traceLayers.forEach((line,i)=>{line.material.linewidth=[10,7,3][i]*selectionStyle.scale;line.material.opacity=i===2?1:selectionStyle.intensity;});requestRender();},
    getSelectionStyle(){return {...selectionStyle};},
    stopReplay(){routeTween=null;traveler.visible=false;requestRender();},
    capture(){renderer.render(scene,camera);return canvas.toDataURL('image/png');},
    preset(value){topView=value==='top';if(!topView){cameraTween=null;camera.position.copy(controls.target).add(new THREE.Vector3(12,70,75));controls.update();}focusBox(lastBox,true);},
    zoom(){const center=controls.target.clone(),to=center.clone().add(camera.position.clone().sub(center).multiplyScalar(.75));cameraTween=null;if(snapshot?.animate&&viewAppearance.motion==='full'){cameraTween={fromPos:camera.position.clone(),toPos:to,fromTarget:center,toTarget:center,started:performance.now()};canvas.dataset.moving='true';requestRender();}else{camera.position.copy(to);controls.update();requestRender();}},
    rotate(dir){topView=false;const v=camera.position.clone().sub(controls.target);v.applyAxisAngle(new THREE.Vector3(0,1,0),dir*Math.PI/6);const to=controls.target.clone().add(v);if(snapshot?.animate&&viewAppearance.motion==='full'){cameraTween={fromPos:camera.position.clone(),toPos:to,fromTarget:controls.target.clone(),toTarget:controls.target.clone(),started:performance.now()};canvas.dataset.moving='true';requestRender();}else{camera.position.copy(to);controls.update();requestRender();}},
    diagnostics(){const rect=canvas.getBoundingClientRect(),project=p=>{const v=p.clone().project(camera);return [rect.left+(v.x+1)*rect.width/2,rect.top+(1-v.y)*rect.height/2];};return {componentAssembly:componentRig.diagnostics(),motors:[...connections.values()].filter(c=>c.it.kind==='motor').map(c=>({id:c.it.partId,model:c.it.externalMotor?.model||'generic',terminals:c.it.externalMotor?.terminals.length||2,routeTypes:externalMotorWiring.find(m=>m.id===c.it.partId)?.cables.map(w=>w.curve.type)||[]})),externalControls:externalControlBodies.map(c=>({id:c.id,model:c.model,center:c.center,bounds:c.bounds,connections:c.connections,cables:c.cables.map(w=>({terminal:w.terminal,routeType:w.curve.type,visible:w.group.visible,progress:w.nativeId?(assemblyPose.id===w.nativeId?assemblyPose.progress:1):w.progress,drawCount:w.wire.geometry.drawRange.count,start:w.curve.getPoint(0).toArray(),end:w.curve.getPoint(1).toArray(),tip:w.nativeId?(assemblyPose.id===w.nativeId?w.curve.getPointAt(smooth((assemblyPose.progress-.22)/.56)):w.curve.getPoint(1)).toArray():w.tip.position.toArray()})),actuated:c.actuator.userData.actuated,actuator:c.actuator.position.toArray(),screen:project(toWorld(c.center,2.5))})),studio:{signals:signalPose?{...signalPose,builds:signalBuilds}:null,placement:placementPose?{...placementPose,height:componentGroups.get(placementPose.id).group.position.y,holes:componentGroups.get(placementPose.id).holes}:null,chip:snapshot?.studio?.chip||null,stripHoles:snapshot?.studio?.stripHoles||[],assembly:{...assemblyPose},reveal:assemblyDiagnostics(),partialDrawCount:assemblyPose.id?connections.get(assemblyPose.id)?.wire.geometry.drawRange.count:null},selection:selectionDiagnostics(),wireClarity,routedConnections:[...connections.values()].filter(c=>c.routed).length,wireStates:Object.fromEntries([...connections].filter(([,c])=>c.routed).map(([id,c])=>[id,{opacity:c.wire.material.opacity,height:c.height,curveA:c.curve.getPoint(0).toArray(),curveB:c.curve.getPoint(1).toArray()}])),connectionCount:connections.size,pinCount:pinMeshes.length,arrayPinCount:arrayPinMeshes.length,resistorArrays:(model.arrays||[]).length,resistors:model.items.filter(it=>it.kind==='res').length,frames:renderedFrames,active,moving:Boolean(cameraTween),camera:camera.position.toArray(),target:controls.target.toArray(),drawCalls:renderer.info.render.calls,triangles:renderer.info.render.triangles,targets:{contacts:[project(hpos(['A','d',12],.03))],chips:[...chipBodies].map(([id,o])=>({id,screen:project(o.body.position)})),switches:switches.slice(0,3).map(s=>project(s.position)),dipContacts:switches.filter(s=>s.userData.dipSlider).map(s=>{const id=s.userData.componentHint,chip=model.chips.find(c=>c.id===id),position=Object.entries(chip.functions).find(([,bit])=>bit===s.userData.bit)?.[0],body=chipBodies.get(id).body,p=body.position.clone().add(new THREE.Vector3(Number(position)-2.5,.64,.95));return {bit:s.userData.bit,id,slider:project(s.getWorldPosition(new THREE.Vector3())),body:project(body.parent.localToWorld(p))};}),pins:pinMeshes.map(m=>({u:m.userData.u,p:m.userData.p,screen:project(m.geometry.parameters.path.getPoint(.15))})),wires:Object.fromEntries([...connections].map(([id,c])=>[id,project(c.curve.getPoint(.5))]))},endpoints:Object.fromEntries([...connections].map(([id,c])=>[id,{a:c.it.a,b:c.it.b,worldA:c.a.toArray(),worldB:c.b.toArray()}])),lit:[...ledLenses].filter(([,m])=>m.userData.lit).map(([name])=>name)};},
    dispose(){setActive(false);componentHologram.dispose();observer.disconnect();document.removeEventListener('visibilitychange',visibility);controls.dispose();const geometries=new Set(),materials=new Set(),textures=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);for(const m of [].concat(o.material||[])){materials.add(m);if(m.map)textures.add(m.map);if(m.bumpMap)textures.add(m.bumpMap);}});textures.forEach(t=>t.dispose());materials.forEach(m=>m.dispose());geometries.forEach(g=>g.dispose());renderer.dispose();canvas.remove();}
  };
}
