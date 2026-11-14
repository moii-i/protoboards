var S_=Object.defineProperty;var M_=(s,e)=>{for(var t in e)S_(s,t,{get:e[t],enumerable:!0})};function nm({groups:s,requestRender:e,makeRing:t,guideLayer:n}){let i=null,r="";function o(a){i=a;let l=a?.id||"";if(l!==r){for(let h of[...n.children])h.geometry?.dispose(),h.material?.dispose(),n.remove(h);r=l;let c=s.get(l);if(c&&!c.external)for(let[h,d]of c.holes.entries()){let u=t(d,h);n.add(u)}}for(let[c,h]of s){h.home||=h.group.position.clone(),h.group.position.copy(h.home);let d=a?.order?.indexOf(c)??-1;if(h.group.visible=!a||d<0||d<=a.index,a&&c===a.id){let u=Math.max(0,Math.min(1,(a.progress-.18)/.82)),f=u*u*(3-2*u);h.external?(h.group.position.x+=4*(1-f),h.group.position.y+=.7*(1-f)):h.group.position.y+=5.5*(1-f)}}n.visible=!!a,e()}return{apply:o,diagnostics:()=>({pose:i?{id:i.id,index:i.index,progress:i.progress}:null,components:[...s].map(([a,l])=>({id:a,visible:l.group.visible,position:l.group.position.toArray(),home:l.home?.toArray(),holes:l.holes,external:!!l.external}))})}}function im({THREE:s,scene:e,container:t,camera:n,canvas:i,requestRender:r}){let o=new Map,a=new Map,l=null,c=null,h=!1,d=document.createElement("div");d.className="component-hologram",d.id="doorComponentHologram",d.hidden=!0,d.setAttribute("role","status"),d.setAttribute("aria-live","polite"),d.setAttribute("aria-atomic","true");let u=document.createElement("span"),f=document.createElement("strong"),p=document.createElement("span");u.className="hologram-kind",p.className="hologram-detail",d.append(u,f,p),t.append(d);let _=new s.Group;_.visible=!1,e.add(_);let g=new s.MeshBasicMaterial({color:6806741,transparent:!0,opacity:.65,depthWrite:!1,toneMapped:!1}),m=new s.Mesh(new s.TorusGeometry(.76,.025,8,48),g);m.rotation.x=-Math.PI/2,_.add(m);let S=new s.Mesh(new s.CylinderGeometry(.012,.012,1.2,6),g.clone());S.position.y=.6,S.material.opacity=.35,_.add(S);let b=new s.Vector3,x=new s.Vector3,A=new s.Vector3;function T(N){for(;N;){if(!N.visible)return!1;N=N.parent}return!0}function D(N){["led","res","switch","chip"].includes(N.type)&&(o.set(N.id,N),N.connectionId&&a.set(N.connectionId,N.id))}function v(N){return o.get(a.get(N)||N)||null}function R(){l=null,d.hidden=!0,_.visible=!1,i.setAttribute("aria-describedby","threeHelp"),r()}function L(N,{toggle:B=!1}={}){let V=v(N);if(!V||B&&l?.id===V.id){R();return}l?.id!==V.id&&(l=V,u.textContent={led:"INDICADOR",res:"RESISTENCIA",switch:"CONTROL",chip:"INTEGRADO"}[V.type],f.textContent=V.title,p.textContent=typeof V.detail=="function"?V.detail():V.detail||"",p.hidden=!p.textContent,d.dataset.component=V.id,d.dataset.kind=V.type),i.setAttribute("aria-describedby","threeHelp "+d.id),k(),r()}function O(N,B){N!==c&&(c=N,L(B))}function k(){if(!h||!l||!T(l.group)){d.hidden=!0,_.visible=!1;return}let N=typeof l.detail=="function"?l.detail():l.detail||"";p.textContent!==N&&(p.textContent=N),p.hidden=!N;let B=t.getBoundingClientRect();if(!B.width||!B.height)return;if(l.group.updateWorldMatrix(!0,!1),b.copy(l.anchor).applyMatrix4(l.group.matrixWorld),n.updateMatrixWorld(),A.copy(b).project(n),A.z<-1||A.z>1||Math.abs(A.x)>1.03||Math.abs(A.y)>1.03){d.hidden=!0,_.visible=!1;return}_.position.copy(b),_.visible=!0,x.copy(b),x.y+=1.7,x.project(n),d.hidden=!1;let V=Math.min(228,B.width-24),X=d.getBoundingClientRect?.().height||76,Q=(A.x+1)*B.width/2,q=(1-A.y)*B.height/2,K=Math.max(V/2+10,Math.min(B.width-V/2-10,Q)),re=Math.max(X+12,Math.min(B.height-10,(1-x.y)*B.height/2,q-22));d.style.width=V+"px",d.style.left=K+"px",d.style.top=re+"px"}let Y=N=>{N.key==="Escape"&&l&&(N.preventDefault(),N.stopPropagation(),R())};return i.addEventListener("keydown",Y),{register:D,resolve:v,select:L,sync:O,dismiss:R,layout:k,setActive(N){h=N,N?k():R()},diagnostics(){let N=l,B=d.getBoundingClientRect?.(),V=t.getBoundingClientRect();return n.updateMatrixWorld(),{id:N?.id||null,type:N?.type||null,title:f.textContent,detail:p.textContent,visible:!d.hidden,halo:_.visible,anchor:b.toArray(),screen:B?[B.left,B.top,B.right,B.bottom]:null,targets:[...o.values()].map(X=>{X.group.updateWorldMatrix(!0,!1);let Q=(X.hitPoint||X.anchor).clone().applyMatrix4(X.group.matrixWorld),q=Q.clone().project(n);return{id:X.id,type:X.type,title:X.title,world:Q.toArray(),screen:[V.left+(q.x+1)*V.width/2,V.top+(1-q.y)*V.height/2]}})}},dispose(){i.removeEventListener("keydown",Y),d.remove(),_.removeFromParent(),m.geometry.dispose(),S.geometry.dispose(),g.dispose(),S.material.dispose()}}}function Nd(s,e,t,n,i,r){let o=[n,...e.map(l=>t(l,r)),i],a=new s.CurvePath;for(let l=1;l<o.length;l++)o[l-1].distanceToSquared(o[l])>1e-12&&a.add(new s.LineCurve3(o[l-1],o[l]));return a}function sm(s){let{THREE:e,it:t,group:n,mesh:i,box:r,roundedBox:o,toWorld:a,hpos:l,topLabel:c,contactShadow:h,pickables:d,switches:u,metal:f,dark:p,componentLabels:_=!0}=s,g=t.externalControl,m=a(g.center,0),S=g.model==="scmm-122",b=new e.MeshStandardMaterial({color:6120546,metalness:.76,roughness:.42}),x=new e.MeshStandardMaterial({color:S?2304555:3907227,roughness:.6}),A=new e.MeshStandardMaterial({color:11368236,roughness:.77}),T=new e.MeshStandardMaterial({color:13028298,metalness:.87,roughness:.27}),D=new e.MeshStandardMaterial({color:2107947,roughness:.83}),v=B=>(B.userData={...B.userData,bit:t.value,componentHint:t.partId||t.id},d.push(B),B);function R(B,V,X){let Q=new e.Shape,q=-B/2,K=-V/2;return Q.moveTo(q+X,K),Q.lineTo(q+B-X,K),Q.quadraticCurveTo(q+B,K,q+B,K+X),Q.lineTo(q+B,K+V-X),Q.quadraticCurveTo(q+B,K+V,q+B-X,K+V),Q.lineTo(q+X,K+V),Q.quadraticCurveTo(q,K+V,q,K+V-X),Q.lineTo(q,K+X),Q.quadraticCurveTo(q,K,q+X,K),Q}let L;if(S){o(4.55,.2,2.2,m.clone().setY(.62),A,n,.05),v(o(4.45,1.35,2.1,m.clone().setY(1.4),x,n,.12));let B=R(8,2.55,.2);for(let K of[-3.13,3.13]){let re=new e.Path;re.absellipse(K,0,.45,.31,0,Math.PI*2,!0),B.holes.push(re)}let V=new e.Path;V.moveTo(-1.4,-.53),V.lineTo(-1.4,.53),V.lineTo(1.4,.53),V.lineTo(1.4,-.53),V.closePath(),B.holes.push(V);let X=v(i(new e.ExtrudeGeometry(B,{depth:.12,bevelEnabled:!0,bevelSize:.025,bevelThickness:.025,bevelSegments:2,steps:1}),b,m.clone().setY(2.13),n));X.rotation.x=-Math.PI/2;for(let K of[-1.23,1.23])r(4.5,1.1,.1,m.clone().setY(1.55).add(new e.Vector3(0,0,K)),b,n);for(let K of[-1.75,1.75])for(let re of[-1.18,1.18])r(.42,.34,.15,m.clone().setY(.9).add(new e.Vector3(K,0,re)),b,n);L=new e.Group,L.position.copy(m).setY(2.26),n.add(L),v(o(.98,1.05,.85,new e.Vector3(0,.42,0),p,L,.06));for(let K=0;K<5;K++)r(.075,.98,.92,new e.Vector3(-.39+K*.195,.43,0),x,L);L.userData={externalControl:"scmm-122",switchId:t.value,homeX:m.x};let Q=c("0",m.clone().add(new e.Vector3(-2.3,2.285,0)),.38,.5,{background:"#5d6462",color:"#e0e7df",size:90}),q=c("1",m.clone().add(new e.Vector3(2.3,2.285,0)),.38,.5,{background:"#5d6462",color:"#e0e7df",size:90});n.add(Q,q)}else{let B=R(6.45,2.9,.22);for(let re of[-1.82,1.82]){let ke=new e.Path;ke.absarc(re,0,.43,0,Math.PI*2,!0),B.holes.push(ke)}v(i(new e.ExtrudeGeometry(B,{depth:2.3,bevelEnabled:!0,bevelSize:.035,bevelThickness:.035,bevelSegments:2,steps:1}),x,m.clone().add(new e.Vector3(0,1.65,-1.15)),n));for(let re of[-1.82,1.82])for(let ke of[-1.2,1.2])i(new e.TorusGeometry(.45,.055,8,24),x,m.clone().add(new e.Vector3(re,1.65,ke)),n);o(5.9,.09,2.18,m.clone().add(new e.Vector3(0,3.15,0)),x,n,.04);let V=v(o(.95,.62,.9,m.clone().add(new e.Vector3(1.2,3.22,0)),p,n,.09)),X=m.clone().add(new e.Vector3(-2.55,3.25,0)),Q=i(new e.CylinderGeometry(.17,.17,1.1,20),f,X,n);Q.rotation.x=Math.PI/2,L=new e.Group,L.position.copy(X),n.add(L),v(r(7.45,.11,.85,new e.Vector3(3.42,.08,0),f,L));let q=r(.5,.1,.85,new e.Vector3(7.05,.15,0),f,L);q.rotation.z=.25,v(q),L.userData={externalControl:"ss0501a",switchId:t.value,plunger:V,plungerY:V.position.y};let K=c("SS0501A",m.clone().add(new e.Vector3(0,3.21,.7)),3.6,.6,{background:"#3b9e9b",color:"#237975",size:56});n.add(K)}u.push(L),h(m,S?10:10.8,6.3,n);let O=[t.a,t.b,t.third],k=[],Y=g.terminals.map((B,V)=>{let X=a(B,1.02),Q=l(O[V],.08),q=m.clone().add(new e.Vector3((V-1)*1.5,.72,1.08));i(new e.TubeGeometry(new e.CatmullRomCurve3([q,q.clone().add(new e.Vector3(0,-.18,.5)),X]),12,.085,8,!1),f,new e.Vector3,n),r(.38,.68,.13,X.clone().add(new e.Vector3(0,.15,-.15)),f,n),i(new e.TorusGeometry(.18,.065,8,20),f,X,n),i(new e.SphereGeometry(.17,12,8),T,X.clone().add(new e.Vector3(0,-.06,.03)),n);let K=X.clone().add(new e.Vector3(0,-.18,.65)),re=i(new e.CylinderGeometry(.19,.17,.65,16),D,X.clone().add(new e.Vector3(0,-.09,.32)),n);re.rotation.x=Math.PI/2;let ke=new e.MeshStandardMaterial({color:g.colors[V],roughness:.74}),He=a([g.center[0]-150-V*18,g.center[1]-155-V*17],1.7+V*.28),wt=a([g.center[0]+(V-1)*52,g.center[1]+135+V*10],.9+V*.18),St=g.cableRoutes?.[V]?Nd(e,g.cableRoutes[V],a,X,Q,g.cableHeights[V]):new e.CatmullRomCurve3([X,K,wt,He,a([N(O[V]),815+V*24],1.8+V*.28),Q.clone().setY(1.1+V*.28),Q],!1,"centripetal"),et=new e.Group;n.add(et);let ee=i(new e.TubeGeometry(St,96,.095,8,!1),ke,new e.Vector3,et);ee.userData={id:t.id},d.push(ee);let se=r(.3,.46,.3,Q.clone().setY(.23),D,et),me=i(new e.SphereGeometry(.17,12,8),new e.MeshBasicMaterial({color:15054145}),X.clone(),et);if(me.visible=!1,k.push({group:et,wire:ee,curve:St,plug:se,tip:me,point:new e.Vector3,normal:new e.Vector3,terminal:V,progress:1}),_){let nt=c((S?["+5","COM","GND"]:["NC","COM","NA"])[V],X.clone().add(new e.Vector3(0,-.87,1.05)),1.45,1.8,{background:"#edf1ed",color:V===0?"#b64143":"#364e49",size:54});n.add(nt)}return{hole:O[V],terminal:B,worldTerminal:X.toArray(),function:g.functions[V]}});function N(B){return s.point(B)[0]}if(_){let B=c(t.value+" \xB7 "+g.model.toUpperCase(),m.clone().add(new e.Vector3(0,.065,-3.15)),10,3.1,{background:"#edf1ed",color:t.value==="STOP"?"#a64445":"#345a4a",size:45});n.add(B);let V=c(S?"DESLIZABLE \xB7 MANTENIDO":"PALANCA \xB7 FIN DE CARRERA",m.clone().add(new e.Vector3(0,.065,7.2)),10,2.8,{background:"#edf1ed",color:"#587363",size:37});n.add(V)}return Ud(L,!1),{id:t.partId,model:g.model,center:g.center,bounds:g.bounds,connections:Y,actuator:L,cables:k,wiringStage:t.wiringStage??t.stage}}function Ud(s,e){let t=s.userData;t.externalControl==="scmm-122"?s.position.x=t.homeX+(e?.72:-.72):t.externalControl==="ss0501a"&&(s.rotation.z=e?.012:.16,t.plunger.position.y=t.plungerY-(e?.19:0)),t.actuated=!!e}function rm(s,e){e=Math.max(0,Math.min(1,e));let t=s.wire.geometry,n=t.parameters.tubularSegments,i=t.parameters.radialSegments,r=t.getAttribute("position"),o=t.getAttribute("normal");if(s.reveal?.ring>=0){let a=s.reveal.ring;for(let l=0;l<=i;l++){let c=(a*(i+1)+l)*3;r.setXYZ(a*(i+1)+l,...s.reveal.position.subarray(c,c+3)),o.setXYZ(a*(i+1)+l,...s.reveal.normal.subarray(c,c+3))}s.reveal.ring=-1,r.needsUpdate=o.needsUpdate=!0}if(e>0&&e<1){s.reveal||={position:new Float32Array(r.array),normal:new Float32Array(o.array),ring:-1};let a=e*n,l=Math.floor(a),c=a-l,h=Math.min(n,l+1);s.curve.getPointAt(e,s.point);for(let d=0;d<=i;d++){let u=(l*(i+1)+d)*3,f=(h*(i+1)+d)*3;s.normal.set(s.reveal.normal[u]+(s.reveal.normal[f]-s.reveal.normal[u])*c,s.reveal.normal[u+1]+(s.reveal.normal[f+1]-s.reveal.normal[u+1])*c,s.reveal.normal[u+2]+(s.reveal.normal[f+2]-s.reveal.normal[u+2])*c).normalize(),r.setXYZ(h*(i+1)+d,s.point.x+t.parameters.radius*s.normal.x,s.point.y+t.parameters.radius*s.normal.y,s.point.z+t.parameters.radius*s.normal.z),o.setXYZ(h*(i+1)+d,s.normal.x,s.normal.y,s.normal.z)}s.reveal.ring=h,r.needsUpdate=o.needsUpdate=!0}t.setDrawRange(0,Math.ceil(e*n)*i*6),s.tip.visible=e>0&&e<1,s.tip.visible&&s.tip.position.copy(s.point),s.plug.visible=e>=1,s.progress=e}var Ia={};M_(Ia,{ACESFilmicToneMapping:()=>ma,AddEquation:()=>or,AddOperation:()=>ep,AdditiveAnimationBlendMode:()=>fd,AdditiveBlending:()=>fa,AgXToneMapping:()=>sd,AlphaFormat:()=>ud,AlwaysCompare:()=>fp,AlwaysDepth:()=>ol,AlwaysStencilFunc:()=>ap,AmbientLight:()=>ql,AnimationAction:()=>ic,AnimationClip:()=>nr,AnimationLoader:()=>fu,AnimationMixer:()=>Tu,AnimationObjectGroup:()=>wu,AnimationUtils:()=>du,ArcCurve:()=>Al,ArrayCamera:()=>Ql,ArrowHelper:()=>Xu,AttachedBindMode:()=>Yh,Audio:()=>tc,AudioAnalyser:()=>Eu,AudioContext:()=>la,AudioListener:()=>Mu,AudioLoader:()=>vu,AxesHelper:()=>Yu,BackSide:()=>Cn,BasicDepthPacking:()=>rp,BasicShadowMap:()=>xg,BatchedMesh:()=>vl,BezierInterpolant:()=>Wl,Bone:()=>Go,BooleanKeyframeTrack:()=>ts,Box2:()=>sc,Box3:()=>tn,Box3Helper:()=>Gu,BoxGeometry:()=>In,BoxHelper:()=>ku,BufferAttribute:()=>Xt,BufferGeometry:()=>gt,BufferGeometryLoader:()=>$l,ByteType:()=>ad,Cache:()=>Fi,Camera:()=>Yr,CameraHelper:()=>Hu,CanvasTexture:()=>Ks,CapsuleGeometry:()=>wl,CatmullRomCurve3:()=>Vi,CineonToneMapping:()=>nd,CircleGeometry:()=>Es,ClampToEdgeWrapping:()=>jn,Clock:()=>Iu,Color:()=>Be,ColorKeyframeTrack:()=>ia,ColorManagement:()=>At,Compatibility:()=>o0,CompressedArrayTexture:()=>lu,CompressedCubeTexture:()=>cu,CompressedTexture:()=>Ur,CompressedTextureLoader:()=>pu,ConeGeometry:()=>Yo,ConstantAlphaFactor:()=>$f,ConstantColorFactor:()=>Jf,Controls:()=>ua,CubeCamera:()=>jl,CubeDepthTexture:()=>El,CubeReflectionMapping:()=>Xi,CubeRefractionMapping:()=>Ls,CubeTexture:()=>Js,CubeTextureLoader:()=>mu,CubeUVReflectionMapping:()=>jr,CubicBezierCurve:()=>qo,CubicBezierCurve3:()=>$s,CubicInterpolant:()=>kl,CullFaceBack:()=>Ju,CullFaceFront:()=>Df,CullFaceFrontBack:()=>_g,CullFaceNone:()=>Lf,Curve:()=>ci,CurvePath:()=>Qs,CustomBlending:()=>Uf,CustomToneMapping:()=>id,CylinderGeometry:()=>$t,Cylindrical:()=>Lu,Data3DTexture:()=>Pr,DataArrayTexture:()=>Cr,DataTexture:()=>Qn,DataTextureLoader:()=>gu,DataUtils:()=>$h,DecrementStencilOp:()=>Og,DecrementWrapStencilOp:()=>zg,DefaultLoadingManager:()=>xp,DepthFormat:()=>Oi,DepthStencilFormat:()=>Ds,DepthTexture:()=>bs,DetachedBindMode:()=>tp,DirectionalLight:()=>rr,DirectionalLightHelper:()=>Vu,DiscreteInterpolant:()=>Gl,DodecahedronGeometry:()=>Tl,DoubleSide:()=>gi,DstAlphaFactor:()=>Wf,DstColorFactor:()=>Yf,DynamicCopyUsage:()=>e0,DynamicDrawUsage:()=>Zg,DynamicReadUsage:()=>$g,EdgesGeometry:()=>Fr,EllipseCurve:()=>Or,EqualCompare:()=>hp,EqualDepth:()=>ll,EqualStencilFunc:()=>Gg,EquirectangularReflectionMapping:()=>ga,EquirectangularRefractionMapping:()=>_a,Euler:()=>bi,EventDispatcher:()=>li,ExternalTexture:()=>Xo,ExtrudeGeometry:()=>Ts,FileLoader:()=>Ti,Float16BufferAttribute:()=>iu,Float32BufferAttribute:()=>Ve,FloatType:()=>Hn,Fog:()=>ml,FogExp2:()=>pl,FramebufferTexture:()=>au,FrontSide:()=>Is,Frustum:()=>Qi,FrustumArray:()=>yl,GLBufferAttribute:()=>Pu,GLSL1:()=>n0,GLSL3:()=>pd,GreaterCompare:()=>up,GreaterDepth:()=>hl,GreaterEqualCompare:()=>Wc,GreaterEqualDepth:()=>cl,GreaterEqualStencilFunc:()=>qg,GreaterStencilFunc:()=>Xg,GridHelper:()=>Bu,Group:()=>gn,HTMLTexture:()=>hu,HalfFloatType:()=>Ri,HemisphereLight:()=>Wr,HemisphereLightHelper:()=>Ou,IcosahedronGeometry:()=>Il,ImageBitmapLoader:()=>yu,ImageLoader:()=>ir,ImageUtils:()=>fl,IncrementStencilOp:()=>Fg,IncrementWrapStencilOp:()=>Bg,InstancedBufferAttribute:()=>Ss,InstancedBufferGeometry:()=>Zr,InstancedInterleavedBuffer:()=>Rs,InstancedMesh:()=>Ms,Int16BufferAttribute:()=>tu,Int32BufferAttribute:()=>nu,Int8BufferAttribute:()=>jh,IntType:()=>oc,InterleavedBuffer:()=>Dr,InterleavedBufferAttribute:()=>Gn,Interpolant:()=>As,InterpolateBezier:()=>qh,InterpolateDiscrete:()=>No,InterpolateLinear:()=>dl,InterpolateSmooth:()=>Qa,InterpolationSamplingMode:()=>r0,InterpolationSamplingType:()=>s0,InvertStencilOp:()=>Vg,KeepStencilOp:()=>el,KeyframeTrack:()=>ti,LOD:()=>gl,LatheGeometry:()=>zr,Layers:()=>Ir,LessCompare:()=>cp,LessDepth:()=>al,LessEqualCompare:()=>Gc,LessEqualDepth:()=>Ar,LessEqualStencilFunc:()=>Wg,LessStencilFunc:()=>kg,Light:()=>Gi,LightProbe:()=>Jl,LightShadow:()=>Xr,Line:()=>zi,Line3:()=>ha,LineBasicMaterial:()=>xn,LineCurve:()=>Zo,LineCurve3:()=>es,LineDashedMaterial:()=>Hl,LineLoop:()=>Sl,LineSegments:()=>ei,LinearFilter:()=>Kt,LinearInterpolant:()=>na,LinearMipMapLinearFilter:()=>bg,LinearMipMapNearestFilter:()=>Mg,LinearMipmapLinearFilter:()=>Yi,LinearMipmapNearestFilter:()=>xa,LinearSRGBColorSpace:()=>Fo,LinearToneMapping:()=>ed,LinearTransfer:()=>Oo,Loader:()=>Dn,LoaderUtils:()=>aa,LoadingManager:()=>ra,LoopOnce:()=>np,LoopPingPong:()=>sp,LoopRepeat:()=>ip,MOUSE:()=>Cs,Material:()=>_n,MaterialBlending:()=>yg,MaterialLoader:()=>Kl,MathUtils:()=>Wn,Matrix2:()=>Du,Matrix3:()=>pt,Matrix4:()=>ht,MaxEquation:()=>zf,Mesh:()=>Ot,MeshBasicMaterial:()=>jt,MeshDepthMaterial:()=>ea,MeshDistanceMaterial:()=>ta,MeshLambertMaterial:()=>Hr,MeshMatcapMaterial:()=>Vl,MeshNormalMaterial:()=>zl,MeshPhongMaterial:()=>Ol,MeshPhysicalMaterial:()=>tr,MeshStandardMaterial:()=>vt,MeshToonMaterial:()=>Bl,MinEquation:()=>Bf,MirroredRepeatWrapping:()=>Do,MixOperation:()=>Qf,MultiplyBlending:()=>$u,MultiplyOperation:()=>pa,NearestFilter:()=>hn,NearestMipMapLinearFilter:()=>Sg,NearestMipMapNearestFilter:()=>vg,NearestMipmapLinearFilter:()=>Qr,NearestMipmapNearestFilter:()=>od,NeutralToneMapping:()=>rd,NeverCompare:()=>lp,NeverDepth:()=>rl,NeverStencilFunc:()=>Hg,NoBlending:()=>Wi,NoColorSpace:()=>ss,NoNormalPacking:()=>Ig,NoToneMapping:()=>Ai,NormalAnimationBlendMode:()=>kc,NormalBlending:()=>$r,NormalGAPacking:()=>Dg,NormalRGPacking:()=>Lg,NotEqualCompare:()=>dp,NotEqualDepth:()=>ul,NotEqualStencilFunc:()=>Yg,NumberKeyframeTrack:()=>kr,Object3D:()=>Dt,ObjectLoader:()=>xu,ObjectSpaceNormalMap:()=>op,OctahedronGeometry:()=>jo,OneFactor:()=>Hf,OneMinusConstantAlphaFactor:()=>jf,OneMinusConstantColorFactor:()=>Kf,OneMinusDstAlphaFactor:()=>Xf,OneMinusDstColorFactor:()=>qf,OneMinusSrcAlphaFactor:()=>Qu,OneMinusSrcColorFactor:()=>Gf,OrthographicCamera:()=>sr,PCFShadowMap:()=>da,PCFSoftShadowMap:()=>Nf,PMREMGenerator:()=>so,Path:()=>er,PerspectiveCamera:()=>cn,Plane:()=>oi,PlaneGeometry:()=>wi,PlaneHelper:()=>Wu,PointLight:()=>qr,PointLightHelper:()=>Fu,Points:()=>Ml,PointsMaterial:()=>Wo,PolarGridHelper:()=>zu,PolyhedronGeometry:()=>ws,PositionalAudio:()=>bu,PropertyBinding:()=>Wt,PropertyMixer:()=>nc,QuadraticBezierCurve:()=>Jo,QuadraticBezierCurve3:()=>js,Quaternion:()=>fn,QuaternionKeyframeTrack:()=>Gr,QuaternionLinearInterpolant:()=>Xl,R11_EAC_Format:()=>yc,RED_GREEN_RGTC2_Format:()=>wa,RED_RGTC1_Format:()=>zc,REVISION:()=>If,RG11_EAC_Format:()=>Ea,RGBADepthPacking:()=>Rg,RGBAFormat:()=>kn,RGBAIntegerFormat:()=>uc,RGBA_ASTC_10x10_Format:()=>Dc,RGBA_ASTC_10x5_Format:()=>Pc,RGBA_ASTC_10x6_Format:()=>Ic,RGBA_ASTC_10x8_Format:()=>Lc,RGBA_ASTC_12x10_Format:()=>Nc,RGBA_ASTC_12x12_Format:()=>Uc,RGBA_ASTC_4x4_Format:()=>Mc,RGBA_ASTC_5x4_Format:()=>bc,RGBA_ASTC_5x5_Format:()=>Ec,RGBA_ASTC_6x5_Format:()=>wc,RGBA_ASTC_6x6_Format:()=>Tc,RGBA_ASTC_8x5_Format:()=>Ac,RGBA_ASTC_8x6_Format:()=>Rc,RGBA_ASTC_8x8_Format:()=>Cc,RGBA_BPTC_Format:()=>Fc,RGBA_ETC2_EAC_Format:()=>xc,RGBA_PVRTC_2BPPV1_Format:()=>mc,RGBA_PVRTC_4BPPV1_Format:()=>pc,RGBA_S3TC_DXT1_Format:()=>Sa,RGBA_S3TC_DXT3_Format:()=>Ma,RGBA_S3TC_DXT5_Format:()=>ba,RGBDepthPacking:()=>Cg,RGBFormat:()=>dd,RGBIntegerFormat:()=>Eg,RGB_BPTC_SIGNED_Format:()=>Oc,RGB_BPTC_UNSIGNED_Format:()=>Bc,RGB_ETC1_Format:()=>gc,RGB_ETC2_Format:()=>_c,RGB_PVRTC_2BPPV1_Format:()=>fc,RGB_PVRTC_4BPPV1_Format:()=>dc,RGB_S3TC_DXT1_Format:()=>va,RGDepthPacking:()=>Pg,RGFormat:()=>Ns,RGIntegerFormat:()=>hc,RawShaderMaterial:()=>Qo,Ray:()=>Bi,Raycaster:()=>ca,RectAreaLight:()=>Zl,RedFormat:()=>cc,RedIntegerFormat:()=>ya,ReinhardToneMapping:()=>td,RenderObjectRefreshType:()=>a0,RenderTarget:()=>Vo,RenderTarget3D:()=>Au,RepeatWrapping:()=>Xs,ReplaceStencilOp:()=>Ug,ReverseSubtractEquation:()=>Of,RingGeometry:()=>Ll,SIGNED_R11_EAC_Format:()=>vc,SIGNED_RED_GREEN_RGTC2_Format:()=>Hc,SIGNED_RED_RGTC1_Format:()=>Vc,SIGNED_RG11_EAC_Format:()=>Sc,SRGBColorSpace:()=>Rn,SRGBTransfer:()=>Ht,Scene:()=>vs,ShaderChunk:()=>bt,ShaderLib:()=>Yn,ShaderMaterial:()=>Ln,ShadowMaterial:()=>Fl,Shape:()=>Ei,ShapeGeometry:()=>Dl,ShapePath:()=>qu,ShapeUtils:()=>Mi,ShortType:()=>ld,Skeleton:()=>xl,SkeletonHelper:()=>Uu,SkinnedMesh:()=>_l,Source:()=>Zh,Sphere:()=>nn,SphereGeometry:()=>mi,Spherical:()=>Jr,SphericalHarmonics3:()=>oa,SplineCurve:()=>Ko,SpotLight:()=>Yl,SpotLightHelper:()=>Nu,Sprite:()=>Nr,SpriteMaterial:()=>Zs,SrcAlphaFactor:()=>ju,SrcAlphaSaturateFactor:()=>Zf,SrcColorFactor:()=>kf,StaticCopyUsage:()=>Qg,StaticDrawUsage:()=>Xc,StaticReadUsage:()=>Kg,StereoCamera:()=>Su,StreamCopyUsage:()=>t0,StreamDrawUsage:()=>Jg,StreamReadUsage:()=>jg,StringKeyframeTrack:()=>ns,SubtractEquation:()=>Ff,SubtractiveBlending:()=>Ku,TOUCH:()=>Ps,TangentSpaceNormalMap:()=>is,TetrahedronGeometry:()=>Nl,Texture:()=>un,TextureLoader:()=>_u,TextureSource:()=>Si,TextureUtils:()=>Zu,Timer:()=>ec,TimestampQuery:()=>i0,TorusGeometry:()=>Hi,TorusKnotGeometry:()=>Ul,Triangle:()=>Ui,TriangleFanDrawMode:()=>Ag,TriangleStripDrawMode:()=>Tg,TrianglesDrawMode:()=>wg,TubeGeometry:()=>ki,UVMapping:()=>rc,Uint16BufferAttribute:()=>Ho,Uint32BufferAttribute:()=>ko,Uint8BufferAttribute:()=>Qh,Uint8ClampedBufferAttribute:()=>eu,Uniform:()=>Ru,UniformsGroup:()=>Cu,UniformsLib:()=>Re,UniformsUtils:()=>Ta,UnsignedByteType:()=>ni,UnsignedInt101111Type:()=>hd,UnsignedInt248Type:()=>to,UnsignedInt5999Type:()=>cd,UnsignedIntType:()=>_i,UnsignedShort4444Type:()=>ac,UnsignedShort5551Type:()=>lc,UnsignedShortType:()=>eo,VSMShadowMap:()=>Kr,Vector2:()=>ae,Vector3:()=>E,Vector4:()=>Lt,VectorKeyframeTrack:()=>sa,VideoFrameTexture:()=>ou,VideoTexture:()=>bl,WebGL3DRenderTarget:()=>Kh,WebGLArrayRenderTarget:()=>Jh,WebGLCoordinateSystem:()=>ai,WebGLCubeRenderTarget:()=>Jc,WebGLRenderTarget:()=>Pn,WebGLRenderer:()=>Kc,WebGLUtils:()=>$0,WebGPUCoordinateSystem:()=>Ys,WebXRController:()=>Lr,WireframeGeometry:()=>Vr,WrapAroundEnding:()=>Uo,ZeroCurvatureEnding:()=>Gs,ZeroFactor:()=>Vf,ZeroSlopeEnding:()=>Ws,ZeroStencilOp:()=>Ng,createCanvasElement:()=>pp,error:()=>$e,getConsoleFunction:()=>h0,log:()=>zo,setConsoleFunction:()=>c0,warn:()=>Pe,warnOnce:()=>ji});var If="186",Cs={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ps={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Lf=0,Ju=1,Df=2,_g=3,xg=0,da=1,Nf=2,Kr=3,Is=0,Cn=1,gi=2,Wi=0,$r=1,fa=2,Ku=3,$u=4,Uf=5,yg=6,or=100,Ff=101,Of=102,Bf=103,zf=104,Vf=200,Hf=201,kf=202,Gf=203,ju=204,Qu=205,Wf=206,Xf=207,Yf=208,qf=209,Zf=210,Jf=211,Kf=212,$f=213,jf=214,rl=0,ol=1,al=2,Ar=3,ll=4,cl=5,hl=6,ul=7,pa=0,Qf=1,ep=2,Ai=0,ed=1,td=2,nd=3,ma=4,id=5,sd=6,rd=7,Yh="attached",tp="detached",rc=300,Xi=301,Ls=302,ga=303,_a=304,jr=306,Xs=1e3,jn=1001,Do=1002,hn=1003,od=1004,vg=1004,Qr=1005,Sg=1005,Kt=1006,xa=1007,Mg=1007,Yi=1008,bg=1008,ni=1009,ad=1010,ld=1011,eo=1012,oc=1013,_i=1014,Hn=1015,Ri=1016,ac=1017,lc=1018,to=1020,cd=35902,hd=35899,ud=1021,dd=1022,kn=1023,Oi=1026,Ds=1027,cc=1028,ya=1029,Ns=1030,hc=1031,Eg=1032,uc=1033,va=33776,Sa=33777,Ma=33778,ba=33779,dc=35840,fc=35841,pc=35842,mc=35843,gc=36196,_c=37492,xc=37496,yc=37488,vc=37489,Ea=37490,Sc=37491,Mc=37808,bc=37809,Ec=37810,wc=37811,Tc=37812,Ac=37813,Rc=37814,Cc=37815,Pc=37816,Ic=37817,Lc=37818,Dc=37819,Nc=37820,Uc=37821,Fc=36492,Oc=36494,Bc=36495,zc=36283,Vc=36284,wa=36285,Hc=36286,np=2200,ip=2201,sp=2202,No=2300,dl=2301,Qa=2302,qh=2303,Gs=2400,Ws=2401,Uo=2402,kc=2500,fd=2501,wg=0,Tg=1,Ag=2,rp=3200,Rg=3201,Cg=3202,Pg=3203,is=0,op=1,ss="",Rn="srgb",Fo="srgb-linear",Oo="linear",Ht="srgb",Ig="",Lg="rg",Dg="ga",Ng=0,el=7680,Ug=7681,Fg=7682,Og=7683,Bg=34055,zg=34056,Vg=5386,Hg=512,kg=513,Gg=514,Wg=515,Xg=516,Yg=517,qg=518,ap=519,lp=512,cp=513,hp=514,Gc=515,up=516,dp=517,Wc=518,fp=519,Xc=35044,Zg=35048,Jg=35040,Kg=35045,$g=35049,jg=35041,Qg=35046,e0=35050,t0=35042,n0="100",pd="300 es",ai=2e3,Ys=2001,i0={COMPUTE:"compute",RENDER:"render"},s0={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},r0={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},o0={TEXTURE_COMPARE:"depthTextureCompare"},a0={NONE:0,SHARED:1,FULL:2};function b_(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}var E_={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function Io(s,e){return new E_[s](e)}function l0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Bo(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function pp(){let s=Bo("canvas");return s.style.display="block",s}var om={},qs=null;function c0(s){qs=s}function h0(){return qs}function zo(...s){let e="THREE."+s.shift();qs?qs("log",e,...s):console.log(e,...s)}function u0(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Pe(...s){s=u0(s);let e="THREE."+s.shift();if(qs)qs("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function $e(...s){s=u0(s);let e="THREE."+s.shift();if(qs)qs("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function ji(...s){let e=s.join(" ");e in om||(om[e]=!0,Pe(...s))}function d0(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var f0={[rl]:ol,[al]:hl,[ll]:ul,[Ar]:cl,[ol]:rl,[hl]:al,[ul]:ll,[cl]:Ar},li=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},Bn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],am=1234567,Tr=Math.PI/180,Rr=180/Math.PI;function pi(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Bn[s&255]+Bn[s>>8&255]+Bn[s>>16&255]+Bn[s>>24&255]+"-"+Bn[e&255]+Bn[e>>8&255]+"-"+Bn[e>>16&15|64]+Bn[e>>24&255]+"-"+Bn[t&63|128]+Bn[t>>8&255]+"-"+Bn[t>>16&255]+Bn[t>>24&255]+Bn[n&255]+Bn[n>>8&255]+Bn[n>>16&255]+Bn[n>>24&255]).toLowerCase()}function ut(s,e,t){return Math.max(e,Math.min(t,s))}function mp(s,e){return(s%e+e)%e}function w_(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function T_(s,e,t){return s!==e?(t-s)/(e-s):0}function tl(s,e,t){return(1-t)*s+t*e}function A_(s,e,t,n){return tl(s,e,1-Math.exp(-t*n))}function R_(s,e=1){return e-Math.abs(mp(s,e*2)-e)}function C_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function P_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function I_(s,e){return s+Math.floor(Math.random()*(e-s+1))}function L_(s,e){return s+Math.random()*(e-s)}function D_(s){return s*(.5-Math.random())}function N_(s){s!==void 0&&(am=s);let e=am+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function U_(s){return s*Tr}function F_(s){return s*Rr}function O_(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function B_(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function z_(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function V_(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),d=r((e-n)/2),u=o((e-n)/2),f=r((n-e)/2),p=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*d,l*u,a*c);break;case"YZY":s.set(l*u,a*h,l*d,a*c);break;case"ZXZ":s.set(l*d,l*u,a*h,a*c);break;case"XZX":s.set(a*h,l*p,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*p,a*c);break;case"ZYZ":s.set(l*p,l*f,a*h,a*c);break;default:Pe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function $n(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Mt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Wn={DEG2RAD:Tr,RAD2DEG:Rr,generateUUID:pi,clamp:ut,euclideanModulo:mp,mapLinear:w_,inverseLerp:T_,lerp:tl,damp:A_,pingpong:R_,smoothstep:C_,smootherstep:P_,randInt:I_,randFloat:L_,randFloatSpread:D_,seededRandom:N_,degToRad:U_,radToDeg:F_,isPowerOfTwo:O_,ceilPowerOfTwo:B_,floorPowerOfTwo:z_,setQuaternionFromProperEuler:V_,normalize:Mt,denormalize:$n},ae=class s{static{s.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},fn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],u=r[o+0],f=r[o+1],p=r[o+2],_=r[o+3];if(d!==_||l!==u||c!==f||h!==p){let g=l*u+c*f+h*p+d*_;g<0&&(u=-u,f=-f,p=-p,_=-_,g=-g);let m=1-a;if(g<.9995){let S=Math.acos(g),b=Math.sin(S);m=Math.sin(m*S)/b,a=Math.sin(a*S)/b,l=l*m+u*a,c=c*m+f*a,h=h*m+p*a,d=d*m+_*a}else{l=l*m+u*a,c=c*m+f*a,h=h*m+p*a,d=d*m+_*a;let S=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=S,c*=S,h*=S,d*=S}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[o],u=r[o+1],f=r[o+2],p=r[o+3];return e[t]=a*p+h*d+l*f-c*u,e[t+1]=l*p+h*u+c*d-a*f,e[t+2]=c*p+h*f+a*u-l*d,e[t+3]=h*p-a*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(r/2),u=l(n/2),f=l(i/2),p=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ut(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,i=-i,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},E=class s{static{s.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(lm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(lm.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),d=2*(r*n-o*t);return this.x=t+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=i+l*d+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Fd.copy(this).projectOnVector(e),this.sub(Fd)}reflect(e){return this.sub(Fd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Fd=new E,lm=new fn,pt=class s{static{s.prototype.isMatrix3=!0}constructor(e,t,n,i,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],_=i[0],g=i[3],m=i[6],S=i[1],b=i[4],x=i[7],A=i[2],T=i[5],D=i[8];return r[0]=o*_+a*S+l*A,r[3]=o*g+a*b+l*T,r[6]=o*m+a*x+l*D,r[1]=c*_+h*S+d*A,r[4]=c*g+h*b+d*T,r[7]=c*m+h*x+d*D,r[2]=u*_+f*S+p*A,r[5]=u*g+f*b+p*T,r[8]=u*m+f*x+p*D,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,p=t*d+n*u+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return e[0]=d*_,e[1]=(i*c-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=u*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return ji("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Od.makeScale(e,t)),this}rotate(e){return ji("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Od.makeRotation(-e)),this}translate(e,t){return ji("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Od.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Od=new pt,cm=new pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hm=new pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function H_(){let s={enabled:!0,workingColorSpace:Fo,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Ht&&(i.r=ys(i.r),i.g=ys(i.g),i.b=ys(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Ht&&(i.r=Lo(i.r),i.g=Lo(i.g),i.b=Lo(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ss?Oo:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return ji("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return ji("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Fo]:{primaries:e,whitePoint:n,transfer:Oo,toXYZ:cm,fromXYZ:hm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Rn},outputColorSpaceConfig:{drawingBufferColorSpace:Rn}},[Rn]:{primaries:e,whitePoint:n,transfer:Ht,toXYZ:cm,fromXYZ:hm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Rn}}}),s}var At=H_();function ys(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Lo(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var ho,fl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ho===void 0&&(ho=Bo("canvas")),ho.width=e.width,ho.height=e.height;let i=ho.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=ho}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Bo("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=ys(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ys(t[n]/255)*255):t[n]=ys(t[n]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},k_=0,Si=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:k_++}),this.uuid=pi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Bd(i[o].image)):r.push(Bd(i[o]))}else r=Bd(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Bd(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?fl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}var Zh=class extends Si{constructor(e=null){ji('Source: "Source" has been renamed to "TextureSource". Please update your code to use "THREE.TextureSource" instead.'),super(e),this.isSource=!0}},G_=0,zd=new E,un=class s extends li{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=jn,i=jn,r=Kt,o=Yi,a=kn,l=ni,c=s.DEFAULT_ANISOTROPY,h=ss){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:G_++}),this.uuid=pi(),this.name="",this.source=new Si(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(zd).x}get height(){return this.source.getSize(zd).y}get depth(){return this.source.getSize(zd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==rc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Xs:e.x=e.x-Math.floor(e.x);break;case jn:e.x=e.x<0?0:1;break;case Do:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Xs:e.y=e.y-Math.floor(e.y);break;case jn:e.y=e.y<0?0:1;break;case Do:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};un.DEFAULT_IMAGE=null;un.DEFAULT_MAPPING=rc;un.DEFAULT_ANISOTROPY=1;var Lt=class s{static{s.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(c+1)/2,x=(f+1)/2,A=(m+1)/2,T=(h+u)/4,D=(d+_)/4,v=(p+g)/4;return b>x&&b>A?b<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(b),i=T/n,r=D/n):x>A?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=T/i,r=v/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=D/r,i=v/r),this.set(n,i,r,t),this}let S=Math.sqrt((g-p)*(g-p)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(g-p)/S,this.y=(d-_)/S,this.z=(u-h)/S,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this.w=ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this.w=ut(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Vo=class extends li{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Lt(0,0,e,t),this.scissorTest=!1,this.viewport=new Lt(0,0,e,t),this.textures=[];let i={width:e,height:t,depth:n.depth},r=new un(i),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Si(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Pn=class extends Vo{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Cr=class extends un{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=hn,this.minFilter=hn,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Jh=class extends Pn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Cr(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},Pr=class extends un{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=hn,this.minFilter=hn,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Kh=class extends Pn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Pr(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},ht=class s{static{s.prototype.isMatrix4=!0}constructor(e,t,n,i,r,o,a,l,c,h,d,u,f,p,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,d,u,f,p,_,g)}set(e,t,n,i,r,o,a,l,c,h,d,u,f,p,_,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/uo.setFromMatrixColumn(e,0).length(),r=1/uo.setFromMatrixColumn(e,1).length(),o=1/uo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=o*h,f=o*d,p=a*h,_=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+p*c,t[5]=u-_*c,t[9]=-a*l,t[2]=_-u*c,t[6]=p+f*c,t[10]=o*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,p=c*h,_=c*d;t[0]=u+_*a,t[4]=p*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=f*a-p,t[6]=_+u*a,t[10]=o*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,p=c*h,_=c*d;t[0]=u-_*a,t[4]=-o*d,t[8]=p+f*a,t[1]=f+p*a,t[5]=o*h,t[9]=_-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let u=o*h,f=o*d,p=a*h,_=a*d;t[0]=l*h,t[4]=p*c-f,t[8]=u*c+_,t[1]=l*d,t[5]=_*c+u,t[9]=f*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let u=o*l,f=o*c,p=a*l,_=a*c;t[0]=l*h,t[4]=_-u*d,t[8]=p*d+f,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*d+p,t[10]=u-_*d}else if(e.order==="XZY"){let u=o*l,f=o*c,p=a*l,_=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+_,t[5]=o*h,t[9]=f*d-p,t[2]=p*d-f,t[6]=a*h,t[10]=_*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(W_,e,X_)}lookAt(e,t,n){let i=this.elements;return di.subVectors(e,t),di.lengthSq()===0&&(di.z=1),di.normalize(),Os.crossVectors(n,di),Os.lengthSq()===0&&(Math.abs(n.z)===1?di.x+=1e-4:di.z+=1e-4,di.normalize(),Os.crossVectors(n,di)),Os.normalize(),ih.crossVectors(di,Os),i[0]=Os.x,i[4]=ih.x,i[8]=di.x,i[1]=Os.y,i[5]=ih.y,i[9]=di.y,i[2]=Os.z,i[6]=ih.z,i[10]=di.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],S=n[3],b=n[7],x=n[11],A=n[15],T=i[0],D=i[4],v=i[8],R=i[12],L=i[1],O=i[5],k=i[9],Y=i[13],N=i[2],B=i[6],V=i[10],X=i[14],Q=i[3],q=i[7],K=i[11],re=i[15];return r[0]=o*T+a*L+l*N+c*Q,r[4]=o*D+a*O+l*B+c*q,r[8]=o*v+a*k+l*V+c*K,r[12]=o*R+a*Y+l*X+c*re,r[1]=h*T+d*L+u*N+f*Q,r[5]=h*D+d*O+u*B+f*q,r[9]=h*v+d*k+u*V+f*K,r[13]=h*R+d*Y+u*X+f*re,r[2]=p*T+_*L+g*N+m*Q,r[6]=p*D+_*O+g*B+m*q,r[10]=p*v+_*k+g*V+m*K,r[14]=p*R+_*Y+g*X+m*re,r[3]=S*T+b*L+x*N+A*Q,r[7]=S*D+b*O+x*B+A*q,r[11]=S*v+b*k+x*V+A*K,r[15]=S*R+b*Y+x*X+A*re,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15],S=l*f-c*u,b=a*f-c*d,x=a*u-l*d,A=o*f-c*h,T=o*u-l*h,D=o*d-a*h;return t*(_*S-g*b+m*x)-n*(p*S-g*A+m*T)+i*(p*b-_*A+m*D)-r*(p*x-_*T+g*D)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],h=e[10];return t*(o*h-a*c)-n*(r*h-a*l)+i*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],S=t*a-n*o,b=t*l-i*o,x=t*c-r*o,A=n*l-i*a,T=n*c-r*a,D=i*c-r*l,v=h*_-d*p,R=h*g-u*p,L=h*m-f*p,O=d*g-u*_,k=d*m-f*_,Y=u*m-f*g,N=S*Y-b*k+x*O+A*L-T*R+D*v;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/N;return e[0]=(a*Y-l*k+c*O)*B,e[1]=(i*k-n*Y-r*O)*B,e[2]=(_*D-g*T+m*A)*B,e[3]=(u*T-d*D-f*A)*B,e[4]=(l*L-o*Y-c*R)*B,e[5]=(t*Y-i*L+r*R)*B,e[6]=(g*x-p*D-m*b)*B,e[7]=(h*D-u*x+f*b)*B,e[8]=(o*k-a*L+c*v)*B,e[9]=(n*L-t*k-r*v)*B,e[10]=(p*T-_*x+m*S)*B,e[11]=(d*x-h*T-f*S)*B,e[12]=(a*R-o*O-l*v)*B,e[13]=(t*O-n*R+i*v)*B,e[14]=(_*b-p*A-g*S)*B,e[15]=(h*A-d*b+u*S)*B,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,p=r*d,_=o*h,g=o*d,m=a*d,S=l*c,b=l*h,x=l*d,A=n.x,T=n.y,D=n.z;return i[0]=(1-(_+m))*A,i[1]=(f+x)*A,i[2]=(p-b)*A,i[3]=0,i[4]=(f-x)*T,i[5]=(1-(u+m))*T,i[6]=(g+S)*T,i[7]=0,i[8]=(p+b)*D,i[9]=(g-S)*D,i[10]=(1-(u+_))*D,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=uo.set(i[0],i[1],i[2]).length(),a=uo.set(i[4],i[5],i[6]).length(),l=uo.set(i[8],i[9],i[10]).length();r<0&&(o=-o),Ii.copy(this);let c=1/o,h=1/a,d=1/l;return Ii.elements[0]*=c,Ii.elements[1]*=c,Ii.elements[2]*=c,Ii.elements[4]*=h,Ii.elements[5]*=h,Ii.elements[6]*=h,Ii.elements[8]*=d,Ii.elements[9]*=d,Ii.elements[10]*=d,t.setFromRotationMatrix(Ii),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,i,r,o,a=ai,l=!1){let c=this.elements,h=2*r/(t-e),d=2*r/(n-i),u=(t+e)/(t-e),f=(n+i)/(n-i),p,_;if(l)p=r/(o-r),_=o*r/(o-r);else if(a===ai)p=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Ys)p=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=ai,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-i),u=-(t+e)/(t-e),f=-(n+i)/(n-i),p,_;if(l)p=1/(o-r),_=o/(o-r);else if(a===ai)p=-2/(o-r),_=-(o+r)/(o-r);else if(a===Ys)p=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},uo=new E,Ii=new ht,W_=new E(0,0,0),X_=new E(1,1,1),Os=new E,ih=new E,di=new E,um=new ht,dm=new fn,bi=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ut(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return um.makeRotationFromQuaternion(e),this.setFromRotationMatrix(um,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return dm.setFromEuler(this),this.setFromQuaternion(dm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};bi.DEFAULT_ORDER="XYZ";var Ir=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Y_=0,fm=new E,fo=new fn,ds=new ht,sh=new E,za=new E,q_=new E,Z_=new fn,pm=new E(1,0,0),mm=new E(0,1,0),gm=new E(0,0,1),_m={type:"added"},J_={type:"removed"},po={type:"childadded",child:null},Vd={type:"childremoved",child:null},Dt=class s extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Y_++}),this.uuid=pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new E,t=new bi,n=new fn,i=new E(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ht},normalMatrix:{value:new pt}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ir,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fo.setFromAxisAngle(e,t),this.quaternion.multiply(fo),this}rotateOnWorldAxis(e,t){return fo.setFromAxisAngle(e,t),this.quaternion.premultiply(fo),this}rotateX(e){return this.rotateOnAxis(pm,e)}rotateY(e){return this.rotateOnAxis(mm,e)}rotateZ(e){return this.rotateOnAxis(gm,e)}translateOnAxis(e,t){return fm.copy(e).applyQuaternion(this.quaternion),this.position.add(fm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(pm,e)}translateY(e){return this.translateOnAxis(mm,e)}translateZ(e){return this.translateOnAxis(gm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ds.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?sh.copy(e):sh.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),za.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ds.lookAt(za,sh,this.up):ds.lookAt(sh,za,this.up),this.quaternion.setFromRotationMatrix(ds),i&&(ds.extractRotation(i.matrixWorld),fo.setFromRotationMatrix(ds),this.quaternion.premultiply(fo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?($e("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(_m),po.child=e,this.dispatchEvent(po),po.child=null):$e("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(J_),Vd.child=e,this.dispatchEvent(Vd),Vd.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ds.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ds.multiply(e.parent.matrixWorld)),e.applyMatrix4(ds),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(_m),po.child=e,this.dispatchEvent(po),po.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(za,e,q_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(za,Z_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),f=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Dt.DEFAULT_UP=new E(0,1,0);Dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var gn=class extends Dt{constructor(){super(),this.isGroup=!0,this.type="Group"}},K_={type:"move"},Lr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new gn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new gn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new gn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(K_)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new gn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},p0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Bs={h:0,s:0,l:0},rh={h:0,s:0,l:0};function Hd(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Be=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Rn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,At.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=At.workingColorSpace){return this.r=e,this.g=t,this.b=n,At.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=At.workingColorSpace){if(e=mp(e,1),t=ut(t,0,1),n=ut(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Hd(o,r,e+1/3),this.g=Hd(o,r,e),this.b=Hd(o,r,e-1/3)}return At.colorSpaceToWorking(this,i),this}setStyle(e,t=Rn){function n(r){r!==void 0&&parseFloat(r)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Rn){let n=p0[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ys(e.r),this.g=ys(e.g),this.b=ys(e.b),this}copyLinearToSRGB(e){return this.r=Lo(e.r),this.g=Lo(e.g),this.b=Lo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rn){return At.workingToColorSpace(zn.copy(this),e),Math.round(ut(zn.r*255,0,255))*65536+Math.round(ut(zn.g*255,0,255))*256+Math.round(ut(zn.b*255,0,255))}getHexString(e=Rn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=At.workingColorSpace){At.workingToColorSpace(zn.copy(this),t);let n=zn.r,i=zn.g,r=zn.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=At.workingColorSpace){return At.workingToColorSpace(zn.copy(this),t),e.r=zn.r,e.g=zn.g,e.b=zn.b,e}getStyle(e=Rn){At.workingToColorSpace(zn.copy(this),e);let t=zn.r,n=zn.g,i=zn.b;return e!==Rn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Bs),this.setHSL(Bs.h+e,Bs.s+t,Bs.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Bs),e.getHSL(rh);let n=tl(Bs.h,rh.h,t),i=tl(Bs.s,rh.s,t),r=tl(Bs.l,rh.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},zn=new Be;Be.NAMES=p0;var pl=class s{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Be(e),this.density=t}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}},ml=class s{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Be(e),this.near=t,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},vs=class extends Dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bi,this.environmentIntensity=1,this.environmentRotation=new bi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Li=new E,fs=new E,kd=new E,ps=new E,mo=new E,go=new E,xm=new E,Gd=new E,Wd=new E,Xd=new E,Yd=new Lt,qd=new Lt,Zd=new Lt,Ui=class s{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Li.subVectors(e,t),i.cross(Li);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Li.subVectors(i,t),fs.subVectors(n,t),kd.subVectors(e,t);let o=Li.dot(Li),a=Li.dot(fs),l=Li.dot(kd),c=fs.dot(fs),h=fs.dot(kd),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,p=(o*h-a*l)*u;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ps)===null?!1:ps.x>=0&&ps.y>=0&&ps.x+ps.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,ps)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ps.x),l.addScaledVector(o,ps.y),l.addScaledVector(a,ps.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return Yd.setScalar(0),qd.setScalar(0),Zd.setScalar(0),Yd.fromBufferAttribute(e,t),qd.fromBufferAttribute(e,n),Zd.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Yd,r.x),o.addScaledVector(qd,r.y),o.addScaledVector(Zd,r.z),o}static isFrontFacing(e,t,n,i){return Li.subVectors(n,t),fs.subVectors(e,t),Li.cross(fs).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Li.subVectors(this.c,this.b),fs.subVectors(this.a,this.b),Li.cross(fs).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;mo.subVectors(i,n),go.subVectors(r,n),Gd.subVectors(e,n);let l=mo.dot(Gd),c=go.dot(Gd);if(l<=0&&c<=0)return t.copy(n);Wd.subVectors(e,i);let h=mo.dot(Wd),d=go.dot(Wd);if(h>=0&&d<=h)return t.copy(i);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(mo,o);Xd.subVectors(e,r);let f=mo.dot(Xd),p=go.dot(Xd);if(p>=0&&f<=p)return t.copy(r);let _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(go,a);let g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return xm.subVectors(r,i),a=(d-h)/(d-h+(f-p)),t.copy(i).addScaledVector(xm,a);let m=1/(g+_+u);return o=_*m,a=u*m,t.copy(n).addScaledVector(mo,o).addScaledVector(go,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},tn=class{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Di.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Di.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Di.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Di):Di.fromBufferAttribute(r,o),Di.applyMatrix4(e.matrixWorld),this.expandByPoint(Di);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),oh.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),oh.copy(n.boundingBox)),oh.applyMatrix4(e.matrixWorld),this.union(oh)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Di),Di.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Va),ah.subVectors(this.max,Va),_o.subVectors(e.a,Va),xo.subVectors(e.b,Va),yo.subVectors(e.c,Va),zs.subVectors(xo,_o),Vs.subVectors(yo,xo),pr.subVectors(_o,yo);let t=[0,-zs.z,zs.y,0,-Vs.z,Vs.y,0,-pr.z,pr.y,zs.z,0,-zs.x,Vs.z,0,-Vs.x,pr.z,0,-pr.x,-zs.y,zs.x,0,-Vs.y,Vs.x,0,-pr.y,pr.x,0];return!Jd(t,_o,xo,yo,ah)||(t=[1,0,0,0,1,0,0,0,1],!Jd(t,_o,xo,yo,ah))?!1:(lh.crossVectors(zs,Vs),t=[lh.x,lh.y,lh.z],Jd(t,_o,xo,yo,ah))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Di).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Di).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ms[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ms[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ms[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ms[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ms[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ms[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ms[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ms[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ms),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ms=[new E,new E,new E,new E,new E,new E,new E,new E],Di=new E,oh=new tn,_o=new E,xo=new E,yo=new E,zs=new E,Vs=new E,pr=new E,Va=new E,ah=new E,lh=new E,mr=new E;function Jd(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){mr.fromArray(s,r);let a=i.x*Math.abs(mr.x)+i.y*Math.abs(mr.y)+i.z*Math.abs(mr.z),l=e.dot(mr),c=t.dot(mr),h=n.dot(mr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var xs=$_();function $_(){let s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}let r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function ri(s){Math.abs(s)>65504&&Pe("DataUtils.toHalfFloat(): Value out of range."),s=ut(s,-65504,65504),xs.floatView[0]=s;let e=xs.uint32View[0],t=e>>23&511;return xs.baseTable[t]+((e&8388607)>>xs.shiftTable[t])}function $a(s){let e=s>>10;return xs.uint32View[0]=xs.mantissaTable[xs.offsetTable[e]+(s&1023)]+xs.exponentTable[e],xs.floatView[0]}var $h=class{static toHalfFloat(e){return ri(e)}static fromHalfFloat(e){return $a(e)}},mn=new E,ch=new ae,j_=0,Xt=class extends li{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:j_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Xc,this.updateRanges=[],this.gpuType=Hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ch.fromBufferAttribute(this,t),ch.applyMatrix3(e),this.setXY(t,ch.x,ch.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix3(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyMatrix4(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.applyNormalMatrix(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mn.fromBufferAttribute(this,t),mn.transformDirection(e),this.setXYZ(t,mn.x,mn.y,mn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=$n(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=$n(t,this.array)),t}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=$n(t,this.array)),t}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=$n(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=$n(t,this.array)),t}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),i=Mt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),i=Mt(i,this.array),r=Mt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}},jh=class extends Xt{constructor(e,t,n){super(new Int8Array(e),t,n)}},Qh=class extends Xt{constructor(e,t,n){super(new Uint8Array(e),t,n)}},eu=class extends Xt{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}},tu=class extends Xt{constructor(e,t,n){super(new Int16Array(e),t,n)}},Ho=class extends Xt{constructor(e,t,n){super(new Uint16Array(e),t,n)}},nu=class extends Xt{constructor(e,t,n){super(new Int32Array(e),t,n)}},ko=class extends Xt{constructor(e,t,n){super(new Uint32Array(e),t,n)}},iu=class extends Xt{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=$a(this.array[e*this.itemSize]);return this.normalized&&(t=$n(t,this.array)),t}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize]=ri(t),this}getY(e){let t=$a(this.array[e*this.itemSize+1]);return this.normalized&&(t=$n(t,this.array)),t}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+1]=ri(t),this}getZ(e){let t=$a(this.array[e*this.itemSize+2]);return this.normalized&&(t=$n(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+2]=ri(t),this}getW(e){let t=$a(this.array[e*this.itemSize+3]);return this.normalized&&(t=$n(t,this.array)),t}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.array[e*this.itemSize+3]=ri(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.array[e+0]=ri(t),this.array[e+1]=ri(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),i=Mt(i,this.array)),this.array[e+0]=ri(t),this.array[e+1]=ri(n),this.array[e+2]=ri(i),this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),i=Mt(i,this.array),r=Mt(r,this.array)),this.array[e+0]=ri(t),this.array[e+1]=ri(n),this.array[e+2]=ri(i),this.array[e+3]=ri(r),this}},Ve=class extends Xt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Q_=new tn,Ha=new E,Kd=new E,nn=class{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Q_.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ha.subVectors(e,this.center);let t=Ha.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ha,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Kd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ha.copy(e.center).add(Kd)),this.expandByPoint(Ha.copy(e.center).sub(Kd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ex=0,vi=new ht,$d=new Dt,vo=new E,fi=new tn,ka=new tn,An=new E,gt=class s extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ex++}),this.uuid=pi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(b_(e)?ko:Ho)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new pt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return vi.makeRotationFromQuaternion(e),this.applyMatrix4(vi),this}rotateX(e){return vi.makeRotationX(e),this.applyMatrix4(vi),this}rotateY(e){return vi.makeRotationY(e),this.applyMatrix4(vi),this}rotateZ(e){return vi.makeRotationZ(e),this.applyMatrix4(vi),this}translate(e,t,n){return vi.makeTranslation(e,t,n),this.applyMatrix4(vi),this}scale(e,t,n){return vi.makeScale(e,t,n),this.applyMatrix4(vi),this}lookAt(e){return $d.lookAt(e),$d.updateMatrix(),this.applyMatrix4($d.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(vo).negate(),this.translate(vo.x,vo.y,vo.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ve(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];fi.setFromBufferAttribute(r),this.morphTargetsRelative?(An.addVectors(this.boundingBox.min,fi.min),this.boundingBox.expandByPoint(An),An.addVectors(this.boundingBox.max,fi.max),this.boundingBox.expandByPoint(An)):(this.boundingBox.expandByPoint(fi.min),this.boundingBox.expandByPoint(fi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$e('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new nn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(e){let n=this.boundingSphere.center;if(fi.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];ka.setFromBufferAttribute(a),this.morphTargetsRelative?(An.addVectors(fi.min,ka.min),fi.expandByPoint(An),An.addVectors(fi.max,ka.max),fi.expandByPoint(An)):(fi.expandByPoint(ka.min),fi.expandByPoint(ka.max))}fi.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)An.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(An));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)An.fromBufferAttribute(a,c),l&&(vo.fromBufferAttribute(e,c),An.add(vo)),i=Math.max(i,n.distanceToSquared(An))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&$e('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){$e("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Xt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let v=0;v<n.count;v++)a[v]=new E,l[v]=new E;let c=new E,h=new E,d=new E,u=new ae,f=new ae,p=new ae,_=new E,g=new E;function m(v,R,L){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,R),d.fromBufferAttribute(n,L),u.fromBufferAttribute(r,v),f.fromBufferAttribute(r,R),p.fromBufferAttribute(r,L),h.sub(c),d.sub(c),f.sub(u),p.sub(u);let O=1/(f.x*p.y-p.x*f.y);isFinite(O)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(O),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(O),a[v].add(_),a[R].add(_),a[L].add(_),l[v].add(g),l[R].add(g),l[L].add(g))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let v=0,R=S.length;v<R;++v){let L=S[v],O=L.start,k=L.count;for(let Y=O,N=O+k;Y<N;Y+=3)m(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}let b=new E,x=new E,A=new E,T=new E;function D(v){A.fromBufferAttribute(i,v),T.copy(A);let R=a[v];b.copy(R),b.sub(A.multiplyScalar(A.dot(R))).normalize(),x.crossVectors(T,R);let O=x.dot(l[v])<0?-1:1;o.setXYZW(v,b.x,b.y,b.z,O)}for(let v=0,R=S.length;v<R;++v){let L=S[v],O=L.start,k=L.count;for(let Y=O,N=O+k;Y<N;Y+=3)D(e.getX(Y+0)),D(e.getX(Y+1)),D(e.getX(Y+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Xt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new E,r=new E,o=new E,a=new E,l=new E,c=new E,h=new E,d=new E;if(e)for(let u=0,f=e.count;u<f;u+=3){let p=e.getX(u+0),_=e.getX(u+1),g=e.getX(u+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)An.fromBufferAttribute(e,t),An.normalize(),e.setXYZ(t,An.x,An.y,An.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,p=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let m=0;m<h;m++)u[p++]=c[f++]}return new Xt(u,h,d)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Dr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Xc,this.updateRanges=[],this.version=0,this.uuid=pi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=pi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Kn=new E,Gn=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Kn.fromBufferAttribute(this,t),Kn.applyMatrix4(e),this.setXYZ(t,Kn.x,Kn.y,Kn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kn.fromBufferAttribute(this,t),Kn.applyNormalMatrix(e),this.setXYZ(t,Kn.x,Kn.y,Kn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kn.fromBufferAttribute(this,t),Kn.transformDirection(e),this.setXYZ(t,Kn.x,Kn.y,Kn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=$n(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Mt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Mt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=$n(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=$n(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=$n(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=$n(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),i=Mt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Mt(t,this.array),n=Mt(n,this.array),i=Mt(i,this.array),r=Mt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){zo("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Xt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){zo("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},jd=new E,tx=new E,nx=new pt,oi=class{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=jd.subVectors(n,t).cross(tx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(jd),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||nx.getNormalMatrix(e),i=this.coplanarPoint(jd).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},ix=0,_n=class extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ix++}),this.uuid=pi(),this.name="",this.type="Material",this.blending=$r,this.side=Is,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ju,this.blendDst=Qu,this.blendEquation=or,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=Ar,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ap,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=el,this.stencilZFail=el,this.stencilZPass=el,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Be().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new oi().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ae().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ae().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Zs=class extends _n{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},So,Ga=new E,Mo=new E,bo=new E,Eo=new ae,Wa=new ae,m0=new ht,hh=new E,Xa=new E,uh=new E,ym=new ae,Qd=new ae,vm=new ae,Nr=class extends Dt{constructor(e=new Zs){if(super(),this.isSprite=!0,this.type="Sprite",So===void 0){So=new gt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Dr(t,5);So.setIndex([0,1,2,0,2,3]),So.setAttribute("position",new Gn(n,3,0,!1)),So.setAttribute("uv",new Gn(n,2,3,!1))}this.geometry=So,this.material=e,this.center=new ae(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&$e('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Mo.setFromMatrixScale(this.matrixWorld),m0.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),bo.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Mo.multiplyScalar(-bo.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;dh(hh.set(-.5,-.5,0),bo,o,Mo,i,r),dh(Xa.set(.5,-.5,0),bo,o,Mo,i,r),dh(uh.set(.5,.5,0),bo,o,Mo,i,r),ym.set(0,0),Qd.set(1,0),vm.set(1,1);let a=e.ray.intersectTriangle(hh,Xa,uh,!1,Ga);if(a===null&&(dh(Xa.set(-.5,.5,0),bo,o,Mo,i,r),Qd.set(0,1),a=e.ray.intersectTriangle(hh,uh,Xa,!1,Ga),a===null))return;let l=e.ray.origin.distanceTo(Ga);l<e.near||l>e.far||t.push({distance:l,point:Ga.clone(),uv:Ui.getInterpolation(Ga,hh,Xa,uh,ym,Qd,vm,new ae),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function dh(s,e,t,n,i,r){Eo.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Wa.x=r*Eo.x-i*Eo.y,Wa.y=i*Eo.x+r*Eo.y):Wa.copy(Eo),s.copy(e),s.x+=Wa.x,s.y+=Wa.y,s.applyMatrix4(m0)}var fh=new E,Sm=new E,gl=class extends Dt{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);let t=e.levels;for(let n=0,i=t.length;n<i;n++){let r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);let i=this.levels,r;for(r=0;r<i.length&&!(t<i[r].distance);r++);return i.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){let t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){let i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){let t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){fh.setFromMatrixPosition(this.matrixWorld);let i=e.ray.origin.distanceTo(fh);this.getObjectForDistance(i).raycast(e,t)}}update(e){let t=this.levels;if(t.length>1){fh.setFromMatrixPosition(e.matrixWorld),Sm.setFromMatrixPosition(this.matrixWorld);let n=fh.distanceTo(Sm)/e.zoom;t[0].object.visible=!0;let i,r;for(i=1,r=t.length;i<r;i++){let o=t[i].distance;if(t[i].object.visible&&(o-=o*t[i].hysteresis),n>=o)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)t[i].object.visible=!1}}toJSON(e){let t=super.toJSON(e);t.object.autoUpdate=this.autoUpdate,t.object.levels=[];let n=this.levels;for(let i=0,r=n.length;i<r;i++){let o=n[i];t.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return t}},gs=new E,ef=new E,ph=new E,mh=new E,Bi=class{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,gs)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=gs.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(gs.copy(this.origin).addScaledVector(this.direction,t),gs.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ef.copy(e).add(t).multiplyScalar(.5),ph.copy(t).sub(e).normalize(),mh.copy(this.origin).sub(ef);let r=e.distanceTo(t)*.5,o=-this.direction.dot(ph),a=mh.dot(this.direction),l=-mh.dot(ph),c=mh.lengthSq(),h=Math.abs(1-o*o),d,u,f,p;if(h>0)if(d=o*l-a,u=o*a-l,p=r*h,d>=0)if(u>=-p)if(u<=p){let _=1/h;d*=_,u*=_,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(ef).addScaledVector(ph,u),f}intersectSphere(e,t){if(e.radius<0)return null;gs.subVectors(e.center,this.origin);let n=gs.dot(this.direction),i=gs.dot(gs)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,gs)!==null}intersectTriangle(e,t,n,i,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,d=e.x-o.x,u=e.y-o.y,f=e.z-o.z,p=t.x-o.x,_=t.y-o.y,g=t.z-o.z,m=n.x-o.x,S=n.y-o.y,b=n.z-o.z,x=Math.abs(l),A=Math.abs(c),T=Math.abs(h),D,v,R,L,O,k,Y,N,B,V,X,Q;if(x>=A&&x>=T?(R=l,k=d,B=p,Q=m,l>=0?(D=c,v=h,L=u,O=f,Y=_,N=g,V=S,X=b):(D=h,v=c,L=f,O=u,Y=g,N=_,V=b,X=S)):A>=T?(R=c,k=u,B=_,Q=S,c>=0?(D=h,v=l,L=f,O=d,Y=g,N=p,V=b,X=m):(D=l,v=h,L=d,O=f,Y=p,N=g,V=m,X=b)):(R=h,k=f,B=g,Q=b,h>=0?(D=l,v=c,L=d,O=u,Y=p,N=_,V=m,X=S):(D=c,v=l,L=u,O=d,Y=_,N=p,V=S,X=m)),R===0)return null;let q=D/R,K=v/R,re=1/R,ke=L-q*k,He=O-K*k,wt=Y-q*B,St=N-K*B,et=V-q*Q,ee=X-K*Q,se=et*St-ee*wt,me=ke*ee-He*et,nt=wt*He-St*ke;if(i){if(se<0||me<0||nt<0)return null}else if((se<0||me<0||nt<0)&&(se>0||me>0||nt>0))return null;let Ae=se+me+nt;if(Ae===0)return null;let at=re*(se*k+me*B+nt*Q);return(Ae>0?at<0:at>0)?null:this.at(at/Ae,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},jt=class extends _n{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.combine=pa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Mm=new ht,gr=new Bi,gh=new nn,bm=new E,_h=new E,xh=new E,yh=new E,tf=new E,vh=new E,Em=new E,Sh=new E,Ot=class extends Dt{constructor(e=new gt,t=new jt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){vh.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(tf.fromBufferAttribute(d,e),o?vh.addScaledVector(tf,h):vh.addScaledVector(tf.sub(t),h))}t.add(vh)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),gh.copy(n.boundingSphere),gh.applyMatrix4(r),gr.copy(e.ray).recast(e.near),!(gh.containsPoint(gr.origin)===!1&&(gr.intersectSphere(gh,bm)===null||gr.origin.distanceToSquared(bm)>(e.far-e.near)**2))&&(Mm.copy(r).invert(),gr.copy(e.ray).applyMatrix4(Mm),!(n.boundingBox!==null&&gr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,gr)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){let g=u[p],m=o[g.materialIndex],S=Math.max(g.start,f.start),b=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let x=S,A=b;x<A;x+=3){let T=a.getX(x),D=a.getX(x+1),v=a.getX(x+2);i=Mh(this,m,e,n,c,h,d,T,D,v),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){let S=a.getX(g),b=a.getX(g+1),x=a.getX(g+2);i=Mh(this,o,e,n,c,h,d,S,b,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){let g=u[p],m=o[g.materialIndex],S=Math.max(g.start,f.start),b=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=S,A=b;x<A;x+=3){let T=x,D=x+1,v=x+2;i=Mh(this,m,e,n,c,h,d,T,D,v),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){let S=g,b=g+1,x=g+2;i=Mh(this,o,e,n,c,h,d,S,b,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function sx(s,e,t,n,i,r,o,a){let l;if(e.side===Cn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Is,a),l===null)return null;Sh.copy(a),Sh.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(Sh);return c<t.near||c>t.far?null:{distance:c,point:Sh.clone(),object:s}}function Mh(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,_h),s.getVertexPosition(l,xh),s.getVertexPosition(c,yh);let h=sx(s,e,t,n,_h,xh,yh,Em);if(h){let d=new E;Ui.getBarycoord(Em,_h,xh,yh,d),i&&(h.uv=Ui.getInterpolatedAttribute(i,a,l,c,d,new ae)),r&&(h.uv1=Ui.getInterpolatedAttribute(r,a,l,c,d,new ae)),o&&(h.normal=Ui.getInterpolatedAttribute(o,a,l,c,d,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new E,materialIndex:0};Ui.getNormal(_h,xh,yh,u.normal),h.face=u,h.barycoord=d}return h}var Ya=new Lt,wm=new Lt,Tm=new Lt,rx=new Lt,Am=new ht,bh=new E,nf=new nn,Rm=new ht,sf=new Bi,_l=class extends Ot{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Yh,this.bindMatrix=new ht,this.bindMatrixInverse=new ht,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new tn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,bh),this.boundingBox.expandByPoint(bh)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new nn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,bh),this.boundingSphere.expandByPoint(bh)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),nf.copy(this.boundingSphere),nf.applyMatrix4(i),e.ray.intersectsSphere(nf)!==!1&&(Rm.copy(i).invert(),sf.copy(e.ray).applyMatrix4(Rm),!(this.boundingBox!==null&&sf.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,sf)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Lt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Yh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===tp?this.bindMatrixInverse.copy(this.bindMatrix).invert():Pe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;wm.fromBufferAttribute(i.attributes.skinIndex,e),Tm.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Ya.copy(t),t.set(0,0,0,0)):(Ya.set(...t,1),t.set(0,0,0)),Ya.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=Tm.getComponent(r);if(o!==0){let a=wm.getComponent(r);Am.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(rx.copy(Ya).applyMatrix4(Am),o)}}return t.isVector4&&(t.w=Ya.w),t.applyMatrix4(this.bindMatrixInverse)}},Go=class extends Dt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Qn=class extends un{constructor(e=null,t=1,n=1,i,r,o,a,l,c=hn,h=hn,d,u){super(null,o,a,l,c,h,i,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Cm=new ht,ox=new ht,xl=class s{constructor(e=[],t=[]){this.uuid=pi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Pe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ht)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ht;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:ox;Cm.multiplyMatrices(a,t[r]),Cm.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Qn(t,e,e,kn,Hn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(Pe("Skeleton: No bone found with UUID:",r),o=new Go),this.bones.push(o),this.boneInverses.push(new ht().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},Ss=class extends Xt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},wo=new ht,Pm=new ht,Eh=[],Im=new tn,ax=new ht,qa=new Ot,Za=new nn,Ms=class extends Ot{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ss(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,ax)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new tn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,wo),Im.copy(e.boundingBox).applyMatrix4(wo),this.boundingBox.union(Im)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new nn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,wo),Za.copy(e.boundingSphere).applyMatrix4(wo),this.boundingSphere.union(Za)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(qa.geometry=this.geometry,qa.material=this.material,qa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Za.copy(this.boundingSphere),Za.applyMatrix4(n),e.ray.intersectsSphere(Za)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,wo),Pm.multiplyMatrices(n,wo),qa.matrixWorld=Pm,qa.raycast(e,Eh);for(let o=0,a=Eh.length;o<a;o++){let l=Eh[o];l.instanceId=r,l.object=this,t.push(l)}Eh.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ss(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Qn(new Float32Array(i*this.count),i,this.count,cc,Hn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},_r=new nn,lx=new ae(.5,.5),wh=new E,Qi=class{constructor(e=new oi,t=new oi,n=new oi,i=new oi,r=new oi,o=new oi){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ai,n=!1){let i=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],p=r[8],_=r[9],g=r[10],m=r[11],S=r[12],b=r[13],x=r[14],A=r[15];if(i[0].setComponents(c-o,f-h,m-p,A-S).normalize(),i[1].setComponents(c+o,f+h,m+p,A+S).normalize(),i[2].setComponents(c+a,f+d,m+_,A+b).normalize(),i[3].setComponents(c-a,f-d,m-_,A-b).normalize(),n)i[4].setComponents(l,u,g,x).normalize(),i[5].setComponents(c-l,f-u,m-g,A-x).normalize();else if(i[4].setComponents(c-l,f-u,m-g,A-x).normalize(),t===ai)i[5].setComponents(c+l,f+u,m+g,A+x).normalize();else if(t===Ys)i[5].setComponents(l,u,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_r.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_r.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_r)}intersectsSprite(e){_r.center.set(0,0,0);let t=lx.distanceTo(e.center);return _r.radius=.7071067811865476+t,_r.applyMatrix4(e.matrixWorld),this.intersectsSphere(_r)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(wh.x=i.normal.x>0?e.max.x:e.min.x,wh.y=i.normal.y>0?e.max.y:e.min.y,wh.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(wh)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Lm=new ht,yl=class s{constructor(){this.coordinateSystem=ai,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let i=0;i<t.length;i++){let r=t[i];Lm.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new Qi),n[i].setFromProjectionMatrix(Lm,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let i=0;i<e._count;i++)t[i]===void 0&&(t[i]=new Qi),t[i].copy(n[i]);return this._count=e._count,this}clone(){return new s().copy(this)}};function rf(s,e){return s-e}function cx(s,e){return s.z-e.z}function hx(s,e){return e.z-s.z}var yf=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let r=this.pool,o=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});let a=r[this.index];o.push(a),this.index++,a.start=e,a.count=t,a.z=n,a.index=i}reset(){this.list.length=0,this.index=0}},si=new ht,ux=new Be(1,1,1),dx=new Qi,fx=new yl,Th=new tn,xr=new nn,Ja=new E,Dm=new E,px=new E,of=new yf,Vn=new Ot,Ah=[];function mx(s,e,t=0){let n=e.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==e.array.constructor){let i=s.count;for(let r=0;r<i;r++)for(let o=0;o<n;o++)e.setComponent(r+t,o,s.getComponent(r,o))}else e.array.set(s.array,t*n);e.needsUpdate=!0}function yr(s,e){if(s.constructor!==e.constructor){let t=Math.min(s.length,e.length);for(let n=0;n<t;n++)e[n]=s[n]}else{let t=Math.min(s.length,e.length);e.set(new s.constructor(s.buffer,0,t))}}var vl=class extends Ot{constructor(e,t,n=t*2,i){super(new gt,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawBytesPerElement=1,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4),n=new Qn(t,e,e,kn,Hn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Uint32Array(e*e),n=new Qn(t,e,e,ya,_i);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Float32Array(e*e*4).fill(1),n=new Qn(t,e,e,kn,Hn);n.colorSpace=At.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){let t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(let r in e.attributes){let o=e.getAttribute(r),{array:a,itemSize:l,normalized:c}=o,h=new a.constructor(n*l),d=new Xt(h,l,c);t.setAttribute(r,d)}if(e.getIndex()!==null){let r=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Xt(r,1))}this._geometryInitialized=!0}}_validateGeometry(e){let t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(let n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let i=e.getAttribute(n),r=t.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){let t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){let t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tn);let e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let r=t[n].geometryIndex;this.getMatrixAt(n,si),this.getBoundingBoxAt(r,Th).applyMatrix4(si),e.union(Th)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new nn);let e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let r=t[n].geometryIndex;this.getMatrixAt(n,si),this.getBoundingSphereAt(r,xr).applyMatrix4(si),e.union(xr)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");let n={visible:!0,active:!0,geometryIndex:e},i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(rf),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));let r=this._matricesTexture;si.identity().toArray(r.image.data,i*16),r.needsUpdate=!0;let o=this._colorsTexture;return o&&(ux.toArray(o.image.data,i*4),o.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);let i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;let o=e.getIndex();if(o!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?o.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(rf),l=this._availableGeometryIds.shift(),r[l]=i):(l=this._geometryCount,this._geometryCount++,r.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);let n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),o=t.getIndex(),a=this._geometryInfo[e];if(i&&o.count>a.reservedIndexCount||t.attributes.position.count>a.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");let l=a.vertexStart,c=a.reservedVertexCount;a.vertexCount=t.getAttribute("position").count;for(let h in n.attributes){let d=t.getAttribute(h),u=n.getAttribute(h);mx(d,u,l);let f=d.itemSize;for(let p=d.count,_=c;p<_;p++){let g=l+p;for(let m=0;m<f;m++)u.setComponent(g,m,0)}u.needsUpdate=!0,u.addUpdateRange(l*f,c*f)}if(i){let h=a.indexStart,d=a.reservedIndexCount;a.indexCount=t.getIndex().count;for(let u=0;u<o.count;u++)r.setX(h+u,l+o.getX(u));for(let u=o.count,f=d;u<f;u++)r.setX(h+u,l);r.needsUpdate=!0,r.addUpdateRange(h,a.reservedIndexCount)}return a.start=i?a.indexStart:a.vertexStart,a.count=i?a.indexCount:a.vertexCount,a.boundingBox=null,t.boundingBox!==null&&(a.boundingBox=t.boundingBox.clone()),a.boundingSphere=null,t.boundingSphere!==null&&(a.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){let t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;let n=this._instanceInfo;for(let i=0,r=n.length;i<r;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0,n=this._geometryInfo,i=n.map((o,a)=>a).sort((o,a)=>n[o].vertexStart-n[a].vertexStart),r=this.geometry;for(let o=0,a=n.length;o<a;o++){let l=i[o],c=n[l];if(c.active!==!1){if(r.index!==null){if(c.indexStart!==t){let{indexStart:h,vertexStart:d,reservedIndexCount:u}=c,f=r.index,p=f.array,_=e-d;for(let g=h;g<h+u;g++)p[g]=p[g]+_;f.array.copyWithin(t,h,h+u),f.addUpdateRange(t,u),f.needsUpdate=!0,c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){let{vertexStart:h,reservedVertexCount:d}=c,u=r.attributes;for(let f in u){let p=u[f],{array:_,itemSize:g}=p;_.copyWithin(e*g,h*g,(h+d)*g),p.addUpdateRange(e*g,d*g),p.needsUpdate=!0}c.vertexStart=e}e+=c.reservedVertexCount,c.start=r.index?c.indexStart:c.vertexStart}}return this._nextIndexStart=t,this._nextVertexStart=e,this._visibilityChanged=!0,this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){let r=new tn,o=n.index,a=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let h=l;o&&(h=o.getX(h)),r.expandByPoint(Ja.fromBufferAttribute(a,h))}i.boundingBox=r}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){let r=new nn;this.getBoundingBoxAt(e,Th),Th.getCenter(r.center);let o=n.index,a=n.attributes.position,l=0;for(let c=i.start,h=i.start+i.count;c<h;c++){let d=c;o&&(d=o.getX(d)),Ja.fromBufferAttribute(a,d),l=Math.max(l,r.center.distanceToSquared(Ja))}r.radius=Math.sqrt(l),i.boundingSphere=r}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);let n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null?t.isVector4?t.set(1,1,1,1):t.setRGB(1,1,1):t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this._visibilityChanged=!0,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);let n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){let t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(rf);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`THREE.BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);let i=new Int32Array(e),r=new Int32Array(e);yr(this._multiDrawCounts,i),yr(this._multiDrawStarts,r),this._multiDrawCounts=i,this._multiDrawStarts=r,this._maxInstanceCount=e;let o=this._indirectTexture,a=this._matricesTexture,l=this._colorsTexture;o.dispose(),this._initIndirectTexture(),yr(o.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),yr(a.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),yr(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){let n=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...n.map(a=>a.vertexStart+a.reservedVertexCount))>e)throw new Error(`THREE.BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`THREE.BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);let r=this.geometry;r.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new gt,this._initializeGeometry(r));let o=this.geometry;r.index&&yr(r.index.array,o.index.array);for(let a in r.attributes)yr(r.attributes[a].array,o.attributes[a].array)}raycast(e,t){let n=this._instanceInfo,i=this._geometryInfo,r=this.matrixWorld,o=this.geometry;Vn.material=this.material,Vn.geometry.index=o.index,Vn.geometry.attributes=o.attributes,Vn.geometry.boundingBox===null&&(Vn.geometry.boundingBox=new tn),Vn.geometry.boundingSphere===null&&(Vn.geometry.boundingSphere=new nn);for(let a=0,l=n.length;a<l;a++){if(!n[a].visible||!n[a].active)continue;let c=n[a].geometryIndex,h=i[c];Vn.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(a,Vn.matrixWorld).premultiply(r),this.getBoundingBoxAt(c,Vn.geometry.boundingBox),this.getBoundingSphereAt(c,Vn.geometry.boundingSphere),Vn.raycast(e,Ah);for(let d=0,u=Ah.length;d<u;d++){let f=Ah[d];f.object=this,f.batchId=a,t.push(f)}Ah.length=0}Vn.material=null,Vn.geometry.index=null,Vn.geometry.attributes={},Vn.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._multiDrawBytesPerElement=e._multiDrawBytesPerElement,this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){super.dispose(),this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,l=1;r.wireframe&&(l=2,a=i.attributes.position.count>65535?4:2);let c=this._instanceInfo,h=this._multiDrawStarts,d=this._multiDrawCounts,u=this._geometryInfo,f=this.perObjectFrustumCulled,p=this._indirectTexture,_=p.image.data,g=n.isArrayCamera?fx:dx;f&&(n.isArrayCamera?g.setFromArrayCamera(n):(si.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),g.setFromProjectionMatrix(si,n.coordinateSystem,n.reversedDepth)));let m=0;if(this.sortObjects){si.copy(this.matrixWorld).invert(),Ja.setFromMatrixPosition(n.matrixWorld).applyMatrix4(si),Dm.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(si);for(let x=0,A=c.length;x<A;x++)if(c[x].visible&&c[x].active){let T=c[x].geometryIndex;this.getMatrixAt(x,si),this.getBoundingSphereAt(T,xr).applyMatrix4(si);let D=!1;if(f&&(D=!g.intersectsSphere(xr)),!D){let v=u[T],R=px.subVectors(xr.center,Ja).dot(Dm);of.push(v.start,v.count,R,x)}}let S=of.list,b=this.customSort;b===null?S.sort(r.transparent?hx:cx):b.call(this,S,n);for(let x=0,A=S.length;x<A;x++){let T=S[x];h[m]=T.start*a*l,d[m]=T.count*l,_[m]=T.index,m++}of.reset()}else for(let S=0,b=c.length;S<b;S++)if(c[S].visible&&c[S].active){let x=c[S].geometryIndex,A=!1;if(f&&(this.getMatrixAt(S,si),this.getBoundingSphereAt(x,xr).applyMatrix4(si),A=!g.intersectsSphere(xr)),!A){let T=u[x];h[m]=T.start*a*l,d[m]=T.count*l,_[m]=S,m++}}p.needsUpdate=!0,this._multiDrawCount=m,this._multiDrawBytesPerElement=a,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,r,o){this.onBeforeRender(e,null,i,r,o)}},xn=class extends _n{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},su=new E,ru=new E,Nm=new ht,Ka=new Bi,Rh=new nn,af=new E,Um=new E,zi=class extends Dt{constructor(e=new gt,t=new xn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)su.fromBufferAttribute(t,i-1),ru.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=su.distanceTo(ru);e.setAttribute("lineDistance",new Ve(n,1))}else Pe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rh.copy(n.boundingSphere),Rh.applyMatrix4(i),Rh.radius+=r,e.ray.intersectsSphere(Rh)===!1)return;Nm.copy(i).invert(),Ka.copy(e.ray).applyMatrix4(Nm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){let m=h.getX(_),S=h.getX(_+1),b=Ch(this,e,Ka,l,m,S,_);b&&t.push(b)}if(this.isLineLoop){let _=h.getX(p-1),g=h.getX(f),m=Ch(this,e,Ka,l,_,g,p-1);m&&t.push(m)}}else{let f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){let m=Ch(this,e,Ka,l,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){let _=Ch(this,e,Ka,l,p-1,f,p-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Ch(s,e,t,n,i,r,o){let a=s.geometry.attributes.position;if(su.fromBufferAttribute(a,i),ru.fromBufferAttribute(a,r),t.distanceSqToSegment(su,ru,af,Um)>n)return;af.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(af);if(!(c<e.near||c>e.far))return{distance:c,point:Um.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}var Fm=new E,Om=new E,ei=class extends zi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Fm.fromBufferAttribute(t,i),Om.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Fm.distanceTo(Om);e.setAttribute("lineDistance",new Ve(n,1))}else Pe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Sl=class extends zi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Wo=class extends _n{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Bm=new ht,vf=new Bi,Ph=new nn,Ih=new E,Ml=class extends Dt{constructor(e=new gt,t=new Wo){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ph.copy(n.boundingSphere),Ph.applyMatrix4(i),Ph.radius+=r,e.ray.intersectsSphere(Ph)===!1)return;Bm.copy(i).invert(),vf.copy(e.ray).applyMatrix4(Bm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=u,_=f;p<_;p++){let g=c.getX(p);Ih.fromBufferAttribute(d,g),zm(Ih,g,l,i,e,t,this)}}else{let u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let p=u,_=f;p<_;p++)Ih.fromBufferAttribute(d,p),zm(Ih,p,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function zm(s,e,t,n,i,r,o){let a=vf.distanceSqToPoint(s);if(a<t){let l=new E;vf.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var bl=class extends un{constructor(e,t,n,i,r=Kt,o=Kt,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;let h=this;function d(){h.needsUpdate=!0,h._requestVideoFrameCallbackId=e.requestVideoFrameCallback(d)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(d))}clone(){return new this.constructor(this.image).copy(this)}update(){let e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}},ou=class extends bl{constructor(e,t,n,i,r,o,a,l){super({},e,t,n,i,r,o,a,l),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(e){this.image=e,this.needsUpdate=!0}},au=class extends un{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=hn,this.minFilter=hn,this.generateMipmaps=!1,this.needsUpdate=!0}},Ur=class extends un{constructor(e,t,n,i,r,o,a,l,c,h,d,u){super(null,o,a,l,c,h,i,r,d,u),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}},lu=class extends Ur{constructor(e,t,n,i,r,o){super(e,t,n,r,o),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=jn,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},cu=class extends Ur{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,Xi),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}},Js=class extends un{constructor(e=[],t=Xi,n,i,r,o,a,l,c,h){super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Ks=class extends un{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},hu=class extends un{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;let h=e?e.parentNode:null;h!==null&&"requestPaint"in h&&(h.onpaint=()=>{this.needsUpdate=!0},h.requestPaint())}dispose(){let e=this.image?this.image.parentNode:null;e!==null&&"onpaint"in e&&(e.onpaint=null),super.dispose()}},bs=class extends un{constructor(e,t,n=_i,i,r,o,a=hn,l=hn,c,h=Oi,d=1){if(h!==Oi&&h!==Ds)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Si(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},El=class extends bs{constructor(e,t=_i,n=Xi,i,r,o=hn,a=hn,l,c=Oi){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,i,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Xo=class extends un{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},In=class s extends gt{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;p("z","y","x",-1,-1,n,t,e,o,r,0),p("z","y","x",1,-1,n,t,-e,o,r,1),p("x","z","y",1,1,e,n,t,i,o,2),p("x","z","y",1,-1,e,n,-t,i,o,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Ve(c,3)),this.setAttribute("normal",new Ve(h,3)),this.setAttribute("uv",new Ve(d,2));function p(_,g,m,S,b,x,A,T,D,v,R){let L=x/D,O=A/v,k=x/2,Y=A/2,N=T/2,B=D+1,V=v+1,X=0,Q=0,q=new E;for(let K=0;K<V;K++){let re=K*O-Y;for(let ke=0;ke<B;ke++){let He=ke*L-k;q[_]=He*S,q[g]=re*b,q[m]=N,c.push(q.x,q.y,q.z),q[_]=0,q[g]=0,q[m]=T>0?1:-1,h.push(q.x,q.y,q.z),d.push(ke/D),d.push(1-K/v),X+=1}}for(let K=0;K<v;K++)for(let re=0;re<D;re++){let ke=u+re+B*K,He=u+re+B*(K+1),wt=u+(re+1)+B*(K+1),St=u+(re+1)+B*K;l.push(ke,He,St),l.push(He,wt,St),Q+=6}a.addGroup(f,Q,R),f+=Q,u+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},wl=class s extends gt{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=t/2,d=Math.PI/2*e,u=t,f=2*d+u,p=n*2+r,_=i+1,g=new E,m=new E;for(let S=0;S<=p;S++){let b=0,x=0,A=0,T=0;if(S<=n){let R=S/n,L=R*Math.PI/2;x=-h-e*Math.cos(L),A=e*Math.sin(L),T=-e*Math.cos(L),b=R*d}else if(S<=n+r){let R=(S-n)/r;x=-h+R*t,A=e,T=0,b=d+R*u}else{let R=(S-n-r)/n,L=R*Math.PI/2;x=h+e*Math.sin(L),A=e*Math.cos(L),T=e*Math.sin(L),b=d+u+R*d}let D=Math.max(0,Math.min(1,b/f)),v=0;S===0?v=.5/i:S===p&&(v=-.5/i);for(let R=0;R<=i;R++){let L=R/i,O=L*Math.PI*2,k=Math.sin(O),Y=Math.cos(O);m.x=-A*Y,m.y=x,m.z=A*k,a.push(m.x,m.y,m.z),g.set(-A*Y,T,A*k),g.normalize(),l.push(g.x,g.y,g.z),c.push(L+v,D)}if(S>0){let R=(S-1)*_;for(let L=0;L<i;L++){let O=R+L,k=R+L+1,Y=S*_+L,N=S*_+L+1;o.push(O,k,Y),o.push(k,N,Y)}}}this.setIndex(o),this.setAttribute("position",new Ve(a,3)),this.setAttribute("normal",new Ve(l,3)),this.setAttribute("uv",new Ve(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Es=class s extends gt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],o=[],a=[],l=[],c=new E,h=new ae;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let f=n+d/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/e+1)/2,h.y=(o[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Ve(o,3)),this.setAttribute("normal",new Ve(a,3)),this.setAttribute("uv",new Ve(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},$t=class s extends gt{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],d=[],u=[],f=[],p=0,_=[],g=n/2,m=0;S(),o===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new Ve(d,3)),this.setAttribute("normal",new Ve(u,3)),this.setAttribute("uv",new Ve(f,2));function S(){let x=new E,A=new E,T=0,D=(t-e)/n;for(let v=0;v<=r;v++){let R=[],L=v/r,O=L*(t-e)+e;for(let k=0;k<=i;k++){let Y=k/i,N=Y*l+a,B=Math.sin(N),V=Math.cos(N);A.x=O*B,A.y=-L*n+g,A.z=O*V,d.push(A.x,A.y,A.z),x.set(B,D,V).normalize(),u.push(x.x,x.y,x.z),f.push(Y,1-L),R.push(p++)}_.push(R)}for(let v=0;v<i;v++)for(let R=0;R<r;R++){let L=_[R][v],O=_[R+1][v],k=_[R+1][v+1],Y=_[R][v+1];(e>0||R!==0)&&(h.push(L,O,Y),T+=3),(t>0||R!==r-1)&&(h.push(O,k,Y),T+=3)}c.addGroup(m,T,0),m+=T}function b(x){let A=p,T=new ae,D=new E,v=0,R=x===!0?e:t,L=x===!0?1:-1;for(let k=1;k<=i;k++)d.push(0,g*L,0),u.push(0,L,0),f.push(.5,.5),p++;let O=p;for(let k=0;k<=i;k++){let N=k/i*l+a,B=Math.cos(N),V=Math.sin(N);D.x=R*V,D.y=g*L,D.z=R*B,d.push(D.x,D.y,D.z),u.push(0,L,0),T.x=B*.5+.5,T.y=V*.5*L+.5,f.push(T.x,T.y),p++}for(let k=0;k<i;k++){let Y=A+k,N=O+k;x===!0?h.push(N,N+1,Y):h.push(N+1,N,Y),v+=3}c.addGroup(m,v,x===!0?1:2),m+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Yo=class s extends $t{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ws=class s extends gt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new Ve(r,3)),this.setAttribute("normal",new Ve(r.slice(),3)),this.setAttribute("uv",new Ve(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(S){let b=new E,x=new E,A=new E;for(let T=0;T<t.length;T+=3)f(t[T+0],b),f(t[T+1],x),f(t[T+2],A),l(b,x,A,S)}function l(S,b,x,A){let T=A+1,D=[];for(let v=0;v<=T;v++){D[v]=[];let R=S.clone().lerp(x,v/T),L=b.clone().lerp(x,v/T),O=T-v;for(let k=0;k<=O;k++)k===0&&v===T?D[v][k]=R:D[v][k]=R.clone().lerp(L,k/O)}for(let v=0;v<T;v++)for(let R=0;R<2*(T-v)-1;R++){let L=Math.floor(R/2);R%2===0?(u(D[v][L+1]),u(D[v+1][L]),u(D[v][L])):(u(D[v][L+1]),u(D[v+1][L+1]),u(D[v+1][L]))}}function c(S){let b=new E;for(let x=0;x<r.length;x+=3)b.x=r[x+0],b.y=r[x+1],b.z=r[x+2],b.normalize().multiplyScalar(S),r[x+0]=b.x,r[x+1]=b.y,r[x+2]=b.z}function h(){let S=new E;for(let b=0;b<r.length;b+=3){S.x=r[b+0],S.y=r[b+1],S.z=r[b+2];let x=g(S)/2/Math.PI+.5,A=m(S)/Math.PI+.5;o.push(x,1-A)}p(),d()}function d(){for(let S=0;S<o.length;S+=6){let b=o[S+0],x=o[S+2],A=o[S+4],T=Math.max(b,x,A),D=Math.min(b,x,A);T>.9&&D<.1&&(b<.2&&(o[S+0]+=1),x<.2&&(o[S+2]+=1),A<.2&&(o[S+4]+=1))}}function u(S){r.push(S.x,S.y,S.z)}function f(S,b){let x=S*3;b.x=e[x+0],b.y=e[x+1],b.z=e[x+2]}function p(){let S=new E,b=new E,x=new E,A=new E,T=new ae,D=new ae,v=new ae;for(let R=0,L=0;R<r.length;R+=9,L+=6){S.set(r[R+0],r[R+1],r[R+2]),b.set(r[R+3],r[R+4],r[R+5]),x.set(r[R+6],r[R+7],r[R+8]),T.set(o[L+0],o[L+1]),D.set(o[L+2],o[L+3]),v.set(o[L+4],o[L+5]),A.copy(S).add(b).add(x).divideScalar(3);let O=g(A);_(T,L+0,S,O),_(D,L+2,b,O),_(v,L+4,x,O)}}function _(S,b,x,A){A<0&&S.x===1&&(o[b]=S.x-1),x.x===0&&x.z===0&&(o[b]=A/2/Math.PI+.5)}function g(S){return Math.atan2(S.z,-S.x)}function m(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.detail)}},Tl=class s extends ws{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},Lh=new E,Dh=new E,lf=new E,Nh=new Ui,Fr=class extends gt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),r=Math.cos(Tr*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let p=0;p<l;p+=3){o?(c[0]=o.getX(p),c[1]=o.getX(p+1),c[2]=o.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);let{a:_,b:g,c:m}=Nh;if(_.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),Nh.getNormal(lf),d[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,d[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,d[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let S=0;S<3;S++){let b=(S+1)%3,x=d[S],A=d[b],T=Nh[h[S]],D=Nh[h[b]],v=`${x}_${A}`,R=`${A}_${x}`;R in u&&u[R]?(lf.dot(u[R].normal)<=r&&(f.push(T.x,T.y,T.z),f.push(D.x,D.y,D.z)),u[R]=null):v in u||(u[v]={index0:c[S],index1:c[b],normal:lf.clone()})}}for(let p in u)if(u[p]){let{index0:_,index1:g}=u[p];Lh.fromBufferAttribute(a,_),Dh.fromBufferAttribute(a,g),f.push(Lh.x,Lh.y,Lh.z),f.push(Dh.x,Dh.y,Dh.z)}this.setAttribute("position",new Ve(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},ci=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Pe("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new ae:new E);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new E,i=[],r=[],o=[],a=new E,l=new ht;for(let f=0;f<=e;f++){let p=f/e;i[f]=this.getTangentAt(p,new E)}r[0]=new E,o[0]=new E;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(ut(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(ut(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Or=class extends ci{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ae){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Al=class extends Or{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function gp(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,f*=h,i(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}var Vm=new E,Hm=new E,cf=new gp,hf=new gp,uf=new gp,Vi=class extends ci{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new E){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Hm.subVectors(i[0],i[1]).add(i[0]),c=Hm);let d=i[a%r],u=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Vm.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Vm),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),cf.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,p,_,g),hf.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,p,_,g),uf.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(cf.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),hf.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),uf.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(cf.calc(l),hf.calc(l),uf.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new E().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function km(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function gx(s,e){let t=1-s;return t*t*e}function _x(s,e){return 2*(1-s)*s*e}function xx(s,e){return s*s*e}function nl(s,e,t,n){return gx(s,e)+_x(s,t)+xx(s,n)}function yx(s,e){let t=1-s;return t*t*t*e}function vx(s,e){let t=1-s;return 3*t*t*s*e}function Sx(s,e){return 3*(1-s)*s*s*e}function Mx(s,e){return s*s*s*e}function il(s,e,t,n,i){return yx(s,e)+vx(s,t)+Sx(s,n)+Mx(s,i)}var qo=class extends ci{constructor(e=new ae,t=new ae,n=new ae,i=new ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ae){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(il(e,i.x,r.x,o.x,a.x),il(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},$s=class extends ci{constructor(e=new E,t=new E,n=new E,i=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new E){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(il(e,i.x,r.x,o.x,a.x),il(e,i.y,r.y,o.y,a.y),il(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Zo=class extends ci{constructor(e=new ae,t=new ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ae){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},es=class extends ci{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Jo=class extends ci{constructor(e=new ae,t=new ae,n=new ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ae){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(nl(e,i.x,r.x,o.x),nl(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},js=class extends ci{constructor(e=new E,t=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new E){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(nl(e,i.x,r.x,o.x),nl(e,i.y,r.y,o.y),nl(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ko=class extends ci{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ae){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(km(a,l.x,c.x,h.x,d.x),km(a,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ae().fromArray(i))}return this}},uu=Object.freeze({__proto__:null,ArcCurve:Al,CatmullRomCurve3:Vi,CubicBezierCurve:qo,CubicBezierCurve3:$s,EllipseCurve:Or,LineCurve:Zo,LineCurve3:es,QuadraticBezierCurve:Jo,QuadraticBezierCurve3:js,SplineCurve:Ko}),Qs=class extends ci{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new uu[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new uu[i.type]().fromJSON(i))}return this}},er=class extends Qs{constructor(e){super(),this.type="Path",this.currentPoint=new ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Zo(this.currentPoint.clone(),new ae(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new Jo(this.currentPoint.clone(),new ae(e,t),new ae(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){let a=new qo(this.currentPoint.clone(),new ae(e,t),new ae(n,i),new ae(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Ko(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){let c=new Or(e,t,n,i,r,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ei=class extends er{constructor(e){super(e),this.uuid=pi(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new er().fromJSON(i))}return this}};function bx(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=g0(s,0,i,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=Rx(s,e,r,t)),s.length>80*t){a=s[0],l=s[1];let h=a,d=l;for(let u=t;u<i;u+=t){let f=s[u],p=s[u+1];f<a&&(a=f),p<l&&(l=p),f>h&&(h=f),p>d&&(d=p)}c=Math.max(h-a,d-l),c=c!==0?32767/c:0}return Rl(r,o,t,a,l,c,0),o}function g0(s,e,t,n,i){let r;if(i===zx(s,e,t,n)>0)for(let o=e;o<t;o+=n)r=Gm(o/n|0,s[o],s[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Gm(o/n|0,s[o],s[o+1],r);return r&&$o(r,r.next)&&(Pl(r),r=r.next),r}function Br(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&($o(t,t.next)||on(t.prev,t,t.next)===0)){if(Pl(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Rl(s,e,t,n,i,r,o){if(!s)return;!o&&r&&Dx(s,n,i,r);let a=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?wx(s,n,i,r):Ex(s)){e.push(l.i,s.i,c.i),Pl(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=Tx(Br(s),e),Rl(s,e,t,n,i,r,2)):o===2&&Ax(s,e,t,n,i,r):Rl(Br(s),e,t,n,i,r,1);break}}}function Ex(s){let e=s.prev,t=s,n=s.next;if(on(e,t,n)>=0)return!1;let i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(i,r,o),d=Math.min(a,l,c),u=Math.max(i,r,o),f=Math.max(a,l,c),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=u&&p.y>=d&&p.y<=f&&ja(i,a,r,l,o,c,p.x,p.y)&&on(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function wx(s,e,t,n){let i=s.prev,r=s,o=s.next;if(on(i,r,o)>=0)return!1;let a=i.x,l=r.x,c=o.x,h=i.y,d=r.y,u=o.y,f=Math.min(a,l,c),p=Math.min(h,d,u),_=Math.max(a,l,c),g=Math.max(h,d,u),m=Sf(f,p,e,t,n),S=Sf(_,g,e,t,n),b=s.prevZ,x=s.nextZ;for(;b&&b.z>=m&&x&&x.z<=S;){if(b.x>=f&&b.x<=_&&b.y>=p&&b.y<=g&&b!==i&&b!==o&&ja(a,h,l,d,c,u,b.x,b.y)&&on(b.prev,b,b.next)>=0||(b=b.prevZ,x.x>=f&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==o&&ja(a,h,l,d,c,u,x.x,x.y)&&on(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;b&&b.z>=m;){if(b.x>=f&&b.x<=_&&b.y>=p&&b.y<=g&&b!==i&&b!==o&&ja(a,h,l,d,c,u,b.x,b.y)&&on(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;x&&x.z<=S;){if(x.x>=f&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==o&&ja(a,h,l,d,c,u,x.x,x.y)&&on(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Tx(s,e){let t=s;do{let n=t.prev,i=t.next.next;!$o(n,i)&&x0(n,t,t.next,i)&&Cl(n,i)&&Cl(i,n)&&(e.push(n.i,t.i,i.i),Pl(t),Pl(t.next),t=s=i),t=t.next}while(t!==s);return Br(t)}function Ax(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Fx(o,a)){let l=y0(o,a);o=Br(o,o.next),l=Br(l,l.next),Rl(o,e,t,n,i,r,0),Rl(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function Rx(s,e,t,n){let i=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=g0(s,a,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Ux(c))}i.sort(Cx);for(let r=0;r<i.length;r++)t=Px(i[r],t);return t}function Cx(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Px(s,e){let t=Ix(s,e);if(!t)return e;let n=y0(t,s);return Br(n,n.next),Br(t,t.next)}function Ix(s,e){let t=e,n=s.x,i=s.y,r=-1/0,o;if($o(s,t))return t;do{if($o(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let d=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,o=t.x<t.next.x?t:t.next,d===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&_0(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)){let d=Math.abs(i-t.y)/(n-t.x);Cl(t,s)&&(d<h||d===h&&(t.x>o.x||t.x===o.x&&Lx(o,t)))&&(o=t,h=d)}t=t.next}while(t!==a);return o}function Lx(s,e){return on(s.prev,s,e.prev)<0&&on(e.next,s,s.next)<0}function Dx(s,e,t,n){let i=s;do i.z===0&&(i.z=Sf(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Nx(i)}function Nx(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,t*=2}while(e>1);return s}function Sf(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Ux(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function _0(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function ja(s,e,t,n,i,r,o,a){return!(s===o&&e===a)&&_0(s,e,t,n,i,r,o,a)}function Fx(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Ox(s,e)&&(Cl(s,e)&&Cl(e,s)&&Bx(s,e)&&(on(s.prev,s,e.prev)||on(s,e.prev,e))||$o(s,e)&&on(s.prev,s,s.next)>0&&on(e.prev,e,e.next)>0)}function on(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function $o(s,e){return s.x===e.x&&s.y===e.y}function x0(s,e,t,n){let i=Fh(on(s,e,t)),r=Fh(on(s,e,n)),o=Fh(on(t,n,s)),a=Fh(on(t,n,e));return!!(i!==r&&o!==a||i===0&&Uh(s,t,e)||r===0&&Uh(s,n,e)||o===0&&Uh(t,s,n)||a===0&&Uh(t,e,n))}function Uh(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Fh(s){return s>0?1:s<0?-1:0}function Ox(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&x0(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function Cl(s,e){return on(s.prev,s,s.next)<0?on(s,e,s.next)>=0&&on(s,s.prev,e)>=0:on(s,e,s.prev)<0||on(s,s.next,e)<0}function Bx(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function y0(s,e){let t=Mf(s.i,s.x,s.y),n=Mf(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Gm(s,e,t,n){let i=Mf(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Pl(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Mf(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function zx(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var bf=class{static triangulate(e,t,n=2){return bx(e,t,n)}},Mi=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];Wm(e),Xm(n,e);let o=e.length;t.forEach(Wm);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,Xm(n,t[l]);let a=bf.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function Wm(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Xm(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var Ts=class s extends gt{constructor(e=new Ei([new ae(.5,.5),new ae(-.5,.5),new ae(-.5,-.5),new ae(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],r=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new Ve(i,3)),this.setAttribute("uv",new Ve(r,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:Vx,b,x=!1,A,T,D,v;if(m){b=m.getSpacedPoints(h),x=!0,u=!1;let ce=m.isCatmullRomCurve3?m.closed:!1;A=m.computeFrenetFrames(h,ce),T=new E,D=new E,v=new E}u||(g=0,f=0,p=0,_=0);let R=a.extractPoints(c),L=R.shape,O=R.holes;if(!Mi.isClockWise(L)){L=L.reverse();for(let ce=0,pe=O.length;ce<pe;ce++){let ge=O[ce];Mi.isClockWise(ge)&&(O[ce]=ge.reverse())}}function Y(ce){let ge=10000000000000001e-36,_e=ce[0];for(let we=1;we<=ce.length;we++){let it=we%ce.length,tt=ce[it],lt=tt.x-_e.x,dt=tt.y-_e.y,F=lt*lt+dt*dt,Pt=Math.max(Math.abs(tt.x),Math.abs(tt.y),Math.abs(_e.x),Math.abs(_e.y)),_t=ge*Pt*Pt;if(F<=_t){ce.splice(it,1),we--;continue}_e=tt}}Y(L),O.forEach(Y);let N=O.length,B=L;for(let ce=0;ce<N;ce++){let pe=O[ce];L=L.concat(pe)}function V(ce,pe,ge){return pe||$e("ExtrudeGeometry: vec does not exist"),ce.clone().addScaledVector(pe,ge)}let X=L.length;function Q(ce,pe,ge){let _e,we,it,tt=ce.x-pe.x,lt=ce.y-pe.y,dt=ge.x-ce.x,F=ge.y-ce.y,Pt=tt*tt+lt*lt,_t=tt*F-lt*dt;if(Math.abs(_t)>Number.EPSILON){let I=Math.sqrt(Pt),M=Math.sqrt(dt*dt+F*F),G=pe.x-lt/I,J=pe.y+tt/I,te=ge.x-F/M,ye=ge.y+dt/M,be=((te-G)*F-(ye-J)*dt)/(tt*F-lt*dt);_e=G+tt*be-ce.x,we=J+lt*be-ce.y;let ie=_e*_e+we*we;if(ie<=2)return new ae(_e,we);it=Math.sqrt(ie/2)}else{let I=!1;tt>Number.EPSILON?dt>Number.EPSILON&&(I=!0):tt<-Number.EPSILON?dt<-Number.EPSILON&&(I=!0):Math.sign(lt)===Math.sign(F)&&(I=!0),I?(_e=-lt,we=tt,it=Math.sqrt(Pt)):(_e=tt,we=lt,it=Math.sqrt(Pt/2))}return new ae(_e/it,we/it)}let q=[];for(let ce=0,pe=B.length,ge=pe-1,_e=ce+1;ce<pe;ce++,ge++,_e++)ge===pe&&(ge=0),_e===pe&&(_e=0),q[ce]=Q(B[ce],B[ge],B[_e]);let K=[],re,ke=q.concat();for(let ce=0,pe=N;ce<pe;ce++){let ge=O[ce];re=[];for(let _e=0,we=ge.length,it=we-1,tt=_e+1;_e<we;_e++,it++,tt++)it===we&&(it=0),tt===we&&(tt=0),re[_e]=Q(ge[_e],ge[it],ge[tt]);K.push(re),ke=ke.concat(re)}let He;if(g===0)He=Mi.triangulateShape(B,O);else{let ce=[],pe=[];for(let ge=0;ge<g;ge++){let _e=ge/g,we=f*Math.cos(_e*Math.PI/2),it=p*Math.sin(_e*Math.PI/2)+_;for(let tt=0,lt=B.length;tt<lt;tt++){let dt=V(B[tt],q[tt],it);me(dt.x,dt.y,-we),_e===0&&ce.push(dt)}for(let tt=0,lt=N;tt<lt;tt++){let dt=O[tt];re=K[tt];let F=[];for(let Pt=0,_t=dt.length;Pt<_t;Pt++){let I=V(dt[Pt],re[Pt],it);me(I.x,I.y,-we),_e===0&&F.push(I)}_e===0&&pe.push(F)}}He=Mi.triangulateShape(ce,pe)}let wt=He.length,St=p+_;for(let ce=0;ce<X;ce++){let pe=u?V(L[ce],ke[ce],St):L[ce];x?(D.copy(A.normals[0]).multiplyScalar(pe.x),T.copy(A.binormals[0]).multiplyScalar(pe.y),v.copy(b[0]).add(D).add(T),me(v.x,v.y,v.z)):me(pe.x,pe.y,0)}for(let ce=1;ce<=h;ce++)for(let pe=0;pe<X;pe++){let ge=u?V(L[pe],ke[pe],St):L[pe];x?(D.copy(A.normals[ce]).multiplyScalar(ge.x),T.copy(A.binormals[ce]).multiplyScalar(ge.y),v.copy(b[ce]).add(D).add(T),me(v.x,v.y,v.z)):me(ge.x,ge.y,d/h*ce)}for(let ce=g-1;ce>=0;ce--){let pe=ce/g,ge=f*Math.cos(pe*Math.PI/2),_e=p*Math.sin(pe*Math.PI/2)+_;for(let we=0,it=B.length;we<it;we++){let tt=V(B[we],q[we],_e);me(tt.x,tt.y,d+ge)}for(let we=0,it=O.length;we<it;we++){let tt=O[we];re=K[we];for(let lt=0,dt=tt.length;lt<dt;lt++){let F=V(tt[lt],re[lt],_e);x?me(F.x,F.y+b[h-1].y,b[h-1].x+ge):me(F.x,F.y,d+ge)}}}et(),ee();function et(){let ce=i.length/3;if(u){let pe=0,ge=X*pe;for(let _e=0;_e<wt;_e++){let we=He[_e];nt(we[2]+ge,we[1]+ge,we[0]+ge)}pe=h+g*2,ge=X*pe;for(let _e=0;_e<wt;_e++){let we=He[_e];nt(we[0]+ge,we[1]+ge,we[2]+ge)}}else{for(let pe=0;pe<wt;pe++){let ge=He[pe];nt(ge[2],ge[1],ge[0])}for(let pe=0;pe<wt;pe++){let ge=He[pe];nt(ge[0]+X*h,ge[1]+X*h,ge[2]+X*h)}}n.addGroup(ce,i.length/3-ce,0)}function ee(){let ce=i.length/3,pe=0;se(B,pe),pe+=B.length;for(let ge=0,_e=O.length;ge<_e;ge++){let we=O[ge];se(we,pe),pe+=we.length}n.addGroup(ce,i.length/3-ce,1)}function se(ce,pe){let ge=ce.length;for(;--ge>=0;){let _e=ge,we=ge-1;we<0&&(we=ce.length-1);for(let it=0,tt=h+g*2;it<tt;it++){let lt=X*it,dt=X*(it+1),F=pe+_e+lt,Pt=pe+we+lt,_t=pe+we+dt,I=pe+_e+dt;Ae(F,Pt,_t,I)}}}function me(ce,pe,ge){l.push(ce),l.push(pe),l.push(ge)}function nt(ce,pe,ge){at(ce),at(pe),at(ge);let _e=i.length/3,we=S.generateTopUV(n,i,_e-3,_e-2,_e-1);Vt(we[0]),Vt(we[1]),Vt(we[2])}function Ae(ce,pe,ge,_e){at(ce),at(pe),at(_e),at(pe),at(ge),at(_e);let we=i.length/3,it=S.generateSideWallUV(n,i,we-6,we-3,we-2,we-1);Vt(it[0]),Vt(it[1]),Vt(it[3]),Vt(it[1]),Vt(it[2]),Vt(it[3])}function at(ce){i.push(l[ce*3+0]),i.push(l[ce*3+1]),i.push(l[ce*3+2])}function Vt(ce){r.push(ce.x),r.push(ce.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Hx(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new uu[i.type]().fromJSON(i)),new s(n,e.options)}},Vx={generateTopUV:function(s,e,t,n,i){let r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new ae(r,o),new ae(a,l),new ae(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],d=e[n*3+2],u=e[i*3],f=e[i*3+1],p=e[i*3+2],_=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ae(o,1-l),new ae(c,1-d),new ae(u,1-p),new ae(_,1-m)]:[new ae(a,1-l),new ae(h,1-d),new ae(f,1-p),new ae(g,1-m)]}};function Hx(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Il=class s extends ws{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},zr=class s extends gt{constructor(e=[new ae(0,-.5),new ae(.5,0),new ae(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ut(i,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],h=1/t,d=new E,u=new ae,f=new E,p=new E,_=new E,g=0,m=0;for(let S=0;S<=e.length-1;S++)switch(S){case 0:g=e[S+1].x-e[S].x,m=e[S+1].y-e[S].y,f.x=m*1,f.y=-g,f.z=m*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:g=e[S+1].x-e[S].x,m=e[S+1].y-e[S].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(p)}for(let S=0;S<=t;S++){let b=n+S*h*i,x=Math.sin(b),A=Math.cos(b);for(let T=0;T<=e.length-1;T++){d.x=e[T].x*x,d.y=e[T].y,d.z=e[T].x*A,o.push(d.x,d.y,d.z),u.x=S/t,u.y=T/(e.length-1),a.push(u.x,u.y);let D=l[3*T+0]*x,v=l[3*T+1],R=l[3*T+0]*A;c.push(D,v,R)}}for(let S=0;S<t;S++)for(let b=0;b<e.length-1;b++){let x=b+S*e.length,A=x,T=x+e.length,D=x+e.length+1,v=x+1;r.push(A,T,v),r.push(D,v,T)}this.setIndex(r),this.setAttribute("position",new Ve(o,3)),this.setAttribute("uv",new Ve(a,2)),this.setAttribute("normal",new Ve(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}},jo=class s extends ws{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},wi=class s extends gt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=e/a,u=t/l,f=[],p=[],_=[],g=[];for(let m=0;m<h;m++){let S=m*u-o;for(let b=0;b<c;b++){let x=b*d-r;p.push(x,-S,0),_.push(0,0,1),g.push(b/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let S=0;S<a;S++){let b=S+c*m,x=S+c*(m+1),A=S+1+c*(m+1),T=S+1+c*m;f.push(b,x,T),f.push(x,A,T)}this.setIndex(f),this.setAttribute("position",new Ve(p,3)),this.setAttribute("normal",new Ve(_,3)),this.setAttribute("uv",new Ve(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},Ll=class s extends gt{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],l=[],c=[],h=[],d=e,u=(t-e)/i,f=new E,p=new ae;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){let m=r+g/n*o;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}d+=u}for(let _=0;_<i;_++){let g=_*(n+1);for(let m=0;m<n;m++){let S=m+g,b=S,x=S+n+1,A=S+n+2,T=S+1;a.push(b,x,T),a.push(x,A,T)}}this.setIndex(a),this.setAttribute("position",new Ve(l,3)),this.setAttribute("normal",new Ve(c,3)),this.setAttribute("uv",new Ve(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Dl=class s extends gt{constructor(e=new Ei([new ae(0,.5),new ae(-.5,-.5),new ae(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Ve(i,3)),this.setAttribute("normal",new Ve(r,3)),this.setAttribute("uv",new Ve(o,2));function c(h){let d=i.length/3,u=h.extractPoints(t),f=u.shape,p=u.holes;Mi.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){let S=p[g];Mi.isClockWise(S)===!0&&(p[g]=S.reverse())}let _=Mi.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){let S=p[g];f=f.concat(S)}for(let g=0,m=f.length;g<m;g++){let S=f[g];i.push(S.x,S.y,0),r.push(0,0,1),o.push(S.x,S.y)}for(let g=0,m=_.length;g<m;g++){let S=_[g],b=S[0]+d,x=S[1]+d,A=S[2]+d;n.push(b,x,A),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return kx(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let o=t[e.shapes[i]];n.push(o)}return new s(n,e.curveSegments)}};function kx(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}var mi=class s extends gt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new E,u=new E,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){let S=[],b=m/n,x=o+b*a,A=e*Math.cos(x),T=Math.sqrt(e*e-A*A),D=0;m===0&&o===0?D=.5/t:m===n&&l===Math.PI&&(D=-.5/t);for(let v=0;v<=t;v++){let R=v/t,L=i+R*r;d.x=-T*Math.cos(L),d.y=A,d.z=T*Math.sin(L),p.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),g.push(R+D,1-b),S.push(c++)}h.push(S)}for(let m=0;m<n;m++)for(let S=0;S<t;S++){let b=h[m][S+1],x=h[m][S],A=h[m+1][S],T=h[m+1][S+1];(m!==0||o>0)&&f.push(b,x,T),(m!==n-1||l<Math.PI)&&f.push(x,A,T)}this.setIndex(f),this.setAttribute("position",new Ve(p,3)),this.setAttribute("normal",new Ve(_,3)),this.setAttribute("uv",new Ve(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Nl=class s extends ws{constructor(e=1,t=0){let n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},Hi=class s extends gt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),i=Math.floor(i);let l=[],c=[],h=[],d=[],u=new E,f=new E,p=new E;for(let _=0;_<=n;_++){let g=o+_/n*a;for(let m=0;m<=i;m++){let S=m/i*r;f.x=(e+t*Math.cos(g))*Math.cos(S),f.y=(e+t*Math.cos(g))*Math.sin(S),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),u.x=e*Math.cos(S),u.y=e*Math.sin(S),p.subVectors(f,u).normalize(),h.push(p.x,p.y,p.z),d.push(m/i),d.push(_/n)}}for(let _=1;_<=n;_++)for(let g=1;g<=i;g++){let m=(i+1)*_+g-1,S=(i+1)*(_-1)+g-1,b=(i+1)*(_-1)+g,x=(i+1)*_+g;l.push(m,S,x),l.push(S,b,x)}this.setIndex(l),this.setAttribute("position",new Ve(c,3)),this.setAttribute("normal",new Ve(h,3)),this.setAttribute("uv",new Ve(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}},Ul=class s extends gt{constructor(e=1,t=.4,n=64,i=8,r=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:r,q:o},n=Math.floor(n),i=Math.floor(i);let a=[],l=[],c=[],h=[],d=new E,u=new E,f=new E,p=new E,_=new E,g=new E,m=new E;for(let b=0;b<=n;++b){let x=b/n*r*Math.PI*2;S(x,r,o,e,f),S(x+.01,r,o,e,p),g.subVectors(p,f),m.addVectors(p,f),_.crossVectors(g,m),m.crossVectors(_,g),_.normalize(),m.normalize();for(let A=0;A<=i;++A){let T=A/i*Math.PI*2,D=-t*Math.cos(T),v=t*Math.sin(T);d.x=f.x+(D*m.x+v*_.x),d.y=f.y+(D*m.y+v*_.y),d.z=f.z+(D*m.z+v*_.z),l.push(d.x,d.y,d.z),u.subVectors(d,f).normalize(),c.push(u.x,u.y,u.z),h.push(b/n),h.push(A/i)}}for(let b=1;b<=n;b++)for(let x=1;x<=i;x++){let A=(i+1)*(b-1)+(x-1),T=(i+1)*b+(x-1),D=(i+1)*b+x,v=(i+1)*(b-1)+x;a.push(A,T,v),a.push(T,D,v)}this.setIndex(a),this.setAttribute("position",new Ve(l,3)),this.setAttribute("normal",new Ve(c,3)),this.setAttribute("uv",new Ve(h,2));function S(b,x,A,T,D){let v=Math.cos(b),R=Math.sin(b),L=A/x*b,O=Math.cos(L);D.x=T*(2+O)*.5*v,D.y=T*(2+O)*R*.5,D.z=T*Math.sin(L)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},ki=class s extends gt{constructor(e=new js(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new E,l=new E,c=new ae,h=new E,d=[],u=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new Ve(d,3)),this.setAttribute("normal",new Ve(u,3)),this.setAttribute("uv",new Ve(f,2));function _(){for(let b=0;b<t;b++)g(b);g(r===!1?t:0),S(),m()}function g(b){h=e.getPointAt(b/t,h);let x=o.normals[b],A=o.binormals[b];for(let T=0;T<=i;T++){let D=T/i*Math.PI*2,v=Math.sin(D),R=-Math.cos(D);l.x=R*x.x+v*A.x,l.y=R*x.y+v*A.y,l.z=R*x.z+v*A.z,l.normalize(),u.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,d.push(a.x,a.y,a.z)}}function m(){for(let b=1;b<=t;b++)for(let x=1;x<=i;x++){let A=(i+1)*(b-1)+(x-1),T=(i+1)*b+(x-1),D=(i+1)*b+x,v=(i+1)*(b-1)+x;p.push(A,T,v),p.push(T,D,v)}}function S(){for(let b=0;b<=t;b++)for(let x=0;x<=i;x++)c.x=b/t,c.y=x/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new uu[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Vr=class extends gt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new E,r=new E;if(e.index!==null){let o=e.attributes.position,a=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let d=l[c],u=d.start,f=d.count;for(let p=u,_=u+f;p<_;p+=3)for(let g=0;g<3;g++){let m=a.getX(p+g),S=a.getX(p+(g+1)%3);i.fromBufferAttribute(o,m),r.fromBufferAttribute(o,S),Ym(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}}else{let o=e.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){let h=3*a+c,d=3*a+(c+1)%3;i.fromBufferAttribute(o,h),r.fromBufferAttribute(o,d),Ym(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new Ve(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Ym(s,e,t){let n=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var qm=Object.freeze({__proto__:null,BoxGeometry:In,CapsuleGeometry:wl,CircleGeometry:Es,ConeGeometry:Yo,CylinderGeometry:$t,DodecahedronGeometry:Tl,EdgesGeometry:Fr,ExtrudeGeometry:Ts,IcosahedronGeometry:Il,LatheGeometry:zr,OctahedronGeometry:jo,PlaneGeometry:wi,PolyhedronGeometry:ws,RingGeometry:Ll,ShapeGeometry:Dl,SphereGeometry:mi,TetrahedronGeometry:Nl,TorusGeometry:Hi,TorusKnotGeometry:Ul,TubeGeometry:ki,WireframeGeometry:Vr}),Fl=class extends _n{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Be(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};function no(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(Zm(i))i.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(Zm(i[0])){let r=[];for(let o=0,a=i.length;o<a;o++)r[o]=i[o].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Xn(s){let e={};for(let t=0;t<s.length;t++){let n=no(s[t]);for(let i in n)e[i]=n[i]}return e}function Zm(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Gx(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function _p(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:At.workingColorSpace}var Ta={clone:no,merge:Xn},Wx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ln=class extends _n{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wx,this.fragmentShader=Xx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=no(e.uniforms),this.uniformsGroups=Gx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new Be().setHex(i.value);break;case"v2":this.uniforms[n].value=new ae().fromArray(i.value);break;case"v3":this.uniforms[n].value=new E().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Lt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new pt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new ht().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Qo=class extends Ln{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},vt=class extends _n{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=is,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},tr=class extends vt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ae(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ut(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Ol=class extends _n{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Be(16777215),this.specular=new Be(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=is,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.combine=pa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Bl=class extends _n{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Be(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=is,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},zl=class extends _n{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=is,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},Hr=class extends _n{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=is,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.combine=pa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ea=class extends _n{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ta=class extends _n{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Vl=class extends _n{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Be(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=is,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}},Hl=class extends xn{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function Ni(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function sl(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function v0(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Ef(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function S0(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}function Yx(s,e,t,n,i=30){let r=s.clone();r.name=e;let o=[];for(let l=0;l<r.tracks.length;++l){let c=r.tracks[l],h=c.getValueSize(),d=[],u=[];for(let f=0;f<c.times.length;++f){let p=c.times[f]*i;if(!(p<t||p>=n)){d.push(c.times[f]);for(let _=0;_<h;++_)u.push(c.values[f*h+_])}}d.length!==0&&(c.times=Ni(d,c.times.constructor),c.values=Ni(u,c.values.constructor),o.push(c))}r.tracks=o;let a=1/0;for(let l=0;l<r.tracks.length;++l)a>r.tracks[l].times[0]&&(a=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*a);return r.resetDuration(),r}function qx(s,e=0,t=s,n=30){n<=0&&(n=30);let i=t.tracks.length,r=e/n;for(let o=0;o<i;++o){let a=t.tracks[o],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;let c=s.tracks.find(function(m){return m.name===a.name&&m.ValueTypeName===l});if(c===void 0)continue;let h=0,d=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=d/3);let u=0,f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=f/3);let p=a.times.length-1,_;if(r<=a.times[0]){let m=h,S=d-h;_=a.values.slice(m,S)}else if(r>=a.times[p]){let m=p*d+h,S=m+d-h;_=a.values.slice(m,S)}else{let m=a.createInterpolant(),S=h,b=d-h;m.evaluate(r),_=m.resultBuffer.slice(S,b)}l==="quaternion"&&new fn().fromArray(_).normalize().conjugate().toArray(_);let g=c.times.length;for(let m=0;m<g;++m){let S=m*f+u;if(l==="quaternion")fn.multiplyQuaternionsFlat(c.values,S,_,0,c.values,S);else{let b=f-u*2;for(let x=0;x<b;++x)c.values[S+x]-=_[x]}}}return s.blendMode=fd,s}var du=class{static convertArray(e,t){return Ni(e,t)}static isTypedArray(e){return l0(e)}static hasTangents(e){return sl(e)}static getKeyframeOrder(e){return v0(e)}static sortedArray(e,t,n){return Ef(e,t,n)}static flattenJSON(e,t,n,i){S0(e,t,n,i)}static subclip(e,t,n,i,r=30){return Yx(e,t,n,i,r)}static makeClipAdditive(e,t=0,n=e,i=30){return qx(e,t,n,i)}},As=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},kl=class extends As{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Gs,endingEnd:Gs}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ws:r=e,a=2*t-n;break;case Uo:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ws:o=e,l=2*n-t;break;case Uo:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),_=p*p,g=_*p,m=-u*g+2*u*_-u*p,S=(1+u)*g+(-1.5-2*u)*_+(-.5+u)*p+1,b=(-1-f)*g+(1.5+f)*_+.5*p,x=f*g-f*_;for(let A=0;A!==a;++A)r[A]=m*o[h+A]+S*o[c+A]+b*o[l+A]+x*o[d+A];return r}},na=class extends As{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},Gl=class extends As{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Wl=class extends As{interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this.inTangents,d=this.outTangents;if(!h||!d){let p=(n-t)/(i-t),_=1-p;for(let g=0;g!==a;++g)r[g]=o[c+g]*_+o[l+g]*p;return r}let u=a*2,f=e-1;for(let p=0;p!==a;++p){let _=o[c+p],g=o[l+p],m=f*u+p*2,S=d[m],b=d[m+1],x=e*u+p*2,A=h[x],T=h[x+1],D=Jx(n,t,S,A,i);r[p]=M0(D,_,b,T,g)}return r}};function M0(s,e,t,n,i){let r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*n+s*s*s*i}function Zx(s,e,t,n,i){let r=1-s;return 3*r*r*(t-e)+6*r*s*(n-t)+3*s*s*(i-n)}function Jx(s,e,t,n,i){let r=(s-e)/(i-e);for(let o=0;o<8;o++){let a=M0(r,e,t,n,i)-s;if(Math.abs(a)<1e-10)break;let l=Zx(r,e,t,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var ti=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ni(t,this.TimeBufferType),this.values=Ni(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ni(e.times,Array),values:Ni(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),sl(e.settings)&&(n.settings={inTangents:Ni(e.settings.inTangents,Array),outTangents:Ni(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Gl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new na(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new kl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Wl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case No:t=this.InterpolantFactoryMethodDiscrete;break;case dl:t=this.InterpolantFactoryMethodLinear;break;case Qa:t=this.InterpolantFactoryMethodSmooth;break;case qh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Pe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return No;case this.InterpolantFactoryMethodLinear:return dl;case this.InterpolantFactoryMethodSmooth:return Qa;case this.InterpolantFactoryMethodBezier:return qh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;sl(this.settings)&&(Jm(this.settings.inTangents,e),Jm(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&($e("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&($e("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){$e("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){$e("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&l0(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){$e("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Qa,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let p=0;p!==n;++p){let _=t[d+p];if(_!==t[u+p]||_!==t[f+p]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,sl(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Jm(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]*=e}ti.prototype.ValueTypeName="";ti.prototype.TimeBufferType=Float32Array;ti.prototype.ValueBufferType=Float32Array;ti.prototype.DefaultInterpolation=dl;var ts=class extends ti{constructor(e,t,n){super(e,t,n)}};ts.prototype.ValueTypeName="bool";ts.prototype.ValueBufferType=Array;ts.prototype.DefaultInterpolation=No;ts.prototype.InterpolantFactoryMethodLinear=void 0;ts.prototype.InterpolantFactoryMethodSmooth=void 0;var ia=class extends ti{constructor(e,t,n,i){super(e,t,n,i)}};ia.prototype.ValueTypeName="color";var kr=class extends ti{constructor(e,t,n,i){super(e,t,n,i)}};kr.prototype.ValueTypeName="number";var Xl=class extends As{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t),c=e*a;for(let h=c+a;c!==h;c+=4)fn.slerpFlat(r,0,o,c-a,o,c,l);return r}},Gr=class extends ti{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Xl(this.times,this.values,this.getValueSize(),e)}};Gr.prototype.ValueTypeName="quaternion";Gr.prototype.InterpolantFactoryMethodSmooth=void 0;var ns=class extends ti{constructor(e,t,n){super(e,t,n)}};ns.prototype.ValueTypeName="string";ns.prototype.ValueBufferType=Array;ns.prototype.DefaultInterpolation=No;ns.prototype.InterpolantFactoryMethodLinear=void 0;ns.prototype.InterpolantFactoryMethodSmooth=void 0;var sa=class extends ti{constructor(e,t,n,i){super(e,t,n,i)}};sa.prototype.ValueTypeName="vector";var nr=class{constructor(e="",t=-1,n=[],i=kc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=pi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push($x(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(ti.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=v0(l);l=Ef(l,1,h),c=Ef(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new kr(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],h=c.name.match(r);if(h&&h.length>1){let d=h[1],u=i[d];u||(i[d]=u=[]),u.push(c)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Kx(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return kr;case"vector":case"vector2":case"vector3":case"vector4":return sa;case"color":return ia;case"quaternion":return Gr;case"bool":case"boolean":return ts;case"string":return ns}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function $x(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Kx(s.type);if(s.times===void 0){let n=[],i=[];S0(s.keys,n,i,"value"),s.times=n,s.values=i}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),sl(s.settings)&&(t.settings={inTangents:Ni(s.settings.inTangents,Float32Array),outTangents:Ni(s.settings.outTangents,Float32Array)}),t}var Fi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(Km(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!Km(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function Km(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var ra=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},xp=new ra,Dn=class{constructor(e){this.manager=e!==void 0?e:xp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Dn.DEFAULT_MATERIAL_NAME="__DEFAULT";var _s={},wf=class extends Error{constructor(e,t){super(e),this.response=t}},Ti=class extends Dn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Fi.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(_s[e]!==void 0){_s[e].push({onLoad:t,onProgress:n,onError:i});return}_s[e]=[],_s[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Pe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=_s[e],d=c.body.getReader(),u=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=u?parseInt(u):0,p=f!==0,_=0,g=new ReadableStream({start(m){S();function S(){d.read().then(({done:b,value:x})=>{if(b)m.close();else{_+=x.byteLength;let A=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let T=0,D=h.length;T<D;T++){let v=h[T];v.onProgress&&v.onProgress(A)}m.enqueue(x),S()}},b=>{m.error(b)})}}});return new Response(g)}else throw new wf(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{Fi.add(`file:${e}`,c);let h=_s[e];delete _s[e];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=_s[e];if(h===void 0)throw this.manager.itemError(e),c;delete _s[e];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},fu=class extends Dn{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new Ti(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):$e(l),r.manager.itemError(e)}},n,i)}parse(e){let t=[];for(let n=0;n<e.length;n++){let i=nr.parse(e[n]);t.push(i)}return t}},pu=class extends Dn{constructor(e){super(e)}load(e,t,n,i){let r=this,o=[],a=new Ur,l=new Ti(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(r.withCredentials);let c=0;function h(d){l.load(e[d],function(u){let f=r.parse(u,!0);o[d]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(a.minFilter=Kt),a.image=o,a.format=f.format,a.needsUpdate=!0,t&&t(a))},n,i)}if(Array.isArray(e))for(let d=0,u=e.length;d<u;++d)h(d);else l.load(e,function(d){let u=r.parse(d,!0);if(u.isCubemap){let f=u.mipmaps.length/u.mipmapCount;for(let p=0;p<f;p++){o[p]={mipmaps:[]};for(let _=0;_<u.mipmapCount;_++)o[p].mipmaps.push(u.mipmaps[p*u.mipmapCount+_]),o[p].format=u.format,o[p].width=u.width,o[p].height=u.height}a.image=o}else a.image.width=u.width,a.image.height=u.height,a.mipmaps=u.mipmaps;u.mipmapCount===1&&(a.minFilter=Kt),a.format=u.format,a.needsUpdate=!0,t&&t(a)},n,i);return a}},To=new WeakMap,ir=class extends Dn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Fi.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let d=To.get(o);d===void 0&&(d=[],To.set(o,d)),d.push({onLoad:t,onError:i})}return o}let a=Bo("img");function l(){h(),t&&t(this);let d=To.get(this)||[];for(let u=0;u<d.length;u++){let f=d[u];f.onLoad&&f.onLoad(this)}To.delete(this),r.manager.itemEnd(e)}function c(d){h(),i&&i(d),Fi.remove(`image:${e}`);let u=To.get(this)||[];for(let f=0;f<u.length;f++){let p=u[f];p.onError&&p.onError(d)}To.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Fi.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}},mu=class extends Dn{constructor(e){super(e)}load(e,t,n,i){let r=new Js;r.colorSpace=Rn;let o=new ir(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function l(c){o.load(e[c],function(h){r.images[c]=h,a++,a===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return r}},gu=class extends Dn{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new Qn,a=new Ti(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(l){let c;try{c=r.parse(l)}catch(h){i!==void 0?i(h):$e(h);return}r._applyTexData(o,c),t&&t(o,c)},n,i),o}createDataTexture(e){let t=new Qn;return this._applyTexData(t,this.parse(e)),t}_applyTexData(e,t){t.image!==void 0?e.image=t.image:t.data!==void 0&&(e.image.width=t.width,e.image.height=t.height,e.image.data=t.data),e.wrapS=t.wrapS!==void 0?t.wrapS:jn,e.wrapT=t.wrapT!==void 0?t.wrapT:jn,e.magFilter=t.magFilter!==void 0?t.magFilter:Kt,e.minFilter=t.minFilter!==void 0?t.minFilter:Kt,e.anisotropy=t.anisotropy!==void 0?t.anisotropy:1,t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.mipmaps!==void 0&&(e.mipmaps=t.mipmaps,e.minFilter=Yi),t.mipmapCount===1&&(e.minFilter=Kt),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),e.needsUpdate=!0}},_u=class extends Dn{constructor(e){super(e)}load(e,t,n,i){let r=new un,o=new ir(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},Gi=class extends Dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Wr=class extends Gi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},df=new ht,$m=new E,jm=new E,Xr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.mapType=ni,this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qi,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new Lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;$m.setFromMatrixPosition(e.matrixWorld),t.position.copy($m),jm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(jm),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){df.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(df,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=i?i.z/r.x:1,a=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;e.coordinateSystem===Ys||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(df)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Oh=new E,Bh=new fn,$i=new E,Yr=class extends Dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=ai,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Oh,Bh,$i),$i.x===1&&$i.y===1&&$i.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Oh,Bh,$i.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Oh,Bh,$i),$i.x===1&&$i.y===1&&$i.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Oh,Bh,$i.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Hs=new E,Qm=new ae,eg=new ae,cn=class extends Yr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Rr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Tr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Rr*2*Math.atan(Math.tan(Tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Hs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Hs.x,Hs.y).multiplyScalar(-e/Hs.z),Hs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Hs.x,Hs.y).multiplyScalar(-e/Hs.z)}getViewSize(e,t){return this.getViewBounds(e,Qm,eg),t.subVectors(eg,Qm)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Tr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Tf=class extends Xr{constructor(){super(new cn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Rr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Yl=class extends Gi{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.target=new Dt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Tf}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Af=class extends Xr{constructor(){super(new cn(90,1,.5,500)),this.isPointLightShadow=!0}},qr=class extends Gi{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Af}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},sr=class extends Yr{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Rf=class extends Xr{constructor(){super(new sr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},rr=class extends Gi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Dt.DEFAULT_UP),this.updateMatrix(),this.target=new Dt,this.shadow=new Rf}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},ql=class extends Gi{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}},Zl=class extends Gi{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){let t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}},oa=class{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new E)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){let n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.282095),t.addScaledVector(o[1],.488603*i),t.addScaledVector(o[2],.488603*r),t.addScaledVector(o[3],.488603*n),t.addScaledVector(o[4],1.092548*(n*i)),t.addScaledVector(o[5],1.092548*(i*r)),t.addScaledVector(o[6],.315392*(3*r*r-1)),t.addScaledVector(o[7],1.092548*(n*r)),t.addScaledVector(o[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){let n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.886227),t.addScaledVector(o[1],2*.511664*i),t.addScaledVector(o[2],2*.511664*r),t.addScaledVector(o[3],2*.511664*n),t.addScaledVector(o[4],2*.429043*n*i),t.addScaledVector(o[5],2*.429043*i*r),t.addScaledVector(o[6],.743125*r*r-.247708),t.addScaledVector(o[7],2*.429043*n*r),t.addScaledVector(o[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){let n=e.x,i=e.y,r=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*r,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*n*r,t[8]=.546274*(n*n-i*i)}},Jl=class extends Gi{constructor(e=new oa,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}toJSON(e){let t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}},tg={},Kl=class s extends Dn{constructor(e){super(e),this.textures={}}load(e,t,n,i){let r=this,o=new Ti(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):$e(l),r.manager.itemError(e)}},n,i)}parse(e){let t=this.createMaterialFromType(e.type);return t.fromJSON(e,this.textures),t}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return s.createMaterialFromType(e)}static createMaterialFromType(e){let n={ShadowMaterial:Fl,SpriteMaterial:Zs,RawShaderMaterial:Qo,ShaderMaterial:Ln,PointsMaterial:Wo,MeshPhysicalMaterial:tr,MeshStandardMaterial:vt,MeshPhongMaterial:Ol,MeshToonMaterial:Bl,MeshNormalMaterial:zl,MeshLambertMaterial:Hr,MeshDepthMaterial:ea,MeshDistanceMaterial:ta,MeshBasicMaterial:jt,MeshMatcapMaterial:Vl,LineDashedMaterial:Hl,LineBasicMaterial:xn,Material:_n,...tg}[e],i;return n===void 0?(ji(`MaterialLoader: Unknown material type "${e}". Use .registerMaterial() before starting the deserialization process.`),i=new _n):i=new n,i}static registerMaterial(e,t){tg[e]=t}},aa=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},Zr=class extends gt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},$l=class extends Dn{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new Ti(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):$e(l),r.manager.itemError(e)}},n,i)}parse(e){let t={},n={};function i(f,p){if(t[p]!==void 0)return t[p];let g=f.interleavedBuffers[p],m=r(f,g.buffer),S=Io(g.type,m),b=new Dr(S,g.stride);return b.uuid=g.uuid,g.usage!==void 0&&b.setUsage(g.usage),t[p]=b,b}function r(f,p){if(n[p]!==void 0)return n[p];let g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}let o=e.isInstancedBufferGeometry?new Zr:new gt,a=e.data.index;if(a!==void 0){let f=Io(a.type,a.array);o.setIndex(new Xt(f,1))}let l=e.data.attributes;for(let f in l){let p=l[f],_;if(p.isInterleavedBufferAttribute){let g=i(e.data,p.data);_=new Gn(g,p.itemSize,p.offset,p.normalized)}else{let g=Io(p.type,p.array),m=p.isInstancedBufferAttribute?Ss:Xt;_=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(_.name=p.name),p.usage!==void 0&&_.setUsage(p.usage),p.gpuType!==void 0&&(_.gpuType=p.gpuType),o.setAttribute(f,_)}let c=e.data.morphAttributes;if(c)for(let f in c){let p=c[f],_=[];for(let g=0,m=p.length;g<m;g++){let S=p[g],b;if(S.isInterleavedBufferAttribute){let x=i(e.data,S.data);b=new Gn(x,S.itemSize,S.offset,S.normalized)}else{let x=Io(S.type,S.array);b=new Xt(x,S.itemSize,S.normalized)}S.name!==void 0&&(b.name=S.name),S.usage!==void 0&&b.setUsage(S.usage),S.gpuType!==void 0&&(b.gpuType=S.gpuType),_.push(b)}o.morphAttributes[f]=_}e.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);let d=e.data.groups||e.data.drawcalls||e.data.offsets;if(d!==void 0)for(let f=0,p=d.length;f!==p;++f){let _=d[f];o.addGroup(_.start,_.count,_.materialIndex)}let u=e.data.boundingSphere;return u!==void 0&&(o.boundingSphere=new nn().fromJSON(u)),e.name&&(o.name=e.name),e.userData&&(o.userData=e.userData),o}},ff={},xu=class extends Dn{constructor(e){super(e)}load(e,t,n,i){let r=this,o=this.path===""?aa.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||o;let a=new Ti(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(d){i!==void 0&&i(d),$e("ObjectLoader: Can't parse "+e+".",d.message);return}let h=c.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),$e("ObjectLoader: Can't load "+e);return}r.parse(c,t)},n,i)}async loadAsync(e,t){let n=this,i=this.path===""?aa.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;let r=new Ti(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials);let o=await r.loadAsync(e,t),a;try{a=JSON.parse(o)}catch(c){throw new Error("THREE.ObjectLoader: Can't parse "+e+". "+c.message)}let l=a.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(a)}parse(e,t){let n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),r=this.parseGeometries(e.geometries,i),o=this.parseImages(e.images,function(){t!==void 0&&t(c)}),a=this.parseTextures(e.textures,o),l=this.parseMaterials(e.materials,a),c=this.parseObject(e.object,r,l,a,n),h=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,h),this.bindLightTargets(c),t!==void 0){let d=!1;for(let u in o)if(o[u].data instanceof HTMLImageElement){d=!0;break}d===!1&&t(c)}return c}async parseAsync(e){let t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),r=await this.parseImagesAsync(e.images),o=this.parseTextures(e.textures,r),a=this.parseMaterials(e.materials,o),l=this.parseObject(e.object,i,a,o,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}static registerGeometry(e,t){ff[e]=t}parseShapes(e){let t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){let r=new Ei().fromJSON(e[n]);t[r.uuid]=r}return t}parseSkeletons(e,t){let n={},i={};if(t.traverse(function(r){r.isBone&&(i[r.uuid]=r)}),e!==void 0)for(let r=0,o=e.length;r<o;r++){let a=new xl().fromJSON(e[r],i);n[a.uuid]=a}return n}parseGeometries(e,t){let n={};if(e!==void 0){let i=new $l;for(let r=0,o=e.length;r<o;r++){let a,l=e[r];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":a=i.parse(l);break;default:l.type in qm?a=qm[l.type].fromJSON(l,t):l.type in ff?a=ff[l.type].fromJSON(l,t):Pe(`ObjectLoader: Unknown geometry type "${l.type}". Use .registerGeometry() before starting the deserialization process.`)}a.uuid=l.uuid,l.name!==void 0&&(a.name=l.name),l.userData!==void 0&&(a.userData=l.userData),n[l.uuid]=a}}return n}parseMaterials(e,t){let n={},i={};if(e!==void 0){let r=new Kl;r.setTextures(t);for(let o=0,a=e.length;o<a;o++){let l=e[o];n[l.uuid]===void 0&&(n[l.uuid]=r.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){let t={};if(e!==void 0)for(let n=0;n<e.length;n++){let i=e[n],r=nr.parse(i);t[r.uuid]=r}return t}parseImages(e,t){let n=this,i={},r;function o(l){return l=n.manager.resolveURL(l),n.manager.itemStart(l),r.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function a(l){if(typeof l=="string"){let c=l,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return o(h)}else return l.data?{data:Io(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){let l=new ra(t);r=new ir(l),r.setCrossOrigin(this.crossOrigin);for(let c=0,h=e.length;c<h;c++){let d=e[c],u=d.url;if(Array.isArray(u)){let f=[];for(let p=0,_=u.length;p<_;p++){let g=u[p],m=a(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new Qn(m.data,m.width,m.height)))}i[d.uuid]=new Si(f)}else{let f=a(d.url);i[d.uuid]=new Si(f)}}}return i}async parseImagesAsync(e){let t=this,n={},i;async function r(o){if(typeof o=="string"){let a=o,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:t.resourcePath+a;return await i.loadAsync(l)}else return o.data?{data:Io(o.type,o.data),width:o.width,height:o.height}:null}if(e!==void 0&&e.length>0){i=new ir(this.manager),i.setCrossOrigin(this.crossOrigin);for(let o=0,a=e.length;o<a;o++){let l=e[o],c=l.url;if(Array.isArray(c)){let h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d],p=await r(f);p!==null&&(p instanceof HTMLImageElement?h.push(p):h.push(new Qn(p.data,p.width,p.height)))}n[l.uuid]=new Si(h)}else{let h=await r(l.url);n[l.uuid]=new Si(h)}}}return n}parseTextures(e,t){function n(r,o){return typeof r=="number"?r:(Pe("ObjectLoader.parseTexture: Constant should be in numeric form.",r),o[r])}let i={};if(e!==void 0)for(let r=0,o=e.length;r<o;r++){let a=e[r];a.image===void 0&&Pe('ObjectLoader: No "image" specified for',a.uuid),t[a.image]===void 0&&Pe("ObjectLoader: Undefined image",a.image);let l=t[a.image],c=l.data,h;Array.isArray(c)?(h=new Js,c.length===6&&(h.needsUpdate=!0)):(c&&c.data?h=new Qn:h=new un,c&&(h.needsUpdate=!0)),h.source=l,h.uuid=a.uuid,a.name!==void 0&&(h.name=a.name),a.mapping!==void 0&&(h.mapping=n(a.mapping,jx)),a.channel!==void 0&&(h.channel=a.channel),a.offset!==void 0&&h.offset.fromArray(a.offset),a.repeat!==void 0&&h.repeat.fromArray(a.repeat),a.center!==void 0&&h.center.fromArray(a.center),a.rotation!==void 0&&(h.rotation=a.rotation),a.wrap!==void 0&&(h.wrapS=n(a.wrap[0],ng),h.wrapT=n(a.wrap[1],ng)),a.format!==void 0&&(h.format=a.format),a.internalFormat!==void 0&&(h.internalFormat=a.internalFormat),a.type!==void 0&&(h.type=a.type),a.colorSpace!==void 0&&(h.colorSpace=a.colorSpace),a.minFilter!==void 0&&(h.minFilter=n(a.minFilter,ig)),a.magFilter!==void 0&&(h.magFilter=n(a.magFilter,ig)),a.anisotropy!==void 0&&(h.anisotropy=a.anisotropy),a.flipY!==void 0&&(h.flipY=a.flipY),a.generateMipmaps!==void 0&&(h.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(h.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(h.compareFunction=a.compareFunction),a.normalized!==void 0&&(h.normalized=a.normalized),a.userData!==void 0&&(h.userData=a.userData),i[a.uuid]=h}return i}parseObject(e,t,n,i,r){let o;function a(u){return t[u]===void 0&&Pe("ObjectLoader: Undefined geometry",u),t[u]}function l(u){if(u!==void 0){if(Array.isArray(u)){let f=[];for(let p=0,_=u.length;p<_;p++){let g=u[p];n[g]===void 0&&Pe("ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[u]===void 0&&Pe("ObjectLoader: Undefined material",u),n[u]}}function c(u){return i[u]===void 0&&Pe("ObjectLoader: Undefined texture",u),i[u]}let h,d;switch(e.type){case"Scene":o=new vs,e.background!==void 0&&(Number.isInteger(e.background)?o.background=new Be(e.background):o.background=c(e.background)),e.environment!==void 0&&(o.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?o.fog=new ml(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(o.fog=new pl(e.fog.color,e.fog.density)),e.fog.name!==""&&(o.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(o.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&o.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(o.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&o.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":o=new cn(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(o.focus=e.focus),e.zoom!==void 0&&(o.zoom=e.zoom),e.filmGauge!==void 0&&(o.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(o.filmOffset=e.filmOffset),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"OrthographicCamera":o=new sr(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(o.zoom=e.zoom),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"AmbientLight":o=new ql(e.color,e.intensity);break;case"DirectionalLight":o=new rr(e.color,e.intensity),o.target=e.target||"";break;case"PointLight":o=new qr(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":o=new Zl(e.color,e.intensity,e.width,e.height);break;case"SpotLight":o=new Yl(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),o.target=e.target||"";break;case"HemisphereLight":o=new Wr(e.color,e.groundColor,e.intensity);break;case"LightProbe":let u=new oa().fromArray(e.sh);o=new Jl(u,e.intensity);break;case"SkinnedMesh":h=a(e.geometry),d=l(e.material),o=new _l(h,d),e.bindMode!==void 0&&(o.bindMode=e.bindMode),e.bindMatrix!==void 0&&o.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(o.skeleton=e.skeleton);break;case"Mesh":h=a(e.geometry),d=l(e.material),o=new Ot(h,d);break;case"InstancedMesh":h=a(e.geometry),d=l(e.material);let f=e.count,p=e.instanceMatrix,_=e.instanceColor;o=new Ms(h,d,f),o.instanceMatrix=new Ss(new Float32Array(p.array),16),_!==void 0&&(o.instanceColor=new Ss(new Float32Array(_.array),_.itemSize));break;case"BatchedMesh":h=a(e.geometry),d=l(e.material),o=new vl(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,d),o.geometry=h,o.perObjectFrustumCulled=e.perObjectFrustumCulled,o.sortObjects=e.sortObjects,o._drawRanges=e.drawRanges,o._reservedRanges=e.reservedRanges,o._geometryInfo=e.geometryInfo.map(g=>{let m=null,S=null;return g.boundingBox!==void 0&&(m=new tn().fromJSON(g.boundingBox)),g.boundingSphere!==void 0&&(S=new nn().fromJSON(g.boundingSphere)),{...g,boundingBox:m,boundingSphere:S}}),o._instanceInfo=e.instanceInfo,o._availableInstanceIds=e._availableInstanceIds,o._availableGeometryIds=e._availableGeometryIds,o._nextIndexStart=e.nextIndexStart,o._nextVertexStart=e.nextVertexStart,o._geometryCount=e.geometryCount,o._maxInstanceCount=e.maxInstanceCount,o._maxVertexCount=e.maxVertexCount,o._maxIndexCount=e.maxIndexCount,o._geometryInitialized=e.geometryInitialized,o._matricesTexture=c(e.matricesTexture.uuid),o._indirectTexture=c(e.indirectTexture.uuid),e.colorsTexture!==void 0&&(o._colorsTexture=c(e.colorsTexture.uuid)),e.boundingSphere!==void 0&&(o.boundingSphere=new nn().fromJSON(e.boundingSphere)),e.boundingBox!==void 0&&(o.boundingBox=new tn().fromJSON(e.boundingBox));break;case"LOD":o=new gl;break;case"Line":o=new zi(a(e.geometry),l(e.material));break;case"LineLoop":o=new Sl(a(e.geometry),l(e.material));break;case"LineSegments":o=new ei(a(e.geometry),l(e.material));break;case"PointCloud":case"Points":o=new Ml(a(e.geometry),l(e.material));break;case"Sprite":o=new Nr(l(e.material));break;case"Group":o=new gn;break;case"Bone":o=new Go;break;default:o=new Dt}if(o.uuid=e.uuid,e.name!==void 0&&(o.name=e.name),e.matrix!==void 0?(o.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=e.matrixAutoUpdate),o.matrixAutoUpdate&&o.matrix.decompose(o.position,o.quaternion,o.scale)):(e.position!==void 0&&o.position.fromArray(e.position),e.rotation!==void 0&&o.rotation.fromArray(e.rotation),e.quaternion!==void 0&&o.quaternion.fromArray(e.quaternion),e.scale!==void 0&&o.scale.fromArray(e.scale)),e.up!==void 0&&o.up.fromArray(e.up),e.pivot!==void 0&&(o.pivot=new E().fromArray(e.pivot)),e.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),e.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=e.morphTargetInfluences.slice()),e.castShadow!==void 0&&(o.castShadow=e.castShadow),e.receiveShadow!==void 0&&(o.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(o.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(o.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(o.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(o.shadow.radius=e.shadow.radius),e.shadow.blurSamples!==void 0&&(o.shadow.blurSamples=e.shadow.blurSamples),e.shadow.focus!==void 0&&(o.shadow.focus=e.shadow.focus),e.shadow.aspect!==void 0&&(o.shadow.aspect=e.shadow.aspect),e.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(o.visible=e.visible),e.frustumCulled!==void 0&&(o.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(o.renderOrder=e.renderOrder),e.static!==void 0&&(o.static=e.static),e.userData!==void 0&&(o.userData=e.userData),e.layers!==void 0&&(o.layers.mask=e.layers),e.children!==void 0){let u=e.children;for(let f=0;f<u.length;f++)o.add(this.parseObject(u[f],t,n,i,r))}if(e.animations!==void 0){let u=e.animations;for(let f=0;f<u.length;f++){let p=u[f];o.animations.push(r[p])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(o.autoUpdate=e.autoUpdate);let u=e.levels;for(let f=0;f<u.length;f++){let p=u[f],_=o.getObjectByProperty("uuid",p.object);_!==void 0&&o.addLevel(_,p.distance,p.hysteresis)}}return o}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){let i=t[n.skeleton];i===void 0?Pe("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){let n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new Dt}})}},jx={UVMapping:rc,CubeReflectionMapping:Xi,CubeRefractionMapping:Ls,EquirectangularReflectionMapping:ga,EquirectangularRefractionMapping:_a,CubeUVReflectionMapping:jr},ng={RepeatWrapping:Xs,ClampToEdgeWrapping:jn,MirroredRepeatWrapping:Do},ig={NearestFilter:hn,NearestMipmapNearestFilter:od,NearestMipmapLinearFilter:Qr,LinearFilter:Kt,LinearMipmapNearestFilter:xa,LinearMipmapLinearFilter:Yi},pf=new WeakMap,yu=class extends Dn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Pe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Pe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Fi.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{pf.has(o)===!0?(i&&i(pf.get(o)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);return}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Fi.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),pf.set(l,c),Fi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Fi.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},zh,la=class{static getContext(){return zh===void 0&&(zh=new(window.AudioContext||window.webkitAudioContext)),zh}static setContext(e){zh=e}},vu=class extends Dn{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new Ti(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){try{let c=l.slice(0),h=la.getContext(),d=e+"#decode";r.manager.itemStart(d),h.decodeAudioData(c,function(u){t(u),r.manager.itemEnd(d)}).catch(function(u){a(u),r.manager.itemEnd(d)})}catch(c){a(c)}},n,i);function a(l){i?i(l):$e(l),r.manager.itemError(e)}}},sg=new ht,rg=new ht,vr=new ht,Su=class{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new cn,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new cn,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){let t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,vr.copy(e.projectionMatrix);let i=t.eyeSep/2,r=i*t.near/t.focus,o=t.near*Math.tan(Tr*t.fov*.5)/t.zoom,a,l;rg.elements[12]=-i,sg.elements[12]=i,a=-o*t.aspect+r,l=o*t.aspect+r,vr.elements[0]=2*t.near/(l-a),vr.elements[8]=(l+a)/(l-a),this.cameraL.projectionMatrix.copy(vr),a=-o*t.aspect-r,l=o*t.aspect-r,vr.elements[0]=2*t.near/(l-a),vr.elements[8]=(l+a)/(l-a),this.cameraR.projectionMatrix.copy(vr)}this.cameraL.matrix.copy(e.matrixWorld).multiply(rg),this.cameraL.matrixWorldNeedsUpdate=!0,this.cameraR.matrix.copy(e.matrixWorld).multiply(sg),this.cameraR.matrixWorldNeedsUpdate=!0}},Ao=-90,Ro=1,jl=class extends Dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new cn(Ao,Ro,e,t);i.layers=this.layers,this.add(i);let r=new cn(Ao,Ro,e,t);r.layers=this.layers,this.add(r);let o=new cn(Ao,Ro,e,t);o.layers=this.layers,this.add(o);let a=new cn(Ao,Ro,e,t);a.layers=this.layers,this.add(a);let l=new cn(Ao,Ro,e,t);l.layers=this.layers,this.add(l);let c=new cn(Ao,Ro,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===ai)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ys)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ql=class extends cn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},ec=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Qx.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Qx(){this._document.hidden===!1&&this.reset()}var Sr=new E,mf=new fn,ey=new E,Mr=new E,br=new E,Mu=class extends Dt{constructor(){super(),this.type="AudioListener",this.context=la.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new ec}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e),this._timer.update();let t=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(Sr,mf,ey),Mr.set(0,0,-1).applyQuaternion(mf),br.set(0,1,0).applyQuaternion(mf),t.positionX){let n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(Sr.x,n),t.positionY.linearRampToValueAtTime(Sr.y,n),t.positionZ.linearRampToValueAtTime(Sr.z,n),t.forwardX.linearRampToValueAtTime(Mr.x,n),t.forwardY.linearRampToValueAtTime(Mr.y,n),t.forwardZ.linearRampToValueAtTime(Mr.z,n),t.upX.linearRampToValueAtTime(br.x,n),t.upY.linearRampToValueAtTime(br.y,n),t.upZ.linearRampToValueAtTime(br.z,n)}else t.setPosition(Sr.x,Sr.y,Sr.z),t.setOrientation(Mr.x,Mr.y,Mr.z,br.x,br.y,br.z)}},tc=class extends Dt{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){Pe("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;let t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(Pe("Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}copy(e,t){return super.copy(e,t),e.sourceType!=="buffer"?(Pe("Audio: Audio source type cannot be copied."),this):(this.autoplay=e.autoplay,this.buffer=e.buffer,this.detune=e.detune,this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.offset=e.offset,this.duration=e.duration,this.playbackRate=e.playbackRate,this.hasPlaybackControl=e.hasPlaybackControl,this.sourceType=e.sourceType,this.filters=e.filters.slice(),this)}clone(e){return new this.constructor(this.listener).copy(this,e)}},Er=new E,og=new fn,ty=new E,wr=new E,bu=class extends tc{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(Er,og,ty),wr.set(0,0,1).applyQuaternion(og);let t=this.panner;if(t.positionX){let n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(Er.x,n),t.positionY.linearRampToValueAtTime(Er.y,n),t.positionZ.linearRampToValueAtTime(Er.z,n),t.orientationX.linearRampToValueAtTime(wr.x,n),t.orientationY.linearRampToValueAtTime(wr.y,n),t.orientationZ.linearRampToValueAtTime(wr.z,n)}else t.setPosition(Er.x,Er.y,Er.z),t.setOrientation(wr.x,wr.y,wr.z)}},Eu=class{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0,t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}},nc=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,r=e*i+i,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){fn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){let o=this._workIndex*r;fn.multiplyQuaternionsFlat(e,o,e,t,e,n),fn.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){let o=1-i;for(let a=0;a!==r;++a){let l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*i}}},yp="\\[\\]\\.:\\/",ny=new RegExp("["+yp+"]","g"),vp="[^"+yp+"]",iy="[^"+yp.replace("\\.","")+"]",sy=/((?:WC+[\/:])*)/.source.replace("WC",vp),ry=/(WCOD+)?/.source.replace("WCOD",iy),oy=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",vp),ay=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",vp),ly=new RegExp("^"+sy+ry+oy+ay+"$"),cy=["material","materials","bones","map"],Cf=class{constructor(e,t,n){let i=n||Wt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Wt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ny,"")}static parseTrackName(e){let t=ly.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);cy.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Pe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){$e("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){$e("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){$e("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){$e("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){$e("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){$e("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){$e("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[i];if(o===void 0){let c=t.nodeName;$e("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){$e("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){$e("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Wt.Composite=Cf;Wt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Wt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Wt.prototype.GetterByBindingType=[Wt.prototype._getValue_direct,Wt.prototype._getValue_array,Wt.prototype._getValue_arrayElement,Wt.prototype._getValue_toArray];Wt.prototype.SetterByBindingTypeAndVersioning=[[Wt.prototype._setValue_direct,Wt.prototype._setValue_direct_setNeedsUpdate,Wt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Wt.prototype._setValue_array,Wt.prototype._setValue_array_setNeedsUpdate,Wt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Wt.prototype._setValue_arrayElement,Wt.prototype._setValue_arrayElement_setNeedsUpdate,Wt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Wt.prototype._setValue_fromArray,Wt.prototype._setValue_fromArray_setNeedsUpdate,Wt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var wu=class{constructor(){this.isAnimationObjectGroup=!0,this.uuid=pi(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;let e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};let t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){let e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,r=this._bindings,o=r.length,a,l=e.length,c=this.nCachedObjects_;for(let h=0,d=arguments.length;h!==d;++h){let u=arguments[h],f=u.uuid,p=t[f];if(p===void 0){p=l++,t[f]=p,e.push(u);for(let _=0,g=o;_!==g;++_)r[_].push(new Wt(u,n[_],i[_]))}else if(p<c){a=e[p];let _=--c,g=e[_];t[g.uuid]=p,e[p]=g,t[f]=_,e[_]=u;for(let m=0,S=o;m!==S;++m){let b=r[m],x=b[_],A=b[p];b[p]=x,A===void 0&&(A=new Wt(u,n[m],i[m])),b[_]=A}}else e[p]!==a&&$e("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){let e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_;for(let o=0,a=arguments.length;o!==a;++o){let l=arguments[o],c=l.uuid,h=t[c];if(h!==void 0&&h>=r){let d=r++,u=e[d];t[u.uuid]=h,e[h]=u,t[c]=d,e[d]=l;for(let f=0,p=i;f!==p;++f){let _=n[f],g=_[d],m=_[h];_[h]=g,_[d]=m}}}this.nCachedObjects_=r}uncache(){let e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_,o=e.length;for(let a=0,l=arguments.length;a!==l;++a){let c=arguments[a],h=c.uuid,d=t[h];if(d!==void 0)if(delete t[h],d<r){let u=--r,f=e[u],p=--o,_=e[p];d!==u&&(t[f.uuid]=d),e[d]=f,u!==p&&(t[_.uuid]=u),e[u]=_,e.pop();for(let g=0,m=i;g!==m;++g){let S=n[g],b=S[u],x=S[p];S[d]=b,S[u]=x,S.pop()}}else{let u=--o,f=e[u];d!==u&&(t[f.uuid]=d),e[d]=f,e.pop();for(let p=0,_=i;p!==_;++p){let g=n[p];g[d]=g[u],g.pop()}}}this.nCachedObjects_=r}subscribe_(e,t){let n=this._bindingsIndicesByPath,i=n[e],r=this._bindings;if(i!==void 0)return r[i];let o=this._paths,a=this._parsedPaths,l=this._objects,c=l.length,h=this.nCachedObjects_,d=new Array(c);i=r.length,n[e]=i,o.push(e),a.push(t),r.push(d);for(let u=h,f=l.length;u!==f;++u){let p=l[u];d[u]=new Wt(p,e,t)}return d}unsubscribe_(e){let t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){let i=this._paths,r=this._parsedPaths,o=this._bindings,a=o.length-1,l=o[a],c=i[a];t[c]=n,o[n]=l,o.pop(),r[n]=r[a],r.pop(),i[n]=i[a],i.pop()}}},ic=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let r=t.tracks,o=r.length,a=new Array(o),l={endingStart:Gs,endingEnd:Gs};for(let c=0;c!==o;++c){let h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=ip,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,r=i.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case fd:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case kc:default:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,r=this._loopCount,o=n===sp;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===np){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){let a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this._loopCount=r,this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=Ws,i.endingEnd=Ws):(e?i.endingStart=this.zeroSlopeAtStart?Ws:Gs:i.endingStart=Uo,t?i.endingEnd=this.zeroSlopeAtEnd?Ws:Gs:i.endingEnd=Uo)}_scheduleFading(e,t,n){let i=this._mixer,r=i.time,o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}},hy=new Float32Array(1),Tu=class extends li{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let d=0;d!==r;++d){let u=i[d],f=u.name,p=h[f];if(p!==void 0)++p.referenceCount,o[d]=p;else{if(p=o[d],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}let _=t&&t._propertyBindings[d].binding.parsedPath;p=new nc(Wt.create(n,f,_),u.ValueTypeName,u.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),o[d]=p}a[d].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let d=a.actionByRoot,u=(e._localRoot||this._root).uuid;delete d[u],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,r=this._bindings,o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new na(new Float32Array(2),new Float32Array(2),1,hy),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let i=t||this._root,r=i.uuid,o=typeof e=="string"?nr.findByName(i,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=kc),l!==void 0){let d=l.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let h=new ic(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(e,t){let n=t||this._root,i=n.uuid,r=typeof e=="string"?nr.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let h=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=h,t[h]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}},Au=class extends Vo{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isRenderTarget3D=!0,this.depth=n;for(let r=0;r<this.textures.length;r++){let o=new Pr(null,e,t,n);o.isRenderTargetTexture=!0,o.renderTarget=this,this.textures[r]=o}this._setTextureOptions(i)}},Ru=class s{constructor(e){this.value=e}clone(){return new s(this.value.clone===void 0?this.value:this.value.clone())}},uy=0,Cu=class extends li{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:uy++}),this.name="",this.usage=Xc,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){let t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(e){this.name=e.name,this.usage=e.usage;let t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){let r=Array.isArray(t[n])?t[n]:[t[n]];for(let o=0;o<r.length;o++)this.uniforms.push(r[o].clone())}return this}clone(){return new this.constructor().copy(this)}},Rs=class extends Dr{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}},Pu=class{constructor(e,t,n,i,r,o=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=r,this.normalized=o,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}},ag=new ht,ca=class{constructor(e,t,n=0,i=1/0){this.ray=new Bi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Ir,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):$e("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ag.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ag),this}intersectObject(e,t=!0,n=[]){return Pf(e,this,n,t),n.sort(lg),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Pf(e[i],this,n,t);return n.sort(lg),n}};function lg(s,e){return s.distance-e.distance}function Pf(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)Pf(r[o],e,t,!0)}}var Iu=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Pe("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}},Jr=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ut(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ut(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},Lu=class{constructor(e=1,t=0,n=0){this.radius=e,this.theta=t,this.y=n}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}},Du=class s{static{s.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}},cg=new ae,sc=class{constructor(e=new ae(1/0,1/0),t=new ae(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=cg.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,cg).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},hg=new E,Vh=new E,Co=new E,Po=new E,gf=new E,dy=new E,fy=new E,ha=class{constructor(e=new E,t=new E){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){hg.subVectors(e,this.start),Vh.subVectors(this.end,this.start);let n=Vh.dot(Vh);if(n===0)return 0;let r=Vh.dot(hg)/n;return t&&(r=ut(r,0,1)),r}closestPointToPoint(e,t,n){let i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=dy,n=fy){let i=10000000000000001e-32,r,o,a=this.start,l=e.start,c=this.end,h=e.end;Co.subVectors(c,a),Po.subVectors(h,l),gf.subVectors(a,l);let d=Co.dot(Co),u=Po.dot(Po),f=Po.dot(gf);if(d<=i&&u<=i)return t.copy(a),n.copy(l),t.sub(n),t.dot(t);if(d<=i)r=0,o=f/u,o=ut(o,0,1);else{let p=Co.dot(gf);if(u<=i)o=0,r=ut(-p/d,0,1);else{let _=Co.dot(Po),g=d*u-_*_;g!==0?r=ut((_*f-p*u)/g,0,1):r=0,o=(_*r+f)/u,o<0?(o=0,r=ut(-p/d,0,1)):o>1&&(o=1,r=ut((_-p)/d,0,1))}}return t.copy(a).addScaledVector(Co,r),n.copy(l).addScaledVector(Po,o),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}},ug=new E,Nu=class extends Dt{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";let n=new gt,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,l=32;o<l;o++,a++){let c=o/l*Math.PI*2,h=a/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new Ve(i,3));let r=new xn({fog:!1,toneMapped:!1});this.cone=new ei(n,r),this.add(this.cone),this.update()}dispose(){super.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorldNeedsUpdate=!0;let e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),ug.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(ug),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}},ks=new E,Hh=new ht,_f=new ht,Uu=class extends ei{constructor(e){let t=b0(e),n=new gt,i=[],r=[];for(let c=0;c<t.length;c++){let h=t[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(0,0,0),r.push(0,0,0))}n.setAttribute("position",new Ve(i,3)),n.setAttribute("color",new Ve(r,3));let o=new xn({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,o),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1;let a=new Be(255),l=new Be(65280);this.setColors(a,l)}updateMatrixWorld(e){let t=this.bones,n=this.geometry,i=n.getAttribute("position");_f.copy(this.root.matrixWorld).invert();for(let r=0,o=0;r<t.length;r++){let a=t[r];a.parent&&a.parent.isBone&&(Hh.multiplyMatrices(_f,a.matrixWorld),ks.setFromMatrixPosition(Hh),i.setXYZ(o,ks.x,ks.y,ks.z),Hh.multiplyMatrices(_f,a.parent.matrixWorld),ks.setFromMatrixPosition(Hh),i.setXYZ(o+1,ks.x,ks.y,ks.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}setColors(e,t){let i=this.geometry.getAttribute("color");for(let r=0;r<i.count;r+=2)i.setXYZ(r,e.r,e.g,e.b),i.setXYZ(r+1,t.r,t.g,t.b);return i.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function b0(s){let e=[];s.isBone===!0&&e.push(s);for(let t=0;t<s.children.length;t++)e.push(...b0(s.children[t]));return e}var Fu=class extends Ot{constructor(e,t,n){let i=new mi(t,4,2),r=new jt({wireframe:!0,fog:!1,toneMapped:!1});super(i,r),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}},py=new E,dg=new Be,fg=new Be,Ou=class extends Dt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";let i=new jo(t);i.rotateY(Math.PI*.5),this.material=new jt({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);let r=i.getAttribute("position"),o=new Float32Array(r.count*3);i.setAttribute("color",new Xt(o,3)),this.add(new Ot(i,this.material)),this.update()}dispose(){super.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){let e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{let t=e.geometry.getAttribute("color");dg.copy(this.light.color),fg.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){let r=n<i/2?dg:fg;t.setXYZ(n,r.r,r.g,r.b)}t.needsUpdate=!0}this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),e.lookAt(py.setFromMatrixPosition(this.light.matrixWorld).negate())}},Bu=class extends ei{constructor(e=10,t=10,n=4473924,i=8947848){n=new Be(n),i=new Be(i);let r=t/2,o=e/t,a=e/2,l=[],c=[];for(let u=0,f=0,p=-a;u<=t;u++,p+=o){l.push(-a,0,p,a,0,p),l.push(p,0,-a,p,0,a);let _=u===r?n:i;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}let h=new gt;h.setAttribute("position",new Ve(l,3)),h.setAttribute("color",new Ve(c,3));let d=new xn({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},zu=class extends ei{constructor(e=10,t=16,n=8,i=64,r=4473924,o=8947848){r=new Be(r),o=new Be(o);let a=[],l=[];if(t>1)for(let d=0;d<t;d++){let u=d/t*(Math.PI*2),f=Math.sin(u)*e,p=Math.cos(u)*e;a.push(0,0,0),a.push(f,0,p);let _=d&1?r:o;l.push(_.r,_.g,_.b),l.push(_.r,_.g,_.b)}for(let d=0;d<n;d++){let u=d&1?r:o,f=e-e/n*d;for(let p=0;p<i;p++){let _=p/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f;a.push(g,0,m),l.push(u.r,u.g,u.b),_=(p+1)/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f,a.push(g,0,m),l.push(u.r,u.g,u.b)}}let c=new gt;c.setAttribute("position",new Ve(a,3)),c.setAttribute("color",new Ve(l,3));let h=new xn({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},pg=new E,kh=new E,mg=new E,Vu=class extends Dt{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new gt;i.setAttribute("position",new Ve([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));let r=new xn({fog:!1,toneMapped:!1});this.lightPlane=new zi(i,r),this.add(this.lightPlane),i=new gt,i.setAttribute("position",new Ve([0,0,0,0,0,1],3)),this.targetLine=new zi(i,r),this.add(this.targetLine),this.update()}dispose(){super.dispose(),this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),pg.setFromMatrixPosition(this.light.matrixWorld),kh.setFromMatrixPosition(this.light.target.matrixWorld),mg.subVectors(kh,pg),this.lightPlane.lookAt(kh),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(kh),this.targetLine.scale.z=mg.length()}},Gh=new E,ln=new Yr,Hu=class extends ei{constructor(e){let t=new gt,n=new xn({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],r=[],o={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(p,_){l(p),l(_)}function l(p){i.push(0,0,0),r.push(0,0,0),o[p]===void 0&&(o[p]=[]),o[p].push(i.length/3-1)}t.setAttribute("position",new Ve(i,3)),t.setAttribute("color",new Ve(r,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();let c=new Be(16755200),h=new Be(16711680),d=new Be(43775),u=new Be(16777215),f=new Be(3355443);this.setColors(c,h,d,u,f)}setColors(e,t,n,i,r){let a=this.geometry.getAttribute("color");return a.setXYZ(0,e.r,e.g,e.b),a.setXYZ(1,e.r,e.g,e.b),a.setXYZ(2,e.r,e.g,e.b),a.setXYZ(3,e.r,e.g,e.b),a.setXYZ(4,e.r,e.g,e.b),a.setXYZ(5,e.r,e.g,e.b),a.setXYZ(6,e.r,e.g,e.b),a.setXYZ(7,e.r,e.g,e.b),a.setXYZ(8,e.r,e.g,e.b),a.setXYZ(9,e.r,e.g,e.b),a.setXYZ(10,e.r,e.g,e.b),a.setXYZ(11,e.r,e.g,e.b),a.setXYZ(12,e.r,e.g,e.b),a.setXYZ(13,e.r,e.g,e.b),a.setXYZ(14,e.r,e.g,e.b),a.setXYZ(15,e.r,e.g,e.b),a.setXYZ(16,e.r,e.g,e.b),a.setXYZ(17,e.r,e.g,e.b),a.setXYZ(18,e.r,e.g,e.b),a.setXYZ(19,e.r,e.g,e.b),a.setXYZ(20,e.r,e.g,e.b),a.setXYZ(21,e.r,e.g,e.b),a.setXYZ(22,e.r,e.g,e.b),a.setXYZ(23,e.r,e.g,e.b),a.setXYZ(24,t.r,t.g,t.b),a.setXYZ(25,t.r,t.g,t.b),a.setXYZ(26,t.r,t.g,t.b),a.setXYZ(27,t.r,t.g,t.b),a.setXYZ(28,t.r,t.g,t.b),a.setXYZ(29,t.r,t.g,t.b),a.setXYZ(30,t.r,t.g,t.b),a.setXYZ(31,t.r,t.g,t.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,i.r,i.g,i.b),a.setXYZ(39,i.r,i.g,i.b),a.setXYZ(40,r.r,r.g,r.b),a.setXYZ(41,r.r,r.g,r.b),a.setXYZ(42,r.r,r.g,r.b),a.setXYZ(43,r.r,r.g,r.b),a.setXYZ(44,r.r,r.g,r.b),a.setXYZ(45,r.r,r.g,r.b),a.setXYZ(46,r.r,r.g,r.b),a.setXYZ(47,r.r,r.g,r.b),a.setXYZ(48,r.r,r.g,r.b),a.setXYZ(49,r.r,r.g,r.b),a.needsUpdate=!0,this}update(){let e=this.geometry,t=this.pointMap,n=1,i=1,r,o;if(ln.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)r=1,o=0;else if(this.camera.coordinateSystem===ai)r=-1,o=1;else if(this.camera.coordinateSystem===Ys)r=0,o=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);dn("c",t,e,ln,0,0,r),dn("t",t,e,ln,0,0,o),dn("n1",t,e,ln,-n,-i,r),dn("n2",t,e,ln,n,-i,r),dn("n3",t,e,ln,-n,i,r),dn("n4",t,e,ln,n,i,r),dn("f1",t,e,ln,-n,-i,o),dn("f2",t,e,ln,n,-i,o),dn("f3",t,e,ln,-n,i,o),dn("f4",t,e,ln,n,i,o),dn("u1",t,e,ln,n*.7,i*1.1,r),dn("u2",t,e,ln,-n*.7,i*1.1,r),dn("u3",t,e,ln,0,i*2,r),dn("cf1",t,e,ln,-n,0,o),dn("cf2",t,e,ln,n,0,o),dn("cf3",t,e,ln,0,-i,o),dn("cf4",t,e,ln,0,i,o),dn("cn1",t,e,ln,-n,0,r),dn("cn2",t,e,ln,n,0,r),dn("cn3",t,e,ln,0,-i,r),dn("cn4",t,e,ln,0,i,r),e.getAttribute("position").needsUpdate=!0}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function dn(s,e,t,n,i,r,o){Gh.set(i,r,o).unproject(n);let a=e[s];if(a!==void 0){let l=t.getAttribute("position");for(let c=0,h=a.length;c<h;c++)l.setXYZ(a[c],Gh.x,Gh.y,Gh.z)}}var Wh=new tn,ku=class extends ei{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),r=new gt;r.setIndex(new Xt(n,1)),r.setAttribute("position",new Xt(i,3)),super(r,new xn({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&Wh.setFromObject(this.object),Wh.isEmpty())return;let e=Wh.min,t=Wh.max,n=this.geometry.attributes.position,i=n.array;i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=e.x,i[4]=t.y,i[5]=t.z,i[6]=e.x,i[7]=e.y,i[8]=t.z,i[9]=t.x,i[10]=e.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=e.z,i[15]=e.x,i[16]=t.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=t.x,i[22]=e.y,i[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Gu=class extends ei{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new gt;r.setIndex(new Xt(n,1)),r.setAttribute("position",new Ve(i,3)),super(r,new xn({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){let t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Wu=class extends zi{constructor(e,t=1,n=16776960){let i=n,r=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new gt;o.setAttribute("position",new Ve(r,3)),o.computeBoundingSphere(),super(o,new xn({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;let a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new gt;l.setAttribute("position",new Ve(a,3)),l.computeBoundingSphere(),this.add(new Ot(l,new jt({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}},gg=new E,Xh,xf,Xu=class extends Dt{constructor(e=new E(0,0,1),t=new E(0,0,0),n=1,i=16776960,r=n*.2,o=r*.2){super(),this.type="ArrowHelper",Xh===void 0&&(Xh=new gt,Xh.setAttribute("position",new Ve([0,0,0,0,1,0],3)),xf=new Yo(.5,1,5,1),xf.translate(0,-.5,0)),this.position.copy(t),this.line=new zi(Xh,new xn({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Ot(xf,new jt({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{gg.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(gg,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},Yu=class extends ei{constructor(e=1){let t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new gt;i.setAttribute("position",new Ve(t,3)),i.setAttribute("color",new Ve(n,3));let r=new xn({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,t,n){let i=new Be,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(t),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},qu=class{constructor(){this.type="ShapePath",this.color=new Be,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(e,t){return this.currentPath=new er,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,r,o){return this.currentPath.bezierCurveTo(e,t,n,i,r,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(){function e(l,c){let h=!1,d=c.length;for(let u=0,f=d-1;u<d;f=u++){let p=c[u],_=c[f];p.y>l.y!=_.y>l.y&&l.x<(_.x-p.x)*(l.y-p.y)/(_.y-p.y)+p.x&&(h=!h)}return h}function t(l,c){let h=c.getCenter(new ae);if(e(h,l))return h;let d=h.y,u=[],f=l.length;for(let p=0;p<f;p++){let _=l[p],g=l[(p+1)%f];if(_.y>d!=g.y>d){let m=_.x+(d-_.y)*(g.x-_.x)/(g.y-_.y);u.push(m)}}return u.length>1&&(u.sort((p,_)=>p-_),h.x=(u[0]+u[1])/2),h}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(Pe('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");let i=n==="nonzero"?(l=>l!==0):(l=>(l&1)!==0),r=[];for(let l of this.subPaths){let c=l.getPoints();if(c.length<3)continue;let h=Mi.area(c);if(h===0)continue;let d=new sc;for(let u=0;u<c.length;u++)d.expandByPoint(c[u]);r.push({subPath:l,points:c,boundingBox:d,interiorPoint:t(c,d),absArea:Math.abs(h),winding:h<0?-1:1,container:null,exclude:!1,role:null})}r.sort((l,c)=>c.absArea-l.absArea);for(let l=0;l<r.length;l++){let c=r[l],h=0;for(let d=l-1;d>=0;d--){let u=r[d];if(u.boundingBox.containsBox(c.boundingBox)&&e(c.interiorPoint,u.points)){c.container=u.exclude?u.container:u,h=u.winding,c.winding+=h;break}}i(c.winding)===i(h)&&(c.exclude=!0)}for(let l of r)l.exclude||(l.role=l.container===null||l.container.role==="hole"?"outer":"hole");let o=[],a=new Map;for(let l of r){if(l.exclude||l.role!=="outer")continue;let c=new Ei;c.curves=l.subPath.curves,o.push(c),a.set(l,c)}for(let l of r){if(l.exclude||l.role!=="hole")continue;let c=a.get(l.container);if(!c)continue;let h=new er;h.curves=l.subPath.curves,c.holes.push(h)}return o}},ua=class extends li{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function my(s,e){let t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2):(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0),s}function gy(s,e){let t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0):(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2),s}function _y(s){return s.repeat.x=1,s.repeat.y=1,s.offset.x=0,s.offset.y=0,s}function md(s,e,t,n){let i=xy(n);switch(t){case ud:return s*e;case cc:return s*e/i.components*i.byteLength;case ya:return s*e/i.components*i.byteLength;case Ns:return s*e*2/i.components*i.byteLength;case hc:return s*e*2/i.components*i.byteLength;case dd:return s*e*3/i.components*i.byteLength;case kn:return s*e*4/i.components*i.byteLength;case uc:return s*e*4/i.components*i.byteLength;case va:case Sa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Ma:case ba:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case fc:case mc:return Math.max(s,16)*Math.max(e,8)/4;case dc:case pc:return Math.max(s,8)*Math.max(e,8)/2;case gc:case _c:case yc:case vc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case xc:case Ea:case Sc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Mc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case bc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Ec:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case wc:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Tc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Ac:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Rc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Cc:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Pc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Ic:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Lc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Dc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Nc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Uc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Fc:case Oc:case Bc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case zc:case Vc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case wa:case Hc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function xy(s){switch(s){case ni:case ad:return{byteLength:1,components:1};case eo:case ld:case Ri:return{byteLength:2,components:1};case ac:case lc:return{byteLength:2,components:4};case _i:case oc:case Hn:return{byteLength:4,components:1};case cd:case hd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}var Zu=class{static contain(e,t){return my(e,t)}static cover(e,t){return gy(e,t)}static fill(e){return _y(e)}static getByteLength(e,t,n,i){return md(e,t,n,i)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function X0(){let s=null,e=!1,t=null,n=null;function i(r,o){n=s.requestAnimationFrame(i),t(r,o)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function yy(s){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(s.bindBuffer(c,a),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){let p=d[u],_=d[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){let _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var vy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Sy=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,My=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,by=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ey=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ty=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ay=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ry=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Cy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Py=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Iy=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ly=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Dy=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ny=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Uy=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Fy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Oy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,By=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,zy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Vy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Hy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ky=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Gy=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Wy=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Xy=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Yy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,qy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ky="gl_FragColor = linearToOutputTexel( gl_FragColor );",$y=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,jy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Qy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,ev=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,tv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,iv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ov=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,av=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,cv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,uv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,dv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,fv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,pv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,mv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,_v=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,xv=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,yv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Sv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Mv=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,bv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ev=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Tv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Av=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Rv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Cv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Pv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Iv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Lv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Uv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Ov=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,zv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Hv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Gv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Wv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Xv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Jv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Kv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$v=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Qv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,eS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,iS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,sS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,rS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,oS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,aS=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,lS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cS=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fS=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,pS=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,mS=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,gS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,_S=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,yS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,vS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,SS=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,MS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bS=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ES=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,TS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,AS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,RS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,CS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,PS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,IS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,LS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,DS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,NS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,US=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,FS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,OS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,BS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,zS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,VS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,HS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,kS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,WS=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,XS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,YS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ZS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,JS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,KS=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$S=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,QS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,bt={alphahash_fragment:vy,alphahash_pars_fragment:Sy,alphamap_fragment:My,alphamap_pars_fragment:by,alphatest_fragment:Ey,alphatest_pars_fragment:wy,aomap_fragment:Ty,aomap_pars_fragment:Ay,batching_pars_vertex:Ry,batching_vertex:Cy,begin_vertex:Py,beginnormal_vertex:Iy,bsdfs:Ly,iridescence_fragment:Dy,bumpmap_pars_fragment:Ny,clipping_planes_fragment:Uy,clipping_planes_pars_fragment:Fy,clipping_planes_pars_vertex:Oy,clipping_planes_vertex:By,color_fragment:zy,color_pars_fragment:Vy,color_pars_vertex:Hy,color_vertex:ky,common:Gy,cube_uv_reflection_fragment:Wy,defaultnormal_vertex:Xy,displacementmap_pars_vertex:Yy,displacementmap_vertex:qy,emissivemap_fragment:Zy,emissivemap_pars_fragment:Jy,colorspace_fragment:Ky,colorspace_pars_fragment:$y,envmap_fragment:jy,envmap_common_pars_fragment:Qy,envmap_pars_fragment:ev,envmap_pars_vertex:tv,envmap_physical_pars_fragment:dv,envmap_vertex:nv,fog_vertex:iv,fog_pars_vertex:sv,fog_fragment:rv,fog_pars_fragment:ov,gradientmap_pars_fragment:av,lightmap_pars_fragment:lv,lights_lambert_fragment:cv,lights_lambert_pars_fragment:hv,lights_pars_begin:uv,lights_toon_fragment:fv,lights_toon_pars_fragment:pv,lights_phong_fragment:mv,lights_phong_pars_fragment:gv,lights_physical_fragment:_v,lights_physical_pars_fragment:xv,lights_fragment_begin:yv,lights_fragment_maps:vv,lights_fragment_end:Sv,lightprobes_pars_fragment:Mv,logdepthbuf_fragment:bv,logdepthbuf_pars_fragment:Ev,logdepthbuf_pars_vertex:wv,logdepthbuf_vertex:Tv,map_fragment:Av,map_pars_fragment:Rv,map_particle_fragment:Cv,map_particle_pars_fragment:Pv,metalnessmap_fragment:Iv,metalnessmap_pars_fragment:Lv,morphinstance_vertex:Dv,morphcolor_vertex:Nv,morphnormal_vertex:Uv,morphtarget_pars_vertex:Fv,morphtarget_vertex:Ov,normal_fragment_begin:Bv,normal_fragment_maps:zv,normal_pars_fragment:Vv,normal_pars_vertex:Hv,normal_vertex:kv,normalmap_pars_fragment:Gv,clearcoat_normal_fragment_begin:Wv,clearcoat_normal_fragment_maps:Xv,clearcoat_pars_fragment:Yv,iridescence_pars_fragment:qv,opaque_fragment:Zv,packing:Jv,premultiplied_alpha_fragment:Kv,project_vertex:$v,dithering_fragment:jv,dithering_pars_fragment:Qv,roughnessmap_fragment:eS,roughnessmap_pars_fragment:tS,shadowmap_pars_fragment:nS,shadowmap_pars_vertex:iS,shadowmap_vertex:sS,shadowmask_pars_fragment:rS,skinbase_vertex:oS,skinning_pars_vertex:aS,skinning_vertex:lS,skinnormal_vertex:cS,specularmap_fragment:hS,specularmap_pars_fragment:uS,tonemapping_fragment:dS,tonemapping_pars_fragment:fS,transmission_fragment:pS,transmission_pars_fragment:mS,uv_pars_fragment:gS,uv_pars_vertex:_S,uv_vertex:xS,worldpos_vertex:yS,background_vert:vS,background_frag:SS,backgroundCube_vert:MS,backgroundCube_frag:bS,cube_vert:ES,cube_frag:wS,depth_vert:TS,depth_frag:AS,distance_vert:RS,distance_frag:CS,equirect_vert:PS,equirect_frag:IS,linedashed_vert:LS,linedashed_frag:DS,meshbasic_vert:NS,meshbasic_frag:US,meshlambert_vert:FS,meshlambert_frag:OS,meshmatcap_vert:BS,meshmatcap_frag:zS,meshnormal_vert:VS,meshnormal_frag:HS,meshphong_vert:kS,meshphong_frag:GS,meshphysical_vert:WS,meshphysical_frag:XS,meshtoon_vert:YS,meshtoon_frag:qS,points_vert:ZS,points_frag:JS,shadow_vert:KS,shadow_frag:$S,sprite_vert:jS,sprite_frag:QS},Re={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pt}},envmap:{envMap:{value:null},envMapRotation:{value:new pt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pt},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new E},probesMax:{value:new E},probesResolution:{value:new E}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0},uvTransform:{value:new pt}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pt},alphaMap:{value:null},alphaMapTransform:{value:new pt},alphaTest:{value:0}}},Yn={basic:{uniforms:Xn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:bt.meshbasic_vert,fragmentShader:bt.meshbasic_frag},lambert:{uniforms:Xn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Be(0)},envMapIntensity:{value:1}}]),vertexShader:bt.meshlambert_vert,fragmentShader:bt.meshlambert_frag},phong:{uniforms:Xn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:bt.meshphong_vert,fragmentShader:bt.meshphong_frag},standard:{uniforms:Xn([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag},toon:{uniforms:Xn([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new Be(0)}}]),vertexShader:bt.meshtoon_vert,fragmentShader:bt.meshtoon_frag},matcap:{uniforms:Xn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:bt.meshmatcap_vert,fragmentShader:bt.meshmatcap_frag},points:{uniforms:Xn([Re.points,Re.fog]),vertexShader:bt.points_vert,fragmentShader:bt.points_frag},dashed:{uniforms:Xn([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:bt.linedashed_vert,fragmentShader:bt.linedashed_frag},depth:{uniforms:Xn([Re.common,Re.displacementmap]),vertexShader:bt.depth_vert,fragmentShader:bt.depth_frag},normal:{uniforms:Xn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:bt.meshnormal_vert,fragmentShader:bt.meshnormal_frag},sprite:{uniforms:Xn([Re.sprite,Re.fog]),vertexShader:bt.sprite_vert,fragmentShader:bt.sprite_frag},background:{uniforms:{uvTransform:{value:new pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:bt.background_vert,fragmentShader:bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pt}},vertexShader:bt.backgroundCube_vert,fragmentShader:bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:bt.cube_vert,fragmentShader:bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:bt.equirect_vert,fragmentShader:bt.equirect_frag},distance:{uniforms:Xn([Re.common,Re.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:bt.distance_vert,fragmentShader:bt.distance_frag},shadow:{uniforms:Xn([Re.lights,Re.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:bt.shadow_vert,fragmentShader:bt.shadow_frag}};Yn.physical={uniforms:Xn([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pt},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pt},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pt},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pt},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pt},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pt}}]),vertexShader:bt.meshphysical_vert,fragmentShader:bt.meshphysical_frag};var gd={r:0,b:0,g:0},eM=new ht,Y0=new pt;Y0.set(-1,0,0,0,1,0,0,0,1);function tM(s,e,t,n,i,r){let o=new Be(0),a=i===!0?0:1,l,c,h=null,d=0,u=null;function f(S){let b=S.isScene===!0?S.background:null;if(b&&b.isTexture){let x=S.backgroundBlurriness>0;b=e.get(b,x)}return b}function p(S){let b=!1,x=f(S);x===null?g(o,a):x&&x.isColor&&(g(x,1),b=!0);let A=s.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(S,b){let x=f(b);x&&(x.isCubeTexture||x.mapping===jr)?(c===void 0&&(c=new Ot(new In(1,1,1),new Ln({name:"BackgroundCubeMaterial",uniforms:no(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(eM.makeRotationFromEuler(b.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Y0),c.material.toneMapped=At.getTransfer(x.colorSpace)!==Ht,(h!==x||d!==x.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=x,d=x.version,u=s.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Ot(new wi(2,2),new Ln({name:"BackgroundMaterial",uniforms:no(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:Is,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=At.getTransfer(x.colorSpace)!==Ht,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||d!==x.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=x,d=x.version,u=s.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function g(S,b){S.getRGB(gd,_p(s)),t.buffers.color.setClear(gd.r,gd.g,gd.b,b,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(S,b=1){o.set(S),a=b,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(S){a=S,g(o,a)},render:p,addToRenderList:_,dispose:m}}function nM(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,o=!1;function a(O,k,Y,N,B){let V=!1,X=d(O,N,Y,k);r!==X&&(r=X,c(r.object)),V=f(O,N,Y,B),V&&p(O,N,Y,B),B!==null&&e.update(B,s.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,x(O,k,Y,N),B!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return s.createVertexArray()}function c(O){return s.bindVertexArray(O)}function h(O){return s.deleteVertexArray(O)}function d(O,k,Y,N){let B=N.wireframe===!0,V=n[k.id];V===void 0&&(V={},n[k.id]=V);let X=O.isInstancedMesh===!0?O.id:0,Q=V[X];Q===void 0&&(Q={},V[X]=Q);let q=Q[Y.id];q===void 0&&(q={},Q[Y.id]=q);let K=q[B];return K===void 0&&(K=u(l()),q[B]=K),K}function u(O){let k=[],Y=[],N=[];for(let B=0;B<t;B++)k[B]=0,Y[B]=0,N[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:Y,attributeDivisors:N,object:O,attributes:{},index:null}}function f(O,k,Y,N){let B=r.attributes,V=k.attributes,X=0,Q=Y.getAttributes();for(let q in Q)if(Q[q].location>=0){let re=B[q],ke=V[q];if(ke===void 0&&(q==="instanceMatrix"&&O.instanceMatrix&&(ke=O.instanceMatrix),q==="instanceColor"&&O.instanceColor&&(ke=O.instanceColor)),re===void 0||re.attribute!==ke||ke&&re.data!==ke.data)return!0;X++}return r.attributesNum!==X||r.index!==N}function p(O,k,Y,N){let B={},V=k.attributes,X=0,Q=Y.getAttributes();for(let q in Q)if(Q[q].location>=0){let re=V[q];re===void 0&&(q==="instanceMatrix"&&O.instanceMatrix&&(re=O.instanceMatrix),q==="instanceColor"&&O.instanceColor&&(re=O.instanceColor));let ke={};ke.attribute=re,re&&re.data&&(ke.data=re.data),B[q]=ke,X++}r.attributes=B,r.attributesNum=X,r.index=N}function _(){let O=r.newAttributes;for(let k=0,Y=O.length;k<Y;k++)O[k]=0}function g(O){m(O,0)}function m(O,k){let Y=r.newAttributes,N=r.enabledAttributes,B=r.attributeDivisors;Y[O]=1,N[O]===0&&(s.enableVertexAttribArray(O),N[O]=1),B[O]!==k&&(s.vertexAttribDivisor(O,k),B[O]=k)}function S(){let O=r.newAttributes,k=r.enabledAttributes;for(let Y=0,N=k.length;Y<N;Y++)k[Y]!==O[Y]&&(s.disableVertexAttribArray(Y),k[Y]=0)}function b(O,k,Y,N,B,V,X){X===!0?s.vertexAttribIPointer(O,k,Y,B,V):s.vertexAttribPointer(O,k,Y,N,B,V)}function x(O,k,Y,N){_();let B=N.attributes,V=Y.getAttributes(),X=k.defaultAttributeValues;for(let Q in V){let q=V[Q];if(q.location>=0){let K=B[Q];if(K===void 0&&(Q==="instanceMatrix"&&O.instanceMatrix&&(K=O.instanceMatrix),Q==="instanceColor"&&O.instanceColor&&(K=O.instanceColor)),K!==void 0){let re=K.normalized,ke=K.itemSize,He=e.get(K);if(He===void 0)continue;let wt=He.buffer,St=He.type,et=He.bytesPerElement,ee=St===s.INT||St===s.UNSIGNED_INT||K.gpuType===oc;if(K.isInterleavedBufferAttribute){let se=K.data,me=se.stride,nt=K.offset;if(se.isInstancedInterleavedBuffer){for(let Ae=0;Ae<q.locationSize;Ae++)m(q.location+Ae,se.meshPerAttribute);O.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ae=0;Ae<q.locationSize;Ae++)g(q.location+Ae);s.bindBuffer(s.ARRAY_BUFFER,wt);for(let Ae=0;Ae<q.locationSize;Ae++)b(q.location+Ae,ke/q.locationSize,St,re,me*et,(nt+ke/q.locationSize*Ae)*et,ee)}else{if(K.isInstancedBufferAttribute){for(let se=0;se<q.locationSize;se++)m(q.location+se,K.meshPerAttribute);O.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let se=0;se<q.locationSize;se++)g(q.location+se);s.bindBuffer(s.ARRAY_BUFFER,wt);for(let se=0;se<q.locationSize;se++)b(q.location+se,ke/q.locationSize,St,re,ke*et,ke/q.locationSize*se*et,ee)}}else if(X!==void 0){let re=X[Q];if(re!==void 0)switch(re.length){case 2:s.vertexAttrib2fv(q.location,re);break;case 3:s.vertexAttrib3fv(q.location,re);break;case 4:s.vertexAttrib4fv(q.location,re);break;default:s.vertexAttrib1fv(q.location,re)}}}}S()}function A(){R();for(let O in n){let k=n[O];for(let Y in k){let N=k[Y];for(let B in N){let V=N[B];for(let X in V)h(V[X].object),delete V[X];delete N[B]}}delete n[O]}}function T(O){if(n[O.id]===void 0)return;let k=n[O.id];for(let Y in k){let N=k[Y];for(let B in N){let V=N[B];for(let X in V)h(V[X].object),delete V[X];delete N[B]}}delete n[O.id]}function D(O){for(let k in n){let Y=n[k];for(let N in Y){let B=Y[N];if(B[O.id]===void 0)continue;let V=B[O.id];for(let X in V)h(V[X].object),delete V[X];delete B[O.id]}}}function v(O){for(let k in n){let Y=n[k],N=O.isInstancedMesh===!0?O.id:0,B=Y[N];if(B!==void 0){for(let V in B){let X=B[V];for(let Q in X)h(X[Q].object),delete X[Q];delete B[V]}delete Y[N],Object.keys(Y).length===0&&delete n[k]}}}function R(){L(),o=!0,r!==i&&(r=i,c(r.object))}function L(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:L,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:v,releaseStatesOfProgram:D,initAttributes:_,enableAttribute:g,disableUnusedAttributes:S}}function iM(s,e,t){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function a(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function sM(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let D=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(D){return!(D!==kn&&n.convert(D)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(D){let v=D===Ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==ni&&D!==Hn&&!v&&n.convert(D)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(D){if(D==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Pe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Pe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),S=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:S,maxVaryings:b,maxFragmentUniforms:x,maxSamples:A,samples:T}}function rM(s){let e=this,t=null,n=0,i=!1,r=!1,o=new oi,a=new pt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let p=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,m=s.get(d);if(!i||p===null||p.length===0||r&&!g)r?h(null):c();else{let S=r?0:n,b=S*4,x=m.clippingState||null;l.value=x,x=h(p,u,b,f);for(let A=0;A!==b;++A)x[A]=t[A];m.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,p){let _=d!==null?d.length:0,g=null;if(_!==0){if(g=l.value,p!==!0||g===null){let m=f+_*4,S=u.matrixWorldInverse;a.getNormalMatrix(S),(g===null||g.length<m)&&(g=new Float32Array(m));for(let b=0,x=f;b!==_;++b,x+=4)o.copy(d[b]).applyMatrix4(S,a),o.normal.toArray(g,x),g[x+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}var Ra=4,oM=6,aM=20,lM=256,Yc=new sr,E0=new Be,Sp=null,Mp=0,bp=0,Ep=!1,cM=new E,io=new E,so=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:o=256,position:a=cM}=r;Sp=this._renderer.getRenderTarget(),Mp=this._renderer.getActiveCubeFace(),bp=this._renderer.getActiveMipmapLevel(),Ep=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=A0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=T0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Sp,Mp,bp),this._renderer.xr.enabled=Ep,e.scissorTest=!1,Aa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Xi||e.mapping===Ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Sp=this._renderer.getRenderTarget(),Mp=this._renderer.getActiveCubeFace(),bp=this._renderer.getActiveMipmapLevel(),Ep=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Kt,minFilter:Kt,generateMipmaps:!1,type:Ri,format:kn,colorSpace:Fo,depthBuffer:!1},i=w0(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=w0(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=hM(r)),this._blurMaterial=dM(r,e,t),this._ggxMaterial=uM(r,e,t)}return i}_compileMaterial(e){let t=new Ot(new gt,e);this._renderer.compile(t,Yc)}_sceneToCubeUV(e,t,n,i,r){let l=new cn(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(E0),d.toneMapping=Ai,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ot(new In,new jt({name:"PMREM.Background",side:Cn,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,g=_.material,m=!1,S=e.background;S?S.isColor&&(g.color.copy(S),e.background=null,m=!0):(g.color.copy(E0),m=!0);for(let b=0;b<6;b++){let x=b%3;x===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[b],r.y,r.z)):x===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[b]));let A=this._cubeSize;Aa(i,x*A,b>2?A:0,A,A),d.setRenderTarget(i),m&&d.render(_,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=S}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Xi||e.mapping===Ls;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=A0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=T0());let r=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;Aa(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Yc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let i=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:p}=this,_=this._sizeLods[n],g=3*_*(n>p-Ra?n-p+Ra:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,Aa(r,g,m,3*_,2*_),i.setRenderTarget(r),i.render(a,Yc),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,Aa(e,g,m,3*_,2*_),i.setRenderTarget(e),i.render(a,Yc)}_blur(e,t,n,i){let r=this._pingPongRenderTarget,o=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,o),this._blurPass(r,e,n,n,o)}_blurPass(e,t,n,i,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[i];l.material=a;let c=a.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[i],d=3*h*(i>this._lodMax-Ra?i-this._lodMax+Ra:0),u=4*(this._cubeSize-h);Aa(t,d,u,3*h,2*h),o.setRenderTarget(t),o.render(l,Yc)}};function hM(s){let e=[],t=[],n=s,i=s-Ra+1+oM;for(let r=0;r<i;r++){let o=Math.pow(2,n);e.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,p=new Float32Array(f*u*d),_=new Float32Array(f*u*d);for(let m=0;m<d;m++){let S=m%3*2/3-1,b=m>2?0:-1,x=[S,b,0,S+2/3,b,0,S+2/3,b+1,0,S,b,0,S+2/3,b+1,0,S,b+1,0];p.set(x,f*u*m);for(let A=0;A<u;A++){let T=h[A*2]*2-1,D=h[A*2+1]*2-1;m===0?io.set(1,D,T):m===1?io.set(-T,1,-D):m===2?io.set(-T,D,1):m===3?io.set(-1,D,-T):m===4?io.set(-T,-1,D):io.set(T,D,-1),io.toArray(_,(m*u+A)*f)}}let g=new gt;g.setAttribute("position",new Xt(p,f)),g.setAttribute("outputDirection",new Xt(_,f)),t.push(new Ot(g,null)),n>Ra&&n--}return{lodMeshes:t,sizeLods:e}}function w0(s,e,t){let n=new Pn(s,e,t);return n.texture.mapping=jr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Aa(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function uM(s,e,t){return new Ln({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:lM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:xd(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function dM(s,e,t){return new Ln({name:"SphericalGaussianBlur",defines:{SAMPLES:aM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:xd(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function T0(){return new Ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:xd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function A0(){return new Ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:xd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function xd(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Jc=class extends Pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Js(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new In(5,5,5),r=new Ln({name:"CubemapFromEquirect",uniforms:no(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Cn,blending:Wi});r.uniforms.tEquirect.value=t;let o=new Ot(i,r),a=t.minFilter;return t.minFilter===Yi&&(t.minFilter=Kt),new jl(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}};function fM(s){let e=new WeakMap,t=new WeakMap,n=null;function i(u,f=!1){return u==null?null:f?o(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===ga||f===_a)if(e.has(u)){let p=e.get(u).texture;return a(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let _=new Jc(p.height);return _.fromEquirectangularTexture(s,u),e.set(u,_),u.addEventListener("dispose",c),a(_.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let f=u.mapping,p=f===ga||f===_a,_=f===Xi||f===Ls;if(p||_){let g=t.get(u),m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new so(s)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let S=u.image;return p&&S&&S.height>0||_&&S&&l(S)?(n===null&&(n=new so(s)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function a(u,f){return f===ga?u.mapping=Xi:f===_a&&(u.mapping=Ls),u}function l(u){let f=0,p=6;for(let _=0;_<p;_++)u[_]!==void 0&&f++;return f===p}function c(u){let f=u.target;f.removeEventListener("dispose",c);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function pM(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&ji("WebGLRenderer: "+n+" extension not supported."),i}}}function mM(s,e,t,n){let i={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let p in u.attributes)e.remove(u.attributes[p]);u.removeEventListener("dispose",o),delete i[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],s.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,p=d.attributes.position,_=0;if(p===void 0)return;if(f!==null){let S=f.array;_=f.version;for(let b=0,x=S.length;b<x;b+=3){let A=S[b+0],T=S[b+1],D=S[b+2];u.push(A,T,T,D,D,A)}}else{let S=p.array;_=p.version;for(let b=0,x=S.length/3-1;b<x;b+=3){let A=b+0,T=b+1,D=b+2;u.push(A,T,T,D,D,A)}}let g=new(p.count>=65535?ko:Ho)(u,1);g.version=_;let m=r.get(d);m&&e.remove(m),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function gM(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,u){s.drawElements(n,u,r,d*o),t.update(u,n,1)}function c(d,u,f){f!==0&&(s.drawElementsInstanced(n,u,r,d*o,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let _=0;for(let g=0;g<f;g++)_+=u[g];t.update(_,n,1)}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function _M(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:$e("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function xM(s,e,t){let n=new WeakMap,i=new Lt;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let R=function(){D.dispose(),n.delete(a),a.removeEventListener("dispose",R)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],S=a.morphAttributes.color||[],b=0;f===!0&&(b=1),p===!0&&(b=2),_===!0&&(b=3);let x=a.attributes.position.count*b,A=1;x>e.maxTextureSize&&(A=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let T=new Float32Array(x*A*4*d),D=new Cr(T,x,A,d);D.type=Hn,D.needsUpdate=!0;let v=b*4;for(let L=0;L<d;L++){let O=g[L],k=m[L],Y=S[L],N=x*A*4*L;for(let B=0;B<O.count;B++){let V=B*v;f===!0&&(i.fromBufferAttribute(O,B),T[N+V+0]=i.x,T[N+V+1]=i.y,T[N+V+2]=i.z,T[N+V+3]=0),p===!0&&(i.fromBufferAttribute(k,B),T[N+V+4]=i.x,T[N+V+5]=i.y,T[N+V+6]=i.z,T[N+V+7]=0),_===!0&&(i.fromBufferAttribute(Y,B),T[N+V+8]=i.x,T[N+V+9]=i.y,T[N+V+10]=i.z,T[N+V+11]=Y.itemSize===4?i.w:1)}}u={count:d,texture:D,size:new ae(x,A)},n.set(a,u),a.addEventListener("dispose",R)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function yM(s,e,t,n,i){let r=new WeakMap;function o(c){let h=i.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var vM={[ed]:"LINEAR_TONE_MAPPING",[td]:"REINHARD_TONE_MAPPING",[nd]:"CINEON_TONE_MAPPING",[ma]:"ACES_FILMIC_TONE_MAPPING",[sd]:"AGX_TONE_MAPPING",[rd]:"NEUTRAL_TONE_MAPPING",[id]:"CUSTOM_TONE_MAPPING"};function SM(s,e,t,n,i,r){let o=new Pn(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new gt;c.setAttribute("position",new Ve([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ve([0,2,0,0,2,0],2));let h=new Qo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Ot(c,h),u=new sr(-1,1,1,-1,0,1),f=null,p=null,_=!1,g,m=null,S=[],b=!1;this.setSize=function(x,A){o.setSize(x,A),a!==null&&a.setSize(x,A),l!==null&&l.setSize(x,A);for(let T=0;T<S.length;T++){let D=S[T];D.setSize&&D.setSize(x,A)}},this.setEffects=function(x){S=x,b=S.length>0&&S[0].isRenderPass===!0;let A=o.width,T=o.height;S.length>0&&a===null&&(a=new Pn(A,T,{type:Ri,depthBuffer:!1,stencilBuffer:!1}),l=new Pn(A,T,{type:Ri,depthBuffer:!1,stencilBuffer:!1}));for(let D=0;D<S.length;D++){let v=S[D];v.setSize&&v.setSize(A,T)}},this.begin=function(x,A){if(_||x.toneMapping===Ai&&S.length===0)return!1;if(m=A,A!==null){let T=A.width,D=A.height;(o.width!==T||o.height!==D)&&this.setSize(T,D)}return b===!1&&x.setRenderTarget(o),g=x.toneMapping,x.toneMapping=Ai,!0},this.hasRenderPass=function(){return b},this.end=function(x,A){x.toneMapping=g,_=!0;let T=o,D=a;for(let v=0;v<S.length;v++){let R=S[v];R.enabled!==!1&&(R.render(x,D,T,A),R.needsSwap!==!1&&(T=D,D=D===a?l:a))}if(f!==x.outputColorSpace||p!==x.toneMapping){f=x.outputColorSpace,p=x.toneMapping,h.defines={},At.getTransfer(f)===Ht&&(h.defines.SRGB_TRANSFER="");let v=vM[p];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=T.texture,x.setRenderTarget(m),x.render(d,u),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var q0=new un,Ap=new bs(1,1),Z0=new Cr,J0=new Pr,K0=new Js,R0=[],C0=[],P0=new Float32Array(16),I0=new Float32Array(9),L0=new Float32Array(4);function Pa(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=R0[i];if(r===void 0&&(r=new Float32Array(i),R0[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function yn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function vn(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function yd(s,e){let t=C0[e];t===void 0&&(t=new Int32Array(e),C0[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function MM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function bM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yn(t,e))return;s.uniform2fv(this.addr,e),vn(t,e)}}function EM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(yn(t,e))return;s.uniform3fv(this.addr,e),vn(t,e)}}function wM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yn(t,e))return;s.uniform4fv(this.addr,e),vn(t,e)}}function TM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(yn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),vn(t,e)}else{if(yn(t,n))return;L0.set(n),s.uniformMatrix2fv(this.addr,!1,L0),vn(t,n)}}function AM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(yn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),vn(t,e)}else{if(yn(t,n))return;I0.set(n),s.uniformMatrix3fv(this.addr,!1,I0),vn(t,n)}}function RM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(yn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),vn(t,e)}else{if(yn(t,n))return;P0.set(n),s.uniformMatrix4fv(this.addr,!1,P0),vn(t,n)}}function CM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function PM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yn(t,e))return;s.uniform2iv(this.addr,e),vn(t,e)}}function IM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yn(t,e))return;s.uniform3iv(this.addr,e),vn(t,e)}}function LM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yn(t,e))return;s.uniform4iv(this.addr,e),vn(t,e)}}function DM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function NM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(yn(t,e))return;s.uniform2uiv(this.addr,e),vn(t,e)}}function UM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(yn(t,e))return;s.uniform3uiv(this.addr,e),vn(t,e)}}function FM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(yn(t,e))return;s.uniform4uiv(this.addr,e),vn(t,e)}}function OM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Ap.compareFunction=t.isReversedDepthBuffer()?Wc:Gc,r=Ap):r=q0,t.setTexture2D(e||r,i)}function BM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||J0,i)}function zM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||K0,i)}function VM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Z0,i)}function HM(s){switch(s){case 5126:return MM;case 35664:return bM;case 35665:return EM;case 35666:return wM;case 35674:return TM;case 35675:return AM;case 35676:return RM;case 5124:case 35670:return CM;case 35667:case 35671:return PM;case 35668:case 35672:return IM;case 35669:case 35673:return LM;case 5125:return DM;case 36294:return NM;case 36295:return UM;case 36296:return FM;case 35678:case 36198:case 36298:case 36306:case 35682:return OM;case 35679:case 36299:case 36307:return BM;case 35680:case 36300:case 36308:case 36293:return zM;case 36289:case 36303:case 36311:case 36292:return VM}}function kM(s,e){s.uniform1fv(this.addr,e)}function GM(s,e){let t=Pa(e,this.size,2);s.uniform2fv(this.addr,t)}function WM(s,e){let t=Pa(e,this.size,3);s.uniform3fv(this.addr,t)}function XM(s,e){let t=Pa(e,this.size,4);s.uniform4fv(this.addr,t)}function YM(s,e){let t=Pa(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function qM(s,e){let t=Pa(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function ZM(s,e){let t=Pa(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function JM(s,e){s.uniform1iv(this.addr,e)}function KM(s,e){s.uniform2iv(this.addr,e)}function $M(s,e){s.uniform3iv(this.addr,e)}function jM(s,e){s.uniform4iv(this.addr,e)}function QM(s,e){s.uniform1uiv(this.addr,e)}function eb(s,e){s.uniform2uiv(this.addr,e)}function tb(s,e){s.uniform3uiv(this.addr,e)}function nb(s,e){s.uniform4uiv(this.addr,e)}function ib(s,e,t){let n=this.cache,i=e.length,r=yd(t,i);yn(n,r)||(s.uniform1iv(this.addr,r),vn(n,r));let o;this.type===s.SAMPLER_2D_SHADOW?o=Ap:o=q0;for(let a=0;a!==i;++a)t.setTexture2D(e[a]||o,r[a])}function sb(s,e,t){let n=this.cache,i=e.length,r=yd(t,i);yn(n,r)||(s.uniform1iv(this.addr,r),vn(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||J0,r[o])}function rb(s,e,t){let n=this.cache,i=e.length,r=yd(t,i);yn(n,r)||(s.uniform1iv(this.addr,r),vn(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||K0,r[o])}function ob(s,e,t){let n=this.cache,i=e.length,r=yd(t,i);yn(n,r)||(s.uniform1iv(this.addr,r),vn(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Z0,r[o])}function ab(s){switch(s){case 5126:return kM;case 35664:return GM;case 35665:return WM;case 35666:return XM;case 35674:return YM;case 35675:return qM;case 35676:return ZM;case 5124:case 35670:return JM;case 35667:case 35671:return KM;case 35668:case 35672:return $M;case 35669:case 35673:return jM;case 5125:return QM;case 36294:return eb;case 36295:return tb;case 36296:return nb;case 35678:case 36198:case 36298:case 36306:case 35682:return ib;case 35679:case 36299:case 36307:return sb;case 35680:case 36300:case 36308:case 36293:return rb;case 36289:case 36303:case 36311:case 36292:return ob}}var Rp=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=HM(t.type)}},Cp=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ab(t.type)}},Pp=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},wp=/(\w+)(\])?(\[|\.)?/g;function D0(s,e){s.seq.push(e),s.map[e.id]=e}function lb(s,e,t){let n=s.name,i=n.length;for(wp.lastIndex=0;;){let r=wp.exec(n),o=wp.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){D0(t,c===void 0?new Rp(a,s,e):new Cp(a,s,e));break}else{let d=t.map[a];d===void 0&&(d=new Pp(a),D0(t,d)),t=d}}}var Ca=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);lb(a,l,this)}let i=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(o):r.push(o);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function N0(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var cb=37297,hb=0;function ub(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var U0=new pt;function db(s){At._getMatrix(U0,At.workingColorSpace,s);let e=`mat3( ${U0.elements.map(t=>t.toFixed(4))} )`;switch(At.getTransfer(s)){case Oo:return[e,"LinearTransferOETF"];case Ht:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function F0(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+ub(s.getShaderSource(e),a)}else return r}function fb(s,e){let t=db(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var pb={[ed]:"Linear",[td]:"Reinhard",[nd]:"Cineon",[ma]:"ACESFilmic",[sd]:"AgX",[rd]:"Neutral",[id]:"Custom"};function mb(s,e){let t=pb[e];return t===void 0?(Pe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var _d=new E;function gb(){At.getLuminanceCoefficients(_d);let s=_d.x.toFixed(4),e=_d.y.toFixed(4),t=_d.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function _b(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zc).join(`
`)}function xb(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function yb(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Zc(s){return s!==""}function O0(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function B0(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var vb=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ip(s){return s.replace(vb,Mb)}var Sb=new Map;function Mb(s,e){let t=bt[e];if(t===void 0){let n=Sb.get(e);if(n!==void 0)t=bt[n],Pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ip(t)}var bb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function z0(s){return s.replace(bb,Eb)}function Eb(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function V0(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var wb={[da]:"SHADOWMAP_TYPE_PCF",[Kr]:"SHADOWMAP_TYPE_VSM"};function Tb(s){return wb[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Ab={[Xi]:"ENVMAP_TYPE_CUBE",[Ls]:"ENVMAP_TYPE_CUBE",[jr]:"ENVMAP_TYPE_CUBE_UV"};function Rb(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":Ab[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var Cb={[Ls]:"ENVMAP_MODE_REFRACTION"};function Pb(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Cb[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Ib={[pa]:"ENVMAP_BLENDING_MULTIPLY",[Qf]:"ENVMAP_BLENDING_MIX",[ep]:"ENVMAP_BLENDING_ADD"};function Lb(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":Ib[s.combine]||"ENVMAP_BLENDING_NONE"}function Db(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Nb(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=Tb(t),c=Rb(t),h=Pb(t),d=Lb(t),u=Db(t),f=_b(t),p=xb(r),_=i.createProgram(),g,m,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Zc).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Zc).join(`
`),m.length>0&&(m+=`
`)):(g=[V0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zc).join(`
`),m=[V0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ai?"#define TONE_MAPPING":"",t.toneMapping!==Ai?bt.tonemapping_pars_fragment:"",t.toneMapping!==Ai?mb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",bt.colorspace_pars_fragment,fb("linearToOutputTexel",t.outputColorSpace),gb(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zc).join(`
`)),o=Ip(o),o=O0(o,t),o=B0(o,t),a=Ip(a),a=O0(a,t),a=B0(a,t),o=z0(o),a=z0(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===pd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===pd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let b=S+g+o,x=S+m+a,A=N0(i,i.VERTEX_SHADER,b),T=N0(i,i.FRAGMENT_SHADER,x);i.attachShader(_,A),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function D(O){if(s.debug.checkShaderErrors){let k=i.getProgramInfoLog(_)||"",Y=i.getShaderInfoLog(A)||"",N=i.getShaderInfoLog(T)||"",B=k.trim(),V=Y.trim(),X=N.trim(),Q=!0,q=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Q=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,A,T);else{let K=F0(i,A,"vertex"),re=F0(i,T,"fragment");$e("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+B+`
`+K+`
`+re)}else B!==""?Pe("WebGLProgram: Program Info Log:",B):(V===""||X==="")&&(q=!1);q&&(O.diagnostics={runnable:Q,programLog:B,vertexShader:{log:V,prefix:g},fragmentShader:{log:X,prefix:m}})}i.deleteShader(A),i.deleteShader(T),v=new Ca(i,_),R=yb(i,_)}let v;this.getUniforms=function(){return v===void 0&&D(this),v};let R;this.getAttributes=function(){return R===void 0&&D(this),R};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=i.getProgramParameter(_,cb)),L},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=hb++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=T,this}var Ub=0,Lp=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Dp(e),t.set(e,n)),n}},Dp=class{constructor(e){this.id=Ub++,this.code=e,this.usedTimes=0}};function Fb(s){return s===Ns||s===Ea||s===wa}function Ob(s,e,t,n,i,r){let o=new Ir,a=new Lp,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function _(v,R,L,O,k,Y){let N=O.fog,B=k.geometry,V=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?O.environment:null,X=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,Q=e.get(v.envMap||V,X),q=Q&&Q.mapping===jr?Q.image.height:null,K=f[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&Pe("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));let re=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ke=re!==void 0?re.length:0,He=0;B.morphAttributes.position!==void 0&&(He=1),B.morphAttributes.normal!==void 0&&(He=2),B.morphAttributes.color!==void 0&&(He=3);let wt,St,et,ee;if(K){let kt=Yn[K];wt=kt.vertexShader,St=kt.fragmentShader}else{wt=v.vertexShader,St=v.fragmentShader;let kt=a.getVertexShaderStage(v),mt=a.getFragmentShaderStage(v);a.update(v,kt,mt),et=kt.id,ee=mt.id}let se=s.getRenderTarget(),me=s.state.buffers.depth.getReversed(),nt=k.isInstancedMesh===!0,Ae=k.isBatchedMesh===!0,at=!!v.map,Vt=!!v.matcap,ce=!!Q,pe=!!v.aoMap,ge=!!v.lightMap,_e=!!v.bumpMap&&v.wireframe===!1,we=!!v.normalMap,it=!!v.displacementMap,tt=!!v.emissiveMap,lt=!!v.metalnessMap,dt=!!v.roughnessMap,F=v.anisotropy>0,Pt=v.clearcoat>0,_t=v.dispersion>0,I=v.retroreflectivity>0,M=v.iridescence>0,G=v.sheen>0,J=v.transmission>0,te=F&&!!v.anisotropyMap,ye=Pt&&!!v.clearcoatMap,be=Pt&&!!v.clearcoatNormalMap,ie=Pt&&!!v.clearcoatRoughnessMap,le=M&&!!v.iridescenceMap,Ie=M&&!!v.iridescenceThicknessMap,Ke=G&&!!v.sheenColorMap,Ue=G&&!!v.sheenRoughnessMap,Le=!!v.specularMap,je=!!v.specularColorMap,st=!!v.specularIntensityMap,xt=J&&!!v.transmissionMap,H=J&&!!v.thicknessMap,Ce=!!v.gradientMap,ne=!!v.alphaMap,fe=v.alphaTest>0,De=!!v.alphaHash,he=!!v.extensions,Te=Ai;v.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Te=s.toneMapping);let ze={shaderID:K,shaderType:v.type,shaderName:v.name,vertexShader:wt,fragmentShader:St,defines:v.defines,customVertexShaderID:et,customFragmentShaderID:ee,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Ae,batchingColor:Ae&&k._colorsTexture!==null,instancing:nt,instancingColor:nt&&k.instanceColor!==null,instancingMorph:nt&&k.morphTexture!==null,outputColorSpace:se===null?s.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:At.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:at,matcap:Vt,envMap:ce,envMapMode:ce&&Q.mapping,envMapCubeUVHeight:q,aoMap:pe,lightMap:ge,bumpMap:_e,normalMap:we,displacementMap:it,emissiveMap:tt,normalMapObjectSpace:we&&v.normalMapType===op,normalMapTangentSpace:we&&v.normalMapType===is,packedNormalMap:we&&v.normalMapType===is&&Fb(v.normalMap.format),metalnessMap:lt,roughnessMap:dt,anisotropy:F,anisotropyMap:te,clearcoat:Pt,clearcoatMap:ye,clearcoatNormalMap:be,clearcoatRoughnessMap:ie,dispersion:_t,retroreflection:I,iridescence:M,iridescenceMap:le,iridescenceThicknessMap:Ie,sheen:G,sheenColorMap:Ke,sheenRoughnessMap:Ue,specularMap:Le,specularColorMap:je,specularIntensityMap:st,transmission:J,transmissionMap:xt,thicknessMap:H,gradientMap:Ce,opaque:v.transparent===!1&&v.blending===$r&&v.alphaToCoverage===!1,alphaMap:ne,alphaTest:fe,alphaHash:De,combine:v.combine,mapUv:at&&p(v.map.channel),aoMapUv:pe&&p(v.aoMap.channel),lightMapUv:ge&&p(v.lightMap.channel),bumpMapUv:_e&&p(v.bumpMap.channel),normalMapUv:we&&p(v.normalMap.channel),displacementMapUv:it&&p(v.displacementMap.channel),emissiveMapUv:tt&&p(v.emissiveMap.channel),metalnessMapUv:lt&&p(v.metalnessMap.channel),roughnessMapUv:dt&&p(v.roughnessMap.channel),anisotropyMapUv:te&&p(v.anisotropyMap.channel),clearcoatMapUv:ye&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:be&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ie&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:Ie&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:Ke&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:Ue&&p(v.sheenRoughnessMap.channel),specularMapUv:Le&&p(v.specularMap.channel),specularColorMapUv:je&&p(v.specularColorMap.channel),specularIntensityMapUv:st&&p(v.specularIntensityMap.channel),transmissionMapUv:xt&&p(v.transmissionMap.channel),thicknessMapUv:H&&p(v.thicknessMap.channel),alphaMapUv:ne&&p(v.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(we||F),vertexNormals:!!B.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!B.attributes.uv&&(at||ne),fog:!!N,useFog:v.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||B.attributes.normal===void 0&&we===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:me,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:ke,morphTextureStride:He,numSunLights:R.sun.length,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numSunLightShadows:R.sunShadowMap.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:Y.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:Te,decodeVideoTexture:at&&v.map.isVideoTexture===!0&&At.getTransfer(v.map.colorSpace)===Ht,decodeVideoTextureEmissive:tt&&v.emissiveMap.isVideoTexture===!0&&At.getTransfer(v.emissiveMap.colorSpace)===Ht,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===gi,flipSided:v.side===Cn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:he&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(he&&v.extensions.multiDraw===!0||Ae)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ze.vertexUv1s=l.has(1),ze.vertexUv2s=l.has(2),ze.vertexUv3s=l.has(3),l.clear(),ze}function g(v){let R=[];if(v.shaderID?R.push(v.shaderID):(R.push(v.customVertexShaderID),R.push(v.customFragmentShaderID)),v.defines!==void 0)for(let L in v.defines)R.push(L),R.push(v.defines[L]);return v.isRawShaderMaterial===!1&&(m(R,v),S(R,v),R.push(s.outputColorSpace)),R.push(v.customProgramCacheKey),R.join()}function m(v,R){v.push(R.precision),v.push(R.outputColorSpace),v.push(R.envMapMode),v.push(R.envMapCubeUVHeight),v.push(R.mapUv),v.push(R.alphaMapUv),v.push(R.lightMapUv),v.push(R.aoMapUv),v.push(R.bumpMapUv),v.push(R.normalMapUv),v.push(R.displacementMapUv),v.push(R.emissiveMapUv),v.push(R.metalnessMapUv),v.push(R.roughnessMapUv),v.push(R.anisotropyMapUv),v.push(R.clearcoatMapUv),v.push(R.clearcoatNormalMapUv),v.push(R.clearcoatRoughnessMapUv),v.push(R.iridescenceMapUv),v.push(R.iridescenceThicknessMapUv),v.push(R.sheenColorMapUv),v.push(R.sheenRoughnessMapUv),v.push(R.specularMapUv),v.push(R.specularColorMapUv),v.push(R.specularIntensityMapUv),v.push(R.transmissionMapUv),v.push(R.thicknessMapUv),v.push(R.combine),v.push(R.fogExp2),v.push(R.sizeAttenuation),v.push(R.morphTargetsCount),v.push(R.morphAttributeCount),v.push(R.numSunLights),v.push(R.numDirLights),v.push(R.numPointLights),v.push(R.numSpotLights),v.push(R.numSpotLightMaps),v.push(R.numHemiLights),v.push(R.numRectAreaLights),v.push(R.numSunLightShadows),v.push(R.numDirLightShadows),v.push(R.numPointLightShadows),v.push(R.numSpotLightShadows),v.push(R.numSpotLightShadowsWithMaps),v.push(R.numLightProbes),v.push(R.shadowMapType),v.push(R.toneMapping),v.push(R.numClippingPlanes),v.push(R.numClipIntersection),v.push(R.depthPacking)}function S(v,R){o.disableAll(),R.instancing&&o.enable(0),R.instancingColor&&o.enable(1),R.instancingMorph&&o.enable(2),R.matcap&&o.enable(3),R.envMap&&o.enable(4),R.normalMapObjectSpace&&o.enable(5),R.normalMapTangentSpace&&o.enable(6),R.clearcoat&&o.enable(7),R.iridescence&&o.enable(8),R.alphaTest&&o.enable(9),R.vertexColors&&o.enable(10),R.vertexAlphas&&o.enable(11),R.vertexUv1s&&o.enable(12),R.vertexUv2s&&o.enable(13),R.vertexUv3s&&o.enable(14),R.vertexTangents&&o.enable(15),R.anisotropy&&o.enable(16),R.alphaHash&&o.enable(17),R.batching&&o.enable(18),R.dispersion&&o.enable(19),R.retroreflection&&o.enable(24),R.batchingColor&&o.enable(20),R.gradientMap&&o.enable(21),R.packedNormalMap&&o.enable(22),R.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),R.fog&&o.enable(0),R.useFog&&o.enable(1),R.flatShading&&o.enable(2),R.logarithmicDepthBuffer&&o.enable(3),R.reversedDepthBuffer&&o.enable(4),R.skinning&&o.enable(5),R.morphTargets&&o.enable(6),R.morphNormals&&o.enable(7),R.morphColors&&o.enable(8),R.premultipliedAlpha&&o.enable(9),R.shadowMapEnabled&&o.enable(10),R.doubleSided&&o.enable(11),R.flipSided&&o.enable(12),R.useDepthPacking&&o.enable(13),R.dithering&&o.enable(14),R.transmission&&o.enable(15),R.sheen&&o.enable(16),R.opaque&&o.enable(17),R.pointsUvs&&o.enable(18),R.decodeVideoTexture&&o.enable(19),R.decodeVideoTextureEmissive&&o.enable(20),R.alphaToCoverage&&o.enable(21),R.numLightProbeGrids>0&&o.enable(22),R.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function b(v){let R=f[v.type],L;if(R){let O=Yn[R];L=Ta.clone(O.uniforms)}else L=v.uniforms;return L}function x(v,R){let L=h.get(R);return L!==void 0?++L.usedTimes:(L=new Nb(s,R,v,i),c.push(L),h.set(R,L)),L}function A(v){if(--v.usedTimes===0){let R=c.indexOf(v);c[R]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function T(v){a.remove(v)}function D(){a.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:b,acquireProgram:x,releaseProgram:A,releaseShaderCache:T,programs:c,dispose:D}}function Bb(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function zb(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function H0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function k0(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,p,_,g,m){let S=s[e];return S===void 0?(S={id:u.id,object:u,geometry:f,material:p,materialVariant:o(u),groupOrder:_,renderOrder:u.renderOrder,z:g,group:m},s[e]=S):(S.id=u.id,S.object=u,S.geometry=f,S.material=p,S.materialVariant=o(u),S.groupOrder=_,S.renderOrder=u.renderOrder,S.z=g,S.group=m),e++,S}function l(u,f,p,_,g,m,S){S.reversedDepth===!0&&(g=-g);let b=a(u,f,p,_,g,m);p.transmission>0?n.push(b):p.transparent===!0?i.push(b):t.push(b)}function c(u,f,p,_,g,m){let S=a(u,f,p,_,g,m);p.transmission>0?n.unshift(S):p.transparent===!0?i.unshift(S):t.unshift(S)}function h(u,f){t.length>1&&t.sort(u||zb),n.length>1&&n.sort(f||H0),i.length>1&&i.sort(f||H0)}function d(){for(let u=e,f=s.length;u<f;u++){let p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:d,sort:h}}function Vb(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new k0,s.set(n,[o])):i>=r.length?(o=new k0,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Hb(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new E,color:new Be};break;case"SpotLight":t={position:new E,direction:new E,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new Be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":t={color:new Be,position:new E,halfWidth:new E,halfHeight:new E};break}return s[e.id]=t,t}}}function kb(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var Gb=0;function Wb(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Xb(s){let e=new Hb,t=kb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new E);let i=new E,r=new ht,o=new ht;function a(c){let h=0,d=0,u=0;for(let k=0;k<9;k++)n.probe[k].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,S=0,b=0,x=0,A=0,T=0,D=0,v=0,R=0,L=0;c.sort(Wb);for(let k=0,Y=c.length;k<Y;k++){let N=c[k],B=N.color,V=N.intensity,X=N.distance,Q=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Ns?Q=N.shadow.map.texture:Q=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=B.r*V,d+=B.g*V,u+=B.b*V;else if(N.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(N.sh.coefficients[q],V);L++}else if(N.isSunLight){let q=e.get(N);if(q.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let K=N.shadow,re=t.get(N);re.shadowIntensity=K.intensity,re.shadowBias=K.bias,re.shadowNormalBias=K.normalBias,re.shadowRadius=K.radius,re.shadowMapSize.copy(K.mapSize).multiply(K.getFrameExtents()),n.sunShadow[p]=re,n.sunShadowMap[p]=Q;let ke=K.getViewportCount();for(let He=0;He<ke;He++)n.sunShadowMatrix[_+He]=K.getMatrix(He),n.sunShadowCascade[_+He]=K._cascadeData[He];_+=ke,p++}n.sun[f]=q,f++}else if(N.isDirectionalLight){let q=e.get(N);if(q.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let K=N.shadow,re=t.get(N);re.shadowIntensity=K.intensity,re.shadowBias=K.bias,re.shadowNormalBias=K.normalBias,re.shadowRadius=K.radius,re.shadowMapSize=K.mapSize,n.directionalShadow[g]=re,n.directionalShadowMap[g]=Q,n.directionalShadowMatrix[g]=N.shadow.matrix,A++}n.directional[g]=q,g++}else if(N.isSpotLight){let q=e.get(N);q.position.setFromMatrixPosition(N.matrixWorld),q.color.copy(B).multiplyScalar(V),q.distance=X,q.coneCos=Math.cos(N.angle),q.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),q.decay=N.decay,n.spot[S]=q;let K=N.shadow;if(N.map&&(n.spotLightMap[v]=N.map,v++,K.updateMatrices(N),N.castShadow&&R++),n.spotLightMatrix[S]=K.matrix,N.castShadow){let re=t.get(N);re.shadowIntensity=K.intensity,re.shadowBias=K.bias,re.shadowNormalBias=K.normalBias,re.shadowRadius=K.radius,re.shadowMapSize=K.mapSize,n.spotShadow[S]=re,n.spotShadowMap[S]=Q,D++}S++}else if(N.isRectAreaLight){let q=e.get(N);q.color.copy(B).multiplyScalar(V),q.halfWidth.set(N.width*.5,0,0),q.halfHeight.set(0,N.height*.5,0),n.rectArea[b]=q,b++}else if(N.isPointLight){let q=e.get(N);if(q.color.copy(N.color).multiplyScalar(N.intensity),q.distance=N.distance,q.decay=N.decay,N.castShadow){let K=N.shadow,re=t.get(N);re.shadowIntensity=K.intensity,re.shadowBias=K.bias,re.shadowNormalBias=K.normalBias,re.shadowRadius=K.radius,re.shadowMapSize=K.mapSize,re.shadowCameraNear=K.camera.near,re.shadowCameraFar=K.camera.far,n.pointShadow[m]=re,n.pointShadowMap[m]=Q,n.pointShadowMatrix[m]=N.shadow.matrix,T++}n.point[m]=q,m++}else if(N.isHemisphereLight){let q=e.get(N);q.skyColor.copy(N.color).multiplyScalar(V),q.groundColor.copy(N.groundColor).multiplyScalar(V),n.hemi[x]=q,x++}}b>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Re.LTC_FLOAT_1,n.rectAreaLTC2=Re.LTC_FLOAT_2):(n.rectAreaLTC1=Re.LTC_HALF_1,n.rectAreaLTC2=Re.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let O=n.hash;(O.sunLength!==f||O.directionalLength!==g||O.pointLength!==m||O.spotLength!==S||O.rectAreaLength!==b||O.hemiLength!==x||O.numSunShadows!==p||O.numDirectionalShadows!==A||O.numPointShadows!==T||O.numSpotShadows!==D||O.numSpotMaps!==v||O.numLightProbes!==L)&&(n.sun.length=f,n.directional.length=g,n.spot.length=S,n.rectArea.length=b,n.point.length=m,n.hemi.length=x,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=D,n.spotShadowMap.length=D,n.spotLightMatrix.length=D+v-R,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=L,O.sunLength=f,O.directionalLength=g,O.pointLength=m,O.spotLength=S,O.rectAreaLength=b,O.hemiLength=x,O.numSunShadows=p,O.numDirectionalShadows=A,O.numPointShadows=T,O.numSpotShadows=D,O.numSpotMaps=v,O.numLightProbes=L,n.version=Gb++)}function l(c,h){let d=0,u=0,f=0,p=0,_=0,g=0,m=h.matrixWorldInverse;for(let S=0,b=c.length;S<b;S++){let x=c[S];if(x.isSunLight){let A=n.sun[d];A.direction.setFromMatrixPosition(x.matrixWorld),A.direction.transformDirection(m),d++}else if(x.isDirectionalLight){let A=n.directional[u];A.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(m),u++}else if(x.isSpotLight){let A=n.spot[p];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(m),p++}else if(x.isRectAreaLight){let A=n.rectArea[_];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(m),o.identity(),r.copy(x.matrixWorld),r.premultiply(m),o.extractRotation(r),A.halfWidth.set(x.width*.5,0,0),A.halfHeight.set(0,x.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),_++}else if(x.isPointLight){let A=n.point[f];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){let A=n.hemi[g];A.direction.setFromMatrixPosition(x.matrixWorld),A.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function G0(s){let e=new Xb(s),t=[],n=[],i=[];function r(u){d.camera=u,t.length=0,n.length=0,i.length=0}function o(u){t.push(u)}function a(u){n.push(u)}function l(u){i.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function Yb(s){let e=new WeakMap;function t(i,r=0){let o=e.get(i),a;return o===void 0?(a=new G0(s),e.set(i,[a])):r>=o.length?(a=new G0(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var qb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Zb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Jb=[new E(1,0,0),new E(-1,0,0),new E(0,1,0),new E(0,-1,0),new E(0,0,1),new E(0,0,-1)],Kb=[new E(0,-1,0),new E(0,-1,0),new E(0,0,1),new E(0,0,-1),new E(0,-1,0),new E(0,-1,0)],W0=new ht,qc=new E,Tp=new E;function $b(s,e,t){let n=new Qi,i=new ae,r=new ae,o=new Lt,a=new ea,l=new ta,c={},h=t.maxTextureSize,d={[Is]:Cn,[Cn]:Is,[gi]:gi},u=new Ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:qb,fragmentShader:Zb}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let p=new gt;p.setAttribute("position",new Xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ot(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=da;let m=this.type;this.render=function(T,D,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===Nf&&(Pe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=da);let R=s.getRenderTarget(),L=s.getActiveCubeFace(),O=s.getActiveMipmapLevel(),k=s.state;k.setBlending(Wi),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let Y=m!==this.type;Y&&D.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(B=>B.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,B=T.length;N<B;N++){let V=T[N],X=V.shadow;if(X===void 0){Pe("WebGLShadowMap:",V,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);let Q=X.getFrameExtents();i.multiply(Q),r.copy(X.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Q.x),i.x=r.x*Q.x,X.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Q.y),i.y=r.y*Q.y,X.mapSize.y=r.y));let q=s.state.buffers.depth.getReversed();if(X.camera._reversedDepth=q,X.map===null||Y===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Kr){if(V.isPointLight){Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new Pn(i.x,i.y,{format:Ns,type:Ri,minFilter:Kt,magFilter:Kt,generateMipmaps:!1}),X.map.texture.name=V.name+".shadowMap",X.map.depthTexture=new bs(i.x,i.y,Hn),X.map.depthTexture.name=V.name+".shadowMapDepth",X.map.depthTexture.format=Oi,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=hn,X.map.depthTexture.magFilter=hn}else V.isPointLight?(X.map=new Jc(i.x),X.map.depthTexture=new El(i.x,_i)):(X.map=new Pn(i.x,i.y),X.map.depthTexture=new bs(i.x,i.y,_i)),X.map.depthTexture.name=V.name+".shadowMap",X.map.depthTexture.format=Oi,this.type===da?(X.map.depthTexture.compareFunction=q?Wc:Gc,X.map.depthTexture.minFilter=Kt,X.map.depthTexture.magFilter=Kt):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=hn,X.map.depthTexture.magFilter=hn);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==i.x||X.map.height!==i.y)&&X.map.setSize(i.x,i.y);let K=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();V.isPointLight!==!0&&X.updateMatrices(V,v);for(let re=0;re<K;re++){let ke=X.getCamera(re);if(V.isPointLight){let He=X.camera,wt=X.matrix,St=V.distance||He.far;St!==He.far&&(He.far=St,He.updateProjectionMatrix()),qc.setFromMatrixPosition(V.matrixWorld),He.position.copy(qc),Tp.copy(He.position),Tp.add(Jb[re]),He.up.copy(Kb[re]),He.lookAt(Tp),He.updateMatrixWorld(),wt.makeTranslation(-qc.x,-qc.y,-qc.z),W0.multiplyMatrices(He.projectionMatrix,He.matrixWorldInverse),X._frustum.setFromProjectionMatrix(W0,He.coordinateSystem,He.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)s.setRenderTarget(X.map,re),s.clear();else{re===0&&(s.setRenderTarget(X.map),s.clear());let He=X.getViewport(re);o.set(r.x*He.x,r.y*He.y,r.x*He.z,r.y*He.w),k.viewport(o)}n=X.getFrustum(re),x(D,v,ke,V,this.type)}X.isPointLightShadow!==!0&&this.type===Kr&&S(X,v),X.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(R,L,O)};function S(T,D){let v=e.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new Pn(i.x,i.y,{format:Ns,type:Ri}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(D,null,v,u,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(D,null,v,f,_,null)}function b(T,D,v,R){let L=null,O=v.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(O!==void 0)L=O;else if(L=v.isPointLight===!0?l:a,s.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){let k=L.uuid,Y=D.uuid,N=c[k];N===void 0&&(N={},c[k]=N);let B=N[Y];B===void 0&&(B=L.clone(),N[Y]=B,D.addEventListener("dispose",A)),L=B}if(L.visible=D.visible,L.wireframe=D.wireframe,R===Kr?L.side=D.shadowSide!==null?D.shadowSide:D.side:L.side=D.shadowSide!==null?D.shadowSide:d[D.side],L.alphaMap=D.alphaMap,L.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,L.map=D.map,L.clipShadows=D.clipShadows,L.clippingPlanes=D.clippingPlanes,L.clipIntersection=D.clipIntersection,L.displacementMap=D.displacementMap,L.displacementScale=D.displacementScale,L.displacementBias=D.displacementBias,L.wireframeLinewidth=D.wireframeLinewidth,L.linewidth=D.linewidth,v.isPointLight===!0&&L.isMeshDistanceMaterial===!0){let k=s.properties.get(L);k.light=v}return L}function x(T,D,v,R,L){if(T.visible===!1)return;if(T.layers.test(D.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&L===Kr)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,T.matrixWorld);let Y=e.update(T),N=T.material;if(Array.isArray(N)){let B=Y.groups;for(let V=0,X=B.length;V<X;V++){let Q=B[V],q=N[Q.materialIndex];if(q&&q.visible){let K=b(T,q,R,L);T.onBeforeShadow(s,T,D,v,Y,K,Q),s.renderBufferDirect(v,null,Y,K,T,Q),T.onAfterShadow(s,T,D,v,Y,K,Q)}}}else if(N.visible){let B=b(T,N,R,L);T.onBeforeShadow(s,T,D,v,Y,B,null),s.renderBufferDirect(v,null,Y,B,T,null),T.onAfterShadow(s,T,D,v,Y,B,null)}}let k=T.children;for(let Y=0,N=k.length;Y<N;Y++)x(k[Y],D,v,R,L)}function A(T){T.target.removeEventListener("dispose",A);for(let v in c){let R=c[v],L=T.target.uuid;L in R&&(R[L].dispose(),delete R[L])}}}function jb(s,e){function t(){let H=!1,Ce=new Lt,ne=null,fe=new Lt(0,0,0,0);return{setMask:function(De){ne!==De&&!H&&(s.colorMask(De,De,De,De),ne=De)},setLocked:function(De){H=De},setClear:function(De,he,Te,ze,kt){kt===!0&&(De*=ze,he*=ze,Te*=ze),Ce.set(De,he,Te,ze),fe.equals(Ce)===!1&&(s.clearColor(De,he,Te,ze),fe.copy(Ce))},reset:function(){H=!1,ne=null,fe.set(-1,0,0,0)}}}function n(){let H=!1,Ce=!1,ne=null,fe=null,De=null;return{setReversed:function(he){if(Ce!==he){let Te=e.get("EXT_clip_control");he?Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.ZERO_TO_ONE_EXT):Te.clipControlEXT(Te.LOWER_LEFT_EXT,Te.NEGATIVE_ONE_TO_ONE_EXT),Ce=he;let ze=De;De=null,this.setClear(ze)}},getReversed:function(){return Ce},setTest:function(he){he?se(s.DEPTH_TEST):me(s.DEPTH_TEST)},setMask:function(he){ne!==he&&!H&&(s.depthMask(he),ne=he)},setFunc:function(he){if(Ce&&(he=f0[he]),fe!==he){switch(he){case rl:s.depthFunc(s.NEVER);break;case ol:s.depthFunc(s.ALWAYS);break;case al:s.depthFunc(s.LESS);break;case Ar:s.depthFunc(s.LEQUAL);break;case ll:s.depthFunc(s.EQUAL);break;case cl:s.depthFunc(s.GEQUAL);break;case hl:s.depthFunc(s.GREATER);break;case ul:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}fe=he}},setLocked:function(he){H=he},setClear:function(he){De!==he&&(De=he,Ce&&(he=1-he),s.clearDepth(he))},reset:function(){H=!1,ne=null,fe=null,De=null,Ce=!1}}}function i(){let H=!1,Ce=null,ne=null,fe=null,De=null,he=null,Te=null,ze=null,kt=null;return{setTest:function(mt){H||(mt?se(s.STENCIL_TEST):me(s.STENCIL_TEST))},setMask:function(mt){Ce!==mt&&!H&&(s.stencilMask(mt),Ce=mt)},setFunc:function(mt,Mn,bn){(ne!==mt||fe!==Mn||De!==bn)&&(s.stencilFunc(mt,Mn,bn),ne=mt,fe=Mn,De=bn)},setOp:function(mt,Mn,bn){(he!==mt||Te!==Mn||ze!==bn)&&(s.stencilOp(mt,Mn,bn),he=mt,Te=Mn,ze=bn)},setLocked:function(mt){H=mt},setClear:function(mt){kt!==mt&&(s.clearStencil(mt),kt=mt)},reset:function(){H=!1,Ce=null,ne=null,fe=null,De=null,he=null,Te=null,ze=null,kt=null}}}let r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,p=[],_=null,g=!1,m=null,S=null,b=null,x=null,A=null,T=null,D=null,v=new Be(0,0,0),R=0,L=!1,O=null,k=null,Y=null,N=null,B=null,V=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,Q=0,q=s.getParameter(s.VERSION);q.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(q)[1]),X=Q>=1):q.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),X=Q>=2);let K=null,re={},ke=s.getParameter(s.SCISSOR_BOX),He=s.getParameter(s.VIEWPORT),wt=new Lt().fromArray(ke),St=new Lt().fromArray(He);function et(H,Ce,ne,fe){let De=new Uint8Array(4),he=s.createTexture();s.bindTexture(H,he),s.texParameteri(H,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(H,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Te=0;Te<ne;Te++)H===s.TEXTURE_3D||H===s.TEXTURE_2D_ARRAY?s.texImage3D(Ce,0,s.RGBA,1,1,fe,0,s.RGBA,s.UNSIGNED_BYTE,De):s.texImage2D(Ce+Te,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,De);return he}let ee={};ee[s.TEXTURE_2D]=et(s.TEXTURE_2D,s.TEXTURE_2D,1),ee[s.TEXTURE_CUBE_MAP]=et(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[s.TEXTURE_2D_ARRAY]=et(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ee[s.TEXTURE_3D]=et(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(s.DEPTH_TEST),o.setFunc(Ar),_e(!1),we(Ju),se(s.CULL_FACE),pe(Wi);function se(H){h[H]!==!0&&(s.enable(H),h[H]=!0)}function me(H){h[H]!==!1&&(s.disable(H),h[H]=!1)}function nt(H,Ce){return u[H]!==Ce?(s.bindFramebuffer(H,Ce),u[H]=Ce,H===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=Ce),H===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=Ce),!0):!1}function Ae(H,Ce){let ne=p,fe=!1;if(H){ne=f.get(Ce),ne===void 0&&(ne=[],f.set(Ce,ne));let De=H.textures;if(ne.length!==De.length||ne[0]!==s.COLOR_ATTACHMENT0){for(let he=0,Te=De.length;he<Te;he++)ne[he]=s.COLOR_ATTACHMENT0+he;ne.length=De.length,fe=!0}}else ne[0]!==s.BACK&&(ne[0]=s.BACK,fe=!0);fe&&s.drawBuffers(ne)}function at(H){return _!==H?(s.useProgram(H),_=H,!0):!1}let Vt={[or]:s.FUNC_ADD,[Ff]:s.FUNC_SUBTRACT,[Of]:s.FUNC_REVERSE_SUBTRACT};Vt[Bf]=s.MIN,Vt[zf]=s.MAX;let ce={[Vf]:s.ZERO,[Hf]:s.ONE,[kf]:s.SRC_COLOR,[ju]:s.SRC_ALPHA,[Zf]:s.SRC_ALPHA_SATURATE,[Yf]:s.DST_COLOR,[Wf]:s.DST_ALPHA,[Gf]:s.ONE_MINUS_SRC_COLOR,[Qu]:s.ONE_MINUS_SRC_ALPHA,[qf]:s.ONE_MINUS_DST_COLOR,[Xf]:s.ONE_MINUS_DST_ALPHA,[Jf]:s.CONSTANT_COLOR,[Kf]:s.ONE_MINUS_CONSTANT_COLOR,[$f]:s.CONSTANT_ALPHA,[jf]:s.ONE_MINUS_CONSTANT_ALPHA};function pe(H,Ce,ne,fe,De,he,Te,ze,kt,mt){if(H===Wi){g===!0&&(me(s.BLEND),g=!1);return}if(g===!1&&(se(s.BLEND),g=!0),H!==Uf){if(H!==m||mt!==L){if((S!==or||A!==or)&&(s.blendEquation(s.FUNC_ADD),S=or,A=or),mt)switch(H){case $r:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case fa:s.blendFunc(s.ONE,s.ONE);break;case Ku:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case $u:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:$e("WebGLState: Invalid blending: ",H);break}else switch(H){case $r:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case fa:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Ku:$e("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $u:$e("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$e("WebGLState: Invalid blending: ",H);break}b=null,x=null,T=null,D=null,v.set(0,0,0),R=0,m=H,L=mt}return}De=De||Ce,he=he||ne,Te=Te||fe,(Ce!==S||De!==A)&&(s.blendEquationSeparate(Vt[Ce],Vt[De]),S=Ce,A=De),(ne!==b||fe!==x||he!==T||Te!==D)&&(s.blendFuncSeparate(ce[ne],ce[fe],ce[he],ce[Te]),b=ne,x=fe,T=he,D=Te),(ze.equals(v)===!1||kt!==R)&&(s.blendColor(ze.r,ze.g,ze.b,kt),v.copy(ze),R=kt),m=H,L=!1}function ge(H,Ce){H.side===gi?me(s.CULL_FACE):se(s.CULL_FACE);let ne=H.side===Cn;Ce&&(ne=!ne),_e(ne),H.blending===$r&&H.transparent===!1?pe(Wi):pe(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),r.setMask(H.colorWrite);let fe=H.stencilWrite;a.setTest(fe),fe&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),tt(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?se(s.SAMPLE_ALPHA_TO_COVERAGE):me(s.SAMPLE_ALPHA_TO_COVERAGE)}function _e(H){O!==H&&(H?s.frontFace(s.CW):s.frontFace(s.CCW),O=H)}function we(H){H!==Lf?(se(s.CULL_FACE),H!==k&&(H===Ju?s.cullFace(s.BACK):H===Df?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):me(s.CULL_FACE),k=H}function it(H){H!==Y&&(X&&s.lineWidth(H),Y=H)}function tt(H,Ce,ne){H?(se(s.POLYGON_OFFSET_FILL),(N!==Ce||B!==ne)&&(N=Ce,B=ne,o.getReversed()&&(Ce=-Ce),s.polygonOffset(Ce,ne))):me(s.POLYGON_OFFSET_FILL)}function lt(H){H?se(s.SCISSOR_TEST):me(s.SCISSOR_TEST)}function dt(H){H===void 0&&(H=s.TEXTURE0+V-1),K!==H&&(s.activeTexture(H),K=H)}function F(H,Ce,ne){ne===void 0&&(K===null?ne=s.TEXTURE0+V-1:ne=K);let fe=re[ne];fe===void 0&&(fe={type:void 0,texture:void 0},re[ne]=fe),(fe.type!==H||fe.texture!==Ce)&&(K!==ne&&(s.activeTexture(ne),K=ne),s.bindTexture(H,Ce||ee[H]),fe.type=H,fe.texture=Ce)}function Pt(){let H=re[K];H!==void 0&&H.type!==void 0&&(s.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function _t(){try{s.compressedTexImage2D(...arguments)}catch(H){$e("WebGLState:",H)}}function I(){try{s.compressedTexImage3D(...arguments)}catch(H){$e("WebGLState:",H)}}function M(){try{s.texSubImage2D(...arguments)}catch(H){$e("WebGLState:",H)}}function G(){try{s.texSubImage3D(...arguments)}catch(H){$e("WebGLState:",H)}}function J(){try{s.compressedTexSubImage2D(...arguments)}catch(H){$e("WebGLState:",H)}}function te(){try{s.compressedTexSubImage3D(...arguments)}catch(H){$e("WebGLState:",H)}}function ye(){try{s.texStorage2D(...arguments)}catch(H){$e("WebGLState:",H)}}function be(){try{s.texStorage3D(...arguments)}catch(H){$e("WebGLState:",H)}}function ie(){try{s.texImage2D(...arguments)}catch(H){$e("WebGLState:",H)}}function le(){try{s.texImage3D(...arguments)}catch(H){$e("WebGLState:",H)}}function Ie(H){return d[H]!==void 0?d[H]:s.getParameter(H)}function Ke(H,Ce){d[H]!==Ce&&(s.pixelStorei(H,Ce),d[H]=Ce)}function Ue(H){wt.equals(H)===!1&&(s.scissor(H.x,H.y,H.z,H.w),wt.copy(H))}function Le(H){St.equals(H)===!1&&(s.viewport(H.x,H.y,H.z,H.w),St.copy(H))}function je(H,Ce){let ne=c.get(Ce);ne===void 0&&(ne=new WeakMap,c.set(Ce,ne));let fe=ne.get(H);fe===void 0&&(fe=s.getUniformBlockIndex(Ce,H.name),ne.set(H,fe))}function st(H,Ce){let fe=c.get(Ce).get(H);l.get(Ce)!==fe&&(s.uniformBlockBinding(Ce,fe,H.__bindingPointIndex),l.set(Ce,fe))}function xt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},d={},K=null,re={},u={},f=new WeakMap,p=[],_=null,g=!1,m=null,S=null,b=null,x=null,A=null,T=null,D=null,v=new Be(0,0,0),R=0,L=!1,O=null,k=null,Y=null,N=null,B=null,wt.set(0,0,s.canvas.width,s.canvas.height),St.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:se,disable:me,bindFramebuffer:nt,drawBuffers:Ae,useProgram:at,setBlending:pe,setMaterial:ge,setFlipSided:_e,setCullFace:we,setLineWidth:it,setPolygonOffset:tt,setScissorTest:lt,activeTexture:dt,bindTexture:F,unbindTexture:Pt,compressedTexImage2D:_t,compressedTexImage3D:I,texImage2D:ie,texImage3D:le,pixelStorei:Ke,getParameter:Ie,updateUBOMapping:je,uniformBlockBinding:st,texStorage2D:ye,texStorage3D:be,texSubImage2D:M,texSubImage3D:G,compressedTexSubImage2D:J,compressedTexSubImage3D:te,scissor:Ue,viewport:Le,reset:xt}}function Qb(s,e,t,n,i,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ae,h=new WeakMap,d=new Set,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(I,M){return p?new OffscreenCanvas(I,M):Bo("canvas")}function g(I,M,G){let J=1,te=_t(I);if((te.width>G||te.height>G)&&(J=G/Math.max(te.width,te.height)),J<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let ye=Math.floor(J*te.width),be=Math.floor(J*te.height);u===void 0&&(u=_(ye,be));let ie=M?_(ye,be):u;return ie.width=ye,ie.height=be,ie.getContext("2d").drawImage(I,0,0,ye,be),Pe("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+ye+"x"+be+")."),ie}else return"data"in I&&Pe("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),I;return I}function m(I){return I.generateMipmaps}function S(I){s.generateMipmap(I)}function b(I){return I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?s.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function x(I,M,G,J,te,ye=!1){if(I!==null){if(s[I]!==void 0)return s[I];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let be;J&&(be=e.get("EXT_texture_norm16"),be||Pe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ie=M;if(M===s.RED&&(G===s.FLOAT&&(ie=s.R32F),G===s.HALF_FLOAT&&(ie=s.R16F),G===s.UNSIGNED_BYTE&&(ie=s.R8),G===s.UNSIGNED_SHORT&&be&&(ie=be.R16_EXT),G===s.SHORT&&be&&(ie=be.R16_SNORM_EXT)),M===s.RED_INTEGER&&(G===s.UNSIGNED_BYTE&&(ie=s.R8UI),G===s.UNSIGNED_SHORT&&(ie=s.R16UI),G===s.UNSIGNED_INT&&(ie=s.R32UI),G===s.BYTE&&(ie=s.R8I),G===s.SHORT&&(ie=s.R16I),G===s.INT&&(ie=s.R32I)),M===s.RG&&(G===s.FLOAT&&(ie=s.RG32F),G===s.HALF_FLOAT&&(ie=s.RG16F),G===s.UNSIGNED_BYTE&&(ie=s.RG8),G===s.UNSIGNED_SHORT&&be&&(ie=be.RG16_EXT),G===s.SHORT&&be&&(ie=be.RG16_SNORM_EXT)),M===s.RG_INTEGER&&(G===s.UNSIGNED_BYTE&&(ie=s.RG8UI),G===s.UNSIGNED_SHORT&&(ie=s.RG16UI),G===s.UNSIGNED_INT&&(ie=s.RG32UI),G===s.BYTE&&(ie=s.RG8I),G===s.SHORT&&(ie=s.RG16I),G===s.INT&&(ie=s.RG32I)),M===s.RGB_INTEGER&&(G===s.UNSIGNED_BYTE&&(ie=s.RGB8UI),G===s.UNSIGNED_SHORT&&(ie=s.RGB16UI),G===s.UNSIGNED_INT&&(ie=s.RGB32UI),G===s.BYTE&&(ie=s.RGB8I),G===s.SHORT&&(ie=s.RGB16I),G===s.INT&&(ie=s.RGB32I)),M===s.RGBA_INTEGER&&(G===s.UNSIGNED_BYTE&&(ie=s.RGBA8UI),G===s.UNSIGNED_SHORT&&(ie=s.RGBA16UI),G===s.UNSIGNED_INT&&(ie=s.RGBA32UI),G===s.BYTE&&(ie=s.RGBA8I),G===s.SHORT&&(ie=s.RGBA16I),G===s.INT&&(ie=s.RGBA32I)),M===s.RGB&&(G===s.UNSIGNED_SHORT&&be&&(ie=be.RGB16_EXT),G===s.SHORT&&be&&(ie=be.RGB16_SNORM_EXT),G===s.UNSIGNED_INT_5_9_9_9_REV&&(ie=s.RGB9_E5),G===s.UNSIGNED_INT_10F_11F_11F_REV&&(ie=s.R11F_G11F_B10F)),M===s.RGBA){let le=ye?Oo:At.getTransfer(te);G===s.FLOAT&&(ie=s.RGBA32F),G===s.HALF_FLOAT&&(ie=s.RGBA16F),G===s.UNSIGNED_BYTE&&(ie=le===Ht?s.SRGB8_ALPHA8:s.RGBA8),G===s.UNSIGNED_SHORT&&be&&(ie=be.RGBA16_EXT),G===s.SHORT&&be&&(ie=be.RGBA16_SNORM_EXT),G===s.UNSIGNED_SHORT_4_4_4_4&&(ie=s.RGBA4),G===s.UNSIGNED_SHORT_5_5_5_1&&(ie=s.RGB5_A1)}return(ie===s.R16F||ie===s.R32F||ie===s.RG16F||ie===s.RG32F||ie===s.RGBA16F||ie===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function A(I,M){let G;return I?M===null||M===_i||M===to?G=s.DEPTH24_STENCIL8:M===Hn?G=s.DEPTH32F_STENCIL8:M===eo&&(G=s.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===_i||M===to?G=s.DEPTH_COMPONENT24:M===Hn?G=s.DEPTH_COMPONENT32F:M===eo&&(G=s.DEPTH_COMPONENT16),G}function T(I,M){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==hn&&I.minFilter!==Kt?Math.log2(Math.max(M.width,M.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?M.mipmaps.length:1}function D(I){let M=I.target;M.removeEventListener("dispose",D),R(M),M.isVideoTexture&&h.delete(M),M.isHTMLTexture&&d.delete(M)}function v(I){let M=I.target;M.removeEventListener("dispose",v),O(M)}function R(I){let M=n.get(I);if(M.__webglInit===void 0)return;let G=I.source,J=f.get(G);if(J){let te=J[M.__cacheKey];te.usedTimes--,te.usedTimes===0&&L(I),Object.keys(J).length===0&&f.delete(G)}n.remove(I)}function L(I){let M=n.get(I);s.deleteTexture(M.__webglTexture);let G=I.source,J=f.get(G);delete J[M.__cacheKey],o.memory.textures--}function O(I){let M=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(M.__webglFramebuffer[J]))for(let te=0;te<M.__webglFramebuffer[J].length;te++)s.deleteFramebuffer(M.__webglFramebuffer[J][te]);else s.deleteFramebuffer(M.__webglFramebuffer[J]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[J])}else{if(Array.isArray(M.__webglFramebuffer))for(let J=0;J<M.__webglFramebuffer.length;J++)s.deleteFramebuffer(M.__webglFramebuffer[J]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let J=0;J<M.__webglColorRenderbuffer.length;J++)M.__webglColorRenderbuffer[J]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[J]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let G=I.textures;for(let J=0,te=G.length;J<te;J++){let ye=n.get(G[J]);ye.__webglTexture&&(s.deleteTexture(ye.__webglTexture),o.memory.textures--),n.remove(G[J])}n.remove(I)}let k=0;function Y(){k=0}function N(){return k}function B(I){k=I}function V(){let I=k;return I>=i.maxTextures&&Pe("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+i.maxTextures),k+=1,I}function X(I){let M=[];return M.push(I.wrapS),M.push(I.wrapT),M.push(I.wrapR||0),M.push(I.magFilter),M.push(I.minFilter),M.push(I.anisotropy),M.push(I.internalFormat),M.push(I.format),M.push(I.type),M.push(I.generateMipmaps),M.push(I.premultiplyAlpha),M.push(I.flipY),M.push(I.unpackAlignment),M.push(I.colorSpace),M.join()}function Q(I,M){let G=n.get(I);if(I.isVideoTexture&&F(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&G.__version!==I.version){let J=I.image;if(J===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{me(G,I,M);return}}else I.isExternalTexture&&(G.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,G.__webglTexture,s.TEXTURE0+M)}function q(I,M){let G=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&G.__version!==I.version){me(G,I,M);return}else I.isExternalTexture&&(G.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,G.__webglTexture,s.TEXTURE0+M)}function K(I,M){let G=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&G.__version!==I.version){me(G,I,M);return}t.bindTexture(s.TEXTURE_3D,G.__webglTexture,s.TEXTURE0+M)}function re(I,M){let G=n.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&G.__version!==I.version){nt(G,I,M);return}t.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture,s.TEXTURE0+M)}let ke={[Xs]:s.REPEAT,[jn]:s.CLAMP_TO_EDGE,[Do]:s.MIRRORED_REPEAT},He={[hn]:s.NEAREST,[od]:s.NEAREST_MIPMAP_NEAREST,[Qr]:s.NEAREST_MIPMAP_LINEAR,[Kt]:s.LINEAR,[xa]:s.LINEAR_MIPMAP_NEAREST,[Yi]:s.LINEAR_MIPMAP_LINEAR},wt={[lp]:s.NEVER,[fp]:s.ALWAYS,[cp]:s.LESS,[Gc]:s.LEQUAL,[hp]:s.EQUAL,[Wc]:s.GEQUAL,[up]:s.GREATER,[dp]:s.NOTEQUAL};function St(I,M){if(M.type===Hn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Kt||M.magFilter===xa||M.magFilter===Qr||M.magFilter===Yi||M.minFilter===Kt||M.minFilter===xa||M.minFilter===Qr||M.minFilter===Yi)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,ke[M.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,ke[M.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,ke[M.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,He[M.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,He[M.minFilter]),M.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,wt[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===hn||M.minFilter!==Qr&&M.minFilter!==Yi||M.type===Hn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let G=e.get("EXT_texture_filter_anisotropic");s.texParameterf(I,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function et(I,M){let G=!1;I.__webglInit===void 0&&(I.__webglInit=!0,M.addEventListener("dispose",D));let J=M.source,te=f.get(J);te===void 0&&(te={},f.set(J,te));let ye=X(M);if(ye!==I.__cacheKey){te[ye]===void 0&&(te[ye]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,G=!0),te[ye].usedTimes++;let be=te[I.__cacheKey];be!==void 0&&(te[I.__cacheKey].usedTimes--,be.usedTimes===0&&L(M)),I.__cacheKey=ye,I.__webglTexture=te[ye].texture}return G}function ee(I,M,G){return Math.floor(Math.floor(I/G)/M)}function se(I,M,G,J){let ye=I.updateRanges;if(ye.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,G,J,M.data);else{ye.sort((Ke,Ue)=>Ke.start-Ue.start);let be=0;for(let Ke=1;Ke<ye.length;Ke++){let Ue=ye[be],Le=ye[Ke],je=Ue.start+Ue.count,st=ee(Le.start,M.width,4),xt=ee(Ue.start,M.width,4);Le.start<=je+1&&st===xt&&ee(Le.start+Le.count-1,M.width,4)===st?Ue.count=Math.max(Ue.count,Le.start+Le.count-Ue.start):(++be,ye[be]=Le)}ye.length=be+1;let ie=t.getParameter(s.UNPACK_ROW_LENGTH),le=t.getParameter(s.UNPACK_SKIP_PIXELS),Ie=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let Ke=0,Ue=ye.length;Ke<Ue;Ke++){let Le=ye[Ke],je=Math.floor(Le.start/4),st=Math.ceil(Le.count/4),xt=je%M.width,H=Math.floor(je/M.width),Ce=st,ne=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,xt),t.pixelStorei(s.UNPACK_SKIP_ROWS,H),t.texSubImage2D(s.TEXTURE_2D,0,xt,H,Ce,ne,G,J,M.data)}I.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,ie),t.pixelStorei(s.UNPACK_SKIP_PIXELS,le),t.pixelStorei(s.UNPACK_SKIP_ROWS,Ie)}}function me(I,M,G){let J=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(J=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(J=s.TEXTURE_3D);let te=et(I,M),ye=M.source;t.bindTexture(J,I.__webglTexture,s.TEXTURE0+G);let be=n.get(ye);if(ye.version!==be.__version||te===!0){if(t.activeTexture(s.TEXTURE0+G),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let ne=At.getPrimaries(At.workingColorSpace),fe=M.colorSpace===ss?null:At.getPrimaries(M.colorSpace),De=M.colorSpace===ss||ne===fe?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,De)}t.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment);let le=g(M.image,!1,i.maxTextureSize);le=Pt(M,le);let Ie=r.convert(M.format,M.colorSpace),Ke=r.convert(M.type),Ue=x(M.internalFormat,Ie,Ke,M.normalized,M.colorSpace,M.isVideoTexture);St(J,M);let Le,je=M.mipmaps,st=M.isVideoTexture!==!0,xt=be.__version===void 0||te===!0,H=ye.dataReady,Ce=T(M,le);if(M.isDepthTexture)Ue=A(M.format===Ds,M.type),xt&&(st?t.texStorage2D(s.TEXTURE_2D,1,Ue,le.width,le.height):t.texImage2D(s.TEXTURE_2D,0,Ue,le.width,le.height,0,Ie,Ke,null));else if(M.isDataTexture)if(je.length>0){st&&xt&&t.texStorage2D(s.TEXTURE_2D,Ce,Ue,je[0].width,je[0].height);for(let ne=0,fe=je.length;ne<fe;ne++)Le=je[ne],st?H&&t.texSubImage2D(s.TEXTURE_2D,ne,0,0,Le.width,Le.height,Ie,Ke,Le.data):t.texImage2D(s.TEXTURE_2D,ne,Ue,Le.width,Le.height,0,Ie,Ke,Le.data);M.generateMipmaps=!1}else st?(xt&&t.texStorage2D(s.TEXTURE_2D,Ce,Ue,le.width,le.height),H&&se(M,le,Ie,Ke)):t.texImage2D(s.TEXTURE_2D,0,Ue,le.width,le.height,0,Ie,Ke,le.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){st&&xt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ce,Ue,je[0].width,je[0].height,le.depth);for(let ne=0,fe=je.length;ne<fe;ne++)if(Le=je[ne],M.format!==kn)if(Ie!==null)if(st){if(H)if(M.layerUpdates.size>0){let De=md(Le.width,Le.height,M.format,M.type);for(let he of M.layerUpdates){let Te=Le.data.subarray(he*De/Le.data.BYTES_PER_ELEMENT,(he+1)*De/Le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ne,0,0,he,Le.width,Le.height,1,Ie,Te)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ne,0,0,0,Le.width,Le.height,le.depth,Ie,Le.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ne,Ue,Le.width,Le.height,le.depth,0,Le.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else st?H&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,ne,0,0,0,Le.width,Le.height,le.depth,Ie,Ke,Le.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ne,Ue,Le.width,Le.height,le.depth,0,Ie,Ke,Le.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{st&&xt&&t.texStorage2D(s.TEXTURE_2D,Ce,Ue,je[0].width,je[0].height);for(let ne=0,fe=je.length;ne<fe;ne++)Le=je[ne],M.format!==kn?Ie!==null?st?H&&t.compressedTexSubImage2D(s.TEXTURE_2D,ne,0,0,Le.width,Le.height,Ie,Le.data):t.compressedTexImage2D(s.TEXTURE_2D,ne,Ue,Le.width,Le.height,0,Le.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):st?H&&t.texSubImage2D(s.TEXTURE_2D,ne,0,0,Le.width,Le.height,Ie,Ke,Le.data):t.texImage2D(s.TEXTURE_2D,ne,Ue,Le.width,Le.height,0,Ie,Ke,Le.data)}else if(M.isDataArrayTexture)if(st){if(xt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ce,Ue,le.width,le.height,le.depth),H)if(M.layerUpdates.size>0){let ne=md(le.width,le.height,M.format,M.type);for(let fe of M.layerUpdates){let De=le.data.subarray(fe*ne/le.data.BYTES_PER_ELEMENT,(fe+1)*ne/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,fe,le.width,le.height,1,Ie,Ke,De)}M.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,Ie,Ke,le.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ue,le.width,le.height,le.depth,0,Ie,Ke,le.data);else if(M.isData3DTexture)st?(xt&&t.texStorage3D(s.TEXTURE_3D,Ce,Ue,le.width,le.height,le.depth),H&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,Ie,Ke,le.data)):t.texImage3D(s.TEXTURE_3D,0,Ue,le.width,le.height,le.depth,0,Ie,Ke,le.data);else if(M.isFramebufferTexture){if(xt)if(st)t.texStorage2D(s.TEXTURE_2D,Ce,Ue,le.width,le.height);else{let ne=le.width,fe=le.height;for(let De=0;De<Ce;De++)t.texImage2D(s.TEXTURE_2D,De,Ue,ne,fe,0,Ie,Ke,null),ne>>=1,fe>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in s){let ne=s.canvas;if(ne.hasAttribute("layoutsubtree")||ne.setAttribute("layoutsubtree","true"),le.parentNode!==ne){ne.appendChild(le),d.add(M),ne.onpaint=fe=>{let De=fe.changedElements;for(let he of d)De.includes(he.image)&&(he.needsUpdate=!0)},ne.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,le);else{let De=s.RGBA,he=s.RGBA,Te=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,De,he,Te,le)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(je.length>0){if(st&&xt){let ne=_t(je[0]);t.texStorage2D(s.TEXTURE_2D,Ce,Ue,ne.width,ne.height)}for(let ne=0,fe=je.length;ne<fe;ne++)Le=je[ne],st?H&&t.texSubImage2D(s.TEXTURE_2D,ne,0,0,Ie,Ke,Le):t.texImage2D(s.TEXTURE_2D,ne,Ue,Ie,Ke,Le);M.generateMipmaps=!1}else if(st){if(xt){let ne=_t(le);t.texStorage2D(s.TEXTURE_2D,Ce,Ue,ne.width,ne.height)}H&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ie,Ke,le)}else t.texImage2D(s.TEXTURE_2D,0,Ue,Ie,Ke,le);m(M)&&S(J),be.__version=ye.version,M.onUpdate&&M.onUpdate(M)}I.__version=M.version}function nt(I,M,G){if(M.image.length!==6)return;let J=et(I,M),te=M.source;t.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+G);let ye=n.get(te);if(te.version!==ye.__version||J===!0){t.activeTexture(s.TEXTURE0+G);let be=At.getPrimaries(At.workingColorSpace),ie=M.colorSpace===ss?null:At.getPrimaries(M.colorSpace),le=M.colorSpace===ss||be===ie?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);let Ie=M.isCompressedTexture||M.image[0].isCompressedTexture,Ke=M.image[0]&&M.image[0].isDataTexture,Ue=[];for(let he=0;he<6;he++)!Ie&&!Ke?Ue[he]=g(M.image[he],!0,i.maxCubemapSize):Ue[he]=Ke?M.image[he].image:M.image[he],Ue[he]=Pt(M,Ue[he]);let Le=Ue[0],je=r.convert(M.format,M.colorSpace),st=r.convert(M.type),xt=x(M.internalFormat,je,st,M.normalized,M.colorSpace),H=M.isVideoTexture!==!0,Ce=ye.__version===void 0||J===!0,ne=te.dataReady,fe=T(M,Le);St(s.TEXTURE_CUBE_MAP,M);let De;if(Ie){H&&Ce&&t.texStorage2D(s.TEXTURE_CUBE_MAP,fe,xt,Le.width,Le.height);for(let he=0;he<6;he++){De=Ue[he].mipmaps;for(let Te=0;Te<De.length;Te++){let ze=De[Te];M.format!==kn?je!==null?H?ne&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Te,0,0,ze.width,ze.height,je,ze.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Te,xt,ze.width,ze.height,0,ze.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?ne&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Te,0,0,ze.width,ze.height,je,st,ze.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Te,xt,ze.width,ze.height,0,je,st,ze.data)}}}else{if(De=M.mipmaps,H&&Ce){De.length>0&&fe++;let he=_t(Ue[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,fe,xt,he.width,he.height)}for(let he=0;he<6;he++)if(Ke){H?ne&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Ue[he].width,Ue[he].height,je,st,Ue[he].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,xt,Ue[he].width,Ue[he].height,0,je,st,Ue[he].data);for(let Te=0;Te<De.length;Te++){let kt=De[Te].image[he].image;H?ne&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Te+1,0,0,kt.width,kt.height,je,st,kt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Te+1,xt,kt.width,kt.height,0,je,st,kt.data)}}else{H?ne&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,je,st,Ue[he]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,xt,je,st,Ue[he]);for(let Te=0;Te<De.length;Te++){let ze=De[Te];H?ne&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Te+1,0,0,je,st,ze.image[he]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Te+1,xt,je,st,ze.image[he])}}}m(M)&&S(s.TEXTURE_CUBE_MAP),ye.__version=te.version,M.onUpdate&&M.onUpdate(M)}I.__version=M.version}function Ae(I,M,G,J,te,ye){let be=r.convert(G.format,G.colorSpace),ie=r.convert(G.type),le=x(G.internalFormat,be,ie,G.normalized,G.colorSpace),Ie=n.get(M),Ke=n.get(G);if(Ke.__renderTarget=M,!Ie.__hasExternalTextures){let Ue=Math.max(1,M.width>>ye),Le=Math.max(1,M.height>>ye);te===s.TEXTURE_3D||te===s.TEXTURE_2D_ARRAY?t.texImage3D(te,ye,le,Ue,Le,M.depth,0,be,ie,null):t.texImage2D(te,ye,le,Ue,Le,0,be,ie,null)}t.bindFramebuffer(s.FRAMEBUFFER,I),dt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,te,Ke.__webglTexture,0,lt(M)):(te===s.TEXTURE_2D||te>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,J,te,Ke.__webglTexture,ye),t.bindFramebuffer(s.FRAMEBUFFER,null)}function at(I,M,G){if(s.bindRenderbuffer(s.RENDERBUFFER,I),M.depthBuffer){let J=M.depthTexture,te=J&&J.isDepthTexture?J.type:null,ye=A(M.stencilBuffer,te),be=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;dt(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,lt(M),ye,M.width,M.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,lt(M),ye,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ye,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,be,s.RENDERBUFFER,I)}else{let J=M.textures;for(let te=0;te<J.length;te++){let ye=J[te],be=r.convert(ye.format,ye.colorSpace),ie=r.convert(ye.type),le=x(ye.internalFormat,be,ie,ye.normalized,ye.colorSpace);dt(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,lt(M),le,M.width,M.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,lt(M),le,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,le,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Vt(I,M,G){let J=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,I),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let te=n.get(M.depthTexture);if(te.__renderTarget=M,(!te.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),J){if(te.__webglInit===void 0&&(te.__webglInit=!0,M.depthTexture.addEventListener("dispose",D)),te.__webglTexture===void 0){te.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,te.__webglTexture),St(s.TEXTURE_CUBE_MAP,M.depthTexture);let Ie=r.convert(M.depthTexture.format),Ke=r.convert(M.depthTexture.type),Ue;M.depthTexture.format===Oi?Ue=s.DEPTH_COMPONENT24:M.depthTexture.format===Ds&&(Ue=s.DEPTH24_STENCIL8);for(let Le=0;Le<6;Le++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,Ue,M.width,M.height,0,Ie,Ke,null)}}else Q(M.depthTexture,0);let ye=te.__webglTexture,be=lt(M),ie=J?s.TEXTURE_CUBE_MAP_POSITIVE_X+G:s.TEXTURE_2D,le=M.depthTexture.format===Ds?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(M.depthTexture.format===Oi)dt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,le,ie,ye,0,be):s.framebufferTexture2D(s.FRAMEBUFFER,le,ie,ye,0);else if(M.depthTexture.format===Ds)dt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,le,ie,ye,0,be):s.framebufferTexture2D(s.FRAMEBUFFER,le,ie,ye,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ce(I){let M=n.get(I),G=I.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==I.depthTexture){let J=I.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),J){let te=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,J.removeEventListener("dispose",te)};J.addEventListener("dispose",te),M.__depthDisposeCallback=te}M.__boundDepthTexture=J}if(I.depthTexture&&!M.__autoAllocateDepthBuffer)if(G)for(let J=0;J<6;J++)Vt(M.__webglFramebuffer[J],I,J);else{let J=I.texture.mipmaps;J&&J.length>0?Vt(M.__webglFramebuffer[0],I,0):Vt(M.__webglFramebuffer,I,0)}else if(G){M.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[J]),M.__webglDepthbuffer[J]===void 0)M.__webglDepthbuffer[J]=s.createRenderbuffer(),at(M.__webglDepthbuffer[J],I,!1);else{let te=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ye=M.__webglDepthbuffer[J];s.bindRenderbuffer(s.RENDERBUFFER,ye),s.framebufferRenderbuffer(s.FRAMEBUFFER,te,s.RENDERBUFFER,ye)}}else{let J=I.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),at(M.__webglDepthbuffer,I,!1);else{let te=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ye=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ye),s.framebufferRenderbuffer(s.FRAMEBUFFER,te,s.RENDERBUFFER,ye)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function pe(I,M,G){let J=n.get(I);M!==void 0&&Ae(J.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),G!==void 0&&ce(I)}function ge(I){let M=I.texture,G=n.get(I),J=n.get(M);I.addEventListener("dispose",v);let te=I.textures,ye=I.isWebGLCubeRenderTarget===!0,be=te.length>1;if(be||(J.__webglTexture===void 0&&(J.__webglTexture=s.createTexture()),J.__version=M.version,o.memory.textures++),ye){G.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer[ie]=[];for(let le=0;le<M.mipmaps.length;le++)G.__webglFramebuffer[ie][le]=s.createFramebuffer()}else G.__webglFramebuffer[ie]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer=[];for(let ie=0;ie<M.mipmaps.length;ie++)G.__webglFramebuffer[ie]=s.createFramebuffer()}else G.__webglFramebuffer=s.createFramebuffer();if(be)for(let ie=0,le=te.length;ie<le;ie++){let Ie=n.get(te[ie]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=s.createTexture(),o.memory.textures++)}if(I.samples>0&&dt(I)===!1){G.__webglMultisampledFramebuffer=s.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let ie=0;ie<te.length;ie++){let le=te[ie];G.__webglColorRenderbuffer[ie]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,G.__webglColorRenderbuffer[ie]);let Ie=r.convert(le.format,le.colorSpace),Ke=r.convert(le.type),Ue=x(le.internalFormat,Ie,Ke,le.normalized,le.colorSpace,I.isXRRenderTarget===!0),Le=lt(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,Le,Ue,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ie,s.RENDERBUFFER,G.__webglColorRenderbuffer[ie])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(G.__webglDepthRenderbuffer=s.createRenderbuffer(),at(G.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ye){t.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),St(s.TEXTURE_CUBE_MAP,M);for(let ie=0;ie<6;ie++)if(M.mipmaps&&M.mipmaps.length>0)for(let le=0;le<M.mipmaps.length;le++)Ae(G.__webglFramebuffer[ie][le],I,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,le);else Ae(G.__webglFramebuffer[ie],I,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);m(M)&&S(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let ie=0,le=te.length;ie<le;ie++){let Ie=te[ie],Ke=n.get(Ie),Ue=s.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Ue=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Ue,Ke.__webglTexture),St(Ue,Ie),Ae(G.__webglFramebuffer,I,Ie,s.COLOR_ATTACHMENT0+ie,Ue,0),m(Ie)&&S(Ue)}t.unbindTexture()}else{let ie=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ie=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ie,J.__webglTexture),St(ie,M),M.mipmaps&&M.mipmaps.length>0)for(let le=0;le<M.mipmaps.length;le++)Ae(G.__webglFramebuffer[le],I,M,s.COLOR_ATTACHMENT0,ie,le);else Ae(G.__webglFramebuffer,I,M,s.COLOR_ATTACHMENT0,ie,0);m(M)&&S(ie),t.unbindTexture()}I.depthBuffer&&ce(I)}function _e(I){let M=I.textures;for(let G=0,J=M.length;G<J;G++){let te=M[G];if(m(te)){let ye=b(I),be=n.get(te).__webglTexture;t.bindTexture(ye,be),S(ye),t.unbindTexture()}}}let we=[],it=[];function tt(I){if(I.samples>0){if(dt(I)===!1){let M=I.textures,G=I.width,J=I.height,te=s.COLOR_BUFFER_BIT,ye=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,be=n.get(I),ie=M.length>1;if(ie)for(let Ie=0;Ie<M.length;Ie++)t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);let le=I.texture.mipmaps;le&&le.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Ie=0;Ie<M.length;Ie++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(te|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(te|=s.STENCIL_BUFFER_BIT)),ie){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,be.__webglColorRenderbuffer[Ie]);let Ke=n.get(M[Ie]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ke,0)}s.blitFramebuffer(0,0,G,J,0,0,G,J,te,s.NEAREST),l===!0&&(we.length=0,it.length=0,we.push(s.COLOR_ATTACHMENT0+Ie),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(we.push(ye),it.push(ye),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,it)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,we))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ie)for(let Ie=0;Ie<M.length;Ie++){t.bindFramebuffer(s.FRAMEBUFFER,be.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.RENDERBUFFER,be.__webglColorRenderbuffer[Ie]);let Ke=n.get(M[Ie]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,be.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ie,s.TEXTURE_2D,Ke,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&l){let M=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function lt(I){return Math.min(i.maxSamples,I.samples)}function dt(I){let M=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function F(I){let M=o.render.frame;h.get(I)!==M&&(h.set(I,M),I.update())}function Pt(I,M){let G=I.colorSpace,J=I.format,te=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||G!==Fo&&G!==ss&&(At.getTransfer(G)===Ht?(J!==kn||te!==ni)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$e("WebGLTextures: Unsupported texture color space:",G)),M}function _t(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=Y,this.getTextureUnits=N,this.setTextureUnits=B,this.setTexture2D=Q,this.setTexture2DArray=q,this.setTexture3D=K,this.setTextureCube=re,this.rebindTextures=pe,this.setupRenderTarget=ge,this.updateRenderTargetMipmap=_e,this.updateMultisampleRenderTarget=tt,this.setupDepthRenderbuffer=ce,this.setupFrameBufferTexture=Ae,this.useMultisampledRTT=dt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function $0(s,e){function t(n,i=ss){let r,o=At.getTransfer(i);if(n===ni)return s.UNSIGNED_BYTE;if(n===ac)return s.UNSIGNED_SHORT_4_4_4_4;if(n===lc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===cd)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===hd)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===ad)return s.BYTE;if(n===ld)return s.SHORT;if(n===eo)return s.UNSIGNED_SHORT;if(n===oc)return s.INT;if(n===_i)return s.UNSIGNED_INT;if(n===Hn)return s.FLOAT;if(n===Ri)return s.HALF_FLOAT;if(n===ud)return s.ALPHA;if(n===dd)return s.RGB;if(n===kn)return s.RGBA;if(n===Oi)return s.DEPTH_COMPONENT;if(n===Ds)return s.DEPTH_STENCIL;if(n===cc)return s.RED;if(n===ya)return s.RED_INTEGER;if(n===Ns)return s.RG;if(n===hc)return s.RG_INTEGER;if(n===uc)return s.RGBA_INTEGER;if(n===va||n===Sa||n===Ma||n===ba)if(o===Ht)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===va)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===va)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Sa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===dc||n===fc||n===pc||n===mc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===dc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===fc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===pc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===mc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===gc||n===_c||n===xc||n===yc||n===vc||n===Ea||n===Sc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===gc||n===_c)return o===Ht?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===xc)return o===Ht?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===yc)return r.COMPRESSED_R11_EAC;if(n===vc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ea)return r.COMPRESSED_RG11_EAC;if(n===Sc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Mc||n===bc||n===Ec||n===wc||n===Tc||n===Ac||n===Rc||n===Cc||n===Pc||n===Ic||n===Lc||n===Dc||n===Nc||n===Uc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Mc)return o===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===bc)return o===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ec)return o===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wc)return o===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Tc)return o===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ac)return o===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Rc)return o===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Cc)return o===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Pc)return o===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ic)return o===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Lc)return o===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Dc)return o===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Nc)return o===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Uc)return o===Ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Fc||n===Oc||n===Bc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Fc)return o===Ht?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Oc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Bc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===zc||n===Vc||n===wa||n===Hc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===zc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Vc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Hc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===to?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var eE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,tE=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Np=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Xo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ln({vertexShader:eE,fragmentShader:tE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ot(new wi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Up=class extends li{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,p=null,_=typeof XRWebGLBinding<"u",g=new Np,m={},S=t.getContextAttributes(),b=null,x=null,A=[],T=[],D=new ae,v=null,R=null,L=new cn;L.viewport=new Lt;let O=new cn;O.viewport=new Lt;let k=[L,O],Y=new Ql,N=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let se=A[ee];return se===void 0&&(se=new Lr,A[ee]=se),se.getTargetRaySpace()},this.getControllerGrip=function(ee){let se=A[ee];return se===void 0&&(se=new Lr,A[ee]=se),se.getGripSpace()},this.getHand=function(ee){let se=A[ee];return se===void 0&&(se=new Lr,A[ee]=se),se.getHandSpace()};function V(ee){let se=T.indexOf(ee.inputSource);if(se===-1)return;let me=A[se];me!==void 0&&(me.update(ee.inputSource,ee.frame,c||o),me.dispatchEvent({type:ee.type,data:ee.inputSource}))}function X(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",Q);for(let ee=0;ee<A.length;ee++){let se=T[ee];se!==null&&(T[ee]=null,A[ee].disconnect(se))}N=null,B=null,g.reset();for(let ee in m)delete m[ee];if(e.setRenderTarget(b),f=null,u=null,d=null,i=null,x=null,et.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(D.width,D.height,!1),R!==null){let ee=R.camera;ee.fov=R.fov,ee.zoom=R.zoom,ee.updateProjectionMatrix(),R=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){r=ee,n.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){a=ee,n.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(ee){c=ee},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(ee){if(i=ee,i!==null){if(b=e.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",X),i.addEventListener("inputsourceschange",Q),S.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(D),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,nt=null,Ae=null;S.depth&&(Ae=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=S.stencil?Ds:Oi,nt=S.stencil?to:_i);let at={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(at),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new Pn(u.textureWidth,u.textureHeight,{format:kn,type:ni,depthTexture:new bs(u.textureWidth,u.textureHeight,nt,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let me={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,me),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new Pn(f.framebufferWidth,f.framebufferHeight,{format:kn,type:ni,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),et.setContext(i),et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Q(ee){for(let se=0;se<ee.removed.length;se++){let me=ee.removed[se],nt=T.indexOf(me);nt>=0&&(T[nt]=null,A[nt].disconnect(me))}for(let se=0;se<ee.added.length;se++){let me=ee.added[se],nt=T.indexOf(me);if(nt===-1){for(let at=0;at<A.length;at++)if(at>=T.length){T.push(me),nt=at;break}else if(T[at]===null){T[at]=me,nt=at;break}if(nt===-1)break}let Ae=A[nt];Ae&&Ae.connect(me)}}let q=new E,K=new E;function re(ee,se,me){q.setFromMatrixPosition(se.matrixWorld),K.setFromMatrixPosition(me.matrixWorld);let nt=q.distanceTo(K),Ae=se.projectionMatrix.elements,at=me.projectionMatrix.elements,Vt=Ae[14]/(Ae[10]-1),ce=Ae[14]/(Ae[10]+1),pe=(Ae[9]+1)/Ae[5],ge=(Ae[9]-1)/Ae[5],_e=(Ae[8]-1)/Ae[0],we=(at[8]+1)/at[0],it=Vt*_e,tt=Vt*we,lt=nt/(-_e+we),dt=lt*-_e;if(se.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(dt),ee.translateZ(lt),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),Ae[10]===-1)ee.projectionMatrix.copy(se.projectionMatrix),ee.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{let F=Vt+lt,Pt=ce+lt,_t=it-dt,I=tt+(nt-dt),M=pe*ce/Pt*F,G=ge*ce/Pt*F;ee.projectionMatrix.makePerspective(_t,I,M,G,F,Pt),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function ke(ee,se){se===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(se.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(i===null)return;let se=ee.near,me=ee.far;g.texture!==null&&(g.depthNear>0&&(se=g.depthNear),g.depthFar>0&&(me=g.depthFar)),Y.near=O.near=L.near=se,Y.far=O.far=L.far=me,(N!==Y.near||B!==Y.far)&&(i.updateRenderState({depthNear:Y.near,depthFar:Y.far}),N=Y.near,B=Y.far),Y.layers.mask=ee.layers.mask|6,L.layers.mask=Y.layers.mask&-5,O.layers.mask=Y.layers.mask&-3;let nt=ee.parent,Ae=Y.cameras;ke(Y,nt);for(let at=0;at<Ae.length;at++)ke(Ae[at],nt);Ae.length===2?re(Y,L,O):Y.projectionMatrix.copy(L.projectionMatrix),R===null&&ee.isPerspectiveCamera&&(R={camera:ee,fov:ee.fov,zoom:ee.zoom}),He(ee,Y,nt)};function He(ee,se,me){me===null?ee.matrix.copy(se.matrixWorld):(ee.matrix.copy(me.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(se.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(se.projectionMatrix),ee.projectionMatrixInverse.copy(se.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=Rr*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return Y},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(ee){l=ee,u!==null&&(u.fixedFoveation=ee),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ee)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(Y)},this.getCameraTexture=function(ee){return m[ee]};let wt=null;function St(ee,se){if(h=se.getViewerPose(c||o),p=se,h!==null){let me=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let nt=!1;me.length!==Y.cameras.length&&(Y.cameras.length=0,nt=!0);for(let ce=0;ce<me.length;ce++){let pe=me[ce],ge=null;if(f!==null)ge=f.getViewport(pe);else{let we=d.getViewSubImage(u,pe);ge=we.viewport,ce===0&&(e.setRenderTargetTextures(x,we.colorTexture,we.depthStencilTexture),e.setRenderTarget(x))}let _e=k[ce];_e===void 0&&(_e=new cn,_e.layers.enable(ce),_e.viewport=new Lt,k[ce]=_e),_e.matrix.fromArray(pe.transform.matrix),_e.matrix.decompose(_e.position,_e.quaternion,_e.scale),_e.projectionMatrix.fromArray(pe.projectionMatrix),_e.projectionMatrixInverse.copy(_e.projectionMatrix).invert(),_e.viewport.set(ge.x,ge.y,ge.width,ge.height),ce===0&&(Y.matrix.copy(_e.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale)),nt===!0&&Y.cameras.push(_e)}let Ae=i.enabledFeatures;if(Ae&&Ae.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let ce=d.getDepthInformation(me[0]);ce&&ce.isValid&&ce.texture&&g.init(ce,i.renderState)}if(Ae&&Ae.includes("camera-access")&&_){e.state.unbindTexture(),d=n.getBinding();for(let ce=0;ce<me.length;ce++){let pe=me[ce].camera;if(pe){let ge=m[pe];ge||(ge=new Xo,m[pe]=ge);let _e=d.getCameraImage(pe);ge.sourceTexture=_e}}}}for(let me=0;me<A.length;me++){let nt=T[me],Ae=A[me];nt!==null&&Ae!==void 0&&Ae.update(nt,se,c||o)}wt&&wt(ee,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),p=null}let et=new X0;et.setAnimationLoop(St),this.setAnimationLoop=function(ee){wt=ee},this.dispose=function(){}}},nE=new ht,j0=new pt;j0.set(-1,0,0,0,1,0,0,0,1);function iE(s,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,_p(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,S,b,x){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,x)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,S,b):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Cn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Cn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let S=e.get(m),b=S.envMap,x=S.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(nE.makeRotationFromEuler(x)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(j0),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,S,b){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*S,g.scale.value=b*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,S){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Cn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=S.texture,g.transmissionSamplerSize.value.set(S.width,S.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){let S=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(S.matrixWorld),g.nearDistance.value=S.shadow.camera.near,g.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function sE(s,e,t,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,A){let T=A.program;n.uniformBlockBinding(x,T)}function c(x,A){let T=i[x.id];T===void 0&&(g(x),T=h(x),i[x.id]=T,x.addEventListener("dispose",S));let D=A.program;n.updateUBOMapping(x,D);let v=e.render.frame;r[x.id]!==v&&(u(x),r[x.id]=v)}function h(x){let A=d();x.__bindingPointIndex=A;let T=s.createBuffer(),D=x.__size,v=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,D,v),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,A,T),T}function d(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return $e("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){let A=i[x.id],T=x.uniforms,D=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,A);for(let v=0,R=T.length;v<R;v++){let L=T[v];if(Array.isArray(L))for(let O=0,k=L.length;O<k;O++)f(L[O],v,O,D);else f(L,v,0,D)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,A,T,D){if(_(x,A,T,D)===!0){let v=x.__offset,R=x.value;if(Array.isArray(R)){let L=0;for(let O=0;O<R.length;O++){let k=R[O],Y=m(k);p(k,x.__data,L),typeof k!="number"&&typeof k!="boolean"&&!k.isMatrix3&&!ArrayBuffer.isView(k)&&(L+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(R,x.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,v,x.__data)}}function p(x,A,T){typeof x=="number"||typeof x=="boolean"?A[0]=x:x.isMatrix3?(A[0]=x.elements[0],A[1]=x.elements[1],A[2]=x.elements[2],A[3]=0,A[4]=x.elements[3],A[5]=x.elements[4],A[6]=x.elements[5],A[7]=0,A[8]=x.elements[6],A[9]=x.elements[7],A[10]=x.elements[8],A[11]=0):ArrayBuffer.isView(x)?A.set(new x.constructor(x.buffer,x.byteOffset,A.length)):x.toArray(A,T)}function _(x,A,T,D){let v=x.value,R=A+"_"+T;if(D[R]===void 0)return typeof v=="number"||typeof v=="boolean"?D[R]=v:ArrayBuffer.isView(v)?D[R]=v.slice():D[R]=v.clone(),!0;{let L=D[R];if(typeof v=="number"||typeof v=="boolean"){if(L!==v)return D[R]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(L.equals(v)===!1)return L.copy(v),!0}}return!1}function g(x){let A=x.uniforms,T=0,D=16;for(let R=0,L=A.length;R<L;R++){let O=Array.isArray(A[R])?A[R]:[A[R]];for(let k=0,Y=O.length;k<Y;k++){let N=O[k],B=Array.isArray(N.value)?N.value:[N.value];for(let V=0,X=B.length;V<X;V++){let Q=B[V],q=m(Q),K=T%D,re=K%q.boundary,ke=K+re;T+=re,ke!==0&&D-ke<q.storage&&(T+=D-ke),N.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=T,T+=q.storage}}}let v=T%D;return v>0&&(T+=D-v),x.__size=T,x.__cache={},this}function m(x){let A={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(A.boundary=4,A.storage=4):x.isVector2?(A.boundary=8,A.storage=8):x.isVector3||x.isColor?(A.boundary=16,A.storage=12):x.isVector4?(A.boundary=16,A.storage=16):x.isMatrix3?(A.boundary=48,A.storage=48):x.isMatrix4?(A.boundary=64,A.storage=64):x.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(A.boundary=16,A.storage=x.byteLength):Pe("WebGLRenderer: Unsupported uniform value type.",x),A}function S(x){let A=x.target;A.removeEventListener("dispose",S);let T=o.indexOf(A.__bindingPointIndex);o.splice(T,1),s.deleteBuffer(i[A.id]),delete i[A.id],delete r[A.id]}function b(){for(let x in i)s.deleteBuffer(i[x]);o=[],i={},r={}}return{bind:l,update:c,dispose:b}}var rE=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),rs=null;function oE(){return rs===null&&(rs=new Qn(rE,16,16,Ns,Ri),rs.name="DFG_LUT",rs.minFilter=Kt,rs.magFilter=Kt,rs.wrapS=jn,rs.wrapT=jn,rs.generateMipmaps=!1,rs.needsUpdate=!0),rs}var Kc=class{constructor(e={}){let{canvas:t=pp(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=ni}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let _=f,g=new Set([uc,hc,ya]),m=new Set([ni,_i,eo,to,ac,lc]),S=new Uint32Array(4),b=new Int32Array(4),x=new E,A=null,T=null,D=[],v=[],R=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let L=this,O=!1,k=null,Y=null,N=null,B=null;this._outputColorSpace=Rn;let V=0,X=0,Q=null,q=-1,K=null,re=new Lt,ke=new Lt,He=null,wt=new Be(0),St=0,et=t.width,ee=t.height,se=1,me=null,nt=null,Ae=new Lt(0,0,et,ee),at=new Lt(0,0,et,ee),Vt=!1,ce=new Qi,pe=!1,ge=!1,_e=new ht,we=new E,it=new Lt,tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},lt=!1;function dt(){return Q===null?se:1}let F=n;function Pt(w,z){return t.getContext(w,z)}let _t,I,M,G,J,te,ye,be,ie,le,Ie,Ke,Ue,Le,je,st,xt,H,Ce,ne,fe,De,he;try{let w={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",kt,!1),t.addEventListener("webglcontextrestored",mt,!1),t.addEventListener("webglcontextcreationerror",Mn,!1),F===null){let z="webgl2";if(F=Pt(z,w),F===null)throw Pt(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Te()}catch(w){throw t.removeEventListener("webglcontextlost",kt,!1),t.removeEventListener("webglcontextrestored",mt,!1),t.removeEventListener("webglcontextcreationerror",Mn,!1),$e("WebGLRenderer: "+w.message),w}function Te(){_t=new pM(F),_t.init(),fe=new $0(F,_t),I=new sM(F,_t,e,fe),M=new jb(F,_t),I.reversedDepthBuffer&&u&&M.buffers.depth.setReversed(!0),Y=F.createFramebuffer(),N=F.createFramebuffer(),B=F.createFramebuffer(),G=new _M(F),J=new Bb,te=new Qb(F,_t,M,J,I,fe,G),ye=new fM(L),be=new yy(F),De=new nM(F,be),ie=new mM(F,be,G,De),le=new yM(F,ie,be,De,G),H=new xM(F,I,te),je=new rM(J),Ie=new Ob(L,ye,_t,I,De,je),Ke=new iE(L,J),Ue=new Vb,Le=new Yb(_t),xt=new tM(L,ye,M,le,p,l),st=new $b(L,le,I),he=new sE(F,G,I,M),Ce=new iM(F,_t,G),ne=new gM(F,_t,G),G.programs=Ie.programs,L.capabilities=I,L.extensions=_t,L.properties=J,L.renderLists=Ue,L.shadowMap=st,L.state=M,L.info=G}_!==ni&&(R=new SM(_,t.width,t.height,a,i,r));let ze=new Up(L,F);this.xr=ze,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let w=_t.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=_t.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return se},this.setPixelRatio=function(w){w!==void 0&&(se=w,this.setSize(et,ee,!1))},this.getSize=function(w){return w.set(et,ee)},this.setSize=function(w,z,$=!0){if(ze.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}et=w,ee=z,t.width=Math.floor(w*se),t.height=Math.floor(z*se),$===!0&&(t.style.width=w+"px",t.style.height=z+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,w,z)},this.getDrawingBufferSize=function(w){return w.set(et*se,ee*se).floor()},this.setDrawingBufferSize=function(w,z,$){et=w,ee=z,se=$,t.width=Math.floor(w*$),t.height=Math.floor(z*$),this.setViewport(0,0,w,z)},this.setEffects=function(w){if(_===ni){$e("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let z=0;z<w.length;z++)if(w[z].isOutputPass===!0){Pe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(re)},this.getViewport=function(w){return w.copy(Ae)},this.setViewport=function(w,z,$,W){w.isVector4?Ae.set(w.x,w.y,w.z,w.w):Ae.set(w,z,$,W),M.viewport(re.copy(Ae).multiplyScalar(se).round())},this.getScissor=function(w){return w.copy(at)},this.setScissor=function(w,z,$,W){w.isVector4?at.set(w.x,w.y,w.z,w.w):at.set(w,z,$,W),M.scissor(ke.copy(at).multiplyScalar(se).round())},this.getScissorTest=function(){return Vt},this.setScissorTest=function(w){M.setScissorTest(Vt=w)},this.setOpaqueSort=function(w){me=w},this.setTransparentSort=function(w){nt=w},this.getClearColor=function(w){return w.copy(xt.getClearColor())},this.setClearColor=function(){xt.setClearColor(...arguments)},this.getClearAlpha=function(){return xt.getClearAlpha()},this.setClearAlpha=function(){xt.setClearAlpha(...arguments)},this.clear=function(w=!0,z=!0,$=!0){let W=0;if(w){let Z=!1;if(Q!==null){let Fe=Q.texture.format;Z=g.has(Fe)}if(Z){let Fe=Q.texture.type,Ge=m.has(Fe),Me=xt.getClearColor(),qe=xt.getClearAlpha(),Je=Me.r,ft=Me.g,ot=Me.b;Ge?(S[0]=Je,S[1]=ft,S[2]=ot,S[3]=qe,F.clearBufferuiv(F.COLOR,0,S)):(b[0]=Je,b[1]=ft,b[2]=ot,b[3]=qe,F.clearBufferiv(F.COLOR,0,b))}else W|=F.COLOR_BUFFER_BIT}z&&(W|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(W|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&F.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),k=w},this.dispose=function(){t.removeEventListener("webglcontextlost",kt,!1),t.removeEventListener("webglcontextrestored",mt,!1),t.removeEventListener("webglcontextcreationerror",Mn,!1),xt.dispose(),Ue.dispose(),Le.dispose(),J.dispose(),ye.dispose(),le.dispose(),De.dispose(),he.dispose(),Ie.dispose(),ze.dispose(),ze.removeEventListener("sessionstart",Ua),ze.removeEventListener("sessionend",ao),qn.stop()};function kt(w){w.preventDefault(),zo("WebGLRenderer: Context Lost."),O=!0}function mt(){zo("WebGLRenderer: Context Restored."),O=!1;let w=G.autoReset,z=st.enabled,$=st.autoUpdate,W=st.needsUpdate,Z=st.type;Te(),G.autoReset=w,st.enabled=z,st.autoUpdate=$,st.needsUpdate=W,st.type=Z}function Mn(w){$e("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function bn(w){let z=w.target;z.removeEventListener("dispose",bn),kp(z)}function kp(w){Na(w),J.remove(w)}function Na(w){let z=J.get(w).programs;z!==void 0&&(z.forEach(function($){Ie.releaseProgram($)}),w.isShaderMaterial&&Ie.releaseShaderCache(w))}this.renderBufferDirect=function(w,z,$,W,Z,Fe){z===null&&(z=tt);let Ge=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,Me=an(w,z,$,W,Z);M.setMaterial(W,Ge);let qe=$.index,Je=1;if(W.wireframe===!0){if(qe=ie.getWireframeAttribute($),qe===void 0)return;Je=2}let ft=$.drawRange,ot=$.attributes.position,We=ft.start*Je,Bt=(ft.start+ft.count)*Je;Fe!==null&&(We=Math.max(We,Fe.start*Je),Bt=Math.min(Bt,(Fe.start+Fe.count)*Je)),qe!==null?(We=Math.max(We,0),Bt=Math.min(Bt,qe.count)):ot!=null&&(We=Math.max(We,0),Bt=Math.min(Bt,ot.count));let Qt=Bt-We;if(Qt<0||Qt===1/0)return;De.setup(Z,W,Me,$,qe);let zt,Rt=Ce;if(qe!==null&&(zt=be.get(qe),Rt=ne,Rt.setIndex(zt)),Z.isMesh)W.wireframe===!0?(M.setLineWidth(W.wireframeLinewidth*dt()),Rt.setMode(F.LINES)):Rt.setMode(F.TRIANGLES);else if(Z.isLine){let en=W.linewidth;en===void 0&&(en=1),M.setLineWidth(en*dt()),Z.isLineSegments?Rt.setMode(F.LINES):Z.isLineLoop?Rt.setMode(F.LINE_LOOP):Rt.setMode(F.LINE_STRIP)}else Z.isPoints?Rt.setMode(F.POINTS):Z.isSprite&&Rt.setMode(F.TRIANGLES);if(Z.isBatchedMesh)if(_t.get("WEBGL_multi_draw"))Rt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{let en=Z._multiDrawStarts,Oe=Z._multiDrawCounts,Tn=Z._multiDrawCount,Tt=qe?be.get(qe).bytesPerElement:1,pn=J.get(W).currentProgram.getUniforms();for(let yi=0;yi<Tn;yi++)pn.setValue(F,"_gl_DrawID",yi),Rt.render(en[yi]/Tt,Oe[yi])}else if(Z.isInstancedMesh)Rt.renderInstances(We,Qt,Z.count);else if($.isInstancedBufferGeometry){let en=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Oe=Math.min($.instanceCount,en);Rt.renderInstances(We,Qt,Oe)}else Rt.render(We,Qt)};function cr(w,z,$,W){k!==null&&w.isNodeMaterial&&k.setObject(W,w),pe===!0&&je.setState(w,$,!1),w.transparent===!0&&w.side===gi&&w.forceSinglePass===!1?(w.side=Cn,w.needsUpdate=!0,dr(w,z,W),w.side=Is,w.needsUpdate=!0,dr(w,z,W),w.side=gi):dr(w,z,W)}this.compile=function(w,z,$=null){$===null&&($=w),k!==null&&k.renderStart(w,z,$),T=Le.get($),T.init(z),v.push(T),$.traverseVisible(function(Z){Z.isLight&&Z.layers.test(z.layers)&&(T.pushLight(Z),Z.castShadow&&T.pushShadow(Z))}),w!==$&&w.traverseVisible(function(Z){Z.isLight&&Z.layers.test(z.layers)&&(T.pushLight(Z),Z.castShadow&&T.pushShadow(Z))}),T.setupLights(),k!==null&&k.updateLights(T.state.lightsArray),ge=this.localClippingEnabled,pe=je.init(this.clippingPlanes,ge),pe===!0&&je.setGlobalState(this.clippingPlanes,z),k!==null&&st.render(T.state.shadowsArray,$,z);let W=new Set;return w.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;let Fe=Z.material;if(Fe)if(Array.isArray(Fe))for(let Ge=0;Ge<Fe.length;Ge++){let Me=Fe[Ge];cr(Me,$,z,Z),W.add(Me)}else cr(Fe,$,z,Z),W.add(Fe)}),T=v.pop(),k!==null&&k.renderEnd(),W},this.compileAsync=function(w,z,$=null){let W=this.compile(w,z,$);return new Promise(Z=>{function Fe(){if(W.forEach(function(Ge){let qe=J.get(Ge).currentProgram;(qe===void 0||qe.isReady())&&W.delete(Ge)}),W.size===0){Z(w);return}setTimeout(Fe,10)}_t.get("KHR_parallel_shader_compile")!==null?Fe():setTimeout(Fe,10)})};let ii=null;function hr(w){ii&&ii(w)}function Ua(){qn.stop()}function ao(){qn.start()}let qn=new X0;qn.setAnimationLoop(hr),typeof self<"u"&&qn.setContext(self),this.setAnimationLoop=function(w){ii=w,ze.setAnimationLoop(w),w===null?qn.stop():qn.start()},ze.addEventListener("sessionstart",Ua),ze.addEventListener("sessionend",ao),this.render=function(w,z){if(z!==void 0&&z.isCamera!==!0){$e("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;k!==null&&k.renderStart(w,z);let $=ze.enabled===!0&&ze.isPresenting===!0,W=R!==null&&(Q===null||$)&&R.begin(L,Q);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ze.enabled===!0&&ze.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(ze.cameraAutoUpdate===!0&&ze.updateCamera(z),z=ze.getCamera()),w.isScene===!0&&w.onBeforeRender(L,w,z,Q),T=Le.get(w,v.length),T.init(z),T.state.textureUnits=te.getTextureUnits(),v.push(T),_e.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),ce.setFromProjectionMatrix(_e,ai,z.reversedDepth),ge=this.localClippingEnabled,pe=je.init(this.clippingPlanes,ge),A=Ue.get(w,D.length),A.init(),D.push(A),ze.enabled===!0&&ze.isPresenting===!0){let Ge=L.xr.getDepthSensingMesh();Ge!==null&&Fs(Ge,z,-1/0,L.sortObjects)}Fs(w,z,0,L.sortObjects),A.finish(),k!==null&&k.updateLights(T.state.lightsArray),L.sortObjects===!0&&A.sort(me,nt),lt=ze.enabled===!1||ze.isPresenting===!1||ze.hasDepthSensing()===!1,lt&&xt.addToRenderList(A,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),pe===!0&&je.beginShadows();let Z=T.state.shadowsArray;if(st.render(Z,w,z),pe===!0&&je.endShadows(),(W&&R.hasRenderPass())===!1){let Ge=A.opaque,Me=A.transmissive;if(T.setupLights(),z.isArrayCamera){let qe=z.cameras;if(Me.length>0)for(let Je=0,ft=qe.length;Je<ft;Je++){let ot=qe[Je];Zi(Ge,Me,w,ot)}lt&&xt.render(w);for(let Je=0,ft=qe.length;Je<ft;Je++){let ot=qe[Je];En(A,w,ot,ot.viewport)}}else Me.length>0&&Zi(Ge,Me,w,z),lt&&xt.render(w),En(A,w,z)}Q!==null&&X===0&&(te.updateMultisampleRenderTarget(Q),te.updateRenderTargetMipmap(Q)),W&&R.end(L),w.isScene===!0&&w.onAfterRender(L,w,z),De.resetDefaultState(),q=-1,K=null,v.pop(),v.length>0?(T=v[v.length-1],te.setTextureUnits(T.state.textureUnits),pe===!0&&je.setGlobalState(L.clippingPlanes,T.state.camera)):T=null,D.pop(),D.length>0?A=D[D.length-1]:A=null,k!==null&&k.renderEnd()};function Fs(w,z,$,W){if(w.visible===!1)return;if(w.layers.test(z.layers)){if(w.isGroup)$=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(z);else if(w.isLightProbeGrid)T.pushLightProbeGrid(w);else if(w.isLight)T.pushLight(w),w.castShadow&&T.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(ce)){W&&it.setFromMatrixPosition(w.matrixWorld).applyMatrix4(_e);let Ge=le.update(w),Me=w.material;Me.visible&&A.push(w,Ge,Me,$,it.z,null,z)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(ce))){let Ge=le.update(w),Me=w.material;if(W&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),it.copy(w.boundingSphere.center)):(Ge.boundingSphere===null&&Ge.computeBoundingSphere(),it.copy(Ge.boundingSphere.center)),it.applyMatrix4(w.matrixWorld).applyMatrix4(_e)),Array.isArray(Me)){let qe=Ge.groups;for(let Je=0,ft=qe.length;Je<ft;Je++){let ot=qe[Je],We=Me[ot.materialIndex];We&&We.visible&&A.push(w,Ge,We,$,it.z,ot,z)}}else Me.visible&&A.push(w,Ge,Me,$,it.z,null,z)}}let Fe=w.children;for(let Ge=0,Me=Fe.length;Ge<Me;Ge++)Fs(Fe[Ge],z,$,W)}function En(w,z,$,W){let{opaque:Z,transmissive:Fe,transparent:Ge}=w;T.setupLightsView($),pe===!0&&je.setGlobalState(L.clippingPlanes,$),W&&M.viewport(re.copy(W)),Z.length>0&&ur(Z,z,$),Fe.length>0&&ur(Fe,z,$),Ge.length>0&&ur(Ge,z,$),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function Zi(w,z,$,W){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[W.id]===void 0){let We=_t.has("EXT_color_buffer_half_float")||_t.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[W.id]=new Pn(1,1,{generateMipmaps:!0,type:We?Ri:ni,minFilter:Yi,samples:Math.max(4,I.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:At.workingColorSpace})}let Fe=T.state.transmissionRenderTarget[W.id],Ge=W.viewport||re;Fe.setSize(Ge.z*L.transmissionResolutionScale,Ge.w*L.transmissionResolutionScale);let Me=L.getRenderTarget(),qe=L.getActiveCubeFace(),Je=L.getActiveMipmapLevel();L.setRenderTarget(Fe),L.getClearColor(wt),St=L.getClearAlpha(),St<1&&L.setClearColor(16777215,.5),L.clear(),lt&&xt.render($);let ft=L.toneMapping;L.toneMapping=Ai;let ot=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),T.setupLightsView(W),pe===!0&&je.setGlobalState(L.clippingPlanes,W),ur(w,$,W),te.updateMultisampleRenderTarget(Fe),te.updateRenderTargetMipmap(Fe),_t.has("WEBGL_multisampled_render_to_texture")===!1){let We=!1;for(let Bt=0,Qt=z.length;Bt<Qt;Bt++){let zt=z[Bt],{object:Rt,geometry:en,material:Oe,group:Tn}=zt;if(Oe.side===gi&&Rt.layers.test(W.layers)){let Tt=Oe.side;Oe.side=Cn,Oe.needsUpdate=!0,Ji(Rt,$,W,en,Oe,Tn),Oe.side=Tt,Oe.needsUpdate=!0,We=!0}}We===!0&&(te.updateMultisampleRenderTarget(Fe),te.updateRenderTargetMipmap(Fe))}L.setRenderTarget(Me,qe,Je),L.setClearColor(wt,St),ot!==void 0&&(W.viewport=ot),L.toneMapping=ft}function ur(w,z,$){let W=z.isScene===!0?z.overrideMaterial:null;for(let Z=0,Fe=w.length;Z<Fe;Z++){let Ge=w[Z],{object:Me,geometry:qe,group:Je}=Ge,ft=Ge.material;ft.allowOverride===!0&&W!==null&&(ft=W),Me.layers.test($.layers)&&Ji(Me,z,$,qe,ft,Je)}}function Ji(w,z,$,W,Z,Fe){k!==null&&Z.isNodeMaterial&&k.setObject(w,Z),w.onBeforeRender(L,z,$,W,Z,Fe),w.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),Z.onBeforeRender(L,z,$,W,w,Fe),Z.transparent===!0&&Z.side===gi&&Z.forceSinglePass===!1?(Z.side=Cn,Z.needsUpdate=!0,L.renderBufferDirect($,z,W,Z,w,Fe),Z.side=Is,Z.needsUpdate=!0,L.renderBufferDirect($,z,W,Z,w,Fe),Z.side=gi):L.renderBufferDirect($,z,W,Z,w,Fe),w.onAfterRender(L,z,$,W,Z,Fe)}function dr(w,z,$){z.isScene!==!0&&(z=tt);let W=J.get(w),Z=T.state.lights,Fe=T.state.shadowsArray,Ge=Z.state.version,Me=Ie.getParameters(w,Z.state,Fe,z,$,T.state.lightProbeGridArray),qe=Ie.getProgramCacheKey(Me),Je=W.programs;W.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?z.environment:null,W.fog=z.fog;let ft=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;W.envMap=ye.get(w.envMap||W.environment,ft),W.envMapRotation=W.environment!==null&&w.envMap===null?z.environmentRotation:w.envMapRotation,Je===void 0&&(w.addEventListener("dispose",bn),Je=new Map,W.programs=Je);let ot=Je.get(qe);if(ot!==void 0){if(W.currentProgram===ot&&W.lightsStateVersion===Ge)return Qc(w,Me),ot}else Me.uniforms=Ie.getUniforms(w),k!==null&&w.isNodeMaterial&&k.build(w,$,Me),w.onBeforeCompile(Me,L),ot=Ie.acquireProgram(Me,qe),Je.set(qe,ot),W.uniforms=Me.uniforms;let We=W.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(We.clippingPlanes=je.uniform),Qc(w,Me),W.needsLights=xi(w),W.lightsStateVersion=Ge,W.needsLights&&(We.ambientLightColor.value=Z.state.ambient,We.lightProbe.value=Z.state.probe,We.sunLights.value=Z.state.sun,We.sunLightShadows.value=Z.state.sunShadow,We.directionalLights.value=Z.state.directional,We.directionalLightShadows.value=Z.state.directionalShadow,We.spotLights.value=Z.state.spot,We.spotLightShadows.value=Z.state.spotShadow,We.rectAreaLights.value=Z.state.rectArea,We.ltc_1.value=Z.state.rectAreaLTC1,We.ltc_2.value=Z.state.rectAreaLTC2,We.pointLights.value=Z.state.point,We.pointLightShadows.value=Z.state.pointShadow,We.hemisphereLights.value=Z.state.hemi,We.sunShadowMatrix.value=Z.state.sunShadowMatrix,We.sunShadowCascade.value=Z.state.sunShadowCascade,We.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,We.spotLightMatrix.value=Z.state.spotLightMatrix,We.spotLightMap.value=Z.state.spotLightMap,We.pointShadowMatrix.value=Z.state.pointShadowMatrix),W.lightProbeGrid=T.state.lightProbeGridArray.length>0,W.currentProgram=ot,W.uniformsList=null,ot}function Fa(w){if(w.uniformsList===null){let z=w.currentProgram.getUniforms();w.uniformsList=Ca.seqWithValue(z.seq,w.uniforms)}return w.uniformsList}function Qc(w,z){let $=J.get(w);$.outputColorSpace=z.outputColorSpace,$.batching=z.batching,$.batchingColor=z.batchingColor,$.instancing=z.instancing,$.instancingColor=z.instancingColor,$.instancingMorph=z.instancingMorph,$.skinning=z.skinning,$.morphTargets=z.morphTargets,$.morphNormals=z.morphNormals,$.morphColors=z.morphColors,$.morphTargetsCount=z.morphTargetsCount,$.numClippingPlanes=z.numClippingPlanes,$.numIntersection=z.numClipIntersection,$.vertexAlphas=z.vertexAlphas,$.vertexTangents=z.vertexTangents,$.toneMapping=z.toneMapping}function ct(w,z){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;x.setFromMatrixPosition(z.matrixWorld);for(let $=0,W=w.length;$<W;$++){let Z=w[$];if(Z.texture!==null&&Z.boundingBox.containsPoint(x))return Z}return null}function an(w,z,$,W,Z){z.isScene!==!0&&(z=tt),te.resetTextureUnits();let Fe=z.fog,Ge=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?z.environment:null,Me=Q===null?L.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:At.workingColorSpace,qe=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,Je=ye.get(W.envMap||Ge,qe),ft=W.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,ot=!!$.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),We=!!$.morphAttributes.position,Bt=!!$.morphAttributes.normal,Qt=!!$.morphAttributes.color,zt=Ai;W.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(zt=L.toneMapping);let Rt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,en=Rt!==void 0?Rt.length:0,Oe=J.get(W),Tn=T.state.lights;if(pe===!0&&(ge===!0||w!==K)){let Yt=w===K&&W.id===q;je.setState(W,w,Yt)}let Tt=!1;W.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==Tn.state.version||Oe.outputColorSpace!==Me||Z.isBatchedMesh&&Oe.batching===!1||!Z.isBatchedMesh&&Oe.batching===!0||Z.isBatchedMesh&&Oe.batchingColor===!0&&Z._colorsTexture===null||Z.isBatchedMesh&&Oe.batchingColor===!1&&Z._colorsTexture!==null||Z.isInstancedMesh&&Oe.instancing===!1||!Z.isInstancedMesh&&Oe.instancing===!0||Z.isSkinnedMesh&&Oe.skinning===!1||!Z.isSkinnedMesh&&Oe.skinning===!0||Z.isInstancedMesh&&Oe.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Oe.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Oe.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Oe.instancingMorph===!1&&Z.morphTexture!==null||Oe.envMap!==Je||W.fog===!0&&Oe.fog!==Fe||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==je.numPlanes||Oe.numIntersection!==je.numIntersection)||Oe.vertexAlphas!==ft||Oe.vertexTangents!==ot||Oe.morphTargets!==We||Oe.morphNormals!==Bt||Oe.morphColors!==Qt||Oe.toneMapping!==zt||Oe.morphTargetsCount!==en||!!Oe.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Tt=!0):(Tt=!0,Oe.__version=W.version);let pn=Oe.currentProgram;Tt===!0&&(pn=dr(W,z,Z),k&&W.isNodeMaterial&&k.onUpdateProgram(W,pn,Oe));let yi=!1,Zn=!1,Jn=!1,Gt=pn.getUniforms(),sn=Oe.uniforms;if(M.useProgram(pn.program)&&(yi=!0,Zn=!0,Jn=!0),W.id!==q&&(q=W.id,Zn=!0),Oe.needsLights){let Yt=ct(T.state.lightProbeGridArray,Z);Oe.lightProbeGrid!==Yt&&(Oe.lightProbeGrid=Yt,Zn=!0)}if(yi||K!==w){M.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Gt.setValue(F,"projectionMatrix",w.projectionMatrix),Gt.setValue(F,"viewMatrix",w.matrixWorldInverse);let ui=Gt.map.cameraPosition;ui!==void 0&&ui.setValue(F,we.setFromMatrixPosition(w.matrixWorld)),I.logarithmicDepthBuffer&&Gt.setValue(F,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Gt.setValue(F,"isOrthographic",w.isOrthographicCamera===!0),K!==w&&(K=w,Zn=!0,Jn=!0)}if(Oe.needsLights&&(Tn.state.sunShadowMap.length>0&&Gt.setValue(F,"sunShadowMap",Tn.state.sunShadowMap,te),Tn.state.directionalShadowMap.length>0&&Gt.setValue(F,"directionalShadowMap",Tn.state.directionalShadowMap,te),Tn.state.spotShadowMap.length>0&&Gt.setValue(F,"spotShadowMap",Tn.state.spotShadowMap,te),Tn.state.pointShadowMap.length>0&&Gt.setValue(F,"pointShadowMap",Tn.state.pointShadowMap,te)),Z.isSkinnedMesh){Gt.setOptional(F,Z,"bindMatrix"),Gt.setOptional(F,Z,"bindMatrixInverse");let Yt=Z.skeleton;Yt&&(Yt.boneTexture===null&&Yt.computeBoneTexture(),Gt.setValue(F,"boneTexture",Yt.boneTexture,te))}Z.isBatchedMesh&&(Gt.setOptional(F,Z,"batchingTexture"),Gt.setValue(F,"batchingTexture",Z._matricesTexture,te),Gt.setOptional(F,Z,"batchingIdTexture"),Gt.setValue(F,"batchingIdTexture",Z._indirectTexture,te),Gt.setOptional(F,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Gt.setValue(F,"batchingColorTexture",Z._colorsTexture,te));let Pi=$.morphAttributes;if((Pi.position!==void 0||Pi.normal!==void 0||Pi.color!==void 0)&&H.update(Z,$,pn),(Zn||Oe.receiveShadow!==Z.receiveShadow)&&(Oe.receiveShadow=Z.receiveShadow,Gt.setValue(F,"receiveShadow",Z.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&z.environment!==null&&(sn.envMapIntensity.value=z.environmentIntensity),sn.dfgLUT!==void 0&&(sn.dfgLUT.value=oE()),Zn){if(Gt.setValue(F,"toneMappingExposure",L.toneMappingExposure),Oe.needsLights&&wn(sn,Jn),Fe&&W.fog===!0&&Ke.refreshFogUniforms(sn,Fe),Ke.refreshMaterialUniforms(sn,W,se,ee,T.state.transmissionRenderTarget[w.id]),Oe.needsLights&&Oe.lightProbeGrid){let Yt=Oe.lightProbeGrid;sn.probesSH.value=Yt.texture,sn.probesMin.value.copy(Yt.boundingBox.min),sn.probesMax.value.copy(Yt.boundingBox.max),sn.probesResolution.value.copy(Yt.resolution)}Ca.upload(F,Fa(Oe),sn,te)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ca.upload(F,Fa(Oe),sn,te),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Gt.setValue(F,"center",Z.center),Gt.setValue(F,"modelViewMatrix",Z.modelViewMatrix),Gt.setValue(F,"normalMatrix",Z.normalMatrix),Gt.setValue(F,"modelMatrix",Z.matrixWorld),W.uniformsGroups!==void 0){let Yt=W.uniformsGroups;for(let ui=0,Nt=Yt.length;ui<Nt;ui++){let eh=Yt[ui];he.update(eh,pn),he.bind(eh,pn)}}return pn}function wn(w,z){w.ambientLightColor.needsUpdate=z,w.lightProbe.needsUpdate=z,w.sunLights.needsUpdate=z,w.sunLightShadows.needsUpdate=z,w.directionalLights.needsUpdate=z,w.directionalLightShadows.needsUpdate=z,w.pointLights.needsUpdate=z,w.pointLightShadows.needsUpdate=z,w.spotLights.needsUpdate=z,w.spotLightShadows.needsUpdate=z,w.rectAreaLights.needsUpdate=z,w.hemisphereLights.needsUpdate=z}function xi(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(w,z,$){let W=J.get(w);W.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),J.get(w.texture).__webglTexture=z,J.get(w.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:$,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,z){let $=J.get(w);$.__webglFramebuffer=z,$.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(w,z=0,$=0){Q=w,V=z,X=$;let W=null,Z=!1,Fe=!1;if(w){let Me=J.get(w);if(Me.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(F.FRAMEBUFFER,Me.__webglFramebuffer),re.copy(w.viewport),ke.copy(w.scissor),He=w.scissorTest,M.viewport(re),M.scissor(ke),M.setScissorTest(He),q=-1;return}else if(Me.__webglFramebuffer===void 0)te.setupRenderTarget(w);else if(Me.__hasExternalTextures)te.rebindTextures(w,J.get(w.texture).__webglTexture,J.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let ft=w.depthTexture;if(Me.__boundDepthTexture!==ft){if(ft!==null&&J.has(ft)&&(w.width!==ft.image.width||w.height!==ft.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");te.setupDepthRenderbuffer(w)}}let qe=w.texture;(qe.isData3DTexture||qe.isDataArrayTexture||qe.isCompressedArrayTexture)&&(Fe=!0);let Je=J.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Je[z])?W=Je[z][$]:W=Je[z],Z=!0):w.samples>0&&te.useMultisampledRTT(w)===!1?W=J.get(w).__webglMultisampledFramebuffer:Array.isArray(Je)?W=Je[$]:W=Je,re.copy(w.viewport),ke.copy(w.scissor),He=w.scissorTest}else re.copy(Ae).multiplyScalar(se).floor(),ke.copy(at).multiplyScalar(se).floor(),He=Vt;if($!==0&&(W=Y),M.bindFramebuffer(F.FRAMEBUFFER,W)&&M.drawBuffers(w,W),M.viewport(re),M.scissor(ke),M.setScissorTest(He),Z){let Me=J.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+z,Me.__webglTexture,$)}else if(Fe){let Me=z;for(let qe=0;qe<w.textures.length;qe++){let Je=J.get(w.textures[qe]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+qe,Je.__webglTexture,$,Me)}}else if(w!==null&&$!==0){let Me=J.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Me.__webglTexture,$)}q=-1};function Oa(w){let z=J.get(w);return(z.__readFormat!==w.format||z.__readType!==w.type)&&(z.__readFormat=w.format,z.__readType=w.type,z.__formatReadable=I.textureFormatReadable(w.format),z.__typeReadable=I.textureTypeReadable(w.type)),z}this.readRenderTargetPixels=function(w,z,$,W,Z,Fe,Ge,Me=0){if(!(w&&w.isWebGLRenderTarget)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qe=J.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ge!==void 0&&(qe=qe[Ge]),qe){M.bindFramebuffer(F.FRAMEBUFFER,qe);try{let Je=w.textures[Me],ft=Je.format,ot=Je.type;w.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Me);let We=Oa(Je);if(We.__formatReadable===!1){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(We.__typeReadable===!1){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=w.width-W&&$>=0&&$<=w.height-Z&&F.readPixels(z,$,W,Z,fe.convert(ft),fe.convert(ot),Fe)}finally{let Je=Q!==null?J.get(Q).__webglFramebuffer:null;M.bindFramebuffer(F.FRAMEBUFFER,Je)}}},this.readRenderTargetPixelsAsync=async function(w,z,$,W,Z,Fe,Ge,Me=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let qe=J.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ge!==void 0&&(qe=qe[Ge]),qe)if(z>=0&&z<=w.width-W&&$>=0&&$<=w.height-Z){M.bindFramebuffer(F.FRAMEBUFFER,qe);let Je=w.textures[Me],ft=Je.format,ot=Je.type;w.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Me);let We=Oa(Je);if(We.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(We.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Bt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Bt),F.bufferData(F.PIXEL_PACK_BUFFER,Fe.byteLength,F.STREAM_READ),F.readPixels(z,$,W,Z,fe.convert(ft),fe.convert(ot),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Qt=Q!==null?J.get(Q).__webglFramebuffer:null;M.bindFramebuffer(F.FRAMEBUFFER,Qt);let zt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await d0(F,zt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Bt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Fe),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(Bt),F.deleteSync(zt),Fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,z=null,$=0){let W=Math.pow(2,-$),Z=Math.floor(w.image.width*W),Fe=Math.floor(w.image.height*W),Ge=z!==null?z.x:0,Me=z!==null?z.y:0;te.setTexture2D(w,0),F.copyTexSubImage2D(F.TEXTURE_2D,$,0,0,Ge,Me,Z,Fe),M.unbindTexture()},this.copyTextureToTexture=function(w,z,$=null,W=null,Z=0,Fe=0){let Ge,Me,qe,Je,ft,ot,We,Bt,Qt,zt=w.isCompressedTexture?w.mipmaps[Fe]:w.image;if($!==null)Ge=$.max.x-$.min.x,Me=$.max.y-$.min.y,qe=$.isBox3?$.max.z-$.min.z:1,Je=$.min.x,ft=$.min.y,ot=$.isBox3?$.min.z:0;else{let sn=Math.pow(2,-Z);Ge=Math.floor(zt.width*sn),Me=Math.floor(zt.height*sn),w.isDataArrayTexture?qe=zt.depth:w.isData3DTexture?qe=Math.floor(zt.depth*sn):qe=1,Je=0,ft=0,ot=0}W!==null?(We=W.x,Bt=W.y,Qt=W.z):(We=0,Bt=0,Qt=0);let Rt=fe.convert(z.format),en=fe.convert(z.type),Oe;z.isData3DTexture?(te.setTexture3D(z,0),Oe=F.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(te.setTexture2DArray(z,0),Oe=F.TEXTURE_2D_ARRAY):(te.setTexture2D(z,0),Oe=F.TEXTURE_2D),M.activeTexture(F.TEXTURE0),M.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,z.flipY),M.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),M.pixelStorei(F.UNPACK_ALIGNMENT,z.unpackAlignment);let Tn=M.getParameter(F.UNPACK_ROW_LENGTH),Tt=M.getParameter(F.UNPACK_IMAGE_HEIGHT),pn=M.getParameter(F.UNPACK_SKIP_PIXELS),yi=M.getParameter(F.UNPACK_SKIP_ROWS),Zn=M.getParameter(F.UNPACK_SKIP_IMAGES);M.pixelStorei(F.UNPACK_ROW_LENGTH,zt.width),M.pixelStorei(F.UNPACK_IMAGE_HEIGHT,zt.height),M.pixelStorei(F.UNPACK_SKIP_PIXELS,Je),M.pixelStorei(F.UNPACK_SKIP_ROWS,ft),M.pixelStorei(F.UNPACK_SKIP_IMAGES,ot);let Jn=w.isDataArrayTexture||w.isData3DTexture,Gt=z.isDataArrayTexture||z.isData3DTexture;if(w.isDepthTexture){let sn=J.get(w),Pi=J.get(z),Yt=J.get(sn.__renderTarget),ui=J.get(Pi.__renderTarget);M.bindFramebuffer(F.READ_FRAMEBUFFER,Yt.__webglFramebuffer),M.bindFramebuffer(F.DRAW_FRAMEBUFFER,ui.__webglFramebuffer);for(let Nt=0;Nt<qe;Nt++)Jn&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,J.get(w).__webglTexture,Z,ot+Nt),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,J.get(z).__webglTexture,Fe,Qt+Nt)),F.blitFramebuffer(Je,ft,Ge,Me,We,Bt,Ge,Me,F.DEPTH_BUFFER_BIT,F.NEAREST);M.bindFramebuffer(F.READ_FRAMEBUFFER,null),M.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(Z!==0||w.isRenderTargetTexture||J.has(w)){let sn=J.get(w),Pi=J.get(z);M.bindFramebuffer(F.READ_FRAMEBUFFER,N),M.bindFramebuffer(F.DRAW_FRAMEBUFFER,B);for(let Yt=0;Yt<qe;Yt++)Jn?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,sn.__webglTexture,Z,ot+Yt):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,sn.__webglTexture,Z),Gt?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Pi.__webglTexture,Fe,Qt+Yt):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Pi.__webglTexture,Fe),Z!==0?F.blitFramebuffer(Je,ft,Ge,Me,We,Bt,Ge,Me,F.COLOR_BUFFER_BIT,F.NEAREST):Gt?F.copyTexSubImage3D(Oe,Fe,We,Bt,Qt+Yt,Je,ft,Ge,Me):F.copyTexSubImage2D(Oe,Fe,We,Bt,Je,ft,Ge,Me);M.bindFramebuffer(F.READ_FRAMEBUFFER,null),M.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Gt?w.isDataTexture||w.isData3DTexture?F.texSubImage3D(Oe,Fe,We,Bt,Qt,Ge,Me,qe,Rt,en,zt.data):z.isCompressedArrayTexture?F.compressedTexSubImage3D(Oe,Fe,We,Bt,Qt,Ge,Me,qe,Rt,zt.data):F.texSubImage3D(Oe,Fe,We,Bt,Qt,Ge,Me,qe,Rt,en,zt):w.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Fe,We,Bt,Ge,Me,Rt,en,zt.data):w.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Fe,We,Bt,zt.width,zt.height,Rt,zt.data):F.texSubImage2D(F.TEXTURE_2D,Fe,We,Bt,Ge,Me,Rt,en,zt);M.pixelStorei(F.UNPACK_ROW_LENGTH,Tn),M.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Tt),M.pixelStorei(F.UNPACK_SKIP_PIXELS,pn),M.pixelStorei(F.UNPACK_SKIP_ROWS,yi),M.pixelStorei(F.UNPACK_SKIP_IMAGES,Zn),Fe===0&&z.generateMipmaps&&F.generateMipmap(Oe),M.unbindTexture()},this.initRenderTarget=function(w){J.get(w).__webglFramebuffer===void 0&&te.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?te.setTextureCube(w,0):w.isData3DTexture?te.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?te.setTexture2DArray(w,0):te.setTexture2D(w,0),M.unbindTexture()},this.resetState=function(){V=0,X=0,Q=null,M.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=At._getDrawingBufferColorSpace(e),t.unpackColorSpace=At._getUnpackColorSpace()}};var Q0={type:"change"},Op={type:"start"},t_={type:"end"},vd=new Bi,e_=new oi,aE=Math.cos(70*Wn.DEG2RAD),Sn=new E,hi=2*Math.PI,qt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Fp=1e-6,Sd=class extends ua{constructor(e,t=null){super(e,t),this.state=qt.NONE,this.target=new E,this.cursor=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Cs.ROTATE,MIDDLE:Cs.DOLLY,RIGHT:Cs.PAN},this.touches={ONE:Ps.ROTATE,TWO:Ps.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new E,this._lastQuaternion=new fn,this._lastTargetPosition=new E,this._quat=new fn().setFromUnitVectors(e.up,new E(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Jr,this._sphericalDelta=new Jr,this._scale=1,this._panOffset=new E,this._rotateStart=new ae,this._rotateEnd=new ae,this._rotateDelta=new ae,this._panStart=new ae,this._panEnd=new ae,this._panDelta=new ae,this._dollyStart=new ae,this._dollyEnd=new ae,this._dollyDelta=new ae,this._dollyDirection=new E,this._mouse=new ae,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=cE.bind(this),this._onPointerDown=lE.bind(this),this._onPointerUp=hE.bind(this),this._onContextMenu=_E.bind(this),this._onMouseWheel=fE.bind(this),this._onKeyDown=pE.bind(this),this._onTouchStart=mE.bind(this),this._onTouchMove=gE.bind(this),this._onMouseDown=uE.bind(this),this._onMouseMove=dE.bind(this),this._interceptControlDown=xE.bind(this),this._interceptControlUp=yE.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=qt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Q0),this.update(),this.state=qt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Sn.copy(t).sub(this.target),Sn.applyQuaternion(this._quat),this._spherical.setFromVector3(Sn),this.autoRotate&&this.state===qt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=hi:n>Math.PI&&(n-=hi),i<-Math.PI?i+=hi:i>Math.PI&&(i-=hi),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Sn.setFromSpherical(this._spherical),Sn.applyQuaternion(this._quatInverse),t.copy(this.target).add(Sn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Sn.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new E(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new E(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Sn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(vd.origin.copy(this.object.position),vd.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(vd.direction))<aE?this.object.lookAt(this.target):(e_.setFromNormalAndCoplanarPoint(this.object.up,this.target),vd.intersectPlane(e_,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Fp||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Fp||this._lastTargetPosition.distanceToSquared(this.target)>Fp?(this.dispatchEvent(Q0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?hi/60*this.autoRotateSpeed*e:hi/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Sn.setFromMatrixColumn(t,0),Sn.multiplyScalar(-e),this._panOffset.add(Sn)}_panUp(e,t){this.screenSpacePanning===!0?Sn.setFromMatrixColumn(t,1):(Sn.setFromMatrixColumn(t,0),Sn.crossVectors(this.object.up,Sn)),Sn.multiplyScalar(e),this._panOffset.add(Sn)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;Sn.copy(i).sub(this.target);let r=Sn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=i/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(hi*this._rotateDelta.x/t.clientHeight),this._rotateUp(hi*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(hi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-hi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(hi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-hi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(hi*this._rotateDelta.x/t.clientHeight),this._rotateUp(hi*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ae,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function lE(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function cE(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function hE(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(t_),this.state=qt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function uE(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Cs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=qt.DOLLY;break;case Cs.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=qt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=qt.ROTATE}break;case Cs.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=qt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=qt.PAN}break;default:this.state=qt.NONE}this.state!==qt.NONE&&this.dispatchEvent(Op)}function dE(s){switch(this.state){case qt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case qt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case qt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function fE(s){this.enabled===!1||this.enableZoom===!1||this.state!==qt.NONE||(s.preventDefault(),this.dispatchEvent(Op),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(t_))}function pE(s){this.enabled!==!1&&this._handleKeyDown(s)}function mE(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Ps.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=qt.TOUCH_ROTATE;break;case Ps.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=qt.TOUCH_PAN;break;default:this.state=qt.NONE}break;case 2:switch(this.touches.TWO){case Ps.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=qt.TOUCH_DOLLY_PAN;break;case Ps.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=qt.TOUCH_DOLLY_ROTATE;break;default:this.state=qt.NONE}break;default:this.state=qt.NONE}this.state!==qt.NONE&&this.dispatchEvent(Op)}function gE(s){switch(this._trackPointer(s),this.state){case qt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case qt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case qt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case qt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=qt.NONE}}function _E(s){this.enabled!==!1&&s.preventDefault()}function xE(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function yE(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var $c=new E;function Ci(s,e,t,n,i,r){let o=2*Math.PI*i/4,a=Math.max(r-2*i,0),l=Math.PI/4;$c.copy(e),$c[n]=0,$c.normalize();let c=.5*o/(o+a),h=1-$c.angleTo(s)/l;return Math.sign($c[t])===1?h*c:a/(o+a)+c+c*(1-h)}var ar=class s extends In{constructor(e=1,t=1,n=1,i=2,r=.1){let o=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let l=new E,c=new E,h=new E(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,p=d.length/6,_=new E,g=.5/o;for(let m=0,S=0;m<d.length;m+=3,S+=2)switch(l.fromArray(d,m),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),d[m+0]=h.x*Math.sign(l.x)+c.x*r,d[m+1]=h.y*Math.sign(l.y)+c.y*r,d[m+2]=h.z*Math.sign(l.z)+c.z*r,u[m+0]=c.x,u[m+1]=c.y,u[m+2]=c.z,Math.floor(m/p)){case 0:_.set(1,0,0),f[S+0]=Ci(_,c,"z","y",r,n),f[S+1]=1-Ci(_,c,"y","z",r,t);break;case 1:_.set(-1,0,0),f[S+0]=1-Ci(_,c,"z","y",r,n),f[S+1]=1-Ci(_,c,"y","z",r,t);break;case 2:_.set(0,1,0),f[S+0]=1-Ci(_,c,"x","z",r,e),f[S+1]=Ci(_,c,"z","x",r,n);break;case 3:_.set(0,-1,0),f[S+0]=1-Ci(_,c,"x","z",r,e),f[S+1]=1-Ci(_,c,"z","x",r,n);break;case 4:_.set(0,0,1),f[S+0]=1-Ci(_,c,"x","y",r,e),f[S+1]=1-Ci(_,c,"y","x",r,t);break;case 5:_.set(0,0,-1),f[S+0]=Ci(_,c,"x","y",r,e),f[S+1]=1-Ci(_,c,"y","x",r,t);break}}static fromJSON(e){return new s(e.width,e.height,e.depth,e.segments,e.radius)}};var Md=class extends vs{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new In;e.deleteAttribute("uv");let t=new vt({side:Cn}),n=new vt,i=new qr(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);let r=new Ot(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new Ms(e,n,6),a=new Dt;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let l=new Ot(e,La(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new Ot(e,La(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new Ot(e,La(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let d=new Ot(e,La(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let u=new Ot(e,La(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let f=new Ot(e,La(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function La(s){return new Hr({color:0,emissive:16777215,emissiveIntensity:s})}var n_=new tn,bd=new E,Da=class extends Zr{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new Ve(e,3)),this.setAttribute("uv",new Ve(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Rs(t,6,1);return this.setAttribute("instanceStart",new Gn(n,3,0)),this.setAttribute("instanceEnd",new Gn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Rs(t,6,1);return this.setAttribute("instanceColorStart",new Gn(n,3,0)),this.setAttribute("instanceColorEnd",new Gn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Vr(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),n_.setFromBufferAttribute(t),this.boundingBox.union(n_))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new nn),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)bd.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(bd)),bd.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(bd));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};Re.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ae},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Yn.line={uniforms:Ta.merge([Re.common,Re.fog,Re.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var Us=class extends Ln{constructor(e){super({type:"LineMaterial",uniforms:Ta.clone(Yn.line.uniforms),vertexShader:Yn.line.vertexShader,fragmentShader:Yn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var Bp=new Lt,i_=new E,s_=new E,Nn=new Lt,Un=new Lt,os=new Lt,zp=new E,Vp=new ht,Fn=new ha,r_=new E,Ed=new tn,wd=new nn,as=new Lt,ls,ro;function o_(s,e,t){return as.set(0,0,-e,1).applyMatrix4(s.projectionMatrix),as.multiplyScalar(1/as.w),as.x=ro/t.width,as.y=ro/t.height,as.applyMatrix4(s.projectionMatrixInverse),as.multiplyScalar(1/as.w),Math.abs(Math.max(as.x,as.y))}function vE(s,e){let t=s.matrixWorld,n=s.geometry,i=n.attributes.instanceStart,r=n.attributes.instanceEnd,o=Math.min(n.instanceCount,i.count);for(let a=0,l=o;a<l;a++){Fn.start.fromBufferAttribute(i,a),Fn.end.fromBufferAttribute(r,a),Fn.applyMatrix4(t);let c=new E,h=new E;ls.distanceSqToSegment(Fn.start,Fn.end,h,c),h.distanceTo(c)<ro*.5&&e.push({point:h,pointOnLine:c,distance:ls.origin.distanceTo(h),object:s,face:null,faceIndex:a,uv:null,uv1:null})}}function SE(s,e,t){let n=e.projectionMatrix,r=s.material.resolution,o=s.matrixWorld,a=s.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,h=Math.min(a.instanceCount,l.count),d=-e.near;ls.at(1,os),os.w=1,os.applyMatrix4(e.matrixWorldInverse),os.applyMatrix4(n),os.multiplyScalar(1/os.w),os.x*=r.x/2,os.y*=r.y/2,os.z=0,zp.copy(os),Vp.multiplyMatrices(e.matrixWorldInverse,o);for(let u=0,f=h;u<f;u++){if(Nn.fromBufferAttribute(l,u),Un.fromBufferAttribute(c,u),Nn.w=1,Un.w=1,Nn.applyMatrix4(Vp),Un.applyMatrix4(Vp),Nn.z>d&&Un.z>d)continue;if(Nn.z>d){let b=Nn.z-Un.z,x=(Nn.z-d)/b;Nn.lerp(Un,x)}else if(Un.z>d){let b=Un.z-Nn.z,x=(Un.z-d)/b;Un.lerp(Nn,x)}Nn.applyMatrix4(n),Un.applyMatrix4(n),Nn.multiplyScalar(1/Nn.w),Un.multiplyScalar(1/Un.w),Nn.x*=r.x/2,Nn.y*=r.y/2,Un.x*=r.x/2,Un.y*=r.y/2,Fn.start.copy(Nn),Fn.start.z=0,Fn.end.copy(Un),Fn.end.z=0;let _=Fn.closestPointToPointParameter(zp,!0);Fn.at(_,r_);let g=Wn.lerp(Nn.z,Un.z,_),m=g>=-1&&g<=1,S=zp.distanceTo(r_)<ro*.5;if(m&&S){Fn.start.fromBufferAttribute(l,u),Fn.end.fromBufferAttribute(c,u),Fn.start.applyMatrix4(o),Fn.end.applyMatrix4(o);let b=new E,x=new E;ls.distanceSqToSegment(Fn.start,Fn.end,x,b),t.push({point:x,pointOnLine:b,distance:ls.origin.distanceTo(x),object:s,face:null,faceIndex:u,uv:null,uv1:null})}}}var Td=class extends Ot{constructor(e=new Da,t=new Us({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let o=0,a=0,l=t.count;o<l;o++,a+=2)i_.fromBufferAttribute(t,o),s_.fromBufferAttribute(n,o),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+i_.distanceTo(s_);let r=new Rs(i,2,1);return e.setAttribute("instanceDistanceStart",new Gn(r,1,0)),e.setAttribute("instanceDistanceEnd",new Gn(r,1,1)),this}raycast(e,t){let n=this.material.worldUnits,i=e.camera;if(i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;ls=e.ray;let o=this.matrixWorld,a=this.geometry,l=this.material;ro=l.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),wd.copy(a.boundingSphere).applyMatrix4(o);let c;if(n)c=ro*.5;else{let d=Math.max(i.near,wd.distanceToPoint(ls.origin));c=o_(i,d,l.resolution)}if(wd.radius+=c,ls.intersectsSphere(wd)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Ed.copy(a.boundingBox).applyMatrix4(o);let h;if(n)h=ro*.5;else{let d=Math.max(i.near,Ed.distanceToPoint(ls.origin));h=o_(i,d,l.resolution)}Ed.expandByScalar(h),ls.intersectsBox(Ed)!==!1&&(n?vE(this,t):SE(this,i,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Bp),this.material.uniforms.resolution.value.set(Bp.z,Bp.w))}};var lr=class extends Da{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}setFromPoints(e){let t=e.length-1,n=new Float32Array(6*t);for(let i=0;i<t;i++)n[6*i]=e[i].x,n[6*i+1]=e[i].y,n[6*i+2]=e[i].z||0,n[6*i+3]=e[i+1].x,n[6*i+4]=e[i+1].y,n[6*i+5]=e[i+1].z||0;return super.setPositions(n),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}};var jc=class extends Td{constructor(e=new lr,t=new Us({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}};var a_={pitch:2.54,resistor:{leadDiameter:.55,profile:[[-3.15,.28],[-3.13,.72],[-3.03,.99],[-2.84,1.15],[-2.55,1.2],[-2.15,1.2],[-1.75,1.13],[-1.38,1],[-.95,.96],[.95,.96],[1.38,1],[1.75,1.13],[2.15,1.2],[2.55,1.2],[2.84,1.15],[3.03,.99],[3.13,.72],[3.15,.28]],bands:[[-2.16,-1.72],[-1.26,-.82],[-.36,.08],[1.63,2.15]],shell:"#d1ac80",palette:["#232323","#673c28","#b5272d","#db641f","#e8b92c","#3b7b42","#285baa","#794682","#777a78","#e7e1d4"],gold:"#b68b3b"},display:{width:12.7,length:19,height:8,rowSpan:15.24,leadDiameter:.51,leadLength:6.3,housing:"#232426",face:"#343336",lens:"#b0a2a0",lit:"#fb3429",segments:{a:[[-2.35,-6.35],[3.4,-6.35],[4.15,-5.75],[3.23,-5.1],[-2.52,-5.1],[-3.19,-5.75]],b:[[4.4,-5.42],[4.91,-4.74],[4.17,-.91],[3.33,-.34],[2.82,-1.02],[3.56,-4.85]],c:[[3.28,.35],[3.8,1.02],[3.06,4.85],[2.22,5.42],[1.7,4.75],[2.44,.92]],d:[[-4.19,5.1],[1.56,5.1],[2.25,5.75],[1.37,6.35],[-4.38,6.35],[-5.03,5.75]],e:[[-3.77,.35],[-3.25,1.02],[-3.99,4.85],[-4.83,5.42],[-5.35,4.75],[-4.61,.92]],f:[[-2.65,-5.42],[-2.14,-4.74],[-2.88,-.91],[-3.72,-.34],[-4.23,-1.02],[-3.49,-4.85]],g:[[-3.28,-.62],[2.47,-.62],[3.11,0],[2.24,.62],[-3.51,.62],[-4.15,0]]},decimal:[4.28,5.78,.62]},jumper:{solid:{conductorDiameter:.64,jacketDiameter:1.25,bareLength:6.35},flexible:{jacketDiameter:1.15,contactWidth:.64,contactLength:5.4,housingWidth:2.4,housingLength:8.2,strainReliefDiameter:1.65}}};var{pitch:On,resistor:oo,display:qi,jumper:Ad}=a_;function l_(s){let e=String(s).trim().match(/^(\d+(?:[.,]\d+)?)\s*([kKmM]?)/);if(!e)return[1,0,2];let t=e[2],n=Number(e[1].replace(",","."))*(t.toLowerCase()==="k"?1e3:t?1e6:1);if(n<1||!Number.isFinite(n))return[1,0,2];let i=Math.floor(Math.log10(n))-1,r=Math.round(n/10**i);return[Math.floor(r/10),r%10,i]}function c_(){let{profile:e,bands:t}=oo,n=[...new Set([...e.map(([h])=>h),...t.flat()])].sort((h,d)=>h-d),i=n.map(h=>{let d=e.findIndex(([g])=>g>=h),[u,f]=e[d],[p,_]=e[Math.max(0,d-1)];return new ae((u===p?f:Wn.lerp(_,f,(h-p)/(u-p)))/On,h/On)}),r=new zr([new ae(0,i[0].y),...i,new ae(0,i.at(-1).y)],24),o=Array.from({length:5},()=>[]),a=r.index.array,l=i.length+1;for(let h=0;h<24;h++)for(let d=0;d<l;d++){let u=(n[d-1]+n[d])/2,f=t.findIndex(([_,g])=>u>_&&u<g)+1,p=(h*l+d)*6;o[f].push(...a.slice(p,p+6))}r.setIndex(o.flat());let c=0;for(let[h,d]of o.entries())r.addGroup(c,d.length,h),c+=d.length;return r}function Hp(s){let e=new Ei(s.map(([n,i])=>new ae(n/On,-i/On))),t=new Ts(e,{depth:.016,bevelEnabled:!0,bevelSize:.015,bevelThickness:.014,bevelSegments:1});return t.rotateX(-Math.PI/2),t}function h_(){let e=document.createElement("canvas");e.width=e.height=128;let t=e.getContext("2d"),n=t.createImageData(128,128),i=231;for(let o=0;o<n.data.length;o+=4)i=Math.imul(1664525,i)+1013904223>>>0,n.data.set([i>>>24,i>>>24,i>>>24,255],o);t.putImageData(n,0,0);let r=new Ks(e);return r.wrapS=r.wrapT=Xs,r}function c1({container:s,model:e,point:t,hole:n,onConnection:i,onPin:r,onSwitch:o,onFailure:a,onChip:l=()=>{},onHole:c=()=>{}}){let h=e.presentation==="contador",d=new vs;d.background=new Be("#edf1ed");let u=new cn(40,1,.1,1600),f=new Kc({antialias:!0,alpha:!1});f.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6)),f.outputColorSpace=Rn,f.toneMapping=ma,f.toneMappingExposure=1.08,s.append(f.domElement);let p=f.domElement;p.tabIndex=0,p.setAttribute("aria-label","Circuito en 3D. Arrastra para girar; usa la rueda para acercar. La lista de conexiones ofrece los mismos detalles con teclado."),p.setAttribute("aria-describedby","threeHelp");let _=new Sd(u,p);_.enableDamping=!0,_.dampingFactor=.13,_.minDistance=5,_.maxDistance=500,_.minPolarAngle=.01,_.maxPolarAngle=Math.PI/2-.05,_.listenToKeyEvents(p),_.zoomToCursor=!0;let g=h?new so(f):null;g&&(d.environment=g.fromScene(new Md,.04).texture,d.environmentIntensity=.28,g.dispose()),d.add(new Wr(16777215,11779256,h?2.05:2.4));let m=new rr(16777215,3.2);m.position.set(-25,65,30),d.add(m);let S=new rr(15003903,1.1);S.position.set(35,25,-30),d.add(S);let b=new Map,x=[],A=[],T=new Map,D=[],v=[],R=new Map,L=new Map,O=new Map,k={},Y=null,N=[],B=[],V=null,X=new Dt,Q=new Map,q=new gn;d.add(q);let K=null,re=null;function ke(y,C,P){let U=d.children.filter(ue=>!C.has(ue)&&!ue.userData.softShadow),j=new gn;U.forEach(ue=>j.add(ue)),d.add(j),Q.set(y,{group:j,holes:P,home:j.position.clone()})}let He=new Map,wt=new gn;d.add(wt);let St="",et={id:null,progress:1},ee=new vt({color:16447983,roughness:.82}),se=new vt({color:2239021,roughness:.7}),me=new vt({color:11976897,roughness:.35,metalness:.7}),nt=h_(),Ae=(y,C,P=.025)=>new vt({color:y,roughness:C,bumpMap:nt,bumpScale:P}),at=Ae("#202126",.64,.018),Vt=c_(),ce=Ae(oo.shell,.57),pe=oo.palette.map(y=>Ae(y,.47)),ge=new vt({color:oo.gold,roughness:.4,metalness:.35,bumpMap:nt,bumpScale:.018}),_e=Ae(qi.housing,.43),we=Ae(qi.face,.56),it=Object.fromEntries(Object.entries(qi.segments).map(([y,C])=>[y,Hp(C)])),[tt,lt,dt]=qi.decimal;it.dp=Hp(Array.from({length:16},(y,C)=>[tt+dt*Math.cos(C*Math.PI/8),lt+dt*Math.sin(C*Math.PI/8)]));let F=Ad.flexible,Pt=F.housingWidth/On,_t=F.housingLength/On,I=.18,M=I+_t,G=.65,J=M-.14,te=J+G-.05,ye=.85,be=new ar(Pt,_t,Pt,2,.073),ie=Ae("#27282b",.51,.016),le=Ae("#303136",.56,.014),Ie=new $t(.23,F.strainReliefDiameter/On/2,G,16),Ke=F.contactWidth/On,Ue=new ar(Ke,.48,Ke,1,.027),Le=new vt({color:11772017,roughness:.36,metalness:.46}),je=new In(.022,_t-.42,.025),st=new ar(.3,.49,.045,1,.02),xt=new $t(Ad.solid.conductorDiameter/On/2,Ad.solid.conductorDiameter/On/2,.32,8),H=e.bounds[0]+e.bounds[2]/2,Ce=e.bounds[1]+e.bounds[3]/2,ne=([y,C],P=.1)=>new E((y-H)/30,P,(C-Ce)/30),fe=(y,C=.1)=>ne(t(y),C),De=!1,he=0,Te=null,ze=null,kt=0,mt=null,Mn=[...e.bounds],bn=!1,kp="",Na=null,cr=1,ii={quality:"auto",background:"#edf1ed",motion:"full"},hr={scale:1,intensity:1},Ua=0,ao=!1,qn=!0,Fs=!1,En=im({THREE:Ia,scene:d,container:s,camera:u,canvas:p,requestRender:Nt}),Zi=new gn;d.add(Zi);let ur="",Ji=null,dr=0;function Fa(y){Ji=y?.active?y:null;let C=Ji?.ids||[],P=C.join("|");if(P!==ur){Zi.traverse(j=>{j.geometry?.dispose(),j.material?.dispose()}),Zi.clear(),ur=P;for(let j of C){let ue=b.get(j);if(!ue||ue.it.kind!=="wire")continue;let Se=new lr;Se.setPositions(Array.from({length:ue.wire.geometry.parameters.tubularSegments+1},(de,Xe)=>ue.curve.getPointAt(Xe/ue.wire.geometry.parameters.tubularSegments)).flatMap(de=>de.toArray()));for(let[de,Xe]of[[14791749,8],[ue.material.color,3]]){let oe=new Us({color:de,linewidth:Xe,worldUnits:!1,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),xe=new jc(Se,oe);xe.userData.signal=j,xe.renderOrder=21,xe.frustumCulled=!1,Zi.add(xe)}dr++}}let U=s.getBoundingClientRect();Zi.visible=!!Ji;for(let j of Zi.children)j.visible=!!b.get(j.userData.signal)?.group.visible,j.material.opacity=Ji?.value===1?.9:.5,j.material.resolution.set(U.width||1,U.height||1)}function Qc(y){JSON.stringify(y||null)!==JSON.stringify(Ji)&&(mt?Cd({...mt,studio:{...mt.studio,signals:y}}):(Fa(y),Nt()))}function ct(y,C,P,U=d){let j=new Ot(y,C);return j.position.copy(P),U.add(j),j}function an(y,C,P,U,j,ue=d){return ct(new In(y,C,P),j,U,ue)}function wn(y,C,P,U,j,ue=d,Se=.08){return ct(new ar(y,C,P,2,Se),j,U,ue)}function xi(y,C,P=.046){return ct(new ki(new Vi(y,!1,"centripetal"),16,P,8,!1),me.clone(),new E,C)}function Oa(y,C=.22){let P=y.filter((Se,de)=>de===0||Se.distanceTo(y[de-1])>1e-6),U=new Qs,j=P[0];for(let Se=1;Se<P.length-1;Se++){let de=P[Se],Xe=P[Se-1],oe=P[Se+1],xe=Math.min(C,Xe.distanceTo(de)/3,oe.distanceTo(de)/3),Ee=de.clone().addScaledVector(Xe.clone().sub(de).normalize(),xe),ve=de.clone().addScaledVector(oe.clone().sub(de).normalize(),xe);j.distanceTo(Ee)>1e-6&&U.add(new es(j,Ee)),U.add(new js(Ee,de,ve)),j=ve}let ue=P[P.length-1];return j.distanceTo(ue)>1e-6&&U.add(new es(j,ue)),U}function w(y,C,P,U){let j=(P||[y,C]).map(Jt=>Jt.clone().setY(U)).filter((Jt,Ne,Qe)=>!Ne||Jt.distanceTo(Qe[Ne-1])>1e-6),ue=j[0],Se=j.at(-1),de=j[1].clone().sub(ue).normalize(),Xe=Se.clone().sub(j.at(-2)).normalize(),oe=Math.min(2.45,ue.distanceTo(j[1])*.44),xe=Math.min(2.45,Se.distanceTo(j.at(-2))*.44),Ee=ue.clone().addScaledVector(de,oe),ve=Se.clone().addScaledVector(Xe,-xe),Ze=y.clone().add(new E(0,te,0)),Ye=C.clone().add(new E(0,te,0)),rt=Ze.clone().add(new E(0,.62,0)),yt=Ye.clone().add(new E(0,ye,0)),Ct=new Qs;Ct.getPointAt=Ct.getPoint.bind(Ct),Ct.getTangentAt=Ct.getTangent.bind(Ct),Ct.add(new es(Ze,rt)),Ct.add(new $s(rt,rt.clone().add(new E(0,.62,0)),Ee.clone().addScaledVector(de,-oe*.52),Ee));for(let Jt of Oa([Ee,...j.slice(1,-1),ve]).curves)Ct.add(Jt);return Ct.add(new $s(ve,ve.clone().addScaledVector(Xe,xe*.52),yt.clone().add(new E(0,.64,0)),yt)),Ct.add(new es(yt,Ye)),Ct}function z(y,C,P,U){let j=new gn;j.position.copy(y),C.add(j);let ue=(oe,xe,Ee,ve,Ze)=>ct(oe,xe,new E(Ee,ve,Ze),j),Se=ue(Ue,P.pin,0,I-.18,0),de=ue(be,P.housing,0,I+_t/2,0),Xe=ue(Ie,P.collar,0,J+G/2,0);for(let oe of[-1,1])ue(je,P.collar,Pt*.28,I+_t/2,oe*Pt*.499),ue(st,P.collar,0,I+_t*.37,oe*Pt*.499);for(let oe of[Se,de,Xe])oe.userData={id:U},x.push(oe);return j}function $(y,C=1024,P=512){let U=document.createElement("canvas");U.width=C,U.height=P,y(U.getContext("2d"),C,P);let j=new Ks(U);return j.colorSpace=Rn,j.anisotropy=Math.min(4,f.capabilities.getMaxAnisotropy()),j}function W(y,C,P,U,{color:j="#dbe5e1",background:ue="#222a2d",size:Se=48}={}){let de=$((oe,xe,Ee)=>{oe.fillStyle=ue,oe.fillRect(0,0,xe,Ee),oe.fillStyle=j,oe.textAlign="center",oe.textBaseline="middle",oe.font="600 "+Se+"px Arial",y.split(`
`).forEach((ve,Ze,Ye)=>oe.fillText(ve,xe/2,Ee/2+(Ze-(Ye.length-1)/2)*Se*1.45))},512,256),Xe=ct(new wi(P,U),new jt({map:de}),C);return Xe.rotation.x=-Math.PI/2,Xe.userData.viewerLabel=!0,Xe.userData.labelText=y,Xe}function Z(y,C){let P=y/2,U=1.23,j=.12,ue=new Ei;ue.moveTo(-P+j,-U),ue.lineTo(P-j,-U),ue.quadraticCurveTo(P,-U,P,-U+j),ue.lineTo(P,U-j),ue.quadraticCurveTo(P,U,P-j,U),ue.lineTo(-P+j,U),ue.quadraticCurveTo(-P,U,-P,U-j),ue.lineTo(-P,.36),ue.bezierCurveTo(-P+.49,.36,-P+.49,-.36,-P,-.36),ue.lineTo(-P,-U+j),ue.quadraticCurveTo(-P,-U,-P+j,-U);let Se=new Ts(ue,{depth:1.06,bevelEnabled:!0,bevelSize:.05,bevelThickness:.06,bevelSegments:2,curveSegments:12});return Se.rotateX(-Math.PI/2),ct(Se,at.clone(),C.clone().setY(.27))}function Fe(y,C,P){let U=$((ue,Se,de)=>{ue.fillStyle="#c7c8c5",ue.textAlign="center",ue.textBaseline="middle",ue.font="600 56px monospace",ue.fillText(y.label,Se/2,de*.37,Se*.96),ue.fillStyle="#999c9c",ue.font="30px monospace",ue.fillText(y.id,Se/2,de*.71)},768,224),j=ct(new wi(P-.65,1.75),new jt({map:U,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}),C.clone().setY(1.394));j.rotation.x=-Math.PI/2}let Ge=$((y,C,P)=>{let U=y.createRadialGradient(C/2,P/2,0,C/2,P/2,C/2);U.addColorStop(0,"#1b322344"),U.addColorStop(.5,"#1b32231b"),U.addColorStop(1,"#1b322300"),y.fillStyle=U,y.fillRect(0,0,C,P)},128,128);function Me(y,C,P,U=d){let j=ct(new wi(C,P),new jt({map:Ge,transparent:!0,depthWrite:!1}),y.clone().setY(.045),U);return j.rotation.x=-Math.PI/2,j.userData.softShadow=!0,j}let qe=$((y,C,P)=>{let U=y.createRadialGradient(C/2,P/2,0,C/2,P/2,C/2);U.addColorStop(0,"#ffca9566"),U.addColorStop(.3,"#ff6b4638"),U.addColorStop(1,"#ff6b4600"),y.fillStyle=U,y.fillRect(0,0,C,P)},128,128);for(let[y,C]of Object.entries(e.boards)){let P=(C.columns-1)*30+70,U=60+C.xOffset,j=145+C.yOffset;wn(P/30,1.25,605/30,ne([U+P/2,j+302.5],-.625),h?Ae("#f2eee5",.79,.015):ee,d,.2),h?wn((P-65)/30,.12,55/30,ne([U+P/2,455.5+C.yOffset],.01),Ae("#b9b9af",.91,.012),d,.06):an((P-45)/30,.06,65/30,ne([U+20+(P-45)/2,455.5+C.yOffset],.035),new vt({color:13686994,roughness:1}));let ue=$((xe,Ee,ve)=>{xe.scale(Ee/P,ve/605),xe.fillStyle="#faf9ef",xe.fillRect(0,0,P,605),xe.font="bold 14px Arial",xe.fillStyle="#475b52",xe.fillText(h?"830 PUNTOS \xB7 PASO 2,54 mm":"PLACA "+y+" \xB7 "+C.columns+" COLUMNAS",12,23),xe.font="13px Arial",xe.textAlign="center";for(let Ze=1;Ze<=C.columns;Ze++)(Ze===1||Ze%5===0||Ze===C.columns)&&xe.fillText(Ze,35+(Ze-1)*30,116);xe.textAlign="left";for(let Ze of"abcdefghij")xe.fillText(Ze,10,t([y,Ze,1])[1]-j+5);for(let Ze of["+T","-T","-B","+B"]){let Ye=t([y,Ze,1])[1]-j;xe.fillStyle=Ze[0]==="+"?"#bc444c":"#3e81b5",xe.fillText(Ze,8,Ye+5),xe.lineWidth=2,xe.strokeStyle=xe.fillStyle,xe.beginPath(),xe.moveTo(25,Ye-13),C.railBreak&&(xe.lineTo(945,Ye-13),xe.moveTo(1005,Ye-13)),xe.lineTo(P-20,Ye-13),xe.stroke()}},2048,640),Se=h?new vt({map:ue,roughness:.88,bumpMap:nt,bumpScale:.01}):new jt({map:ue}),de=ct(new wi(P/30,605/30),Se,ne([U+P/2,j+302.5],.008));de.rotation.x=-Math.PI/2;let Xe=[];for(let xe of[..."abcdefghij","+T","-T","-B","+B"])for(let Ee=1;Ee<=C.columns;Ee++)xe.length>1&&(C.railColumns?!C.railColumns.includes(Ee):C.railBreak&&Ee===C.railBreak+1)||Xe.push([y,xe,Ee]);let oe=h?[[.48,.017,13486525,.03],[.36,.039,7961458,.022],[.235,.052,3488056,.01],[.1,.063,10132369,.005]]:[[.38,.018,12107961,0],[.255,.03,4739406,0]];for(let[xe,Ee,ve,Ze]of oe){let Ye=Ze?new ar(xe,.024,xe,1,Ze):new In(xe,.012,xe),rt=new Ms(Ye,new vt({color:ve,roughness:.87}),Xe.length);Xe.forEach((yt,Ct)=>{X.position.copy(fe(yt,Ee)),X.updateMatrix(),rt.setMatrixAt(Ct,X.matrix)}),d.add(rt),rt.userData={holes:Xe},(!h||xe===.48)&&x.push(rt)}}for(let[y,C,P]of h?[]:[["L\xD3GICA \xB7 5 V REGULADOS","+5","G5"],["MOTOR \xB7 6 V","+6","G6"]]){let U=fe(["FUENTE",C,0]),j=fe(["FUENTE",P,0]),ue=U.clone().lerp(j,.5);W(y,ue.clone().setY(.2).add(new E(0,0,-.9)),9,1.4,{background:"#e0e8e2",color:"#345349",size:34});for(let[Se,de]of[[U,12861771],[j,3490619]])ct(new $t(.23,.23,.35,14),new vt({color:de}),Se.clone().setY(.2))}for(let y of e.chips||[]){let C=new Set(d.children),P=y.pins,U=P/2,j=y.start,ue=fe([y.board,"e",j]),Se=fe([y.board,"f",j+U-1]),de=ue.clone().lerp(Se,.5).setY(.8),Xe=U+.2,oe=h?Z(Xe,de):wn(Xe,1.25,2.45,de,y.dipSwitch?new vt({color:11349559,roughness:.55}):se.clone(),d,.13);oe.userData={chip:y.id},x.push(oe);let xe=new In(Xe+.08,1.32,2.52),Ee=new Fr(xe);xe.dispose();let ve=new ei(Ee,new xn({color:14265410,depthTest:!1}));if(ve.position.copy(de),ve.renderOrder=18,ve.visible=!1,d.add(ve),He.set(y.id,{body:oe,outline:ve}),Me(de,Xe+.5,2.8),!h){let Ye=ct(new Es(.27,28,Math.PI/2,Math.PI),new vt({color:1186075,roughness:.9}),de.clone().add(new E(-Xe/2+.04,.637,0)));Ye.rotation.x=-Math.PI/2}if(y.dipSwitch)for(let Ye=1;Ye<=4;Ye++){let rt=y.functions?.[Ye],yt=de.clone().add(new E(Ye-2.5,.77,.36));an(.65,.04,1.45,yt.clone().setY(de.y+.645).setZ(de.z),new vt({color:6364453}));let Ct=an(.51,.16,.62,yt,new vt({color:rt?16183011:10390917}));rt&&(Ct.userData={bit:rt,switchId:rt,dipSlider:!0,dipPosition:Ye,homeZ:de.z,componentHint:y.id},x.push(Ct),v.push(Ct)),W(String(Ye),de.clone().add(new E(Ye-2.5,.66,-.95)),.45,.35,{background:"#ad2e37",color:"#fff5ed",size:60})}else h?Fe(y,de,Xe):W(y.label+`
`+y.id,de.clone().add(new E(.12,.637,0)),Math.max(2,Xe-.9),1.75,{size:38});let Ze=ct(new Es(h?.15:.09,16),new jt({color:h?7829626:8884620}),de.clone().add(new E(-Xe/2+.4,h?.594:.638,.63)));Ze.rotation.x=-Math.PI/2;for(let Ye=1;Ye<=P;Ye++){let rt=Ye>U,yt=[y.board,rt?"e":"f",j+(rt?P-Ye:Ye-1)],Ct=fe(yt,.13),Jt=Ct.clone();Jt.z=de.z+(rt?-1.18:1.18),Jt.y=.5;let Ne=new Vi([Ct,Ct.clone().add(new E(0,.4,0)),Jt]),Qe=ct(new ki(Ne,16,h?.116:.07,4,!1),me,new E);Qe.userData={u:y.id,p:Ye,h:yt},x.push(Qe),A.push(Qe);let Et=an(.22,.12,.32,Jt.clone().setY(.54),me);Et.userData={u:y.id,p:Ye,h:yt},x.push(Et),T.set(y.id+"."+Ye,W(String(Ye),Ct.clone().add(new E(0,.025,rt?-.4:.4)),.55,.45,{color:"#35433e",background:"#faf9ef",size:95}))}ke(y.id,C,Array.from({length:P},(Ye,rt)=>{let yt=rt+1;return[y.board,yt>U?"e":"f",j+(yt>U?P-yt:yt-1)]})),h&&En.register({id:y.id,type:"chip",title:y.id+" \xB7 "+y.label,detail:y.name,anchor:de.clone().setY(1.57),hitPoint:de.clone(),group:Q.get(y.id).group}),y.dipSwitch&&En.register({id:y.id,type:"switch",title:y.id+" \xB7 DIP de 4 posiciones",detail:()=>Object.entries(y.functions).map(([Ye,rt])=>Ye+" "+{ABRIR:"Abrir",CERRAR:"Cerrar",STOP:e.stopClosedRun?"RUN":"STOP",FCA:"Final abierta",FCC:"Final cerrada"}[rt]+" "+(k[y.id]?.[Ye]?"ON":"OFF")).join(" \xB7 "),anchor:de.clone().setY(1.85),hitPoint:de.clone(),group:Q.get(y.id).group})}for(let y of e.arrays||[]){let C=new Set(d.children),P=Object.entries(y.pinHoles||{}).sort((xe,Ee)=>Number(xe[0])-Number(Ee[0]));if(!P.length)continue;let U=P.map(([,xe])=>fe(xe,.1)),j=U[0],ue=U[U.length-1],Se=j.clone().lerp(ue,.5).setY(1.5),de=j.distanceTo(ue)+.98,Xe=new vt({color:5652021,roughness:.65});wn(de,1.9,.8,Se,Xe,d,.12),Me(Se,de+.3,1.35),W(y.id+"  8 x 1k",Se.clone().setY(2.46),de-.55,.7,{background:"#563e35",color:"#f2e8dc",size:35}),P.forEach(([xe,Ee])=>{let ve=fe(Ee,.1),Ze=ve.clone().setY(.58),Ye=xi([ve,Ze],d);Ye.userData={array:y.id,p:Number(xe),h:Ee,common:Number(xe)===(y.commonPin||1)},D.push(Ye);let rt=Number(xe)===(y.commonPin||1)?xe+" COM":xe;W(rt,ve.clone().setY(.055).add(new E(0,0,.82)),Number(xe)===(y.commonPin||1)?1.15:.5,.4,{background:"#faf9ef",color:"#35433e",size:Number(xe)===(y.commonPin||1)?40:80})});let oe=y.pinHoles?.[y.commonPin||1];if(oe){let xe=ct(new Es(.095,20),new jt({color:15978908}),fe(oe,2.462),d);xe.rotation.x=-Math.PI/2}ke(y.id,C,P.map(([,xe])=>xe))}for(let y of e.displays||[]){let C=new Set(d.children),P=Object.values(y.pins).map(Ze=>fe(Ze)),U=P.reduce((Ze,Ye)=>Ze.add(Ye),new E).multiplyScalar(1/P.length),{width:j,length:ue,height:Se,leadDiameter:de}=qi,Xe=j/On,oe=ue/On,xe=Se/On,Ee=.26,ve=Ee+xe;wn(Xe,xe-.07,oe,U.clone().setY(Ee+(xe-.07)/2),_e,d,.11),wn(Xe-.18,.15,oe-.18,U.clone().setY(ve-.075),we,d,.065),Me(U,Xe+.4,oe+.4);for(let[Ze,Ye]of Object.entries(y.pins)){let rt=fe(Ye,.1),yt=de/On;wn(yt,.38,yt,rt.clone().setY(.18),me,d,.024),W(String(Ze),rt.clone().add(new E(0,.025,Number(Ze)<=5?1.1:-1.1)),.45,.35,{background:"#faf9ef",color:"#35433e",size:80})}for(let[Ze,Ye]of Object.entries(it)){let rt=Ae(qi.lens,.42,.018),yt=ct(Ye,rt,U.clone().setY(ve+.015));R.set(y.id+"."+Ze,yt)}W(y.id,U.clone().setY(ve+.017).add(new E(0,0,3.22)),2,.31,{background:qi.face,color:"#cfbeb8",size:45}),ct(new mi(.06,10,8),new vt({color:11576992}),U.clone().setY(ve+.012).add(new E(-2.04,0,3.15))),ke(y.id,C,Object.values(y.pins))}function Je(y){if(y.externalLead)return;let C=fe(y.a),P=fe(y.b),U=C.distanceTo(P),j=y.kind==="res",ue=y.kind!=="wire",Se=!ue&&Array.isArray(y.route)&&y.route.length>=2,de=!ue&&y.a[0]!==y.b[0],Xe=ue?.6:Se?Math.max(.48,Number(y.routeHeight)||.78):y.a[0]!==y.b[0]?2.6+Number(y.id.slice(1))%3*.22:Math.min(2.25,.65+U*.065),oe=new gn,xe=[];d.add(oe);let Ee=C.clone().lerp(P,.5);Ee.y=Xe;let ve=Se?[C,...y.route.map(Ne=>ne(Ne,Xe)),P]:null,Ze=de?w(C,P,ve,Xe):Se?Oa(ve):new Vi(j?[C,C.clone().setY(.45),C.clone().setY(1.65),C.clone().setY(2.8),C.clone().setY(3.14),P.clone().setY(3.14),P.clone().setY(2.7),P]:[C,C.clone().setY(.36),C.clone().lerp(P,.18).setY(Xe),Ee,C.clone().lerp(P,.82).setY(Xe),P.clone().setY(.36),P],!1,"centripetal"),Ye=new vt({color:y.color||(e.colors||{})[y.net]||"#087f93",roughness:.42,metalness:.02}),rt=de?Math.max(64,Math.ceil(Ze.getLength()*3)):Se?Math.max(48,ve.length*12):U>12?64:40,yt=ct(new ki(Ze,rt,ue?.046:y.routingClass==="power"?.145:.125,10,!1),ue?me.clone():Ye,new E,oe);if(yt.visible=y.kind==="wire",yt.userData={id:y.id},x.push(yt),!ue){let Ne=de?{pin:Le.clone(),housing:ie.clone(),collar:le.clone()}:{pin:me.clone()};for(let Qe of[C,P]){let Et=de?z(Qe,oe,Ne,y.id):ct(xt,Ne.pin,Qe.clone().setY(.09),oe);xe.push([{mesh:Et,home:Et.position.clone()}])}}if(j){let Ne=h&&U>=2.8,Qe=Ne?Ee.clone().setY(.68):C.clone().setY(1.65),[Et,Zt,Ut]=l_(y.value),It=[ce,pe[Et],pe[Zt],Ut===-1?ge:pe[Ut]||pe[2],ge],Ft=ct(Vt,It.map(lo=>lo.clone()),Qe,oe);Ft.userData={id:y.id},x.push(Ft);let rn=oo.leadDiameter/On/2,cs=[C,C.clone().setY(.47)],fr=[C.clone().setY(2.86),C.clone().setY(3.14),P.clone().setY(3.14),P.clone().setY(2.7),P];if(Ne){let lo=P.clone().sub(C).normalize(),th=oo.profile.at(-1)[0]/On;Ft.quaternion.setFromUnitVectors(new E(0,1,0),lo),cs=[C,C.clone().setY(.5),Qe.clone().addScaledVector(lo,-th)],fr=[Qe.clone().addScaledVector(lo,th),P.clone().setY(.5),P]}let hs=xi(cs,oe,rn),Ba=xi(fr,oe,rn);hs.userData=Ba.userData={id:y.id},x.push(hs,Ba),En.register({id:y.partId||y.id,connectionId:y.id,type:"res",title:(y.partId||y.id)+" \xB7 Resistencia",detail:y.value,anchor:Qe.clone().setY(Ne?1.25:2.95),hitPoint:Qe.clone(),group:oe})}let Ct=y.kind==="cap"&&(y.polarized||/^(10|100)\s*(µ|μ|u)/i.test(y.value));if(y.kind==="cap"&&!Ct){let Ne=Ee.clone().setY(.95),Qe=ct(new mi(.43,20,14),new vt({color:13143105,roughness:.72}),Ne,oe);Qe.scale.set(1,1,.38),Qe.userData={id:y.id},x.push(Qe);for(let[Et,Zt]of[C,P].entries())xi([Zt,Zt.clone().setY(.32),Ne.clone().add(new E(Et?.2:-.2,-.2,0))],oe);if(!h){let Et=W(y.value,Ne.clone().add(new E(0,.5,0)),1.8,.5,{background:"#c88c41",color:"#30271c",size:43});oe.add(Et)}}if(Ct){let Ne=Ee.clone().setY(1.45),Qe=$((Ut,It,Ft)=>{Ut.fillStyle="#24485a",Ut.fillRect(0,0,It,Ft),Ut.fillStyle="#d2ddd5",Ut.fillRect(It*.21,0,It*.16,Ft),Ut.fillStyle="#24485a",Ut.font="bold 30px Arial",Ut.textAlign="center";for(let rn=30;rn<Ft;rn+=50)Ut.fillText("\u2212",It*.29,rn);Ut.fillStyle="#dde6e3",Ut.font="600 32px Arial",Ut.fillText(y.value,It*.67,Ft*.38),Ut.font="26px Arial",Ut.fillText("16 V",It*.67,Ft*.65)},512,256),Et=ct(new $t(.64,.64,1.8,40),[new vt({map:Qe,roughness:.4}),me.clone(),se.clone()],Ne,oe);Et.userData={id:y.id},x.push(Et),Et.rotation.y=Math.PI/2-Math.PI*2*.29;for(let[Ut,It]of[C,P].entries())xi([It,It.clone().setY(.4),Ne.clone().setY(.55).add(new E(Ut?.28:-.28,0,0))],oe);let Zt=Ne.clone().setY(2.359);if(an(.76,.008,.022,Zt,se.clone(),oe).rotation.y=Math.PI/4,an(.76,.008,.022,Zt,se.clone(),oe).rotation.y=-Math.PI/4,Me(Ne,2.1,1.8,oe),!h){let Ut=W(y.id+" \xB7 "+y.value,Ne.clone().setY(.055).add(new E(0,0,1.02)),2.4,.45,{background:"#faf9ef",color:"#345349",size:43});oe.add(Ut)}}if(y.kind==="pot"){let Ne=Ee.clone().setY(1.02),Qe=wn(2.65,1.35,1.6,Ne,new vt({color:1534356,roughness:.36}),oe,.11);Qe.userData={id:y.id},x.push(Qe),an(2.44,.08,1.42,Ne.clone().setY(.39),new vt({color:1065310}),oe),ct(new $t(.59,.59,.04,32),new vt({color:1523798}),Ne.clone().setY(1.717),oe);let Et=ct(new $t(.51,.51,.16,40),new vt({color:12557136,metalness:.8,roughness:.24}),Ne.clone().setY(1.79),oe);Et.userData={id:y.id},x.push(Et),Y=an(.79,.018,.11,Ne.clone().setY(1.879),se.clone(),oe);let Zt=W("203",Ne.clone().add(new E(.76,.679,-.4)),.68,.39,{background:"#176994",color:"#e6f0ec",size:77});oe.add(Zt);for(let It of e.potPins){let Ft=fe(It);xi([Ft,Ft.clone().setY(.4)],oe)}Me(Ne,3.3,2.3,oe);let Ut=W("RV1 \xB7 20 k\u03A9",Ne.clone().setY(.06).add(new E(0,0,-1.08)),3,.55,{background:"#faf9ef",color:"#345349",size:42});oe.add(Ut);for(let It=0;It<3;It++){let Ft=fe(e.potPins[It],.035),rn=W(String(It+1),Ft.clone().add(new E(0,0,.95)),.55,.4,{background:"#faf9ef",color:"#345349",size:85});oe.add(rn)}}if(y.kind==="led"){let Ne=Ee.clone().setY(1.22),Qe=new tr({color:12731186,emissive:0,roughness:.18,metalness:0,clearcoat:1,clearcoatRoughness:.1,transparent:!0,opacity:.88,depthWrite:!1}),Et=h?.92:.52,Zt=ct(new $t(Et,Et,.8,32),Qe,Ne,oe),Ut=ct(new mi(Et,32,20,0,Math.PI*2,0,Math.PI/2),Qe,Ne.clone().setY(1.62),oe),It=ct(new $t(Et+.08,Et+.08,.14,32),Qe,Ne.clone().setY(.77),oe);for(let cs of[Zt,Ut,It])cs.userData={id:y.id,baseOpacity:.88},x.push(cs);Qe.userData.baseColor=y.color||{LY:"#eab83f",LG:"#2cab66",LR:"#d34436"}[y.value]||"#d34436",Qe.color.set(Qe.userData.baseColor),L.set(y.value,Qe);for(let[cs,fr]of[C,P].entries()){let hs=Ne.clone().setY(1.27).add(new E(cs?.18:-.18,0,0));xi([fr,fr.clone().setY(.48),hs.clone().setY(.72),hs],oe)}an(.18,.19,.18,Ne.clone().setY(1.33).add(new E(.18,0,0)),me.clone(),oe);let Ft=ct(new mi(.18,16,10,0,Math.PI*2,0,Math.PI/2),new vt({color:12897486,metalness:.8,roughness:.2,side:gi}),Ne.clone().add(new E(.18,.23,0)),oe);Ft.rotation.x=Math.PI,ct(new ki(new Vi([Ne.clone().add(new E(-.18,.1,0)),Ne.clone().add(new E(-.05,.43,0)),Ne.clone().add(new E(.18,.28,0))]),12,.012,5,!1),me,new E,oe),an(.04,.11,.42,Ne.clone().add(new E(h?Math.sign(P.x-C.x)*(Et+.035):.56,-.45,0)),new vt({color:h?5448802:9978422,roughness:.55}),oe);let rn=new Nr(new Zs({map:qe,transparent:!0,depthWrite:!1,blending:fa}));rn.position.copy(Ne).setY(1.47),rn.scale.set(2.6,2.6,1),rn.visible=!1,oe.add(rn),O.set(y.value,rn),Me(Ne,1.7,1.7,oe),En.register({id:y.partId||y.id,connectionId:y.id,type:"led",title:h?"LED \xB7 peso "+y.bit:{LR:"LED rojo",LY:"LED amarillo",LG:"LED verde"}[y.value]||"LED",detail:h?"C\xE1todo hacia LED"+y.bit+"_N":{LR:"STOP \xB7 parpadeo",LY:"Puerta en movimiento",LG:"Puerta completamente abierta"}[y.value]||y.value,anchor:Ne.clone().setY(h?2.65:2.25),hitPoint:Ne.clone(),group:oe})}if(y.kind==="motor"&&!y.externalMotor){let Ne=Ee.clone().setY(1.2),Qe=new vt({color:10595762,metalness:.78,roughness:.28}),Et=ct(new $t(.9,.9,2.4,32),Qe,Ne,oe);Et.rotation.z=Math.PI/2;for(let It of[-1.17,1.17]){let Ft=ct(new $t(.86,.86,.14,32),It<0?se:me,Ne.clone().add(new E(It,0,0)),oe);Ft.rotation.z=Math.PI/2}let Zt=ct(new $t(.12,.12,1,16),me,Ne.clone().add(new E(1.65,0,0)),oe);Zt.rotation.z=Math.PI/2;for(let It of[-.42,.42])an(.58,.025,.18,Ne.clone().add(new E(-.55,.8,It)),se,oe);[C,P].forEach((It,Ft)=>{let rn=Ne.clone().add(new E(-1.27,Ft?.28:-.28,0));an(.12,.2,.3,rn,me,oe),xi([It,It.clone().setY(.5),rn],oe)});let Ut=W("MOTOR CC \xB7 EXTERNO",Ne.clone().add(new E(0,1.22,0)),3.2,.6,{background:"#53676e",color:"#fff",size:36});oe.add(Ut)}if(y.kind==="motor"&&y.externalMotor){let Ne=y.externalMotor,Qe=ne(Ne.center,3.7),Et=new vt({color:15914312,roughness:.4}),Zt=new vt({color:14072114,roughness:.55}),Ut=new vt({color:12108486,metalness:.82,roughness:.28}),It=wn(13.2,7.1,7.3,Qe.clone().add(new E(-3.4,0,0)),Et,oe,.55);It.userData={id:y.id},x.push(It),Me(Qe,29,12,oe),wn(12.2,.16,6.4,Qe.clone().add(new E(-3.4,3.62,0)),Zt,oe,.12);let Ft=ct(new $t(2.65,2.65,8.8,40),Ut,Qe.clone().add(new E(7.1,0,0)),oe);Ft.rotation.z=Math.PI/2,Ft.userData={id:y.id},x.push(Ft);let rn=ct(new $t(2.56,2.56,1.25,32),se,Qe.clone().add(new E(11.9,0,0)),oe);rn.rotation.z=Math.PI/2;for(let us of[-1.2,1.2])wn(3.3,.12,.65,Qe.clone().add(new E(9,2.3,us)),se,oe,.08);for(let us of[-7.8,1.1])for(let Ki of[-2.75,2.75]){let co=ct(new $t(.24,.24,.08,16),me,Qe.clone().add(new E(us,3.74,Ki)),oe);an(.32,.02,.06,co.position.clone().add(new E(0,.06,0)),se,oe)}let cs=ct(new $t(1.3,1.3,.65,28),Zt,Qe.clone().add(new E(-3.6,0,3.92)),oe);cs.rotation.x=Math.PI/2;let fr=ct(new $t(.78,.78,3.1,28),ee,Qe.clone().add(new E(-3.6,0,5.55)),oe);fr.rotation.x=Math.PI/2,an(1.1,.18,2.7,Qe.clone().add(new E(-3.6,.71,5.55)),ee,oe);let hs=new gn;oe.add(hs);let Ba=[];B.push({id:y.partId,group:hs,cables:Ba,stage:y.wiringStage??y.stage}),Ne.terminals.map(us=>ne(us,2.15)).forEach((us,Ki)=>{an(.18,.55,.65,us,me,oe);let co=Ki?P:C,tm=Ne.cableRoutes?.[Ki]?Nd(Ia,Ne.cableRoutes[Ki],ne,us,co,Ne.cableHeights[Ki]):new Vi([us,ne([t(Ki?y.b:y.a)[0],790+Ki*28],1.2),co.clone().setY(.55),co],!1,"centripetal"),nh=new gn;hs.add(nh);let y_=new vt({color:Ki?3361114:14179409,roughness:.45}),Dd=ct(new ki(tm,96,.13,10,!1),y_,new E,nh),v_=an(.3,.46,.3,co.clone().setY(.23),se,nh);Dd.userData={id:y.id},x.push(Dd),Ba.push({group:nh,wire:Dd,curve:tm,plug:v_,terminal:Ki,progress:1})});let th=W(Ne.label||"MOTORREDUCTOR TT \xB7 EXTERNO",ne([Ne.center[0],Ne.bounds[1]+24],.12),22,.9,{background:"#f3f2e8",color:"#345349",size:35});oe.add(th)}if(y.kind==="switch"&&y.externalControl&&(N.push(sm({THREE:Ia,it:y,group:oe,mesh:ct,box:an,roundedBox:wn,toWorld:ne,hpos:fe,point:t,topLabel:W,contactShadow:Me,pickables:x,switches:v,metal:me,dark:se,componentLabels:!1})),En.register({id:y.partId||y.id,connectionId:y.id,type:"switch",title:"Interruptor "+y.value,detail:y.externalControl.model.toUpperCase(),anchor:ne(y.externalControl.center,4.1),group:oe})),y.kind==="switch"&&y.tactile){let Ne=[C,P,...(y.extraPins||[]).map(([Ft])=>fe(Ft))],Qe=Ne.reduce((Ft,rn)=>Ft.add(rn),new E).multiplyScalar(1/Ne.length),Et=wn(2.36,.62,2.36,Qe.clone().setY(.36),Ae("#1d1f22",.62,.02),oe,.07);Et.userData={id:y.id},x.push(Et);let Zt=wn(2.42,.06,2.42,Qe.clone().setY(.7),new vt({color:13225680,roughness:.28,metalness:.85}),oe,.02);for(let Ft of[-1,1])an(.08,.5,.5,Qe.clone().add(new E(Ft*1.22,.45,0)),me,oe);let Ut=ct(new $t(.62,.66,.34,32),Ae("#26282c",.5,.01),Qe.clone().setY(.88),oe),It=ct(new $t(.58,.6,.42,32),new tr({color:12727852,roughness:.38,clearcoat:.6,clearcoatRoughness:.3}),Qe.clone().setY(1.24),oe);It.userData={switchId:y.value||y.id,tactile:!0,homeY:It.position.y,stem:Ut,stemY:Ut.position.y,baseColor:"#c2362c"},x.push(It),v.push(It);for(let Ft of Ne){let rn=Qe.clone().sub(Ft).setY(0).multiplyScalar(.18);xi([Ft,Ft.clone().setY(.3),Ft.clone().add(rn).setY(.52)],oe,.06)}Me(Qe,2.9,2.9,oe),En.register({id:y.partId||y.id,connectionId:y.id,type:"switch",title:"Pulsador "+(y.value||y.id),detail:"Lleva INICIO_N a GND \xB7 CLEAR de los cuatro JK",anchor:Qe.clone().setY(2.1),hitPoint:Qe.clone(),group:oe})}if(y.kind==="switch"&&!y.externalControl&&!y.tactile){let Ne=(y.spdt?C.clone().lerp(fe(y.third),.5):Ee.clone()).setY(.65),Qe=wn(y.spdt?2.8:1.8,.9,1.35,Ne,new vt({color:3426627}),oe,.12),Et=wn(1.12,.28,.9,Ne.clone().add(new E(0,.58,0)),new vt({color:2383765}),oe,.08);if(Et.userData={bit:y.value||y.id},x.push(Et),v.push(Et),Et.userData.switchId=y.value||y.id,[C,P,...y.third?[fe(y.third)]:[]].forEach(Zt=>xi([Zt,Zt.clone().setY(.5)],oe)),En.register({id:y.partId||y.id,connectionId:y.id,type:"switch",title:"Interruptor "+(y.value||y.id),detail:y.contact==="NC"?"Final de carrera":"Mando de puerta",anchor:Ne.clone().setY(1.9),group:oe}),y.contact==="NC"||y.contact==="limit-spdt"){Et.visible=!1;let Zt=an(2.45,.085,.24,Ne.clone().add(new E(.5,.58,0)),me,oe);Zt.rotation.z=-.15;let Ut=ct(new $t(.22,.22,.36,20),se,Ne.clone().add(new E(1.65,.41,0)),oe);Ut.rotation.x=Math.PI/2}else{let Zt=(y.value||"")==="STOP";Et.material.color.set(Zt?"#bd4139":"#245f95"),Et.userData.baseColor=Zt?"#bd4139":"#245f95";let Ut=W(Zt?"STOP":"I / O",Ne.clone().add(new E(0,.73,0)),.9,.4,{background:Zt?"#bd4139":"#245f95",color:"#fff",size:40});oe.add(Ut)}}let Jt=de?1-ye/Ze.getLength():1;b.set(y.id,{group:oe,wire:yt,material:Ye,curve:Ze,a:C,b:P,it:y,routed:Se,routePoints:ve,height:Xe,plugs:xe,approach:Jt}),["wire","link"].includes(y.kind)||Q.set(y.partId||y.id,{group:oe,holes:[y.a,y.b,...y.third?[y.third]:[]],external:!!(y.externalControl||y.externalMotor),home:oe.position.clone()})}e.items.forEach(Je);for(let y of e.items.filter(C=>C.externalLead)){let C=y.externalLead,P=C.motor?B.find(Se=>Se.id===C.partId):N.find(Se=>Se.id===C.partId),U=P?.cables[C.terminal];if(!U)throw new Error("Missing external cable "+y.id);d.add(U.group),U.nativeId=y.id,U.wire.userData={id:y.id},U.tip&&(U.tip.visible=!1);let j=U.curve.getPoint(0),ue=U.curve.getPoint(1);b.set(y.id,{group:U.group,wire:U.wire,material:U.wire.material,curve:U.curve,a:j,b:ue,it:y,routed:!1,routePoints:null,height:1.8,plugs:[[],[{mesh:U.plug,home:U.plug.position.clone()}]]})}let ft=new gn;ft.visible=!1,d.add(ft);let ot=new lr,We=null,Bt=0,Qt=[],zt=-1,Rt=new E,en=new E,Oe=ct(new mi(1,12,8),new vt,new E),Tn=Oe.material;Oe.visible=!1;let Tt=y=>(y=Wn.clamp(y,0,1),y*y*(3-2*y)),pn=[[1587247,10],[16765290,7],[556947,3]].map(([y,C],P)=>{let U=new Us({color:y,linewidth:C,worldUnits:!1,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),j=new jc(ot,U);return j.renderOrder=24+P,j.frustumCulled=!1,ft.add(j),j});function yi(y){if(ft.visible=!!(y?.group.visible&&y.it.kind==="wire"),!ft.visible){We=null;return}if(We===y.it.id)return;let C=y.wire.geometry.parameters.tubularSegments;Qt=Array.from({length:C+1},(U,j)=>y.curve.getPointAt(j/C)),zt=-1;let P=new lr;P.setPositions(Qt.flatMap(U=>U.toArray())),ot.dispose(),ot=P,pn.forEach(U=>{U.geometry=P}),pn[2].material.color.copy(y.material.color),We=y.it.id,Bt++}let Zn=[0,1].map(y=>{let C=ct(new Hi(.35,.075,8,24),new jt({color:y?4284356:882277,depthTest:!1,depthWrite:!1}),new E);return C.rotation.x=-Math.PI/2,C.renderOrder=15,C.visible=!1,{ring:C}}),Jn=ct(new mi(.17,12,8),new jt({color:16768134,depthTest:!1,depthWrite:!1}),new E);Jn.renderOrder=32,Jn.visible=!1;let Gt=[0,1].map(()=>{let y=ct(new Hi(.22,.06,8,24),new jt({color:15840829,depthTest:!1}),new E);return y.rotation.x=-Math.PI/2,y.renderOrder=16,y.visible=!1,y});function sn(y){for(;y;){if(!y.visible)return!1;y=y.parent}return!0}let Pi=new ca,Yt=new ae,ui=null;p.addEventListener("pointerdown",y=>{ui=[y.clientX,y.clientY]}),p.addEventListener("pointerup",y=>{if(!ui||Math.hypot(y.clientX-ui[0],y.clientY-ui[1])>6||y.button!==0)return;let C=p.getBoundingClientRect();Yt.set((y.clientX-C.left)/C.width*2-1,-(y.clientY-C.top)/C.height*2+1),Pi.setFromCamera(Yt,u);let P=Pi.intersectObjects(x,!1).find(de=>sn(de.object));if(!P){En.dismiss();return}let U=P.object.userData,j=e.chips?.find(de=>de.id===U.chip&&de.dipSwitch),ue=null;if(j){let de=P.object.getWorldPosition(new E),Xe=Wn.clamp(Math.floor(P.point.x-de.x+2)+1,1,4);ue=j.functions?.[Xe]}ue?o(ue):U.id?i(U.id):U.p?r(U.u||U.array,U.p):U.chip?l(U.chip):U.holes&&P.instanceId!==void 0?c(U.holes[P.instanceId]):U.bit!==void 0&&o(U.bit);let Se=U.bit!==void 0?e.items.find(de=>de.kind==="switch"&&de.value===U.bit):null;En.select(U.componentHint||U.id||U.chip||U.u||Se?.partId||Se?.id)}),_.addEventListener("start",()=>{Te=null,bn=!1,p.dataset.moving="false",kt=50}),_.addEventListener("change",()=>{ao=!0,Nt()}),_.addEventListener("end",()=>{kt=50,Nt()});function Nt(){De&&!document.hidden&&!he&&(he=requestAnimationFrame(u_))}function eh(){let y=b.get(Na);if(!y?.group.visible)return;let{width:C,height:P}=s.getBoundingClientRect();if(!C||!P||!mt?.cableFocus||y.it.kind!=="wire"||ze)return;let U=2*Math.tan(u.fov*Math.PI/360)/P;for(let{ring:j}of Zn){let ue=j.position.clone().sub(u.position).dot(u.getWorldDirection(new E));j.scale.setScalar(Wn.clamp(ue*U*5/.35,1,2.6))}}function u_(y){if(he=0,!(!De||document.hidden)){if(ao=!1,Te){let C=Wn.clamp((y-Te.started)/680,0,1),P=C<.5?4*C*C*C:1-Math.pow(-2*C+2,3)/2;u.position.lerpVectors(Te.fromPos,Te.toPos,P),_.target.lerpVectors(Te.fromTarget,Te.toTarget,P),C===1&&(Te=null,p.dataset.moving="false")}if(ze){let C=Wn.clamp((y-ze.started)/ze.duration,0,1);Jn.position.copy(ze.curve.getPointAt(C)),Jn.visible=C<1,Zn.forEach(({ring:P})=>P.scale.setScalar(1+.25*Math.sin(C*Math.PI*2))),C===1&&(ze=null,Zn.forEach(({ring:P})=>P.scale.setScalar(1)))}_.update(),eh(),En.layout(),f.render(d,u),Ua++,(Te||ze||ao&&kt-- >0)&&Nt()}}function Rd(){Te&&(u.position.copy(Te.toPos),_.target.copy(Te.toTarget),Te=null,_.update()),ze=null,Jn.visible=!1,Zn.forEach(({ring:y})=>y.scale.setScalar(1)),p.dataset.moving="false",Nt()}function Gp(y,C=!0){Mn=[...y];let[P,U,j,ue]=y,Se=ne([P+j/2,U+ue/2],1.6),de=bn?new E(0,1,.001):u.position.clone().sub(_.target).normalize();de.length()<.5&&de.set(.18,1.15,1.2).normalize();let Xe=new E().crossVectors(u.up,de).normalize(),oe=new E().crossVectors(de,Xe).normalize(),xe=8,Ee=Math.tan(u.fov*Math.PI/360);for(let Ze of[-j/60,j/60])for(let Ye of[-ue/60,ue/60])for(let rt of[-1.6,4]){let yt=new E(Ze,rt,Ye);xe=Math.max(xe,yt.dot(de)+1.08*Math.abs(yt.dot(Xe))/(Ee*u.aspect),yt.dot(de)+1.08*Math.abs(yt.dot(oe))/Ee)}cr=xe;let ve=Se.clone().addScaledVector(de,xe);Te=null,C&&mt?.animate&&De&&ii.motion==="full"?(Te={fromPos:u.position.clone(),toPos:ve,fromTarget:_.target.clone(),toTarget:Se,started:performance.now()},p.dataset.moving="true"):(u.position.copy(ve),_.target.copy(Se),_.update(),p.dataset.moving="false"),Nt()}function Cd(y){mt=y,Na=y.selected,typeof y.clarity=="boolean"?qn=y.clarity:typeof y.routingFocus=="boolean"&&(qn=y.routingFocus),typeof y.isolate=="boolean"&&(Fs=y.isolate);let C=y.studio,P=!!C?.chip,U=new Set(C?.related||[]),j=new Set(C?.signals?.active?C.signals.ids:[]),ue=b.get(y.selected),Se=qn&&!!ue,de=ue?.it.partId,Xe=new Set([de,...[ue?.it.fromRef,ue?.it.toRef].filter(Boolean).map(Ee=>Ee.split(".")[0])].filter(Boolean)),oe=y.cableFocus&&Se&&ue?.it.kind==="wire",xe=[ue?.it.fromRef,ue?.it.toRef].filter(Ee=>/^U\d+\.\d+$/.test(Ee||""));for(let[Ee,ve]of b){let Ze=!["wire","link"].includes(ve.it.kind)||y.step===e.stages.length-1||ve.it.stage===y.step;ve.group.visible=(Ze||y.previous&&ve.it.stage<y.step||P&&U.has(Ee))&&!(Fs&&ue?.it.kind==="wire"&&ve.it.kind==="wire"&&Ee!==y.selected);let Ye=Xe.has(ve.it.partId),rt=ve.it.kind==="wire"&&ue?.it.kind==="wire"&&ue.it.signal&&ve.it.signal===ue.it.signal,yt=ve.it.kind==="wire"&&de&&[ve.it.fromRef,ve.it.toRef].some(Jt=>Jt?.startsWith(de+".")),Ct=oe&&!P&&!C?.signals?.active?ve.it.kind==="wire"&&Ee!==y.selected?rt?.32:.22:1:C?.signals?.active&&ve.it.kind==="wire"?j.has(Ee)?1:.16:P?U.has(Ee)?1:ve.it.kind==="wire"?.1:.8:Ee===y.selected?1:Se?ve.it.kind==="wire"?rt||yt?.32:.16:Ye?1:.92:y.selected?.4:Ze?1:.75;ve.group.traverse(Jt=>{if(Jt.userData.viewerLabel&&(Jt.visible=!Se||Ee===y.selected||Ye),Jt.isMesh)for(let Ne of[].concat(Jt.material)){let Qe=Jt.userData.baseOpacity??1;Ne.transparent=Ct<1||Qe<1||!!Jt.userData.softShadow,Ne.opacity=Ct*Qe,Ne.depthWrite=Ct>.6&&Qe===1&&!Jt.userData.softShadow}}),ve.material.emissive.set(Ee===y.selected?ve.material.color:0),ve.material.emissiveIntensity=Ee===y.selected?.3:0}yi(ue);for(let[Ee,ve]of T)ve.visible=P?Ee.startsWith(C.chip+".")&&(!C.pin||Ee===C.chip+"."+C.pin):!Se||xe.includes(Ee);Gt.forEach((Ee,ve)=>{let Ze=xe[ve],Ye=A.find(rt=>rt.userData.u+"."+rt.userData.p===Ze);Ee.visible=!!(Se&&Ye),Ye&&Ee.position.copy(fe(Ye.userData.h,.23))}),Zn.forEach(({ring:Ee},ve)=>{let Ze=b.get(y.selected);Ee.visible=!!Ze?.group.visible,Ee.scale.setScalar(1),Ze&&Ee.position.copy(ve?Ze.b:Ze.a).add(new E(0,.14,0))}),Y&&(Y.rotation.y=(y.pot/100-.5)*Math.PI),__(C),En.sync(y.selected||C?.chip||"",y.selected||C?.chip),Yp(y),Wp(V);for(let Ee of B)Ee.group.visible=y.step>=Ee.stage;s.dataset.selected=y.selected||"",s.dataset.step=y.step,s.dataset.wireClarity=String(qn),s.dataset.isolateWires=String(Fs),s.dataset.visibleConnections=[...b.values()].filter(Ee=>Ee.group.visible).length,y.animate||Rd(),Nt()}function Wp(y){V=y;let C=0;for(let P of N)for(let U of P.cables){if(U.nativeId){C++;continue}let j=y&&P.id===y.id&&U.terminal===y.terminal;U.group.visible=mt?.step>=(P.wiringStage||2)&&(!y||C<=y.index),rm(U,j?y.progress:1),C++}Nt()}function d_(y){let C=!!y;C!==qn&&(qn=C,mt?Cd({...mt,clarity:C}):(s.dataset.wireClarity=String(C),Nt()))}function Xp(y){let C=!1;for(let[P,U]of L){let j=!!y[P];U.userData.lit!==j&&(U.userData.lit=j,U.color.set(U.userData.baseColor),U.emissive.set(j?U.userData.baseColor:"#000000"),U.emissiveIntensity=j?.9:0,O.get(P).visible=j,C=!0)}C&&Nt()}function Yp(y={}){k=y.contacts||Object.fromEntries((e.chips||[]).filter(C=>C.dipSwitch).map(C=>[C.id,Object.fromEntries(Object.entries(C.functions).map(([P,U])=>[P,e.stopClosedRun&&U==="STOP"?!y.switches?.[U]:!!y.switches?.[U]]))])),Xp(y.leds||{});for(let[C,P]of R){let[U,j]=C.split("."),ue=!!(y.segments?.[C]??y.segments?.[U]?.[j]);P.material.color.set(ue?qi.lit:qi.lens),P.material.emissive.set(ue?qi.lit:"#000000"),P.material.emissiveIntensity=ue?1.35:0}for(let C of v){if(C.userData.tactile){let P=y.switches?.[C.userData.switchId]?.16:0;C.position.y=C.userData.homeY-P,C.userData.stem.position.y=C.userData.stemY-P;continue}if(C.userData.dipSlider){let P=!!y.switches?.[C.userData.switchId],U=k[C.userData.componentHint]?.[C.userData.dipPosition]??(e.stopClosedRun&&C.userData.switchId==="STOP"?!P:P);C.position.z=C.userData.homeZ+(U?-.36:.36);continue}if(C.userData.externalControl){Ud(C,!!y.switches?.[C.userData.switchId]);continue}C.rotation.z=y.switches?.[C.userData.switchId]?-.18:.18,C.material.color.set(y.switches?.[C.userData.switchId]?"#da7044":C.userData.baseColor||"#245f95")}Nt()}function f_(){let y=b.get(Na);!y||!y.group.visible||!mt?.animate||!De||(ze={curve:y.curve,started:performance.now(),duration:Math.min(6e3,Math.max(2200,y.curve.getLength()*60))},Jn.visible=!0,Nt())}function p_(y){let C=y?.stripHoles||[],P=JSON.stringify(C);if(P===St||(St=P,wt.traverse(de=>{if(de.geometry?.dispose(),de.material)for(let Xe of[].concat(de.material))Xe.dispose()}),wt.clear(),!C.length))return;let U=fe(C[0],.09),j=fe(C.at(-1),.09),ue=U.clone().lerp(j,.5),Se=Math.abs(U.x-j.x)>Math.abs(U.z-j.z);an(Se?U.distanceTo(j)+.6:.62,.045,Se?.62:U.distanceTo(j)+.6,ue,new jt({color:14198067,transparent:!0,opacity:.38,depthTest:!1,depthWrite:!1}),wt);for(let de of C){let Xe=ct(new Hi(.27,.045,8,20),new jt({color:11040800,depthTest:!1,depthWrite:!1}),fe(de,.13),wt);Xe.rotation.x=-Math.PI/2,Xe.renderOrder=18}}function qp(y){let C=y?.reveal;if(!C||C.ring<0)return;let P=y.wire.geometry,U=C.ring*C.stride,j=U+C.stride;for(let ue of["position","normal"]){let Se=P.getAttribute(ue);Se.array.set(C[ue].subarray(U,j),U),Se.addUpdateRange(U,C.stride),Se.needsUpdate=!0}C.ring=-1}function m_(){if(zt<0)return;let y=ot.getAttribute("instanceEnd"),C=Qt[zt+1];y&&C&&(y.setXYZ(zt,C.x,C.y,C.z),y.data.needsUpdate=!0),zt=-1}function Zp(y){if(y){qp(y),y.wire.geometry.setDrawRange(0,1/0),Oe.visible=!1;for(let C of y.plugs||[])for(let P of C)P.mesh.visible=!0,P.mesh.position.copy(P.home)}}function Jp(y,C){let P=y.approach??1;return C<.78?P*Tt((C-.22)/.56):P+(1-P)*Tt((C-.78)/.22)}function Kp(y){if(et.id&&et.id!==y?.id&&Zp(b.get(et.id)),m_(),!y){et.id&&Zp(b.get(et.id)),et={id:null,progress:1},ot.instanceCount=ot.getAttribute("instanceStart")?.count||0,Nt();return}let C=b.get(y.id);if(!C||C.it.kind!=="wire")return;et={id:y.id,progress:Wn.clamp(y.progress,0,1)},ze=null,Jn.visible=!1;let P=et.progress,U=Jp(C,P),j=C.wire.geometry;qp(C);let ue=j.parameters.tubularSegments,Se=j.parameters.radialSegments,de=U*ue,Xe=Math.floor(de),oe=de-Xe,xe=Math.min(ue,Xe+1);if(U>0&&U<1&&oe>1e-8){C.reveal||={position:new Float32Array(j.getAttribute("position").array),normal:new Float32Array(j.getAttribute("normal").array),stride:(Se+1)*3,ring:-1};let ve=C.reveal,Ze=j.getAttribute("position"),Ye=j.getAttribute("normal"),rt=j.parameters.radius;C.curve.getPointAt(U,Rt);for(let yt=0;yt<=Se;yt++){let Ct=(Xe*(Se+1)+yt)*3,Jt=(xe*(Se+1)+yt)*3;en.set(ve.normal[Ct]+(ve.normal[Jt]-ve.normal[Ct])*oe,ve.normal[Ct+1]+(ve.normal[Jt+1]-ve.normal[Ct+1])*oe,ve.normal[Ct+2]+(ve.normal[Jt+2]-ve.normal[Ct+2])*oe).normalize(),Ze.setXYZ(xe*(Se+1)+yt,Rt.x+rt*en.x,Rt.y+rt*en.y,Rt.z+rt*en.z),Ye.setXYZ(xe*(Se+1)+yt,en.x,en.y,en.z)}ve.ring=xe;for(let yt of[Ze,Ye])yt.addUpdateRange(xe*ve.stride,ve.stride),yt.needsUpdate=!0}else C.curve.getPointAt(U,Rt);let Ee=U<=0?0:Math.ceil(de);if(j.setDrawRange(0,Ee*Se*6),Oe.visible=C.group.visible&&U>0&&U<1&&!(C.approach<1&&P>=.78),Oe.visible&&(Oe.position.copy(Rt),Oe.scale.setScalar(j.parameters.radius),Tn.color.copy(C.material.color),Tn.roughness=C.material.roughness),We===y.id&&(ot.instanceCount=Ee,Ee>0&&U<1)){let ve=ot.getAttribute("instanceEnd");zt=Ee-1,ve.setXYZ(zt,Rt.x,Rt.y,Rt.z),ve.data.needsUpdate=!0}(C.plugs||[]).forEach((ve,Ze)=>{let Ye=Tt(Ze?(P-.78)/.22:P/.22);for(let rt of ve)rt.mesh.visible=Ze?P>=.78:!0,rt.mesh.position.copy(rt.home),rt.mesh.position.y+=ye*(1-Ye)}),Nt()}function g_(){let y=b.get(et.id);if(!y)return null;let C=y.wire.geometry,P=C.parameters.radialSegments,U=C.parameters.tubularSegments,j=Jp(y,et.progress),ue=Math.ceil(j*U),Se=C.getAttribute("position"),de=new E,Xe=y.curve.getPointAt(0);if(ue>0){for(let Ye=0;Ye<P;Ye++){let rt=ue*(P+1)+Ye;de.x+=Se.getX(rt),de.y+=Se.getY(rt),de.z+=Se.getZ(rt)}de.divideScalar(P)}else de.copy(Xe);let oe=ot.getAttribute("instanceEnd"),xe=ot.instanceCount-1,Ee=xe>=0?new E(oe.getX(xe),oe.getY(xe),oe.getZ(xe)):Xe,ve=y.approach<1&&et.progress>=.78?y.plugs[1][0].mesh.position:null,Ze=ve?Math.hypot(de.x-ve.x,de.y-ve.y-te,de.z-ve.z):null;return{fraction:j,wireTip:de.toArray(),traceTip:Ee.toArray(),tipError:de.distanceTo(Ee),plugTipError:Ze,visibleSegments:ue,segments:U,traceSegments:ot.instanceCount}}function $p(y){if(K?.id&&K.id!==y?.id){let P=Q.get(K.id);P&&P.group.position.copy(P.home)}let C=Q.get(y?.id);if(K=C?{id:y.id,progress:Wn.clamp(y.progress,0,1)}:null,re!==K?.id){q.traverse(P=>{P.geometry?.dispose(),P.material?.dispose()}),q.clear(),re=K?.id;for(let[P,U]of(C?.holes||[]).entries()){let j=ct(new Hi(P===0?.3:.23,.045,8,20),new jt({color:P===0?13080622:1538403,depthTest:!1,depthWrite:!1}),fe(U,.15),q);j.rotation.x=-Math.PI/2,j.renderOrder=19}}if(C){let P=K.progress,U=Tt((P-.24)/.76);C.group.position.copy(C.home),C.group.position.y+=5.5*(1-U)}Nt()}function __(y){p_(y);for(let[C,P]of He)P.outline.visible=C===y?.chip,P.body.material.transparent=!!(y?.chip&&C!==y.chip),P.body.material.opacity=y?.chip&&C!==y.chip?.toString()?.52:1;Kp(y?.assembly||null),$p(y?.placement||null),Fa(y?.signals||null)}function Pd(){let{width:y,height:C}=s.getBoundingClientRect();if(!(!y||!C)){u.aspect=y/C,u.updateProjectionMatrix(),f.setSize(y,C,!1),pn.forEach(P=>P.material.resolution.set(y,C));for(let P of Zi.children)P.material.resolution.set(y,C);Nt()}}let jp=new ResizeObserver(Pd);jp.observe(s),p.addEventListener("webglcontextlost",y=>{y.preventDefault(),Id(!1),a("Tu navegador perdi\xF3 la vista 3D. Puedes seguir en 2D y volver a intentarlo.")});let Qp=()=>{document.hidden?(Rd(),he&&cancelAnimationFrame(he),he=0):Nt()};document.addEventListener("visibilitychange",Qp);function Id(y){De=y,En.setActive(y),y?(Pd(),Nt()):(Rd(),he&&cancelAnimationFrame(he),he=0)}u.position.set(12,70,75),_.target.set(0,0,0),_.update();function x_(){let y=ot.getAttribute("instanceStart"),C=ot.getAttribute("instanceEnd");return{visible:ft.visible,id:We,builds:Bt,isolate:Fs,widths:pn.map(P=>P.material.linewidth),resolution:pn[0].material.resolution.toArray(),depthTest:pn.some(P=>P.material.depthTest),curveA:y?[y.getX(0),y.getY(0),y.getZ(0)]:null,curveB:C?[C.getX(C.count-1),C.getY(C.count-1),C.getZ(C.count-1)]:null,visibleWires:[...b].filter(([,P])=>P.it.kind==="wire"&&P.group.visible).map(([P])=>P),endpointLabels:[],endpointRings:Zn.map(({ring:P})=>P.visible),replayDuration:ze?.duration||null}}let Ld=new gn;d.add(Ld);let em=nm({groups:Q,guideLayer:Ld,requestRender:Nt,makeRing:(y,C)=>{let P=ct(new Hi(C===0?.3:.23,.045,8,20),new jt({color:C===0?13080622:1538403,depthTest:!1,depthWrite:!1}),fe(y,.15),Ld);return P.rotation.x=-Math.PI/2,P.renderOrder=19,P}});return{setComponentSequence:em.apply,setExternalCable:Wp,update:Cd,focusBox:Gp,replay:f_,setActive:Id,setLEDs:Xp,setIndicators:Yp,setWireClarity:d_,setAssembly:Kp,setPlacement:$p,setSignals:Qc,dismissComponentLabel:En.dismiss,getComponentLabel(){let y=En.diagnostics(),C=0;for(let P of y.targets)Q.get(P.id)?.group.traverse(U=>{U.userData.viewerLabel&&!/^(\d+|I \/ O|STOP|SS0501A)$/.test(U.userData.labelText||"")&&C++});return{...y,flatNameCount:C}},getViewState(){return{camera:u.position.toArray(),target:_.target.toArray(),box:[...Mn],fitDistance:cr,topView:bn}},getPlanViewBox(){let y=u.position.distanceTo(_.target)/Math.max(.01,cr),C=Mn[2]*y,P=Mn[3]*y;return[H+_.target.x*30-C/2,Ce+_.target.z*30-P/2,C,P]},restoreViewState(y){if(!y||!["camera","target"].every(U=>Array.isArray(y[U])&&y[U].length===3&&y[U].every(Number.isFinite)))return!1;let C=new E().fromArray(y.camera).distanceTo(new E().fromArray(y.target));if(C<_.minDistance||C>_.maxDistance)return!1;Te=null;let P=_.enableDamping;return _.enableDamping=!1,_.update(),u.position.fromArray(y.camera),_.target.fromArray(y.target),bn=!!y.topView,Array.isArray(y.box)&&y.box.length===4&&y.box.every(Number.isFinite)&&y.box[2]>0&&y.box[3]>0&&(Mn=[...y.box]),Number.isFinite(y.fitDistance)&&y.fitDistance>0&&(cr=y.fitDistance),_.update(),_.enableDamping=P,p.dataset.moving="false",Nt(),!0},setAppearance(y={}){["auto","economy","sharp"].includes(y.quality)&&y.quality!==ii.quality&&(ii.quality=y.quality,f.setPixelRatio(Math.min(window.devicePixelRatio||1,y.quality==="economy"?1:y.quality==="sharp"?2:1.6)),Pd()),["full","reduced","off"].includes(y.motion)&&(ii.motion=y.motion),y.background&&y.background!==ii.background&&(d.background.set(y.background),ii.background=y.background),ii.motion!=="full"&&Te&&(u.position.copy(Te.toPos),_.target.copy(Te.toTarget),Te=null,_.update(),p.dataset.moving="false"),Nt()},getAppearance(){return{...ii}},setSelectionStyle(y={}){[1,1.4,1.8].includes(y.scale)&&(hr.scale=y.scale),[.5,.8,1].includes(y.intensity)&&(hr.intensity=y.intensity),pn.forEach((C,P)=>{C.material.linewidth=[10,7,3][P]*hr.scale,C.material.opacity=P===2?1:hr.intensity}),Nt()},getSelectionStyle(){return{...hr}},stopReplay(){ze=null,Jn.visible=!1,Nt()},capture(){return f.render(d,u),p.toDataURL("image/png")},preset(y){bn=y==="top",bn||(Te=null,u.position.copy(_.target).add(new E(12,70,75)),_.update()),Gp(Mn,!0)},zoom(){let y=_.target.clone(),C=y.clone().add(u.position.clone().sub(y).multiplyScalar(.75));Te=null,mt?.animate&&ii.motion==="full"?(Te={fromPos:u.position.clone(),toPos:C,fromTarget:y,toTarget:y,started:performance.now()},p.dataset.moving="true",Nt()):(u.position.copy(C),_.update(),Nt())},rotate(y){bn=!1;let C=u.position.clone().sub(_.target);C.applyAxisAngle(new E(0,1,0),y*Math.PI/6);let P=_.target.clone().add(C);mt?.animate&&ii.motion==="full"?(Te={fromPos:u.position.clone(),toPos:P,fromTarget:_.target.clone(),toTarget:_.target.clone(),started:performance.now()},p.dataset.moving="true",Nt()):(u.position.copy(P),_.update(),Nt())},diagnostics(){let y=p.getBoundingClientRect(),C=P=>{let U=P.clone().project(u);return[y.left+(U.x+1)*y.width/2,y.top+(1-U.y)*y.height/2]};return{componentAssembly:em.diagnostics(),motors:[...b.values()].filter(P=>P.it.kind==="motor").map(P=>({id:P.it.partId,model:P.it.externalMotor?.model||"generic",terminals:P.it.externalMotor?.terminals.length||2,routeTypes:B.find(U=>U.id===P.it.partId)?.cables.map(U=>U.curve.type)||[]})),externalControls:N.map(P=>({id:P.id,model:P.model,center:P.center,bounds:P.bounds,connections:P.connections,cables:P.cables.map(U=>({terminal:U.terminal,routeType:U.curve.type,visible:U.group.visible,progress:U.nativeId?et.id===U.nativeId?et.progress:1:U.progress,drawCount:U.wire.geometry.drawRange.count,start:U.curve.getPoint(0).toArray(),end:U.curve.getPoint(1).toArray(),tip:U.nativeId?(et.id===U.nativeId?U.curve.getPointAt(Tt((et.progress-.22)/.56)):U.curve.getPoint(1)).toArray():U.tip.position.toArray()})),actuated:P.actuator.userData.actuated,actuator:P.actuator.position.toArray(),screen:C(ne(P.center,2.5))})),studio:{signals:Ji?{...Ji,builds:dr}:null,placement:K?{...K,height:Q.get(K.id).group.position.y,holes:Q.get(K.id).holes}:null,chip:mt?.studio?.chip||null,stripHoles:mt?.studio?.stripHoles||[],assembly:{...et},reveal:g_(),partialDrawCount:et.id?b.get(et.id)?.wire.geometry.drawRange.count:null},selection:x_(),wireClarity:qn,routedConnections:[...b.values()].filter(P=>P.routed).length,wireStates:Object.fromEntries([...b].filter(([,P])=>P.routed).map(([P,U])=>[P,{opacity:U.wire.material.opacity,height:U.height,curveA:U.curve.getPoint(0).toArray(),curveB:U.curve.getPoint(1).toArray()}])),connectionCount:b.size,pinCount:A.length,arrayPinCount:D.length,resistorArrays:(e.arrays||[]).length,resistors:e.items.filter(P=>P.kind==="res").length,frames:Ua,active:De,moving:!!Te,camera:u.position.toArray(),target:_.target.toArray(),drawCalls:f.info.render.calls,triangles:f.info.render.triangles,targets:{contacts:[C(fe(["A","d",12],.03))],chips:[...He].map(([P,U])=>({id:P,screen:C(U.body.position)})),switches:v.slice(0,3).map(P=>C(P.position)),dipContacts:v.filter(P=>P.userData.dipSlider).map(P=>{let U=P.userData.componentHint,j=e.chips.find(Xe=>Xe.id===U),ue=Object.entries(j.functions).find(([,Xe])=>Xe===P.userData.bit)?.[0],Se=He.get(U).body,de=Se.position.clone().add(new E(Number(ue)-2.5,.64,.95));return{bit:P.userData.bit,id:U,slider:C(P.getWorldPosition(new E)),body:C(Se.parent.localToWorld(de))}}),pins:A.map(P=>({u:P.userData.u,p:P.userData.p,screen:C(P.geometry.parameters.path.getPoint(.15))})),wires:Object.fromEntries([...b].map(([P,U])=>[P,C(U.curve.getPoint(.5))]))},endpoints:Object.fromEntries([...b].map(([P,U])=>[P,{a:U.it.a,b:U.it.b,worldA:U.a.toArray(),worldB:U.b.toArray()}])),lit:[...L].filter(([,P])=>P.userData.lit).map(([P])=>P)}},dispose(){Id(!1),En.dispose(),jp.disconnect(),document.removeEventListener("visibilitychange",Qp),_.dispose();let y=new Set,C=new Set,P=new Set;d.traverse(U=>{U.geometry&&y.add(U.geometry);for(let j of[].concat(U.material||[]))C.add(j),j.map&&P.add(j.map),j.bumpMap&&P.add(j.bumpMap)}),P.forEach(U=>U.dispose()),C.forEach(U=>U.dispose()),y.forEach(U=>U.dispose()),f.dispose(),p.remove()}}}export{c1 as createViewer};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
