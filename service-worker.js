var version = 'v1';

self.addEventListener('install', function(event) {
  var cacheWhitelist = [version];

  event.waitUntil(
    caches.open(version).then(function(cache) {
      return cache.addAll([
        '/display/index.html',
        '/display/index.js',
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
  evt.respondWith(fromNetwork(evt.request, 400, evt).catch(function () {
    return fromCache(evt.request);
  }));
});


function fromNetwork(request, timeout, event) {
  return new Promise(function (fulfill, reject) {
    // Reject in case of timeout.
    var timeoutId = setTimeout(reject, timeout);
    // Fulfill in case of success.
    fetch(request).then(function (response) {
      clearTimeout(timeoutId);
      var res = response.clone();
      fulfill(response);
      event.waitUntil(update(request,res));
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

function update(request, response) {
  return caches.open(version).then(function (cache) {
    return cache.put(request, response);
  });
}
