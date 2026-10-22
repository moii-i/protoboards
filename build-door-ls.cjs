/* Physical-first adaptation using the student's SN74LS02N and SN74LS08N.
   TI SCLA007A figure 29 supports resistive LS-to-HC interfacing.
   This generator does not claim a Proteus or analog simulation. */
const fs=require('node:fs'),vm=require('node:vm');
const ctx=vm.createContext({window:{}});
vm.runInContext(fs.readFileSync('protoboard-ah/puerta-model.js','utf8'),ctx);
const base=JSON.parse(JSON.stringify(ctx.window.DOOR_MODEL));
const model=JSON.parse(JSON.stringify(base));
const component=id=>model.components.find(c=>c.id===id);
Object.assign(component('U1'),{label:'SN74LS02N · NOR de bloqueo',pins:14});
model.components.push({id:'U6',label:'SN74LS08N · AND de apertura y cierre',board:2,col:57,pins:14,type:'dip'});
function pair(id,label,board,col,type,value,extra={}){
 model.components.push({id,label,board,col,pins:2,type,value,holes:{1:{col,row:'a'},2:{col:col+1,row:'a'}},...extra});
}
pair('CD6','100 nF · desacoplo U6',2,55,'cap','100 nF');
pair('RMA','2.2 kΩ · pull-up MA (LS a HC)',2,49,'resistor','2.2 kΩ',{ohms:2200});
pair('RMC','2.2 kΩ · pull-up MC (LS a HC)',2,51,'resistor','2.2 kΩ',{ohms:2200});
for(let i=0;i<5;i++)Object.assign(component('RP'+i),{label:'470 Ω · pull-down '+['ABRIR','CERRAR','STOP','FCA','FCC'][i],value:'470 Ω',ohms:470});
for(const c of model.components.filter(c=>c.type==='resistor'))if(!c.ohms)c.ohms=c.id==='RO'?100000:1000;
const replaceRef=r=>({'U1.7':'U6.6','U1.9':'U6.11','U1.15':'STOP.2','U1.5':'FCA.2'})[r]||r;
model.connections=base.connections.filter(w=>w.stage!==3&&!(w.stage===1&&(w.from.startsWith('U1.')||w.to.startsWith('U1.')))).map(w=>({...w,from:replaceRef(w.from),to:replaceRef(w.to)}));
function wire(stage,from,to,label,note=''){
 model.connections.push({stage,from,to,label,note,color:to==='GND'?'#243344':to==='VCC'?'#ed5269':'#5fa8ff'});
}
wire(1,'U1.14','VCC','Alimentar U1 · 74LS02 · pin 14 a +5 V');
wire(1,'U1.7','GND','Tierra U1 · 74LS02 · pin 7');
wire(1,'U6.14','VCC','Alimentar U6 · 74LS08 · pin 14 a +5 V');
wire(1,'U6.7','GND','Tierra U6 · 74LS08 · pin 7');
wire(1,'CD6.1','U6.14','Desacoplo U6 · primera pata cerámica a +5 V','Usa un puente corto hasta el pin 14 de U6. El capacitor va en B:a55 y B:a56, fuera de las tiras de señales del integrado. El cerámico no tiene polaridad.');
wire(1,'CD6.2','GND','Desacoplo U6 · segunda pata a GND');
// NOR1 X = NOT(CERRAR OR STOP); NOR2 Y = NOT(ABRIR OR STOP).
wire(3,'CERRAR.2','U1.2','CERRAR a NOR de bloqueo de apertura');
wire(3,'STOP.2','U1.3','STOP al primer bloqueo NOR');
wire(3,'ABRIR.2','U1.5','ABRIR a NOR de bloqueo de cierre');
wire(3,'U1.3','U1.6','STOP también al segundo bloqueo NOR');
// AND1/2 MA = (A AND X) AND PA; AND3/4 MC = (C AND Y) AND PC.
wire(3,'ABRIR.2','U6.1','ABRIR a primera AND');
wire(3,'U1.1','U6.2','X: apertura permitida por STOP y CERRAR');
wire(3,'U6.3','U6.4','Enlace interno de la cadena de apertura');
wire(3,'FCA.2','U6.5','Final NC de apertura a segunda AND');
wire(3,'CERRAR.2','U6.9','CERRAR a tercera AND');
wire(3,'U1.4','U6.10','Y: cierre permitido por STOP y ABRIR');
wire(3,'U6.8','U6.12','Enlace interno de la cadena de cierre');
wire(3,'FCC.2','U6.13','Final NC de cierre a cuarta AND');
// The unused NOR inputs are defined; their outputs stay open.
for(const pin of[8,9,11,12])wire(3,'U1.'+pin,'GND','Entrada NOR sin usar a GND · U1.'+pin);
wire(3,'U6.6','RMA.1','MA al pull-up de adaptación','RMA eleva el nivel alto de la salida LS para la entrada 74HC02. No es una resistencia en serie. Mantén corto el cable entre MA y U2.2.');
wire(3,'RMA.2','VCC','Pull-up MA · 2.2 kΩ a +5 V','Esta rama es necesaria para conservar el 74HC02. No conectar directamente MA a +5 V.');
wire(3,'U6.11','RMC.1','MC al pull-up de adaptación','RMC eleva el nivel alto de la salida LS para la entrada 74HC02. No es una resistencia en serie. Mantén corto el cable entre MC y U2.3.');
wire(3,'RMC.2','VCC','Pull-up MC · 2.2 kΩ a +5 V','Esta rama es necesaria para conservar el 74HC02. No conectar directamente MC a +5 V.');
model.connections.sort((a,b)=>a.stage-b.stage);
model.connections.forEach((w,i)=>w.id='W'+String(i+1).padStart(3,'0'));
model.assemblyVariant='ls';model.title='Puerta automática · montaje con 74LS02 y 74LS08';
model.nodes={...base.nodes,MA:'U6.6',MC:'U6.11',X:'U1.1',Y:'U1.4',KA:'U6.3',KC:'U6.8'};
model.groups=base.groups.map(g=>({...g,sig:replaceRef(g.sig)}));
model.unconnected=[...base.unconnected,'U1.10','U1.13'];
model.counts={integratedCircuits:6,resistorArrays:0,looseResistors:25,physicalComponents:49};
model.stages[0].description='Dos protoboards de 63 columnas. U1 74LS02 y U2–U5 conservan sus posiciones en A. U6 74LS08 va en B, columnas 57–63, cruzando la ranura. Muesca a la izquierda, pata 1 abajo a la izquierda. Lógica a 5 V regulados; motor a 6 V con tierra común.';
model.stages[1].description='ABRIR, CERRAR y STOP son de enclavamiento. FCA/FCC usan COM y NC: 1 lejos del extremo, 0 al llegar. Las cinco entradas llevan 470 Ω a GND, no 10 kΩ: el valor se adapta a las entradas TTL de los 74LS.';
model.stages[2]={id:3,title:'Control con tus 74LS02 y 74LS08',description:'Dos NOR de U1 bloquean STOP y la orden contraria; las cuatro AND de U6 incorporan la orden y su final NC. RMA y RMC de 2.2 kΩ van de MA/MC a +5 V para conservar el 74HC02. No omitas estas dos resistencias ni las confundas con las de 470 Ω a GND.'};
model.stages[7].description+=' Antes del motor, comprueba en MA/MC un alto de aproximadamente 4.5 V o más y un bajo de 0.4 V o menos. Usa 5 V regulados dentro de 4.75–5.25 V. Las dos resistencias de adaptación son obligatorias en este montaje mixto LS/HC.';
model.materials=base.materials.filter(m=>!(/74HC153/.test(m.name)||/Resistencia de 10\s/.test(m.name)));
const oldChipIndex=model.materials.findIndex(m=>/74HC02/.test(m.name));
model.materials.splice(oldChipIndex,0,{name:'SN74LS02N DIP14 · U1 (tus NOR)',quantity:1},{name:'SN74LS08N DIP14 · U6 (tus AND)',quantity:1});
model.materials.splice(model.materials.findIndex(m=>/Resistencia de 100/.test(m.name)),0,{name:'Resistencia de 470 Ω · pull-down de las cinco entradas',quantity:5},{name:'Resistencia de 2.2 kΩ · pull-up MA y MC, LS a HC',quantity:2});
model.materials.find(m=>/Capacitor cer/.test(m.name)).quantity=5;
model.sources=[{title:'SN74LS02: cuatro NOR',url:'https://www.ti.com/lit/ds/symlink/sn74ls02.pdf'},{title:'SN74LS08: cuatro AND',url:'https://www.ti.com/lit/ds/symlink/sn74ls08.pdf'},{title:'TI HCMOS Design Considerations · interfaz LS a HC, figura 29',url:'https://www.ti.com/jp/lit/pdf/scla007'},...base.sources.filter(s=>!/74HC153/.test(s.title))];
model.logicHtml=base.logicHtml.replace('Cinco integrados y dos protoboards','Seis integrados y dos protoboards').replace(/<h3>Motor con selección exclusiva<\/h3>.*?<h3>Señales y displays<\/h3>/s,'<h3>Motor con tus 74LS02 y 74LS08</h3><p>A=ABRIR, C=CERRAR, S=STOP. P_A/P_C valen 1 cuando su contacto NC está cerrado. U1 genera X=¬(C+S) e Y=¬(A+S). U6 genera KA=A·X, MA=KA·P_A, KC=C·Y y MC=KC·P_C. Así, MA=A·¬C·¬S·P_A y MC=C·¬A·¬S·P_C. Con STOP o ambas órdenes activas, MA=MC=0.</p><h3>Interfaz eléctrica con resistencias comunes</h3><p>U2 sigue siendo 74HC02; no requiere reemplazo por HCT. Coloca RMA y RMC, cada una de 2.2 kΩ, desde MA y MC respectivamente hasta +5 V. Son pull-up para la interfaz LS a HC descrita por TI en SCLA007A, figura 29. Mantén cortos los cables y verifica los niveles antes de conectar el motor. Las cinco entradas usan pull-down de 470 Ω a GND para absorber la corriente de entrada TTL; no uses aquí los 10 kΩ de la versión con multiplexor. El nuevo U6 lleva su capacitor de 100 nF. Esta elección evita conseguir otro integrado de interfaz; las resistencias no se deben omitir.</p><h3>Señales y displays</h3>');
model.pinNames={U1:{1:'1Y · X = NOT(CERRAR + STOP)',2:'1A · CERRAR',3:'1B · STOP',4:'2Y · Y = NOT(ABRIR + STOP)',5:'2A · ABRIR',6:'2B · STOP',7:'GND',8:'3A · GND (sin uso)',9:'3B · GND (sin uso)',10:'3Y · dejar libre',11:'4A · GND (sin uso)',12:'4B · GND (sin uso)',13:'4Y · dejar libre',14:'+5 V'},U6:{1:'1A · ABRIR',2:'1B · X',3:'1Y · KA',4:'2A · KA',5:'2B · P_A (final NC)',6:'2Y · MA apertura + pull-up 2.2 kΩ',7:'GND',8:'3Y · KC',9:'3A · CERRAR',10:'3B · Y',11:'4Y · MC cierre + pull-up 2.2 kΩ',12:'4A · KC',13:'4B · P_C (final NC)',14:'+5 V'}};
fs.writeFileSync('protoboard-ah/puerta-ls-model.js','window.DOOR_MODEL='+JSON.stringify(model)+';\n');
console.log(JSON.stringify({counts:model.counts,components:model.components.filter(c=>!['rail','junction'].includes(c.type)).length,wires:model.connections.length}));
