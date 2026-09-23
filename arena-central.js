(()=>{'use strict';

const ARENA_SRC='./assets/arenas/central/arena-central-base.png?v=0525';

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
}

let queued=false;
function queueAttach(){
  if(queued)return;
  queued=true;
  requestAnimationFrame(()=>{
    queued=false;
    attachArena();
  });
}

const root=document.querySelector('#app')||document.body;
new MutationObserver(queueAttach).observe(root,{childList:true,subtree:true});

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',attachArena,{once:true});
}else{
  attachArena();
}

})();