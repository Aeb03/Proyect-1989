(()=>{
'use strict';
const PUBLIC_VERSION='0.5.6';

function replaceText(root=document){
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  const nodes=[];
  while(walker.nextNode())nodes.push(walker.currentNode);
  for(const n of nodes){
    let t=n.nodeValue;
    t=t.replaceAll('ARENA TÁCTICA','LIGA DE LOS MUNDOS')
       .replaceAll('Arena Táctica','Liga de los Mundos')
       .replaceAll('CIRCUITO GALÁCTICO','LIGA DE LOS MUNDOS')
       .replaceAll('Circuito Galáctico','Liga de los Mundos')
       .replaceAll('TRANSMISIÓN DEL CIRCUITO','TRANSMISIÓN DE LA LIGA')
       .replaceAll('El circuito abre sus puertas','La Liga abre sus puertas')
       .replaceAll('Competidor del circuito','Competidor de la Liga')
       .replaceAll('Distintos mundos. Una sola Arena.','Distintos mundos. Una sola Liga.')
       .replace(/v0\.5\.3/g,`v${PUBLIC_VERSION}`);
    if(t!==n.nodeValue)n.nodeValue=t;
  }
}

function decorate(){
  document.title=`Liga de los Mundos v${PUBLIC_VERSION}`;
  replaceText(document);

  const start=document.querySelector('.start-card');
  if(start && !start.querySelector('.league-main-logo')){
    const oldStars=start.querySelector('.start-stars');
    const oldBrand=start.querySelector('.start-brand');
    const logo=document.createElement('div');
    logo.className='league-main-logo';
    logo.innerHTML='<img src="./icon-512.png" alt="Liga de los Mundos">';
    if(oldStars)oldStars.replaceWith(logo); else start.prepend(logo);
    if(oldBrand)oldBrand.remove();
  }

  const brand=document.querySelector('.brand-block');
  if(brand && !brand.querySelector('.league-brand-logo')){
    const mark=brand.querySelector('.brand-mark');
    if(mark){
      const img=document.createElement('img');
      img.className='league-brand-logo';
      img.src='./icon-192.png';
      img.alt='';
      mark.replaceWith(img);
    }
  }
}

let queued=false;
const schedule=()=>{
  if(queued)return;
  queued=true;
  requestAnimationFrame(()=>{queued=false;decorate()});
};
new MutationObserver(schedule).observe(document.documentElement,{subtree:true,childList:true});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorate,{once:true});
else decorate();
})();
