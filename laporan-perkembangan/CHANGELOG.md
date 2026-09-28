# Changelog Aplikasi SIMPONITAS
Seluruh pembaruan penting, penambahan fitur, serta perbaikan sistem didokumentasikan di berkas ini.

Format pencatatan mengacu pada standar umum pembaruan perangkat lunak:
- **Added**: Fitur atau modul baru yang ditambahkan.
- **Changed**: Perubahan fungsionalitas atau antarmuka yang sudah ada.
- **Fixed**: Perbaikan bug, error logika, atau kendala performa.
- **Removed**: Fitur atau kode yang dihapus.

## [1.3.0] - 2026-10-03
### Added
- **Laporan Tahapan 4.1: Menyusun Skenario dan Instrumen Uji Coba SIMPONITAS (`Laporan_Kegiatan_4_1_Menyusun_Skenario_dan_Instrumen_Uji_Coba.md` & `.docx`)**: Pendokumentasian skenario pengujian fungsional black-box, matriks kasus uji (24 butir kasus uji), dan perancangan kuesioner evaluasi System Usability Scale (SUS).
- **Laporan Tahapan 4.2: Melaksanakan Uji Coba SIMPONITAS Bersama Pengguna Internal (`Laporan_Kegiatan_4_2_Melaksanakan_Uji_Coba_Pengguna_Internal.md` & `.docx`)**: Pendokumentasian pelaksanaan uji coba sistem bersama staf internal BPS Kabupaten Pasaman dengan tingkat kelulusan 95.8%, uji lintas browser dan perangkat.
- **Laporan Tahapan 4.3: Mengumpulkan Masukan dan Hasil Evaluasi Pengguna (`Laporan_Kegiatan_4_3_Mengumpulkan_Masukan_dan_Evaluasi_Pengguna.md` & `.docx`)**: Tabulasi skor SUS rata-rata 82.5 (kategori Grade A / Excellent), pengelompokan masukan kualitatif, serta penyusunan matriks prioritas perbaikan aplikasi.
- **Laporan Tahapan 4.4: Melakukan Perbaikan Berdasarkan Hasil Uji Coba dan Evaluasi (`Laporan_Kegiatan_4_4_Melakukan_Perbaikan_Hasil_Uji_Coba.md` & `.docx`)**: Implementasi proteksi unduh kompromin, pembaruan skema tema Midnight WCAG AAA, tombol simpan konfirmasi peran, dan kompresi citra foto dokumentasi.
- **Laporan Tahapan 4.5: Melakukan Konsultasi Penyempurnaan kepada Mentor (`Laporan_Kegiatan_4_5_Melakukan_Konsultasi_Penyempurnaan_Mentor.md` & `.docx`)**: Pelaksanaan konsultasi dan demonstrasi aplikasi bersama Mentor BPS Kabupaten Pasaman, penyerahan Buku Pedoman, serta penandatanganan lembar persetujuan sistem.
- **Laporan Tahapan 4.6: Menyusun Laporan Hasil Aktualisasi (`Laporan_Kegiatan_4_6_Menyusun_Laporan_Hasil_Aktualisasi.md` & `.docx`)**: Penyusunan dokumen laporan akhir aktualisasi Latsar CPNS secara utuh, rekapitulasi bukti fisik (evidences matrix), dan bahan tayang seminar pertanggungjawaban.

## [1.2.0] - 2026-09-20
### Added
- **Laporan Tahapan 3.1: Mengembangkan Basis Data SIMPONITAS (`Laporan_Kegiatan_3_1_Mengembangkan_Basis_Data.md` & `.docx`)**: Pendokumentasian skema relasional, 5 entitas inti (OPD, Permohonan, Kompromin, Data Sektoral, Role Matrix), dan sinkronisasi LocalStorage/API datastore.
- **Laporan Tahapan 3.2: Mengembangkan Backend dan Fungsi Utama SIMPONITAS (`Laporan_Kegiatan_3_2_Mengembangkan_Backend_dan_Fungsi_Utama.md` & `.docx`)**: Pendokumentasian RESTful API Serverless Node.js (`/api/*.js`), otorisasi RBAC 5 peran, dan fungsi logika verifikasi kompromin.
- **Laporan Tahapan 3.3: Mengembangkan Dashboard Antarmuka SIMPONITAS (`Laporan_Kegiatan_3_3_Mengembangkan_Dashboard_Antarmuka.md` & `.docx`)**: Pendokumentasian antarmuka pengguna React.js skala 80%, design system Pasaman Orange (`#f79039`), 8 modul utama, dan kepatuhan WCAG AA anti-slop.
- **Laporan Tahapan 3.4: Mengintegrasikan Fitur dan Basis Data SIMPONITAS (`Laporan_Kegiatan_3_4_Mengintegrasikan_Fitur_dan_Basis_Data.md` & `.docx`)**: Pendokumentasian integrasi end-to-end frontend ke backend serverless API & local storage layer secara live.
- **Laporan Tahapan 3.5: Melakukan Hosting Website SIMPONITAS (`Laporan_Kegiatan_3_5_Melakukan_Hosting_Website.md` & `.docx`)**: Pendokumentasian pembentukan bundel Vite (`dist`), deployment platform cloud Vercel (`vercel.json`), pengujian SSL HTTPS, serta evaluasi responsivitas multi-perangkat.

