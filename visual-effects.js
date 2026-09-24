(()=>{'use strict';

/*
  Liga de los Mundos v0.5.34
  Sistema general reutilizable de VFX — 🟡 EN PRUEBA

  PRINCIPIO:
  1) el motor resuelve la mecánica;
  2) esta capa observa el resultado;
  3) recién entonces reproduce feedback visual.

  Nunca decide daño, curación, escudo, estados, desplazamientos, PA, PM,
  alcance, IA ni condiciones de activación.
  No existe ni se implementa VFX de MISS/FALLO.
*/

const VFX_ROOT_ID='combat-vfx-root';
const VFX_MAX_NODES=72;
let VFX_CONTEXT=null;

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
  setTimeout(()=>el.remove(),Math.max(160,duration+180));
  return el;
}
function vfxGhost(subject){
  if(!subject||!Number.isFinite(subject.x)||!Number.isFinite(subject.y))return null;
  return {x:subject.x,y:subject.y,id:subject.id||null,type:subject.type||subject.kind||'generic',name:subject.name||''};
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
  if(!el)return null;
  try{
    const a=el.animate(keyframes,options);
    a.finished.catch(()=>{}).finally(()=>el.remove());
    return a;
  }catch(_){
    return null;
  }
}

/* ────────────────────────────────────────────
   PRIMITIVAS VISUALES
   ──────────────────────────────────────────── */

function vfxFloating(subject,text,type='damage'){
  const p=vfxPoint(subject);if(!p)return;
  const el=vfxPlace(vfxNode(`vfx-float vfx-${type}`,String(text),760),p,0,-28);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,0) scale(.78)',opacity:0},
    {transform:'translate(-50%,-7px) scale(1.08)',opacity:1,offset:.18},
    {transform:'translate(-50%,-27px) scale(1)',opacity:1,offset:.67},
    {transform:'translate(-50%,-44px) scale(.94)',opacity:0}
  ],{duration:700,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});
}
function vfxImpact(subject,variant='generic'){
  const p=vfxPoint(subject);if(!p)return;
  const el=vfxPlace(vfxNode(`vfx-impact vfx-${variant}`,'<i></i><i></i><i></i>',440),p,0,-8);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,-50%) scale(.22)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1.02)',opacity:1,offset:.30},
    {transform:'translate(-50%,-50%) scale(1.5)',opacity:0}
  ],{duration:400,easing:'ease-out',fill:'forwards'});
}
function vfxProjectile(from,to,variant='generic'){
  const a=vfxPoint(from),b=vfxPoint(to);if(!a||!b)return;
  const dx=b.x-a.x,dy=b.y-a.y;
  const el=vfxPlace(vfxNode(`vfx-projectile vfx-${variant}`,'',520),a,0,-10);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,-50%) scale(.7)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1)',opacity:1,offset:.12},
    {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(1)`,opacity:1,offset:.82},
    {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.45)`,opacity:0}
  ],{duration:300,easing:'cubic-bezier(.25,.75,.2,1)',fill:'forwards'});
}
function vfxShield(subject){
  const p=vfxPoint(subject);if(!p)return;
  const el=vfxPlace(vfxNode('vfx-shield','<span></span>',650),p,0,-8);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,-50%) scale(.52)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1)',opacity:1,offset:.3},
    {transform:'translate(-50%,-50%) scale(1.12)',opacity:.7,offset:.7},
    {transform:'translate(-50%,-50%) scale(1.24)',opacity:0}
  ],{duration:600,easing:'ease-out',fill:'forwards'});
}
function vfxShieldBreak(subject){
  const p=vfxPoint(subject);if(!p)return;
  const el=vfxPlace(vfxNode('vfx-shield-break','<i></i><i></i><i></i><i></i><i></i>',620),p,0,-8);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,-50%) scale(.7)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1)',opacity:1,offset:.22},
    {transform:'translate(-50%,-50%) scale(1.42)',opacity:0}
  ],{duration:540,easing:'ease-out',fill:'forwards'});
}
function vfxArea(cells,variant='generic'){
  if(!Array.isArray(cells))return;
  const unique=new Map();
  for(const c of cells){
    if(!c||!Number.isFinite(c.x)||!Number.isFinite(c.y)||!inside(c.x,c.y))continue;
    unique.set(`${c.x},${c.y}`,c);
  }
  let delay=0;
  for(const c of unique.values()){
    const p=vfxPoint(c);if(!p)continue;
    const el=vfxPlace(vfxNode(`vfx-area vfx-${variant}`,'',650),p);
    vfxSafeAnimate(el,[
      {transform:'translate(-50%,-50%) scale(.35)',opacity:0},
      {transform:'translate(-50%,-50%) scale(1)',opacity:.78,offset:.28},
      {transform:'translate(-50%,-50%) scale(1.38)',opacity:0}
    ],{duration:520,delay,easing:'ease-out',fill:'forwards'});
    delay=Math.min(72,delay+14);
  }
}
function vfxStatusApplied(subject,icon,label=''){
  const p=vfxPoint(subject);if(!p)return;
  const el=vfxPlace(vfxNode('vfx-status-applied',`<b>${icon||'✦'}</b>${label?`<small>${label}</small>`:''}`,760),p,18,-35);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,0) scale(.4)',opacity:0},
    {transform:'translate(-50%,-5px) scale(1.08)',opacity:1,offset:.25},
    {transform:'translate(-50%,-18px) scale(1)',opacity:1,offset:.68},
    {transform:'translate(-50%,-31px) scale(.9)',opacity:0}
  ],{duration:700,easing:'ease-out',fill:'forwards'});
}
function vfxStatusActivation(subject,icon,label=''){
  const p=vfxPoint(subject);if(!p)return;
  const el=vfxPlace(vfxNode('vfx-status-activation',`<b>${icon||'✦'}</b>${label?`<small>${label}</small>`:''}`,620),p,-18,-20);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,-50%) scale(.55)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1.15)',opacity:1,offset:.25},
    {transform:'translate(-50%,-50%) scale(.95)',opacity:.9,offset:.62},
    {transform:'translate(-50%,-50%) scale(1.35)',opacity:0}
  ],{duration:540,easing:'ease-out',fill:'forwards'});
}
function vfxForced(subject,source,away=true){
  const p=vfxPoint(subject),s=vfxPoint(source);if(!p||!s)return;
  let dx=p.x-s.x,dy=p.y-s.y;
  if(!away){dx=-dx;dy=-dy}
  const len=Math.hypot(dx,dy)||1;
  dx/=len;dy/=len;
  const angle=Math.atan2(dy,dx)*180/Math.PI;
  const el=vfxPlace(vfxNode('vfx-forced','<b>➜</b>',520),p,-dx*8,-dy*8);
  vfxSafeAnimate(el,[
    {transform:`translate(-50%,-50%) rotate(${angle}deg) translateX(-10px) scale(.7)`,opacity:0},
    {transform:`translate(-50%,-50%) rotate(${angle}deg) translateX(0) scale(1)`,opacity:1,offset:.30},
    {transform:`translate(-50%,-50%) rotate(${angle}deg) translateX(18px) scale(.9)`,opacity:0}
  ],{duration:440,easing:'ease-out',fill:'forwards'});
}
function vfxSpawn(subject,variant='generic'){
  const p=vfxPoint(subject);if(!p)return;
  const el=vfxPlace(vfxNode(`vfx-spawn vfx-${variant}`,'<i></i>',700),p);
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
    {transform:'translate(-50%,-50%) scale(.72)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1)',opacity:1,offset:.2},
    {transform:'translate(-50%,-50%) scale(1.58)',opacity:0}
  ],{duration:600,easing:'ease-out',fill:'forwards'});
}
function vfxTransfer(from,to,variant='generic'){
  const a=vfxPoint(from),b=vfxPoint(to);if(!a||!b)return;
  const dx=b.x-a.x,dy=b.y-a.y;
  const el=vfxPlace(vfxNode(`vfx-transfer vfx-${variant}`,'<i></i><i></i><i></i>',700),a);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,-50%) scale(.6)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1)',opacity:1,offset:.15},
    {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.9)`,opacity:1,offset:.78},
    {transform:`translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(.35)`,opacity:0}
  ],{duration:520,easing:'cubic-bezier(.25,.75,.2,1)',fill:'forwards'});
}
function vfxTrapActivation(subject,trapType='generic'){
  const p=vfxPoint(subject);if(!p)return;
  const icon=trapType==='mine'?'⚡':trapType==='spikes'?'✦':'◆';
  const el=vfxPlace(vfxNode(`vfx-trap-activation vfx-${trapType}`,`<b>${icon}</b><i></i>`,650),p,0,-2);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,-50%) scale(.3)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1.12)',opacity:1,offset:.24},
    {transform:'translate(-50%,-50%) scale(1.55)',opacity:0}
  ],{duration:560,easing:'ease-out',fill:'forwards'});
}
function vfxRelation(from,to,kind='mark',mode='apply'){
  const a=vfxPoint(from),b=vfxPoint(to);if(!a||!b)return;
  const dx=b.x-a.x,dy=b.y-a.y;
  const len=Math.hypot(dx,dy);
  const angle=Math.atan2(dy,dx)*180/Math.PI;
  const icon=kind==='link'?'🪡':'🎯';
  const el=vfxPlace(vfxNode(`vfx-relation vfx-${kind} vfx-${mode}`,`<span></span><b>${icon}</b>`,760),a);
  el.style.width=`${Math.max(18,len)}px`;
  el.style.transformOrigin='0 50%';
  el.style.setProperty('--vfx-relation-angle',`${angle}deg`);
  const badge=el.querySelector('b');
  if(badge){
    badge.style.left=`${Math.max(18,len)}px`;
  }
  vfxSafeAnimate(el,[
    {transform:`rotate(${angle}deg) scaleX(.15)`,opacity:0},
    {transform:`rotate(${angle}deg) scaleX(1)`,opacity:.95,offset:.3},
    {transform:`rotate(${angle}deg) scaleX(1)`,opacity:.75,offset:.62},
    {transform:`rotate(${angle}deg) scaleX(.85)`,opacity:0}
  ],{duration:650,easing:'ease-out',fill:'forwards'});
}
function vfxTransform(subject,variant='generic'){
  const p=vfxPoint(subject);if(!p)return;
  const el=vfxPlace(vfxNode(`vfx-transform vfx-${variant}`,'<i></i><span></span>',820),p,0,-6);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,-50%) scale(.45) rotate(0deg)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1) rotate(80deg)',opacity:1,offset:.34},
    {transform:'translate(-50%,-50%) scale(1.18) rotate(155deg)',opacity:.82,offset:.68},
    {transform:'translate(-50%,-50%) scale(1.42) rotate(220deg)',opacity:0}
  ],{duration:720,easing:'ease-out',fill:'forwards'});
}
function vfxActivationPulse(subject,variant='generic'){
  const p=vfxPoint(subject);if(!p)return;
  const el=vfxPlace(vfxNode(`vfx-activation-pulse vfx-${variant}`,'<i></i>',520),p,0,-7);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,-50%) scale(.55)',opacity:0},
    {transform:'translate(-50%,-50%) scale(.92)',opacity:.9,offset:.3},
    {transform:'translate(-50%,-50%) scale(1.28)',opacity:0}
  ],{duration:430,easing:'ease-out',fill:'forwards'});
}
function vfxKO(subject){
  const p=vfxPoint(subject);if(!p)return;
  const el=vfxPlace(vfxNode('vfx-ko','<b>KO</b><span>FUERA</span>',1020),p,0,-18);
  vfxSafeAnimate(el,[
    {transform:'translate(-50%,-50%) scale(.45)',opacity:0},
    {transform:'translate(-50%,-50%) scale(1.12)',opacity:1,offset:.22},
    {transform:'translate(-50%,-50%) scale(1)',opacity:1,offset:.72},
    {transform:'translate(-50%,-62%) scale(.9)',opacity:0}
  ],{duration:920,easing:'cubic-bezier(.2,.8,.2,1)',fill:'forwards'});
}

/* ────────────────────────────────────────────
   COLA DE PRESENTACIÓN
   Los eventos se recogen DESPUÉS de que las funciones mecánicas resolvieron.
   ──────────────────────────────────────────── */

function vfxEvent(type,data={}){
  return {type,...data};
}
function vfxPush(event){
  if(!event)return;
  if(VFX_CONTEXT)VFX_CONTEXT.events.push(event);
  else vfxPlay(event,0);
}
function vfxDelayFor(type){
  const map={
    activation:0,
    relation:45,
    transfer:55,
    projectile:60,
    area:60,
    trapActivation:55,
    transform:80,
    spawn:95,
    forced:85,
    impact:115,
    shieldBreak:125,
    float:145,
    statusActivation:80,
    statusApplied:165,
    vanish:150,
    ko:190
  };
  return map[type]??100;
}
function vfxPlay(event,extraDelay=0){
  if(!event)return;
  const delay=Math.max(0,(event.delay||0)+extraDelay);
  setTimeout(()=>{
    try{
      switch(event.type){
        case 'activation':vfxActivationPulse(event.subject,event.variant);break;
        case 'projectile':vfxProjectile(event.from,event.to,event.variant);break;
        case 'impact':vfxImpact(event.subject,event.variant);break;
        case 'float':vfxFloating(event.subject,event.text,event.variant);break;
        case 'shield':vfxShield(event.subject);break;
        case 'shieldBreak':vfxShieldBreak(event.subject);break;
        case 'area':vfxArea(event.cells,event.variant);break;
        case 'statusApplied':vfxStatusApplied(event.subject,event.icon,event.label);break;
        case 'statusActivation':vfxStatusActivation(event.subject,event.icon,event.label);break;
        case 'forced':vfxForced(event.subject,event.source,event.away);break;
        case 'spawn':vfxSpawn(event.subject,event.variant);break;
        case 'vanish':vfxVanish(event.subject,event.variant);break;
        case 'transfer':vfxTransfer(event.from,event.to,event.variant);break;
        case 'trapActivation':vfxTrapActivation(event.subject,event.trapType);break;
        case 'relation':vfxRelation(event.from,event.to,event.kind,event.mode);break;
        case 'transform':vfxTransform(event.subject,event.variant);break;
        case 'ko':vfxKO(event.subject);break;
      }
    }catch(_){}
  },delay);
}
function vfxFlush(events){
  for(const e of events||[])vfxPlay(e,vfxDelayFor(e.type));
}
function vfxStartCapture(meta={}){
  if(VFX_CONTEXT)return {owner:false,ctx:VFX_CONTEXT,start:VFX_CONTEXT.events.length};
  const ctx={events:[],meta};
  VFX_CONTEXT=ctx;
  return {owner:true,ctx,start:0};
}
function vfxEndCapture(cap){
  if(!cap?.owner)return;
  const ctx=cap.ctx;
  VFX_CONTEXT=null;
  vfxFlush(ctx.events);
}
function vfxInsertAt(cap,event){
  if(!cap?.ctx||!event)return;
  cap.ctx.events.splice(cap.start,0,event);
}

/* ────────────────────────────────────────────
   IDENTIDAD BASE
   ──────────────────────────────────────────── */

function vfxVariantForChampion(u){
  switch(u?.championId){
    case 'arfeli':return 'physical';
    case 'coloso':return 'stone';
    case 'piplus':return 'tech';
    case 'onod':return 'nature';
    case 'korgan':return 'tech';
    case 'houngan':return 'ritual';
    default:return 'generic';
  }
}
function vfxVariantForAbility(id,u){
  if(['bow','shot','daggers','spear','sword','hammer'].includes(id))return 'physical';
  if(['rock','quake','pillar','stonearmor','absorb','fusion'].includes(id))return 'stone';
  if(['thorn','spores','vines','awakening','germinate','sap'].includes(id))return 'nature';
  if(['marker','precise','vector','rupture','impulse','trap_bomb','trap_snare'].includes(id))return 'tech';
  if(['needle','curse','ritual','reflected','doll','transfer'].includes(id))return 'ritual';
  return vfxVariantForChampion(u);
}
function vfxProjectileAbility(id){
  return ['bow','rock','thorn','marker','precise','vector','shot','needle','curse'].includes(id);
}
function vfxAreaCellsForAbility(u,id,x,y){
  if(id==='spores'||id==='trap_bomb'){
    return [{x,y},{x:x+1,y},{x:x-1,y},{x,y:y+1},{x,y:y-1}];
  }
  if(id==='quake')return [{x,y}];
  if(id==='awakening'){
    const cells=[];
    for(const s of ownedSprouts(u)){
      cells.push(
        {x:s.x,y:s.y},
        {x:s.x+1,y:s.y},{x:s.x-1,y:s.y},
        {x:s.x,y:s.y+1},{x:s.x,y:s.y-1}
      );
    }
    return cells;
  }
  return null;
}

/* API pública reutilizable */
window.LigaVFX={
  damage:(subject,n)=>vfxFloating(subject,`-${n}`,'damage'),
  heal:(subject,n)=>vfxFloating(subject,`+${n}`,'heal'),
  impact:vfxImpact,
  projectile:vfxProjectile,
  shield:vfxShield,
  shieldBreak:vfxShieldBreak,
  area:vfxArea,
  statusApplied:vfxStatusApplied,
  statusActivation:vfxStatusActivation,
  forced:vfxForced,
  spawn:vfxSpawn,
  vanish:vfxVanish,
  transfer:vfxTransfer,
  trapActivation:vfxTrapActivation,
  relation:vfxRelation,
  transform:vfxTransform,
  activationPulse:vfxActivationPulse,
  ko:vfxKO
};

/* ────────────────────────────────────────────
   HOOKS MECÁNICOS — OBSERVAR RESULTADO, NO DECIDIRLO
   ──────────────────────────────────────────── */

// Feedback legacy se oculta por CSS para evitar duplicar números.
// No se modifica la función feedback.

// Daño + ruptura de escudo + KO.
const _vfxBaseApplyDamage=applyDamage;
applyDamage=function(e,n,ignoreShield=false,...rest){
  if(!e)return _vfxBaseApplyDamage(e,n,ignoreShield,...rest);

  const ghost=vfxGhost(e);
  const beforeHp=e.hp||0;
  const beforeAlive=!!e.alive;
  const beforeShield=shieldTotal(e);

  const result=_vfxBaseApplyDamage(e,n,ignoreShield,...rest);

  const afterShield=shieldTotal(e);
  const hpLost=Math.max(0,beforeHp-(e.hp||0));
  const shieldLost=Math.max(0,beforeShield-afterShield);

  if(hpLost>0){
    vfxPush(vfxEvent('impact',{subject:ghost,variant:'generic'}));
    vfxPush(vfxEvent('float',{subject:ghost,text:`-${hpLost}`,variant:'damage'}));
  }else if(shieldLost>0){
    vfxPush(vfxEvent('impact',{subject:ghost,variant:'shield'}));
    vfxPush(vfxEvent('float',{subject:ghost,text:`-${shieldLost}`,variant:'shield'}));
  }

  if(beforeShield>0&&afterShield<=0&&shieldLost>0){
    vfxPush(vfxEvent('shieldBreak',{subject:ghost}));
  }

  if(beforeAlive&&!e.alive){
    if(e.kind==='unit')vfxPush(vfxEvent('ko',{subject:ghost}));
    else vfxPush(vfxEvent('vanish',{subject:ghost,variant:e.type||'generic'}));
  }

  return result;
};

// Curación real.
const _vfxBaseHeal=heal;
heal=function(e,n){
  if(!e)return _vfxBaseHeal(e,n);
  const ghost=vfxGhost(e),before=e.hp||0;
  const result=_vfxBaseHeal(e,n);
  const gained=Math.max(0,(e.hp||0)-before);
  if(gained>0)vfxPush(vfxEvent('float',{subject:ghost,text:`+${gained}`,variant:'heal'}));
  return result;
};

// Escudo aplicado.
const _vfxBaseAddShield=addShield;
addShield=function(e,amount,label='Escudo'){
  const ghost=vfxGhost(e);
  const before=shieldTotal(e);
  const result=_vfxBaseAddShield(e,amount,label);
  if(e?.alive&&shieldTotal(e)>before)vfxPush(vfxEvent('shield',{subject:ghost}));
  return result;
};

// Estado aplicado.
if(typeof addWoundStatus==='function'){
  const _base=addWoundStatus;
  addWoundStatus=function(target,n=1){
    const ghost=vfxGhost(target),before=target?.status?.wound||0;
    const result=_base(target,n);
    if((target?.status?.wound||0)>before)vfxPush(vfxEvent('statusApplied',{subject:ghost,icon:'🩸',label:'Herida'}));
    return result;
  };
}
if(typeof addPoisonStatus==='function'){
  const _base=addPoisonStatus;
  addPoisonStatus=function(target,n=1){
    const ghost=vfxGhost(target),before=target?.status?.poison||0;
    const result=_base(target,n);
    if((target?.status?.poison||0)>before)vfxPush(vfxEvent('statusApplied',{subject:ghost,icon:'☠️',label:'Veneno'}));
    return result;
  };
}
if(typeof addBurnStatus==='function'){
  const _base=addBurnStatus;
  addBurnStatus=function(target,n=1){
    const ghost=vfxGhost(target),before=target?.status?.burn||0;
    const result=_base(target,n);
    if((target?.status?.burn||0)>before)vfxPush(vfxEvent('statusApplied',{subject:ghost,icon:'🔥',label:'Quemadura'}));
    return result;
  };
}

// Activación de Veneno al usar habilidad.
const _vfxBaseSpendPAAfterAction=spendPAAfterAction;
spendPAAfterAction=function(u){
  const poison=Math.max(0,u?.status?.poison||0);
  const cap=vfxStartCapture({type:'status-poison'});
  const result=_vfxBaseSpendPAAfterAction(u);
  if(poison>0)vfxInsertAt(cap,vfxEvent('statusActivation',{subject:vfxGhost(u),icon:'☠️',label:`Veneno ${poison}`}));
  vfxEndCapture(cap);
  return result;
};

// Activación de Herida al desplazarse.
if(typeof woundTravelStep==='function'){
  const _base=woundTravelStep;
  woundTravelStep=async function(target){
    const wound=Math.max(0,target?.status?.wound||0);
    const cap=vfxStartCapture({type:'status-wound'});
    const result=await _base(target);
    if(wound>0)vfxInsertAt(cap,vfxEvent('statusActivation',{subject:vfxGhost(target),icon:'🩸',label:`Herida ${wound}`}));
    vfxEndCapture(cap);
    return result;
  };
}

// Quemadura y penalizaciones al inicio del turno.
const _vfxBaseBeginTurn=beginTurn;
beginTurn=function(){
  const u=cur();
  const burn=Math.max(0,u?.status?.burn||0);
  const paPenalty=Math.max(0,u?.status?.paPenaltyNext||0);
  const pmPenalty=Math.max(0,u?.status?.pmPenaltyNext||0);

  const cap=vfxStartCapture({type:'turn-start'});
  const result=_vfxBaseBeginTurn();

  const prefix=[];
  if(burn>0)prefix.push(vfxEvent('statusActivation',{subject:vfxGhost(u),icon:'🔥',label:`Quemadura ${burn}`}));
  if(paPenalty>0)prefix.push(vfxEvent('statusActivation',{subject:vfxGhost(u),icon:'⚡',label:`-${paPenalty} PA`}));
  if(pmPenalty>0)prefix.push(vfxEvent('statusActivation',{subject:vfxGhost(u),icon:'🌿',label:`-${pmPenalty} PM`}));
  cap.ctx.events.splice(cap.start,0,...prefix);

  vfxEndCapture(cap);
  return result;
};

// Quemadura al final del turno.
const _vfxBaseEndTurnEffects=endTurnEffects;
endTurnEffects=function(u){
  const burn=Math.max(0,u?.status?.burn||0);
  const cap=vfxStartCapture({type:'turn-end'});
  const result=_vfxBaseEndTurnEffects(u);
  if(burn>0)vfxInsertAt(cap,vfxEvent('statusActivation',{subject:vfxGhost(u),icon:'🔥',label:`Quemadura ${burn}`}));
  vfxEndCapture(cap);
  return result;
};

// Movimiento forzado: el motor mueve; luego se muestra el feedback.
const _vfxBaseForcedMove=forcedMove;
forcedMove=async function(target,source,distance=1,away=true,label='Empuje'){
  const targetGhost=vfxGhost(target),sourceGhost=vfxGhost(source);
  const before=target?`${target.x},${target.y}`:'';
  const result=await _vfxBaseForcedMove(target,source,distance,away,label);
  const after=target?`${target.x},${target.y}`:'';
  if(target?.alive&&before!==after){
    vfxPush(vfxEvent('forced',{subject:targetGhost,source:sourceGhost,away}));
  }
  return result;
};

// Destrucción/retirada de piezas.
const _vfxBaseDestroyPillar=destroyPillar;
destroyPillar=function(p){
  const ghost=vfxGhost(p),wasAlive=!!p?.alive;
  const result=_vfxBaseDestroyPillar(p);
  if(wasAlive&&!p?.alive)vfxPush(vfxEvent('vanish',{subject:ghost,variant:p?.type||'generic'}));
  return result;
};

// Trampa: activación distinta de colocación.
const _vfxBaseTriggerTrapAt=triggerTrapAt;
triggerTrapAt=async function(target){
  const trap=(B?.traps||[]).find(t=>t.active&&t.side!==target?.side&&t.x===target?.x&&t.y===target?.y);
  const ghost=vfxGhost(trap);
  const type=trap?.trapType||'generic';

  if(!trap)return await _vfxBaseTriggerTrapAt(target);

  const cap=vfxStartCapture({type:'trap'});
  const result=await _vfxBaseTriggerTrapAt(target);

  if(!trap.active){
    vfxInsertAt(cap,vfxEvent('trapActivation',{subject:ghost,trapType:type}));
    cap.ctx.events.push(vfxEvent('vanish',{subject:ghost,variant:'trap'}));
  }

  vfxEndCapture(cap);
  return result;
};

/* Habilidad:
   - resolvemos primero;
   - durante esa resolución se capturan daño/curación/estado/etc.;
   - al terminar, añadimos la capa de lectura visual y liberamos la cola.
*/
const _vfxBaseExecuteAbility=executeAbility;
executeAbility=async function(u,id,x,y,fromAI=false){
  const actorGhost=vfxGhost(u);
  const targetBefore=entityAt(x,y);
  const targetGhost=vfxGhost(targetBefore);
  const variant=vfxVariantForAbility(id,u);
  const areaCells=vfxAreaCellsForAbility(u,id,x,y);

  const markedBefore=targetBefore?.status?.markedBy===u?.id;
  const linkedBefore=targetBefore?.status?.linkedBy===u?.id;
  const monolithBefore=!!u?.monolith;

  const beforeObjects=new Set((B?.pillars||[]).filter(z=>z.alive).map(z=>z.id));
  const beforeTraps=new Set((B?.traps||[]).filter(t=>t.active).map(t=>t.id));

  const cap=vfxStartCapture({type:'ability',id});
  let result;
  try{
    result=await _vfxBaseExecuteAbility(u,id,x,y,fromAI);
  }catch(err){
    vfxEndCapture(cap);
    throw err;
  }

  if(result){
    const intro=[];

    // Quién ejecuta la acción.
    intro.push(vfxEvent('activation',{subject:actorGhost,variant}));

    // Proyectil genérico sólo si existía objetivo real.
    if(vfxProjectileAbility(id)&&targetGhost){
      intro.push(vfxEvent('projectile',{from:actorGhost,to:targetGhost,variant}));
    }

    // Área.
    if(areaCells?.length){
      intro.push(vfxEvent('area',{cells:areaCells,variant}));
    }

    // Relaciones especiales.
    if(id==='marker'&&targetGhost){
      intro.push(vfxEvent('relation',{from:actorGhost,to:targetGhost,kind:'mark',mode:'apply'}));
    }
    if(id==='needle'&&targetGhost){
      intro.push(vfxEvent('relation',{from:actorGhost,to:targetGhost,kind:'link',mode:'apply'}));
    }
    if(markedBefore&&['precise','vector','rupture'].includes(id)&&targetGhost){
      intro.push(vfxEvent('relation',{from:actorGhost,to:targetGhost,kind:'mark',mode:'use'}));
    }
    if(linkedBefore&&['ritual'].includes(id)&&targetGhost){
      intro.push(vfxEvent('relation',{from:actorGhost,to:targetGhost,kind:'link',mode:'use'}));
    }

    // Consumo / transferencia.
    if((id==='absorb'||id==='fusion')&&targetGhost){
      intro.push(vfxEvent('transfer',{from:targetGhost,to:actorGhost,variant:'stone'}));
    }
    if(id==='transfer'&&targetGhost){
      intro.push(vfxEvent('transfer',{from:targetGhost,to:actorGhost,variant:'ritual'}));
    }

    // Transformación Coloso → Monolito.
    if(id==='fusion'&&!monolithBefore&&u?.monolith){
      intro.push(vfxEvent('transform',{subject:vfxGhost(u),variant:'stone'}));
    }

    // Estados que se aplican sin pasar por addWound/addPoison.
    if(targetBefore?.alive){
      if(id==='hammer')cap.ctx.events.push(vfxEvent('statusApplied',{subject:targetGhost,icon:'⚡',label:'-1 PA'}));
      if(id==='vines')cap.ctx.events.push(vfxEvent('statusApplied',{subject:targetGhost,icon:'🌿',label:'-2 PM'}));
      if(id==='marker')cap.ctx.events.push(vfxEvent('statusApplied',{subject:targetGhost,icon:'🎯',label:'Marca'}));
      if(id==='needle')cap.ctx.events.push(vfxEvent('statusApplied',{subject:targetGhost,icon:'🪡',label:'Vínculo'}));
    }

    // Aparición de nuevas piezas / trampas.
    for(const z of (B?.pillars||[])){
      if(z.alive&&!beforeObjects.has(z.id)){
        cap.ctx.events.push(vfxEvent('spawn',{subject:vfxGhost(z),variant:z.type||variant}));
        if(z.type==='doll'&&z.linkedTargetId){
          const linked=getEntity(z.linkedTargetId);
          if(linked)cap.ctx.events.push(vfxEvent('relation',{from:vfxGhost(z),to:vfxGhost(linked),kind:'link',mode:'use'}));
        }
      }
    }
    for(const t of (B?.traps||[])){
      if(t.active&&!beforeTraps.has(t.id)){
        cap.ctx.events.push(vfxEvent('spawn',{subject:vfxGhost(t),variant:'trap'}));
      }
    }

    cap.ctx.events.splice(cap.start,0,...intro);
  }

  vfxEndCapture(cap);
  return result;
};

// Salir de Monolito también usa transición general.
if(typeof leaveMonolith==='function'){
  const _base=leaveMonolith;
  leaveMonolith=function(u,reason=''){
    const was=!!u?.monolith;
    const result=_base(u,reason);
    if(was&&!u?.monolith)vfxPush(vfxEvent('transform',{subject:vfxGhost(u),variant:'stone'}));
    return result;
  };
}

// Consumo especial de Pilar en Monolito (+1 PA).
if(typeof consumePillarForPA==='function'){
  const _base=consumePillarForPA;
  consumePillarForPA=function(x,y){
    const u=cur(),p=pillarAt(x,y);
    const from=vfxGhost(p),to=vfxGhost(u);
    const cap=vfxStartCapture({type:'consume-pillar'});
    const result=_base(x,y);
    if(p&&!p.alive&&from&&to)vfxInsertAt(cap,vfxEvent('transfer',{from,to,variant:'stone'}));
    vfxEndCapture(cap);
    return result;
  };
}

})();