# Changelog Aplikasi SIMPONITAS
Seluruh pembaruan penting, penambahan fitur, serta perbaikan sistem didokumentasikan di berkas ini.

Format pencatatan mengacu pada standar umum pembaruan perangkat lunak:
- **Added**: Fitur atau modul baru yang ditambahkan.
- **Changed**: Perubahan fungsionalitas atau antarmuka yang sudah ada.
- **Fixed**: Perbaikan bug, error logika, atau kendala performa.
- **Removed**: Fitur atau kode yang dihapus.

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
