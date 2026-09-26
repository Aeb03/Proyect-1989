(()=>{'use strict';

const CFG=window.LIGA_AUDIO_CONFIG||{channels:{}};
const ROOT='./assets/audio/music/';

const TRACKS={
  lobby:{
    id:'lobby',
    src:ROOT+'lobby-liga.mp3?v=0601',
    loopStart:.52,
    loopEnd:169.30
  },
  arenaCentral:{
    id:'arena-central',
    src:ROOT+'arena-central-combate.mp3?v=0601',
    loopStart:.36,
    loopEnd:156.88
  }
};

const FADE_MS=900;
const DEFAULT_DUCK=.58;

let activated=false;
let currentScene='none';
let muted=false;
let duckFactor=1;
let duckTimer=null;
let rafs=new WeakMap();

function channel(name,fallback=1){
  const n=Number(CFG?.channels?.[name]);
  return Number.isFinite(n)?Math.max(0,n):fallback;
}

function targetVolume(){
  if(muted)return 0;
  return Math.max(0,Math.min(1,channel('MASTER',1)*channel('MUSIC',.4)*duckFactor));
}

function makePlayer(track){
  const a=new Audio();
  a.src=track.src;
  a.preload='metadata';
  a.loop=false;
  a.crossOrigin='anonymous';
  a.dataset.musicTrack=track.id;
  a.volume=0;

  a.addEventListener('timeupdate',()=>{
    try{
      if(Number.isFinite(track.loopEnd)&&a.currentTime>=track.loopEnd){
        a.currentTime=track.loopStart||0;
        if(!a.paused)a.play().catch(()=>{});
      }
    }catch(_){}
  });

  a.addEventListener('ended',()=>{
    try{
      a.currentTime=track.loopStart||0;
      if(activated)a.play().catch(()=>{});
    }catch(_){}
  });

  a.addEventListener('error',()=>{ /* La música nunca rompe la app. */ });

  return a;
}

const players={
  lobby:makePlayer(TRACKS.lobby),
  arenaCentral:makePlayer(TRACKS.arenaCentral)
};

function cancelFade(a){
  const id=rafs.get(a);
  if(id)cancelAnimationFrame(id);
  rafs.delete(a);
}

function fade(a,to,ms=FADE_MS,onDone){
  cancelFade(a);
  const from=a.volume;
  const start=performance.now();
  const duration=Math.max(1,ms);

  const step=now=>{
    const t=Math.min(1,(now-start)/duration);
    const ease=t*t*(3-2*t);
    a.volume=Math.max(0,Math.min(1,from+(to-from)*ease));
    if(t<1){
      const id=requestAnimationFrame(step);
      rafs.set(a,id);
    }else{
      rafs.delete(a);
      onDone?.();
    }
  };
  const id=requestAnimationFrame(step);
  rafs.set(a,id);
}

async function safePlay(a){
  try{
    await a.play();
    return true;
  }catch(_){
    return false;
  }
}

function sceneFromDOM(){
  const app=document.getElementById('app');
  if(!app)return 'none';
  if(app.querySelector('.battle-screen'))return 'arenaCentral';
  if(app.querySelector('.result-screen'))return 'none';
  if(app.querySelector('.start-screen,.lobby-screen,.mode-screen,.select-screen,.collection-screen,.league-screen,.profile-screen'))return 'lobby';
  return currentScene==='arenaCentral'?'none':'lobby';
}

function prewarmArenaIfUseful(){
  try{
    if(document.querySelector('.mode-screen,.select-screen')){
      const a=players.arenaCentral;
      if(a.preload!=='auto'){
        a.preload='auto';
        a.load();
      }
    }
  }catch(_){}
}

async function switchScene(next){
  if(next===currentScene){
    refreshVolume();
    return;
  }

  const prev=currentScene;
  currentScene=next;

  const oldPlayer=prev==='lobby'?players.lobby:prev==='arenaCentral'?players.arenaCentral:null;
  const newPlayer=next==='lobby'?players.lobby:next==='arenaCentral'?players.arenaCentral:null;

  if(oldPlayer){
    fade(oldPlayer,0,FADE_MS,()=>{
      if(currentScene!==prev){
        try{oldPlayer.pause()}catch(_){}
      }
    });
  }

  if(!newPlayer||!activated)return;

  try{
    newPlayer.preload='auto';
    if(newPlayer.readyState===0)newPlayer.load();
    const ok=await safePlay(newPlayer);
    if(ok)fade(newPlayer,targetVolume(),FADE_MS);
  }catch(_){}
}

function sync(){
  prewarmArenaIfUseful();
  switchScene(sceneFromDOM()).catch(()=>{});
}

function refreshVolume(){
  const v=targetVolume();
  const active=currentScene==='lobby'?players.lobby:currentScene==='arenaCentral'?players.arenaCentral:null;
  if(active&&!active.paused)fade(active,v,180);
}

async function unlock(){
  activated=true;
  try{
    players.lobby.preload='auto';
    players.lobby.load();
  }catch(_){}
  sync();
  return true;
}

function setMuted(value){
  muted=!!value;
  refreshVolume();
  return muted;
}

function duck(level=DEFAULT_DUCK,holdMs=420,releaseMs=280){
  duckFactor=Math.max(.2,Math.min(1,Number(level)||DEFAULT_DUCK));
  refreshVolume();

  clearTimeout(duckTimer);
  duckTimer=setTimeout(()=>{
    duckFactor=1;
    const active=currentScene==='lobby'?players.lobby:currentScene==='arenaCentral'?players.arenaCentral:null;
    if(active&&!active.paused)fade(active,targetVolume(),releaseMs);
  },Math.max(80,Number(holdMs)||420));
}

function getState(){
  return{
    version:'0.6.1',
    activated,
    scene:currentScene,
    muted,
    duckFactor,
    tracks:{
      lobby:{paused:players.lobby.paused,time:players.lobby.currentTime,src:TRACKS.lobby.src},
      arenaCentral:{paused:players.arenaCentral.paused,time:players.arenaCentral.currentTime,src:TRACKS.arenaCentral.src}
    }
  };
}

const firstGesture=()=>{
  unlock();
  document.removeEventListener('pointerdown',firstGesture,true);
  document.removeEventListener('touchstart',firstGesture,true);
  document.removeEventListener('keydown',firstGesture,true);
};
document.addEventListener('pointerdown',firstGesture,true);
document.addEventListener('touchstart',firstGesture,true);
document.addEventListener('keydown',firstGesture,true);

let queued=false;
new MutationObserver(()=>{
  if(queued)return;
  queued=true;
  requestAnimationFrame(()=>{
    queued=false;
    sync();
  });
}).observe(document.getElementById('app')||document.body,{subtree:true,childList:true});

document.readyState==='loading'
  ?document.addEventListener('DOMContentLoaded',sync,{once:true})
  :sync();

window.LigaMusic={
  unlock,
  sync,
  switchScene,
  refreshVolume,
  mute:setMuted,
  duck,
  getState,
  tracks:{...TRACKS}
};

})();