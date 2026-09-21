(()=>{
'use strict';
const AVATAR='./arfeli-avatar.png';
const SELECT='./arfeli-select.png';
const COMBAT='./arfeli-combat.png';

function setImage(host,src,cls,alt='Arfeli',hostClass='arfeli-image-host'){
  if(!host)return;
  const current=host.querySelector(`img.${cls}`);
  if(current)return;
  host.textContent='';
  host.classList.add(hostClass);
  const img=document.createElement('img');
  img.src=src;img.alt=alt;img.className=cls;img.draggable=false;
  host.appendChild(img);
}
function isArfeliName(el){
  return el?.textContent?.trim()==='Arfeli';
}
function decorateSelection(){
  document.querySelectorAll('[data-champ="arfeli"] .champ-icon')
    .forEach(x=>setImage(x,SELECT,'arfeli-select-img','Arfeli','arfeli-select-host'));

  document.querySelectorAll('[data-collection-champ="arfeli"] .champ-icon')
    .forEach(x=>setImage(x,AVATAR,'arfeli-avatar-img'));

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
  if(active && /Arfeli/.test(active.textContent||'') && !active.querySelector('.arfeli-round-avatar')){
    const team=(active.textContent||'').includes('🔴')?'🔴':'🔵';
    active.innerHTML=`<span class="arfeli-round-team">${team}</span><img class="arfeli-round-avatar" src="${AVATAR}" alt=""><span>Arfeli</span>`;
  }
}
function decorateBattle(){
  document.querySelectorAll('.iso-combat-entity .unit-piece:not(.object-piece)').forEach(piece=>{
    const icon=piece.querySelector('.unit-icon');
    if(!icon)return;
    if(icon.textContent.trim()==='⚔️'){
      piece.classList.add('champion-arfeli');
      setImage(icon,COMBAT,'arfeli-combat-img','Arfeli','arfeli-combat-host');
    }
  });
}
function decorate(){decorateSelection();decorateHud();decorateBattle()}
let queued=false;
function schedule(){
  if(queued)return;
  queued=true;
  requestAnimationFrame(()=>{queued=false;decorate()});
}
new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorate,{once:true});else decorate();
})();