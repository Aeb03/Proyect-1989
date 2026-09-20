(()=>{
'use strict';
const PWA_VERSION='0.5.6';
let installPrompt=null,registration=null,updating=false;

const standalone=()=>(
  (window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches) ||
  window.navigator.standalone===true
);

function installButton(){
  let b=document.getElementById('pwaInstallButton');
  if(!b){
    b=document.createElement('button');
    b.id='pwaInstallButton'; b.className='pwa-install-button'; b.type='button';
    b.textContent='⬇ Instalar app'; b.hidden=true;
    b.onclick=async()=>{
      if(!installPrompt)return;
      const p=installPrompt; installPrompt=null; b.hidden=true;
      try{await p.prompt();await p.userChoice}catch(e){}
    };
    document.body.appendChild(b);
  }
  return b;
}
function refreshInstall(){installButton().hidden=!(installPrompt&&!standalone())}

function updateBanner(){
  if(document.querySelector('.pwa-update-banner'))return;
  const bar=document.createElement('div');
  bar.className='pwa-update-banner';
  bar.innerHTML='<span><b>Nueva versión disponible</b><small>Actualizá cuando termines la partida.</small></span><button class="pwa-update-now">Actualizar</button><button class="pwa-update-close" aria-label="Cerrar">×</button>';
  bar.querySelector('.pwa-update-now').onclick=()=>{
    if(!registration?.waiting)return;
    updating=true; registration.waiting.postMessage({type:'SKIP_WAITING'});
  };
  bar.querySelector('.pwa-update-close').onclick=()=>bar.remove();
  document.body.appendChild(bar);
}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;refreshInstall()});
window.addEventListener('appinstalled',()=>{installPrompt=null;refreshInstall()});

async function startPwa(){
  refreshInstall();
  if(!('serviceWorker' in navigator))return;
  try{
    registration=await navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'});
    if(registration.waiting&&navigator.serviceWorker.controller)updateBanner();
    registration.addEventListener('updatefound',()=>{
      const w=registration.installing;if(!w)return;
      w.addEventListener('statechange',()=>{
        if(w.state==='installed'&&navigator.serviceWorker.controller)updateBanner();
      });
    });
    navigator.serviceWorker.addEventListener('controllerchange',()=>{if(updating)location.reload()});
    setTimeout(()=>registration.update().catch(()=>{}),2000);
  }catch(e){console.warn('PWA:',e)}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startPwa,{once:true});
else startPwa();
})();
