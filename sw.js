const CACHE_NAME = 'qr-app-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './icon.svg',
  './manifest.json',
  'https://cdn.jsdelivr.net/npm/qr-code-styling@1.6.0-rc.1/lib/qr-code-styling.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
        // use return fetch to avoid opaque responses failing cache.addAll for external resources, but for simplicity cache.addAll is fine if CORS allows, else just cache locals
        return cache.addAll(ASSETS.filter(url => !url.startsWith('http')));
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
