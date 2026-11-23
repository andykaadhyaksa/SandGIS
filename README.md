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

## Hidrogeologi (menu Analisis → Air Tanah)
- Layer Produktivitas / Litologi Akuifer dari BIG Satu Peta (ArcGIS REST), tampil di peta dengan opasitas & legenda dari server.
- **Identifikasi klik**: klik peta → kelas akuifer, keterusan, debit di titik itu.
- **Analisis luas**: pilih tapak (SHP/DXF poligon atau poligon/persegi gambar) → luas & persen tiap kelas akuifer di dalam tapak (metode grid), ekspor Excel dan GeoJSON.
- Butuh internet. Alamat layanan bisa diganti di panel (bagian *Alamat layanan*).

### Arah aliran air tanah (tab kedua panel Hidrogeologi)
- Masukkan titik sumur/piezometer (nama, koordinat desimal/DMS, elevasi muka air tanah m dpl): ketik, tempel dari Excel, atau klik di peta. Minimal 3 titik tidak segaris.
- Hasil: arah aliran (azimut), gradien hidrolik, panah aliran, kontur muka air tanah; opsional kecepatan Darcy & rembesan bila K dan porositas diisi. Ekspor Excel & GeoJSON.
- Layer akuifer kini dipotong sesuai batas tapak (opsi *Potong sesuai batas tapak*), dan panel bisa digeser/dikecilkan.

### Gaya tampilan: Halus atau Kotak (grid sel)
Di tab *Arah Aliran Air Tanah* → grup **Tampilan di peta** → **Gaya tampilan**:
- **Halus** (bawaan): gradasi warna muka air tanah + panah tersebar + kontur.
- **Kotak (grid sel)**: peta dibagi kotak-kotak; tiap sel berwarna dan memuat satu panah arah aliran, seperti raster *Flow Direction* (kode D8: E=1, SE=2, S=4, SW=8, W=16, NW=32, N=64, NE=128). Hanya sel di dalam tapak yang digambar.
  - *Jumlah sel* (20–150 pada sisi terpanjang), *Warna sel*: kelas arah (D8) / elevasi-muka air (gradasi) / tanpa warna, *Panah di tiap sel*, *Garis tepi kotak*, warna panah, dan transparansi.
  - *Sumber arah tiap sel* (mode C, topografi): **langsung dari DEM tiap sel** (cekungan diisi, lalu lereng terjal ke 8 arah — arah bervariasi mengikuti relief) atau dari model bidang/IDW (arah seragam bila bidang).
  - Saat beralih ke Kotak, kontur, panah besar, dan kotak label dimatikan agar mirip contoh peta; beralih kembali ke Halus memulihkan pengaturan sebelumnya.
  - Ikut tampil di Layout / Generate Peta (legenda kelas otomatis), tersimpan di file `.sandgis`, dan bisa diekspor sebagai **GeoJSON kotak (sel)** dengan atribut `kode_d8`, `arah`, `elevasi_m`.

### Mode C (topografi): skala analisis
Arah aliran dari topografi **bergantung pada skala**: lereng lokal di dalam tapak bisa berlawanan dengan tren regional di sekelilingnya.
- Kisi DEM 61×61 mencakup 4× lebar tapak. Pilih **Skala analisis**: *Tapak saja* (lokal), *2×*, atau *4× (regional)*.
- Hasil menampilkan **tabel arah untuk ketiga skala** (azimut + R²) dan peringatan bila selisihnya >45°.
- Metode IDW di mode ini diganti **permukaan DEM (bilinear)**: tidak ada pola "bull's-eye" di tiap titik sampel, dan ada ukuran *Konsistensi arah* (100% = semua panah searah).
- Untuk arah yang sahih secara hidrogeologi tetap perlu muka air tanah terukur (mode A/B, ≥3 sumur/piezometer).
- Bila layer DEM proyek (TIF/DEMNAS) tidak mencakup skala yang lebih lebar, skala itu ditandai *di luar cakupan DEM terpilih* di tabel dan tidak menghentikan perhitungan; hanya skala yang dipilih wajib tercakup penuh.

