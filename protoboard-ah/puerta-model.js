(function(){
'use strict';
// Top view: DIP notches face LEFT, pin 1 is lower-left (f). No electronic direction memory.
const components=[], connections=[];
const add=(id,label,board,col,pins,type='dip',extra={})=>components.push({id,label,board,col,pins,type,...extra});
add('U1','74HC153 · selección exclusiva de motor',1,3,16);
add('U2','74HC02 · cuatro compuertas NOR',1,15,14);
add('U3','74HC14 · inversión y parpadeo RC',1,26,14);
add('U4','ULN2803A · corriente de displays y LED',1,37,18);
add('U5','L293D · puente H',1,51,16);
function pair(id,label,board,c1,c2,type,row='a',extra={}){
 add(id,label,board,c1,2,type,{...extra,holes:{1:{col:c1,row},2:{col:c2,row}}});
}
[[1,1],[2,13],[3,24],[5,49]].forEach(([u,c])=>pair('CD'+u,'100 nF · desacoplo U'+u,1,c,c+1,'cap','a',{value:'100 nF'}));
pair('RO','100 kΩ · oscilador Schmitt',1,47,48,'resistor','a',{value:'100 kΩ'});
pair('CT','10 µF · oscilador Schmitt',1,47,48,'cap','f',{value:'10 µF',polarized:true});
pair('CM','100 µF · alimentación de motor',1,61,62,'cap','a',{value:'100 µF',polarized:true});
pair('MOTOR','Motor CC de baja corriente · fuente de 6 V',1,61,62,'motor','f');
for(const [id,col] of [['D1',3],['D2',13]]){
 const holes={};for(let p=1;p<=10;p++)holes[p]={col:col+(p<=5?p-1:10-p),row:p<=5?'g':'c'};
 add(id,(id==='D1'?'Display izquierdo':'Display derecho')+' · ánodo común',2,col,10,'display',{holes});
}
const displayPins={a:7,b:6,c:4,d:2,e:1,f:9,g:10};
for(let d=1;d<=2;d++)'abcdefg'.split('').forEach((s,i)=>{
 const c=21+((d-1)*7+i)*2;
 pair('R'+d+s,'1 kΩ · segmento D'+d+'.'+s,2,c,c+1,'resistor','a',{value:'1 kΩ'});
});
// Pull-down pin 1 shares its signal strip with contact pin 2; each uses a separate hole.
const names=['ABRIR','CERRAR','STOP','FCA','FCC'];
names.forEach((name,i)=>{
 const c=22+i*4;
 pair(name,i<3?name+' · botón de enclavamiento':name+' · final NC (abre al llegar)',2,c,c+1,'switch','f',{contact:i<3?'latching':'NC'});
 pair('RP'+i,'10 kΩ · entrada '+name,2,c+1,c+2,'resistor','h',{value:'10 kΩ'});
});
[['LY','RY',44,'amarillo','#f4c44e'],['LG','RG',49,'verde','#37dca0'],['LR','RR',54,'rojo','#ff5875']].forEach(([led,r,c,color,hex])=>{
 pair(led,'LED '+color,2,c+1,c+2,'led','f',{color:hex});
 pair(r,'1 kΩ · LED '+color,2,c,c+1,'resistor','h',{value:'1 kΩ'});
});
let serial=0;
function wire(stage,from,to,label,note='',color){
 connections.push({id:'W'+String(++serial).padStart(3,'0'),stage,from,to,label,note,color:color||(to==='GND'?'#243344':to==='VCC'?'#ed5269':to==='VM'?'#f09a42':'#5fa8ff')});
}
function chain(stage,refs,label,note=''){
 for(let i=1;i<refs.length;i++)wire(stage,refs[i-1],refs[i],label+(refs.length>2?' · tramo '+i:''),note);
}
const stages=[
 {id:1,title:'Alimentación y orientación',description:'Solo dos protoboards de 63 columnas. Cinco integrados en la placa A, con muesca a la izquierda y pata 1 abajo a la izquierda. Lógica a 5 V; motor con fuente de 6 V y tierra común.'},
 {id:2,title:'Enclavamientos y finales NC',description:'ABRIR, CERRAR y STOP son contactos de enclavamiento. Los finales FCA/FCC son normalmente cerrados: P_A/P_C valen 1 lejos del extremo y 0 al alcanzarlo. Cada entrada lleva 10 kΩ a GND.'},
 {id:3,title:'Selección del motor con un multiplexor',description:'El 74HC153 selecciona abrir, cerrar o parar. STOP inhibe ambos canales. ABRIR y CERRAR activados a la vez seleccionan dos ceros; no se ordenan dos sentidos simultáneos.'},
 {id:4,title:'Compuertas y señales de estado',description:'Cuatro NOR y cinco inversores generan movimiento, reposo, STOP, final de apertura y las señales compartidas de los displays. El sexto inversor queda para el oscilador RC.'},
 {id:5,title:'Puente H de baja corriente',description:'L293D: ENABLE=M, IN1=MA e IN2=MC. Al parar, ENABLE baja. El segundo puente queda deshabilitado. Comprueba la corriente de bloqueo del motor antes de conectar su fuente.'},
 {id:6,title:'Parpadeo sin un integrado adicional',description:'El inversor Schmitt restante, 100 kΩ y 10 µF forman un oscilador lento. El rojo recibe alimentación únicamente desde el contacto STOP; el oscilador puede funcionar continuamente.'},
 {id:7,title:'Dos displays y tres LED',description:'Cada segmento usa su propia resistencia de 1 kΩ. Seis grupos dinámicos y dos LED usan los ocho canales del ULN2803A. Los segmentos e/f del display derecho permanecen encendidos mediante sus resistencias.'},
 {id:8,title:'Revisión y protocolo de uso',description:'Mantén ABRIR o CERRAR enclavado durante STOP para conservar la dirección. Libera la orden al terminar su recorrido y antes de cambiar de sentido. Esta propuesta requiere validación eléctrica posterior en Proteus.'}
];
// ULN2803A has no VCC pin. Its COM pin remains open for these non-inductive LED loads.
[[1,16,8],[2,14,7],[3,14,7],[5,16,null]].forEach(([u,v,g])=>{
 wire(1,'U'+u+'.'+v,'VCC','Alimentar U'+u+' con +5 V');
 if(g)wire(1,'U'+u+'.'+g,'GND','Tierra U'+u);
 wire(1,'CD'+u+'.1','VCC','Desacoplo U'+u+' (+5 V)');
 wire(1,'CD'+u+'.2','GND','Desacoplo U'+u+' (GND)');
});
[4,5,12,13].forEach(p=>wire(1,'U5.'+p,'GND','Tierra de potencia L293D · pin '+p));
wire(1,'U5.8','VM','Alimentación de motor a 6 V');
wire(1,'U4.9','GND','Tierra ULN2803A');
wire(1,'CM.1','VM','Reserva de motor · positivo del electrolítico');
wire(1,'CM.2','GND','Reserva de motor · negativo del electrolítico');
names.forEach((name,i)=>{
 wire(2,name+'.1','VCC','Común +5 V de '+name,i>=3?'Usa COM y NC: el contacto se abre al alcanzar el extremo.':'Contacto de enclavamiento; se libera manualmente.');
 wire(2,name+'.2','RP'+i+'.1','Señal '+name,i>=3?'NC cerrado: señal 1. Final alcanzado: NC abre y el pull-down lleva la señal a 0.':'La resistencia evita una entrada flotante cuando el contacto está abierto.');
 wire(2,'RP'+i+'.2','GND','Pull-down de '+name+' a tierra');
});
const node={A:'ABRIR.2',C:'CERRAR.2',S:'STOP.2',PA:'FCA.2',PC:'FCC.2',MA:'U1.7',MC:'U1.9',NM:'U2.1',I:'U2.4',NT:'U2.10',G:'U2.13',M:'U3.2',NS:'U3.4',H:'U3.6',T:'U3.8',FA:'U3.10',OSC:'U3.12'};
// SN74HC153 select A=14 (LSB), B=2 (MSB); strobe HIGH forces output LOW.
wire(3,node.A,'U1.14','ABRIR al selector A (bit menos significativo)');
wire(3,node.C,'U1.2','CERRAR al selector B');
chain(3,[node.S,'U1.1','U1.15'],'STOP inhibe ambos canales','STOP=1 obliga ambas salidas del multiplexor a 0.');
wire(3,node.PA,'U1.5','P_A a dato 1 de apertura','Permite abrir únicamente mientras el final NC de apertura siga cerrado.');
wire(3,node.PC,'U1.12','P_C a dato 2 de cierre','Permite cerrar únicamente mientras el final NC de cierre siga cerrado.');
[3,4,6,10,11,13].forEach(p=>wire(3,'U1.'+p,'GND','Dato no seleccionado a cero · U1.'+p));
// U2: quad NOR. U3: six Schmitt inverters; no sequential feedback or memory.
wire(4,node.MA,'U2.2','MA a NOR de movimiento');
wire(4,node.MC,'U2.3','MC a NOR de movimiento');
wire(4,node.NM,'U3.1','NM invertido produce M');
wire(4,node.M,'U2.5','M a NOR de reposo');
chain(4,['U1.15','U3.3','U2.6'],'Distribuir STOP a la lógica');
wire(4,node.I,'U3.5','I invertido produce H');
wire(4,node.H,'U2.8','H a NOR de selección derecha');
wire(4,node.FA,'U2.9','Final de apertura a NOR de selección derecha');
wire(4,node.NT,'U3.9','NT invertido produce T');
chain(4,['U1.5','U3.11','U2.11'],'Distribuir P_A','P_A es alto lejos del final; FA=NOT P_A.');
wire(4,node.H,'U2.12','H bloquea el verde durante movimiento o STOP');
wire(5,node.M,'U5.1','ENABLE del puente H = movimiento');
wire(5,node.MA,'U5.2','IN1 = orden exclusiva de apertura');
wire(5,node.MC,'U5.7','IN2 = orden exclusiva de cierre');
wire(5,'U5.3','MOTOR.1','Salida del puente al terminal A del motor');
wire(5,'U5.6','MOTOR.2','Salida del puente al terminal B del motor');
[9,10,15].forEach(p=>wire(5,'U5.'+p,'GND','Segundo puente deshabilitado · U5.'+p));
// Relaxation oscillator: R from inverter output to input; C from input to ground.
wire(6,node.OSC,'RO.1','Salida Schmitt al resistor de realimentación');
wire(6,'RO.2','CT.1','Resistor al positivo del capacitor');
wire(6,'CT.1','U3.13','Nodo RC a entrada Schmitt');
wire(6,'CT.2','GND','Negativo de 10 µF a tierra');
wire(6,node.OSC,'U4.7','Oscilador al canal 7 de corriente');
wire(6,'U2.6','RR.1','Alimentación del rojo desde STOP','La corriente del rojo procede del contacto STOP, no de una salida lógica.');
wire(6,'RR.2','LR.1','Resistencia individual al ánodo rojo');
wire(6,'LR.2','U4.12','Cátodo rojo al canal 7 ULN');
const groups=[
 {sig:node.NM,segs:['1a','1c','1d','1f','2a','2g'],channel:1},
 {sig:node.I,segs:['1b'],channel:2},
 {sig:node.NS,segs:['1e'],channel:3},
 {sig:node.H,segs:['1g'],channel:4},
 {sig:node.T,segs:['2b'],channel:5},
 {sig:node.M,segs:['2c','2d'],channel:6},
 {sig:'GND',segs:['2e','2f'],channel:null,alwaysOn:true}
];
for(let d=1;d<=2;d++)[3,8].forEach(p=>wire(7,'D'+d+'.'+p,'VCC','Ánodo común D'+d+' · pin '+p));
groups.forEach(g=>{
 if(g.channel){
  wire(7,g.sig,'U4.'+g.channel,'Señal al grupo '+g.channel+' ULN');
  const out='U4.'+(19-g.channel);
  chain(7,[out,...g.segs.map(s=>'R'+s+'.1')],'Distribuir cátodo del grupo '+g.channel,'Estos extremos de resistencia comparten una salida ULN. Cada segmento conserva su resistencia individual.');
 }else g.segs.forEach(s=>wire(7,'R'+s+'.1','GND','Retorno permanente D'+s[0]+'.'+s[1]));
 g.segs.forEach(s=>wire(7,'R'+s+'.2','D'+s[0]+'.'+displayPins[s[1]],'Resistencia de 1 kΩ al segmento D'+s[0]+'.'+s[1]));
});
wire(7,'RY.1','VCC','Alimentación del LED amarillo');
wire(7,'RY.2','LY.1','Resistencia individual al ánodo amarillo');
wire(7,'R2d.1','LY.2','Cátodo amarillo al grupo de movimiento','R2d.1 comparte la salida del canal 6 con R2c.1.');
wire(7,node.G,'U4.8','Verde al canal 8 ULN');
wire(7,'RG.1','VCC','Alimentación del LED verde');
wire(7,'RG.2','LG.1','Resistencia individual al ánodo verde');
wire(7,'LG.2','U4.11','Cátodo verde al canal 8 ULN');
// Rail helpers represent ordinary distribution jumpers, not additional purchased parts.
for(let b=1;b<=2;b++){
 const holes={1:{col:62,row:'+'},2:{col:63,row:'+'},3:{col:62,row:'-'},4:{col:63,row:'-'},5:{col:62,row:'VM'},6:{col:63,row:'VM'},7:{col:31,row:'+'},8:{col:33,row:'+'},9:{col:31,row:'-'},10:{col:33,row:'-'},11:{col:31,row:'VM'},12:{col:33,row:'VM'},13:{col:60,row:'-'}};
 add('JP'+b,'Rieles · placa '+(b===1?'A':'B'),b,62,13,'rail',{holes});
 wire(1,'JP'+b+'.7','JP'+b+'.8','Unir mitades del riel +5 V','Instala el puente central si el riel está partido.','#ed5269');
 wire(1,'JP'+b+'.9','JP'+b+'.10','Unir mitades del riel GND','Instala el puente central si el riel está partido.','#243344');
}
wire(1,'JP1.2','JP2.1','Distribuir +5 V entre las dos placas','','#ed5269');
wire(1,'JP1.4','JP2.3','Unir GND entre las dos placas','','#243344');
wire(1,'JP1.11','JP1.12','Unir mitades del riel motor de placa A','','#f09a42');
wire(1,'JP1.1','VCC','Conectar fuente regulada de +5 V','Fuente lógica externa de +5 V regulados.','#ed5269');
wire(1,'JP1.3','GND','Conectar negativo de fuente lógica','','#243344');
wire(1,'JP1.5','VM','Conectar positivo de fuente motor de 6 V','','#f09a42');
wire(1,'JP1.13','GND','Conectar negativo de fuente motor','Las dos fuentes comparten GND.','#243344');
connections.sort((a,b)=>a.stage-b.stage);connections.forEach((c,i)=>c.id='W'+String(i+1).padStart(3,'0'));
const materials=[
 {name:'Protoboard completa de 63 columnas',quantity:2},
 ...components.filter(c=>c.type==='dip').map(c=>({name:c.label.split(' · ')[0]+' DIP',quantity:1})),
 {name:'Display de ánodo común DIP10 (filas a 15.24 mm)',quantity:2},
 {name:'Botón o interruptor de enclavamiento',quantity:3},
 {name:'Final de carrera con contacto NC',quantity:2},
 {name:'LED amarillo, verde y rojo',quantity:3},
 {name:'Resistencia de 1 kΩ (14 segmentos + 3 LED)',quantity:17},
 {name:'Resistencia de 10 kΩ (pull-down)',quantity:5},
 {name:'Resistencia de 100 kΩ (oscilador)',quantity:1},
 {name:'Capacitor cerámico de 100 nF',quantity:4},
 {name:'Capacitor electrolítico de 10 µF',quantity:1},
 {name:'Capacitor electrolítico de 100 µF',quantity:1},
 {name:'Motor CC de baja corriente compatible con L293D',quantity:1},
 {name:'Fuente regulada de 5 V y fuente de motor de 6 V con GND común',quantity:1},
 {name:'Cables de protoboard',quantity:'según la guía'}
];
window.DOOR_MODEL={assemblyVariant:'comunes',counts:{integratedCircuits:5,resistorArrays:0,looseResistors:23,physicalComponents:45},title:'Control automático de puerta · propuesta compacta',components,connections,stages,materials,nodes:node,boardCount:2,boards:[1,2],displayPins,groups,
 sources:[
  {title:'74HC153: multiplexor doble',url:'https://www.ti.com/lit/ds/symlink/sn74hc153.pdf'},
  {title:'74HC02: cuatro NOR',url:'https://www.ti.com/lit/ds/symlink/sn74hc02.pdf'},
  {title:'74HC14: seis inversores Schmitt',url:'https://www.ti.com/lit/ds/symlink/sn74hc14.pdf'},
  {title:'ULN2803A: ocho canales de corriente',url:'https://www.st.com/resource/en/datasheet/uln2803a.pdf'},
  {title:'Display SA36-11EWA: pinout y dimensiones de referencia',url:'https://www.kingbrightusa.com/images/catalog/SPEC/sa36-11ewa.pdf'},
  {title:'L293D: puente H con diodos',url:'https://www.ti.com/lit/ds/symlink/l293.pdf'}
 ],
 logicHtml:'<h3>Cinco integrados y dos protoboards</h3><p>La dirección se conserva mediante el botón de enclavamiento: mantén ABRIR o CERRAR activo durante STOP. Al liberar STOP, la misma orden vuelve a habilitarse si no se alcanzó su final. No existe memoria electrónica de una orden retirada. Desactiva la orden al terminar y antes de elegir el sentido contrario.</p><h3>Motor con selección exclusiva</h3><p>P_A y P_C son las señales de los finales NC: 1 lejos del extremo, 0 al alcanzarlo. MA = A · ¬C · P_A · ¬S; MC = C · ¬A · P_C · ¬S. El 74HC153 entrega MA y MC; A=C=1 selecciona cero en ambos canales. M=MA+MC habilita el L293D. STOP=1 inhibe los dos canales.</p><h3>Señales y displays</h3><p>NM=¬M; I=¬(M+S); H=¬I; NS=¬S; FA=¬P_A; T=H+FA; G=¬(P_A+H). Izquierdo: a,c,d,f=NM; b=I; e=NS; g=H. Derecho: a,g=NM; b=T; c,d=M; e,f=1. STOP tiene prioridad visual: SP. Movimiento: rU. Reposo: OP si FA=1; en otro caso OF.</p><p>Seis grupos dinámicos de segmentos usan ULN2803A. Los segmentos e y f del display derecho retornan directamente a GND mediante resistencias individuales. El canal 6 también controla el amarillo; el 7 conmuta el rojo; el 8 controla el verde.</p><h3>Parpadeo con el inversor disponible</h3><p>Una resistencia de 100 kΩ une U3.12 con U3.13 y un capacitor de 10 µF conecta U3.13 a GND. Este oscilador Schmitt produce un parpadeo lento, aproximadamente del orden de 1 Hz, dependiente de umbrales y tolerancias. El ánodo rojo recibe alimentación desde el contacto STOP mediante su resistencia de 1 kΩ; por eso permanece apagado al liberar STOP.</p><h3>Montaje y alcance</h3><p>Pinout de display asumido: 1=e, 2=d, 3=ánodo común, 4=c, 5=DP, 6=b, 7=a, 8=ánodo común, 9=f, 10=g. La distribución dibujada supone dos filas separadas 15.24 mm, como el SA36-11EWA: patas 1–5 en g y 6–10 en c. Verifica el pinout y las dimensiones de tu display antes de insertarlo. El pin 10 COM del ULN queda abierto porque solo controla LED; sus diodos de protección no son necesarios para estas cargas.</p><p>Fuentes: lógica regulada de 5 V y motor de 6 V con tierras comunes. Usa un motor pequeño, nominal de aproximadamente 200 mA o menos, y comprueba que su corriente de bloqueo sea menor de 600 mA y compatible con la disipación y caída de tensión del L293D. Esta guía representa la lógica ideal y un montaje propuesto: la validación eléctrica en Proteus y la prueba física están pendientes.</p><p>Si se retira una orden a mitad del recorrido, no se conserva electrónicamente. Fuera del protocolo normal, OF significa la indicación de reposo por defecto; no demuestra por sí sola que FCC esté alcanzado. Para la práctica, inicia en un extremo y mantén la orden hasta completar el recorrido, excepto las pausas con STOP.</p>',
 unconnected:['U4.10','U5.11','U5.14','D1.5','D2.5']};
})();

