const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const suffix=process.argv.includes('--bypass')?'dip-cc-compacto-filtro':'dip-cc-compacto';
const c={window:{}};vm.runInNewContext(fs.readFileSync('protoboard-ah/puerta-'+suffix+'-model.js','utf8'),c);const m=c.window.DOOR_MODEL;
const l={};vm.runInNewContext(fs.readFileSync('protoboard-ah/puerta-'+suffix+'-layout.js','utf8')+';globalThis.result=model',l);const layout=l.result;
assert.equal(m.counts.integratedCircuits,5);assert.equal(m.components.filter(c=>c.type==='resistor').length,13);assert.equal(m.components.filter(c=>c.type==='resistor'&&c.ohms===10000).length,4);
assert.deepEqual(JSON.parse(JSON.stringify(m.segmentPins)),{a:7,b:6,c:4,d:2,e:1,f:9,g:10});
assert(m.components.filter(c=>c.type==='dip'&&!c.dipSwitch).every(c=>['SN74LS151N','SN74LS02N','SN74LS04N','NE555','L293D'].includes(c.label)),'only owned IC types');
const ph=ref=>{const[id,p]=ref.split('.'),a=m.components.find(c=>c.id===id),n=+p;return [{1:'A',2:'B'}[a.board],({'+':'+T','-':'-T',VM:'+B'})[a.holes?.[n]?.row]||a.holes?.[n]?.row||(n>a.pins/2?'e':'f'),a.holes?.[n]?.col??a.col+(n>a.pins/2?a.pins-n:n-1)];};
const key=h=>h.join(':'),strip=h=>h[0]==='FUENTE'?key(h):h[0]+':'+(h[1].length>1?h[1]+':'+(h[2]<=31?'L':'R'):('abcde'.includes(h[1])?'top':'bottom')+':'+h[2]);
const used=new Set();for(const c of m.components)for(let p=1;p<=c.pins;p++){const h=ph(c.id+'.'+p);assert(!used.has(key(h)),'duplicate component hole '+key(h));used.add(key(h));}
for(const w of layout.items.filter(i=>i.kind==='wire'))for(const h of [w.a,w.b]){assert(!used.has(key(h)),'wire shares an occupied hole '+key(h));used.add(key(h));assert(h[0]==='FUENTE'||(h[2]>=1&&h[2]<=63&&!(h[1].length>1&&h[2]===32)),'valid hole');}
function graph(omit){const parent=new Map(),root=x=>{if(!parent.has(x))parent.set(x,x);if(parent.get(x)!==x)parent.set(x,root(parent.get(x)));return parent.get(x);},join=(a,b)=>parent.set(root(a),root(b));for(const w of layout.items.filter(i=>i.kind==='wire'&&i.id!==omit))join(strip(w.a),strip(w.b));return h=>root(strip(h));}
function netGroups(root){const names=new Map(),groups=new Map();for(const[r,n]of Object.entries(m.bindings)){const k=root(ph(r));assert(!names.has(k)||names.get(k)===n,'physical short '+n+'/'+names.get(k));names.set(k,n);if(!groups.has(n))groups.set(n,new Set());groups.get(n).add(k);}for(const[port,n]of [['+5','VCC'],['G5','GND'],['+6','VM'],['G6','GND']])groups.get(n).add(root(['FUENTE',port,0]));return groups;}
const groups=netGroups(graph());for(const[n,roots]of groups)assert.equal(roots.size,1,'disconnected '+n);
for(const w of layout.items.filter(i=>i.kind==='wire'))assert([...netGroups(graph(w.id)).values()].some(xs=>xs.size>1),'redundant jumper '+w.id);
// Evaluate the actual chip pins, rather than the web's desired display state.
function evaluate(bits){const v={GND:0,VCC:1,VM:1,A_N:1-bits.abrir,C_N:1-bits.cerrar,S:bits.stop,PA:1-bits.fca,PC:1-bits.fcc},at=(id,p)=>v[m.bindings[id+'.'+p]],put=(id,p,n)=>{const k=m.bindings[id+'.'+p];if(k)v[k]=Number(n);};
 for(let iteration=0;iteration<12;iteration++){
  if(at('U1',7)!==undefined){const index=at('U1',11)+2*at('U1',10),pin=[4,3,2,1][index];put('U1',5,at('U1',7)?0:at('U1',pin));put('U1',6,1-at('U1',5));}
  for(const[o,a,b]of [[1,2,3],[4,5,6],[10,8,9],[13,11,12]])if([at('U2',a),at('U2',b)].every(n=>n===0||n===1))put('U2',o,!(at('U2',a)||at('U2',b)));
  for(const id of ['U3'])for(const[a,o]of [[1,2],[3,4],[5,6],[9,8],[11,10],[13,12]])if(at(id,a)!==undefined)put(id,o,!at(id,a));
 }
 return v;}
