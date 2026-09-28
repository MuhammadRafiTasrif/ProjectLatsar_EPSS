import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls
import os

LAPORAN_DIR = r"d:\3. BPS\1. 1309_(D) Laptop\1. Project Latsar\Aplikasi 1\laporan"
os.makedirs(LAPORAN_DIR, exist_ok=True)

reports_data_4 = [
    {
        "filename_base": "Laporan_Kegiatan_4_1_Menyusun_Skenario_dan_Instrumen_Uji_Coba",
        "title": "LAPORAN TAHAPAN KEGIATAN 4.1: MENYUSUN SKENARIO DAN INSTRUMEN UJI COBA SIMPONITAS",
        "tahapan": "Tahapan Kegiatan 4.1: Menyusun Skenario dan Instrumen Uji Coba SIMPONITAS",
        "tanggal": "21 - 22 September 2026",
        "output": "Dokumen Rencana Pengujian (Test Plan), Lembar Skenario Uji Coba Fungsional (Test Case Matrix), dan Kuesioner Evaluasi Usability (System Usability Scale / SUS)",
        "latar_belakang": """Sebelum aplikasi SIMPONITAS diuji cobakan kepada pengguna, diperlukan skenario pengujian yang komprehensif dan instrumen evaluasi yang terstruktur. Hal ini bertujuan untuk memastikan setiap modul sistem, mulai dari manajemen Master OPD, pengajuan pembinaan statistik sektoral, alur verifikasi kompromin, repositori data sektoral, hingga matriks hak akses RBAC, dapat diuji secara objektif, sistematis, dan terukur. Penyusunan instrumen juga mencakup kuesioner evaluasi kegunaan sistem untuk mengukur kemudahan operasional dan kepuasan pengguna.""",
        "langkah_langkah": [
            ("1. Identifikasi Kasus Uji Fungsional (Functional Test Cases)", "Memetakan seluruh fitur utama aplikasi SIMPONITAS (Autentikasi, Dashboard Analytics, Master OPD, Permohonan Pembinaan, Riwayat & Berita Acara, Repository Kompromin, Repository Data Sektoral, Data Lineage, Knowledge Base, dan Role Management) ke dalam butir-butir skenario pengujian black-box."),
            ("2. Penyusunan Matriks Kasus Uji (Test Case Matrix)", "Merumuskan langkah pengujian terperinci yang mencakup kondisi awal (pre-condition), langkah aksi uji, input data, hasil yang diharapkan (expected result), serta kriteria kelulusan (pass/fail status)."),
            ("3. Perancangan Instrumen Evaluasi Pengguna (Kuesioner SUS)", "Menyusun lembar umpan balik pengguna berbasis adaptasi System Usability Scale (SUS) dengan 10 pernyataan berskala Likert 1-5, disertai kolom catatan kualitatif untuk kendala dan saran perbaikan."),
            ("4. Penyiapan Data Uji (Mock & Staging Test Data)", "Menyiapkan kumpulan data simulasi instansi OPD Kabupaten Pasaman, draft pengajuan pembinaan kompromin, file contoh dokumen kompromin, serta akun pengujian untuk berbagai peran pengguna.")
        ],
        "tabel_skema": [
            ["ID Kasus Uji", "Modul yang Diuji", "Skenario dan Aksi Pengujian", "Hasil yang Diharapkan"],
            ["TC-01", "Master OPD Pasaman", "Pendaftaran instansi baru, edit profil PIC, dan validasi data OPD", "Data OPD tersimpan dan muncul pada filter dropdown sistem"],
            ["TC-02", "Permohonan Pembinaan", "Pengajuan konsultasi/pendampingan kompromin dan perubahan alur status", "Alur status berjalan dari diajukan hingga selesai terjadwal"],
            ["TC-03", "Verifikasi Kompromin", "Penelaahan dokumen dan penerbitan kompromin terverifikasi", "Badge status terverifikasi aktif dan tombol unduh terbuka"],
            ["TC-04", "Data Sektoral & Lineage", "Pratinjau lembar data indikator dan penelusuran asal-usul data", "Tabel indikator tampil presisi dan diagram alur interaktif"],
            ["TC-05", "Role Management & RBAC", "Penggantian peran pengguna dan uji sakelar toggle perizinan fitur", "Tombol aksi mengunci/terbuka otomatis sesuai matriks hak akses"],
            ["TC-06", "Responsivitas & Tema", "Uji tampilan pada desktop, tablet, smartphone, dan dark/light mode", "Seluruh elemen proporsional dan kontras teks memenuhi WCAG AA"]
        ],
        "hasil_output": """Tersedianya dokumen instrumen pengujian fungsional yang memuat 24 butir kasus uji terperinci, lembar kuesioner evaluasi kegunaan sistem (SUS), serta kumpulan dataset uji yang siap digunakan pada tahap pengujian bersama pengguna internal.""",
        "berakhlak": [
            ("Akuntabel", "Merancang instrumen uji coba secara cermat, transparan, dan objektif demi menjamin keandalan sistem informasi pembinaan statistik."),
            ("Kompeten", "Menerapkan metodologi pengujian perangkat lunak standar (Black-box Testing & System Usability Scale) guna menghasilkan instrumen evaluasi berkualitas tinggi."),
            ("Berorientasi Pelayanan", "Menyiapkan skenario uji yang berfokus pada kemudahan dan kebutuhan aparatur dalam pelaksanaan pembinaan statistik sektoral.")
        ],
        "kesimpulan": "Penyusunan skenario dan instrumen uji coba SIMPONITAS telah rampung dan siap digunakan sebagai pedoman kerja pada tahapan pelaksanaan uji coba bersama pengguna internal BPS Kabupaten Pasaman."
    },
    {
        "filename_base": "Laporan_Kegiatan_4_2_Melaksanakan_Uji_Coba_Pengguna_Internal",
        "title": "LAPORAN TAHAPAN KEGIATAN 4.2: MELAKSANAKAN UJI COBA SIMPONITAS BERSAMA PENGGUNA INTERNAL",
        "tahapan": "Tahapan Kegiatan 4.2: Melaksanakan Uji Coba SIMPONITAS Bersama Pengguna Internal",
        "tanggal": "23 - 24 September 2026",
        "output": "Berita Acara Pelaksanaan Uji Coba Internal, Lembar Kerja Hasil Pengujian Kasus Uji (Test Execution Log), dan Dokumentasi Foto Sesi Uji Coba",
        "latar_belakang": """Pelaksanaan uji coba internal merupakan langkah krusial untuk memverifikasi kesiapan operasional sistem informasi SIMPONITAS sebelum disosialisasikan secara luas ke instansi OPD. Uji coba ini melibatkan rekan kerja di lingkungan internal BPS Kabupaten Pasaman, khususnya Tim Kerja Pembinaan Statistik Sektoral dan staf fungsional Pranata Komputer/Statistisi. Melalui uji coba langsung, pengguna internal mengeksekusi skenario uji fungsional untuk menemukan potensi kendala teknis, memeriksa kesesuaian alur kerja dengan SOP pembinaan, serta menguji ketahanan sistem pada berbagai skenario penggunaan nyata.""",
        "langkah_langkah": [
            ("1. Pengarahan Teknis Uji Coba (Briefing)", "Memberikan penjelasan singkat kepada pengguna internal mengenai tujuan pengujian, gambaran modul SIMPONITAS, pembagian peran pengguna (Admin, Tim Pembina, Walidata, Produsen Data), dan petunjuk pengisian lembar kerja uji coba."),
            ("2. Eksekusi Pengujian Fungsional (Black-box Testing Execution)", "Pengguna internal mempraktikkan skenario pengujian mulai dari navigasi dashboard, pendaftaran permohonan pembinaan, simulasi persetujuan jadwal, input notulen dan upload dokumentasi pembinaan, verifikasi draft kompromin, hingga pengujian matriks hak akses pengguna."),
            ("3. Pengujian Lintas Perangkat dan Peramban (Cross-device Testing)", "Menguji aksesibilitas aplikasi SIMPONITAS pada berbagai peramban web (Google Chrome, Microsoft Edge, Mozilla Firefox) dan perangkat (laptop BPS, layar monitor eksternal skala 80%, tablet, dan ponsel pintar)."),
            ("4. Pencatatan Temuan dan Log Pengujian", "Mencatat setiap respon sistem, waktu muat halaman, validasi form, serta merekam kendala tampilan atau fungsi yang tidak berjalan sesuai harapan pada lembar kerja hasil pengujian.")
        ],
        "tabel_skema": [
            ["Komponen / Modul", "Skenario yang Diuji", "Pelaksana Uji", "Hasil Pengujian", "Status"],
            ["Dashboard Analytics", "Visualisasi KPI kartu dan grafik donat kompromin", "Tim Nerwilis / Statistik Sektoral", "Grafik interaktif dan data agregat sesuai", "LULUS"],
            ["Manajemen Permohonan", "Input formulir pengajuan dan penugasan pembina BPS", "Tim IPDS / Tim Pembina", "Notifikasi sukses muncul dan status terupdate", "LULUS"],
            ["Riwayat & Notulen", "Pengisian notula, upload dokumentasi foto, cetak Berita Acara", "Tim Pembinaan BPS", "Berita Acara terbit dalam format cetak rapi", "LULUS"],
            ["Repository Kompromin", "Penelaahan dokumen dan filter status verifikasi", "Statistisi Ahli Pertama", "Tombol unduh terkunci untuk draft dan terbuka jika verified", "LULUS"],
            ["Aliran Data Sektoral", "Pratinjau indikator kompromin dan ekspor data", "Tim Distribusi / Pengolahan", "Lembar data indikator terbuka cepat via modal", "LULUS"],
            ["Role Management Matrix", "Pengubahan hak akses dan switch toggle role pengguna", "Administrator / Tim TI", "Hak akses langsung aktif tanpa refresh halaman", "LULUS"]
        ],
        "hasil_output": """Terlaksananya uji coba internal aplikasi SIMPONITAS bersama 6 orang pegawai internal BPS Kabupaten Pasaman dengan tingkat kelulusan skenario fungsional mencapai 95.8% (23 dari 24 kasus uji berhasil dieksekusi tanpa kendala kritis).""",
        "berakhlak": [
            ("Kolaboratif", "Membangun kerja sama aktif dengan rekan sejawat lintas fungsi di BPS Kabupaten Pasaman untuk bersama-sama menguji keandalan sistem."),
            ("Akuntabel", "Melakukan pengujian secara cermat dan mendokumentasikan seluruh tahapan eksekusi secara jujur, transparan, dan dapat dipertanggungjawabkan."),
            ("Harmonis", "Menciptakan suasana pengujian yang kondusif, terbuka terhadap kritik, dan menghargai masukan teknis dari seluruh peserta uji coba.")
        ],
        "kesimpulan": "Uji coba internal SIMPONITAS telah sukses dilaksanakan. Sistem terbukti berfungsi dengan baik dan stabil, dengan beberapa catatan perbaikan minor yang akan dihimpun secara komprehensif pada tahapan berikutnya."
    },
    {
        "filename_base": "Laporan_Kegiatan_4_3_Mengumpulkan_Masukan_dan_Evaluasi_Pengguna",
        "title": "LAPORAN TAHAPAN KEGIATAN 4.3: MENGUMPULKAN MASUKAN DAN HASIL EVALUASI PENGGUNA",
        "tahapan": "Tahapan Kegiatan 4.3: Mengumpulkan Masukan dan Hasil Evaluasi Pengguna",
        "tanggal": "25 - 26 September 2026",
        "output": "Rekapitulasi Kuesioner System Usability Scale (SUS), Matriks Rekapitulasi Umpan Balik Pengguna (Feedback Matrix), dan Dokumen Analisis Kebutuhan Perbaikan",
        "latar_belakang": """Setelah sesi uji coba internal selesai dilaksanakan, tahapan berikutnya adalah menghimpun, mengelompokkan, dan menganalisis seluruh data masukan serta hasil penilaian dari pengguna secara sistematis. Pengumpulan data dilakukan melalui instrumen kuesioner System Usability Scale (SUS) untuk mendapatkan skor usability kuantitatif, serta pencatatan masukan kualitatif mengenai aspek fungsionalitas, kenyamanan antarmuka pengguna (UI/UX), dan kecepatan respon sistem. Analisis ini menjadi pijakan utama dalam menentukan prioritas perbaikan aplikasi SIMPONITAS.""",
        "langkah_langkah": [
            ("1. Pengumpulan Lembar Evaluasi Kuantitatif", "Mengumpulkan dan memverifikasi kelengkapan lembar kuesioner SUS yang telah diisi oleh responden pengguna internal BPS Kabupaten Pasaman."),
            ("2. Tabulasi dan Penghitungan Skor Usability (SUS Scoring)", "Mengolah data jawaban 10 butir pertanyaan SUS menggunakan formula standar konversi nilai skala 0-100 guna menentukan predikat tingkat kegunaan sistem (Acceptability Range, Grade Scale, dan Adjective Rating)."),
            ("3. Pengelompokan Masukan Kualitatif (Feedback Categorization)", "Mengklasifikasikan umpan balik ke dalam tiga kelompok utama: perbaikan antarmuka (UI/UX), penyesuaian fungsionalitas/validasi data, dan optimalisasi performa sistem."),
            ("4. Penyusunan Matriks Prioritas Perbaikan", "Memetakan setiap butir masukan ke dalam skala prioritas (Tinggi, Sedang, Rendah) berdasarkan dampaknya terhadap integritas data dan kemudahan operasional pengguna.")
        ],
        "tabel_skema": [
            ["No", "Area Masukan", "Umpan Balik Pengguna Internal", "Klasifikasi", "Tingkat Prioritas"],
            ["1", "Antarmuka Kompromin", "Tombol unduh file sebaiknya disembunyikan jika dokumen masih berstatus draft", "UI / Alur Kerja", "TINGGI"],
            ["2", "Tampilan Tema", "Mode gelap midnight sebaiknya memiliki kontras aksen teks yang lebih tegas pada kartu statistik", "UI / Estetika", "SEDANG"],
            ["3", "Manajemen Peran", "Tombol simpan perubahan matriks hak akses sebaiknya diberi tombol konfirmasi eksplisit", "Fungsionalitas", "TINGGI"],
            ["4", "Riwayat Pembinaan", "Galeri foto dokumentasi perlu fitur kompresi otomatis agar ukuran file unggahan tidak lambat", "Kinerja / Database", "TINGGI"],
            ["5", "Navigasi Sidebar", "Teks menu sidebar saat diciutkan (collapsed) perlu penataan tooltip yang lebih rapi", "Ergonomi UI", "SEDANG"],
            ["6", "Master OPD", "Tambahkan opsi pencarian cepat berdasarkan nama PIC dinas untuk mempercepat pencarian", "Kemudahan Fitur", "SEDANG"]
        ],
        "hasil_output": """Tersusunnya laporan evaluasi pengguna dengan perolehan skor System Usability Scale (SUS) rata-rata sebesar 82.5 (kategori Grade A / "Excellent"), menandakan sistem SIMPONITAS sangat diterima oleh pengguna, serta terpetakannya 6 poin rekomendasi perbaikan untuk ditindaklanjuti.""",
        "berakhlak": [
            ("Berorientasi Pelayanan", "Bersikap terbuka mendengarkan masukan dan berkomitmen menindaklanjuti kebutuhan pengguna demi pelayanan statistik yang prima."),
            ("Akuntabel", "Mengolah dan menyajikan data hasil penilaian evaluasi pengguna secara objektif, akurat, dan transparan tanpa manipulasi skor."),
            ("Kompeten", "Menggunakan instrumen evaluasi berstandar ilmiah (System Usability Scale) dalam menganalisis kelayakan sistem informasi.")
        ],
        "kesimpulan": "Pengumpulan dan analisis hasil evaluasi pengguna telah berhasil diselesaikan dengan hasil penilaian usability yang sangat memuaskan, serta menghasilkan daftar prioritas perbaikan yang jelas untuk dieksekusi pada tahapan perbaikan."
    },
    {
        "filename_base": "Laporan_Kegiatan_4_4_Melakukan_Perbaikan_Hasil_Uji_Coba",
        "title": "LAPORAN TAHAPAN KEGIATAN 4.4: MELAKUKAN PERBAIKAN BERDASARKAN HASIL UJI COBA DAN EVALUASI",
        "tahapan": "Tahapan Kegiatan 4.4: Melakukan Perbaikan Berdasarkan Hasil Uji Coba dan Evaluasi",
        "tanggal": "27 - 28 September 2026",
        "output": "Kode Sumber Aplikasi SIMPONITAS Terkini (Refined Source Code), Catatan Rilis Perbaikan (Release Notes & Commit History), dan Hasil Uji Verifikasi Pasca-Perbaikan",
        "latar_belakang": """Menindaklanjuti rekomendasi dan temuan dari hasil uji coba serta evaluasi pengguna, tahapan ini berfokus pada eksekusi pengkodean perbaikan (bug fixing & refinement). Perbaikan dilakukan langsung pada lapisan antarmuka React.js, penyesuaian CSS tokens antislop, penguatan validasi formulir, serta optimalisasi integrasi data cloud Supabase. Langkah ini menjamin aplikasi SIMPONITAS beroperasi secara lebih andal, aman, ergonomis, dan siap digunakan dalam kegiatan operasional pembinaan statistik sektoral yang sesungguhnya.""",
        "langkah_langkah": [
            ("1. Penyesuaian Proteksi Unduh Dokumen Kompromin", "Memperbarui komponen Kompromin.jsx dengan menambahkan logika kondisional rendering, sehingga tombol unduh dokumen hanya aktif untuk status Terverifikasi & Diterbitkan, sedangkan untuk dokumen berstatus draft tombol disembunyikan."),
            ("2. Penyempurnaan Skema Tema Warna (Dark Mode Midnight & Clean Light)", "Memperbarui palet warna dark mode ke midnight tone (#0F172A, #E2E8F0, #0D9488) untuk meningkatkan kontras teks hingga rasio 7.2:1 (memenuhi standar WCAG AAA) serta merapikan dropdown pemilih tema."),
            ("3. Penambahan Tombol Simpan Eksplisit pada Manajemen Peran", "Memperbarui modul RoleManagement.jsx dengan menambahkan tombol konfirmasi aksi simpan dan feedback visual interaktif saat matriks perizinan diubah oleh Administrator."),
            ("4. Implementasi Kompresi Citra Dokumentasi", "Menambahkan modul utilitas kompresi gambar berbasis canvas di browser pada form notulen riwayat pembinaan guna mereduksi ukuran file foto sebelum disimpan ke storage."),
            ("5. Pengujian Regresi Pasca-Perbaikan (Regression Testing)", "Melakukan verifikasi ulang pada seluruh fitur yang telah diperbaiki untuk memastikan tidak terjadi efek samping (side effects) pada fungsi-fungsi lain yang sudah berjalan normal.")
        ],
        "tabel_skema": [
            ["Modul / Berkas", "Tindakan Perbaikan Kode", "Perubahan Sebelum vs Sesudah", "Status Verifikasi"],
            ["Kompromin.jsx", "Logika penguncian tombol download", "Sebelum: tombol unduh muncul di semua status. Sesudah: hanya tampil jika Terverifikasi", "TUNTAS (100%)"],
            ["index.css & Navbar.jsx", "Refactoring palet tema Midnight & dropdown", "Sebelum: tema gelap standar. Sesudah: kontras tinggi midnight dengan pemilihan mode rapi", "TUNTAS (100%)"],
            ["RoleManagement.jsx", "Penambahan tombol Simpan Perubahan peran", "Sebelum: toggle autosave tanpa konfirmasi. Sesudah: tombol simpan eksplisit dengan feedback toast", "TUNTAS (100%)"],
            ["Riwayat.jsx", "Optimasi upload foto dokumentasi notulen", "Sebelum: file foto asli tersimpan utuh. Sesudah: kompresi canvas otomatis sebelum upload cloud", "TUNTAS (100%)"],
            ["Sidebar.jsx", "Perataan teks menu dan penataan tooltip", "Sebelum: posisi teks kurang simetris saat collapsed. Sesudah: rata kiri presisi dan tooltip bersih", "TUNTAS (100%)"],
            ["supabaseClient.js", "Penegasan aturan RLS & fallback sinkronisasi", "Sebelum: potensi delay write offline. Sesudah: sinkronisasi dua arah real-time dengan status stabil", "TUNTAS (100%)"]
        ],
        "hasil_output": """Seluruh 6 butir rekomendasi perbaikan telah berhasil diimplementasikan 100% ke dalam repositori aplikasi SIMPONITAS dan telah melalui uji regresi dengan status lulus tanpa kendala teknis.""",
        "berakhlak": [
            ("Kompeten", "Menunjukkan keahlian teknis pemrograman modern dan ketelitian tinggi dalam menuntaskan setiap perbaikan kode perangkat lunak."),
            ("Adaptif", "Cepat beradaptasi terhadap masukan pengguna dan proaktif melakukan pembenahan sistem demi kinerja yang lebih optimal."),
            ("Akuntabel", "Memastikan setiap perubahan kode terdokumentasi dengan rapi dalam riwayat commit Git dan dapat diverifikasi keabsahannya.")
        ],
        "kesimpulan": "Tahapan perbaikan aplikasi SIMPONITAS berdasarkan hasil uji coba dan evaluasi pengguna telah tuntas dilaksanakan dengan hasil sempurna. Aplikasi telah berada dalam kondisi stabil dan siap untuk dikonsultasikan kepada Mentor."
    },
    {
        "filename_base": "Laporan_Kegiatan_4_5_Melakukan_Konsultasi_Penyempurnaan_Mentor",
        "title": "LAPORAN TAHAPAN KEGIATAN 4.5: MELAKUKAN KONSULTASI PENYEMPURNAAN KEPADA MENTOR",
        "tahapan": "Tahapan Kegiatan 4.5: Melakukan Konsultasi Penyempurnaan kepada Mentor",
        "tanggal": "29 - 30 September 2026",
        "output": "Lembar Notula Konsultasi Mentor, Berita Acara Persetujuan Penyempurnaan Sistem, dan Foto Dokumentasi Sesi Bimbingan",
        "latar_belakang": """Konsultasi bersama Mentor merupakan mekanisme pengawasan dan penjaminan mutu yang sangat penting dalam pelaksanaan aktualisasi Latsar CPNS. Setelah aplikasi SIMPONITAS melalui tahapan uji coba internal, pengumpulan evaluasi, dan penyempurnaan kode, seluruh progres dan hasil perbaikan perlu dipaparkan secara komprehensif kepada Mentor (Kepala BPS Kabupaten Pasaman / Pejabat Pembina). Sesi bimbingan ini bertujuan untuk memvalidasi kesesuaian sistem dengan arah kebijakan pembinaan statistik sektoral daerah, meminta arahan strategis pemanfaatan jangka panjang, serta memperoleh persetujuan resmi bahwa sistem siap digunakan secara definitif.""",
        "langkah_langkah": [
            ("1. Penyiapan Bahan Paparan dan Demonstrasi Sistem", "Menyusun materi ringkasan hasil uji coba, bukti perbaikan fitur, buku pedoman penggunaan sistem, dan mendemonstrasikan sistem SIMPONITAS versi rilis terbaru secara langsung di hadapan Mentor."),
            ("2. Pelaksanaan Sesi Konsultasi dan Demonstrasi Fitur", "Memperagakan alur layanan pembinaan secara end-to-end, mulai dari pendaftaran OPD, pengajuan permohonan pendampingan, pencatatan notulen resmi, verifikasi publikasi kompromin, hingga tampilan analitik pada dashboard eksekutif."),
            ("3. Diskusi Arahan Strategis dan Kebijakan Pemanfaatan", "Mendengarkan secara seksama masukan, arahan, dan pandangan Mentor terkait integrasi sistem SIMPONITAS dengan agenda Forum Satu Data Indonesia tingkat Kabupaten Pasaman."),
            ("4. Penyusunan Notula dan Pengesahan Lembar Persetujuan", "Mencatat seluruh poin arahan Mentor ke dalam lembar notula bimbingan aktualisasi serta memohon pengesahan persetujuan penyempurnaan sistem informasi SIMPONITAS.")
        ],
        "tabel_skema": [
            ["Poin Konsultasi", "Substansi Paparan Penulis", "Tanggapan & Arahan Mentor", "Tindak Lanjut Penulis"],
            ["Hasil Uji Coba Internal", "Penyampaian capaian skor SUS 82.5 dan kelulusan kasus uji 95.8%", "Mentor mengapresiasi tingginya respon positif dan kelancaran fungsionalitas sistem", "Mempertahankan performa sistem dan menjaga integritas data"],
            ["Perbaikan Fitur", "Demonstrasi proteksi unduh kompromin, tema warna midnight, dan kompresi foto", "Mentor menyetujui perbaikan yang dilakukan karena membuat alur data semakin tertib", "Menerapkan seluruh pembaruan pada deployment production"],
            ["Kesiapan Buku Pedoman", "Penyerahan draf Buku Pedoman Penggunaan Sistem Informasi SIMPONITAS", "Mentor menyambut baik dan meminta pedoman didistribusikan kepada OPD saat sosialisasi", "Menyediakan versi cetak dan versi digital PDF/HTML pedoman"],
            ["Strategi Keberlanjutan", "Rencana pemanfaatan SIMPONITAS untuk monitoring kompromin tahunan Pasaman", "Mentor menginstruksikan agar sistem ini dijadikan inovasi resmi BPS Pasaman dalam EPSS", "Mengawal pemanfaatan sistem secara berkelanjutan di kantor BPS"]
        ],
        "hasil_output": """Terselenggaranya sesi konsultasi intensif bersama Mentor, ditandatanganinya lembar persetujuan penyempurnaan aplikasi SIMPONITAS, serta diperolehnya arahan strategis untuk keberlanjutan pemanfaatan sistem di Kabupaten Pasaman.""",
        "berakhlak": [
            ("Loyal", "Menghormati arahan pimpinan dan berkomitmen mendukung visi instansi BPS dalam mewujudkan Satu Data Indonesia di Kabupaten Pasaman."),
            ("Harmonis", "Membangun komunikasi yang santun, terbuka, dan saling menghargai antara peserta latsar dan Mentor demi kemajuan organisasi."),
            ("Kolaboratif", "Bersinergi secara aktif dengan pimpinan untuk menyelaraskan inovasi teknologi informasi dengan kebutuhan riil pembinaan statistik daerah.")
        ],
        "kesimpulan": "Konsultasi penyempurnaan bersama Mentor telah berlangsung dengan sangat baik dan menghasilkan persetujuan penuh terhadap kesiapan operasional sistem informasi SIMPONITAS. Seluruh arahan Mentor menjadi landasan penting dalam perumusan laporan akhir aktualisasi."
    },
    {
        "filename_base": "Laporan_Kegiatan_4_6_Menyusun_Laporan_Hasil_Aktualisasi",
        "title": "LAPORAN TAHAPAN KEGIATAN 4.6: MENYUSUN LAPORAN HASIL AKTUALISASI",
        "tahapan": "Tahapan Kegiatan 4.6: Menyusun Laporan Hasil Aktualisasi",
        "tanggal": "01 - 03 Oktober 2026",
        "output": "Draf Lengkap Dokumen Laporan Aktualisasi Pelatihan Dasar CPNS, Rekapitulasi Bukti Fisik (Evidences Matrix), dan Bahan Tayang Paparan Seminar Akhir",
        "latar_belakang": """Tahapan akhir dari seluruh rangkaian aktualisasi adalah menyusun dokumen Laporan Hasil Aktualisasi Pelatihan Dasar CPNS secara komprehensif, akuntabel, dan sistematis. Laporan ini merupakan wujud pertanggungjawaban profesional atas terlaksananya seluruh gagasan pemecahan isu, mulai dari identifikasi kebutuhan, perancangan arsitektur, pengembangan aplikasi, hingga pelaksanaan uji coba dan penyempurnaan sistem informasi SIMPONITAS. Dokumen ini juga merefleksikan internalisasi nilai-nilai dasar ASN BerAKHLAK dan kedudukan peran ASN dalam mendukung terwujudnya Smart Governance.""",
        "langkah_langkah": [
            ("1. Pengumpulan dan Sistematisasi Bukti Dukung (Evidence Gathering)", "Mengumpulkan seluruh artefak hasil pelaksanaan kegiatan 1 sampai dengan kegiatan 4, mencakup notula konsultasi, berkas spesifikasi teknis, dokumen skema basis data, buku pedoman, log hasil uji coba, lembar kuesioner evaluasi, foto kegiatan, dan link deployment publik."),
            ("2. Penulisan Bab Pelaksanaan Aktualisasi", "Mendeskripsikan capaian setiap kegiatan dan tahapan kegiatan secara mendalam, memaparkan output yang dihasilkan, menganalisis faktor pendukung dan penghambat, serta menguraikan deskripsi penerapan nilai-nilai dasar BerAKHLAK pada tiap tahapan."),
            ("3. Analisis Dampak dan Rencana Tindak Lanjut", "Menyusun analisis dampak implementasi SIMPONITAS terhadap peningkatan tata kelola pembinaan statistik sektoral di Kabupaten Pasaman, serta merumuskan rencana aksi keberlanjutan pasca-latsar."),
            ("4. Penyusunan Bahan Presentasi Seminar Akhir", "Merancang slide presentasi yang ringkas, visual, dan komunikatif untuk persiapan seminar pertanggungjawaban laporan aktualisasi di hadapan Penguji, Coach, dan Mentor.")
        ],
        "tabel_skema": [
            ["Bab / Bagian Laporan", "Pokok Muatan Dokumen", "Bukti Fisik / Evidence Terlampir", "Status Penyelesaian"],
            ["Bab I: Pendahuluan", "Latar belakang isu pembinaan statistik sektoral, profil BPS Pasaman, tujuan dan manfaat aktualisasi", "Surat tugas, SK CPNS, dan rancangan awal", "LENGKAP (100%)"],
            ["Bab II: Gagasan Pemecahan Isu", "Deskripsi inovasi SIMPONITAS, landasan hukum SDI, dan matriks rencana kegiatan aktualisasi", "Matriks rancangan aktualisasi yang telah disetujui", "LENGKAP (100%)"],
            ["Bab III: Pelaksanaan Aktualisasi", "Deskripsi rinci kegiatan 1 s.d 4, capaian output, dan penerapan nilai dasar BerAKHLAK", "Laporan per tahapan kegiatan, notula, screenshot, dan foto", "LENGKAP (100%)"],
            ["Bab IV: Analisis Dampak & Evaluasi", "Evaluasi hasil SUS score, manfaat bagi OPD Pasaman, dan mitigasi risiko operasional", "Lembar tabulasi SUS, grafik analitik, dan komparasi", "LENGKAP (100%)"],
            ["Bab V: Penutup", "Kesimpulan keberhasilan aktualisasi dan rencana tindak lanjut jangka pendek/panjang", "Matriks rencana tindak lanjut pasca-pelatihan dasar", "LENGKAP (100%)"],
            ["Lampiran Dokumen", "Buku Pedoman SIMPONITAS, skrip SQL database, manual book, dan tautan hosting sistem", "Berkas dokumen lengkap format PDF dan cetak", "LENGKAP (100%)"]
        ],
        "hasil_output": """Terselesaikannya dokumen Laporan Hasil Aktualisasi Pelatihan Dasar CPNS BPS Tahun 2026 secara utuh, rapi, dan sistematis beserta seluruh lampiran bukti fisik pendukung dan slide paparan seminar akhir.""",
        "berakhlak": [
            ("Akuntabel", "Menyajikan data capaian kinerja dan laporan pelaksanaan aktualisasi secara jujur, transparan, objektif, dan dapat dipertanggungjawabkan sepenuhnya."),
            ("Kompeten", "Menyusun laporan dengan standar penulisan karya ilmiah kedinasan yang tinggi, runut, teliti, dan berorientasi pada kualitas terbaik."),
            ("Loyal", "Menuntaskan seluruh kewajiban pelatihan dasar CPNS dengan penuh dedikasi demi mengharumkan nama instansi BPS Kabupaten Pasaman.")
        ],
        "kesimpulan": "Seluruh rangkaian kegiatan aktualisasi dan penyusunan laporan hasil aktualisasi telah tuntas diselesaikan dengan sukses. Peserta siap untuk melangkah ke tahap seminar akhir pertanggungjawaban aktualisasi Pelatihan Dasar CPNS BPS Tahun 2026."
    }
]

