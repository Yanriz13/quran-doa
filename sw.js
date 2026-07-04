const CACHE_NAME = 'nuang-belajar-v1';
const ASSETS = [
  './',
  './index.html',
  './app.css',
  './main.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './services/doaData.js',
  './services/prayerService.js',
  './services/qiblaService.js',
  './components/PrayerTimes.js',
  './components/QiblaCompass.js',
  './components/DhikrCounter.js',
  './components/QuranShorts.js',
  './components/DoaHub.js',
  './components/Settings.js',
  'https://unpkg.com/lucide@latest',
  'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Bypass caching for PHP proxy scripts and API endpoints to ensure fresh data
  if (e.request.url.includes('proxy.php') || e.request.url.includes('equran.id') || e.request.url.includes('aladhan.com')) {
    e.respondWith(fetch(e.request));
    return;
  }
  
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).then((networkResponse) => {
        // Only cache valid basic static requests
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(e.request, responseToCache);
        });
        return networkResponse;
      });
    })
  );
});
