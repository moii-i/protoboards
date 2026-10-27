/* Shared placement poses that reuse the real component meshes for the three real circuit viewers. */
export function createComponentRig({groups,requestRender,makeRing,guideLayer}){
 let pose=null,stamp='';
 function apply(value){
  pose=value;
  const key=value?.id||'';
  if(key!==stamp){for(const child of [...guideLayer.children]){child.geometry?.dispose();child.material?.dispose();guideLayer.remove(child);}stamp=key;const item=groups.get(key);if(item&&!item.external)for(const [i,h]of item.holes.entries()){const ring=makeRing(h,i);guideLayer.add(ring);}}
  for(const [id,c]of groups){c.home||=c.group.position.clone();c.group.position.copy(c.home);const n=value?.order?.indexOf(id)??-1;c.group.visible=!value||n<0||n<=value.index;if(value&&id===value.id){const t=Math.max(0,Math.min(1,(value.progress-.18)/.82)),k=t*t*(3-2*t);if(c.external){c.group.position.x+=4*(1-k);c.group.position.y+=.7*(1-k);}else c.group.position.y+=5.5*(1-k);}}
  guideLayer.visible=Boolean(value);requestRender();
 }
 return {apply,diagnostics:()=>({pose:pose?{id:pose.id,index:pose.index,progress:pose.progress}:null,components:[...groups].map(([id,c])=>({id,visible:c.group.visible,position:c.group.position.toArray(),home:c.home?.toArray(),holes:c.holes,external:!!c.external}))})};
}
