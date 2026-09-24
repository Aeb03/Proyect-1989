(()=>{'use strict';

/*
  Liga de los Mundos v0.5.33
  Sistema general reutilizable de VFX — 🟡 EN PRUEBA

  Regla absoluta:
  VFX = presentación.
  Nunca decide daño, curación, estados, movimiento, PA, PM, alcance ni IA.
*/

const VFX_ROOT_ID='combat-vfx-root';
const VFX_MAX_NODES=60;

function vfxRoot(){
  let root=document.getElementById(VFX_ROOT_ID);
  if(root)return root;
  root=document.createElement('div');
  root.id=VFX_ROOT_ID;
  root.setAttribute('aria-hidden','true');
  document.body.appendChild(root);
  return root;
}

function vfxTrim(root){
  while(root.children.length>=VFX_MAX_NODES)root.firstElementChild?.remove();
}

function vfxNode(className,html='',duration=700){
  const root=vfxRoot();
  vfxTrim(root);
  const el=document.createElement('div');
  el.className=`combat-vfx ${className}`;
  if(html)el.innerHTML=html;
  root.appendChild(el);
  const remove=()=>el.remove();
  setTimeout(remove,Math.max(120,duration+120));
  return el;
}

function vfxPoint(subject){
  if(!subject)return null;
  const layer=document.querySelector('.battle-grid.iso-grid .iso-entities');
  if(!layer)return null;
  const r=layer.getBoundingClientRect();
  if(!r.width||!r.height)return null;

  const x=Number.isFinite(subject.x)?subject.x:null;
  const y=Number.isFinite(subject.y)?subject.y:null;
  if(x==null||y==null)return null;

  const c=isoCenter(x,y);
  return {
    x:r.left+(c.x/ISO_WORLD_W)*r.width,
    y:r.top +(c.y/ISO_WORLD_H)*r.height
  };
}

function vfxPlace(el,p,ox=0,oy=0){
  if(!el||!p)return el;
  el.style.left=`${Math.round(p.x+ox)}px`;
  el.style.top=`${Math.round(p.y+oy)}px`;
  return el;
}

function vfxSafeAnimate(el,keyframes,options){
  try{
    const a=el.animate(keyframes,options);
    a.finished.catch(()=>{}).finally(()=>el.remove());
    return a;
  }catch(_){
    return null;
  }
}

function vfxFloating(subject,text,type='damage'){
  const p=vfxPoint(subject);if(!p)return;
  const el=vfxPlace(vfxNode(`vfx-float vfx-${type}`,String(text),760),p,0,-26);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,0) scale(.82)',opacity:0},
    {transform:'translate(-50%,-6px) scale(1.08)',opacity:1,offset:.18},
    {transform:'translate(-50%,-26px) scale(1)',opacity:1,offset:.68},
    {transform:'translate(-50%,-42px) scale(.96)',opacity:0}
  ],{duration:720,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});
}

function vfxImpact(subject,variant='physical'){
  const p=vfxPoint(subject);if(!p)return;
  const el=vfxPlace(vfxNode(`vfx-impact vfx-${variant}`,'<i></i><i></i><i></i>',430),p,0,-8);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,-50%) scale(.25)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1.05)',opacity:1,offset:.32},
    {transform:'translate(-50%,-50%) scale(1.45)',opacity:0}
  ],{duration:390,easing:'ease-out',fill:'forwards'});
}

function vfxProjectile(from,to,variant='generic'){
  const a=vfxPoint(from),b=vfxPoint(to);if(!a||!b)return;
  const dx=b.x-a.x,dy=b.y-a.y;
  const el=vfxPlace(vfxNode(`vfx-projectile vfx-${variant}`,'',520),a,0,-10);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,-50%) scale(.75)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1)',opacity:1,offset:.12},
    {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(1)`,opacity:1,offset:.82},
    {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.5)`,opacity:0}
  ],{duration:300,easing:'cubic-bezier(.25,.75,.2,1)',fill:'forwards'});
}

