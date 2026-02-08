
const CACHE_NAME = 'keymaster-v3';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Para navegação (abrir o app), sempre tentamos o cache primeiro para evitar 404s de servidor
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Se o servidor retornar 404 ou erro, usamos o cache
          if (!response || response.status !== 200) {
            return caches.match('/index.html') || caches.match('/');
          }
          return response;
        })
        .catch(() => {
          // Se estiver offline ou erro de rede, usamos o cache
          return caches.match('/index.html') || caches.match('/');
        })
    );
    return;
  }

  // Estratégia padrão para outros recursos
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
