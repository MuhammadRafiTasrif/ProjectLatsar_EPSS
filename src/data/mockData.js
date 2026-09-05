export const INITIAL_OPD_LIST = [
  { id: 'opd-1', nama: 'Dinas Kesehatan Kabupaten Pasaman', kode: 'DINKES', penanggungJawab: 'Dr. Hj. Rahmawati', email: 'dinkes@pasamankab.go.id', statusKompromin: 'Terverifikasi', totalPembinaan: 5, komprominCount: 2 },
  { id: 'opd-2', nama: 'Dinas Pendidikan & Kebudayaan Pasaman', kode: 'DISDIK', penanggungJawab: 'Drs. H. Sukardi, M.Pd', email: 'disdik@pasamankab.go.id', statusKompromin: 'Terverifikasi', totalPembinaan: 4, komprominCount: 2 },
  { id: 'opd-3', nama: 'Dinas Pertanian Kabupaten Pasaman', kode: 'DISTAN', penanggungJawab: 'Ir. Afrizal, M.Si', email: 'pertanian@pasamankab.go.id', statusKompromin: 'Dalam Review', totalPembinaan: 6, komprominCount: 1 },
  { id: 'opd-4', nama: 'Dinas Komunikasi dan Informatika Pasaman', kode: 'DISKOMINFO', penanggungJawab: 'Anna Hanafiah, S.STP', email: 'diskominfo@pasamankab.go.id', statusKompromin: 'Terverifikasi', totalPembinaan: 8, komprominCount: 3 },
  { id: 'opd-5', nama: 'Dinas Pekerjaan Umum & Penataan Ruang', kode: 'PUPR', penanggungJawab: 'Hendri, ST, MT', email: 'pupr@pasamankab.go.id', statusKompromin: 'Draft OPD', totalPembinaan: 3, komprominCount: 1 },
  { id: 'opd-6', nama: 'Dinas Sosial Kabupaten Pasaman', kode: 'DINSOS', penanggungJawab: 'Bambang Utomo, S.Sos', email: 'dinsos@pasamankab.go.id', statusKompromin: 'Terverifikasi', totalPembinaan: 4, komprominCount: 1 },
  { id: 'opd-7', nama: 'Dinas Perumahan Rakyat & Kawasan Permukiman', kode: 'DPRKPLH', penanggungJawab: 'Ir. Piga Bugiarto', email: 'dprkplh@pasamankab.go.id', statusKompromin: 'Dalam Review', totalPembinaan: 3, komprominCount: 1 },
  { id: 'opd-8', nama: 'Dinas Pemberdayaan Masyarakat & Desa (DPMD)', kode: 'DPMD', penanggungJawab: 'Hasbullah, S.E', email: 'dpmd@pasamankab.go.id', statusKompromin: 'Draft OPD', totalPembinaan: 2, komprominCount: 0 },
  { id: 'opd-9', nama: 'Dinas Perhubungan Kabupaten Pasaman', kode: 'DISHUB', penanggungJawab: 'M. Ali, S.H', email: 'dishub@pasamankab.go.id', statusKompromin: 'Terverifikasi', totalPembinaan: 3, komprominCount: 1 },
  { id: 'opd-10', nama: 'Dinas Kependudukan & Catatan Sipil', kode: 'DISDUKCAPIL', penanggungJawab: 'Eka Syahputra, S.STP', email: 'disdukcapil@pasamankab.go.id', statusKompromin: 'Terverifikasi', totalPembinaan: 5, komprominCount: 2 }
];

