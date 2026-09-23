-- =============================================================================
-- SIMPONITAS BPS KABUPATEN PASAMAN - SUPABASE DATABASE SCHEMA & INITIAL SEED
-- Project ID: kbczdbqxsqksznjdhuup
-- Created on: 2026-09-24
-- =============================================================================

-- 1. DROP EXISTING TABLES (IF RE-RUNNING)
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS aliran_history CASCADE;
DROP TABLE IF EXISTS aliran_data CASCADE;
DROP TABLE IF EXISTS kompromin CASCADE;
DROP TABLE IF EXISTS pembinaan CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS roles CASCADE;
DROP TABLE IF EXISTS opd CASCADE;
DROP TABLE IF EXISTS knowledge_base CASCADE;

-- 2. CREATE TABLES

-- OPD (Organisasi Perangkat Daerah Kabupaten Pasaman)
CREATE TABLE opd (
    id TEXT PRIMARY KEY,
    nama TEXT NOT NULL,
    kode TEXT NOT NULL,
    penanggung_jawab TEXT,
    kontak TEXT,
    email TEXT,
    status TEXT DEFAULT 'Aktif',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Roles & Permissions (Role-Based Access Control)
CREATE TABLE roles (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    badge TEXT,
    permissions JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Users (Pengguna Sistem BPS & OPD)
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    nip TEXT NOT NULL UNIQUE,
    nama TEXT NOT NULL,
    email TEXT,
    instansi TEXT,
    opd_id TEXT REFERENCES opd(id) ON DELETE SET NULL,
    role_id TEXT REFERENCES roles(id) ON DELETE SET NULL,
    password TEXT DEFAULT 'bps1309pasaman',
    status TEXT DEFAULT 'Aktif',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Pembinaan (Layanan & Riwayat Pembinaan Statistik Sektoral)
CREATE TABLE pembinaan (
    id TEXT PRIMARY KEY,
    opd_id TEXT,
    opd_nama TEXT NOT NULL,
    jenis TEXT NOT NULL,
    topik TEXT NOT NULL,
    nama_pic TEXT,
    kontak TEXT,
    uraian_kebutuhan TEXT,
    catatan_tambahan TEXT,
    tanggal_usulan TEXT,
    tanggal_pelaksanaan TEXT,
    waktu_pembinaan TEXT,
    status TEXT NOT NULL DEFAULT 'Menunggu Persetujuan',
    lokasi TEXT,
    pembina_bps TEXT,
    perwakilan_opd TEXT,
    notulen TEXT,
    catatan_bps TEXT,
    dokumentasi_url TEXT,
    foto_list JSONB DEFAULT '[]'::jsonb,
    riwayat_perubahan JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Kompromin (Repository Dokumen Kompilasi Produk Administrasi)
CREATE TABLE kompromin (
    id TEXT PRIMARY KEY,
    judul TEXT NOT NULL,
    opd_id TEXT,
    opd_nama TEXT NOT NULL,
    tahun INTEGER NOT NULL,
    status_verifikasi TEXT NOT NULL DEFAULT 'Draft OPD',
    ringkasan TEXT,
    cover_url TEXT,
    cover_file_name TEXT,
    file_url TEXT,
    file_name TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Aliran Data (Indikator & Pelaporan Data Rutin Berkala)
CREATE TABLE aliran_data (
    id TEXT PRIMARY KEY,
    nama_indikator TEXT NOT NULL,
    deskripsi TEXT,
    opd_id TEXT,
    opd_nama TEXT NOT NULL,
    tahun INTEGER NOT NULL,
    jenis_periode TEXT NOT NULL DEFAULT 'Triwulan',
    bentuk_input TEXT,
    petunjuk_pengisian TEXT,
    tenggat_waktu TEXT,
    status_aktif BOOLEAN DEFAULT true,
    periodes JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Aliran History (Log Pencatatan Penginputan Data)
CREATE TABLE aliran_history (
    id TEXT PRIMARY KEY,
    opd_nama TEXT NOT NULL,
    nama_indikator TEXT NOT NULL,
    periode_nama TEXT NOT NULL,
    nilai_data TEXT,
    tanggal_input TEXT,
    pengguna TEXT,
    keterangan TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Knowledge Base (Pedoman, SOP, Template, Modul Regulasi)
CREATE TABLE knowledge_base (
    id TEXT PRIMARY KEY,
    judul TEXT NOT NULL,
    tipe TEXT NOT NULL,
    ukuran TEXT,
    tanggal TEXT,
    deskripsi TEXT,
    file_url TEXT,
    file_name TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Gallery (Dokumentasi Foto Kegiatan Pembinaan)
CREATE TABLE gallery (
    id TEXT PRIMARY KEY,
    pembinaan_id TEXT,
    judul_kegiatan TEXT NOT NULL,
    opd_id TEXT,
    opd_nama TEXT NOT NULL,
    tanggal TEXT,
    keterangan TEXT,
    foto_url TEXT,
    foto_file_name TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 3. ENABLE ROW LEVEL SECURITY (RLS) & POLICIES
ALTER TABLE opd ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE pembinaan ENABLE ROW LEVEL SECURITY;
ALTER TABLE kompromin ENABLE ROW LEVEL SECURITY;
ALTER TABLE aliran_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE aliran_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Allow full access for anon/authenticated (Public Client Read/Write Policy for SPA)
CREATE POLICY "Allow anon all opd" ON opd FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all roles" ON roles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all pembinaan" ON pembinaan FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all kompromin" ON kompromin FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all aliran_data" ON aliran_data FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all aliran_history" ON aliran_history FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all knowledge_base" ON knowledge_base FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon all gallery" ON gallery FOR ALL USING (true) WITH CHECK (true);

-- =============================================================================
-- 4. SEED INITIAL DATA (DATASET AWAL RESMI BPS PASAMAN)
-- =============================================================================

-- Master 23 OPD Kabupaten Pasaman
INSERT INTO opd (id, nama, kode, penanggung_jawab, kontak, email, status) VALUES
('opd-1', 'Dewan Perwakilan Rakyat Daerah Kabupaten Pasaman', 'DPRD', 'Sekretariat DPRD Pasaman', '0812-6789-0001', 'dprd@pasamankab.go.id', 'Aktif'),
('opd-2', 'Inspektorat', 'INSPEKTORAT', 'Inspektur Kabupaten Pasaman', '0812-6789-0002', 'inspektorat@pasamankab.go.id', 'Aktif'),
('opd-3', 'Dinas Pendidikan', 'DISDIK', 'Drs. H. Sukardi, M.Pd', '0811-2233-4455', 'disdik@pasamankab.go.id', 'Aktif'),
('opd-4', 'Dinas Kesehatan', 'DINKES', 'Dr. Hj. Rahmawati', '0812-6789-0011', 'dinkes@pasamankab.go.id', 'Aktif'),
('opd-5', 'Dinas Pekerjaan Umum dan Penataan Ruang', 'DPUPR', 'Hendri, ST, MT', '0821-3344-5566', 'pupr@pasamankab.go.id', 'Aktif'),
('opd-6', 'Dinas Perumahan Rakyat dan Kawasan Permukiman, Perhubungan dan Lingkungan Hidup', 'DPRKPLH', 'Ir. Piga Bugiarto', '0813-5566-7788', 'dprkplh@pasamankab.go.id', 'Aktif'),
('opd-7', 'Dinas Koperasi, Usaha Kecil Menengah, Perdagangan dan Tenaga Kerja', 'DISKUKMPTK', 'Drs. H. M. Ridwan', '0813-1112-1314', 'koperindag@pasamankab.go.id', 'Aktif'),
('opd-8', 'Dinas Pertanian', 'DISTAN', 'Ir. Afrizal, M.Si', '0813-7788-9900', 'pertanian@pasamankab.go.id', 'Aktif'),
('opd-9', 'Dinas Pariwisata, Pemuda, Olahraga, dan Kebudayaan', 'DISPARPORABUD', 'Ade Harlien, S.Sos, M.Si', '0812-2233-4409', 'disparporabud@pasamankab.go.id', 'Aktif'),
('opd-10', 'Dinas Pemberdayaan Masyarakat', 'DPM', 'Hasbullah, S.E', '0852-6677-8899', 'dpm@pasamankab.go.id', 'Aktif'),
('opd-11', 'Dinas Sosial', 'DINSOS', 'Bambang Utomo, S.Sos', '0812-4455-6677', 'dinsos@pasamankab.go.id', 'Aktif'),
('opd-12', 'Dinas Perikanan dan Pangan', 'DISKANPANG', 'Ir. H. Supriyadi', '0852-9900-1122', 'perikanan@pasamankab.go.id', 'Aktif'),
('opd-13', 'Dinas Komunikasi dan Informatika', 'DISKOMINFO', 'Anna Hanafiah, S.STP', '0852-9900-1122', 'diskominfo@pasamankab.go.id', 'Aktif'),
('opd-14', 'Dinas Pemberdayaan Perempuan, Perlindungan Anak, Pengendalian Penduduk dan KB', 'DP3AP2KB', 'Furqan, S.KM, M.Kes', '0813-4455-6614', 'dp3ap2kb@pasamankab.go.id', 'Aktif'),
('opd-15', 'Dinas Kependudukan dan Pencatatan Sipil', 'DISDUKCAPIL', 'Eka Syahputra, S.STP', '0813-8899-0011', 'disdukcapil@pasamankab.go.id', 'Aktif'),
('opd-16', 'Dinas Penanaman Modal, Pelayanan Terpadu Satu Pintu', 'DPMPTSP', 'Dra. Yusnimar', '0812-5566-7716', 'dpmptsp@pasamankab.go.id', 'Aktif'),
('opd-17', 'Dinas Perpustakaan dan Kearsipan', 'DISPUSIP', 'Drs. H. M. Yasir', '0813-6677-8817', 'dispusip@pasamankab.go.id', 'Aktif'),
('opd-18', 'Satuan Polisi Pamong Praja dan Pemadam Kebakaran', 'SATPOLPP-DAMKAR', 'Aan Afrinaldi, S.STP', '0812-7788-9918', 'satpolpp@pasamankab.go.id', 'Aktif'),
('opd-19', 'Badan Perencanaan Pembangunan Daerah', 'BAPPEDA', 'Drs. Choiruddin Batubara, M.Si', '0811-3344-5519', 'bappeda@pasamankab.go.id', 'Aktif'),
('opd-20', 'Badan Kepegawaian dan Pengembangan Sumber Daya Manusia', 'BKPSDM', 'H. Syahril, S.H', '0812-1314-1516', 'bkpsdm@pasamankab.go.id', 'Aktif'),
('opd-21', 'Badan Keuangan Daerah', 'BKD', 'Taufik, S.E, M.M', '0812-1011-1213', 'bkd@pasamankab.go.id', 'Aktif'),
('opd-22', 'Badan Kesatuan Bangsa dan Politik', 'BAKESBANGPOL', 'Afrizal, S.Sos', '0813-8899-0022', 'kesbangpol@pasamankab.go.id', 'Aktif'),
('opd-23', 'Badan Penanggulangan Bencana Daerah', 'BPBD', 'Alim Bazar, S.Sos', '0812-9900-1123', 'bpbd@pasamankab.go.id', 'Aktif')
ON CONFLICT (id) DO NOTHING;

-- Roles & Permissions Matrix
INSERT INTO roles (id, name, description, badge, permissions) VALUES
('role-admin', 'Tim Pembina BPS (Admin)', 'Akses penuh pengelolaan pembinaan, verifikasi Kompromin, approval permohonan, dan manajemen role.', 'Admin Central', '{"viewDashboard": true, "submitPembinaan": true, "approvePembinaan": true, "verifyKompromin": true, "manageDataSektoral": true, "accessKnowledgeBase": true, "manageKnowledgeBase": true, "manageRoles": true}'::jsonb),
('role-ketua-tim', 'Tim Statistik Sektoral BPS', 'Pengawasan progres pembinaan, persetujuan berita acara, dan analisis data sektoral.', 'Tim Sektoral BPS', '{"viewDashboard": true, "submitPembinaan": true, "approvePembinaan": true, "verifyKompromin": true, "manageDataSektoral": true, "accessKnowledgeBase": true, "manageKnowledgeBase": true, "manageRoles": false}'::jsonb),
('role-walidata-opd', 'Walidata OPD Pasaman', 'Akses untuk Dinas Kominfo/Walidata daerah dalam memantau kompromin & permohonan seluruh OPD Pasaman.', 'Walidata Pemkab', '{"viewDashboard": true, "submitPembinaan": true, "approvePembinaan": false, "verifyKompromin": false, "manageDataSektoral": true, "accessKnowledgeBase": true, "manageKnowledgeBase": false, "manageRoles": false}'::jsonb),
('role-produsen-opd', 'Produsen Data OPD Pasaman', 'Pengajuan permohonan pembinaan OPD, upload draft kompromin, dan penginputan data sektoral instansi.', 'OPD User', '{"viewDashboard": true, "submitPembinaan": true, "approvePembinaan": false, "verifyKompromin": false, "manageDataSektoral": true, "accessKnowledgeBase": true, "manageKnowledgeBase": false, "manageRoles": false}'::jsonb),
('role-publik', 'Pengguna Publik / Tamu', 'Akses membaca publikasi Kompromin terbit, data sektoral terverifikasi, dan materi pengetahuan.', 'Public Guest', '{"viewDashboard": true, "submitPembinaan": false, "approvePembinaan": false, "verifyKompromin": false, "manageDataSektoral": false, "accessKnowledgeBase": true, "manageKnowledgeBase": false, "manageRoles": false}'::jsonb)
ON CONFLICT (id) DO UPDATE SET permissions = EXCLUDED.permissions;

-- Users
INSERT INTO users (id, nip, nama, email, instansi, opd_id, role_id, password, status) VALUES
('usr-1', '198501012010011001', 'Ir. Ahmad Fadhil, M.Si', 'ahmad.fadhil@bps.go.id', 'BPS Kabupaten Pasaman', NULL, 'role-admin', 'bps1309pasaman', 'Aktif'),
('usr-2', '198702152012021002', 'Siti Rahmah, S.St, M.E', 'siti.rahmah@bps.go.id', 'Tim Statistik Sektoral BPS', NULL, 'role-ketua-tim', 'bps1309pasaman', 'Aktif'),
('usr-3', '199105102015021003', 'Rahmat Hidayat, SST', 'rahmat.hidayat@bps.go.id', 'Tim Statistik Sektoral BPS', NULL, 'role-ketua-tim', 'bps1309pasaman', 'Aktif'),
('usr-4', '198904122014031004', 'Drs. Hendra Utama', 'hendra.diskominfo@pasamankab.go.id', 'Dinas Komunikasi dan Informatika', 'opd-13', 'role-walidata-opd', 'bps1309pasaman', 'Aktif'),
('usr-5', '199208222016042005', 'Dr. Rina Kartika', 'rina.dinkes@pasamankab.go.id', 'Dinas Kesehatan', 'opd-4', 'role-produsen-opd', 'bps1309pasaman', 'Aktif')
ON CONFLICT (nip) DO NOTHING;

-- Initial Pembinaan
INSERT INTO pembinaan (id, opd_id, opd_nama, jenis, topik, nama_pic, kontak, uraian_kebutuhan, catatan_tambahan, tanggal_usulan, tanggal_pelaksanaan, waktu_pembinaan, status, lokasi, pembina_bps, perwakilan_opd, notulen, catatan_bps, dokumentasi_url) VALUES
('pem-101', 'opd-4', 'Dinas Kesehatan', 'Pendampingan Penyusunan Kompromin', 'Penyusunan Kompilasi Data Pelayanan Kesehatan Dasar & Stunting 2025', 'dr. Fitriani (Kabid SDK)', '081267890011', 'Pendampingan penyusunan dan sinkronisasi 14 indikator pelayanan kesehatan dasar puskesmas.', 'Mohon pendampingan tatap muka di Aula Dinkes.', '2026-08-10', '2026-08-18', '09:00 - 12:00 WIB', 'Selesai', 'Aula Dinas Kesehatan Pasaman', 'Muhammad Rafi Tasrif, S.Tr.Stat (Pranata Komputer)', 'dr. Fitriani (Kabid SDK)', 'Telah disepakati variabel standar Puskesmas, 14 indikator imunisasi dasar, serta format tabel Kompromin Kesehatan 2025.', 'Pembinaan selesai dilaksanakan dengan berita acara lengkap.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80'),
('pem-102', 'opd-8', 'Dinas Pertanian', 'Pembinaan Metadata Statistik (MS-D)', 'Pembinaan Metadata Variabel Komoditas Padi & Jagung Kecamatan Lubuk Sikaping', 'Ir. Ahmad Syafi’i (Kasi Produksi)', '081377889900', 'Harmonisasi definisi operasional dan kamus data variabel ubinan padi.', 'Membawa draft kamus data sektoral pertanian.', '2026-08-14', '2026-08-22', '10:00 - 12:30 WIB', 'Dalam Proses', 'Ruang Rapat BPS Kabupaten Pasaman', 'Muhammad Irfa’issurur (Statistisi Ahli)', 'Ir. Ahmad Syafi’i (Kasi Produksi)', 'Proses penyelarasan kamus data variabel luas panen & produktivitas ubinan padi.', 'Penetapan ulang tanggal disesuaikan dengan agenda rapat statistisi BPS.', 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80'),
('pem-103', 'opd-13', 'Dinas Komunikasi dan Informatika', 'Rekomendasi Kegiatan Statistik (Romantik)', 'Fasilitas Pengajuan Rekomendasi Survei Aksesibilitas Internet Perdesaan 2026', 'Anna Hanafiah, S.STP', '085299001122', 'Asistensi pemeriksaan rancangan instrumen kuesioner survei jaringan Nagari.', 'Dilakukan daring via Zoom Meeting.', '2026-08-18', '2026-08-28', '13:30 - 15:30 WIB', 'Disetujui', 'Daring (Zoom Meeting)', 'Martina Nurma Dewi, M.S.E (Coach / Statistisi)', 'Anna Hanafiah, S.STP (Kadis Kominfo)', 'Persiapan instrumen kuesioner dan alur pengajuan ke aplikasi Romantik BPS Pusat.', 'Jadwal pembinaan disetujui sesuai usulan OPD Kominfo.', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80'),
('pem-104', 'opd-3', 'Dinas Pendidikan', 'Konsultasi Teknis Sektoral', 'Harmonisasi Data Angka Partisipasi Murni (APM) & Fasilitas Sekolah SD/SMP', 'Drs. H. Sukardi, M.Pd', '081122334455', 'Konsultasi pengintegrasian data sekolah dengan metode survei sektoral.', 'Membawa laporan dapodik per semester.', '2026-09-10', '-', '09:00 - 11:30 WIB', 'Menunggu Persetujuan', 'Ruang Rapat BPS Kabupaten Pasaman', 'Tim Statistik Sektoral BPS Pasaman', 'Drs. H. Sukardi, M.Pd', 'Menunggu persetujuan jadwal dan disposisi tim pembina BPS.', 'Permohonan baru masuk, menunggu telaah ketua tim sektoral.', NULL)
ON CONFLICT (id) DO NOTHING;

-- Initial Kompromin Publications
INSERT INTO kompromin (id, judul, opd_id, opd_nama, tahun, status_verifikasi, ringkasan, cover_url, cover_file_name, file_url, file_name) VALUES
('kom-01', 'Kompilasi Data Pelayanan Kesehatan & Fasilitas Medis Kabupaten Pasaman 2025', 'opd-4', 'Dinas Kesehatan', 2025, 'Terverifikasi', 'Publikasi resmi hasil integrasi kompilasi produk administrasi dinas kesehatan mencakup 16 Puskesmas, 14 indikator imunisasi, data stunting nagari, dan ketersediaan tenaga medis di Pasaman.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80', 'cover_kompromin_kesehatan_2025.jpg', '/docs/kompromin_kesehatan_2025.pdf', 'kompromin_kesehatan_2025.pdf'),
('kom-02', 'Buku Data Komoditas Pertanian, Tanaman Pangan & Perkebunan Pasaman 2025', 'opd-8', 'Dinas Pertanian', 2025, 'Dalam Penelaahan', 'Rekapitulasi kompilasi data administrasi luas tanam, luas panen, dan estimasi produksi padi sawah, jagung, kelapa sawit, serta karet per nagari di 12 kecamatan.', 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80', 'cover_pertanian_2025.jpg', '/docs/draft_kompromin_pertanian.pdf', 'draft_kompromin_pertanian.pdf'),
('kom-03', 'Statistik Sektoral Infrastruktur Telekomunikasi & Akses Informasi Nagari 2025', 'opd-13', 'Dinas Komunikasi dan Informatika', 2025, 'Terverifikasi', 'Publikasi kompilasi data administrasi infrastruktur menara telekomunikasi, penetrasi sinyal 4G Nagari, dan indeks SPBE Kabupaten Pasaman.', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80', 'cover_kominfo_2025.jpg', '/docs/kompromin_kominfo_2025.pdf', 'kompromin_kominfo_2025.pdf'),
('kom-04', 'Rekapitulasi Sarana Prasarana Pendidikan dan Rasio Murid Guru 2025/2026', 'opd-3', 'Dinas Pendidikan', 2026, 'Draft OPD', 'Draft kompilasi data administrasi pendidikan formal dasar SD/SMP per kecamatan di Kabupaten Pasaman.', 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&auto=format&fit=crop&q=80', 'cover_pendidikan_draft.jpg', '/docs/draft_kompromin_disdik.pdf', 'draft_kompromin_disdik.pdf')
ON CONFLICT (id) DO NOTHING;

-- Initial Knowledge Base
INSERT INTO knowledge_base (id, judul, tipe, ukuran, tanggal, deskripsi, file_url, file_name) VALUES
('kb-1', 'SOP Pembinaan Statistik Sektoral BPS Pasaman', 'Pedoman Standar', '2.4 MB', '2026-01-15', 'Standar Operasional Prosedur pelaksanaan tahapan pendampingan OPD mulai dari pengajuan permohonan hingga terbit Kompromin.', '/docs/sop_pembinaan_bps.pdf', 'sop_pembinaan_bps.pdf'),
('kb-2', 'Template Baku Kompilasi Produk Administrasi (Kompromin)', 'Template Excel & Word', '1.8 MB', '2026-02-01', 'Format standar tabel, tata cara pengisian variabel, dan petunjuk penelaahan kualitas data administrasi OPD.', '/docs/template_kompromin_2026.xlsx', 'template_kompromin_2026.xlsx'),
('kb-3', 'Modul Metadata Statistik Struktur (MS-D & MS-I)', 'Buku Panduan', '4.5 MB', '2025-11-20', 'Panduan teknis penyusunan metadata kegiatan, metadata variabel, dan metadata indikator sesuai standar Satu Data Indonesia.', '/docs/modul_metadata_bps.pdf', 'modul_metadata_bps.pdf'),
('kb-4', 'Panduan Pengajuan Rekomendasi Kegiatan (Romantik)', 'Petunjuk Aplikasi', '3.1 MB', '2025-10-10', 'Tata cara pengajuan rekomendasi kegiatan statistik sektoral melalui portal Romantik BPS.', '/docs/panduan_romantik_bps.pdf', 'panduan_romantik_bps.pdf')
ON CONFLICT (id) DO NOTHING;

-- Initial Aliran Data
INSERT INTO aliran_data (id, nama_indikator, deskripsi, opd_id, opd_nama, tahun, jenis_periode, bentuk_input, petunjuk_pengisian, tenggat_waktu, status_aktif, periodes) VALUES
('ad-201', 'Jumlah Produksi Perkebunan', 'Jumlah hasil produksi komoditas perkebunan (kelapa sawit, karet, kakao, kopi, tebu, dll) dalam periode tertentu. Mendukung penyusunan PDRB Triwulanan dan Tabel SUT Regional.', 'opd-8', 'Dinas Pertanian', 2026, 'Triwulan', 'Angka (Ton) + Upload Dokumen', 'Lampirkan laporan rekapitulasi sub-sektor perkebunan.', '2026-11-05', true, '[
  {"periodeId": "tw-1", "periodeNama": "Triwulan I", "status": "Sudah Diinput", "nilaiData": "14,250 Ton", "dokumenUrl": "/docs/perkebunan_tw1.xlsx", "dokumenName": "perkebunan_tw1.xlsx", "catatanOpd": "Hasil produksi kelapa sawit & karet TW I.", "tanggalInput": "2026-05-04 10:15", "inputOleh": "Ir. Afrizal (Distan)"},
  {"periodeId": "tw-2", "periodeNama": "Triwulan II", "status": "Sudah Diinput", "nilaiData": "15,800 Ton", "dokumenUrl": "/docs/perkebunan_tw2.xlsx", "dokumenName": "perkebunan_tw2.xlsx", "catatanOpd": "Produksi kelapa sawit meningkat.", "tanggalInput": "2026-08-04 14:20", "inputOleh": "Ir. Afrizal (Distan)"},
  {"periodeId": "tw-3", "periodeNama": "Triwulan III", "status": "Belum Diinput", "nilaiData": "", "dokumenUrl": "", "dokumenName": "", "catatanOpd": "", "tanggalInput": "-", "inputOleh": "-"},
  {"periodeId": "tw-4", "periodeNama": "Triwulan IV", "status": "Belum Diinput", "nilaiData": "", "dokumenUrl": "", "dokumenName": "", "catatanOpd": "", "tanggalInput": "-", "inputOleh": "-"}
]'::jsonb),
('ad-202', 'Jumlah Produksi Peternakan', 'Jumlah hasil produksi komoditas peternakan (sapi, kerbau, domba, ayam, telur, dll) dalam periode tertentu. Mendukung penyusunan PDRB Triwulanan.', 'opd-8', 'Dinas Pertanian', 2026, 'Triwulan', 'Angka (Sesuai Jenis Ternak) + Upload Dokumen', 'Lampirkan laporan populasi & pemotongan ternak.', '2026-11-05', true, '[
  {"periodeId": "tw-1", "periodeNama": "Triwulan I", "status": "Sudah Diinput", "nilaiData": "2,450 Ekor / 120 Ton Telur", "dokumenUrl": "/docs/peternakan_tw1.xlsx", "dokumenName": "peternakan_tw1.xlsx", "catatanOpd": "Populasi sapi dan produksi telur TW I stabil.", "tanggalInput": "2026-05-06 09:40", "inputOleh": "Ir. Afrizal (Distan)"},
  {"periodeId": "tw-2", "periodeNama": "Triwulan II", "status": "Belum Diinput", "nilaiData": "", "dokumenUrl": "", "dokumenName": "", "catatanOpd": "", "tanggalInput": "-", "inputOleh": "-"},
  {"periodeId": "tw-3", "periodeNama": "Triwulan III", "status": "Belum Diinput", "nilaiData": "", "dokumenUrl": "", "dokumenName": "", "catatanOpd": "", "tanggalInput": "-", "inputOleh": "-"},
  {"periodeId": "tw-4", "periodeNama": "Triwulan IV", "status": "Belum Diinput", "nilaiData": "", "dokumenUrl": "", "dokumenName": "", "catatanOpd": "", "tanggalInput": "-", "inputOleh": "-"}
]'::jsonb),
('ad-203', 'Kunjungan Wisatawan Nusantara & Mancanegara', 'Jumlah wisatawan yang berkunjung ke objek wisata di Kabupaten Pasaman (Equator Bonjol, Museum Tuanku Imam Bonjol, dll).', 'opd-9', 'Dinas Pariwisata, Pemuda, Olahraga, dan Kebudayaan', 2026, 'Bulanan', 'Angka (Orang) + Upload Rekapitulasi', 'Format rekapitulasi per destinasi wisata unggulan.', '2026-10-15', true, '[
  {"periodeId": "bln-1", "periodeNama": "Januari", "status": "Sudah Diinput", "nilaiData": "4,120 Wisatawan", "dokumenUrl": "/docs/wisata_jan2026.pdf", "dokumenName": "wisata_jan2026.pdf", "catatanOpd": "Liburan tahun baru di Tugu Equator Bonjol.", "tanggalInput": "2026-02-05 11:20", "inputOleh": "Ade Harlien (Disparporabud)"},
  {"periodeId": "bln-2", "periodeNama": "Februari", "status": "Sudah Diinput", "nilaiData": "3,450 Wisatawan", "dokumenUrl": "/docs/wisata_feb2026.pdf", "dokumenName": "wisata_feb2026.pdf", "catatanOpd": "Kunjungan normal akhir pekan.", "tanggalInput": "2026-03-05 10:15", "inputOleh": "Ade Harlien (Disparporabud)"},
  {"periodeId": "bln-3", "periodeNama": "Maret", "status": "Belum Diinput", "nilaiData": "", "dokumenUrl": "", "dokumenName": "", "catatanOpd": "", "tanggalInput": "-", "inputOleh": "-"}
]'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Initial Gallery
INSERT INTO gallery (id, pembinaan_id, judul_kegiatan, opd_id, opd_nama, tanggal, keterangan, foto_url, foto_file_name) VALUES
('gal-1', 'pem-101', 'Penyusunan Kompilasi Data Pelayanan Kesehatan Dasar & Stunting 2025', 'opd-4', 'Dinas Kesehatan', '2026-08-18', 'Rapat koordinasi dan penelaahan variabel standar Puskesmas & 14 indikator imunisasi dasar.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80', 'foto_pembinaan_dinkes_1.jpg'),
('gal-2', 'pem-102', 'Pembinaan Metadata Variabel Komoditas Padi & Jagung', 'opd-8', 'Dinas Pertanian', '2026-08-22', 'Asistensi teknis penyusunan kamus data dan definisi operasional ubinan padi.', 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80', 'foto_pembinaan_pertanian_1.jpg'),
('gal-3', 'pem-103', 'Fasilitas Pengajuan Rekomendasi Survei Aksesibilitas Internet Nagari', 'opd-13', 'Dinas Komunikasi dan Informatika', '2026-08-28', 'Pembinaan daring Zoom Meeting asistensi kuesioner portal Romantik BPS.', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80', 'foto_pembinaan_kominfo_1.jpg')
ON CONFLICT (id) DO NOTHING;
