// Grim Tally offline cache
// Pages and code: always try the network first (so updates show up right away), fall back to the saved copy offline.
// Images and fonts: use the saved copy, refresh it in the background.
const CACHE='gt-v28';
const SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','maskable-512.png','privacy.html'];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL.map(u=>new Request(u,{cache:'reload'})))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const url=new URL(req.url);
  const fonts=url.hostname==='fonts.googleapis.com'||url.hostname==='fonts.gstatic.com'||url.hostname==='cards.scryfall.io';
  if(url.origin!==location.origin&&!fonts)return;
  const isCode=req.mode==='navigate'||/\.(html|js|webmanifest|json)$/.test(url.pathname)||url.pathname.endsWith('/');
  if(isCode&&!fonts){
    e.respondWith(fetch(req,{cache:'no-store'}).then(res=>{
      if(res&&res.ok){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req.mode==='navigate'?'index.html':req,copy))}
      return res;
    }).catch(()=>caches.match(req,{ignoreSearch:true}).then(hit=>hit||caches.match('index.html'))));
    return;
  }
  e.respondWith(caches.open(CACHE).then(async c=>{
    const hit=await c.match(req);
    const net=fetch(req).then(res=>{if(res&&(res.ok||res.type==='opaque'))c.put(req,res.clone());return res}).catch(()=>hit);
    return hit||net;
  }));
});