## Tema hijau (selaras logo)
- Warna aksen utama diganti dari karat/oranye ke hijau logo SandGIS: `#1a7f3c` (terang) dan `#4cc06a` (gelap), aksen kedua hijau-limau.
- Latar, panel, dan garis tepi ikut condong kehijauan tipis. Mode terang/gelap tetap lewat tombol bulan di bilah atas.
- Warna data (pin survei, ikon alat gambar, palet layer SHP) sengaja tidak diubah agar tetap bisa dibedakan.
- Warna bilah browser (`theme-color`) dan manifest PWA ikut hijau; setelah deploy, hapus cache sekali agar versi baru termuat.

## Tab awal
- Saat app dibuka, ribbon langsung menampilkan tab **Data** (unggah SHP/DXF/TIF dll.), bukan Edit.

## Track GPS → layer garis
- Survey → **Mulai Tracking** merekam jalur (Kalman, jeda, perhentian). Saat **Selesai**, jalur otomatis menjadi **layer garis** di panel Layer (bisa dimatikan di Survey → Atur → "Otomatis jadikan layer garis").
- Atribut layer: Nama, Mulai, Selesai, Jarak_m, Durasi_mnt, KecKmJam, Moda, JmlTitik, ElevMin, ElevMax. Garis putus sinyal disimpan sebagai MultiLineString.
- Layer ikut tersimpan di file `.sandgis`, bisa diberi label/gaya, dipakai di Layout, dan diekspor seperti layer SHP lainnya.
- Jalur lama: Survey → Linimasa → **Jadikan layer**, atau tombol **Jalur → Layer** di ribbon Survey (semua perjalanan selesai sekaligus). Tidak menggandakan layer yang sudah ada.

## Segmentasi Sungai: profil elevasi & penampang melintang (butuh DEM)
- Setelah **Hitung Segmentasi** dan ada DEM (TIF/DEMNAS atau kontur DXF berelevasi), kartu **Profil & Penampang (DEM)** muncul di panel. Bisa juga klik garis tengah sungai (profil), baris tabel segmen, atau garis kuning batas segmen (penampang) di peta.
- **Profil elevasi:** elevasi sepanjang sungai dari hulu, batas segmen, kemiringan tiap segmen (m/km), hover sinkron dengan titik di peta, ekspor PNG/CSV.
- **Penampang melintang tiap segmen:** potongan DEM tegak lurus sungai (posisi sisi hulu/tengah/sisi hilir, lebar bisa diatur), muka air dari kedalaman manual atau dari debit (Manning), hasil lebar muka air, luas/keliling basah, jari-jari hidrolis, kecepatan, debit, Froude. Ekspor PNG, CSV penampang, dan CSV hidrolika semua segmen.
- Catatan: DEM tidak merekam dasar sungai di bawah muka air, jadi kedalaman dan luas basah bersifat indikatif. Untuk desain atau Qual2Kw, ganti dengan data ukur lapangan.

## Peta dasar: citra tambahan & riwayat citra (waktu mundur)
- Tab **Peta dasar** → grup **Riwayat Citra**: Esri Wayback, Sentinel-2 Tahunan, NASA VIIRS/MODIS Harian. Saat salah satunya aktif, kontrol waktu muncul di kiri bawah peta (pilih tanggal/tahun, tombol ◀ ▶, slider).
- **Esri Wayback** (rilis 2014→kini): daftar rilis diunduh saat dipakai (butuh internet) lalu di-cache di browser. Tanggal = tanggal rilis Esri, bukan tanggal pemotretan.
- **Sentinel-2 cloudless** (EOX) 2016–2025: mosaik tahunan ±10 m. Lisensi 2018+ CC BY-NC-SA (non-komersial).
- **NASA GIBS** harian: resolusi kasar (±250–375 m), untuk awan/asap/banjir besar.
- Citra baru lain: Esri Clarity, Esri Firefly.
- **Citra Google tidak punya parameter tanggal** pada tile-nya, jadi selalu versi terbaru. Saat peta dasar Google aktif, kontrol waktu menawarkan pindah ke sumber berarsip di atas.
- Waktu terpilih ikut tersimpan di file proyek dan terbawa ke Generate Peta.

## SHP titik → Titik SandGIS
Layer SHP bertipe titik kini punya tombol **📍 Jadikan Titik** di daftar layer: titik dikonversi jadi Titik SandGIS (jenis baru atau yang sudah ada, nama dari kolom atribut), sehingga terbaca di Layout, legenda, dan tabel titik.

## Input koordinat UTM
Bar koordinat (mode tambah titik) kini punya format **UTM (Easting / Northing)** dengan pilihan zona 46–54 dan belahan N/S. Titik dan koma desimal sama-sama dikenali.

