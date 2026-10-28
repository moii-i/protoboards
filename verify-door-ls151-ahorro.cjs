const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const load=(v,type)=>{const c=vm.createContext({window:{}});vm.runInContext(fs.readFileSync('protoboard-ah/puerta-'+v+'-'+type+'.js','utf8')+(type==='layout'?';window.result=model;':''),c);return JSON.parse(JSON.stringify(type==='layout'?c.window.result:c.window.DOOR_MODEL));};
const original=load('ls151','model'),compact=load('ls151-compacto','model'),source=load('ls151-ahorro','model'),m=load('ls151-ahorro','layout'),base=load('ls151','layout');
assert.deepEqual(source.connections,compact.connections,'Keep the calculated compact electrical graph');
assert.deepEqual(source.pinNames,original.pinNames,'IC pin functions remain unchanged');
for(const c of compact.components){const next=source.components.find(n=>n.id===c.id);assert(next,'Keep '+c.id);for(const k of ['id','type','pins','ohms','value','role','polarized'])assert.deepEqual(next[k],c[k],c.id+' '+k);}
assert.equal(source.components.filter(c=>c.type==='resistor').length,26);
assert.equal(source.components.filter(c=>c.type==='dip').length,5);
assert.equal(source.components.filter(c=>c.type==='cap').length,8,'Keep every decoupling and timing capacitor');
assert(!source.components.some(c=>['R5','R9'].includes(c.id)));
assert.equal(source.components.filter(c=>c.ohms===4700).length,21);
assert.equal(source.components.filter(c=>c.ohms===1000).length,4);
assert.equal(source.components.filter(c=>c.ohms===100000).length,1);
assert.equal(source.components.filter(c=>c.type==='motor').length,1);
for(const id of ['R6','R8','R10','R11','R12','R27','R28','R1','R4','R7','R24','R25'])assert(Object.values(source.components.find(c=>c.id===id).holes).some(h=>['+','-','-B'].includes(h.row)),id+' enters a power rail');
const wires=x=>x.items.filter(i=>i.kind==='wire');
assert.equal(wires(base).length,135);
assert(wires(m).length<=86,'Do not lose the pending layout savings');
assert.equal(m.wireSavings.saved,wires(base).length-wires(m).length);
assert.equal(m.wireSavings.resistors,26);
assert.equal(m.electricalBase,'ls151-compacto');
for(const c of source.components.filter(c=>c.type==='cap'))assert(Object.values(c.holes).some(h=>['-','-B'].includes(h.row)),c.id+' direct local ground');
for(const c of source.components.filter(c=>c.type==='switch')){assert.equal(c.holes[1].row,'+');assert.equal(c.holes[3].row,'-B');assert.equal(c.pins,3);}
assert.equal(m.items.filter(i=>i.kind==='link'&&/^R(1[3-9]|2[0-6])\.2$/.test(i.fromRef||'')&&/^D[12]\./.test(i.toRef||'')).length,14,'Keep one individual resistor and shared strip per segment');
// Reconstruct the nets and derive every LS output sink load from its consumers.
const parents=new Map(),find=x=>{if(!parents.has(x))parents.set(x,x);if(parents.get(x)!==x)parents.set(x,find(parents.get(x)));return parents.get(x);};
for(const w of source.connections)parents.set(find(w.from),find(w.to));
const same=(a,b)=>find(a)===find(b),rmin=r=>r.ohms*.95;
const inputs=['U2.2','U2.3','U2.5','U2.6','U2.8','U2.9','U3.1','U3.3','U3.5','U3.13'];
const outputs=['U1.5','U1.6','U2.1','U2.4','U2.10','U3.2','U3.4','U3.6','U3.12'];
const bounds={};
for(const output of outputs){
  let amps=inputs.filter(p=>same(p,output)).length*.0004+(same('U5.1',output)?.0001:0);
  for(const r of source.components.filter(c=>c.type==='resistor')){
    const pin=[1,2].find(p=>same(r.id+'.'+p,output));if(!pin)continue;
    if(r.role==='pullup')amps+=5.25/rmin(r);
    else if(r.role==='segment')amps+=(5.25-1.5)/rmin(r);
    else assert(false,'Unclassified direct LS resistor '+r.id);
  }
  for(const led of source.components.filter(c=>c.type==='led'&&same(c.id+'.2',output))){
    const limit=source.components.find(c=>c.type==='resistor'&&[1,2].some(p=>same(c.id+'.'+p,led.id+'.1')));
    assert(limit,led.id+' individual LED limiter');amps+=(5.25-1.5)/rmin(limit);
  }
  bounds[output]=+(amps*1000).toFixed(3);assert(amps<=.008,output+' exceeds conservative 8 mA LS sink budget');
}
assert(bounds['U1.5']>7&&bounds['U1.5']<7.2,'Include six segments, pull-up and three logic loads');
const ctx=vm.createContext({window:{}});vm.runInContext(fs.readFileSync('protoboard-ah/component-assembly.js','utf8')+';const model='+JSON.stringify(m)+';window.ComponentAssembly.prepare(model);window.result=model;',ctx);
assert.equal(ctx.window.result.items.filter(i=>i.externalLead).length,17);
assert(ctx.window.result.items.filter(i=>!['wire','link'].includes(i.kind)).every(i=>i.stage===0));
assert.notEqual(m.layoutVersion,base.layoutVersion,'Independent progress for changed values and positions');
console.log(JSON.stringify({variant:'ls151-ahorro',resistors:26,jumpers:wires(m).length,saved:m.wireSavings.saved,externalLeads:17,sinkBoundsMilliAmps:bounds,physicalElectricalTest:'pending'}));
