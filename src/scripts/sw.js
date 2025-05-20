importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js"
);

if (workbox) {
  console.log("[Workbox] Loaded");

  const CACHE_VERSION = "v3";
  const STATIC_CACHE = `static-cache-${CACHE_VERSION}`;
  const API_CACHE = `api-cache-${CACHE_VERSION}`;
  const FALLBACK_URL = "/offline.html";

  self.skipWaiting();
  workbox.core.clientsClaim();

  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);

  workbox.routing.registerRoute(
    ({ request }) => request.mode === "navigate",
    new workbox.strategies.NetworkFirst({
      cacheName: STATIC_CACHE,
      plugins: [
        new workbox.expiration.ExpirationPlugin({ maxEntries: 50 }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [200],
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    ({ url }) => url.pathname.startsWith("/stories"),
    new workbox.strategies.NetworkFirst({
      cacheName: API_CACHE,
      networkTimeoutSeconds: 3,
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [200],
        }),
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 5 * 60,
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    ({ url }) =>
      url.origin.startsWith("https://fonts.googleapis.com") ||
      url.origin.startsWith("https://fonts.gstatic.com"),
    new workbox.strategies.StaleWhileRevalidate({ cacheName: "google-fonts" })
  );

  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === "image" ||
      request.url.match(/\.(?:png|jpg|jpeg|svg|gif|webp)$/),
    new workbox.strategies.CacheFirst({
      cacheName: "image-cache",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        }),
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
      ],
    })
  );

  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === "script" || request.destination === "style",
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "static-resources",
    })
  );

  workbox.routing.setCatchHandler(async ({ event }) => {
    if (event.request.destination === "document") {
      return caches.match(FALLBACK_URL);
    }

    if (event.request.destination === "image") {
      return caches.match(event.request).then((cachedImage) => {
        if (cachedImage) {
          return cachedImage;
        }
        return Response.error();
      });
    }

    if (event.request.url.includes("/stories")) {
      return new Response(
        JSON.stringify({
          error: true,
          message: "You're offline. The app will try to use cached data.",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 503,
        }
      );
    }

    return Response.error();
  });

  self.addEventListener("message", (event) => {
    if (event.data && event.data.action === "skipWaiting") {
      self.skipWaiting();
    }
  });

  self.addEventListener("push", (event) => {
    let notificationData = {};

    try {
      notificationData = event.data.json();
    } catch (error) {
      notificationData = {
        title: "Story App Notification",
        options: {
          body: event.data ? event.data.text() : "New notification",
        },
      };
    }

    const title = notificationData.title || "Story berhasil dibuat";
    const options = notificationData.options || {
      body: "Anda telah membuat story baru",
      icon: "/images/icon-192x192.png",
      badge: "/images/icon-72x72.png",
    };

    event.waitUntil(self.registration.showNotification(title, options));
  });

  self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    event.waitUntil(
      clients.matchAll({ type: "window" }).then((clientList) => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow("/");
      })
    );
  });
} else {
  console.warn("[Workbox] Not loaded. Offline support not available.");
}
