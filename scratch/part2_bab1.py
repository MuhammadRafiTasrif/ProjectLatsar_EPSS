# -*- coding: utf-8 -*-
"""
Bagian 2: BAB I PENDAHULUAN
Memenuhi kaidah antislop (tanpa em dash, bahasa lugas, profesional).
"""

import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from report_styles import (
    COLOR_NAVY, COLOR_ROYAL, COLOR_ORANGE, COLOR_TEXT, COLOR_MUTED,
    HEX_NAVY, HEX_ROYAL, HEX_LIGHT_BLUE, HEX_LIGHT_SLATE, HEX_BORDER,
    HEX_HEADER_GRAY, set_cell_background, set_cell_margins, set_table_borders,
    style_table_header, style_table_row, add_h1, add_h2, add_h3, add_p, add_bullet, add_callout
)

def build_bab1(doc):
    # =============================================================
    # BAB I PENDAHULUAN
    # =============================================================
    add_h1(doc, "BAB I PENDAHULUAN")
    
    # -------------------------------------------------------------
    # A. Deskripsi Core Issue
    # -------------------------------------------------------------
    add_h2(doc, "A. Deskripsi Core Issue")
    
    p1 = ("Badan Pusat Statistik (BPS) mengemban amanat sebagai pembina penyelenggaraan statistik sektoral "
          "sebagaimana diatur dalam Undang-Undang Nomor 16 Tahun 1997 tentang Statistik dan Peraturan Pemerintah "
          "Nomor 51 Tahun 1999 tentang Penyelenggaraan Statistik, serta berperan sebagai pembina data statistik "
          "dalam kerangka Satu Data Indonesia sebagaimana diatur dalam Peraturan Presiden Nomor 39 Tahun 2019. "
          "Di tingkat kabupaten, BPS Kabupaten Pasaman melaksanakan peran tersebut melalui pendampingan penyusunan "
          "Kompilasi Produk Administrasi (Kompromin), pembinaan penyusunan metadata statistik, pendampingan pengajuan "
          "rekomendasi kegiatan statistik (Romantik), serta konsultasi teknis penyelenggaraan statistik sektoral "
          "kepada Organisasi Perangkat Daerah (OPD).")
    add_p(doc, p1)
    
    p2 = ("Peran pembinaan tersebut semakin strategis karena Pemerintah Kabupaten Pasaman telah menjalin kerja sama "
          "dengan BPS Kabupaten Pasaman dalam penguatan penyelenggaraan statistik sektoral, dengan komitmen agar setiap "
          "OPD secara bertahap menyusun Kompromin sebagai bentuk pemanfaatan data administrasi menjadi statistik yang "
          "berkualitas. Sebagai anggota Tim Statistik Sektoral, penulis bertugas melaksanakan monitoring permintaan "
          "pembinaan statistik sektoral serta penyusunan Kompromin bersama OPD. Oleh karena itu, isu “Belum optimalnya "
          "tata kelola sistem pembinaan statistik sektoral dalam mendukung implementasi Kompilasi Produk Administrasi "
          "(Kompromin) di BPS Kabupaten Pasaman” berkaitan langsung dengan pelaksanaan tugas penulis sehari-hari.")
    add_p(doc, p2)
    
    p3 = ("Meningkatnya intensitas pembinaan belum diimbangi dengan dukungan sistem informasi yang mampu mengelola "
          "seluruh proses pembinaan secara terintegrasi. SIMPONITAS yang digunakan sebelumnya masih berupa Google Site "
          "yang berfungsi sebagai media informasi statis. Permintaan pembinaan dihimpun melalui Google Form yang "
          "disematkan pada halaman tersebut (Gambar 1.1), sedangkan dashboard monitoring Kompromin masih berupa grafik "
          "yang harus diperbarui secara manual (Gambar 1.2). Pada saat isu diangkat, dashboard tersebut menampilkan 4 OPD "
          "yang telah memiliki Kompromin dan 16 OPD yang belum, tetapi angka tersebut tidak terhubung dengan basis data "
          "sehingga kemutakhirannya sangat bergantung pada pembaruan manual oleh petugas.")
    add_p(doc, p3)
    
    add_callout(doc, "CATATAN DOKUMENTASI SISTEM AWAL (SEBELUM AKTUALISASI)",
                "Gambar 1.1: Formulir pendaftaran pembinaan melalui Google Form yang disematkan pada Google Site SIMPONITAS lama.\n"
                "Gambar 1.2: Dashboard monitoring pembuatan Kompromin OPD yang diperbarui secara manual melalui grafik statis.",
                bg="FFF7ED", border="F79039")
    
    p4 = "Kondisi yang menunjukkan belum optimalnya tata kelola sistem pembinaan statistik sektoral dapat dilihat dari beberapa indikator berikut:"
    add_p(doc, p4)
    
    indikator_list = [
        "SIMPONITAS masih berbasis Google Site dan berfungsi sebatas media informasi pembinaan statistik sektoral.",
        "Informasi pembinaan dan dashboard monitoring masih diperbarui secara manual dan belum terhubung langsung dengan basis data.",
        "Belum tersedia fitur pencatatan riwayat pembinaan setiap OPD sehingga perkembangan pembinaan belum terdokumentasi dalam satu sistem.",
        "Dokumen Kompromin belum tersimpan dalam repositori terpusat sehingga penyimpanan dan penelusuran dokumen dilakukan melalui media yang terpisah.",
        "Pengaturan hak akses pengguna belum tersedia sehingga akses terhadap menu dan fitur belum dibedakan berdasarkan kewenangan pengguna.",
        "Belum tersedia mekanisme penghimpunan dan aliran data sektoral dari OPD yang terintegrasi untuk mendukung kebutuhan data BPS."
    ]
    for idx, ind in enumerate(indikator_list, 1):
        add_bullet(doc, f"{idx}. {ind}")
        
    p5 = ("Kondisi yang diharapkan adalah tersedianya SIMPONITAS sebagai sistem informasi yang mengintegrasikan seluruh "
          "proses pembinaan, mulai dari pengajuan permohonan pembinaan, monitoring pelaksanaan, pendokumentasian riwayat "
          "pembinaan, penyimpanan Kompromin dalam repositori terpusat, hingga penghimpunan data statistik sektoral dari OPD. "
          "Dashboard monitoring diharapkan diperbarui secara otomatis dari basis data, dan hak akses dibedakan sesuai kewenangan pengguna.")
    add_p(doc, p5)
    
    p6 = ("Isu ini ditetapkan sebagai core issue berdasarkan analisis APKL (Aktual, Problematik, Kekhalayakan, dan Kelayakan) "
          "dengan skor tertinggi, yaitu 18 (Aktual 5, Problematik 4, Kekhalayakan 5, dan Kelayakan 4), dibandingkan isu pencatatan "
          "persediaan BMN (skor 16) dan pengelolaan bukti dukung SAKIP (skor 15). Isu bersifat aktual karena pembinaan statistik "
          "sektoral sedang dilaksanakan secara intensif sebagai tindak lanjut kerja sama dengan Pemerintah Kabupaten Pasaman. "
          "Isu bersifat problematik karena ketiadaan sistem terintegrasi menyulitkan monitoring, dokumentasi, dan penelusuran data. "
          "Kriteria kekhalayakan terpenuhi karena dampaknya dirasakan oleh BPS, seluruh OPD, Pemerintah Kabupaten Pasaman, dan "
          "masyarakat pengguna data. Isu juga layak diselesaikan karena berada dalam lingkup tugas penulis sebagai Pranata Komputer "
          "di Tim Statistik Sektoral dan dapat diselesaikan melalui pengembangan sistem informasi dalam periode aktualisasi.")
    add_p(doc, p6)
    
    p7 = ("Isu ini berkaitan erat dengan Mata Pelatihan Agenda III. Dari sisi Manajemen ASN, penyelesaian isu mendukung peningkatan "
          "efektivitas dan efisiensi pelaksanaan tugas BPS melalui digitalisasi proses pembinaan, memperkuat koordinasi, meningkatkan "
          "akuntabilitas, dan mendukung pengambilan keputusan berbasis data sebagai wujud ASN yang profesional dalam menjalankan "
          "fungsi pelaksana kebijakan publik dan pelayan publik. Dari sisi Smart ASN, isu ini menuntut kecakapan digital ASN dalam "
          "memanfaatkan teknologi informasi untuk menghasilkan inovasi layanan pembinaan yang lebih terintegrasi, aman, dan kolaboratif "
          "antara BPS dan OPD.")
    add_p(doc, p7)
    
    p8 = "Apabila isu ini tidak diselesaikan, dampak yang dapat timbul terhadap berbagai pihak adalah sebagai berikut:"
    add_p(doc, p8)
    
    dampak_list = [
        ("Individu peserta: ", "penelusuran riwayat pembinaan dan dokumen Kompromin membutuhkan waktu lebih lama, pekerjaan monitoring kurang efisien, dan potensi kesalahan administrasi meningkat."),
        ("Unit kerja peserta (Tim Statistik Sektoral): ", "monitoring perkembangan pembinaan setiap OPD kurang efektif, evaluasi pembinaan memerlukan waktu lebih lama, dan risiko kehilangan informasi maupun permintaan data berulang kepada OPD meningkat."),
        ("Unit kerja lain di BPS Pasaman: ", "tim yang memanfaatkan data sektoral, seperti Tim Neraca Wilayah dan Analisis Statistik, Tim Sosial, Tim Produksi, Tim Distribusi, dan Tim IPDS, kesulitan memperoleh data terverifikasi untuk penyusunan publikasi seperti Pasaman Dalam Angka (DDA) dan PDRB."),
        ("Stakeholder eksternal: ", "Pemerintah Kabupaten Pasaman kesulitan memantau implementasi kerja sama, OPD tidak memiliki media terpadu untuk mengajukan pembinaan dan melihat riwayatnya, serta masyarakat pengguna data memiliki akses terbatas terhadap Kompromin dan data statistik sektoral.")
    ]
    for b_prefix, b_text in dampak_list:
        add_bullet(doc, b_text, bold_prefix=b_prefix)

    # -------------------------------------------------------------
    # B. Analisis Core Issue
    # -------------------------------------------------------------
    add_h2(doc, "B. Analisis Core Issue")
    
    pb1 = ("Untuk mengetahui akar penyebab core issue, penulis menggunakan Diagram Fishbone (Cause and Effect Analysis) "
           "dengan enam aspek analisis komprehensif, yaitu Man, Method, Machine, Material, Measurement, dan Management "
           "(Gambar 1.3 Diagram Fishbone Core Issue):")
    add_p(doc, pb1)
    
    fishbone_items = [
        ("1. Aspek Man (SDM): ", "Pemahaman mengenai statistik sektoral antar-OPD belum merata, proses pembinaan masih bergantung pada individu tertentu, dan koordinasi dilakukan melalui berbagai media komunikasi yang berbeda sehingga riwayat pembinaan sulit ditelusuri. Penyebab ini dapat dikurangi dengan menyediakan satu kanal pembinaan yang terdokumentasi sehingga informasi tidak lagi melekat pada individu tertentu."),
        ("2. Aspek Method (Metode): ", "Alur pembinaan belum terdokumentasi secara digital, monitoring pembinaan masih dilakukan secara manual, dan riwayat pembinaan belum didokumentasikan secara sistematis. Penyebab ini dapat diatasi dengan menuangkan alur pembinaan ke dalam alur kerja sistem, mulai dari pengajuan, verifikasi, pelaksanaan, hingga pencatatan berita acara pembinaan."),
        ("3. Aspek Machine (Teknologi): ", "SIMPONITAS masih berbasis Google Site, dashboard monitoring belum interaktif, riwayat pembinaan kurang detail, belum memiliki basis data terpusat, dan belum memiliki menu aliran data dari OPD. Aspek ini menjadi akar penyebab yang paling dominan karena hampir seluruh penyebab pada aspek lain bermuara pada ketiadaan sistem yang terintegrasi. Penyebab ini dapat diatasi dengan mengembangkan SIMPONITAS menjadi aplikasi web yang terhubung dengan basis data."),
        ("4. Aspek Material (Data): ", "Repositori Kompromin belum terpusat dan pengumpulan data statistik sektoral masih belum terintegrasi karena tersebar di berbagai folder Google Drive. Penyebab ini dapat diatasi dengan menyediakan repositori Kompromin dan repositori data statistik sektoral di dalam sistem."),
        ("5. Aspek Measurement (Pengukuran): ", "Indikator monitoring belum terdefinisi dengan jelas, progres belum dapat dipantau secara real-time, dan evaluasi membutuhkan waktu yang relatif lama. Penyebab ini dapat diatasi melalui dashboard yang menampilkan indikator pembinaan secara otomatis, seperti rasio OPD terbina dan status Kompromin setiap OPD."),
        ("6. Aspek Management (Manajemen): ", "Pemanfaatan SIMPONITAS belum optimal, monitoring implementasi penyusunan Kompromin belum jelas, dan dashboard pimpinan belum tersedia. Penyebab ini memerlukan dukungan pimpinan, tetapi dapat difasilitasi dengan menyediakan dashboard ringkas yang dapat digunakan pimpinan sebagai dasar pengambilan keputusan.")
    ]
    for b_prefix, b_text in fishbone_items:
        add_p(doc, b_text, bold_prefix=b_prefix)
        
    pb2 = ("Berdasarkan analisis tersebut, akar penyebab utama core issue adalah belum optimalnya sistem informasi manajemen "
           "pembinaan statistik sektoral yang mampu mengintegrasikan proses pembinaan, pengelolaan data statistik sektoral, "
           "dokumentasi, monitoring capaian pembinaan, serta repositori Kompromin secara digital. Sesuai kewenangan penulis "
           "sebagai CPNS Pranata Komputer, intervensi aktualisasi difokuskan pada aspek Machine dan Material yang dapat "
           "diselesaikan melalui pemanfaatan teknologi informasi, sebagaimana dirinci pada Tabel 1.1 berikut.")
    add_p(doc, pb2)
    
    # Tabel 1.1
    p_t1 = doc.add_paragraph()
    p_t1.paragraph_format.space_before = Pt(6)
    p_t1.paragraph_format.space_after = Pt(4)
    r_t1 = p_t1.add_run("Tabel 1.1 Intervensi terhadap Akar Penyebab Core Issue")
    r_t1.font.bold = True
    r_t1.font.size = Pt(10.5)
    r_t1.font.color.rgb = COLOR_NAVY
    
    t1_headers = ["No", "Penyebab", "Kondisi Saat Ini", "Intervensi yang Dilakukan"]
    t1_widths = [Inches(0.5), Inches(1.8), Inches(2.1), Inches(2.1)]
    t1_data = [
        ["1.", "Monitoring pembinaan masih manual", "Dashboard diperbarui secara manual", "Membangun dashboard monitoring dinamis secara real-time"],
        ["2.", "Riwayat pembinaan belum terdokumentasi", "Sulit mengetahui status pembinaan setiap OPD", "Menyediakan fitur riwayat dan berita acara pembinaan digital"],
        ["3.", "Repositori Kompromin belum tersedia", "Dokumen tersebar di berbagai media penyimpanan", "Membangun repositori Kompromin terpusat"],
        ["4.", "Data statistik sektoral belum terintegrasi", "Data sektoral tersebar di Google Drive pribadi", "Membangun repositori data statistik sektoral terpadu"],
        ["5.", "Belum ada dokumentasi aliran data", "Asal-usul dan penelusuran data sulit dipantau", "Menambahkan fitur visualisasi aliran data dari OPD (Data Lineage)"]
    ]
    tbl1 = doc.add_table(rows=len(t1_data) + 1, cols=4)
    tbl1.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(tbl1)
    
    # Style header
    for c_idx, h_text in enumerate(t1_headers):
        tbl1.rows[0].cells[c_idx].paragraphs[0].text = h_text
    style_table_header(tbl1.rows[0], t1_widths)
    
    for r_idx, row_values in enumerate(t1_data):
        row = tbl1.rows[r_idx + 1]
        for c_idx, val in enumerate(row_values):
            row.cells[c_idx].paragraphs[0].text = val
        bg_col = HEX_LIGHT_SLATE if r_idx % 2 == 1 else "FFFFFF"
        aligns = [WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT]
        style_table_row(row, t1_widths, hex_bg=bg_col, align_list=aligns)

    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(4)

    # -------------------------------------------------------------
    # C. Gagasan Kreatif Penyelesaian Core Issue
    # -------------------------------------------------------------
    add_h2(doc, "C. Gagasan Kreatif Penyelesaian Core Issue")
    
    pc1 = ("Berdasarkan akar penyebab tersebut, penulis merumuskan tiga gagasan alternatif pemecahan isu, yaitu: "
           "(1) penyusunan SOP dan administrasi pembinaan statistik sektoral, (2) pengembangan dashboard monitoring "
           "pembinaan statistik sektoral, serta (3) pengembangan sistem informasi SIMPONITAS. Ketiga gagasan dinilai "
           "menggunakan metode Tapisan McNamara berdasarkan kriteria efektivitas, kemudahan, dan biaya, sebagaimana "
           "disajikan pada Tabel 1.2 berikut.")
    add_p(doc, pc1)
    
    # Tabel 1.2
    p_t2 = doc.add_paragraph()
    p_t2.paragraph_format.space_before = Pt(6)
    p_t2.paragraph_format.space_after = Pt(4)
    r_t2 = p_t2.add_run("Tabel 1.2 Hasil Tapisan McNamara Gagasan Kreatif")
    r_t2.font.bold = True
    r_t2.font.size = Pt(10.5)
    r_t2.font.color.rgb = COLOR_NAVY
    
    t2_headers = ["No", "Gagasan Alternatif", "Efektivitas", "Kemudahan", "Biaya", "Jumlah", "Peringkat"]
    t2_widths = [Inches(0.5), Inches(2.7), Inches(0.8), Inches(0.8), Inches(0.7), Inches(0.8), Inches(0.8)]
    t2_data = [
        ["1.", "Penyusunan SOP dan administrasi pembinaan statistik sektoral", "2", "3", "3", "8", "III"],
        ["2.", "Pengembangan Dashboard Monitoring Pembinaan Statistik Sektoral", "3", "4", "3", "10", "II"],
        ["3.", "Pengembangan SIMPONITAS (Aplikasi Web Terintegrasi)", "5", "3", "3", "11", "I (Terpilih)"]
    ]
    tbl2 = doc.add_table(rows=len(t2_data) + 1, cols=7)
    tbl2.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(tbl2)
    
    for c_idx, h_text in enumerate(t2_headers):
        tbl2.rows[0].cells[c_idx].paragraphs[0].text = h_text
    style_table_header(tbl2.rows[0], t2_widths)
    
    for r_idx, row_values in enumerate(t2_data):
        row = tbl2.rows[r_idx + 1]
        for c_idx, val in enumerate(row_values):
            row.cells[c_idx].paragraphs[0].text = val
        bg_col = HEX_LIGHT_BLUE if r_idx == 2 else ("FFFFFF" if r_idx % 2 == 0 else HEX_LIGHT_SLATE)
        aligns = [WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.CENTER, 
                  WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.CENTER]
        style_table_row(row, t2_widths, hex_bg=bg_col, align_list=aligns, is_bold=(r_idx == 2))

    pc2 = ("Gagasan kreatif terpilih adalah Pengembangan SIMPONITAS (Sinergi Pembinaan Statistik Sektoral melalui "
           "Penerbitan Kompromin Akurat dan Berkualitas). Gagasan ini menjawab akar penyebab paling dominan, yaitu belum "
           "adanya sistem terintegrasi, sekaligus mencakup manfaat gagasan lain: dashboard monitoring menjadi salah satu "
           "modul intinya, dan alur pembinaan yang dituangkan dalam sistem berfungsi layaknya prosedur baku yang terdokumentasi.")
    add_p(doc, pc2)
    
    pc3 = ("Unsur kreatif gagasan ini terletak pada transformasi SIMPONITAS dari halaman informasi statis berbasis Google Site "
           "menjadi aplikasi web terintegrasi tanpa memerlukan biaya pengadaan perangkat lunak berbayar. SIMPONITAS dikembangkan "
           "dengan arsitektur modern menggunakan React.js di sisi antarmuka pengguna, Node.js serverless functions di sisi logika "
           "aplikasi, dan layanan cloud database PostgreSQL Supabase serta Vercel untuk hosting publik. Sistem ini mempertemukan "
           "BPS dan OPD dalam satu ruang kerja digital dengan hak akses berbasis peran (RBAC) yang dibedakan untuk Admin BPS, "
           "Ketua Tim Statistik Sektoral, Walidata OPD, Produsen Data, dan Publik. Pengembangan ini merupakan penyempurnaan dari "
           "SIMPONITAS yang telah digagas sebelumnya dalam Aksi Perubahan Kepala BPS Kabupaten Pasaman, sehingga hasil aktualisasi "
           "ini melanjutkan dan memperkuat inovasi organisasi yang sudah ada.")
    add_p(doc, pc3)
    
    pc4 = "Untuk mewujudkan gagasan tersebut, telah dilaksanakan empat kegiatan aktualisasi sebagai berikut:"
    add_p(doc, pc4)
    
    keg_list = [
        ("1. Identifikasi Kebutuhan Pengembangan SIMPONITAS: ", "mempelajari ketentuan dan mekanisme pembinaan serta penerbitan Kompromin, memetakan alur proses pembinaan yang berjalan, berkonsultasi dengan mentor, mengidentifikasi kebutuhan pengguna bersama tim terkait, dan menyusun dokumen spesifikasi kebutuhan sistem."),
        ("2. Perancangan Kebutuhan SIMPONITAS: ", "mengidentifikasi modul dan fitur yang akan dibangun, merancang arsitektur sistem tiga lapisan (3-tier), merancang struktur basis data (ERD dan kamus data), mendesain antarmuka pengguna (mockup dashboard), serta menyempurnakan rancangan bersama mentor."),
        ("3. Pengembangan dan Hosting SIMPONITAS: ", "membangun struktur basis data, mengembangkan backend API serverless dan logika bisnis, membangun dashboard antarmuka visualisasi data dengan React.js, mengintegrasikan antarmuka dengan basis data, serta melakukan deployment hosting ke platform cloud dengan koneksi aman HTTPS."),
        ("4. Uji Coba, Evaluasi, dan Penyempurnaan SIMPONITAS: ", "menyusun skenario dan instrumen uji coba (test plan dan kuesioner SUS), melaksanakan uji coba bersama 6 pengguna internal BPS Pasaman, menghimpun evaluasi pengguna, melakukan perbaikan kode (bug fixing dan refinement), berkonsultasi mengenai hasil penyempurnaan kepada mentor, dan menyusun laporan akhir aktualisasi.")
    ]
    for b_prefix, b_text in keg_list:
        add_bullet(doc, b_text, bold_prefix=b_prefix)
        
    pc5 = ("Sesuai ruang lingkup rancangan aktualisasi, pelaksanaan aktualisasi difokuskan pada pengembangan sistem hingga tahap "
           "uji coba, evaluasi, dan penyempurnaan bersama pengguna internal BPS Kabupaten Pasaman. Implementasi penuh dan sosialisasi "
           "kepada seluruh Organisasi Perangkat Daerah (OPD) direncanakan sebagai agenda tindak lanjut pasca-pelatihan dasar.")
    add_p(doc, pc5)

    doc.add_page_break()

print("Part 2 built successfully.")
