(()=>{
  'use strict';

  const SHELL_VERSION='0.5.4';
  let deferredInstallPrompt=null;
  let registration=null;
  let reloadingForUpdate=false;

  const isStandalone=()=>(
    window.matchMedia?.('(display-mode: standalone)').matches===true ||
    window.navigator.standalone===true
  );

  function isCombatScreen(){
    return !!document.querySelector('.battle-screen,.deployment-screen');
  }

  function syncDisplayedVersion(){
    document.title=`Arena Táctica v${SHELL_VERSION}`;
    document.querySelectorAll('.start-version,.brand-block small').forEach(el=>{
      if(el.textContent.includes('v0.5.3')){
        el.textContent=el.textContent.replace('v0.5.3',`v${SHELL_VERSION}`);
      }
    });
  }

  function ensureInstallButton(){
    let btn=document.querySelector('#pwaInstallButton');
    if(!btn){
      btn=document.createElement('button');
      btn.id='pwaInstallButton';
      btn.className='pwa-install-button';
      btn.type='button';
      btn.innerHTML='<span>⬇️</span><b>INSTALAR APP</b>';
      btn.addEventListener('click',async()=>{
        if(!deferredInstallPrompt)return;
        const prompt=deferredInstallPrompt;
        deferredInstallPrompt=null;
        refreshInstallButton();
        try{
          await prompt.prompt();
          await prompt.userChoice;
        }catch(e){}
      });
      document.body.appendChild(btn);
    }
    return btn;
  }

  function refreshInstallButton(){
    const btn=ensureInstallButton();
    const canInstall=!!deferredInstallPrompt && !isStandalone() && !isCombatScreen();
    btn.hidden=!canInstall;
  }

  function showUpdateBanner(){
    if(document.querySelector('.pwa-update-banner'))return;
    const bar=document.createElement('div');
    bar.className='pwa-update-banner';
    bar.innerHTML=`
      <span class="pwa-update-copy">
        <b>✦ Nueva versión disponible</b>
        <small>Podés actualizar cuando termines la partida.</small>
      </span>
      <button type="button" class="pwa-update-now">Actualizar</button>
      <button type="button" class="pwa-update-later" aria-label="Cerrar">×</button>
    `;
    bar.querySelector('.pwa-update-now').addEventListener('click',()=>{
      const waiting=registration?.waiting;
      if(!waiting)return;
      reloadingForUpdate=true;
      waiting.postMessage({type:'SKIP_WAITING'});
    });
    bar.querySelector('.pwa-update-later').addEventListener('click',()=>bar.remove());
    document.body.appendChild(bar);
  }

  window.addEventListener('beforeinstallprompt',event=>{
    event.preventDefault();
    deferredInstallPrompt=event;
    refreshInstallButton();
  });

  window.addEventListener('appinstalled',()=>{
    deferredInstallPrompt=null;
    refreshInstallButton();
  });

  const observer=new MutationObserver(()=>{
    syncDisplayedVersion();
    refreshInstallButton();
  });
  observer.observe(document.documentElement,{subtree:true,childList:true});

  async function registerServiceWorker(){
    if(!('serviceWorker' in navigator))return;
    try{
      registration=await navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'});

      if(registration.waiting && navigator.serviceWorker.controller){
        showUpdateBanner();
      }

      registration.addEventListener('updatefound',()=>{
        const worker=registration.installing;
        if(!worker)return;
        worker.addEventListener('statechange',()=>{
          if(worker.state==='installed' && navigator.serviceWorker.controller){
            showUpdateBanner();
          }
        });
      });

      navigator.serviceWorker.addEventListener('controllerchange',()=>{
        if(reloadingForUpdate) location.reload();
      });

      setTimeout(()=>registration.update().catch(()=>{}),1500);
      document.addEventListener('visibilitychange',()=>{
        if(document.visibilityState==='visible'){
          registration.update().catch(()=>{});
        }
      });
    }catch(e){
      console.warn('PWA no disponible:',e);
    }
  }

  syncDisplayedVersion();
  refreshInstallButton();
  registerServiceWorker();
})();
