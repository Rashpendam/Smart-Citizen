const CACHE_NAME = 'citizen-passport-v3'; // Incremented version to smash old cache completely

self.addEventListener('install', (e) => {
  self.skipWaiting(); 
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          return caches.delete(key); // Wipes out absolutely all old versions completely
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Always fetch live from the network first so the ?unlock parameters work instantly every time
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
