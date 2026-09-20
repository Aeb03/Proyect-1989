const CACHE='liga-mundos-055';
const CORE=[
  './index.html',
  './styles.css?v=053',
  './app.js?v=053',
  './pwa.css?v=055',
  './pwa.js?v=055',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(CACHE).then(async cache=>{
      for(const url of CORE){
        try{ await cache.add(url); }catch(e){}
      }
    })
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('message',event=>{
  if(event.data && event.data.type==='SKIP_WAITING')self.skipWaiting();
});

self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;

  if(event.request.mode==='navigate'){
    event.respondWith(
      fetch(event.request).catch(()=>caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached=>{
      const network=fetch(event.request).then(response=>{
        if(response && response.ok){
          const copy=response.clone();
          caches.open(CACHE).then(cache=>cache.put(event.request,copy));
        }
        return response;
      }).catch(()=>cached);
      return cached || network;
    })
  );
});
