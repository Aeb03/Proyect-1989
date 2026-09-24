(()=>{'use strict';

/*
  Liga de los Mundos v0.5.32
  Corrección IA — aproximación / anti-estancamiento
  🟡 EN PRUEBA

  Esta capa NO reemplaza la IA táctica v0.5.31.
  La envuelve solamente cuando la IA iba a terminar el turno sin haber
  realizado ninguna acción ni movimiento útil.

  Regla:
  si no hubo ataque, curación, preparación, construcción ni otra acción
  concreta, antes de pasar turno se busca una aproximación razonable.
*/

const _approachBaseAiTurn=aiTurn;
const _approachBaseNextTurn=nextTurn;

function aiApproachBand(u){
  switch(u.championId){
    case 'arfeli': return {min:1,max:2};
    case 'coloso': return {min:2,max:3};
    case 'piplus': return {min:3,max:4};
    case 'onod': return {min:3,max:4};
    case 'korgan': return {min:3,max:4};
    case 'houngan': return {min:3,max:4};
    default: return {min:2,max:3};
  }
}

function aiApproachWoundCost(u,steps){
  return Math.min(3,Math.max(0,u.status?.wound||0))*Math.max(0,steps);
}

function aiApproachKnownFriendlyTrap(u,x,y){
  // IMPORTANTE: jamás consultar trampas del rival.
  return (B?.traps||[]).some(t=>t.active&&t.side===u.side&&t.x===x&&t.y===y);
}

function aiApproachExposure(u,pos){
  let score=0;
  for(const enemy of enemyUnits(u,true)){
    const d=md(pos,enemy);
    if(d===1)score+=1;
    else if(d===2)score+=.35;
  }
  return score;
}

function aiApproachHasUsefulLOS(u,pos,focus){
  if(!focus?.alive)return false;
  const ox=u.x,oy=u.y;
  u.x=pos.x;u.y=pos.y;
  try{
    const distance=md(u,focus);
    const ids=u.loadout||[];

    const rangedIds={
      arfeli:['bow','spear'],
      coloso:['rock'],
      piplus:['marker','precise','vector','rupture'],
      onod:['thorn','vines','spores'],
      korgan:['shot','hook','trap_bomb'],
      houngan:['needle','curse','ritual']
    }[u.championId]||[];

    return ids.some(id=>{
      if(!rangedIds.includes(id))return false;
      const a=ability(u.championId,id);
      if(!a)return false;
      if(distance>a.range)return false;
      if(id==='shot'&&!(u.x===focus.x||u.y===focus.y))return false;
      return a.noLOS||clearLOS(u,focus);
    });
  }finally{
    u.x=ox;u.y=oy;
  }
}

function aiApproachCandidateScore(u,focus,x,y,cost){
  if(!focus?.alive||cost<=0)return -1e9;

  const pos={x,y};
  const currentDist=md(u,focus);
  const newDist=md(pos,focus);
  const band=aiApproachBand(u);

  const currentGap=Math.max(0,currentDist-band.max);
  const newGap=Math.max(0,newDist-band.max);
  const gapClosed=currentGap-newGap;
  const rawGain=currentDist-newDist;

  // Un movimiento que no aproxima ni mejora LoS no rompe el estancamiento.
  const gainsLOS=aiApproachHasUsefulLOS(u,pos,focus);
  if(gapClosed<=0&&rawGain<=0&&!gainsLOS)return -1e9;

  let score=4; // aproximarse tiene valor táctico propio

  // Principal incentivo anti-estancamiento.
  score+=gapClosed*5;
  score+=Math.max(0,rawGain)*1.25;

  // Llegar a la banda natural del Campeón vale mucho.
  if(newDist>=band.min&&newDist<=band.max)score+=8;

  // Campeones de rango no deben sobre-avanzar hasta cuerpo a cuerpo.
  if(newDist<band.min){
    const over=band.min-newDist;
    score-=over*(u.championId==='arfeli'||u.championId==='coloso'?2:7);
  }

  // LoS útil para el próximo ataque.
  if(gainsLOS)score+=6;

  // Preferir el movimiento mínimo cuando dos destinos cumplen algo similar.
  score-=cost*.85;

  // Herida se calcula exactamente por casilla recorrida.
  score-=aiApproachWoundCost(u,cost)*1.8;

  // Exposición visible. Arfeli/Coloso toleran más cercanía.
  const exposure=aiApproachExposure(u,pos);
  if(u.championId==='arfeli'||u.championId==='coloso')score-=exposure*1.5;
  else score-=exposure*5;

  // No ocupar gratuitamente una trampa propia/aliada preparada.
  if(aiApproachKnownFriendlyTrap(u,x,y))score-=5;

  return score;
}

function aiPickApproachPlan(u,focus){
  if(!u?.alive||u.pm<=0||!focus?.alive)return null;

  const reach=movementMap(u);
  const candidates=[];

  for(const [k,cost] of reach){
    if(cost<=0)continue;
    const [x,y]=k.split(',').map(Number);
    const score=aiApproachCandidateScore(u,focus,x,y,cost);
    if(score>1){
      candidates.push({x,y,cost,score});
    }
  }

  if(!candidates.length)return null;
  candidates.sort((a,b)=>b.score-a.score);

  const best=candidates[0].score;
  const band=Math.max(3,Math.abs(best)*.07);
  const near=candidates.filter(c=>c.score>=best-band).slice(0,3);

  // Imperfección controlada entre posiciones casi equivalentes.
  if(near.length===1)return near[0];

  const weights=near.map(c=>Math.max(.25,1-(best-c.score)/(band+1)));
  const total=weights.reduce((a,b)=>a+b,0);
  let r=Math.random()*total;

  for(let i=0;i<near.length;i++){
    r-=weights[i];
    if(r<=0)return near[i];
  }
  return near[0];
}

function aiTurnSnapshot(u){
  return {
    x:u.x,y:u.y,pa:u.pa,pm:u.pm,hp:u.hp,
    objects:(B?.pillars||[]).filter(z=>z.alive).length,
    traps:(B?.traps||[]).filter(t=>t.active).length,
    enemyHp:enemyUnits(u,true).reduce((n,z)=>n+z.hp,0),
    allyHp:teamUnits(u,true).reduce((n,z)=>n+z.hp,0)
  };
}

function aiMeaningfulTurnChange(u,before){
  if(!u||!before)return true;
  return (
    u.x!==before.x||
    u.y!==before.y||
    u.pa!==before.pa||
    u.pm!==before.pm||
    u.hp!==before.hp||
    (B?.pillars||[]).filter(z=>z.alive).length!==before.objects||
    (B?.traps||[]).filter(t=>t.active).length!==before.traps||
    enemyUnits(u,true).reduce((n,z)=>n+z.hp,0)!==before.enemyHp||
    teamUnits(u,true).reduce((n,z)=>n+z.hp,0)!==before.allyHp
  );
}

aiTurn=async function(){
  if(!B||B.ended||cur().controller!=='ai'||B.busy)return;

  const u=cur();
  const before=aiTurnSnapshot(u);

  /*
    Interceptamos el final del turno de la IA base.
    Así podemos comprobar si realmente iba a pasar sin hacer nada.
  */
  let requestedNext=false;
  nextTurn=()=>{requestedNext=true};

  try{
    await _approachBaseAiTurn();

    // La IA base agenda nextTurn a 300 ms.
    // Esperamos a que esa solicitud llegue al interceptor.
    await sleep(340);

    if(B.ended||!u.alive||cur()?.id!==u.id)return;

    const didSomething=aiMeaningfulTurnChange(u,before);

    if(!didSomething){
      const focus=enemyUnits(u,true).find(z=>z.id===u.aiFocusTargetId)||
                  enemyUnits(u,true).sort((a,b)=>md(u,a)-md(u,b))[0];

      const plan=aiPickApproachPlan(u,focus);

      if(plan){
        log(`🤖 ${u.name} realiza movimiento de aproximación.`);
        await moveUnit(u,plan.x,plan.y);
        await sleep(160);

        /*
          Tras aproximarse, permitir una reevaluación normal:
          puede atacar/preparar si ahora apareció una oportunidad.
        */
        if(!B.ended&&u.alive&&cur()?.id===u.id&&u.pa>0){
          requestedNext=false;
          await _approachBaseAiTurn();
          await sleep(340);
        }
      }
    }
  }finally{
    nextTurn=_approachBaseNextTurn;
  }

  if(!B.ended&&u.alive&&cur()?.id===u.id){
    setTimeout(_approachBaseNextTurn,220);
  }
};

})();