# SRAWUNG DIGITAL HUB

Web app edukasi dan refleksi untuk mendukung model pemberdayaan remaja **SRAWUNG-RESILIENCE**.

## 6 dashboard
1. Dashboard utama — ringkasan program, progres, dan pintasan.
2. SLUMAN — Identity Mapping, Self-Reflection Circle, Strength-Based Development, dan muhasabah.
3. SLUMUN — Peer Pressure Simulation, komunikasi asertif, Decision Compass, literasi digital, dan tabayyun.
4. SLAMET — Srawung Peer Circle, anti-perundungan, privasi, ta'awun social action, dan informasi rujukan bantuan.
5. SRAWUNG DIGITAL HUB — materi edukasi, jurnal refleksi, kalender empat minggu, kanal aspirasi, dan informasi privasi.
6. Evaluasi Program — refleksi skala 1–5 dan indikator evaluasi program.

## Cara menjalankan
- Ekstrak ZIP.
- Buka folder `srawung-digital-hub`.
- Buka `index.html` menggunakan Chrome, Edge, Firefox, atau browser modern lainnya.
- Tidak memerlukan instalasi package atau server untuk demo lokal.

## Deploy gratis
### GitHub Pages
1. Buat repository baru di GitHub.
2. Unggah `index.html`, `style.css`, `app.js`, dan `README.md` ke root repository.
3. Buka **Settings → Pages**.
4. Pada bagian Build and deployment, pilih **Deploy from a branch**.
5. Pilih branch `main` dan folder `/root`, lalu Save.
6. Tunggu proses deploy, kemudian buka URL GitHub Pages yang diberikan.

### Vercel
1. Unggah folder ini ke repository GitHub.
2. Masuk ke Vercel dan pilih **Add New → Project**.
3. Import repository tersebut.
4. Karena ini web statis, tidak perlu build command. Output directory dapat dibiarkan kosong/default.
5. Klik Deploy.

## Catatan teknis dan privasi
- Data peta diri, jurnal, aspirasi, dan evaluasi disimpan menggunakan `localStorage` pada browser perangkat yang sedang digunakan.
- Tidak ada login, database online, sinkronisasi antarperangkat, atau pengiriman data ke server dalam versi demo ini.
- Jangan memasukkan informasi yang sangat sensitif, terutama saat memakai perangkat bersama.
- Untuk penerapan sungguhan di sekolah, perlu backend aman, autentikasi dan hak akses, kebijakan privasi, persetujuan yang sesuai, prosedur moderasi, serta pengelolaan rujukan oleh pihak berwenang.
- Web ini adalah media edukasi dan komunikasi, **bukan alat diagnosis psikologis** dan bukan pengganti guru BK, psikolog, atau tenaga kesehatan.
- Informasi layanan bantuan ditampilkan sebagai kategori rujukan (guru BK, psikolog/tenaga profesional, puskesmas/fasilitas kesehatan), bukan direktori kontak yang telah diverifikasi.

## Struktur file
- `index.html` — struktur halaman dan navigasi.
- `style.css` — desain responsif.
- `app.js` — konten dashboard, interaksi, dan penyimpanan lokal.
