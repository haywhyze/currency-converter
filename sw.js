/* jshint esversion: 6 */


// saving response to cache
let updateCache = (request, response) => {
  return caches.open(APP_CACHE).then((cache) => cache.put(request, response));
};

// get response from cache
let fromCache = (request) => {
return caches.open(APP_CACHE).then((cache) => {
  return cache.match(request).then((matchingData) => {
    return matchingData || Promise.reject('No_match');
  });
});
};

// get immediate cache response but fall back to network
let immediateCacheResponse = (event) => {
  const networkRequest =
      new Request(`${event.request.url}?${Date.now().toString()}`);

  const network = fetch(networkRequest);
  const networkDuplicate = network.then((response) => response.clone());

  event.respondWith(fromCache(event.request).catch(() => networkDuplicate));
  event.waitUntil(network.then((respond) => updateCache(event.request, respond)));
};

let tryCatchFallbackNetwork = (event) => {
  let response = null;
  event.respondWith(fromCache(event.request)
      .catch(() => fetch(event.request.clone())
          .then((resp) => {
              response = resp;
              return updateCache(event.request, resp.clone());
          })
          .then(() => response)));
};

const APP_CACHE = 'currency-converter-v3';


// Cached files
const urlsToCache = [
  '/',
  '/data/currencies.json',
  '/css/main.css',
  '/made-with-bulma.png',
  '/idb.js',
  'https://use.fontawesome.com/releases/v5.0.7/js/all.js',
  '/lib/main.js',

];

// Install essential URLs.
self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open(APP_CACHE)
      .then((cache) => {
        console.log('Opened Cache')
        return cache.addAll(urlsToCache); 
      }));
});

// Delete old caches.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== APP_CACHE)
            .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

// Fetch data from cache.
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname === '/rates') {
    // Rates. Don't cache.
    fetch(event.request);
  } else if (requestUrl.pathname === '/') {
    // Serve from cache, update in background.
    immediateCacheResponse(event);
  } else {
    // Try cache first. If that fails, go to network and update cache.
    tryCatchFallbackNetwork(event);
  }
});