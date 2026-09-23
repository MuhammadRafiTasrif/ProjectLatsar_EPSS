# 📁 Panduan & Indeks Laporan Perkembangan Fitur
## Sistem Informasi SIMPONITAS - BPS Kabupaten Pasaman
*Sinergi Pembinaan Statistik Sektoral melalui Penerbitan Kompromin Akurat dan Berkualitas*

Folder ini berfungsi sebagai **rekam jejak dokumentasi berkala** untuk setiap penambahan, perbaikan, atau perubahan fitur pada aplikasi SIMPONITAS. Setiap kali ada perubahan atau pengembangan baru, laporan perubahan dicatat di folder ini agar rapi dan mudah dijadikan bukti dukung (evidence) laporan aktualisasi Latsar CPNS BPS.

---

### 🗂️ Struktur Folder
```text
laporan-perkembangan/
├── README.md                      # Petunjuk dan daftar indeks laporan
├── CHANGELOG.md                   # Rekapitulasi versi & timeline perubahan
├── TEMPLATE_LAPORAN_FITUR.md      # Format standar penulisan laporan perubahan fitur
└── 2026-09-05_inisialisasi-awal.md # Dokumen rekam jejak rilis awal sistem SIMPONITAS
```

---

### 📋 Indeks Laporan Perubahan Fitur

| No | Tanggal | Versi / Rilis | Nama Modul / Fitur | Berkas Laporan | Penulis / Pengembang |
|:---:|:---:|:---:|:---|:---|:---|
| 1 | 05 Sep 2026 | v1.0.0 | **Rilis Awal & Modul Inti SIMPONITAS** (Dashboard, Permohonan, Riwayat, Kompromin, Data Sektoral, Data Lineage, Knowledge Base, Role Matrix, API) | [`2026-09-05_inisialisasi-awal.md`](./2026-09-05_inisialisasi-awal.md) | Muhammad Rafi Tasrif |
| 2 | 06 Sep 2026 | v1.1.0 | **Laporan I: Identifikasi Kebutuhan & Fitur Aplikasi** (16 Kebutuhan Fungsional, 8 Non-Fungsional, Persona, MoSCoW) | [`Laporan_1_Identifikasi_Fitur_SIMPONITAS.docx`](../laporan/Laporan_1_Identifikasi_Fitur_SIMPONITAS.docx) | Muhammad Rafi Tasrif |
| 3 | 06 Sep 2026 | v1.1.0 | **Laporan II: Perancangan Arsitektur & Desain Sistem** (3-Tier, Komponen React, Model Data, Data Lineage, RBAC, UI/UX 80%) | [`Laporan_2_Arsitektur_dan_Desain_Sistem_SIMPONITAS.docx`](../laporan/Laporan_2_Arsitektur_dan_Desain_Sistem_SIMPONITAS.docx) | Muhammad Rafi Tasrif |
| 4 | 09 Sep 2026 | v1.2.0 | **Tahapan 3.1: Mengembangkan Basis Data SIMPONITAS** (Skema Entitas, LocalStorage State & Serverless API Datastore) | [`Laporan_Kegiatan_3_1_Mengembangkan_Basis_Data.md`](../laporan/Laporan_Kegiatan_3_1_Mengembangkan_Basis_Data.md) / [`.docx`](../laporan/Laporan_Kegiatan_3_1_Mengembangkan_Basis_Data.docx) | Muhammad Rafi Tasrif |
| 5 | 12 Sep 2026 | v1.2.0 | **Tahapan 3.2: Mengembangkan Backend & Fungsi Utama** (Node.js Serverless API `/api/*.js`, RBAC Logic, Endpoint Handler) | [`Laporan_Kegiatan_3_2_Mengembangkan_Backend_dan_Fungsi_Utama.md`](../laporan/Laporan_Kegiatan_3_2_Mengembangkan_Backend_dan_Fungsi_Utama.md) / [`.docx`](../laporan/Laporan_Kegiatan_3_2_Mengembangkan_Backend_dan_Fungsi_Utama.docx) | Muhammad Rafi Tasrif |
| 6 | 15 Sep 2026 | v1.2.0 | **Tahapan 3.3: Mengembangkan Dashboard Antarmuka** (React UI/UX 80% Scale, 8 Modul System, WCAG AA & Anti-Slop) | [`Laporan_Kegiatan_3_3_Mengembangkan_Dashboard_Antarmuka.md`](../laporan/Laporan_Kegiatan_3_3_Mengembangkan_Dashboard_Antarmuka.md) / [`.docx`](../laporan/Laporan_Kegiatan_3_3_Mengembangkan_Dashboard_Antarmuka.docx) | Muhammad Rafi Tasrif |
| 7 | 17 Sep 2026 | v1.2.0 | **Tahapan 3.4: Mengintegrasikan Fitur & Basis Data** (End-to-End Dynamic Wiring, Real-Time Permission Controls) | [`Laporan_Kegiatan_3_4_Mengintegrasikan_Fitur_dan_Basis_Data.md`](../laporan/Laporan_Kegiatan_3_4_Mengintegrasikan_Fitur_dan_Basis_Data.md) / [`.docx`](../laporan/Laporan_Kegiatan_3_4_Mengintegrasikan_Fitur_dan_Basis_Data.docx) | Muhammad Rafi Tasrif |
| 8 | 20 Sep 2026 | v1.2.0 | **Tahapan 3.5: Melakukan Hosting Website SIMPONITAS** (Vercel Serverless Cloud Deployment, Vite Build, SSL HTTPS) | [`Laporan_Kegiatan_3_5_Melakukan_Hosting_Website.md`](../laporan/Laporan_Kegiatan_3_5_Melakukan_Hosting_Website.md) / [`.docx`](../laporan/Laporan_Kegiatan_3_5_Melakukan_Hosting_Website.docx) | Muhammad Rafi Tasrif |

---

### ⚙️ Aturan Penamaan Berkas Laporan Baru
Setiap kali ada fitur baru atau modifikasi signifikan:
1. Buat berkas baru di dalam folder ini menggunakan format:
   `YYYY-MM-DD_nama-fitur-singkat.md`
   *(Contoh: `2026-09-10_integrasi-notifikasi-whatsapp.md`)*
2. Gunakan panduan dan struktur dari [`TEMPLATE_LAPORAN_FITUR.md`](./TEMPLATE_LAPORAN_FITUR.md).
3. Tambahkan baris baru pada tabel indeks di atas dan perbarui [`CHANGELOG.md`](./CHANGELOG.md).