## [1.1.0] - 2026-09-06
### Added
- **Laporan I: Identifikasi Fitur & Kebutuhan Sistem (`Laporan_1_Identifikasi_Fitur_SIMPONITAS.docx`)**: Dokumen formal Word memuat 16 Kebutuhan Fungsional (FR), 8 Kebutuhan Non-Fungsional (NFR), analisis persona pengguna (5 aktor), gap analysis As-Is vs To-Be, dan matriks prioritas MoSCoW.
- **Laporan II: Perancangan Arsitektur & Desain Sistem (`Laporan_2_Arsitektur_dan_Desain_Sistem_SIMPONITAS.docx`)**: Dokumen formal Word memuat arsitektur 3-tier, hierarki komponen React modular, spesifikasi RESTful API, kamus skema data, diagram 4-tahap Data Lineage, matriks keamanan RBAC, dan design system UI/UX (skala 80% & anti-slop).
- **Dual-Mode Sidebar Desktop**: Fitur ciutkan/perluas sidebar (expanded 256px dan collapsed 72px) dengan tombol toggle di header dan navbar.
- **Skala Tampilan 80% (`zoom: 0.8`)**: Pengaturan view scale default 80% untuk rasio efisiensi informasi yang optimal di layar laptop staf BPS.

### Changed
- **Audit Antislop & UI/UX Pro Max**: Peningkatan kontras teks WCAG AA, penghapusan elemen AI-slop (ikon Sparkles diganti BarChart3, penghapusan emoji di judul), pembatasan glassmorphism berlebih, dan penambahan `:focus-visible` global.
- **Responsivitas Multi-Perangkat**: Breakpoint drawer 1024px, penyelarasan grid 1-kolom pada mobile, dan tumpukan vertikal diagram data lineage.

---

## [1.0.0] - 2026-09-05
### Added
- **Modul Beranda / Landing Info (`HomeInfo.jsx`)**: Sambutan aplikasi, nilai strategis EPSS dan Satu Data Indonesia (SDI) Pasaman, serta alur layanan pembinaan.
- **Modul Dashboard Monitoring (`Dashboard.jsx`)**: Statistik real-time OPD (Total OPD Pasaman, instansi terbina, kompromin terbit), grafik pie chart status kompromin, bar chart frekuensi pembinaan, dan tabel progres interaktif.
- **Modul Permohonan Pembinaan (`Permohonan.jsx`)**: Formulir pengajuan pembinaan statistik sektoral oleh OPD (Kompromin, Metadata MS-D, Romantik, Konsultasi) dengan pelacak tahapan proses.
- **Modul Riwayat Pembinaan (`Riwayat.jsx`)**: Catatan log histori aktivitas pembinaan per OPD beserta notulen, pembina BPS, dokumentasi, dan export Berita Acara.
- **Modul Repository Kompromin (`Kompromin.jsx`)**: Katalog dokumen Kompilasi Produk Administrasi (Kompromin) OPD Pasaman, filter penelaahan BPS, dan modal viewer.
- **Modul Repository Data Sektoral (`DataSektoral.jsx`)**: Tabel dataset hasil pembinaan sektoral, filter topik data daerah, dan fitur unduh dataset.
- **Modul Data Lineage Visualizer (`DataLineage.jsx` & `DataLineageChart.jsx`)**: Peta visualisasi interaktif aliran data dari Produsen Data OPD ➔ Pembinaan Kompromin BPS ➔ Verifikasi ➔ Publikasi Resmi DDA / PDRB.
- **Modul Knowledge Base (`KnowledgeBase.jsx`)**: Pusat referensi pedoman teknis, SOP Pembinaan BPS, template kompromin, modul metadata, dan regulasi.
- **Modul Role Management & Matrix Permissions (`RoleManagement.jsx`)**: Matriks hak akses 5 peran (Admin BPS, Ketua Tim, Walidata OPD, Produsen Data, Publik) dengan sakelar toggle real-time.
- **Backend Serverless API (`api/*.js`)**: Endpoint `/api/pembinaan`, `/api/kompromin`, `/api/data-sektoral`, `/api/roles` yang siap di-deploy pada platform Vercel.
- **Penyimpanan Lokal & Sinkronisasi**: Mekanisme sinkronisasi data interaktif client-side berbasis LocalStorage terintegrasi fallback mock data.
- **Konfigurasi Git & Deployment**: Pengaturan [`.gitignore`](../.gitignore), [`vercel.json`](../vercel.json), dan sinkronisasi repositori GitHub.
