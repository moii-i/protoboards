// Shared two-board placement. Timing alternatives change only the 555 RB network.
const fs=require('node:fs'),vm=require('node:vm');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync('protoboard-ah/puerta-ls151-minimo-model.js','utf8'),ctx);
const m=JSON.parse(JSON.stringify(ctx.window.DOOR_MODEL));
Object.assign(m,{assemblyVariant:'ls151-claro',title:'Puerta · 13 resistencias · montaje despejado',boardCount:2,connections:[],nodes:{},clearLayout:true,accessibleDisplayContacts:true});
const option=process.argv.includes('--6k8')?'6k8':process.argv.includes('--9r')?'9r':null;
if(option){
 const single=option==='6k8',count=single?7:9,rb=single?6800:3000;
 m.components=m.components.filter(c=>!/^R2[A-G]$/.test(c.id));
 for(const ref of Object.keys(m.bindings))if(/^R2[A-G]\./.test(ref))delete m.bindings[ref];
 const chain=single?[['R2',6800,[['b',4],['a',5]]]]:[['R2A',1000,[['b',4],['a',1]]],['R2B',1000,[['b',1],['a',2]]],['R2C',1000,[['b',2],['a',5]]]];
 for(let i=0;i<chain.length;i++){
  const[id,ohms,holes]=chain[i],value=ohms===6800?'6.8 kO':'1 kO';
  m.components.push({id,type:'resistor',board:1,col:holes[0][1],pins:2,label:id+' — '+value,value,ohms,role:single?'timing-rb':'timing-series',holes:Object.fromEntries(holes.map(([row,col],j)=>[j+1,{row,col}])),assemblyNote:single?'6.8 kΩ entre DISCH (pin 7) y T (pines 2/6). Sus patas comparten las tiras del 555 y del capacitor; no añadas jumpers entre ellas.':'Parte '+(i+1)+' de tres resistencias de 1 kΩ en serie: RB=3 kΩ. Los extremos contiguos comparten tira; no añadas un cable entre ellos.'});
  m.bindings[id+'.1']=i?'RB'+i:'DISCH';m.bindings[id+'.2']=i===chain.length-1?'T':'RB'+(i+1);
 }
 const highMs=Math.LN2*(1000+rb)*.1,lowMs=Math.LN2*rb*.1;
 m.timingOption={id:option,resistors:count,raOhms:1000,rbOhms:rb,capacitorMicrofarads:100,rbParts:chain.map(c=>c[0]),highMs,lowMs,periodMs:highMs+lowMs,hz:1000/(highMs+lowMs),inventory:single?'6 resistencias de 1 kΩ + 1 de 6.8 kΩ':'9 resistencias de 1 kΩ',rbDescription:single?'R2: una resistencia de 6.8 kΩ':'R2A, R2B y R2C: tres de 1 kΩ en serie',otherVariant:single?'ls151-9r':'ls151-6k8'};
 m.assemblyVariant='ls151-'+option;m.title='Puerta — '+count+' resistencias — dos placas';m.electricalBase=m.assemblyVariant;
 m.counts.looseResistors=count;m.counts.physicalComponents=m.components.filter(c=>c.type!=='rail').length;
 Object.assign(m.minimalDesign,{resistors:count,inventory:m.timingOption.inventory,boards:2});
 m.materials=m.materials.filter(c=>!/^Resistencia/.test(c.name));
 m.materials.splice(6,0,{name:'Resistencia de 1 kΩ',quantity:single?6:9},...(single?[{name:'Resistencia de 6.8 kΩ, ¼ W',quantity:1}]:[]));
 m.stages[5].title='555 — '+count+' resistencias totales';
 m.stages[5].description='RA=R1=1 kΩ entre VCC y DISCH. RB: '+m.timingOption.rbDescription+' entre DISCH y T. C4=100 µF: positivo a T (pines 2/6), negativo a GND. Parpadeo nominal: '+m.timingOption.hz.toFixed(2)+' Hz. RESET4=STOP. Las patas de la cadena comparten tiras; no puentear ninguna resistencia.';
 m.logicHtml='<h3>Dos opciones del mismo control</h3><p>'+m.timingOption.inventory+'. Dos protoboards, cinco integrados y C4=100 µF. Sólo cambia RB del NE555: '+m.timingOption.rbDescription+'. Frecuencia ideal: '+m.timingOption.hz.toFixed(2)+' Hz; f=1/[ln(2)·(RA+2RB)·C].</p><h3>Conexiones que se conservan</h3><p>R1=1 kΩ; una resistencia de 1 kΩ por LED y una de 1 kΩ por común de display. STOP conserva la dirección en el mando enclavado. Los dos mandos simultáneos inhiben el motor.</p><h3>Alcance de la revisión</h3><p>Lógica y continuidad por programa. La simulación analógica de esta red RC, el brillo de los displays y la estabilidad del montaje físico requieren comprobación. Se conserva el perfil sin bypass cerámicos; C4 es de temporización.</p>';
 m.sources.push({title:'Texas Instruments — NE555, operación astable y ecuaciones',url:'https://www.ti.com/lit/ds/symlink/ne555.pdf'});
}
const get=id=>m.components.find(c=>c.id===id);
const candidateFile=process.argv.slice(2).find(a=>!a.startsWith('--'));
const candidate=candidateFile?JSON.parse(fs.readFileSync(candidateFile,'utf8')):{};
const positions={U4:3,U5:37,U1:53,U3:19,U2:3,D1:34,D2:48,...candidate};
for(const id of ['U2','U3','D1','D2','RDA','RDB'])get(id).board=2;
for(const id of ['U1','U2','U3','U4','U5'])get(id).col=positions[id];
function place(id,holes,note){const c=get(id);c.col=holes[0][1];c.holes=Object.fromEntries(holes.map(([row,col],i)=>[i+1,{row,col}]));if(note)c.assemblyNote=note;}
for(const id of ['D1','D2']){const start=positions[id],c=get(id);c.col=start;c.holes=Object.fromEntries(Array.from({length:10},(_,i)=>[i+1,{row:i<5?'g':'c',col:start+(i<5?i:9-i)}]));place(id==='D1'?'RDA':'RDB',[['+',start+2],['a',start+2]],'1 kΩ del riel +5 V al común del display en la misma tira. No añadas un jumper paralelo. El brillo compartido requiere prueba física.');}
const driver=positions.U5,mux=positions.U1;
place('R4',[['a',driver+5],['b',49]],'1 kΩ de OUT3 al LED amarillo del grupo. Sus patas completan la conexión, sin jumper adicional.');
place('LY',[['a',49],['-',49]],'LED amarillo junto al verde y rojo. Ánodo a R4; cátodo al riel GND.');
place('R7',[['a',driver+2],['b',46]],'1 kΩ de OUT4 al LED verde del grupo. Sus patas completan la conexión, sin jumper adicional.');
place('LG',[['a',46],['-',46]],'LED verde: primero del grupo verde–amarillo–rojo. Ánodo a R7; cátodo al riel GND.');
place('R3',[['a',51],['b',52]],'1 kΩ junto al LED rojo. Un único jumper trae OUT3 del 555 a esta resistencia.');
place('LR',[['a',52],['-',52]],'LED rojo junto a amarillo y verde; ánodo a R3 y cátodo al riel GND.');
place('MOTOR',[['j',driver+2],['j',driver+5]],'Dos cables del motor directamente a OUT1/OUT2. El cuerpo queda fuera, frente al driver.');
for(const[id,delta,row,hi,lo]of [['ABRIR',5,'a',4,5],['CERRAR',6,'a',5,6],['STOP',6,'j',6,7],['FCA',2,'j',7,3],['FCC',1,'j',8,-1]])place(id,[['+',mux+hi],[row,mux+delta],['-B',mux+lo]],'COM del mando en la misma tira del pin; contactos extremos directamente a los rieles. No hay jumper intermedio ni resistencia de entrada.');
m.externalMotor={model:'tt-yellow',center:[550,1230],bounds:[110,1030,995,1450],terminals:[[930,1190],[930,1250]],label:'Único motor TT amarillo · dos cables'};
m.externalControlCenters=[180,520,860,1250,1650];
m.externalControlPositions={ABRIR:[1450,1040],CERRAR:[1800,1040],STOP:[2150,1040],FCA:[1250,1510],FCC:[2500,1510]};
m.externalControlsView=[1050,750,1800,1100];
m.supplyPins={'JP1.1':['+5','+',14],'JP1.3':['G5','-',14],'JP1.5':['+6','VM',driver+7],'JP1.13':['G6','-',driver+3]};
m.sourceTerminals={'+5':[400,90],G5:[560,90],'+6':[820,90],G6:[980,90]};
// B uses only its left lower ground rail. The unused inverter input may be tied
// HIGH instead of LOW; its output remains unconnected and no used function changes.
m.bindings['U3.13']='VCC';m.pinNames.U3[13]='Entrada no usada a +5 V; salida 12 libre';
m.groundRailByBoard={2:'-B'};
m.groundBridges=[{board:1,suffix:'SIDE',a:['-',driver+4],b:['-B',driver+4]},{board:1,suffix:'MID',a:['-B',31],b:['-B',33]}];
const rail=get('JP1');const bRail=JSON.parse(JSON.stringify(rail));bRail.id='JP2';bRail.board=2;bRail.label='Rieles · placa B';m.components.push(bRail);
rail.holes[1]={row:'+',col:14};rail.holes[3]={row:'-',col:14};rail.holes[5]={row:'VM',col:driver+7};rail.holes[13]={row:'-',col:driver+3};
rail.holes[2]={row:'+',col:63};rail.holes[4]={row:'-B',col:63};bRail.holes[1]={row:'+',col:1};bRail.holes[3]={row:'-B',col:1};
const bindings=new Map(Object.entries(m.bindings));
const physical=ref=>{const[id,pn]=ref.split('.'),c=get(id),p=+pn;return {board:c.board,...(c.holes?.[p]||{col:c.col+(p<=c.pins/2?p-1:c.pins-p),row:p<=c.pins/2?'f':'e'})};};
const ys={'+':185,'-':215,'-B':680,VM:710,a:290,b:320,c:350,d:380,e:410,f:500,g:530,h:560,i:590,j:620};
const point=ref=>{const h=physical(ref);return[(h.board-1)*2070+95+(h.col-1)*30,ys[h.row]];};
const strip=ref=>{const h=physical(ref);return h.board+':'+('abcde'.includes(h.row)?'top':'bottom')+':'+h.col;};
const distance=(a,b)=>{a=point(a);b=point(b);return Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1]);};
const stage=ref=>/^D[12]\.|^(RDA|RDB|LY|LG|LR|R3|R4|R7)\./.test(ref)?7:/^(R1|R2[A-G]?|C4)\./.test(ref)||/^U4\.[234567]$/.test(ref)?6:/^MOTOR\.|^U5\.(1|2|3|6|7|9|10|11|14|15)$/.test(ref)?5:/^(ABRIR|CERRAR|STOP|FCA|FCC)\./.test(ref)?2:/^U1\./.test(ref)?3:4;
const wire=(s,from,to,label,note='')=>m.connections.push({stage:s,from,to,label,note,color:to==='VCC'?'#db5266':to==='GND'?'#243344':to==='VM'?'#c17814':'#168c9c'});
// Only rails that are used are bridged. VM powers the driver's half of A only.
for(const[from,to,label]of [['JP1.7','JP1.8','Unir +5 V de A'],['JP1.9','JP1.10','Unir GND superior de A'],['JP1.2','JP2.1','A → B: +5 V'],['JP1.4','JP2.3','A → B: GND inferior'],['JP2.7','JP2.8','Unir +5 V de B'],['JP1.1','VCC','Fuente lógica +5 V'],['JP1.3','GND','Negativo de fuente lógica'],['JP1.5','VM','Fuente motor +6 V: sólo A'],['JP1.13','GND','Negativo de motor, junto al driver']]){wire(1,from,to,label);if(to.startsWith('JP'))m.connections.at(-1).color=physical(from).row==='+'?'#db5266':'#243344';}
const nets=new Map();for(const[ref,n]of bindings){if(!nets.has(n))nets.set(n,[]);nets.get(n).push(ref);}
for(const[n,refs]of nets){
 if(['VCC','GND','VM'].includes(n)){for(const r of refs)wire(1,r,n,r+' a '+n);continue;}
 // Contract contacts that already share copper, then connect groups with a
 // short spanning tree with accessible contact capacity. A same-strip
 // connection never becomes a jumper; no global placement optimum is claimed.
 const groups=new Map();for(const ref of refs){const k=strip(ref);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(ref);}
 const list=[...groups.values()];for(const group of list)for(const r of group.slice(1))wire(Math.max(stage(r),stage(group[0])),r,group[0],r+' · misma tira '+n);
 const degree=Array(list.length).fill(0),capacity=list.map(g=>/^D[12]\./.test(g[0])?('abcde'.includes(physical(g[0]).row)?2:3):4);
 const joined=new Set([0]);while(joined.size<list.length){let best;for(const i of joined)if(degree[i]<capacity[i])for(let j=0;j<list.length;j++)if(!joined.has(j))for(const a of list[i])for(const b of list[j]){const cost=distance(a,b);if(!best||cost<best.cost)best={i,j,a,b,cost};}if(!best)throw Error('Contact capacity exceeded for '+n);degree[best.i]++;degree[best.j]++;joined.add(best.j);wire(Math.max(stage(best.a),stage(best.b)),best.b,best.a,best.b+' a '+n);}
 m.nodes[n]=refs[0];
}
m.connections.sort((a,b)=>a.stage-b.stage);m.connections.forEach((w,i)=>w.id='W'+String(i+1).padStart(3,'0'));
Object.assign(m.nodes,{ABRIR:'ABRIR.2',CERRAR:'CERRAR.2',STOP:'STOP.2',PA:'FCA.2',PC:'FCC.2'});
m.materials[0].quantity=2;m.minimalDesign.boards=2;
m.placementDescription='Dos placas, sin piezas añadidas. A: U4 NE555 en '+positions.U4+'–'+(positions.U4+3)+', U5 L293D en '+driver+'–'+(driver+7)+' y U1 LS151 en '+mux+'–'+(mux+7)+'. B: U3 LS04 en '+positions.U3+'–'+(positions.U3+6)+', U2 LS02 en '+positions.U2+'–'+(positions.U2+6)+', D1 en '+positions.D1+'–'+(positions.D1+4)+' y D2 en '+positions.D2+'–'+(positions.D2+4)+'. Mantén libres los espacios entre bloques. Usa sólo las coordenadas de esta variante.';
m.stages[0].description='5 V y GND comunes entre placas. VM de 6 V se queda en A, junto al motor. En B sólo se usa el GND inferior izquierdo; los rieles vacíos no necesitan puentes. Une las mitades de +5 V indicadas y comprueba continuidad antes de alimentar.';
m.logicHtml=m.logicHtml.replace('Una sola protoboard.','Dos protoboards con el mismo circuito.');
m.wiringTips=[['Placa A: mandos, motor y parpadeo','El RC queda junto al 555; el motor conecta directamente al L293D. Los tres mandos y finales llegan a las tiras del LS151.'],['Placa B: estados y displays','LS02 y LS04 quedan junto a los displays. Todos los cables de segmentos permanecen en B.'],['Sólo cinco señales entre placas','S (STOP), PA, M, NM y G; además de +5 V y GND. No se transportan VM ni los catorce segmentos entre placas.'],['Sin puentes de sobra','Cada red conecta sus grupos de tiras una sola vez. Resistencias al riel y patas en tiras compartidas evitan conexiones duplicadas.'],['Montar por bloques','Alambre rígido cortado a medida para los tramos locales. Conserva colores por señal y deja accesibles las patas de los integrados.']];
m.sources.push({title:'Adafruit · jumpers a medida',url:'https://learn.adafruit.com/breadboards-for-beginners/diy-jumper-wires'},{title:'Adafruit · rieles partidos y planificación',url:'https://learn.adafruit.com/breadboards-for-beginners/breadboard-tips-and-tricks'});
fs.writeFileSync('protoboard-ah/puerta-'+m.assemblyVariant+'-model.js','window.DOOR_MODEL='+JSON.stringify(m)+';\n');
console.log(JSON.stringify({variant:m.assemblyVariant,positions,boards:2,resistors:m.counts.looseResistors}));
