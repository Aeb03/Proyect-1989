(()=>{'use strict';

const START_VERSION='0.5.53';
let introPlayed=false;
let decorating=false;

function mountModularStart(){
  if(decorating)return;
  const screen=document.querySelector('.start-screen');
  if(!screen||screen.dataset.modularStart==='1')return;

  decorating=true;
  try{
    /* Preserve the exact existing navigation callback before replacing visuals. */
    const oldEnter=screen.querySelector('#enterCircuit');
    const existingEnterHandler=oldEnter?.onclick||null;

    screen.dataset.modularStart='1';
    screen.classList.add('start-modular');

    screen.innerHTML=`
      <div class="start-modular-scene">
        <div class="start-modular-frame" aria-hidden="true"></div>
        <div class="start-modular-safe">
          <img
            class="start-modular-logo"
            src="./assets/ui/start/inicio-logo-liga.png?v=0553"
            alt="Liga de los Mundos"
            draggable="false"
          >

          <p class="start-modular-kicker">LIGA DE LOS MUNDOS DE COMBATE TÁCTICO</p>
          <p class="start-modular-motto">Distintos mundos. Una sola Liga.</p>

          <button class="start-enter start-modular-enter" id="enterCircuit" type="button">
            <img
              class="start-swords"
              src="./assets/ui/start/inicio-icono-espadas.png?v=0553"
              alt=""
              aria-hidden="true"
              draggable="false"
            >
            <b>ENTRAR AL CIRCUITO</b>
          </button>

          <small class="start-version">v${START_VERSION}</small>
        </div>
      </div>`;

    const enter=screen.querySelector('#enterCircuit');

    /* Reuse the callback supplied by showStart(). Fallback is only the
       same existing destination in case the property was unavailable. */
    if(existingEnterHandler){
      enter.onclick=existingEnterHandler;
    }else if(typeof showLobby==='function'){
      enter.onclick=showLobby;
    }

    const pressed=on=>enter?.classList.toggle('is-pressed',on);
    enter?.addEventListener('pointerdown',()=>pressed(true),{passive:true});
    enter?.addEventListener('pointerup',()=>pressed(false),{passive:true});
    enter?.addEventListener('pointercancel',()=>pressed(false),{passive:true});
    enter?.addEventListener('pointerleave',()=>pressed(false),{passive:true});
  }finally{
    decorating=false;
  }
}

function playIntro(){
  if(introPlayed)return;
  introPlayed=true;

  const overlay=document.createElement('div');
  overlay.className='liga-intro-overlay';
  overlay.setAttribute('aria-hidden','true');
  document.body.appendChild(overlay);

  /* The overlay now covers the old/start screen, so it is safe to reveal #app. */
  requestAnimationFrame(()=>{
    document.documentElement.classList.remove('startup-intro-pending');
  });

  /* 1.5 s visible + short fade, inside the requested 1.2–1.8 s test window. */
  window.setTimeout(()=>{
    overlay.classList.add('is-leaving');
    window.setTimeout(()=>overlay.remove(),300);
  },1500);
}

mountModularStart();
playIntro();

/* If Inicio is rebuilt later, remount the same modular visuals without replaying Intro. */
let queued=false;
new MutationObserver(()=>{
  if(queued)return;
  queued=true;
  requestAnimationFrame(()=>{
    queued=false;
    mountModularStart();
  });
}).observe(document.getElementById('app')||document.body,{subtree:true,childList:true});

})();