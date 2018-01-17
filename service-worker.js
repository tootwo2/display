var version = 'v2';

self.addEventListener('install', function(event) {
  var cacheWhitelist = [version];

  event.waitUntil(
    caches.open(version).then(function(cache) {
      return cache.addAll([
        '/display/',
        '/display/index.html',
        '/display/js/jquery.min.js',
        '/display/js/bootstrap.min.js',
        '/display/js/bootstrap-table.min.js',
        '/display/js/bootstrap-table-zh-CN.min.js',
        '/display/js/bootstrapValidator.min.js',
        '/display/js/jquery.rotate.js',
        '/display/js/nkimagemove1.js',
        '/display/css/bootstrap.min.css',
        '/display/css/bootstrap-table.min.css',
        '/display/css/bootstrapValidator.min.css',
        '/display/css/nkimagemove.css',
        '/display/img/333824-021.png',
        '/display/img/898466-011.png',
        '/display/img/903896-001.png',
        '/display/img/904695-003.png',
        '/display/img/904695-005.png',
        '/display/fonts/glyphicons-halflings-regular.woff2'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {

  event.waitUntil(
    // Delete old cache entries that don't match the current version.
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== version) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromNetwork(evt.request, 400).catch(function () {
    return fromCache(evt.request);
  }));
});


function fromNetwork(request, timeout) {
  return new Promise(function (fulfill, reject) {
    // Reject in case of timeout.
    var timeoutId = setTimeout(reject, timeout);
    // Fulfill in case of success.
    fetch(request).then(function (response) {
      clearTimeout(timeoutId);
      fulfill(response);
    // Reject also if network fetch rejects.
    }, reject);
  });
}

function fromCache(request) {
  return caches.open(version).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}