const glyph={O:'abcdef',F:'aefg',r:'eg',U:'bcdef',S:'acdfg',P:'abefg'};
for(let mask=0;mask<32;mask++){const b=Object.fromEntries(['abrir','cerrar','stop','fca','fcc'].map((k,i)=>[k,(mask>>i)&1])),v=evaluate(b),opening=b.abrir&&!b.cerrar&&!b.stop&&!b.fca,closing=b.cerrar&&!b.abrir&&!b.stop&&!b.fcc,message=b.stop?'SP':opening||closing?'rU':b.fca?'OP':'OF';assert.equal(v.M,Number(opening||closing),'motor mask '+mask);assert(!(opening&&closing));for(const[d,nets]of Object.entries(m.segmentNets)){const actual=Object.entries(nets).filter(([s,n])=>v[n]===1).map(([s])=>s).sort().join(''),expected=[...glyph[message[d==='D1'?0:1]]].sort().join('');assert.equal(actual,expected,'segments '+d+' mask '+mask);}}
// Bounds below cover ideal forward current through common resistors, not reverse LED leakage.
const displayBound=5.25/(20000*.95),hBound=displayBound+2*20e-6;
assert(displayBound<=.0004&&hBound<=.0004,'ideal forward-current estimate only');
assert.equal(m.components.filter(c=>c.dipSwitch).length,2);assert.equal(m.components.filter(c=>c.type==='motor').length,1);
assert.equal(m.components.filter(c=>c.type==='resistor'&&c.ohms===1000).length,7);
assert.equal(m.components.filter(c=>c.type==='resistor'&&c.ohms===2200).length,1);
assert.equal(m.components.filter(c=>c.type==='resistor'&&c.ohms===5100).length,1);
assert.equal(m.components.filter(c=>c.type==='cap'&&c.value==='100 nF').length,process.argv.includes('--bypass')?6:0);
assert.equal(m.bindings['U4.4'],'S');assert.equal(m.bindings['SW1.6'],'S');assert(m.stopClosedRun);
assert.equal(m.bindings['LG.1'],m.bindings['LY.2']);assert.equal(m.bindings['LG.2'],m.bindings['LY.1']);
assert.equal(m.bindings['U5.10'],'M');assert.equal(m.bindings['U5.15'],'G');
for(let mask=0;mask<32;mask++){const b=Object.fromEntries(['abrir','cerrar','stop','fca','fcc'].map((k,i)=>[k,(mask>>i)&1])),v=evaluate(b);assert(!(v.M&&v.G),'shared LED resistor requires exclusive polarities');assert.equal(v.G,Number(!b.stop&&!v.M&&b.fca),'green indication');assert.equal(v.S,b.stop,'555 direct STOP');}
const stopHigh=4.75-2200*1.05*(.0004+3*.00002);assert(stopHigh>2.3,'RESET and LS high margin');
console.log(JSON.stringify({passed:true,variant:suffix,inputCases:32,resistors:13,ICs:5,DIP4:2,jumpers:layout.items.filter(i=>i.kind==='wire').length,idealForwardCommonMax_mA:displayBound*1000,STOP_highMin_V:stopHigh,scope:'Boolean logic, physical continuity, no shared holes, each jumper necessary. Reverse leakage, brightness, noise, Proteus and hardware unverified.'}));
