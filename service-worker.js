const CACHE_NAME = 'tweet-preview-cache-v1';
const urlsToCache = [
  '/TweetPreview/',
  '/TweetPreview/tweet-preview.html',
  '/TweetPreview/styles.css',
  '/TweetPreview/script.js',
  '/TweetPreview/favicon.webp',
  '/TweetPreview/favicon-192x192.png',
  '/TweetPreview/favicon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});