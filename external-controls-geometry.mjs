/* Illustrative physical bodies; electrical nodes remain in the shared circuit model. */
export function buildExternalControl(api){
 const {THREE,it,group,mesh,box,roundedBox,toWorld,hpos,topLabel,contactShadow,pickables,switches,metal,dark}=api;
 const e=it.externalControl,c=toWorld(e.center,0),isSlide=e.model==='scmm-122';
 const steel=new THREE.MeshStandardMaterial({color:0x5d6462,metalness:.76,roughness:.42});
 const plastic=new THREE.MeshStandardMaterial({color:isSlide?0x232a2b:0x3b9e9b,roughness:.6});
 const phenolic=new THREE.MeshStandardMaterial({color:0xad772c,roughness:.77});
 const solder=new THREE.MeshStandardMaterial({color:0xc6cbca,metalness:.87,roughness:.27});
 const sleeve=new THREE.MeshStandardMaterial({color:0x202a2b,roughness:.83});
 const addPick=o=>{o.userData={...o.userData,bit:it.value};pickables.push(o);return o;};
 function profile(w,h,r){
  const s=new THREE.Shape(),x=-w/2,y=-h/2;
  s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);
  s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);
  s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
 }
 let actuator;
 if(isSlide){
  roundedBox(4.55,.2,2.2,c.clone().setY(.62),phenolic,group,.05);
  addPick(roundedBox(4.45,1.35,2.1,c.clone().setY(1.4),plastic,group,.12));
  const face=profile(8,2.55,.2);
  for(const x of [-3.13,3.13]){const hole=new THREE.Path();hole.absellipse(x,0,.45,.31,0,Math.PI*2,true);face.holes.push(hole);}
  const slot=new THREE.Path();slot.moveTo(-1.4,-.53);slot.lineTo(-1.4,.53);slot.lineTo(1.4,.53);slot.lineTo(1.4,-.53);slot.closePath();face.holes.push(slot);
  const plate=addPick(mesh(new THREE.ExtrudeGeometry(face,{depth:.12,bevelEnabled:true,bevelSize:.025,bevelThickness:.025,bevelSegments:2,steps:1}),steel,c.clone().setY(2.13),group));plate.rotation.x=-Math.PI/2;
  // Folded metal sides and retaining crimps match the small screw-mount slide body.
  for(const z of [-1.23,1.23])box(4.5,1.1,.1,c.clone().setY(1.55).add(new THREE.Vector3(0,0,z)),steel,group);
  for(const x of [-1.75,1.75])for(const z of [-1.18,1.18])box(.42,.34,.15,c.clone().setY(.9).add(new THREE.Vector3(x,0,z)),steel,group);
  actuator=new THREE.Group();actuator.position.copy(c).setY(2.26);group.add(actuator);
  addPick(roundedBox(.98,1.05,.85,new THREE.Vector3(0,.42,0),dark,actuator,.06));
  for(let i=0;i<5;i++)box(.075,.98,.92,new THREE.Vector3(-.39+i*.195,.43,0),plastic,actuator);
  actuator.userData={externalControl:'scmm-122',switchId:it.value,homeX:c.x};
  const zero=topLabel('0',c.clone().add(new THREE.Vector3(-2.3,2.285,0)),.38,.5,{background:'#5d6462',color:'#e0e7df',size:90});
  const one=topLabel('1',c.clone().add(new THREE.Vector3(2.3,2.285,0)),.38,.5,{background:'#5d6462',color:'#e0e7df',size:90});group.add(zero,one);
 }else{
  const shape=profile(6.45,2.9,.22);
  for(const x of [-1.82,1.82]){const h=new THREE.Path();h.absarc(x,0,.43,0,Math.PI*2,true);shape.holes.push(h);}
  addPick(mesh(new THREE.ExtrudeGeometry(shape,{depth:2.3,bevelEnabled:true,bevelSize:.035,bevelThickness:.035,bevelSegments:2,steps:1}),plastic,c.clone().add(new THREE.Vector3(0,1.65,-1.15)),group));
  for(const x of [-1.82,1.82])for(const z of [-1.2,1.2])mesh(new THREE.TorusGeometry(.45,.055,8,24),plastic,c.clone().add(new THREE.Vector3(x,1.65,z)),group);
  roundedBox(5.9,.09,2.18,c.clone().add(new THREE.Vector3(0,3.15,0)),plastic,group,.04);
  const plunger=addPick(roundedBox(.95,.62,.9,c.clone().add(new THREE.Vector3(1.2,3.22,0)),dark,group,.09));
  const hinge=c.clone().add(new THREE.Vector3(-2.55,3.25,0));
  const pivotPin=mesh(new THREE.CylinderGeometry(.17,.17,1.1,20),metal,hinge,group);pivotPin.rotation.x=Math.PI/2;
  actuator=new THREE.Group();actuator.position.copy(hinge);group.add(actuator);
  addPick(box(7.45,.11,.85,new THREE.Vector3(3.42,.08,0),metal,actuator));
  const tip=box(.5,.1,.85,new THREE.Vector3(7.05,.15,0),metal,actuator);tip.rotation.z=.25;addPick(tip);
  actuator.userData={externalControl:'ss0501a',switchId:it.value,plunger,plungerY:plunger.position.y};
  const stamp=topLabel('SS0501A',c.clone().add(new THREE.Vector3(0,3.21,.7)),3.6,.6,{background:'#3b9e9b',color:'#237975',size:56});group.add(stamp);
 }
 switches.push(actuator);contactShadow(c,isSlide?10:10.8,6.3,group);
 const logical=[it.a,it.b,it.third];
 const connections=e.terminals.map((terminal,i)=>{
  const t=toWorld(terminal,1.02),port=hpos(logical[i],.08);
  const neckStart=c.clone().add(new THREE.Vector3((i-1)*1.5,.72,1.08));
  mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([neckStart,neckStart.clone().add(new THREE.Vector3(0,-.18,.5)),t]),12,.085,8,false),metal,new THREE.Vector3(),group);
  // The visible solder eye and shrink sleeve belong to the external part, not a breadboard pin.
  box(.38,.68,.13,t.clone().add(new THREE.Vector3(0,.15,-.15)),metal,group);
  mesh(new THREE.TorusGeometry(.18,.065,8,20),metal,t,group);
  mesh(new THREE.SphereGeometry(.17,12,8),solder,t.clone().add(new THREE.Vector3(0,-.06,.03)),group);
  const tail=t.clone().add(new THREE.Vector3(0,-.18,.65));
  const shrink=mesh(new THREE.CylinderGeometry(.19,.17,.65,16),sleeve,t.clone().add(new THREE.Vector3(0,-.09,.32)),group);shrink.rotation.x=Math.PI/2;
  const color=new THREE.MeshStandardMaterial({color:e.colors[i],roughness:.74});
  const turn=toWorld([e.center[0]-150-i*18,e.center[1]-155-i*17],1.7+i*.28),front=toWorld([e.center[0]+(i-1)*52,e.center[1]+135+i*10],.9+i*.18);
  const route=new THREE.CatmullRomCurve3([port,port.clone().setY(1.1+i*.28),toWorld([pointX(logical[i]),815+i*24],1.8+i*.28),turn,front,tail,t],false,'centripetal');
  const wire=mesh(new THREE.TubeGeometry(route,48,.095,8,false),color,new THREE.Vector3(),group);wire.userData={id:it.id};pickables.push(wire);
  box(.3,.46,.3,port.clone().setY(.23),sleeve,group);
  const tag=topLabel((isSlide?['+5','COM','GND']:['NC','COM','NA'])[i],t.clone().add(new THREE.Vector3(0,-.87,1.05)),1.45,1.8,{background:'#edf1ed',color:i===0?'#b64143':'#364e49',size:54});group.add(tag);
  return {hole:logical[i],terminal,worldTerminal:t.toArray(),function:e.functions[i]};
 });
 function pointX(h){return api.point(h)[0];}
 const title=topLabel(it.value+' · '+e.model.toUpperCase(),c.clone().add(new THREE.Vector3(0,.065,-3.15)),10,3.1,{background:'#edf1ed',color:it.value==='STOP'?'#a64445':'#345a4a',size:45});group.add(title);
 const type=topLabel(isSlide?'DESLIZABLE · MANTENIDO':'PALANCA · FIN DE CARRERA',c.clone().add(new THREE.Vector3(0,.065,7.2)),10,2.8,{background:'#edf1ed',color:'#587363',size:37});group.add(type);
 updateExternalControl(actuator,false);
 return {id:it.partId,model:e.model,center:e.center,bounds:e.bounds,connections,actuator};
}
export function updateExternalControl(actuator,on){
 const d=actuator.userData;
 if(d.externalControl==='scmm-122')actuator.position.x=d.homeX+(on?.72:-.72);
 else if(d.externalControl==='ss0501a'){actuator.rotation.z=on?.012:.16;d.plunger.position.y=d.plungerY-(on?.19:0);}
 d.actuated=Boolean(on);
}
