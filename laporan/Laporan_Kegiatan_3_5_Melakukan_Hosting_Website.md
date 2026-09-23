# LAPORAN TAHAPAN KEGIATAN 3.5: MELAKUKAN HOSTING WEBSITE SIMPONITAS
**Badan Pusat Statistik (BPS) Kabupaten Pasaman - Provinsi Sumatera Barat**
*Sinergi Pembinaan Statistik Sektoral melalui Penerbitan Kompromin Akurat dan Berkualitas*

---

## 📌 Identitas Tahapan Kegiatan
- **Tahapan Kegiatan**: Tahapan Kegiatan 3.5: Melakukan Hosting Website SIMPONITAS
- **Tanggal Pelaksanaan**: 18 - 20 September 2026
- **Pengembang / Pelaksana**: Muhammad Rafi Tasrif, S.Tr.Stat (Pranata Komputer Ahli Pertama)
- **Output Utama**: Aplikasi SIMPONITAS Terpublikasi Online di Platform Cloud Vercel dengan SSL HTTPS Active

---

## 1. Latar Belakang & Tujuan Tahapan Kegiatan
Tahapan akhir dari Kegiatan 3 adalah meluncurkan aplikasi SIMPONITAS ke lingkungan hosting publik (Cloud Production). Dengan melakukan hosting website, sistem SIMPONITAS dapat diakses secara online oleh seluruh ASN BPS Kabupaten Pasaman, Walidata OPD, Produsen Data, dan pemangku kepentingan kapan saja dan di mana saja melalui jaringan internet dengan jaminan keamanan koneksi SSL HTTPS.

---

## 2. Langkah-Langkah Pelaksanaan & Logika Implementasi
- **1. Konfigurasi Produksi & Build Artifacts**:
  Menyusun skrip build `npm run build` menggunakan Vite bundler untuk menghasilkan aset statis yang terkompresi dan teroptimasi tinggi di folder `dist`.

- **2. Penyusunan Berkas Deployment vercel.json**:
  Membuat konfigurasi route rewrite dan header caching pada `vercel.json` untuk mendukung SPA (Single Page Application) dan Serverless API routing.

- **3. Peluncuran (Deployment) ke Vercel Cloud Platform**:
  Menghubungkan repositori Git proyek ke Vercel Platform dan menjalankan proses deployment otomatis (Continuous Deployment).

- **4. Pengujian Aksesibilitas, Keamanan SSL & Responsivitas**:
  Melakukan pengujian URL hosting pada browser desktop dan smartphone, verifikasi sertifikat SSL HTTPS, serta uji kecepatan muat halaman (PageSpeed Score).

### 📊 Tabel Rincian Spesifikasi & Artefak Hasil Tahapan

| Parameter Hosting | Spesifikasi Production | Hasil Verifikasi | Status Operasional |
| :--- | :--- | :--- | :--- |
| Platform Hosting | Vercel Cloud Platform (Serverless Infrastructure) | Deployed successfully | AKTIF (100%) |
| Keamanan HTTPS | SSL/TLS Certificate (256-bit Encryption) | Encrypted Connection | SECURE (100%) |
| Build Tool & Compression | Vite JS + Gzip Caching | Build size < 500 KB | OPTIMIZED |
| Uji Aksesibilitas Perangkat | Desktop Laptop, Tablet, Smartphone Android/iOS | Fully Responsive | PASSED |
| Responsiveness Speed | Average First Contentful Paint < 0.8s | Ultra Fast Loading | EXCELLENT |


---

## 3. Hasil dan Output Tahapan Kegiatan
Aplikasi SIMPONITAS telah resmi di-hosting dan dapat diakses secara publik melalui URL hosting Vercel. Sistem berjalan sangat stabil, aman, dan siap digunakan untuk kegiatan aktualisasi pembinaan statistik sektoral.

---

## 4. Keterkaitan dengan Nilai-Nilai Dasar ASN (BerAKHLAK)
- **Nilai Berorientasi Pelayanan**: Memberikan kemudahan aksesibilitas 24/7 bagi OPD Pasaman untuk mengajukan permohonan pembinaan tanpa batasan ruang dan waktu.
- **Nilai Adaptif**: Memanfaatkan teknologi modern Cloud Serverless Deployment untuk efisiensi biaya dan performa maksimal.
- **Nilai Akuntabel**: Menjamin keamanan akses data dengan enkripsi standar industri SSL HTTPS.


---

## 5. Kesimpulan dan Rencana Tindak Lanjut
Seluruh rangkaian Tahapan Kegiatan 3 (Kegiatan 3.1 s.d 3.5) telah berhasil diselesaikan dengan hasil sangat memuaskan. Aplikasi SIMPONITAS siap dimanfaatkan untuk kegiatan sosialisasi dan aktualisasi.
