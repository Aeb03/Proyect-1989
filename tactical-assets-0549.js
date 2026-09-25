(()=>{'use strict';
const ROOT='./assets/tactical/objects/';
const ART={
  pillar:ROOT+'pilar-coloso.png?v=0547',
  sprout:ROOT+'brote-onod.png?v=0547',
  trap:ROOT+'trampa-korgan.png?v=0547',
  device:ROOT+'dispositivo-electrico.png?v=0547',
  monolith:{
    'down-right':ROOT+'monolito-coloso/down-right.png?v=0547',
    'down-left':ROOT+'monolito-coloso/down-left.png?v=0547',
    'up-left':ROOT+'monolito-coloso/up-left.png?v=0547',
    'up-right':ROOT+'monolito-coloso/up-right.png?v=0547'
  },
  doll1:{
    'down-right':ROOT+'muneco-houngan-01/down-right.png?v=0547',
    'down-left':ROOT+'muneco-houngan-01/down-left.png?v=0547',
    'up-left':ROOT+'muneco-houngan-01/up-left.png?v=0547',
    'up-right':ROOT+'muneco-houngan-01/up-right.png?v=0547'
  },
  doll2:{
    'down-right':ROOT+'muneco-houngan-02/down-right.png?v=0547',
    'down-left':ROOT+'muneco-houngan-02/down-left.png?v=0547',
    'up-left':ROOT+'muneco-houngan-02/up-left.png?v=0547',
    'up-right':ROOT+'muneco-houngan-02/up-right.png?v=0547'
  }
};

function visualDirection(facing='derecha',rotation=0){
  const vectors={derecha:[1,0],izquierda:[-1,0],abajo:[0,1],arriba:[0,-1]};
  let [dx,dy]=vectors[facing]||vectors.derecha;
  const r=((rotation%4)+4)%4;
  for(let i=0;i<r;i++) [dx,dy]=[-dy,dx];
  if(dx>0)return 'down-right';
  if(dx<0)return 'up-left';
  if(dy>0)return 'down-left';
  return 'up-right';
}

function fourViewMarkup(set,dir,extra=''){
  return Object.entries(set).map(([key,src])=>
    `<img class="tactical-four-view ${extra} tactical-${key}${key===dir?' is-active':''}" src="${src}" alt="" aria-hidden="true" draggable="false">`
  ).join('');
}
function singleMarkup(src,cls){
  return `<img class="tactical-single-art ${cls}" src="${src}" alt="" aria-hidden="true" draggable="false">`;
}

function installRenderHook(){
  if(typeof renderEntity!=='function'||renderEntity.__tacticalAssets0549)return;
  const original=renderEntity;
  const hooked=function(z,current,view){
    let html=original(z,current,view);
    if(!z)return html;
    // Durante Despliegue no intervenir: la pantalla debe conservar el flujo base.
    if(typeof B!=='undefined'&&B?.deployment)return html;
    try{
    const rotation=(typeof B!=='undefined'&&B?.camera?.rotation)||0;

    if(z.kind==='unit'&&z.championId==='coloso'&&z.monolith){
      const dir=visualDirection(z.facing,rotation);
      const host=`<span class="unit-icon tactical-art-host monolith-art-host" data-combat-direction="${dir}">${fourViewMarkup(ART.monolith,dir,'monolith-view')}</span>`;
      if(/<span class="unit-icon champion-combat-host"[^>]*>[\s\S]*?<\/span>/.test(html)){
        html=html.replace(/<span class="unit-icon champion-combat-host"[^>]*>[\s\S]*?<\/span>/,host);
      }else{
        html=html.replace(/<span class="unit-icon">[\s\S]*?<\/span>/,host);
      }
      html=html.replace('monolith-piece','monolith-piece tactical-monolith-piece');
      return html;
    }

    if(z.kind==='object'){
      if(z.type==='pillar'){
        html=html.replace(/<span class="unit-icon">[\s\S]*?<\/span>/,
          `<span class="unit-icon tactical-art-host pillar-art-host">${singleMarkup(ART.pillar,'pillar-art')}</span>`);
        return html.replace('object-piece pillar','object-piece pillar tactical-object-art');
      }
      if(z.type==='sprout'){
        html=html.replace(/<span class="unit-icon">[\s\S]*?<\/span>/,
          `<span class="unit-icon tactical-art-host sprout-art-host">${singleMarkup(ART.sprout,'sprout-art')}</span>`);
        return html.replace('object-piece sprout','object-piece sprout tactical-object-art');
      }
      if(z.type==='doll'){
        const dir=visualDirection(z.side==='enemy'?'izquierda':'derecha',rotation);
        // Muñeco 01 = versión normal de 16 PV.
        // Muñeco 02 = versión grande de 30 PV.
        // Se decide por maxHp, nunca por equipo azul/rojo.
        const set=(Number(z.maxHp)>=30)?ART.doll2:ART.doll1;
        html=html.replace(/<span class="unit-icon">[\s\S]*?<\/span>/,
          `<span class="unit-icon tactical-art-host doll-art-host" data-combat-direction="${dir}">${fourViewMarkup(set,dir,'doll-view')}</span>`);
        return html.replace('object-piece doll','object-piece doll tactical-object-art tactical-doll-piece');
      }
    }
    return html;
    }catch(_){return html;}
  };
  hooked.__tacticalAssets0549=true;
  renderEntity=hooked;
}

function installTrapHook(){
  if(typeof isoTrapMarkup!=='function'||isoTrapMarkup.__tacticalAssets0549)return;
  const original=isoTrapMarkup;
  const hooked=function(trap,x,y){
    let html=original(trap,x,y);
    try{
    // La imagen se elige por el tipo REAL de trampa.
    // Los nombres históricos de los PNG pueden estar invertidos.
    const electric=trap?.trapType==='mine';
    const src=electric?ART.device:ART.trap;
    const cls=electric?'device-art':'trap-art';
    html=html.replace(/<span>[\s\S]*?<\/span>/,
      `<span class="tactical-trap-host">${singleMarkup(src,cls)}</span>`);
    return html.replace('iso-trap"','iso-trap tactical-trap"');
    }catch(_){return html;}
  };
  hooked.__tacticalAssets0549=true;
  isoTrapMarkup=hooked;
}

installRenderHook();
installTrapHook();
})();