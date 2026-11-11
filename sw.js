/* Sand GIS service worker — v4 (logo baru, loading, Peta Situasi, TTD, Simpan/Simpan sebagai) */
const VERSION = 'sandgis-v5-20261111a';
const CORE = [
  './', './index.html', './manifest-v5.webmanifest',
  './icons/icon-v5-180.png', './icons/icon-v5-192.png', './icons/icon-v5-512.png',
  './icons/icon-v5-apple-180.png', './icons/icon-v5-maskable-192.png', './icons/icon-v5-maskable-512.png',
  './icons/favicon-v5-32.png', './icons/favicon-v5-48.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then((c) =>
      Promise.all(CORE.map((u) => c.add(new Request(u, { cache: 'reload' })).catch(() => {})))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  /* Terima file .sandgis yang dibagikan dari WhatsApp/Files (Web Share Target) */
  if (req.method === 'POST' && new URL(req.url).pathname.endsWith('/share-target')) {
    e.respondWith((async () => {
      try {
        const fd = await req.formData();
        const f = fd.get('file');
        if (f && f.text) {
          const txt = await f.text();
          const c = await caches.open('sandgis-share');
          await c.put('shared-file', new Response(txt, { headers: { 'Content-Type': 'text/plain' } }));
        }
      } catch (err) {}
      return Response.redirect('./?shared=1', 303);
    })());
    return;
  }
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; /* tile peta, CDN, dll: biarkan langsung ke jaringan */

  /* Halaman, manifest, dan sw: jaringan dulu supaya selalu versi terbaru; cache hanya untuk offline */
  if (req.mode === 'navigate' || /\.webmanifest$/.test(url.pathname) || /\/sw\.js$/.test(url.pathname)) {
    e.respondWith(
      fetch(req).then((res) => {
        if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => caches.match(req).then((r) => r || caches.match('./index.html') || caches.match('./')))
    );
    return;
  }

  /* Ikon (nama berversi): cache dulu */
  if (url.pathname.indexOf('/icons/') !== -1) {
    e.respondWith(
      caches.match(req).then((r) => r || fetch(req).then((res) => {
        if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
        return res;
      }))
    );
    return;
  }

  /* Lainnya (satu origin): tampilkan cache, perbarui di belakang layar */
  e.respondWith(
    caches.match(req).then((r) => {
      const net = fetch(req).then((res) => {
        if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); }
        return res;
      }).catch(() => r);
      return r || net;
    })
  );
});
