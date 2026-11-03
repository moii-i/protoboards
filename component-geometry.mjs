import * as THREE from 'three';
import dimensions from './component-models.json' with {type:'json'};

export const {pitch, resistor, display, jumper} = dimensions;

export function resistorBandDigits(value) {
  const match = String(value).trim().match(/^(\d+(?:[.,]\d+)?)\s*([kKmM]?)/);
  if (!match) return [1,0,2];
  const suffix = match[2];
  const ohms = Number(match[1].replace(',','.')) * (suffix.toLowerCase()==='k'?1000:suffix?1e6:1);
  if (ohms < 1 || !Number.isFinite(ohms)) return [1,0,2];
  const exponent = Math.floor(Math.log10(ohms))-1;
  const digits = Math.round(ohms / 10**exponent);
  return [Math.floor(digits/10),digits%10,exponent];
}

export function resistorBodyGeometry() {
  const sides=24, {profile,bands}=resistor;
  const positions=[...new Set([...profile.map(([y])=>y),...bands.flat()])].sort((a,b)=>a-b);
  const rings=positions.map(y=>{
    const next=profile.findIndex(([z])=>z>=y);
    const [z,r]=profile[next];
    const [previous,base]=profile[Math.max(0,next-1)];
    return new THREE.Vector2((z===previous?r:THREE.MathUtils.lerp(base,r,(y-previous)/(z-previous)))/pitch,y/pitch);
  });
  const geometry=new THREE.LatheGeometry([new THREE.Vector2(0,rings[0].y),...rings,new THREE.Vector2(0,rings.at(-1).y)],sides);
  // Bucket the indices so each material draws once, even across the UV seam.
  const buckets=Array.from({length:5},()=>[]),index=geometry.index.array;
  const intervals=rings.length+1;
  for(let side=0;side<sides;side++)for(let j=0;j<intervals;j++){
    const midpoint=(positions[j-1]+positions[j])/2;
    const slot=bands.findIndex(([start,end])=>midpoint>start&&midpoint<end)+1;
    const start=(side*intervals+j)*6;
    buckets[slot].push(...index.slice(start,start+6));
  }
  geometry.setIndex(buckets.flat());
  let start=0;
  for(const [slot,indices] of buckets.entries()){
    geometry.addGroup(start,indices.length,slot);
    start+=indices.length;
  }
  return geometry;
}

export function displayLensGeometry(points) {
  const shape=new THREE.Shape(points.map(([x,z])=>new THREE.Vector2(x/pitch,-z/pitch)));
  const geometry=new THREE.ExtrudeGeometry(shape,{depth:.016,bevelEnabled:true,bevelSize:.015,bevelThickness:.014,bevelSegments:1});
  geometry.rotateX(-Math.PI/2);
  return geometry;
}

export function componentGrain() {
  const size=128,canvas=document.createElement('canvas');
  canvas.width=canvas.height=size;
  const context=canvas.getContext('2d'),pixels=context.createImageData(size,size);
  let state=231;
  for(let i=0;i<pixels.data.length;i+=4){
    state=(Math.imul(1664525,state)+1013904223)>>>0;
    pixels.data.set([state>>>24,state>>>24,state>>>24,255],i);
  }
  context.putImageData(pixels,0,0);
  const texture=new THREE.CanvasTexture(canvas);
  texture.wrapS=texture.wrapT=THREE.RepeatWrapping;
  return texture;
}