## Tampilan: font & form titik
- Font antarmuka diganti ke **Inter** (variabel, tertanam di `index.html`, jadi tetap tampil offline; lisensi SIL OFL 1.1). Ukuran teks kecil dinaikkan ±1px. Teks di dalam peta/Layout/ekspor tetap Arial agar hasil cetak tidak berubah.
- Form tambah titik dirapikan: kartu dengan kolom Nama, pilihan format koordinat (DD/DMS/DMM/UTM) berbentuk tombol segmen, kolom koordinat bersusun, pratinjau, dan tombol "Tambahkan Titik" selebar form.

## Bar atas & ribbon: ukuran tetap
Tinggi ribbon sama di semua tab (66 px), label satu baris, tab selalu tampil penuh; bila layar sempit, ribbon digeser dengan roda mouse. Tombol Simpan sebagai / teks Autosave / teks Generate Peta berubah jadi ikon saat jendela sempit. Item Riwayat Citra digabung jadi satu dropdown di Peta dasar.

## Popup & form edit baru
- Popup titik/garis/poligon: kartu bersih (ikon berwarna, koordinat DD/DMS/UTM dengan tombol salin, tombol Edit/Hapus jelas), terbaca di mode terang & gelap.
- Tombol **Edit** membuka form modal: titik (nama, jenis, koordinat + UTM langsung, catatan) dan objek (nama, warna garis/isi, tebal, transparansi, label).
- Ikon ribbon diberi chip berwarna; titik di ribbon memakai ikon pin.
- Popup tambah titik, picker warna, dan picker bentuk didesain ulang agar konsisten (kartu rapi, grid warna dengan tanda centang, bentuk dengan ikon vektor). Status autosave: "Belum tersimpan" (tanpa titik-titik).
- Ribbon versi Inggris: label dipersingkat, ribbon otomatis memadat jika tidak muat dan memberi fade di tepi bila masih bisa digulir. Bar atas HP: satu baris ringkas (ikon saja + tombol Generate).
- Klik kanan di peta kini membuka menu khusus: di area kosong (salin koordinat DD/UTM, tambah titik per jenis, pusatkan, zoom, Google Maps), di titik (edit, bentuk, warna, salin, zoom, hapus), di garis/poligon (edit properti, edit titik sudut, profil elevasi, zoom, hapus). Esc / klik di luar menutup menu.
- Tombol salin koordinat di popup diperbaiki (fallback bila Clipboard API ditolak); teks koordinat bisa diblok dan diklik untuk menyalin.
- Popup atribut layer SHP didesain ulang (kartu rapi, daftar atribut bisa digulir). Area klik garis SHP diperlebar ±8 px agar mudah diklik.
- Poligon dengan isi transparan (0%) tidak lagi menelan klik — hanya garis tepinya yang bisa diklik, sehingga garis/titik di bawahnya mudah dipilih. Area klik garis digambar diperlebar (±13 px).
- Klik kanan tab Peta/Layout → Duplikat (salinan persis semua data: titik, garis, poligon, SHP, TIF, DXF, peta dasar, tampilan), Ubah nama, Hapus. Salinan berdiri sendiri; mengubah salah satu tidak memengaruhi yang lain.
- Pemilih garis: klik dalam ±14 px dari garis gambar manual selalu membuka popup garis tersebut, walau tertutup poligon/layer lain.
- Koordinat & boundary fitur SHP: tombol "Lihat koordinat & boundary" di popup fitur, ikon di toolbar tabel atribut (fitur terpilih/semua), dan klik kanan fitur. Menampilkan semua titik (DD/DMS/UTM), luas/keliling/panjang, titik tengah, bounding box; Salin tabel (Excel), Unduh CSV, WKT, GeoJSON.

### Layout mandiri (v5-20261123b)
Setiap tab Layout kini menyimpan sendiri basemap, posisi/zoom, simbologi titik, skala pratinjau & pengaturan Generate Peta. Pindah ke tab Peta/Layout lain atau menduplikat Layout tidak mengubahnya; tersimpan juga di file project.

### Opsi "Tanpa simbol" (v5-20261123c)
Bentuk titik kini punya pilihan "∅ Tanpa simbol": di Layout/ekspor titik tidak digambar (label & koordinat tetap), di peta utama tampil lingkaran putus-putus tipis agar masih bisa diklik.
