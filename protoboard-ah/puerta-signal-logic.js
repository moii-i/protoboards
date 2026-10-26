(function(root){'use strict';
function evaluate(input,powered=true){
 const A=Number(Boolean(input.abrir)),C=Number(Boolean(input.cerrar)),S=Number(Boolean(input.stop)),PA=Number(!input.fca),PC=Number(!input.fcc);
 const MA=Number(A&&!C&&!S&&PA),MC=Number(C&&!A&&!S&&PC),M=Number(MA||MC);
 const values={M,STOP:S,S,NY:1-M,PA,PC,P_A:PA,P_C:PC,ABRIR:A,CERRAR:C,A,C,MA,MC,NM:1-M};
 if(!powered)for(const key of Object.keys(values))values[key]=null;return values;
}
root.DoorSignalLogic={evaluate};
})(window);