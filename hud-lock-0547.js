(()=>{'use strict';
const LOCKED=new Set(['round','command']);
function normalizeStorage(){
  try{
    const key=typeof HUD_POSITIONS_KEY!=='undefined'?HUD_POSITIONS_KEY:'arena-tactica-hud-v045';
    const raw=JSON.parse(localStorage.getItem(key)||'{}')||{};
    let changed=false;
    for(const id of LOCKED){
      if(raw[id]?.orientation!=='horizontal'){
        raw[id]={...(raw[id]||{}),orientation:'horizontal'};
        changed=true;
      }
    }
    if(changed)localStorage.setItem(key,JSON.stringify(raw));
  }catch(_){}
}
function normalizeDom(){
  for(const [selector,key] of [['.round-hud-panel','round'],['.battle-command-panel','command']]){
    document.querySelectorAll(selector).forEach(panel=>{
      panel.classList.remove('hud-vertical');
      panel.classList.add('hud-horizontal');
      panel.querySelectorAll(`[data-hud-orient="${key}"]`).forEach(b=>{
        b.hidden=true;b.style.setProperty('display','none','important');b.setAttribute('aria-hidden','true');b.tabIndex=-1;
      });
    });
  }
}
normalizeStorage();normalizeDom();
document.addEventListener('click',e=>{
  const b=e.target.closest?.('[data-hud-orient]');
  if(!b||!LOCKED.has(b.dataset.hudOrient))return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  normalizeStorage();normalizeDom();
},true);
new MutationObserver(()=>{normalizeStorage();normalizeDom()})
.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
})();