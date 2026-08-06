var CACHE = 'onyes-v1.23';
var PRECACHE = ['index.html','tools.html','dev.html','system.html','simulations.html','games.html','skin.css','skin.js','favicon.svg','manifest.json'];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(PRECACHE); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }).then(function(){
    // 通知所有 client：新版 SW 已激活（让页面提示用户刷新）
    return self.clients.matchAll({type:'window'}).then(function(cls){
      cls.forEach(function(c){ c.postMessage({type:'SW_UPDATED', version: CACHE}); });
    });
  }));
});
self.addEventListener('fetch', function(e){
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  var isHTML = e.request.mode === 'navigate' || (url.pathname.endsWith('.html') || url.pathname.endsWith('/'));
  if (isHTML) {
    e.respondWith(fetch(e.request).then(function(resp){
      if (resp && resp.status === 200) { var cp = resp.clone(); caches.open(CACHE).then(function(c){ c.put(e.request, cp); }); }
      return resp;
    }).catch(function(){ return caches.match(e.request).then(function(h){ return h || caches.match('index.html'); }); }));
    return;
  }
  e.respondWith(caches.match(e.request).then(function(hit){
    if (hit) return hit;
    return fetch(e.request).then(function(resp){
      if (resp && resp.status === 200) { var cp = resp.clone(); caches.open(CACHE).then(function(c){ c.put(e.request, cp); }); }
      return resp;
    });
  }));
});
