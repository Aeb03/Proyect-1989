(()=>{
'use strict';
const AVATAR='./arfeli-avatar.png';
const SELECT='./arfeli-select.png';
const COMBAT_VIEWS={
  'down-right':'./arfeli-combat-down-right.png',
  'down-left':'./arfeli-combat-down-left.png',
  'up-right':'./arfeli-combat-up-right.png',
  'up-left':'./arfeli-combat-up-left.png'
};

/* Precarga temprana: las cuatro caras quedan en caché antes de entrar al combate. */
for(const src of Object.values(COMBAT_VIEWS)){
  const img=new Image();
  img.src=src;
  if(img.decode)img.decode().catch(()=>{});
}

function setImage(host,src,cls,alt='Arfeli',hostClass='arfeli-image-host'){
  if(!host)return;
  if(host.querySelector(`img.${cls}`))return;
  host.textContent='';
  host.classList.add(hostClass);
  const img=document.createElement('img');
  img.src=src;img.alt=alt;img.className=cls;img.draggable=false;
  host.appendChild(img);
}
function isArfeliName(el){return el?.textContent?.trim()==='Arfeli'}

function decorateChampionScreens(){
  document.querySelectorAll('[data-champ="arfeli"] .champ-icon')
    .forEach(x=>setImage(x,SELECT,'arfeli-select-img','Arfeli','arfeli-select-host'));
  document.querySelectorAll('[data-collection-champ="arfeli"] .champ-icon')
    .forEach(x=>setImage(x,SELECT,'arfeli-select-img','Arfeli','arfeli-collection-select-host'));
  document.querySelectorAll('.champion-detail').forEach(card=>{
    if(isArfeliName(card.querySelector('.champion-detail-head h3')))
      setImage(card.querySelector('.detail-icon'),AVATAR,'arfeli-avatar-img');
  });
  document.querySelectorAll('.profile-card').forEach(card=>{
    if(/Campeón destacado:\s*Arfeli/i.test(card.textContent||''))
      setImage(card.querySelector('.profile-avatar'),AVATAR,'arfeli-avatar-img');
  });
}
function decorateHud(){
  document.querySelectorAll('.battle-roster-item').forEach(row=>{
    if(isArfeliName(row.querySelector('.battle-roster-copy b')))
      setImage(row.querySelector('.battle-roster-icon'),AVATAR,'arfeli-avatar-img');
  });
  document.querySelectorAll('.fighter-panel').forEach(panel=>{
    const name=panel.querySelector('.fighter-name b')?.textContent||'';
    if(/^Arfeli(?:\s|$|·)/i.test(name))
      setImage(panel.querySelector('.fighter-avatar'),AVATAR,'arfeli-avatar-img');
  });
  document.querySelectorAll('.turn-chip').forEach(chip=>{
    if(isArfeliName(chip.querySelector('.turn-name')))
      setImage(chip.querySelector('.turn-icon'),AVATAR,'arfeli-avatar-img');
  });
  const active=document.querySelector('.round-active');
  if(active&&/Arfeli/.test(active.textContent||'')&&!active.querySelector('.arfeli-round-avatar')){
    const team=(active.textContent||'').includes('🔴')?'🔴':'🔵';
    active.innerHTML=`<span class="arfeli-round-team">${team}</span><img class="arfeli-round-avatar" src="${AVATAR}" alt=""><span>Arfeli</span>`;
  }
}

/* Convierte el facing lógico del motor a la diagonal visible del tablero isométrico.
   También contempla los 4 giros de cámara sin modificar coordenadas ni reglas. */
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
  return Object.entries(COMBAT_VIEWS).map(([dir,src])=>
    `<img class="arfeli-combat-img arfeli-combat-${dir}${dir===active?' is-active':''}" src="${src}" alt="" aria-hidden="true" draggable="false">`
  ).join('');
}

/* Hook visual: renderEntity sigue resolviendo toda la mecánica original.
   Sólo reemplazamos el icono de Arfeli por las cuatro vistas precargadas. */
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
