const CACHE_NAME = 'exata-cache-v2'; // Atualize o nome do cache se fizer alterações significativas

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll([
                '/exata/',
                '/exata/index.html',
                '/exata/auth.js',
                '/exata/manifest.json',
                '/exata/service-worker.js', // Certifique-se de incluir o próprio service worker
                'https://fabiogrisard.github.io/exata/logo2.bmp',
                'https://fabiogrisard.github.io/exata/icon-192x192.png',
                'https://fabiogrisard.github.io/exata/icon-512x512.png'
                // Adicione outros arquivos que você deseja armazenar em cache
            ]);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
