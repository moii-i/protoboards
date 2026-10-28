// Candidate for the available 1 kΩ resistors and 100 µF timing capacitor.
// Common-anode current limiting trades uniform brightness for fewer parts.
// Supply bypass capacitors are deliberately absent in this experimental profile;
// this is not a claim of physical noise immunity or manufacturer-compliant bypassing.
const fs=require('node:fs'),vm=require('node:vm');
const ctx=vm.createContext({window:{}});vm.runInContext(fs.readFileSync('protoboard-ah/puerta-ls151-model.js','utf8'),ctx);
const base=JSON.parse(JSON.stringify(ctx.window.DOOR_MODEL));
const keep=new Set(['JP1','U1','U2','U3','U4','U5','D1','D2','ABRIR','CERRAR','STOP','FCA','FCC','MOTOR','LY','LG','LR','R1','R3','R4','R7','C4']);
const m={...base,assemblyVariant:'ls151-minimo',title:'Puerta · LS151 mínimo · 13 resistencias de 1 kΩ',boardCount:1,components:base.components.filter(c=>keep.has(c.id)),connections:[],nodes:{},electricalBase:'ls151-minimo',optimizePhysical:true};
const get=id=>m.components.find(c=>c.id===id);
for(const c of m.components)c.board=1;
for(const[id,col]of [['U4',3],['U3',13],['U2',22],['U1',31],['U5',55]])get(id).col=col;
function place(id,holes,note){const c=get(id);c.col=holes[0][1];c.holes=Object.fromEntries(holes.map(([row,col],i)=>[i+1,{row,col}]));if(note)c.assemblyNote=note;}
for(const[id,start]of [['D1',41],['D2',48]]){const c=get(id);c.col=start;c.holes=Object.fromEntries(Array.from({length:10},(_,i)=>{const p=i+1;return[p,{row:p<=5?'g':'c',col:start+(p<=5?p-1:10-p)}];}));}
function resistor(id,holes,role,note){m.components.push({id,type:'resistor',board:1,col:holes[0][1],pins:2,label:id+' · 1 kΩ',value:'1 kΩ',ohms:1000,role,holes:Object.fromEntries(holes.map(([row,col],i)=>[i+1,{row,col}])),assemblyNote:note});}
place('R1',[['+',4],['a',4]],'1 kΩ: de +5 V al nodo DISCH, compartido con U4.7. Su pata al riel sustituye el jumper.');
const rb=[[['b',4],['a',1]],[['b',1],['a',2]],[['b',2],['a',7]],[['b',7],['a',8]],[['b',8],['a',9]],[['b',9],['a',10]],[['b',10],['a',5]]];
for(let i=0;i<rb.length;i++)resistor('R2'+String.fromCharCode(65+i),rb[i],'timing-series','1 kΩ: parte '+(i+1)+' de las siete resistencias en serie que forman RB=7 kΩ. Las patas contiguas comparten columna; no añadas un jumper entre ellas. Mantén separado el metal expuesto.');
resistor('RDA',[['+',43],['a',43]],'display-common','1 kΩ desde +5 V al común de D1. Limita el total del display, no cada segmento por separado. El brillo depende de los segmentos encendidos.');
resistor('RDB',[['+',50],['a',50]],'display-common','1 kΩ desde +5 V al común de D2. No conectes ninguno de sus comunes directamente a +5 V ni puentes esta resistencia.');
const ct=get('C4');ct.value='100 µF';ct.label='C4 · 100 µF';ct.polarized=true;place('C4',[['b',5],['-',5]],'100 µF electrolítico: positivo a T/U4.6, negativo con franja a GND. Es de temporización; no está conectado entre VCC y GND para desacoplar. Comprueba que el cuerpo cabe sin tocar patas vecinas.');
place('R4',[['a',60],['b',53]],'1 kΩ entre OUT3 del L293D (columna 60 superior) y ánodo amarillo (53 superior). Se aprovecha el canal libre del driver; VM debe ser 6 V.');
place('LY',[['a',53],['-',53]],'Ánodo a R4, cátodo al riel GND. Lo alimenta OUT3 del L293D, no una salida LS directamente.');
place('R7',[['a',57],['b',63]],'1 kΩ entre OUT4 del L293D (columna 57 superior) y ánodo verde (63 superior). VM debe ser 6 V.');
place('LG',[['a',63],['-',61]],'Ánodo a R7, cátodo al riel GND. Lo alimenta OUT4 del L293D.');
place('R3',[['j',5],['j',7]],'1 kΩ desde OUT3 del 555 (columna 5 inferior) al ánodo rojo (7 inferior).');
place('LR',[['i',7],['-B',7]],'Ánodo a R3 y cátodo directamente al riel GND inferior.');
for(const[id,signal,hi,lo]of [['ABRIR',['a',36],35,36],['CERRAR',['a',37],36,37],['STOP',['j',37],37,38],['FCA',['j',33],38,34],['FCC',['j',32],39,30]])place(id,[['+',hi],signal,['-B',lo]],'Mando SPDT externo: contacto alto al riel +5 V, COM directamente a la tira del pin de señal y contacto bajo a GND. Identifica los terminales reales.');
place('MOTOR',[['j',57],['j',60]],'Un motor amarillo externo: cables directamente a OUT1 y OUT2 del L293D. No hay un segundo motor.');
m.externalMotor={model:'tt-yellow',center:[1580,1480],bounds:[1140,1280,2025,1700],terminals:[[1960,1440],[1960,1500]],label:'Motorreductor TT · externo'};
m.externalControlCenters=[180,520,860,1250,1650];

