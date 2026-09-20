const CACHE='liga-mundos-056';
const CORE=[
  './index.html','./styles.css?v=053','./app.js?v=053',
  './brand.css?v=056','./brand.js?v=056',
  './pwa.css?v=056','./pwa.js?v=056',
  './manifest.webmanifest','./icon-192.png','./icon-512.png'
];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(async cache=>{
    for(const url of CORE){try{await cache.add(url)}catch(e){}}
  }));
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>{
    const network=fetch(event.request).then(response=>{
      if(response?.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}
      return response;
    }).catch(()=>cached);
    return cached||network;
  }));
});
