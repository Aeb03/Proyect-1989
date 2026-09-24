(()=>{'use strict';

/* Liga de los Mundos v0.5.39 — Coloso / Armadura de Piedra
   🟡 EN PRUEBA
   Único cambio mecánico de esta capa:
   Coloso ya no puede aplicársela a sí mismo.
   Sí puede aplicarla a aliados, Pilares e invocaciones aliadas con PV. */

const stoneArmor=CHAMPIONS?.coloso?.abilities?.find(a=>a.id==='stonearmor');
if(stoneArmor){
  stoneArmor.cost=2;
  stoneArmor.range=3;
  stoneArmor.shield=15;
  stoneArmor.text='Otorga 15 de Escudo a un aliado, Pilar o invocación aliada con PV a alcance 3. No puede usarse sobre Coloso. Máximo 1 vez por turno por objetivo. El Escudo dura 1 turno.';
}

function stoneArmorFriendlyTarget(u,target,a){
  if(!u||!target||!a||!target.alive)return false;
  if(target.id===u.id)return false;
  if(u.stoneArmorTargetsUsed?.includes(target.id))return false;

  // Campeón aliado.
  if(target.kind==='unit'&&target.side===u.side){
    return tileInRangeLOS(u,target,a);
  }

  // Pilar o invocación aliada con PV.
  if(target.kind==='object'&&target.side===u.side&&target.maxHp>0){
    return tileInRangeLOS(u,target,a);
  }

  return false;
}

const stoneArmorBaseCanUseAbility=canUseAbility;
canUseAbility=function(u,id,x,y){
  if(id!=='stonearmor')return stoneArmorBaseCanUseAbility(u,id,x,y);

  const a=ability(u.championId,id);
  if(!a||!u.loadout.includes(id)||u.pa<a.cost||B.busy||!skillUseAllowed(u,id))return false;

  return stoneArmorFriendlyTarget(u,entityAt(x,y),a);
};

const stoneArmorBaseInvalidReason=invalidAbilityReason;
invalidAbilityReason=function(u,id,x,y){
  if(id==='stonearmor'){
    const target=entityAt(x,y);
    if(target?.id===u.id)return 'Armadura de Piedra no puede aplicarse sobre Coloso.';
  }
  return stoneArmorBaseInvalidReason(u,id,x,y);
};

const stoneArmorBaseActionInfo=actionInfo;
actionInfo=function(id){
  const info=stoneArmorBaseActionInfo(id);
  if(id==='stonearmor'&&info){
    info.target='Aliado / Pilar / invocación aliada';
  }
  return info;
};

})();
