const CACHE_NAME = "fmcg-commerce-v1";
const STATIC_CACHE = "fmcg-static-v1";
const DATA_CACHE = "fmcg-data-v1";
const OFFLINE_URL = "/offline";

// Assets to pre-cache on install
const PRECACHE_URLS = [
  "/",
  "/offline",
  "/search",
  "/cart",
  "/account",
  "/offers",
];

// Install: pre-cache key pages
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    })
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== STATIC_CACHE && key !== DATA_CACHE)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch: cache-first for static, network-first for data
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET and non-http(s) requests
  if (request.method !== "GET" || !url.protocol.startsWith("http")) return;

  // API/data calls — network-first
  if (url.pathname.startsWith("/api/") || url.pathname.includes("_next/data")) {
    event.respondWith(networkFirstWithFallback(request));
    return;
  }

  // Next.js static assets (_next/static) — cache-first
  if (url.pathname.startsWith("/_next/static")) {
    event.respondWith(cacheFirstWithNetworkUpdate(request));
    return;
  }

  // Images (unsplash) — cache-first
  if (url.hostname === "images.unsplash.com") {
    event.respondWith(cacheFirstWithNetworkUpdate(request));
    return;
  }

  // Navigation requests — network-first with offline fallback
  if (request.mode === "navigate") {
    event.respondWith(networkFirstWithOfflineFallback(request));
    return;
  }

  // Default: network-first
  event.respondWith(networkFirstWithFallback(request));
});

// ─── Cache strategies ───

async function cacheFirstWithNetworkUpdate(request) {
  try {
    const cached = await caches.match(request);
    if (cached) {
      // Update cache in background
      fetch(request)
        .then((response) => {
          if (response.ok) {
            caches.open(STATIC_CACHE).then((cache) => cache.put(request, response));
          }
        })
        .catch(() => {});
      return cached;
    }
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return caches.match(request);
  }
}

async function networkFirstWithFallback(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DATA_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response("Offline", { status: 503 });
  }
}

async function networkFirstWithOfflineFallback(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DATA_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    // Return cached offline page
    const offlineResponse = await caches.match(OFFLINE_URL);
    if (offlineResponse) return offlineResponse;
    return new Response(
      `<!DOCTYPE html><html><body style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;background:#f2f2f2">
        <div style="text-align:center"><h2>🔌 You're offline</h2><p>Please check your connection.</p></div>
      </body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  }
}