const bindings=new Map(),bind=(ref,net)=>bindings.set(ref,net);
const supplyPins=[['U1',16,8],['U2',14,7],['U3',14,7],['U4',8,1],['U5',16,4]];
for(const[id,v,g]of supplyPins){bind(id+'.'+v,'VCC');bind(id+'.'+g,'GND');}
for(const p of [5,12,13])bind('U5.'+p,'GND');bind('U5.8','VM');
for(const[id,n]of [['ABRIR','A'],['CERRAR','C'],['STOP','S'],['FCA','PA'],['FCC','PC']]){bind(id+'.1','VCC');bind(id+'.2',n);bind(id+'.3','GND');}
for(const[p,n]of [[1,'GND'],[2,'PC'],[3,'PA'],[4,'GND'],[5,'M'],[6,'NM'],[7,'S'],[9,'GND'],[10,'C'],[11,'A'],[12,'GND'],[13,'GND'],[14,'GND'],[15,'GND']])bind('U1.'+p,n);
for(const[p,n]of [[1,'I'],[2,'M'],[3,'S'],[4,'NT'],[5,'H'],[6,'FA'],[8,'PA'],[9,'H'],[10,'G'],[11,'NM'],[12,'NM'],[13,'MD']])bind('U2.'+p,n);
for(const[p,n]of [[1,'I'],[2,'H'],[3,'PA'],[4,'FA'],[5,'VCC'],[6,'ZERO'],[9,'S'],[8,'NSB'],[11,'NSB'],[10,'SB'],[13,'GND']])bind('U3.'+p,n);
for(const[p,n]of [[1,'M'],[2,'A'],[3,'MOTOR_A'],[6,'MOTOR_B'],[7,'C'],[9,'VCC'],[10,'M'],[11,'LY_DRV'],[14,'LG_DRV'],[15,'G']])bind('U5.'+p,n);
for(const[p,n]of [[2,'T'],[3,'Q'],[4,'S'],[6,'T'],[7,'DISCH']])bind('U4.'+p,n);
bind('MOTOR.1','MOTOR_A');bind('MOTOR.2','MOTOR_B');
bind('R1.1','VCC');bind('R1.2','DISCH');bind('C4.1','T');bind('C4.2','GND');
for(let i=0;i<7;i++){const id='R2'+String.fromCharCode(65+i);bind(id+'.1',i?'RB'+i:'DISCH');bind(id+'.2',i===6?'T':'RB'+(i+1));}
for(const[d,r]of [['D1','RDA'],['D2','RDB']]){bind(r+'.1','VCC');bind(r+'.2',d+'_COM');bind(d+'.3',d+'_COM');bind(d+'.8',d+'_COM');}
const returns=[['a','MD'],['b','H'],['c','MD'],['d','MD'],['e','SB'],['f','MD'],['g','I'],['a','M'],['b','NT'],['c','NM'],['d','NM'],['e','ZERO'],['f','ZERO'],['g','M']];
returns.forEach(([seg,n],i)=>bind((i<7?'D1':'D2')+'.'+base.displayPins[seg],n));
for(const[led,r,n]of [['LY','R4','LY_DRV'],['LG','R7','LG_DRV'],['LR','R3','Q']]){bind(r+'.1',n);bind(r+'.2',led+'_A');bind(led+'.1',led+'_A');bind(led+'.2','GND');}
function physical(ref){const[id,pn]=ref.split('.'),c=get(id),p=+pn,h=c.holes?.[p]||{col:c.col+(p<=c.pins/2?p-1:c.pins-p),row:p<=c.pins/2?'f':'e'};return {board:c.board,...h};}
const ys={'+':185,'-':215,'-B':680,VM:710,a:290,b:320,c:350,d:380,e:410,f:500,g:530,h:560,i:590,j:620};
const distance=(a,b)=>{a=physical(a);b=physical(b);return Math.abs(a.col-b.col)*30+Math.abs(ys[a.row]-ys[b.row]);};
const stage=ref=>/^D[12]\.|^(RDA|RDB|LY|LG|LR|R3|R4|R7)\./.test(ref)?7:/^(R1|R2[A-G]|C4)\./.test(ref)||/^U4\.[234567]$/.test(ref)?6:/^MOTOR\.|^U5\.(1|2|3|6|7|9|10|11|14|15)$/.test(ref)?5:/^(ABRIR|CERRAR|STOP|FCA|FCC)\./.test(ref)?2:/^U1\./.test(ref)?3:4;
const wire=(s,from,to,label,note='')=>m.connections.push({stage:s,from,to,label,note,color:to==='VCC'?'#db5266':to==='GND'?'#243344':to==='VM'?'#c17814':'#168c9c'});
// Keep only the first board's supply entries and rail-half bridges.
for(const w of base.connections.filter(w=>w.stage===1&&w.from.startsWith('JP1.')&&!w.to.startsWith('JP2.')))wire(w.stage,w.from,w.to,w.label,w.note);
const nets=new Map();for(const[ref,n]of bindings){if(!nets.has(n))nets.set(n,[]);nets.get(n).push(ref);}
for(const[n,refs]of nets){
 if(['VCC','GND','VM'].includes(n)){for(const ref of refs)wire(1,ref,n,ref+' a '+n);continue;}
 const left=[...refs],ordered=[left.shift()];while(left.length){const last=ordered.at(-1);left.sort((a,b)=>distance(last,a)-distance(last,b));ordered.push(left.shift());}
 for(let i=1;i<ordered.length;i++)wire(Math.max(stage(ordered[i-1]),stage(ordered[i])),ordered[i],ordered[i-1],ordered[i]+' a '+n);
 m.nodes[n]=ordered[0];
}
m.connections.sort((a,b)=>a.stage-b.stage);m.connections.forEach((w,i)=>w.id='W'+String(i+1).padStart(3,'0'));
Object.assign(m.nodes,{ABRIR:'ABRIR.2',CERRAR:'CERRAR.2',STOP:'STOP.2',PA:'FCA.2',PC:'FCC.2'});
m.unconnected=['D1.5','D2.5','U3.12','U4.5'];
m.bindings=Object.fromEntries(bindings);
m.pinNames.U2={...base.pinNames.U2,11:'NM · entrada del buffer',12:'NM · entrada del buffer',13:'MD = M · solo display D1'};
m.pinNames.U3={...base.pinNames.U3,5:'+5 V para generar cero',6:'ZERO · segmentos fijos D2.e/f',9:'STOP · buffer de display',8:'NSB = NOT STOP',11:'NSB · segunda inversión',10:'SB = STOP · D1.e',12:'salida libre',13:'entrada libre a GND'};
m.pinNames.U4={...base.pinNames.U4,5:'CONT · abierto en este perfil experimental',7:'DISCH · RA 1 kΩ y RB 7 kΩ'};
m.pinNames.U5={...base.pinNames.U5,9:'ENABLE2 · +5 V',10:'IN3 · M',11:'OUT3 · amarillo por R4',14:'OUT4 · verde por R7',15:'IN4 · G'};
m.counts={integratedCircuits:5,resistorArrays:0,looseResistors:13,physicalComponents:m.components.filter(c=>c.type!=='rail').length};
m.materials=[{name:'Protoboard de 63 columnas',quantity:1},...m.components.filter(c=>c.type==='dip').map(c=>({name:c.label,quantity:1})),{name:'Display de ánodo común (verificar pinout real)',quantity:2},{name:'Resistencia de 1 kΩ: 2 comunes, 3 LED y 8 temporización',quantity:13},{name:'Electrolítico 100 µF para temporización del 555',quantity:1},{name:'SCMM-122 · mando SPDT mantenido',quantity:3},{name:'SS0501A · final SPDT COM/NC/NA',quantity:2},{name:'LED rojo, amarillo y verde',quantity:3},{name:'Motor amarillo y fuentes reguladas 5 V / 6 V, GND común',quantity:1}];
m.placementDescription='Propuesta experimental en una protoboard: NE555 columnas 3–6, LS04 13–19, LS02 22–28, LS151 31–38, D1 41–45, D2 48–52 y L293D 55–62. Trece resistencias, todas de 1 kΩ; C4=100 µF. RDA/RDB van del riel +5 V al común de cada display. No copiar conexiones de otras variantes. Sin bypass cerámicos: no se acredita estabilidad física.';
m.stages=[{id:1,title:'Fuentes y rieles',description:'Una placa. +5 V regulados para lógica y displays; VM=6 V para L293D y los canales de LED. Negativos comunes; positivos separados. Este perfil omite los bypass recomendados por los fabricantes: requiere validación de ruido y arranque del motor.'},{id:2,title:'Mandos SPDT directos',description:'Cinco mandos externos de tres cables. COM comparte la tira del pin de señal; los extremos llegan directamente a +5 V/GND. Finales NC=+5 V y NA=GND. No hay resistencias de entrada.'},{id:3,title:'LS151 · control exclusivo',description:'Se conservan las ecuaciones de apertura/cierre y prioridad STOP. Las órdenes simultáneas bloquean el movimiento. El mando enclavado conserva la dirección durante la pausa.'},{id:4,title:'Estados y buffer de display',description:'LS02: I, NT, G y el cuarto NOR como inversor de NM para obtener MD=M. MD solo controla los segmentos M de D1; el M del LS151 controla D2. Así no se acumulan ambos displays sobre una salida. LS04 genera H y FA, el cero ZERO para D2.e/f y el buffer SB para D1.e; sólo la entrada restante va a GND. No se mezclan retornos directos a tierra con salidas TTL en un display.'},{id:5,title:'L293D · motor y LED',description:'Primer par: motor con ENABLE1=M, IN1=ABRIR e IN2=CERRAR. Segundo par, antes libre: ENABLE2=+5 V, IN3=M, OUT3 al amarillo por R4; IN4=G, OUT4 al verde por R7. Cátodos LED a GND. No conectar estas salidas al motor.'},{id:6,title:'555 · 100 µF y resistencias de 1 kΩ',description:'RA=R1=1 kΩ. RB=R2A…R2G en serie: 7 kΩ. C4=100 µF, positivo a T y negativo a GND. Frecuencia ideal aproximada 0.96 Hz. Pin 5 abierto en este perfil mínimo; el fabricante recomienda filtrado/bypass en un montaje robusto.'},{id:7,title:'Displays con limitador común',description:'RDA/RDB=1 kΩ entre +5 V y cada ánodo común. Los cátodos de segmentos van a sus señales. Cada display tiene la corriente total limitada; el reparto y brillo no son uniformes por garantía. Se mantienen separados los comunes D1/D2; nunca van directamente a VCC.'},{id:8,title:'Validación de laboratorio pendiente',description:'Comprobar pinout, tensiones, brillo de todos los segmentos, ausencia de luces residuales, parpadeo, 5 V al arrancar el motor y temperatura/corriente del driver. Un éxito booleano o visual web no demuestra funcionamiento eléctrico real sin desacoplo.'}];
m.minimalDesign={status:'Propuesta calculada · prueba eléctrica y física pendientes',boards:1,resistors:13,capacitors:1,inventory:'13 de tus 22 resistencias de 1 kΩ y un capacitor de 100 µF',warning:'Sin cerámicos no se garantiza estabilidad. El L293D recomienda bypass en sus dos alimentaciones y el 555 recomienda desacoplo. El brillo del display puede variar al compartir limitador.'};
m.logicHtml='<h3>Propuesta mínima con tu inventario</h3><p>13 resistencias, todas de 1 kΩ: dos comunes de display, tres de LED y ocho en el 555 (RA=1 kΩ, RB=7×1 kΩ). C4=100 µF: f≈0.96 Hz. Una sola protoboard.</p><h3>Recursos libres aprovechados</h3><p>El cuarto NOR produce MD=M para separar la carga del display D1. El segundo par del L293D alimenta amarillo y verde: no se requieren sus pull-up. Motor y LEDs usan salidas independientes.</p><h3>Límites de esta simplificación</h3><p>El limitador común acota el total de corriente, pero no iguala los segmentos: brillo y legibilidad deben comprobarse. Quitar cerámicos puede funcionar en banco, pero esta propuesta no cumple las recomendaciones de bypass de los fabricantes ni garantiza inmunidad al ruido. No es una simulación analógica ni una certificación de montaje.</p><h3>Control del examen</h3><p>M=¬STOP·(ABRIR·¬CERRAR·PA+CERRAR·¬ABRIR·PC). STOP conserva la orden en el mando enclavado. OF/rU/OP/SP y los finales mantienen el comportamiento lógico; la reanudación exige conservar el mando durante STOP.</p>';
m.sources.push({title:'Toshiba · función y ubicación del desacoplo',url:'https://toshiba.semicon-storage.com/us/semiconductor/knowledge/faq/logic_common/logic_common_06.html'},{title:'SparkFun · conectividad de protoboard',url:'https://learn.sparkfun.com/tutorials/how-to-use-a-breadboard/all'},{title:'OPTO PLUS · limitación individual y variación con resistor común',url:'https://www.opledtw.com/blog/led-configuration-commonanode-cathode-direct/'});
fs.writeFileSync('protoboard-ah/puerta-ls151-minimo-model.js','window.DOOR_MODEL='+JSON.stringify(m)+';\n');
console.log(JSON.stringify({variant:m.assemblyVariant,...m.counts,boards:1,capacitors:1}));