function vfxShield(subject){
  const p=vfxPoint(subject);if(!p)return;
  const el=vfxPlace(vfxNode('vfx-shield','<span></span>',640),p,0,-8);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,-50%) scale(.55)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1)',opacity:1,offset:.32},
    {transform:'translate(-50%,-50%) scale(1.12)',opacity:.72,offset:.7},
    {transform:'translate(-50%,-50%) scale(1.22)',opacity:0}
  ],{duration:600,easing:'ease-out',fill:'forwards'});
}

function vfxArea(cells,variant='generic'){
  if(!Array.isArray(cells))return;
  const unique=new Map();
  for(const c of cells||[]){
    if(!c||!Number.isFinite(c.x)||!Number.isFinite(c.y)||!inside(c.x,c.y))continue;
    unique.set(`${c.x},${c.y}`,c);
  }
  let delay=0;
  for(const c of unique.values()){
    const p=vfxPoint(c);if(!p)continue;
    const el=vfxPlace(vfxNode(`vfx-area vfx-${variant}`,'',650),p,0,0);
    vfxSafeAnimate(el,[
      {transform:'translate(-50%,-50%) scale(.35)',opacity:0},
      {transform:'translate(-50%,-50%) scale(1)',opacity:.8,offset:.28},
      {transform:'translate(-50%,-50%) scale(1.35)',opacity:0}
    ],{duration:520,delay,easing:'ease-out',fill:'forwards'});
    delay=Math.min(90,delay+18);
  }
}

function vfxStatus(subject,icon,label=''){
  const p=vfxPoint(subject);if(!p)return;
  const safe=`<b>${icon||'✦'}</b>${label?`<small>${label}</small>`:''}`;
  const el=vfxPlace(vfxNode('vfx-status',safe,760),p,18,-34);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,0) scale(.4)',opacity:0},
    {transform:'translate(-50%,-5px) scale(1.08)',opacity:1,offset:.26},
    {transform:'translate(-50%,-18px) scale(1)',opacity:1,offset:.68},
    {transform:'translate(-50%,-30px) scale(.9)',opacity:0}
  ],{duration:700,easing:'ease-out',fill:'forwards'});
}

function vfxSpawn(subject,variant='generic'){
  const p=vfxPoint(subject);if(!p)return;
  const el=vfxPlace(vfxNode(`vfx-spawn vfx-${variant}`,'<i></i>',700),p,0,0);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,-50%) scale(.2)',opacity:0},
    {transform:'translate(-50%,-50%) scale(.9)',opacity:1,offset:.28},
    {transform:'translate(-50%,-50%) scale(1.35)',opacity:.7,offset:.62},
    {transform:'translate(-50%,-50%) scale(1.7)',opacity:0}
  ],{duration:620,easing:'ease-out',fill:'forwards'});
}

function vfxVanish(subject,variant='generic'){
  const p=vfxPoint(subject);if(!p)return;
  const el=vfxPlace(vfxNode(`vfx-vanish vfx-${variant}`,'<i></i><i></i><i></i><i></i>',720),p,0,-4);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,-50%) scale(.7)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1)',opacity:1,offset:.2},
    {transform:'translate(-50%,-50%) scale(1.55)',opacity:0}
  ],{duration:600,easing:'ease-out',fill:'forwards'});
}

function vfxKO(subject){
  const p=vfxPoint(subject);if(!p)return;
  const el=vfxPlace(vfxNode('vfx-ko','<b>KO</b>',980),p,0,-18);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,-50%) scale(.45)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1.12)',opacity:1,offset:.24},
    {transform:'translate(-50%,-50%) scale(1)',opacity:1,offset:.7},
    {transform:'translate(-50%,-62%) scale(.9)',opacity:0}
  ],{duration:900,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});
}

function vfxForced(subject,source,away=true){
  const p=vfxPoint(subject),s=vfxPoint(source);if(!p||!s)return;
  let dx=p.x-s.x,dy=p.y-s.y;
  if(!away){dx=-dx;dy=-dy}
  const len=Math.hypot(dx,dy)||1;
  dx/=len;dy/=len;
  const angle=Math.atan2(dy,dx)*180/Math.PI;

  const el=vfxPlace(vfxNode('vfx-forced','<b>➜</b>',520),p,-dx*8,-dy*8);
  el.style.setProperty('--vfx-angle',`${angle}deg`);
  vfxSafeAnimate(el,[
    {transform:`translate(-50%,-50%) rotate(${angle}deg) translateX(-10px) scale(.7)`,opacity:0},
    {transform:`translate(-50%,-50%) rotate(${angle}deg) translateX(0) scale(1)`,opacity:1,offset:.3},
    {transform:`translate(-50%,-50%) rotate(${angle}deg) translateX(18px) scale(.9)`,opacity:0}
  ],{duration:440,easing:'ease-out',fill:'forwards'});
}