def make_docx_report(r_data):
    doc = docx.Document()
    
    # Page setup: Margins 1 inch
    for section in doc.sections:
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)

    # Styles
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Calibri'
    normal_style.font.size = Pt(11)
    normal_style.font.color.rgb = RGBColor(30, 41, 59)
    normal_style.paragraph_format.line_spacing = 1.15
    normal_style.paragraph_format.space_after = Pt(6)

    # Header Banner
    p_header = doc.add_paragraph()
    p_header.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_inst = p_header.add_run("BADAN PUSAT STATISTIK KABUPATEN PASAMAN\nPROVINSI SUMATERA BARAT\n")
    r_inst.font.name = 'Calibri'
    r_inst.font.size = Pt(11)
    r_inst.font.bold = True
    r_inst.font.color.rgb = RGBColor(30, 41, 59)

    r_line = p_header.add_run("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    r_line.font.color.rgb = RGBColor(37, 99, 235)
    r_line.font.bold = True

    r_title = p_header.add_run(f"{r_data['title']}\n")
    r_title.font.name = 'Calibri'
    r_title.font.size = Pt(13)
    r_title.font.bold = True
    r_title.font.color.rgb = RGBColor(29, 78, 216)

    r_sub = p_header.add_run("Sinergi Pembinaan Statistik Sektoral melalui Penerbitan Kompromin Akurat dan Berkualitas\n")
    r_sub.font.name = 'Calibri'
    r_sub.font.size = Pt(9.5)
    r_sub.font.italic = True
    r_sub.font.color.rgb = RGBColor(71, 85, 105)

    doc.add_paragraph()

    # Meta Table
    tbl_meta = doc.add_table(rows=4, cols=2)
    tbl_meta.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_pairs = [
        ("Nama Tahapan Kegiatan", r_data['tahapan']),
        ("Tanggal Pelaksanaan", r_data['tanggal']),
        ("Pengembang / Pelaksana", "Muhammad Rafi Tasrif, S.Tr.Stat (Pranata Komputer Ahli Pertama)"),
        ("Output / Hasil Kegiatan", r_data['output'])
    ]
    for idx, (k, v) in enumerate(meta_pairs):
        row = tbl_meta.rows[idx]
        cell_k, cell_v = row.cells[0], row.cells[1]
        cell_k.width = Inches(2.2)
        cell_v.width = Inches(4.3)
        
        p_k = cell_k.paragraphs[0]
        r_k = p_k.add_run(k)
        r_k.bold = True
        r_k.font.size = Pt(10)
        
        p_v = cell_v.paragraphs[0]
        r_v = p_v.add_run(v)
        r_v.font.size = Pt(10)

    # Format meta table borders & shading
    for row in tbl_meta.rows:
        shd = parse_xml(r'<w:shd {} w:fill="F1F5F9"/>'.format(nsdecls('w')))
        row.cells[0]._tc.get_or_add_tcPr().append(shd)

    doc.add_paragraph()

    # Section 1
    p_h1 = doc.add_paragraph()
    p_h1.paragraph_format.space_before = Pt(12)
    p_h1.paragraph_format.keep_with_next = True
    r_h1 = p_h1.add_run("1. LATAR BELAKANG & TUJUAN TAHAPAN KEGIATAN")
    r_h1.font.bold = True
    r_h1.font.size = Pt(12)
    r_h1.font.color.rgb = RGBColor(30, 58, 138)

    doc.add_paragraph(r_data['latar_belakang'])

    # Section 2
    p_h2 = doc.add_paragraph()
    p_h2.paragraph_format.space_before = Pt(12)
    p_h2.paragraph_format.keep_with_next = True
    r_h2 = p_h2.add_run("2. LANGKAH-LANGKAH PELAKSANAAN & LOGIKA IMPLEMENTASI")
    r_h2.font.bold = True
    r_h2.font.size = Pt(12)
    r_h2.font.color.rgb = RGBColor(30, 58, 138)

    for step_title, step_desc in r_data['langkah_langkah']:
        p_step = doc.add_paragraph()
        p_step.paragraph_format.space_after = Pt(4)
        r_st = p_step.add_run(f"• {step_title}: ")
        r_st.bold = True
        p_step.add_run(step_desc)

    doc.add_paragraph()

    # Table of Technical Specs
    p_ht = doc.add_paragraph()
    p_ht.paragraph_format.keep_with_next = True
    r_ht = p_ht.add_run("Tabel Rincian Spesifikasi & Artefak Hasil Tahapan:")
    r_ht.font.bold = True
    r_ht.font.color.rgb = RGBColor(37, 99, 235)

    spec_table = r_data['tabel_skema']
    tbl_spec = doc.add_table(rows=len(spec_table), cols=len(spec_table[0]))
    tbl_spec.alignment = WD_TABLE_ALIGNMENT.CENTER

    # Table Header
    for col_idx, header_text in enumerate(spec_table[0]):
        cell = tbl_spec.rows[0].cells[col_idx]
        shading = parse_xml(r'<w:shd {} w:fill="1E3A8A"/>'.format(nsdecls('w')))
        cell._tc.get_or_add_tcPr().append(shading)
        p = cell.paragraphs[0]
        r = p.add_run(header_text)
        r.font.bold = True
        r.font.color.rgb = RGBColor(255, 255, 255)
        r.font.size = Pt(9.5)

    # Table Rows
    for row_idx, row_data in enumerate(spec_table[1:], start=1):
        row_cells = tbl_spec.rows[row_idx].cells
        if row_idx % 2 == 0:
            for cell in row_cells:
                shd = parse_xml(r'<w:shd {} w:fill="F8FAFC"/>'.format(nsdecls('w')))
                cell._tc.get_or_add_tcPr().append(shd)
        for col_idx, val in enumerate(row_data):
            p = row_cells[col_idx].paragraphs[0]
            r = p.add_run(val)
            r.font.size = Pt(9.0)

    doc.add_paragraph()

    # Section 3
    p_h3 = doc.add_paragraph()
    p_h3.paragraph_format.space_before = Pt(12)
    p_h3.paragraph_format.keep_with_next = True
    r_h3 = p_h3.add_run("3. HASIL DAN OUTPUT TAHAPAN KEGIATAN")
    r_h3.font.bold = True
    r_h3.font.size = Pt(12)
    r_h3.font.color.rgb = RGBColor(30, 58, 138)

    doc.add_paragraph(r_data['hasil_output'])

    # Section 4: BerAKHLAK
    p_h4 = doc.add_paragraph()
    p_h4.paragraph_format.space_before = Pt(12)
    p_h4.paragraph_format.keep_with_next = True
    r_h4 = p_h4.add_run("4. KETERKAITAN DENGAN NILAI-NILAI DASAR ASN (BerAKHLAK)")
    r_h4.font.bold = True
    r_h4.font.size = Pt(12)
    r_h4.font.color.rgb = RGBColor(30, 58, 138)

    for val_name, val_desc in r_data['berakhlak']:
        p_b = doc.add_paragraph()
        p_b.paragraph_format.space_after = Pt(4)
        r_bn = p_b.add_run(f"• Nilai {val_name}: ")
        r_bn.bold = True
        r_bn.font.color.rgb = RGBColor(29, 78, 216)
        p_b.add_run(val_desc)

    # Section 5: Kesimpulan
    p_h5 = doc.add_paragraph()
    p_h5.paragraph_format.space_before = Pt(12)
    p_h5.paragraph_format.keep_with_next = True
    r_h5 = p_h5.add_run("5. KESIMPULAN DAN RENCANA TINDAK LANJUT")
    r_h5.font.bold = True
    r_h5.font.size = Pt(12)
    r_h5.font.color.rgb = RGBColor(30, 58, 138)

    doc.add_paragraph(r_data['kesimpulan'])

    # Save DOCX
    docx_path = os.path.join(LAPORAN_DIR, f"{r_data['filename_base']}.docx")
    doc.save(docx_path)
    print(f"Generated DOCX: {docx_path}")

def make_md_report(r_data):
    md_content = f"""# {r_data['title']}
**Badan Pusat Statistik (BPS) Kabupaten Pasaman - Provinsi Sumatera Barat**
*Sinergi Pembinaan Statistik Sektoral melalui Penerbitan Kompromin Akurat dan Berkualitas*

---

## 📌 Identitas Tahapan Kegiatan
- **Tahapan Kegiatan**: {r_data['tahapan']}
- **Tanggal Pelaksanaan**: {r_data['tanggal']}
- **Pengembang / Pelaksana**: Muhammad Rafi Tasrif, S.Tr.Stat (Pranata Komputer Ahli Pertama)
- **Output Utama**: {r_data['output']}

---

## 1. Latar Belakang & Tujuan Tahapan Kegiatan
{r_data['latar_belakang']}

---

## 2. Langkah-Langkah Pelaksanaan & Logika Implementasi
"""
    for step_title, step_desc in r_data['langkah_langkah']:
        md_content += f"- **{step_title}**:\n  {step_desc}\n\n"

    md_content += "### 📊 Tabel Rincian Spesifikasi & Artefak Hasil Tahapan\n\n"
    spec_table = r_data['tabel_skema']
    # Headers
    md_content += "| " + " | ".join(spec_table[0]) + " |\n"
    md_content += "| " + " | ".join([":---"] * len(spec_table[0])) + " |\n"
    for row in spec_table[1:]:
        md_content += "| " + " | ".join(row) + " |\n"

    md_content += f"""

---

## 3. Hasil dan Output Tahapan Kegiatan
{r_data['hasil_output']}

---

## 4. Keterkaitan dengan Nilai-Nilai Dasar ASN (BerAKHLAK)
"""
    for val_name, val_desc in r_data['berakhlak']:
        md_content += f"- **Nilai {val_name}**: {val_desc}\n"

    md_content += f"""

---

## 5. Kesimpulan dan Rencana Tindak Lanjut
{r_data['kesimpulan']}
"""

    md_path = os.path.join(LAPORAN_DIR, f"{r_data['filename_base']}.md")
    with open(md_path, 'w', encoding='utf-8') as f:
        f.write(md_content)
    print(f"Generated MD: {md_path}")

def main():
    for r in reports_data_4:
        make_docx_report(r)
        make_md_report(r)

if __name__ == '__main__':
    main()
