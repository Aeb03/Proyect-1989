(()=>{'use strict';

/*
  Liga de los Mundos v0.5.46
  Ronda + panel inferior: sólo horizontal.
  Los paneles laterales conservan orientación libre.
*/

const LOCKED_HUD=new Set(['round','command']);

const _hudSetting=window.hudSetting||hudSetting;
const _toggleHudOrientation=window.toggleHudOrientation||toggleHudOrientation;

function forceHorizontalStored(key){
  if(!LOCKED_HUD.has(key))return;
  try{
    const all=loadHudPositions();
    const current={...(HUD_DEFAULTS[key]||{}),...(all[key]||{})};
    if(current.orientation!=='horizontal'){
      saveHudSetting(key,{orientation:'horizontal'});
    }
  }catch(_){}
}

for(const key of LOCKED_HUD)forceHorizontalStored(key);

hudSetting=function(key){
  const h=_hudSetting(key);
  if(LOCKED_HUD.has(key))h.orientation='horizontal';
  return h;
};

toggleHudOrientation=function(key){
  if(LOCKED_HUD.has(key)){
    forceHorizontalStored(key);
    return;
  }
  return _toggleHudOrientation(key);
};

})();
