# -*- coding: utf-8 -*-
"""
Bagian 1: Halaman Judul, Lembar Persetujuan, Pengesahan, Abstraksi, Kata Pengantar, dan Daftar Isi
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
    style_table_header, style_table_row, add_h1, add_h2, add_h3, add_p, add_bullet
)

def build_front_matter(doc):
    # -------------------------------------------------------------
    # 1. COVER / HALAMAN JUDUL
    # -------------------------------------------------------------
    p_inst = doc.add_paragraph()
    p_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_inst.paragraph_format.space_before = Pt(36)
    p_inst.paragraph_format.space_after = Pt(2)
    
    r_hdr_top = p_inst.add_run("LAPORAN HASIL AKTUALISASI\nNILAI-NILAI DASAR APARATUR SIPIL NEGARA\nBADAN PUSAT STATISTIK\n\n\n")
    r_hdr_top.font.name = "Calibri"
    r_hdr_top.font.size = Pt(13)
    r_hdr_top.font.bold = True
    r_hdr_top.font.color.rgb = COLOR_NAVY
    
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(10)
    p_title.paragraph_format.space_after = Pt(10)
    
    r_title = p_title.add_run("PENGEMBANGAN SIMPONITAS\n(SINERGI PEMBINAAN STATISTIK SEKTORAL MELALUI\nPENERBITAN KOMPROMIN AKURAT DAN BERKUALITAS)\nUNTUK MENGOPTIMALKAN TATA KELOLA SISTEM\nPEMBINAAN STATISTIK SEKTORAL\nDI BPS KABUPATEN PASAMAN\n\n\n")
    r_title.font.name = "Calibri"
    r_title.font.size = Pt(14)
    r_title.font.bold = True
    r_title.font.color.rgb = COLOR_TEXT
    
    p_author = doc.add_paragraph()
    p_author.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_author.paragraph_format.space_before = Pt(24)
    p_author.paragraph_format.space_after = Pt(4)
    
    r_oleh = p_author.add_run("Oleh:\n")
    r_oleh.font.name = "Calibri"
    r_oleh.font.size = Pt(11)
    r_oleh.font.color.rgb = COLOR_MUTED
    
    r_nama = p_author.add_run("Muhammad Rafi Tasrif\n")
    r_nama.font.name = "Calibri"
    r_nama.font.size = Pt(12)
    r_nama.font.bold = True
    r_nama.font.underline = True
    r_nama.font.color.rgb = COLOR_TEXT
    
    r_nip = p_author.add_run("NIP. 200209292026031001\n\n")
    r_nip.font.name = "Calibri"
    r_nip.font.size = Pt(11)
    r_nip.font.color.rgb = COLOR_TEXT
    
    r_jab = p_author.add_run("Pranata Komputer Ahli Pertama BPS Kabupaten Pasaman\nProvinsi Sumatera Barat\n\n\n\n")
    r_jab.font.name = "Calibri"
    r_jab.font.size = Pt(11)
    r_jab.font.bold = True
    r_jab.font.color.rgb = COLOR_NAVY
    
    p_foot = doc.add_paragraph()
    p_foot.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_foot.paragraph_format.space_before = Pt(36)
    p_foot.paragraph_format.space_after = Pt(0)
    
    r_inst_foot = p_foot.add_run("BADAN PUSAT STATISTIK\nBEKERJASAMA DENGAN\nLEMBAGA ADMINISTRASI NEGARA\nPELATIHAN DASAR CALON PNS GOLONGAN III BPS ANGKATAN XVI\nJAKARTA, TAHUN 2026")
    r_inst_foot.font.name = "Calibri"
    r_inst_foot.font.size = Pt(11)
    r_inst_foot.font.bold = True
    r_inst_foot.font.color.rgb = COLOR_NAVY
    
    doc.add_page_break()

    # -------------------------------------------------------------
    # 2. LEMBAR PERSETUJUAN
    # -------------------------------------------------------------
    p_lembar = doc.add_paragraph()
    p_lembar.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_lembar.paragraph_format.space_before = Pt(20)
    p_lembar.paragraph_format.space_after = Pt(24)
    r_lembar = p_lembar.add_run("LEMBAR PERSETUJUAN\nLAPORAN HASIL AKTUALISASI\nNILAI-NILAI DASAR APARATUR SIPIL NEGARA\nPELATIHAN DASAR CALON PNS GOLONGAN III")
    r_lembar.font.name = "Calibri"
    r_lembar.font.size = Pt(12)
    r_lembar.font.bold = True
    r_lembar.font.color.rgb = COLOR_NAVY
    
    # Identitas Peserta
    tbl_id = doc.add_table(rows=3, cols=3)
    tbl_id.alignment = WD_TABLE_ALIGNMENT.CENTER
    col_w = [Inches(1.8), Inches(0.3), Inches(4.2)]
    data_id = [
        ["Nama", ":", "Muhammad Rafi Tasrif"],
        ["NIP", ":", "200209292026031001"],
        ["Unit Kerja", ":", "Badan Pusat Statistik Kabupaten Pasaman"]
    ]
    for row_idx, r_data in enumerate(data_id):
        row = tbl_id.rows[row_idx]
        for col_idx, text in enumerate(r_data):
            cell = row.cells[col_idx]
            cell.width = col_w[col_idx]
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.space_after = Pt(2)
            r = p.add_run(text)
            r.font.name = "Calibri"
            r.font.size = Pt(11)
            if col_idx == 2 and row_idx == 0:
                r.font.bold = True
            r.font.color.rgb = COLOR_TEXT

    p_acc = doc.add_paragraph()
    p_acc.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_acc.paragraph_format.space_before = Pt(36)
    p_acc.paragraph_format.space_after = Pt(24)
    r_acc = p_acc.add_run("Telah disetujui,\nPada hari Jumat, tanggal 25 September 2026")
    r_acc.font.name = "Calibri"
    r_acc.font.size = Pt(11)
    r_acc.font.color.rgb = COLOR_TEXT
    
    # Tanda Tangan Mentor & Coach
    tbl_ttd = doc.add_table(rows=3, cols=2)
    tbl_ttd.alignment = WD_TABLE_ALIGNMENT.CENTER
    w_ttd = [Inches(3.1), Inches(3.1)]
    
    row0 = tbl_ttd.rows[0]
    p_m0 = row0.cells[0].paragraphs[0]
    p_m0.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_m0.add_run("Mentor,").font.bold = True
    
    p_c0 = row0.cells[1].paragraphs[0]
    p_c0.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_c0.add_run("Coach,").font.bold = True
    
    # Ruang tanda tangan
    row1 = tbl_ttd.rows[1]
    row1.cells[0].paragraphs[0].add_run("\n\n\n\n")
    row1.cells[1].paragraphs[0].add_run("\n\n\n\n")
    
    row2 = tbl_ttd.rows[2]
    p_m2 = row2.cells[0].paragraphs[0]
    p_m2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_m2_nama = p_m2.add_run("Muhammad Irfa’issurur\n")
    r_m2_nama.font.bold = True
    r_m2_nama.font.underline = True
    p_m2.add_run("NIP. 200204272024121003")
    
    p_c2 = row2.cells[1].paragraphs[0]
    p_c2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_c2_nama = p_c2.add_run("Martina Nurma Dewi\n")
    r_c2_nama.font.bold = True
    r_c2_nama.font.underline = True
    p_c2.add_run("NIP. 199003232013112001")
    
    for row in tbl_ttd.rows:
        for idx, cell in enumerate(row.cells):
            cell.width = w_ttd[idx]
            for p in cell.paragraphs:
                for r in p.runs:
                    r.font.name = "Calibri"
                    r.font.size = Pt(11)
                    r.font.color.rgb = COLOR_TEXT

    doc.add_page_break()

    # -------------------------------------------------------------
    # 3. BERITA ACARA PENGESAHAN
    # -------------------------------------------------------------
    p_ba = doc.add_paragraph()
    p_ba.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_ba.paragraph_format.space_before = Pt(20)
    p_ba.paragraph_format.space_after = Pt(20)
    r_ba = p_ba.add_run("BERITA ACARA PENGESAHAN\nLAPORAN HASIL AKTUALISASI\nNILAI-NILAI DASAR APARATUR SIPIL NEGARA\nPELATIHAN DASAR CALON PNS GOLONGAN III")
    r_ba.font.name = "Calibri"
    r_ba.font.size = Pt(12)
    r_ba.font.bold = True
    r_ba.font.color.rgb = COLOR_NAVY
    
    tbl_id2 = doc.add_table(rows=3, cols=3)
    tbl_id2.alignment = WD_TABLE_ALIGNMENT.CENTER
    for row_idx, r_data in enumerate(data_id):
        row = tbl_id2.rows[row_idx]
        for col_idx, text in enumerate(r_data):
            cell = row.cells[col_idx]
            cell.width = col_w[col_idx]
            p = cell.paragraphs[0]
            p.paragraph_format.space_before = Pt(2)
            p.paragraph_format.space_after = Pt(2)
            r = p.add_run(text)
            r.font.name = "Calibri"
            r.font.size = Pt(11)
            if col_idx == 2 and row_idx == 0:
                r.font.bold = True
            r.font.color.rgb = COLOR_TEXT

    p_uji = doc.add_paragraph()
    p_uji.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_uji.paragraph_format.space_before = Pt(24)
    p_uji.paragraph_format.space_after = Pt(20)
    r_uji = p_uji.add_run("Telah diuji di depan Penguji\nPada hari Senin, tanggal 28 September 2026")
    r_uji.font.name = "Calibri"
    r_uji.font.size = Pt(11)
    r_uji.font.color.rgb = COLOR_TEXT
    
    # 4 Kotak TTD (Penguji, Coach, Mentor, Peserta)
    tbl_ttd4 = doc.add_table(rows=6, cols=2)
    tbl_ttd4.alignment = WD_TABLE_ALIGNMENT.CENTER
    
    # Baris 0: Jabatan Baris 1
    p_p1 = tbl_ttd4.rows[0].cells[0].paragraphs[0]
    p_p1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_p1.add_run("Penguji,").font.bold = True
    
    p_c1 = tbl_ttd4.rows[0].cells[1].paragraphs[0]
    p_c1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_c1.add_run("Coach,").font.bold = True
    
    # Spasi TTD
    tbl_ttd4.rows[1].cells[0].paragraphs[0].add_run("\n\n\n")
    tbl_ttd4.rows[1].cells[1].paragraphs[0].add_run("\n\n\n")
    
    # Nama Baris 1
    p_pn1 = tbl_ttd4.rows[2].cells[0].paragraphs[0]
    p_pn1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_pn1 = p_pn1.add_run("Soekarno\n")
    r_pn1.font.bold = True
    r_pn1.font.underline = True
    p_pn1.add_run("NIP. 198803122010122003")
    
    p_cn1 = tbl_ttd4.rows[2].cells[1].paragraphs[0]
    p_cn1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_cn1 = p_cn1.add_run("Martina Nurma Dewi\n")
    r_cn1.font.bold = True
    r_cn1.font.underline = True
    p_cn1.add_run("NIP. 199003232013112001")
    
    # Baris 3: Jabatan Baris 2
    p_m1 = tbl_ttd4.rows[3].cells[0].paragraphs[0]
    p_m1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_m1.paragraph_format.space_before = Pt(16)
    p_m1.add_run("Mentor,").font.bold = True
    
    p_pes1 = tbl_ttd4.rows[3].cells[1].paragraphs[0]
    p_pes1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_pes1.paragraph_format.space_before = Pt(16)
    p_pes1.add_run("Peserta,").font.bold = True
    
    # Spasi TTD 2
    tbl_ttd4.rows[4].cells[0].paragraphs[0].add_run("\n\n\n")
    tbl_ttd4.rows[4].cells[1].paragraphs[0].add_run("\n\n\n")
    
    # Nama Baris 2
    p_mn1 = tbl_ttd4.rows[5].cells[0].paragraphs[0]
    p_mn1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_mn1 = p_mn1.add_run("Muhammad Irfa’issurur\n")
    r_mn1.font.bold = True
    r_mn1.font.underline = True
    p_mn1.add_run("NIP. 200204272024121003")
    
    p_pesn1 = tbl_ttd4.rows[5].cells[1].paragraphs[0]
    p_pesn1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_pesn1 = p_pesn1.add_run("Muhammad Rafi Tasrif\n")
    r_pesn1.font.bold = True
    r_pesn1.font.underline = True
    p_pesn1.add_run("NIP. 200209292026031001")
    
    for row in tbl_ttd4.rows:
        for idx, cell in enumerate(row.cells):
            cell.width = w_ttd[idx]
            for p in cell.paragraphs:
                for r in p.runs:
                    r.font.name = "Calibri"
                    r.font.size = Pt(11)
                    r.font.color.rgb = COLOR_TEXT

    doc.add_page_break()

    # -------------------------------------------------------------
    # 4. ABSTRAKSI
    # -------------------------------------------------------------
    p_abs_title = doc.add_paragraph()
    p_abs_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_abs_title.paragraph_format.space_before = Pt(10)
    p_abs_title.paragraph_format.space_after = Pt(12)
    r_absh = p_abs_title.add_run("ABSTRAKSI")
    r_absh.font.name = "Calibri"
    r_absh.font.size = Pt(12)
    r_absh.font.bold = True
    r_absh.font.color.rgb = COLOR_NAVY
    
    p_meta = doc.add_paragraph()
    p_meta.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p_meta.paragraph_format.space_before = Pt(0)
    p_meta.paragraph_format.space_after = Pt(6)
    p_meta.paragraph_format.line_spacing = 1.15
    r_auth = p_meta.add_run("MUHAMMAD RAFI TASRIF, ")
    r_auth.font.name = "Calibri"
    r_auth.font.size = Pt(10.5)
    r_auth.font.bold = True
    r_t_abs = p_meta.add_run("“Pengembangan SIMPONITAS (Sinergi Pembinaan Statistik Sektoral melalui Penerbitan Kompromin Akurat dan Berkualitas) untuk Mengoptimalkan Tata Kelola Sistem Pembinaan Statistik Sektoral di BPS Kabupaten Pasaman”\n")
    r_t_abs.font.name = "Calibri"
    r_t_abs.font.size = Pt(10.5)
    r_t_abs.font.bold = True
    r_pg = p_meta.add_run("vii + 61 halaman\n")
    r_pg.font.name = "Calibri"
    r_pg.font.size = Pt(10)
    r_pg.font.italic = True
    
    abs_text_1 = "Pelaksanaan aktualisasi ini dilatarbelakangi oleh belum optimalnya tata kelola sistem pembinaan statistik sektoral dalam mendukung implementasi Kompilasi Produk Administrasi (Kompromin) di BPS Kabupaten Pasaman, yang ditandai dengan SIMPONITAS versi lama yang masih berbasis Google Site sebagai media informasi, dashboard monitoring yang diperbarui secara manual, riwayat pembinaan dan dokumen Kompromin yang belum terdokumentasi secara terpusat, belum adanya pengaturan hak akses, serta belum tersedianya mekanisme aliran data sektoral dari Organisasi Perangkat Daerah (OPD). Aktualisasi ini bertujuan mengoptimalkan tata kelola pembinaan statistik sektoral melalui gagasan kreatif Pengembangan SIMPONITAS (Sinergi Pembinaan Statistik Sektoral melalui Penerbitan Kompromin Akurat dan Berkualitas) menjadi aplikasi web terintegrasi."
    abs_text_2 = "Pelaksanaan aktualisasi dilakukan melalui empat kegiatan utama, yaitu: (1) identifikasi kebutuhan pengembangan SIMPONITAS, (2) perancangan kebutuhan SIMPONITAS, (3) pengembangan dan hosting SIMPONITAS, serta (4) uji coba, evaluasi, dan penyempurnaan SIMPONITAS. Hasil aktualisasi berupa aplikasi web SIMPONITAS modern berbasis React.js dan Node.js serverless functions dengan basis data cloud PostgreSQL Supabase yang telah di-hosting secara daring pada tautan resmi https://simponitas-pasaman.vercel.app. Aplikasi ini memuat modul dashboard monitoring analitik eksekutif secara real-time, layanan permohonan pembinaan statistik sektoral, pencatatan riwayat dan berita acara pembinaan, repositori Kompromin terpusat, repositori data statistik sektoral, visualisasi alur data (data lineage), modul basis pengetahuan, manajemen master 20 OPD Pasaman, serta kontrol akses berbasis peran (RBAC) dengan switch toggle interaktif untuk lima kelompok pengguna."
    abs_text_3 = "Sistem telah diuji coba bersama pengguna internal BPS Kabupaten Pasaman dengan melibatkan 6 orang penguji lintas fungsi. Dari 24 butir skenario uji fungsional, sebanyak 23 skenario (95,8%) berhasil diselesaikan dengan sukses. Evaluasi menggunakan System Usability Scale (SUS) memperoleh skor rata-rata 82,5 yang termasuk dalam kategori Grade A ('Excellent') dengan tingkat penerimaan 'Acceptable'. Seluruh 6 poin rekomendasi perbaikan pengguna telah dituntaskan 100%. SIMPONITAS berkontribusi nyata pada proses pembinaan yang lebih terintegrasi, terdokumentasi, dan mudah dipantau, sekaligus memperkuat peran BPS Kabupaten Pasaman sebagai pembina statistik sektoral. Seluruh tahapan aktualisasi menjadi sarana internalisasi nilai-nilai dasar ASN BerAKHLAK sebanyak 104 aktualisasi nilai, serta penerapan prinsip Manajemen ASN dan Smart ASN dalam pelaksanaan tugas jabatan Pranata Komputer Ahli Pertama."
    
    add_p(doc, abs_text_1)
    add_p(doc, abs_text_2)
    add_p(doc, abs_text_3)
    
    p_kw = doc.add_paragraph()
    p_kw.paragraph_format.space_before = Pt(8)
    p_kw.paragraph_format.space_after = Pt(8)
    r_kwh = p_kw.add_run("Kata Kunci: ")
    r_kwh.font.name = "Calibri"
    r_kwh.font.size = Pt(10.5)
    r_kwh.font.bold = True
    r_kwc = p_kw.add_run("SIMPONITAS, pembinaan statistik sektoral, Kompromin, sistem informasi, BerAKHLAK.")
    r_kwc.font.name = "Calibri"
    r_kwc.font.size = Pt(10.5)
    r_kwc.font.italic = True
    
    doc.add_page_break()

    # -------------------------------------------------------------
    # 5. KATA PENGANTAR
    # -------------------------------------------------------------
    p_kp = doc.add_paragraph()
    p_kp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_kp.paragraph_format.space_before = Pt(10)
    p_kp.paragraph_format.space_after = Pt(12)
    r_kph = p_kp.add_run("KATA PENGANTAR")
    r_kph.font.name = "Calibri"
    r_kph.font.size = Pt(12)
    r_kph.font.bold = True
    r_kph.font.color.rgb = COLOR_NAVY
    
    kp_1 = "Puji dan syukur penulis panjatkan ke hadirat Tuhan Yang Maha Esa atas segala limpahan rahmat dan karunia-Nya sehingga penulis dapat menyelesaikan Laporan Hasil Aktualisasi yang berjudul “Pengembangan SIMPONITAS (Sinergi Pembinaan Statistik Sektoral melalui Penerbitan Kompromin Akurat dan Berkualitas) untuk Mengoptimalkan Tata Kelola Sistem Pembinaan Statistik Sektoral di BPS Kabupaten Pasaman”. Laporan ini disusun sebagai salah satu persyaratan dalam Pelatihan Dasar Calon Pegawai Negeri Sipil (CPNS) Golongan III Tahun 2026 yang diselenggarakan oleh Badan Pusat Statistik bekerja sama dengan Lembaga Administrasi Negara."
    kp_2 = "Penyusunan laporan ini tidak terlepas dari dukungan, arahan, dan bimbingan berbagai pihak. Oleh karena itu, penulis menyampaikan terima kasih yang sebesar-besarnya kepada:"
    add_p(doc, kp_1)
    add_p(doc, kp_2)
    
    pihak_list = [
        ("Bapak Dr. Ardi Adji, S.Si., M.Si., ", "selaku Plt. Kepala Pusat Pendidikan dan Pelatihan Badan Pusat Statistik Republik Indonesia;"),
        ("Bapak Nurul Hasanudin, SST., M.Stat., ", "selaku Kepala BPS Provinsi Sumatera Barat;"),
        ("Ibu Nita Andriyani, SE., ", "selaku Kepala BPS Kabupaten Pasaman yang telah memberikan izin, bimbingan, dan dukungan penuh;"),
        ("Bapak Muhammad Irfa’issurur, ", "selaku mentor yang telah sabar membimbing, memberikan arahan teknis, dan mengawal pelaksanaan aktualisasi;"),
        ("Ibu Martina Nurma Dewi, ", "selaku coach Kelompok 1 Latsar CPNS BPS Golongan III Angkatan XVI yang telah membimbing penyusunan rancangan dan laporan aktualisasi;"),
        ("Bapak Soekarno, ", "selaku penguji yang telah memberikan kritik, saran, dan masukan konstruktif demi kesempurnaan laporan aktualisasi ini;"),
        ("Bapak Yofritas dan Ibu Desma Fitri, ", "orang tua penulis, yang senantiasa mendoakan dan memberikan motivasi tulus sepanjang pelaksanaan tugas;"),
        ("Keluarga besar BPS Kabupaten Pasaman serta rekan-rekan peserta Latsar CPNS BPS Tahun 2026 Golongan III Angkatan XVI, ", "khususnya Kelompok 1 atas kerja sama, kebersamaan, dan dukungan moral yang luar biasa.")
    ]
    for idx, (nama, jabatan) in enumerate(pihak_list, 1):
        add_bullet(doc, f"{idx}. {nama}{jabatan}")
        
    kp_penutup = "Penulis menyadari bahwa laporan ini masih memiliki kekurangan. Oleh karena itu, penulis memohon maaf atas segala kekurangan tersebut dan mengharapkan kritik serta saran yang membangun. Semoga laporan ini bermanfaat bagi BPS Kabupaten Pasaman dan semua pihak yang membutuhkan."
    add_p(doc, kp_penutup)
    
    p_ttd_kp = doc.add_paragraph()
    p_ttd_kp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_ttd_kp.paragraph_format.space_before = Pt(20)
    p_ttd_kp.paragraph_format.space_after = Pt(0)
    r_ttd_kp = p_ttd_kp.add_run("Pasaman, 25 September 2026\nPeserta,\n\n\n\n")
    r_ttd_kp.font.name = "Calibri"
    r_ttd_kp.font.size = Pt(11)
    
    r_ttd_nama = p_ttd_kp.add_run("Muhammad Rafi Tasrif\n")
    r_ttd_nama.font.name = "Calibri"
    r_ttd_nama.font.size = Pt(11)
    r_ttd_nama.font.bold = True
    r_ttd_nama.font.underline = True
    
    r_ttd_nip = p_ttd_kp.add_run("NIP. 200209292026031001")
    r_ttd_nip.font.name = "Calibri"
    r_ttd_nip.font.size = Pt(11)

    doc.add_page_break()

    # -------------------------------------------------------------
    # 6. DAFTAR ISI, TABEL, GAMBAR, LAMPIRAN
    # -------------------------------------------------------------
    add_h1(doc, "DAFTAR ISI")
    
    daftar_isi_data = [
        ("ABSTRAKSI", "i"),
        ("KATA PENGANTAR", "ii"),
        ("DAFTAR ISI", "iv"),
        ("DAFTAR TABEL", "v"),
        ("DAFTAR GAMBAR", "vi"),
        ("DAFTAR LAMPIRAN", "vii"),
        ("BAB I PENDAHULUAN", "1"),
        ("   A. Deskripsi Core Issue", "1"),
        ("   B. Analisis Core Issue", "5"),
        ("   C. Gagasan Kreatif Penyelesaian Core Issue", "7"),
        ("BAB II CAPAIAN PELAKSANAAN AKTUALISASI", "10"),
        ("   A. Realisasi Jadwal Kegiatan Aktualisasi", "10"),
        ("   B. Hasil Pelaksanaan Aktualisasi", "13"),
        ("   C. Realisasi Internalisasi NND PNS (BerAKHLAK)", "27"),
        ("   D. Dampak Aktualisasi", "29"),
        ("   E. Rencana Tindak Lanjut Hasil Aktualisasi", "33"),
        ("BAB III KESIMPULAN DAN SARAN", "35"),
        ("   A. Kesimpulan", "35"),
        ("   B. Saran", "36"),
        ("DAFTAR PUSTAKA", "37"),
        ("LAMPIRAN", "39")
    ]
    
    tbl_di = doc.add_table(rows=len(daftar_isi_data), cols=2)
    tbl_di.alignment = WD_TABLE_ALIGNMENT.CENTER
    w_di = [Inches(5.5), Inches(0.9)]
    for r_idx, (judul, hal) in enumerate(daftar_isi_data):
        row = tbl_di.rows[r_idx]
        row.cells[0].width = w_di[0]
        row.cells[1].width = w_di[1]
        p0 = row.cells[0].paragraphs[0]
        p1 = row.cells[1].paragraphs[0]
        p0.paragraph_format.space_before = Pt(1)
        p0.paragraph_format.space_after = Pt(1)
        p1.paragraph_format.space_before = Pt(1)
        p1.paragraph_format.space_after = Pt(1)
        p1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        r0 = p0.add_run(judul)
        r1 = p1.add_run(hal)
        r0.font.name = "Calibri"
        r1.font.name = "Calibri"
        r0.font.size = Pt(10)
        r1.font.size = Pt(10)
        if "BAB" in judul or judul.isupper():
            r0.font.bold = True
            r1.font.bold = True
            
    doc.add_page_break()

    # DAFTAR TABEL
    add_h1(doc, "DAFTAR TABEL")
    daftar_tabel_data = [
        ("Tabel 1.1 Intervensi terhadap Akar Penyebab Core Issue", "6"),
        ("Tabel 1.2 Hasil Tapisan McNamara Gagasan Kreatif", "7"),
        ("Tabel 2.1 Realisasi Kegiatan Aktualisasi", "11"),
        ("Tabel 2.2 Pembahasan Hasil Aktualisasi", "12"),
        ("Tabel 2.3 Realisasi Internalisasi NND PNS (BerAKHLAK)", "27"),
        ("Tabel 2.4 Perbandingan Kondisi Sebelum dan Sesudah Pengembangan SIMPONITAS", "29"),
        ("Tabel 2.5 Nilai Tambah Pengembangan SIMPONITAS", "30"),
        ("Tabel 2.6 Rencana Tindak Lanjut Hasil Aktualisasi", "32")
    ]
    tbl_dt = doc.add_table(rows=len(daftar_tabel_data), cols=2)
    tbl_dt.alignment = WD_TABLE_ALIGNMENT.CENTER
    for r_idx, (judul, hal) in enumerate(daftar_tabel_data):
        row = tbl_dt.rows[r_idx]
        row.cells[0].width = w_di[0]
        row.cells[1].width = w_di[1]
        p0 = row.cells[0].paragraphs[0]
        p1 = row.cells[1].paragraphs[0]
        p0.paragraph_format.space_before = Pt(2)
        p0.paragraph_format.space_after = Pt(2)
        p1.paragraph_format.space_before = Pt(2)
        p1.paragraph_format.space_after = Pt(2)
        p1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        r0 = p0.add_run(judul)
        r1 = p1.add_run(hal)
        r0.font.name = "Calibri"
        r1.font.name = "Calibri"
        r0.font.size = Pt(10)
        r1.font.size = Pt(10)

    # DAFTAR GAMBAR
    add_h1(doc, "DAFTAR GAMBAR")
    daftar_gambar_data = [
        ("Gambar 1.1 Pendaftaran Pembinaan melalui SIMPONITAS Versi Lama (Google Site)", "2"),
        ("Gambar 1.2 Dashboard Monitoring SIMPONITAS Versi Lama", "2"),
        ("Gambar 1.3 Diagram Fishbone Core Issue", "5")
    ]
    tbl_dg = doc.add_table(rows=len(daftar_gambar_data), cols=2)
    tbl_dg.alignment = WD_TABLE_ALIGNMENT.CENTER
    for r_idx, (judul, hal) in enumerate(daftar_gambar_data):
        row = tbl_dg.rows[r_idx]
        row.cells[0].width = w_di[0]
        row.cells[1].width = w_di[1]
        p0 = row.cells[0].paragraphs[0]
        p1 = row.cells[1].paragraphs[0]
        p0.paragraph_format.space_before = Pt(2)
        p0.paragraph_format.space_after = Pt(2)
        p1.paragraph_format.space_before = Pt(2)
        p1.paragraph_format.space_after = Pt(2)
        p1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        r0 = p0.add_run(judul)
        r1 = p1.add_run(hal)
        r0.font.name = "Calibri"
        r1.font.name = "Calibri"
        r0.font.size = Pt(10)
        r1.font.size = Pt(10)

    # DAFTAR LAMPIRAN
    add_h1(doc, "DAFTAR LAMPIRAN")
    daftar_lampiran_data = [
        ("Lampiran 1. Laporan Minggu ke-I", "37"),
        ("Lampiran 2. Laporan Minggu ke-II", "40"),
        ("Lampiran 3. Laporan Minggu ke-III", "43"),
        ("Lampiran 4. Laporan Minggu ke-IV", "46"),
        ("Lampiran 5. Laporan Minggu ke-V", "49"),
        ("Lampiran 6. Laporan Minggu ke-VI", "53"),
        ("Lampiran 7. Rekapitulasi Tautan Bukti Dukung Setiap Tahapan Kegiatan", "57"),
        ("Lampiran 8. Tangkapan Layar SIMPONITAS Hasil Pengembangan", "60"),
        ("Lampiran 9. Dokumentasi dan Hasil Uji Coba SIMPONITAS", "61")
    ]
    tbl_dl = doc.add_table(rows=len(daftar_lampiran_data), cols=2)
    tbl_dl.alignment = WD_TABLE_ALIGNMENT.CENTER
    for r_idx, (judul, hal) in enumerate(daftar_lampiran_data):
        row = tbl_dl.rows[r_idx]
        row.cells[0].width = w_di[0]
        row.cells[1].width = w_di[1]
        p0 = row.cells[0].paragraphs[0]
        p1 = row.cells[1].paragraphs[0]
        p0.paragraph_format.space_before = Pt(2)
        p0.paragraph_format.space_after = Pt(2)
        p1.paragraph_format.space_before = Pt(2)
        p1.paragraph_format.space_after = Pt(2)
        p1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        r0 = p0.add_run(judul)
        r1 = p1.add_run(hal)
        r0.font.name = "Calibri"
        r1.font.name = "Calibri"
        r0.font.size = Pt(10)
        r1.font.size = Pt(10)

    doc.add_page_break()

print("Part 1 built successfully.")
