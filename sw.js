// /* jshint esversion: 6 */

const APP_CACHE = 'currency-converter-v14';


// Cached files
const urlsToCache = [
  '/index.html',
  '/data/currencies.json',
  '/css/main.css',
  '/made-with-bulma.png',
  'https://use.fontawesome.com/releases/v5.0.7/js/all.js',
  '/lib/main.js',

];

// Install essential URLs.
self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open(APP_CACHE).then((cache) => cache.addAll(urlsToCache)));
});

// Delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName.startsWith('currency-converter') && 
          cacheName != APP_CACHE)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

// Fetch data from cache.
self.addEventListener('fetch', (event) => {
  const requestURL = new URL(event.request.url);

  if (requestURL.pathname == '/' && requestURL.origin == location.origin) {
    event.respondWith(
      caches.match('/index.html')
    );
  }

  else event.respondWith(
    caches.match(event.request).then(response => response || fetch (event.request)
    )
  );
});



// importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

// if (workbox) {
//   console.log(`Yay! Workbox is loaded 🎉`);
//   workbox.routing.registerRoute(
//     new RegExp('.*\.js'),
//     workbox.strategies.networkFirst(),
//   );
// } else {
//   console.log(`Boo! Workbox didn't load 😬`);
// }

