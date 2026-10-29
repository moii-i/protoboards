/* Digital evaluation of the user's recorded Proteus pin connections.
   Resistor current, brightness, contact bounce and motor dynamics are not simulated. */
(function(root){'use strict';
 const cache=new WeakMap(),glyphs={O:'abcdef',F:'aefg',P:'abefg',r:'eg',U:'bcdef',S:'acdfg'};
 const sorted=s=>[...s].sort().join(''),characters=new Map(Object.entries(glyphs).map(([k,v])=>[sorted(v),k]));
 function contactsFromInputs(input,model){
  const names={ABRIR:'abrir',CERRAR:'cerrar',STOP:'stop',FCA:'fca',FCC:'fcc'},contacts={};
  for(const c of model.components.filter(c=>c.dipSwitch)){
   contacts[c.id]={};for(const [position,name]of Object.entries(c.functions))contacts[c.id][position]=name==='STOP'&&model.stopClosedRun?!input.stop:Boolean(input[names[name]]);
  }return contacts;
 }
 function compile(model){
  if(cache.has(model))return cache.get(model);
  const chips=model.components.filter(c=>c.type==='dip'&&!c.dipSwitch),dips=model.components.filter(c=>c.dipSwitch),resistors=model.components.filter(c=>c.type==='resistor'),displays=model.components.filter(c=>c.type==='display'),leds=model.components.filter(c=>c.type==='led'),motor=model.components.find(c=>c.type==='motor'),nets=model.bindings;
  const connections=Object.values(nets),driven=new Set(['VCC','GND','VM']);
  for(const c of chips){const outputs=/151/.test(c.label)?[5,6]:/LS02/.test(c.label)?[1,4,10,13]:/LS04/.test(c.label)?[2,4,6,8,10,12]:/555/.test(c.label)?[3]:/293/.test(c.label)?[3,6,11,14]:[];for(const p of outputs)driven.add(nets[c.id+'.'+p]);}
  function evaluate(contacts,{powered=true,blink=true}={}){
   const values=Object.fromEntries(connections.map(n=>[n,null]));
   values.GND=0;values.VCC=powered?1:null;values.VM=powered?1:null;
   const at=(id,p)=>values[nets[id+'.'+p]],put=(id,p,value)=>{const n=nets[id+'.'+p];if(n)values[n]=value;},binary=n=>n===0||n===1;
   if(powered){
    // Every closed SPST joins its paired pins. Pull-ups act only on open inputs.
    for(const c of dips)for(const p of Object.keys(c.functions)){
     const a=nets[c.id+'.'+p],b=nets[c.id+'.'+(9-Number(p))],signal=a==='GND'?b:a;
     const pull=resistors.find(r=>[nets[r.id+'.1'],nets[r.id+'.2']].includes(signal)&&[nets[r.id+'.1'],nets[r.id+'.2']].includes('VCC'));
     values[signal]=contacts[c.id]?.[p]?0:pull?1:null;
    }
    for(let iteration=0;iteration<12;iteration++){
     for(const c of chips){
      const id=c.id;
      if(/151/.test(c.label)){
       const select=[11,10,9].map(p=>at(id,p)),enable=at(id,7);
       const index=select.reduce((sum,n,i)=>sum+(n<<i),0),data=[4,3,2,1,15,14,13,12];
       const value=enable===1?0:enable===0&&select.every(binary)?at(id,data[index]):null;
       put(id,5,value);put(id,6,binary(value)?1-value:null);
      }else if(/LS02/.test(c.label))for(const [o,a,b]of [[1,2,3],[4,5,6],[10,8,9],[13,11,12]])put(id,o,[at(id,a),at(id,b)].every(binary)?Number(!(at(id,a)||at(id,b))):null);
      else if(/LS04/.test(c.label))for(const [a,o]of [[1,2],[3,4],[5,6],[9,8],[11,10],[13,12]])put(id,o,binary(at(id,a))?1-at(id,a):null);
      else if(/555/.test(c.label))put(id,3,at(id,4)===0?0:at(id,4)===1?Number(blink):null);
      else if(/293/.test(c.label))for(const [enable,input,output]of [[1,2,3],[1,7,6],[9,10,11],[9,15,14]])put(id,output,at(id,enable)===1?at(id,input):null);
     }
     // Only undriven passive nodes inherit a known voltage level through a resistor.
     for(const r of resistors){const a=nets[r.id+'.1'],b=nets[r.id+'.2'];if(!driven.has(a)&&values[a]===null&&binary(values[b]))values[a]=values[b];if(!driven.has(b)&&values[b]===null&&binary(values[a]))values[b]=values[a];}
    }
   }
   const segments=Object.fromEntries(displays.map(d=>[d.id,Object.fromEntries(Object.entries(model.segmentPins).map(([s,p])=>[s,powered&&at(d.id,p)===1]))]));
   const message=powered?displays.map(d=>characters.get(Object.keys(segments[d.id]).filter(s=>segments[d.id][s]).sort().join(''))||'?').join(''):'- -';
   const lights=Object.fromEntries(leds.map(l=>[l.id,Boolean(powered&&at(l.id,1)===1&&at(l.id,2)===0)]));
   const difference=motor&&binary(at(motor.id,1))&&binary(at(motor.id,2))?at(motor.id,1)-at(motor.id,2):0;
   return {values,segments,message,leds:lights,contacts,motor:{direction:Math.sign(difference),moving:difference!==0}};
  }
  const compiled={evaluate};cache.set(model,compiled);return compiled;
 }
 const api={compile,contactsFromInputs};root.DoorProteusCircuit=api;if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window==='undefined'?globalThis:window);