function vfxVariantForAbility(id){
  if(['bow','shot','daggers','spear'].includes(id))return 'physical';
  if(['rock','quake'].includes(id))return 'stone';
  if(['thorn','spores','vines','awakening'].includes(id))return 'nature';
  if(['marker','precise','vector','rupture','trap_bomb'].includes(id))return 'tech';
  if(['needle','curse','ritual','reflected'].includes(id))return 'ritual';
  return 'generic';
}

function vfxProjectileAbility(id){
  return ['bow','rock','thorn','marker','precise','vector','shot','needle','curse'].includes(id);
}

function vfxAreaCellsForAbility(u,id,x,y){
  if(id==='spores'||id==='trap_bomb'){
    return [{x,y},{x:x+1,y},{x:x-1,y},{x,y:y+1},{x,y:y-1}];
  }
  if(id==='quake'){
    return [{x,y}];
  }
  if(id==='awakening'){
    const cells=[];
    for(const s of ownedSprouts(u)){
      cells.push({x:s.x,y:s.y},{x:s.x+1,y:s.y},{x:s.x-1,y:s.y},{x:s.x,y:s.y+1},{x:s.x,y:s.y-1});
    }
    return cells;
  }
  return null;
}

// API pública reutilizable para futuros estilos de Campeón.
window.LigaVFX={
  damage:(subject,n)=>vfxFloating(subject,`-${n}`,'damage'),
  heal:(subject,n)=>vfxFloating(subject,`+${n}`,'heal'),
  impact:vfxImpact,
  projectile:vfxProjectile,
  shield:vfxShield,
  area:vfxArea,
  status:vfxStatus,
  spawn:vfxSpawn,
  vanish:vfxVanish,
  ko:vfxKO,
  forced:vfxForced
};

// ─────────────────────────────────────────────
// CONEXIÓN NO BLOQUEANTE CON EL MOTOR ACTUAL
// ─────────────────────────────────────────────

// Ocultamos sólo el feedback flotante viejo dentro de la miniatura.
// El dato mecánico y el HUD permanecen intactos.
const _vfxBaseFeedback=feedback;
feedback=function(e,text,type='damage'){
  _vfxBaseFeedback(e,text,type);
  if(type==='status')vfxStatus(e,'✦',String(text).replace(/<[^>]*>/g,''));
  else if(type==='pa')vfxStatus(e,'⚡',String(text));
};

// Daño e impacto.
const _vfxBaseApplyDamage=applyDamage;
applyDamage=function(e,n,ignoreShield=false,...rest){
  if(!e||!e.alive)return _vfxBaseApplyDamage(e,n,ignoreShield,...rest);

  const beforeHp=e.hp;
  const beforeAlive=e.alive;
  const beforeShield=shieldTotal(e);

  const result=_vfxBaseApplyDamage(e,n,ignoreShield,...rest);

  const hpLost=Math.max(0,beforeHp-(e.hp||0));
  const shieldLost=Math.max(0,beforeShield-shieldTotal(e));

  if(hpLost>0){
    vfxImpact(e,'generic');
    vfxFloating(e,`-${hpLost}`,'damage');
  }else if(shieldLost>0){
    vfxImpact(e,'shield');
    vfxFloating(e,`-${shieldLost}`,'shield');
  }

  if(beforeAlive&&!e.alive){
    if(e.kind==='unit')vfxKO(e);
    else vfxVanish(e,e.type||'generic');
  }

  return result;
};

// Curación flotante.
const _vfxBaseHeal=heal;
heal=function(e,n){
  if(!e)return _vfxBaseHeal(e,n);
  const before=e.hp;
  const result=_vfxBaseHeal(e,n);
  const gained=Math.max(0,e.hp-before);
  if(gained>0)vfxFloating(e,`+${gained}`,'heal');
  return result;
};

