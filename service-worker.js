/* ─────────────────────────────────────────────────────────
   A Simple Tweet Preview — Service Worker
   Strategy:
     App shell  → Cache First  (instant repeat loads)
     Avatars    → Network First, silent fallback (needs live network)
───────────────────────────────────────────────────────── */

const CACHE_NAME = 'tweet-preview-v1';

/* Files that make up the entire app shell */
const APP_SHELL = [
  '/TweetPreview/',
  '/TweetPreview/index.html',
  '/TweetPreview/manifest.json'
];

/* ── Install: cache the app shell ──────────────────────── */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_SHELL);
    })
  );
  /* Activate immediately without waiting for old SW to be released */
  self.skipWaiting();
});

/* ── Activate: delete old caches ───────────────────────── */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) { return key !== CACHE_NAME; })
          .map(function (key) { return caches.delete(key); })
      );
    })
  );
  /* Take control of all open clients immediately */
  self.clients.claim();
});

/* ── Fetch: route requests by origin ───────────────────── */
self.addEventListener('fetch', function (event) {
  var url = new URL(event.request.url);

  /* Avatar requests (unavatar.io) — Network First, silent fallback.
     If offline or the request fails, just let it fail so the app
     falls back to the letter initial without any error shown. */
  if (url.hostname === 'unavatar.io') {
    event.respondWith(
      fetch(event.request).catch(function () {
        return new Response('', { status: 503 });
      })
    );
    return;
  }

  /* App shell — Cache First.
     Serve from cache instantly; if not cached yet, fetch and store. */
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(function (cached) {
        if (cached) return cached;
        return fetch(event.request).then(function (response) {
          /* Only cache valid same-origin responses */
          if (response && response.status === 200 && response.type === 'basic') {
            var toCache = response.clone();
            caches.open(CACHE_NAME).then(function (cache) {
              cache.put(event.request, toCache);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  /* Everything else — pass through to network */
  event.respondWith(fetch(event.request));
});
