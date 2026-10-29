/* One screen-readable name, anchored to the real part. No labels for cables. */
export function createComponentHologram({THREE,scene,container,camera,canvas,requestRender}){
 const targets=new Map(),aliases=new Map();let current=null,selectionToken=null,enabled=false;
 const card=document.createElement('div');card.className='component-hologram';card.id='doorComponentHologram';card.hidden=true;card.setAttribute('role','status');card.setAttribute('aria-live','polite');card.setAttribute('aria-atomic','true');
 const kind=document.createElement('span'),name=document.createElement('strong'),detail=document.createElement('span');kind.className='hologram-kind';detail.className='hologram-detail';card.append(kind,name,detail);container.append(card);
 const halo=new THREE.Group();halo.visible=false;scene.add(halo);
 const material=new THREE.MeshBasicMaterial({color:0x67dcd5,transparent:true,opacity:.65,depthWrite:false,toneMapped:false});
 const ring=new THREE.Mesh(new THREE.TorusGeometry(.76,.025,8,48),material);ring.rotation.x=-Math.PI/2;halo.add(ring);
 const stem=new THREE.Mesh(new THREE.CylinderGeometry(.012,.012,1.2,6),material.clone());stem.position.y=.6;stem.material.opacity=.35;halo.add(stem);
 const anchor=new THREE.Vector3(),projected=new THREE.Vector3(),partScreen=new THREE.Vector3();
 function visible(group){while(group){if(!group.visible)return false;group=group.parent;}return true;}
 function register(target){if(!['led','res','switch'].includes(target.type))return;targets.set(target.id,target);if(target.connectionId)aliases.set(target.connectionId,target.id);}
 function resolve(id){return targets.get(aliases.get(id)||id)||null;}
 function dismiss(){current=null;card.hidden=true;halo.visible=false;canvas.setAttribute('aria-describedby','threeHelp');requestRender();}
 function select(id,{toggle=false}={}){
  const target=resolve(id);if(!target||(toggle&&current?.id===target.id)){dismiss();return;}
  if(current?.id!==target.id){current=target;kind.textContent={led:'INDICADOR',res:'RESISTENCIA',switch:'CONTROL'}[target.type];name.textContent=target.title;detail.textContent=target.detail||'';detail.hidden=!target.detail;card.dataset.component=target.id;card.dataset.kind=target.type;}
  canvas.setAttribute('aria-describedby','threeHelp '+card.id);layout();requestRender();
 }
 function sync(token,id){if(token===selectionToken)return;selectionToken=token;select(id);}
 function layout(){
  if(!enabled||!current||!visible(current.group)){card.hidden=true;halo.visible=false;return;}
  const rect=container.getBoundingClientRect();if(!rect.width||!rect.height)return;
  current.group.updateWorldMatrix(true,false);anchor.copy(current.anchor).applyMatrix4(current.group.matrixWorld);camera.updateMatrixWorld();
  partScreen.copy(anchor).project(camera);
  if(partScreen.z< -1||partScreen.z>1||Math.abs(partScreen.x)>1.03||Math.abs(partScreen.y)>1.03){card.hidden=true;halo.visible=false;return;}
  halo.position.copy(anchor);halo.visible=true;
  projected.copy(anchor);projected.y+=1.7;projected.project(camera);
  card.hidden=false;
  const width=Math.min(228,rect.width-24),height=card.getBoundingClientRect?.().height||76;
  const px=(partScreen.x+1)*rect.width/2,py=(1-partScreen.y)*rect.height/2;
  const x=Math.max(width/2+10,Math.min(rect.width-width/2-10,px));
  const y=Math.max(height+12,Math.min(rect.height-10,(1-projected.y)*rect.height/2,py-22));
  card.style.width=width+'px';card.style.left=x+'px';card.style.top=y+'px';
 }
 const escape=e=>{if(e.key==='Escape'&&current){e.preventDefault();e.stopPropagation();dismiss();}};canvas.addEventListener('keydown',escape);
 return {register,resolve,select,sync,dismiss,layout,setActive(value){enabled=value;if(!value)dismiss();else layout();},
  diagnostics(){const target=current,rect=card.getBoundingClientRect?.(),viewport=container.getBoundingClientRect();camera.updateMatrixWorld();return {id:target?.id||null,type:target?.type||null,title:name.textContent,detail:detail.textContent,visible:!card.hidden,halo:halo.visible,anchor:anchor.toArray(),screen:rect?[rect.left,rect.top,rect.right,rect.bottom]:null,targets:[...targets.values()].map(t=>{t.group.updateWorldMatrix(true,false);const world=(t.hitPoint||t.anchor).clone().applyMatrix4(t.group.matrixWorld),p=world.clone().project(camera);return {id:t.id,type:t.type,title:t.title,world:world.toArray(),screen:[viewport.left+(p.x+1)*viewport.width/2,viewport.top+(1-p.y)*viewport.height/2]};})};},
  dispose(){canvas.removeEventListener('keydown',escape);card.remove();halo.removeFromParent();ring.geometry.dispose();stem.geometry.dispose();material.dispose();stem.material.dispose();}
 };
}
