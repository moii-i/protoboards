var L_=Object.defineProperty;var D_=(s,e)=>{for(var t in e)L_(s,t,{get:e[t],enumerable:!0})};function hm({groups:s,requestRender:e,makeRing:t,guideLayer:n}){let i=null,r="";function o(a){i=a;let l=a?.id||"";if(l!==r){for(let h of[...n.children])h.geometry?.dispose(),h.material?.dispose(),n.remove(h);r=l;let c=s.get(l);if(c&&!c.external)for(let[h,d]of c.holes.entries()){let u=t(d,h);n.add(u)}}for(let[c,h]of s){h.home||=h.group.position.clone(),h.group.position.copy(h.home);let d=a?.order?.indexOf(c)??-1;if(h.group.visible=!a||d<0||d<=a.index,a&&c===a.id){let u=Math.max(0,Math.min(1,(a.progress-.18)/.82)),f=u*u*(3-2*u);h.external?(h.group.position.x+=4*(1-f),h.group.position.y+=.7*(1-f)):h.group.position.y+=5.5*(1-f)}}n.visible=!!a,e()}return{apply:o,diagnostics:()=>({pose:i?{id:i.id,index:i.index,progress:i.progress}:null,components:[...s].map(([a,l])=>({id:a,visible:l.group.visible,position:l.group.position.toArray(),home:l.home?.toArray(),holes:l.holes,external:!!l.external}))})}}function um({THREE:s,scene:e,container:t,camera:n,canvas:i,requestRender:r}){let o=new Map,a=new Map,l=null,c=null,h=!1,d=document.createElement("div");d.className="component-hologram",d.id="doorComponentHologram",d.hidden=!0,d.setAttribute("role","status"),d.setAttribute("aria-live","polite"),d.setAttribute("aria-atomic","true");let u=document.createElement("span"),f=document.createElement("strong"),p=document.createElement("span");u.className="hologram-kind",p.className="hologram-detail",d.append(u,f,p),t.append(d);let _=new s.Group;_.visible=!1,e.add(_);let g=new s.MeshBasicMaterial({color:6806741,transparent:!0,opacity:.65,depthWrite:!1,toneMapped:!1}),m=new s.Mesh(new s.TorusGeometry(.76,.025,8,48),g);m.rotation.x=-Math.PI/2,_.add(m);let y=new s.Mesh(new s.CylinderGeometry(.012,.012,1.2,6),g.clone());y.position.y=.6,y.material.opacity=.35,_.add(y);let b=new s.Vector3,v=new s.Vector3,A=new s.Vector3;function T(U){for(;U;){if(!U.visible)return!1;U=U.parent}return!0}function L(U){["led","res","switch","chip"].includes(U.type)&&(o.set(U.id,U),U.connectionId&&a.set(U.connectionId,U.id))}function S(U){return o.get(a.get(U)||U)||null}function R(){l=null,d.hidden=!0,_.visible=!1,i.setAttribute("aria-describedby","threeHelp"),r()}function D(U,{toggle:B=!1}={}){let z=S(U);if(!z||B&&l?.id===z.id){R();return}l?.id!==z.id&&(l=z,u.textContent={led:"INDICADOR",res:"RESISTENCIA",switch:"CONTROL",chip:"INTEGRADO"}[z.type],f.textContent=z.title,p.textContent=typeof z.detail=="function"?z.detail():z.detail||"",p.hidden=!p.textContent,d.dataset.component=z.id,d.dataset.kind=z.type),i.setAttribute("aria-describedby","threeHelp "+d.id),k(),r()}function O(U,B){U!==c&&(c=U,D(B))}function k(){if(!h||!l||!T(l.group)){d.hidden=!0,_.visible=!1;return}let U=typeof l.detail=="function"?l.detail():l.detail||"";p.textContent!==U&&(p.textContent=U),p.hidden=!U;let B=t.getBoundingClientRect();if(!B.width||!B.height)return;if(l.group.updateWorldMatrix(!0,!1),b.copy(l.anchor).applyMatrix4(l.group.matrixWorld),n.updateMatrixWorld(),A.copy(b).project(n),A.z<-1||A.z>1||Math.abs(A.x)>1.03||Math.abs(A.y)>1.03){d.hidden=!0,_.visible=!1;return}_.position.copy(b),_.visible=!0,v.copy(b),v.y+=1.7,v.project(n),d.hidden=!1;let z=Math.min(228,B.width-24),G=d.getBoundingClientRect?.().height||76,se=(A.x+1)*B.width/2,Y=(1-A.y)*B.height/2,ee=Math.max(z/2+10,Math.min(B.width-z/2-10,se)),ae=Math.max(G+12,Math.min(B.height-10,(1-v.y)*B.height/2,Y-22));d.style.width=z+"px",d.style.left=ee+"px",d.style.top=ae+"px"}let q=U=>{U.key==="Escape"&&l&&(U.preventDefault(),U.stopPropagation(),R())};return i.addEventListener("keydown",q),{register:L,resolve:S,select:D,sync:O,dismiss:R,layout:k,setActive(U){h=U,U?k():R()},diagnostics(){let U=l,B=d.getBoundingClientRect?.(),z=t.getBoundingClientRect();return n.updateMatrixWorld(),{id:U?.id||null,type:U?.type||null,title:f.textContent,detail:p.textContent,visible:!d.hidden,halo:_.visible,anchor:b.toArray(),screen:B?[B.left,B.top,B.right,B.bottom]:null,targets:[...o.values()].map(G=>{G.group.updateWorldMatrix(!0,!1);let se=(G.hitPoint||G.anchor).clone().applyMatrix4(G.group.matrixWorld),Y=se.clone().project(n);return{id:G.id,type:G.type,title:G.title,world:se.toArray(),screen:[z.left+(Y.x+1)*z.width/2,z.top+(1-Y.y)*z.height/2]}})}},dispose(){i.removeEventListener("keydown",q),d.remove(),_.removeFromParent(),m.geometry.dispose(),y.geometry.dispose(),g.dispose(),y.material.dispose()}}}function Hd(s,e,t,n,i,r){let o=[n,...e.map(l=>t(l,r)),i],a=new s.CurvePath;for(let l=1;l<o.length;l++)o[l-1].distanceToSquared(o[l])>1e-12&&a.add(new s.LineCurve3(o[l-1],o[l]));return a}function dm(s){let{THREE:e,it:t,group:n,mesh:i,box:r,roundedBox:o,toWorld:a,hpos:l,topLabel:c,contactShadow:h,pickables:d,switches:u,metal:f,dark:p,componentLabels:_=!0}=s,g=t.externalControl,m=a(g.center,0),y=g.model==="scmm-122",b=new e.MeshStandardMaterial({color:6120546,metalness:.76,roughness:.42}),v=new e.MeshStandardMaterial({color:y?2304555:3907227,roughness:.6}),A=new e.MeshStandardMaterial({color:11368236,roughness:.77}),T=new e.MeshStandardMaterial({color:13028298,metalness:.87,roughness:.27}),L=new e.MeshStandardMaterial({color:2107947,roughness:.83}),S=B=>(B.userData={...B.userData,bit:t.value,componentHint:t.partId||t.id},d.push(B),B);function R(B,z,G){let se=new e.Shape,Y=-B/2,ee=-z/2;return se.moveTo(Y+G,ee),se.lineTo(Y+B-G,ee),se.quadraticCurveTo(Y+B,ee,Y+B,ee+G),se.lineTo(Y+B,ee+z-G),se.quadraticCurveTo(Y+B,ee+z,Y+B-G,ee+z),se.lineTo(Y+G,ee+z),se.quadraticCurveTo(Y,ee+z,Y,ee+z-G),se.lineTo(Y,ee+G),se.quadraticCurveTo(Y,ee,Y+G,ee),se}let D;if(y){o(4.55,.2,2.2,m.clone().setY(.62),A,n,.05),S(o(4.45,1.35,2.1,m.clone().setY(1.4),v,n,.12));let B=R(8,2.55,.2);for(let ee of[-3.13,3.13]){let ae=new e.Path;ae.absellipse(ee,0,.45,.31,0,Math.PI*2,!0),B.holes.push(ae)}let z=new e.Path;z.moveTo(-1.4,-.53),z.lineTo(-1.4,.53),z.lineTo(1.4,.53),z.lineTo(1.4,-.53),z.closePath(),B.holes.push(z);let G=S(i(new e.ExtrudeGeometry(B,{depth:.12,bevelEnabled:!0,bevelSize:.025,bevelThickness:.025,bevelSegments:2,steps:1}),b,m.clone().setY(2.13),n));G.rotation.x=-Math.PI/2;for(let ee of[-1.23,1.23])r(4.5,1.1,.1,m.clone().setY(1.55).add(new e.Vector3(0,0,ee)),b,n);for(let ee of[-1.75,1.75])for(let ae of[-1.18,1.18])r(.42,.34,.15,m.clone().setY(.9).add(new e.Vector3(ee,0,ae)),b,n);D=new e.Group,D.position.copy(m).setY(2.26),n.add(D),S(o(.98,1.05,.85,new e.Vector3(0,.42,0),p,D,.06));for(let ee=0;ee<5;ee++)r(.075,.98,.92,new e.Vector3(-.39+ee*.195,.43,0),v,D);D.userData={externalControl:"scmm-122",switchId:t.value,homeX:m.x};let se=c("0",m.clone().add(new e.Vector3(-2.3,2.285,0)),.38,.5,{background:"#5d6462",color:"#e0e7df",size:90}),Y=c("1",m.clone().add(new e.Vector3(2.3,2.285,0)),.38,.5,{background:"#5d6462",color:"#e0e7df",size:90});n.add(se,Y)}else{let B=R(6.45,2.9,.22);for(let ae of[-1.82,1.82]){let ke=new e.Path;ke.absarc(ae,0,.43,0,Math.PI*2,!0),B.holes.push(ke)}S(i(new e.ExtrudeGeometry(B,{depth:2.3,bevelEnabled:!0,bevelSize:.035,bevelThickness:.035,bevelSegments:2,steps:1}),v,m.clone().add(new e.Vector3(0,1.65,-1.15)),n));for(let ae of[-1.82,1.82])for(let ke of[-1.2,1.2])i(new e.TorusGeometry(.45,.055,8,24),v,m.clone().add(new e.Vector3(ae,1.65,ke)),n);o(5.9,.09,2.18,m.clone().add(new e.Vector3(0,3.15,0)),v,n,.04);let z=S(o(.95,.62,.9,m.clone().add(new e.Vector3(1.2,3.22,0)),p,n,.09)),G=m.clone().add(new e.Vector3(-2.55,3.25,0)),se=i(new e.CylinderGeometry(.17,.17,1.1,20),f,G,n);se.rotation.x=Math.PI/2,D=new e.Group,D.position.copy(G),n.add(D),S(r(7.45,.11,.85,new e.Vector3(3.42,.08,0),f,D));let Y=r(.5,.1,.85,new e.Vector3(7.05,.15,0),f,D);Y.rotation.z=.25,S(Y),D.userData={externalControl:"ss0501a",switchId:t.value,plunger:z,plungerY:z.position.y};let ee=c("SS0501A",m.clone().add(new e.Vector3(0,3.21,.7)),3.6,.6,{background:"#3b9e9b",color:"#237975",size:56});n.add(ee)}u.push(D),h(m,y?10:10.8,6.3,n);let O=[t.a,t.b,t.third],k=[],q=g.terminals.map((B,z)=>{let G=a(B,1.02),se=l(O[z],.08),Y=m.clone().add(new e.Vector3((z-1)*1.5,.72,1.08));i(new e.TubeGeometry(new e.CatmullRomCurve3([Y,Y.clone().add(new e.Vector3(0,-.18,.5)),G]),12,.085,8,!1),f,new e.Vector3,n),r(.38,.68,.13,G.clone().add(new e.Vector3(0,.15,-.15)),f,n),i(new e.TorusGeometry(.18,.065,8,20),f,G,n),i(new e.SphereGeometry(.17,12,8),T,G.clone().add(new e.Vector3(0,-.06,.03)),n);let ee=G.clone().add(new e.Vector3(0,-.18,.65)),ae=i(new e.CylinderGeometry(.19,.17,.65,16),L,G.clone().add(new e.Vector3(0,-.09,.32)),n);ae.rotation.x=Math.PI/2;let ke=new e.MeshStandardMaterial({color:g.colors[z],roughness:.74}),Be=a([g.center[0]-150-z*18,g.center[1]-155-z*17],1.7+z*.28),Dt=a([g.center[0]+(z-1)*52,g.center[1]+135+z*10],.9+z*.18),Qe=g.cableRoutes?.[z]?Hd(e,g.cableRoutes[z],a,G,se,g.cableHeights[z]):new e.CatmullRomCurve3([G,ee,Dt,Be,a([U(O[z]),815+z*24],1.8+z*.28),se.clone().setY(1.1+z*.28),se],!1,"centripetal"),yt=new e.Group;n.add(yt);let Q=i(new e.TubeGeometry(Qe,96,.095,8,!1),ke,new e.Vector3,yt);Q.userData={id:t.id},d.push(Q);let ne=r(.3,.46,.3,se.clone().setY(.23),L,yt),Te=i(new e.SphereGeometry(.17,12,8),new e.MeshBasicMaterial({color:15054145}),G.clone(),yt);if(Te.visible=!1,k.push({group:yt,wire:Q,curve:Qe,plug:ne,tip:Te,point:new e.Vector3,normal:new e.Vector3,terminal:z,progress:1}),_){let Ze=c((y?["+5","COM","GND"]:["NC","COM","NA"])[z],G.clone().add(new e.Vector3(0,-.87,1.05)),1.45,1.8,{background:"#edf1ed",color:z===0?"#b64143":"#364e49",size:54});n.add(Ze)}return{hole:O[z],terminal:B,worldTerminal:G.toArray(),function:g.functions[z]}});function U(B){return s.point(B)[0]}if(_){let B=c(t.value+" \xB7 "+g.model.toUpperCase(),m.clone().add(new e.Vector3(0,.065,-3.15)),10,3.1,{background:"#edf1ed",color:t.value==="STOP"?"#a64445":"#345a4a",size:45});n.add(B);let z=c(y?"DESLIZABLE \xB7 MANTENIDO":"PALANCA \xB7 FIN DE CARRERA",m.clone().add(new e.Vector3(0,.065,7.2)),10,2.8,{background:"#edf1ed",color:"#587363",size:37});n.add(z)}return kd(D,!1),{id:t.partId,model:g.model,center:g.center,bounds:g.bounds,connections:q,actuator:D,cables:k,wiringStage:t.wiringStage??t.stage}}function kd(s,e){let t=s.userData;t.externalControl==="scmm-122"?s.position.x=t.homeX+(e?.72:-.72):t.externalControl==="ss0501a"&&(s.rotation.z=e?.012:.16,t.plunger.position.y=t.plungerY-(e?.19:0)),t.actuated=!!e}function fm(s,e){e=Math.max(0,Math.min(1,e));let t=s.wire.geometry,n=t.parameters.tubularSegments,i=t.parameters.radialSegments,r=t.getAttribute("position"),o=t.getAttribute("normal");if(s.reveal?.ring>=0){let a=s.reveal.ring;for(let l=0;l<=i;l++){let c=(a*(i+1)+l)*3;r.setXYZ(a*(i+1)+l,...s.reveal.position.subarray(c,c+3)),o.setXYZ(a*(i+1)+l,...s.reveal.normal.subarray(c,c+3))}s.reveal.ring=-1,r.needsUpdate=o.needsUpdate=!0}if(e>0&&e<1){s.reveal||={position:new Float32Array(r.array),normal:new Float32Array(o.array),ring:-1};let a=e*n,l=Math.floor(a),c=a-l,h=Math.min(n,l+1);s.curve.getPointAt(e,s.point);for(let d=0;d<=i;d++){let u=(l*(i+1)+d)*3,f=(h*(i+1)+d)*3;s.normal.set(s.reveal.normal[u]+(s.reveal.normal[f]-s.reveal.normal[u])*c,s.reveal.normal[u+1]+(s.reveal.normal[f+1]-s.reveal.normal[u+1])*c,s.reveal.normal[u+2]+(s.reveal.normal[f+2]-s.reveal.normal[u+2])*c).normalize(),r.setXYZ(h*(i+1)+d,s.point.x+t.parameters.radius*s.normal.x,s.point.y+t.parameters.radius*s.normal.y,s.point.z+t.parameters.radius*s.normal.z),o.setXYZ(h*(i+1)+d,s.normal.x,s.normal.y,s.normal.z)}s.reveal.ring=h,r.needsUpdate=o.needsUpdate=!0}t.setDrawRange(0,Math.ceil(e*n)*i*6),s.tip.visible=e>0&&e<1,s.tip.visible&&s.tip.position.copy(s.point),s.plug.visible=e>=1,s.progress=e}var La={};D_(La,{ACESFilmicToneMapping:()=>ga,AddEquation:()=>lr,AddOperation:()=>ap,AdditiveAnimationBlendMode:()=>_d,AdditiveBlending:()=>pa,AgXToneMapping:()=>ld,AlphaFormat:()=>md,AlwaysCompare:()=>vp,AlwaysDepth:()=>ll,AlwaysStencilFunc:()=>pp,AmbientLight:()=>Jl,AnimationAction:()=>rc,AnimationClip:()=>sr,AnimationLoader:()=>_u,AnimationMixer:()=>Pu,AnimationObjectGroup:()=>Cu,AnimationUtils:()=>gu,ArcCurve:()=>Cl,ArrayCamera:()=>tc,ArrowHelper:()=>Ju,AttachedBindMode:()=>Kh,Audio:()=>ic,AudioAnalyser:()=>Ru,AudioContext:()=>ca,AudioListener:()=>Tu,AudioLoader:()=>Eu,AxesHelper:()=>Ku,BackSide:()=>Cn,BasicDepthPacking:()=>dp,BasicShadowMap:()=>Tg,BatchedMesh:()=>Ml,BezierInterpolant:()=>Yl,Bone:()=>Wo,BooleanKeyframeTrack:()=>ns,Box2:()=>oc,Box3:()=>tn,Box3Helper:()=>qu,BoxGeometry:()=>In,BoxHelper:()=>Yu,BufferAttribute:()=>qt,BufferGeometry:()=>_t,BufferGeometryLoader:()=>Ql,ByteType:()=>ud,Cache:()=>Oi,Camera:()=>Xr,CameraHelper:()=>Xu,CanvasTexture:()=>js,CapsuleGeometry:()=>Al,CatmullRomCurve3:()=>Hi,CineonToneMapping:()=>od,CircleGeometry:()=>Ts,ClampToEdgeWrapping:()=>Kn,Clock:()=>Uu,Color:()=>Oe,ColorKeyframeTrack:()=>sa,ColorManagement:()=>Ct,Compatibility:()=>p0,CompressedArrayTexture:()=>du,CompressedCubeTexture:()=>fu,CompressedTexture:()=>Nr,CompressedTextureLoader:()=>xu,ConeGeometry:()=>qo,ConstantAlphaFactor:()=>sp,ConstantColorFactor:()=>np,Controls:()=>da,CubeCamera:()=>ec,CubeDepthTexture:()=>Tl,CubeReflectionMapping:()=>Xi,CubeRefractionMapping:()=>Ns,CubeTexture:()=>$s,CubeTextureLoader:()=>yu,CubeUVReflectionMapping:()=>$r,CubicBezierCurve:()=>Zo,CubicBezierCurve3:()=>Qs,CubicInterpolant:()=>Wl,CullFaceBack:()=>Qu,CullFaceFront:()=>Vf,CullFaceFrontBack:()=>wg,CullFaceNone:()=>zf,Curve:()=>ai,CurvePath:()=>tr,CustomBlending:()=>kf,CustomToneMapping:()=>ad,CylinderGeometry:()=>Zt,Cylindrical:()=>Fu,Data3DTexture:()=>Cr,DataArrayTexture:()=>Rr,DataTexture:()=>$n,DataTextureLoader:()=>vu,DataUtils:()=>tu,DecrementStencilOp:()=>Xg,DecrementWrapStencilOp:()=>qg,DefaultLoadingManager:()=>wp,DepthFormat:()=>Bi,DepthStencilFormat:()=>Us,DepthTexture:()=>ws,DetachedBindMode:()=>lp,DirectionalLight:()=>ar,DirectionalLightHelper:()=>Wu,DiscreteInterpolant:()=>Xl,DodecahedronGeometry:()=>Rl,DoubleSide:()=>mi,DstAlphaFactor:()=>$f,DstColorFactor:()=>Qf,DynamicCopyUsage:()=>l0,DynamicDrawUsage:()=>n0,DynamicReadUsage:()=>r0,EdgesGeometry:()=>Ur,EllipseCurve:()=>Fr,EqualCompare:()=>_p,EqualDepth:()=>hl,EqualStencilFunc:()=>$g,EquirectangularReflectionMapping:()=>_a,EquirectangularRefractionMapping:()=>xa,Euler:()=>bi,EventDispatcher:()=>oi,ExternalTexture:()=>Yo,ExtrudeGeometry:()=>Rs,FileLoader:()=>Ti,Float16BufferAttribute:()=>au,Float32BufferAttribute:()=>ze,FloatType:()=>kn,Fog:()=>_l,FogExp2:()=>gl,FramebufferTexture:()=>uu,FrontSide:()=>Ds,Frustum:()=>es,FrustumArray:()=>Sl,GLBufferAttribute:()=>Nu,GLSL1:()=>h0,GLSL3:()=>xd,GreaterCompare:()=>xp,GreaterDepth:()=>dl,GreaterEqualCompare:()=>Yc,GreaterEqualDepth:()=>ul,GreaterEqualStencilFunc:()=>t0,GreaterStencilFunc:()=>Qg,GridHelper:()=>ku,Group:()=>mn,HTMLTexture:()=>pu,HalfFloatType:()=>Ri,HemisphereLight:()=>Gr,HemisphereLightHelper:()=>Hu,IcosahedronGeometry:()=>Dl,ImageBitmapLoader:()=>bu,ImageLoader:()=>rr,ImageUtils:()=>ml,IncrementStencilOp:()=>Wg,IncrementWrapStencilOp:()=>Yg,InstancedBufferAttribute:()=>bs,InstancedBufferGeometry:()=>qr,InstancedInterleavedBuffer:()=>Ps,InstancedMesh:()=>Es,Int16BufferAttribute:()=>ru,Int32BufferAttribute:()=>ou,Int8BufferAttribute:()=>nu,IntType:()=>lc,InterleavedBuffer:()=>Lr,InterleavedBufferAttribute:()=>Wn,Interpolant:()=>Cs,InterpolateBezier:()=>$h,InterpolateDiscrete:()=>Uo,InterpolateLinear:()=>pl,InterpolateSmooth:()=>tl,InterpolationSamplingMode:()=>f0,InterpolationSamplingType:()=>d0,InvertStencilOp:()=>Zg,KeepStencilOp:()=>nl,KeyframeTrack:()=>Qn,LOD:()=>xl,LatheGeometry:()=>Br,Layers:()=>Pr,LessCompare:()=>gp,LessDepth:()=>cl,LessEqualCompare:()=>Xc,LessEqualDepth:()=>Tr,LessEqualStencilFunc:()=>jg,LessStencilFunc:()=>Kg,Light:()=>Gi,LightProbe:()=>$l,LightShadow:()=>Wr,Line:()=>Vi,Line3:()=>ua,LineBasicMaterial:()=>Sn,LineCurve:()=>Jo,LineCurve3:()=>ts,LineDashedMaterial:()=>Gl,LineLoop:()=>bl,LineSegments:()=>jn,LinearFilter:()=>jt,LinearInterpolant:()=>ia,LinearMipMapLinearFilter:()=>Ig,LinearMipMapNearestFilter:()=>Pg,LinearMipmapLinearFilter:()=>Yi,LinearMipmapNearestFilter:()=>ya,LinearSRGBColorSpace:()=>Oo,LinearToneMapping:()=>sd,LinearTransfer:()=>Bo,Loader:()=>Dn,LoaderUtils:()=>la,LoadingManager:()=>oa,LoopOnce:()=>cp,LoopPingPong:()=>up,LoopRepeat:()=>hp,MOUSE:()=>Is,Material:()=>vn,MaterialBlending:()=>Ag,MaterialLoader:()=>jl,MathUtils:()=>Nn,Matrix2:()=>Ou,Matrix3:()=>mt,Matrix4:()=>ut,MaxEquation:()=>Yf,Mesh:()=>zt,MeshBasicMaterial:()=>Qt,MeshDepthMaterial:()=>ta,MeshDistanceMaterial:()=>na,MeshLambertMaterial:()=>Vr,MeshMatcapMaterial:()=>kl,MeshNormalMaterial:()=>Hl,MeshPhongMaterial:()=>zl,MeshPhysicalMaterial:()=>ir,MeshStandardMaterial:()=>at,MeshToonMaterial:()=>Vl,MinEquation:()=>Xf,MirroredRepeatWrapping:()=>No,MixOperation:()=>op,MultiplyBlending:()=>td,MultiplyOperation:()=>ma,NearestFilter:()=>un,NearestMipMapLinearFilter:()=>Cg,NearestMipMapNearestFilter:()=>Rg,NearestMipmapLinearFilter:()=>jr,NearestMipmapNearestFilter:()=>hd,NeutralToneMapping:()=>cd,NeverCompare:()=>mp,NeverDepth:()=>al,NeverStencilFunc:()=>Jg,NoBlending:()=>Wi,NoColorSpace:()=>rs,NoNormalPacking:()=>zg,NoToneMapping:()=>Ai,NormalAnimationBlendMode:()=>Wc,NormalBlending:()=>Kr,NormalGAPacking:()=>Hg,NormalRGPacking:()=>Vg,NotEqualCompare:()=>yp,NotEqualDepth:()=>fl,NotEqualStencilFunc:()=>e0,NumberKeyframeTrack:()=>Hr,Object3D:()=>Ft,ObjectLoader:()=>Mu,ObjectSpaceNormalMap:()=>fp,OctahedronGeometry:()=>Qo,OneFactor:()=>Zf,OneMinusConstantAlphaFactor:()=>rp,OneMinusConstantColorFactor:()=>ip,OneMinusDstAlphaFactor:()=>jf,OneMinusDstColorFactor:()=>ep,OneMinusSrcAlphaFactor:()=>id,OneMinusSrcColorFactor:()=>Kf,OrthographicCamera:()=>or,PCFShadowMap:()=>fa,PCFSoftShadowMap:()=>Hf,PMREMGenerator:()=>io,Path:()=>nr,PerspectiveCamera:()=>hn,Plane:()=>si,PlaneGeometry:()=>fi,PlaneHelper:()=>Zu,PointLight:()=>Yr,PointLightHelper:()=>Vu,Points:()=>El,PointsMaterial:()=>Xo,PolarGridHelper:()=>Gu,PolyhedronGeometry:()=>As,PositionalAudio:()=>Au,PropertyBinding:()=>Yt,PropertyMixer:()=>sc,QuadraticBezierCurve:()=>Ko,QuadraticBezierCurve3:()=>er,Quaternion:()=>gn,QuaternionKeyframeTrack:()=>kr,QuaternionLinearInterpolant:()=>ql,R11_EAC_Format:()=>Sc,RED_GREEN_RGTC2_Format:()=>Ta,RED_RGTC1_Format:()=>Hc,REVISION:()=>Bf,RG11_EAC_Format:()=>wa,RGBADepthPacking:()=>Fg,RGBAFormat:()=>Gn,RGBAIntegerFormat:()=>fc,RGBA_ASTC_10x10_Format:()=>Uc,RGBA_ASTC_10x5_Format:()=>Lc,RGBA_ASTC_10x6_Format:()=>Dc,RGBA_ASTC_10x8_Format:()=>Nc,RGBA_ASTC_12x10_Format:()=>Fc,RGBA_ASTC_12x12_Format:()=>Oc,RGBA_ASTC_4x4_Format:()=>Ec,RGBA_ASTC_5x4_Format:()=>wc,RGBA_ASTC_5x5_Format:()=>Tc,RGBA_ASTC_6x5_Format:()=>Ac,RGBA_ASTC_6x6_Format:()=>Rc,RGBA_ASTC_8x5_Format:()=>Cc,RGBA_ASTC_8x6_Format:()=>Pc,RGBA_ASTC_8x8_Format:()=>Ic,RGBA_BPTC_Format:()=>Bc,RGBA_ETC2_EAC_Format:()=>vc,RGBA_PVRTC_2BPPV1_Format:()=>_c,RGBA_PVRTC_4BPPV1_Format:()=>gc,RGBA_S3TC_DXT1_Format:()=>Ma,RGBA_S3TC_DXT3_Format:()=>ba,RGBA_S3TC_DXT5_Format:()=>Ea,RGBDepthPacking:()=>Og,RGBFormat:()=>gd,RGBIntegerFormat:()=>Lg,RGB_BPTC_SIGNED_Format:()=>zc,RGB_BPTC_UNSIGNED_Format:()=>Vc,RGB_ETC1_Format:()=>xc,RGB_ETC2_Format:()=>yc,RGB_PVRTC_2BPPV1_Format:()=>mc,RGB_PVRTC_4BPPV1_Format:()=>pc,RGB_S3TC_DXT1_Format:()=>Sa,RGDepthPacking:()=>Bg,RGFormat:()=>Fs,RGIntegerFormat:()=>dc,RawShaderMaterial:()=>ea,Ray:()=>zi,Raycaster:()=>ha,RectAreaLight:()=>Kl,RedFormat:()=>uc,RedIntegerFormat:()=>va,ReinhardToneMapping:()=>rd,RenderObjectRefreshType:()=>m0,RenderTarget:()=>Ho,RenderTarget3D:()=>Iu,RepeatWrapping:()=>qs,ReplaceStencilOp:()=>Gg,ReverseSubtractEquation:()=>Wf,RingGeometry:()=>Nl,SIGNED_R11_EAC_Format:()=>Mc,SIGNED_RED_GREEN_RGTC2_Format:()=>Gc,SIGNED_RED_RGTC1_Format:()=>kc,SIGNED_RG11_EAC_Format:()=>bc,SRGBColorSpace:()=>Rn,SRGBTransfer:()=>Wt,Scene:()=>Ms,ShaderChunk:()=>wt,ShaderLib:()=>Yn,ShaderMaterial:()=>Ln,ShadowMaterial:()=>Bl,Shape:()=>Ei,ShapeGeometry:()=>Ul,ShapePath:()=>$u,ShapeUtils:()=>Mi,ShortType:()=>dd,Skeleton:()=>vl,SkeletonHelper:()=>zu,SkinnedMesh:()=>yl,Source:()=>jh,Sphere:()=>nn,SphereGeometry:()=>pi,Spherical:()=>Zr,SphericalHarmonics3:()=>aa,SplineCurve:()=>$o,SpotLight:()=>Zl,SpotLightHelper:()=>Bu,Sprite:()=>Dr,SpriteMaterial:()=>Ks,SrcAlphaFactor:()=>nd,SrcAlphaSaturateFactor:()=>tp,SrcColorFactor:()=>Jf,StaticCopyUsage:()=>a0,StaticDrawUsage:()=>qc,StaticReadUsage:()=>s0,StereoCamera:()=>wu,StreamCopyUsage:()=>c0,StreamDrawUsage:()=>i0,StreamReadUsage:()=>o0,StringKeyframeTrack:()=>is,SubtractEquation:()=>Gf,SubtractiveBlending:()=>ed,TOUCH:()=>Ls,TangentSpaceNormalMap:()=>ss,TetrahedronGeometry:()=>Fl,Texture:()=>dn,TextureLoader:()=>Su,TextureSource:()=>Si,TextureUtils:()=>ju,Timer:()=>nc,TimestampQuery:()=>u0,TorusGeometry:()=>ki,TorusKnotGeometry:()=>Ol,Triangle:()=>Fi,TriangleFanDrawMode:()=>Ug,TriangleStripDrawMode:()=>Ng,TrianglesDrawMode:()=>Dg,TubeGeometry:()=>wi,UVMapping:()=>ac,Uint16BufferAttribute:()=>ko,Uint32BufferAttribute:()=>Go,Uint8BufferAttribute:()=>iu,Uint8ClampedBufferAttribute:()=>su,Uniform:()=>Lu,UniformsGroup:()=>Du,UniformsLib:()=>Re,UniformsUtils:()=>Aa,UnsignedByteType:()=>ei,UnsignedInt101111Type:()=>pd,UnsignedInt248Type:()=>eo,UnsignedInt5999Type:()=>fd,UnsignedIntType:()=>gi,UnsignedShort4444Type:()=>cc,UnsignedShort5551Type:()=>hc,UnsignedShortType:()=>Qr,VSMShadowMap:()=>Jr,Vector2:()=>le,Vector3:()=>E,Vector4:()=>Ut,VectorKeyframeTrack:()=>ra,VideoFrameTexture:()=>hu,VideoTexture:()=>wl,WebGL3DRenderTarget:()=>eu,WebGLArrayRenderTarget:()=>Qh,WebGLCoordinateSystem:()=>ri,WebGLCubeRenderTarget:()=>$c,WebGLRenderTarget:()=>Pn,WebGLRenderer:()=>jc,WebGLUtils:()=>r_,WebGPUCoordinateSystem:()=>Zs,WebXRController:()=>Ir,WireframeGeometry:()=>zr,WrapAroundEnding:()=>Fo,ZeroCurvatureEnding:()=>Xs,ZeroFactor:()=>qf,ZeroSlopeEnding:()=>Ys,ZeroStencilOp:()=>kg,createCanvasElement:()=>Sp,error:()=>je,getConsoleFunction:()=>x0,log:()=>Vo,setConsoleFunction:()=>_0,warn:()=>Pe,warnOnce:()=>Qi});var Bf="186",Is={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Ls={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},zf=0,Qu=1,Vf=2,wg=3,Tg=0,fa=1,Hf=2,Jr=3,Ds=0,Cn=1,mi=2,Wi=0,Kr=1,pa=2,ed=3,td=4,kf=5,Ag=6,lr=100,Gf=101,Wf=102,Xf=103,Yf=104,qf=200,Zf=201,Jf=202,Kf=203,nd=204,id=205,$f=206,jf=207,Qf=208,ep=209,tp=210,np=211,ip=212,sp=213,rp=214,al=0,ll=1,cl=2,Tr=3,hl=4,ul=5,dl=6,fl=7,ma=0,op=1,ap=2,Ai=0,sd=1,rd=2,od=3,ga=4,ad=5,ld=6,cd=7,Kh="attached",lp="detached",ac=300,Xi=301,Ns=302,_a=303,xa=304,$r=306,qs=1e3,Kn=1001,No=1002,un=1003,hd=1004,Rg=1004,jr=1005,Cg=1005,jt=1006,ya=1007,Pg=1007,Yi=1008,Ig=1008,ei=1009,ud=1010,dd=1011,Qr=1012,lc=1013,gi=1014,kn=1015,Ri=1016,cc=1017,hc=1018,eo=1020,fd=35902,pd=35899,md=1021,gd=1022,Gn=1023,Bi=1026,Us=1027,uc=1028,va=1029,Fs=1030,dc=1031,Lg=1032,fc=1033,Sa=33776,Ma=33777,ba=33778,Ea=33779,pc=35840,mc=35841,gc=35842,_c=35843,xc=36196,yc=37492,vc=37496,Sc=37488,Mc=37489,wa=37490,bc=37491,Ec=37808,wc=37809,Tc=37810,Ac=37811,Rc=37812,Cc=37813,Pc=37814,Ic=37815,Lc=37816,Dc=37817,Nc=37818,Uc=37819,Fc=37820,Oc=37821,Bc=36492,zc=36494,Vc=36495,Hc=36283,kc=36284,Ta=36285,Gc=36286,cp=2200,hp=2201,up=2202,Uo=2300,pl=2301,tl=2302,$h=2303,Xs=2400,Ys=2401,Fo=2402,Wc=2500,_d=2501,Dg=0,Ng=1,Ug=2,dp=3200,Fg=3201,Og=3202,Bg=3203,ss=0,fp=1,rs="",Rn="srgb",Oo="srgb-linear",Bo="linear",Wt="srgb",zg="",Vg="rg",Hg="ga",kg=0,nl=7680,Gg=7681,Wg=7682,Xg=7683,Yg=34055,qg=34056,Zg=5386,Jg=512,Kg=513,$g=514,jg=515,Qg=516,e0=517,t0=518,pp=519,mp=512,gp=513,_p=514,Xc=515,xp=516,yp=517,Yc=518,vp=519,qc=35044,n0=35048,i0=35040,s0=35045,r0=35049,o0=35041,a0=35046,l0=35050,c0=35042,h0="100",xd="300 es",ri=2e3,Zs=2001,u0={COMPUTE:"compute",RENDER:"render"},d0={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},f0={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},p0={TEXTURE_COMPARE:"depthTextureCompare"},m0={NONE:0,SHARED:1,FULL:2};function N_(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}var U_={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function Lo(s,e){return new U_[s](e)}function g0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function zo(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Sp(){let s=zo("canvas");return s.style.display="block",s}var pm={},Js=null;function _0(s){Js=s}function x0(){return Js}function Vo(...s){let e="THREE."+s.shift();Js?Js("log",e,...s):console.log(e,...s)}function y0(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Pe(...s){s=y0(s);let e="THREE."+s.shift();if(Js)Js("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function je(...s){s=y0(s);let e="THREE."+s.shift();if(Js)Js("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function Qi(...s){let e=s.join(" ");e in pm||(pm[e]=!0,Pe(...s))}function v0(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var S0={[al]:ll,[cl]:dl,[hl]:fl,[Tr]:ul,[ll]:al,[dl]:cl,[fl]:hl,[ul]:Tr},oi=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},zn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],mm=1234567,wr=Math.PI/180,Ar=180/Math.PI;function di(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(zn[s&255]+zn[s>>8&255]+zn[s>>16&255]+zn[s>>24&255]+"-"+zn[e&255]+zn[e>>8&255]+"-"+zn[e>>16&15|64]+zn[e>>24&255]+"-"+zn[t&63|128]+zn[t>>8&255]+"-"+zn[t>>16&255]+zn[t>>24&255]+zn[n&255]+zn[n>>8&255]+zn[n>>16&255]+zn[n>>24&255]).toLowerCase()}function ft(s,e,t){return Math.max(e,Math.min(t,s))}function Mp(s,e){return(s%e+e)%e}function F_(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function O_(s,e,t){return s!==e?(t-s)/(e-s):0}function il(s,e,t){return(1-t)*s+t*e}function B_(s,e,t,n){return il(s,e,1-Math.exp(-t*n))}function z_(s,e=1){return e-Math.abs(Mp(s,e*2)-e)}function V_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function H_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function k_(s,e){return s+Math.floor(Math.random()*(e-s+1))}function G_(s,e){return s+Math.random()*(e-s)}function W_(s){return s*(.5-Math.random())}function X_(s){s!==void 0&&(mm=s);let e=mm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Y_(s){return s*wr}function q_(s){return s*Ar}function Z_(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function J_(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function K_(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function $_(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),d=r((e-n)/2),u=o((e-n)/2),f=r((n-e)/2),p=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*d,l*u,a*c);break;case"YZY":s.set(l*u,a*h,l*d,a*c);break;case"ZXZ":s.set(l*d,l*u,a*h,a*c);break;case"XZX":s.set(a*h,l*p,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*p,a*c);break;case"ZYZ":s.set(l*p,l*f,a*h,a*c);break;default:Pe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Jn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function bt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Nn={DEG2RAD:wr,RAD2DEG:Ar,generateUUID:di,clamp:ft,euclideanModulo:Mp,mapLinear:F_,inverseLerp:O_,lerp:il,damp:B_,pingpong:z_,smoothstep:V_,smootherstep:H_,randInt:k_,randFloat:G_,randFloatSpread:W_,seededRandom:X_,degToRad:Y_,radToDeg:q_,isPowerOfTwo:Z_,ceilPowerOfTwo:J_,floorPowerOfTwo:K_,setQuaternionFromProperEuler:$_,normalize:bt,denormalize:Jn},le=class s{static{s.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},gn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],u=r[o+0],f=r[o+1],p=r[o+2],_=r[o+3];if(d!==_||l!==u||c!==f||h!==p){let g=l*u+c*f+h*p+d*_;g<0&&(u=-u,f=-f,p=-p,_=-_,g=-g);let m=1-a;if(g<.9995){let y=Math.acos(g),b=Math.sin(y);m=Math.sin(m*y)/b,a=Math.sin(a*y)/b,l=l*m+u*a,c=c*m+f*a,h=h*m+p*a,d=d*m+_*a}else{l=l*m+u*a,c=c*m+f*a,h=h*m+p*a,d=d*m+_*a;let y=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=y,c*=y,h*=y,d*=y}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[o],u=r[o+1],f=r[o+2],p=r[o+3];return e[t]=a*p+h*d+l*f-c*u,e[t+1]=l*p+h*u+c*d-a*f,e[t+2]=c*p+h*f+a*u-l*d,e[t+3]=h*p-a*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(r/2),u=l(n/2),f=l(i/2),p=l(r/2);switch(o){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+a+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>d){let f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-n-d);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ft(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,i=-i,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},E=class s{static{s.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(gm.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(gm.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),d=2*(r*n-o*t);return this.x=t+l*c+o*d-a*h,this.y=n+l*h+a*c-r*d,this.z=i+l*d+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Gd.copy(this).projectOnVector(e),this.sub(Gd)}reflect(e){return this.sub(Gd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Gd=new E,gm=new gn,mt=class s{static{s.prototype.isMatrix3=!0}constructor(e,t,n,i,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],_=i[0],g=i[3],m=i[6],y=i[1],b=i[4],v=i[7],A=i[2],T=i[5],L=i[8];return r[0]=o*_+a*y+l*A,r[3]=o*g+a*b+l*T,r[6]=o*m+a*v+l*L,r[1]=c*_+h*y+d*A,r[4]=c*g+h*b+d*T,r[7]=c*m+h*v+d*L,r[2]=u*_+f*y+p*A,r[5]=u*g+f*b+p*T,r[8]=u*m+f*v+p*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=h*o-a*c,u=a*l-h*r,f=c*r-o*l,p=t*d+n*u+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return e[0]=d*_,e[1]=(i*c-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=u*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return Qi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Wd.makeScale(e,t)),this}rotate(e){return Qi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Wd.makeRotation(-e)),this}translate(e,t){return Qi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Wd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Wd=new mt,_m=new mt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xm=new mt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function j_(){let s={enabled:!0,workingColorSpace:Oo,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Wt&&(i.r=Ss(i.r),i.g=Ss(i.g),i.b=Ss(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Wt&&(i.r=Do(i.r),i.g=Do(i.g),i.b=Do(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===rs?Bo:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Qi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Qi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Oo]:{primaries:e,whitePoint:n,transfer:Bo,toXYZ:_m,fromXYZ:xm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Rn},outputColorSpaceConfig:{drawingBufferColorSpace:Rn}},[Rn]:{primaries:e,whitePoint:n,transfer:Wt,toXYZ:_m,fromXYZ:xm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Rn}}}),s}var Ct=j_();function Ss(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Do(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var uo,ml=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{uo===void 0&&(uo=zo("canvas")),uo.width=e.width,uo.height=e.height;let i=uo.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=uo}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=zo("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=Ss(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ss(t[n]/255)*255):t[n]=Ss(t[n]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Q_=0,Si=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Q_++}),this.uuid=di(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Xd(i[o].image)):r.push(Xd(i[o]))}else r=Xd(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Xd(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ml.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}var jh=class extends Si{constructor(e=null){Qi('Source: "Source" has been renamed to "TextureSource". Please update your code to use "THREE.TextureSource" instead.'),super(e),this.isSource=!0}},ex=0,Yd=new E,dn=class s extends oi{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Kn,i=Kn,r=jt,o=Yi,a=Gn,l=ei,c=s.DEFAULT_ANISOTROPY,h=rs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ex++}),this.uuid=di(),this.name="",this.source=new Si(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new mt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Yd).x}get height(){return this.source.getSize(Yd).y}get depth(){return this.source.getSize(Yd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ac)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qs:e.x=e.x-Math.floor(e.x);break;case Kn:e.x=e.x<0?0:1;break;case No:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qs:e.y=e.y-Math.floor(e.y);break;case Kn:e.y=e.y<0?0:1;break;case No:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=ac;dn.DEFAULT_ANISOTROPY=1;var Ut=class s{static{s.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(c+1)/2,v=(f+1)/2,A=(m+1)/2,T=(h+u)/4,L=(d+_)/4,S=(p+g)/4;return b>v&&b>A?b<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(b),i=T/n,r=L/n):v>A?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=T/i,r=S/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=L/r,i=S/r),this.set(n,i,r,t),this}let y=Math.sqrt((g-p)*(g-p)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(g-p)/y,this.y=(d-_)/y,this.z=(u-h)/y,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this.w=ft(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this.w=ft(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ho=class extends oi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ut(0,0,e,t),this.scissorTest=!1,this.viewport=new Ut(0,0,e,t),this.textures=[];let i={width:e,height:t,depth:n.depth},r=new dn(i),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:jt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Si(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Pn=class extends Ho{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Rr=class extends dn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=un,this.minFilter=un,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Qh=class extends Pn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Rr(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},Cr=class extends dn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=un,this.minFilter=un,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},eu=class extends Pn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Cr(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},ut=class s{static{s.prototype.isMatrix4=!0}constructor(e,t,n,i,r,o,a,l,c,h,d,u,f,p,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,d,u,f,p,_,g)}set(e,t,n,i,r,o,a,l,c,h,d,u,f,p,_,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/fo.setFromMatrixColumn(e,0).length(),r=1/fo.setFromMatrixColumn(e,1).length(),o=1/fo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=o*h,f=o*d,p=a*h,_=a*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+p*c,t[5]=u-_*c,t[9]=-a*l,t[2]=_-u*c,t[6]=p+f*c,t[10]=o*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,p=c*h,_=c*d;t[0]=u+_*a,t[4]=p*a-f,t[8]=o*c,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=f*a-p,t[6]=_+u*a,t[10]=o*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,p=c*h,_=c*d;t[0]=u-_*a,t[4]=-o*d,t[8]=p+f*a,t[1]=f+p*a,t[5]=o*h,t[9]=_-u*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let u=o*h,f=o*d,p=a*h,_=a*d;t[0]=l*h,t[4]=p*c-f,t[8]=u*c+_,t[1]=l*d,t[5]=_*c+u,t[9]=f*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let u=o*l,f=o*c,p=a*l,_=a*c;t[0]=l*h,t[4]=_-u*d,t[8]=p*d+f,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*d+p,t[10]=u-_*d}else if(e.order==="XZY"){let u=o*l,f=o*c,p=a*l,_=a*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+_,t[5]=o*h,t[9]=f*d-p,t[2]=p*d-f,t[6]=a*h,t[10]=_*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tx,e,nx)}lookAt(e,t,n){let i=this.elements;return hi.subVectors(e,t),hi.lengthSq()===0&&(hi.z=1),hi.normalize(),zs.crossVectors(n,hi),zs.lengthSq()===0&&(Math.abs(n.z)===1?hi.x+=1e-4:hi.z+=1e-4,hi.normalize(),zs.crossVectors(n,hi)),zs.normalize(),ah.crossVectors(hi,zs),i[0]=zs.x,i[4]=ah.x,i[8]=hi.x,i[1]=zs.y,i[5]=ah.y,i[9]=hi.y,i[2]=zs.z,i[6]=ah.z,i[10]=hi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],y=n[3],b=n[7],v=n[11],A=n[15],T=i[0],L=i[4],S=i[8],R=i[12],D=i[1],O=i[5],k=i[9],q=i[13],U=i[2],B=i[6],z=i[10],G=i[14],se=i[3],Y=i[7],ee=i[11],ae=i[15];return r[0]=o*T+a*D+l*U+c*se,r[4]=o*L+a*O+l*B+c*Y,r[8]=o*S+a*k+l*z+c*ee,r[12]=o*R+a*q+l*G+c*ae,r[1]=h*T+d*D+u*U+f*se,r[5]=h*L+d*O+u*B+f*Y,r[9]=h*S+d*k+u*z+f*ee,r[13]=h*R+d*q+u*G+f*ae,r[2]=p*T+_*D+g*U+m*se,r[6]=p*L+_*O+g*B+m*Y,r[10]=p*S+_*k+g*z+m*ee,r[14]=p*R+_*q+g*G+m*ae,r[3]=y*T+b*D+v*U+A*se,r[7]=y*L+b*O+v*B+A*Y,r[11]=y*S+b*k+v*z+A*ee,r[15]=y*R+b*q+v*G+A*ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15],y=l*f-c*u,b=a*f-c*d,v=a*u-l*d,A=o*f-c*h,T=o*u-l*h,L=o*d-a*h;return t*(_*y-g*b+m*v)-n*(p*y-g*A+m*T)+i*(p*b-_*A+m*L)-r*(p*v-_*T+g*L)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],h=e[10];return t*(o*h-a*c)-n*(r*h-a*l)+i*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],y=t*a-n*o,b=t*l-i*o,v=t*c-r*o,A=n*l-i*a,T=n*c-r*a,L=i*c-r*l,S=h*_-d*p,R=h*g-u*p,D=h*m-f*p,O=d*g-u*_,k=d*m-f*_,q=u*m-f*g,U=y*q-b*k+v*O+A*D-T*R+L*S;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/U;return e[0]=(a*q-l*k+c*O)*B,e[1]=(i*k-n*q-r*O)*B,e[2]=(_*L-g*T+m*A)*B,e[3]=(u*T-d*L-f*A)*B,e[4]=(l*D-o*q-c*R)*B,e[5]=(t*q-i*D+r*R)*B,e[6]=(g*v-p*L-m*b)*B,e[7]=(h*L-u*v+f*b)*B,e[8]=(o*k-a*D+c*S)*B,e[9]=(n*D-t*k-r*S)*B,e[10]=(p*T-_*v+m*y)*B,e[11]=(d*v-h*T-f*y)*B,e[12]=(a*R-o*O-l*S)*B,e[13]=(t*O-n*R+i*S)*B,e[14]=(_*b-p*A-g*y)*B,e[15]=(h*A-d*b+u*y)*B,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,d=a+a,u=r*c,f=r*h,p=r*d,_=o*h,g=o*d,m=a*d,y=l*c,b=l*h,v=l*d,A=n.x,T=n.y,L=n.z;return i[0]=(1-(_+m))*A,i[1]=(f+v)*A,i[2]=(p-b)*A,i[3]=0,i[4]=(f-v)*T,i[5]=(1-(u+m))*T,i[6]=(g+y)*T,i[7]=0,i[8]=(p+b)*L,i[9]=(g-y)*L,i[10]=(1-(u+_))*L,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=fo.set(i[0],i[1],i[2]).length(),a=fo.set(i[4],i[5],i[6]).length(),l=fo.set(i[8],i[9],i[10]).length();r<0&&(o=-o),Li.copy(this);let c=1/o,h=1/a,d=1/l;return Li.elements[0]*=c,Li.elements[1]*=c,Li.elements[2]*=c,Li.elements[4]*=h,Li.elements[5]*=h,Li.elements[6]*=h,Li.elements[8]*=d,Li.elements[9]*=d,Li.elements[10]*=d,t.setFromRotationMatrix(Li),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,i,r,o,a=ri,l=!1){let c=this.elements,h=2*r/(t-e),d=2*r/(n-i),u=(t+e)/(t-e),f=(n+i)/(n-i),p,_;if(l)p=r/(o-r),_=o*r/(o-r);else if(a===ri)p=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Zs)p=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=ri,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-i),u=-(t+e)/(t-e),f=-(n+i)/(n-i),p,_;if(l)p=1/(o-r),_=o/(o-r);else if(a===ri)p=-2/(o-r),_=-(o+r)/(o-r);else if(a===Zs)p=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},fo=new E,Li=new ut,tx=new E(0,0,0),nx=new E(1,1,1),zs=new E,ah=new E,hi=new E,ym=new ut,vm=new gn,bi=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ft(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ft(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ft(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ym.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ym,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vm.setFromEuler(this),this.setFromQuaternion(vm,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};bi.DEFAULT_ORDER="XYZ";var Pr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},ix=0,Sm=new E,po=new gn,ps=new ut,lh=new E,Ha=new E,sx=new E,rx=new gn,Mm=new E(1,0,0),bm=new E(0,1,0),Em=new E(0,0,1),wm={type:"added"},ox={type:"removed"},mo={type:"childadded",child:null},qd={type:"childremoved",child:null},Ft=class s extends oi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ix++}),this.uuid=di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new E,t=new bi,n=new gn,i=new E(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ut},normalMatrix:{value:new mt}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return po.setFromAxisAngle(e,t),this.quaternion.multiply(po),this}rotateOnWorldAxis(e,t){return po.setFromAxisAngle(e,t),this.quaternion.premultiply(po),this}rotateX(e){return this.rotateOnAxis(Mm,e)}rotateY(e){return this.rotateOnAxis(bm,e)}rotateZ(e){return this.rotateOnAxis(Em,e)}translateOnAxis(e,t){return Sm.copy(e).applyQuaternion(this.quaternion),this.position.add(Sm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Mm,e)}translateY(e){return this.translateOnAxis(bm,e)}translateZ(e){return this.translateOnAxis(Em,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ps.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?lh.copy(e):lh.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ha.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ps.lookAt(Ha,lh,this.up):ps.lookAt(lh,Ha,this.up),this.quaternion.setFromRotationMatrix(ps),i&&(ps.extractRotation(i.matrixWorld),po.setFromRotationMatrix(ps),this.quaternion.premultiply(po.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(wm),mo.child=e,this.dispatchEvent(mo),mo.child=null):je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ox),qd.child=e,this.dispatchEvent(qd),qd.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ps.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ps.multiply(e.parent.matrixWorld)),e.applyMatrix4(ps),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(wm),mo.child=e,this.dispatchEvent(mo),mo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ha,e,sx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ha,rx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),d=o(e.shapes),u=o(e.skeletons),f=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ft.DEFAULT_UP=new E(0,1,0);Ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var mn=class extends Ft{constructor(){super(),this.isGroup=!0,this.type="Group"}},ax={type:"move"},Ir=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ax)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new mn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},M0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vs={h:0,s:0,l:0},ch={h:0,s:0,l:0};function Zd(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Oe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Rn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ct.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Ct.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ct.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Ct.workingColorSpace){if(e=Mp(e,1),t=ft(t,0,1),n=ft(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Zd(o,r,e+1/3),this.g=Zd(o,r,e),this.b=Zd(o,r,e-1/3)}return Ct.colorSpaceToWorking(this,i),this}setStyle(e,t=Rn){function n(r){r!==void 0&&parseFloat(r)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Rn){let n=M0[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ss(e.r),this.g=Ss(e.g),this.b=Ss(e.b),this}copyLinearToSRGB(e){return this.r=Do(e.r),this.g=Do(e.g),this.b=Do(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Rn){return Ct.workingToColorSpace(Vn.copy(this),e),Math.round(ft(Vn.r*255,0,255))*65536+Math.round(ft(Vn.g*255,0,255))*256+Math.round(ft(Vn.b*255,0,255))}getHexString(e=Rn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ct.workingColorSpace){Ct.workingToColorSpace(Vn.copy(this),t);let n=Vn.r,i=Vn.g,r=Vn.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=h<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ct.workingColorSpace){return Ct.workingToColorSpace(Vn.copy(this),t),e.r=Vn.r,e.g=Vn.g,e.b=Vn.b,e}getStyle(e=Rn){Ct.workingToColorSpace(Vn.copy(this),e);let t=Vn.r,n=Vn.g,i=Vn.b;return e!==Rn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Vs),this.setHSL(Vs.h+e,Vs.s+t,Vs.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Vs),e.getHSL(ch);let n=il(Vs.h,ch.h,t),i=il(Vs.s,ch.s,t),r=il(Vs.l,ch.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Vn=new Oe;Oe.NAMES=M0;var gl=class s{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Oe(e),this.density=t}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}},_l=class s{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Oe(e),this.near=t,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ms=class extends Ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bi,this.environmentIntensity=1,this.environmentRotation=new bi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Di=new E,ms=new E,Jd=new E,gs=new E,go=new E,_o=new E,Tm=new E,Kd=new E,$d=new E,jd=new E,Qd=new Ut,ef=new Ut,tf=new Ut,Fi=class s{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Di.subVectors(e,t),i.cross(Di);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Di.subVectors(i,t),ms.subVectors(n,t),Jd.subVectors(e,t);let o=Di.dot(Di),a=Di.dot(ms),l=Di.dot(Jd),c=ms.dot(ms),h=ms.dot(Jd),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-a*h)*u,p=(o*h-a*l)*u;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,gs)===null?!1:gs.x>=0&&gs.y>=0&&gs.x+gs.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,gs)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,gs.x),l.addScaledVector(o,gs.y),l.addScaledVector(a,gs.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return Qd.setScalar(0),ef.setScalar(0),tf.setScalar(0),Qd.fromBufferAttribute(e,t),ef.fromBufferAttribute(e,n),tf.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Qd,r.x),o.addScaledVector(ef,r.y),o.addScaledVector(tf,r.z),o}static isFrontFacing(e,t,n,i){return Di.subVectors(n,t),ms.subVectors(e,t),Di.cross(ms).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Di.subVectors(this.c,this.b),ms.subVectors(this.a,this.b),Di.cross(ms).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;go.subVectors(i,n),_o.subVectors(r,n),Kd.subVectors(e,n);let l=go.dot(Kd),c=_o.dot(Kd);if(l<=0&&c<=0)return t.copy(n);$d.subVectors(e,i);let h=go.dot($d),d=_o.dot($d);if(h>=0&&d<=h)return t.copy(i);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(go,o);jd.subVectors(e,r);let f=go.dot(jd),p=_o.dot(jd);if(p>=0&&f<=p)return t.copy(r);let _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(_o,a);let g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return Tm.subVectors(r,i),a=(d-h)/(d-h+(f-p)),t.copy(i).addScaledVector(Tm,a);let m=1/(g+_+u);return o=_*m,a=u*m,t.copy(n).addScaledVector(go,o).addScaledVector(_o,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},tn=class{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ni.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ni.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ni.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ni):Ni.fromBufferAttribute(r,o),Ni.applyMatrix4(e.matrixWorld),this.expandByPoint(Ni);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),hh.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),hh.copy(n.boundingBox)),hh.applyMatrix4(e.matrixWorld),this.union(hh)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ni),Ni.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ka),uh.subVectors(this.max,ka),xo.subVectors(e.a,ka),yo.subVectors(e.b,ka),vo.subVectors(e.c,ka),Hs.subVectors(yo,xo),ks.subVectors(vo,yo),fr.subVectors(xo,vo);let t=[0,-Hs.z,Hs.y,0,-ks.z,ks.y,0,-fr.z,fr.y,Hs.z,0,-Hs.x,ks.z,0,-ks.x,fr.z,0,-fr.x,-Hs.y,Hs.x,0,-ks.y,ks.x,0,-fr.y,fr.x,0];return!nf(t,xo,yo,vo,uh)||(t=[1,0,0,0,1,0,0,0,1],!nf(t,xo,yo,vo,uh))?!1:(dh.crossVectors(Hs,ks),t=[dh.x,dh.y,dh.z],nf(t,xo,yo,vo,uh))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ni).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ni).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_s[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_s[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_s[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_s[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_s[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_s[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_s[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_s[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_s),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},_s=[new E,new E,new E,new E,new E,new E,new E,new E],Ni=new E,hh=new tn,xo=new E,yo=new E,vo=new E,Hs=new E,ks=new E,fr=new E,ka=new E,uh=new E,dh=new E,pr=new E;function nf(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){pr.fromArray(s,r);let a=i.x*Math.abs(pr.x)+i.y*Math.abs(pr.y)+i.z*Math.abs(pr.z),l=e.dot(pr),c=t.dot(pr),h=n.dot(pr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var vs=lx();function lx(){let s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}let r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function ii(s){Math.abs(s)>65504&&Pe("DataUtils.toHalfFloat(): Value out of range."),s=ft(s,-65504,65504),vs.floatView[0]=s;let e=vs.uint32View[0],t=e>>23&511;return vs.baseTable[t]+((e&8388607)>>vs.shiftTable[t])}function Qa(s){let e=s>>10;return vs.uint32View[0]=vs.mantissaTable[vs.offsetTable[e]+(s&1023)]+vs.exponentTable[e],vs.floatView[0]}var tu=class{static toHalfFloat(e){return ii(e)}static fromHalfFloat(e){return Qa(e)}},yn=new E,fh=new le,cx=0,qt=class extends oi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:cx++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=qc,this.updateRanges=[],this.gpuType=kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fh.fromBufferAttribute(this,t),fh.applyMatrix3(e),this.setXY(t,fh.x,fh.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.applyMatrix3(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.applyMatrix4(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.applyNormalMatrix(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yn.fromBufferAttribute(this,t),yn.transformDirection(e),this.setXYZ(t,yn.x,yn.y,yn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Jn(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Jn(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Jn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Jn(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}},nu=class extends qt{constructor(e,t,n){super(new Int8Array(e),t,n)}},iu=class extends qt{constructor(e,t,n){super(new Uint8Array(e),t,n)}},su=class extends qt{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}},ru=class extends qt{constructor(e,t,n){super(new Int16Array(e),t,n)}},ko=class extends qt{constructor(e,t,n){super(new Uint16Array(e),t,n)}},ou=class extends qt{constructor(e,t,n){super(new Int32Array(e),t,n)}},Go=class extends qt{constructor(e,t,n){super(new Uint32Array(e),t,n)}},au=class extends qt{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=Qa(this.array[e*this.itemSize]);return this.normalized&&(t=Jn(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=ii(t),this}getY(e){let t=Qa(this.array[e*this.itemSize+1]);return this.normalized&&(t=Jn(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=ii(t),this}getZ(e){let t=Qa(this.array[e*this.itemSize+2]);return this.normalized&&(t=Jn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=ii(t),this}getW(e){let t=Qa(this.array[e*this.itemSize+3]);return this.normalized&&(t=Jn(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=ii(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.array[e+0]=ii(t),this.array[e+1]=ii(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array)),this.array[e+0]=ii(t),this.array[e+1]=ii(n),this.array[e+2]=ii(i),this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.array[e+0]=ii(t),this.array[e+1]=ii(n),this.array[e+2]=ii(i),this.array[e+3]=ii(r),this}},ze=class extends qt{constructor(e,t,n){super(new Float32Array(e),t,n)}},hx=new tn,Ga=new E,sf=new E,nn=class{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):hx.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ga.subVectors(e,this.center);let t=Ga.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ga,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(sf.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ga.copy(e.center).add(sf)),this.expandByPoint(Ga.copy(e.center).sub(sf))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ux=0,vi=new ut,rf=new Ft,So=new E,ui=new tn,Wa=new tn,An=new E,_t=class s extends oi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ux++}),this.uuid=di(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(N_(e)?Go:ko)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new mt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return vi.makeRotationFromQuaternion(e),this.applyMatrix4(vi),this}rotateX(e){return vi.makeRotationX(e),this.applyMatrix4(vi),this}rotateY(e){return vi.makeRotationY(e),this.applyMatrix4(vi),this}rotateZ(e){return vi.makeRotationZ(e),this.applyMatrix4(vi),this}translate(e,t,n){return vi.makeTranslation(e,t,n),this.applyMatrix4(vi),this}scale(e,t,n){return vi.makeScale(e,t,n),this.applyMatrix4(vi),this}lookAt(e){return rf.lookAt(e),rf.updateMatrix(),this.applyMatrix4(rf.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(So).negate(),this.translate(So.x,So.y,So.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ze(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];ui.setFromBufferAttribute(r),this.morphTargetsRelative?(An.addVectors(this.boundingBox.min,ui.min),this.boundingBox.expandByPoint(An),An.addVectors(this.boundingBox.max,ui.max),this.boundingBox.expandByPoint(An)):(this.boundingBox.expandByPoint(ui.min),this.boundingBox.expandByPoint(ui.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new nn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(e){let n=this.boundingSphere.center;if(ui.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Wa.setFromBufferAttribute(a),this.morphTargetsRelative?(An.addVectors(ui.min,Wa.min),ui.expandByPoint(An),An.addVectors(ui.max,Wa.max),ui.expandByPoint(An)):(ui.expandByPoint(Wa.min),ui.expandByPoint(Wa.max))}ui.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)An.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(An));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)An.fromBufferAttribute(a,c),l&&(So.fromBufferAttribute(e,c),An.add(So)),i=Math.max(i,n.distanceToSquared(An))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new qt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let S=0;S<n.count;S++)a[S]=new E,l[S]=new E;let c=new E,h=new E,d=new E,u=new le,f=new le,p=new le,_=new E,g=new E;function m(S,R,D){c.fromBufferAttribute(n,S),h.fromBufferAttribute(n,R),d.fromBufferAttribute(n,D),u.fromBufferAttribute(r,S),f.fromBufferAttribute(r,R),p.fromBufferAttribute(r,D),h.sub(c),d.sub(c),f.sub(u),p.sub(u);let O=1/(f.x*p.y-p.x*f.y);isFinite(O)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(O),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(O),a[S].add(_),a[R].add(_),a[D].add(_),l[S].add(g),l[R].add(g),l[D].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let S=0,R=y.length;S<R;++S){let D=y[S],O=D.start,k=D.count;for(let q=O,U=O+k;q<U;q+=3)m(e.getX(q+0),e.getX(q+1),e.getX(q+2))}let b=new E,v=new E,A=new E,T=new E;function L(S){A.fromBufferAttribute(i,S),T.copy(A);let R=a[S];b.copy(R),b.sub(A.multiplyScalar(A.dot(R))).normalize(),v.crossVectors(T,R);let O=v.dot(l[S])<0?-1:1;o.setXYZW(S,b.x,b.y,b.z,O)}for(let S=0,R=y.length;S<R;++S){let D=y[S],O=D.start,k=D.count;for(let q=O,U=O+k;q<U;q+=3)L(e.getX(q+0)),L(e.getX(q+1)),L(e.getX(q+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new qt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new E,r=new E,o=new E,a=new E,l=new E,c=new E,h=new E,d=new E;if(e)for(let u=0,f=e.count;u<f;u+=3){let p=e.getX(u+0),_=e.getX(u+1),g=e.getX(u+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),o.fromBufferAttribute(t,u+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)An.fromBufferAttribute(e,t),An.normalize(),e.setXYZ(t,An.x,An.y,An.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h),f=0,p=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let m=0;m<h;m++)u[p++]=c[f++]}return new qt(u,h,d)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Lr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=qc,this.updateRanges=[],this.version=0,this.uuid=di()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Zn=new E,Wn=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Zn.fromBufferAttribute(this,t),Zn.applyMatrix4(e),this.setXYZ(t,Zn.x,Zn.y,Zn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Zn.fromBufferAttribute(this,t),Zn.applyNormalMatrix(e),this.setXYZ(t,Zn.x,Zn.y,Zn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Zn.fromBufferAttribute(this,t),Zn.transformDirection(e),this.setXYZ(t,Zn.x,Zn.y,Zn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Jn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Jn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Jn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Jn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Jn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),i=bt(i,this.array),r=bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Vo("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new qt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Vo("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},of=new E,dx=new E,fx=new mt,si=class{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=of.subVectors(n,t).cross(dx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(of),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||fx.getNormalMatrix(e),i=this.coplanarPoint(of).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},px=0,vn=class extends oi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:px++}),this.uuid=di(),this.name="",this.type="Material",this.blending=Kr,this.side=Ds,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nd,this.blendDst=id,this.blendEquation=lr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=Tr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=nl,this.stencilZFail=nl,this.stencilZPass=nl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Oe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new si().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new le().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new le().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ks=class extends vn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Mo,Xa=new E,bo=new E,Eo=new E,wo=new le,Ya=new le,b0=new ut,ph=new E,qa=new E,mh=new E,Am=new le,af=new le,Rm=new le,Dr=class extends Ft{constructor(e=new Ks){if(super(),this.isSprite=!0,this.type="Sprite",Mo===void 0){Mo=new _t;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Lr(t,5);Mo.setIndex([0,1,2,0,2,3]),Mo.setAttribute("position",new Wn(n,3,0,!1)),Mo.setAttribute("uv",new Wn(n,2,3,!1))}this.geometry=Mo,this.material=e,this.center=new le(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&je('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),bo.setFromMatrixScale(this.matrixWorld),b0.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Eo.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&bo.multiplyScalar(-Eo.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;gh(ph.set(-.5,-.5,0),Eo,o,bo,i,r),gh(qa.set(.5,-.5,0),Eo,o,bo,i,r),gh(mh.set(.5,.5,0),Eo,o,bo,i,r),Am.set(0,0),af.set(1,0),Rm.set(1,1);let a=e.ray.intersectTriangle(ph,qa,mh,!1,Xa);if(a===null&&(gh(qa.set(-.5,.5,0),Eo,o,bo,i,r),af.set(0,1),a=e.ray.intersectTriangle(ph,mh,qa,!1,Xa),a===null))return;let l=e.ray.origin.distanceTo(Xa);l<e.near||l>e.far||t.push({distance:l,point:Xa.clone(),uv:Fi.getInterpolation(Xa,ph,qa,mh,Am,af,Rm,new le),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function gh(s,e,t,n,i,r){wo.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Ya.x=r*wo.x-i*wo.y,Ya.y=i*wo.x+r*wo.y):Ya.copy(wo),s.copy(e),s.x+=Ya.x,s.y+=Ya.y,s.applyMatrix4(b0)}var _h=new E,Cm=new E,xl=class extends Ft{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);let t=e.levels;for(let n=0,i=t.length;n<i;n++){let r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);let i=this.levels,r;for(r=0;r<i.length&&!(t<i[r].distance);r++);return i.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){let t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){let i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){let t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){_h.setFromMatrixPosition(this.matrixWorld);let i=e.ray.origin.distanceTo(_h);this.getObjectForDistance(i).raycast(e,t)}}update(e){let t=this.levels;if(t.length>1){_h.setFromMatrixPosition(e.matrixWorld),Cm.setFromMatrixPosition(this.matrixWorld);let n=_h.distanceTo(Cm)/e.zoom;t[0].object.visible=!0;let i,r;for(i=1,r=t.length;i<r;i++){let o=t[i].distance;if(t[i].object.visible&&(o-=o*t[i].hysteresis),n>=o)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)t[i].object.visible=!1}}toJSON(e){let t=super.toJSON(e);t.object.autoUpdate=this.autoUpdate,t.object.levels=[];let n=this.levels;for(let i=0,r=n.length;i<r;i++){let o=n[i];t.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return t}},xs=new E,lf=new E,xh=new E,yh=new E,zi=class{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xs)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=xs.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xs.copy(this.origin).addScaledVector(this.direction,t),xs.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){lf.copy(e).add(t).multiplyScalar(.5),xh.copy(t).sub(e).normalize(),yh.copy(this.origin).sub(lf);let r=e.distanceTo(t)*.5,o=-this.direction.dot(xh),a=yh.dot(this.direction),l=-yh.dot(xh),c=yh.lengthSq(),h=Math.abs(1-o*o),d,u,f,p;if(h>0)if(d=o*l-a,u=o*a-l,p=r*h,d>=0)if(u>=-p)if(u<=p){let _=1/h;d*=_,u*=_,f=d*(d+o*u+2*a)+u*(o*d+u+2*l)+c}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(lf).addScaledVector(xh,u),f}intersectSphere(e,t){if(e.radius<0)return null;xs.subVectors(e.center,this.origin);let n=xs.dot(this.direction),i=xs.dot(xs)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,o=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,o=(e.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(a=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,xs)!==null}intersectTriangle(e,t,n,i,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,d=e.x-o.x,u=e.y-o.y,f=e.z-o.z,p=t.x-o.x,_=t.y-o.y,g=t.z-o.z,m=n.x-o.x,y=n.y-o.y,b=n.z-o.z,v=Math.abs(l),A=Math.abs(c),T=Math.abs(h),L,S,R,D,O,k,q,U,B,z,G,se;if(v>=A&&v>=T?(R=l,k=d,B=p,se=m,l>=0?(L=c,S=h,D=u,O=f,q=_,U=g,z=y,G=b):(L=h,S=c,D=f,O=u,q=g,U=_,z=b,G=y)):A>=T?(R=c,k=u,B=_,se=y,c>=0?(L=h,S=l,D=f,O=d,q=g,U=p,z=b,G=m):(L=l,S=h,D=d,O=f,q=p,U=g,z=m,G=b)):(R=h,k=f,B=g,se=b,h>=0?(L=l,S=c,D=d,O=u,q=p,U=_,z=m,G=y):(L=c,S=l,D=u,O=d,q=_,U=p,z=y,G=m)),R===0)return null;let Y=L/R,ee=S/R,ae=1/R,ke=D-Y*k,Be=O-ee*k,Dt=q-Y*B,Qe=U-ee*B,yt=z-Y*se,Q=G-ee*se,ne=yt*Qe-Q*Dt,Te=ke*Q-Be*yt,Ze=Dt*Be-Qe*ke;if(i){if(ne<0||Te<0||Ze<0)return null}else if((ne<0||Te<0||Ze<0)&&(ne>0||Te>0||Ze>0))return null;let Ge=ne+Te+Ze;if(Ge===0)return null;let ct=ae*(ne*k+Te*B+Ze*se);return(Ge>0?ct<0:ct>0)?null:this.at(ct/Ge,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qt=class extends vn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.combine=ma,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Pm=new ut,mr=new zi,vh=new nn,Im=new E,Sh=new E,Mh=new E,bh=new E,cf=new E,Eh=new E,Lm=new E,wh=new E,zt=class extends Ft{constructor(e=new _t,t=new Qt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){Eh.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],d=r[l];h!==0&&(cf.fromBufferAttribute(d,e),o?Eh.addScaledVector(cf,h):Eh.addScaledVector(cf.sub(t),h))}t.add(Eh)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vh.copy(n.boundingSphere),vh.applyMatrix4(r),mr.copy(e.ray).recast(e.near),!(vh.containsPoint(mr.origin)===!1&&(mr.intersectSphere(vh,Im)===null||mr.origin.distanceToSquared(Im)>(e.far-e.near)**2))&&(Pm.copy(r).invert(),mr.copy(e.ray).applyMatrix4(Pm),!(n.boundingBox!==null&&mr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,mr)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){let g=u[p],m=o[g.materialIndex],y=Math.max(g.start,f.start),b=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let v=y,A=b;v<A;v+=3){let T=a.getX(v),L=a.getX(v+1),S=a.getX(v+2);i=Th(this,m,e,n,c,h,d,T,L,S),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){let y=a.getX(g),b=a.getX(g+1),v=a.getX(g+2);i=Th(this,o,e,n,c,h,d,y,b,v),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=u.length;p<_;p++){let g=u[p],m=o[g.materialIndex],y=Math.max(g.start,f.start),b=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let v=y,A=b;v<A;v+=3){let T=v,L=v+1,S=v+2;i=Th(this,m,e,n,c,h,d,T,L,S),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){let y=g,b=g+1,v=g+2;i=Th(this,o,e,n,c,h,d,y,b,v),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function mx(s,e,t,n,i,r,o,a){let l;if(e.side===Cn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Ds,a),l===null)return null;wh.copy(a),wh.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(wh);return c<t.near||c>t.far?null:{distance:c,point:wh.clone(),object:s}}function Th(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,Sh),s.getVertexPosition(l,Mh),s.getVertexPosition(c,bh);let h=mx(s,e,t,n,Sh,Mh,bh,Lm);if(h){let d=new E;Fi.getBarycoord(Lm,Sh,Mh,bh,d),i&&(h.uv=Fi.getInterpolatedAttribute(i,a,l,c,d,new le)),r&&(h.uv1=Fi.getInterpolatedAttribute(r,a,l,c,d,new le)),o&&(h.normal=Fi.getInterpolatedAttribute(o,a,l,c,d,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new E,materialIndex:0};Fi.getNormal(Sh,Mh,bh,u.normal),h.face=u,h.barycoord=d}return h}var Za=new Ut,Dm=new Ut,Nm=new Ut,gx=new Ut,Um=new ut,Ah=new E,hf=new nn,Fm=new ut,uf=new zi,yl=class extends zt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Kh,this.bindMatrix=new ut,this.bindMatrixInverse=new ut,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new tn),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ah),this.boundingBox.expandByPoint(Ah)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new nn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ah),this.boundingSphere.expandByPoint(Ah)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hf.copy(this.boundingSphere),hf.applyMatrix4(i),e.ray.intersectsSphere(hf)!==!1&&(Fm.copy(i).invert(),uf.copy(e.ray).applyMatrix4(Fm),!(this.boundingBox!==null&&uf.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,uf)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ut,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Kh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===lp?this.bindMatrixInverse.copy(this.bindMatrix).invert():Pe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Dm.fromBufferAttribute(i.attributes.skinIndex,e),Nm.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Za.copy(t),t.set(0,0,0,0)):(Za.set(...t,1),t.set(0,0,0)),Za.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=Nm.getComponent(r);if(o!==0){let a=Dm.getComponent(r);Um.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(gx.copy(Za).applyMatrix4(Um),o)}}return t.isVector4&&(t.w=Za.w),t.applyMatrix4(this.bindMatrixInverse)}},Wo=class extends Ft{constructor(){super(),this.isBone=!0,this.type="Bone"}},$n=class extends dn{constructor(e=null,t=1,n=1,i,r,o,a,l,c=un,h=un,d,u){super(null,o,a,l,c,h,i,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Om=new ut,_x=new ut,vl=class s{constructor(e=[],t=[]){this.uuid=di(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Pe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ut)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ut;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:_x;Om.multiplyMatrices(a,t[r]),Om.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new $n(t,e,e,Gn,kn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(Pe("Skeleton: No bone found with UUID:",r),o=new Wo),this.bones.push(o),this.boneInverses.push(new ut().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},bs=class extends qt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},To=new ut,Bm=new ut,Rh=[],zm=new tn,xx=new ut,Ja=new zt,Ka=new nn,Es=class extends zt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new bs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,xx)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new tn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,To),zm.copy(e.boundingBox).applyMatrix4(To),this.boundingBox.union(zm)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new nn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,To),Ka.copy(e.boundingSphere).applyMatrix4(To),this.boundingSphere.union(Ka)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Ja.geometry=this.geometry,Ja.material=this.material,Ja.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ka.copy(this.boundingSphere),Ka.applyMatrix4(n),e.ray.intersectsSphere(Ka)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,To),Bm.multiplyMatrices(n,To),Ja.matrixWorld=Bm,Ja.raycast(e,Rh);for(let o=0,a=Rh.length;o<a;o++){let l=Rh[o];l.instanceId=r,l.object=this,t.push(l)}Rh.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new bs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new $n(new Float32Array(i*this.count),i,this.count,uc,kn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},gr=new nn,yx=new le(.5,.5),Ch=new E,es=class{constructor(e=new si,t=new si,n=new si,i=new si,r=new si,o=new si){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ri,n=!1){let i=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],p=r[8],_=r[9],g=r[10],m=r[11],y=r[12],b=r[13],v=r[14],A=r[15];if(i[0].setComponents(c-o,f-h,m-p,A-y).normalize(),i[1].setComponents(c+o,f+h,m+p,A+y).normalize(),i[2].setComponents(c+a,f+d,m+_,A+b).normalize(),i[3].setComponents(c-a,f-d,m-_,A-b).normalize(),n)i[4].setComponents(l,u,g,v).normalize(),i[5].setComponents(c-l,f-u,m-g,A-v).normalize();else if(i[4].setComponents(c-l,f-u,m-g,A-v).normalize(),t===ri)i[5].setComponents(c+l,f+u,m+g,A+v).normalize();else if(t===Zs)i[5].setComponents(l,u,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),gr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),gr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(gr)}intersectsSprite(e){gr.center.set(0,0,0);let t=yx.distanceTo(e.center);return gr.radius=.7071067811865476+t,gr.applyMatrix4(e.matrixWorld),this.intersectsSphere(gr)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Ch.x=i.normal.x>0?e.max.x:e.min.x,Ch.y=i.normal.y>0?e.max.y:e.min.y,Ch.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ch)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Vm=new ut,Sl=class s{constructor(){this.coordinateSystem=ri,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let i=0;i<t.length;i++){let r=t[i];Vm.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new es),n[i].setFromProjectionMatrix(Vm,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let i=0;i<e._count;i++)t[i]===void 0&&(t[i]=new es),t[i].copy(n[i]);return this._count=e._count,this}clone(){return new s().copy(this)}};function df(s,e){return s-e}function vx(s,e){return s.z-e.z}function Sx(s,e){return e.z-s.z}var Tf=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let r=this.pool,o=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});let a=r[this.index];o.push(a),this.index++,a.start=e,a.count=t,a.z=n,a.index=i}reset(){this.list.length=0,this.index=0}},ni=new ut,Mx=new Oe(1,1,1),bx=new es,Ex=new Sl,Ph=new tn,_r=new nn,$a=new E,Hm=new E,wx=new E,ff=new Tf,Hn=new zt,Ih=[];function Tx(s,e,t=0){let n=e.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==e.array.constructor){let i=s.count;for(let r=0;r<i;r++)for(let o=0;o<n;o++)e.setComponent(r+t,o,s.getComponent(r,o))}else e.array.set(s.array,t*n);e.needsUpdate=!0}function xr(s,e){if(s.constructor!==e.constructor){let t=Math.min(s.length,e.length);for(let n=0;n<t;n++)e[n]=s[n]}else{let t=Math.min(s.length,e.length);e.set(new s.constructor(s.buffer,0,t))}}var Ml=class extends zt{constructor(e,t,n=t*2,i){super(new _t,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawBytesPerElement=1,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4),n=new $n(t,e,e,Gn,kn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Uint32Array(e*e),n=new $n(t,e,e,va,gi);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Float32Array(e*e*4).fill(1),n=new $n(t,e,e,Gn,kn);n.colorSpace=Ct.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){let t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(let r in e.attributes){let o=e.getAttribute(r),{array:a,itemSize:l,normalized:c}=o,h=new a.constructor(n*l),d=new qt(h,l,c);t.setAttribute(r,d)}if(e.getIndex()!==null){let r=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new qt(r,1))}this._geometryInitialized=!0}}_validateGeometry(e){let t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(let n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let i=e.getAttribute(n),r=t.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){let t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){let t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tn);let e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let r=t[n].geometryIndex;this.getMatrixAt(n,ni),this.getBoundingBoxAt(r,Ph).applyMatrix4(ni),e.union(Ph)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new nn);let e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let r=t[n].geometryIndex;this.getMatrixAt(n,ni),this.getBoundingSphereAt(r,_r).applyMatrix4(ni),e.union(_r)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");let n={visible:!0,active:!0,geometryIndex:e},i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(df),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));let r=this._matricesTexture;ni.identity().toArray(r.image.data,i*16),r.needsUpdate=!0;let o=this._colorsTexture;return o&&(Mx.toArray(o.image.data,i*4),o.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);let i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;let o=e.getIndex();if(o!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?o.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(df),l=this._availableGeometryIds.shift(),r[l]=i):(l=this._geometryCount,this._geometryCount++,r.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);let n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),o=t.getIndex(),a=this._geometryInfo[e];if(i&&o.count>a.reservedIndexCount||t.attributes.position.count>a.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");let l=a.vertexStart,c=a.reservedVertexCount;a.vertexCount=t.getAttribute("position").count;for(let h in n.attributes){let d=t.getAttribute(h),u=n.getAttribute(h);Tx(d,u,l);let f=d.itemSize;for(let p=d.count,_=c;p<_;p++){let g=l+p;for(let m=0;m<f;m++)u.setComponent(g,m,0)}u.needsUpdate=!0,u.addUpdateRange(l*f,c*f)}if(i){let h=a.indexStart,d=a.reservedIndexCount;a.indexCount=t.getIndex().count;for(let u=0;u<o.count;u++)r.setX(h+u,l+o.getX(u));for(let u=o.count,f=d;u<f;u++)r.setX(h+u,l);r.needsUpdate=!0,r.addUpdateRange(h,a.reservedIndexCount)}return a.start=i?a.indexStart:a.vertexStart,a.count=i?a.indexCount:a.vertexCount,a.boundingBox=null,t.boundingBox!==null&&(a.boundingBox=t.boundingBox.clone()),a.boundingSphere=null,t.boundingSphere!==null&&(a.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){let t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;let n=this._instanceInfo;for(let i=0,r=n.length;i<r;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0,n=this._geometryInfo,i=n.map((o,a)=>a).sort((o,a)=>n[o].vertexStart-n[a].vertexStart),r=this.geometry;for(let o=0,a=n.length;o<a;o++){let l=i[o],c=n[l];if(c.active!==!1){if(r.index!==null){if(c.indexStart!==t){let{indexStart:h,vertexStart:d,reservedIndexCount:u}=c,f=r.index,p=f.array,_=e-d;for(let g=h;g<h+u;g++)p[g]=p[g]+_;f.array.copyWithin(t,h,h+u),f.addUpdateRange(t,u),f.needsUpdate=!0,c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){let{vertexStart:h,reservedVertexCount:d}=c,u=r.attributes;for(let f in u){let p=u[f],{array:_,itemSize:g}=p;_.copyWithin(e*g,h*g,(h+d)*g),p.addUpdateRange(e*g,d*g),p.needsUpdate=!0}c.vertexStart=e}e+=c.reservedVertexCount,c.start=r.index?c.indexStart:c.vertexStart}}return this._nextIndexStart=t,this._nextVertexStart=e,this._visibilityChanged=!0,this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){let r=new tn,o=n.index,a=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let h=l;o&&(h=o.getX(h)),r.expandByPoint($a.fromBufferAttribute(a,h))}i.boundingBox=r}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){let r=new nn;this.getBoundingBoxAt(e,Ph),Ph.getCenter(r.center);let o=n.index,a=n.attributes.position,l=0;for(let c=i.start,h=i.start+i.count;c<h;c++){let d=c;o&&(d=o.getX(d)),$a.fromBufferAttribute(a,d),l=Math.max(l,r.center.distanceToSquared($a))}r.radius=Math.sqrt(l),i.boundingSphere=r}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);let n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null?t.isVector4?t.set(1,1,1,1):t.setRGB(1,1,1):t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this._visibilityChanged=!0,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);let n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){let t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(df);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`THREE.BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);let i=new Int32Array(e),r=new Int32Array(e);xr(this._multiDrawCounts,i),xr(this._multiDrawStarts,r),this._multiDrawCounts=i,this._multiDrawStarts=r,this._maxInstanceCount=e;let o=this._indirectTexture,a=this._matricesTexture,l=this._colorsTexture;o.dispose(),this._initIndirectTexture(),xr(o.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),xr(a.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),xr(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){let n=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...n.map(a=>a.vertexStart+a.reservedVertexCount))>e)throw new Error(`THREE.BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`THREE.BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);let r=this.geometry;r.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new _t,this._initializeGeometry(r));let o=this.geometry;r.index&&xr(r.index.array,o.index.array);for(let a in r.attributes)xr(r.attributes[a].array,o.attributes[a].array)}raycast(e,t){let n=this._instanceInfo,i=this._geometryInfo,r=this.matrixWorld,o=this.geometry;Hn.material=this.material,Hn.geometry.index=o.index,Hn.geometry.attributes=o.attributes,Hn.geometry.boundingBox===null&&(Hn.geometry.boundingBox=new tn),Hn.geometry.boundingSphere===null&&(Hn.geometry.boundingSphere=new nn);for(let a=0,l=n.length;a<l;a++){if(!n[a].visible||!n[a].active)continue;let c=n[a].geometryIndex,h=i[c];Hn.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(a,Hn.matrixWorld).premultiply(r),this.getBoundingBoxAt(c,Hn.geometry.boundingBox),this.getBoundingSphereAt(c,Hn.geometry.boundingSphere),Hn.raycast(e,Ih);for(let d=0,u=Ih.length;d<u;d++){let f=Ih[d];f.object=this,f.batchId=a,t.push(f)}Ih.length=0}Hn.material=null,Hn.geometry.index=null,Hn.geometry.attributes={},Hn.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._multiDrawBytesPerElement=e._multiDrawBytesPerElement,this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){super.dispose(),this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,l=1;r.wireframe&&(l=2,a=i.attributes.position.count>65535?4:2);let c=this._instanceInfo,h=this._multiDrawStarts,d=this._multiDrawCounts,u=this._geometryInfo,f=this.perObjectFrustumCulled,p=this._indirectTexture,_=p.image.data,g=n.isArrayCamera?Ex:bx;f&&(n.isArrayCamera?g.setFromArrayCamera(n):(ni.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),g.setFromProjectionMatrix(ni,n.coordinateSystem,n.reversedDepth)));let m=0;if(this.sortObjects){ni.copy(this.matrixWorld).invert(),$a.setFromMatrixPosition(n.matrixWorld).applyMatrix4(ni),Hm.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(ni);for(let v=0,A=c.length;v<A;v++)if(c[v].visible&&c[v].active){let T=c[v].geometryIndex;this.getMatrixAt(v,ni),this.getBoundingSphereAt(T,_r).applyMatrix4(ni);let L=!1;if(f&&(L=!g.intersectsSphere(_r)),!L){let S=u[T],R=wx.subVectors(_r.center,$a).dot(Hm);ff.push(S.start,S.count,R,v)}}let y=ff.list,b=this.customSort;b===null?y.sort(r.transparent?Sx:vx):b.call(this,y,n);for(let v=0,A=y.length;v<A;v++){let T=y[v];h[m]=T.start*a*l,d[m]=T.count*l,_[m]=T.index,m++}ff.reset()}else for(let y=0,b=c.length;y<b;y++)if(c[y].visible&&c[y].active){let v=c[y].geometryIndex,A=!1;if(f&&(this.getMatrixAt(y,ni),this.getBoundingSphereAt(v,_r).applyMatrix4(ni),A=!g.intersectsSphere(_r)),!A){let T=u[v];h[m]=T.start*a*l,d[m]=T.count*l,_[m]=y,m++}}p.needsUpdate=!0,this._multiDrawCount=m,this._multiDrawBytesPerElement=a,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,r,o){this.onBeforeRender(e,null,i,r,o)}},Sn=class extends vn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},lu=new E,cu=new E,km=new ut,ja=new zi,Lh=new nn,pf=new E,Gm=new E,Vi=class extends Ft{constructor(e=new _t,t=new Sn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)lu.fromBufferAttribute(t,i-1),cu.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=lu.distanceTo(cu);e.setAttribute("lineDistance",new ze(n,1))}else Pe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Lh.copy(n.boundingSphere),Lh.applyMatrix4(i),Lh.radius+=r,e.ray.intersectsSphere(Lh)===!1)return;km.copy(i).invert(),ja.copy(e.ray).applyMatrix4(km);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){let m=h.getX(_),y=h.getX(_+1),b=Dh(this,e,ja,l,m,y,_);b&&t.push(b)}if(this.isLineLoop){let _=h.getX(p-1),g=h.getX(f),m=Dh(this,e,ja,l,_,g,p-1);m&&t.push(m)}}else{let f=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){let m=Dh(this,e,ja,l,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){let _=Dh(this,e,ja,l,p-1,f,p-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Dh(s,e,t,n,i,r,o){let a=s.geometry.attributes.position;if(lu.fromBufferAttribute(a,i),cu.fromBufferAttribute(a,r),t.distanceSqToSegment(lu,cu,pf,Gm)>n)return;pf.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(pf);if(!(c<e.near||c>e.far))return{distance:c,point:Gm.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}var Wm=new E,Xm=new E,jn=class extends Vi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Wm.fromBufferAttribute(t,i),Xm.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Wm.distanceTo(Xm);e.setAttribute("lineDistance",new ze(n,1))}else Pe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},bl=class extends Vi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Xo=class extends vn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ym=new ut,Af=new zi,Nh=new nn,Uh=new E,El=class extends Ft{constructor(e=new _t,t=new Xo){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Nh.copy(n.boundingSphere),Nh.applyMatrix4(i),Nh.radius+=r,e.ray.intersectsSphere(Nh)===!1)return;Ym.copy(i).invert(),Af.copy(e.ray).applyMatrix4(Ym);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=u,_=f;p<_;p++){let g=c.getX(p);Uh.fromBufferAttribute(d,g),qm(Uh,g,l,i,e,t,this)}}else{let u=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let p=u,_=f;p<_;p++)Uh.fromBufferAttribute(d,p),qm(Uh,p,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function qm(s,e,t,n,i,r,o){let a=Af.distanceSqToPoint(s);if(a<t){let l=new E;Af.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var wl=class extends dn{constructor(e,t,n,i,r=jt,o=jt,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;let h=this;function d(){h.needsUpdate=!0,h._requestVideoFrameCallbackId=e.requestVideoFrameCallback(d)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(d))}clone(){return new this.constructor(this.image).copy(this)}update(){let e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}},hu=class extends wl{constructor(e,t,n,i,r,o,a,l){super({},e,t,n,i,r,o,a,l),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(e){this.image=e,this.needsUpdate=!0}},uu=class extends dn{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=un,this.minFilter=un,this.generateMipmaps=!1,this.needsUpdate=!0}},Nr=class extends dn{constructor(e,t,n,i,r,o,a,l,c,h,d,u){super(null,o,a,l,c,h,i,r,d,u),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}},du=class extends Nr{constructor(e,t,n,i,r,o){super(e,t,n,r,o),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Kn,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},fu=class extends Nr{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,Xi),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}},$s=class extends dn{constructor(e=[],t=Xi,n,i,r,o,a,l,c,h){super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},js=class extends dn{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},pu=class extends dn{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;let h=e?e.parentNode:null;h!==null&&"requestPaint"in h&&(h.onpaint=()=>{this.needsUpdate=!0},h.requestPaint())}dispose(){let e=this.image?this.image.parentNode:null;e!==null&&"onpaint"in e&&(e.onpaint=null),super.dispose()}},ws=class extends dn{constructor(e,t,n=gi,i,r,o,a=un,l=un,c,h=Bi,d=1){if(h!==Bi&&h!==Us)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Si(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Tl=class extends ws{constructor(e,t=gi,n=Xi,i,r,o=un,a=un,l,c=Bi){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,i,r,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Yo=class extends dn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},In=class s extends _t{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],d=[],u=0,f=0;p("z","y","x",-1,-1,n,t,e,o,r,0),p("z","y","x",1,-1,n,t,-e,o,r,1),p("x","z","y",1,1,e,n,t,i,o,2),p("x","z","y",1,-1,e,n,-t,i,o,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ze(c,3)),this.setAttribute("normal",new ze(h,3)),this.setAttribute("uv",new ze(d,2));function p(_,g,m,y,b,v,A,T,L,S,R){let D=v/L,O=A/S,k=v/2,q=A/2,U=T/2,B=L+1,z=S+1,G=0,se=0,Y=new E;for(let ee=0;ee<z;ee++){let ae=ee*O-q;for(let ke=0;ke<B;ke++){let Be=ke*D-k;Y[_]=Be*y,Y[g]=ae*b,Y[m]=U,c.push(Y.x,Y.y,Y.z),Y[_]=0,Y[g]=0,Y[m]=T>0?1:-1,h.push(Y.x,Y.y,Y.z),d.push(ke/L),d.push(1-ee/S),G+=1}}for(let ee=0;ee<S;ee++)for(let ae=0;ae<L;ae++){let ke=u+ae+B*ee,Be=u+ae+B*(ee+1),Dt=u+(ae+1)+B*(ee+1),Qe=u+(ae+1)+B*ee;l.push(ke,Be,Qe),l.push(Be,Dt,Qe),se+=6}a.addGroup(f,se,R),f+=se,u+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Al=class s extends _t{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=t/2,d=Math.PI/2*e,u=t,f=2*d+u,p=n*2+r,_=i+1,g=new E,m=new E;for(let y=0;y<=p;y++){let b=0,v=0,A=0,T=0;if(y<=n){let R=y/n,D=R*Math.PI/2;v=-h-e*Math.cos(D),A=e*Math.sin(D),T=-e*Math.cos(D),b=R*d}else if(y<=n+r){let R=(y-n)/r;v=-h+R*t,A=e,T=0,b=d+R*u}else{let R=(y-n-r)/n,D=R*Math.PI/2;v=h+e*Math.sin(D),A=e*Math.cos(D),T=e*Math.sin(D),b=d+u+R*d}let L=Math.max(0,Math.min(1,b/f)),S=0;y===0?S=.5/i:y===p&&(S=-.5/i);for(let R=0;R<=i;R++){let D=R/i,O=D*Math.PI*2,k=Math.sin(O),q=Math.cos(O);m.x=-A*q,m.y=v,m.z=A*k,a.push(m.x,m.y,m.z),g.set(-A*q,T,A*k),g.normalize(),l.push(g.x,g.y,g.z),c.push(D+S,L)}if(y>0){let R=(y-1)*_;for(let D=0;D<i;D++){let O=R+D,k=R+D+1,q=y*_+D,U=y*_+D+1;o.push(O,k,q),o.push(k,U,q)}}}this.setIndex(o),this.setAttribute("position",new ze(a,3)),this.setAttribute("normal",new ze(l,3)),this.setAttribute("uv",new ze(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Ts=class s extends _t{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],o=[],a=[],l=[],c=new E,h=new le;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let f=n+d/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[u]/e+1)/2,h.y=(o[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ze(o,3)),this.setAttribute("normal",new ze(a,3)),this.setAttribute("uv",new ze(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Zt=class s extends _t{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],d=[],u=[],f=[],p=0,_=[],g=n/2,m=0;y(),o===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new ze(d,3)),this.setAttribute("normal",new ze(u,3)),this.setAttribute("uv",new ze(f,2));function y(){let v=new E,A=new E,T=0,L=(t-e)/n;for(let S=0;S<=r;S++){let R=[],D=S/r,O=D*(t-e)+e;for(let k=0;k<=i;k++){let q=k/i,U=q*l+a,B=Math.sin(U),z=Math.cos(U);A.x=O*B,A.y=-D*n+g,A.z=O*z,d.push(A.x,A.y,A.z),v.set(B,L,z).normalize(),u.push(v.x,v.y,v.z),f.push(q,1-D),R.push(p++)}_.push(R)}for(let S=0;S<i;S++)for(let R=0;R<r;R++){let D=_[R][S],O=_[R+1][S],k=_[R+1][S+1],q=_[R][S+1];(e>0||R!==0)&&(h.push(D,O,q),T+=3),(t>0||R!==r-1)&&(h.push(O,k,q),T+=3)}c.addGroup(m,T,0),m+=T}function b(v){let A=p,T=new le,L=new E,S=0,R=v===!0?e:t,D=v===!0?1:-1;for(let k=1;k<=i;k++)d.push(0,g*D,0),u.push(0,D,0),f.push(.5,.5),p++;let O=p;for(let k=0;k<=i;k++){let U=k/i*l+a,B=Math.cos(U),z=Math.sin(U);L.x=R*z,L.y=g*D,L.z=R*B,d.push(L.x,L.y,L.z),u.push(0,D,0),T.x=B*.5+.5,T.y=z*.5*D+.5,f.push(T.x,T.y),p++}for(let k=0;k<i;k++){let q=A+k,U=O+k;v===!0?h.push(U,U+1,q):h.push(U+1,U,q),S+=3}c.addGroup(m,S,v===!0?1:2),m+=S}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},qo=class s extends Zt{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},As=class s extends _t{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new ze(r,3)),this.setAttribute("normal",new ze(r.slice(),3)),this.setAttribute("uv",new ze(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(y){let b=new E,v=new E,A=new E;for(let T=0;T<t.length;T+=3)f(t[T+0],b),f(t[T+1],v),f(t[T+2],A),l(b,v,A,y)}function l(y,b,v,A){let T=A+1,L=[];for(let S=0;S<=T;S++){L[S]=[];let R=y.clone().lerp(v,S/T),D=b.clone().lerp(v,S/T),O=T-S;for(let k=0;k<=O;k++)k===0&&S===T?L[S][k]=R:L[S][k]=R.clone().lerp(D,k/O)}for(let S=0;S<T;S++)for(let R=0;R<2*(T-S)-1;R++){let D=Math.floor(R/2);R%2===0?(u(L[S][D+1]),u(L[S+1][D]),u(L[S][D])):(u(L[S][D+1]),u(L[S+1][D+1]),u(L[S+1][D]))}}function c(y){let b=new E;for(let v=0;v<r.length;v+=3)b.x=r[v+0],b.y=r[v+1],b.z=r[v+2],b.normalize().multiplyScalar(y),r[v+0]=b.x,r[v+1]=b.y,r[v+2]=b.z}function h(){let y=new E;for(let b=0;b<r.length;b+=3){y.x=r[b+0],y.y=r[b+1],y.z=r[b+2];let v=g(y)/2/Math.PI+.5,A=m(y)/Math.PI+.5;o.push(v,1-A)}p(),d()}function d(){for(let y=0;y<o.length;y+=6){let b=o[y+0],v=o[y+2],A=o[y+4],T=Math.max(b,v,A),L=Math.min(b,v,A);T>.9&&L<.1&&(b<.2&&(o[y+0]+=1),v<.2&&(o[y+2]+=1),A<.2&&(o[y+4]+=1))}}function u(y){r.push(y.x,y.y,y.z)}function f(y,b){let v=y*3;b.x=e[v+0],b.y=e[v+1],b.z=e[v+2]}function p(){let y=new E,b=new E,v=new E,A=new E,T=new le,L=new le,S=new le;for(let R=0,D=0;R<r.length;R+=9,D+=6){y.set(r[R+0],r[R+1],r[R+2]),b.set(r[R+3],r[R+4],r[R+5]),v.set(r[R+6],r[R+7],r[R+8]),T.set(o[D+0],o[D+1]),L.set(o[D+2],o[D+3]),S.set(o[D+4],o[D+5]),A.copy(y).add(b).add(v).divideScalar(3);let O=g(A);_(T,D+0,y,O),_(L,D+2,b,O),_(S,D+4,v,O)}}function _(y,b,v,A){A<0&&y.x===1&&(o[b]=y.x-1),v.x===0&&v.z===0&&(o[b]=A/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.detail)}},Rl=class s extends As{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},Fh=new E,Oh=new E,mf=new E,Bh=new Fi,Ur=class extends _t{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),r=Math.cos(wr*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let p=0;p<l;p+=3){o?(c[0]=o.getX(p),c[1]=o.getX(p+1),c[2]=o.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);let{a:_,b:g,c:m}=Bh;if(_.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),Bh.getNormal(mf),d[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,d[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,d[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let y=0;y<3;y++){let b=(y+1)%3,v=d[y],A=d[b],T=Bh[h[y]],L=Bh[h[b]],S=`${v}_${A}`,R=`${A}_${v}`;R in u&&u[R]?(mf.dot(u[R].normal)<=r&&(f.push(T.x,T.y,T.z),f.push(L.x,L.y,L.z)),u[R]=null):S in u||(u[S]={index0:c[y],index1:c[b],normal:mf.clone()})}}for(let p in u)if(u[p]){let{index0:_,index1:g}=u[p];Fh.fromBufferAttribute(a,_),Oh.fromBufferAttribute(a,g),f.push(Fh.x,Fh.y,Fh.z),f.push(Oh.x,Oh.y,Oh.z)}this.setAttribute("position",new ze(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},ai=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Pe("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new le:new E);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new E,i=[],r=[],o=[],a=new E,l=new ut;for(let f=0;f<=e;f++){let p=f/e;i[f]=this.getTangentAt(p,new E)}r[0]=new E,o[0]=new E;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(ft(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(ft(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Fr=class extends ai{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new le){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Cl=class extends Fr{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function bp(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,d){let u=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+d)+(l-a)/d;u*=h,f*=h,i(o,a,u,f)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}var Zm=new E,Jm=new E,gf=new bp,_f=new bp,xf=new bp,Hi=class extends ai{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new E){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Jm.subVectors(i[0],i[1]).add(i[0]),c=Jm);let d=i[a%r],u=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Zm.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Zm),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),gf.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,p,_,g),_f.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,p,_,g),xf.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(gf.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),_f.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),xf.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(gf.calc(l),_f.calc(l),xf.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new E().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Km(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function Ax(s,e){let t=1-s;return t*t*e}function Rx(s,e){return 2*(1-s)*s*e}function Cx(s,e){return s*s*e}function sl(s,e,t,n){return Ax(s,e)+Rx(s,t)+Cx(s,n)}function Px(s,e){let t=1-s;return t*t*t*e}function Ix(s,e){let t=1-s;return 3*t*t*s*e}function Lx(s,e){return 3*(1-s)*s*s*e}function Dx(s,e){return s*s*s*e}function rl(s,e,t,n,i){return Px(s,e)+Ix(s,t)+Lx(s,n)+Dx(s,i)}var Zo=class extends ai{constructor(e=new le,t=new le,n=new le,i=new le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new le){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(rl(e,i.x,r.x,o.x,a.x),rl(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Qs=class extends ai{constructor(e=new E,t=new E,n=new E,i=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new E){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(rl(e,i.x,r.x,o.x,a.x),rl(e,i.y,r.y,o.y,a.y),rl(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Jo=class extends ai{constructor(e=new le,t=new le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new le){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ts=class extends ai{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ko=class extends ai{constructor(e=new le,t=new le,n=new le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new le){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(sl(e,i.x,r.x,o.x),sl(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},er=class extends ai{constructor(e=new E,t=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new E){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(sl(e,i.x,r.x,o.x),sl(e,i.y,r.y,o.y),sl(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},$o=class extends ai{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new le){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(Km(a,l.x,c.x,h.x,d.x),Km(a,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new le().fromArray(i))}return this}},mu=Object.freeze({__proto__:null,ArcCurve:Cl,CatmullRomCurve3:Hi,CubicBezierCurve:Zo,CubicBezierCurve3:Qs,EllipseCurve:Fr,LineCurve:Jo,LineCurve3:ts,QuadraticBezierCurve:Ko,QuadraticBezierCurve3:er,SplineCurve:$o}),tr=class extends ai{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new mu[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new mu[i.type]().fromJSON(i))}return this}},nr=class extends tr{constructor(e){super(),this.type="Path",this.currentPoint=new le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Jo(this.currentPoint.clone(),new le(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new Ko(this.currentPoint.clone(),new le(e,t),new le(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){let a=new Zo(this.currentPoint.clone(),new le(e,t),new le(n,i),new le(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new $o(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){let c=new Fr(e,t,n,i,r,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Ei=class extends nr{constructor(e){super(e),this.uuid=di(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new nr().fromJSON(i))}return this}};function Nx(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=E0(s,0,i,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=zx(s,e,r,t)),s.length>80*t){a=s[0],l=s[1];let h=a,d=l;for(let u=t;u<i;u+=t){let f=s[u],p=s[u+1];f<a&&(a=f),p<l&&(l=p),f>h&&(h=f),p>d&&(d=p)}c=Math.max(h-a,d-l),c=c!==0?32767/c:0}return Pl(r,o,t,a,l,c,0),o}function E0(s,e,t,n,i){let r;if(i===Kx(s,e,t,n)>0)for(let o=e;o<t;o+=n)r=$m(o/n|0,s[o],s[o+1],r);else for(let o=t-n;o>=e;o-=n)r=$m(o/n|0,s[o],s[o+1],r);return r&&jo(r,r.next)&&(Ll(r),r=r.next),r}function Or(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(jo(t,t.next)||ln(t.prev,t,t.next)===0)){if(Ll(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Pl(s,e,t,n,i,r,o){if(!s)return;!o&&r&&Wx(s,n,i,r);let a=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?Fx(s,n,i,r):Ux(s)){e.push(l.i,s.i,c.i),Ll(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=Ox(Or(s),e),Pl(s,e,t,n,i,r,2)):o===2&&Bx(s,e,t,n,i,r):Pl(Or(s),e,t,n,i,r,1);break}}}function Ux(s){let e=s.prev,t=s,n=s.next;if(ln(e,t,n)>=0)return!1;let i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(i,r,o),d=Math.min(a,l,c),u=Math.max(i,r,o),f=Math.max(a,l,c),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=u&&p.y>=d&&p.y<=f&&el(i,a,r,l,o,c,p.x,p.y)&&ln(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Fx(s,e,t,n){let i=s.prev,r=s,o=s.next;if(ln(i,r,o)>=0)return!1;let a=i.x,l=r.x,c=o.x,h=i.y,d=r.y,u=o.y,f=Math.min(a,l,c),p=Math.min(h,d,u),_=Math.max(a,l,c),g=Math.max(h,d,u),m=Rf(f,p,e,t,n),y=Rf(_,g,e,t,n),b=s.prevZ,v=s.nextZ;for(;b&&b.z>=m&&v&&v.z<=y;){if(b.x>=f&&b.x<=_&&b.y>=p&&b.y<=g&&b!==i&&b!==o&&el(a,h,l,d,c,u,b.x,b.y)&&ln(b.prev,b,b.next)>=0||(b=b.prevZ,v.x>=f&&v.x<=_&&v.y>=p&&v.y<=g&&v!==i&&v!==o&&el(a,h,l,d,c,u,v.x,v.y)&&ln(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;b&&b.z>=m;){if(b.x>=f&&b.x<=_&&b.y>=p&&b.y<=g&&b!==i&&b!==o&&el(a,h,l,d,c,u,b.x,b.y)&&ln(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;v&&v.z<=y;){if(v.x>=f&&v.x<=_&&v.y>=p&&v.y<=g&&v!==i&&v!==o&&el(a,h,l,d,c,u,v.x,v.y)&&ln(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function Ox(s,e){let t=s;do{let n=t.prev,i=t.next.next;!jo(n,i)&&T0(n,t,t.next,i)&&Il(n,i)&&Il(i,n)&&(e.push(n.i,t.i,i.i),Ll(t),Ll(t.next),t=s=i),t=t.next}while(t!==s);return Or(t)}function Bx(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&qx(o,a)){let l=A0(o,a);o=Or(o,o.next),l=Or(l,l.next),Pl(o,e,t,n,i,r,0),Pl(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function zx(s,e,t,n){let i=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=E0(s,a,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Yx(c))}i.sort(Vx);for(let r=0;r<i.length;r++)t=Hx(i[r],t);return t}function Vx(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Hx(s,e){let t=kx(s,e);if(!t)return e;let n=A0(t,s);return Or(n,n.next),Or(t,t.next)}function kx(s,e){let t=e,n=s.x,i=s.y,r=-1/0,o;if(jo(s,t))return t;do{if(jo(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let d=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,o=t.x<t.next.x?t:t.next,d===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&w0(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)){let d=Math.abs(i-t.y)/(n-t.x);Il(t,s)&&(d<h||d===h&&(t.x>o.x||t.x===o.x&&Gx(o,t)))&&(o=t,h=d)}t=t.next}while(t!==a);return o}function Gx(s,e){return ln(s.prev,s,e.prev)<0&&ln(e.next,s,s.next)<0}function Wx(s,e,t,n){let i=s;do i.z===0&&(i.z=Rf(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,Xx(i)}function Xx(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,t*=2}while(e>1);return s}function Rf(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Yx(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function w0(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function el(s,e,t,n,i,r,o,a){return!(s===o&&e===a)&&w0(s,e,t,n,i,r,o,a)}function qx(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Zx(s,e)&&(Il(s,e)&&Il(e,s)&&Jx(s,e)&&(ln(s.prev,s,e.prev)||ln(s,e.prev,e))||jo(s,e)&&ln(s.prev,s,s.next)>0&&ln(e.prev,e,e.next)>0)}function ln(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function jo(s,e){return s.x===e.x&&s.y===e.y}function T0(s,e,t,n){let i=Vh(ln(s,e,t)),r=Vh(ln(s,e,n)),o=Vh(ln(t,n,s)),a=Vh(ln(t,n,e));return!!(i!==r&&o!==a||i===0&&zh(s,t,e)||r===0&&zh(s,n,e)||o===0&&zh(t,s,n)||a===0&&zh(t,e,n))}function zh(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Vh(s){return s>0?1:s<0?-1:0}function Zx(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&T0(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function Il(s,e){return ln(s.prev,s,s.next)<0?ln(s,e,s.next)>=0&&ln(s,s.prev,e)>=0:ln(s,e,s.prev)<0||ln(s,s.next,e)<0}function Jx(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function A0(s,e){let t=Cf(s.i,s.x,s.y),n=Cf(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function $m(s,e,t,n){let i=Cf(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Ll(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Cf(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Kx(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var Pf=class{static triangulate(e,t,n=2){return Nx(e,t,n)}},Mi=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];jm(e),Qm(n,e);let o=e.length;t.forEach(jm);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,Qm(n,t[l]);let a=Pf.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function jm(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Qm(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var Rs=class s extends _t{constructor(e=new Ei([new le(.5,.5),new le(-.5,.5),new le(-.5,-.5),new le(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],r=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new ze(i,3)),this.setAttribute("uv",new ze(r,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:$x,b,v=!1,A,T,L,S;if(m){b=m.getSpacedPoints(h),v=!0,u=!1;let ce=m.isCatmullRomCurve3?m.closed:!1;A=m.computeFrenetFrames(h,ce),T=new E,L=new E,S=new E}u||(g=0,f=0,p=0,_=0);let R=a.extractPoints(c),D=R.shape,O=R.holes;if(!Mi.isClockWise(D)){D=D.reverse();for(let ce=0,pe=O.length;ce<pe;ce++){let _e=O[ce];Mi.isClockWise(_e)&&(O[ce]=_e.reverse())}}function q(ce){let _e=10000000000000001e-36,xe=ce[0];for(let Ee=1;Ee<=ce.length;Ee++){let ot=Ee%ce.length,it=ce[ot],lt=it.x-xe.x,dt=it.y-xe.y,F=lt*lt+dt*dt,Pt=Math.max(Math.abs(it.x),Math.abs(it.y),Math.abs(xe.x),Math.abs(xe.y)),vt=_e*Pt*Pt;if(F<=vt){ce.splice(ot,1),Ee--;continue}xe=it}}q(D),O.forEach(q);let U=O.length,B=D;for(let ce=0;ce<U;ce++){let pe=O[ce];D=D.concat(pe)}function z(ce,pe,_e){return pe||je("ExtrudeGeometry: vec does not exist"),ce.clone().addScaledVector(pe,_e)}let G=D.length;function se(ce,pe,_e){let xe,Ee,ot,it=ce.x-pe.x,lt=ce.y-pe.y,dt=_e.x-ce.x,F=_e.y-ce.y,Pt=it*it+lt*lt,vt=it*F-lt*dt;if(Math.abs(vt)>Number.EPSILON){let I=Math.sqrt(Pt),M=Math.sqrt(dt*dt+F*F),X=pe.x-lt/I,J=pe.y+it/I,ie=_e.x-F/M,ve=_e.y+dt/M,we=((ie-X)*F-(ve-J)*dt)/(it*F-lt*dt);xe=X+it*we-ce.x,Ee=J+lt*we-ce.y;let re=xe*xe+Ee*Ee;if(re<=2)return new le(xe,Ee);ot=Math.sqrt(re/2)}else{let I=!1;it>Number.EPSILON?dt>Number.EPSILON&&(I=!0):it<-Number.EPSILON?dt<-Number.EPSILON&&(I=!0):Math.sign(lt)===Math.sign(F)&&(I=!0),I?(xe=-lt,Ee=it,ot=Math.sqrt(Pt)):(xe=it,Ee=lt,ot=Math.sqrt(Pt/2))}return new le(xe/ot,Ee/ot)}let Y=[];for(let ce=0,pe=B.length,_e=pe-1,xe=ce+1;ce<pe;ce++,_e++,xe++)_e===pe&&(_e=0),xe===pe&&(xe=0),Y[ce]=se(B[ce],B[_e],B[xe]);let ee=[],ae,ke=Y.concat();for(let ce=0,pe=U;ce<pe;ce++){let _e=O[ce];ae=[];for(let xe=0,Ee=_e.length,ot=Ee-1,it=xe+1;xe<Ee;xe++,ot++,it++)ot===Ee&&(ot=0),it===Ee&&(it=0),ae[xe]=se(_e[xe],_e[ot],_e[it]);ee.push(ae),ke=ke.concat(ae)}let Be;if(g===0)Be=Mi.triangulateShape(B,O);else{let ce=[],pe=[];for(let _e=0;_e<g;_e++){let xe=_e/g,Ee=f*Math.cos(xe*Math.PI/2),ot=p*Math.sin(xe*Math.PI/2)+_;for(let it=0,lt=B.length;it<lt;it++){let dt=z(B[it],Y[it],ot);Te(dt.x,dt.y,-Ee),xe===0&&ce.push(dt)}for(let it=0,lt=U;it<lt;it++){let dt=O[it];ae=ee[it];let F=[];for(let Pt=0,vt=dt.length;Pt<vt;Pt++){let I=z(dt[Pt],ae[Pt],ot);Te(I.x,I.y,-Ee),xe===0&&F.push(I)}xe===0&&pe.push(F)}}Be=Mi.triangulateShape(ce,pe)}let Dt=Be.length,Qe=p+_;for(let ce=0;ce<G;ce++){let pe=u?z(D[ce],ke[ce],Qe):D[ce];v?(L.copy(A.normals[0]).multiplyScalar(pe.x),T.copy(A.binormals[0]).multiplyScalar(pe.y),S.copy(b[0]).add(L).add(T),Te(S.x,S.y,S.z)):Te(pe.x,pe.y,0)}for(let ce=1;ce<=h;ce++)for(let pe=0;pe<G;pe++){let _e=u?z(D[pe],ke[pe],Qe):D[pe];v?(L.copy(A.normals[ce]).multiplyScalar(_e.x),T.copy(A.binormals[ce]).multiplyScalar(_e.y),S.copy(b[ce]).add(L).add(T),Te(S.x,S.y,S.z)):Te(_e.x,_e.y,d/h*ce)}for(let ce=g-1;ce>=0;ce--){let pe=ce/g,_e=f*Math.cos(pe*Math.PI/2),xe=p*Math.sin(pe*Math.PI/2)+_;for(let Ee=0,ot=B.length;Ee<ot;Ee++){let it=z(B[Ee],Y[Ee],xe);Te(it.x,it.y,d+_e)}for(let Ee=0,ot=O.length;Ee<ot;Ee++){let it=O[Ee];ae=ee[Ee];for(let lt=0,dt=it.length;lt<dt;lt++){let F=z(it[lt],ae[lt],xe);v?Te(F.x,F.y+b[h-1].y,b[h-1].x+_e):Te(F.x,F.y,d+_e)}}}yt(),Q();function yt(){let ce=i.length/3;if(u){let pe=0,_e=G*pe;for(let xe=0;xe<Dt;xe++){let Ee=Be[xe];Ze(Ee[2]+_e,Ee[1]+_e,Ee[0]+_e)}pe=h+g*2,_e=G*pe;for(let xe=0;xe<Dt;xe++){let Ee=Be[xe];Ze(Ee[0]+_e,Ee[1]+_e,Ee[2]+_e)}}else{for(let pe=0;pe<Dt;pe++){let _e=Be[pe];Ze(_e[2],_e[1],_e[0])}for(let pe=0;pe<Dt;pe++){let _e=Be[pe];Ze(_e[0]+G*h,_e[1]+G*h,_e[2]+G*h)}}n.addGroup(ce,i.length/3-ce,0)}function Q(){let ce=i.length/3,pe=0;ne(B,pe),pe+=B.length;for(let _e=0,xe=O.length;_e<xe;_e++){let Ee=O[_e];ne(Ee,pe),pe+=Ee.length}n.addGroup(ce,i.length/3-ce,1)}function ne(ce,pe){let _e=ce.length;for(;--_e>=0;){let xe=_e,Ee=_e-1;Ee<0&&(Ee=ce.length-1);for(let ot=0,it=h+g*2;ot<it;ot++){let lt=G*ot,dt=G*(ot+1),F=pe+xe+lt,Pt=pe+Ee+lt,vt=pe+Ee+dt,I=pe+xe+dt;Ge(F,Pt,vt,I)}}}function Te(ce,pe,_e){l.push(ce),l.push(pe),l.push(_e)}function Ze(ce,pe,_e){ct(ce),ct(pe),ct(_e);let xe=i.length/3,Ee=y.generateTopUV(n,i,xe-3,xe-2,xe-1);kt(Ee[0]),kt(Ee[1]),kt(Ee[2])}function Ge(ce,pe,_e,xe){ct(ce),ct(pe),ct(xe),ct(pe),ct(_e),ct(xe);let Ee=i.length/3,ot=y.generateSideWallUV(n,i,Ee-6,Ee-3,Ee-2,Ee-1);kt(ot[0]),kt(ot[1]),kt(ot[3]),kt(ot[1]),kt(ot[2]),kt(ot[3])}function ct(ce){i.push(l[ce*3+0]),i.push(l[ce*3+1]),i.push(l[ce*3+2])}function kt(ce){r.push(ce.x),r.push(ce.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return jx(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new mu[i.type]().fromJSON(i)),new s(n,e.options)}},$x={generateTopUV:function(s,e,t,n,i){let r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new le(r,o),new le(a,l),new le(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],d=e[n*3+2],u=e[i*3],f=e[i*3+1],p=e[i*3+2],_=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new le(o,1-l),new le(c,1-d),new le(u,1-p),new le(_,1-m)]:[new le(a,1-l),new le(h,1-d),new le(f,1-p),new le(g,1-m)]}};function jx(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Dl=class s extends As{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},Br=class s extends _t{constructor(e=[new le(0,-.5),new le(.5,0),new le(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ft(i,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],h=1/t,d=new E,u=new le,f=new E,p=new E,_=new E,g=0,m=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:g=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,f.x=m*1,f.y=-g,f.z=m*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:g=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(p)}for(let y=0;y<=t;y++){let b=n+y*h*i,v=Math.sin(b),A=Math.cos(b);for(let T=0;T<=e.length-1;T++){d.x=e[T].x*v,d.y=e[T].y,d.z=e[T].x*A,o.push(d.x,d.y,d.z),u.x=y/t,u.y=T/(e.length-1),a.push(u.x,u.y);let L=l[3*T+0]*v,S=l[3*T+1],R=l[3*T+0]*A;c.push(L,S,R)}}for(let y=0;y<t;y++)for(let b=0;b<e.length-1;b++){let v=b+y*e.length,A=v,T=v+e.length,L=v+e.length+1,S=v+1;r.push(A,T,S),r.push(L,S,T)}this.setIndex(r),this.setAttribute("position",new ze(o,3)),this.setAttribute("uv",new ze(a,2)),this.setAttribute("normal",new ze(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}},Qo=class s extends As{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},fi=class s extends _t{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=e/a,u=t/l,f=[],p=[],_=[],g=[];for(let m=0;m<h;m++){let y=m*u-o;for(let b=0;b<c;b++){let v=b*d-r;p.push(v,-y,0),_.push(0,0,1),g.push(b/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<a;y++){let b=y+c*m,v=y+c*(m+1),A=y+1+c*(m+1),T=y+1+c*m;f.push(b,v,T),f.push(v,A,T)}this.setIndex(f),this.setAttribute("position",new ze(p,3)),this.setAttribute("normal",new ze(_,3)),this.setAttribute("uv",new ze(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},Nl=class s extends _t{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],l=[],c=[],h=[],d=e,u=(t-e)/i,f=new E,p=new le;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){let m=r+g/n*o;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}d+=u}for(let _=0;_<i;_++){let g=_*(n+1);for(let m=0;m<n;m++){let y=m+g,b=y,v=y+n+1,A=y+n+2,T=y+1;a.push(b,v,T),a.push(v,A,T)}}this.setIndex(a),this.setAttribute("position",new ze(l,3)),this.setAttribute("normal",new ze(c,3)),this.setAttribute("uv",new ze(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Ul=class s extends _t{constructor(e=new Ei([new le(0,.5),new le(-.5,-.5),new le(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new ze(i,3)),this.setAttribute("normal",new ze(r,3)),this.setAttribute("uv",new ze(o,2));function c(h){let d=i.length/3,u=h.extractPoints(t),f=u.shape,p=u.holes;Mi.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){let y=p[g];Mi.isClockWise(y)===!0&&(p[g]=y.reverse())}let _=Mi.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){let y=p[g];f=f.concat(y)}for(let g=0,m=f.length;g<m;g++){let y=f[g];i.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let g=0,m=_.length;g<m;g++){let y=_[g],b=y[0]+d,v=y[1]+d,A=y[2]+d;n.push(b,v,A),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Qx(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let o=t[e.shapes[i]];n.push(o)}return new s(n,e.curveSegments)}};function Qx(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}var pi=class s extends _t{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],d=new E,u=new E,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){let y=[],b=m/n,v=o+b*a,A=e*Math.cos(v),T=Math.sqrt(e*e-A*A),L=0;m===0&&o===0?L=.5/t:m===n&&l===Math.PI&&(L=-.5/t);for(let S=0;S<=t;S++){let R=S/t,D=i+R*r;d.x=-T*Math.cos(D),d.y=A,d.z=T*Math.sin(D),p.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),g.push(R+L,1-b),y.push(c++)}h.push(y)}for(let m=0;m<n;m++)for(let y=0;y<t;y++){let b=h[m][y+1],v=h[m][y],A=h[m+1][y],T=h[m+1][y+1];(m!==0||o>0)&&f.push(b,v,T),(m!==n-1||l<Math.PI)&&f.push(v,A,T)}this.setIndex(f),this.setAttribute("position",new ze(p,3)),this.setAttribute("normal",new ze(_,3)),this.setAttribute("uv",new ze(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Fl=class s extends As{constructor(e=1,t=0){let n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},ki=class s extends _t{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),i=Math.floor(i);let l=[],c=[],h=[],d=[],u=new E,f=new E,p=new E;for(let _=0;_<=n;_++){let g=o+_/n*a;for(let m=0;m<=i;m++){let y=m/i*r;f.x=(e+t*Math.cos(g))*Math.cos(y),f.y=(e+t*Math.cos(g))*Math.sin(y),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),u.x=e*Math.cos(y),u.y=e*Math.sin(y),p.subVectors(f,u).normalize(),h.push(p.x,p.y,p.z),d.push(m/i),d.push(_/n)}}for(let _=1;_<=n;_++)for(let g=1;g<=i;g++){let m=(i+1)*_+g-1,y=(i+1)*(_-1)+g-1,b=(i+1)*(_-1)+g,v=(i+1)*_+g;l.push(m,y,v),l.push(y,b,v)}this.setIndex(l),this.setAttribute("position",new ze(c,3)),this.setAttribute("normal",new ze(h,3)),this.setAttribute("uv",new ze(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}},Ol=class s extends _t{constructor(e=1,t=.4,n=64,i=8,r=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:r,q:o},n=Math.floor(n),i=Math.floor(i);let a=[],l=[],c=[],h=[],d=new E,u=new E,f=new E,p=new E,_=new E,g=new E,m=new E;for(let b=0;b<=n;++b){let v=b/n*r*Math.PI*2;y(v,r,o,e,f),y(v+.01,r,o,e,p),g.subVectors(p,f),m.addVectors(p,f),_.crossVectors(g,m),m.crossVectors(_,g),_.normalize(),m.normalize();for(let A=0;A<=i;++A){let T=A/i*Math.PI*2,L=-t*Math.cos(T),S=t*Math.sin(T);d.x=f.x+(L*m.x+S*_.x),d.y=f.y+(L*m.y+S*_.y),d.z=f.z+(L*m.z+S*_.z),l.push(d.x,d.y,d.z),u.subVectors(d,f).normalize(),c.push(u.x,u.y,u.z),h.push(b/n),h.push(A/i)}}for(let b=1;b<=n;b++)for(let v=1;v<=i;v++){let A=(i+1)*(b-1)+(v-1),T=(i+1)*b+(v-1),L=(i+1)*b+v,S=(i+1)*(b-1)+v;a.push(A,T,S),a.push(T,L,S)}this.setIndex(a),this.setAttribute("position",new ze(l,3)),this.setAttribute("normal",new ze(c,3)),this.setAttribute("uv",new ze(h,2));function y(b,v,A,T,L){let S=Math.cos(b),R=Math.sin(b),D=A/v*b,O=Math.cos(D);L.x=T*(2+O)*.5*S,L.y=T*(2+O)*R*.5,L.z=T*Math.sin(D)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},wi=class s extends _t{constructor(e=new er(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new E,l=new E,c=new le,h=new E,d=[],u=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new ze(d,3)),this.setAttribute("normal",new ze(u,3)),this.setAttribute("uv",new ze(f,2));function _(){for(let b=0;b<t;b++)g(b);g(r===!1?t:0),y(),m()}function g(b){h=e.getPointAt(b/t,h);let v=o.normals[b],A=o.binormals[b];for(let T=0;T<=i;T++){let L=T/i*Math.PI*2,S=Math.sin(L),R=-Math.cos(L);l.x=R*v.x+S*A.x,l.y=R*v.y+S*A.y,l.z=R*v.z+S*A.z,l.normalize(),u.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,d.push(a.x,a.y,a.z)}}function m(){for(let b=1;b<=t;b++)for(let v=1;v<=i;v++){let A=(i+1)*(b-1)+(v-1),T=(i+1)*b+(v-1),L=(i+1)*b+v,S=(i+1)*(b-1)+v;p.push(A,T,S),p.push(T,L,S)}}function y(){for(let b=0;b<=t;b++)for(let v=0;v<=i;v++)c.x=b/t,c.y=v/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new mu[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},zr=class extends _t{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new E,r=new E;if(e.index!==null){let o=e.attributes.position,a=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let d=l[c],u=d.start,f=d.count;for(let p=u,_=u+f;p<_;p+=3)for(let g=0;g<3;g++){let m=a.getX(p+g),y=a.getX(p+(g+1)%3);i.fromBufferAttribute(o,m),r.fromBufferAttribute(o,y),eg(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}}else{let o=e.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){let h=3*a+c,d=3*a+(c+1)%3;i.fromBufferAttribute(o,h),r.fromBufferAttribute(o,d),eg(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new ze(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function eg(s,e,t){let n=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var tg=Object.freeze({__proto__:null,BoxGeometry:In,CapsuleGeometry:Al,CircleGeometry:Ts,ConeGeometry:qo,CylinderGeometry:Zt,DodecahedronGeometry:Rl,EdgesGeometry:Ur,ExtrudeGeometry:Rs,IcosahedronGeometry:Dl,LatheGeometry:Br,OctahedronGeometry:Qo,PlaneGeometry:fi,PolyhedronGeometry:As,RingGeometry:Nl,ShapeGeometry:Ul,SphereGeometry:pi,TetrahedronGeometry:Fl,TorusGeometry:ki,TorusKnotGeometry:Ol,TubeGeometry:wi,WireframeGeometry:zr}),Bl=class extends vn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Oe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};function to(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(ng(i))i.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(ng(i[0])){let r=[];for(let o=0,a=i.length;o<a;o++)r[o]=i[o].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Xn(s){let e={};for(let t=0;t<s.length;t++){let n=to(s[t]);for(let i in n)e[i]=n[i]}return e}function ng(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function ey(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Ep(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ct.workingColorSpace}var Aa={clone:to,merge:Xn},ty=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ny=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ln=class extends vn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ty,this.fragmentShader=ny,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=to(e.uniforms),this.uniformsGroups=ey(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new Oe().setHex(i.value);break;case"v2":this.uniforms[n].value=new le().fromArray(i.value);break;case"v3":this.uniforms[n].value=new E().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Ut().fromArray(i.value);break;case"m3":this.uniforms[n].value=new mt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new ut().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ea=class extends Ln{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},at=class extends vn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ss,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ir=class extends at{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new le(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ft(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Oe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Oe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Oe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},zl=class extends vn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Oe(16777215),this.specular=new Oe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ss,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.combine=ma,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Vl=class extends vn{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Oe(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ss,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Hl=class extends vn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ss,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},Vr=class extends vn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ss,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bi,this.combine=ma,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ta=class extends vn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=dp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},na=class extends vn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},kl=class extends vn{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Oe(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ss,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}},Gl=class extends Sn{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function Ui(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function ol(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function R0(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function If(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function C0(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}function iy(s,e,t,n,i=30){let r=s.clone();r.name=e;let o=[];for(let l=0;l<r.tracks.length;++l){let c=r.tracks[l],h=c.getValueSize(),d=[],u=[];for(let f=0;f<c.times.length;++f){let p=c.times[f]*i;if(!(p<t||p>=n)){d.push(c.times[f]);for(let _=0;_<h;++_)u.push(c.values[f*h+_])}}d.length!==0&&(c.times=Ui(d,c.times.constructor),c.values=Ui(u,c.values.constructor),o.push(c))}r.tracks=o;let a=1/0;for(let l=0;l<r.tracks.length;++l)a>r.tracks[l].times[0]&&(a=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*a);return r.resetDuration(),r}function sy(s,e=0,t=s,n=30){n<=0&&(n=30);let i=t.tracks.length,r=e/n;for(let o=0;o<i;++o){let a=t.tracks[o],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;let c=s.tracks.find(function(m){return m.name===a.name&&m.ValueTypeName===l});if(c===void 0)continue;let h=0,d=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=d/3);let u=0,f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=f/3);let p=a.times.length-1,_;if(r<=a.times[0]){let m=h,y=d-h;_=a.values.slice(m,y)}else if(r>=a.times[p]){let m=p*d+h,y=m+d-h;_=a.values.slice(m,y)}else{let m=a.createInterpolant(),y=h,b=d-h;m.evaluate(r),_=m.resultBuffer.slice(y,b)}l==="quaternion"&&new gn().fromArray(_).normalize().conjugate().toArray(_);let g=c.times.length;for(let m=0;m<g;++m){let y=m*f+u;if(l==="quaternion")gn.multiplyQuaternionsFlat(c.values,y,_,0,c.values,y);else{let b=f-u*2;for(let v=0;v<b;++v)c.values[y+v]-=_[v]}}}return s.blendMode=_d,s}var gu=class{static convertArray(e,t){return Ui(e,t)}static isTypedArray(e){return g0(e)}static hasTangents(e){return ol(e)}static getKeyframeOrder(e){return R0(e)}static sortedArray(e,t,n){return If(e,t,n)}static flattenJSON(e,t,n,i){C0(e,t,n,i)}static subclip(e,t,n,i,r=30){return iy(e,t,n,i,r)}static makeClipAdditive(e,t=0,n=e,i=30){return sy(e,t,n,i)}},Cs=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Wl=class extends Cs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Xs,endingEnd:Xs}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ys:r=e,a=2*t-n;break;case Fo:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ys:o=e,l=2*n-t;break;case Fo:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),_=p*p,g=_*p,m=-u*g+2*u*_-u*p,y=(1+u)*g+(-1.5-2*u)*_+(-.5+u)*p+1,b=(-1-f)*g+(1.5+f)*_+.5*p,v=f*g-f*_;for(let A=0;A!==a;++A)r[A]=m*o[h+A]+y*o[c+A]+b*o[l+A]+v*o[d+A];return r}},ia=class extends Cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),d=1-h;for(let u=0;u!==a;++u)r[u]=o[c+u]*d+o[l+u]*h;return r}},Xl=class extends Cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Yl=class extends Cs{interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this.inTangents,d=this.outTangents;if(!h||!d){let p=(n-t)/(i-t),_=1-p;for(let g=0;g!==a;++g)r[g]=o[c+g]*_+o[l+g]*p;return r}let u=a*2,f=e-1;for(let p=0;p!==a;++p){let _=o[c+p],g=o[l+p],m=f*u+p*2,y=d[m],b=d[m+1],v=e*u+p*2,A=h[v],T=h[v+1],L=oy(n,t,y,A,i);r[p]=P0(L,_,b,T,g)}return r}};function P0(s,e,t,n,i){let r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*n+s*s*s*i}function ry(s,e,t,n,i){let r=1-s;return 3*r*r*(t-e)+6*r*s*(n-t)+3*s*s*(i-n)}function oy(s,e,t,n,i){let r=(s-e)/(i-e);for(let o=0;o<8;o++){let a=P0(r,e,t,n,i)-s;if(Math.abs(a)<1e-10)break;let l=ry(r,e,t,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var Qn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ui(t,this.TimeBufferType),this.values=Ui(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ui(e.times,Array),values:Ui(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),ol(e.settings)&&(n.settings={inTangents:Ui(e.settings.inTangents,Array),outTangents:Ui(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Xl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ia(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Wl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Yl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Uo:t=this.InterpolantFactoryMethodDiscrete;break;case pl:t=this.InterpolantFactoryMethodLinear;break;case tl:t=this.InterpolantFactoryMethodSmooth;break;case $h:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Pe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Uo;case this.InterpolantFactoryMethodLinear:return pl;case this.InterpolantFactoryMethodSmooth:return tl;case this.InterpolantFactoryMethodBezier:return $h}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;ol(this.settings)&&(ig(this.settings.inTangents,e),ig(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(je("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(je("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){je("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){je("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&g0(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){je("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===tl,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{let d=a*n,u=d-n,f=d+n;for(let p=0;p!==n;++p){let _=t[d+p];if(_!==t[u+p]||_!==t[f+p]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let d=a*n,u=o*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,ol(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function ig(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]*=e}Qn.prototype.ValueTypeName="";Qn.prototype.TimeBufferType=Float32Array;Qn.prototype.ValueBufferType=Float32Array;Qn.prototype.DefaultInterpolation=pl;var ns=class extends Qn{constructor(e,t,n){super(e,t,n)}};ns.prototype.ValueTypeName="bool";ns.prototype.ValueBufferType=Array;ns.prototype.DefaultInterpolation=Uo;ns.prototype.InterpolantFactoryMethodLinear=void 0;ns.prototype.InterpolantFactoryMethodSmooth=void 0;var sa=class extends Qn{constructor(e,t,n,i){super(e,t,n,i)}};sa.prototype.ValueTypeName="color";var Hr=class extends Qn{constructor(e,t,n,i){super(e,t,n,i)}};Hr.prototype.ValueTypeName="number";var ql=class extends Cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t),c=e*a;for(let h=c+a;c!==h;c+=4)gn.slerpFlat(r,0,o,c-a,o,c,l);return r}},kr=class extends Qn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new ql(this.times,this.values,this.getValueSize(),e)}};kr.prototype.ValueTypeName="quaternion";kr.prototype.InterpolantFactoryMethodSmooth=void 0;var is=class extends Qn{constructor(e,t,n){super(e,t,n)}};is.prototype.ValueTypeName="string";is.prototype.ValueBufferType=Array;is.prototype.DefaultInterpolation=Uo;is.prototype.InterpolantFactoryMethodLinear=void 0;is.prototype.InterpolantFactoryMethodSmooth=void 0;var ra=class extends Qn{constructor(e,t,n,i){super(e,t,n,i)}};ra.prototype.ValueTypeName="vector";var sr=class{constructor(e="",t=-1,n=[],i=Wc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=di(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(ly(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(Qn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=R0(l);l=If(l,1,h),c=If(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Hr(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],h=c.name.match(r);if(h&&h.length>1){let d=h[1],u=i[d];u||(i[d]=u=[]),u.push(c)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function ay(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Hr;case"vector":case"vector2":case"vector3":case"vector4":return ra;case"color":return sa;case"quaternion":return kr;case"bool":case"boolean":return ns;case"string":return is}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function ly(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=ay(s.type);if(s.times===void 0){let n=[],i=[];C0(s.keys,n,i,"value"),s.times=n,s.values=i}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),ol(s.settings)&&(t.settings={inTangents:Ui(s.settings.inTangents,Float32Array),outTangents:Ui(s.settings.outTangents,Float32Array)}),t}var Oi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(sg(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!sg(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function sg(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var oa=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},wp=new oa,Dn=class{constructor(e){this.manager=e!==void 0?e:wp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Dn.DEFAULT_MATERIAL_NAME="__DEFAULT";var ys={},Lf=class extends Error{constructor(e,t){super(e),this.response=t}},Ti=class extends Dn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Oi.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(ys[e]!==void 0){ys[e].push({onLoad:t,onProgress:n,onError:i});return}ys[e]=[],ys[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Pe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=ys[e],d=c.body.getReader(),u=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=u?parseInt(u):0,p=f!==0,_=0,g=new ReadableStream({start(m){y();function y(){d.read().then(({done:b,value:v})=>{if(b)m.close();else{_+=v.byteLength;let A=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let T=0,L=h.length;T<L;T++){let S=h[T];S.onProgress&&S.onProgress(A)}m.enqueue(v),y()}},b=>{m.error(b)})}}});return new Response(g)}else throw new Lf(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{let d=/charset="?([^;"\s]*)"?/i.exec(a),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{Oi.add(`file:${e}`,c);let h=ys[e];delete ys[e];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=ys[e];if(h===void 0)throw this.manager.itemError(e),c;delete ys[e];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},_u=class extends Dn{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new Ti(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):je(l),r.manager.itemError(e)}},n,i)}parse(e){let t=[];for(let n=0;n<e.length;n++){let i=sr.parse(e[n]);t.push(i)}return t}},xu=class extends Dn{constructor(e){super(e)}load(e,t,n,i){let r=this,o=[],a=new Nr,l=new Ti(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(r.withCredentials);let c=0;function h(d){l.load(e[d],function(u){let f=r.parse(u,!0);o[d]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(a.minFilter=jt),a.image=o,a.format=f.format,a.needsUpdate=!0,t&&t(a))},n,i)}if(Array.isArray(e))for(let d=0,u=e.length;d<u;++d)h(d);else l.load(e,function(d){let u=r.parse(d,!0);if(u.isCubemap){let f=u.mipmaps.length/u.mipmapCount;for(let p=0;p<f;p++){o[p]={mipmaps:[]};for(let _=0;_<u.mipmapCount;_++)o[p].mipmaps.push(u.mipmaps[p*u.mipmapCount+_]),o[p].format=u.format,o[p].width=u.width,o[p].height=u.height}a.image=o}else a.image.width=u.width,a.image.height=u.height,a.mipmaps=u.mipmaps;u.mipmapCount===1&&(a.minFilter=jt),a.format=u.format,a.needsUpdate=!0,t&&t(a)},n,i);return a}},Ao=new WeakMap,rr=class extends Dn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Oi.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let d=Ao.get(o);d===void 0&&(d=[],Ao.set(o,d)),d.push({onLoad:t,onError:i})}return o}let a=zo("img");function l(){h(),t&&t(this);let d=Ao.get(this)||[];for(let u=0;u<d.length;u++){let f=d[u];f.onLoad&&f.onLoad(this)}Ao.delete(this),r.manager.itemEnd(e)}function c(d){h(),i&&i(d),Oi.remove(`image:${e}`);let u=Ao.get(this)||[];for(let f=0;f<u.length;f++){let p=u[f];p.onError&&p.onError(d)}Ao.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Oi.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}},yu=class extends Dn{constructor(e){super(e)}load(e,t,n,i){let r=new $s;r.colorSpace=Rn;let o=new rr(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function l(c){o.load(e[c],function(h){r.images[c]=h,a++,a===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return r}},vu=class extends Dn{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new $n,a=new Ti(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(l){let c;try{c=r.parse(l)}catch(h){i!==void 0?i(h):je(h);return}r._applyTexData(o,c),t&&t(o,c)},n,i),o}createDataTexture(e){let t=new $n;return this._applyTexData(t,this.parse(e)),t}_applyTexData(e,t){t.image!==void 0?e.image=t.image:t.data!==void 0&&(e.image.width=t.width,e.image.height=t.height,e.image.data=t.data),e.wrapS=t.wrapS!==void 0?t.wrapS:Kn,e.wrapT=t.wrapT!==void 0?t.wrapT:Kn,e.magFilter=t.magFilter!==void 0?t.magFilter:jt,e.minFilter=t.minFilter!==void 0?t.minFilter:jt,e.anisotropy=t.anisotropy!==void 0?t.anisotropy:1,t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.mipmaps!==void 0&&(e.mipmaps=t.mipmaps,e.minFilter=Yi),t.mipmapCount===1&&(e.minFilter=jt),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),e.needsUpdate=!0}},Su=class extends Dn{constructor(e){super(e)}load(e,t,n,i){let r=new dn,o=new rr(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},Gi=class extends Ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Gr=class extends Gi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},yf=new ut,rg=new E,og=new E,Wr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.mapType=ei,this.map=null,this.mapPass=null,this.matrix=new ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new es,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new Ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;rg.setFromMatrixPosition(e.matrixWorld),t.position.copy(rg),og.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(og),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){yf.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(yf,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=i?i.z/r.x:1,a=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;e.coordinateSystem===Zs||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(yf)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Hh=new E,kh=new gn,ji=new E,Xr=class extends Ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=ri,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Hh,kh,ji),ji.x===1&&ji.y===1&&ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hh,kh,ji.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Hh,kh,ji),ji.x===1&&ji.y===1&&ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Hh,kh,ji.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Gs=new E,ag=new le,lg=new le,hn=class extends Xr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ar*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(wr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ar*2*Math.atan(Math.tan(wr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Gs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Gs.x,Gs.y).multiplyScalar(-e/Gs.z),Gs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Gs.x,Gs.y).multiplyScalar(-e/Gs.z)}getViewSize(e,t){return this.getViewBounds(e,ag,lg),t.subVectors(lg,ag)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(wr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Df=class extends Wr{constructor(){super(new hn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Ar*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Zl=class extends Gi{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ft.DEFAULT_UP),this.updateMatrix(),this.target=new Ft,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Df}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Nf=class extends Wr{constructor(){super(new hn(90,1,.5,500)),this.isPointLightShadow=!0}},Yr=class extends Gi{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Nf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},or=class extends Xr{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Uf=class extends Wr{constructor(){super(new or(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ar=class extends Gi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ft.DEFAULT_UP),this.updateMatrix(),this.target=new Ft,this.shadow=new Uf}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Jl=class extends Gi{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}},Kl=class extends Gi{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){let t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}},aa=class{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new E)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){let n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.282095),t.addScaledVector(o[1],.488603*i),t.addScaledVector(o[2],.488603*r),t.addScaledVector(o[3],.488603*n),t.addScaledVector(o[4],1.092548*(n*i)),t.addScaledVector(o[5],1.092548*(i*r)),t.addScaledVector(o[6],.315392*(3*r*r-1)),t.addScaledVector(o[7],1.092548*(n*r)),t.addScaledVector(o[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){let n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.886227),t.addScaledVector(o[1],2*.511664*i),t.addScaledVector(o[2],2*.511664*r),t.addScaledVector(o[3],2*.511664*n),t.addScaledVector(o[4],2*.429043*n*i),t.addScaledVector(o[5],2*.429043*i*r),t.addScaledVector(o[6],.743125*r*r-.247708),t.addScaledVector(o[7],2*.429043*n*r),t.addScaledVector(o[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){let n=e.x,i=e.y,r=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*r,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*n*r,t[8]=.546274*(n*n-i*i)}},$l=class extends Gi{constructor(e=new aa,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}toJSON(e){let t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}},cg={},jl=class s extends Dn{constructor(e){super(e),this.textures={}}load(e,t,n,i){let r=this,o=new Ti(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):je(l),r.manager.itemError(e)}},n,i)}parse(e){let t=this.createMaterialFromType(e.type);return t.fromJSON(e,this.textures),t}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return s.createMaterialFromType(e)}static createMaterialFromType(e){let n={ShadowMaterial:Bl,SpriteMaterial:Ks,RawShaderMaterial:ea,ShaderMaterial:Ln,PointsMaterial:Xo,MeshPhysicalMaterial:ir,MeshStandardMaterial:at,MeshPhongMaterial:zl,MeshToonMaterial:Vl,MeshNormalMaterial:Hl,MeshLambertMaterial:Vr,MeshDepthMaterial:ta,MeshDistanceMaterial:na,MeshBasicMaterial:Qt,MeshMatcapMaterial:kl,LineDashedMaterial:Gl,LineBasicMaterial:Sn,Material:vn,...cg}[e],i;return n===void 0?(Qi(`MaterialLoader: Unknown material type "${e}". Use .registerMaterial() before starting the deserialization process.`),i=new vn):i=new n,i}static registerMaterial(e,t){cg[e]=t}},la=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},qr=class extends _t{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},Ql=class extends Dn{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new Ti(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):je(l),r.manager.itemError(e)}},n,i)}parse(e){let t={},n={};function i(f,p){if(t[p]!==void 0)return t[p];let g=f.interleavedBuffers[p],m=r(f,g.buffer),y=Lo(g.type,m),b=new Lr(y,g.stride);return b.uuid=g.uuid,g.usage!==void 0&&b.setUsage(g.usage),t[p]=b,b}function r(f,p){if(n[p]!==void 0)return n[p];let g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}let o=e.isInstancedBufferGeometry?new qr:new _t,a=e.data.index;if(a!==void 0){let f=Lo(a.type,a.array);o.setIndex(new qt(f,1))}let l=e.data.attributes;for(let f in l){let p=l[f],_;if(p.isInterleavedBufferAttribute){let g=i(e.data,p.data);_=new Wn(g,p.itemSize,p.offset,p.normalized)}else{let g=Lo(p.type,p.array),m=p.isInstancedBufferAttribute?bs:qt;_=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(_.name=p.name),p.usage!==void 0&&_.setUsage(p.usage),p.gpuType!==void 0&&(_.gpuType=p.gpuType),o.setAttribute(f,_)}let c=e.data.morphAttributes;if(c)for(let f in c){let p=c[f],_=[];for(let g=0,m=p.length;g<m;g++){let y=p[g],b;if(y.isInterleavedBufferAttribute){let v=i(e.data,y.data);b=new Wn(v,y.itemSize,y.offset,y.normalized)}else{let v=Lo(y.type,y.array);b=new qt(v,y.itemSize,y.normalized)}y.name!==void 0&&(b.name=y.name),y.usage!==void 0&&b.setUsage(y.usage),y.gpuType!==void 0&&(b.gpuType=y.gpuType),_.push(b)}o.morphAttributes[f]=_}e.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);let d=e.data.groups||e.data.drawcalls||e.data.offsets;if(d!==void 0)for(let f=0,p=d.length;f!==p;++f){let _=d[f];o.addGroup(_.start,_.count,_.materialIndex)}let u=e.data.boundingSphere;return u!==void 0&&(o.boundingSphere=new nn().fromJSON(u)),e.name&&(o.name=e.name),e.userData&&(o.userData=e.userData),o}},vf={},Mu=class extends Dn{constructor(e){super(e)}load(e,t,n,i){let r=this,o=this.path===""?la.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||o;let a=new Ti(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(d){i!==void 0&&i(d),je("ObjectLoader: Can't parse "+e+".",d.message);return}let h=c.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),je("ObjectLoader: Can't load "+e);return}r.parse(c,t)},n,i)}async loadAsync(e,t){let n=this,i=this.path===""?la.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;let r=new Ti(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials);let o=await r.loadAsync(e,t),a;try{a=JSON.parse(o)}catch(c){throw new Error("THREE.ObjectLoader: Can't parse "+e+". "+c.message)}let l=a.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(a)}parse(e,t){let n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),r=this.parseGeometries(e.geometries,i),o=this.parseImages(e.images,function(){t!==void 0&&t(c)}),a=this.parseTextures(e.textures,o),l=this.parseMaterials(e.materials,a),c=this.parseObject(e.object,r,l,a,n),h=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,h),this.bindLightTargets(c),t!==void 0){let d=!1;for(let u in o)if(o[u].data instanceof HTMLImageElement){d=!0;break}d===!1&&t(c)}return c}async parseAsync(e){let t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),r=await this.parseImagesAsync(e.images),o=this.parseTextures(e.textures,r),a=this.parseMaterials(e.materials,o),l=this.parseObject(e.object,i,a,o,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}static registerGeometry(e,t){vf[e]=t}parseShapes(e){let t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){let r=new Ei().fromJSON(e[n]);t[r.uuid]=r}return t}parseSkeletons(e,t){let n={},i={};if(t.traverse(function(r){r.isBone&&(i[r.uuid]=r)}),e!==void 0)for(let r=0,o=e.length;r<o;r++){let a=new vl().fromJSON(e[r],i);n[a.uuid]=a}return n}parseGeometries(e,t){let n={};if(e!==void 0){let i=new Ql;for(let r=0,o=e.length;r<o;r++){let a,l=e[r];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":a=i.parse(l);break;default:l.type in tg?a=tg[l.type].fromJSON(l,t):l.type in vf?a=vf[l.type].fromJSON(l,t):Pe(`ObjectLoader: Unknown geometry type "${l.type}". Use .registerGeometry() before starting the deserialization process.`)}a.uuid=l.uuid,l.name!==void 0&&(a.name=l.name),l.userData!==void 0&&(a.userData=l.userData),n[l.uuid]=a}}return n}parseMaterials(e,t){let n={},i={};if(e!==void 0){let r=new jl;r.setTextures(t);for(let o=0,a=e.length;o<a;o++){let l=e[o];n[l.uuid]===void 0&&(n[l.uuid]=r.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){let t={};if(e!==void 0)for(let n=0;n<e.length;n++){let i=e[n],r=sr.parse(i);t[r.uuid]=r}return t}parseImages(e,t){let n=this,i={},r;function o(l){return l=n.manager.resolveURL(l),n.manager.itemStart(l),r.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function a(l){if(typeof l=="string"){let c=l,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return o(h)}else return l.data?{data:Lo(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){let l=new oa(t);r=new rr(l),r.setCrossOrigin(this.crossOrigin);for(let c=0,h=e.length;c<h;c++){let d=e[c],u=d.url;if(Array.isArray(u)){let f=[];for(let p=0,_=u.length;p<_;p++){let g=u[p],m=a(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new $n(m.data,m.width,m.height)))}i[d.uuid]=new Si(f)}else{let f=a(d.url);i[d.uuid]=new Si(f)}}}return i}async parseImagesAsync(e){let t=this,n={},i;async function r(o){if(typeof o=="string"){let a=o,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:t.resourcePath+a;return await i.loadAsync(l)}else return o.data?{data:Lo(o.type,o.data),width:o.width,height:o.height}:null}if(e!==void 0&&e.length>0){i=new rr(this.manager),i.setCrossOrigin(this.crossOrigin);for(let o=0,a=e.length;o<a;o++){let l=e[o],c=l.url;if(Array.isArray(c)){let h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d],p=await r(f);p!==null&&(p instanceof HTMLImageElement?h.push(p):h.push(new $n(p.data,p.width,p.height)))}n[l.uuid]=new Si(h)}else{let h=await r(l.url);n[l.uuid]=new Si(h)}}}return n}parseTextures(e,t){function n(r,o){return typeof r=="number"?r:(Pe("ObjectLoader.parseTexture: Constant should be in numeric form.",r),o[r])}let i={};if(e!==void 0)for(let r=0,o=e.length;r<o;r++){let a=e[r];a.image===void 0&&Pe('ObjectLoader: No "image" specified for',a.uuid),t[a.image]===void 0&&Pe("ObjectLoader: Undefined image",a.image);let l=t[a.image],c=l.data,h;Array.isArray(c)?(h=new $s,c.length===6&&(h.needsUpdate=!0)):(c&&c.data?h=new $n:h=new dn,c&&(h.needsUpdate=!0)),h.source=l,h.uuid=a.uuid,a.name!==void 0&&(h.name=a.name),a.mapping!==void 0&&(h.mapping=n(a.mapping,cy)),a.channel!==void 0&&(h.channel=a.channel),a.offset!==void 0&&h.offset.fromArray(a.offset),a.repeat!==void 0&&h.repeat.fromArray(a.repeat),a.center!==void 0&&h.center.fromArray(a.center),a.rotation!==void 0&&(h.rotation=a.rotation),a.wrap!==void 0&&(h.wrapS=n(a.wrap[0],hg),h.wrapT=n(a.wrap[1],hg)),a.format!==void 0&&(h.format=a.format),a.internalFormat!==void 0&&(h.internalFormat=a.internalFormat),a.type!==void 0&&(h.type=a.type),a.colorSpace!==void 0&&(h.colorSpace=a.colorSpace),a.minFilter!==void 0&&(h.minFilter=n(a.minFilter,ug)),a.magFilter!==void 0&&(h.magFilter=n(a.magFilter,ug)),a.anisotropy!==void 0&&(h.anisotropy=a.anisotropy),a.flipY!==void 0&&(h.flipY=a.flipY),a.generateMipmaps!==void 0&&(h.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(h.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(h.compareFunction=a.compareFunction),a.normalized!==void 0&&(h.normalized=a.normalized),a.userData!==void 0&&(h.userData=a.userData),i[a.uuid]=h}return i}parseObject(e,t,n,i,r){let o;function a(u){return t[u]===void 0&&Pe("ObjectLoader: Undefined geometry",u),t[u]}function l(u){if(u!==void 0){if(Array.isArray(u)){let f=[];for(let p=0,_=u.length;p<_;p++){let g=u[p];n[g]===void 0&&Pe("ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[u]===void 0&&Pe("ObjectLoader: Undefined material",u),n[u]}}function c(u){return i[u]===void 0&&Pe("ObjectLoader: Undefined texture",u),i[u]}let h,d;switch(e.type){case"Scene":o=new Ms,e.background!==void 0&&(Number.isInteger(e.background)?o.background=new Oe(e.background):o.background=c(e.background)),e.environment!==void 0&&(o.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?o.fog=new _l(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(o.fog=new gl(e.fog.color,e.fog.density)),e.fog.name!==""&&(o.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(o.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&o.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(o.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&o.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":o=new hn(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(o.focus=e.focus),e.zoom!==void 0&&(o.zoom=e.zoom),e.filmGauge!==void 0&&(o.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(o.filmOffset=e.filmOffset),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"OrthographicCamera":o=new or(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(o.zoom=e.zoom),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"AmbientLight":o=new Jl(e.color,e.intensity);break;case"DirectionalLight":o=new ar(e.color,e.intensity),o.target=e.target||"";break;case"PointLight":o=new Yr(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":o=new Kl(e.color,e.intensity,e.width,e.height);break;case"SpotLight":o=new Zl(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),o.target=e.target||"";break;case"HemisphereLight":o=new Gr(e.color,e.groundColor,e.intensity);break;case"LightProbe":let u=new aa().fromArray(e.sh);o=new $l(u,e.intensity);break;case"SkinnedMesh":h=a(e.geometry),d=l(e.material),o=new yl(h,d),e.bindMode!==void 0&&(o.bindMode=e.bindMode),e.bindMatrix!==void 0&&o.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(o.skeleton=e.skeleton);break;case"Mesh":h=a(e.geometry),d=l(e.material),o=new zt(h,d);break;case"InstancedMesh":h=a(e.geometry),d=l(e.material);let f=e.count,p=e.instanceMatrix,_=e.instanceColor;o=new Es(h,d,f),o.instanceMatrix=new bs(new Float32Array(p.array),16),_!==void 0&&(o.instanceColor=new bs(new Float32Array(_.array),_.itemSize));break;case"BatchedMesh":h=a(e.geometry),d=l(e.material),o=new Ml(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,d),o.geometry=h,o.perObjectFrustumCulled=e.perObjectFrustumCulled,o.sortObjects=e.sortObjects,o._drawRanges=e.drawRanges,o._reservedRanges=e.reservedRanges,o._geometryInfo=e.geometryInfo.map(g=>{let m=null,y=null;return g.boundingBox!==void 0&&(m=new tn().fromJSON(g.boundingBox)),g.boundingSphere!==void 0&&(y=new nn().fromJSON(g.boundingSphere)),{...g,boundingBox:m,boundingSphere:y}}),o._instanceInfo=e.instanceInfo,o._availableInstanceIds=e._availableInstanceIds,o._availableGeometryIds=e._availableGeometryIds,o._nextIndexStart=e.nextIndexStart,o._nextVertexStart=e.nextVertexStart,o._geometryCount=e.geometryCount,o._maxInstanceCount=e.maxInstanceCount,o._maxVertexCount=e.maxVertexCount,o._maxIndexCount=e.maxIndexCount,o._geometryInitialized=e.geometryInitialized,o._matricesTexture=c(e.matricesTexture.uuid),o._indirectTexture=c(e.indirectTexture.uuid),e.colorsTexture!==void 0&&(o._colorsTexture=c(e.colorsTexture.uuid)),e.boundingSphere!==void 0&&(o.boundingSphere=new nn().fromJSON(e.boundingSphere)),e.boundingBox!==void 0&&(o.boundingBox=new tn().fromJSON(e.boundingBox));break;case"LOD":o=new xl;break;case"Line":o=new Vi(a(e.geometry),l(e.material));break;case"LineLoop":o=new bl(a(e.geometry),l(e.material));break;case"LineSegments":o=new jn(a(e.geometry),l(e.material));break;case"PointCloud":case"Points":o=new El(a(e.geometry),l(e.material));break;case"Sprite":o=new Dr(l(e.material));break;case"Group":o=new mn;break;case"Bone":o=new Wo;break;default:o=new Ft}if(o.uuid=e.uuid,e.name!==void 0&&(o.name=e.name),e.matrix!==void 0?(o.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=e.matrixAutoUpdate),o.matrixAutoUpdate&&o.matrix.decompose(o.position,o.quaternion,o.scale)):(e.position!==void 0&&o.position.fromArray(e.position),e.rotation!==void 0&&o.rotation.fromArray(e.rotation),e.quaternion!==void 0&&o.quaternion.fromArray(e.quaternion),e.scale!==void 0&&o.scale.fromArray(e.scale)),e.up!==void 0&&o.up.fromArray(e.up),e.pivot!==void 0&&(o.pivot=new E().fromArray(e.pivot)),e.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),e.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=e.morphTargetInfluences.slice()),e.castShadow!==void 0&&(o.castShadow=e.castShadow),e.receiveShadow!==void 0&&(o.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(o.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(o.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(o.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(o.shadow.radius=e.shadow.radius),e.shadow.blurSamples!==void 0&&(o.shadow.blurSamples=e.shadow.blurSamples),e.shadow.focus!==void 0&&(o.shadow.focus=e.shadow.focus),e.shadow.aspect!==void 0&&(o.shadow.aspect=e.shadow.aspect),e.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(o.visible=e.visible),e.frustumCulled!==void 0&&(o.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(o.renderOrder=e.renderOrder),e.static!==void 0&&(o.static=e.static),e.userData!==void 0&&(o.userData=e.userData),e.layers!==void 0&&(o.layers.mask=e.layers),e.children!==void 0){let u=e.children;for(let f=0;f<u.length;f++)o.add(this.parseObject(u[f],t,n,i,r))}if(e.animations!==void 0){let u=e.animations;for(let f=0;f<u.length;f++){let p=u[f];o.animations.push(r[p])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(o.autoUpdate=e.autoUpdate);let u=e.levels;for(let f=0;f<u.length;f++){let p=u[f],_=o.getObjectByProperty("uuid",p.object);_!==void 0&&o.addLevel(_,p.distance,p.hysteresis)}}return o}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){let i=t[n.skeleton];i===void 0?Pe("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){let n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new Ft}})}},cy={UVMapping:ac,CubeReflectionMapping:Xi,CubeRefractionMapping:Ns,EquirectangularReflectionMapping:_a,EquirectangularRefractionMapping:xa,CubeUVReflectionMapping:$r},hg={RepeatWrapping:qs,ClampToEdgeWrapping:Kn,MirroredRepeatWrapping:No},ug={NearestFilter:un,NearestMipmapNearestFilter:hd,NearestMipmapLinearFilter:jr,LinearFilter:jt,LinearMipmapNearestFilter:ya,LinearMipmapLinearFilter:Yi},Sf=new WeakMap,bu=class extends Dn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Pe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Pe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Oi.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{Sf.has(o)===!0?(i&&i(Sf.get(o)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);return}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Oi.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Sf.set(l,c),Oi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Oi.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Gh,ca=class{static getContext(){return Gh===void 0&&(Gh=new(window.AudioContext||window.webkitAudioContext)),Gh}static setContext(e){Gh=e}},Eu=class extends Dn{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new Ti(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){try{let c=l.slice(0),h=ca.getContext(),d=e+"#decode";r.manager.itemStart(d),h.decodeAudioData(c,function(u){t(u),r.manager.itemEnd(d)}).catch(function(u){a(u),r.manager.itemEnd(d)})}catch(c){a(c)}},n,i);function a(l){i?i(l):je(l),r.manager.itemError(e)}}},dg=new ut,fg=new ut,yr=new ut,wu=class{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new hn,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new hn,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){let t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,yr.copy(e.projectionMatrix);let i=t.eyeSep/2,r=i*t.near/t.focus,o=t.near*Math.tan(wr*t.fov*.5)/t.zoom,a,l;fg.elements[12]=-i,dg.elements[12]=i,a=-o*t.aspect+r,l=o*t.aspect+r,yr.elements[0]=2*t.near/(l-a),yr.elements[8]=(l+a)/(l-a),this.cameraL.projectionMatrix.copy(yr),a=-o*t.aspect-r,l=o*t.aspect-r,yr.elements[0]=2*t.near/(l-a),yr.elements[8]=(l+a)/(l-a),this.cameraR.projectionMatrix.copy(yr)}this.cameraL.matrix.copy(e.matrixWorld).multiply(fg),this.cameraL.matrixWorldNeedsUpdate=!0,this.cameraR.matrix.copy(e.matrixWorld).multiply(dg),this.cameraR.matrixWorldNeedsUpdate=!0}},Ro=-90,Co=1,ec=class extends Ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new hn(Ro,Co,e,t);i.layers=this.layers,this.add(i);let r=new hn(Ro,Co,e,t);r.layers=this.layers,this.add(r);let o=new hn(Ro,Co,e,t);o.layers=this.layers,this.add(o);let a=new hn(Ro,Co,e,t);a.layers=this.layers,this.add(a);let l=new hn(Ro,Co,e,t);l.layers=this.layers,this.add(l);let c=new hn(Ro,Co,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===ri)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Zs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},tc=class extends hn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},nc=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=hy.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function hy(){this._document.hidden===!1&&this.reset()}var vr=new E,Mf=new gn,uy=new E,Sr=new E,Mr=new E,Tu=class extends Ft{constructor(){super(),this.type="AudioListener",this.context=ca.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new nc}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e),this._timer.update();let t=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(vr,Mf,uy),Sr.set(0,0,-1).applyQuaternion(Mf),Mr.set(0,1,0).applyQuaternion(Mf),t.positionX){let n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(vr.x,n),t.positionY.linearRampToValueAtTime(vr.y,n),t.positionZ.linearRampToValueAtTime(vr.z,n),t.forwardX.linearRampToValueAtTime(Sr.x,n),t.forwardY.linearRampToValueAtTime(Sr.y,n),t.forwardZ.linearRampToValueAtTime(Sr.z,n),t.upX.linearRampToValueAtTime(Mr.x,n),t.upY.linearRampToValueAtTime(Mr.y,n),t.upZ.linearRampToValueAtTime(Mr.z,n)}else t.setPosition(vr.x,vr.y,vr.z),t.setOrientation(Sr.x,Sr.y,Sr.z,Mr.x,Mr.y,Mr.z)}},ic=class extends Ft{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){Pe("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;let t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(Pe("Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}copy(e,t){return super.copy(e,t),e.sourceType!=="buffer"?(Pe("Audio: Audio source type cannot be copied."),this):(this.autoplay=e.autoplay,this.buffer=e.buffer,this.detune=e.detune,this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.offset=e.offset,this.duration=e.duration,this.playbackRate=e.playbackRate,this.hasPlaybackControl=e.hasPlaybackControl,this.sourceType=e.sourceType,this.filters=e.filters.slice(),this)}clone(e){return new this.constructor(this.listener).copy(this,e)}},br=new E,pg=new gn,dy=new E,Er=new E,Au=class extends ic{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(br,pg,dy),Er.set(0,0,1).applyQuaternion(pg);let t=this.panner;if(t.positionX){let n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(br.x,n),t.positionY.linearRampToValueAtTime(br.y,n),t.positionZ.linearRampToValueAtTime(br.z,n),t.orientationX.linearRampToValueAtTime(Er.x,n),t.orientationY.linearRampToValueAtTime(Er.y,n),t.orientationZ.linearRampToValueAtTime(Er.z,n)}else t.setPosition(br.x,br.y,br.z),t.setOrientation(Er.x,Er.y,Er.z)}},Ru=class{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0,t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}},sc=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,r=e*i+i,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){gn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){let o=this._workIndex*r;gn.multiplyQuaternionsFlat(e,o,e,t,e,n),gn.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){let o=1-i;for(let a=0;a!==r;++a){let l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*i}}},Tp="\\[\\]\\.:\\/",fy=new RegExp("["+Tp+"]","g"),Ap="[^"+Tp+"]",py="[^"+Tp.replace("\\.","")+"]",my=/((?:WC+[\/:])*)/.source.replace("WC",Ap),gy=/(WCOD+)?/.source.replace("WCOD",py),_y=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ap),xy=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ap),yy=new RegExp("^"+my+gy+_y+xy+"$"),vy=["material","materials","bones","map"],Ff=class{constructor(e,t,n){let i=n||Yt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Yt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(fy,"")}static parseTrackName(e){let t=yy.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);vy.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Pe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){je("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){je("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){je("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){je("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){je("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[i];if(o===void 0){let c=t.nodeName;je("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Yt.Composite=Ff;Yt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Yt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Yt.prototype.GetterByBindingType=[Yt.prototype._getValue_direct,Yt.prototype._getValue_array,Yt.prototype._getValue_arrayElement,Yt.prototype._getValue_toArray];Yt.prototype.SetterByBindingTypeAndVersioning=[[Yt.prototype._setValue_direct,Yt.prototype._setValue_direct_setNeedsUpdate,Yt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Yt.prototype._setValue_array,Yt.prototype._setValue_array_setNeedsUpdate,Yt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Yt.prototype._setValue_arrayElement,Yt.prototype._setValue_arrayElement_setNeedsUpdate,Yt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Yt.prototype._setValue_fromArray,Yt.prototype._setValue_fromArray_setNeedsUpdate,Yt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Cu=class{constructor(){this.isAnimationObjectGroup=!0,this.uuid=di(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;let e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};let t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){let e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,r=this._bindings,o=r.length,a,l=e.length,c=this.nCachedObjects_;for(let h=0,d=arguments.length;h!==d;++h){let u=arguments[h],f=u.uuid,p=t[f];if(p===void 0){p=l++,t[f]=p,e.push(u);for(let _=0,g=o;_!==g;++_)r[_].push(new Yt(u,n[_],i[_]))}else if(p<c){a=e[p];let _=--c,g=e[_];t[g.uuid]=p,e[p]=g,t[f]=_,e[_]=u;for(let m=0,y=o;m!==y;++m){let b=r[m],v=b[_],A=b[p];b[p]=v,A===void 0&&(A=new Yt(u,n[m],i[m])),b[_]=A}}else e[p]!==a&&je("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){let e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_;for(let o=0,a=arguments.length;o!==a;++o){let l=arguments[o],c=l.uuid,h=t[c];if(h!==void 0&&h>=r){let d=r++,u=e[d];t[u.uuid]=h,e[h]=u,t[c]=d,e[d]=l;for(let f=0,p=i;f!==p;++f){let _=n[f],g=_[d],m=_[h];_[h]=g,_[d]=m}}}this.nCachedObjects_=r}uncache(){let e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_,o=e.length;for(let a=0,l=arguments.length;a!==l;++a){let c=arguments[a],h=c.uuid,d=t[h];if(d!==void 0)if(delete t[h],d<r){let u=--r,f=e[u],p=--o,_=e[p];d!==u&&(t[f.uuid]=d),e[d]=f,u!==p&&(t[_.uuid]=u),e[u]=_,e.pop();for(let g=0,m=i;g!==m;++g){let y=n[g],b=y[u],v=y[p];y[d]=b,y[u]=v,y.pop()}}else{let u=--o,f=e[u];d!==u&&(t[f.uuid]=d),e[d]=f,e.pop();for(let p=0,_=i;p!==_;++p){let g=n[p];g[d]=g[u],g.pop()}}}this.nCachedObjects_=r}subscribe_(e,t){let n=this._bindingsIndicesByPath,i=n[e],r=this._bindings;if(i!==void 0)return r[i];let o=this._paths,a=this._parsedPaths,l=this._objects,c=l.length,h=this.nCachedObjects_,d=new Array(c);i=r.length,n[e]=i,o.push(e),a.push(t),r.push(d);for(let u=h,f=l.length;u!==f;++u){let p=l[u];d[u]=new Yt(p,e,t)}return d}unsubscribe_(e){let t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){let i=this._paths,r=this._parsedPaths,o=this._bindings,a=o.length-1,l=o[a],c=i[a];t[c]=n,o[n]=l,o.pop(),r[n]=r[a],r.pop(),i[n]=i[a],i.pop()}}},rc=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let r=t.tracks,o=r.length,a=new Array(o),l={endingStart:Xs,endingEnd:Xs};for(let c=0;c!==o;++c){let h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=hp,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,r=i.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case _d:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Wc:default:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,r=this._loopCount,o=n===up;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===cp){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){let a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this._loopCount=r,this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=Ys,i.endingEnd=Ys):(e?i.endingStart=this.zeroSlopeAtStart?Ys:Xs:i.endingStart=Fo,t?i.endingEnd=this.zeroSlopeAtEnd?Ys:Xs:i.endingEnd=Fo)}_scheduleFading(e,t,n){let i=this._mixer,r=i.time,o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}},Sy=new Float32Array(1),Pu=class extends oi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let d=0;d!==r;++d){let u=i[d],f=u.name,p=h[f];if(p!==void 0)++p.referenceCount,o[d]=p;else{if(p=o[d],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}let _=t&&t._propertyBindings[d].binding.parsedPath;p=new sc(Yt.create(n,f,_),u.ValueTypeName,u.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),o[d]=p}a[d].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let d=a.actionByRoot,u=(e._localRoot||this._root).uuid;delete d[u],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,r=this._bindings,o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new ia(new Float32Array(2),new Float32Array(2),1,Sy),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let i=t||this._root,r=i.uuid,o=typeof e=="string"?sr.findByName(i,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Wc),l!==void 0){let d=l.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let h=new rc(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(e,t){let n=t||this._root,i=n.uuid,r=typeof e=="string"?sr.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let h=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=h,t[h]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}},Iu=class extends Ho{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isRenderTarget3D=!0,this.depth=n;for(let r=0;r<this.textures.length;r++){let o=new Cr(null,e,t,n);o.isRenderTargetTexture=!0,o.renderTarget=this,this.textures[r]=o}this._setTextureOptions(i)}},Lu=class s{constructor(e){this.value=e}clone(){return new s(this.value.clone===void 0?this.value:this.value.clone())}},My=0,Du=class extends oi{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:My++}),this.name="",this.usage=qc,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){let t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(e){this.name=e.name,this.usage=e.usage;let t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){let r=Array.isArray(t[n])?t[n]:[t[n]];for(let o=0;o<r.length;o++)this.uniforms.push(r[o].clone())}return this}clone(){return new this.constructor().copy(this)}},Ps=class extends Lr{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}},Nu=class{constructor(e,t,n,i,r,o=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=r,this.normalized=o,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}},mg=new ut,ha=class{constructor(e,t,n=0,i=1/0){this.ray=new zi(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Pr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return mg.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(mg),this}intersectObject(e,t=!0,n=[]){return Of(e,this,n,t),n.sort(gg),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Of(e[i],this,n,t);return n.sort(gg),n}};function gg(s,e){return s.distance-e.distance}function Of(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)Of(r[o],e,t,!0)}}var Uu=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Pe("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}},Zr=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ft(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ft(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},Fu=class{constructor(e=1,t=0,n=0){this.radius=e,this.theta=t,this.y=n}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}},Ou=class s{static{s.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}},_g=new le,oc=class{constructor(e=new le(1/0,1/0),t=new le(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=_g.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_g).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},xg=new E,Wh=new E,Po=new E,Io=new E,bf=new E,by=new E,Ey=new E,ua=class{constructor(e=new E,t=new E){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){xg.subVectors(e,this.start),Wh.subVectors(this.end,this.start);let n=Wh.dot(Wh);if(n===0)return 0;let r=Wh.dot(xg)/n;return t&&(r=ft(r,0,1)),r}closestPointToPoint(e,t,n){let i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=by,n=Ey){let i=10000000000000001e-32,r,o,a=this.start,l=e.start,c=this.end,h=e.end;Po.subVectors(c,a),Io.subVectors(h,l),bf.subVectors(a,l);let d=Po.dot(Po),u=Io.dot(Io),f=Io.dot(bf);if(d<=i&&u<=i)return t.copy(a),n.copy(l),t.sub(n),t.dot(t);if(d<=i)r=0,o=f/u,o=ft(o,0,1);else{let p=Po.dot(bf);if(u<=i)o=0,r=ft(-p/d,0,1);else{let _=Po.dot(Io),g=d*u-_*_;g!==0?r=ft((_*f-p*u)/g,0,1):r=0,o=(_*r+f)/u,o<0?(o=0,r=ft(-p/d,0,1)):o>1&&(o=1,r=ft((_-p)/d,0,1))}}return t.copy(a).addScaledVector(Po,r),n.copy(l).addScaledVector(Io,o),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}},yg=new E,Bu=class extends Ft{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";let n=new _t,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,l=32;o<l;o++,a++){let c=o/l*Math.PI*2,h=a/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new ze(i,3));let r=new Sn({fog:!1,toneMapped:!1});this.cone=new jn(n,r),this.add(this.cone),this.update()}dispose(){super.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorldNeedsUpdate=!0;let e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),yg.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(yg),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}},Ws=new E,Xh=new ut,Ef=new ut,zu=class extends jn{constructor(e){let t=I0(e),n=new _t,i=[],r=[];for(let c=0;c<t.length;c++){let h=t[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(0,0,0),r.push(0,0,0))}n.setAttribute("position",new ze(i,3)),n.setAttribute("color",new ze(r,3));let o=new Sn({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,o),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1;let a=new Oe(255),l=new Oe(65280);this.setColors(a,l)}updateMatrixWorld(e){let t=this.bones,n=this.geometry,i=n.getAttribute("position");Ef.copy(this.root.matrixWorld).invert();for(let r=0,o=0;r<t.length;r++){let a=t[r];a.parent&&a.parent.isBone&&(Xh.multiplyMatrices(Ef,a.matrixWorld),Ws.setFromMatrixPosition(Xh),i.setXYZ(o,Ws.x,Ws.y,Ws.z),Xh.multiplyMatrices(Ef,a.parent.matrixWorld),Ws.setFromMatrixPosition(Xh),i.setXYZ(o+1,Ws.x,Ws.y,Ws.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}setColors(e,t){let i=this.geometry.getAttribute("color");for(let r=0;r<i.count;r+=2)i.setXYZ(r,e.r,e.g,e.b),i.setXYZ(r+1,t.r,t.g,t.b);return i.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function I0(s){let e=[];s.isBone===!0&&e.push(s);for(let t=0;t<s.children.length;t++)e.push(...I0(s.children[t]));return e}var Vu=class extends zt{constructor(e,t,n){let i=new pi(t,4,2),r=new Qt({wireframe:!0,fog:!1,toneMapped:!1});super(i,r),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}},wy=new E,vg=new Oe,Sg=new Oe,Hu=class extends Ft{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";let i=new Qo(t);i.rotateY(Math.PI*.5),this.material=new Qt({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);let r=i.getAttribute("position"),o=new Float32Array(r.count*3);i.setAttribute("color",new qt(o,3)),this.add(new zt(i,this.material)),this.update()}dispose(){super.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){let e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{let t=e.geometry.getAttribute("color");vg.copy(this.light.color),Sg.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){let r=n<i/2?vg:Sg;t.setXYZ(n,r.r,r.g,r.b)}t.needsUpdate=!0}this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),e.lookAt(wy.setFromMatrixPosition(this.light.matrixWorld).negate())}},ku=class extends jn{constructor(e=10,t=10,n=4473924,i=8947848){n=new Oe(n),i=new Oe(i);let r=t/2,o=e/t,a=e/2,l=[],c=[];for(let u=0,f=0,p=-a;u<=t;u++,p+=o){l.push(-a,0,p,a,0,p),l.push(p,0,-a,p,0,a);let _=u===r?n:i;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}let h=new _t;h.setAttribute("position",new ze(l,3)),h.setAttribute("color",new ze(c,3));let d=new Sn({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Gu=class extends jn{constructor(e=10,t=16,n=8,i=64,r=4473924,o=8947848){r=new Oe(r),o=new Oe(o);let a=[],l=[];if(t>1)for(let d=0;d<t;d++){let u=d/t*(Math.PI*2),f=Math.sin(u)*e,p=Math.cos(u)*e;a.push(0,0,0),a.push(f,0,p);let _=d&1?r:o;l.push(_.r,_.g,_.b),l.push(_.r,_.g,_.b)}for(let d=0;d<n;d++){let u=d&1?r:o,f=e-e/n*d;for(let p=0;p<i;p++){let _=p/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f;a.push(g,0,m),l.push(u.r,u.g,u.b),_=(p+1)/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f,a.push(g,0,m),l.push(u.r,u.g,u.b)}}let c=new _t;c.setAttribute("position",new ze(a,3)),c.setAttribute("color",new ze(l,3));let h=new Sn({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Mg=new E,Yh=new E,bg=new E,Wu=class extends Ft{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new _t;i.setAttribute("position",new ze([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));let r=new Sn({fog:!1,toneMapped:!1});this.lightPlane=new Vi(i,r),this.add(this.lightPlane),i=new _t,i.setAttribute("position",new ze([0,0,0,0,0,1],3)),this.targetLine=new Vi(i,r),this.add(this.targetLine),this.update()}dispose(){super.dispose(),this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Mg.setFromMatrixPosition(this.light.matrixWorld),Yh.setFromMatrixPosition(this.light.target.matrixWorld),bg.subVectors(Yh,Mg),this.lightPlane.lookAt(Yh),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(Yh),this.targetLine.scale.z=bg.length()}},qh=new E,cn=new Xr,Xu=class extends jn{constructor(e){let t=new _t,n=new Sn({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],r=[],o={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(p,_){l(p),l(_)}function l(p){i.push(0,0,0),r.push(0,0,0),o[p]===void 0&&(o[p]=[]),o[p].push(i.length/3-1)}t.setAttribute("position",new ze(i,3)),t.setAttribute("color",new ze(r,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();let c=new Oe(16755200),h=new Oe(16711680),d=new Oe(43775),u=new Oe(16777215),f=new Oe(3355443);this.setColors(c,h,d,u,f)}setColors(e,t,n,i,r){let a=this.geometry.getAttribute("color");return a.setXYZ(0,e.r,e.g,e.b),a.setXYZ(1,e.r,e.g,e.b),a.setXYZ(2,e.r,e.g,e.b),a.setXYZ(3,e.r,e.g,e.b),a.setXYZ(4,e.r,e.g,e.b),a.setXYZ(5,e.r,e.g,e.b),a.setXYZ(6,e.r,e.g,e.b),a.setXYZ(7,e.r,e.g,e.b),a.setXYZ(8,e.r,e.g,e.b),a.setXYZ(9,e.r,e.g,e.b),a.setXYZ(10,e.r,e.g,e.b),a.setXYZ(11,e.r,e.g,e.b),a.setXYZ(12,e.r,e.g,e.b),a.setXYZ(13,e.r,e.g,e.b),a.setXYZ(14,e.r,e.g,e.b),a.setXYZ(15,e.r,e.g,e.b),a.setXYZ(16,e.r,e.g,e.b),a.setXYZ(17,e.r,e.g,e.b),a.setXYZ(18,e.r,e.g,e.b),a.setXYZ(19,e.r,e.g,e.b),a.setXYZ(20,e.r,e.g,e.b),a.setXYZ(21,e.r,e.g,e.b),a.setXYZ(22,e.r,e.g,e.b),a.setXYZ(23,e.r,e.g,e.b),a.setXYZ(24,t.r,t.g,t.b),a.setXYZ(25,t.r,t.g,t.b),a.setXYZ(26,t.r,t.g,t.b),a.setXYZ(27,t.r,t.g,t.b),a.setXYZ(28,t.r,t.g,t.b),a.setXYZ(29,t.r,t.g,t.b),a.setXYZ(30,t.r,t.g,t.b),a.setXYZ(31,t.r,t.g,t.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,i.r,i.g,i.b),a.setXYZ(39,i.r,i.g,i.b),a.setXYZ(40,r.r,r.g,r.b),a.setXYZ(41,r.r,r.g,r.b),a.setXYZ(42,r.r,r.g,r.b),a.setXYZ(43,r.r,r.g,r.b),a.setXYZ(44,r.r,r.g,r.b),a.setXYZ(45,r.r,r.g,r.b),a.setXYZ(46,r.r,r.g,r.b),a.setXYZ(47,r.r,r.g,r.b),a.setXYZ(48,r.r,r.g,r.b),a.setXYZ(49,r.r,r.g,r.b),a.needsUpdate=!0,this}update(){let e=this.geometry,t=this.pointMap,n=1,i=1,r,o;if(cn.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)r=1,o=0;else if(this.camera.coordinateSystem===ri)r=-1,o=1;else if(this.camera.coordinateSystem===Zs)r=0,o=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);pn("c",t,e,cn,0,0,r),pn("t",t,e,cn,0,0,o),pn("n1",t,e,cn,-n,-i,r),pn("n2",t,e,cn,n,-i,r),pn("n3",t,e,cn,-n,i,r),pn("n4",t,e,cn,n,i,r),pn("f1",t,e,cn,-n,-i,o),pn("f2",t,e,cn,n,-i,o),pn("f3",t,e,cn,-n,i,o),pn("f4",t,e,cn,n,i,o),pn("u1",t,e,cn,n*.7,i*1.1,r),pn("u2",t,e,cn,-n*.7,i*1.1,r),pn("u3",t,e,cn,0,i*2,r),pn("cf1",t,e,cn,-n,0,o),pn("cf2",t,e,cn,n,0,o),pn("cf3",t,e,cn,0,-i,o),pn("cf4",t,e,cn,0,i,o),pn("cn1",t,e,cn,-n,0,r),pn("cn2",t,e,cn,n,0,r),pn("cn3",t,e,cn,0,-i,r),pn("cn4",t,e,cn,0,i,r),e.getAttribute("position").needsUpdate=!0}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function pn(s,e,t,n,i,r,o){qh.set(i,r,o).unproject(n);let a=e[s];if(a!==void 0){let l=t.getAttribute("position");for(let c=0,h=a.length;c<h;c++)l.setXYZ(a[c],qh.x,qh.y,qh.z)}}var Zh=new tn,Yu=class extends jn{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),r=new _t;r.setIndex(new qt(n,1)),r.setAttribute("position",new qt(i,3)),super(r,new Sn({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&Zh.setFromObject(this.object),Zh.isEmpty())return;let e=Zh.min,t=Zh.max,n=this.geometry.attributes.position,i=n.array;i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=e.x,i[4]=t.y,i[5]=t.z,i[6]=e.x,i[7]=e.y,i[8]=t.z,i[9]=t.x,i[10]=e.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=e.z,i[15]=e.x,i[16]=t.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=t.x,i[22]=e.y,i[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},qu=class extends jn{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new _t;r.setIndex(new qt(n,1)),r.setAttribute("position",new ze(i,3)),super(r,new Sn({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){let t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Zu=class extends Vi{constructor(e,t=1,n=16776960){let i=n,r=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new _t;o.setAttribute("position",new ze(r,3)),o.computeBoundingSphere(),super(o,new Sn({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;let a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new _t;l.setAttribute("position",new ze(a,3)),l.computeBoundingSphere(),this.add(new zt(l,new Qt({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}},Eg=new E,Jh,wf,Ju=class extends Ft{constructor(e=new E(0,0,1),t=new E(0,0,0),n=1,i=16776960,r=n*.2,o=r*.2){super(),this.type="ArrowHelper",Jh===void 0&&(Jh=new _t,Jh.setAttribute("position",new ze([0,0,0,0,1,0],3)),wf=new qo(.5,1,5,1),wf.translate(0,-.5,0)),this.position.copy(t),this.line=new Vi(Jh,new Sn({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new zt(wf,new Qt({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Eg.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Eg,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},Ku=class extends jn{constructor(e=1){let t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new _t;i.setAttribute("position",new ze(t,3)),i.setAttribute("color",new ze(n,3));let r=new Sn({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,t,n){let i=new Oe,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(t),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},$u=class{constructor(){this.type="ShapePath",this.color=new Oe,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(e,t){return this.currentPath=new nr,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,r,o){return this.currentPath.bezierCurveTo(e,t,n,i,r,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(){function e(l,c){let h=!1,d=c.length;for(let u=0,f=d-1;u<d;f=u++){let p=c[u],_=c[f];p.y>l.y!=_.y>l.y&&l.x<(_.x-p.x)*(l.y-p.y)/(_.y-p.y)+p.x&&(h=!h)}return h}function t(l,c){let h=c.getCenter(new le);if(e(h,l))return h;let d=h.y,u=[],f=l.length;for(let p=0;p<f;p++){let _=l[p],g=l[(p+1)%f];if(_.y>d!=g.y>d){let m=_.x+(d-_.y)*(g.x-_.x)/(g.y-_.y);u.push(m)}}return u.length>1&&(u.sort((p,_)=>p-_),h.x=(u[0]+u[1])/2),h}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(Pe('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");let i=n==="nonzero"?(l=>l!==0):(l=>(l&1)!==0),r=[];for(let l of this.subPaths){let c=l.getPoints();if(c.length<3)continue;let h=Mi.area(c);if(h===0)continue;let d=new oc;for(let u=0;u<c.length;u++)d.expandByPoint(c[u]);r.push({subPath:l,points:c,boundingBox:d,interiorPoint:t(c,d),absArea:Math.abs(h),winding:h<0?-1:1,container:null,exclude:!1,role:null})}r.sort((l,c)=>c.absArea-l.absArea);for(let l=0;l<r.length;l++){let c=r[l],h=0;for(let d=l-1;d>=0;d--){let u=r[d];if(u.boundingBox.containsBox(c.boundingBox)&&e(c.interiorPoint,u.points)){c.container=u.exclude?u.container:u,h=u.winding,c.winding+=h;break}}i(c.winding)===i(h)&&(c.exclude=!0)}for(let l of r)l.exclude||(l.role=l.container===null||l.container.role==="hole"?"outer":"hole");let o=[],a=new Map;for(let l of r){if(l.exclude||l.role!=="outer")continue;let c=new Ei;c.curves=l.subPath.curves,o.push(c),a.set(l,c)}for(let l of r){if(l.exclude||l.role!=="hole")continue;let c=a.get(l.container);if(!c)continue;let h=new nr;h.curves=l.subPath.curves,c.holes.push(h)}return o}},da=class extends oi{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function Ty(s,e){let t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2):(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0),s}function Ay(s,e){let t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0):(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2),s}function Ry(s){return s.repeat.x=1,s.repeat.y=1,s.offset.x=0,s.offset.y=0,s}function yd(s,e,t,n){let i=Cy(n);switch(t){case md:return s*e;case uc:return s*e/i.components*i.byteLength;case va:return s*e/i.components*i.byteLength;case Fs:return s*e*2/i.components*i.byteLength;case dc:return s*e*2/i.components*i.byteLength;case gd:return s*e*3/i.components*i.byteLength;case Gn:return s*e*4/i.components*i.byteLength;case fc:return s*e*4/i.components*i.byteLength;case Sa:case Ma:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ba:case Ea:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case mc:case _c:return Math.max(s,16)*Math.max(e,8)/4;case pc:case gc:return Math.max(s,8)*Math.max(e,8)/2;case xc:case yc:case Sc:case Mc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case vc:case wa:case bc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ec:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case wc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Tc:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Ac:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Rc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Cc:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Pc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Ic:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Lc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Dc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Nc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Uc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Fc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Oc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Bc:case zc:case Vc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Hc:case kc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Ta:case Gc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Cy(s){switch(s){case ei:case ud:return{byteLength:1,components:1};case Qr:case dd:case Ri:return{byteLength:2,components:1};case cc:case hc:return{byteLength:2,components:4};case gi:case lc:case kn:return{byteLength:4,components:1};case fd:case pd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}var ju=class{static contain(e,t){return Ty(e,t)}static cover(e,t){return Ay(e,t)}static fill(e){return Ry(e)}static getByteLength(e,t,n,i){return yd(e,t,n,i)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Q0(){let s=null,e=!1,t=null,n=null;function i(r,o){n=s.requestAnimationFrame(i),t(r,o)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function Py(s){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){let h=l.array,d=l.updateRanges;if(s.bindBuffer(c,a),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){let p=d[u],_=d[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){let _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var Iy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ly=`#ifdef USE_ALPHAHASH
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
#endif`,Dy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ny=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Uy=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Fy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Oy=`#ifdef USE_AOMAP
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
#endif`,By=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,zy=`#ifdef USE_BATCHING
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
#endif`,Vy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Hy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ky=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Gy=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Wy=`#ifdef USE_IRIDESCENCE
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
#endif`,Xy=`#ifdef USE_BUMPMAP
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
#endif`,Yy=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,qy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Zy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Jy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ky=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,$y=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,jy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Qy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,ev=`#define PI 3.141592653589793
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
} // validated`,tv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,nv=`vec3 transformedNormal = objectNormal;
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
#endif`,iv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,sv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ov=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,av="gl_FragColor = linearToOutputTexel( gl_FragColor );",lv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cv=`#ifdef USE_ENVMAP
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
#endif`,hv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,uv=`#ifdef USE_ENVMAP
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
#endif`,dv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,fv=`#ifdef USE_ENVMAP
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
#endif`,pv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,mv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,gv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,_v=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,xv=`#ifdef USE_GRADIENTMAP
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
}`,yv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mv=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,bv=`#ifdef USE_ENVMAP
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
#endif`,Ev=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Av=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Rv=`PhysicalMaterial material;
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
#endif`,Cv=`uniform sampler2D dfgLUT;
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
}`,Pv=`
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
#endif`,Iv=`#if defined( RE_IndirectDiffuse )
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
#endif`,Lv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Dv=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Nv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Uv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Fv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ov=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Bv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Hv=`#if defined( USE_POINTS_UV )
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
#endif`,kv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Gv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Wv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Xv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Yv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qv=`#ifdef USE_MORPHTARGETS
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
#endif`,Zv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Kv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,$v=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,eS=`#ifdef USE_NORMALMAP
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
#endif`,tS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,nS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,iS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,rS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,oS=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,aS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,lS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,hS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,uS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,dS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,fS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,pS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,mS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,gS=`float getShadowMask() {
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
}`,_S=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xS=`#ifdef USE_SKINNING
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
#endif`,yS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vS=`#ifdef USE_SKINNING
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
#endif`,SS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,MS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,bS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ES=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,wS=`#ifdef USE_TRANSMISSION
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
#endif`,TS=`#ifdef USE_TRANSMISSION
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
#endif`,AS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,RS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,CS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,PS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,IS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,LS=`uniform sampler2D t2D;
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
}`,DS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,NS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,US=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,FS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,OS=`#include <common>
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
}`,BS=`#if DEPTH_PACKING == 3200
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
}`,zS=`#define DISTANCE
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
}`,VS=`#define DISTANCE
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
}`,HS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,kS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,GS=`uniform float scale;
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
}`,WS=`uniform vec3 diffuse;
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
}`,XS=`#include <common>
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
}`,YS=`uniform vec3 diffuse;
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
}`,qS=`#define LAMBERT
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
}`,ZS=`#define LAMBERT
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
}`,JS=`#define MATCAP
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
}`,KS=`#define MATCAP
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
}`,$S=`#define NORMAL
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
}`,jS=`#define NORMAL
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
}`,QS=`#define PHONG
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
}`,eM=`#define PHONG
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
}`,tM=`#define STANDARD
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
}`,nM=`#define STANDARD
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
}`,iM=`#define TOON
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
}`,sM=`#define TOON
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
}`,rM=`uniform float size;
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
}`,oM=`uniform vec3 diffuse;
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
}`,aM=`#include <common>
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
}`,lM=`uniform vec3 color;
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
}`,cM=`uniform float rotation;
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
}`,hM=`uniform vec3 diffuse;
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
}`,wt={alphahash_fragment:Iy,alphahash_pars_fragment:Ly,alphamap_fragment:Dy,alphamap_pars_fragment:Ny,alphatest_fragment:Uy,alphatest_pars_fragment:Fy,aomap_fragment:Oy,aomap_pars_fragment:By,batching_pars_vertex:zy,batching_vertex:Vy,begin_vertex:Hy,beginnormal_vertex:ky,bsdfs:Gy,iridescence_fragment:Wy,bumpmap_pars_fragment:Xy,clipping_planes_fragment:Yy,clipping_planes_pars_fragment:qy,clipping_planes_pars_vertex:Zy,clipping_planes_vertex:Jy,color_fragment:Ky,color_pars_fragment:$y,color_pars_vertex:jy,color_vertex:Qy,common:ev,cube_uv_reflection_fragment:tv,defaultnormal_vertex:nv,displacementmap_pars_vertex:iv,displacementmap_vertex:sv,emissivemap_fragment:rv,emissivemap_pars_fragment:ov,colorspace_fragment:av,colorspace_pars_fragment:lv,envmap_fragment:cv,envmap_common_pars_fragment:hv,envmap_pars_fragment:uv,envmap_pars_vertex:dv,envmap_physical_pars_fragment:bv,envmap_vertex:fv,fog_vertex:pv,fog_pars_vertex:mv,fog_fragment:gv,fog_pars_fragment:_v,gradientmap_pars_fragment:xv,lightmap_pars_fragment:yv,lights_lambert_fragment:vv,lights_lambert_pars_fragment:Sv,lights_pars_begin:Mv,lights_toon_fragment:Ev,lights_toon_pars_fragment:wv,lights_phong_fragment:Tv,lights_phong_pars_fragment:Av,lights_physical_fragment:Rv,lights_physical_pars_fragment:Cv,lights_fragment_begin:Pv,lights_fragment_maps:Iv,lights_fragment_end:Lv,lightprobes_pars_fragment:Dv,logdepthbuf_fragment:Nv,logdepthbuf_pars_fragment:Uv,logdepthbuf_pars_vertex:Fv,logdepthbuf_vertex:Ov,map_fragment:Bv,map_pars_fragment:zv,map_particle_fragment:Vv,map_particle_pars_fragment:Hv,metalnessmap_fragment:kv,metalnessmap_pars_fragment:Gv,morphinstance_vertex:Wv,morphcolor_vertex:Xv,morphnormal_vertex:Yv,morphtarget_pars_vertex:qv,morphtarget_vertex:Zv,normal_fragment_begin:Jv,normal_fragment_maps:Kv,normal_pars_fragment:$v,normal_pars_vertex:jv,normal_vertex:Qv,normalmap_pars_fragment:eS,clearcoat_normal_fragment_begin:tS,clearcoat_normal_fragment_maps:nS,clearcoat_pars_fragment:iS,iridescence_pars_fragment:sS,opaque_fragment:rS,packing:oS,premultiplied_alpha_fragment:aS,project_vertex:lS,dithering_fragment:cS,dithering_pars_fragment:hS,roughnessmap_fragment:uS,roughnessmap_pars_fragment:dS,shadowmap_pars_fragment:fS,shadowmap_pars_vertex:pS,shadowmap_vertex:mS,shadowmask_pars_fragment:gS,skinbase_vertex:_S,skinning_pars_vertex:xS,skinning_vertex:yS,skinnormal_vertex:vS,specularmap_fragment:SS,specularmap_pars_fragment:MS,tonemapping_fragment:bS,tonemapping_pars_fragment:ES,transmission_fragment:wS,transmission_pars_fragment:TS,uv_pars_fragment:AS,uv_pars_vertex:RS,uv_vertex:CS,worldpos_vertex:PS,background_vert:IS,background_frag:LS,backgroundCube_vert:DS,backgroundCube_frag:NS,cube_vert:US,cube_frag:FS,depth_vert:OS,depth_frag:BS,distance_vert:zS,distance_frag:VS,equirect_vert:HS,equirect_frag:kS,linedashed_vert:GS,linedashed_frag:WS,meshbasic_vert:XS,meshbasic_frag:YS,meshlambert_vert:qS,meshlambert_frag:ZS,meshmatcap_vert:JS,meshmatcap_frag:KS,meshnormal_vert:$S,meshnormal_frag:jS,meshphong_vert:QS,meshphong_frag:eM,meshphysical_vert:tM,meshphysical_frag:nM,meshtoon_vert:iM,meshtoon_frag:sM,points_vert:rM,points_frag:oM,shadow_vert:aM,shadow_frag:lM,sprite_vert:cM,sprite_frag:hM},Re={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new mt},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new mt}},envmap:{envMap:{value:null},envMapRotation:{value:new mt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new mt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new mt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new mt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new mt},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new mt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new mt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new mt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new mt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new E},probesMax:{value:new E},probesResolution:{value:new E}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0},uvTransform:{value:new mt}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new mt},alphaMap:{value:null},alphaMapTransform:{value:new mt},alphaTest:{value:0}}},Yn={basic:{uniforms:Xn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:wt.meshbasic_vert,fragmentShader:wt.meshbasic_frag},lambert:{uniforms:Xn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Oe(0)},envMapIntensity:{value:1}}]),vertexShader:wt.meshlambert_vert,fragmentShader:wt.meshlambert_frag},phong:{uniforms:Xn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:wt.meshphong_vert,fragmentShader:wt.meshphong_frag},standard:{uniforms:Xn([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:wt.meshphysical_vert,fragmentShader:wt.meshphysical_frag},toon:{uniforms:Xn([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new Oe(0)}}]),vertexShader:wt.meshtoon_vert,fragmentShader:wt.meshtoon_frag},matcap:{uniforms:Xn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:wt.meshmatcap_vert,fragmentShader:wt.meshmatcap_frag},points:{uniforms:Xn([Re.points,Re.fog]),vertexShader:wt.points_vert,fragmentShader:wt.points_frag},dashed:{uniforms:Xn([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:wt.linedashed_vert,fragmentShader:wt.linedashed_frag},depth:{uniforms:Xn([Re.common,Re.displacementmap]),vertexShader:wt.depth_vert,fragmentShader:wt.depth_frag},normal:{uniforms:Xn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:wt.meshnormal_vert,fragmentShader:wt.meshnormal_frag},sprite:{uniforms:Xn([Re.sprite,Re.fog]),vertexShader:wt.sprite_vert,fragmentShader:wt.sprite_frag},background:{uniforms:{uvTransform:{value:new mt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:wt.background_vert,fragmentShader:wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new mt}},vertexShader:wt.backgroundCube_vert,fragmentShader:wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:wt.cube_vert,fragmentShader:wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:wt.equirect_vert,fragmentShader:wt.equirect_frag},distance:{uniforms:Xn([Re.common,Re.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:wt.distance_vert,fragmentShader:wt.distance_frag},shadow:{uniforms:Xn([Re.lights,Re.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:wt.shadow_vert,fragmentShader:wt.shadow_frag}};Yn.physical={uniforms:Xn([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new mt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new mt},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new mt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new mt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new mt},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new mt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new mt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new mt},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new mt},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new mt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new mt},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new mt}}]),vertexShader:wt.meshphysical_vert,fragmentShader:wt.meshphysical_frag};var vd={r:0,b:0,g:0},uM=new ut,e_=new mt;e_.set(-1,0,0,0,1,0,0,0,1);function dM(s,e,t,n,i,r){let o=new Oe(0),a=i===!0?0:1,l,c,h=null,d=0,u=null;function f(y){let b=y.isScene===!0?y.background:null;if(b&&b.isTexture){let v=y.backgroundBlurriness>0;b=e.get(b,v)}return b}function p(y){let b=!1,v=f(y);v===null?g(o,a):v&&v.isColor&&(g(v,1),b=!0);let A=s.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(y,b){let v=f(b);v&&(v.isCubeTexture||v.mapping===$r)?(c===void 0&&(c=new zt(new In(1,1,1),new Ln({name:"BackgroundCubeMaterial",uniforms:to(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(uM.makeRotationFromEuler(b.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(e_),c.material.toneMapped=Ct.getTransfer(v.colorSpace)!==Wt,(h!==v||d!==v.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new zt(new fi(2,2),new Ln({name:"BackgroundMaterial",uniforms:to(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:Ds,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=Ct.getTransfer(v.colorSpace)!==Wt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function g(y,b){y.getRGB(vd,Ep(s)),t.buffers.color.setClear(vd.r,vd.g,vd.b,b,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,b=1){o.set(y),a=b,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(y){a=y,g(o,a)},render:p,addToRenderList:_,dispose:m}}function fM(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,o=!1;function a(O,k,q,U,B){let z=!1,G=d(O,U,q,k);r!==G&&(r=G,c(r.object)),z=f(O,U,q,B),z&&p(O,U,q,B),B!==null&&e.update(B,s.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,v(O,k,q,U),B!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return s.createVertexArray()}function c(O){return s.bindVertexArray(O)}function h(O){return s.deleteVertexArray(O)}function d(O,k,q,U){let B=U.wireframe===!0,z=n[k.id];z===void 0&&(z={},n[k.id]=z);let G=O.isInstancedMesh===!0?O.id:0,se=z[G];se===void 0&&(se={},z[G]=se);let Y=se[q.id];Y===void 0&&(Y={},se[q.id]=Y);let ee=Y[B];return ee===void 0&&(ee=u(l()),Y[B]=ee),ee}function u(O){let k=[],q=[],U=[];for(let B=0;B<t;B++)k[B]=0,q[B]=0,U[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:q,attributeDivisors:U,object:O,attributes:{},index:null}}function f(O,k,q,U){let B=r.attributes,z=k.attributes,G=0,se=q.getAttributes();for(let Y in se)if(se[Y].location>=0){let ae=B[Y],ke=z[Y];if(ke===void 0&&(Y==="instanceMatrix"&&O.instanceMatrix&&(ke=O.instanceMatrix),Y==="instanceColor"&&O.instanceColor&&(ke=O.instanceColor)),ae===void 0||ae.attribute!==ke||ke&&ae.data!==ke.data)return!0;G++}return r.attributesNum!==G||r.index!==U}function p(O,k,q,U){let B={},z=k.attributes,G=0,se=q.getAttributes();for(let Y in se)if(se[Y].location>=0){let ae=z[Y];ae===void 0&&(Y==="instanceMatrix"&&O.instanceMatrix&&(ae=O.instanceMatrix),Y==="instanceColor"&&O.instanceColor&&(ae=O.instanceColor));let ke={};ke.attribute=ae,ae&&ae.data&&(ke.data=ae.data),B[Y]=ke,G++}r.attributes=B,r.attributesNum=G,r.index=U}function _(){let O=r.newAttributes;for(let k=0,q=O.length;k<q;k++)O[k]=0}function g(O){m(O,0)}function m(O,k){let q=r.newAttributes,U=r.enabledAttributes,B=r.attributeDivisors;q[O]=1,U[O]===0&&(s.enableVertexAttribArray(O),U[O]=1),B[O]!==k&&(s.vertexAttribDivisor(O,k),B[O]=k)}function y(){let O=r.newAttributes,k=r.enabledAttributes;for(let q=0,U=k.length;q<U;q++)k[q]!==O[q]&&(s.disableVertexAttribArray(q),k[q]=0)}function b(O,k,q,U,B,z,G){G===!0?s.vertexAttribIPointer(O,k,q,B,z):s.vertexAttribPointer(O,k,q,U,B,z)}function v(O,k,q,U){_();let B=U.attributes,z=q.getAttributes(),G=k.defaultAttributeValues;for(let se in z){let Y=z[se];if(Y.location>=0){let ee=B[se];if(ee===void 0&&(se==="instanceMatrix"&&O.instanceMatrix&&(ee=O.instanceMatrix),se==="instanceColor"&&O.instanceColor&&(ee=O.instanceColor)),ee!==void 0){let ae=ee.normalized,ke=ee.itemSize,Be=e.get(ee);if(Be===void 0)continue;let Dt=Be.buffer,Qe=Be.type,yt=Be.bytesPerElement,Q=Qe===s.INT||Qe===s.UNSIGNED_INT||ee.gpuType===lc;if(ee.isInterleavedBufferAttribute){let ne=ee.data,Te=ne.stride,Ze=ee.offset;if(ne.isInstancedInterleavedBuffer){for(let Ge=0;Ge<Y.locationSize;Ge++)m(Y.location+Ge,ne.meshPerAttribute);O.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let Ge=0;Ge<Y.locationSize;Ge++)g(Y.location+Ge);s.bindBuffer(s.ARRAY_BUFFER,Dt);for(let Ge=0;Ge<Y.locationSize;Ge++)b(Y.location+Ge,ke/Y.locationSize,Qe,ae,Te*yt,(Ze+ke/Y.locationSize*Ge)*yt,Q)}else{if(ee.isInstancedBufferAttribute){for(let ne=0;ne<Y.locationSize;ne++)m(Y.location+ne,ee.meshPerAttribute);O.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ne=0;ne<Y.locationSize;ne++)g(Y.location+ne);s.bindBuffer(s.ARRAY_BUFFER,Dt);for(let ne=0;ne<Y.locationSize;ne++)b(Y.location+ne,ke/Y.locationSize,Qe,ae,ke*yt,ke/Y.locationSize*ne*yt,Q)}}else if(G!==void 0){let ae=G[se];if(ae!==void 0)switch(ae.length){case 2:s.vertexAttrib2fv(Y.location,ae);break;case 3:s.vertexAttrib3fv(Y.location,ae);break;case 4:s.vertexAttrib4fv(Y.location,ae);break;default:s.vertexAttrib1fv(Y.location,ae)}}}}y()}function A(){R();for(let O in n){let k=n[O];for(let q in k){let U=k[q];for(let B in U){let z=U[B];for(let G in z)h(z[G].object),delete z[G];delete U[B]}}delete n[O]}}function T(O){if(n[O.id]===void 0)return;let k=n[O.id];for(let q in k){let U=k[q];for(let B in U){let z=U[B];for(let G in z)h(z[G].object),delete z[G];delete U[B]}}delete n[O.id]}function L(O){for(let k in n){let q=n[k];for(let U in q){let B=q[U];if(B[O.id]===void 0)continue;let z=B[O.id];for(let G in z)h(z[G].object),delete z[G];delete B[O.id]}}}function S(O){for(let k in n){let q=n[k],U=O.isInstancedMesh===!0?O.id:0,B=q[U];if(B!==void 0){for(let z in B){let G=B[z];for(let se in G)h(G[se].object),delete G[se];delete B[z]}delete q[U],Object.keys(q).length===0&&delete n[k]}}}function R(){D(),o=!0,r!==i&&(r=i,c(r.object))}function D(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:D,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:S,releaseStatesOfProgram:L,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function pM(s,e,t){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function a(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function mM(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let L=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(L){return!(L!==Gn&&n.convert(L)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(L){let S=L===Ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==ei&&L!==kn&&!S&&n.convert(L)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(L){if(L==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Pe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Pe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:v,maxSamples:A,samples:T}}function gM(s){let e=this,t=null,n=0,i=!1,r=!1,o=new si,a=new mt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let p=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,m=s.get(d);if(!i||p===null||p.length===0||r&&!g)r?h(null):c();else{let y=r?0:n,b=y*4,v=m.clippingState||null;l.value=v,v=h(p,u,b,f);for(let A=0;A!==b;++A)v[A]=t[A];m.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,p){let _=d!==null?d.length:0,g=null;if(_!==0){if(g=l.value,p!==!0||g===null){let m=f+_*4,y=u.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<m)&&(g=new Float32Array(m));for(let b=0,v=f;b!==_;++b,v+=4)o.copy(d[b]).applyMatrix4(y,a),o.normal.toArray(g,v),g[v+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}var Ca=4,_M=6,xM=20,yM=256,Zc=new or,L0=new Oe,Rp=null,Cp=0,Pp=0,Ip=!1,vM=new E,no=new E,io=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:o=256,position:a=vM}=r;Rp=this._renderer.getRenderTarget(),Cp=this._renderer.getActiveCubeFace(),Pp=this._renderer.getActiveMipmapLevel(),Ip=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=U0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=N0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Rp,Cp,Pp),this._renderer.xr.enabled=Ip,e.scissorTest=!1,Ra(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Xi||e.mapping===Ns?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Rp=this._renderer.getRenderTarget(),Cp=this._renderer.getActiveCubeFace(),Pp=this._renderer.getActiveMipmapLevel(),Ip=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:jt,minFilter:jt,generateMipmaps:!1,type:Ri,format:Gn,colorSpace:Oo,depthBuffer:!1},i=D0(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=D0(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=SM(r)),this._blurMaterial=bM(r,e,t),this._ggxMaterial=MM(r,e,t)}return i}_compileMaterial(e){let t=new zt(new _t,e);this._renderer.compile(t,Zc)}_sceneToCubeUV(e,t,n,i,r){let l=new hn(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(L0),d.toneMapping=Ai,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new zt(new In,new Qt({name:"PMREM.Background",side:Cn,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,g=_.material,m=!1,y=e.background;y?y.isColor&&(g.color.copy(y),e.background=null,m=!0):(g.color.copy(L0),m=!0);for(let b=0;b<6;b++){let v=b%3;v===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[b],r.y,r.z)):v===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[b]));let A=this._cubeSize;Ra(i,v*A,b>2?A:0,A,A),d.setRenderTarget(i),m&&d.render(_,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=y}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Xi||e.mapping===Ns;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=U0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=N0());let r=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;Ra(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Zc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let i=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:p}=this,_=this._sizeLods[n],g=3*_*(n>p-Ca?n-p+Ca:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,Ra(r,g,m,3*_,2*_),i.setRenderTarget(r),i.render(a,Zc),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,Ra(e,g,m,3*_,2*_),i.setRenderTarget(e),i.render(a,Zc)}_blur(e,t,n,i){let r=this._pingPongRenderTarget,o=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,o),this._blurPass(r,e,n,n,o)}_blurPass(e,t,n,i,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[i];l.material=a;let c=a.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[i],d=3*h*(i>this._lodMax-Ca?i-this._lodMax+Ca:0),u=4*(this._cubeSize-h);Ra(t,d,u,3*h,2*h),o.setRenderTarget(t),o.render(l,Zc)}};function SM(s){let e=[],t=[],n=s,i=s-Ca+1+_M;for(let r=0;r<i;r++){let o=Math.pow(2,n);e.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,p=new Float32Array(f*u*d),_=new Float32Array(f*u*d);for(let m=0;m<d;m++){let y=m%3*2/3-1,b=m>2?0:-1,v=[y,b,0,y+2/3,b,0,y+2/3,b+1,0,y,b,0,y+2/3,b+1,0,y,b+1,0];p.set(v,f*u*m);for(let A=0;A<u;A++){let T=h[A*2]*2-1,L=h[A*2+1]*2-1;m===0?no.set(1,L,T):m===1?no.set(-T,1,-L):m===2?no.set(-T,L,1):m===3?no.set(-1,L,-T):m===4?no.set(-T,-1,L):no.set(T,L,-1),no.toArray(_,(m*u+A)*f)}}let g=new _t;g.setAttribute("position",new qt(p,f)),g.setAttribute("outputDirection",new qt(_,f)),t.push(new zt(g,null)),n>Ca&&n--}return{lodMeshes:t,sizeLods:e}}function D0(s,e,t){let n=new Pn(s,e,t);return n.texture.mapping=$r,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ra(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function MM(s,e,t){return new Ln({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:yM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Md(),fragmentShader:`

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
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function bM(s,e,t){return new Ln({name:"SphericalGaussianBlur",defines:{SAMPLES:xM,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Md(),fragmentShader:`

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
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function N0(){return new Ln({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Md(),fragmentShader:`

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
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function U0(){return new Ln({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Md(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function Md(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var $c=class extends Pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new $s(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new In(5,5,5),r=new Ln({name:"CubemapFromEquirect",uniforms:to(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Cn,blending:Wi});r.uniforms.tEquirect.value=t;let o=new zt(i,r),a=t.minFilter;return t.minFilter===Yi&&(t.minFilter=jt),new ec(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}};function EM(s){let e=new WeakMap,t=new WeakMap,n=null;function i(u,f=!1){return u==null?null:f?o(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===_a||f===xa)if(e.has(u)){let p=e.get(u).texture;return a(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let _=new $c(p.height);return _.fromEquirectangularTexture(s,u),e.set(u,_),u.addEventListener("dispose",c),a(_.texture,u.mapping)}else return null}}return u}function o(u){if(u&&u.isTexture){let f=u.mapping,p=f===_a||f===xa,_=f===Xi||f===Ns;if(p||_){let g=t.get(u),m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new io(s)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let y=u.image;return p&&y&&y.height>0||_&&y&&l(y)?(n===null&&(n=new io(s)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function a(u,f){return f===_a?u.mapping=Xi:f===xa&&(u.mapping=Ns),u}function l(u){let f=0,p=6;for(let _=0;_<p;_++)u[_]!==void 0&&f++;return f===p}function c(u){let f=u.target;f.removeEventListener("dispose",c);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function wM(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Qi("WebGLRenderer: "+n+" extension not supported."),i}}}function TM(s,e,t,n){let i={},r=new WeakMap;function o(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let p in u.attributes)e.remove(u.attributes[p]);u.removeEventListener("dispose",o),delete i[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],s.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,p=d.attributes.position,_=0;if(p===void 0)return;if(f!==null){let y=f.array;_=f.version;for(let b=0,v=y.length;b<v;b+=3){let A=y[b+0],T=y[b+1],L=y[b+2];u.push(A,T,T,L,L,A)}}else{let y=p.array;_=p.version;for(let b=0,v=y.length/3-1;b<v;b+=3){let A=b+0,T=b+1,L=b+2;u.push(A,T,T,L,L,A)}}let g=new(p.count>=65535?Go:ko)(u,1);g.version=_;let m=r.get(d);m&&e.remove(m),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function AM(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,u){s.drawElements(n,u,r,d*o),t.update(u,n,1)}function c(d,u,f){f!==0&&(s.drawElementsInstanced(n,u,r,d*o,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let _=0;for(let g=0;g<f;g++)_+=u[g];t.update(_,n,1)}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function RM(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:je("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function CM(s,e,t){let n=new WeakMap,i=new Ut;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(a);if(u===void 0||u.count!==d){let R=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",R)};u!==void 0&&u.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],b=0;f===!0&&(b=1),p===!0&&(b=2),_===!0&&(b=3);let v=a.attributes.position.count*b,A=1;v>e.maxTextureSize&&(A=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let T=new Float32Array(v*A*4*d),L=new Rr(T,v,A,d);L.type=kn,L.needsUpdate=!0;let S=b*4;for(let D=0;D<d;D++){let O=g[D],k=m[D],q=y[D],U=v*A*4*D;for(let B=0;B<O.count;B++){let z=B*S;f===!0&&(i.fromBufferAttribute(O,B),T[U+z+0]=i.x,T[U+z+1]=i.y,T[U+z+2]=i.z,T[U+z+3]=0),p===!0&&(i.fromBufferAttribute(k,B),T[U+z+4]=i.x,T[U+z+5]=i.y,T[U+z+6]=i.z,T[U+z+7]=0),_===!0&&(i.fromBufferAttribute(q,B),T[U+z+8]=i.x,T[U+z+9]=i.y,T[U+z+10]=i.z,T[U+z+11]=q.itemSize===4?i.w:1)}}u={count:d,texture:L,size:new le(v,A)},n.set(a,u),a.addEventListener("dispose",R)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function PM(s,e,t,n,i){let r=new WeakMap;function o(c){let h=i.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var IM={[sd]:"LINEAR_TONE_MAPPING",[rd]:"REINHARD_TONE_MAPPING",[od]:"CINEON_TONE_MAPPING",[ga]:"ACES_FILMIC_TONE_MAPPING",[ld]:"AGX_TONE_MAPPING",[cd]:"NEUTRAL_TONE_MAPPING",[ad]:"CUSTOM_TONE_MAPPING"};function LM(s,e,t,n,i,r){let o=new Pn(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new _t;c.setAttribute("position",new ze([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ze([0,2,0,0,2,0],2));let h=new ea({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new zt(c,h),u=new or(-1,1,1,-1,0,1),f=null,p=null,_=!1,g,m=null,y=[],b=!1;this.setSize=function(v,A){o.setSize(v,A),a!==null&&a.setSize(v,A),l!==null&&l.setSize(v,A);for(let T=0;T<y.length;T++){let L=y[T];L.setSize&&L.setSize(v,A)}},this.setEffects=function(v){y=v,b=y.length>0&&y[0].isRenderPass===!0;let A=o.width,T=o.height;y.length>0&&a===null&&(a=new Pn(A,T,{type:Ri,depthBuffer:!1,stencilBuffer:!1}),l=new Pn(A,T,{type:Ri,depthBuffer:!1,stencilBuffer:!1}));for(let L=0;L<y.length;L++){let S=y[L];S.setSize&&S.setSize(A,T)}},this.begin=function(v,A){if(_||v.toneMapping===Ai&&y.length===0)return!1;if(m=A,A!==null){let T=A.width,L=A.height;(o.width!==T||o.height!==L)&&this.setSize(T,L)}return b===!1&&v.setRenderTarget(o),g=v.toneMapping,v.toneMapping=Ai,!0},this.hasRenderPass=function(){return b},this.end=function(v,A){v.toneMapping=g,_=!0;let T=o,L=a;for(let S=0;S<y.length;S++){let R=y[S];R.enabled!==!1&&(R.render(v,L,T,A),R.needsSwap!==!1&&(T=L,L=L===a?l:a))}if(f!==v.outputColorSpace||p!==v.toneMapping){f=v.outputColorSpace,p=v.toneMapping,h.defines={},Ct.getTransfer(f)===Wt&&(h.defines.SRGB_TRANSFER="");let S=IM[p];S&&(h.defines[S]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=T.texture,v.setRenderTarget(m),v.render(d,u),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var t_=new dn,Np=new ws(1,1),n_=new Rr,i_=new Cr,s_=new $s,F0=[],O0=[],B0=new Float32Array(16),z0=new Float32Array(9),V0=new Float32Array(4);function Ia(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=F0[i];if(r===void 0&&(r=new Float32Array(i),F0[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function bn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function En(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function bd(s,e){let t=O0[e];t===void 0&&(t=new Int32Array(e),O0[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function DM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function NM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bn(t,e))return;s.uniform2fv(this.addr,e),En(t,e)}}function UM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(bn(t,e))return;s.uniform3fv(this.addr,e),En(t,e)}}function FM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bn(t,e))return;s.uniform4fv(this.addr,e),En(t,e)}}function OM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(bn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),En(t,e)}else{if(bn(t,n))return;V0.set(n),s.uniformMatrix2fv(this.addr,!1,V0),En(t,n)}}function BM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(bn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),En(t,e)}else{if(bn(t,n))return;z0.set(n),s.uniformMatrix3fv(this.addr,!1,z0),En(t,n)}}function zM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(bn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),En(t,e)}else{if(bn(t,n))return;B0.set(n),s.uniformMatrix4fv(this.addr,!1,B0),En(t,n)}}function VM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function HM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bn(t,e))return;s.uniform2iv(this.addr,e),En(t,e)}}function kM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bn(t,e))return;s.uniform3iv(this.addr,e),En(t,e)}}function GM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bn(t,e))return;s.uniform4iv(this.addr,e),En(t,e)}}function WM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function XM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(bn(t,e))return;s.uniform2uiv(this.addr,e),En(t,e)}}function YM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(bn(t,e))return;s.uniform3uiv(this.addr,e),En(t,e)}}function qM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(bn(t,e))return;s.uniform4uiv(this.addr,e),En(t,e)}}function ZM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Np.compareFunction=t.isReversedDepthBuffer()?Yc:Xc,r=Np):r=t_,t.setTexture2D(e||r,i)}function JM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||i_,i)}function KM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||s_,i)}function $M(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||n_,i)}function jM(s){switch(s){case 5126:return DM;case 35664:return NM;case 35665:return UM;case 35666:return FM;case 35674:return OM;case 35675:return BM;case 35676:return zM;case 5124:case 35670:return VM;case 35667:case 35671:return HM;case 35668:case 35672:return kM;case 35669:case 35673:return GM;case 5125:return WM;case 36294:return XM;case 36295:return YM;case 36296:return qM;case 35678:case 36198:case 36298:case 36306:case 35682:return ZM;case 35679:case 36299:case 36307:return JM;case 35680:case 36300:case 36308:case 36293:return KM;case 36289:case 36303:case 36311:case 36292:return $M}}function QM(s,e){s.uniform1fv(this.addr,e)}function eb(s,e){let t=Ia(e,this.size,2);s.uniform2fv(this.addr,t)}function tb(s,e){let t=Ia(e,this.size,3);s.uniform3fv(this.addr,t)}function nb(s,e){let t=Ia(e,this.size,4);s.uniform4fv(this.addr,t)}function ib(s,e){let t=Ia(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function sb(s,e){let t=Ia(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function rb(s,e){let t=Ia(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function ob(s,e){s.uniform1iv(this.addr,e)}function ab(s,e){s.uniform2iv(this.addr,e)}function lb(s,e){s.uniform3iv(this.addr,e)}function cb(s,e){s.uniform4iv(this.addr,e)}function hb(s,e){s.uniform1uiv(this.addr,e)}function ub(s,e){s.uniform2uiv(this.addr,e)}function db(s,e){s.uniform3uiv(this.addr,e)}function fb(s,e){s.uniform4uiv(this.addr,e)}function pb(s,e,t){let n=this.cache,i=e.length,r=bd(t,i);bn(n,r)||(s.uniform1iv(this.addr,r),En(n,r));let o;this.type===s.SAMPLER_2D_SHADOW?o=Np:o=t_;for(let a=0;a!==i;++a)t.setTexture2D(e[a]||o,r[a])}function mb(s,e,t){let n=this.cache,i=e.length,r=bd(t,i);bn(n,r)||(s.uniform1iv(this.addr,r),En(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||i_,r[o])}function gb(s,e,t){let n=this.cache,i=e.length,r=bd(t,i);bn(n,r)||(s.uniform1iv(this.addr,r),En(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||s_,r[o])}function _b(s,e,t){let n=this.cache,i=e.length,r=bd(t,i);bn(n,r)||(s.uniform1iv(this.addr,r),En(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||n_,r[o])}function xb(s){switch(s){case 5126:return QM;case 35664:return eb;case 35665:return tb;case 35666:return nb;case 35674:return ib;case 35675:return sb;case 35676:return rb;case 5124:case 35670:return ob;case 35667:case 35671:return ab;case 35668:case 35672:return lb;case 35669:case 35673:return cb;case 5125:return hb;case 36294:return ub;case 36295:return db;case 36296:return fb;case 35678:case 36198:case 36298:case 36306:case 35682:return pb;case 35679:case 36299:case 36307:return mb;case 35680:case 36300:case 36308:case 36293:return gb;case 36289:case 36303:case 36311:case 36292:return _b}}var Up=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=jM(t.type)}},Fp=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=xb(t.type)}},Op=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},Lp=/(\w+)(\])?(\[|\.)?/g;function H0(s,e){s.seq.push(e),s.map[e.id]=e}function yb(s,e,t){let n=s.name,i=n.length;for(Lp.lastIndex=0;;){let r=Lp.exec(n),o=Lp.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){H0(t,c===void 0?new Up(a,s,e):new Fp(a,s,e));break}else{let d=t.map[a];d===void 0&&(d=new Op(a),H0(t,d)),t=d}}}var Pa=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);yb(a,l,this)}let i=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(o):r.push(o);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function k0(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var vb=37297,Sb=0;function Mb(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var G0=new mt;function bb(s){Ct._getMatrix(G0,Ct.workingColorSpace,s);let e=`mat3( ${G0.elements.map(t=>t.toFixed(4))} )`;switch(Ct.getTransfer(s)){case Bo:return[e,"LinearTransferOETF"];case Wt:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function W0(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+Mb(s.getShaderSource(e),a)}else return r}function Eb(s,e){let t=bb(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var wb={[sd]:"Linear",[rd]:"Reinhard",[od]:"Cineon",[ga]:"ACESFilmic",[ld]:"AgX",[cd]:"Neutral",[ad]:"Custom"};function Tb(s,e){let t=wb[e];return t===void 0?(Pe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Sd=new E;function Ab(){Ct.getLuminanceCoefficients(Sd);let s=Sd.x.toFixed(4),e=Sd.y.toFixed(4),t=Sd.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Rb(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Kc).join(`
`)}function Cb(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Pb(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Kc(s){return s!==""}function X0(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Y0(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Ib=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bp(s){return s.replace(Ib,Db)}var Lb=new Map;function Db(s,e){let t=wt[e];if(t===void 0){let n=Lb.get(e);if(n!==void 0)t=wt[n],Pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Bp(t)}var Nb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function q0(s){return s.replace(Nb,Ub)}function Ub(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Z0(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}var Fb={[fa]:"SHADOWMAP_TYPE_PCF",[Jr]:"SHADOWMAP_TYPE_VSM"};function Ob(s){return Fb[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Bb={[Xi]:"ENVMAP_TYPE_CUBE",[Ns]:"ENVMAP_TYPE_CUBE",[$r]:"ENVMAP_TYPE_CUBE_UV"};function zb(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":Bb[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var Vb={[Ns]:"ENVMAP_MODE_REFRACTION"};function Hb(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Vb[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var kb={[ma]:"ENVMAP_BLENDING_MULTIPLY",[op]:"ENVMAP_BLENDING_MIX",[ap]:"ENVMAP_BLENDING_ADD"};function Gb(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":kb[s.combine]||"ENVMAP_BLENDING_NONE"}function Wb(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Xb(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=Ob(t),c=zb(t),h=Hb(t),d=Gb(t),u=Wb(t),f=Rb(t),p=Cb(r),_=i.createProgram(),g,m,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Kc).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Kc).join(`
`),m.length>0&&(m+=`
`)):(g=[Z0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Kc).join(`
`),m=[Z0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ai?"#define TONE_MAPPING":"",t.toneMapping!==Ai?wt.tonemapping_pars_fragment:"",t.toneMapping!==Ai?Tb("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",wt.colorspace_pars_fragment,Eb("linearToOutputTexel",t.outputColorSpace),Ab(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Kc).join(`
`)),o=Bp(o),o=X0(o,t),o=Y0(o,t),a=Bp(a),a=X0(a,t),a=Y0(a,t),o=q0(o),a=q0(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===xd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===xd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let b=y+g+o,v=y+m+a,A=k0(i,i.VERTEX_SHADER,b),T=k0(i,i.FRAGMENT_SHADER,v);i.attachShader(_,A),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function L(O){if(s.debug.checkShaderErrors){let k=i.getProgramInfoLog(_)||"",q=i.getShaderInfoLog(A)||"",U=i.getShaderInfoLog(T)||"",B=k.trim(),z=q.trim(),G=U.trim(),se=!0,Y=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(se=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,A,T);else{let ee=W0(i,A,"vertex"),ae=W0(i,T,"fragment");je("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+B+`
`+ee+`
`+ae)}else B!==""?Pe("WebGLProgram: Program Info Log:",B):(z===""||G==="")&&(Y=!1);Y&&(O.diagnostics={runnable:se,programLog:B,vertexShader:{log:z,prefix:g},fragmentShader:{log:G,prefix:m}})}i.deleteShader(A),i.deleteShader(T),S=new Pa(i,_),R=Pb(i,_)}let S;this.getUniforms=function(){return S===void 0&&L(this),S};let R;this.getAttributes=function(){return R===void 0&&L(this),R};let D=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=i.getProgramParameter(_,vb)),D},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Sb++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=T,this}var Yb=0,zp=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Vp(e),t.set(e,n)),n}},Vp=class{constructor(e){this.id=Yb++,this.code=e,this.usedTimes=0}};function qb(s){return s===Fs||s===wa||s===Ta}function Zb(s,e,t,n,i,r){let o=new Pr,a=new zp,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(S){return l.add(S),S===0?"uv":`uv${S}`}function _(S,R,D,O,k,q){let U=O.fog,B=k.geometry,z=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?O.environment:null,G=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap,se=e.get(S.envMap||z,G),Y=se&&se.mapping===$r?se.image.height:null,ee=f[S.type];S.precision!==null&&(u=n.getMaxPrecision(S.precision),u!==S.precision&&Pe("WebGLProgram.getParameters:",S.precision,"not supported, using",u,"instead."));let ae=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ke=ae!==void 0?ae.length:0,Be=0;B.morphAttributes.position!==void 0&&(Be=1),B.morphAttributes.normal!==void 0&&(Be=2),B.morphAttributes.color!==void 0&&(Be=3);let Dt,Qe,yt,Q;if(ee){let Et=Yn[ee];Dt=Et.vertexShader,Qe=Et.fragmentShader}else{Dt=S.vertexShader,Qe=S.fragmentShader;let Et=a.getVertexShaderStage(S),It=a.getFragmentShaderStage(S);a.update(S,Et,It),yt=Et.id,Q=It.id}let ne=s.getRenderTarget(),Te=s.state.buffers.depth.getReversed(),Ze=k.isInstancedMesh===!0,Ge=k.isBatchedMesh===!0,ct=!!S.map,kt=!!S.matcap,ce=!!se,pe=!!S.aoMap,_e=!!S.lightMap,xe=!!S.bumpMap&&S.wireframe===!1,Ee=!!S.normalMap,ot=!!S.displacementMap,it=!!S.emissiveMap,lt=!!S.metalnessMap,dt=!!S.roughnessMap,F=S.anisotropy>0,Pt=S.clearcoat>0,vt=S.dispersion>0,I=S.retroreflectivity>0,M=S.iridescence>0,X=S.sheen>0,J=S.transmission>0,ie=F&&!!S.anisotropyMap,ve=Pt&&!!S.clearcoatMap,we=Pt&&!!S.clearcoatNormalMap,re=Pt&&!!S.clearcoatRoughnessMap,ue=M&&!!S.iridescenceMap,Ce=M&&!!S.iridescenceThicknessMap,et=X&&!!S.sheenColorMap,Le=X&&!!S.sheenRoughnessMap,Ie=!!S.specularMap,tt=!!S.specularColorMap,rt=!!S.specularIntensityMap,gt=J&&!!S.transmissionMap,H=J&&!!S.thicknessMap,me=!!S.gradientMap,j=!!S.alphaMap,be=S.alphaTest>0,Ae=!!S.alphaHash,oe=!!S.extensions,Xe=Ai;S.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Xe=s.toneMapping);let Je={shaderID:ee,shaderType:S.type,shaderName:S.name,vertexShader:Dt,fragmentShader:Qe,defines:S.defines,customVertexShaderID:yt,customFragmentShaderID:Q,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:u,batching:Ge,batchingColor:Ge&&k._colorsTexture!==null,instancing:Ze,instancingColor:Ze&&k.instanceColor!==null,instancingMorph:Ze&&k.morphTexture!==null,outputColorSpace:ne===null?s.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ct.workingColorSpace,alphaToCoverage:!!S.alphaToCoverage,map:ct,matcap:kt,envMap:ce,envMapMode:ce&&se.mapping,envMapCubeUVHeight:Y,aoMap:pe,lightMap:_e,bumpMap:xe,normalMap:Ee,displacementMap:ot,emissiveMap:it,normalMapObjectSpace:Ee&&S.normalMapType===fp,normalMapTangentSpace:Ee&&S.normalMapType===ss,packedNormalMap:Ee&&S.normalMapType===ss&&qb(S.normalMap.format),metalnessMap:lt,roughnessMap:dt,anisotropy:F,anisotropyMap:ie,clearcoat:Pt,clearcoatMap:ve,clearcoatNormalMap:we,clearcoatRoughnessMap:re,dispersion:vt,retroreflection:I,iridescence:M,iridescenceMap:ue,iridescenceThicknessMap:Ce,sheen:X,sheenColorMap:et,sheenRoughnessMap:Le,specularMap:Ie,specularColorMap:tt,specularIntensityMap:rt,transmission:J,transmissionMap:gt,thicknessMap:H,gradientMap:me,opaque:S.transparent===!1&&S.blending===Kr&&S.alphaToCoverage===!1,alphaMap:j,alphaTest:be,alphaHash:Ae,combine:S.combine,mapUv:ct&&p(S.map.channel),aoMapUv:pe&&p(S.aoMap.channel),lightMapUv:_e&&p(S.lightMap.channel),bumpMapUv:xe&&p(S.bumpMap.channel),normalMapUv:Ee&&p(S.normalMap.channel),displacementMapUv:ot&&p(S.displacementMap.channel),emissiveMapUv:it&&p(S.emissiveMap.channel),metalnessMapUv:lt&&p(S.metalnessMap.channel),roughnessMapUv:dt&&p(S.roughnessMap.channel),anisotropyMapUv:ie&&p(S.anisotropyMap.channel),clearcoatMapUv:ve&&p(S.clearcoatMap.channel),clearcoatNormalMapUv:we&&p(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&p(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&p(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&p(S.iridescenceThicknessMap.channel),sheenColorMapUv:et&&p(S.sheenColorMap.channel),sheenRoughnessMapUv:Le&&p(S.sheenRoughnessMap.channel),specularMapUv:Ie&&p(S.specularMap.channel),specularColorMapUv:tt&&p(S.specularColorMap.channel),specularIntensityMapUv:rt&&p(S.specularIntensityMap.channel),transmissionMapUv:gt&&p(S.transmissionMap.channel),thicknessMapUv:H&&p(S.thicknessMap.channel),alphaMapUv:j&&p(S.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Ee||F),vertexNormals:!!B.attributes.normal,vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!B.attributes.uv&&(ct||j),fog:!!U,useFog:S.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:S.wireframe===!1&&(S.flatShading===!0||B.attributes.normal===void 0&&Ee===!1&&(S.isMeshLambertMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isMeshPhysicalMaterial)),sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Te,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:ke,morphTextureStride:Be,numSunLights:R.sun.length,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numSunLightShadows:R.sunShadowMap.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:q.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:S.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:Xe,decodeVideoTexture:ct&&S.map.isVideoTexture===!0&&Ct.getTransfer(S.map.colorSpace)===Wt,decodeVideoTextureEmissive:it&&S.emissiveMap.isVideoTexture===!0&&Ct.getTransfer(S.emissiveMap.colorSpace)===Wt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===mi,flipSided:S.side===Cn,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:oe&&S.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(oe&&S.extensions.multiDraw===!0||Ge)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Je.vertexUv1s=l.has(1),Je.vertexUv2s=l.has(2),Je.vertexUv3s=l.has(3),l.clear(),Je}function g(S){let R=[];if(S.shaderID?R.push(S.shaderID):(R.push(S.customVertexShaderID),R.push(S.customFragmentShaderID)),S.defines!==void 0)for(let D in S.defines)R.push(D),R.push(S.defines[D]);return S.isRawShaderMaterial===!1&&(m(R,S),y(R,S),R.push(s.outputColorSpace)),R.push(S.customProgramCacheKey),R.join()}function m(S,R){S.push(R.precision),S.push(R.outputColorSpace),S.push(R.envMapMode),S.push(R.envMapCubeUVHeight),S.push(R.mapUv),S.push(R.alphaMapUv),S.push(R.lightMapUv),S.push(R.aoMapUv),S.push(R.bumpMapUv),S.push(R.normalMapUv),S.push(R.displacementMapUv),S.push(R.emissiveMapUv),S.push(R.metalnessMapUv),S.push(R.roughnessMapUv),S.push(R.anisotropyMapUv),S.push(R.clearcoatMapUv),S.push(R.clearcoatNormalMapUv),S.push(R.clearcoatRoughnessMapUv),S.push(R.iridescenceMapUv),S.push(R.iridescenceThicknessMapUv),S.push(R.sheenColorMapUv),S.push(R.sheenRoughnessMapUv),S.push(R.specularMapUv),S.push(R.specularColorMapUv),S.push(R.specularIntensityMapUv),S.push(R.transmissionMapUv),S.push(R.thicknessMapUv),S.push(R.combine),S.push(R.fogExp2),S.push(R.sizeAttenuation),S.push(R.morphTargetsCount),S.push(R.morphAttributeCount),S.push(R.numSunLights),S.push(R.numDirLights),S.push(R.numPointLights),S.push(R.numSpotLights),S.push(R.numSpotLightMaps),S.push(R.numHemiLights),S.push(R.numRectAreaLights),S.push(R.numSunLightShadows),S.push(R.numDirLightShadows),S.push(R.numPointLightShadows),S.push(R.numSpotLightShadows),S.push(R.numSpotLightShadowsWithMaps),S.push(R.numLightProbes),S.push(R.shadowMapType),S.push(R.toneMapping),S.push(R.numClippingPlanes),S.push(R.numClipIntersection),S.push(R.depthPacking)}function y(S,R){o.disableAll(),R.instancing&&o.enable(0),R.instancingColor&&o.enable(1),R.instancingMorph&&o.enable(2),R.matcap&&o.enable(3),R.envMap&&o.enable(4),R.normalMapObjectSpace&&o.enable(5),R.normalMapTangentSpace&&o.enable(6),R.clearcoat&&o.enable(7),R.iridescence&&o.enable(8),R.alphaTest&&o.enable(9),R.vertexColors&&o.enable(10),R.vertexAlphas&&o.enable(11),R.vertexUv1s&&o.enable(12),R.vertexUv2s&&o.enable(13),R.vertexUv3s&&o.enable(14),R.vertexTangents&&o.enable(15),R.anisotropy&&o.enable(16),R.alphaHash&&o.enable(17),R.batching&&o.enable(18),R.dispersion&&o.enable(19),R.retroreflection&&o.enable(24),R.batchingColor&&o.enable(20),R.gradientMap&&o.enable(21),R.packedNormalMap&&o.enable(22),R.vertexNormals&&o.enable(23),S.push(o.mask),o.disableAll(),R.fog&&o.enable(0),R.useFog&&o.enable(1),R.flatShading&&o.enable(2),R.logarithmicDepthBuffer&&o.enable(3),R.reversedDepthBuffer&&o.enable(4),R.skinning&&o.enable(5),R.morphTargets&&o.enable(6),R.morphNormals&&o.enable(7),R.morphColors&&o.enable(8),R.premultipliedAlpha&&o.enable(9),R.shadowMapEnabled&&o.enable(10),R.doubleSided&&o.enable(11),R.flipSided&&o.enable(12),R.useDepthPacking&&o.enable(13),R.dithering&&o.enable(14),R.transmission&&o.enable(15),R.sheen&&o.enable(16),R.opaque&&o.enable(17),R.pointsUvs&&o.enable(18),R.decodeVideoTexture&&o.enable(19),R.decodeVideoTextureEmissive&&o.enable(20),R.alphaToCoverage&&o.enable(21),R.numLightProbeGrids>0&&o.enable(22),R.hasPositionAttribute&&o.enable(23),S.push(o.mask)}function b(S){let R=f[S.type],D;if(R){let O=Yn[R];D=Aa.clone(O.uniforms)}else D=S.uniforms;return D}function v(S,R){let D=h.get(R);return D!==void 0?++D.usedTimes:(D=new Xb(s,R,S,i),c.push(D),h.set(R,D)),D}function A(S){if(--S.usedTimes===0){let R=c.indexOf(S);c[R]=c[c.length-1],c.pop(),h.delete(S.cacheKey),S.destroy()}}function T(S){a.remove(S)}function L(){a.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:b,acquireProgram:v,releaseProgram:A,releaseShaderCache:T,programs:c,dispose:L}}function Jb(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Kb(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function J0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function K0(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function a(u,f,p,_,g,m){let y=s[e];return y===void 0?(y={id:u.id,object:u,geometry:f,material:p,materialVariant:o(u),groupOrder:_,renderOrder:u.renderOrder,z:g,group:m},s[e]=y):(y.id=u.id,y.object=u,y.geometry=f,y.material=p,y.materialVariant=o(u),y.groupOrder=_,y.renderOrder=u.renderOrder,y.z=g,y.group=m),e++,y}function l(u,f,p,_,g,m,y){y.reversedDepth===!0&&(g=-g);let b=a(u,f,p,_,g,m);p.transmission>0?n.push(b):p.transparent===!0?i.push(b):t.push(b)}function c(u,f,p,_,g,m){let y=a(u,f,p,_,g,m);p.transmission>0?n.unshift(y):p.transparent===!0?i.unshift(y):t.unshift(y)}function h(u,f){t.length>1&&t.sort(u||Kb),n.length>1&&n.sort(f||J0),i.length>1&&i.sort(f||J0)}function d(){for(let u=e,f=s.length;u<f;u++){let p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:d,sort:h}}function $b(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new K0,s.set(n,[o])):i>=r.length?(o=new K0,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function jb(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new E,color:new Oe};break;case"SpotLight":t={position:new E,direction:new E,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new E,halfWidth:new E,halfHeight:new E};break}return s[e.id]=t,t}}}function Qb(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var eE=0;function tE(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function nE(s){let e=new jb,t=Qb(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new E);let i=new E,r=new ut,o=new ut;function a(c){let h=0,d=0,u=0;for(let k=0;k<9;k++)n.probe[k].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,y=0,b=0,v=0,A=0,T=0,L=0,S=0,R=0,D=0;c.sort(tE);for(let k=0,q=c.length;k<q;k++){let U=c[k],B=U.color,z=U.intensity,G=U.distance,se=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===Fs?se=U.shadow.map.texture:se=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)h+=B.r*z,d+=B.g*z,u+=B.b*z;else if(U.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(U.sh.coefficients[Y],z);D++}else if(U.isSunLight){let Y=e.get(U);if(Y.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let ee=U.shadow,ae=t.get(U);ae.shadowIntensity=ee.intensity,ae.shadowBias=ee.bias,ae.shadowNormalBias=ee.normalBias,ae.shadowRadius=ee.radius,ae.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),n.sunShadow[p]=ae,n.sunShadowMap[p]=se;let ke=ee.getViewportCount();for(let Be=0;Be<ke;Be++)n.sunShadowMatrix[_+Be]=ee.getMatrix(Be),n.sunShadowCascade[_+Be]=ee._cascadeData[Be];_+=ke,p++}n.sun[f]=Y,f++}else if(U.isDirectionalLight){let Y=e.get(U);if(Y.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let ee=U.shadow,ae=t.get(U);ae.shadowIntensity=ee.intensity,ae.shadowBias=ee.bias,ae.shadowNormalBias=ee.normalBias,ae.shadowRadius=ee.radius,ae.shadowMapSize=ee.mapSize,n.directionalShadow[g]=ae,n.directionalShadowMap[g]=se,n.directionalShadowMatrix[g]=U.shadow.matrix,A++}n.directional[g]=Y,g++}else if(U.isSpotLight){let Y=e.get(U);Y.position.setFromMatrixPosition(U.matrixWorld),Y.color.copy(B).multiplyScalar(z),Y.distance=G,Y.coneCos=Math.cos(U.angle),Y.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),Y.decay=U.decay,n.spot[y]=Y;let ee=U.shadow;if(U.map&&(n.spotLightMap[S]=U.map,S++,ee.updateMatrices(U),U.castShadow&&R++),n.spotLightMatrix[y]=ee.matrix,U.castShadow){let ae=t.get(U);ae.shadowIntensity=ee.intensity,ae.shadowBias=ee.bias,ae.shadowNormalBias=ee.normalBias,ae.shadowRadius=ee.radius,ae.shadowMapSize=ee.mapSize,n.spotShadow[y]=ae,n.spotShadowMap[y]=se,L++}y++}else if(U.isRectAreaLight){let Y=e.get(U);Y.color.copy(B).multiplyScalar(z),Y.halfWidth.set(U.width*.5,0,0),Y.halfHeight.set(0,U.height*.5,0),n.rectArea[b]=Y,b++}else if(U.isPointLight){let Y=e.get(U);if(Y.color.copy(U.color).multiplyScalar(U.intensity),Y.distance=U.distance,Y.decay=U.decay,U.castShadow){let ee=U.shadow,ae=t.get(U);ae.shadowIntensity=ee.intensity,ae.shadowBias=ee.bias,ae.shadowNormalBias=ee.normalBias,ae.shadowRadius=ee.radius,ae.shadowMapSize=ee.mapSize,ae.shadowCameraNear=ee.camera.near,ae.shadowCameraFar=ee.camera.far,n.pointShadow[m]=ae,n.pointShadowMap[m]=se,n.pointShadowMatrix[m]=U.shadow.matrix,T++}n.point[m]=Y,m++}else if(U.isHemisphereLight){let Y=e.get(U);Y.skyColor.copy(U.color).multiplyScalar(z),Y.groundColor.copy(U.groundColor).multiplyScalar(z),n.hemi[v]=Y,v++}}b>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Re.LTC_FLOAT_1,n.rectAreaLTC2=Re.LTC_FLOAT_2):(n.rectAreaLTC1=Re.LTC_HALF_1,n.rectAreaLTC2=Re.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let O=n.hash;(O.sunLength!==f||O.directionalLength!==g||O.pointLength!==m||O.spotLength!==y||O.rectAreaLength!==b||O.hemiLength!==v||O.numSunShadows!==p||O.numDirectionalShadows!==A||O.numPointShadows!==T||O.numSpotShadows!==L||O.numSpotMaps!==S||O.numLightProbes!==D)&&(n.sun.length=f,n.directional.length=g,n.spot.length=y,n.rectArea.length=b,n.point.length=m,n.hemi.length=v,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=L,n.spotShadowMap.length=L,n.spotLightMatrix.length=L+S-R,n.spotLightMap.length=S,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=D,O.sunLength=f,O.directionalLength=g,O.pointLength=m,O.spotLength=y,O.rectAreaLength=b,O.hemiLength=v,O.numSunShadows=p,O.numDirectionalShadows=A,O.numPointShadows=T,O.numSpotShadows=L,O.numSpotMaps=S,O.numLightProbes=D,n.version=eE++)}function l(c,h){let d=0,u=0,f=0,p=0,_=0,g=0,m=h.matrixWorldInverse;for(let y=0,b=c.length;y<b;y++){let v=c[y];if(v.isSunLight){let A=n.sun[d];A.direction.setFromMatrixPosition(v.matrixWorld),A.direction.transformDirection(m),d++}else if(v.isDirectionalLight){let A=n.directional[u];A.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(m),u++}else if(v.isSpotLight){let A=n.spot[p];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(m),p++}else if(v.isRectAreaLight){let A=n.rectArea[_];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),A.halfWidth.set(v.width*.5,0,0),A.halfHeight.set(0,v.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){let A=n.point[f];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){let A=n.hemi[g];A.direction.setFromMatrixPosition(v.matrixWorld),A.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function $0(s){let e=new nE(s),t=[],n=[],i=[];function r(u){d.camera=u,t.length=0,n.length=0,i.length=0}function o(u){t.push(u)}function a(u){n.push(u)}function l(u){i.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function iE(s){let e=new WeakMap;function t(i,r=0){let o=e.get(i),a;return o===void 0?(a=new $0(s),e.set(i,[a])):r>=o.length?(a=new $0(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var sE=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rE=`uniform sampler2D shadow_pass;
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
}`,oE=[new E(1,0,0),new E(-1,0,0),new E(0,1,0),new E(0,-1,0),new E(0,0,1),new E(0,0,-1)],aE=[new E(0,-1,0),new E(0,-1,0),new E(0,0,1),new E(0,0,-1),new E(0,-1,0),new E(0,-1,0)],j0=new ut,Jc=new E,Dp=new E;function lE(s,e,t){let n=new es,i=new le,r=new le,o=new Ut,a=new ta,l=new na,c={},h=t.maxTextureSize,d={[Ds]:Cn,[Cn]:Ds,[mi]:mi},u=new Ln({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:sE,fragmentShader:rE}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let p=new _t;p.setAttribute("position",new qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new zt(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fa;let m=this.type;this.render=function(T,L,S){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===Hf&&(Pe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=fa);let R=s.getRenderTarget(),D=s.getActiveCubeFace(),O=s.getActiveMipmapLevel(),k=s.state;k.setBlending(Wi),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let q=m!==this.type;q&&L.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(B=>B.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,B=T.length;U<B;U++){let z=T[U],G=z.shadow;if(G===void 0){Pe("WebGLShadowMap:",z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);let se=G.getFrameExtents();i.multiply(se),r.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/se.x),i.x=r.x*se.x,G.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/se.y),i.y=r.y*se.y,G.mapSize.y=r.y));let Y=s.state.buffers.depth.getReversed();if(G.camera._reversedDepth=Y,G.map===null||q===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Jr){if(z.isPointLight){Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Pn(i.x,i.y,{format:Fs,type:Ri,minFilter:jt,magFilter:jt,generateMipmaps:!1}),G.map.texture.name=z.name+".shadowMap",G.map.depthTexture=new ws(i.x,i.y,kn),G.map.depthTexture.name=z.name+".shadowMapDepth",G.map.depthTexture.format=Bi,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=un,G.map.depthTexture.magFilter=un}else z.isPointLight?(G.map=new $c(i.x),G.map.depthTexture=new Tl(i.x,gi)):(G.map=new Pn(i.x,i.y),G.map.depthTexture=new ws(i.x,i.y,gi)),G.map.depthTexture.name=z.name+".shadowMap",G.map.depthTexture.format=Bi,this.type===fa?(G.map.depthTexture.compareFunction=Y?Yc:Xc,G.map.depthTexture.minFilter=jt,G.map.depthTexture.magFilter=jt):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=un,G.map.depthTexture.magFilter=un);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==i.x||G.map.height!==i.y)&&G.map.setSize(i.x,i.y);let ee=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();z.isPointLight!==!0&&G.updateMatrices(z,S);for(let ae=0;ae<ee;ae++){let ke=G.getCamera(ae);if(z.isPointLight){let Be=G.camera,Dt=G.matrix,Qe=z.distance||Be.far;Qe!==Be.far&&(Be.far=Qe,Be.updateProjectionMatrix()),Jc.setFromMatrixPosition(z.matrixWorld),Be.position.copy(Jc),Dp.copy(Be.position),Dp.add(oE[ae]),Be.up.copy(aE[ae]),Be.lookAt(Dp),Be.updateMatrixWorld(),Dt.makeTranslation(-Jc.x,-Jc.y,-Jc.z),j0.multiplyMatrices(Be.projectionMatrix,Be.matrixWorldInverse),G._frustum.setFromProjectionMatrix(j0,Be.coordinateSystem,Be.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)s.setRenderTarget(G.map,ae),s.clear();else{ae===0&&(s.setRenderTarget(G.map),s.clear());let Be=G.getViewport(ae);o.set(r.x*Be.x,r.y*Be.y,r.x*Be.z,r.y*Be.w),k.viewport(o)}n=G.getFrustum(ae),v(L,S,ke,z,this.type)}G.isPointLightShadow!==!0&&this.type===Jr&&y(G,S),G.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(R,D,O)};function y(T,L){let S=e.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new Pn(i.x,i.y,{format:Fs,type:Ri}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(L,null,S,u,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(L,null,S,f,_,null)}function b(T,L,S,R){let D=null,O=S.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(O!==void 0)D=O;else if(D=S.isPointLight===!0?l:a,s.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){let k=D.uuid,q=L.uuid,U=c[k];U===void 0&&(U={},c[k]=U);let B=U[q];B===void 0&&(B=D.clone(),U[q]=B,L.addEventListener("dispose",A)),D=B}if(D.visible=L.visible,D.wireframe=L.wireframe,R===Jr?D.side=L.shadowSide!==null?L.shadowSide:L.side:D.side=L.shadowSide!==null?L.shadowSide:d[L.side],D.alphaMap=L.alphaMap,D.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,D.map=L.map,D.clipShadows=L.clipShadows,D.clippingPlanes=L.clippingPlanes,D.clipIntersection=L.clipIntersection,D.displacementMap=L.displacementMap,D.displacementScale=L.displacementScale,D.displacementBias=L.displacementBias,D.wireframeLinewidth=L.wireframeLinewidth,D.linewidth=L.linewidth,S.isPointLight===!0&&D.isMeshDistanceMaterial===!0){let k=s.properties.get(D);k.light=S}return D}function v(T,L,S,R,D){if(T.visible===!1)return;if(T.layers.test(L.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&D===Jr)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,T.matrixWorld);let q=e.update(T),U=T.material;if(Array.isArray(U)){let B=q.groups;for(let z=0,G=B.length;z<G;z++){let se=B[z],Y=U[se.materialIndex];if(Y&&Y.visible){let ee=b(T,Y,R,D);T.onBeforeShadow(s,T,L,S,q,ee,se),s.renderBufferDirect(S,null,q,ee,T,se),T.onAfterShadow(s,T,L,S,q,ee,se)}}}else if(U.visible){let B=b(T,U,R,D);T.onBeforeShadow(s,T,L,S,q,B,null),s.renderBufferDirect(S,null,q,B,T,null),T.onAfterShadow(s,T,L,S,q,B,null)}}let k=T.children;for(let q=0,U=k.length;q<U;q++)v(k[q],L,S,R,D)}function A(T){T.target.removeEventListener("dispose",A);for(let S in c){let R=c[S],D=T.target.uuid;D in R&&(R[D].dispose(),delete R[D])}}}function cE(s,e){function t(){let H=!1,me=new Ut,j=null,be=new Ut(0,0,0,0);return{setMask:function(Ae){j!==Ae&&!H&&(s.colorMask(Ae,Ae,Ae,Ae),j=Ae)},setLocked:function(Ae){H=Ae},setClear:function(Ae,oe,Xe,Je,Et){Et===!0&&(Ae*=Je,oe*=Je,Xe*=Je),me.set(Ae,oe,Xe,Je),be.equals(me)===!1&&(s.clearColor(Ae,oe,Xe,Je),be.copy(me))},reset:function(){H=!1,j=null,be.set(-1,0,0,0)}}}function n(){let H=!1,me=!1,j=null,be=null,Ae=null;return{setReversed:function(oe){if(me!==oe){let Xe=e.get("EXT_clip_control");oe?Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.ZERO_TO_ONE_EXT):Xe.clipControlEXT(Xe.LOWER_LEFT_EXT,Xe.NEGATIVE_ONE_TO_ONE_EXT),me=oe;let Je=Ae;Ae=null,this.setClear(Je)}},getReversed:function(){return me},setTest:function(oe){oe?ne(s.DEPTH_TEST):Te(s.DEPTH_TEST)},setMask:function(oe){j!==oe&&!H&&(s.depthMask(oe),j=oe)},setFunc:function(oe){if(me&&(oe=S0[oe]),be!==oe){switch(oe){case al:s.depthFunc(s.NEVER);break;case ll:s.depthFunc(s.ALWAYS);break;case cl:s.depthFunc(s.LESS);break;case Tr:s.depthFunc(s.LEQUAL);break;case hl:s.depthFunc(s.EQUAL);break;case ul:s.depthFunc(s.GEQUAL);break;case dl:s.depthFunc(s.GREATER);break;case fl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}be=oe}},setLocked:function(oe){H=oe},setClear:function(oe){Ae!==oe&&(Ae=oe,me&&(oe=1-oe),s.clearDepth(oe))},reset:function(){H=!1,j=null,be=null,Ae=null,me=!1}}}function i(){let H=!1,me=null,j=null,be=null,Ae=null,oe=null,Xe=null,Je=null,Et=null;return{setTest:function(It){H||(It?ne(s.STENCIL_TEST):Te(s.STENCIL_TEST))},setMask:function(It){me!==It&&!H&&(s.stencilMask(It),me=It)},setFunc:function(It,_n,Pi){(j!==It||be!==_n||Ae!==Pi)&&(s.stencilFunc(It,_n,Pi),j=It,be=_n,Ae=Pi)},setOp:function(It,_n,Pi){(oe!==It||Xe!==_n||Je!==Pi)&&(s.stencilOp(It,_n,Pi),oe=It,Xe=_n,Je=Pi)},setLocked:function(It){H=It},setClear:function(It){Et!==It&&(s.clearStencil(It),Et=It)},reset:function(){H=!1,me=null,j=null,be=null,Ae=null,oe=null,Xe=null,Je=null,Et=null}}}let r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,p=[],_=null,g=!1,m=null,y=null,b=null,v=null,A=null,T=null,L=null,S=new Oe(0,0,0),R=0,D=!1,O=null,k=null,q=null,U=null,B=null,z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,se=0,Y=s.getParameter(s.VERSION);Y.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(Y)[1]),G=se>=1):Y.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),G=se>=2);let ee=null,ae={},ke=s.getParameter(s.SCISSOR_BOX),Be=s.getParameter(s.VIEWPORT),Dt=new Ut().fromArray(ke),Qe=new Ut().fromArray(Be);function yt(H,me,j,be){let Ae=new Uint8Array(4),oe=s.createTexture();s.bindTexture(H,oe),s.texParameteri(H,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(H,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Xe=0;Xe<j;Xe++)H===s.TEXTURE_3D||H===s.TEXTURE_2D_ARRAY?s.texImage3D(me,0,s.RGBA,1,1,be,0,s.RGBA,s.UNSIGNED_BYTE,Ae):s.texImage2D(me+Xe,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ae);return oe}let Q={};Q[s.TEXTURE_2D]=yt(s.TEXTURE_2D,s.TEXTURE_2D,1),Q[s.TEXTURE_CUBE_MAP]=yt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[s.TEXTURE_2D_ARRAY]=yt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Q[s.TEXTURE_3D]=yt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ne(s.DEPTH_TEST),o.setFunc(Tr),xe(!1),Ee(Qu),ne(s.CULL_FACE),pe(Wi);function ne(H){h[H]!==!0&&(s.enable(H),h[H]=!0)}function Te(H){h[H]!==!1&&(s.disable(H),h[H]=!1)}function Ze(H,me){return u[H]!==me?(s.bindFramebuffer(H,me),u[H]=me,H===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=me),H===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=me),!0):!1}function Ge(H,me){let j=p,be=!1;if(H){j=f.get(me),j===void 0&&(j=[],f.set(me,j));let Ae=H.textures;if(j.length!==Ae.length||j[0]!==s.COLOR_ATTACHMENT0){for(let oe=0,Xe=Ae.length;oe<Xe;oe++)j[oe]=s.COLOR_ATTACHMENT0+oe;j.length=Ae.length,be=!0}}else j[0]!==s.BACK&&(j[0]=s.BACK,be=!0);be&&s.drawBuffers(j)}function ct(H){return _!==H?(s.useProgram(H),_=H,!0):!1}let kt={[lr]:s.FUNC_ADD,[Gf]:s.FUNC_SUBTRACT,[Wf]:s.FUNC_REVERSE_SUBTRACT};kt[Xf]=s.MIN,kt[Yf]=s.MAX;let ce={[qf]:s.ZERO,[Zf]:s.ONE,[Jf]:s.SRC_COLOR,[nd]:s.SRC_ALPHA,[tp]:s.SRC_ALPHA_SATURATE,[Qf]:s.DST_COLOR,[$f]:s.DST_ALPHA,[Kf]:s.ONE_MINUS_SRC_COLOR,[id]:s.ONE_MINUS_SRC_ALPHA,[ep]:s.ONE_MINUS_DST_COLOR,[jf]:s.ONE_MINUS_DST_ALPHA,[np]:s.CONSTANT_COLOR,[ip]:s.ONE_MINUS_CONSTANT_COLOR,[sp]:s.CONSTANT_ALPHA,[rp]:s.ONE_MINUS_CONSTANT_ALPHA};function pe(H,me,j,be,Ae,oe,Xe,Je,Et,It){if(H===Wi){g===!0&&(Te(s.BLEND),g=!1);return}if(g===!1&&(ne(s.BLEND),g=!0),H!==kf){if(H!==m||It!==D){if((y!==lr||A!==lr)&&(s.blendEquation(s.FUNC_ADD),y=lr,A=lr),It)switch(H){case Kr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case pa:s.blendFunc(s.ONE,s.ONE);break;case ed:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case td:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:je("WebGLState: Invalid blending: ",H);break}else switch(H){case Kr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case pa:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case ed:je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case td:je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:je("WebGLState: Invalid blending: ",H);break}b=null,v=null,T=null,L=null,S.set(0,0,0),R=0,m=H,D=It}return}Ae=Ae||me,oe=oe||j,Xe=Xe||be,(me!==y||Ae!==A)&&(s.blendEquationSeparate(kt[me],kt[Ae]),y=me,A=Ae),(j!==b||be!==v||oe!==T||Xe!==L)&&(s.blendFuncSeparate(ce[j],ce[be],ce[oe],ce[Xe]),b=j,v=be,T=oe,L=Xe),(Je.equals(S)===!1||Et!==R)&&(s.blendColor(Je.r,Je.g,Je.b,Et),S.copy(Je),R=Et),m=H,D=!1}function _e(H,me){H.side===mi?Te(s.CULL_FACE):ne(s.CULL_FACE);let j=H.side===Cn;me&&(j=!j),xe(j),H.blending===Kr&&H.transparent===!1?pe(Wi):pe(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),r.setMask(H.colorWrite);let be=H.stencilWrite;a.setTest(be),be&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),it(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?ne(s.SAMPLE_ALPHA_TO_COVERAGE):Te(s.SAMPLE_ALPHA_TO_COVERAGE)}function xe(H){O!==H&&(H?s.frontFace(s.CW):s.frontFace(s.CCW),O=H)}function Ee(H){H!==zf?(ne(s.CULL_FACE),H!==k&&(H===Qu?s.cullFace(s.BACK):H===Vf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Te(s.CULL_FACE),k=H}function ot(H){H!==q&&(G&&s.lineWidth(H),q=H)}function it(H,me,j){H?(ne(s.POLYGON_OFFSET_FILL),(U!==me||B!==j)&&(U=me,B=j,o.getReversed()&&(me=-me),s.polygonOffset(me,j))):Te(s.POLYGON_OFFSET_FILL)}function lt(H){H?ne(s.SCISSOR_TEST):Te(s.SCISSOR_TEST)}function dt(H){H===void 0&&(H=s.TEXTURE0+z-1),ee!==H&&(s.activeTexture(H),ee=H)}function F(H,me,j){j===void 0&&(ee===null?j=s.TEXTURE0+z-1:j=ee);let be=ae[j];be===void 0&&(be={type:void 0,texture:void 0},ae[j]=be),(be.type!==H||be.texture!==me)&&(ee!==j&&(s.activeTexture(j),ee=j),s.bindTexture(H,me||Q[H]),be.type=H,be.texture=me)}function Pt(){let H=ae[ee];H!==void 0&&H.type!==void 0&&(s.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function vt(){try{s.compressedTexImage2D(...arguments)}catch(H){je("WebGLState:",H)}}function I(){try{s.compressedTexImage3D(...arguments)}catch(H){je("WebGLState:",H)}}function M(){try{s.texSubImage2D(...arguments)}catch(H){je("WebGLState:",H)}}function X(){try{s.texSubImage3D(...arguments)}catch(H){je("WebGLState:",H)}}function J(){try{s.compressedTexSubImage2D(...arguments)}catch(H){je("WebGLState:",H)}}function ie(){try{s.compressedTexSubImage3D(...arguments)}catch(H){je("WebGLState:",H)}}function ve(){try{s.texStorage2D(...arguments)}catch(H){je("WebGLState:",H)}}function we(){try{s.texStorage3D(...arguments)}catch(H){je("WebGLState:",H)}}function re(){try{s.texImage2D(...arguments)}catch(H){je("WebGLState:",H)}}function ue(){try{s.texImage3D(...arguments)}catch(H){je("WebGLState:",H)}}function Ce(H){return d[H]!==void 0?d[H]:s.getParameter(H)}function et(H,me){d[H]!==me&&(s.pixelStorei(H,me),d[H]=me)}function Le(H){Dt.equals(H)===!1&&(s.scissor(H.x,H.y,H.z,H.w),Dt.copy(H))}function Ie(H){Qe.equals(H)===!1&&(s.viewport(H.x,H.y,H.z,H.w),Qe.copy(H))}function tt(H,me){let j=c.get(me);j===void 0&&(j=new WeakMap,c.set(me,j));let be=j.get(H);be===void 0&&(be=s.getUniformBlockIndex(me,H.name),j.set(H,be))}function rt(H,me){let be=c.get(me).get(H);l.get(me)!==be&&(s.uniformBlockBinding(me,be,H.__bindingPointIndex),l.set(me,be))}function gt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},d={},ee=null,ae={},u={},f=new WeakMap,p=[],_=null,g=!1,m=null,y=null,b=null,v=null,A=null,T=null,L=null,S=new Oe(0,0,0),R=0,D=!1,O=null,k=null,q=null,U=null,B=null,Dt.set(0,0,s.canvas.width,s.canvas.height),Qe.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ne,disable:Te,bindFramebuffer:Ze,drawBuffers:Ge,useProgram:ct,setBlending:pe,setMaterial:_e,setFlipSided:xe,setCullFace:Ee,setLineWidth:ot,setPolygonOffset:it,setScissorTest:lt,activeTexture:dt,bindTexture:F,unbindTexture:Pt,compressedTexImage2D:vt,compressedTexImage3D:I,texImage2D:re,texImage3D:ue,pixelStorei:et,getParameter:Ce,updateUBOMapping:tt,uniformBlockBinding:rt,texStorage2D:ve,texStorage3D:we,texSubImage2D:M,texSubImage3D:X,compressedTexSubImage2D:J,compressedTexSubImage3D:ie,scissor:Le,viewport:Ie,reset:gt}}function hE(s,e,t,n,i,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new le,h=new WeakMap,d=new Set,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(I,M){return p?new OffscreenCanvas(I,M):zo("canvas")}function g(I,M,X){let J=1,ie=vt(I);if((ie.width>X||ie.height>X)&&(J=X/Math.max(ie.width,ie.height)),J<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let ve=Math.floor(J*ie.width),we=Math.floor(J*ie.height);u===void 0&&(u=_(ve,we));let re=M?_(ve,we):u;return re.width=ve,re.height=we,re.getContext("2d").drawImage(I,0,0,ve,we),Pe("WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+ve+"x"+we+")."),re}else return"data"in I&&Pe("WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),I;return I}function m(I){return I.generateMipmaps}function y(I){s.generateMipmap(I)}function b(I){return I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?s.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function v(I,M,X,J,ie,ve=!1){if(I!==null){if(s[I]!==void 0)return s[I];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let we;J&&(we=e.get("EXT_texture_norm16"),we||Pe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let re=M;if(M===s.RED&&(X===s.FLOAT&&(re=s.R32F),X===s.HALF_FLOAT&&(re=s.R16F),X===s.UNSIGNED_BYTE&&(re=s.R8),X===s.UNSIGNED_SHORT&&we&&(re=we.R16_EXT),X===s.SHORT&&we&&(re=we.R16_SNORM_EXT)),M===s.RED_INTEGER&&(X===s.UNSIGNED_BYTE&&(re=s.R8UI),X===s.UNSIGNED_SHORT&&(re=s.R16UI),X===s.UNSIGNED_INT&&(re=s.R32UI),X===s.BYTE&&(re=s.R8I),X===s.SHORT&&(re=s.R16I),X===s.INT&&(re=s.R32I)),M===s.RG&&(X===s.FLOAT&&(re=s.RG32F),X===s.HALF_FLOAT&&(re=s.RG16F),X===s.UNSIGNED_BYTE&&(re=s.RG8),X===s.UNSIGNED_SHORT&&we&&(re=we.RG16_EXT),X===s.SHORT&&we&&(re=we.RG16_SNORM_EXT)),M===s.RG_INTEGER&&(X===s.UNSIGNED_BYTE&&(re=s.RG8UI),X===s.UNSIGNED_SHORT&&(re=s.RG16UI),X===s.UNSIGNED_INT&&(re=s.RG32UI),X===s.BYTE&&(re=s.RG8I),X===s.SHORT&&(re=s.RG16I),X===s.INT&&(re=s.RG32I)),M===s.RGB_INTEGER&&(X===s.UNSIGNED_BYTE&&(re=s.RGB8UI),X===s.UNSIGNED_SHORT&&(re=s.RGB16UI),X===s.UNSIGNED_INT&&(re=s.RGB32UI),X===s.BYTE&&(re=s.RGB8I),X===s.SHORT&&(re=s.RGB16I),X===s.INT&&(re=s.RGB32I)),M===s.RGBA_INTEGER&&(X===s.UNSIGNED_BYTE&&(re=s.RGBA8UI),X===s.UNSIGNED_SHORT&&(re=s.RGBA16UI),X===s.UNSIGNED_INT&&(re=s.RGBA32UI),X===s.BYTE&&(re=s.RGBA8I),X===s.SHORT&&(re=s.RGBA16I),X===s.INT&&(re=s.RGBA32I)),M===s.RGB&&(X===s.UNSIGNED_SHORT&&we&&(re=we.RGB16_EXT),X===s.SHORT&&we&&(re=we.RGB16_SNORM_EXT),X===s.UNSIGNED_INT_5_9_9_9_REV&&(re=s.RGB9_E5),X===s.UNSIGNED_INT_10F_11F_11F_REV&&(re=s.R11F_G11F_B10F)),M===s.RGBA){let ue=ve?Bo:Ct.getTransfer(ie);X===s.FLOAT&&(re=s.RGBA32F),X===s.HALF_FLOAT&&(re=s.RGBA16F),X===s.UNSIGNED_BYTE&&(re=ue===Wt?s.SRGB8_ALPHA8:s.RGBA8),X===s.UNSIGNED_SHORT&&we&&(re=we.RGBA16_EXT),X===s.SHORT&&we&&(re=we.RGBA16_SNORM_EXT),X===s.UNSIGNED_SHORT_4_4_4_4&&(re=s.RGBA4),X===s.UNSIGNED_SHORT_5_5_5_1&&(re=s.RGB5_A1)}return(re===s.R16F||re===s.R32F||re===s.RG16F||re===s.RG32F||re===s.RGBA16F||re===s.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function A(I,M){let X;return I?M===null||M===gi||M===eo?X=s.DEPTH24_STENCIL8:M===kn?X=s.DEPTH32F_STENCIL8:M===Qr&&(X=s.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===gi||M===eo?X=s.DEPTH_COMPONENT24:M===kn?X=s.DEPTH_COMPONENT32F:M===Qr&&(X=s.DEPTH_COMPONENT16),X}function T(I,M){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==un&&I.minFilter!==jt?Math.log2(Math.max(M.width,M.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?M.mipmaps.length:1}function L(I){let M=I.target;M.removeEventListener("dispose",L),R(M),M.isVideoTexture&&h.delete(M),M.isHTMLTexture&&d.delete(M)}function S(I){let M=I.target;M.removeEventListener("dispose",S),O(M)}function R(I){let M=n.get(I);if(M.__webglInit===void 0)return;let X=I.source,J=f.get(X);if(J){let ie=J[M.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&D(I),Object.keys(J).length===0&&f.delete(X)}n.remove(I)}function D(I){let M=n.get(I);s.deleteTexture(M.__webglTexture);let X=I.source,J=f.get(X);delete J[M.__cacheKey],o.memory.textures--}function O(I){let M=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(M.__webglFramebuffer[J]))for(let ie=0;ie<M.__webglFramebuffer[J].length;ie++)s.deleteFramebuffer(M.__webglFramebuffer[J][ie]);else s.deleteFramebuffer(M.__webglFramebuffer[J]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[J])}else{if(Array.isArray(M.__webglFramebuffer))for(let J=0;J<M.__webglFramebuffer.length;J++)s.deleteFramebuffer(M.__webglFramebuffer[J]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let J=0;J<M.__webglColorRenderbuffer.length;J++)M.__webglColorRenderbuffer[J]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[J]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let X=I.textures;for(let J=0,ie=X.length;J<ie;J++){let ve=n.get(X[J]);ve.__webglTexture&&(s.deleteTexture(ve.__webglTexture),o.memory.textures--),n.remove(X[J])}n.remove(I)}let k=0;function q(){k=0}function U(){return k}function B(I){k=I}function z(){let I=k;return I>=i.maxTextures&&Pe("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+i.maxTextures),k+=1,I}function G(I){let M=[];return M.push(I.wrapS),M.push(I.wrapT),M.push(I.wrapR||0),M.push(I.magFilter),M.push(I.minFilter),M.push(I.anisotropy),M.push(I.internalFormat),M.push(I.format),M.push(I.type),M.push(I.generateMipmaps),M.push(I.premultiplyAlpha),M.push(I.flipY),M.push(I.unpackAlignment),M.push(I.colorSpace),M.join()}function se(I,M){let X=n.get(I);if(I.isVideoTexture&&F(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&X.__version!==I.version){let J=I.image;if(J===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{Te(X,I,M);return}}else I.isExternalTexture&&(X.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,X.__webglTexture,s.TEXTURE0+M)}function Y(I,M){let X=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&X.__version!==I.version){Te(X,I,M);return}else I.isExternalTexture&&(X.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,X.__webglTexture,s.TEXTURE0+M)}function ee(I,M){let X=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&X.__version!==I.version){Te(X,I,M);return}t.bindTexture(s.TEXTURE_3D,X.__webglTexture,s.TEXTURE0+M)}function ae(I,M){let X=n.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&X.__version!==I.version){Ze(X,I,M);return}t.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture,s.TEXTURE0+M)}let ke={[qs]:s.REPEAT,[Kn]:s.CLAMP_TO_EDGE,[No]:s.MIRRORED_REPEAT},Be={[un]:s.NEAREST,[hd]:s.NEAREST_MIPMAP_NEAREST,[jr]:s.NEAREST_MIPMAP_LINEAR,[jt]:s.LINEAR,[ya]:s.LINEAR_MIPMAP_NEAREST,[Yi]:s.LINEAR_MIPMAP_LINEAR},Dt={[mp]:s.NEVER,[vp]:s.ALWAYS,[gp]:s.LESS,[Xc]:s.LEQUAL,[_p]:s.EQUAL,[Yc]:s.GEQUAL,[xp]:s.GREATER,[yp]:s.NOTEQUAL};function Qe(I,M){if(M.type===kn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===jt||M.magFilter===ya||M.magFilter===jr||M.magFilter===Yi||M.minFilter===jt||M.minFilter===ya||M.minFilter===jr||M.minFilter===Yi)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,ke[M.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,ke[M.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,ke[M.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,Be[M.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,Be[M.minFilter]),M.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,Dt[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===un||M.minFilter!==jr&&M.minFilter!==Yi||M.type===kn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let X=e.get("EXT_texture_filter_anisotropic");s.texParameterf(I,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function yt(I,M){let X=!1;I.__webglInit===void 0&&(I.__webglInit=!0,M.addEventListener("dispose",L));let J=M.source,ie=f.get(J);ie===void 0&&(ie={},f.set(J,ie));let ve=G(M);if(ve!==I.__cacheKey){ie[ve]===void 0&&(ie[ve]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,X=!0),ie[ve].usedTimes++;let we=ie[I.__cacheKey];we!==void 0&&(ie[I.__cacheKey].usedTimes--,we.usedTimes===0&&D(M)),I.__cacheKey=ve,I.__webglTexture=ie[ve].texture}return X}function Q(I,M,X){return Math.floor(Math.floor(I/X)/M)}function ne(I,M,X,J){let ve=I.updateRanges;if(ve.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,X,J,M.data);else{ve.sort((et,Le)=>et.start-Le.start);let we=0;for(let et=1;et<ve.length;et++){let Le=ve[we],Ie=ve[et],tt=Le.start+Le.count,rt=Q(Ie.start,M.width,4),gt=Q(Le.start,M.width,4);Ie.start<=tt+1&&rt===gt&&Q(Ie.start+Ie.count-1,M.width,4)===rt?Le.count=Math.max(Le.count,Ie.start+Ie.count-Le.start):(++we,ve[we]=Ie)}ve.length=we+1;let re=t.getParameter(s.UNPACK_ROW_LENGTH),ue=t.getParameter(s.UNPACK_SKIP_PIXELS),Ce=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let et=0,Le=ve.length;et<Le;et++){let Ie=ve[et],tt=Math.floor(Ie.start/4),rt=Math.ceil(Ie.count/4),gt=tt%M.width,H=Math.floor(tt/M.width),me=rt,j=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,gt),t.pixelStorei(s.UNPACK_SKIP_ROWS,H),t.texSubImage2D(s.TEXTURE_2D,0,gt,H,me,j,X,J,M.data)}I.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,re),t.pixelStorei(s.UNPACK_SKIP_PIXELS,ue),t.pixelStorei(s.UNPACK_SKIP_ROWS,Ce)}}function Te(I,M,X){let J=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(J=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(J=s.TEXTURE_3D);let ie=yt(I,M),ve=M.source;t.bindTexture(J,I.__webglTexture,s.TEXTURE0+X);let we=n.get(ve);if(ve.version!==we.__version||ie===!0){if(t.activeTexture(s.TEXTURE0+X),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let j=Ct.getPrimaries(Ct.workingColorSpace),be=M.colorSpace===rs?null:Ct.getPrimaries(M.colorSpace),Ae=M.colorSpace===rs||j===be?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae)}t.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment);let ue=g(M.image,!1,i.maxTextureSize);ue=Pt(M,ue);let Ce=r.convert(M.format,M.colorSpace),et=r.convert(M.type),Le=v(M.internalFormat,Ce,et,M.normalized,M.colorSpace,M.isVideoTexture);Qe(J,M);let Ie,tt=M.mipmaps,rt=M.isVideoTexture!==!0,gt=we.__version===void 0||ie===!0,H=ve.dataReady,me=T(M,ue);if(M.isDepthTexture)Le=A(M.format===Us,M.type),gt&&(rt?t.texStorage2D(s.TEXTURE_2D,1,Le,ue.width,ue.height):t.texImage2D(s.TEXTURE_2D,0,Le,ue.width,ue.height,0,Ce,et,null));else if(M.isDataTexture)if(tt.length>0){rt&&gt&&t.texStorage2D(s.TEXTURE_2D,me,Le,tt[0].width,tt[0].height);for(let j=0,be=tt.length;j<be;j++)Ie=tt[j],rt?H&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,Ie.width,Ie.height,Ce,et,Ie.data):t.texImage2D(s.TEXTURE_2D,j,Le,Ie.width,Ie.height,0,Ce,et,Ie.data);M.generateMipmaps=!1}else rt?(gt&&t.texStorage2D(s.TEXTURE_2D,me,Le,ue.width,ue.height),H&&ne(M,ue,Ce,et)):t.texImage2D(s.TEXTURE_2D,0,Le,ue.width,ue.height,0,Ce,et,ue.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){rt&&gt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,me,Le,tt[0].width,tt[0].height,ue.depth);for(let j=0,be=tt.length;j<be;j++)if(Ie=tt[j],M.format!==Gn)if(Ce!==null)if(rt){if(H)if(M.layerUpdates.size>0){let Ae=yd(Ie.width,Ie.height,M.format,M.type);for(let oe of M.layerUpdates){let Xe=Ie.data.subarray(oe*Ae/Ie.data.BYTES_PER_ELEMENT,(oe+1)*Ae/Ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,oe,Ie.width,Ie.height,1,Ce,Xe)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,Ie.width,Ie.height,ue.depth,Ce,Ie.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,j,Le,Ie.width,Ie.height,ue.depth,0,Ie.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?H&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,j,0,0,0,Ie.width,Ie.height,ue.depth,Ce,et,Ie.data):t.texImage3D(s.TEXTURE_2D_ARRAY,j,Le,Ie.width,Ie.height,ue.depth,0,Ce,et,Ie.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{rt&&gt&&t.texStorage2D(s.TEXTURE_2D,me,Le,tt[0].width,tt[0].height);for(let j=0,be=tt.length;j<be;j++)Ie=tt[j],M.format!==Gn?Ce!==null?rt?H&&t.compressedTexSubImage2D(s.TEXTURE_2D,j,0,0,Ie.width,Ie.height,Ce,Ie.data):t.compressedTexImage2D(s.TEXTURE_2D,j,Le,Ie.width,Ie.height,0,Ie.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?H&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,Ie.width,Ie.height,Ce,et,Ie.data):t.texImage2D(s.TEXTURE_2D,j,Le,Ie.width,Ie.height,0,Ce,et,Ie.data)}else if(M.isDataArrayTexture)if(rt){if(gt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,me,Le,ue.width,ue.height,ue.depth),H)if(M.layerUpdates.size>0){let j=yd(ue.width,ue.height,M.format,M.type);for(let be of M.layerUpdates){let Ae=ue.data.subarray(be*j/ue.data.BYTES_PER_ELEMENT,(be+1)*j/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,be,ue.width,ue.height,1,Ce,et,Ae)}M.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,Ce,et,ue.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Le,ue.width,ue.height,ue.depth,0,Ce,et,ue.data);else if(M.isData3DTexture)rt?(gt&&t.texStorage3D(s.TEXTURE_3D,me,Le,ue.width,ue.height,ue.depth),H&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,Ce,et,ue.data)):t.texImage3D(s.TEXTURE_3D,0,Le,ue.width,ue.height,ue.depth,0,Ce,et,ue.data);else if(M.isFramebufferTexture){if(gt)if(rt)t.texStorage2D(s.TEXTURE_2D,me,Le,ue.width,ue.height);else{let j=ue.width,be=ue.height;for(let Ae=0;Ae<me;Ae++)t.texImage2D(s.TEXTURE_2D,Ae,Le,j,be,0,Ce,et,null),j>>=1,be>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in s){let j=s.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),ue.parentNode!==j){j.appendChild(ue),d.add(M),j.onpaint=be=>{let Ae=be.changedElements;for(let oe of d)Ae.includes(oe.image)&&(oe.needsUpdate=!0)},j.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,ue);else{let Ae=s.RGBA,oe=s.RGBA,Xe=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Ae,oe,Xe,ue)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(tt.length>0){if(rt&&gt){let j=vt(tt[0]);t.texStorage2D(s.TEXTURE_2D,me,Le,j.width,j.height)}for(let j=0,be=tt.length;j<be;j++)Ie=tt[j],rt?H&&t.texSubImage2D(s.TEXTURE_2D,j,0,0,Ce,et,Ie):t.texImage2D(s.TEXTURE_2D,j,Le,Ce,et,Ie);M.generateMipmaps=!1}else if(rt){if(gt){let j=vt(ue);t.texStorage2D(s.TEXTURE_2D,me,Le,j.width,j.height)}H&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ce,et,ue)}else t.texImage2D(s.TEXTURE_2D,0,Le,Ce,et,ue);m(M)&&y(J),we.__version=ve.version,M.onUpdate&&M.onUpdate(M)}I.__version=M.version}function Ze(I,M,X){if(M.image.length!==6)return;let J=yt(I,M),ie=M.source;t.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+X);let ve=n.get(ie);if(ie.version!==ve.__version||J===!0){t.activeTexture(s.TEXTURE0+X);let we=Ct.getPrimaries(Ct.workingColorSpace),re=M.colorSpace===rs?null:Ct.getPrimaries(M.colorSpace),ue=M.colorSpace===rs||we===re?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);let Ce=M.isCompressedTexture||M.image[0].isCompressedTexture,et=M.image[0]&&M.image[0].isDataTexture,Le=[];for(let oe=0;oe<6;oe++)!Ce&&!et?Le[oe]=g(M.image[oe],!0,i.maxCubemapSize):Le[oe]=et?M.image[oe].image:M.image[oe],Le[oe]=Pt(M,Le[oe]);let Ie=Le[0],tt=r.convert(M.format,M.colorSpace),rt=r.convert(M.type),gt=v(M.internalFormat,tt,rt,M.normalized,M.colorSpace),H=M.isVideoTexture!==!0,me=ve.__version===void 0||J===!0,j=ie.dataReady,be=T(M,Ie);Qe(s.TEXTURE_CUBE_MAP,M);let Ae;if(Ce){H&&me&&t.texStorage2D(s.TEXTURE_CUBE_MAP,be,gt,Ie.width,Ie.height);for(let oe=0;oe<6;oe++){Ae=Le[oe].mipmaps;for(let Xe=0;Xe<Ae.length;Xe++){let Je=Ae[Xe];M.format!==Gn?tt!==null?H?j&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Xe,0,0,Je.width,Je.height,tt,Je.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Xe,gt,Je.width,Je.height,0,Je.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Xe,0,0,Je.width,Je.height,tt,rt,Je.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Xe,gt,Je.width,Je.height,0,tt,rt,Je.data)}}}else{if(Ae=M.mipmaps,H&&me){Ae.length>0&&be++;let oe=vt(Le[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,be,gt,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(et){H?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,Le[oe].width,Le[oe].height,tt,rt,Le[oe].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,gt,Le[oe].width,Le[oe].height,0,tt,rt,Le[oe].data);for(let Xe=0;Xe<Ae.length;Xe++){let Et=Ae[Xe].image[oe].image;H?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Xe+1,0,0,Et.width,Et.height,tt,rt,Et.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Xe+1,gt,Et.width,Et.height,0,tt,rt,Et.data)}}else{H?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,tt,rt,Le[oe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,gt,tt,rt,Le[oe]);for(let Xe=0;Xe<Ae.length;Xe++){let Je=Ae[Xe];H?j&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Xe+1,0,0,tt,rt,Je.image[oe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Xe+1,gt,tt,rt,Je.image[oe])}}}m(M)&&y(s.TEXTURE_CUBE_MAP),ve.__version=ie.version,M.onUpdate&&M.onUpdate(M)}I.__version=M.version}function Ge(I,M,X,J,ie,ve){let we=r.convert(X.format,X.colorSpace),re=r.convert(X.type),ue=v(X.internalFormat,we,re,X.normalized,X.colorSpace),Ce=n.get(M),et=n.get(X);if(et.__renderTarget=M,!Ce.__hasExternalTextures){let Le=Math.max(1,M.width>>ve),Ie=Math.max(1,M.height>>ve);ie===s.TEXTURE_3D||ie===s.TEXTURE_2D_ARRAY?t.texImage3D(ie,ve,ue,Le,Ie,M.depth,0,we,re,null):t.texImage2D(ie,ve,ue,Le,Ie,0,we,re,null)}t.bindFramebuffer(s.FRAMEBUFFER,I),dt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,ie,et.__webglTexture,0,lt(M)):(ie===s.TEXTURE_2D||ie>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,J,ie,et.__webglTexture,ve),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ct(I,M,X){if(s.bindRenderbuffer(s.RENDERBUFFER,I),M.depthBuffer){let J=M.depthTexture,ie=J&&J.isDepthTexture?J.type:null,ve=A(M.stencilBuffer,ie),we=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;dt(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,lt(M),ve,M.width,M.height):X?s.renderbufferStorageMultisample(s.RENDERBUFFER,lt(M),ve,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ve,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,we,s.RENDERBUFFER,I)}else{let J=M.textures;for(let ie=0;ie<J.length;ie++){let ve=J[ie],we=r.convert(ve.format,ve.colorSpace),re=r.convert(ve.type),ue=v(ve.internalFormat,we,re,ve.normalized,ve.colorSpace);dt(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,lt(M),ue,M.width,M.height):X?s.renderbufferStorageMultisample(s.RENDERBUFFER,lt(M),ue,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ue,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function kt(I,M,X){let J=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,I),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ie=n.get(M.depthTexture);if(ie.__renderTarget=M,(!ie.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),J){if(ie.__webglInit===void 0&&(ie.__webglInit=!0,M.depthTexture.addEventListener("dispose",L)),ie.__webglTexture===void 0){ie.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,ie.__webglTexture),Qe(s.TEXTURE_CUBE_MAP,M.depthTexture);let Ce=r.convert(M.depthTexture.format),et=r.convert(M.depthTexture.type),Le;M.depthTexture.format===Bi?Le=s.DEPTH_COMPONENT24:M.depthTexture.format===Us&&(Le=s.DEPTH24_STENCIL8);for(let Ie=0;Ie<6;Ie++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0,Le,M.width,M.height,0,Ce,et,null)}}else se(M.depthTexture,0);let ve=ie.__webglTexture,we=lt(M),re=J?s.TEXTURE_CUBE_MAP_POSITIVE_X+X:s.TEXTURE_2D,ue=M.depthTexture.format===Us?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(M.depthTexture.format===Bi)dt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ue,re,ve,0,we):s.framebufferTexture2D(s.FRAMEBUFFER,ue,re,ve,0);else if(M.depthTexture.format===Us)dt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ue,re,ve,0,we):s.framebufferTexture2D(s.FRAMEBUFFER,ue,re,ve,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ce(I){let M=n.get(I),X=I.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==I.depthTexture){let J=I.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),J){let ie=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,J.removeEventListener("dispose",ie)};J.addEventListener("dispose",ie),M.__depthDisposeCallback=ie}M.__boundDepthTexture=J}if(I.depthTexture&&!M.__autoAllocateDepthBuffer)if(X)for(let J=0;J<6;J++)kt(M.__webglFramebuffer[J],I,J);else{let J=I.texture.mipmaps;J&&J.length>0?kt(M.__webglFramebuffer[0],I,0):kt(M.__webglFramebuffer,I,0)}else if(X){M.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[J]),M.__webglDepthbuffer[J]===void 0)M.__webglDepthbuffer[J]=s.createRenderbuffer(),ct(M.__webglDepthbuffer[J],I,!1);else{let ie=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ve=M.__webglDepthbuffer[J];s.bindRenderbuffer(s.RENDERBUFFER,ve),s.framebufferRenderbuffer(s.FRAMEBUFFER,ie,s.RENDERBUFFER,ve)}}else{let J=I.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),ct(M.__webglDepthbuffer,I,!1);else{let ie=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ve=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ve),s.framebufferRenderbuffer(s.FRAMEBUFFER,ie,s.RENDERBUFFER,ve)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function pe(I,M,X){let J=n.get(I);M!==void 0&&Ge(J.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),X!==void 0&&ce(I)}function _e(I){let M=I.texture,X=n.get(I),J=n.get(M);I.addEventListener("dispose",S);let ie=I.textures,ve=I.isWebGLCubeRenderTarget===!0,we=ie.length>1;if(we||(J.__webglTexture===void 0&&(J.__webglTexture=s.createTexture()),J.__version=M.version,o.memory.textures++),ve){X.__webglFramebuffer=[];for(let re=0;re<6;re++)if(M.mipmaps&&M.mipmaps.length>0){X.__webglFramebuffer[re]=[];for(let ue=0;ue<M.mipmaps.length;ue++)X.__webglFramebuffer[re][ue]=s.createFramebuffer()}else X.__webglFramebuffer[re]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){X.__webglFramebuffer=[];for(let re=0;re<M.mipmaps.length;re++)X.__webglFramebuffer[re]=s.createFramebuffer()}else X.__webglFramebuffer=s.createFramebuffer();if(we)for(let re=0,ue=ie.length;re<ue;re++){let Ce=n.get(ie[re]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=s.createTexture(),o.memory.textures++)}if(I.samples>0&&dt(I)===!1){X.__webglMultisampledFramebuffer=s.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let re=0;re<ie.length;re++){let ue=ie[re];X.__webglColorRenderbuffer[re]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,X.__webglColorRenderbuffer[re]);let Ce=r.convert(ue.format,ue.colorSpace),et=r.convert(ue.type),Le=v(ue.internalFormat,Ce,et,ue.normalized,ue.colorSpace,I.isXRRenderTarget===!0),Ie=lt(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ie,Le,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+re,s.RENDERBUFFER,X.__webglColorRenderbuffer[re])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(X.__webglDepthRenderbuffer=s.createRenderbuffer(),ct(X.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ve){t.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),Qe(s.TEXTURE_CUBE_MAP,M);for(let re=0;re<6;re++)if(M.mipmaps&&M.mipmaps.length>0)for(let ue=0;ue<M.mipmaps.length;ue++)Ge(X.__webglFramebuffer[re][ue],I,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+re,ue);else Ge(X.__webglFramebuffer[re],I,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);m(M)&&y(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let re=0,ue=ie.length;re<ue;re++){let Ce=ie[re],et=n.get(Ce),Le=s.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Le=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Le,et.__webglTexture),Qe(Le,Ce),Ge(X.__webglFramebuffer,I,Ce,s.COLOR_ATTACHMENT0+re,Le,0),m(Ce)&&y(Le)}t.unbindTexture()}else{let re=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(re=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(re,J.__webglTexture),Qe(re,M),M.mipmaps&&M.mipmaps.length>0)for(let ue=0;ue<M.mipmaps.length;ue++)Ge(X.__webglFramebuffer[ue],I,M,s.COLOR_ATTACHMENT0,re,ue);else Ge(X.__webglFramebuffer,I,M,s.COLOR_ATTACHMENT0,re,0);m(M)&&y(re),t.unbindTexture()}I.depthBuffer&&ce(I)}function xe(I){let M=I.textures;for(let X=0,J=M.length;X<J;X++){let ie=M[X];if(m(ie)){let ve=b(I),we=n.get(ie).__webglTexture;t.bindTexture(ve,we),y(ve),t.unbindTexture()}}}let Ee=[],ot=[];function it(I){if(I.samples>0){if(dt(I)===!1){let M=I.textures,X=I.width,J=I.height,ie=s.COLOR_BUFFER_BIT,ve=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,we=n.get(I),re=M.length>1;if(re)for(let Ce=0;Ce<M.length;Ce++)t.bindFramebuffer(s.FRAMEBUFFER,we.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,we.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer);let ue=I.texture.mipmaps;ue&&ue.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let Ce=0;Ce<M.length;Ce++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ie|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ie|=s.STENCIL_BUFFER_BIT)),re){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,we.__webglColorRenderbuffer[Ce]);let et=n.get(M[Ce]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,et,0)}s.blitFramebuffer(0,0,X,J,0,0,X,J,ie,s.NEAREST),l===!0&&(Ee.length=0,ot.length=0,Ee.push(s.COLOR_ATTACHMENT0+Ce),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(Ee.push(ve),ot.push(ve),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,ot)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ee))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),re)for(let Ce=0;Ce<M.length;Ce++){t.bindFramebuffer(s.FRAMEBUFFER,we.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.RENDERBUFFER,we.__webglColorRenderbuffer[Ce]);let et=n.get(M[Ce]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,we.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ce,s.TEXTURE_2D,et,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&l){let M=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function lt(I){return Math.min(i.maxSamples,I.samples)}function dt(I){let M=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function F(I){let M=o.render.frame;h.get(I)!==M&&(h.set(I,M),I.update())}function Pt(I,M){let X=I.colorSpace,J=I.format,ie=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||X!==Oo&&X!==rs&&(Ct.getTransfer(X)===Wt?(J!==Gn||ie!==ei)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):je("WebGLTextures: Unsupported texture color space:",X)),M}function vt(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=q,this.getTextureUnits=U,this.setTextureUnits=B,this.setTexture2D=se,this.setTexture2DArray=Y,this.setTexture3D=ee,this.setTextureCube=ae,this.rebindTextures=pe,this.setupRenderTarget=_e,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=it,this.setupDepthRenderbuffer=ce,this.setupFrameBufferTexture=Ge,this.useMultisampledRTT=dt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function r_(s,e){function t(n,i=rs){let r,o=Ct.getTransfer(i);if(n===ei)return s.UNSIGNED_BYTE;if(n===cc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===hc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===fd)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===pd)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===ud)return s.BYTE;if(n===dd)return s.SHORT;if(n===Qr)return s.UNSIGNED_SHORT;if(n===lc)return s.INT;if(n===gi)return s.UNSIGNED_INT;if(n===kn)return s.FLOAT;if(n===Ri)return s.HALF_FLOAT;if(n===md)return s.ALPHA;if(n===gd)return s.RGB;if(n===Gn)return s.RGBA;if(n===Bi)return s.DEPTH_COMPONENT;if(n===Us)return s.DEPTH_STENCIL;if(n===uc)return s.RED;if(n===va)return s.RED_INTEGER;if(n===Fs)return s.RG;if(n===dc)return s.RG_INTEGER;if(n===fc)return s.RGBA_INTEGER;if(n===Sa||n===Ma||n===ba||n===Ea)if(o===Wt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Sa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Sa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ma)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ba)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ea)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===pc||n===mc||n===gc||n===_c)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===pc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===mc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===gc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===_c)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===xc||n===yc||n===vc||n===Sc||n===Mc||n===wa||n===bc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===xc||n===yc)return o===Wt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===vc)return o===Wt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Sc)return r.COMPRESSED_R11_EAC;if(n===Mc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===wa)return r.COMPRESSED_RG11_EAC;if(n===bc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ec||n===wc||n===Tc||n===Ac||n===Rc||n===Cc||n===Pc||n===Ic||n===Lc||n===Dc||n===Nc||n===Uc||n===Fc||n===Oc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ec)return o===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===wc)return o===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Tc)return o===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ac)return o===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Rc)return o===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Cc)return o===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Pc)return o===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ic)return o===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Lc)return o===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Dc)return o===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Nc)return o===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Uc)return o===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Fc)return o===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Oc)return o===Wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Bc||n===zc||n===Vc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Bc)return o===Wt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===zc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Vc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Hc||n===kc||n===Ta||n===Gc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Hc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===kc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ta)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Gc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===eo?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var uE=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dE=`
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

}`,Hp=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Yo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ln({vertexShader:uE,fragmentShader:dE,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new zt(new fi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},kp=class extends oi{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,p=null,_=typeof XRWebGLBinding<"u",g=new Hp,m={},y=t.getContextAttributes(),b=null,v=null,A=[],T=[],L=new le,S=null,R=null,D=new hn;D.viewport=new Ut;let O=new hn;O.viewport=new Ut;let k=[D,O],q=new tc,U=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let ne=A[Q];return ne===void 0&&(ne=new Ir,A[Q]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(Q){let ne=A[Q];return ne===void 0&&(ne=new Ir,A[Q]=ne),ne.getGripSpace()},this.getHand=function(Q){let ne=A[Q];return ne===void 0&&(ne=new Ir,A[Q]=ne),ne.getHandSpace()};function z(Q){let ne=T.indexOf(Q.inputSource);if(ne===-1)return;let Te=A[ne];Te!==void 0&&(Te.update(Q.inputSource,Q.frame,c||o),Te.dispatchEvent({type:Q.type,data:Q.inputSource}))}function G(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",se);for(let Q=0;Q<A.length;Q++){let ne=T[Q];ne!==null&&(T[Q]=null,A[Q].disconnect(ne))}U=null,B=null,g.reset();for(let Q in m)delete m[Q];if(e.setRenderTarget(b),f=null,u=null,d=null,i=null,v=null,yt.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(L.width,L.height,!1),R!==null){let Q=R.camera;Q.fov=R.fov,Q.zoom=R.zoom,Q.updateProjectionMatrix(),R=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,n.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(Q){if(i=Q,i!==null){if(b=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",G),i.addEventListener("inputsourceschange",se),y.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(L),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Te=null,Ze=null,Ge=null;y.depth&&(Ge=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Te=y.stencil?Us:Bi,Ze=y.stencil?eo:gi);let ct={colorFormat:t.RGBA8,depthFormat:Ge,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(ct),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new Pn(u.textureWidth,u.textureHeight,{format:Gn,type:ei,depthTexture:new ws(u.textureWidth,u.textureHeight,Ze,void 0,void 0,void 0,void 0,void 0,void 0,Te),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let Te={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,Te),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Pn(f.framebufferWidth,f.framebufferHeight,{format:Gn,type:ei,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),yt.setContext(i),yt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function se(Q){for(let ne=0;ne<Q.removed.length;ne++){let Te=Q.removed[ne],Ze=T.indexOf(Te);Ze>=0&&(T[Ze]=null,A[Ze].disconnect(Te))}for(let ne=0;ne<Q.added.length;ne++){let Te=Q.added[ne],Ze=T.indexOf(Te);if(Ze===-1){for(let ct=0;ct<A.length;ct++)if(ct>=T.length){T.push(Te),Ze=ct;break}else if(T[ct]===null){T[ct]=Te,Ze=ct;break}if(Ze===-1)break}let Ge=A[Ze];Ge&&Ge.connect(Te)}}let Y=new E,ee=new E;function ae(Q,ne,Te){Y.setFromMatrixPosition(ne.matrixWorld),ee.setFromMatrixPosition(Te.matrixWorld);let Ze=Y.distanceTo(ee),Ge=ne.projectionMatrix.elements,ct=Te.projectionMatrix.elements,kt=Ge[14]/(Ge[10]-1),ce=Ge[14]/(Ge[10]+1),pe=(Ge[9]+1)/Ge[5],_e=(Ge[9]-1)/Ge[5],xe=(Ge[8]-1)/Ge[0],Ee=(ct[8]+1)/ct[0],ot=kt*xe,it=kt*Ee,lt=Ze/(-xe+Ee),dt=lt*-xe;if(ne.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(dt),Q.translateZ(lt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Ge[10]===-1)Q.projectionMatrix.copy(ne.projectionMatrix),Q.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{let F=kt+lt,Pt=ce+lt,vt=ot-dt,I=it+(Ze-dt),M=pe*ce/Pt*F,X=_e*ce/Pt*F;Q.projectionMatrix.makePerspective(vt,I,M,X,F,Pt),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function ke(Q,ne){ne===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(ne.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(i===null)return;let ne=Q.near,Te=Q.far;g.texture!==null&&(g.depthNear>0&&(ne=g.depthNear),g.depthFar>0&&(Te=g.depthFar)),q.near=O.near=D.near=ne,q.far=O.far=D.far=Te,(U!==q.near||B!==q.far)&&(i.updateRenderState({depthNear:q.near,depthFar:q.far}),U=q.near,B=q.far),q.layers.mask=Q.layers.mask|6,D.layers.mask=q.layers.mask&-5,O.layers.mask=q.layers.mask&-3;let Ze=Q.parent,Ge=q.cameras;ke(q,Ze);for(let ct=0;ct<Ge.length;ct++)ke(Ge[ct],Ze);Ge.length===2?ae(q,D,O):q.projectionMatrix.copy(D.projectionMatrix),R===null&&Q.isPerspectiveCamera&&(R={camera:Q,fov:Q.fov,zoom:Q.zoom}),Be(Q,q,Ze)};function Be(Q,ne,Te){Te===null?Q.matrix.copy(ne.matrixWorld):(Q.matrix.copy(Te.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(ne.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(ne.projectionMatrix),Q.projectionMatrixInverse.copy(ne.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Ar*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return q},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Q){l=Q,u!==null&&(u.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(q)},this.getCameraTexture=function(Q){return m[Q]};let Dt=null;function Qe(Q,ne){if(h=ne.getViewerPose(c||o),p=ne,h!==null){let Te=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let Ze=!1;Te.length!==q.cameras.length&&(q.cameras.length=0,Ze=!0);for(let ce=0;ce<Te.length;ce++){let pe=Te[ce],_e=null;if(f!==null)_e=f.getViewport(pe);else{let Ee=d.getViewSubImage(u,pe);_e=Ee.viewport,ce===0&&(e.setRenderTargetTextures(v,Ee.colorTexture,Ee.depthStencilTexture),e.setRenderTarget(v))}let xe=k[ce];xe===void 0&&(xe=new hn,xe.layers.enable(ce),xe.viewport=new Ut,k[ce]=xe),xe.matrix.fromArray(pe.transform.matrix),xe.matrix.decompose(xe.position,xe.quaternion,xe.scale),xe.projectionMatrix.fromArray(pe.projectionMatrix),xe.projectionMatrixInverse.copy(xe.projectionMatrix).invert(),xe.viewport.set(_e.x,_e.y,_e.width,_e.height),ce===0&&(q.matrix.copy(xe.matrix),q.matrix.decompose(q.position,q.quaternion,q.scale)),Ze===!0&&q.cameras.push(xe)}let Ge=i.enabledFeatures;if(Ge&&Ge.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let ce=d.getDepthInformation(Te[0]);ce&&ce.isValid&&ce.texture&&g.init(ce,i.renderState)}if(Ge&&Ge.includes("camera-access")&&_){e.state.unbindTexture(),d=n.getBinding();for(let ce=0;ce<Te.length;ce++){let pe=Te[ce].camera;if(pe){let _e=m[pe];_e||(_e=new Yo,m[pe]=_e);let xe=d.getCameraImage(pe);_e.sourceTexture=xe}}}}for(let Te=0;Te<A.length;Te++){let Ze=T[Te],Ge=A[Te];Ze!==null&&Ge!==void 0&&Ge.update(Ze,ne,c||o)}Dt&&Dt(Q,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),p=null}let yt=new Q0;yt.setAnimationLoop(Qe),this.setAnimationLoop=function(Q){Dt=Q},this.dispose=function(){}}},fE=new ut,o_=new mt;o_.set(-1,0,0,0,1,0,0,0,1);function pE(s,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Ep(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,y,b,v){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,v)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,y,b):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Cn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Cn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let y=e.get(m),b=y.envMap,v=y.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(fE.makeRotationFromEuler(v)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(o_),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,y,b){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*y,g.scale.value=b*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,y){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Cn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){let y=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function mE(s,e,t,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,A){let T=A.program;n.uniformBlockBinding(v,T)}function c(v,A){let T=i[v.id];T===void 0&&(g(v),T=h(v),i[v.id]=T,v.addEventListener("dispose",y));let L=A.program;n.updateUBOMapping(v,L);let S=e.render.frame;r[v.id]!==S&&(u(v),r[v.id]=S)}function h(v){let A=d();v.__bindingPointIndex=A;let T=s.createBuffer(),L=v.__size,S=v.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,L,S),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,A,T),T}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let A=i[v.id],T=v.uniforms,L=v.__cache;s.bindBuffer(s.UNIFORM_BUFFER,A);for(let S=0,R=T.length;S<R;S++){let D=T[S];if(Array.isArray(D))for(let O=0,k=D.length;O<k;O++)f(D[O],S,O,L);else f(D,S,0,L)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(v,A,T,L){if(_(v,A,T,L)===!0){let S=v.__offset,R=v.value;if(Array.isArray(R)){let D=0;for(let O=0;O<R.length;O++){let k=R[O],q=m(k);p(k,v.__data,D),typeof k!="number"&&typeof k!="boolean"&&!k.isMatrix3&&!ArrayBuffer.isView(k)&&(D+=q.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(R,v.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,S,v.__data)}}function p(v,A,T){typeof v=="number"||typeof v=="boolean"?A[0]=v:v.isMatrix3?(A[0]=v.elements[0],A[1]=v.elements[1],A[2]=v.elements[2],A[3]=0,A[4]=v.elements[3],A[5]=v.elements[4],A[6]=v.elements[5],A[7]=0,A[8]=v.elements[6],A[9]=v.elements[7],A[10]=v.elements[8],A[11]=0):ArrayBuffer.isView(v)?A.set(new v.constructor(v.buffer,v.byteOffset,A.length)):v.toArray(A,T)}function _(v,A,T,L){let S=v.value,R=A+"_"+T;if(L[R]===void 0)return typeof S=="number"||typeof S=="boolean"?L[R]=S:ArrayBuffer.isView(S)?L[R]=S.slice():L[R]=S.clone(),!0;{let D=L[R];if(typeof S=="number"||typeof S=="boolean"){if(D!==S)return L[R]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(D.equals(S)===!1)return D.copy(S),!0}}return!1}function g(v){let A=v.uniforms,T=0,L=16;for(let R=0,D=A.length;R<D;R++){let O=Array.isArray(A[R])?A[R]:[A[R]];for(let k=0,q=O.length;k<q;k++){let U=O[k],B=Array.isArray(U.value)?U.value:[U.value];for(let z=0,G=B.length;z<G;z++){let se=B[z],Y=m(se),ee=T%L,ae=ee%Y.boundary,ke=ee+ae;T+=ae,ke!==0&&L-ke<Y.storage&&(T+=L-ke),U.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=T,T+=Y.storage}}}let S=T%L;return S>0&&(T+=L-S),v.__size=T,v.__cache={},this}function m(v){let A={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(A.boundary=4,A.storage=4):v.isVector2?(A.boundary=8,A.storage=8):v.isVector3||v.isColor?(A.boundary=16,A.storage=12):v.isVector4?(A.boundary=16,A.storage=16):v.isMatrix3?(A.boundary=48,A.storage=48):v.isMatrix4?(A.boundary=64,A.storage=64):v.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(A.boundary=16,A.storage=v.byteLength):Pe("WebGLRenderer: Unsupported uniform value type.",v),A}function y(v){let A=v.target;A.removeEventListener("dispose",y);let T=o.indexOf(A.__bindingPointIndex);o.splice(T,1),s.deleteBuffer(i[A.id]),delete i[A.id],delete r[A.id]}function b(){for(let v in i)s.deleteBuffer(i[v]);o=[],i={},r={}}return{bind:l,update:c,dispose:b}}var gE=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),os=null;function _E(){return os===null&&(os=new $n(gE,16,16,Fs,Ri),os.name="DFG_LUT",os.minFilter=jt,os.magFilter=jt,os.wrapS=Kn,os.wrapT=Kn,os.generateMipmaps=!1,os.needsUpdate=!0),os}var jc=class{constructor(e={}){let{canvas:t=Sp(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=ei}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let _=f,g=new Set([fc,dc,va]),m=new Set([ei,gi,Qr,eo,cc,hc]),y=new Uint32Array(4),b=new Int32Array(4),v=new E,A=null,T=null,L=[],S=[],R=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,O=!1,k=null,q=null,U=null,B=null;this._outputColorSpace=Rn;let z=0,G=0,se=null,Y=-1,ee=null,ae=new Ut,ke=new Ut,Be=null,Dt=new Oe(0),Qe=0,yt=t.width,Q=t.height,ne=1,Te=null,Ze=null,Ge=new Ut(0,0,yt,Q),ct=new Ut(0,0,yt,Q),kt=!1,ce=new es,pe=!1,_e=!1,xe=new ut,Ee=new E,ot=new Ut,it={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},lt=!1;function dt(){return se===null?ne:1}let F=n;function Pt(w,V){return t.getContext(w,V)}let vt,I,M,X,J,ie,ve,we,re,ue,Ce,et,Le,Ie,tt,rt,gt,H,me,j,be,Ae,oe;try{let w={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Et,!1),t.addEventListener("webglcontextrestored",It,!1),t.addEventListener("webglcontextcreationerror",_n,!1),F===null){let V="webgl2";if(F=Pt(V,w),F===null)throw Pt(V)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Xe()}catch(w){throw t.removeEventListener("webglcontextlost",Et,!1),t.removeEventListener("webglcontextrestored",It,!1),t.removeEventListener("webglcontextcreationerror",_n,!1),je("WebGLRenderer: "+w.message),w}function Xe(){vt=new wM(F),vt.init(),be=new r_(F,vt),I=new mM(F,vt,e,be),M=new cE(F,vt),I.reversedDepthBuffer&&u&&M.buffers.depth.setReversed(!0),q=F.createFramebuffer(),U=F.createFramebuffer(),B=F.createFramebuffer(),X=new RM(F),J=new Jb,ie=new hE(F,vt,M,J,I,be,X),ve=new EM(D),we=new Py(F),Ae=new fM(F,we),re=new TM(F,we,X,Ae),ue=new PM(F,re,we,Ae,X),H=new CM(F,I,ie),tt=new gM(J),Ce=new Zb(D,ve,vt,I,Ae,tt),et=new pE(D,J),Le=new $b,Ie=new iE(vt),gt=new dM(D,ve,M,ue,p,l),rt=new lE(D,ue,I),oe=new mE(F,X,I,M),me=new pM(F,vt,X),j=new AM(F,vt,X),X.programs=Ce.programs,D.capabilities=I,D.extensions=vt,D.properties=J,D.renderLists=Le,D.shadowMap=rt,D.state=M,D.info=X}_!==ei&&(R=new LM(_,t.width,t.height,a,i,r));let Je=new kp(D,F);this.xr=Je,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let w=vt.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=vt.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return ne},this.setPixelRatio=function(w){w!==void 0&&(ne=w,this.setSize(yt,Q,!1))},this.getSize=function(w){return w.set(yt,Q)},this.setSize=function(w,V,$=!0){if(Je.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}yt=w,Q=V,t.width=Math.floor(w*ne),t.height=Math.floor(V*ne),$===!0&&(t.style.width=w+"px",t.style.height=V+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,w,V)},this.getDrawingBufferSize=function(w){return w.set(yt*ne,Q*ne).floor()},this.setDrawingBufferSize=function(w,V,$){yt=w,Q=V,ne=$,t.width=Math.floor(w*$),t.height=Math.floor(V*$),this.setViewport(0,0,w,V)},this.setEffects=function(w){if(_===ei){je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let V=0;V<w.length;V++)if(w[V].isOutputPass===!0){Pe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(ae)},this.getViewport=function(w){return w.copy(Ge)},this.setViewport=function(w,V,$,W){w.isVector4?Ge.set(w.x,w.y,w.z,w.w):Ge.set(w,V,$,W),M.viewport(ae.copy(Ge).multiplyScalar(ne).round())},this.getScissor=function(w){return w.copy(ct)},this.setScissor=function(w,V,$,W){w.isVector4?ct.set(w.x,w.y,w.z,w.w):ct.set(w,V,$,W),M.scissor(ke.copy(ct).multiplyScalar(ne).round())},this.getScissorTest=function(){return kt},this.setScissorTest=function(w){M.setScissorTest(kt=w)},this.setOpaqueSort=function(w){Te=w},this.setTransparentSort=function(w){Ze=w},this.getClearColor=function(w){return w.copy(gt.getClearColor())},this.setClearColor=function(){gt.setClearColor(...arguments)},this.getClearAlpha=function(){return gt.getClearAlpha()},this.setClearAlpha=function(){gt.setClearAlpha(...arguments)},this.clear=function(w=!0,V=!0,$=!0){let W=0;if(w){let Z=!1;if(se!==null){let Ne=se.texture.format;Z=g.has(Ne)}if(Z){let Ne=se.texture.type,qe=m.has(Ne),De=gt.getClearColor(),Ue=gt.getClearAlpha(),$e=De.r,St=De.g,At=De.b;qe?(y[0]=$e,y[1]=St,y[2]=At,y[3]=Ue,F.clearBufferuiv(F.COLOR,0,y)):(b[0]=$e,b[1]=St,b[2]=At,b[3]=Ue,F.clearBufferiv(F.COLOR,0,b))}else W|=F.COLOR_BUFFER_BIT}V&&(W|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(W|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W!==0&&F.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),k=w},this.dispose=function(){t.removeEventListener("webglcontextlost",Et,!1),t.removeEventListener("webglcontextrestored",It,!1),t.removeEventListener("webglcontextcreationerror",_n,!1),gt.dispose(),Le.dispose(),Ie.dispose(),J.dispose(),ve.dispose(),ue.dispose(),Ae.dispose(),oe.dispose(),Ce.dispose(),Je.dispose(),Je.removeEventListener("sessionstart",ao),Je.removeEventListener("sessionend",Zi),_i.stop()};function Et(w){w.preventDefault(),Vo("WebGLRenderer: Context Lost."),O=!0}function It(){Vo("WebGLRenderer: Context Restored."),O=!1;let w=X.autoReset,V=rt.enabled,$=rt.autoUpdate,W=rt.needsUpdate,Z=rt.type;Xe(),X.autoReset=w,rt.enabled=V,rt.autoUpdate=$,rt.needsUpdate=W,rt.type=Z}function _n(w){je("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Pi(w){let V=w.target;V.removeEventListener("dispose",Pi),Ua(V)}function Ua(w){oo(w),J.remove(w)}function oo(w){let V=J.get(w).programs;V!==void 0&&(V.forEach(function($){Ce.releaseProgram($)}),w.isShaderMaterial&&Ce.releaseShaderCache(w))}this.renderBufferDirect=function(w,V,$,W,Z,Ne){V===null&&(V=it);let qe=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,De=en(w,V,$,W,Z);M.setMaterial(W,qe);let Ue=$.index,$e=1;if(W.wireframe===!0){if(Ue=re.getWireframeAttribute($),Ue===void 0)return;$e=2}let St=$.drawRange,At=$.attributes.position,Ke=St.start*$e,Ht=(St.start+St.count)*$e;Ne!==null&&(Ke=Math.max(Ke,Ne.start*$e),Ht=Math.min(Ht,(Ne.start+Ne.count)*$e)),Ue!==null?(Ke=Math.max(Ke,0),Ht=Math.min(Ht,Ue.count)):At!=null&&(Ke=Math.max(Ke,0),Ht=Math.min(Ht,At.count));let Kt=Ht-Ke;if(Kt<0||Kt===1/0)return;Ae.setup(Z,W,De,$,Ue);let Rt,Vt=me;if(Ue!==null&&(Rt=we.get(Ue),Vt=j,Vt.setIndex(Rt)),Z.isMesh)W.wireframe===!0?(M.setLineWidth(W.wireframeLinewidth*dt()),Vt.setMode(F.LINES)):Vt.setMode(F.TRIANGLES);else if(Z.isLine){let Mn=W.linewidth;Mn===void 0&&(Mn=1),M.setLineWidth(Mn*dt()),Z.isLineSegments?Vt.setMode(F.LINES):Z.isLineLoop?Vt.setMode(F.LINE_LOOP):Vt.setMode(F.LINE_STRIP)}else Z.isPoints?Vt.setMode(F.POINTS):Z.isSprite&&Vt.setMode(F.TRIANGLES);if(Z.isBatchedMesh)if(vt.get("WEBGL_multi_draw"))Vt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{let Mn=Z._multiDrawStarts,Ve=Z._multiDrawCounts,rn=Z._multiDrawCount,Mt=Ue?we.get(Ue).bytesPerElement:1,xn=J.get(W).currentProgram.getUniforms();for(let Tn=0;Tn<rn;Tn++)xn.setValue(F,"_gl_DrawID",Tn),Vt.render(Mn[Tn]/Mt,Ve[Tn])}else if(Z.isInstancedMesh)Vt.renderInstances(Ke,Kt,Z.count);else if($.isInstancedBufferGeometry){let Mn=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Ve=Math.min($.instanceCount,Mn);Vt.renderInstances(Ke,Kt,Ve)}else Vt.render(Ke,Kt)};function ci(w,V,$,W){k!==null&&w.isNodeMaterial&&k.setObject(W,w),pe===!0&&tt.setState(w,$,!1),w.transparent===!0&&w.side===mi&&w.forceSinglePass===!1?(w.side=Cn,w.needsUpdate=!0,ur(w,V,W),w.side=Ds,w.needsUpdate=!0,ur(w,V,W),w.side=mi):ur(w,V,W)}this.compile=function(w,V,$=null){$===null&&($=w),k!==null&&k.renderStart(w,V,$),T=Ie.get($),T.init(V),S.push(T),$.traverseVisible(function(Z){Z.isLight&&Z.layers.test(V.layers)&&(T.pushLight(Z),Z.castShadow&&T.pushShadow(Z))}),w!==$&&w.traverseVisible(function(Z){Z.isLight&&Z.layers.test(V.layers)&&(T.pushLight(Z),Z.castShadow&&T.pushShadow(Z))}),T.setupLights(),k!==null&&k.updateLights(T.state.lightsArray),_e=this.localClippingEnabled,pe=tt.init(this.clippingPlanes,_e),pe===!0&&tt.setGlobalState(this.clippingPlanes,V),k!==null&&rt.render(T.state.shadowsArray,$,V);let W=new Set;return w.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;let Ne=Z.material;if(Ne)if(Array.isArray(Ne))for(let qe=0;qe<Ne.length;qe++){let De=Ne[qe];ci(De,$,V,Z),W.add(De)}else ci(Ne,$,V,Z),W.add(Ne)}),T=S.pop(),k!==null&&k.renderEnd(),W},this.compileAsync=function(w,V,$=null){let W=this.compile(w,V,$);return new Promise(Z=>{function Ne(){if(W.forEach(function(qe){let Ue=J.get(qe).currentProgram;(Ue===void 0||Ue.isReady())&&W.delete(qe)}),W.size===0){Z(w);return}setTimeout(Ne,10)}vt.get("KHR_parallel_shader_compile")!==null?Ne():setTimeout(Ne,10)})};let hs=null;function th(w){hs&&hs(w)}function ao(){_i.stop()}function Zi(){_i.start()}let _i=new Q0;_i.setAnimationLoop(th),typeof self<"u"&&_i.setContext(self),this.setAnimationLoop=function(w){hs=w,Je.setAnimationLoop(w),w===null?_i.stop():_i.start()},Je.addEventListener("sessionstart",ao),Je.addEventListener("sessionend",Zi),this.render=function(w,V){if(V!==void 0&&V.isCamera!==!0){je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;k!==null&&k.renderStart(w,V);let $=Je.enabled===!0&&Je.isPresenting===!0,W=R!==null&&(se===null||$)&&R.begin(D,se);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Je.enabled===!0&&Je.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Je.cameraAutoUpdate===!0&&Je.updateCamera(V),V=Je.getCamera()),w.isScene===!0&&w.onBeforeRender(D,w,V,se),T=Ie.get(w,S.length),T.init(V),T.state.textureUnits=ie.getTextureUnits(),S.push(T),xe.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),ce.setFromProjectionMatrix(xe,ri,V.reversedDepth),_e=this.localClippingEnabled,pe=tt.init(this.clippingPlanes,_e),A=Le.get(w,L.length),A.init(),L.push(A),Je.enabled===!0&&Je.isPresenting===!0){let qe=D.xr.getDepthSensingMesh();qe!==null&&fn(qe,V,-1/0,D.sortObjects)}fn(w,V,0,D.sortObjects),A.finish(),k!==null&&k.updateLights(T.state.lightsArray),D.sortObjects===!0&&A.sort(Te,Ze),lt=Je.enabled===!1||Je.isPresenting===!1||Je.hasDepthSensing()===!1,lt&&gt.addToRenderList(A,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),pe===!0&&tt.beginShadows();let Z=T.state.shadowsArray;if(rt.render(Z,w,V),pe===!0&&tt.endShadows(),(W&&R.hasRenderPass())===!1){let qe=A.opaque,De=A.transmissive;if(T.setupLights(),V.isArrayCamera){let Ue=V.cameras;if(De.length>0)for(let $e=0,St=Ue.length;$e<St;$e++){let At=Ue[$e];Fa(qe,De,w,At)}lt&&gt.render(w);for(let $e=0,St=Ue.length;$e<St;$e++){let At=Ue[$e];Ji(A,w,At,At.viewport)}}else De.length>0&&Fa(qe,De,w,V),lt&&gt.render(w),Ji(A,w,V)}se!==null&&G===0&&(ie.updateMultisampleRenderTarget(se),ie.updateRenderTargetMipmap(se)),W&&R.end(D),w.isScene===!0&&w.onAfterRender(D,w,V),Ae.resetDefaultState(),Y=-1,ee=null,S.pop(),S.length>0?(T=S[S.length-1],ie.setTextureUnits(T.state.textureUnits),pe===!0&&tt.setGlobalState(D.clippingPlanes,T.state.camera)):T=null,L.pop(),L.length>0?A=L[L.length-1]:A=null,k!==null&&k.renderEnd()};function fn(w,V,$,W){if(w.visible===!1)return;if(w.layers.test(V.layers)){if(w.isGroup)$=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(V);else if(w.isLightProbeGrid)T.pushLightProbeGrid(w);else if(w.isLight)T.pushLight(w),w.castShadow&&T.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(ce)){W&&ot.setFromMatrixPosition(w.matrixWorld).applyMatrix4(xe);let qe=ue.update(w),De=w.material;De.visible&&A.push(w,qe,De,$,ot.z,null,V)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(ce))){let qe=ue.update(w),De=w.material;if(W&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ot.copy(w.boundingSphere.center)):(qe.boundingSphere===null&&qe.computeBoundingSphere(),ot.copy(qe.boundingSphere.center)),ot.applyMatrix4(w.matrixWorld).applyMatrix4(xe)),Array.isArray(De)){let Ue=qe.groups;for(let $e=0,St=Ue.length;$e<St;$e++){let At=Ue[$e],Ke=De[At.materialIndex];Ke&&Ke.visible&&A.push(w,qe,Ke,$,ot.z,At,V)}}else De.visible&&A.push(w,qe,De,$,ot.z,null,V)}}let Ne=w.children;for(let qe=0,De=Ne.length;qe<De;qe++)fn(Ne[qe],V,$,W)}function Ji(w,V,$,W){let{opaque:Z,transmissive:Ne,transparent:qe}=w;T.setupLightsView($),pe===!0&&tt.setGlobalState(D.clippingPlanes,$),W&&M.viewport(ae.copy(W)),Z.length>0&&xi(Z,V,$),Ne.length>0&&xi(Ne,V,$),qe.length>0&&xi(qe,V,$),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function Fa(w,V,$,W){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[W.id]===void 0){let Ke=vt.has("EXT_color_buffer_half_float")||vt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[W.id]=new Pn(1,1,{generateMipmaps:!0,type:Ke?Ri:ei,minFilter:Yi,samples:Math.max(4,I.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ct.workingColorSpace})}let Ne=T.state.transmissionRenderTarget[W.id],qe=W.viewport||ae;Ne.setSize(qe.z*D.transmissionResolutionScale,qe.w*D.transmissionResolutionScale);let De=D.getRenderTarget(),Ue=D.getActiveCubeFace(),$e=D.getActiveMipmapLevel();D.setRenderTarget(Ne),D.getClearColor(Dt),Qe=D.getClearAlpha(),Qe<1&&D.setClearColor(16777215,.5),D.clear(),lt&&gt.render($);let St=D.toneMapping;D.toneMapping=Ai;let At=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),T.setupLightsView(W),pe===!0&&tt.setGlobalState(D.clippingPlanes,W),xi(w,$,W),ie.updateMultisampleRenderTarget(Ne),ie.updateRenderTargetMipmap(Ne),vt.has("WEBGL_multisampled_render_to_texture")===!1){let Ke=!1;for(let Ht=0,Kt=V.length;Ht<Kt;Ht++){let Rt=V[Ht],{object:Vt,geometry:Mn,material:Ve,group:rn}=Rt;if(Ve.side===mi&&Vt.layers.test(W.layers)){let Mt=Ve.side;Ve.side=Cn,Ve.needsUpdate=!0,Oa(Vt,$,W,Mn,Ve,rn),Ve.side=Mt,Ve.needsUpdate=!0,Ke=!0}}Ke===!0&&(ie.updateMultisampleRenderTarget(Ne),ie.updateRenderTargetMipmap(Ne))}D.setRenderTarget(De,Ue,$e),D.setClearColor(Dt,Qe),At!==void 0&&(W.viewport=At),D.toneMapping=St}function xi(w,V,$){let W=V.isScene===!0?V.overrideMaterial:null;for(let Z=0,Ne=w.length;Z<Ne;Z++){let qe=w[Z],{object:De,geometry:Ue,group:$e}=qe,St=qe.material;St.allowOverride===!0&&W!==null&&(St=W),De.layers.test($.layers)&&Oa(De,V,$,Ue,St,$e)}}function Oa(w,V,$,W,Z,Ne){k!==null&&Z.isNodeMaterial&&k.setObject(w,Z),w.onBeforeRender(D,V,$,W,Z,Ne),w.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),Z.onBeforeRender(D,V,$,W,w,Ne),Z.transparent===!0&&Z.side===mi&&Z.forceSinglePass===!1?(Z.side=Cn,Z.needsUpdate=!0,D.renderBufferDirect($,V,W,Z,w,Ne),Z.side=Ds,Z.needsUpdate=!0,D.renderBufferDirect($,V,W,Z,w,Ne),Z.side=mi):D.renderBufferDirect($,V,W,Z,w,Ne),w.onAfterRender(D,V,$,W,Z,Ne)}function ur(w,V,$){V.isScene!==!0&&(V=it);let W=J.get(w),Z=T.state.lights,Ne=T.state.shadowsArray,qe=Z.state.version,De=Ce.getParameters(w,Z.state,Ne,V,$,T.state.lightProbeGridArray),Ue=Ce.getProgramCacheKey(De),$e=W.programs;W.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?V.environment:null,W.fog=V.fog;let St=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;W.envMap=ve.get(w.envMap||W.environment,St),W.envMapRotation=W.environment!==null&&w.envMap===null?V.environmentRotation:w.envMapRotation,$e===void 0&&(w.addEventListener("dispose",Pi),$e=new Map,W.programs=$e);let At=$e.get(Ue);if(At!==void 0){if(W.currentProgram===At&&W.lightsStateVersion===qe)return nt(w,De),At}else De.uniforms=Ce.getUniforms(w),k!==null&&w.isNodeMaterial&&k.build(w,$,De),w.onBeforeCompile(De,D),At=Ce.acquireProgram(De,Ue),$e.set(Ue,At),W.uniforms=De.uniforms;let Ke=W.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ke.clippingPlanes=tt.uniform),nt(w,De),W.needsLights=Ba(w),W.lightsStateVersion=qe,W.needsLights&&(Ke.ambientLightColor.value=Z.state.ambient,Ke.lightProbe.value=Z.state.probe,Ke.sunLights.value=Z.state.sun,Ke.sunLightShadows.value=Z.state.sunShadow,Ke.directionalLights.value=Z.state.directional,Ke.directionalLightShadows.value=Z.state.directionalShadow,Ke.spotLights.value=Z.state.spot,Ke.spotLightShadows.value=Z.state.spotShadow,Ke.rectAreaLights.value=Z.state.rectArea,Ke.ltc_1.value=Z.state.rectAreaLTC1,Ke.ltc_2.value=Z.state.rectAreaLTC2,Ke.pointLights.value=Z.state.point,Ke.pointLightShadows.value=Z.state.pointShadow,Ke.hemisphereLights.value=Z.state.hemi,Ke.sunShadowMatrix.value=Z.state.sunShadowMatrix,Ke.sunShadowCascade.value=Z.state.sunShadowCascade,Ke.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Ke.spotLightMatrix.value=Z.state.spotLightMatrix,Ke.spotLightMap.value=Z.state.spotLightMap,Ke.pointShadowMatrix.value=Z.state.pointShadowMatrix),W.lightProbeGrid=T.state.lightProbeGridArray.length>0,W.currentProgram=At,W.uniformsList=null,At}function nh(w){if(w.uniformsList===null){let V=w.currentProgram.getUniforms();w.uniformsList=Pa.seqWithValue(V.seq,w.uniforms)}return w.uniformsList}function nt(w,V){let $=J.get(w);$.outputColorSpace=V.outputColorSpace,$.batching=V.batching,$.batchingColor=V.batchingColor,$.instancing=V.instancing,$.instancingColor=V.instancingColor,$.instancingMorph=V.instancingMorph,$.skinning=V.skinning,$.morphTargets=V.morphTargets,$.morphNormals=V.morphNormals,$.morphColors=V.morphColors,$.morphTargetsCount=V.morphTargetsCount,$.numClippingPlanes=V.numClippingPlanes,$.numIntersection=V.numClipIntersection,$.vertexAlphas=V.vertexAlphas,$.vertexTangents=V.vertexTangents,$.toneMapping=V.toneMapping}function sn(w,V){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;v.setFromMatrixPosition(V.matrixWorld);for(let $=0,W=w.length;$<W;$++){let Z=w[$];if(Z.texture!==null&&Z.boundingBox.containsPoint(v))return Z}return null}function en(w,V,$,W,Z){V.isScene!==!0&&(V=it),ie.resetTextureUnits();let Ne=V.fog,qe=W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial?V.environment:null,De=se===null?D.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:Ct.workingColorSpace,Ue=W.isMeshStandardMaterial||W.isMeshLambertMaterial&&!W.envMap||W.isMeshPhongMaterial&&!W.envMap,$e=ve.get(W.envMap||qe,Ue),St=W.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,At=!!$.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ke=!!$.morphAttributes.position,Ht=!!$.morphAttributes.normal,Kt=!!$.morphAttributes.color,Rt=Ai;W.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Rt=D.toneMapping);let Vt=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Mn=Vt!==void 0?Vt.length:0,Ve=J.get(W),rn=T.state.lights;if(pe===!0&&(_e===!0||w!==ee)){let Ot=w===ee&&W.id===Y;tt.setState(W,w,Ot)}let Mt=!1;W.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==rn.state.version||Ve.outputColorSpace!==De||Z.isBatchedMesh&&Ve.batching===!1||!Z.isBatchedMesh&&Ve.batching===!0||Z.isBatchedMesh&&Ve.batchingColor===!0&&Z._colorsTexture===null||Z.isBatchedMesh&&Ve.batchingColor===!1&&Z._colorsTexture!==null||Z.isInstancedMesh&&Ve.instancing===!1||!Z.isInstancedMesh&&Ve.instancing===!0||Z.isSkinnedMesh&&Ve.skinning===!1||!Z.isSkinnedMesh&&Ve.skinning===!0||Z.isInstancedMesh&&Ve.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Ve.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Ve.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Ve.instancingMorph===!1&&Z.morphTexture!==null||Ve.envMap!==$e||W.fog===!0&&Ve.fog!==Ne||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==tt.numPlanes||Ve.numIntersection!==tt.numIntersection)||Ve.vertexAlphas!==St||Ve.vertexTangents!==At||Ve.morphTargets!==Ke||Ve.morphNormals!==Ht||Ve.morphColors!==Kt||Ve.toneMapping!==Rt||Ve.morphTargetsCount!==Mn||!!Ve.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Mt=!0):(Mt=!0,Ve.__version=W.version);let xn=Ve.currentProgram;Mt===!0&&(xn=ur(W,V,Z),k&&W.isNodeMaterial&&k.onUpdateProgram(W,xn,Ve));let Tn=!1,Ii=!1,yi=!1,Nt=xn.getUniforms(),on=Ve.uniforms;if(M.useProgram(xn.program)&&(Tn=!0,Ii=!0,yi=!0),W.id!==Y&&(Y=W.id,Ii=!0),Ve.needsLights){let Ot=sn(T.state.lightProbeGridArray,Z);Ve.lightProbeGrid!==Ot&&(Ve.lightProbeGrid=Ot,Ii=!0)}if(Tn||ee!==w){M.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Nt.setValue(F,"projectionMatrix",w.projectionMatrix),Nt.setValue(F,"viewMatrix",w.matrixWorldInverse);let Ki=Nt.map.cameraPosition;Ki!==void 0&&Ki.setValue(F,Ee.setFromMatrixPosition(w.matrixWorld)),I.logarithmicDepthBuffer&&Nt.setValue(F,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Nt.setValue(F,"isOrthographic",w.isOrthographicCamera===!0),ee!==w&&(ee=w,Ii=!0,yi=!0)}if(Ve.needsLights&&(rn.state.sunShadowMap.length>0&&Nt.setValue(F,"sunShadowMap",rn.state.sunShadowMap,ie),rn.state.directionalShadowMap.length>0&&Nt.setValue(F,"directionalShadowMap",rn.state.directionalShadowMap,ie),rn.state.spotShadowMap.length>0&&Nt.setValue(F,"spotShadowMap",rn.state.spotShadowMap,ie),rn.state.pointShadowMap.length>0&&Nt.setValue(F,"pointShadowMap",rn.state.pointShadowMap,ie)),Z.isSkinnedMesh){Nt.setOptional(F,Z,"bindMatrix"),Nt.setOptional(F,Z,"bindMatrixInverse");let Ot=Z.skeleton;Ot&&(Ot.boneTexture===null&&Ot.computeBoneTexture(),Nt.setValue(F,"boneTexture",Ot.boneTexture,ie))}Z.isBatchedMesh&&(Nt.setOptional(F,Z,"batchingTexture"),Nt.setValue(F,"batchingTexture",Z._matricesTexture,ie),Nt.setOptional(F,Z,"batchingIdTexture"),Nt.setValue(F,"batchingIdTexture",Z._indirectTexture,ie),Nt.setOptional(F,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Nt.setValue(F,"batchingColorTexture",Z._colorsTexture,ie));let qn=$.morphAttributes;if((qn.position!==void 0||qn.normal!==void 0||qn.color!==void 0)&&H.update(Z,$,xn),(Ii||Ve.receiveShadow!==Z.receiveShadow)&&(Ve.receiveShadow=Z.receiveShadow,Nt.setValue(F,"receiveShadow",Z.receiveShadow)),(W.isMeshStandardMaterial||W.isMeshLambertMaterial||W.isMeshPhongMaterial)&&W.envMap===null&&V.environment!==null&&(on.envMapIntensity.value=V.environmentIntensity),on.dfgLUT!==void 0&&(on.dfgLUT.value=_E()),Ii){if(Nt.setValue(F,"toneMappingExposure",D.toneMappingExposure),Ve.needsLights&&ti(on,yi),Ne&&W.fog===!0&&et.refreshFogUniforms(on,Ne),et.refreshMaterialUniforms(on,W,ne,Q,T.state.transmissionRenderTarget[w.id]),Ve.needsLights&&Ve.lightProbeGrid){let Ot=Ve.lightProbeGrid;on.probesSH.value=Ot.texture,on.probesMin.value.copy(Ot.boundingBox.min),on.probesMax.value.copy(Ot.boundingBox.max),on.probesResolution.value.copy(Ot.resolution)}Pa.upload(F,nh(Ve),on,ie)}if(W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Pa.upload(F,nh(Ve),on,ie),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Nt.setValue(F,"center",Z.center),Nt.setValue(F,"modelViewMatrix",Z.modelViewMatrix),Nt.setValue(F,"normalMatrix",Z.normalMatrix),Nt.setValue(F,"modelMatrix",Z.matrixWorld),W.uniformsGroups!==void 0){let Ot=W.uniformsGroups;for(let Ki=0,Bs=Ot.length;Ki<Bs;Ki++){let za=Ot[Ki];oe.update(za,xn),oe.bind(za,xn)}}return xn}function ti(w,V){w.ambientLightColor.needsUpdate=V,w.lightProbe.needsUpdate=V,w.sunLights.needsUpdate=V,w.sunLightShadows.needsUpdate=V,w.directionalLights.needsUpdate=V,w.directionalLightShadows.needsUpdate=V,w.pointLights.needsUpdate=V,w.pointLightShadows.needsUpdate=V,w.spotLights.needsUpdate=V,w.spotLightShadows.needsUpdate=V,w.rectAreaLights.needsUpdate=V,w.hemisphereLights.needsUpdate=V}function Ba(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return se},this.setRenderTargetTextures=function(w,V,$){let W=J.get(w);W.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,W.__autoAllocateDepthBuffer===!1&&(W.__useRenderToTexture=!1),J.get(w.texture).__webglTexture=V,J.get(w.depthTexture).__webglTexture=W.__autoAllocateDepthBuffer?void 0:$,W.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,V){let $=J.get(w);$.__webglFramebuffer=V,$.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(w,V=0,$=0){se=w,z=V,G=$;let W=null,Z=!1,Ne=!1;if(w){let De=J.get(w);if(De.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(F.FRAMEBUFFER,De.__webglFramebuffer),ae.copy(w.viewport),ke.copy(w.scissor),Be=w.scissorTest,M.viewport(ae),M.scissor(ke),M.setScissorTest(Be),Y=-1;return}else if(De.__webglFramebuffer===void 0)ie.setupRenderTarget(w);else if(De.__hasExternalTextures)ie.rebindTextures(w,J.get(w.texture).__webglTexture,J.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let St=w.depthTexture;if(De.__boundDepthTexture!==St){if(St!==null&&J.has(St)&&(w.width!==St.image.width||w.height!==St.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ie.setupDepthRenderbuffer(w)}}let Ue=w.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(Ne=!0);let $e=J.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray($e[V])?W=$e[V][$]:W=$e[V],Z=!0):w.samples>0&&ie.useMultisampledRTT(w)===!1?W=J.get(w).__webglMultisampledFramebuffer:Array.isArray($e)?W=$e[$]:W=$e,ae.copy(w.viewport),ke.copy(w.scissor),Be=w.scissorTest}else ae.copy(Ge).multiplyScalar(ne).floor(),ke.copy(ct).multiplyScalar(ne).floor(),Be=kt;if($!==0&&(W=q),M.bindFramebuffer(F.FRAMEBUFFER,W)&&M.drawBuffers(w,W),M.viewport(ae),M.scissor(ke),M.setScissorTest(Be),Z){let De=J.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+V,De.__webglTexture,$)}else if(Ne){let De=V;for(let Ue=0;Ue<w.textures.length;Ue++){let $e=J.get(w.textures[Ue]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Ue,$e.__webglTexture,$,De)}}else if(w!==null&&$!==0){let De=J.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,De.__webglTexture,$)}Y=-1};function ih(w){let V=J.get(w);return(V.__readFormat!==w.format||V.__readType!==w.type)&&(V.__readFormat=w.format,V.__readType=w.type,V.__formatReadable=I.textureFormatReadable(w.format),V.__typeReadable=I.textureTypeReadable(w.type)),V}this.readRenderTargetPixels=function(w,V,$,W,Z,Ne,qe,De=0){if(!(w&&w.isWebGLRenderTarget)){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=J.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&qe!==void 0&&(Ue=Ue[qe]),Ue){M.bindFramebuffer(F.FRAMEBUFFER,Ue);try{let $e=w.textures[De],St=$e.format,At=$e.type;w.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+De);let Ke=ih($e);if(Ke.__formatReadable===!1){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ke.__typeReadable===!1){je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=w.width-W&&$>=0&&$<=w.height-Z&&F.readPixels(V,$,W,Z,be.convert(St),be.convert(At),Ne)}finally{let $e=se!==null?J.get(se).__webglFramebuffer:null;M.bindFramebuffer(F.FRAMEBUFFER,$e)}}},this.readRenderTargetPixelsAsync=async function(w,V,$,W,Z,Ne,qe,De=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ue=J.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&qe!==void 0&&(Ue=Ue[qe]),Ue)if(V>=0&&V<=w.width-W&&$>=0&&$<=w.height-Z){M.bindFramebuffer(F.FRAMEBUFFER,Ue);let $e=w.textures[De],St=$e.format,At=$e.type;w.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+De);let Ke=ih($e);if(Ke.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ke.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Ht=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Ht),F.bufferData(F.PIXEL_PACK_BUFFER,Ne.byteLength,F.STREAM_READ),F.readPixels(V,$,W,Z,be.convert(St),be.convert(At),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Kt=se!==null?J.get(se).__webglFramebuffer:null;M.bindFramebuffer(F.FRAMEBUFFER,Kt);let Rt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await v0(F,Rt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Ht),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Ne),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(Ht),F.deleteSync(Rt),Ne}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,V=null,$=0){let W=Math.pow(2,-$),Z=Math.floor(w.image.width*W),Ne=Math.floor(w.image.height*W),qe=V!==null?V.x:0,De=V!==null?V.y:0;ie.setTexture2D(w,0),F.copyTexSubImage2D(F.TEXTURE_2D,$,0,0,qe,De,Z,Ne),M.unbindTexture()},this.copyTextureToTexture=function(w,V,$=null,W=null,Z=0,Ne=0){let qe,De,Ue,$e,St,At,Ke,Ht,Kt,Rt=w.isCompressedTexture?w.mipmaps[Ne]:w.image;if($!==null)qe=$.max.x-$.min.x,De=$.max.y-$.min.y,Ue=$.isBox3?$.max.z-$.min.z:1,$e=$.min.x,St=$.min.y,At=$.isBox3?$.min.z:0;else{let on=Math.pow(2,-Z);qe=Math.floor(Rt.width*on),De=Math.floor(Rt.height*on),w.isDataArrayTexture?Ue=Rt.depth:w.isData3DTexture?Ue=Math.floor(Rt.depth*on):Ue=1,$e=0,St=0,At=0}W!==null?(Ke=W.x,Ht=W.y,Kt=W.z):(Ke=0,Ht=0,Kt=0);let Vt=be.convert(V.format),Mn=be.convert(V.type),Ve;V.isData3DTexture?(ie.setTexture3D(V,0),Ve=F.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(ie.setTexture2DArray(V,0),Ve=F.TEXTURE_2D_ARRAY):(ie.setTexture2D(V,0),Ve=F.TEXTURE_2D),M.activeTexture(F.TEXTURE0),M.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,V.flipY),M.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),M.pixelStorei(F.UNPACK_ALIGNMENT,V.unpackAlignment);let rn=M.getParameter(F.UNPACK_ROW_LENGTH),Mt=M.getParameter(F.UNPACK_IMAGE_HEIGHT),xn=M.getParameter(F.UNPACK_SKIP_PIXELS),Tn=M.getParameter(F.UNPACK_SKIP_ROWS),Ii=M.getParameter(F.UNPACK_SKIP_IMAGES);M.pixelStorei(F.UNPACK_ROW_LENGTH,Rt.width),M.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Rt.height),M.pixelStorei(F.UNPACK_SKIP_PIXELS,$e),M.pixelStorei(F.UNPACK_SKIP_ROWS,St),M.pixelStorei(F.UNPACK_SKIP_IMAGES,At);let yi=w.isDataArrayTexture||w.isData3DTexture,Nt=V.isDataArrayTexture||V.isData3DTexture;if(w.isDepthTexture){let on=J.get(w),qn=J.get(V),Ot=J.get(on.__renderTarget),Ki=J.get(qn.__renderTarget);M.bindFramebuffer(F.READ_FRAMEBUFFER,Ot.__webglFramebuffer),M.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ki.__webglFramebuffer);for(let Bs=0;Bs<Ue;Bs++)yi&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,J.get(w).__webglTexture,Z,At+Bs),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,J.get(V).__webglTexture,Ne,Kt+Bs)),F.blitFramebuffer($e,St,qe,De,Ke,Ht,qe,De,F.DEPTH_BUFFER_BIT,F.NEAREST);M.bindFramebuffer(F.READ_FRAMEBUFFER,null),M.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(Z!==0||w.isRenderTargetTexture||J.has(w)){let on=J.get(w),qn=J.get(V);M.bindFramebuffer(F.READ_FRAMEBUFFER,U),M.bindFramebuffer(F.DRAW_FRAMEBUFFER,B);for(let Ot=0;Ot<Ue;Ot++)yi?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,on.__webglTexture,Z,At+Ot):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,on.__webglTexture,Z),Nt?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,qn.__webglTexture,Ne,Kt+Ot):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,qn.__webglTexture,Ne),Z!==0?F.blitFramebuffer($e,St,qe,De,Ke,Ht,qe,De,F.COLOR_BUFFER_BIT,F.NEAREST):Nt?F.copyTexSubImage3D(Ve,Ne,Ke,Ht,Kt+Ot,$e,St,qe,De):F.copyTexSubImage2D(Ve,Ne,Ke,Ht,$e,St,qe,De);M.bindFramebuffer(F.READ_FRAMEBUFFER,null),M.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else Nt?w.isDataTexture||w.isData3DTexture?F.texSubImage3D(Ve,Ne,Ke,Ht,Kt,qe,De,Ue,Vt,Mn,Rt.data):V.isCompressedArrayTexture?F.compressedTexSubImage3D(Ve,Ne,Ke,Ht,Kt,qe,De,Ue,Vt,Rt.data):F.texSubImage3D(Ve,Ne,Ke,Ht,Kt,qe,De,Ue,Vt,Mn,Rt):w.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Ne,Ke,Ht,qe,De,Vt,Mn,Rt.data):w.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Ne,Ke,Ht,Rt.width,Rt.height,Vt,Rt.data):F.texSubImage2D(F.TEXTURE_2D,Ne,Ke,Ht,qe,De,Vt,Mn,Rt);M.pixelStorei(F.UNPACK_ROW_LENGTH,rn),M.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Mt),M.pixelStorei(F.UNPACK_SKIP_PIXELS,xn),M.pixelStorei(F.UNPACK_SKIP_ROWS,Tn),M.pixelStorei(F.UNPACK_SKIP_IMAGES,Ii),Ne===0&&V.generateMipmaps&&F.generateMipmap(Ve),M.unbindTexture()},this.initRenderTarget=function(w){J.get(w).__webglFramebuffer===void 0&&ie.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?ie.setTextureCube(w,0):w.isData3DTexture?ie.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?ie.setTexture2DArray(w,0):ie.setTexture2D(w,0),M.unbindTexture()},this.resetState=function(){z=0,G=0,se=null,M.reset(),Ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ct._getUnpackColorSpace()}};var a_={type:"change"},Wp={type:"start"},c_={type:"end"},Ed=new zi,l_=new si,xE=Math.cos(70*Nn.DEG2RAD),wn=new E,li=2*Math.PI,Jt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Gp=1e-6,wd=class extends da{constructor(e,t=null){super(e,t),this.state=Jt.NONE,this.target=new E,this.cursor=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Is.ROTATE,MIDDLE:Is.DOLLY,RIGHT:Is.PAN},this.touches={ONE:Ls.ROTATE,TWO:Ls.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new E,this._lastQuaternion=new gn,this._lastTargetPosition=new E,this._quat=new gn().setFromUnitVectors(e.up,new E(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Zr,this._sphericalDelta=new Zr,this._scale=1,this._panOffset=new E,this._rotateStart=new le,this._rotateEnd=new le,this._rotateDelta=new le,this._panStart=new le,this._panEnd=new le,this._panDelta=new le,this._dollyStart=new le,this._dollyEnd=new le,this._dollyDelta=new le,this._dollyDirection=new E,this._mouse=new le,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=vE.bind(this),this._onPointerDown=yE.bind(this),this._onPointerUp=SE.bind(this),this._onContextMenu=RE.bind(this),this._onMouseWheel=EE.bind(this),this._onKeyDown=wE.bind(this),this._onTouchStart=TE.bind(this),this._onTouchMove=AE.bind(this),this._onMouseDown=ME.bind(this),this._onMouseMove=bE.bind(this),this._interceptControlDown=CE.bind(this),this._interceptControlUp=PE.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Jt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(a_),this.update(),this.state=Jt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;wn.copy(t).sub(this.target),wn.applyQuaternion(this._quat),this._spherical.setFromVector3(wn),this.autoRotate&&this.state===Jt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=li:n>Math.PI&&(n-=li),i<-Math.PI?i+=li:i>Math.PI&&(i-=li),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(wn.setFromSpherical(this._spherical),wn.applyQuaternion(this._quatInverse),t.copy(this.target).add(wn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=wn.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new E(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new E(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=wn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ed.origin.copy(this.object.position),Ed.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ed.direction))<xE?this.object.lookAt(this.target):(l_.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ed.intersectPlane(l_,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Gp||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Gp||this._lastTargetPosition.distanceToSquared(this.target)>Gp?(this.dispatchEvent(a_),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?li/60*this.autoRotateSpeed*e:li/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){wn.setFromMatrixColumn(t,0),wn.multiplyScalar(-e),this._panOffset.add(wn)}_panUp(e,t){this.screenSpacePanning===!0?wn.setFromMatrixColumn(t,1):(wn.setFromMatrixColumn(t,0),wn.crossVectors(this.object.up,wn)),wn.multiplyScalar(e),this._panOffset.add(wn)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;wn.copy(i).sub(this.target);let r=wn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=i/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(li*this._rotateDelta.x/t.clientHeight),this._rotateUp(li*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(li*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-li*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(li*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-li*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(li*this._rotateDelta.x/t.clientHeight),this._rotateUp(li*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new le,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function yE(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function vE(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function SE(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(c_),this.state=Jt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function ME(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Is.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=Jt.DOLLY;break;case Is.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Jt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Jt.ROTATE}break;case Is.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Jt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Jt.PAN}break;default:this.state=Jt.NONE}this.state!==Jt.NONE&&this.dispatchEvent(Wp)}function bE(s){switch(this.state){case Jt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case Jt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case Jt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function EE(s){this.enabled===!1||this.enableZoom===!1||this.state!==Jt.NONE||(s.preventDefault(),this.dispatchEvent(Wp),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(c_))}function wE(s){this.enabled!==!1&&this._handleKeyDown(s)}function TE(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Ls.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=Jt.TOUCH_ROTATE;break;case Ls.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=Jt.TOUCH_PAN;break;default:this.state=Jt.NONE}break;case 2:switch(this.touches.TWO){case Ls.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=Jt.TOUCH_DOLLY_PAN;break;case Ls.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=Jt.TOUCH_DOLLY_ROTATE;break;default:this.state=Jt.NONE}break;default:this.state=Jt.NONE}this.state!==Jt.NONE&&this.dispatchEvent(Wp)}function AE(s){switch(this._trackPointer(s),this.state){case Jt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case Jt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case Jt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case Jt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=Jt.NONE}}function RE(s){this.enabled!==!1&&s.preventDefault()}function CE(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function PE(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Qc=new E;function Ci(s,e,t,n,i,r){let o=2*Math.PI*i/4,a=Math.max(r-2*i,0),l=Math.PI/4;Qc.copy(e),Qc[n]=0,Qc.normalize();let c=.5*o/(o+a),h=1-Qc.angleTo(s)/l;return Math.sign(Qc[t])===1?h*c:a/(o+a)+c+c*(1-h)}var cr=class s extends In{constructor(e=1,t=1,n=1,i=2,r=.1){let o=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let l=new E,c=new E,h=new E(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,p=d.length/6,_=new E,g=.5/o;for(let m=0,y=0;m<d.length;m+=3,y+=2)switch(l.fromArray(d,m),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),d[m+0]=h.x*Math.sign(l.x)+c.x*r,d[m+1]=h.y*Math.sign(l.y)+c.y*r,d[m+2]=h.z*Math.sign(l.z)+c.z*r,u[m+0]=c.x,u[m+1]=c.y,u[m+2]=c.z,Math.floor(m/p)){case 0:_.set(1,0,0),f[y+0]=Ci(_,c,"z","y",r,n),f[y+1]=1-Ci(_,c,"y","z",r,t);break;case 1:_.set(-1,0,0),f[y+0]=1-Ci(_,c,"z","y",r,n),f[y+1]=1-Ci(_,c,"y","z",r,t);break;case 2:_.set(0,1,0),f[y+0]=1-Ci(_,c,"x","z",r,e),f[y+1]=Ci(_,c,"z","x",r,n);break;case 3:_.set(0,-1,0),f[y+0]=1-Ci(_,c,"x","z",r,e),f[y+1]=1-Ci(_,c,"z","x",r,n);break;case 4:_.set(0,0,1),f[y+0]=1-Ci(_,c,"x","y",r,e),f[y+1]=1-Ci(_,c,"y","x",r,t);break;case 5:_.set(0,0,-1),f[y+0]=Ci(_,c,"x","y",r,e),f[y+1]=1-Ci(_,c,"y","x",r,t);break}}static fromJSON(e){return new s(e.width,e.height,e.depth,e.segments,e.radius)}};var Td=class extends Ms{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new In;e.deleteAttribute("uv");let t=new at({side:Cn}),n=new at,i=new Yr(16777215,900,28,2);i.position.set(.418,16.199,.3),this.add(i);let r=new zt(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new Es(e,n,6),a=new Ft;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let l=new zt(e,Da(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new zt(e,Da(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new zt(e,Da(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let d=new zt(e,Da(43));d.position.set(-.462,8.89,14.52),d.scale.set(4.38,5.441,.088),this.add(d);let u=new zt(e,Da(20));u.position.set(3.235,11.486,-12.541),u.scale.set(2.5,2,.1),this.add(u);let f=new zt(e,Da(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}};function Da(s){return new Vr({color:0,emissive:16777215,emissiveIntensity:s})}var h_=new tn,Ad=new E,Na=class extends qr{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new ze(e,3)),this.setAttribute("uv",new ze(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Ps(t,6,1);return this.setAttribute("instanceStart",new Wn(n,3,0)),this.setAttribute("instanceEnd",new Wn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Ps(t,6,1);return this.setAttribute("instanceColorStart",new Wn(n,3,0)),this.setAttribute("instanceColorEnd",new Wn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new zr(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),h_.setFromBufferAttribute(t),this.boundingBox.union(h_))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new nn),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Ad.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Ad)),Ad.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ad));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};Re.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new le},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Yn.line={uniforms:Aa.merge([Re.common,Re.fog,Re.line]),vertexShader:`
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
		`};var Os=class extends Ln{constructor(e){super({type:"LineMaterial",uniforms:Aa.clone(Yn.line.uniforms),vertexShader:Yn.line.vertexShader,fragmentShader:Yn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var Xp=new Ut,u_=new E,d_=new E,Un=new Ut,Fn=new Ut,as=new Ut,Yp=new E,qp=new ut,On=new ua,f_=new E,Rd=new tn,Cd=new nn,ls=new Ut,cs,so;function p_(s,e,t){return ls.set(0,0,-e,1).applyMatrix4(s.projectionMatrix),ls.multiplyScalar(1/ls.w),ls.x=so/t.width,ls.y=so/t.height,ls.applyMatrix4(s.projectionMatrixInverse),ls.multiplyScalar(1/ls.w),Math.abs(Math.max(ls.x,ls.y))}function IE(s,e){let t=s.matrixWorld,n=s.geometry,i=n.attributes.instanceStart,r=n.attributes.instanceEnd,o=Math.min(n.instanceCount,i.count);for(let a=0,l=o;a<l;a++){On.start.fromBufferAttribute(i,a),On.end.fromBufferAttribute(r,a),On.applyMatrix4(t);let c=new E,h=new E;cs.distanceSqToSegment(On.start,On.end,h,c),h.distanceTo(c)<so*.5&&e.push({point:h,pointOnLine:c,distance:cs.origin.distanceTo(h),object:s,face:null,faceIndex:a,uv:null,uv1:null})}}function LE(s,e,t){let n=e.projectionMatrix,r=s.material.resolution,o=s.matrixWorld,a=s.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,h=Math.min(a.instanceCount,l.count),d=-e.near;cs.at(1,as),as.w=1,as.applyMatrix4(e.matrixWorldInverse),as.applyMatrix4(n),as.multiplyScalar(1/as.w),as.x*=r.x/2,as.y*=r.y/2,as.z=0,Yp.copy(as),qp.multiplyMatrices(e.matrixWorldInverse,o);for(let u=0,f=h;u<f;u++){if(Un.fromBufferAttribute(l,u),Fn.fromBufferAttribute(c,u),Un.w=1,Fn.w=1,Un.applyMatrix4(qp),Fn.applyMatrix4(qp),Un.z>d&&Fn.z>d)continue;if(Un.z>d){let b=Un.z-Fn.z,v=(Un.z-d)/b;Un.lerp(Fn,v)}else if(Fn.z>d){let b=Fn.z-Un.z,v=(Fn.z-d)/b;Fn.lerp(Un,v)}Un.applyMatrix4(n),Fn.applyMatrix4(n),Un.multiplyScalar(1/Un.w),Fn.multiplyScalar(1/Fn.w),Un.x*=r.x/2,Un.y*=r.y/2,Fn.x*=r.x/2,Fn.y*=r.y/2,On.start.copy(Un),On.start.z=0,On.end.copy(Fn),On.end.z=0;let _=On.closestPointToPointParameter(Yp,!0);On.at(_,f_);let g=Nn.lerp(Un.z,Fn.z,_),m=g>=-1&&g<=1,y=Yp.distanceTo(f_)<so*.5;if(m&&y){On.start.fromBufferAttribute(l,u),On.end.fromBufferAttribute(c,u),On.start.applyMatrix4(o),On.end.applyMatrix4(o);let b=new E,v=new E;cs.distanceSqToSegment(On.start,On.end,v,b),t.push({point:v,pointOnLine:b,distance:cs.origin.distanceTo(v),object:s,face:null,faceIndex:u,uv:null,uv1:null})}}}var Pd=class extends zt{constructor(e=new Na,t=new Os({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let o=0,a=0,l=t.count;o<l;o++,a+=2)u_.fromBufferAttribute(t,o),d_.fromBufferAttribute(n,o),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+u_.distanceTo(d_);let r=new Ps(i,2,1);return e.setAttribute("instanceDistanceStart",new Wn(r,1,0)),e.setAttribute("instanceDistanceEnd",new Wn(r,1,1)),this}raycast(e,t){let n=this.material.worldUnits,i=e.camera;if(i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;cs=e.ray;let o=this.matrixWorld,a=this.geometry,l=this.material;so=l.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),Cd.copy(a.boundingSphere).applyMatrix4(o);let c;if(n)c=so*.5;else{let d=Math.max(i.near,Cd.distanceToPoint(cs.origin));c=p_(i,d,l.resolution)}if(Cd.radius+=c,cs.intersectsSphere(Cd)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Rd.copy(a.boundingBox).applyMatrix4(o);let h;if(n)h=so*.5;else{let d=Math.max(i.near,Rd.distanceToPoint(cs.origin));h=p_(i,d,l.resolution)}Rd.expandByScalar(h),cs.intersectsBox(Rd)!==!1&&(n?IE(this,t):LE(this,i,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Xp),this.material.uniforms.resolution.value.set(Xp.z,Xp.w))}};var hr=class extends Na{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}setFromPoints(e){let t=e.length-1,n=new Float32Array(6*t);for(let i=0;i<t;i++)n[6*i]=e[i].x,n[6*i+1]=e[i].y,n[6*i+2]=e[i].z||0,n[6*i+3]=e[i+1].x,n[6*i+4]=e[i+1].y,n[6*i+5]=e[i+1].z||0;return super.setPositions(n),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}};var eh=class extends Pd{constructor(e=new hr,t=new Os({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}};var m_={pitch:2.54,resistor:{leadDiameter:.55,profile:[[-3.15,.28],[-3.13,.72],[-3.03,.99],[-2.84,1.15],[-2.55,1.2],[-2.15,1.2],[-1.75,1.13],[-1.38,1],[-.95,.96],[.95,.96],[1.38,1],[1.75,1.13],[2.15,1.2],[2.55,1.2],[2.84,1.15],[3.03,.99],[3.13,.72],[3.15,.28]],bands:[[-2.16,-1.72],[-1.26,-.82],[-.36,.08],[1.63,2.15]],shell:"#d1ac80",palette:["#232323","#673c28","#b5272d","#db641f","#e8b92c","#3b7b42","#285baa","#794682","#777a78","#e7e1d4"],gold:"#b68b3b"},display:{width:12.7,length:19,height:8,rowSpan:15.24,leadDiameter:.51,leadLength:6.3,housing:"#232426",face:"#343336",lens:"#b0a2a0",lit:"#fb3429",segments:{a:[[-2.35,-6.35],[3.4,-6.35],[4.15,-5.75],[3.23,-5.1],[-2.52,-5.1],[-3.19,-5.75]],b:[[4.4,-5.42],[4.91,-4.74],[4.17,-.91],[3.33,-.34],[2.82,-1.02],[3.56,-4.85]],c:[[3.28,.35],[3.8,1.02],[3.06,4.85],[2.22,5.42],[1.7,4.75],[2.44,.92]],d:[[-4.19,5.1],[1.56,5.1],[2.25,5.75],[1.37,6.35],[-4.38,6.35],[-5.03,5.75]],e:[[-3.77,.35],[-3.25,1.02],[-3.99,4.85],[-4.83,5.42],[-5.35,4.75],[-4.61,.92]],f:[[-2.65,-5.42],[-2.14,-4.74],[-2.88,-.91],[-3.72,-.34],[-4.23,-1.02],[-3.49,-4.85]],g:[[-3.28,-.62],[2.47,-.62],[3.11,0],[2.24,.62],[-3.51,.62],[-4.15,0]]},decimal:[4.28,5.78,.62]},jumper:{solid:{conductorDiameter:.64,jacketDiameter:1.25,bareLength:6.35},flexible:{jacketDiameter:1.15,contactWidth:.64,contactLength:5.4,housingWidth:2.4,housingLength:8.2,strainReliefDiameter:1.65}}};var{pitch:Bn,resistor:ro,display:qi,jumper:Id}=m_;function g_(s){let e=String(s).trim().match(/^(\d+(?:[.,]\d+)?)\s*([kKmM]?)/);if(!e)return[1,0,2];let t=e[2],n=Number(e[1].replace(",","."))*(t.toLowerCase()==="k"?1e3:t?1e6:1);if(n<1||!Number.isFinite(n))return[1,0,2];let i=Math.floor(Math.log10(n))-1,r=Math.round(n/10**i);return[Math.floor(r/10),r%10,i]}function __(){let{profile:e,bands:t}=ro,n=[...new Set([...e.map(([h])=>h),...t.flat()])].sort((h,d)=>h-d),i=n.map(h=>{let d=e.findIndex(([g])=>g>=h),[u,f]=e[d],[p,_]=e[Math.max(0,d-1)];return new le((u===p?f:Nn.lerp(_,f,(h-p)/(u-p)))/Bn,h/Bn)}),r=new Br([new le(0,i[0].y),...i,new le(0,i.at(-1).y)],24),o=Array.from({length:5},()=>[]),a=r.index.array,l=i.length+1;for(let h=0;h<24;h++)for(let d=0;d<l;d++){let u=(n[d-1]+n[d])/2,f=t.findIndex(([_,g])=>u>_&&u<g)+1,p=(h*l+d)*6;o[f].push(...a.slice(p,p+6))}r.setIndex(o.flat());let c=0;for(let[h,d]of o.entries())r.addGroup(c,d.length,h),c+=d.length;return r}function Zp(s){let e=new Ei(s.map(([n,i])=>new le(n/Bn,-i/Bn))),t=new Rs(e,{depth:.016,bevelEnabled:!0,bevelSize:.015,bevelThickness:.014,bevelSegments:1});return t.rotateX(-Math.PI/2),t}function x_(){let e=document.createElement("canvas");e.width=e.height=128;let t=e.getContext("2d"),n=t.createImageData(128,128),i=231;for(let o=0;o<n.data.length;o+=4)i=Math.imul(1664525,i)+1013904223>>>0,n.data.set([i>>>24,i>>>24,i>>>24,255],o);t.putImageData(n,0,0);let r=new js(e);return r.wrapS=r.wrapT=qs,r}function v1({container:s,model:e,point:t,hole:n,onConnection:i,onPin:r,onSwitch:o,onFailure:a,onChip:l=()=>{},onHole:c=()=>{}}){let h=e.presentation==="contador",d=new Ms;d.background=new Oe("#edf1ed");let u=new hn(40,1,.1,1600),f=new jc({antialias:!0,alpha:!1});f.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6)),f.outputColorSpace=Rn,f.toneMapping=ga,f.toneMappingExposure=1.08,s.append(f.domElement);let p=f.domElement;p.tabIndex=0,p.setAttribute("aria-label","Circuito en 3D. Arrastra para girar; usa la rueda para acercar. La lista de conexiones ofrece los mismos detalles con teclado."),p.setAttribute("aria-describedby","threeHelp");let _=new wd(u,p);_.enableDamping=!0,_.dampingFactor=.13,_.minDistance=5,_.maxDistance=500,_.minPolarAngle=.01,_.maxPolarAngle=Math.PI/2-.05,_.listenToKeyEvents(p),_.zoomToCursor=!0;try{let x=new io(f);d.environment=x.fromScene(new Td,.04).texture,d.environmentIntensity=h?.28:.2,x.dispose()}catch{d.environment=null}d.add(new Gr(16774892,12104360,h?2.05:2.2));let g=new ar(16777215,3.2);g.position.set(-25,65,30),d.add(g);let m=new ar(15003903,1.1);m.position.set(35,25,-30),d.add(m);let y=new Map,b=[],v=[],A=new Map,T=[],L=[],S=new Map,R=new Map,D=new Map,O={},k=null,q=[],U=[],B=null,z=new Ft,G=new Map,se=new mn;d.add(se);let Y=null,ee=null;function ae(x,P,C){let N=d.children.filter(he=>!P.has(he)&&!he.userData.softShadow),K=new mn;N.forEach(he=>K.add(he)),d.add(K),G.set(x,{group:K,holes:C,home:K.position.clone()})}let ke=new Map,Be=new mn;d.add(Be);let Dt="",Qe={id:null,progress:1},yt=new at({color:16447983,roughness:.82}),Q=new at({color:2239021,roughness:.7}),ne=new at({color:11976897,roughness:.35,metalness:.7}),Te=x_(),Ze=(x,P,C=.025)=>new at({color:x,roughness:P,bumpMap:Te,bumpScale:C}),Ge=Ze("#202126",.64,.018),ct=__(),kt=Ze(ro.shell,.57),ce=ro.palette.map(x=>Ze(x,.47)),pe=new at({color:ro.gold,roughness:.4,metalness:.35,bumpMap:Te,bumpScale:.018}),_e=Ze(qi.housing,.43),xe=Ze(qi.face,.56),Ee=Object.fromEntries(Object.entries(qi.segments).map(([x,P])=>[x,Zp(P)])),[ot,it,lt]=qi.decimal;Ee.dp=Zp(Array.from({length:16},(x,P)=>[ot+lt*Math.cos(P*Math.PI/8),it+lt*Math.sin(P*Math.PI/8)]));let dt=Id.flexible,F=dt.housingWidth/Bn,Pt=dt.housingLength/Bn,vt=.18,I=vt+Pt,M=.65,X=I-.14,J=X+M-.05,ie=.85,ve=new cr(F,Pt,F,2,.073),we=Ze("#27282b",.51,.016),re=Ze("#303136",.56,.014),ue=new Zt(.23,dt.strainReliefDiameter/Bn/2,M,16),Ce=dt.contactWidth/Bn,et=new cr(Ce,.48,Ce,1,.027),Le=new at({color:11772017,roughness:.36,metalness:.46}),Ie=new In(.022,Pt-.42,.025),tt=new cr(.3,.49,.045,1,.02),rt=new Zt(Id.solid.conductorDiameter/Bn/2,Id.solid.conductorDiameter/Bn/2,.32,8),gt=e.bounds[0]+e.bounds[2]/2,H=e.bounds[1]+e.bounds[3]/2,me=([x,P],C=.1)=>new E((x-gt)/30,C,(P-H)/30),j=(x,P=.1)=>me(t(x),P),be=!1,Ae=0,oe=null,Xe=null,Je=0,Et=null,It=[...e.bounds],_n=!1,Pi="",Ua=null,oo=1,ci={quality:"auto",background:"#edf1ed",motion:"full"},hs={scale:1,intensity:1},th=0,ao=!1,Zi=!0,_i=!1,fn=um({THREE:La,scene:d,container:s,camera:u,canvas:p,requestRender:Xt}),Ji=new mn;d.add(Ji);let Fa="",xi=null,Oa=0;function ur(x){xi=x?.active?x:null;let P=xi?.ids||[],C=P.join("|");if(C!==Fa){Ji.traverse(K=>{K.geometry?.dispose(),K.material?.dispose()}),Ji.clear(),Fa=C;for(let K of P){let he=y.get(K);if(!he||he.it.kind!=="wire")continue;let ye=new hr;ye.setPositions(Array.from({length:he.wire.geometry.parameters.tubularSegments+1},(de,He)=>he.curve.getPointAt(He/he.wire.geometry.parameters.tubularSegments)).flatMap(de=>de.toArray()));for(let[de,He]of[[14791749,8],[he.material.color,3]]){let te=new Os({color:de,linewidth:He,worldUnits:!1,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),fe=new eh(ye,te);fe.userData.signal=K,fe.renderOrder=21,fe.frustumCulled=!1,Ji.add(fe)}Oa++}}let N=s.getBoundingClientRect();Ji.visible=!!xi;for(let K of Ji.children)K.visible=!!y.get(K.userData.signal)?.group.visible,K.material.opacity=xi?.value===1?.9:.5,K.material.resolution.set(N.width||1,N.height||1)}function nh(x){JSON.stringify(x||null)!==JSON.stringify(xi)&&(Et?Dd({...Et,studio:{...Et.studio,signals:x}}):(ur(x),Xt()))}function nt(x,P,C,N=d){let K=new zt(x,P);return K.position.copy(C),N.add(K),K}function sn(x,P,C,N,K,he=d){return nt(new In(x,P,C),K,N,he)}function en(x,P,C,N,K,he=d,ye=.08){return nt(new cr(x,P,C,2,ye),K,N,he)}function ti(x,P,C=.046){return nt(new wi(new Hi(x,!1,"centripetal"),16,C,8,!1),ne.clone(),new E,P)}function Ba(x,P=.22){let C=x.filter((ye,de)=>de===0||ye.distanceTo(x[de-1])>1e-6),N=new tr,K=C[0];for(let ye=1;ye<C.length-1;ye++){let de=C[ye],He=C[ye-1],te=C[ye+1],fe=Math.min(P,He.distanceTo(de)/3,te.distanceTo(de)/3),Se=de.clone().addScaledVector(He.clone().sub(de).normalize(),fe),ge=de.clone().addScaledVector(te.clone().sub(de).normalize(),fe);K.distanceTo(Se)>1e-6&&N.add(new ts(K,Se)),N.add(new er(Se,de,ge)),K=ge}let he=C[C.length-1];return K.distanceTo(he)>1e-6&&N.add(new ts(K,he)),N}function ih(x,P,C,N){let K=(C||[x,P]).map($t=>$t.clone().setY(N)).filter(($t,Me,Fe)=>!Me||$t.distanceTo(Fe[Me-1])>1e-6),he=K[0],ye=K.at(-1),de=K[1].clone().sub(he).normalize(),He=ye.clone().sub(K.at(-2)).normalize(),te=Math.min(2.45,he.distanceTo(K[1])*.44),fe=Math.min(2.45,ye.distanceTo(K.at(-2))*.44),Se=he.clone().addScaledVector(de,te),ge=ye.clone().addScaledVector(He,-fe),We=x.clone().add(new E(0,J,0)),Ye=P.clone().add(new E(0,J,0)),st=We.clone().add(new E(0,.62,0)),xt=Ye.clone().add(new E(0,ie,0)),Lt=new tr;Lt.getPointAt=Lt.getPoint.bind(Lt),Lt.getTangentAt=Lt.getTangent.bind(Lt),Lt.add(new ts(We,st)),Lt.add(new Qs(st,st.clone().add(new E(0,.62,0)),Se.clone().addScaledVector(de,-te*.52),Se));for(let $t of Ba([Se,...K.slice(1,-1),ge]).curves)Lt.add($t);return Lt.add(new Qs(ge,ge.clone().addScaledVector(He,fe*.52),xt.clone().add(new E(0,.64,0)),xt)),Lt.add(new ts(xt,Ye)),Lt}function w(x,P,C,N){let K=new mn;K.position.copy(x),P.add(K);let he=(te,fe,Se,ge,We)=>nt(te,fe,new E(Se,ge,We),K),ye=he(et,C.pin,0,vt-.18,0),de=he(ve,C.housing,0,vt+Pt/2,0),He=he(ue,C.collar,0,X+M/2,0);for(let te of[-1,1])he(Ie,C.collar,F*.28,vt+Pt/2,te*F*.499),he(tt,C.collar,0,vt+Pt*.37,te*F*.499);for(let te of[ye,de,He])te.userData={id:N},b.push(te);return K}let V=Math.min(4,f.capabilities.getMaxAnisotropy?.()||1);function $(x,P=1024,C=512){let N=document.createElement("canvas");N.width=P,N.height=C,x(N.getContext("2d"),P,C);let K=new js(N);return K.colorSpace=Rn,K.anisotropy=V,K}function W(x,P,C,N,{color:K="#dbe5e1",background:he="#222a2d",size:ye=48}={}){let de=$((te,fe,Se)=>{te.fillStyle=he,te.fillRect(0,0,fe,Se),te.fillStyle=K,te.textAlign="center",te.textBaseline="middle",te.font="600 "+ye+"px Arial",x.split(`
`).forEach((ge,We,Ye)=>te.fillText(ge,fe/2,Se/2+(We-(Ye.length-1)/2)*ye*1.45))},512,256),He=nt(new fi(C,N),new Qt({map:de}),P);return He.rotation.x=-Math.PI/2,He.userData.viewerLabel=!0,He.userData.labelText=x,He}function Z(x,P){let C=x/2,N=1.23,K=.12,he=new Ei;he.moveTo(-C+K,-N),he.lineTo(C-K,-N),he.quadraticCurveTo(C,-N,C,-N+K),he.lineTo(C,N-K),he.quadraticCurveTo(C,N,C-K,N),he.lineTo(-C+K,N),he.quadraticCurveTo(-C,N,-C,N-K),he.lineTo(-C,.36),he.bezierCurveTo(-C+.49,.36,-C+.49,-.36,-C,-.36),he.lineTo(-C,-N+K),he.quadraticCurveTo(-C,-N,-C+K,-N);let ye=new Rs(he,{depth:1.06,bevelEnabled:!0,bevelSize:.05,bevelThickness:.06,bevelSegments:2,curveSegments:12});return ye.rotateX(-Math.PI/2),nt(ye,Ge.clone(),P.clone().setY(.27))}function Ne(x,P,C){let N=$((he,ye,de)=>{he.fillStyle="#c7c8c5",he.textAlign="center",he.textBaseline="middle",he.font="600 56px monospace",he.fillText(x.label,ye/2,de*.37,ye*.96),he.fillStyle="#999c9c",he.font="30px monospace",he.fillText(x.id,ye/2,de*.71)},768,224),K=nt(new fi(C-.65,1.75),new Qt({map:N,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1}),P.clone().setY(1.394));K.rotation.x=-Math.PI/2}let qe=$((x,P,C)=>{x.filter="blur(16px)",x.fillStyle="rgba(12,9,6,.5)",x.beginPath(),x.roundRect(P*.13,C*.13,P*.74,C*.74,20),x.fill()},256,256),De=$((x,P,C)=>{let N=x.createRadialGradient(P/2,C/2,0,P/2,C/2,P/2);N.addColorStop(0,"#1b322344"),N.addColorStop(.5,"#1b32231b"),N.addColorStop(1,"#1b322300"),x.fillStyle=N,x.fillRect(0,0,P,C)},128,128);function Ue(x,P,C,N=d){let K=nt(new fi(P,C),new Qt({map:De,transparent:!0,depthWrite:!1}),x.clone().setY(.045),N);return K.rotation.x=-Math.PI/2,K.userData.softShadow=!0,K}let $e=$((x,P,C)=>{let N=x.createRadialGradient(P/2,C/2,0,P/2,C/2,P/2);N.addColorStop(0,"#ffca9566"),N.addColorStop(.3,"#ff6b4638"),N.addColorStop(1,"#ff6b4600"),x.fillStyle=N,x.fillRect(0,0,P,C)},128,128);for(let[x,P]of Object.entries(e.boards)){let C=(P.columns-1)*30+70,N=60+P.xOffset,K=145+P.yOffset;en(C/30,1.25,605/30,me([N+C/2,K+302.5],-.625),h?Ze("#f2eee5",.79,.015):yt,d,.2);{let fe=nt(new fi(C/30*1.2,25.41),new Qt({map:qe,transparent:!0,depthWrite:!1}),me([N+C/2,K+302.5],-1.27),d);fe.rotation.x=-Math.PI/2,fe.userData.softShadow=!0,fe.renderOrder=-1}h?en((C-65)/30,.12,55/30,me([N+C/2,455.5+P.yOffset],.01),Ze("#b9b9af",.91,.012),d,.06):sn((C-45)/30,.06,65/30,me([N+20+(C-45)/2,455.5+P.yOffset],.035),new at({color:13686994,roughness:1}));let he=$((fe,Se,ge)=>{fe.scale(Se/C,ge/605),fe.fillStyle="#faf9ef",fe.fillRect(0,0,C,605),fe.font="bold 14px Arial",fe.fillStyle="#475b52",fe.fillText(e.boardLabel||(h?"830 PUNTOS \xB7 PASO 2,54 mm":"PLACA "+x+" \xB7 "+P.columns+" COLUMNAS"),12,23),fe.font="13px Arial",fe.textAlign="center";for(let We=1;We<=P.columns;We++)(We===1||We%5===0||We===P.columns)&&fe.fillText(We,35+(We-1)*30,116);fe.textAlign="left";for(let We of"abcdefghij")fe.fillText(We,10,t([x,We,1])[1]-K+5);for(let We of["+T","-T","-B","+B"]){let Ye=t([x,We,1])[1]-K;fe.fillStyle=We[0]==="+"?"#bc444c":"#3e81b5",fe.fillText(We,8,Ye+5),fe.lineWidth=2,fe.strokeStyle=fe.fillStyle,fe.beginPath(),fe.moveTo(25,Ye-13),P.railBreak&&(fe.lineTo(945,Ye-13),fe.moveTo(1005,Ye-13)),fe.lineTo(C-20,Ye-13),fe.stroke()}},2048,640),ye=h?new at({map:he,roughness:.88,bumpMap:Te,bumpScale:.01}):new Qt({map:he}),de=nt(new fi(C/30,605/30),ye,me([N+C/2,K+302.5],.008));de.rotation.x=-Math.PI/2;let He=[];for(let fe of[..."abcdefghij","+T","-T","-B","+B"])for(let Se=1;Se<=P.columns;Se++)fe.length>1&&(P.railColumns?!P.railColumns.includes(Se):P.railBreak&&Se===P.railBreak+1)||He.push([x,fe,Se]);let te=h?[[.48,.017,13486525,.03],[.36,.039,7961458,.022],[.235,.052,3488056,.01],[.1,.063,10132369,.005]]:[[.38,.018,12107961,0],[.255,.03,4739406,0]];for(let[fe,Se,ge,We]of te){let Ye=We?new cr(fe,.024,fe,1,We):new In(fe,.012,fe),st=new Es(Ye,new at({color:ge,roughness:.87}),He.length);He.forEach((xt,Lt)=>{z.position.copy(j(xt,Se)),z.updateMatrix(),st.setMatrixAt(Lt,z.matrix)}),d.add(st),st.userData={holes:He},(!h||fe===.48)&&b.push(st)}}for(let[x,P,C]of h?[]:[["L\xD3GICA \xB7 5 V REGULADOS","+5","G5"],["MOTOR \xB7 6 V","+6","G6"]]){let N=j(["FUENTE",P,0]),K=j(["FUENTE",C,0]),he=N.clone().lerp(K,.5);W(x,he.clone().setY(.2).add(new E(0,0,-.9)),9,1.4,{background:"#e0e8e2",color:"#345349",size:34});for(let[ye,de]of[[N,12861771],[K,3490619]])nt(new Zt(.23,.23,.35,14),new at({color:de}),ye.clone().setY(.2))}for(let x of e.chips||[]){let P=new Set(d.children),C=x.pins,N=C/2,K=x.start,he=j([x.board,"e",K]),ye=j([x.board,"f",K+N-1]),de=he.clone().lerp(ye,.5).setY(.8),He=N+.2,te=h?Z(He,de):en(He,1.25,2.45,de,x.dipSwitch?new at({color:11349559,roughness:.55}):Q.clone(),d,.13);te.userData={chip:x.id},b.push(te);let fe=new In(He+.08,1.32,2.52),Se=new Ur(fe);fe.dispose();let ge=new jn(Se,new Sn({color:14265410,depthTest:!1}));if(ge.position.copy(de),ge.renderOrder=18,ge.visible=!1,d.add(ge),ke.set(x.id,{body:te,outline:ge}),Ue(de,He+.5,2.8),!h){let Ye=nt(new Ts(.27,28,Math.PI/2,Math.PI),new at({color:1186075,roughness:.9}),de.clone().add(new E(-He/2+.04,.637,0)));Ye.rotation.x=-Math.PI/2}if(x.dipSwitch)for(let Ye=1;Ye<=4;Ye++){let st=x.functions?.[Ye],xt=de.clone().add(new E(Ye-2.5,.77,.36));sn(.65,.04,1.45,xt.clone().setY(de.y+.645).setZ(de.z),new at({color:6364453}));let Lt=sn(.51,.16,.62,xt,new at({color:st?16183011:10390917}));st&&(Lt.userData={bit:st,switchId:st,dipSlider:!0,dipPosition:Ye,homeZ:de.z,componentHint:x.id},b.push(Lt),L.push(Lt)),W(String(Ye),de.clone().add(new E(Ye-2.5,.66,-.95)),.45,.35,{background:"#ad2e37",color:"#fff5ed",size:60})}else h?Ne(x,de,He):W(x.label+`
`+x.id,de.clone().add(new E(.12,.637,0)),Math.max(2,He-.9),1.75,{size:38});let We=nt(new Ts(h?.15:.09,16),new Qt({color:h?7829626:8884620}),de.clone().add(new E(-He/2+.4,h?.594:.638,.63)));We.rotation.x=-Math.PI/2;for(let Ye=1;Ye<=C;Ye++){let st=Ye>N,xt=[x.board,st?"e":"f",K+(st?C-Ye:Ye-1)],Lt=j(xt,.13),$t=Lt.clone();$t.z=de.z+(st?-1.18:1.18),$t.y=.5;let Me=new Hi([Lt,Lt.clone().add(new E(0,.4,0)),$t]),Fe=nt(new wi(Me,16,h?.116:.07,4,!1),ne,new E);Fe.userData={u:x.id,p:Ye,h:xt},b.push(Fe),v.push(Fe);let pt=sn(.22,.12,.32,$t.clone().setY(.54),ne);pt.userData={u:x.id,p:Ye,h:xt},b.push(pt),A.set(x.id+"."+Ye,W(String(Ye),Lt.clone().add(new E(0,.025,st?-.4:.4)),.55,.45,{color:"#35433e",background:"#faf9ef",size:95}))}ae(x.id,P,Array.from({length:C},(Ye,st)=>{let xt=st+1;return[x.board,xt>N?"e":"f",K+(xt>N?C-xt:xt-1)]})),h&&fn.register({id:x.id,type:"chip",title:x.id+" \xB7 "+x.label,detail:x.name,anchor:de.clone().setY(1.57),hitPoint:de.clone(),group:G.get(x.id).group}),x.dipSwitch&&fn.register({id:x.id,type:"switch",title:x.id+" \xB7 DIP de 4 posiciones",detail:()=>Object.entries(x.functions).map(([Ye,st])=>Ye+" "+{ABRIR:"Abrir",CERRAR:"Cerrar",STOP:e.stopClosedRun?"RUN":"STOP",FCA:"Final abierta",FCC:"Final cerrada"}[st]+" "+(O[x.id]?.[Ye]?"ON":"OFF")).join(" \xB7 "),anchor:de.clone().setY(1.85),hitPoint:de.clone(),group:G.get(x.id).group})}for(let x of e.arrays||[]){let P=new Set(d.children),C=Object.entries(x.pinHoles||{}).sort((fe,Se)=>Number(fe[0])-Number(Se[0]));if(!C.length)continue;let N=C.map(([,fe])=>j(fe,.1)),K=N[0],he=N[N.length-1],ye=K.clone().lerp(he,.5).setY(1.5),de=K.distanceTo(he)+.98,He=new at({color:5652021,roughness:.65});en(de,1.9,.8,ye,He,d,.12),Ue(ye,de+.3,1.35),W(x.id+"  8 x 1k",ye.clone().setY(2.46),de-.55,.7,{background:"#563e35",color:"#f2e8dc",size:35}),C.forEach(([fe,Se])=>{let ge=j(Se,.1),We=ge.clone().setY(.58),Ye=ti([ge,We],d);Ye.userData={array:x.id,p:Number(fe),h:Se,common:Number(fe)===(x.commonPin||1)},T.push(Ye);let st=Number(fe)===(x.commonPin||1)?fe+" COM":fe;W(st,ge.clone().setY(.055).add(new E(0,0,.82)),Number(fe)===(x.commonPin||1)?1.15:.5,.4,{background:"#faf9ef",color:"#35433e",size:Number(fe)===(x.commonPin||1)?40:80})});let te=x.pinHoles?.[x.commonPin||1];if(te){let fe=nt(new Ts(.095,20),new Qt({color:15978908}),j(te,2.462),d);fe.rotation.x=-Math.PI/2}ae(x.id,P,C.map(([,fe])=>fe))}for(let x of e.displays||[]){let P=new Set(d.children),C=Object.values(x.pins).map(We=>j(We)),N=C.reduce((We,Ye)=>We.add(Ye),new E).multiplyScalar(1/C.length),{width:K,length:he,height:ye,leadDiameter:de}=qi,He=K/Bn,te=he/Bn,fe=ye/Bn,Se=.26,ge=Se+fe;en(He,fe-.07,te,N.clone().setY(Se+(fe-.07)/2),_e,d,.11),en(He-.18,.15,te-.18,N.clone().setY(ge-.075),xe,d,.065),Ue(N,He+.4,te+.4);for(let[We,Ye]of Object.entries(x.pins)){let st=j(Ye,.1),xt=de/Bn;en(xt,.38,xt,st.clone().setY(.18),ne,d,.024),W(String(We),st.clone().add(new E(0,.025,Number(We)<=5?1.1:-1.1)),.45,.35,{background:"#faf9ef",color:"#35433e",size:80})}for(let[We,Ye]of Object.entries(Ee)){let st=Ze(qi.lens,.42,.018),xt=nt(Ye,st,N.clone().setY(ge+.015));S.set(x.id+"."+We,xt)}W(x.id,N.clone().setY(ge+.017).add(new E(0,0,3.22)),2,.31,{background:qi.face,color:"#cfbeb8",size:45}),nt(new pi(.06,10,8),new at({color:11576992}),N.clone().setY(ge+.012).add(new E(-2.04,0,3.15))),ae(x.id,P,Object.values(x.pins))}let St=new Set;function At(x,P){let C=e.modules?.[x.module];if(!C)return;let N=me(x.anchor,0),K={sensor:[4.4,.2,1.9,1925032],motor:[3.4,2.2,2.6,15914312],battery:[6.4,1.4,2.4,2369323],battery9:[1.9,3.1,1.1,2964038]},[he,ye,de,He]=K[C.type]||K.sensor,te=en(he,ye,de,N.clone().setY(ye/2+.05),new at({color:He,roughness:.5}),P,.08);if(te.userData={id:x.id},b.push(te),C.type==="sensor")for(let[ge,We]of[[-.5,2306191],[.5,1315860]])nt(new Zt(.3,.3,.42,16),new at({color:We,roughness:.3}),N.clone().add(new E(ge,.42,-.45)),P);if(C.type==="motor"){let ge=nt(new Zt(1.7,1.7,.8,32),Q.clone(),N.clone().add(new E(Math.sign(N.x)*2.2,1.75,0)),P);ge.rotation.z=Math.PI/2}if(C.type==="battery")for(let ge=0;ge<4;ge++){let We=nt(new Zt(.52,.52,2,20),new at({color:13149760,metalness:.4,roughness:.4}),N.clone().add(new E(-2.25+ge*1.5,1.5,0)),P);We.rotation.x=Math.PI/2}Ue(N.clone().setY(.02),he+.8,de+.8,P);let fe=x.anchor[1]<145?-1:x.anchor[1]>750?1:0,Se=fe?0:Math.sign(N.x);P.add(W(C.name,N.clone().setY(.03).add(new E(Se*(he/2+2.1),0,fe*(de/2+1.1))),Math.max(3.6,C.name.length*.3),Math.max(1.8,C.name.length*.15),{background:"#faf9ef",color:"#345349",size:58}))}function Ke(x){let P=new mn;d.add(P);let C=j(x.a),[N]=t(x.a),K=x.a[1],he=K.length>1?K.endsWith("T"):K<"f",ye=x.slot??0,de=ye-((x.slots??1)-1)/2,He=he?126-ye*9:770+ye*9,te=x.anchor[0]+de*14,fe=me([te,x.anchor[1]],.55),Se=Ba([C.clone().setY(.55),C.clone().setY(1.3),me([N,He],1.3),me([te,He],1.3),fe],.5),ge=new at({color:x.color||"#555",roughness:.45,metalness:.02}),We=nt(new wi(Se,56,.11,8,!1),ge,new E,P);We.userData={id:x.id},b.push(We);let Ye=sn(.36,.9,.36,C.clone().setY(.72),new at({color:1908514,roughness:.6}),P);Ye.userData={id:x.id},b.push(Ye);let st=nt(rt,ne.clone(),C.clone().setY(.09),P);St.has(x.module)||(St.add(x.module),At(x,P)),y.set(x.id,{group:P,wire:We,material:ge,curve:Se,a:C,b:fe,it:x,routed:!1,routePoints:null,height:1.7,plugs:[[{mesh:st,home:st.position.clone()}],[]],approach:1})}function Ht(x){if(x.lead){Ke(x);return}if(x.externalLead)return;let P=j(x.a),C=j(x.b),N=P.distanceTo(C),K=x.kind==="res",he=x.kind!=="wire",ye=!he&&Array.isArray(x.route)&&x.route.length>=2,de=!he&&x.a[0]!==x.b[0],He=he?.6:ye?Math.max(.48,Number(x.routeHeight)||.78):x.a[0]!==x.b[0]?2.6+Number(x.id.slice(1))%3*.22:Math.min(2.25,.65+N*.065),te=new mn,fe=[];d.add(te);let Se=P.clone().lerp(C,.5);Se.y=He;let ge=ye?[P,...x.route.map(Me=>me(Me,He)),C]:null,We=de?ih(P,C,ge,He):ye?Ba(ge):new Hi(K?[P,P.clone().setY(.45),P.clone().setY(1.65),P.clone().setY(2.8),P.clone().setY(3.14),C.clone().setY(3.14),C.clone().setY(2.7),C]:[P,P.clone().setY(.36),P.clone().lerp(C,.18).setY(He),Se,P.clone().lerp(C,.82).setY(He),C.clone().setY(.36),C],!1,"centripetal"),Ye=new at({color:x.color||(e.colors||{})[x.net]||"#087f93",roughness:.42,metalness:.02}),st=de?Math.max(64,Math.ceil(We.getLength()*3)):ye?Math.max(48,ge.length*12):N>12?64:40,xt=nt(new wi(We,st,he?.046:x.routingClass==="power"?.145:.125,10,!1),he?ne.clone():Ye,new E,te);if(xt.visible=x.kind==="wire",xt.userData={id:x.id},b.push(xt),!he){let Me=de?{pin:Le.clone(),housing:we.clone(),collar:re.clone()}:{pin:ne.clone()};for(let Fe of[P,C]){let pt=de?w(Fe,te,Me,x.id):nt(rt,Me.pin,Fe.clone().setY(.09),te);fe.push([{mesh:pt,home:pt.position.clone()}])}}if(K){let Me=h&&N>=2.8,Fe=Me?Se.clone().setY(.68):P.clone().setY(1.65),[pt,Gt,ht]=g_(x.value),Tt=[kt,ce[pt],ce[Gt],ht===-1?pe:ce[ht]||ce[2],pe],Bt=nt(ct,Tt.map(co=>co.clone()),Fe,te);Bt.userData={id:x.id},b.push(Bt);let an=ro.leadDiameter/Bn/2,us=[P,P.clone().setY(.47)],dr=[P.clone().setY(2.86),P.clone().setY(3.14),C.clone().setY(3.14),C.clone().setY(2.7),C];if(Me){let co=C.clone().sub(P).normalize(),rh=ro.profile.at(-1)[0]/Bn;Bt.quaternion.setFromUnitVectors(new E(0,1,0),co),us=[P,P.clone().setY(.5),Fe.clone().addScaledVector(co,-rh)],dr=[Fe.clone().addScaledVector(co,rh),C.clone().setY(.5),C]}let ds=ti(us,te,an),Va=ti(dr,te,an);ds.userData=Va.userData={id:x.id},b.push(ds,Va),fn.register({id:x.partId||x.id,connectionId:x.id,type:"res",title:(x.partId||x.id)+" \xB7 Resistencia",detail:x.value,anchor:Fe.clone().setY(Me?1.25:2.95),hitPoint:Fe.clone(),group:te})}let Lt=x.kind==="cap"&&(x.polarized||/^(10|100)\s*(µ|μ|u)/i.test(x.value));if(x.kind==="cap"&&!Lt){let Me=Se.clone().setY(.95),Fe=nt(new pi(.43,20,14),new at({color:13143105,roughness:.72}),Me,te);Fe.scale.set(1,1,.38),Fe.userData={id:x.id},b.push(Fe);for(let[pt,Gt]of[P,C].entries())ti([Gt,Gt.clone().setY(.32),Me.clone().add(new E(pt?.2:-.2,-.2,0))],te);if(!h){let pt=W(x.value,Me.clone().add(new E(0,.5,0)),1.8,.5,{background:"#c88c41",color:"#30271c",size:43});te.add(pt)}}if(Lt){let Me=Se.clone().setY(1.45),Fe=$((ht,Tt,Bt)=>{ht.fillStyle="#24485a",ht.fillRect(0,0,Tt,Bt),ht.fillStyle="#d2ddd5",ht.fillRect(Tt*.21,0,Tt*.16,Bt),ht.fillStyle="#24485a",ht.font="bold 30px Arial",ht.textAlign="center";for(let an=30;an<Bt;an+=50)ht.fillText("\u2212",Tt*.29,an);ht.fillStyle="#dde6e3",ht.font="600 32px Arial",ht.fillText(x.value,Tt*.67,Bt*.38),ht.font="26px Arial",ht.fillText("16 V",Tt*.67,Bt*.65)},512,256),pt=nt(new Zt(.64,.64,1.8,40),[new at({map:Fe,roughness:.4}),ne.clone(),Q.clone()],Me,te);pt.userData={id:x.id},b.push(pt),pt.rotation.y=Math.PI/2-Math.PI*2*.29;for(let[ht,Tt]of[P,C].entries())ti([Tt,Tt.clone().setY(.4),Me.clone().setY(.55).add(new E(ht?.28:-.28,0,0))],te);let Gt=Me.clone().setY(2.359);if(sn(.76,.008,.022,Gt,Q.clone(),te).rotation.y=Math.PI/4,sn(.76,.008,.022,Gt,Q.clone(),te).rotation.y=-Math.PI/4,Ue(Me,2.1,1.8,te),!h){let ht=W(x.id+" \xB7 "+x.value,Me.clone().setY(.055).add(new E(0,0,1.02)),2.4,.45,{background:"#faf9ef",color:"#345349",size:43});te.add(ht)}}if(x.kind==="reg"){let Me=[P,...(x.routedPins||[]).map(([ht])=>j(ht)),C],Fe=Me.reduce((ht,Tt)=>ht.add(Tt),new E).multiplyScalar(1/Me.length),pt=en(3.9,3.4,1.75,Fe.clone().setY(2.35),Ze("#1f2225",.62,.02),te,.12);pt.userData={id:x.id},b.push(pt);let Gt=en(3.9,2.7,.42,Fe.clone().add(new E(0,4.45,-.66)),new at({color:13159888,metalness:.85,roughness:.25}),te,.06);nt(new Zt(.55,.55,.46,20),Q.clone(),Fe.clone().add(new E(0,4.85,-.66)),te).rotation.x=Math.PI/2;for(let ht of Me)ti([ht,ht.clone().setY(.45),ht.clone().setY(.7)],te,.06);Ue(Fe,4.6,2.6,te),te.add(W("7805",Fe.clone().setY(4.07).add(new E(0,0,.3)),2.2,.62,{background:"#1f2225",color:"#dbe5e1",size:60})),fn.register({id:x.partId||x.id,connectionId:x.id,type:"chip",title:"U3 \xB7 Regulador 7805",detail:"IN 9 V \xB7 GND \xB7 OUT +5 V",anchor:Fe.clone().setY(6.2),hitPoint:Fe.clone().setY(2.3),group:te})}if(x.kind==="slide"){let Me=[P,...(x.routedPins||[]).map(([ht])=>j(ht)),C],Fe=Me.reduce((ht,Tt)=>ht.add(Tt),new E).multiplyScalar(1/Me.length),pt=en(3.4,1.5,1.7,Fe.clone().setY(.95),new at({color:2764339,roughness:.5}),te,.1);pt.userData={id:x.id},b.push(pt),en(3.5,.12,1.8,Fe.clone().setY(1.72),new at({color:12896716,metalness:.85,roughness:.25}),te,.04);let Gt=en(.7,.9,.6,Fe.clone().add(new E(-.55,2.2,0)),new at({color:15789798,roughness:.4}),te,.08);Gt.userData={id:x.id,slideLever:!0},b.push(Gt);for(let ht of Me)ti([ht,ht.clone().setY(.3)],te,.06);Ue(Fe,4,2.4,te),fn.register({id:x.partId||x.id,connectionId:x.id,type:"switch",title:"SW1 \xB7 Selector de l\xEDnea",detail:"Izquierda: NEGRA (SEL = 0) \xB7 Derecha: BLANCA (SEL = 1)",anchor:Fe.clone().setY(3),hitPoint:Fe.clone(),group:te})}if(x.kind==="pot"){let Me=Se.clone().setY(1.02),Fe=en(2.65,1.35,1.6,Me,new at({color:1534356,roughness:.36}),te,.11);Fe.userData={id:x.id},b.push(Fe),sn(2.44,.08,1.42,Me.clone().setY(.39),new at({color:1065310}),te),nt(new Zt(.59,.59,.04,32),new at({color:1523798}),Me.clone().setY(1.717),te);let pt=nt(new Zt(.51,.51,.16,40),new at({color:12557136,metalness:.8,roughness:.24}),Me.clone().setY(1.79),te);pt.userData={id:x.id},b.push(pt),k=sn(.79,.018,.11,Me.clone().setY(1.879),Q.clone(),te);let Gt=W("203",Me.clone().add(new E(.76,.679,-.4)),.68,.39,{background:"#176994",color:"#e6f0ec",size:77});te.add(Gt);for(let Tt of e.potPins){let Bt=j(Tt);ti([Bt,Bt.clone().setY(.4)],te)}Ue(Me,3.3,2.3,te);let ht=W("RV1 \xB7 20 k\u03A9",Me.clone().setY(.06).add(new E(0,0,-1.08)),3,.55,{background:"#faf9ef",color:"#345349",size:42});te.add(ht);for(let Tt=0;Tt<3;Tt++){let Bt=j(e.potPins[Tt],.035),an=W(String(Tt+1),Bt.clone().add(new E(0,0,.95)),.55,.4,{background:"#faf9ef",color:"#345349",size:85});te.add(an)}}if(x.kind==="led"){let Me=Se.clone().setY(1.22),Fe=new ir({color:12731186,emissive:0,roughness:.18,metalness:0,clearcoat:1,clearcoatRoughness:.1,transparent:!0,opacity:.88,depthWrite:!1}),pt=h?.92:.52,Gt=nt(new Zt(pt,pt,.8,32),Fe,Me,te),ht=nt(new pi(pt,32,20,0,Math.PI*2,0,Math.PI/2),Fe,Me.clone().setY(1.62),te),Tt=nt(new Zt(pt+.08,pt+.08,.14,32),Fe,Me.clone().setY(.77),te);for(let us of[Gt,ht,Tt])us.userData={id:x.id,baseOpacity:.88},b.push(us);Fe.userData.baseColor=x.color||{LY:"#eab83f",LG:"#2cab66",LR:"#d34436"}[x.value]||"#d34436",Fe.color.set(Fe.userData.baseColor),R.set(x.value,Fe);for(let[us,dr]of[P,C].entries()){let ds=Me.clone().setY(1.27).add(new E(us?.18:-.18,0,0));ti([dr,dr.clone().setY(.48),ds.clone().setY(.72),ds],te)}sn(.18,.19,.18,Me.clone().setY(1.33).add(new E(.18,0,0)),ne.clone(),te);let Bt=nt(new pi(.18,16,10,0,Math.PI*2,0,Math.PI/2),new at({color:12897486,metalness:.8,roughness:.2,side:mi}),Me.clone().add(new E(.18,.23,0)),te);Bt.rotation.x=Math.PI,nt(new wi(new Hi([Me.clone().add(new E(-.18,.1,0)),Me.clone().add(new E(-.05,.43,0)),Me.clone().add(new E(.18,.28,0))]),12,.012,5,!1),ne,new E,te),sn(.04,.11,.42,Me.clone().add(new E(h?Math.sign(C.x-P.x)*(pt+.035):.56,-.45,0)),new at({color:h?5448802:9978422,roughness:.55}),te);let an=new Dr(new Ks({map:$e,transparent:!0,depthWrite:!1,blending:pa}));an.position.copy(Me).setY(1.47),an.scale.set(2.6,2.6,1),an.visible=!1,te.add(an),D.set(x.value,an),Ue(Me,1.7,1.7,te),fn.register({id:x.partId||x.id,connectionId:x.id,type:"led",title:h?"LED \xB7 peso "+x.bit:{LR:"LED rojo",LY:"LED amarillo",LG:"LED verde"}[x.value]||"LED",detail:h?"C\xE1todo hacia LED"+x.bit+"_N":{LR:"STOP \xB7 parpadeo",LY:"Puerta en movimiento",LG:"Puerta completamente abierta"}[x.value]||x.value,anchor:Me.clone().setY(h?2.65:2.25),hitPoint:Me.clone(),group:te})}if(x.kind==="motor"&&!x.externalMotor){let Me=Se.clone().setY(1.2),Fe=new at({color:10595762,metalness:.78,roughness:.28}),pt=nt(new Zt(.9,.9,2.4,32),Fe,Me,te);pt.rotation.z=Math.PI/2;for(let Tt of[-1.17,1.17]){let Bt=nt(new Zt(.86,.86,.14,32),Tt<0?Q:ne,Me.clone().add(new E(Tt,0,0)),te);Bt.rotation.z=Math.PI/2}let Gt=nt(new Zt(.12,.12,1,16),ne,Me.clone().add(new E(1.65,0,0)),te);Gt.rotation.z=Math.PI/2;for(let Tt of[-.42,.42])sn(.58,.025,.18,Me.clone().add(new E(-.55,.8,Tt)),Q,te);[P,C].forEach((Tt,Bt)=>{let an=Me.clone().add(new E(-1.27,Bt?.28:-.28,0));sn(.12,.2,.3,an,ne,te),ti([Tt,Tt.clone().setY(.5),an],te)});let ht=W("MOTOR CC \xB7 EXTERNO",Me.clone().add(new E(0,1.22,0)),3.2,.6,{background:"#53676e",color:"#fff",size:36});te.add(ht)}if(x.kind==="motor"&&x.externalMotor){let Me=x.externalMotor,Fe=me(Me.center,3.7),pt=new at({color:15914312,roughness:.4}),Gt=new at({color:14072114,roughness:.55}),ht=new at({color:12108486,metalness:.82,roughness:.28}),Tt=en(13.2,7.1,7.3,Fe.clone().add(new E(-3.4,0,0)),pt,te,.55);Tt.userData={id:x.id},b.push(Tt),Ue(Fe,29,12,te),en(12.2,.16,6.4,Fe.clone().add(new E(-3.4,3.62,0)),Gt,te,.12);let Bt=nt(new Zt(2.65,2.65,8.8,40),ht,Fe.clone().add(new E(7.1,0,0)),te);Bt.rotation.z=Math.PI/2,Bt.userData={id:x.id},b.push(Bt);let an=nt(new Zt(2.56,2.56,1.25,32),Q,Fe.clone().add(new E(11.9,0,0)),te);an.rotation.z=Math.PI/2;for(let fs of[-1.2,1.2])en(3.3,.12,.65,Fe.clone().add(new E(9,2.3,fs)),Q,te,.08);for(let fs of[-7.8,1.1])for(let $i of[-2.75,2.75]){let ho=nt(new Zt(.24,.24,.08,16),ne,Fe.clone().add(new E(fs,3.74,$i)),te);sn(.32,.02,.06,ho.position.clone().add(new E(0,.06,0)),Q,te)}let us=nt(new Zt(1.3,1.3,.65,28),Gt,Fe.clone().add(new E(-3.6,0,3.92)),te);us.rotation.x=Math.PI/2;let dr=nt(new Zt(.78,.78,3.1,28),yt,Fe.clone().add(new E(-3.6,0,5.55)),te);dr.rotation.x=Math.PI/2,sn(1.1,.18,2.7,Fe.clone().add(new E(-3.6,.71,5.55)),yt,te);let ds=new mn;te.add(ds);let Va=[];U.push({id:x.partId,group:ds,cables:Va,stage:x.wiringStage??x.stage}),Me.terminals.map(fs=>me(fs,2.15)).forEach((fs,$i)=>{sn(.18,.55,.65,fs,ne,te);let ho=$i?C:P,cm=Me.cableRoutes?.[$i]?Hd(La,Me.cableRoutes[$i],me,fs,ho,Me.cableHeights[$i]):new Hi([fs,me([t($i?x.b:x.a)[0],790+$i*28],1.2),ho.clone().setY(.55),ho],!1,"centripetal"),oh=new mn;ds.add(oh);let P_=new at({color:$i?3361114:14179409,roughness:.45}),Vd=nt(new wi(cm,96,.13,10,!1),P_,new E,oh),I_=sn(.3,.46,.3,ho.clone().setY(.23),Q,oh);Vd.userData={id:x.id},b.push(Vd),Va.push({group:oh,wire:Vd,curve:cm,plug:I_,terminal:$i,progress:1})});let rh=W(Me.label||"MOTORREDUCTOR TT \xB7 EXTERNO",me([Me.center[0],Me.bounds[1]+24],.12),22,.9,{background:"#f3f2e8",color:"#345349",size:35});te.add(rh)}if(x.kind==="switch"&&x.externalControl&&(q.push(dm({THREE:La,it:x,group:te,mesh:nt,box:sn,roundedBox:en,toWorld:me,hpos:j,point:t,topLabel:W,contactShadow:Ue,pickables:b,switches:L,metal:ne,dark:Q,componentLabels:!1})),fn.register({id:x.partId||x.id,connectionId:x.id,type:"switch",title:"Interruptor "+x.value,detail:x.externalControl.model.toUpperCase(),anchor:me(x.externalControl.center,4.1),group:te})),x.kind==="switch"&&x.tactile){let Me=[P,C,...(x.extraPins||[]).map(([Bt])=>j(Bt))],Fe=Me.reduce((Bt,an)=>Bt.add(an),new E).multiplyScalar(1/Me.length),pt=en(2.36,.62,2.36,Fe.clone().setY(.36),Ze("#1d1f22",.62,.02),te,.07);pt.userData={id:x.id},b.push(pt);let Gt=en(2.42,.06,2.42,Fe.clone().setY(.7),new at({color:13225680,roughness:.28,metalness:.85}),te,.02);for(let Bt of[-1,1])sn(.08,.5,.5,Fe.clone().add(new E(Bt*1.22,.45,0)),ne,te);let ht=nt(new Zt(.62,.66,.34,32),Ze("#26282c",.5,.01),Fe.clone().setY(.88),te),Tt=nt(new Zt(.58,.6,.42,32),new ir({color:12727852,roughness:.38,clearcoat:.6,clearcoatRoughness:.3}),Fe.clone().setY(1.24),te);Tt.userData={switchId:x.value||x.id,tactile:!0,homeY:Tt.position.y,stem:ht,stemY:ht.position.y,baseColor:"#c2362c"},b.push(Tt),L.push(Tt);for(let Bt of Me){let an=Fe.clone().sub(Bt).setY(0).multiplyScalar(.18);ti([Bt,Bt.clone().setY(.3),Bt.clone().add(an).setY(.52)],te,.06)}Ue(Fe,2.9,2.9,te),fn.register({id:x.partId||x.id,connectionId:x.id,type:"switch",title:"Pulsador "+(x.value||x.id),detail:"Lleva INICIO_N a GND \xB7 CLEAR de los cuatro JK",anchor:Fe.clone().setY(2.1),hitPoint:Fe.clone(),group:te})}if(x.kind==="switch"&&!x.externalControl&&!x.tactile){let Me=(x.spdt?P.clone().lerp(j(x.third),.5):Se.clone()).setY(.65),Fe=en(x.spdt?2.8:1.8,.9,1.35,Me,new at({color:3426627}),te,.12),pt=en(1.12,.28,.9,Me.clone().add(new E(0,.58,0)),new at({color:2383765}),te,.08);if(pt.userData={bit:x.value||x.id},b.push(pt),L.push(pt),pt.userData.switchId=x.value||x.id,[P,C,...x.third?[j(x.third)]:[]].forEach(Gt=>ti([Gt,Gt.clone().setY(.5)],te)),fn.register({id:x.partId||x.id,connectionId:x.id,type:"switch",title:"Interruptor "+(x.value||x.id),detail:x.contact==="NC"?"Final de carrera":"Mando de puerta",anchor:Me.clone().setY(1.9),group:te}),x.contact==="NC"||x.contact==="limit-spdt"){pt.visible=!1;let Gt=sn(2.45,.085,.24,Me.clone().add(new E(.5,.58,0)),ne,te);Gt.rotation.z=-.15;let ht=nt(new Zt(.22,.22,.36,20),Q,Me.clone().add(new E(1.65,.41,0)),te);ht.rotation.x=Math.PI/2}else{let Gt=(x.value||"")==="STOP";pt.material.color.set(Gt?"#bd4139":"#245f95"),pt.userData.baseColor=Gt?"#bd4139":"#245f95";let ht=W(Gt?"STOP":"I / O",Me.clone().add(new E(0,.73,0)),.9,.4,{background:Gt?"#bd4139":"#245f95",color:"#fff",size:40});te.add(ht)}}let $t=de?1-ie/We.getLength():1;y.set(x.id,{group:te,wire:xt,material:Ye,curve:We,a:P,b:C,it:x,routed:ye,routePoints:ge,height:He,plugs:fe,approach:$t}),["wire","link"].includes(x.kind)||G.set(x.partId||x.id,{group:te,holes:[x.a,x.b,...x.third?[x.third]:[]],external:!!(x.externalControl||x.externalMotor),home:te.position.clone()})}e.items.forEach(Ht);for(let x of e.items.filter(P=>P.externalLead)){let P=x.externalLead,C=P.motor?U.find(ye=>ye.id===P.partId):q.find(ye=>ye.id===P.partId),N=C?.cables[P.terminal];if(!N)throw new Error("Missing external cable "+x.id);d.add(N.group),N.nativeId=x.id,N.wire.userData={id:x.id},N.tip&&(N.tip.visible=!1);let K=N.curve.getPoint(0),he=N.curve.getPoint(1);y.set(x.id,{group:N.group,wire:N.wire,material:N.wire.material,curve:N.curve,a:K,b:he,it:x,routed:!1,routePoints:null,height:1.8,plugs:[[],[{mesh:N.plug,home:N.plug.position.clone()}]]})}let Kt=new mn;Kt.visible=!1,d.add(Kt);let Rt=new hr,Vt=null,Mn=0,Ve=[],rn=-1,Mt=new E,xn=new E,Tn=nt(new pi(1,12,8),new at,new E),Ii=Tn.material;Tn.visible=!1;let yi=x=>(x=Nn.clamp(x,0,1),x*x*(3-2*x)),Nt=[[1587247,10],[16765290,7],[556947,3]].map(([x,P],C)=>{let N=new Os({color:x,linewidth:P,worldUnits:!1,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),K=new eh(Rt,N);return K.renderOrder=24+C,K.frustumCulled=!1,Kt.add(K),K});function on(x){if(Kt.visible=!!(x?.group.visible&&x.it.kind==="wire"),!Kt.visible){Vt=null;return}if(Vt===x.it.id)return;let P=x.wire.geometry.parameters.tubularSegments;Ve=Array.from({length:P+1},(N,K)=>x.curve.getPointAt(K/P)),rn=-1;let C=new hr;C.setPositions(Ve.flatMap(N=>N.toArray())),Rt.dispose(),Rt=C,Nt.forEach(N=>{N.geometry=C}),Nt[2].material.color.copy(x.material.color),Vt=x.it.id,Mn++}let qn=[0,1].map(x=>{let P=nt(new ki(.35,.075,8,24),new Qt({color:x?4284356:882277,depthTest:!1,depthWrite:!1}),new E);return P.rotation.x=-Math.PI/2,P.renderOrder=15,P.visible=!1,{ring:P}}),Ot=nt(new pi(.17,12,8),new Qt({color:16768134,depthTest:!1,depthWrite:!1}),new E);Ot.renderOrder=32,Ot.visible=!1;let Ki=[0,1].map(()=>{let x=nt(new ki(.22,.06,8,24),new Qt({color:15840829,depthTest:!1}),new E);return x.rotation.x=-Math.PI/2,x.renderOrder=16,x.visible=!1,x});function Bs(x){for(;x;){if(!x.visible)return!1;x=x.parent}return!0}let za=new ha,Jp=new le,sh=null;p.addEventListener("pointerdown",x=>{sh=[x.clientX,x.clientY]}),p.addEventListener("pointerup",x=>{if(!sh||Math.hypot(x.clientX-sh[0],x.clientY-sh[1])>6||x.button!==0)return;let P=p.getBoundingClientRect();Jp.set((x.clientX-P.left)/P.width*2-1,-(x.clientY-P.top)/P.height*2+1),za.setFromCamera(Jp,u);let C=za.intersectObjects(b,!1).find(de=>Bs(de.object));if(!C){fn.dismiss();return}let N=C.object.userData,K=e.chips?.find(de=>de.id===N.chip&&de.dipSwitch),he=null;if(K){let de=C.object.getWorldPosition(new E),He=Nn.clamp(Math.floor(C.point.x-de.x+2)+1,1,4);he=K.functions?.[He]}he?o(he):N.id?i(N.id):N.p?r(N.u||N.array,N.p):N.chip?l(N.chip):N.holes&&C.instanceId!==void 0?c(N.holes[C.instanceId]):N.bit!==void 0&&o(N.bit);let ye=N.bit!==void 0?e.items.find(de=>de.kind==="switch"&&de.value===N.bit):null;fn.select(N.componentHint||N.id||N.chip||N.u||ye?.partId||ye?.id)}),_.addEventListener("start",()=>{oe=null,_n=!1,p.dataset.moving="false",Je=50}),_.addEventListener("change",()=>{ao=!0,Xt()}),_.addEventListener("end",()=>{Je=50,Xt()});function Xt(){be&&!document.hidden&&!Ae&&(Ae=requestAnimationFrame(S_))}let Kp=new E,y_=new E;function v_(){let x=y.get(Ua);if(!x?.group.visible)return;let P=Nd,C=Ud;if(!P||!C||!Et?.cableFocus||x.it.kind!=="wire"||Xe)return;let N=2*Math.tan(u.fov*Math.PI/360)/C;u.getWorldDirection(Kp);for(let{ring:K}of qn){let he=y_.copy(K.position).sub(u.position).dot(Kp);K.scale.setScalar(Nn.clamp(he*N*5/.35,1,2.6))}}let lo=null;try{lo=f.compileAsync?.(d,u)?.catch(()=>{}).finally(()=>{lo=null,Xt()})||null}catch{lo=null}setTimeout(()=>{lo&&(lo=null,Xt())},4e3);function S_(x){if(Ae=0,!(!be||document.hidden)&&!lo){if(ao=!1,oe){let P=Nn.clamp((x-oe.started)/620,0,1),C=1-Math.pow(1-P,4);u.position.lerpVectors(oe.fromPos,oe.toPos,C),_.target.lerpVectors(oe.fromTarget,oe.toTarget,C),P===1&&(oe=null,p.dataset.moving="false")}if(Xe){let P=Nn.clamp((x-Xe.started)/Xe.duration,0,1);Ot.position.copy(Xe.curve.getPointAt(P)),Ot.visible=P<1,qn.forEach(({ring:C})=>C.scale.setScalar(1+.25*Math.sin(P*Math.PI*2))),P===1&&(Xe=null,qn.forEach(({ring:C})=>C.scale.setScalar(1)))}_.update(),v_(),fn.layout(),f.render(d,u),th++,(oe||Xe||ao&&Je-- >0)&&Xt()}}function Ld(){oe&&(u.position.copy(oe.toPos),_.target.copy(oe.toTarget),oe=null,_.update()),Xe=null,Ot.visible=!1,qn.forEach(({ring:x})=>x.scale.setScalar(1)),p.dataset.moving="false",Xt()}function $p(x,P=!0){It=[...x];let[C,N,K,he]=x,ye=me([C+K/2,N+he/2],1.6),de=_n?new E(0,1,.001):u.position.clone().sub(_.target).normalize();de.length()<.5&&de.set(.18,1.15,1.2).normalize(),!_n&&(de.y<.45||de.z<.2)&&de.set(Nn.clamp(de.x,-.55,.55),1.15,1.2).normalize();let He=new E().crossVectors(u.up,de).normalize(),te=new E().crossVectors(de,He).normalize(),fe=8,Se=Math.tan(u.fov*Math.PI/360);for(let We of[-K/60,K/60])for(let Ye of[-he/60,he/60])for(let st of[-1.6,4]){let xt=new E(We,st,Ye);fe=Math.max(fe,xt.dot(de)+1.08*Math.abs(xt.dot(He))/(Se*u.aspect),xt.dot(de)+1.08*Math.abs(xt.dot(te))/Se)}oo=fe;let ge=ye.clone().addScaledVector(de,fe);oe=null,P&&Et?.animate&&be&&ci.motion==="full"?(oe={fromPos:u.position.clone(),toPos:ge,fromTarget:_.target.clone(),toTarget:ye,started:performance.now()},p.dataset.moving="true"):(u.position.copy(ge),_.target.copy(ye),_.update(),p.dataset.moving="false"),Xt()}function Dd(x){Et=x,Ua=x.selected,typeof x.clarity=="boolean"?Zi=x.clarity:typeof x.routingFocus=="boolean"&&(Zi=x.routingFocus),typeof x.isolate=="boolean"&&(_i=x.isolate);let P=x.studio,C=!!P?.chip,N=new Set(P?.related||[]),K=new Set(P?.signals?.active?P.signals.ids:[]),he=y.get(x.selected),ye=Zi&&!!he,de=he?.it.partId,He=new Set([de,...[he?.it.fromRef,he?.it.toRef].filter(Boolean).map(Se=>Se.split(".")[0])].filter(Boolean)),te=x.cableFocus&&ye&&he?.it.kind==="wire",fe=[he?.it.fromRef,he?.it.toRef].filter(Se=>/^U\d+\.\d+$/.test(Se||""));for(let[Se,ge]of y){let We=!["wire","link"].includes(ge.it.kind)||x.step===e.stages.length-1||ge.it.stage===x.step;ge.group.visible=(We||x.previous&&ge.it.stage<x.step||C&&N.has(Se))&&!(_i&&he?.it.kind==="wire"&&ge.it.kind==="wire"&&Se!==x.selected);let Ye=He.has(ge.it.partId),st=ge.it.kind==="wire"&&he?.it.kind==="wire"&&he.it.signal&&ge.it.signal===he.it.signal,xt=ge.it.kind==="wire"&&de&&[ge.it.fromRef,ge.it.toRef].some($t=>$t?.startsWith(de+".")),Lt=te&&!C&&!P?.signals?.active?ge.it.kind==="wire"&&Se!==x.selected?st?.32:.22:1:P?.signals?.active&&ge.it.kind==="wire"?K.has(Se)?1:.16:C?N.has(Se)?1:ge.it.kind==="wire"?.1:.8:Se===x.selected?1:ye?ge.it.kind==="wire"?st||xt?.32:.16:Ye?1:.92:x.selected?.4:We?1:.75;ge.group.traverse($t=>{if($t.userData.viewerLabel&&($t.visible=!ye||Se===x.selected||Ye),$t.isMesh)for(let Me of[].concat($t.material)){let Fe=$t.userData.baseOpacity??1;Me.transparent=Lt<1||Fe<1||!!$t.userData.softShadow,Me.opacity=Lt*Fe,Me.depthWrite=Lt>.6&&Fe===1&&!$t.userData.softShadow}}),ge.material.emissive.set(Se===x.selected?ge.material.color:0),ge.material.emissiveIntensity=Se===x.selected?.3:0}on(he);for(let[Se,ge]of A)ge.visible=C?Se.startsWith(P.chip+".")&&(!P.pin||Se===P.chip+"."+P.pin):!ye||fe.includes(Se);Ki.forEach((Se,ge)=>{let We=fe[ge],Ye=v.find(st=>st.userData.u+"."+st.userData.p===We);Se.visible=!!(ye&&Ye),Ye&&Se.position.copy(j(Ye.userData.h,.23))}),qn.forEach(({ring:Se},ge)=>{let We=y.get(x.selected);Se.visible=!!We?.group.visible,Se.scale.setScalar(1),We&&Se.position.copy(ge?We.b:We.a).add(new E(0,.14,0))}),k&&(k.rotation.y=(x.pot/100-.5)*Math.PI),A_(P),fn.sync(x.selected||P?.chip||"",x.selected||P?.chip),em(x),jp(B);for(let Se of U)Se.group.visible=x.step>=Se.stage;s.dataset.selected=x.selected||"",s.dataset.step=x.step,s.dataset.wireClarity=String(Zi),s.dataset.isolateWires=String(_i),s.dataset.visibleConnections=[...y.values()].filter(Se=>Se.group.visible).length,x.animate||Ld(),Xt()}function jp(x){B=x;let P=0;for(let C of q)for(let N of C.cables){if(N.nativeId){P++;continue}let K=x&&C.id===x.id&&N.terminal===x.terminal;N.group.visible=Et?.step>=(C.wiringStage||2)&&(!x||P<=x.index),fm(N,K?x.progress:1),P++}Xt()}function M_(x){let P=!!x;P!==Zi&&(Zi=P,Et?Dd({...Et,clarity:P}):(s.dataset.wireClarity=String(P),Xt()))}function Qp(x){let P=!1;for(let[C,N]of R){let K=!!x[C];N.userData.lit!==K&&(N.userData.lit=K,N.color.set(N.userData.baseColor),N.emissive.set(K?N.userData.baseColor:"#000000"),N.emissiveIntensity=K?.9:0,D.get(C).visible=K,P=!0)}P&&Xt()}function em(x={}){O=x.contacts||Object.fromEntries((e.chips||[]).filter(P=>P.dipSwitch).map(P=>[P.id,Object.fromEntries(Object.entries(P.functions).map(([C,N])=>[C,e.stopClosedRun&&N==="STOP"?!x.switches?.[N]:!!x.switches?.[N]]))])),Qp(x.leds||{});for(let[P,C]of S){let[N,K]=P.split("."),he=!!(x.segments?.[P]??x.segments?.[N]?.[K]);C.material.color.set(he?qi.lit:qi.lens),C.material.emissive.set(he?qi.lit:"#000000"),C.material.emissiveIntensity=he?1.35:0}for(let P of L){if(P.userData.tactile){let C=x.switches?.[P.userData.switchId]?.16:0;P.position.y=P.userData.homeY-C,P.userData.stem.position.y=P.userData.stemY-C;continue}if(P.userData.dipSlider){let C=!!x.switches?.[P.userData.switchId],N=O[P.userData.componentHint]?.[P.userData.dipPosition]??(e.stopClosedRun&&P.userData.switchId==="STOP"?!C:C);P.position.z=P.userData.homeZ+(N?-.36:.36);continue}if(P.userData.externalControl){kd(P,!!x.switches?.[P.userData.switchId]);continue}P.rotation.z=x.switches?.[P.userData.switchId]?-.18:.18,P.material.color.set(x.switches?.[P.userData.switchId]?"#da7044":P.userData.baseColor||"#245f95")}Xt()}function b_(){let x=y.get(Ua);!x||!x.group.visible||!Et?.animate||!be||(Xe={curve:x.curve,started:performance.now(),duration:Math.min(6e3,Math.max(2200,x.curve.getLength()*60))},Ot.visible=!0,Xt())}function E_(x){let P=x?.stripHoles||[],C=JSON.stringify(P);if(C===Dt||(Dt=C,Be.traverse(de=>{if(de.geometry?.dispose(),de.material)for(let He of[].concat(de.material))He.dispose()}),Be.clear(),!P.length))return;let N=j(P[0],.09),K=j(P.at(-1),.09),he=N.clone().lerp(K,.5),ye=Math.abs(N.x-K.x)>Math.abs(N.z-K.z);sn(ye?N.distanceTo(K)+.6:.62,.045,ye?.62:N.distanceTo(K)+.6,he,new Qt({color:14198067,transparent:!0,opacity:.38,depthTest:!1,depthWrite:!1}),Be);for(let de of P){let He=nt(new ki(.27,.045,8,20),new Qt({color:11040800,depthTest:!1,depthWrite:!1}),j(de,.13),Be);He.rotation.x=-Math.PI/2,He.renderOrder=18}}function tm(x){let P=x?.reveal;if(!P||P.ring<0)return;let C=x.wire.geometry,N=P.ring*P.stride,K=N+P.stride;for(let he of["position","normal"]){let ye=C.getAttribute(he);ye.array.set(P[he].subarray(N,K),N),ye.addUpdateRange(N,P.stride),ye.needsUpdate=!0}P.ring=-1}function w_(){if(rn<0)return;let x=Rt.getAttribute("instanceEnd"),P=Ve[rn+1];x&&P&&(x.setXYZ(rn,P.x,P.y,P.z),x.data.needsUpdate=!0),rn=-1}function nm(x){if(x){tm(x),x.wire.geometry.setDrawRange(0,1/0),Tn.visible=!1;for(let P of x.plugs||[])for(let C of P)C.mesh.visible=!0,C.mesh.position.copy(C.home)}}function im(x,P){let C=x.approach??1;return P<.78?C*yi((P-.22)/.56):C+(1-C)*yi((P-.78)/.22)}function sm(x){if(Qe.id&&Qe.id!==x?.id&&nm(y.get(Qe.id)),w_(),!x){Qe.id&&nm(y.get(Qe.id)),Qe={id:null,progress:1},Rt.instanceCount=Rt.getAttribute("instanceStart")?.count||0,Xt();return}let P=y.get(x.id);if(!P||P.it.kind!=="wire")return;Qe={id:x.id,progress:Nn.clamp(x.progress,0,1)},Xe=null,Ot.visible=!1;let C=Qe.progress,N=im(P,C),K=P.wire.geometry;tm(P);let he=K.parameters.tubularSegments,ye=K.parameters.radialSegments,de=N*he,He=Math.floor(de),te=de-He,fe=Math.min(he,He+1);if(N>0&&N<1&&te>1e-8){P.reveal||={position:new Float32Array(K.getAttribute("position").array),normal:new Float32Array(K.getAttribute("normal").array),stride:(ye+1)*3,ring:-1};let ge=P.reveal,We=K.getAttribute("position"),Ye=K.getAttribute("normal"),st=K.parameters.radius;P.curve.getPointAt(N,Mt);for(let xt=0;xt<=ye;xt++){let Lt=(He*(ye+1)+xt)*3,$t=(fe*(ye+1)+xt)*3;xn.set(ge.normal[Lt]+(ge.normal[$t]-ge.normal[Lt])*te,ge.normal[Lt+1]+(ge.normal[$t+1]-ge.normal[Lt+1])*te,ge.normal[Lt+2]+(ge.normal[$t+2]-ge.normal[Lt+2])*te).normalize(),We.setXYZ(fe*(ye+1)+xt,Mt.x+st*xn.x,Mt.y+st*xn.y,Mt.z+st*xn.z),Ye.setXYZ(fe*(ye+1)+xt,xn.x,xn.y,xn.z)}ge.ring=fe;for(let xt of[We,Ye])xt.addUpdateRange(fe*ge.stride,ge.stride),xt.needsUpdate=!0}else P.curve.getPointAt(N,Mt);let Se=N<=0?0:Math.ceil(de);if(K.setDrawRange(0,Se*ye*6),Tn.visible=P.group.visible&&N>0&&N<1&&!(P.approach<1&&C>=.78),Tn.visible&&(Tn.position.copy(Mt),Tn.scale.setScalar(K.parameters.radius),Ii.color.copy(P.material.color),Ii.roughness=P.material.roughness),Vt===x.id&&(Rt.instanceCount=Se,Se>0&&N<1)){let ge=Rt.getAttribute("instanceEnd");rn=Se-1,ge.setXYZ(rn,Mt.x,Mt.y,Mt.z),ge.data.needsUpdate=!0}(P.plugs||[]).forEach((ge,We)=>{let Ye=yi(We?(C-.78)/.22:C/.22);for(let st of ge)st.mesh.visible=We?C>=.78:!0,st.mesh.position.copy(st.home),st.mesh.position.y+=ie*(1-Ye)}),Xt()}function T_(){let x=y.get(Qe.id);if(!x)return null;let P=x.wire.geometry,C=P.parameters.radialSegments,N=P.parameters.tubularSegments,K=im(x,Qe.progress),he=Math.ceil(K*N),ye=P.getAttribute("position"),de=new E,He=x.curve.getPointAt(0);if(he>0){for(let Ye=0;Ye<C;Ye++){let st=he*(C+1)+Ye;de.x+=ye.getX(st),de.y+=ye.getY(st),de.z+=ye.getZ(st)}de.divideScalar(C)}else de.copy(He);let te=Rt.getAttribute("instanceEnd"),fe=Rt.instanceCount-1,Se=fe>=0?new E(te.getX(fe),te.getY(fe),te.getZ(fe)):He,ge=x.approach<1&&Qe.progress>=.78?x.plugs[1][0].mesh.position:null,We=ge?Math.hypot(de.x-ge.x,de.y-ge.y-J,de.z-ge.z):null;return{fraction:K,wireTip:de.toArray(),traceTip:Se.toArray(),tipError:de.distanceTo(Se),plugTipError:We,visibleSegments:he,segments:N,traceSegments:Rt.instanceCount}}function rm(x){if(Y?.id&&Y.id!==x?.id){let C=G.get(Y.id);C&&C.group.position.copy(C.home)}let P=G.get(x?.id);if(Y=P?{id:x.id,progress:Nn.clamp(x.progress,0,1)}:null,ee!==Y?.id){se.traverse(C=>{C.geometry?.dispose(),C.material?.dispose()}),se.clear(),ee=Y?.id;for(let[C,N]of(P?.holes||[]).entries()){let K=nt(new ki(C===0?.3:.23,.045,8,20),new Qt({color:C===0?13080622:1538403,depthTest:!1,depthWrite:!1}),j(N,.15),se);K.rotation.x=-Math.PI/2,K.renderOrder=19}}if(P){let C=Y.progress,N=yi((C-.24)/.76);P.group.position.copy(P.home),P.group.position.y+=5.5*(1-N)}Xt()}function A_(x){E_(x);for(let[P,C]of ke)C.outline.visible=P===x?.chip,C.body.material.transparent=!!(x?.chip&&P!==x.chip),C.body.material.opacity=x?.chip&&P!==x.chip?.toString()?.52:1;sm(x?.assembly||null),rm(x?.placement||null),ur(x?.signals||null)}let Nd=0,Ud=0,Fd=0;function R_(){Fd||(Fd=requestAnimationFrame(()=>{Fd=0,Od()}))}function Od(){let x=s.getBoundingClientRect(),P=Math.round(x.width),C=Math.round(x.height);if(!(!P||!C||P===Nd&&C===Ud)){Nd=P,Ud=C,u.aspect=P/C,u.updateProjectionMatrix(),f.setSize(P,C,!1),Nt.forEach(N=>N.material.resolution.set(P,C));for(let N of Ji.children)N.material.resolution.set(P,C);Xt()}}let om=new ResizeObserver(R_);om.observe(s),p.addEventListener("webglcontextlost",x=>{x.preventDefault(),Bd(!1),a("Tu navegador perdi\xF3 la vista 3D. Puedes seguir en 2D y volver a intentarlo.")});let am=()=>{document.hidden?(Ld(),Ae&&cancelAnimationFrame(Ae),Ae=0):Xt()};document.addEventListener("visibilitychange",am);function Bd(x){be=x,fn.setActive(x),x?(Od(),Xt()):(Ld(),Ae&&cancelAnimationFrame(Ae),Ae=0)}u.position.set(12,70,75),_.target.set(0,0,0),_.update();function C_(){let x=Rt.getAttribute("instanceStart"),P=Rt.getAttribute("instanceEnd");return{visible:Kt.visible,id:Vt,builds:Mn,isolate:_i,widths:Nt.map(C=>C.material.linewidth),resolution:Nt[0].material.resolution.toArray(),depthTest:Nt.some(C=>C.material.depthTest),curveA:x?[x.getX(0),x.getY(0),x.getZ(0)]:null,curveB:P?[P.getX(P.count-1),P.getY(P.count-1),P.getZ(P.count-1)]:null,visibleWires:[...y].filter(([,C])=>C.it.kind==="wire"&&C.group.visible).map(([C])=>C),endpointLabels:[],endpointRings:qn.map(({ring:C})=>C.visible),replayDuration:Xe?.duration||null}}let zd=new mn;d.add(zd);let lm=hm({groups:G,guideLayer:zd,requestRender:Xt,makeRing:(x,P)=>{let C=nt(new ki(P===0?.3:.23,.045,8,20),new Qt({color:P===0?13080622:1538403,depthTest:!1,depthWrite:!1}),j(x,.15),zd);return C.rotation.x=-Math.PI/2,C.renderOrder=19,C}});return{setComponentSequence:lm.apply,setExternalCable:jp,update:Dd,focusBox:$p,replay:b_,setActive:Bd,setLEDs:Qp,setIndicators:em,setWireClarity:M_,setAssembly:sm,setPlacement:rm,setSignals:nh,dismissComponentLabel:fn.dismiss,getComponentLabel(){let x=fn.diagnostics(),P=0;for(let C of x.targets)G.get(C.id)?.group.traverse(N=>{N.userData.viewerLabel&&!/^(\d+|I \/ O|STOP|SS0501A)$/.test(N.userData.labelText||"")&&P++});return{...x,flatNameCount:P}},getViewState(){return{camera:u.position.toArray(),target:_.target.toArray(),box:[...It],fitDistance:oo,topView:_n}},getPlanViewBox(){let x=u.position.distanceTo(_.target)/Math.max(.01,oo),P=It[2]*x,C=It[3]*x;return[gt+_.target.x*30-P/2,H+_.target.z*30-C/2,P,C]},restoreViewState(x){if(!x||!["camera","target"].every(N=>Array.isArray(x[N])&&x[N].length===3&&x[N].every(Number.isFinite)))return!1;let P=new E().fromArray(x.camera).distanceTo(new E().fromArray(x.target));if(P<_.minDistance||P>_.maxDistance)return!1;oe=null;let C=_.enableDamping;return _.enableDamping=!1,_.update(),u.position.fromArray(x.camera),_.target.fromArray(x.target),_n=!!x.topView,Array.isArray(x.box)&&x.box.length===4&&x.box.every(Number.isFinite)&&x.box[2]>0&&x.box[3]>0&&(It=[...x.box]),Number.isFinite(x.fitDistance)&&x.fitDistance>0&&(oo=x.fitDistance),_.update(),_.enableDamping=C,p.dataset.moving="false",Xt(),!0},setAppearance(x={}){["auto","economy","sharp"].includes(x.quality)&&x.quality!==ci.quality&&(ci.quality=x.quality,f.setPixelRatio(Math.min(window.devicePixelRatio||1,x.quality==="economy"?1:x.quality==="sharp"?2:1.6)),Od()),["full","reduced","off"].includes(x.motion)&&(ci.motion=x.motion),x.background&&x.background!==ci.background&&(d.background.set(x.background),ci.background=x.background),ci.motion!=="full"&&oe&&(u.position.copy(oe.toPos),_.target.copy(oe.toTarget),oe=null,_.update(),p.dataset.moving="false"),Xt()},getAppearance(){return{...ci}},setSelectionStyle(x={}){[1,1.4,1.8].includes(x.scale)&&(hs.scale=x.scale),[.5,.8,1].includes(x.intensity)&&(hs.intensity=x.intensity),Nt.forEach((P,C)=>{P.material.linewidth=[10,7,3][C]*hs.scale,P.material.opacity=C===2?1:hs.intensity}),Xt()},getSelectionStyle(){return{...hs}},stopReplay(){Xe=null,Ot.visible=!1,Xt()},capture(){return f.render(d,u),p.toDataURL("image/png")},preset(x){_n=x==="top",_n||(oe=null,u.position.copy(_.target).add(new E(12,70,75)),_.update()),$p(It,!0)},zoom(){let x=_.target.clone(),P=x.clone().add(u.position.clone().sub(x).multiplyScalar(.75));oe=null,Et?.animate&&ci.motion==="full"?(oe={fromPos:u.position.clone(),toPos:P,fromTarget:x,toTarget:x,started:performance.now()},p.dataset.moving="true",Xt()):(u.position.copy(P),_.update(),Xt())},rotate(x){_n=!1;let P=u.position.clone().sub(_.target);P.applyAxisAngle(new E(0,1,0),x*Math.PI/6);let C=_.target.clone().add(P);Et?.animate&&ci.motion==="full"?(oe={fromPos:u.position.clone(),toPos:C,fromTarget:_.target.clone(),toTarget:_.target.clone(),started:performance.now()},p.dataset.moving="true",Xt()):(u.position.copy(C),_.update(),Xt())},diagnostics(){let x=p.getBoundingClientRect(),P=C=>{let N=C.clone().project(u);return[x.left+(N.x+1)*x.width/2,x.top+(1-N.y)*x.height/2]};return{componentAssembly:lm.diagnostics(),motors:[...y.values()].filter(C=>C.it.kind==="motor").map(C=>({id:C.it.partId,model:C.it.externalMotor?.model||"generic",terminals:C.it.externalMotor?.terminals.length||2,routeTypes:U.find(N=>N.id===C.it.partId)?.cables.map(N=>N.curve.type)||[]})),externalControls:q.map(C=>({id:C.id,model:C.model,center:C.center,bounds:C.bounds,connections:C.connections,cables:C.cables.map(N=>({terminal:N.terminal,routeType:N.curve.type,visible:N.group.visible,progress:N.nativeId?Qe.id===N.nativeId?Qe.progress:1:N.progress,drawCount:N.wire.geometry.drawRange.count,start:N.curve.getPoint(0).toArray(),end:N.curve.getPoint(1).toArray(),tip:N.nativeId?(Qe.id===N.nativeId?N.curve.getPointAt(yi((Qe.progress-.22)/.56)):N.curve.getPoint(1)).toArray():N.tip.position.toArray()})),actuated:C.actuator.userData.actuated,actuator:C.actuator.position.toArray(),screen:P(me(C.center,2.5))})),studio:{signals:xi?{...xi,builds:Oa}:null,placement:Y?{...Y,height:G.get(Y.id).group.position.y,holes:G.get(Y.id).holes}:null,chip:Et?.studio?.chip||null,stripHoles:Et?.studio?.stripHoles||[],assembly:{...Qe},reveal:T_(),partialDrawCount:Qe.id?y.get(Qe.id)?.wire.geometry.drawRange.count:null},selection:C_(),wireClarity:Zi,routedConnections:[...y.values()].filter(C=>C.routed).length,wireStates:Object.fromEntries([...y].filter(([,C])=>C.routed).map(([C,N])=>[C,{opacity:N.wire.material.opacity,height:N.height,curveA:N.curve.getPoint(0).toArray(),curveB:N.curve.getPoint(1).toArray()}])),connectionCount:y.size,pinCount:v.length,arrayPinCount:T.length,resistorArrays:(e.arrays||[]).length,resistors:e.items.filter(C=>C.kind==="res").length,frames:th,active:be,moving:!!oe,camera:u.position.toArray(),target:_.target.toArray(),drawCalls:f.info.render.calls,triangles:f.info.render.triangles,targets:{contacts:[P(j(["A","d",12],.03))],chips:[...ke].map(([C,N])=>({id:C,screen:P(N.body.position)})),switches:L.slice(0,3).map(C=>P(C.position)),dipContacts:L.filter(C=>C.userData.dipSlider).map(C=>{let N=C.userData.componentHint,K=e.chips.find(He=>He.id===N),he=Object.entries(K.functions).find(([,He])=>He===C.userData.bit)?.[0],ye=ke.get(N).body,de=ye.position.clone().add(new E(Number(he)-2.5,.64,.95));return{bit:C.userData.bit,id:N,slider:P(C.getWorldPosition(new E)),body:P(ye.parent.localToWorld(de))}}),pins:v.map(C=>({u:C.userData.u,p:C.userData.p,screen:P(C.geometry.parameters.path.getPoint(.15))})),wires:Object.fromEntries([...y].map(([C,N])=>[C,P(N.curve.getPoint(.5))]))},endpoints:Object.fromEntries([...y].map(([C,N])=>[C,{a:N.it.a,b:N.it.b,worldA:N.a.toArray(),worldB:N.b.toArray()}])),lit:[...R].filter(([,C])=>C.userData.lit).map(([C])=>C)}},dispose(){Bd(!1),fn.dispose(),om.disconnect(),document.removeEventListener("visibilitychange",am),_.dispose();let x=new Set,P=new Set,C=new Set;d.traverse(N=>{N.geometry&&x.add(N.geometry);for(let K of[].concat(N.material||[]))P.add(K),K.map&&C.add(K.map),K.bumpMap&&C.add(K.bumpMap)}),C.forEach(N=>N.dispose()),P.forEach(N=>N.dispose()),x.forEach(N=>N.dispose()),f.dispose(),p.remove()}}}export{v1 as createViewer};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
