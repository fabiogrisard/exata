self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('exata-cache').then(function(cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                'https://raw.githubusercontent.com/fabiogrisard/exata/main/icon-192x192.png',
                'https://raw.githubusercontent.com/fabiogrisard/exata/main/icon-512x512.png'
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
