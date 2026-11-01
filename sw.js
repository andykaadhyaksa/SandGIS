/* SandGIS service worker — cache cangkang aplikasi + pustaka CDN agar bisa dibuka tanpa internet.
   Peta dasar (tile) & alamat tetap butuh internet. Naikkan VERSION saat index.html diperbarui. */
const VERSION='sandgis-v2';
const SHELL=['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/icon-maskable-512.png','icons/icon-180.png','icons/favicon-32.png'];
const LIBS=["https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css", "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js", "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js", "https://cdn.jsdelivr.net/npm/shpjs@4/dist/shp.js", "https://cdn.jsdelivr.net/npm/dxf-parser@1.1.2/dist/dxf-parser.min.js", "https://cdn.jsdelivr.net/npm/geotiff@2.1.3/dist-browser/geotiff.js", "https://cdn.jsdelivr.net/npm/georaster@1.6.0/dist/georaster.browser.bundle.min.js", "https://cdn.jsdelivr.net/npm/georaster-layer-for-leaflet@3.10.0/dist/georaster-layer-for-leaflet.min.js", "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js", "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js", "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js", "https://cdn.jsdelivr.net/npm/topojson-client@3", "https://cdn.jsdelivr.net/npm/xlsx-js-style/dist/xlsx.bundle.js", "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js", "https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/sql-wasm.js", "https://cdn.jsdelivr.net/npm/proj4@2.11.0/dist/proj4.js"];
self.addEventListener('install',e=>{ e.waitUntil((async()=>{ const c=await caches.open(VERSION);
  await Promise.allSettled(SHELL.map(u=>c.add(new Request(u,{cache:'reload'}))));
  await Promise.allSettled(LIBS.map(async u=>{ try{ const r=await fetch(new Request(u,{mode:'no-cors'})); await c.put(u,r); }catch(_){} }));
  self.skipWaiting(); })()); });
self.addEventListener('activate',e=>{ e.waitUntil((async()=>{ for(const k of await caches.keys()) if(k!==VERSION) await caches.delete(k); await self.clients.claim(); })()); });
self.addEventListener('fetch',e=>{ const req=e.request; if(req.method!=='GET') return; const url=new URL(req.url);
  /* halaman: jaringan dulu, cadangan dari cache (agar update langsung terambil bila online) */
  if(req.mode==='navigate'){ e.respondWith((async()=>{ try{ const r=await fetch(req); const c=await caches.open(VERSION); c.put('index.html',r.clone()); return r; }catch(_){ return (await caches.match('index.html'))||(await caches.match('./'))||Response.error(); } })()); return; }
  const isLib=/(^|\.)(cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net)$/.test(url.hostname);
  const isOwn=url.origin===location.origin;
  if(isLib||isOwn){ e.respondWith((async()=>{ const hit=await caches.match(req); if(hit) return hit; try{ const r=await fetch(req); if(r&&(r.ok||r.type==='opaque')){ const c=await caches.open(VERSION); c.put(req,r.clone()); } return r; }catch(_){ return hit||Response.error(); } })()); }
  /* tile peta, alamat, dsb. → langsung ke jaringan */
});
