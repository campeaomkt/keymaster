
const CACHE_NAME = 'keymaster-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
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
  // Tratamento especial para navegação (abrir o app ou dar refresh)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Se o servidor retornar erro ou não encontrar o arquivo, entrega o index do cache
          if (!response || response.status !== 200) {
            return caches.match('./index.html');
          }
          return response;
        })
        .catch(() => {
          // Se estiver offline, entrega o index do cache
          return caches.match('./index.html');
        })
    );
    return;
  }

  // Para outros recursos (JS, Imagens, CSS), tenta cache primeiro, depois rede
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
