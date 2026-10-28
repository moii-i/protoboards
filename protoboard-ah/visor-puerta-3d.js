var p0=Object.defineProperty;var m0=(s,e)=>{for(var t in e)p0(s,t,{get:e[t],enumerable:!0})};function op({groups:s,requestRender:e,makeRing:t,guideLayer:n}){let i=null,r="";function a(o){i=o;let l=o?.id||"";if(l!==r){for(let h of[...n.children])h.geometry?.dispose(),h.material?.dispose(),n.remove(h);r=l;let c=s.get(l);if(c&&!c.external)for(let[h,d]of c.holes.entries()){let u=t(d,h);n.add(u)}}for(let[c,h]of s){h.home||=h.group.position.clone(),h.group.position.copy(h.home);let d=o?.order?.indexOf(c)??-1;if(h.group.visible=!o||d<0||d<=o.index,o&&c===o.id){let u=Math.max(0,Math.min(1,(o.progress-.18)/.82)),f=u*u*(3-2*u);h.external?(h.group.position.x+=4*(1-f),h.group.position.y+=.7*(1-f)):h.group.position.y+=5.5*(1-f)}}n.visible=!!o,e()}return{apply:a,diagnostics:()=>({pose:i?{id:i.id,index:i.index,progress:i.progress}:null,components:[...s].map(([o,l])=>({id:o,visible:l.group.visible,position:l.group.position.toArray(),home:l.home?.toArray(),holes:l.holes,external:!!l.external}))})}}function ju(s,e,t,n,i,r){let a=[n,...e.map(l=>t(l,r)),i],o=new s.CurvePath;for(let l=1;l<a.length;l++)a[l-1].distanceToSquared(a[l])>1e-12&&o.add(new s.LineCurve3(a[l-1],a[l]));return o}function lp(s){let{THREE:e,it:t,group:n,mesh:i,box:r,roundedBox:a,toWorld:o,hpos:l,topLabel:c,contactShadow:h,pickables:d,switches:u,metal:f,dark:p}=s,_=t.externalControl,g=o(_.center,0),m=_.model==="scmm-122",y=new e.MeshStandardMaterial({color:6120546,metalness:.76,roughness:.42}),b=new e.MeshStandardMaterial({color:m?2304555:3907227,roughness:.6}),x=new e.MeshStandardMaterial({color:11368236,roughness:.77}),A=new e.MeshStandardMaterial({color:13028298,metalness:.87,roughness:.27}),T=new e.MeshStandardMaterial({color:2107947,roughness:.83}),P=Y=>(Y.userData={...Y.userData,bit:t.value},d.push(Y),Y);function v(Y,k,re){let K=new e.Shape,te=-Y/2,Q=-k/2;return K.moveTo(te+re,Q),K.lineTo(te+Y-re,Q),K.quadraticCurveTo(te+Y,Q,te+Y,Q+re),K.lineTo(te+Y,Q+k-re),K.quadraticCurveTo(te+Y,Q+k,te+Y-re,Q+k),K.lineTo(te+re,Q+k),K.quadraticCurveTo(te,Q+k,te,Q+k-re),K.lineTo(te,Q+re),K.quadraticCurveTo(te,Q,te+re,Q),K}let R;if(m){a(4.55,.2,2.2,g.clone().setY(.62),x,n,.05),P(a(4.45,1.35,2.1,g.clone().setY(1.4),b,n,.12));let Y=v(8,2.55,.2);for(let Q of[-3.13,3.13]){let Ve=new e.Path;Ve.absellipse(Q,0,.45,.31,0,Math.PI*2,!0),Y.holes.push(Ve)}let k=new e.Path;k.moveTo(-1.4,-.53),k.lineTo(-1.4,.53),k.lineTo(1.4,.53),k.lineTo(1.4,-.53),k.closePath(),Y.holes.push(k);let re=P(i(new e.ExtrudeGeometry(Y,{depth:.12,bevelEnabled:!0,bevelSize:.025,bevelThickness:.025,bevelSegments:2,steps:1}),y,g.clone().setY(2.13),n));re.rotation.x=-Math.PI/2;for(let Q of[-1.23,1.23])r(4.5,1.1,.1,g.clone().setY(1.55).add(new e.Vector3(0,0,Q)),y,n);for(let Q of[-1.75,1.75])for(let Ve of[-1.18,1.18])r(.42,.34,.15,g.clone().setY(.9).add(new e.Vector3(Q,0,Ve)),y,n);R=new e.Group,R.position.copy(g).setY(2.26),n.add(R),P(a(.98,1.05,.85,new e.Vector3(0,.42,0),p,R,.06));for(let Q=0;Q<5;Q++)r(.075,.98,.92,new e.Vector3(-.39+Q*.195,.43,0),b,R);R.userData={externalControl:"scmm-122",switchId:t.value,homeX:g.x};let K=c("0",g.clone().add(new e.Vector3(-2.3,2.285,0)),.38,.5,{background:"#5d6462",color:"#e0e7df",size:90}),te=c("1",g.clone().add(new e.Vector3(2.3,2.285,0)),.38,.5,{background:"#5d6462",color:"#e0e7df",size:90});n.add(K,te)}else{let Y=v(6.45,2.9,.22);for(let Ve of[-1.82,1.82]){let Me=new e.Path;Me.absarc(Ve,0,.43,0,Math.PI*2,!0),Y.holes.push(Me)}P(i(new e.ExtrudeGeometry(Y,{depth:2.3,bevelEnabled:!0,bevelSize:.035,bevelThickness:.035,bevelSegments:2,steps:1}),b,g.clone().add(new e.Vector3(0,1.65,-1.15)),n));for(let Ve of[-1.82,1.82])for(let Me of[-1.2,1.2])i(new e.TorusGeometry(.45,.055,8,24),b,g.clone().add(new e.Vector3(Ve,1.65,Me)),n);a(5.9,.09,2.18,g.clone().add(new e.Vector3(0,3.15,0)),b,n,.04);let k=P(a(.95,.62,.9,g.clone().add(new e.Vector3(1.2,3.22,0)),p,n,.09)),re=g.clone().add(new e.Vector3(-2.55,3.25,0)),K=i(new e.CylinderGeometry(.17,.17,1.1,20),f,re,n);K.rotation.x=Math.PI/2,R=new e.Group,R.position.copy(re),n.add(R),P(r(7.45,.11,.85,new e.Vector3(3.42,.08,0),f,R));let te=r(.5,.1,.85,new e.Vector3(7.05,.15,0),f,R);te.rotation.z=.25,P(te),R.userData={externalControl:"ss0501a",switchId:t.value,plunger:k,plungerY:k.position.y};let Q=c("SS0501A",g.clone().add(new e.Vector3(0,3.21,.7)),3.6,.6,{background:"#3b9e9b",color:"#237975",size:56});n.add(Q)}u.push(R),h(g,m?10:10.8,6.3,n);let L=[t.a,t.b,t.third],N=[],V=_.terminals.map((Y,k)=>{let re=o(Y,1.02),K=l(L[k],.08),te=g.clone().add(new e.Vector3((k-1)*1.5,.72,1.08));i(new e.TubeGeometry(new e.CatmullRomCurve3([te,te.clone().add(new e.Vector3(0,-.18,.5)),re]),12,.085,8,!1),f,new e.Vector3,n),r(.38,.68,.13,re.clone().add(new e.Vector3(0,.15,-.15)),f,n),i(new e.TorusGeometry(.18,.065,8,20),f,re,n),i(new e.SphereGeometry(.17,12,8),A,re.clone().add(new e.Vector3(0,-.06,.03)),n);let Q=re.clone().add(new e.Vector3(0,-.18,.65)),Ve=i(new e.CylinderGeometry(.19,.17,.65,16),T,re.clone().add(new e.Vector3(0,-.09,.32)),n);Ve.rotation.x=Math.PI/2;let Me=new e.MeshStandardMaterial({color:_.colors[k],roughness:.74}),bt=o([_.center[0]-150-k*18,_.center[1]-155-k*17],1.7+k*.28),it=o([_.center[0]+(k-1)*52,_.center[1]+135+k*10],.9+k*.18),at=_.cableRoutes?.[k]?ju(e,_.cableRoutes[k],o,re,K,_.cableHeights[k]):new e.CatmullRomCurve3([re,Q,it,bt,o([X(L[k]),815+k*24],1.8+k*.28),K.clone().setY(1.1+k*.28),K],!1,"centripetal"),ne=new e.Group;n.add(ne);let he=i(new e.TubeGeometry(at,96,.095,8,!1),Me,new e.Vector3,ne);he.userData={id:t.id},d.push(he);let ye=r(.3,.46,.3,K.clone().setY(.23),T,ne),Le=i(new e.SphereGeometry(.17,12,8),new e.MeshBasicMaterial({color:15054145}),re.clone(),ne);Le.visible=!1,N.push({group:ne,wire:he,curve:at,plug:ye,tip:Le,point:new e.Vector3,normal:new e.Vector3,terminal:k,progress:1});let De=c((m?["+5","COM","GND"]:["NC","COM","NA"])[k],re.clone().add(new e.Vector3(0,-.87,1.05)),1.45,1.8,{background:"#edf1ed",color:k===0?"#b64143":"#364e49",size:54});return n.add(De),{hole:L[k],terminal:Y,worldTerminal:re.toArray(),function:_.functions[k]}});function X(Y){return s.point(Y)[0]}let O=c(t.value+" \xB7 "+_.model.toUpperCase(),g.clone().add(new e.Vector3(0,.065,-3.15)),10,3.1,{background:"#edf1ed",color:t.value==="STOP"?"#a64445":"#345a4a",size:45});n.add(O);let G=c(m?"DESLIZABLE \xB7 MANTENIDO":"PALANCA \xB7 FIN DE CARRERA",g.clone().add(new e.Vector3(0,.065,7.2)),10,2.8,{background:"#edf1ed",color:"#587363",size:37});return n.add(G),Qu(R,!1),{id:t.partId,model:_.model,center:_.center,bounds:_.bounds,connections:V,actuator:R,cables:N,wiringStage:t.wiringStage??t.stage}}function Qu(s,e){let t=s.userData;t.externalControl==="scmm-122"?s.position.x=t.homeX+(e?.72:-.72):t.externalControl==="ss0501a"&&(s.rotation.z=e?.012:.16,t.plunger.position.y=t.plungerY-(e?.19:0)),t.actuated=!!e}function cp(s,e){e=Math.max(0,Math.min(1,e));let t=s.wire.geometry,n=t.parameters.tubularSegments,i=t.parameters.radialSegments,r=t.getAttribute("position"),a=t.getAttribute("normal");if(s.reveal?.ring>=0){let o=s.reveal.ring;for(let l=0;l<=i;l++){let c=(o*(i+1)+l)*3;r.setXYZ(o*(i+1)+l,...s.reveal.position.subarray(c,c+3)),a.setXYZ(o*(i+1)+l,...s.reveal.normal.subarray(c,c+3))}s.reveal.ring=-1,r.needsUpdate=a.needsUpdate=!0}if(e>0&&e<1){s.reveal||={position:new Float32Array(r.array),normal:new Float32Array(a.array),ring:-1};let o=e*n,l=Math.floor(o),c=o-l,h=Math.min(n,l+1);s.curve.getPointAt(e,s.point);for(let d=0;d<=i;d++){let u=(l*(i+1)+d)*3,f=(h*(i+1)+d)*3;s.normal.set(s.reveal.normal[u]+(s.reveal.normal[f]-s.reveal.normal[u])*c,s.reveal.normal[u+1]+(s.reveal.normal[f+1]-s.reveal.normal[u+1])*c,s.reveal.normal[u+2]+(s.reveal.normal[f+2]-s.reveal.normal[u+2])*c).normalize(),r.setXYZ(h*(i+1)+d,s.point.x+t.parameters.radius*s.normal.x,s.point.y+t.parameters.radius*s.normal.y,s.point.z+t.parameters.radius*s.normal.z),a.setXYZ(h*(i+1)+d,s.normal.x,s.normal.y,s.normal.z)}s.reveal.ring=h,r.needsUpdate=a.needsUpdate=!0}t.setDrawRange(0,Math.ceil(e*n)*i*6),s.tip.visible=e>0&&e<1,s.tip.visible&&s.tip.position.copy(s.point),s.plug.visible=e>=1,s.progress=e}var zu={};m0(zu,{ACESFilmicToneMapping:()=>wa,AddEquation:()=>Ms,AddOperation:()=>xf,AdditiveAnimationBlendMode:()=>Lu,AdditiveBlending:()=>ba,AgXToneMapping:()=>bu,AlphaFormat:()=>Pu,AlwaysCompare:()=>If,AlwaysDepth:()=>go,AlwaysStencilFunc:()=>wf,AmbientLight:()=>ll,AnimationAction:()=>xl,AnimationClip:()=>xs,AnimationLoader:()=>Lh,AnimationMixer:()=>Xh,AnimationObjectGroup:()=>Wh,AnimationUtils:()=>Ih,ArcCurve:()=>Oo,ArrayCamera:()=>pl,ArrowHelper:()=>hu,AttachedBindMode:()=>uh,Audio:()=>gl,AudioAnalyser:()=>Gh,AudioContext:()=>xa,AudioListener:()=>kh,AudioLoader:()=>zh,AxesHelper:()=>uu,BackSide:()=>Sn,BasicDepthPacking:()=>bf,BasicShadowMap:()=>Mm,BatchedMesh:()=>Po,BezierInterpolant:()=>sl,Bone:()=>jr,BooleanKeyframeTrack:()=>Ei,Box2:()=>yl,Box3:()=>Vt,Box3Helper:()=>lu,BoxGeometry:()=>Fn,BoxHelper:()=>ou,BufferAttribute:()=>Nt,BufferGeometry:()=>pt,BufferGeometryLoader:()=>dl,ByteType:()=>Tu,Cache:()=>oi,Camera:()=>rr,CameraHelper:()=>au,CanvasTexture:()=>ea,CapsuleGeometry:()=>No,CatmullRomCurve3:()=>ui,CineonToneMapping:()=>Su,CircleGeometry:()=>Gi,ClampToEdgeWrapping:()=>Tn,Clock:()=>Kh,Color:()=>ze,ColorKeyframeTrack:()=>fa,ColorManagement:()=>Mt,Compatibility:()=>hg,CompressedArrayTexture:()=>Ah,CompressedCubeTexture:()=>Rh,CompressedTexture:()=>Zs,CompressedTextureLoader:()=>Dh,ConeGeometry:()=>na,ConstantAlphaFactor:()=>mf,ConstantColorFactor:()=>ff,Controls:()=>Sa,CubeCamera:()=>fl,CubeDepthTexture:()=>Uo,CubeReflectionMapping:()=>xi,CubeRefractionMapping:()=>Ki,CubeTexture:()=>fs,CubeTextureLoader:()=>Uh,CubeUVReflectionMapping:()=>hr,CubicBezierCurve:()=>ia,CubicBezierCurve3:()=>Bo,CubicInterpolant:()=>nl,CullFaceBack:()=>pu,CullFaceFront:()=>Kd,CullFaceFrontBack:()=>Sm,CullFaceNone:()=>Jd,Curve:()=>On,CurvePath:()=>$s,CustomBlending:()=>jd,CustomToneMapping:()=>Mu,CylinderGeometry:()=>zt,Cylindrical:()=>$h,Data3DTexture:()=>ks,DataArrayTexture:()=>Vs,DataTexture:()=>An,DataTextureLoader:()=>Nh,DataUtils:()=>gh,DecrementStencilOp:()=>km,DecrementWrapStencilOp:()=>Gm,DefaultLoadingManager:()=>Ff,DepthFormat:()=>li,DepthStencilFormat:()=>$i,DepthTexture:()=>Hi,DetachedBindMode:()=>yf,DirectionalLight:()=>Ss,DirectionalLightHelper:()=>ru,DiscreteInterpolant:()=>il,DodecahedronGeometry:()=>Fo,DoubleSide:()=>Hn,DstAlphaFactor:()=>lf,DstColorFactor:()=>hf,DynamicCopyUsage:()=>sg,DynamicDrawUsage:()=>jm,DynamicReadUsage:()=>tg,EdgesGeometry:()=>Js,EllipseCurve:()=>Ks,EqualCompare:()=>Rf,EqualDepth:()=>xo,EqualStencilFunc:()=>qm,EquirectangularReflectionMapping:()=>Ta,EquirectangularRefractionMapping:()=>Aa,Euler:()=>Jn,EventDispatcher:()=>Nn,ExternalTexture:()=>ta,ExtrudeGeometry:()=>Ho,FileLoader:()=>Kn,Float16BufferAttribute:()=>Mh,Float32BufferAttribute:()=>ke,FloatType:()=>xn,Fog:()=>wo,FogExp2:()=>Eo,FramebufferTexture:()=>Th,FrontSide:()=>Ji,Frustum:()=>bi,FrustumArray:()=>Co,GLBufferAttribute:()=>Jh,GLSL1:()=>ag,GLSL3:()=>Du,GreaterCompare:()=>Cf,GreaterDepth:()=>vo,GreaterEqualCompare:()=>rc,GreaterEqualDepth:()=>yo,GreaterEqualStencilFunc:()=>$m,GreaterStencilFunc:()=>Jm,GridHelper:()=>iu,Group:()=>en,HTMLTexture:()=>Ch,HalfFloatType:()=>jn,HemisphereLight:()=>ir,HemisphereLightHelper:()=>nu,IcosahedronGeometry:()=>Go,ImageBitmapLoader:()=>Bh,ImageLoader:()=>ys,ImageUtils:()=>bo,IncrementStencilOp:()=>Vm,IncrementWrapStencilOp:()=>Hm,InstancedBufferAttribute:()=>ki,InstancedBufferGeometry:()=>ar,InstancedInterleavedBuffer:()=>Yi,InstancedMesh:()=>qs,Int16BufferAttribute:()=>vh,Int32BufferAttribute:()=>Sh,Int8BufferAttribute:()=>_h,IntType:()=>Sl,InterleavedBuffer:()=>Xs,InterleavedBufferAttribute:()=>vn,Interpolant:()=>Xi,InterpolateBezier:()=>dh,InterpolateDiscrete:()=>Gr,InterpolateLinear:()=>Mo,InterpolateSmooth:()=>lo,InterpolationSamplingMode:()=>cg,InterpolationSamplingType:()=>lg,InvertStencilOp:()=>Wm,KeepStencilOp:()=>co,KeyframeTrack:()=>Cn,LOD:()=>To,LatheGeometry:()=>Wo,Layers:()=>Hs,LessCompare:()=>Af,LessDepth:()=>_o,LessEqualCompare:()=>sc,LessEqualDepth:()=>Bs,LessEqualStencilFunc:()=>Zm,LessStencilFunc:()=>Ym,Light:()=>gi,LightProbe:()=>hl,LightShadow:()=>sr,Line:()=>hi,Line3:()=>va,LineBasicMaterial:()=>jt,LineCurve:()=>sa,LineCurve3:()=>ps,LineDashedMaterial:()=>tl,LineLoop:()=>Io,LineSegments:()=>Rn,LinearFilter:()=>Bt,LinearInterpolant:()=>da,LinearMipMapLinearFilter:()=>Am,LinearMipMapNearestFilter:()=>Tm,LinearMipmapLinearFilter:()=>yi,LinearMipmapNearestFilter:()=>Ra,LinearSRGBColorSpace:()=>Xr,LinearToneMapping:()=>yu,LinearTransfer:()=>Yr,Loader:()=>un,LoaderUtils:()=>_a,LoadingManager:()=>ma,LoopOnce:()=>vf,LoopPingPong:()=>Mf,LoopRepeat:()=>Sf,MOUSE:()=>qi,Material:()=>$t,MaterialBlending:()=>bm,MaterialLoader:()=>ul,MathUtils:()=>Qn,Matrix2:()=>jh,Matrix3:()=>dt,Matrix4:()=>ct,MaxEquation:()=>nf,Mesh:()=>Ot,MeshBasicMaterial:()=>Ht,MeshDepthMaterial:()=>ha,MeshDistanceMaterial:()=>ua,MeshLambertMaterial:()=>Qo,MeshMatcapMaterial:()=>el,MeshNormalMaterial:()=>jo,MeshPhongMaterial:()=>Ko,MeshPhysicalMaterial:()=>er,MeshStandardMaterial:()=>Pt,MeshToonMaterial:()=>$o,MinEquation:()=>tf,MirroredRepeatWrapping:()=>Hr,MixOperation:()=>_f,MultiplyBlending:()=>gu,MultiplyOperation:()=>Ea,NearestFilter:()=>Yt,NearestMipMapLinearFilter:()=>wm,NearestMipMapNearestFilter:()=>Em,NearestMipmapLinearFilter:()=>ur,NearestMipmapNearestFilter:()=>wu,NeutralToneMapping:()=>Eu,NeverCompare:()=>Tf,NeverDepth:()=>mo,NeverStencilFunc:()=>Xm,NoBlending:()=>_i,NoColorSpace:()=>Ai,NoNormalPacking:()=>Nm,NoToneMapping:()=>$n,NormalAnimationBlendMode:()=>ic,NormalBlending:()=>cr,NormalGAPacking:()=>Om,NormalRGPacking:()=>Fm,NotEqualCompare:()=>Pf,NotEqualDepth:()=>So,NotEqualStencilFunc:()=>Km,NumberKeyframeTrack:()=>tr,Object3D:()=>Ct,ObjectLoader:()=>Oh,ObjectSpaceNormalMap:()=>Ef,OctahedronGeometry:()=>la,OneFactor:()=>rf,OneMinusConstantAlphaFactor:()=>gf,OneMinusConstantColorFactor:()=>pf,OneMinusDstAlphaFactor:()=>cf,OneMinusDstColorFactor:()=>uf,OneMinusSrcAlphaFactor:()=>xu,OneMinusSrcColorFactor:()=>of,OrthographicCamera:()=>vs,PCFShadowMap:()=>Ma,PCFSoftShadowMap:()=>$d,PMREMGenerator:()=>hc,Path:()=>gs,PerspectiveCamera:()=>Xt,Plane:()=>Dn,PlaneGeometry:()=>di,PlaneHelper:()=>cu,PointLight:()=>ol,PointLightHelper:()=>tu,Points:()=>Lo,PointsMaterial:()=>Qr,PolarGridHelper:()=>su,PolyhedronGeometry:()=>Wi,PositionalAudio:()=>Hh,PropertyBinding:()=>Ut,PropertyMixer:()=>_l,QuadraticBezierCurve:()=>ra,QuadraticBezierCurve3:()=>ms,Quaternion:()=>Jt,QuaternionKeyframeTrack:()=>nr,QuaternionLinearInterpolant:()=>rl,R11_EAC_Format:()=>Ul,RED_GREEN_RGTC2_Format:()=>Na,RED_RGTC1_Format:()=>ec,REVISION:()=>Zd,RG11_EAC_Format:()=>Ua,RGBADepthPacking:()=>Lm,RGBAFormat:()=>yn,RGBAIntegerFormat:()=>Tl,RGBA_ASTC_10x10_Format:()=>Zl,RGBA_ASTC_10x5_Format:()=>Xl,RGBA_ASTC_10x6_Format:()=>Yl,RGBA_ASTC_10x8_Format:()=>ql,RGBA_ASTC_12x10_Format:()=>Jl,RGBA_ASTC_12x12_Format:()=>Kl,RGBA_ASTC_4x4_Format:()=>Ol,RGBA_ASTC_5x4_Format:()=>Bl,RGBA_ASTC_5x5_Format:()=>zl,RGBA_ASTC_6x5_Format:()=>Vl,RGBA_ASTC_6x6_Format:()=>kl,RGBA_ASTC_8x5_Format:()=>Hl,RGBA_ASTC_8x6_Format:()=>Gl,RGBA_ASTC_8x8_Format:()=>Wl,RGBA_BPTC_Format:()=>$l,RGBA_ETC2_EAC_Format:()=>Dl,RGBA_PVRTC_2BPPV1_Format:()=>Pl,RGBA_PVRTC_4BPPV1_Format:()=>Cl,RGBA_S3TC_DXT1_Format:()=>Ia,RGBA_S3TC_DXT3_Format:()=>La,RGBA_S3TC_DXT5_Format:()=>Da,RGBDepthPacking:()=>Dm,RGBFormat:()=>Iu,RGBIntegerFormat:()=>Rm,RGB_BPTC_SIGNED_Format:()=>jl,RGB_BPTC_UNSIGNED_Format:()=>Ql,RGB_ETC1_Format:()=>Il,RGB_ETC2_Format:()=>Ll,RGB_PVRTC_2BPPV1_Format:()=>Rl,RGB_PVRTC_4BPPV1_Format:()=>Al,RGB_S3TC_DXT1_Format:()=>Pa,RGDepthPacking:()=>Um,RGFormat:()=>ji,RGIntegerFormat:()=>wl,RawShaderMaterial:()=>ca,Ray:()=>ci,Raycaster:()=>ya,RectAreaLight:()=>cl,RedFormat:()=>El,RedIntegerFormat:()=>Ca,ReinhardToneMapping:()=>vu,RenderObjectRefreshType:()=>ug,RenderTarget:()=>Jr,RenderTarget3D:()=>Yh,RepeatWrapping:()=>kr,ReplaceStencilOp:()=>zm,ReverseSubtractEquation:()=>ef,RingGeometry:()=>Xo,SIGNED_R11_EAC_Format:()=>Nl,SIGNED_RED_GREEN_RGTC2_Format:()=>nc,SIGNED_RED_RGTC1_Format:()=>tc,SIGNED_RG11_EAC_Format:()=>Fl,SRGBColorSpace:()=>an,SRGBTransfer:()=>Lt,Scene:()=>Ws,ShaderChunk:()=>yt,ShaderLib:()=>bn,ShaderMaterial:()=>hn,ShadowMaterial:()=>Jo,Shape:()=>_s,ShapeGeometry:()=>Yo,ShapePath:()=>du,ShapeUtils:()=>Zn,ShortType:()=>Au,Skeleton:()=>Ro,SkeletonHelper:()=>eu,SkinnedMesh:()=>Ao,Source:()=>fh,Sphere:()=>kt,SphereGeometry:()=>fi,Spherical:()=>or,SphericalHarmonics3:()=>ga,SplineCurve:()=>aa,SpotLight:()=>al,SpotLightHelper:()=>Qh,Sprite:()=>Ys,SpriteMaterial:()=>ds,SrcAlphaFactor:()=>_u,SrcAlphaSaturateFactor:()=>df,SrcColorFactor:()=>af,StaticCopyUsage:()=>ig,StaticDrawUsage:()=>ac,StaticReadUsage:()=>eg,StereoCamera:()=>Vh,StreamCopyUsage:()=>rg,StreamDrawUsage:()=>Qm,StreamReadUsage:()=>ng,StringKeyframeTrack:()=>wi,SubtractEquation:()=>Qd,SubtractiveBlending:()=>mu,TOUCH:()=>Zi,TangentSpaceNormalMap:()=>Ti,TetrahedronGeometry:()=>qo,Texture:()=>qt,TextureLoader:()=>Fh,TextureSource:()=>qn,TextureUtils:()=>fu,Timer:()=>ml,TimestampQuery:()=>og,TorusGeometry:()=>pi,TorusKnotGeometry:()=>Zo,Triangle:()=>ai,TriangleFanDrawMode:()=>Im,TriangleStripDrawMode:()=>Pm,TrianglesDrawMode:()=>Cm,TubeGeometry:()=>mi,UVMapping:()=>vl,Uint16BufferAttribute:()=>Kr,Uint32BufferAttribute:()=>$r,Uint8BufferAttribute:()=>xh,Uint8ClampedBufferAttribute:()=>yh,Uniform:()=>qh,UniformsGroup:()=>Zh,UniformsLib:()=>Ce,UniformsUtils:()=>Fa,UnsignedByteType:()=>Pn,UnsignedInt101111Type:()=>Cu,UnsignedInt248Type:()=>fr,UnsignedInt5999Type:()=>Ru,UnsignedIntType:()=>Gn,UnsignedShort4444Type:()=>Ml,UnsignedShort5551Type:()=>bl,UnsignedShortType:()=>dr,VSMShadowMap:()=>lr,Vector2:()=>ce,Vector3:()=>E,Vector4:()=>wt,VectorKeyframeTrack:()=>pa,VideoFrameTexture:()=>wh,VideoTexture:()=>Do,WebGL3DRenderTarget:()=>mh,WebGLArrayRenderTarget:()=>ph,WebGLCoordinateSystem:()=>Un,WebGLCubeRenderTarget:()=>uc,WebGLRenderTarget:()=>cn,WebGLRenderer:()=>dc,WebGLUtils:()=>t0,WebGPUCoordinateSystem:()=>hs,WebXRController:()=>Gs,WireframeGeometry:()=>Qs,WrapAroundEnding:()=>Wr,ZeroCurvatureEnding:()=>ls,ZeroFactor:()=>sf,ZeroSlopeEnding:()=>cs,ZeroStencilOp:()=>Bm,createCanvasElement:()=>Lf,error:()=>$e,getConsoleFunction:()=>pg,log:()=>Zr,setConsoleFunction:()=>fg,warn:()=>Pe,warnOnce:()=>Mi});var Zd="186",qi={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Zi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Jd=0,pu=1,Kd=2,Sm=3,Mm=0,Ma=1,$d=2,lr=3,Ji=0,Sn=1,Hn=2,_i=0,cr=1,ba=2,mu=3,gu=4,jd=5,bm=6,Ms=100,Qd=101,ef=102,tf=103,nf=104,sf=200,rf=201,af=202,of=203,_u=204,xu=205,lf=206,cf=207,hf=208,uf=209,df=210,ff=211,pf=212,mf=213,gf=214,mo=0,go=1,_o=2,Bs=3,xo=4,yo=5,vo=6,So=7,Ea=0,_f=1,xf=2,$n=0,yu=1,vu=2,Su=3,wa=4,Mu=5,bu=6,Eu=7,uh="attached",yf="detached",vl=300,xi=301,Ki=302,Ta=303,Aa=304,hr=306,kr=1e3,Tn=1001,Hr=1002,Yt=1003,wu=1004,Em=1004,ur=1005,wm=1005,Bt=1006,Ra=1007,Tm=1007,yi=1008,Am=1008,Pn=1009,Tu=1010,Au=1011,dr=1012,Sl=1013,Gn=1014,xn=1015,jn=1016,Ml=1017,bl=1018,fr=1020,Ru=35902,Cu=35899,Pu=1021,Iu=1022,yn=1023,li=1026,$i=1027,El=1028,Ca=1029,ji=1030,wl=1031,Rm=1032,Tl=1033,Pa=33776,Ia=33777,La=33778,Da=33779,Al=35840,Rl=35841,Cl=35842,Pl=35843,Il=36196,Ll=37492,Dl=37496,Ul=37488,Nl=37489,Ua=37490,Fl=37491,Ol=37808,Bl=37809,zl=37810,Vl=37811,kl=37812,Hl=37813,Gl=37814,Wl=37815,Xl=37816,Yl=37817,ql=37818,Zl=37819,Jl=37820,Kl=37821,$l=36492,jl=36494,Ql=36495,ec=36283,tc=36284,Na=36285,nc=36286,vf=2200,Sf=2201,Mf=2202,Gr=2300,Mo=2301,lo=2302,dh=2303,ls=2400,cs=2401,Wr=2402,ic=2500,Lu=2501,Cm=0,Pm=1,Im=2,bf=3200,Lm=3201,Dm=3202,Um=3203,Ti=0,Ef=1,Ai="",an="srgb",Xr="srgb-linear",Yr="linear",Lt="srgb",Nm="",Fm="rg",Om="ga",Bm=0,co=7680,zm=7681,Vm=7682,km=7683,Hm=34055,Gm=34056,Wm=5386,Xm=512,Ym=513,qm=514,Zm=515,Jm=516,Km=517,$m=518,wf=519,Tf=512,Af=513,Rf=514,sc=515,Cf=516,Pf=517,rc=518,If=519,ac=35044,jm=35048,Qm=35040,eg=35045,tg=35049,ng=35041,ig=35046,sg=35050,rg=35042,ag="100",Du="300 es",Un=2e3,hs=2001,og={COMPUTE:"compute",RENDER:"render"},lg={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},cg={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},hg={TEXTURE_COMPARE:"depthTextureCompare"},ug={NONE:0,SHARED:1,FULL:2};function g0(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}var _0={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};function zr(s,e){return new _0[s](e)}function dg(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function qr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Lf(){let s=qr("canvas");return s.style.display="block",s}var hp={},us=null;function fg(s){us=s}function pg(){return us}function Zr(...s){let e="THREE."+s.shift();us?us("log",e,...s):console.log(e,...s)}function mg(s){let e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Pe(...s){s=mg(s);let e="THREE."+s.shift();if(us)us("warn",e,...s);else{let t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function $e(...s){s=mg(s);let e="THREE."+s.shift();if(us)us("error",e,...s);else{let t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function Mi(...s){let e=s.join(" ");e in hp||(hp[e]=!0,Pe(...s))}function gg(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}var _g={[mo]:go,[_o]:vo,[xo]:So,[Bs]:yo,[go]:mo,[vo]:_o,[So]:xo,[yo]:Bs},Nn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}},mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],up=1234567,Os=Math.PI/180,zs=180/Math.PI;function kn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(mn[s&255]+mn[s>>8&255]+mn[s>>16&255]+mn[s>>24&255]+"-"+mn[e&255]+mn[e>>8&255]+"-"+mn[e>>16&15|64]+mn[e>>24&255]+"-"+mn[t&63|128]+mn[t>>8&255]+"-"+mn[t>>16&255]+mn[t>>24&255]+mn[n&255]+mn[n>>8&255]+mn[n>>16&255]+mn[n>>24&255]).toLowerCase()}function ht(s,e,t){return Math.max(e,Math.min(t,s))}function Df(s,e){return(s%e+e)%e}function x0(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function y0(s,e,t){return s!==e?(t-s)/(e-s):0}function ho(s,e,t){return(1-t)*s+t*e}function v0(s,e,t,n){return ho(s,e,1-Math.exp(-t*n))}function S0(s,e=1){return e-Math.abs(Df(s,e*2)-e)}function M0(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function b0(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function E0(s,e){return s+Math.floor(Math.random()*(e-s+1))}function w0(s,e){return s+Math.random()*(e-s)}function T0(s){return s*(.5-Math.random())}function A0(s){s!==void 0&&(up=s);let e=up+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function R0(s){return s*Os}function C0(s){return s*zs}function P0(s){return s>0&&Number.isInteger(s)&&2**Math.round(Math.log2(s))===s}function I0(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function L0(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function D0(s,e,t,n,i){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),d=r((e-n)/2),u=a((e-n)/2),f=r((n-e)/2),p=a((n-e)/2);switch(i){case"XYX":s.set(o*h,l*d,l*u,o*c);break;case"YZY":s.set(l*u,o*h,l*d,o*c);break;case"ZXZ":s.set(l*d,l*u,o*h,o*c);break;case"XZX":s.set(o*h,l*p,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*p,o*c);break;case"ZYZ":s.set(l*p,l*f,o*h,o*c);break;default:Pe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function wn(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:case Uint8ClampedArray:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function _t(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Qn={DEG2RAD:Os,RAD2DEG:zs,generateUUID:kn,clamp:ht,euclideanModulo:Df,mapLinear:x0,inverseLerp:y0,lerp:ho,damp:v0,pingpong:S0,smoothstep:M0,smootherstep:b0,randInt:E0,randFloat:w0,randFloatSpread:T0,seededRandom:A0,degToRad:R0,radToDeg:C0,isPowerOfTwo:P0,ceilPowerOfTwo:I0,floorPowerOfTwo:L0,setQuaternionFromProperEuler:D0,normalize:_t,denormalize:wn},ce=class s{static{s.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Jt=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3],u=r[a+0],f=r[a+1],p=r[a+2],_=r[a+3];if(d!==_||l!==u||c!==f||h!==p){let g=l*u+c*f+h*p+d*_;g<0&&(u=-u,f=-f,p=-p,_=-_,g=-g);let m=1-o;if(g<.9995){let y=Math.acos(g),b=Math.sin(y);m=Math.sin(m*y)/b,o=Math.sin(o*y)/b,l=l*m+u*o,c=c*m+f*o,h=h*m+p*o,d=d*m+_*o}else{l=l*m+u*o,c=c*m+f*o,h=h*m+p*o,d=d*m+_*o;let y=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=y,c*=y,h*=y,d*=y}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,r,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=r[a],u=r[a+1],f=r[a+2],p=r[a+3];return e[t]=o*p+h*d+l*f-c*u,e[t+1]=l*p+h*u+c*d-o*f,e[t+2]=c*p+h*f+o*u-l*d,e[t+3]=h*p-o*d-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),d=o(r/2),u=l(n/2),f=l(i/2),p=l(r/2);switch(a){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>d){let f=2*Math.sqrt(1+n-o-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-n-d);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ht(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},E=class s{static{s.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(dp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(dp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-r*i),d=2*(r*n-a*t);return this.x=t+l*c+a*d-o*h,this.y=n+l*h+o*c-r*d,this.z=i+l*d+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ed.copy(this).projectOnVector(e),this.sub(ed)}reflect(e){return this.sub(ed.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(ht(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ed=new E,dp=new Jt,dt=class s{static{s.prototype.isMatrix3=!0}constructor(e,t,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],_=i[0],g=i[3],m=i[6],y=i[1],b=i[4],x=i[7],A=i[2],T=i[5],P=i[8];return r[0]=a*_+o*y+l*A,r[3]=a*g+o*b+l*T,r[6]=a*m+o*x+l*P,r[1]=c*_+h*y+d*A,r[4]=c*g+h*b+d*T,r[7]=c*m+h*x+d*P,r[2]=u*_+f*y+p*A,r[5]=u*g+f*b+p*T,r[8]=u*m+f*x+p*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=h*a-o*c,u=o*l-h*r,f=c*r-a*l,p=t*d+n*u+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/p;return e[0]=d*_,e[1]=(i*c-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=u*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Mi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(td.makeScale(e,t)),this}rotate(e){return Mi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(td.makeRotation(-e)),this}translate(e,t){return Mi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(td.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},td=new dt,fp=new dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pp=new dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function U0(){let s={enabled:!0,workingColorSpace:Xr,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Lt&&(i.r=Vi(i.r),i.g=Vi(i.g),i.b=Vi(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Lt&&(i.r=Vr(i.r),i.g=Vr(i.g),i.b=Vr(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ai?Yr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Mi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Mi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Xr]:{primaries:e,whitePoint:n,transfer:Yr,toXYZ:fp,fromXYZ:pp,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:an},outputColorSpaceConfig:{drawingBufferColorSpace:an}},[an]:{primaries:e,whitePoint:n,transfer:Lt,toXYZ:fp,fromXYZ:pp,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:an}}}),s}var Mt=U0();function Vi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Vr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}var yr,bo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{yr===void 0&&(yr=qr("canvas")),yr.width=e.width,yr.height=e.height;let i=yr.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=yr}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=qr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Vi(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Vi(t[n]/255)*255):t[n]=Vi(t[n]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},N0=0,qn=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:N0++}),this.uuid=kn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(nd(i[a].image)):r.push(nd(i[a]))}else r=nd(i);n.url=r}return t||(e.images[this.uuid]=n),n}};function nd(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?bo.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}var fh=class extends qn{constructor(e=null){Mi('Source: "Source" has been renamed to "TextureSource". Please update your code to use "THREE.TextureSource" instead.'),super(e),this.isSource=!0}},F0=0,id=new E,qt=class s extends Nn{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=Tn,i=Tn,r=Bt,a=yi,o=yn,l=Pn,c=s.DEFAULT_ANISOTROPY,h=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:F0++}),this.uuid=kn(),this.name="",this.source=new qn(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ce(0,0),this.repeat=new ce(1,1),this.center=new ce(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(id).x}get height(){return this.source.getSize(id).y}get depth(){return this.source.getSize(id).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==vl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case kr:e.x=e.x-Math.floor(e.x);break;case Tn:e.x=e.x<0?0:1;break;case Hr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case kr:e.y=e.y-Math.floor(e.y);break;case Tn:e.y=e.y<0?0:1;break;case Hr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};qt.DEFAULT_IMAGE=null;qt.DEFAULT_MAPPING=vl;qt.DEFAULT_ANISOTROPY=1;var wt=class s{static{s.prototype.isVector4=!0}constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,l=e.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],_=l[2],g=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let b=(c+1)/2,x=(f+1)/2,A=(m+1)/2,T=(h+u)/4,P=(d+_)/4,v=(p+g)/4;return b>x&&b>A?b<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(b),i=T/n,r=P/n):x>A?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=T/i,r=v/i):A<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(A),n=P/r,i=v/r),this.set(n,i,r,t),this}let y=Math.sqrt((g-p)*(g-p)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(g-p)/y,this.y=(d-_)/y,this.z=(u-h)/y,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ht(this.x,e.x,t.x),this.y=ht(this.y,e.y,t.y),this.z=ht(this.z,e.z,t.z),this.w=ht(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ht(this.x,e,t),this.y=ht(this.y,e,t),this.z=ht(this.z,e,t),this.w=ht(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(ht(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Jr=class extends Nn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new wt(0,0,e,t),this.scissorTest=!1,this.viewport=new wt(0,0,e,t),this.textures=[];let i={width:e,height:t,depth:n.depth},r=new qt(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new qn(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},cn=class extends Jr{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Vs=class extends qt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},ph=class extends cn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new Vs(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},ks=class extends qt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Tn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},mh=class extends cn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new ks(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},ct=class s{static{s.prototype.isMatrix4=!0}constructor(e,t,n,i,r,a,o,l,c,h,d,u,f,p,_,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,h,d,u,f,p,_,g)}set(e,t,n,i,r,a,o,l,c,h,d,u,f,p,_,g){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=i,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=_,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,i=1/vr.setFromMatrixColumn(e,0).length(),r=1/vr.setFromMatrixColumn(e,1).length(),a=1/vr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let u=a*h,f=a*d,p=o*h,_=o*d;t[0]=l*h,t[4]=-l*d,t[8]=c,t[1]=f+p*c,t[5]=u-_*c,t[9]=-o*l,t[2]=_-u*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*h,f=l*d,p=c*h,_=c*d;t[0]=u+_*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-p,t[6]=_+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*h,f=l*d,p=c*h,_=c*d;t[0]=u-_*o,t[4]=-a*d,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*h,t[9]=_-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*h,f=a*d,p=o*h,_=o*d;t[0]=l*h,t[4]=p*c-f,t[8]=u*c+_,t[1]=l*d,t[5]=_*c+u,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*h,t[4]=_-u*d,t[8]=p*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*d+p,t[10]=u-_*d}else if(e.order==="XZY"){let u=a*l,f=a*c,p=o*l,_=o*c;t[0]=l*h,t[4]=-d,t[8]=c*h,t[1]=u*d+_,t[5]=a*h,t[9]=f*d-p,t[2]=p*d-f,t[6]=o*h,t[10]=_*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(O0,e,B0)}lookAt(e,t,n){let i=this.elements;return zn.subVectors(e,t),zn.lengthSq()===0&&(zn.z=1),zn.normalize(),ns.crossVectors(n,zn),ns.lengthSq()===0&&(Math.abs(n.z)===1?zn.x+=1e-4:zn.z+=1e-4,zn.normalize(),ns.crossVectors(n,zn)),ns.normalize(),Mc.crossVectors(zn,ns),i[0]=ns.x,i[4]=Mc.x,i[8]=zn.x,i[1]=ns.y,i[5]=Mc.y,i[9]=zn.y,i[2]=ns.z,i[6]=Mc.z,i[10]=zn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],_=n[6],g=n[10],m=n[14],y=n[3],b=n[7],x=n[11],A=n[15],T=i[0],P=i[4],v=i[8],R=i[12],L=i[1],N=i[5],V=i[9],X=i[13],O=i[2],G=i[6],Y=i[10],k=i[14],re=i[3],K=i[7],te=i[11],Q=i[15];return r[0]=a*T+o*L+l*O+c*re,r[4]=a*P+o*N+l*G+c*K,r[8]=a*v+o*V+l*Y+c*te,r[12]=a*R+o*X+l*k+c*Q,r[1]=h*T+d*L+u*O+f*re,r[5]=h*P+d*N+u*G+f*K,r[9]=h*v+d*V+u*Y+f*te,r[13]=h*R+d*X+u*k+f*Q,r[2]=p*T+_*L+g*O+m*re,r[6]=p*P+_*N+g*G+m*K,r[10]=p*v+_*V+g*Y+m*te,r[14]=p*R+_*X+g*k+m*Q,r[3]=y*T+b*L+x*O+A*re,r[7]=y*P+b*N+x*G+A*K,r[11]=y*v+b*V+x*Y+A*te,r[15]=y*R+b*X+x*k+A*Q,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],d=e[6],u=e[10],f=e[14],p=e[3],_=e[7],g=e[11],m=e[15],y=l*f-c*u,b=o*f-c*d,x=o*u-l*d,A=a*f-c*h,T=a*u-l*h,P=a*d-o*h;return t*(_*y-g*b+m*x)-n*(p*y-g*A+m*T)+i*(p*b-_*A+m*P)-r*(p*x-_*T+g*P)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return t*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],d=e[9],u=e[10],f=e[11],p=e[12],_=e[13],g=e[14],m=e[15],y=t*o-n*a,b=t*l-i*a,x=t*c-r*a,A=n*l-i*o,T=n*c-r*o,P=i*c-r*l,v=h*_-d*p,R=h*g-u*p,L=h*m-f*p,N=d*g-u*_,V=d*m-f*_,X=u*m-f*g,O=y*X-b*V+x*N+A*L-T*R+P*v;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/O;return e[0]=(o*X-l*V+c*N)*G,e[1]=(i*V-n*X-r*N)*G,e[2]=(_*P-g*T+m*A)*G,e[3]=(u*T-d*P-f*A)*G,e[4]=(l*L-a*X-c*R)*G,e[5]=(t*X-i*L+r*R)*G,e[6]=(g*x-p*P-m*b)*G,e[7]=(h*P-u*x+f*b)*G,e[8]=(a*V-o*L+c*v)*G,e[9]=(n*L-t*V-r*v)*G,e[10]=(p*T-_*x+m*y)*G,e[11]=(d*x-h*T-f*y)*G,e[12]=(o*R-a*N-l*v)*G,e[13]=(t*N-n*R+i*v)*G,e[14]=(_*b-p*A-g*y)*G,e[15]=(h*A-d*b+u*y)*G,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,d=o+o,u=r*c,f=r*h,p=r*d,_=a*h,g=a*d,m=o*d,y=l*c,b=l*h,x=l*d,A=n.x,T=n.y,P=n.z;return i[0]=(1-(_+m))*A,i[1]=(f+x)*A,i[2]=(p-b)*A,i[3]=0,i[4]=(f-x)*T,i[5]=(1-(u+m))*T,i[6]=(g+y)*T,i[7]=0,i[8]=(p+b)*P,i[9]=(g-y)*P,i[10]=(1-(u+_))*P,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=vr.set(i[0],i[1],i[2]).length(),o=vr.set(i[4],i[5],i[6]).length(),l=vr.set(i[8],i[9],i[10]).length();r<0&&(a=-a),ni.copy(this);let c=1/a,h=1/o,d=1/l;return ni.elements[0]*=c,ni.elements[1]*=c,ni.elements[2]*=c,ni.elements[4]*=h,ni.elements[5]*=h,ni.elements[6]*=h,ni.elements[8]*=d,ni.elements[9]*=d,ni.elements[10]*=d,t.setFromRotationMatrix(ni),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,i,r,a,o=Un,l=!1){let c=this.elements,h=2*r/(t-e),d=2*r/(n-i),u=(t+e)/(t-e),f=(n+i)/(n-i),p,_;if(l)p=r/(a-r),_=a*r/(a-r);else if(o===Un)p=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===hs)p=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=Un,l=!1){let c=this.elements,h=2/(t-e),d=2/(n-i),u=-(t+e)/(t-e),f=-(n+i)/(n-i),p,_;if(l)p=1/(a-r),_=a/(a-r);else if(o===Un)p=-2/(a-r),_=-(a+r)/(a-r);else if(o===hs)p=-1/(a-r),_=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},vr=new E,ni=new ct,O0=new E(0,0,0),B0=new E(1,1,1),ns=new E,Mc=new E,zn=new E,mp=new ct,gp=new Jt,Jn=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(ht(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ht(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(ht(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ht(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ht(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ht(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return mp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(mp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gp.setFromEuler(this),this.setFromQuaternion(gp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Jn.DEFAULT_ORDER="XYZ";var Hs=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},z0=0,_p=new E,Sr=new Jt,Di=new ct,bc=new E,Za=new E,V0=new E,k0=new Jt,xp=new E(1,0,0),yp=new E(0,1,0),vp=new E(0,0,1),Sp={type:"added"},H0={type:"removed"},Mr={type:"childadded",child:null},sd={type:"childremoved",child:null},Ct=class s extends Nn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:z0++}),this.uuid=kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new E,t=new Jn,n=new Jt,i=new E(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ct},normalMatrix:{value:new dt}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Hs,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Sr.setFromAxisAngle(e,t),this.quaternion.multiply(Sr),this}rotateOnWorldAxis(e,t){return Sr.setFromAxisAngle(e,t),this.quaternion.premultiply(Sr),this}rotateX(e){return this.rotateOnAxis(xp,e)}rotateY(e){return this.rotateOnAxis(yp,e)}rotateZ(e){return this.rotateOnAxis(vp,e)}translateOnAxis(e,t){return _p.copy(e).applyQuaternion(this.quaternion),this.position.add(_p.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(xp,e)}translateY(e){return this.translateOnAxis(yp,e)}translateZ(e){return this.translateOnAxis(vp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Di.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?bc.copy(e):bc.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Za.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Di.lookAt(Za,bc,this.up):Di.lookAt(bc,Za,this.up),this.quaternion.setFromRotationMatrix(Di),i&&(Di.extractRotation(i.matrixWorld),Sr.setFromRotationMatrix(Di),this.quaternion.premultiply(Sr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?($e("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Sp),Mr.child=e,this.dispatchEvent(Mr),Mr.child=null):$e("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(H0),sd.child=e,this.dispatchEvent(sd),sd.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Di.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Di.multiply(e.parent.matrixWorld)),e.applyMatrix4(Di),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Sp),Mr.child=e,this.dispatchEvent(Mr),Mr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Za,e,V0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Za,k0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,i=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*i,r[13]+=n-r[1]*t-r[5]*n-r[9]*i,r[14]+=i-r[2]*t-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Ct.DEFAULT_UP=new E(0,1,0);Ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var en=class extends Ct{constructor(){super(),this.isGroup=!0,this.type="Group"}},G0={type:"move"},Gs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new en,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new en,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new en,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,n),m=this._getHandJoint(c,_);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}let h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(G0)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new en;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},xg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},is={h:0,s:0,l:0},Ec={h:0,s:0,l:0};function rd(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}var ze=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=an){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Mt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Mt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Mt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Mt.workingColorSpace){if(e=Df(e,1),t=ht(t,0,1),n=ht(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=rd(a,r,e+1/3),this.g=rd(a,r,e),this.b=rd(a,r,e-1/3)}return Mt.colorSpaceToWorking(this,i),this}setStyle(e,t=an){function n(r){r!==void 0&&parseFloat(r)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=an){let n=xg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vi(e.r),this.g=Vi(e.g),this.b=Vi(e.b),this}copyLinearToSRGB(e){return this.r=Vr(e.r),this.g=Vr(e.g),this.b=Vr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=an){return Mt.workingToColorSpace(gn.copy(this),e),Math.round(ht(gn.r*255,0,255))*65536+Math.round(ht(gn.g*255,0,255))*256+Math.round(ht(gn.b*255,0,255))}getHexString(e=an){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Mt.workingColorSpace){Mt.workingToColorSpace(gn.copy(this),t);let n=gn.r,i=gn.g,r=gn.b,a=Math.max(n,i,r),o=Math.min(n,i,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=h<=.5?d/(a+o):d/(2-a-o),a){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Mt.workingColorSpace){return Mt.workingToColorSpace(gn.copy(this),t),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=an){Mt.workingToColorSpace(gn.copy(this),e);let t=gn.r,n=gn.g,i=gn.b;return e!==an?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(is),this.setHSL(is.h+e,is.s+t,is.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(is),e.getHSL(Ec);let n=ho(is.h,Ec.h,t),i=ho(is.s,Ec.s,t),r=ho(is.l,Ec.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},gn=new ze;ze.NAMES=xg;var Eo=class s{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new ze(e),this.density=t}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}},wo=class s{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ze(e),this.near=t,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ws=class extends Ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Jn,this.environmentIntensity=1,this.environmentRotation=new Jn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ii=new E,Ui=new E,ad=new E,Ni=new E,br=new E,Er=new E,Mp=new E,od=new E,ld=new E,cd=new E,hd=new wt,ud=new wt,dd=new wt,ai=class s{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ii.subVectors(e,t),i.cross(ii);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){ii.subVectors(i,t),Ui.subVectors(n,t),ad.subVectors(e,t);let a=ii.dot(ii),o=ii.dot(Ui),l=ii.dot(ad),c=Ui.dot(Ui),h=Ui.dot(ad),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let u=1/d,f=(c*l-o*h)*u,p=(a*h-o*l)*u;return r.set(1-f-p,p,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Ni)===null?!1:Ni.x>=0&&Ni.y>=0&&Ni.x+Ni.y<=1}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,Ni)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ni.x),l.addScaledVector(a,Ni.y),l.addScaledVector(o,Ni.z),l)}static getInterpolatedAttribute(e,t,n,i,r,a){return hd.setScalar(0),ud.setScalar(0),dd.setScalar(0),hd.fromBufferAttribute(e,t),ud.fromBufferAttribute(e,n),dd.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(hd,r.x),a.addScaledVector(ud,r.y),a.addScaledVector(dd,r.z),a}static isFrontFacing(e,t,n,i){return ii.subVectors(n,t),Ui.subVectors(e,t),ii.cross(Ui).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ii.subVectors(this.c,this.b),Ui.subVectors(this.a,this.b),ii.cross(Ui).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,a,o;br.subVectors(i,n),Er.subVectors(r,n),od.subVectors(e,n);let l=br.dot(od),c=Er.dot(od);if(l<=0&&c<=0)return t.copy(n);ld.subVectors(e,i);let h=br.dot(ld),d=Er.dot(ld);if(h>=0&&d<=h)return t.copy(i);let u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(br,a);cd.subVectors(e,r);let f=br.dot(cd),p=Er.dot(cd);if(p>=0&&f<=p)return t.copy(r);let _=f*c-l*p;if(_<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Er,o);let g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return Mp.subVectors(r,i),o=(d-h)/(d-h+(f-p)),t.copy(i).addScaledVector(Mp,o);let m=1/(g+_+u);return a=_*m,o=u*m,t.copy(n).addScaledVector(br,a).addScaledVector(Er,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Vt=class{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(si.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(si.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=si.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,si):si.fromBufferAttribute(r,a),si.applyMatrix4(e.matrixWorld),this.expandByPoint(si);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),wc.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),wc.copy(n.boundingBox)),wc.applyMatrix4(e.matrixWorld),this.union(wc)}let i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,si),si.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ja),Tc.subVectors(this.max,Ja),wr.subVectors(e.a,Ja),Tr.subVectors(e.b,Ja),Ar.subVectors(e.c,Ja),ss.subVectors(Tr,wr),rs.subVectors(Ar,Tr),ws.subVectors(wr,Ar);let t=[0,-ss.z,ss.y,0,-rs.z,rs.y,0,-ws.z,ws.y,ss.z,0,-ss.x,rs.z,0,-rs.x,ws.z,0,-ws.x,-ss.y,ss.x,0,-rs.y,rs.x,0,-ws.y,ws.x,0];return!fd(t,wr,Tr,Ar,Tc)||(t=[1,0,0,0,1,0,0,0,1],!fd(t,wr,Tr,Ar,Tc))?!1:(Ac.crossVectors(ss,rs),t=[Ac.x,Ac.y,Ac.z],fd(t,wr,Tr,Ar,Tc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,si).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(si).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Fi=[new E,new E,new E,new E,new E,new E,new E,new E],si=new E,wc=new Vt,wr=new E,Tr=new E,Ar=new E,ss=new E,rs=new E,ws=new E,Ja=new E,Tc=new E,Ac=new E,Ts=new E;function fd(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Ts.fromArray(s,r);let o=i.x*Math.abs(Ts.x)+i.y*Math.abs(Ts.y)+i.z*Math.abs(Ts.z),l=e.dot(Ts),c=t.dot(Ts),h=n.dot(Ts);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var zi=W0();function W0(){let s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[l|256]=32768,i[l]=24,i[l|256]=24):c<-14?(n[l]=1024>>-c-14,n[l|256]=1024>>-c-14|32768,i[l]=-c-1,i[l|256]=-c-1):c<=15?(n[l]=c+15<<10,n[l|256]=c+15<<10|32768,i[l]=13,i[l|256]=13):c<128?(n[l]=31744,n[l|256]=64512,i[l]=24,i[l|256]=24):(n[l]=31744,n[l|256]=64512,i[l]=13,i[l|256]=13)}let r=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;(c&8388608)===0;)c<<=1,h-=8388608;c&=-8388609,h+=947912704,r[l]=c|h}for(let l=1024;l<2048;++l)r[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:a,offsetTable:o}}function Ln(s){Math.abs(s)>65504&&Pe("DataUtils.toHalfFloat(): Value out of range."),s=ht(s,-65504,65504),zi.floatView[0]=s;let e=zi.uint32View[0],t=e>>23&511;return zi.baseTable[t]+((e&8388607)>>zi.shiftTable[t])}function ao(s){let e=s>>10;return zi.uint32View[0]=zi.mantissaTable[zi.offsetTable[e]+(s&1023)]+zi.exponentTable[e],zi.floatView[0]}var gh=class{static toHalfFloat(e){return Ln(e)}static fromHalfFloat(e){return ao(e)}},Kt=new E,Rc=new ce,X0=0,Nt=class extends Nn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:X0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ac,this.updateRanges=[],this.gpuType=xn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Rc.fromBufferAttribute(this,t),Rc.applyMatrix3(e),this.setXY(t,Rc.x,Rc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix3(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyMatrix4(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.applyNormalMatrix(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Kt.fromBufferAttribute(this,t),Kt.transformDirection(e),this.setXYZ(t,Kt.x,Kt.y,Kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array),r=_t(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}},_h=class extends Nt{constructor(e,t,n){super(new Int8Array(e),t,n)}},xh=class extends Nt{constructor(e,t,n){super(new Uint8Array(e),t,n)}},yh=class extends Nt{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}},vh=class extends Nt{constructor(e,t,n){super(new Int16Array(e),t,n)}},Kr=class extends Nt{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Sh=class extends Nt{constructor(e,t,n){super(new Int32Array(e),t,n)}},$r=class extends Nt{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Mh=class extends Nt{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=ao(this.array[e*this.itemSize]);return this.normalized&&(t=wn(t,this.array)),t}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize]=Ln(t),this}getY(e){let t=ao(this.array[e*this.itemSize+1]);return this.normalized&&(t=wn(t,this.array)),t}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+1]=Ln(t),this}getZ(e){let t=ao(this.array[e*this.itemSize+2]);return this.normalized&&(t=wn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+2]=Ln(t),this}getW(e){let t=ao(this.array[e*this.itemSize+3]);return this.normalized&&(t=wn(t,this.array)),t}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.array[e*this.itemSize+3]=Ln(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.array[e+0]=Ln(t),this.array[e+1]=Ln(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array)),this.array[e+0]=Ln(t),this.array[e+1]=Ln(n),this.array[e+2]=Ln(i),this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array),r=_t(r,this.array)),this.array[e+0]=Ln(t),this.array[e+1]=Ln(n),this.array[e+2]=Ln(i),this.array[e+3]=Ln(r),this}},ke=class extends Nt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Y0=new Vt,Ka=new E,pd=new E,kt=class{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Y0.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ka.subVectors(e,this.center);let t=Ka.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ka,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ka.copy(e.center).add(pd)),this.expandByPoint(Ka.copy(e.center).sub(pd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},q0=0,Yn=new ct,md=new Ct,Rr=new E,Vn=new Vt,$a=new Vt,rn=new E,pt=class s extends Nn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:q0++}),this.uuid=kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(g0(e)?$r:Kr)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new dt().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Yn.makeRotationFromQuaternion(e),this.applyMatrix4(Yn),this}rotateX(e){return Yn.makeRotationX(e),this.applyMatrix4(Yn),this}rotateY(e){return Yn.makeRotationY(e),this.applyMatrix4(Yn),this}rotateZ(e){return Yn.makeRotationZ(e),this.applyMatrix4(Yn),this}translate(e,t,n){return Yn.makeTranslation(e,t,n),this.applyMatrix4(Yn),this}scale(e,t,n){return Yn.makeScale(e,t,n),this.applyMatrix4(Yn),this}lookAt(e){return md.lookAt(e),md.updateMatrix(),this.applyMatrix4(md.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Rr).negate(),this.translate(Rr.x,Rr.y,Rr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new ke(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];Vn.setFromBufferAttribute(r),this.morphTargetsRelative?(rn.addVectors(this.boundingBox.min,Vn.min),this.boundingBox.expandByPoint(rn),rn.addVectors(this.boundingBox.max,Vn.max),this.boundingBox.expandByPoint(rn)):(this.boundingBox.expandByPoint(Vn.min),this.boundingBox.expandByPoint(Vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$e('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new kt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new E,1/0);return}if(e){let n=this.boundingSphere.center;if(Vn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];$a.setFromBufferAttribute(o),this.morphTargetsRelative?(rn.addVectors(Vn.min,$a.min),Vn.expandByPoint(rn),rn.addVectors(Vn.max,$a.max),Vn.expandByPoint(rn)):(Vn.expandByPoint($a.min),Vn.expandByPoint($a.max))}Vn.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)rn.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(rn));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)rn.fromBufferAttribute(o,c),l&&(Rr.fromBufferAttribute(e,c),rn.add(Rr)),i=Math.max(i,n.distanceToSquared(rn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&$e('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){$e("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Nt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let v=0;v<n.count;v++)o[v]=new E,l[v]=new E;let c=new E,h=new E,d=new E,u=new ce,f=new ce,p=new ce,_=new E,g=new E;function m(v,R,L){c.fromBufferAttribute(n,v),h.fromBufferAttribute(n,R),d.fromBufferAttribute(n,L),u.fromBufferAttribute(r,v),f.fromBufferAttribute(r,R),p.fromBufferAttribute(r,L),h.sub(c),d.sub(c),f.sub(u),p.sub(u);let N=1/(f.x*p.y-p.x*f.y);isFinite(N)&&(_.copy(h).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(N),g.copy(d).multiplyScalar(f.x).addScaledVector(h,-p.x).multiplyScalar(N),o[v].add(_),o[R].add(_),o[L].add(_),l[v].add(g),l[R].add(g),l[L].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let v=0,R=y.length;v<R;++v){let L=y[v],N=L.start,V=L.count;for(let X=N,O=N+V;X<O;X+=3)m(e.getX(X+0),e.getX(X+1),e.getX(X+2))}let b=new E,x=new E,A=new E,T=new E;function P(v){A.fromBufferAttribute(i,v),T.copy(A);let R=o[v];b.copy(R),b.sub(A.multiplyScalar(A.dot(R))).normalize(),x.crossVectors(T,R);let N=x.dot(l[v])<0?-1:1;a.setXYZW(v,b.x,b.y,b.z,N)}for(let v=0,R=y.length;v<R;++v){let L=y[v],N=L.start,V=L.count;for(let X=N,O=N+V;X<O;X+=3)P(e.getX(X+0)),P(e.getX(X+1)),P(e.getX(X+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Nt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);let i=new E,r=new E,a=new E,o=new E,l=new E,c=new E,h=new E,d=new E;if(e)for(let u=0,f=e.count;u<f;u+=3){let p=e.getX(u+0),_=e.getX(u+1),g=e.getX(u+2);i.fromBufferAttribute(t,p),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,g),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)rn.fromBufferAttribute(e,t),rn.normalize(),e.setXYZ(t,rn.x,rn.y,rn.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h),f=0,p=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let m=0;m<h;m++)u[p++]=c[f++]}return new Nt(u,h,d)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let o in i){let l=i[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,d=c.length;h<d;h++){let u=c[h],f=e(u,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],d=r[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ac,this.updateRanges=[],this.version=0,this.uuid=kn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},En=new E,vn=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)En.fromBufferAttribute(this,t),En.applyMatrix4(e),this.setXYZ(t,En.x,En.y,En.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)En.fromBufferAttribute(this,t),En.applyNormalMatrix(e),this.setXYZ(t,En.x,En.y,En.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)En.fromBufferAttribute(this,t),En.transformDirection(e),this.setXYZ(t,En.x,En.y,En.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=wn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=_t(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=_t(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=_t(t,this.array),n=_t(n,this.array),i=_t(i,this.array),r=_t(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Zr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Nt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Zr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},gd=new E,Z0=new E,J0=new dt,Dn=class{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=gd.subVectors(n,t).cross(Z0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let i=e.delta(gd),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||J0.getNormalMatrix(e),i=this.coplanarPoint(gd).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},K0=0,$t=class extends Nn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:K0++}),this.uuid=kn(),this.name="",this.type="Material",this.blending=cr,this.side=Ji,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_u,this.blendDst=xu,this.blendEquation=Ms,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=Bs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=wf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=co,this.stencilZFail=co,this.stencilZPass=co,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ze().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Dn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new ce().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ce().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ds=class extends $t{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Cr,ja=new E,Pr=new E,Ir=new E,Lr=new ce,Qa=new ce,yg=new ct,Cc=new E,eo=new E,Pc=new E,bp=new ce,_d=new ce,Ep=new ce,Ys=class extends Ct{constructor(e=new ds){if(super(),this.isSprite=!0,this.type="Sprite",Cr===void 0){Cr=new pt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Xs(t,5);Cr.setIndex([0,1,2,0,2,3]),Cr.setAttribute("position",new vn(n,3,0,!1)),Cr.setAttribute("uv",new vn(n,2,3,!1))}this.geometry=Cr,this.material=e,this.center=new ce(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&$e('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Pr.setFromMatrixScale(this.matrixWorld),yg.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Ir.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Pr.multiplyScalar(-Ir.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let a=this.center;Ic(Cc.set(-.5,-.5,0),Ir,a,Pr,i,r),Ic(eo.set(.5,-.5,0),Ir,a,Pr,i,r),Ic(Pc.set(.5,.5,0),Ir,a,Pr,i,r),bp.set(0,0),_d.set(1,0),Ep.set(1,1);let o=e.ray.intersectTriangle(Cc,eo,Pc,!1,ja);if(o===null&&(Ic(eo.set(-.5,.5,0),Ir,a,Pr,i,r),_d.set(0,1),o=e.ray.intersectTriangle(Cc,Pc,eo,!1,ja),o===null))return;let l=e.ray.origin.distanceTo(ja);l<e.near||l>e.far||t.push({distance:l,point:ja.clone(),uv:ai.getInterpolation(ja,Cc,eo,Pc,bp,_d,Ep,new ce),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Ic(s,e,t,n,i,r){Lr.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(Qa.x=r*Lr.x-i*Lr.y,Qa.y=i*Lr.x+r*Lr.y):Qa.copy(Lr),s.copy(e),s.x+=Qa.x,s.y+=Qa.y,s.applyMatrix4(yg)}var Lc=new E,wp=new E,To=class extends Ct{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);let t=e.levels;for(let n=0,i=t.length;n<i;n++){let r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);let i=this.levels,r;for(r=0;r<i.length&&!(t<i[r].distance);r++);return i.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){let t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){let i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){let t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){Lc.setFromMatrixPosition(this.matrixWorld);let i=e.ray.origin.distanceTo(Lc);this.getObjectForDistance(i).raycast(e,t)}}update(e){let t=this.levels;if(t.length>1){Lc.setFromMatrixPosition(e.matrixWorld),wp.setFromMatrixPosition(this.matrixWorld);let n=Lc.distanceTo(wp)/e.zoom;t[0].object.visible=!0;let i,r;for(i=1,r=t.length;i<r;i++){let a=t[i].distance;if(t[i].object.visible&&(a-=a*t[i].hysteresis),n>=a)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)t[i].object.visible=!1}}toJSON(e){let t=super.toJSON(e);t.object.autoUpdate=this.autoUpdate,t.object.levels=[];let n=this.levels;for(let i=0,r=n.length;i<r;i++){let a=n[i];t.object.levels.push({object:a.object.uuid,distance:a.distance,hysteresis:a.hysteresis})}return t}},Oi=new E,xd=new E,Dc=new E,Uc=new E,ci=class{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Oi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Oi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Oi.copy(this.origin).addScaledVector(this.direction,t),Oi.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){xd.copy(e).add(t).multiplyScalar(.5),Dc.copy(t).sub(e).normalize(),Uc.copy(this.origin).sub(xd);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Dc),o=Uc.dot(this.direction),l=-Uc.dot(Dc),c=Uc.lengthSq(),h=Math.abs(1-a*a),d,u,f,p;if(h>0)if(d=a*l-o,u=a*o-l,p=r*h,d>=0)if(u>=-p)if(u<=p){let _=1/h;d*=_,u*=_,f=d*(d+a*u+2*o)+u*(a*d+u+2*l)+c}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+u*(u+2*l)+c);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(xd).addScaledVector(Dc,u),f}intersectSphere(e,t){if(e.radius<0)return null;Oi.subVectors(e.center,this.origin);let n=Oi.dot(this.direction),i=Oi.dot(Oi)-n*n,r=e.radius*e.radius;if(i>r)return null;let a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,i=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,i=(e.min.x-u.x)*c),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),d>=0?(o=(e.min.z-u.z)*d,l=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,l=(e.min.z-u.z)*d),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Oi)!==null}intersectTriangle(e,t,n,i,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,f=e.z-a.z,p=t.x-a.x,_=t.y-a.y,g=t.z-a.z,m=n.x-a.x,y=n.y-a.y,b=n.z-a.z,x=Math.abs(l),A=Math.abs(c),T=Math.abs(h),P,v,R,L,N,V,X,O,G,Y,k,re;if(x>=A&&x>=T?(R=l,V=d,G=p,re=m,l>=0?(P=c,v=h,L=u,N=f,X=_,O=g,Y=y,k=b):(P=h,v=c,L=f,N=u,X=g,O=_,Y=b,k=y)):A>=T?(R=c,V=u,G=_,re=y,c>=0?(P=h,v=l,L=f,N=d,X=g,O=p,Y=b,k=m):(P=l,v=h,L=d,N=f,X=p,O=g,Y=m,k=b)):(R=h,V=f,G=g,re=b,h>=0?(P=l,v=c,L=d,N=u,X=p,O=_,Y=m,k=y):(P=c,v=l,L=u,N=d,X=_,O=p,Y=y,k=m)),R===0)return null;let K=P/R,te=v/R,Q=1/R,Ve=L-K*V,Me=N-te*V,bt=X-K*G,it=O-te*G,at=Y-K*re,ne=k-te*re,he=at*it-ne*bt,ye=Ve*ne-Me*at,Le=bt*Me-it*Ve;if(i){if(he<0||ye<0||Le<0)return null}else if((he<0||ye<0||Le<0)&&(he>0||ye>0||Le>0))return null;let De=he+ye+Le;if(De===0)return null;let Qe=Q*(he*V+ye*G+Le*re);return(De>0?Qe<0:Qe>0)?null:this.at(Qe/De,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ht=class extends $t{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=Ea,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Tp=new ct,As=new ci,Nc=new kt,Ap=new E,Fc=new E,Oc=new E,Bc=new E,yd=new E,zc=new E,Rp=new E,Vc=new E,Ot=class extends Ct{constructor(e=new pt,t=new Ht){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(r&&o){zc.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],d=r[l];h!==0&&(yd.fromBufferAttribute(d,e),a?zc.addScaledVector(yd,h):zc.addScaledVector(yd.sub(t),h))}t.add(zc)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Nc.copy(n.boundingSphere),Nc.applyMatrix4(r),As.copy(e.ray).recast(e.near),!(Nc.containsPoint(As.origin)===!1&&(As.intersectSphere(Nc,Ap)===null||As.origin.distanceToSquared(Ap)>(e.far-e.near)**2))&&(Tp.copy(r).invert(),As.copy(e.ray).applyMatrix4(Tp),!(n.boundingBox!==null&&As.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,As)))}_computeIntersections(e,t,n){let i,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,_=u.length;p<_;p++){let g=u[p],m=a[g.materialIndex],y=Math.max(g.start,f.start),b=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let x=y,A=b;x<A;x+=3){let T=o.getX(x),P=o.getX(x+1),v=o.getX(x+2);i=kc(this,m,e,n,c,h,d,T,P,v),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){let y=o.getX(g),b=o.getX(g+1),x=o.getX(g+2);i=kc(this,a,e,n,c,h,d,y,b,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,_=u.length;p<_;p++){let g=u[p],m=a[g.materialIndex],y=Math.max(g.start,f.start),b=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=y,A=b;x<A;x+=3){let T=x,P=x+1,v=x+2;i=kc(this,m,e,n,c,h,d,T,P,v),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let p=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=p,m=_;g<m;g+=3){let y=g,b=g+1,x=g+2;i=kc(this,a,e,n,c,h,d,y,b,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};function $0(s,e,t,n,i,r,a,o){let l;if(e.side===Sn?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===Ji,o),l===null)return null;Vc.copy(o),Vc.applyMatrix4(s.matrixWorld);let c=t.ray.origin.distanceTo(Vc);return c<t.near||c>t.far?null:{distance:c,point:Vc.clone(),object:s}}function kc(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,Fc),s.getVertexPosition(l,Oc),s.getVertexPosition(c,Bc);let h=$0(s,e,t,n,Fc,Oc,Bc,Rp);if(h){let d=new E;ai.getBarycoord(Rp,Fc,Oc,Bc,d),i&&(h.uv=ai.getInterpolatedAttribute(i,o,l,c,d,new ce)),r&&(h.uv1=ai.getInterpolatedAttribute(r,o,l,c,d,new ce)),a&&(h.normal=ai.getInterpolatedAttribute(a,o,l,c,d,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new E,materialIndex:0};ai.getNormal(Fc,Oc,Bc,u.normal),h.face=u,h.barycoord=d}return h}var to=new wt,Cp=new wt,Pp=new wt,j0=new wt,Ip=new ct,Hc=new E,vd=new kt,Lp=new ct,Sd=new ci,Ao=class extends Ot{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=uh,this.bindMatrix=new ct,this.bindMatrixInverse=new ct,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Vt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Hc),this.boundingBox.expandByPoint(Hc)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new kt),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Hc),this.boundingSphere.expandByPoint(Hc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vd.copy(this.boundingSphere),vd.applyMatrix4(i),e.ray.intersectsSphere(vd)!==!1&&(Lp.copy(i).invert(),Sd.copy(e.ray).applyMatrix4(Lp),!(this.boundingBox!==null&&Sd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Sd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new wt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===uh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===yf?this.bindMatrixInverse.copy(this.bindMatrix).invert():Pe("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Cp.fromBufferAttribute(i.attributes.skinIndex,e),Pp.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(to.copy(t),t.set(0,0,0,0)):(to.set(...t,1),t.set(0,0,0)),to.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let a=Pp.getComponent(r);if(a!==0){let o=Cp.getComponent(r);Ip.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(j0.copy(to).applyMatrix4(Ip),a)}}return t.isVector4&&(t.w=to.w),t.applyMatrix4(this.bindMatrixInverse)}},jr=class extends Ct{constructor(){super(),this.isBone=!0,this.type="Bone"}},An=class extends qt{constructor(e=null,t=1,n=1,i,r,a,o,l,c=Yt,h=Yt,d,u){super(null,a,o,l,c,h,i,r,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Dp=new ct,Q0=new ct,Ro=class s{constructor(e=[],t=[]){this.uuid=kn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){Pe("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ct)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new ct;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Q0;Dp.multiplyMatrices(o,t[r]),Dp.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new An(t,e,e,yn,xn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],a=t[r];a===void 0&&(Pe("Skeleton: No bone found with UUID:",r),a=new jr),this.bones.push(a),this.boneInverses.push(new ct().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},ki=class extends Nt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Dr=new ct,Up=new ct,Gc=[],Np=new Vt,e_=new ct,no=new Ot,io=new kt,qs=class extends Ot{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ki(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,e_)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Vt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Dr),Np.copy(e.boundingBox).applyMatrix4(Dr),this.boundingBox.union(Np)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new kt),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Dr),io.copy(e.boundingSphere).applyMatrix4(Dr),this.boundingSphere.union(io)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(no.geometry=this.geometry,no.material=this.material,no.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),io.copy(this.boundingSphere),io.applyMatrix4(n),e.ray.intersectsSphere(io)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Dr),Up.multiplyMatrices(n,Dr),no.matrixWorld=Up,no.raycast(e,Gc);for(let a=0,o=Gc.length;a<o;a++){let l=Gc[a];l.instanceId=r,l.object=this,t.push(l)}Gc.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ki(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new An(new Float32Array(i*this.count),i,this.count,El,xn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Rs=new kt,t_=new ce(.5,.5),Wc=new E,bi=class{constructor(e=new Dn,t=new Dn,n=new Dn,i=new Dn,r=new Dn,a=new Dn){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Un,n=!1){let i=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],d=r[5],u=r[6],f=r[7],p=r[8],_=r[9],g=r[10],m=r[11],y=r[12],b=r[13],x=r[14],A=r[15];if(i[0].setComponents(c-a,f-h,m-p,A-y).normalize(),i[1].setComponents(c+a,f+h,m+p,A+y).normalize(),i[2].setComponents(c+o,f+d,m+_,A+b).normalize(),i[3].setComponents(c-o,f-d,m-_,A-b).normalize(),n)i[4].setComponents(l,u,g,x).normalize(),i[5].setComponents(c-l,f-u,m-g,A-x).normalize();else if(i[4].setComponents(c-l,f-u,m-g,A-x).normalize(),t===Un)i[5].setComponents(c+l,f+u,m+g,A+x).normalize();else if(t===hs)i[5].setComponents(l,u,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Rs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Rs)}intersectsSprite(e){Rs.center.set(0,0,0);let t=t_.distanceTo(e.center);return Rs.radius=.7071067811865476+t,Rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Rs)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(Wc.x=i.normal.x>0?e.max.x:e.min.x,Wc.y=i.normal.y>0?e.max.y:e.min.y,Wc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Wc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Fp=new ct,Co=class s{constructor(){this.coordinateSystem=Un,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let i=0;i<t.length;i++){let r=t[i];Fp.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new bi),n[i].setFromProjectionMatrix(Fp,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let i=0;i<e._count;i++)t[i]===void 0&&(t[i]=new bi),t[i].copy(n[i]);return this._count=e._count,this}clone(){return new s().copy(this)}};function Md(s,e){return s-e}function n_(s,e){return s.z-e.z}function i_(s,e){return e.z-s.z}var Fd=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let r=this.pool,a=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});let o=r[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},In=new ct,s_=new ze(1,1,1),r_=new bi,a_=new Co,Xc=new Vt,Cs=new kt,so=new E,Op=new E,o_=new E,bd=new Fd,_n=new Ot,Yc=[];function l_(s,e,t=0){let n=e.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==e.array.constructor){let i=s.count;for(let r=0;r<i;r++)for(let a=0;a<n;a++)e.setComponent(r+t,a,s.getComponent(r,a))}else e.array.set(s.array,t*n);e.needsUpdate=!0}function Ps(s,e){if(s.constructor!==e.constructor){let t=Math.min(s.length,e.length);for(let n=0;n<t;n++)e[n]=s[n]}else{let t=Math.min(s.length,e.length);e.set(new s.constructor(s.buffer,0,t))}}var Po=class extends Ot{constructor(e,t,n=t*2,i){super(new pt,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawBytesPerElement=1,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4),n=new An(t,e,e,yn,xn);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Uint32Array(e*e),n=new An(t,e,e,Ca,Gn);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Float32Array(e*e*4).fill(1),n=new An(t,e,e,yn,xn);n.colorSpace=Mt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){let t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(let r in e.attributes){let a=e.getAttribute(r),{array:o,itemSize:l,normalized:c}=a,h=new o.constructor(n*l),d=new Nt(h,l,c);t.setAttribute(r,d)}if(e.getIndex()!==null){let r=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Nt(r,1))}this._geometryInitialized=!0}}_validateGeometry(e){let t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(let n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let i=e.getAttribute(n),r=t.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){let t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){let t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vt);let e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let r=t[n].geometryIndex;this.getMatrixAt(n,In),this.getBoundingBoxAt(r,Xc).applyMatrix4(In),e.union(Xc)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new kt);let e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let r=t[n].geometryIndex;this.getMatrixAt(n,In),this.getBoundingSphereAt(r,Cs).applyMatrix4(In),e.union(Cs)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");let n={visible:!0,active:!0,geometryIndex:e},i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(Md),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));let r=this._matricesTexture;In.identity().toArray(r.image.data,i*16),r.needsUpdate=!0;let a=this._colorsTexture;return a&&(s_.toArray(a.image.data,i*4),a.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);let i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;let a=e.getIndex();if(a!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?a.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let l;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(Md),l=this._availableGeometryIds.shift(),r[l]=i):(l=this._geometryCount,this._geometryCount++,r.push(i)),this.setGeometryAt(l,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,l}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);let n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),a=t.getIndex(),o=this._geometryInfo[e];if(i&&a.count>o.reservedIndexCount||t.attributes.position.count>o.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");let l=o.vertexStart,c=o.reservedVertexCount;o.vertexCount=t.getAttribute("position").count;for(let h in n.attributes){let d=t.getAttribute(h),u=n.getAttribute(h);l_(d,u,l);let f=d.itemSize;for(let p=d.count,_=c;p<_;p++){let g=l+p;for(let m=0;m<f;m++)u.setComponent(g,m,0)}u.needsUpdate=!0,u.addUpdateRange(l*f,c*f)}if(i){let h=o.indexStart,d=o.reservedIndexCount;o.indexCount=t.getIndex().count;for(let u=0;u<a.count;u++)r.setX(h+u,l+a.getX(u));for(let u=a.count,f=d;u<f;u++)r.setX(h+u,l);r.needsUpdate=!0,r.addUpdateRange(h,o.reservedIndexCount)}return o.start=i?o.indexStart:o.vertexStart,o.count=i?o.indexCount:o.vertexCount,o.boundingBox=null,t.boundingBox!==null&&(o.boundingBox=t.boundingBox.clone()),o.boundingSphere=null,t.boundingSphere!==null&&(o.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){let t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;let n=this._instanceInfo;for(let i=0,r=n.length;i<r;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0,n=this._geometryInfo,i=n.map((a,o)=>o).sort((a,o)=>n[a].vertexStart-n[o].vertexStart),r=this.geometry;for(let a=0,o=n.length;a<o;a++){let l=i[a],c=n[l];if(c.active!==!1){if(r.index!==null){if(c.indexStart!==t){let{indexStart:h,vertexStart:d,reservedIndexCount:u}=c,f=r.index,p=f.array,_=e-d;for(let g=h;g<h+u;g++)p[g]=p[g]+_;f.array.copyWithin(t,h,h+u),f.addUpdateRange(t,u),f.needsUpdate=!0,c.indexStart=t}t+=c.reservedIndexCount}if(c.vertexStart!==e){let{vertexStart:h,reservedVertexCount:d}=c,u=r.attributes;for(let f in u){let p=u[f],{array:_,itemSize:g}=p;_.copyWithin(e*g,h*g,(h+d)*g),p.addUpdateRange(e*g,d*g),p.needsUpdate=!0}c.vertexStart=e}e+=c.reservedVertexCount,c.start=r.index?c.indexStart:c.vertexStart}}return this._nextIndexStart=t,this._nextVertexStart=e,this._visibilityChanged=!0,this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){let r=new Vt,a=n.index,o=n.attributes.position;for(let l=i.start,c=i.start+i.count;l<c;l++){let h=l;a&&(h=a.getX(h)),r.expandByPoint(so.fromBufferAttribute(o,h))}i.boundingBox=r}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){let r=new kt;this.getBoundingBoxAt(e,Xc),Xc.getCenter(r.center);let a=n.index,o=n.attributes.position,l=0;for(let c=i.start,h=i.start+i.count;c<h;c++){let d=c;a&&(d=a.getX(d)),so.fromBufferAttribute(o,d),l=Math.max(l,r.center.distanceToSquared(so))}r.radius=Math.sqrt(l),i.boundingSphere=r}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);let n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null?t.isVector4?t.set(1,1,1,1):t.setRGB(1,1,1):t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this._visibilityChanged=!0,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);let n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){let t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(Md);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`THREE.BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);let i=new Int32Array(e),r=new Int32Array(e);Ps(this._multiDrawCounts,i),Ps(this._multiDrawStarts,r),this._multiDrawCounts=i,this._multiDrawStarts=r,this._maxInstanceCount=e;let a=this._indirectTexture,o=this._matricesTexture,l=this._colorsTexture;a.dispose(),this._initIndirectTexture(),Ps(a.image.data,this._indirectTexture.image.data),o.dispose(),this._initMatricesTexture(),Ps(o.image.data,this._matricesTexture.image.data),l&&(l.dispose(),this._initColorsTexture(),Ps(l.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){let n=[...this._geometryInfo].filter(o=>o.active);if(Math.max(...n.map(o=>o.vertexStart+o.reservedVertexCount))>e)throw new Error(`THREE.BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(l=>l.indexStart+l.reservedIndexCount))>t)throw new Error(`THREE.BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);let r=this.geometry;r.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new pt,this._initializeGeometry(r));let a=this.geometry;r.index&&Ps(r.index.array,a.index.array);for(let o in r.attributes)Ps(r.attributes[o].array,a.attributes[o].array)}raycast(e,t){let n=this._instanceInfo,i=this._geometryInfo,r=this.matrixWorld,a=this.geometry;_n.material=this.material,_n.geometry.index=a.index,_n.geometry.attributes=a.attributes,_n.geometry.boundingBox===null&&(_n.geometry.boundingBox=new Vt),_n.geometry.boundingSphere===null&&(_n.geometry.boundingSphere=new kt);for(let o=0,l=n.length;o<l;o++){if(!n[o].visible||!n[o].active)continue;let c=n[o].geometryIndex,h=i[c];_n.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(o,_n.matrixWorld).premultiply(r),this.getBoundingBoxAt(c,_n.geometry.boundingBox),this.getBoundingSphereAt(c,_n.geometry.boundingSphere),_n.raycast(e,Yc);for(let d=0,u=Yc.length;d<u;d++){let f=Yc[d];f.object=this,f.batchId=o,t.push(f)}Yc.length=0}_n.material=null,_n.geometry.index=null,_n.geometry.attributes={},_n.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._multiDrawBytesPerElement=e._multiDrawBytesPerElement,this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){super.dispose(),this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let a=i.getIndex(),o=a===null?1:a.array.BYTES_PER_ELEMENT,l=1;r.wireframe&&(l=2,o=i.attributes.position.count>65535?4:2);let c=this._instanceInfo,h=this._multiDrawStarts,d=this._multiDrawCounts,u=this._geometryInfo,f=this.perObjectFrustumCulled,p=this._indirectTexture,_=p.image.data,g=n.isArrayCamera?a_:r_;f&&(n.isArrayCamera?g.setFromArrayCamera(n):(In.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),g.setFromProjectionMatrix(In,n.coordinateSystem,n.reversedDepth)));let m=0;if(this.sortObjects){In.copy(this.matrixWorld).invert(),so.setFromMatrixPosition(n.matrixWorld).applyMatrix4(In),Op.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(In);for(let x=0,A=c.length;x<A;x++)if(c[x].visible&&c[x].active){let T=c[x].geometryIndex;this.getMatrixAt(x,In),this.getBoundingSphereAt(T,Cs).applyMatrix4(In);let P=!1;if(f&&(P=!g.intersectsSphere(Cs)),!P){let v=u[T],R=o_.subVectors(Cs.center,so).dot(Op);bd.push(v.start,v.count,R,x)}}let y=bd.list,b=this.customSort;b===null?y.sort(r.transparent?i_:n_):b.call(this,y,n);for(let x=0,A=y.length;x<A;x++){let T=y[x];h[m]=T.start*o*l,d[m]=T.count*l,_[m]=T.index,m++}bd.reset()}else for(let y=0,b=c.length;y<b;y++)if(c[y].visible&&c[y].active){let x=c[y].geometryIndex,A=!1;if(f&&(this.getMatrixAt(y,In),this.getBoundingSphereAt(x,Cs).applyMatrix4(In),A=!g.intersectsSphere(Cs)),!A){let T=u[x];h[m]=T.start*o*l,d[m]=T.count*l,_[m]=y,m++}}p.needsUpdate=!0,this._multiDrawCount=m,this._multiDrawBytesPerElement=o,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,r,a){this.onBeforeRender(e,null,i,r,a)}},jt=class extends $t{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},bh=new E,Eh=new E,Bp=new ct,ro=new ci,qc=new kt,Ed=new E,zp=new E,hi=class extends Ct{constructor(e=new pt,t=new jt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)bh.fromBufferAttribute(t,i-1),Eh.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=bh.distanceTo(Eh);e.setAttribute("lineDistance",new ke(n,1))}else Pe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qc.copy(n.boundingSphere),qc.applyMatrix4(i),qc.radius+=r,e.ray.intersectsSphere(qc)===!1)return;Bp.copy(i).invert(),ro.copy(e.ray).applyMatrix4(Bp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let f=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=c){let m=h.getX(_),y=h.getX(_+1),b=Zc(this,e,ro,l,m,y,_);b&&t.push(b)}if(this.isLineLoop){let _=h.getX(p-1),g=h.getX(f),m=Zc(this,e,ro,l,_,g,p-1);m&&t.push(m)}}else{let f=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let _=f,g=p-1;_<g;_+=c){let m=Zc(this,e,ro,l,_,_+1,_);m&&t.push(m)}if(this.isLineLoop){let _=Zc(this,e,ro,l,p-1,f,p-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Zc(s,e,t,n,i,r,a){let o=s.geometry.attributes.position;if(bh.fromBufferAttribute(o,i),Eh.fromBufferAttribute(o,r),t.distanceSqToSegment(bh,Eh,Ed,zp)>n)return;Ed.applyMatrix4(s.matrixWorld);let c=e.ray.origin.distanceTo(Ed);if(!(c<e.near||c>e.far))return{distance:c,point:zp.clone().applyMatrix4(s.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:s}}var Vp=new E,kp=new E,Rn=class extends hi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Vp.fromBufferAttribute(t,i),kp.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Vp.distanceTo(kp);e.setAttribute("lineDistance",new ke(n,1))}else Pe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Io=class extends hi{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Qr=class extends $t{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Hp=new ct,Od=new ci,Jc=new kt,Kc=new E,Lo=class extends Ct{constructor(e=new pt,t=new Qr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jc.copy(n.boundingSphere),Jc.applyMatrix4(i),Jc.radius+=r,e.ray.intersectsSphere(Jc)===!1)return;Hp.copy(i).invert(),Od.copy(e.ray).applyMatrix4(Hp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){let u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=u,_=f;p<_;p++){let g=c.getX(p);Kc.fromBufferAttribute(d,g),Gp(Kc,g,l,i,e,t,this)}}else{let u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let p=u,_=f;p<_;p++)Kc.fromBufferAttribute(d,p),Gp(Kc,p,l,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){let o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Gp(s,e,t,n,i,r,a){let o=Od.distanceSqToPoint(s);if(o<t){let l=new E;Od.closestPointToPoint(s,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var Do=class extends qt{constructor(e,t,n,i,r=Bt,a=Bt,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;let h=this;function d(){h.needsUpdate=!0,h._requestVideoFrameCallbackId=e.requestVideoFrameCallback(d)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(d))}clone(){return new this.constructor(this.image).copy(this)}update(){let e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&(this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),this._requestVideoFrameCallbackId=0),super.dispose()}},wh=class extends Do{constructor(e,t,n,i,r,a,o,l){super({},e,t,n,i,r,a,o,l),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(e){this.image=e,this.needsUpdate=!0}},Th=class extends qt{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=Yt,this.minFilter=Yt,this.generateMipmaps=!1,this.needsUpdate=!0}},Zs=class extends qt{constructor(e,t,n,i,r,a,o,l,c,h,d,u){super(null,a,o,l,c,h,i,r,d,u),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}},Ah=class extends Zs{constructor(e,t,n,i,r,a){super(e,t,n,r,a),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Tn,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Rh=class extends Zs{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,xi),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}},fs=class extends qt{constructor(e=[],t=xi,n,i,r,a,o,l,c,h){super(e,t,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ea=class extends qt{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Ch=class extends qt{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isHTMLTexture=!0,this.generateMipmaps=!1,this.needsUpdate=!0;let h=e?e.parentNode:null;h!==null&&"requestPaint"in h&&(h.onpaint=()=>{this.needsUpdate=!0},h.requestPaint())}dispose(){let e=this.image?this.image.parentNode:null;e!==null&&"onpaint"in e&&(e.onpaint=null),super.dispose()}},Hi=class extends qt{constructor(e,t,n=Gn,i,r,a,o=Yt,l=Yt,c,h=li,d=1){if(h!==li&&h!==$i)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:d};super(u,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new qn(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Uo=class extends Hi{constructor(e,t=Gn,n=xi,i,r,a=Yt,o=Yt,l,c=li){let h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,i,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ta=class extends qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Fn=class s extends pt{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};let o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],d=[],u=0,f=0;p("z","y","x",-1,-1,n,t,e,a,r,0),p("z","y","x",1,-1,n,t,-e,a,r,1),p("x","z","y",1,1,e,n,t,i,a,2),p("x","z","y",1,-1,e,n,-t,i,a,3),p("x","y","z",1,-1,e,t,n,i,r,4),p("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ke(c,3)),this.setAttribute("normal",new ke(h,3)),this.setAttribute("uv",new ke(d,2));function p(_,g,m,y,b,x,A,T,P,v,R){let L=x/P,N=A/v,V=x/2,X=A/2,O=T/2,G=P+1,Y=v+1,k=0,re=0,K=new E;for(let te=0;te<Y;te++){let Q=te*N-X;for(let Ve=0;Ve<G;Ve++){let Me=Ve*L-V;K[_]=Me*y,K[g]=Q*b,K[m]=O,c.push(K.x,K.y,K.z),K[_]=0,K[g]=0,K[m]=T>0?1:-1,h.push(K.x,K.y,K.z),d.push(Ve/P),d.push(1-te/v),k+=1}}for(let te=0;te<v;te++)for(let Q=0;Q<P;Q++){let Ve=u+Q+G*te,Me=u+Q+G*(te+1),bt=u+(Q+1)+G*(te+1),it=u+(Q+1)+G*te;l.push(Ve,Me,it),l.push(Me,bt,it),re+=6}o.addGroup(f,re,R),f+=re,u+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},No=class s extends pt{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=t/2,d=Math.PI/2*e,u=t,f=2*d+u,p=n*2+r,_=i+1,g=new E,m=new E;for(let y=0;y<=p;y++){let b=0,x=0,A=0,T=0;if(y<=n){let R=y/n,L=R*Math.PI/2;x=-h-e*Math.cos(L),A=e*Math.sin(L),T=-e*Math.cos(L),b=R*d}else if(y<=n+r){let R=(y-n)/r;x=-h+R*t,A=e,T=0,b=d+R*u}else{let R=(y-n-r)/n,L=R*Math.PI/2;x=h+e*Math.sin(L),A=e*Math.cos(L),T=e*Math.sin(L),b=d+u+R*d}let P=Math.max(0,Math.min(1,b/f)),v=0;y===0?v=.5/i:y===p&&(v=-.5/i);for(let R=0;R<=i;R++){let L=R/i,N=L*Math.PI*2,V=Math.sin(N),X=Math.cos(N);m.x=-A*X,m.y=x,m.z=A*V,o.push(m.x,m.y,m.z),g.set(-A*X,T,A*V),g.normalize(),l.push(g.x,g.y,g.z),c.push(L+v,P)}if(y>0){let R=(y-1)*_;for(let L=0;L<i;L++){let N=R+L,V=R+L+1,X=y*_+L,O=y*_+L+1;a.push(N,V,X),a.push(V,O,X)}}}this.setIndex(a),this.setAttribute("position",new ke(o,3)),this.setAttribute("normal",new ke(l,3)),this.setAttribute("uv",new ke(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Gi=class s extends pt{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],a=[],o=[],l=[],c=new E,h=new ce;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){let f=n+d/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,l.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ke(a,3)),this.setAttribute("normal",new ke(o,3)),this.setAttribute("uv",new ke(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},zt=class s extends pt{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),r=Math.floor(r);let h=[],d=[],u=[],f=[],p=0,_=[],g=n/2,m=0;y(),a===!1&&(e>0&&b(!0),t>0&&b(!1)),this.setIndex(h),this.setAttribute("position",new ke(d,3)),this.setAttribute("normal",new ke(u,3)),this.setAttribute("uv",new ke(f,2));function y(){let x=new E,A=new E,T=0,P=(t-e)/n;for(let v=0;v<=r;v++){let R=[],L=v/r,N=L*(t-e)+e;for(let V=0;V<=i;V++){let X=V/i,O=X*l+o,G=Math.sin(O),Y=Math.cos(O);A.x=N*G,A.y=-L*n+g,A.z=N*Y,d.push(A.x,A.y,A.z),x.set(G,P,Y).normalize(),u.push(x.x,x.y,x.z),f.push(X,1-L),R.push(p++)}_.push(R)}for(let v=0;v<i;v++)for(let R=0;R<r;R++){let L=_[R][v],N=_[R+1][v],V=_[R+1][v+1],X=_[R][v+1];(e>0||R!==0)&&(h.push(L,N,X),T+=3),(t>0||R!==r-1)&&(h.push(N,V,X),T+=3)}c.addGroup(m,T,0),m+=T}function b(x){let A=p,T=new ce,P=new E,v=0,R=x===!0?e:t,L=x===!0?1:-1;for(let V=1;V<=i;V++)d.push(0,g*L,0),u.push(0,L,0),f.push(.5,.5),p++;let N=p;for(let V=0;V<=i;V++){let O=V/i*l+o,G=Math.cos(O),Y=Math.sin(O);P.x=R*Y,P.y=g*L,P.z=R*G,d.push(P.x,P.y,P.z),u.push(0,L,0),T.x=G*.5+.5,T.y=Y*.5*L+.5,f.push(T.x,T.y),p++}for(let V=0;V<i;V++){let X=A+V,O=N+V;x===!0?h.push(O,O+1,X):h.push(O+1,O,X),v+=3}c.addGroup(m,v,x===!0?1:2),m+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},na=class s extends zt{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Wi=class s extends pt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new ke(r,3)),this.setAttribute("normal",new ke(r.slice(),3)),this.setAttribute("uv",new ke(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(y){let b=new E,x=new E,A=new E;for(let T=0;T<t.length;T+=3)f(t[T+0],b),f(t[T+1],x),f(t[T+2],A),l(b,x,A,y)}function l(y,b,x,A){let T=A+1,P=[];for(let v=0;v<=T;v++){P[v]=[];let R=y.clone().lerp(x,v/T),L=b.clone().lerp(x,v/T),N=T-v;for(let V=0;V<=N;V++)V===0&&v===T?P[v][V]=R:P[v][V]=R.clone().lerp(L,V/N)}for(let v=0;v<T;v++)for(let R=0;R<2*(T-v)-1;R++){let L=Math.floor(R/2);R%2===0?(u(P[v][L+1]),u(P[v+1][L]),u(P[v][L])):(u(P[v][L+1]),u(P[v+1][L+1]),u(P[v+1][L]))}}function c(y){let b=new E;for(let x=0;x<r.length;x+=3)b.x=r[x+0],b.y=r[x+1],b.z=r[x+2],b.normalize().multiplyScalar(y),r[x+0]=b.x,r[x+1]=b.y,r[x+2]=b.z}function h(){let y=new E;for(let b=0;b<r.length;b+=3){y.x=r[b+0],y.y=r[b+1],y.z=r[b+2];let x=g(y)/2/Math.PI+.5,A=m(y)/Math.PI+.5;a.push(x,1-A)}p(),d()}function d(){for(let y=0;y<a.length;y+=6){let b=a[y+0],x=a[y+2],A=a[y+4],T=Math.max(b,x,A),P=Math.min(b,x,A);T>.9&&P<.1&&(b<.2&&(a[y+0]+=1),x<.2&&(a[y+2]+=1),A<.2&&(a[y+4]+=1))}}function u(y){r.push(y.x,y.y,y.z)}function f(y,b){let x=y*3;b.x=e[x+0],b.y=e[x+1],b.z=e[x+2]}function p(){let y=new E,b=new E,x=new E,A=new E,T=new ce,P=new ce,v=new ce;for(let R=0,L=0;R<r.length;R+=9,L+=6){y.set(r[R+0],r[R+1],r[R+2]),b.set(r[R+3],r[R+4],r[R+5]),x.set(r[R+6],r[R+7],r[R+8]),T.set(a[L+0],a[L+1]),P.set(a[L+2],a[L+3]),v.set(a[L+4],a[L+5]),A.copy(y).add(b).add(x).divideScalar(3);let N=g(A);_(T,L+0,y,N),_(P,L+2,b,N),_(v,L+4,x,N)}}function _(y,b,x,A){A<0&&y.x===1&&(a[b]=y.x-1),x.x===0&&x.z===0&&(a[b]=A/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.detail)}},Fo=class s extends Wi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},$c=new E,jc=new E,wd=new E,Qc=new ai,Js=class extends pt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),r=Math.cos(Os*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let p=0;p<l;p+=3){a?(c[0]=a.getX(p),c[1]=a.getX(p+1),c[2]=a.getX(p+2)):(c[0]=p,c[1]=p+1,c[2]=p+2);let{a:_,b:g,c:m}=Qc;if(_.fromBufferAttribute(o,c[0]),g.fromBufferAttribute(o,c[1]),m.fromBufferAttribute(o,c[2]),Qc.getNormal(wd),d[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,d[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,d[2]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let y=0;y<3;y++){let b=(y+1)%3,x=d[y],A=d[b],T=Qc[h[y]],P=Qc[h[b]],v=`${x}_${A}`,R=`${A}_${x}`;R in u&&u[R]?(wd.dot(u[R].normal)<=r&&(f.push(T.x,T.y,T.z),f.push(P.x,P.y,P.z)),u[R]=null):v in u||(u[v]={index0:c[y],index1:c[b],normal:wd.clone()})}}for(let p in u)if(u[p]){let{index0:_,index1:g}=u[p];$c.fromBufferAttribute(o,_),jc.fromBufferAttribute(o,g),f.push($c.x,$c.y,$c.z),f.push(jc.x,jc.y,jc.z)}this.setAttribute("position",new ke(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},On=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Pe("Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,a;t?a=t:a=e*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);let h=n[i],u=n[i+1]-h,f=(a-h)/u;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let a=this.getPoint(i),o=this.getPoint(r),l=t||(a.isVector2?new ce:new E);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new E,i=[],r=[],a=[],o=new E,l=new ct;for(let f=0;f<=e;f++){let p=f/e;i[f]=this.getTangentAt(p,new E)}r[0]=new E,a[0]=new E;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();let p=Math.acos(ht(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,p))}a[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(ht(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let p=1;p<=e;p++)r[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),a[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ks=class extends On{constructor(e=0,t=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ce){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);let o=this.aStartAngle+e*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Oo=class extends Ks{constructor(e,t,n,i,r,a){super(e,t,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function Uf(){let s=0,e=0,t=0,n=0;function i(r,a,o,l){s=r,e=o,t=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,d){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+d)+(l-o)/d;u*=h,f*=h,i(a,o,u,f)},calc:function(r){let a=r*r,o=a*r;return s+e*r+t*a+n*o}}}var Wp=new E,Xp=new E,Td=new Uf,Ad=new Uf,Rd=new Uf,ui=class extends On{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new E){let n=t,i=this.points,r=i.length,a=(r-(this.closed?0:1))*e,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(Xp.subVectors(i[0],i[1]).add(i[0]),c=Xp);let d=i[o%r],u=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(Wp.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Wp),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,p=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),p<1e-4&&(p=_),g<1e-4&&(g=_),Td.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,p,_,g),Ad.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,p,_,g),Rd.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,p,_,g)}else this.curveType==="catmullrom"&&(Td.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),Ad.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),Rd.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(Td.calc(l),Ad.calc(l),Rd.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new E().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Yp(s,e,t,n,i){let r=(n-e)*.5,a=(i-t)*.5,o=s*s,l=s*o;return(2*t-2*n+r+a)*l+(-3*t+3*n-2*r-a)*o+r*s+t}function c_(s,e){let t=1-s;return t*t*e}function h_(s,e){return 2*(1-s)*s*e}function u_(s,e){return s*s*e}function uo(s,e,t,n){return c_(s,e)+h_(s,t)+u_(s,n)}function d_(s,e){let t=1-s;return t*t*t*e}function f_(s,e){let t=1-s;return 3*t*t*s*e}function p_(s,e){return 3*(1-s)*s*s*e}function m_(s,e){return s*s*s*e}function fo(s,e,t,n,i){return d_(s,e)+f_(s,t)+p_(s,n)+m_(s,i)}var ia=class extends On{constructor(e=new ce,t=new ce,n=new ce,i=new ce){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ce){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(fo(e,i.x,r.x,a.x,o.x),fo(e,i.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Bo=class extends On{constructor(e=new E,t=new E,n=new E,i=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new E){let n=t,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(fo(e,i.x,r.x,a.x,o.x),fo(e,i.y,r.y,a.y,o.y),fo(e,i.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},sa=class extends On{constructor(e=new ce,t=new ce){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ce){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ce){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ps=class extends On{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ra=class extends On{constructor(e=new ce,t=new ce,n=new ce){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ce){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(uo(e,i.x,r.x,a.x),uo(e,i.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ms=class extends On{constructor(e=new E,t=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new E){let n=t,i=this.v0,r=this.v1,a=this.v2;return n.set(uo(e,i.x,r.x,a.x),uo(e,i.y,r.y,a.y),uo(e,i.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},aa=class extends On{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ce){let n=t,i=this.points,r=(i.length-1)*e,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],d=i[a>i.length-3?i.length-1:a+2];return n.set(Yp(o,l.x,c.x,h.x,d.x),Yp(o,l.y,c.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ce().fromArray(i))}return this}},Ph=Object.freeze({__proto__:null,ArcCurve:Oo,CatmullRomCurve3:ui,CubicBezierCurve:ia,CubicBezierCurve3:Bo,EllipseCurve:Ks,LineCurve:sa,LineCurve3:ps,QuadraticBezierCurve:ra,QuadraticBezierCurve3:ms,SplineCurve:aa}),$s=class extends On{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ph[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let a=i[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let a=r[i],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Ph[i.type]().fromJSON(i))}return this}},gs=class extends $s{constructor(e){super(),this.type="Path",this.currentPoint=new ce,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new sa(this.currentPoint.clone(),new ce(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new ra(this.currentPoint.clone(),new ce(e,t),new ce(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,a){let o=new ia(this.currentPoint.clone(),new ce(e,t),new ce(n,i),new ce(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new aa(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,r,a),this}absarc(e,t,n,i,r,a){return this.absellipse(e,t,n,n,i,r,a),this}ellipse(e,t,n,i,r,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,r,a,o,l),this}absellipse(e,t,n,i,r,a,o,l){let c=new Ks(e,t,n,i,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},_s=class extends gs{constructor(e){super(e),this.uuid=kn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new gs().fromJSON(i))}return this}};function g_(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=vg(s,0,i,t,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=S_(s,e,r,t)),s.length>80*t){o=s[0],l=s[1];let h=o,d=l;for(let u=t;u<i;u+=t){let f=s[u],p=s[u+1];f<o&&(o=f),p<l&&(l=p),f>h&&(h=f),p>d&&(d=p)}c=Math.max(h-o,d-l),c=c!==0?32767/c:0}return zo(r,a,t,o,l,c,0),a}function vg(s,e,t,n,i){let r;if(i===L_(s,e,t,n)>0)for(let a=e;a<t;a+=n)r=qp(a/n|0,s[a],s[a+1],r);else for(let a=t-n;a>=e;a-=n)r=qp(a/n|0,s[a],s[a+1],r);return r&&oa(r,r.next)&&(ko(r),r=r.next),r}function js(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(oa(t,t.next)||Gt(t.prev,t,t.next)===0)){if(ko(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function zo(s,e,t,n,i,r,a){if(!s)return;!a&&r&&T_(s,n,i,r);let o=s;for(;s.prev!==s.next;){let l=s.prev,c=s.next;if(r?x_(s,n,i,r):__(s)){e.push(l.i,s.i,c.i),ko(s),s=c.next,o=c.next;continue}if(s=c,s===o){a?a===1?(s=y_(js(s),e),zo(s,e,t,n,i,r,2)):a===2&&v_(s,e,t,n,i,r):zo(js(s),e,t,n,i,r,1);break}}}function __(s){let e=s.prev,t=s,n=s.next;if(Gt(e,t,n)>=0)return!1;let i=e.x,r=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=Math.min(i,r,a),d=Math.min(o,l,c),u=Math.max(i,r,a),f=Math.max(o,l,c),p=n.next;for(;p!==e;){if(p.x>=h&&p.x<=u&&p.y>=d&&p.y<=f&&oo(i,o,r,l,a,c,p.x,p.y)&&Gt(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function x_(s,e,t,n){let i=s.prev,r=s,a=s.next;if(Gt(i,r,a)>=0)return!1;let o=i.x,l=r.x,c=a.x,h=i.y,d=r.y,u=a.y,f=Math.min(o,l,c),p=Math.min(h,d,u),_=Math.max(o,l,c),g=Math.max(h,d,u),m=Bd(f,p,e,t,n),y=Bd(_,g,e,t,n),b=s.prevZ,x=s.nextZ;for(;b&&b.z>=m&&x&&x.z<=y;){if(b.x>=f&&b.x<=_&&b.y>=p&&b.y<=g&&b!==i&&b!==a&&oo(o,h,l,d,c,u,b.x,b.y)&&Gt(b.prev,b,b.next)>=0||(b=b.prevZ,x.x>=f&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==a&&oo(o,h,l,d,c,u,x.x,x.y)&&Gt(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;b&&b.z>=m;){if(b.x>=f&&b.x<=_&&b.y>=p&&b.y<=g&&b!==i&&b!==a&&oo(o,h,l,d,c,u,b.x,b.y)&&Gt(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;x&&x.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=p&&x.y<=g&&x!==i&&x!==a&&oo(o,h,l,d,c,u,x.x,x.y)&&Gt(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function y_(s,e){let t=s;do{let n=t.prev,i=t.next.next;!oa(n,i)&&Mg(n,t,t.next,i)&&Vo(n,i)&&Vo(i,n)&&(e.push(n.i,t.i,i.i),ko(t),ko(t.next),t=s=i),t=t.next}while(t!==s);return js(t)}function v_(s,e,t,n,i,r){let a=s;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&C_(a,o)){let l=bg(a,o);a=js(a,a.next),l=js(l,l.next),zo(a,e,t,n,i,r,0),zo(l,e,t,n,i,r,0);return}o=o.next}a=a.next}while(a!==s)}function S_(s,e,t,n){let i=[];for(let r=0,a=e.length;r<a;r++){let o=e[r]*n,l=r<a-1?e[r+1]*n:s.length,c=vg(s,o,l,n,!1);c===c.next&&(c.steiner=!0),i.push(R_(c))}i.sort(M_);for(let r=0;r<i.length;r++)t=b_(i[r],t);return t}function M_(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function b_(s,e){let t=E_(s,e);if(!t)return e;let n=bg(t,s);return js(n,n.next),js(t,t.next)}function E_(s,e){let t=e,n=s.x,i=s.y,r=-1/0,a;if(oa(s,t))return t;do{if(oa(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let d=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=n&&d>r&&(r=d,a=t.x<t.next.x?t:t.next,d===n))return a}t=t.next}while(t!==e);if(!a)return null;let o=a,l=a.x,c=a.y,h=1/0;t=a;do{if(n>=t.x&&t.x>=l&&n!==t.x&&Sg(i<c?n:r,i,l,c,i<c?r:n,i,t.x,t.y)){let d=Math.abs(i-t.y)/(n-t.x);Vo(t,s)&&(d<h||d===h&&(t.x>a.x||t.x===a.x&&w_(a,t)))&&(a=t,h=d)}t=t.next}while(t!==o);return a}function w_(s,e){return Gt(s.prev,s,e.prev)<0&&Gt(e.next,s,s.next)<0}function T_(s,e,t,n){let i=s;do i.z===0&&(i.z=Bd(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,A_(i)}function A_(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let a=n,o=0;for(let c=0;c<t&&(o++,a=a.nextZ,!!a);c++);let l=t;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(i=n,n=n.nextZ,o--):(i=a,a=a.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=a}r.nextZ=null,t*=2}while(e>1);return s}function Bd(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function R_(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Sg(s,e,t,n,i,r,a,o){return(i-a)*(e-o)>=(s-a)*(r-o)&&(s-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(i-a)*(n-o)}function oo(s,e,t,n,i,r,a,o){return!(s===a&&e===o)&&Sg(s,e,t,n,i,r,a,o)}function C_(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!P_(s,e)&&(Vo(s,e)&&Vo(e,s)&&I_(s,e)&&(Gt(s.prev,s,e.prev)||Gt(s,e.prev,e))||oa(s,e)&&Gt(s.prev,s,s.next)>0&&Gt(e.prev,e,e.next)>0)}function Gt(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function oa(s,e){return s.x===e.x&&s.y===e.y}function Mg(s,e,t,n){let i=th(Gt(s,e,t)),r=th(Gt(s,e,n)),a=th(Gt(t,n,s)),o=th(Gt(t,n,e));return!!(i!==r&&a!==o||i===0&&eh(s,t,e)||r===0&&eh(s,n,e)||a===0&&eh(t,s,n)||o===0&&eh(t,e,n))}function eh(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function th(s){return s>0?1:s<0?-1:0}function P_(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&Mg(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function Vo(s,e){return Gt(s.prev,s,s.next)<0?Gt(s,e,s.next)>=0&&Gt(s,s.prev,e)>=0:Gt(s,e,s.prev)<0||Gt(s,s.next,e)<0}function I_(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function bg(s,e){let t=zd(s.i,s.x,s.y),n=zd(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function qp(s,e,t,n){let i=zd(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ko(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function zd(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function L_(s,e,t,n){let i=0;for(let r=e,a=t-n;r<t;r+=n)i+=(s[a]-s[r])*(s[r+1]+s[a+1]),a=r;return i}var Vd=class{static triangulate(e,t,n=2){return g_(e,t,n)}},Zn=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];Zp(e),Jp(n,e);let a=e.length;t.forEach(Zp);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,Jp(n,t[l]);let o=Vd.triangulate(n,i);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function Zp(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Jp(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}var Ho=class s extends pt{constructor(e=new _s([new ce(.5,.5),new ce(-.5,.5),new ce(-.5,-.5),new ce(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],r=[];for(let o=0,l=e.length;o<l;o++){let c=e[o];a(c)}this.setAttribute("position",new ke(i,3)),this.setAttribute("uv",new ke(r,2)),this.computeVertexNormals();function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1,u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,p=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,m=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:D_,b,x=!1,A,T,P,v;if(m){b=m.getSpacedPoints(h),x=!0,u=!1;let oe=m.isCatmullRomCurve3?m.closed:!1;A=m.computeFrenetFrames(h,oe),T=new E,P=new E,v=new E}u||(g=0,f=0,p=0,_=0);let R=o.extractPoints(c),L=R.shape,N=R.holes;if(!Zn.isClockWise(L)){L=L.reverse();for(let oe=0,me=N.length;oe<me;oe++){let pe=N[oe];Zn.isClockWise(pe)&&(N[oe]=pe.reverse())}}function X(oe){let pe=10000000000000001e-36,ge=oe[0];for(let Ee=1;Ee<=oe.length;Ee++){let ot=Ee%oe.length,et=oe[ot],st=et.x-ge.x,nt=et.y-ge.y,F=st*st+nt*nt,At=Math.max(Math.abs(et.x),Math.abs(et.y),Math.abs(ge.x),Math.abs(ge.y)),ft=pe*At*At;if(F<=ft){oe.splice(ot,1),Ee--;continue}ge=et}}X(L),N.forEach(X);let O=N.length,G=L;for(let oe=0;oe<O;oe++){let me=N[oe];L=L.concat(me)}function Y(oe,me,pe){return me||$e("ExtrudeGeometry: vec does not exist"),oe.clone().addScaledVector(me,pe)}let k=L.length;function re(oe,me,pe){let ge,Ee,ot,et=oe.x-me.x,st=oe.y-me.y,nt=pe.x-oe.x,F=pe.y-oe.y,At=et*et+st*st,ft=et*F-st*nt;if(Math.abs(ft)>Number.EPSILON){let C=Math.sqrt(At),S=Math.sqrt(nt*nt+F*F),H=me.x-st/C,q=me.y+et/C,se=pe.x-F/S,ve=pe.y+nt/S,Te=((se-H)*F-(ve-q)*nt)/(et*F-st*nt);ge=H+et*Te-oe.x,Ee=q+st*Te-oe.y;let W=ge*ge+Ee*Ee;if(W<=2)return new ce(ge,Ee);ot=Math.sqrt(W/2)}else{let C=!1;et>Number.EPSILON?nt>Number.EPSILON&&(C=!0):et<-Number.EPSILON?nt<-Number.EPSILON&&(C=!0):Math.sign(st)===Math.sign(F)&&(C=!0),C?(ge=-st,Ee=et,ot=Math.sqrt(At)):(ge=et,Ee=st,ot=Math.sqrt(At/2))}return new ce(ge/ot,Ee/ot)}let K=[];for(let oe=0,me=G.length,pe=me-1,ge=oe+1;oe<me;oe++,pe++,ge++)pe===me&&(pe=0),ge===me&&(ge=0),K[oe]=re(G[oe],G[pe],G[ge]);let te=[],Q,Ve=K.concat();for(let oe=0,me=O;oe<me;oe++){let pe=N[oe];Q=[];for(let ge=0,Ee=pe.length,ot=Ee-1,et=ge+1;ge<Ee;ge++,ot++,et++)ot===Ee&&(ot=0),et===Ee&&(et=0),Q[ge]=re(pe[ge],pe[ot],pe[et]);te.push(Q),Ve=Ve.concat(Q)}let Me;if(g===0)Me=Zn.triangulateShape(G,N);else{let oe=[],me=[];for(let pe=0;pe<g;pe++){let ge=pe/g,Ee=f*Math.cos(ge*Math.PI/2),ot=p*Math.sin(ge*Math.PI/2)+_;for(let et=0,st=G.length;et<st;et++){let nt=Y(G[et],K[et],ot);ye(nt.x,nt.y,-Ee),ge===0&&oe.push(nt)}for(let et=0,st=O;et<st;et++){let nt=N[et];Q=te[et];let F=[];for(let At=0,ft=nt.length;At<ft;At++){let C=Y(nt[At],Q[At],ot);ye(C.x,C.y,-Ee),ge===0&&F.push(C)}ge===0&&me.push(F)}}Me=Zn.triangulateShape(oe,me)}let bt=Me.length,it=p+_;for(let oe=0;oe<k;oe++){let me=u?Y(L[oe],Ve[oe],it):L[oe];x?(P.copy(A.normals[0]).multiplyScalar(me.x),T.copy(A.binormals[0]).multiplyScalar(me.y),v.copy(b[0]).add(P).add(T),ye(v.x,v.y,v.z)):ye(me.x,me.y,0)}for(let oe=1;oe<=h;oe++)for(let me=0;me<k;me++){let pe=u?Y(L[me],Ve[me],it):L[me];x?(P.copy(A.normals[oe]).multiplyScalar(pe.x),T.copy(A.binormals[oe]).multiplyScalar(pe.y),v.copy(b[oe]).add(P).add(T),ye(v.x,v.y,v.z)):ye(pe.x,pe.y,d/h*oe)}for(let oe=g-1;oe>=0;oe--){let me=oe/g,pe=f*Math.cos(me*Math.PI/2),ge=p*Math.sin(me*Math.PI/2)+_;for(let Ee=0,ot=G.length;Ee<ot;Ee++){let et=Y(G[Ee],K[Ee],ge);ye(et.x,et.y,d+pe)}for(let Ee=0,ot=N.length;Ee<ot;Ee++){let et=N[Ee];Q=te[Ee];for(let st=0,nt=et.length;st<nt;st++){let F=Y(et[st],Q[st],ge);x?ye(F.x,F.y+b[h-1].y,b[h-1].x+pe):ye(F.x,F.y,d+pe)}}}at(),ne();function at(){let oe=i.length/3;if(u){let me=0,pe=k*me;for(let ge=0;ge<bt;ge++){let Ee=Me[ge];Le(Ee[2]+pe,Ee[1]+pe,Ee[0]+pe)}me=h+g*2,pe=k*me;for(let ge=0;ge<bt;ge++){let Ee=Me[ge];Le(Ee[0]+pe,Ee[1]+pe,Ee[2]+pe)}}else{for(let me=0;me<bt;me++){let pe=Me[me];Le(pe[2],pe[1],pe[0])}for(let me=0;me<bt;me++){let pe=Me[me];Le(pe[0]+k*h,pe[1]+k*h,pe[2]+k*h)}}n.addGroup(oe,i.length/3-oe,0)}function ne(){let oe=i.length/3,me=0;he(G,me),me+=G.length;for(let pe=0,ge=N.length;pe<ge;pe++){let Ee=N[pe];he(Ee,me),me+=Ee.length}n.addGroup(oe,i.length/3-oe,1)}function he(oe,me){let pe=oe.length;for(;--pe>=0;){let ge=pe,Ee=pe-1;Ee<0&&(Ee=oe.length-1);for(let ot=0,et=h+g*2;ot<et;ot++){let st=k*ot,nt=k*(ot+1),F=me+ge+st,At=me+Ee+st,ft=me+Ee+nt,C=me+ge+nt;De(F,At,ft,C)}}}function ye(oe,me,pe){l.push(oe),l.push(me),l.push(pe)}function Le(oe,me,pe){Qe(oe),Qe(me),Qe(pe);let ge=i.length/3,Ee=y.generateTopUV(n,i,ge-3,ge-2,ge-1);tt(Ee[0]),tt(Ee[1]),tt(Ee[2])}function De(oe,me,pe,ge){Qe(oe),Qe(me),Qe(ge),Qe(me),Qe(pe),Qe(ge);let Ee=i.length/3,ot=y.generateSideWallUV(n,i,Ee-6,Ee-3,Ee-2,Ee-1);tt(ot[0]),tt(ot[1]),tt(ot[3]),tt(ot[1]),tt(ot[2]),tt(ot[3])}function Qe(oe){i.push(l[oe*3+0]),i.push(l[oe*3+1]),i.push(l[oe*3+2])}function tt(oe){r.push(oe.x),r.push(oe.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return U_(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,a=e.shapes.length;r<a;r++){let o=t[e.shapes[r]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Ph[i.type]().fromJSON(i)),new s(n,e.options)}},D_={generateTopUV:function(s,e,t,n,i){let r=e[t*3],a=e[t*3+1],o=e[n*3],l=e[n*3+1],c=e[i*3],h=e[i*3+1];return[new ce(r,a),new ce(o,l),new ce(c,h)]},generateSideWallUV:function(s,e,t,n,i,r){let a=e[t*3],o=e[t*3+1],l=e[t*3+2],c=e[n*3],h=e[n*3+1],d=e[n*3+2],u=e[i*3],f=e[i*3+1],p=e[i*3+2],_=e[r*3],g=e[r*3+1],m=e[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new ce(a,1-l),new ce(c,1-d),new ce(u,1-p),new ce(_,1-m)]:[new ce(o,1-l),new ce(h,1-d),new ce(f,1-p),new ce(g,1-m)]}};function U_(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Go=class s extends Wi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},Wo=class s extends pt{constructor(e=[new ce(0,-.5),new ce(.5,0),new ce(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=ht(i,0,Math.PI*2);let r=[],a=[],o=[],l=[],c=[],h=1/t,d=new E,u=new ce,f=new E,p=new E,_=new E,g=0,m=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:g=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,f.x=m*1,f.y=-g,f.z=m*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case e.length-1:l.push(_.x,_.y,_.z);break;default:g=e[y+1].x-e[y].x,m=e[y+1].y-e[y].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(p)}for(let y=0;y<=t;y++){let b=n+y*h*i,x=Math.sin(b),A=Math.cos(b);for(let T=0;T<=e.length-1;T++){d.x=e[T].x*x,d.y=e[T].y,d.z=e[T].x*A,a.push(d.x,d.y,d.z),u.x=y/t,u.y=T/(e.length-1),o.push(u.x,u.y);let P=l[3*T+0]*x,v=l[3*T+1],R=l[3*T+0]*A;c.push(P,v,R)}}for(let y=0;y<t;y++)for(let b=0;b<e.length-1;b++){let x=b+y*e.length,A=x,T=x+e.length,P=x+e.length+1,v=x+1;r.push(A,T,v),r.push(P,v,T)}this.setIndex(r),this.setAttribute("position",new ke(a,3)),this.setAttribute("uv",new ke(o,2)),this.setAttribute("normal",new ke(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}},la=class s extends Wi{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},di=class s extends pt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,d=e/o,u=t/l,f=[],p=[],_=[],g=[];for(let m=0;m<h;m++){let y=m*u-a;for(let b=0;b<c;b++){let x=b*d-r;p.push(x,-y,0),_.push(0,0,1),g.push(b/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<o;y++){let b=y+c*m,x=y+c*(m+1),A=y+1+c*(m+1),T=y+1+c*m;f.push(b,x,T),f.push(x,A,T)}this.setIndex(f),this.setAttribute("position",new ke(p,3)),this.setAttribute("normal",new ke(_,3)),this.setAttribute("uv",new ke(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},Xo=class s extends pt{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);let o=[],l=[],c=[],h=[],d=e,u=(t-e)/i,f=new E,p=new ce;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){let m=r+g/n*a;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,h.push(p.x,p.y)}d+=u}for(let _=0;_<i;_++){let g=_*(n+1);for(let m=0;m<n;m++){let y=m+g,b=y,x=y+n+1,A=y+n+2,T=y+1;o.push(b,x,T),o.push(x,A,T)}}this.setIndex(o),this.setAttribute("position",new ke(l,3)),this.setAttribute("normal",new ke(c,3)),this.setAttribute("uv",new ke(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},Yo=class s extends pt{constructor(e=new _s([new ce(0,.5),new ce(-.5,-.5),new ce(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new ke(i,3)),this.setAttribute("normal",new ke(r,3)),this.setAttribute("uv",new ke(a,2));function c(h){let d=i.length/3,u=h.extractPoints(t),f=u.shape,p=u.holes;Zn.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,m=p.length;g<m;g++){let y=p[g];Zn.isClockWise(y)===!0&&(p[g]=y.reverse())}let _=Zn.triangulateShape(f,p);for(let g=0,m=p.length;g<m;g++){let y=p[g];f=f.concat(y)}for(let g=0,m=f.length;g<m;g++){let y=f[g];i.push(y.x,y.y,0),r.push(0,0,1),a.push(y.x,y.y)}for(let g=0,m=_.length;g<m;g++){let y=_[g],b=y[0]+d,x=y[1]+d,A=y[2]+d;n.push(b,x,A),l+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return N_(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let a=t[e.shapes[i]];n.push(a)}return new s(n,e.curveSegments)}};function N_(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}var fi=class s extends pt{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],d=new E,u=new E,f=[],p=[],_=[],g=[];for(let m=0;m<=n;m++){let y=[],b=m/n,x=a+b*o,A=e*Math.cos(x),T=Math.sqrt(e*e-A*A),P=0;m===0&&a===0?P=.5/t:m===n&&l===Math.PI&&(P=-.5/t);for(let v=0;v<=t;v++){let R=v/t,L=i+R*r;d.x=-T*Math.cos(L),d.y=A,d.z=T*Math.sin(L),p.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),g.push(R+P,1-b),y.push(c++)}h.push(y)}for(let m=0;m<n;m++)for(let y=0;y<t;y++){let b=h[m][y+1],x=h[m][y],A=h[m+1][y],T=h[m+1][y+1];(m!==0||a>0)&&f.push(b,x,T),(m!==n-1||l<Math.PI)&&f.push(x,A,T)}this.setIndex(f),this.setAttribute("position",new ke(p,3)),this.setAttribute("normal",new ke(_,3)),this.setAttribute("uv",new ke(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},qo=class s extends Wi{constructor(e=1,t=0){let n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},pi=class s extends pt{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);let l=[],c=[],h=[],d=[],u=new E,f=new E,p=new E;for(let _=0;_<=n;_++){let g=a+_/n*o;for(let m=0;m<=i;m++){let y=m/i*r;f.x=(e+t*Math.cos(g))*Math.cos(y),f.y=(e+t*Math.cos(g))*Math.sin(y),f.z=t*Math.sin(g),c.push(f.x,f.y,f.z),u.x=e*Math.cos(y),u.y=e*Math.sin(y),p.subVectors(f,u).normalize(),h.push(p.x,p.y,p.z),d.push(m/i),d.push(_/n)}}for(let _=1;_<=n;_++)for(let g=1;g<=i;g++){let m=(i+1)*_+g-1,y=(i+1)*(_-1)+g-1,b=(i+1)*(_-1)+g,x=(i+1)*_+g;l.push(m,y,x),l.push(y,b,x)}this.setIndex(l),this.setAttribute("position",new ke(c,3)),this.setAttribute("normal",new ke(h,3)),this.setAttribute("uv",new ke(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}},Zo=class s extends pt{constructor(e=1,t=.4,n=64,i=8,r=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:r,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],l=[],c=[],h=[],d=new E,u=new E,f=new E,p=new E,_=new E,g=new E,m=new E;for(let b=0;b<=n;++b){let x=b/n*r*Math.PI*2;y(x,r,a,e,f),y(x+.01,r,a,e,p),g.subVectors(p,f),m.addVectors(p,f),_.crossVectors(g,m),m.crossVectors(_,g),_.normalize(),m.normalize();for(let A=0;A<=i;++A){let T=A/i*Math.PI*2,P=-t*Math.cos(T),v=t*Math.sin(T);d.x=f.x+(P*m.x+v*_.x),d.y=f.y+(P*m.y+v*_.y),d.z=f.z+(P*m.z+v*_.z),l.push(d.x,d.y,d.z),u.subVectors(d,f).normalize(),c.push(u.x,u.y,u.z),h.push(b/n),h.push(A/i)}}for(let b=1;b<=n;b++)for(let x=1;x<=i;x++){let A=(i+1)*(b-1)+(x-1),T=(i+1)*b+(x-1),P=(i+1)*b+x,v=(i+1)*(b-1)+x;o.push(A,T,v),o.push(T,P,v)}this.setIndex(o),this.setAttribute("position",new ke(l,3)),this.setAttribute("normal",new ke(c,3)),this.setAttribute("uv",new ke(h,2));function y(b,x,A,T,P){let v=Math.cos(b),R=Math.sin(b),L=A/x*b,N=Math.cos(L);P.x=T*(2+N)*.5*v,P.y=T*(2+N)*R*.5,P.z=T*Math.sin(L)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},mi=class s extends pt{constructor(e=new ms(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new E,l=new E,c=new ce,h=new E,d=[],u=[],f=[],p=[];_(),this.setIndex(p),this.setAttribute("position",new ke(d,3)),this.setAttribute("normal",new ke(u,3)),this.setAttribute("uv",new ke(f,2));function _(){for(let b=0;b<t;b++)g(b);g(r===!1?t:0),y(),m()}function g(b){h=e.getPointAt(b/t,h);let x=a.normals[b],A=a.binormals[b];for(let T=0;T<=i;T++){let P=T/i*Math.PI*2,v=Math.sin(P),R=-Math.cos(P);l.x=R*x.x+v*A.x,l.y=R*x.y+v*A.y,l.z=R*x.z+v*A.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,d.push(o.x,o.y,o.z)}}function m(){for(let b=1;b<=t;b++)for(let x=1;x<=i;x++){let A=(i+1)*(b-1)+(x-1),T=(i+1)*b+(x-1),P=(i+1)*b+x,v=(i+1)*(b-1)+x;p.push(A,T,v),p.push(T,P,v)}}function y(){for(let b=0;b<=t;b++)for(let x=0;x<=i;x++)c.x=b/t,c.y=x/i,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new Ph[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Qs=class extends pt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new E,r=new E;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let d=l[c],u=d.start,f=d.count;for(let p=u,_=u+f;p<_;p+=3)for(let g=0;g<3;g++){let m=o.getX(p+g),y=o.getX(p+(g+1)%3);i.fromBufferAttribute(a,m),r.fromBufferAttribute(a,y),Kp(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,d=3*o+(c+1)%3;i.fromBufferAttribute(a,h),r.fromBufferAttribute(a,d),Kp(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new ke(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Kp(s,e,t){let n=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}var $p=Object.freeze({__proto__:null,BoxGeometry:Fn,CapsuleGeometry:No,CircleGeometry:Gi,ConeGeometry:na,CylinderGeometry:zt,DodecahedronGeometry:Fo,EdgesGeometry:Js,ExtrudeGeometry:Ho,IcosahedronGeometry:Go,LatheGeometry:Wo,OctahedronGeometry:la,PlaneGeometry:di,PolyhedronGeometry:Wi,RingGeometry:Xo,ShapeGeometry:Yo,SphereGeometry:fi,TetrahedronGeometry:qo,TorusGeometry:pi,TorusKnotGeometry:Zo,TubeGeometry:mi,WireframeGeometry:Qs}),Jo=class extends $t{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new ze(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};function pr(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];if(jp(i))i.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(jp(i[0])){let r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();e[t][n]=r}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Mn(s){let e={};for(let t=0;t<s.length;t++){let n=pr(s[t]);for(let i in n)e[i]=n[i]}return e}function jp(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function F_(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Nf(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Mt.workingColorSpace}var Fa={clone:pr,merge:Mn},O_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,B_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,hn=class extends $t{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=O_,this.fragmentShader=B_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=pr(e.uniforms),this.uniformsGroups=F_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new ze().setHex(i.value);break;case"v2":this.uniforms[n].value=new ce().fromArray(i.value);break;case"v3":this.uniforms[n].value=new E().fromArray(i.value);break;case"v4":this.uniforms[n].value=new wt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new dt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new ct().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ca=class extends hn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Pt=class extends $t{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ti,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},er=class extends Pt{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ce(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ht(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Ko=class extends $t{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new ze(16777215),this.specular=new ze(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ti,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=Ea,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},$o=class extends $t{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new ze(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ti,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},jo=class extends $t{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ti,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},Qo=class extends $t{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ti,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Jn,this.combine=Ea,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ha=class extends $t{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ua=class extends $t{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},el=class extends $t{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new ze(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ti,this.normalScale=new ce(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this.fog=e.fog,this}},tl=class extends jt{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function ri(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function po(s){return s!==void 0&&s.inTangents!==void 0&&s.outTangents!==void 0}function Eg(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function kd(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i}function wg(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push(...a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}function z_(s,e,t,n,i=30){let r=s.clone();r.name=e;let a=[];for(let l=0;l<r.tracks.length;++l){let c=r.tracks[l],h=c.getValueSize(),d=[],u=[];for(let f=0;f<c.times.length;++f){let p=c.times[f]*i;if(!(p<t||p>=n)){d.push(c.times[f]);for(let _=0;_<h;++_)u.push(c.values[f*h+_])}}d.length!==0&&(c.times=ri(d,c.times.constructor),c.values=ri(u,c.values.constructor),a.push(c))}r.tracks=a;let o=1/0;for(let l=0;l<r.tracks.length;++l)o>r.tracks[l].times[0]&&(o=r.tracks[l].times[0]);for(let l=0;l<r.tracks.length;++l)r.tracks[l].shift(-1*o);return r.resetDuration(),r}function V_(s,e=0,t=s,n=30){n<=0&&(n=30);let i=t.tracks.length,r=e/n;for(let a=0;a<i;++a){let o=t.tracks[a],l=o.ValueTypeName;if(l==="bool"||l==="string")continue;let c=s.tracks.find(function(m){return m.name===o.name&&m.ValueTypeName===l});if(c===void 0)continue;let h=0,d=o.getValueSize();o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=d/3);let u=0,f=c.getValueSize();c.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(u=f/3);let p=o.times.length-1,_;if(r<=o.times[0]){let m=h,y=d-h;_=o.values.slice(m,y)}else if(r>=o.times[p]){let m=p*d+h,y=m+d-h;_=o.values.slice(m,y)}else{let m=o.createInterpolant(),y=h,b=d-h;m.evaluate(r),_=m.resultBuffer.slice(y,b)}l==="quaternion"&&new Jt().fromArray(_).normalize().conjugate().toArray(_);let g=c.times.length;for(let m=0;m<g;++m){let y=m*f+u;if(l==="quaternion")Jt.multiplyQuaternionsFlat(c.values,y,_,0,c.values,y);else{let b=f-u*2;for(let x=0;x<b;++x)c.values[y+x]-=_[x]}}}return s.blendMode=Lu,s}var Ih=class{static convertArray(e,t){return ri(e,t)}static isTypedArray(e){return dg(e)}static hasTangents(e){return po(e)}static getKeyframeOrder(e){return Eg(e)}static sortedArray(e,t,n){return kd(e,t,n)}static flattenJSON(e,t,n,i){wg(e,t,n,i)}static subclip(e,t,n,i,r=30){return z_(e,t,n,i,r)}static makeClipAdditive(e,t=0,n=e,i=30){return V_(e,t,n,i)}},Xi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},nl=class extends Xi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ls,endingEnd:ls}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case cs:r=e,o=2*t-n;break;case Wr:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case cs:a=e,l=2*n-t;break;case Wr:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,p=(n-t)/(i-t),_=p*p,g=_*p,m=-u*g+2*u*_-u*p,y=(1+u)*g+(-1.5-2*u)*_+(-.5+u)*p+1,b=(-1-f)*g+(1.5+f)*_+.5*p,x=f*g-f*_;for(let A=0;A!==o;++A)r[A]=m*a[h+A]+y*a[c+A]+b*a[l+A]+x*a[d+A];return r}},da=class extends Xi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),d=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*d+a[l+u]*h;return r}},il=class extends Xi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},sl=class extends Xi{interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this.inTangents,d=this.outTangents;if(!h||!d){let p=(n-t)/(i-t),_=1-p;for(let g=0;g!==o;++g)r[g]=a[c+g]*_+a[l+g]*p;return r}let u=o*2,f=e-1;for(let p=0;p!==o;++p){let _=a[c+p],g=a[l+p],m=f*u+p*2,y=d[m],b=d[m+1],x=e*u+p*2,A=h[x],T=h[x+1],P=H_(n,t,y,A,i);r[p]=Tg(P,_,b,T,g)}return r}};function Tg(s,e,t,n,i){let r=1-s;return r*r*r*e+3*r*r*s*t+3*r*s*s*n+s*s*s*i}function k_(s,e,t,n,i){let r=1-s;return 3*r*r*(t-e)+6*r*s*(n-t)+3*s*s*(i-n)}function H_(s,e,t,n,i){let r=(s-e)/(i-e);for(let a=0;a<8;a++){let o=Tg(r,e,t,n,i)-s;if(Math.abs(o)<1e-10)break;let l=k_(r,e,t,n,i);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Cn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ri(t,this.TimeBufferType),this.values=ri(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ri(e.times,Array),values:ri(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),po(e.settings)&&(n.settings={inTangents:ri(e.settings.inTangents,Array),outTangents:ri(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new il(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new da(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new nl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new sl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Gr:t=this.InterpolantFactoryMethodDiscrete;break;case Mo:t=this.InterpolantFactoryMethodLinear;break;case lo:t=this.InterpolantFactoryMethodSmooth;break;case dh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return Pe("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Gr;case this.InterpolantFactoryMethodLinear:return Mo;case this.InterpolantFactoryMethodSmooth:return lo;case this.InterpolantFactoryMethodBezier:return dh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;po(this.settings)&&(Qp(this.settings.inTangents,e),Qp(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,i=n.length,r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&($e("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&($e("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){$e("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){$e("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&dg(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){$e("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===lo,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{let d=o*n,u=d-n,f=d+n;for(let p=0;p!==n;++p){let _=t[d+p];if(_!==t[u+p]||_!==t[f+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,po(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}};function Qp(s,e){for(let t=0,n=s.length;t!==n;t+=2)s[t]*=e}Cn.prototype.ValueTypeName="";Cn.prototype.TimeBufferType=Float32Array;Cn.prototype.ValueBufferType=Float32Array;Cn.prototype.DefaultInterpolation=Mo;var Ei=class extends Cn{constructor(e,t,n){super(e,t,n)}};Ei.prototype.ValueTypeName="bool";Ei.prototype.ValueBufferType=Array;Ei.prototype.DefaultInterpolation=Gr;Ei.prototype.InterpolantFactoryMethodLinear=void 0;Ei.prototype.InterpolantFactoryMethodSmooth=void 0;var fa=class extends Cn{constructor(e,t,n,i){super(e,t,n,i)}};fa.prototype.ValueTypeName="color";var tr=class extends Cn{constructor(e,t,n,i){super(e,t,n,i)}};tr.prototype.ValueTypeName="number";var rl=class extends Xi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let h=c+o;c!==h;c+=4)Jt.slerpFlat(r,0,a,c-o,a,c,l);return r}},nr=class extends Cn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new rl(this.times,this.values,this.getValueSize(),e)}};nr.prototype.ValueTypeName="quaternion";nr.prototype.InterpolantFactoryMethodSmooth=void 0;var wi=class extends Cn{constructor(e,t,n){super(e,t,n)}};wi.prototype.ValueTypeName="string";wi.prototype.ValueBufferType=Array;wi.prototype.DefaultInterpolation=Gr;wi.prototype.InterpolantFactoryMethodLinear=void 0;wi.prototype.InterpolantFactoryMethodSmooth=void 0;var pa=class extends Cn{constructor(e,t,n,i){super(e,t,n,i)}};pa.prototype.ValueTypeName="vector";var xs=class{constructor(e="",t=-1,n=[],i=ic){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=kn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(W_(n[a]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,a=n.length;r!==a;++r)t.push(Cn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let h=Eg(l);l=kd(l,1,h),c=kd(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new tr(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(r);if(h&&h.length>1){let d=h[1],u=i[d];u||(i[d]=u=[]),u.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function G_(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return tr;case"vector":case"vector2":case"vector3":case"vector4":return pa;case"color":return fa;case"quaternion":return nr;case"bool":case"boolean":return Ei;case"string":return wi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function W_(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=G_(s.type);if(s.times===void 0){let n=[],i=[];wg(s.keys,n,i,"value"),s.times=n,s.values=i}let t;return e.parse!==void 0?t=e.parse(s):t=new e(s.name,s.times,s.values,s.interpolation),po(s.settings)&&(t.settings={inTangents:ri(s.settings.inTangents,Float32Array),outTangents:ri(s.settings.outTangents,Float32Array)}),t}var oi={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(em(s)||(this.files[s]=e))},get:function(s){if(this.enabled!==!1&&!em(s))return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};function em(s){try{let e=s.slice(s.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}var ma=class{constructor(e,t,n){let i=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,d){return c.push(h,d),this},this.removeHandler=function(h){let d=c.indexOf(h);return d!==-1&&c.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=c.length;d<u;d+=2){let f=c[d],p=c[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return p}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Ff=new ma,un=class{constructor(e){this.manager=e!==void 0?e:Ff,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};un.DEFAULT_MATERIAL_NAME="__DEFAULT";var Bi={},Hd=class extends Error{constructor(e,t){super(e),this.response=t}},Kn=class extends un{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=oi.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(Bi[e]!==void 0){Bi[e].push({onLoad:t,onProgress:n,onError:i});return}Bi[e]=[],Bi[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&Pe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=Bi[e],d=c.body.getReader(),u=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=u?parseInt(u):0,p=f!==0,_=0,g=new ReadableStream({start(m){y();function y(){d.read().then(({done:b,value:x})=>{if(b)m.close();else{_+=x.byteLength;let A=new ProgressEvent("progress",{lengthComputable:p,loaded:_,total:f});for(let T=0,P=h.length;T<P;T++){let v=h[T];v.onProgress&&v.onProgress(A)}m.enqueue(x),y()}},b=>{m.error(b)})}}});return new Response(g)}else throw new Hd(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o==="")return c.text();{let d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return c.arrayBuffer().then(p=>f.decode(p))}}}).then(c=>{oi.add(`file:${e}`,c);let h=Bi[e];delete Bi[e];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onLoad&&f.onLoad(c)}}).catch(c=>{let h=Bi[e];if(h===void 0)throw this.manager.itemError(e),c;delete Bi[e];for(let d=0,u=h.length;d<u;d++){let f=h[d];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Lh=class extends un{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new Kn(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{t(r.parse(JSON.parse(o)))}catch(l){i?i(l):$e(l),r.manager.itemError(e)}},n,i)}parse(e){let t=[];for(let n=0;n<e.length;n++){let i=xs.parse(e[n]);t.push(i)}return t}},Dh=class extends un{constructor(e){super(e)}load(e,t,n,i){let r=this,a=[],o=new Zs,l=new Kn(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(r.withCredentials);let c=0;function h(d){l.load(e[d],function(u){let f=r.parse(u,!0);a[d]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},c+=1,c===6&&(f.mipmapCount===1&&(o.minFilter=Bt),o.image=a,o.format=f.format,o.needsUpdate=!0,t&&t(o))},n,i)}if(Array.isArray(e))for(let d=0,u=e.length;d<u;++d)h(d);else l.load(e,function(d){let u=r.parse(d,!0);if(u.isCubemap){let f=u.mipmaps.length/u.mipmapCount;for(let p=0;p<f;p++){a[p]={mipmaps:[]};for(let _=0;_<u.mipmapCount;_++)a[p].mipmaps.push(u.mipmaps[p*u.mipmapCount+_]),a[p].format=u.format,a[p].width=u.width,a[p].height=u.height}o.image=a}else o.image.width=u.width,o.image.height=u.height,o.mipmaps=u.mipmaps;u.mipmapCount===1&&(o.minFilter=Bt),o.format=u.format,o.needsUpdate=!0,t&&t(o)},n,i);return o}},Ur=new WeakMap,ys=class extends un{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=oi.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);else{let d=Ur.get(a);d===void 0&&(d=[],Ur.set(a,d)),d.push({onLoad:t,onError:i})}return a}let o=qr("img");function l(){h(),t&&t(this);let d=Ur.get(this)||[];for(let u=0;u<d.length;u++){let f=d[u];f.onLoad&&f.onLoad(this)}Ur.delete(this),r.manager.itemEnd(e)}function c(d){h(),i&&i(d),oi.remove(`image:${e}`);let u=Ur.get(this)||[];for(let f=0;f<u.length;f++){let p=u[f];p.onError&&p.onError(d)}Ur.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),oi.add(`image:${e}`,o),r.manager.itemStart(e),o.src=e,o}},Uh=class extends un{constructor(e){super(e)}load(e,t,n,i){let r=new fs;r.colorSpace=an;let a=new ys(this.manager);a.setCrossOrigin(this.crossOrigin),a.setPath(this.path);let o=0;function l(c){a.load(e[c],function(h){r.images[c]=h,o++,o===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let c=0;c<e.length;++c)l(c);return r}},Nh=class extends un{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new An,o=new Kn(this.manager);return o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setPath(this.path),o.setWithCredentials(r.withCredentials),o.load(e,function(l){let c;try{c=r.parse(l)}catch(h){i!==void 0?i(h):$e(h);return}r._applyTexData(a,c),t&&t(a,c)},n,i),a}createDataTexture(e){let t=new An;return this._applyTexData(t,this.parse(e)),t}_applyTexData(e,t){t.image!==void 0?e.image=t.image:t.data!==void 0&&(e.image.width=t.width,e.image.height=t.height,e.image.data=t.data),e.wrapS=t.wrapS!==void 0?t.wrapS:Tn,e.wrapT=t.wrapT!==void 0?t.wrapT:Tn,e.magFilter=t.magFilter!==void 0?t.magFilter:Bt,e.minFilter=t.minFilter!==void 0?t.minFilter:Bt,e.anisotropy=t.anisotropy!==void 0?t.anisotropy:1,t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.mipmaps!==void 0&&(e.mipmaps=t.mipmaps,e.minFilter=yi),t.mipmapCount===1&&(e.minFilter=Bt),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),e.needsUpdate=!0}},Fh=class extends un{constructor(e){super(e)}load(e,t,n,i){let r=new qt,a=new ys(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},gi=class extends Ct{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},ir=class extends gi{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Cd=new ct,tm=new E,nm=new E,sr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ce(512,512),this.mapType=Pn,this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bi,this._frameExtents=new ce(1,1),this._viewportCount=1,this._viewports=[new wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;tm.setFromMatrixPosition(e.matrixWorld),t.position.copy(tm),nm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(nm),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){Cd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Cd,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;e.coordinateSystem===hs||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Cd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},nh=new E,ih=new Jt,Si=new E,rr=class extends Ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=Un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(nh,ih,Si),Si.x===1&&Si.y===1&&Si.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(nh,ih,Si.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(nh,ih,Si),Si.x===1&&Si.y===1&&Si.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(nh,ih,Si.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},as=new E,im=new ce,sm=new ce,Xt=class extends rr{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=zs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Os*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zs*2*Math.atan(Math.tan(Os*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){as.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(as.x,as.y).multiplyScalar(-e/as.z),as.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(as.x,as.y).multiplyScalar(-e/as.z)}getViewSize(e,t){return this.getViewBounds(e,im,sm),t.subVectors(sm,im)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Os*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Gd=class extends sr{constructor(){super(new Xt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=zs*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},al=class extends gi{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Gd}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Wd=class extends sr{constructor(){super(new Xt(90,1,.5,500)),this.isPointLightShadow=!0}},ol=class extends gi{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Wd}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},vs=class extends rr{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Xd=class extends sr{constructor(){super(new vs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ss=class extends gi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.shadow=new Xd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},ll=class extends gi{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}},cl=class extends gi{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){let t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}},ga=class{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new E)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){let n=e.x,i=e.y,r=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.282095),t.addScaledVector(a[1],.488603*i),t.addScaledVector(a[2],.488603*r),t.addScaledVector(a[3],.488603*n),t.addScaledVector(a[4],1.092548*(n*i)),t.addScaledVector(a[5],1.092548*(i*r)),t.addScaledVector(a[6],.315392*(3*r*r-1)),t.addScaledVector(a[7],1.092548*(n*r)),t.addScaledVector(a[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){let n=e.x,i=e.y,r=e.z,a=this.coefficients;return t.copy(a[0]).multiplyScalar(.886227),t.addScaledVector(a[1],2*.511664*i),t.addScaledVector(a[2],2*.511664*r),t.addScaledVector(a[3],2*.511664*n),t.addScaledVector(a[4],2*.429043*n*i),t.addScaledVector(a[5],2*.429043*i*r),t.addScaledVector(a[6],.743125*r*r-.247708),t.addScaledVector(a[7],2*.429043*n*r),t.addScaledVector(a[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){let n=e.x,i=e.y,r=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*r,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*n*r,t[8]=.546274*(n*n-i*i)}},hl=class extends gi{constructor(e=new ga,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}toJSON(e){let t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}},rm={},ul=class s extends un{constructor(e){super(e),this.textures={}}load(e,t,n,i){let r=this,a=new Kn(r.manager);a.setPath(r.path),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(e,function(o){try{t(r.parse(JSON.parse(o)))}catch(l){i?i(l):$e(l),r.manager.itemError(e)}},n,i)}parse(e){let t=this.createMaterialFromType(e.type);return t.fromJSON(e,this.textures),t}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return s.createMaterialFromType(e)}static createMaterialFromType(e){let n={ShadowMaterial:Jo,SpriteMaterial:ds,RawShaderMaterial:ca,ShaderMaterial:hn,PointsMaterial:Qr,MeshPhysicalMaterial:er,MeshStandardMaterial:Pt,MeshPhongMaterial:Ko,MeshToonMaterial:$o,MeshNormalMaterial:jo,MeshLambertMaterial:Qo,MeshDepthMaterial:ha,MeshDistanceMaterial:ua,MeshBasicMaterial:Ht,MeshMatcapMaterial:el,LineDashedMaterial:tl,LineBasicMaterial:jt,Material:$t,...rm}[e],i;return n===void 0?(Mi(`MaterialLoader: Unknown material type "${e}". Use .registerMaterial() before starting the deserialization process.`),i=new $t):i=new n,i}static registerMaterial(e,t){rm[e]=t}},_a=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},ar=class extends pt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},dl=class extends un{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new Kn(r.manager);a.setPath(r.path),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(e,function(o){try{t(r.parse(JSON.parse(o)))}catch(l){i?i(l):$e(l),r.manager.itemError(e)}},n,i)}parse(e){let t={},n={};function i(f,p){if(t[p]!==void 0)return t[p];let g=f.interleavedBuffers[p],m=r(f,g.buffer),y=zr(g.type,m),b=new Xs(y,g.stride);return b.uuid=g.uuid,g.usage!==void 0&&b.setUsage(g.usage),t[p]=b,b}function r(f,p){if(n[p]!==void 0)return n[p];let g=f.arrayBuffers[p],m=new Uint32Array(g).buffer;return n[p]=m,m}let a=e.isInstancedBufferGeometry?new ar:new pt,o=e.data.index;if(o!==void 0){let f=zr(o.type,o.array);a.setIndex(new Nt(f,1))}let l=e.data.attributes;for(let f in l){let p=l[f],_;if(p.isInterleavedBufferAttribute){let g=i(e.data,p.data);_=new vn(g,p.itemSize,p.offset,p.normalized)}else{let g=zr(p.type,p.array),m=p.isInstancedBufferAttribute?ki:Nt;_=new m(g,p.itemSize,p.normalized)}p.name!==void 0&&(_.name=p.name),p.usage!==void 0&&_.setUsage(p.usage),p.gpuType!==void 0&&(_.gpuType=p.gpuType),a.setAttribute(f,_)}let c=e.data.morphAttributes;if(c)for(let f in c){let p=c[f],_=[];for(let g=0,m=p.length;g<m;g++){let y=p[g],b;if(y.isInterleavedBufferAttribute){let x=i(e.data,y.data);b=new vn(x,y.itemSize,y.offset,y.normalized)}else{let x=zr(y.type,y.array);b=new Nt(x,y.itemSize,y.normalized)}y.name!==void 0&&(b.name=y.name),y.usage!==void 0&&b.setUsage(y.usage),y.gpuType!==void 0&&(b.gpuType=y.gpuType),_.push(b)}a.morphAttributes[f]=_}e.data.morphTargetsRelative&&(a.morphTargetsRelative=!0);let d=e.data.groups||e.data.drawcalls||e.data.offsets;if(d!==void 0)for(let f=0,p=d.length;f!==p;++f){let _=d[f];a.addGroup(_.start,_.count,_.materialIndex)}let u=e.data.boundingSphere;return u!==void 0&&(a.boundingSphere=new kt().fromJSON(u)),e.name&&(a.name=e.name),e.userData&&(a.userData=e.userData),a}},Pd={},Oh=class extends un{constructor(e){super(e)}load(e,t,n,i){let r=this,a=this.path===""?_a.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||a;let o=new Kn(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){let c=null;try{c=JSON.parse(l)}catch(d){i!==void 0&&i(d),$e("ObjectLoader: Can't parse "+e+".",d.message);return}let h=c.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),$e("ObjectLoader: Can't load "+e);return}r.parse(c,t)},n,i)}async loadAsync(e,t){let n=this,i=this.path===""?_a.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;let r=new Kn(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials);let a=await r.loadAsync(e,t),o;try{o=JSON.parse(a)}catch(c){throw new Error("THREE.ObjectLoader: Can't parse "+e+". "+c.message)}let l=o.metadata;if(l===void 0||l.type===void 0||l.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(o)}parse(e,t){let n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),r=this.parseGeometries(e.geometries,i),a=this.parseImages(e.images,function(){t!==void 0&&t(c)}),o=this.parseTextures(e.textures,a),l=this.parseMaterials(e.materials,o),c=this.parseObject(e.object,r,l,o,n),h=this.parseSkeletons(e.skeletons,c);if(this.bindSkeletons(c,h),this.bindLightTargets(c),t!==void 0){let d=!1;for(let u in a)if(a[u].data instanceof HTMLImageElement){d=!0;break}d===!1&&t(c)}return c}async parseAsync(e){let t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),r=await this.parseImagesAsync(e.images),a=this.parseTextures(e.textures,r),o=this.parseMaterials(e.materials,a),l=this.parseObject(e.object,i,o,a,t),c=this.parseSkeletons(e.skeletons,l);return this.bindSkeletons(l,c),this.bindLightTargets(l),l}static registerGeometry(e,t){Pd[e]=t}parseShapes(e){let t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){let r=new _s().fromJSON(e[n]);t[r.uuid]=r}return t}parseSkeletons(e,t){let n={},i={};if(t.traverse(function(r){r.isBone&&(i[r.uuid]=r)}),e!==void 0)for(let r=0,a=e.length;r<a;r++){let o=new Ro().fromJSON(e[r],i);n[o.uuid]=o}return n}parseGeometries(e,t){let n={};if(e!==void 0){let i=new dl;for(let r=0,a=e.length;r<a;r++){let o,l=e[r];switch(l.type){case"BufferGeometry":case"InstancedBufferGeometry":o=i.parse(l);break;default:l.type in $p?o=$p[l.type].fromJSON(l,t):l.type in Pd?o=Pd[l.type].fromJSON(l,t):Pe(`ObjectLoader: Unknown geometry type "${l.type}". Use .registerGeometry() before starting the deserialization process.`)}o.uuid=l.uuid,l.name!==void 0&&(o.name=l.name),l.userData!==void 0&&(o.userData=l.userData),n[l.uuid]=o}}return n}parseMaterials(e,t){let n={},i={};if(e!==void 0){let r=new ul;r.setTextures(t);for(let a=0,o=e.length;a<o;a++){let l=e[a];n[l.uuid]===void 0&&(n[l.uuid]=r.parse(l)),i[l.uuid]=n[l.uuid]}}return i}parseAnimations(e){let t={};if(e!==void 0)for(let n=0;n<e.length;n++){let i=e[n],r=xs.parse(i);t[r.uuid]=r}return t}parseImages(e,t){let n=this,i={},r;function a(l){return l=n.manager.resolveURL(l),n.manager.itemStart(l),r.load(l,function(){n.manager.itemEnd(l)},void 0,function(){n.manager.itemError(l),n.manager.itemEnd(l)})}function o(l){if(typeof l=="string"){let c=l,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c)?c:n.resourcePath+c;return a(h)}else return l.data?{data:zr(l.type,l.data),width:l.width,height:l.height}:null}if(e!==void 0&&e.length>0){let l=new ma(t);r=new ys(l),r.setCrossOrigin(this.crossOrigin);for(let c=0,h=e.length;c<h;c++){let d=e[c],u=d.url;if(Array.isArray(u)){let f=[];for(let p=0,_=u.length;p<_;p++){let g=u[p],m=o(g);m!==null&&(m instanceof HTMLImageElement?f.push(m):f.push(new An(m.data,m.width,m.height)))}i[d.uuid]=new qn(f)}else{let f=o(d.url);i[d.uuid]=new qn(f)}}}return i}async parseImagesAsync(e){let t=this,n={},i;async function r(a){if(typeof a=="string"){let o=a,l=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(o)?o:t.resourcePath+o;return await i.loadAsync(l)}else return a.data?{data:zr(a.type,a.data),width:a.width,height:a.height}:null}if(e!==void 0&&e.length>0){i=new ys(this.manager),i.setCrossOrigin(this.crossOrigin);for(let a=0,o=e.length;a<o;a++){let l=e[a],c=l.url;if(Array.isArray(c)){let h=[];for(let d=0,u=c.length;d<u;d++){let f=c[d],p=await r(f);p!==null&&(p instanceof HTMLImageElement?h.push(p):h.push(new An(p.data,p.width,p.height)))}n[l.uuid]=new qn(h)}else{let h=await r(l.url);n[l.uuid]=new qn(h)}}}return n}parseTextures(e,t){function n(r,a){return typeof r=="number"?r:(Pe("ObjectLoader.parseTexture: Constant should be in numeric form.",r),a[r])}let i={};if(e!==void 0)for(let r=0,a=e.length;r<a;r++){let o=e[r];o.image===void 0&&Pe('ObjectLoader: No "image" specified for',o.uuid),t[o.image]===void 0&&Pe("ObjectLoader: Undefined image",o.image);let l=t[o.image],c=l.data,h;Array.isArray(c)?(h=new fs,c.length===6&&(h.needsUpdate=!0)):(c&&c.data?h=new An:h=new qt,c&&(h.needsUpdate=!0)),h.source=l,h.uuid=o.uuid,o.name!==void 0&&(h.name=o.name),o.mapping!==void 0&&(h.mapping=n(o.mapping,X_)),o.channel!==void 0&&(h.channel=o.channel),o.offset!==void 0&&h.offset.fromArray(o.offset),o.repeat!==void 0&&h.repeat.fromArray(o.repeat),o.center!==void 0&&h.center.fromArray(o.center),o.rotation!==void 0&&(h.rotation=o.rotation),o.wrap!==void 0&&(h.wrapS=n(o.wrap[0],am),h.wrapT=n(o.wrap[1],am)),o.format!==void 0&&(h.format=o.format),o.internalFormat!==void 0&&(h.internalFormat=o.internalFormat),o.type!==void 0&&(h.type=o.type),o.colorSpace!==void 0&&(h.colorSpace=o.colorSpace),o.minFilter!==void 0&&(h.minFilter=n(o.minFilter,om)),o.magFilter!==void 0&&(h.magFilter=n(o.magFilter,om)),o.anisotropy!==void 0&&(h.anisotropy=o.anisotropy),o.flipY!==void 0&&(h.flipY=o.flipY),o.generateMipmaps!==void 0&&(h.generateMipmaps=o.generateMipmaps),o.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=o.premultiplyAlpha),o.unpackAlignment!==void 0&&(h.unpackAlignment=o.unpackAlignment),o.compareFunction!==void 0&&(h.compareFunction=o.compareFunction),o.normalized!==void 0&&(h.normalized=o.normalized),o.userData!==void 0&&(h.userData=o.userData),i[o.uuid]=h}return i}parseObject(e,t,n,i,r){let a;function o(u){return t[u]===void 0&&Pe("ObjectLoader: Undefined geometry",u),t[u]}function l(u){if(u!==void 0){if(Array.isArray(u)){let f=[];for(let p=0,_=u.length;p<_;p++){let g=u[p];n[g]===void 0&&Pe("ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[u]===void 0&&Pe("ObjectLoader: Undefined material",u),n[u]}}function c(u){return i[u]===void 0&&Pe("ObjectLoader: Undefined texture",u),i[u]}let h,d;switch(e.type){case"Scene":a=new Ws,e.background!==void 0&&(Number.isInteger(e.background)?a.background=new ze(e.background):a.background=c(e.background)),e.environment!==void 0&&(a.environment=c(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?a.fog=new wo(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(a.fog=new Eo(e.fog.color,e.fog.density)),e.fog.name!==""&&(a.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(a.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(a.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&a.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(a.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&a.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":a=new Xt(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(a.focus=e.focus),e.zoom!==void 0&&(a.zoom=e.zoom),e.filmGauge!==void 0&&(a.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(a.filmOffset=e.filmOffset),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"OrthographicCamera":a=new vs(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(a.zoom=e.zoom),e.view!==void 0&&(a.view=Object.assign({},e.view));break;case"AmbientLight":a=new ll(e.color,e.intensity);break;case"DirectionalLight":a=new Ss(e.color,e.intensity),a.target=e.target||"";break;case"PointLight":a=new ol(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":a=new cl(e.color,e.intensity,e.width,e.height);break;case"SpotLight":a=new al(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),a.target=e.target||"";break;case"HemisphereLight":a=new ir(e.color,e.groundColor,e.intensity);break;case"LightProbe":let u=new ga().fromArray(e.sh);a=new hl(u,e.intensity);break;case"SkinnedMesh":h=o(e.geometry),d=l(e.material),a=new Ao(h,d),e.bindMode!==void 0&&(a.bindMode=e.bindMode),e.bindMatrix!==void 0&&a.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(a.skeleton=e.skeleton);break;case"Mesh":h=o(e.geometry),d=l(e.material),a=new Ot(h,d);break;case"InstancedMesh":h=o(e.geometry),d=l(e.material);let f=e.count,p=e.instanceMatrix,_=e.instanceColor;a=new qs(h,d,f),a.instanceMatrix=new ki(new Float32Array(p.array),16),_!==void 0&&(a.instanceColor=new ki(new Float32Array(_.array),_.itemSize));break;case"BatchedMesh":h=o(e.geometry),d=l(e.material),a=new Po(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,d),a.geometry=h,a.perObjectFrustumCulled=e.perObjectFrustumCulled,a.sortObjects=e.sortObjects,a._drawRanges=e.drawRanges,a._reservedRanges=e.reservedRanges,a._geometryInfo=e.geometryInfo.map(g=>{let m=null,y=null;return g.boundingBox!==void 0&&(m=new Vt().fromJSON(g.boundingBox)),g.boundingSphere!==void 0&&(y=new kt().fromJSON(g.boundingSphere)),{...g,boundingBox:m,boundingSphere:y}}),a._instanceInfo=e.instanceInfo,a._availableInstanceIds=e._availableInstanceIds,a._availableGeometryIds=e._availableGeometryIds,a._nextIndexStart=e.nextIndexStart,a._nextVertexStart=e.nextVertexStart,a._geometryCount=e.geometryCount,a._maxInstanceCount=e.maxInstanceCount,a._maxVertexCount=e.maxVertexCount,a._maxIndexCount=e.maxIndexCount,a._geometryInitialized=e.geometryInitialized,a._matricesTexture=c(e.matricesTexture.uuid),a._indirectTexture=c(e.indirectTexture.uuid),e.colorsTexture!==void 0&&(a._colorsTexture=c(e.colorsTexture.uuid)),e.boundingSphere!==void 0&&(a.boundingSphere=new kt().fromJSON(e.boundingSphere)),e.boundingBox!==void 0&&(a.boundingBox=new Vt().fromJSON(e.boundingBox));break;case"LOD":a=new To;break;case"Line":a=new hi(o(e.geometry),l(e.material));break;case"LineLoop":a=new Io(o(e.geometry),l(e.material));break;case"LineSegments":a=new Rn(o(e.geometry),l(e.material));break;case"PointCloud":case"Points":a=new Lo(o(e.geometry),l(e.material));break;case"Sprite":a=new Ys(l(e.material));break;case"Group":a=new en;break;case"Bone":a=new jr;break;default:a=new Ct}if(a.uuid=e.uuid,e.name!==void 0&&(a.name=e.name),e.matrix!==void 0?(a.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(a.matrixAutoUpdate=e.matrixAutoUpdate),a.matrixAutoUpdate&&a.matrix.decompose(a.position,a.quaternion,a.scale)):(e.position!==void 0&&a.position.fromArray(e.position),e.rotation!==void 0&&a.rotation.fromArray(e.rotation),e.quaternion!==void 0&&a.quaternion.fromArray(e.quaternion),e.scale!==void 0&&a.scale.fromArray(e.scale)),e.up!==void 0&&a.up.fromArray(e.up),e.pivot!==void 0&&(a.pivot=new E().fromArray(e.pivot)),e.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),e.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=e.morphTargetInfluences.slice()),e.castShadow!==void 0&&(a.castShadow=e.castShadow),e.receiveShadow!==void 0&&(a.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(a.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(a.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(a.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(a.shadow.radius=e.shadow.radius),e.shadow.blurSamples!==void 0&&(a.shadow.blurSamples=e.shadow.blurSamples),e.shadow.focus!==void 0&&(a.shadow.focus=e.shadow.focus),e.shadow.aspect!==void 0&&(a.shadow.aspect=e.shadow.aspect),e.shadow.mapSize!==void 0&&a.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(a.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(a.visible=e.visible),e.frustumCulled!==void 0&&(a.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(a.renderOrder=e.renderOrder),e.static!==void 0&&(a.static=e.static),e.userData!==void 0&&(a.userData=e.userData),e.layers!==void 0&&(a.layers.mask=e.layers),e.children!==void 0){let u=e.children;for(let f=0;f<u.length;f++)a.add(this.parseObject(u[f],t,n,i,r))}if(e.animations!==void 0){let u=e.animations;for(let f=0;f<u.length;f++){let p=u[f];a.animations.push(r[p])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(a.autoUpdate=e.autoUpdate);let u=e.levels;for(let f=0;f<u.length;f++){let p=u[f],_=a.getObjectByProperty("uuid",p.object);_!==void 0&&a.addLevel(_,p.distance,p.hysteresis)}}return a}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){let i=t[n.skeleton];i===void 0?Pe("ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){let n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new Ct}})}},X_={UVMapping:vl,CubeReflectionMapping:xi,CubeRefractionMapping:Ki,EquirectangularReflectionMapping:Ta,EquirectangularRefractionMapping:Aa,CubeUVReflectionMapping:hr},am={RepeatWrapping:kr,ClampToEdgeWrapping:Tn,MirroredRepeatWrapping:Hr},om={NearestFilter:Yt,NearestMipmapNearestFilter:wu,NearestMipmapLinearFilter:ur,LinearFilter:Bt,LinearMipmapNearestFilter:Ra,LinearMipmapLinearFilter:yi},Id=new WeakMap,Bh=class extends un{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&Pe("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&Pe("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=oi.get(`image-bitmap:${e}`);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{Id.has(a)===!0?(i&&i(Id.get(a)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return oi.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Id.set(l,c),oi.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});oi.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},sh,xa=class{static getContext(){return sh===void 0&&(sh=new(window.AudioContext||window.webkitAudioContext)),sh}static setContext(e){sh=e}},zh=class extends un{constructor(e){super(e)}load(e,t,n,i){let r=this,a=new Kn(this.manager);a.setResponseType("arraybuffer"),a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){try{let c=l.slice(0),h=xa.getContext(),d=e+"#decode";r.manager.itemStart(d),h.decodeAudioData(c,function(u){t(u),r.manager.itemEnd(d)}).catch(function(u){o(u),r.manager.itemEnd(d)})}catch(c){o(c)}},n,i);function o(l){i?i(l):$e(l),r.manager.itemError(e)}}},lm=new ct,cm=new ct,Is=new ct,Vh=class{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Xt,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Xt,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){let t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,Is.copy(e.projectionMatrix);let i=t.eyeSep/2,r=i*t.near/t.focus,a=t.near*Math.tan(Os*t.fov*.5)/t.zoom,o,l;cm.elements[12]=-i,lm.elements[12]=i,o=-a*t.aspect+r,l=a*t.aspect+r,Is.elements[0]=2*t.near/(l-o),Is.elements[8]=(l+o)/(l-o),this.cameraL.projectionMatrix.copy(Is),o=-a*t.aspect-r,l=a*t.aspect-r,Is.elements[0]=2*t.near/(l-o),Is.elements[8]=(l+o)/(l-o),this.cameraR.projectionMatrix.copy(Is)}this.cameraL.matrix.copy(e.matrixWorld).multiply(cm),this.cameraL.matrixWorldNeedsUpdate=!0,this.cameraR.matrix.copy(e.matrixWorld).multiply(lm),this.cameraR.matrixWorldNeedsUpdate=!0}},Nr=-90,Fr=1,fl=class extends Ct{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Xt(Nr,Fr,e,t);i.layers=this.layers,this.add(i);let r=new Xt(Nr,Fr,e,t);r.layers=this.layers,this.add(r);let a=new Xt(Nr,Fr,e,t);a.layers=this.layers,this.add(a);let o=new Xt(Nr,Fr,e,t);o.layers=this.layers,this.add(o);let l=new Xt(Nr,Fr,e,t);l.layers=this.layers,this.add(l);let c=new Xt(Nr,Fr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Un)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===hs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;e.isWebGLRenderer===!0?g=e.state.buffers.depth.getReversed():g=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},pl=class extends Xt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},ml=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=Y_.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function Y_(){this._document.hidden===!1&&this.reset()}var Ls=new E,Ld=new Jt,q_=new E,Ds=new E,Us=new E,kh=class extends Ct{constructor(){super(),this.type="AudioListener",this.context=xa.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._timer=new ml}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e),this._timer.update();let t=this.context.listener;if(this.timeDelta=this._timer.getDelta(),this.matrixWorld.decompose(Ls,Ld,q_),Ds.set(0,0,-1).applyQuaternion(Ld),Us.set(0,1,0).applyQuaternion(Ld),t.positionX){let n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(Ls.x,n),t.positionY.linearRampToValueAtTime(Ls.y,n),t.positionZ.linearRampToValueAtTime(Ls.z,n),t.forwardX.linearRampToValueAtTime(Ds.x,n),t.forwardY.linearRampToValueAtTime(Ds.y,n),t.forwardZ.linearRampToValueAtTime(Ds.z,n),t.upX.linearRampToValueAtTime(Us.x,n),t.upY.linearRampToValueAtTime(Us.y,n),t.upZ.linearRampToValueAtTime(Us.z,n)}else t.setPosition(Ls.x,Ls.y,Ls.z),t.setOrientation(Ds.x,Ds.y,Ds.z,Us.x,Us.y,Us.z)}},gl=class extends Ct{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){Pe("Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;let t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(Pe("Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){Pe("Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}copy(e,t){return super.copy(e,t),e.sourceType!=="buffer"?(Pe("Audio: Audio source type cannot be copied."),this):(this.autoplay=e.autoplay,this.buffer=e.buffer,this.detune=e.detune,this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.offset=e.offset,this.duration=e.duration,this.playbackRate=e.playbackRate,this.hasPlaybackControl=e.hasPlaybackControl,this.sourceType=e.sourceType,this.filters=e.filters.slice(),this)}clone(e){return new this.constructor(this.listener).copy(this,e)}},Ns=new E,hm=new Jt,Z_=new E,Fs=new E,Hh=class extends gl{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(Ns,hm,Z_),Fs.set(0,0,1).applyQuaternion(hm);let t=this.panner;if(t.positionX){let n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(Ns.x,n),t.positionY.linearRampToValueAtTime(Ns.y,n),t.positionZ.linearRampToValueAtTime(Ns.z,n),t.orientationX.linearRampToValueAtTime(Fs.x,n),t.orientationY.linearRampToValueAtTime(Fs.y,n),t.orientationZ.linearRampToValueAtTime(Fs.z,n)}else t.setPosition(Ns.x,Ns.y,Ns.z),t.setOrientation(Fs.x,Fs.y,Fs.z)}},Gh=class{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0,t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}},_l=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,a;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,r=e*i+i,a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=t}else{a+=t;let o=t/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,a=i;r!==a;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){Jt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){let a=this._workIndex*r;Jt.multiplyQuaternionsFlat(e,a,e,t,e,n),Jt.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,r){let a=1-i;for(let o=0;o!==r;++o){let l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,r){for(let a=0;a!==r;++a){let o=t+a;e[o]=e[o]+e[n+a]*i}}},Of="\\[\\]\\.:\\/",J_=new RegExp("["+Of+"]","g"),Bf="[^"+Of+"]",K_="[^"+Of.replace("\\.","")+"]",$_=/((?:WC+[\/:])*)/.source.replace("WC",Bf),j_=/(WCOD+)?/.source.replace("WCOD",K_),Q_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Bf),ex=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Bf),tx=new RegExp("^"+$_+j_+Q_+ex+"$"),nx=["material","materials","bones","map"],Yd=class{constructor(e,t,n){let i=n||Ut.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Ut=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(J_,"")}static parseTrackName(e){let t=tx.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);nx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Pe("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){$e("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){$e("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){$e("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){$e("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){$e("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){$e("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){$e("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[i];if(a===void 0){let c=t.nodeName;$e("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){$e("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){$e("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ut.Composite=Yd;Ut.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ut.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ut.prototype.GetterByBindingType=[Ut.prototype._getValue_direct,Ut.prototype._getValue_array,Ut.prototype._getValue_arrayElement,Ut.prototype._getValue_toArray];Ut.prototype.SetterByBindingTypeAndVersioning=[[Ut.prototype._setValue_direct,Ut.prototype._setValue_direct_setNeedsUpdate,Ut.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_array,Ut.prototype._setValue_array_setNeedsUpdate,Ut.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_arrayElement,Ut.prototype._setValue_arrayElement_setNeedsUpdate,Ut.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ut.prototype._setValue_fromArray,Ut.prototype._setValue_fromArray_setNeedsUpdate,Ut.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Wh=class{constructor(){this.isAnimationObjectGroup=!0,this.uuid=kn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;let e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};let t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){let e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,r=this._bindings,a=r.length,o,l=e.length,c=this.nCachedObjects_;for(let h=0,d=arguments.length;h!==d;++h){let u=arguments[h],f=u.uuid,p=t[f];if(p===void 0){p=l++,t[f]=p,e.push(u);for(let _=0,g=a;_!==g;++_)r[_].push(new Ut(u,n[_],i[_]))}else if(p<c){o=e[p];let _=--c,g=e[_];t[g.uuid]=p,e[p]=g,t[f]=_,e[_]=u;for(let m=0,y=a;m!==y;++m){let b=r[m],x=b[_],A=b[p];b[p]=x,A===void 0&&(A=new Ut(u,n[m],i[m])),b[_]=A}}else e[p]!==o&&$e("AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=c}remove(){let e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_;for(let a=0,o=arguments.length;a!==o;++a){let l=arguments[a],c=l.uuid,h=t[c];if(h!==void 0&&h>=r){let d=r++,u=e[d];t[u.uuid]=h,e[h]=u,t[c]=d,e[d]=l;for(let f=0,p=i;f!==p;++f){let _=n[f],g=_[d],m=_[h];_[h]=g,_[d]=m}}}this.nCachedObjects_=r}uncache(){let e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_,a=e.length;for(let o=0,l=arguments.length;o!==l;++o){let c=arguments[o],h=c.uuid,d=t[h];if(d!==void 0)if(delete t[h],d<r){let u=--r,f=e[u],p=--a,_=e[p];d!==u&&(t[f.uuid]=d),e[d]=f,u!==p&&(t[_.uuid]=u),e[u]=_,e.pop();for(let g=0,m=i;g!==m;++g){let y=n[g],b=y[u],x=y[p];y[d]=b,y[u]=x,y.pop()}}else{let u=--a,f=e[u];d!==u&&(t[f.uuid]=d),e[d]=f,e.pop();for(let p=0,_=i;p!==_;++p){let g=n[p];g[d]=g[u],g.pop()}}}this.nCachedObjects_=r}subscribe_(e,t){let n=this._bindingsIndicesByPath,i=n[e],r=this._bindings;if(i!==void 0)return r[i];let a=this._paths,o=this._parsedPaths,l=this._objects,c=l.length,h=this.nCachedObjects_,d=new Array(c);i=r.length,n[e]=i,a.push(e),o.push(t),r.push(d);for(let u=h,f=l.length;u!==f;++u){let p=l[u];d[u]=new Ut(p,e,t)}return d}unsubscribe_(e){let t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){let i=this._paths,r=this._parsedPaths,a=this._bindings,o=a.length-1,l=a[o],c=i[o];t[c]=n,a[n]=l,a.pop(),r[n]=r[o],r.pop(),i[n]=i[o],i.pop()}}},xl=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let r=t.tracks,a=r.length,o=new Array(a),l={endingStart:ls,endingEnd:ls};for(let c=0;c!==a;++c){let h=r[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=Sf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let i=this._clip.duration,r=e._clip.duration,a=r/i,o=i/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,r=i.time,a=this.timeScale,o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);let l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let a=this._updateTime(t),o=this._updateWeight(e);if(o>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Lu:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case ic:default:for(let h=0,d=l.length;h!==d;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,r=this._loopCount,a=n===Mf;if(e===0)return r===-1?i:a&&(r&1)===1?t-i:i;if(n===vf){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){let o=Math.floor(i/t);i-=t*o,r+=Math.abs(o);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=r,this.time=i;if(a&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=cs,i.endingEnd=cs):(e?i.endingStart=this.zeroSlopeAtStart?cs:ls:i.endingStart=Wr,t?i.endingEnd=this.zeroSlopeAtEnd?cs:ls:i.endingEnd=Wr)}_scheduleFading(e,t,n){let i=this._mixer,r=i.time,a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);let o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=t,o[1]=r+e,l[1]=n,this}},ix=new Float32Array(1),Xh=class extends Nn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let d=0;d!==r;++d){let u=i[d],f=u.name,p=h[f];if(p!==void 0)++p.referenceCount,a[d]=p;else{if(p=a[d],p!==void 0){p._cacheIndex===null&&(++p.referenceCount,this._addInactiveBinding(p,l,f));continue}let _=t&&t._propertyBindings[d].binding.parsedPath;p=new _l(Ut.create(n,f,_),u.ValueTypeName,u.getValueSize()),++p.referenceCount,this._addInactiveBinding(p,l,f),a[d]=p}o[d].resultBuffer=p.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,r=this._actionsByClip,a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{let o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let d=o.actionByRoot,u=(e._localRoot||this._root).uuid;delete d[u],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,r=this._bindings,a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new da(new Float32Array(2),new Float32Array(2),1,ix),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let i=t||this._root,r=i.uuid,a=typeof e=="string"?xs.findByName(i,e):e,o=a!==null?a.uuid:e,l=this._actionsByClip[o],c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=ic),l!==void 0){let d=l.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;let h=new xl(this,a,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,r),h}existingAction(e,t){let n=t||this._root,i=n.uuid,r=typeof e=="string"?xs.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,a);let o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){let c=a[o];this._deactivateAction(c);let h=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=h,t[h]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let a in n){let o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(let a in r){let o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}},Yh=class extends Jr{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isRenderTarget3D=!0,this.depth=n;for(let r=0;r<this.textures.length;r++){let a=new ks(null,e,t,n);a.isRenderTargetTexture=!0,a.renderTarget=this,this.textures[r]=a}this._setTextureOptions(i)}},qh=class s{constructor(e){this.value=e}clone(){return new s(this.value.clone===void 0?this.value:this.value.clone())}},sx=0,Zh=class extends Nn{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:sx++}),this.name="",this.usage=ac,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){let t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(e){this.name=e.name,this.usage=e.usage;let t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){let r=Array.isArray(t[n])?t[n]:[t[n]];for(let a=0;a<r.length;a++)this.uniforms.push(r[a].clone())}return this}clone(){return new this.constructor().copy(this)}},Yi=class extends Xs{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}},Jh=class{constructor(e,t,n,i,r,a=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=r,this.normalized=a,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}},um=new ct,ya=class{constructor(e,t,n=0,i=1/0){this.ray=new ci(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Hs,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):$e("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return um.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(um),this}intersectObject(e,t=!0,n=[]){return qd(e,this,n,t),n.sort(dm),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)qd(e[i],this,n,t);return n.sort(dm),n}};function dm(s,e){return s.distance-e.distance}function qd(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let a=0,o=r.length;a<o;a++)qd(r[a],e,t,!0)}}var Kh=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Pe("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}},or=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=ht(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(ht(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},$h=class{constructor(e=1,t=0,n=0){this.radius=e,this.theta=t,this.y=n}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}},jh=class s{static{s.prototype.isMatrix2=!0}constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}},fm=new ce,yl=class{constructor(e=new ce(1/0,1/0),t=new ce(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=fm.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fm).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},pm=new E,rh=new E,Or=new E,Br=new E,Dd=new E,rx=new E,ax=new E,va=class{constructor(e=new E,t=new E){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){pm.subVectors(e,this.start),rh.subVectors(this.end,this.start);let n=rh.dot(rh);if(n===0)return 0;let r=rh.dot(pm)/n;return t&&(r=ht(r,0,1)),r}closestPointToPoint(e,t,n){let i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=rx,n=ax){let i=10000000000000001e-32,r,a,o=this.start,l=e.start,c=this.end,h=e.end;Or.subVectors(c,o),Br.subVectors(h,l),Dd.subVectors(o,l);let d=Or.dot(Or),u=Br.dot(Br),f=Br.dot(Dd);if(d<=i&&u<=i)return t.copy(o),n.copy(l),t.sub(n),t.dot(t);if(d<=i)r=0,a=f/u,a=ht(a,0,1);else{let p=Or.dot(Dd);if(u<=i)a=0,r=ht(-p/d,0,1);else{let _=Or.dot(Br),g=d*u-_*_;g!==0?r=ht((_*f-p*u)/g,0,1):r=0,a=(_*r+f)/u,a<0?(a=0,r=ht(-p/d,0,1)):a>1&&(a=1,r=ht((_-p)/d,0,1))}}return t.copy(o).addScaledVector(Or,r),n.copy(l).addScaledVector(Br,a),t.distanceToSquared(n)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}},mm=new E,Qh=class extends Ct{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";let n=new pt,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let a=0,o=1,l=32;a<l;a++,o++){let c=a/l*Math.PI*2,h=o/l*Math.PI*2;i.push(Math.cos(c),Math.sin(c),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new ke(i,3));let r=new jt({fog:!1,toneMapped:!1});this.cone=new Rn(n,r),this.add(this.cone),this.update()}dispose(){super.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorldNeedsUpdate=!0;let e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),mm.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(mm),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}},os=new E,ah=new ct,Ud=new ct,eu=class extends Rn{constructor(e){let t=Ag(e),n=new pt,i=[],r=[];for(let c=0;c<t.length;c++){let h=t[c];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(0,0,0),r.push(0,0,0))}n.setAttribute("position",new ke(i,3)),n.setAttribute("color",new ke(r,3));let a=new jt({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,a),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1;let o=new ze(255),l=new ze(65280);this.setColors(o,l)}updateMatrixWorld(e){let t=this.bones,n=this.geometry,i=n.getAttribute("position");Ud.copy(this.root.matrixWorld).invert();for(let r=0,a=0;r<t.length;r++){let o=t[r];o.parent&&o.parent.isBone&&(ah.multiplyMatrices(Ud,o.matrixWorld),os.setFromMatrixPosition(ah),i.setXYZ(a,os.x,os.y,os.z),ah.multiplyMatrices(Ud,o.parent.matrixWorld),os.setFromMatrixPosition(ah),i.setXYZ(a+1,os.x,os.y,os.z),a+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}setColors(e,t){let i=this.geometry.getAttribute("color");for(let r=0;r<i.count;r+=2)i.setXYZ(r,e.r,e.g,e.b),i.setXYZ(r+1,t.r,t.g,t.b);return i.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function Ag(s){let e=[];s.isBone===!0&&e.push(s);for(let t=0;t<s.children.length;t++)e.push(...Ag(s.children[t]));return e}var tu=class extends Ot{constructor(e,t,n){let i=new fi(t,4,2),r=new Ht({wireframe:!0,fog:!1,toneMapped:!1});super(i,r),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}},ox=new E,gm=new ze,_m=new ze,nu=class extends Ct{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";let i=new la(t);i.rotateY(Math.PI*.5),this.material=new Ht({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);let r=i.getAttribute("position"),a=new Float32Array(r.count*3);i.setAttribute("color",new Nt(a,3)),this.add(new Ot(i,this.material)),this.update()}dispose(){super.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){let e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{let t=e.geometry.getAttribute("color");gm.copy(this.light.color),_m.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){let r=n<i/2?gm:_m;t.setXYZ(n,r.r,r.g,r.b)}t.needsUpdate=!0}this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),e.lookAt(ox.setFromMatrixPosition(this.light.matrixWorld).negate())}},iu=class extends Rn{constructor(e=10,t=10,n=4473924,i=8947848){n=new ze(n),i=new ze(i);let r=t/2,a=e/t,o=e/2,l=[],c=[];for(let u=0,f=0,p=-o;u<=t;u++,p+=a){l.push(-o,0,p,o,0,p),l.push(p,0,-o,p,0,o);let _=u===r?n:i;_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3,_.toArray(c,f),f+=3}let h=new pt;h.setAttribute("position",new ke(l,3)),h.setAttribute("color",new ke(c,3));let d=new jt({vertexColors:!0,toneMapped:!1});super(h,d),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},su=class extends Rn{constructor(e=10,t=16,n=8,i=64,r=4473924,a=8947848){r=new ze(r),a=new ze(a);let o=[],l=[];if(t>1)for(let d=0;d<t;d++){let u=d/t*(Math.PI*2),f=Math.sin(u)*e,p=Math.cos(u)*e;o.push(0,0,0),o.push(f,0,p);let _=d&1?r:a;l.push(_.r,_.g,_.b),l.push(_.r,_.g,_.b)}for(let d=0;d<n;d++){let u=d&1?r:a,f=e-e/n*d;for(let p=0;p<i;p++){let _=p/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f;o.push(g,0,m),l.push(u.r,u.g,u.b),_=(p+1)/i*(Math.PI*2),g=Math.sin(_)*f,m=Math.cos(_)*f,o.push(g,0,m),l.push(u.r,u.g,u.b)}}let c=new pt;c.setAttribute("position",new ke(o,3)),c.setAttribute("color",new ke(l,3));let h=new jt({vertexColors:!0,toneMapped:!1});super(c,h),this.type="PolarGridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},xm=new E,oh=new E,ym=new E,ru=class extends Ct{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new pt;i.setAttribute("position",new ke([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));let r=new jt({fog:!1,toneMapped:!1});this.lightPlane=new hi(i,r),this.add(this.lightPlane),i=new pt,i.setAttribute("position",new ke([0,0,0,0,0,1],3)),this.targetLine=new hi(i,r),this.add(this.targetLine),this.update()}dispose(){super.dispose(),this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.matrixWorldNeedsUpdate=!0,this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),xm.setFromMatrixPosition(this.light.matrixWorld),oh.setFromMatrixPosition(this.light.target.matrixWorld),ym.subVectors(oh,xm),this.lightPlane.lookAt(oh),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(oh),this.targetLine.scale.z=ym.length()}},lh=new E,Wt=new rr,au=class extends Rn{constructor(e){let t=new pt,n=new jt({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],r=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(p,_){l(p),l(_)}function l(p){i.push(0,0,0),r.push(0,0,0),a[p]===void 0&&(a[p]=[]),a[p].push(i.length/3-1)}t.setAttribute("position",new ke(i,3)),t.setAttribute("color",new ke(r,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();let c=new ze(16755200),h=new ze(16711680),d=new ze(43775),u=new ze(16777215),f=new ze(3355443);this.setColors(c,h,d,u,f)}setColors(e,t,n,i,r){let o=this.geometry.getAttribute("color");return o.setXYZ(0,e.r,e.g,e.b),o.setXYZ(1,e.r,e.g,e.b),o.setXYZ(2,e.r,e.g,e.b),o.setXYZ(3,e.r,e.g,e.b),o.setXYZ(4,e.r,e.g,e.b),o.setXYZ(5,e.r,e.g,e.b),o.setXYZ(6,e.r,e.g,e.b),o.setXYZ(7,e.r,e.g,e.b),o.setXYZ(8,e.r,e.g,e.b),o.setXYZ(9,e.r,e.g,e.b),o.setXYZ(10,e.r,e.g,e.b),o.setXYZ(11,e.r,e.g,e.b),o.setXYZ(12,e.r,e.g,e.b),o.setXYZ(13,e.r,e.g,e.b),o.setXYZ(14,e.r,e.g,e.b),o.setXYZ(15,e.r,e.g,e.b),o.setXYZ(16,e.r,e.g,e.b),o.setXYZ(17,e.r,e.g,e.b),o.setXYZ(18,e.r,e.g,e.b),o.setXYZ(19,e.r,e.g,e.b),o.setXYZ(20,e.r,e.g,e.b),o.setXYZ(21,e.r,e.g,e.b),o.setXYZ(22,e.r,e.g,e.b),o.setXYZ(23,e.r,e.g,e.b),o.setXYZ(24,t.r,t.g,t.b),o.setXYZ(25,t.r,t.g,t.b),o.setXYZ(26,t.r,t.g,t.b),o.setXYZ(27,t.r,t.g,t.b),o.setXYZ(28,t.r,t.g,t.b),o.setXYZ(29,t.r,t.g,t.b),o.setXYZ(30,t.r,t.g,t.b),o.setXYZ(31,t.r,t.g,t.b),o.setXYZ(32,n.r,n.g,n.b),o.setXYZ(33,n.r,n.g,n.b),o.setXYZ(34,n.r,n.g,n.b),o.setXYZ(35,n.r,n.g,n.b),o.setXYZ(36,n.r,n.g,n.b),o.setXYZ(37,n.r,n.g,n.b),o.setXYZ(38,i.r,i.g,i.b),o.setXYZ(39,i.r,i.g,i.b),o.setXYZ(40,r.r,r.g,r.b),o.setXYZ(41,r.r,r.g,r.b),o.setXYZ(42,r.r,r.g,r.b),o.setXYZ(43,r.r,r.g,r.b),o.setXYZ(44,r.r,r.g,r.b),o.setXYZ(45,r.r,r.g,r.b),o.setXYZ(46,r.r,r.g,r.b),o.setXYZ(47,r.r,r.g,r.b),o.setXYZ(48,r.r,r.g,r.b),o.setXYZ(49,r.r,r.g,r.b),o.needsUpdate=!0,this}update(){let e=this.geometry,t=this.pointMap,n=1,i=1,r,a;if(Wt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)r=1,a=0;else if(this.camera.coordinateSystem===Un)r=-1,a=1;else if(this.camera.coordinateSystem===hs)r=0,a=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);Zt("c",t,e,Wt,0,0,r),Zt("t",t,e,Wt,0,0,a),Zt("n1",t,e,Wt,-n,-i,r),Zt("n2",t,e,Wt,n,-i,r),Zt("n3",t,e,Wt,-n,i,r),Zt("n4",t,e,Wt,n,i,r),Zt("f1",t,e,Wt,-n,-i,a),Zt("f2",t,e,Wt,n,-i,a),Zt("f3",t,e,Wt,-n,i,a),Zt("f4",t,e,Wt,n,i,a),Zt("u1",t,e,Wt,n*.7,i*1.1,r),Zt("u2",t,e,Wt,-n*.7,i*1.1,r),Zt("u3",t,e,Wt,0,i*2,r),Zt("cf1",t,e,Wt,-n,0,a),Zt("cf2",t,e,Wt,n,0,a),Zt("cf3",t,e,Wt,0,-i,a),Zt("cf4",t,e,Wt,0,i,a),Zt("cn1",t,e,Wt,-n,0,r),Zt("cn2",t,e,Wt,n,0,r),Zt("cn3",t,e,Wt,0,-i,r),Zt("cn4",t,e,Wt,0,i,r),e.getAttribute("position").needsUpdate=!0}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}};function Zt(s,e,t,n,i,r,a){lh.set(i,r,a).unproject(n);let o=e[s];if(o!==void 0){let l=t.getAttribute("position");for(let c=0,h=o.length;c<h;c++)l.setXYZ(o[c],lh.x,lh.y,lh.z)}}var ch=new Vt,ou=class extends Rn{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),r=new pt;r.setIndex(new Nt(n,1)),r.setAttribute("position",new Nt(i,3)),super(r,new jt({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&ch.setFromObject(this.object),ch.isEmpty())return;let e=ch.min,t=ch.max,n=this.geometry.attributes.position,i=n.array;i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=e.x,i[4]=t.y,i[5]=t.z,i[6]=e.x,i[7]=e.y,i[8]=t.z,i[9]=t.x,i[10]=e.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=e.z,i[15]=e.x,i[16]=t.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=t.x,i[22]=e.y,i[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},lu=class extends Rn{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new pt;r.setIndex(new Nt(n,1)),r.setAttribute("position",new ke(i,3)),super(r,new jt({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){let t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},cu=class extends hi{constructor(e,t=1,n=16776960){let i=n,r=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],a=new pt;a.setAttribute("position",new ke(r,3)),a.computeBoundingSphere(),super(a,new jt({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;let o=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],l=new pt;l.setAttribute("position",new ke(o,3)),l.computeBoundingSphere(),this.add(new Ot(l,new Ht({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}},vm=new E,hh,Nd,hu=class extends Ct{constructor(e=new E(0,0,1),t=new E(0,0,0),n=1,i=16776960,r=n*.2,a=r*.2){super(),this.type="ArrowHelper",hh===void 0&&(hh=new pt,hh.setAttribute("position",new ke([0,0,0,0,1,0],3)),Nd=new na(.5,1,5,1),Nd.translate(0,-.5,0)),this.position.copy(t),this.line=new hi(hh,new jt({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new Ot(Nd,new Ht({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,a)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{vm.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(vm,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){super.dispose(),this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},uu=class extends Rn{constructor(e=1){let t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new pt;i.setAttribute("position",new ke(t,3)),i.setAttribute("color",new ke(n,3));let r=new jt({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,t,n){let i=new ze,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(t),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},du=class{constructor(){this.type="ShapePath",this.color=new ze,this.subPaths=[],this.currentPath=null,this.userData={}}moveTo(e,t){return this.currentPath=new gs,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,r,a){return this.currentPath.bezierCurveTo(e,t,n,i,r,a),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(){function e(l,c){let h=!1,d=c.length;for(let u=0,f=d-1;u<d;f=u++){let p=c[u],_=c[f];p.y>l.y!=_.y>l.y&&l.x<(_.x-p.x)*(l.y-p.y)/(_.y-p.y)+p.x&&(h=!h)}return h}function t(l,c){let h=c.getCenter(new ce);if(e(h,l))return h;let d=h.y,u=[],f=l.length;for(let p=0;p<f;p++){let _=l[p],g=l[(p+1)%f];if(_.y>d!=g.y>d){let m=_.x+(d-_.y)*(g.x-_.x)/(g.y-_.y);u.push(m)}}return u.length>1&&(u.sort((p,_)=>p-_),h.x=(u[0]+u[1])/2),h}let n=this.userData.style&&this.userData.style.fillRule||"nonzero";n!=="nonzero"&&n!=="evenodd"&&(Pe('Fill-rule "'+n+'" is not supported, falling back to "nonzero".'),n="nonzero");let i=n==="nonzero"?(l=>l!==0):(l=>(l&1)!==0),r=[];for(let l of this.subPaths){let c=l.getPoints();if(c.length<3)continue;let h=Zn.area(c);if(h===0)continue;let d=new yl;for(let u=0;u<c.length;u++)d.expandByPoint(c[u]);r.push({subPath:l,points:c,boundingBox:d,interiorPoint:t(c,d),absArea:Math.abs(h),winding:h<0?-1:1,container:null,exclude:!1,role:null})}r.sort((l,c)=>c.absArea-l.absArea);for(let l=0;l<r.length;l++){let c=r[l],h=0;for(let d=l-1;d>=0;d--){let u=r[d];if(u.boundingBox.containsBox(c.boundingBox)&&e(c.interiorPoint,u.points)){c.container=u.exclude?u.container:u,h=u.winding,c.winding+=h;break}}i(c.winding)===i(h)&&(c.exclude=!0)}for(let l of r)l.exclude||(l.role=l.container===null||l.container.role==="hole"?"outer":"hole");let a=[],o=new Map;for(let l of r){if(l.exclude||l.role!=="outer")continue;let c=new _s;c.curves=l.subPath.curves,a.push(c),o.set(l,c)}for(let l of r){if(l.exclude||l.role!=="hole")continue;let c=o.get(l.container);if(!c)continue;let h=new gs;h.curves=l.subPath.curves,c.holes.push(h)}return a}},Sa=class extends Nn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function lx(s,e){let t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2):(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0),s}function cx(s,e){let t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0):(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2),s}function hx(s){return s.repeat.x=1,s.repeat.y=1,s.offset.x=0,s.offset.y=0,s}function Uu(s,e,t,n){let i=ux(n);switch(t){case Pu:return s*e;case El:return s*e/i.components*i.byteLength;case Ca:return s*e/i.components*i.byteLength;case ji:return s*e*2/i.components*i.byteLength;case wl:return s*e*2/i.components*i.byteLength;case Iu:return s*e*3/i.components*i.byteLength;case yn:return s*e*4/i.components*i.byteLength;case Tl:return s*e*4/i.components*i.byteLength;case Pa:case Ia:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case La:case Da:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Rl:case Pl:return Math.max(s,16)*Math.max(e,8)/4;case Al:case Cl:return Math.max(s,8)*Math.max(e,8)/2;case Il:case Ll:case Ul:case Nl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Dl:case Ua:case Fl:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ol:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Bl:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case zl:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Vl:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case kl:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Hl:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Gl:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case Wl:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Xl:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Yl:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case ql:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Zl:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case Jl:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case Kl:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case $l:case jl:case Ql:return Math.ceil(s/4)*Math.ceil(e/4)*16;case ec:case tc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Na:case nc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ux(s){switch(s){case Pn:case Tu:return{byteLength:1,components:1};case dr:case Au:case jn:return{byteLength:2,components:1};case Ml:case bl:return{byteLength:2,components:4};case Gn:case Sl:case xn:return{byteLength:4,components:1};case Ru:case Cu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}var fu=class{static contain(e,t){return lx(e,t)}static cover(e,t){return cx(e,t)}static fill(e){return hx(e)}static getByteLength(e,t,n,i){return Uu(e,t,n,i)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function Jg(){let s=null,e=!1,t=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),t(r,a)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function dx(s){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,d=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){let h=l.array,d=l.updateRanges;if(s.bindBuffer(c,o),d.length===0)s.bufferSubData(c,0,h);else{d.sort((f,p)=>f.start-p.start);let u=0;for(let f=1;f<d.length;f++){let p=d[u],_=d[f];_.start<=p.start+p.count+1?p.count=Math.max(p.count,_.start+_.count-p.start):(++u,d[u]=_)}d.length=u+1;for(let f=0,p=d.length;f<p;f++){let _=d[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var fx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,px=`#ifdef USE_ALPHAHASH
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
#endif`,mx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_x=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,xx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yx=`#ifdef USE_AOMAP
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
#endif`,vx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Sx=`#ifdef USE_BATCHING
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
#endif`,Mx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ex=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Tx=`#ifdef USE_IRIDESCENCE
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
#endif`,Ax=`#ifdef USE_BUMPMAP
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
#endif`,Rx=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Cx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Px=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ix=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Dx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ux=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Nx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Fx=`#define PI 3.141592653589793
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
} // validated`,Ox=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Bx=`vec3 transformedNormal = objectNormal;
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
#endif`,zx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xx=`#ifdef USE_ENVMAP
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
#endif`,Yx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,qx=`#ifdef USE_ENVMAP
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
#endif`,Zx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Jx=`#ifdef USE_ENVMAP
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
#endif`,Kx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,$x=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ey=`#ifdef USE_GRADIENTMAP
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
}`,ty=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ny=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,iy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sy=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,ry=`#ifdef USE_ENVMAP
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
#endif`,ay=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,oy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ly=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hy=`PhysicalMaterial material;
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
#endif`,uy=`uniform sampler2D dfgLUT;
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
}`,dy=`
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
#endif`,fy=`#if defined( RE_IndirectDiffuse )
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
#endif`,py=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,my=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,gy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_y=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sy=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,My=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,by=`#if defined( USE_POINTS_UV )
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
#endif`,Ey=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wy=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ty=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ay=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ry=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cy=`#ifdef USE_MORPHTARGETS
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
#endif`,Py=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Iy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ly=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Dy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ny=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Fy=`#ifdef USE_NORMALMAP
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
#endif`,Oy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,By=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ky=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Gy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yy=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Jy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ky=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,$y=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,jy=`float getShadowMask() {
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
}`,Qy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ev=`#ifdef USE_SKINNING
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
#endif`,tv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,nv=`#ifdef USE_SKINNING
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
#endif`,iv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,sv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,rv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,av=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ov=`#ifdef USE_TRANSMISSION
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
#endif`,lv=`#ifdef USE_TRANSMISSION
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
#endif`,cv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,fv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pv=`uniform sampler2D t2D;
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
}`,mv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,_v=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yv=`#include <common>
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
}`,vv=`#if DEPTH_PACKING == 3200
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
}`,Sv=`#define DISTANCE
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
}`,Mv=`#define DISTANCE
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
}`,bv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ev=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wv=`uniform float scale;
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
}`,Tv=`uniform vec3 diffuse;
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
}`,Av=`#include <common>
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
}`,Rv=`uniform vec3 diffuse;
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
}`,Cv=`#define LAMBERT
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
}`,Pv=`#define LAMBERT
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
}`,Iv=`#define MATCAP
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
}`,Lv=`#define MATCAP
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
}`,Dv=`#define NORMAL
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
}`,Uv=`#define NORMAL
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
}`,Nv=`#define PHONG
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
}`,Fv=`#define PHONG
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
}`,Ov=`#define STANDARD
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
}`,Bv=`#define STANDARD
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
}`,zv=`#define TOON
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
}`,Vv=`#define TOON
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
}`,kv=`uniform float size;
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
}`,Hv=`uniform vec3 diffuse;
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
}`,Gv=`#include <common>
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
}`,Wv=`uniform vec3 color;
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
}`,Xv=`uniform float rotation;
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
}`,Yv=`uniform vec3 diffuse;
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
}`,yt={alphahash_fragment:fx,alphahash_pars_fragment:px,alphamap_fragment:mx,alphamap_pars_fragment:gx,alphatest_fragment:_x,alphatest_pars_fragment:xx,aomap_fragment:yx,aomap_pars_fragment:vx,batching_pars_vertex:Sx,batching_vertex:Mx,begin_vertex:bx,beginnormal_vertex:Ex,bsdfs:wx,iridescence_fragment:Tx,bumpmap_pars_fragment:Ax,clipping_planes_fragment:Rx,clipping_planes_pars_fragment:Cx,clipping_planes_pars_vertex:Px,clipping_planes_vertex:Ix,color_fragment:Lx,color_pars_fragment:Dx,color_pars_vertex:Ux,color_vertex:Nx,common:Fx,cube_uv_reflection_fragment:Ox,defaultnormal_vertex:Bx,displacementmap_pars_vertex:zx,displacementmap_vertex:Vx,emissivemap_fragment:kx,emissivemap_pars_fragment:Hx,colorspace_fragment:Gx,colorspace_pars_fragment:Wx,envmap_fragment:Xx,envmap_common_pars_fragment:Yx,envmap_pars_fragment:qx,envmap_pars_vertex:Zx,envmap_physical_pars_fragment:ry,envmap_vertex:Jx,fog_vertex:Kx,fog_pars_vertex:$x,fog_fragment:jx,fog_pars_fragment:Qx,gradientmap_pars_fragment:ey,lightmap_pars_fragment:ty,lights_lambert_fragment:ny,lights_lambert_pars_fragment:iy,lights_pars_begin:sy,lights_toon_fragment:ay,lights_toon_pars_fragment:oy,lights_phong_fragment:ly,lights_phong_pars_fragment:cy,lights_physical_fragment:hy,lights_physical_pars_fragment:uy,lights_fragment_begin:dy,lights_fragment_maps:fy,lights_fragment_end:py,lightprobes_pars_fragment:my,logdepthbuf_fragment:gy,logdepthbuf_pars_fragment:_y,logdepthbuf_pars_vertex:xy,logdepthbuf_vertex:yy,map_fragment:vy,map_pars_fragment:Sy,map_particle_fragment:My,map_particle_pars_fragment:by,metalnessmap_fragment:Ey,metalnessmap_pars_fragment:wy,morphinstance_vertex:Ty,morphcolor_vertex:Ay,morphnormal_vertex:Ry,morphtarget_pars_vertex:Cy,morphtarget_vertex:Py,normal_fragment_begin:Iy,normal_fragment_maps:Ly,normal_pars_fragment:Dy,normal_pars_vertex:Uy,normal_vertex:Ny,normalmap_pars_fragment:Fy,clearcoat_normal_fragment_begin:Oy,clearcoat_normal_fragment_maps:By,clearcoat_pars_fragment:zy,iridescence_pars_fragment:Vy,opaque_fragment:ky,packing:Hy,premultiplied_alpha_fragment:Gy,project_vertex:Wy,dithering_fragment:Xy,dithering_pars_fragment:Yy,roughnessmap_fragment:qy,roughnessmap_pars_fragment:Zy,shadowmap_pars_fragment:Jy,shadowmap_pars_vertex:Ky,shadowmap_vertex:$y,shadowmask_pars_fragment:jy,skinbase_vertex:Qy,skinning_pars_vertex:ev,skinning_vertex:tv,skinnormal_vertex:nv,specularmap_fragment:iv,specularmap_pars_fragment:sv,tonemapping_fragment:rv,tonemapping_pars_fragment:av,transmission_fragment:ov,transmission_pars_fragment:lv,uv_pars_fragment:cv,uv_pars_vertex:hv,uv_vertex:uv,worldpos_vertex:dv,background_vert:fv,background_frag:pv,backgroundCube_vert:mv,backgroundCube_frag:gv,cube_vert:_v,cube_frag:xv,depth_vert:yv,depth_frag:vv,distance_vert:Sv,distance_frag:Mv,equirect_vert:bv,equirect_frag:Ev,linedashed_vert:wv,linedashed_frag:Tv,meshbasic_vert:Av,meshbasic_frag:Rv,meshlambert_vert:Cv,meshlambert_frag:Pv,meshmatcap_vert:Iv,meshmatcap_frag:Lv,meshnormal_vert:Dv,meshnormal_frag:Uv,meshphong_vert:Nv,meshphong_frag:Fv,meshphysical_vert:Ov,meshphysical_frag:Bv,meshtoon_vert:zv,meshtoon_frag:Vv,points_vert:kv,points_frag:Hv,shadow_vert:Gv,shadow_frag:Wv,sprite_vert:Xv,sprite_frag:Yv},Ce={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},envMapRotation:{value:new dt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new ce(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new E},probesMax:{value:new E},probesResolution:{value:new E}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new ce(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},bn={basic:{uniforms:Mn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:yt.meshbasic_vert,fragmentShader:yt.meshbasic_frag},lambert:{uniforms:Mn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new ze(0)},envMapIntensity:{value:1}}]),vertexShader:yt.meshlambert_vert,fragmentShader:yt.meshlambert_frag},phong:{uniforms:Mn([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:yt.meshphong_vert,fragmentShader:yt.meshphong_frag},standard:{uniforms:Mn([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag},toon:{uniforms:Mn([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new ze(0)}}]),vertexShader:yt.meshtoon_vert,fragmentShader:yt.meshtoon_frag},matcap:{uniforms:Mn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:yt.meshmatcap_vert,fragmentShader:yt.meshmatcap_frag},points:{uniforms:Mn([Ce.points,Ce.fog]),vertexShader:yt.points_vert,fragmentShader:yt.points_frag},dashed:{uniforms:Mn([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:yt.linedashed_vert,fragmentShader:yt.linedashed_frag},depth:{uniforms:Mn([Ce.common,Ce.displacementmap]),vertexShader:yt.depth_vert,fragmentShader:yt.depth_frag},normal:{uniforms:Mn([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:yt.meshnormal_vert,fragmentShader:yt.meshnormal_frag},sprite:{uniforms:Mn([Ce.sprite,Ce.fog]),vertexShader:yt.sprite_vert,fragmentShader:yt.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:yt.background_vert,fragmentShader:yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new dt}},vertexShader:yt.backgroundCube_vert,fragmentShader:yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:yt.cube_vert,fragmentShader:yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:yt.equirect_vert,fragmentShader:yt.equirect_frag},distance:{uniforms:Mn([Ce.common,Ce.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:yt.distance_vert,fragmentShader:yt.distance_frag},shadow:{uniforms:Mn([Ce.lights,Ce.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:yt.shadow_vert,fragmentShader:yt.shadow_frag}};bn.physical={uniforms:Mn([bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new ce(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new ce},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new ce},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag};var Nu={r:0,b:0,g:0},qv=new ct,Kg=new dt;Kg.set(-1,0,0,0,1,0,0,0,1);function Zv(s,e,t,n,i,r){let a=new ze(0),o=i===!0?0:1,l,c,h=null,d=0,u=null;function f(y){let b=y.isScene===!0?y.background:null;if(b&&b.isTexture){let x=y.backgroundBlurriness>0;b=e.get(b,x)}return b}function p(y){let b=!1,x=f(y);x===null?g(a,o):x&&x.isColor&&(g(x,1),b=!0);let A=s.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(s.autoClear||b)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function _(y,b){let x=f(b);x&&(x.isCubeTexture||x.mapping===hr)?(c===void 0&&(c=new Ot(new Fn(1,1,1),new hn({name:"BackgroundCubeMaterial",uniforms:pr(bn.backgroundCube.uniforms),vertexShader:bn.backgroundCube.vertexShader,fragmentShader:bn.backgroundCube.fragmentShader,side:Sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,T,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(qv.makeRotationFromEuler(b.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Kg),c.material.toneMapped=Mt.getTransfer(x.colorSpace)!==Lt,(h!==x||d!==x.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=x,d=x.version,u=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Ot(new di(2,2),new hn({name:"BackgroundMaterial",uniforms:pr(bn.background.uniforms),vertexShader:bn.background.vertexShader,fragmentShader:bn.background.fragmentShader,side:Ji,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=Mt.getTransfer(x.colorSpace)!==Lt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(h!==x||d!==x.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=x,d=x.version,u=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function g(y,b){y.getRGB(Nu,Nf(s)),t.buffers.color.setClear(Nu.r,Nu.g,Nu.b,b,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,b=1){a.set(y),o=b,g(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,g(a,o)},render:p,addToRenderList:_,dispose:m}}function Jv(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null),r=i,a=!1;function o(N,V,X,O,G){let Y=!1,k=d(N,O,X,V);r!==k&&(r=k,c(r.object)),Y=f(N,O,X,G),Y&&p(N,O,X,G),G!==null&&e.update(G,s.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,x(N,V,X,O),G!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return s.createVertexArray()}function c(N){return s.bindVertexArray(N)}function h(N){return s.deleteVertexArray(N)}function d(N,V,X,O){let G=O.wireframe===!0,Y=n[V.id];Y===void 0&&(Y={},n[V.id]=Y);let k=N.isInstancedMesh===!0?N.id:0,re=Y[k];re===void 0&&(re={},Y[k]=re);let K=re[X.id];K===void 0&&(K={},re[X.id]=K);let te=K[G];return te===void 0&&(te=u(l()),K[G]=te),te}function u(N){let V=[],X=[],O=[];for(let G=0;G<t;G++)V[G]=0,X[G]=0,O[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:X,attributeDivisors:O,object:N,attributes:{},index:null}}function f(N,V,X,O){let G=r.attributes,Y=V.attributes,k=0,re=X.getAttributes();for(let K in re)if(re[K].location>=0){let Q=G[K],Ve=Y[K];if(Ve===void 0&&(K==="instanceMatrix"&&N.instanceMatrix&&(Ve=N.instanceMatrix),K==="instanceColor"&&N.instanceColor&&(Ve=N.instanceColor)),Q===void 0||Q.attribute!==Ve||Ve&&Q.data!==Ve.data)return!0;k++}return r.attributesNum!==k||r.index!==O}function p(N,V,X,O){let G={},Y=V.attributes,k=0,re=X.getAttributes();for(let K in re)if(re[K].location>=0){let Q=Y[K];Q===void 0&&(K==="instanceMatrix"&&N.instanceMatrix&&(Q=N.instanceMatrix),K==="instanceColor"&&N.instanceColor&&(Q=N.instanceColor));let Ve={};Ve.attribute=Q,Q&&Q.data&&(Ve.data=Q.data),G[K]=Ve,k++}r.attributes=G,r.attributesNum=k,r.index=O}function _(){let N=r.newAttributes;for(let V=0,X=N.length;V<X;V++)N[V]=0}function g(N){m(N,0)}function m(N,V){let X=r.newAttributes,O=r.enabledAttributes,G=r.attributeDivisors;X[N]=1,O[N]===0&&(s.enableVertexAttribArray(N),O[N]=1),G[N]!==V&&(s.vertexAttribDivisor(N,V),G[N]=V)}function y(){let N=r.newAttributes,V=r.enabledAttributes;for(let X=0,O=V.length;X<O;X++)V[X]!==N[X]&&(s.disableVertexAttribArray(X),V[X]=0)}function b(N,V,X,O,G,Y,k){k===!0?s.vertexAttribIPointer(N,V,X,G,Y):s.vertexAttribPointer(N,V,X,O,G,Y)}function x(N,V,X,O){_();let G=O.attributes,Y=X.getAttributes(),k=V.defaultAttributeValues;for(let re in Y){let K=Y[re];if(K.location>=0){let te=G[re];if(te===void 0&&(re==="instanceMatrix"&&N.instanceMatrix&&(te=N.instanceMatrix),re==="instanceColor"&&N.instanceColor&&(te=N.instanceColor)),te!==void 0){let Q=te.normalized,Ve=te.itemSize,Me=e.get(te);if(Me===void 0)continue;let bt=Me.buffer,it=Me.type,at=Me.bytesPerElement,ne=it===s.INT||it===s.UNSIGNED_INT||te.gpuType===Sl;if(te.isInterleavedBufferAttribute){let he=te.data,ye=he.stride,Le=te.offset;if(he.isInstancedInterleavedBuffer){for(let De=0;De<K.locationSize;De++)m(K.location+De,he.meshPerAttribute);N.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let De=0;De<K.locationSize;De++)g(K.location+De);s.bindBuffer(s.ARRAY_BUFFER,bt);for(let De=0;De<K.locationSize;De++)b(K.location+De,Ve/K.locationSize,it,Q,ye*at,(Le+Ve/K.locationSize*De)*at,ne)}else{if(te.isInstancedBufferAttribute){for(let he=0;he<K.locationSize;he++)m(K.location+he,te.meshPerAttribute);N.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let he=0;he<K.locationSize;he++)g(K.location+he);s.bindBuffer(s.ARRAY_BUFFER,bt);for(let he=0;he<K.locationSize;he++)b(K.location+he,Ve/K.locationSize,it,Q,Ve*at,Ve/K.locationSize*he*at,ne)}}else if(k!==void 0){let Q=k[re];if(Q!==void 0)switch(Q.length){case 2:s.vertexAttrib2fv(K.location,Q);break;case 3:s.vertexAttrib3fv(K.location,Q);break;case 4:s.vertexAttrib4fv(K.location,Q);break;default:s.vertexAttrib1fv(K.location,Q)}}}}y()}function A(){R();for(let N in n){let V=n[N];for(let X in V){let O=V[X];for(let G in O){let Y=O[G];for(let k in Y)h(Y[k].object),delete Y[k];delete O[G]}}delete n[N]}}function T(N){if(n[N.id]===void 0)return;let V=n[N.id];for(let X in V){let O=V[X];for(let G in O){let Y=O[G];for(let k in Y)h(Y[k].object),delete Y[k];delete O[G]}}delete n[N.id]}function P(N){for(let V in n){let X=n[V];for(let O in X){let G=X[O];if(G[N.id]===void 0)continue;let Y=G[N.id];for(let k in Y)h(Y[k].object),delete Y[k];delete G[N.id]}}}function v(N){for(let V in n){let X=n[V],O=N.isInstancedMesh===!0?N.id:0,G=X[O];if(G!==void 0){for(let Y in G){let k=G[Y];for(let re in k)h(k[re].object),delete k[re];delete G[Y]}delete X[O],Object.keys(X).length===0&&delete n[V]}}}function R(){L(),a=!0,r!==i&&(r=i,c(r.object))}function L(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:R,resetDefaultState:L,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfObject:v,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function Kv(s,e,t){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let f=0;f<h;f++)u+=c[f];t.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function $v(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(P){return!(P!==yn&&n.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let v=P===jn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Pn&&P!==xn&&!v&&n.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(P){if(P==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(Pe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&Pe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),p=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),b=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),A=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:x,maxSamples:A,samples:T}}function jv(s){let e=this,t=null,n=0,i=!1,r=!1,a=new Dn,o=new dt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){let f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){let p=d.clippingPlanes,_=d.clipIntersection,g=d.clipShadows,m=s.get(d);if(!i||p===null||p.length===0||r&&!g)r?h(null):c();else{let y=r?0:n,b=y*4,x=m.clippingState||null;l.value=x,x=h(p,u,b,f);for(let A=0;A!==b;++A)x[A]=t[A];m.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,p){let _=d!==null?d.length:0,g=null;if(_!==0){if(g=l.value,p!==!0||g===null){let m=f+_*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(g===null||g.length<m)&&(g=new Float32Array(m));for(let b=0,x=f;b!==_;++b,x+=4)a.copy(d[b]).applyMatrix4(y,o),a.normal.toArray(g,x),g[x+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}var Ba=4,Qv=6,eS=20,tS=256,oc=new vs,Rg=new ze,zf=null,Vf=0,kf=0,Hf=!1,nS=new E,mr=new E,hc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,r={}){let{size:a=256,position:o=nS}=r;zf=this._renderer.getRenderTarget(),Vf=this._renderer.getActiveCubeFace(),kf=this._renderer.getActiveMipmapLevel(),Hf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ig(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(zf,Vf,kf),this._renderer.xr.enabled=Hf,e.scissorTest=!1,Oa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===xi||e.mapping===Ki?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),zf=this._renderer.getRenderTarget(),Vf=this._renderer.getActiveCubeFace(),kf=this._renderer.getActiveMipmapLevel(),Hf=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:jn,format:yn,colorSpace:Xr,depthBuffer:!1},i=Cg(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cg(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=iS(r)),this._blurMaterial=rS(r,e,t),this._ggxMaterial=sS(r,e,t)}return i}_compileMaterial(e){let t=new Ot(new pt,e);this._renderer.compile(t,oc)}_sceneToCubeUV(e,t,n,i,r){let l=new Xt(90,1,t,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Rg),d.toneMapping=$n,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ot(new Fn,new Ht({name:"PMREM.Background",side:Sn,depthWrite:!1,depthTest:!1})));let _=this._backgroundBox,g=_.material,m=!1,y=e.background;y?y.isColor&&(g.color.copy(y),e.background=null,m=!0):(g.color.copy(Rg),m=!0);for(let b=0;b<6;b++){let x=b%3;x===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[b],r.y,r.z)):x===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[b]));let A=this._cubeSize;Oa(i,x*A,b>2?A:0,A,A),d.setRenderTarget(i),m&&d.render(_,l),d.render(e,l)}d.toneMapping=f,d.autoClear=u,e.background=y}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===xi||e.mapping===Ki;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ig()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pg());let r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Oa(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,oc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=n}_applyGGXFilter(e,t,n){let i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-h*h),u=c*1.25,f=d*u,{_lodMax:p}=this,_=this._sizeLods[n],g=3*_*(n>p-Ba?n-p+Ba:0),m=4*(this._cubeSize-_);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,Oa(r,g,m,3*_,2*_),i.setRenderTarget(r),i.render(o,oc),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-n,Oa(e,g,m,3*_,2*_),i.setRenderTarget(e),i.render(o,oc)}_blur(e,t,n,i){let r=this._pingPongRenderTarget,a=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,n,a),this._blurPass(r,e,n,n,a)}_blurPass(e,t,n,i,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[i];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[i],d=3*h*(i>this._lodMax-Ba?i-this._lodMax+Ba:0),u=4*(this._cubeSize-h);Oa(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(l,oc)}};function iS(s){let e=[],t=[],n=s,i=s-Ba+1+Qv;for(let r=0;r<i;r++){let a=Math.pow(2,n);e.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,u=6,f=3,p=new Float32Array(f*u*d),_=new Float32Array(f*u*d);for(let m=0;m<d;m++){let y=m%3*2/3-1,b=m>2?0:-1,x=[y,b,0,y+2/3,b,0,y+2/3,b+1,0,y,b,0,y+2/3,b+1,0,y,b+1,0];p.set(x,f*u*m);for(let A=0;A<u;A++){let T=h[A*2]*2-1,P=h[A*2+1]*2-1;m===0?mr.set(1,P,T):m===1?mr.set(-T,1,-P):m===2?mr.set(-T,P,1):m===3?mr.set(-1,P,-T):m===4?mr.set(-T,-1,P):mr.set(T,P,-1),mr.toArray(_,(m*u+A)*f)}}let g=new pt;g.setAttribute("position",new Nt(p,f)),g.setAttribute("outputDirection",new Nt(_,f)),t.push(new Ot(g,null)),n>Ba&&n--}return{lodMeshes:t,sizeLods:e}}function Cg(s,e,t){let n=new cn(s,e,t);return n.texture.mapping=hr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Oa(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function sS(s,e,t){return new hn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:tS,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ou(),fragmentShader:`

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
		`,blending:_i,depthTest:!1,depthWrite:!1})}function rS(s,e,t){return new hn({name:"SphericalGaussianBlur",defines:{SAMPLES:eS,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ou(),fragmentShader:`

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
		`,blending:_i,depthTest:!1,depthWrite:!1})}function Pg(){return new hn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ou(),fragmentShader:`

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
		`,blending:_i,depthTest:!1,depthWrite:!1})}function Ig(){return new hn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ou(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:_i,depthTest:!1,depthWrite:!1})}function Ou(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var uc=class extends cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new fs(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Fn(5,5,5),r=new hn({name:"CubemapFromEquirect",uniforms:pr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Sn,blending:_i});r.uniforms.tEquirect.value=t;let a=new Ot(i,r),o=t.minFilter;return t.minFilter===yi&&(t.minFilter=Bt),new fl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}};function aS(s){let e=new WeakMap,t=new WeakMap,n=null;function i(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===Ta||f===Aa)if(e.has(u)){let p=e.get(u).texture;return o(p,u.mapping)}else{let p=u.image;if(p&&p.height>0){let _=new uc(p.height);return _.fromEquirectangularTexture(s,u),e.set(u,_),u.addEventListener("dispose",c),o(_.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,p=f===Ta||f===Aa,_=f===xi||f===Ki;if(p||_){let g=t.get(u),m=g!==void 0?g.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new hc(s)),g=p?n.fromEquirectangular(u,g):n.fromCubemap(u,g),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),g.texture;if(g!==void 0)return g.texture;{let y=u.image;return p&&y&&y.height>0||_&&y&&l(y)?(n===null&&(n=new hc(s)),g=p?n.fromEquirectangular(u):n.fromCubemap(u),g.texture.pmremVersion=u.pmremVersion,t.set(u,g),u.addEventListener("dispose",h),g.texture):null}}}return u}function o(u,f){return f===Ta?u.mapping=xi:f===Aa&&(u.mapping=Ki),u}function l(u){let f=0,p=6;for(let _=0;_<p;_++)u[_]!==void 0&&f++;return f===p}function c(u){let f=u.target;f.removeEventListener("dispose",c);let p=e.get(f);p!==void 0&&(e.delete(f),p.dispose())}function h(u){let f=u.target;f.removeEventListener("dispose",h);let p=t.get(f);p!==void 0&&(t.delete(f),p.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function oS(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&Mi("WebGLRenderer: "+n+" extension not supported."),i}}}function lS(s,e,t,n){let i={},r=new WeakMap;function a(d){let u=d.target;u.index!==null&&e.remove(u.index);for(let p in u.attributes)e.remove(u.attributes[p]);u.removeEventListener("dispose",a),delete i[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,t.memory.geometries++),u}function l(d){let u=d.attributes;for(let f in u)e.update(u[f],s.ARRAY_BUFFER)}function c(d){let u=[],f=d.index,p=d.attributes.position,_=0;if(p===void 0)return;if(f!==null){let y=f.array;_=f.version;for(let b=0,x=y.length;b<x;b+=3){let A=y[b+0],T=y[b+1],P=y[b+2];u.push(A,T,T,P,P,A)}}else{let y=p.array;_=p.version;for(let b=0,x=y.length/3-1;b<x;b+=3){let A=b+0,T=b+1,P=b+2;u.push(A,T,T,P,P,A)}}let g=new(p.count>=65535?$r:Kr)(u,1);g.version=_;let m=r.get(d);m&&e.remove(m),r.set(d,g)}function h(d){let u=r.get(d);if(u){let f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function cS(s,e,t){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,u){s.drawElements(n,u,r,d*a),t.update(u,n,1)}function c(d,u,f){f!==0&&(s.drawElementsInstanced(n,u,r,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,f);let _=0;for(let g=0;g<f;g++)_+=u[g];t.update(_,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function hS(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:$e("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function uS(s,e,t){let n=new WeakMap,i=new wt;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==d){let R=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",R)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],y=o.morphAttributes.color||[],b=0;f===!0&&(b=1),p===!0&&(b=2),_===!0&&(b=3);let x=o.attributes.position.count*b,A=1;x>e.maxTextureSize&&(A=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let T=new Float32Array(x*A*4*d),P=new Vs(T,x,A,d);P.type=xn,P.needsUpdate=!0;let v=b*4;for(let L=0;L<d;L++){let N=g[L],V=m[L],X=y[L],O=x*A*4*L;for(let G=0;G<N.count;G++){let Y=G*v;f===!0&&(i.fromBufferAttribute(N,G),T[O+Y+0]=i.x,T[O+Y+1]=i.y,T[O+Y+2]=i.z,T[O+Y+3]=0),p===!0&&(i.fromBufferAttribute(V,G),T[O+Y+4]=i.x,T[O+Y+5]=i.y,T[O+Y+6]=i.z,T[O+Y+7]=0),_===!0&&(i.fromBufferAttribute(X,G),T[O+Y+8]=i.x,T[O+Y+9]=i.y,T[O+Y+10]=i.z,T[O+Y+11]=X.itemSize===4?i.w:1)}}u={count:d,texture:P,size:new ce(x,A)},n.set(o,u),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];let p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(s,"morphTargetBaseInfluence",p),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function dS(s,e,t,n,i){let r=new WeakMap;function a(c){let h=i.render.frame,d=c.geometry,u=e.get(c,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}var fS={[yu]:"LINEAR_TONE_MAPPING",[vu]:"REINHARD_TONE_MAPPING",[Su]:"CINEON_TONE_MAPPING",[wa]:"ACES_FILMIC_TONE_MAPPING",[bu]:"AGX_TONE_MAPPING",[Eu]:"NEUTRAL_TONE_MAPPING",[Mu]:"CUSTOM_TONE_MAPPING"};function pS(s,e,t,n,i,r){let a=new cn(e,t,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new pt;c.setAttribute("position",new ke([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new ke([0,2,0,0,2,0],2));let h=new ca({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Ot(c,h),u=new vs(-1,1,1,-1,0,1),f=null,p=null,_=!1,g,m=null,y=[],b=!1;this.setSize=function(x,A){a.setSize(x,A),o!==null&&o.setSize(x,A),l!==null&&l.setSize(x,A);for(let T=0;T<y.length;T++){let P=y[T];P.setSize&&P.setSize(x,A)}},this.setEffects=function(x){y=x,b=y.length>0&&y[0].isRenderPass===!0;let A=a.width,T=a.height;y.length>0&&o===null&&(o=new cn(A,T,{type:jn,depthBuffer:!1,stencilBuffer:!1}),l=new cn(A,T,{type:jn,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<y.length;P++){let v=y[P];v.setSize&&v.setSize(A,T)}},this.begin=function(x,A){if(_||x.toneMapping===$n&&y.length===0)return!1;if(m=A,A!==null){let T=A.width,P=A.height;(a.width!==T||a.height!==P)&&this.setSize(T,P)}return b===!1&&x.setRenderTarget(a),g=x.toneMapping,x.toneMapping=$n,!0},this.hasRenderPass=function(){return b},this.end=function(x,A){x.toneMapping=g,_=!0;let T=a,P=o;for(let v=0;v<y.length;v++){let R=y[v];R.enabled!==!1&&(R.render(x,P,T,A),R.needsSwap!==!1&&(T=P,P=P===o?l:o))}if(f!==x.outputColorSpace||p!==x.toneMapping){f=x.outputColorSpace,p=x.toneMapping,h.defines={},Mt.getTransfer(f)===Lt&&(h.defines.SRGB_TRANSFER="");let v=fS[p];v&&(h.defines[v]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=T.texture,x.setRenderTarget(m),x.render(d,u),m=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var $g=new qt,Xf=new Hi(1,1),jg=new Vs,Qg=new ks,e0=new fs,Lg=[],Dg=[],Ug=new Float32Array(16),Ng=new Float32Array(9),Fg=new Float32Array(4);function Va(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=Lg[i];if(r===void 0&&(r=new Float32Array(i),Lg[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function tn(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function nn(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Bu(s,e){let t=Dg[e];t===void 0&&(t=new Int32Array(e),Dg[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function mS(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function gS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;s.uniform2fv(this.addr,e),nn(t,e)}}function _S(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(tn(t,e))return;s.uniform3fv(this.addr,e),nn(t,e)}}function xS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;s.uniform4fv(this.addr,e),nn(t,e)}}function yS(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;Fg.set(n),s.uniformMatrix2fv(this.addr,!1,Fg),nn(t,n)}}function vS(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;Ng.set(n),s.uniformMatrix3fv(this.addr,!1,Ng),nn(t,n)}}function SS(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(tn(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),nn(t,e)}else{if(tn(t,n))return;Ug.set(n),s.uniformMatrix4fv(this.addr,!1,Ug),nn(t,n)}}function MS(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function bS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;s.uniform2iv(this.addr,e),nn(t,e)}}function ES(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;s.uniform3iv(this.addr,e),nn(t,e)}}function wS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;s.uniform4iv(this.addr,e),nn(t,e)}}function TS(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function AS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(tn(t,e))return;s.uniform2uiv(this.addr,e),nn(t,e)}}function RS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(tn(t,e))return;s.uniform3uiv(this.addr,e),nn(t,e)}}function CS(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(tn(t,e))return;s.uniform4uiv(this.addr,e),nn(t,e)}}function PS(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Xf.compareFunction=t.isReversedDepthBuffer()?rc:sc,r=Xf):r=$g,t.setTexture2D(e||r,i)}function IS(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Qg,i)}function LS(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||e0,i)}function DS(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||jg,i)}function US(s){switch(s){case 5126:return mS;case 35664:return gS;case 35665:return _S;case 35666:return xS;case 35674:return yS;case 35675:return vS;case 35676:return SS;case 5124:case 35670:return MS;case 35667:case 35671:return bS;case 35668:case 35672:return ES;case 35669:case 35673:return wS;case 5125:return TS;case 36294:return AS;case 36295:return RS;case 36296:return CS;case 35678:case 36198:case 36298:case 36306:case 35682:return PS;case 35679:case 36299:case 36307:return IS;case 35680:case 36300:case 36308:case 36293:return LS;case 36289:case 36303:case 36311:case 36292:return DS}}function NS(s,e){s.uniform1fv(this.addr,e)}function FS(s,e){let t=Va(e,this.size,2);s.uniform2fv(this.addr,t)}function OS(s,e){let t=Va(e,this.size,3);s.uniform3fv(this.addr,t)}function BS(s,e){let t=Va(e,this.size,4);s.uniform4fv(this.addr,t)}function zS(s,e){let t=Va(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function VS(s,e){let t=Va(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function kS(s,e){let t=Va(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function HS(s,e){s.uniform1iv(this.addr,e)}function GS(s,e){s.uniform2iv(this.addr,e)}function WS(s,e){s.uniform3iv(this.addr,e)}function XS(s,e){s.uniform4iv(this.addr,e)}function YS(s,e){s.uniform1uiv(this.addr,e)}function qS(s,e){s.uniform2uiv(this.addr,e)}function ZS(s,e){s.uniform3uiv(this.addr,e)}function JS(s,e){s.uniform4uiv(this.addr,e)}function KS(s,e,t){let n=this.cache,i=e.length,r=Bu(t,i);tn(n,r)||(s.uniform1iv(this.addr,r),nn(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Xf:a=$g;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,r[o])}function $S(s,e,t){let n=this.cache,i=e.length,r=Bu(t,i);tn(n,r)||(s.uniform1iv(this.addr,r),nn(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Qg,r[a])}function jS(s,e,t){let n=this.cache,i=e.length,r=Bu(t,i);tn(n,r)||(s.uniform1iv(this.addr,r),nn(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||e0,r[a])}function QS(s,e,t){let n=this.cache,i=e.length,r=Bu(t,i);tn(n,r)||(s.uniform1iv(this.addr,r),nn(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||jg,r[a])}function eM(s){switch(s){case 5126:return NS;case 35664:return FS;case 35665:return OS;case 35666:return BS;case 35674:return zS;case 35675:return VS;case 35676:return kS;case 5124:case 35670:return HS;case 35667:case 35671:return GS;case 35668:case 35672:return WS;case 35669:case 35673:return XS;case 5125:return YS;case 36294:return qS;case 36295:return ZS;case 36296:return JS;case 35678:case 36198:case 36298:case 36306:case 35682:return KS;case 35679:case 36299:case 36307:return $S;case 35680:case 36300:case 36308:case 36293:return jS;case 36289:case 36303:case 36311:case 36292:return QS}}var Yf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=US(t.type)}},qf=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=eM(t.type)}},Zf=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,a=i.length;r!==a;++r){let o=i[r];o.setValue(e,t[o.id],n)}}},Gf=/(\w+)(\])?(\[|\.)?/g;function Og(s,e){s.seq.push(e),s.map[e.id]=e}function tM(s,e,t){let n=s.name,i=n.length;for(Gf.lastIndex=0;;){let r=Gf.exec(n),a=Gf.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Og(t,c===void 0?new Yf(o,s,e):new qf(o,s,e));break}else{let d=t.map[o];d===void 0&&(d=new Zf(o),Og(t,d)),t=d}}}var za=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);tM(o,l,this)}let i=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let a=e[i];a.id in t&&n.push(a)}return n}};function Bg(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}var nM=37297,iM=0;function sM(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var zg=new dt;function rM(s){Mt._getMatrix(zg,Mt.workingColorSpace,s);let e=`mat3( ${zg.elements.map(t=>t.toFixed(4))} )`;switch(Mt.getTransfer(s)){case Yr:return[e,"LinearTransferOETF"];case Lt:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Vg(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+sM(s.getShaderSource(e),o)}else return r}function aM(s,e){let t=rM(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var oM={[yu]:"Linear",[vu]:"Reinhard",[Su]:"Cineon",[wa]:"ACESFilmic",[bu]:"AgX",[Eu]:"Neutral",[Mu]:"Custom"};function lM(s,e){let t=oM[e];return t===void 0?(Pe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Fu=new E;function cM(){Mt.getLuminanceCoefficients(Fu);let s=Fu.x.toFixed(4),e=Fu.y.toFixed(4),t=Fu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(cc).join(`
`)}function uM(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function dM(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),a=r.name,o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function cc(s){return s!==""}function kg(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Hg(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var fM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jf(s){return s.replace(fM,mM)}var pM=new Map;function mM(s,e){let t=yt[e];if(t===void 0){let n=pM.get(e);if(n!==void 0)t=yt[n],Pe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Jf(t)}var gM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Gg(s){return s.replace(gM,_M)}function _M(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Wg(s){let e=`precision ${s.precision} float;
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
#define LOW_PRECISION`),e}var xM={[Ma]:"SHADOWMAP_TYPE_PCF",[lr]:"SHADOWMAP_TYPE_VSM"};function yM(s){return xM[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var vM={[xi]:"ENVMAP_TYPE_CUBE",[Ki]:"ENVMAP_TYPE_CUBE",[hr]:"ENVMAP_TYPE_CUBE_UV"};function SM(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":vM[s.envMapMode]||"ENVMAP_TYPE_CUBE"}var MM={[Ki]:"ENVMAP_MODE_REFRACTION"};function bM(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":MM[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}var EM={[Ea]:"ENVMAP_BLENDING_MULTIPLY",[_f]:"ENVMAP_BLENDING_MIX",[xf]:"ENVMAP_BLENDING_ADD"};function wM(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":EM[s.combine]||"ENVMAP_BLENDING_NONE"}function TM(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function AM(s,e,t,n){let i=s.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=yM(t),c=SM(t),h=bM(t),d=wM(t),u=TM(t),f=hM(t),p=uM(r),_=i.createProgram(),g,m,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(cc).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(cc).join(`
`),m.length>0&&(m+=`
`)):(g=[Wg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(cc).join(`
`),m=[Wg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$n?"#define TONE_MAPPING":"",t.toneMapping!==$n?yt.tonemapping_pars_fragment:"",t.toneMapping!==$n?lM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",yt.colorspace_pars_fragment,aM("linearToOutputTexel",t.outputColorSpace),cM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(cc).join(`
`)),a=Jf(a),a=kg(a,t),a=Hg(a,t),o=Jf(o),o=kg(o,t),o=Hg(o,t),a=Gg(a),o=Gg(o),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===Du?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Du?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let b=y+g+a,x=y+m+o,A=Bg(i,i.VERTEX_SHADER,b),T=Bg(i,i.FRAGMENT_SHADER,x);i.attachShader(_,A),i.attachShader(_,T),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function P(N){if(s.debug.checkShaderErrors){let V=i.getProgramInfoLog(_)||"",X=i.getShaderInfoLog(A)||"",O=i.getShaderInfoLog(T)||"",G=V.trim(),Y=X.trim(),k=O.trim(),re=!0,K=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(re=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,A,T);else{let te=Vg(i,A,"vertex"),Q=Vg(i,T,"fragment");$e("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+G+`
`+te+`
`+Q)}else G!==""?Pe("WebGLProgram: Program Info Log:",G):(Y===""||k==="")&&(K=!1);K&&(N.diagnostics={runnable:re,programLog:G,vertexShader:{log:Y,prefix:g},fragmentShader:{log:k,prefix:m}})}i.deleteShader(A),i.deleteShader(T),v=new za(i,_),R=dM(i,_)}let v;this.getUniforms=function(){return v===void 0&&P(this),v};let R;this.getAttributes=function(){return R===void 0&&P(this),R};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=i.getProgramParameter(_,nM)),L},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=iM++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=T,this}var RM=0,Kf=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new $f(e),t.set(e,n)),n}},$f=class{constructor(e){this.id=RM++,this.code=e,this.usedTimes=0}};function CM(s){return s===ji||s===Ua||s===Na}function PM(s,e,t,n,i,r){let a=new Hs,o=new Kf,l=new Set,c=[],h=new Map,d=n.logarithmicDepthBuffer,u=n.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return l.add(v),v===0?"uv":`uv${v}`}function _(v,R,L,N,V,X){let O=N.fog,G=V.geometry,Y=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?N.environment:null,k=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,re=e.get(v.envMap||Y,k),K=re&&re.mapping===hr?re.image.height:null,te=f[v.type];v.precision!==null&&(u=n.getMaxPrecision(v.precision),u!==v.precision&&Pe("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));let Q=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Ve=Q!==void 0?Q.length:0,Me=0;G.morphAttributes.position!==void 0&&(Me=1),G.morphAttributes.normal!==void 0&&(Me=2),G.morphAttributes.color!==void 0&&(Me=3);let bt,it,at,ne;if(te){let Tt=bn[te];bt=Tt.vertexShader,it=Tt.fragmentShader}else{bt=v.vertexShader,it=v.fragmentShader;let Tt=o.getVertexShaderStage(v),St=o.getFragmentShaderStage(v);o.update(v,Tt,St),at=Tt.id,ne=St.id}let he=s.getRenderTarget(),ye=s.state.buffers.depth.getReversed(),Le=V.isInstancedMesh===!0,De=V.isBatchedMesh===!0,Qe=!!v.map,tt=!!v.matcap,oe=!!re,me=!!v.aoMap,pe=!!v.lightMap,ge=!!v.bumpMap&&v.wireframe===!1,Ee=!!v.normalMap,ot=!!v.displacementMap,et=!!v.emissiveMap,st=!!v.metalnessMap,nt=!!v.roughnessMap,F=v.anisotropy>0,At=v.clearcoat>0,ft=v.dispersion>0,C=v.retroreflectivity>0,S=v.iridescence>0,H=v.sheen>0,q=v.transmission>0,se=F&&!!v.anisotropyMap,ve=At&&!!v.clearcoatMap,Te=At&&!!v.clearcoatNormalMap,W=At&&!!v.clearcoatRoughnessMap,ie=S&&!!v.iridescenceMap,Se=S&&!!v.iridescenceThicknessMap,We=H&&!!v.sheenColorMap,Ue=H&&!!v.sheenRoughnessMap,Ae=!!v.specularMap,Ne=!!v.specularColorMap,rt=!!v.specularIntensityMap,lt=q&&!!v.transmissionMap,z=q&&!!v.thicknessMap,Ie=!!v.gradientMap,le=!!v.alphaMap,xe=v.alphaTest>0,Fe=!!v.alphaHash,fe=!!v.extensions,Je=$n;v.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(Je=s.toneMapping);let Xe={shaderID:te,shaderType:v.type,shaderName:v.name,vertexShader:bt,fragmentShader:it,defines:v.defines,customVertexShaderID:at,customFragmentShaderID:ne,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:De,batchingColor:De&&V._colorsTexture!==null,instancing:Le,instancingColor:Le&&V.instanceColor!==null,instancingMorph:Le&&V.morphTexture!==null,outputColorSpace:he===null?s.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Mt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:Qe,matcap:tt,envMap:oe,envMapMode:oe&&re.mapping,envMapCubeUVHeight:K,aoMap:me,lightMap:pe,bumpMap:ge,normalMap:Ee,displacementMap:ot,emissiveMap:et,normalMapObjectSpace:Ee&&v.normalMapType===Ef,normalMapTangentSpace:Ee&&v.normalMapType===Ti,packedNormalMap:Ee&&v.normalMapType===Ti&&CM(v.normalMap.format),metalnessMap:st,roughnessMap:nt,anisotropy:F,anisotropyMap:se,clearcoat:At,clearcoatMap:ve,clearcoatNormalMap:Te,clearcoatRoughnessMap:W,dispersion:ft,retroreflection:C,iridescence:S,iridescenceMap:ie,iridescenceThicknessMap:Se,sheen:H,sheenColorMap:We,sheenRoughnessMap:Ue,specularMap:Ae,specularColorMap:Ne,specularIntensityMap:rt,transmission:q,transmissionMap:lt,thicknessMap:z,gradientMap:Ie,opaque:v.transparent===!1&&v.blending===cr&&v.alphaToCoverage===!1,alphaMap:le,alphaTest:xe,alphaHash:Fe,combine:v.combine,mapUv:Qe&&p(v.map.channel),aoMapUv:me&&p(v.aoMap.channel),lightMapUv:pe&&p(v.lightMap.channel),bumpMapUv:ge&&p(v.bumpMap.channel),normalMapUv:Ee&&p(v.normalMap.channel),displacementMapUv:ot&&p(v.displacementMap.channel),emissiveMapUv:et&&p(v.emissiveMap.channel),metalnessMapUv:st&&p(v.metalnessMap.channel),roughnessMapUv:nt&&p(v.roughnessMap.channel),anisotropyMapUv:se&&p(v.anisotropyMap.channel),clearcoatMapUv:ve&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:Te&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:W&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:Se&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:We&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:Ue&&p(v.sheenRoughnessMap.channel),specularMapUv:Ae&&p(v.specularMap.channel),specularColorMapUv:Ne&&p(v.specularColorMap.channel),specularIntensityMapUv:rt&&p(v.specularIntensityMap.channel),transmissionMapUv:lt&&p(v.transmissionMap.channel),thicknessMapUv:z&&p(v.thicknessMap.channel),alphaMapUv:le&&p(v.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(Ee||F),vertexNormals:!!G.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!G.attributes.uv&&(Qe||le),fog:!!O,useFog:v.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||G.attributes.normal===void 0&&Ee===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ye,skinning:V.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Ve,morphTextureStride:Me,numSunLights:R.sun.length,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numSunLightShadows:R.sunShadowMap.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:X.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:Je,decodeVideoTexture:Qe&&v.map.isVideoTexture===!0&&Mt.getTransfer(v.map.colorSpace)===Lt,decodeVideoTextureEmissive:et&&v.emissiveMap.isVideoTexture===!0&&Mt.getTransfer(v.emissiveMap.colorSpace)===Lt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Hn,flipSided:v.side===Sn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:fe&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(fe&&v.extensions.multiDraw===!0||De)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Xe.vertexUv1s=l.has(1),Xe.vertexUv2s=l.has(2),Xe.vertexUv3s=l.has(3),l.clear(),Xe}function g(v){let R=[];if(v.shaderID?R.push(v.shaderID):(R.push(v.customVertexShaderID),R.push(v.customFragmentShaderID)),v.defines!==void 0)for(let L in v.defines)R.push(L),R.push(v.defines[L]);return v.isRawShaderMaterial===!1&&(m(R,v),y(R,v),R.push(s.outputColorSpace)),R.push(v.customProgramCacheKey),R.join()}function m(v,R){v.push(R.precision),v.push(R.outputColorSpace),v.push(R.envMapMode),v.push(R.envMapCubeUVHeight),v.push(R.mapUv),v.push(R.alphaMapUv),v.push(R.lightMapUv),v.push(R.aoMapUv),v.push(R.bumpMapUv),v.push(R.normalMapUv),v.push(R.displacementMapUv),v.push(R.emissiveMapUv),v.push(R.metalnessMapUv),v.push(R.roughnessMapUv),v.push(R.anisotropyMapUv),v.push(R.clearcoatMapUv),v.push(R.clearcoatNormalMapUv),v.push(R.clearcoatRoughnessMapUv),v.push(R.iridescenceMapUv),v.push(R.iridescenceThicknessMapUv),v.push(R.sheenColorMapUv),v.push(R.sheenRoughnessMapUv),v.push(R.specularMapUv),v.push(R.specularColorMapUv),v.push(R.specularIntensityMapUv),v.push(R.transmissionMapUv),v.push(R.thicknessMapUv),v.push(R.combine),v.push(R.fogExp2),v.push(R.sizeAttenuation),v.push(R.morphTargetsCount),v.push(R.morphAttributeCount),v.push(R.numSunLights),v.push(R.numDirLights),v.push(R.numPointLights),v.push(R.numSpotLights),v.push(R.numSpotLightMaps),v.push(R.numHemiLights),v.push(R.numRectAreaLights),v.push(R.numSunLightShadows),v.push(R.numDirLightShadows),v.push(R.numPointLightShadows),v.push(R.numSpotLightShadows),v.push(R.numSpotLightShadowsWithMaps),v.push(R.numLightProbes),v.push(R.shadowMapType),v.push(R.toneMapping),v.push(R.numClippingPlanes),v.push(R.numClipIntersection),v.push(R.depthPacking)}function y(v,R){a.disableAll(),R.instancing&&a.enable(0),R.instancingColor&&a.enable(1),R.instancingMorph&&a.enable(2),R.matcap&&a.enable(3),R.envMap&&a.enable(4),R.normalMapObjectSpace&&a.enable(5),R.normalMapTangentSpace&&a.enable(6),R.clearcoat&&a.enable(7),R.iridescence&&a.enable(8),R.alphaTest&&a.enable(9),R.vertexColors&&a.enable(10),R.vertexAlphas&&a.enable(11),R.vertexUv1s&&a.enable(12),R.vertexUv2s&&a.enable(13),R.vertexUv3s&&a.enable(14),R.vertexTangents&&a.enable(15),R.anisotropy&&a.enable(16),R.alphaHash&&a.enable(17),R.batching&&a.enable(18),R.dispersion&&a.enable(19),R.retroreflection&&a.enable(24),R.batchingColor&&a.enable(20),R.gradientMap&&a.enable(21),R.packedNormalMap&&a.enable(22),R.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),R.fog&&a.enable(0),R.useFog&&a.enable(1),R.flatShading&&a.enable(2),R.logarithmicDepthBuffer&&a.enable(3),R.reversedDepthBuffer&&a.enable(4),R.skinning&&a.enable(5),R.morphTargets&&a.enable(6),R.morphNormals&&a.enable(7),R.morphColors&&a.enable(8),R.premultipliedAlpha&&a.enable(9),R.shadowMapEnabled&&a.enable(10),R.doubleSided&&a.enable(11),R.flipSided&&a.enable(12),R.useDepthPacking&&a.enable(13),R.dithering&&a.enable(14),R.transmission&&a.enable(15),R.sheen&&a.enable(16),R.opaque&&a.enable(17),R.pointsUvs&&a.enable(18),R.decodeVideoTexture&&a.enable(19),R.decodeVideoTextureEmissive&&a.enable(20),R.alphaToCoverage&&a.enable(21),R.numLightProbeGrids>0&&a.enable(22),R.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function b(v){let R=f[v.type],L;if(R){let N=bn[R];L=Fa.clone(N.uniforms)}else L=v.uniforms;return L}function x(v,R){let L=h.get(R);return L!==void 0?++L.usedTimes:(L=new AM(s,R,v,i),c.push(L),h.set(R,L)),L}function A(v){if(--v.usedTimes===0){let R=c.indexOf(v);c[R]=c[c.length-1],c.pop(),h.delete(v.cacheKey),v.destroy()}}function T(v){o.remove(v)}function P(){o.dispose()}return{getParameters:_,getProgramCacheKey:g,getUniforms:b,acquireProgram:x,releaseProgram:A,releaseShaderCache:T,programs:c,dispose:P}}function IM(){let s=new WeakMap;function e(a){return s.has(a)}function t(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function LM(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function Xg(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Yg(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,p,_,g,m){let y=s[e];return y===void 0?(y={id:u.id,object:u,geometry:f,material:p,materialVariant:a(u),groupOrder:_,renderOrder:u.renderOrder,z:g,group:m},s[e]=y):(y.id=u.id,y.object=u,y.geometry=f,y.material=p,y.materialVariant=a(u),y.groupOrder=_,y.renderOrder=u.renderOrder,y.z=g,y.group=m),e++,y}function l(u,f,p,_,g,m,y){y.reversedDepth===!0&&(g=-g);let b=o(u,f,p,_,g,m);p.transmission>0?n.push(b):p.transparent===!0?i.push(b):t.push(b)}function c(u,f,p,_,g,m){let y=o(u,f,p,_,g,m);p.transmission>0?n.unshift(y):p.transparent===!0?i.unshift(y):t.unshift(y)}function h(u,f){t.length>1&&t.sort(u||LM),n.length>1&&n.sort(f||Xg),i.length>1&&i.sort(f||Xg)}function d(){for(let u=e,f=s.length;u<f;u++){let p=s[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:d,sort:h}}function DM(){let s=new WeakMap;function e(n,i){let r=s.get(n),a;return r===void 0?(a=new Yg,s.set(n,[a])):i>=r.length?(a=new Yg,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function UM(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new E,color:new ze};break;case"SpotLight":t={position:new E,direction:new E,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new E,halfWidth:new E,halfHeight:new E};break}return s[e.id]=t,t}}}function NM(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ce,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}var FM=0;function OM(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function BM(s){let e=new UM,t=NM(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new E);let i=new E,r=new ct,a=new ct;function o(c){let h=0,d=0,u=0;for(let V=0;V<9;V++)n.probe[V].set(0,0,0);let f=0,p=0,_=0,g=0,m=0,y=0,b=0,x=0,A=0,T=0,P=0,v=0,R=0,L=0;c.sort(OM);for(let V=0,X=c.length;V<X;V++){let O=c[V],G=O.color,Y=O.intensity,k=O.distance,re=null;if(O.shadow&&O.shadow.map&&(O.shadow.map.texture.format===ji?re=O.shadow.map.texture:re=O.shadow.map.depthTexture||O.shadow.map.texture),O.isAmbientLight)h+=G.r*Y,d+=G.g*Y,u+=G.b*Y;else if(O.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(O.sh.coefficients[K],Y);L++}else if(O.isSunLight){let K=e.get(O);if(K.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let te=O.shadow,Q=t.get(O);Q.shadowIntensity=te.intensity,Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),n.sunShadow[p]=Q,n.sunShadowMap[p]=re;let Ve=te.getViewportCount();for(let Me=0;Me<Ve;Me++)n.sunShadowMatrix[_+Me]=te.getMatrix(Me),n.sunShadowCascade[_+Me]=te._cascadeData[Me];_+=Ve,p++}n.sun[f]=K,f++}else if(O.isDirectionalLight){let K=e.get(O);if(K.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){let te=O.shadow,Q=t.get(O);Q.shadowIntensity=te.intensity,Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize=te.mapSize,n.directionalShadow[g]=Q,n.directionalShadowMap[g]=re,n.directionalShadowMatrix[g]=O.shadow.matrix,A++}n.directional[g]=K,g++}else if(O.isSpotLight){let K=e.get(O);K.position.setFromMatrixPosition(O.matrixWorld),K.color.copy(G).multiplyScalar(Y),K.distance=k,K.coneCos=Math.cos(O.angle),K.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),K.decay=O.decay,n.spot[y]=K;let te=O.shadow;if(O.map&&(n.spotLightMap[v]=O.map,v++,te.updateMatrices(O),O.castShadow&&R++),n.spotLightMatrix[y]=te.matrix,O.castShadow){let Q=t.get(O);Q.shadowIntensity=te.intensity,Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize=te.mapSize,n.spotShadow[y]=Q,n.spotShadowMap[y]=re,P++}y++}else if(O.isRectAreaLight){let K=e.get(O);K.color.copy(G).multiplyScalar(Y),K.halfWidth.set(O.width*.5,0,0),K.halfHeight.set(0,O.height*.5,0),n.rectArea[b]=K,b++}else if(O.isPointLight){let K=e.get(O);if(K.color.copy(O.color).multiplyScalar(O.intensity),K.distance=O.distance,K.decay=O.decay,O.castShadow){let te=O.shadow,Q=t.get(O);Q.shadowIntensity=te.intensity,Q.shadowBias=te.bias,Q.shadowNormalBias=te.normalBias,Q.shadowRadius=te.radius,Q.shadowMapSize=te.mapSize,Q.shadowCameraNear=te.camera.near,Q.shadowCameraFar=te.camera.far,n.pointShadow[m]=Q,n.pointShadowMap[m]=re,n.pointShadowMatrix[m]=O.shadow.matrix,T++}n.point[m]=K,m++}else if(O.isHemisphereLight){let K=e.get(O);K.skyColor.copy(O.color).multiplyScalar(Y),K.groundColor.copy(O.groundColor).multiplyScalar(Y),n.hemi[x]=K,x++}}b>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ce.LTC_FLOAT_1,n.rectAreaLTC2=Ce.LTC_FLOAT_2):(n.rectAreaLTC1=Ce.LTC_HALF_1,n.rectAreaLTC2=Ce.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;let N=n.hash;(N.sunLength!==f||N.directionalLength!==g||N.pointLength!==m||N.spotLength!==y||N.rectAreaLength!==b||N.hemiLength!==x||N.numSunShadows!==p||N.numDirectionalShadows!==A||N.numPointShadows!==T||N.numSpotShadows!==P||N.numSpotMaps!==v||N.numLightProbes!==L)&&(n.sun.length=f,n.directional.length=g,n.spot.length=y,n.rectArea.length=b,n.point.length=m,n.hemi.length=x,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=_,n.sunShadowCascade.length=_,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=P,n.spotShadowMap.length=P,n.spotLightMatrix.length=P+v-R,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=L,N.sunLength=f,N.directionalLength=g,N.pointLength=m,N.spotLength=y,N.rectAreaLength=b,N.hemiLength=x,N.numSunShadows=p,N.numDirectionalShadows=A,N.numPointShadows=T,N.numSpotShadows=P,N.numSpotMaps=v,N.numLightProbes=L,n.version=FM++)}function l(c,h){let d=0,u=0,f=0,p=0,_=0,g=0,m=h.matrixWorldInverse;for(let y=0,b=c.length;y<b;y++){let x=c[y];if(x.isSunLight){let A=n.sun[d];A.direction.setFromMatrixPosition(x.matrixWorld),A.direction.transformDirection(m),d++}else if(x.isDirectionalLight){let A=n.directional[u];A.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(m),u++}else if(x.isSpotLight){let A=n.spot[p];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),A.direction.sub(i),A.direction.transformDirection(m),p++}else if(x.isRectAreaLight){let A=n.rectArea[_];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(m),a.identity(),r.copy(x.matrixWorld),r.premultiply(m),a.extractRotation(r),A.halfWidth.set(x.width*.5,0,0),A.halfHeight.set(0,x.height*.5,0),A.halfWidth.applyMatrix4(a),A.halfHeight.applyMatrix4(a),_++}else if(x.isPointLight){let A=n.point[f];A.position.setFromMatrixPosition(x.matrixWorld),A.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){let A=n.hemi[g];A.direction.setFromMatrixPosition(x.matrixWorld),A.direction.transformDirection(m),g++}}}return{setup:o,setupView:l,state:n}}function qg(s){let e=new BM(s),t=[],n=[],i=[];function r(u){d.camera=u,t.length=0,n.length=0,i.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function l(u){i.push(u)}function c(){e.setup(t)}function h(u){e.setupView(t,u)}let d={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function zM(s){let e=new WeakMap;function t(i,r=0){let a=e.get(i),o;return a===void 0?(o=new qg(s),e.set(i,[o])):r>=a.length?(o=new qg(s),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var VM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kM=`uniform sampler2D shadow_pass;
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
}`,HM=[new E(1,0,0),new E(-1,0,0),new E(0,1,0),new E(0,-1,0),new E(0,0,1),new E(0,0,-1)],GM=[new E(0,-1,0),new E(0,-1,0),new E(0,0,1),new E(0,0,-1),new E(0,-1,0),new E(0,-1,0)],Zg=new ct,lc=new E,Wf=new E;function WM(s,e,t){let n=new bi,i=new ce,r=new ce,a=new wt,o=new ha,l=new ua,c={},h=t.maxTextureSize,d={[Ji]:Sn,[Sn]:Ji,[Hn]:Hn},u=new hn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ce},radius:{value:4}},vertexShader:VM,fragmentShader:kM}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let p=new pt;p.setAttribute("position",new Nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new Ot(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ma;let m=this.type;this.render=function(T,P,v){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;this.type===$d&&(Pe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Ma);let R=s.getRenderTarget(),L=s.getActiveCubeFace(),N=s.getActiveMipmapLevel(),V=s.state;V.setBlending(_i),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);let X=m!==this.type;X&&P.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(G=>G.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,G=T.length;O<G;O++){let Y=T[O],k=Y.shadow;if(k===void 0){Pe("WebGLShadowMap:",Y,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);let re=k.getFrameExtents();i.multiply(re),r.copy(k.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/re.x),i.x=r.x*re.x,k.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/re.y),i.y=r.y*re.y,k.mapSize.y=r.y));let K=s.state.buffers.depth.getReversed();if(k.camera._reversedDepth=K,k.map===null||X===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===lr){if(Y.isPointLight){Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new cn(i.x,i.y,{format:ji,type:jn,minFilter:Bt,magFilter:Bt,generateMipmaps:!1}),k.map.texture.name=Y.name+".shadowMap",k.map.depthTexture=new Hi(i.x,i.y,xn),k.map.depthTexture.name=Y.name+".shadowMapDepth",k.map.depthTexture.format=li,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Yt,k.map.depthTexture.magFilter=Yt}else Y.isPointLight?(k.map=new uc(i.x),k.map.depthTexture=new Uo(i.x,Gn)):(k.map=new cn(i.x,i.y),k.map.depthTexture=new Hi(i.x,i.y,Gn)),k.map.depthTexture.name=Y.name+".shadowMap",k.map.depthTexture.format=li,this.type===Ma?(k.map.depthTexture.compareFunction=K?rc:sc,k.map.depthTexture.minFilter=Bt,k.map.depthTexture.magFilter=Bt):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Yt,k.map.depthTexture.magFilter=Yt);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==i.x||k.map.height!==i.y)&&k.map.setSize(i.x,i.y);let te=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();Y.isPointLight!==!0&&k.updateMatrices(Y,v);for(let Q=0;Q<te;Q++){let Ve=k.getCamera(Q);if(Y.isPointLight){let Me=k.camera,bt=k.matrix,it=Y.distance||Me.far;it!==Me.far&&(Me.far=it,Me.updateProjectionMatrix()),lc.setFromMatrixPosition(Y.matrixWorld),Me.position.copy(lc),Wf.copy(Me.position),Wf.add(HM[Q]),Me.up.copy(GM[Q]),Me.lookAt(Wf),Me.updateMatrixWorld(),bt.makeTranslation(-lc.x,-lc.y,-lc.z),Zg.multiplyMatrices(Me.projectionMatrix,Me.matrixWorldInverse),k._frustum.setFromProjectionMatrix(Zg,Me.coordinateSystem,Me.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)s.setRenderTarget(k.map,Q),s.clear();else{Q===0&&(s.setRenderTarget(k.map),s.clear());let Me=k.getViewport(Q);a.set(r.x*Me.x,r.y*Me.y,r.x*Me.z,r.y*Me.w),V.viewport(a)}n=k.getFrustum(Q),x(P,v,Ve,Y,this.type)}k.isPointLightShadow!==!0&&this.type===lr&&y(k,v),k.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(R,L,N)};function y(T,P){let v=e.update(_);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new cn(i.x,i.y,{format:ji,type:jn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(P,null,v,u,_,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(P,null,v,f,_,null)}function b(T,P,v,R){let L=null,N=v.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(N!==void 0)L=N;else if(L=v.isPointLight===!0?l:o,s.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let V=L.uuid,X=P.uuid,O=c[V];O===void 0&&(O={},c[V]=O);let G=O[X];G===void 0&&(G=L.clone(),O[X]=G,P.addEventListener("dispose",A)),L=G}if(L.visible=P.visible,L.wireframe=P.wireframe,R===lr?L.side=P.shadowSide!==null?P.shadowSide:P.side:L.side=P.shadowSide!==null?P.shadowSide:d[P.side],L.alphaMap=P.alphaMap,L.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,L.map=P.map,L.clipShadows=P.clipShadows,L.clippingPlanes=P.clippingPlanes,L.clipIntersection=P.clipIntersection,L.displacementMap=P.displacementMap,L.displacementScale=P.displacementScale,L.displacementBias=P.displacementBias,L.wireframeLinewidth=P.wireframeLinewidth,L.linewidth=P.linewidth,v.isPointLight===!0&&L.isMeshDistanceMaterial===!0){let V=s.properties.get(L);V.light=v}return L}function x(T,P,v,R,L){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&L===lr)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,T.matrixWorld);let X=e.update(T),O=T.material;if(Array.isArray(O)){let G=X.groups;for(let Y=0,k=G.length;Y<k;Y++){let re=G[Y],K=O[re.materialIndex];if(K&&K.visible){let te=b(T,K,R,L);T.onBeforeShadow(s,T,P,v,X,te,re),s.renderBufferDirect(v,null,X,te,T,re),T.onAfterShadow(s,T,P,v,X,te,re)}}}else if(O.visible){let G=b(T,O,R,L);T.onBeforeShadow(s,T,P,v,X,G,null),s.renderBufferDirect(v,null,X,G,T,null),T.onAfterShadow(s,T,P,v,X,G,null)}}let V=T.children;for(let X=0,O=V.length;X<O;X++)x(V[X],P,v,R,L)}function A(T){T.target.removeEventListener("dispose",A);for(let v in c){let R=c[v],L=T.target.uuid;L in R&&(R[L].dispose(),delete R[L])}}}function XM(s,e){function t(){let z=!1,Ie=new wt,le=null,xe=new wt(0,0,0,0);return{setMask:function(Fe){le!==Fe&&!z&&(s.colorMask(Fe,Fe,Fe,Fe),le=Fe)},setLocked:function(Fe){z=Fe},setClear:function(Fe,fe,Je,Xe,Tt){Tt===!0&&(Fe*=Xe,fe*=Xe,Je*=Xe),Ie.set(Fe,fe,Je,Xe),xe.equals(Ie)===!1&&(s.clearColor(Fe,fe,Je,Xe),xe.copy(Ie))},reset:function(){z=!1,le=null,xe.set(-1,0,0,0)}}}function n(){let z=!1,Ie=!1,le=null,xe=null,Fe=null;return{setReversed:function(fe){if(Ie!==fe){let Je=e.get("EXT_clip_control");fe?Je.clipControlEXT(Je.LOWER_LEFT_EXT,Je.ZERO_TO_ONE_EXT):Je.clipControlEXT(Je.LOWER_LEFT_EXT,Je.NEGATIVE_ONE_TO_ONE_EXT),Ie=fe;let Xe=Fe;Fe=null,this.setClear(Xe)}},getReversed:function(){return Ie},setTest:function(fe){fe?he(s.DEPTH_TEST):ye(s.DEPTH_TEST)},setMask:function(fe){le!==fe&&!z&&(s.depthMask(fe),le=fe)},setFunc:function(fe){if(Ie&&(fe=_g[fe]),xe!==fe){switch(fe){case mo:s.depthFunc(s.NEVER);break;case go:s.depthFunc(s.ALWAYS);break;case _o:s.depthFunc(s.LESS);break;case Bs:s.depthFunc(s.LEQUAL);break;case xo:s.depthFunc(s.EQUAL);break;case yo:s.depthFunc(s.GEQUAL);break;case vo:s.depthFunc(s.GREATER);break;case So:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}xe=fe}},setLocked:function(fe){z=fe},setClear:function(fe){Fe!==fe&&(Fe=fe,Ie&&(fe=1-fe),s.clearDepth(fe))},reset:function(){z=!1,le=null,xe=null,Fe=null,Ie=!1}}}function i(){let z=!1,Ie=null,le=null,xe=null,Fe=null,fe=null,Je=null,Xe=null,Tt=null;return{setTest:function(St){z||(St?he(s.STENCIL_TEST):ye(s.STENCIL_TEST))},setMask:function(St){Ie!==St&&!z&&(s.stencilMask(St),Ie=St)},setFunc:function(St,on,ln){(le!==St||xe!==on||Fe!==ln)&&(s.stencilFunc(St,on,ln),le=St,xe=on,Fe=ln)},setOp:function(St,on,ln){(fe!==St||Je!==on||Xe!==ln)&&(s.stencilOp(St,on,ln),fe=St,Je=on,Xe=ln)},setLocked:function(St){z=St},setClear:function(St){Tt!==St&&(s.clearStencil(St),Tt=St)},reset:function(){z=!1,Ie=null,le=null,xe=null,Fe=null,fe=null,Je=null,Xe=null,Tt=null}}}let r=new t,a=new n,o=new i,l=new WeakMap,c=new WeakMap,h={},d={},u={},f=new WeakMap,p=[],_=null,g=!1,m=null,y=null,b=null,x=null,A=null,T=null,P=null,v=new ze(0,0,0),R=0,L=!1,N=null,V=null,X=null,O=null,G=null,Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,re=0,K=s.getParameter(s.VERSION);K.indexOf("WebGL")!==-1?(re=parseFloat(/^WebGL (\d)/.exec(K)[1]),k=re>=1):K.indexOf("OpenGL ES")!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),k=re>=2);let te=null,Q={},Ve=s.getParameter(s.SCISSOR_BOX),Me=s.getParameter(s.VIEWPORT),bt=new wt().fromArray(Ve),it=new wt().fromArray(Me);function at(z,Ie,le,xe){let Fe=new Uint8Array(4),fe=s.createTexture();s.bindTexture(z,fe),s.texParameteri(z,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(z,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Je=0;Je<le;Je++)z===s.TEXTURE_3D||z===s.TEXTURE_2D_ARRAY?s.texImage3D(Ie,0,s.RGBA,1,1,xe,0,s.RGBA,s.UNSIGNED_BYTE,Fe):s.texImage2D(Ie+Je,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Fe);return fe}let ne={};ne[s.TEXTURE_2D]=at(s.TEXTURE_2D,s.TEXTURE_2D,1),ne[s.TEXTURE_CUBE_MAP]=at(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ne[s.TEXTURE_2D_ARRAY]=at(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ne[s.TEXTURE_3D]=at(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),he(s.DEPTH_TEST),a.setFunc(Bs),ge(!1),Ee(pu),he(s.CULL_FACE),me(_i);function he(z){h[z]!==!0&&(s.enable(z),h[z]=!0)}function ye(z){h[z]!==!1&&(s.disable(z),h[z]=!1)}function Le(z,Ie){return u[z]!==Ie?(s.bindFramebuffer(z,Ie),u[z]=Ie,z===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=Ie),z===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=Ie),!0):!1}function De(z,Ie){let le=p,xe=!1;if(z){le=f.get(Ie),le===void 0&&(le=[],f.set(Ie,le));let Fe=z.textures;if(le.length!==Fe.length||le[0]!==s.COLOR_ATTACHMENT0){for(let fe=0,Je=Fe.length;fe<Je;fe++)le[fe]=s.COLOR_ATTACHMENT0+fe;le.length=Fe.length,xe=!0}}else le[0]!==s.BACK&&(le[0]=s.BACK,xe=!0);xe&&s.drawBuffers(le)}function Qe(z){return _!==z?(s.useProgram(z),_=z,!0):!1}let tt={[Ms]:s.FUNC_ADD,[Qd]:s.FUNC_SUBTRACT,[ef]:s.FUNC_REVERSE_SUBTRACT};tt[tf]=s.MIN,tt[nf]=s.MAX;let oe={[sf]:s.ZERO,[rf]:s.ONE,[af]:s.SRC_COLOR,[_u]:s.SRC_ALPHA,[df]:s.SRC_ALPHA_SATURATE,[hf]:s.DST_COLOR,[lf]:s.DST_ALPHA,[of]:s.ONE_MINUS_SRC_COLOR,[xu]:s.ONE_MINUS_SRC_ALPHA,[uf]:s.ONE_MINUS_DST_COLOR,[cf]:s.ONE_MINUS_DST_ALPHA,[ff]:s.CONSTANT_COLOR,[pf]:s.ONE_MINUS_CONSTANT_COLOR,[mf]:s.CONSTANT_ALPHA,[gf]:s.ONE_MINUS_CONSTANT_ALPHA};function me(z,Ie,le,xe,Fe,fe,Je,Xe,Tt,St){if(z===_i){g===!0&&(ye(s.BLEND),g=!1);return}if(g===!1&&(he(s.BLEND),g=!0),z!==jd){if(z!==m||St!==L){if((y!==Ms||A!==Ms)&&(s.blendEquation(s.FUNC_ADD),y=Ms,A=Ms),St)switch(z){case cr:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ba:s.blendFunc(s.ONE,s.ONE);break;case mu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case gu:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:$e("WebGLState: Invalid blending: ",z);break}else switch(z){case cr:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ba:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case mu:$e("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case gu:$e("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$e("WebGLState: Invalid blending: ",z);break}b=null,x=null,T=null,P=null,v.set(0,0,0),R=0,m=z,L=St}return}Fe=Fe||Ie,fe=fe||le,Je=Je||xe,(Ie!==y||Fe!==A)&&(s.blendEquationSeparate(tt[Ie],tt[Fe]),y=Ie,A=Fe),(le!==b||xe!==x||fe!==T||Je!==P)&&(s.blendFuncSeparate(oe[le],oe[xe],oe[fe],oe[Je]),b=le,x=xe,T=fe,P=Je),(Xe.equals(v)===!1||Tt!==R)&&(s.blendColor(Xe.r,Xe.g,Xe.b,Tt),v.copy(Xe),R=Tt),m=z,L=!1}function pe(z,Ie){z.side===Hn?ye(s.CULL_FACE):he(s.CULL_FACE);let le=z.side===Sn;Ie&&(le=!le),ge(le),z.blending===cr&&z.transparent===!1?me(_i):me(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),r.setMask(z.colorWrite);let xe=z.stencilWrite;o.setTest(xe),xe&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),et(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?he(s.SAMPLE_ALPHA_TO_COVERAGE):ye(s.SAMPLE_ALPHA_TO_COVERAGE)}function ge(z){N!==z&&(z?s.frontFace(s.CW):s.frontFace(s.CCW),N=z)}function Ee(z){z!==Jd?(he(s.CULL_FACE),z!==V&&(z===pu?s.cullFace(s.BACK):z===Kd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ye(s.CULL_FACE),V=z}function ot(z){z!==X&&(k&&s.lineWidth(z),X=z)}function et(z,Ie,le){z?(he(s.POLYGON_OFFSET_FILL),(O!==Ie||G!==le)&&(O=Ie,G=le,a.getReversed()&&(Ie=-Ie),s.polygonOffset(Ie,le))):ye(s.POLYGON_OFFSET_FILL)}function st(z){z?he(s.SCISSOR_TEST):ye(s.SCISSOR_TEST)}function nt(z){z===void 0&&(z=s.TEXTURE0+Y-1),te!==z&&(s.activeTexture(z),te=z)}function F(z,Ie,le){le===void 0&&(te===null?le=s.TEXTURE0+Y-1:le=te);let xe=Q[le];xe===void 0&&(xe={type:void 0,texture:void 0},Q[le]=xe),(xe.type!==z||xe.texture!==Ie)&&(te!==le&&(s.activeTexture(le),te=le),s.bindTexture(z,Ie||ne[z]),xe.type=z,xe.texture=Ie)}function At(){let z=Q[te];z!==void 0&&z.type!==void 0&&(s.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function ft(){try{s.compressedTexImage2D(...arguments)}catch(z){$e("WebGLState:",z)}}function C(){try{s.compressedTexImage3D(...arguments)}catch(z){$e("WebGLState:",z)}}function S(){try{s.texSubImage2D(...arguments)}catch(z){$e("WebGLState:",z)}}function H(){try{s.texSubImage3D(...arguments)}catch(z){$e("WebGLState:",z)}}function q(){try{s.compressedTexSubImage2D(...arguments)}catch(z){$e("WebGLState:",z)}}function se(){try{s.compressedTexSubImage3D(...arguments)}catch(z){$e("WebGLState:",z)}}function ve(){try{s.texStorage2D(...arguments)}catch(z){$e("WebGLState:",z)}}function Te(){try{s.texStorage3D(...arguments)}catch(z){$e("WebGLState:",z)}}function W(){try{s.texImage2D(...arguments)}catch(z){$e("WebGLState:",z)}}function ie(){try{s.texImage3D(...arguments)}catch(z){$e("WebGLState:",z)}}function Se(z){return d[z]!==void 0?d[z]:s.getParameter(z)}function We(z,Ie){d[z]!==Ie&&(s.pixelStorei(z,Ie),d[z]=Ie)}function Ue(z){bt.equals(z)===!1&&(s.scissor(z.x,z.y,z.z,z.w),bt.copy(z))}function Ae(z){it.equals(z)===!1&&(s.viewport(z.x,z.y,z.z,z.w),it.copy(z))}function Ne(z,Ie){let le=c.get(Ie);le===void 0&&(le=new WeakMap,c.set(Ie,le));let xe=le.get(z);xe===void 0&&(xe=s.getUniformBlockIndex(Ie,z.name),le.set(z,xe))}function rt(z,Ie){let xe=c.get(Ie).get(z);l.get(Ie)!==xe&&(s.uniformBlockBinding(Ie,xe,z.__bindingPointIndex),l.set(Ie,xe))}function lt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},d={},te=null,Q={},u={},f=new WeakMap,p=[],_=null,g=!1,m=null,y=null,b=null,x=null,A=null,T=null,P=null,v=new ze(0,0,0),R=0,L=!1,N=null,V=null,X=null,O=null,G=null,bt.set(0,0,s.canvas.width,s.canvas.height),it.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:he,disable:ye,bindFramebuffer:Le,drawBuffers:De,useProgram:Qe,setBlending:me,setMaterial:pe,setFlipSided:ge,setCullFace:Ee,setLineWidth:ot,setPolygonOffset:et,setScissorTest:st,activeTexture:nt,bindTexture:F,unbindTexture:At,compressedTexImage2D:ft,compressedTexImage3D:C,texImage2D:W,texImage3D:ie,pixelStorei:We,getParameter:Se,updateUBOMapping:Ne,uniformBlockBinding:rt,texStorage2D:ve,texStorage3D:Te,texSubImage2D:S,texSubImage3D:H,compressedTexSubImage2D:q,compressedTexSubImage3D:se,scissor:Ue,viewport:Ae,reset:lt}}function YM(s,e,t,n,i,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ce,h=new WeakMap,d=new Set,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(C,S){return p?new OffscreenCanvas(C,S):qr("canvas")}function g(C,S,H){let q=1,se=ft(C);if((se.width>H||se.height>H)&&(q=H/Math.max(se.width,se.height)),q<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let ve=Math.floor(q*se.width),Te=Math.floor(q*se.height);u===void 0&&(u=_(ve,Te));let W=S?_(ve,Te):u;return W.width=ve,W.height=Te,W.getContext("2d").drawImage(C,0,0,ve,Te),Pe("WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+ve+"x"+Te+")."),W}else return"data"in C&&Pe("WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),C;return C}function m(C){return C.generateMipmaps}function y(C){s.generateMipmap(C)}function b(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function x(C,S,H,q,se,ve=!1){if(C!==null){if(s[C]!==void 0)return s[C];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Te;q&&(Te=e.get("EXT_texture_norm16"),Te||Pe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let W=S;if(S===s.RED&&(H===s.FLOAT&&(W=s.R32F),H===s.HALF_FLOAT&&(W=s.R16F),H===s.UNSIGNED_BYTE&&(W=s.R8),H===s.UNSIGNED_SHORT&&Te&&(W=Te.R16_EXT),H===s.SHORT&&Te&&(W=Te.R16_SNORM_EXT)),S===s.RED_INTEGER&&(H===s.UNSIGNED_BYTE&&(W=s.R8UI),H===s.UNSIGNED_SHORT&&(W=s.R16UI),H===s.UNSIGNED_INT&&(W=s.R32UI),H===s.BYTE&&(W=s.R8I),H===s.SHORT&&(W=s.R16I),H===s.INT&&(W=s.R32I)),S===s.RG&&(H===s.FLOAT&&(W=s.RG32F),H===s.HALF_FLOAT&&(W=s.RG16F),H===s.UNSIGNED_BYTE&&(W=s.RG8),H===s.UNSIGNED_SHORT&&Te&&(W=Te.RG16_EXT),H===s.SHORT&&Te&&(W=Te.RG16_SNORM_EXT)),S===s.RG_INTEGER&&(H===s.UNSIGNED_BYTE&&(W=s.RG8UI),H===s.UNSIGNED_SHORT&&(W=s.RG16UI),H===s.UNSIGNED_INT&&(W=s.RG32UI),H===s.BYTE&&(W=s.RG8I),H===s.SHORT&&(W=s.RG16I),H===s.INT&&(W=s.RG32I)),S===s.RGB_INTEGER&&(H===s.UNSIGNED_BYTE&&(W=s.RGB8UI),H===s.UNSIGNED_SHORT&&(W=s.RGB16UI),H===s.UNSIGNED_INT&&(W=s.RGB32UI),H===s.BYTE&&(W=s.RGB8I),H===s.SHORT&&(W=s.RGB16I),H===s.INT&&(W=s.RGB32I)),S===s.RGBA_INTEGER&&(H===s.UNSIGNED_BYTE&&(W=s.RGBA8UI),H===s.UNSIGNED_SHORT&&(W=s.RGBA16UI),H===s.UNSIGNED_INT&&(W=s.RGBA32UI),H===s.BYTE&&(W=s.RGBA8I),H===s.SHORT&&(W=s.RGBA16I),H===s.INT&&(W=s.RGBA32I)),S===s.RGB&&(H===s.UNSIGNED_SHORT&&Te&&(W=Te.RGB16_EXT),H===s.SHORT&&Te&&(W=Te.RGB16_SNORM_EXT),H===s.UNSIGNED_INT_5_9_9_9_REV&&(W=s.RGB9_E5),H===s.UNSIGNED_INT_10F_11F_11F_REV&&(W=s.R11F_G11F_B10F)),S===s.RGBA){let ie=ve?Yr:Mt.getTransfer(se);H===s.FLOAT&&(W=s.RGBA32F),H===s.HALF_FLOAT&&(W=s.RGBA16F),H===s.UNSIGNED_BYTE&&(W=ie===Lt?s.SRGB8_ALPHA8:s.RGBA8),H===s.UNSIGNED_SHORT&&Te&&(W=Te.RGBA16_EXT),H===s.SHORT&&Te&&(W=Te.RGBA16_SNORM_EXT),H===s.UNSIGNED_SHORT_4_4_4_4&&(W=s.RGBA4),H===s.UNSIGNED_SHORT_5_5_5_1&&(W=s.RGB5_A1)}return(W===s.R16F||W===s.R32F||W===s.RG16F||W===s.RG32F||W===s.RGBA16F||W===s.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function A(C,S){let H;return C?S===null||S===Gn||S===fr?H=s.DEPTH24_STENCIL8:S===xn?H=s.DEPTH32F_STENCIL8:S===dr&&(H=s.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Gn||S===fr?H=s.DEPTH_COMPONENT24:S===xn?H=s.DEPTH_COMPONENT32F:S===dr&&(H=s.DEPTH_COMPONENT16),H}function T(C,S){return m(C)===!0||C.isFramebufferTexture&&C.minFilter!==Yt&&C.minFilter!==Bt?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function P(C){let S=C.target;S.removeEventListener("dispose",P),R(S),S.isVideoTexture&&h.delete(S),S.isHTMLTexture&&d.delete(S)}function v(C){let S=C.target;S.removeEventListener("dispose",v),N(S)}function R(C){let S=n.get(C);if(S.__webglInit===void 0)return;let H=C.source,q=f.get(H);if(q){let se=q[S.__cacheKey];se.usedTimes--,se.usedTimes===0&&L(C),Object.keys(q).length===0&&f.delete(H)}n.remove(C)}function L(C){let S=n.get(C);s.deleteTexture(S.__webglTexture);let H=C.source,q=f.get(H);delete q[S.__cacheKey],a.memory.textures--}function N(C){let S=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(S.__webglFramebuffer[q]))for(let se=0;se<S.__webglFramebuffer[q].length;se++)s.deleteFramebuffer(S.__webglFramebuffer[q][se]);else s.deleteFramebuffer(S.__webglFramebuffer[q]);S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer[q])}else{if(Array.isArray(S.__webglFramebuffer))for(let q=0;q<S.__webglFramebuffer.length;q++)s.deleteFramebuffer(S.__webglFramebuffer[q]);else s.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&s.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&s.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let q=0;q<S.__webglColorRenderbuffer.length;q++)S.__webglColorRenderbuffer[q]&&s.deleteRenderbuffer(S.__webglColorRenderbuffer[q]);S.__webglDepthRenderbuffer&&s.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let H=C.textures;for(let q=0,se=H.length;q<se;q++){let ve=n.get(H[q]);ve.__webglTexture&&(s.deleteTexture(ve.__webglTexture),a.memory.textures--),n.remove(H[q])}n.remove(C)}let V=0;function X(){V=0}function O(){return V}function G(C){V=C}function Y(){let C=V;return C>=i.maxTextures&&Pe("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+i.maxTextures),V+=1,C}function k(C){let S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function re(C,S){let H=n.get(C);if(C.isVideoTexture&&F(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&H.__version!==C.version){let q=C.image;if(q===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{ye(H,C,S);return}}else C.isExternalTexture&&(H.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,H.__webglTexture,s.TEXTURE0+S)}function K(C,S){let H=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&H.__version!==C.version){ye(H,C,S);return}else C.isExternalTexture&&(H.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,H.__webglTexture,s.TEXTURE0+S)}function te(C,S){let H=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&H.__version!==C.version){ye(H,C,S);return}t.bindTexture(s.TEXTURE_3D,H.__webglTexture,s.TEXTURE0+S)}function Q(C,S){let H=n.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&H.__version!==C.version){Le(H,C,S);return}t.bindTexture(s.TEXTURE_CUBE_MAP,H.__webglTexture,s.TEXTURE0+S)}let Ve={[kr]:s.REPEAT,[Tn]:s.CLAMP_TO_EDGE,[Hr]:s.MIRRORED_REPEAT},Me={[Yt]:s.NEAREST,[wu]:s.NEAREST_MIPMAP_NEAREST,[ur]:s.NEAREST_MIPMAP_LINEAR,[Bt]:s.LINEAR,[Ra]:s.LINEAR_MIPMAP_NEAREST,[yi]:s.LINEAR_MIPMAP_LINEAR},bt={[Tf]:s.NEVER,[If]:s.ALWAYS,[Af]:s.LESS,[sc]:s.LEQUAL,[Rf]:s.EQUAL,[rc]:s.GEQUAL,[Cf]:s.GREATER,[Pf]:s.NOTEQUAL};function it(C,S){if(S.type===xn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Bt||S.magFilter===Ra||S.magFilter===ur||S.magFilter===yi||S.minFilter===Bt||S.minFilter===Ra||S.minFilter===ur||S.minFilter===yi)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,Ve[S.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,Ve[S.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,Ve[S.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,Me[S.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,Me[S.minFilter]),S.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,bt[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Yt||S.minFilter!==ur&&S.minFilter!==yi||S.type===xn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let H=e.get("EXT_texture_filter_anisotropic");s.texParameterf(C,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function at(C,S){let H=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",P));let q=S.source,se=f.get(q);se===void 0&&(se={},f.set(q,se));let ve=k(S);if(ve!==C.__cacheKey){se[ve]===void 0&&(se[ve]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,H=!0),se[ve].usedTimes++;let Te=se[C.__cacheKey];Te!==void 0&&(se[C.__cacheKey].usedTimes--,Te.usedTimes===0&&L(S)),C.__cacheKey=ve,C.__webglTexture=se[ve].texture}return H}function ne(C,S,H){return Math.floor(Math.floor(C/H)/S)}function he(C,S,H,q){let ve=C.updateRanges;if(ve.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,S.width,S.height,H,q,S.data);else{ve.sort((We,Ue)=>We.start-Ue.start);let Te=0;for(let We=1;We<ve.length;We++){let Ue=ve[Te],Ae=ve[We],Ne=Ue.start+Ue.count,rt=ne(Ae.start,S.width,4),lt=ne(Ue.start,S.width,4);Ae.start<=Ne+1&&rt===lt&&ne(Ae.start+Ae.count-1,S.width,4)===rt?Ue.count=Math.max(Ue.count,Ae.start+Ae.count-Ue.start):(++Te,ve[Te]=Ae)}ve.length=Te+1;let W=t.getParameter(s.UNPACK_ROW_LENGTH),ie=t.getParameter(s.UNPACK_SKIP_PIXELS),Se=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,S.width);for(let We=0,Ue=ve.length;We<Ue;We++){let Ae=ve[We],Ne=Math.floor(Ae.start/4),rt=Math.ceil(Ae.count/4),lt=Ne%S.width,z=Math.floor(Ne/S.width),Ie=rt,le=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,lt),t.pixelStorei(s.UNPACK_SKIP_ROWS,z),t.texSubImage2D(s.TEXTURE_2D,0,lt,z,Ie,le,H,q,S.data)}C.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,W),t.pixelStorei(s.UNPACK_SKIP_PIXELS,ie),t.pixelStorei(s.UNPACK_SKIP_ROWS,Se)}}function ye(C,S,H){let q=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(q=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(q=s.TEXTURE_3D);let se=at(C,S),ve=S.source;t.bindTexture(q,C.__webglTexture,s.TEXTURE0+H);let Te=n.get(ve);if(ve.version!==Te.__version||se===!0){if(t.activeTexture(s.TEXTURE0+H),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){let le=Mt.getPrimaries(Mt.workingColorSpace),xe=S.colorSpace===Ai?null:Mt.getPrimaries(S.colorSpace),Fe=S.colorSpace===Ai||le===xe?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe)}t.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment);let ie=g(S.image,!1,i.maxTextureSize);ie=At(S,ie);let Se=r.convert(S.format,S.colorSpace),We=r.convert(S.type),Ue=x(S.internalFormat,Se,We,S.normalized,S.colorSpace,S.isVideoTexture);it(q,S);let Ae,Ne=S.mipmaps,rt=S.isVideoTexture!==!0,lt=Te.__version===void 0||se===!0,z=ve.dataReady,Ie=T(S,ie);if(S.isDepthTexture)Ue=A(S.format===$i,S.type),lt&&(rt?t.texStorage2D(s.TEXTURE_2D,1,Ue,ie.width,ie.height):t.texImage2D(s.TEXTURE_2D,0,Ue,ie.width,ie.height,0,Se,We,null));else if(S.isDataTexture)if(Ne.length>0){rt&&lt&&t.texStorage2D(s.TEXTURE_2D,Ie,Ue,Ne[0].width,Ne[0].height);for(let le=0,xe=Ne.length;le<xe;le++)Ae=Ne[le],rt?z&&t.texSubImage2D(s.TEXTURE_2D,le,0,0,Ae.width,Ae.height,Se,We,Ae.data):t.texImage2D(s.TEXTURE_2D,le,Ue,Ae.width,Ae.height,0,Se,We,Ae.data);S.generateMipmaps=!1}else rt?(lt&&t.texStorage2D(s.TEXTURE_2D,Ie,Ue,ie.width,ie.height),z&&he(S,ie,Se,We)):t.texImage2D(s.TEXTURE_2D,0,Ue,ie.width,ie.height,0,Se,We,ie.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){rt&&lt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ie,Ue,Ne[0].width,Ne[0].height,ie.depth);for(let le=0,xe=Ne.length;le<xe;le++)if(Ae=Ne[le],S.format!==yn)if(Se!==null)if(rt){if(z)if(S.layerUpdates.size>0){let Fe=Uu(Ae.width,Ae.height,S.format,S.type);for(let fe of S.layerUpdates){let Je=Ae.data.subarray(fe*Fe/Ae.data.BYTES_PER_ELEMENT,(fe+1)*Fe/Ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,fe,Ae.width,Ae.height,1,Se,Je)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,0,Ae.width,Ae.height,ie.depth,Se,Ae.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,le,Ue,Ae.width,Ae.height,ie.depth,0,Ae.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else rt?z&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,le,0,0,0,Ae.width,Ae.height,ie.depth,Se,We,Ae.data):t.texImage3D(s.TEXTURE_2D_ARRAY,le,Ue,Ae.width,Ae.height,ie.depth,0,Se,We,Ae.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{rt&&lt&&t.texStorage2D(s.TEXTURE_2D,Ie,Ue,Ne[0].width,Ne[0].height);for(let le=0,xe=Ne.length;le<xe;le++)Ae=Ne[le],S.format!==yn?Se!==null?rt?z&&t.compressedTexSubImage2D(s.TEXTURE_2D,le,0,0,Ae.width,Ae.height,Se,Ae.data):t.compressedTexImage2D(s.TEXTURE_2D,le,Ue,Ae.width,Ae.height,0,Ae.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):rt?z&&t.texSubImage2D(s.TEXTURE_2D,le,0,0,Ae.width,Ae.height,Se,We,Ae.data):t.texImage2D(s.TEXTURE_2D,le,Ue,Ae.width,Ae.height,0,Se,We,Ae.data)}else if(S.isDataArrayTexture)if(rt){if(lt&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Ie,Ue,ie.width,ie.height,ie.depth),z)if(S.layerUpdates.size>0){let le=Uu(ie.width,ie.height,S.format,S.type);for(let xe of S.layerUpdates){let Fe=ie.data.subarray(xe*le/ie.data.BYTES_PER_ELEMENT,(xe+1)*le/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,xe,ie.width,ie.height,1,Se,We,Fe)}S.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,Se,We,ie.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Ue,ie.width,ie.height,ie.depth,0,Se,We,ie.data);else if(S.isData3DTexture)rt?(lt&&t.texStorage3D(s.TEXTURE_3D,Ie,Ue,ie.width,ie.height,ie.depth),z&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,Se,We,ie.data)):t.texImage3D(s.TEXTURE_3D,0,Ue,ie.width,ie.height,ie.depth,0,Se,We,ie.data);else if(S.isFramebufferTexture){if(lt)if(rt)t.texStorage2D(s.TEXTURE_2D,Ie,Ue,ie.width,ie.height);else{let le=ie.width,xe=ie.height;for(let Fe=0;Fe<Ie;Fe++)t.texImage2D(s.TEXTURE_2D,Fe,Ue,le,xe,0,Se,We,null),le>>=1,xe>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in s){let le=s.canvas;if(le.hasAttribute("layoutsubtree")||le.setAttribute("layoutsubtree","true"),ie.parentNode!==le){le.appendChild(ie),d.add(S),le.onpaint=xe=>{let Fe=xe.changedElements;for(let fe of d)Fe.includes(fe.image)&&(fe.needsUpdate=!0)},le.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,ie);else{let Fe=s.RGBA,fe=s.RGBA,Je=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Fe,fe,Je,ie)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Ne.length>0){if(rt&&lt){let le=ft(Ne[0]);t.texStorage2D(s.TEXTURE_2D,Ie,Ue,le.width,le.height)}for(let le=0,xe=Ne.length;le<xe;le++)Ae=Ne[le],rt?z&&t.texSubImage2D(s.TEXTURE_2D,le,0,0,Se,We,Ae):t.texImage2D(s.TEXTURE_2D,le,Ue,Se,We,Ae);S.generateMipmaps=!1}else if(rt){if(lt){let le=ft(ie);t.texStorage2D(s.TEXTURE_2D,Ie,Ue,le.width,le.height)}z&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,Se,We,ie)}else t.texImage2D(s.TEXTURE_2D,0,Ue,Se,We,ie);m(S)&&y(q),Te.__version=ve.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function Le(C,S,H){if(S.image.length!==6)return;let q=at(C,S),se=S.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+H);let ve=n.get(se);if(se.version!==ve.__version||q===!0){t.activeTexture(s.TEXTURE0+H);let Te=Mt.getPrimaries(Mt.workingColorSpace),W=S.colorSpace===Ai?null:Mt.getPrimaries(S.colorSpace),ie=S.colorSpace===Ai||Te===W?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ie);let Se=S.isCompressedTexture||S.image[0].isCompressedTexture,We=S.image[0]&&S.image[0].isDataTexture,Ue=[];for(let fe=0;fe<6;fe++)!Se&&!We?Ue[fe]=g(S.image[fe],!0,i.maxCubemapSize):Ue[fe]=We?S.image[fe].image:S.image[fe],Ue[fe]=At(S,Ue[fe]);let Ae=Ue[0],Ne=r.convert(S.format,S.colorSpace),rt=r.convert(S.type),lt=x(S.internalFormat,Ne,rt,S.normalized,S.colorSpace),z=S.isVideoTexture!==!0,Ie=ve.__version===void 0||q===!0,le=se.dataReady,xe=T(S,Ae);it(s.TEXTURE_CUBE_MAP,S);let Fe;if(Se){z&&Ie&&t.texStorage2D(s.TEXTURE_CUBE_MAP,xe,lt,Ae.width,Ae.height);for(let fe=0;fe<6;fe++){Fe=Ue[fe].mipmaps;for(let Je=0;Je<Fe.length;Je++){let Xe=Fe[Je];S.format!==yn?Ne!==null?z?le&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Je,0,0,Xe.width,Xe.height,Ne,Xe.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Je,lt,Xe.width,Xe.height,0,Xe.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?le&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Je,0,0,Xe.width,Xe.height,Ne,rt,Xe.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Je,lt,Xe.width,Xe.height,0,Ne,rt,Xe.data)}}}else{if(Fe=S.mipmaps,z&&Ie){Fe.length>0&&xe++;let fe=ft(Ue[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,xe,lt,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(We){z?le&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Ue[fe].width,Ue[fe].height,Ne,rt,Ue[fe].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,lt,Ue[fe].width,Ue[fe].height,0,Ne,rt,Ue[fe].data);for(let Je=0;Je<Fe.length;Je++){let Tt=Fe[Je].image[fe].image;z?le&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Je+1,0,0,Tt.width,Tt.height,Ne,rt,Tt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Je+1,lt,Tt.width,Tt.height,0,Ne,rt,Tt.data)}}else{z?le&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Ne,rt,Ue[fe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,lt,Ne,rt,Ue[fe]);for(let Je=0;Je<Fe.length;Je++){let Xe=Fe[Je];z?le&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Je+1,0,0,Ne,rt,Xe.image[fe]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Je+1,lt,Ne,rt,Xe.image[fe])}}}m(S)&&y(s.TEXTURE_CUBE_MAP),ve.__version=se.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function De(C,S,H,q,se,ve){let Te=r.convert(H.format,H.colorSpace),W=r.convert(H.type),ie=x(H.internalFormat,Te,W,H.normalized,H.colorSpace),Se=n.get(S),We=n.get(H);if(We.__renderTarget=S,!Se.__hasExternalTextures){let Ue=Math.max(1,S.width>>ve),Ae=Math.max(1,S.height>>ve);se===s.TEXTURE_3D||se===s.TEXTURE_2D_ARRAY?t.texImage3D(se,ve,ie,Ue,Ae,S.depth,0,Te,W,null):t.texImage2D(se,ve,ie,Ue,Ae,0,Te,W,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),nt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,q,se,We.__webglTexture,0,st(S)):(se===s.TEXTURE_2D||se>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,q,se,We.__webglTexture,ve),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Qe(C,S,H){if(s.bindRenderbuffer(s.RENDERBUFFER,C),S.depthBuffer){let q=S.depthTexture,se=q&&q.isDepthTexture?q.type:null,ve=A(S.stencilBuffer,se),Te=S.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;nt(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,st(S),ve,S.width,S.height):H?s.renderbufferStorageMultisample(s.RENDERBUFFER,st(S),ve,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,ve,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Te,s.RENDERBUFFER,C)}else{let q=S.textures;for(let se=0;se<q.length;se++){let ve=q[se],Te=r.convert(ve.format,ve.colorSpace),W=r.convert(ve.type),ie=x(ve.internalFormat,Te,W,ve.normalized,ve.colorSpace);nt(S)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,st(S),ie,S.width,S.height):H?s.renderbufferStorageMultisample(s.RENDERBUFFER,st(S),ie,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,ie,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function tt(C,S,H){let q=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let se=n.get(S.depthTexture);if(se.__renderTarget=S,(!se.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),q){if(se.__webglInit===void 0&&(se.__webglInit=!0,S.depthTexture.addEventListener("dispose",P)),se.__webglTexture===void 0){se.__webglTexture=s.createTexture(),t.bindTexture(s.TEXTURE_CUBE_MAP,se.__webglTexture),it(s.TEXTURE_CUBE_MAP,S.depthTexture);let Se=r.convert(S.depthTexture.format),We=r.convert(S.depthTexture.type),Ue;S.depthTexture.format===li?Ue=s.DEPTH_COMPONENT24:S.depthTexture.format===$i&&(Ue=s.DEPTH24_STENCIL8);for(let Ae=0;Ae<6;Ae++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,Ue,S.width,S.height,0,Se,We,null)}}else re(S.depthTexture,0);let ve=se.__webglTexture,Te=st(S),W=q?s.TEXTURE_CUBE_MAP_POSITIVE_X+H:s.TEXTURE_2D,ie=S.depthTexture.format===$i?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(S.depthTexture.format===li)nt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ie,W,ve,0,Te):s.framebufferTexture2D(s.FRAMEBUFFER,ie,W,ve,0);else if(S.depthTexture.format===$i)nt(S)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ie,W,ve,0,Te):s.framebufferTexture2D(s.FRAMEBUFFER,ie,W,ve,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function oe(C){let S=n.get(C),H=C.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==C.depthTexture){let q=C.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),q){let se=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,q.removeEventListener("dispose",se)};q.addEventListener("dispose",se),S.__depthDisposeCallback=se}S.__boundDepthTexture=q}if(C.depthTexture&&!S.__autoAllocateDepthBuffer)if(H)for(let q=0;q<6;q++)tt(S.__webglFramebuffer[q],C,q);else{let q=C.texture.mipmaps;q&&q.length>0?tt(S.__webglFramebuffer[0],C,0):tt(S.__webglFramebuffer,C,0)}else if(H){S.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[q]),S.__webglDepthbuffer[q]===void 0)S.__webglDepthbuffer[q]=s.createRenderbuffer(),Qe(S.__webglDepthbuffer[q],C,!1);else{let se=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ve=S.__webglDepthbuffer[q];s.bindRenderbuffer(s.RENDERBUFFER,ve),s.framebufferRenderbuffer(s.FRAMEBUFFER,se,s.RENDERBUFFER,ve)}}else{let q=C.texture.mipmaps;if(q&&q.length>0?t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=s.createRenderbuffer(),Qe(S.__webglDepthbuffer,C,!1);else{let se=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ve=S.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ve),s.framebufferRenderbuffer(s.FRAMEBUFFER,se,s.RENDERBUFFER,ve)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function me(C,S,H){let q=n.get(C);S!==void 0&&De(q.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),H!==void 0&&oe(C)}function pe(C){let S=C.texture,H=n.get(C),q=n.get(S);C.addEventListener("dispose",v);let se=C.textures,ve=C.isWebGLCubeRenderTarget===!0,Te=se.length>1;if(Te||(q.__webglTexture===void 0&&(q.__webglTexture=s.createTexture()),q.__version=S.version,a.memory.textures++),ve){H.__webglFramebuffer=[];for(let W=0;W<6;W++)if(S.mipmaps&&S.mipmaps.length>0){H.__webglFramebuffer[W]=[];for(let ie=0;ie<S.mipmaps.length;ie++)H.__webglFramebuffer[W][ie]=s.createFramebuffer()}else H.__webglFramebuffer[W]=s.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){H.__webglFramebuffer=[];for(let W=0;W<S.mipmaps.length;W++)H.__webglFramebuffer[W]=s.createFramebuffer()}else H.__webglFramebuffer=s.createFramebuffer();if(Te)for(let W=0,ie=se.length;W<ie;W++){let Se=n.get(se[W]);Se.__webglTexture===void 0&&(Se.__webglTexture=s.createTexture(),a.memory.textures++)}if(C.samples>0&&nt(C)===!1){H.__webglMultisampledFramebuffer=s.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let W=0;W<se.length;W++){let ie=se[W];H.__webglColorRenderbuffer[W]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,H.__webglColorRenderbuffer[W]);let Se=r.convert(ie.format,ie.colorSpace),We=r.convert(ie.type),Ue=x(ie.internalFormat,Se,We,ie.normalized,ie.colorSpace,C.isXRRenderTarget===!0),Ae=st(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ae,Ue,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+W,s.RENDERBUFFER,H.__webglColorRenderbuffer[W])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&(H.__webglDepthRenderbuffer=s.createRenderbuffer(),Qe(H.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ve){t.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture),it(s.TEXTURE_CUBE_MAP,S);for(let W=0;W<6;W++)if(S.mipmaps&&S.mipmaps.length>0)for(let ie=0;ie<S.mipmaps.length;ie++)De(H.__webglFramebuffer[W][ie],C,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+W,ie);else De(H.__webglFramebuffer[W],C,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+W,0);m(S)&&y(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let W=0,ie=se.length;W<ie;W++){let Se=se[W],We=n.get(Se),Ue=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(Ue=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(Ue,We.__webglTexture),it(Ue,Se),De(H.__webglFramebuffer,C,Se,s.COLOR_ATTACHMENT0+W,Ue,0),m(Se)&&y(Ue)}t.unbindTexture()}else{let W=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(W=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(W,q.__webglTexture),it(W,S),S.mipmaps&&S.mipmaps.length>0)for(let ie=0;ie<S.mipmaps.length;ie++)De(H.__webglFramebuffer[ie],C,S,s.COLOR_ATTACHMENT0,W,ie);else De(H.__webglFramebuffer,C,S,s.COLOR_ATTACHMENT0,W,0);m(S)&&y(W),t.unbindTexture()}C.depthBuffer&&oe(C)}function ge(C){let S=C.textures;for(let H=0,q=S.length;H<q;H++){let se=S[H];if(m(se)){let ve=b(C),Te=n.get(se).__webglTexture;t.bindTexture(ve,Te),y(ve),t.unbindTexture()}}}let Ee=[],ot=[];function et(C){if(C.samples>0){if(nt(C)===!1){let S=C.textures,H=C.width,q=C.height,se=s.COLOR_BUFFER_BIT,ve=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Te=n.get(C),W=S.length>1;if(W)for(let Se=0;Se<S.length;Se++)t.bindFramebuffer(s.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Te.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);let ie=C.texture.mipmaps;ie&&ie.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Se=0;Se<S.length;Se++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(se|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(se|=s.STENCIL_BUFFER_BIT)),W){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Te.__webglColorRenderbuffer[Se]);let We=n.get(S[Se]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,We,0)}s.blitFramebuffer(0,0,H,q,0,0,H,q,se,s.NEAREST),l===!0&&(Ee.length=0,ot.length=0,Ee.push(s.COLOR_ATTACHMENT0+Se),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(Ee.push(ve),ot.push(ve),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,ot)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Ee))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),W)for(let Se=0;Se<S.length;Se++){t.bindFramebuffer(s.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.RENDERBUFFER,Te.__webglColorRenderbuffer[Se]);let We=n.get(S[Se]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Te.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Se,s.TEXTURE_2D,We,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let S=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[S])}}}function st(C){return Math.min(i.maxSamples,C.samples)}function nt(C){let S=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function F(C){let S=a.render.frame;h.get(C)!==S&&(h.set(C,S),C.update())}function At(C,S){let H=C.colorSpace,q=C.format,se=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||H!==Xr&&H!==Ai&&(Mt.getTransfer(H)===Lt?(q!==yn||se!==Pn)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$e("WebGLTextures: Unsupported texture color space:",H)),S}function ft(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=X,this.getTextureUnits=O,this.setTextureUnits=G,this.setTexture2D=re,this.setTexture2DArray=K,this.setTexture3D=te,this.setTextureCube=Q,this.rebindTextures=me,this.setupRenderTarget=pe,this.updateRenderTargetMipmap=ge,this.updateMultisampleRenderTarget=et,this.setupDepthRenderbuffer=oe,this.setupFrameBufferTexture=De,this.useMultisampledRTT=nt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function t0(s,e){function t(n,i=Ai){let r,a=Mt.getTransfer(i);if(n===Pn)return s.UNSIGNED_BYTE;if(n===Ml)return s.UNSIGNED_SHORT_4_4_4_4;if(n===bl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Ru)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Cu)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Tu)return s.BYTE;if(n===Au)return s.SHORT;if(n===dr)return s.UNSIGNED_SHORT;if(n===Sl)return s.INT;if(n===Gn)return s.UNSIGNED_INT;if(n===xn)return s.FLOAT;if(n===jn)return s.HALF_FLOAT;if(n===Pu)return s.ALPHA;if(n===Iu)return s.RGB;if(n===yn)return s.RGBA;if(n===li)return s.DEPTH_COMPONENT;if(n===$i)return s.DEPTH_STENCIL;if(n===El)return s.RED;if(n===Ca)return s.RED_INTEGER;if(n===ji)return s.RG;if(n===wl)return s.RG_INTEGER;if(n===Tl)return s.RGBA_INTEGER;if(n===Pa||n===Ia||n===La||n===Da)if(a===Lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Pa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===La)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Pa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ia)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===La)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Da)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Al||n===Rl||n===Cl||n===Pl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Al)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Rl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Cl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Pl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Il||n===Ll||n===Dl||n===Ul||n===Nl||n===Ua||n===Fl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Il||n===Ll)return a===Lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Dl)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ul)return r.COMPRESSED_R11_EAC;if(n===Nl)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Ua)return r.COMPRESSED_RG11_EAC;if(n===Fl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ol||n===Bl||n===zl||n===Vl||n===kl||n===Hl||n===Gl||n===Wl||n===Xl||n===Yl||n===ql||n===Zl||n===Jl||n===Kl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ol)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Bl)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===zl)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Vl)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===kl)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Hl)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Gl)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Wl)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xl)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Yl)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ql)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Zl)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Jl)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Kl)return a===Lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===$l||n===jl||n===Ql)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===$l)return a===Lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===jl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ql)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ec||n===tc||n===Na||n===nc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===ec)return r.COMPRESSED_RED_RGTC1_EXT;if(n===tc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Na)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===nc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===fr?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}var qM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ZM=`
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

}`,jf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ta(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new hn({vertexShader:qM,fragmentShader:ZM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ot(new di(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Qf=class extends Nn{constructor(e,t){super();let n=this,i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,p=null,_=typeof XRWebGLBinding<"u",g=new jf,m={},y=t.getContextAttributes(),b=null,x=null,A=[],T=[],P=new ce,v=null,R=null,L=new Xt;L.viewport=new wt;let N=new Xt;N.viewport=new wt;let V=[L,N],X=new pl,O=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let he=A[ne];return he===void 0&&(he=new Gs,A[ne]=he),he.getTargetRaySpace()},this.getControllerGrip=function(ne){let he=A[ne];return he===void 0&&(he=new Gs,A[ne]=he),he.getGripSpace()},this.getHand=function(ne){let he=A[ne];return he===void 0&&(he=new Gs,A[ne]=he),he.getHandSpace()};function Y(ne){let he=T.indexOf(ne.inputSource);if(he===-1)return;let ye=A[he];ye!==void 0&&(ye.update(ne.inputSource,ne.frame,c||a),ye.dispatchEvent({type:ne.type,data:ne.inputSource}))}function k(){i.removeEventListener("select",Y),i.removeEventListener("selectstart",Y),i.removeEventListener("selectend",Y),i.removeEventListener("squeeze",Y),i.removeEventListener("squeezestart",Y),i.removeEventListener("squeezeend",Y),i.removeEventListener("end",k),i.removeEventListener("inputsourceschange",re);for(let ne=0;ne<A.length;ne++){let he=T[ne];he!==null&&(T[ne]=null,A[ne].disconnect(he))}O=null,G=null,g.reset();for(let ne in m)delete m[ne];if(e.setRenderTarget(b),f=null,u=null,d=null,i=null,x=null,at.stop(),n.isPresenting=!1,e.setPixelRatio(v),e.setSize(P.width,P.height,!1),R!==null){let ne=R.camera;ne.fov=R.fov,ne.zoom=R.zoom,ne.updateProjectionMatrix(),R=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){r=ne,n.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){o=ne,n.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(ne){c=ne},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&_&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(ne){if(i=ne,i!==null){if(b=e.getRenderTarget(),i.addEventListener("select",Y),i.addEventListener("selectstart",Y),i.addEventListener("selectend",Y),i.addEventListener("squeeze",Y),i.addEventListener("squeezestart",Y),i.addEventListener("squeezeend",Y),i.addEventListener("end",k),i.addEventListener("inputsourceschange",re),y.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(P),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,Le=null,De=null;y.depth&&(De=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=y.stencil?$i:li,Le=y.stencil?fr:Gn);let Qe={colorFormat:t.RGBA8,depthFormat:De,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Qe),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new cn(u.textureWidth,u.textureHeight,{format:yn,type:Pn,depthTexture:new Hi(u.textureWidth,u.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let ye={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,ye),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new cn(f.framebufferWidth,f.framebufferHeight,{format:yn,type:Pn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),at.setContext(i),at.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function re(ne){for(let he=0;he<ne.removed.length;he++){let ye=ne.removed[he],Le=T.indexOf(ye);Le>=0&&(T[Le]=null,A[Le].disconnect(ye))}for(let he=0;he<ne.added.length;he++){let ye=ne.added[he],Le=T.indexOf(ye);if(Le===-1){for(let Qe=0;Qe<A.length;Qe++)if(Qe>=T.length){T.push(ye),Le=Qe;break}else if(T[Qe]===null){T[Qe]=ye,Le=Qe;break}if(Le===-1)break}let De=A[Le];De&&De.connect(ye)}}let K=new E,te=new E;function Q(ne,he,ye){K.setFromMatrixPosition(he.matrixWorld),te.setFromMatrixPosition(ye.matrixWorld);let Le=K.distanceTo(te),De=he.projectionMatrix.elements,Qe=ye.projectionMatrix.elements,tt=De[14]/(De[10]-1),oe=De[14]/(De[10]+1),me=(De[9]+1)/De[5],pe=(De[9]-1)/De[5],ge=(De[8]-1)/De[0],Ee=(Qe[8]+1)/Qe[0],ot=tt*ge,et=tt*Ee,st=Le/(-ge+Ee),nt=st*-ge;if(he.matrixWorld.decompose(ne.position,ne.quaternion,ne.scale),ne.translateX(nt),ne.translateZ(st),ne.matrixWorld.compose(ne.position,ne.quaternion,ne.scale),ne.matrixWorldInverse.copy(ne.matrixWorld).invert(),De[10]===-1)ne.projectionMatrix.copy(he.projectionMatrix),ne.projectionMatrixInverse.copy(he.projectionMatrixInverse);else{let F=tt+st,At=oe+st,ft=ot-nt,C=et+(Le-nt),S=me*oe/At*F,H=pe*oe/At*F;ne.projectionMatrix.makePerspective(ft,C,S,H,F,At),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert()}}function Ve(ne,he){he===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(he.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(i===null)return;let he=ne.near,ye=ne.far;g.texture!==null&&(g.depthNear>0&&(he=g.depthNear),g.depthFar>0&&(ye=g.depthFar)),X.near=N.near=L.near=he,X.far=N.far=L.far=ye,(O!==X.near||G!==X.far)&&(i.updateRenderState({depthNear:X.near,depthFar:X.far}),O=X.near,G=X.far),X.layers.mask=ne.layers.mask|6,L.layers.mask=X.layers.mask&-5,N.layers.mask=X.layers.mask&-3;let Le=ne.parent,De=X.cameras;Ve(X,Le);for(let Qe=0;Qe<De.length;Qe++)Ve(De[Qe],Le);De.length===2?Q(X,L,N):X.projectionMatrix.copy(L.projectionMatrix),R===null&&ne.isPerspectiveCamera&&(R={camera:ne,fov:ne.fov,zoom:ne.zoom}),Me(ne,X,Le)};function Me(ne,he,ye){ye===null?ne.matrix.copy(he.matrixWorld):(ne.matrix.copy(ye.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(he.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(he.projectionMatrix),ne.projectionMatrixInverse.copy(he.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=zs*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return X},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(ne){l=ne,u!==null&&(u.fixedFoveation=ne),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ne)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(X)},this.getCameraTexture=function(ne){return m[ne]};let bt=null;function it(ne,he){if(h=he.getViewerPose(c||a),p=he,h!==null){let ye=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let Le=!1;ye.length!==X.cameras.length&&(X.cameras.length=0,Le=!0);for(let oe=0;oe<ye.length;oe++){let me=ye[oe],pe=null;if(f!==null)pe=f.getViewport(me);else{let Ee=d.getViewSubImage(u,me);pe=Ee.viewport,oe===0&&(e.setRenderTargetTextures(x,Ee.colorTexture,Ee.depthStencilTexture),e.setRenderTarget(x))}let ge=V[oe];ge===void 0&&(ge=new Xt,ge.layers.enable(oe),ge.viewport=new wt,V[oe]=ge),ge.matrix.fromArray(me.transform.matrix),ge.matrix.decompose(ge.position,ge.quaternion,ge.scale),ge.projectionMatrix.fromArray(me.projectionMatrix),ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(),ge.viewport.set(pe.x,pe.y,pe.width,pe.height),oe===0&&(X.matrix.copy(ge.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),Le===!0&&X.cameras.push(ge)}let De=i.enabledFeatures;if(De&&De.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){d=n.getBinding();let oe=d.getDepthInformation(ye[0]);oe&&oe.isValid&&oe.texture&&g.init(oe,i.renderState)}if(De&&De.includes("camera-access")&&_){e.state.unbindTexture(),d=n.getBinding();for(let oe=0;oe<ye.length;oe++){let me=ye[oe].camera;if(me){let pe=m[me];pe||(pe=new ta,m[me]=pe);let ge=d.getCameraImage(me);pe.sourceTexture=ge}}}}for(let ye=0;ye<A.length;ye++){let Le=T[ye],De=A[ye];Le!==null&&De!==void 0&&De.update(Le,he,c||a)}bt&&bt(ne,he),he.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:he}),p=null}let at=new Jg;at.setAnimationLoop(it),this.setAnimationLoop=function(ne){bt=ne},this.dispose=function(){}}},JM=new ct,n0=new dt;n0.set(-1,0,0,0,1,0,0,0,1);function KM(s,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Nf(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,y,b,x){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(g,m):m.isMeshLambertMaterial?(r(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,x)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),_(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,y,b):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Sn&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Sn&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);let y=e.get(m),b=y.envMap,x=y.envMapRotation;b&&(g.envMap.value=b,g.envMapRotation.value.setFromMatrix4(JM.makeRotationFromEuler(x)).transpose(),b.isCubeTexture&&b.isRenderTargetTexture===!1&&g.envMapRotation.value.premultiply(n0),g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,y,b){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*y,g.scale.value=b*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,y){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Sn&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.retroreflectivity>0&&(g.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function _(g,m){let y=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function $M(s,e,t,n){let i={},r={},a=[],o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,A){let T=A.program;n.uniformBlockBinding(x,T)}function c(x,A){let T=i[x.id];T===void 0&&(g(x),T=h(x),i[x.id]=T,x.addEventListener("dispose",y));let P=A.program;n.updateUBOMapping(x,P);let v=e.render.frame;r[x.id]!==v&&(u(x),r[x.id]=v)}function h(x){let A=d();x.__bindingPointIndex=A;let T=s.createBuffer(),P=x.__size,v=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,P,v),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,A,T),T}function d(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return $e("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){let A=i[x.id],T=x.uniforms,P=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,A);for(let v=0,R=T.length;v<R;v++){let L=T[v];if(Array.isArray(L))for(let N=0,V=L.length;N<V;N++)f(L[N],v,N,P);else f(L,v,0,P)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,A,T,P){if(_(x,A,T,P)===!0){let v=x.__offset,R=x.value;if(Array.isArray(R)){let L=0;for(let N=0;N<R.length;N++){let V=R[N],X=m(V);p(V,x.__data,L),typeof V!="number"&&typeof V!="boolean"&&!V.isMatrix3&&!ArrayBuffer.isView(V)&&(L+=X.storage/Float32Array.BYTES_PER_ELEMENT)}}else p(R,x.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,v,x.__data)}}function p(x,A,T){typeof x=="number"||typeof x=="boolean"?A[0]=x:x.isMatrix3?(A[0]=x.elements[0],A[1]=x.elements[1],A[2]=x.elements[2],A[3]=0,A[4]=x.elements[3],A[5]=x.elements[4],A[6]=x.elements[5],A[7]=0,A[8]=x.elements[6],A[9]=x.elements[7],A[10]=x.elements[8],A[11]=0):ArrayBuffer.isView(x)?A.set(new x.constructor(x.buffer,x.byteOffset,A.length)):x.toArray(A,T)}function _(x,A,T,P){let v=x.value,R=A+"_"+T;if(P[R]===void 0)return typeof v=="number"||typeof v=="boolean"?P[R]=v:ArrayBuffer.isView(v)?P[R]=v.slice():P[R]=v.clone(),!0;{let L=P[R];if(typeof v=="number"||typeof v=="boolean"){if(L!==v)return P[R]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(L.equals(v)===!1)return L.copy(v),!0}}return!1}function g(x){let A=x.uniforms,T=0,P=16;for(let R=0,L=A.length;R<L;R++){let N=Array.isArray(A[R])?A[R]:[A[R]];for(let V=0,X=N.length;V<X;V++){let O=N[V],G=Array.isArray(O.value)?O.value:[O.value];for(let Y=0,k=G.length;Y<k;Y++){let re=G[Y],K=m(re),te=T%P,Q=te%K.boundary,Ve=te+Q;T+=Q,Ve!==0&&P-Ve<K.storage&&(T+=P-Ve),O.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=T,T+=K.storage}}}let v=T%P;return v>0&&(T+=P-v),x.__size=T,x.__cache={},this}function m(x){let A={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(A.boundary=4,A.storage=4):x.isVector2?(A.boundary=8,A.storage=8):x.isVector3||x.isColor?(A.boundary=16,A.storage=12):x.isVector4?(A.boundary=16,A.storage=16):x.isMatrix3?(A.boundary=48,A.storage=48):x.isMatrix4?(A.boundary=64,A.storage=64):x.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(A.boundary=16,A.storage=x.byteLength):Pe("WebGLRenderer: Unsupported uniform value type.",x),A}function y(x){let A=x.target;A.removeEventListener("dispose",y);let T=a.indexOf(A.__bindingPointIndex);a.splice(T,1),s.deleteBuffer(i[A.id]),delete i[A.id],delete r[A.id]}function b(){for(let x in i)s.deleteBuffer(i[x]);a=[],i={},r={}}return{bind:l,update:c,dispose:b}}var jM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ri=null;function QM(){return Ri===null&&(Ri=new An(jM,16,16,ji,jn),Ri.name="DFG_LUT",Ri.minFilter=Bt,Ri.magFilter=Bt,Ri.wrapS=Tn,Ri.wrapT=Tn,Ri.generateMipmaps=!1,Ri.needsUpdate=!0),Ri}var dc=class{constructor(e={}){let{canvas:t=Lf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Pn}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let _=f,g=new Set([Tl,wl,Ca]),m=new Set([Pn,Gn,dr,fr,Ml,bl]),y=new Uint32Array(4),b=new Int32Array(4),x=new E,A=null,T=null,P=[],v=[],R=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=$n,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let L=this,N=!1,V=null,X=null,O=null,G=null;this._outputColorSpace=an;let Y=0,k=0,re=null,K=-1,te=null,Q=new wt,Ve=new wt,Me=null,bt=new ze(0),it=0,at=t.width,ne=t.height,he=1,ye=null,Le=null,De=new wt(0,0,at,ne),Qe=new wt(0,0,at,ne),tt=!1,oe=new bi,me=!1,pe=!1,ge=new ct,Ee=new E,ot=new wt,et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},st=!1;function nt(){return re===null?he:1}let F=n;function At(w,B){return t.getContext(w,B)}let ft,C,S,H,q,se,ve,Te,W,ie,Se,We,Ue,Ae,Ne,rt,lt,z,Ie,le,xe,Fe,fe;try{let w={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Tt,!1),t.addEventListener("webglcontextrestored",St,!1),t.addEventListener("webglcontextcreationerror",on,!1),F===null){let B="webgl2";if(F=At(B,w),F===null)throw At(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Je()}catch(w){throw t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",St,!1),t.removeEventListener("webglcontextcreationerror",on,!1),$e("WebGLRenderer: "+w.message),w}function Je(){ft=new oS(F),ft.init(),xe=new t0(F,ft),C=new $v(F,ft,e,xe),S=new XM(F,ft),C.reversedDepthBuffer&&u&&S.buffers.depth.setReversed(!0),X=F.createFramebuffer(),O=F.createFramebuffer(),G=F.createFramebuffer(),H=new hS(F),q=new IM,se=new YM(F,ft,S,q,C,xe,H),ve=new aS(L),Te=new dx(F),Fe=new Jv(F,Te),W=new lS(F,Te,H,Fe),ie=new dS(F,W,Te,Fe,H),z=new uS(F,C,se),Ne=new jv(q),Se=new PM(L,ve,ft,C,Fe,Ne),We=new KM(L,q),Ue=new DM,Ae=new zM(ft),lt=new Zv(L,ve,S,ie,p,l),rt=new WM(L,ie,C),fe=new $M(F,H,C,S),Ie=new Kv(F,ft,H),le=new cS(F,ft,H),H.programs=Se.programs,L.capabilities=C,L.extensions=ft,L.properties=q,L.renderLists=Ue,L.shadowMap=rt,L.state=S,L.info=H}_!==Pn&&(R=new pS(_,t.width,t.height,o,i,r));let Xe=new Qf(L,F);this.xr=Xe,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let w=ft.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=ft.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(w){w!==void 0&&(he=w,this.setSize(at,ne,!1))},this.getSize=function(w){return w.set(at,ne)},this.setSize=function(w,B,j=!0){if(Xe.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}at=w,ne=B,t.width=Math.floor(w*he),t.height=Math.floor(B*he),j===!0&&(t.style.width=w+"px",t.style.height=B+"px"),R!==null&&R.setSize(t.width,t.height),this.setViewport(0,0,w,B)},this.getDrawingBufferSize=function(w){return w.set(at*he,ne*he).floor()},this.setDrawingBufferSize=function(w,B,j){at=w,ne=B,he=j,t.width=Math.floor(w*j),t.height=Math.floor(B*j),this.setViewport(0,0,w,B)},this.setEffects=function(w){if(_===Pn){$e("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(w){for(let B=0;B<w.length;B++)if(w[B].isOutputPass===!0){Pe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(w||[])},this.getCurrentViewport=function(w){return w.copy(Q)},this.getViewport=function(w){return w.copy(De)},this.setViewport=function(w,B,j,J){w.isVector4?De.set(w.x,w.y,w.z,w.w):De.set(w,B,j,J),S.viewport(Q.copy(De).multiplyScalar(he).round())},this.getScissor=function(w){return w.copy(Qe)},this.setScissor=function(w,B,j,J){w.isVector4?Qe.set(w.x,w.y,w.z,w.w):Qe.set(w,B,j,J),S.scissor(Ve.copy(Qe).multiplyScalar(he).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(w){S.setScissorTest(tt=w)},this.setOpaqueSort=function(w){ye=w},this.setTransparentSort=function(w){Le=w},this.getClearColor=function(w){return w.copy(lt.getClearColor())},this.setClearColor=function(){lt.setClearColor(...arguments)},this.getClearAlpha=function(){return lt.getClearAlpha()},this.setClearAlpha=function(){lt.setClearAlpha(...arguments)},this.clear=function(w=!0,B=!0,j=!0){let J=0;if(w){let Z=!1;if(re!==null){let Be=re.texture.format;Z=g.has(Be)}if(Z){let Be=re.texture.type,He=m.has(Be),Oe=lt.getClearColor(),Ye=lt.getClearAlpha(),Ze=Oe.r,mt=Oe.g,xt=Oe.b;He?(y[0]=Ze,y[1]=mt,y[2]=xt,y[3]=Ye,F.clearBufferuiv(F.COLOR,0,y)):(b[0]=Ze,b[1]=mt,b[2]=xt,b[3]=Ye,F.clearBufferiv(F.COLOR,0,b))}else J|=F.COLOR_BUFFER_BIT}B&&(J|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),j&&(J|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&F.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(w){w.setRenderer(this),V=w},this.dispose=function(){t.removeEventListener("webglcontextlost",Tt,!1),t.removeEventListener("webglcontextrestored",St,!1),t.removeEventListener("webglcontextcreationerror",on,!1),lt.dispose(),Ue.dispose(),Ae.dispose(),q.dispose(),ve.dispose(),ie.dispose(),Fe.dispose(),fe.dispose(),Se.dispose(),Xe.dispose(),Xe.removeEventListener("sessionstart",Ga),Xe.removeEventListener("sessionend",Wa),Wn.stop()};function Tt(w){w.preventDefault(),Zr("WebGLRenderer: Context Lost."),N=!0}function St(){Zr("WebGLRenderer: Context Restored."),N=!1;let w=H.autoReset,B=rt.enabled,j=rt.autoUpdate,J=rt.needsUpdate,Z=rt.type;Je(),H.autoReset=w,rt.enabled=B,rt.autoUpdate=j,rt.needsUpdate=J,rt.type=Z}function on(w){$e("WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function ln(w){let B=w.target;B.removeEventListener("dispose",ln),qu(B)}function qu(w){Es(w),q.remove(w)}function Es(w){let B=q.get(w).programs;B!==void 0&&(B.forEach(function(j){Se.releaseProgram(j)}),w.isShaderMaterial&&Se.releaseShaderCache(w))}this.renderBufferDirect=function(w,B,j,J,Z,Be){B===null&&(B=et);let He=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,Oe=yc(w,B,j,J,Z);S.setMaterial(J,He);let Ye=j.index,Ze=1;if(J.wireframe===!0){if(Ye=W.getWireframeAttribute(j),Ye===void 0)return;Ze=2}let mt=j.drawRange,xt=j.attributes.position,qe=mt.start*Ze,M=(mt.start+mt.count)*Ze;Be!==null&&(qe=Math.max(qe,Be.start*Ze),M=Math.min(M,(Be.start+Be.count)*Ze)),Ye!==null?(qe=Math.max(qe,0),M=Math.min(M,Ye.count)):xt!=null&&(qe=Math.max(qe,0),M=Math.min(M,xt.count));let I=M-qe;if(I<0||I===1/0)return;Fe.setup(Z,J,Oe,j,Ye);let D,U=Ie;if(Ye!==null&&(D=Te.get(Ye),U=le,U.setIndex(D)),Z.isMesh)J.wireframe===!0?(S.setLineWidth(J.wireframeLinewidth*nt()),U.setMode(F.LINES)):U.setMode(F.TRIANGLES);else if(Z.isLine){let ae=J.linewidth;ae===void 0&&(ae=1),S.setLineWidth(ae*nt()),Z.isLineSegments?U.setMode(F.LINES):Z.isLineLoop?U.setMode(F.LINE_LOOP):U.setMode(F.LINE_STRIP)}else Z.isPoints?U.setMode(F.POINTS):Z.isSprite&&U.setMode(F.TRIANGLES);if(Z.isBatchedMesh)if(ft.get("WEBGL_multi_draw"))U.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{let ae=Z._multiDrawStarts,ee=Z._multiDrawCounts,we=Z._multiDrawCount,de=Ye?Te.get(Ye).bytesPerElement:1,$=q.get(J).currentProgram.getUniforms();for(let je=0;je<we;je++)$.setValue(F,"_gl_DrawID",je),U.render(ae[je]/de,ee[je])}else if(Z.isInstancedMesh)U.renderInstances(qe,I,Z.count);else if(j.isInstancedBufferGeometry){let ae=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,ee=Math.min(j.instanceCount,ae);U.renderInstances(qe,I,ee)}else U.render(qe,I)};function ti(w,B,j,J){V!==null&&w.isNodeMaterial&&V.setObject(J,w),me===!0&&Ne.setState(w,j,!1),w.transparent===!0&&w.side===Hn&&w.forceSinglePass===!1?(w.side=Sn,w.needsUpdate=!0,ts(w,B,J),w.side=Ji,w.needsUpdate=!0,ts(w,B,J),w.side=Hn):ts(w,B,J)}this.compile=function(w,B,j=null){j===null&&(j=w),V!==null&&V.renderStart(w,B,j),T=Ae.get(j),T.init(B),v.push(T),j.traverseVisible(function(Z){Z.isLight&&Z.layers.test(B.layers)&&(T.pushLight(Z),Z.castShadow&&T.pushShadow(Z))}),w!==j&&w.traverseVisible(function(Z){Z.isLight&&Z.layers.test(B.layers)&&(T.pushLight(Z),Z.castShadow&&T.pushShadow(Z))}),T.setupLights(),V!==null&&V.updateLights(T.state.lightsArray),pe=this.localClippingEnabled,me=Ne.init(this.clippingPlanes,pe),me===!0&&Ne.setGlobalState(this.clippingPlanes,B),V!==null&&rt.render(T.state.shadowsArray,j,B);let J=new Set;return w.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;let Be=Z.material;if(Be)if(Array.isArray(Be))for(let He=0;He<Be.length;He++){let Oe=Be[He];ti(Oe,j,B,Z),J.add(Oe)}else ti(Be,j,B,Z),J.add(Be)}),T=v.pop(),V!==null&&V.renderEnd(),J},this.compileAsync=function(w,B,j=null){let J=this.compile(w,B,j);return new Promise(Z=>{function Be(){if(J.forEach(function(He){let Ye=q.get(He).currentProgram;(Ye===void 0||Ye.isReady())&&J.delete(He)}),J.size===0){Z(w);return}setTimeout(Be,10)}ft.get("KHR_parallel_shader_compile")!==null?Be():setTimeout(Be,10)})};let Ha=null;function Zu(w){Ha&&Ha(w)}function Ga(){Wn.stop()}function Wa(){Wn.start()}let Wn=new Jg;Wn.setAnimationLoop(Zu),typeof self<"u"&&Wn.setContext(self),this.setAnimationLoop=function(w){Ha=w,Xe.setAnimationLoop(w),w===null?Wn.stop():Wn.start()},Xe.addEventListener("sessionstart",Ga),Xe.addEventListener("sessionend",Wa),this.render=function(w,B){if(B!==void 0&&B.isCamera!==!0){$e("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;V!==null&&V.renderStart(w,B);let j=Xe.enabled===!0&&Xe.isPresenting===!0,J=R!==null&&(re===null||j)&&R.begin(L,re);if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Xe.enabled===!0&&Xe.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Xe.cameraAutoUpdate===!0&&Xe.updateCamera(B),B=Xe.getCamera()),w.isScene===!0&&w.onBeforeRender(L,w,B,re),T=Ae.get(w,v.length),T.init(B),T.state.textureUnits=se.getTextureUnits(),v.push(T),ge.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),oe.setFromProjectionMatrix(ge,Un,B.reversedDepth),pe=this.localClippingEnabled,me=Ne.init(this.clippingPlanes,pe),A=Ue.get(w,P.length),A.init(),P.push(A),Xe.enabled===!0&&Xe.isPresenting===!0){let He=L.xr.getDepthSensingMesh();He!==null&&Dt(He,B,-1/0,L.sortObjects)}Dt(w,B,0,L.sortObjects),A.finish(),V!==null&&V.updateLights(T.state.lightsArray),L.sortObjects===!0&&A.sort(ye,Le),st=Xe.enabled===!1||Xe.isPresenting===!1||Xe.hasDepthSensing()===!1,st&&lt.addToRenderList(A,w),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),me===!0&&Ne.beginShadows();let Z=T.state.shadowsArray;if(rt.render(Z,w,B),me===!0&&Ne.endShadows(),(J&&R.hasRenderPass())===!1){let He=A.opaque,Oe=A.transmissive;if(T.setupLights(),B.isArrayCamera){let Ye=B.cameras;if(Oe.length>0)for(let Ze=0,mt=Ye.length;Ze<mt;Ze++){let xt=Ye[Ze];gc(He,Oe,w,xt)}st&&lt.render(w);for(let Ze=0,mt=Ye.length;Ze<mt;Ze++){let xt=Ye[Ze];mc(A,w,xt,xt.viewport)}}else Oe.length>0&&gc(He,Oe,w,B),st&&lt.render(w),mc(A,w,B)}re!==null&&k===0&&(se.updateMultisampleRenderTarget(re),se.updateRenderTargetMipmap(re)),J&&R.end(L),w.isScene===!0&&w.onAfterRender(L,w,B),Fe.resetDefaultState(),K=-1,te=null,v.pop(),v.length>0?(T=v[v.length-1],se.setTextureUnits(T.state.textureUnits),me===!0&&Ne.setGlobalState(L.clippingPlanes,T.state.camera)):T=null,P.pop(),P.length>0?A=P[P.length-1]:A=null,V!==null&&V.renderEnd()};function Dt(w,B,j,J){if(w.visible===!1)return;if(w.layers.test(B.layers)){if(w.isGroup)j=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(B);else if(w.isLightProbeGrid)T.pushLightProbeGrid(w);else if(w.isLight)T.pushLight(w),w.castShadow&&T.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||w.intersectsFrustum(oe)){J&&ot.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ge);let He=ie.update(w),Oe=w.material;Oe.visible&&A.push(w,He,Oe,j,ot.z,null,B)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||w.intersectsFrustum(oe))){let He=ie.update(w),Oe=w.material;if(J&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),ot.copy(w.boundingSphere.center)):(He.boundingSphere===null&&He.computeBoundingSphere(),ot.copy(He.boundingSphere.center)),ot.applyMatrix4(w.matrixWorld).applyMatrix4(ge)),Array.isArray(Oe)){let Ye=He.groups;for(let Ze=0,mt=Ye.length;Ze<mt;Ze++){let xt=Ye[Ze],qe=Oe[xt.materialIndex];qe&&qe.visible&&A.push(w,He,qe,j,ot.z,xt,B)}}else Oe.visible&&A.push(w,He,Oe,j,ot.z,null,B)}}let Be=w.children;for(let He=0,Oe=Be.length;He<Oe;He++)Dt(Be[He],B,j,J)}function mc(w,B,j,J){let{opaque:Z,transmissive:Be,transparent:He}=w;T.setupLightsView(j),me===!0&&Ne.setGlobalState(L.clippingPlanes,j),J&&S.viewport(Q.copy(J)),Z.length>0&&es(Z,B,j),Be.length>0&&es(Be,B,j),He.length>0&&es(He,B,j),S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function gc(w,B,j,J){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[J.id]===void 0){let qe=ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[J.id]=new cn(1,1,{generateMipmaps:!0,type:qe?jn:Pn,minFilter:yi,samples:Math.max(4,C.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Mt.workingColorSpace})}let Be=T.state.transmissionRenderTarget[J.id],He=J.viewport||Q;Be.setSize(He.z*L.transmissionResolutionScale,He.w*L.transmissionResolutionScale);let Oe=L.getRenderTarget(),Ye=L.getActiveCubeFace(),Ze=L.getActiveMipmapLevel();L.setRenderTarget(Be),L.getClearColor(bt),it=L.getClearAlpha(),it<1&&L.setClearColor(16777215,.5),L.clear(),st&&lt.render(j);let mt=L.toneMapping;L.toneMapping=$n;let xt=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),T.setupLightsView(J),me===!0&&Ne.setGlobalState(L.clippingPlanes,J),es(w,j,J),se.updateMultisampleRenderTarget(Be),se.updateRenderTargetMipmap(Be),ft.has("WEBGL_multisampled_render_to_texture")===!1){let qe=!1;for(let M=0,I=B.length;M<I;M++){let D=B[M],{object:U,geometry:ae,material:ee,group:we}=D;if(ee.side===Hn&&U.layers.test(J.layers)){let de=ee.side;ee.side=Sn,ee.needsUpdate=!0,Xa(U,j,J,ae,ee,we),ee.side=de,ee.needsUpdate=!0,qe=!0}}qe===!0&&(se.updateMultisampleRenderTarget(Be),se.updateRenderTargetMipmap(Be))}L.setRenderTarget(Oe,Ye,Ze),L.setClearColor(bt,it),xt!==void 0&&(J.viewport=xt),L.toneMapping=mt}function es(w,B,j){let J=B.isScene===!0?B.overrideMaterial:null;for(let Z=0,Be=w.length;Z<Be;Z++){let He=w[Z],{object:Oe,geometry:Ye,group:Ze}=He,mt=He.material;mt.allowOverride===!0&&J!==null&&(mt=J),Oe.layers.test(j.layers)&&Xa(Oe,B,j,Ye,mt,Ze)}}function Xa(w,B,j,J,Z,Be){V!==null&&Z.isNodeMaterial&&V.setObject(w,Z),w.onBeforeRender(L,B,j,J,Z,Be),w.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),Z.onBeforeRender(L,B,j,J,w,Be),Z.transparent===!0&&Z.side===Hn&&Z.forceSinglePass===!1?(Z.side=Sn,Z.needsUpdate=!0,L.renderBufferDirect(j,B,J,Z,w,Be),Z.side=Ji,Z.needsUpdate=!0,L.renderBufferDirect(j,B,J,Z,w,Be),Z.side=Hn):L.renderBufferDirect(j,B,J,Z,w,Be),w.onAfterRender(L,B,j,J,Z,Be)}function ts(w,B,j){B.isScene!==!0&&(B=et);let J=q.get(w),Z=T.state.lights,Be=T.state.shadowsArray,He=Z.state.version,Oe=Se.getParameters(w,Z.state,Be,B,j,T.state.lightProbeGridArray),Ye=Se.getProgramCacheKey(Oe),Ze=J.programs;J.environment=w.isMeshStandardMaterial||w.isMeshLambertMaterial||w.isMeshPhongMaterial?B.environment:null,J.fog=B.fog;let mt=w.isMeshStandardMaterial||w.isMeshLambertMaterial&&!w.envMap||w.isMeshPhongMaterial&&!w.envMap;J.envMap=ve.get(w.envMap||J.environment,mt),J.envMapRotation=J.environment!==null&&w.envMap===null?B.environmentRotation:w.envMapRotation,Ze===void 0&&(w.addEventListener("dispose",ln),Ze=new Map,J.programs=Ze);let xt=Ze.get(Ye);if(xt!==void 0){if(J.currentProgram===xt&&J.lightsStateVersion===He)return _c(w,Oe),xt}else Oe.uniforms=Se.getUniforms(w),V!==null&&w.isNodeMaterial&&V.build(w,j,Oe),w.onBeforeCompile(Oe,L),xt=Se.acquireProgram(Oe,Ye),Ze.set(Ye,xt),J.uniforms=Oe.uniforms;let qe=J.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(qe.clippingPlanes=Ne.uniform),_c(w,Oe),J.needsLights=Ku(w),J.lightsStateVersion=He,J.needsLights&&(qe.ambientLightColor.value=Z.state.ambient,qe.lightProbe.value=Z.state.probe,qe.sunLights.value=Z.state.sun,qe.sunLightShadows.value=Z.state.sunShadow,qe.directionalLights.value=Z.state.directional,qe.directionalLightShadows.value=Z.state.directionalShadow,qe.spotLights.value=Z.state.spot,qe.spotLightShadows.value=Z.state.spotShadow,qe.rectAreaLights.value=Z.state.rectArea,qe.ltc_1.value=Z.state.rectAreaLTC1,qe.ltc_2.value=Z.state.rectAreaLTC2,qe.pointLights.value=Z.state.point,qe.pointLightShadows.value=Z.state.pointShadow,qe.hemisphereLights.value=Z.state.hemi,qe.sunShadowMatrix.value=Z.state.sunShadowMatrix,qe.sunShadowCascade.value=Z.state.sunShadowCascade,qe.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,qe.spotLightMatrix.value=Z.state.spotLightMatrix,qe.spotLightMap.value=Z.state.spotLightMap,qe.pointShadowMatrix.value=Z.state.pointShadowMatrix),J.lightProbeGrid=T.state.lightProbeGridArray.length>0,J.currentProgram=xt,J.uniformsList=null,xt}function Ya(w){if(w.uniformsList===null){let B=w.currentProgram.getUniforms();w.uniformsList=za.seqWithValue(B.seq,w.uniforms)}return w.uniformsList}function _c(w,B){let j=q.get(w);j.outputColorSpace=B.outputColorSpace,j.batching=B.batching,j.batchingColor=B.batchingColor,j.instancing=B.instancing,j.instancingColor=B.instancingColor,j.instancingMorph=B.instancingMorph,j.skinning=B.skinning,j.morphTargets=B.morphTargets,j.morphNormals=B.morphNormals,j.morphColors=B.morphColors,j.morphTargetsCount=B.morphTargetsCount,j.numClippingPlanes=B.numClippingPlanes,j.numIntersection=B.numClipIntersection,j.vertexAlphas=B.vertexAlphas,j.vertexTangents=B.vertexTangents,j.toneMapping=B.toneMapping}function xc(w,B){if(w.length===0)return null;if(w.length===1)return w[0].texture!==null?w[0]:null;x.setFromMatrixPosition(B.matrixWorld);for(let j=0,J=w.length;j<J;j++){let Z=w[j];if(Z.texture!==null&&Z.boundingBox.containsPoint(x))return Z}return null}function yc(w,B,j,J,Z){B.isScene!==!0&&(B=et),se.resetTextureUnits();let Be=B.fog,He=J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial?B.environment:null,Oe=re===null?L.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:Mt.workingColorSpace,Ye=J.isMeshStandardMaterial||J.isMeshLambertMaterial&&!J.envMap||J.isMeshPhongMaterial&&!J.envMap,Ze=ve.get(J.envMap||He,Ye),mt=J.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,xt=!!j.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),qe=!!j.morphAttributes.position,M=!!j.morphAttributes.normal,I=!!j.morphAttributes.color,D=$n;J.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(D=L.toneMapping);let U=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,ae=U!==void 0?U.length:0,ee=q.get(J),we=T.state.lights;if(me===!0&&(pe===!0||w!==te)){let ue=w===te&&J.id===K;Ne.setState(J,w,ue)}let de=!1;J.version===ee.__version?(ee.needsLights&&ee.lightsStateVersion!==we.state.version||ee.outputColorSpace!==Oe||Z.isBatchedMesh&&ee.batching===!1||!Z.isBatchedMesh&&ee.batching===!0||Z.isBatchedMesh&&ee.batchingColor===!0&&Z._colorsTexture===null||Z.isBatchedMesh&&ee.batchingColor===!1&&Z._colorsTexture!==null||Z.isInstancedMesh&&ee.instancing===!1||!Z.isInstancedMesh&&ee.instancing===!0||Z.isSkinnedMesh&&ee.skinning===!1||!Z.isSkinnedMesh&&ee.skinning===!0||Z.isInstancedMesh&&ee.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&ee.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&ee.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&ee.instancingMorph===!1&&Z.morphTexture!==null||ee.envMap!==Ze||J.fog===!0&&ee.fog!==Be||ee.numClippingPlanes!==void 0&&(ee.numClippingPlanes!==Ne.numPlanes||ee.numIntersection!==Ne.numIntersection)||ee.vertexAlphas!==mt||ee.vertexTangents!==xt||ee.morphTargets!==qe||ee.morphNormals!==M||ee.morphColors!==I||ee.toneMapping!==D||ee.morphTargetsCount!==ae||!!ee.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(de=!0):(de=!0,ee.__version=J.version);let $=ee.currentProgram;de===!0&&($=ts(J,B,Z),V&&J.isNodeMaterial&&V.onUpdateProgram(J,$,ee));let je=!1,_e=!1,Re=!1,be=$.getUniforms(),ut=ee.uniforms;if(S.useProgram($.program)&&(je=!0,_e=!0,Re=!0),J.id!==K&&(K=J.id,_e=!0),ee.needsLights){let ue=xc(T.state.lightProbeGridArray,Z);ee.lightProbeGrid!==ue&&(ee.lightProbeGrid=ue,_e=!0)}if(je||te!==w){S.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),be.setValue(F,"projectionMatrix",w.projectionMatrix),be.setValue(F,"viewMatrix",w.matrixWorldInverse);let Ge=be.map.cameraPosition;Ge!==void 0&&Ge.setValue(F,Ee.setFromMatrixPosition(w.matrixWorld)),C.logarithmicDepthBuffer&&be.setValue(F,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&be.setValue(F,"isOrthographic",w.isOrthographicCamera===!0),te!==w&&(te=w,_e=!0,Re=!0)}if(ee.needsLights&&(we.state.sunShadowMap.length>0&&be.setValue(F,"sunShadowMap",we.state.sunShadowMap,se),we.state.directionalShadowMap.length>0&&be.setValue(F,"directionalShadowMap",we.state.directionalShadowMap,se),we.state.spotShadowMap.length>0&&be.setValue(F,"spotShadowMap",we.state.spotShadowMap,se),we.state.pointShadowMap.length>0&&be.setValue(F,"pointShadowMap",we.state.pointShadowMap,se)),Z.isSkinnedMesh){be.setOptional(F,Z,"bindMatrix"),be.setOptional(F,Z,"bindMatrixInverse");let ue=Z.skeleton;ue&&(ue.boneTexture===null&&ue.computeBoneTexture(),be.setValue(F,"boneTexture",ue.boneTexture,se))}Z.isBatchedMesh&&(be.setOptional(F,Z,"batchingTexture"),be.setValue(F,"batchingTexture",Z._matricesTexture,se),be.setOptional(F,Z,"batchingIdTexture"),be.setValue(F,"batchingIdTexture",Z._indirectTexture,se),be.setOptional(F,Z,"batchingColorTexture"),Z._colorsTexture!==null&&be.setValue(F,"batchingColorTexture",Z._colorsTexture,se));let It=j.morphAttributes;if((It.position!==void 0||It.normal!==void 0||It.color!==void 0)&&z.update(Z,j,$),(_e||ee.receiveShadow!==Z.receiveShadow)&&(ee.receiveShadow=Z.receiveShadow,be.setValue(F,"receiveShadow",Z.receiveShadow)),(J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial)&&J.envMap===null&&B.environment!==null&&(ut.envMapIntensity.value=B.environmentIntensity),ut.dfgLUT!==void 0&&(ut.dfgLUT.value=QM()),_e){if(be.setValue(F,"toneMappingExposure",L.toneMappingExposure),ee.needsLights&&Ju(ut,Re),Be&&J.fog===!0&&We.refreshFogUniforms(ut,Be),We.refreshMaterialUniforms(ut,J,he,ne,T.state.transmissionRenderTarget[w.id]),ee.needsLights&&ee.lightProbeGrid){let ue=ee.lightProbeGrid;ut.probesSH.value=ue.texture,ut.probesMin.value.copy(ue.boundingBox.min),ut.probesMax.value.copy(ue.boundingBox.max),ut.probesResolution.value.copy(ue.resolution)}za.upload(F,Ya(ee),ut,se)}if(J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(za.upload(F,Ya(ee),ut,se),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&be.setValue(F,"center",Z.center),be.setValue(F,"modelViewMatrix",Z.modelViewMatrix),be.setValue(F,"normalMatrix",Z.normalMatrix),be.setValue(F,"modelMatrix",Z.matrixWorld),J.uniformsGroups!==void 0){let ue=J.uniformsGroups;for(let Ge=0,Ke=ue.length;Ge<Ke;Ge++){let Et=ue[Ge];fe.update(Et,$),fe.bind(Et,$)}}return $}function Ju(w,B){w.ambientLightColor.needsUpdate=B,w.lightProbe.needsUpdate=B,w.sunLights.needsUpdate=B,w.sunLightShadows.needsUpdate=B,w.directionalLights.needsUpdate=B,w.directionalLightShadows.needsUpdate=B,w.pointLights.needsUpdate=B,w.pointLightShadows.needsUpdate=B,w.spotLights.needsUpdate=B,w.spotLightShadows.needsUpdate=B,w.rectAreaLights.needsUpdate=B,w.hemisphereLights.needsUpdate=B}function Ku(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return Y},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return re},this.setRenderTargetTextures=function(w,B,j){let J=q.get(w);J.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),q.get(w.texture).__webglTexture=B,q.get(w.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:j,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,B){let j=q.get(w);j.__webglFramebuffer=B,j.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(w,B=0,j=0){re=w,Y=B,k=j;let J=null,Z=!1,Be=!1;if(w){let Oe=q.get(w);if(Oe.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(F.FRAMEBUFFER,Oe.__webglFramebuffer),Q.copy(w.viewport),Ve.copy(w.scissor),Me=w.scissorTest,S.viewport(Q),S.scissor(Ve),S.setScissorTest(Me),K=-1;return}else if(Oe.__webglFramebuffer===void 0)se.setupRenderTarget(w);else if(Oe.__hasExternalTextures)se.rebindTextures(w,q.get(w.texture).__webglTexture,q.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let mt=w.depthTexture;if(Oe.__boundDepthTexture!==mt){if(mt!==null&&q.has(mt)&&(w.width!==mt.image.width||w.height!==mt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");se.setupDepthRenderbuffer(w)}}let Ye=w.texture;(Ye.isData3DTexture||Ye.isDataArrayTexture||Ye.isCompressedArrayTexture)&&(Be=!0);let Ze=q.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ze[B])?J=Ze[B][j]:J=Ze[B],Z=!0):w.samples>0&&se.useMultisampledRTT(w)===!1?J=q.get(w).__webglMultisampledFramebuffer:Array.isArray(Ze)?J=Ze[j]:J=Ze,Q.copy(w.viewport),Ve.copy(w.scissor),Me=w.scissorTest}else Q.copy(De).multiplyScalar(he).floor(),Ve.copy(Qe).multiplyScalar(he).floor(),Me=tt;if(j!==0&&(J=X),S.bindFramebuffer(F.FRAMEBUFFER,J)&&S.drawBuffers(w,J),S.viewport(Q),S.scissor(Ve),S.setScissorTest(Me),Z){let Oe=q.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+B,Oe.__webglTexture,j)}else if(Be){let Oe=B;for(let Ye=0;Ye<w.textures.length;Ye++){let Ze=q.get(w.textures[Ye]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Ye,Ze.__webglTexture,j,Oe)}}else if(w!==null&&j!==0){let Oe=q.get(w.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Oe.__webglTexture,j)}K=-1};function qa(w){let B=q.get(w);return(B.__readFormat!==w.format||B.__readType!==w.type)&&(B.__readFormat=w.format,B.__readType=w.type,B.__formatReadable=C.textureFormatReadable(w.format),B.__typeReadable=C.textureTypeReadable(w.type)),B}this.readRenderTargetPixels=function(w,B,j,J,Z,Be,He,Oe=0){if(!(w&&w.isWebGLRenderTarget)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ye=q.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&He!==void 0&&(Ye=Ye[He]),Ye){S.bindFramebuffer(F.FRAMEBUFFER,Ye);try{let Ze=w.textures[Oe],mt=Ze.format,xt=Ze.type;w.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Oe);let qe=qa(Ze);if(qe.__formatReadable===!1){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(qe.__typeReadable===!1){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=w.width-J&&j>=0&&j<=w.height-Z&&F.readPixels(B,j,J,Z,xe.convert(mt),xe.convert(xt),Be)}finally{let Ze=re!==null?q.get(re).__webglFramebuffer:null;S.bindFramebuffer(F.FRAMEBUFFER,Ze)}}},this.readRenderTargetPixelsAsync=async function(w,B,j,J,Z,Be,He,Oe=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ye=q.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&He!==void 0&&(Ye=Ye[He]),Ye)if(B>=0&&B<=w.width-J&&j>=0&&j<=w.height-Z){S.bindFramebuffer(F.FRAMEBUFFER,Ye);let Ze=w.textures[Oe],mt=Ze.format,xt=Ze.type;w.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+Oe);let qe=qa(Ze);if(qe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(qe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let M=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,M),F.bufferData(F.PIXEL_PACK_BUFFER,Be.byteLength,F.STREAM_READ),F.readPixels(B,j,J,Z,xe.convert(mt),xe.convert(xt),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let I=re!==null?q.get(re).__webglFramebuffer:null;S.bindFramebuffer(F.FRAMEBUFFER,I);let D=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await gg(F,D,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,M),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,Be),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(M),F.deleteSync(D),Be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,B=null,j=0){let J=Math.pow(2,-j),Z=Math.floor(w.image.width*J),Be=Math.floor(w.image.height*J),He=B!==null?B.x:0,Oe=B!==null?B.y:0;se.setTexture2D(w,0),F.copyTexSubImage2D(F.TEXTURE_2D,j,0,0,He,Oe,Z,Be),S.unbindTexture()},this.copyTextureToTexture=function(w,B,j=null,J=null,Z=0,Be=0){let He,Oe,Ye,Ze,mt,xt,qe,M,I,D=w.isCompressedTexture?w.mipmaps[Be]:w.image;if(j!==null)He=j.max.x-j.min.x,Oe=j.max.y-j.min.y,Ye=j.isBox3?j.max.z-j.min.z:1,Ze=j.min.x,mt=j.min.y,xt=j.isBox3?j.min.z:0;else{let ut=Math.pow(2,-Z);He=Math.floor(D.width*ut),Oe=Math.floor(D.height*ut),w.isDataArrayTexture?Ye=D.depth:w.isData3DTexture?Ye=Math.floor(D.depth*ut):Ye=1,Ze=0,mt=0,xt=0}J!==null?(qe=J.x,M=J.y,I=J.z):(qe=0,M=0,I=0);let U=xe.convert(B.format),ae=xe.convert(B.type),ee;B.isData3DTexture?(se.setTexture3D(B,0),ee=F.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(se.setTexture2DArray(B,0),ee=F.TEXTURE_2D_ARRAY):(se.setTexture2D(B,0),ee=F.TEXTURE_2D),S.activeTexture(F.TEXTURE0),S.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,B.flipY),S.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),S.pixelStorei(F.UNPACK_ALIGNMENT,B.unpackAlignment);let we=S.getParameter(F.UNPACK_ROW_LENGTH),de=S.getParameter(F.UNPACK_IMAGE_HEIGHT),$=S.getParameter(F.UNPACK_SKIP_PIXELS),je=S.getParameter(F.UNPACK_SKIP_ROWS),_e=S.getParameter(F.UNPACK_SKIP_IMAGES);S.pixelStorei(F.UNPACK_ROW_LENGTH,D.width),S.pixelStorei(F.UNPACK_IMAGE_HEIGHT,D.height),S.pixelStorei(F.UNPACK_SKIP_PIXELS,Ze),S.pixelStorei(F.UNPACK_SKIP_ROWS,mt),S.pixelStorei(F.UNPACK_SKIP_IMAGES,xt);let Re=w.isDataArrayTexture||w.isData3DTexture,be=B.isDataArrayTexture||B.isData3DTexture;if(w.isDepthTexture){let ut=q.get(w),It=q.get(B),ue=q.get(ut.__renderTarget),Ge=q.get(It.__renderTarget);S.bindFramebuffer(F.READ_FRAMEBUFFER,ue.__webglFramebuffer),S.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ge.__webglFramebuffer);for(let Ke=0;Ke<Ye;Ke++)Re&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,q.get(w).__webglTexture,Z,xt+Ke),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,q.get(B).__webglTexture,Be,I+Ke)),F.blitFramebuffer(Ze,mt,He,Oe,qe,M,He,Oe,F.DEPTH_BUFFER_BIT,F.NEAREST);S.bindFramebuffer(F.READ_FRAMEBUFFER,null),S.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(Z!==0||w.isRenderTargetTexture||q.has(w)){let ut=q.get(w),It=q.get(B);S.bindFramebuffer(F.READ_FRAMEBUFFER,O),S.bindFramebuffer(F.DRAW_FRAMEBUFFER,G);for(let ue=0;ue<Ye;ue++)Re?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ut.__webglTexture,Z,xt+ue):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ut.__webglTexture,Z),be?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,It.__webglTexture,Be,I+ue):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,It.__webglTexture,Be),Z!==0?F.blitFramebuffer(Ze,mt,He,Oe,qe,M,He,Oe,F.COLOR_BUFFER_BIT,F.NEAREST):be?F.copyTexSubImage3D(ee,Be,qe,M,I+ue,Ze,mt,He,Oe):F.copyTexSubImage2D(ee,Be,qe,M,Ze,mt,He,Oe);S.bindFramebuffer(F.READ_FRAMEBUFFER,null),S.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else be?w.isDataTexture||w.isData3DTexture?F.texSubImage3D(ee,Be,qe,M,I,He,Oe,Ye,U,ae,D.data):B.isCompressedArrayTexture?F.compressedTexSubImage3D(ee,Be,qe,M,I,He,Oe,Ye,U,D.data):F.texSubImage3D(ee,Be,qe,M,I,He,Oe,Ye,U,ae,D):w.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Be,qe,M,He,Oe,U,ae,D.data):w.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Be,qe,M,D.width,D.height,U,D.data):F.texSubImage2D(F.TEXTURE_2D,Be,qe,M,He,Oe,U,ae,D);S.pixelStorei(F.UNPACK_ROW_LENGTH,we),S.pixelStorei(F.UNPACK_IMAGE_HEIGHT,de),S.pixelStorei(F.UNPACK_SKIP_PIXELS,$),S.pixelStorei(F.UNPACK_SKIP_ROWS,je),S.pixelStorei(F.UNPACK_SKIP_IMAGES,_e),Be===0&&B.generateMipmaps&&F.generateMipmap(ee),S.unbindTexture()},this.initRenderTarget=function(w){q.get(w).__webglFramebuffer===void 0&&se.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?se.setTextureCube(w,0):w.isData3DTexture?se.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?se.setTexture2DArray(w,0):se.setTexture2D(w,0),S.unbindTexture()},this.resetState=function(){Y=0,k=0,re=null,S.reset(),Fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Mt._getUnpackColorSpace()}};var i0={type:"change"},tp={type:"start"},r0={type:"end"},Vu=new ci,s0=new Dn,eb=Math.cos(70*Qn.DEG2RAD),sn=new E,Bn=2*Math.PI,Ft={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},ep=1e-6,ku=class extends Sa{constructor(e,t=null){super(e,t),this.state=Ft.NONE,this.target=new E,this.cursor=new E,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:qi.ROTATE,MIDDLE:qi.DOLLY,RIGHT:qi.PAN},this.touches={ONE:Zi.ROTATE,TWO:Zi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new E,this._lastQuaternion=new Jt,this._lastTargetPosition=new E,this._quat=new Jt().setFromUnitVectors(e.up,new E(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new or,this._sphericalDelta=new or,this._scale=1,this._panOffset=new E,this._rotateStart=new ce,this._rotateEnd=new ce,this._rotateDelta=new ce,this._panStart=new ce,this._panEnd=new ce,this._panDelta=new ce,this._dollyStart=new ce,this._dollyEnd=new ce,this._dollyDelta=new ce,this._dollyDirection=new E,this._mouse=new ce,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=nb.bind(this),this._onPointerDown=tb.bind(this),this._onPointerUp=ib.bind(this),this._onContextMenu=hb.bind(this),this._onMouseWheel=ab.bind(this),this._onKeyDown=ob.bind(this),this._onTouchStart=lb.bind(this),this._onTouchMove=cb.bind(this),this._onMouseDown=sb.bind(this),this._onMouseMove=rb.bind(this),this._interceptControlDown=ub.bind(this),this._interceptControlUp=db.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Ft.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();let e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(i0),this.update(),this.state=Ft.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;sn.copy(t).sub(this.target),sn.applyQuaternion(this._quat),this._spherical.setFromVector3(sn),this.autoRotate&&this.state===Ft.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Bn:n>Math.PI&&(n-=Bn),i<-Math.PI?i+=Bn:i>Math.PI&&(i-=Bn),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(sn.setFromSpherical(this._spherical),sn.applyQuaternion(this._quatInverse),t.copy(this.target).add(sn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=sn.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new E(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new E(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=sn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(Vu.origin.copy(this.object.position),Vu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Vu.direction))<eb?this.object.lookAt(this.target):(s0.setFromNormalAndCoplanarPoint(this.object.up,this.target),Vu.intersectPlane(s0,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>ep||8*(1-this._lastQuaternion.dot(this.object.quaternion))>ep||this._lastTargetPosition.distanceToSquared(this.target)>ep?(this.dispatchEvent(i0),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Bn/60*this.autoRotateSpeed*e:Bn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){sn.setFromMatrixColumn(t,0),sn.multiplyScalar(-e),this._panOffset.add(sn)}_panUp(e,t){this.screenSpacePanning===!0?sn.setFromMatrixColumn(t,1):(sn.setFromMatrixColumn(t,0),sn.crossVectors(this.object.up,sn)),sn.multiplyScalar(e),this._panOffset.add(sn)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let i=this.object.position;sn.copy(i).sub(this.target);let r=sn.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=i/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(Bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(Bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ce,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}};function tb(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function nb(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function ib(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(r0),this.state=Ft.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function sb(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case qi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=Ft.DOLLY;break;case qi.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Ft.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Ft.ROTATE}break;case qi.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=Ft.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=Ft.PAN}break;default:this.state=Ft.NONE}this.state!==Ft.NONE&&this.dispatchEvent(tp)}function rb(s){switch(this.state){case Ft.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case Ft.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case Ft.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function ab(s){this.enabled===!1||this.enableZoom===!1||this.state!==Ft.NONE||(s.preventDefault(),this.dispatchEvent(tp),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(r0))}function ob(s){this.enabled!==!1&&this._handleKeyDown(s)}function lb(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Zi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=Ft.TOUCH_ROTATE;break;case Zi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=Ft.TOUCH_PAN;break;default:this.state=Ft.NONE}break;case 2:switch(this.touches.TWO){case Zi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=Ft.TOUCH_DOLLY_PAN;break;case Zi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=Ft.TOUCH_DOLLY_ROTATE;break;default:this.state=Ft.NONE}break;default:this.state=Ft.NONE}this.state!==Ft.NONE&&this.dispatchEvent(tp)}function cb(s){switch(this._trackPointer(s),this.state){case Ft.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case Ft.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case Ft.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case Ft.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=Ft.NONE}}function hb(s){this.enabled!==!1&&s.preventDefault()}function ub(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function db(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var fc=new E;function ei(s,e,t,n,i,r){let a=2*Math.PI*i/4,o=Math.max(r-2*i,0),l=Math.PI/4;fc.copy(e),fc[n]=0,fc.normalize();let c=.5*a/(a+o),h=1-fc.angleTo(s)/l;return Math.sign(fc[t])===1?h*c:o/(a+o)+c+c*(1-h)}var Hu=class s extends Fn{constructor(e=1,t=1,n=1,i=2,r=.1){let a=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let l=new E,c=new E,h=new E(e,t,n).divideScalar(2).subScalar(r),d=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,p=d.length/6,_=new E,g=.5/a;for(let m=0,y=0;m<d.length;m+=3,y+=2)switch(l.fromArray(d,m),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),d[m+0]=h.x*Math.sign(l.x)+c.x*r,d[m+1]=h.y*Math.sign(l.y)+c.y*r,d[m+2]=h.z*Math.sign(l.z)+c.z*r,u[m+0]=c.x,u[m+1]=c.y,u[m+2]=c.z,Math.floor(m/p)){case 0:_.set(1,0,0),f[y+0]=ei(_,c,"z","y",r,n),f[y+1]=1-ei(_,c,"y","z",r,t);break;case 1:_.set(-1,0,0),f[y+0]=1-ei(_,c,"z","y",r,n),f[y+1]=1-ei(_,c,"y","z",r,t);break;case 2:_.set(0,1,0),f[y+0]=1-ei(_,c,"x","z",r,e),f[y+1]=ei(_,c,"z","x",r,n);break;case 3:_.set(0,-1,0),f[y+0]=1-ei(_,c,"x","z",r,e),f[y+1]=1-ei(_,c,"z","x",r,n);break;case 4:_.set(0,0,1),f[y+0]=1-ei(_,c,"x","y",r,e),f[y+1]=1-ei(_,c,"y","x",r,t);break;case 5:_.set(0,0,-1),f[y+0]=ei(_,c,"x","y",r,e),f[y+1]=1-ei(_,c,"y","x",r,t);break}}static fromJSON(e){return new s(e.width,e.height,e.depth,e.segments,e.radius)}};var a0=new Vt,Gu=new E,ka=class extends ar{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new ke(e,3)),this.setAttribute("uv",new ke(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Yi(t,6,1);return this.setAttribute("instanceStart",new vn(n,3,0)),this.setAttribute("instanceEnd",new vn(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new Yi(t,6,1);return this.setAttribute("instanceColorStart",new vn(n,3,0)),this.setAttribute("instanceColorEnd",new vn(n,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new Qs(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vt);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),a0.setFromBufferAttribute(t),this.boundingBox.union(a0))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new kt),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)Gu.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Gu)),Gu.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Gu));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};Ce.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ce},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};bn.line={uniforms:Fa.merge([Ce.common,Ce.fog,Ce.line]),vertexShader:`
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
		`};var Qi=class extends hn{constructor(e){super({type:"LineMaterial",uniforms:Fa.clone(bn.line.uniforms),vertexShader:bn.line.vertexShader,fragmentShader:bn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var np=new wt,o0=new E,l0=new E,dn=new wt,fn=new wt,Ci=new wt,ip=new E,sp=new ct,pn=new va,c0=new E,Wu=new Vt,Xu=new kt,Pi=new wt,Ii,gr;function h0(s,e,t){return Pi.set(0,0,-e,1).applyMatrix4(s.projectionMatrix),Pi.multiplyScalar(1/Pi.w),Pi.x=gr/t.width,Pi.y=gr/t.height,Pi.applyMatrix4(s.projectionMatrixInverse),Pi.multiplyScalar(1/Pi.w),Math.abs(Math.max(Pi.x,Pi.y))}function fb(s,e){let t=s.matrixWorld,n=s.geometry,i=n.attributes.instanceStart,r=n.attributes.instanceEnd,a=Math.min(n.instanceCount,i.count);for(let o=0,l=a;o<l;o++){pn.start.fromBufferAttribute(i,o),pn.end.fromBufferAttribute(r,o),pn.applyMatrix4(t);let c=new E,h=new E;Ii.distanceSqToSegment(pn.start,pn.end,h,c),h.distanceTo(c)<gr*.5&&e.push({point:h,pointOnLine:c,distance:Ii.origin.distanceTo(h),object:s,face:null,faceIndex:o,uv:null,uv1:null})}}function pb(s,e,t){let n=e.projectionMatrix,r=s.material.resolution,a=s.matrixWorld,o=s.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,h=Math.min(o.instanceCount,l.count),d=-e.near;Ii.at(1,Ci),Ci.w=1,Ci.applyMatrix4(e.matrixWorldInverse),Ci.applyMatrix4(n),Ci.multiplyScalar(1/Ci.w),Ci.x*=r.x/2,Ci.y*=r.y/2,Ci.z=0,ip.copy(Ci),sp.multiplyMatrices(e.matrixWorldInverse,a);for(let u=0,f=h;u<f;u++){if(dn.fromBufferAttribute(l,u),fn.fromBufferAttribute(c,u),dn.w=1,fn.w=1,dn.applyMatrix4(sp),fn.applyMatrix4(sp),dn.z>d&&fn.z>d)continue;if(dn.z>d){let b=dn.z-fn.z,x=(dn.z-d)/b;dn.lerp(fn,x)}else if(fn.z>d){let b=fn.z-dn.z,x=(fn.z-d)/b;fn.lerp(dn,x)}dn.applyMatrix4(n),fn.applyMatrix4(n),dn.multiplyScalar(1/dn.w),fn.multiplyScalar(1/fn.w),dn.x*=r.x/2,dn.y*=r.y/2,fn.x*=r.x/2,fn.y*=r.y/2,pn.start.copy(dn),pn.start.z=0,pn.end.copy(fn),pn.end.z=0;let _=pn.closestPointToPointParameter(ip,!0);pn.at(_,c0);let g=Qn.lerp(dn.z,fn.z,_),m=g>=-1&&g<=1,y=ip.distanceTo(c0)<gr*.5;if(m&&y){pn.start.fromBufferAttribute(l,u),pn.end.fromBufferAttribute(c,u),pn.start.applyMatrix4(a),pn.end.applyMatrix4(a);let b=new E,x=new E;Ii.distanceSqToSegment(pn.start,pn.end,x,b),t.push({point:x,pointOnLine:b,distance:Ii.origin.distanceTo(x),object:s,face:null,faceIndex:u,uv:null,uv1:null})}}}var Yu=class extends Ot{constructor(e=new ka,t=new Qi({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,i=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)o0.fromBufferAttribute(t,a),l0.fromBufferAttribute(n,a),i[o]=o===0?0:i[o-1],i[o+1]=i[o]+o0.distanceTo(l0);let r=new Yi(i,2,1);return e.setAttribute("instanceDistanceStart",new vn(r,1,0)),e.setAttribute("instanceDistanceEnd",new vn(r,1,1)),this}raycast(e,t){let n=this.material.worldUnits,i=e.camera;if(i===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),n===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Ii=e.ray;let a=this.matrixWorld,o=this.geometry,l=this.material;gr=l.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),Xu.copy(o.boundingSphere).applyMatrix4(a);let c;if(n)c=gr*.5;else{let d=Math.max(i.near,Xu.distanceToPoint(Ii.origin));c=h0(i,d,l.resolution)}if(Xu.radius+=c,Ii.intersectsSphere(Xu)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),Wu.copy(o.boundingBox).applyMatrix4(a);let h;if(n)h=gr*.5;else{let d=Math.max(i.near,Wu.distanceToPoint(Ii.origin));h=h0(i,d,l.resolution)}Wu.expandByScalar(h),Ii.intersectsBox(Wu)!==!1&&(n?fb(this,t):pb(this,i,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(np),this.material.uniforms.resolution.value.set(np.z,np.w))}};var bs=class extends ka{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setPositions(n),this}setColors(e){let t=e.length-3,n=new Float32Array(2*t);for(let i=0;i<t;i+=3)n[2*i]=e[i],n[2*i+1]=e[i+1],n[2*i+2]=e[i+2],n[2*i+3]=e[i+3],n[2*i+4]=e[i+4],n[2*i+5]=e[i+5];return super.setColors(n),this}setFromPoints(e){let t=e.length-1,n=new Float32Array(6*t);for(let i=0;i<t;i++)n[6*i]=e[i].x,n[6*i+1]=e[i].y,n[6*i+2]=e[i].z||0,n[6*i+3]=e[i+1].x,n[6*i+4]=e[i+1].y,n[6*i+5]=e[i+1].z||0;return super.setPositions(n),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}};var pc=class extends Yu{constructor(e=new bs,t=new Qi({color:Math.random()*16777215})){super(e,t),this.isLine2=!0,this.type="Line2"}};function qb({container:s,model:e,point:t,hole:n,onConnection:i,onPin:r,onSwitch:a,onFailure:o,onChip:l=()=>{},onHole:c=()=>{}}){let h=new Ws;h.background=new ze("#edf1ed");let d=new Xt(40,1,.1,1600),u=new dc({antialias:!0,alpha:!1});u.setPixelRatio(Math.min(window.devicePixelRatio||1,1.6)),u.outputColorSpace=an,u.toneMapping=wa,u.toneMappingExposure=1.08,s.append(u.domElement);let f=u.domElement;f.tabIndex=0,f.setAttribute("aria-label","Circuito en 3D. Arrastra para girar; usa la rueda para acercar. La lista de conexiones ofrece los mismos detalles con teclado."),f.setAttribute("aria-describedby","threeHelp");let p=new ku(d,f);p.enableDamping=!0,p.dampingFactor=.13,p.minDistance=5,p.maxDistance=500,p.minPolarAngle=.01,p.maxPolarAngle=Math.PI/2-.05,p.listenToKeyEvents(f),p.zoomToCursor=!0,h.add(new ir(16777215,11779256,2.4));let _=new Ss(16777215,3.2);_.position.set(-25,65,30),h.add(_);let g=new Ss(15003903,1.1);g.position.set(35,25,-30),h.add(g);let m=new Map,y=[],b=[],x=new Map,A=[],T=[],P=new Map,v=new Map,R=new Map,L=null,N=[],V=[],X=null,O=new Ct,G=new Map,Y=new en;h.add(Y);let k=null,re=null;function K(M,I,D){let U=h.children.filter(ee=>!I.has(ee)&&!ee.userData.softShadow),ae=new en;U.forEach(ee=>ae.add(ee)),h.add(ae),G.set(M,{group:ae,holes:D,home:ae.position.clone()})}let te=new Map,Q=new en;h.add(Q);let Ve="",Me={id:null,progress:1},bt=new Pt({color:16447983,roughness:.82}),it=new Pt({color:2239021,roughness:.7}),at=new Pt({color:11976897,roughness:.35,metalness:.7}),ne=e.bounds[0]+e.bounds[2]/2,he=e.bounds[1]+e.bounds[3]/2,ye=([M,I],D=.1)=>new E((M-ne)/30,D,(I-he)/30),Le=(M,I=.1)=>ye(t(M),I),De=!1,Qe=0,tt=null,oe=null,me=0,pe=null,ge=[...e.bounds],Ee=!1,ot="",et=null,st=1,nt={quality:"auto",background:"#edf1ed",motion:"full"},F=0,At=!1,ft=!0,C=!1,S=new en;h.add(S);let H="",q=null,se=0;function ve(M){q=M?.active?M:null;let I=q?.ids||[],D=I.join("|");if(D!==H){S.traverse(ae=>{ae.geometry?.dispose(),ae.material?.dispose()}),S.clear(),H=D;for(let ae of I){let ee=m.get(ae);if(!ee||ee.it.kind!=="wire")continue;let we=new bs;we.setPositions(Array.from({length:ee.wire.geometry.parameters.tubularSegments+1},(de,$)=>ee.curve.getPointAt($/ee.wire.geometry.parameters.tubularSegments)).flatMap(de=>de.toArray()));for(let[de,$]of[[14791749,8],[ee.material.color,3]]){let je=new Qi({color:de,linewidth:$,worldUnits:!1,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),_e=new pc(we,je);_e.userData.signal=ae,_e.renderOrder=21,_e.frustumCulled=!1,S.add(_e)}se++}}let U=s.getBoundingClientRect();S.visible=!!q;for(let ae of S.children)ae.visible=!!m.get(ae.userData.signal)?.group.visible,ae.material.opacity=q?.value===1?.9:.5,ae.material.resolution.set(U.width||1,U.height||1)}function Te(M){JSON.stringify(M||null)!==JSON.stringify(q)&&(pe?ts({...pe,studio:{...pe.studio,signals:M}}):(ve(M),Dt()))}function W(M,I,D,U=h){let ae=new Ot(M,I);return ae.position.copy(D),U.add(ae),ae}function ie(M,I,D,U,ae,ee=h){return W(new Fn(M,I,D),ae,U,ee)}function Se(M,I,D,U,ae,ee=h,we=.08){return W(new Hu(M,I,D,2,we),ae,U,ee)}function We(M,I){return W(new mi(new ui(M,!1,"centripetal"),16,.046,8,!1),at.clone(),new E,I)}function Ue(M,I=.22){let D=M.filter((we,de)=>de===0||we.distanceTo(M[de-1])>1e-6),U=new $s,ae=D[0];for(let we=1;we<D.length-1;we++){let de=D[we],$=D[we-1],je=D[we+1],_e=Math.min(I,$.distanceTo(de)/3,je.distanceTo(de)/3),Re=de.clone().addScaledVector($.clone().sub(de).normalize(),_e),be=de.clone().addScaledVector(je.clone().sub(de).normalize(),_e);ae.distanceTo(Re)>1e-6&&U.add(new ps(ae,Re)),U.add(new ms(Re,de,be)),ae=be}let ee=D[D.length-1];return ae.distanceTo(ee)>1e-6&&U.add(new ps(ae,ee)),U}function Ae(M,I=1024,D=512){let U=document.createElement("canvas");U.width=I,U.height=D,M(U.getContext("2d"),I,D);let ae=new ea(U);return ae.colorSpace=an,ae.anisotropy=Math.min(4,u.capabilities.getMaxAnisotropy()),ae}function Ne(M,I,D,U,{color:ae="#dbe5e1",background:ee="#222a2d",size:we=48}={}){let de=Ae((je,_e,Re)=>{je.fillStyle=ee,je.fillRect(0,0,_e,Re),je.fillStyle=ae,je.textAlign="center",je.textBaseline="middle",je.font="600 "+we+"px Arial",M.split(`
`).forEach((be,ut,It)=>je.fillText(be,_e/2,Re/2+(ut-(It.length-1)/2)*we*1.45))},512,256),$=W(new di(D,U),new Ht({map:de}),I);return $.rotation.x=-Math.PI/2,$.userData.viewerLabel=!0,$}let rt=Ae((M,I,D)=>{let U=M.createRadialGradient(I/2,D/2,0,I/2,D/2,I/2);U.addColorStop(0,"#1b322344"),U.addColorStop(.5,"#1b32231b"),U.addColorStop(1,"#1b322300"),M.fillStyle=U,M.fillRect(0,0,I,D)},128,128);function lt(M,I,D,U=h){let ae=W(new di(I,D),new Ht({map:rt,transparent:!0,depthWrite:!1}),M.clone().setY(.045),U);return ae.rotation.x=-Math.PI/2,ae.userData.softShadow=!0,ae}let z=Ae((M,I,D)=>{let U=M.createRadialGradient(I/2,D/2,0,I/2,D/2,I/2);U.addColorStop(0,"#ffca9566"),U.addColorStop(.3,"#ff6b4638"),U.addColorStop(1,"#ff6b4600"),M.fillStyle=U,M.fillRect(0,0,I,D)},128,128);for(let[M,I]of Object.entries(e.boards)){let D=(I.columns-1)*30+70,U=60+I.xOffset,ae=145+I.yOffset;Se(D/30,1.25,605/30,ye([U+D/2,ae+302.5],-.625),bt,h,.2),ie((D-45)/30,.06,65/30,ye([U+20+(D-45)/2,455.5+I.yOffset],.035),new Pt({color:13686994,roughness:1}));let ee=Ae(($,je,_e)=>{$.scale(je/D,_e/605),$.fillStyle="#faf9ef",$.fillRect(0,0,D,605),$.font="bold 14px Arial",$.fillStyle="#475b52",$.fillText("PLACA "+M+" \xB7 "+I.columns+" COLUMNAS",12,23),$.font="13px Arial",$.textAlign="center";for(let Re=1;Re<=I.columns;Re++)(Re===1||Re%5===0||Re===I.columns)&&$.fillText(Re,35+(Re-1)*30,116);$.textAlign="left";for(let Re of"abcdefghij")$.fillText(Re,10,t([M,Re,1])[1]-ae+5);for(let Re of["+T","-T","-B","+B"]){let be=t([M,Re,1])[1]-ae;$.fillStyle=Re[0]==="+"?"#bc444c":"#3e81b5",$.fillText(Re,8,be+5),$.lineWidth=2,$.strokeStyle=$.fillStyle,$.beginPath(),$.moveTo(25,be-13),I.railBreak&&($.lineTo(945,be-13),$.moveTo(1005,be-13)),$.lineTo(D-20,be-13),$.stroke()}},2048,640),we=W(new di(D/30,605/30),new Ht({map:ee}),ye([U+D/2,ae+302.5],.008));we.rotation.x=-Math.PI/2;let de=[];for(let $ of[..."abcdefghij","+T","-T","-B","+B"])for(let je=1;je<=I.columns;je++)$.length>1&&I.railBreak&&je===I.railBreak+1||de.push([M,$,je]);for(let[$,je,_e]of[[.38,.018,12107961],[.255,.03,4739406]]){let Re=new qs(new Fn($,.012,$),new Pt({color:_e,roughness:1}),de.length);de.forEach((be,ut)=>{O.position.copy(Le(be,je)),O.updateMatrix(),Re.setMatrixAt(ut,O.matrix)}),h.add(Re),Re.userData={holes:de},y.push(Re)}}for(let[M,I,D]of[["L\xD3GICA \xB7 5 V REGULADOS","+5","G5"],["MOTOR \xB7 6 V","+6","G6"]]){let U=Le(["FUENTE",I,0]),ae=Le(["FUENTE",D,0]),ee=U.clone().lerp(ae,.5);Ne(M,ee.clone().setY(.2).add(new E(0,0,-.9)),9,1.4,{background:"#e0e8e2",color:"#345349",size:34});for(let[we,de]of[[U,12861771],[ae,3490619]])W(new zt(.23,.23,.35,14),new Pt({color:de}),we.clone().setY(.2))}for(let M of e.chips||[]){let I=new Set(h.children),D=M.pins,U=D/2,ae=M.start,ee=Le([M.board,"e",ae]),we=Le([M.board,"f",ae+U-1]),de=ee.clone().lerp(we,.5).setY(.8),$=U+.2,je=Se($,1.25,2.45,de,it.clone(),h,.13);je.userData={chip:M.id},y.push(je);let _e=new Fn($+.08,1.32,2.52),Re=new Js(_e);_e.dispose();let be=new Rn(Re,new jt({color:14265410,depthTest:!1}));be.position.copy(de),be.renderOrder=18,be.visible=!1,h.add(be),te.set(M.id,{body:je,outline:be}),lt(de,$+.5,2.8);let ut=W(new Gi(.27,28,Math.PI/2,Math.PI),new Pt({color:1186075,roughness:.9}),de.clone().add(new E(-$/2+.04,.637,0)));ut.rotation.x=-Math.PI/2,Ne(M.label+`
`+M.id,de.clone().add(new E(.12,.637,0)),Math.max(2,$-.9),1.75,{size:38});let It=W(new Gi(.09,16),new Ht({color:8884620}),de.clone().add(new E(-$/2+.4,.638,.5)));It.rotation.x=-Math.PI/2;for(let ue=1;ue<=D;ue++){let Ge=ue>U,Ke=[M.board,Ge?"e":"f",ae+(Ge?D-ue:ue-1)],Et=Le(Ke,.13),vt=Et.clone();vt.z=de.z+(Ge?-1.18:1.18),vt.y=.5;let gt=new ui([Et,Et.clone().add(new E(0,.4,0)),vt]),Rt=W(new mi(gt,16,.07,4,!1),at,new E);Rt.userData={u:M.id,p:ue,h:Ke},y.push(Rt),b.push(Rt);let Qt=ie(.22,.12,.32,vt.clone().setY(.54),at);Qt.userData={u:M.id,p:ue,h:Ke},y.push(Qt),x.set(M.id+"."+ue,Ne(String(ue),Et.clone().add(new E(0,.025,Ge?-.4:.4)),.55,.45,{color:"#35433e",background:"#faf9ef",size:95}))}K(M.id,I,Array.from({length:D},(ue,Ge)=>{let Ke=Ge+1;return[M.board,Ke>U?"e":"f",ae+(Ke>U?D-Ke:Ke-1)]}))}for(let M of e.arrays||[]){let I=new Set(h.children),D=Object.entries(M.pinHoles||{}).sort((_e,Re)=>Number(_e[0])-Number(Re[0]));if(!D.length)continue;let U=D.map(([,_e])=>Le(_e,.1)),ae=U[0],ee=U[U.length-1],we=ae.clone().lerp(ee,.5).setY(1.5),de=ae.distanceTo(ee)+.98,$=new Pt({color:5652021,roughness:.65});Se(de,1.9,.8,we,$,h,.12),lt(we,de+.3,1.35),Ne(M.id+"  8 x 1k",we.clone().setY(2.46),de-.55,.7,{background:"#563e35",color:"#f2e8dc",size:35}),D.forEach(([_e,Re])=>{let be=Le(Re,.1),ut=be.clone().setY(.58),It=We([be,ut],h);It.userData={array:M.id,p:Number(_e),h:Re,common:Number(_e)===(M.commonPin||1)},A.push(It);let ue=Number(_e)===(M.commonPin||1)?_e+" COM":_e;Ne(ue,be.clone().setY(.055).add(new E(0,0,.82)),Number(_e)===(M.commonPin||1)?1.15:.5,.4,{background:"#faf9ef",color:"#35433e",size:Number(_e)===(M.commonPin||1)?40:80})});let je=M.pinHoles?.[M.commonPin||1];if(je){let _e=W(new Gi(.095,20),new Ht({color:15978908}),Le(je,2.462),h);_e.rotation.x=-Math.PI/2}K(M.id,I,D.map(([,_e])=>_e))}for(let M of e.displays||[]){let I=new Set(h.children),D=Object.values(M.pins).map(ee=>Le(ee)),U=D.reduce((ee,we)=>ee.add(we),new E).multiplyScalar(1/D.length).setY(.7);Se(4.8,1.2,7.5,U,it,h,.12),lt(U,5.2,7.9),Object.entries(M.pins).forEach(([ee,we])=>{let de=Le(we,.1);We([de,de.clone().setY(.65)],h),Ne(String(ee),de.clone().add(new E(0,.025,Number(ee)<=5?1.1:-1.1)),.45,.35,{background:"#faf9ef",color:"#35433e",size:80})}),Object.entries({a:[0,-2.3,2.5,.32],b:[1.45,-1.15,.32,1.8],c:[1.45,1.15,.32,1.8],d:[0,2.3,2.5,.32],e:[-1.45,1.15,.32,1.8],f:[-1.45,-1.15,.32,1.8],g:[0,0,2.5,.32]}).forEach(([ee,[we,de,$,je]])=>{let _e=new Pt({color:4334890,emissive:0,roughness:.45}),Re=Se($,.04,je,U.clone().add(new E(we,.62,de)),_e,h,.06);P.set(M.id+"."+ee,Re)}),Ne(M.id,U.clone().add(new E(0,.62,3.25)),2,.35,{size:45}),K(M.id,I,Object.values(M.pins))}function Ie(M){if(M.externalLead)return;let I=Le(M.a),D=Le(M.b),U=I.distanceTo(D),ae=M.kind==="res",ee=M.kind!=="wire",we=!ee&&Array.isArray(M.route)&&M.route.length>=2,de=ee?.6:we?Math.max(.48,Number(M.routeHeight)||.78):M.a[0]!==M.b[0]?2.6+Number(M.id.slice(1))%3*.22:Math.min(2.25,.65+U*.065),$=new en,je=[];h.add($);let _e=I.clone().lerp(D,.5);_e.y=de;let Re=we?[I,...M.route.map(ue=>ye(ue,de)),D]:null,be=we?Ue(Re):new ui(ae?[I,I.clone().setY(.45),I.clone().setY(1.65),I.clone().setY(2.8),I.clone().setY(3.14),D.clone().setY(3.14),D.clone().setY(2.7),D]:[I,I.clone().setY(.36),I.clone().lerp(D,.18).setY(de),_e,I.clone().lerp(D,.82).setY(de),D.clone().setY(.36),D],!1,"centripetal"),ut=new Pt({color:M.color||(e.colors||{})[M.net]||"#087f93",roughness:.32,metalness:.02}),It=W(new mi(be,we?Math.max(48,Re.length*12):U>12?64:40,ee?.046:M.routingClass==="power"?.1:.088,10,!1),ee?at.clone():ut,new E,$);if(It.visible=M.kind==="wire",It.userData={id:M.id},y.push(It),!ee)for(let ue of[I,D]){let Ge=W(new zt(.052,.052,.27,8),at.clone(),ue.clone().setY(.155),$),Ke=ie(.23,.34,.23,ue.clone().setY(.38),ut.clone(),$);je.push([Ge,Ke].map(Et=>({mesh:Et,home:Et.position.clone()})))}if(ae){let ue=I.clone().setY(1.65),Ge=W(new zt(.39,.39,2.3,24),new Pt({color:8435129,roughness:.6}),ue,$);Ge.userData={id:M.id},y.push(Ge);let Ke=We([I,I.clone().setY(.5)],$),Et=We([I.clone().setY(2.8),I.clone().setY(3.14),D.clone().setY(3.14),D.clone().setY(2.7),D],$);Ke.userData=Et.userData={id:M.id},y.push(Ke,Et);let vt=String(M.value);(/6[.,]8\s*k/i.test(vt)?[1535666,6649725,13056834,13214021]:/4[.,]7\s*k/i.test(vt)?[15779131,8866714,13056834,13214021]:/100\s*k/i.test(vt)?[7424817,2106918,15779131,13214021]:/68\s*k/i.test(vt)?[1535666,6649725,15043122,13214021]:/10\s*k/i.test(vt)?[7424817,2106918,15043122,13214021]:/2[.,]2\s*k/i.test(vt)?[13056834,13056834,13056834,13214021]:/^470\b/.test(vt)?[15779131,8866714,7424817,13214021]:[7424817,2106918,13056834,13214021]).forEach((Qt,Xn)=>{W(new zt(.4,.4,.12,24),new Pt({color:Qt}),ue.clone().setY([.82,1.2,1.58,2.4][Xn]),$)});let Rt=Ne((M.label.match(/^[A-Za-z0-9]+/)||["R"])[0]+" \xB7 "+M.value,_e.clone().add(new E(0,.1,-.55)),2.7,.5,{background:"#faf9ef",color:"#345349",size:43});$.add(Rt)}if(M.kind==="cap"&&!/^(10|100)\s*(µ|μ|u)/i.test(M.value)){let ue=_e.clone().setY(.95),Ge=W(new fi(.43,20,14),new Pt({color:13143105,roughness:.72}),ue,$);Ge.scale.set(1,1,.38),Ge.userData={id:M.id},y.push(Ge);for(let[Et,vt]of[I,D].entries())We([vt,vt.clone().setY(.32),ue.clone().add(new E(Et?.2:-.2,-.2,0))],$);let Ke=Ne(M.value,ue.clone().add(new E(0,.5,0)),1.8,.5,{background:"#c88c41",color:"#30271c",size:43});$.add(Ke)}if(M.kind==="cap"&&/^(10|100)\s*(µ|μ|u)/i.test(M.value)){let ue=_e.clone().setY(1.45),Ge=Ae((gt,Rt,Qt)=>{gt.fillStyle="#24485a",gt.fillRect(0,0,Rt,Qt),gt.fillStyle="#d2ddd5",gt.fillRect(Rt*.21,0,Rt*.16,Qt),gt.fillStyle="#24485a",gt.font="bold 30px Arial",gt.textAlign="center";for(let Xn=30;Xn<Qt;Xn+=50)gt.fillText("\u2212",Rt*.29,Xn);gt.fillStyle="#dde6e3",gt.font="600 32px Arial",gt.fillText(M.value,Rt*.67,Qt*.38),gt.font="26px Arial",gt.fillText("16 V",Rt*.67,Qt*.65)},512,256),Ke=W(new zt(.64,.64,1.8,40),[new Pt({map:Ge,roughness:.4}),at.clone(),it.clone()],ue,$);Ke.userData={id:M.id},y.push(Ke),Ke.rotation.y=Math.PI/2-Math.PI*2*.29;for(let[gt,Rt]of[I,D].entries())We([Rt,Rt.clone().setY(.4),ue.clone().setY(.55).add(new E(gt?.28:-.28,0,0))],$);let Et=ue.clone().setY(2.359);ie(.76,.008,.022,Et,it.clone(),$).rotation.y=Math.PI/4,ie(.76,.008,.022,Et,it.clone(),$).rotation.y=-Math.PI/4,lt(ue,2.1,1.8,$);let vt=Ne(M.id+" \xB7 "+M.value,ue.clone().setY(.055).add(new E(0,0,1.02)),2.4,.45,{background:"#faf9ef",color:"#345349",size:43});$.add(vt)}if(M.kind==="pot"){let ue=_e.clone().setY(1.02),Ge=Se(2.65,1.35,1.6,ue,new Pt({color:1534356,roughness:.36}),$,.11);Ge.userData={id:M.id},y.push(Ge),ie(2.44,.08,1.42,ue.clone().setY(.39),new Pt({color:1065310}),$),W(new zt(.59,.59,.04,32),new Pt({color:1523798}),ue.clone().setY(1.717),$);let Ke=W(new zt(.51,.51,.16,40),new Pt({color:12557136,metalness:.8,roughness:.24}),ue.clone().setY(1.79),$);Ke.userData={id:M.id},y.push(Ke),L=ie(.79,.018,.11,ue.clone().setY(1.879),it.clone(),$);let Et=Ne("203",ue.clone().add(new E(.76,.679,-.4)),.68,.39,{background:"#176994",color:"#e6f0ec",size:77});$.add(Et);for(let gt of e.potPins){let Rt=Le(gt);We([Rt,Rt.clone().setY(.4)],$)}lt(ue,3.3,2.3,$);let vt=Ne("RV1 \xB7 20 k\u03A9",ue.clone().setY(.06).add(new E(0,0,-1.08)),3,.55,{background:"#faf9ef",color:"#345349",size:42});$.add(vt);for(let gt=0;gt<3;gt++){let Rt=Le(e.potPins[gt],.035),Qt=Ne(String(gt+1),Rt.clone().add(new E(0,0,.95)),.55,.4,{background:"#faf9ef",color:"#345349",size:85});$.add(Qt)}}if(M.kind==="led"){let ue=_e.clone().setY(1.22),Ge=new er({color:12731186,emissive:0,roughness:.18,metalness:0,clearcoat:1,clearcoatRoughness:.1,transparent:!0,opacity:.88,depthWrite:!1}),Ke=W(new zt(.52,.52,.8,32),Ge,ue,$),Et=W(new fi(.52,32,20,0,Math.PI*2,0,Math.PI/2),Ge,ue.clone().setY(1.62),$),vt=W(new zt(.6,.6,.14,32),Ge,ue.clone().setY(.77),$);for(let Xn of[Ke,Et,vt])Xn.userData={id:M.id,baseOpacity:.88},y.push(Xn);Ge.userData.baseColor=M.color||{LY:"#eab83f",LG:"#2cab66",LR:"#d34436"}[M.value]||"#d34436",Ge.color.set(Ge.userData.baseColor),v.set(M.value,Ge);for(let[Xn,vc]of[I,D].entries()){let _r=ue.clone().setY(1.27).add(new E(Xn?.18:-.18,0,0));We([vc,vc.clone().setY(.48),_r.clone().setY(.72),_r],$)}ie(.18,.19,.18,ue.clone().setY(1.33).add(new E(.18,0,0)),at.clone(),$);let gt=W(new fi(.18,16,10,0,Math.PI*2,0,Math.PI/2),new Pt({color:12897486,metalness:.8,roughness:.2,side:Hn}),ue.clone().add(new E(.18,.23,0)),$);gt.rotation.x=Math.PI,W(new mi(new ui([ue.clone().add(new E(-.18,.1,0)),ue.clone().add(new E(-.05,.43,0)),ue.clone().add(new E(.18,.28,0))]),12,.012,5,!1),at,new E,$),ie(.04,.11,.42,ue.clone().add(new E(.56,-.45,0)),new Pt({color:9978422,roughness:.3}),$);let Rt=new Ys(new ds({map:z,transparent:!0,depthWrite:!1,blending:ba}));Rt.position.copy(ue).setY(1.47),Rt.scale.set(2.6,2.6,1),Rt.visible=!1,$.add(Rt),R.set(M.value,Rt),lt(ue,1.7,1.7,$);let Qt=Ne(M.value+"  +  \u2212",ue.clone().setY(.06).add(new E(0,0,.95)),2,.55,{background:"#faf9ef",color:"#345349",size:58});$.add(Qt)}if(M.kind==="motor"&&!M.externalMotor){let ue=_e.clone().setY(1.2),Ge=new Pt({color:10595762,metalness:.78,roughness:.28}),Ke=W(new zt(.9,.9,2.4,32),Ge,ue,$);Ke.rotation.z=Math.PI/2;for(let gt of[-1.17,1.17]){let Rt=W(new zt(.86,.86,.14,32),gt<0?it:at,ue.clone().add(new E(gt,0,0)),$);Rt.rotation.z=Math.PI/2}let Et=W(new zt(.12,.12,1,16),at,ue.clone().add(new E(1.65,0,0)),$);Et.rotation.z=Math.PI/2;for(let gt of[-.42,.42])ie(.58,.025,.18,ue.clone().add(new E(-.55,.8,gt)),it,$);[I,D].forEach((gt,Rt)=>{let Qt=ue.clone().add(new E(-1.27,Rt?.28:-.28,0));ie(.12,.2,.3,Qt,at,$),We([gt,gt.clone().setY(.5),Qt],$)});let vt=Ne("MOTOR CC \xB7 EXTERNO",ue.clone().add(new E(0,1.22,0)),3.2,.6,{background:"#53676e",color:"#fff",size:36});$.add(vt)}if(M.kind==="motor"&&M.externalMotor){let ue=M.externalMotor,Ge=ye(ue.center,3.7),Ke=new Pt({color:15914312,roughness:.4}),Et=new Pt({color:14072114,roughness:.55}),vt=new Pt({color:12108486,metalness:.82,roughness:.28}),gt=Se(13.2,7.1,7.3,Ge.clone().add(new E(-3.4,0,0)),Ke,$,.55);gt.userData={id:M.id},y.push(gt),lt(Ge,29,12,$),Se(12.2,.16,6.4,Ge.clone().add(new E(-3.4,3.62,0)),Et,$,.12);let Rt=W(new zt(2.65,2.65,8.8,40),vt,Ge.clone().add(new E(7.1,0,0)),$);Rt.rotation.z=Math.PI/2,Rt.userData={id:M.id},y.push(Rt);let Qt=W(new zt(2.56,2.56,1.25,32),it,Ge.clone().add(new E(11.9,0,0)),$);Qt.rotation.z=Math.PI/2;for(let Li of[-1.2,1.2])Se(3.3,.12,.65,Ge.clone().add(new E(9,2.3,Li)),it,$,.08);for(let Li of[-7.8,1.1])for(let vi of[-2.75,2.75]){let xr=W(new zt(.24,.24,.08,16),at,Ge.clone().add(new E(Li,3.74,vi)),$);ie(.32,.02,.06,xr.position.clone().add(new E(0,.06,0)),it,$)}let Xn=W(new zt(1.3,1.3,.65,28),Et,Ge.clone().add(new E(-3.6,0,3.92)),$);Xn.rotation.x=Math.PI/2;let vc=W(new zt(.78,.78,3.1,28),bt,Ge.clone().add(new E(-3.6,0,5.55)),$);vc.rotation.x=Math.PI/2,ie(1.1,.18,2.7,Ge.clone().add(new E(-3.6,.71,5.55)),bt,$);let _r=new en;$.add(_r);let rp=[];V.push({id:M.partId,group:_r,cables:rp,stage:M.wiringStage??M.stage}),ue.terminals.map(Li=>ye(Li,2.15)).forEach((Li,vi)=>{ie(.18,.55,.65,Li,at,$);let xr=vi?D:I,ap=ue.cableRoutes?.[vi]?ju(zu,ue.cableRoutes[vi],ye,Li,xr,ue.cableHeights[vi]):new ui([Li,ye([t(vi?M.b:M.a)[0],790+vi*28],1.2),xr.clone().setY(.55),xr],!1,"centripetal"),Sc=new en;_r.add(Sc);let d0=new Pt({color:vi?3361114:14179409,roughness:.45}),$u=W(new mi(ap,96,.13,10,!1),d0,new E,Sc),f0=ie(.3,.46,.3,xr.clone().setY(.23),it,Sc);$u.userData={id:M.id},y.push($u),rp.push({group:Sc,wire:$u,curve:ap,plug:f0,terminal:vi,progress:1})});let u0=Ne(ue.label||"MOTORREDUCTOR TT \xB7 EXTERNO",ye([ue.center[0],ue.bounds[1]+24],.12),22,.9,{background:"#f3f2e8",color:"#345349",size:35});$.add(u0)}if(M.kind==="switch"&&M.externalControl&&N.push(lp({THREE:zu,it:M,group:$,mesh:W,box:ie,roundedBox:Se,toWorld:ye,hpos:Le,point:t,topLabel:Ne,contactShadow:lt,pickables:y,switches:T,metal:at,dark:it})),M.kind==="switch"&&!M.externalControl){let ue=(M.spdt?I.clone().lerp(Le(M.third),.5):_e.clone()).setY(.65),Ge=Se(M.spdt?2.8:1.8,.9,1.35,ue,new Pt({color:3426627}),$,.12),Ke=Se(1.12,.28,.9,ue.clone().add(new E(0,.58,0)),new Pt({color:2383765}),$,.08);Ke.userData={bit:M.value||M.id},y.push(Ke),T.push(Ke),Ke.userData.switchId=M.value||M.id,[I,D,...M.third?[Le(M.third)]:[]].forEach(vt=>We([vt,vt.clone().setY(.5)],$));let Et=Ne(M.value||M.id,ue.clone().add(new E(0,.18,-1)),3,.5,{background:"#faf9ef",color:"#345349",size:43});if($.add(Et),M.contact==="NC"||M.contact==="limit-spdt"){Ke.visible=!1;let vt=ie(2.45,.085,.24,ue.clone().add(new E(.5,.58,0)),at,$);vt.rotation.z=-.15;let gt=W(new zt(.22,.22,.36,20),it,ue.clone().add(new E(1.65,.41,0)),$);gt.rotation.x=Math.PI/2}else{let vt=(M.value||"")==="STOP";Ke.material.color.set(vt?"#bd4139":"#245f95"),Ke.userData.baseColor=vt?"#bd4139":"#245f95";let gt=Ne(vt?"STOP":"I / O",ue.clone().add(new E(0,.73,0)),.9,.4,{background:vt?"#bd4139":"#245f95",color:"#fff",size:40});$.add(gt)}}m.set(M.id,{group:$,wire:It,material:ut,curve:be,a:I,b:D,it:M,routed:we,routePoints:Re,height:de,plugs:je}),["wire","link"].includes(M.kind)||G.set(M.partId||M.id,{group:$,holes:[M.a,M.b,...M.third?[M.third]:[]],external:!!(M.externalControl||M.externalMotor),home:$.position.clone()})}e.items.forEach(Ie);for(let M of e.items.filter(I=>I.externalLead)){let I=M.externalLead,D=I.motor?V.find(we=>we.id===I.partId):N.find(we=>we.id===I.partId),U=D?.cables[I.terminal];if(!U)throw new Error("Missing external cable "+M.id);h.add(U.group),U.nativeId=M.id,U.wire.userData={id:M.id},U.tip&&(U.tip.visible=!1);let ae=U.curve.getPoint(0),ee=U.curve.getPoint(1);m.set(M.id,{group:U.group,wire:U.wire,material:U.wire.material,curve:U.curve,a:ae,b:ee,it:M,routed:!1,routePoints:null,height:1.8,plugs:[[],[{mesh:U.plug,home:U.plug.position.clone()}]]})}let le=new en;le.visible=!1,h.add(le);let xe=new bs,Fe=null,fe=0,Je=[],Xe=-1,Tt=new E,St=new E,on=M=>(M=Qn.clamp(M,0,1),M*M*(3-2*M)),ln=[[1587247,10],[16765290,7],[556947,3]].map(([M,I],D)=>{let U=new Qi({color:M,linewidth:I,worldUnits:!1,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),ae=new pc(xe,U);return ae.renderOrder=24+D,ae.frustumCulled=!1,le.add(ae),ae});function qu(M){if(le.visible=!!(M?.group.visible&&M.it.kind==="wire"),!le.visible){Fe=null;return}if(Fe===M.it.id)return;let I=M.wire.geometry.parameters.tubularSegments;Je=Array.from({length:I+1},(U,ae)=>M.curve.getPointAt(ae/I)),Xe=-1;let D=new bs;D.setPositions(Je.flatMap(U=>U.toArray())),xe.dispose(),xe=D,ln.forEach(U=>{U.geometry=D}),ln[2].material.color.copy(M.material.color),Fe=M.it.id,fe++}let Es=[0,1].map(M=>{let I=W(new pi(.35,.075,8,24),new Ht({color:M?4284356:882277,depthTest:!1}),new E);return I.rotation.x=-Math.PI/2,I.renderOrder=15,I.visible=!1,{ring:I}}),ti=W(new fi(.17,12,8),new Ht({color:16768134,depthTest:!1,depthWrite:!1}),new E);ti.renderOrder=32,ti.visible=!1;let Ha=[0,1].map(()=>{let M=W(new pi(.22,.06,8,24),new Ht({color:15840829,depthTest:!1}),new E);return M.rotation.x=-Math.PI/2,M.renderOrder=16,M.visible=!1,M});function Zu(M){for(;M;){if(!M.visible)return!1;M=M.parent}return!0}let Ga=new ya,Wa=new ce,Wn=null;f.addEventListener("pointerdown",M=>{Wn=[M.clientX,M.clientY]}),f.addEventListener("pointerup",M=>{if(!Wn||Math.hypot(M.clientX-Wn[0],M.clientY-Wn[1])>6||M.button!==0)return;let I=f.getBoundingClientRect();Wa.set((M.clientX-I.left)/I.width*2-1,-(M.clientY-I.top)/I.height*2+1),Ga.setFromCamera(Wa,d);let D=Ga.intersectObjects(y,!1).find(ae=>Zu(ae.object));if(!D)return;let U=D.object.userData;U.id?i(U.id):U.p?r(U.u||U.array,U.p):U.chip?l(U.chip):U.holes&&D.instanceId!==void 0?c(U.holes[D.instanceId]):U.bit!==void 0&&a(U.bit)}),p.addEventListener("start",()=>{tt=null,Ee=!1,f.dataset.moving="false",me=50}),p.addEventListener("change",()=>{At=!0,Dt()}),p.addEventListener("end",()=>{me=50,Dt()});function Dt(){De&&!document.hidden&&!Qe&&(Qe=requestAnimationFrame(gc))}function mc(){if(!m.get(et)?.group.visible)return;let{width:I,height:D}=s.getBoundingClientRect();!I||!D||d.updateMatrixWorld()}function gc(M){if(Qe=0,!(!De||document.hidden)){if(At=!1,tt){let I=Qn.clamp((M-tt.started)/680,0,1),D=I<.5?4*I*I*I:1-Math.pow(-2*I+2,3)/2;d.position.lerpVectors(tt.fromPos,tt.toPos,D),p.target.lerpVectors(tt.fromTarget,tt.toTarget,D),I===1&&(tt=null,f.dataset.moving="false")}if(oe){let I=Qn.clamp((M-oe.started)/oe.duration,0,1);ti.position.copy(oe.curve.getPointAt(I)),ti.visible=I<1,Es.forEach(({ring:D})=>D.scale.setScalar(1+.25*Math.sin(I*Math.PI*2))),I===1&&(oe=null,Es.forEach(({ring:D})=>D.scale.setScalar(1)))}p.update(),mc(),u.render(h,d),F++,(tt||oe||At&&me-- >0)&&Dt()}}function es(){tt&&(d.position.copy(tt.toPos),p.target.copy(tt.toTarget),tt=null,p.update()),oe=null,ti.visible=!1,Es.forEach(({ring:M})=>M.scale.setScalar(1)),f.dataset.moving="false",Dt()}function Xa(M,I=!0){ge=[...M];let[D,U,ae,ee]=M,we=ye([D+ae/2,U+ee/2],1.6),de=Ee?new E(0,1,.001):d.position.clone().sub(p.target).normalize();de.length()<.5&&de.set(.18,1.15,1.2).normalize();let $=new E().crossVectors(d.up,de).normalize(),je=new E().crossVectors(de,$).normalize(),_e=8,Re=Math.tan(d.fov*Math.PI/360);for(let ut of[-ae/60,ae/60])for(let It of[-ee/60,ee/60])for(let ue of[-1.6,4]){let Ge=new E(ut,ue,It);_e=Math.max(_e,Ge.dot(de)+1.08*Math.abs(Ge.dot($))/(Re*d.aspect),Ge.dot(de)+1.08*Math.abs(Ge.dot(je))/Re)}st=_e;let be=we.clone().addScaledVector(de,_e);tt=null,I&&pe?.animate&&De&&nt.motion==="full"?(tt={fromPos:d.position.clone(),toPos:be,fromTarget:p.target.clone(),toTarget:we,started:performance.now()},f.dataset.moving="true"):(d.position.copy(be),p.target.copy(we),p.update(),f.dataset.moving="false"),Dt()}function ts(M){pe=M,et=M.selected,typeof M.clarity=="boolean"?ft=M.clarity:typeof M.routingFocus=="boolean"&&(ft=M.routingFocus),typeof M.isolate=="boolean"&&(C=M.isolate);let I=M.studio,D=!!I?.chip,U=new Set(I?.related||[]),ae=new Set(I?.signals?.active?I.signals.ids:[]),ee=m.get(M.selected),we=ft&&!!ee,de=ee?.it.partId,$=new Set([de,...[ee?.it.fromRef,ee?.it.toRef].filter(Boolean).map(_e=>_e.split(".")[0])].filter(Boolean)),je=[ee?.it.fromRef,ee?.it.toRef].filter(_e=>/^U\d+\.\d+$/.test(_e||""));for(let[_e,Re]of m){let be=!["wire","link"].includes(Re.it.kind)||M.step===e.stages.length-1||Re.it.stage===M.step;Re.group.visible=(be||M.previous&&Re.it.stage<M.step||D&&U.has(_e))&&!(C&&ee?.it.kind==="wire"&&Re.it.kind==="wire"&&_e!==M.selected);let ut=$.has(Re.it.partId),It=Re.it.kind==="wire"&&ee?.it.kind==="wire"&&ee.it.signal&&Re.it.signal===ee.it.signal,ue=Re.it.kind==="wire"&&de&&[Re.it.fromRef,Re.it.toRef].some(Ke=>Ke?.startsWith(de+".")),Ge=I?.signals?.active&&Re.it.kind==="wire"?ae.has(_e)?1:.16:D?U.has(_e)?1:Re.it.kind==="wire"?.1:.8:_e===M.selected?1:we?Re.it.kind==="wire"?It||ue?.32:.16:ut?1:.92:M.selected?.4:be?1:.75;Re.group.traverse(Ke=>{if(Ke.userData.viewerLabel&&(Ke.visible=!we||_e===M.selected||ut),Ke.isMesh)for(let Et of[].concat(Ke.material)){let vt=Ke.userData.baseOpacity??1;Et.transparent=Ge<1||vt<1||!!Ke.userData.softShadow,Et.opacity=Ge*vt,Et.depthWrite=Ge>.6&&vt===1&&!Ke.userData.softShadow}}),Re.material.emissive.set(_e===M.selected?Re.material.color:0),Re.material.emissiveIntensity=_e===M.selected?.3:0}qu(ee);for(let[_e,Re]of x)Re.visible=D?_e.startsWith(I.chip+".")&&(!I.pin||_e===I.chip+"."+I.pin):!we||je.includes(_e);Ha.forEach((_e,Re)=>{let be=je[Re],ut=b.find(It=>It.userData.u+"."+It.userData.p===be);_e.visible=!!(we&&ut),ut&&_e.position.copy(Le(ut.userData.h,.23))}),Es.forEach(({ring:_e},Re)=>{let be=m.get(M.selected);_e.visible=!!be?.group.visible,be&&_e.position.copy(Re?be.b:be.a).add(new E(0,.14,0))}),L&&(L.rotation.y=(M.pot/100-.5)*Math.PI),Be(I),yc(M),Ya(X);for(let _e of V)_e.group.visible=M.step>=_e.stage;s.dataset.selected=M.selected||"",s.dataset.step=M.step,s.dataset.wireClarity=String(ft),s.dataset.isolateWires=String(C),s.dataset.visibleConnections=[...m.values()].filter(_e=>_e.group.visible).length,M.animate||es(),Dt()}function Ya(M){X=M;let I=0;for(let D of N)for(let U of D.cables){if(U.nativeId){I++;continue}let ae=M&&D.id===M.id&&U.terminal===M.terminal;U.group.visible=pe?.step>=(D.wiringStage||2)&&(!M||I<=M.index),cp(U,ae?M.progress:1),I++}Dt()}function _c(M){let I=!!M;I!==ft&&(ft=I,pe?ts({...pe,clarity:I}):(s.dataset.wireClarity=String(I),Dt()))}function xc(M){let I=!1;for(let[D,U]of v){let ae=!!M[D];U.userData.lit!==ae&&(U.userData.lit=ae,U.color.set(U.userData.baseColor),U.emissive.set(ae?U.userData.baseColor:"#000000"),U.emissiveIntensity=ae?.9:0,R.get(D).visible=ae,I=!0)}I&&Dt()}function yc(M={}){xc(M.leds||{});for(let[I,D]of P){let[U,ae]=I.split("."),ee=!!(M.segments?.[I]??M.segments?.[U]?.[ae]);D.material.color.set(ee?"#ff5b42":"#42252a"),D.material.emissive.set(ee?"#ed3825":"#000000"),D.material.emissiveIntensity=ee?.8:0}for(let I of T){if(I.userData.externalControl){Qu(I,!!M.switches?.[I.userData.switchId]);continue}I.rotation.z=M.switches?.[I.userData.switchId]?-.18:.18,I.material.color.set(M.switches?.[I.userData.switchId]?"#da7044":I.userData.baseColor||"#245f95")}Dt()}function Ju(){let M=m.get(et);!M||!M.group.visible||!pe?.animate||!De||(oe={curve:M.curve,started:performance.now(),duration:Math.min(6e3,Math.max(2200,M.curve.getLength()*60))},ti.visible=!0,Dt())}function Ku(M){let I=M?.stripHoles||[],D=JSON.stringify(I);if(D===Ve||(Ve=D,Q.traverse(de=>{if(de.geometry?.dispose(),de.material)for(let $ of[].concat(de.material))$.dispose()}),Q.clear(),!I.length))return;let U=Le(I[0],.09),ae=Le(I.at(-1),.09),ee=U.clone().lerp(ae,.5),we=Math.abs(U.x-ae.x)>Math.abs(U.z-ae.z);ie(we?U.distanceTo(ae)+.6:.62,.045,we?.62:U.distanceTo(ae)+.6,ee,new Ht({color:14198067,transparent:!0,opacity:.38,depthTest:!1,depthWrite:!1}),Q);for(let de of I){let $=W(new pi(.27,.045,8,20),new Ht({color:11040800,depthTest:!1,depthWrite:!1}),Le(de,.13),Q);$.rotation.x=-Math.PI/2,$.renderOrder=18}}function qa(M){let I=M?.reveal;if(!I||I.ring<0)return;let D=M.wire.geometry,U=I.ring*I.stride,ae=U+I.stride;for(let ee of["position","normal"]){let we=D.getAttribute(ee);we.array.set(I[ee].subarray(U,ae),U),we.addUpdateRange(U,I.stride),we.needsUpdate=!0}I.ring=-1}function w(){if(Xe<0)return;let M=xe.getAttribute("instanceEnd"),I=Je[Xe+1];M&&I&&(M.setXYZ(Xe,I.x,I.y,I.z),M.data.needsUpdate=!0),Xe=-1}function B(M){if(M){qa(M),M.wire.geometry.setDrawRange(0,1/0);for(let I of M.plugs||[])for(let D of I)D.mesh.visible=!0,D.mesh.position.copy(D.home)}}function j(M){if(Me.id&&Me.id!==M?.id&&B(m.get(Me.id)),w(),!M){Me.id&&B(m.get(Me.id)),Me={id:null,progress:1},xe.instanceCount=xe.getAttribute("instanceStart")?.count||0,Dt();return}let I=m.get(M.id);if(!I||I.it.kind!=="wire")return;Me={id:M.id,progress:Qn.clamp(M.progress,0,1)},oe=null,ti.visible=!1;let D=Me.progress,U=on((D-.22)/.56),ae=I.wire.geometry;qa(I);let ee=ae.parameters.tubularSegments,we=ae.parameters.radialSegments,de=U*ee,$=Math.floor(de),je=de-$,_e=Math.min(ee,$+1);if(U>0&&U<1&&je>1e-8){I.reveal||={position:new Float32Array(ae.getAttribute("position").array),normal:new Float32Array(ae.getAttribute("normal").array),stride:(we+1)*3,ring:-1};let be=I.reveal,ut=ae.getAttribute("position"),It=ae.getAttribute("normal"),ue=ae.parameters.radius;I.curve.getPointAt(U,Tt);for(let Ge=0;Ge<=we;Ge++){let Ke=($*(we+1)+Ge)*3,Et=(_e*(we+1)+Ge)*3;St.set(be.normal[Ke]+(be.normal[Et]-be.normal[Ke])*je,be.normal[Ke+1]+(be.normal[Et+1]-be.normal[Ke+1])*je,be.normal[Ke+2]+(be.normal[Et+2]-be.normal[Ke+2])*je).normalize(),ut.setXYZ(_e*(we+1)+Ge,Tt.x+ue*St.x,Tt.y+ue*St.y,Tt.z+ue*St.z),It.setXYZ(_e*(we+1)+Ge,St.x,St.y,St.z)}be.ring=_e;for(let Ge of[ut,It])Ge.addUpdateRange(_e*be.stride,be.stride),Ge.needsUpdate=!0}else I.curve.getPointAt(U,Tt);let Re=U<=0?0:Math.ceil(de);if(ae.setDrawRange(0,Re*we*6),Fe===M.id&&(xe.instanceCount=Re,Re>0&&U<1)){let be=xe.getAttribute("instanceEnd");Xe=Re-1,be.setXYZ(Xe,Tt.x,Tt.y,Tt.z),be.data.needsUpdate=!0}(I.plugs||[]).forEach((be,ut)=>{let It=on(ut?(D-.78)/.22:D/.22);for(let ue of be)ue.mesh.visible=ut?D>=.78:!0,ue.mesh.position.copy(ue.home),ue.mesh.position.y+=.85*(1-It)}),Dt()}function J(){let M=m.get(Me.id);if(!M)return null;let I=M.wire.geometry,D=I.parameters.radialSegments,U=I.parameters.tubularSegments,ae=on((Me.progress-.22)/.56),ee=Math.ceil(ae*U),we=I.getAttribute("position"),de=new E;if(ee>0){for(let Re=0;Re<D;Re++){let be=ee*(D+1)+Re;de.x+=we.getX(be),de.y+=we.getY(be),de.z+=we.getZ(be)}de.divideScalar(D)}else de.copy(M.a);let $=xe.getAttribute("instanceEnd"),je=xe.instanceCount-1,_e=je>=0?new E($.getX(je),$.getY(je),$.getZ(je)):M.a;return{fraction:ae,wireTip:de.toArray(),traceTip:_e.toArray(),tipError:de.distanceTo(_e),visibleSegments:ee,segments:U,traceSegments:xe.instanceCount}}function Z(M){if(k?.id&&k.id!==M?.id){let D=G.get(k.id);D&&D.group.position.copy(D.home)}let I=G.get(M?.id);if(k=I?{id:M.id,progress:Qn.clamp(M.progress,0,1)}:null,re!==k?.id){Y.traverse(D=>{D.geometry?.dispose(),D.material?.dispose()}),Y.clear(),re=k?.id;for(let[D,U]of(I?.holes||[]).entries()){let ae=W(new pi(D===0?.3:.23,.045,8,20),new Ht({color:D===0?13080622:1538403,depthTest:!1,depthWrite:!1}),Le(U,.15),Y);ae.rotation.x=-Math.PI/2,ae.renderOrder=19}}if(I){let D=k.progress,U=on((D-.24)/.76);I.group.position.copy(I.home),I.group.position.y+=5.5*(1-U)}Dt()}function Be(M){Ku(M);for(let[I,D]of te)D.outline.visible=I===M?.chip,D.body.material.transparent=!!(M?.chip&&I!==M.chip),D.body.material.opacity=M?.chip&&I!==M.chip?.toString()?.52:1;j(M?.assembly||null),Z(M?.placement||null),ve(M?.signals||null)}function He(){let{width:M,height:I}=s.getBoundingClientRect();if(!(!M||!I)){d.aspect=M/I,d.updateProjectionMatrix(),u.setSize(M,I,!1),ln.forEach(D=>D.material.resolution.set(M,I));for(let D of S.children)D.material.resolution.set(M,I);Dt()}}let Oe=new ResizeObserver(He);Oe.observe(s),f.addEventListener("webglcontextlost",M=>{M.preventDefault(),Ze(!1),o("Tu navegador perdi\xF3 la vista 3D. Puedes seguir en 2D y volver a intentarlo.")});let Ye=()=>{document.hidden?(es(),Qe&&cancelAnimationFrame(Qe),Qe=0):Dt()};document.addEventListener("visibilitychange",Ye);function Ze(M){De=M,M?(He(),Dt()):(es(),Qe&&cancelAnimationFrame(Qe),Qe=0)}d.position.set(12,70,75),p.target.set(0,0,0),p.update();function mt(){let M=xe.getAttribute("instanceStart"),I=xe.getAttribute("instanceEnd");return{visible:le.visible,id:Fe,builds:fe,isolate:C,widths:ln.map(D=>D.material.linewidth),resolution:ln[0].material.resolution.toArray(),depthTest:ln.some(D=>D.material.depthTest),curveA:M?[M.getX(0),M.getY(0),M.getZ(0)]:null,curveB:I?[I.getX(I.count-1),I.getY(I.count-1),I.getZ(I.count-1)]:null,visibleWires:[...m].filter(([,D])=>D.it.kind==="wire"&&D.group.visible).map(([D])=>D),endpointLabels:[],endpointRings:Es.map(({ring:D})=>D.visible),replayDuration:oe?.duration||null}}let xt=new en;h.add(xt);let qe=op({groups:G,guideLayer:xt,requestRender:Dt,makeRing:(M,I)=>{let D=W(new pi(I===0?.3:.23,.045,8,20),new Ht({color:I===0?13080622:1538403,depthTest:!1,depthWrite:!1}),Le(M,.15),xt);return D.rotation.x=-Math.PI/2,D.renderOrder=19,D}});return{setComponentSequence:qe.apply,setExternalCable:Ya,update:ts,focusBox:Xa,replay:Ju,setActive:Ze,setLEDs:xc,setIndicators:yc,setWireClarity:_c,setAssembly:j,setPlacement:Z,setSignals:Te,getViewState(){return{camera:d.position.toArray(),target:p.target.toArray(),box:[...ge],fitDistance:st,topView:Ee}},getPlanViewBox(){let M=d.position.distanceTo(p.target)/Math.max(.01,st),I=ge[2]*M,D=ge[3]*M;return[ne+p.target.x*30-I/2,he+p.target.z*30-D/2,I,D]},restoreViewState(M){if(!M||!["camera","target"].every(U=>Array.isArray(M[U])&&M[U].length===3&&M[U].every(Number.isFinite)))return!1;let I=new E().fromArray(M.camera).distanceTo(new E().fromArray(M.target));if(I<p.minDistance||I>p.maxDistance)return!1;tt=null;let D=p.enableDamping;return p.enableDamping=!1,p.update(),d.position.fromArray(M.camera),p.target.fromArray(M.target),Ee=!!M.topView,Array.isArray(M.box)&&M.box.length===4&&M.box.every(Number.isFinite)&&M.box[2]>0&&M.box[3]>0&&(ge=[...M.box]),Number.isFinite(M.fitDistance)&&M.fitDistance>0&&(st=M.fitDistance),p.update(),p.enableDamping=D,f.dataset.moving="false",Dt(),!0},setAppearance(M={}){["auto","economy","sharp"].includes(M.quality)&&M.quality!==nt.quality&&(nt.quality=M.quality,u.setPixelRatio(Math.min(window.devicePixelRatio||1,M.quality==="economy"?1:M.quality==="sharp"?2:1.6)),He()),["full","reduced","off"].includes(M.motion)&&(nt.motion=M.motion),M.background&&M.background!==nt.background&&(h.background.set(M.background),nt.background=M.background),nt.motion!=="full"&&tt&&(d.position.copy(tt.toPos),p.target.copy(tt.toTarget),tt=null,p.update(),f.dataset.moving="false"),Dt()},getAppearance(){return{...nt}},stopReplay(){oe=null,ti.visible=!1,Dt()},capture(){return u.render(h,d),f.toDataURL("image/png")},preset(M){Ee=M==="top",Ee||(tt=null,d.position.copy(p.target).add(new E(12,70,75)),p.update()),Xa(ge,!0)},zoom(){let M=p.target.clone(),I=M.clone().add(d.position.clone().sub(M).multiplyScalar(.75));tt=null,pe?.animate&&nt.motion==="full"?(tt={fromPos:d.position.clone(),toPos:I,fromTarget:M,toTarget:M,started:performance.now()},f.dataset.moving="true",Dt()):(d.position.copy(I),p.update(),Dt())},rotate(M){Ee=!1;let I=d.position.clone().sub(p.target);I.applyAxisAngle(new E(0,1,0),M*Math.PI/6);let D=p.target.clone().add(I);pe?.animate&&nt.motion==="full"?(tt={fromPos:d.position.clone(),toPos:D,fromTarget:p.target.clone(),toTarget:p.target.clone(),started:performance.now()},f.dataset.moving="true",Dt()):(d.position.copy(D),p.update(),Dt())},diagnostics(){let M=f.getBoundingClientRect(),I=D=>{let U=D.clone().project(d);return[M.left+(U.x+1)*M.width/2,M.top+(1-U.y)*M.height/2]};return{componentAssembly:qe.diagnostics(),motors:[...m.values()].filter(D=>D.it.kind==="motor").map(D=>({id:D.it.partId,model:D.it.externalMotor?.model||"generic",terminals:D.it.externalMotor?.terminals.length||2,routeTypes:V.find(U=>U.id===D.it.partId)?.cables.map(U=>U.curve.type)||[]})),externalControls:N.map(D=>({id:D.id,model:D.model,center:D.center,bounds:D.bounds,connections:D.connections,cables:D.cables.map(U=>({terminal:U.terminal,routeType:U.curve.type,visible:U.group.visible,progress:U.nativeId?Me.id===U.nativeId?Me.progress:1:U.progress,drawCount:U.wire.geometry.drawRange.count,start:U.curve.getPoint(0).toArray(),end:U.curve.getPoint(1).toArray(),tip:U.nativeId?(Me.id===U.nativeId?U.curve.getPointAt(on((Me.progress-.22)/.56)):U.curve.getPoint(1)).toArray():U.tip.position.toArray()})),actuated:D.actuator.userData.actuated,actuator:D.actuator.position.toArray(),screen:I(ye(D.center,2.5))})),studio:{signals:q?{...q,builds:se}:null,placement:k?{...k,height:G.get(k.id).group.position.y,holes:G.get(k.id).holes}:null,chip:pe?.studio?.chip||null,stripHoles:pe?.studio?.stripHoles||[],assembly:{...Me},reveal:J(),partialDrawCount:Me.id?m.get(Me.id)?.wire.geometry.drawRange.count:null},selection:mt(),wireClarity:ft,routedConnections:[...m.values()].filter(D=>D.routed).length,wireStates:Object.fromEntries([...m].filter(([,D])=>D.routed).map(([D,U])=>[D,{opacity:U.wire.material.opacity,height:U.height,curveA:U.curve.getPoint(0).toArray(),curveB:U.curve.getPoint(1).toArray()}])),connectionCount:m.size,pinCount:b.length,arrayPinCount:A.length,resistorArrays:(e.arrays||[]).length,resistors:e.items.filter(D=>D.kind==="res").length,frames:F,active:De,moving:!!tt,camera:d.position.toArray(),target:p.target.toArray(),drawCalls:u.info.render.calls,triangles:u.info.render.triangles,targets:{contacts:[I(Le(["A","d",12],.03))],chips:[...te].map(([D,U])=>({id:D,screen:I(U.body.position)})),switches:T.slice(0,3).map(D=>I(D.position)),pins:b.map(D=>({u:D.userData.u,p:D.userData.p,screen:I(D.geometry.parameters.path.getPoint(.15))})),wires:Object.fromEntries([...m].map(([D,U])=>[D,I(U.curve.getPoint(.5))]))},endpoints:Object.fromEntries([...m].map(([D,U])=>[D,{a:U.it.a,b:U.it.b,worldA:U.a.toArray(),worldB:U.b.toArray()}])),lit:[...v].filter(([,D])=>D.userData.lit).map(([D])=>D)}},dispose(){Ze(!1),Oe.disconnect(),document.removeEventListener("visibilitychange",Ye),p.dispose();let M=new Set,I=new Set,D=new Set;h.traverse(U=>{U.geometry&&M.add(U.geometry);for(let ae of[].concat(U.material||[]))I.add(ae),ae.map&&D.add(ae.map)}),D.forEach(U=>U.dispose()),I.forEach(U=>U.dispose()),M.forEach(U=>U.dispose()),u.dispose(),f.remove()}}}export{qb as createViewer};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
