const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const logic=require('./protoboard-ah/puerta-proteus-logic.js');
const powerPins={U1:{label:'SN74LS151N',positive:[16],ground:[8]},U2:{label:'SN74LS02N',positive:[14],ground:[7]},U3:{label:'SN74LS04N',positive:[14],ground:[7]},U4:{label:'NE555',positive:[8],ground:[1]},U5:{label:'L293D',positive:[16,9],motor:[8],ground:[4,5,12,13]}};
const format=h=>h.join(':'),isRail=h=>['+T','-T','+B','-B'].includes(h[1]);
const outputPins=c=>/151/.test(c.label)?[5,6]:/LS02/.test(c.label)?[1,4,10,13]:/LS04/.test(c.label)?[2,4,6,8,10,12]:/555/.test(c.label)?[3]:/293/.test(c.label)?[3,6,11,14]:[];
function inspect(model,{continuousRails=false}={}){
 const wires=model.items.filter(i=>i.kind==='wire'&&!i.externalLead),components=model.components;
 const hole=(id,p)=>{const c=components.find(c=>c.id===id),n=Number(p),h=c.holes?.[n]||{row:n>c.pins/2?'e':'f',col:c.col+(n>c.pins/2?c.pins-n:n-1)};return [{1:'A',2:'B'}[c.board],({'+':'+T','-':'-T',VM:'+B'})[h.row]||h.row,h.col];};
 const strip=h=>h[0]==='FUENTE'?format(h):h[0]+':'+(isRail(h)?h[1]+':'+(continuousRails?'full':h[2]<=31?'left':'right'):('abcde'.includes(h[1])?'upper':'lower')+':'+h[2]);
 function graph(mask){const parent=new Map(),find=x=>{if(!parent.has(x))parent.set(x,x);if(parent.get(x)!==x)parent.set(x,find(parent.get(x)));return parent.get(x);},join=(a,b)=>parent.set(find(strip(a)),find(strip(b)));
  for(const w of wires)join(w.a,w.b);
  // L293D ground and heat-sink pins share an internal lead frame.
  for(const p of [5,12,13])join(hole('U5',4),hole('U5',p));
  if(mask!==undefined)for(const [i,c]of components.filter(c=>c.dipSwitch).entries())for(let p=1;p<=4;p++)if(mask&(1<<(i*4+p-1)))join(hole(c.id,p),hole(c.id,9-p));
  return h=>find(strip(h));
 }
 const root=graph(),ports={VCC:['FUENTE','+5',0],GND:['FUENTE','G5',0],VM:['FUENTE','+6',0]},errors=[],rows=[];
 const source=n=>root(ports[n]),feed=h=>wires.find(w=>[w.a,w.b].some(p=>strip(p)===strip(h)))?.id||null;
 for(const [id,spec]of Object.entries(powerPins)){
  assert.equal(components.find(c=>c.id===id)?.label,spec.label,'Manufacturer pinout matches exact package');
  const connections=[];
  for(const [kind,pins]of Object.entries({positive:spec.positive,ground:spec.ground,motor:spec.motor||[]}))for(const pin of pins){const h=hole(id,pin),net=kind==='positive'?'VCC':kind==='motor'?'VM':'GND',connected=root(h)===source(net);if(!connected)errors.push(id+'.'+pin+' no llega a '+net);connections.push({pin,hole:format(h),net,wire:feed(h),connected});}
  rows.push({id,label:spec.label,connections});
 }
 if(root(['FUENTE','G6',0])!==source('GND'))errors.push('Los negativos de ambas fuentes no están unidos');
 const limiters=[];
 for(const [id,common,limiter]of [['D1',3,'R2'],['D2',3,'R4']]){
  const joined=root(hole(id,common))===root(hole(id,8)),limited=root(hole(id,3))===root(hole(limiter,1))&&root(hole(limiter,2))===source('GND')&&root(hole(limiter,1))!==source('GND');
  if(!joined||!limited)errors.push(id+': común o limitador puenteado/desconectado');limiters.push({id,commonPins:[3,8],holes:[format(hole(id,3)),format(hole(id,8))],resistor:limiter,ohms:components.find(c=>c.id===limiter).ohms,joined,limited});
 }
 for(const id of ['R12','R13'])if(root(hole(id,1))===root(hole(id,2)))errors.push(id+' puenteada: LED sin limitador');
 const capacitor={id:'C1',positive:format(hole('C1',1)),negative:format(hole('C1',2)),correct:root(hole('C1',1))===root(hole('U4',2))&&root(hole('C1',1))===root(hole('U4',6))&&root(hole('C1',2))===source('GND')&&root(hole('C1',1))!==source('VCC')};
 if(!capacitor.correct)errors.push('C1 no conserva positivo en T y negativo en GND');
 const rails=[];for(const board of ['A','B'])for(const row of ['+T','-T','-B','+B'])for(const [bank,col]of [['izquierda',1],['derecha',63]]){const r=root([board,row,col]),nets=Object.keys(ports).filter(n=>r===source(n));rails.push({board,row,bank,net:nets.join('/')||null});}
 const circuit=logic.compile(model),shorts=[];let cases=0;
 for(let mask=0;mask<256;mask++)for(const blink of [false,true]){
  const connected=graph(mask),contacts={SW1:{},SW2:{}};for(let i=0;i<2;i++)for(let p=1;p<=4;p++)contacts['SW'+(i+1)][p]=Boolean(mask&(1<<(i*4+p-1)));
  // Equal ideal voltage does not make a push-pull output safe to tie to a rail
  // or another output. Check topology independently of the truth table.
  const outputsByRoot=new Map();
  for(const c of components.filter(c=>c.type==='dip'&&!c.dipSwitch))for(const p of outputPins(c)){
   const r=connected(hole(c.id,p)),entries=outputsByRoot.get(r)||[];entries.push(c.id+'.'+p);outputsByRoot.set(r,entries);
  }
  for(const [r,outputs]of outputsByRoot){
   const rails=Object.keys(ports).filter(n=>connected(ports[n])===r);
   if(rails.length||outputs.length>1)shorts.push({mask,blink,kind:'output-topology',outputs,rails});
  }
  const state=circuit.evaluate(contacts,{blink}),drivers=new Map();
  function drive(h,level,label){if(level===null||level===undefined)return;const r=connected(h),entries=drivers.get(r)||[];entries.push({level,label});drivers.set(r,entries);}
  for(const [name,h]of Object.entries(ports))drive(h,{VCC:5,GND:0,VM:6}[name],'Fuente '+name);
  drive(['FUENTE','G6',0],0,'Fuente GND 6 V');
  for(const c of components.filter(c=>c.type==='dip'&&!c.dipSwitch)){
   for(const p of outputPins(c)){const value=state.values[model.bindings[c.id+'.'+p]];drive(hole(c.id,p),value===1?(/293/.test(c.label)?6:5):value===0?0:null,c.id+'.'+p);}
  }
  if(state.values.S===0||state.values.Q===0)drive(hole('U4',7),0,'U4.7 DISCH activo');
  for(const entries of drivers.values())if(new Set(entries.map(d=>d.level)).size>1)shorts.push({mask,blink,drivers:entries});
  cases++;if(shorts.length)break;
 }
 return {railMode:continuousRails?'continuous':'split',passed:!errors.length&&!shorts.length,cases,errors,shorts:shorts.slice(0,4),rows,limiters,capacitor,rails,wires:wires.length};
}
function load(variant){const ctx={};vm.runInNewContext(fs.readFileSync('protoboard-ah/puerta-'+variant+'-layout.js','utf8')+';globalThis.result=model',ctx);return JSON.parse(JSON.stringify(ctx.result));}
module.exports={inspect,load};
if(require.main===module){
 const results=[];for(const variant of ['dip-cc-compacto','dip-cc-compacto-filtro'])for(const continuousRails of [false,true]){const result=inspect(load(variant),{continuousRails});assert(result.passed,JSON.stringify(result));assert.equal(result.cases,512);results.push({variant,...result});console.log(JSON.stringify({variant,railMode:result.railMode,passed:true,cases:result.cases,wires:result.wires}));}
 const model=load('dip-cc-compacto'),faults=[];
 for(const [id,destination]of [['W050',['A','a',54]],['W052',['B','a',24]],['W076',['A','a',44]]]){const fault=structuredClone(model);fault.items.find(w=>w.id===id).a=destination;const r=inspect(fault);assert(r.shorts.length,'Detect misplaced '+id);faults.push({id,destination,detected:true});}
 const bypass=structuredClone(model);bypass.items.push({id:'FAULT',kind:'wire',a:['A','+T',4],b:['A','a',4]});assert(inspect(bypass).shorts.length,'Detect direct VCC on 555 discharge');
 const common=structuredClone(model);common.items.push({id:'FAULT',kind:'wire',a:['B','b',36],b:['B','-T',36]});assert(inspect(common).errors.some(s=>s.includes('D1')),'Detect bypassed display resistor');
 const isolated=structuredClone(model);isolated.items.find(i=>i.id==='PWR_G5').b=['B','-B',60];assert(!inspect(isolated).passed,'Detect supply on an unused ground bank');
 const constantHigh=structuredClone(model);constantHigh.items.push({id:'FAULT',kind:'wire',a:['B','a',25],b:['B','+T',25]});assert(inspect(constantHigh).shorts.some(s=>s.kind==='output-topology'),'Detect constant HIGH output tied directly to VCC');
 const bridgedOutputs=structuredClone(model);bridgedOutputs.items.push({id:'FAULT',kind:'wire',a:['B','a',25],b:['B','a',27]});assert(inspect(bridgedOutputs).shorts.some(s=>s.outputs?.length>1),'Detect two push-pull outputs tied together');
 const farFeed=structuredClone(model);farFeed.items.find(i=>i.id==='PWR_+5').b=['B','+T',63];farFeed.items.find(i=>i.id==='PWR_G5').b=['B','-T',63];assert(!inspect(farFeed).passed,'Split board B far-end supply does not reach logic');assert(inspect(farFeed,{continuousRails:true}).passed,'Continuous rails do not have that isolated far-end bank');
 fs.mkdirSync('work/qa',{recursive:true});fs.writeFileSync('work/qa/power-audit.json',JSON.stringify({results,faults,scope:'Conductor connectivity and ideal driven-output contention. No measured currents, transient behavior or physical assembly validation.'},null,2));
 const publicData='window.DOOR_POWER_AUDIT='+JSON.stringify(results[0])+';\n';
 if(process.argv.includes('--write-data'))fs.writeFileSync('protoboard-ah/puerta-power-data.js',publicData);
 else assert.equal(fs.readFileSync('protoboard-ah/puerta-power-data.js','utf8'),publicData,'Published power data must match the current wiring');
 console.log('PASS: misplaced supply jumpers, NE555 discharge bypass, display limiter bypass, isolated rail feeds and direct push-pull output ties are detected.');
}
