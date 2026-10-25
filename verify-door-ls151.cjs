const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
for(const variant of ['ls151','ls151-compacto']){
 const ctx=vm.createContext({window:{}});vm.runInContext(fs.readFileSync('protoboard-ah/puerta-'+variant+'-model.js','utf8')+fs.readFileSync('protoboard-ah/puerta-'+variant+'-layout.js','utf8')+';window.layout=model;',ctx);
 const src=ctx.window.DOOR_MODEL,m=ctx.window.layout;
 function uf(){const p=new Map(),find=x=>{if(!p.has(x))p.set(x,x);if(p.get(x)!==x)p.set(x,find(p.get(x)));return p.get(x)};return{find,join:(a,b)=>p.set(find(a),find(b))};}const physical=uf(),logical=uf(),used=new Map();
 function hole(ref){const [id,p]=ref.split('.'),c=src.components.find(c=>c.id===id),i=+p,h=c.holes?.[i]||{col:c.col+(i<=c.pins/2?i-1:c.pins-i),row:i<=c.pins/2?'f':'e'};return[{1:'A',2:'B'}[c.board],({'+':'+T','-':'-T',VM:'+B'})[h.row]||h.row,h.col];}
 const strip=h=>h[0]==='FUENTE'?'SUPPLY:'+h[1]:h[1].length>1?h[0]+':'+h[1]+':'+(h[2]<=31?'L':'R'):h[0]+':'+('abcde'.includes(h[1])?'top':'bottom')+':'+h[2];
 function reserve(h,who){if(h[0]==='FUENTE')return;assert(h[2]>=1&&h[2]<=63,'column range');assert(!(h[1].length>1&&h[2]===32),'rail center');const k=h.join(':');assert(!used.has(k),'hole used twice '+k+' '+who+' '+used.get(k));used.set(k,who);}
 for(const c of src.components.filter(c=>c.type!=='rail'))for(let p=1;p<=c.pins;p++)reserve(hole(c.id+'.'+p),c.id+'.'+p);
 for(const it of m.items.filter(x=>x.kind==='wire')){for(const h of [it.a,it.b])reserve(h,it.id);physical.join(strip(it.a),strip(it.b));}
 const supply={VCC:'SUPPLY:+5',GND:'SUPPLY:G5',VM:'SUPPLY:+6'},real=r=>supply[r]||strip(hole(r));
 for(const w of src.connections){logical.join(w.from,w.to);assert.equal(physical.find(real(w.from)),physical.find(real(w.to)),'missing wire '+w.id+' '+w.from+' '+w.to);}
 for(const [a,b]of [['VCC','GND'],['VM','GND'],['VCC','VM']])assert.notEqual(physical.find(supply[a]),physical.find(supply[b]),'supply short');
 assert.equal(physical.find('SUPPLY:G6'),physical.find('SUPPLY:G5'));
 const roots=new Map();
 for(const c of src.components.filter(c=>c.type!=='rail'))for(let p=1;p<=c.pins;p++){const ref=c.id+'.'+p,k=physical.find(real(ref)),lr=logical.find(ref);if(roots.has(k))assert.equal(roots.get(k).lr,lr,'unintended strip short '+ref+' with '+roots.get(k).ref);else roots.set(k,{lr,ref});}
 const getValue=(values,ref)=>values.get(physical.find(real(ref))),setValue=(values,ref,v)=>{const k=physical.find(real(ref));if(values.has(k))assert.equal(values.get(k),v,'driver conflict '+ref);values.set(k,v);};
 const glyph={O:'abcdef',F:'aefg',P:'abefg',r:'eg',U:'bcdef',S:'acdfg'},sorted=s=>[...s].sort().join('');
 let cases=0;
 for(let mask=0;mask<32;mask++){
 const [A,C,S,PA,PC]=[0,1,2,3,4].map(i=>(mask>>i)&1),values=new Map();for(const [r,v]of [['VCC',1],['GND',0],['VM',1],['ABRIR.2',A],['CERRAR.2',C],['STOP.2',S],['FCA.2',PA],['FCC.2',PC]])setValue(values,r,v);
 const gates=[['U2',[2,3],1],['U3',[1],2],['U3',[3],4],['U2',[5,6],4],['U2',[8,9],10],['U3',[5],6],['U3',[13],12]];
 const muxSelect=getValue(values,'U1.11')+2*getValue(values,'U1.10')+4*getValue(values,'U1.9'),data=[4,3,2,1,15,14,13,12][muxSelect],M=getValue(values,'U1.7')?0:getValue(values,'U1.'+data);setValue(values,'U1.5',M);setValue(values,'U1.6',1-M);
 for(const [u,ps,out]of gates)setValue(values,u+'.'+out,ps.some(p=>getValue(values,u+'.'+p))?0:1);
 if(variant==='ls151')for(const [r,out]of [['R9','U1.5'],['R5','U1.6']])setValue(values,r+'.1',getValue(values,out));
 const expectedM=!S&&((A&&!C&&PA)||(C&&!A&&PC));assert.equal(M,Number(expectedM));const message=S?'SP':expectedM?'rU':PA===0?'OP':'OF';
 for(let d=0;d<2;d++){let actual='';for(let s=0;s<7;s++){const id='R'+(13+d*7+s),ret=getValue(values,id+'.1');assert.notEqual(ret,undefined,'floating segment '+id);if(!ret)actual+='abcdefg'[s];}assert.equal(sorted(actual),sorted(glyph[message[d]]),mask+' '+message+' display'+d);}
 assert.equal(getValue(values,'LY.2'),M?0:1);assert.equal(getValue(values,'LG.2'),message==='OP'?0:1);
 assert.equal(getValue(values,'U5.1'),M);if(M)assert.notEqual(getValue(values,'U5.2'),getValue(values,'U5.7'));
 cases++;}
 const compact=variant.endsWith('compacto'),r=src.components.filter(c=>c.type==='resistor');assert.equal(r.length,compact?26:28);assert.equal(src.components.filter(c=>c.type==='dip').length,5);
 if(compact){assert(!src.components.some(c=>['R5','R9'].includes(c.id)));assert(r.filter(c=>c.role==='segment'||c.role==='pullup').every(c=>c.ohms===4700));}
 const electrical=compact?{M:6*3.75/4.465+5.25/4.465+.9,NM:2*3.75/4.465+5.25/4.465,H:3.75/4.465+5.25/4.465+.8,NY:3.75/.95+5.25/4.465}:{M:(6*3.75/(.95+6*.95))+5.25/2.09+.9,NM:(2*3.75/(.95+2*.95))+5.25/2.09,NY:3.75/.95+5.25/2.09};
 assert(Object.values(electrical).every(i=>i<8),'LS sink budget');
 console.log(JSON.stringify({variant,cases,boards:2,pins:68,resistors:r.length,physicalParts:src.counts.physicalComponents,connections:m.items.length,physicalNetCheck:true,noStripShorts:true,sinkBoundsMilliAmps:electrical}));
}