// Escudo.
const _vfxBaseAddShield=addShield;
addShield=function(e,amount,label='Escudo'){
  const result=_vfxBaseAddShield(e,amount,label);
  if(e?.alive)vfxShield(e);
  return result;
};

// Estados globales aprobados.
if(typeof addWoundStatus==='function'){
  const _base=addWoundStatus;
  addWoundStatus=function(target,n=1){
    const before=target?.status?.wound||0;
    const r=_base(target,n);
    if((target?.status?.wound||0)>before)vfxStatus(target,'🩸','Herida');
    return r;
  };
}
if(typeof addPoisonStatus==='function'){
  const _base=addPoisonStatus;
  addPoisonStatus=function(target,n=1){
    const before=target?.status?.poison||0;
    const r=_base(target,n);
    if((target?.status?.poison||0)>before)vfxStatus(target,'☠️','Veneno');
    return r;
  };
}
if(typeof addBurnStatus==='function'){
  const _base=addBurnStatus;
  addBurnStatus=function(target,n=1){
    const before=target?.status?.burn||0;
    const r=_base(target,n);
    if((target?.status?.burn||0)>before)vfxStatus(target,'🔥','Quemadura');
    return r;
  };
}

// Empuje / atracción: sólo feedback; el movimiento sigue siendo del motor.
const _vfxBaseForcedMove=forcedMove;
forcedMove=async function(target,source,distance=1,away=true,label='Empuje'){
  if(target?.alive&&source)vfxForced(target,source,away);
  return await _vfxBaseForcedMove(target,source,distance,away,label);
};

// Aparición/desaparición genérica de piezas.
const _vfxBaseDestroyPillar=destroyPillar;
destroyPillar=function(p){
  if(p?.alive)vfxVanish(p,p.type||'generic');
  return _vfxBaseDestroyPillar(p);
};

const _vfxBaseTriggerTrapAt=triggerTrapAt;
triggerTrapAt=async function(target){
  const trap=(B?.traps||[]).find(t=>t.active&&t.side!==target?.side&&t.x===target?.x&&t.y===target?.y);
  const ghost=trap?{x:trap.x,y:trap.y,type:trap.trapType}:null;
  const r=await _vfxBaseTriggerTrapAt(target);
  if(ghost&&trap&&!trap.active)vfxVanish(ghost,'trap');
  return r;
};

// Habilidades: proyectil / área / aparición.
// Todo se dispara alrededor de executeAbility; nunca cambia su resultado.
const _vfxBaseExecuteAbility=executeAbility;
executeAbility=async function(u,id,x,y,fromAI=false){
  const targetBefore=entityAt(x,y);
  const variant=vfxVariantForAbility(id);

  const beforeObjects=new Set((B?.pillars||[]).filter(z=>z.alive).map(z=>z.id));
  const beforeTraps=new Set((B?.traps||[]).filter(t=>t.active).map(t=>t.id));

  if(vfxProjectileAbility(id)&&u&&targetBefore){
    vfxProjectile(u,targetBefore,variant);
  }

  const areaCells=vfxAreaCellsForAbility(u,id,x,y);
  if(areaCells?.length)vfxArea(areaCells,variant);

  const r=await _vfxBaseExecuteAbility(u,id,x,y,fromAI);

  // Estados no canalizados por addWound/addPoison.
  const targetAfter=targetBefore;
  if(r&&targetAfter?.alive){
    if(id==='hammer')vfxStatus(targetAfter,'⚡','-1 PA');
    if(id==='vines')vfxStatus(targetAfter,'🌿','-2 PM');
    if(id==='marker')vfxStatus(targetAfter,'🎯','Marca');
    if(id==='needle')vfxStatus(targetAfter,'🪡','Vínculo');
  }

  for(const z of (B?.pillars||[])){
    if(z.alive&&!beforeObjects.has(z.id))vfxSpawn(z,z.type||'generic');
  }
  for(const t of (B?.traps||[])){
    if(t.active&&!beforeTraps.has(t.id))vfxSpawn(t,'trap');
  }

  return r;
};

})();