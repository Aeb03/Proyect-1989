(()=>{'use strict';

/* v0.5.37 — Ajuste puntual de Coloso / Absorción Rocosa
   🟡 EN PRUEBA
   No modifica ninguna otra habilidad ni regla de Coloso. */

const absorb=CHAMPIONS?.coloso?.abilities?.find(a=>a.id==='absorb');
if(absorb){
  absorb.cost=2;
  absorb.range=3;
  absorb.text='Consume 1 Pilar propio a alcance 3. No puede absorber un Pilar creado durante este mismo turno. Recupera PV iguales a los PV actuales del Pilar en el momento de absorberlo, hasta un máximo de 20.';
}

function colosoTurnKey(u){
  if(typeof B==='undefined'||!B||!u)return null;
  return `${B.round}:${B.turn}:${u.id}`;
}

function pillarWasCreatedThisTurn(u,pillar){
  if(!u||!pillar||pillar.type!=='pillar'||pillar.ownerId!==u.id)return false;
  return !!pillar.createdTurnKey&&pillar.createdTurnKey===colosoTurnKey(u);
}

/* Regla de selección/uso. */
const _absorbBaseCanUseAbility=canUseAbility;
canUseAbility=function(u,id,x,y){
  if(id==='absorb'){
    const target=entityAt(x,y);
    if(pillarWasCreatedThisTurn(u,target))return false;
  }
  return _absorbBaseCanUseAbility(u,id,x,y);
};

/* Mensaje exacto cuando el Pilar todavía es demasiado reciente. */
const _absorbBaseInvalidReason=invalidAbilityReason;
invalidAbilityReason=function(u,id,x,y){
  if(id==='absorb'){
    const target=entityAt(x,y);
    if(pillarWasCreatedThisTurn(u,target)){
      return 'Absorción Rocosa no puede consumir un Pilar creado durante este mismo turno.';
    }
  }
  return _absorbBaseInvalidReason(u,id,x,y);
};

/*
  La ejecución base ya:
  - paga 2 PA;
  - valida alcance;
  - consume el Pilar;
  - registra el log;
  - dispara VFX de consumo.

  Sólo ajustamos:
  A) marcar cuándo nació cada Pilar;
  B) sustituir la curación fija de 20 por los PV actuales del Pilar.
*/
const _absorbBaseExecuteAbility=executeAbility;
executeAbility=async function(u,id,x,y,fromAI=false){
  if(id==='pillar'){
    const before=new Set((B?.pillars||[]).filter(p=>p.alive&&p.type==='pillar').map(p=>p.id));
    const result=await _absorbBaseExecuteAbility(u,id,x,y,fromAI);

    if(result){
      for(const p of (B?.pillars||[])){
        if(p.alive&&p.type==='pillar'&&p.ownerId===u.id&&!before.has(p.id)){
          p.createdTurnKey=colosoTurnKey(u);
        }
      }
    }
    return result;
  }

  if(id!=='absorb'){
    return await _absorbBaseExecuteAbility(u,id,x,y,fromAI);
  }

  const target=entityAt(x,y);

  /* Defensa extra: aunque otra capa llamara executeAbility directamente,
     nunca permitir absorber el Pilar creado en este mismo turno. */
  if(pillarWasCreatedThisTurn(u,target))return false;

  const pillarHp=Math.max(0,Math.min(20,target?.hp||0));

  /*
    La función base llama heal(u,20).
    Durante ESTA ejecución únicamente, limitamos esa llamada a pillarHp.
    No se altera heal global de forma permanente ni ninguna otra curación.
  */
  const originalHeal=heal;
  heal=function(entity,amount){
    if(entity?.id===u.id&&amount===20){
      return originalHeal(entity,Math.min(amount,pillarHp));
    }
    return originalHeal(entity,amount);
  };

  try{
    return await _absorbBaseExecuteAbility(u,id,x,y,fromAI);
  }finally{
    heal=originalHeal;
  }
};

})();
