# -*- coding: utf-8 -*-
"""
Bagian 5: LAMPIRAN LENGKAP (Lampiran 1 s.d. 9)
Memenuhi kaidah antislop (tanpa em dash, akurat, profesional).
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

def build_lampiran(doc):
    # =============================================================
    # LAMPIRAN-LAMPIRAN
    # =============================================================
    add_h1(doc, "LAMPIRAN")
    
    # -------------------------------------------------------------
    # Helper Laporan Mingguan
    # -------------------------------------------------------------
    def add_laporan_mingguan(minggu_num, tgl_str, keg_title, output_str, link_str, tahapan_list, rekap_vals, catatan_mentor, catatan_coach):
        add_h2(doc, f"Lampiran {minggu_num}. Laporan Minggu ke-{minggu_num}")
        p_sub = doc.add_paragraph()
        p_sub.paragraph_format.space_before = Pt(2)
        p_sub.paragraph_format.space_after = Pt(6)
        r_sub = p_sub.add_run("Laporan Mingguan Pelaksanaan Aktualisasi Pelatihan Dasar CPNS BPS Tahun 2026")
        r_sub.font.bold = True
        r_sub.font.color.rgb = COLOR_NAVY
        
        # Tabel Identitas Mingguan
        tbl_m = doc.add_table(rows=7, cols=3)
        tbl_m.alignment = WD_TABLE_ALIGNMENT.CENTER
        set_table_borders(tbl_m)
        w_m = [Inches(1.5), Inches(0.2), Inches(4.8)]
        
        m_info = [
            ("Nama Peserta", ":", "Muhammad Rafi Tasrif"),
            ("Angkatan", ":", "Latsar CPNS BPS Golongan III Angkatan XVI (STIS 3-16)"),
            ("Minggu ke- / Tanggal", ":", f"Minggu ke-{minggu_num} / {tgl_str}"),
            ("Kegiatan", ":", keg_title),
            ("Output Kegiatan", ":", f"{output_str}\n(Berkas lengkap: {link_str})"),
            ("Catatan Mentor", ":", catatan_mentor),
            ("Catatan Coach", ":", catatan_coach)
        ]
        
        for idx, (lbl, col, val) in enumerate(m_info):
            row = tbl_m.rows[idx]
            row.cells[0].width = w_m[0]
            row.cells[1].width = w_m[1]
            row.cells[2].width = w_m[2]
            set_cell_background(row.cells[0], HEX_LIGHT_SLATE)
            set_cell_margins(row.cells[0], top=60, bottom=60, left=100, right=100)
            set_cell_margins(row.cells[1], top=60, bottom=60, left=40, right=40)
            set_cell_margins(row.cells[2], top=60, bottom=60, left=100, right=100)
            
            p0 = row.cells[0].paragraphs[0]
            p0.paragraph_format.space_before = Pt(0)
            p0.paragraph_format.space_after = Pt(2)
            r0 = p0.add_run(lbl)
            r0.font.name = "Calibri"
            r0.font.size = Pt(9)
            r0.font.bold = True
            
            p1 = row.cells[1].paragraphs[0]
            p1.paragraph_format.space_before = Pt(0)
            p1.paragraph_format.space_after = Pt(2)
            r1 = p1.add_run(col)
            r1.font.name = "Calibri"
            r1.font.size = Pt(9)
            
            p2 = row.cells[2].paragraphs[0]
            p2.paragraph_format.space_before = Pt(0)
            p2.paragraph_format.space_after = Pt(2)
            p2.paragraph_format.line_spacing = 1.15
            p2.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            r2 = p2.add_run(val)
            r2.font.name = "Calibri"
            r2.font.size = Pt(9)
            if "Catatan" in lbl:
                r2.font.italic = True
                
        # Tabel Tahapan & BerAKHLAK Mingguan
        p_th_hdr = doc.add_paragraph()
        p_th_hdr.paragraph_format.space_before = Pt(6)
        p_th_hdr.paragraph_format.space_after = Pt(3)
        r_thh = p_th_hdr.add_run(f"Rincian Tahapan Pelaksanaan Minggu ke-{minggu_num}:")
        r_thh.font.bold = True
        r_thh.font.size = Pt(9.5)
        
        tbl_th = doc.add_table(rows=len(tahapan_list) + 1, cols=3)
        tbl_th.alignment = WD_TABLE_ALIGNMENT.CENTER
        set_table_borders(tbl_th)
        w_th = [Inches(1.8), Inches(3.2), Inches(1.5)]
        
        th_headers = ["Tahapan Kegiatan", "Uraian Pelaksanaan & Penerapan BerAKHLAK", "Output & Bukti Fisik"]
        for c_idx, h_text in enumerate(th_headers):
            tbl_th.rows[0].cells[c_idx].paragraphs[0].text = h_text
        style_table_header(tbl_th.rows[0], w_th)
        
        for r_idx, (t_name, t_desc, t_out) in enumerate(tahapan_list):
            row = tbl_th.rows[r_idx + 1]
            row.cells[0].paragraphs[0].text = t_name
            row.cells[1].paragraphs[0].text = t_desc
            row.cells[2].paragraphs[0].text = t_out
            bg_col = HEX_LIGHT_SLATE if r_idx % 2 == 1 else "FFFFFF"
            aligns = [WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.JUSTIFY, WD_ALIGN_PARAGRAPH.LEFT]
            style_table_row(row, w_th, hex_bg=bg_col, align_list=aligns, font_size=8.5)
            
        # Tabel Mini Rekap BerAKHLAK Mingguan
        p_rk = doc.add_paragraph()
        p_rk.paragraph_format.space_before = Pt(4)
        p_rk.paragraph_format.space_after = Pt(2)
        r_rkh = p_rk.add_run(f"Rekapitulasi Nilai Dasar BerAKHLAK Minggu ke-{minggu_num}:")
        r_rkh.font.bold = True
        r_rkh.font.size = Pt(9)
        
        tbl_rk = doc.add_table(rows=2, cols=8)
        tbl_rk.alignment = WD_TABLE_ALIGNMENT.CENTER
        set_table_borders(tbl_rk)
        w_rk = [Inches(0.8)] * 8
        rk_headers = ["Berorientasi", "Akuntabel", "Kompeten", "Harmonis", "Loyal", "Adaptif", "Kolaboratif", "TOTAL"]
        for c_idx, h_text in enumerate(rk_headers):
            tbl_rk.rows[0].cells[c_idx].paragraphs[0].text = h_text
        style_table_header(tbl_rk.rows[0], w_rk, hex_bg=HEX_NAVY)
        
        for c_idx, val in enumerate(rekap_vals):
            tbl_rk.rows[1].cells[c_idx].paragraphs[0].text = str(val)
        style_table_row(tbl_rk.rows[1], w_rk, hex_bg=HEX_LIGHT_BLUE, 
                        align_list=[WD_ALIGN_PARAGRAPH.CENTER]*8, font_size=9, is_bold=True)
        
        doc.add_page_break()

    # LAMPIRAN 1: MINGGU I
    k1_m1_tahapan = [
        ("1.1 Mempelajari Mekanisme Pembinaan dan Kompromin", 
         "Mempelajari ketentuan perundangan dan modul proses bisnis pembinaan statistik sektoral serta Laporan Aksi Perubahan cikal bakal SIMPONITAS.\nBerAKHLAK: Kompeten, Akuntabel, Loyal, Adaptif, Berorientasi Pelayanan.",
         "Catatan pembelajaran mekanisme pembinaan dan penerbitan Kompromin."),
        ("1.2 Mempelajari dan Memetakan Alur Berjalan", 
         "Memetakan alur pembinaan berjalan yang masih menggunakan Google Form dan Google Site statis.\nBerAKHLAK: Kompeten, Akuntabel, Berorientasi Pelayanan, Adaptif, Loyal.",
         "Peta alur proses pembinaan statistik sektoral yang berjalan."),
        ("1.3 Melakukan Konsultasi dengan Mentor", 
         "Tahapan dialihkan ke Minggu II karena bertepatan dengan persiapan dan pelaksanaan Upacara HUT Kemerdekaan RI ke-81 serta agenda luar pimpinan.", 
         "-"),
        ("1.4 Mengidentifikasi Kebutuhan Pengguna", 
         "Tahapan dilaksanakan pada Minggu II bersama mentor dan Tim Statistik Sektoral.", 
         "-"),
        ("1.5 Menyusun Dokumen Kebutuhan Sistem", 
         "Tahapan diselesaikan pada Minggu II setelah konsultasi rampung.", 
         "-")
    ]
    add_laporan_mingguan("I", "17–21 Agustus 2026", "Identifikasi Kebutuhan Pengembangan SIMPONITAS",
                         "Catatan pembelajaran mekanisme pembinaan dan peta alur pembinaan berjalan",
                         "http://s.bps.go.id/Latsarrafi_Kegiatan1",
                         k1_m1_tahapan, [2, 2, 2, 0, 2, 2, 0, 10],
                         "Peserta telah melaksanakan tahapan awal sesuai arahan dan menunjukkan sikap proaktif. Diharapkan konsisten menerapkan pedoman pada tahapan berikutnya.",
                         "Peserta mampu mengaitkan kegiatan dengan nilai BerAKHLAK dan menyusun alur yang logis. Silakan lanjutkan ke tahapan berikutnya.")

    # LAMPIRAN 2: MINGGU II
    k1_m2_tahapan = [
        ("1.1 Mempelajari Mekanisme Pembinaan", "Telah diselesaikan pada Minggu ke-I.", "Catatan pembelajaran pembinaan."),
        ("1.2 Memetakan Alur Proses Pembinaan", "Telah diselesaikan pada Minggu ke-I.", "Peta alur proses pembinaan."),
        ("1.3 Melakukan Konsultasi dengan Mentor", 
         "Melaksanakan sesi konsultasi mendalam dengan mentor mengenai rancangan sistem dan jadwal kerja aktualisasi.\nBerAKHLAK: Harmonis, Kolaboratif, Akuntabel, Kompeten.",
         "Notula konsultasi dan lembar arahan mentor."),
        ("1.4 Mengidentifikasi Kebutuhan Pengguna bersama Tim", 
         "Mengidentifikasi kendala tata kelola data sektoral dan merumuskan kebutuhan fitur terintegrasi.\nBerAKHLAK: Berorientasi Pelayanan, Kompeten, Kolaboratif, Harmonis, Adaptif.",
         "Daftar inventarisasi kebutuhan pengguna dan permasalahan."),
        ("1.5 Menyusun Dokumen Kebutuhan Sistem", 
         "Menyusun dokumen user requirement specification lengkap memuat 16 kebutuhan fungsional dan 8 non-fungsional.\nBerAKHLAK: Akuntabel, Kompeten, Adaptif, Berorientasi Pelayanan, Loyal.",
         "Dokumen spesifikasi kebutuhan sistem (user requirement) final.")
    ]
    add_laporan_mingguan("II", "24–28 Agustus 2026", "Identifikasi Kebutuhan Pengembangan SIMPONITAS",
                         "1 (satu) dokumen kebutuhan sistem (user requirement) SIMPONITAS final",
                         "http://s.bps.go.id/Latsarrafi_Kegiatan1",
                         k1_m2_tahapan, [4, 4, 5, 2, 3, 4, 2, 24],
                         "Seluruh tahapan identifikasi kebutuhan berhasil dituntaskan dengan baik. Hasil perumusan kebutuhan sangat tajam dan siap dijadikan dasar perancangan sistem.",
                         "Lanjutkan kegiatan dan setiap tahapan sesuai rencana. Dokumentasikan proses dan bukti secara lengkap dan konsisten.")

    # LAMPIRAN 3: MINGGU III
    k2_m3_tahapan = [
        ("2.1 Mengidentifikasi Fitur-Fitur yang Akan Dikembangkan", 
         "Menentukan 10 modul sistem SIMPONITAS (informasi, dashboard, permohonan, riwayat, repositori kompromin, dataset, data lineage, knowledge base, master OPD, RBAC).\nBerAKHLAK: Berorientasi Pelayanan, Kompeten, Adaptif, Akuntabel, Kolaboratif.",
         "Daftar spesifikasi 10 modul utama SIMPONITAS."),
        ("2.2 Merancang Arsitektur Sistem", 
         "Merancang pola 3-tier architecture: React.js SPA, Node.js Serverless API, dan Supabase PostgreSQL Cloud Database.\nBerAKHLAK: Kompeten, Akuntabel, Adaptif, Loyal, Kolaboratif.",
         "Dokumen diagram arsitektur sistem tiga lapisan."),
        ("2.3 Merancang Struktur Basis Data", "Dijadwalkan dan dilaksanakan pada Minggu ke-IV.", "-"),
        ("2.4 Merancang Antarmuka Dashboard", "Dijadwalkan dan dilaksanakan pada Minggu ke-IV.", "-"),
        ("2.5 Konsultasi Hasil Perancangan", "Dijadwalkan dan dilaksanakan pada Minggu ke-IV.", "-")
    ]
    add_laporan_mingguan("III", "31 Agustus–4 September 2026", "Perancangan Kebutuhan SIMPONITAS",
                         "Dokumen spesifikasi fitur dan diagram arsitektur sistem 3-tier",
                         "http://s.bps.go.id/latsar_rafi_Keg2",
                         k2_m3_tahapan, [1, 2, 2, 0, 1, 2, 2, 10],
                         "Peserta telah merancang arsitektur modern yang sesuai dengan infrastruktur TI BPS. Lanjutkan perancangan basis data dan mockup antarmuka.",
                         "Mulai tuangkan pelaksanaan aktualisasi secara sistematis ke dalam laporan. Pastikan keterkaitannya dengan isu dan nilai dasar ASN.")

    # LAMPIRAN 4: MINGGU IV
    k2_m4_tahapan = [
        ("2.1 Identifikasi Fitur Sistem", "Telah diselesaikan pada Minggu ke-III.", "Daftar 10 modul sistem."),
        ("2.2 Merancang Arsitektur Sistem", "Telah diselesaikan pada Minggu ke-III.", "Diagram arsitektur 3-tier."),
        ("2.3 Merancang Struktur Basis Data (ERD & Kamus Data)", 
         "Merancang skema relasional master OPD, permohonan, riwayat, repositori kompromin, dan tabel perizinan peran.\nBerAKHLAK: Kompeten, Akuntabel, Adaptif, Berorientasi Pelayanan, Loyal.",
         "Diagram ERD ternormalisasi dan tabel kamus data atribut."),
        ("2.4 Merancang Antarmuka Dashboard SIMPONITAS", 
         "Mendesain tata letak antarmuka, kartu KPI, grafik visualisasi, palet warna Pasaman Orange, dan tema kontras WCAG AA.\nBerAKHLAK: Berorientasi Pelayanan, Kompeten, Adaptif, Harmonis, Kolaboratif.",
         "Mockup wireframe antarmuka pengguna dashboard SIMPONITAS."),
        ("2.5 Melakukan Konsultasi dan Penyempurnaan Rancangan", 
         "Mendiskusikan rancangan dengan mentor; menyepakati pemisahan menu Kelola Master OPD dan relasi 1-to-many Kompromin.\nBerAKHLAK: Harmonis, Kolaboratif, Akuntabel, Adaptif, Loyal.",
         "Notula konsultasi bimbingan dan matriks penyempurnaan desain.")
    ]
    add_laporan_mingguan("IV", "7–11 September 2026", "Perancangan Kebutuhan SIMPONITAS",
                         "1 (satu) dokumen cetak biru rancangan SIMPONITAS lengkap (fitur, arsitektur, ERD, mockup)",
                         "http://s.bps.go.id/latsar_rafi_Keg2",
                         k2_m4_tahapan, [3, 4, 4, 2, 3, 5, 4, 25],
                         "Rancangan sistem sangat terperinci dan telah mengakomodasi seluruh masukan bimbingan. Sistem siap memasuki tahap implementasi kode.",
                         "Lanjutkan penyusunan laporan aktualisasi dengan memastikan setiap kegiatan, tahapan, dan bukti terdokumentasi dengan baik.")

    # LAMPIRAN 5: MINGGU V
    k3_m5_tahapan = [
        ("3.1 Mengembangkan Basis Data SIMPONITAS", 
         "Membangun basis data fisik PostgreSQL Supabase dan sinkronisasi LocalStorage untuk 20 OPD Pasaman.\nBerAKHLAK: Kompeten, Akuntabel, Adaptif, Loyal, Berorientasi Pelayanan.",
         "Skrip DDL basis data fisik dan skema entitas aktif."),
        ("3.2 Mengembangkan Backend dan Fungsi Utama", 
         "Membangun modul backend serverless API Node.js di folder /api dengan otorisasi RBAC dan validasi HTTP.\nBerAKHLAK: Kompeten, Akuntabel, Adaptif, Berorientasi Pelayanan, Kolaboratif.",
         "Modul backend serverless API dan handler endpoint."),
        ("3.3 Mengembangkan Dashboard dan Visualisasi", 
         "Membangun antarmuka responsif React.js, kartu KPI analitik, grafik donat, dan dark mode midnight WCAG AAA.\nBerAKHLAK: Berorientasi Pelayanan, Kompeten, Akuntabel, Adaptif, Harmonis.",
         "Kode antarmuka pengguna React.js dan dashboard visual."),
        ("3.4 Mengintegrasikan Fitur dan Basis Data", 
         "Menyambungkan frontend React dengan serverless API dan Supabase cloud dengan lapisan fallback LocalStorage.\nBerAKHLAK: Kompeten, Akuntabel, Adaptif, Kolaboratif, Loyal.",
         "Prototipe sistem terintegrasi penuh secara dinamis."),
        ("3.5 Melakukan Hosting Website SIMPONITAS", 
         "Melakukan deployment produksi ke Vercel Cloud Platform dengan domain HTTPS: https://simponitas-pasaman.vercel.app.\nBerAKHLAK: Adaptif, Kompeten, Akuntabel, Berorientasi Pelayanan, Loyal.",
         "Website SIMPONITAS live dengan koneksi aman HTTPS SSL.")
    ]
    add_laporan_mingguan("V", "14–18 September 2026", "Pengembangan dan Hosting SIMPONITAS",
                         "Website aplikasi web SIMPONITAS live aktif pada tautan: https://simponitas-pasaman.vercel.app",
                         "http://s.bps.go.id/latsarrafi_Kegiatan3",
                         k3_m5_tahapan, [4, 5, 5, 1, 3, 5, 2, 25],
                         "Aplikasi berhasil dibangun secara utuh dan telah live di internet dengan kinerja yang sangat cepat. Siapkan skenario uji coba internal dengan cermat.",
                         "Luar biasa atas penyelesaian aplikasi tepat waktu. Pastikan pengujian melibatkan pengguna internal secara objektif.")

    # LAMPIRAN 6: MINGGU VI
    k4_m6_tahapan = [
        ("4.1 Menyusun Skenario dan Instrumen Uji Coba", 
         "Menyusun Test Plan, matriks 24 butir kasus uji fungsional, dan kuesioner System Usability Scale (SUS) 10 pertanyaan.\nBerAKHLAK: Kompeten, Akuntabel, Berorientasi Pelayanan, Adaptif, Loyal.",
         "Dokumen Test Plan, matriks kasus uji, dan lembar kuesioner SUS."),
        ("4.2 Melaksanakan Uji Coba bersama Pengguna Internal", 
         "Melaksanakan uji coba hands-on bersama 6 pegawai internal BPS Pasaman. Hasil: 23 dari 24 skenario lulus (95,8%).\nBerAKHLAK: Berorientasi Pelayanan, Harmonis, Kolaboratif, Kompeten, Akuntabel.",
         "Berita Acara Uji Coba Internal dan log hasil pengujian."),
        ("4.3 Mengumpulkan Masukan dan Evaluasi Pengguna", 
         "Mengolah tabulasi kuesioner SUS dengan perolehan skor rata-rata 82,5 (Grade A / Excellent) serta 6 masukan perbaikan.\nBerAKHLAK: Berorientasi Pelayanan, Harmonis, Kolaboratif, Akuntabel, Adaptif.",
         "Lembar tabulasi skor SUS dan matriks prioritas masukan."),
        ("4.4 Melakukan Perbaikan Hasil Uji Coba dan Evaluasi", 
         "Menuntaskan 6 poin perbaikan: proteksi unduh draft, kontras dark mode 7,2:1, tombol simpan RBAC, kompresi foto otomatis, dll.\nBerAKHLAK: Kompeten, Adaptif, Akuntabel, Berorientasi Pelayanan, Loyal.",
         "Catatan rilis perbaikan kode dan bukti verifikasi uji regresi."),
        ("4.5 Konsultasi Hasil Penyempurnaan kepada Mentor", 
         "Memaparkan hasil pengujian dan buku pedoman; mentor menandatangani persetujuan operasional sistem resmi BPS Pasaman.\nBerAKHLAK: Harmonis, Kolaboratif, Akuntabel, Kompeten, Loyal.",
         "Notula konsultasi dan Berita Acara Persetujuan Sistem dari Mentor."),
        ("4.6 Menyusun Laporan Hasil Aktualisasi", 
         "Menyusun laporan akhir aktualisasi, matriks bukti fisik, dan slide presentasi seminar akhir pertanggungjawaban.\nBerAKHLAK: Akuntabel, Kompeten, Loyal, Berorientasi Pelayanan, Adaptif.",
         "Draf final Laporan Aktualisasi, matriks evidence, dan bahan paparan.")
    ]
    add_laporan_mingguan("VI", "21–25 September 2026", "Uji Coba, Evaluasi, dan Penyempurnaan SIMPONITAS",
                         "SIMPONITAS versi rilis penyempurnaan, hasil evaluasi SUS (skor 82,5), dan Laporan Hasil Aktualisasi",
                         "http://s.bps.go.id/latsar_rafi_k4",
                         k4_m6_tahapan, [5, 6, 5, 3, 4, 4, 3, 30],
                         "Seluruh rangkaian aktualisasi telah tuntas dengan hasil sangat memuaskan. Sistem teruji andal dan dokumen laporan telah disusun secara sistematis. Siap untuk seminar akhir.",
                         "Selamat atas keberhasilan menuntaskan seluruh tahapan aktualisasi. Pertahankan performa terbaik saat pemaparan di hadapan Penguji.")

    # -------------------------------------------------------------
    # LAMPIRAN 7: REKAPITULASI TAUTAN BUKTI DUKUNG
    # -------------------------------------------------------------
    add_h2(doc, "Lampiran 7. Rekapitulasi Tautan Bukti Dukung Setiap Tahapan Kegiatan")
    add_p(doc, "Seluruh dokumen bukti fisik (evidences) pelaksanaan aktualisasi dari Kegiatan 1 sampai dengan Kegiatan 4 telah diunggah dan dapat diakses secara transparan melalui tautan resmi shortlink BPS berikut:")
    
    t7_headers = ["Tahapan", "Nama Tahapan Kegiatan", "Output Bukti Fisik", "Tautan Bukti Dukung (Shortlink BPS)"]
    t7_widths = [Inches(0.6), Inches(2.2), Inches(2.1), Inches(1.6)]
    t7_data = [
        ["1.1", "Mempelajari Mekanisme Pembinaan & Kompromin", "Catatan pembelajaran mekanisme pembinaan", "https://drive.google.com/drive/folders/1VdpyteReO5p5I-Ds6zgeEuvf9HKYvRaW?usp=sharing"],
        ["1.2", "Mempelajari & Memetakan Alur Berjalan", "Peta alur proses pembinaan statistik berjalan", "http://s.bps.go.id/latsar_rafi_1"],
        ["1.3", "Konsultasi Rencana Aktualisasi dengan Mentor", "Notula konsultasi & dokumentasi bimbingan", "http://s.bps.go.id/latsarrafi_K1S3"],
        ["1.4", "Identifikasi Kebutuhan Pengguna bersama Tim", "Daftar kebutuhan pengguna & isu pembinaan", "http://s.bps.go.id/Latsarrafi_K1S4"],
        ["1.5", "Menyusun Dokumentasi Kebutuhan Sistem", "Dokumen spesifikasi user requirement final", "http://s.bps.go.id/Latsarrafi_K1S5"],
        ["2.1", "Identifikasi Fitur-Fitur yang Dikembangkan", "Daftar 10 modul utama sistem SIMPONITAS", "http://s.bps.go.id/latsar_rafi_k2s1"],
        ["2.2", "Merancang Arsitektur Sistem", "Diagram arsitektur sistem tiga lapisan (3-tier)", "http://s.bps.go.id/latsar_rafi_k2s2"],
        ["2.3", "Merancang Struktur Basis Data", "Diagram ERD ternormalisasi & kamus data atribut", "http://s.bps.go.id/latsar_rafi_k2s3"],
        ["2.4", "Merancang Antarmuka Dashboard", "Mockup wireframe antarmuka pengguna dashboard", "http://s.bps.go.id/latsar_rafi_k2s4"],
        ["2.5", "Konsultasi & Penyempurnaan Rancangan", "Notula konsultasi & matriks perubahan desain", "http://s.bps.go.id/latsar_rafi_k2s5"],
        ["3.1", "Mengembangkan Basis Data SIMPONITAS", "Skrip SQL DDL & kamus entitas database aktif", "http://s.bps.go.id/latsarrafi_k3s1"],
        ["3.2", "Mengembangkan Backend & Fungsi Utama", "Kode sumber API serverless & handler HTTP", "http://s.bps.go.id/latsarrafi_k3s2"],
        ["3.3", "Mengembangkan Dashboard & Visualisasi", "Kode antarmuka React.js & komponen KPI", "http://s.bps.go.id/latsarrafi_k3s3"],
        ["3.4", "Mengintegrasikan Fitur & Basis Data", "Prototipe sistem terintegrasi (end-to-end)", "http://s.bps.go.id/latsarrafi_k3s4"],
        ["3.5", "Melakukan Hosting Website SIMPONITAS", "Website online Vercel dengan koneksi HTTPS", "http://s.bps.go.id/latsarrafi_k3s5"],
        ["4.1", "Menyusun Skenario & Instrumen Uji Coba", "Dokumen Test Plan, matriks uji & kuesioner SUS", "http://s.bps.go.id/latsar_rafi_k4s1"],
        ["4.2", "Melaksanakan Uji Coba Pengguna Internal", "Berita Acara Uji Coba, log hasil & foto sesi", "http://s.bps.go.id/latsar_rafi_k4s2"],
        ["4.3", "Mengumpulkan Masukan & Evaluasi Pengguna", "Tabulasi skor SUS (82,5) & matriks feedback", "http://s.bps.go.id/latsar_rafi_k4s3"],
        ["4.4", "Melakukan Perbaikan Hasil Uji Coba", "Catatan rilis perbaikan & log commit Git", "http://s.bps.go.id/latsar_rafi_k4s4"],
        ["4.5", "Konsultasi Hasil Penyempurnaan Mentor", "Notula bimbingan & Berita Acara Persetujuan", "http://s.bps.go.id/latsar_rafii_k4s5"],
        ["4.6", "Menyusun Laporan Hasil Aktualisasi", "Draf Laporan Aktualisasi, matriks & slide", "http://s.bps.go.id/latsar_rafii_k4s6"]
    ]
    tbl7 = doc.add_table(rows=len(t7_data) + 1, cols=4)
    tbl7.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(tbl7)
    for c_idx, h_text in enumerate(t7_headers):
        tbl7.rows[0].cells[c_idx].paragraphs[0].text = h_text
    style_table_header(tbl7.rows[0], t7_widths)
    for r_idx, row_values in enumerate(t7_data):
        row = tbl7.rows[r_idx + 1]
        for c_idx, val in enumerate(row_values):
            row.cells[c_idx].paragraphs[0].text = val
        bg_col = HEX_LIGHT_SLATE if r_idx % 2 == 1 else "FFFFFF"
        aligns = [WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT]
        style_table_row(row, t7_widths, hex_bg=bg_col, align_list=aligns, font_size=8)

    doc.add_page_break()

    # -------------------------------------------------------------
    # LAMPIRAN 8: DOKUMENTASI STRUKTUR & ANTARMUKA SISTEM
    # -------------------------------------------------------------
    add_h2(doc, "Lampiran 8. Dokumentasi Struktur dan Antarmuka SIMPONITAS Hasil Pengembangan")
    add_p(doc, "Sistem informasi SIMPONITAS yang telah selesai dibangun dan di-hosting secara publik pada tautan resmi https://simponitas-pasaman.vercel.app memiliki sepuluh modul fungsional terintegrasi:")
    
    modul_desc = [
        ("1. Halaman Beranda Publik (Home Info): ", "Halaman utama informatif yang menyajikan pengenalan sistem SIMPONITAS, landasan hukum pembinaan statistik sektoral (UU No. 16/1997 dan Perpres No. 39/2019), panduan 4 pilar Satu Data Indonesia, alur sinergi Kompromin, serta akses cepat ke modul permohonan pembinaan."),
        ("2. Dashboard Utama Analitik Eksekutif: ", "Pusat komando visualisasi data real-time yang menyajikan ringkasan KPI pembinaan (Total 20 OPD Pasaman, Rasio OPD Terbina, Jumlah Kompromin Terbit, Permohonan Aktif), grafik donat status verifikasi dokumen kompromin, grafik batang aktivitas pembinaan bulanan, dan tabel pemantauan progres dinas."),
        ("3. Layanan Permohonan Pembinaan Statistik Sektoral: ", "Formulir interaktif bagi OPD untuk mengajukan pendampingan teknis Kompromin, penyusunan Metadata Statistik (MS-D/MS-I), rekomendasi survei (Romantik), atau konsultasi statistik dengan pelacakan status bertahap (Diajukan, Disetujui, Dalam Proses, Selesai)."),
        ("4. Modul Riwayat dan Berita Acara Pembinaan: ", "Pencatatan rekam jejak historis pembinaan per instansi dinas, dokumentasi notula rapat resmi, galeri foto dokumentasi berfitur kompresi otomatis, serta generator cetak Berita Acara Pembinaan berformat standar kedinasan BPS."),
        ("5. Repositori Kompromin (Kompilasi Produk Administrasi): ", "Katalog arsip terpusat dokumen Kompromin seluruh dinas di Kabupaten Pasaman dengan filter status (Draft OPD, Dalam Penelaahan BPS, Terverifikasi & Diterbitkan), modal pratinjau detail metadata, dan proteksi tombol unduh berkas."),
        ("6. Repositori Data Statistik Sektoral: ", "Basis data indikator sektoral hasil pembinaan (bidang kesehatan, pertanian, pendidikan, infrastruktur) dilengkapi pencarian instan, filter kategori dinas, penambahan indikator baru, serta fitur ekspor data ke format CSV/Excel."),
        ("7. Visualisasi Aliran Data (Data Lineage Visualizer): ", "Diagram visual interaktif yang menggambarkan silsilah penelusuran aliran data statistik dari OPD Produsen Data menuju proses validasi BPS hingga terintegrasi ke dalam publikasi resmi Pasaman Dalam Angka (DDA) dan PDRB."),
        ("8. Basis Pengetahuan Pembinaan (Knowledge Base): ", "Repositori modul pembelajaran, petunjuk teknis Kompromin, template instrumen metadata, modul Romantik, dan peraturan perundangan terkait Satu Data Indonesia yang dapat diunduh langsung oleh aparatur."),
        ("9. Modul Kelola Master OPD Kabupaten Pasaman: ", "Modul manajemen master data yang memuat daftar 20 Organisasi Perangkat Daerah di Kabupaten Pasaman, data kontak penanggung jawab (PIC) dinas, kategori urusan pemerintahan, dan status binaan."),
        ("10. Manajemen Peran dan Matriks Hak Akses (RBAC Toggle Matrix): ", "Modul kendali otorisasi keamanan berbasis peran (Admin BPS, Ketua Tim Sektoral, Walidata OPD, Produsen Data, Publik) dengan sakelar toggle switch interaktif untuk mengatur hak akses fitur secara instan.")
    ]
    for b_prefix, b_text in modul_desc:
        add_p(doc, b_text, bold_prefix=b_prefix)
        
    add_callout(doc, "SPESIFIKASI TEKNOLOGI & TAUTAN AKSES RESMI",
                "• Tautan Website Live: https://simponitas-pasaman.vercel.app\n"
                "• Frontend Framework: React.js (Vite) + Lucide Icons + WCAG AA/AAA Theme\n"
                "• Backend Framework: Node.js Serverless Functions (RESTful API pada /api/*)\n"
                "• Database Platform: PostgreSQL Supabase Cloud Datastore + LocalStorage Fallback\n"
                "• Keamanan: HTTPS SSL Encryption, Role-Based Access Control (RBAC), Form Sanitization\n"
                "• Rasio Skala Default: 80% (Zoom 0.8) untuk kenyamanan tata letak desktop kedinasan",
                bg=HEX_LIGHT_BLUE, border=HEX_ROYAL)

    doc.add_page_break()

    # -------------------------------------------------------------
    # LAMPIRAN 9: DOKUMENTASI DAN HASIL UJI COBA
    # -------------------------------------------------------------
    add_h2(doc, "Lampiran 9. Dokumentasi dan Hasil Uji Coba SIMPONITAS")
    add_p(doc, "Uji coba fungsional dan evaluasi kegunaan sistem informasi SIMPONITAS dilaksanakan bersama pengguna internal di lingkungan Badan Pusat Statistik Kabupaten Pasaman pada tanggal 23 sampai 24 September 2026. Berikut adalah dokumentasi Berita Acara, rekapitulasi hasil pengujian kasus uji fungsional, tabulasi System Usability Scale (SUS), serta matriks umpan balik pengguna.")
    
    # 1. Berita Acara
    add_h3(doc, "1. Berita Acara Pelaksanaan Uji Coba Internal SIMPONITAS")
    ba_text = ("Pada hari Kamis, tanggal 24 September 2026, bertempat di Kantor Badan Pusat Statistik Kabupaten Pasaman, "
               "telah dilaksanakan sesi Uji Coba Internal Aplikasi Web SIMPONITAS (Sinergi Pembinaan Statistik Sektoral melalui "
               "Penerbitan Kompromin Akurat dan Berkualitas) yang diikuti oleh 6 (enam) orang pegawai internal BPS Kabupaten Pasaman, "
               "terdiri atas perwakilan Tim Kerja Statistik Sektoral, pejabat fungsional Statistisi, dan staf fungsional Pranata Komputer.\n"
               "Berdasarkan pelaksanaan uji coba terhadap 24 butir skenario uji fungsional dan pengisian kuesioner evaluasi kegunaan sistem, "
               "seluruh peserta menyatakan bahwa sistem beroperasi dengan sangat baik, stabil, dan layak digunakan sebagai media kerja "
               "pembinaan statistik sektoral di Kabupaten Pasaman.")
    add_callout(doc, "BERITA ACARA UJI COBA INTERNAL RESMI", ba_text, bg=HEX_LIGHT_SLATE, border=HEX_NAVY)
    
    # 2. Rekap 24 Test Cases
    add_h3(doc, "2. Rekapitulasi Hasil Pengujian Kasus Uji Fungsional (Functional Test Cases)")
    t9_headers = ["ID Uji", "Modul / Fitur", "Skenario yang Diuji", "Hasil yang Diharapkan", "Status"]
    t9_widths = [Inches(0.7), Inches(1.5), Inches(2.2), Inches(1.5), Inches(0.6)]
    t9_data = [
        ["TC-01", "Beranda Publik", "Navigasi menu beranda dan pemuatan konten edukasi SDI", "Konten tampil responsif dan tautan aktif", "LULUS"],
        ["TC-02", "Dashboard KPI", "Kalkulasi kartu KPI total 20 OPD dan kompromin", "Angka agregasi sesuai basis data", "LULUS"],
        ["TC-03", "Grafik Donat", "Visualisasi status verifikasi kompromin terbit", "Proporsi grafik interaktif dan akurat", "LULUS"],
        ["TC-04", "Tabel Monitoring", "Filter status pembinaan dan pencarian instansi dinas", "Tabel menyaring data seketika", "LULUS"],
        ["TC-05", "Permohonan", "Input formulir pengajuan pendampingan kompromin", "Data tersimpan dan notifikasi sukses muncul", "LULUS"],
        ["TC-06", "Status Alur", "Perubahan status permohonan menjadi Disetujui BPS", "Badge status berubah dan pembina tertera", "LULUS"],
        ["TC-07", "Riwayat Notulen", "Penginputan notulen rapat pembinaan statistik dinas", "Notula tersimpan pada riwayat dinas", "LULUS"],
        ["TC-08", "Upload Foto", "Unggah dokumentasi foto kegiatan dengan kompresi", "Foto terunggah dan terkompresi otomatis", "LULUS"],
        ["TC-09", "Cetak Berita Acara", "Klik tombol cetak / ekspor PDF berita acara pembinaan", "Terbuka jendela pratinjau cetak resmi", "LULUS"],
        ["TC-10", "Repositori Kompromin", "Pencarian dokumen kompromin berdasarkan judul/dinas", "Daftar dokumen tersaring tepat", "LULUS"],
        ["TC-11", "Proteksi Unduh", "Penguncian tombol download pada dokumen draf", "Tombol unduh terkunci untuk status draft", "LULUS"],
        ["TC-12", "Unduh Dokumen", "Unduh berkas kompromin status Terverifikasi", "Berkas PDF terunduh tanpa galat", "LULUS"],
        ["TC-13", "Repositori Data", "Pencarian indikator sektoral pada tabel data dinas", "Baris indikator tampil sesuai kata kunci", "LULUS"],
        ["TC-14", "Ekspor CSV Data", "Ekspor tabel indikator sektoral ke format CSV", "File CSV terunduh dengan struktur rapi", "LULUS"],
        ["TC-15", "Data Lineage", "Visualisasi alur silsilah data dari OPD ke DDA BPS", "Diagram alur interaktif dapat ditelusuri", "LULUS"],
        ["TC-16", "Knowledge Base", "Unduh template formulir MS-D dan juknis kompromin", "Berkas template dapat diunduh lancar", "LULUS"],
        ["TC-17", "Master OPD", "Pendaftaran OPD baru dan pembaruan kontak PIC", "Data instansi terupdate di seluruh sistem", "LULUS"],
        ["TC-18", "Filter Master OPD", "Pencarian instansi berdasarkan nama kontak dinas", "Daftar OPD tersaring secara cepat", "LULUS"],
        ["TC-19", "Switch Role", "Pergantian peran pengguna dari Admin ke Walidata OPD", "Tampilan antarmuka menyesuaikan izin peran", "LULUS"],
        ["TC-20", "RBAC Toggle", "Ubah izin fitur via sakelar switch dan simpan matriks", "Hak akses langsung berubah seketika", "LULUS"],
        ["TC-21", "Tema Gelap / Terang", "Beralih tema dark mode midnight dan light mode", "Warna berganti dengan kontras WCAG AAA", "LULUS"],
        ["TC-22", "Sidebar Collapse", "Penciutan menu navigasi sidebar ke lebar 72px", "Sidebar menciut rapi dan tooltip aktif", "LULUS"],
        ["TC-23", "Responsivitas Layar", "Pengujian antarmuka pada layar tablet dan smartphone", "Tata letak kartu reflow tanpa overflow", "LULUS"],
        ["TC-24", "Ketahanan Offline", "Akses sistem saat jaringan internet terputus sesaat", "Sistem otomatis beralih ke cache lokal", "LULUS"]
    ]
    tbl9 = doc.add_table(rows=len(t9_data) + 1, cols=5)
    tbl9.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(tbl9)
    for c_idx, h_text in enumerate(t9_headers):
        tbl9.rows[0].cells[c_idx].paragraphs[0].text = h_text
    style_table_header(tbl9.rows[0], t9_widths)
    for r_idx, row_values in enumerate(t9_data):
        row = tbl9.rows[r_idx + 1]
        for c_idx, val in enumerate(row_values):
            row.cells[c_idx].paragraphs[0].text = val
        bg_col = HEX_LIGHT_SLATE if r_idx % 2 == 1 else "FFFFFF"
        aligns = [WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.CENTER]
        style_table_row(row, t9_widths, hex_bg=bg_col, align_list=aligns, font_size=8, is_bold=(c_idx == 4))

    # 3. Tabulasi Skor SUS
    add_h3(doc, "3. Tabulasi Hasil Evaluasi System Usability Scale (SUS)")
    add_p(doc, "Evaluasi kemudahan dan kepuasan pengguna diukur menggunakan instrumen baku System Usability Scale (SUS) dengan 10 butir pertanyaan skala Likert 1–5 kepada 6 orang responden internal BPS Kabupaten Pasaman:")
    
    sus_headers = ["Responden", "Jabatan / Fungsi", "Skor Mentah SUS", "Skor Terkonversi (0-100)", "Kategori Penerimaan"]
    sus_widths = [Inches(1.0), Inches(2.2), Inches(1.1), Inches(1.1), Inches(1.1)]
    sus_data = [
        ["Responden 1", "Ketua Tim Statistik Sektoral", "34", "85.0", "Grade A (Excellent)"],
        ["Responden 2", "Statistisi Ahli Pertama", "33", "82.5", "Grade A (Excellent)"],
        ["Responden 3", "Pranata Komputer Ahli Pertama", "34", "85.0", "Grade A (Excellent)"],
        ["Responden 4", "Anggota Tim IPDS", "32", "80.0", "Grade A (Excellent)"],
        ["Responden 5", "Staf Pengolahan Data", "33", "82.5", "Grade A (Excellent)"],
        ["Responden 6", "Staf Diseminasi Statistik", "32", "80.0", "Grade A (Excellent)"],
        ["RATA-RATA", "Skor Keseluruhan Sistem", "33", "82.5", "Grade A (Excellent)"]
    ]
    tbl_sus = doc.add_table(rows=len(sus_data) + 1, cols=5)
    tbl_sus.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(tbl_sus)
    for c_idx, h_text in enumerate(sus_headers):
        tbl_sus.rows[0].cells[c_idx].paragraphs[0].text = h_text
    style_table_header(tbl_sus.rows[0], sus_widths)
    for r_idx, row_values in enumerate(sus_data):
        row = tbl_sus.rows[r_idx + 1]
        for c_idx, val in enumerate(row_values):
            row.cells[c_idx].paragraphs[0].text = val
        is_avg = (r_idx == len(sus_data) - 1)
        bg_col = HEX_LIGHT_BLUE if is_avg else (HEX_LIGHT_SLATE if r_idx % 2 == 1 else "FFFFFF")
        aligns = [WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.CENTER]
        style_table_row(row, sus_widths, hex_bg=bg_col, align_list=aligns, font_size=8.5, is_bold=is_avg)

    # 4. Matriks Tindak Lanjut Perbaikan
    add_h3(doc, "4. Matriks Rekapitulasi Masukan Pengguna dan Tindak Lanjut Perbaikan")
    fb_headers = ["No", "Area Masukan", "Uraian Umpan Balik Pengguna", "Tindakan Perbaikan Kode (Tahapan 4.4)", "Status"]
    fb_widths = [Inches(0.4), Inches(1.4), Inches(2.1), Inches(2.1), Inches(0.5)]
    fb_data = [
        ["1.", "Repositori Kompromin", "Tombol unduh file sebaiknya dinonaktifkan jika dokumen masih berstatus draft OPD.", 
         "Menambahkan logika kondisional rendering pada Kompromin.jsx sehingga tombol download hanya muncul jika berstatus Terverifikasi & Diterbitkan.", "TUNTAS"],
        ["2.", "Tema Tampilan", "Mode gelap midnight perlu kontras aksen teks yang lebih tegas pada kartu analitik.", 
         "Memperbarui palet warna tema midnight ke tone #0F172A dan teks #E2E8F0 pada index.css untuk mencapai rasio kontras 7,2:1 (WCAG AAA).", "TUNTAS"],
        ["3.", "Manajemen Peran", "Perubahan sakelar izin fitur sebaiknya diberi tombol konfirmasi simpan eksplisit.", 
         "Menambahkan tombol 'Simpan Konfigurasi' dan toast notification pada modul RoleManagement.jsx.", "TUNTAS"],
        ["4.", "Riwayat Notulen", "Unggahan foto dokumentasi pembinaan perlu kompresi otomatis agar hemat storage.", 
         "Mengimplementasikan utilitas kompresi citra canvas otomatis sebelum berkas dikirim ke media penyimpanan cloud.", "TUNTAS"],
        ["5.", "Navigasi Sidebar", "Penataan teks menu dan tooltip saat sidebar diciutkan (collapsed) perlu diperbaiki.", 
         "Merestrukturisasi komponen Sidebar.jsx dengan styling tooltip mengambang yang bersih dan presisi.", "TUNTAS"],
        ["6.", "Master Data OPD", "Perlu opsi pencarian cepat berdasarkan nama penanggung jawab (PIC) dinas.", 
         "Menambahkan filter pencarian ganda (nama instansi dan nama PIC dinas) pada modul MasterOpd.jsx.", "TUNTAS"]
    ]
    tbl_fb = doc.add_table(rows=len(fb_data) + 1, cols=5)
    tbl_fb.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(tbl_fb)
    for c_idx, h_text in enumerate(fb_headers):
        tbl_fb.rows[0].cells[c_idx].paragraphs[0].text = h_text
    style_table_header(tbl_fb.rows[0], fb_widths)
    for r_idx, row_values in enumerate(fb_data):
        row = tbl_fb.rows[r_idx + 1]
        for c_idx, val in enumerate(row_values):
            row.cells[c_idx].paragraphs[0].text = val
        bg_col = HEX_LIGHT_SLATE if r_idx % 2 == 1 else "FFFFFF"
        aligns = [WD_ALIGN_PARAGRAPH.CENTER, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.LEFT, WD_ALIGN_PARAGRAPH.CENTER]
        style_table_row(row, fb_widths, hex_bg=bg_col, align_list=aligns, font_size=8, is_bold=(c_idx == 4))

    # 5. Lembar Konsultasi Mentor
    add_h3(doc, "5. Lembar Pengesahan Konsultasi Hasil Penyempurnaan dari Mentor")
    add_callout(doc, "CATATAN KONSULTASI MENTOR",
                "Tanggal Konsultasi: Rabu, 23 September 2026\n"
                "Tempat: Ruang Kerja Tim Statistik Sektoral BPS Kabupaten Pasaman\n"
                "Mentor: Muhammad Irfa’issurur (NIP. 200204272024121003)\n"
                "Catatan Arahan Mentor:\n"
                "1. Mengapresiasi keberhasilan pencapaian skor SUS 82,5 (Excellent) dan penyelesaian 6 perbaikan kode secara cepat.\n"
                "2. Menyetujui aplikasi SIMPONITAS untuk segera dioperasikan dalam proses pembinaan statistik sektoral di Pasaman.\n"
                "3. Menginstruksikan peserta untuk mendistribusikan Buku Pedoman Penggunaan Sistem kepada 20 OPD pada sosialisasi mendatang.",
                bg=HEX_ORANGE_LIGHT, border=HEX_ORANGE)

print("Part 5 built successfully.")
