(()=>{
'use strict';
const STATIC='./arfeli-combat.png';
const FRAMES=Array.from({length:8},(_,i)=>`./arfeli-walk-${i}.png`);
const FRAME_MS=125; // 8 FPS
const states=new Map();
FRAMES.forEach(src=>{const i=new Image();i.src=src});

function sideKey(piece){return piece.classList.contains('team-enemy')?'enemy':'player'}
function currentArfeliIsMoving(side){
  try{
    if(typeof B==='undefined'||!B||!B.busy||B.deployment)return false;
    const u=typeof cur==='function'?cur():null;
    return !!(u&&u.championId==='arfeli'&&u.side===side);
  }catch(_){return false}
}
function paint(key){
  const st=states.get(key);if(!st)return;
  const piece=document.querySelector(`.unit-piece.champion-arfeli.team-${key}`);
  const img=piece?.querySelector('.arfeli-combat-img');
  if(!img)return;
  if(!st.walking){if(img.getAttribute('src')!==STATIC)img.src=STATIC;return}
  const elapsed=performance.now()-st.started;
  const frame=Math.floor(elapsed/FRAME_MS)%FRAMES.length;
  img.src=FRAMES[frame];
}
function stopLater(key,token){
  setTimeout(()=>{
    const st=states.get(key);if(!st||st.token!==token)return;
    if(currentArfeliIsMoving(key)){stopLater(key,token);return}
    st.walking=false;paint(key);
  },FRAME_MS*2);
}
function scan(){
  document.querySelectorAll('.iso-combat-entity .unit-piece.champion-arfeli').forEach(piece=>{
    const key=sideKey(piece),host=piece.closest('.iso-combat-entity');
    if(!host)return;
    const pos=host.getAttribute('style')||'';
    let st=states.get(key);
    if(!st){states.set(key,{pos,walking:false,started:0,token:0});paint(key);return}
    const moved=st.pos!==pos;
    st.pos=pos;
    if(moved&&currentArfeliIsMoving(key)){
      st.walking=true;st.started=performance.now();st.token++;
      paint(key);stopLater(key,st.token);
    }else paint(key);
  });
}
let raf=0;
function schedule(){if(raf)return;raf=requestAnimationFrame(()=>requestAnimationFrame(()=>{raf=0;scan()}))}
new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['style']});
setInterval(()=>{for(const k of states.keys())paint(k)},FRAME_MS);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',schedule,{once:true});else schedule();
})();
