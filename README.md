# Sand GIS (PWA)

Aplikasi web satu-file. Folder ini siap di-upload ke GitHub dan dipublikasikan lewat **GitHub Pages**.

## Isi
- `index.html` — aplikasi
- `sw.js` — service worker (offline + update otomatis)
- `manifest-v3.webmanifest` — pengaturan install (ikon, nama)
- `icons/` — ikon logo baru (`icon-v4-*`, `maskable`, `favicon-v4-*`)
- `.nojekyll` — agar GitHub Pages menyajikan file apa adanya

## Publikasi di GitHub Pages
1. Buat repository baru, upload **semua isi folder ini** (termasuk folder `icons` dan file `.nojekyll`) ke root repository.
2. Settings → Pages → Source: *Deploy from a branch* → Branch `main` / folder `/ (root)` → Save.
3. Buka `https://<username>.github.io/<nama-repo>/`.

## Install ke laptop
Buka alamat di atas dengan Chrome/Edge → klik ikon **Install** di kanan address bar → Install.

## Memperbarui versi lama yang sudah terinstal
1. Timpa file lama di repository dengan file baru (semua file, ikon lama `icon-v3-*` boleh dihapus).
2. Tunggu 1–2 menit sampai GitHub Pages selesai deploy.
3. Buka aplikasi terinstal (perlu internet) — update terunduh otomatis; tutup lalu buka lagi aplikasinya satu kali.
4. Bila ikon di taskbar/desktop masih lama: uninstall aplikasi (chrome://apps atau edge://apps), lalu install ulang.

Setiap rilis berikutnya: ubah `VERSION` di `sw.js` (mis. `sandgis-v4-YYYYMMDD`) agar cache lama terganti.

## Menyimpan project
- **Simpan (Ctrl+S):** pertama kali memilih lokasi & nama file `.sandgis`; selanjutnya menimpa file yang sama tanpa dialog.
- **Buka:** file yang dibuka langsung terhubung — Simpan memperbarui file aslinya.
- **Simpan sebagai (Ctrl+Shift+S):** membuat file baru; setelah itu Simpan dan Autosave menulis ke file baru tersebut.
- **Autosave** (lampu di bar atas) otomatis menulis ke file yang terhubung, selain cadangan di browser.
- Perlu Chrome/Edge (desktop). Di browser lain, Simpan mengunduh file seperti biasa.
- Setelah aplikasi ditutup lalu dibuka lagi, browser meminta izin menulis ulang — klik **Simpan** sekali.
