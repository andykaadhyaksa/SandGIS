# Sand GIS (PWA)

Aplikasi web satu-file. Folder ini siap di-upload ke GitHub dan dipublikasikan lewat **GitHub Pages**.

## Isi
- `index.html` — aplikasi
- `sw.js` — service worker (offline + update otomatis)
- `manifest-v5.webmanifest` — pengaturan install (ikon, nama)
- `icons/` — ikon logo baru (`icon-v5-*`, `maskable`, `favicon-v5-*`)
- `.nojekyll` — agar GitHub Pages menyajikan file apa adanya

## Publikasi di GitHub Pages
1. Buat repository baru, upload **semua isi folder ini** (termasuk folder `icons` dan file `.nojekyll`) ke root repository.
2. Settings → Pages → Source: *Deploy from a branch* → Branch `main` / folder `/ (root)` → Save.
3. Buka `https://<username>.github.io/<nama-repo>/`.

## Install ke laptop
Buka alamat di atas dengan Chrome/Edge → klik ikon **Install** di kanan address bar → Install.

## Memperbarui versi lama yang sudah terinstal
1. Timpa file lama di repository dengan file baru (semua file, ikon lama `icon-v3-* / icon-v4-*` boleh dihapus).
2. Tunggu 1–2 menit sampai GitHub Pages selesai deploy.
3. Buka aplikasi terinstal (perlu internet) — update terunduh otomatis; tutup lalu buka lagi aplikasinya satu kali.
4. Bila ikon di taskbar/desktop masih lama: uninstall aplikasi (chrome://apps atau edge://apps), lalu install ulang.

Setiap rilis berikutnya: ubah `VERSION` di `sw.js` (mis. `sandgis-v5-YYYYMMDD`) agar cache lama terganti.

## Menyimpan project
- **Simpan (Ctrl+S):** pertama kali memilih lokasi & nama file `.sandgis`; selanjutnya menimpa file yang sama tanpa dialog.
- **Buka:** file yang dibuka langsung terhubung — Simpan memperbarui file aslinya.
- **Simpan sebagai (Ctrl+Shift+S):** membuat file baru; setelah itu Simpan dan Autosave menulis ke file baru tersebut.
- **Autosave** (lampu di bar atas) otomatis menulis ke file yang terhubung, selain cadangan di browser.
- Perlu Chrome/Edge (desktop). Di browser lain, Simpan mengunduh file seperti biasa.
- Setelah aplikasi ditutup lalu dibuka lagi, browser meminta izin menulis ulang — klik **Simpan** sekali.

## Edit geometri SHP
Mengubah bentuk fitur dari layer SHP yang sudah di-upload (titik, garis, poligon, multi-part, lubang poligon).
- **Mulai:** klik ✏️ pada baris layer (tab Layer atau daftar SHP), atau ribbon **Edit → Edit SHP → Edit Geometri**.
- **Pilih fitur:** klik fitur di peta. Tampil handle: ■ titik (vertex), ◦ titik tengah, ✥ geser seluruh fitur.
- **Geser titik:** seret ■. **Tambah titik:** ketuk ◦. **Hapus titik:** pilih ■ lalu ⌫ / Delete / klik kanan / klik ganda. **Hapus fitur:** tombol 🗑.
- **Snap:** menempel ke titik layer lain yang terlihat (toleransi 12 px, 18 px di layar sentuh).
- **Undo/Redo:** Ctrl+Z / Ctrl+Y atau tombol ↶ ↷ (satu riwayat dengan fitur lain). **Esc:** batal pilih.
- Poligon minimal 3 titik, garis minimal 2 titik. Fitur dengan >1.500 titik: zoom in dulu agar handle muncul.
- Luas/panjang fitur terpilih ditampilkan (ellipsoid WGS84). Kolom `_LUAS_M2/_LUAS_HA` fitur yang diedit ikut dihitung ulang.
- Hasil edit tersimpan di file `.sandgis`. **Ekspor:** tombol ⤓ → Shapefile (.zip, WGS84 atau UTM) atau GeoJSON. Nilai Z tidak ikut di SHP.
- Belum ada: menambah fitur baru, edit Z per titik.

## Vercel
Upload semua isi folder ini ke ROOT project (bukan di dalam subfolder). `vercel.json` memastikan `sw.js` & manifest tidak ter-cache dan bertipe benar.
Cek setelah deploy: buka `/manifest-v5.webmanifest` (harus tampil JSON berisi `icon-v5-*`) dan `/icons/icon-v5-512.png` (harus tampil gambar).

## Ikon masih lama setelah install?
Itu berarti file manifest/ikon lama yang tersaji. Pastikan SEMUA file di zip ter-upload (bukan hanya `index.html`):
`index.html`, `sw.js`, `manifest-v5.webmanifest`, `vercel.json`, folder `icons/` (isi `icon-v5-*`).
Buka `/manifest-v5.webmanifest` di browser — harus ada `icon-v5-*`. Lalu uninstall aplikasi, Clear site data (F12 → Application → Storage), muat ulang Ctrl+Shift+R, install ulang.
