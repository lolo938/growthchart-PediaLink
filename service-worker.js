// service-worker.js (tolerant)
const CACHE_NAME = 'pedialink-growth-v1.0.0';
const resourcesToCache = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './pediatric-growth-tool.browser.jsx',
  './pediatric-growth-tool.original.jsx',
  './icons/icon-192x192.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    for (const url of resourcesToCache) {
      try { await cache.add(url); } catch (e) { console.warn('cache miss', url); }
    }
  })());
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const networkResponse = await fetch(event.request);
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, networkResponse.clone()).catch(()=>{});
        return networkResponse;
      } catch (err) {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        const offline = await caches.match('./offline.html');
        return offline || new Response('Offline', { status: 503 });
      }
    })());
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).catch(()=>caches.match('./offline.html'))));
});
