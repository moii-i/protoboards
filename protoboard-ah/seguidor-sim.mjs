// Simulación del recorrido: un carrito de tracción diferencial sobre una pista.
// Sin DOM: la usan la página (canvas) y las pruebas en Node.
//
// Los sensores leen la superficie que tienen debajo (negra o blanca). Esa lectura
// entra a la lógica calculada desde las patas del modelo (createLogic) y su
// resultado (avanza / freno) mueve cada rueda. Unidades: mm, s y radianes.
// Es una demostración geométrica: no modela fricción, voltaje de pilas ni la
// sensibilidad real del módulo infrarrojo.

// Medidas del modelo 3D (modelos/agv-seguidor.blend): kit 2WD con rueda loca adelante.
export const car={
  track:134,        // separación entre centros de las ruedas
  sensorAhead:128,  // de eje a sensores
  sensorGap:12,     // entre centros de los dos sensores (menor que la cinta)
  wheel:66,         // diámetro de rueda TT
  rear:62,length:200,width:116
};
export const mat={width:1800,height:1200,line:19};

// Riñón cerrado: rectas, curvas a la izquierda y una curva a la derecha (la muesca).
const controls=[[420,960],[900,1010],[1380,960],[1610,720],[1520,400],[1180,230],[930,420],[690,250],[340,300],[190,620]];
function catmull(points,samples=60){
  const out=[];
  for(let i=0;i<points.length;i++){
    const p0=points[(i-1+points.length)%points.length],p1=points[i],p2=points[(i+1)%points.length],p3=points[(i+2)%points.length];
    for(let s=0;s<samples;s++){
      const t=s/samples,t2=t*t,t3=t2*t;
      out.push([0,1].map(k=>.5*((2*p1[k])+(-p0[k]+p2[k])*t+(2*p0[k]-5*p1[k]+4*p2[k]-p3[k])*t2+(-p0[k]+3*p1[k]-3*p2[k]+p3[k])*t3)));
    }
  }
  return out;
}
export function buildTrack(points=controls){
  const path=catmull(points),cumulative=[0];
  for(let i=1;i<=path.length;i++){const a=path[i-1],b=path[i%path.length];cumulative.push(cumulative[i-1]+Math.hypot(b[0]-a[0],b[1]-a[1]));}
  return {path,cumulative,length:cumulative[path.length]};
}
export const track=buildTrack();

// Distancia del punto a la línea central y posición a lo largo de la pista.
export function nearest(t,[x,y],hint){
  const n=t.path.length;let best=Infinity,index=0,along=0;
  const scan=hint==null?[...Array(n).keys()]:Array.from({length:121},(_,k)=>(hint-60+k+n)%n);
  for(const i of scan){
    const a=t.path[i],b=t.path[(i+1)%n],dx=b[0]-a[0],dy=b[1]-a[1],len2=dx*dx+dy*dy;
    const u=len2?Math.max(0,Math.min(1,((x-a[0])*dx+(y-a[1])*dy)/len2)):0;
    const d=Math.hypot(x-a[0]-u*dx,y-a[1]-u*dy);
    if(d<best){best=d;index=i;along=t.cumulative[i]+u*Math.sqrt(len2);}
  }
  return {distance:best,index,along};
}

export function startPose(t=track,offset=0){
  const a=t.path[0],b=t.path[3],heading=Math.atan2(b[1]-a[1],b[0]-a[0]);
  // El carrito empieza con sus sensores sobre la cinta.
  return {x:a[0]-Math.cos(heading)*car.sensorAhead-Math.sin(heading)*offset,y:a[1]-Math.sin(heading)*car.sensorAhead+Math.cos(heading)*offset,heading};
}

/**
 * evaluate({SI,SD,SEL}) → {left,right} con 'avanza' | 'freno' | 'reversa' | 'libre'.
 * mode: 'negra' (cinta negra sobre blanco) o 'blanca' (cinta blanca sobre negro).
 */
