(()=>{'use strict';

const ARENA_SRC='./assets/arenas/central/arena-central-base.png?v=0536';

/*
  Parallax puramente visual.
  La cámara real continúa siendo B.camera y la cuadrícula mantiene su
  transformación original. Sólo traducimos esos valores a variables CSS
  del fondo del Coliseo.
*/
const PARALLAX_X=.22;
const PARALLAX_Y=.14;
const MAX_BG_X=56;
const MAX_BG_Y=20;

function clamp(v,min,max){return Math.max(min,Math.min(max,v))}

function syncArenaParallax(){
  const screen=document.querySelector('.battle-screen');
  if(!screen)return;

  let camera={x:0,y:0,rotation:0};
  try{
    if(typeof battleCameraState==='function')camera=battleCameraState()||camera;
    else if(typeof B!=='undefined'&&B?.camera)camera=B.camera;
  }catch(_){}

  const x=clamp((camera.x||0)*PARALLAX_X,-MAX_BG_X,MAX_BG_X);
  const y=clamp((camera.y||0)*PARALLAX_Y,-MAX_BG_Y,MAX_BG_Y);

  screen.style.setProperty('--arena-bg-parallax-x',`${x.toFixed(2)}px`);
  screen.style.setProperty('--arena-bg-parallax-y',`${y.toFixed(2)}px`);
  screen.dataset.arenaRotation=String(camera.rotation||0);
}

function attachArena(){
  document.querySelectorAll('.battle-grid.iso-grid').forEach(grid=>{
    const current=grid.querySelector(':scope > .arena-central-layer');
    if(current){
      if(current.getAttribute('src')!==ARENA_SRC)current.setAttribute('src',ARENA_SRC);
      return;
    }
    const img=document.createElement('img');
    img.className='arena-central-layer';
    img.src=ARENA_SRC;
    img.alt='';
    img.setAttribute('aria-hidden','true');
    img.draggable=false;
    grid.prepend(img);
  });
  syncArenaParallax();
}

/*
  Nos enganchamos a applyBattleCamera SIN cambiar sus cálculos.
  Primero se ejecuta la cámara original; después actualizamos sólo el fondo.
*/
function hookCamera(){
  if(typeof applyBattleCamera!=='function')return;
  if(applyBattleCamera.__arenaParallaxHooked)return;

  const original=applyBattleCamera;
  const wrapped=function(...args){
    const result=original.apply(this,args);
    syncArenaParallax();
    return result;
  };
  wrapped.__arenaParallaxHooked=true;
  wrapped.__arenaOriginal=original;
  applyBattleCamera=wrapped;
}

let queued=false;
function queueAttach(){
  if(queued)return;
  queued=true;
  requestAnimationFrame(()=>{
    queued=false;
    hookCamera();
    attachArena();
  });
}

const root=document.querySelector('#app')||document.body;
new MutationObserver(queueAttach).observe(root,{childList:true,subtree:true});

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',()=>{
    hookCamera();
    attachArena();
  },{once:true});
}else{
  hookCamera();
  attachArena();
}

window.addEventListener('resize',()=>requestAnimationFrame(syncArenaParallax),{passive:true});

})();
