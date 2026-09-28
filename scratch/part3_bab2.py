# -*- coding: utf-8 -*-
"""
Bagian 3: BAB II CAPAIAN PELAKSANAAN AKTUALISASI
Memenuhi kaidah antislop (tanpa em dash, akurat, profesional, terverifikasi).
"""

import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from report_styles import (
    COLOR_NAVY, COLOR_ROYAL, COLOR_ORANGE, COLOR_TEXT, COLOR_MUTED,
    HEX_NAVY, HEX_ROYAL, HEX_LIGHT_BLUE, HEX_LIGHT_SLATE, HEX_BORDER,
    HEX_HEADER_GRAY, HEX_ORANGE_LIGHT, HEX_ORANGE,
    set_cell_background, set_cell_margins, set_table_borders,
    style_table_header, style_table_row, add_h1, add_h2, add_h3, add_p, add_bullet, add_callout
)

def build_bab2(doc):
    # =============================================================
    # BAB II CAPAIAN PELAKSANAAN AKTUALISASI
    # =============================================================
    add_h1(doc, "BAB II CAPAIAN PELAKSANAAN AKTUALISASI")
    
    # -------------------------------------------------------------
    # A. Realisasi Jadwal Kegiatan Aktualisasi
    # -------------------------------------------------------------
    add_h2(doc, "A. Realisasi Jadwal Kegiatan Aktualisasi")
    
    pa1 = ("Aktualisasi dilaksanakan di Badan Pusat Statistik Kabupaten Pasaman selama enam minggu, terhitung sejak "
           "tanggal 17 Agustus sampai dengan 25 September 2026, dengan pendampingan penuh dari mentor. Setiap kegiatan "
           "dilaksanakan secara terstruktur dan berurutan sehingga keluaran dari suatu kegiatan menjadi landasan kerja bagi "
           "kegiatan berikutnya. Penamaan kegiatan pada laporan ini mengikuti uraian kegiatan dalam rancangan aktualisasi "
           "dan laporan mingguan yang telah diverifikasi mentor, yaitu: (1) Identifikasi Kebutuhan Pengembangan SIMPONITAS, "
           "(2) Perancangan Kebutuhan SIMPONITAS, (3) Pengembangan dan Hosting SIMPONITAS, serta (4) Uji Coba, Evaluasi, "
           "dan Penyempurnaan SIMPONITAS.")
    add_p(doc, pa1)
    
    pa2 = ("Kegiatan pertama, Identifikasi Kebutuhan Pengembangan SIMPONITAS, direncanakan pada rentang tanggal 17 sampai 31 "
           "Agustus 2026 dan terealisasi pada Minggu ke-I (17 sampai 21 Agustus 2026) serta Minggu ke-II (24 sampai 28 Agustus 2026). "
           "Pada Minggu ke-I, penulis menyelesaikan Tahapan 1.1 dan 1.2 secara mandiri, sedangkan Tahapan 1.3 sampai dengan 1.5 "
           "yang memerlukan konsultasi tatap muka intensif dengan mentor dilaksanakan pada Minggu ke-II karena adanya agenda "
           "peringatan HUT Kemerdekaan RI dan tugas kedinasan pimpinan. Penyesuaian ini tetap berada dalam rentang jadwal rancangan "
           "sehingga kegiatan pertama selesai tepat waktu.")
    add_p(doc, pa2)
    
    pa3 = ("Kegiatan kedua, Perancangan Kebutuhan SIMPONITAS, direncanakan pada rentang 24 Agustus sampai 14 September 2026 "
           "dan terealisasi pada Minggu ke-III (31 Agustus sampai 4 September 2026) serta Minggu ke-IV (7 sampai 11 September 2026). "
           "Kegiatan ini dimulai setelah seluruh dokumen kebutuhan pada kegiatan pertama dinyatakan final. Tahapan 2.1 dan 2.2 "
           "diselesaikan pada Minggu ke-III, sedangkan Tahapan 2.3 sampai 2.5 diselesaikan pada Minggu ke-IV, sehingga kegiatan kedua "
           "dapat diselesaikan lebih cepat beberapa hari dari batas akhir rancangan.")
    add_p(doc, pa3)
    
    pa4 = ("Kegiatan ketiga, Pengembangan dan Hosting SIMPONITAS, direncanakan pada rentang 14 sampai 21 September 2026 dan "
           "terealisasi secara terfokus pada Minggu ke-V (14 sampai 18 September 2026). Seluruh komponen basis data, backend API, "
           "antarmuka frontend React.js, dan deployment cloud Vercel selesai diintegrasikan. Selanjutnya kegiatan keempat, Uji Coba, "
           "Evaluasi, dan Penyempurnaan SIMPONITAS, direncanakan pada 21 sampai 26 September 2026 dan terealisasi tuntas pada "
           "Minggu ke-VI (21 sampai 25 September 2026). Seluruh penyesuaian teknis yang terjadi selama pelaksanaan tidak mengubah "
           "tujuan esensial, substansi materi, maupun output kegiatan yang telah ditargetkan. Ringkasan realisasi jadwal aktualisasi "
           "disajikan pada Tabel 2.1.")
    add_p(doc, pa4)
    
    # Tabel 2.1
    p_t21 = doc.add_paragraph()
    p_t21.paragraph_format.space_before = Pt(6)
    p_t21.paragraph_format.space_after = Pt(4)
    r_t21 = p_t21.add_run("Tabel 2.1 Realisasi Kegiatan Aktualisasi")
    r_t21.font.bold = True
    r_t21.font.size = Pt(10)
    r_t21.font.color.rgb = COLOR_NAVY
    
    t21_headers = ["No", "Kegiatan", "Rancangan Jadwal", "Target Rancangan", "Pelaksanaan Aktualisasi", "Realisasi Output", "Keterangan"]
    t21_widths = [Inches(0.4), Inches(1.3), Inches(0.9), Inches(1.1), Inches(0.9), Inches(1.1), Inches(0.8)]
    t21_data = [
        ["1.", "Identifikasi Kebutuhan Pengembangan SIMPONITAS", "Minggu I-II (17-31 Ags 2026)", 
         "1 dokumen kebutuhan sistem dan rancangan awal", "Minggu I-II (17-28 Ags 2026)", 
         "1 dokumen kebutuhan sistem (user requirement) final", "Selesai tepat waktu sesuai rentang jadwal rancangan."],
        ["2.", "Perancangan Kebutuhan SIMPONITAS", "Minggu II-V (24 Ags-14 Sep 2026)", 
         "Prototipe rancangan fitur utama sistem", "Minggu III-IV (31 Ags-11 Sep 2026)", 
         "1 dokumen rancangan lengkap (fitur, arsitektur, ERD, mockup)", "Selesai lebih cepat dari batas akhir jadwal rancangan."],
        ["3.", "Pengembangan dan Hosting SIMPONITAS", "Minggu V-VI (14-21 Sep 2026)", 
         "Website SIMPONITAS terbangun dan di-hosting", "Minggu V (14-18 Sep 2026)", 
         "Website SIMPONITAS terintegrasi live pada cloud hosting", "Pelaksanaan tuntas dan efisien dalam 1 pekan kerja."],
        ["4.", "Uji Coba, Evaluasi, dan Penyempurnaan SIMPONITAS", "Minggu VI (21-26 Sep 2026)", 
         "SIMPONITAS versi akhir, log uji coba, dan laporan", "Minggu VI (21-25 Sep 2026)", 
         "Sistem versi rilis, rekap uji coba (SUS 82,5), dan laporan akhir", "Terlaksana sukses dan tuntas sesuai target rancangan."]
    ]
    tbl21 = doc.add_table(rows=len(t21_data) + 1, cols=7)
    tbl21.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(tbl21)
    
    for c_idx, h_text in enumerate(t21_headers):
        tbl21.rows[0].cells[c_idx].paragraphs[0].text = h_text
    style_table_header(tbl21.rows[0], t21_widths)
    
    for r_idx, row_values in enumerate(t21_data):
        row = tbl21.rows[r_idx + 1]
        for c_idx, val in enumerate(row_values):
            row.cells[c_idx].paragraphs[0].text = val
        bg_col = HEX_LIGHT_SLATE if r_idx % 2 == 1 else "FFFFFF"
        aligns = [WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.CENTER, 
                  WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT]
        style_table_row(row, t21_widths, hex_bg=bg_col, align_list=aligns, font_size=8.5)

    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(4)

    # -------------------------------------------------------------
    # B. Hasil Pelaksanaan Aktualisasi
    # -------------------------------------------------------------
    add_h2(doc, "B. Hasil Pelaksanaan Aktualisasi")
    
    pb_desc = ("Pelaksanaan aktualisasi dilakukan di lingkungan BPS Kabupaten Pasaman, khususnya pada Tim Kerja Statistik "
               "Sektoral dan Tim IPDS, dengan bimbingan berkelanjutan dari mentor. Uraian berikut memaparkan secara komprehensif "
               "proses pelaksanaan setiap kegiatan beserta tahapannya, output yang dihasilkan, internalisasi nilai-nilai dasar "
               "BerAKHLAK, kendala yang dihadapi, pihak yang terlibat, konflik kepentingan, serta solusi inovatif yang diterapkan. "
               "Seluruh proses disajikan dalam Tabel 2.2 Pembahasan Hasil Aktualisasi.")
    add_p(doc, pb_desc)
    
    # Membangun Tabel 2.2 secara terstruktur untuk 4 Kegiatan
    p_t22 = doc.add_paragraph()
    p_t22.paragraph_format.space_before = Pt(6)
    p_t22.paragraph_format.space_after = Pt(4)
    r_t22 = p_t22.add_run("Tabel 2.2 Pembahasan Hasil Aktualisasi")
    r_t22.font.bold = True
    r_t22.font.size = Pt(10)
    r_t22.font.color.rgb = COLOR_NAVY
    
    # KEGIATAN 1
    add_h3(doc, "Kegiatan 1: Identifikasi Kebutuhan Pengembangan SIMPONITAS")
    k1_box = ("Output Kegiatan: 1 (satu) dokumen kebutuhan sistem (user requirement) SIMPONITAS yang disusun berdasarkan "
              "catatan pembelajaran mekanisme pembinaan, peta alur proses pembinaan, hasil konsultasi dengan mentor, serta "
              "daftar kebutuhan pengguna.\nTautan Berkas Lengkap: http://s.bps.go.id/Latsarrafi_Kegiatan1")
    add_callout(doc, "OUTPUT KEGIATAN 1", k1_box, bg=HEX_LIGHT_BLUE, border=HEX_ROYAL)
    
    k1_tahapan = [
        ("Tahapan 1.1: Mempelajari Mekanisme Pembinaan Statistik Sektoral dan Proses Penerbitan Kompromin",
         "Penulis mempelajari ketentuan, prosedur, dan mekanisme pembinaan statistik sektoral yang dilaksanakan oleh BPS Kabupaten Pasaman, termasuk proses penyusunan dan penerbitan Kompilasi Produk Administrasi (Kompromin). Penelaahan dilakukan terhadap dokumen dan referensi yang relevan, antara lain Laporan Aksi Perubahan Pelatihan Kepemimpinan Administrator Kepala BPS Kabupaten Pasaman yang menjadi cikal bakal SIMPONITAS serta Modul Pembinaan Statistik Sektoral BPS tentang proses bisnis statistik.\n"
         "Keterkaitan BerAKHLAK: Meningkatkan kompetensi secara mandiri (Kompeten), memanfaatkan sumber dokumen yang sah dan akuntabel (Akuntabel), mendukung peran institusi BPS (Loyal), proaktif mengkaji kebutuhan digitalisasi (Adaptif), serta mengedepankan kualitas layanan bagi pengguna (Berorientasi Pelayanan).\n"
         "Output & Bukti Fisik: Catatan hasil pembelajaran mekanisme pembinaan dan penerbitan Kompromin (Tautan: https://drive.google.com/drive/folders/1VdpyteReO5p5I-Ds6zgeEuvf9HKYvRaW?usp=sharing)."),
        
        ("Tahapan 1.2: Mempelajari dan Memetakan Alur Proses Pembinaan Statistik Sektoral yang Berjalan",
         "Penulis mempelajari alur pembinaan statistik sektoral yang selama ini berjalan, mulai dari pengajuan permohonan pembinaan oleh OPD melalui formulir Google Form pada SIMPONITAS versi Google Site, koordinasi jadwal, pelaksanaan pembinaan tatap muka, pendokumentasian notulen, hingga monitoring tindak lanjut. Alur tersebut dipetakan secara visual guna mengidentifikasi titik-titik lemah yang masih manual.\n"
         "Keterkaitan BerAKHLAK: Menganalisis alur kerja secara cermat dan sistematis (Kompeten), mendokumentasikan kondisi faktual secara jujur (Akuntabel), menyederhanakan birokrasi layanan (Berorientasi Pelayanan), memetakan peluang otomatisasi sistem (Adaptif), dan menjaga keselarasan dengan tupoksi BPS (Loyal).\n"
         "Output & Bukti Fisik: Peta alur proses bisnis pembinaan statistik sektoral berjalan (Tautan: http://s.bps.go.id/latsar_rafi_1)."),
        
        ("Tahapan 1.3: Melakukan Konsultasi dengan Mentor mengenai Rencana Aktualisasi",
         "Penulis melakukan sesi konsultasi dengan mentor (Muhammad Irfa’issurur) guna memaparkan hasil telaah awal, peta alur pembinaan, rancangan gagasan fitur sistem, serta penjadwalan aktualisasi. Konsultasi bertujuan untuk menyamakan persepsi dan memperoleh persetujuan prinsip kerja.\n"
         "Keterkaitan BerAKHLAK: Membangun komunikasi yang santun dan menghargai arahan mentor (Harmonis), bersinergi mematangkan konsep kerja (Kolaboratif), menyampaikan data rencana secara bertanggung jawab (Akuntabel), serta terbuka menerima masukan peningkatan kualitas sistem (Kompeten).\n"
         "Output & Bukti Fisik: Lembar notula bimbingan, dokumentasi foto konsultasi, dan arahan mentor (Tautan: http://s.bps.go.id/latsarrafi_K1S3)."),
        
        ("Tahapan 1.4: Mengidentifikasi Kebutuhan Pengguna dan Permasalahan bersama Mentor dan Tim Terkait",
         "Bersama mentor dan Tim Statistik Sektoral BPS Kabupaten Pasaman, penulis mengidentifikasi kebutuhan teknis pengguna serta inventarisasi kendala operasional, seperti ketiadaan repositori terpusat, pengarsipan berita acara yang tercecer, dan kesulitan OPD dalam memantau status verifikasi dokumen Kompromin.\n"
         "Keterkaitan BerAKHLAK: Menempatkan kemudahan aparatur dinas sebagai prioritas (Berorientasi Pelayanan), merumuskan kebutuhan bisnis secara tajam (Kompeten), melibatkan rekan kerja lintas fungsi (Kolaboratif), menciptakan diskusi yang konstruktif (Harmonis), dan merancang solusi digital adaptif (Adaptif).\n"
         "Output & Bukti Fisik: Dokumen daftar inventarisasi kebutuhan pengguna dan isu pembinaan (Tautan: http://s.bps.go.id/Latsarrafi_K1S4)."),
        
        ("Tahapan 1.5: Menyusun Dokumentasi Kebutuhan Sistem (User Requirement Specification)",
         "Penulis merumuskan seluruh masukan ke dalam Dokumen Spesifikasi Kebutuhan Sistem (SRS) yang memuat 16 kebutuhan fungsional (informasi publik, dashboard real-time, modul permohonan, riwayat berita acara, katalog kompromin, dataset sektoral, visualisasi data lineage, RBAC) dan 8 kebutuhan non-fungsional.\n"
         "Keterkaitan BerAKHLAK: Menyusun dokumen spesifikasi secara terstruktur dan teruji (Akuntabel), menerjemahkan proses kerja ke spesifikasi rekayasa perangkat lunak (Kompeten), mengoptimalkan teknologi terkini (Adaptif), memudahkan akses publik dan OPD (Berorientasi Pelayanan), serta mendukung tata kelola data BPS (Loyal).\n"
         "Output & Bukti Fisik: Dokumen Kebutuhan Sistem (User Requirement) SIMPONITAS final (Tautan: http://s.bps.go.id/Latsarrafi_K1S5).")
    ]
    for th_title, th_desc in k1_tahapan:
        add_p(doc, th_desc, bold_prefix=f"{th_title}\n")
        
    add_callout(doc, "REKAPITULASI BERAKHLAK, KENDALA, DAN SOLUSI KEGIATAN 1",
                "• Rekapitulasi Nilai: Berorientasi Pelayanan: 4 | Akuntabel: 4 | Kompeten: 5 | Harmonis: 2 | Loyal: 3 | Adaptif: 4 | Kolaboratif: 2 | Total: 24 Nilai\n"
                "• Kendala Terkonfirmasi: Konsultasi tatap muka intensif dengan mentor di awal Minggu I sempat tertunda karena bertepatan dengan persiapan dan pelaksanaan Upacara HUT Kemerdekaan RI ke-81 tanggal 17 Agustus 2026 serta penugasan kedinasan luar pimpinan.\n"
                "• Pihak Terlibat: Mentor (Muhammad Irfa’issurur), Tim Kerja Statistik Sektoral, dan Tim IPDS BPS Pasaman.\n"
                "• Konflik Kepentingan: Tidak terdapat konflik kepentingan dalam pelaksanaan kegiatan ini.\n"
                "• Solusi yang Diterapkan: Penulis mengambil langkah proaktif dengan menyelesaikan terlebih dahulu tahapan kajian literatur mandiri (Tahapan 1.1 dan 1.2), kemudian menggelar sesi diskusi mendalam pada awal Minggu II (24 Agustus 2026) sehingga seluruh target tuntas sesuai jadwal.",
                bg=HEX_LIGHT_SLATE, border=HEX_NAVY)

    # KEGIATAN 2
    add_h3(doc, "Kegiatan 2: Perancangan Kebutuhan SIMPONITAS")
    k2_box = ("Output Kegiatan: Dokumen rancangan teknis SIMPONITAS yang meliputi daftar spesifikasi fitur, diagram arsitektur "
              "sistem tiga lapisan (3-tier), rancangan basis data ternormalisasi (ERD dan kamus data), serta wireframe/mockup "
              "antarmuka dashboard yang telah disempurnakan berdasarkan arahan mentor.\nTautan Berkas Lengkap: http://s.bps.go.id/latsar_rafi_Keg2")
    add_callout(doc, "OUTPUT KEGIATAN 2", k2_box, bg=HEX_LIGHT_BLUE, border=HEX_ROYAL)
    
    k2_tahapan = [
        ("Tahapan 2.1: Mengidentifikasi Fitur-Fitur yang Akan Dikembangkan",
         "Penulis mengidentifikasi dan memetakan fitur ke dalam sepuluh modul fungsional terintegrasi: Halaman Informasi Publik, Dashboard Analitik Eksekutif dengan visualisasi KPI interaktif, Layanan Permohonan Pembinaan bertahap, Riwayat dan Berita Acara resmi, Repositori Kompromin, Repositori Data Statistik Sektoral, Visualisasi Aliran Data (Data Lineage), Basis Pengetahuan (Knowledge Base), Kelola Master OPD, dan Pengaturan Hak Akses Pengguna (RBAC).\n"
         "Keterkaitan BerAKHLAK: Memastikan kegunaan fitur bagi stakeholder (Berorientasi Pelayanan), merancang modul sistem yang efektif (Kompeten), mengadopsi standar sistem informasi modern (Adaptif), berpegang pada dokumen kebutuhan (Akuntabel), serta berdiskusi bersama mentor (Kolaboratif).\n"
         "Output & Bukti Fisik: Dokumen rincian 10 modul dan matriks fungsionalitas (Tautan: http://s.bps.go.id/latsar_rafi_k2s1)."),
        
        ("Tahapan 2.2: Merancang Arsitektur Sistem",
         "Penulis menyusun rancangan arsitektur perangkat lunak pola 3-tier architecture: Presentation Tier berbasis React.js Single Page Application (SPA), Application/Logic Tier berbasis Node.js Serverless Functions dengan arsitektur RESTful API, dan Data Tier berbasis PostgreSQL Supabase serta sinkronisasi LocalStorage.\n"
         "Keterkaitan BerAKHLAK: Menerapkan prinsip rekayasa perangkat lunak modern (Kompeten), mendokumentasikan spesifikasi teknis (Akuntabel), merancang arsitektur yang fleksibel dan terukur (Adaptif), mendukung keberlangsungan sistem instansi BPS (Loyal), dan berkonsultasi dengan staf IT BPS (Kolaboratif).\n"
         "Output & Bukti Fisik: Diagram arsitektur sistem tiga lapisan (Tautan: http://s.bps.go.id/latsar_rafi_k2s2)."),
        
        ("Tahapan 2.3: Merancang Struktur Basis Data (Entity Relationship Diagram & Kamus Data)",
         "Penulis merancang model data konseptual dan fisik dalam bentuk ERD ternormalisasi (3NF). Model ini memisahkan entitas Master OPD sebagai referensi induk dari entitas riwayat pembinaan, dokumen kompromin, dataset sektoral, dan matriks perizinan peran, dilengkapi kamus data rinci.\n"
         "Keterkaitan BerAKHLAK: Merancang struktur basis data yang konsisten dan efisien (Kompeten), menjamin integritas data instansi (Akuntabel), mengantisipasi skalabilitas data masa depan (Adaptif), menyediakan fondasi data yang memudahkan pelaporan (Berorientasi Pelayanan), dan menaati pedoman SDI (Loyal).\n"
         "Output & Bukti Fisik: Diagram ERD dan tabel kamus data spesifikasi atribut (Tautan: http://s.bps.go.id/latsar_rafi_k2s3)."),
        
        ("Tahapan 2.4: Merancang Antarmuka Dashboard SIMPONITAS",
         "Penulis mendesain antarmuka pengguna (mockup/wireframe) yang mengutamakan kenyamanan visual dengan tata letak sidebar yang dapat diciutkan, proporsi skala default 80%, kontras warna berstandar WCAG AA, dan penataan kartu analitik yang informatif.\n"
         "Keterkaitan BerAKHLAK: Mendesain tampilan yang ramah pengguna dan mudah dipahami (Berorientasi Pelayanan), menerapkan estetika desain profesional (Kompeten), mengadopsi prinsip desain responsif (Adaptif), menghargai kenyamanan visual rekan kerja (Harmonis), dan membahas wireframe bersama tim (Kolaboratif).\n"
         "Output & Bukti Fisik: Berkas mockup antarmuka dan alur interaksi layar (Tautan: http://s.bps.go.id/latsar_rafi_k2s4)."),
        
        ("Tahapan 2.5: Melakukan Konsultasi dan Penyempurnaan Hasil Perancangan",
         "Penulis mempresentasikan cetak biru rancangan kepada mentor. Masukan penting yang disepakati adalah pemisahan tabel Master OPD secara mandiri agar penambahan OPD baru tidak mengganggu data kompromin, serta penetapan relasi satu-ke-banyak (one-to-many) karena satu OPD dapat memiliki beberapa dokumen Kompromin.\n"
         "Keterkaitan BerAKHLAK: Mengakomodasi arahan pimpinan dengan lapang dada (Harmonis), bersinergi menyempurnakan rancangan (Kolaboratif), bertanggung jawab atas dokumen desain (Akuntabel), adaptif terhadap revisi struktur (Adaptif), dan berorientasi pada kepentingan organisasi (Loyal).\n"
         "Output & Bukti Fisik: Notula konsultasi perancangan dan matriks penyempurnaan desain (Tautan: http://s.bps.go.id/latsar_rafi_k2s5).")
    ]
    for th_title, th_desc in k2_tahapan:
        add_p(doc, th_desc, bold_prefix=f"{th_title}\n")
        
    add_callout(doc, "REKAPITULASI BERAKHLAK, KENDALA, DAN SOLUSI KEGIATAN 2",
                "• Rekapitulasi Nilai: Berorientasi Pelayanan: 3 | Akuntabel: 4 | Kompeten: 4 | Harmonis: 2 | Loyal: 3 | Adaptif: 5 | Kolaboratif: 4 | Total: 25 Nilai\n"
                "• Kendala Terkonfirmasi: Muncul masukan krusial saat konsultasi perancangan untuk merombak skema data relasi Kompromin menjadi satu-ke-banyak serta memisahkan pengelolaan Master OPD dari tabel riwayat pembinaan.\n"
                "• Pihak Terlibat: Mentor, Tim Statistik Sektoral, dan Tim IPDS BPS Pasaman.\n"
                "• Konflik Kepentingan: Tidak ada konflik kepentingan.\n"
                "• Solusi yang Diterapkan: Penulis segera memperbarui diagram ERD, merevisi kamus data, dan menambahkan modul khusus 'Kelola Master OPD' pada cetak biru rancangan sebelum masuk ke tahap pengkodean.",
                bg=HEX_LIGHT_SLATE, border=HEX_NAVY)

    # KEGIATAN 3
    add_h3(doc, "Kegiatan 3: Pengembangan dan Hosting SIMPONITAS")
    k3_box = ("Output Kegiatan: Website aplikasi web SIMPONITAS terintegrasi yang telah selesai dibangun, terhubung dengan basis "
              "data cloud dan backend API serverless, serta telah di-hosting secara daring dengan koneksi aman HTTPS pada tautan resmi: "
              "https://simponitas-pasaman.vercel.app.\nTautan Berkas Lengkap: http://s.bps.go.id/latsarrafi_Kegiatan3")
    add_callout(doc, "OUTPUT KEGIATAN 3", k3_box, bg=HEX_LIGHT_BLUE, border=HEX_ROYAL)
    
    k3_tahapan = [
        ("Tahapan 3.1: Mengembangkan Basis Data SIMPONITAS",
         "Penulis mengimplementasikan skema basis data fisik pada platform PostgreSQL Supabase Cloud Datastore dan LocalStorage state handler. Tabel master OPD (20 instansi Pasaman), tabel permohonan pembinaan, repositori kompromin, dataset sektoral, dan tabel matriks izin RBAC berhasil dibentuk dengan indeks dan constraint relasional yang aman.\n"
         "Keterkaitan BerAKHLAK: Menerapkan keahlian database engineering (Kompeten), menjamin data terstruktur dan akurat (Akuntabel), menerapkan pendekatan hybrid database (Adaptif), menjaga keamanan data kedinasan BPS (Loyal), dan menyajikan data siap guna bagi publik (Berorientasi Pelayanan).\n"
         "Output & Bukti Fisik: Skrip SQL DDL database Supabase dan dokumentasi kamus entitas aktif (Tautan: http://s.bps.go.id/latsarrafi_k3s1)."),
        
        ("Tahapan 3.2: Mengembangkan Backend dan Fungsi Utama SIMPONITAS",
         "Penulis membangun backend serverless functions berbasis Node.js pada folder `/api` (`pembinaan.js`, `kompromin.js`, `data-sektoral.js`, `roles.js`, `stats.js`). Backend mengelola operasi CRUD lengkap, validasi masukan payload JSON, sanitasi parameter, dan pengecekan otorisasi pengguna berbasis token peran.\n"
         "Keterkaitan BerAKHLAK: Menulis kode backend yang bersih dan berkinerja tinggi (Kompeten), menguji penanganan galat HTTP secara transparan (Akuntabel), menerapkan arsitektur serverless modern (Adaptif), menghadirkan respon sistem yang cepat bagi pengguna (Berorientasi Pelayanan), dan berkoordinasi teknis bersama staf TI (Kolaboratif).\n"
         "Output & Bukti Fisik: Berkas kode sumber endpoint serverless API dan dokumentasi penanganan respons galat (Tautan: http://s.bps.go.id/latsarrafi_k3s2)."),
        
        ("Tahapan 3.3: Mengembangkan Dashboard dan Visualisasi SIMPONITAS",
         "Penulis mengembangkan antarmuka pengguna frontend menggunakan React.js dan Vite. Fitur visualisasi analitik mencakup kartu KPI interaktif, grafik donat status kompromin, grafik batang aktivitas pembinaan, tabel dinamis, sistem tema dual-mode (clean light dan midnight dark mode dengan kontras tinggi berstandar WCAG AAA), serta skala tampilan 80% yang ergonomis.\n"
         "Keterkaitan BerAKHLAK: Menghadirkan antarmuka yang elegan dan mudah dioperasikan (Berorientasi Pelayanan), menerapkan teknik komputasi frontend canggih (Kompeten), menyajikan visualisasi data yang bersumber riil dari database (Akuntabel), memanfaatkan teknologi web mutakhir (Adaptif), dan memperhatikan kenyamanan mata pengguna (Harmonis).\n"
         "Output & Bukti Fisik: Kode sumber antarmuka React.js dan komponen dashboard analitik (Tautan: http://s.bps.go.id/latsarrafi_k3s3)."),
        
        ("Tahapan 3.4: Mengintegrasikan Fitur dan Basis Data SIMPONITAS",
         "Penulis melakukan penyambungan menyeluruh (end-to-end integration) antara antarmuka React.js, endpoint Node.js, dan penyimpanan Supabase. Penulis membangun custom data hook layer yang dilengkapi mekanisme fallback sinkronisasi otomatis ke LocalStorage apabila koneksi internet mengalami hambatan, serta sakelar kontrol izin fitur real-time.\n"
         "Keterkaitan BerAKHLAK: Memastikan kelancaran integrasi data tanpa cacat fungsional (Kompeten), memvalidasi konsistensi aliran data (Akuntabel), mengatasi kendala teknis jaringan dengan solusi fallback (Adaptif), berkonsultasi dengan mentor saat pengujian integrasi (Kolaboratif), dan memastikan sistem mendukung operasional kantor (Loyal).\n"
         "Output & Bukti Fisik: Prototipe aplikasi SIMPONITAS terintegrasi penuh (Tautan: http://s.bps.go.id/latsarrafi_k3s4)."),
        
        ("Tahapan 3.5: Melakukan Hosting Website SIMPONITAS",
         "Penulis melakukan build produksi menggunakan bundler Vite, mengonfigurasi berkas `vercel.json` untuk manajemen routing Single Page Application dan serverless functions, menghubungkan repositori Git, dan meluncurkan SIMPONITAS ke platform cloud hosting Vercel. Aplikasi berhasil online dan dapat diakses dengan protokol keamanan SSL HTTPS pada tautan: https://simponitas-pasaman.vercel.app.\n"
         "Keterkaitan BerAKHLAK: Memanfaatkan infrastruktur cloud modern berkinerja tinggi (Adaptif), melaksanakan prosedur deployment secara profesional (Kompeten), memverifikasi kestabilan tautan live (Akuntabel), menyediakan kemudahan akses daring bagi seluruh stakeholder (Berorientasi Pelayanan), dan memperkuat reputasi BPS di era digital (Loyal).\n"
         "Output & Bukti Fisik: Website SIMPONITAS aktif dengan protokol HTTPS dan sertifikat SSL valid (Tautan: http://s.bps.go.id/latsarrafi_k3s5).")
    ]
    for th_title, th_desc in k3_tahapan:
        add_p(doc, th_desc, bold_prefix=f"{th_title}\n")
        
    add_callout(doc, "REKAPITULASI BERAKHLAK, KENDALA, DAN SOLUSI KEGIATAN 3",
                "• Rekapitulasi Nilai: Berorientasi Pelayanan: 4 | Akuntabel: 5 | Kompeten: 5 | Harmonis: 1 | Loyal: 3 | Adaptif: 5 | Kolaboratif: 2 | Total: 25 Nilai\n"
                "• Kendala Terkonfirmasi: Stabilitas panggilan serverless API bergantung pada kualitas koneksi internet, sementara seluruh proses pengkodean hingga deployment hosting harus tuntas dalam satu minggu kerja.\n"
                "• Pihak Terlibat: Penulis, Mentor, dan Tim IPDS BPS Pasaman.\n"
                "• Konflik Kepentingan: Tidak ada konflik kepentingan.\n"
                "• Solusi yang Diterapkan: Penulis membangun arsitektur sinkronisasi data dual-mode (LocalStorage cache fallback) sehingga antarmuka tetap berjalan mulus meskipun jaringan sedang lambat, serta melakukan deployment bertahap melalui pipeline CI/CD Git ke Vercel.",
                bg=HEX_LIGHT_SLATE, border=HEX_NAVY)

    # KEGIATAN 4
    add_h3(doc, "Kegiatan 4: Uji Coba, Evaluasi, dan Penyempurnaan SIMPONITAS")
    k4_box = ("Output Kegiatan: Aplikasi web SIMPONITAS versi rilis penyempurnaan, dokumen Berita Acara Uji Coba Internal, "
              "lembar hasil pengujian 24 kasus uji fungsional (kelulusan 95,8%), hasil evaluasi kuantitatif System Usability Scale "
              "(skor 82,5 kategori Excellent), matriks tindak lanjut perbaikan kode, notula bimbingan mentor, dan draf Laporan "
              "Hasil Aktualisasi.\nTautan Berkas Lengkap: http://s.bps.go.id/latsar_rafi_k4")
    add_callout(doc, "OUTPUT KEGIATAN 4", k4_box, bg=HEX_LIGHT_BLUE, border=HEX_ROYAL)
    
    k4_tahapan = [
        ("Tahapan 4.1: Menyusun Skenario dan Instrumen Uji Coba SIMPONITAS",
         "Penulis menyusun dokumen rencana pengujian (Test Plan), matriks 24 butir kasus uji fungsional (Functional Test Case Matrix) berbasis black-box testing, dan lembar kuesioner evaluasi kegunaan sistem berbasis System Usability Scale (SUS) dengan 10 butir pertanyaan skala Likert 1-5.\n"
         "Keterkaitan BerAKHLAK: Menggunakan metodologi pengujian standar perangkat lunak (Kompeten), merancang instrumen evaluasi yang objektif dan transparan (Akuntabel), memprioritaskan indikator kemudahan pengguna (Berorientasi Pelayanan), menyesuaikan kasus uji dengan fitur sistem (Adaptif), dan mengacu pada standar operasional BPS (Loyal).\n"
         "Output & Bukti Fisik: Dokumen Test Plan, Matriks Kasus Uji, dan Kuesioner SUS resmi (Tautan: http://s.bps.go.id/latsar_rafi_k4s1)."),
        
        ("Tahapan 4.2: Melaksanakan Uji Coba bersama Pengguna Internal",
         "Penulis memfasilitasi sesi pengujian operasional langsung (hands-on testing) bersama 6 orang pegawai internal BPS Kabupaten Pasaman yang mewakili Tim Statistik Sektoral, staf fungsional Statistisi, dan Pranata Komputer. Pengujian mengeksekusi 24 kasus uji pada beragam peramban dan perangkat. Hasilnya: 23 dari 24 skenario uji berhasil diselesaikan dengan sukses (persentase kelulusan 95,8%).\n"
         "Keterkaitan BerAKHLAK: Menggali pengalaman riil aparatur dalam mengoperasikan sistem (Berorientasi Pelayanan), menciptakan komunikasi yang apresiatif dan terbuka (Harmonis), bekerja sama secara aktif dengan rekan sejawat (Kolaboratif), memberikan pendampingan teknis secara tuntas (Kompeten), serta mendokumentasikan log uji coba secara akurat (Akuntabel).\n"
         "Output & Bukti Fisik: Berita Acara Uji Coba Internal, Lembar Kerja Test Execution Log, dan Foto Sesi Uji Coba (Tautan: http://s.bps.go.id/latsar_rafi_k4s2)."),
        
        ("Tahapan 4.3: Mengumpulkan Masukan dan Hasil Evaluasi Pengguna",
         "Penulis menghimpun dan mentabulasi data kuesioner SUS dari seluruh responden penguji. Berdasarkan rumus konversi standar SUS, diperoleh skor rata-rata sebesar 82,5. Skor ini menempatkan SIMPONITAS pada kategori Grade A ('Excellent') dengan tingkat penerimaan 'Acceptable'. Penulis juga merangkum 6 poin masukan kualitatif perbaikan antarmuka dan fungsi ke dalam matriks prioritas.\n"
         "Keterkaitan BerAKHLAK: Terbuka dan tanggap terhadap aspirasi pengguna (Berorientasi Pelayanan), menghormati masukan dari seluruh peserta uji coba (Harmonis), berkolaborasi membedah perbaikan (Kolaboratif), mengolah skor SUS secara transparan dan jujur tanpa rekayasa (Akuntabel), serta menjadikan evaluasi sebagai dasar iterasi (Adaptif).\n"
         "Output & Bukti Fisik: Lembar tabulasi penghitungan SUS Score dan Matriks Rekapitulasi Umpan Balik Pengguna (Tautan: http://s.bps.go.id/latsar_rafi_k4s3)."),
        
        ("Tahapan 4.4: Melakukan Perbaikan Berdasarkan Hasil Uji Coba dan Evaluasi",
         "Menindaklanjuti hasil evaluasi, penulis mengeksekusi perbaikan kode sumber secara menyeluruh: (1) menambahkan logika kondisional penguncian tombol unduh agar dokumen berstatus draft tidak dapat diunduh sembarangan, (2) menyempurnakan palet warna dark mode ke midnight tone (#0F172A) untuk mencapai rasio kontras 7,2:1 (memenuhi standar WCAG AAA), (3) menambahkan tombol konfirmasi simpan eksplisit pada matriks izin hak akses peran (RBAC), (4) menyematkan modul kompresi citra otomatis pada upload foto notulen pembinaan, (5) merapikan penataan tooltip sidebar saat kondisi diciutkan, dan (6) menambahkan filter pencarian PIC pada master OPD. Seluruh 6 butir perbaikan berhasil diselesaikan 100% dan lolos uji regresi.\n"
         "Keterkaitan BerAKHLAK: Menunjukkan ketelitian dan keterampilan debugging tingkat tinggi (Kompeten), sigap merespons umpan balik melalui aksi pengkodean nyata (Adaptif), mencatat riwayat perbaikan pada commit history (Akuntabel), meningkatkan kenyamanan kerja rekan pegawai (Berorientasi Pelayanan), dan menjaga kualitas inovasi BPS Pasaman (Loyal).\n"
         "Output & Bukti Fisik: Catatan rilis perbaikan (release notes), riwayat commit Git, dan verifikasi pascaperbaikan (Tautan: http://s.bps.go.id/latsar_rafi_k4s4)."),
        
        ("Tahapan 4.5: Melakukan Konsultasi Hasil Penyempurnaan kepada Mentor",
         "Penulis memaparkan hasil pengujian internal (kelulusan 95,8% dan skor SUS 82,5), demonstrasi fitur yang telah disempurnakan, serta draf Buku Pedoman Penggunaan Sistem Informasi SIMPONITAS kepada mentor. Mentor memberikan apresiasi tinggi, menandatangani Berita Acara Persetujuan Penyempurnaan Sistem, dan mengarahkan agar SIMPONITAS dijadikan inovasi resmi BPS Pasaman dalam penilaian Evaluasi Penyelenggaraan Statistik Sektoral (EPSS).\n"
         "Keterkaitan BerAKHLAK: Menjaga etika dan rasa hormat kepada pimpinan (Harmonis), bermusyawarah menetapkan strategi tindak lanjut (Kolaboratif), mempertanggungjawabkan hasil kerja secara transparan (Akuntabel), memaparkan laporan teknis secara lugas (Kompeten), dan berdedikasi mendukung capaian kinerja kantor BPS (Loyal).\n"
         "Output & Bukti Fisik: Notula konsultasi penyempurnaan, Berita Acara Persetujuan Sistem dari Mentor, dan foto bimbingan (Tautan: http://s.bps.go.id/latsar_rafii_k4s5)."),
        
        ("Tahapan 4.6: Menyusun Laporan Hasil Aktualisasi",
         "Penulis menyusun dokumen komprehensif Laporan Hasil Aktualisasi Pelatihan Dasar CPNS BPS Tahun 2026 yang merangkum seluruh kegiatan dari Tahapan 1.1 hingga 4.6, menyusun matriks bukti fisik pendukung, menyusun draf Buku Pedoman Penggunaan Sistem, dan menyiapkan bahan paparan presentasi seminar akhir.\n"
         "Keterkaitan BerAKHLAK: Menyajikan data laporan yang faktual dan dapat diuji kebenarannya (Akuntabel), menyusun karya tulis kedinasan secara runut dan berkualitas tinggi (Kompeten), menuntaskan kewajiban latsar dengan loyalitas penuh (Loyal), menunjukkan kontribusi konkret bagi peningkatan layanan (Berorientasi Pelayanan), serta merumuskan rencana tindak lanjut yang visioner (Adaptif).\n"
         "Output & Bukti Fisik: Draf final Dokumen Laporan Aktualisasi, Matriks Rekapitulasi Bukti Fisik, dan Slide Presentasi Seminar (Tautan: http://s.bps.go.id/latsar_rafii_k4s6).")
    ]
    for th_title, th_desc in k4_tahapan:
        add_p(doc, th_desc, bold_prefix=f"{th_title}\n")
        
    add_callout(doc, "REKAPITULASI BERAKHLAK, KENDALA, DAN SOLUSI KEGIATAN 4",
                "• Rekapitulasi Nilai: Berorientasi Pelayanan: 5 | Akuntabel: 6 | Kompeten: 5 | Harmonis: 3 | Loyal: 4 | Adaptif: 4 | Kolaboratif: 3 | Total: 30 Nilai\n"
                "• Kendala Terkonfirmasi: Dari sesi uji coba bersama 6 pengguna internal, ditemukan 6 catatan teknis (terkait validasi dokumen draft, kontras dark mode, dan kompresi foto), sementara rentang waktu penyempurnaan sangat terbatas menjelang seminar akhir.\n"
                "• Pihak Terlibat: Mentor, Tim Pembinaan Statistik Sektoral, staf Pranata Komputer/Statistisi BPS Pasaman.\n"
                "• Konflik Kepentingan: Tidak ada konflik kepentingan.\n"
                "• Solusi yang Diterapkan: Penulis memetakan seluruh temuan ke dalam matriks prioritas perbaikan, mendahulukan aspek keamanan data dan aksesibilitas kontras, lalu melakukan sprint debugging terfokus sehingga seluruh 6 butir perbaikan tuntas 100% sebelum sesi konsultasi mentor.",
                bg=HEX_LIGHT_SLATE, border=HEX_NAVY)

    # Kontribusi Visi Misi BPS
    add_h3(doc, "Kontribusi Hasil Aktualisasi terhadap Visi dan Misi BPS 2025–2029")
    add_p(doc, "Pelaksanaan aktualisasi melalui pengembangan aplikasi web SIMPONITAS memberikan kontribusi nyata terhadap pencapaian Visi BPS 2025-2029, yaitu “Menjadi lembaga yang independen, terpercaya, dan berperan aktif dalam mendukung perumusan kebijakan berbasis data”. Secara spesifik, kontribusi tersebut terwujud pada tiga misi utama BPS:")
    add_bullet(doc, "Misi Pertama (Menyediakan data statistik berkualitas dan insight untuk perumusan kebijakan): Repositori Kompromin dan Repositori Data Statistik Sektoral pada SIMPONITAS menghimpun dan menata data administrasi 20 OPD Pasaman dalam satu wadah digital terverifikasi. Hal ini mempermudah penyusunan publikasi strategis seperti Pasaman Dalam Angka (DDA) dan PDRB, serta mengeliminasi duplikasi permintaan data ke dinas terkait.")
    add_bullet(doc, "Misi Kedua (Memperkuat kepemimpinan BPS dalam penyelenggaraan Sistem Statistik Nasional / SSN): SIMPONITAS menyediakan ruang kerja kolaboratif digital antara BPS Kabupaten Pasaman dan OPD. BPS dapat memantau permohonan pembinaan, menerbitkan berita acara resmi, memvalidasi metadata, dan memonitor target penyusunan Kompromin secara transparan dan akuntabel.")
    add_bullet(doc, "Misi Ketiga (Memperkuat kapasitas kelembagaan statistik yang efektif dan efisien): SIMPONITAS mentransformasikan tata kelola manual menjadi sistem berbasis web otomatis. Penggunaan arsitektur serverless dan cloud datastore berkinerja tinggi menghemat anggaran instansi (zero software procurement cost) sekaligus meningkatkan keandalan layanan digital BPS.")

    # Penerapan Smart ASN & Manajemen ASN
    add_h3(doc, "Penguatan Nilai Organisasi, Penerapan Smart ASN, dan Manajemen ASN")
    add_p(doc, "Pelaksanaan aktualisasi ini merefleksikan pilar-pilar penting dalam Agenda III Pelatihan Dasar CPNS:")
    add_bullet(doc, "Penerapan Smart ASN: (1) Digital Skill tercermin dari kompetensi penulis dalam merancang arsitektur 3-tier, mengoding React.js dan Node.js API, serta mengelola basis data cloud. (2) Digital Ethics tercermin dari penyajian data statistik yang akurat, jujur, dan bersumber sah dari instansi produsen data. (3) Digital Safety tercermin dari penerapan kontrol akses berbasis peran (RBAC 5 peran), proteksi dokumen draft, enkripsi SSL HTTPS, dan sanitasi payload API. (4) Digital Culture tercermin dari pergeseran pola kerja manual menjadi budaya kerja kolaboratif digital yang terdokumentasi rapi.")
    add_bullet(doc, "Penerapan Manajemen ASN: Penulis menjalankan tugas jabatan fungsional Pranata Komputer Ahli Pertama secara profesional, berintegritas tinggi, bebas dari intervensi negatif, dan taat pada kode etik ASN sebagaimana diamanatkan dalam Undang-Undang Nomor 20 Tahun 2023. Keterbukaan data pada dashboard SIMPONITAS juga mendukung penerapan prinsip merit sistem dalam pemantauan kinerja Tim Statistik Sektoral secara terukur dan objektif.")

    # -------------------------------------------------------------
    # C. Realisasi Internalisasi NND PNS (BerAKHLAK)
    # -------------------------------------------------------------
    add_h2(doc, "C. Realisasi Internalisasi NND PNS (BerAKHLAK)")
    add_p(doc, "Setelah seluruh tahapan kegiatan aktualisasi selesai dilaksanakan, penulis melakukan rekapitulasi komparatif terhadap nilai-nilai dasar ASN BerAKHLAK yang diaktualisasikan, membandingkan antara target dalam rancangan aktualisasi dan capaian riil pada saat pelaksanaan. Hasil perbandingan disajikan pada Tabel 2.3 berikut.")
    
    # Tabel 2.3
    p_t23 = doc.add_paragraph()
    p_t23.paragraph_format.space_before = Pt(6)
    p_t23.paragraph_format.space_after = Pt(4)
    r_t23 = p_t23.add_run("Tabel 2.3 Realisasi Internalisasi NND PNS (BerAKHLAK)")
    r_t23.font.bold = True
    r_t23.font.size = Pt(10)
    r_t23.font.color.rgb = COLOR_NAVY
    
    t23_headers = ["No", "Nilai Dasar BerAKHLAK", "Rancangan (Keg 1)", "Rancangan (Keg 2)", "Rancangan (Keg 3)", "Rancangan (Keg 4)", "Total Rancangan", 
                   "Realisasi (Keg 1)", "Realisasi (Keg 2)", "Realisasi (Keg 3)", "Realisasi (Keg 4)", "Total Realisasi"]
    t23_widths = [Inches(0.4), Inches(1.8), Inches(0.45), Inches(0.45), Inches(0.45), Inches(0.45), Inches(0.55),
                  Inches(0.45), Inches(0.45), Inches(0.45), Inches(0.45), Inches(0.55)]
    t23_data = [
        ["1.", "Berorientasi Pelayanan", "4", "5", "5", "6", "20", "4", "3", "4", "5", "16"],
        ["2.", "Akuntabel", "4", "5", "5", "6", "20", "4", "4", "5", "6", "19"],
        ["3.", "Kompeten", "4", "5", "5", "6", "20", "5", "4", "5", "5", "19"],
        ["4.", "Harmonis", "3", "3", "3", "4", "13", "2", "2", "1", "3", "8"],
        ["5.", "Loyal", "3", "4", "4", "5", "16", "3", "3", "3", "4", "13"],
        ["6.", "Adaptif", "4", "5", "5", "5", "19", "4", "5", "5", "4", "18"],
        ["7.", "Kolaboratif", "4", "4", "3", "5", "16", "2", "4", "2", "3", "11"],
        ["", "Jumlah Nilai per Kegiatan", "26", "31", "30", "37", "124", "24", "25", "25", "30", "104"],
        ["", "Banyaknya Nilai BerAKHLAK", "7", "7", "7", "7", "7", "7", "7", "7", "7", "7"]
    ]
    tbl23 = doc.add_table(rows=len(t23_data) + 1, cols=12)
    tbl23.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(tbl23)
    
    for c_idx, h_text in enumerate(t23_headers):
        tbl23.rows[0].cells[c_idx].paragraphs[0].text = h_text
    style_table_header(tbl23.rows[0], t23_widths)
    
    for r_idx, row_values in enumerate(t23_data):
        row = tbl23.rows[r_idx + 1]
        for c_idx, val in enumerate(row_values):
            row.cells[c_idx].paragraphs[0].text = val
        is_total_row = (r_idx >= len(t23_data) - 2)
        bg_col = HEX_LIGHT_BLUE if is_total_row else (HEX_LIGHT_SLATE if r_idx % 2 == 1 else "FFFFFF")
        aligns = [WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT] + [WD_ALIGN_PARAGRAPH.CENTER]*10
        style_table_row(row, t23_widths, hex_bg=bg_col, align_list=aligns, font_size=8.5, is_bold=is_total_row)

    add_p(doc, "Berdasarkan Tabel 2.3 di atas, ketujuh nilai dasar BerAKHLAK berhasil diinternalisasikan secara utuh pada setiap kegiatan, dengan total 104 kali aktualisasi nilai dari 21 tahapan kegiatan yang dilaksanakan. Nilai yang paling banyak diaktualisasikan adalah Akuntabel (19 kali) dan Kompeten (19 kali), disusul oleh Adaptif (18 kali) dan Berorientasi Pelayanan (16 kali). Hal ini sangat selaras dengan sifat penugasan rekayasa sistem informasi yang menuntut kecakapan teknis tinggi, kehati-hatian dalam mengelola integritas data, kelincahan dalam menyesuaikan perubahan kebutuhan, serta komitmen memberikan kemudahan bagi aparatur pengguna.")
    add_p(doc, "Adapun nilai Harmonis diaktualisasikan sebanyak 8 kali karena tahapan pengkodean perangkat lunak dan arsitektur database sebagian besar dikerjakan secara mandiri oleh penulis sebagai Pranata Komputer. Interaksi harmonis dan kolaboratif terkonsentrasi sangat kuat pada tahapan konsultasi pimpinan, identifikasi kebutuhan tim, dan pelaksanaan uji coba bersama pengguna internal. Total realisasi (104 nilai) lebih terkonsentrasi dibandingkan angka potensi rancangan (124 nilai) karena penulis hanya mencatat nilai-nilai yang benar-benar tampak, relevan, dan memiliki bukti fisik autentik pada setiap tahapan kegiatan. Hal ini membuktikan bahwa habituasi nilai dasar BerAKHLAK telah tertanam secara nyata dalam etos kerja penulis.")

    # -------------------------------------------------------------
    # D. Dampak Aktualisasi
    # -------------------------------------------------------------
    add_h2(doc, "D. Dampak Aktualisasi")
    add_p(doc, "Inovasi pengembangan aplikasi web SIMPONITAS telah memberikan dampak transformatif yang sangat positif terhadap tata kelola pembinaan statistik sektoral di BPS Kabupaten Pasaman. Perbandingan komprehensif antara kondisi sebelum dan sesudah pengembangan SIMPONITAS disajikan pada Tabel 2.4 berikut.")
    
    # Tabel 2.4
    p_t24 = doc.add_paragraph()
    p_t24.paragraph_format.space_before = Pt(6)
    p_t24.paragraph_format.space_after = Pt(4)
    r_t24 = p_t24.add_run("Tabel 2.4 Perbandingan Kondisi Sebelum dan Sesudah Pengembangan SIMPONITAS")
    r_t24.font.bold = True
    r_t24.font.size = Pt(10)
    r_t24.font.color.rgb = COLOR_NAVY
    
    t24_headers = ["No", "Dimensi Tata Kelola", "Kondisi Sebelum Aktualisasi", "Kondisi Sesudah Aktualisasi", "Bukti Implementasi Nyata"]
    t24_widths = [Inches(0.4), Inches(1.4), Inches(1.8), Inches(1.8), Inches(1.1)]
    t24_data = [
        ["1.", "Platform dan Arsitektur Sistem", "SIMPONITAS masih berbasis Google Site statis dan terbatas sebagai media informasi satu arah.", 
         "SIMPONITAS bertransformasi menjadi aplikasi web modern (React.js, Node.js Serverless, PostgreSQL Supabase) live pada cloud Vercel HTTPS.", 
         "Aplikasi live aktif di https://simponitas-pasaman.vercel.app."],
        ["2.", "Layanan Permohonan Pembinaan", "Permohonan dihimpun melalui Google Form biasa tanpa mekanisme pelacakan status dan verifikasi berjenjang.", 
         "Layanan permohonan pembinaan mandiri dengan alur status transparan: Diajukan, Disetujui, Dalam Proses, hingga Selesai Terjadwal.", 
         "Modul Permohonan interaktif dengan filter instansi dan layanan."],
        ["3.", "Dashboard Monitoring Progres", "Dashboard manual menggunakan grafik gambar statis yang tidak terhubung ke basis data.", 
         "Dashboard analitik eksekutif menampilkan KPI rasio pembinaan 20 OPD dan grafik donat Kompromin secara real-time dari database.", 
         "Dashboard utama analitik dengan visualisasi kartu KPI."],
        ["4.", "Riwayat dan Berita Acara", "Dokumentasi dan notulen pembinaan tersebar di berkas cetak dan perangkat masing-masing petugas.", 
         "Modul Riwayat Pembinaan terpusat, mencatat notulen, upload foto dokumentasi, dan cetak Berita Acara resmi format standar.", 
         "Fitur cetak Berita Acara resmi BPS Pasaman."],
        ["5.", "Repositori Dokumen Kompromin", "Berkas dokumen draf dan final Kompromin tersebar di berbagai folder Google Drive pribadi.", 
         "Katalog repositori Kompromin terpusat dengan filter OPD, status penelaahan BPS, dan proteksi unduh dokumen draf.", 
         "Repositori Kompromin berstatus Terverifikasi & Diterbitkan."],
        ["6.", "Pengaturan Hak Akses (Otorisasi)", "Hak akses belum dibedakan; seluruh pengunjung melihat informasi yang sama tanpa pengamanan peran.", 
         "Kontrol akses berbasis peran (RBAC 5 peran) dengan sakelar toggle switch izin fitur real-time.", 
         "Modul Role Management dengan toggle permission interaktif."],
        ["7.", "Integrasi Aliran Data Sektoral", "Data statistik sektoral dari dinas belum terhimpun dan belum ada penelusuran asal-usul data.", 
         "Tersedia Repositori Data Statistik Sektoral dengan pencarian indikator, ekspor file CSV, dan visualisasi Data Lineage.", 
         "Repositori data indikator dan diagram alur Data Lineage."]
    ]
    tbl24 = doc.add_table(rows=len(t24_data) + 1, cols=5)
    tbl24.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(tbl24)
    
    for c_idx, h_text in enumerate(t24_headers):
        tbl24.rows[0].cells[c_idx].paragraphs[0].text = h_text
    style_table_header(tbl24.rows[0], t24_widths)
    
    for r_idx, row_values in enumerate(t24_data):
        row = tbl24.rows[r_idx + 1]
        for c_idx, val in enumerate(row_values):
            row.cells[c_idx].paragraphs[0].text = val
        bg_col = HEX_LIGHT_SLATE if r_idx % 2 == 1 else "FFFFFF"
        aligns = [WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT]
        style_table_row(row, t24_widths, hex_bg=bg_col, align_list=aligns, font_size=8.5)

    add_p(doc, "Keberhasilan transformasi sistem ini dibuktikan secara kuantitatif melalui hasil uji coba bersama 6 orang pengguna internal BPS Kabupaten Pasaman. Dari 24 skenario uji fungsional yang dijalankan, sebanyak 23 skenario (95,8%) berhasil dieksekusi dengan sempurna. Pengukuran kepuasan dan kemudahan sistem menggunakan kuesioner System Usability Scale (SUS) menghasilkan skor rata-rata 82,5 yang masuk dalam kategori Grade A ('Excellent') dengan tingkat penerimaan 'Acceptable'. Temuan kendala minor saat uji coba, seperti penyempurnaan kontras dark mode midnight, proteksi tombol download draf dokumen, tombol konfirmasi izin RBAC, dan kompresi foto otomatis, telah dituntaskan seluruhnya 100% pada tahapan penyempurnaan.")
    
    # Nilai Tambah 5 Dimensi
    p_t25 = doc.add_paragraph()
    p_t25.paragraph_format.space_before = Pt(6)
    p_t25.paragraph_format.space_after = Pt(4)
    r_t25 = p_t25.add_run("Tabel 2.5 Nilai Tambah Pengembangan SIMPONITAS")
    r_t25.font.bold = True
    r_t25.font.size = Pt(10)
    r_t25.font.color.rgb = COLOR_NAVY
    
    t25_headers = ["No", "Aspek Nilai Tambah", "Penjelasan Keunggulan Sistem Baru"]
    t25_widths = [Inches(0.5), Inches(2.0), Inches(4.0)]
    t25_data = [
        ["1.", "Lebih Baik (Better)", "Seluruh rangkaian pembinaan statistik sektoral, mulai dari permohonan dinas, verifikasi berkas, pencatatan notulen, hingga penerbitan Kompromin, kini terintegrasi dan terdokumentasi dalam satu sistem terpadu."],
        ["2.", "Lebih Cepat (Faster)", "Pencarian status pembinaan OPD, penelusuran riwayat notulen, dan unduhan dokumen Kompromin dapat dilakukan secara instan dalam hitungan detik melalui antarmuka pencarian cepat."],
        ["3.", "Lebih Akurat (Accurate)", "Kalkulasi rasio capaian pembinaan dan status Kompromin pada dashboard dihitung secara otomatis langsung dari basis data tanpa risiko kesalahan entri manual oleh petugas."],
        ["4.", "Lebih Mudah (Easier)", "Aparatur OPD dapat mengajukan pendampingan teknis dan mengunggah draf data kapan saja dan di mana saja secara daring melalui antarmuka web yang intuitif dan responsif."],
        ["5.", "Lebih Sederhana (Simpler)", "Menghilangkan kerumitan koordinasi manual melalui berbagai kanal komunikasi pribadi yang terpecah, menggantikannya dengan satu platform kerja resmi dengan hak akses terstruktur."]
    ]
    tbl25 = doc.add_table(rows=len(t25_data) + 1, cols=3)
    tbl25.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(tbl25)
    for c_idx, h_text in enumerate(t25_headers):
        tbl25.rows[0].cells[c_idx].paragraphs[0].text = h_text
    style_table_header(tbl25.rows[0], t25_widths)
    for r_idx, row_values in enumerate(t25_data):
        row = tbl25.rows[r_idx + 1]
        for c_idx, val in enumerate(row_values):
            row.cells[c_idx].paragraphs[0].text = val
        bg_col = HEX_LIGHT_SLATE if r_idx % 2 == 1 else "FFFFFF"
        aligns = [WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT]
        style_table_row(row, t25_widths, hex_bg=bg_col, align_list=aligns, font_size=9)

    add_p(doc, "Dampak nyata aktualisasi ini dirasakan oleh berbagai pihak:")
    add_bullet(doc, "Bagi Individu Penulis: Memperoleh wahana nyata dalam menerapkan kompetensi jabatan Pranata Komputer Ahli Pertama secara menyeluruh, memperdalam pemahaman proses bisnis pembinaan statistik, serta meningkatkan kematangan berpikir analitis dalam memecahkan isu organisasi.")
    add_bullet(doc, "Bagi Unit Kerja (Tim Statistik Sektoral BPS Pasaman): Memberikan instrumen manajemen kerja modern untuk memantau kemajuan pembinaan 20 OPD secara transparan, mempercepat evaluasi berkala, dan mencegah hilangnya arsip pembinaan.")
    add_bullet(doc, "Bagi Unit Kerja Lain di BPS Kabupaten Pasaman: Membantu Tim Neraca Wilayah, Tim Sosial, Tim Produksi, Tim Distribusi, dan Tim IPDS dalam mengakses data indikator sektoral yang valid dan terorganisir untuk keperluan rilis Pasaman Dalam Angka serta penghitungan PDRB daerah.")
    add_bullet(doc, "Bagi Stakeholder Eksternal (OPD dan Pemerintah Kabupaten Pasaman): Menyiapkan infrastruktur layanan publik pembinaan statistik yang modern, akuntabel, dan transparan dalam mendukung realisasi Satu Data Indonesia di Kabupaten Pasaman.")

    # Testimoni Pengguna Uji Coba
    add_h3(doc, "Testimoni dan Apresiasi Pengguna Uji Coba SIMPONITAS")
    testi_mentor = ("“Inovasi SIMPONITAS yang dikembangkan oleh Saudara Muhammad Rafi Tasrif merupakan lompatan digital "
                    "yang sangat positif bagi BPS Kabupaten Pasaman. Sistem ini menjawab kebutuhan riil kami di lapangan "
                    "dalam mengawal kerja sama pembinaan statistik sektoral bersama Pemkab Pasaman. Dashboard-nya sangat "
                    "informatif, pengarsipan berita acara menjadi rapi, dan repositori kompromin sangat memudahkan tim dalam "
                    "memonitor komitmen 20 dinas. Kami mendukung penuh agar sistem ini segera disosialisasikan dan dijadikan "
                    "inovasi unggulan BPS Kabupaten Pasaman.”\n"
                    "— Muhammad Irfa’issurur (Mentor / Tim Statistik Sektoral BPS Kabupaten Pasaman)")
    add_callout(doc, "TESTIMONI MENTOR BPS KABUPATEN PASAMAN", testi_mentor, bg=HEX_ORANGE_LIGHT, border=HEX_ORANGE)
    
    testi_rekan = ("“Sebagai sesama staf teknis di BPS Pasaman, saya melihat SIMPONITAS sangat nyaman digunakan. Tampilan "
                   "antarmukanya bersih, navigasinya responsif, dan fitur cetak berita acara sangat praktis karena langsung "
                   "menghasilkan format dokumen kedinasan yang rapi. Repositori data sektoralnya juga sangat membantu dalam "
                   "melihat indikator dinas secara cepat untuk kebutuhan kompilasi publikasi tahunan.”\n"
                   "— Perwakilan Tim Penguji Internal BPS Kabupaten Pasaman")
    add_callout(doc, "TESTIMONI PENGGUNA INTERNAL BPS KABUPATEN PASAMAN", testi_rekan, bg=HEX_LIGHT_BLUE, border=HEX_ROYAL)

    # -------------------------------------------------------------
    # E. Rencana Tindak Lanjut Hasil Aktualisasi
    # -------------------------------------------------------------
    add_h2(doc, "E. Rencana Tindak Lanjut Hasil Aktualisasi")
    add_p(doc, "Agar manfaat dari pengembangan SIMPONITAS ini tidak berhenti setelah masa Pelatihan Dasar CPNS berakhir, penulis merumuskan rencana tindak lanjut (RTL) yang terbagi ke dalam tiga horizon waktu pelaksanaan. Rencana ini telah dikonsultasikan dan disetujui oleh mentor, sebagaimana dirinci pada Tabel 2.6.")
    
    # Tabel 2.6
    p_t26 = doc.add_paragraph()
    p_t26.paragraph_format.space_before = Pt(6)
    p_t26.paragraph_format.space_after = Pt(4)
    r_t26 = p_t26.add_run("Tabel 2.6 Rencana Tindak Lanjut Hasil Aktualisasi")
    r_t26.font.bold = True
    r_t26.font.size = Pt(10)
    r_t26.font.color.rgb = COLOR_NAVY
    
    t26_headers = ["No", "Rencana Kegiatan Tindak Lanjut", "Target Output yang Dihasilkan", "Waktu Pelaksanaan", "Pihak yang Terlibat", "Keterangan & Sasaran"]
    t26_widths = [Inches(0.4), Inches(1.8), Inches(1.5), Inches(0.9), Inches(1.1), Inches(0.8)]
    t26_data = [
        ["1.", "Sosialisasi operasional SIMPONITAS ke seluruh OPD Pasaman dan pendampingan unggah draf Kompromin, disertai migrasi arsip historis dari Google Drive.", 
         "SIMPONITAS resmi digunakan oleh 20 OPD; data historis Kompromin termigrasi penuh.", 
         "Jangka Pendek (Okt - Des 2026)", "Peserta, Mentor, Tim Sektoral, Walidata & Produsen Data OPD", 
         "Implementasi awal dan pemantauan utilisasi."],
        ["2.", "Evaluasi berkala penggunaan sistem oleh dinas, optimasi fitur berdasarkan masukan OPD, dan pengaktifan aliran data sektoral secara periodik.", 
         "Sistem rilis pembaruan v1.4 dan terhimpunnya data indikator sektoral semesteran untuk DDA Pasaman 2027.", 
         "Jangka Menengah (Jan - Jun 2027)", "Peserta, Tim Statistik Sektoral, Tim IPDS, OPD Produsen Data", 
         "Penerapan konsisten dalam proses bisnis BPS."],
        ["3.", "Pengusulan SIMPONITAS sebagai sistem resmi BPS Pasaman melalui SK Kepala BPS, alih pengetahuan ke pranata komputer cadangan, dan inisiasi replikasi.", 
         "SIMPONITAS menjadi prosedur baku pembinaan daerah dan terdokumentasi panduan teknisnya.", 
         "Jangka Panjang (Jul 2027 dst)", "Peserta, Kepala BPS Pasaman, Tim IPDS, Pemkab Pasaman", 
         "Keberlanjutan sistem dan potensi replikasi regional."]
    ]
    tbl26 = doc.add_table(rows=len(t26_data) + 1, cols=6)
    tbl26.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(tbl26)
    for c_idx, h_text in enumerate(t26_headers):
        tbl26.rows[0].cells[c_idx].paragraphs[0].text = h_text
    style_table_header(tbl26.rows[0], t26_widths)
    for r_idx, row_values in enumerate(t26_data):
        row = tbl26.rows[r_idx + 1]
        for c_idx, val in enumerate(row_values):
            row.cells[c_idx].paragraphs[0].text = val
        bg_col = HEX_LIGHT_SLATE if r_idx % 2 == 1 else "FFFFFF"
        aligns = [WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT, 
                  WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT]
        style_table_row(row, t26_widths, hex_bg=bg_col, align_list=aligns, font_size=8.5)

    doc.add_page_break()

print("Part 3 built successfully.")
