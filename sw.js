// Maqalux - PWA quraşdırılması üçün minimal service worker.
// Bu fayl saytın KÖK qovluğunda olmalıdır (index.html ilə eyni səviyyədə).
const CACHE_NAME = 'maqalux-shell-v2';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Yalnız GET
  if (req.method !== 'GET') return;

  // ÇOX VACİB: yalnız ÖZ DOMENİMİZİN sorğularına toxun.
  // Firebase (firebaseio.com), imgbb, cloudinary, gstatic və s. kənar
  // sorğulara SW ümumiyyətlə müdaxilə etməməlidir — xüsusilə Firebase-in
  // real-vaxt (long-polling/streaming) bağlantılarını keşləmək cəhdi
  // sonsuz yenidən-qoşulma və nəhəng data sərfinə səbəb olur.
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) {
    return; // müdaxilə etmə, brauzer normal idarə etsin
  }

  event.respondWith(
    fetch(req)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        return response;
      })
      .catch(() => caches.match(req))
  );
});
