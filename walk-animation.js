(()=>{
'use strict';
const STATIC='./arfeli-combat.png';
const FRAMES=Array.from({length:8},(_,i)=>`./arfeli-walk-${i}.png`);
const FRAME_MS=80;       // visual playback ~12.5 FPS: readable on short tactical steps
const MIN_PLAY_MS=640;   // one complete 8-frame cycle
const states=new Map();
FRAMES.forEach(src=>{const i=new Image();i.src=src});

function sideKey(piece){return piece.classList.contains('team-enemy')?'enemy':'player'}
function battleBusy(){
  try{return typeof B!=='undefined'&&B&&!B.deployment&&B.busy}catch(_){return false}
}
function arfeliIsCurrent(side){
  try{
    const u=typeof cur==='function'?cur():null;
    return !!(u&&u.championId==='arfeli'&&u.side===side);
  }catch(_){return false}
}
function getImage(side){
  return document.querySelector(`.unit-piece.champion-arfeli.team-${side} .arfeli-combat-img`);
}
function paint(side,now=performance.now()){
  const st=states.get(side),img=getImage(side);
  if(!st||!img)return;
  if(!st.walking){if(!img.src.endsWith('arfeli-combat.png'))img.src=STATIC;return}
  const frame=Math.floor((now-st.started)/FRAME_MS)%FRAMES.length;
  const wanted=FRAMES[frame];
  if(!img.src.endsWith(wanted.replace('./','')))img.src=wanted;
}
function begin(side,now){
  let st=states.get(side);
  if(!st){st={pos:'',walking:false,started:0,lastMove:0};states.set(side,st)}
  st.lastMove=now;
  if(!st.walking){st.walking=true;st.started=now}
}
function scan(){
  const now=performance.now();
  document.querySelectorAll('.iso-combat-entity .unit-piece.champion-arfeli').forEach(piece=>{
    const side=sideKey(piece),host=piece.closest('.iso-combat-entity');
    if(!host)return;
    const pos=host.getAttribute('style')||'';
    let st=states.get(side);
    if(!st){states.set(side,{pos,walking:false,started:0,lastMove:0});paint(side,now);return}
    const moved=st.pos!==pos;
    st.pos=pos;
    if(moved&&battleBusy()&&arfeliIsCurrent(side))begin(side,now);
    paint(side,now);
  });
}
function tick(){
  const now=performance.now();
  for(const [side,st] of states){
    if(st.walking){
      const fullCycle=now-st.started>=MIN_PLAY_MS;
      const movementEnded=!battleBusy()||!arfeliIsCurrent(side);
      if(fullCycle&&movementEnded)st.walking=false;
    }
    paint(side,now);
  }
}
let raf=0;
function schedule(){if(raf)return;raf=requestAnimationFrame(()=>{raf=0;scan()})}
new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['style']});
setInterval(tick,FRAME_MS);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
})();
