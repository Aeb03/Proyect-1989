(()=>{'use strict';

/*
  Liga de los Mundos v0.5.42
  IA territorial específica de Coloso — EN PRUEBA
*/

const _colosoTerritorialBaseCanUseAbility=canUseAbility;
const _colosoTerritorialBaseAiTurn=aiTurn;

function colosoEnemies(u){
  return enemyUnits(u,true).filter(e=>e?.alive);
}

function colosoNearestEnemy(u){
  const foes=colosoEnemies(u);
  if(!foes.length)return null;
  return foes.slice().sort((a,b)=>md(u,a)-md(u,b))[0];
}

function colosoEnemyDistanceFrom(pos,u){
  const foes=colosoEnemies(u);
  if(!foes.length)return 99;
  return Math.min(...foes.map(e=>md(pos,e)));
}

function colosoRelevantPillars(u){
  return ownedPillars(u).filter(p=>{
    const enemyDist=colosoEnemyDistanceFrom(p,u);
    const colosoDist=md(u,p);
    return enemyDist<=3 || (enemyDist<=4&&colosoDist<=3);
  });
}

function colosoCombatZoneState(u){
  const focus=colosoNearestEnemy(u);
  if(!focus)return {focus:null,distance:99,relevant:false,near:false};
  const distance=md(u,focus);
  return {focus,distance,near:distance<=4,relevant:distance<=5};
}

function colosoPillarPlacementUseful(u,x,y){
  const state=colosoCombatZoneState(u);
  if(!state.focus)return false;

  const pos={x,y};
  const currentDist=state.distance;
  const pillarDist=colosoEnemyDistanceFrom(pos,u);
  const pillars=ownedPillars(u);

  if(currentDist>=7){
    if((B?.round||1)<=1)return false;
    const alreadyForward=pillars.some(p=>colosoEnemyDistanceFrom(p,u)<=currentDist-2);
    if(alreadyForward)return false;
    return pillarDist<=currentDist-2;
  }

  if(currentDist>=5){
    if(pillarDist<=4)return true;
    return pillarDist<=currentDist-1;
  }

  if(pillarDist<=3)return true;
  return pillars.some(p=>colosoEnemyDistanceFrom(p,u)<=3&&md(p,pos)<=2);
}

function colosoFusionUseful(u,targetPillar){
  if(!targetPillar?.alive)return false;
  const state=colosoCombatZoneState(u);
  if(!state.focus)return false;
  if(state.distance<=4)return true;

  const otherUseful=ownedPillars(u)
    .filter(p=>p.id!==targetPillar.id)
    .some(p=>colosoEnemyDistanceFrom(p,u)<=2);

  return !!(otherUseful&&state.distance<=5);
}

canUseAbility=function(u,id,x,y){
  const base=_colosoTerritorialBaseCanUseAbility(u,id,x,y);
  if(!base)return false;

  if(u?.controller!=='ai'||u?.championId!=='coloso')return base;
  if(id==='pillar')return colosoPillarPlacementUseful(u,x,y);
  if(id==='fusion')return colosoFusionUseful(u,entityAt(x,y));
  return base;
};

function colosoCanAttackNow(u){
  const foes=colosoEnemies(u);
  if(!foes.length)return false;

  const offensive=(u.loadout||[]).filter(id=>['rock','quake'].includes(id));
  for(const id of offensive){
    for(const enemy of foes){
      if(_colosoTerritorialBaseCanUseAbility(u,id,enemy.x,enemy.y))return true;
    }
  }
  return false;
}

function colosoMonolithInfluence(u){
  const foes=colosoEnemies(u);
  if(!foes.length)return {useful:false,reason:'sin enemigos'};

  if(colosoCanAttackNow(u))return {useful:true,reason:'ataque disponible'};

  const nearest=Math.min(...foes.map(e=>md(u,e)));

  if((u.loadout||[]).includes('rock')&&nearest<=5){
    return {useful:true,reason:'amenaza de Roca'};
  }

  if((u.loadout||[]).includes('quake')){
    if(nearest<=2)return {useful:true,reason:'presión sísmica'};
    const pillarPressure=ownedPillars(u).some(p=>foes.some(e=>md(p,e)<=2));
    if(pillarPressure)return {useful:true,reason:'red de Pilares activa'};
  }

  const allies=teamUnits(u,true).filter(a=>a.id!==u.id&&a.alive);
  const protecting=allies.some(a=>md(u,a)<=3&&foes.some(e=>md(a,e)<=3));
  if(protecting)return {useful:true,reason:'protección de aliado'};

  if(colosoRelevantPillars(u).length){
    return {useful:true,reason:'control territorial'};
  }

  return {useful:false,reason:'fuera del frente'};
}

function colosoSnapshot(u){
  return {
    enemyHp:colosoEnemies(u).reduce((n,e)=>n+e.hp,0),
    ownHp:u.hp,
    ownShield:shieldTotal(u),
    pillarCount:ownedPillars(u).length
  };
}

function colosoDidConcreteWork(u,before){
  if(!before)return false;
  const enemyHp=colosoEnemies(u).reduce((n,e)=>n+e.hp,0);
  if(enemyHp<before.enemyHp)return true;
  if(u.hp>before.ownHp)return true;
  if(shieldTotal(u)>before.ownShield)return true;
  if(ownedPillars(u).length!==before.pillarCount){
    return colosoCombatZoneState(u).distance<=5;
  }
  return false;
}

aiTurn=async function(){
  if(!B||B.ended||cur()?.controller!=='ai')return;
  const u=cur();

  if(u?.championId!=='coloso'){
    return await _colosoTerritorialBaseAiTurn();
  }

  if(u.monolith){
    const influence=colosoMonolithInfluence(u);
    const idle=Math.max(0,u.aiMonolithIdleTurns||0);

    if(!influence.useful&&idle>=1){
      log(`🤖 ${u.name} abandona Monolito para reposicionarse hacia el frente.`);
      leaveMonolith(u,'La zona de combate se alejó.');
      u.aiMonolithIdleTurns=0;
      renderBattle();
      await sleep(160);
      return await _colosoTerritorialBaseAiTurn();
    }

    const before=colosoSnapshot(u);
    await _colosoTerritorialBaseAiTurn();

    if(B&&!B.ended&&u.alive){
      const afterInfluence=colosoMonolithInfluence(u);
      const worked=colosoDidConcreteWork(u,before);
      u.aiMonolithIdleTurns=(influence.useful||afterInfluence.useful||worked)?0:idle+1;
    }
    return;
  }

  u.aiMonolithIdleTurns=0;
  return await _colosoTerritorialBaseAiTurn();
};

})();
