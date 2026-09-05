# Laporan Pembaruan Fitur: Inisialisasi Arsitektur & Modul Inti SIMPONITAS
*Sistem Informasi Sinergi Pembinaan Statistik Sektoral BPS Kabupaten Pasaman*

---

## 1. Identitas Pembaruan
- **Judul Pembaruan**: Pengembangan Modul Inti & Arsitektur Sistem SIMPONITAS
- **Nomor / Kode Rilis**: v1.0.0 (Initial Core Release)
- **Tanggal Pengerjaan**: 2026-09-05
- **Pengembang**: Muhammad Rafi Tasrif, S.Tr.Stat (Pranata Komputer Ahli Pertama)
- **Modul Terdampak**: Seluruh Modul (Landing Info, Dashboard, Permohonan, Riwayat, Kompromin, Data Sektoral, Data Lineage, Knowledge Base, Role Management, Backend API)

---

## 2. Latar Belakang & Kebutuhan
Dalam rangka Aktualisasi Pelatihan Dasar (Latsar) CPNS BPS Tahun 2026, dibangun sistem **SIMPONITAS** untuk menjawab tantangan tata kelola statistik sektoral di Kabupaten Pasaman, khususnya:
1. Perlunya kanal terpadu pengajuan pembinaan statistik bagi 20 Organisasi Perangkat Daerah (OPD).
2. Transparansi dan akuntabilitas penelaahan dokumen Kompilasi Produk Administrasi (Kompromin).
3. Pemetaan aliran data statistik sektoral (Data Lineage) agar dapat ditelusuri dari OPD hingga menjadi publikasi resmi BPS (Pasaman Dalam Angka / PDRB).
4. Pengelolaan hak akses dinamis antar stakeholder (BPS, Walidata, Produsen Data OPD).

---

## 3. Rincian Fitur yang Dikembangkan

### A. Front-End (React 18 + Vite + Modern CSS)
1. **Landing & Beranda (`HomeInfo.jsx`)**:
   - Gambaran umum sistem, landasan hukum (UU Statistik, Perpres SDI), dan alur 4 pilar pembinaan.
2. **Dashboard Monitoring Real-Time (`Dashboard.jsx` & `StatCard.jsx`)**:
   - Kartu metrik (Total OPD, OPD Terbina, Kompromin Terbit, Permohonan Menunggu).
   - Visualisasi grafik status dokumen kompromin dan distribusi pembinaan OPD.
3. **Formulir & Manajemen Permohonan (`Permohonan.jsx`)**:
   - Formulir pengajuan pembinaan dengan pilihan jenis layanan (Kompromin, Metadata, Romantik, Konsultasi).
   - Indikator progres tahapan permohonan secara visual.
4. **Riwayat & Berita Acara Pembinaan (`Riwayat.jsx`)**:
   - Log histori pertemuan pembinaan statistik sektoral per OPD dilengkapi fitur ekspor/cetak Berita Acara.
5. **Katalog Dokumen Kompromin (`Kompromin.jsx`)**:
   - Daftar dokumen kompromin daerah lengkap dengan status verifikasi BPS dan modal pratinjau.
6. **Katalog Data Sektoral (`DataSektoral.jsx`)**:
   - Repository tabel data sektoral siap unduh untuk mendukung keterpaduan Satu Data Pasaman.
7. **Visualisator Aliran Data (`DataLineage.jsx` & `DataLineageChart.jsx`)**:
   - Diagram alir interaktif penelusuran data dari hulu (produsen data OPD) hingga hilir (publikasi BPS).
8. **Knowledge Management (`KnowledgeBase.jsx`)**:
   - Modul rujukan peraturan perundangan, template berkas, dan SOP statistik sektoral.
9. **Manajemen Hak Akses & Matriks Peran (`RoleManagement.jsx`)**:
   - Matriks perizinan 5 peran pengguna menggunakan toggle switch interaktif yang tersimpan ke state/local storage.

### B. Back-End & API (Node.js Serverless Functions)
- Endpoint `/api/pembinaan`: Menyediakan data layanan dan usulan pembinaan OPD.
- Endpoint `/api/kompromin`: Menyediakan data dokumen kompromin daerah dan status telaah.
- Endpoint `/api/data-sektoral`: Menyediakan dataset statistik sektoral.
- Endpoint `/api/roles`: Menyediakan konfigurasi perizinan dan matriks hak akses.

---

## 4. Berkas Utama yang Terlibat
| Aksi | Path Berkas | Deskripsi |
| :--- | :--- | :--- |
| `[BARU]` | `src/App.jsx` | Pengatur navigasi SPA utama, state tema (dark/light), dan role pengguna |
| `[BARU]` | `src/pages/HomeInfo.jsx` | Halaman beranda informasi dan pengenalan SIMPONITAS |
| `[BARU]` | `src/pages/Dashboard.jsx` | Halaman analitik dan pemantauan statistik pembinaan |
| `[BARU]` | `src/pages/Permohonan.jsx` | Halaman pengajuan & pelacakan permohonan pembinaan |
| `[BARU]` | `src/pages/Riwayat.jsx` | Halaman riwayat pembinaan & ekspor berita acara |
| `[BARU]` | `src/pages/Kompromin.jsx` | Halaman katalog dokumen kompromin OPD |
| `[BARU]` | `src/pages/DataSektoral.jsx` | Halaman repositori dataset sektoral |
| `[BARU]` | `src/pages/DataLineage.jsx` | Halaman visualisasi aliran data sektoral |
| `[BARU]` | `src/pages/KnowledgeBase.jsx` | Halaman pusat unduhan materi & regulasi |
| `[BARU]` | `src/pages/RoleManagement.jsx` | Halaman pengaturan hak akses & permission switch |
| `[BARU]` | `api/*.js` | API serverless handler untuk Vercel |
| `[BARU]` | `vercel.json` | Konfigurasi routing & deployment serverless Vercel |
| `[BARU]` | `.gitignore` | Konfigurasi pengabaian file build dan `node_modules` |

---

## 5. Hasil Pengujian & Status
- **Kompilasi & Build**: Berhasil dijalankan dengan Vite tanpa kendala.
- **Navigasi & State**: Pergantian tab menu, interaksi modal, dan penyesuaian hak akses berjalan lancar.
- **Status Integrasi Git**: Kode sumber dan konfigurasi telah disinkronkan ke repositori GitHub:
  `https://github.com/MuhammadRafiTasrif/ProjectLatsar_EPSS.git`.
