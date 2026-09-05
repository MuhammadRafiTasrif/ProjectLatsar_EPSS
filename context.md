# DOKUMENTASI KONTEKS & FITUR APLIKASI SIMPONITAS
**Badan Pusat Statistik (BPS) Kabupaten Pasaman**
*Sinergi Pembinaan Statistik Sektoral melalui Penerbitan Kompromin Akurat dan Berkualitas*

---

## 1. PENDAHULUAN & IDENTITAS SISTEM
- **Nama Sistem**: SIMPONITAS
- **Kepanjangan**: Sinergi Pembinaan Statistik Sektoral melalui Penerbitan Kompromin Akurat dan Berkualitas
- **Instansi**: Badan Pusat Statistik (BPS) Kabupaten Pasaman, Provinsi Sumatera Barat
- **Dasar Hukum & Acuan**:
  - UU No. 16 Tahun 1997 tentang Statistik
  - Perpres No. 39 Tahun 2019 tentang Satu Data Indonesia
  - Peraturan BPS No. 5 Tahun 2023 tentang Organisasi dan Tata Kerja BPS
  - Rancangan Aktualisasi Latsar CPNS BPS Angkatan XVI Tahun 2026 oleh Muhammad Rafi Tasrif (Pranata Komputer Ahli Pertama)

---

## 2. DESAIN SISTEM & IDENTITAS VISUAL
- **Brand Primary Color**: `#f79039` (Warm Amber / Pasaman Orange accent)
- **Tipografi**: Plus Jakarta Sans (Google Fonts)
- **Tema Visual**: Support Dark Mode & Light Mode (Glassmorphism UI, Soft Glow, Smooth Micro-animations)
- **Ikonografi**: Web Icon Library (Lucide React / SVG Icons murni - *bebas dari emoji*)
- **Framework Tech Stack**:
  - **Frontend**: React.js (Vite / Next.js ready) + Modern CSS Modules / Tailwind Tokens
  - **Backend / API**: Node.js Express / Vercel Serverless Functions (`api/` directory)
  - **Deployment Ready**: Vercel ready (`vercel.json`, structure & build scripts)

---

## 3. MODUL & FITUR UTAMA SISTEM

### A. Dashboard Monitoring Pembinaan (Real-Time Analytics)
- Ringkasan KPI: Total OPD Pasaman (20 Instansi), OPD Terbina, Kompromin Terbit, Permohonan Pending.
- Grafik Interaktif:
  - Pie Chart Status Kompromin per OPD.
  - Bar Chart Frekuensi Pembinaan per Instansi.
  - Line Chart Aktivitas Pembinaan Bulanan.
- Tabel Real-Time Progres Pembinaan OPD dengan filter status dan pencarian instansi.

### B. Permohonan & Layanan Pembinaan Statistik Sektoral
- Form Pengajuan Pembinaan oleh OPD (Jenis Layanan: Pendampingan Kompromin, Metadata Statistik, Rekomendasi Kegiatan [Romantik], Konsultasi Teknis).
- Pelacakan Status Permohonan secara Visual: *Permohonan Masuk* ➔ *Disetujui/Dijadwalkan* ➔ *Proses Pembinaan* ➔ *Selesai*.
- Aksi Manajemen Pembina BPS (Penetapan Tim Pembina, Jadwal Rapat/Daring, Catatan Respon).

### C. Riwayat & Rekam Jejak Pembinaan OPD
- Rekam aktivitas pembinaan historis per OPD Pasaman (Dinas Kesehatan, Dinas Pendidikan, Dinas Pertanian, Dinas Kominfo, dll).
- Notulen Pembinaan, Pembina BPS, Perwakilan OPD, Foto/Dokumentasi Kegiatan.
- Cetak / PDF Export Berita Acara Pembinaan Statistik Sektoral.

### D. Repository Kompromin (Kompilasi Produk Administrasi)
- Katalog Terpusat Dokumen Kompromin OPD Kabupaten Pasaman.
- Status Verifikasi BPS: *Draft OPD*, *Dalam Penelaahan BPS*, *Terverifikasi & Diterbitkan*.
- Modal Viewer Detail Kompromin, Pencarian Indikator, & Unduh Berkas Kompromin.

### E. Repository Data Statistik Sektoral
- Dataset tabel data statistik sektoral hasil pembinaan (Fasilitas Kesehatan, Produksi Pertanian, Data Sekolah/Pendidikan, Infrastruktur Daerah).
- Filter Indikator, Pencarian Data, dan Ekspor Dataset ke Format CSV/Excel.

### F. Visualisator Aliran Data (Data Lineage Visualizer)
- Diagram visual interaktif aliran data statistik dari:
  **OPD Produsen Data** ➔ **Proses Pembinaan & Kompromin** ➔ **Verifikasi BPS** ➔ **Integrasi Publikasi Resmi BPS** (Daerah Dalam Angka / DDA Pasaman, PDRB, Indikator Kesejahteraan).
- Penelusuran asal-usul data (data origin & traceability).

### G. Knowledge Management Pembinaan
- Modul referensi dan pedoman: SOP Pembinaan Statistik Sektoral, Template Kompromin, Modul Metadata (MS-D & MS-I), Modul Romantik, Regulasi BPS & SDI.
- Pencarian cepat & Unduh Berkas Template.

### H. Laman Manajemen Role & Hak Akses (Role Management & Permission Toggles)
- Manajemen Peran Pengguna:
  - **Tim Pembina BPS (Admin)**
  - **Ketua Tim Statistik Sektoral BPS**
  - **Walidata OPD Pasaman**
  - **Produsen Data OPD Pasaman**
  - **Tamu / Publik**
- Matriks Hak Akses berbasis **Toggle Switch** interaktif untuk setiap fitur:
  - Akses Dashboard & Analytics
  - Pengajuan Permohonan Pembinaan
  - Verifikasi & Penerbitan Kompromin
  - Upload & Edit Data Sektoral
  - Manajemen Role & Pengaturan Sistem
  - Cetak Berita Acara & Export Data
- Fitur Simpan & Terapkan Konfigurasi Hak Akses secara Real-time.

---

## 4. INTEGRASI & VERCEL DEPLOYMENT
- File Konfigurasi Vercel: `vercel.json`
- Node.js API Endpoints: `/api/pembinaan`, `/api/kompromin`, `/api/opd`, `/api/roles`, `/api/stats`
- State Persistence: Synchronized Client LocalStorage + Node.js API Fallback.

---

*File context.md ini wajib diperbarui jika terdapat penambahan fitur atau instruksi baru.*
