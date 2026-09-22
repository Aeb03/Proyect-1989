(()=>{
'use strict';

const CHAMPION_ART={
  arfeli:{
    name:'Arfeli',
    avatar:'./assets/champions/arfeli/arfeli-avatar.png',
    select:'./assets/champions/arfeli/arfeli-select.png'
  },
  coloso:{
    name:'Coloso',
    avatar:'./assets/champions/coloso/coloso-avatar.png',
    select:'./assets/champions/coloso/coloso-select.png'
  },
  piplus:{
    name:'Piplus',
    avatar:'./assets/champions/piplus/piplus-avatar.png',
    select:'./assets/champions/piplus/piplus-select.png'
  }
};

const ARFELI_COMBAT_VIEWS={
  'down-right':'./assets/champions/arfeli/arfeli-combat-down-right.png',
  'down-left':'./assets/champions/arfeli/arfeli-combat-down-left.png',
  'up-right':'./assets/champions/arfeli/arfeli-combat-up-right.png',
  'up-left':'./assets/champions/arfeli/arfeli-combat-up-left.png'
};

for(const art of Object.values(CHAMPION_ART)){
  for(const src of [art.avatar,art.select]){
    const img=new Image();img.src=src;if(img.decode)img.decode().catch(()=>{});
  }
}
for(const src of Object.values(ARFELI_COMBAT_VIEWS)){
  const img=new Image();img.src=src;if(img.decode)img.decode().catch(()=>{});
}

function setImage(host,src,cls,alt='',hostClass='champion-image-host'){
  if(!host)return;
  const current=host.querySelector(`img.${cls}`);
  if(current){if(current.src!==new URL(src,location.href).href)current.src=src;return}
  host.textContent='';
  host.classList.add(hostClass);
  const img=document.createElement('img');
  img.src=src;img.alt=alt;img.className=cls;img.draggable=false;
  host.appendChild(img);
}
function sameName(el,name){return el?.textContent?.trim()===name}
function championByText(text=''){
  return Object.entries(CHAMPION_ART).find(([,a])=>new RegExp(`^${a.name}(?:\\s|$|·)`,'i').test(text.trim()))?.[0]||null;
}

function decorateChampionScreens(){
  for(const [id,art] of Object.entries(CHAMPION_ART)){
    document.querySelectorAll(`[data-champ="${id}"] .champ-icon`)
      .forEach(x=>setImage(x,art.select,'champion-select-img',art.name,'champion-select-host'));
    document.querySelectorAll(`[data-collection-champ="${id}"] .champ-icon`)
      .forEach(x=>setImage(x,art.select,'champion-select-img',art.name,'champion-collection-select-host'));
  }
  document.querySelectorAll('.champion-detail').forEach(card=>{
    const name=card.querySelector('.champion-detail-head h3')?.textContent?.trim();
    const found=Object.entries(CHAMPION_ART).find(([,a])=>a.name===name);
    if(found)setImage(card.querySelector('.detail-icon'),found[1].avatar,'champion-avatar-img',found[1].name);
  });
  document.querySelectorAll('.profile-card').forEach(card=>{
    const text=card.textContent||'';
    const found=Object.entries(CHAMPION_ART).find(([,a])=>new RegExp(`Campeón destacado:\\s*${a.name}`,'i').test(text));
    if(found)setImage(card.querySelector('.profile-avatar'),found[1].avatar,'champion-avatar-img',found[1].name);
  });
}

function decorateHud(){
  document.querySelectorAll('.battle-roster-item').forEach(row=>{
    const name=row.querySelector('.battle-roster-copy b')?.textContent?.trim();
    const found=Object.entries(CHAMPION_ART).find(([,a])=>a.name===name);
    if(found)setImage(row.querySelector('.battle-roster-icon'),found[1].avatar,'champion-avatar-img',found[1].name);
  });
  document.querySelectorAll('.fighter-panel').forEach(panel=>{
    const id=championByText(panel.querySelector('.fighter-name b')?.textContent||'');
    if(id)setImage(panel.querySelector('.fighter-avatar'),CHAMPION_ART[id].avatar,'champion-avatar-img',CHAMPION_ART[id].name);
  });
  document.querySelectorAll('.turn-chip').forEach(chip=>{
    const name=chip.querySelector('.turn-name')?.textContent?.trim();
    const found=Object.entries(CHAMPION_ART).find(([,a])=>a.name===name);
    if(found)setImage(chip.querySelector('.turn-icon'),found[1].avatar,'champion-avatar-img',found[1].name);
  });
  const active=document.querySelector('.round-active');
  if(active&&!active.querySelector('.champion-round-avatar')){
    const text=active.textContent||'';
    const found=Object.entries(CHAMPION_ART).find(([,a])=>new RegExp(a.name,'i').test(text));
    if(found){
      const team=text.includes('🔴')?'🔴':'🔵';
      active.innerHTML=`<span class="champion-round-team">${team}</span><img class="champion-round-avatar" src="${found[1].avatar}" alt=""><span>${found[1].name}</span>`;
    }
  }
}

function arfeliVisualDirection(facing,rotation=0){
  const vectors={derecha:[1,0],izquierda:[-1,0],abajo:[0,1],arriba:[0,-1]};
  let [dx,dy]=vectors[facing]||vectors.derecha;
  const r=((rotation%4)+4)%4;
  for(let i=0;i<r;i++) [dx,dy]=[-dy,dx];
  if(dx>0)return 'down-right';
  if(dx<0)return 'up-left';
  if(dy>0)return 'down-left';
  return 'up-right';
}
function arfeliCombatImages(active){
  return Object.entries(ARFELI_COMBAT_VIEWS).map(([dir,src])=>
    `<img class="arfeli-combat-img arfeli-combat-${dir}${dir===active?' is-active':''}" src="${src}" alt="" aria-hidden="true" draggable="false">`
  ).join('');
}
function installArfeliBattleHook(){
  if(typeof renderEntity!=='function'||renderEntity.__arfeliFourViews)return;
  const original=renderEntity;
  const hooked=function(z,current,view){
    let html=original(z,current,view);
    if(!z||z.kind!=='unit'||z.championId!=='arfeli')return html;
    const rotation=(typeof B!=='undefined'&&B?.camera?.rotation)||0;
    const dir=arfeliVisualDirection(z.facing,rotation);
    html=html.replace('<div class="unit-piece ','<div class="unit-piece champion-arfeli ');
    const oldIcon=`<span class="unit-icon">${z.icon}</span>`;
    const newIcon=`<span class="unit-icon arfeli-combat-host" data-arfeli-direction="${dir}">${arfeliCombatImages(dir)}</span>`;
    return html.replace(oldIcon,newIcon);
  };
  hooked.__arfeliFourViews=true;
  renderEntity=hooked;
}

installArfeliBattleHook();
function decorate(){decorateChampionScreens();decorateHud()}
let queued=false;
function schedule(){if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;decorate()})}
new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorate,{once:true});else decorate();
})();