var _0=Object.defineProperty;var x0=(s,e)=>{for(var t in e)_0(s,t,{get:e[t],enumerable:!0})};function cp({groups:s,requestRender:e,makeRing:t,guideLayer:n}){let i=null,r="";function a(o){i=o;let l=o?.id||"";if(l!==r){for(let h of[...n.children])h.geometry?.dispose(),h.material?.dispose(),n.remove(h);r=l;let c=s.get(l);if(c&&!c.external)for(let[h,d]of c.holes.entries()){let u=t(d,h);n.add(u)}}for(let[c,h]of s){h.home||=h.group.position.clone(),h.group.position.copy(h.home);let d=o?.order?.indexOf(c)??-1;if(h.group.visible=!o||d<0||d<=o.index,o&&c===o.id){let u=Math.max(0,Math.min(1,(o.progress-.18)/.82)),f=u*u*(3-2*u);h.external?(h.group.position.x+=4*(1-f),h.group.position.y+=.7*(1-f)):h.group.position.y+=5.5*(1-f)}}n.visible=!!o,e()}return{apply:a,diagnostics:()=>({pose:i?{id:i.id,index:i.index,progress:i.progress}:null,components:[...s].map(([o,l])=>({id:o,visible:l.group.visible,position:l.group.position.toArray(),home:l.home?.toArray(),holes:l.holes,external:!!l.external}))})}}function hp({THREE:s,scene:e,container:t,camera:n,canvas:i,requestRender:r}){let a=new Map,o=new Map,l=null,c=null,h=!1,d=document.createElement("div");d.className="component-hologram",d.id="doorComponentHologram",d.hidden=!0,d.setAttribute("role","status"),d.setAttribute("aria-live","polite"),d.setAttribute("aria-atomic","true");let u=document.createElement("span"),f=document.createElement("strong"),p=document.createElement("span");u.className="hologram-kind",p.className="hologram-detail",d.append(u,f,p),t.append(d);let _=new s.Group;_.visible=!1,e.add(_);let g=new s.MeshBasicMaterial({color:6806741,transparent:!0,opacity:.65,depthWrite:!1,toneMapped:!1}),m=new s.Mesh(new s.TorusGeometry(.76,.025,8,48),g);m.rotation.x=-Math.PI/2,_.add(m);let y=new s.Mesh(new s.CylinderGeometry(.012,.012,1.2,6),g.clone());y.position.y=.6,y.material.opacity=.35,_.add(y);let b=new s.Vector3,x=new s.Vector3,A=new s.Vector3;function T(N){for(;N;){if(!N.visible)return!1;N=N.parent}return!0}function D(N){["led","res","switch"].includes(N.type)&&(a.set(N.id,N),N.connectionId&&o.set(N.connectionId,N.id))}function v(N){return a.get(o.get(N)||N)||null}function R(){l=null,d.hidden=!0,_.visible=!1,i.setAttribute("aria-describedby","threeHelp"),r()}function I(N,{toggle:B=!1}={}){let V=v(N);if(!V||B&&l?.id===V.id){R();return}l?.id!==V.id&&(l=V,u.textContent={led:"INDICADOR",res:"RESISTENCIA",switch:"CONTROL"}[V.type],f.textContent=V.title,p.textContent=V.detail||"",p.hidden=!V.detail,d.dataset.component=V.id,d.dataset.kind=V.type),i.setAttribute("aria-describedby","threeHelp "+d.id),H(),r()}function F(N,B){N!==c&&(c=N,I(B))}function H(){if(!h||!l||!T(l.group)){d.hidden=!0,_.visible=!1;return}let N=t.getBoundingClientRect();if(!N.width||!N.height)return;if(l.group.updateWorldMatrix(!0,!1),b.copy(l.anchor).applyMatrix4(l.group.matrixWorld),n.updateMatrixWorld(),A.copy(b).project(n),A.z<-1||A.z>1||Math.abs(A.x)>1.03||Math.abs(A.y)>1.03){d.hidden=!0,_.visible=!1;return}_.position.copy(b),_.visible=!0,x.copy(b),x.y+=1.7,x.project(n),d.hidden=!1;let B=Math.min(228,N.width-24),V=d.getBoundingClientRect?.().height||76,W=(A.x+1)*N.width/2,ie=(1-A.y)*N.height/2,Y=Math.max(B/2+10,Math.min(N.width-B/2-10,W)),$=Math.max(V+12,Math.min(N.height-10,(1-x.y)*N.height/2,ie-22));d.style.width=B+"px",d.style.left=Y+"px",d.style.top=$+"px"}let X=N=>{N.key==="Escape"&&l&&(N.preventDefault(),N.stopPropagation(),R())};return i.addEventListener("keydown",X),{register:D,resolve:v,select:I,sync:F,dismiss:R,layout:H,setActive(N){h=N,N?H():R()},diagnostics(){let N=l,B=d.getBoundingClientRect?.(),V=t.getBoundingClientRect();return n.updateMatrixWorld(),{id:N?.id||null,type:N?.type||null,title:f.textContent,detail:p.textContent,visible:!d.hidden,halo:_.visible,anchor:b.toArray(),screen:B?[B.left,B.top,B.right,B.bottom]:null,targets:[...a.values()].map(W=>{W.group.updateWorldMatrix(!0,!1);let ie=(W.hitPoint||W.anchor).clone().applyMatrix4(W.group.matrixWorld),Y=ie.clone().project(n);return{id:W.id,type:W.type,title:W.title,world:ie.toArray(),screen:[V.left+(Y.x+1)*V.width/2,V.top+(1-Y.y)*V.height/2]}})}},dispose(){i.removeEventListener("keydown",X),d.remove(),_.removeFromParent(),m.geometry.dispose(),y.geometry.dispose(),g.dispose(),y.material.dispose()}}}function ed(s,e,t,n,i,r){let a=[n,...e.map(l=>t(l,r)),i],o=new s.CurvePath;for(let l=1;l<a.length;l++)a[l-1].distanceToSquared(a[l])>1e-12&&o.add(new s.LineCurve3(a[l-1],a[l]));return o}function up(s){let{THREE:e,it:t,group:n,mesh:i,box:r,roundedBox:a,toWorld:o,hpos:l,topLabel:c,contactShadow:h,pickables:d,switches:u,metal:f,dark:p,componentLabels:_=!0}=s,g=t.externalControl,m=o(g.center,0),y=g.model==="scmm-122",b=new e.MeshStandardMaterial({color:6120546,metalness:.76,roughness:.42}),x=new e.MeshStandardMaterial({color:y?2304555:3907227,roughness:.6}),A=new e.MeshStandardMaterial({color:11368236,roughness:.77}),T=new e.MeshStandardMaterial({color:13028298,metalness:.87,roughness:.27}),D=new e.MeshStandardMaterial({color:2107947,roughness:.83}),v=B=>(B.userData={...B.userData,bit:t.value,componentHint:t.partId||t.id},d.push(B),B);function R(B,V,W){let ie=new e.Shape,Y=-B/2,$=-V/2;return ie.moveTo(Y+W,$),ie.lineTo(Y+B-W,$),ie.quadraticCurveTo(Y+B,$,Y+B,$+W),ie.lineTo(Y+B,$+V-W),ie.quadraticCurveTo(Y+B,$+V,Y+B-W,$+V),ie.lineTo(Y+W,$+V),ie.quadraticCurveTo(Y,$+V,Y,$+V-W),ie.lineTo(Y,$+W),ie.quadraticCurveTo(Y,$,Y+W,$),ie}let I;if(y){a(4.55,.2,2.2,m.clone().setY(.62),A,n,.05),v(a(4.45,1.35,2.1,m.clone().setY(1.4),x,n,.12));let B=R(8,2.55,.2);for(let $ of[-3.13,3.13]){let se=new e.Path;se.absellipse($,0,.45,.31,0,Math.PI*2,!0),B.holes.push(se)}let V=new e.Path;V.moveTo(-1.4,-.53),V.lineTo(-1.4,.53),V.lineTo(1.4,.53),V.lineTo(1.4,-.53),V.closePath(),B.holes.push(V);let W=v(i(new e.ExtrudeGeometry(B,{depth:.12,bevelEnabled:!0,bevelSize:.025,bevelThickness:.025,bevelSegments:2,steps:1}),b,m.clone().setY(2.13),n));W.rotation.x=-Math.PI/2;for(let $ of[-1.23,1.23])r(4.5,1.1,.1,m.clone().setY(1.55).add(new e.Vector3(0,0,$)),b,n);for(let $ of[-1.75,1.75])for(let se of[-1.18,1.18])r(.42,.34,.15,m.clone().setY(.9).add(new e.Vector3($,0,se)),b,n);I=new e.Group,I.position.copy(m).setY(2.26),n.add(I),v(a(.98,1.05,.85,new e.Vector3(0,.42,0),p,I,.06));for(let $=0;$<5;$++)r(.075,.98,.92,new e.Vector3(-.39+$*.195,.43,0),x,I);I.userData={externalControl:"scmm-122",switchId:t.value,homeX:m.x};let ie=c("0",m.clone().add(new e.Vector3(-2.3,2.285,0)),.38,.5,{background:"#5d6462",color:"#e0e7df",size:90}),Y=c("1",m.clone().add(new e.Vector3(2.3,2.285,0)),.38,.5,{background:"#5d6462",color:"#e0e7df",size:90});n.add(ie,Y)}else{let B=R(6.45,2.9,.22);for(let se of[-1.82,1.82]){let Ge=new e.Path;Ge.absarc(se,0,.43,0,Math.PI*2,!0),B.holes.push(Ge)}v(i(new e.ExtrudeGeometry(B,{depth:2.3,bevelEnabled:!0,bevelSize:.035,bevelThickness:.035,bevelSegments:2,steps:1}),x,m.clone().add(new e.Vector3(0,1.65,-1.15)),n));for(let se of[-1.82,1.82])for(let Ge of[-1.2,1.2])i(new e.TorusGeometry(.45,.055,8,24),x,m.clone().add(new e.Vector3(se,1.65,Ge)),n);a(5.9,.09,2.18,m.clone().add(new e.Vector3(0,3.15,0)),x,n,.04);let V=v(a(.95,.62,.9,m.clone().add(new e.Vector3(1.2,3.22,0)),p,n,.09)),W=m.clone().add(new e.Vector3(-2.55,3.25,0)),ie=i(new e.CylinderGeometry(.17,.17,1.1,20),f,W,n);ie.rotation.x=Math.PI/2,I=new e.Group,I.position.copy(W),n.add(I),v(r(7.45,.11,.85,new e.Vector3(3.42,.08,0),f,I));let Y=r(.5,.1,.85,new e.Vector3(7.05,.15,0),f,I);Y.rotation.z=.25,v(Y),I.userData={externalControl:"ss0501a",switchId:t.value,plunger:V,plungerY:V.position.y};let $=c("SS0501A",m.clone().add(new e.Vector3(0,3.21,.7)),3.6,.6,{background:"#3b9e9b",color:"#237975",size:56});n.add($)}u.push(I),h(m,y?10:10.8,6.3,n);let F=[t.a,t.b,t.third],H=[],X=g.terminals.map((B,V)=>{let W=o(B,1.02),ie=l(F[V],.08),Y=m.clone().add(new e.Vector3((V-1)*1.5,.72,1.08));i(new e.TubeGeometry(new e.CatmullRomCurve3([Y,Y.clone().add(new e.Vector3(0,-.18,.5)),W]),12,.085,8,!1),f,new e.Vector3,n),r(.38,.68,.13,W.clone().add(new e.Vector3(0,.15,-.15)),f,n),i(new e.TorusGeometry(.18,.065,8,20),f,W,n),i(new e.SphereGeometry(.17,12,8),T,W.clone().add(new e.Vector3(0,-.06,.03)),n);let $=W.clone().add(new e.Vector3(0,-.18,.65)),se=i(new e.CylinderGeometry(.19,.17,.65,16),D,W.clone().add(new e.Vector3(0,-.09,.32)),n);se.rotation.x=Math.PI/2;let Ge=new e.MeshStandardMaterial({color:g.colors[V],roughness:.74}),Ae=o([g.center[0]-150-V*18,g.center[1]-155-V*17],1.7+V*.28),bt=o([g.center[0]+(V-1)*52,g.center[1]+135+V*10],.9+V*.18),nt=g.cableRoutes?.[V]?ed(e,g.cableRoutes[V],o,W,ie,g.cableHeights[V]):new e.CatmullRomCurve3([W,$,bt,Ae,o([N(F[V]),815+V*24],1.8+V*.28),ie.clone().setY(1.1+V*.28),ie],!1,"centripetal"),it=new e.Group;n.add(it);let Q=i(new e.TubeGeometry(nt,96,.095,8,!1),Ge,new e.Vector3,it);Q.userData={id:t.id},d.push(Q);let le=r(.3,.46,.3,ie.clone().setY(.23),D,it),Se=i(new e.SphereGeometry(.17,12,8),new e.MeshBasicMaterial({color:15054145}),W.clone(),it);if(Se.visible=!1,H.push({group:it,wire:Q,curve:nt,plug:le,tip:Se,point:new e.Vector3,normal:new e.Vector3,terminal:V,progress:1}),_){let Ue=c((y?["+5","COM","GND"]:["NC","COM","NA"])[V],W.clone().add(new e.Vector3(0,-.87,1.05)),1.45,1.8,{background:"#edf1ed",color:V===0?"#b64143":"#364e49",size:54});n.add(Ue)}return{hole:F[V],terminal:B,worldTerminal:W.toArray(),function:g.functions[V]}});function N(B){return s.point(B)[0]}if(_){let B=c(t.value+" \xB7 "+g.model.toUpperCase(),m.clone().add(new e.Vector3(0,.065,-3.15)),10,3.1,{background:"#edf1ed",color:t.value==="STOP"?"#a64445":"#345a4a",size:45});n.add(B);let V=c(y?"DESLIZABLE \xB7 MANTENIDO":"PALANCA \xB7 FIN DE CARRERA",m.clone().add(new e.Vector3(0,.065,7.2)),10,2.8,{background:"#edf1ed",color:"#587363",size:37});n.add(V)}return td(I,!1),{id:t.partId,model:g.model,center:g.center,bounds:g.bounds,connections:X,actuator:I,cables:H,wiringStage:t.wiringStage??t.stage}}function td(s,e){let t=s.userData;t.externalControl==="scmm-122"?s.position.x=t.homeX+(e?.72:-.72):t.externalControl==="ss0501a"&&(s.rotation.z=e?.012:.16,t.plunger.position.y=t.plungerY-(e?.19:0)),t.actuated=!!e}function dp(s,e){e=Math.max(0,Math.min(1,e));let t=s.wire.geometry,n=t.parameters.tubularSegments,i=t.parameters.radialSegments,r=t.getAttribute("position"),a=t.getAttribute("normal");if(s.reveal?.ring>=0){let o=s.reveal.ring;for(let l=0;l<=i;l++){let c=(o*(i+1)+l)*3;r.setXYZ(o*(i+1)+l,...s.reveal.position.subarray(c,c+3)),a.setXYZ(o*(i+1)+l,...s.reveal.normal.subarray(c,c+3))}s.reveal.ring=-1,r.needsUpdate=a.needsUpdate=!0}if(e>0&&e<1){s.reveal||={position:new Float32Array(r.array),normal:new Float32Array(a.array),ring:-1};let o=e*n,l=Math.floor(o),c=o-l,h=Math.min(n,l+1);s.curve.getPointAt(e,s.point);for(let d=0;d<=i;d++){let u=(l*(i+1)+d)*3,f=(h*(i+1)+d)*3;s.normal.set(s.reveal.normal[u]+(s.reveal.normal[f]-s.reveal.normal[u])*c,s.reveal.normal[u+1]+(s.reveal.normal[f+1]-s.reveal.normal[u+1])*c,s.reveal.normal[u+2]+(s.reveal.normal[f+2]-s.reveal.normal[u+2])*c).normalize(),r.setXYZ(h*(i+1)+d,s.point.x+t.parameters.radius*s.normal.x,s.point.y+t.parameters.radius*s.normal.y,s.point.z+t.parameters.radius*s.normal.z),a.setXYZ(h*(i+1)+d,s.normal.x,s.normal.y,s.normal.z)}s.reveal.ring=h,r.needsUpdate=a.needsUpdate=!0}t.setDrawRange(0,Math.ceil(e*n)*i*6),s.tip.visible=e>0&&e<1,s.tip.visible&&s.tip.position.copy(s.point),s.plug.visible=e>=1,s.progress=e}var pc={};x0(pc,{ACESFilmicToneMapping:()=>Ia,AddEquation:()=>ws,AddOperation:()=>vf,AdditiveAnimationBlendMode:()=>Ou,AdditiveBlending:()=>Ca,AgXToneMapping:()=>Ru,AlphaFormat:()=>Nu,AlwaysCompare:()=>Df,AlwaysDepth:()=>_o,AlwaysStencilFunc:()=>Af,AmbientLight:()=>cl,AnimationAction:()=>yl,AnimationClip:()=>Ss,AnimationLoader:()=>Oh,AnimationMixer:()=>Kh,AnimationObjectGroup:()=>Jh,AnimationUtils:()=>Fh,ArcCurve:()=>Bo,ArrayCamera:()=>ml,ArrowHelper:()=>mu,AttachedBindMode:()=>gh,Audio:()=>_l,AudioAnalyser:()=>Zh,AudioContext:()=>Ea,AudioListener:()=>Yh,AudioLoader:()=>Wh,AxesHelper:()=>gu,BackSide:()=>bn,BasicDepthPacking:()=>wf,BasicShadowMap:()=>wm,BatchedMesh:()=>Io,BezierInterpolant:()=>rl,Bone:()=>sa,BooleanKeyframeTrack:()=>wi,Box2:()=>vl,Box3:()=>kt,Box3Helper:()=>fu,BoxGeometry:()=>Bn,BoxHelper:()=>du,BufferAttribute:()=>Ft,BufferGeometry:()=>pt,BufferGeometryLoader:()=>fl,ByteType:()=>Iu,Cache:()=>ai,Camera:()=>cr,CameraHelper:()=>uu,CanvasTexture:()=>aa,CapsuleGeometry:()=>Fo,CatmullRomCurve3:()=>hi,CineonToneMapping:()=>Tu,CircleGeometry:()=>Yi,ClampToEdgeWrapping:()=>Rn,Clock:()=>tu,Color:()=>Be,ColorKeyframeTrack:()=>ya,ColorManagement:()=>Mt,Compatibility:()=>fg,CompressedArrayTexture:()=>Lh,CompressedCubeTexture:()=>Dh,CompressedTexture:()=>js,CompressedTextureLoader:()=>Bh,ConeGeometry:()=>la,ConstantAlphaFactor:()=>_f,ConstantColorFactor:()=>mf,Controls:()=>Aa,CubeCamera:()=>pl,CubeDepthTexture:()=>No,CubeReflectionMapping:()=>_i,CubeRefractionMapping:()=>Qi,CubeTexture:()=>gs,CubeTextureLoader:()=>zh,CubeUVReflectionMapping:()=>pr,CubicBezierCurve:()=>ca,CubicBezierCurve3:()=>zo,CubicInterpolant:()=>il,CullFaceBack:()=>yu,CullFaceFront:()=>jd,CullFaceFrontBack:()=>Em,CullFaceNone:()=>$d,Curve:()=>zn,CurvePath:()=>tr,CustomBlending:()=>ef,CustomToneMapping:()=>Au,CylinderGeometry:()=>Vt,Cylindrical:()=>nu,Data3DTexture:()=>Xs,DataArrayTexture:()=>Ws,DataTexture:()=>Cn,DataTextureLoader:()=>Vh,DataUtils:()=>Sh,DecrementStencilOp:()=>Wm,DecrementWrapStencilOp:()=>Ym,DefaultLoadingManager:()=>Bf,DepthFormat:()=>oi,DepthStencilFormat:()=>es,DepthTexture:()=>Xi,DetachedBindMode:()=>Sf,DirectionalLight:()=>Es,DirectionalLightHelper:()=>hu,DiscreteInterpolant:()=>sl,DodecahedronGeometry:()=>Oo,DoubleSide:()=>Wn,DstAlphaFactor:()=>hf,DstColorFactor:()=>df,DynamicCopyUsage:()=>og,DynamicDrawUsage:()=>tg,DynamicReadUsage:()=>sg,EdgesGeometry:()=>Qs,EllipseCurve:()=>er,EqualCompare:()=>Pf,EqualDepth:()=>yo,EqualStencilFunc:()=>Km,EquirectangularReflectionMapping:()=>La,EquirectangularRefractionMapping:()=>Da,Euler:()=>Kn,EventDispatcher:()=>On,ExternalTexture:()=>oa,ExtrudeGeometry:()=>Go,FileLoader:()=>$n,Float16BufferAttribute:()=>Ah,Float32BufferAttribute:()=>ze,FloatType:()=>vn,Fog:()=>To,FogExp2:()=>wo,FramebufferTexture:()=>Ih,FrontSide:()=>ji,Frustum:()=>Ei,FrustumArray:()=>Po,GLBufferAttribute:()=>eu,GLSL1:()=>cg,GLSL3:()=>Bu,GreaterCompare:()=>If,GreaterDepth:()=>So,GreaterEqualCompare:()=>ac,GreaterEqualDepth:()=>vo,GreaterEqualStencilFunc:()=>eg,GreaterStencilFunc:()=>jm,GridHelper:()=>lu,Group:()=>sn,HTMLTexture:()=>Uh,HalfFloatType:()=>Qn,HemisphereLight:()=>or,HemisphereLightHelper:()=>ou,IcosahedronGeometry:()=>Wo,ImageBitmapLoader:()=>Gh,ImageLoader:()=>Ms,ImageUtils:()=>Eo,IncrementStencilOp:()=>Gm,IncrementWrapStencilOp:()=>Xm,InstancedBufferAttribute:()=>Wi,InstancedBufferGeometry:()=>hr,InstancedInterleavedBuffer:()=>Ji,InstancedMesh:()=>$s,Int16BufferAttribute:()=>wh,Int32BufferAttribute:()=>Th,Int8BufferAttribute:()=>Mh,IntType:()=>Ml,InterleavedBuffer:()=>Js,InterleavedBufferAttribute:()=>Mn,Interpolant:()=>Zi,InterpolateBezier:()=>_h,InterpolateDiscrete:()=>Jr,InterpolateLinear:()=>bo,InterpolateSmooth:()=>co,InterpolationSamplingMode:()=>dg,InterpolationSamplingType:()=>ug,InvertStencilOp:()=>qm,KeepStencilOp:()=>ho,KeyframeTrack:()=>In,LOD:()=>Ao,LatheGeometry:()=>Xo,Layers:()=>Ys,LessCompare:()=>Cf,LessDepth:()=>xo,LessEqualCompare:()=>rc,LessEqualDepth:()=>Hs,LessEqualStencilFunc:()=>$m,LessStencilFunc:()=>Jm,Light:()=>mi,LightProbe:()=>ul,LightShadow:()=>lr,Line:()=>ci,Line3:()=>Ta,LineBasicMaterial:()=>nn,LineCurve:()=>ha,LineCurve3:()=>_s,LineDashedMaterial:()=>nl,LineLoop:()=>Lo,LineSegments:()=>Pn,LinearFilter:()=>zt,LinearInterpolant:()=>xa,LinearMipMapLinearFilter:()=>Pm,LinearMipMapNearestFilter:()=>Cm,LinearMipmapLinearFilter:()=>xi,LinearMipmapNearestFilter:()=>Ua,LinearSRGBColorSpace:()=>$r,LinearToneMapping:()=>Eu,LinearTransfer:()=>jr,Loader:()=>fn,LoaderUtils:()=>ba,LoadingManager:()=>Sa,LoopOnce:()=>Mf,LoopPingPong:()=>Ef,LoopRepeat:()=>bf,MOUSE:()=>Ki,Material:()=>tn,MaterialBlending:()=>Tm,MaterialLoader:()=>dl,MathUtils:()=>Yn,Matrix2:()=>iu,Matrix3:()=>ft,Matrix4:()=>ht,MaxEquation:()=>rf,Mesh:()=>Bt,MeshBasicMaterial:()=>Gt,MeshDepthMaterial:()=>ga,MeshDistanceMaterial:()=>_a,MeshLambertMaterial:()=>el,MeshMatcapMaterial:()=>tl,MeshNormalMaterial:()=>Qo,MeshPhongMaterial:()=>$o,MeshPhysicalMaterial:()=>sr,MeshStandardMaterial:()=>Et,MeshToonMaterial:()=>jo,MinEquation:()=>sf,MirroredRepeatWrapping:()=>Zr,MixOperation:()=>yf,MultiplyBlending:()=>Su,MultiplyOperation:()=>Pa,NearestFilter:()=>Jt,NearestMipMapLinearFilter:()=>Rm,NearestMipMapNearestFilter:()=>Am,NearestMipmapLinearFilter:()=>mr,NearestMipmapNearestFilter:()=>Pu,NeutralToneMapping:()=>Cu,NeverCompare:()=>Rf,NeverDepth:()=>go,NeverStencilFunc:()=>Zm,NoBlending:()=>gi,NoColorSpace:()=>Ri,NoNormalPacking:()=>Bm,NoToneMapping:()=>jn,NormalAnimationBlendMode:()=>sc,NormalBlending:()=>fr,NormalGAPacking:()=>Vm,NormalRGPacking:()=>zm,NotEqualCompare:()=>Lf,NotEqualDepth:()=>Mo,NotEqualStencilFunc:()=>Qm,NumberKeyframeTrack:()=>rr,Object3D:()=>Ct,ObjectLoader:()=>Hh,ObjectSpaceNormalMap:()=>Tf,OctahedronGeometry:()=>pa,OneFactor:()=>of,OneMinusConstantAlphaFactor:()=>xf,OneMinusConstantColorFactor:()=>gf,OneMinusDstAlphaFactor:()=>uf,OneMinusDstColorFactor:()=>ff,OneMinusSrcAlphaFactor:()=>bu,OneMinusSrcColorFactor:()=>cf,OrthographicCamera:()=>bs,PCFShadowMap:()=>Ra,PCFSoftShadowMap:()=>Qd,PMREMGenerator:()=>uc,Path:()=>ys,PerspectiveCamera:()=>Zt,Plane:()=>Nn,PlaneGeometry:()=>ui,PlaneHelper:()=>pu,PointLight:()=>ll,PointLightHelper:()=>au,Points:()=>Do,PointsMaterial:()=>ra,PolarGridHelper:()=>cu,PolyhedronGeometry:()=>qi,PositionalAudio:()=>qh,PropertyBinding:()=>Nt,PropertyMixer:()=>xl,QuadraticBezierCurve:()=>ua,QuadraticBezierCurve3:()=>xs,Quaternion:()=>jt,QuaternionKeyframeTrack:()=>ar,QuaternionLinearInterpolant:()=>al,R11_EAC_Format:()=>Nl,RED_GREEN_RGTC2_Format:()=>ka,RED_RGTC1_Format:()=>tc,REVISION:()=>Kd,RG11_EAC_Format:()=>Va,RGBADepthPacking:()=>Nm,RGBAFormat:()=>Sn,RGBAIntegerFormat:()=>Al,RGBA_ASTC_10x10_Format:()=>Jl,RGBA_ASTC_10x5_Format:()=>Yl,RGBA_ASTC_10x6_Format:()=>ql,RGBA_ASTC_10x8_Format:()=>Zl,RGBA_ASTC_12x10_Format:()=>Kl,RGBA_ASTC_12x12_Format:()=>$l,RGBA_ASTC_4x4_Format:()=>Bl,RGBA_ASTC_5x4_Format:()=>zl,RGBA_ASTC_5x5_Format:()=>Vl,RGBA_ASTC_6x5_Format:()=>kl,RGBA_ASTC_6x6_Format:()=>Hl,RGBA_ASTC_8x5_Format:()=>Gl,RGBA_ASTC_8x6_Format:()=>Wl,RGBA_ASTC_8x8_Format:()=>Xl,RGBA_BPTC_Format:()=>jl,RGBA_ETC2_EAC_Format:()=>Ul,RGBA_PVRTC_2BPPV1_Format:()=>Il,RGBA_PVRTC_4BPPV1_Format:()=>Pl,RGBA_S3TC_DXT1_Format:()=>Oa,RGBA_S3TC_DXT3_Format:()=>Ba,RGBA_S3TC_DXT5_Format:()=>za,RGBDepthPacking:()=>Fm,RGBFormat:()=>Fu,RGBIntegerFormat:()=>Im,RGB_BPTC_SIGNED_Format:()=>Ql,RGB_BPTC_UNSIGNED_Format:()=>ec,RGB_ETC1_Format:()=>Ll,RGB_ETC2_Format:()=>Dl,RGB_PVRTC_2BPPV1_Format:()=>Cl,RGB_PVRTC_4BPPV1_Format:()=>Rl,RGB_S3TC_DXT1_Format:()=>Fa,RGDepthPacking:()=>Om,RGFormat:()=>ts,RGIntegerFormat:()=>Tl,RawShaderMaterial:()=>ma,Ray:()=>li,Raycaster:()=>wa,RectAreaLight:()=>hl,RedFormat:()=>wl,RedIntegerFormat:()=>Na,ReinhardToneMapping:()=>wu,RenderObjectRefreshType:()=>pg,RenderTarget:()=>ta,RenderTarget3D:()=>$h,RepeatWrapping:()=>qr,ReplaceStencilOp:()=>Hm,ReverseSubtractEquation:()=>nf,RingGeometry:()=>Yo,SIGNED_R11_EAC_Format:()=>Fl,SIGNED_RED_GREEN_RGTC2_Format:()=>ic,SIGNED_RED_RGTC1_Format:()=>nc,SIGNED_RG11_EAC_Format:()=>Ol,SRGBColorSpace:()=>hn,SRGBTransfer:()=>Dt,Scene:()=>Zs,ShaderChunk:()=>yt,ShaderLib:()=>wn,ShaderMaterial:()=>dn,ShadowMaterial:()=>Ko,Shape:()=>vs,ShapeGeometry:()=>qo,ShapePath:()=>_u,ShapeUtils:()=>Jn,ShortType:()=>Lu,Skeleton:()=>Co,SkeletonHelper:()=>ru,SkinnedMesh:()=>Ro,Source:()=>xh,Sphere:()=>Ht,SphereGeometry:()=>di,Spherical:()=>ur,SphericalHarmonics3:()=>Ma,SplineCurve:()=>da,SpotLight:()=>ol,SpotLightHelper:()=>su,Sprite:()=>Ks,SpriteMaterial:()=>ms,SrcAlphaFactor:()=>Mu,SrcAlphaSaturateFactor:()=>pf,SrcColorFactor:()=>lf,StaticCopyUsage:()=>ag,StaticDrawUsage:()=>oc,StaticReadUsage:()=>ig,StereoCamera:()=>Xh,StreamCopyUsage:()=>lg,StreamDrawUsage:()=>ng,StreamReadUsage:()=>rg,StringKeyframeTrack:()=>Ti,SubtractEquation:()=>tf,SubtractiveBlending:()=>vu,TOUCH:()=>$i,TangentSpaceNormalMap:()=>Ai,TetrahedronGeometry:()=>Zo,Texture:()=>Kt,TextureLoader:()=>kh,TextureSource:()=>Zn,TextureUtils:()=>xu,Timer:()=>gl,TimestampQuery:()=>hg,TorusGeometry:()=>fi,TorusKnotGeometry:()=>Jo,Triangle:()=>ri,TriangleFanDrawMode:()=>Um,TriangleStripDrawMode:()=>Dm,TrianglesDrawMode:()=>Lm,TubeGeometry:()=>pi,UVMapping:()=>Sl,Uint16BufferAttribute:()=>na,Uint32BufferAttribute:()=>ia,Uint8BufferAttribute:()=>bh,Uint8ClampedBufferAttribute:()=>Eh,Uniform:()=>jh,UniformsGroup:()=>Qh,UniformsLib:()=>Ce,UniformsUtils:()=>Ha,UnsignedByteType:()=>Ln,UnsignedInt101111Type:()=>Uu,UnsignedInt248Type:()=>_r,UnsignedInt5999Type:()=>Du,UnsignedIntType:()=>Xn,UnsignedShort4444Type:()=>bl,UnsignedShort5551Type:()=>El,UnsignedShortType:()=>gr,VSMShadowMap:()=>dr,Vector2:()=>ae,Vector3:()=>E,Vector4:()=>wt,VectorKeyframeTrack:()=>va,VideoFrameTexture:()=>Ph,VideoTexture:()=>Uo,WebGL3DRenderTarget:()=>vh,WebGLArrayRenderTarget:()=>yh,WebGLCoordinateSystem:()=>Fn,WebGLCubeRenderTarget:()=>dc,WebGLRenderTarget:()=>un,WebGLRenderer:()=>fc,WebGLUtils:()=>s0,WebGPUCoordinateSystem:()=>fs,WebXRController:()=>qs,WireframeGeometry:()=>ir,WrapAroundEnding:()=>Kr,ZeroCurvatureEnding:()=>us,ZeroFactor:()=>af,ZeroSlopeEnding:()=>ds,ZeroStencilOp:()=>km,createCanvasElement:()=>Uf,error:()=>Ke,getConsoleFunction:()=>_g,log:()=>ea,setConsoleFunction:()=>gg,warn:()=>Pe,warnOnce:()=>bi});var Kd="186",Ki={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},$i={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},$d=0,yu=1,jd=2,Em=3,wm=0,Ra=1,Qd=2,dr=3,ji=0,bn=1,Wn=2,gi=0,fr=1,Ca=2,vu=3,Su=4,ef=5,Tm=6,ws=100,tf=101,nf=102,sf=103,rf=104,af=200,of=201,lf=202,cf=203,Mu=204,bu=205,hf=206,uf=207,df=208,ff=209,pf=210,mf=211,gf=212,_f=213,xf=214,go=0,_o=1,xo=2,Hs=3,yo=4,vo=5,So=6,Mo=7,Pa=0,yf=1,vf=2,jn=0,Eu=1,wu=2,Tu=3,Ia=4,Au=5,Ru=6,Cu=7,gh="attached",Sf="detached",Sl=300,_i=301,Qi=302,La=303,Da=304,pr=306,qr=1e3,Rn=1001,Zr=1002,Jt=1003,Pu=1004,Am=1004,mr=1005,Rm=1005,zt=1006,Ua=1007,Cm=1007,xi=1008,Pm=1008,Ln=1009,Iu=1010,Lu=1011,gr=1012,Ml=1013,Xn=1014,vn=1015,Qn=1016,bl=1017,El=1018,_r=1020,Du=35902,Uu=35899,Nu=1021,Fu=1022,Sn=1023,oi=1026,es=1027,wl=1028,Na=1029,ts=1030,Tl=1031,Im=1032,Al=1033,Fa=33776,Oa=33777,Ba=33778,za=33779,Rl=35840,Cl=35841,Pl=35842,Il=35843,Ll=36196,Dl=37492,Ul=37496,Nl=37488,Fl=37489,Va=37490,Ol=37491,Bl=37808,zl=37809,Vl=37810,kl=37811,Hl=37812,Gl=37813,Wl=37814,Xl=37815,Yl=37816,ql=37817,Zl=37818,Jl=37819,Kl=37820,$l=37821,jl=36492,Ql=36494,ec=36495,tc=36283,nc=36284,ka=36285,ic=36286,Mf=2200,bf=2201,Ef=2202,Jr=2300,bo=2301,co=2302,_h=2303,us=2400,ds=2401,Kr=2402,sc=2500,Ou=2501,Lm=0,Dm=1,Um=2,wf=3200,Nm=3201,Fm=3202,Om=3203,Ai=0,Tf=1,Ri="",hn="srgb",$r="srgb-linear",jr="linear",Dt="srgb",Bm="",zm="rg",Vm="ga",km=0,ho=7680,Hm=7681,Gm=7682,Wm=7683,Xm=34055,Ym=34056,qm=5386,Zm=512,Jm=513,Km=514,$m=515,jm=516,Qm=517,eg=518,Af=519,Rf=512,Cf=513,Pf=514,rc=515,If=516,Lf=517,ac=518,Df=519,oc=35044,tg=35048,ng=35040,ig=35045,sg=35049,rg=35041,ag=35046,og=35050,lg=35042,cg="100",Bu="300 es",Fn=2e3,fs=2001,hg={COMPUTE:"compute",RENDER:"render"},ug={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},dg={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},fg={TEXTURE_COMPARE:"depthTextureCompare"},pg={NONE:0,SHARED:1,FULL:2};function y0(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}var v0={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function Xr(s,e){return new v0[s](e)}function mg(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Qr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Uf(){let s=Qr("canvas");return s.style.display="block",s}var fp={},ps=null;function gg(s){ps=s}function _g(){return ps}function ea(...s){let e="THREE."+s.shift();ps?ps("log",e,...s):console.log(e,...s)}function xg(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Pe(...s){s=xg(s);let e="THREE."+s.shift();if(ps)ps("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Ke(...s){s=xg(s);let e="THREE."+s.shift();if(ps)ps("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function bi(...s){let e=s.join(" ");e in fp||(fp[e]=!0,Pe(...s))}function yg(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var vg={[go]:_o,[xo]:So,[yo]:Mo,[Hs]:vo,[_o]:go,[So]:xo,[Mo]:yo,[vo]:Hs},On=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},_n=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],pp=1234567,ks=Math.PI/180,Gs=180/Math.PI;function Gn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(_n[s&255]+_n[s>>8&255]+_n[s>>16&255]+_n[s>>24&255]+"-"+_n[e&255]+_n[e>>8&255]+"-"+_n[e>>16&15|64]+_n[e>>24&255]+"-"+_n[t&63|128]+_n[t>>8&255]+"-"+_n[t>>16&255]+_n[t>>24&255]+_n[n&255]+_n[n>>8&255]+_n[n>>16&255]+_n[n>>24&255]).toLowerCase()}function ut(s,e,t){return Math.max(e,Math.min(t,s))}function Nf(s,e){return(s%e+e)%e}function S0(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function M0(s,e,t){return s!==e?(t-s)/(e-s):0}function uo(s,e,t){return(1-t)*s+t*e}function b0(s,e,t,n){return uo(s,e,1-Math.exp(-t*n))}function E0(s,e=1){return e-Math.abs(Nf(s,e*2)-e)}function w0(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function T0(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function A0(s,e){return s+Math.floor(Math.random()*(e-s+1))}function R0(s,e){return s+Math.random()*(e-s)}function C0(s){return s*(.5-Math.random())}function P0(s){s!==void 0&&(pp=s);let e=pp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function I0(s){return s*ks}function L0(s){return s*Gs}function D0(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function U0(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function N0(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function F0(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),u=a((e-n)/2),f=r((n-e)/2),p=a((n-e)/2);switch(i){case"XYX":s.set(o*h,l*d,l*u,o*c);break;case"YZY":s.set(l*u,o*h,l*d,o*c);break;case"ZXZ":s.set(l*d,l*u,o*h,o*c);break;case"XZX":s.set(o*h,l*p,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*p,o*c);break;case"ZYZ":s.set(l*p,l*f,o*h,o*c);break;default:Pe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function An(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function gt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Yn={DEG2RAD:ks,RAD2DEG:Gs,generateUUID:Gn,clamp:ut,euclideanModulo:Nf,mapLinear:S0,inverseLerp:M0,lerp:uo,damp:b0,pingpong:E0,smoothstep:w0,smootherstep:T0,randInt:A0,randFloat:R0,randFloatSpread:C0,seededRandom:P0,degToRad:I0,radToDeg:L0,isPowerOfTwo:D0,ceilPowerOfTwo:U0,floorPowerOfTwo:N0,setQuaternionFromProperEuler:F0,normalize:gt,denormalize:An},ae=class s{static{s.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},jt=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],u=r[a+0],f=r[a+1],p=r[a+2],_=r[a+3];if(d!==_||l!==u||c!==f||h!==p){let g=l*u+c*f+h*p+d*_;g<0&&(u=-u,f=-f,p=-p,_=-_,g=-g);let m=1-o;if(g<.9995){let y=Math.acos(g),b=Math.sin(y);m=Math.sin(m*y)/b,o=Math.sin(o*y)/b,l=l*m+u*o,c=c*m+f*o,h=h*m+p*o,d=d*m+_*o}else{l=l*m+u*o,c=c*m+f*o,h=h*m+p*o,d=d*m+_*o;let y=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=y,c*=y,h*=y,d*=y}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[a],u=r[a+1],f=r[a+2],p=r[a+3];return e[t]=o*p+h*d+l*f-c*u,e[t+1]=l*p+h*u+c*d-o*f,e[t+2]=c*p+h*f+o*u-l*d,e[t+3]=h*p-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),d=o(r/2),u=l(n/2),f=l(i/2),p=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ut(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},E=class s{static{s.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(mp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(mp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-r*i),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=i+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return nd.copy(this).projectOnVector(e),this.sub(nd)}reflect(e){return this.sub(nd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},nd=new E,mp=new jt,ft=class s{static{s.prototype.isMatrix3=!0}constructor(e,t,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],_=i[0],g=i[3],m=i[6],y=i[1],b=i[4],x=i[7],A=i[2],T=i[5],D=i[8];return r[0]=a*_+o*y+l*A,r[3]=a*g+o*b+l*T,r[6]=a*m+o*x+l*D,r[1]=c*_+h*y+d*A,r[4]=c*g+h*b+d*T,r[7]=c*m+h*x+d*D,r[2]=u*_+f*y+p*A,r[5]=u*g+f*b+p*T,r[8]=u*m+f*x+p*D,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,p=t*d+n*u+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return e[0]=d*_,e[1]=(i*c-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=u*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return bi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(id.makeScale(e,t)),this}rotate(e){return bi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(id.makeRotation(-e)),this}translate(e,t){return bi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(id.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},id=new ft,gp=new ft().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_p=new ft().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function O0(){let s={enabled:!0,workingColorSpace:$r,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Dt&&(i.r=Gi(i.r),i.g=Gi(i.g),i.b=Gi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Dt&&(i.r=Yr(i.r),i.g=Yr(i.g),i.b=Yr(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ri?jr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return bi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return bi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[$r]:{primaries:e,whitePoint:n,transfer:jr,toXYZ:gp,fromXYZ:_p,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:e,whitePoint:n,transfer:Dt,toXYZ:gp,fromXYZ:_p,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),s}var Mt=O0();function Gi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Yr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var wr,Eo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{wr===void 0&&(wr=Qr("canvas")),wr.width=e.width,wr.height=e.height;let i=wr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=wr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Qr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Gi(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Gi(t[n]/255)*255):t[n]=Gi(t[n]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},B0=0,Zn=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:B0++}),this.uuid=Gn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(sd(i[a].image)):r.push(sd(i[a]))}else r=sd(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function sd(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Eo.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}var xh=class extends Zn{constructor(e=null){bi('Source: "Source" has been renamed to "TextureSource". Please update your code to use "THREE.TextureSource" instead.'),super(e),this.isSource=!0}},z0=0,rd=new E,Kt=class s extends On{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Rn,i=Rn,r=zt,a=xi,o=Sn,l=Ln,c=s.DEFAULT_ANISOTROPY,h=Ri){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:z0++}),this.uuid=Gn(),this.name="",this.source=new Zn(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ae(0,0),this.repeat=new ae(1,1),this.center=new ae(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(rd).x}get height(){return this.source.getSize(rd).y}get depth(){return this.source.getSize(rd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Sl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qr:e.x=e.x-Math.floor(e.x);break;case Rn:e.x=e.x<0?0:1;break;case Zr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qr:e.y=e.y-Math.floor(e.y);break;case Rn:e.y=e.y<0?0:1;break;case Zr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Kt.DEFAULT_IMAGE=null;Kt.DEFAULT_MAPPING=Sl;Kt.DEFAULT_ANISOTROPY=1;var wt=class s{static{s.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(c+1)/2,x=(f+1)/2,A=(m+1)/2,T=(h+u)/4,D=(d+_)/4,v=(p+g)/4;return b>x&&b>A?b<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(b),i=T/n,r=D/n):x>A?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=T/i,r=v/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=D/r,i=v/r),this.set(n,i,r,t),this}let y=Math.sqrt((g-p)*(g-p)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(g-p)/y,this.y=(d-_)/y,this.z=(u-h)/y,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this.w=ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this.w=ut(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},ta=class extends On{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:zt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new wt(0,0,e,t),this.scissorTest=!1,this.viewport=new wt(0,0,e,t),this.textures=[];let i={width:e,height:t,depth:n.depth},r=new Kt(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new Zn(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},un=class extends ta{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Ws=class extends Kt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},yh=class extends un{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Ws(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},Xs=class extends Kt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},vh=class extends un{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Xs(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},ht=class s{static{s.prototype.isMatrix4=!0}constructor(e,t,n,i,r,a,o,l,c,h,d,u,f,p,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,h,d,u,f,p,_,g)}set(e,t,n,i,r,a,o,l,c,h,d,u,f,p,_,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/Tr.setFromMatrixColumn(e,0).length(),r=1/Tr.setFromMatrixColumn(e,1).length(),a=1/Tr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=a*h,f=a*d,p=o*h,_=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+p*c,t[5]=u-_*c,t[9]=-o*l,t[2]=_-u*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,p=c*h,_=c*d;t[0]=u+_*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=_+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,p=c*h,_=c*d;t[0]=u-_*o,t[4]=-a*d,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=_-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,f=a*d,p=o*h,_=o*d;t[0]=l*h,t[4]=p*c-f,t[8]=u*c+_,t[1]=l*d,t[5]=_*c+u,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*h,t[4]=_-u*d,t[8]=p*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+p,t[10]=u-_*d}else if(e.order==="XZY"){let u=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+_,t[5]=a*h,t[9]=f*d-p,t[2]=p*d-f,t[6]=o*h,t[10]=_*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(V0,e,k0)}lookAt(e,t,n){let i=this.elements;return kn.subVectors(e,t),kn.lengthSq()===0&&(kn.z=1),kn.normalize(),rs.crossVectors(n,kn),rs.lengthSq()===0&&(Math.abs(n.z)===1?kn.x+=1e-4:kn.z+=1e-4,kn.normalize(),rs.crossVectors(n,kn)),rs.normalize(),Ac.crossVectors(kn,rs),i[0]=rs.x,i[4]=Ac.x,i[8]=kn.x,i[1]=rs.y,i[5]=Ac.y,i[9]=kn.y,i[2]=rs.z,i[6]=Ac.z,i[10]=kn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],y=n[3],b=n[7],x=n[11],A=n[15],T=i[0],D=i[4],v=i[8],R=i[12],I=i[1],F=i[5],H=i[9],X=i[13],N=i[2],B=i[6],V=i[10],W=i[14],ie=i[3],Y=i[7],$=i[11],se=i[15];return r[0]=a*T+o*I+l*N+c*ie,r[4]=a*D+o*F+l*B+c*Y,r[8]=a*v+o*H+l*V+c*$,r[12]=a*R+o*X+l*W+c*se,r[1]=h*T+d*I+u*N+f*ie,r[5]=h*D+d*F+u*B+f*Y,r[9]=h*v+d*H+u*V+f*$,r[13]=h*R+d*X+u*W+f*se,r[2]=p*T+_*I+g*N+m*ie,r[6]=p*D+_*F+g*B+m*Y,r[10]=p*v+_*H+g*V+m*$,r[14]=p*R+_*X+g*W+m*se,r[3]=y*T+b*I+x*N+A*ie,r[7]=y*D+b*F+x*B+A*Y,r[11]=y*v+b*H+x*V+A*$,r[15]=y*R+b*X+x*W+A*se,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15],y=l*f-c*u,b=o*f-c*d,x=o*u-l*d,A=a*f-c*h,T=a*u-l*h,D=a*d-o*h;return t*(_*y-g*b+m*x)-n*(p*y-g*A+m*T)+i*(p*b-_*A+m*D)-r*(p*x-_*T+g*D)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],y=t*o-n*a,b=t*l-i*a,x=t*c-r*a,A=n*l-i*o,T=n*c-r*o,D=i*c-r*l,v=h*_-d*p,R=h*g-u*p,I=h*m-f*p,F=d*g-u*_,H=d*m-f*_,X=u*m-f*g,N=y*X-b*H+x*F+A*I-T*R+D*v;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let B=1/N;return e[0]=(o*X-l*H+c*F)*B,e[1]=(i*H-n*X-r*F)*B,e[2]=(_*D-g*T+m*A)*B,e[3]=(u*T-d*D-f*A)*B,e[4]=(l*I-a*X-c*R)*B,e[5]=(t*X-i*I+r*R)*B,e[6]=(g*x-p*D-m*b)*B,e[7]=(h*D-u*x+f*b)*B,e[8]=(a*H-o*I+c*v)*B,e[9]=(n*I-t*H-r*v)*B,e[10]=(p*T-_*x+m*y)*B,e[11]=(d*x-h*T-f*y)*B,e[12]=(o*R-a*F-l*v)*B,e[13]=(t*F-n*R+i*v)*B,e[14]=(_*b-p*A-g*y)*B,e[15]=(h*A-d*b+u*y)*B,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,p=r*d,_=a*h,g=a*d,m=o*d,y=l*c,b=l*h,x=l*d,A=n.x,T=n.y,D=n.z;return i[0]=(1-(_+m))*A,i[1]=(f+x)*A,i[2]=(p-b)*A,i[3]=0,i[4]=(f-x)*T,i[5]=(1-(u+m))*T,i[6]=(g+y)*T,i[7]=0,i[8]=(p+b)*D,i[9]=(g-y)*D,i[10]=(1-(u+_))*D,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=Tr.set(i[0],i[1],i[2]).length(),o=Tr.set(i[4],i[5],i[6]).length(),l=Tr.set(i[8],i[9],i[10]).length();r<0&&(a=-a),ti.copy(this);let c=1/a,h=1/o,d=1/l;return ti.elements[0]*=c,ti.elements[1]*=c,ti.elements[2]*=c,ti.elements[4]*=h,ti.elements[5]*=h,ti.elements[6]*=h,ti.elements[8]*=d,ti.elements[9]*=d,ti.elements[10]*=d,t.setFromRotationMatrix(ti),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,r,a,o=Fn,l=!1){let c=this.elements,h=2*r/(t-e),d=2*r/(n-i),u=(t+e)/(t-e),f=(n+i)/(n-i),p,_;if(l)p=r/(a-r),_=a*r/(a-r);else if(o===Fn)p=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===fs)p=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=Fn,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-i),u=-(t+e)/(t-e),f=-(n+i)/(n-i),p,_;if(l)p=1/(a-r),_=a/(a-r);else if(o===Fn)p=-2/(a-r),_=-(a+r)/(a-r);else if(o===fs)p=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Tr=new E,ti=new ht,V0=new E(0,0,0),k0=new E(1,1,1),rs=new E,Ac=new E,kn=new E,xp=new ht,yp=new jt,Kn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ut(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return xp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(xp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return yp.setFromEuler(this),this.setFromQuaternion(yp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Kn.DEFAULT_ORDER="XYZ";var Ys=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},H0=0,vp=new E,Ar=new jt,Fi=new ht,Rc=new E,Ja=new E,G0=new E,W0=new jt,Sp=new E(1,0,0),Mp=new E(0,1,0),bp=new E(0,0,1),Ep={type:"added"},X0={type:"removed"},Rr={type:"childadded",child:null},ad={type:"childremoved",child:null},Ct=class s extends On{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:H0++}),this.uuid=Gn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new E,t=new Kn,n=new jt,i=new E(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ht},normalMatrix:{value:new ft}}),this.matrix=new ht,this.matrixWorld=new ht,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ys,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ar.setFromAxisAngle(e,t),this.quaternion.multiply(Ar),this}rotateOnWorldAxis(e,t){return Ar.setFromAxisAngle(e,t),this.quaternion.premultiply(Ar),this}rotateX(e){return this.rotateOnAxis(Sp,e)}rotateY(e){return this.rotateOnAxis(Mp,e)}rotateZ(e){return this.rotateOnAxis(bp,e)}translateOnAxis(e,t){return vp.copy(e).applyQuaternion(this.quaternion),this.position.add(vp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Sp,e)}translateY(e){return this.translateOnAxis(Mp,e)}translateZ(e){return this.translateOnAxis(bp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Rc.copy(e):Rc.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Ja.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fi.lookAt(Ja,Rc,this.up):Fi.lookAt(Rc,Ja,this.up),this.quaternion.setFromRotationMatrix(Fi),i&&(Fi.extractRotation(i.matrixWorld),Ar.setFromRotationMatrix(Fi),this.quaternion.premultiply(Ar.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ke("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ep),Rr.child=e,this.dispatchEvent(Rr),Rr.child=null):Ke("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(X0),ad.child=e,this.dispatchEvent(ad),ad.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ep),Rr.child=e,this.dispatchEvent(Rr),Rr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ja,e,G0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ja,W0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ct.DEFAULT_UP=new E(0,1,0);Ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var sn=class extends Ct{constructor(){super(),this.isGroup=!0,this.type="Group"}},Y0={type:"move"},qs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new sn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new sn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new sn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Y0)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new sn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Sg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},as={h:0,s:0,l:0},Cc={h:0,s:0,l:0};function od(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Be=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=hn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Mt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Mt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Mt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Mt.workingColorSpace){if(e=Nf(e,1),t=ut(t,0,1),n=ut(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=od(a,r,e+1/3),this.g=od(a,r,e),this.b=od(a,r,e-1/3)}return Mt.colorSpaceToWorking(this,i),this}setStyle(e,t=hn){function n(r){r!==void 0&&parseFloat(r)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=hn){let n=Sg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gi(e.r),this.g=Gi(e.g),this.b=Gi(e.b),this}copyLinearToSRGB(e){return this.r=Yr(e.r),this.g=Yr(e.g),this.b=Yr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=hn){return Mt.workingToColorSpace(xn.copy(this),e),Math.round(ut(xn.r*255,0,255))*65536+Math.round(ut(xn.g*255,0,255))*256+Math.round(ut(xn.b*255,0,255))}getHexString(e=hn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Mt.workingColorSpace){Mt.workingToColorSpace(xn.copy(this),t);let n=xn.r,i=xn.g,r=xn.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Mt.workingColorSpace){return Mt.workingToColorSpace(xn.copy(this),t),e.r=xn.r,e.g=xn.g,e.b=xn.b,e}getStyle(e=hn){Mt.workingToColorSpace(xn.copy(this),e);let t=xn.r,n=xn.g,i=xn.b;return e!==hn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(as),this.setHSL(as.h+e,as.s+t,as.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(as),e.getHSL(Cc);let n=uo(as.h,Cc.h,t),i=uo(as.s,Cc.s,t),r=uo(as.l,Cc.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},xn=new Be;Be.NAMES=Sg;var wo=class s{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Be(e),this.density=t}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}},To=class s{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Be(e),this.near=t,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Zs=class extends Ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Kn,this.environmentIntensity=1,this.environmentRotation=new Kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ni=new E,Oi=new E,ld=new E,Bi=new E,Cr=new E,Pr=new E,wp=new E,cd=new E,hd=new E,ud=new E,dd=new wt,fd=new wt,pd=new wt,ri=class s{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ni.subVectors(e,t),i.cross(ni);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){ni.subVectors(i,t),Oi.subVectors(n,t),ld.subVectors(e,t);let a=ni.dot(ni),o=ni.dot(Oi),l=ni.dot(ld),c=Oi.dot(Oi),h=Oi.dot(ld),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,p=(a*h-o*l)*u;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Bi)===null?!1:Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,Bi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Bi.x),l.addScaledVector(a,Bi.y),l.addScaledVector(o,Bi.z),l)}static getInterpolatedAttribute(e,t,n,i,r,a){return dd.setScalar(0),fd.setScalar(0),pd.setScalar(0),dd.fromBufferAttribute(e,t),fd.fromBufferAttribute(e,n),pd.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(dd,r.x),a.addScaledVector(fd,r.y),a.addScaledVector(pd,r.z),a}static isFrontFacing(e,t,n,i){return ni.subVectors(n,t),Oi.subVectors(e,t),ni.cross(Oi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ni.subVectors(this.c,this.b),Oi.subVectors(this.a,this.b),ni.cross(Oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;Cr.subVectors(i,n),Pr.subVectors(r,n),cd.subVectors(e,n);let l=Cr.dot(cd),c=Pr.dot(cd);if(l<=0&&c<=0)return t.copy(n);hd.subVectors(e,i);let h=Cr.dot(hd),d=Pr.dot(hd);if(h>=0&&d<=h)return t.copy(i);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Cr,a);ud.subVectors(e,r);let f=Cr.dot(ud),p=Pr.dot(ud);if(p>=0&&f<=p)return t.copy(r);let _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Pr,o);let g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return wp.subVectors(r,i),o=(d-h)/(d-h+(f-p)),t.copy(i).addScaledVector(wp,o);let m=1/(g+_+u);return a=_*m,o=u*m,t.copy(n).addScaledVector(Cr,a).addScaledVector(Pr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},kt=class{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ii.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ii.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=ii.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,ii):ii.fromBufferAttribute(r,a),ii.applyMatrix4(e.matrixWorld),this.expandByPoint(ii);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Pc.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Pc.copy(n.boundingBox)),Pc.applyMatrix4(e.matrixWorld),this.union(Pc)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ii),ii.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ka),Ic.subVectors(this.max,Ka),Ir.subVectors(e.a,Ka),Lr.subVectors(e.b,Ka),Dr.subVectors(e.c,Ka),os.subVectors(Lr,Ir),ls.subVectors(Dr,Lr),Cs.subVectors(Ir,Dr);let t=[0,-os.z,os.y,0,-ls.z,ls.y,0,-Cs.z,Cs.y,os.z,0,-os.x,ls.z,0,-ls.x,Cs.z,0,-Cs.x,-os.y,os.x,0,-ls.y,ls.x,0,-Cs.y,Cs.x,0];return!md(t,Ir,Lr,Dr,Ic)||(t=[1,0,0,0,1,0,0,0,1],!md(t,Ir,Lr,Dr,Ic))?!1:(Lc.crossVectors(os,ls),t=[Lc.x,Lc.y,Lc.z],md(t,Ir,Lr,Dr,Ic))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ii).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ii).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(zi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),zi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),zi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),zi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),zi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),zi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),zi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),zi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(zi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},zi=[new E,new E,new E,new E,new E,new E,new E,new E],ii=new E,Pc=new kt,Ir=new E,Lr=new E,Dr=new E,os=new E,ls=new E,Cs=new E,Ka=new E,Ic=new E,Lc=new E,Ps=new E;function md(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Ps.fromArray(s,r);let o=i.x*Math.abs(Ps.x)+i.y*Math.abs(Ps.y)+i.z*Math.abs(Ps.z),l=e.dot(Ps),c=t.dot(Ps),h=n.dot(Ps);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Hi=q0();function q0(){let s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}let r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:a,offsetTable:o}}function Un(s){Math.abs(s)>65504&&Pe("DataUtils.toHalfFloat(): Value out of range."),s=ut(s,-65504,65504),Hi.floatView[0]=s;let e=Hi.uint32View[0],t=e>>23&511;return Hi.baseTable[t]+((e&8388607)>>Hi.shiftTable[t])}function oo(s){let e=s>>10;return Hi.uint32View[0]=Hi.mantissaTable[Hi.offsetTable[e]+(s&1023)]+Hi.exponentTable[e],Hi.floatView[0]}var Sh=class{static toHalfFloat(e){return Un(e)}static fromHalfFloat(e){return oo(e)}},en=new E,Dc=new ae,Z0=0,Ft=class extends On{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Z0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=oc,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Dc.fromBufferAttribute(this,t),Dc.applyMatrix3(e),this.setXY(t,Dc.x,Dc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix3(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyMatrix4(e),this.setXYZ(t,en.x,en.y,en.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.applyNormalMatrix(e),this.setXYZ(t,en.x,en.y,en.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)en.fromBufferAttribute(this,t),en.transformDirection(e),this.setXYZ(t,en.x,en.y,en.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=An(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=gt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=An(t,this.array)),t}setX(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=An(t,this.array)),t}setY(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=An(t,this.array)),t}setZ(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=An(t,this.array)),t}setW(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),i=gt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),i=gt(i,this.array),r=gt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}},Mh=class extends Ft{constructor(e,t,n){super(new Int8Array(e),t,n)}},bh=class extends Ft{constructor(e,t,n){super(new Uint8Array(e),t,n)}},Eh=class extends Ft{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}},wh=class extends Ft{constructor(e,t,n){super(new Int16Array(e),t,n)}},na=class extends Ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Th=class extends Ft{constructor(e,t,n){super(new Int32Array(e),t,n)}},ia=class extends Ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Ah=class extends Ft{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=oo(this.array[e*this.itemSize]);return this.normalized&&(t=An(t,this.array)),t}setX(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize]=Un(t),this}getY(e){let t=oo(this.array[e*this.itemSize+1]);return this.normalized&&(t=An(t,this.array)),t}setY(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+1]=Un(t),this}getZ(e){let t=oo(this.array[e*this.itemSize+2]);return this.normalized&&(t=An(t,this.array)),t}setZ(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+2]=Un(t),this}getW(e){let t=oo(this.array[e*this.itemSize+3]);return this.normalized&&(t=An(t,this.array)),t}setW(e,t){return this.normalized&&(t=gt(t,this.array)),this.array[e*this.itemSize+3]=Un(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array)),this.array[e+0]=Un(t),this.array[e+1]=Un(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),i=gt(i,this.array)),this.array[e+0]=Un(t),this.array[e+1]=Un(n),this.array[e+2]=Un(i),this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),i=gt(i,this.array),r=gt(r,this.array)),this.array[e+0]=Un(t),this.array[e+1]=Un(n),this.array[e+2]=Un(i),this.array[e+3]=Un(r),this}},ze=class extends Ft{constructor(e,t,n){super(new Float32Array(e),t,n)}},J0=new kt,$a=new E,gd=new E,Ht=class{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):J0.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;$a.subVectors(e,this.center);let t=$a.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector($a,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(gd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint($a.copy(e.center).add(gd)),this.expandByPoint($a.copy(e.center).sub(gd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},K0=0,qn=new ht,_d=new Ct,Ur=new E,Hn=new kt,ja=new kt,cn=new E,pt=class s extends On{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:K0++}),this.uuid=Gn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(y0(e)?ia:na)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ft().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return qn.makeRotationFromQuaternion(e),this.applyMatrix4(qn),this}rotateX(e){return qn.makeRotationX(e),this.applyMatrix4(qn),this}rotateY(e){return qn.makeRotationY(e),this.applyMatrix4(qn),this}rotateZ(e){return qn.makeRotationZ(e),this.applyMatrix4(qn),this}translate(e,t,n){return qn.makeTranslation(e,t,n),this.applyMatrix4(qn),this}scale(e,t,n){return qn.makeScale(e,t,n),this.applyMatrix4(qn),this}lookAt(e){return _d.lookAt(e),_d.updateMatrix(),this.applyMatrix4(_d.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ur).negate(),this.translate(Ur.x,Ur.y,Ur.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ze(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];Hn.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Hn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Hn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Hn.min),this.boundingBox.expandByPoint(Hn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ke('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ht);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ke("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(e){let n=this.boundingSphere.center;if(Hn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];ja.setFromBufferAttribute(o),this.morphTargetsRelative?(cn.addVectors(Hn.min,ja.min),Hn.expandByPoint(cn),cn.addVectors(Hn.max,ja.max),Hn.expandByPoint(cn)):(Hn.expandByPoint(ja.min),Hn.expandByPoint(ja.max))}Hn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)cn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(cn));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)cn.fromBufferAttribute(o,c),l&&(Ur.fromBufferAttribute(e,c),cn.add(Ur)),i=Math.max(i,n.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Ke('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ke("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Ft(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new E,l[v]=new E;let c=new E,h=new E,d=new E,u=new ae,f=new ae,p=new ae,_=new E,g=new E;function m(v,R,I){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,R),d.fromBufferAttribute(n,I),u.fromBufferAttribute(r,v),f.fromBufferAttribute(r,R),p.fromBufferAttribute(r,I),h.sub(c),d.sub(c),f.sub(u),p.sub(u);let F=1/(f.x*p.y-p.x*f.y);isFinite(F)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(F),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(F),o[v].add(_),o[R].add(_),o[I].add(_),l[v].add(g),l[R].add(g),l[I].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let v=0,R=y.length;v<R;++v){let I=y[v],F=I.start,H=I.count;for(let X=F,N=F+H;X<N;X+=3)m(e.getX(X+0),e.getX(X+1),e.getX(X+2))}let b=new E,x=new E,A=new E,T=new E;function D(v){A.fromBufferAttribute(i,v),T.copy(A);let R=o[v];b.copy(R),b.sub(A.multiplyScalar(A.dot(R))).normalize(),x.crossVectors(T,R);let F=x.dot(l[v])<0?-1:1;a.setXYZW(v,b.x,b.y,b.z,F)}for(let v=0,R=y.length;v<R;++v){let I=y[v],F=I.start,H=I.count;for(let X=F,N=F+H;X<N;X+=3)D(e.getX(X+0)),D(e.getX(X+1)),D(e.getX(X+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new E,r=new E,a=new E,o=new E,l=new E,c=new E,h=new E,d=new E;if(e)for(let u=0,f=e.count;u<f;u+=3){let p=e.getX(u+0),_=e.getX(u+1),g=e.getX(u+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)cn.fromBufferAttribute(e,t),cn.normalize(),e.setXYZ(t,cn.x,cn.y,cn.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,p=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let m=0;m<h;m++)u[p++]=c[f++]}return new Ft(u,h,d)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Js=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=oc,this.updateRanges=[],this.version=0,this.uuid=Gn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Gn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Tn=new E,Mn=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.applyMatrix4(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.applyNormalMatrix(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.transformDirection(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=An(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=gt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=An(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=An(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=An(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=An(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),i=gt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=gt(t,this.array),n=gt(n,this.array),i=gt(i,this.array),r=gt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){ea("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){ea("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},xd=new E,$0=new E,j0=new ft,Nn=class{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=xd.subVectors(n,t).cross($0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(xd),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||j0.getNormalMatrix(e),i=this.coplanarPoint(xd).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Q0=0,tn=class extends On{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Q0++}),this.uuid=Gn(),this.name="",this.type="Material",this.blending=fr,this.side=ji,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Mu,this.blendDst=bu,this.blendEquation=ws,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=Hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Af,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ho,this.stencilZFail=ho,this.stencilZPass=ho,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Be().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Nn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ae().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ae().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ms=class extends tn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Nr,Qa=new E,Fr=new E,Or=new E,Br=new ae,eo=new ae,Mg=new ht,Uc=new E,to=new E,Nc=new E,Tp=new ae,yd=new ae,Ap=new ae,Ks=class extends Ct{constructor(e=new ms){if(super(),this.isSprite=!0,this.type="Sprite",Nr===void 0){Nr=new pt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Js(t,5);Nr.setIndex([0,1,2,0,2,3]),Nr.setAttribute("position",new Mn(n,3,0,!1)),Nr.setAttribute("uv",new Mn(n,2,3,!1))}this.geometry=Nr,this.material=e,this.center=new ae(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Ke('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Fr.setFromMatrixScale(this.matrixWorld),Mg.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Or.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Fr.multiplyScalar(-Or.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let a=this.center;Fc(Uc.set(-.5,-.5,0),Or,a,Fr,i,r),Fc(to.set(.5,-.5,0),Or,a,Fr,i,r),Fc(Nc.set(.5,.5,0),Or,a,Fr,i,r),Tp.set(0,0),yd.set(1,0),Ap.set(1,1);let o=e.ray.intersectTriangle(Uc,to,Nc,!1,Qa);if(o===null&&(Fc(to.set(-.5,.5,0),Or,a,Fr,i,r),yd.set(0,1),o=e.ray.intersectTriangle(Uc,Nc,to,!1,Qa),o===null))return;let l=e.ray.origin.distanceTo(Qa);l<e.near||l>e.far||t.push({distance:l,point:Qa.clone(),uv:ri.getInterpolation(Qa,Uc,to,Nc,Tp,yd,Ap,new ae),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Fc(s,e,t,n,i,r){Br.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(eo.x=r*Br.x-i*Br.y,eo.y=i*Br.x+r*Br.y):eo.copy(Br),s.copy(e),s.x+=eo.x,s.y+=eo.y,s.applyMatrix4(Mg)}var Oc=new E,Rp=new E,Ao=class extends Ct{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);let t=e.levels;for(let n=0,i=t.length;n<i;n++){let r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);let i=this.levels,r;for(r=0;r<i.length&&!(t<i[r].distance);r++);return i.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){let t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){let i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){let t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){Oc.setFromMatrixPosition(this.matrixWorld);let i=e.ray.origin.distanceTo(Oc);this.getObjectForDistance(i).raycast(e,t)}}update(e){let t=this.levels;if(t.length>1){Oc.setFromMatrixPosition(e.matrixWorld),Rp.setFromMatrixPosition(this.matrixWorld);let n=Oc.distanceTo(Rp)/e.zoom;t[0].object.visible=!0;let i,r;for(i=1,r=t.length;i<r;i++){let a=t[i].distance;if(t[i].object.visible&&(a-=a*t[i].hysteresis),n>=a)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)t[i].object.visible=!1}}toJSON(e){let t=super.toJSON(e);t.object.autoUpdate=this.autoUpdate,t.object.levels=[];let n=this.levels;for(let i=0,r=n.length;i<r;i++){let a=n[i];t.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return t}},Vi=new E,vd=new E,Bc=new E,zc=new E,li=class{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Vi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Vi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Vi.copy(this.origin).addScaledVector(this.direction,t),Vi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){vd.copy(e).add(t).multiplyScalar(.5),Bc.copy(t).sub(e).normalize(),zc.copy(this.origin).sub(vd);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Bc),o=zc.dot(this.direction),l=-zc.dot(Bc),c=zc.lengthSq(),h=Math.abs(1-a*a),d,u,f,p;if(h>0)if(d=a*l-o,u=a*o-l,p=r*h,d>=0)if(u>=-p)if(u<=p){let _=1/h;d*=_,u*=_,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(vd).addScaledVector(Bc,u),f}intersectSphere(e,t){if(e.radius<0)return null;Vi.subVectors(e.center,this.origin);let n=Vi.dot(this.direction),i=Vi.dot(Vi)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Vi)!==null}intersectTriangle(e,t,n,i,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,f=e.z-a.z,p=t.x-a.x,_=t.y-a.y,g=t.z-a.z,m=n.x-a.x,y=n.y-a.y,b=n.z-a.z,x=Math.abs(l),A=Math.abs(c),T=Math.abs(h),D,v,R,I,F,H,X,N,B,V,W,ie;if(x>=A&&x>=T?(R=l,H=d,B=p,ie=m,l>=0?(D=c,v=h,I=u,F=f,X=_,N=g,V=y,W=b):(D=h,v=c,I=f,F=u,X=g,N=_,V=b,W=y)):A>=T?(R=c,H=u,B=_,ie=y,c>=0?(D=h,v=l,I=f,F=d,X=g,N=p,V=b,W=m):(D=l,v=h,I=d,F=f,X=p,N=g,V=m,W=b)):(R=h,H=f,B=g,ie=b,h>=0?(D=l,v=c,I=d,F=u,X=p,N=_,V=m,W=y):(D=c,v=l,I=u,F=d,X=_,N=p,V=y,W=m)),R===0)return null;let Y=D/R,$=v/R,se=1/R,Ge=I-Y*H,Ae=F-$*H,bt=X-Y*B,nt=N-$*B,it=V-Y*ie,Q=W-$*ie,le=it*nt-Q*bt,Se=Ge*Q-Ae*it,Ue=bt*Ae-nt*Ge;if(i){if(le<0||Se<0||Ue<0)return null}else if((le<0||Se<0||Ue<0)&&(le>0||Se>0||Ue>0))return null;let Fe=le+Se+Ue;if(Fe===0)return null;let je=se*(le*H+Se*B+Ue*ie);return(Fe>0?je<0:je>0)?null:this.at(je/Fe,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Gt=class extends tn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.combine=Pa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Cp=new ht,Is=new li,Vc=new Ht,Pp=new E,kc=new E,Hc=new E,Gc=new E,Sd=new E,Wc=new E,Ip=new E,Xc=new E,Bt=class extends Ct{constructor(e=new pt,t=new Gt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){Wc.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(Sd.fromBufferAttribute(d,e),a?Wc.addScaledVector(Sd,h):Wc.addScaledVector(Sd.sub(t),h))}t.add(Wc)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vc.copy(n.boundingSphere),Vc.applyMatrix4(r),Is.copy(e.ray).recast(e.near),!(Vc.containsPoint(Is.origin)===!1&&(Is.intersectSphere(Vc,Pp)===null||Is.origin.distanceToSquared(Pp)>(e.far-e.near)**2))&&(Cp.copy(r).invert(),Is.copy(e.ray).applyMatrix4(Cp),!(n.boundingBox!==null&&Is.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Is)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=u.length;p<_;p++){let g=u[p],m=a[g.materialIndex],y=Math.max(g.start,f.start),b=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let x=y,A=b;x<A;x+=3){let T=o.getX(x),D=o.getX(x+1),v=o.getX(x+2);i=Yc(this,m,e,n,c,h,d,T,D,v),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){let y=o.getX(g),b=o.getX(g+1),x=o.getX(g+2);i=Yc(this,a,e,n,c,h,d,y,b,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,_=u.length;p<_;p++){let g=u[p],m=a[g.materialIndex],y=Math.max(g.start,f.start),b=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=y,A=b;x<A;x+=3){let T=x,D=x+1,v=x+2;i=Yc(this,m,e,n,c,h,d,T,D,v),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){let y=g,b=g+1,x=g+2;i=Yc(this,a,e,n,c,h,d,y,b,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function e_(s,e,t,n,i,r,a,o){let l;if(e.side===bn?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===ji,o),l===null)return null;Xc.copy(o),Xc.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(Xc);return c<t.near||c>t.far?null:{distance:c,point:Xc.clone(),object:s}}function Yc(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,kc),s.getVertexPosition(l,Hc),s.getVertexPosition(c,Gc);let h=e_(s,e,t,n,kc,Hc,Gc,Ip);if(h){let d=new E;ri.getBarycoord(Ip,kc,Hc,Gc,d),i&&(h.uv=ri.getInterpolatedAttribute(i,o,l,c,d,new ae)),r&&(h.uv1=ri.getInterpolatedAttribute(r,o,l,c,d,new ae)),a&&(h.normal=ri.getInterpolatedAttribute(a,o,l,c,d,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new E,materialIndex:0};ri.getNormal(kc,Hc,Gc,u.normal),h.face=u,h.barycoord=d}return h}var no=new wt,Lp=new wt,Dp=new wt,t_=new wt,Up=new ht,qc=new E,Md=new Ht,Np=new ht,bd=new li,Ro=class extends Bt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=gh,this.bindMatrix=new ht,this.bindMatrixInverse=new ht,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new kt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qc),this.boundingBox.expandByPoint(qc)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ht),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,qc),this.boundingSphere.expandByPoint(qc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Md.copy(this.boundingSphere),Md.applyMatrix4(i),e.ray.intersectsSphere(Md)!==!1&&(Np.copy(i).invert(),bd.copy(e.ray).applyMatrix4(Np),!(this.boundingBox!==null&&bd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,bd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new wt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===gh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Sf?this.bindMatrixInverse.copy(this.bindMatrix).invert():Pe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Lp.fromBufferAttribute(i.attributes.skinIndex,e),Dp.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(no.copy(t),t.set(0,0,0,0)):(no.set(...t,1),t.set(0,0,0)),no.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=Dp.getComponent(r);if(a!==0){let o=Lp.getComponent(r);Up.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(t_.copy(no).applyMatrix4(Up),a)}}return t.isVector4&&(t.w=no.w),t.applyMatrix4(this.bindMatrixInverse)}},sa=class extends Ct{constructor(){super(),this.isBone=!0,this.type="Bone"}},Cn=class extends Kt{constructor(e=null,t=1,n=1,i,r,a,o,l,c=Jt,h=Jt,d,u){super(null,a,o,l,c,h,i,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Fp=new ht,n_=new ht,Co=class s{constructor(e=[],t=[]){this.uuid=Gn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Pe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ht)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ht;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:n_;Fp.multiplyMatrices(o,t[r]),Fp.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Cn(t,e,e,Sn,vn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(Pe("Skeleton: No bone found with UUID:",r),a=new sa),this.bones.push(a),this.boneInverses.push(new ht().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},Wi=class extends Ft{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},zr=new ht,Op=new ht,Zc=[],Bp=new kt,i_=new ht,io=new Bt,so=new Ht,$s=class extends Bt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Wi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,i_)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new kt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zr),Bp.copy(e.boundingBox).applyMatrix4(zr),this.boundingBox.union(Bp)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ht),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,zr),so.copy(e.boundingSphere).applyMatrix4(zr),this.boundingSphere.union(so)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(io.geometry=this.geometry,io.material=this.material,io.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),so.copy(this.boundingSphere),so.applyMatrix4(n),e.ray.intersectsSphere(so)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,zr),Op.multiplyMatrices(n,zr),io.matrixWorld=Op,io.raycast(e,Zc);for(let a=0,o=Zc.length;a<o;a++){let l=Zc[a];l.instanceId=r,l.object=this,t.push(l)}Zc.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Wi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Cn(new Float32Array(i*this.count),i,this.count,wl,vn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ls=new Ht,s_=new ae(.5,.5),Jc=new E,Ei=class{constructor(e=new Nn,t=new Nn,n=new Nn,i=new Nn,r=new Nn,a=new Nn){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Fn,n=!1){let i=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],p=r[8],_=r[9],g=r[10],m=r[11],y=r[12],b=r[13],x=r[14],A=r[15];if(i[0].setComponents(c-a,f-h,m-p,A-y).normalize(),i[1].setComponents(c+a,f+h,m+p,A+y).normalize(),i[2].setComponents(c+o,f+d,m+_,A+b).normalize(),i[3].setComponents(c-o,f-d,m-_,A-b).normalize(),n)i[4].setComponents(l,u,g,x).normalize(),i[5].setComponents(c-l,f-u,m-g,A-x).normalize();else if(i[4].setComponents(c-l,f-u,m-g,A-x).normalize(),t===Fn)i[5].setComponents(c+l,f+u,m+g,A+x).normalize();else if(t===fs)i[5].setComponents(l,u,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ls.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ls.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ls)}intersectsSprite(e){Ls.center.set(0,0,0);let t=s_.distanceTo(e.center);return Ls.radius=.7071067811865476+t,Ls.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ls)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Jc.x=i.normal.x>0?e.max.x:e.min.x,Jc.y=i.normal.y>0?e.max.y:e.min.y,Jc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Jc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},zp=new ht,Po=class s{constructor(){this.coordinateSystem=Fn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let i=0;i<t.length;i++){let r=t[i];zp.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new Ei),n[i].setFromProjectionMatrix(zp,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let i=0;i<e._count;i++)t[i]===void 0&&(t[i]=new Ei),t[i].copy(n[i]);return this._count=e._count,this}clone(){return new s().copy(this)}};function Ed(s,e){return s-e}function r_(s,e){return s.z-e.z}function a_(s,e){return e.z-s.z}var Bd=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let r=this.pool,a=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});let o=r[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},Dn=new ht,o_=new Be(1,1,1),l_=new Ei,c_=new Po,Kc=new kt,Ds=new Ht,ro=new E,Vp=new E,h_=new E,wd=new Bd,yn=new Bt,$c=[];function u_(s,e,t=0){let n=e.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==e.array.constructor){let i=s.count;for(let r=0;r<i;r++)for(let a=0;a<n;a++)e.setComponent(r+t,a,s.getComponent(r,a))}else e.array.set(s.array,t*n);e.needsUpdate=!0}function Us(s,e){if(s.constructor!==e.constructor){let t=Math.min(s.length,e.length);for(let n=0;n<t;n++)e[n]=s[n]}else{let t=Math.min(s.length,e.length);e.set(new s.constructor(s.buffer,0,t))}}var Io=class extends Bt{constructor(e,t,n=t*2,i){super(new pt,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawBytesPerElement=1,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4),n=new Cn(t,e,e,Sn,vn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Uint32Array(e*e),n=new Cn(t,e,e,Na,Xn);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Float32Array(e*e*4).fill(1),n=new Cn(t,e,e,Sn,vn);n.colorSpace=Mt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){let t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(let r in e.attributes){let a=e.getAttribute(r),{array:o,itemSize:l,normalized:c}=a,h=new o.constructor(n*l),d=new Ft(h,l,c);t.setAttribute(r,d)}if(e.getIndex()!==null){let r=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Ft(r,1))}this._geometryInitialized=!0}}_validateGeometry(e){let t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(let n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let i=e.getAttribute(n),r=t.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){let t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){let t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kt);let e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let r=t[n].geometryIndex;this.getMatrixAt(n,Dn),this.getBoundingBoxAt(r,Kc).applyMatrix4(Dn),e.union(Kc)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ht);let e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let r=t[n].geometryIndex;this.getMatrixAt(n,Dn),this.getBoundingSphereAt(r,Ds).applyMatrix4(Dn),e.union(Ds)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");let n={visible:!0,active:!0,geometryIndex:e},i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Ed),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));let r=this._matricesTexture;Dn.identity().toArray(r.image.data,i*16),r.needsUpdate=!0;let a=this._colorsTexture;return a&&(o_.toArray(a.image.data,i*4),a.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);let i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;let a=e.getIndex();if(a!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?a.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Ed),l=this._availableGeometryIds.shift(),r[l]=i):(l=this._geometryCount,this._geometryCount++,r.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);let n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),a=t.getIndex(),o=this._geometryInfo[e];if(i&&a.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");let l=o.vertexStart,c=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(let h in n.attributes){let d=t.getAttribute(h),u=n.getAttribute(h);u_(d,u,l);let f=d.itemSize;for(let p=d.count,_=c;p<_;p++){let g=l+p;for(let m=0;m<f;m++)u.setComponent(g,m,0)}u.needsUpdate=!0,u.addUpdateRange(l*f,c*f)}if(i){let h=o.indexStart,d=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let u=0;u<a.count;u++)r.setX(h+u,l+a.getX(u));for(let u=a.count,f=d;u<f;u++)r.setX(h+u,l);r.needsUpdate=!0,r.addUpdateRange(h,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){let t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;let n=this._instanceInfo;for(let i=0,r=n.length;i<r;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0,n=this._geometryInfo,i=n.map((a,o)=>o).sort((a,o)=>n[a].vertexStart-n[o].vertexStart),r=this.geometry;for(let a=0,o=n.length;a<o;a++){let l=i[a],c=n[l];if(c.active!==!1){if(r.index!==null){if(c.indexStart!==t){let{indexStart:h,vertexStart:d,reservedIndexCount:u}=c,f=r.index,p=f.array,_=e-d;for(let g=h;g<h+u;g++)p[g]=p[g]+_;f.array.copyWithin(t,h,h+u),f.addUpdateRange(t,u),f.needsUpdate=!0,c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){let{vertexStart:h,reservedVertexCount:d}=c,u=r.attributes;for(let f in u){let p=u[f],{array:_,itemSize:g}=p;_.copyWithin(e*g,h*g,(h+d)*g),p.addUpdateRange(e*g,d*g),p.needsUpdate=!0}c.vertexStart=e}e+=c.reservedVertexCount,c.start=r.index?c.indexStart:c.vertexStart}}return this._nextIndexStart=t,this._nextVertexStart=e,this._visibilityChanged=!0,this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){let r=new kt,a=n.index,o=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let h=l;a&&(h=a.getX(h)),r.expandByPoint(ro.fromBufferAttribute(o,h))}i.boundingBox=r}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){let r=new Ht;this.getBoundingBoxAt(e,Kc),Kc.getCenter(r.center);let a=n.index,o=n.attributes.position,l=0;for(let c=i.start,h=i.start+i.count;c<h;c++){let d=c;a&&(d=a.getX(d)),ro.fromBufferAttribute(o,d),l=Math.max(l,r.center.distanceToSquared(ro))}r.radius=Math.sqrt(l),i.boundingSphere=r}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);let n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null?t.isVector4?t.set(1,1,1,1):t.setRGB(1,1,1):t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this._visibilityChanged=!0,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);let n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){let t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(Ed);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`THREE.BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);let i=new Int32Array(e),r=new Int32Array(e);Us(this._multiDrawCounts,i),Us(this._multiDrawStarts,r),this._multiDrawCounts=i,this._multiDrawStarts=r,this._maxInstanceCount=e;let a=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),Us(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),Us(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),Us(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){let n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`THREE.BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`THREE.BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);let r=this.geometry;r.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new pt,this._initializeGeometry(r));let a=this.geometry;r.index&&Us(r.index.array,a.index.array);for(let o in r.attributes)Us(r.attributes[o].array,a.attributes[o].array)}raycast(e,t){let n=this._instanceInfo,i=this._geometryInfo,r=this.matrixWorld,a=this.geometry;yn.material=this.material,yn.geometry.index=a.index,yn.geometry.attributes=a.attributes,yn.geometry.boundingBox===null&&(yn.geometry.boundingBox=new kt),yn.geometry.boundingSphere===null&&(yn.geometry.boundingSphere=new Ht);for(let o=0,l=n.length;o<l;o++){if(!n[o].visible||!n[o].active)continue;let c=n[o].geometryIndex,h=i[c];yn.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(o,yn.matrixWorld).premultiply(r),this.getBoundingBoxAt(c,yn.geometry.boundingBox),this.getBoundingSphereAt(c,yn.geometry.boundingSphere),yn.raycast(e,$c);for(let d=0,u=$c.length;d<u;d++){let f=$c[d];f.object=this,f.batchId=o,t.push(f)}$c.length=0}yn.material=null,yn.geometry.index=null,yn.geometry.attributes={},yn.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._multiDrawBytesPerElement=e._multiDrawBytesPerElement,this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){super.dispose(),this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let a=i.getIndex(),o=a===null?1:a.array.BYTES_PER_ELEMENT,l=1;r.wireframe&&(l=2,o=i.attributes.position.count>65535?4:2);let c=this._instanceInfo,h=this._multiDrawStarts,d=this._multiDrawCounts,u=this._geometryInfo,f=this.perObjectFrustumCulled,p=this._indirectTexture,_=p.image.data,g=n.isArrayCamera?c_:l_;f&&(n.isArrayCamera?g.setFromArrayCamera(n):(Dn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),g.setFromProjectionMatrix(Dn,n.coordinateSystem,n.reversedDepth)));let m=0;if(this.sortObjects){Dn.copy(this.matrixWorld).invert(),ro.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Dn),Vp.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(Dn);for(let x=0,A=c.length;x<A;x++)if(c[x].visible&&c[x].active){let T=c[x].geometryIndex;this.getMatrixAt(x,Dn),this.getBoundingSphereAt(T,Ds).applyMatrix4(Dn);let D=!1;if(f&&(D=!g.intersectsSphere(Ds)),!D){let v=u[T],R=h_.subVectors(Ds.center,ro).dot(Vp);wd.push(v.start,v.count,R,x)}}let y=wd.list,b=this.customSort;b===null?y.sort(r.transparent?a_:r_):b.call(this,y,n);for(let x=0,A=y.length;x<A;x++){let T=y[x];h[m]=T.start*o*l,d[m]=T.count*l,_[m]=T.index,m++}wd.reset()}else for(let y=0,b=c.length;y<b;y++)if(c[y].visible&&c[y].active){let x=c[y].geometryIndex,A=!1;if(f&&(this.getMatrixAt(y,Dn),this.getBoundingSphereAt(x,Ds).applyMatrix4(Dn),A=!g.intersectsSphere(Ds)),!A){let T=u[x];h[m]=T.start*o*l,d[m]=T.count*l,_[m]=y,m++}}p.needsUpdate=!0,this._multiDrawCount=m,this._multiDrawBytesPerElement=o,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,r,a){this.onBeforeRender(e,null,i,r,a)}},nn=class extends tn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Rh=new E,Ch=new E,kp=new ht,ao=new li,jc=new Ht,Td=new E,Hp=new E,ci=class extends Ct{constructor(e=new pt,t=new nn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Rh.fromBufferAttribute(t,i-1),Ch.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Rh.distanceTo(Ch);e.setAttribute("lineDistance",new ze(n,1))}else Pe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),jc.copy(n.boundingSphere),jc.applyMatrix4(i),jc.radius+=r,e.ray.intersectsSphere(jc)===!1)return;kp.copy(i).invert(),ao.copy(e.ray).applyMatrix4(kp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=c){let m=h.getX(_),y=h.getX(_+1),b=Qc(this,e,ao,l,m,y,_);b&&t.push(b)}if(this.isLineLoop){let _=h.getX(p-1),g=h.getX(f),m=Qc(this,e,ao,l,_,g,p-1);m&&t.push(m)}}else{let f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=c){let m=Qc(this,e,ao,l,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){let _=Qc(this,e,ao,l,p-1,f,p-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Qc(s,e,t,n,i,r,a){let o=s.geometry.attributes.position;if(Rh.fromBufferAttribute(o,i),Ch.fromBufferAttribute(o,r),t.distanceSqToSegment(Rh,Ch,Td,Hp)>n)return;Td.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Td);if(!(c<e.near||c>e.far))return{distance:c,point:Hp.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var Gp=new E,Wp=new E,Pn=class extends ci{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Gp.fromBufferAttribute(t,i),Wp.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Gp.distanceTo(Wp);e.setAttribute("lineDistance",new ze(n,1))}else Pe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Lo=class extends ci{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},ra=class extends tn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Be(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Xp=new ht,zd=new li,eh=new Ht,th=new E,Do=class extends Ct{constructor(e=new pt,t=new ra){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),eh.copy(n.boundingSphere),eh.applyMatrix4(i),eh.radius+=r,e.ray.intersectsSphere(eh)===!1)return;Xp.copy(i).invert(),zd.copy(e.ray).applyMatrix4(Xp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=u,_=f;p<_;p++){let g=c.getX(p);th.fromBufferAttribute(d,g),Yp(th,g,l,i,e,t,this)}}else{let u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let p=u,_=f;p<_;p++)th.fromBufferAttribute(d,p),Yp(th,p,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Yp(s,e,t,n,i,r,a){let o=zd.distanceSqToPoint(s);if(o<t){let l=new E;zd.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Uo=class extends Kt{constructor(e,t,n,i,r=zt,a=zt,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;let h=this;function d(){h.needsUpdate=!0,h._requestVideoFrameCallbackId=e.requestVideoFrameCallback(d)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(d))}clone(){return new this.constructor(this.image).copy(this)}update(){let e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}},Ph=class extends Uo{constructor(e,t,n,i,r,a,o,l){super({},e,t,n,i,r,a,o,l),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(e){this.image=e,this.needsUpdate=!0}},Ih=class extends Kt{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=Jt,this.minFilter=Jt,this.generateMipmaps=!1,this.needsUpdate=!0}},js=class extends Kt{constructor(e,t,n,i,r,a,o,l,c,h,d,u){super(null,a,o,l,c,h,i,r,d,u),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}},Lh=class extends js{constructor(e,t,n,i,r,a){super(e,t,n,r,a),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Rn,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Dh=class extends js{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,_i),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}},gs=class extends Kt{constructor(e=[],t=_i,n,i,r,a,o,l,c,h){super(e,t,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},aa=class extends Kt{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Uh=class extends Kt{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;let h=e?e.parentNode:null;h!==null&&"requestPaint"in h&&(h.onpaint=()=>{this.needsUpdate=!0},h.requestPaint())}dispose(){let e=this.image?this.image.parentNode:null;e!==null&&"onpaint"in e&&(e.onpaint=null),super.dispose()}},Xi=class extends Kt{constructor(e,t,n=Xn,i,r,a,o=Jt,l=Jt,c,h=oi,d=1){if(h!==oi&&h!==es)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Zn(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},No=class extends Xi{constructor(e,t=Xn,n=_i,i,r,a=Jt,o=Jt,l,c=oi){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,i,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},oa=class extends Kt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Bn=class s extends pt{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ze(c,3)),this.setAttribute("normal",new ze(h,3)),this.setAttribute("uv",new ze(d,2));function p(_,g,m,y,b,x,A,T,D,v,R){let I=x/D,F=A/v,H=x/2,X=A/2,N=T/2,B=D+1,V=v+1,W=0,ie=0,Y=new E;for(let $=0;$<V;$++){let se=$*F-X;for(let Ge=0;Ge<B;Ge++){let Ae=Ge*I-H;Y[_]=Ae*y,Y[g]=se*b,Y[m]=N,c.push(Y.x,Y.y,Y.z),Y[_]=0,Y[g]=0,Y[m]=T>0?1:-1,h.push(Y.x,Y.y,Y.z),d.push(Ge/D),d.push(1-$/v),W+=1}}for(let $=0;$<v;$++)for(let se=0;se<D;se++){let Ge=u+se+B*$,Ae=u+se+B*($+1),bt=u+(se+1)+B*($+1),nt=u+(se+1)+B*$;l.push(Ge,Ae,nt),l.push(Ae,bt,nt),ie+=6}o.addGroup(f,ie,R),f+=ie,u+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},Fo=class s extends pt{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=t/2,d=Math.PI/2*e,u=t,f=2*d+u,p=n*2+r,_=i+1,g=new E,m=new E;for(let y=0;y<=p;y++){let b=0,x=0,A=0,T=0;if(y<=n){let R=y/n,I=R*Math.PI/2;x=-h-e*Math.cos(I),A=e*Math.sin(I),T=-e*Math.cos(I),b=R*d}else if(y<=n+r){let R=(y-n)/r;x=-h+R*t,A=e,T=0,b=d+R*u}else{let R=(y-n-r)/n,I=R*Math.PI/2;x=h+e*Math.sin(I),A=e*Math.cos(I),T=e*Math.sin(I),b=d+u+R*d}let D=Math.max(0,Math.min(1,b/f)),v=0;y===0?v=.5/i:y===p&&(v=-.5/i);for(let R=0;R<=i;R++){let I=R/i,F=I*Math.PI*2,H=Math.sin(F),X=Math.cos(F);m.x=-A*X,m.y=x,m.z=A*H,o.push(m.x,m.y,m.z),g.set(-A*X,T,A*H),g.normalize(),l.push(g.x,g.y,g.z),c.push(I+v,D)}if(y>0){let R=(y-1)*_;for(let I=0;I<i;I++){let F=R+I,H=R+I+1,X=y*_+I,N=y*_+I+1;a.push(F,H,X),a.push(H,N,X)}}}this.setIndex(a),this.setAttribute("position",new ze(o,3)),this.setAttribute("normal",new ze(l,3)),this.setAttribute("uv",new ze(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Yi=class s extends pt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new E,h=new ae;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let f=n+d/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ze(a,3)),this.setAttribute("normal",new ze(o,3)),this.setAttribute("uv",new ze(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Vt=class s extends pt{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],d=[],u=[],f=[],p=0,_=[],g=n/2,m=0;y(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new ze(d,3)),this.setAttribute("normal",new ze(u,3)),this.setAttribute("uv",new ze(f,2));function y(){let x=new E,A=new E,T=0,D=(t-e)/n;for(let v=0;v<=r;v++){let R=[],I=v/r,F=I*(t-e)+e;for(let H=0;H<=i;H++){let X=H/i,N=X*l+o,B=Math.sin(N),V=Math.cos(N);A.x=F*B,A.y=-I*n+g,A.z=F*V,d.push(A.x,A.y,A.z),x.set(B,D,V).normalize(),u.push(x.x,x.y,x.z),f.push(X,1-I),R.push(p++)}_.push(R)}for(let v=0;v<i;v++)for(let R=0;R<r;R++){let I=_[R][v],F=_[R+1][v],H=_[R+1][v+1],X=_[R][v+1];(e>0||R!==0)&&(h.push(I,F,X),T+=3),(t>0||R!==r-1)&&(h.push(F,H,X),T+=3)}c.addGroup(m,T,0),m+=T}function b(x){let A=p,T=new ae,D=new E,v=0,R=x===!0?e:t,I=x===!0?1:-1;for(let H=1;H<=i;H++)d.push(0,g*I,0),u.push(0,I,0),f.push(.5,.5),p++;let F=p;for(let H=0;H<=i;H++){let N=H/i*l+o,B=Math.cos(N),V=Math.sin(N);D.x=R*V,D.y=g*I,D.z=R*B,d.push(D.x,D.y,D.z),u.push(0,I,0),T.x=B*.5+.5,T.y=V*.5*I+.5,f.push(T.x,T.y),p++}for(let H=0;H<i;H++){let X=A+H,N=F+H;x===!0?h.push(N,N+1,X):h.push(N+1,N,X),v+=3}c.addGroup(m,v,x===!0?1:2),m+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},la=class s extends Vt{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},qi=class s extends pt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new ze(r,3)),this.setAttribute("normal",new ze(r.slice(),3)),this.setAttribute("uv",new ze(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(y){let b=new E,x=new E,A=new E;for(let T=0;T<t.length;T+=3)f(t[T+0],b),f(t[T+1],x),f(t[T+2],A),l(b,x,A,y)}function l(y,b,x,A){let T=A+1,D=[];for(let v=0;v<=T;v++){D[v]=[];let R=y.clone().lerp(x,v/T),I=b.clone().lerp(x,v/T),F=T-v;for(let H=0;H<=F;H++)H===0&&v===T?D[v][H]=R:D[v][H]=R.clone().lerp(I,H/F)}for(let v=0;v<T;v++)for(let R=0;R<2*(T-v)-1;R++){let I=Math.floor(R/2);R%2===0?(u(D[v][I+1]),u(D[v+1][I]),u(D[v][I])):(u(D[v][I+1]),u(D[v+1][I+1]),u(D[v+1][I]))}}function c(y){let b=new E;for(let x=0;x<r.length;x+=3)b.x=r[x+0],b.y=r[x+1],b.z=r[x+2],b.normalize().multiplyScalar(y),r[x+0]=b.x,r[x+1]=b.y,r[x+2]=b.z}function h(){let y=new E;for(let b=0;b<r.length;b+=3){y.x=r[b+0],y.y=r[b+1],y.z=r[b+2];let x=g(y)/2/Math.PI+.5,A=m(y)/Math.PI+.5;a.push(x,1-A)}p(),d()}function d(){for(let y=0;y<a.length;y+=6){let b=a[y+0],x=a[y+2],A=a[y+4],T=Math.max(b,x,A),D=Math.min(b,x,A);T>.9&&D<.1&&(b<.2&&(a[y+0]+=1),x<.2&&(a[y+2]+=1),A<.2&&(a[y+4]+=1))}}function u(y){r.push(y.x,y.y,y.z)}function f(y,b){let x=y*3;b.x=e[x+0],b.y=e[x+1],b.z=e[x+2]}function p(){let y=new E,b=new E,x=new E,A=new E,T=new ae,D=new ae,v=new ae;for(let R=0,I=0;R<r.length;R+=9,I+=6){y.set(r[R+0],r[R+1],r[R+2]),b.set(r[R+3],r[R+4],r[R+5]),x.set(r[R+6],r[R+7],r[R+8]),T.set(a[I+0],a[I+1]),D.set(a[I+2],a[I+3]),v.set(a[I+4],a[I+5]),A.copy(y).add(b).add(x).divideScalar(3);let F=g(A);_(T,I+0,y,F),_(D,I+2,b,F),_(v,I+4,x,F)}}function _(y,b,x,A){A<0&&y.x===1&&(a[b]=y.x-1),x.x===0&&x.z===0&&(a[b]=A/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.detail)}},Oo=class s extends qi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},nh=new E,ih=new E,Ad=new E,sh=new ri,Qs=class extends pt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),r=Math.cos(ks*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let p=0;p<l;p+=3){a?(c[0]=a.getX(p),c[1]=a.getX(p+1),c[2]=a.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);let{a:_,b:g,c:m}=sh;if(_.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),sh.getNormal(Ad),d[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,d[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,d[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let y=0;y<3;y++){let b=(y+1)%3,x=d[y],A=d[b],T=sh[h[y]],D=sh[h[b]],v=`${x}_${A}`,R=`${A}_${x}`;R in u&&u[R]?(Ad.dot(u[R].normal)<=r&&(f.push(T.x,T.y,T.z),f.push(D.x,D.y,D.z)),u[R]=null):v in u||(u[v]={index0:c[y],index1:c[b],normal:Ad.clone()})}}for(let p in u)if(u[p]){let{index0:_,index1:g}=u[p];nh.fromBufferAttribute(o,_),ih.fromBufferAttribute(o,g),f.push(nh.x,nh.y,nh.z),f.push(ih.x,ih.y,ih.z)}this.setAttribute("position",new ze(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},zn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Pe("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);let h=n[i],u=n[i+1]-h,f=(a-h)/u;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),l=t||(a.isVector2?new ae:new E);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new E,i=[],r=[],a=[],o=new E,l=new ht;for(let f=0;f<=e;f++){let p=f/e;i[f]=this.getTangentAt(p,new E)}r[0]=new E,a[0]=new E;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(ut(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(ut(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),a[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},er=class extends zn{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ae){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Bo=class extends er{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Ff(){let s=0,e=0,t=0,n=0;function i(r,a,o,l){s=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,i(a,o,u,f)},calc:function(r){let a=r*r,o=a*r;return s+e*r+t*a+n*o}}}var qp=new E,Zp=new E,Rd=new Ff,Cd=new Ff,Pd=new Ff,hi=class extends zn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new E){let n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Zp.subVectors(i[0],i[1]).add(i[0]),c=Zp);let d=i[o%r],u=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(qp.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=qp),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),Rd.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,p,_,g),Cd.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,p,_,g),Pd.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(Rd.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Cd.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Pd.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(Rd.calc(l),Cd.calc(l),Pd.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new E().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Jp(s,e,t,n,i){let r=(n-e)*.5,a=(i-t)*.5,o=s*s,l=s*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*s+t}function d_(s,e){let t=1-s;return t*t*e}function f_(s,e){return 2*(1-s)*s*e}function p_(s,e){return s*s*e}function fo(s,e,t,n){return d_(s,e)+f_(s,t)+p_(s,n)}function m_(s,e){let t=1-s;return t*t*t*e}function g_(s,e){let t=1-s;return 3*t*t*s*e}function __(s,e){return 3*(1-s)*s*s*e}function x_(s,e){return s*s*s*e}function po(s,e,t,n,i){return m_(s,e)+g_(s,t)+__(s,n)+x_(s,i)}var ca=class extends zn{constructor(e=new ae,t=new ae,n=new ae,i=new ae){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ae){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(po(e,i.x,r.x,a.x,o.x),po(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},zo=class extends zn{constructor(e=new E,t=new E,n=new E,i=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new E){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(po(e,i.x,r.x,a.x,o.x),po(e,i.y,r.y,a.y,o.y),po(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ha=class extends zn{constructor(e=new ae,t=new ae){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ae){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ae){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_s=class extends zn{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ua=class extends zn{constructor(e=new ae,t=new ae,n=new ae){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ae){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(fo(e,i.x,r.x,a.x),fo(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},xs=class extends zn{constructor(e=new E,t=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new E){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(fo(e,i.x,r.x,a.x),fo(e,i.y,r.y,a.y),fo(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},da=class extends zn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ae){let n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(Jp(o,l.x,c.x,h.x,d.x),Jp(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ae().fromArray(i))}return this}},Nh=Object.freeze({__proto__:null,ArcCurve:Bo,CatmullRomCurve3:hi,CubicBezierCurve:ca,CubicBezierCurve3:zo,EllipseCurve:er,LineCurve:ha,LineCurve3:_s,QuadraticBezierCurve:ua,QuadraticBezierCurve3:xs,SplineCurve:da}),tr=class extends zn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Nh[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Nh[i.type]().fromJSON(i))}return this}},ys=class extends tr{constructor(e){super(),this.type="Path",this.currentPoint=new ae,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ha(this.currentPoint.clone(),new ae(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new ua(this.currentPoint.clone(),new ae(e,t),new ae(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){let o=new ca(this.currentPoint.clone(),new ae(e,t),new ae(n,i),new ae(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new da(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,a,o,l),this}absellipse(e,t,n,i,r,a,o,l){let c=new er(e,t,n,i,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},vs=class extends ys{constructor(e){super(e),this.uuid=Gn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new ys().fromJSON(i))}return this}};function y_(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=bg(s,0,i,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=E_(s,e,r,t)),s.length>80*t){o=s[0],l=s[1];let h=o,d=l;for(let u=t;u<i;u+=t){let f=s[u],p=s[u+1];f<o&&(o=f),p<l&&(l=p),f>h&&(h=f),p>d&&(d=p)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return Vo(r,a,t,o,l,c,0),a}function bg(s,e,t,n,i){let r;if(i===N_(s,e,t,n)>0)for(let a=e;a<t;a+=n)r=Kp(a/n|0,s[a],s[a+1],r);else for(let a=t-n;a>=e;a-=n)r=Kp(a/n|0,s[a],s[a+1],r);return r&&fa(r,r.next)&&(Ho(r),r=r.next),r}function nr(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(fa(t,t.next)||Xt(t.prev,t,t.next)===0)){if(Ho(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Vo(s,e,t,n,i,r,a){if(!s)return;!a&&r&&C_(s,n,i,r);let o=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?S_(s,n,i,r):v_(s)){e.push(l.i,s.i,c.i),Ho(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=M_(nr(s),e),Vo(s,e,t,n,i,r,2)):a===2&&b_(s,e,t,n,i,r):Vo(nr(s),e,t,n,i,r,1);break}}}function v_(s){let e=s.prev,t=s,n=s.next;if(Xt(e,t,n)>=0)return!1;let i=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(i,r,a),d=Math.min(o,l,c),u=Math.max(i,r,a),f=Math.max(o,l,c),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=u&&p.y>=d&&p.y<=f&&lo(i,o,r,l,a,c,p.x,p.y)&&Xt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function S_(s,e,t,n){let i=s.prev,r=s,a=s.next;if(Xt(i,r,a)>=0)return!1;let o=i.x,l=r.x,c=a.x,h=i.y,d=r.y,u=a.y,f=Math.min(o,l,c),p=Math.min(h,d,u),_=Math.max(o,l,c),g=Math.max(h,d,u),m=Vd(f,p,e,t,n),y=Vd(_,g,e,t,n),b=s.prevZ,x=s.nextZ;for(;b&&b.z>=m&&x&&x.z<=y;){if(b.x>=f&&b.x<=_&&b.y>=p&&b.y<=g&&b!==i&&b!==a&&lo(o,h,l,d,c,u,b.x,b.y)&&Xt(b.prev,b,b.next)>=0||(b=b.prevZ,x.x>=f&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==a&&lo(o,h,l,d,c,u,x.x,x.y)&&Xt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;b&&b.z>=m;){if(b.x>=f&&b.x<=_&&b.y>=p&&b.y<=g&&b!==i&&b!==a&&lo(o,h,l,d,c,u,b.x,b.y)&&Xt(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;x&&x.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==a&&lo(o,h,l,d,c,u,x.x,x.y)&&Xt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function M_(s,e){let t=s;do{let n=t.prev,i=t.next.next;!fa(n,i)&&wg(n,t,t.next,i)&&ko(n,i)&&ko(i,n)&&(e.push(n.i,t.i,i.i),Ho(t),Ho(t.next),t=s=i),t=t.next}while(t!==s);return nr(t)}function b_(s,e,t,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&L_(a,o)){let l=Tg(a,o);a=nr(a,a.next),l=nr(l,l.next),Vo(a,e,t,n,i,r,0),Vo(l,e,t,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function E_(s,e,t,n){let i=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,l=r<a-1?e[r+1]*n:s.length,c=bg(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(I_(c))}i.sort(w_);for(let r=0;r<i.length;r++)t=T_(i[r],t);return t}function w_(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function T_(s,e){let t=A_(s,e);if(!t)return e;let n=Tg(t,s);return nr(n,n.next),nr(t,t.next)}function A_(s,e){let t=e,n=s.x,i=s.y,r=-1/0,a;if(fa(s,t))return t;do{if(fa(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let d=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Eg(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)){let d=Math.abs(i-t.y)/(n-t.x);ko(t,s)&&(d<h||d===h&&(t.x>a.x||t.x===a.x&&R_(a,t)))&&(a=t,h=d)}t=t.next}while(t!==o);return a}function R_(s,e){return Xt(s.prev,s,e.prev)<0&&Xt(e.next,s,s.next)<0}function C_(s,e,t,n){let i=s;do i.z===0&&(i.z=Vd(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,P_(i)}function P_(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,t*=2}while(e>1);return s}function Vd(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function I_(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Eg(s,e,t,n,i,r,a,o){return(i-a)*(e-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(i-a)*(n-o)}function lo(s,e,t,n,i,r,a,o){return!(s===a&&e===o)&&Eg(s,e,t,n,i,r,a,o)}function L_(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!D_(s,e)&&(ko(s,e)&&ko(e,s)&&U_(s,e)&&(Xt(s.prev,s,e.prev)||Xt(s,e.prev,e))||fa(s,e)&&Xt(s.prev,s,s.next)>0&&Xt(e.prev,e,e.next)>0)}function Xt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function fa(s,e){return s.x===e.x&&s.y===e.y}function wg(s,e,t,n){let i=ah(Xt(s,e,t)),r=ah(Xt(s,e,n)),a=ah(Xt(t,n,s)),o=ah(Xt(t,n,e));return!!(i!==r&&a!==o||i===0&&rh(s,t,e)||r===0&&rh(s,n,e)||a===0&&rh(t,s,n)||o===0&&rh(t,e,n))}function rh(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function ah(s){return s>0?1:s<0?-1:0}function D_(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&wg(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function ko(s,e){return Xt(s.prev,s,s.next)<0?Xt(s,e,s.next)>=0&&Xt(s,s.prev,e)>=0:Xt(s,e,s.prev)<0||Xt(s,s.next,e)<0}function U_(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function Tg(s,e){let t=kd(s.i,s.x,s.y),n=kd(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Kp(s,e,t,n){let i=kd(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Ho(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function kd(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function N_(s,e,t,n){let i=0;for(let r=e,a=t-n;r<t;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var Hd=class{static triangulate(e,t,n=2){return y_(e,t,n)}},Jn=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];$p(e),jp(n,e);let a=e.length;t.forEach($p);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,jp(n,t[l]);let o=Hd.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function $p(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function jp(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var Go=class s extends pt{constructor(e=new vs([new ae(.5,.5),new ae(-.5,.5),new ae(-.5,-.5),new ae(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new ze(i,3)),this.setAttribute("uv",new ze(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:F_,b,x=!1,A,T,D,v;if(m){b=m.getSpacedPoints(h),x=!0,u=!1;let re=m.isCatmullRomCurve3?m.closed:!1;A=m.computeFrenetFrames(h,re),T=new E,D=new E,v=new E}u||(g=0,f=0,p=0,_=0);let R=o.extractPoints(c),I=R.shape,F=R.holes;if(!Jn.isClockWise(I)){I=I.reverse();for(let re=0,_e=F.length;re<_e;re++){let ge=F[re];Jn.isClockWise(ge)&&(F[re]=ge.reverse())}}function X(re){let ge=10000000000000001e-36,ye=re[0];for(let Me=1;Me<=re.length;Me++){let ct=Me%re.length,Qe=re[ct],ot=Qe.x-ye.x,rt=Qe.y-ye.y,O=ot*ot+rt*rt,Pt=Math.max(Math.abs(Qe.x),Math.abs(Qe.y),Math.abs(ye.x),Math.abs(ye.y)),_t=ge*Pt*Pt;if(O<=_t){re.splice(ct,1),Me--;continue}ye=Qe}}X(I),F.forEach(X);let N=F.length,B=I;for(let re=0;re<N;re++){let _e=F[re];I=I.concat(_e)}function V(re,_e,ge){return _e||Ke("ExtrudeGeometry: vec does not exist"),re.clone().addScaledVector(_e,ge)}let W=I.length;function ie(re,_e,ge){let ye,Me,ct,Qe=re.x-_e.x,ot=re.y-_e.y,rt=ge.x-re.x,O=ge.y-re.y,Pt=Qe*Qe+ot*ot,_t=Qe*O-ot*rt;if(Math.abs(_t)>Number.EPSILON){let C=Math.sqrt(Pt),M=Math.sqrt(rt*rt+O*O),G=_e.x-ot/C,q=_e.y+Qe/C,ee=ge.x-O/M,ve=ge.y+rt/M,Re=((ee-G)*O-(ve-q)*rt)/(Qe*O-ot*rt);ye=G+Qe*Re-re.x,Me=q+ot*Re-re.y;let te=ye*ye+Me*Me;if(te<=2)return new ae(ye,Me);ct=Math.sqrt(te/2)}else{let C=!1;Qe>Number.EPSILON?rt>Number.EPSILON&&(C=!0):Qe<-Number.EPSILON?rt<-Number.EPSILON&&(C=!0):Math.sign(ot)===Math.sign(O)&&(C=!0),C?(ye=-ot,Me=Qe,ct=Math.sqrt(Pt)):(ye=Qe,Me=ot,ct=Math.sqrt(Pt/2))}return new ae(ye/ct,Me/ct)}let Y=[];for(let re=0,_e=B.length,ge=_e-1,ye=re+1;re<_e;re++,ge++,ye++)ge===_e&&(ge=0),ye===_e&&(ye=0),Y[re]=ie(B[re],B[ge],B[ye]);let $=[],se,Ge=Y.concat();for(let re=0,_e=N;re<_e;re++){let ge=F[re];se=[];for(let ye=0,Me=ge.length,ct=Me-1,Qe=ye+1;ye<Me;ye++,ct++,Qe++)ct===Me&&(ct=0),Qe===Me&&(Qe=0),se[ye]=ie(ge[ye],ge[ct],ge[Qe]);$.push(se),Ge=Ge.concat(se)}let Ae;if(g===0)Ae=Jn.triangulateShape(B,F);else{let re=[],_e=[];for(let ge=0;ge<g;ge++){let ye=ge/g,Me=f*Math.cos(ye*Math.PI/2),ct=p*Math.sin(ye*Math.PI/2)+_;for(let Qe=0,ot=B.length;Qe<ot;Qe++){let rt=V(B[Qe],Y[Qe],ct);Se(rt.x,rt.y,-Me),ye===0&&re.push(rt)}for(let Qe=0,ot=N;Qe<ot;Qe++){let rt=F[Qe];se=$[Qe];let O=[];for(let Pt=0,_t=rt.length;Pt<_t;Pt++){let C=V(rt[Pt],se[Pt],ct);Se(C.x,C.y,-Me),ye===0&&O.push(C)}ye===0&&_e.push(O)}}Ae=Jn.triangulateShape(re,_e)}let bt=Ae.length,nt=p+_;for(let re=0;re<W;re++){let _e=u?V(I[re],Ge[re],nt):I[re];x?(D.copy(A.normals[0]).multiplyScalar(_e.x),T.copy(A.binormals[0]).multiplyScalar(_e.y),v.copy(b[0]).add(D).add(T),Se(v.x,v.y,v.z)):Se(_e.x,_e.y,0)}for(let re=1;re<=h;re++)for(let _e=0;_e<W;_e++){let ge=u?V(I[_e],Ge[_e],nt):I[_e];x?(D.copy(A.normals[re]).multiplyScalar(ge.x),T.copy(A.binormals[re]).multiplyScalar(ge.y),v.copy(b[re]).add(D).add(T),Se(v.x,v.y,v.z)):Se(ge.x,ge.y,d/h*re)}for(let re=g-1;re>=0;re--){let _e=re/g,ge=f*Math.cos(_e*Math.PI/2),ye=p*Math.sin(_e*Math.PI/2)+_;for(let Me=0,ct=B.length;Me<ct;Me++){let Qe=V(B[Me],Y[Me],ye);Se(Qe.x,Qe.y,d+ge)}for(let Me=0,ct=F.length;Me<ct;Me++){let Qe=F[Me];se=$[Me];for(let ot=0,rt=Qe.length;ot<rt;ot++){let O=V(Qe[ot],se[ot],ye);x?Se(O.x,O.y+b[h-1].y,b[h-1].x+ge):Se(O.x,O.y,d+ge)}}}it(),Q();function it(){let re=i.length/3;if(u){let _e=0,ge=W*_e;for(let ye=0;ye<bt;ye++){let Me=Ae[ye];Ue(Me[2]+ge,Me[1]+ge,Me[0]+ge)}_e=h+g*2,ge=W*_e;for(let ye=0;ye<bt;ye++){let Me=Ae[ye];Ue(Me[0]+ge,Me[1]+ge,Me[2]+ge)}}else{for(let _e=0;_e<bt;_e++){let ge=Ae[_e];Ue(ge[2],ge[1],ge[0])}for(let _e=0;_e<bt;_e++){let ge=Ae[_e];Ue(ge[0]+W*h,ge[1]+W*h,ge[2]+W*h)}}n.addGroup(re,i.length/3-re,0)}function Q(){let re=i.length/3,_e=0;le(B,_e),_e+=B.length;for(let ge=0,ye=F.length;ge<ye;ge++){let Me=F[ge];le(Me,_e),_e+=Me.length}n.addGroup(re,i.length/3-re,1)}function le(re,_e){let ge=re.length;for(;--ge>=0;){let ye=ge,Me=ge-1;Me<0&&(Me=re.length-1);for(let ct=0,Qe=h+g*2;ct<Qe;ct++){let ot=W*ct,rt=W*(ct+1),O=_e+ye+ot,Pt=_e+Me+ot,_t=_e+Me+rt,C=_e+ye+rt;Fe(O,Pt,_t,C)}}}function Se(re,_e,ge){l.push(re),l.push(_e),l.push(ge)}function Ue(re,_e,ge){je(re),je(_e),je(ge);let ye=i.length/3,Me=y.generateTopUV(n,i,ye-3,ye-2,ye-1);st(Me[0]),st(Me[1]),st(Me[2])}function Fe(re,_e,ge,ye){je(re),je(_e),je(ye),je(_e),je(ge),je(ye);let Me=i.length/3,ct=y.generateSideWallUV(n,i,Me-6,Me-3,Me-2,Me-1);st(ct[0]),st(ct[1]),st(ct[3]),st(ct[1]),st(ct[2]),st(ct[3])}function je(re){i.push(l[re*3+0]),i.push(l[re*3+1]),i.push(l[re*3+2])}function st(re){r.push(re.x),r.push(re.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return O_(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Nh[i.type]().fromJSON(i)),new s(n,e.options)}},F_={generateTopUV:function(s,e,t,n,i){let r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new ae(r,a),new ae(o,l),new ae(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],d=e[n*3+2],u=e[i*3],f=e[i*3+1],p=e[i*3+2],_=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ae(a,1-l),new ae(c,1-d),new ae(u,1-p),new ae(_,1-m)]:[new ae(o,1-l),new ae(h,1-d),new ae(f,1-p),new ae(g,1-m)]}};function O_(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Wo=class s extends qi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},Xo=class s extends pt{constructor(e=[new ae(0,-.5),new ae(.5,0),new ae(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ut(i,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/t,d=new E,u=new ae,f=new E,p=new E,_=new E,g=0,m=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:g=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,f.x=m*1,f.y=-g,f.z=m*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:g=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(p)}for(let y=0;y<=t;y++){let b=n+y*h*i,x=Math.sin(b),A=Math.cos(b);for(let T=0;T<=e.length-1;T++){d.x=e[T].x*x,d.y=e[T].y,d.z=e[T].x*A,a.push(d.x,d.y,d.z),u.x=y/t,u.y=T/(e.length-1),o.push(u.x,u.y);let D=l[3*T+0]*x,v=l[3*T+1],R=l[3*T+0]*A;c.push(D,v,R)}}for(let y=0;y<t;y++)for(let b=0;b<e.length-1;b++){let x=b+y*e.length,A=x,T=x+e.length,D=x+e.length+1,v=x+1;r.push(A,T,v),r.push(D,v,T)}this.setIndex(r),this.setAttribute("position",new ze(a,3)),this.setAttribute("uv",new ze(o,2)),this.setAttribute("normal",new ze(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}},pa=class s extends qi{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},ui=class s extends pt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,d=e/o,u=t/l,f=[],p=[],_=[],g=[];for(let m=0;m<h;m++){let y=m*u-a;for(let b=0;b<c;b++){let x=b*d-r;p.push(x,-y,0),_.push(0,0,1),g.push(b/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<o;y++){let b=y+c*m,x=y+c*(m+1),A=y+1+c*(m+1),T=y+1+c*m;f.push(b,x,T),f.push(x,A,T)}this.setIndex(f),this.setAttribute("position",new ze(p,3)),this.setAttribute("normal",new ze(_,3)),this.setAttribute("uv",new ze(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},Yo=class s extends pt{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],l=[],c=[],h=[],d=e,u=(t-e)/i,f=new E,p=new ae;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){let m=r+g/n*a;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}d+=u}for(let _=0;_<i;_++){let g=_*(n+1);for(let m=0;m<n;m++){let y=m+g,b=y,x=y+n+1,A=y+n+2,T=y+1;o.push(b,x,T),o.push(x,A,T)}}this.setIndex(o),this.setAttribute("position",new ze(l,3)),this.setAttribute("normal",new ze(c,3)),this.setAttribute("uv",new ze(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},qo=class s extends pt{constructor(e=new vs([new ae(0,.5),new ae(-.5,-.5),new ae(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new ze(i,3)),this.setAttribute("normal",new ze(r,3)),this.setAttribute("uv",new ze(a,2));function c(h){let d=i.length/3,u=h.extractPoints(t),f=u.shape,p=u.holes;Jn.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){let y=p[g];Jn.isClockWise(y)===!0&&(p[g]=y.reverse())}let _=Jn.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){let y=p[g];f=f.concat(y)}for(let g=0,m=f.length;g<m;g++){let y=f[g];i.push(y.x,y.y,0),r.push(0,0,1),a.push(y.x,y.y)}for(let g=0,m=_.length;g<m;g++){let y=_[g],b=y[0]+d,x=y[1]+d,A=y[2]+d;n.push(b,x,A),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return B_(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let a=t[e.shapes[i]];n.push(a)}return new s(n,e.curveSegments)}};function B_(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}var di=class s extends pt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new E,u=new E,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){let y=[],b=m/n,x=a+b*o,A=e*Math.cos(x),T=Math.sqrt(e*e-A*A),D=0;m===0&&a===0?D=.5/t:m===n&&l===Math.PI&&(D=-.5/t);for(let v=0;v<=t;v++){let R=v/t,I=i+R*r;d.x=-T*Math.cos(I),d.y=A,d.z=T*Math.sin(I),p.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),g.push(R+D,1-b),y.push(c++)}h.push(y)}for(let m=0;m<n;m++)for(let y=0;y<t;y++){let b=h[m][y+1],x=h[m][y],A=h[m+1][y],T=h[m+1][y+1];(m!==0||a>0)&&f.push(b,x,T),(m!==n-1||l<Math.PI)&&f.push(x,A,T)}this.setIndex(f),this.setAttribute("position",new ze(p,3)),this.setAttribute("normal",new ze(_,3)),this.setAttribute("uv",new ze(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Zo=class s extends qi{constructor(e=1,t=0){let n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},fi=class s extends pt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);let l=[],c=[],h=[],d=[],u=new E,f=new E,p=new E;for(let _=0;_<=n;_++){let g=a+_/n*o;for(let m=0;m<=i;m++){let y=m/i*r;f.x=(e+t*Math.cos(g))*Math.cos(y),f.y=(e+t*Math.cos(g))*Math.sin(y),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),u.x=e*Math.cos(y),u.y=e*Math.sin(y),p.subVectors(f,u).normalize(),h.push(p.x,p.y,p.z),d.push(m/i),d.push(_/n)}}for(let _=1;_<=n;_++)for(let g=1;g<=i;g++){let m=(i+1)*_+g-1,y=(i+1)*(_-1)+g-1,b=(i+1)*(_-1)+g,x=(i+1)*_+g;l.push(m,y,x),l.push(y,b,x)}this.setIndex(l),this.setAttribute("position",new ze(c,3)),this.setAttribute("normal",new ze(h,3)),this.setAttribute("uv",new ze(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}},Jo=class s extends pt{constructor(e=1,t=.4,n=64,i=8,r=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:r,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],l=[],c=[],h=[],d=new E,u=new E,f=new E,p=new E,_=new E,g=new E,m=new E;for(let b=0;b<=n;++b){let x=b/n*r*Math.PI*2;y(x,r,a,e,f),y(x+.01,r,a,e,p),g.subVectors(p,f),m.addVectors(p,f),_.crossVectors(g,m),m.crossVectors(_,g),_.normalize(),m.normalize();for(let A=0;A<=i;++A){let T=A/i*Math.PI*2,D=-t*Math.cos(T),v=t*Math.sin(T);d.x=f.x+(D*m.x+v*_.x),d.y=f.y+(D*m.y+v*_.y),d.z=f.z+(D*m.z+v*_.z),l.push(d.x,d.y,d.z),u.subVectors(d,f).normalize(),c.push(u.x,u.y,u.z),h.push(b/n),h.push(A/i)}}for(let b=1;b<=n;b++)for(let x=1;x<=i;x++){let A=(i+1)*(b-1)+(x-1),T=(i+1)*b+(x-1),D=(i+1)*b+x,v=(i+1)*(b-1)+x;o.push(A,T,v),o.push(T,D,v)}this.setIndex(o),this.setAttribute("position",new ze(l,3)),this.setAttribute("normal",new ze(c,3)),this.setAttribute("uv",new ze(h,2));function y(b,x,A,T,D){let v=Math.cos(b),R=Math.sin(b),I=A/x*b,F=Math.cos(I);D.x=T*(2+F)*.5*v,D.y=T*(2+F)*R*.5,D.z=T*Math.sin(I)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},pi=class s extends pt{constructor(e=new xs(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new E,l=new E,c=new ae,h=new E,d=[],u=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new ze(d,3)),this.setAttribute("normal",new ze(u,3)),this.setAttribute("uv",new ze(f,2));function _(){for(let b=0;b<t;b++)g(b);g(r===!1?t:0),y(),m()}function g(b){h=e.getPointAt(b/t,h);let x=a.normals[b],A=a.binormals[b];for(let T=0;T<=i;T++){let D=T/i*Math.PI*2,v=Math.sin(D),R=-Math.cos(D);l.x=R*x.x+v*A.x,l.y=R*x.y+v*A.y,l.z=R*x.z+v*A.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function m(){for(let b=1;b<=t;b++)for(let x=1;x<=i;x++){let A=(i+1)*(b-1)+(x-1),T=(i+1)*b+(x-1),D=(i+1)*b+x,v=(i+1)*(b-1)+x;p.push(A,T,v),p.push(T,D,v)}}function y(){for(let b=0;b<=t;b++)for(let x=0;x<=i;x++)c.x=b/t,c.y=x/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new Nh[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},ir=class extends pt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new E,r=new E;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let d=l[c],u=d.start,f=d.count;for(let p=u,_=u+f;p<_;p+=3)for(let g=0;g<3;g++){let m=o.getX(p+g),y=o.getX(p+(g+1)%3);i.fromBufferAttribute(a,m),r.fromBufferAttribute(a,y),Qp(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,d=3*o+(c+1)%3;i.fromBufferAttribute(a,h),r.fromBufferAttribute(a,d),Qp(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new ze(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Qp(s,e,t){let n=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var em=Object.freeze({__proto__:null,BoxGeometry:Bn,CapsuleGeometry:Fo,CircleGeometry:Yi,ConeGeometry:la,CylinderGeometry:Vt,DodecahedronGeometry:Oo,EdgesGeometry:Qs,ExtrudeGeometry:Go,IcosahedronGeometry:Wo,LatheGeometry:Xo,OctahedronGeometry:pa,PlaneGeometry:ui,PolyhedronGeometry:qi,RingGeometry:Yo,ShapeGeometry:qo,SphereGeometry:di,TetrahedronGeometry:Zo,TorusGeometry:fi,TorusKnotGeometry:Jo,TubeGeometry:pi,WireframeGeometry:ir}),Ko=class extends tn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Be(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};function xr(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(tm(i))i.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(tm(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function En(s){let e={};for(let t=0;t<s.length;t++){let n=xr(s[t]);for(let i in n)e[i]=n[i]}return e}function tm(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function z_(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Of(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Mt.workingColorSpace}var Ha={clone:xr,merge:En},V_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,k_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,dn=class extends tn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=V_,this.fragmentShader=k_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=xr(e.uniforms),this.uniformsGroups=z_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new Be().setHex(i.value);break;case"v2":this.uniforms[n].value=new ae().fromArray(i.value);break;case"v3":this.uniforms[n].value=new E().fromArray(i.value);break;case"v4":this.uniforms[n].value=new wt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new ft().fromArray(i.value);break;case"m4":this.uniforms[n].value=new ht().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ma=class extends dn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Et=class extends tn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ai,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},sr=class extends Et{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ae(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ut(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Be(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Be(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Be(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},$o=class extends tn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Be(16777215),this.specular=new Be(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ai,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.combine=Pa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},jo=class extends tn{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Be(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ai,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Qo=class extends tn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ai,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},el=class extends tn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ai,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Kn,this.combine=Pa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ga=class extends tn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=wf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},_a=class extends tn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},tl=class extends tn{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Be(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ai,this.normalScale=new ae(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}},nl=class extends nn{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function si(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function mo(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function Ag(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Gd(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i}function Rg(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}function H_(s,e,t,n,i=30){let r=s.clone();r.name=e;let a=[];for(let l=0;l<r.tracks.length;++l){let c=r.tracks[l],h=c.getValueSize(),d=[],u=[];for(let f=0;f<c.times.length;++f){let p=c.times[f]*i;if(!(p<t||p>=n)){d.push(c.times[f]);for(let _=0;_<h;++_)u.push(c.values[f*h+_])}}d.length!==0&&(c.times=si(d,c.times.constructor),c.values=si(u,c.values.constructor),a.push(c))}r.tracks=a;let o=1/0;for(let l=0;l<r.tracks.length;++l)o>r.tracks[l].times[0]&&(o=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*o);return r.resetDuration(),r}function G_(s,e=0,t=s,n=30){n<=0&&(n=30);let i=t.tracks.length,r=e/n;for(let a=0;a<i;++a){let o=t.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;let c=s.tracks.find(function(m){return m.name===o.name&&m.ValueTypeName===l});if(c===void 0)continue;let h=0,d=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=d/3);let u=0,f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=f/3);let p=o.times.length-1,_;if(r<=o.times[0]){let m=h,y=d-h;_=o.values.slice(m,y)}else if(r>=o.times[p]){let m=p*d+h,y=m+d-h;_=o.values.slice(m,y)}else{let m=o.createInterpolant(),y=h,b=d-h;m.evaluate(r),_=m.resultBuffer.slice(y,b)}l==="quaternion"&&new jt().fromArray(_).normalize().conjugate().toArray(_);let g=c.times.length;for(let m=0;m<g;++m){let y=m*f+u;if(l==="quaternion")jt.multiplyQuaternionsFlat(c.values,y,_,0,c.values,y);else{let b=f-u*2;for(let x=0;x<b;++x)c.values[y+x]-=_[x]}}}return s.blendMode=Ou,s}var Fh=class{static convertArray(e,t){return si(e,t)}static isTypedArray(e){return mg(e)}static hasTangents(e){return mo(e)}static getKeyframeOrder(e){return Ag(e)}static sortedArray(e,t,n){return Gd(e,t,n)}static flattenJSON(e,t,n,i){Rg(e,t,n,i)}static subclip(e,t,n,i,r=30){return H_(e,t,n,i,r)}static makeClipAdditive(e,t=0,n=e,i=30){return G_(e,t,n,i)}},Zi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},il=class extends Zi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:us,endingEnd:us}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case ds:r=e,o=2*t-n;break;case Kr:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ds:a=e,l=2*n-t;break;case Kr:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),_=p*p,g=_*p,m=-u*g+2*u*_-u*p,y=(1+u)*g+(-1.5-2*u)*_+(-.5+u)*p+1,b=(-1-f)*g+(1.5+f)*_+.5*p,x=f*g-f*_;for(let A=0;A!==o;++A)r[A]=m*a[h+A]+y*a[c+A]+b*a[l+A]+x*a[d+A];return r}},xa=class extends Zi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},sl=class extends Zi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},rl=class extends Zi{interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let p=(n-t)/(i-t),_=1-p;for(let g=0;g!==o;++g)r[g]=a[c+g]*_+a[l+g]*p;return r}let u=o*2,f=e-1;for(let p=0;p!==o;++p){let _=a[c+p],g=a[l+p],m=f*u+p*2,y=d[m],b=d[m+1],x=e*u+p*2,A=h[x],T=h[x+1],D=X_(n,t,y,A,i);r[p]=Cg(D,_,b,T,g)}return r}};function Cg(s,e,t,n,i){let r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*n+s*s*s*i}function W_(s,e,t,n,i){let r=1-s;return 3*r*r*(t-e)+6*r*s*(n-t)+3*s*s*(i-n)}function X_(s,e,t,n,i){let r=(s-e)/(i-e);for(let a=0;a<8;a++){let o=Cg(r,e,t,n,i)-s;if(Math.abs(o)<1e-10)break;let l=W_(r,e,t,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var In=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=si(t,this.TimeBufferType),this.values=si(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:si(e.times,Array),values:si(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),mo(e.settings)&&(n.settings={inTangents:si(e.settings.inTangents,Array),outTangents:si(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new sl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new xa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new il(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new rl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Jr:t=this.InterpolantFactoryMethodDiscrete;break;case bo:t=this.InterpolantFactoryMethodLinear;break;case co:t=this.InterpolantFactoryMethodSmooth;break;case _h:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Pe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Jr;case this.InterpolantFactoryMethodLinear:return bo;case this.InterpolantFactoryMethodSmooth:return co;case this.InterpolantFactoryMethodBezier:return _h}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;mo(this.settings)&&(nm(this.settings.inTangents,e),nm(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ke("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Ke("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Ke("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Ke("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&mg(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){Ke("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===co,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{let d=o*n,u=d-n,f=d+n;for(let p=0;p!==n;++p){let _=t[d+p];if(_!==t[u+p]||_!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,mo(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function nm(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]*=e}In.prototype.ValueTypeName="";In.prototype.TimeBufferType=Float32Array;In.prototype.ValueBufferType=Float32Array;In.prototype.DefaultInterpolation=bo;var wi=class extends In{constructor(e,t,n){super(e,t,n)}};wi.prototype.ValueTypeName="bool";wi.prototype.ValueBufferType=Array;wi.prototype.DefaultInterpolation=Jr;wi.prototype.InterpolantFactoryMethodLinear=void 0;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var ya=class extends In{constructor(e,t,n,i){super(e,t,n,i)}};ya.prototype.ValueTypeName="color";var rr=class extends In{constructor(e,t,n,i){super(e,t,n,i)}};rr.prototype.ValueTypeName="number";var al=class extends Zi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let h=c+o;c!==h;c+=4)jt.slerpFlat(r,0,a,c-o,a,c,l);return r}},ar=class extends In{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new al(this.times,this.values,this.getValueSize(),e)}};ar.prototype.ValueTypeName="quaternion";ar.prototype.InterpolantFactoryMethodSmooth=void 0;var Ti=class extends In{constructor(e,t,n){super(e,t,n)}};Ti.prototype.ValueTypeName="string";Ti.prototype.ValueBufferType=Array;Ti.prototype.DefaultInterpolation=Jr;Ti.prototype.InterpolantFactoryMethodLinear=void 0;Ti.prototype.InterpolantFactoryMethodSmooth=void 0;var va=class extends In{constructor(e,t,n,i){super(e,t,n,i)}};va.prototype.ValueTypeName="vector";var Ss=class{constructor(e="",t=-1,n=[],i=sc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Gn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(q_(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(In.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let h=Ag(l);l=Gd(l,1,h),c=Gd(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new rr(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(r);if(h&&h.length>1){let d=h[1],u=i[d];u||(i[d]=u=[]),u.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Y_(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return rr;case"vector":case"vector2":case"vector3":case"vector4":return va;case"color":return ya;case"quaternion":return ar;case"bool":case"boolean":return wi;case"string":return Ti}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function q_(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Y_(s.type);if(s.times===void 0){let n=[],i=[];Rg(s.keys,n,i,"value"),s.times=n,s.values=i}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),mo(s.settings)&&(t.settings={inTangents:si(s.settings.inTangents,Float32Array),outTangents:si(s.settings.outTangents,Float32Array)}),t}var ai={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(im(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!im(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function im(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var Sa=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Bf=new Sa,fn=class{constructor(e){this.manager=e!==void 0?e:Bf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};fn.DEFAULT_MATERIAL_NAME="__DEFAULT";var ki={},Wd=class extends Error{constructor(e,t){super(e),this.response=t}},$n=class extends fn{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=ai.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(ki[e]!==void 0){ki[e].push({onLoad:t,onProgress:n,onError:i});return}ki[e]=[],ki[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Pe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=ki[e],d=c.body.getReader(),u=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=u?parseInt(u):0,p=f!==0,_=0,g=new ReadableStream({start(m){y();function y(){d.read().then(({done:b,value:x})=>{if(b)m.close();else{_+=x.byteLength;let A=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let T=0,D=h.length;T<D;T++){let v=h[T];v.onProgress&&v.onProgress(A)}m.enqueue(x),y()}},b=>{m.error(b)})}}});return new Response(g)}else throw new Wd(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{let d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{ai.add(`file:${e}`,c);let h=ki[e];delete ki[e];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=ki[e];if(h===void 0)throw this.manager.itemError(e),c;delete ki[e];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Oh=class extends fn{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new $n(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(r.parse(JSON.parse(o)))}catch(l){i?i(l):Ke(l),r.manager.itemError(e)}},n,i)}parse(e){let t=[];for(let n=0;n<e.length;n++){let i=Ss.parse(e[n]);t.push(i)}return t}},Bh=class extends fn{constructor(e){super(e)}load(e,t,n,i){let r=this,a=[],o=new js,l=new $n(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(r.withCredentials);let c=0;function h(d){l.load(e[d],function(u){let f=r.parse(u,!0);a[d]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(o.minFilter=zt),o.image=a,o.format=f.format,o.needsUpdate=!0,t&&t(o))},n,i)}if(Array.isArray(e))for(let d=0,u=e.length;d<u;++d)h(d);else l.load(e,function(d){let u=r.parse(d,!0);if(u.isCubemap){let f=u.mipmaps.length/u.mipmapCount;for(let p=0;p<f;p++){a[p]={mipmaps:[]};for(let _=0;_<u.mipmapCount;_++)a[p].mipmaps.push(u.mipmaps[p*u.mipmapCount+_]),a[p].format=u.format,a[p].width=u.width,a[p].height=u.height}o.image=a}else o.image.width=u.width,o.image.height=u.height,o.mipmaps=u.mipmaps;u.mipmapCount===1&&(o.minFilter=zt),o.format=u.format,o.needsUpdate=!0,t&&t(o)},n,i);return o}},Vr=new WeakMap,Ms=class extends fn{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ai.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let d=Vr.get(a);d===void 0&&(d=[],Vr.set(a,d)),d.push({onLoad:t,onError:i})}return a}let o=Qr("img");function l(){h(),t&&t(this);let d=Vr.get(this)||[];for(let u=0;u<d.length;u++){let f=d[u];f.onLoad&&f.onLoad(this)}Vr.delete(this),r.manager.itemEnd(e)}function c(d){h(),i&&i(d),ai.remove(`image:${e}`);let u=Vr.get(this)||[];for(let f=0;f<u.length;f++){let p=u[f];p.onError&&p.onError(d)}Vr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ai.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}},zh=class extends fn{constructor(e){super(e)}load(e,t,n,i){let r=new gs;r.colorSpace=hn;let a=new Ms(this.manager);a.setCrossOrigin(this.crossOrigin),a.setPath(this.path);let o=0;function l(c){a.load(e[c],function(h){r.images[c]=h,o++,o===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return r}},Vh=class extends fn{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new Cn,o=new $n(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(e,function(l){let c;try{c=r.parse(l)}catch(h){i!==void 0?i(h):Ke(h);return}r._applyTexData(a,c),t&&t(a,c)},n,i),a}createDataTexture(e){let t=new Cn;return this._applyTexData(t,this.parse(e)),t}_applyTexData(e,t){t.image!==void 0?e.image=t.image:t.data!==void 0&&(e.image.width=t.width,e.image.height=t.height,e.image.data=t.data),e.wrapS=t.wrapS!==void 0?t.wrapS:Rn,e.wrapT=t.wrapT!==void 0?t.wrapT:Rn,e.magFilter=t.magFilter!==void 0?t.magFilter:zt,e.minFilter=t.minFilter!==void 0?t.minFilter:zt,e.anisotropy=t.anisotropy!==void 0?t.anisotropy:1,t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.mipmaps!==void 0&&(e.mipmaps=t.mipmaps,e.minFilter=xi),t.mipmapCount===1&&(e.minFilter=zt),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),e.needsUpdate=!0}},kh=class extends fn{constructor(e){super(e)}load(e,t,n,i){let r=new Kt,a=new Ms(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},mi=class extends Ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},or=class extends mi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Id=new ht,sm=new E,rm=new E,lr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ae(512,512),this.mapType=Ln,this.map=null,this.mapPass=null,this.matrix=new ht,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ei,this._frameExtents=new ae(1,1),this._viewportCount=1,this._viewports=[new wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;sm.setFromMatrixPosition(e.matrixWorld),t.position.copy(sm),rm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rm),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){Id.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Id,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;e.coordinateSystem===fs||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Id)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},oh=new E,lh=new jt,Mi=new E,cr=class extends Ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ht,this.projectionMatrix=new ht,this.projectionMatrixInverse=new ht,this.coordinateSystem=Fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(oh,lh,Mi),Mi.x===1&&Mi.y===1&&Mi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oh,lh,Mi.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(oh,lh,Mi),Mi.x===1&&Mi.y===1&&Mi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oh,lh,Mi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},cs=new E,am=new ae,om=new ae,Zt=class extends cr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Gs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ks*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Gs*2*Math.atan(Math.tan(ks*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){cs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(cs.x,cs.y).multiplyScalar(-e/cs.z),cs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(cs.x,cs.y).multiplyScalar(-e/cs.z)}getViewSize(e,t){return this.getViewBounds(e,am,om),t.subVectors(om,am)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ks*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Xd=class extends lr{constructor(){super(new Zt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Gs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},ol=class extends mi{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Xd}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Yd=class extends lr{constructor(){super(new Zt(90,1,.5,500)),this.isPointLightShadow=!0}},ll=class extends mi{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Yd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},bs=class extends cr{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},qd=class extends lr{constructor(){super(new bs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Es=class extends mi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.shadow=new qd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},cl=class extends mi{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}},hl=class extends mi{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){let t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}},Ma=class{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new E)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){let n=e.x,i=e.y,r=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.282095),t.addScaledVector(a[1],.488603*i),t.addScaledVector(a[2],.488603*r),t.addScaledVector(a[3],.488603*n),t.addScaledVector(a[4],1.092548*(n*i)),t.addScaledVector(a[5],1.092548*(i*r)),t.addScaledVector(a[6],.315392*(3*r*r-1)),t.addScaledVector(a[7],1.092548*(n*r)),t.addScaledVector(a[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){let n=e.x,i=e.y,r=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.886227),t.addScaledVector(a[1],2*.511664*i),t.addScaledVector(a[2],2*.511664*r),t.addScaledVector(a[3],2*.511664*n),t.addScaledVector(a[4],2*.429043*n*i),t.addScaledVector(a[5],2*.429043*i*r),t.addScaledVector(a[6],.743125*r*r-.247708),t.addScaledVector(a[7],2*.429043*n*r),t.addScaledVector(a[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){let n=e.x,i=e.y,r=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*r,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*n*r,t[8]=.546274*(n*n-i*i)}},ul=class extends mi{constructor(e=new Ma,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}toJSON(e){let t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}},lm={},dl=class s extends fn{constructor(e){super(e),this.textures={}}load(e,t,n,i){let r=this,a=new $n(r.manager);a.setPath(r.path),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(e,function(o){try{t(r.parse(JSON.parse(o)))}catch(l){i?i(l):Ke(l),r.manager.itemError(e)}},n,i)}parse(e){let t=this.createMaterialFromType(e.type);return t.fromJSON(e,this.textures),t}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return s.createMaterialFromType(e)}static createMaterialFromType(e){let n={ShadowMaterial:Ko,SpriteMaterial:ms,RawShaderMaterial:ma,ShaderMaterial:dn,PointsMaterial:ra,MeshPhysicalMaterial:sr,MeshStandardMaterial:Et,MeshPhongMaterial:$o,MeshToonMaterial:jo,MeshNormalMaterial:Qo,MeshLambertMaterial:el,MeshDepthMaterial:ga,MeshDistanceMaterial:_a,MeshBasicMaterial:Gt,MeshMatcapMaterial:tl,LineDashedMaterial:nl,LineBasicMaterial:nn,Material:tn,...lm}[e],i;return n===void 0?(bi(`MaterialLoader: Unknown material type "${e}". Use .registerMaterial() before starting the deserialization process.`),i=new tn):i=new n,i}static registerMaterial(e,t){lm[e]=t}},ba=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},hr=class extends pt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},fl=class extends fn{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new $n(r.manager);a.setPath(r.path),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(e,function(o){try{t(r.parse(JSON.parse(o)))}catch(l){i?i(l):Ke(l),r.manager.itemError(e)}},n,i)}parse(e){let t={},n={};function i(f,p){if(t[p]!==void 0)return t[p];let g=f.interleavedBuffers[p],m=r(f,g.buffer),y=Xr(g.type,m),b=new Js(y,g.stride);return b.uuid=g.uuid,g.usage!==void 0&&b.setUsage(g.usage),t[p]=b,b}function r(f,p){if(n[p]!==void 0)return n[p];let g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}let a=e.isInstancedBufferGeometry?new hr:new pt,o=e.data.index;if(o!==void 0){let f=Xr(o.type,o.array);a.setIndex(new Ft(f,1))}let l=e.data.attributes;for(let f in l){let p=l[f],_;if(p.isInterleavedBufferAttribute){let g=i(e.data,p.data);_=new Mn(g,p.itemSize,p.offset,p.normalized)}else{let g=Xr(p.type,p.array),m=p.isInstancedBufferAttribute?Wi:Ft;_=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(_.name=p.name),p.usage!==void 0&&_.setUsage(p.usage),p.gpuType!==void 0&&(_.gpuType=p.gpuType),a.setAttribute(f,_)}let c=e.data.morphAttributes;if(c)for(let f in c){let p=c[f],_=[];for(let g=0,m=p.length;g<m;g++){let y=p[g],b;if(y.isInterleavedBufferAttribute){let x=i(e.data,y.data);b=new Mn(x,y.itemSize,y.offset,y.normalized)}else{let x=Xr(y.type,y.array);b=new Ft(x,y.itemSize,y.normalized)}y.name!==void 0&&(b.name=y.name),y.usage!==void 0&&b.setUsage(y.usage),y.gpuType!==void 0&&(b.gpuType=y.gpuType),_.push(b)}a.morphAttributes[f]=_}e.data.morphTargetsRelative&&(a.morphTargetsRelative=!0);let d=e.data.groups||e.data.drawcalls||e.data.offsets;if(d!==void 0)for(let f=0,p=d.length;f!==p;++f){let _=d[f];a.addGroup(_.start,_.count,_.materialIndex)}let u=e.data.boundingSphere;return u!==void 0&&(a.boundingSphere=new Ht().fromJSON(u)),e.name&&(a.name=e.name),e.userData&&(a.userData=e.userData),a}},Ld={},Hh=class extends fn{constructor(e){super(e)}load(e,t,n,i){let r=this,a=this.path===""?ba.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||a;let o=new $n(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(d){i!==void 0&&i(d),Ke("ObjectLoader: Can't parse "+e+".",d.message);return}let h=c.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),Ke("ObjectLoader: Can't load "+e);return}r.parse(c,t)},n,i)}async loadAsync(e,t){let n=this,i=this.path===""?ba.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;let r=new $n(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials);let a=await r.loadAsync(e,t),o;try{o=JSON.parse(a)}catch(c){throw new Error("THREE.ObjectLoader: Can't parse "+e+". "+c.message)}let l=o.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(o)}parse(e,t){let n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),r=this.parseGeometries(e.geometries,i),a=this.parseImages(e.images,function(){t!==void 0&&t(c)}),o=this.parseTextures(e.textures,a),l=this.parseMaterials(e.materials,o),c=this.parseObject(e.object,r,l,o,n),h=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,h),this.bindLightTargets(c),t!==void 0){let d=!1;for(let u in a)if(a[u].data instanceof HTMLImageElement){d=!0;break}d===!1&&t(c)}return c}async parseAsync(e){let t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),r=await this.parseImagesAsync(e.images),a=this.parseTextures(e.textures,r),o=this.parseMaterials(e.materials,a),l=this.parseObject(e.object,i,o,a,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}static registerGeometry(e,t){Ld[e]=t}parseShapes(e){let t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){let r=new vs().fromJSON(e[n]);t[r.uuid]=r}return t}parseSkeletons(e,t){let n={},i={};if(t.traverse(function(r){r.isBone&&(i[r.uuid]=r)}),e!==void 0)for(let r=0,a=e.length;r<a;r++){let o=new Co().fromJSON(e[r],i);n[o.uuid]=o}return n}parseGeometries(e,t){let n={};if(e!==void 0){let i=new fl;for(let r=0,a=e.length;r<a;r++){let o,l=e[r];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":o=i.parse(l);break;default:l.type in em?o=em[l.type].fromJSON(l,t):l.type in Ld?o=Ld[l.type].fromJSON(l,t):Pe(`ObjectLoader: Unknown geometry type "${l.type}". Use .registerGeometry() before starting the deserialization process.`)}o.uuid=l.uuid,l.name!==void 0&&(o.name=l.name),l.userData!==void 0&&(o.userData=l.userData),n[l.uuid]=o}}return n}parseMaterials(e,t){let n={},i={};if(e!==void 0){let r=new dl;r.setTextures(t);for(let a=0,o=e.length;a<o;a++){let l=e[a];n[l.uuid]===void 0&&(n[l.uuid]=r.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){let t={};if(e!==void 0)for(let n=0;n<e.length;n++){let i=e[n],r=Ss.parse(i);t[r.uuid]=r}return t}parseImages(e,t){let n=this,i={},r;function a(l){return l=n.manager.resolveURL(l),n.manager.itemStart(l),r.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function o(l){if(typeof l=="string"){let c=l,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return a(h)}else return l.data?{data:Xr(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){let l=new Sa(t);r=new Ms(l),r.setCrossOrigin(this.crossOrigin);for(let c=0,h=e.length;c<h;c++){let d=e[c],u=d.url;if(Array.isArray(u)){let f=[];for(let p=0,_=u.length;p<_;p++){let g=u[p],m=o(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new Cn(m.data,m.width,m.height)))}i[d.uuid]=new Zn(f)}else{let f=o(d.url);i[d.uuid]=new Zn(f)}}}return i}async parseImagesAsync(e){let t=this,n={},i;async function r(a){if(typeof a=="string"){let o=a,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(o)?o:t.resourcePath+o;return await i.loadAsync(l)}else return a.data?{data:Xr(a.type,a.data),width:a.width,height:a.height}:null}if(e!==void 0&&e.length>0){i=new Ms(this.manager),i.setCrossOrigin(this.crossOrigin);for(let a=0,o=e.length;a<o;a++){let l=e[a],c=l.url;if(Array.isArray(c)){let h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d],p=await r(f);p!==null&&(p instanceof HTMLImageElement?h.push(p):h.push(new Cn(p.data,p.width,p.height)))}n[l.uuid]=new Zn(h)}else{let h=await r(l.url);n[l.uuid]=new Zn(h)}}}return n}parseTextures(e,t){function n(r,a){return typeof r=="number"?r:(Pe("ObjectLoader.parseTexture: Constant should be in numeric form.",r),a[r])}let i={};if(e!==void 0)for(let r=0,a=e.length;r<a;r++){let o=e[r];o.image===void 0&&Pe('ObjectLoader: No "image" specified for',o.uuid),t[o.image]===void 0&&Pe("ObjectLoader: Undefined image",o.image);let l=t[o.image],c=l.data,h;Array.isArray(c)?(h=new gs,c.length===6&&(h.needsUpdate=!0)):(c&&c.data?h=new Cn:h=new Kt,c&&(h.needsUpdate=!0)),h.source=l,h.uuid=o.uuid,o.name!==void 0&&(h.name=o.name),o.mapping!==void 0&&(h.mapping=n(o.mapping,Z_)),o.channel!==void 0&&(h.channel=o.channel),o.offset!==void 0&&h.offset.fromArray(o.offset),o.repeat!==void 0&&h.repeat.fromArray(o.repeat),o.center!==void 0&&h.center.fromArray(o.center),o.rotation!==void 0&&(h.rotation=o.rotation),o.wrap!==void 0&&(h.wrapS=n(o.wrap[0],cm),h.wrapT=n(o.wrap[1],cm)),o.format!==void 0&&(h.format=o.format),o.internalFormat!==void 0&&(h.internalFormat=o.internalFormat),o.type!==void 0&&(h.type=o.type),o.colorSpace!==void 0&&(h.colorSpace=o.colorSpace),o.minFilter!==void 0&&(h.minFilter=n(o.minFilter,hm)),o.magFilter!==void 0&&(h.magFilter=n(o.magFilter,hm)),o.anisotropy!==void 0&&(h.anisotropy=o.anisotropy),o.flipY!==void 0&&(h.flipY=o.flipY),o.generateMipmaps!==void 0&&(h.generateMipmaps=o.generateMipmaps),o.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=o.premultiplyAlpha),o.unpackAlignment!==void 0&&(h.unpackAlignment=o.unpackAlignment),o.compareFunction!==void 0&&(h.compareFunction=o.compareFunction),o.normalized!==void 0&&(h.normalized=o.normalized),o.userData!==void 0&&(h.userData=o.userData),i[o.uuid]=h}return i}parseObject(e,t,n,i,r){let a;function o(u){return t[u]===void 0&&Pe("ObjectLoader: Undefined geometry",u),t[u]}function l(u){if(u!==void 0){if(Array.isArray(u)){let f=[];for(let p=0,_=u.length;p<_;p++){let g=u[p];n[g]===void 0&&Pe("ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[u]===void 0&&Pe("ObjectLoader: Undefined material",u),n[u]}}function c(u){return i[u]===void 0&&Pe("ObjectLoader: Undefined texture",u),i[u]}let h,d;switch(e.type){case"Scene":a=new Zs,e.background!==void 0&&(Number.isInteger(e.background)?a.background=new Be(e.background):a.background=c(e.background)),e.environment!==void 0&&(a.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?a.fog=new To(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(a.fog=new wo(e.fog.color,e.fog.density)),e.fog.name!==""&&(a.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(a.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(a.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&a.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(a.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&a.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":a=new Zt(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(a.focus=e.focus),e.zoom!==void 0&&(a.zoom=e.zoom),e.filmGauge!==void 0&&(a.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(a.filmOffset=e.filmOffset),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"OrthographicCamera":a=new bs(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(a.zoom=e.zoom),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"AmbientLight":a=new cl(e.color,e.intensity);break;case"DirectionalLight":a=new Es(e.color,e.intensity),a.target=e.target||"";break;case"PointLight":a=new ll(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":a=new hl(e.color,e.intensity,e.width,e.height);break;case"SpotLight":a=new ol(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),a.target=e.target||"";break;case"HemisphereLight":a=new or(e.color,e.groundColor,e.intensity);break;case"LightProbe":let u=new Ma().fromArray(e.sh);a=new ul(u,e.intensity);break;case"SkinnedMesh":h=o(e.geometry),d=l(e.material),a=new Ro(h,d),e.bindMode!==void 0&&(a.bindMode=e.bindMode),e.bindMatrix!==void 0&&a.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(a.skeleton=e.skeleton);break;case"Mesh":h=o(e.geometry),d=l(e.material),a=new Bt(h,d);break;case"InstancedMesh":h=o(e.geometry),d=l(e.material);let f=e.count,p=e.instanceMatrix,_=e.instanceColor;a=new $s(h,d,f),a.instanceMatrix=new Wi(new Float32Array(p.array),16),_!==void 0&&(a.instanceColor=new Wi(new Float32Array(_.array),_.itemSize));break;case"BatchedMesh":h=o(e.geometry),d=l(e.material),a=new Io(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,d),a.geometry=h,a.perObjectFrustumCulled=e.perObjectFrustumCulled,a.sortObjects=e.sortObjects,a._drawRanges=e.drawRanges,a._reservedRanges=e.reservedRanges,a._geometryInfo=e.geometryInfo.map(g=>{let m=null,y=null;return g.boundingBox!==void 0&&(m=new kt().fromJSON(g.boundingBox)),g.boundingSphere!==void 0&&(y=new Ht().fromJSON(g.boundingSphere)),{...g,boundingBox:m,boundingSphere:y}}),a._instanceInfo=e.instanceInfo,a._availableInstanceIds=e._availableInstanceIds,a._availableGeometryIds=e._availableGeometryIds,a._nextIndexStart=e.nextIndexStart,a._nextVertexStart=e.nextVertexStart,a._geometryCount=e.geometryCount,a._maxInstanceCount=e.maxInstanceCount,a._maxVertexCount=e.maxVertexCount,a._maxIndexCount=e.maxIndexCount,a._geometryInitialized=e.geometryInitialized,a._matricesTexture=c(e.matricesTexture.uuid),a._indirectTexture=c(e.indirectTexture.uuid),e.colorsTexture!==void 0&&(a._colorsTexture=c(e.colorsTexture.uuid)),e.boundingSphere!==void 0&&(a.boundingSphere=new Ht().fromJSON(e.boundingSphere)),e.boundingBox!==void 0&&(a.boundingBox=new kt().fromJSON(e.boundingBox));break;case"LOD":a=new Ao;break;case"Line":a=new ci(o(e.geometry),l(e.material));break;case"LineLoop":a=new Lo(o(e.geometry),l(e.material));break;case"LineSegments":a=new Pn(o(e.geometry),l(e.material));break;case"PointCloud":case"Points":a=new Do(o(e.geometry),l(e.material));break;case"Sprite":a=new Ks(l(e.material));break;case"Group":a=new sn;break;case"Bone":a=new sa;break;default:a=new Ct}if(a.uuid=e.uuid,e.name!==void 0&&(a.name=e.name),e.matrix!==void 0?(a.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(a.matrixAutoUpdate=e.matrixAutoUpdate),a.matrixAutoUpdate&&a.matrix.decompose(a.position,a.quaternion,a.scale)):(e.position!==void 0&&a.position.fromArray(e.position),e.rotation!==void 0&&a.rotation.fromArray(e.rotation),e.quaternion!==void 0&&a.quaternion.fromArray(e.quaternion),e.scale!==void 0&&a.scale.fromArray(e.scale)),e.up!==void 0&&a.up.fromArray(e.up),e.pivot!==void 0&&(a.pivot=new E().fromArray(e.pivot)),e.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),e.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=e.morphTargetInfluences.slice()),e.castShadow!==void 0&&(a.castShadow=e.castShadow),e.receiveShadow!==void 0&&(a.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(a.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(a.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(a.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(a.shadow.radius=e.shadow.radius),e.shadow.blurSamples!==void 0&&(a.shadow.blurSamples=e.shadow.blurSamples),e.shadow.focus!==void 0&&(a.shadow.focus=e.shadow.focus),e.shadow.aspect!==void 0&&(a.shadow.aspect=e.shadow.aspect),e.shadow.mapSize!==void 0&&a.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(a.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(a.visible=e.visible),e.frustumCulled!==void 0&&(a.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(a.renderOrder=e.renderOrder),e.static!==void 0&&(a.static=e.static),e.userData!==void 0&&(a.userData=e.userData),e.layers!==void 0&&(a.layers.mask=e.layers),e.children!==void 0){let u=e.children;for(let f=0;f<u.length;f++)a.add(this.parseObject(u[f],t,n,i,r))}if(e.animations!==void 0){let u=e.animations;for(let f=0;f<u.length;f++){let p=u[f];a.animations.push(r[p])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(a.autoUpdate=e.autoUpdate);let u=e.levels;for(let f=0;f<u.length;f++){let p=u[f],_=a.getObjectByProperty("uuid",p.object);_!==void 0&&a.addLevel(_,p.distance,p.hysteresis)}}return a}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){let i=t[n.skeleton];i===void 0?Pe("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){let n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new Ct}})}},Z_={UVMapping:Sl,CubeReflectionMapping:_i,CubeRefractionMapping:Qi,EquirectangularReflectionMapping:La,EquirectangularRefractionMapping:Da,CubeUVReflectionMapping:pr},cm={RepeatWrapping:qr,ClampToEdgeWrapping:Rn,MirroredRepeatWrapping:Zr},hm={NearestFilter:Jt,NearestMipmapNearestFilter:Pu,NearestMipmapLinearFilter:mr,LinearFilter:zt,LinearMipmapNearestFilter:Ua,LinearMipmapLinearFilter:xi},Dd=new WeakMap,Gh=class extends fn{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Pe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Pe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ai.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{Dd.has(a)===!0?(i&&i(Dd.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return ai.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Dd.set(l,c),ai.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});ai.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},ch,Ea=class{static getContext(){return ch===void 0&&(ch=new(window.AudioContext||window.webkitAudioContext)),ch}static setContext(e){ch=e}},Wh=class extends fn{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new $n(this.manager);a.setResponseType("arraybuffer"),a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){try{let c=l.slice(0),h=Ea.getContext(),d=e+"#decode";r.manager.itemStart(d),h.decodeAudioData(c,function(u){t(u),r.manager.itemEnd(d)}).catch(function(u){o(u),r.manager.itemEnd(d)})}catch(c){o(c)}},n,i);function o(l){i?i(l):Ke(l),r.manager.itemError(e)}}},um=new ht,dm=new ht,Ns=new ht,Xh=class{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Zt,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Zt,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){let t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,Ns.copy(e.projectionMatrix);let i=t.eyeSep/2,r=i*t.near/t.focus,a=t.near*Math.tan(ks*t.fov*.5)/t.zoom,o,l;dm.elements[12]=-i,um.elements[12]=i,o=-a*t.aspect+r,l=a*t.aspect+r,Ns.elements[0]=2*t.near/(l-o),Ns.elements[8]=(l+o)/(l-o),this.cameraL.projectionMatrix.copy(Ns),o=-a*t.aspect-r,l=a*t.aspect-r,Ns.elements[0]=2*t.near/(l-o),Ns.elements[8]=(l+o)/(l-o),this.cameraR.projectionMatrix.copy(Ns)}this.cameraL.matrix.copy(e.matrixWorld).multiply(dm),this.cameraL.matrixWorldNeedsUpdate=!0,this.cameraR.matrix.copy(e.matrixWorld).multiply(um),this.cameraR.matrixWorldNeedsUpdate=!0}},kr=-90,Hr=1,pl=class extends Ct{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Zt(kr,Hr,e,t);i.layers=this.layers,this.add(i);let r=new Zt(kr,Hr,e,t);r.layers=this.layers,this.add(r);let a=new Zt(kr,Hr,e,t);a.layers=this.layers,this.add(a);let o=new Zt(kr,Hr,e,t);o.layers=this.layers,this.add(o);let l=new Zt(kr,Hr,e,t);l.layers=this.layers,this.add(l);let c=new Zt(kr,Hr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===fs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ml=class extends Zt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},gl=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=J_.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function J_(){this._document.hidden===!1&&this.reset()}var Fs=new E,Ud=new jt,K_=new E,Os=new E,Bs=new E,Yh=class extends Ct{constructor(){super(),this.type="AudioListener",this.context=Ea.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new gl}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e),this._timer.update();let t=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(Fs,Ud,K_),Os.set(0,0,-1).applyQuaternion(Ud),Bs.set(0,1,0).applyQuaternion(Ud),t.positionX){let n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(Fs.x,n),t.positionY.linearRampToValueAtTime(Fs.y,n),t.positionZ.linearRampToValueAtTime(Fs.z,n),t.forwardX.linearRampToValueAtTime(Os.x,n),t.forwardY.linearRampToValueAtTime(Os.y,n),t.forwardZ.linearRampToValueAtTime(Os.z,n),t.upX.linearRampToValueAtTime(Bs.x,n),t.upY.linearRampToValueAtTime(Bs.y,n),t.upZ.linearRampToValueAtTime(Bs.z,n)}else t.setPosition(Fs.x,Fs.y,Fs.z),t.setOrientation(Os.x,Os.y,Os.z,Bs.x,Bs.y,Bs.z)}},_l=class extends Ct{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){Pe("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;let t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(Pe("Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}copy(e,t){return super.copy(e,t),e.sourceType!=="buffer"?(Pe("Audio: Audio source type cannot be copied."),this):(this.autoplay=e.autoplay,this.buffer=e.buffer,this.detune=e.detune,this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.offset=e.offset,this.duration=e.duration,this.playbackRate=e.playbackRate,this.hasPlaybackControl=e.hasPlaybackControl,this.sourceType=e.sourceType,this.filters=e.filters.slice(),this)}clone(e){return new this.constructor(this.listener).copy(this,e)}},zs=new E,fm=new jt,$_=new E,Vs=new E,qh=class extends _l{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(zs,fm,$_),Vs.set(0,0,1).applyQuaternion(fm);let t=this.panner;if(t.positionX){let n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(zs.x,n),t.positionY.linearRampToValueAtTime(zs.y,n),t.positionZ.linearRampToValueAtTime(zs.z,n),t.orientationX.linearRampToValueAtTime(Vs.x,n),t.orientationY.linearRampToValueAtTime(Vs.y,n),t.orientationZ.linearRampToValueAtTime(Vs.z,n)}else t.setPosition(zs.x,zs.y,zs.z),t.setOrientation(Vs.x,Vs.y,Vs.z)}},Zh=class{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0,t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}},xl=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,a;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,r=e*i+i,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,a=i;r!==a;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){jt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){let a=this._workIndex*r;jt.multiplyQuaternionsFlat(e,a,e,t,e,n),jt.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,r){let a=1-i;for(let o=0;o!==r;++o){let l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[n+a]*i}}},zf="\\[\\]\\.:\\/",j_=new RegExp("["+zf+"]","g"),Vf="[^"+zf+"]",Q_="[^"+zf.replace("\\.","")+"]",ex=/((?:WC+[\/:])*)/.source.replace("WC",Vf),tx=/(WCOD+)?/.source.replace("WCOD",Q_),nx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Vf),ix=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Vf),sx=new RegExp("^"+ex+tx+nx+ix+"$"),rx=["material","materials","bones","map"],Zd=class{constructor(e,t,n){let i=n||Nt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Nt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(j_,"")}static parseTrackName(e){let t=sx.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);rx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Pe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ke("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ke("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ke("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ke("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ke("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ke("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[i];if(a===void 0){let c=t.nodeName;Ke("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ke("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Nt.Composite=Zd;Nt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Nt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Nt.prototype.GetterByBindingType=[Nt.prototype._getValue_direct,Nt.prototype._getValue_array,Nt.prototype._getValue_arrayElement,Nt.prototype._getValue_toArray];Nt.prototype.SetterByBindingTypeAndVersioning=[[Nt.prototype._setValue_direct,Nt.prototype._setValue_direct_setNeedsUpdate,Nt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_array,Nt.prototype._setValue_array_setNeedsUpdate,Nt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_arrayElement,Nt.prototype._setValue_arrayElement_setNeedsUpdate,Nt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Nt.prototype._setValue_fromArray,Nt.prototype._setValue_fromArray_setNeedsUpdate,Nt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Jh=class{constructor(){this.isAnimationObjectGroup=!0,this.uuid=Gn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;let e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};let t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){let e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,r=this._bindings,a=r.length,o,l=e.length,c=this.nCachedObjects_;for(let h=0,d=arguments.length;h!==d;++h){let u=arguments[h],f=u.uuid,p=t[f];if(p===void 0){p=l++,t[f]=p,e.push(u);for(let _=0,g=a;_!==g;++_)r[_].push(new Nt(u,n[_],i[_]))}else if(p<c){o=e[p];let _=--c,g=e[_];t[g.uuid]=p,e[p]=g,t[f]=_,e[_]=u;for(let m=0,y=a;m!==y;++m){let b=r[m],x=b[_],A=b[p];b[p]=x,A===void 0&&(A=new Nt(u,n[m],i[m])),b[_]=A}}else e[p]!==o&&Ke("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){let e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_;for(let a=0,o=arguments.length;a!==o;++a){let l=arguments[a],c=l.uuid,h=t[c];if(h!==void 0&&h>=r){let d=r++,u=e[d];t[u.uuid]=h,e[h]=u,t[c]=d,e[d]=l;for(let f=0,p=i;f!==p;++f){let _=n[f],g=_[d],m=_[h];_[h]=g,_[d]=m}}}this.nCachedObjects_=r}uncache(){let e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_,a=e.length;for(let o=0,l=arguments.length;o!==l;++o){let c=arguments[o],h=c.uuid,d=t[h];if(d!==void 0)if(delete t[h],d<r){let u=--r,f=e[u],p=--a,_=e[p];d!==u&&(t[f.uuid]=d),e[d]=f,u!==p&&(t[_.uuid]=u),e[u]=_,e.pop();for(let g=0,m=i;g!==m;++g){let y=n[g],b=y[u],x=y[p];y[d]=b,y[u]=x,y.pop()}}else{let u=--a,f=e[u];d!==u&&(t[f.uuid]=d),e[d]=f,e.pop();for(let p=0,_=i;p!==_;++p){let g=n[p];g[d]=g[u],g.pop()}}}this.nCachedObjects_=r}subscribe_(e,t){let n=this._bindingsIndicesByPath,i=n[e],r=this._bindings;if(i!==void 0)return r[i];let a=this._paths,o=this._parsedPaths,l=this._objects,c=l.length,h=this.nCachedObjects_,d=new Array(c);i=r.length,n[e]=i,a.push(e),o.push(t),r.push(d);for(let u=h,f=l.length;u!==f;++u){let p=l[u];d[u]=new Nt(p,e,t)}return d}unsubscribe_(e){let t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){let i=this._paths,r=this._parsedPaths,a=this._bindings,o=a.length-1,l=a[o],c=i[o];t[c]=n,a[n]=l,a.pop(),r[n]=r[o],r.pop(),i[n]=i[o],i.pop()}}},yl=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let r=t.tracks,a=r.length,o=new Array(a),l={endingStart:us,endingEnd:us};for(let c=0;c!==a;++c){let h=r[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=bf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let i=this._clip.duration,r=e._clip.duration,a=r/i,o=i/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,r=i.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Ou:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case sc:default:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,r=this._loopCount,a=n===Ef;if(e===0)return r===-1?i:a&&(r&1)===1?t-i:i;if(n===Mf){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){let o=Math.floor(i/t);i-=t*o,r+=Math.abs(o);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=r,this.time=i;if(a&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=ds,i.endingEnd=ds):(e?i.endingStart=this.zeroSlopeAtStart?ds:us:i.endingStart=Kr,t?i.endingEnd=this.zeroSlopeAtEnd?ds:us:i.endingEnd=Kr)}_scheduleFading(e,t,n){let i=this._mixer,r=i.time,a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=t,o[1]=r+e,l[1]=n,this}},ax=new Float32Array(1),Kh=class extends On{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let d=0;d!==r;++d){let u=i[d],f=u.name,p=h[f];if(p!==void 0)++p.referenceCount,a[d]=p;else{if(p=a[d],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}let _=t&&t._propertyBindings[d].binding.parsedPath;p=new xl(Nt.create(n,f,_),u.ValueTypeName,u.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),a[d]=p}o[d].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let d=o.actionByRoot,u=(e._localRoot||this._root).uuid;delete d[u],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,r=this._bindings,a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new xa(new Float32Array(2),new Float32Array(2),1,ax),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let i=t||this._root,r=i.uuid,a=typeof e=="string"?Ss.findByName(i,e):e,o=a!==null?a.uuid:e,l=this._actionsByClip[o],c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=sc),l!==void 0){let d=l.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let h=new yl(this,a,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,r),h}existingAction(e,t){let n=t||this._root,i=n.uuid,r=typeof e=="string"?Ss.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let h=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=h,t[h]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}},$h=class extends ta{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isRenderTarget3D=!0,this.depth=n;for(let r=0;r<this.textures.length;r++){let a=new Xs(null,e,t,n);a.isRenderTargetTexture=!0,a.renderTarget=this,this.textures[r]=a}this._setTextureOptions(i)}},jh=class s{constructor(e){this.value=e}clone(){return new s(this.value.clone===void 0?this.value:this.value.clone())}},ox=0,Qh=class extends On{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:ox++}),this.name="",this.usage=oc,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){let t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(e){this.name=e.name,this.usage=e.usage;let t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){let r=Array.isArray(t[n])?t[n]:[t[n]];for(let a=0;a<r.length;a++)this.uniforms.push(r[a].clone())}return this}clone(){return new this.constructor().copy(this)}},Ji=class extends Js{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}},eu=class{constructor(e,t,n,i,r,a=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=r,this.normalized=a,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}},pm=new ht,wa=class{constructor(e,t,n=0,i=1/0){this.ray=new li(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Ys,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ke("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return pm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(pm),this}intersectObject(e,t=!0,n=[]){return Jd(e,this,n,t),n.sort(mm),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Jd(e[i],this,n,t);return n.sort(mm),n}};function mm(s,e){return s.distance-e.distance}function Jd(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let a=0,o=r.length;a<o;a++)Jd(r[a],e,t,!0)}}var tu=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Pe("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}},ur=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ut(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ut(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},nu=class{constructor(e=1,t=0,n=0){this.radius=e,this.theta=t,this.y=n}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}},iu=class s{static{s.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}},gm=new ae,vl=class{constructor(e=new ae(1/0,1/0),t=new ae(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=gm.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,gm).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},_m=new E,hh=new E,Gr=new E,Wr=new E,Nd=new E,lx=new E,cx=new E,Ta=class{constructor(e=new E,t=new E){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){_m.subVectors(e,this.start),hh.subVectors(this.end,this.start);let n=hh.dot(hh);if(n===0)return 0;let r=hh.dot(_m)/n;return t&&(r=ut(r,0,1)),r}closestPointToPoint(e,t,n){let i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=lx,n=cx){let i=10000000000000001e-32,r,a,o=this.start,l=e.start,c=this.end,h=e.end;Gr.subVectors(c,o),Wr.subVectors(h,l),Nd.subVectors(o,l);let d=Gr.dot(Gr),u=Wr.dot(Wr),f=Wr.dot(Nd);if(d<=i&&u<=i)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(d<=i)r=0,a=f/u,a=ut(a,0,1);else{let p=Gr.dot(Nd);if(u<=i)a=0,r=ut(-p/d,0,1);else{let _=Gr.dot(Wr),g=d*u-_*_;g!==0?r=ut((_*f-p*u)/g,0,1):r=0,a=(_*r+f)/u,a<0?(a=0,r=ut(-p/d,0,1)):a>1&&(a=1,r=ut((_-p)/d,0,1))}}return t.copy(o).addScaledVector(Gr,r),n.copy(l).addScaledVector(Wr,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}},xm=new E,su=class extends Ct{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";let n=new pt,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let a=0,o=1,l=32;a<l;a++,o++){let c=a/l*Math.PI*2,h=o/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new ze(i,3));let r=new nn({fog:!1,toneMapped:!1});this.cone=new Pn(n,r),this.add(this.cone),this.update()}dispose(){super.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorldNeedsUpdate=!0;let e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),xm.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(xm),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}},hs=new E,uh=new ht,Fd=new ht,ru=class extends Pn{constructor(e){let t=Pg(e),n=new pt,i=[],r=[];for(let c=0;c<t.length;c++){let h=t[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(0,0,0),r.push(0,0,0))}n.setAttribute("position",new ze(i,3)),n.setAttribute("color",new ze(r,3));let a=new nn({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,a),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1;let o=new Be(255),l=new Be(65280);this.setColors(o,l)}updateMatrixWorld(e){let t=this.bones,n=this.geometry,i=n.getAttribute("position");Fd.copy(this.root.matrixWorld).invert();for(let r=0,a=0;r<t.length;r++){let o=t[r];o.parent&&o.parent.isBone&&(uh.multiplyMatrices(Fd,o.matrixWorld),hs.setFromMatrixPosition(uh),i.setXYZ(a,hs.x,hs.y,hs.z),uh.multiplyMatrices(Fd,o.parent.matrixWorld),hs.setFromMatrixPosition(uh),i.setXYZ(a+1,hs.x,hs.y,hs.z),a+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}setColors(e,t){let i=this.geometry.getAttribute("color");for(let r=0;r<i.count;r+=2)i.setXYZ(r,e.r,e.g,e.b),i.setXYZ(r+1,t.r,t.g,t.b);return i.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function Pg(s){let e=[];s.isBone===!0&&e.push(s);for(let t=0;t<s.children.length;t++)e.push(...Pg(s.children[t]));return e}var au=class extends Bt{constructor(e,t,n){let i=new di(t,4,2),r=new Gt({wireframe:!0,fog:!1,toneMapped:!1});super(i,r),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}},hx=new E,ym=new Be,vm=new Be,ou=class extends Ct{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";let i=new pa(t);i.rotateY(Math.PI*.5),this.material=new Gt({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);let r=i.getAttribute("position"),a=new Float32Array(r.count*3);i.setAttribute("color",new Ft(a,3)),this.add(new Bt(i,this.material)),this.update()}dispose(){super.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){let e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{let t=e.geometry.getAttribute("color");ym.copy(this.light.color),vm.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){let r=n<i/2?ym:vm;t.setXYZ(n,r.r,r.g,r.b)}t.needsUpdate=!0}this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),e.lookAt(hx.setFromMatrixPosition(this.light.matrixWorld).negate())}},lu=class extends Pn{constructor(e=10,t=10,n=4473924,i=8947848){n=new Be(n),i=new Be(i);let r=t/2,a=e/t,o=e/2,l=[],c=[];for(let u=0,f=0,p=-o;u<=t;u++,p+=a){l.push(-o,0,p,o,0,p),l.push(p,0,-o,p,0,o);let _=u===r?n:i;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}let h=new pt;h.setAttribute("position",new ze(l,3)),h.setAttribute("color",new ze(c,3));let d=new nn({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},cu=class extends Pn{constructor(e=10,t=16,n=8,i=64,r=4473924,a=8947848){r=new Be(r),a=new Be(a);let o=[],l=[];if(t>1)for(let d=0;d<t;d++){let u=d/t*(Math.PI*2),f=Math.sin(u)*e,p=Math.cos(u)*e;o.push(0,0,0),o.push(f,0,p);let _=d&1?r:a;l.push(_.r,_.g,_.b),l.push(_.r,_.g,_.b)}for(let d=0;d<n;d++){let u=d&1?r:a,f=e-e/n*d;for(let p=0;p<i;p++){let _=p/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f;o.push(g,0,m),l.push(u.r,u.g,u.b),_=(p+1)/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f,o.push(g,0,m),l.push(u.r,u.g,u.b)}}let c=new pt;c.setAttribute("position",new ze(o,3)),c.setAttribute("color",new ze(l,3));let h=new nn({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Sm=new E,dh=new E,Mm=new E,hu=class extends Ct{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new pt;i.setAttribute("position",new ze([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));let r=new nn({fog:!1,toneMapped:!1});this.lightPlane=new ci(i,r),this.add(this.lightPlane),i=new pt,i.setAttribute("position",new ze([0,0,0,0,0,1],3)),this.targetLine=new ci(i,r),this.add(this.targetLine),this.update()}dispose(){super.dispose(),this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Sm.setFromMatrixPosition(this.light.matrixWorld),dh.setFromMatrixPosition(this.light.target.matrixWorld),Mm.subVectors(dh,Sm),this.lightPlane.lookAt(dh),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(dh),this.targetLine.scale.z=Mm.length()}},fh=new E,qt=new cr,uu=class extends Pn{constructor(e){let t=new pt,n=new nn({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],r=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(p,_){l(p),l(_)}function l(p){i.push(0,0,0),r.push(0,0,0),a[p]===void 0&&(a[p]=[]),a[p].push(i.length/3-1)}t.setAttribute("position",new ze(i,3)),t.setAttribute("color",new ze(r,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();let c=new Be(16755200),h=new Be(16711680),d=new Be(43775),u=new Be(16777215),f=new Be(3355443);this.setColors(c,h,d,u,f)}setColors(e,t,n,i,r){let o=this.geometry.getAttribute("color");return o.setXYZ(0,e.r,e.g,e.b),o.setXYZ(1,e.r,e.g,e.b),o.setXYZ(2,e.r,e.g,e.b),o.setXYZ(3,e.r,e.g,e.b),o.setXYZ(4,e.r,e.g,e.b),o.setXYZ(5,e.r,e.g,e.b),o.setXYZ(6,e.r,e.g,e.b),o.setXYZ(7,e.r,e.g,e.b),o.setXYZ(8,e.r,e.g,e.b),o.setXYZ(9,e.r,e.g,e.b),o.setXYZ(10,e.r,e.g,e.b),o.setXYZ(11,e.r,e.g,e.b),o.setXYZ(12,e.r,e.g,e.b),o.setXYZ(13,e.r,e.g,e.b),o.setXYZ(14,e.r,e.g,e.b),o.setXYZ(15,e.r,e.g,e.b),o.setXYZ(16,e.r,e.g,e.b),o.setXYZ(17,e.r,e.g,e.b),o.setXYZ(18,e.r,e.g,e.b),o.setXYZ(19,e.r,e.g,e.b),o.setXYZ(20,e.r,e.g,e.b),o.setXYZ(21,e.r,e.g,e.b),o.setXYZ(22,e.r,e.g,e.b),o.setXYZ(23,e.r,e.g,e.b),o.setXYZ(24,t.r,t.g,t.b),o.setXYZ(25,t.r,t.g,t.b),o.setXYZ(26,t.r,t.g,t.b),o.setXYZ(27,t.r,t.g,t.b),o.setXYZ(28,t.r,t.g,t.b),o.setXYZ(29,t.r,t.g,t.b),o.setXYZ(30,t.r,t.g,t.b),o.setXYZ(31,t.r,t.g,t.b),o.setXYZ(32,n.r,n.g,n.b),o.setXYZ(33,n.r,n.g,n.b),o.setXYZ(34,n.r,n.g,n.b),o.setXYZ(35,n.r,n.g,n.b),o.setXYZ(36,n.r,n.g,n.b),o.setXYZ(37,n.r,n.g,n.b),o.setXYZ(38,i.r,i.g,i.b),o.setXYZ(39,i.r,i.g,i.b),o.setXYZ(40,r.r,r.g,r.b),o.setXYZ(41,r.r,r.g,r.b),o.setXYZ(42,r.r,r.g,r.b),o.setXYZ(43,r.r,r.g,r.b),o.setXYZ(44,r.r,r.g,r.b),o.setXYZ(45,r.r,r.g,r.b),o.setXYZ(46,r.r,r.g,r.b),o.setXYZ(47,r.r,r.g,r.b),o.setXYZ(48,r.r,r.g,r.b),o.setXYZ(49,r.r,r.g,r.b),o.needsUpdate=!0,this}update(){let e=this.geometry,t=this.pointMap,n=1,i=1,r,a;if(qt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)r=1,a=0;else if(this.camera.coordinateSystem===Fn)r=-1,a=1;else if(this.camera.coordinateSystem===fs)r=0,a=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);$t("c",t,e,qt,0,0,r),$t("t",t,e,qt,0,0,a),$t("n1",t,e,qt,-n,-i,r),$t("n2",t,e,qt,n,-i,r),$t("n3",t,e,qt,-n,i,r),$t("n4",t,e,qt,n,i,r),$t("f1",t,e,qt,-n,-i,a),$t("f2",t,e,qt,n,-i,a),$t("f3",t,e,qt,-n,i,a),$t("f4",t,e,qt,n,i,a),$t("u1",t,e,qt,n*.7,i*1.1,r),$t("u2",t,e,qt,-n*.7,i*1.1,r),$t("u3",t,e,qt,0,i*2,r),$t("cf1",t,e,qt,-n,0,a),$t("cf2",t,e,qt,n,0,a),$t("cf3",t,e,qt,0,-i,a),$t("cf4",t,e,qt,0,i,a),$t("cn1",t,e,qt,-n,0,r),$t("cn2",t,e,qt,n,0,r),$t("cn3",t,e,qt,0,-i,r),$t("cn4",t,e,qt,0,i,r),e.getAttribute("position").needsUpdate=!0}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function $t(s,e,t,n,i,r,a){fh.set(i,r,a).unproject(n);let o=e[s];if(o!==void 0){let l=t.getAttribute("position");for(let c=0,h=o.length;c<h;c++)l.setXYZ(o[c],fh.x,fh.y,fh.z)}}var ph=new kt,du=class extends Pn{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),r=new pt;r.setIndex(new Ft(n,1)),r.setAttribute("position",new Ft(i,3)),super(r,new nn({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&ph.setFromObject(this.object),ph.isEmpty())return;let e=ph.min,t=ph.max,n=this.geometry.attributes.position,i=n.array;i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=e.x,i[4]=t.y,i[5]=t.z,i[6]=e.x,i[7]=e.y,i[8]=t.z,i[9]=t.x,i[10]=e.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=e.z,i[15]=e.x,i[16]=t.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=t.x,i[22]=e.y,i[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},fu=class extends Pn{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new pt;r.setIndex(new Ft(n,1)),r.setAttribute("position",new ze(i,3)),super(r,new nn({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){let t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},pu=class extends ci{constructor(e,t=1,n=16776960){let i=n,r=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],a=new pt;a.setAttribute("position",new ze(r,3)),a.computeBoundingSphere(),super(a,new nn({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;let o=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new pt;l.setAttribute("position",new ze(o,3)),l.computeBoundingSphere(),this.add(new Bt(l,new Gt({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}},bm=new E,mh,Od,mu=class extends Ct{constructor(e=new E(0,0,1),t=new E(0,0,0),n=1,i=16776960,r=n*.2,a=r*.2){super(),this.type="ArrowHelper",mh===void 0&&(mh=new pt,mh.setAttribute("position",new ze([0,0,0,0,1,0],3)),Od=new la(.5,1,5,1),Od.translate(0,-.5,0)),this.position.copy(t),this.line=new ci(mh,new nn({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Bt(Od,new Gt({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{bm.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(bm,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},gu=class extends Pn{constructor(e=1){let t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new pt;i.setAttribute("position",new ze(t,3)),i.setAttribute("color",new ze(n,3));let r=new nn({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,t,n){let i=new Be,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(t),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},_u=class{constructor(){this.type="ShapePath",this.color=new Be,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(e,t){return this.currentPath=new ys,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,r,a){return this.currentPath.bezierCurveTo(e,t,n,i,r,a),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(){function e(l,c){let h=!1,d=c.length;for(let u=0,f=d-1;u<d;f=u++){let p=c[u],_=c[f];p.y>l.y!=_.y>l.y&&l.x<(_.x-p.x)*(l.y-p.y)/(_.y-p.y)+p.x&&(h=!h)}return h}function t(l,c){let h=c.getCenter(new ae);if(e(h,l))return h;let d=h.y,u=[],f=l.length;for(let p=0;p<f;p++){let _=l[p],g=l[(p+1)%f];if(_.y>d!=g.y>d){let m=_.x+(d-_.y)*(g.x-_.x)/(g.y-_.y);u.push(m)}}return u.length>1&&(u.sort((p,_)=>p-_),h.x=(u[0]+u[1])/2),h}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(Pe('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");let i=n==="nonzero"?(l=>l!==0):(l=>(l&1)!==0),r=[];for(let l of this.subPaths){let c=l.getPoints();if(c.length<3)continue;let h=Jn.area(c);if(h===0)continue;let d=new vl;for(let u=0;u<c.length;u++)d.expandByPoint(c[u]);r.push({subPath:l,points:c,boundingBox:d,interiorPoint:t(c,d),absArea:Math.abs(h),winding:h<0?-1:1,container:null,exclude:!1,role:null})}r.sort((l,c)=>c.absArea-l.absArea);for(let l=0;l<r.length;l++){let c=r[l],h=0;for(let d=l-1;d>=0;d--){let u=r[d];if(u.boundingBox.containsBox(c.boundingBox)&&e(c.interiorPoint,u.points)){c.container=u.exclude?u.container:u,h=u.winding,c.winding+=h;break}}i(c.winding)===i(h)&&(c.exclude=!0)}for(let l of r)l.exclude||(l.role=l.container===null||l.container.role==="hole"?"outer":"hole");let a=[],o=new Map;for(let l of r){if(l.exclude||l.role!=="outer")continue;let c=new vs;c.curves=l.subPath.curves,a.push(c),o.set(l,c)}for(let l of r){if(l.exclude||l.role!=="hole")continue;let c=o.get(l.container);if(!c)continue;let h=new ys;h.curves=l.subPath.curves,c.holes.push(h)}return a}},Aa=class extends On{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function ux(s,e){let t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2):(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0),s}function dx(s,e){let t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0):(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2),s}function fx(s){return s.repeat.x=1,s.repeat.y=1,s.offset.x=0,s.offset.y=0,s}function zu(s,e,t,n){let i=px(n);switch(t){case Nu:return s*e;case wl:return s*e/i.components*i.byteLength;case Na:return s*e/i.components*i.byteLength;case ts:return s*e*2/i.components*i.byteLength;case Tl:return s*e*2/i.components*i.byteLength;case Fu:return s*e*3/i.components*i.byteLength;case Sn:return s*e*4/i.components*i.byteLength;case Al:return s*e*4/i.components*i.byteLength;case Fa:case Oa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Ba:case za:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Cl:case Il:return Math.max(s,16)*Math.max(e,8)/4;case Rl:case Pl:return Math.max(s,8)*Math.max(e,8)/2;case Ll:case Dl:case Nl:case Fl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Ul:case Va:case Ol:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Bl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case zl:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Vl:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case kl:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Hl:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Gl:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Wl:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Xl:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Yl:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case ql:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Zl:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Jl:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Kl:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case $l:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case jl:case Ql:case ec:return Math.ceil(s/4)*Math.ceil(e/4)*16;case tc:case nc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case ka:case ic:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function px(s){switch(s){case Ln:case Iu:return{byteLength:1,components:1};case gr:case Lu:case Qn:return{byteLength:2,components:1};case bl:case El:return{byteLength:2,components:4};case Xn:case Ml:case vn:return{byteLength:4,components:1};case Du:case Uu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}var xu=class{static contain(e,t){return ux(e,t)}static cover(e,t){return dx(e,t)}static fill(e){return fx(e)}static getByteLength(e,t,n,i){return zu(e,t,n,i)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function jg(){let s=null,e=!1,t=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),t(r,a)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function mx(s){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(s.bindBuffer(c,o),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){let p=d[u],_=d[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){let _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var gx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_x=`#ifdef USE_ALPHAHASH
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
#endif`,xx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Sx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mx=`#ifdef USE_AOMAP
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
#endif`,bx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ex=`#ifdef USE_BATCHING
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
#endif`,wx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Tx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ax=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Cx=`#ifdef USE_IRIDESCENCE
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
#endif`,Px=`#ifdef USE_BUMPMAP
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
#endif`,Ix=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Lx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Dx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ux=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Nx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Fx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ox=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Bx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,zx=`#define PI 3.141592653589793
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
} // validated`,Vx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,kx=`vec3 transformedNormal = objectNormal;
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
#endif`,Hx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yx="gl_FragColor = linearToOutputTexel( gl_FragColor );",qx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Zx=`#ifdef USE_ENVMAP
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
#endif`,Jx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Kx=`#ifdef USE_ENVMAP
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
#endif`,$x=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,jx=`#ifdef USE_ENVMAP
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
#endif`,Qx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ey=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ty=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ny=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,iy=`#ifdef USE_GRADIENTMAP
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
}`,sy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ry=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ay=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,oy=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ly=`#ifdef USE_ENVMAP
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
#endif`,cy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fy=`PhysicalMaterial material;
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
#endif`,py=`uniform sampler2D dfgLUT;
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
}`,my=`
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
#endif`,gy=`#if defined( RE_IndirectDiffuse )
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
#endif`,_y=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xy=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,yy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,My=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,by=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ey=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ty=`#if defined( USE_POINTS_UV )
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
#endif`,Ay=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ry=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Py=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Iy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ly=`#ifdef USE_MORPHTARGETS
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
#endif`,Dy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ny=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Fy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Oy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,By=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,zy=`#ifdef USE_NORMALMAP
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
#endif`,Vy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ky=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Yy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Zy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Jy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ky=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$y=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ev=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,tv=`float getShadowMask() {
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
}`,nv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,iv=`#ifdef USE_SKINNING
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
#endif`,sv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rv=`#ifdef USE_SKINNING
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
#endif`,av=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ov=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,cv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hv=`#ifdef USE_TRANSMISSION
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
#endif`,uv=`#ifdef USE_TRANSMISSION
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
#endif`,dv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,gv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_v=`uniform sampler2D t2D;
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
}`,xv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,vv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mv=`#include <common>
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
}`,bv=`#if DEPTH_PACKING == 3200
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
}`,Ev=`#define DISTANCE
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
}`,wv=`#define DISTANCE
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
}`,Tv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Av=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rv=`uniform float scale;
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
}`,Cv=`uniform vec3 diffuse;
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
}`,Pv=`#include <common>
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
}`,Iv=`uniform vec3 diffuse;
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
}`,Lv=`#define LAMBERT
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
}`,Dv=`#define LAMBERT
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
}`,Uv=`#define MATCAP
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
}`,Nv=`#define MATCAP
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
}`,Fv=`#define NORMAL
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
}`,Ov=`#define NORMAL
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
}`,Bv=`#define PHONG
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
}`,zv=`#define PHONG
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
}`,Vv=`#define STANDARD
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
}`,kv=`#define STANDARD
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
}`,Hv=`#define TOON
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
}`,Gv=`#define TOON
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
}`,Wv=`uniform float size;
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
}`,Xv=`uniform vec3 diffuse;
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
}`,Yv=`#include <common>
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
}`,qv=`uniform vec3 color;
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
}`,Zv=`uniform float rotation;
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
}`,Jv=`uniform vec3 diffuse;
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
}`,yt={alphahash_fragment:gx,alphahash_pars_fragment:_x,alphamap_fragment:xx,alphamap_pars_fragment:yx,alphatest_fragment:vx,alphatest_pars_fragment:Sx,aomap_fragment:Mx,aomap_pars_fragment:bx,batching_pars_vertex:Ex,batching_vertex:wx,begin_vertex:Tx,beginnormal_vertex:Ax,bsdfs:Rx,iridescence_fragment:Cx,bumpmap_pars_fragment:Px,clipping_planes_fragment:Ix,clipping_planes_pars_fragment:Lx,clipping_planes_pars_vertex:Dx,clipping_planes_vertex:Ux,color_fragment:Nx,color_pars_fragment:Fx,color_pars_vertex:Ox,color_vertex:Bx,common:zx,cube_uv_reflection_fragment:Vx,defaultnormal_vertex:kx,displacementmap_pars_vertex:Hx,displacementmap_vertex:Gx,emissivemap_fragment:Wx,emissivemap_pars_fragment:Xx,colorspace_fragment:Yx,colorspace_pars_fragment:qx,envmap_fragment:Zx,envmap_common_pars_fragment:Jx,envmap_pars_fragment:Kx,envmap_pars_vertex:$x,envmap_physical_pars_fragment:ly,envmap_vertex:jx,fog_vertex:Qx,fog_pars_vertex:ey,fog_fragment:ty,fog_pars_fragment:ny,gradientmap_pars_fragment:iy,lightmap_pars_fragment:sy,lights_lambert_fragment:ry,lights_lambert_pars_fragment:ay,lights_pars_begin:oy,lights_toon_fragment:cy,lights_toon_pars_fragment:hy,lights_phong_fragment:uy,lights_phong_pars_fragment:dy,lights_physical_fragment:fy,lights_physical_pars_fragment:py,lights_fragment_begin:my,lights_fragment_maps:gy,lights_fragment_end:_y,lightprobes_pars_fragment:xy,logdepthbuf_fragment:yy,logdepthbuf_pars_fragment:vy,logdepthbuf_pars_vertex:Sy,logdepthbuf_vertex:My,map_fragment:by,map_pars_fragment:Ey,map_particle_fragment:wy,map_particle_pars_fragment:Ty,metalnessmap_fragment:Ay,metalnessmap_pars_fragment:Ry,morphinstance_vertex:Cy,morphcolor_vertex:Py,morphnormal_vertex:Iy,morphtarget_pars_vertex:Ly,morphtarget_vertex:Dy,normal_fragment_begin:Uy,normal_fragment_maps:Ny,normal_pars_fragment:Fy,normal_pars_vertex:Oy,normal_vertex:By,normalmap_pars_fragment:zy,clearcoat_normal_fragment_begin:Vy,clearcoat_normal_fragment_maps:ky,clearcoat_pars_fragment:Hy,iridescence_pars_fragment:Gy,opaque_fragment:Wy,packing:Xy,premultiplied_alpha_fragment:Yy,project_vertex:qy,dithering_fragment:Zy,dithering_pars_fragment:Jy,roughnessmap_fragment:Ky,roughnessmap_pars_fragment:$y,shadowmap_pars_fragment:jy,shadowmap_pars_vertex:Qy,shadowmap_vertex:ev,shadowmask_pars_fragment:tv,skinbase_vertex:nv,skinning_pars_vertex:iv,skinning_vertex:sv,skinnormal_vertex:rv,specularmap_fragment:av,specularmap_pars_fragment:ov,tonemapping_fragment:lv,tonemapping_pars_fragment:cv,transmission_fragment:hv,transmission_pars_fragment:uv,uv_pars_fragment:dv,uv_pars_vertex:fv,uv_vertex:pv,worldpos_vertex:mv,background_vert:gv,background_frag:_v,backgroundCube_vert:xv,backgroundCube_frag:yv,cube_vert:vv,cube_frag:Sv,depth_vert:Mv,depth_frag:bv,distance_vert:Ev,distance_frag:wv,equirect_vert:Tv,equirect_frag:Av,linedashed_vert:Rv,linedashed_frag:Cv,meshbasic_vert:Pv,meshbasic_frag:Iv,meshlambert_vert:Lv,meshlambert_frag:Dv,meshmatcap_vert:Uv,meshmatcap_frag:Nv,meshnormal_vert:Fv,meshnormal_frag:Ov,meshphong_vert:Bv,meshphong_frag:zv,meshphysical_vert:Vv,meshphysical_frag:kv,meshtoon_vert:Hv,meshtoon_frag:Gv,points_vert:Wv,points_frag:Xv,shadow_vert:Yv,shadow_frag:qv,sprite_vert:Zv,sprite_frag:Jv},Ce={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ft}},envmap:{envMap:{value:null},envMapRotation:{value:new ft},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ft},normalScale:{value:new ae(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new E},probesMax:{value:new E},probesResolution:{value:new E}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0},uvTransform:{value:new ft}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new ae(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ft},alphaMap:{value:null},alphaMapTransform:{value:new ft},alphaTest:{value:0}}},wn={basic:{uniforms:En([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:yt.meshbasic_vert,fragmentShader:yt.meshbasic_frag},lambert:{uniforms:En([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Be(0)},envMapIntensity:{value:1}}]),vertexShader:yt.meshlambert_vert,fragmentShader:yt.meshlambert_frag},phong:{uniforms:En([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:yt.meshphong_vert,fragmentShader:yt.meshphong_frag},standard:{uniforms:En([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag},toon:{uniforms:En([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new Be(0)}}]),vertexShader:yt.meshtoon_vert,fragmentShader:yt.meshtoon_frag},matcap:{uniforms:En([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:yt.meshmatcap_vert,fragmentShader:yt.meshmatcap_frag},points:{uniforms:En([Ce.points,Ce.fog]),vertexShader:yt.points_vert,fragmentShader:yt.points_frag},dashed:{uniforms:En([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:yt.linedashed_vert,fragmentShader:yt.linedashed_frag},depth:{uniforms:En([Ce.common,Ce.displacementmap]),vertexShader:yt.depth_vert,fragmentShader:yt.depth_frag},normal:{uniforms:En([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:yt.meshnormal_vert,fragmentShader:yt.meshnormal_frag},sprite:{uniforms:En([Ce.sprite,Ce.fog]),vertexShader:yt.sprite_vert,fragmentShader:yt.sprite_frag},background:{uniforms:{uvTransform:{value:new ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:yt.background_vert,fragmentShader:yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ft}},vertexShader:yt.backgroundCube_vert,fragmentShader:yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:yt.cube_vert,fragmentShader:yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:yt.equirect_vert,fragmentShader:yt.equirect_frag},distance:{uniforms:En([Ce.common,Ce.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:yt.distance_vert,fragmentShader:yt.distance_frag},shadow:{uniforms:En([Ce.lights,Ce.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:yt.shadow_vert,fragmentShader:yt.shadow_frag}};wn.physical={uniforms:En([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ft},clearcoatNormalScale:{value:new ae(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ft},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ft},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ft},transmissionSamplerSize:{value:new ae},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ft},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ft},anisotropyVector:{value:new ae},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ft}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag};var Vu={r:0,b:0,g:0},Kv=new ht,Qg=new ft;Qg.set(-1,0,0,0,1,0,0,0,1);function $v(s,e,t,n,i,r){let a=new Be(0),o=i===!0?0:1,l,c,h=null,d=0,u=null;function f(y){let b=y.isScene===!0?y.background:null;if(b&&b.isTexture){let x=y.backgroundBlurriness>0;b=e.get(b,x)}return b}function p(y){let b=!1,x=f(y);x===null?g(a,o):x&&x.isColor&&(g(x,1),b=!0);let A=s.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(y,b){let x=f(b);x&&(x.isCubeTexture||x.mapping===pr)?(c===void 0&&(c=new Bt(new Bn(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:xr(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Kv.makeRotationFromEuler(b.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Qg),c.material.toneMapped=Mt.getTransfer(x.colorSpace)!==Dt,(h!==x||d!==x.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=x,d=x.version,u=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Bt(new ui(2,2),new dn({name:"BackgroundMaterial",uniforms:xr(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:ji,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=Mt.getTransfer(x.colorSpace)!==Dt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||d!==x.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=x,d=x.version,u=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function g(y,b){y.getRGB(Vu,Of(s)),t.buffers.color.setClear(Vu.r,Vu.g,Vu.b,b,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,b=1){a.set(y),o=b,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,g(a,o)},render:p,addToRenderList:_,dispose:m}}function jv(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,a=!1;function o(F,H,X,N,B){let V=!1,W=d(F,N,X,H);r!==W&&(r=W,c(r.object)),V=f(F,N,X,B),V&&p(F,N,X,B),B!==null&&e.update(B,s.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,x(F,H,X,N),B!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return s.createVertexArray()}function c(F){return s.bindVertexArray(F)}function h(F){return s.deleteVertexArray(F)}function d(F,H,X,N){let B=N.wireframe===!0,V=n[H.id];V===void 0&&(V={},n[H.id]=V);let W=F.isInstancedMesh===!0?F.id:0,ie=V[W];ie===void 0&&(ie={},V[W]=ie);let Y=ie[X.id];Y===void 0&&(Y={},ie[X.id]=Y);let $=Y[B];return $===void 0&&($=u(l()),Y[B]=$),$}function u(F){let H=[],X=[],N=[];for(let B=0;B<t;B++)H[B]=0,X[B]=0,N[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:X,attributeDivisors:N,object:F,attributes:{},index:null}}function f(F,H,X,N){let B=r.attributes,V=H.attributes,W=0,ie=X.getAttributes();for(let Y in ie)if(ie[Y].location>=0){let se=B[Y],Ge=V[Y];if(Ge===void 0&&(Y==="instanceMatrix"&&F.instanceMatrix&&(Ge=F.instanceMatrix),Y==="instanceColor"&&F.instanceColor&&(Ge=F.instanceColor)),se===void 0||se.attribute!==Ge||Ge&&se.data!==Ge.data)return!0;W++}return r.attributesNum!==W||r.index!==N}function p(F,H,X,N){let B={},V=H.attributes,W=0,ie=X.getAttributes();for(let Y in ie)if(ie[Y].location>=0){let se=V[Y];se===void 0&&(Y==="instanceMatrix"&&F.instanceMatrix&&(se=F.instanceMatrix),Y==="instanceColor"&&F.instanceColor&&(se=F.instanceColor));let Ge={};Ge.attribute=se,se&&se.data&&(Ge.data=se.data),B[Y]=Ge,W++}r.attributes=B,r.attributesNum=W,r.index=N}function _(){let F=r.newAttributes;for(let H=0,X=F.length;H<X;H++)F[H]=0}function g(F){m(F,0)}function m(F,H){let X=r.newAttributes,N=r.enabledAttributes,B=r.attributeDivisors;X[F]=1,N[F]===0&&(s.enableVertexAttribArray(F),N[F]=1),B[F]!==H&&(s.vertexAttribDivisor(F,H),B[F]=H)}function y(){let F=r.newAttributes,H=r.enabledAttributes;for(let X=0,N=H.length;X<N;X++)H[X]!==F[X]&&(s.disableVertexAttribArray(X),H[X]=0)}function b(F,H,X,N,B,V,W){W===!0?s.vertexAttribIPointer(F,H,X,B,V):s.vertexAttribPointer(F,H,X,N,B,V)}function x(F,H,X,N){_();let B=N.attributes,V=X.getAttributes(),W=H.defaultAttributeValues;for(let ie in V){let Y=V[ie];if(Y.location>=0){let $=B[ie];if($===void 0&&(ie==="instanceMatrix"&&F.instanceMatrix&&($=F.instanceMatrix),ie==="instanceColor"&&F.instanceColor&&($=F.instanceColor)),$!==void 0){let se=$.normalized,Ge=$.itemSize,Ae=e.get($);if(Ae===void 0)continue;let bt=Ae.buffer,nt=Ae.type,it=Ae.bytesPerElement,Q=nt===s.INT||nt===s.UNSIGNED_INT||$.gpuType===Ml;if($.isInterleavedBufferAttribute){let le=$.data,Se=le.stride,Ue=$.offset;if(le.isInstancedInterleavedBuffer){for(let Fe=0;Fe<Y.locationSize;Fe++)m(Y.location+Fe,le.meshPerAttribute);F.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let Fe=0;Fe<Y.locationSize;Fe++)g(Y.location+Fe);s.bindBuffer(s.ARRAY_BUFFER,bt);for(let Fe=0;Fe<Y.locationSize;Fe++)b(Y.location+Fe,Ge/Y.locationSize,nt,se,Se*it,(Ue+Ge/Y.locationSize*Fe)*it,Q)}else{if($.isInstancedBufferAttribute){for(let le=0;le<Y.locationSize;le++)m(Y.location+le,$.meshPerAttribute);F.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let le=0;le<Y.locationSize;le++)g(Y.location+le);s.bindBuffer(s.ARRAY_BUFFER,bt);for(let le=0;le<Y.locationSize;le++)b(Y.location+le,Ge/Y.locationSize,nt,se,Ge*it,Ge/Y.locationSize*le*it,Q)}}else if(W!==void 0){let se=W[ie];if(se!==void 0)switch(se.length){case 2:s.vertexAttrib2fv(Y.location,se);break;case 3:s.vertexAttrib3fv(Y.location,se);break;case 4:s.vertexAttrib4fv(Y.location,se);break;default:s.vertexAttrib1fv(Y.location,se)}}}}y()}function A(){R();for(let F in n){let H=n[F];for(let X in H){let N=H[X];for(let B in N){let V=N[B];for(let W in V)h(V[W].object),delete V[W];delete N[B]}}delete n[F]}}function T(F){if(n[F.id]===void 0)return;let H=n[F.id];for(let X in H){let N=H[X];for(let B in N){let V=N[B];for(let W in V)h(V[W].object),delete V[W];delete N[B]}}delete n[F.id]}function D(F){for(let H in n){let X=n[H];for(let N in X){let B=X[N];if(B[F.id]===void 0)continue;let V=B[F.id];for(let W in V)h(V[W].object),delete V[W];delete B[F.id]}}}function v(F){for(let H in n){let X=n[H],N=F.isInstancedMesh===!0?F.id:0,B=X[N];if(B!==void 0){for(let V in B){let W=B[V];for(let ie in W)h(W[ie].object),delete W[ie];delete B[V]}delete X[N],Object.keys(X).length===0&&delete n[H]}}}function R(){I(),a=!0,r!==i&&(r=i,c(r.object))}function I(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:R,resetDefaultState:I,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:v,releaseStatesOfProgram:D,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function Qv(s,e,t){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function eS(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let D=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(D){return!(D!==Sn&&n.convert(D)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(D){let v=D===Qn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==Ln&&D!==vn&&!v&&n.convert(D)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(D){if(D==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Pe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Pe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:x,maxSamples:A,samples:T}}function tS(s){let e=this,t=null,n=0,i=!1,r=!1,a=new Nn,o=new ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let p=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,m=s.get(d);if(!i||p===null||p.length===0||r&&!g)r?h(null):c();else{let y=r?0:n,b=y*4,x=m.clippingState||null;l.value=x,x=h(p,u,b,f);for(let A=0;A!==b;++A)x[A]=t[A];m.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,p){let _=d!==null?d.length:0,g=null;if(_!==0){if(g=l.value,p!==!0||g===null){let m=f+_*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<m)&&(g=new Float32Array(m));for(let b=0,x=f;b!==_;++b,x+=4)a.copy(d[b]).applyMatrix4(y,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}var Wa=4,nS=6,iS=20,sS=256,lc=new bs,Ig=new Be,kf=null,Hf=0,Gf=0,Wf=!1,rS=new E,yr=new E,uc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:a=256,position:o=rS}=r;kf=this._renderer.getRenderTarget(),Hf=this._renderer.getActiveCubeFace(),Gf=this._renderer.getActiveMipmapLevel(),Wf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ug(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(kf,Hf,Gf),this._renderer.xr.enabled=Wf,e.scissorTest=!1,Ga(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===_i||e.mapping===Qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),kf=this._renderer.getRenderTarget(),Hf=this._renderer.getActiveCubeFace(),Gf=this._renderer.getActiveMipmapLevel(),Wf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:zt,minFilter:zt,generateMipmaps:!1,type:Qn,format:Sn,colorSpace:$r,depthBuffer:!1},i=Lg(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Lg(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=aS(r)),this._blurMaterial=lS(r,e,t),this._ggxMaterial=oS(r,e,t)}return i}_compileMaterial(e){let t=new Bt(new pt,e);this._renderer.compile(t,lc)}_sceneToCubeUV(e,t,n,i,r){let l=new Zt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Ig),d.toneMapping=jn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Bt(new Bn,new Gt({name:"PMREM.Background",side:bn,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,g=_.material,m=!1,y=e.background;y?y.isColor&&(g.color.copy(y),e.background=null,m=!0):(g.color.copy(Ig),m=!0);for(let b=0;b<6;b++){let x=b%3;x===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[b],r.y,r.z)):x===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[b]));let A=this._cubeSize;Ga(i,x*A,b>2?A:0,A,A),d.setRenderTarget(i),m&&d.render(_,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=y}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===_i||e.mapping===Qi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ug()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dg());let r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Ga(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,lc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:p}=this,_=this._sizeLods[n],g=3*_*(n>p-Wa?n-p+Wa:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,Ga(r,g,m,3*_,2*_),i.setRenderTarget(r),i.render(o,lc),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,Ga(e,g,m,3*_,2*_),i.setRenderTarget(e),i.render(o,lc)}_blur(e,t,n,i){let r=this._pingPongRenderTarget,a=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,i,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[i];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[i],d=3*h*(i>this._lodMax-Wa?i-this._lodMax+Wa:0),u=4*(this._cubeSize-h);Ga(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(l,lc)}};function aS(s){let e=[],t=[],n=s,i=s-Wa+1+nS;for(let r=0;r<i;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,p=new Float32Array(f*u*d),_=new Float32Array(f*u*d);for(let m=0;m<d;m++){let y=m%3*2/3-1,b=m>2?0:-1,x=[y,b,0,y+2/3,b,0,y+2/3,b+1,0,y,b,0,y+2/3,b+1,0,y,b+1,0];p.set(x,f*u*m);for(let A=0;A<u;A++){let T=h[A*2]*2-1,D=h[A*2+1]*2-1;m===0?yr.set(1,D,T):m===1?yr.set(-T,1,-D):m===2?yr.set(-T,D,1):m===3?yr.set(-1,D,-T):m===4?yr.set(-T,-1,D):yr.set(T,D,-1),yr.toArray(_,(m*u+A)*f)}}let g=new pt;g.setAttribute("position",new Ft(p,f)),g.setAttribute("outputDirection",new Ft(_,f)),t.push(new Bt(g,null)),n>Wa&&n--}return{lodMeshes:t,sizeLods:e}}function Lg(s,e,t){let n=new un(s,e,t);return n.texture.mapping=pr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ga(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function oS(s,e,t){return new dn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:sS,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Hu(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function lS(s,e,t){return new dn({name:"SphericalGaussianBlur",defines:{SAMPLES:iS,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Hu(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Dg(){return new dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hu(),fragmentShader:`

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
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Ug(){return new dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gi,depthTest:!1,depthWrite:!1})}function Hu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var dc=class extends un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new gs(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Bn(5,5,5),r=new dn({name:"CubemapFromEquirect",uniforms:xr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:bn,blending:gi});r.uniforms.tEquirect.value=t;let a=new Bt(i,r),o=t.minFilter;return t.minFilter===xi&&(t.minFilter=zt),new pl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}};function cS(s){let e=new WeakMap,t=new WeakMap,n=null;function i(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===La||f===Da)if(e.has(u)){let p=e.get(u).texture;return o(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let _=new dc(p.height);return _.fromEquirectangularTexture(s,u),e.set(u,_),u.addEventListener("dispose",c),o(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,p=f===La||f===Da,_=f===_i||f===Qi;if(p||_){let g=t.get(u),m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new uc(s)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let y=u.image;return p&&y&&y.height>0||_&&y&&l(y)?(n===null&&(n=new uc(s)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,f){return f===La?u.mapping=_i:f===Da&&(u.mapping=Qi),u}function l(u){let f=0,p=6;for(let _=0;_<p;_++)u[_]!==void 0&&f++;return f===p}function c(u){let f=u.target;f.removeEventListener("dispose",c);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function hS(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&bi("WebGLRenderer: "+n+" extension not supported."),i}}}function uS(s,e,t,n){let i={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let p in u.attributes)e.remove(u.attributes[p]);u.removeEventListener("dispose",a),delete i[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],s.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,p=d.attributes.position,_=0;if(p===void 0)return;if(f!==null){let y=f.array;_=f.version;for(let b=0,x=y.length;b<x;b+=3){let A=y[b+0],T=y[b+1],D=y[b+2];u.push(A,T,T,D,D,A)}}else{let y=p.array;_=p.version;for(let b=0,x=y.length/3-1;b<x;b+=3){let A=b+0,T=b+1,D=b+2;u.push(A,T,T,D,D,A)}}let g=new(p.count>=65535?ia:na)(u,1);g.version=_;let m=r.get(d);m&&e.remove(m),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function dS(s,e,t){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){s.drawElements(n,u,r,d*a),t.update(u,n,1)}function c(d,u,f){f!==0&&(s.drawElementsInstanced(n,u,r,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let _=0;for(let g=0;g<f;g++)_+=u[g];t.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function fS(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:Ke("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function pS(s,e,t){let n=new WeakMap,i=new wt;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let R=function(){D.dispose(),n.delete(o),o.removeEventListener("dispose",R)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],y=o.morphAttributes.color||[],b=0;f===!0&&(b=1),p===!0&&(b=2),_===!0&&(b=3);let x=o.attributes.position.count*b,A=1;x>e.maxTextureSize&&(A=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let T=new Float32Array(x*A*4*d),D=new Ws(T,x,A,d);D.type=vn,D.needsUpdate=!0;let v=b*4;for(let I=0;I<d;I++){let F=g[I],H=m[I],X=y[I],N=x*A*4*I;for(let B=0;B<F.count;B++){let V=B*v;f===!0&&(i.fromBufferAttribute(F,B),T[N+V+0]=i.x,T[N+V+1]=i.y,T[N+V+2]=i.z,T[N+V+3]=0),p===!0&&(i.fromBufferAttribute(H,B),T[N+V+4]=i.x,T[N+V+5]=i.y,T[N+V+6]=i.z,T[N+V+7]=0),_===!0&&(i.fromBufferAttribute(X,B),T[N+V+8]=i.x,T[N+V+9]=i.y,T[N+V+10]=i.z,T[N+V+11]=X.itemSize===4?i.w:1)}}u={count:d,texture:D,size:new ae(x,A)},n.set(o,u),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function mS(s,e,t,n,i){let r=new WeakMap;function a(c){let h=i.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var gS={[Eu]:"LINEAR_TONE_MAPPING",[wu]:"REINHARD_TONE_MAPPING",[Tu]:"CINEON_TONE_MAPPING",[Ia]:"ACES_FILMIC_TONE_MAPPING",[Ru]:"AGX_TONE_MAPPING",[Cu]:"NEUTRAL_TONE_MAPPING",[Au]:"CUSTOM_TONE_MAPPING"};function _S(s,e,t,n,i,r){let a=new un(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new pt;c.setAttribute("position",new ze([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ze([0,2,0,0,2,0],2));let h=new ma({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Bt(c,h),u=new bs(-1,1,1,-1,0,1),f=null,p=null,_=!1,g,m=null,y=[],b=!1;this.setSize=function(x,A){a.setSize(x,A),o!==null&&o.setSize(x,A),l!==null&&l.setSize(x,A);for(let T=0;T<y.length;T++){let D=y[T];D.setSize&&D.setSize(x,A)}},this.setEffects=function(x){y=x,b=y.length>0&&y[0].isRenderPass===!0;let A=a.width,T=a.height;y.length>0&&o===null&&(o=new un(A,T,{type:Qn,depthBuffer:!1,stencilBuffer:!1}),l=new un(A,T,{type:Qn,depthBuffer:!1,stencilBuffer:!1}));for(let D=0;D<y.length;D++){let v=y[D];v.setSize&&v.setSize(A,T)}},this.begin=function(x,A){if(_||x.toneMapping===jn&&y.length===0)return!1;if(m=A,A!==null){let T=A.width,D=A.height;(a.width!==T||a.height!==D)&&this.setSize(T,D)}return b===!1&&x.setRenderTarget(a),g=x.toneMapping,x.toneMapping=jn,!0},this.hasRenderPass=function(){return b},this.end=function(x,A){x.toneMapping=g,_=!0;let T=a,D=o;for(let v=0;v<y.length;v++){let R=y[v];R.enabled!==!1&&(R.render(x,D,T,A),R.needsSwap!==!1&&(T=D,D=D===o?l:o))}if(f!==x.outputColorSpace||p!==x.toneMapping){f=x.outputColorSpace,p=x.toneMapping,h.defines={},Mt.getTransfer(f)===Dt&&(h.defines.SRGB_TRANSFER="");let v=gS[p];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=T.texture,x.setRenderTarget(m),x.render(d,u),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var e0=new Kt,qf=new Xi(1,1),t0=new Ws,n0=new Xs,i0=new gs,Ng=[],Fg=[],Og=new Float32Array(16),Bg=new Float32Array(9),zg=new Float32Array(4);function Ya(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=Ng[i];if(r===void 0&&(r=new Float32Array(i),Ng[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function rn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function an(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Gu(s,e){let t=Fg[e];t===void 0&&(t=new Int32Array(e),Fg[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function xS(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function yS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;s.uniform2fv(this.addr,e),an(t,e)}}function vS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(rn(t,e))return;s.uniform3fv(this.addr,e),an(t,e)}}function SS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;s.uniform4fv(this.addr,e),an(t,e)}}function MS(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),an(t,e)}else{if(rn(t,n))return;zg.set(n),s.uniformMatrix2fv(this.addr,!1,zg),an(t,n)}}function bS(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),an(t,e)}else{if(rn(t,n))return;Bg.set(n),s.uniformMatrix3fv(this.addr,!1,Bg),an(t,n)}}function ES(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(rn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),an(t,e)}else{if(rn(t,n))return;Og.set(n),s.uniformMatrix4fv(this.addr,!1,Og),an(t,n)}}function wS(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function TS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;s.uniform2iv(this.addr,e),an(t,e)}}function AS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;s.uniform3iv(this.addr,e),an(t,e)}}function RS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;s.uniform4iv(this.addr,e),an(t,e)}}function CS(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function PS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(rn(t,e))return;s.uniform2uiv(this.addr,e),an(t,e)}}function IS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(rn(t,e))return;s.uniform3uiv(this.addr,e),an(t,e)}}function LS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(rn(t,e))return;s.uniform4uiv(this.addr,e),an(t,e)}}function DS(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(qf.compareFunction=t.isReversedDepthBuffer()?ac:rc,r=qf):r=e0,t.setTexture2D(e||r,i)}function US(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||n0,i)}function NS(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||i0,i)}function FS(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||t0,i)}function OS(s){switch(s){case 5126:return xS;case 35664:return yS;case 35665:return vS;case 35666:return SS;case 35674:return MS;case 35675:return bS;case 35676:return ES;case 5124:case 35670:return wS;case 35667:case 35671:return TS;case 35668:case 35672:return AS;case 35669:case 35673:return RS;case 5125:return CS;case 36294:return PS;case 36295:return IS;case 36296:return LS;case 35678:case 36198:case 36298:case 36306:case 35682:return DS;case 35679:case 36299:case 36307:return US;case 35680:case 36300:case 36308:case 36293:return NS;case 36289:case 36303:case 36311:case 36292:return FS}}function BS(s,e){s.uniform1fv(this.addr,e)}function zS(s,e){let t=Ya(e,this.size,2);s.uniform2fv(this.addr,t)}function VS(s,e){let t=Ya(e,this.size,3);s.uniform3fv(this.addr,t)}function kS(s,e){let t=Ya(e,this.size,4);s.uniform4fv(this.addr,t)}function HS(s,e){let t=Ya(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function GS(s,e){let t=Ya(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function WS(s,e){let t=Ya(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function XS(s,e){s.uniform1iv(this.addr,e)}function YS(s,e){s.uniform2iv(this.addr,e)}function qS(s,e){s.uniform3iv(this.addr,e)}function ZS(s,e){s.uniform4iv(this.addr,e)}function JS(s,e){s.uniform1uiv(this.addr,e)}function KS(s,e){s.uniform2uiv(this.addr,e)}function $S(s,e){s.uniform3uiv(this.addr,e)}function jS(s,e){s.uniform4uiv(this.addr,e)}function QS(s,e,t){let n=this.cache,i=e.length,r=Gu(t,i);rn(n,r)||(s.uniform1iv(this.addr,r),an(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=qf:a=e0;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function eM(s,e,t){let n=this.cache,i=e.length,r=Gu(t,i);rn(n,r)||(s.uniform1iv(this.addr,r),an(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||n0,r[a])}function tM(s,e,t){let n=this.cache,i=e.length,r=Gu(t,i);rn(n,r)||(s.uniform1iv(this.addr,r),an(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||i0,r[a])}function nM(s,e,t){let n=this.cache,i=e.length,r=Gu(t,i);rn(n,r)||(s.uniform1iv(this.addr,r),an(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||t0,r[a])}function iM(s){switch(s){case 5126:return BS;case 35664:return zS;case 35665:return VS;case 35666:return kS;case 35674:return HS;case 35675:return GS;case 35676:return WS;case 5124:case 35670:return XS;case 35667:case 35671:return YS;case 35668:case 35672:return qS;case 35669:case 35673:return ZS;case 5125:return JS;case 36294:return KS;case 36295:return $S;case 36296:return jS;case 35678:case 36198:case 36298:case 36306:case 35682:return QS;case 35679:case 36299:case 36307:return eM;case 35680:case 36300:case 36308:case 36293:return tM;case 36289:case 36303:case 36311:case 36292:return nM}}var Zf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=OS(t.type)}},Jf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=iM(t.type)}},Kf=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},Xf=/(\w+)(\])?(\[|\.)?/g;function Vg(s,e){s.seq.push(e),s.map[e.id]=e}function sM(s,e,t){let n=s.name,i=n.length;for(Xf.lastIndex=0;;){let r=Xf.exec(n),a=Xf.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Vg(t,c===void 0?new Zf(o,s,e):new Jf(o,s,e));break}else{let d=t.map[o];d===void 0&&(d=new Kf(o),Vg(t,d)),t=d}}}var Xa=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);sM(o,l,this)}let i=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function kg(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var rM=37297,aM=0;function oM(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Hg=new ft;function lM(s){Mt._getMatrix(Hg,Mt.workingColorSpace,s);let e=`mat3( ${Hg.elements.map(t=>t.toFixed(4))} )`;switch(Mt.getTransfer(s)){case jr:return[e,"LinearTransferOETF"];case Dt:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Gg(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+oM(s.getShaderSource(e),o)}else return r}function cM(s,e){let t=lM(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var hM={[Eu]:"Linear",[wu]:"Reinhard",[Tu]:"Cineon",[Ia]:"ACESFilmic",[Ru]:"AgX",[Cu]:"Neutral",[Au]:"Custom"};function uM(s,e){let t=hM[e];return t===void 0?(Pe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ku=new E;function dM(){Mt.getLuminanceCoefficients(ku);let s=ku.x.toFixed(4),e=ku.y.toFixed(4),t=ku.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(hc).join(`
`)}function pM(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function mM(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function hc(s){return s!==""}function Wg(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xg(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var gM=/^[ \t]*#include +<([\w\d./]+)>/gm;function $f(s){return s.replace(gM,xM)}var _M=new Map;function xM(s,e){let t=yt[e];if(t===void 0){let n=_M.get(e);if(n!==void 0)t=yt[n],Pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return $f(t)}var yM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yg(s){return s.replace(yM,vM)}function vM(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function qg(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}var SM={[Ra]:"SHADOWMAP_TYPE_PCF",[dr]:"SHADOWMAP_TYPE_VSM"};function MM(s){return SM[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var bM={[_i]:"ENVMAP_TYPE_CUBE",[Qi]:"ENVMAP_TYPE_CUBE",[pr]:"ENVMAP_TYPE_CUBE_UV"};function EM(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":bM[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var wM={[Qi]:"ENVMAP_MODE_REFRACTION"};function TM(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":wM[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var AM={[Pa]:"ENVMAP_BLENDING_MULTIPLY",[yf]:"ENVMAP_BLENDING_MIX",[vf]:"ENVMAP_BLENDING_ADD"};function RM(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":AM[s.combine]||"ENVMAP_BLENDING_NONE"}function CM(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function PM(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=MM(t),c=EM(t),h=TM(t),d=RM(t),u=CM(t),f=fM(t),p=pM(r),_=i.createProgram(),g,m,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(hc).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(hc).join(`
`),m.length>0&&(m+=`
`)):(g=[qg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(hc).join(`
`),m=[qg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==jn?"#define TONE_MAPPING":"",t.toneMapping!==jn?yt.tonemapping_pars_fragment:"",t.toneMapping!==jn?uM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",yt.colorspace_pars_fragment,cM("linearToOutputTexel",t.outputColorSpace),dM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(hc).join(`
`)),a=$f(a),a=Wg(a,t),a=Xg(a,t),o=$f(o),o=Wg(o,t),o=Xg(o,t),a=Yg(a),o=Yg(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Bu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Bu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let b=y+g+a,x=y+m+o,A=kg(i,i.VERTEX_SHADER,b),T=kg(i,i.FRAGMENT_SHADER,x);i.attachShader(_,A),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function D(F){if(s.debug.checkShaderErrors){let H=i.getProgramInfoLog(_)||"",X=i.getShaderInfoLog(A)||"",N=i.getShaderInfoLog(T)||"",B=H.trim(),V=X.trim(),W=N.trim(),ie=!0,Y=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(ie=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,A,T);else{let $=Gg(i,A,"vertex"),se=Gg(i,T,"fragment");Ke("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+F.name+`
Material Type: `+F.type+`

Program Info Log: `+B+`
`+$+`
`+se)}else B!==""?Pe("WebGLProgram: Program Info Log:",B):(V===""||W==="")&&(Y=!1);Y&&(F.diagnostics={runnable:ie,programLog:B,vertexShader:{log:V,prefix:g},fragmentShader:{log:W,prefix:m}})}i.deleteShader(A),i.deleteShader(T),v=new Xa(i,_),R=mM(i,_)}let v;this.getUniforms=function(){return v===void 0&&D(this),v};let R;this.getAttributes=function(){return R===void 0&&D(this),R};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=i.getProgramParameter(_,rM)),I},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=aM++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=T,this}var IM=0,jf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Qf(e),t.set(e,n)),n}},Qf=class{constructor(e){this.id=IM++,this.code=e,this.usedTimes=0}};function LM(s){return s===ts||s===Va||s===ka}function DM(s,e,t,n,i,r){let a=new Ys,o=new jf,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function _(v,R,I,F,H,X){let N=F.fog,B=H.geometry,V=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?F.environment:null,W=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ie=e.get(v.envMap||V,W),Y=ie&&ie.mapping===pr?ie.image.height:null,$=f[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&Pe("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));let se=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ge=se!==void 0?se.length:0,Ae=0;B.morphAttributes.position!==void 0&&(Ae=1),B.morphAttributes.normal!==void 0&&(Ae=2),B.morphAttributes.color!==void 0&&(Ae=3);let bt,nt,it,Q;if($){let Ut=wn[$];bt=Ut.vertexShader,nt=Ut.fragmentShader}else{bt=v.vertexShader,nt=v.fragmentShader;let Ut=o.getVertexShaderStage(v),vt=o.getFragmentShaderStage(v);o.update(v,Ut,vt),it=Ut.id,Q=vt.id}let le=s.getRenderTarget(),Se=s.state.buffers.depth.getReversed(),Ue=H.isInstancedMesh===!0,Fe=H.isBatchedMesh===!0,je=!!v.map,st=!!v.matcap,re=!!ie,_e=!!v.aoMap,ge=!!v.lightMap,ye=!!v.bumpMap&&v.wireframe===!1,Me=!!v.normalMap,ct=!!v.displacementMap,Qe=!!v.emissiveMap,ot=!!v.metalnessMap,rt=!!v.roughnessMap,O=v.anisotropy>0,Pt=v.clearcoat>0,_t=v.dispersion>0,C=v.retroreflectivity>0,M=v.iridescence>0,G=v.sheen>0,q=v.transmission>0,ee=O&&!!v.anisotropyMap,ve=Pt&&!!v.clearcoatMap,Re=Pt&&!!v.clearcoatNormalMap,te=Pt&&!!v.clearcoatRoughnessMap,ce=M&&!!v.iridescenceMap,he=M&&!!v.iridescenceThicknessMap,Le=G&&!!v.sheenColorMap,be=G&&!!v.sheenRoughnessMap,Ee=!!v.specularMap,$e=!!v.specularColorMap,et=!!v.specularIntensityMap,Je=q&&!!v.transmissionMap,k=q&&!!v.thicknessMap,Te=!!v.gradientMap,oe=!!v.alphaMap,Ie=v.alphaTest>0,De=!!v.alphaHash,ue=!!v.extensions,qe=jn;v.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(qe=s.toneMapping);let Ye={shaderID:$,shaderType:v.type,shaderName:v.name,vertexShader:bt,fragmentShader:nt,defines:v.defines,customVertexShaderID:it,customFragmentShaderID:Q,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Fe,batchingColor:Fe&&H._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&H.instanceColor!==null,instancingMorph:Ue&&H.morphTexture!==null,outputColorSpace:le===null?s.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:Mt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:je,matcap:st,envMap:re,envMapMode:re&&ie.mapping,envMapCubeUVHeight:Y,aoMap:_e,lightMap:ge,bumpMap:ye,normalMap:Me,displacementMap:ct,emissiveMap:Qe,normalMapObjectSpace:Me&&v.normalMapType===Tf,normalMapTangentSpace:Me&&v.normalMapType===Ai,packedNormalMap:Me&&v.normalMapType===Ai&&LM(v.normalMap.format),metalnessMap:ot,roughnessMap:rt,anisotropy:O,anisotropyMap:ee,clearcoat:Pt,clearcoatMap:ve,clearcoatNormalMap:Re,clearcoatRoughnessMap:te,dispersion:_t,retroreflection:C,iridescence:M,iridescenceMap:ce,iridescenceThicknessMap:he,sheen:G,sheenColorMap:Le,sheenRoughnessMap:be,specularMap:Ee,specularColorMap:$e,specularIntensityMap:et,transmission:q,transmissionMap:Je,thicknessMap:k,gradientMap:Te,opaque:v.transparent===!1&&v.blending===fr&&v.alphaToCoverage===!1,alphaMap:oe,alphaTest:Ie,alphaHash:De,combine:v.combine,mapUv:je&&p(v.map.channel),aoMapUv:_e&&p(v.aoMap.channel),lightMapUv:ge&&p(v.lightMap.channel),bumpMapUv:ye&&p(v.bumpMap.channel),normalMapUv:Me&&p(v.normalMap.channel),displacementMapUv:ct&&p(v.displacementMap.channel),emissiveMapUv:Qe&&p(v.emissiveMap.channel),metalnessMapUv:ot&&p(v.metalnessMap.channel),roughnessMapUv:rt&&p(v.roughnessMap.channel),anisotropyMapUv:ee&&p(v.anisotropyMap.channel),clearcoatMapUv:ve&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:Re&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:he&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:Le&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:be&&p(v.sheenRoughnessMap.channel),specularMapUv:Ee&&p(v.specularMap.channel),specularColorMapUv:$e&&p(v.specularColorMap.channel),specularIntensityMapUv:et&&p(v.specularIntensityMap.channel),transmissionMapUv:Je&&p(v.transmissionMap.channel),thicknessMapUv:k&&p(v.thicknessMap.channel),alphaMapUv:oe&&p(v.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(Me||O),vertexNormals:!!B.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!B.attributes.uv&&(je||oe),fog:!!N,useFog:v.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||B.attributes.normal===void 0&&Me===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Se,skinning:H.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Ge,morphTextureStride:Ae,numSunLights:R.sun.length,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numSunLightShadows:R.sunShadowMap.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:X.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:qe,decodeVideoTexture:je&&v.map.isVideoTexture===!0&&Mt.getTransfer(v.map.colorSpace)===Dt,decodeVideoTextureEmissive:Qe&&v.emissiveMap.isVideoTexture===!0&&Mt.getTransfer(v.emissiveMap.colorSpace)===Dt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Wn,flipSided:v.side===bn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ue&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ue&&v.extensions.multiDraw===!0||Fe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ye.vertexUv1s=l.has(1),Ye.vertexUv2s=l.has(2),Ye.vertexUv3s=l.has(3),l.clear(),Ye}function g(v){let R=[];if(v.shaderID?R.push(v.shaderID):(R.push(v.customVertexShaderID),R.push(v.customFragmentShaderID)),v.defines!==void 0)for(let I in v.defines)R.push(I),R.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(m(R,v),y(R,v),R.push(s.outputColorSpace)),R.push(v.customProgramCacheKey),R.join()}function m(v,R){v.push(R.precision),v.push(R.outputColorSpace),v.push(R.envMapMode),v.push(R.envMapCubeUVHeight),v.push(R.mapUv),v.push(R.alphaMapUv),v.push(R.lightMapUv),v.push(R.aoMapUv),v.push(R.bumpMapUv),v.push(R.normalMapUv),v.push(R.displacementMapUv),v.push(R.emissiveMapUv),v.push(R.metalnessMapUv),v.push(R.roughnessMapUv),v.push(R.anisotropyMapUv),v.push(R.clearcoatMapUv),v.push(R.clearcoatNormalMapUv),v.push(R.clearcoatRoughnessMapUv),v.push(R.iridescenceMapUv),v.push(R.iridescenceThicknessMapUv),v.push(R.sheenColorMapUv),v.push(R.sheenRoughnessMapUv),v.push(R.specularMapUv),v.push(R.specularColorMapUv),v.push(R.specularIntensityMapUv),v.push(R.transmissionMapUv),v.push(R.thicknessMapUv),v.push(R.combine),v.push(R.fogExp2),v.push(R.sizeAttenuation),v.push(R.morphTargetsCount),v.push(R.morphAttributeCount),v.push(R.numSunLights),v.push(R.numDirLights),v.push(R.numPointLights),v.push(R.numSpotLights),v.push(R.numSpotLightMaps),v.push(R.numHemiLights),v.push(R.numRectAreaLights),v.push(R.numSunLightShadows),v.push(R.numDirLightShadows),v.push(R.numPointLightShadows),v.push(R.numSpotLightShadows),v.push(R.numSpotLightShadowsWithMaps),v.push(R.numLightProbes),v.push(R.shadowMapType),v.push(R.toneMapping),v.push(R.numClippingPlanes),v.push(R.numClipIntersection),v.push(R.depthPacking)}function y(v,R){a.disableAll(),R.instancing&&a.enable(0),R.instancingColor&&a.enable(1),R.instancingMorph&&a.enable(2),R.matcap&&a.enable(3),R.envMap&&a.enable(4),R.normalMapObjectSpace&&a.enable(5),R.normalMapTangentSpace&&a.enable(6),R.clearcoat&&a.enable(7),R.iridescence&&a.enable(8),R.alphaTest&&a.enable(9),R.vertexColors&&a.enable(10),R.vertexAlphas&&a.enable(11),R.vertexUv1s&&a.enable(12),R.vertexUv2s&&a.enable(13),R.vertexUv3s&&a.enable(14),R.vertexTangents&&a.enable(15),R.anisotropy&&a.enable(16),R.alphaHash&&a.enable(17),R.batching&&a.enable(18),R.dispersion&&a.enable(19),R.retroreflection&&a.enable(24),R.batchingColor&&a.enable(20),R.gradientMap&&a.enable(21),R.packedNormalMap&&a.enable(22),R.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.reversedDepthBuffer&&a.enable(4),R.skinning&&a.enable(5),R.morphTargets&&a.enable(6),R.morphNormals&&a.enable(7),R.morphColors&&a.enable(8),R.premultipliedAlpha&&a.enable(9),R.shadowMapEnabled&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),R.decodeVideoTextureEmissive&&a.enable(20),R.alphaToCoverage&&a.enable(21),R.numLightProbeGrids>0&&a.enable(22),R.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function b(v){let R=f[v.type],I;if(R){let F=wn[R];I=Ha.clone(F.uniforms)}else I=v.uniforms;return I}function x(v,R){let I=h.get(R);return I!==void 0?++I.usedTimes:(I=new PM(s,R,v,i),c.push(I),h.set(R,I)),I}function A(v){if(--v.usedTimes===0){let R=c.indexOf(v);c[R]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function T(v){o.remove(v)}function D(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:b,acquireProgram:x,releaseProgram:A,releaseShaderCache:T,programs:c,dispose:D}}function UM(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function NM(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function Zg(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Jg(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,p,_,g,m){let y=s[e];return y===void 0?(y={id:u.id,object:u,geometry:f,material:p,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:g,group:m},s[e]=y):(y.id=u.id,y.object=u,y.geometry=f,y.material=p,y.materialVariant=a(u),y.groupOrder=_,y.renderOrder=u.renderOrder,y.z=g,y.group=m),e++,y}function l(u,f,p,_,g,m,y){y.reversedDepth===!0&&(g=-g);let b=o(u,f,p,_,g,m);p.transmission>0?n.push(b):p.transparent===!0?i.push(b):t.push(b)}function c(u,f,p,_,g,m){let y=o(u,f,p,_,g,m);p.transmission>0?n.unshift(y):p.transparent===!0?i.unshift(y):t.unshift(y)}function h(u,f){t.length>1&&t.sort(u||NM),n.length>1&&n.sort(f||Zg),i.length>1&&i.sort(f||Zg)}function d(){for(let u=e,f=s.length;u<f;u++){let p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:d,sort:h}}function FM(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new Jg,s.set(n,[a])):i>=r.length?(a=new Jg,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function OM(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new E,color:new Be};break;case"SpotLight":t={position:new E,direction:new E,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new Be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":t={color:new Be,position:new E,halfWidth:new E,halfHeight:new E};break}return s[e.id]=t,t}}}function BM(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ae,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var zM=0;function VM(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function kM(s){let e=new OM,t=BM(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new E);let i=new E,r=new ht,a=new ht;function o(c){let h=0,d=0,u=0;for(let H=0;H<9;H++)n.probe[H].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,y=0,b=0,x=0,A=0,T=0,D=0,v=0,R=0,I=0;c.sort(VM);for(let H=0,X=c.length;H<X;H++){let N=c[H],B=N.color,V=N.intensity,W=N.distance,ie=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===ts?ie=N.shadow.map.texture:ie=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)h+=B.r*V,d+=B.g*V,u+=B.b*V;else if(N.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(N.sh.coefficients[Y],V);I++}else if(N.isSunLight){let Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let $=N.shadow,se=t.get(N);se.shadowIntensity=$.intensity,se.shadowBias=$.bias,se.shadowNormalBias=$.normalBias,se.shadowRadius=$.radius,se.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),n.sunShadow[p]=se,n.sunShadowMap[p]=ie;let Ge=$.getViewportCount();for(let Ae=0;Ae<Ge;Ae++)n.sunShadowMatrix[_+Ae]=$.getMatrix(Ae),n.sunShadowCascade[_+Ae]=$._cascadeData[Ae];_+=Ge,p++}n.sun[f]=Y,f++}else if(N.isDirectionalLight){let Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let $=N.shadow,se=t.get(N);se.shadowIntensity=$.intensity,se.shadowBias=$.bias,se.shadowNormalBias=$.normalBias,se.shadowRadius=$.radius,se.shadowMapSize=$.mapSize,n.directionalShadow[g]=se,n.directionalShadowMap[g]=ie,n.directionalShadowMatrix[g]=N.shadow.matrix,A++}n.directional[g]=Y,g++}else if(N.isSpotLight){let Y=e.get(N);Y.position.setFromMatrixPosition(N.matrixWorld),Y.color.copy(B).multiplyScalar(V),Y.distance=W,Y.coneCos=Math.cos(N.angle),Y.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),Y.decay=N.decay,n.spot[y]=Y;let $=N.shadow;if(N.map&&(n.spotLightMap[v]=N.map,v++,$.updateMatrices(N),N.castShadow&&R++),n.spotLightMatrix[y]=$.matrix,N.castShadow){let se=t.get(N);se.shadowIntensity=$.intensity,se.shadowBias=$.bias,se.shadowNormalBias=$.normalBias,se.shadowRadius=$.radius,se.shadowMapSize=$.mapSize,n.spotShadow[y]=se,n.spotShadowMap[y]=ie,D++}y++}else if(N.isRectAreaLight){let Y=e.get(N);Y.color.copy(B).multiplyScalar(V),Y.halfWidth.set(N.width*.5,0,0),Y.halfHeight.set(0,N.height*.5,0),n.rectArea[b]=Y,b++}else if(N.isPointLight){let Y=e.get(N);if(Y.color.copy(N.color).multiplyScalar(N.intensity),Y.distance=N.distance,Y.decay=N.decay,N.castShadow){let $=N.shadow,se=t.get(N);se.shadowIntensity=$.intensity,se.shadowBias=$.bias,se.shadowNormalBias=$.normalBias,se.shadowRadius=$.radius,se.shadowMapSize=$.mapSize,se.shadowCameraNear=$.camera.near,se.shadowCameraFar=$.camera.far,n.pointShadow[m]=se,n.pointShadowMap[m]=ie,n.pointShadowMatrix[m]=N.shadow.matrix,T++}n.point[m]=Y,m++}else if(N.isHemisphereLight){let Y=e.get(N);Y.skyColor.copy(N.color).multiplyScalar(V),Y.groundColor.copy(N.groundColor).multiplyScalar(V),n.hemi[x]=Y,x++}}b>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ce.LTC_FLOAT_1,n.rectAreaLTC2=Ce.LTC_FLOAT_2):(n.rectAreaLTC1=Ce.LTC_HALF_1,n.rectAreaLTC2=Ce.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let F=n.hash;(F.sunLength!==f||F.directionalLength!==g||F.pointLength!==m||F.spotLength!==y||F.rectAreaLength!==b||F.hemiLength!==x||F.numSunShadows!==p||F.numDirectionalShadows!==A||F.numPointShadows!==T||F.numSpotShadows!==D||F.numSpotMaps!==v||F.numLightProbes!==I)&&(n.sun.length=f,n.directional.length=g,n.spot.length=y,n.rectArea.length=b,n.point.length=m,n.hemi.length=x,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=D,n.spotShadowMap.length=D,n.spotLightMatrix.length=D+v-R,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=I,F.sunLength=f,F.directionalLength=g,F.pointLength=m,F.spotLength=y,F.rectAreaLength=b,F.hemiLength=x,F.numSunShadows=p,F.numDirectionalShadows=A,F.numPointShadows=T,F.numSpotShadows=D,F.numSpotMaps=v,F.numLightProbes=I,n.version=zM++)}function l(c,h){let d=0,u=0,f=0,p=0,_=0,g=0,m=h.matrixWorldInverse;for(let y=0,b=c.length;y<b;y++){let x=c[y];if(x.isSunLight){let A=n.sun[d];A.direction.setFromMatrixPosition(x.matrixWorld),A.direction.transformDirection(m),d++}else if(x.isDirectionalLight){let A=n.directional[u];A.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(m),u++}else if(x.isSpotLight){let A=n.spot[p];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(m),p++}else if(x.isRectAreaLight){let A=n.rectArea[_];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(m),a.identity(),r.copy(x.matrixWorld),r.premultiply(m),a.extractRotation(r),A.halfWidth.set(x.width*.5,0,0),A.halfHeight.set(0,x.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),_++}else if(x.isPointLight){let A=n.point[f];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){let A=n.hemi[g];A.direction.setFromMatrixPosition(x.matrixWorld),A.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:n}}function Kg(s){let e=new kM(s),t=[],n=[],i=[];function r(u){d.camera=u,t.length=0,n.length=0,i.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){i.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function HM(s){let e=new WeakMap;function t(i,r=0){let a=e.get(i),o;return a===void 0?(o=new Kg(s),e.set(i,[o])):r>=a.length?(o=new Kg(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var GM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,WM=`uniform sampler2D shadow_pass;
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
}`,XM=[new E(1,0,0),new E(-1,0,0),new E(0,1,0),new E(0,-1,0),new E(0,0,1),new E(0,0,-1)],YM=[new E(0,-1,0),new E(0,-1,0),new E(0,0,1),new E(0,0,-1),new E(0,-1,0),new E(0,-1,0)],$g=new ht,cc=new E,Yf=new E;function qM(s,e,t){let n=new Ei,i=new ae,r=new ae,a=new wt,o=new ga,l=new _a,c={},h=t.maxTextureSize,d={[ji]:bn,[bn]:ji,[Wn]:Wn},u=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ae},radius:{value:4}},vertexShader:GM,fragmentShader:WM}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let p=new pt;p.setAttribute("position",new Ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Bt(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ra;let m=this.type;this.render=function(T,D,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===Qd&&(Pe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ra);let R=s.getRenderTarget(),I=s.getActiveCubeFace(),F=s.getActiveMipmapLevel(),H=s.state;H.setBlending(gi),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let X=m!==this.type;X&&D.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(B=>B.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,B=T.length;N<B;N++){let V=T[N],W=V.shadow;if(W===void 0){Pe("WebGLShadowMap:",V,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);let ie=W.getFrameExtents();i.multiply(ie),r.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ie.x),i.x=r.x*ie.x,W.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ie.y),i.y=r.y*ie.y,W.mapSize.y=r.y));let Y=s.state.buffers.depth.getReversed();if(W.camera._reversedDepth=Y,W.map===null||X===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===dr){if(V.isPointLight){Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new un(i.x,i.y,{format:ts,type:Qn,minFilter:zt,magFilter:zt,generateMipmaps:!1}),W.map.texture.name=V.name+".shadowMap",W.map.depthTexture=new Xi(i.x,i.y,vn),W.map.depthTexture.name=V.name+".shadowMapDepth",W.map.depthTexture.format=oi,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Jt,W.map.depthTexture.magFilter=Jt}else V.isPointLight?(W.map=new dc(i.x),W.map.depthTexture=new No(i.x,Xn)):(W.map=new un(i.x,i.y),W.map.depthTexture=new Xi(i.x,i.y,Xn)),W.map.depthTexture.name=V.name+".shadowMap",W.map.depthTexture.format=oi,this.type===Ra?(W.map.depthTexture.compareFunction=Y?ac:rc,W.map.depthTexture.minFilter=zt,W.map.depthTexture.magFilter=zt):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=Jt,W.map.depthTexture.magFilter=Jt);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==i.x||W.map.height!==i.y)&&W.map.setSize(i.x,i.y);let $=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();V.isPointLight!==!0&&W.updateMatrices(V,v);for(let se=0;se<$;se++){let Ge=W.getCamera(se);if(V.isPointLight){let Ae=W.camera,bt=W.matrix,nt=V.distance||Ae.far;nt!==Ae.far&&(Ae.far=nt,Ae.updateProjectionMatrix()),cc.setFromMatrixPosition(V.matrixWorld),Ae.position.copy(cc),Yf.copy(Ae.position),Yf.add(XM[se]),Ae.up.copy(YM[se]),Ae.lookAt(Yf),Ae.updateMatrixWorld(),bt.makeTranslation(-cc.x,-cc.y,-cc.z),$g.multiplyMatrices(Ae.projectionMatrix,Ae.matrixWorldInverse),W._frustum.setFromProjectionMatrix($g,Ae.coordinateSystem,Ae.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)s.setRenderTarget(W.map,se),s.clear();else{se===0&&(s.setRenderTarget(W.map),s.clear());let Ae=W.getViewport(se);a.set(r.x*Ae.x,r.y*Ae.y,r.x*Ae.z,r.y*Ae.w),H.viewport(a)}n=W.getFrustum(se),x(D,v,Ge,V,this.type)}W.isPointLightShadow!==!0&&this.type===dr&&y(W,v),W.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(R,I,F)};function y(T,D){let v=e.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new un(i.x,i.y,{format:ts,type:Qn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(D,null,v,u,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(D,null,v,f,_,null)}function b(T,D,v,R){let I=null,F=v.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(F!==void 0)I=F;else if(I=v.isPointLight===!0?l:o,s.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){let H=I.uuid,X=D.uuid,N=c[H];N===void 0&&(N={},c[H]=N);let B=N[X];B===void 0&&(B=I.clone(),N[X]=B,D.addEventListener("dispose",A)),I=B}if(I.visible=D.visible,I.wireframe=D.wireframe,R===dr?I.side=D.shadowSide!==null?D.shadowSide:D.side:I.side=D.shadowSide!==null?D.shadowSide:d[D.side],I.alphaMap=D.alphaMap,I.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,I.map=D.map,I.clipShadows=D.clipShadows,I.clippingPlanes=D.clippingPlanes,I.clipIntersection=D.clipIntersection,I.displacementMap=D.displacementMap,I.displacementScale=D.displacementScale,I.displacementBias=D.displacementBias,I.wireframeLinewidth=D.wireframeLinewidth,I.linewidth=D.linewidth,v.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let H=s.properties.get(I);H.light=v}return I}function x(T,D,v,R,I){if(T.visible===!1)return;if(T.layers.test(D.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&I===dr)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,T.matrixWorld);let X=e.update(T),N=T.material;if(Array.isArray(N)){let B=X.groups;for(let V=0,W=B.length;V<W;V++){let ie=B[V],Y=N[ie.materialIndex];if(Y&&Y.visible){let $=b(T,Y,R,I);T.onBeforeShadow(s,T,D,v,X,$,ie),s.renderBufferDirect(v,null,X,$,T,ie),T.onAfterShadow(s,T,D,v,X,$,ie)}}}else if(N.visible){let B=b(T,N,R,I);T.onBeforeShadow(s,T,D,v,X,B,null),s.renderBufferDirect(v,null,X,B,T,null),T.onAfterShadow(s,T,D,v,X,B,null)}}let H=T.children;for(let X=0,N=H.length;X<N;X++)x(H[X],D,v,R,I)}function A(T){T.target.removeEventListener("dispose",A);for(let v in c){let R=c[v],I=T.target.uuid;I in R&&(R[I].dispose(),delete R[I])}}}function ZM(s,e){function t(){let k=!1,Te=new wt,oe=null,Ie=new wt(0,0,0,0);return{setMask:function(De){oe!==De&&!k&&(s.colorMask(De,De,De,De),oe=De)},setLocked:function(De){k=De},setClear:function(De,ue,qe,Ye,Ut){Ut===!0&&(De*=Ye,ue*=Ye,qe*=Ye),Te.set(De,ue,qe,Ye),Ie.equals(Te)===!1&&(s.clearColor(De,ue,qe,Ye),Ie.copy(Te))},reset:function(){k=!1,oe=null,Ie.set(-1,0,0,0)}}}function n(){let k=!1,Te=!1,oe=null,Ie=null,De=null;return{setReversed:function(ue){if(Te!==ue){let qe=e.get("EXT_clip_control");ue?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT),Te=ue;let Ye=De;De=null,this.setClear(Ye)}},getReversed:function(){return Te},setTest:function(ue){ue?le(s.DEPTH_TEST):Se(s.DEPTH_TEST)},setMask:function(ue){oe!==ue&&!k&&(s.depthMask(ue),oe=ue)},setFunc:function(ue){if(Te&&(ue=vg[ue]),Ie!==ue){switch(ue){case go:s.depthFunc(s.NEVER);break;case _o:s.depthFunc(s.ALWAYS);break;case xo:s.depthFunc(s.LESS);break;case Hs:s.depthFunc(s.LEQUAL);break;case yo:s.depthFunc(s.EQUAL);break;case vo:s.depthFunc(s.GEQUAL);break;case So:s.depthFunc(s.GREATER);break;case Mo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Ie=ue}},setLocked:function(ue){k=ue},setClear:function(ue){De!==ue&&(De=ue,Te&&(ue=1-ue),s.clearDepth(ue))},reset:function(){k=!1,oe=null,Ie=null,De=null,Te=!1}}}function i(){let k=!1,Te=null,oe=null,Ie=null,De=null,ue=null,qe=null,Ye=null,Ut=null;return{setTest:function(vt){k||(vt?le(s.STENCIL_TEST):Se(s.STENCIL_TEST))},setMask:function(vt){Te!==vt&&!k&&(s.stencilMask(vt),Te=vt)},setFunc:function(vt,Qt,ln){(oe!==vt||Ie!==Qt||De!==ln)&&(s.stencilFunc(vt,Qt,ln),oe=vt,Ie=Qt,De=ln)},setOp:function(vt,Qt,ln){(ue!==vt||qe!==Qt||Ye!==ln)&&(s.stencilOp(vt,Qt,ln),ue=vt,qe=Qt,Ye=ln)},setLocked:function(vt){k=vt},setClear:function(vt){Ut!==vt&&(s.clearStencil(vt),Ut=vt)},reset:function(){k=!1,Te=null,oe=null,Ie=null,De=null,ue=null,qe=null,Ye=null,Ut=null}}}let r=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,p=[],_=null,g=!1,m=null,y=null,b=null,x=null,A=null,T=null,D=null,v=new Be(0,0,0),R=0,I=!1,F=null,H=null,X=null,N=null,B=null,V=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,ie=0,Y=s.getParameter(s.VERSION);Y.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(Y)[1]),W=ie>=1):Y.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),W=ie>=2);let $=null,se={},Ge=s.getParameter(s.SCISSOR_BOX),Ae=s.getParameter(s.VIEWPORT),bt=new wt().fromArray(Ge),nt=new wt().fromArray(Ae);function it(k,Te,oe,Ie){let De=new Uint8Array(4),ue=s.createTexture();s.bindTexture(k,ue),s.texParameteri(k,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(k,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let qe=0;qe<oe;qe++)k===s.TEXTURE_3D||k===s.TEXTURE_2D_ARRAY?s.texImage3D(Te,0,s.RGBA,1,1,Ie,0,s.RGBA,s.UNSIGNED_BYTE,De):s.texImage2D(Te+qe,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,De);return ue}let Q={};Q[s.TEXTURE_2D]=it(s.TEXTURE_2D,s.TEXTURE_2D,1),Q[s.TEXTURE_CUBE_MAP]=it(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[s.TEXTURE_2D_ARRAY]=it(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Q[s.TEXTURE_3D]=it(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),le(s.DEPTH_TEST),a.setFunc(Hs),ye(!1),Me(yu),le(s.CULL_FACE),_e(gi);function le(k){h[k]!==!0&&(s.enable(k),h[k]=!0)}function Se(k){h[k]!==!1&&(s.disable(k),h[k]=!1)}function Ue(k,Te){return u[k]!==Te?(s.bindFramebuffer(k,Te),u[k]=Te,k===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=Te),k===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=Te),!0):!1}function Fe(k,Te){let oe=p,Ie=!1;if(k){oe=f.get(Te),oe===void 0&&(oe=[],f.set(Te,oe));let De=k.textures;if(oe.length!==De.length||oe[0]!==s.COLOR_ATTACHMENT0){for(let ue=0,qe=De.length;ue<qe;ue++)oe[ue]=s.COLOR_ATTACHMENT0+ue;oe.length=De.length,Ie=!0}}else oe[0]!==s.BACK&&(oe[0]=s.BACK,Ie=!0);Ie&&s.drawBuffers(oe)}function je(k){return _!==k?(s.useProgram(k),_=k,!0):!1}let st={[ws]:s.FUNC_ADD,[tf]:s.FUNC_SUBTRACT,[nf]:s.FUNC_REVERSE_SUBTRACT};st[sf]=s.MIN,st[rf]=s.MAX;let re={[af]:s.ZERO,[of]:s.ONE,[lf]:s.SRC_COLOR,[Mu]:s.SRC_ALPHA,[pf]:s.SRC_ALPHA_SATURATE,[df]:s.DST_COLOR,[hf]:s.DST_ALPHA,[cf]:s.ONE_MINUS_SRC_COLOR,[bu]:s.ONE_MINUS_SRC_ALPHA,[ff]:s.ONE_MINUS_DST_COLOR,[uf]:s.ONE_MINUS_DST_ALPHA,[mf]:s.CONSTANT_COLOR,[gf]:s.ONE_MINUS_CONSTANT_COLOR,[_f]:s.CONSTANT_ALPHA,[xf]:s.ONE_MINUS_CONSTANT_ALPHA};function _e(k,Te,oe,Ie,De,ue,qe,Ye,Ut,vt){if(k===gi){g===!0&&(Se(s.BLEND),g=!1);return}if(g===!1&&(le(s.BLEND),g=!0),k!==ef){if(k!==m||vt!==I){if((y!==ws||A!==ws)&&(s.blendEquation(s.FUNC_ADD),y=ws,A=ws),vt)switch(k){case fr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ca:s.blendFunc(s.ONE,s.ONE);break;case vu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Su:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Ke("WebGLState: Invalid blending: ",k);break}else switch(k){case fr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ca:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case vu:Ke("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Su:Ke("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ke("WebGLState: Invalid blending: ",k);break}b=null,x=null,T=null,D=null,v.set(0,0,0),R=0,m=k,I=vt}return}De=De||Te,ue=ue||oe,qe=qe||Ie,(Te!==y||De!==A)&&(s.blendEquationSeparate(st[Te],st[De]),y=Te,A=De),(oe!==b||Ie!==x||ue!==T||qe!==D)&&(s.blendFuncSeparate(re[oe],re[Ie],re[ue],re[qe]),b=oe,x=Ie,T=ue,D=qe),(Ye.equals(v)===!1||Ut!==R)&&(s.blendColor(Ye.r,Ye.g,Ye.b,Ut),v.copy(Ye),R=Ut),m=k,I=!1}function ge(k,Te){k.side===Wn?Se(s.CULL_FACE):le(s.CULL_FACE);let oe=k.side===bn;Te&&(oe=!oe),ye(oe),k.blending===fr&&k.transparent===!1?_e(gi):_e(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);let Ie=k.stencilWrite;o.setTest(Ie),Ie&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Qe(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?le(s.SAMPLE_ALPHA_TO_COVERAGE):Se(s.SAMPLE_ALPHA_TO_COVERAGE)}function ye(k){F!==k&&(k?s.frontFace(s.CW):s.frontFace(s.CCW),F=k)}function Me(k){k!==$d?(le(s.CULL_FACE),k!==H&&(k===yu?s.cullFace(s.BACK):k===jd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Se(s.CULL_FACE),H=k}function ct(k){k!==X&&(W&&s.lineWidth(k),X=k)}function Qe(k,Te,oe){k?(le(s.POLYGON_OFFSET_FILL),(N!==Te||B!==oe)&&(N=Te,B=oe,a.getReversed()&&(Te=-Te),s.polygonOffset(Te,oe))):Se(s.POLYGON_OFFSET_FILL)}function ot(k){k?le(s.SCISSOR_TEST):Se(s.SCISSOR_TEST)}function rt(k){k===void 0&&(k=s.TEXTURE0+V-1),$!==k&&(s.activeTexture(k),$=k)}function O(k,Te,oe){oe===void 0&&($===null?oe=s.TEXTURE0+V-1:oe=$);let Ie=se[oe];Ie===void 0&&(Ie={type:void 0,texture:void 0},se[oe]=Ie),(Ie.type!==k||Ie.texture!==Te)&&($!==oe&&(s.activeTexture(oe),$=oe),s.bindTexture(k,Te||Q[k]),Ie.type=k,Ie.texture=Te)}function Pt(){let k=se[$];k!==void 0&&k.type!==void 0&&(s.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function _t(){try{s.compressedTexImage2D(...arguments)}catch(k){Ke("WebGLState:",k)}}function C(){try{s.compressedTexImage3D(...arguments)}catch(k){Ke("WebGLState:",k)}}function M(){try{s.texSubImage2D(...arguments)}catch(k){Ke("WebGLState:",k)}}function G(){try{s.texSubImage3D(...arguments)}catch(k){Ke("WebGLState:",k)}}function q(){try{s.compressedTexSubImage2D(...arguments)}catch(k){Ke("WebGLState:",k)}}function ee(){try{s.compressedTexSubImage3D(...arguments)}catch(k){Ke("WebGLState:",k)}}function ve(){try{s.texStorage2D(...arguments)}catch(k){Ke("WebGLState:",k)}}function Re(){try{s.texStorage3D(...arguments)}catch(k){Ke("WebGLState:",k)}}function te(){try{s.texImage2D(...arguments)}catch(k){Ke("WebGLState:",k)}}function ce(){try{s.texImage3D(...arguments)}catch(k){Ke("WebGLState:",k)}}function he(k){return d[k]!==void 0?d[k]:s.getParameter(k)}function Le(k,Te){d[k]!==Te&&(s.pixelStorei(k,Te),d[k]=Te)}function be(k){bt.equals(k)===!1&&(s.scissor(k.x,k.y,k.z,k.w),bt.copy(k))}function Ee(k){nt.equals(k)===!1&&(s.viewport(k.x,k.y,k.z,k.w),nt.copy(k))}function $e(k,Te){let oe=c.get(Te);oe===void 0&&(oe=new WeakMap,c.set(Te,oe));let Ie=oe.get(k);Ie===void 0&&(Ie=s.getUniformBlockIndex(Te,k.name),oe.set(k,Ie))}function et(k,Te){let Ie=c.get(Te).get(k);l.get(Te)!==Ie&&(s.uniformBlockBinding(Te,Ie,k.__bindingPointIndex),l.set(Te,Ie))}function Je(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},d={},$=null,se={},u={},f=new WeakMap,p=[],_=null,g=!1,m=null,y=null,b=null,x=null,A=null,T=null,D=null,v=new Be(0,0,0),R=0,I=!1,F=null,H=null,X=null,N=null,B=null,bt.set(0,0,s.canvas.width,s.canvas.height),nt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:le,disable:Se,bindFramebuffer:Ue,drawBuffers:Fe,useProgram:je,setBlending:_e,setMaterial:ge,setFlipSided:ye,setCullFace:Me,setLineWidth:ct,setPolygonOffset:Qe,setScissorTest:ot,activeTexture:rt,bindTexture:O,unbindTexture:Pt,compressedTexImage2D:_t,compressedTexImage3D:C,texImage2D:te,texImage3D:ce,pixelStorei:Le,getParameter:he,updateUBOMapping:$e,uniformBlockBinding:et,texStorage2D:ve,texStorage3D:Re,texSubImage2D:M,texSubImage3D:G,compressedTexSubImage2D:q,compressedTexSubImage3D:ee,scissor:be,viewport:Ee,reset:Je}}function JM(s,e,t,n,i,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ae,h=new WeakMap,d=new Set,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,M){return p?new OffscreenCanvas(C,M):Qr("canvas")}function g(C,M,G){let q=1,ee=_t(C);if((ee.width>G||ee.height>G)&&(q=G/Math.max(ee.width,ee.height)),q<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let ve=Math.floor(q*ee.width),Re=Math.floor(q*ee.height);u===void 0&&(u=_(ve,Re));let te=M?_(ve,Re):u;return te.width=ve,te.height=Re,te.getContext("2d").drawImage(C,0,0,ve,Re),Pe("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+ve+"x"+Re+")."),te}else return"data"in C&&Pe("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),C;return C}function m(C){return C.generateMipmaps}function y(C){s.generateMipmap(C)}function b(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function x(C,M,G,q,ee,ve=!1){if(C!==null){if(s[C]!==void 0)return s[C];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Re;q&&(Re=e.get("EXT_texture_norm16"),Re||Pe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let te=M;if(M===s.RED&&(G===s.FLOAT&&(te=s.R32F),G===s.HALF_FLOAT&&(te=s.R16F),G===s.UNSIGNED_BYTE&&(te=s.R8),G===s.UNSIGNED_SHORT&&Re&&(te=Re.R16_EXT),G===s.SHORT&&Re&&(te=Re.R16_SNORM_EXT)),M===s.RED_INTEGER&&(G===s.UNSIGNED_BYTE&&(te=s.R8UI),G===s.UNSIGNED_SHORT&&(te=s.R16UI),G===s.UNSIGNED_INT&&(te=s.R32UI),G===s.BYTE&&(te=s.R8I),G===s.SHORT&&(te=s.R16I),G===s.INT&&(te=s.R32I)),M===s.RG&&(G===s.FLOAT&&(te=s.RG32F),G===s.HALF_FLOAT&&(te=s.RG16F),G===s.UNSIGNED_BYTE&&(te=s.RG8),G===s.UNSIGNED_SHORT&&Re&&(te=Re.RG16_EXT),G===s.SHORT&&Re&&(te=Re.RG16_SNORM_EXT)),M===s.RG_INTEGER&&(G===s.UNSIGNED_BYTE&&(te=s.RG8UI),G===s.UNSIGNED_SHORT&&(te=s.RG16UI),G===s.UNSIGNED_INT&&(te=s.RG32UI),G===s.BYTE&&(te=s.RG8I),G===s.SHORT&&(te=s.RG16I),G===s.INT&&(te=s.RG32I)),M===s.RGB_INTEGER&&(G===s.UNSIGNED_BYTE&&(te=s.RGB8UI),G===s.UNSIGNED_SHORT&&(te=s.RGB16UI),G===s.UNSIGNED_INT&&(te=s.RGB32UI),G===s.BYTE&&(te=s.RGB8I),G===s.SHORT&&(te=s.RGB16I),G===s.INT&&(te=s.RGB32I)),M===s.RGBA_INTEGER&&(G===s.UNSIGNED_BYTE&&(te=s.RGBA8UI),G===s.UNSIGNED_SHORT&&(te=s.RGBA16UI),G===s.UNSIGNED_INT&&(te=s.RGBA32UI),G===s.BYTE&&(te=s.RGBA8I),G===s.SHORT&&(te=s.RGBA16I),G===s.INT&&(te=s.RGBA32I)),M===s.RGB&&(G===s.UNSIGNED_SHORT&&Re&&(te=Re.RGB16_EXT),G===s.SHORT&&Re&&(te=Re.RGB16_SNORM_EXT),G===s.UNSIGNED_INT_5_9_9_9_REV&&(te=s.RGB9_E5),G===s.UNSIGNED_INT_10F_11F_11F_REV&&(te=s.R11F_G11F_B10F)),M===s.RGBA){let ce=ve?jr:Mt.getTransfer(ee);G===s.FLOAT&&(te=s.RGBA32F),G===s.HALF_FLOAT&&(te=s.RGBA16F),G===s.UNSIGNED_BYTE&&(te=ce===Dt?s.SRGB8_ALPHA8:s.RGBA8),G===s.UNSIGNED_SHORT&&Re&&(te=Re.RGBA16_EXT),G===s.SHORT&&Re&&(te=Re.RGBA16_SNORM_EXT),G===s.UNSIGNED_SHORT_4_4_4_4&&(te=s.RGBA4),G===s.UNSIGNED_SHORT_5_5_5_1&&(te=s.RGB5_A1)}return(te===s.R16F||te===s.R32F||te===s.RG16F||te===s.RG32F||te===s.RGBA16F||te===s.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function A(C,M){let G;return C?M===null||M===Xn||M===_r?G=s.DEPTH24_STENCIL8:M===vn?G=s.DEPTH32F_STENCIL8:M===gr&&(G=s.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Xn||M===_r?G=s.DEPTH_COMPONENT24:M===vn?G=s.DEPTH_COMPONENT32F:M===gr&&(G=s.DEPTH_COMPONENT16),G}function T(C,M){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Jt&&C.minFilter!==zt?Math.log2(Math.max(M.width,M.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?M.mipmaps.length:1}function D(C){let M=C.target;M.removeEventListener("dispose",D),R(M),M.isVideoTexture&&h.delete(M),M.isHTMLTexture&&d.delete(M)}function v(C){let M=C.target;M.removeEventListener("dispose",v),F(M)}function R(C){let M=n.get(C);if(M.__webglInit===void 0)return;let G=C.source,q=f.get(G);if(q){let ee=q[M.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&I(C),Object.keys(q).length===0&&f.delete(G)}n.remove(C)}function I(C){let M=n.get(C);s.deleteTexture(M.__webglTexture);let G=C.source,q=f.get(G);delete q[M.__cacheKey],a.memory.textures--}function F(C){let M=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(M.__webglFramebuffer[q]))for(let ee=0;ee<M.__webglFramebuffer[q].length;ee++)s.deleteFramebuffer(M.__webglFramebuffer[q][ee]);else s.deleteFramebuffer(M.__webglFramebuffer[q]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[q])}else{if(Array.isArray(M.__webglFramebuffer))for(let q=0;q<M.__webglFramebuffer.length;q++)s.deleteFramebuffer(M.__webglFramebuffer[q]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let q=0;q<M.__webglColorRenderbuffer.length;q++)M.__webglColorRenderbuffer[q]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[q]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let G=C.textures;for(let q=0,ee=G.length;q<ee;q++){let ve=n.get(G[q]);ve.__webglTexture&&(s.deleteTexture(ve.__webglTexture),a.memory.textures--),n.remove(G[q])}n.remove(C)}let H=0;function X(){H=0}function N(){return H}function B(C){H=C}function V(){let C=H;return C>=i.maxTextures&&Pe("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+i.maxTextures),H+=1,C}function W(C){let M=[];return M.push(C.wrapS),M.push(C.wrapT),M.push(C.wrapR||0),M.push(C.magFilter),M.push(C.minFilter),M.push(C.anisotropy),M.push(C.internalFormat),M.push(C.format),M.push(C.type),M.push(C.generateMipmaps),M.push(C.premultiplyAlpha),M.push(C.flipY),M.push(C.unpackAlignment),M.push(C.colorSpace),M.join()}function ie(C,M){let G=n.get(C);if(C.isVideoTexture&&O(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&G.__version!==C.version){let q=C.image;if(q===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{Se(G,C,M);return}}else C.isExternalTexture&&(G.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,G.__webglTexture,s.TEXTURE0+M)}function Y(C,M){let G=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){Se(G,C,M);return}else C.isExternalTexture&&(G.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,G.__webglTexture,s.TEXTURE0+M)}function $(C,M){let G=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&G.__version!==C.version){Se(G,C,M);return}t.bindTexture(s.TEXTURE_3D,G.__webglTexture,s.TEXTURE0+M)}function se(C,M){let G=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&G.__version!==C.version){Ue(G,C,M);return}t.bindTexture(s.TEXTURE_CUBE_MAP,G.__webglTexture,s.TEXTURE0+M)}let Ge={[qr]:s.REPEAT,[Rn]:s.CLAMP_TO_EDGE,[Zr]:s.MIRRORED_REPEAT},Ae={[Jt]:s.NEAREST,[Pu]:s.NEAREST_MIPMAP_NEAREST,[mr]:s.NEAREST_MIPMAP_LINEAR,[zt]:s.LINEAR,[Ua]:s.LINEAR_MIPMAP_NEAREST,[xi]:s.LINEAR_MIPMAP_LINEAR},bt={[Rf]:s.NEVER,[Df]:s.ALWAYS,[Cf]:s.LESS,[rc]:s.LEQUAL,[Pf]:s.EQUAL,[ac]:s.GEQUAL,[If]:s.GREATER,[Lf]:s.NOTEQUAL};function nt(C,M){if(M.type===vn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===zt||M.magFilter===Ua||M.magFilter===mr||M.magFilter===xi||M.minFilter===zt||M.minFilter===Ua||M.minFilter===mr||M.minFilter===xi)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,Ge[M.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,Ge[M.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,Ge[M.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,Ae[M.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,Ae[M.minFilter]),M.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,bt[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Jt||M.minFilter!==mr&&M.minFilter!==xi||M.type===vn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let G=e.get("EXT_texture_filter_anisotropic");s.texParameterf(C,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function it(C,M){let G=!1;C.__webglInit===void 0&&(C.__webglInit=!0,M.addEventListener("dispose",D));let q=M.source,ee=f.get(q);ee===void 0&&(ee={},f.set(q,ee));let ve=W(M);if(ve!==C.__cacheKey){ee[ve]===void 0&&(ee[ve]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,G=!0),ee[ve].usedTimes++;let Re=ee[C.__cacheKey];Re!==void 0&&(ee[C.__cacheKey].usedTimes--,Re.usedTimes===0&&I(M)),C.__cacheKey=ve,C.__webglTexture=ee[ve].texture}return G}function Q(C,M,G){return Math.floor(Math.floor(C/G)/M)}function le(C,M,G,q){let ve=C.updateRanges;if(ve.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,G,q,M.data);else{ve.sort((Le,be)=>Le.start-be.start);let Re=0;for(let Le=1;Le<ve.length;Le++){let be=ve[Re],Ee=ve[Le],$e=be.start+be.count,et=Q(Ee.start,M.width,4),Je=Q(be.start,M.width,4);Ee.start<=$e+1&&et===Je&&Q(Ee.start+Ee.count-1,M.width,4)===et?be.count=Math.max(be.count,Ee.start+Ee.count-be.start):(++Re,ve[Re]=Ee)}ve.length=Re+1;let te=t.getParameter(s.UNPACK_ROW_LENGTH),ce=t.getParameter(s.UNPACK_SKIP_PIXELS),he=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let Le=0,be=ve.length;Le<be;Le++){let Ee=ve[Le],$e=Math.floor(Ee.start/4),et=Math.ceil(Ee.count/4),Je=$e%M.width,k=Math.floor($e/M.width),Te=et,oe=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,Je),t.pixelStorei(s.UNPACK_SKIP_ROWS,k),t.texSubImage2D(s.TEXTURE_2D,0,Je,k,Te,oe,G,q,M.data)}C.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,te),t.pixelStorei(s.UNPACK_SKIP_PIXELS,ce),t.pixelStorei(s.UNPACK_SKIP_ROWS,he)}}function Se(C,M,G){let q=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(q=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(q=s.TEXTURE_3D);let ee=it(C,M),ve=M.source;t.bindTexture(q,C.__webglTexture,s.TEXTURE0+G);let Re=n.get(ve);if(ve.version!==Re.__version||ee===!0){if(t.activeTexture(s.TEXTURE0+G),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let oe=Mt.getPrimaries(Mt.workingColorSpace),Ie=M.colorSpace===Ri?null:Mt.getPrimaries(M.colorSpace),De=M.colorSpace===Ri||oe===Ie?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,De)}t.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment);let ce=g(M.image,!1,i.maxTextureSize);ce=Pt(M,ce);let he=r.convert(M.format,M.colorSpace),Le=r.convert(M.type),be=x(M.internalFormat,he,Le,M.normalized,M.colorSpace,M.isVideoTexture);nt(q,M);let Ee,$e=M.mipmaps,et=M.isVideoTexture!==!0,Je=Re.__version===void 0||ee===!0,k=ve.dataReady,Te=T(M,ce);if(M.isDepthTexture)be=A(M.format===es,M.type),Je&&(et?t.texStorage2D(s.TEXTURE_2D,1,be,ce.width,ce.height):t.texImage2D(s.TEXTURE_2D,0,be,ce.width,ce.height,0,he,Le,null));else if(M.isDataTexture)if($e.length>0){et&&Je&&t.texStorage2D(s.TEXTURE_2D,Te,be,$e[0].width,$e[0].height);for(let oe=0,Ie=$e.length;oe<Ie;oe++)Ee=$e[oe],et?k&&t.texSubImage2D(s.TEXTURE_2D,oe,0,0,Ee.width,Ee.height,he,Le,Ee.data):t.texImage2D(s.TEXTURE_2D,oe,be,Ee.width,Ee.height,0,he,Le,Ee.data);M.generateMipmaps=!1}else et?(Je&&t.texStorage2D(s.TEXTURE_2D,Te,be,ce.width,ce.height),k&&le(M,ce,he,Le)):t.texImage2D(s.TEXTURE_2D,0,be,ce.width,ce.height,0,he,Le,ce.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){et&&Je&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Te,be,$e[0].width,$e[0].height,ce.depth);for(let oe=0,Ie=$e.length;oe<Ie;oe++)if(Ee=$e[oe],M.format!==Sn)if(he!==null)if(et){if(k)if(M.layerUpdates.size>0){let De=zu(Ee.width,Ee.height,M.format,M.type);for(let ue of M.layerUpdates){let qe=Ee.data.subarray(ue*De/Ee.data.BYTES_PER_ELEMENT,(ue+1)*De/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,oe,0,0,ue,Ee.width,Ee.height,1,he,qe)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,oe,0,0,0,Ee.width,Ee.height,ce.depth,he,Ee.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,oe,be,Ee.width,Ee.height,ce.depth,0,Ee.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else et?k&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,oe,0,0,0,Ee.width,Ee.height,ce.depth,he,Le,Ee.data):t.texImage3D(s.TEXTURE_2D_ARRAY,oe,be,Ee.width,Ee.height,ce.depth,0,he,Le,Ee.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{et&&Je&&t.texStorage2D(s.TEXTURE_2D,Te,be,$e[0].width,$e[0].height);for(let oe=0,Ie=$e.length;oe<Ie;oe++)Ee=$e[oe],M.format!==Sn?he!==null?et?k&&t.compressedTexSubImage2D(s.TEXTURE_2D,oe,0,0,Ee.width,Ee.height,he,Ee.data):t.compressedTexImage2D(s.TEXTURE_2D,oe,be,Ee.width,Ee.height,0,Ee.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):et?k&&t.texSubImage2D(s.TEXTURE_2D,oe,0,0,Ee.width,Ee.height,he,Le,Ee.data):t.texImage2D(s.TEXTURE_2D,oe,be,Ee.width,Ee.height,0,he,Le,Ee.data)}else if(M.isDataArrayTexture)if(et){if(Je&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Te,be,ce.width,ce.height,ce.depth),k)if(M.layerUpdates.size>0){let oe=zu(ce.width,ce.height,M.format,M.type);for(let Ie of M.layerUpdates){let De=ce.data.subarray(Ie*oe/ce.data.BYTES_PER_ELEMENT,(Ie+1)*oe/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Ie,ce.width,ce.height,1,he,Le,De)}M.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,he,Le,ce.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,be,ce.width,ce.height,ce.depth,0,he,Le,ce.data);else if(M.isData3DTexture)et?(Je&&t.texStorage3D(s.TEXTURE_3D,Te,be,ce.width,ce.height,ce.depth),k&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,he,Le,ce.data)):t.texImage3D(s.TEXTURE_3D,0,be,ce.width,ce.height,ce.depth,0,he,Le,ce.data);else if(M.isFramebufferTexture){if(Je)if(et)t.texStorage2D(s.TEXTURE_2D,Te,be,ce.width,ce.height);else{let oe=ce.width,Ie=ce.height;for(let De=0;De<Te;De++)t.texImage2D(s.TEXTURE_2D,De,be,oe,Ie,0,he,Le,null),oe>>=1,Ie>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in s){let oe=s.canvas;if(oe.hasAttribute("layoutsubtree")||oe.setAttribute("layoutsubtree","true"),ce.parentNode!==oe){oe.appendChild(ce),d.add(M),oe.onpaint=Ie=>{let De=Ie.changedElements;for(let ue of d)De.includes(ue.image)&&(ue.needsUpdate=!0)},oe.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,ce);else{let De=s.RGBA,ue=s.RGBA,qe=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,De,ue,qe,ce)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if($e.length>0){if(et&&Je){let oe=_t($e[0]);t.texStorage2D(s.TEXTURE_2D,Te,be,oe.width,oe.height)}for(let oe=0,Ie=$e.length;oe<Ie;oe++)Ee=$e[oe],et?k&&t.texSubImage2D(s.TEXTURE_2D,oe,0,0,he,Le,Ee):t.texImage2D(s.TEXTURE_2D,oe,be,he,Le,Ee);M.generateMipmaps=!1}else if(et){if(Je){let oe=_t(ce);t.texStorage2D(s.TEXTURE_2D,Te,be,oe.width,oe.height)}k&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,he,Le,ce)}else t.texImage2D(s.TEXTURE_2D,0,be,he,Le,ce);m(M)&&y(q),Re.__version=ve.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Ue(C,M,G){if(M.image.length!==6)return;let q=it(C,M),ee=M.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+G);let ve=n.get(ee);if(ee.version!==ve.__version||q===!0){t.activeTexture(s.TEXTURE0+G);let Re=Mt.getPrimaries(Mt.workingColorSpace),te=M.colorSpace===Ri?null:Mt.getPrimaries(M.colorSpace),ce=M.colorSpace===Ri||Re===te?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);let he=M.isCompressedTexture||M.image[0].isCompressedTexture,Le=M.image[0]&&M.image[0].isDataTexture,be=[];for(let ue=0;ue<6;ue++)!he&&!Le?be[ue]=g(M.image[ue],!0,i.maxCubemapSize):be[ue]=Le?M.image[ue].image:M.image[ue],be[ue]=Pt(M,be[ue]);let Ee=be[0],$e=r.convert(M.format,M.colorSpace),et=r.convert(M.type),Je=x(M.internalFormat,$e,et,M.normalized,M.colorSpace),k=M.isVideoTexture!==!0,Te=ve.__version===void 0||q===!0,oe=ee.dataReady,Ie=T(M,Ee);nt(s.TEXTURE_CUBE_MAP,M);let De;if(he){k&&Te&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Ie,Je,Ee.width,Ee.height);for(let ue=0;ue<6;ue++){De=be[ue].mipmaps;for(let qe=0;qe<De.length;qe++){let Ye=De[qe];M.format!==Sn?$e!==null?k?oe&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,qe,0,0,Ye.width,Ye.height,$e,Ye.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,qe,Je,Ye.width,Ye.height,0,Ye.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):k?oe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,qe,0,0,Ye.width,Ye.height,$e,et,Ye.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,qe,Je,Ye.width,Ye.height,0,$e,et,Ye.data)}}}else{if(De=M.mipmaps,k&&Te){De.length>0&&Ie++;let ue=_t(be[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Ie,Je,ue.width,ue.height)}for(let ue=0;ue<6;ue++)if(Le){k?oe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,be[ue].width,be[ue].height,$e,et,be[ue].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Je,be[ue].width,be[ue].height,0,$e,et,be[ue].data);for(let qe=0;qe<De.length;qe++){let Ut=De[qe].image[ue].image;k?oe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,qe+1,0,0,Ut.width,Ut.height,$e,et,Ut.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,qe+1,Je,Ut.width,Ut.height,0,$e,et,Ut.data)}}else{k?oe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,$e,et,be[ue]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Je,$e,et,be[ue]);for(let qe=0;qe<De.length;qe++){let Ye=De[qe];k?oe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,qe+1,0,0,$e,et,Ye.image[ue]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ue,qe+1,Je,$e,et,Ye.image[ue])}}}m(M)&&y(s.TEXTURE_CUBE_MAP),ve.__version=ee.version,M.onUpdate&&M.onUpdate(M)}C.__version=M.version}function Fe(C,M,G,q,ee,ve){let Re=r.convert(G.format,G.colorSpace),te=r.convert(G.type),ce=x(G.internalFormat,Re,te,G.normalized,G.colorSpace),he=n.get(M),Le=n.get(G);if(Le.__renderTarget=M,!he.__hasExternalTextures){let be=Math.max(1,M.width>>ve),Ee=Math.max(1,M.height>>ve);ee===s.TEXTURE_3D||ee===s.TEXTURE_2D_ARRAY?t.texImage3D(ee,ve,ce,be,Ee,M.depth,0,Re,te,null):t.texImage2D(ee,ve,ce,be,Ee,0,Re,te,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),rt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,q,ee,Le.__webglTexture,0,ot(M)):(ee===s.TEXTURE_2D||ee>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,q,ee,Le.__webglTexture,ve),t.bindFramebuffer(s.FRAMEBUFFER,null)}function je(C,M,G){if(s.bindRenderbuffer(s.RENDERBUFFER,C),M.depthBuffer){let q=M.depthTexture,ee=q&&q.isDepthTexture?q.type:null,ve=A(M.stencilBuffer,ee),Re=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;rt(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ot(M),ve,M.width,M.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,ot(M),ve,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ve,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Re,s.RENDERBUFFER,C)}else{let q=M.textures;for(let ee=0;ee<q.length;ee++){let ve=q[ee],Re=r.convert(ve.format,ve.colorSpace),te=r.convert(ve.type),ce=x(ve.internalFormat,Re,te,ve.normalized,ve.colorSpace);rt(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ot(M),ce,M.width,M.height):G?s.renderbufferStorageMultisample(s.RENDERBUFFER,ot(M),ce,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ce,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function st(C,M,G){let q=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ee=n.get(M.depthTexture);if(ee.__renderTarget=M,(!ee.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),q){if(ee.__webglInit===void 0&&(ee.__webglInit=!0,M.depthTexture.addEventListener("dispose",D)),ee.__webglTexture===void 0){ee.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,ee.__webglTexture),nt(s.TEXTURE_CUBE_MAP,M.depthTexture);let he=r.convert(M.depthTexture.format),Le=r.convert(M.depthTexture.type),be;M.depthTexture.format===oi?be=s.DEPTH_COMPONENT24:M.depthTexture.format===es&&(be=s.DEPTH24_STENCIL8);for(let Ee=0;Ee<6;Ee++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,be,M.width,M.height,0,he,Le,null)}}else ie(M.depthTexture,0);let ve=ee.__webglTexture,Re=ot(M),te=q?s.TEXTURE_CUBE_MAP_POSITIVE_X+G:s.TEXTURE_2D,ce=M.depthTexture.format===es?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(M.depthTexture.format===oi)rt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ce,te,ve,0,Re):s.framebufferTexture2D(s.FRAMEBUFFER,ce,te,ve,0);else if(M.depthTexture.format===es)rt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ce,te,ve,0,Re):s.framebufferTexture2D(s.FRAMEBUFFER,ce,te,ve,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function re(C){let M=n.get(C),G=C.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==C.depthTexture){let q=C.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),q){let ee=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,q.removeEventListener("dispose",ee)};q.addEventListener("dispose",ee),M.__depthDisposeCallback=ee}M.__boundDepthTexture=q}if(C.depthTexture&&!M.__autoAllocateDepthBuffer)if(G)for(let q=0;q<6;q++)st(M.__webglFramebuffer[q],C,q);else{let q=C.texture.mipmaps;q&&q.length>0?st(M.__webglFramebuffer[0],C,0):st(M.__webglFramebuffer,C,0)}else if(G){M.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[q]),M.__webglDepthbuffer[q]===void 0)M.__webglDepthbuffer[q]=s.createRenderbuffer(),je(M.__webglDepthbuffer[q],C,!1);else{let ee=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ve=M.__webglDepthbuffer[q];s.bindRenderbuffer(s.RENDERBUFFER,ve),s.framebufferRenderbuffer(s.FRAMEBUFFER,ee,s.RENDERBUFFER,ve)}}else{let q=C.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),je(M.__webglDepthbuffer,C,!1);else{let ee=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ve=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ve),s.framebufferRenderbuffer(s.FRAMEBUFFER,ee,s.RENDERBUFFER,ve)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function _e(C,M,G){let q=n.get(C);M!==void 0&&Fe(q.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),G!==void 0&&re(C)}function ge(C){let M=C.texture,G=n.get(C),q=n.get(M);C.addEventListener("dispose",v);let ee=C.textures,ve=C.isWebGLCubeRenderTarget===!0,Re=ee.length>1;if(Re||(q.__webglTexture===void 0&&(q.__webglTexture=s.createTexture()),q.__version=M.version,a.memory.textures++),ve){G.__webglFramebuffer=[];for(let te=0;te<6;te++)if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer[te]=[];for(let ce=0;ce<M.mipmaps.length;ce++)G.__webglFramebuffer[te][ce]=s.createFramebuffer()}else G.__webglFramebuffer[te]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer=[];for(let te=0;te<M.mipmaps.length;te++)G.__webglFramebuffer[te]=s.createFramebuffer()}else G.__webglFramebuffer=s.createFramebuffer();if(Re)for(let te=0,ce=ee.length;te<ce;te++){let he=n.get(ee[te]);he.__webglTexture===void 0&&(he.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&rt(C)===!1){G.__webglMultisampledFramebuffer=s.createFramebuffer(),G.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let te=0;te<ee.length;te++){let ce=ee[te];G.__webglColorRenderbuffer[te]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,G.__webglColorRenderbuffer[te]);let he=r.convert(ce.format,ce.colorSpace),Le=r.convert(ce.type),be=x(ce.internalFormat,he,Le,ce.normalized,ce.colorSpace,C.isXRRenderTarget===!0),Ee=ot(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ee,be,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+te,s.RENDERBUFFER,G.__webglColorRenderbuffer[te])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(G.__webglDepthRenderbuffer=s.createRenderbuffer(),je(G.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ve){t.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture),nt(s.TEXTURE_CUBE_MAP,M);for(let te=0;te<6;te++)if(M.mipmaps&&M.mipmaps.length>0)for(let ce=0;ce<M.mipmaps.length;ce++)Fe(G.__webglFramebuffer[te][ce],C,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+te,ce);else Fe(G.__webglFramebuffer[te],C,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+te,0);m(M)&&y(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let te=0,ce=ee.length;te<ce;te++){let he=ee[te],Le=n.get(he),be=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(be=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(be,Le.__webglTexture),nt(be,he),Fe(G.__webglFramebuffer,C,he,s.COLOR_ATTACHMENT0+te,be,0),m(he)&&y(be)}t.unbindTexture()}else{let te=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(te=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(te,q.__webglTexture),nt(te,M),M.mipmaps&&M.mipmaps.length>0)for(let ce=0;ce<M.mipmaps.length;ce++)Fe(G.__webglFramebuffer[ce],C,M,s.COLOR_ATTACHMENT0,te,ce);else Fe(G.__webglFramebuffer,C,M,s.COLOR_ATTACHMENT0,te,0);m(M)&&y(te),t.unbindTexture()}C.depthBuffer&&re(C)}function ye(C){let M=C.textures;for(let G=0,q=M.length;G<q;G++){let ee=M[G];if(m(ee)){let ve=b(C),Re=n.get(ee).__webglTexture;t.bindTexture(ve,Re),y(ve),t.unbindTexture()}}}let Me=[],ct=[];function Qe(C){if(C.samples>0){if(rt(C)===!1){let M=C.textures,G=C.width,q=C.height,ee=s.COLOR_BUFFER_BIT,ve=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Re=n.get(C),te=M.length>1;if(te)for(let he=0;he<M.length;he++)t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+he,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+he,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer);let ce=C.texture.mipmaps;ce&&ce.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let he=0;he<M.length;he++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(ee|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(ee|=s.STENCIL_BUFFER_BIT)),te){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Re.__webglColorRenderbuffer[he]);let Le=n.get(M[he]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Le,0)}s.blitFramebuffer(0,0,G,q,0,0,G,q,ee,s.NEAREST),l===!0&&(Me.length=0,ct.length=0,Me.push(s.COLOR_ATTACHMENT0+he),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(Me.push(ve),ct.push(ve),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,ct)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Me))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),te)for(let he=0;he<M.length;he++){t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+he,s.RENDERBUFFER,Re.__webglColorRenderbuffer[he]);let Le=n.get(M[he]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Re.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+he,s.TEXTURE_2D,Le,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let M=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function ot(C){return Math.min(i.maxSamples,C.samples)}function rt(C){let M=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function O(C){let M=a.render.frame;h.get(C)!==M&&(h.set(C,M),C.update())}function Pt(C,M){let G=C.colorSpace,q=C.format,ee=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||G!==$r&&G!==Ri&&(Mt.getTransfer(G)===Dt?(q!==Sn||ee!==Ln)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ke("WebGLTextures: Unsupported texture color space:",G)),M}function _t(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=X,this.getTextureUnits=N,this.setTextureUnits=B,this.setTexture2D=ie,this.setTexture2DArray=Y,this.setTexture3D=$,this.setTextureCube=se,this.rebindTextures=_e,this.setupRenderTarget=ge,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=Qe,this.setupDepthRenderbuffer=re,this.setupFrameBufferTexture=Fe,this.useMultisampledRTT=rt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function s0(s,e){function t(n,i=Ri){let r,a=Mt.getTransfer(i);if(n===Ln)return s.UNSIGNED_BYTE;if(n===bl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===El)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Du)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Uu)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Iu)return s.BYTE;if(n===Lu)return s.SHORT;if(n===gr)return s.UNSIGNED_SHORT;if(n===Ml)return s.INT;if(n===Xn)return s.UNSIGNED_INT;if(n===vn)return s.FLOAT;if(n===Qn)return s.HALF_FLOAT;if(n===Nu)return s.ALPHA;if(n===Fu)return s.RGB;if(n===Sn)return s.RGBA;if(n===oi)return s.DEPTH_COMPONENT;if(n===es)return s.DEPTH_STENCIL;if(n===wl)return s.RED;if(n===Na)return s.RED_INTEGER;if(n===ts)return s.RG;if(n===Tl)return s.RG_INTEGER;if(n===Al)return s.RGBA_INTEGER;if(n===Fa||n===Oa||n===Ba||n===za)if(a===Dt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Fa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===za)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Fa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Oa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ba)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===za)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Rl||n===Cl||n===Pl||n===Il)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Rl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Cl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Pl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Il)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ll||n===Dl||n===Ul||n===Nl||n===Fl||n===Va||n===Ol)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ll||n===Dl)return a===Dt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ul)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Nl)return r.COMPRESSED_R11_EAC;if(n===Fl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Va)return r.COMPRESSED_RG11_EAC;if(n===Ol)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Bl||n===zl||n===Vl||n===kl||n===Hl||n===Gl||n===Wl||n===Xl||n===Yl||n===ql||n===Zl||n===Jl||n===Kl||n===$l)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Bl)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===zl)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Vl)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===kl)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Hl)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Gl)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wl)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Xl)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Yl)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ql)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Zl)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Jl)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Kl)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===$l)return a===Dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===jl||n===Ql||n===ec)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===jl)return a===Dt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ql)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ec)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===tc||n===nc||n===ka||n===ic)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===tc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===nc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ka)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ic)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===_r?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var KM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$M=`
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

}`,ep=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new oa(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new dn({vertexShader:KM,fragmentShader:$M,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Bt(new ui(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},tp=class extends On{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,p=null,_=typeof XRWebGLBinding<"u",g=new ep,m={},y=t.getContextAttributes(),b=null,x=null,A=[],T=[],D=new ae,v=null,R=null,I=new Zt;I.viewport=new wt;let F=new Zt;F.viewport=new wt;let H=[I,F],X=new ml,N=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let le=A[Q];return le===void 0&&(le=new qs,A[Q]=le),le.getTargetRaySpace()},this.getControllerGrip=function(Q){let le=A[Q];return le===void 0&&(le=new qs,A[Q]=le),le.getGripSpace()},this.getHand=function(Q){let le=A[Q];return le===void 0&&(le=new qs,A[Q]=le),le.getHandSpace()};function V(Q){let le=T.indexOf(Q.inputSource);if(le===-1)return;let Se=A[le];Se!==void 0&&(Se.update(Q.inputSource,Q.frame,c||a),Se.dispatchEvent({type:Q.type,data:Q.inputSource}))}function W(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",ie);for(let Q=0;Q<A.length;Q++){let le=T[Q];le!==null&&(T[Q]=null,A[Q].disconnect(le))}N=null,B=null,g.reset();for(let Q in m)delete m[Q];if(e.setRenderTarget(b),f=null,u=null,d=null,i=null,x=null,it.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(D.width,D.height,!1),R!==null){let Q=R.camera;Q.fov=R.fov,Q.zoom=R.zoom,Q.updateProjectionMatrix(),R=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,n.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,n.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(Q){if(i=Q,i!==null){if(b=e.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",W),i.addEventListener("inputsourceschange",ie),y.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(D),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Se=null,Ue=null,Fe=null;y.depth&&(Fe=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Se=y.stencil?es:oi,Ue=y.stencil?_r:Xn);let je={colorFormat:t.RGBA8,depthFormat:Fe,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(je),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new un(u.textureWidth,u.textureHeight,{format:Sn,type:Ln,depthTexture:new Xi(u.textureWidth,u.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,Se),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let Se={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,Se),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new un(f.framebufferWidth,f.framebufferHeight,{format:Sn,type:Ln,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),it.setContext(i),it.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function ie(Q){for(let le=0;le<Q.removed.length;le++){let Se=Q.removed[le],Ue=T.indexOf(Se);Ue>=0&&(T[Ue]=null,A[Ue].disconnect(Se))}for(let le=0;le<Q.added.length;le++){let Se=Q.added[le],Ue=T.indexOf(Se);if(Ue===-1){for(let je=0;je<A.length;je++)if(je>=T.length){T.push(Se),Ue=je;break}else if(T[je]===null){T[je]=Se,Ue=je;break}if(Ue===-1)break}let Fe=A[Ue];Fe&&Fe.connect(Se)}}let Y=new E,$=new E;function se(Q,le,Se){Y.setFromMatrixPosition(le.matrixWorld),$.setFromMatrixPosition(Se.matrixWorld);let Ue=Y.distanceTo($),Fe=le.projectionMatrix.elements,je=Se.projectionMatrix.elements,st=Fe[14]/(Fe[10]-1),re=Fe[14]/(Fe[10]+1),_e=(Fe[9]+1)/Fe[5],ge=(Fe[9]-1)/Fe[5],ye=(Fe[8]-1)/Fe[0],Me=(je[8]+1)/je[0],ct=st*ye,Qe=st*Me,ot=Ue/(-ye+Me),rt=ot*-ye;if(le.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(rt),Q.translateZ(ot),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Fe[10]===-1)Q.projectionMatrix.copy(le.projectionMatrix),Q.projectionMatrixInverse.copy(le.projectionMatrixInverse);else{let O=st+ot,Pt=re+ot,_t=ct-rt,C=Qe+(Ue-rt),M=_e*re/Pt*O,G=ge*re/Pt*O;Q.projectionMatrix.makePerspective(_t,C,M,G,O,Pt),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function Ge(Q,le){le===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(le.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(i===null)return;let le=Q.near,Se=Q.far;g.texture!==null&&(g.depthNear>0&&(le=g.depthNear),g.depthFar>0&&(Se=g.depthFar)),X.near=F.near=I.near=le,X.far=F.far=I.far=Se,(N!==X.near||B!==X.far)&&(i.updateRenderState({depthNear:X.near,depthFar:X.far}),N=X.near,B=X.far),X.layers.mask=Q.layers.mask|6,I.layers.mask=X.layers.mask&-5,F.layers.mask=X.layers.mask&-3;let Ue=Q.parent,Fe=X.cameras;Ge(X,Ue);for(let je=0;je<Fe.length;je++)Ge(Fe[je],Ue);Fe.length===2?se(X,I,F):X.projectionMatrix.copy(I.projectionMatrix),R===null&&Q.isPerspectiveCamera&&(R={camera:Q,fov:Q.fov,zoom:Q.zoom}),Ae(Q,X,Ue)};function Ae(Q,le,Se){Se===null?Q.matrix.copy(le.matrixWorld):(Q.matrix.copy(Se.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(le.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(le.projectionMatrix),Q.projectionMatrixInverse.copy(le.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Gs*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Q){l=Q,u!==null&&(u.fixedFoveation=Q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(X)},this.getCameraTexture=function(Q){return m[Q]};let bt=null;function nt(Q,le){if(h=le.getViewerPose(c||a),p=le,h!==null){let Se=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let Ue=!1;Se.length!==X.cameras.length&&(X.cameras.length=0,Ue=!0);for(let re=0;re<Se.length;re++){let _e=Se[re],ge=null;if(f!==null)ge=f.getViewport(_e);else{let Me=d.getViewSubImage(u,_e);ge=Me.viewport,re===0&&(e.setRenderTargetTextures(x,Me.colorTexture,Me.depthStencilTexture),e.setRenderTarget(x))}let ye=H[re];ye===void 0&&(ye=new Zt,ye.layers.enable(re),ye.viewport=new wt,H[re]=ye),ye.matrix.fromArray(_e.transform.matrix),ye.matrix.decompose(ye.position,ye.quaternion,ye.scale),ye.projectionMatrix.fromArray(_e.projectionMatrix),ye.projectionMatrixInverse.copy(ye.projectionMatrix).invert(),ye.viewport.set(ge.x,ge.y,ge.width,ge.height),re===0&&(X.matrix.copy(ye.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),Ue===!0&&X.cameras.push(ye)}let Fe=i.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let re=d.getDepthInformation(Se[0]);re&&re.isValid&&re.texture&&g.init(re,i.renderState)}if(Fe&&Fe.includes("camera-access")&&_){e.state.unbindTexture(),d=n.getBinding();for(let re=0;re<Se.length;re++){let _e=Se[re].camera;if(_e){let ge=m[_e];ge||(ge=new oa,m[_e]=ge);let ye=d.getCameraImage(_e);ge.sourceTexture=ye}}}}for(let Se=0;Se<A.length;Se++){let Ue=T[Se],Fe=A[Se];Ue!==null&&Fe!==void 0&&Fe.update(Ue,le,c||a)}bt&&bt(Q,le),le.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:le}),p=null}let it=new jg;it.setAnimationLoop(nt),this.setAnimationLoop=function(Q){bt=Q},this.dispose=function(){}}},jM=new ht,r0=new ft;r0.set(-1,0,0,0,1,0,0,0,1);function QM(s,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Of(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,y,b,x){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,x)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,y,b):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===bn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===bn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let y=e.get(m),b=y.envMap,x=y.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(jM.makeRotationFromEuler(x)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(r0),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,y,b){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*y,g.scale.value=b*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,y){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===bn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){let y=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function eb(s,e,t,n){let i={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,A){let T=A.program;n.uniformBlockBinding(x,T)}function c(x,A){let T=i[x.id];T===void 0&&(g(x),T=h(x),i[x.id]=T,x.addEventListener("dispose",y));let D=A.program;n.updateUBOMapping(x,D);let v=e.render.frame;r[x.id]!==v&&(u(x),r[x.id]=v)}function h(x){let A=d();x.__bindingPointIndex=A;let T=s.createBuffer(),D=x.__size,v=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,D,v),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,A,T),T}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Ke("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){let A=i[x.id],T=x.uniforms,D=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,A);for(let v=0,R=T.length;v<R;v++){let I=T[v];if(Array.isArray(I))for(let F=0,H=I.length;F<H;F++)f(I[F],v,F,D);else f(I,v,0,D)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,A,T,D){if(_(x,A,T,D)===!0){let v=x.__offset,R=x.value;if(Array.isArray(R)){let I=0;for(let F=0;F<R.length;F++){let H=R[F],X=m(H);p(H,x.__data,I),typeof H!="number"&&typeof H!="boolean"&&!H.isMatrix3&&!ArrayBuffer.isView(H)&&(I+=X.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(R,x.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,v,x.__data)}}function p(x,A,T){typeof x=="number"||typeof x=="boolean"?A[0]=x:x.isMatrix3?(A[0]=x.elements[0],A[1]=x.elements[1],A[2]=x.elements[2],A[3]=0,A[4]=x.elements[3],A[5]=x.elements[4],A[6]=x.elements[5],A[7]=0,A[8]=x.elements[6],A[9]=x.elements[7],A[10]=x.elements[8],A[11]=0):ArrayBuffer.isView(x)?A.set(new x.constructor(x.buffer,x.byteOffset,A.length)):x.toArray(A,T)}function _(x,A,T,D){let v=x.value,R=A+"_"+T;if(D[R]===void 0)return typeof v=="number"||typeof v=="boolean"?D[R]=v:ArrayBuffer.isView(v)?D[R]=v.slice():D[R]=v.clone(),!0;{let I=D[R];if(typeof v=="number"||typeof v=="boolean"){if(I!==v)return D[R]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(I.equals(v)===!1)return I.copy(v),!0}}return!1}function g(x){let A=x.uniforms,T=0,D=16;for(let R=0,I=A.length;R<I;R++){let F=Array.isArray(A[R])?A[R]:[A[R]];for(let H=0,X=F.length;H<X;H++){let N=F[H],B=Array.isArray(N.value)?N.value:[N.value];for(let V=0,W=B.length;V<W;V++){let ie=B[V],Y=m(ie),$=T%D,se=$%Y.boundary,Ge=$+se;T+=se,Ge!==0&&D-Ge<Y.storage&&(T+=D-Ge),N.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=T,T+=Y.storage}}}let v=T%D;return v>0&&(T+=D-v),x.__size=T,x.__cache={},this}function m(x){let A={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(A.boundary=4,A.storage=4):x.isVector2?(A.boundary=8,A.storage=8):x.isVector3||x.isColor?(A.boundary=16,A.storage=12):x.isVector4?(A.boundary=16,A.storage=16):x.isMatrix3?(A.boundary=48,A.storage=48):x.isMatrix4?(A.boundary=64,A.storage=64):x.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(A.boundary=16,A.storage=x.byteLength):Pe("WebGLRenderer: Unsupported uniform value type.",x),A}function y(x){let A=x.target;A.removeEventListener("dispose",y);let T=a.indexOf(A.__bindingPointIndex);a.splice(T,1),s.deleteBuffer(i[A.id]),delete i[A.id],delete r[A.id]}function b(){for(let x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:l,update:c,dispose:b}}var tb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ci=null;function nb(){return Ci===null&&(Ci=new Cn(tb,16,16,ts,Qn),Ci.name="DFG_LUT",Ci.minFilter=zt,Ci.magFilter=zt,Ci.wrapS=Rn,Ci.wrapT=Rn,Ci.generateMipmaps=!1,Ci.needsUpdate=!0),Ci}var fc=class{constructor(e={}){let{canvas:t=Uf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Ln}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let _=f,g=new Set([Al,Tl,Na]),m=new Set([Ln,Xn,gr,_r,bl,El]),y=new Uint32Array(4),b=new Int32Array(4),x=new E,A=null,T=null,D=[],v=[],R=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=jn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,F=!1,H=null,X=null,N=null,B=null;this._outputColorSpace=hn;let V=0,W=0,ie=null,Y=-1,$=null,se=new wt,Ge=new wt,Ae=null,bt=new Be(0),nt=0,it=t.width,Q=t.height,le=1,Se=null,Ue=null,Fe=new wt(0,0,it,Q),je=new wt(0,0,it,Q),st=!1,re=new Ei,_e=!1,ge=!1,ye=new ht,Me=new E,ct=new wt,Qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ot=!1;function rt(){return ie===null?le:1}let O=n;function Pt(w,z){return t.getContext(w,z)}let _t,C,M,G,q,ee,ve,Re,te,ce,he,Le,be,Ee,$e,et,Je,k,Te,oe,Ie,De,ue;try{let w={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Ut,!1),t.addEventListener("webglcontextrestored",vt,!1),t.addEventListener("webglcontextcreationerror",Qt,!1),O===null){let z="webgl2";if(O=Pt(z,w),O===null)throw Pt(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}qe()}catch(w){throw t.removeEventListener("webglcontextlost",Ut,!1),t.removeEventListener("webglcontextrestored",vt,!1),t.removeEventListener("webglcontextcreationerror",Qt,!1),Ke("WebGLRenderer: "+w.message),w}function qe(){_t=new hS(O),_t.init(),Ie=new s0(O,_t),C=new eS(O,_t,e,Ie),M=new ZM(O,_t),C.reversedDepthBuffer&&u&&M.buffers.depth.setReversed(!0),X=O.createFramebuffer(),N=O.createFramebuffer(),B=O.createFramebuffer(),G=new fS(O),q=new UM,ee=new JM(O,_t,M,q,C,Ie,G),ve=new cS(I),Re=new mx(O),De=new jv(O,Re),te=new uS(O,Re,G,De),ce=new mS(O,te,Re,De,G),k=new pS(O,C,ee),$e=new tS(q),he=new DM(I,ve,_t,C,De,$e),Le=new QM(I,q),be=new FM,Ee=new HM(_t),Je=new $v(I,ve,M,ce,p,l),et=new qM(I,ce,C),ue=new eb(O,G,C,M),Te=new Qv(O,_t,G),oe=new dS(O,_t,G),G.programs=he.programs,I.capabilities=C,I.extensions=_t,I.properties=q,I.renderLists=be,I.shadowMap=et,I.state=M,I.info=G}_!==Ln&&(R=new _S(_,t.width,t.height,o,i,r));let Ye=new tp(I,O);this.xr=Ye,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let w=_t.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=_t.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(w){w!==void 0&&(le=w,this.setSize(it,Q,!1))},this.getSize=function(w){return w.set(it,Q)},this.setSize=function(w,z,j=!0){if(Ye.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}it=w,Q=z,t.width=Math.floor(w*le),t.height=Math.floor(z*le),j===!0&&(t.style.width=w+"px",t.style.height=z+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,w,z)},this.getDrawingBufferSize=function(w){return w.set(it*le,Q*le).floor()},this.setDrawingBufferSize=function(w,z,j){it=w,Q=z,le=j,t.width=Math.floor(w*j),t.height=Math.floor(z*j),this.setViewport(0,0,w,z)},this.setEffects=function(w){if(_===Ln){Ke("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let z=0;z<w.length;z++)if(w[z].isOutputPass===!0){Pe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(se)},this.getViewport=function(w){return w.copy(Fe)},this.setViewport=function(w,z,j,Z){w.isVector4?Fe.set(w.x,w.y,w.z,w.w):Fe.set(w,z,j,Z),M.viewport(se.copy(Fe).multiplyScalar(le).round())},this.getScissor=function(w){return w.copy(je)},this.setScissor=function(w,z,j,Z){w.isVector4?je.set(w.x,w.y,w.z,w.w):je.set(w,z,j,Z),M.scissor(Ge.copy(je).multiplyScalar(le).round())},this.getScissorTest=function(){return st},this.setScissorTest=function(w){M.setScissorTest(st=w)},this.setOpaqueSort=function(w){Se=w},this.setTransparentSort=function(w){Ue=w},this.getClearColor=function(w){return w.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor(...arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha(...arguments)},this.clear=function(w=!0,z=!0,j=!0){let Z=0;if(w){let J=!1;if(ie!==null){let Oe=ie.texture.format;J=g.has(Oe)}if(J){let Oe=ie.texture.type,Ve=m.has(Oe),Ne=Je.getClearColor(),We=Je.getClearAlpha(),Ze=Ne.r,mt=Ne.g,xt=Ne.b;Ve?(y[0]=Ze,y[1]=mt,y[2]=xt,y[3]=We,O.clearBufferuiv(O.COLOR,0,y)):(b[0]=Ze,b[1]=mt,b[2]=xt,b[3]=We,O.clearBufferiv(O.COLOR,0,b))}else Z|=O.COLOR_BUFFER_BIT}z&&(Z|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(Z|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&O.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),H=w},this.dispose=function(){t.removeEventListener("webglcontextlost",Ut,!1),t.removeEventListener("webglcontextrestored",vt,!1),t.removeEventListener("webglcontextcreationerror",Qt,!1),Je.dispose(),be.dispose(),Ee.dispose(),q.dispose(),ve.dispose(),ce.dispose(),De.dispose(),ue.dispose(),he.dispose(),Ye.dispose(),Ye.removeEventListener("sessionstart",xc),Ye.removeEventListener("sessionend",yc),vi.stop()};function Ut(w){w.preventDefault(),ea("WebGLRenderer: Context Lost."),F=!0}function vt(){ea("WebGLRenderer: Context Restored."),F=!1;let w=G.autoReset,z=et.enabled,j=et.autoUpdate,Z=et.needsUpdate,J=et.type;qe(),G.autoReset=w,et.enabled=z,et.autoUpdate=j,et.needsUpdate=Z,et.type=J}function Qt(w){Ke("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ln(w){let z=w.target;z.removeEventListener("dispose",ln),As(z)}function As(w){Di(w),q.remove(w)}function Di(w){let z=q.get(w).programs;z!==void 0&&(z.forEach(function(j){he.releaseProgram(j)}),w.isShaderMaterial&&he.releaseShaderCache(w))}this.renderBufferDirect=function(w,z,j,Z,J,Oe){z===null&&(z=Qe);let Ve=J.isMesh&&J.matrixWorld.determinantAffine()<0,Ne=$u(w,z,j,Z,J);M.setMaterial(Z,Ve);let We=j.index,Ze=1;if(Z.wireframe===!0){if(We=te.getWireframeAttribute(j),We===void 0)return;Ze=2}let mt=j.drawRange,xt=j.attributes.position,Xe=mt.start*Ze,Tt=(mt.start+mt.count)*Ze;Oe!==null&&(Xe=Math.max(Xe,Oe.start*Ze),Tt=Math.min(Tt,(Oe.start+Oe.count)*Ze)),We!==null?(Xe=Math.max(Xe,0),Tt=Math.min(Tt,We.count)):xt!=null&&(Xe=Math.max(Xe,0),Tt=Math.min(Tt,xt.count));let Wt=Tt-Xe;if(Wt<0||Wt===1/0)return;De.setup(J,Z,Ne,j,We);let S,P=Te;if(We!==null&&(S=Re.get(We),P=oe,P.setIndex(S)),J.isMesh)Z.wireframe===!0?(M.setLineWidth(Z.wireframeLinewidth*rt()),P.setMode(O.LINES)):P.setMode(O.TRIANGLES);else if(J.isLine){let U=Z.linewidth;U===void 0&&(U=1),M.setLineWidth(U*rt()),J.isLineSegments?P.setMode(O.LINES):J.isLineLoop?P.setMode(O.LINE_LOOP):P.setMode(O.LINE_STRIP)}else J.isPoints?P.setMode(O.POINTS):J.isSprite&&P.setMode(O.TRIANGLES);if(J.isBatchedMesh)if(_t.get("WEBGL_multi_draw"))P.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else{let U=J._multiDrawStarts,L=J._multiDrawCounts,ne=J._multiDrawCount,de=We?Re.get(We).bytesPerElement:1,we=q.get(Z).currentProgram.getUniforms();for(let pe=0;pe<ne;pe++)we.setValue(O,"_gl_DrawID",pe),P.render(U[pe]/de,L[pe])}else if(J.isInstancedMesh)P.renderInstances(Xe,Wt,J.count);else if(j.isInstancedBufferGeometry){let U=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,L=Math.min(j.instanceCount,U);P.renderInstances(Xe,Wt,L)}else P.render(Xe,Wt)};function _c(w,z,j,Z){H!==null&&w.isNodeMaterial&&H.setObject(Z,w),_e===!0&&$e.setState(w,j,!1),w.transparent===!0&&w.side===Wn&&w.forceSinglePass===!1?(w.side=bn,w.needsUpdate=!0,is(w,z,Z),w.side=ji,w.needsUpdate=!0,is(w,z,Z),w.side=Wn):is(w,z,Z)}this.compile=function(w,z,j=null){j===null&&(j=w),H!==null&&H.renderStart(w,z,j),T=Ee.get(j),T.init(z),v.push(T),j.traverseVisible(function(J){J.isLight&&J.layers.test(z.layers)&&(T.pushLight(J),J.castShadow&&T.pushShadow(J))}),w!==j&&w.traverseVisible(function(J){J.isLight&&J.layers.test(z.layers)&&(T.pushLight(J),J.castShadow&&T.pushShadow(J))}),T.setupLights(),H!==null&&H.updateLights(T.state.lightsArray),ge=this.localClippingEnabled,_e=$e.init(this.clippingPlanes,ge),_e===!0&&$e.setGlobalState(this.clippingPlanes,z),H!==null&&et.render(T.state.shadowsArray,j,z);let Z=new Set;return w.traverse(function(J){if(!(J.isMesh||J.isPoints||J.isLine||J.isSprite))return;let Oe=J.material;if(Oe)if(Array.isArray(Oe))for(let Ve=0;Ve<Oe.length;Ve++){let Ne=Oe[Ve];_c(Ne,j,z,J),Z.add(Ne)}else _c(Oe,j,z,J),Z.add(Oe)}),T=v.pop(),H!==null&&H.renderEnd(),Z},this.compileAsync=function(w,z,j=null){let Z=this.compile(w,z,j);return new Promise(J=>{function Oe(){if(Z.forEach(function(Ve){let We=q.get(Ve).currentProgram;(We===void 0||We.isReady())&&Z.delete(Ve)}),Z.size===0){J(w);return}setTimeout(Oe,10)}_t.get("KHR_parallel_shader_compile")!==null?Oe():setTimeout(Oe,10)})};let Ui=null;function yi(w){Ui&&Ui(w)}function xc(){vi.stop()}function yc(){vi.start()}let vi=new jg;vi.setAnimationLoop(yi),typeof self<"u"&&vi.setContext(self),this.setAnimationLoop=function(w){Ui=w,Ye.setAnimationLoop(w),w===null?vi.stop():vi.start()},Ye.addEventListener("sessionstart",xc),Ye.addEventListener("sessionend",yc),this.render=function(w,z){if(z!==void 0&&z.isCamera!==!0){Ke("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(F===!0)return;H!==null&&H.renderStart(w,z);let j=Ye.enabled===!0&&Ye.isPresenting===!0,Z=R!==null&&(ie===null||j)&&R.begin(I,ie);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Ye.enabled===!0&&Ye.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Ye.cameraAutoUpdate===!0&&Ye.updateCamera(z),z=Ye.getCamera()),w.isScene===!0&&w.onBeforeRender(I,w,z,ie),T=Ee.get(w,v.length),T.init(z),T.state.textureUnits=ee.getTextureUnits(),v.push(T),ye.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),re.setFromProjectionMatrix(ye,Fn,z.reversedDepth),ge=this.localClippingEnabled,_e=$e.init(this.clippingPlanes,ge),A=be.get(w,D.length),A.init(),D.push(A),Ye.enabled===!0&&Ye.isPresenting===!0){let Ve=I.xr.getDepthSensingMesh();Ve!==null&&Sr(Ve,z,-1/0,I.sortObjects)}Sr(w,z,0,I.sortObjects),A.finish(),H!==null&&H.updateLights(T.state.lightsArray),I.sortObjects===!0&&A.sort(Se,Ue),ot=Ye.enabled===!1||Ye.isPresenting===!1||Ye.hasDepthSensing()===!1,ot&&Je.addToRenderList(A,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),_e===!0&&$e.beginShadows();let J=T.state.shadowsArray;if(et.render(J,w,z),_e===!0&&$e.endShadows(),(Z&&R.hasRenderPass())===!1){let Ve=A.opaque,Ne=A.transmissive;if(T.setupLights(),z.isArrayCamera){let We=z.cameras;if(Ne.length>0)for(let Ze=0,mt=We.length;Ze<mt;Ze++){let xt=We[Ze];Lt(Ve,Ne,w,xt)}ot&&Je.render(w);for(let Ze=0,mt=We.length;Ze<mt;Ze++){let xt=We[Ze];Rs(A,w,xt,xt.viewport)}}else Ne.length>0&&Lt(Ve,Ne,w,z),ot&&Je.render(w),Rs(A,w,z)}ie!==null&&W===0&&(ee.updateMultisampleRenderTarget(ie),ee.updateRenderTargetMipmap(ie)),Z&&R.end(I),w.isScene===!0&&w.onAfterRender(I,w,z),De.resetDefaultState(),Y=-1,$=null,v.pop(),v.length>0?(T=v[v.length-1],ee.setTextureUnits(T.state.textureUnits),_e===!0&&$e.setGlobalState(I.clippingPlanes,T.state.camera)):T=null,D.pop(),D.length>0?A=D[D.length-1]:A=null,H!==null&&H.renderEnd()};function Sr(w,z,j,Z){if(w.visible===!1)return;if(w.layers.test(z.layers)){if(w.isGroup)j=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(z);else if(w.isLightProbeGrid)T.pushLightProbeGrid(w);else if(w.isLight)T.pushLight(w),w.castShadow&&T.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(re)){Z&&ct.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ye);let Ve=ce.update(w),Ne=w.material;Ne.visible&&A.push(w,Ve,Ne,j,ct.z,null,z)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(re))){let Ve=ce.update(w),Ne=w.material;if(Z&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ct.copy(w.boundingSphere.center)):(Ve.boundingSphere===null&&Ve.computeBoundingSphere(),ct.copy(Ve.boundingSphere.center)),ct.applyMatrix4(w.matrixWorld).applyMatrix4(ye)),Array.isArray(Ne)){let We=Ve.groups;for(let Ze=0,mt=We.length;Ze<mt;Ze++){let xt=We[Ze],Xe=Ne[xt.materialIndex];Xe&&Xe.visible&&A.push(w,Ve,Xe,j,ct.z,xt,z)}}else Ne.visible&&A.push(w,Ve,Ne,j,ct.z,null,z)}}let Oe=w.children;for(let Ve=0,Ne=Oe.length;Ve<Ne;Ve++)Sr(Oe[Ve],z,j,Z)}function Rs(w,z,j,Z){let{opaque:J,transmissive:Oe,transparent:Ve}=w;T.setupLightsView(j),_e===!0&&$e.setGlobalState(I.clippingPlanes,j),Z&&M.viewport(se.copy(Z)),J.length>0&&Mr(J,z,j),Oe.length>0&&Mr(Oe,z,j),Ve.length>0&&Mr(Ve,z,j),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function Lt(w,z,j,Z){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[Z.id]===void 0){let Xe=_t.has("EXT_color_buffer_half_float")||_t.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[Z.id]=new un(1,1,{generateMipmaps:!0,type:Xe?Qn:Ln,minFilter:xi,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Mt.workingColorSpace})}let Oe=T.state.transmissionRenderTarget[Z.id],Ve=Z.viewport||se;Oe.setSize(Ve.z*I.transmissionResolutionScale,Ve.w*I.transmissionResolutionScale);let Ne=I.getRenderTarget(),We=I.getActiveCubeFace(),Ze=I.getActiveMipmapLevel();I.setRenderTarget(Oe),I.getClearColor(bt),nt=I.getClearAlpha(),nt<1&&I.setClearColor(16777215,.5),I.clear(),ot&&Je.render(j);let mt=I.toneMapping;I.toneMapping=jn;let xt=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),T.setupLightsView(Z),_e===!0&&$e.setGlobalState(I.clippingPlanes,Z),Mr(w,j,Z),ee.updateMultisampleRenderTarget(Oe),ee.updateRenderTargetMipmap(Oe),_t.has("WEBGL_multisampled_render_to_texture")===!1){let Xe=!1;for(let Tt=0,Wt=z.length;Tt<Wt;Tt++){let S=z[Tt],{object:P,geometry:U,material:L,group:ne}=S;if(L.side===Wn&&P.layers.test(Z.layers)){let de=L.side;L.side=bn,L.needsUpdate=!0,vc(P,j,Z,U,L,ne),L.side=de,L.needsUpdate=!0,Xe=!0}}Xe===!0&&(ee.updateMultisampleRenderTarget(Oe),ee.updateRenderTargetMipmap(Oe))}I.setRenderTarget(Ne,We,Ze),I.setClearColor(bt,nt),xt!==void 0&&(Z.viewport=xt),I.toneMapping=mt}function Mr(w,z,j){let Z=z.isScene===!0?z.overrideMaterial:null;for(let J=0,Oe=w.length;J<Oe;J++){let Ve=w[J],{object:Ne,geometry:We,group:Ze}=Ve,mt=Ve.material;mt.allowOverride===!0&&Z!==null&&(mt=Z),Ne.layers.test(j.layers)&&vc(Ne,z,j,We,mt,Ze)}}function vc(w,z,j,Z,J,Oe){H!==null&&J.isNodeMaterial&&H.setObject(w,J),w.onBeforeRender(I,z,j,Z,J,Oe),w.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),J.onBeforeRender(I,z,j,Z,w,Oe),J.transparent===!0&&J.side===Wn&&J.forceSinglePass===!1?(J.side=bn,J.needsUpdate=!0,I.renderBufferDirect(j,z,Z,J,w,Oe),J.side=ji,J.needsUpdate=!0,I.renderBufferDirect(j,z,Z,J,w,Oe),J.side=Wn):I.renderBufferDirect(j,z,Z,J,w,Oe),w.onAfterRender(I,z,j,Z,J,Oe)}function is(w,z,j){z.isScene!==!0&&(z=Qe);let Z=q.get(w),J=T.state.lights,Oe=T.state.shadowsArray,Ve=J.state.version,Ne=he.getParameters(w,J.state,Oe,z,j,T.state.lightProbeGridArray),We=he.getProgramCacheKey(Ne),Ze=Z.programs;Z.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?z.environment:null,Z.fog=z.fog;let mt=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;Z.envMap=ve.get(w.envMap||Z.environment,mt),Z.envMapRotation=Z.environment!==null&&w.envMap===null?z.environmentRotation:w.envMapRotation,Ze===void 0&&(w.addEventListener("dispose",ln),Ze=new Map,Z.programs=Ze);let xt=Ze.get(We);if(xt!==void 0){if(Z.currentProgram===xt&&Z.lightsStateVersion===Ve)return br(w,Ne),xt}else Ne.uniforms=he.getUniforms(w),H!==null&&w.isNodeMaterial&&H.build(w,j,Ne),w.onBeforeCompile(Ne,I),xt=he.acquireProgram(Ne,We),Ze.set(We,xt),Z.uniforms=Ne.uniforms;let Xe=Z.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Xe.clippingPlanes=$e.uniform),br(w,Ne),Z.needsLights=bc(w),Z.lightsStateVersion=Ve,Z.needsLights&&(Xe.ambientLightColor.value=J.state.ambient,Xe.lightProbe.value=J.state.probe,Xe.sunLights.value=J.state.sun,Xe.sunLightShadows.value=J.state.sunShadow,Xe.directionalLights.value=J.state.directional,Xe.directionalLightShadows.value=J.state.directionalShadow,Xe.spotLights.value=J.state.spot,Xe.spotLightShadows.value=J.state.spotShadow,Xe.rectAreaLights.value=J.state.rectArea,Xe.ltc_1.value=J.state.rectAreaLTC1,Xe.ltc_2.value=J.state.rectAreaLTC2,Xe.pointLights.value=J.state.point,Xe.pointLightShadows.value=J.state.pointShadow,Xe.hemisphereLights.value=J.state.hemi,Xe.sunShadowMatrix.value=J.state.sunShadowMatrix,Xe.sunShadowCascade.value=J.state.sunShadowCascade,Xe.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Xe.spotLightMatrix.value=J.state.spotLightMatrix,Xe.spotLightMap.value=J.state.spotLightMap,Xe.pointShadowMatrix.value=J.state.pointShadowMatrix),Z.lightProbeGrid=T.state.lightProbeGridArray.length>0,Z.currentProgram=xt,Z.uniformsList=null,xt}function Za(w){if(w.uniformsList===null){let z=w.currentProgram.getUniforms();w.uniformsList=Xa.seqWithValue(z.seq,w.uniforms)}return w.uniformsList}function br(w,z){let j=q.get(w);j.outputColorSpace=z.outputColorSpace,j.batching=z.batching,j.batchingColor=z.batchingColor,j.instancing=z.instancing,j.instancingColor=z.instancingColor,j.instancingMorph=z.instancingMorph,j.skinning=z.skinning,j.morphTargets=z.morphTargets,j.morphNormals=z.morphNormals,j.morphColors=z.morphColors,j.morphTargetsCount=z.morphTargetsCount,j.numClippingPlanes=z.numClippingPlanes,j.numIntersection=z.numClipIntersection,j.vertexAlphas=z.vertexAlphas,j.vertexTangents=z.vertexTangents,j.toneMapping=z.toneMapping}function Sc(w,z){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;x.setFromMatrixPosition(z.matrixWorld);for(let j=0,Z=w.length;j<Z;j++){let J=w[j];if(J.texture!==null&&J.boundingBox.containsPoint(x))return J}return null}function $u(w,z,j,Z,J){z.isScene!==!0&&(z=Qe),ee.resetTextureUnits();let Oe=z.fog,Ve=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?z.environment:null,Ne=ie===null?I.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Mt.workingColorSpace,We=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Ze=ve.get(Z.envMap||Ve,We),mt=Z.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,xt=!!j.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Xe=!!j.morphAttributes.position,Tt=!!j.morphAttributes.normal,Wt=!!j.morphAttributes.color,S=jn;Z.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(S=I.toneMapping);let P=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,U=P!==void 0?P.length:0,L=q.get(Z),ne=T.state.lights;if(_e===!0&&(ge===!0||w!==$)){let lt=w===$&&Z.id===Y;$e.setState(Z,w,lt)}let de=!1;Z.version===L.__version?(L.needsLights&&L.lightsStateVersion!==ne.state.version||L.outputColorSpace!==Ne||J.isBatchedMesh&&L.batching===!1||!J.isBatchedMesh&&L.batching===!0||J.isBatchedMesh&&L.batchingColor===!0&&J._colorsTexture===null||J.isBatchedMesh&&L.batchingColor===!1&&J._colorsTexture!==null||J.isInstancedMesh&&L.instancing===!1||!J.isInstancedMesh&&L.instancing===!0||J.isSkinnedMesh&&L.skinning===!1||!J.isSkinnedMesh&&L.skinning===!0||J.isInstancedMesh&&L.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&L.instancingColor===!1&&J.instanceColor!==null||J.isInstancedMesh&&L.instancingMorph===!0&&J.morphTexture===null||J.isInstancedMesh&&L.instancingMorph===!1&&J.morphTexture!==null||L.envMap!==Ze||Z.fog===!0&&L.fog!==Oe||L.numClippingPlanes!==void 0&&(L.numClippingPlanes!==$e.numPlanes||L.numIntersection!==$e.numIntersection)||L.vertexAlphas!==mt||L.vertexTangents!==xt||L.morphTargets!==Xe||L.morphNormals!==Tt||L.morphColors!==Wt||L.toneMapping!==S||L.morphTargetsCount!==U||!!L.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(de=!0):(de=!0,L.__version=Z.version);let we=L.currentProgram;de===!0&&(we=is(Z,z,J),H&&Z.isNodeMaterial&&H.onUpdateProgram(Z,we,L));let pe=!1,K=!1,at=!1,fe=we.getUniforms(),xe=L.uniforms;if(M.useProgram(we.program)&&(pe=!0,K=!0,at=!0),Z.id!==Y&&(Y=Z.id,K=!0),L.needsLights){let lt=Sc(T.state.lightProbeGridArray,J);L.lightProbeGrid!==lt&&(L.lightProbeGrid=lt,K=!0)}if(pe||$!==w){M.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),fe.setValue(O,"projectionMatrix",w.projectionMatrix),fe.setValue(O,"viewMatrix",w.matrixWorldInverse);let It=fe.map.cameraPosition;It!==void 0&&It.setValue(O,Me.setFromMatrixPosition(w.matrixWorld)),C.logarithmicDepthBuffer&&fe.setValue(O,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&fe.setValue(O,"isOrthographic",w.isOrthographicCamera===!0),$!==w&&($=w,K=!0,at=!0)}if(L.needsLights&&(ne.state.sunShadowMap.length>0&&fe.setValue(O,"sunShadowMap",ne.state.sunShadowMap,ee),ne.state.directionalShadowMap.length>0&&fe.setValue(O,"directionalShadowMap",ne.state.directionalShadowMap,ee),ne.state.spotShadowMap.length>0&&fe.setValue(O,"spotShadowMap",ne.state.spotShadowMap,ee),ne.state.pointShadowMap.length>0&&fe.setValue(O,"pointShadowMap",ne.state.pointShadowMap,ee)),J.isSkinnedMesh){fe.setOptional(O,J,"bindMatrix"),fe.setOptional(O,J,"bindMatrixInverse");let lt=J.skeleton;lt&&(lt.boneTexture===null&&lt.computeBoneTexture(),fe.setValue(O,"boneTexture",lt.boneTexture,ee))}J.isBatchedMesh&&(fe.setOptional(O,J,"batchingTexture"),fe.setValue(O,"batchingTexture",J._matricesTexture,ee),fe.setOptional(O,J,"batchingIdTexture"),fe.setValue(O,"batchingIdTexture",J._indirectTexture,ee),fe.setOptional(O,J,"batchingColorTexture"),J._colorsTexture!==null&&fe.setValue(O,"batchingColorTexture",J._colorsTexture,ee));let ke=j.morphAttributes;if((ke.position!==void 0||ke.normal!==void 0||ke.color!==void 0)&&k.update(J,j,we),(K||L.receiveShadow!==J.receiveShadow)&&(L.receiveShadow=J.receiveShadow,fe.setValue(O,"receiveShadow",J.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&z.environment!==null&&(xe.envMapIntensity.value=z.environmentIntensity),xe.dfgLUT!==void 0&&(xe.dfgLUT.value=nb()),K){if(fe.setValue(O,"toneMappingExposure",I.toneMappingExposure),L.needsLights&&Mc(xe,at),Oe&&Z.fog===!0&&Le.refreshFogUniforms(xe,Oe),Le.refreshMaterialUniforms(xe,Z,le,Q,T.state.transmissionRenderTarget[w.id]),L.needsLights&&L.lightProbeGrid){let lt=L.lightProbeGrid;xe.probesSH.value=lt.texture,xe.probesMin.value.copy(lt.boundingBox.min),xe.probesMax.value.copy(lt.boundingBox.max),xe.probesResolution.value.copy(lt.resolution)}Xa.upload(O,Za(L),xe,ee)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Xa.upload(O,Za(L),xe,ee),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&fe.setValue(O,"center",J.center),fe.setValue(O,"modelViewMatrix",J.modelViewMatrix),fe.setValue(O,"normalMatrix",J.normalMatrix),fe.setValue(O,"modelMatrix",J.matrixWorld),Z.uniformsGroups!==void 0){let lt=Z.uniformsGroups;for(let It=0,me=lt.length;It<me;It++){let He=lt[It];ue.update(He,we),ue.bind(He,we)}}return we}function Mc(w,z){w.ambientLightColor.needsUpdate=z,w.lightProbe.needsUpdate=z,w.sunLights.needsUpdate=z,w.sunLightShadows.needsUpdate=z,w.directionalLights.needsUpdate=z,w.directionalLightShadows.needsUpdate=z,w.pointLights.needsUpdate=z,w.pointLightShadows.needsUpdate=z,w.spotLights.needsUpdate=z,w.spotLightShadows.needsUpdate=z,w.rectAreaLights.needsUpdate=z,w.hemisphereLights.needsUpdate=z}function bc(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(w,z,j){let Z=q.get(w);Z.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),q.get(w.texture).__webglTexture=z,q.get(w.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:j,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,z){let j=q.get(w);j.__webglFramebuffer=z,j.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(w,z=0,j=0){ie=w,V=z,W=j;let Z=null,J=!1,Oe=!1;if(w){let Ne=q.get(w);if(Ne.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(O.FRAMEBUFFER,Ne.__webglFramebuffer),se.copy(w.viewport),Ge.copy(w.scissor),Ae=w.scissorTest,M.viewport(se),M.scissor(Ge),M.setScissorTest(Ae),Y=-1;return}else if(Ne.__webglFramebuffer===void 0)ee.setupRenderTarget(w);else if(Ne.__hasExternalTextures)ee.rebindTextures(w,q.get(w.texture).__webglTexture,q.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let mt=w.depthTexture;if(Ne.__boundDepthTexture!==mt){if(mt!==null&&q.has(mt)&&(w.width!==mt.image.width||w.height!==mt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ee.setupDepthRenderbuffer(w)}}let We=w.texture;(We.isData3DTexture||We.isDataArrayTexture||We.isCompressedArrayTexture)&&(Oe=!0);let Ze=q.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ze[z])?Z=Ze[z][j]:Z=Ze[z],J=!0):w.samples>0&&ee.useMultisampledRTT(w)===!1?Z=q.get(w).__webglMultisampledFramebuffer:Array.isArray(Ze)?Z=Ze[j]:Z=Ze,se.copy(w.viewport),Ge.copy(w.scissor),Ae=w.scissorTest}else se.copy(Fe).multiplyScalar(le).floor(),Ge.copy(je).multiplyScalar(le).floor(),Ae=st;if(j!==0&&(Z=X),M.bindFramebuffer(O.FRAMEBUFFER,Z)&&M.drawBuffers(w,Z),M.viewport(se),M.scissor(Ge),M.setScissorTest(Ae),J){let Ne=q.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+z,Ne.__webglTexture,j)}else if(Oe){let Ne=z;for(let We=0;We<w.textures.length;We++){let Ze=q.get(w.textures[We]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+We,Ze.__webglTexture,j,Ne)}}else if(w!==null&&j!==0){let Ne=q.get(w.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ne.__webglTexture,j)}Y=-1};function Ec(w){let z=q.get(w);return(z.__readFormat!==w.format||z.__readType!==w.type)&&(z.__readFormat=w.format,z.__readType=w.type,z.__formatReadable=C.textureFormatReadable(w.format),z.__typeReadable=C.textureTypeReadable(w.type)),z}this.readRenderTargetPixels=function(w,z,j,Z,J,Oe,Ve,Ne=0){if(!(w&&w.isWebGLRenderTarget)){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let We=q.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ve!==void 0&&(We=We[Ve]),We){M.bindFramebuffer(O.FRAMEBUFFER,We);try{let Ze=w.textures[Ne],mt=Ze.format,xt=Ze.type;w.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Ne);let Xe=Ec(Ze);if(Xe.__formatReadable===!1){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Xe.__typeReadable===!1){Ke("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=w.width-Z&&j>=0&&j<=w.height-J&&O.readPixels(z,j,Z,J,Ie.convert(mt),Ie.convert(xt),Oe)}finally{let Ze=ie!==null?q.get(ie).__webglFramebuffer:null;M.bindFramebuffer(O.FRAMEBUFFER,Ze)}}},this.readRenderTargetPixelsAsync=async function(w,z,j,Z,J,Oe,Ve,Ne=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let We=q.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Ve!==void 0&&(We=We[Ve]),We)if(z>=0&&z<=w.width-Z&&j>=0&&j<=w.height-J){M.bindFramebuffer(O.FRAMEBUFFER,We);let Ze=w.textures[Ne],mt=Ze.format,xt=Ze.type;w.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Ne);let Xe=Ec(Ze);if(Xe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Xe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Tt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Tt),O.bufferData(O.PIXEL_PACK_BUFFER,Oe.byteLength,O.STREAM_READ),O.readPixels(z,j,Z,J,Ie.convert(mt),Ie.convert(xt),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let Wt=ie!==null?q.get(ie).__webglFramebuffer:null;M.bindFramebuffer(O.FRAMEBUFFER,Wt);let S=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await yg(O,S,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Tt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Oe),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(Tt),O.deleteSync(S),Oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,z=null,j=0){let Z=Math.pow(2,-j),J=Math.floor(w.image.width*Z),Oe=Math.floor(w.image.height*Z),Ve=z!==null?z.x:0,Ne=z!==null?z.y:0;ee.setTexture2D(w,0),O.copyTexSubImage2D(O.TEXTURE_2D,j,0,0,Ve,Ne,J,Oe),M.unbindTexture()},this.copyTextureToTexture=function(w,z,j=null,Z=null,J=0,Oe=0){let Ve,Ne,We,Ze,mt,xt,Xe,Tt,Wt,S=w.isCompressedTexture?w.mipmaps[Oe]:w.image;if(j!==null)Ve=j.max.x-j.min.x,Ne=j.max.y-j.min.y,We=j.isBox3?j.max.z-j.min.z:1,Ze=j.min.x,mt=j.min.y,xt=j.isBox3?j.min.z:0;else{let xe=Math.pow(2,-J);Ve=Math.floor(S.width*xe),Ne=Math.floor(S.height*xe),w.isDataArrayTexture?We=S.depth:w.isData3DTexture?We=Math.floor(S.depth*xe):We=1,Ze=0,mt=0,xt=0}Z!==null?(Xe=Z.x,Tt=Z.y,Wt=Z.z):(Xe=0,Tt=0,Wt=0);let P=Ie.convert(z.format),U=Ie.convert(z.type),L;z.isData3DTexture?(ee.setTexture3D(z,0),L=O.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(ee.setTexture2DArray(z,0),L=O.TEXTURE_2D_ARRAY):(ee.setTexture2D(z,0),L=O.TEXTURE_2D),M.activeTexture(O.TEXTURE0),M.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,z.flipY),M.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),M.pixelStorei(O.UNPACK_ALIGNMENT,z.unpackAlignment);let ne=M.getParameter(O.UNPACK_ROW_LENGTH),de=M.getParameter(O.UNPACK_IMAGE_HEIGHT),we=M.getParameter(O.UNPACK_SKIP_PIXELS),pe=M.getParameter(O.UNPACK_SKIP_ROWS),K=M.getParameter(O.UNPACK_SKIP_IMAGES);M.pixelStorei(O.UNPACK_ROW_LENGTH,S.width),M.pixelStorei(O.UNPACK_IMAGE_HEIGHT,S.height),M.pixelStorei(O.UNPACK_SKIP_PIXELS,Ze),M.pixelStorei(O.UNPACK_SKIP_ROWS,mt),M.pixelStorei(O.UNPACK_SKIP_IMAGES,xt);let at=w.isDataArrayTexture||w.isData3DTexture,fe=z.isDataArrayTexture||z.isData3DTexture;if(w.isDepthTexture){let xe=q.get(w),ke=q.get(z),lt=q.get(xe.__renderTarget),It=q.get(ke.__renderTarget);M.bindFramebuffer(O.READ_FRAMEBUFFER,lt.__webglFramebuffer),M.bindFramebuffer(O.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let me=0;me<We;me++)at&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,q.get(w).__webglTexture,J,xt+me),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,q.get(z).__webglTexture,Oe,Wt+me)),O.blitFramebuffer(Ze,mt,Ve,Ne,Xe,Tt,Ve,Ne,O.DEPTH_BUFFER_BIT,O.NEAREST);M.bindFramebuffer(O.READ_FRAMEBUFFER,null),M.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(J!==0||w.isRenderTargetTexture||q.has(w)){let xe=q.get(w),ke=q.get(z);M.bindFramebuffer(O.READ_FRAMEBUFFER,N),M.bindFramebuffer(O.DRAW_FRAMEBUFFER,B);for(let lt=0;lt<We;lt++)at?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,xe.__webglTexture,J,xt+lt):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,xe.__webglTexture,J),fe?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,ke.__webglTexture,Oe,Wt+lt):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ke.__webglTexture,Oe),J!==0?O.blitFramebuffer(Ze,mt,Ve,Ne,Xe,Tt,Ve,Ne,O.COLOR_BUFFER_BIT,O.NEAREST):fe?O.copyTexSubImage3D(L,Oe,Xe,Tt,Wt+lt,Ze,mt,Ve,Ne):O.copyTexSubImage2D(L,Oe,Xe,Tt,Ze,mt,Ve,Ne);M.bindFramebuffer(O.READ_FRAMEBUFFER,null),M.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else fe?w.isDataTexture||w.isData3DTexture?O.texSubImage3D(L,Oe,Xe,Tt,Wt,Ve,Ne,We,P,U,S.data):z.isCompressedArrayTexture?O.compressedTexSubImage3D(L,Oe,Xe,Tt,Wt,Ve,Ne,We,P,S.data):O.texSubImage3D(L,Oe,Xe,Tt,Wt,Ve,Ne,We,P,U,S):w.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Oe,Xe,Tt,Ve,Ne,P,U,S.data):w.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Oe,Xe,Tt,S.width,S.height,P,S.data):O.texSubImage2D(O.TEXTURE_2D,Oe,Xe,Tt,Ve,Ne,P,U,S);M.pixelStorei(O.UNPACK_ROW_LENGTH,ne),M.pixelStorei(O.UNPACK_IMAGE_HEIGHT,de),M.pixelStorei(O.UNPACK_SKIP_PIXELS,we),M.pixelStorei(O.UNPACK_SKIP_ROWS,pe),M.pixelStorei(O.UNPACK_SKIP_IMAGES,K),Oe===0&&z.generateMipmaps&&O.generateMipmap(L),M.unbindTexture()},this.initRenderTarget=function(w){q.get(w).__webglFramebuffer===void 0&&ee.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?ee.setTextureCube(w,0):w.isData3DTexture?ee.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?ee.setTexture2DArray(w,0):ee.setTexture2D(w,0),M.unbindTexture()},this.resetState=function(){V=0,W=0,ie=null,M.reset(),De.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Mt._getUnpackColorSpace()}};var a0={type:"change"},ip={type:"start"},l0={type:"end"},Wu=new li,o0=new Nn,ib=Math.cos(70*Yn.DEG2RAD),on=new E,Vn=2*Math.PI,Ot={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},np=1e-6,Xu=class extends Aa{constructor(e,t=null){super(e,t),this.state=Ot.NONE,this.target=new E,this.cursor=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Ki.ROTATE,MIDDLE:Ki.DOLLY,RIGHT:Ki.PAN},this.touches={ONE:$i.ROTATE,TWO:$i.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new E,this._lastQuaternion=new jt,this._lastTargetPosition=new E,this._quat=new jt().setFromUnitVectors(e.up,new E(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new ur,this._sphericalDelta=new ur,this._scale=1,this._panOffset=new E,this._rotateStart=new ae,this._rotateEnd=new ae,this._rotateDelta=new ae,this._panStart=new ae,this._panEnd=new ae,this._panDelta=new ae,this._dollyStart=new ae,this._dollyEnd=new ae,this._dollyDelta=new ae,this._dollyDirection=new E,this._mouse=new ae,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=rb.bind(this),this._onPointerDown=sb.bind(this),this._onPointerUp=ab.bind(this),this._onContextMenu=fb.bind(this),this._onMouseWheel=cb.bind(this),this._onKeyDown=hb.bind(this),this._onTouchStart=ub.bind(this),this._onTouchMove=db.bind(this),this._onMouseDown=ob.bind(this),this._onMouseMove=lb.bind(this),this._interceptControlDown=pb.bind(this),this._interceptControlUp=mb.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Ot.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(a0),this.update(),this.state=Ot.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;on.copy(t).sub(this.target),on.applyQuaternion(this._quat),this._spherical.setFromVector3(on),this.autoRotate&&this.state===Ot.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Vn:n>Math.PI&&(n-=Vn),i<-Math.PI?i+=Vn:i>Math.PI&&(i-=Vn),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(on.setFromSpherical(this._spherical),on.applyQuaternion(this._quatInverse),t.copy(this.target).add(on),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=on.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new E(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new E(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=on.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Wu.origin.copy(this.object.position),Wu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Wu.direction))<ib?this.object.lookAt(this.target):(o0.setFromNormalAndCoplanarPoint(this.object.up,this.target),Wu.intersectPlane(o0,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>np||8*(1-this._lastQuaternion.dot(this.object.quaternion))>np||this._lastTargetPosition.distanceToSquared(this.target)>np?(this.dispatchEvent(a0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Vn/60*this.autoRotateSpeed*e:Vn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){on.setFromMatrixColumn(t,0),on.multiplyScalar(-e),this._panOffset.add(on)}_panUp(e,t){this.screenSpacePanning===!0?on.setFromMatrixColumn(t,1):(on.setFromMatrixColumn(t,0),on.crossVectors(this.object.up,on)),on.multiplyScalar(e),this._panOffset.add(on)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;on.copy(i).sub(this.target);let r=on.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Vn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Vn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Vn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Vn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ae,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function sb(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function rb(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function ab(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(l0),this.state=Ot.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function ob(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Ki.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=Ot.DOLLY;break;case Ki.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Ot.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Ot.ROTATE}break;case Ki.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Ot.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Ot.PAN}break;default:this.state=Ot.NONE}this.state!==Ot.NONE&&this.dispatchEvent(ip)}function lb(s){switch(this.state){case Ot.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case Ot.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case Ot.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function cb(s){this.enabled===!1||this.enableZoom===!1||this.state!==Ot.NONE||(s.preventDefault(),this.dispatchEvent(ip),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(l0))}function hb(s){this.enabled!==!1&&this._handleKeyDown(s)}function ub(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case $i.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=Ot.TOUCH_ROTATE;break;case $i.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=Ot.TOUCH_PAN;break;default:this.state=Ot.NONE}break;case 2:switch(this.touches.TWO){case $i.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=Ot.TOUCH_DOLLY_PAN;break;case $i.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=Ot.TOUCH_DOLLY_ROTATE;break;default:this.state=Ot.NONE}break;default:this.state=Ot.NONE}this.state!==Ot.NONE&&this.dispatchEvent(ip)}function db(s){switch(this._trackPointer(s),this.state){case Ot.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case Ot.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case Ot.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case Ot.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=Ot.NONE}}function fb(s){this.enabled!==!1&&s.preventDefault()}function pb(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function mb(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var mc=new E;function ei(s,e,t,n,i,r){let a=2*Math.PI*i/4,o=Math.max(r-2*i,0),l=Math.PI/4;mc.copy(e),mc[n]=0,mc.normalize();let c=.5*a/(a+o),h=1-mc.angleTo(s)/l;return Math.sign(mc[t])===1?h*c:o/(a+o)+c+c*(1-h)}var Yu=class s extends Bn{constructor(e=1,t=1,n=1,i=2,r=.1){let a=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let l=new E,c=new E,h=new E(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,p=d.length/6,_=new E,g=.5/a;for(let m=0,y=0;m<d.length;m+=3,y+=2)switch(l.fromArray(d,m),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),d[m+0]=h.x*Math.sign(l.x)+c.x*r,d[m+1]=h.y*Math.sign(l.y)+c.y*r,d[m+2]=h.z*Math.sign(l.z)+c.z*r,u[m+0]=c.x,u[m+1]=c.y,u[m+2]=c.z,Math.floor(m/p)){case 0:_.set(1,0,0),f[y+0]=ei(_,c,"z","y",r,n),f[y+1]=1-ei(_,c,"y","z",r,t);break;case 1:_.set(-1,0,0),f[y+0]=1-ei(_,c,"z","y",r,n),f[y+1]=1-ei(_,c,"y","z",r,t);break;case 2:_.set(0,1,0),f[y+0]=1-ei(_,c,"x","z",r,e),f[y+1]=ei(_,c,"z","x",r,n);break;case 3:_.set(0,-1,0),f[y+0]=1-ei(_,c,"x","z",r,e),f[y+1]=1-ei(_,c,"z","x",r,n);break;case 4:_.set(0,0,1),f[y+0]=1-ei(_,c,"x","y",r,e),f[y+1]=1-ei(_,c,"y","x",r,t);break;case 5:_.set(0,0,-1),f[y+0]=ei(_,c,"x","y",r,e),f[y+1]=1-ei(_,c,"y","x",r,t);break}}static fromJSON(e){return new s(e.width,e.height,e.depth,e.segments,e.radius)}};var c0=new kt,qu=new E,qa=class extends hr{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new ze(e,3)),this.setAttribute("uv",new ze(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Ji(t,6,1);return this.setAttribute("instanceStart",new Mn(n,3,0)),this.setAttribute("instanceEnd",new Mn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Ji(t,6,1);return this.setAttribute("instanceColorStart",new Mn(n,3,0)),this.setAttribute("instanceColorEnd",new Mn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new ir(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kt);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),c0.setFromBufferAttribute(t),this.boundingBox.union(c0))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ht),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)qu.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(qu)),qu.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(qu));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};Ce.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ae},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};wn.line={uniforms:Ha.merge([Ce.common,Ce.fog,Ce.line]),vertexShader:`
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
		`};var ns=class extends dn{constructor(e){super({type:"LineMaterial",uniforms:Ha.clone(wn.line.uniforms),vertexShader:wn.line.vertexShader,fragmentShader:wn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var sp=new wt,h0=new E,u0=new E,pn=new wt,mn=new wt,Pi=new wt,rp=new E,ap=new ht,gn=new Ta,d0=new E,Zu=new kt,Ju=new Ht,Ii=new wt,Li,vr;function f0(s,e,t){return Ii.set(0,0,-e,1).applyMatrix4(s.projectionMatrix),Ii.multiplyScalar(1/Ii.w),Ii.x=vr/t.width,Ii.y=vr/t.height,Ii.applyMatrix4(s.projectionMatrixInverse),Ii.multiplyScalar(1/Ii.w),Math.abs(Math.max(Ii.x,Ii.y))}function gb(s,e){let t=s.matrixWorld,n=s.geometry,i=n.attributes.instanceStart,r=n.attributes.instanceEnd,a=Math.min(n.instanceCount,i.count);for(let o=0,l=a;o<l;o++){gn.start.fromBufferAttribute(i,o),gn.end.fromBufferAttribute(r,o),gn.applyMatrix4(t);let c=new E,h=new E;Li.distanceSqToSegment(gn.start,gn.end,h,c),h.distanceTo(c)<vr*.5&&e.push({point:h,pointOnLine:c,distance:Li.origin.distanceTo(h),object:s,face:null,faceIndex:o,uv:null,uv1:null})}}function _b(s,e,t){let n=e.projectionMatrix,r=s.material.resolution,a=s.matrixWorld,o=s.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,h=Math.min(o.instanceCount,l.count),d=-e.near;Li.at(1,Pi),Pi.w=1,Pi.applyMatrix4(e.matrixWorldInverse),Pi.applyMatrix4(n),Pi.multiplyScalar(1/Pi.w),Pi.x*=r.x/2,Pi.y*=r.y/2,Pi.z=0,rp.copy(Pi),ap.multiplyMatrices(e.matrixWorldInverse,a);for(let u=0,f=h;u<f;u++){if(pn.fromBufferAttribute(l,u),mn.fromBufferAttribute(c,u),pn.w=1,mn.w=1,pn.applyMatrix4(ap),mn.applyMatrix4(ap),pn.z>d&&mn.z>d)continue;if(pn.z>d){let b=pn.z-mn.z,x=(pn.z-d)/b;pn.lerp(mn,x)}else if(mn.z>d){let b=mn.z-pn.z,x=(mn.z-d)/b;mn.lerp(pn,x)}pn.applyMatrix4(n),mn.applyMatrix4(n),pn.multiplyScalar(1/pn.w),mn.multiplyScalar(1/mn.w),pn.x*=r.x/2,pn.y*=r.y/2,mn.x*=r.x/2,mn.y*=r.y/2,gn.start.copy(pn),gn.start.z=0,gn.end.copy(mn),gn.end.z=0;let _=gn.closestPointToPointParameter(rp,!0);gn.at(_,d0);let g=Yn.lerp(pn.z,mn.z,_),m=g>=-1&&g<=1,y=rp.distanceTo(d0)<vr*.5;if(m&&y){gn.start.fromBufferAttribute(l,u),gn.end.fromBufferAttribute(c,u),gn.start.applyMatrix4(a),gn.end.applyMatrix4(a);let b=new E,x=new E;Li.distanceSqToSegment(gn.start,gn.end,x,b),t.push({point:x,pointOnLine:b,distance:Li.origin.distanceTo(x),object:s,face:null,faceIndex:u,uv:null,uv1:null})}}}var Ku=class extends Bt{constructor(e=new qa,t=new ns({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)h0.fromBufferAttribute(t,a),u0.fromBufferAttribute(n,a),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+h0.distanceTo(u0);let r=new Ji(i,2,1);return e.setAttribute("instanceDistanceStart",new Mn(r,1,0)),e.setAttribute("instanceDistanceEnd",new Mn(r,1,1)),this}raycast(e,t){let n=this.material.worldUnits,i=e.camera;if(i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Li=e.ray;let a=this.matrixWorld,o=this.geometry,l=this.material;vr=l.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),Ju.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=vr*.5;else{let d=Math.max(i.near,Ju.distanceToPoint(Li.origin));c=f0(i,d,l.resolution)}if(Ju.radius+=c,Li.intersectsSphere(Ju)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Zu.copy(o.boundingBox).applyMatrix4(a);let h;if(n)h=vr*.5;else{let d=Math.max(i.near,Zu.distanceToPoint(Li.origin));h=f0(i,d,l.resolution)}Zu.expandByScalar(h),Li.intersectsBox(Zu)!==!1&&(n?gb(this,t):_b(this,i,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(sp),this.material.uniforms.resolution.value.set(sp.z,sp.w))}};var Ts=class extends qa{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}setFromPoints(e){let t=e.length-1,n=new Float32Array(6*t);for(let i=0;i<t;i++)n[6*i]=e[i].x,n[6*i+1]=e[i].y,n[6*i+2]=e[i].z||0,n[6*i+3]=e[i+1].x,n[6*i+4]=e[i+1].y,n[6*i+5]=e[i+1].z||0;return super.setPositions(n),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}};var gc=class extends Ku{constructor(e=new Ts,t=new ns({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}};function jb({container:s,model:e,point:t,hole:n,onConnection:i,onPin:r,onSwitch:a,onFailure:o,onChip:l=()=>{},onHole:c=()=>{}}){let h=new Zs;h.background=new Be("#edf1ed");let d=new Zt(40,1,.1,1600),u=new fc({antialias:!0,alpha:!1});u.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6)),u.outputColorSpace=hn,u.toneMapping=Ia,u.toneMappingExposure=1.08,s.append(u.domElement);let f=u.domElement;f.tabIndex=0,f.setAttribute("aria-label","Circuito en 3D. Arrastra para girar; usa la rueda para acercar. La lista de conexiones ofrece los mismos detalles con teclado."),f.setAttribute("aria-describedby","threeHelp");let p=new Xu(d,f);p.enableDamping=!0,p.dampingFactor=.13,p.minDistance=5,p.maxDistance=500,p.minPolarAngle=.01,p.maxPolarAngle=Math.PI/2-.05,p.listenToKeyEvents(f),p.zoomToCursor=!0,h.add(new or(16777215,11779256,2.4));let _=new Es(16777215,3.2);_.position.set(-25,65,30),h.add(_);let g=new Es(15003903,1.1);g.position.set(35,25,-30),h.add(g);let m=new Map,y=[],b=[],x=new Map,A=[],T=[],D=new Map,v=new Map,R=new Map,I=null,F=[],H=[],X=null,N=new Ct,B=new Map,V=new sn;h.add(V);let W=null,ie=null;function Y(S,P,U){let L=h.children.filter(de=>!P.has(de)&&!de.userData.softShadow),ne=new sn;L.forEach(de=>ne.add(de)),h.add(ne),B.set(S,{group:ne,holes:U,home:ne.position.clone()})}let $=new Map,se=new sn;h.add(se);let Ge="",Ae={id:null,progress:1},bt=new Et({color:16447983,roughness:.82}),nt=new Et({color:2239021,roughness:.7}),it=new Et({color:11976897,roughness:.35,metalness:.7}),Q=e.bounds[0]+e.bounds[2]/2,le=e.bounds[1]+e.bounds[3]/2,Se=([S,P],U=.1)=>new E((S-Q)/30,U,(P-le)/30),Ue=(S,P=.1)=>Se(t(S),P),Fe=!1,je=0,st=null,re=null,_e=0,ge=null,ye=[...e.bounds],Me=!1,ct="",Qe=null,ot=1,rt={quality:"auto",background:"#edf1ed",motion:"full"},O={scale:1,intensity:1},Pt=0,_t=!1,C=!0,M=!1,G=hp({THREE:pc,scene:h,container:s,camera:d,canvas:f,requestRender:Lt}),q=new sn;h.add(q);let ee="",ve=null,Re=0;function te(S){ve=S?.active?S:null;let P=ve?.ids||[],U=P.join("|");if(U!==ee){q.traverse(ne=>{ne.geometry?.dispose(),ne.material?.dispose()}),q.clear(),ee=U;for(let ne of P){let de=m.get(ne);if(!de||de.it.kind!=="wire")continue;let we=new Ts;we.setPositions(Array.from({length:de.wire.geometry.parameters.tubularSegments+1},(pe,K)=>de.curve.getPointAt(K/de.wire.geometry.parameters.tubularSegments)).flatMap(pe=>pe.toArray()));for(let[pe,K]of[[14791749,8],[de.material.color,3]]){let at=new ns({color:pe,linewidth:K,worldUnits:!1,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),fe=new gc(we,at);fe.userData.signal=ne,fe.renderOrder=21,fe.frustumCulled=!1,q.add(fe)}Re++}}let L=s.getBoundingClientRect();q.visible=!!ve;for(let ne of q.children)ne.visible=!!m.get(ne.userData.signal)?.group.visible,ne.material.opacity=ve?.value===1?.9:.5,ne.material.resolution.set(L.width||1,L.height||1)}function ce(S){JSON.stringify(S||null)!==JSON.stringify(ve)&&(ge?br({...ge,studio:{...ge.studio,signals:S}}):(te(S),Lt()))}function he(S,P,U,L=h){let ne=new Bt(S,P);return ne.position.copy(U),L.add(ne),ne}function Le(S,P,U,L,ne,de=h){return he(new Bn(S,P,U),ne,L,de)}function be(S,P,U,L,ne,de=h,we=.08){return he(new Yu(S,P,U,2,we),ne,L,de)}function Ee(S,P){return he(new pi(new hi(S,!1,"centripetal"),16,.046,8,!1),it.clone(),new E,P)}function $e(S,P=.22){let U=S.filter((we,pe)=>pe===0||we.distanceTo(S[pe-1])>1e-6),L=new tr,ne=U[0];for(let we=1;we<U.length-1;we++){let pe=U[we],K=U[we-1],at=U[we+1],fe=Math.min(P,K.distanceTo(pe)/3,at.distanceTo(pe)/3),xe=pe.clone().addScaledVector(K.clone().sub(pe).normalize(),fe),ke=pe.clone().addScaledVector(at.clone().sub(pe).normalize(),fe);ne.distanceTo(xe)>1e-6&&L.add(new _s(ne,xe)),L.add(new xs(xe,pe,ke)),ne=ke}let de=U[U.length-1];return ne.distanceTo(de)>1e-6&&L.add(new _s(ne,de)),L}function et(S,P=1024,U=512){let L=document.createElement("canvas");L.width=P,L.height=U,S(L.getContext("2d"),P,U);let ne=new aa(L);return ne.colorSpace=hn,ne.anisotropy=Math.min(4,u.capabilities.getMaxAnisotropy()),ne}function Je(S,P,U,L,{color:ne="#dbe5e1",background:de="#222a2d",size:we=48}={}){let pe=et((at,fe,xe)=>{at.fillStyle=de,at.fillRect(0,0,fe,xe),at.fillStyle=ne,at.textAlign="center",at.textBaseline="middle",at.font="600 "+we+"px Arial",S.split(`
`).forEach((ke,lt,It)=>at.fillText(ke,fe/2,xe/2+(lt-(It.length-1)/2)*we*1.45))},512,256),K=he(new ui(U,L),new Gt({map:pe}),P);return K.rotation.x=-Math.PI/2,K.userData.viewerLabel=!0,K.userData.labelText=S,K}let k=et((S,P,U)=>{let L=S.createRadialGradient(P/2,U/2,0,P/2,U/2,P/2);L.addColorStop(0,"#1b322344"),L.addColorStop(.5,"#1b32231b"),L.addColorStop(1,"#1b322300"),S.fillStyle=L,S.fillRect(0,0,P,U)},128,128);function Te(S,P,U,L=h){let ne=he(new ui(P,U),new Gt({map:k,transparent:!0,depthWrite:!1}),S.clone().setY(.045),L);return ne.rotation.x=-Math.PI/2,ne.userData.softShadow=!0,ne}let oe=et((S,P,U)=>{let L=S.createRadialGradient(P/2,U/2,0,P/2,U/2,P/2);L.addColorStop(0,"#ffca9566"),L.addColorStop(.3,"#ff6b4638"),L.addColorStop(1,"#ff6b4600"),S.fillStyle=L,S.fillRect(0,0,P,U)},128,128);for(let[S,P]of Object.entries(e.boards)){let U=(P.columns-1)*30+70,L=60+P.xOffset,ne=145+P.yOffset;be(U/30,1.25,605/30,Se([L+U/2,ne+302.5],-.625),bt,h,.2),Le((U-45)/30,.06,65/30,Se([L+20+(U-45)/2,455.5+P.yOffset],.035),new Et({color:13686994,roughness:1}));let de=et((K,at,fe)=>{K.scale(at/U,fe/605),K.fillStyle="#faf9ef",K.fillRect(0,0,U,605),K.font="bold 14px Arial",K.fillStyle="#475b52",K.fillText("PLACA "+S+" \xB7 "+P.columns+" COLUMNAS",12,23),K.font="13px Arial",K.textAlign="center";for(let xe=1;xe<=P.columns;xe++)(xe===1||xe%5===0||xe===P.columns)&&K.fillText(xe,35+(xe-1)*30,116);K.textAlign="left";for(let xe of"abcdefghij")K.fillText(xe,10,t([S,xe,1])[1]-ne+5);for(let xe of["+T","-T","-B","+B"]){let ke=t([S,xe,1])[1]-ne;K.fillStyle=xe[0]==="+"?"#bc444c":"#3e81b5",K.fillText(xe,8,ke+5),K.lineWidth=2,K.strokeStyle=K.fillStyle,K.beginPath(),K.moveTo(25,ke-13),P.railBreak&&(K.lineTo(945,ke-13),K.moveTo(1005,ke-13)),K.lineTo(U-20,ke-13),K.stroke()}},2048,640),we=he(new ui(U/30,605/30),new Gt({map:de}),Se([L+U/2,ne+302.5],.008));we.rotation.x=-Math.PI/2;let pe=[];for(let K of[..."abcdefghij","+T","-T","-B","+B"])for(let at=1;at<=P.columns;at++)K.length>1&&P.railBreak&&at===P.railBreak+1||pe.push([S,K,at]);for(let[K,at,fe]of[[.38,.018,12107961],[.255,.03,4739406]]){let xe=new $s(new Bn(K,.012,K),new Et({color:fe,roughness:1}),pe.length);pe.forEach((ke,lt)=>{N.position.copy(Ue(ke,at)),N.updateMatrix(),xe.setMatrixAt(lt,N.matrix)}),h.add(xe),xe.userData={holes:pe},y.push(xe)}}for(let[S,P,U]of[["L\xD3GICA \xB7 5 V REGULADOS","+5","G5"],["MOTOR \xB7 6 V","+6","G6"]]){let L=Ue(["FUENTE",P,0]),ne=Ue(["FUENTE",U,0]),de=L.clone().lerp(ne,.5);Je(S,de.clone().setY(.2).add(new E(0,0,-.9)),9,1.4,{background:"#e0e8e2",color:"#345349",size:34});for(let[we,pe]of[[L,12861771],[ne,3490619]])he(new Vt(.23,.23,.35,14),new Et({color:pe}),we.clone().setY(.2))}for(let S of e.chips||[]){let P=new Set(h.children),U=S.pins,L=U/2,ne=S.start,de=Ue([S.board,"e",ne]),we=Ue([S.board,"f",ne+L-1]),pe=de.clone().lerp(we,.5).setY(.8),K=L+.2,at=be(K,1.25,2.45,pe,S.dipSwitch?new Et({color:11349559,roughness:.55}):nt.clone(),h,.13);at.userData={chip:S.id},y.push(at);let fe=new Bn(K+.08,1.32,2.52),xe=new Qs(fe);fe.dispose();let ke=new Pn(xe,new nn({color:14265410,depthTest:!1}));ke.position.copy(pe),ke.renderOrder=18,ke.visible=!1,h.add(ke),$.set(S.id,{body:at,outline:ke}),Te(pe,K+.5,2.8);let lt=he(new Yi(.27,28,Math.PI/2,Math.PI),new Et({color:1186075,roughness:.9}),pe.clone().add(new E(-K/2+.04,.637,0)));if(lt.rotation.x=-Math.PI/2,S.dipSwitch)for(let me=1;me<=4;me++){let He=S.functions?.[me],tt=pe.clone().add(new E(me-2.5,.77,.36));Le(.65,.04,1.45,tt.clone().setY(pe.y+.645).setZ(pe.z),new Et({color:6364453}));let dt=Le(.51,.16,.62,tt,new Et({color:He?16183011:10390917}));He&&(dt.userData={bit:He,switchId:He,dipSlider:!0,homeZ:pe.z,componentHint:S.id},y.push(dt),T.push(dt)),Je(String(me),pe.clone().add(new E(me-2.5,.66,-.95)),.45,.35,{background:"#ad2e37",color:"#fff5ed",size:60})}else Je(S.label+`
`+S.id,pe.clone().add(new E(.12,.637,0)),Math.max(2,K-.9),1.75,{size:38});let It=he(new Yi(.09,16),new Gt({color:8884620}),pe.clone().add(new E(-K/2+.4,.638,.5)));It.rotation.x=-Math.PI/2;for(let me=1;me<=U;me++){let He=me>L,tt=[S.board,He?"e":"f",ne+(He?U-me:me-1)],dt=Ue(tt,.13),At=dt.clone();At.z=pe.z+(He?-1.18:1.18),At.y=.5;let St=new hi([dt,dt.clone().add(new E(0,.4,0)),At]),Rt=he(new pi(St,16,.07,4,!1),it,new E);Rt.userData={u:S.id,p:me,h:tt},y.push(Rt),b.push(Rt);let Yt=Le(.22,.12,.32,At.clone().setY(.54),it);Yt.userData={u:S.id,p:me,h:tt},y.push(Yt),x.set(S.id+"."+me,Je(String(me),dt.clone().add(new E(0,.025,He?-.4:.4)),.55,.45,{color:"#35433e",background:"#faf9ef",size:95}))}Y(S.id,P,Array.from({length:U},(me,He)=>{let tt=He+1;return[S.board,tt>L?"e":"f",ne+(tt>L?U-tt:tt-1)]})),S.dipSwitch&&G.register({id:S.id,type:"switch",title:S.id+" \xB7 DIP de 4 posiciones",detail:S.id==="SW1"?"ABRIR \xB7 CERRAR \xB7 "+(e.stopClosedRun?"ON permite RUN / OFF activa STOP":"STOP"):"Finales de apertura y cierre",anchor:pe.clone().setY(1.85),hitPoint:pe.clone(),group:B.get(S.id).group})}for(let S of e.arrays||[]){let P=new Set(h.children),U=Object.entries(S.pinHoles||{}).sort((fe,xe)=>Number(fe[0])-Number(xe[0]));if(!U.length)continue;let L=U.map(([,fe])=>Ue(fe,.1)),ne=L[0],de=L[L.length-1],we=ne.clone().lerp(de,.5).setY(1.5),pe=ne.distanceTo(de)+.98,K=new Et({color:5652021,roughness:.65});be(pe,1.9,.8,we,K,h,.12),Te(we,pe+.3,1.35),Je(S.id+"  8 x 1k",we.clone().setY(2.46),pe-.55,.7,{background:"#563e35",color:"#f2e8dc",size:35}),U.forEach(([fe,xe])=>{let ke=Ue(xe,.1),lt=ke.clone().setY(.58),It=Ee([ke,lt],h);It.userData={array:S.id,p:Number(fe),h:xe,common:Number(fe)===(S.commonPin||1)},A.push(It);let me=Number(fe)===(S.commonPin||1)?fe+" COM":fe;Je(me,ke.clone().setY(.055).add(new E(0,0,.82)),Number(fe)===(S.commonPin||1)?1.15:.5,.4,{background:"#faf9ef",color:"#35433e",size:Number(fe)===(S.commonPin||1)?40:80})});let at=S.pinHoles?.[S.commonPin||1];if(at){let fe=he(new Yi(.095,20),new Gt({color:15978908}),Ue(at,2.462),h);fe.rotation.x=-Math.PI/2}Y(S.id,P,U.map(([,fe])=>fe))}for(let S of e.displays||[]){let P=new Set(h.children),U=Object.values(S.pins).map(de=>Ue(de)),L=U.reduce((de,we)=>de.add(we),new E).multiplyScalar(1/U.length).setY(.7);be(4.8,1.2,7.5,L,nt,h,.12),Te(L,5.2,7.9),Object.entries(S.pins).forEach(([de,we])=>{let pe=Ue(we,.1);Ee([pe,pe.clone().setY(.65)],h),Je(String(de),pe.clone().add(new E(0,.025,Number(de)<=5?1.1:-1.1)),.45,.35,{background:"#faf9ef",color:"#35433e",size:80})}),Object.entries({a:[0,-2.3,2.5,.32],b:[1.45,-1.15,.32,1.8],c:[1.45,1.15,.32,1.8],d:[0,2.3,2.5,.32],e:[-1.45,1.15,.32,1.8],f:[-1.45,-1.15,.32,1.8],g:[0,0,2.5,.32]}).forEach(([de,[we,pe,K,at]])=>{let fe=new Et({color:4334890,emissive:0,roughness:.45}),xe=be(K,.04,at,L.clone().add(new E(we,.62,pe)),fe,h,.06);D.set(S.id+"."+de,xe)}),Je(S.id,L.clone().add(new E(0,.62,3.25)),2,.35,{size:45}),Y(S.id,P,Object.values(S.pins))}function Ie(S){if(S.externalLead)return;let P=Ue(S.a),U=Ue(S.b),L=P.distanceTo(U),ne=S.kind==="res",de=S.kind!=="wire",we=!de&&Array.isArray(S.route)&&S.route.length>=2,pe=de?.6:we?Math.max(.48,Number(S.routeHeight)||.78):S.a[0]!==S.b[0]?2.6+Number(S.id.slice(1))%3*.22:Math.min(2.25,.65+L*.065),K=new sn,at=[];h.add(K);let fe=P.clone().lerp(U,.5);fe.y=pe;let xe=we?[P,...S.route.map(me=>Se(me,pe)),U]:null,ke=we?$e(xe):new hi(ne?[P,P.clone().setY(.45),P.clone().setY(1.65),P.clone().setY(2.8),P.clone().setY(3.14),U.clone().setY(3.14),U.clone().setY(2.7),U]:[P,P.clone().setY(.36),P.clone().lerp(U,.18).setY(pe),fe,P.clone().lerp(U,.82).setY(pe),U.clone().setY(.36),U],!1,"centripetal"),lt=new Et({color:S.color||(e.colors||{})[S.net]||"#087f93",roughness:.32,metalness:.02}),It=he(new pi(ke,we?Math.max(48,xe.length*12):L>12?64:40,de?.046:S.routingClass==="power"?.1:.088,10,!1),de?it.clone():lt,new E,K);if(It.visible=S.kind==="wire",It.userData={id:S.id},y.push(It),!de)for(let me of[P,U]){let He=he(new Vt(.052,.052,.27,8),it.clone(),me.clone().setY(.155),K),tt=Le(.23,.34,.23,me.clone().setY(.38),lt.clone(),K);at.push([He,tt].map(dt=>({mesh:dt,home:dt.position.clone()})))}if(ne){let me=P.clone().setY(1.65),He=he(new Vt(.39,.39,2.3,24),new Et({color:8435129,roughness:.6}),me,K);He.userData={id:S.id},y.push(He);let tt=Ee([P,P.clone().setY(.5)],K),dt=Ee([P.clone().setY(2.8),P.clone().setY(3.14),U.clone().setY(3.14),U.clone().setY(2.7),U],K);tt.userData=dt.userData={id:S.id},y.push(tt,dt);let At=String(S.value);(/5[.,]1\s*k/i.test(At)?[3246407,7424817,13056834,13214021]:/6[.,]8\s*k/i.test(At)?[1535666,6649725,13056834,13214021]:/4[.,]7\s*k/i.test(At)?[15779131,8866714,13056834,13214021]:/100\s*k/i.test(At)?[7424817,2106918,15779131,13214021]:/68\s*k/i.test(At)?[1535666,6649725,15043122,13214021]:/10\s*k/i.test(At)?[7424817,2106918,15043122,13214021]:/2[.,]2\s*k/i.test(At)?[13056834,13056834,13056834,13214021]:/^470\b/.test(At)?[15779131,8866714,7424817,13214021]:[7424817,2106918,13056834,13214021]).forEach((Rt,Yt)=>{he(new Vt(.4,.4,.12,24),new Et({color:Rt}),me.clone().setY([.82,1.2,1.58,2.4][Yt]),K)}),G.register({id:S.partId||S.id,connectionId:S.id,type:"res",title:(S.partId||S.id)+" \xB7 Resistencia",detail:S.value,anchor:me.clone().setY(2.95),hitPoint:me.clone(),group:K})}if(S.kind==="cap"&&!/^(10|100)\s*(µ|μ|u)/i.test(S.value)){let me=fe.clone().setY(.95),He=he(new di(.43,20,14),new Et({color:13143105,roughness:.72}),me,K);He.scale.set(1,1,.38),He.userData={id:S.id},y.push(He);for(let[dt,At]of[P,U].entries())Ee([At,At.clone().setY(.32),me.clone().add(new E(dt?.2:-.2,-.2,0))],K);let tt=Je(S.value,me.clone().add(new E(0,.5,0)),1.8,.5,{background:"#c88c41",color:"#30271c",size:43});K.add(tt)}if(S.kind==="cap"&&/^(10|100)\s*(µ|μ|u)/i.test(S.value)){let me=fe.clone().setY(1.45),He=et((St,Rt,Yt)=>{St.fillStyle="#24485a",St.fillRect(0,0,Rt,Yt),St.fillStyle="#d2ddd5",St.fillRect(Rt*.21,0,Rt*.16,Yt),St.fillStyle="#24485a",St.font="bold 30px Arial",St.textAlign="center";for(let ss=30;ss<Yt;ss+=50)St.fillText("\u2212",Rt*.29,ss);St.fillStyle="#dde6e3",St.font="600 32px Arial",St.fillText(S.value,Rt*.67,Yt*.38),St.font="26px Arial",St.fillText("16 V",Rt*.67,Yt*.65)},512,256),tt=he(new Vt(.64,.64,1.8,40),[new Et({map:He,roughness:.4}),it.clone(),nt.clone()],me,K);tt.userData={id:S.id},y.push(tt),tt.rotation.y=Math.PI/2-Math.PI*2*.29;for(let[St,Rt]of[P,U].entries())Ee([Rt,Rt.clone().setY(.4),me.clone().setY(.55).add(new E(St?.28:-.28,0,0))],K);let dt=me.clone().setY(2.359);Le(.76,.008,.022,dt,nt.clone(),K).rotation.y=Math.PI/4,Le(.76,.008,.022,dt,nt.clone(),K).rotation.y=-Math.PI/4,Te(me,2.1,1.8,K);let At=Je(S.id+" \xB7 "+S.value,me.clone().setY(.055).add(new E(0,0,1.02)),2.4,.45,{background:"#faf9ef",color:"#345349",size:43});K.add(At)}if(S.kind==="pot"){let me=fe.clone().setY(1.02),He=be(2.65,1.35,1.6,me,new Et({color:1534356,roughness:.36}),K,.11);He.userData={id:S.id},y.push(He),Le(2.44,.08,1.42,me.clone().setY(.39),new Et({color:1065310}),K),he(new Vt(.59,.59,.04,32),new Et({color:1523798}),me.clone().setY(1.717),K);let tt=he(new Vt(.51,.51,.16,40),new Et({color:12557136,metalness:.8,roughness:.24}),me.clone().setY(1.79),K);tt.userData={id:S.id},y.push(tt),I=Le(.79,.018,.11,me.clone().setY(1.879),nt.clone(),K);let dt=Je("203",me.clone().add(new E(.76,.679,-.4)),.68,.39,{background:"#176994",color:"#e6f0ec",size:77});K.add(dt);for(let St of e.potPins){let Rt=Ue(St);Ee([Rt,Rt.clone().setY(.4)],K)}Te(me,3.3,2.3,K);let At=Je("RV1 \xB7 20 k\u03A9",me.clone().setY(.06).add(new E(0,0,-1.08)),3,.55,{background:"#faf9ef",color:"#345349",size:42});K.add(At);for(let St=0;St<3;St++){let Rt=Ue(e.potPins[St],.035),Yt=Je(String(St+1),Rt.clone().add(new E(0,0,.95)),.55,.4,{background:"#faf9ef",color:"#345349",size:85});K.add(Yt)}}if(S.kind==="led"){let me=fe.clone().setY(1.22),He=new sr({color:12731186,emissive:0,roughness:.18,metalness:0,clearcoat:1,clearcoatRoughness:.1,transparent:!0,opacity:.88,depthWrite:!1}),tt=he(new Vt(.52,.52,.8,32),He,me,K),dt=he(new di(.52,32,20,0,Math.PI*2,0,Math.PI/2),He,me.clone().setY(1.62),K),At=he(new Vt(.6,.6,.14,32),He,me.clone().setY(.77),K);for(let Yt of[tt,dt,At])Yt.userData={id:S.id,baseOpacity:.88},y.push(Yt);He.userData.baseColor=S.color||{LY:"#eab83f",LG:"#2cab66",LR:"#d34436"}[S.value]||"#d34436",He.color.set(He.userData.baseColor),v.set(S.value,He);for(let[Yt,ss]of[P,U].entries()){let wc=me.clone().setY(1.27).add(new E(Yt?.18:-.18,0,0));Ee([ss,ss.clone().setY(.48),wc.clone().setY(.72),wc],K)}Le(.18,.19,.18,me.clone().setY(1.33).add(new E(.18,0,0)),it.clone(),K);let St=he(new di(.18,16,10,0,Math.PI*2,0,Math.PI/2),new Et({color:12897486,metalness:.8,roughness:.2,side:Wn}),me.clone().add(new E(.18,.23,0)),K);St.rotation.x=Math.PI,he(new pi(new hi([me.clone().add(new E(-.18,.1,0)),me.clone().add(new E(-.05,.43,0)),me.clone().add(new E(.18,.28,0))]),12,.012,5,!1),it,new E,K),Le(.04,.11,.42,me.clone().add(new E(.56,-.45,0)),new Et({color:9978422,roughness:.3}),K);let Rt=new Ks(new ms({map:oe,transparent:!0,depthWrite:!1,blending:Ca}));Rt.position.copy(me).setY(1.47),Rt.scale.set(2.6,2.6,1),Rt.visible=!1,K.add(Rt),R.set(S.value,Rt),Te(me,1.7,1.7,K),G.register({id:S.partId||S.id,connectionId:S.id,type:"led",title:{LR:"LED rojo",LY:"LED amarillo",LG:"LED verde"}[S.value]||"LED",detail:{LR:"STOP \xB7 parpadeo",LY:"Puerta en movimiento",LG:"Puerta completamente abierta"}[S.value]||S.value,anchor:me.clone().setY(2.25),hitPoint:me.clone(),group:K})}if(S.kind==="motor"&&!S.externalMotor){let me=fe.clone().setY(1.2),He=new Et({color:10595762,metalness:.78,roughness:.28}),tt=he(new Vt(.9,.9,2.4,32),He,me,K);tt.rotation.z=Math.PI/2;for(let St of[-1.17,1.17]){let Rt=he(new Vt(.86,.86,.14,32),St<0?nt:it,me.clone().add(new E(St,0,0)),K);Rt.rotation.z=Math.PI/2}let dt=he(new Vt(.12,.12,1,16),it,me.clone().add(new E(1.65,0,0)),K);dt.rotation.z=Math.PI/2;for(let St of[-.42,.42])Le(.58,.025,.18,me.clone().add(new E(-.55,.8,St)),nt,K);[P,U].forEach((St,Rt)=>{let Yt=me.clone().add(new E(-1.27,Rt?.28:-.28,0));Le(.12,.2,.3,Yt,it,K),Ee([St,St.clone().setY(.5),Yt],K)});let At=Je("MOTOR CC \xB7 EXTERNO",me.clone().add(new E(0,1.22,0)),3.2,.6,{background:"#53676e",color:"#fff",size:36});K.add(At)}if(S.kind==="motor"&&S.externalMotor){let me=S.externalMotor,He=Se(me.center,3.7),tt=new Et({color:15914312,roughness:.4}),dt=new Et({color:14072114,roughness:.55}),At=new Et({color:12108486,metalness:.82,roughness:.28}),St=be(13.2,7.1,7.3,He.clone().add(new E(-3.4,0,0)),tt,K,.55);St.userData={id:S.id},y.push(St),Te(He,29,12,K),be(12.2,.16,6.4,He.clone().add(new E(-3.4,3.62,0)),dt,K,.12);let Rt=he(new Vt(2.65,2.65,8.8,40),At,He.clone().add(new E(7.1,0,0)),K);Rt.rotation.z=Math.PI/2,Rt.userData={id:S.id},y.push(Rt);let Yt=he(new Vt(2.56,2.56,1.25,32),nt,He.clone().add(new E(11.9,0,0)),K);Yt.rotation.z=Math.PI/2;for(let Ni of[-1.2,1.2])be(3.3,.12,.65,He.clone().add(new E(9,2.3,Ni)),nt,K,.08);for(let Ni of[-7.8,1.1])for(let Si of[-2.75,2.75]){let Er=he(new Vt(.24,.24,.08,16),it,He.clone().add(new E(Ni,3.74,Si)),K);Le(.32,.02,.06,Er.position.clone().add(new E(0,.06,0)),nt,K)}let ss=he(new Vt(1.3,1.3,.65,28),dt,He.clone().add(new E(-3.6,0,3.92)),K);ss.rotation.x=Math.PI/2;let wc=he(new Vt(.78,.78,3.1,28),bt,He.clone().add(new E(-3.6,0,5.55)),K);wc.rotation.x=Math.PI/2,Le(1.1,.18,2.7,He.clone().add(new E(-3.6,.71,5.55)),bt,K);let ju=new sn;K.add(ju);let op=[];H.push({id:S.partId,group:ju,cables:op,stage:S.wiringStage??S.stage}),me.terminals.map(Ni=>Se(Ni,2.15)).forEach((Ni,Si)=>{Le(.18,.55,.65,Ni,it,K);let Er=Si?U:P,lp=me.cableRoutes?.[Si]?ed(pc,me.cableRoutes[Si],Se,Ni,Er,me.cableHeights[Si]):new hi([Ni,Se([t(Si?S.b:S.a)[0],790+Si*28],1.2),Er.clone().setY(.55),Er],!1,"centripetal"),Tc=new sn;ju.add(Tc);let m0=new Et({color:Si?3361114:14179409,roughness:.45}),Qu=he(new pi(lp,96,.13,10,!1),m0,new E,Tc),g0=Le(.3,.46,.3,Er.clone().setY(.23),nt,Tc);Qu.userData={id:S.id},y.push(Qu),op.push({group:Tc,wire:Qu,curve:lp,plug:g0,terminal:Si,progress:1})});let p0=Je(me.label||"MOTORREDUCTOR TT \xB7 EXTERNO",Se([me.center[0],me.bounds[1]+24],.12),22,.9,{background:"#f3f2e8",color:"#345349",size:35});K.add(p0)}if(S.kind==="switch"&&S.externalControl&&(F.push(up({THREE:pc,it:S,group:K,mesh:he,box:Le,roundedBox:be,toWorld:Se,hpos:Ue,point:t,topLabel:Je,contactShadow:Te,pickables:y,switches:T,metal:it,dark:nt,componentLabels:!1})),G.register({id:S.partId||S.id,connectionId:S.id,type:"switch",title:"Interruptor "+S.value,detail:S.externalControl.model.toUpperCase(),anchor:Se(S.externalControl.center,4.1),group:K})),S.kind==="switch"&&!S.externalControl){let me=(S.spdt?P.clone().lerp(Ue(S.third),.5):fe.clone()).setY(.65),He=be(S.spdt?2.8:1.8,.9,1.35,me,new Et({color:3426627}),K,.12),tt=be(1.12,.28,.9,me.clone().add(new E(0,.58,0)),new Et({color:2383765}),K,.08);if(tt.userData={bit:S.value||S.id},y.push(tt),T.push(tt),tt.userData.switchId=S.value||S.id,[P,U,...S.third?[Ue(S.third)]:[]].forEach(dt=>Ee([dt,dt.clone().setY(.5)],K)),G.register({id:S.partId||S.id,connectionId:S.id,type:"switch",title:"Interruptor "+(S.value||S.id),detail:S.contact==="NC"?"Final de carrera":"Mando de puerta",anchor:me.clone().setY(1.9),group:K}),S.contact==="NC"||S.contact==="limit-spdt"){tt.visible=!1;let dt=Le(2.45,.085,.24,me.clone().add(new E(.5,.58,0)),it,K);dt.rotation.z=-.15;let At=he(new Vt(.22,.22,.36,20),nt,me.clone().add(new E(1.65,.41,0)),K);At.rotation.x=Math.PI/2}else{let dt=(S.value||"")==="STOP";tt.material.color.set(dt?"#bd4139":"#245f95"),tt.userData.baseColor=dt?"#bd4139":"#245f95";let At=Je(dt?"STOP":"I / O",me.clone().add(new E(0,.73,0)),.9,.4,{background:dt?"#bd4139":"#245f95",color:"#fff",size:40});K.add(At)}}m.set(S.id,{group:K,wire:It,material:lt,curve:ke,a:P,b:U,it:S,routed:we,routePoints:xe,height:pe,plugs:at}),["wire","link"].includes(S.kind)||B.set(S.partId||S.id,{group:K,holes:[S.a,S.b,...S.third?[S.third]:[]],external:!!(S.externalControl||S.externalMotor),home:K.position.clone()})}e.items.forEach(Ie);for(let S of e.items.filter(P=>P.externalLead)){let P=S.externalLead,U=P.motor?H.find(we=>we.id===P.partId):F.find(we=>we.id===P.partId),L=U?.cables[P.terminal];if(!L)throw new Error("Missing external cable "+S.id);h.add(L.group),L.nativeId=S.id,L.wire.userData={id:S.id},L.tip&&(L.tip.visible=!1);let ne=L.curve.getPoint(0),de=L.curve.getPoint(1);m.set(S.id,{group:L.group,wire:L.wire,material:L.wire.material,curve:L.curve,a:ne,b:de,it:S,routed:!1,routePoints:null,height:1.8,plugs:[[],[{mesh:L.plug,home:L.plug.position.clone()}]]})}let De=new sn;De.visible=!1,h.add(De);let ue=new Ts,qe=null,Ye=0,Ut=[],vt=-1,Qt=new E,ln=new E,As=S=>(S=Yn.clamp(S,0,1),S*S*(3-2*S)),Di=[[1587247,10],[16765290,7],[556947,3]].map(([S,P],U)=>{let L=new ns({color:S,linewidth:P,worldUnits:!1,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),ne=new gc(ue,L);return ne.renderOrder=24+U,ne.frustumCulled=!1,De.add(ne),ne});function _c(S){if(De.visible=!!(S?.group.visible&&S.it.kind==="wire"),!De.visible){qe=null;return}if(qe===S.it.id)return;let P=S.wire.geometry.parameters.tubularSegments;Ut=Array.from({length:P+1},(L,ne)=>S.curve.getPointAt(ne/P)),vt=-1;let U=new Ts;U.setPositions(Ut.flatMap(L=>L.toArray())),ue.dispose(),ue=U,Di.forEach(L=>{L.geometry=U}),Di[2].material.color.copy(S.material.color),qe=S.it.id,Ye++}let Ui=[0,1].map(S=>{let P=he(new fi(.35,.075,8,24),new Gt({color:S?4284356:882277,depthTest:!1}),new E);return P.rotation.x=-Math.PI/2,P.renderOrder=15,P.visible=!1,{ring:P}}),yi=he(new di(.17,12,8),new Gt({color:16768134,depthTest:!1,depthWrite:!1}),new E);yi.renderOrder=32,yi.visible=!1;let xc=[0,1].map(()=>{let S=he(new fi(.22,.06,8,24),new Gt({color:15840829,depthTest:!1}),new E);return S.rotation.x=-Math.PI/2,S.renderOrder=16,S.visible=!1,S});function yc(S){for(;S;){if(!S.visible)return!1;S=S.parent}return!0}let vi=new wa,Sr=new ae,Rs=null;f.addEventListener("pointerdown",S=>{Rs=[S.clientX,S.clientY]}),f.addEventListener("pointerup",S=>{if(!Rs||Math.hypot(S.clientX-Rs[0],S.clientY-Rs[1])>6||S.button!==0)return;let P=f.getBoundingClientRect();Sr.set((S.clientX-P.left)/P.width*2-1,-(S.clientY-P.top)/P.height*2+1),vi.setFromCamera(Sr,d);let U=vi.intersectObjects(y,!1).find(pe=>yc(pe.object));if(!U){G.dismiss();return}let L=U.object.userData,ne=e.chips?.find(pe=>pe.id===L.chip&&pe.dipSwitch),de=null;if(ne){let pe=U.object.getWorldPosition(new E),K=Yn.clamp(Math.floor(U.point.x-pe.x+2)+1,1,4);de=ne.functions?.[K]}de?a(de):L.id?i(L.id):L.p?r(L.u||L.array,L.p):L.chip?l(L.chip):L.holes&&U.instanceId!==void 0?c(L.holes[U.instanceId]):L.bit!==void 0&&a(L.bit);let we=L.bit!==void 0?e.items.find(pe=>pe.kind==="switch"&&pe.value===L.bit):null;G.select(L.componentHint||L.id||L.chip||L.u||we?.partId||we?.id)}),p.addEventListener("start",()=>{st=null,Me=!1,f.dataset.moving="false",_e=50}),p.addEventListener("change",()=>{_t=!0,Lt()}),p.addEventListener("end",()=>{_e=50,Lt()});function Lt(){Fe&&!document.hidden&&!je&&(je=requestAnimationFrame(vc))}function Mr(){if(!m.get(Qe)?.group.visible)return;let{width:P,height:U}=s.getBoundingClientRect();!P||!U||d.updateMatrixWorld()}function vc(S){if(je=0,!(!Fe||document.hidden)){if(_t=!1,st){let P=Yn.clamp((S-st.started)/680,0,1),U=P<.5?4*P*P*P:1-Math.pow(-2*P+2,3)/2;d.position.lerpVectors(st.fromPos,st.toPos,U),p.target.lerpVectors(st.fromTarget,st.toTarget,U),P===1&&(st=null,f.dataset.moving="false")}if(re){let P=Yn.clamp((S-re.started)/re.duration,0,1);yi.position.copy(re.curve.getPointAt(P)),yi.visible=P<1,Ui.forEach(({ring:U})=>U.scale.setScalar(1+.25*Math.sin(P*Math.PI*2))),P===1&&(re=null,Ui.forEach(({ring:U})=>U.scale.setScalar(1)))}p.update(),Mr(),G.layout(),u.render(h,d),Pt++,(st||re||_t&&_e-- >0)&&Lt()}}function is(){st&&(d.position.copy(st.toPos),p.target.copy(st.toTarget),st=null,p.update()),re=null,yi.visible=!1,Ui.forEach(({ring:S})=>S.scale.setScalar(1)),f.dataset.moving="false",Lt()}function Za(S,P=!0){ye=[...S];let[U,L,ne,de]=S,we=Se([U+ne/2,L+de/2],1.6),pe=Me?new E(0,1,.001):d.position.clone().sub(p.target).normalize();pe.length()<.5&&pe.set(.18,1.15,1.2).normalize();let K=new E().crossVectors(d.up,pe).normalize(),at=new E().crossVectors(pe,K).normalize(),fe=8,xe=Math.tan(d.fov*Math.PI/360);for(let lt of[-ne/60,ne/60])for(let It of[-de/60,de/60])for(let me of[-1.6,4]){let He=new E(lt,me,It);fe=Math.max(fe,He.dot(pe)+1.08*Math.abs(He.dot(K))/(xe*d.aspect),He.dot(pe)+1.08*Math.abs(He.dot(at))/xe)}ot=fe;let ke=we.clone().addScaledVector(pe,fe);st=null,P&&ge?.animate&&Fe&&rt.motion==="full"?(st={fromPos:d.position.clone(),toPos:ke,fromTarget:p.target.clone(),toTarget:we,started:performance.now()},f.dataset.moving="true"):(d.position.copy(ke),p.target.copy(we),p.update(),f.dataset.moving="false"),Lt()}function br(S){ge=S,Qe=S.selected,typeof S.clarity=="boolean"?C=S.clarity:typeof S.routingFocus=="boolean"&&(C=S.routingFocus),typeof S.isolate=="boolean"&&(M=S.isolate);let P=S.studio,U=!!P?.chip,L=new Set(P?.related||[]),ne=new Set(P?.signals?.active?P.signals.ids:[]),de=m.get(S.selected),we=C&&!!de,pe=de?.it.partId,K=new Set([pe,...[de?.it.fromRef,de?.it.toRef].filter(Boolean).map(fe=>fe.split(".")[0])].filter(Boolean)),at=[de?.it.fromRef,de?.it.toRef].filter(fe=>/^U\d+\.\d+$/.test(fe||""));for(let[fe,xe]of m){let ke=!["wire","link"].includes(xe.it.kind)||S.step===e.stages.length-1||xe.it.stage===S.step;xe.group.visible=(ke||S.previous&&xe.it.stage<S.step||U&&L.has(fe))&&!(M&&de?.it.kind==="wire"&&xe.it.kind==="wire"&&fe!==S.selected);let lt=K.has(xe.it.partId),It=xe.it.kind==="wire"&&de?.it.kind==="wire"&&de.it.signal&&xe.it.signal===de.it.signal,me=xe.it.kind==="wire"&&pe&&[xe.it.fromRef,xe.it.toRef].some(tt=>tt?.startsWith(pe+".")),He=P?.signals?.active&&xe.it.kind==="wire"?ne.has(fe)?1:.16:U?L.has(fe)?1:xe.it.kind==="wire"?.1:.8:fe===S.selected?1:we?xe.it.kind==="wire"?It||me?.32:.16:lt?1:.92:S.selected?.4:ke?1:.75;xe.group.traverse(tt=>{if(tt.userData.viewerLabel&&(tt.visible=!we||fe===S.selected||lt),tt.isMesh)for(let dt of[].concat(tt.material)){let At=tt.userData.baseOpacity??1;dt.transparent=He<1||At<1||!!tt.userData.softShadow,dt.opacity=He*At,dt.depthWrite=He>.6&&At===1&&!tt.userData.softShadow}}),xe.material.emissive.set(fe===S.selected?xe.material.color:0),xe.material.emissiveIntensity=fe===S.selected?.3:0}_c(de);for(let[fe,xe]of x)xe.visible=U?fe.startsWith(P.chip+".")&&(!P.pin||fe===P.chip+"."+P.pin):!we||at.includes(fe);xc.forEach((fe,xe)=>{let ke=at[xe],lt=b.find(It=>It.userData.u+"."+It.userData.p===ke);fe.visible=!!(we&&lt),lt&&fe.position.copy(Ue(lt.userData.h,.23))}),Ui.forEach(({ring:fe},xe)=>{let ke=m.get(S.selected);fe.visible=!!ke?.group.visible,ke&&fe.position.copy(xe?ke.b:ke.a).add(new E(0,.14,0))}),I&&(I.rotation.y=(S.pot/100-.5)*Math.PI),Ne(P),G.sync(S.selected||P?.chip||"",S.selected||P?.chip),bc(S),Sc(X);for(let fe of H)fe.group.visible=S.step>=fe.stage;s.dataset.selected=S.selected||"",s.dataset.step=S.step,s.dataset.wireClarity=String(C),s.dataset.isolateWires=String(M),s.dataset.visibleConnections=[...m.values()].filter(fe=>fe.group.visible).length,S.animate||is(),Lt()}function Sc(S){X=S;let P=0;for(let U of F)for(let L of U.cables){if(L.nativeId){P++;continue}let ne=S&&U.id===S.id&&L.terminal===S.terminal;L.group.visible=ge?.step>=(U.wiringStage||2)&&(!S||P<=S.index),dp(L,ne?S.progress:1),P++}Lt()}function $u(S){let P=!!S;P!==C&&(C=P,ge?br({...ge,clarity:P}):(s.dataset.wireClarity=String(P),Lt()))}function Mc(S){let P=!1;for(let[U,L]of v){let ne=!!S[U];L.userData.lit!==ne&&(L.userData.lit=ne,L.color.set(L.userData.baseColor),L.emissive.set(ne?L.userData.baseColor:"#000000"),L.emissiveIntensity=ne?.9:0,R.get(U).visible=ne,P=!0)}P&&Lt()}function bc(S={}){Mc(S.leds||{});for(let[P,U]of D){let[L,ne]=P.split("."),de=!!(S.segments?.[P]??S.segments?.[L]?.[ne]);U.material.color.set(de?"#ff5b42":"#42252a"),U.material.emissive.set(de?"#ed3825":"#000000"),U.material.emissiveIntensity=de?.8:0}for(let P of T){if(P.userData.dipSlider){let U=!!S.switches?.[P.userData.switchId],L=e.stopClosedRun&&P.userData.switchId==="STOP"?!U:U;P.position.z=P.userData.homeZ+(L?-.36:.36);continue}if(P.userData.externalControl){td(P,!!S.switches?.[P.userData.switchId]);continue}P.rotation.z=S.switches?.[P.userData.switchId]?-.18:.18,P.material.color.set(S.switches?.[P.userData.switchId]?"#da7044":P.userData.baseColor||"#245f95")}Lt()}function Ec(){let S=m.get(Qe);!S||!S.group.visible||!ge?.animate||!Fe||(re={curve:S.curve,started:performance.now(),duration:Math.min(6e3,Math.max(2200,S.curve.getLength()*60))},yi.visible=!0,Lt())}function w(S){let P=S?.stripHoles||[],U=JSON.stringify(P);if(U===Ge||(Ge=U,se.traverse(pe=>{if(pe.geometry?.dispose(),pe.material)for(let K of[].concat(pe.material))K.dispose()}),se.clear(),!P.length))return;let L=Ue(P[0],.09),ne=Ue(P.at(-1),.09),de=L.clone().lerp(ne,.5),we=Math.abs(L.x-ne.x)>Math.abs(L.z-ne.z);Le(we?L.distanceTo(ne)+.6:.62,.045,we?.62:L.distanceTo(ne)+.6,de,new Gt({color:14198067,transparent:!0,opacity:.38,depthTest:!1,depthWrite:!1}),se);for(let pe of P){let K=he(new fi(.27,.045,8,20),new Gt({color:11040800,depthTest:!1,depthWrite:!1}),Ue(pe,.13),se);K.rotation.x=-Math.PI/2,K.renderOrder=18}}function z(S){let P=S?.reveal;if(!P||P.ring<0)return;let U=S.wire.geometry,L=P.ring*P.stride,ne=L+P.stride;for(let de of["position","normal"]){let we=U.getAttribute(de);we.array.set(P[de].subarray(L,ne),L),we.addUpdateRange(L,P.stride),we.needsUpdate=!0}P.ring=-1}function j(){if(vt<0)return;let S=ue.getAttribute("instanceEnd"),P=Ut[vt+1];S&&P&&(S.setXYZ(vt,P.x,P.y,P.z),S.data.needsUpdate=!0),vt=-1}function Z(S){if(S){z(S),S.wire.geometry.setDrawRange(0,1/0);for(let P of S.plugs||[])for(let U of P)U.mesh.visible=!0,U.mesh.position.copy(U.home)}}function J(S){if(Ae.id&&Ae.id!==S?.id&&Z(m.get(Ae.id)),j(),!S){Ae.id&&Z(m.get(Ae.id)),Ae={id:null,progress:1},ue.instanceCount=ue.getAttribute("instanceStart")?.count||0,Lt();return}let P=m.get(S.id);if(!P||P.it.kind!=="wire")return;Ae={id:S.id,progress:Yn.clamp(S.progress,0,1)},re=null,yi.visible=!1;let U=Ae.progress,L=As((U-.22)/.56),ne=P.wire.geometry;z(P);let de=ne.parameters.tubularSegments,we=ne.parameters.radialSegments,pe=L*de,K=Math.floor(pe),at=pe-K,fe=Math.min(de,K+1);if(L>0&&L<1&&at>1e-8){P.reveal||={position:new Float32Array(ne.getAttribute("position").array),normal:new Float32Array(ne.getAttribute("normal").array),stride:(we+1)*3,ring:-1};let ke=P.reveal,lt=ne.getAttribute("position"),It=ne.getAttribute("normal"),me=ne.parameters.radius;P.curve.getPointAt(L,Qt);for(let He=0;He<=we;He++){let tt=(K*(we+1)+He)*3,dt=(fe*(we+1)+He)*3;ln.set(ke.normal[tt]+(ke.normal[dt]-ke.normal[tt])*at,ke.normal[tt+1]+(ke.normal[dt+1]-ke.normal[tt+1])*at,ke.normal[tt+2]+(ke.normal[dt+2]-ke.normal[tt+2])*at).normalize(),lt.setXYZ(fe*(we+1)+He,Qt.x+me*ln.x,Qt.y+me*ln.y,Qt.z+me*ln.z),It.setXYZ(fe*(we+1)+He,ln.x,ln.y,ln.z)}ke.ring=fe;for(let He of[lt,It])He.addUpdateRange(fe*ke.stride,ke.stride),He.needsUpdate=!0}else P.curve.getPointAt(L,Qt);let xe=L<=0?0:Math.ceil(pe);if(ne.setDrawRange(0,xe*we*6),qe===S.id&&(ue.instanceCount=xe,xe>0&&L<1)){let ke=ue.getAttribute("instanceEnd");vt=xe-1,ke.setXYZ(vt,Qt.x,Qt.y,Qt.z),ke.data.needsUpdate=!0}(P.plugs||[]).forEach((ke,lt)=>{let It=As(lt?(U-.78)/.22:U/.22);for(let me of ke)me.mesh.visible=lt?U>=.78:!0,me.mesh.position.copy(me.home),me.mesh.position.y+=.85*(1-It)}),Lt()}function Oe(){let S=m.get(Ae.id);if(!S)return null;let P=S.wire.geometry,U=P.parameters.radialSegments,L=P.parameters.tubularSegments,ne=As((Ae.progress-.22)/.56),de=Math.ceil(ne*L),we=P.getAttribute("position"),pe=new E;if(de>0){for(let xe=0;xe<U;xe++){let ke=de*(U+1)+xe;pe.x+=we.getX(ke),pe.y+=we.getY(ke),pe.z+=we.getZ(ke)}pe.divideScalar(U)}else pe.copy(S.a);let K=ue.getAttribute("instanceEnd"),at=ue.instanceCount-1,fe=at>=0?new E(K.getX(at),K.getY(at),K.getZ(at)):S.a;return{fraction:ne,wireTip:pe.toArray(),traceTip:fe.toArray(),tipError:pe.distanceTo(fe),visibleSegments:de,segments:L,traceSegments:ue.instanceCount}}function Ve(S){if(W?.id&&W.id!==S?.id){let U=B.get(W.id);U&&U.group.position.copy(U.home)}let P=B.get(S?.id);if(W=P?{id:S.id,progress:Yn.clamp(S.progress,0,1)}:null,ie!==W?.id){V.traverse(U=>{U.geometry?.dispose(),U.material?.dispose()}),V.clear(),ie=W?.id;for(let[U,L]of(P?.holes||[]).entries()){let ne=he(new fi(U===0?.3:.23,.045,8,20),new Gt({color:U===0?13080622:1538403,depthTest:!1,depthWrite:!1}),Ue(L,.15),V);ne.rotation.x=-Math.PI/2,ne.renderOrder=19}}if(P){let U=W.progress,L=As((U-.24)/.76);P.group.position.copy(P.home),P.group.position.y+=5.5*(1-L)}Lt()}function Ne(S){w(S);for(let[P,U]of $)U.outline.visible=P===S?.chip,U.body.material.transparent=!!(S?.chip&&P!==S.chip),U.body.material.opacity=S?.chip&&P!==S.chip?.toString()?.52:1;J(S?.assembly||null),Ve(S?.placement||null),te(S?.signals||null)}function We(){let{width:S,height:P}=s.getBoundingClientRect();if(!(!S||!P)){d.aspect=S/P,d.updateProjectionMatrix(),u.setSize(S,P,!1),Di.forEach(U=>U.material.resolution.set(S,P));for(let U of q.children)U.material.resolution.set(S,P);Lt()}}let Ze=new ResizeObserver(We);Ze.observe(s),f.addEventListener("webglcontextlost",S=>{S.preventDefault(),xt(!1),o("Tu navegador perdi\xF3 la vista 3D. Puedes seguir en 2D y volver a intentarlo.")});let mt=()=>{document.hidden?(is(),je&&cancelAnimationFrame(je),je=0):Lt()};document.addEventListener("visibilitychange",mt);function xt(S){Fe=S,G.setActive(S),S?(We(),Lt()):(is(),je&&cancelAnimationFrame(je),je=0)}d.position.set(12,70,75),p.target.set(0,0,0),p.update();function Xe(){let S=ue.getAttribute("instanceStart"),P=ue.getAttribute("instanceEnd");return{visible:De.visible,id:qe,builds:Ye,isolate:M,widths:Di.map(U=>U.material.linewidth),resolution:Di[0].material.resolution.toArray(),depthTest:Di.some(U=>U.material.depthTest),curveA:S?[S.getX(0),S.getY(0),S.getZ(0)]:null,curveB:P?[P.getX(P.count-1),P.getY(P.count-1),P.getZ(P.count-1)]:null,visibleWires:[...m].filter(([,U])=>U.it.kind==="wire"&&U.group.visible).map(([U])=>U),endpointLabels:[],endpointRings:Ui.map(({ring:U})=>U.visible),replayDuration:re?.duration||null}}let Tt=new sn;h.add(Tt);let Wt=cp({groups:B,guideLayer:Tt,requestRender:Lt,makeRing:(S,P)=>{let U=he(new fi(P===0?.3:.23,.045,8,20),new Gt({color:P===0?13080622:1538403,depthTest:!1,depthWrite:!1}),Ue(S,.15),Tt);return U.rotation.x=-Math.PI/2,U.renderOrder=19,U}});return{setComponentSequence:Wt.apply,setExternalCable:Sc,update:br,focusBox:Za,replay:Ec,setActive:xt,setLEDs:Mc,setIndicators:bc,setWireClarity:$u,setAssembly:J,setPlacement:Ve,setSignals:ce,dismissComponentLabel:G.dismiss,getComponentLabel(){let S=G.diagnostics(),P=0;for(let U of S.targets)B.get(U.id)?.group.traverse(L=>{L.userData.viewerLabel&&!/^(\d+|I \/ O|STOP|SS0501A)$/.test(L.userData.labelText||"")&&P++});return{...S,flatNameCount:P}},getViewState(){return{camera:d.position.toArray(),target:p.target.toArray(),box:[...ye],fitDistance:ot,topView:Me}},getPlanViewBox(){let S=d.position.distanceTo(p.target)/Math.max(.01,ot),P=ye[2]*S,U=ye[3]*S;return[Q+p.target.x*30-P/2,le+p.target.z*30-U/2,P,U]},restoreViewState(S){if(!S||!["camera","target"].every(L=>Array.isArray(S[L])&&S[L].length===3&&S[L].every(Number.isFinite)))return!1;let P=new E().fromArray(S.camera).distanceTo(new E().fromArray(S.target));if(P<p.minDistance||P>p.maxDistance)return!1;st=null;let U=p.enableDamping;return p.enableDamping=!1,p.update(),d.position.fromArray(S.camera),p.target.fromArray(S.target),Me=!!S.topView,Array.isArray(S.box)&&S.box.length===4&&S.box.every(Number.isFinite)&&S.box[2]>0&&S.box[3]>0&&(ye=[...S.box]),Number.isFinite(S.fitDistance)&&S.fitDistance>0&&(ot=S.fitDistance),p.update(),p.enableDamping=U,f.dataset.moving="false",Lt(),!0},setAppearance(S={}){["auto","economy","sharp"].includes(S.quality)&&S.quality!==rt.quality&&(rt.quality=S.quality,u.setPixelRatio(Math.min(window.devicePixelRatio||1,S.quality==="economy"?1:S.quality==="sharp"?2:1.6)),We()),["full","reduced","off"].includes(S.motion)&&(rt.motion=S.motion),S.background&&S.background!==rt.background&&(h.background.set(S.background),rt.background=S.background),rt.motion!=="full"&&st&&(d.position.copy(st.toPos),p.target.copy(st.toTarget),st=null,p.update(),f.dataset.moving="false"),Lt()},getAppearance(){return{...rt}},setSelectionStyle(S={}){[1,1.4,1.8].includes(S.scale)&&(O.scale=S.scale),[.5,.8,1].includes(S.intensity)&&(O.intensity=S.intensity),Di.forEach((P,U)=>{P.material.linewidth=[10,7,3][U]*O.scale,P.material.opacity=U===2?1:O.intensity}),Lt()},getSelectionStyle(){return{...O}},stopReplay(){re=null,yi.visible=!1,Lt()},capture(){return u.render(h,d),f.toDataURL("image/png")},preset(S){Me=S==="top",Me||(st=null,d.position.copy(p.target).add(new E(12,70,75)),p.update()),Za(ye,!0)},zoom(){let S=p.target.clone(),P=S.clone().add(d.position.clone().sub(S).multiplyScalar(.75));st=null,ge?.animate&&rt.motion==="full"?(st={fromPos:d.position.clone(),toPos:P,fromTarget:S,toTarget:S,started:performance.now()},f.dataset.moving="true",Lt()):(d.position.copy(P),p.update(),Lt())},rotate(S){Me=!1;let P=d.position.clone().sub(p.target);P.applyAxisAngle(new E(0,1,0),S*Math.PI/6);let U=p.target.clone().add(P);ge?.animate&&rt.motion==="full"?(st={fromPos:d.position.clone(),toPos:U,fromTarget:p.target.clone(),toTarget:p.target.clone(),started:performance.now()},f.dataset.moving="true",Lt()):(d.position.copy(U),p.update(),Lt())},diagnostics(){let S=f.getBoundingClientRect(),P=U=>{let L=U.clone().project(d);return[S.left+(L.x+1)*S.width/2,S.top+(1-L.y)*S.height/2]};return{componentAssembly:Wt.diagnostics(),motors:[...m.values()].filter(U=>U.it.kind==="motor").map(U=>({id:U.it.partId,model:U.it.externalMotor?.model||"generic",terminals:U.it.externalMotor?.terminals.length||2,routeTypes:H.find(L=>L.id===U.it.partId)?.cables.map(L=>L.curve.type)||[]})),externalControls:F.map(U=>({id:U.id,model:U.model,center:U.center,bounds:U.bounds,connections:U.connections,cables:U.cables.map(L=>({terminal:L.terminal,routeType:L.curve.type,visible:L.group.visible,progress:L.nativeId?Ae.id===L.nativeId?Ae.progress:1:L.progress,drawCount:L.wire.geometry.drawRange.count,start:L.curve.getPoint(0).toArray(),end:L.curve.getPoint(1).toArray(),tip:L.nativeId?(Ae.id===L.nativeId?L.curve.getPointAt(As((Ae.progress-.22)/.56)):L.curve.getPoint(1)).toArray():L.tip.position.toArray()})),actuated:U.actuator.userData.actuated,actuator:U.actuator.position.toArray(),screen:P(Se(U.center,2.5))})),studio:{signals:ve?{...ve,builds:Re}:null,placement:W?{...W,height:B.get(W.id).group.position.y,holes:B.get(W.id).holes}:null,chip:ge?.studio?.chip||null,stripHoles:ge?.studio?.stripHoles||[],assembly:{...Ae},reveal:Oe(),partialDrawCount:Ae.id?m.get(Ae.id)?.wire.geometry.drawRange.count:null},selection:Xe(),wireClarity:C,routedConnections:[...m.values()].filter(U=>U.routed).length,wireStates:Object.fromEntries([...m].filter(([,U])=>U.routed).map(([U,L])=>[U,{opacity:L.wire.material.opacity,height:L.height,curveA:L.curve.getPoint(0).toArray(),curveB:L.curve.getPoint(1).toArray()}])),connectionCount:m.size,pinCount:b.length,arrayPinCount:A.length,resistorArrays:(e.arrays||[]).length,resistors:e.items.filter(U=>U.kind==="res").length,frames:Pt,active:Fe,moving:!!st,camera:d.position.toArray(),target:p.target.toArray(),drawCalls:u.info.render.calls,triangles:u.info.render.triangles,targets:{contacts:[P(Ue(["A","d",12],.03))],chips:[...$].map(([U,L])=>({id:U,screen:P(L.body.position)})),switches:T.slice(0,3).map(U=>P(U.position)),dipContacts:T.filter(U=>U.userData.dipSlider).map(U=>{let L=U.userData.componentHint,ne=e.chips.find(K=>K.id===L),de=Object.entries(ne.functions).find(([,K])=>K===U.userData.bit)?.[0],we=$.get(L).body,pe=we.position.clone().add(new E(Number(de)-2.5,.64,.95));return{bit:U.userData.bit,id:L,slider:P(U.getWorldPosition(new E)),body:P(we.parent.localToWorld(pe))}}),pins:b.map(U=>({u:U.userData.u,p:U.userData.p,screen:P(U.geometry.parameters.path.getPoint(.15))})),wires:Object.fromEntries([...m].map(([U,L])=>[U,P(L.curve.getPoint(.5))]))},endpoints:Object.fromEntries([...m].map(([U,L])=>[U,{a:L.it.a,b:L.it.b,worldA:L.a.toArray(),worldB:L.b.toArray()}])),lit:[...v].filter(([,U])=>U.userData.lit).map(([U])=>U)}},dispose(){xt(!1),G.dispose(),Ze.disconnect(),document.removeEventListener("visibilitychange",mt),p.dispose();let S=new Set,P=new Set,U=new Set;h.traverse(L=>{L.geometry&&S.add(L.geometry);for(let ne of[].concat(L.material||[]))P.add(ne),ne.map&&U.add(ne.map)}),U.forEach(L=>L.dispose()),P.forEach(L=>L.dispose()),S.forEach(L=>L.dispose()),u.dispose(),f.remove()}}}export{jb as createViewer};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
