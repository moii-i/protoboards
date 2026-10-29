(function(root){'use strict';
function evaluate(input,powered=true){
 const A=Number(Boolean(input.abrir)),C=Number(Boolean(input.cerrar)),S=Number(Boolean(input.stop)),PA=Number(!input.fca),PC=Number(!input.fcc);
 const MA=Number(A&&!C&&!S&&PA),MC=Number(C&&!A&&!S&&PC),M=Number(MA||MC);
 const values={M,STOP:S,S,NY:1-M,PA,PC,P_A:PA,P_C:PC,ABRIR:A,CERRAR:C,A,C,MA,MC,NM:1-M};
 if(typeof model!=='undefined'&&model.dipCathode)Object.assign(values,{A_N:1-A,C_N:1-C,S_N:1-S});
 if(typeof model!=='undefined'&&model.proteusReference&&root.DoorProteusCircuit){const physical=root.DoorProteusCircuit.compile(model).evaluate(root.DoorProteusCircuit.contactsFromInputs(input,model),{powered});Object.assign(values,physical.values);values.NY=physical.values.M===null?null:1-physical.values.M;values.STOP=physical.values.S;values.P_A=physical.values.PA;values.P_C=physical.values.PC;values.MA=Number(physical.motor.direction===1);values.MC=Number(physical.motor.direction===-1);}
 if(!powered)for(const key of Object.keys(values))values[key]=null;return values;
}
root.DoorSignalLogic={evaluate};
})(window);