export const INITIAL_PEMBINAAN_LIST = [
  {
    id: 'pem-101',
    opdId: 'opd-1',
    opdNama: 'Dinas Kesehatan Kabupaten Pasaman',
    jenis: 'Pendampingan Penyusunan Kompromin',
    topik: 'Penyusunan Kompilasi Data Pelayanan Kesehatan Dasar & Stunting 2025',
    tanggalUsulan: '2026-08-10',
    tanggalPelaksanaan: '2026-08-18',
    status: 'Selesai',
    lokasi: 'Aula Dinas Kesehatan Pasaman',
    pembinaBPS: 'Muhammad Rafi Tasrif, S.Tr.Stat (Pranata Komputer)',
    perwakilanOPD: 'dr. Fitriani (Kabid SDK)',
    notulen: 'Telah disepakati variabel standar Puskesmas, 14 indikator imunisasi dasar, serta format tabel Kompromin Kesehatan 2025.',
    dokumentasiUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'pem-102',
    opdId: 'opd-3',
    opdNama: 'Dinas Pertanian Kabupaten Pasaman',
    jenis: 'Pembinaan Metadata Statistik (MS-D)',
    topik: 'Pembinaan Metadata Variabel Komoditas Padi & Jagung Kecamatan Lubuk Sikaping',
    tanggalUsulan: '2026-08-14',
    tanggalPelaksanaan: '2026-08-22',
    status: 'Dalam Proses',
    lokasi: 'Ruang Rapat BPS Kabupaten Pasaman',
    pembinaBPS: 'Muhammad Irfa’issurur (Statistisi Ahli)',
    perwakilanOPD: 'Ir. Ahmad Syafi’i (Kasi Produksi)',
    notulen: 'Proses penyelarasan kamus data variabel luas panen & produktivitas ubinan padi.',
    dokumentasiUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'pem-103',
    opdId: 'opd-4',
    opdNama: 'Dinas Komunikasi dan Informatika Pasaman',
    jenis: 'Rekomendasi Kegiatan Statistik (Romantik)',
    topik: 'Fasilitas Pengajuan Rekomendasi Survei Aksesibilitas Internet Perdesaan 2026',
    tanggalUsulan: '2026-08-18',
    tanggalPelaksanaan: '2026-08-28',
    status: 'Dijadwalkan',
    lokasi: 'Daring (Zoom Meeting)',
    pembinaBPS: 'Martina Nurma Dewi, M.S.E (Coach / Statistisi)',
    perwakilanOPD: 'Anna Hanafiah, S.STP (Kadis Kominfo)',
    notulen: 'Persiapan instrumen kuisioner dan alur pengajuan ke aplikasi Romantik BPS Pusat.',
    dokumentasiUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'pem-104',
    opdId: 'opd-2',
    opdNama: 'Dinas Pendidikan & Kebudayaan Pasaman',
    jenis: 'Konsultasi Teknis Sektoral',
    topik: 'Harmonisasi Data Angka Partisipasi Murni (APM) & Fasilitas Sekolah SD/SMP',
    tanggalUsulan: '2026-08-20',
    tanggalPelaksanaan: '2026-09-02',
    status: 'Permohonan Masuk',
    lokasi: 'Ruang Rapat Disdik Pasaman',
    pembinaBPS: 'Tim Statistik Sektoral BPS Pasaman',
    perwakilanOPD: 'Drs. H. Sukardi, M.Pd',
    notulen: 'Menunggu persetujuan tim pembina BPS.',
    dokumentasiUrl: ''
  }
];

