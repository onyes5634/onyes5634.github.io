var CACHE = 'onyes-v1.27';
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
    // v1.24：HTML 永远 network-only，绝不读 cache——避免 memory cache 旧版滞留
    e.respondWith(fetch(e.request).then(function(resp){
      if (resp && resp.status === 200) { var cp = resp.clone(); caches.open(CACHE).then(function(c){ c.put(e.request, cp); }); }
      return resp;
    }).catch(function(){
      return new Response('<!DOCTYPE html><html><head><meta charset="utf-8"><title>网络错误</title></head><body style="font-family:sans-serif;padding:40px;text-align:center"><h2>❌ 网络连接失败</h2><p>无法获取页面，请检查网络后刷新。</p><button onclick="location.reload()" style="padding:10px 20px;background:#3498db;color:#fff;border:none;border-radius:6px;cursor:pointer">重新加载</button></body></html>', {status: 503, headers: {'Content-Type': 'text/html; charset=utf-8'}});
    }));
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
