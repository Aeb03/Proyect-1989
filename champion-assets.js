(()=>{
'use strict';
const AVATAR='./arfeli-avatar.png';
const COMBAT='./arfeli-combat.png';

function setImage(host,src,cls,alt='Arfeli'){
  if(!host || host.querySelector(`img.${cls}`)) return;
  host.textContent='';
  host.classList.add('arfeli-image-host');
  const img=document.createElement('img');
  img.src=src; img.alt=alt; img.className=cls; img.draggable=false;
  host.appendChild(img);
}
function textIsArfeli(root){
  return !!root && /(^|\s)Arfeli(\s|$|·)/i.test(root.textContent||'');
}
function decorateUI(){
  document.querySelectorAll('[data-champ="arfeli"] .champ-icon,[data-collection-champ="arfeli"] .champ-icon')
    .forEach(x=>setImage(x,AVATAR,'arfeli-avatar-img'));

  document.querySelectorAll('.champion-detail').forEach(card=>{
    const name=card.querySelector('.champion-detail-head h3');
    if(name?.textContent.trim()==='Arfeli') setImage(card.querySelector('.detail-icon'),AVATAR,'arfeli-avatar-img');
  });

  document.querySelectorAll('.profile-card').forEach(card=>{
    if(textIsArfeli(card)) setImage(card.querySelector('.profile-avatar'),AVATAR,'arfeli-avatar-img');
  });

  document.querySelectorAll('.battle-roster-item').forEach(row=>{
    if(textIsArfeli(row)) setImage(row.querySelector('.battle-roster-icon'),AVATAR,'arfeli-avatar-img');
  });

  document.querySelectorAll('.fighter-panel').forEach(panel=>{
    const name=panel.querySelector('.fighter-name b')?.textContent||'';
    if(/^Arfeli(?:\s|$|·)/i.test(name)) setImage(panel.querySelector('.fighter-avatar'),AVATAR,'arfeli-avatar-img');
  });

  document.querySelectorAll('.turn-chip').forEach(chip=>{
    if(chip.querySelector('.turn-name')?.textContent.trim()==='Arfeli')
      setImage(chip.querySelector('.turn-icon'),AVATAR,'arfeli-avatar-img');
  });
}
function decorateBattle(){
  document.querySelectorAll('.iso-combat-entity .unit-piece:not(.object-piece)').forEach(piece=>{
    const icon=piece.querySelector('.unit-icon');
    if(!icon) return;
    if(icon.textContent.trim()==='⚔️'){
      piece.classList.add('champion-arfeli');
      setImage(icon,COMBAT,'arfeli-combat-img');
    }
  });
}
function decorate(){decorateUI();decorateBattle()}
let queued=false;
function schedule(){
  if(queued)return;
  queued=true;
  requestAnimationFrame(()=>{queued=false;decorate()});
}
new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorate,{once:true});
else decorate();
})();