# LAPORAN TAHAPAN KEGIATAN 3.1: MENGEMBANGKAN BASIS DATA SIMPONITAS
**Badan Pusat Statistik (BPS) Kabupaten Pasaman - Provinsi Sumatera Barat**
*Sinergi Pembinaan Statistik Sektoral melalui Penerbitan Kompromin Akurat dan Berkualitas*

---

## 📌 Identitas Tahapan Kegiatan
- **Tahapan Kegiatan**: Tahapan Kegiatan 3.1: Mengembangkan Basis Data SIMPONITAS
- **Tanggal Pelaksanaan**: 07 - 09 September 2026
- **Pengembang / Pelaksana**: Muhammad Rafi Tasrif, S.Tr.Stat (Pranata Komputer Ahli Pertama)
- **Output Utama**: Rancangan Skema Data, Kamus Data Entitas, dan Sinkronisasi LocalStorage & Serverless API Datastore

---

## 1. Latar Belakang & Tujuan Tahapan Kegiatan
Dalam mendukung efektivitas pembinaan statistik sektoral dan pengelolaan Kompilasi Produk Administrasi (Kompromin) di Kabupaten Pasaman, ketersediaan struktur basis data yang terorganisir, konsisten, dan scalable merupakan fondasi utama. Pengembangan basis data SIMPONITAS dirancang untuk memetakan hubungan entitas antara Organisasi Perangkat Daerah (OPD), alur permohonan pembinaan, dokumen kompromin, dataset sektoral, rekam jejak lineage data, serta kontrol hak akses pengguna berbasis peran (RBAC).

---

## 2. Langkah-Langkah Pelaksanaan & Logika Implementasi
- **1. Analisis Kebutuhan Data Pembinaan**:
  Identifikasi variabel inti yang dibutuhkan oleh BPS Kabupaten Pasaman dan OPD, mencakup data identitas OPD, permohonan pembinaan, catatan notulen, status kompromin, serta matriks hak akses 5 peran.

- **2. Perancangan Model Data Relasional & NoSQL Hybrid**:
  Merancang skema data JSON yang efisien untuk pengisian cepat di sisi client (LocalStorage state) serta struktur koleksi data untuk RESTful API Backend Node.js.

- **3. Pembuatan Skema Entitas Inti SIMPONITAS**:
  Mendefinisikan 5 tabel/koleksi utama: OPD Pasaman, Permohonan Pembinaan, Repository Kompromin, Dataset Sektoral, dan Matriks Role Permissions.

- **4. Implementasi Mechanism Fallback & Persistent Storage**:
  Menyusun helper JavaScript untuk penanganan default state, validasi masukan data, dan sinkronisasi otomatis antara memory state dan browser LocalStorage.

### 📊 Tabel Rincian Spesifikasi & Artefak Hasil Tahapan

| Nama Tabel / Entitas | Atribut / Kolom Kunci | Tipe Data | Deskripsi & Keterangan |
| :--- | :--- | :--- | :--- |
| opd_pasaman | id, nama_opd, kategori, walidata, status_bina | JSON / Object | Daftar 20 Instansi OPD Kabupaten Pasaman & status pembinaan. |
| permohonan_pembinaan | id, opd_id, jenis_layanan, tgl_pengajuan, status, pembina_bps | JSON / Object | Merekam pengajuan pembinaan (Kompromin, MS-D, Romantik, Konsultasi). |
| kompromin_repo | id, judul_dokumen, opd_id, status_verifikasi, file_url, tgl_terbit | JSON / Object | Katalog dokumen kompromin OPD Pasaman dan status penelaahan BPS. |
| data_sektoral | id, nama_dataset, opd_produsen, topik, format, jml_record | JSON / Object | Dataset sektoral hasil pembinaan yang siap diunduh. |
| role_permissions | role_id, role_name, accessDashboard, submitPermohonan, verifyKompromin | JSON / Object | Matriks konfigurasi sakelar otorisasi hak akses pengguna. |


---

## 3. Hasil dan Output Tahapan Kegiatan
Basis Data SIMPONITAS berhasil dikembangkan dengan skema yang kokoh dan fleksibel. Seluruh entitas data terstruktur dengan jelas, mendukung pengisian offline via LocalStorage dan siap diintergrasikan secara seamless dengan backend serverless Node.js.

---

## 4. Keterkaitan dengan Nilai-Nilai Dasar ASN (BerAKHLAK)
- **Nilai Akuntabel**: Memastikan integritas, keabsahan, dan validitas skema data pembinaan statistik sektoral agar tidak terjadi duplikasi atau manipulasi data.
- **Nilai Kompeten**: Menerapkan standar pemodelan data modern yang fleksibel dan efisien untuk mendukung kebutuhan kinerja tinggi.
- **Nilai Adaptif**: Mengadopsi pendekatan hybrid datastore (LocalStorage + Serverless API Fallback) untuk menjamin keberlanjutan akses sistem.


---

## 5. Kesimpulan dan Rencana Tindak Lanjut
Tahapan pengembangan basis data SIMPONITAS telah terlaksana dengan sempurna. Struktur skema data yang dihasilkan menjadi fondasi utama untuk pengembangan backend dan antarmuka pada tahapan berikutnya.