export function createSim({evaluate,t=track,speed=320,lag=.07,trim={left:1,right:1}}){
  let state;
  function reset({mode=state?.mode||'negra',selector=state?.selector??0}={}){
    state={...startPose(t),mode,selector,vl:0,vr:0,time:0,travelled:0,progress:0,hint:null,status:'listo',reason:'',sensors:{SI:0,SD:0},motors:{left:'freno',right:'freno'},nets:{}};
    read();
    return state;
  }
  const sensorPoints=()=>{
    const {x,y,heading}=state,fx=Math.cos(heading),fy=Math.sin(heading),lx=Math.sin(heading),ly=-Math.cos(heading);
    const cx=x+fx*car.sensorAhead,cy=y+fy*car.sensorAhead,h=car.sensorGap/2;
    return {SI:[cx+lx*h,cy+ly*h],SD:[cx-lx*h,cy-ly*h],center:[cx,cy]};
  };
  const onMat=([x,y])=>x>=0&&y>=0&&x<=mat.width&&y<=mat.height;
  // DO del módulo: 1 sobre superficie negra (no refleja), 0 sobre blanca.
  function surfaceBlack(p){
    if(!onMat(p))return null;
    const line=nearest(t,p,state.hint).distance<=mat.line/2;
    return state.mode==='negra'?line:!line;
  }
  function read(){
    const pts=sensorPoints(),here=nearest(t,pts.center,state.hint);
    state.hint=here.index;state.lateral=here.distance;
    const SI=surfaceBlack(pts.SI),SD=surfaceBlack(pts.SD);
    if(SI==null||SD==null){state.status='fuera';state.reason='El carrito salió del tapete.';return;}
    state.sensors={SI:SI?1:0,SD:SD?1:0};
    const out=evaluate({...state.sensors,SEL:state.selector});
    state.motors={left:out.left,right:out.right};state.nets=out.nets||{};
    return here;
  }
  function step(dt){
    if(state.status==='fuera'||state.status==='alto')return state;
    state.status='corriendo';
    const target=m=>m==='avanza'?speed:m==='reversa'?-speed:0;
    const k=Math.min(1,dt/lag);
    // trim: motores reales nunca son idénticos (1 = velocidad nominal).
    state.vl+=(target(state.motors.left)*trim.left-state.vl)*k;
    state.vr+=(target(state.motors.right)*trim.right-state.vr)*k;
    const v=(state.vl+state.vr)/2,w=(state.vr-state.vl)/car.track;
    state.heading-=w*dt;
    state.x+=Math.cos(state.heading)*v*dt;state.y+=Math.sin(state.heading)*v*dt;
    state.time+=dt;state.travelled+=Math.abs(v)*dt;
    const before=state.progressAlong,here=read();
    if(state.status==='fuera')return state;
    if(here){
      if(before!=null){let d=here.along-before;if(d>t.length/2)d-=t.length;if(d<-t.length/2)d+=t.length;state.progress+=d;}
      state.progressAlong=here.along;
    }
    // Línea perdida: los dos motores en freno y el carrito ya detenido.
    if(state.motors.left!=='avanza'&&state.motors.right!=='avanza'&&Math.abs(state.vl)+Math.abs(state.vr)<4){
      state.status='alto';state.reason='Ningún sensor ve la línea: los dos motores frenan.';state.vl=state.vr=0;
    }
    return state;
  }
  return {
    reset,step,
    get state(){return state;},
    sensorPoints,
    setSelector(v){state.selector=v?1:0;if(state.status==='alto')state.status='listo';read();},
    setMode(m){state.mode=m;if(state.status==='alto')state.status='listo';read();},
    // Desplaza el carrito de lado para probar la pérdida de línea.
    nudge(mm){state.x+=Math.sin(state.heading)*mm;state.y-=Math.cos(state.heading)*mm;if(state.status!=='fuera')state.status='listo';read();},
    laps:()=>state.progress/t.length
  };
}
