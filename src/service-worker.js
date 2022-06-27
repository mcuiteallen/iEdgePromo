const STATIC_CACHE_DATA = 'webBLE-static-v1'
const DYNAMIC_CACHE_DATA = 'webBLE-dynamic-v1'

const cacheContent = [
    "/",
    "/index.html", 
    "/css/app.css",
    "/css/chunk-vendors.css",    
    "/img/1.jpg",
    "/img/2.jpg",
    "/img/3.jpg",
    "/img/4.jpg",
    "/img/5.jpg",
    "/img/6.jpg",
    "/img/7.jpg",
    "/img/2.gif",
    "/js/app.js",
    "/js/chunk-vendors.js",
    "/favicon.ico",
    "/manifest.json"
];
  
  
  
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(STATIC_CACHE_DATA).then(cache => {
        return cache.addAll(cacheContent);
    }),
  );
});

// activate
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating Service Worker ...', event)
  // Delete other cached files - 移除除了 webBLE-static-v1 的其他 cache files
  event.waitUntil(
      caches.keys().then(function (cacheNames) {
          const promiseArr = cacheNames.map(function (item) {
              if (item !== STATIC_CACHE_DATA) {
                  console.log('[ServiceWorker] Removing Cached Files from Cache - ', item)
                  return caches.delete(item)
              }
          })
          return Promise.all(promiseArr)
      })
  )
})

// fetch
self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) return // 解決 Failed to execute 'put' on 'Cache': Request scheme 'chrome-extension' is unsupported 問題
  if (event.request.method.toUpperCase() !== "GET") return
  console.log('[Service Worker] Fetch Request...', event)

  if (event.request.url.indexOf('event') > -1) { // Cache then Network Strategy - For Instant Data
      event.respondWith(
          fetch(event.request).then(res =>
              caches.open(DYNAMIC_CACHE_DATA)
                  .then(function (cache) {
                      cache.put(event.request.url, res.clone())
                      return res
                  })
          )
      )
  } else { // Cache with Network Fallback Strategy - For App Shell
      event.respondWith(
          caches.match(event.request).then(function (response) {
              return response || fetch(event.request).then(res =>
                  caches.open(DYNAMIC_CACHE_DATA)
                      .then(function (cache) {
                          cache.put(event.request, res.clone())
                          return res
                      })
              )
          })
      )
  }
})