export const INITIAL_KOMPROMIN_LIST = [
  {
    id: 'komp-01',
    judul: 'Kompilasi Produk Administrasi Kesehatan Kabupaten Pasaman Tahun 2025',
    opdId: 'opd-1',
    opdNama: 'Dinas Kesehatan Kabupaten Pasaman',
    tahun: 2025,
    statusVerifikasi: 'Terverifikasi',
    nomorSk: 'SK-KOMPROMIN/DINKES/2025-09',
    tanggalTerbit: '2025-11-15',
    jumlahTabel: 24,
    ringkasan: 'Menghimpun data rekapitulasi tenaga medis, fasilitas kesehatan (Puskesmas/Pustu), cakupan imunisasi, dan derajat kesehatan masyarakat se-Kabupaten Pasaman.',
    fileUrl: '/docs/kompromin_kesehatan_2025.pdf'
  },
  {
    id: 'komp-02',
    judul: 'Kompilasi Produk Administrasi Pendidikan & Kebudayaan Pasaman 2025',
    opdId: 'opd-2',
    opdNama: 'Dinas Pendidikan & Kebudayaan Pasaman',
    tahun: 2025,
    statusVerifikasi: 'Terverifikasi',
    nomorSk: 'SK-KOMPROMIN/DISDIK/2025-10',
    tanggalTerbit: '2025-12-01',
    jumlahTabel: 18,
    ringkasan: 'Data sektoral cakupan jumlah sekolah, rasio guru dan murid SD/SMP, kondisi sarana prasarana sekolah, serta penerima bantuan pendidikan.',
    fileUrl: '/docs/kompromin_pendidikan_2025.pdf'
  },
  {
    id: 'komp-03',
    judul: 'Kompilasi Produk Administrasi Tanaman Pangan & Hortikultura Pasaman 2025',
    opdId: 'opd-3',
    opdNama: 'Dinas Pertanian Kabupaten Pasaman',
    tahun: 2025,
    statusVerifikasi: 'Dalam Review',
    nomorSk: 'DRAFT-KOMPROMIN/DISTAN/2026-01',
    tanggalTerbit: '-',
    jumlahTabel: 15,
    ringkasan: 'Rekapitulasi luas tanam, luas panen, estimasi produksi jagung, padi, dan komoditas unggulan daerah di 12 kecamatan.',
    fileUrl: '/docs/kompromin_pertanian_draft.pdf'
  },
  {
    id: 'komp-04',
    judul: 'Kompilasi Produk Administrasi TIK & Infrastruktur Digital Pasaman 2025',
    opdId: 'opd-4',
    opdNama: 'Dinas Komunikasi dan Informatika Pasaman',
    tahun: 2025,
    statusVerifikasi: 'Terverifikasi',
    nomorSk: 'SK-KOMPROMIN/KOMINFO/2025-12',
    tanggalTerbit: '2025-12-20',
    jumlahTabel: 12,
    ringkasan: 'Data cakupan menara telekomunikasi (BTS), jangkauan sinyal internet per nagari, serta pemanfaatan e-Government Pemkab Pasaman.',
    fileUrl: '/docs/kompromin_kominfo_2025.pdf'
  }
];

export const INITIAL_DATA_SEKTORAL = [
  { id: 'ds-1', indikator: 'Jumlah Rumah Sakit & Puskesmas Rawat Inap', OPD: 'Dinas Kesehatan', nilai: '1 RSUD, 16 Puskesmas', satuan: 'Unit', tahun: 2025, kategori: 'Kesehatan' },
  { id: 'ds-2', indikator: 'Angka Partisipasi Murni (APM) SD/MI', OPD: 'Dinas Pendidikan', nilai: '98.42', satuan: 'Persen (%)', tahun: 2025, kategori: 'Pendidikan' },
  { id: 'ds-3', indikator: 'Produksi Padi Sawah Kabupaten Pasaman', OPD: 'Dinas Pertanian', nilai: '142,850', satuan: 'Ton GKG', tahun: 2025, kategori: 'Pertanian' },
  { id: 'ds-4', indikator: 'Jumlah Nagari Terjangkau Sinyal 4G', OPD: 'Dinas Kominfo', nilai: '58 dari 62', satuan: 'Nagari', tahun: 2025, kategori: 'Komunikasi' },
  { id: 'ds-5', indikator: 'Panjang Jalan Kabupaten Kondisi Baik', OPD: 'Dinas PUPR', nilai: '412.80', satuan: 'Kilometer (Km)', tahun: 2025, kategori: 'Infrastruktur' }
];

export const INITIAL_KNOWLEDGE_BASE = [
  { id: 'kb-1', judul: 'SOP Pembinaan Statistik Sektoral BPS Pasaman', tipe: 'Pedoman Standar', ukuran: '2.4 MB', tanggal: '2026-01-15', deskripsi: 'Standar Operasional Prosedur pelaksanaan tahapan pendampingan OPD mulai dari pengajuan permohonan hingga terbit Kompromin.' },
  { id: 'kb-2', judul: 'Template Baku Kompilasi Produk Administrasi (Kompromin)', tipe: 'Template Excel & Word', ukuran: '1.8 MB', tanggal: '2026-02-01', deskripsi: 'Format standar tabel, tata cara pengisian variabel, dan petunjuk penelaahan kualitas data administrasi OPD.' },
  { id: 'kb-3', judul: 'Modul Metadata Statistik Struktur (MS-D & MS-I)', tipe: 'Buku Panduan', ukuran: '4.5 MB', tanggal: '2025-11-20', deskripsi: 'Panduan teknis penyusunan metadata kegiatan, metadata variabel, dan metadata indikator sesuai standar Satu Data Indonesia.' },
  { id: 'kb-4', judul: 'Panduan Pengajuan Rekomendasi Kegiatan (Romantik)', tipe: 'Petunjuk Aplikasi', ukuran: '3.1 MB', tanggal: '2025-10-10', deskripsi: 'Tata cara pengajuan rekomendasi kegiatan statistik sektoral melalui portal Romantik BPS.' }
];

