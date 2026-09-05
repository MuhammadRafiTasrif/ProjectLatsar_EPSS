# Changelog Aplikasi SIMPONITAS
Seluruh pembaruan penting, penambahan fitur, serta perbaikan sistem didokumentasikan di berkas ini.

Format pencatatan mengacu pada standar umum pembaruan perangkat lunak:
- **Added**: Fitur atau modul baru yang ditambahkan.
- **Changed**: Perubahan fungsionalitas atau antarmuka yang sudah ada.
- **Fixed**: Perbaikan bug, error logika, atau kendala performa.
- **Removed**: Fitur atau kode yang dihapus.

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
