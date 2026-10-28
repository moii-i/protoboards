// Remove only jumpers whose endpoints are already joined by copper or earlier wires.
// Components are never treated as shorts; all source nets are verified independently.
module.exports=function(items,helpers,boards){
 const parent=new Map(),find=x=>{if(!parent.has(x))parent.set(x,x);if(parent.get(x)!==x)parent.set(x,find(parent.get(x)));return parent.get(x);},join=(a,b)=>parent.set(find(a),find(b));
 const strip=h=>h[0]==='FUENTE'?'SUPPLY:'+h[1]:h[1].length>1?h[0]+':'+h[1]+':'+(h[2]<=31?'L':'R'):h[0]+':'+('abcde'.includes(h[1])?'top':'bottom')+':'+h[2];
 // These four ground bridges are retained and belong to the first wiring step.
 for(const it of helpers)join(strip(it.a),strip(it.b));
 const omitted=[];
 for(const it of [...items].sort((a,b)=>a.stage-b.stage)){
  if(it.kind!=='wire')continue;
  const a=strip(it.a),b=strip(it.b),required=it.a[0]==='FUENTE'||/^JP/.test(it.fromRef||'');
  if(!required&&find(a)===find(b))omitted.push(it.id);else join(a,b);
 }
 return omitted;
};