// Initial Role Permissions Matrix with Toggle Switch states
export const INITIAL_ROLE_MANAGEMENT = {
  roles: [
    {
      id: 'role-admin',
      name: 'Tim Pembina BPS (Admin)',
      description: 'Akses penuh pengelolaan pembinaan, verifikasi Kompromin, approval permohonan, dan manajemen role.',
      badge: 'Admin Central',
      permissions: {
        viewDashboard: true,
        submitPembinaan: true,
        approvePembinaan: true,
        verifyKompromin: true,
        manageDataSektoral: true,
        accessKnowledgeBase: true,
        manageRoles: true,
        exportData: true
      }
    },
    {
      id: 'role-ketua-tim',
      name: 'Ketua Tim Statistik Sektoral',
      description: 'Pengawasan progres pembinaan, persetujuan berita acara, dan analisis data sektoral.',
      badge: 'Supervisor BPS',
      permissions: {
        viewDashboard: true,
        submitPembinaan: true,
        approvePembinaan: true,
        verifyKompromin: true,
        manageDataSektoral: true,
        accessKnowledgeBase: true,
        manageRoles: false,
        exportData: true
      }
    },
    {
      id: 'role-walidata-opd',
      name: 'Walidata OPD Pasaman',
      description: 'Akses untuk Dinas Kominfo/Walidata daerah dalam memantau kompromin seluruh OPD Pasaman.',
      badge: 'Walidata Pemkab',
      permissions: {
        viewDashboard: true,
        submitPembinaan: true,
        approvePembinaan: false,
        verifyKompromin: false,
        manageDataSektoral: true,
        accessKnowledgeBase: true,
        manageRoles: false,
        exportData: true
      }
    },
    {
      id: 'role-produsen-opd',
      name: 'Produsen Data OPD (Dinas)',
      description: 'Pengajuan permohonan pembinaan OPD, upload draft kompromin, dan penginputan data sektoral instansi.',
      badge: 'OPD User',
      permissions: {
        viewDashboard: true,
        submitPembinaan: true,
        approvePembinaan: false,
        verifyKompromin: false,
        manageDataSektoral: false,
        accessKnowledgeBase: true,
        manageRoles: false,
        exportData: false
      }
    },
    {
      id: 'role-publik',
      name: 'Pengguna Publik / Tamu',
      description: 'Akses membaca publikasi Kompromin terbit, data sektoral terverifikasi, dan materi pengetahuan.',
      badge: 'Public Guest',
      permissions: {
        viewDashboard: true,
        submitPembinaan: false,
        approvePembinaan: false,
        verifyKompromin: false,
        manageDataSektoral: false,
        accessKnowledgeBase: true,
        manageRoles: false,
        exportData: false
      }
    }
  ],
  permissionLabels: {
    viewDashboard: 'Lihat Dashboard Analytics & KPI',
    submitPembinaan: 'Pengajuan Permohonan Pembinaan Baru',
    approvePembinaan: 'Persetujuan & Penjadwalan Pembinaan (BPS)',
    verifyKompromin: 'Verifikasi & Penerbitan Dokumen Kompromin',
    manageDataSektoral: 'Kelola & Update Dataset Data Sektoral',
    accessKnowledgeBase: 'Akses & Unduh Modul Knowledge Base',
    manageRoles: 'Akses Laman Manajemen Role & Hak Akses',
    exportData: 'Cetak Berita Acara & Ekspor Data (PDF/CSV)'
  }
};
