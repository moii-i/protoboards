var d_=Object.defineProperty;var f_=(s,e)=>{for(var t in e)d_(s,t,{get:e[t],enumerable:!0})};function qp({groups:s,requestRender:e,makeRing:t,guideLayer:n}){let i=null,r="";function o(a){i=a;let l=a?.id||"";if(l!==r){for(let h of[...n.children])h.geometry?.dispose(),h.material?.dispose(),n.remove(h);r=l;let c=s.get(l);if(c&&!c.external)for(let[h,u]of c.holes.entries()){let d=t(u,h);n.add(d)}}for(let[c,h]of s){h.home||=h.group.position.clone(),h.group.position.copy(h.home);let u=a?.order?.indexOf(c)??-1;if(h.group.visible=!a||u<0||u<=a.index,a&&c===a.id){let d=Math.max(0,Math.min(1,(a.progress-.18)/.82)),f=d*d*(3-2*d);h.external?(h.group.position.x+=4*(1-f),h.group.position.y+=.7*(1-f)):h.group.position.y+=5.5*(1-f)}}n.visible=!!a,e()}return{apply:o,diagnostics:()=>({pose:i?{id:i.id,index:i.index,progress:i.progress}:null,components:[...s].map(([a,l])=>({id:a,visible:l.group.visible,position:l.group.position.toArray(),home:l.home?.toArray(),holes:l.holes,external:!!l.external}))})}}function Zp({THREE:s,scene:e,container:t,camera:n,canvas:i,requestRender:r}){let o=new Map,a=new Map,l=null,c=null,h=!1,u=document.createElement("div");u.className="component-hologram",u.id="doorComponentHologram",u.hidden=!0,u.setAttribute("role","status"),u.setAttribute("aria-live","polite"),u.setAttribute("aria-atomic","true");let d=document.createElement("span"),f=document.createElement("strong"),p=document.createElement("span");d.className="hologram-kind",p.className="hologram-detail",u.append(d,f,p),t.append(u);let _=new s.Group;_.visible=!1,e.add(_);let g=new s.MeshBasicMaterial({color:6806741,transparent:!0,opacity:.65,depthWrite:!1,toneMapped:!1}),m=new s.Mesh(new s.TorusGeometry(.76,.025,8,48),g);m.rotation.x=-Math.PI/2,_.add(m);let x=new s.Mesh(new s.CylinderGeometry(.012,.012,1.2,6),g.clone());x.position.y=.6,x.material.opacity=.35,_.add(x);let w=new s.Vector3,y=new s.Vector3,A=new s.Vector3;function T(U){for(;U;){if(!U.visible)return!1;U=U.parent}return!0}function L(U){["led","res","switch"].includes(U.type)&&(o.set(U.id,U),U.connectionId&&a.set(U.connectionId,U.id))}function v(U){return o.get(a.get(U)||U)||null}function R(){l=null,u.hidden=!0,_.visible=!1,i.setAttribute("aria-describedby","threeHelp"),r()}function I(U,{toggle:z=!1}={}){let V=v(U);if(!V||z&&l?.id===V.id){R();return}l?.id!==V.id&&(l=V,d.textContent={led:"INDICADOR",res:"RESISTENCIA",switch:"CONTROL"}[V.type],f.textContent=V.title,p.textContent=typeof V.detail=="function"?V.detail():V.detail||"",p.hidden=!p.textContent,u.dataset.component=V.id,u.dataset.kind=V.type),i.setAttribute("aria-describedby","threeHelp "+u.id),k(),r()}function B(U,z){U!==c&&(c=U,I(z))}function k(){if(!h||!l||!T(l.group)){u.hidden=!0,_.visible=!1;return}let U=typeof l.detail=="function"?l.detail():l.detail||"";p.textContent!==U&&(p.textContent=U),p.hidden=!U;let z=t.getBoundingClientRect();if(!z.width||!z.height)return;if(l.group.updateWorldMatrix(!0,!1),w.copy(l.anchor).applyMatrix4(l.group.matrixWorld),n.updateMatrixWorld(),A.copy(w).project(n),A.z<-1||A.z>1||Math.abs(A.x)>1.03||Math.abs(A.y)>1.03){u.hidden=!0,_.visible=!1;return}_.position.copy(w),_.visible=!0,y.copy(w),y.y+=1.7,y.project(n),u.hidden=!1;let V=Math.min(228,z.width-24),G=u.getBoundingClientRect?.().height||76,Q=(A.x+1)*z.width/2,Y=(1-A.y)*z.height/2,j=Math.max(V/2+10,Math.min(z.width-V/2-10,Q)),ie=Math.max(G+12,Math.min(z.height-10,(1-y.y)*z.height/2,Y-22));u.style.width=V+"px",u.style.left=j+"px",u.style.top=ie+"px"}let X=U=>{U.key==="Escape"&&l&&(U.preventDefault(),U.stopPropagation(),R())};return i.addEventListener("keydown",X),{register:L,resolve:v,select:I,sync:B,dismiss:R,layout:k,setActive(U){h=U,U?k():R()},diagnostics(){let U=l,z=u.getBoundingClientRect?.(),V=t.getBoundingClientRect();return n.updateMatrixWorld(),{id:U?.id||null,type:U?.type||null,title:f.textContent,detail:p.textContent,visible:!u.hidden,halo:_.visible,anchor:w.toArray(),screen:z?[z.left,z.top,z.right,z.bottom]:null,targets:[...o.values()].map(G=>{G.group.updateWorldMatrix(!0,!1);let Q=(G.hitPoint||G.anchor).clone().applyMatrix4(G.group.matrixWorld),Y=Q.clone().project(n);return{id:G.id,type:G.type,title:G.title,world:Q.toArray(),screen:[V.left+(Y.x+1)*V.width/2,V.top+(1-Y.y)*V.height/2]}})}},dispose(){i.removeEventListener("keydown",X),u.remove(),_.removeFromParent(),m.geometry.dispose(),x.geometry.dispose(),g.dispose(),x.material.dispose()}}}function Ad(s,e,t,n,i,r){let o=[n,...e.map(l=>t(l,r)),i],a=new s.CurvePath;for(let l=1;l<o.length;l++)o[l-1].distanceToSquared(o[l])>1e-12&&a.add(new s.LineCurve3(o[l-1],o[l]));return a}function Jp(s){let{THREE:e,it:t,group:n,mesh:i,box:r,roundedBox:o,toWorld:a,hpos:l,topLabel:c,contactShadow:h,pickables:u,switches:d,metal:f,dark:p,componentLabels:_=!0}=s,g=t.externalControl,m=a(g.center,0),x=g.model==="scmm-122",w=new e.MeshStandardMaterial({color:6120546,metalness:.76,roughness:.42}),y=new e.MeshStandardMaterial({color:x?2304555:3907227,roughness:.6}),A=new e.MeshStandardMaterial({color:11368236,roughness:.77}),T=new e.MeshStandardMaterial({color:13028298,metalness:.87,roughness:.27}),L=new e.MeshStandardMaterial({color:2107947,roughness:.83}),v=z=>(z.userData={...z.userData,bit:t.value,componentHint:t.partId||t.id},u.push(z),z);function R(z,V,G){let Q=new e.Shape,Y=-z/2,j=-V/2;return Q.moveTo(Y+G,j),Q.lineTo(Y+z-G,j),Q.quadraticCurveTo(Y+z,j,Y+z,j+G),Q.lineTo(Y+z,j+V-G),Q.quadraticCurveTo(Y+z,j+V,Y+z-G,j+V),Q.lineTo(Y+G,j+V),Q.quadraticCurveTo(Y,j+V,Y,j+V-G),Q.lineTo(Y,j+G),Q.quadraticCurveTo(Y,j,Y+G,j),Q}let I;if(x){o(4.55,.2,2.2,m.clone().setY(.62),A,n,.05),v(o(4.45,1.35,2.1,m.clone().setY(1.4),y,n,.12));let z=R(8,2.55,.2);for(let j of[-3.13,3.13]){let ie=new e.Path;ie.absellipse(j,0,.45,.31,0,Math.PI*2,!0),z.holes.push(ie)}let V=new e.Path;V.moveTo(-1.4,-.53),V.lineTo(-1.4,.53),V.lineTo(1.4,.53),V.lineTo(1.4,-.53),V.closePath(),z.holes.push(V);let G=v(i(new e.ExtrudeGeometry(z,{depth:.12,bevelEnabled:!0,bevelSize:.025,bevelThickness:.025,bevelSegments:2,steps:1}),w,m.clone().setY(2.13),n));G.rotation.x=-Math.PI/2;for(let j of[-1.23,1.23])r(4.5,1.1,.1,m.clone().setY(1.55).add(new e.Vector3(0,0,j)),w,n);for(let j of[-1.75,1.75])for(let ie of[-1.18,1.18])r(.42,.34,.15,m.clone().setY(.9).add(new e.Vector3(j,0,ie)),w,n);I=new e.Group,I.position.copy(m).setY(2.26),n.add(I),v(o(.98,1.05,.85,new e.Vector3(0,.42,0),p,I,.06));for(let j=0;j<5;j++)r(.075,.98,.92,new e.Vector3(-.39+j*.195,.43,0),y,I);I.userData={externalControl:"scmm-122",switchId:t.value,homeX:m.x};let Q=c("0",m.clone().add(new e.Vector3(-2.3,2.285,0)),.38,.5,{background:"#5d6462",color:"#e0e7df",size:90}),Y=c("1",m.clone().add(new e.Vector3(2.3,2.285,0)),.38,.5,{background:"#5d6462",color:"#e0e7df",size:90});n.add(Q,Y)}else{let z=R(6.45,2.9,.22);for(let ie of[-1.82,1.82]){let ze=new e.Path;ze.absarc(ie,0,.43,0,Math.PI*2,!0),z.holes.push(ze)}v(i(new e.ExtrudeGeometry(z,{depth:2.3,bevelEnabled:!0,bevelSize:.035,bevelThickness:.035,bevelSegments:2,steps:1}),y,m.clone().add(new e.Vector3(0,1.65,-1.15)),n));for(let ie of[-1.82,1.82])for(let ze of[-1.2,1.2])i(new e.TorusGeometry(.45,.055,8,24),y,m.clone().add(new e.Vector3(ie,1.65,ze)),n);o(5.9,.09,2.18,m.clone().add(new e.Vector3(0,3.15,0)),y,n,.04);let V=v(o(.95,.62,.9,m.clone().add(new e.Vector3(1.2,3.22,0)),p,n,.09)),G=m.clone().add(new e.Vector3(-2.55,3.25,0)),Q=i(new e.CylinderGeometry(.17,.17,1.1,20),f,G,n);Q.rotation.x=Math.PI/2,I=new e.Group,I.position.copy(G),n.add(I),v(r(7.45,.11,.85,new e.Vector3(3.42,.08,0),f,I));let Y=r(.5,.1,.85,new e.Vector3(7.05,.15,0),f,I);Y.rotation.z=.25,v(Y),I.userData={externalControl:"ss0501a",switchId:t.value,plunger:V,plungerY:V.position.y};let j=c("SS0501A",m.clone().add(new e.Vector3(0,3.21,.7)),3.6,.6,{background:"#3b9e9b",color:"#237975",size:56});n.add(j)}d.push(I),h(m,x?10:10.8,6.3,n);let B=[t.a,t.b,t.third],k=[],X=g.terminals.map((z,V)=>{let G=a(z,1.02),Q=l(B[V],.08),Y=m.clone().add(new e.Vector3((V-1)*1.5,.72,1.08));i(new e.TubeGeometry(new e.CatmullRomCurve3([Y,Y.clone().add(new e.Vector3(0,-.18,.5)),G]),12,.085,8,!1),f,new e.Vector3,n),r(.38,.68,.13,G.clone().add(new e.Vector3(0,.15,-.15)),f,n),i(new e.TorusGeometry(.18,.065,8,20),f,G,n),i(new e.SphereGeometry(.17,12,8),T,G.clone().add(new e.Vector3(0,-.06,.03)),n);let j=G.clone().add(new e.Vector3(0,-.18,.65)),ie=i(new e.CylinderGeometry(.19,.17,.65,16),L,G.clone().add(new e.Vector3(0,-.09,.32)),n);ie.rotation.x=Math.PI/2;let ze=new e.MeshStandardMaterial({color:g.colors[V],roughness:.74}),Ge=a([g.center[0]-150-V*18,g.center[1]-155-V*17],1.7+V*.28),at=a([g.center[0]+(V-1)*52,g.center[1]+135+V*10],.9+V*.18),xt=g.cableRoutes?.[V]?Ad(e,g.cableRoutes[V],a,G,Q,g.cableHeights[V]):new e.CatmullRomCurve3([G,j,at,Ge,a([U(B[V]),815+V*24],1.8+V*.28),Q.clone().setY(1.1+V*.28),Q],!1,"centripetal"),st=new e.Group;n.add(st);let $=i(new e.TubeGeometry(xt,96,.095,8,!1),ze,new e.Vector3,st);$.userData={id:t.id},u.push($);let ae=r(.3,.46,.3,Q.clone().setY(.23),L,st),Me=i(new e.SphereGeometry(.17,12,8),new e.MeshBasicMaterial({color:15054145}),G.clone(),st);if(Me.visible=!1,k.push({group:st,wire:$,curve:xt,plug:ae,tip:Me,point:new e.Vector3,normal:new e.Vector3,terminal:V,progress:1}),_){let rt=c((x?["+5","COM","GND"]:["NC","COM","NA"])[V],G.clone().add(new e.Vector3(0,-.87,1.05)),1.45,1.8,{background:"#edf1ed",color:V===0?"#b64143":"#364e49",size:54});n.add(rt)}return{hole:B[V],terminal:z,worldTerminal:G.toArray(),function:g.functions[V]}});function U(z){return s.point(z)[0]}if(_){let z=c(t.value+" \xB7 "+g.model.toUpperCase(),m.clone().add(new e.Vector3(0,.065,-3.15)),10,3.1,{background:"#edf1ed",color:t.value==="STOP"?"#a64445":"#345a4a",size:45});n.add(z);let V=c(x?"DESLIZABLE \xB7 MANTENIDO":"PALANCA \xB7 FIN DE CARRERA",m.clone().add(new e.Vector3(0,.065,7.2)),10,2.8,{background:"#edf1ed",color:"#587363",size:37});n.add(V)}return Rd(I,!1),{id:t.partId,model:g.model,center:g.center,bounds:g.bounds,connections:X,actuator:I,cables:k,wiringStage:t.wiringStage??t.stage}}function Rd(s,e){let t=s.userData;t.externalControl==="scmm-122"?s.position.x=t.homeX+(e?.72:-.72):t.externalControl==="ss0501a"&&(s.rotation.z=e?.012:.16,t.plunger.position.y=t.plungerY-(e?.19:0)),t.actuated=!!e}function Kp(s,e){e=Math.max(0,Math.min(1,e));let t=s.wire.geometry,n=t.parameters.tubularSegments,i=t.parameters.radialSegments,r=t.getAttribute("position"),o=t.getAttribute("normal");if(s.reveal?.ring>=0){let a=s.reveal.ring;for(let l=0;l<=i;l++){let c=(a*(i+1)+l)*3;r.setXYZ(a*(i+1)+l,...s.reveal.position.subarray(c,c+3)),o.setXYZ(a*(i+1)+l,...s.reveal.normal.subarray(c,c+3))}s.reveal.ring=-1,r.needsUpdate=o.needsUpdate=!0}if(e>0&&e<1){s.reveal||={position:new Float32Array(r.array),normal:new Float32Array(o.array),ring:-1};let a=e*n,l=Math.floor(a),c=a-l,h=Math.min(n,l+1);s.curve.getPointAt(e,s.point);for(let u=0;u<=i;u++){let d=(l*(i+1)+u)*3,f=(h*(i+1)+u)*3;s.normal.set(s.reveal.normal[d]+(s.reveal.normal[f]-s.reveal.normal[d])*c,s.reveal.normal[d+1]+(s.reveal.normal[f+1]-s.reveal.normal[d+1])*c,s.reveal.normal[d+2]+(s.reveal.normal[f+2]-s.reveal.normal[d+2])*c).normalize(),r.setXYZ(h*(i+1)+u,s.point.x+t.parameters.radius*s.normal.x,s.point.y+t.parameters.radius*s.normal.y,s.point.z+t.parameters.radius*s.normal.z),o.setXYZ(h*(i+1)+u,s.normal.x,s.normal.y,s.normal.z)}s.reveal.ring=h,r.needsUpdate=o.needsUpdate=!0}t.setDrawRange(0,Math.ceil(e*n)*i*6),s.tip.visible=e>0&&e<1,s.tip.visible&&s.tip.position.copy(s.point),s.plug.visible=e>=1,s.progress=e}var Ea={};f_(Ea,{ACESFilmicToneMapping:()=>la,AddEquation:()=>er,AddOperation:()=>qf,AdditiveAnimationBlendMode:()=>od,AdditiveBlending:()=>oa,AgXToneMapping:()=>$u,AlphaFormat:()=>sd,AlwaysCompare:()=>op,AlwaysDepth:()=>$a,AlwaysStencilFunc:()=>ep,AmbientLight:()=>Vl,AnimationAction:()=>Kl,AnimationClip:()=>Ks,AnimationLoader:()=>ou,AnimationMixer:()=>yu,AnimationObjectGroup:()=>xu,AnimationUtils:()=>ru,ArcCurve:()=>xl,ArrayCamera:()=>Yl,ArrowHelper:()=>Bu,AttachedBindMode:()=>zh,Audio:()=>Zl,AudioAnalyser:()=>_u,AudioContext:()=>ta,AudioListener:()=>mu,AudioLoader:()=>fu,AxesHelper:()=>zu,BackSide:()=>Fn,BasicDepthPacking:()=>jf,BasicShadowMap:()=>cg,BatchedMesh:()=>ul,BezierInterpolant:()=>Fl,Bone:()=>Fo,BooleanKeyframeTrack:()=>es,Box2:()=>$l,Box3:()=>Jt,Box3Helper:()=>Fu,BoxGeometry:()=>Jn,BoxHelper:()=>Nu,BufferAttribute:()=>Wt,BufferGeometry:()=>_t,BufferGeometryLoader:()=>Wl,ByteType:()=>ed,Cache:()=>Li,Camera:()=>Hr,CameraHelper:()=>Uu,CanvasTexture:()=>Xs,CapsuleGeometry:()=>gl,CatmullRomCurve3:()=>Fi,CineonToneMapping:()=>Ju,CircleGeometry:()=>vs,ClampToEdgeWrapping:()=>Yn,Clock:()=>Eu,Color:()=>Oe,ColorKeyframeTrack:()=>Ko,ColorManagement:()=>Tt,Compatibility:()=>$g,CompressedArrayTexture:()=>tu,CompressedCubeTexture:()=>nu,CompressedTexture:()=>Cr,CompressedTextureLoader:()=>au,ConeGeometry:()=>zo,ConstantAlphaFactor:()=>Wf,ConstantColorFactor:()=>kf,Controls:()=>sa,CubeCamera:()=>Xl,CubeDepthTexture:()=>ml,CubeReflectionMapping:()=>ki,CubeRefractionMapping:()=>As,CubeTexture:()=>Ws,CubeTextureLoader:()=>lu,CubeUVReflectionMapping:()=>Yr,CubicBezierCurve:()=>Vo,CubicBezierCurve3:()=>Ys,CubicInterpolant:()=>Ul,CullFaceBack:()=>ku,CullFaceFront:()=>Tf,CullFaceFrontBack:()=>lg,CullFaceNone:()=>wf,Curve:()=>si,CurvePath:()=>Zs,CustomBlending:()=>Rf,CustomToneMapping:()=>Ku,CylinderGeometry:()=>jt,Cylindrical:()=>wu,Data3DTexture:()=>Mr,DataArrayTexture:()=>Sr,DataTexture:()=>qn,DataTextureLoader:()=>cu,DataUtils:()=>Wh,DecrementStencilOp:()=>Rg,DecrementWrapStencilOp:()=>Pg,DefaultLoadingManager:()=>up,DepthFormat:()=>Di,DepthStencilFormat:()=>Rs,DepthTexture:()=>ys,DetachedBindMode:()=>Zf,DirectionalLight:()=>Qs,DirectionalLightHelper:()=>Du,DiscreteInterpolant:()=>Nl,DodecahedronGeometry:()=>_l,DoubleSide:()=>ui,DstAlphaFactor:()=>Of,DstColorFactor:()=>zf,DynamicCopyUsage:()=>Xg,DynamicDrawUsage:()=>zg,DynamicReadUsage:()=>kg,EdgesGeometry:()=>Pr,EllipseCurve:()=>Ir,EqualCompare:()=>ip,EqualDepth:()=>Qa,EqualStencilFunc:()=>Ug,EquirectangularReflectionMapping:()=>ca,EquirectangularRefractionMapping:()=>ha,Euler:()=>_i,EventDispatcher:()=>ii,ExternalTexture:()=>Bo,ExtrudeGeometry:()=>Dr,FileLoader:()=>xi,Float16BufferAttribute:()=>Kh,Float32BufferAttribute:()=>Be,FloatType:()=>Dn,Fog:()=>ol,FogExp2:()=>rl,FramebufferTexture:()=>eu,FrontSide:()=>Ts,Frustum:()=>$i,FrustumArray:()=>hl,GLBufferAttribute:()=>bu,GLSL1:()=>qg,GLSL3:()=>ad,GreaterCompare:()=>sp,GreaterDepth:()=>tl,GreaterEqualCompare:()=>Oc,GreaterEqualDepth:()=>el,GreaterEqualStencilFunc:()=>Bg,GreaterStencilFunc:()=>Fg,GridHelper:()=>Iu,Group:()=>fn,HTMLTexture:()=>iu,HalfFloatType:()=>vi,HemisphereLight:()=>zr,HemisphereLightHelper:()=>Pu,IcosahedronGeometry:()=>Ml,ImageBitmapLoader:()=>du,ImageLoader:()=>$s,ImageUtils:()=>sl,IncrementStencilOp:()=>Ag,IncrementWrapStencilOp:()=>Cg,InstancedBufferAttribute:()=>xs,InstancedBufferGeometry:()=>kr,InstancedInterleavedBuffer:()=>bs,InstancedMesh:()=>Rr,Int16BufferAttribute:()=>Zh,Int32BufferAttribute:()=>Jh,Int8BufferAttribute:()=>Xh,IntType:()=>Ql,InterleavedBuffer:()=>Tr,InterleavedBufferAttribute:()=>Nn,Interpolant:()=>Ms,InterpolateBezier:()=>Vh,InterpolateDiscrete:()=>Ao,InterpolateLinear:()=>il,InterpolateSmooth:()=>Wa,InterpolationSamplingMode:()=>Kg,InterpolationSamplingType:()=>Jg,InvertStencilOp:()=>Ig,KeepStencilOp:()=>Xa,KeyframeTrack:()=>Kn,LOD:()=>al,LatheGeometry:()=>Ur,Layers:()=>br,LessCompare:()=>np,LessDepth:()=>ja,LessEqualCompare:()=>Fc,LessEqualDepth:()=>yr,LessEqualStencilFunc:()=>Ng,LessStencilFunc:()=>Dg,Light:()=>Vi,LightProbe:()=>kl,LightShadow:()=>Vr,Line:()=>Ni,Line3:()=>ia,LineBasicMaterial:()=>mn,LineCurve:()=>Ho,LineCurve3:()=>ji,LineDashedMaterial:()=>Dl,LineLoop:()=>dl,LineSegments:()=>Zn,LinearFilter:()=>qt,LinearInterpolant:()=>Jo,LinearMipMapLinearFilter:()=>pg,LinearMipMapNearestFilter:()=>fg,LinearMipmapLinearFilter:()=>Gi,LinearMipmapNearestFilter:()=>ua,LinearSRGBColorSpace:()=>Co,LinearToneMapping:()=>qu,LinearTransfer:()=>Po,Loader:()=>En,LoaderUtils:()=>ea,LoadingManager:()=>jo,LoopOnce:()=>Jf,LoopPingPong:()=>$f,LoopRepeat:()=>Kf,MOUSE:()=>Es,Material:()=>pn,MaterialBlending:()=>hg,MaterialLoader:()=>Gl,MathUtils:()=>On,Matrix2:()=>Tu,Matrix3:()=>gt,Matrix4:()=>ct,MaxEquation:()=>Lf,Mesh:()=>Yt,MeshBasicMaterial:()=>$t,MeshDepthMaterial:()=>qo,MeshDistanceMaterial:()=>Zo,MeshLambertMaterial:()=>Il,MeshMatcapMaterial:()=>Ll,MeshNormalMaterial:()=>Pl,MeshPhongMaterial:()=>Rl,MeshPhysicalMaterial:()=>Fr,MeshStandardMaterial:()=>bt,MeshToonMaterial:()=>Cl,MinEquation:()=>If,MirroredRepeatWrapping:()=>To,MixOperation:()=>Yf,MultiplyBlending:()=>Wu,MultiplyOperation:()=>aa,NearestFilter:()=>on,NearestMipMapLinearFilter:()=>dg,NearestMipMapNearestFilter:()=>ug,NearestMipmapLinearFilter:()=>qr,NearestMipmapNearestFilter:()=>Qu,NeutralToneMapping:()=>ju,NeverCompare:()=>tp,NeverDepth:()=>Ka,NeverStencilFunc:()=>Lg,NoBlending:()=>Hi,NoColorSpace:()=>is,NoNormalPacking:()=>Mg,NoToneMapping:()=>yi,NormalAnimationBlendMode:()=>Nc,NormalBlending:()=>Xr,NormalGAPacking:()=>Eg,NormalRGPacking:()=>bg,NotEqualCompare:()=>rp,NotEqualDepth:()=>nl,NotEqualStencilFunc:()=>Og,NumberKeyframeTrack:()=>Or,Object3D:()=>Ut,ObjectLoader:()=>uu,ObjectSpaceNormalMap:()=>Qf,OctahedronGeometry:()=>Xo,OneFactor:()=>Uf,OneMinusConstantAlphaFactor:()=>Xf,OneMinusConstantColorFactor:()=>Gf,OneMinusDstAlphaFactor:()=>Bf,OneMinusDstColorFactor:()=>Vf,OneMinusSrcAlphaFactor:()=>Yu,OneMinusSrcColorFactor:()=>Ff,OrthographicCamera:()=>js,PCFShadowMap:()=>ra,PCFSoftShadowMap:()=>Af,PMREMGenerator:()=>kc,Path:()=>Js,PerspectiveCamera:()=>rn,Plane:()=>ti,PlaneGeometry:()=>Oi,PlaneHelper:()=>Ou,PointLight:()=>zl,PointLightHelper:()=>Cu,Points:()=>fl,PointsMaterial:()=>Oo,PolarGridHelper:()=>Lu,PolyhedronGeometry:()=>Ss,PositionalAudio:()=>gu,PropertyBinding:()=>Gt,PropertyMixer:()=>Jl,QuadraticBezierCurve:()=>ko,QuadraticBezierCurve3:()=>qs,Quaternion:()=>hn,QuaternionKeyframeTrack:()=>Br,QuaternionLinearInterpolant:()=>Ol,R11_EAC_Format:()=>dc,RED_GREEN_RGTC2_Format:()=>xa,RED_RGTC1_Format:()=>Lc,REVISION:()=>Ef,RG11_EAC_Format:()=>_a,RGBADepthPacking:()=>yg,RGBAFormat:()=>Un,RGBAIntegerFormat:()=>sc,RGBA_ASTC_10x10_Format:()=>Tc,RGBA_ASTC_10x5_Format:()=>bc,RGBA_ASTC_10x6_Format:()=>Ec,RGBA_ASTC_10x8_Format:()=>wc,RGBA_ASTC_12x10_Format:()=>Ac,RGBA_ASTC_12x12_Format:()=>Rc,RGBA_ASTC_4x4_Format:()=>mc,RGBA_ASTC_5x4_Format:()=>gc,RGBA_ASTC_5x5_Format:()=>_c,RGBA_ASTC_6x5_Format:()=>xc,RGBA_ASTC_6x6_Format:()=>yc,RGBA_ASTC_8x5_Format:()=>vc,RGBA_ASTC_8x6_Format:()=>Sc,RGBA_ASTC_8x8_Format:()=>Mc,RGBA_BPTC_Format:()=>Cc,RGBA_ETC2_EAC_Format:()=>uc,RGBA_PVRTC_2BPPV1_Format:()=>lc,RGBA_PVRTC_4BPPV1_Format:()=>ac,RGBA_S3TC_DXT1_Format:()=>pa,RGBA_S3TC_DXT3_Format:()=>ma,RGBA_S3TC_DXT5_Format:()=>ga,RGBDepthPacking:()=>vg,RGBFormat:()=>rd,RGBIntegerFormat:()=>mg,RGB_BPTC_SIGNED_Format:()=>Pc,RGB_BPTC_UNSIGNED_Format:()=>Ic,RGB_ETC1_Format:()=>cc,RGB_ETC2_Format:()=>hc,RGB_PVRTC_2BPPV1_Format:()=>oc,RGB_PVRTC_4BPPV1_Format:()=>rc,RGB_S3TC_DXT1_Format:()=>fa,RGDepthPacking:()=>Sg,RGFormat:()=>Cs,RGIntegerFormat:()=>ic,RawShaderMaterial:()=>Yo,Ray:()=>Ui,Raycaster:()=>na,RectAreaLight:()=>Hl,RedFormat:()=>nc,RedIntegerFormat:()=>da,ReinhardToneMapping:()=>Zu,RenderObjectRefreshType:()=>jg,RenderTarget:()=>Do,RenderTarget3D:()=>vu,RepeatWrapping:()=>Vs,ReplaceStencilOp:()=>Tg,ReverseSubtractEquation:()=>Pf,RingGeometry:()=>bl,SIGNED_R11_EAC_Format:()=>fc,SIGNED_RED_GREEN_RGTC2_Format:()=>Uc,SIGNED_RED_RGTC1_Format:()=>Dc,SIGNED_RG11_EAC_Format:()=>pc,SRGBColorSpace:()=>Sn,SRGBTransfer:()=>Vt,Scene:()=>wr,ShaderChunk:()=>Mt,ShaderLib:()=>zn,ShaderMaterial:()=>bn,ShadowMaterial:()=>Al,Shape:()=>Qi,ShapeGeometry:()=>El,ShapePath:()=>Vu,ShapeUtils:()=>gi,ShortType:()=>td,Skeleton:()=>cl,SkeletonHelper:()=>Ru,SkinnedMesh:()=>ll,Source:()=>Hh,Sphere:()=>Kt,SphereGeometry:()=>hi,Spherical:()=>Gr,SphericalHarmonics3:()=>Qo,SplineCurve:()=>Go,SpotLight:()=>Bl,SpotLightHelper:()=>Au,Sprite:()=>Ar,SpriteMaterial:()=>Gs,SrcAlphaFactor:()=>Xu,SrcAlphaSaturateFactor:()=>Hf,SrcColorFactor:()=>Nf,StaticCopyUsage:()=>Wg,StaticDrawUsage:()=>Bc,StaticReadUsage:()=>Hg,StereoCamera:()=>pu,StreamCopyUsage:()=>Yg,StreamDrawUsage:()=>Vg,StreamReadUsage:()=>Gg,StringKeyframeTrack:()=>ts,SubtractEquation:()=>Cf,SubtractiveBlending:()=>Gu,TOUCH:()=>ws,TangentSpaceNormalMap:()=>ns,TetrahedronGeometry:()=>wl,Texture:()=>an,TextureLoader:()=>hu,TextureSource:()=>mi,TextureUtils:()=>Hu,Timer:()=>ql,TimestampQuery:()=>Zg,TorusGeometry:()=>Bi,TorusKnotGeometry:()=>Tl,Triangle:()=>Ii,TriangleFanDrawMode:()=>xg,TriangleStripDrawMode:()=>_g,TrianglesDrawMode:()=>gg,TubeGeometry:()=>zi,UVMapping:()=>jl,Uint16BufferAttribute:()=>Uo,Uint32BufferAttribute:()=>No,Uint8BufferAttribute:()=>Yh,Uint8ClampedBufferAttribute:()=>qh,Uniform:()=>Su,UniformsGroup:()=>Mu,UniformsLib:()=>Ae,UniformsUtils:()=>ya,UnsignedByteType:()=>$n,UnsignedInt101111Type:()=>id,UnsignedInt248Type:()=>Jr,UnsignedInt5999Type:()=>nd,UnsignedIntType:()=>di,UnsignedShort4444Type:()=>ec,UnsignedShort5551Type:()=>tc,UnsignedShortType:()=>Zr,VSMShadowMap:()=>Wr,Vector2:()=>re,Vector3:()=>E,Vector4:()=>Ct,VectorKeyframeTrack:()=>$o,VideoFrameTexture:()=>Qh,VideoTexture:()=>pl,WebGL3DRenderTarget:()=>Gh,WebGLArrayRenderTarget:()=>kh,WebGLCoordinateSystem:()=>ni,WebGLCubeRenderTarget:()=>Gc,WebGLRenderTarget:()=>Mn,WebGLRenderer:()=>Wc,WebGLUtils:()=>k0,WebGPUCoordinateSystem:()=>Hs,WebXRController:()=>Er,WireframeGeometry:()=>Nr,WrapAroundEnding:()=>Ro,ZeroCurvatureEnding:()=>Bs,ZeroFactor:()=>Df,ZeroSlopeEnding:()=>zs,ZeroStencilOp:()=>wg,createCanvasElement:()=>ap,error:()=>Je,getConsoleFunction:()=>t0,log:()=>Lo,setConsoleFunction:()=>e0,warn:()=>Ie,warnOnce:()=>Ki});var Ef="186",Es={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ws={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},wf=0,ku=1,Tf=2,lg=3,cg=0,ra=1,Af=2,Wr=3,Ts=0,Fn=1,ui=2,Hi=0,Xr=1,oa=2,Gu=3,Wu=4,Rf=5,hg=6,er=100,Cf=101,Pf=102,If=103,Lf=104,Df=200,Uf=201,Nf=202,Ff=203,Xu=204,Yu=205,Of=206,Bf=207,zf=208,Vf=209,Hf=210,kf=211,Gf=212,Wf=213,Xf=214,Ka=0,$a=1,ja=2,yr=3,Qa=4,el=5,tl=6,nl=7,aa=0,Yf=1,qf=2,yi=0,qu=1,Zu=2,Ju=3,la=4,Ku=5,$u=6,ju=7,zh="attached",Zf="detached",jl=300,ki=301,As=302,ca=303,ha=304,Yr=306,Vs=1e3,Yn=1001,To=1002,on=1003,Qu=1004,ug=1004,qr=1005,dg=1005,qt=1006,ua=1007,fg=1007,Gi=1008,pg=1008,$n=1009,ed=1010,td=1011,Zr=1012,Ql=1013,di=1014,Dn=1015,vi=1016,ec=1017,tc=1018,Jr=1020,nd=35902,id=35899,sd=1021,rd=1022,Un=1023,Di=1026,Rs=1027,nc=1028,da=1029,Cs=1030,ic=1031,mg=1032,sc=1033,fa=33776,pa=33777,ma=33778,ga=33779,rc=35840,oc=35841,ac=35842,lc=35843,cc=36196,hc=37492,uc=37496,dc=37488,fc=37489,_a=37490,pc=37491,mc=37808,gc=37809,_c=37810,xc=37811,yc=37812,vc=37813,Sc=37814,Mc=37815,bc=37816,Ec=37817,wc=37818,Tc=37819,Ac=37820,Rc=37821,Cc=36492,Pc=36494,Ic=36495,Lc=36283,Dc=36284,xa=36285,Uc=36286,Jf=2200,Kf=2201,$f=2202,Ao=2300,il=2301,Wa=2302,Vh=2303,Bs=2400,zs=2401,Ro=2402,Nc=2500,od=2501,gg=0,_g=1,xg=2,jf=3200,yg=3201,vg=3202,Sg=3203,ns=0,Qf=1,is="",Sn="srgb",Co="srgb-linear",Po="linear",Vt="srgb",Mg="",bg="rg",Eg="ga",wg=0,Xa=7680,Tg=7681,Ag=7682,Rg=7683,Cg=34055,Pg=34056,Ig=5386,Lg=512,Dg=513,Ug=514,Ng=515,Fg=516,Og=517,Bg=518,ep=519,tp=512,np=513,ip=514,Fc=515,sp=516,rp=517,Oc=518,op=519,Bc=35044,zg=35048,Vg=35040,Hg=35045,kg=35049,Gg=35041,Wg=35046,Xg=35050,Yg=35042,qg="100",ad="300 es",ni=2e3,Hs=2001,Zg={COMPUTE:"compute",RENDER:"render"},Jg={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},Kg={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},$g={TEXTURE_COMPARE:"depthTextureCompare"},jg={NONE:0,SHARED:1,FULL:2};function p_(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}var m_={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function Eo(s,e){return new m_[s](e)}function Qg(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Io(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function ap(){let s=Io("canvas");return s.style.display="block",s}var $p={},ks=null;function e0(s){ks=s}function t0(){return ks}function Lo(...s){let e="THREE."+s.shift();ks?ks("log",e,...s):console.log(e,...s)}function n0(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ie(...s){s=n0(s);let e="THREE."+s.shift();if(ks)ks("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function Je(...s){s=n0(s);let e="THREE."+s.shift();if(ks)ks("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function Ki(...s){let e=s.join(" ");e in $p||($p[e]=!0,Ie(...s))}function i0(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var s0={[Ka]:$a,[ja]:tl,[Qa]:nl,[yr]:el,[$a]:Ka,[tl]:ja,[nl]:Qa,[el]:yr},ii=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},Pn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],jp=1234567,xr=Math.PI/180,vr=180/Math.PI;function ci(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Pn[s&255]+Pn[s>>8&255]+Pn[s>>16&255]+Pn[s>>24&255]+"-"+Pn[e&255]+Pn[e>>8&255]+"-"+Pn[e>>16&15|64]+Pn[e>>24&255]+"-"+Pn[t&63|128]+Pn[t>>8&255]+"-"+Pn[t>>16&255]+Pn[t>>24&255]+Pn[n&255]+Pn[n>>8&255]+Pn[n>>16&255]+Pn[n>>24&255]).toLowerCase()}function ut(s,e,t){return Math.max(e,Math.min(t,s))}function lp(s,e){return(s%e+e)%e}function g_(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function __(s,e,t){return s!==e?(t-s)/(e-s):0}function Ya(s,e,t){return(1-t)*s+t*e}function x_(s,e,t,n){return Ya(s,e,1-Math.exp(-t*n))}function y_(s,e=1){return e-Math.abs(lp(s,e*2)-e)}function v_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function S_(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function M_(s,e){return s+Math.floor(Math.random()*(e-s+1))}function b_(s,e){return s+Math.random()*(e-s)}function E_(s){return s*(.5-Math.random())}function w_(s){s!==void 0&&(jp=s);let e=jp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function T_(s){return s*xr}function A_(s){return s*vr}function R_(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function C_(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function P_(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function I_(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),p=o((n-e)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*p,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*p,a*c);break;case"ZYZ":s.set(l*p,l*f,a*h,a*c);break;default:Ie("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Xn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function vt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var On={DEG2RAD:xr,RAD2DEG:vr,generateUUID:ci,clamp:ut,euclideanModulo:lp,mapLinear:g_,inverseLerp:__,lerp:Ya,damp:x_,pingpong:y_,smoothstep:v_,smootherstep:S_,randInt:M_,randFloat:b_,randFloatSpread:E_,seededRandom:w_,degToRad:T_,radToDeg:A_,isPowerOfTwo:R_,ceilPowerOfTwo:C_,floorPowerOfTwo:P_,setQuaternionFromProperEuler:I_,normalize:vt,denormalize:Xn},re=class s{static{s.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},hn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],f=r[o+1],p=r[o+2],_=r[o+3];if(u!==_||l!==d||c!==f||h!==p){let g=l*d+c*f+h*p+u*_;g<0&&(d=-d,f=-f,p=-p,_=-_,g=-g);let m=1-a;if(g<.9995){let x=Math.acos(g),w=Math.sin(x);m=Math.sin(m*x)/w,a=Math.sin(a*x)/w,l=l*m+d*a,c=c*m+f*a,h=h*m+p*a,u=u*m+_*a}else{l=l*m+d*a,c=c*m+f*a,h=h*m+p*a,u=u*m+_*a;let x=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=x,c*=x,h*=x,u*=x}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],p=r[o+3];return e[t]=a*p+h*u+l*f-c*d,e[t+1]=l*p+h*d+c*u-a*f,e[t+2]=c*p+h*f+a*d-l*u,e[t+3]=h*p-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),p=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u+d*f*p;break;case"YZX":this._x=d*h*u+c*f*p,this._y=c*f*u+d*h*p,this._z=c*h*p-d*f*u,this._w=c*h*u-d*f*p;break;case"XZY":this._x=d*h*u-c*f*p,this._y=c*f*u-d*h*p,this._z=c*h*p+d*f*u,this._w=c*h*u+d*f*p;break;default:Ie("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ut(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,i=-i,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},E=class s{static{s.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Cd.copy(this).projectOnVector(e),this.sub(Cd)}reflect(e){return this.sub(Cd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Cd=new E,Qp=new hn,gt=class s{static{s.prototype.isMatrix3=!0}constructor(e,t,n,i,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],_=i[0],g=i[3],m=i[6],x=i[1],w=i[4],y=i[7],A=i[2],T=i[5],L=i[8];return r[0]=o*_+a*x+l*A,r[3]=o*g+a*w+l*T,r[6]=o*m+a*y+l*L,r[1]=c*_+h*x+u*A,r[4]=c*g+h*w+u*T,r[7]=c*m+h*y+u*L,r[2]=d*_+f*x+p*A,r[5]=d*g+f*w+p*T,r[8]=d*m+f*y+p*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,p=t*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-a*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return Ki("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Pd.makeScale(e,t)),this}rotate(e){return Ki("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Pd.makeRotation(-e)),this}translate(e,t){return Ki("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Pd.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Pd=new gt,em=new gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),tm=new gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function L_(){let s={enabled:!0,workingColorSpace:Co,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Vt&&(i.r=_s(i.r),i.g=_s(i.g),i.b=_s(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Vt&&(i.r=wo(i.r),i.g=wo(i.g),i.b=wo(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===is?Po:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Ki("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Ki("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Co]:{primaries:e,whitePoint:n,transfer:Po,toXYZ:em,fromXYZ:tm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Sn},outputColorSpaceConfig:{drawingBufferColorSpace:Sn}},[Sn]:{primaries:e,whitePoint:n,transfer:Vt,toXYZ:em,fromXYZ:tm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Sn}}}),s}var Tt=L_();function _s(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function wo(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var io,sl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{io===void 0&&(io=Io("canvas")),io.width=e.width,io.height=e.height;let i=io.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=io}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Io("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=_s(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(_s(t[n]/255)*255):t[n]=_s(t[n]);return{data:t,width:e.width,height:e.height}}else return Ie("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},D_=0,mi=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:D_++}),this.uuid=ci(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Id(i[o].image)):r.push(Id(i[o]))}else r=Id(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function Id(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?sl.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ie("Texture: Unable to serialize Texture."),{})}var Hh=class extends mi{constructor(e=null){Ki('Source: "Source" has been renamed to "TextureSource". Please update your code to use "THREE.TextureSource" instead.'),super(e),this.isSource=!0}},U_=0,Ld=new E,an=class s extends ii{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Yn,i=Yn,r=qt,o=Gi,a=Un,l=$n,c=s.DEFAULT_ANISOTROPY,h=is){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:U_++}),this.uuid=ci(),this.name="",this.source=new mi(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new re(0,0),this.repeat=new re(1,1),this.center=new re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ld).x}get height(){return this.source.getSize(Ld).y}get depth(){return this.source.getSize(Ld).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Ie(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Ie(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Vs:e.x=e.x-Math.floor(e.x);break;case Yn:e.x=e.x<0?0:1;break;case To:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Vs:e.y=e.y-Math.floor(e.y);break;case Yn:e.y=e.y<0?0:1;break;case To:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};an.DEFAULT_IMAGE=null;an.DEFAULT_MAPPING=jl;an.DEFAULT_ANISOTROPY=1;var Ct=class s{static{s.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let w=(c+1)/2,y=(f+1)/2,A=(m+1)/2,T=(h+d)/4,L=(u+_)/4,v=(p+g)/4;return w>y&&w>A?w<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(w),i=T/n,r=L/n):y>A?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=T/i,r=v/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=L/r,i=v/r),this.set(n,i,r,t),this}let x=Math.sqrt((g-p)*(g-p)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(g-p)/x,this.y=(u-_)/x,this.z=(d-h)/x,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ut(this.x,e.x,t.x),this.y=ut(this.y,e.y,t.y),this.z=ut(this.z,e.z,t.z),this.w=ut(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ut(this.x,e,t),this.y=ut(this.y,e,t),this.z=ut(this.z,e,t),this.w=ut(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ut(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Do=class extends ii{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:qt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ct(0,0,e,t),this.scissorTest=!1,this.viewport=new Ct(0,0,e,t),this.textures=[];let i={width:e,height:t,depth:n.depth},r=new an(i),o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:qt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new mi(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Mn=class extends Do{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Sr=class extends an{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=on,this.minFilter=on,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},kh=class extends Mn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Sr(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},Mr=class extends an{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=on,this.minFilter=on,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Gh=class extends Mn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new Mr(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},ct=class s{static{s.prototype.isMatrix4=!0}constructor(e,t,n,i,r,o,a,l,c,h,u,d,f,p,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,h,u,d,f,p,_,g)}set(e,t,n,i,r,o,a,l,c,h,u,d,f,p,_,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/so.setFromMatrixColumn(e,0).length(),r=1/so.setFromMatrixColumn(e,1).length(),o=1/so.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,p=a*h,_=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+p*c,t[5]=d-_*c,t[9]=-a*l,t[2]=_-d*c,t[6]=p+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,p=c*h,_=c*u;t[0]=d+_*a,t[4]=p*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-p,t[6]=_+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,p=c*h,_=c*u;t[0]=d-_*a,t[4]=-o*u,t[8]=p+f*a,t[1]=f+p*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*h,f=o*u,p=a*h,_=a*u;t[0]=l*h,t[4]=p*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-p,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,p=a*l,_=a*c;t[0]=l*h,t[4]=_-d*u,t[8]=p*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+p,t[10]=d-_*u}else if(e.order==="XZY"){let d=o*l,f=o*c,p=a*l,_=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-p,t[2]=p*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(N_,e,F_)}lookAt(e,t,n){let i=this.elements;return ai.subVectors(e,t),ai.lengthSq()===0&&(ai.z=1),ai.normalize(),Ls.crossVectors(n,ai),Ls.lengthSq()===0&&(Math.abs(n.z)===1?ai.x+=1e-4:ai.z+=1e-4,ai.normalize(),Ls.crossVectors(n,ai)),Ls.normalize(),Kc.crossVectors(ai,Ls),i[0]=Ls.x,i[4]=Kc.x,i[8]=ai.x,i[1]=Ls.y,i[5]=Kc.y,i[9]=ai.y,i[2]=Ls.z,i[6]=Kc.z,i[10]=ai.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],x=n[3],w=n[7],y=n[11],A=n[15],T=i[0],L=i[4],v=i[8],R=i[12],I=i[1],B=i[5],k=i[9],X=i[13],U=i[2],z=i[6],V=i[10],G=i[14],Q=i[3],Y=i[7],j=i[11],ie=i[15];return r[0]=o*T+a*I+l*U+c*Q,r[4]=o*L+a*B+l*z+c*Y,r[8]=o*v+a*k+l*V+c*j,r[12]=o*R+a*X+l*G+c*ie,r[1]=h*T+u*I+d*U+f*Q,r[5]=h*L+u*B+d*z+f*Y,r[9]=h*v+u*k+d*V+f*j,r[13]=h*R+u*X+d*G+f*ie,r[2]=p*T+_*I+g*U+m*Q,r[6]=p*L+_*B+g*z+m*Y,r[10]=p*v+_*k+g*V+m*j,r[14]=p*R+_*X+g*G+m*ie,r[3]=x*T+w*I+y*U+A*Q,r[7]=x*L+w*B+y*z+A*Y,r[11]=x*v+w*k+y*V+A*j,r[15]=x*R+w*X+y*G+A*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15],x=l*f-c*d,w=a*f-c*u,y=a*d-l*u,A=o*f-c*h,T=o*d-l*h,L=o*u-a*h;return t*(_*x-g*w+m*y)-n*(p*x-g*A+m*T)+i*(p*w-_*A+m*L)-r*(p*y-_*T+g*L)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],h=e[10];return t*(o*h-a*c)-n*(r*h-a*l)+i*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],x=t*a-n*o,w=t*l-i*o,y=t*c-r*o,A=n*l-i*a,T=n*c-r*a,L=i*c-r*l,v=h*_-u*p,R=h*g-d*p,I=h*m-f*p,B=u*g-d*_,k=u*m-f*_,X=d*m-f*g,U=x*X-w*k+y*B+A*I-T*R+L*v;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let z=1/U;return e[0]=(a*X-l*k+c*B)*z,e[1]=(i*k-n*X-r*B)*z,e[2]=(_*L-g*T+m*A)*z,e[3]=(d*T-u*L-f*A)*z,e[4]=(l*I-o*X-c*R)*z,e[5]=(t*X-i*I+r*R)*z,e[6]=(g*y-p*L-m*w)*z,e[7]=(h*L-d*y+f*w)*z,e[8]=(o*k-a*I+c*v)*z,e[9]=(n*I-t*k-r*v)*z,e[10]=(p*T-_*y+m*x)*z,e[11]=(u*y-h*T-f*x)*z,e[12]=(a*R-o*B-l*v)*z,e[13]=(t*B-n*R+i*v)*z,e[14]=(_*w-p*A-g*x)*z,e[15]=(h*A-u*w+d*x)*z,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,p=r*u,_=o*h,g=o*u,m=a*u,x=l*c,w=l*h,y=l*u,A=n.x,T=n.y,L=n.z;return i[0]=(1-(_+m))*A,i[1]=(f+y)*A,i[2]=(p-w)*A,i[3]=0,i[4]=(f-y)*T,i[5]=(1-(d+m))*T,i[6]=(g+x)*T,i[7]=0,i[8]=(p+w)*L,i[9]=(g-x)*L,i[10]=(1-(d+_))*L,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=so.set(i[0],i[1],i[2]).length(),a=so.set(i[4],i[5],i[6]).length(),l=so.set(i[8],i[9],i[10]).length();r<0&&(o=-o),Ai.copy(this);let c=1/o,h=1/a,u=1/l;return Ai.elements[0]*=c,Ai.elements[1]*=c,Ai.elements[2]*=c,Ai.elements[4]*=h,Ai.elements[5]*=h,Ai.elements[6]*=h,Ai.elements[8]*=u,Ai.elements[9]*=u,Ai.elements[10]*=u,t.setFromRotationMatrix(Ai),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,i,r,o,a=ni,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),p,_;if(l)p=r/(o-r),_=o*r/(o-r);else if(a===ni)p=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Hs)p=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=ni,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),p,_;if(l)p=1/(o-r),_=o/(o-r);else if(a===ni)p=-2/(o-r),_=-(o+r)/(o-r);else if(a===Hs)p=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},so=new E,Ai=new ct,N_=new E(0,0,0),F_=new E(1,1,1),Ls=new E,Kc=new E,ai=new E,nm=new ct,im=new hn,_i=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(ut(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ut(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ie("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return nm.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nm,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return im.setFromEuler(this),this.setFromQuaternion(im,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};_i.DEFAULT_ORDER="XYZ";var br=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},O_=0,sm=new E,ro=new hn,hs=new ct,$c=new E,Pa=new E,B_=new E,z_=new hn,rm=new E(1,0,0),om=new E(0,1,0),am=new E(0,0,1),lm={type:"added"},V_={type:"removed"},oo={type:"childadded",child:null},Dd={type:"childremoved",child:null},Ut=class s extends ii{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:O_++}),this.uuid=ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new E,t=new _i,n=new hn,i=new E(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ct},normalMatrix:{value:new gt}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new br,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ro.setFromAxisAngle(e,t),this.quaternion.multiply(ro),this}rotateOnWorldAxis(e,t){return ro.setFromAxisAngle(e,t),this.quaternion.premultiply(ro),this}rotateX(e){return this.rotateOnAxis(rm,e)}rotateY(e){return this.rotateOnAxis(om,e)}rotateZ(e){return this.rotateOnAxis(am,e)}translateOnAxis(e,t){return sm.copy(e).applyQuaternion(this.quaternion),this.position.add(sm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(rm,e)}translateY(e){return this.translateOnAxis(om,e)}translateZ(e){return this.translateOnAxis(am,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hs.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?$c.copy(e):$c.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Pa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hs.lookAt(Pa,$c,this.up):hs.lookAt($c,Pa,this.up),this.quaternion.setFromRotationMatrix(hs),i&&(hs.extractRotation(i.matrixWorld),ro.setFromRotationMatrix(hs),this.quaternion.premultiply(ro.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(lm),oo.child=e,this.dispatchEvent(oo),oo.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(V_),Dd.child=e,this.dispatchEvent(Dd),Dd.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hs.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hs.multiply(e.parent.matrixWorld)),e.applyMatrix4(hs),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(lm),oo.child=e,this.dispatchEvent(oo),oo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pa,e,B_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pa,z_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),p=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ut.DEFAULT_UP=new E(0,1,0);Ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var fn=class extends Ut{constructor(){super(),this.isGroup=!0,this.type="Group"}},H_={type:"move"},Er=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;c.inputState.pinching&&d>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(H_)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new fn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},r0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ds={h:0,s:0,l:0},jc={h:0,s:0,l:0};function Ud(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var Oe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Sn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Tt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Tt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Tt.workingColorSpace){if(e=lp(e,1),t=ut(t,0,1),n=ut(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Ud(o,r,e+1/3),this.g=Ud(o,r,e),this.b=Ud(o,r,e-1/3)}return Tt.colorSpaceToWorking(this,i),this}setStyle(e,t=Sn){function n(r){r!==void 0&&parseFloat(r)<1&&Ie("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ie("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);Ie("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Sn){let n=r0[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ie("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_s(e.r),this.g=_s(e.g),this.b=_s(e.b),this}copyLinearToSRGB(e){return this.r=wo(e.r),this.g=wo(e.g),this.b=wo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Sn){return Tt.workingToColorSpace(In.copy(this),e),Math.round(ut(In.r*255,0,255))*65536+Math.round(ut(In.g*255,0,255))*256+Math.round(ut(In.b*255,0,255))}getHexString(e=Sn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Tt.workingColorSpace){Tt.workingToColorSpace(In.copy(this),t);let n=In.r,i=In.g,r=In.b,o=Math.max(n,i,r),a=Math.min(n,i,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Tt.workingColorSpace){return Tt.workingToColorSpace(In.copy(this),t),e.r=In.r,e.g=In.g,e.b=In.b,e}getStyle(e=Sn){Tt.workingToColorSpace(In.copy(this),e);let t=In.r,n=In.g,i=In.b;return e!==Sn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Ds),this.setHSL(Ds.h+e,Ds.s+t,Ds.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ds),e.getHSL(jc);let n=Ya(Ds.h,jc.h,t),i=Ya(Ds.s,jc.s,t),r=Ya(Ds.l,jc.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},In=new Oe;Oe.NAMES=r0;var rl=class s{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Oe(e),this.density=t}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}},ol=class s{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Oe(e),this.near=t,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},wr=class extends Ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _i,this.environmentIntensity=1,this.environmentRotation=new _i,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Ri=new E,us=new E,Nd=new E,ds=new E,ao=new E,lo=new E,cm=new E,Fd=new E,Od=new E,Bd=new E,zd=new Ct,Vd=new Ct,Hd=new Ct,Ii=class s{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Ri.subVectors(e,t),i.cross(Ri);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Ri.subVectors(i,t),us.subVectors(n,t),Nd.subVectors(e,t);let o=Ri.dot(Ri),a=Ri.dot(us),l=Ri.dot(Nd),c=us.dot(us),h=us.dot(Nd),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,p=(o*h-a*l)*d;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ds)===null?!1:ds.x>=0&&ds.y>=0&&ds.x+ds.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,ds)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ds.x),l.addScaledVector(o,ds.y),l.addScaledVector(a,ds.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return zd.setScalar(0),Vd.setScalar(0),Hd.setScalar(0),zd.fromBufferAttribute(e,t),Vd.fromBufferAttribute(e,n),Hd.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(zd,r.x),o.addScaledVector(Vd,r.y),o.addScaledVector(Hd,r.z),o}static isFrontFacing(e,t,n,i){return Ri.subVectors(n,t),us.subVectors(e,t),Ri.cross(us).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Ri.subVectors(this.c,this.b),us.subVectors(this.a,this.b),Ri.cross(us).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;ao.subVectors(i,n),lo.subVectors(r,n),Fd.subVectors(e,n);let l=ao.dot(Fd),c=lo.dot(Fd);if(l<=0&&c<=0)return t.copy(n);Od.subVectors(e,i);let h=ao.dot(Od),u=lo.dot(Od);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(ao,o);Bd.subVectors(e,r);let f=ao.dot(Bd),p=lo.dot(Bd);if(p>=0&&f<=p)return t.copy(r);let _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return a=c/(c-p),t.copy(n).addScaledVector(lo,a);let g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return cm.subVectors(r,i),a=(u-h)/(u-h+(f-p)),t.copy(i).addScaledVector(cm,a);let m=1/(g+_+d);return o=_*m,a=d*m,t.copy(n).addScaledVector(ao,o).addScaledVector(lo,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Jt=class{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ci.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ci.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Ci.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ci):Ci.fromBufferAttribute(r,o),Ci.applyMatrix4(e.matrixWorld),this.expandByPoint(Ci);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qc.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Qc.copy(n.boundingBox)),Qc.applyMatrix4(e.matrixWorld),this.union(Qc)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ci),Ci.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ia),eh.subVectors(this.max,Ia),co.subVectors(e.a,Ia),ho.subVectors(e.b,Ia),uo.subVectors(e.c,Ia),Us.subVectors(ho,co),Ns.subVectors(uo,ho),or.subVectors(co,uo);let t=[0,-Us.z,Us.y,0,-Ns.z,Ns.y,0,-or.z,or.y,Us.z,0,-Us.x,Ns.z,0,-Ns.x,or.z,0,-or.x,-Us.y,Us.x,0,-Ns.y,Ns.x,0,-or.y,or.x,0];return!kd(t,co,ho,uo,eh)||(t=[1,0,0,0,1,0,0,0,1],!kd(t,co,ho,uo,eh))?!1:(th.crossVectors(Us,Ns),t=[th.x,th.y,th.z],kd(t,co,ho,uo,eh))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ci).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ci).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(fs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),fs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),fs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),fs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),fs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),fs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),fs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),fs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(fs),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},fs=[new E,new E,new E,new E,new E,new E,new E,new E],Ci=new E,Qc=new Jt,co=new E,ho=new E,uo=new E,Us=new E,Ns=new E,or=new E,Ia=new E,eh=new E,th=new E,ar=new E;function kd(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ar.fromArray(s,r);let a=i.x*Math.abs(ar.x)+i.y*Math.abs(ar.y)+i.z*Math.abs(ar.z),l=e.dot(ar),c=t.dot(ar),h=n.dot(ar);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var gs=k_();function k_(){let s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}let r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)o[l]=l<<23;o[31]=1199570944,o[32]=2147483648;for(let l=33;l<63;++l)o[l]=2147483648+(l-32<<23);o[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(a[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function ei(s){Math.abs(s)>65504&&Ie("DataUtils.toHalfFloat(): Value out of range."),s=ut(s,-65504,65504),gs.floatView[0]=s;let e=gs.uint32View[0],t=e>>23&511;return gs.baseTable[t]+((e&8388607)>>gs.shiftTable[t])}function ka(s){let e=s>>10;return gs.uint32View[0]=gs.mantissaTable[gs.offsetTable[e]+(s&1023)]+gs.exponentTable[e],gs.floatView[0]}var Wh=class{static toHalfFloat(e){return ei(e)}static fromHalfFloat(e){return ka(e)}},dn=new E,nh=new re,G_=0,Wt=class extends ii{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:G_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Bc,this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)nh.fromBufferAttribute(this,t),nh.applyMatrix3(e),this.setXY(t,nh.x,nh.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)dn.fromBufferAttribute(this,t),dn.applyMatrix3(e),this.setXYZ(t,dn.x,dn.y,dn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)dn.fromBufferAttribute(this,t),dn.applyMatrix4(e),this.setXYZ(t,dn.x,dn.y,dn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)dn.fromBufferAttribute(this,t),dn.applyNormalMatrix(e),this.setXYZ(t,dn.x,dn.y,dn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)dn.fromBufferAttribute(this,t),dn.transformDirection(e),this.setXYZ(t,dn.x,dn.y,dn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Xn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=vt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Xn(t,this.array)),t}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Xn(t,this.array)),t}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Xn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Xn(t,this.array)),t}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),i=vt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),i=vt(i,this.array),r=vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}},Xh=class extends Wt{constructor(e,t,n){super(new Int8Array(e),t,n)}},Yh=class extends Wt{constructor(e,t,n){super(new Uint8Array(e),t,n)}},qh=class extends Wt{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}},Zh=class extends Wt{constructor(e,t,n){super(new Int16Array(e),t,n)}},Uo=class extends Wt{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Jh=class extends Wt{constructor(e,t,n){super(new Int32Array(e),t,n)}},No=class extends Wt{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Kh=class extends Wt{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=ka(this.array[e*this.itemSize]);return this.normalized&&(t=Xn(t,this.array)),t}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize]=ei(t),this}getY(e){let t=ka(this.array[e*this.itemSize+1]);return this.normalized&&(t=Xn(t,this.array)),t}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+1]=ei(t),this}getZ(e){let t=ka(this.array[e*this.itemSize+2]);return this.normalized&&(t=Xn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+2]=ei(t),this}getW(e){let t=ka(this.array[e*this.itemSize+3]);return this.normalized&&(t=Xn(t,this.array)),t}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.array[e*this.itemSize+3]=ei(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array)),this.array[e+0]=ei(t),this.array[e+1]=ei(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),i=vt(i,this.array)),this.array[e+0]=ei(t),this.array[e+1]=ei(n),this.array[e+2]=ei(i),this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),i=vt(i,this.array),r=vt(r,this.array)),this.array[e+0]=ei(t),this.array[e+1]=ei(n),this.array[e+2]=ei(i),this.array[e+3]=ei(r),this}},Be=class extends Wt{constructor(e,t,n){super(new Float32Array(e),t,n)}},W_=new Jt,La=new E,Gd=new E,Kt=class{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):W_.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;La.subVectors(e,this.center);let t=La.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(La,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Gd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(La.copy(e.center).add(Gd)),this.expandByPoint(La.copy(e.center).sub(Gd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},X_=0,pi=new ct,Wd=new Ut,fo=new E,li=new Jt,Da=new Jt,vn=new E,_t=class s extends ii{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:X_++}),this.uuid=ci(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(p_(e)?No:Uo)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new gt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return pi.makeRotationFromQuaternion(e),this.applyMatrix4(pi),this}rotateX(e){return pi.makeRotationX(e),this.applyMatrix4(pi),this}rotateY(e){return pi.makeRotationY(e),this.applyMatrix4(pi),this}rotateZ(e){return pi.makeRotationZ(e),this.applyMatrix4(pi),this}translate(e,t,n){return pi.makeTranslation(e,t,n),this.applyMatrix4(pi),this}scale(e,t,n){return pi.makeScale(e,t,n),this.applyMatrix4(pi),this}lookAt(e){return Wd.lookAt(e),Wd.updateMatrix(),this.applyMatrix4(Wd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fo).negate(),this.translate(fo.x,fo.y,fo.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Be(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Ie("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];li.setFromBufferAttribute(r),this.morphTargetsRelative?(vn.addVectors(this.boundingBox.min,li.min),this.boundingBox.expandByPoint(vn),vn.addVectors(this.boundingBox.max,li.max),this.boundingBox.expandByPoint(vn)):(this.boundingBox.expandByPoint(li.min),this.boundingBox.expandByPoint(li.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Kt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(e){let n=this.boundingSphere.center;if(li.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Da.setFromBufferAttribute(a),this.morphTargetsRelative?(vn.addVectors(li.min,Da.min),li.expandByPoint(vn),vn.addVectors(li.max,Da.max),li.expandByPoint(vn)):(li.expandByPoint(Da.min),li.expandByPoint(Da.max))}li.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)vn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(vn));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)vn.fromBufferAttribute(a,c),l&&(fo.fromBufferAttribute(e,c),vn.add(fo)),i=Math.max(i,n.distanceToSquared(vn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new Wt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[];for(let v=0;v<n.count;v++)a[v]=new E,l[v]=new E;let c=new E,h=new E,u=new E,d=new re,f=new re,p=new re,_=new E,g=new E;function m(v,R,I){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,R),u.fromBufferAttribute(n,I),d.fromBufferAttribute(r,v),f.fromBufferAttribute(r,R),p.fromBufferAttribute(r,I),h.sub(c),u.sub(c),f.sub(d),p.sub(d);let B=1/(f.x*p.y-p.x*f.y);isFinite(B)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(B),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(B),a[v].add(_),a[R].add(_),a[I].add(_),l[v].add(g),l[R].add(g),l[I].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let v=0,R=x.length;v<R;++v){let I=x[v],B=I.start,k=I.count;for(let X=B,U=B+k;X<U;X+=3)m(e.getX(X+0),e.getX(X+1),e.getX(X+2))}let w=new E,y=new E,A=new E,T=new E;function L(v){A.fromBufferAttribute(i,v),T.copy(A);let R=a[v];w.copy(R),w.sub(A.multiplyScalar(A.dot(R))).normalize(),y.crossVectors(T,R);let B=y.dot(l[v])<0?-1:1;o.setXYZW(v,w.x,w.y,w.z,B)}for(let v=0,R=x.length;v<R;++v){let I=x[v],B=I.start,k=I.count;for(let X=B,U=B+k;X<U;X+=3)L(e.getX(X+0)),L(e.getX(X+1)),L(e.getX(X+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Wt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new E,r=new E,o=new E,a=new E,l=new E,c=new E,h=new E,u=new E;if(e)for(let d=0,f=e.count;d<f;d+=3){let p=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)vn.fromBufferAttribute(e,t),vn.normalize(),e.setXYZ(t,vn.x,vn.y,vn.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,p=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let m=0;m<h;m++)d[p++]=c[f++]}return new Wt(d,h,u)}if(this.index===null)return Ie("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let l=i[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Tr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Bc,this.updateRanges=[],this.version=0,this.uuid=ci()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ci()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ci()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Wn=new E,Nn=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Wn.fromBufferAttribute(this,t),Wn.applyMatrix4(e),this.setXYZ(t,Wn.x,Wn.y,Wn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Wn.fromBufferAttribute(this,t),Wn.applyNormalMatrix(e),this.setXYZ(t,Wn.x,Wn.y,Wn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Wn.fromBufferAttribute(this,t),Wn.transformDirection(e),this.setXYZ(t,Wn.x,Wn.y,Wn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Xn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=vt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=vt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Xn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Xn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Xn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Xn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),i=vt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=vt(t,this.array),n=vt(n,this.array),i=vt(i,this.array),r=vt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Lo("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Wt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Lo("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Xd=new E,Y_=new E,q_=new gt,ti=class{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Xd.subVectors(n,t).cross(Y_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(Xd),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(i,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||q_.getNormalMatrix(e),i=this.coplanarPoint(Xd).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Z_=0,pn=class extends ii{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Z_++}),this.uuid=ci(),this.name="",this.type="Material",this.blending=Xr,this.side=Ts,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xu,this.blendDst=Yu,this.blendEquation=er,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=yr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ep,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xa,this.stencilZFail=Xa,this.stencilZPass=Xa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Ie(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Ie(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Oe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new ti().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new re().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new re().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Gs=class extends pn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},po,Ua=new E,mo=new E,go=new E,_o=new re,Na=new re,o0=new ct,ih=new E,Fa=new E,sh=new E,hm=new re,Yd=new re,um=new re,Ar=class extends Ut{constructor(e=new Gs){if(super(),this.isSprite=!0,this.type="Sprite",po===void 0){po=new _t;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Tr(t,5);po.setIndex([0,1,2,0,2,3]),po.setAttribute("position",new Nn(n,3,0,!1)),po.setAttribute("uv",new Nn(n,2,3,!1))}this.geometry=po,this.material=e,this.center=new re(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Je('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),mo.setFromMatrixScale(this.matrixWorld),o0.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),go.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&mo.multiplyScalar(-go.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;rh(ih.set(-.5,-.5,0),go,o,mo,i,r),rh(Fa.set(.5,-.5,0),go,o,mo,i,r),rh(sh.set(.5,.5,0),go,o,mo,i,r),hm.set(0,0),Yd.set(1,0),um.set(1,1);let a=e.ray.intersectTriangle(ih,Fa,sh,!1,Ua);if(a===null&&(rh(Fa.set(-.5,.5,0),go,o,mo,i,r),Yd.set(0,1),a=e.ray.intersectTriangle(ih,sh,Fa,!1,Ua),a===null))return;let l=e.ray.origin.distanceTo(Ua);l<e.near||l>e.far||t.push({distance:l,point:Ua.clone(),uv:Ii.getInterpolation(Ua,ih,Fa,sh,hm,Yd,um,new re),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function rh(s,e,t,n,i,r){_o.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Na.x=r*_o.x-i*_o.y,Na.y=i*_o.x+r*_o.y):Na.copy(_o),s.copy(e),s.x+=Na.x,s.y+=Na.y,s.applyMatrix4(o0)}var oh=new E,dm=new E,al=class extends Ut{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);let t=e.levels;for(let n=0,i=t.length;n<i;n++){let r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);let i=this.levels,r;for(r=0;r<i.length&&!(t<i[r].distance);r++);return i.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){let t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){let i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){let t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){oh.setFromMatrixPosition(this.matrixWorld);let i=e.ray.origin.distanceTo(oh);this.getObjectForDistance(i).raycast(e,t)}}update(e){let t=this.levels;if(t.length>1){oh.setFromMatrixPosition(e.matrixWorld),dm.setFromMatrixPosition(this.matrixWorld);let n=oh.distanceTo(dm)/e.zoom;t[0].object.visible=!0;let i,r;for(i=1,r=t.length;i<r;i++){let o=t[i].distance;if(t[i].object.visible&&(o-=o*t[i].hysteresis),n>=o)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)t[i].object.visible=!1}}toJSON(e){let t=super.toJSON(e);t.object.autoUpdate=this.autoUpdate,t.object.levels=[];let n=this.levels;for(let i=0,r=n.length;i<r;i++){let o=n[i];t.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return t}},ps=new E,qd=new E,ah=new E,lh=new E,Ui=class{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ps)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ps.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ps.copy(this.origin).addScaledVector(this.direction,t),ps.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){qd.copy(e).add(t).multiplyScalar(.5),ah.copy(t).sub(e).normalize(),lh.copy(this.origin).sub(qd);let r=e.distanceTo(t)*.5,o=-this.direction.dot(ah),a=lh.dot(this.direction),l=-lh.dot(ah),c=lh.lengthSq(),h=Math.abs(1-o*o),u,d,f,p;if(h>0)if(u=o*l-a,d=o*a-l,p=r*h,u>=0)if(d>=-p)if(d<=p){let _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-p?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=p?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(qd).addScaledVector(ah,d),f}intersectSphere(e,t){if(e.radius<0)return null;ps.subVectors(e.center,this.origin);let n=ps.dot(this.direction),i=ps.dot(ps)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ps)!==null}intersectTriangle(e,t,n,i,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,u=e.x-o.x,d=e.y-o.y,f=e.z-o.z,p=t.x-o.x,_=t.y-o.y,g=t.z-o.z,m=n.x-o.x,x=n.y-o.y,w=n.z-o.z,y=Math.abs(l),A=Math.abs(c),T=Math.abs(h),L,v,R,I,B,k,X,U,z,V,G,Q;if(y>=A&&y>=T?(R=l,k=u,z=p,Q=m,l>=0?(L=c,v=h,I=d,B=f,X=_,U=g,V=x,G=w):(L=h,v=c,I=f,B=d,X=g,U=_,V=w,G=x)):A>=T?(R=c,k=d,z=_,Q=x,c>=0?(L=h,v=l,I=f,B=u,X=g,U=p,V=w,G=m):(L=l,v=h,I=u,B=f,X=p,U=g,V=m,G=w)):(R=h,k=f,z=g,Q=w,h>=0?(L=l,v=c,I=u,B=d,X=p,U=_,V=m,G=x):(L=c,v=l,I=d,B=u,X=_,U=p,V=x,G=m)),R===0)return null;let Y=L/R,j=v/R,ie=1/R,ze=I-Y*k,Ge=B-j*k,at=X-Y*z,xt=U-j*z,st=V-Y*Q,$=G-j*Q,ae=st*xt-$*at,Me=ze*$-Ge*st,rt=at*Ge-xt*ze;if(i){if(ae<0||Me<0||rt<0)return null}else if((ae<0||Me<0||rt<0)&&(ae>0||Me>0||rt>0))return null;let He=ae+Me+rt;if(He===0)return null;let ot=ie*(ae*k+Me*z+rt*Q);return(He>0?ot<0:ot>0)?null:this.at(ot/He,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},$t=class extends pn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.combine=aa,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},fm=new ct,lr=new Ui,ch=new Kt,pm=new E,hh=new E,uh=new E,dh=new E,Zd=new E,fh=new E,mm=new E,ph=new E,Yt=class extends Ut{constructor(e=new _t,t=new $t){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){fh.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Zd.fromBufferAttribute(u,e),o?fh.addScaledVector(Zd,h):fh.addScaledVector(Zd.sub(t),h))}t.add(fh)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ch.copy(n.boundingSphere),ch.applyMatrix4(r),lr.copy(e.ray).recast(e.near),!(ch.containsPoint(lr.origin)===!1&&(lr.intersectSphere(ch,pm)===null||lr.origin.distanceToSquared(pm)>(e.far-e.near)**2))&&(fm.copy(r).invert(),lr.copy(e.ray).applyMatrix4(fm),!(n.boundingBox!==null&&lr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,lr)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,_=d.length;p<_;p++){let g=d[p],m=o[g.materialIndex],x=Math.max(g.start,f.start),w=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=x,A=w;y<A;y+=3){let T=a.getX(y),L=a.getX(y+1),v=a.getX(y+2);i=mh(this,m,e,n,c,h,u,T,L,v),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){let x=a.getX(g),w=a.getX(g+1),y=a.getX(g+2);i=mh(this,o,e,n,c,h,u,x,w,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let p=0,_=d.length;p<_;p++){let g=d[p],m=o[g.materialIndex],x=Math.max(g.start,f.start),w=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=x,A=w;y<A;y+=3){let T=y,L=y+1,v=y+2;i=mh(this,m,e,n,c,h,u,T,L,v),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){let x=g,w=g+1,y=g+2;i=mh(this,o,e,n,c,h,u,x,w,y),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function J_(s,e,t,n,i,r,o,a){let l;if(e.side===Fn?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Ts,a),l===null)return null;ph.copy(a),ph.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(ph);return c<t.near||c>t.far?null:{distance:c,point:ph.clone(),object:s}}function mh(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,hh),s.getVertexPosition(l,uh),s.getVertexPosition(c,dh);let h=J_(s,e,t,n,hh,uh,dh,mm);if(h){let u=new E;Ii.getBarycoord(mm,hh,uh,dh,u),i&&(h.uv=Ii.getInterpolatedAttribute(i,a,l,c,u,new re)),r&&(h.uv1=Ii.getInterpolatedAttribute(r,a,l,c,u,new re)),o&&(h.normal=Ii.getInterpolatedAttribute(o,a,l,c,u,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new E,materialIndex:0};Ii.getNormal(hh,uh,dh,d.normal),h.face=d,h.barycoord=u}return h}var Oa=new Ct,gm=new Ct,_m=new Ct,K_=new Ct,xm=new ct,gh=new E,Jd=new Kt,ym=new ct,Kd=new Ui,ll=class extends Yt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=zh,this.bindMatrix=new ct,this.bindMatrixInverse=new ct,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Jt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,gh),this.boundingBox.expandByPoint(gh)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Kt),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,gh),this.boundingSphere.expandByPoint(gh)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Jd.copy(this.boundingSphere),Jd.applyMatrix4(i),e.ray.intersectsSphere(Jd)!==!1&&(ym.copy(i).invert(),Kd.copy(e.ray).applyMatrix4(ym),!(this.boundingBox!==null&&Kd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Kd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ct,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===zh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Zf?this.bindMatrixInverse.copy(this.bindMatrix).invert():Ie("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;gm.fromBufferAttribute(i.attributes.skinIndex,e),_m.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Oa.copy(t),t.set(0,0,0,0)):(Oa.set(...t,1),t.set(0,0,0)),Oa.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=_m.getComponent(r);if(o!==0){let a=gm.getComponent(r);xm.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(K_.copy(Oa).applyMatrix4(xm),o)}}return t.isVector4&&(t.w=Oa.w),t.applyMatrix4(this.bindMatrixInverse)}},Fo=class extends Ut{constructor(){super(),this.isBone=!0,this.type="Bone"}},qn=class extends an{constructor(e=null,t=1,n=1,i,r,o,a,l,c=on,h=on,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},vm=new ct,$_=new ct,cl=class s{constructor(e=[],t=[]){this.uuid=ci(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Ie("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ct)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ct;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:$_;vm.multiplyMatrices(a,t[r]),vm.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new qn(t,e,e,Un,Dn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(Ie("Skeleton: No bone found with UUID:",r),o=new Fo),this.bones.push(o),this.boneInverses.push(new ct().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},xs=class extends Wt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},xo=new ct,Sm=new ct,_h=[],Mm=new Jt,j_=new ct,Ba=new Yt,za=new Kt,Rr=class extends Yt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new xs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,j_)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Jt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xo),Mm.copy(e.boundingBox).applyMatrix4(xo),this.boundingBox.union(Mm)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Kt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,xo),za.copy(e.boundingSphere).applyMatrix4(xo),this.boundingSphere.union(za)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Ba.geometry=this.geometry,Ba.material=this.material,Ba.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),za.copy(this.boundingSphere),za.applyMatrix4(n),e.ray.intersectsSphere(za)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,xo),Sm.multiplyMatrices(n,xo),Ba.matrixWorld=Sm,Ba.raycast(e,_h);for(let o=0,a=_h.length;o<a;o++){let l=_h[o];l.instanceId=r,l.object=this,t.push(l)}_h.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new xs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new qn(new Float32Array(i*this.count),i,this.count,nc,Dn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},cr=new Kt,Q_=new re(.5,.5),xh=new E,$i=class{constructor(e=new ti,t=new ti,n=new ti,i=new ti,r=new ti,o=new ti){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=ni,n=!1){let i=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],f=r[7],p=r[8],_=r[9],g=r[10],m=r[11],x=r[12],w=r[13],y=r[14],A=r[15];if(i[0].setComponents(c-o,f-h,m-p,A-x).normalize(),i[1].setComponents(c+o,f+h,m+p,A+x).normalize(),i[2].setComponents(c+a,f+u,m+_,A+w).normalize(),i[3].setComponents(c-a,f-u,m-_,A-w).normalize(),n)i[4].setComponents(l,d,g,y).normalize(),i[5].setComponents(c-l,f-d,m-g,A-y).normalize();else if(i[4].setComponents(c-l,f-d,m-g,A-y).normalize(),t===ni)i[5].setComponents(c+l,f+d,m+g,A+y).normalize();else if(t===Hs)i[5].setComponents(l,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),cr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),cr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(cr)}intersectsSprite(e){cr.center.set(0,0,0);let t=Q_.distanceTo(e.center);return cr.radius=.7071067811865476+t,cr.applyMatrix4(e.matrixWorld),this.intersectsSphere(cr)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(xh.x=i.normal.x>0?e.max.x:e.min.x,xh.y=i.normal.y>0?e.max.y:e.min.y,xh.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(xh)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},bm=new ct,hl=class s{constructor(){this.coordinateSystem=ni,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let i=0;i<t.length;i++){let r=t[i];bm.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new $i),n[i].setFromProjectionMatrix(bm,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let i=0;i<e._count;i++)t[i]===void 0&&(t[i]=new $i),t[i].copy(n[i]);return this._count=e._count,this}clone(){return new s().copy(this)}};function $d(s,e){return s-e}function ex(s,e){return s.z-e.z}function tx(s,e){return e.z-s.z}var df=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let r=this.pool,o=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});let a=r[this.index];o.push(a),this.index++,a.start=e,a.count=t,a.z=n,a.index=i}reset(){this.list.length=0,this.index=0}},Qn=new ct,nx=new Oe(1,1,1),ix=new $i,sx=new hl,yh=new Jt,hr=new Kt,Va=new E,Em=new E,rx=new E,jd=new df,Ln=new Yt,vh=[];function ox(s,e,t=0){let n=e.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==e.array.constructor){let i=s.count;for(let r=0;r<i;r++)for(let o=0;o<n;o++)e.setComponent(r+t,o,s.getComponent(r,o))}else e.array.set(s.array,t*n);e.needsUpdate=!0}function ur(s,e){if(s.constructor!==e.constructor){let t=Math.min(s.length,e.length);for(let n=0;n<t;n++)e[n]=s[n]}else{let t=Math.min(s.length,e.length);e.set(new s.constructor(s.buffer,0,t))}}var ul=class extends Yt{constructor(e,t,n=t*2,i){super(new _t,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawBytesPerElement=1,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4),n=new qn(t,e,e,Un,Dn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Uint32Array(e*e),n=new qn(t,e,e,da,di);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Float32Array(e*e*4).fill(1),n=new qn(t,e,e,Un,Dn);n.colorSpace=Tt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){let t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(let r in e.attributes){let o=e.getAttribute(r),{array:a,itemSize:l,normalized:c}=o,h=new a.constructor(n*l),u=new Wt(h,l,c);t.setAttribute(r,u)}if(e.getIndex()!==null){let r=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Wt(r,1))}this._geometryInitialized=!0}}_validateGeometry(e){let t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(let n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let i=e.getAttribute(n),r=t.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){let t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){let t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jt);let e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let r=t[n].geometryIndex;this.getMatrixAt(n,Qn),this.getBoundingBoxAt(r,yh).applyMatrix4(Qn),e.union(yh)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Kt);let e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let r=t[n].geometryIndex;this.getMatrixAt(n,Qn),this.getBoundingSphereAt(r,hr).applyMatrix4(Qn),e.union(hr)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");let n={visible:!0,active:!0,geometryIndex:e},i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort($d),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));let r=this._matricesTexture;Qn.identity().toArray(r.image.data,i*16),r.needsUpdate=!0;let o=this._colorsTexture;return o&&(nx.toArray(o.image.data,i*4),o.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);let i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;let o=e.getIndex();if(o!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?o.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort($d),l=this._availableGeometryIds.shift(),r[l]=i):(l=this._geometryCount,this._geometryCount++,r.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);let n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),o=t.getIndex(),a=this._geometryInfo[e];if(i&&o.count>a.reservedIndexCount||t.attributes.position.count>a.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");let l=a.vertexStart,c=a.reservedVertexCount;a.vertexCount=t.getAttribute("position").count;for(let h in n.attributes){let u=t.getAttribute(h),d=n.getAttribute(h);ox(u,d,l);let f=u.itemSize;for(let p=u.count,_=c;p<_;p++){let g=l+p;for(let m=0;m<f;m++)d.setComponent(g,m,0)}d.needsUpdate=!0,d.addUpdateRange(l*f,c*f)}if(i){let h=a.indexStart,u=a.reservedIndexCount;a.indexCount=t.getIndex().count;for(let d=0;d<o.count;d++)r.setX(h+d,l+o.getX(d));for(let d=o.count,f=u;d<f;d++)r.setX(h+d,l);r.needsUpdate=!0,r.addUpdateRange(h,a.reservedIndexCount)}return a.start=i?a.indexStart:a.vertexStart,a.count=i?a.indexCount:a.vertexCount,a.boundingBox=null,t.boundingBox!==null&&(a.boundingBox=t.boundingBox.clone()),a.boundingSphere=null,t.boundingSphere!==null&&(a.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){let t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;let n=this._instanceInfo;for(let i=0,r=n.length;i<r;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0,n=this._geometryInfo,i=n.map((o,a)=>a).sort((o,a)=>n[o].vertexStart-n[a].vertexStart),r=this.geometry;for(let o=0,a=n.length;o<a;o++){let l=i[o],c=n[l];if(c.active!==!1){if(r.index!==null){if(c.indexStart!==t){let{indexStart:h,vertexStart:u,reservedIndexCount:d}=c,f=r.index,p=f.array,_=e-u;for(let g=h;g<h+d;g++)p[g]=p[g]+_;f.array.copyWithin(t,h,h+d),f.addUpdateRange(t,d),f.needsUpdate=!0,c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){let{vertexStart:h,reservedVertexCount:u}=c,d=r.attributes;for(let f in d){let p=d[f],{array:_,itemSize:g}=p;_.copyWithin(e*g,h*g,(h+u)*g),p.addUpdateRange(e*g,u*g),p.needsUpdate=!0}c.vertexStart=e}e+=c.reservedVertexCount,c.start=r.index?c.indexStart:c.vertexStart}}return this._nextIndexStart=t,this._nextVertexStart=e,this._visibilityChanged=!0,this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){let r=new Jt,o=n.index,a=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let h=l;o&&(h=o.getX(h)),r.expandByPoint(Va.fromBufferAttribute(a,h))}i.boundingBox=r}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){let r=new Kt;this.getBoundingBoxAt(e,yh),yh.getCenter(r.center);let o=n.index,a=n.attributes.position,l=0;for(let c=i.start,h=i.start+i.count;c<h;c++){let u=c;o&&(u=o.getX(u)),Va.fromBufferAttribute(a,u),l=Math.max(l,r.center.distanceToSquared(Va))}r.radius=Math.sqrt(l),i.boundingSphere=r}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);let n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null?t.isVector4?t.set(1,1,1,1):t.setRGB(1,1,1):t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this._visibilityChanged=!0,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);let n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){let t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort($d);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`THREE.BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);let i=new Int32Array(e),r=new Int32Array(e);ur(this._multiDrawCounts,i),ur(this._multiDrawStarts,r),this._multiDrawCounts=i,this._multiDrawStarts=r,this._maxInstanceCount=e;let o=this._indirectTexture,a=this._matricesTexture,l=this._colorsTexture;o.dispose(),this._initIndirectTexture(),ur(o.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),ur(a.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),ur(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){let n=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...n.map(a=>a.vertexStart+a.reservedVertexCount))>e)throw new Error(`THREE.BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`THREE.BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);let r=this.geometry;r.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new _t,this._initializeGeometry(r));let o=this.geometry;r.index&&ur(r.index.array,o.index.array);for(let a in r.attributes)ur(r.attributes[a].array,o.attributes[a].array)}raycast(e,t){let n=this._instanceInfo,i=this._geometryInfo,r=this.matrixWorld,o=this.geometry;Ln.material=this.material,Ln.geometry.index=o.index,Ln.geometry.attributes=o.attributes,Ln.geometry.boundingBox===null&&(Ln.geometry.boundingBox=new Jt),Ln.geometry.boundingSphere===null&&(Ln.geometry.boundingSphere=new Kt);for(let a=0,l=n.length;a<l;a++){if(!n[a].visible||!n[a].active)continue;let c=n[a].geometryIndex,h=i[c];Ln.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(a,Ln.matrixWorld).premultiply(r),this.getBoundingBoxAt(c,Ln.geometry.boundingBox),this.getBoundingSphereAt(c,Ln.geometry.boundingSphere),Ln.raycast(e,vh);for(let u=0,d=vh.length;u<d;u++){let f=vh[u];f.object=this,f.batchId=a,t.push(f)}vh.length=0}Ln.material=null,Ln.geometry.index=null,Ln.geometry.attributes={},Ln.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._multiDrawBytesPerElement=e._multiDrawBytesPerElement,this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){super.dispose(),this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,l=1;r.wireframe&&(l=2,a=i.attributes.position.count>65535?4:2);let c=this._instanceInfo,h=this._multiDrawStarts,u=this._multiDrawCounts,d=this._geometryInfo,f=this.perObjectFrustumCulled,p=this._indirectTexture,_=p.image.data,g=n.isArrayCamera?sx:ix;f&&(n.isArrayCamera?g.setFromArrayCamera(n):(Qn.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),g.setFromProjectionMatrix(Qn,n.coordinateSystem,n.reversedDepth)));let m=0;if(this.sortObjects){Qn.copy(this.matrixWorld).invert(),Va.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Qn),Em.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(Qn);for(let y=0,A=c.length;y<A;y++)if(c[y].visible&&c[y].active){let T=c[y].geometryIndex;this.getMatrixAt(y,Qn),this.getBoundingSphereAt(T,hr).applyMatrix4(Qn);let L=!1;if(f&&(L=!g.intersectsSphere(hr)),!L){let v=d[T],R=rx.subVectors(hr.center,Va).dot(Em);jd.push(v.start,v.count,R,y)}}let x=jd.list,w=this.customSort;w===null?x.sort(r.transparent?tx:ex):w.call(this,x,n);for(let y=0,A=x.length;y<A;y++){let T=x[y];h[m]=T.start*a*l,u[m]=T.count*l,_[m]=T.index,m++}jd.reset()}else for(let x=0,w=c.length;x<w;x++)if(c[x].visible&&c[x].active){let y=c[x].geometryIndex,A=!1;if(f&&(this.getMatrixAt(x,Qn),this.getBoundingSphereAt(y,hr).applyMatrix4(Qn),A=!g.intersectsSphere(hr)),!A){let T=d[y];h[m]=T.start*a*l,u[m]=T.count*l,_[m]=x,m++}}p.needsUpdate=!0,this._multiDrawCount=m,this._multiDrawBytesPerElement=a,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,r,o){this.onBeforeRender(e,null,i,r,o)}},mn=class extends pn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},$h=new E,jh=new E,wm=new ct,Ha=new Ui,Sh=new Kt,Qd=new E,Tm=new E,Ni=class extends Ut{constructor(e=new _t,t=new mn){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)$h.fromBufferAttribute(t,i-1),jh.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=$h.distanceTo(jh);e.setAttribute("lineDistance",new Be(n,1))}else Ie("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sh.copy(n.boundingSphere),Sh.applyMatrix4(i),Sh.radius+=r,e.ray.intersectsSphere(Sh)===!1)return;wm.copy(i).invert(),Ha.copy(e.ray).applyMatrix4(wm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){let m=h.getX(_),x=h.getX(_+1),w=Mh(this,e,Ha,l,m,x,_);w&&t.push(w)}if(this.isLineLoop){let _=h.getX(p-1),g=h.getX(f),m=Mh(this,e,Ha,l,_,g,p-1);m&&t.push(m)}}else{let f=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let _=f,g=p-1;_<g;_+=c){let m=Mh(this,e,Ha,l,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){let _=Mh(this,e,Ha,l,p-1,f,p-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Mh(s,e,t,n,i,r,o){let a=s.geometry.attributes.position;if($h.fromBufferAttribute(a,i),jh.fromBufferAttribute(a,r),t.distanceSqToSegment($h,jh,Qd,Tm)>n)return;Qd.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Qd);if(!(c<e.near||c>e.far))return{distance:c,point:Tm.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}var Am=new E,Rm=new E,Zn=class extends Ni{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Am.fromBufferAttribute(t,i),Rm.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Am.distanceTo(Rm);e.setAttribute("lineDistance",new Be(n,1))}else Ie("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},dl=class extends Ni{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Oo=class extends pn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Cm=new ct,ff=new Ui,bh=new Kt,Eh=new E,fl=class extends Ut{constructor(e=new _t,t=new Oo){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),bh.copy(n.boundingSphere),bh.applyMatrix4(i),bh.radius+=r,e.ray.intersectsSphere(bh)===!1)return;Cm.copy(i).invert(),ff.copy(e.ray).applyMatrix4(Cm);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let p=d,_=f;p<_;p++){let g=c.getX(p);Eh.fromBufferAttribute(u,g),Pm(Eh,g,l,i,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let p=d,_=f;p<_;p++)Eh.fromBufferAttribute(u,p),Pm(Eh,p,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Pm(s,e,t,n,i,r,o){let a=ff.distanceSqToPoint(s);if(a<t){let l=new E;ff.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}var pl=class extends an{constructor(e,t,n,i,r=qt,o=qt,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;let h=this;function u(){h.needsUpdate=!0,h._requestVideoFrameCallbackId=e.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(u))}clone(){return new this.constructor(this.image).copy(this)}update(){let e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}},Qh=class extends pl{constructor(e,t,n,i,r,o,a,l){super({},e,t,n,i,r,o,a,l),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(e){this.image=e,this.needsUpdate=!0}},eu=class extends an{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=on,this.minFilter=on,this.generateMipmaps=!1,this.needsUpdate=!0}},Cr=class extends an{constructor(e,t,n,i,r,o,a,l,c,h,u,d){super(null,o,a,l,c,h,i,r,u,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}},tu=class extends Cr{constructor(e,t,n,i,r,o){super(e,t,n,r,o),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Yn,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},nu=class extends Cr{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,ki),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}},Ws=class extends an{constructor(e=[],t=ki,n,i,r,o,a,l,c,h){super(e,t,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Xs=class extends an{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},iu=class extends an{constructor(e,t,n,i,r,o,a,l,c){super(e,t,n,i,r,o,a,l,c),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;let h=e?e.parentNode:null;h!==null&&"requestPaint"in h&&(h.onpaint=()=>{this.needsUpdate=!0},h.requestPaint())}dispose(){let e=this.image?this.image.parentNode:null;e!==null&&"onpaint"in e&&(e.onpaint=null),super.dispose()}},ys=class extends an{constructor(e,t,n=di,i,r,o,a=on,l=on,c,h=Di,u=1){if(h!==Di&&h!==Rs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new mi(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ml=class extends ys{constructor(e,t=di,n=ki,i,r,o=on,a=on,l,c=Di){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,i,r,o,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Bo=class extends an{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Jn=class s extends _t{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;p("z","y","x",-1,-1,n,t,e,o,r,0),p("z","y","x",1,-1,n,t,-e,o,r,1),p("x","z","y",1,1,e,n,t,i,o,2),p("x","z","y",1,-1,e,n,-t,i,o,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Be(c,3)),this.setAttribute("normal",new Be(h,3)),this.setAttribute("uv",new Be(u,2));function p(_,g,m,x,w,y,A,T,L,v,R){let I=y/L,B=A/v,k=y/2,X=A/2,U=T/2,z=L+1,V=v+1,G=0,Q=0,Y=new E;for(let j=0;j<V;j++){let ie=j*B-X;for(let ze=0;ze<z;ze++){let Ge=ze*I-k;Y[_]=Ge*x,Y[g]=ie*w,Y[m]=U,c.push(Y.x,Y.y,Y.z),Y[_]=0,Y[g]=0,Y[m]=T>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(ze/L),u.push(1-j/v),G+=1}}for(let j=0;j<v;j++)for(let ie=0;ie<L;ie++){let ze=d+ie+z*j,Ge=d+ie+z*(j+1),at=d+(ie+1)+z*(j+1),xt=d+(ie+1)+z*j;l.push(ze,Ge,xt),l.push(Ge,at,xt),Q+=6}a.addGroup(f,Q,R),f+=Q,d+=G}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},gl=class s extends _t{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let o=[],a=[],l=[],c=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,p=n*2+r,_=i+1,g=new E,m=new E;for(let x=0;x<=p;x++){let w=0,y=0,A=0,T=0;if(x<=n){let R=x/n,I=R*Math.PI/2;y=-h-e*Math.cos(I),A=e*Math.sin(I),T=-e*Math.cos(I),w=R*u}else if(x<=n+r){let R=(x-n)/r;y=-h+R*t,A=e,T=0,w=u+R*d}else{let R=(x-n-r)/n,I=R*Math.PI/2;y=h+e*Math.sin(I),A=e*Math.cos(I),T=e*Math.sin(I),w=u+d+R*u}let L=Math.max(0,Math.min(1,w/f)),v=0;x===0?v=.5/i:x===p&&(v=-.5/i);for(let R=0;R<=i;R++){let I=R/i,B=I*Math.PI*2,k=Math.sin(B),X=Math.cos(B);m.x=-A*X,m.y=y,m.z=A*k,a.push(m.x,m.y,m.z),g.set(-A*X,T,A*k),g.normalize(),l.push(g.x,g.y,g.z),c.push(I+v,L)}if(x>0){let R=(x-1)*_;for(let I=0;I<i;I++){let B=R+I,k=R+I+1,X=x*_+I,U=x*_+I+1;o.push(B,k,X),o.push(k,U,X)}}}this.setIndex(o),this.setAttribute("position",new Be(a,3)),this.setAttribute("normal",new Be(l,3)),this.setAttribute("uv",new Be(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},vs=class s extends _t{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],o=[],a=[],l=[],c=new E,h=new re;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Be(o,3)),this.setAttribute("normal",new Be(a,3)),this.setAttribute("uv",new Be(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},jt=class s extends _t{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],p=0,_=[],g=n/2,m=0;x(),o===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(h),this.setAttribute("position",new Be(u,3)),this.setAttribute("normal",new Be(d,3)),this.setAttribute("uv",new Be(f,2));function x(){let y=new E,A=new E,T=0,L=(t-e)/n;for(let v=0;v<=r;v++){let R=[],I=v/r,B=I*(t-e)+e;for(let k=0;k<=i;k++){let X=k/i,U=X*l+a,z=Math.sin(U),V=Math.cos(U);A.x=B*z,A.y=-I*n+g,A.z=B*V,u.push(A.x,A.y,A.z),y.set(z,L,V).normalize(),d.push(y.x,y.y,y.z),f.push(X,1-I),R.push(p++)}_.push(R)}for(let v=0;v<i;v++)for(let R=0;R<r;R++){let I=_[R][v],B=_[R+1][v],k=_[R+1][v+1],X=_[R][v+1];(e>0||R!==0)&&(h.push(I,B,X),T+=3),(t>0||R!==r-1)&&(h.push(B,k,X),T+=3)}c.addGroup(m,T,0),m+=T}function w(y){let A=p,T=new re,L=new E,v=0,R=y===!0?e:t,I=y===!0?1:-1;for(let k=1;k<=i;k++)u.push(0,g*I,0),d.push(0,I,0),f.push(.5,.5),p++;let B=p;for(let k=0;k<=i;k++){let U=k/i*l+a,z=Math.cos(U),V=Math.sin(U);L.x=R*V,L.y=g*I,L.z=R*z,u.push(L.x,L.y,L.z),d.push(0,I,0),T.x=z*.5+.5,T.y=V*.5*I+.5,f.push(T.x,T.y),p++}for(let k=0;k<i;k++){let X=A+k,U=B+k;y===!0?h.push(U,U+1,X):h.push(U+1,U,X),v+=3}c.addGroup(m,v,y===!0?1:2),m+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},zo=class s extends jt{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Ss=class s extends _t{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new Be(r,3)),this.setAttribute("normal",new Be(r.slice(),3)),this.setAttribute("uv",new Be(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){let w=new E,y=new E,A=new E;for(let T=0;T<t.length;T+=3)f(t[T+0],w),f(t[T+1],y),f(t[T+2],A),l(w,y,A,x)}function l(x,w,y,A){let T=A+1,L=[];for(let v=0;v<=T;v++){L[v]=[];let R=x.clone().lerp(y,v/T),I=w.clone().lerp(y,v/T),B=T-v;for(let k=0;k<=B;k++)k===0&&v===T?L[v][k]=R:L[v][k]=R.clone().lerp(I,k/B)}for(let v=0;v<T;v++)for(let R=0;R<2*(T-v)-1;R++){let I=Math.floor(R/2);R%2===0?(d(L[v][I+1]),d(L[v+1][I]),d(L[v][I])):(d(L[v][I+1]),d(L[v+1][I+1]),d(L[v+1][I]))}}function c(x){let w=new E;for(let y=0;y<r.length;y+=3)w.x=r[y+0],w.y=r[y+1],w.z=r[y+2],w.normalize().multiplyScalar(x),r[y+0]=w.x,r[y+1]=w.y,r[y+2]=w.z}function h(){let x=new E;for(let w=0;w<r.length;w+=3){x.x=r[w+0],x.y=r[w+1],x.z=r[w+2];let y=g(x)/2/Math.PI+.5,A=m(x)/Math.PI+.5;o.push(y,1-A)}p(),u()}function u(){for(let x=0;x<o.length;x+=6){let w=o[x+0],y=o[x+2],A=o[x+4],T=Math.max(w,y,A),L=Math.min(w,y,A);T>.9&&L<.1&&(w<.2&&(o[x+0]+=1),y<.2&&(o[x+2]+=1),A<.2&&(o[x+4]+=1))}}function d(x){r.push(x.x,x.y,x.z)}function f(x,w){let y=x*3;w.x=e[y+0],w.y=e[y+1],w.z=e[y+2]}function p(){let x=new E,w=new E,y=new E,A=new E,T=new re,L=new re,v=new re;for(let R=0,I=0;R<r.length;R+=9,I+=6){x.set(r[R+0],r[R+1],r[R+2]),w.set(r[R+3],r[R+4],r[R+5]),y.set(r[R+6],r[R+7],r[R+8]),T.set(o[I+0],o[I+1]),L.set(o[I+2],o[I+3]),v.set(o[I+4],o[I+5]),A.copy(x).add(w).add(y).divideScalar(3);let B=g(A);_(T,I+0,x,B),_(L,I+2,w,B),_(v,I+4,y,B)}}function _(x,w,y,A){A<0&&x.x===1&&(o[w]=x.x-1),y.x===0&&y.z===0&&(o[w]=A/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.detail)}},_l=class s extends Ss{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},wh=new E,Th=new E,ef=new E,Ah=new Ii,Pr=class extends _t{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),r=Math.cos(xr*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let p=0;p<l;p+=3){o?(c[0]=o.getX(p),c[1]=o.getX(p+1),c[2]=o.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);let{a:_,b:g,c:m}=Ah;if(_.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),m.fromBufferAttribute(a,c[2]),Ah.getNormal(ef),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let x=0;x<3;x++){let w=(x+1)%3,y=u[x],A=u[w],T=Ah[h[x]],L=Ah[h[w]],v=`${y}_${A}`,R=`${A}_${y}`;R in d&&d[R]?(ef.dot(d[R].normal)<=r&&(f.push(T.x,T.y,T.z),f.push(L.x,L.y,L.z)),d[R]=null):v in d||(d[v]={index0:c[x],index1:c[w],normal:ef.clone()})}}for(let p in d)if(d[p]){let{index0:_,index1:g}=d[p];wh.fromBufferAttribute(a,_),Th.fromBufferAttribute(a,g),f.push(wh.x,wh.y,wh.z),f.push(Th.x,Th.y,Th.z)}this.setAttribute("position",new Be(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},si=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ie("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),l=t||(o.isVector2?new re:new E);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new E,i=[],r=[],o=[],a=new E,l=new ct;for(let f=0;f<=e;f++){let p=f/e;i[f]=this.getTangentAt(p,new E)}r[0]=new E,o[0]=new E;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let p=Math.acos(ut(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,p))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(ut(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ir=class extends si{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new re){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},xl=class extends Ir{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function cp(){let s=0,e=0,t=0,n=0;function i(r,o,a,l){s=r,e=a,t=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}var Im=new E,Lm=new E,tf=new cp,nf=new cp,sf=new cp,Fi=class extends si{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new E){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Lm.subVectors(i[0],i[1]).add(i[0]),c=Lm);let u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Im.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Im),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),tf.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,p,_,g),nf.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,p,_,g),sf.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(tf.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),nf.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),sf.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(tf.calc(l),nf.calc(l),sf.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new E().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Dm(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,l=s*a;return(2*t-2*n+r+o)*l+(-3*t+3*n-2*r-o)*a+r*s+t}function ax(s,e){let t=1-s;return t*t*e}function lx(s,e){return 2*(1-s)*s*e}function cx(s,e){return s*s*e}function qa(s,e,t,n){return ax(s,e)+lx(s,t)+cx(s,n)}function hx(s,e){let t=1-s;return t*t*t*e}function ux(s,e){let t=1-s;return 3*t*t*s*e}function dx(s,e){return 3*(1-s)*s*s*e}function fx(s,e){return s*s*s*e}function Za(s,e,t,n,i){return hx(s,e)+ux(s,t)+dx(s,n)+fx(s,i)}var Vo=class extends si{constructor(e=new re,t=new re,n=new re,i=new re){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new re){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Za(e,i.x,r.x,o.x,a.x),Za(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ys=class extends si{constructor(e=new E,t=new E,n=new E,i=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new E){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Za(e,i.x,r.x,o.x,a.x),Za(e,i.y,r.y,o.y,a.y),Za(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ho=class extends si{constructor(e=new re,t=new re){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new re){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new re){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ji=class extends si{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ko=class extends si{constructor(e=new re,t=new re,n=new re){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new re){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(qa(e,i.x,r.x,o.x),qa(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},qs=class extends si{constructor(e=new E,t=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new E){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(qa(e,i.x,r.x,o.x),qa(e,i.y,r.y,o.y),qa(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Go=class extends si{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new re){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Dm(a,l.x,c.x,h.x,u.x),Dm(a,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new re().fromArray(i))}return this}},su=Object.freeze({__proto__:null,ArcCurve:xl,CatmullRomCurve3:Fi,CubicBezierCurve:Vo,CubicBezierCurve3:Ys,EllipseCurve:Ir,LineCurve:Ho,LineCurve3:ji,QuadraticBezierCurve:ko,QuadraticBezierCurve3:qs,SplineCurve:Go}),Zs=class extends si{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new su[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new su[i.type]().fromJSON(i))}return this}},Js=class extends Zs{constructor(e){super(),this.type="Path",this.currentPoint=new re,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Ho(this.currentPoint.clone(),new re(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new ko(this.currentPoint.clone(),new re(e,t),new re(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){let a=new Vo(this.currentPoint.clone(),new re(e,t),new re(n,i),new re(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Go(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,o,a,l),this}absellipse(e,t,n,i,r,o,a,l){let c=new Ir(e,t,n,i,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Qi=class extends Js{constructor(e){super(e),this.uuid=ci(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new Js().fromJSON(i))}return this}};function px(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=a0(s,0,i,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(n&&(r=yx(s,e,r,t)),s.length>80*t){a=s[0],l=s[1];let h=a,u=l;for(let d=t;d<i;d+=t){let f=s[d],p=s[d+1];f<a&&(a=f),p<l&&(l=p),f>h&&(h=f),p>u&&(u=p)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return yl(r,o,t,a,l,c,0),o}function a0(s,e,t,n,i){let r;if(i===Px(s,e,t,n)>0)for(let o=e;o<t;o+=n)r=Um(o/n|0,s[o],s[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Um(o/n|0,s[o],s[o+1],r);return r&&Wo(r,r.next)&&(Sl(r),r=r.next),r}function Lr(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(Wo(t,t.next)||tn(t.prev,t,t.next)===0)){if(Sl(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function yl(s,e,t,n,i,r,o){if(!s)return;!o&&r&&Ex(s,n,i,r);let a=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?gx(s,n,i,r):mx(s)){e.push(l.i,s.i,c.i),Sl(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=_x(Lr(s),e),yl(s,e,t,n,i,r,2)):o===2&&xx(s,e,t,n,i,r):yl(Lr(s),e,t,n,i,r,1);break}}}function mx(s){let e=s.prev,t=s,n=s.next;if(tn(e,t,n)>=0)return!1;let i=e.x,r=t.x,o=n.x,a=e.y,l=t.y,c=n.y,h=Math.min(i,r,o),u=Math.min(a,l,c),d=Math.max(i,r,o),f=Math.max(a,l,c),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&Ga(i,a,r,l,o,c,p.x,p.y)&&tn(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function gx(s,e,t,n){let i=s.prev,r=s,o=s.next;if(tn(i,r,o)>=0)return!1;let a=i.x,l=r.x,c=o.x,h=i.y,u=r.y,d=o.y,f=Math.min(a,l,c),p=Math.min(h,u,d),_=Math.max(a,l,c),g=Math.max(h,u,d),m=pf(f,p,e,t,n),x=pf(_,g,e,t,n),w=s.prevZ,y=s.nextZ;for(;w&&w.z>=m&&y&&y.z<=x;){if(w.x>=f&&w.x<=_&&w.y>=p&&w.y<=g&&w!==i&&w!==o&&Ga(a,h,l,u,c,d,w.x,w.y)&&tn(w.prev,w,w.next)>=0||(w=w.prevZ,y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&Ga(a,h,l,u,c,d,y.x,y.y)&&tn(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;w&&w.z>=m;){if(w.x>=f&&w.x<=_&&w.y>=p&&w.y<=g&&w!==i&&w!==o&&Ga(a,h,l,u,c,d,w.x,w.y)&&tn(w.prev,w,w.next)>=0)return!1;w=w.prevZ}for(;y&&y.z<=x;){if(y.x>=f&&y.x<=_&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&Ga(a,h,l,u,c,d,y.x,y.y)&&tn(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function _x(s,e){let t=s;do{let n=t.prev,i=t.next.next;!Wo(n,i)&&c0(n,t,t.next,i)&&vl(n,i)&&vl(i,n)&&(e.push(n.i,t.i,i.i),Sl(t),Sl(t.next),t=s=i),t=t.next}while(t!==s);return Lr(t)}function xx(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Ax(o,a)){let l=h0(o,a);o=Lr(o,o.next),l=Lr(l,l.next),yl(o,e,t,n,i,r,0),yl(l,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function yx(s,e,t,n){let i=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,l=r<o-1?e[r+1]*n:s.length,c=a0(s,a,l,n,!1);c===c.next&&(c.steiner=!0),i.push(Tx(c))}i.sort(vx);for(let r=0;r<i.length;r++)t=Sx(i[r],t);return t}function vx(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function Sx(s,e){let t=Mx(s,e);if(!t)return e;let n=h0(t,s);return Lr(n,n.next),Lr(t,t.next)}function Mx(s,e){let t=e,n=s.x,i=s.y,r=-1/0,o;if(Wo(s,t))return t;do{if(Wo(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=l&&n!==t.x&&l0(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)){let u=Math.abs(i-t.y)/(n-t.x);vl(t,s)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&bx(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function bx(s,e){return tn(s.prev,s,e.prev)<0&&tn(e.next,s,s.next)<0}function Ex(s,e,t,n){let i=s;do i.z===0&&(i.z=pf(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,wx(i)}function wx(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,t*=2}while(e>1);return s}function pf(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function Tx(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function l0(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function Ga(s,e,t,n,i,r,o,a){return!(s===o&&e===a)&&l0(s,e,t,n,i,r,o,a)}function Ax(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!Rx(s,e)&&(vl(s,e)&&vl(e,s)&&Cx(s,e)&&(tn(s.prev,s,e.prev)||tn(s,e.prev,e))||Wo(s,e)&&tn(s.prev,s,s.next)>0&&tn(e.prev,e,e.next)>0)}function tn(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function Wo(s,e){return s.x===e.x&&s.y===e.y}function c0(s,e,t,n){let i=Ch(tn(s,e,t)),r=Ch(tn(s,e,n)),o=Ch(tn(t,n,s)),a=Ch(tn(t,n,e));return!!(i!==r&&o!==a||i===0&&Rh(s,t,e)||r===0&&Rh(s,n,e)||o===0&&Rh(t,s,n)||a===0&&Rh(t,e,n))}function Rh(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function Ch(s){return s>0?1:s<0?-1:0}function Rx(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&c0(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function vl(s,e){return tn(s.prev,s,s.next)<0?tn(s,e,s.next)>=0&&tn(s,s.prev,e)>=0:tn(s,e,s.prev)<0||tn(s,s.next,e)<0}function Cx(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function h0(s,e){let t=mf(s.i,s.x,s.y),n=mf(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Um(s,e,t,n){let i=mf(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Sl(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function mf(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Px(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}var gf=class{static triangulate(e,t,n=2){return px(e,t,n)}},gi=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];Nm(e),Fm(n,e);let o=e.length;t.forEach(Nm);for(let l=0;l<t.length;l++)i.push(o),o+=t[l].length,Fm(n,t[l]);let a=gf.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function Nm(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Fm(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var Dr=class s extends _t{constructor(e=new Qi([new re(.5,.5),new re(-.5,.5),new re(-.5,-.5),new re(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],r=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new Be(i,3)),this.setAttribute("uv",new Be(r,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,x=t.UVGenerator!==void 0?t.UVGenerator:Ix,w,y=!1,A,T,L,v;if(m){w=m.getSpacedPoints(h),y=!0,d=!1;let ce=m.isCatmullRomCurve3?m.closed:!1;A=m.computeFrenetFrames(h,ce),T=new E,L=new E,v=new E}d||(g=0,f=0,p=0,_=0);let R=a.extractPoints(c),I=R.shape,B=R.holes;if(!gi.isClockWise(I)){I=I.reverse();for(let ce=0,fe=B.length;ce<fe;ce++){let pe=B[ce];gi.isClockWise(pe)&&(B[ce]=pe.reverse())}}function X(ce){let pe=10000000000000001e-36,ge=ce[0];for(let Te=1;Te<=ce.length;Te++){let tt=Te%ce.length,Ke=ce[tt],nt=Ke.x-ge.x,lt=Ke.y-ge.y,O=nt*nt+lt*lt,Ft=Math.max(Math.abs(Ke.x),Math.abs(Ke.y),Math.abs(ge.x),Math.abs(ge.y)),St=pe*Ft*Ft;if(O<=St){ce.splice(tt,1),Te--;continue}ge=Ke}}X(I),B.forEach(X);let U=B.length,z=I;for(let ce=0;ce<U;ce++){let fe=B[ce];I=I.concat(fe)}function V(ce,fe,pe){return fe||Je("ExtrudeGeometry: vec does not exist"),ce.clone().addScaledVector(fe,pe)}let G=I.length;function Q(ce,fe,pe){let ge,Te,tt,Ke=ce.x-fe.x,nt=ce.y-fe.y,lt=pe.x-ce.x,O=pe.y-ce.y,Ft=Ke*Ke+nt*nt,St=Ke*O-nt*lt;if(Math.abs(St)>Number.EPSILON){let P=Math.sqrt(Ft),M=Math.sqrt(lt*lt+O*O),W=fe.x-nt/P,J=fe.y+Ke/P,te=pe.x-O/M,ve=pe.y+lt/M,we=((te-W)*O-(ve-J)*lt)/(Ke*O-nt*lt);ge=W+Ke*we-ce.x,Te=J+nt*we-ce.y;let ne=ge*ge+Te*Te;if(ne<=2)return new re(ge,Te);tt=Math.sqrt(ne/2)}else{let P=!1;Ke>Number.EPSILON?lt>Number.EPSILON&&(P=!0):Ke<-Number.EPSILON?lt<-Number.EPSILON&&(P=!0):Math.sign(nt)===Math.sign(O)&&(P=!0),P?(ge=-nt,Te=Ke,tt=Math.sqrt(Ft)):(ge=Ke,Te=nt,tt=Math.sqrt(Ft/2))}return new re(ge/tt,Te/tt)}let Y=[];for(let ce=0,fe=z.length,pe=fe-1,ge=ce+1;ce<fe;ce++,pe++,ge++)pe===fe&&(pe=0),ge===fe&&(ge=0),Y[ce]=Q(z[ce],z[pe],z[ge]);let j=[],ie,ze=Y.concat();for(let ce=0,fe=U;ce<fe;ce++){let pe=B[ce];ie=[];for(let ge=0,Te=pe.length,tt=Te-1,Ke=ge+1;ge<Te;ge++,tt++,Ke++)tt===Te&&(tt=0),Ke===Te&&(Ke=0),ie[ge]=Q(pe[ge],pe[tt],pe[Ke]);j.push(ie),ze=ze.concat(ie)}let Ge;if(g===0)Ge=gi.triangulateShape(z,B);else{let ce=[],fe=[];for(let pe=0;pe<g;pe++){let ge=pe/g,Te=f*Math.cos(ge*Math.PI/2),tt=p*Math.sin(ge*Math.PI/2)+_;for(let Ke=0,nt=z.length;Ke<nt;Ke++){let lt=V(z[Ke],Y[Ke],tt);Me(lt.x,lt.y,-Te),ge===0&&ce.push(lt)}for(let Ke=0,nt=U;Ke<nt;Ke++){let lt=B[Ke];ie=j[Ke];let O=[];for(let Ft=0,St=lt.length;Ft<St;Ft++){let P=V(lt[Ft],ie[Ft],tt);Me(P.x,P.y,-Te),ge===0&&O.push(P)}ge===0&&fe.push(O)}}Ge=gi.triangulateShape(ce,fe)}let at=Ge.length,xt=p+_;for(let ce=0;ce<G;ce++){let fe=d?V(I[ce],ze[ce],xt):I[ce];y?(L.copy(A.normals[0]).multiplyScalar(fe.x),T.copy(A.binormals[0]).multiplyScalar(fe.y),v.copy(w[0]).add(L).add(T),Me(v.x,v.y,v.z)):Me(fe.x,fe.y,0)}for(let ce=1;ce<=h;ce++)for(let fe=0;fe<G;fe++){let pe=d?V(I[fe],ze[fe],xt):I[fe];y?(L.copy(A.normals[ce]).multiplyScalar(pe.x),T.copy(A.binormals[ce]).multiplyScalar(pe.y),v.copy(w[ce]).add(L).add(T),Me(v.x,v.y,v.z)):Me(pe.x,pe.y,u/h*ce)}for(let ce=g-1;ce>=0;ce--){let fe=ce/g,pe=f*Math.cos(fe*Math.PI/2),ge=p*Math.sin(fe*Math.PI/2)+_;for(let Te=0,tt=z.length;Te<tt;Te++){let Ke=V(z[Te],Y[Te],ge);Me(Ke.x,Ke.y,u+pe)}for(let Te=0,tt=B.length;Te<tt;Te++){let Ke=B[Te];ie=j[Te];for(let nt=0,lt=Ke.length;nt<lt;nt++){let O=V(Ke[nt],ie[nt],ge);y?Me(O.x,O.y+w[h-1].y,w[h-1].x+pe):Me(O.x,O.y,u+pe)}}}st(),$();function st(){let ce=i.length/3;if(d){let fe=0,pe=G*fe;for(let ge=0;ge<at;ge++){let Te=Ge[ge];rt(Te[2]+pe,Te[1]+pe,Te[0]+pe)}fe=h+g*2,pe=G*fe;for(let ge=0;ge<at;ge++){let Te=Ge[ge];rt(Te[0]+pe,Te[1]+pe,Te[2]+pe)}}else{for(let fe=0;fe<at;fe++){let pe=Ge[fe];rt(pe[2],pe[1],pe[0])}for(let fe=0;fe<at;fe++){let pe=Ge[fe];rt(pe[0]+G*h,pe[1]+G*h,pe[2]+G*h)}}n.addGroup(ce,i.length/3-ce,0)}function $(){let ce=i.length/3,fe=0;ae(z,fe),fe+=z.length;for(let pe=0,ge=B.length;pe<ge;pe++){let Te=B[pe];ae(Te,fe),fe+=Te.length}n.addGroup(ce,i.length/3-ce,1)}function ae(ce,fe){let pe=ce.length;for(;--pe>=0;){let ge=pe,Te=pe-1;Te<0&&(Te=ce.length-1);for(let tt=0,Ke=h+g*2;tt<Ke;tt++){let nt=G*tt,lt=G*(tt+1),O=fe+ge+nt,Ft=fe+Te+nt,St=fe+Te+lt,P=fe+ge+lt;He(O,Ft,St,P)}}}function Me(ce,fe,pe){l.push(ce),l.push(fe),l.push(pe)}function rt(ce,fe,pe){ot(ce),ot(fe),ot(pe);let ge=i.length/3,Te=x.generateTopUV(n,i,ge-3,ge-2,ge-1);Nt(Te[0]),Nt(Te[1]),Nt(Te[2])}function He(ce,fe,pe,ge){ot(ce),ot(fe),ot(ge),ot(fe),ot(pe),ot(ge);let Te=i.length/3,tt=x.generateSideWallUV(n,i,Te-6,Te-3,Te-2,Te-1);Nt(tt[0]),Nt(tt[1]),Nt(tt[3]),Nt(tt[1]),Nt(tt[2]),Nt(tt[3])}function ot(ce){i.push(l[ce*3+0]),i.push(l[ce*3+1]),i.push(l[ce*3+2])}function Nt(ce){r.push(ce.x),r.push(ce.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Lx(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new su[i.type]().fromJSON(i)),new s(n,e.options)}},Ix={generateTopUV:function(s,e,t,n,i){let r=e[t*3],o=e[t*3+1],a=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new re(r,o),new re(a,l),new re(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],p=e[i*3+2],_=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new re(o,1-l),new re(c,1-u),new re(d,1-p),new re(_,1-m)]:[new re(a,1-l),new re(h,1-u),new re(f,1-p),new re(g,1-m)]}};function Lx(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Ml=class s extends Ss{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},Ur=class s extends _t{constructor(e=[new re(0,-.5),new re(.5,0),new re(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ut(i,0,Math.PI*2);let r=[],o=[],a=[],l=[],c=[],h=1/t,u=new E,d=new re,f=new E,p=new E,_=new E,g=0,m=0;for(let x=0;x<=e.length-1;x++)switch(x){case 0:g=e[x+1].x-e[x].x,m=e[x+1].y-e[x].y,f.x=m*1,f.y=-g,f.z=m*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:g=e[x+1].x-e[x].x,m=e[x+1].y-e[x].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(p)}for(let x=0;x<=t;x++){let w=n+x*h*i,y=Math.sin(w),A=Math.cos(w);for(let T=0;T<=e.length-1;T++){u.x=e[T].x*y,u.y=e[T].y,u.z=e[T].x*A,o.push(u.x,u.y,u.z),d.x=x/t,d.y=T/(e.length-1),a.push(d.x,d.y);let L=l[3*T+0]*y,v=l[3*T+1],R=l[3*T+0]*A;c.push(L,v,R)}}for(let x=0;x<t;x++)for(let w=0;w<e.length-1;w++){let y=w+x*e.length,A=y,T=y+e.length,L=y+e.length+1,v=y+1;r.push(A,T,v),r.push(L,v,T)}this.setIndex(r),this.setAttribute("position",new Be(o,3)),this.setAttribute("uv",new Be(a,2)),this.setAttribute("normal",new Be(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}},Xo=class s extends Ss{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},Oi=class s extends _t{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],p=[],_=[],g=[];for(let m=0;m<h;m++){let x=m*d-o;for(let w=0;w<c;w++){let y=w*u-r;p.push(y,-x,0),_.push(0,0,1),g.push(w/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<a;x++){let w=x+c*m,y=x+c*(m+1),A=x+1+c*(m+1),T=x+1+c*m;f.push(w,y,T),f.push(y,A,T)}this.setIndex(f),this.setAttribute("position",new Be(p,3)),this.setAttribute("normal",new Be(_,3)),this.setAttribute("uv",new Be(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},bl=class s extends _t{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],l=[],c=[],h=[],u=e,d=(t-e)/i,f=new E,p=new re;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){let m=r+g/n*o;f.x=u*Math.cos(m),f.y=u*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}u+=d}for(let _=0;_<i;_++){let g=_*(n+1);for(let m=0;m<n;m++){let x=m+g,w=x,y=x+n+1,A=x+n+2,T=x+1;a.push(w,y,T),a.push(y,A,T)}}this.setIndex(a),this.setAttribute("position",new Be(l,3)),this.setAttribute("normal",new Be(c,3)),this.setAttribute("uv",new Be(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},El=class s extends _t{constructor(e=new Qi([new re(0,.5),new re(-.5,-.5),new re(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],o=[],a=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(a,l,h),a+=l,l=0;this.setIndex(n),this.setAttribute("position",new Be(i,3)),this.setAttribute("normal",new Be(r,3)),this.setAttribute("uv",new Be(o,2));function c(h){let u=i.length/3,d=h.extractPoints(t),f=d.shape,p=d.holes;gi.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){let x=p[g];gi.isClockWise(x)===!0&&(p[g]=x.reverse())}let _=gi.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){let x=p[g];f=f.concat(x)}for(let g=0,m=f.length;g<m;g++){let x=f[g];i.push(x.x,x.y,0),r.push(0,0,1),o.push(x.x,x.y)}for(let g=0,m=_.length;g<m;g++){let x=_[g],w=x[0]+u,y=x[1]+u,A=x[2]+u;n.push(w,y,A),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return Dx(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let o=t[e.shapes[i]];n.push(o)}return new s(n,e.curveSegments)}};function Dx(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}var hi=class s extends _t{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new E,d=new E,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){let x=[],w=m/n,y=o+w*a,A=e*Math.cos(y),T=Math.sqrt(e*e-A*A),L=0;m===0&&o===0?L=.5/t:m===n&&l===Math.PI&&(L=-.5/t);for(let v=0;v<=t;v++){let R=v/t,I=i+R*r;u.x=-T*Math.cos(I),u.y=A,u.z=T*Math.sin(I),p.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(R+L,1-w),x.push(c++)}h.push(x)}for(let m=0;m<n;m++)for(let x=0;x<t;x++){let w=h[m][x+1],y=h[m][x],A=h[m+1][x],T=h[m+1][x+1];(m!==0||o>0)&&f.push(w,y,T),(m!==n-1||l<Math.PI)&&f.push(y,A,T)}this.setIndex(f),this.setAttribute("position",new Be(p,3)),this.setAttribute("normal",new Be(_,3)),this.setAttribute("uv",new Be(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},wl=class s extends Ss{constructor(e=1,t=0){let n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},Bi=class s extends _t{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,o=0,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:o,thetaLength:a},n=Math.floor(n),i=Math.floor(i);let l=[],c=[],h=[],u=[],d=new E,f=new E,p=new E;for(let _=0;_<=n;_++){let g=o+_/n*a;for(let m=0;m<=i;m++){let x=m/i*r;f.x=(e+t*Math.cos(g))*Math.cos(x),f.y=(e+t*Math.cos(g))*Math.sin(x),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),d.x=e*Math.cos(x),d.y=e*Math.sin(x),p.subVectors(f,d).normalize(),h.push(p.x,p.y,p.z),u.push(m/i),u.push(_/n)}}for(let _=1;_<=n;_++)for(let g=1;g<=i;g++){let m=(i+1)*_+g-1,x=(i+1)*(_-1)+g-1,w=(i+1)*(_-1)+g,y=(i+1)*_+g;l.push(m,x,y),l.push(x,w,y)}this.setIndex(l),this.setAttribute("position",new Be(c,3)),this.setAttribute("normal",new Be(h,3)),this.setAttribute("uv",new Be(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}},Tl=class s extends _t{constructor(e=1,t=.4,n=64,i=8,r=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:r,q:o},n=Math.floor(n),i=Math.floor(i);let a=[],l=[],c=[],h=[],u=new E,d=new E,f=new E,p=new E,_=new E,g=new E,m=new E;for(let w=0;w<=n;++w){let y=w/n*r*Math.PI*2;x(y,r,o,e,f),x(y+.01,r,o,e,p),g.subVectors(p,f),m.addVectors(p,f),_.crossVectors(g,m),m.crossVectors(_,g),_.normalize(),m.normalize();for(let A=0;A<=i;++A){let T=A/i*Math.PI*2,L=-t*Math.cos(T),v=t*Math.sin(T);u.x=f.x+(L*m.x+v*_.x),u.y=f.y+(L*m.y+v*_.y),u.z=f.z+(L*m.z+v*_.z),l.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),c.push(d.x,d.y,d.z),h.push(w/n),h.push(A/i)}}for(let w=1;w<=n;w++)for(let y=1;y<=i;y++){let A=(i+1)*(w-1)+(y-1),T=(i+1)*w+(y-1),L=(i+1)*w+y,v=(i+1)*(w-1)+y;a.push(A,T,v),a.push(T,L,v)}this.setIndex(a),this.setAttribute("position",new Be(l,3)),this.setAttribute("normal",new Be(c,3)),this.setAttribute("uv",new Be(h,2));function x(w,y,A,T,L){let v=Math.cos(w),R=Math.sin(w),I=A/y*w,B=Math.cos(I);L.x=T*(2+B)*.5*v,L.y=T*(2+B)*R*.5,L.z=T*Math.sin(I)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},zi=class s extends _t{constructor(e=new qs(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new E,l=new E,c=new re,h=new E,u=[],d=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new Be(u,3)),this.setAttribute("normal",new Be(d,3)),this.setAttribute("uv",new Be(f,2));function _(){for(let w=0;w<t;w++)g(w);g(r===!1?t:0),x(),m()}function g(w){h=e.getPointAt(w/t,h);let y=o.normals[w],A=o.binormals[w];for(let T=0;T<=i;T++){let L=T/i*Math.PI*2,v=Math.sin(L),R=-Math.cos(L);l.x=R*y.x+v*A.x,l.y=R*y.y+v*A.y,l.z=R*y.z+v*A.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function m(){for(let w=1;w<=t;w++)for(let y=1;y<=i;y++){let A=(i+1)*(w-1)+(y-1),T=(i+1)*w+(y-1),L=(i+1)*w+y,v=(i+1)*(w-1)+y;p.push(A,T,v),p.push(T,L,v)}}function x(){for(let w=0;w<=t;w++)for(let y=0;y<=i;y++)c.x=w/t,c.y=y/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new su[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Nr=class extends _t{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new E,r=new E;if(e.index!==null){let o=e.attributes.position,a=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let u=l[c],d=u.start,f=u.count;for(let p=d,_=d+f;p<_;p+=3)for(let g=0;g<3;g++){let m=a.getX(p+g),x=a.getX(p+(g+1)%3);i.fromBufferAttribute(o,m),r.fromBufferAttribute(o,x),Om(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}}else{let o=e.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){let h=3*a+c,u=3*a+(c+1)%3;i.fromBufferAttribute(o,h),r.fromBufferAttribute(o,u),Om(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new Be(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Om(s,e,t){let n=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var Bm=Object.freeze({__proto__:null,BoxGeometry:Jn,CapsuleGeometry:gl,CircleGeometry:vs,ConeGeometry:zo,CylinderGeometry:jt,DodecahedronGeometry:_l,EdgesGeometry:Pr,ExtrudeGeometry:Dr,IcosahedronGeometry:Ml,LatheGeometry:Ur,OctahedronGeometry:Xo,PlaneGeometry:Oi,PolyhedronGeometry:Ss,RingGeometry:bl,ShapeGeometry:El,SphereGeometry:hi,TetrahedronGeometry:wl,TorusGeometry:Bi,TorusKnotGeometry:Tl,TubeGeometry:zi,WireframeGeometry:Nr}),Al=class extends pn{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Oe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};function Kr(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(zm(i))i.isRenderTargetTexture?(Ie("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(zm(i[0])){let r=[];for(let o=0,a=i.length;o<a;o++)r[o]=i[o].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Bn(s){let e={};for(let t=0;t<s.length;t++){let n=Kr(s[t]);for(let i in n)e[i]=n[i]}return e}function zm(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Ux(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function hp(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Tt.workingColorSpace}var ya={clone:Kr,merge:Bn},Nx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Fx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,bn=class extends pn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Nx,this.fragmentShader=Fx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Kr(e.uniforms),this.uniformsGroups=Ux(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new Oe().setHex(i.value);break;case"v2":this.uniforms[n].value=new re().fromArray(i.value);break;case"v3":this.uniforms[n].value=new E().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Ct().fromArray(i.value);break;case"m3":this.uniforms[n].value=new gt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new ct().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Yo=class extends bn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},bt=class extends pn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ns,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Fr=class extends bt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new re(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ut(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Oe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Oe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Oe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Rl=class extends pn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Oe(16777215),this.specular=new Oe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ns,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.combine=aa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Cl=class extends pn{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Oe(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ns,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Pl=class extends pn{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ns,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},Il=class extends pn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ns,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _i,this.combine=aa,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},qo=class extends pn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=jf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Zo=class extends pn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},Ll=class extends pn{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Oe(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ns,this.normalScale=new re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}},Dl=class extends mn{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function Pi(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Ja(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function u0(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function _f(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function d0(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}function Ox(s,e,t,n,i=30){let r=s.clone();r.name=e;let o=[];for(let l=0;l<r.tracks.length;++l){let c=r.tracks[l],h=c.getValueSize(),u=[],d=[];for(let f=0;f<c.times.length;++f){let p=c.times[f]*i;if(!(p<t||p>=n)){u.push(c.times[f]);for(let _=0;_<h;++_)d.push(c.values[f*h+_])}}u.length!==0&&(c.times=Pi(u,c.times.constructor),c.values=Pi(d,c.values.constructor),o.push(c))}r.tracks=o;let a=1/0;for(let l=0;l<r.tracks.length;++l)a>r.tracks[l].times[0]&&(a=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*a);return r.resetDuration(),r}function Bx(s,e=0,t=s,n=30){n<=0&&(n=30);let i=t.tracks.length,r=e/n;for(let o=0;o<i;++o){let a=t.tracks[o],l=a.ValueTypeName;if(l==="bool"||l==="string")continue;let c=s.tracks.find(function(m){return m.name===a.name&&m.ValueTypeName===l});if(c===void 0)continue;let h=0,u=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0,f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);let p=a.times.length-1,_;if(r<=a.times[0]){let m=h,x=u-h;_=a.values.slice(m,x)}else if(r>=a.times[p]){let m=p*u+h,x=m+u-h;_=a.values.slice(m,x)}else{let m=a.createInterpolant(),x=h,w=u-h;m.evaluate(r),_=m.resultBuffer.slice(x,w)}l==="quaternion"&&new hn().fromArray(_).normalize().conjugate().toArray(_);let g=c.times.length;for(let m=0;m<g;++m){let x=m*f+d;if(l==="quaternion")hn.multiplyQuaternionsFlat(c.values,x,_,0,c.values,x);else{let w=f-d*2;for(let y=0;y<w;++y)c.values[x+y]-=_[y]}}}return s.blendMode=od,s}var ru=class{static convertArray(e,t){return Pi(e,t)}static isTypedArray(e){return Qg(e)}static hasTangents(e){return Ja(e)}static getKeyframeOrder(e){return u0(e)}static sortedArray(e,t,n){return _f(e,t,n)}static flattenJSON(e,t,n,i){d0(e,t,n,i)}static subclip(e,t,n,i,r=30){return Ox(e,t,n,i,r)}static makeClipAdditive(e,t=0,n=e,i=30){return Bx(e,t,n,i)}},Ms=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ul=class extends Ms{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Bs,endingEnd:Bs}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case zs:r=e,a=2*t-n;break;case Ro:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case zs:o=e,l=2*n-t;break;case Ro:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),_=p*p,g=_*p,m=-d*g+2*d*_-d*p,x=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*p+1,w=(-1-f)*g+(1.5+f)*_+.5*p,y=f*g-f*_;for(let A=0;A!==a;++A)r[A]=m*o[h+A]+x*o[c+A]+w*o[l+A]+y*o[u+A];return r}},Jo=class extends Ms{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},Nl=class extends Ms{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Fl=class extends Ms{interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let p=(n-t)/(i-t),_=1-p;for(let g=0;g!==a;++g)r[g]=o[c+g]*_+o[l+g]*p;return r}let d=a*2,f=e-1;for(let p=0;p!==a;++p){let _=o[c+p],g=o[l+p],m=f*d+p*2,x=u[m],w=u[m+1],y=e*d+p*2,A=h[y],T=h[y+1],L=Vx(n,t,x,A,i);r[p]=f0(L,_,w,T,g)}return r}};function f0(s,e,t,n,i){let r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*n+s*s*s*i}function zx(s,e,t,n,i){let r=1-s;return 3*r*r*(t-e)+6*r*s*(n-t)+3*s*s*(i-n)}function Vx(s,e,t,n,i){let r=(s-e)/(i-e);for(let o=0;o<8;o++){let a=f0(r,e,t,n,i)-s;if(Math.abs(a)<1e-10)break;let l=zx(r,e,t,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}var Kn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Pi(t,this.TimeBufferType),this.values=Pi(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Pi(e.times,Array),values:Pi(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),Ja(e.settings)&&(n.settings={inTangents:Pi(e.settings.inTangents,Array),outTangents:Pi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Nl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Jo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ul(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Fl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ao:t=this.InterpolantFactoryMethodDiscrete;break;case il:t=this.InterpolantFactoryMethodLinear;break;case Wa:t=this.InterpolantFactoryMethodSmooth;break;case Vh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Ie("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ao;case this.InterpolantFactoryMethodLinear:return il;case this.InterpolantFactoryMethodSmooth:return Wa;case this.InterpolantFactoryMethodBezier:return Vh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;Ja(this.settings)&&(Vm(this.settings.inTangents,e),Vm(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Je("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(Je("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Je("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){Je("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Qg(i))for(let a=0,l=i.length;a!==l;++a){let c=i[a];if(isNaN(c)){Je("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Wa,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let p=0;p!==n;++p){let _=t[u+p];if(_!==t[d+p]||_!==t[f+p]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,Ja(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Vm(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]*=e}Kn.prototype.ValueTypeName="";Kn.prototype.TimeBufferType=Float32Array;Kn.prototype.ValueBufferType=Float32Array;Kn.prototype.DefaultInterpolation=il;var es=class extends Kn{constructor(e,t,n){super(e,t,n)}};es.prototype.ValueTypeName="bool";es.prototype.ValueBufferType=Array;es.prototype.DefaultInterpolation=Ao;es.prototype.InterpolantFactoryMethodLinear=void 0;es.prototype.InterpolantFactoryMethodSmooth=void 0;var Ko=class extends Kn{constructor(e,t,n,i){super(e,t,n,i)}};Ko.prototype.ValueTypeName="color";var Or=class extends Kn{constructor(e,t,n,i){super(e,t,n,i)}};Or.prototype.ValueTypeName="number";var Ol=class extends Ms{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t),c=e*a;for(let h=c+a;c!==h;c+=4)hn.slerpFlat(r,0,o,c-a,o,c,l);return r}},Br=class extends Kn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Ol(this.times,this.values,this.getValueSize(),e)}};Br.prototype.ValueTypeName="quaternion";Br.prototype.InterpolantFactoryMethodSmooth=void 0;var ts=class extends Kn{constructor(e,t,n){super(e,t,n)}};ts.prototype.ValueTypeName="string";ts.prototype.ValueBufferType=Array;ts.prototype.DefaultInterpolation=Ao;ts.prototype.InterpolantFactoryMethodLinear=void 0;ts.prototype.InterpolantFactoryMethodSmooth=void 0;var $o=class extends Kn{constructor(e,t,n,i){super(e,t,n,i)}};$o.prototype.ValueTypeName="vector";var Ks=class{constructor(e="",t=-1,n=[],i=Nc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=ci(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(kx(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(Kn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=u0(l);l=_f(l,1,h),c=_f(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Or(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],h=c.name.match(r);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(c)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Hx(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Or;case"vector":case"vector2":case"vector3":case"vector4":return $o;case"color":return Ko;case"quaternion":return Br;case"bool":case"boolean":return es;case"string":return ts}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function kx(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Hx(s.type);if(s.times===void 0){let n=[],i=[];d0(s.keys,n,i,"value"),s.times=n,s.values=i}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),Ja(s.settings)&&(t.settings={inTangents:Pi(s.settings.inTangents,Float32Array),outTangents:Pi(s.settings.outTangents,Float32Array)}),t}var Li={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(Hm(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!Hm(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function Hm(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var jo=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],p=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},up=new jo,En=class{constructor(e){this.manager=e!==void 0?e:up,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};En.DEFAULT_MATERIAL_NAME="__DEFAULT";var ms={},xf=class extends Error{constructor(e,t){super(e),this.response=t}},xi=class extends En{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Li.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(ms[e]!==void 0){ms[e].push({onLoad:t,onProgress:n,onError:i});return}ms[e]=[],ms[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Ie("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=ms[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,p=f!==0,_=0,g=new ReadableStream({start(m){x();function x(){u.read().then(({done:w,value:y})=>{if(w)m.close();else{_+=y.byteLength;let A=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let T=0,L=h.length;T<L;T++){let v=h[T];v.onProgress&&v.onProgress(A)}m.enqueue(y),x()}},w=>{m.error(w)})}}});return new Response(g)}else throw new xf(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{Li.add(`file:${e}`,c);let h=ms[e];delete ms[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=ms[e];if(h===void 0)throw this.manager.itemError(e),c;delete ms[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},ou=class extends En{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new xi(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):Je(l),r.manager.itemError(e)}},n,i)}parse(e){let t=[];for(let n=0;n<e.length;n++){let i=Ks.parse(e[n]);t.push(i)}return t}},au=class extends En{constructor(e){super(e)}load(e,t,n,i){let r=this,o=[],a=new Cr,l=new xi(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(r.withCredentials);let c=0;function h(u){l.load(e[u],function(d){let f=r.parse(d,!0);o[u]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(a.minFilter=qt),a.image=o,a.format=f.format,a.needsUpdate=!0,t&&t(a))},n,i)}if(Array.isArray(e))for(let u=0,d=e.length;u<d;++u)h(u);else l.load(e,function(u){let d=r.parse(u,!0);if(d.isCubemap){let f=d.mipmaps.length/d.mipmapCount;for(let p=0;p<f;p++){o[p]={mipmaps:[]};for(let _=0;_<d.mipmapCount;_++)o[p].mipmaps.push(d.mipmaps[p*d.mipmapCount+_]),o[p].format=d.format,o[p].width=d.width,o[p].height=d.height}a.image=o}else a.image.width=d.width,a.image.height=d.height,a.mipmaps=d.mipmaps;d.mipmapCount===1&&(a.minFilter=qt),a.format=d.format,a.needsUpdate=!0,t&&t(a)},n,i);return a}},yo=new WeakMap,$s=class extends En{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Li.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=yo.get(o);u===void 0&&(u=[],yo.set(o,u)),u.push({onLoad:t,onError:i})}return o}let a=Io("img");function l(){h(),t&&t(this);let u=yo.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}yo.delete(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),Li.remove(`image:${e}`);let d=yo.get(this)||[];for(let f=0;f<d.length;f++){let p=d[f];p.onError&&p.onError(u)}yo.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Li.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}},lu=class extends En{constructor(e){super(e)}load(e,t,n,i){let r=new Ws;r.colorSpace=Sn;let o=new $s(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function l(c){o.load(e[c],function(h){r.images[c]=h,a++,a===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return r}},cu=class extends En{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new qn,a=new xi(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(l){let c;try{c=r.parse(l)}catch(h){i!==void 0?i(h):Je(h);return}r._applyTexData(o,c),t&&t(o,c)},n,i),o}createDataTexture(e){let t=new qn;return this._applyTexData(t,this.parse(e)),t}_applyTexData(e,t){t.image!==void 0?e.image=t.image:t.data!==void 0&&(e.image.width=t.width,e.image.height=t.height,e.image.data=t.data),e.wrapS=t.wrapS!==void 0?t.wrapS:Yn,e.wrapT=t.wrapT!==void 0?t.wrapT:Yn,e.magFilter=t.magFilter!==void 0?t.magFilter:qt,e.minFilter=t.minFilter!==void 0?t.minFilter:qt,e.anisotropy=t.anisotropy!==void 0?t.anisotropy:1,t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.mipmaps!==void 0&&(e.mipmaps=t.mipmaps,e.minFilter=Gi),t.mipmapCount===1&&(e.minFilter=qt),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),e.needsUpdate=!0}},hu=class extends En{constructor(e){super(e)}load(e,t,n,i){let r=new an,o=new $s(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},Vi=class extends Ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},zr=class extends Vi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},rf=new ct,km=new E,Gm=new E,Vr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new re(512,512),this.mapType=$n,this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $i,this._frameExtents=new re(1,1),this._viewportCount=1,this._viewports=[new Ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;km.setFromMatrixPosition(e.matrixWorld),t.position.copy(km),Gm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Gm),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){rf.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(rf,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=i?i.z/r.x:1,a=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;e.coordinateSystem===Hs||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(rf)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ph=new E,Ih=new hn,Ji=new E,Hr=class extends Ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=ni,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ph,Ih,Ji),Ji.x===1&&Ji.y===1&&Ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ph,Ih,Ji.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ph,Ih,Ji),Ji.x===1&&Ji.y===1&&Ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ph,Ih,Ji.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Fs=new E,Wm=new re,Xm=new re,rn=class extends Hr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=vr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(xr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return vr*2*Math.atan(Math.tan(xr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Fs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fs.x,Fs.y).multiplyScalar(-e/Fs.z),Fs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Fs.x,Fs.y).multiplyScalar(-e/Fs.z)}getViewSize(e,t){return this.getViewBounds(e,Wm,Xm),t.subVectors(Xm,Wm)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(xr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},yf=class extends Vr{constructor(){super(new rn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=vr*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},Bl=class extends Vi{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.target=new Ut,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new yf}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},vf=class extends Vr{constructor(){super(new rn(90,1,.5,500)),this.isPointLightShadow=!0}},zl=class extends Vi{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new vf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},js=class extends Hr{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Sf=class extends Vr{constructor(){super(new js(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Qs=class extends Vi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.target=new Ut,this.shadow=new Sf}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Vl=class extends Vi{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}},Hl=class extends Vi{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){let t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}},Qo=class{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new E)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){let n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.282095),t.addScaledVector(o[1],.488603*i),t.addScaledVector(o[2],.488603*r),t.addScaledVector(o[3],.488603*n),t.addScaledVector(o[4],1.092548*(n*i)),t.addScaledVector(o[5],1.092548*(i*r)),t.addScaledVector(o[6],.315392*(3*r*r-1)),t.addScaledVector(o[7],1.092548*(n*r)),t.addScaledVector(o[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){let n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.886227),t.addScaledVector(o[1],2*.511664*i),t.addScaledVector(o[2],2*.511664*r),t.addScaledVector(o[3],2*.511664*n),t.addScaledVector(o[4],2*.429043*n*i),t.addScaledVector(o[5],2*.429043*i*r),t.addScaledVector(o[6],.743125*r*r-.247708),t.addScaledVector(o[7],2*.429043*n*r),t.addScaledVector(o[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){let n=e.x,i=e.y,r=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*r,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*n*r,t[8]=.546274*(n*n-i*i)}},kl=class extends Vi{constructor(e=new Qo,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}toJSON(e){let t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}},Ym={},Gl=class s extends En{constructor(e){super(e),this.textures={}}load(e,t,n,i){let r=this,o=new xi(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):Je(l),r.manager.itemError(e)}},n,i)}parse(e){let t=this.createMaterialFromType(e.type);return t.fromJSON(e,this.textures),t}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return s.createMaterialFromType(e)}static createMaterialFromType(e){let n={ShadowMaterial:Al,SpriteMaterial:Gs,RawShaderMaterial:Yo,ShaderMaterial:bn,PointsMaterial:Oo,MeshPhysicalMaterial:Fr,MeshStandardMaterial:bt,MeshPhongMaterial:Rl,MeshToonMaterial:Cl,MeshNormalMaterial:Pl,MeshLambertMaterial:Il,MeshDepthMaterial:qo,MeshDistanceMaterial:Zo,MeshBasicMaterial:$t,MeshMatcapMaterial:Ll,LineDashedMaterial:Dl,LineBasicMaterial:mn,Material:pn,...Ym}[e],i;return n===void 0?(Ki(`MaterialLoader: Unknown material type "${e}". Use .registerMaterial() before starting the deserialization process.`),i=new pn):i=new n,i}static registerMaterial(e,t){Ym[e]=t}},ea=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},kr=class extends _t{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},Wl=class extends En{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new xi(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(l){i?i(l):Je(l),r.manager.itemError(e)}},n,i)}parse(e){let t={},n={};function i(f,p){if(t[p]!==void 0)return t[p];let g=f.interleavedBuffers[p],m=r(f,g.buffer),x=Eo(g.type,m),w=new Tr(x,g.stride);return w.uuid=g.uuid,g.usage!==void 0&&w.setUsage(g.usage),t[p]=w,w}function r(f,p){if(n[p]!==void 0)return n[p];let g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}let o=e.isInstancedBufferGeometry?new kr:new _t,a=e.data.index;if(a!==void 0){let f=Eo(a.type,a.array);o.setIndex(new Wt(f,1))}let l=e.data.attributes;for(let f in l){let p=l[f],_;if(p.isInterleavedBufferAttribute){let g=i(e.data,p.data);_=new Nn(g,p.itemSize,p.offset,p.normalized)}else{let g=Eo(p.type,p.array),m=p.isInstancedBufferAttribute?xs:Wt;_=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(_.name=p.name),p.usage!==void 0&&_.setUsage(p.usage),p.gpuType!==void 0&&(_.gpuType=p.gpuType),o.setAttribute(f,_)}let c=e.data.morphAttributes;if(c)for(let f in c){let p=c[f],_=[];for(let g=0,m=p.length;g<m;g++){let x=p[g],w;if(x.isInterleavedBufferAttribute){let y=i(e.data,x.data);w=new Nn(y,x.itemSize,x.offset,x.normalized)}else{let y=Eo(x.type,x.array);w=new Wt(y,x.itemSize,x.normalized)}x.name!==void 0&&(w.name=x.name),x.usage!==void 0&&w.setUsage(x.usage),x.gpuType!==void 0&&(w.gpuType=x.gpuType),_.push(w)}o.morphAttributes[f]=_}e.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);let u=e.data.groups||e.data.drawcalls||e.data.offsets;if(u!==void 0)for(let f=0,p=u.length;f!==p;++f){let _=u[f];o.addGroup(_.start,_.count,_.materialIndex)}let d=e.data.boundingSphere;return d!==void 0&&(o.boundingSphere=new Kt().fromJSON(d)),e.name&&(o.name=e.name),e.userData&&(o.userData=e.userData),o}},of={},uu=class extends En{constructor(e){super(e)}load(e,t,n,i){let r=this,o=this.path===""?ea.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||o;let a=new xi(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(u){i!==void 0&&i(u),Je("ObjectLoader: Can't parse "+e+".",u.message);return}let h=c.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),Je("ObjectLoader: Can't load "+e);return}r.parse(c,t)},n,i)}async loadAsync(e,t){let n=this,i=this.path===""?ea.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;let r=new xi(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials);let o=await r.loadAsync(e,t),a;try{a=JSON.parse(o)}catch(c){throw new Error("THREE.ObjectLoader: Can't parse "+e+". "+c.message)}let l=a.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(a)}parse(e,t){let n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),r=this.parseGeometries(e.geometries,i),o=this.parseImages(e.images,function(){t!==void 0&&t(c)}),a=this.parseTextures(e.textures,o),l=this.parseMaterials(e.materials,a),c=this.parseObject(e.object,r,l,a,n),h=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,h),this.bindLightTargets(c),t!==void 0){let u=!1;for(let d in o)if(o[d].data instanceof HTMLImageElement){u=!0;break}u===!1&&t(c)}return c}async parseAsync(e){let t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),r=await this.parseImagesAsync(e.images),o=this.parseTextures(e.textures,r),a=this.parseMaterials(e.materials,o),l=this.parseObject(e.object,i,a,o,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}static registerGeometry(e,t){of[e]=t}parseShapes(e){let t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){let r=new Qi().fromJSON(e[n]);t[r.uuid]=r}return t}parseSkeletons(e,t){let n={},i={};if(t.traverse(function(r){r.isBone&&(i[r.uuid]=r)}),e!==void 0)for(let r=0,o=e.length;r<o;r++){let a=new cl().fromJSON(e[r],i);n[a.uuid]=a}return n}parseGeometries(e,t){let n={};if(e!==void 0){let i=new Wl;for(let r=0,o=e.length;r<o;r++){let a,l=e[r];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":a=i.parse(l);break;default:l.type in Bm?a=Bm[l.type].fromJSON(l,t):l.type in of?a=of[l.type].fromJSON(l,t):Ie(`ObjectLoader: Unknown geometry type "${l.type}". Use .registerGeometry() before starting the deserialization process.`)}a.uuid=l.uuid,l.name!==void 0&&(a.name=l.name),l.userData!==void 0&&(a.userData=l.userData),n[l.uuid]=a}}return n}parseMaterials(e,t){let n={},i={};if(e!==void 0){let r=new Gl;r.setTextures(t);for(let o=0,a=e.length;o<a;o++){let l=e[o];n[l.uuid]===void 0&&(n[l.uuid]=r.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){let t={};if(e!==void 0)for(let n=0;n<e.length;n++){let i=e[n],r=Ks.parse(i);t[r.uuid]=r}return t}parseImages(e,t){let n=this,i={},r;function o(l){return l=n.manager.resolveURL(l),n.manager.itemStart(l),r.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function a(l){if(typeof l=="string"){let c=l,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return o(h)}else return l.data?{data:Eo(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){let l=new jo(t);r=new $s(l),r.setCrossOrigin(this.crossOrigin);for(let c=0,h=e.length;c<h;c++){let u=e[c],d=u.url;if(Array.isArray(d)){let f=[];for(let p=0,_=d.length;p<_;p++){let g=d[p],m=a(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new qn(m.data,m.width,m.height)))}i[u.uuid]=new mi(f)}else{let f=a(u.url);i[u.uuid]=new mi(f)}}}return i}async parseImagesAsync(e){let t=this,n={},i;async function r(o){if(typeof o=="string"){let a=o,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:t.resourcePath+a;return await i.loadAsync(l)}else return o.data?{data:Eo(o.type,o.data),width:o.width,height:o.height}:null}if(e!==void 0&&e.length>0){i=new $s(this.manager),i.setCrossOrigin(this.crossOrigin);for(let o=0,a=e.length;o<a;o++){let l=e[o],c=l.url;if(Array.isArray(c)){let h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u],p=await r(f);p!==null&&(p instanceof HTMLImageElement?h.push(p):h.push(new qn(p.data,p.width,p.height)))}n[l.uuid]=new mi(h)}else{let h=await r(l.url);n[l.uuid]=new mi(h)}}}return n}parseTextures(e,t){function n(r,o){return typeof r=="number"?r:(Ie("ObjectLoader.parseTexture: Constant should be in numeric form.",r),o[r])}let i={};if(e!==void 0)for(let r=0,o=e.length;r<o;r++){let a=e[r];a.image===void 0&&Ie('ObjectLoader: No "image" specified for',a.uuid),t[a.image]===void 0&&Ie("ObjectLoader: Undefined image",a.image);let l=t[a.image],c=l.data,h;Array.isArray(c)?(h=new Ws,c.length===6&&(h.needsUpdate=!0)):(c&&c.data?h=new qn:h=new an,c&&(h.needsUpdate=!0)),h.source=l,h.uuid=a.uuid,a.name!==void 0&&(h.name=a.name),a.mapping!==void 0&&(h.mapping=n(a.mapping,Gx)),a.channel!==void 0&&(h.channel=a.channel),a.offset!==void 0&&h.offset.fromArray(a.offset),a.repeat!==void 0&&h.repeat.fromArray(a.repeat),a.center!==void 0&&h.center.fromArray(a.center),a.rotation!==void 0&&(h.rotation=a.rotation),a.wrap!==void 0&&(h.wrapS=n(a.wrap[0],qm),h.wrapT=n(a.wrap[1],qm)),a.format!==void 0&&(h.format=a.format),a.internalFormat!==void 0&&(h.internalFormat=a.internalFormat),a.type!==void 0&&(h.type=a.type),a.colorSpace!==void 0&&(h.colorSpace=a.colorSpace),a.minFilter!==void 0&&(h.minFilter=n(a.minFilter,Zm)),a.magFilter!==void 0&&(h.magFilter=n(a.magFilter,Zm)),a.anisotropy!==void 0&&(h.anisotropy=a.anisotropy),a.flipY!==void 0&&(h.flipY=a.flipY),a.generateMipmaps!==void 0&&(h.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(h.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(h.compareFunction=a.compareFunction),a.normalized!==void 0&&(h.normalized=a.normalized),a.userData!==void 0&&(h.userData=a.userData),i[a.uuid]=h}return i}parseObject(e,t,n,i,r){let o;function a(d){return t[d]===void 0&&Ie("ObjectLoader: Undefined geometry",d),t[d]}function l(d){if(d!==void 0){if(Array.isArray(d)){let f=[];for(let p=0,_=d.length;p<_;p++){let g=d[p];n[g]===void 0&&Ie("ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[d]===void 0&&Ie("ObjectLoader: Undefined material",d),n[d]}}function c(d){return i[d]===void 0&&Ie("ObjectLoader: Undefined texture",d),i[d]}let h,u;switch(e.type){case"Scene":o=new wr,e.background!==void 0&&(Number.isInteger(e.background)?o.background=new Oe(e.background):o.background=c(e.background)),e.environment!==void 0&&(o.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?o.fog=new ol(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(o.fog=new rl(e.fog.color,e.fog.density)),e.fog.name!==""&&(o.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(o.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&o.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(o.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&o.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":o=new rn(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(o.focus=e.focus),e.zoom!==void 0&&(o.zoom=e.zoom),e.filmGauge!==void 0&&(o.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(o.filmOffset=e.filmOffset),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"OrthographicCamera":o=new js(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(o.zoom=e.zoom),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"AmbientLight":o=new Vl(e.color,e.intensity);break;case"DirectionalLight":o=new Qs(e.color,e.intensity),o.target=e.target||"";break;case"PointLight":o=new zl(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":o=new Hl(e.color,e.intensity,e.width,e.height);break;case"SpotLight":o=new Bl(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),o.target=e.target||"";break;case"HemisphereLight":o=new zr(e.color,e.groundColor,e.intensity);break;case"LightProbe":let d=new Qo().fromArray(e.sh);o=new kl(d,e.intensity);break;case"SkinnedMesh":h=a(e.geometry),u=l(e.material),o=new ll(h,u),e.bindMode!==void 0&&(o.bindMode=e.bindMode),e.bindMatrix!==void 0&&o.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(o.skeleton=e.skeleton);break;case"Mesh":h=a(e.geometry),u=l(e.material),o=new Yt(h,u);break;case"InstancedMesh":h=a(e.geometry),u=l(e.material);let f=e.count,p=e.instanceMatrix,_=e.instanceColor;o=new Rr(h,u,f),o.instanceMatrix=new xs(new Float32Array(p.array),16),_!==void 0&&(o.instanceColor=new xs(new Float32Array(_.array),_.itemSize));break;case"BatchedMesh":h=a(e.geometry),u=l(e.material),o=new ul(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,u),o.geometry=h,o.perObjectFrustumCulled=e.perObjectFrustumCulled,o.sortObjects=e.sortObjects,o._drawRanges=e.drawRanges,o._reservedRanges=e.reservedRanges,o._geometryInfo=e.geometryInfo.map(g=>{let m=null,x=null;return g.boundingBox!==void 0&&(m=new Jt().fromJSON(g.boundingBox)),g.boundingSphere!==void 0&&(x=new Kt().fromJSON(g.boundingSphere)),{...g,boundingBox:m,boundingSphere:x}}),o._instanceInfo=e.instanceInfo,o._availableInstanceIds=e._availableInstanceIds,o._availableGeometryIds=e._availableGeometryIds,o._nextIndexStart=e.nextIndexStart,o._nextVertexStart=e.nextVertexStart,o._geometryCount=e.geometryCount,o._maxInstanceCount=e.maxInstanceCount,o._maxVertexCount=e.maxVertexCount,o._maxIndexCount=e.maxIndexCount,o._geometryInitialized=e.geometryInitialized,o._matricesTexture=c(e.matricesTexture.uuid),o._indirectTexture=c(e.indirectTexture.uuid),e.colorsTexture!==void 0&&(o._colorsTexture=c(e.colorsTexture.uuid)),e.boundingSphere!==void 0&&(o.boundingSphere=new Kt().fromJSON(e.boundingSphere)),e.boundingBox!==void 0&&(o.boundingBox=new Jt().fromJSON(e.boundingBox));break;case"LOD":o=new al;break;case"Line":o=new Ni(a(e.geometry),l(e.material));break;case"LineLoop":o=new dl(a(e.geometry),l(e.material));break;case"LineSegments":o=new Zn(a(e.geometry),l(e.material));break;case"PointCloud":case"Points":o=new fl(a(e.geometry),l(e.material));break;case"Sprite":o=new Ar(l(e.material));break;case"Group":o=new fn;break;case"Bone":o=new Fo;break;default:o=new Ut}if(o.uuid=e.uuid,e.name!==void 0&&(o.name=e.name),e.matrix!==void 0?(o.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=e.matrixAutoUpdate),o.matrixAutoUpdate&&o.matrix.decompose(o.position,o.quaternion,o.scale)):(e.position!==void 0&&o.position.fromArray(e.position),e.rotation!==void 0&&o.rotation.fromArray(e.rotation),e.quaternion!==void 0&&o.quaternion.fromArray(e.quaternion),e.scale!==void 0&&o.scale.fromArray(e.scale)),e.up!==void 0&&o.up.fromArray(e.up),e.pivot!==void 0&&(o.pivot=new E().fromArray(e.pivot)),e.morphTargetDictionary!==void 0&&(o.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),e.morphTargetInfluences!==void 0&&(o.morphTargetInfluences=e.morphTargetInfluences.slice()),e.castShadow!==void 0&&(o.castShadow=e.castShadow),e.receiveShadow!==void 0&&(o.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(o.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(o.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(o.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(o.shadow.radius=e.shadow.radius),e.shadow.blurSamples!==void 0&&(o.shadow.blurSamples=e.shadow.blurSamples),e.shadow.focus!==void 0&&(o.shadow.focus=e.shadow.focus),e.shadow.aspect!==void 0&&(o.shadow.aspect=e.shadow.aspect),e.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(o.visible=e.visible),e.frustumCulled!==void 0&&(o.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(o.renderOrder=e.renderOrder),e.static!==void 0&&(o.static=e.static),e.userData!==void 0&&(o.userData=e.userData),e.layers!==void 0&&(o.layers.mask=e.layers),e.children!==void 0){let d=e.children;for(let f=0;f<d.length;f++)o.add(this.parseObject(d[f],t,n,i,r))}if(e.animations!==void 0){let d=e.animations;for(let f=0;f<d.length;f++){let p=d[f];o.animations.push(r[p])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(o.autoUpdate=e.autoUpdate);let d=e.levels;for(let f=0;f<d.length;f++){let p=d[f],_=o.getObjectByProperty("uuid",p.object);_!==void 0&&o.addLevel(_,p.distance,p.hysteresis)}}return o}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){let i=t[n.skeleton];i===void 0?Ie("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){let n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new Ut}})}},Gx={UVMapping:jl,CubeReflectionMapping:ki,CubeRefractionMapping:As,EquirectangularReflectionMapping:ca,EquirectangularRefractionMapping:ha,CubeUVReflectionMapping:Yr},qm={RepeatWrapping:Vs,ClampToEdgeWrapping:Yn,MirroredRepeatWrapping:To},Zm={NearestFilter:on,NearestMipmapNearestFilter:Qu,NearestMipmapLinearFilter:qr,LinearFilter:qt,LinearMipmapNearestFilter:ua,LinearMipmapLinearFilter:Gi},af=new WeakMap,du=class extends En{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Ie("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Ie("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Li.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{af.has(o)===!0?(i&&i(af.get(o)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);return}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Li.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),af.set(l,c),Li.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Li.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Lh,ta=class{static getContext(){return Lh===void 0&&(Lh=new(window.AudioContext||window.webkitAudioContext)),Lh}static setContext(e){Lh=e}},fu=class extends En{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new xi(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){try{let c=l.slice(0),h=ta.getContext(),u=e+"#decode";r.manager.itemStart(u),h.decodeAudioData(c,function(d){t(d),r.manager.itemEnd(u)}).catch(function(d){a(d),r.manager.itemEnd(u)})}catch(c){a(c)}},n,i);function a(l){i?i(l):Je(l),r.manager.itemError(e)}}},Jm=new ct,Km=new ct,dr=new ct,pu=class{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new rn,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new rn,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){let t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,dr.copy(e.projectionMatrix);let i=t.eyeSep/2,r=i*t.near/t.focus,o=t.near*Math.tan(xr*t.fov*.5)/t.zoom,a,l;Km.elements[12]=-i,Jm.elements[12]=i,a=-o*t.aspect+r,l=o*t.aspect+r,dr.elements[0]=2*t.near/(l-a),dr.elements[8]=(l+a)/(l-a),this.cameraL.projectionMatrix.copy(dr),a=-o*t.aspect-r,l=o*t.aspect-r,dr.elements[0]=2*t.near/(l-a),dr.elements[8]=(l+a)/(l-a),this.cameraR.projectionMatrix.copy(dr)}this.cameraL.matrix.copy(e.matrixWorld).multiply(Km),this.cameraL.matrixWorldNeedsUpdate=!0,this.cameraR.matrix.copy(e.matrixWorld).multiply(Jm),this.cameraR.matrixWorldNeedsUpdate=!0}},vo=-90,So=1,Xl=class extends Ut{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new rn(vo,So,e,t);i.layers=this.layers,this.add(i);let r=new rn(vo,So,e,t);r.layers=this.layers,this.add(r);let o=new rn(vo,So,e,t);o.layers=this.layers,this.add(o);let a=new rn(vo,So,e,t);a.layers=this.layers,this.add(a);let l=new rn(vo,So,e,t);l.layers=this.layers,this.add(l);let c=new rn(vo,So,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===ni)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Hs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Yl=class extends rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},ql=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Wx.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Wx(){this._document.hidden===!1&&this.reset()}var fr=new E,lf=new hn,Xx=new E,pr=new E,mr=new E,mu=class extends Ut{constructor(){super(),this.type="AudioListener",this.context=ta.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new ql}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e),this._timer.update();let t=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(fr,lf,Xx),pr.set(0,0,-1).applyQuaternion(lf),mr.set(0,1,0).applyQuaternion(lf),t.positionX){let n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(fr.x,n),t.positionY.linearRampToValueAtTime(fr.y,n),t.positionZ.linearRampToValueAtTime(fr.z,n),t.forwardX.linearRampToValueAtTime(pr.x,n),t.forwardY.linearRampToValueAtTime(pr.y,n),t.forwardZ.linearRampToValueAtTime(pr.z,n),t.upX.linearRampToValueAtTime(mr.x,n),t.upY.linearRampToValueAtTime(mr.y,n),t.upZ.linearRampToValueAtTime(mr.z,n)}else t.setPosition(fr.x,fr.y,fr.z),t.setOrientation(pr.x,pr.y,pr.z,mr.x,mr.y,mr.z)}},Zl=class extends Ut{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){Ie("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){Ie("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;let t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){Ie("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){Ie("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){Ie("Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(Ie("Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){Ie("Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}copy(e,t){return super.copy(e,t),e.sourceType!=="buffer"?(Ie("Audio: Audio source type cannot be copied."),this):(this.autoplay=e.autoplay,this.buffer=e.buffer,this.detune=e.detune,this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.offset=e.offset,this.duration=e.duration,this.playbackRate=e.playbackRate,this.hasPlaybackControl=e.hasPlaybackControl,this.sourceType=e.sourceType,this.filters=e.filters.slice(),this)}clone(e){return new this.constructor(this.listener).copy(this,e)}},gr=new E,$m=new hn,Yx=new E,_r=new E,gu=class extends Zl{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(gr,$m,Yx),_r.set(0,0,1).applyQuaternion($m);let t=this.panner;if(t.positionX){let n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(gr.x,n),t.positionY.linearRampToValueAtTime(gr.y,n),t.positionZ.linearRampToValueAtTime(gr.z,n),t.orientationX.linearRampToValueAtTime(_r.x,n),t.orientationY.linearRampToValueAtTime(_r.y,n),t.orientationZ.linearRampToValueAtTime(_r.z,n)}else t.setPosition(gr.x,gr.y,gr.z),t.setOrientation(_r.x,_r.y,_r.z)}},_u=class{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0,t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}},Jl=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,r=e*i+i,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){hn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){let o=this._workIndex*r;hn.multiplyQuaternionsFlat(e,o,e,t,e,n),hn.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){let o=1-i;for(let a=0;a!==r;++a){let l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*i}}},dp="\\[\\]\\.:\\/",qx=new RegExp("["+dp+"]","g"),fp="[^"+dp+"]",Zx="[^"+dp.replace("\\.","")+"]",Jx=/((?:WC+[\/:])*)/.source.replace("WC",fp),Kx=/(WCOD+)?/.source.replace("WCOD",Zx),$x=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",fp),jx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",fp),Qx=new RegExp("^"+Jx+Kx+$x+jx+"$"),ey=["material","materials","bones","map"],Mf=class{constructor(e,t,n){let i=n||Gt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Gt=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(qx,"")}static parseTrackName(e){let t=Qx.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);ey.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ie("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Je("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Je("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Je("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Je("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Je("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[i];if(o===void 0){let c=t.nodeName;Je("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Gt.Composite=Mf;Gt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Gt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Gt.prototype.GetterByBindingType=[Gt.prototype._getValue_direct,Gt.prototype._getValue_array,Gt.prototype._getValue_arrayElement,Gt.prototype._getValue_toArray];Gt.prototype.SetterByBindingTypeAndVersioning=[[Gt.prototype._setValue_direct,Gt.prototype._setValue_direct_setNeedsUpdate,Gt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Gt.prototype._setValue_array,Gt.prototype._setValue_array_setNeedsUpdate,Gt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Gt.prototype._setValue_arrayElement,Gt.prototype._setValue_arrayElement_setNeedsUpdate,Gt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Gt.prototype._setValue_fromArray,Gt.prototype._setValue_fromArray_setNeedsUpdate,Gt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var xu=class{constructor(){this.isAnimationObjectGroup=!0,this.uuid=ci(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;let e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};let t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){let e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,r=this._bindings,o=r.length,a,l=e.length,c=this.nCachedObjects_;for(let h=0,u=arguments.length;h!==u;++h){let d=arguments[h],f=d.uuid,p=t[f];if(p===void 0){p=l++,t[f]=p,e.push(d);for(let _=0,g=o;_!==g;++_)r[_].push(new Gt(d,n[_],i[_]))}else if(p<c){a=e[p];let _=--c,g=e[_];t[g.uuid]=p,e[p]=g,t[f]=_,e[_]=d;for(let m=0,x=o;m!==x;++m){let w=r[m],y=w[_],A=w[p];w[p]=y,A===void 0&&(A=new Gt(d,n[m],i[m])),w[_]=A}}else e[p]!==a&&Je("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){let e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_;for(let o=0,a=arguments.length;o!==a;++o){let l=arguments[o],c=l.uuid,h=t[c];if(h!==void 0&&h>=r){let u=r++,d=e[u];t[d.uuid]=h,e[h]=d,t[c]=u,e[u]=l;for(let f=0,p=i;f!==p;++f){let _=n[f],g=_[u],m=_[h];_[h]=g,_[u]=m}}}this.nCachedObjects_=r}uncache(){let e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_,o=e.length;for(let a=0,l=arguments.length;a!==l;++a){let c=arguments[a],h=c.uuid,u=t[h];if(u!==void 0)if(delete t[h],u<r){let d=--r,f=e[d],p=--o,_=e[p];u!==d&&(t[f.uuid]=u),e[u]=f,d!==p&&(t[_.uuid]=d),e[d]=_,e.pop();for(let g=0,m=i;g!==m;++g){let x=n[g],w=x[d],y=x[p];x[u]=w,x[d]=y,x.pop()}}else{let d=--o,f=e[d];u!==d&&(t[f.uuid]=u),e[u]=f,e.pop();for(let p=0,_=i;p!==_;++p){let g=n[p];g[u]=g[d],g.pop()}}}this.nCachedObjects_=r}subscribe_(e,t){let n=this._bindingsIndicesByPath,i=n[e],r=this._bindings;if(i!==void 0)return r[i];let o=this._paths,a=this._parsedPaths,l=this._objects,c=l.length,h=this.nCachedObjects_,u=new Array(c);i=r.length,n[e]=i,o.push(e),a.push(t),r.push(u);for(let d=h,f=l.length;d!==f;++d){let p=l[d];u[d]=new Gt(p,e,t)}return u}unsubscribe_(e){let t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){let i=this._paths,r=this._parsedPaths,o=this._bindings,a=o.length-1,l=o[a],c=i[a];t[c]=n,o[n]=l,o.pop(),r[n]=r[a],r.pop(),i[n]=i[a],i.pop()}}},Kl=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let r=t.tracks,o=r.length,a=new Array(o),l={endingStart:Bs,endingEnd:Bs};for(let c=0;c!==o;++c){let h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=Kf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,r=i.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case od:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Nc:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,r=this._loopCount,o=n===$f;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===Jf){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){let a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this._loopCount=r,this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=zs,i.endingEnd=zs):(e?i.endingStart=this.zeroSlopeAtStart?zs:Bs:i.endingStart=Ro,t?i.endingEnd=this.zeroSlopeAtEnd?zs:Bs:i.endingEnd=Ro)}_scheduleFading(e,t,n){let i=this._mixer,r=i.time,o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}},ty=new Float32Array(1),yu=class extends ii{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){let d=i[u],f=d.name,p=h[f];if(p!==void 0)++p.referenceCount,o[u]=p;else{if(p=o[u],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}let _=t&&t._propertyBindings[u].binding.parsedPath;p=new Jl(Gt.create(n,f,_),d.ValueTypeName,d.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),o[u]=p}a[u].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,r=this._bindings,o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new Jo(new Float32Array(2),new Float32Array(2),1,ty),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let i=t||this._root,r=i.uuid,o=typeof e=="string"?Ks.findByName(i,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Nc),l!==void 0){let u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let h=new Kl(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(e,t){let n=t||this._root,i=n.uuid,r=typeof e=="string"?Ks.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}},vu=class extends Do{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isRenderTarget3D=!0,this.depth=n;for(let r=0;r<this.textures.length;r++){let o=new Mr(null,e,t,n);o.isRenderTargetTexture=!0,o.renderTarget=this,this.textures[r]=o}this._setTextureOptions(i)}},Su=class s{constructor(e){this.value=e}clone(){return new s(this.value.clone===void 0?this.value:this.value.clone())}},ny=0,Mu=class extends ii{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:ny++}),this.name="",this.usage=Bc,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){let t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(e){this.name=e.name,this.usage=e.usage;let t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){let r=Array.isArray(t[n])?t[n]:[t[n]];for(let o=0;o<r.length;o++)this.uniforms.push(r[o].clone())}return this}clone(){return new this.constructor().copy(this)}},bs=class extends Tr{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}},bu=class{constructor(e,t,n,i,r,o=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=r,this.normalized=o,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}},jm=new ct,na=class{constructor(e,t,n=0,i=1/0){this.ray=new Ui(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new br,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Je("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return jm.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(jm),this}intersectObject(e,t=!0,n=[]){return bf(e,this,n,t),n.sort(Qm),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)bf(e[i],this,n,t);return n.sort(Qm),n}};function Qm(s,e){return s.distance-e.distance}function bf(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)bf(r[o],e,t,!0)}}var Eu=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Ie("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}},Gr=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ut(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ut(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},wu=class{constructor(e=1,t=0,n=0){this.radius=e,this.theta=t,this.y=n}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}},Tu=class s{static{s.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}},eg=new re,$l=class{constructor(e=new re(1/0,1/0),t=new re(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=eg.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,eg).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},tg=new E,Dh=new E,Mo=new E,bo=new E,cf=new E,iy=new E,sy=new E,ia=class{constructor(e=new E,t=new E){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){tg.subVectors(e,this.start),Dh.subVectors(this.end,this.start);let n=Dh.dot(Dh);if(n===0)return 0;let r=Dh.dot(tg)/n;return t&&(r=ut(r,0,1)),r}closestPointToPoint(e,t,n){let i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=iy,n=sy){let i=10000000000000001e-32,r,o,a=this.start,l=e.start,c=this.end,h=e.end;Mo.subVectors(c,a),bo.subVectors(h,l),cf.subVectors(a,l);let u=Mo.dot(Mo),d=bo.dot(bo),f=bo.dot(cf);if(u<=i&&d<=i)return t.copy(a),n.copy(l),t.sub(n),t.dot(t);if(u<=i)r=0,o=f/d,o=ut(o,0,1);else{let p=Mo.dot(cf);if(d<=i)o=0,r=ut(-p/u,0,1);else{let _=Mo.dot(bo),g=u*d-_*_;g!==0?r=ut((_*f-p*d)/g,0,1):r=0,o=(_*r+f)/d,o<0?(o=0,r=ut(-p/u,0,1)):o>1&&(o=1,r=ut((_-p)/u,0,1))}}return t.copy(a).addScaledVector(Mo,r),n.copy(l).addScaledVector(bo,o),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}},ng=new E,Au=class extends Ut{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";let n=new _t,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,l=32;o<l;o++,a++){let c=o/l*Math.PI*2,h=a/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new Be(i,3));let r=new mn({fog:!1,toneMapped:!1});this.cone=new Zn(n,r),this.add(this.cone),this.update()}dispose(){super.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorldNeedsUpdate=!0;let e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),ng.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(ng),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}},Os=new E,Uh=new ct,hf=new ct,Ru=class extends Zn{constructor(e){let t=p0(e),n=new _t,i=[],r=[];for(let c=0;c<t.length;c++){let h=t[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(0,0,0),r.push(0,0,0))}n.setAttribute("position",new Be(i,3)),n.setAttribute("color",new Be(r,3));let o=new mn({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,o),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1;let a=new Oe(255),l=new Oe(65280);this.setColors(a,l)}updateMatrixWorld(e){let t=this.bones,n=this.geometry,i=n.getAttribute("position");hf.copy(this.root.matrixWorld).invert();for(let r=0,o=0;r<t.length;r++){let a=t[r];a.parent&&a.parent.isBone&&(Uh.multiplyMatrices(hf,a.matrixWorld),Os.setFromMatrixPosition(Uh),i.setXYZ(o,Os.x,Os.y,Os.z),Uh.multiplyMatrices(hf,a.parent.matrixWorld),Os.setFromMatrixPosition(Uh),i.setXYZ(o+1,Os.x,Os.y,Os.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}setColors(e,t){let i=this.geometry.getAttribute("color");for(let r=0;r<i.count;r+=2)i.setXYZ(r,e.r,e.g,e.b),i.setXYZ(r+1,t.r,t.g,t.b);return i.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function p0(s){let e=[];s.isBone===!0&&e.push(s);for(let t=0;t<s.children.length;t++)e.push(...p0(s.children[t]));return e}var Cu=class extends Yt{constructor(e,t,n){let i=new hi(t,4,2),r=new $t({wireframe:!0,fog:!1,toneMapped:!1});super(i,r),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}},ry=new E,ig=new Oe,sg=new Oe,Pu=class extends Ut{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";let i=new Xo(t);i.rotateY(Math.PI*.5),this.material=new $t({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);let r=i.getAttribute("position"),o=new Float32Array(r.count*3);i.setAttribute("color",new Wt(o,3)),this.add(new Yt(i,this.material)),this.update()}dispose(){super.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){let e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{let t=e.geometry.getAttribute("color");ig.copy(this.light.color),sg.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){let r=n<i/2?ig:sg;t.setXYZ(n,r.r,r.g,r.b)}t.needsUpdate=!0}this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),e.lookAt(ry.setFromMatrixPosition(this.light.matrixWorld).negate())}},Iu=class extends Zn{constructor(e=10,t=10,n=4473924,i=8947848){n=new Oe(n),i=new Oe(i);let r=t/2,o=e/t,a=e/2,l=[],c=[];for(let d=0,f=0,p=-a;d<=t;d++,p+=o){l.push(-a,0,p,a,0,p),l.push(p,0,-a,p,0,a);let _=d===r?n:i;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}let h=new _t;h.setAttribute("position",new Be(l,3)),h.setAttribute("color",new Be(c,3));let u=new mn({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Lu=class extends Zn{constructor(e=10,t=16,n=8,i=64,r=4473924,o=8947848){r=new Oe(r),o=new Oe(o);let a=[],l=[];if(t>1)for(let u=0;u<t;u++){let d=u/t*(Math.PI*2),f=Math.sin(d)*e,p=Math.cos(d)*e;a.push(0,0,0),a.push(f,0,p);let _=u&1?r:o;l.push(_.r,_.g,_.b),l.push(_.r,_.g,_.b)}for(let u=0;u<n;u++){let d=u&1?r:o,f=e-e/n*u;for(let p=0;p<i;p++){let _=p/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f;a.push(g,0,m),l.push(d.r,d.g,d.b),_=(p+1)/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f,a.push(g,0,m),l.push(d.r,d.g,d.b)}}let c=new _t;c.setAttribute("position",new Be(a,3)),c.setAttribute("color",new Be(l,3));let h=new mn({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},rg=new E,Nh=new E,og=new E,Du=class extends Ut{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new _t;i.setAttribute("position",new Be([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));let r=new mn({fog:!1,toneMapped:!1});this.lightPlane=new Ni(i,r),this.add(this.lightPlane),i=new _t,i.setAttribute("position",new Be([0,0,0,0,0,1],3)),this.targetLine=new Ni(i,r),this.add(this.targetLine),this.update()}dispose(){super.dispose(),this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),rg.setFromMatrixPosition(this.light.matrixWorld),Nh.setFromMatrixPosition(this.light.target.matrixWorld),og.subVectors(Nh,rg),this.lightPlane.lookAt(Nh),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(Nh),this.targetLine.scale.z=og.length()}},Fh=new E,sn=new Hr,Uu=class extends Zn{constructor(e){let t=new _t,n=new mn({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],r=[],o={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(p,_){l(p),l(_)}function l(p){i.push(0,0,0),r.push(0,0,0),o[p]===void 0&&(o[p]=[]),o[p].push(i.length/3-1)}t.setAttribute("position",new Be(i,3)),t.setAttribute("color",new Be(r,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();let c=new Oe(16755200),h=new Oe(16711680),u=new Oe(43775),d=new Oe(16777215),f=new Oe(3355443);this.setColors(c,h,u,d,f)}setColors(e,t,n,i,r){let a=this.geometry.getAttribute("color");return a.setXYZ(0,e.r,e.g,e.b),a.setXYZ(1,e.r,e.g,e.b),a.setXYZ(2,e.r,e.g,e.b),a.setXYZ(3,e.r,e.g,e.b),a.setXYZ(4,e.r,e.g,e.b),a.setXYZ(5,e.r,e.g,e.b),a.setXYZ(6,e.r,e.g,e.b),a.setXYZ(7,e.r,e.g,e.b),a.setXYZ(8,e.r,e.g,e.b),a.setXYZ(9,e.r,e.g,e.b),a.setXYZ(10,e.r,e.g,e.b),a.setXYZ(11,e.r,e.g,e.b),a.setXYZ(12,e.r,e.g,e.b),a.setXYZ(13,e.r,e.g,e.b),a.setXYZ(14,e.r,e.g,e.b),a.setXYZ(15,e.r,e.g,e.b),a.setXYZ(16,e.r,e.g,e.b),a.setXYZ(17,e.r,e.g,e.b),a.setXYZ(18,e.r,e.g,e.b),a.setXYZ(19,e.r,e.g,e.b),a.setXYZ(20,e.r,e.g,e.b),a.setXYZ(21,e.r,e.g,e.b),a.setXYZ(22,e.r,e.g,e.b),a.setXYZ(23,e.r,e.g,e.b),a.setXYZ(24,t.r,t.g,t.b),a.setXYZ(25,t.r,t.g,t.b),a.setXYZ(26,t.r,t.g,t.b),a.setXYZ(27,t.r,t.g,t.b),a.setXYZ(28,t.r,t.g,t.b),a.setXYZ(29,t.r,t.g,t.b),a.setXYZ(30,t.r,t.g,t.b),a.setXYZ(31,t.r,t.g,t.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,i.r,i.g,i.b),a.setXYZ(39,i.r,i.g,i.b),a.setXYZ(40,r.r,r.g,r.b),a.setXYZ(41,r.r,r.g,r.b),a.setXYZ(42,r.r,r.g,r.b),a.setXYZ(43,r.r,r.g,r.b),a.setXYZ(44,r.r,r.g,r.b),a.setXYZ(45,r.r,r.g,r.b),a.setXYZ(46,r.r,r.g,r.b),a.setXYZ(47,r.r,r.g,r.b),a.setXYZ(48,r.r,r.g,r.b),a.setXYZ(49,r.r,r.g,r.b),a.needsUpdate=!0,this}update(){let e=this.geometry,t=this.pointMap,n=1,i=1,r,o;if(sn.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)r=1,o=0;else if(this.camera.coordinateSystem===ni)r=-1,o=1;else if(this.camera.coordinateSystem===Hs)r=0,o=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);cn("c",t,e,sn,0,0,r),cn("t",t,e,sn,0,0,o),cn("n1",t,e,sn,-n,-i,r),cn("n2",t,e,sn,n,-i,r),cn("n3",t,e,sn,-n,i,r),cn("n4",t,e,sn,n,i,r),cn("f1",t,e,sn,-n,-i,o),cn("f2",t,e,sn,n,-i,o),cn("f3",t,e,sn,-n,i,o),cn("f4",t,e,sn,n,i,o),cn("u1",t,e,sn,n*.7,i*1.1,r),cn("u2",t,e,sn,-n*.7,i*1.1,r),cn("u3",t,e,sn,0,i*2,r),cn("cf1",t,e,sn,-n,0,o),cn("cf2",t,e,sn,n,0,o),cn("cf3",t,e,sn,0,-i,o),cn("cf4",t,e,sn,0,i,o),cn("cn1",t,e,sn,-n,0,r),cn("cn2",t,e,sn,n,0,r),cn("cn3",t,e,sn,0,-i,r),cn("cn4",t,e,sn,0,i,r),e.getAttribute("position").needsUpdate=!0}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function cn(s,e,t,n,i,r,o){Fh.set(i,r,o).unproject(n);let a=e[s];if(a!==void 0){let l=t.getAttribute("position");for(let c=0,h=a.length;c<h;c++)l.setXYZ(a[c],Fh.x,Fh.y,Fh.z)}}var Oh=new Jt,Nu=class extends Zn{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),r=new _t;r.setIndex(new Wt(n,1)),r.setAttribute("position",new Wt(i,3)),super(r,new mn({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&Oh.setFromObject(this.object),Oh.isEmpty())return;let e=Oh.min,t=Oh.max,n=this.geometry.attributes.position,i=n.array;i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=e.x,i[4]=t.y,i[5]=t.z,i[6]=e.x,i[7]=e.y,i[8]=t.z,i[9]=t.x,i[10]=e.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=e.z,i[15]=e.x,i[16]=t.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=t.x,i[22]=e.y,i[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Fu=class extends Zn{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new _t;r.setIndex(new Wt(n,1)),r.setAttribute("position",new Be(i,3)),super(r,new mn({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){let t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Ou=class extends Ni{constructor(e,t=1,n=16776960){let i=n,r=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new _t;o.setAttribute("position",new Be(r,3)),o.computeBoundingSphere(),super(o,new mn({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;let a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new _t;l.setAttribute("position",new Be(a,3)),l.computeBoundingSphere(),this.add(new Yt(l,new $t({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}},ag=new E,Bh,uf,Bu=class extends Ut{constructor(e=new E(0,0,1),t=new E(0,0,0),n=1,i=16776960,r=n*.2,o=r*.2){super(),this.type="ArrowHelper",Bh===void 0&&(Bh=new _t,Bh.setAttribute("position",new Be([0,0,0,0,1,0],3)),uf=new zo(.5,1,5,1),uf.translate(0,-.5,0)),this.position.copy(t),this.line=new Ni(Bh,new mn({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Yt(uf,new $t({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{ag.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(ag,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},zu=class extends Zn{constructor(e=1){let t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new _t;i.setAttribute("position",new Be(t,3)),i.setAttribute("color",new Be(n,3));let r=new mn({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,t,n){let i=new Oe,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(t),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Vu=class{constructor(){this.type="ShapePath",this.color=new Oe,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(e,t){return this.currentPath=new Js,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,r,o){return this.currentPath.bezierCurveTo(e,t,n,i,r,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(){function e(l,c){let h=!1,u=c.length;for(let d=0,f=u-1;d<u;f=d++){let p=c[d],_=c[f];p.y>l.y!=_.y>l.y&&l.x<(_.x-p.x)*(l.y-p.y)/(_.y-p.y)+p.x&&(h=!h)}return h}function t(l,c){let h=c.getCenter(new re);if(e(h,l))return h;let u=h.y,d=[],f=l.length;for(let p=0;p<f;p++){let _=l[p],g=l[(p+1)%f];if(_.y>u!=g.y>u){let m=_.x+(u-_.y)*(g.x-_.x)/(g.y-_.y);d.push(m)}}return d.length>1&&(d.sort((p,_)=>p-_),h.x=(d[0]+d[1])/2),h}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(Ie('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");let i=n==="nonzero"?(l=>l!==0):(l=>(l&1)!==0),r=[];for(let l of this.subPaths){let c=l.getPoints();if(c.length<3)continue;let h=gi.area(c);if(h===0)continue;let u=new $l;for(let d=0;d<c.length;d++)u.expandByPoint(c[d]);r.push({subPath:l,points:c,boundingBox:u,interiorPoint:t(c,u),absArea:Math.abs(h),winding:h<0?-1:1,container:null,exclude:!1,role:null})}r.sort((l,c)=>c.absArea-l.absArea);for(let l=0;l<r.length;l++){let c=r[l],h=0;for(let u=l-1;u>=0;u--){let d=r[u];if(d.boundingBox.containsBox(c.boundingBox)&&e(c.interiorPoint,d.points)){c.container=d.exclude?d.container:d,h=d.winding,c.winding+=h;break}}i(c.winding)===i(h)&&(c.exclude=!0)}for(let l of r)l.exclude||(l.role=l.container===null||l.container.role==="hole"?"outer":"hole");let o=[],a=new Map;for(let l of r){if(l.exclude||l.role!=="outer")continue;let c=new Qi;c.curves=l.subPath.curves,o.push(c),a.set(l,c)}for(let l of r){if(l.exclude||l.role!=="hole")continue;let c=a.get(l.container);if(!c)continue;let h=new Js;h.curves=l.subPath.curves,c.holes.push(h)}return o}},sa=class extends ii{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function oy(s,e){let t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2):(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0),s}function ay(s,e){let t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0):(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2),s}function ly(s){return s.repeat.x=1,s.repeat.y=1,s.offset.x=0,s.offset.y=0,s}function ld(s,e,t,n){let i=cy(n);switch(t){case sd:return s*e;case nc:return s*e/i.components*i.byteLength;case da:return s*e/i.components*i.byteLength;case Cs:return s*e*2/i.components*i.byteLength;case ic:return s*e*2/i.components*i.byteLength;case rd:return s*e*3/i.components*i.byteLength;case Un:return s*e*4/i.components*i.byteLength;case sc:return s*e*4/i.components*i.byteLength;case fa:case pa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ma:case ga:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case oc:case lc:return Math.max(s,16)*Math.max(e,8)/4;case rc:case ac:return Math.max(s,8)*Math.max(e,8)/2;case cc:case hc:case dc:case fc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case uc:case _a:case pc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case mc:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case gc:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case _c:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case xc:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case yc:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case vc:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Sc:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Mc:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case bc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Ec:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case wc:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Tc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Ac:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Rc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case Cc:case Pc:case Ic:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Lc:case Dc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case xa:case Uc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function cy(s){switch(s){case $n:case ed:return{byteLength:1,components:1};case Zr:case td:case vi:return{byteLength:2,components:1};case ec:case tc:return{byteLength:2,components:4};case di:case Ql:case Dn:return{byteLength:4,components:1};case nd:case id:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}var Hu=class{static contain(e,t){return oy(e,t)}static cover(e,t){return ay(e,t)}static fill(e){return ly(e)}static getByteLength(e,t,n,i){return ld(e,t,n,i)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ie("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function F0(){let s=null,e=!1,t=null,n=null;function i(r,o){n=s.requestAnimationFrame(i),t(r,o)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function hy(s){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,p)=>f.start-p.start);let d=0;for(let f=1;f<u.length;f++){let p=u[d],_=u[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,p=u.length;f<p;f++){let _=u[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var uy=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dy=`#ifdef USE_ALPHAHASH
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
#endif`,fy=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,py=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,my=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gy=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_y=`#ifdef USE_AOMAP
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
#endif`,xy=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yy=`#ifdef USE_BATCHING
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
#endif`,vy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sy=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,My=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,by=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ey=`#ifdef USE_IRIDESCENCE
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
#endif`,wy=`#ifdef USE_BUMPMAP
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
#endif`,Ty=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ay=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ry=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Py=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Iy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ly=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Dy=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Uy=`#define PI 3.141592653589793
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
} // validated`,Ny=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Fy=`vec3 transformedNormal = objectNormal;
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
#endif`,Oy=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,By=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zy=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vy=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hy="gl_FragColor = linearToOutputTexel( gl_FragColor );",ky=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gy=`#ifdef USE_ENVMAP
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
#endif`,Wy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Xy=`#ifdef USE_ENVMAP
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
#endif`,Yy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qy=`#ifdef USE_ENVMAP
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
#endif`,Zy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ky=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$y=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jy=`#ifdef USE_GRADIENTMAP
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
}`,Qy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ev=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,nv=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,iv=`#ifdef USE_ENVMAP
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
#endif`,sv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ov=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,av=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lv=`PhysicalMaterial material;
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
#endif`,cv=`uniform sampler2D dfgLUT;
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
}`,hv=`
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
#endif`,uv=`#if defined( RE_IndirectDiffuse )
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
#endif`,dv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fv=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,pv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_v=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Sv=`#if defined( USE_POINTS_UV )
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
#endif`,Mv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ev=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Tv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Av=`#ifdef USE_MORPHTARGETS
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
#endif`,Rv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Pv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Iv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Uv=`#ifdef USE_NORMALMAP
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
#endif`,Nv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ov=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Hv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,kv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Wv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Kv=`float getShadowMask() {
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
}`,$v=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jv=`#ifdef USE_SKINNING
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
#endif`,Qv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,eS=`#ifdef USE_SKINNING
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
#endif`,tS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,nS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,iS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,rS=`#ifdef USE_TRANSMISSION
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
#endif`,oS=`#ifdef USE_TRANSMISSION
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
#endif`,aS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,uS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dS=`uniform sampler2D t2D;
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
}`,fS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pS=`#ifdef ENVMAP_TYPE_CUBE
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
}`,mS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_S=`#include <common>
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
}`,xS=`#if DEPTH_PACKING == 3200
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
}`,yS=`#define DISTANCE
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
}`,vS=`#define DISTANCE
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
}`,SS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,MS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bS=`uniform float scale;
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
}`,ES=`uniform vec3 diffuse;
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
}`,wS=`#include <common>
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
}`,TS=`uniform vec3 diffuse;
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
}`,AS=`#define LAMBERT
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
}`,RS=`#define LAMBERT
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
}`,CS=`#define MATCAP
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
}`,PS=`#define MATCAP
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
}`,IS=`#define NORMAL
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
}`,LS=`#define NORMAL
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
}`,DS=`#define PHONG
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
}`,US=`#define PHONG
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
}`,NS=`#define STANDARD
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
}`,FS=`#define STANDARD
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
}`,OS=`#define TOON
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
}`,BS=`#define TOON
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
}`,zS=`uniform float size;
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
}`,VS=`uniform vec3 diffuse;
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
}`,HS=`#include <common>
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
}`,kS=`uniform vec3 color;
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
}`,GS=`uniform float rotation;
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
}`,WS=`uniform vec3 diffuse;
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
}`,Mt={alphahash_fragment:uy,alphahash_pars_fragment:dy,alphamap_fragment:fy,alphamap_pars_fragment:py,alphatest_fragment:my,alphatest_pars_fragment:gy,aomap_fragment:_y,aomap_pars_fragment:xy,batching_pars_vertex:yy,batching_vertex:vy,begin_vertex:Sy,beginnormal_vertex:My,bsdfs:by,iridescence_fragment:Ey,bumpmap_pars_fragment:wy,clipping_planes_fragment:Ty,clipping_planes_pars_fragment:Ay,clipping_planes_pars_vertex:Ry,clipping_planes_vertex:Cy,color_fragment:Py,color_pars_fragment:Iy,color_pars_vertex:Ly,color_vertex:Dy,common:Uy,cube_uv_reflection_fragment:Ny,defaultnormal_vertex:Fy,displacementmap_pars_vertex:Oy,displacementmap_vertex:By,emissivemap_fragment:zy,emissivemap_pars_fragment:Vy,colorspace_fragment:Hy,colorspace_pars_fragment:ky,envmap_fragment:Gy,envmap_common_pars_fragment:Wy,envmap_pars_fragment:Xy,envmap_pars_vertex:Yy,envmap_physical_pars_fragment:iv,envmap_vertex:qy,fog_vertex:Zy,fog_pars_vertex:Jy,fog_fragment:Ky,fog_pars_fragment:$y,gradientmap_pars_fragment:jy,lightmap_pars_fragment:Qy,lights_lambert_fragment:ev,lights_lambert_pars_fragment:tv,lights_pars_begin:nv,lights_toon_fragment:sv,lights_toon_pars_fragment:rv,lights_phong_fragment:ov,lights_phong_pars_fragment:av,lights_physical_fragment:lv,lights_physical_pars_fragment:cv,lights_fragment_begin:hv,lights_fragment_maps:uv,lights_fragment_end:dv,lightprobes_pars_fragment:fv,logdepthbuf_fragment:pv,logdepthbuf_pars_fragment:mv,logdepthbuf_pars_vertex:gv,logdepthbuf_vertex:_v,map_fragment:xv,map_pars_fragment:yv,map_particle_fragment:vv,map_particle_pars_fragment:Sv,metalnessmap_fragment:Mv,metalnessmap_pars_fragment:bv,morphinstance_vertex:Ev,morphcolor_vertex:wv,morphnormal_vertex:Tv,morphtarget_pars_vertex:Av,morphtarget_vertex:Rv,normal_fragment_begin:Cv,normal_fragment_maps:Pv,normal_pars_fragment:Iv,normal_pars_vertex:Lv,normal_vertex:Dv,normalmap_pars_fragment:Uv,clearcoat_normal_fragment_begin:Nv,clearcoat_normal_fragment_maps:Fv,clearcoat_pars_fragment:Ov,iridescence_pars_fragment:Bv,opaque_fragment:zv,packing:Vv,premultiplied_alpha_fragment:Hv,project_vertex:kv,dithering_fragment:Gv,dithering_pars_fragment:Wv,roughnessmap_fragment:Xv,roughnessmap_pars_fragment:Yv,shadowmap_pars_fragment:qv,shadowmap_pars_vertex:Zv,shadowmap_vertex:Jv,shadowmask_pars_fragment:Kv,skinbase_vertex:$v,skinning_pars_vertex:jv,skinning_vertex:Qv,skinnormal_vertex:eS,specularmap_fragment:tS,specularmap_pars_fragment:nS,tonemapping_fragment:iS,tonemapping_pars_fragment:sS,transmission_fragment:rS,transmission_pars_fragment:oS,uv_pars_fragment:aS,uv_pars_vertex:lS,uv_vertex:cS,worldpos_vertex:hS,background_vert:uS,background_frag:dS,backgroundCube_vert:fS,backgroundCube_frag:pS,cube_vert:mS,cube_frag:gS,depth_vert:_S,depth_frag:xS,distance_vert:yS,distance_frag:vS,equirect_vert:SS,equirect_frag:MS,linedashed_vert:bS,linedashed_frag:ES,meshbasic_vert:wS,meshbasic_frag:TS,meshlambert_vert:AS,meshlambert_frag:RS,meshmatcap_vert:CS,meshmatcap_frag:PS,meshnormal_vert:IS,meshnormal_frag:LS,meshphong_vert:DS,meshphong_frag:US,meshphysical_vert:NS,meshphysical_frag:FS,meshtoon_vert:OS,meshtoon_frag:BS,points_vert:zS,points_frag:VS,shadow_vert:HS,shadow_frag:kS,sprite_vert:GS,sprite_frag:WS},Ae={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new gt},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new gt}},envmap:{envMap:{value:null},envMapRotation:{value:new gt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new gt},normalScale:{value:new re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new E},probesMax:{value:new E},probesResolution:{value:new E}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0},uvTransform:{value:new gt}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new gt},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0}}},zn={basic:{uniforms:Bn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:Mt.meshbasic_vert,fragmentShader:Mt.meshbasic_frag},lambert:{uniforms:Bn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Oe(0)},envMapIntensity:{value:1}}]),vertexShader:Mt.meshlambert_vert,fragmentShader:Mt.meshlambert_frag},phong:{uniforms:Bn([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Mt.meshphong_vert,fragmentShader:Mt.meshphong_frag},standard:{uniforms:Bn([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Mt.meshphysical_vert,fragmentShader:Mt.meshphysical_frag},toon:{uniforms:Bn([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Mt.meshtoon_vert,fragmentShader:Mt.meshtoon_frag},matcap:{uniforms:Bn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:Mt.meshmatcap_vert,fragmentShader:Mt.meshmatcap_frag},points:{uniforms:Bn([Ae.points,Ae.fog]),vertexShader:Mt.points_vert,fragmentShader:Mt.points_frag},dashed:{uniforms:Bn([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Mt.linedashed_vert,fragmentShader:Mt.linedashed_frag},depth:{uniforms:Bn([Ae.common,Ae.displacementmap]),vertexShader:Mt.depth_vert,fragmentShader:Mt.depth_frag},normal:{uniforms:Bn([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:Mt.meshnormal_vert,fragmentShader:Mt.meshnormal_frag},sprite:{uniforms:Bn([Ae.sprite,Ae.fog]),vertexShader:Mt.sprite_vert,fragmentShader:Mt.sprite_frag},background:{uniforms:{uvTransform:{value:new gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Mt.background_vert,fragmentShader:Mt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new gt}},vertexShader:Mt.backgroundCube_vert,fragmentShader:Mt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Mt.cube_vert,fragmentShader:Mt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Mt.equirect_vert,fragmentShader:Mt.equirect_frag},distance:{uniforms:Bn([Ae.common,Ae.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Mt.distance_vert,fragmentShader:Mt.distance_frag},shadow:{uniforms:Bn([Ae.lights,Ae.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:Mt.shadow_vert,fragmentShader:Mt.shadow_frag}};zn.physical={uniforms:Bn([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new gt},clearcoatNormalScale:{value:new re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new gt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new gt},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new gt},transmissionSamplerSize:{value:new re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new gt},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new gt},anisotropyVector:{value:new re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new gt}}]),vertexShader:Mt.meshphysical_vert,fragmentShader:Mt.meshphysical_frag};var cd={r:0,b:0,g:0},XS=new ct,O0=new gt;O0.set(-1,0,0,0,1,0,0,0,1);function YS(s,e,t,n,i,r){let o=new Oe(0),a=i===!0?0:1,l,c,h=null,u=0,d=null;function f(x){let w=x.isScene===!0?x.background:null;if(w&&w.isTexture){let y=x.backgroundBlurriness>0;w=e.get(w,y)}return w}function p(x){let w=!1,y=f(x);y===null?g(o,a):y&&y.isColor&&(g(y,1),w=!0);let A=s.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||w)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(x,w){let y=f(w);y&&(y.isCubeTexture||y.mapping===Yr)?(c===void 0&&(c=new Yt(new Jn(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:Kr(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:Fn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(XS.makeRotationFromEuler(w.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(O0),c.material.toneMapped=Tt.getTransfer(y.colorSpace)!==Vt,(h!==y||u!==y.version||d!==s.toneMapping)&&(c.material.needsUpdate=!0,h=y,u=y.version,d=s.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Yt(new Oi(2,2),new bn({name:"BackgroundMaterial",uniforms:Kr(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:Ts,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,l.material.toneMapped=Tt.getTransfer(y.colorSpace)!==Vt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||u!==y.version||d!==s.toneMapping)&&(l.material.needsUpdate=!0,h=y,u=y.version,d=s.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function g(x,w){x.getRGB(cd,hp(s)),t.buffers.color.setClear(cd.r,cd.g,cd.b,w,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(x,w=1){o.set(x),a=w,g(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(x){a=x,g(o,a)},render:p,addToRenderList:_,dispose:m}}function qS(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(B,k,X,U,z){let V=!1,G=u(B,U,X,k);r!==G&&(r=G,c(r.object)),V=f(B,U,X,z),V&&p(B,U,X,z),z!==null&&e.update(z,s.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,y(B,k,X,U),z!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return s.createVertexArray()}function c(B){return s.bindVertexArray(B)}function h(B){return s.deleteVertexArray(B)}function u(B,k,X,U){let z=U.wireframe===!0,V=n[k.id];V===void 0&&(V={},n[k.id]=V);let G=B.isInstancedMesh===!0?B.id:0,Q=V[G];Q===void 0&&(Q={},V[G]=Q);let Y=Q[X.id];Y===void 0&&(Y={},Q[X.id]=Y);let j=Y[z];return j===void 0&&(j=d(l()),Y[z]=j),j}function d(B){let k=[],X=[],U=[];for(let z=0;z<t;z++)k[z]=0,X[z]=0,U[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:X,attributeDivisors:U,object:B,attributes:{},index:null}}function f(B,k,X,U){let z=r.attributes,V=k.attributes,G=0,Q=X.getAttributes();for(let Y in Q)if(Q[Y].location>=0){let ie=z[Y],ze=V[Y];if(ze===void 0&&(Y==="instanceMatrix"&&B.instanceMatrix&&(ze=B.instanceMatrix),Y==="instanceColor"&&B.instanceColor&&(ze=B.instanceColor)),ie===void 0||ie.attribute!==ze||ze&&ie.data!==ze.data)return!0;G++}return r.attributesNum!==G||r.index!==U}function p(B,k,X,U){let z={},V=k.attributes,G=0,Q=X.getAttributes();for(let Y in Q)if(Q[Y].location>=0){let ie=V[Y];ie===void 0&&(Y==="instanceMatrix"&&B.instanceMatrix&&(ie=B.instanceMatrix),Y==="instanceColor"&&B.instanceColor&&(ie=B.instanceColor));let ze={};ze.attribute=ie,ie&&ie.data&&(ze.data=ie.data),z[Y]=ze,G++}r.attributes=z,r.attributesNum=G,r.index=U}function _(){let B=r.newAttributes;for(let k=0,X=B.length;k<X;k++)B[k]=0}function g(B){m(B,0)}function m(B,k){let X=r.newAttributes,U=r.enabledAttributes,z=r.attributeDivisors;X[B]=1,U[B]===0&&(s.enableVertexAttribArray(B),U[B]=1),z[B]!==k&&(s.vertexAttribDivisor(B,k),z[B]=k)}function x(){let B=r.newAttributes,k=r.enabledAttributes;for(let X=0,U=k.length;X<U;X++)k[X]!==B[X]&&(s.disableVertexAttribArray(X),k[X]=0)}function w(B,k,X,U,z,V,G){G===!0?s.vertexAttribIPointer(B,k,X,z,V):s.vertexAttribPointer(B,k,X,U,z,V)}function y(B,k,X,U){_();let z=U.attributes,V=X.getAttributes(),G=k.defaultAttributeValues;for(let Q in V){let Y=V[Q];if(Y.location>=0){let j=z[Q];if(j===void 0&&(Q==="instanceMatrix"&&B.instanceMatrix&&(j=B.instanceMatrix),Q==="instanceColor"&&B.instanceColor&&(j=B.instanceColor)),j!==void 0){let ie=j.normalized,ze=j.itemSize,Ge=e.get(j);if(Ge===void 0)continue;let at=Ge.buffer,xt=Ge.type,st=Ge.bytesPerElement,$=xt===s.INT||xt===s.UNSIGNED_INT||j.gpuType===Ql;if(j.isInterleavedBufferAttribute){let ae=j.data,Me=ae.stride,rt=j.offset;if(ae.isInstancedInterleavedBuffer){for(let He=0;He<Y.locationSize;He++)m(Y.location+He,ae.meshPerAttribute);B.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let He=0;He<Y.locationSize;He++)g(Y.location+He);s.bindBuffer(s.ARRAY_BUFFER,at);for(let He=0;He<Y.locationSize;He++)w(Y.location+He,ze/Y.locationSize,xt,ie,Me*st,(rt+ze/Y.locationSize*He)*st,$)}else{if(j.isInstancedBufferAttribute){for(let ae=0;ae<Y.locationSize;ae++)m(Y.location+ae,j.meshPerAttribute);B.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let ae=0;ae<Y.locationSize;ae++)g(Y.location+ae);s.bindBuffer(s.ARRAY_BUFFER,at);for(let ae=0;ae<Y.locationSize;ae++)w(Y.location+ae,ze/Y.locationSize,xt,ie,ze*st,ze/Y.locationSize*ae*st,$)}}else if(G!==void 0){let ie=G[Q];if(ie!==void 0)switch(ie.length){case 2:s.vertexAttrib2fv(Y.location,ie);break;case 3:s.vertexAttrib3fv(Y.location,ie);break;case 4:s.vertexAttrib4fv(Y.location,ie);break;default:s.vertexAttrib1fv(Y.location,ie)}}}}x()}function A(){R();for(let B in n){let k=n[B];for(let X in k){let U=k[X];for(let z in U){let V=U[z];for(let G in V)h(V[G].object),delete V[G];delete U[z]}}delete n[B]}}function T(B){if(n[B.id]===void 0)return;let k=n[B.id];for(let X in k){let U=k[X];for(let z in U){let V=U[z];for(let G in V)h(V[G].object),delete V[G];delete U[z]}}delete n[B.id]}function L(B){for(let k in n){let X=n[k];for(let U in X){let z=X[U];if(z[B.id]===void 0)continue;let V=z[B.id];for(let G in V)h(V[G].object),delete V[G];delete z[B.id]}}}function v(B){for(let k in n){let X=n[k],U=B.isInstancedMesh===!0?B.id:0,z=X[U];if(z!==void 0){for(let V in z){let G=z[V];for(let Q in G)h(G[Q].object),delete G[Q];delete z[V]}delete X[U],Object.keys(X).length===0&&delete n[k]}}}function R(){I(),o=!0,r!==i&&(r=i,c(r.object))}function I(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:I,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:v,releaseStatesOfProgram:L,initAttributes:_,enableAttribute:g,disableUnusedAttributes:x}}function ZS(s,e,t){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function a(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let f=0;f<h;f++)d+=c[f];t.update(d,n,1)}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function JS(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let L=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(L){return!(L!==Un&&n.convert(L)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(L){let v=L===vi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==$n&&L!==Dn&&!v&&n.convert(L)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(L){if(L==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Ie("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&Ie("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),w=s.getParameter(s.MAX_VARYING_VECTORS),y=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:x,maxVaryings:w,maxFragmentUniforms:y,maxSamples:A,samples:T}}function KS(s){let e=this,t=null,n=0,i=!1,r=!1,o=new ti,a=new gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let p=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,m=s.get(u);if(!i||p===null||p.length===0||r&&!g)r?h(null):c();else{let x=r?0:n,w=x*4,y=m.clippingState||null;l.value=y,y=h(p,d,w,f);for(let A=0;A!==w;++A)y[A]=t[A];m.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,p){let _=u!==null?u.length:0,g=null;if(_!==0){if(g=l.value,p!==!0||g===null){let m=f+_*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<m)&&(g=new Float32Array(m));for(let w=0,y=f;w!==_;++w,y+=4)o.copy(u[w]).applyMatrix4(x,a),o.normal.toArray(g,y),g[y+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}var Sa=4,$S=6,jS=20,QS=256,zc=new js,m0=new Oe,pp=null,mp=0,gp=0,_p=!1,eM=new E,$r=new E,kc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:o=256,position:a=eM}=r;pp=this._renderer.getRenderTarget(),mp=this._renderer.getActiveCubeFace(),gp=this._renderer.getActiveMipmapLevel(),_p=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=x0(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_0(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(pp,mp,gp),this._renderer.xr.enabled=_p,e.scissorTest=!1,va(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ki||e.mapping===As?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),pp=this._renderer.getRenderTarget(),mp=this._renderer.getActiveCubeFace(),gp=this._renderer.getActiveMipmapLevel(),_p=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:qt,minFilter:qt,generateMipmaps:!1,type:vi,format:Un,colorSpace:Co,depthBuffer:!1},i=g0(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=g0(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=tM(r)),this._blurMaterial=iM(r,e,t),this._ggxMaterial=nM(r,e,t)}return i}_compileMaterial(e){let t=new Yt(new _t,e);this._renderer.compile(t,zc)}_sceneToCubeUV(e,t,n,i,r){let l=new rn(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(m0),u.toneMapping=yi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Yt(new Jn,new $t({name:"PMREM.Background",side:Fn,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,g=_.material,m=!1,x=e.background;x?x.isColor&&(g.color.copy(x),e.background=null,m=!0):(g.color.copy(m0),m=!0);for(let w=0;w<6;w++){let y=w%3;y===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[w],r.y,r.z)):y===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[w]));let A=this._cubeSize;va(i,y*A,w>2?A:0,A,A),u.setRenderTarget(i),m&&u.render(_,l),u.render(e,l)}u.toneMapping=f,u.autoClear=d,e.background=x}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===ki||e.mapping===As;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=x0()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_0());let r=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=r;let a=r.uniforms;a.envMap.value=e;let l=this._cubeSize;va(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,zc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let i=this._renderer,r=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;let l=o.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-h*h),d=c*1.25,f=u*d,{_lodMax:p}=this,_=this._sizeLods[n],g=3*_*(n>p-Sa?n-p+Sa:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,va(r,g,m,3*_,2*_),i.setRenderTarget(r),i.render(a,zc),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,va(e,g,m,3*_,2*_),i.setRenderTarget(e),i.render(a,zc)}_blur(e,t,n,i){let r=this._pingPongRenderTarget,o=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,o),this._blurPass(r,e,n,n,o)}_blurPass(e,t,n,i,r){let o=this._renderer,a=this._blurMaterial,l=this._lodMeshes[i];l.material=a;let c=a.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[i],u=3*h*(i>this._lodMax-Sa?i-this._lodMax+Sa:0),d=4*(this._cubeSize-h);va(t,u,d,3*h,2*h),o.setRenderTarget(t),o.render(l,zc)}};function tM(s){let e=[],t=[],n=s,i=s-Sa+1+$S;for(let r=0;r<i;r++){let o=Math.pow(2,n);e.push(o);let a=1/(o-2),l=-a,c=1+a,h=[l,l,c,l,c,c,l,l,c,c,l,c],u=6,d=6,f=3,p=new Float32Array(f*d*u),_=new Float32Array(f*d*u);for(let m=0;m<u;m++){let x=m%3*2/3-1,w=m>2?0:-1,y=[x,w,0,x+2/3,w,0,x+2/3,w+1,0,x,w,0,x+2/3,w+1,0,x,w+1,0];p.set(y,f*d*m);for(let A=0;A<d;A++){let T=h[A*2]*2-1,L=h[A*2+1]*2-1;m===0?$r.set(1,L,T):m===1?$r.set(-T,1,-L):m===2?$r.set(-T,L,1):m===3?$r.set(-1,L,-T):m===4?$r.set(-T,-1,L):$r.set(T,L,-1),$r.toArray(_,(m*d+A)*f)}}let g=new _t;g.setAttribute("position",new Wt(p,f)),g.setAttribute("outputDirection",new Wt(_,f)),t.push(new Yt(g,null)),n>Sa&&n--}return{lodMeshes:t,sizeLods:e}}function g0(s,e,t){let n=new Mn(s,e,t);return n.texture.mapping=Yr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function va(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function nM(s,e,t){return new bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:QS,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ud(),fragmentShader:`

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
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function iM(s,e,t){return new bn({name:"SphericalGaussianBlur",defines:{SAMPLES:jS,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ud(),fragmentShader:`

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
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function _0(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ud(),fragmentShader:`

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
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function x0(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ud(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hi,depthTest:!1,depthWrite:!1})}function ud(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Gc=class extends Mn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ws(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Jn(5,5,5),r=new bn({name:"CubemapFromEquirect",uniforms:Kr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Fn,blending:Hi});r.uniforms.tEquirect.value=t;let o=new Yt(i,r),a=t.minFilter;return t.minFilter===Gi&&(t.minFilter=qt),new Xl(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}};function sM(s){let e=new WeakMap,t=new WeakMap,n=null;function i(d,f=!1){return d==null?null:f?o(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===ca||f===ha)if(e.has(d)){let p=e.get(d).texture;return a(p,d.mapping)}else{let p=d.image;if(p&&p.height>0){let _=new Gc(p.height);return _.fromEquirectangularTexture(s,d),e.set(d,_),d.addEventListener("dispose",c),a(_.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){let f=d.mapping,p=f===ca||f===ha,_=f===ki||f===As;if(p||_){let g=t.get(d),m=g!==void 0?g.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==m)return n===null&&(n=new kc(s)),g=p?n.fromEquirectangular(d,g):n.fromCubemap(d,g),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),g.texture;if(g!==void 0)return g.texture;{let x=d.image;return p&&x&&x.height>0||_&&x&&l(x)?(n===null&&(n=new kc(s)),g=p?n.fromEquirectangular(d):n.fromCubemap(d),g.texture.pmremVersion=d.pmremVersion,t.set(d,g),d.addEventListener("dispose",h),g.texture):null}}}return d}function a(d,f){return f===ca?d.mapping=ki:f===ha&&(d.mapping=As),d}function l(d){let f=0,p=6;for(let _=0;_<p;_++)d[_]!==void 0&&f++;return f===p}function c(d){let f=d.target;f.removeEventListener("dispose",c);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(d){let f=d.target;f.removeEventListener("dispose",h);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function rM(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Ki("WebGLRenderer: "+n+" extension not supported."),i}}}function oM(s,e,t,n){let i={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let p in d.attributes)e.remove(d.attributes[p]);d.removeEventListener("dispose",o),delete i[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],s.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,p=u.attributes.position,_=0;if(p===void 0)return;if(f!==null){let x=f.array;_=f.version;for(let w=0,y=x.length;w<y;w+=3){let A=x[w+0],T=x[w+1],L=x[w+2];d.push(A,T,T,L,L,A)}}else{let x=p.array;_=p.version;for(let w=0,y=x.length/3-1;w<y;w+=3){let A=w+0,T=w+1,L=w+2;d.push(A,T,T,L,L,A)}}let g=new(p.count>=65535?No:Uo)(d,1);g.version=_;let m=r.get(u);m&&e.remove(m),r.set(u,g)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function aM(s,e,t){let n;function i(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,d){s.drawElements(n,d,r,u*o),t.update(d,n,1)}function c(u,d,f){f!==0&&(s.drawElementsInstanced(n,d,r,u*o,f),t.update(d,n,f))}function h(u,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,u,0,f);let _=0;for(let g=0;g<f;g++)_+=d[g];t.update(_,n,1)}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function lM(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:Je("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function cM(s,e,t){let n=new WeakMap,i=new Ct;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let R=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",R)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],x=a.morphAttributes.color||[],w=0;f===!0&&(w=1),p===!0&&(w=2),_===!0&&(w=3);let y=a.attributes.position.count*w,A=1;y>e.maxTextureSize&&(A=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let T=new Float32Array(y*A*4*u),L=new Sr(T,y,A,u);L.type=Dn,L.needsUpdate=!0;let v=w*4;for(let I=0;I<u;I++){let B=g[I],k=m[I],X=x[I],U=y*A*4*I;for(let z=0;z<B.count;z++){let V=z*v;f===!0&&(i.fromBufferAttribute(B,z),T[U+V+0]=i.x,T[U+V+1]=i.y,T[U+V+2]=i.z,T[U+V+3]=0),p===!0&&(i.fromBufferAttribute(k,z),T[U+V+4]=i.x,T[U+V+5]=i.y,T[U+V+6]=i.z,T[U+V+7]=0),_===!0&&(i.fromBufferAttribute(X,z),T[U+V+8]=i.x,T[U+V+9]=i.y,T[U+V+10]=i.z,T[U+V+11]=X.itemSize===4?i.w:1)}}d={count:u,texture:L,size:new re(y,A)},n.set(a,d),a.addEventListener("dispose",R)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let p=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function hM(s,e,t,n,i){let r=new WeakMap;function o(c){let h=i.render.frame,u=c.geometry,d=e.get(c,u);if(r.get(d)!==h&&(e.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return d}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}var uM={[qu]:"LINEAR_TONE_MAPPING",[Zu]:"REINHARD_TONE_MAPPING",[Ju]:"CINEON_TONE_MAPPING",[la]:"ACES_FILMIC_TONE_MAPPING",[$u]:"AGX_TONE_MAPPING",[ju]:"NEUTRAL_TONE_MAPPING",[Ku]:"CUSTOM_TONE_MAPPING"};function dM(s,e,t,n,i,r){let o=new Mn(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=new _t;c.setAttribute("position",new Be([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Be([0,2,0,0,2,0],2));let h=new Yo({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Yt(c,h),d=new js(-1,1,1,-1,0,1),f=null,p=null,_=!1,g,m=null,x=[],w=!1;this.setSize=function(y,A){o.setSize(y,A),a!==null&&a.setSize(y,A),l!==null&&l.setSize(y,A);for(let T=0;T<x.length;T++){let L=x[T];L.setSize&&L.setSize(y,A)}},this.setEffects=function(y){x=y,w=x.length>0&&x[0].isRenderPass===!0;let A=o.width,T=o.height;x.length>0&&a===null&&(a=new Mn(A,T,{type:vi,depthBuffer:!1,stencilBuffer:!1}),l=new Mn(A,T,{type:vi,depthBuffer:!1,stencilBuffer:!1}));for(let L=0;L<x.length;L++){let v=x[L];v.setSize&&v.setSize(A,T)}},this.begin=function(y,A){if(_||y.toneMapping===yi&&x.length===0)return!1;if(m=A,A!==null){let T=A.width,L=A.height;(o.width!==T||o.height!==L)&&this.setSize(T,L)}return w===!1&&y.setRenderTarget(o),g=y.toneMapping,y.toneMapping=yi,!0},this.hasRenderPass=function(){return w},this.end=function(y,A){y.toneMapping=g,_=!0;let T=o,L=a;for(let v=0;v<x.length;v++){let R=x[v];R.enabled!==!1&&(R.render(y,L,T,A),R.needsSwap!==!1&&(T=L,L=L===a?l:a))}if(f!==y.outputColorSpace||p!==y.toneMapping){f=y.outputColorSpace,p=y.toneMapping,h.defines={},Tt.getTransfer(f)===Vt&&(h.defines.SRGB_TRANSFER="");let v=uM[p];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=T.texture,y.setRenderTarget(m),y.render(u,d),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var B0=new an,vp=new ys(1,1),z0=new Sr,V0=new Mr,H0=new Ws,y0=[],v0=[],S0=new Float32Array(16),M0=new Float32Array(9),b0=new Float32Array(4);function ba(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=y0[i];if(r===void 0&&(r=new Float32Array(i),y0[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function gn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function _n(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function dd(s,e){let t=v0[e];t===void 0&&(t=new Int32Array(e),v0[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function fM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function pM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gn(t,e))return;s.uniform2fv(this.addr,e),_n(t,e)}}function mM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(gn(t,e))return;s.uniform3fv(this.addr,e),_n(t,e)}}function gM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gn(t,e))return;s.uniform4fv(this.addr,e),_n(t,e)}}function _M(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(gn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),_n(t,e)}else{if(gn(t,n))return;b0.set(n),s.uniformMatrix2fv(this.addr,!1,b0),_n(t,n)}}function xM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(gn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),_n(t,e)}else{if(gn(t,n))return;M0.set(n),s.uniformMatrix3fv(this.addr,!1,M0),_n(t,n)}}function yM(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(gn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),_n(t,e)}else{if(gn(t,n))return;S0.set(n),s.uniformMatrix4fv(this.addr,!1,S0),_n(t,n)}}function vM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function SM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gn(t,e))return;s.uniform2iv(this.addr,e),_n(t,e)}}function MM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gn(t,e))return;s.uniform3iv(this.addr,e),_n(t,e)}}function bM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gn(t,e))return;s.uniform4iv(this.addr,e),_n(t,e)}}function EM(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function wM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gn(t,e))return;s.uniform2uiv(this.addr,e),_n(t,e)}}function TM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gn(t,e))return;s.uniform3uiv(this.addr,e),_n(t,e)}}function AM(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gn(t,e))return;s.uniform4uiv(this.addr,e),_n(t,e)}}function RM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(vp.compareFunction=t.isReversedDepthBuffer()?Oc:Fc,r=vp):r=B0,t.setTexture2D(e||r,i)}function CM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||V0,i)}function PM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||H0,i)}function IM(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||z0,i)}function LM(s){switch(s){case 5126:return fM;case 35664:return pM;case 35665:return mM;case 35666:return gM;case 35674:return _M;case 35675:return xM;case 35676:return yM;case 5124:case 35670:return vM;case 35667:case 35671:return SM;case 35668:case 35672:return MM;case 35669:case 35673:return bM;case 5125:return EM;case 36294:return wM;case 36295:return TM;case 36296:return AM;case 35678:case 36198:case 36298:case 36306:case 35682:return RM;case 35679:case 36299:case 36307:return CM;case 35680:case 36300:case 36308:case 36293:return PM;case 36289:case 36303:case 36311:case 36292:return IM}}function DM(s,e){s.uniform1fv(this.addr,e)}function UM(s,e){let t=ba(e,this.size,2);s.uniform2fv(this.addr,t)}function NM(s,e){let t=ba(e,this.size,3);s.uniform3fv(this.addr,t)}function FM(s,e){let t=ba(e,this.size,4);s.uniform4fv(this.addr,t)}function OM(s,e){let t=ba(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function BM(s,e){let t=ba(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function zM(s,e){let t=ba(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function VM(s,e){s.uniform1iv(this.addr,e)}function HM(s,e){s.uniform2iv(this.addr,e)}function kM(s,e){s.uniform3iv(this.addr,e)}function GM(s,e){s.uniform4iv(this.addr,e)}function WM(s,e){s.uniform1uiv(this.addr,e)}function XM(s,e){s.uniform2uiv(this.addr,e)}function YM(s,e){s.uniform3uiv(this.addr,e)}function qM(s,e){s.uniform4uiv(this.addr,e)}function ZM(s,e,t){let n=this.cache,i=e.length,r=dd(t,i);gn(n,r)||(s.uniform1iv(this.addr,r),_n(n,r));let o;this.type===s.SAMPLER_2D_SHADOW?o=vp:o=B0;for(let a=0;a!==i;++a)t.setTexture2D(e[a]||o,r[a])}function JM(s,e,t){let n=this.cache,i=e.length,r=dd(t,i);gn(n,r)||(s.uniform1iv(this.addr,r),_n(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||V0,r[o])}function KM(s,e,t){let n=this.cache,i=e.length,r=dd(t,i);gn(n,r)||(s.uniform1iv(this.addr,r),_n(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||H0,r[o])}function $M(s,e,t){let n=this.cache,i=e.length,r=dd(t,i);gn(n,r)||(s.uniform1iv(this.addr,r),_n(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||z0,r[o])}function jM(s){switch(s){case 5126:return DM;case 35664:return UM;case 35665:return NM;case 35666:return FM;case 35674:return OM;case 35675:return BM;case 35676:return zM;case 5124:case 35670:return VM;case 35667:case 35671:return HM;case 35668:case 35672:return kM;case 35669:case 35673:return GM;case 5125:return WM;case 36294:return XM;case 36295:return YM;case 36296:return qM;case 35678:case 36198:case 36298:case 36306:case 35682:return ZM;case 35679:case 36299:case 36307:return JM;case 35680:case 36300:case 36308:case 36293:return KM;case 36289:case 36303:case 36311:case 36292:return $M}}var Sp=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=LM(t.type)}},Mp=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jM(t.type)}},bp=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},xp=/(\w+)(\])?(\[|\.)?/g;function E0(s,e){s.seq.push(e),s.map[e.id]=e}function QM(s,e,t){let n=s.name,i=n.length;for(xp.lastIndex=0;;){let r=xp.exec(n),o=xp.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){E0(t,c===void 0?new Sp(a,s,e):new Mp(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new bp(a),E0(t,u)),t=u}}}var Ma=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);QM(a,l,this)}let i=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(o):r.push(o);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};function w0(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var eb=37297,tb=0;function nb(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}var T0=new gt;function ib(s){Tt._getMatrix(T0,Tt.workingColorSpace,s);let e=`mat3( ${T0.elements.map(t=>t.toFixed(4))} )`;switch(Tt.getTransfer(s)){case Po:return[e,"LinearTransferOETF"];case Vt:return[e,"sRGBTransferOETF"];default:return Ie("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function A0(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+nb(s.getShaderSource(e),a)}else return r}function sb(s,e){let t=ib(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var rb={[qu]:"Linear",[Zu]:"Reinhard",[Ju]:"Cineon",[la]:"ACESFilmic",[$u]:"AgX",[ju]:"Neutral",[Ku]:"Custom"};function ob(s,e){let t=rb[e];return t===void 0?(Ie("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var hd=new E;function ab(){Tt.getLuminanceCoefficients(hd);let s=hd.x.toFixed(4),e=hd.y.toFixed(4),t=hd.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lb(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hc).join(`
`)}function cb(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function hb(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function Hc(s){return s!==""}function R0(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function C0(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var ub=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ep(s){return s.replace(ub,fb)}var db=new Map;function fb(s,e){let t=Mt[e];if(t===void 0){let n=db.get(e);if(n!==void 0)t=Mt[n],Ie('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Ep(t)}var pb=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function P0(s){return s.replace(pb,mb)}function mb(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function I0(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}var gb={[ra]:"SHADOWMAP_TYPE_PCF",[Wr]:"SHADOWMAP_TYPE_VSM"};function _b(s){return gb[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var xb={[ki]:"ENVMAP_TYPE_CUBE",[As]:"ENVMAP_TYPE_CUBE",[Yr]:"ENVMAP_TYPE_CUBE_UV"};function yb(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":xb[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var vb={[As]:"ENVMAP_MODE_REFRACTION"};function Sb(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":vb[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Mb={[aa]:"ENVMAP_BLENDING_MULTIPLY",[Yf]:"ENVMAP_BLENDING_MIX",[qf]:"ENVMAP_BLENDING_ADD"};function bb(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":Mb[s.combine]||"ENVMAP_BLENDING_NONE"}function Eb(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function wb(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=_b(t),c=yb(t),h=Sb(t),u=bb(t),d=Eb(t),f=lb(t),p=cb(r),_=i.createProgram(),g,m,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Hc).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Hc).join(`
`),m.length>0&&(m+=`
`)):(g=[I0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hc).join(`
`),m=[I0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yi?"#define TONE_MAPPING":"",t.toneMapping!==yi?Mt.tonemapping_pars_fragment:"",t.toneMapping!==yi?ob("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Mt.colorspace_pars_fragment,sb("linearToOutputTexel",t.outputColorSpace),ab(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Hc).join(`
`)),o=Ep(o),o=R0(o,t),o=C0(o,t),a=Ep(a),a=R0(a,t),a=C0(a,t),o=P0(o),a=P0(a),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===ad?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ad?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let w=x+g+o,y=x+m+a,A=w0(i,i.VERTEX_SHADER,w),T=w0(i,i.FRAGMENT_SHADER,y);i.attachShader(_,A),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function L(B){if(s.debug.checkShaderErrors){let k=i.getProgramInfoLog(_)||"",X=i.getShaderInfoLog(A)||"",U=i.getShaderInfoLog(T)||"",z=k.trim(),V=X.trim(),G=U.trim(),Q=!0,Y=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(Q=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,A,T);else{let j=A0(i,A,"vertex"),ie=A0(i,T,"fragment");Je("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+z+`
`+j+`
`+ie)}else z!==""?Ie("WebGLProgram: Program Info Log:",z):(V===""||G==="")&&(Y=!1);Y&&(B.diagnostics={runnable:Q,programLog:z,vertexShader:{log:V,prefix:g},fragmentShader:{log:G,prefix:m}})}i.deleteShader(A),i.deleteShader(T),v=new Ma(i,_),R=hb(i,_)}let v;this.getUniforms=function(){return v===void 0&&L(this),v};let R;this.getAttributes=function(){return R===void 0&&L(this),R};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=i.getProgramParameter(_,eb)),I},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=tb++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=T,this}var Tb=0,wp=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Tp(e),t.set(e,n)),n}},Tp=class{constructor(e){this.id=Tb++,this.code=e,this.usedTimes=0}};function Ab(s){return s===Cs||s===_a||s===xa}function Rb(s,e,t,n,i,r){let o=new br,a=new wp,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,d=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function _(v,R,I,B,k,X){let U=B.fog,z=k.geometry,V=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?B.environment:null,G=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,Q=e.get(v.envMap||V,G),Y=Q&&Q.mapping===Yr?Q.image.height:null,j=f[v.type];v.precision!==null&&(d=n.getMaxPrecision(v.precision),d!==v.precision&&Ie("WebGLProgram.getParameters:",v.precision,"not supported, using",d,"instead."));let ie=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ze=ie!==void 0?ie.length:0,Ge=0;z.morphAttributes.position!==void 0&&(Ge=1),z.morphAttributes.normal!==void 0&&(Ge=2),z.morphAttributes.color!==void 0&&(Ge=3);let at,xt,st,$;if(j){let Dt=zn[j];at=Dt.vertexShader,xt=Dt.fragmentShader}else{at=v.vertexShader,xt=v.fragmentShader;let Dt=a.getVertexShaderStage(v),Ot=a.getFragmentShaderStage(v);a.update(v,Dt,Ot),st=Dt.id,$=Ot.id}let ae=s.getRenderTarget(),Me=s.state.buffers.depth.getReversed(),rt=k.isInstancedMesh===!0,He=k.isBatchedMesh===!0,ot=!!v.map,Nt=!!v.matcap,ce=!!Q,fe=!!v.aoMap,pe=!!v.lightMap,ge=!!v.bumpMap&&v.wireframe===!1,Te=!!v.normalMap,tt=!!v.displacementMap,Ke=!!v.emissiveMap,nt=!!v.metalnessMap,lt=!!v.roughnessMap,O=v.anisotropy>0,Ft=v.clearcoat>0,St=v.dispersion>0,P=v.retroreflectivity>0,M=v.iridescence>0,W=v.sheen>0,J=v.transmission>0,te=O&&!!v.anisotropyMap,ve=Ft&&!!v.clearcoatMap,we=Ft&&!!v.clearcoatNormalMap,ne=Ft&&!!v.clearcoatRoughnessMap,le=M&&!!v.iridescenceMap,Le=M&&!!v.iridescenceThicknessMap,$e=W&&!!v.sheenColorMap,Ne=W&&!!v.sheenRoughnessMap,De=!!v.specularMap,Ze=!!v.specularColorMap,it=!!v.specularIntensityMap,je=J&&!!v.transmissionMap,F=J&&!!v.thicknessMap,be=!!v.gradientMap,se=!!v.alphaMap,ue=v.alphaTest>0,Ee=!!v.alphaHash,he=!!v.extensions,Ve=yi;v.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Ve=s.toneMapping);let We={shaderID:j,shaderType:v.type,shaderName:v.name,vertexShader:at,fragmentShader:xt,defines:v.defines,customVertexShaderID:st,customFragmentShaderID:$,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:d,batching:He,batchingColor:He&&k._colorsTexture!==null,instancing:rt,instancingColor:rt&&k.instanceColor!==null,instancingMorph:rt&&k.morphTexture!==null,outputColorSpace:ae===null?s.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Tt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:ot,matcap:Nt,envMap:ce,envMapMode:ce&&Q.mapping,envMapCubeUVHeight:Y,aoMap:fe,lightMap:pe,bumpMap:ge,normalMap:Te,displacementMap:tt,emissiveMap:Ke,normalMapObjectSpace:Te&&v.normalMapType===Qf,normalMapTangentSpace:Te&&v.normalMapType===ns,packedNormalMap:Te&&v.normalMapType===ns&&Ab(v.normalMap.format),metalnessMap:nt,roughnessMap:lt,anisotropy:O,anisotropyMap:te,clearcoat:Ft,clearcoatMap:ve,clearcoatNormalMap:we,clearcoatRoughnessMap:ne,dispersion:St,retroreflection:P,iridescence:M,iridescenceMap:le,iridescenceThicknessMap:Le,sheen:W,sheenColorMap:$e,sheenRoughnessMap:Ne,specularMap:De,specularColorMap:Ze,specularIntensityMap:it,transmission:J,transmissionMap:je,thicknessMap:F,gradientMap:be,opaque:v.transparent===!1&&v.blending===Xr&&v.alphaToCoverage===!1,alphaMap:se,alphaTest:ue,alphaHash:Ee,combine:v.combine,mapUv:ot&&p(v.map.channel),aoMapUv:fe&&p(v.aoMap.channel),lightMapUv:pe&&p(v.lightMap.channel),bumpMapUv:ge&&p(v.bumpMap.channel),normalMapUv:Te&&p(v.normalMap.channel),displacementMapUv:tt&&p(v.displacementMap.channel),emissiveMapUv:Ke&&p(v.emissiveMap.channel),metalnessMapUv:nt&&p(v.metalnessMap.channel),roughnessMapUv:lt&&p(v.roughnessMap.channel),anisotropyMapUv:te&&p(v.anisotropyMap.channel),clearcoatMapUv:ve&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:we&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ne&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:Le&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:$e&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:Ne&&p(v.sheenRoughnessMap.channel),specularMapUv:De&&p(v.specularMap.channel),specularColorMapUv:Ze&&p(v.specularColorMap.channel),specularIntensityMapUv:it&&p(v.specularIntensityMap.channel),transmissionMapUv:je&&p(v.transmissionMap.channel),thicknessMapUv:F&&p(v.thicknessMap.channel),alphaMapUv:se&&p(v.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(Te||O),vertexNormals:!!z.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!z.attributes.uv&&(ot||se),fog:!!U,useFog:v.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||z.attributes.normal===void 0&&Te===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Me,skinning:k.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:ze,morphTextureStride:Ge,numSunLights:R.sun.length,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numSunLightShadows:R.sunShadowMap.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:X.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ve,decodeVideoTexture:ot&&v.map.isVideoTexture===!0&&Tt.getTransfer(v.map.colorSpace)===Vt,decodeVideoTextureEmissive:Ke&&v.emissiveMap.isVideoTexture===!0&&Tt.getTransfer(v.emissiveMap.colorSpace)===Vt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===ui,flipSided:v.side===Fn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:he&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(he&&v.extensions.multiDraw===!0||He)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return We.vertexUv1s=l.has(1),We.vertexUv2s=l.has(2),We.vertexUv3s=l.has(3),l.clear(),We}function g(v){let R=[];if(v.shaderID?R.push(v.shaderID):(R.push(v.customVertexShaderID),R.push(v.customFragmentShaderID)),v.defines!==void 0)for(let I in v.defines)R.push(I),R.push(v.defines[I]);return v.isRawShaderMaterial===!1&&(m(R,v),x(R,v),R.push(s.outputColorSpace)),R.push(v.customProgramCacheKey),R.join()}function m(v,R){v.push(R.precision),v.push(R.outputColorSpace),v.push(R.envMapMode),v.push(R.envMapCubeUVHeight),v.push(R.mapUv),v.push(R.alphaMapUv),v.push(R.lightMapUv),v.push(R.aoMapUv),v.push(R.bumpMapUv),v.push(R.normalMapUv),v.push(R.displacementMapUv),v.push(R.emissiveMapUv),v.push(R.metalnessMapUv),v.push(R.roughnessMapUv),v.push(R.anisotropyMapUv),v.push(R.clearcoatMapUv),v.push(R.clearcoatNormalMapUv),v.push(R.clearcoatRoughnessMapUv),v.push(R.iridescenceMapUv),v.push(R.iridescenceThicknessMapUv),v.push(R.sheenColorMapUv),v.push(R.sheenRoughnessMapUv),v.push(R.specularMapUv),v.push(R.specularColorMapUv),v.push(R.specularIntensityMapUv),v.push(R.transmissionMapUv),v.push(R.thicknessMapUv),v.push(R.combine),v.push(R.fogExp2),v.push(R.sizeAttenuation),v.push(R.morphTargetsCount),v.push(R.morphAttributeCount),v.push(R.numSunLights),v.push(R.numDirLights),v.push(R.numPointLights),v.push(R.numSpotLights),v.push(R.numSpotLightMaps),v.push(R.numHemiLights),v.push(R.numRectAreaLights),v.push(R.numSunLightShadows),v.push(R.numDirLightShadows),v.push(R.numPointLightShadows),v.push(R.numSpotLightShadows),v.push(R.numSpotLightShadowsWithMaps),v.push(R.numLightProbes),v.push(R.shadowMapType),v.push(R.toneMapping),v.push(R.numClippingPlanes),v.push(R.numClipIntersection),v.push(R.depthPacking)}function x(v,R){o.disableAll(),R.instancing&&o.enable(0),R.instancingColor&&o.enable(1),R.instancingMorph&&o.enable(2),R.matcap&&o.enable(3),R.envMap&&o.enable(4),R.normalMapObjectSpace&&o.enable(5),R.normalMapTangentSpace&&o.enable(6),R.clearcoat&&o.enable(7),R.iridescence&&o.enable(8),R.alphaTest&&o.enable(9),R.vertexColors&&o.enable(10),R.vertexAlphas&&o.enable(11),R.vertexUv1s&&o.enable(12),R.vertexUv2s&&o.enable(13),R.vertexUv3s&&o.enable(14),R.vertexTangents&&o.enable(15),R.anisotropy&&o.enable(16),R.alphaHash&&o.enable(17),R.batching&&o.enable(18),R.dispersion&&o.enable(19),R.retroreflection&&o.enable(24),R.batchingColor&&o.enable(20),R.gradientMap&&o.enable(21),R.packedNormalMap&&o.enable(22),R.vertexNormals&&o.enable(23),v.push(o.mask),o.disableAll(),R.fog&&o.enable(0),R.useFog&&o.enable(1),R.flatShading&&o.enable(2),R.logarithmicDepthBuffer&&o.enable(3),R.reversedDepthBuffer&&o.enable(4),R.skinning&&o.enable(5),R.morphTargets&&o.enable(6),R.morphNormals&&o.enable(7),R.morphColors&&o.enable(8),R.premultipliedAlpha&&o.enable(9),R.shadowMapEnabled&&o.enable(10),R.doubleSided&&o.enable(11),R.flipSided&&o.enable(12),R.useDepthPacking&&o.enable(13),R.dithering&&o.enable(14),R.transmission&&o.enable(15),R.sheen&&o.enable(16),R.opaque&&o.enable(17),R.pointsUvs&&o.enable(18),R.decodeVideoTexture&&o.enable(19),R.decodeVideoTextureEmissive&&o.enable(20),R.alphaToCoverage&&o.enable(21),R.numLightProbeGrids>0&&o.enable(22),R.hasPositionAttribute&&o.enable(23),v.push(o.mask)}function w(v){let R=f[v.type],I;if(R){let B=zn[R];I=ya.clone(B.uniforms)}else I=v.uniforms;return I}function y(v,R){let I=h.get(R);return I!==void 0?++I.usedTimes:(I=new wb(s,R,v,i),c.push(I),h.set(R,I)),I}function A(v){if(--v.usedTimes===0){let R=c.indexOf(v);c[R]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function T(v){a.remove(v)}function L(){a.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:w,acquireProgram:y,releaseProgram:A,releaseShaderCache:T,programs:c,dispose:L}}function Cb(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function Pb(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function L0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function D0(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function a(d,f,p,_,g,m){let x=s[e];return x===void 0?(x={id:d.id,object:d,geometry:f,material:p,materialVariant:o(d),groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},s[e]=x):(x.id=d.id,x.object=d,x.geometry=f,x.material=p,x.materialVariant=o(d),x.groupOrder=_,x.renderOrder=d.renderOrder,x.z=g,x.group=m),e++,x}function l(d,f,p,_,g,m,x){x.reversedDepth===!0&&(g=-g);let w=a(d,f,p,_,g,m);p.transmission>0?n.push(w):p.transparent===!0?i.push(w):t.push(w)}function c(d,f,p,_,g,m){let x=a(d,f,p,_,g,m);p.transmission>0?n.unshift(x):p.transparent===!0?i.unshift(x):t.unshift(x)}function h(d,f){t.length>1&&t.sort(d||Pb),n.length>1&&n.sort(f||L0),i.length>1&&i.sort(f||L0)}function u(){for(let d=e,f=s.length;d<f;d++){let p=s[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:u,sort:h}}function Ib(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new D0,s.set(n,[o])):i>=r.length?(o=new D0,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function Lb(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new E,color:new Oe};break;case"SpotLight":t={position:new E,direction:new E,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new E,halfWidth:new E,halfHeight:new E};break}return s[e.id]=t,t}}}function Db(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new re,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var Ub=0;function Nb(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Fb(s){let e=new Lb,t=Db(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new E);let i=new E,r=new ct,o=new ct;function a(c){let h=0,u=0,d=0;for(let k=0;k<9;k++)n.probe[k].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,x=0,w=0,y=0,A=0,T=0,L=0,v=0,R=0,I=0;c.sort(Nb);for(let k=0,X=c.length;k<X;k++){let U=c[k],z=U.color,V=U.intensity,G=U.distance,Q=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===Cs?Q=U.shadow.map.texture:Q=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)h+=z.r*V,u+=z.g*V,d+=z.b*V;else if(U.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(U.sh.coefficients[Y],V);I++}else if(U.isSunLight){let Y=e.get(U);if(Y.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let j=U.shadow,ie=t.get(U);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[p]=ie,n.sunShadowMap[p]=Q;let ze=j.getViewportCount();for(let Ge=0;Ge<ze;Ge++)n.sunShadowMatrix[_+Ge]=j.getMatrix(Ge),n.sunShadowCascade[_+Ge]=j._cascadeData[Ge];_+=ze,p++}n.sun[f]=Y,f++}else if(U.isDirectionalLight){let Y=e.get(U);if(Y.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){let j=U.shadow,ie=t.get(U);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,n.directionalShadow[g]=ie,n.directionalShadowMap[g]=Q,n.directionalShadowMatrix[g]=U.shadow.matrix,A++}n.directional[g]=Y,g++}else if(U.isSpotLight){let Y=e.get(U);Y.position.setFromMatrixPosition(U.matrixWorld),Y.color.copy(z).multiplyScalar(V),Y.distance=G,Y.coneCos=Math.cos(U.angle),Y.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),Y.decay=U.decay,n.spot[x]=Y;let j=U.shadow;if(U.map&&(n.spotLightMap[v]=U.map,v++,j.updateMatrices(U),U.castShadow&&R++),n.spotLightMatrix[x]=j.matrix,U.castShadow){let ie=t.get(U);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,n.spotShadow[x]=ie,n.spotShadowMap[x]=Q,L++}x++}else if(U.isRectAreaLight){let Y=e.get(U);Y.color.copy(z).multiplyScalar(V),Y.halfWidth.set(U.width*.5,0,0),Y.halfHeight.set(0,U.height*.5,0),n.rectArea[w]=Y,w++}else if(U.isPointLight){let Y=e.get(U);if(Y.color.copy(U.color).multiplyScalar(U.intensity),Y.distance=U.distance,Y.decay=U.decay,U.castShadow){let j=U.shadow,ie=t.get(U);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,ie.shadowCameraNear=j.camera.near,ie.shadowCameraFar=j.camera.far,n.pointShadow[m]=ie,n.pointShadowMap[m]=Q,n.pointShadowMatrix[m]=U.shadow.matrix,T++}n.point[m]=Y,m++}else if(U.isHemisphereLight){let Y=e.get(U);Y.skyColor.copy(U.color).multiplyScalar(V),Y.groundColor.copy(U.groundColor).multiplyScalar(V),n.hemi[y]=Y,y++}}w>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let B=n.hash;(B.sunLength!==f||B.directionalLength!==g||B.pointLength!==m||B.spotLength!==x||B.rectAreaLength!==w||B.hemiLength!==y||B.numSunShadows!==p||B.numDirectionalShadows!==A||B.numPointShadows!==T||B.numSpotShadows!==L||B.numSpotMaps!==v||B.numLightProbes!==I)&&(n.sun.length=f,n.directional.length=g,n.spot.length=x,n.rectArea.length=w,n.point.length=m,n.hemi.length=y,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=L,n.spotShadowMap.length=L,n.spotLightMatrix.length=L+v-R,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=I,B.sunLength=f,B.directionalLength=g,B.pointLength=m,B.spotLength=x,B.rectAreaLength=w,B.hemiLength=y,B.numSunShadows=p,B.numDirectionalShadows=A,B.numPointShadows=T,B.numSpotShadows=L,B.numSpotMaps=v,B.numLightProbes=I,n.version=Ub++)}function l(c,h){let u=0,d=0,f=0,p=0,_=0,g=0,m=h.matrixWorldInverse;for(let x=0,w=c.length;x<w;x++){let y=c[x];if(y.isSunLight){let A=n.sun[u];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(m),u++}else if(y.isDirectionalLight){let A=n.directional[d];A.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(m),d++}else if(y.isSpotLight){let A=n.spot[p];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(m),p++}else if(y.isRectAreaLight){let A=n.rectArea[_];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(m),o.identity(),r.copy(y.matrixWorld),r.premultiply(m),o.extractRotation(r),A.halfWidth.set(y.width*.5,0,0),A.halfHeight.set(0,y.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),_++}else if(y.isPointLight){let A=n.point[f];A.position.setFromMatrixPosition(y.matrixWorld),A.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){let A=n.hemi[g];A.direction.setFromMatrixPosition(y.matrixWorld),A.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function U0(s){let e=new Fb(s),t=[],n=[],i=[];function r(d){u.camera=d,t.length=0,n.length=0,i.length=0}function o(d){t.push(d)}function a(d){n.push(d)}function l(d){i.push(d)}function c(){e.setup(t)}function h(d){e.setupView(t,d)}let u={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:c,setupLightsView:h,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function Ob(s){let e=new WeakMap;function t(i,r=0){let o=e.get(i),a;return o===void 0?(a=new U0(s),e.set(i,[a])):r>=o.length?(a=new U0(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}var Bb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,zb=`uniform sampler2D shadow_pass;
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
}`,Vb=[new E(1,0,0),new E(-1,0,0),new E(0,1,0),new E(0,-1,0),new E(0,0,1),new E(0,0,-1)],Hb=[new E(0,-1,0),new E(0,-1,0),new E(0,0,1),new E(0,0,-1),new E(0,-1,0),new E(0,-1,0)],N0=new ct,Vc=new E,yp=new E;function kb(s,e,t){let n=new $i,i=new re,r=new re,o=new Ct,a=new qo,l=new Zo,c={},h=t.maxTextureSize,u={[Ts]:Fn,[Fn]:Ts,[ui]:ui},d=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new re},radius:{value:4}},vertexShader:Bb,fragmentShader:zb}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let p=new _t;p.setAttribute("position",new Wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Yt(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ra;let m=this.type;this.render=function(T,L,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===Af&&(Ie("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ra);let R=s.getRenderTarget(),I=s.getActiveCubeFace(),B=s.getActiveMipmapLevel(),k=s.state;k.setBlending(Hi),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);let X=m!==this.type;X&&L.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(z=>z.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,z=T.length;U<z;U++){let V=T[U],G=V.shadow;if(G===void 0){Ie("WebGLShadowMap:",V,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);let Q=G.getFrameExtents();i.multiply(Q),r.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/Q.x),i.x=r.x*Q.x,G.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/Q.y),i.y=r.y*Q.y,G.mapSize.y=r.y));let Y=s.state.buffers.depth.getReversed();if(G.camera._reversedDepth=Y,G.map===null||X===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Wr){if(V.isPointLight){Ie("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Mn(i.x,i.y,{format:Cs,type:vi,minFilter:qt,magFilter:qt,generateMipmaps:!1}),G.map.texture.name=V.name+".shadowMap",G.map.depthTexture=new ys(i.x,i.y,Dn),G.map.depthTexture.name=V.name+".shadowMapDepth",G.map.depthTexture.format=Di,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=on,G.map.depthTexture.magFilter=on}else V.isPointLight?(G.map=new Gc(i.x),G.map.depthTexture=new ml(i.x,di)):(G.map=new Mn(i.x,i.y),G.map.depthTexture=new ys(i.x,i.y,di)),G.map.depthTexture.name=V.name+".shadowMap",G.map.depthTexture.format=Di,this.type===ra?(G.map.depthTexture.compareFunction=Y?Oc:Fc,G.map.depthTexture.minFilter=qt,G.map.depthTexture.magFilter=qt):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=on,G.map.depthTexture.magFilter=on);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==i.x||G.map.height!==i.y)&&G.map.setSize(i.x,i.y);let j=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();V.isPointLight!==!0&&G.updateMatrices(V,v);for(let ie=0;ie<j;ie++){let ze=G.getCamera(ie);if(V.isPointLight){let Ge=G.camera,at=G.matrix,xt=V.distance||Ge.far;xt!==Ge.far&&(Ge.far=xt,Ge.updateProjectionMatrix()),Vc.setFromMatrixPosition(V.matrixWorld),Ge.position.copy(Vc),yp.copy(Ge.position),yp.add(Vb[ie]),Ge.up.copy(Hb[ie]),Ge.lookAt(yp),Ge.updateMatrixWorld(),at.makeTranslation(-Vc.x,-Vc.y,-Vc.z),N0.multiplyMatrices(Ge.projectionMatrix,Ge.matrixWorldInverse),G._frustum.setFromProjectionMatrix(N0,Ge.coordinateSystem,Ge.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)s.setRenderTarget(G.map,ie),s.clear();else{ie===0&&(s.setRenderTarget(G.map),s.clear());let Ge=G.getViewport(ie);o.set(r.x*Ge.x,r.y*Ge.y,r.x*Ge.z,r.y*Ge.w),k.viewport(o)}n=G.getFrustum(ie),y(L,v,ze,V,this.type)}G.isPointLightShadow!==!0&&this.type===Wr&&x(G,v),G.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(R,I,B)};function x(T,L){let v=e.update(_);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new Mn(i.x,i.y,{format:Cs,type:vi}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(L,null,v,d,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(L,null,v,f,_,null)}function w(T,L,v,R){let I=null,B=v.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(B!==void 0)I=B;else if(I=v.isPointLight===!0?l:a,s.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){let k=I.uuid,X=L.uuid,U=c[k];U===void 0&&(U={},c[k]=U);let z=U[X];z===void 0&&(z=I.clone(),U[X]=z,L.addEventListener("dispose",A)),I=z}if(I.visible=L.visible,I.wireframe=L.wireframe,R===Wr?I.side=L.shadowSide!==null?L.shadowSide:L.side:I.side=L.shadowSide!==null?L.shadowSide:u[L.side],I.alphaMap=L.alphaMap,I.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,I.map=L.map,I.clipShadows=L.clipShadows,I.clippingPlanes=L.clippingPlanes,I.clipIntersection=L.clipIntersection,I.displacementMap=L.displacementMap,I.displacementScale=L.displacementScale,I.displacementBias=L.displacementBias,I.wireframeLinewidth=L.wireframeLinewidth,I.linewidth=L.linewidth,v.isPointLight===!0&&I.isMeshDistanceMaterial===!0){let k=s.properties.get(I);k.light=v}return I}function y(T,L,v,R,I){if(T.visible===!1)return;if(T.layers.test(L.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&I===Wr)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,T.matrixWorld);let X=e.update(T),U=T.material;if(Array.isArray(U)){let z=X.groups;for(let V=0,G=z.length;V<G;V++){let Q=z[V],Y=U[Q.materialIndex];if(Y&&Y.visible){let j=w(T,Y,R,I);T.onBeforeShadow(s,T,L,v,X,j,Q),s.renderBufferDirect(v,null,X,j,T,Q),T.onAfterShadow(s,T,L,v,X,j,Q)}}}else if(U.visible){let z=w(T,U,R,I);T.onBeforeShadow(s,T,L,v,X,z,null),s.renderBufferDirect(v,null,X,z,T,null),T.onAfterShadow(s,T,L,v,X,z,null)}}let k=T.children;for(let X=0,U=k.length;X<U;X++)y(k[X],L,v,R,I)}function A(T){T.target.removeEventListener("dispose",A);for(let v in c){let R=c[v],I=T.target.uuid;I in R&&(R[I].dispose(),delete R[I])}}}function Gb(s,e){function t(){let F=!1,be=new Ct,se=null,ue=new Ct(0,0,0,0);return{setMask:function(Ee){se!==Ee&&!F&&(s.colorMask(Ee,Ee,Ee,Ee),se=Ee)},setLocked:function(Ee){F=Ee},setClear:function(Ee,he,Ve,We,Dt){Dt===!0&&(Ee*=We,he*=We,Ve*=We),be.set(Ee,he,Ve,We),ue.equals(be)===!1&&(s.clearColor(Ee,he,Ve,We),ue.copy(be))},reset:function(){F=!1,se=null,ue.set(-1,0,0,0)}}}function n(){let F=!1,be=!1,se=null,ue=null,Ee=null;return{setReversed:function(he){if(be!==he){let Ve=e.get("EXT_clip_control");he?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT),be=he;let We=Ee;Ee=null,this.setClear(We)}},getReversed:function(){return be},setTest:function(he){he?ae(s.DEPTH_TEST):Me(s.DEPTH_TEST)},setMask:function(he){se!==he&&!F&&(s.depthMask(he),se=he)},setFunc:function(he){if(be&&(he=s0[he]),ue!==he){switch(he){case Ka:s.depthFunc(s.NEVER);break;case $a:s.depthFunc(s.ALWAYS);break;case ja:s.depthFunc(s.LESS);break;case yr:s.depthFunc(s.LEQUAL);break;case Qa:s.depthFunc(s.EQUAL);break;case el:s.depthFunc(s.GEQUAL);break;case tl:s.depthFunc(s.GREATER);break;case nl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ue=he}},setLocked:function(he){F=he},setClear:function(he){Ee!==he&&(Ee=he,be&&(he=1-he),s.clearDepth(he))},reset:function(){F=!1,se=null,ue=null,Ee=null,be=!1}}}function i(){let F=!1,be=null,se=null,ue=null,Ee=null,he=null,Ve=null,We=null,Dt=null;return{setTest:function(Ot){F||(Ot?ae(s.STENCIL_TEST):Me(s.STENCIL_TEST))},setMask:function(Ot){be!==Ot&&!F&&(s.stencilMask(Ot),be=Ot)},setFunc:function(Ot,Hn,kn){(se!==Ot||ue!==Hn||Ee!==kn)&&(s.stencilFunc(Ot,Hn,kn),se=Ot,ue=Hn,Ee=kn)},setOp:function(Ot,Hn,kn){(he!==Ot||Ve!==Hn||We!==kn)&&(s.stencilOp(Ot,Hn,kn),he=Ot,Ve=Hn,We=kn)},setLocked:function(Ot){F=Ot},setClear:function(Ot){Dt!==Ot&&(s.clearStencil(Ot),Dt=Ot)},reset:function(){F=!1,be=null,se=null,ue=null,Ee=null,he=null,Ve=null,We=null,Dt=null}}}let r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap,h={},u={},d={},f=new WeakMap,p=[],_=null,g=!1,m=null,x=null,w=null,y=null,A=null,T=null,L=null,v=new Oe(0,0,0),R=0,I=!1,B=null,k=null,X=null,U=null,z=null,V=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,Q=0,Y=s.getParameter(s.VERSION);Y.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(Y)[1]),G=Q>=1):Y.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),G=Q>=2);let j=null,ie={},ze=s.getParameter(s.SCISSOR_BOX),Ge=s.getParameter(s.VIEWPORT),at=new Ct().fromArray(ze),xt=new Ct().fromArray(Ge);function st(F,be,se,ue){let Ee=new Uint8Array(4),he=s.createTexture();s.bindTexture(F,he),s.texParameteri(F,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(F,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Ve=0;Ve<se;Ve++)F===s.TEXTURE_3D||F===s.TEXTURE_2D_ARRAY?s.texImage3D(be,0,s.RGBA,1,1,ue,0,s.RGBA,s.UNSIGNED_BYTE,Ee):s.texImage2D(be+Ve,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ee);return he}let $={};$[s.TEXTURE_2D]=st(s.TEXTURE_2D,s.TEXTURE_2D,1),$[s.TEXTURE_CUBE_MAP]=st(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[s.TEXTURE_2D_ARRAY]=st(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),$[s.TEXTURE_3D]=st(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(s.DEPTH_TEST),o.setFunc(yr),ge(!1),Te(ku),ae(s.CULL_FACE),fe(Hi);function ae(F){h[F]!==!0&&(s.enable(F),h[F]=!0)}function Me(F){h[F]!==!1&&(s.disable(F),h[F]=!1)}function rt(F,be){return d[F]!==be?(s.bindFramebuffer(F,be),d[F]=be,F===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=be),F===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=be),!0):!1}function He(F,be){let se=p,ue=!1;if(F){se=f.get(be),se===void 0&&(se=[],f.set(be,se));let Ee=F.textures;if(se.length!==Ee.length||se[0]!==s.COLOR_ATTACHMENT0){for(let he=0,Ve=Ee.length;he<Ve;he++)se[he]=s.COLOR_ATTACHMENT0+he;se.length=Ee.length,ue=!0}}else se[0]!==s.BACK&&(se[0]=s.BACK,ue=!0);ue&&s.drawBuffers(se)}function ot(F){return _!==F?(s.useProgram(F),_=F,!0):!1}let Nt={[er]:s.FUNC_ADD,[Cf]:s.FUNC_SUBTRACT,[Pf]:s.FUNC_REVERSE_SUBTRACT};Nt[If]=s.MIN,Nt[Lf]=s.MAX;let ce={[Df]:s.ZERO,[Uf]:s.ONE,[Nf]:s.SRC_COLOR,[Xu]:s.SRC_ALPHA,[Hf]:s.SRC_ALPHA_SATURATE,[zf]:s.DST_COLOR,[Of]:s.DST_ALPHA,[Ff]:s.ONE_MINUS_SRC_COLOR,[Yu]:s.ONE_MINUS_SRC_ALPHA,[Vf]:s.ONE_MINUS_DST_COLOR,[Bf]:s.ONE_MINUS_DST_ALPHA,[kf]:s.CONSTANT_COLOR,[Gf]:s.ONE_MINUS_CONSTANT_COLOR,[Wf]:s.CONSTANT_ALPHA,[Xf]:s.ONE_MINUS_CONSTANT_ALPHA};function fe(F,be,se,ue,Ee,he,Ve,We,Dt,Ot){if(F===Hi){g===!0&&(Me(s.BLEND),g=!1);return}if(g===!1&&(ae(s.BLEND),g=!0),F!==Rf){if(F!==m||Ot!==I){if((x!==er||A!==er)&&(s.blendEquation(s.FUNC_ADD),x=er,A=er),Ot)switch(F){case Xr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case oa:s.blendFunc(s.ONE,s.ONE);break;case Gu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Wu:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:Je("WebGLState: Invalid blending: ",F);break}else switch(F){case Xr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case oa:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Gu:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wu:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",F);break}w=null,y=null,T=null,L=null,v.set(0,0,0),R=0,m=F,I=Ot}return}Ee=Ee||be,he=he||se,Ve=Ve||ue,(be!==x||Ee!==A)&&(s.blendEquationSeparate(Nt[be],Nt[Ee]),x=be,A=Ee),(se!==w||ue!==y||he!==T||Ve!==L)&&(s.blendFuncSeparate(ce[se],ce[ue],ce[he],ce[Ve]),w=se,y=ue,T=he,L=Ve),(We.equals(v)===!1||Dt!==R)&&(s.blendColor(We.r,We.g,We.b,Dt),v.copy(We),R=Dt),m=F,I=!1}function pe(F,be){F.side===ui?Me(s.CULL_FACE):ae(s.CULL_FACE);let se=F.side===Fn;be&&(se=!se),ge(se),F.blending===Xr&&F.transparent===!1?fe(Hi):fe(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);let ue=F.stencilWrite;a.setTest(ue),ue&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Ke(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ae(s.SAMPLE_ALPHA_TO_COVERAGE):Me(s.SAMPLE_ALPHA_TO_COVERAGE)}function ge(F){B!==F&&(F?s.frontFace(s.CW):s.frontFace(s.CCW),B=F)}function Te(F){F!==wf?(ae(s.CULL_FACE),F!==k&&(F===ku?s.cullFace(s.BACK):F===Tf?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Me(s.CULL_FACE),k=F}function tt(F){F!==X&&(G&&s.lineWidth(F),X=F)}function Ke(F,be,se){F?(ae(s.POLYGON_OFFSET_FILL),(U!==be||z!==se)&&(U=be,z=se,o.getReversed()&&(be=-be),s.polygonOffset(be,se))):Me(s.POLYGON_OFFSET_FILL)}function nt(F){F?ae(s.SCISSOR_TEST):Me(s.SCISSOR_TEST)}function lt(F){F===void 0&&(F=s.TEXTURE0+V-1),j!==F&&(s.activeTexture(F),j=F)}function O(F,be,se){se===void 0&&(j===null?se=s.TEXTURE0+V-1:se=j);let ue=ie[se];ue===void 0&&(ue={type:void 0,texture:void 0},ie[se]=ue),(ue.type!==F||ue.texture!==be)&&(j!==se&&(s.activeTexture(se),j=se),s.bindTexture(F,be||$[F]),ue.type=F,ue.texture=be)}function Ft(){let F=ie[j];F!==void 0&&F.type!==void 0&&(s.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function St(){try{s.compressedTexImage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function P(){try{s.compressedTexImage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function M(){try{s.texSubImage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function W(){try{s.texSubImage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function J(){try{s.compressedTexSubImage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function te(){try{s.compressedTexSubImage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function ve(){try{s.texStorage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function we(){try{s.texStorage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function ne(){try{s.texImage2D(...arguments)}catch(F){Je("WebGLState:",F)}}function le(){try{s.texImage3D(...arguments)}catch(F){Je("WebGLState:",F)}}function Le(F){return u[F]!==void 0?u[F]:s.getParameter(F)}function $e(F,be){u[F]!==be&&(s.pixelStorei(F,be),u[F]=be)}function Ne(F){at.equals(F)===!1&&(s.scissor(F.x,F.y,F.z,F.w),at.copy(F))}function De(F){xt.equals(F)===!1&&(s.viewport(F.x,F.y,F.z,F.w),xt.copy(F))}function Ze(F,be){let se=c.get(be);se===void 0&&(se=new WeakMap,c.set(be,se));let ue=se.get(F);ue===void 0&&(ue=s.getUniformBlockIndex(be,F.name),se.set(F,ue))}function it(F,be){let ue=c.get(be).get(F);l.get(be)!==ue&&(s.uniformBlockBinding(be,ue,F.__bindingPointIndex),l.set(be,ue))}function je(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},u={},j=null,ie={},d={},f=new WeakMap,p=[],_=null,g=!1,m=null,x=null,w=null,y=null,A=null,T=null,L=null,v=new Oe(0,0,0),R=0,I=!1,B=null,k=null,X=null,U=null,z=null,at.set(0,0,s.canvas.width,s.canvas.height),xt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ae,disable:Me,bindFramebuffer:rt,drawBuffers:He,useProgram:ot,setBlending:fe,setMaterial:pe,setFlipSided:ge,setCullFace:Te,setLineWidth:tt,setPolygonOffset:Ke,setScissorTest:nt,activeTexture:lt,bindTexture:O,unbindTexture:Ft,compressedTexImage2D:St,compressedTexImage3D:P,texImage2D:ne,texImage3D:le,pixelStorei:$e,getParameter:Le,updateUBOMapping:Ze,uniformBlockBinding:it,texStorage2D:ve,texStorage3D:we,texSubImage2D:M,texSubImage3D:W,compressedTexSubImage2D:J,compressedTexSubImage3D:te,scissor:Ne,viewport:De,reset:je}}function Wb(s,e,t,n,i,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new re,h=new WeakMap,u=new Set,d,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(P,M){return p?new OffscreenCanvas(P,M):Io("canvas")}function g(P,M,W){let J=1,te=St(P);if((te.width>W||te.height>W)&&(J=W/Math.max(te.width,te.height)),J<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let ve=Math.floor(J*te.width),we=Math.floor(J*te.height);d===void 0&&(d=_(ve,we));let ne=M?_(ve,we):d;return ne.width=ve,ne.height=we,ne.getContext("2d").drawImage(P,0,0,ve,we),Ie("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+ve+"x"+we+")."),ne}else return"data"in P&&Ie("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),P;return P}function m(P){return P.generateMipmaps}function x(P){s.generateMipmap(P)}function w(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function y(P,M,W,J,te,ve=!1){if(P!==null){if(s[P]!==void 0)return s[P];Ie("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let we;J&&(we=e.get("EXT_texture_norm16"),we||Ie("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ne=M;if(M===s.RED&&(W===s.FLOAT&&(ne=s.R32F),W===s.HALF_FLOAT&&(ne=s.R16F),W===s.UNSIGNED_BYTE&&(ne=s.R8),W===s.UNSIGNED_SHORT&&we&&(ne=we.R16_EXT),W===s.SHORT&&we&&(ne=we.R16_SNORM_EXT)),M===s.RED_INTEGER&&(W===s.UNSIGNED_BYTE&&(ne=s.R8UI),W===s.UNSIGNED_SHORT&&(ne=s.R16UI),W===s.UNSIGNED_INT&&(ne=s.R32UI),W===s.BYTE&&(ne=s.R8I),W===s.SHORT&&(ne=s.R16I),W===s.INT&&(ne=s.R32I)),M===s.RG&&(W===s.FLOAT&&(ne=s.RG32F),W===s.HALF_FLOAT&&(ne=s.RG16F),W===s.UNSIGNED_BYTE&&(ne=s.RG8),W===s.UNSIGNED_SHORT&&we&&(ne=we.RG16_EXT),W===s.SHORT&&we&&(ne=we.RG16_SNORM_EXT)),M===s.RG_INTEGER&&(W===s.UNSIGNED_BYTE&&(ne=s.RG8UI),W===s.UNSIGNED_SHORT&&(ne=s.RG16UI),W===s.UNSIGNED_INT&&(ne=s.RG32UI),W===s.BYTE&&(ne=s.RG8I),W===s.SHORT&&(ne=s.RG16I),W===s.INT&&(ne=s.RG32I)),M===s.RGB_INTEGER&&(W===s.UNSIGNED_BYTE&&(ne=s.RGB8UI),W===s.UNSIGNED_SHORT&&(ne=s.RGB16UI),W===s.UNSIGNED_INT&&(ne=s.RGB32UI),W===s.BYTE&&(ne=s.RGB8I),W===s.SHORT&&(ne=s.RGB16I),W===s.INT&&(ne=s.RGB32I)),M===s.RGBA_INTEGER&&(W===s.UNSIGNED_BYTE&&(ne=s.RGBA8UI),W===s.UNSIGNED_SHORT&&(ne=s.RGBA16UI),W===s.UNSIGNED_INT&&(ne=s.RGBA32UI),W===s.BYTE&&(ne=s.RGBA8I),W===s.SHORT&&(ne=s.RGBA16I),W===s.INT&&(ne=s.RGBA32I)),M===s.RGB&&(W===s.UNSIGNED_SHORT&&we&&(ne=we.RGB16_EXT),W===s.SHORT&&we&&(ne=we.RGB16_SNORM_EXT),W===s.UNSIGNED_INT_5_9_9_9_REV&&(ne=s.RGB9_E5),W===s.UNSIGNED_INT_10F_11F_11F_REV&&(ne=s.R11F_G11F_B10F)),M===s.RGBA){let le=ve?Po:Tt.getTransfer(te);W===s.FLOAT&&(ne=s.RGBA32F),W===s.HALF_FLOAT&&(ne=s.RGBA16F),W===s.UNSIGNED_BYTE&&(ne=le===Vt?s.SRGB8_ALPHA8:s.RGBA8),W===s.UNSIGNED_SHORT&&we&&(ne=we.RGBA16_EXT),W===s.SHORT&&we&&(ne=we.RGBA16_SNORM_EXT),W===s.UNSIGNED_SHORT_4_4_4_4&&(ne=s.RGBA4),W===s.UNSIGNED_SHORT_5_5_5_1&&(ne=s.RGB5_A1)}return(ne===s.R16F||ne===s.R32F||ne===s.RG16F||ne===s.RG32F||ne===s.RGBA16F||ne===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function A(P,M){let W;return P?M===null||M===di||M===Jr?W=s.DEPTH24_STENCIL8:M===Dn?W=s.DEPTH32F_STENCIL8:M===Zr&&(W=s.DEPTH24_STENCIL8,Ie("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===di||M===Jr?W=s.DEPTH_COMPONENT24:M===Dn?W=s.DEPTH_COMPONENT32F:M===Zr&&(W=s.DEPTH_COMPONENT16),W}function T(P,M){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==on&&P.minFilter!==qt?Math.log2(Math.max(M.width,M.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?M.mipmaps.length:1}function L(P){let M=P.target;M.removeEventListener("dispose",L),R(M),M.isVideoTexture&&h.delete(M),M.isHTMLTexture&&u.delete(M)}function v(P){let M=P.target;M.removeEventListener("dispose",v),B(M)}function R(P){let M=n.get(P);if(M.__webglInit===void 0)return;let W=P.source,J=f.get(W);if(J){let te=J[M.__cacheKey];te.usedTimes--,te.usedTimes===0&&I(P),Object.keys(J).length===0&&f.delete(W)}n.remove(P)}function I(P){let M=n.get(P);s.deleteTexture(M.__webglTexture);let W=P.source,J=f.get(W);delete J[M.__cacheKey],o.memory.textures--}function B(P){let M=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(M.__webglFramebuffer[J]))for(let te=0;te<M.__webglFramebuffer[J].length;te++)s.deleteFramebuffer(M.__webglFramebuffer[J][te]);else s.deleteFramebuffer(M.__webglFramebuffer[J]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[J])}else{if(Array.isArray(M.__webglFramebuffer))for(let J=0;J<M.__webglFramebuffer.length;J++)s.deleteFramebuffer(M.__webglFramebuffer[J]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let J=0;J<M.__webglColorRenderbuffer.length;J++)M.__webglColorRenderbuffer[J]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[J]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let W=P.textures;for(let J=0,te=W.length;J<te;J++){let ve=n.get(W[J]);ve.__webglTexture&&(s.deleteTexture(ve.__webglTexture),o.memory.textures--),n.remove(W[J])}n.remove(P)}let k=0;function X(){k=0}function U(){return k}function z(P){k=P}function V(){let P=k;return P>=i.maxTextures&&Ie("WebGLTextures: Trying to use "+(P+1)+" texture units while this GPU supports only "+i.maxTextures),k+=1,P}function G(P){let M=[];return M.push(P.wrapS),M.push(P.wrapT),M.push(P.wrapR||0),M.push(P.magFilter),M.push(P.minFilter),M.push(P.anisotropy),M.push(P.internalFormat),M.push(P.format),M.push(P.type),M.push(P.generateMipmaps),M.push(P.premultiplyAlpha),M.push(P.flipY),M.push(P.unpackAlignment),M.push(P.colorSpace),M.join()}function Q(P,M){let W=n.get(P);if(P.isVideoTexture&&O(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&W.__version!==P.version){let J=P.image;if(J===null)Ie("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)Ie("WebGLRenderer: Texture marked for update but image is incomplete");else{Me(W,P,M);return}}else P.isExternalTexture&&(W.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,W.__webglTexture,s.TEXTURE0+M)}function Y(P,M){let W=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&W.__version!==P.version){Me(W,P,M);return}else P.isExternalTexture&&(W.__webglTexture=P.sourceTexture?P.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,W.__webglTexture,s.TEXTURE0+M)}function j(P,M){let W=n.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&W.__version!==P.version){Me(W,P,M);return}t.bindTexture(s.TEXTURE_3D,W.__webglTexture,s.TEXTURE0+M)}function ie(P,M){let W=n.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&W.__version!==P.version){rt(W,P,M);return}t.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture,s.TEXTURE0+M)}let ze={[Vs]:s.REPEAT,[Yn]:s.CLAMP_TO_EDGE,[To]:s.MIRRORED_REPEAT},Ge={[on]:s.NEAREST,[Qu]:s.NEAREST_MIPMAP_NEAREST,[qr]:s.NEAREST_MIPMAP_LINEAR,[qt]:s.LINEAR,[ua]:s.LINEAR_MIPMAP_NEAREST,[Gi]:s.LINEAR_MIPMAP_LINEAR},at={[tp]:s.NEVER,[op]:s.ALWAYS,[np]:s.LESS,[Fc]:s.LEQUAL,[ip]:s.EQUAL,[Oc]:s.GEQUAL,[sp]:s.GREATER,[rp]:s.NOTEQUAL};function xt(P,M){if(M.type===Dn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===qt||M.magFilter===ua||M.magFilter===qr||M.magFilter===Gi||M.minFilter===qt||M.minFilter===ua||M.minFilter===qr||M.minFilter===Gi)&&Ie("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,ze[M.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,ze[M.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,ze[M.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,Ge[M.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,Ge[M.minFilter]),M.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,at[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===on||M.minFilter!==qr&&M.minFilter!==Gi||M.type===Dn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){let W=e.get("EXT_texture_filter_anisotropic");s.texParameterf(P,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function st(P,M){let W=!1;P.__webglInit===void 0&&(P.__webglInit=!0,M.addEventListener("dispose",L));let J=M.source,te=f.get(J);te===void 0&&(te={},f.set(J,te));let ve=G(M);if(ve!==P.__cacheKey){te[ve]===void 0&&(te[ve]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,W=!0),te[ve].usedTimes++;let we=te[P.__cacheKey];we!==void 0&&(te[P.__cacheKey].usedTimes--,we.usedTimes===0&&I(M)),P.__cacheKey=ve,P.__webglTexture=te[ve].texture}return W}function $(P,M,W){return Math.floor(Math.floor(P/W)/M)}function ae(P,M,W,J){let ve=P.updateRanges;if(ve.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,W,J,M.data);else{ve.sort(($e,Ne)=>$e.start-Ne.start);let we=0;for(let $e=1;$e<ve.length;$e++){let Ne=ve[we],De=ve[$e],Ze=Ne.start+Ne.count,it=$(De.start,M.width,4),je=$(Ne.start,M.width,4);De.start<=Ze+1&&it===je&&$(De.start+De.count-1,M.width,4)===it?Ne.count=Math.max(Ne.count,De.start+De.count-Ne.start):(++we,ve[we]=De)}ve.length=we+1;let ne=t.getParameter(s.UNPACK_ROW_LENGTH),le=t.getParameter(s.UNPACK_SKIP_PIXELS),Le=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let $e=0,Ne=ve.length;$e<Ne;$e++){let De=ve[$e],Ze=Math.floor(De.start/4),it=Math.ceil(De.count/4),je=Ze%M.width,F=Math.floor(Ze/M.width),be=it,se=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,je),t.pixelStorei(s.UNPACK_SKIP_ROWS,F),t.texSubImage2D(s.TEXTURE_2D,0,je,F,be,se,W,J,M.data)}P.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,ne),t.pixelStorei(s.UNPACK_SKIP_PIXELS,le),t.pixelStorei(s.UNPACK_SKIP_ROWS,Le)}}function Me(P,M,W){let J=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(J=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(J=s.TEXTURE_3D);let te=st(P,M),ve=M.source;t.bindTexture(J,P.__webglTexture,s.TEXTURE0+W);let we=n.get(ve);if(ve.version!==we.__version||te===!0){if(t.activeTexture(s.TEXTURE0+W),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let se=Tt.getPrimaries(Tt.workingColorSpace),ue=M.colorSpace===is?null:Tt.getPrimaries(M.colorSpace),Ee=M.colorSpace===is||se===ue?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment);let le=g(M.image,!1,i.maxTextureSize);le=Ft(M,le);let Le=r.convert(M.format,M.colorSpace),$e=r.convert(M.type),Ne=y(M.internalFormat,Le,$e,M.normalized,M.colorSpace,M.isVideoTexture);xt(J,M);let De,Ze=M.mipmaps,it=M.isVideoTexture!==!0,je=we.__version===void 0||te===!0,F=ve.dataReady,be=T(M,le);if(M.isDepthTexture)Ne=A(M.format===Rs,M.type),je&&(it?t.texStorage2D(s.TEXTURE_2D,1,Ne,le.width,le.height):t.texImage2D(s.TEXTURE_2D,0,Ne,le.width,le.height,0,Le,$e,null));else if(M.isDataTexture)if(Ze.length>0){it&&je&&t.texStorage2D(s.TEXTURE_2D,be,Ne,Ze[0].width,Ze[0].height);for(let se=0,ue=Ze.length;se<ue;se++)De=Ze[se],it?F&&t.texSubImage2D(s.TEXTURE_2D,se,0,0,De.width,De.height,Le,$e,De.data):t.texImage2D(s.TEXTURE_2D,se,Ne,De.width,De.height,0,Le,$e,De.data);M.generateMipmaps=!1}else it?(je&&t.texStorage2D(s.TEXTURE_2D,be,Ne,le.width,le.height),F&&ae(M,le,Le,$e)):t.texImage2D(s.TEXTURE_2D,0,Ne,le.width,le.height,0,Le,$e,le.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){it&&je&&t.texStorage3D(s.TEXTURE_2D_ARRAY,be,Ne,Ze[0].width,Ze[0].height,le.depth);for(let se=0,ue=Ze.length;se<ue;se++)if(De=Ze[se],M.format!==Un)if(Le!==null)if(it){if(F)if(M.layerUpdates.size>0){let Ee=ld(De.width,De.height,M.format,M.type);for(let he of M.layerUpdates){let Ve=De.data.subarray(he*Ee/De.data.BYTES_PER_ELEMENT,(he+1)*Ee/De.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,se,0,0,he,De.width,De.height,1,Le,Ve)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,se,0,0,0,De.width,De.height,le.depth,Le,De.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,se,Ne,De.width,De.height,le.depth,0,De.data,0,0);else Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else it?F&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,se,0,0,0,De.width,De.height,le.depth,Le,$e,De.data):t.texImage3D(s.TEXTURE_2D_ARRAY,se,Ne,De.width,De.height,le.depth,0,Le,$e,De.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{it&&je&&t.texStorage2D(s.TEXTURE_2D,be,Ne,Ze[0].width,Ze[0].height);for(let se=0,ue=Ze.length;se<ue;se++)De=Ze[se],M.format!==Un?Le!==null?it?F&&t.compressedTexSubImage2D(s.TEXTURE_2D,se,0,0,De.width,De.height,Le,De.data):t.compressedTexImage2D(s.TEXTURE_2D,se,Ne,De.width,De.height,0,De.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):it?F&&t.texSubImage2D(s.TEXTURE_2D,se,0,0,De.width,De.height,Le,$e,De.data):t.texImage2D(s.TEXTURE_2D,se,Ne,De.width,De.height,0,Le,$e,De.data)}else if(M.isDataArrayTexture)if(it){if(je&&t.texStorage3D(s.TEXTURE_2D_ARRAY,be,Ne,le.width,le.height,le.depth),F)if(M.layerUpdates.size>0){let se=ld(le.width,le.height,M.format,M.type);for(let ue of M.layerUpdates){let Ee=le.data.subarray(ue*se/le.data.BYTES_PER_ELEMENT,(ue+1)*se/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,ue,le.width,le.height,1,Le,$e,Ee)}M.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,Le,$e,le.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ne,le.width,le.height,le.depth,0,Le,$e,le.data);else if(M.isData3DTexture)it?(je&&t.texStorage3D(s.TEXTURE_3D,be,Ne,le.width,le.height,le.depth),F&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,Le,$e,le.data)):t.texImage3D(s.TEXTURE_3D,0,Ne,le.width,le.height,le.depth,0,Le,$e,le.data);else if(M.isFramebufferTexture){if(je)if(it)t.texStorage2D(s.TEXTURE_2D,be,Ne,le.width,le.height);else{let se=le.width,ue=le.height;for(let Ee=0;Ee<be;Ee++)t.texImage2D(s.TEXTURE_2D,Ee,Ne,se,ue,0,Le,$e,null),se>>=1,ue>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in s){let se=s.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),le.parentNode!==se){se.appendChild(le),u.add(M),se.onpaint=ue=>{let Ee=ue.changedElements;for(let he of u)Ee.includes(he.image)&&(he.needsUpdate=!0)},se.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,le);else{let Ee=s.RGBA,he=s.RGBA,Ve=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Ee,he,Ve,le)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Ze.length>0){if(it&&je){let se=St(Ze[0]);t.texStorage2D(s.TEXTURE_2D,be,Ne,se.width,se.height)}for(let se=0,ue=Ze.length;se<ue;se++)De=Ze[se],it?F&&t.texSubImage2D(s.TEXTURE_2D,se,0,0,Le,$e,De):t.texImage2D(s.TEXTURE_2D,se,Ne,Le,$e,De);M.generateMipmaps=!1}else if(it){if(je){let se=St(le);t.texStorage2D(s.TEXTURE_2D,be,Ne,se.width,se.height)}F&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Le,$e,le)}else t.texImage2D(s.TEXTURE_2D,0,Ne,Le,$e,le);m(M)&&x(J),we.__version=ve.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function rt(P,M,W){if(M.image.length!==6)return;let J=st(P,M),te=M.source;t.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+W);let ve=n.get(te);if(te.version!==ve.__version||J===!0){t.activeTexture(s.TEXTURE0+W);let we=Tt.getPrimaries(Tt.workingColorSpace),ne=M.colorSpace===is?null:Tt.getPrimaries(M.colorSpace),le=M.colorSpace===is||we===ne?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);let Le=M.isCompressedTexture||M.image[0].isCompressedTexture,$e=M.image[0]&&M.image[0].isDataTexture,Ne=[];for(let he=0;he<6;he++)!Le&&!$e?Ne[he]=g(M.image[he],!0,i.maxCubemapSize):Ne[he]=$e?M.image[he].image:M.image[he],Ne[he]=Ft(M,Ne[he]);let De=Ne[0],Ze=r.convert(M.format,M.colorSpace),it=r.convert(M.type),je=y(M.internalFormat,Ze,it,M.normalized,M.colorSpace),F=M.isVideoTexture!==!0,be=ve.__version===void 0||J===!0,se=te.dataReady,ue=T(M,De);xt(s.TEXTURE_CUBE_MAP,M);let Ee;if(Le){F&&be&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ue,je,De.width,De.height);for(let he=0;he<6;he++){Ee=Ne[he].mipmaps;for(let Ve=0;Ve<Ee.length;Ve++){let We=Ee[Ve];M.format!==Un?Ze!==null?F?se&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ve,0,0,We.width,We.height,Ze,We.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ve,je,We.width,We.height,0,We.data):Ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ve,0,0,We.width,We.height,Ze,it,We.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ve,je,We.width,We.height,0,Ze,it,We.data)}}}else{if(Ee=M.mipmaps,F&&be){Ee.length>0&&ue++;let he=St(Ne[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,ue,je,he.width,he.height)}for(let he=0;he<6;he++)if($e){F?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Ne[he].width,Ne[he].height,Ze,it,Ne[he].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,je,Ne[he].width,Ne[he].height,0,Ze,it,Ne[he].data);for(let Ve=0;Ve<Ee.length;Ve++){let Dt=Ee[Ve].image[he].image;F?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ve+1,0,0,Dt.width,Dt.height,Ze,it,Dt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ve+1,je,Dt.width,Dt.height,0,Ze,it,Dt.data)}}else{F?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Ze,it,Ne[he]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,je,Ze,it,Ne[he]);for(let Ve=0;Ve<Ee.length;Ve++){let We=Ee[Ve];F?se&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ve+1,0,0,Ze,it,We.image[he]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ve+1,je,Ze,it,We.image[he])}}}m(M)&&x(s.TEXTURE_CUBE_MAP),ve.__version=te.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function He(P,M,W,J,te,ve){let we=r.convert(W.format,W.colorSpace),ne=r.convert(W.type),le=y(W.internalFormat,we,ne,W.normalized,W.colorSpace),Le=n.get(M),$e=n.get(W);if($e.__renderTarget=M,!Le.__hasExternalTextures){let Ne=Math.max(1,M.width>>ve),De=Math.max(1,M.height>>ve);te===s.TEXTURE_3D||te===s.TEXTURE_2D_ARRAY?t.texImage3D(te,ve,le,Ne,De,M.depth,0,we,ne,null):t.texImage2D(te,ve,le,Ne,De,0,we,ne,null)}t.bindFramebuffer(s.FRAMEBUFFER,P),lt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,te,$e.__webglTexture,0,nt(M)):(te===s.TEXTURE_2D||te>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,J,te,$e.__webglTexture,ve),t.bindFramebuffer(s.FRAMEBUFFER,null)}function ot(P,M,W){if(s.bindRenderbuffer(s.RENDERBUFFER,P),M.depthBuffer){let J=M.depthTexture,te=J&&J.isDepthTexture?J.type:null,ve=A(M.stencilBuffer,te),we=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;lt(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,nt(M),ve,M.width,M.height):W?s.renderbufferStorageMultisample(s.RENDERBUFFER,nt(M),ve,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ve,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,we,s.RENDERBUFFER,P)}else{let J=M.textures;for(let te=0;te<J.length;te++){let ve=J[te],we=r.convert(ve.format,ve.colorSpace),ne=r.convert(ve.type),le=y(ve.internalFormat,we,ne,ve.normalized,ve.colorSpace);lt(M)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,nt(M),le,M.width,M.height):W?s.renderbufferStorageMultisample(s.RENDERBUFFER,nt(M),le,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,le,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Nt(P,M,W){let J=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,P),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let te=n.get(M.depthTexture);if(te.__renderTarget=M,(!te.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),J){if(te.__webglInit===void 0&&(te.__webglInit=!0,M.depthTexture.addEventListener("dispose",L)),te.__webglTexture===void 0){te.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,te.__webglTexture),xt(s.TEXTURE_CUBE_MAP,M.depthTexture);let Le=r.convert(M.depthTexture.format),$e=r.convert(M.depthTexture.type),Ne;M.depthTexture.format===Di?Ne=s.DEPTH_COMPONENT24:M.depthTexture.format===Rs&&(Ne=s.DEPTH24_STENCIL8);for(let De=0;De<6;De++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+De,0,Ne,M.width,M.height,0,Le,$e,null)}}else Q(M.depthTexture,0);let ve=te.__webglTexture,we=nt(M),ne=J?s.TEXTURE_CUBE_MAP_POSITIVE_X+W:s.TEXTURE_2D,le=M.depthTexture.format===Rs?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(M.depthTexture.format===Di)lt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,le,ne,ve,0,we):s.framebufferTexture2D(s.FRAMEBUFFER,le,ne,ve,0);else if(M.depthTexture.format===Rs)lt(M)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,le,ne,ve,0,we):s.framebufferTexture2D(s.FRAMEBUFFER,le,ne,ve,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ce(P){let M=n.get(P),W=P.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==P.depthTexture){let J=P.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),J){let te=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,J.removeEventListener("dispose",te)};J.addEventListener("dispose",te),M.__depthDisposeCallback=te}M.__boundDepthTexture=J}if(P.depthTexture&&!M.__autoAllocateDepthBuffer)if(W)for(let J=0;J<6;J++)Nt(M.__webglFramebuffer[J],P,J);else{let J=P.texture.mipmaps;J&&J.length>0?Nt(M.__webglFramebuffer[0],P,0):Nt(M.__webglFramebuffer,P,0)}else if(W){M.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[J]),M.__webglDepthbuffer[J]===void 0)M.__webglDepthbuffer[J]=s.createRenderbuffer(),ot(M.__webglDepthbuffer[J],P,!1);else{let te=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ve=M.__webglDepthbuffer[J];s.bindRenderbuffer(s.RENDERBUFFER,ve),s.framebufferRenderbuffer(s.FRAMEBUFFER,te,s.RENDERBUFFER,ve)}}else{let J=P.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),ot(M.__webglDepthbuffer,P,!1);else{let te=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ve=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ve),s.framebufferRenderbuffer(s.FRAMEBUFFER,te,s.RENDERBUFFER,ve)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function fe(P,M,W){let J=n.get(P);M!==void 0&&He(J.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),W!==void 0&&ce(P)}function pe(P){let M=P.texture,W=n.get(P),J=n.get(M);P.addEventListener("dispose",v);let te=P.textures,ve=P.isWebGLCubeRenderTarget===!0,we=te.length>1;if(we||(J.__webglTexture===void 0&&(J.__webglTexture=s.createTexture()),J.__version=M.version,o.memory.textures++),ve){W.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(M.mipmaps&&M.mipmaps.length>0){W.__webglFramebuffer[ne]=[];for(let le=0;le<M.mipmaps.length;le++)W.__webglFramebuffer[ne][le]=s.createFramebuffer()}else W.__webglFramebuffer[ne]=s.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){W.__webglFramebuffer=[];for(let ne=0;ne<M.mipmaps.length;ne++)W.__webglFramebuffer[ne]=s.createFramebuffer()}else W.__webglFramebuffer=s.createFramebuffer();if(we)for(let ne=0,le=te.length;ne<le;ne++){let Le=n.get(te[ne]);Le.__webglTexture===void 0&&(Le.__webglTexture=s.createTexture(),o.memory.textures++)}if(P.samples>0&&lt(P)===!1){W.__webglMultisampledFramebuffer=s.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ne=0;ne<te.length;ne++){let le=te[ne];W.__webglColorRenderbuffer[ne]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,W.__webglColorRenderbuffer[ne]);let Le=r.convert(le.format,le.colorSpace),$e=r.convert(le.type),Ne=y(le.internalFormat,Le,$e,le.normalized,le.colorSpace,P.isXRRenderTarget===!0),De=nt(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,De,Ne,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ne,s.RENDERBUFFER,W.__webglColorRenderbuffer[ne])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(W.__webglDepthRenderbuffer=s.createRenderbuffer(),ot(W.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ve){t.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),xt(s.TEXTURE_CUBE_MAP,M);for(let ne=0;ne<6;ne++)if(M.mipmaps&&M.mipmaps.length>0)for(let le=0;le<M.mipmaps.length;le++)He(W.__webglFramebuffer[ne][le],P,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,le);else He(W.__webglFramebuffer[ne],P,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);m(M)&&x(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let ne=0,le=te.length;ne<le;ne++){let Le=te[ne],$e=n.get(Le),Ne=s.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Ne=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Ne,$e.__webglTexture),xt(Ne,Le),He(W.__webglFramebuffer,P,Le,s.COLOR_ATTACHMENT0+ne,Ne,0),m(Le)&&x(Ne)}t.unbindTexture()}else{let ne=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(ne=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ne,J.__webglTexture),xt(ne,M),M.mipmaps&&M.mipmaps.length>0)for(let le=0;le<M.mipmaps.length;le++)He(W.__webglFramebuffer[le],P,M,s.COLOR_ATTACHMENT0,ne,le);else He(W.__webglFramebuffer,P,M,s.COLOR_ATTACHMENT0,ne,0);m(M)&&x(ne),t.unbindTexture()}P.depthBuffer&&ce(P)}function ge(P){let M=P.textures;for(let W=0,J=M.length;W<J;W++){let te=M[W];if(m(te)){let ve=w(P),we=n.get(te).__webglTexture;t.bindTexture(ve,we),x(ve),t.unbindTexture()}}}let Te=[],tt=[];function Ke(P){if(P.samples>0){if(lt(P)===!1){let M=P.textures,W=P.width,J=P.height,te=s.COLOR_BUFFER_BIT,ve=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,we=n.get(P),ne=M.length>1;if(ne)for(let Le=0;Le<M.length;Le++)t.bindFramebuffer(s.FRAMEBUFFER,we.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Le,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,we.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Le,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer);let le=P.texture.mipmaps;le&&le.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let Le=0;Le<M.length;Le++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(te|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(te|=s.STENCIL_BUFFER_BIT)),ne){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,we.__webglColorRenderbuffer[Le]);let $e=n.get(M[Le]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,$e,0)}s.blitFramebuffer(0,0,W,J,0,0,W,J,te,s.NEAREST),l===!0&&(Te.length=0,tt.length=0,Te.push(s.COLOR_ATTACHMENT0+Le),P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&(Te.push(ve),tt.push(ve),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,tt)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Te))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ne)for(let Le=0;Le<M.length;Le++){t.bindFramebuffer(s.FRAMEBUFFER,we.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Le,s.RENDERBUFFER,we.__webglColorRenderbuffer[Le]);let $e=n.get(M[Le]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,we.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Le,s.TEXTURE_2D,$e,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.storeMultisampledDepthBuffer===!1&&l){let M=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function nt(P){return Math.min(i.maxSamples,P.samples)}function lt(P){let M=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function O(P){let M=o.render.frame;h.get(P)!==M&&(h.set(P,M),P.update())}function Ft(P,M){let W=P.colorSpace,J=P.format,te=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||W!==Co&&W!==is&&(Tt.getTransfer(W)===Vt?(J!==Un||te!==$n)&&Ie("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",W)),M}function St(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=X,this.getTextureUnits=U,this.setTextureUnits=z,this.setTexture2D=Q,this.setTexture2DArray=Y,this.setTexture3D=j,this.setTextureCube=ie,this.rebindTextures=fe,this.setupRenderTarget=pe,this.updateRenderTargetMipmap=ge,this.updateMultisampleRenderTarget=Ke,this.setupDepthRenderbuffer=ce,this.setupFrameBufferTexture=He,this.useMultisampledRTT=lt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function k0(s,e){function t(n,i=is){let r,o=Tt.getTransfer(i);if(n===$n)return s.UNSIGNED_BYTE;if(n===ec)return s.UNSIGNED_SHORT_4_4_4_4;if(n===tc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===nd)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===id)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===ed)return s.BYTE;if(n===td)return s.SHORT;if(n===Zr)return s.UNSIGNED_SHORT;if(n===Ql)return s.INT;if(n===di)return s.UNSIGNED_INT;if(n===Dn)return s.FLOAT;if(n===vi)return s.HALF_FLOAT;if(n===sd)return s.ALPHA;if(n===rd)return s.RGB;if(n===Un)return s.RGBA;if(n===Di)return s.DEPTH_COMPONENT;if(n===Rs)return s.DEPTH_STENCIL;if(n===nc)return s.RED;if(n===da)return s.RED_INTEGER;if(n===Cs)return s.RG;if(n===ic)return s.RG_INTEGER;if(n===sc)return s.RGBA_INTEGER;if(n===fa||n===pa||n===ma||n===ga)if(o===Vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===fa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ma)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===fa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===pa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ma)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ga)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===rc||n===oc||n===ac||n===lc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===rc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===oc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ac)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===lc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===cc||n===hc||n===uc||n===dc||n===fc||n===_a||n===pc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===cc||n===hc)return o===Vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===uc)return o===Vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===dc)return r.COMPRESSED_R11_EAC;if(n===fc)return r.COMPRESSED_SIGNED_R11_EAC;if(n===_a)return r.COMPRESSED_RG11_EAC;if(n===pc)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===mc||n===gc||n===_c||n===xc||n===yc||n===vc||n===Sc||n===Mc||n===bc||n===Ec||n===wc||n===Tc||n===Ac||n===Rc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===mc)return o===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===gc)return o===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===_c)return o===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===xc)return o===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===yc)return o===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===vc)return o===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Sc)return o===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Mc)return o===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===bc)return o===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ec)return o===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===wc)return o===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Tc)return o===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ac)return o===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Rc)return o===Vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Cc||n===Pc||n===Ic)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Cc)return o===Vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Pc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ic)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Lc||n===Dc||n===xa||n===Uc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Lc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Dc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===xa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Uc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Jr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var Xb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Yb=`
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

}`,Ap=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Bo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new bn({vertexShader:Xb,fragmentShader:Yb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Yt(new Oi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Rp=class extends ii{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,p=null,_=typeof XRWebGLBinding<"u",g=new Ap,m={},x=t.getContextAttributes(),w=null,y=null,A=[],T=[],L=new re,v=null,R=null,I=new rn;I.viewport=new Ct;let B=new rn;B.viewport=new Ct;let k=[I,B],X=new Yl,U=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ae=A[$];return ae===void 0&&(ae=new Er,A[$]=ae),ae.getTargetRaySpace()},this.getControllerGrip=function($){let ae=A[$];return ae===void 0&&(ae=new Er,A[$]=ae),ae.getGripSpace()},this.getHand=function($){let ae=A[$];return ae===void 0&&(ae=new Er,A[$]=ae),ae.getHandSpace()};function V($){let ae=T.indexOf($.inputSource);if(ae===-1)return;let Me=A[ae];Me!==void 0&&(Me.update($.inputSource,$.frame,c||o),Me.dispatchEvent({type:$.type,data:$.inputSource}))}function G(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",Q);for(let $=0;$<A.length;$++){let ae=T[$];ae!==null&&(T[$]=null,A[$].disconnect(ae))}U=null,z=null,g.reset();for(let $ in m)delete m[$];if(e.setRenderTarget(w),f=null,d=null,u=null,i=null,y=null,st.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(L.width,L.height,!1),R!==null){let $=R.camera;$.fov=R.fov,$.zoom=R.zoom,$.updateProjectionMatrix(),R=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&Ie("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&Ie("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(w=e.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",G),i.addEventListener("inputsourceschange",Q),x.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(L),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,rt=null,He=null;x.depth&&(He=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=x.stencil?Rs:Di,rt=x.stencil?Jr:di);let ot={colorFormat:t.RGBA8,depthFormat:He,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(ot),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Mn(d.textureWidth,d.textureHeight,{format:Un,type:$n,depthTexture:new ys(d.textureWidth,d.textureHeight,rt,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let Me={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,Me),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Mn(f.framebufferWidth,f.framebufferHeight,{format:Un,type:$n,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),st.setContext(i),st.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Q($){for(let ae=0;ae<$.removed.length;ae++){let Me=$.removed[ae],rt=T.indexOf(Me);rt>=0&&(T[rt]=null,A[rt].disconnect(Me))}for(let ae=0;ae<$.added.length;ae++){let Me=$.added[ae],rt=T.indexOf(Me);if(rt===-1){for(let ot=0;ot<A.length;ot++)if(ot>=T.length){T.push(Me),rt=ot;break}else if(T[ot]===null){T[ot]=Me,rt=ot;break}if(rt===-1)break}let He=A[rt];He&&He.connect(Me)}}let Y=new E,j=new E;function ie($,ae,Me){Y.setFromMatrixPosition(ae.matrixWorld),j.setFromMatrixPosition(Me.matrixWorld);let rt=Y.distanceTo(j),He=ae.projectionMatrix.elements,ot=Me.projectionMatrix.elements,Nt=He[14]/(He[10]-1),ce=He[14]/(He[10]+1),fe=(He[9]+1)/He[5],pe=(He[9]-1)/He[5],ge=(He[8]-1)/He[0],Te=(ot[8]+1)/ot[0],tt=Nt*ge,Ke=Nt*Te,nt=rt/(-ge+Te),lt=nt*-ge;if(ae.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(lt),$.translateZ(nt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),He[10]===-1)$.projectionMatrix.copy(ae.projectionMatrix),$.projectionMatrixInverse.copy(ae.projectionMatrixInverse);else{let O=Nt+nt,Ft=ce+nt,St=tt-lt,P=Ke+(rt-lt),M=fe*ce/Ft*O,W=pe*ce/Ft*O;$.projectionMatrix.makePerspective(St,P,M,W,O,Ft),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ze($,ae){ae===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ae.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let ae=$.near,Me=$.far;g.texture!==null&&(g.depthNear>0&&(ae=g.depthNear),g.depthFar>0&&(Me=g.depthFar)),X.near=B.near=I.near=ae,X.far=B.far=I.far=Me,(U!==X.near||z!==X.far)&&(i.updateRenderState({depthNear:X.near,depthFar:X.far}),U=X.near,z=X.far),X.layers.mask=$.layers.mask|6,I.layers.mask=X.layers.mask&-5,B.layers.mask=X.layers.mask&-3;let rt=$.parent,He=X.cameras;ze(X,rt);for(let ot=0;ot<He.length;ot++)ze(He[ot],rt);He.length===2?ie(X,I,B):X.projectionMatrix.copy(I.projectionMatrix),R===null&&$.isPerspectiveCamera&&(R={camera:$,fov:$.fov,zoom:$.zoom}),Ge($,X,rt)};function Ge($,ae,Me){Me===null?$.matrix.copy(ae.matrixWorld):($.matrix.copy(Me.matrixWorld),$.matrix.invert(),$.matrix.multiply(ae.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ae.projectionMatrix),$.projectionMatrixInverse.copy(ae.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=vr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(X)},this.getCameraTexture=function($){return m[$]};let at=null;function xt($,ae){if(h=ae.getViewerPose(c||o),p=ae,h!==null){let Me=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let rt=!1;Me.length!==X.cameras.length&&(X.cameras.length=0,rt=!0);for(let ce=0;ce<Me.length;ce++){let fe=Me[ce],pe=null;if(f!==null)pe=f.getViewport(fe);else{let Te=u.getViewSubImage(d,fe);pe=Te.viewport,ce===0&&(e.setRenderTargetTextures(y,Te.colorTexture,Te.depthStencilTexture),e.setRenderTarget(y))}let ge=k[ce];ge===void 0&&(ge=new rn,ge.layers.enable(ce),ge.viewport=new Ct,k[ce]=ge),ge.matrix.fromArray(fe.transform.matrix),ge.matrix.decompose(ge.position,ge.quaternion,ge.scale),ge.projectionMatrix.fromArray(fe.projectionMatrix),ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(),ge.viewport.set(pe.x,pe.y,pe.width,pe.height),ce===0&&(X.matrix.copy(ge.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),rt===!0&&X.cameras.push(ge)}let He=i.enabledFeatures;if(He&&He.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let ce=u.getDepthInformation(Me[0]);ce&&ce.isValid&&ce.texture&&g.init(ce,i.renderState)}if(He&&He.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let ce=0;ce<Me.length;ce++){let fe=Me[ce].camera;if(fe){let pe=m[fe];pe||(pe=new Bo,m[fe]=pe);let ge=u.getCameraImage(fe);pe.sourceTexture=ge}}}}for(let Me=0;Me<A.length;Me++){let rt=T[Me],He=A[Me];rt!==null&&He!==void 0&&He.update(rt,ae,c||o)}at&&at($,ae),ae.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ae}),p=null}let st=new F0;st.setAnimationLoop(xt),this.setAnimationLoop=function($){at=$},this.dispose=function(){}}},qb=new ct,G0=new gt;G0.set(-1,0,0,0,1,0,0,0,1);function Zb(s,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,hp(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,x,w,y){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),u(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,x,w):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Fn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Fn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let x=e.get(m),w=x.envMap,y=x.envMapRotation;w&&(g.envMap.value=w,g.envMapRotation.value.setFromMatrix4(qb.makeRotationFromEuler(y)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(G0),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,x,w){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*x,g.scale.value=w*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,x){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Fn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){let x=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Jb(s,e,t,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,A){let T=A.program;n.uniformBlockBinding(y,T)}function c(y,A){let T=i[y.id];T===void 0&&(g(y),T=h(y),i[y.id]=T,y.addEventListener("dispose",x));let L=A.program;n.updateUBOMapping(y,L);let v=e.render.frame;r[y.id]!==v&&(d(y),r[y.id]=v)}function h(y){let A=u();y.__bindingPointIndex=A;let T=s.createBuffer(),L=y.__size,v=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,L,v),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,A,T),T}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){let A=i[y.id],T=y.uniforms,L=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,A);for(let v=0,R=T.length;v<R;v++){let I=T[v];if(Array.isArray(I))for(let B=0,k=I.length;B<k;B++)f(I[B],v,B,L);else f(I,v,0,L)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,A,T,L){if(_(y,A,T,L)===!0){let v=y.__offset,R=y.value;if(Array.isArray(R)){let I=0;for(let B=0;B<R.length;B++){let k=R[B],X=m(k);p(k,y.__data,I),typeof k!="number"&&typeof k!="boolean"&&!k.isMatrix3&&!ArrayBuffer.isView(k)&&(I+=X.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(R,y.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,v,y.__data)}}function p(y,A,T){typeof y=="number"||typeof y=="boolean"?A[0]=y:y.isMatrix3?(A[0]=y.elements[0],A[1]=y.elements[1],A[2]=y.elements[2],A[3]=0,A[4]=y.elements[3],A[5]=y.elements[4],A[6]=y.elements[5],A[7]=0,A[8]=y.elements[6],A[9]=y.elements[7],A[10]=y.elements[8],A[11]=0):ArrayBuffer.isView(y)?A.set(new y.constructor(y.buffer,y.byteOffset,A.length)):y.toArray(A,T)}function _(y,A,T,L){let v=y.value,R=A+"_"+T;if(L[R]===void 0)return typeof v=="number"||typeof v=="boolean"?L[R]=v:ArrayBuffer.isView(v)?L[R]=v.slice():L[R]=v.clone(),!0;{let I=L[R];if(typeof v=="number"||typeof v=="boolean"){if(I!==v)return L[R]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(I.equals(v)===!1)return I.copy(v),!0}}return!1}function g(y){let A=y.uniforms,T=0,L=16;for(let R=0,I=A.length;R<I;R++){let B=Array.isArray(A[R])?A[R]:[A[R]];for(let k=0,X=B.length;k<X;k++){let U=B[k],z=Array.isArray(U.value)?U.value:[U.value];for(let V=0,G=z.length;V<G;V++){let Q=z[V],Y=m(Q),j=T%L,ie=j%Y.boundary,ze=j+ie;T+=ie,ze!==0&&L-ze<Y.storage&&(T+=L-ze),U.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=T,T+=Y.storage}}}let v=T%L;return v>0&&(T+=L-v),y.__size=T,y.__cache={},this}function m(y){let A={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(A.boundary=4,A.storage=4):y.isVector2?(A.boundary=8,A.storage=8):y.isVector3||y.isColor?(A.boundary=16,A.storage=12):y.isVector4?(A.boundary=16,A.storage=16):y.isMatrix3?(A.boundary=48,A.storage=48):y.isMatrix4?(A.boundary=64,A.storage=64):y.isTexture?Ie("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(A.boundary=16,A.storage=y.byteLength):Ie("WebGLRenderer: Unsupported uniform value type.",y),A}function x(y){let A=y.target;A.removeEventListener("dispose",x);let T=o.indexOf(A.__bindingPointIndex);o.splice(T,1),s.deleteBuffer(i[A.id]),delete i[A.id],delete r[A.id]}function w(){for(let y in i)s.deleteBuffer(i[y]);o=[],i={},r={}}return{bind:l,update:c,dispose:w}}var Kb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ss=null;function $b(){return ss===null&&(ss=new qn(Kb,16,16,Cs,vi),ss.name="DFG_LUT",ss.minFilter=qt,ss.magFilter=qt,ss.wrapS=Yn,ss.wrapT=Yn,ss.generateMipmaps=!1,ss.needsUpdate=!0),ss}var Wc=class{constructor(e={}){let{canvas:t=ap(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=$n}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=o;let _=f,g=new Set([sc,ic,da]),m=new Set([$n,di,Zr,Jr,ec,tc]),x=new Uint32Array(4),w=new Int32Array(4),y=new E,A=null,T=null,L=[],v=[],R=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=yi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let I=this,B=!1,k=null,X=null,U=null,z=null;this._outputColorSpace=Sn;let V=0,G=0,Q=null,Y=-1,j=null,ie=new Ct,ze=new Ct,Ge=null,at=new Oe(0),xt=0,st=t.width,$=t.height,ae=1,Me=null,rt=null,He=new Ct(0,0,st,$),ot=new Ct(0,0,st,$),Nt=!1,ce=new $i,fe=!1,pe=!1,ge=new ct,Te=new E,tt=new Ct,Ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},nt=!1;function lt(){return Q===null?ae:1}let O=n;function Ft(b,H){return t.getContext(b,H)}let St,P,M,W,J,te,ve,we,ne,le,Le,$e,Ne,De,Ze,it,je,F,be,se,ue,Ee,he;try{let b={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Dt,!1),t.addEventListener("webglcontextrestored",Ot,!1),t.addEventListener("webglcontextcreationerror",Hn,!1),O===null){let H="webgl2";if(O=Ft(H,b),O===null)throw Ft(H)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ve()}catch(b){throw t.removeEventListener("webglcontextlost",Dt,!1),t.removeEventListener("webglcontextrestored",Ot,!1),t.removeEventListener("webglcontextcreationerror",Hn,!1),Je("WebGLRenderer: "+b.message),b}function Ve(){St=new rM(O),St.init(),ue=new k0(O,St),P=new JS(O,St,e,ue),M=new Gb(O,St),P.reversedDepthBuffer&&d&&M.buffers.depth.setReversed(!0),X=O.createFramebuffer(),U=O.createFramebuffer(),z=O.createFramebuffer(),W=new lM(O),J=new Cb,te=new Wb(O,St,M,J,P,ue,W),ve=new sM(I),we=new hy(O),Ee=new qS(O,we),ne=new oM(O,we,W,Ee),le=new hM(O,ne,we,Ee,W),F=new cM(O,P,te),Ze=new KS(J),Le=new Rb(I,ve,St,P,Ee,Ze),$e=new Zb(I,J),Ne=new Ib,De=new Ob(St),je=new YS(I,ve,M,le,p,l),it=new kb(I,le,P),he=new Jb(O,W,P,M),be=new ZS(O,St,W),se=new aM(O,St,W),W.programs=Le.programs,I.capabilities=P,I.extensions=St,I.properties=J,I.renderLists=Ne,I.shadowMap=it,I.state=M,I.info=W}_!==$n&&(R=new dM(_,t.width,t.height,a,i,r));let We=new Rp(I,O);this.xr=We,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){let b=St.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){let b=St.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(b){b!==void 0&&(ae=b,this.setSize(st,$,!1))},this.getSize=function(b){return b.set(st,$)},this.setSize=function(b,H,K=!0){if(We.isPresenting){Ie("WebGLRenderer: Can't change size while VR device is presenting.");return}st=b,$=H,t.width=Math.floor(b*ae),t.height=Math.floor(H*ae),K===!0&&(t.style.width=b+"px",t.style.height=H+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,b,H)},this.getDrawingBufferSize=function(b){return b.set(st*ae,$*ae).floor()},this.setDrawingBufferSize=function(b,H,K){st=b,$=H,ae=K,t.width=Math.floor(b*K),t.height=Math.floor(H*K),this.setViewport(0,0,b,H)},this.setEffects=function(b){if(_===$n){Je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(b){for(let H=0;H<b.length;H++)if(b[H].isOutputPass===!0){Ie("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(b||[])},this.getCurrentViewport=function(b){return b.copy(ie)},this.getViewport=function(b){return b.copy(He)},this.setViewport=function(b,H,K,q){b.isVector4?He.set(b.x,b.y,b.z,b.w):He.set(b,H,K,q),M.viewport(ie.copy(He).multiplyScalar(ae).round())},this.getScissor=function(b){return b.copy(ot)},this.setScissor=function(b,H,K,q){b.isVector4?ot.set(b.x,b.y,b.z,b.w):ot.set(b,H,K,q),M.scissor(ze.copy(ot).multiplyScalar(ae).round())},this.getScissorTest=function(){return Nt},this.setScissorTest=function(b){M.setScissorTest(Nt=b)},this.setOpaqueSort=function(b){Me=b},this.setTransparentSort=function(b){rt=b},this.getClearColor=function(b){return b.copy(je.getClearColor())},this.setClearColor=function(){je.setClearColor(...arguments)},this.getClearAlpha=function(){return je.getClearAlpha()},this.setClearAlpha=function(){je.setClearAlpha(...arguments)},this.clear=function(b=!0,H=!0,K=!0){let q=0;if(b){let Z=!1;if(Q!==null){let Re=Q.texture.format;Z=g.has(Re)}if(Z){let Re=Q.texture.type,Ce=m.has(Re),Pe=je.getClearColor(),Xe=je.getClearAlpha(),qe=Pe.r,dt=Pe.g,ft=Pe.b;Ce?(x[0]=qe,x[1]=dt,x[2]=ft,x[3]=Xe,O.clearBufferuiv(O.COLOR,0,x)):(w[0]=qe,w[1]=dt,w[2]=ft,w[3]=Xe,O.clearBufferiv(O.COLOR,0,w))}else q|=O.COLOR_BUFFER_BIT}H&&(q|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(q|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&O.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(b){b.setRenderer(this),k=b},this.dispose=function(){t.removeEventListener("webglcontextlost",Dt,!1),t.removeEventListener("webglcontextrestored",Ot,!1),t.removeEventListener("webglcontextcreationerror",Hn,!1),je.dispose(),Ne.dispose(),De.dispose(),J.dispose(),ve.dispose(),le.dispose(),Ee.dispose(),he.dispose(),Le.dispose(),We.dispose(),We.removeEventListener("sessionstart",sr),We.removeEventListener("sessionend",Rn),Gn.stop()};function Dt(b){b.preventDefault(),Lo("WebGLRenderer: Context Lost."),B=!0}function Ot(){Lo("WebGLRenderer: Context Restored."),B=!1;let b=W.autoReset,H=it.enabled,K=it.autoUpdate,q=it.needsUpdate,Z=it.type;Ve(),W.autoReset=b,it.enabled=H,it.autoUpdate=K,it.needsUpdate=q,it.type=Z}function Hn(b){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function kn(b){let H=b.target;H.removeEventListener("dispose",kn),fi(H)}function fi(b){nr(b),J.remove(b)}function nr(b){let H=J.get(b).programs;H!==void 0&&(H.forEach(function(K){Le.releaseProgram(K)}),b.isShaderMaterial&&Le.releaseShaderCache(b))}this.renderBufferDirect=function(b,H,K,q,Z,Re){H===null&&(H=Ke);let Ce=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,Pe=Zc(b,H,K,q,Z);M.setMaterial(q,Ce);let Xe=K.index,qe=1;if(q.wireframe===!0){if(Xe=ne.getWireframeAttribute(K),Xe===void 0)return;qe=2}let dt=K.drawRange,ft=K.attributes.position,ke=dt.start*qe,Et=(dt.start+dt.count)*qe;Re!==null&&(ke=Math.max(ke,Re.start*qe),Et=Math.min(Et,(Re.start+Re.count)*qe)),Xe!==null?(ke=Math.max(ke,0),Et=Math.min(Et,Xe.count)):ft!=null&&(ke=Math.max(ke,0),Et=Math.min(Et,ft.count));let Qt=Et-ke;if(Qt<0||Qt===1/0)return;Ee.setup(Z,q,Pe,K,Xe);let Bt,Pt=be;if(Xe!==null&&(Bt=we.get(Xe),Pt=se,Pt.setIndex(Bt)),Z.isMesh)q.wireframe===!0?(M.setLineWidth(q.wireframeLinewidth*lt()),Pt.setMode(O.LINES)):Pt.setMode(O.TRIANGLES);else if(Z.isLine){let yn=q.linewidth;yn===void 0&&(yn=1),M.setLineWidth(yn*lt()),Z.isLineSegments?Pt.setMode(O.LINES):Z.isLineLoop?Pt.setMode(O.LINE_LOOP):Pt.setMode(O.LINE_STRIP)}else Z.isPoints?Pt.setMode(O.POINTS):Z.isSprite&&Pt.setMode(O.TRIANGLES);if(Z.isBatchedMesh)if(St.get("WEBGL_multi_draw"))Pt.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{let yn=Z._multiDrawStarts,Fe=Z._multiDrawCounts,Zt=Z._multiDrawCount,It=Xe?we.get(Xe).bytesPerElement:1,jn=J.get(q).currentProgram.getUniforms();for(let oi=0;oi<Zt;oi++)jn.setValue(O,"_gl_DrawID",oi),Pt.render(yn[oi]/It,Fe[oi])}else if(Z.isInstancedMesh)Pt.renderInstances(ke,Qt,Z.count);else if(K.isInstancedBufferGeometry){let yn=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Fe=Math.min(K.instanceCount,yn);Pt.renderInstances(ke,Qt,Fe)}else Pt.render(ke,Qt)};function Aa(b,H,K,q){k!==null&&b.isNodeMaterial&&k.setObject(q,b),fe===!0&&Ze.setState(b,K,!1),b.transparent===!0&&b.side===ui&&b.forceSinglePass===!1?(b.side=Fn,b.needsUpdate=!0,ht(b,H,q),b.side=Ts,b.needsUpdate=!0,ht(b,H,q),b.side=ui):ht(b,H,q)}this.compile=function(b,H,K=null){K===null&&(K=b),k!==null&&k.renderStart(b,H,K),T=De.get(K),T.init(H),v.push(T),K.traverseVisible(function(Z){Z.isLight&&Z.layers.test(H.layers)&&(T.pushLight(Z),Z.castShadow&&T.pushShadow(Z))}),b!==K&&b.traverseVisible(function(Z){Z.isLight&&Z.layers.test(H.layers)&&(T.pushLight(Z),Z.castShadow&&T.pushShadow(Z))}),T.setupLights(),k!==null&&k.updateLights(T.state.lightsArray),pe=this.localClippingEnabled,fe=Ze.init(this.clippingPlanes,pe),fe===!0&&Ze.setGlobalState(this.clippingPlanes,H),k!==null&&it.render(T.state.shadowsArray,K,H);let q=new Set;return b.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;let Re=Z.material;if(Re)if(Array.isArray(Re))for(let Ce=0;Ce<Re.length;Ce++){let Pe=Re[Ce];Aa(Pe,K,H,Z),q.add(Pe)}else Aa(Re,K,H,Z),q.add(Re)}),T=v.pop(),k!==null&&k.renderEnd(),q},this.compileAsync=function(b,H,K=null){let q=this.compile(b,H,K);return new Promise(Z=>{function Re(){if(q.forEach(function(Ce){let Xe=J.get(Ce).currentProgram;(Xe===void 0||Xe.isReady())&&q.delete(Ce)}),q.size===0){Z(b);return}setTimeout(Re,10)}St.get("KHR_parallel_shader_compile")!==null?Re():setTimeout(Re,10)})};let ir=null;function ls(b){ir&&ir(b)}function sr(){Gn.stop()}function Rn(){Gn.start()}let Gn=new F0;Gn.setAnimationLoop(ls),typeof self<"u"&&Gn.setContext(self),this.setAnimationLoop=function(b){ir=b,We.setAnimationLoop(b),b===null?Gn.stop():Gn.start()},We.addEventListener("sessionstart",sr),We.addEventListener("sessionend",Rn),this.render=function(b,H){if(H!==void 0&&H.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;k!==null&&k.renderStart(b,H);let K=We.enabled===!0&&We.isPresenting===!0,q=R!==null&&(Q===null||K)&&R.begin(I,Q);if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),We.enabled===!0&&We.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(We.cameraAutoUpdate===!0&&We.updateCamera(H),H=We.getCamera()),b.isScene===!0&&b.onBeforeRender(I,b,H,Q),T=De.get(b,v.length),T.init(H),T.state.textureUnits=te.getTextureUnits(),v.push(T),ge.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),ce.setFromProjectionMatrix(ge,ni,H.reversedDepth),pe=this.localClippingEnabled,fe=Ze.init(this.clippingPlanes,pe),A=Ne.get(b,L.length),A.init(),L.push(A),We.enabled===!0&&We.isPresenting===!0){let Ce=I.xr.getDepthSensingMesh();Ce!==null&&eo(Ce,H,-1/0,I.sortObjects)}eo(b,H,0,I.sortObjects),A.finish(),k!==null&&k.updateLights(T.state.lightsArray),I.sortObjects===!0&&A.sort(Me,rt),nt=We.enabled===!1||We.isPresenting===!1||We.hasDepthSensing()===!1,nt&&je.addToRenderList(A,b),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),fe===!0&&Ze.beginShadows();let Z=T.state.shadowsArray;if(it.render(Z,b,H),fe===!0&&Ze.endShadows(),(q&&R.hasRenderPass())===!1){let Ce=A.opaque,Pe=A.transmissive;if(T.setupLights(),H.isArrayCamera){let Xe=H.cameras;if(Pe.length>0)for(let qe=0,dt=Xe.length;qe<dt;qe++){let ft=Xe[qe];Ra(Ce,Pe,b,ft)}nt&&je.render(b);for(let qe=0,dt=Xe.length;qe<dt;qe++){let ft=Xe[qe];Xi(A,b,ft,ft.viewport)}}else Pe.length>0&&Ra(Ce,Pe,b,H),nt&&je.render(b),Xi(A,b,H)}Q!==null&&G===0&&(te.updateMultisampleRenderTarget(Q),te.updateRenderTargetMipmap(Q)),q&&R.end(I),b.isScene===!0&&b.onAfterRender(I,b,H),Ee.resetDefaultState(),Y=-1,j=null,v.pop(),v.length>0?(T=v[v.length-1],te.setTextureUnits(T.state.textureUnits),fe===!0&&Ze.setGlobalState(I.clippingPlanes,T.state.camera)):T=null,L.pop(),L.length>0?A=L[L.length-1]:A=null,k!==null&&k.renderEnd()};function eo(b,H,K,q){if(b.visible===!1)return;if(b.layers.test(H.layers)){if(b.isGroup)K=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(H);else if(b.isLightProbeGrid)T.pushLightProbeGrid(b);else if(b.isLight)T.pushLight(b),b.castShadow&&T.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||b.intersectsFrustum(ce)){q&&tt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ge);let Ce=le.update(b),Pe=b.material;Pe.visible&&A.push(b,Ce,Pe,K,tt.z,null,H)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||b.intersectsFrustum(ce))){let Ce=le.update(b),Pe=b.material;if(q&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),tt.copy(b.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),tt.copy(Ce.boundingSphere.center)),tt.applyMatrix4(b.matrixWorld).applyMatrix4(ge)),Array.isArray(Pe)){let Xe=Ce.groups;for(let qe=0,dt=Xe.length;qe<dt;qe++){let ft=Xe[qe],ke=Pe[ft.materialIndex];ke&&ke.visible&&A.push(b,Ce,ke,K,tt.z,ft,H)}}else Pe.visible&&A.push(b,Ce,Pe,K,tt.z,null,H)}}let Re=b.children;for(let Ce=0,Pe=Re.length;Ce<Pe;Ce++)eo(Re[Ce],H,K,q)}function Xi(b,H,K,q){let{opaque:Z,transmissive:Re,transparent:Ce}=b;T.setupLightsView(K),fe===!0&&Ze.setGlobalState(I.clippingPlanes,K),q&&M.viewport(ie.copy(q)),Z.length>0&&rr(Z,H,K),Re.length>0&&rr(Re,H,K),Ce.length>0&&rr(Ce,H,K),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function Ra(b,H,K,q){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[q.id]===void 0){let ke=St.has("EXT_color_buffer_half_float")||St.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[q.id]=new Mn(1,1,{generateMipmaps:!0,type:ke?vi:$n,minFilter:Gi,samples:Math.max(4,P.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Tt.workingColorSpace})}let Re=T.state.transmissionRenderTarget[q.id],Ce=q.viewport||ie;Re.setSize(Ce.z*I.transmissionResolutionScale,Ce.w*I.transmissionResolutionScale);let Pe=I.getRenderTarget(),Xe=I.getActiveCubeFace(),qe=I.getActiveMipmapLevel();I.setRenderTarget(Re),I.getClearColor(at),xt=I.getClearAlpha(),xt<1&&I.setClearColor(16777215,.5),I.clear(),nt&&je.render(K);let dt=I.toneMapping;I.toneMapping=yi;let ft=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),T.setupLightsView(q),fe===!0&&Ze.setGlobalState(I.clippingPlanes,q),rr(b,K,q),te.updateMultisampleRenderTarget(Re),te.updateRenderTargetMipmap(Re),St.has("WEBGL_multisampled_render_to_texture")===!1){let ke=!1;for(let Et=0,Qt=H.length;Et<Qt;Et++){let Bt=H[Et],{object:Pt,geometry:yn,material:Fe,group:Zt}=Bt;if(Fe.side===ui&&Pt.layers.test(q.layers)){let It=Fe.side;Fe.side=Fn,Fe.needsUpdate=!0,qc(Pt,K,q,yn,Fe,Zt),Fe.side=It,Fe.needsUpdate=!0,ke=!0}}ke===!0&&(te.updateMultisampleRenderTarget(Re),te.updateRenderTargetMipmap(Re))}I.setRenderTarget(Pe,Xe,qe),I.setClearColor(at,xt),ft!==void 0&&(q.viewport=ft),I.toneMapping=dt}function rr(b,H,K){let q=H.isScene===!0?H.overrideMaterial:null;for(let Z=0,Re=b.length;Z<Re;Z++){let Ce=b[Z],{object:Pe,geometry:Xe,group:qe}=Ce,dt=Ce.material;dt.allowOverride===!0&&q!==null&&(dt=q),Pe.layers.test(K.layers)&&qc(Pe,H,K,Xe,dt,qe)}}function qc(b,H,K,q,Z,Re){k!==null&&Z.isNodeMaterial&&k.setObject(b,Z),b.onBeforeRender(I,H,K,q,Z,Re),b.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),Z.onBeforeRender(I,H,K,q,b,Re),Z.transparent===!0&&Z.side===ui&&Z.forceSinglePass===!1?(Z.side=Fn,Z.needsUpdate=!0,I.renderBufferDirect(K,H,q,Z,b,Re),Z.side=Ts,Z.needsUpdate=!0,I.renderBufferDirect(K,H,q,Z,b,Re),Z.side=ui):I.renderBufferDirect(K,H,q,Z,b,Re),b.onAfterRender(I,H,K,q,Z,Re)}function ht(b,H,K){H.isScene!==!0&&(H=Ke);let q=J.get(b),Z=T.state.lights,Re=T.state.shadowsArray,Ce=Z.state.version,Pe=Le.getParameters(b,Z.state,Re,H,K,T.state.lightProbeGridArray),Xe=Le.getProgramCacheKey(Pe),qe=q.programs;q.environment=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?H.environment:null,q.fog=H.fog;let dt=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap;q.envMap=ve.get(b.envMap||q.environment,dt),q.envMapRotation=q.environment!==null&&b.envMap===null?H.environmentRotation:b.envMapRotation,qe===void 0&&(b.addEventListener("dispose",kn),qe=new Map,q.programs=qe);let ft=qe.get(Xe);if(ft!==void 0){if(q.currentProgram===ft&&q.lightsStateVersion===Ce)return Cn(b,Pe),ft}else Pe.uniforms=Le.getUniforms(b),k!==null&&b.isNodeMaterial&&k.build(b,K,Pe),b.onBeforeCompile(Pe,I),ft=Le.acquireProgram(Pe,Xe),qe.set(Xe,ft),q.uniforms=Pe.uniforms;let ke=q.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(ke.clippingPlanes=Ze.uniform),Cn(b,Pe),q.needsLights=Sd(b),q.lightsStateVersion=Ce,q.needsLights&&(ke.ambientLightColor.value=Z.state.ambient,ke.lightProbe.value=Z.state.probe,ke.sunLights.value=Z.state.sun,ke.sunLightShadows.value=Z.state.sunShadow,ke.directionalLights.value=Z.state.directional,ke.directionalLightShadows.value=Z.state.directionalShadow,ke.spotLights.value=Z.state.spot,ke.spotLightShadows.value=Z.state.spotShadow,ke.rectAreaLights.value=Z.state.rectArea,ke.ltc_1.value=Z.state.rectAreaLTC1,ke.ltc_2.value=Z.state.rectAreaLTC2,ke.pointLights.value=Z.state.point,ke.pointLightShadows.value=Z.state.pointShadow,ke.hemisphereLights.value=Z.state.hemi,ke.sunShadowMatrix.value=Z.state.sunShadowMatrix,ke.sunShadowCascade.value=Z.state.sunShadowCascade,ke.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,ke.spotLightMatrix.value=Z.state.spotLightMatrix,ke.spotLightMap.value=Z.state.spotLightMap,ke.pointShadowMatrix.value=Z.state.pointShadowMatrix),q.lightProbeGrid=T.state.lightProbeGridArray.length>0,q.currentProgram=ft,q.uniformsList=null,ft}function nn(b){if(b.uniformsList===null){let H=b.currentProgram.getUniforms();b.uniformsList=Ma.seqWithValue(H.seq,b.uniforms)}return b.uniformsList}function Cn(b,H){let K=J.get(b);K.outputColorSpace=H.outputColorSpace,K.batching=H.batching,K.batchingColor=H.batchingColor,K.instancing=H.instancing,K.instancingColor=H.instancingColor,K.instancingMorph=H.instancingMorph,K.skinning=H.skinning,K.morphTargets=H.morphTargets,K.morphNormals=H.morphNormals,K.morphColors=H.morphColors,K.morphTargetsCount=H.morphTargetsCount,K.numClippingPlanes=H.numClippingPlanes,K.numIntersection=H.numClipIntersection,K.vertexAlphas=H.vertexAlphas,K.vertexTangents=H.vertexTangents,K.toneMapping=H.toneMapping}function Mi(b,H){if(b.length===0)return null;if(b.length===1)return b[0].texture!==null?b[0]:null;y.setFromMatrixPosition(H.matrixWorld);for(let K=0,q=b.length;K<q;K++){let Z=b[K];if(Z.texture!==null&&Z.boundingBox.containsPoint(y))return Z}return null}function Zc(b,H,K,q,Z){H.isScene!==!0&&(H=Ke),te.resetTextureUnits();let Re=H.fog,Ce=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?H.environment:null,Pe=Q===null?I.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:Tt.workingColorSpace,Xe=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,qe=ve.get(q.envMap||Ce,Xe),dt=q.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,ft=!!K.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),ke=!!K.morphAttributes.position,Et=!!K.morphAttributes.normal,Qt=!!K.morphAttributes.color,Bt=yi;q.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Bt=I.toneMapping);let Pt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,yn=Pt!==void 0?Pt.length:0,Fe=J.get(q),Zt=T.state.lights;if(fe===!0&&(pe===!0||b!==j)){let Ht=b===j&&q.id===Y;Ze.setState(q,b,Ht)}let It=!1;q.version===Fe.__version?(Fe.needsLights&&Fe.lightsStateVersion!==Zt.state.version||Fe.outputColorSpace!==Pe||Z.isBatchedMesh&&Fe.batching===!1||!Z.isBatchedMesh&&Fe.batching===!0||Z.isBatchedMesh&&Fe.batchingColor===!0&&Z._colorsTexture===null||Z.isBatchedMesh&&Fe.batchingColor===!1&&Z._colorsTexture!==null||Z.isInstancedMesh&&Fe.instancing===!1||!Z.isInstancedMesh&&Fe.instancing===!0||Z.isSkinnedMesh&&Fe.skinning===!1||!Z.isSkinnedMesh&&Fe.skinning===!0||Z.isInstancedMesh&&Fe.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Fe.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Fe.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Fe.instancingMorph===!1&&Z.morphTexture!==null||Fe.envMap!==qe||q.fog===!0&&Fe.fog!==Re||Fe.numClippingPlanes!==void 0&&(Fe.numClippingPlanes!==Ze.numPlanes||Fe.numIntersection!==Ze.numIntersection)||Fe.vertexAlphas!==dt||Fe.vertexTangents!==ft||Fe.morphTargets!==ke||Fe.morphNormals!==Et||Fe.morphColors!==Qt||Fe.toneMapping!==Bt||Fe.morphTargetsCount!==yn||!!Fe.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(It=!0):(It=!0,Fe.__version=q.version);let jn=Fe.currentProgram;It===!0&&(jn=ht(q,H,Z),k&&q.isNodeMaterial&&k.onUpdateProgram(q,jn,Fe));let oi=!1,bi=!1,Ei=!1,Qe=jn.getUniforms(),en=Fe.uniforms;if(M.useProgram(jn.program)&&(oi=!0,bi=!0,Ei=!0),q.id!==Y&&(Y=q.id,bi=!0),Fe.needsLights){let Ht=Mi(T.state.lightProbeGridArray,Z);Fe.lightProbeGrid!==Ht&&(Fe.lightProbeGrid=Ht,bi=!0)}if(oi||j!==b){M.buffers.depth.getReversed()&&b.reversedDepth!==!0&&(b._reversedDepth=!0,b.updateProjectionMatrix()),Qe.setValue(O,"projectionMatrix",b.projectionMatrix),Qe.setValue(O,"viewMatrix",b.matrixWorldInverse);let wi=Qe.map.cameraPosition;wi!==void 0&&wi.setValue(O,Te.setFromMatrixPosition(b.matrixWorld)),P.logarithmicDepthBuffer&&Qe.setValue(O,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Qe.setValue(O,"isOrthographic",b.isOrthographicCamera===!0),j!==b&&(j=b,bi=!0,Ei=!0)}if(Fe.needsLights&&(Zt.state.sunShadowMap.length>0&&Qe.setValue(O,"sunShadowMap",Zt.state.sunShadowMap,te),Zt.state.directionalShadowMap.length>0&&Qe.setValue(O,"directionalShadowMap",Zt.state.directionalShadowMap,te),Zt.state.spotShadowMap.length>0&&Qe.setValue(O,"spotShadowMap",Zt.state.spotShadowMap,te),Zt.state.pointShadowMap.length>0&&Qe.setValue(O,"pointShadowMap",Zt.state.pointShadowMap,te)),Z.isSkinnedMesh){Qe.setOptional(O,Z,"bindMatrix"),Qe.setOptional(O,Z,"bindMatrixInverse");let Ht=Z.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),Qe.setValue(O,"boneTexture",Ht.boneTexture,te))}Z.isBatchedMesh&&(Qe.setOptional(O,Z,"batchingTexture"),Qe.setValue(O,"batchingTexture",Z._matricesTexture,te),Qe.setOptional(O,Z,"batchingIdTexture"),Qe.setValue(O,"batchingIdTexture",Z._indirectTexture,te),Qe.setOptional(O,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Qe.setValue(O,"batchingColorTexture",Z._colorsTexture,te));let Yi=K.morphAttributes;if((Yi.position!==void 0||Yi.normal!==void 0||Yi.color!==void 0)&&F.update(Z,K,jn),(bi||Fe.receiveShadow!==Z.receiveShadow)&&(Fe.receiveShadow=Z.receiveShadow,Qe.setValue(O,"receiveShadow",Z.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&H.environment!==null&&(en.envMapIntensity.value=H.environmentIntensity),en.dfgLUT!==void 0&&(en.dfgLUT.value=$b()),bi){if(Qe.setValue(O,"toneMappingExposure",I.toneMappingExposure),Fe.needsLights&&vd(en,Ei),Re&&q.fog===!0&&$e.refreshFogUniforms(en,Re),$e.refreshMaterialUniforms(en,q,ae,$,T.state.transmissionRenderTarget[b.id]),Fe.needsLights&&Fe.lightProbeGrid){let Ht=Fe.lightProbeGrid;en.probesSH.value=Ht.texture,en.probesMin.value.copy(Ht.boundingBox.min),en.probesMax.value.copy(Ht.boundingBox.max),en.probesResolution.value.copy(Ht.resolution)}Ma.upload(O,nn(Fe),en,te)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Ma.upload(O,nn(Fe),en,te),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Qe.setValue(O,"center",Z.center),Qe.setValue(O,"modelViewMatrix",Z.modelViewMatrix),Qe.setValue(O,"normalMatrix",Z.normalMatrix),Qe.setValue(O,"modelMatrix",Z.matrixWorld),q.uniformsGroups!==void 0){let Ht=q.uniformsGroups;for(let wi=0,qi=Ht.length;wi<qi;wi++){let Ca=Ht[wi];he.update(Ca,jn),he.bind(Ca,jn)}}return jn}function vd(b,H){b.ambientLightColor.needsUpdate=H,b.lightProbe.needsUpdate=H,b.sunLights.needsUpdate=H,b.sunLightShadows.needsUpdate=H,b.directionalLights.needsUpdate=H,b.directionalLightShadows.needsUpdate=H,b.pointLights.needsUpdate=H,b.pointLightShadows.needsUpdate=H,b.spotLights.needsUpdate=H,b.spotLightShadows.needsUpdate=H,b.rectAreaLights.needsUpdate=H,b.hemisphereLights.needsUpdate=H}function Sd(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return Q},this.setRenderTargetTextures=function(b,H,K){let q=J.get(b);q.__autoAllocateDepthBuffer=b.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),J.get(b.texture).__webglTexture=H,J.get(b.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:K,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(b,H){let K=J.get(b);K.__webglFramebuffer=H,K.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(b,H=0,K=0){Q=b,V=H,G=K;let q=null,Z=!1,Re=!1;if(b){let Pe=J.get(b);if(Pe.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(O.FRAMEBUFFER,Pe.__webglFramebuffer),ie.copy(b.viewport),ze.copy(b.scissor),Ge=b.scissorTest,M.viewport(ie),M.scissor(ze),M.setScissorTest(Ge),Y=-1;return}else if(Pe.__webglFramebuffer===void 0)te.setupRenderTarget(b);else if(Pe.__hasExternalTextures)te.rebindTextures(b,J.get(b.texture).__webglTexture,J.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){let dt=b.depthTexture;if(Pe.__boundDepthTexture!==dt){if(dt!==null&&J.has(dt)&&(b.width!==dt.image.width||b.height!==dt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");te.setupDepthRenderbuffer(b)}}let Xe=b.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Re=!0);let qe=J.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(qe[H])?q=qe[H][K]:q=qe[H],Z=!0):b.samples>0&&te.useMultisampledRTT(b)===!1?q=J.get(b).__webglMultisampledFramebuffer:Array.isArray(qe)?q=qe[K]:q=qe,ie.copy(b.viewport),ze.copy(b.scissor),Ge=b.scissorTest}else ie.copy(He).multiplyScalar(ae).floor(),ze.copy(ot).multiplyScalar(ae).floor(),Ge=Nt;if(K!==0&&(q=X),M.bindFramebuffer(O.FRAMEBUFFER,q)&&M.drawBuffers(b,q),M.viewport(ie),M.scissor(ze),M.setScissorTest(Ge),Z){let Pe=J.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+H,Pe.__webglTexture,K)}else if(Re){let Pe=H;for(let Xe=0;Xe<b.textures.length;Xe++){let qe=J.get(b.textures[Xe]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Xe,qe.__webglTexture,K,Pe)}}else if(b!==null&&K!==0){let Pe=J.get(b.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Pe.__webglTexture,K)}Y=-1};function Is(b){let H=J.get(b);return(H.__readFormat!==b.format||H.__readType!==b.type)&&(H.__readFormat=b.format,H.__readType=b.type,H.__formatReadable=P.textureFormatReadable(b.format),H.__typeReadable=P.textureTypeReadable(b.type)),H}this.readRenderTargetPixels=function(b,H,K,q,Z,Re,Ce,Pe=0){if(!(b&&b.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Xe=J.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ce!==void 0&&(Xe=Xe[Ce]),Xe){M.bindFramebuffer(O.FRAMEBUFFER,Xe);try{let qe=b.textures[Pe],dt=qe.format,ft=qe.type;b.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Pe);let ke=Is(qe);if(ke.__formatReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(ke.__typeReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=b.width-q&&K>=0&&K<=b.height-Z&&O.readPixels(H,K,q,Z,ue.convert(dt),ue.convert(ft),Re)}finally{let qe=Q!==null?J.get(Q).__webglFramebuffer:null;M.bindFramebuffer(O.FRAMEBUFFER,qe)}}},this.readRenderTargetPixelsAsync=async function(b,H,K,q,Z,Re,Ce,Pe=0){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Xe=J.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Ce!==void 0&&(Xe=Xe[Ce]),Xe)if(H>=0&&H<=b.width-q&&K>=0&&K<=b.height-Z){M.bindFramebuffer(O.FRAMEBUFFER,Xe);let qe=b.textures[Pe],dt=qe.format,ft=qe.type;b.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Pe);let ke=Is(qe);if(ke.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(ke.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Et=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Et),O.bufferData(O.PIXEL_PACK_BUFFER,Re.byteLength,O.STREAM_READ),O.readPixels(H,K,q,Z,ue.convert(dt),ue.convert(ft),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);let Qt=Q!==null?J.get(Q).__webglFramebuffer:null;M.bindFramebuffer(O.FRAMEBUFFER,Qt);let Bt=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await i0(O,Bt,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Et),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Re),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(Et),O.deleteSync(Bt),Re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(b,H=null,K=0){let q=Math.pow(2,-K),Z=Math.floor(b.image.width*q),Re=Math.floor(b.image.height*q),Ce=H!==null?H.x:0,Pe=H!==null?H.y:0;te.setTexture2D(b,0),O.copyTexSubImage2D(O.TEXTURE_2D,K,0,0,Ce,Pe,Z,Re),M.unbindTexture()},this.copyTextureToTexture=function(b,H,K=null,q=null,Z=0,Re=0){let Ce,Pe,Xe,qe,dt,ft,ke,Et,Qt,Bt=b.isCompressedTexture?b.mipmaps[Re]:b.image;if(K!==null)Ce=K.max.x-K.min.x,Pe=K.max.y-K.min.y,Xe=K.isBox3?K.max.z-K.min.z:1,qe=K.min.x,dt=K.min.y,ft=K.isBox3?K.min.z:0;else{let en=Math.pow(2,-Z);Ce=Math.floor(Bt.width*en),Pe=Math.floor(Bt.height*en),b.isDataArrayTexture?Xe=Bt.depth:b.isData3DTexture?Xe=Math.floor(Bt.depth*en):Xe=1,qe=0,dt=0,ft=0}q!==null?(ke=q.x,Et=q.y,Qt=q.z):(ke=0,Et=0,Qt=0);let Pt=ue.convert(H.format),yn=ue.convert(H.type),Fe;H.isData3DTexture?(te.setTexture3D(H,0),Fe=O.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(te.setTexture2DArray(H,0),Fe=O.TEXTURE_2D_ARRAY):(te.setTexture2D(H,0),Fe=O.TEXTURE_2D),M.activeTexture(O.TEXTURE0),M.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,H.flipY),M.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),M.pixelStorei(O.UNPACK_ALIGNMENT,H.unpackAlignment);let Zt=M.getParameter(O.UNPACK_ROW_LENGTH),It=M.getParameter(O.UNPACK_IMAGE_HEIGHT),jn=M.getParameter(O.UNPACK_SKIP_PIXELS),oi=M.getParameter(O.UNPACK_SKIP_ROWS),bi=M.getParameter(O.UNPACK_SKIP_IMAGES);M.pixelStorei(O.UNPACK_ROW_LENGTH,Bt.width),M.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Bt.height),M.pixelStorei(O.UNPACK_SKIP_PIXELS,qe),M.pixelStorei(O.UNPACK_SKIP_ROWS,dt),M.pixelStorei(O.UNPACK_SKIP_IMAGES,ft);let Ei=b.isDataArrayTexture||b.isData3DTexture,Qe=H.isDataArrayTexture||H.isData3DTexture;if(b.isDepthTexture){let en=J.get(b),Yi=J.get(H),Ht=J.get(en.__renderTarget),wi=J.get(Yi.__renderTarget);M.bindFramebuffer(O.READ_FRAMEBUFFER,Ht.__webglFramebuffer),M.bindFramebuffer(O.DRAW_FRAMEBUFFER,wi.__webglFramebuffer);for(let qi=0;qi<Xe;qi++)Ei&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,J.get(b).__webglTexture,Z,ft+qi),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,J.get(H).__webglTexture,Re,Qt+qi)),O.blitFramebuffer(qe,dt,Ce,Pe,ke,Et,Ce,Pe,O.DEPTH_BUFFER_BIT,O.NEAREST);M.bindFramebuffer(O.READ_FRAMEBUFFER,null),M.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(Z!==0||b.isRenderTargetTexture||J.has(b)){let en=J.get(b),Yi=J.get(H);M.bindFramebuffer(O.READ_FRAMEBUFFER,U),M.bindFramebuffer(O.DRAW_FRAMEBUFFER,z);for(let Ht=0;Ht<Xe;Ht++)Ei?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,en.__webglTexture,Z,ft+Ht):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,en.__webglTexture,Z),Qe?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Yi.__webglTexture,Re,Qt+Ht):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Yi.__webglTexture,Re),Z!==0?O.blitFramebuffer(qe,dt,Ce,Pe,ke,Et,Ce,Pe,O.COLOR_BUFFER_BIT,O.NEAREST):Qe?O.copyTexSubImage3D(Fe,Re,ke,Et,Qt+Ht,qe,dt,Ce,Pe):O.copyTexSubImage2D(Fe,Re,ke,Et,qe,dt,Ce,Pe);M.bindFramebuffer(O.READ_FRAMEBUFFER,null),M.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Qe?b.isDataTexture||b.isData3DTexture?O.texSubImage3D(Fe,Re,ke,Et,Qt,Ce,Pe,Xe,Pt,yn,Bt.data):H.isCompressedArrayTexture?O.compressedTexSubImage3D(Fe,Re,ke,Et,Qt,Ce,Pe,Xe,Pt,Bt.data):O.texSubImage3D(Fe,Re,ke,Et,Qt,Ce,Pe,Xe,Pt,yn,Bt):b.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Re,ke,Et,Ce,Pe,Pt,yn,Bt.data):b.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Re,ke,Et,Bt.width,Bt.height,Pt,Bt.data):O.texSubImage2D(O.TEXTURE_2D,Re,ke,Et,Ce,Pe,Pt,yn,Bt);M.pixelStorei(O.UNPACK_ROW_LENGTH,Zt),M.pixelStorei(O.UNPACK_IMAGE_HEIGHT,It),M.pixelStorei(O.UNPACK_SKIP_PIXELS,jn),M.pixelStorei(O.UNPACK_SKIP_ROWS,oi),M.pixelStorei(O.UNPACK_SKIP_IMAGES,bi),Re===0&&H.generateMipmaps&&O.generateMipmap(Fe),M.unbindTexture()},this.initRenderTarget=function(b){J.get(b).__webglFramebuffer===void 0&&te.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?te.setTextureCube(b,0):b.isData3DTexture?te.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?te.setTexture2DArray(b,0):te.setTexture2D(b,0),M.unbindTexture()},this.resetState=function(){V=0,G=0,Q=null,M.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Tt._getUnpackColorSpace()}};var W0={type:"change"},Pp={type:"start"},Y0={type:"end"},fd=new Ui,X0=new ti,jb=Math.cos(70*On.DEG2RAD),xn=new E,ri=2*Math.PI,Xt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Cp=1e-6,pd=class extends sa{constructor(e,t=null){super(e,t),this.state=Xt.NONE,this.target=new E,this.cursor=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Es.ROTATE,MIDDLE:Es.DOLLY,RIGHT:Es.PAN},this.touches={ONE:ws.ROTATE,TWO:ws.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new E,this._lastQuaternion=new hn,this._lastTargetPosition=new E,this._quat=new hn().setFromUnitVectors(e.up,new E(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Gr,this._sphericalDelta=new Gr,this._scale=1,this._panOffset=new E,this._rotateStart=new re,this._rotateEnd=new re,this._rotateDelta=new re,this._panStart=new re,this._panEnd=new re,this._panDelta=new re,this._dollyStart=new re,this._dollyEnd=new re,this._dollyDelta=new re,this._dollyDirection=new E,this._mouse=new re,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=eE.bind(this),this._onPointerDown=Qb.bind(this),this._onPointerUp=tE.bind(this),this._onContextMenu=lE.bind(this),this._onMouseWheel=sE.bind(this),this._onKeyDown=rE.bind(this),this._onTouchStart=oE.bind(this),this._onTouchMove=aE.bind(this),this._onMouseDown=nE.bind(this),this._onMouseMove=iE.bind(this),this._interceptControlDown=cE.bind(this),this._interceptControlUp=hE.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Xt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(W0),this.update(),this.state=Xt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;xn.copy(t).sub(this.target),xn.applyQuaternion(this._quat),this._spherical.setFromVector3(xn),this.autoRotate&&this.state===Xt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=ri:n>Math.PI&&(n-=ri),i<-Math.PI?i+=ri:i>Math.PI&&(i-=ri),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(xn.setFromSpherical(this._spherical),xn.applyQuaternion(this._quatInverse),t.copy(this.target).add(xn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=xn.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new E(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new E(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=xn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(fd.origin.copy(this.object.position),fd.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(fd.direction))<jb?this.object.lookAt(this.target):(X0.setFromNormalAndCoplanarPoint(this.object.up,this.target),fd.intersectPlane(X0,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Cp||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Cp||this._lastTargetPosition.distanceToSquared(this.target)>Cp?(this.dispatchEvent(W0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ri/60*this.autoRotateSpeed*e:ri/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){xn.setFromMatrixColumn(t,0),xn.multiplyScalar(-e),this._panOffset.add(xn)}_panUp(e,t){this.screenSpacePanning===!0?xn.setFromMatrixColumn(t,1):(xn.setFromMatrixColumn(t,0),xn.crossVectors(this.object.up,xn)),xn.multiplyScalar(e),this._panOffset.add(xn)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;xn.copy(i).sub(this.target);let r=xn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=i/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ri*this._rotateDelta.x/t.clientHeight),this._rotateUp(ri*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ri*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ri*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ri*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ri*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(ri*this._rotateDelta.x/t.clientHeight),this._rotateUp(ri*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new re,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function Qb(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function eE(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function tE(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Y0),this.state=Xt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function nE(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Es.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=Xt.DOLLY;break;case Es.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Xt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Xt.ROTATE}break;case Es.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Xt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Xt.PAN}break;default:this.state=Xt.NONE}this.state!==Xt.NONE&&this.dispatchEvent(Pp)}function iE(s){switch(this.state){case Xt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case Xt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case Xt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function sE(s){this.enabled===!1||this.enableZoom===!1||this.state!==Xt.NONE||(s.preventDefault(),this.dispatchEvent(Pp),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(Y0))}function rE(s){this.enabled!==!1&&this._handleKeyDown(s)}function oE(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case ws.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=Xt.TOUCH_ROTATE;break;case ws.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=Xt.TOUCH_PAN;break;default:this.state=Xt.NONE}break;case 2:switch(this.touches.TWO){case ws.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=Xt.TOUCH_DOLLY_PAN;break;case ws.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=Xt.TOUCH_DOLLY_ROTATE;break;default:this.state=Xt.NONE}break;default:this.state=Xt.NONE}this.state!==Xt.NONE&&this.dispatchEvent(Pp)}function aE(s){switch(this._trackPointer(s),this.state){case Xt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case Xt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case Xt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case Xt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=Xt.NONE}}function lE(s){this.enabled!==!1&&s.preventDefault()}function cE(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function hE(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Xc=new E;function Si(s,e,t,n,i,r){let o=2*Math.PI*i/4,a=Math.max(r-2*i,0),l=Math.PI/4;Xc.copy(e),Xc[n]=0,Xc.normalize();let c=.5*o/(o+a),h=1-Xc.angleTo(s)/l;return Math.sign(Xc[t])===1?h*c:a/(o+a)+c+c*(1-h)}var jr=class s extends Jn{constructor(e=1,t=1,n=1,i=2,r=.1){let o=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let l=new E,c=new E,h=new E(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,_=new E,g=.5/o;for(let m=0,x=0;m<u.length;m+=3,x+=2)switch(l.fromArray(u,m),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),u[m+0]=h.x*Math.sign(l.x)+c.x*r,u[m+1]=h.y*Math.sign(l.y)+c.y*r,u[m+2]=h.z*Math.sign(l.z)+c.z*r,d[m+0]=c.x,d[m+1]=c.y,d[m+2]=c.z,Math.floor(m/p)){case 0:_.set(1,0,0),f[x+0]=Si(_,c,"z","y",r,n),f[x+1]=1-Si(_,c,"y","z",r,t);break;case 1:_.set(-1,0,0),f[x+0]=1-Si(_,c,"z","y",r,n),f[x+1]=1-Si(_,c,"y","z",r,t);break;case 2:_.set(0,1,0),f[x+0]=1-Si(_,c,"x","z",r,e),f[x+1]=Si(_,c,"z","x",r,n);break;case 3:_.set(0,-1,0),f[x+0]=1-Si(_,c,"x","z",r,e),f[x+1]=1-Si(_,c,"z","x",r,n);break;case 4:_.set(0,0,1),f[x+0]=1-Si(_,c,"x","y",r,e),f[x+1]=1-Si(_,c,"y","x",r,t);break;case 5:_.set(0,0,-1),f[x+0]=Si(_,c,"x","y",r,e),f[x+1]=1-Si(_,c,"y","x",r,t);break}}static fromJSON(e){return new s(e.width,e.height,e.depth,e.segments,e.radius)}};var q0=new Jt,md=new E,wa=class extends kr{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new Be(e,3)),this.setAttribute("uv",new Be(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new bs(t,6,1);return this.setAttribute("instanceStart",new Nn(n,3,0)),this.setAttribute("instanceEnd",new Nn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new bs(t,6,1);return this.setAttribute("instanceColorStart",new Nn(n,3,0)),this.setAttribute("instanceColorEnd",new Nn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Nr(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jt);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),q0.setFromBufferAttribute(t),this.boundingBox.union(q0))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Kt),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)md.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(md)),md.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(md));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};Ae.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new re},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};zn.line={uniforms:ya.merge([Ae.common,Ae.fog,Ae.line]),vertexShader:`
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
		`};var Ps=class extends bn{constructor(e){super({type:"LineMaterial",uniforms:ya.clone(zn.line.uniforms),vertexShader:zn.line.vertexShader,fragmentShader:zn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var Ip=new Ct,Z0=new E,J0=new E,wn=new Ct,Tn=new Ct,rs=new Ct,Lp=new E,Dp=new ct,An=new ia,K0=new E,gd=new Jt,_d=new Kt,os=new Ct,as,Qr;function $0(s,e,t){return os.set(0,0,-e,1).applyMatrix4(s.projectionMatrix),os.multiplyScalar(1/os.w),os.x=Qr/t.width,os.y=Qr/t.height,os.applyMatrix4(s.projectionMatrixInverse),os.multiplyScalar(1/os.w),Math.abs(Math.max(os.x,os.y))}function uE(s,e){let t=s.matrixWorld,n=s.geometry,i=n.attributes.instanceStart,r=n.attributes.instanceEnd,o=Math.min(n.instanceCount,i.count);for(let a=0,l=o;a<l;a++){An.start.fromBufferAttribute(i,a),An.end.fromBufferAttribute(r,a),An.applyMatrix4(t);let c=new E,h=new E;as.distanceSqToSegment(An.start,An.end,h,c),h.distanceTo(c)<Qr*.5&&e.push({point:h,pointOnLine:c,distance:as.origin.distanceTo(h),object:s,face:null,faceIndex:a,uv:null,uv1:null})}}function dE(s,e,t){let n=e.projectionMatrix,r=s.material.resolution,o=s.matrixWorld,a=s.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,h=Math.min(a.instanceCount,l.count),u=-e.near;as.at(1,rs),rs.w=1,rs.applyMatrix4(e.matrixWorldInverse),rs.applyMatrix4(n),rs.multiplyScalar(1/rs.w),rs.x*=r.x/2,rs.y*=r.y/2,rs.z=0,Lp.copy(rs),Dp.multiplyMatrices(e.matrixWorldInverse,o);for(let d=0,f=h;d<f;d++){if(wn.fromBufferAttribute(l,d),Tn.fromBufferAttribute(c,d),wn.w=1,Tn.w=1,wn.applyMatrix4(Dp),Tn.applyMatrix4(Dp),wn.z>u&&Tn.z>u)continue;if(wn.z>u){let w=wn.z-Tn.z,y=(wn.z-u)/w;wn.lerp(Tn,y)}else if(Tn.z>u){let w=Tn.z-wn.z,y=(Tn.z-u)/w;Tn.lerp(wn,y)}wn.applyMatrix4(n),Tn.applyMatrix4(n),wn.multiplyScalar(1/wn.w),Tn.multiplyScalar(1/Tn.w),wn.x*=r.x/2,wn.y*=r.y/2,Tn.x*=r.x/2,Tn.y*=r.y/2,An.start.copy(wn),An.start.z=0,An.end.copy(Tn),An.end.z=0;let _=An.closestPointToPointParameter(Lp,!0);An.at(_,K0);let g=On.lerp(wn.z,Tn.z,_),m=g>=-1&&g<=1,x=Lp.distanceTo(K0)<Qr*.5;if(m&&x){An.start.fromBufferAttribute(l,d),An.end.fromBufferAttribute(c,d),An.start.applyMatrix4(o),An.end.applyMatrix4(o);let w=new E,y=new E;as.distanceSqToSegment(An.start,An.end,y,w),t.push({point:y,pointOnLine:w,distance:as.origin.distanceTo(y),object:s,face:null,faceIndex:d,uv:null,uv1:null})}}}var xd=class extends Yt{constructor(e=new wa,t=new Ps({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let o=0,a=0,l=t.count;o<l;o++,a+=2)Z0.fromBufferAttribute(t,o),J0.fromBufferAttribute(n,o),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+Z0.distanceTo(J0);let r=new bs(i,2,1);return e.setAttribute("instanceDistanceStart",new Nn(r,1,0)),e.setAttribute("instanceDistanceEnd",new Nn(r,1,1)),this}raycast(e,t){let n=this.material.worldUnits,i=e.camera;if(i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;as=e.ray;let o=this.matrixWorld,a=this.geometry,l=this.material;Qr=l.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),_d.copy(a.boundingSphere).applyMatrix4(o);let c;if(n)c=Qr*.5;else{let u=Math.max(i.near,_d.distanceToPoint(as.origin));c=$0(i,u,l.resolution)}if(_d.radius+=c,as.intersectsSphere(_d)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),gd.copy(a.boundingBox).applyMatrix4(o);let h;if(n)h=Qr*.5;else{let u=Math.max(i.near,gd.distanceToPoint(as.origin));h=$0(i,u,l.resolution)}gd.expandByScalar(h),as.intersectsBox(gd)!==!1&&(n?uE(this,t):dE(this,i,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Ip),this.material.uniforms.resolution.value.set(Ip.z,Ip.w))}};var tr=class extends wa{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}setFromPoints(e){let t=e.length-1,n=new Float32Array(6*t);for(let i=0;i<t;i++)n[6*i]=e[i].x,n[6*i+1]=e[i].y,n[6*i+2]=e[i].z||0,n[6*i+3]=e[i+1].x,n[6*i+4]=e[i+1].y,n[6*i+5]=e[i+1].z||0;return super.setPositions(n),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}};var Yc=class extends xd{constructor(e=new tr,t=new Ps({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}};var j0={pitch:2.54,resistor:{leadDiameter:.55,profile:[[-3.15,.28],[-3.13,.72],[-3.03,.99],[-2.84,1.15],[-2.55,1.2],[-2.15,1.2],[-1.75,1.13],[-1.38,1],[-.95,.96],[.95,.96],[1.38,1],[1.75,1.13],[2.15,1.2],[2.55,1.2],[2.84,1.15],[3.03,.99],[3.13,.72],[3.15,.28]],bands:[[-2.16,-1.72],[-1.26,-.82],[-.36,.08],[1.63,2.15]],shell:"#d1ac80",palette:["#232323","#673c28","#b5272d","#db641f","#e8b92c","#3b7b42","#285baa","#794682","#777a78","#e7e1d4"],gold:"#b68b3b"},display:{width:12.7,length:19,height:8,rowSpan:15.24,leadDiameter:.51,leadLength:6.3,housing:"#232426",face:"#343336",lens:"#b0a2a0",lit:"#fb3429",segments:{a:[[-2.35,-6.35],[3.4,-6.35],[4.15,-5.75],[3.23,-5.1],[-2.52,-5.1],[-3.19,-5.75]],b:[[4.4,-5.42],[4.91,-4.74],[4.17,-.91],[3.33,-.34],[2.82,-1.02],[3.56,-4.85]],c:[[3.28,.35],[3.8,1.02],[3.06,4.85],[2.22,5.42],[1.7,4.75],[2.44,.92]],d:[[-4.19,5.1],[1.56,5.1],[2.25,5.75],[1.37,6.35],[-4.38,6.35],[-5.03,5.75]],e:[[-3.77,.35],[-3.25,1.02],[-3.99,4.85],[-4.83,5.42],[-5.35,4.75],[-4.61,.92]],f:[[-2.65,-5.42],[-2.14,-4.74],[-2.88,-.91],[-3.72,-.34],[-4.23,-1.02],[-3.49,-4.85]],g:[[-3.28,-.62],[2.47,-.62],[3.11,0],[2.24,.62],[-3.51,.62],[-4.15,0]]},decimal:[4.28,5.78,.62]},jumper:{solid:{conductorDiameter:.64,jacketDiameter:1.25,bareLength:6.35},flexible:{jacketDiameter:1.15,contactWidth:.64,contactLength:5.4,housingWidth:2.4,housingLength:8.2,strainReliefDiameter:1.65}}};var{pitch:Vn,resistor:Ta,display:Wi,jumper:yd}=j0;function Q0(s){let e=String(s).trim().match(/^(\d+(?:[.,]\d+)?)\s*([kKmM]?)/);if(!e)return[1,0,2];let t=e[2],n=Number(e[1].replace(",","."))*(t.toLowerCase()==="k"?1e3:t?1e6:1);if(n<1||!Number.isFinite(n))return[1,0,2];let i=Math.floor(Math.log10(n))-1,r=Math.round(n/10**i);return[Math.floor(r/10),r%10,i]}function e_(){let{profile:e,bands:t}=Ta,n=[...new Set([...e.map(([h])=>h),...t.flat()])].sort((h,u)=>h-u),i=n.map(h=>{let u=e.findIndex(([g])=>g>=h),[d,f]=e[u],[p,_]=e[Math.max(0,u-1)];return new re((d===p?f:On.lerp(_,f,(h-p)/(d-p)))/Vn,h/Vn)}),r=new Ur([new re(0,i[0].y),...i,new re(0,i.at(-1).y)],24),o=Array.from({length:5},()=>[]),a=r.index.array,l=i.length+1;for(let h=0;h<24;h++)for(let u=0;u<l;u++){let d=(n[u-1]+n[u])/2,f=t.findIndex(([_,g])=>d>_&&d<g)+1,p=(h*l+u)*6;o[f].push(...a.slice(p,p+6))}r.setIndex(o.flat());let c=0;for(let[h,u]of o.entries())r.addGroup(c,u.length,h),c+=u.length;return r}function Up(s){let e=new Qi(s.map(([n,i])=>new re(n/Vn,-i/Vn))),t=new Dr(e,{depth:.016,bevelEnabled:!0,bevelSize:.015,bevelThickness:.014,bevelSegments:1});return t.rotateX(-Math.PI/2),t}function t_(){let e=document.createElement("canvas");e.width=e.height=128;let t=e.getContext("2d"),n=t.createImageData(128,128),i=231;for(let o=0;o<n.data.length;o+=4)i=Math.imul(1664525,i)+1013904223>>>0,n.data.set([i>>>24,i>>>24,i>>>24,255],o);t.putImageData(n,0,0);let r=new Xs(e);return r.wrapS=r.wrapT=Vs,r}function jE({container:s,model:e,point:t,hole:n,onConnection:i,onPin:r,onSwitch:o,onFailure:a,onChip:l=()=>{},onHole:c=()=>{}}){let h=new wr;h.background=new Oe("#edf1ed");let u=new rn(40,1,.1,1600),d=new Wc({antialias:!0,alpha:!1});d.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6)),d.outputColorSpace=Sn,d.toneMapping=la,d.toneMappingExposure=1.08,s.append(d.domElement);let f=d.domElement;f.tabIndex=0,f.setAttribute("aria-label","Circuito en 3D. Arrastra para girar; usa la rueda para acercar. La lista de conexiones ofrece los mismos detalles con teclado."),f.setAttribute("aria-describedby","threeHelp");let p=new pd(u,f);p.enableDamping=!0,p.dampingFactor=.13,p.minDistance=5,p.maxDistance=500,p.minPolarAngle=.01,p.maxPolarAngle=Math.PI/2-.05,p.listenToKeyEvents(f),p.zoomToCursor=!0,h.add(new zr(16777215,11779256,2.4));let _=new Qs(16777215,3.2);_.position.set(-25,65,30),h.add(_);let g=new Qs(15003903,1.1);g.position.set(35,25,-30),h.add(g);let m=new Map,x=[],w=[],y=new Map,A=[],T=[],L=new Map,v=new Map,R=new Map,I={},B=null,k=[],X=[],U=null,z=new Ut,V=new Map,G=new fn;h.add(G);let Q=null,Y=null;function j(S,C,D){let N=h.children.filter(xe=>!C.has(xe)&&!xe.userData.softShadow),ee=new fn;N.forEach(xe=>ee.add(xe)),h.add(ee),V.set(S,{group:ee,holes:D,home:ee.position.clone()})}let ie=new Map,ze=new fn;h.add(ze);let Ge="",at={id:null,progress:1},xt=new bt({color:16447983,roughness:.82}),st=new bt({color:2239021,roughness:.7}),$=new bt({color:11976897,roughness:.35,metalness:.7}),ae=t_(),Me=(S,C,D=.025)=>new bt({color:S,roughness:C,bumpMap:ae,bumpScale:D}),rt=e_(),He=Me(Ta.shell,.57),ot=Ta.palette.map(S=>Me(S,.47)),Nt=new bt({color:Ta.gold,roughness:.4,metalness:.35,bumpMap:ae,bumpScale:.018}),ce=Me(Wi.housing,.43),fe=Me(Wi.face,.56),pe=Object.fromEntries(Object.entries(Wi.segments).map(([S,C])=>[S,Up(C)])),[ge,Te,tt]=Wi.decimal;pe.dp=Up(Array.from({length:16},(S,C)=>[ge+tt*Math.cos(C*Math.PI/8),Te+tt*Math.sin(C*Math.PI/8)]));let Ke=yd.flexible,nt=Ke.housingWidth/Vn,lt=Ke.housingLength/Vn,O=.18,Ft=O+lt,St=.65,P=Ft-.14,M=P+St-.05,W=.85,J=new jr(nt,lt,nt,2,.073),te=Me("#27282b",.51,.016),ve=Me("#303136",.56,.014),we=new jt(.23,Ke.strainReliefDiameter/Vn/2,St,16),ne=Ke.contactWidth/Vn,le=new jr(ne,.48,ne,1,.027),Le=new bt({color:11772017,roughness:.36,metalness:.46}),$e=new Jn(.022,lt-.42,.025),Ne=new jr(.3,.49,.045,1,.02),De=new jt(yd.solid.conductorDiameter/Vn/2,yd.solid.conductorDiameter/Vn/2,.32,8),Ze=e.bounds[0]+e.bounds[2]/2,it=e.bounds[1]+e.bounds[3]/2,je=([S,C],D=.1)=>new E((S-Ze)/30,D,(C-it)/30),F=(S,C=.1)=>je(t(S),C),be=!1,se=0,ue=null,Ee=null,he=0,Ve=null,We=[...e.bounds],Dt=!1,Ot="",Hn=null,kn=1,fi={quality:"auto",background:"#edf1ed",motion:"full"},nr={scale:1,intensity:1},Aa=0,ir=!1,ls=!0,sr=!1,Rn=Zp({THREE:Ea,scene:h,container:s,camera:u,canvas:f,requestRender:Qe}),Gn=new fn;h.add(Gn);let eo="",Xi=null,Ra=0;function rr(S){Xi=S?.active?S:null;let C=Xi?.ids||[],D=C.join("|");if(D!==eo){Gn.traverse(ee=>{ee.geometry?.dispose(),ee.material?.dispose()}),Gn.clear(),eo=D;for(let ee of C){let xe=m.get(ee);if(!xe||xe.it.kind!=="wire")continue;let Ue=new tr;Ue.setPositions(Array.from({length:xe.wire.geometry.parameters.tubularSegments+1},(de,Se)=>xe.curve.getPointAt(Se/xe.wire.geometry.parameters.tubularSegments)).flatMap(de=>de.toArray()));for(let[de,Se]of[[14791749,8],[xe.material.color,3]]){let oe=new Ps({color:de,linewidth:Se,worldUnits:!1,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),Ye=new Yc(Ue,oe);Ye.userData.signal=ee,Ye.renderOrder=21,Ye.frustumCulled=!1,Gn.add(Ye)}Ra++}}let N=s.getBoundingClientRect();Gn.visible=!!Xi;for(let ee of Gn.children)ee.visible=!!m.get(ee.userData.signal)?.group.visible,ee.material.opacity=Xi?.value===1?.9:.5,ee.material.resolution.set(N.width||1,N.height||1)}function qc(S){JSON.stringify(S||null)!==JSON.stringify(Xi)&&(Ve?qi({...Ve,studio:{...Ve.studio,signals:S}}):(rr(S),Qe()))}function ht(S,C,D,N=h){let ee=new Yt(S,C);return ee.position.copy(D),N.add(ee),ee}function nn(S,C,D,N,ee,xe=h){return ht(new Jn(S,C,D),ee,N,xe)}function Cn(S,C,D,N,ee,xe=h,Ue=.08){return ht(new jr(S,C,D,2,Ue),ee,N,xe)}function Mi(S,C,D=.046){return ht(new zi(new Fi(S,!1,"centripetal"),16,D,8,!1),$.clone(),new E,C)}function Zc(S,C=.22){let D=S.filter((Ue,de)=>de===0||Ue.distanceTo(S[de-1])>1e-6),N=new Zs,ee=D[0];for(let Ue=1;Ue<D.length-1;Ue++){let de=D[Ue],Se=D[Ue-1],oe=D[Ue+1],Ye=Math.min(C,Se.distanceTo(de)/3,oe.distanceTo(de)/3),_e=de.clone().addScaledVector(Se.clone().sub(de).normalize(),Ye),ye=de.clone().addScaledVector(oe.clone().sub(de).normalize(),Ye);ee.distanceTo(_e)>1e-6&&N.add(new ji(ee,_e)),N.add(new qs(_e,de,ye)),ee=ye}let xe=D[D.length-1];return ee.distanceTo(xe)>1e-6&&N.add(new ji(ee,xe)),N}function vd(S,C,D,N){let ee=(D||[S,C]).map(me=>me.clone().setY(N)).filter((me,pt,Lt)=>!pt||me.distanceTo(Lt[pt-1])>1e-6),xe=ee[0],Ue=ee.at(-1),de=ee[1].clone().sub(xe).normalize(),Se=Ue.clone().sub(ee.at(-2)).normalize(),oe=Math.min(2.45,xe.distanceTo(ee[1])*.44),Ye=Math.min(2.45,Ue.distanceTo(ee.at(-2))*.44),_e=xe.clone().addScaledVector(de,oe),ye=Ue.clone().addScaledVector(Se,-Ye),mt=S.clone().add(new E(0,M,0)),Rt=C.clone().add(new E(0,M,0)),et=mt.clone().add(new E(0,.62,0)),yt=Rt.clone().add(new E(0,W,0)),At=new Zs;At.getPointAt=At.getPoint.bind(At),At.getTangentAt=At.getTangent.bind(At),At.add(new ji(mt,et)),At.add(new Ys(et,et.clone().add(new E(0,.62,0)),_e.clone().addScaledVector(de,-oe*.52),_e));for(let me of Zc([_e,...ee.slice(1,-1),ye]).curves)At.add(me);return At.add(new Ys(ye,ye.clone().addScaledVector(Se,Ye*.52),yt.clone().add(new E(0,.64,0)),yt)),At.add(new ji(yt,Rt)),At}function Sd(S,C,D,N){let ee=new fn;ee.position.copy(S),C.add(ee);let xe=(oe,Ye,_e,ye,mt)=>ht(oe,Ye,new E(_e,ye,mt),ee),Ue=xe(le,D.pin,0,O-.18,0),de=xe(J,D.housing,0,O+lt/2,0),Se=xe(we,D.collar,0,P+St/2,0);for(let oe of[-1,1])xe($e,D.collar,nt*.28,O+lt/2,oe*nt*.499),xe(Ne,D.collar,0,O+lt*.37,oe*nt*.499);for(let oe of[Ue,de,Se])oe.userData={id:N},x.push(oe);return ee}function Is(S,C=1024,D=512){let N=document.createElement("canvas");N.width=C,N.height=D,S(N.getContext("2d"),C,D);let ee=new Xs(N);return ee.colorSpace=Sn,ee.anisotropy=Math.min(4,d.capabilities.getMaxAnisotropy()),ee}function b(S,C,D,N,{color:ee="#dbe5e1",background:xe="#222a2d",size:Ue=48}={}){let de=Is((oe,Ye,_e)=>{oe.fillStyle=xe,oe.fillRect(0,0,Ye,_e),oe.fillStyle=ee,oe.textAlign="center",oe.textBaseline="middle",oe.font="600 "+Ue+"px Arial",S.split(`
`).forEach((ye,mt,Rt)=>oe.fillText(ye,Ye/2,_e/2+(mt-(Rt.length-1)/2)*Ue*1.45))},512,256),Se=ht(new Oi(D,N),new $t({map:de}),C);return Se.rotation.x=-Math.PI/2,Se.userData.viewerLabel=!0,Se.userData.labelText=S,Se}let H=Is((S,C,D)=>{let N=S.createRadialGradient(C/2,D/2,0,C/2,D/2,C/2);N.addColorStop(0,"#1b322344"),N.addColorStop(.5,"#1b32231b"),N.addColorStop(1,"#1b322300"),S.fillStyle=N,S.fillRect(0,0,C,D)},128,128);function K(S,C,D,N=h){let ee=ht(new Oi(C,D),new $t({map:H,transparent:!0,depthWrite:!1}),S.clone().setY(.045),N);return ee.rotation.x=-Math.PI/2,ee.userData.softShadow=!0,ee}let q=Is((S,C,D)=>{let N=S.createRadialGradient(C/2,D/2,0,C/2,D/2,C/2);N.addColorStop(0,"#ffca9566"),N.addColorStop(.3,"#ff6b4638"),N.addColorStop(1,"#ff6b4600"),S.fillStyle=N,S.fillRect(0,0,C,D)},128,128);for(let[S,C]of Object.entries(e.boards)){let D=(C.columns-1)*30+70,N=60+C.xOffset,ee=145+C.yOffset;Cn(D/30,1.25,605/30,je([N+D/2,ee+302.5],-.625),xt,h,.2),nn((D-45)/30,.06,65/30,je([N+20+(D-45)/2,455.5+C.yOffset],.035),new bt({color:13686994,roughness:1}));let xe=Is((Se,oe,Ye)=>{Se.scale(oe/D,Ye/605),Se.fillStyle="#faf9ef",Se.fillRect(0,0,D,605),Se.font="bold 14px Arial",Se.fillStyle="#475b52",Se.fillText("PLACA "+S+" \xB7 "+C.columns+" COLUMNAS",12,23),Se.font="13px Arial",Se.textAlign="center";for(let _e=1;_e<=C.columns;_e++)(_e===1||_e%5===0||_e===C.columns)&&Se.fillText(_e,35+(_e-1)*30,116);Se.textAlign="left";for(let _e of"abcdefghij")Se.fillText(_e,10,t([S,_e,1])[1]-ee+5);for(let _e of["+T","-T","-B","+B"]){let ye=t([S,_e,1])[1]-ee;Se.fillStyle=_e[0]==="+"?"#bc444c":"#3e81b5",Se.fillText(_e,8,ye+5),Se.lineWidth=2,Se.strokeStyle=Se.fillStyle,Se.beginPath(),Se.moveTo(25,ye-13),C.railBreak&&(Se.lineTo(945,ye-13),Se.moveTo(1005,ye-13)),Se.lineTo(D-20,ye-13),Se.stroke()}},2048,640),Ue=ht(new Oi(D/30,605/30),new $t({map:xe}),je([N+D/2,ee+302.5],.008));Ue.rotation.x=-Math.PI/2;let de=[];for(let Se of[..."abcdefghij","+T","-T","-B","+B"])for(let oe=1;oe<=C.columns;oe++)Se.length>1&&C.railBreak&&oe===C.railBreak+1||de.push([S,Se,oe]);for(let[Se,oe,Ye]of[[.38,.018,12107961],[.255,.03,4739406]]){let _e=new Rr(new Jn(Se,.012,Se),new bt({color:Ye,roughness:1}),de.length);de.forEach((ye,mt)=>{z.position.copy(F(ye,oe)),z.updateMatrix(),_e.setMatrixAt(mt,z.matrix)}),h.add(_e),_e.userData={holes:de},x.push(_e)}}for(let[S,C,D]of[["L\xD3GICA \xB7 5 V REGULADOS","+5","G5"],["MOTOR \xB7 6 V","+6","G6"]]){let N=F(["FUENTE",C,0]),ee=F(["FUENTE",D,0]),xe=N.clone().lerp(ee,.5);b(S,xe.clone().setY(.2).add(new E(0,0,-.9)),9,1.4,{background:"#e0e8e2",color:"#345349",size:34});for(let[Ue,de]of[[N,12861771],[ee,3490619]])ht(new jt(.23,.23,.35,14),new bt({color:de}),Ue.clone().setY(.2))}for(let S of e.chips||[]){let C=new Set(h.children),D=S.pins,N=D/2,ee=S.start,xe=F([S.board,"e",ee]),Ue=F([S.board,"f",ee+N-1]),de=xe.clone().lerp(Ue,.5).setY(.8),Se=N+.2,oe=Cn(Se,1.25,2.45,de,S.dipSwitch?new bt({color:11349559,roughness:.55}):st.clone(),h,.13);oe.userData={chip:S.id},x.push(oe);let Ye=new Jn(Se+.08,1.32,2.52),_e=new Pr(Ye);Ye.dispose();let ye=new Zn(_e,new mn({color:14265410,depthTest:!1}));ye.position.copy(de),ye.renderOrder=18,ye.visible=!1,h.add(ye),ie.set(S.id,{body:oe,outline:ye}),K(de,Se+.5,2.8);let mt=ht(new vs(.27,28,Math.PI/2,Math.PI),new bt({color:1186075,roughness:.9}),de.clone().add(new E(-Se/2+.04,.637,0)));if(mt.rotation.x=-Math.PI/2,S.dipSwitch)for(let et=1;et<=4;et++){let yt=S.functions?.[et],At=de.clone().add(new E(et-2.5,.77,.36));nn(.65,.04,1.45,At.clone().setY(de.y+.645).setZ(de.z),new bt({color:6364453}));let me=nn(.51,.16,.62,At,new bt({color:yt?16183011:10390917}));yt&&(me.userData={bit:yt,switchId:yt,dipSlider:!0,dipPosition:et,homeZ:de.z,componentHint:S.id},x.push(me),T.push(me)),b(String(et),de.clone().add(new E(et-2.5,.66,-.95)),.45,.35,{background:"#ad2e37",color:"#fff5ed",size:60})}else b(S.label+`
`+S.id,de.clone().add(new E(.12,.637,0)),Math.max(2,Se-.9),1.75,{size:38});let Rt=ht(new vs(.09,16),new $t({color:8884620}),de.clone().add(new E(-Se/2+.4,.638,.5)));Rt.rotation.x=-Math.PI/2;for(let et=1;et<=D;et++){let yt=et>N,At=[S.board,yt?"e":"f",ee+(yt?D-et:et-1)],me=F(At,.13),pt=me.clone();pt.z=de.z+(yt?-1.18:1.18),pt.y=.5;let Lt=new Fi([me,me.clone().add(new E(0,.4,0)),pt]),kt=ht(new zi(Lt,16,.07,4,!1),$,new E);kt.userData={u:S.id,p:et,h:At},x.push(kt),w.push(kt);let ln=nn(.22,.12,.32,pt.clone().setY(.54),$);ln.userData={u:S.id,p:et,h:At},x.push(ln),y.set(S.id+"."+et,b(String(et),me.clone().add(new E(0,.025,yt?-.4:.4)),.55,.45,{color:"#35433e",background:"#faf9ef",size:95}))}j(S.id,C,Array.from({length:D},(et,yt)=>{let At=yt+1;return[S.board,At>N?"e":"f",ee+(At>N?D-At:At-1)]})),S.dipSwitch&&Rn.register({id:S.id,type:"switch",title:S.id+" \xB7 DIP de 4 posiciones",detail:()=>Object.entries(S.functions).map(([et,yt])=>et+" "+{ABRIR:"Abrir",CERRAR:"Cerrar",STOP:e.stopClosedRun?"RUN":"STOP",FCA:"Final abierta",FCC:"Final cerrada"}[yt]+" "+(I[S.id]?.[et]?"ON":"OFF")).join(" \xB7 "),anchor:de.clone().setY(1.85),hitPoint:de.clone(),group:V.get(S.id).group})}for(let S of e.arrays||[]){let C=new Set(h.children),D=Object.entries(S.pinHoles||{}).sort((Ye,_e)=>Number(Ye[0])-Number(_e[0]));if(!D.length)continue;let N=D.map(([,Ye])=>F(Ye,.1)),ee=N[0],xe=N[N.length-1],Ue=ee.clone().lerp(xe,.5).setY(1.5),de=ee.distanceTo(xe)+.98,Se=new bt({color:5652021,roughness:.65});Cn(de,1.9,.8,Ue,Se,h,.12),K(Ue,de+.3,1.35),b(S.id+"  8 x 1k",Ue.clone().setY(2.46),de-.55,.7,{background:"#563e35",color:"#f2e8dc",size:35}),D.forEach(([Ye,_e])=>{let ye=F(_e,.1),mt=ye.clone().setY(.58),Rt=Mi([ye,mt],h);Rt.userData={array:S.id,p:Number(Ye),h:_e,common:Number(Ye)===(S.commonPin||1)},A.push(Rt);let et=Number(Ye)===(S.commonPin||1)?Ye+" COM":Ye;b(et,ye.clone().setY(.055).add(new E(0,0,.82)),Number(Ye)===(S.commonPin||1)?1.15:.5,.4,{background:"#faf9ef",color:"#35433e",size:Number(Ye)===(S.commonPin||1)?40:80})});let oe=S.pinHoles?.[S.commonPin||1];if(oe){let Ye=ht(new vs(.095,20),new $t({color:15978908}),F(oe,2.462),h);Ye.rotation.x=-Math.PI/2}j(S.id,C,D.map(([,Ye])=>Ye))}for(let S of e.displays||[]){let C=new Set(h.children),D=Object.values(S.pins).map(mt=>F(mt)),N=D.reduce((mt,Rt)=>mt.add(Rt),new E).multiplyScalar(1/D.length),{width:ee,length:xe,height:Ue,leadDiameter:de}=Wi,Se=ee/Vn,oe=xe/Vn,Ye=Ue/Vn,_e=.26,ye=_e+Ye;Cn(Se,Ye-.07,oe,N.clone().setY(_e+(Ye-.07)/2),ce,h,.11),Cn(Se-.18,.15,oe-.18,N.clone().setY(ye-.075),fe,h,.065),K(N,Se+.4,oe+.4);for(let[mt,Rt]of Object.entries(S.pins)){let et=F(Rt,.1),yt=de/Vn;Cn(yt,.38,yt,et.clone().setY(.18),$,h,.024),b(String(mt),et.clone().add(new E(0,.025,Number(mt)<=5?1.1:-1.1)),.45,.35,{background:"#faf9ef",color:"#35433e",size:80})}for(let[mt,Rt]of Object.entries(pe)){let et=Me(Wi.lens,.42,.018),yt=ht(Rt,et,N.clone().setY(ye+.015));L.set(S.id+"."+mt,yt)}b(S.id,N.clone().setY(ye+.017).add(new E(0,0,3.22)),2,.31,{background:Wi.face,color:"#cfbeb8",size:45}),ht(new hi(.06,10,8),new bt({color:11576992}),N.clone().setY(ye+.012).add(new E(-2.04,0,3.15))),j(S.id,C,Object.values(S.pins))}function Z(S){if(S.externalLead)return;let C=F(S.a),D=F(S.b),N=C.distanceTo(D),ee=S.kind==="res",xe=S.kind!=="wire",Ue=!xe&&Array.isArray(S.route)&&S.route.length>=2,de=!xe&&S.a[0]!==S.b[0],Se=xe?.6:Ue?Math.max(.48,Number(S.routeHeight)||.78):S.a[0]!==S.b[0]?2.6+Number(S.id.slice(1))%3*.22:Math.min(2.25,.65+N*.065),oe=new fn,Ye=[];h.add(oe);let _e=C.clone().lerp(D,.5);_e.y=Se;let ye=Ue?[C,...S.route.map(me=>je(me,Se)),D]:null,mt=de?vd(C,D,ye,Se):Ue?Zc(ye):new Fi(ee?[C,C.clone().setY(.45),C.clone().setY(1.65),C.clone().setY(2.8),C.clone().setY(3.14),D.clone().setY(3.14),D.clone().setY(2.7),D]:[C,C.clone().setY(.36),C.clone().lerp(D,.18).setY(Se),_e,C.clone().lerp(D,.82).setY(Se),D.clone().setY(.36),D],!1,"centripetal"),Rt=new bt({color:S.color||(e.colors||{})[S.net]||"#087f93",roughness:.42,metalness:.02}),et=de?Math.max(64,Math.ceil(mt.getLength()*3)):Ue?Math.max(48,ye.length*12):N>12?64:40,yt=ht(new zi(mt,et,xe?.046:S.routingClass==="power"?.145:.125,10,!1),xe?$.clone():Rt,new E,oe);if(yt.visible=S.kind==="wire",yt.userData={id:S.id},x.push(yt),!xe){let me=de?{pin:Le.clone(),housing:te.clone(),collar:ve.clone()}:{pin:$.clone()};for(let pt of[C,D]){let Lt=de?Sd(pt,oe,me,S.id):ht(De,me.pin,pt.clone().setY(.09),oe);Ye.push([{mesh:Lt,home:Lt.position.clone()}])}}if(ee){let me=C.clone().setY(1.65),[pt,Lt,kt]=Q0(S.value),ln=[He,ot[pt],ot[Lt],kt===-1?Nt:ot[kt]||ot[2],Nt],wt=ht(rt,ln.map(to=>to.clone()),me,oe);wt.userData={id:S.id},x.push(wt);let zt=Ta.leadDiameter/Vn/2,un=Mi([C,C.clone().setY(.47)],oe,zt),Ti=Mi([C.clone().setY(2.86),C.clone().setY(3.14),D.clone().setY(3.14),D.clone().setY(2.7),D],oe,zt);un.userData=Ti.userData={id:S.id},x.push(un,Ti),Rn.register({id:S.partId||S.id,connectionId:S.id,type:"res",title:(S.partId||S.id)+" \xB7 Resistencia",detail:S.value,anchor:me.clone().setY(2.95),hitPoint:me.clone(),group:oe})}if(S.kind==="cap"&&!/^(10|100)\s*(µ|μ|u)/i.test(S.value)){let me=_e.clone().setY(.95),pt=ht(new hi(.43,20,14),new bt({color:13143105,roughness:.72}),me,oe);pt.scale.set(1,1,.38),pt.userData={id:S.id},x.push(pt);for(let[kt,ln]of[C,D].entries())Mi([ln,ln.clone().setY(.32),me.clone().add(new E(kt?.2:-.2,-.2,0))],oe);let Lt=b(S.value,me.clone().add(new E(0,.5,0)),1.8,.5,{background:"#c88c41",color:"#30271c",size:43});oe.add(Lt)}if(S.kind==="cap"&&/^(10|100)\s*(µ|μ|u)/i.test(S.value)){let me=_e.clone().setY(1.45),pt=Is((wt,zt,un)=>{wt.fillStyle="#24485a",wt.fillRect(0,0,zt,un),wt.fillStyle="#d2ddd5",wt.fillRect(zt*.21,0,zt*.16,un),wt.fillStyle="#24485a",wt.font="bold 30px Arial",wt.textAlign="center";for(let Ti=30;Ti<un;Ti+=50)wt.fillText("\u2212",zt*.29,Ti);wt.fillStyle="#dde6e3",wt.font="600 32px Arial",wt.fillText(S.value,zt*.67,un*.38),wt.font="26px Arial",wt.fillText("16 V",zt*.67,un*.65)},512,256),Lt=ht(new jt(.64,.64,1.8,40),[new bt({map:pt,roughness:.4}),$.clone(),st.clone()],me,oe);Lt.userData={id:S.id},x.push(Lt),Lt.rotation.y=Math.PI/2-Math.PI*2*.29;for(let[wt,zt]of[C,D].entries())Mi([zt,zt.clone().setY(.4),me.clone().setY(.55).add(new E(wt?.28:-.28,0,0))],oe);let kt=me.clone().setY(2.359);nn(.76,.008,.022,kt,st.clone(),oe).rotation.y=Math.PI/4,nn(.76,.008,.022,kt,st.clone(),oe).rotation.y=-Math.PI/4,K(me,2.1,1.8,oe);let ln=b(S.id+" \xB7 "+S.value,me.clone().setY(.055).add(new E(0,0,1.02)),2.4,.45,{background:"#faf9ef",color:"#345349",size:43});oe.add(ln)}if(S.kind==="pot"){let me=_e.clone().setY(1.02),pt=Cn(2.65,1.35,1.6,me,new bt({color:1534356,roughness:.36}),oe,.11);pt.userData={id:S.id},x.push(pt),nn(2.44,.08,1.42,me.clone().setY(.39),new bt({color:1065310}),oe),ht(new jt(.59,.59,.04,32),new bt({color:1523798}),me.clone().setY(1.717),oe);let Lt=ht(new jt(.51,.51,.16,40),new bt({color:12557136,metalness:.8,roughness:.24}),me.clone().setY(1.79),oe);Lt.userData={id:S.id},x.push(Lt),B=nn(.79,.018,.11,me.clone().setY(1.879),st.clone(),oe);let kt=b("203",me.clone().add(new E(.76,.679,-.4)),.68,.39,{background:"#176994",color:"#e6f0ec",size:77});oe.add(kt);for(let wt of e.potPins){let zt=F(wt);Mi([zt,zt.clone().setY(.4)],oe)}K(me,3.3,2.3,oe);let ln=b("RV1 \xB7 20 k\u03A9",me.clone().setY(.06).add(new E(0,0,-1.08)),3,.55,{background:"#faf9ef",color:"#345349",size:42});oe.add(ln);for(let wt=0;wt<3;wt++){let zt=F(e.potPins[wt],.035),un=b(String(wt+1),zt.clone().add(new E(0,0,.95)),.55,.4,{background:"#faf9ef",color:"#345349",size:85});oe.add(un)}}if(S.kind==="led"){let me=_e.clone().setY(1.22),pt=new Fr({color:12731186,emissive:0,roughness:.18,metalness:0,clearcoat:1,clearcoatRoughness:.1,transparent:!0,opacity:.88,depthWrite:!1}),Lt=ht(new jt(.52,.52,.8,32),pt,me,oe),kt=ht(new hi(.52,32,20,0,Math.PI*2,0,Math.PI/2),pt,me.clone().setY(1.62),oe),ln=ht(new jt(.6,.6,.14,32),pt,me.clone().setY(.77),oe);for(let un of[Lt,kt,ln])un.userData={id:S.id,baseOpacity:.88},x.push(un);pt.userData.baseColor=S.color||{LY:"#eab83f",LG:"#2cab66",LR:"#d34436"}[S.value]||"#d34436",pt.color.set(pt.userData.baseColor),v.set(S.value,pt);for(let[un,Ti]of[C,D].entries()){let to=me.clone().setY(1.27).add(new E(un?.18:-.18,0,0));Mi([Ti,Ti.clone().setY(.48),to.clone().setY(.72),to],oe)}nn(.18,.19,.18,me.clone().setY(1.33).add(new E(.18,0,0)),$.clone(),oe);let wt=ht(new hi(.18,16,10,0,Math.PI*2,0,Math.PI/2),new bt({color:12897486,metalness:.8,roughness:.2,side:ui}),me.clone().add(new E(.18,.23,0)),oe);wt.rotation.x=Math.PI,ht(new zi(new Fi([me.clone().add(new E(-.18,.1,0)),me.clone().add(new E(-.05,.43,0)),me.clone().add(new E(.18,.28,0))]),12,.012,5,!1),$,new E,oe),nn(.04,.11,.42,me.clone().add(new E(.56,-.45,0)),new bt({color:9978422,roughness:.3}),oe);let zt=new Ar(new Gs({map:q,transparent:!0,depthWrite:!1,blending:oa}));zt.position.copy(me).setY(1.47),zt.scale.set(2.6,2.6,1),zt.visible=!1,oe.add(zt),R.set(S.value,zt),K(me,1.7,1.7,oe),Rn.register({id:S.partId||S.id,connectionId:S.id,type:"led",title:{LR:"LED rojo",LY:"LED amarillo",LG:"LED verde"}[S.value]||"LED",detail:{LR:"STOP \xB7 parpadeo",LY:"Puerta en movimiento",LG:"Puerta completamente abierta"}[S.value]||S.value,anchor:me.clone().setY(2.25),hitPoint:me.clone(),group:oe})}if(S.kind==="motor"&&!S.externalMotor){let me=_e.clone().setY(1.2),pt=new bt({color:10595762,metalness:.78,roughness:.28}),Lt=ht(new jt(.9,.9,2.4,32),pt,me,oe);Lt.rotation.z=Math.PI/2;for(let wt of[-1.17,1.17]){let zt=ht(new jt(.86,.86,.14,32),wt<0?st:$,me.clone().add(new E(wt,0,0)),oe);zt.rotation.z=Math.PI/2}let kt=ht(new jt(.12,.12,1,16),$,me.clone().add(new E(1.65,0,0)),oe);kt.rotation.z=Math.PI/2;for(let wt of[-.42,.42])nn(.58,.025,.18,me.clone().add(new E(-.55,.8,wt)),st,oe);[C,D].forEach((wt,zt)=>{let un=me.clone().add(new E(-1.27,zt?.28:-.28,0));nn(.12,.2,.3,un,$,oe),Mi([wt,wt.clone().setY(.5),un],oe)});let ln=b("MOTOR CC \xB7 EXTERNO",me.clone().add(new E(0,1.22,0)),3.2,.6,{background:"#53676e",color:"#fff",size:36});oe.add(ln)}if(S.kind==="motor"&&S.externalMotor){let me=S.externalMotor,pt=je(me.center,3.7),Lt=new bt({color:15914312,roughness:.4}),kt=new bt({color:14072114,roughness:.55}),ln=new bt({color:12108486,metalness:.82,roughness:.28}),wt=Cn(13.2,7.1,7.3,pt.clone().add(new E(-3.4,0,0)),Lt,oe,.55);wt.userData={id:S.id},x.push(wt),K(pt,29,12,oe),Cn(12.2,.16,6.4,pt.clone().add(new E(-3.4,3.62,0)),kt,oe,.12);let zt=ht(new jt(2.65,2.65,8.8,40),ln,pt.clone().add(new E(7.1,0,0)),oe);zt.rotation.z=Math.PI/2,zt.userData={id:S.id},x.push(zt);let un=ht(new jt(2.56,2.56,1.25,32),st,pt.clone().add(new E(11.9,0,0)),oe);un.rotation.z=Math.PI/2;for(let cs of[-1.2,1.2])Cn(3.3,.12,.65,pt.clone().add(new E(9,2.3,cs)),st,oe,.08);for(let cs of[-7.8,1.1])for(let Zi of[-2.75,2.75]){let no=ht(new jt(.24,.24,.08,16),$,pt.clone().add(new E(cs,3.74,Zi)),oe);nn(.32,.02,.06,no.position.clone().add(new E(0,.06,0)),st,oe)}let Ti=ht(new jt(1.3,1.3,.65,28),kt,pt.clone().add(new E(-3.6,0,3.92)),oe);Ti.rotation.x=Math.PI/2;let to=ht(new jt(.78,.78,3.1,28),xt,pt.clone().add(new E(-3.6,0,5.55)),oe);to.rotation.x=Math.PI/2,nn(1.1,.18,2.7,pt.clone().add(new E(-3.6,.71,5.55)),xt,oe);let wd=new fn;oe.add(wd);let Xp=[];X.push({id:S.partId,group:wd,cables:Xp,stage:S.wiringStage??S.stage}),me.terminals.map(cs=>je(cs,2.15)).forEach((cs,Zi)=>{nn(.18,.55,.65,cs,$,oe);let no=Zi?D:C,Yp=me.cableRoutes?.[Zi]?Ad(Ea,me.cableRoutes[Zi],je,cs,no,me.cableHeights[Zi]):new Fi([cs,je([t(Zi?S.b:S.a)[0],790+Zi*28],1.2),no.clone().setY(.55),no],!1,"centripetal"),Jc=new fn;wd.add(Jc);let h_=new bt({color:Zi?3361114:14179409,roughness:.45}),Td=ht(new zi(Yp,96,.13,10,!1),h_,new E,Jc),u_=nn(.3,.46,.3,no.clone().setY(.23),st,Jc);Td.userData={id:S.id},x.push(Td),Xp.push({group:Jc,wire:Td,curve:Yp,plug:u_,terminal:Zi,progress:1})});let c_=b(me.label||"MOTORREDUCTOR TT \xB7 EXTERNO",je([me.center[0],me.bounds[1]+24],.12),22,.9,{background:"#f3f2e8",color:"#345349",size:35});oe.add(c_)}if(S.kind==="switch"&&S.externalControl&&(k.push(Jp({THREE:Ea,it:S,group:oe,mesh:ht,box:nn,roundedBox:Cn,toWorld:je,hpos:F,point:t,topLabel:b,contactShadow:K,pickables:x,switches:T,metal:$,dark:st,componentLabels:!1})),Rn.register({id:S.partId||S.id,connectionId:S.id,type:"switch",title:"Interruptor "+S.value,detail:S.externalControl.model.toUpperCase(),anchor:je(S.externalControl.center,4.1),group:oe})),S.kind==="switch"&&!S.externalControl){let me=(S.spdt?C.clone().lerp(F(S.third),.5):_e.clone()).setY(.65),pt=Cn(S.spdt?2.8:1.8,.9,1.35,me,new bt({color:3426627}),oe,.12),Lt=Cn(1.12,.28,.9,me.clone().add(new E(0,.58,0)),new bt({color:2383765}),oe,.08);if(Lt.userData={bit:S.value||S.id},x.push(Lt),T.push(Lt),Lt.userData.switchId=S.value||S.id,[C,D,...S.third?[F(S.third)]:[]].forEach(kt=>Mi([kt,kt.clone().setY(.5)],oe)),Rn.register({id:S.partId||S.id,connectionId:S.id,type:"switch",title:"Interruptor "+(S.value||S.id),detail:S.contact==="NC"?"Final de carrera":"Mando de puerta",anchor:me.clone().setY(1.9),group:oe}),S.contact==="NC"||S.contact==="limit-spdt"){Lt.visible=!1;let kt=nn(2.45,.085,.24,me.clone().add(new E(.5,.58,0)),$,oe);kt.rotation.z=-.15;let ln=ht(new jt(.22,.22,.36,20),st,me.clone().add(new E(1.65,.41,0)),oe);ln.rotation.x=Math.PI/2}else{let kt=(S.value||"")==="STOP";Lt.material.color.set(kt?"#bd4139":"#245f95"),Lt.userData.baseColor=kt?"#bd4139":"#245f95";let ln=b(kt?"STOP":"I / O",me.clone().add(new E(0,.73,0)),.9,.4,{background:kt?"#bd4139":"#245f95",color:"#fff",size:40});oe.add(ln)}}let At=de?1-W/mt.getLength():1;m.set(S.id,{group:oe,wire:yt,material:Rt,curve:mt,a:C,b:D,it:S,routed:Ue,routePoints:ye,height:Se,plugs:Ye,approach:At}),["wire","link"].includes(S.kind)||V.set(S.partId||S.id,{group:oe,holes:[S.a,S.b,...S.third?[S.third]:[]],external:!!(S.externalControl||S.externalMotor),home:oe.position.clone()})}e.items.forEach(Z);for(let S of e.items.filter(C=>C.externalLead)){let C=S.externalLead,D=C.motor?X.find(Ue=>Ue.id===C.partId):k.find(Ue=>Ue.id===C.partId),N=D?.cables[C.terminal];if(!N)throw new Error("Missing external cable "+S.id);h.add(N.group),N.nativeId=S.id,N.wire.userData={id:S.id},N.tip&&(N.tip.visible=!1);let ee=N.curve.getPoint(0),xe=N.curve.getPoint(1);m.set(S.id,{group:N.group,wire:N.wire,material:N.wire.material,curve:N.curve,a:ee,b:xe,it:S,routed:!1,routePoints:null,height:1.8,plugs:[[],[{mesh:N.plug,home:N.plug.position.clone()}]]})}let Re=new fn;Re.visible=!1,h.add(Re);let Ce=new tr,Pe=null,Xe=0,qe=[],dt=-1,ft=new E,ke=new E,Et=ht(new hi(1,12,8),new bt,new E),Qt=Et.material;Et.visible=!1;let Bt=S=>(S=On.clamp(S,0,1),S*S*(3-2*S)),Pt=[[1587247,10],[16765290,7],[556947,3]].map(([S,C],D)=>{let N=new Ps({color:S,linewidth:C,worldUnits:!1,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),ee=new Yc(Ce,N);return ee.renderOrder=24+D,ee.frustumCulled=!1,Re.add(ee),ee});function yn(S){if(Re.visible=!!(S?.group.visible&&S.it.kind==="wire"),!Re.visible){Pe=null;return}if(Pe===S.it.id)return;let C=S.wire.geometry.parameters.tubularSegments;qe=Array.from({length:C+1},(N,ee)=>S.curve.getPointAt(ee/C)),dt=-1;let D=new tr;D.setPositions(qe.flatMap(N=>N.toArray())),Ce.dispose(),Ce=D,Pt.forEach(N=>{N.geometry=D}),Pt[2].material.color.copy(S.material.color),Pe=S.it.id,Xe++}let Fe=[0,1].map(S=>{let C=ht(new Bi(.35,.075,8,24),new $t({color:S?4284356:882277,depthTest:!1,depthWrite:!1}),new E);return C.rotation.x=-Math.PI/2,C.renderOrder=15,C.visible=!1,{ring:C}}),Zt=ht(new hi(.17,12,8),new $t({color:16768134,depthTest:!1,depthWrite:!1}),new E);Zt.renderOrder=32,Zt.visible=!1;let It=[0,1].map(()=>{let S=ht(new Bi(.22,.06,8,24),new $t({color:15840829,depthTest:!1}),new E);return S.rotation.x=-Math.PI/2,S.renderOrder=16,S.visible=!1,S});function jn(S){for(;S;){if(!S.visible)return!1;S=S.parent}return!0}let oi=new na,bi=new re,Ei=null;f.addEventListener("pointerdown",S=>{Ei=[S.clientX,S.clientY]}),f.addEventListener("pointerup",S=>{if(!Ei||Math.hypot(S.clientX-Ei[0],S.clientY-Ei[1])>6||S.button!==0)return;let C=f.getBoundingClientRect();bi.set((S.clientX-C.left)/C.width*2-1,-(S.clientY-C.top)/C.height*2+1),oi.setFromCamera(bi,u);let D=oi.intersectObjects(x,!1).find(de=>jn(de.object));if(!D){Rn.dismiss();return}let N=D.object.userData,ee=e.chips?.find(de=>de.id===N.chip&&de.dipSwitch),xe=null;if(ee){let de=D.object.getWorldPosition(new E),Se=On.clamp(Math.floor(D.point.x-de.x+2)+1,1,4);xe=ee.functions?.[Se]}xe?o(xe):N.id?i(N.id):N.p?r(N.u||N.array,N.p):N.chip?l(N.chip):N.holes&&D.instanceId!==void 0?c(N.holes[D.instanceId]):N.bit!==void 0&&o(N.bit);let Ue=N.bit!==void 0?e.items.find(de=>de.kind==="switch"&&de.value===N.bit):null;Rn.select(N.componentHint||N.id||N.chip||N.u||Ue?.partId||Ue?.id)}),p.addEventListener("start",()=>{ue=null,Dt=!1,f.dataset.moving="false",he=50}),p.addEventListener("change",()=>{ir=!0,Qe()}),p.addEventListener("end",()=>{he=50,Qe()});function Qe(){be&&!document.hidden&&!se&&(se=requestAnimationFrame(Yi))}function en(){let S=m.get(Hn);if(!S?.group.visible)return;let{width:C,height:D}=s.getBoundingClientRect();if(!C||!D||!Ve?.cableFocus||S.it.kind!=="wire"||Ee)return;let N=2*Math.tan(u.fov*Math.PI/360)/D;for(let{ring:ee}of Fe){let xe=ee.position.clone().sub(u.position).dot(u.getWorldDirection(new E));ee.scale.setScalar(On.clamp(xe*N*5/.35,1,2.6))}}function Yi(S){if(se=0,!(!be||document.hidden)){if(ir=!1,ue){let C=On.clamp((S-ue.started)/680,0,1),D=C<.5?4*C*C*C:1-Math.pow(-2*C+2,3)/2;u.position.lerpVectors(ue.fromPos,ue.toPos,D),p.target.lerpVectors(ue.fromTarget,ue.toTarget,D),C===1&&(ue=null,f.dataset.moving="false")}if(Ee){let C=On.clamp((S-Ee.started)/Ee.duration,0,1);Zt.position.copy(Ee.curve.getPointAt(C)),Zt.visible=C<1,Fe.forEach(({ring:D})=>D.scale.setScalar(1+.25*Math.sin(C*Math.PI*2))),C===1&&(Ee=null,Fe.forEach(({ring:D})=>D.scale.setScalar(1)))}p.update(),en(),Rn.layout(),d.render(h,u),Aa++,(ue||Ee||ir&&he-- >0)&&Qe()}}function Ht(){ue&&(u.position.copy(ue.toPos),p.target.copy(ue.toTarget),ue=null,p.update()),Ee=null,Zt.visible=!1,Fe.forEach(({ring:S})=>S.scale.setScalar(1)),f.dataset.moving="false",Qe()}function wi(S,C=!0){We=[...S];let[D,N,ee,xe]=S,Ue=je([D+ee/2,N+xe/2],1.6),de=Dt?new E(0,1,.001):u.position.clone().sub(p.target).normalize();de.length()<.5&&de.set(.18,1.15,1.2).normalize();let Se=new E().crossVectors(u.up,de).normalize(),oe=new E().crossVectors(de,Se).normalize(),Ye=8,_e=Math.tan(u.fov*Math.PI/360);for(let mt of[-ee/60,ee/60])for(let Rt of[-xe/60,xe/60])for(let et of[-1.6,4]){let yt=new E(mt,et,Rt);Ye=Math.max(Ye,yt.dot(de)+1.08*Math.abs(yt.dot(Se))/(_e*u.aspect),yt.dot(de)+1.08*Math.abs(yt.dot(oe))/_e)}kn=Ye;let ye=Ue.clone().addScaledVector(de,Ye);ue=null,C&&Ve?.animate&&be&&fi.motion==="full"?(ue={fromPos:u.position.clone(),toPos:ye,fromTarget:p.target.clone(),toTarget:Ue,started:performance.now()},f.dataset.moving="true"):(u.position.copy(ye),p.target.copy(Ue),p.update(),f.dataset.moving="false"),Qe()}function qi(S){Ve=S,Hn=S.selected,typeof S.clarity=="boolean"?ls=S.clarity:typeof S.routingFocus=="boolean"&&(ls=S.routingFocus),typeof S.isolate=="boolean"&&(sr=S.isolate);let C=S.studio,D=!!C?.chip,N=new Set(C?.related||[]),ee=new Set(C?.signals?.active?C.signals.ids:[]),xe=m.get(S.selected),Ue=ls&&!!xe,de=xe?.it.partId,Se=new Set([de,...[xe?.it.fromRef,xe?.it.toRef].filter(Boolean).map(_e=>_e.split(".")[0])].filter(Boolean)),oe=S.cableFocus&&Ue&&xe?.it.kind==="wire",Ye=[xe?.it.fromRef,xe?.it.toRef].filter(_e=>/^U\d+\.\d+$/.test(_e||""));for(let[_e,ye]of m){let mt=!["wire","link"].includes(ye.it.kind)||S.step===e.stages.length-1||ye.it.stage===S.step;ye.group.visible=(mt||S.previous&&ye.it.stage<S.step||D&&N.has(_e))&&!(sr&&xe?.it.kind==="wire"&&ye.it.kind==="wire"&&_e!==S.selected);let Rt=Se.has(ye.it.partId),et=ye.it.kind==="wire"&&xe?.it.kind==="wire"&&xe.it.signal&&ye.it.signal===xe.it.signal,yt=ye.it.kind==="wire"&&de&&[ye.it.fromRef,ye.it.toRef].some(me=>me?.startsWith(de+".")),At=oe&&!D&&!C?.signals?.active?ye.it.kind==="wire"&&_e!==S.selected?et?.32:.22:1:C?.signals?.active&&ye.it.kind==="wire"?ee.has(_e)?1:.16:D?N.has(_e)?1:ye.it.kind==="wire"?.1:.8:_e===S.selected?1:Ue?ye.it.kind==="wire"?et||yt?.32:.16:Rt?1:.92:S.selected?.4:mt?1:.75;ye.group.traverse(me=>{if(me.userData.viewerLabel&&(me.visible=!Ue||_e===S.selected||Rt),me.isMesh)for(let pt of[].concat(me.material)){let Lt=me.userData.baseOpacity??1;pt.transparent=At<1||Lt<1||!!me.userData.softShadow,pt.opacity=At*Lt,pt.depthWrite=At>.6&&Lt===1&&!me.userData.softShadow}}),ye.material.emissive.set(_e===S.selected?ye.material.color:0),ye.material.emissiveIntensity=_e===S.selected?.3:0}yn(xe);for(let[_e,ye]of y)ye.visible=D?_e.startsWith(C.chip+".")&&(!C.pin||_e===C.chip+"."+C.pin):!Ue||Ye.includes(_e);It.forEach((_e,ye)=>{let mt=Ye[ye],Rt=w.find(et=>et.userData.u+"."+et.userData.p===mt);_e.visible=!!(Ue&&Rt),Rt&&_e.position.copy(F(Rt.userData.h,.23))}),Fe.forEach(({ring:_e},ye)=>{let mt=m.get(S.selected);_e.visible=!!mt?.group.visible,_e.scale.setScalar(1),mt&&_e.position.copy(ye?mt.b:mt.a).add(new E(0,.14,0))}),B&&(B.rotation.y=(S.pot/100-.5)*Math.PI),a_(C),Rn.sync(S.selected||C?.chip||"",S.selected||C?.chip),Fp(S),Ca(U);for(let _e of X)_e.group.visible=S.step>=_e.stage;s.dataset.selected=S.selected||"",s.dataset.step=S.step,s.dataset.wireClarity=String(ls),s.dataset.isolateWires=String(sr),s.dataset.visibleConnections=[...m.values()].filter(_e=>_e.group.visible).length,S.animate||Ht(),Qe()}function Ca(S){U=S;let C=0;for(let D of k)for(let N of D.cables){if(N.nativeId){C++;continue}let ee=S&&D.id===S.id&&N.terminal===S.terminal;N.group.visible=Ve?.step>=(D.wiringStage||2)&&(!S||C<=S.index),Kp(N,ee?S.progress:1),C++}Qe()}function n_(S){let C=!!S;C!==ls&&(ls=C,Ve?qi({...Ve,clarity:C}):(s.dataset.wireClarity=String(C),Qe()))}function Np(S){let C=!1;for(let[D,N]of v){let ee=!!S[D];N.userData.lit!==ee&&(N.userData.lit=ee,N.color.set(N.userData.baseColor),N.emissive.set(ee?N.userData.baseColor:"#000000"),N.emissiveIntensity=ee?.9:0,R.get(D).visible=ee,C=!0)}C&&Qe()}function Fp(S={}){I=S.contacts||Object.fromEntries((e.chips||[]).filter(C=>C.dipSwitch).map(C=>[C.id,Object.fromEntries(Object.entries(C.functions).map(([D,N])=>[D,e.stopClosedRun&&N==="STOP"?!S.switches?.[N]:!!S.switches?.[N]]))])),Np(S.leds||{});for(let[C,D]of L){let[N,ee]=C.split("."),xe=!!(S.segments?.[C]??S.segments?.[N]?.[ee]);D.material.color.set(xe?Wi.lit:Wi.lens),D.material.emissive.set(xe?Wi.lit:"#000000"),D.material.emissiveIntensity=xe?1.35:0}for(let C of T){if(C.userData.dipSlider){let D=!!S.switches?.[C.userData.switchId],N=I[C.userData.componentHint]?.[C.userData.dipPosition]??(e.stopClosedRun&&C.userData.switchId==="STOP"?!D:D);C.position.z=C.userData.homeZ+(N?-.36:.36);continue}if(C.userData.externalControl){Rd(C,!!S.switches?.[C.userData.switchId]);continue}C.rotation.z=S.switches?.[C.userData.switchId]?-.18:.18,C.material.color.set(S.switches?.[C.userData.switchId]?"#da7044":C.userData.baseColor||"#245f95")}Qe()}function i_(){let S=m.get(Hn);!S||!S.group.visible||!Ve?.animate||!be||(Ee={curve:S.curve,started:performance.now(),duration:Math.min(6e3,Math.max(2200,S.curve.getLength()*60))},Zt.visible=!0,Qe())}function s_(S){let C=S?.stripHoles||[],D=JSON.stringify(C);if(D===Ge||(Ge=D,ze.traverse(de=>{if(de.geometry?.dispose(),de.material)for(let Se of[].concat(de.material))Se.dispose()}),ze.clear(),!C.length))return;let N=F(C[0],.09),ee=F(C.at(-1),.09),xe=N.clone().lerp(ee,.5),Ue=Math.abs(N.x-ee.x)>Math.abs(N.z-ee.z);nn(Ue?N.distanceTo(ee)+.6:.62,.045,Ue?.62:N.distanceTo(ee)+.6,xe,new $t({color:14198067,transparent:!0,opacity:.38,depthTest:!1,depthWrite:!1}),ze);for(let de of C){let Se=ht(new Bi(.27,.045,8,20),new $t({color:11040800,depthTest:!1,depthWrite:!1}),F(de,.13),ze);Se.rotation.x=-Math.PI/2,Se.renderOrder=18}}function Op(S){let C=S?.reveal;if(!C||C.ring<0)return;let D=S.wire.geometry,N=C.ring*C.stride,ee=N+C.stride;for(let xe of["position","normal"]){let Ue=D.getAttribute(xe);Ue.array.set(C[xe].subarray(N,ee),N),Ue.addUpdateRange(N,C.stride),Ue.needsUpdate=!0}C.ring=-1}function r_(){if(dt<0)return;let S=Ce.getAttribute("instanceEnd"),C=qe[dt+1];S&&C&&(S.setXYZ(dt,C.x,C.y,C.z),S.data.needsUpdate=!0),dt=-1}function Bp(S){if(S){Op(S),S.wire.geometry.setDrawRange(0,1/0),Et.visible=!1;for(let C of S.plugs||[])for(let D of C)D.mesh.visible=!0,D.mesh.position.copy(D.home)}}function zp(S,C){let D=S.approach??1;return C<.78?D*Bt((C-.22)/.56):D+(1-D)*Bt((C-.78)/.22)}function Vp(S){if(at.id&&at.id!==S?.id&&Bp(m.get(at.id)),r_(),!S){at.id&&Bp(m.get(at.id)),at={id:null,progress:1},Ce.instanceCount=Ce.getAttribute("instanceStart")?.count||0,Qe();return}let C=m.get(S.id);if(!C||C.it.kind!=="wire")return;at={id:S.id,progress:On.clamp(S.progress,0,1)},Ee=null,Zt.visible=!1;let D=at.progress,N=zp(C,D),ee=C.wire.geometry;Op(C);let xe=ee.parameters.tubularSegments,Ue=ee.parameters.radialSegments,de=N*xe,Se=Math.floor(de),oe=de-Se,Ye=Math.min(xe,Se+1);if(N>0&&N<1&&oe>1e-8){C.reveal||={position:new Float32Array(ee.getAttribute("position").array),normal:new Float32Array(ee.getAttribute("normal").array),stride:(Ue+1)*3,ring:-1};let ye=C.reveal,mt=ee.getAttribute("position"),Rt=ee.getAttribute("normal"),et=ee.parameters.radius;C.curve.getPointAt(N,ft);for(let yt=0;yt<=Ue;yt++){let At=(Se*(Ue+1)+yt)*3,me=(Ye*(Ue+1)+yt)*3;ke.set(ye.normal[At]+(ye.normal[me]-ye.normal[At])*oe,ye.normal[At+1]+(ye.normal[me+1]-ye.normal[At+1])*oe,ye.normal[At+2]+(ye.normal[me+2]-ye.normal[At+2])*oe).normalize(),mt.setXYZ(Ye*(Ue+1)+yt,ft.x+et*ke.x,ft.y+et*ke.y,ft.z+et*ke.z),Rt.setXYZ(Ye*(Ue+1)+yt,ke.x,ke.y,ke.z)}ye.ring=Ye;for(let yt of[mt,Rt])yt.addUpdateRange(Ye*ye.stride,ye.stride),yt.needsUpdate=!0}else C.curve.getPointAt(N,ft);let _e=N<=0?0:Math.ceil(de);if(ee.setDrawRange(0,_e*Ue*6),Et.visible=C.group.visible&&N>0&&N<1&&!(C.approach<1&&D>=.78),Et.visible&&(Et.position.copy(ft),Et.scale.setScalar(ee.parameters.radius),Qt.color.copy(C.material.color),Qt.roughness=C.material.roughness),Pe===S.id&&(Ce.instanceCount=_e,_e>0&&N<1)){let ye=Ce.getAttribute("instanceEnd");dt=_e-1,ye.setXYZ(dt,ft.x,ft.y,ft.z),ye.data.needsUpdate=!0}(C.plugs||[]).forEach((ye,mt)=>{let Rt=Bt(mt?(D-.78)/.22:D/.22);for(let et of ye)et.mesh.visible=mt?D>=.78:!0,et.mesh.position.copy(et.home),et.mesh.position.y+=W*(1-Rt)}),Qe()}function o_(){let S=m.get(at.id);if(!S)return null;let C=S.wire.geometry,D=C.parameters.radialSegments,N=C.parameters.tubularSegments,ee=zp(S,at.progress),xe=Math.ceil(ee*N),Ue=C.getAttribute("position"),de=new E,Se=S.curve.getPointAt(0);if(xe>0){for(let Rt=0;Rt<D;Rt++){let et=xe*(D+1)+Rt;de.x+=Ue.getX(et),de.y+=Ue.getY(et),de.z+=Ue.getZ(et)}de.divideScalar(D)}else de.copy(Se);let oe=Ce.getAttribute("instanceEnd"),Ye=Ce.instanceCount-1,_e=Ye>=0?new E(oe.getX(Ye),oe.getY(Ye),oe.getZ(Ye)):Se,ye=S.approach<1&&at.progress>=.78?S.plugs[1][0].mesh.position:null,mt=ye?Math.hypot(de.x-ye.x,de.y-ye.y-M,de.z-ye.z):null;return{fraction:ee,wireTip:de.toArray(),traceTip:_e.toArray(),tipError:de.distanceTo(_e),plugTipError:mt,visibleSegments:xe,segments:N,traceSegments:Ce.instanceCount}}function Hp(S){if(Q?.id&&Q.id!==S?.id){let D=V.get(Q.id);D&&D.group.position.copy(D.home)}let C=V.get(S?.id);if(Q=C?{id:S.id,progress:On.clamp(S.progress,0,1)}:null,Y!==Q?.id){G.traverse(D=>{D.geometry?.dispose(),D.material?.dispose()}),G.clear(),Y=Q?.id;for(let[D,N]of(C?.holes||[]).entries()){let ee=ht(new Bi(D===0?.3:.23,.045,8,20),new $t({color:D===0?13080622:1538403,depthTest:!1,depthWrite:!1}),F(N,.15),G);ee.rotation.x=-Math.PI/2,ee.renderOrder=19}}if(C){let D=Q.progress,N=Bt((D-.24)/.76);C.group.position.copy(C.home),C.group.position.y+=5.5*(1-N)}Qe()}function a_(S){s_(S);for(let[C,D]of ie)D.outline.visible=C===S?.chip,D.body.material.transparent=!!(S?.chip&&C!==S.chip),D.body.material.opacity=S?.chip&&C!==S.chip?.toString()?.52:1;Vp(S?.assembly||null),Hp(S?.placement||null),rr(S?.signals||null)}function Md(){let{width:S,height:C}=s.getBoundingClientRect();if(!(!S||!C)){u.aspect=S/C,u.updateProjectionMatrix(),d.setSize(S,C,!1),Pt.forEach(D=>D.material.resolution.set(S,C));for(let D of Gn.children)D.material.resolution.set(S,C);Qe()}}let kp=new ResizeObserver(Md);kp.observe(s),f.addEventListener("webglcontextlost",S=>{S.preventDefault(),bd(!1),a("Tu navegador perdi\xF3 la vista 3D. Puedes seguir en 2D y volver a intentarlo.")});let Gp=()=>{document.hidden?(Ht(),se&&cancelAnimationFrame(se),se=0):Qe()};document.addEventListener("visibilitychange",Gp);function bd(S){be=S,Rn.setActive(S),S?(Md(),Qe()):(Ht(),se&&cancelAnimationFrame(se),se=0)}u.position.set(12,70,75),p.target.set(0,0,0),p.update();function l_(){let S=Ce.getAttribute("instanceStart"),C=Ce.getAttribute("instanceEnd");return{visible:Re.visible,id:Pe,builds:Xe,isolate:sr,widths:Pt.map(D=>D.material.linewidth),resolution:Pt[0].material.resolution.toArray(),depthTest:Pt.some(D=>D.material.depthTest),curveA:S?[S.getX(0),S.getY(0),S.getZ(0)]:null,curveB:C?[C.getX(C.count-1),C.getY(C.count-1),C.getZ(C.count-1)]:null,visibleWires:[...m].filter(([,D])=>D.it.kind==="wire"&&D.group.visible).map(([D])=>D),endpointLabels:[],endpointRings:Fe.map(({ring:D})=>D.visible),replayDuration:Ee?.duration||null}}let Ed=new fn;h.add(Ed);let Wp=qp({groups:V,guideLayer:Ed,requestRender:Qe,makeRing:(S,C)=>{let D=ht(new Bi(C===0?.3:.23,.045,8,20),new $t({color:C===0?13080622:1538403,depthTest:!1,depthWrite:!1}),F(S,.15),Ed);return D.rotation.x=-Math.PI/2,D.renderOrder=19,D}});return{setComponentSequence:Wp.apply,setExternalCable:Ca,update:qi,focusBox:wi,replay:i_,setActive:bd,setLEDs:Np,setIndicators:Fp,setWireClarity:n_,setAssembly:Vp,setPlacement:Hp,setSignals:qc,dismissComponentLabel:Rn.dismiss,getComponentLabel(){let S=Rn.diagnostics(),C=0;for(let D of S.targets)V.get(D.id)?.group.traverse(N=>{N.userData.viewerLabel&&!/^(\d+|I \/ O|STOP|SS0501A)$/.test(N.userData.labelText||"")&&C++});return{...S,flatNameCount:C}},getViewState(){return{camera:u.position.toArray(),target:p.target.toArray(),box:[...We],fitDistance:kn,topView:Dt}},getPlanViewBox(){let S=u.position.distanceTo(p.target)/Math.max(.01,kn),C=We[2]*S,D=We[3]*S;return[Ze+p.target.x*30-C/2,it+p.target.z*30-D/2,C,D]},restoreViewState(S){if(!S||!["camera","target"].every(N=>Array.isArray(S[N])&&S[N].length===3&&S[N].every(Number.isFinite)))return!1;let C=new E().fromArray(S.camera).distanceTo(new E().fromArray(S.target));if(C<p.minDistance||C>p.maxDistance)return!1;ue=null;let D=p.enableDamping;return p.enableDamping=!1,p.update(),u.position.fromArray(S.camera),p.target.fromArray(S.target),Dt=!!S.topView,Array.isArray(S.box)&&S.box.length===4&&S.box.every(Number.isFinite)&&S.box[2]>0&&S.box[3]>0&&(We=[...S.box]),Number.isFinite(S.fitDistance)&&S.fitDistance>0&&(kn=S.fitDistance),p.update(),p.enableDamping=D,f.dataset.moving="false",Qe(),!0},setAppearance(S={}){["auto","economy","sharp"].includes(S.quality)&&S.quality!==fi.quality&&(fi.quality=S.quality,d.setPixelRatio(Math.min(window.devicePixelRatio||1,S.quality==="economy"?1:S.quality==="sharp"?2:1.6)),Md()),["full","reduced","off"].includes(S.motion)&&(fi.motion=S.motion),S.background&&S.background!==fi.background&&(h.background.set(S.background),fi.background=S.background),fi.motion!=="full"&&ue&&(u.position.copy(ue.toPos),p.target.copy(ue.toTarget),ue=null,p.update(),f.dataset.moving="false"),Qe()},getAppearance(){return{...fi}},setSelectionStyle(S={}){[1,1.4,1.8].includes(S.scale)&&(nr.scale=S.scale),[.5,.8,1].includes(S.intensity)&&(nr.intensity=S.intensity),Pt.forEach((C,D)=>{C.material.linewidth=[10,7,3][D]*nr.scale,C.material.opacity=D===2?1:nr.intensity}),Qe()},getSelectionStyle(){return{...nr}},stopReplay(){Ee=null,Zt.visible=!1,Qe()},capture(){return d.render(h,u),f.toDataURL("image/png")},preset(S){Dt=S==="top",Dt||(ue=null,u.position.copy(p.target).add(new E(12,70,75)),p.update()),wi(We,!0)},zoom(){let S=p.target.clone(),C=S.clone().add(u.position.clone().sub(S).multiplyScalar(.75));ue=null,Ve?.animate&&fi.motion==="full"?(ue={fromPos:u.position.clone(),toPos:C,fromTarget:S,toTarget:S,started:performance.now()},f.dataset.moving="true",Qe()):(u.position.copy(C),p.update(),Qe())},rotate(S){Dt=!1;let C=u.position.clone().sub(p.target);C.applyAxisAngle(new E(0,1,0),S*Math.PI/6);let D=p.target.clone().add(C);Ve?.animate&&fi.motion==="full"?(ue={fromPos:u.position.clone(),toPos:D,fromTarget:p.target.clone(),toTarget:p.target.clone(),started:performance.now()},f.dataset.moving="true",Qe()):(u.position.copy(D),p.update(),Qe())},diagnostics(){let S=f.getBoundingClientRect(),C=D=>{let N=D.clone().project(u);return[S.left+(N.x+1)*S.width/2,S.top+(1-N.y)*S.height/2]};return{componentAssembly:Wp.diagnostics(),motors:[...m.values()].filter(D=>D.it.kind==="motor").map(D=>({id:D.it.partId,model:D.it.externalMotor?.model||"generic",terminals:D.it.externalMotor?.terminals.length||2,routeTypes:X.find(N=>N.id===D.it.partId)?.cables.map(N=>N.curve.type)||[]})),externalControls:k.map(D=>({id:D.id,model:D.model,center:D.center,bounds:D.bounds,connections:D.connections,cables:D.cables.map(N=>({terminal:N.terminal,routeType:N.curve.type,visible:N.group.visible,progress:N.nativeId?at.id===N.nativeId?at.progress:1:N.progress,drawCount:N.wire.geometry.drawRange.count,start:N.curve.getPoint(0).toArray(),end:N.curve.getPoint(1).toArray(),tip:N.nativeId?(at.id===N.nativeId?N.curve.getPointAt(Bt((at.progress-.22)/.56)):N.curve.getPoint(1)).toArray():N.tip.position.toArray()})),actuated:D.actuator.userData.actuated,actuator:D.actuator.position.toArray(),screen:C(je(D.center,2.5))})),studio:{signals:Xi?{...Xi,builds:Ra}:null,placement:Q?{...Q,height:V.get(Q.id).group.position.y,holes:V.get(Q.id).holes}:null,chip:Ve?.studio?.chip||null,stripHoles:Ve?.studio?.stripHoles||[],assembly:{...at},reveal:o_(),partialDrawCount:at.id?m.get(at.id)?.wire.geometry.drawRange.count:null},selection:l_(),wireClarity:ls,routedConnections:[...m.values()].filter(D=>D.routed).length,wireStates:Object.fromEntries([...m].filter(([,D])=>D.routed).map(([D,N])=>[D,{opacity:N.wire.material.opacity,height:N.height,curveA:N.curve.getPoint(0).toArray(),curveB:N.curve.getPoint(1).toArray()}])),connectionCount:m.size,pinCount:w.length,arrayPinCount:A.length,resistorArrays:(e.arrays||[]).length,resistors:e.items.filter(D=>D.kind==="res").length,frames:Aa,active:be,moving:!!ue,camera:u.position.toArray(),target:p.target.toArray(),drawCalls:d.info.render.calls,triangles:d.info.render.triangles,targets:{contacts:[C(F(["A","d",12],.03))],chips:[...ie].map(([D,N])=>({id:D,screen:C(N.body.position)})),switches:T.slice(0,3).map(D=>C(D.position)),dipContacts:T.filter(D=>D.userData.dipSlider).map(D=>{let N=D.userData.componentHint,ee=e.chips.find(Se=>Se.id===N),xe=Object.entries(ee.functions).find(([,Se])=>Se===D.userData.bit)?.[0],Ue=ie.get(N).body,de=Ue.position.clone().add(new E(Number(xe)-2.5,.64,.95));return{bit:D.userData.bit,id:N,slider:C(D.getWorldPosition(new E)),body:C(Ue.parent.localToWorld(de))}}),pins:w.map(D=>({u:D.userData.u,p:D.userData.p,screen:C(D.geometry.parameters.path.getPoint(.15))})),wires:Object.fromEntries([...m].map(([D,N])=>[D,C(N.curve.getPoint(.5))]))},endpoints:Object.fromEntries([...m].map(([D,N])=>[D,{a:N.it.a,b:N.it.b,worldA:N.a.toArray(),worldB:N.b.toArray()}])),lit:[...v].filter(([,D])=>D.userData.lit).map(([D])=>D)}},dispose(){bd(!1),Rn.dispose(),kp.disconnect(),document.removeEventListener("visibilitychange",Gp),p.dispose();let S=new Set,C=new Set,D=new Set;h.traverse(N=>{N.geometry&&S.add(N.geometry);for(let ee of[].concat(N.material||[]))C.add(ee),ee.map&&D.add(ee.map),ee.bumpMap&&D.add(ee.bumpMap)}),D.forEach(N=>N.dispose()),C.forEach(N=>N.dispose()),S.forEach(N=>N.dispose()),d.dispose(),f.remove()}}}export{jE as createViewer};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
