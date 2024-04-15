const VERSION = "v1";
const CACHE_NAME = `meeting-tracker-${VERSION}`;

const APP_STATIC_RESOURCES = [
    "/", 
    "/index.html",
    "/style.css",
    "/app.js",
    "/manifest.json",
    "/icons/wheel.svg",
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(CACHE_NAME);
            cache.addAll(APP_STATIC_RESOURCES);
        })(),
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            const names = await caches.keys();
            await Promise.all(
                names.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                }),
            );
        })(),
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate") {
        event.respondWith(caches.match("/"));
        return;
    }

    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        console.log(event.request.url);
        const cachedResponse = await cache.match(event.request.url);
        if  (cachedResponse) {
            return cachedResponse;
        }

        return new Response(null, { status: 404 });
      })(),  
    );
});