// Maqalux - PWA quraşdırılması üçün minimal service worker.
// Bu fayl saytın KÖK qovluğunda olmalıdır (index.html ilə eyni səviyyədə).
const CACHE_NAME = 'maqalux-shell-v1';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Sadə "network-first" strategiya: internet varsa həmişə təzə məlumat çəkilir
// (Firebase real-vaxt işlədiyi üçün köhnə keşlənmiş versiya göstərmək istəmirik),
// internet kəsilərsə isə mümkün olduğu qədər son keşlənmiş versiyaya keçilir.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
