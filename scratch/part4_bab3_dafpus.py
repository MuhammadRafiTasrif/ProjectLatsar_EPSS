# -*- coding: utf-8 -*-
"""
Bagian 4: BAB III KESIMPULAN DAN SARAN serta DAFTAR PUSTAKA
Memenuhi kaidah antislop (tanpa em dash, akurat, profesional).
"""

import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from report_styles import (
    COLOR_NAVY, COLOR_ROYAL, COLOR_ORANGE, COLOR_TEXT, COLOR_MUTED,
    add_h1, add_h2, add_h3, add_p, add_bullet
)

def build_bab3_dafpus(doc):
    # =============================================================
    # BAB III KESIMPULAN DAN SARAN
    # =============================================================
    add_h1(doc, "BAB III KESIMPULAN DAN SARAN")
    
    # -------------------------------------------------------------
    # A. Kesimpulan
    # -------------------------------------------------------------
    add_h2(doc, "A. Kesimpulan")
    add_p(doc, "Berdasarkan keseluruhan proses perancangan, pengembangan, pengujian, hingga evaluasi pelaksanaan aktualisasi yang telah dipaparkan pada bab-bab sebelumnya, dapat ditarik kesimpulan bahwa seluruh tujuan aktualisasi sebagaimana telah ditetapkan dalam dokumen rancangan aktualisasi telah tercapai dengan sangat baik, dengan rincian capaian sebagai berikut:")
    
    add_h3(doc, "1. Capaian Tujuan Umum")
    p_tu = ("Nilai-nilai dasar ASN BerAKHLAK (Berorientasi Pelayanan, Akuntabel, Kompeten, Harmonis, Loyal, Adaptif, dan Kolaboratif) "
            "telah terinternalisasi dan terhabituasi secara nyata dalam pelaksanaan tugas jabatan penulis sebagai Pranata Komputer "
            "Ahli Pertama di BPS Kabupaten Pasaman. Ketujuh nilai dasar tersebut berhasil diaktualisasikan secara konsisten "
            "pada seluruh 4 kegiatan dan 21 tahapan dengan total perolehan sebanyak 104 kali aktualisasi nilai autentik. "
            "Selain itu, aktualisasi ini merefleksikan perwujudan kedudukan dan peran ASN sesuai prinsip Manajemen ASN "
            "(menjalankan tugas secara profesional, berintegritas, dan mendukung tata kelola kinerja berbasis merit) serta "
            "penerapan empat pilar Smart ASN (Digital Skill, Digital Ethics, Digital Safety, dan Digital Culture) dalam menghadirkan "
            "solusi inovasi digital bagi instansi BPS Kabupaten Pasaman.")
    add_p(doc, p_tu)
    
    add_h3(doc, "2. Capaian Tujuan Khusus")
    p_tk1 = ("Isu strategis mengenai belum optimalnya tata kelola sistem pembinaan statistik sektoral dalam mendukung implementasi "
             "Kompilasi Produk Administrasi (Kompromin) di BPS Kabupaten Pasaman telah berhasil dipecahkan secara tuntas melalui "
             "gagasan kreatif Pengembangan SIMPONITAS (Sinergi Pembinaan Statistik Sektoral melalui Penerbitan Kompromin Akurat dan "
             "Berkualitas). SIMPONITAS berhasil bertransformasi dari sistem informasi statis berbasis Google Site menjadi aplikasi web "
             "modern terintegrasi berbasis Single Page Application (React.js) dan Node.js Serverless API yang terhubung dengan cloud "
             "database PostgreSQL Supabase, serta di-hosting secara publik dengan protokol HTTPS pada tautan resmi: "
             "https://simponitas-pasaman.vercel.app.")
    add_p(doc, p_tk1)
    
    p_tk2 = ("Sistem informasi SIMPONITAS hasil pengembangan telah dilengkapi dengan sepuluh modul fungsional terintegrasi, meliputi: "
             "Halaman Beranda Edukasi, Dashboard Analitik Eksekutif secara real-time, Layanan Permohonan Pembinaan Statistik Sektoral "
             "dengan pelacakan status transparan, Modul Riwayat dan Cetak Berita Acara resmi, Repositori Kompromin terpusat dengan "
             "proteksi unduh dokumen draf, Repositori Data Statistik Sektoral, Visualisasi Aliran Data (Data Lineage), Basis Pengetahuan "
             "Pedoman, Kelola Master 20 OPD Pasaman, serta Manajemen Hak Akses Pengguna (RBAC 5 peran) dengan sakelar kontrol interaktif. "
             "Sistem telah terbukti andal melalui uji coba bersama 6 pengguna internal BPS Kabupaten Pasaman dengan tingkat kelulusan kasus uji "
             "mencapai 95,8% (23 dari 24 skenario lulus) dan meraih skor usability SUS sebesar 82,5 (Kategori Grade A / Excellent). "
             "Seluruh 6 masukan penyempurnaan pengguna telah diselesaikan 100%. Inovasi ini sukses mengeliminasi akar masalah teknologi dan "
             "data, memperkuat peran BPS Pasaman sebagai pembina statistik sektoral daerah, serta meletakkan landasan kuat bagi perwujudan "
             "Satu Data Indonesia di Kabupaten Pasaman.")
    add_p(doc, p_tk2)

    # -------------------------------------------------------------
    # B. Saran
    # -------------------------------------------------------------
    add_h2(doc, "B. Saran")
    add_p(doc, "Agar sistem informasi SIMPONITAS dapat terus dimanfaatkan secara berkelanjutan, memberikan nilai guna optimal, serta terus berkembang pasca-pelaksanaan Pelatihan Dasar CPNS, penulis merumuskan saran konstruktif sebagai berikut:")
    
    saran_items = [
        ("1. Bagi Mentor: ", "Diharapkan terus memberikan pendampingan, arahan teknis, dan dukungan strategis pada tahapan sosialisasi implementasi SIMPONITAS kepada seluruh 20 OPD Kabupaten Pasaman, serta memfasilitasi penentuan prioritas pengembangan fitur lanjutan agar sistem selalu relevan dengan kebutuhan dinamika lapangan."),
        ("2. Bagi Pimpinan Unit Kerja (Kepala BPS Kabupaten Pasaman): ", "Diharapkan dapat mendukung legalitas penetapan SIMPONITAS sebagai media kerja resmi dalam tata kelola pembinaan statistik sektoral di Kabupaten Pasaman melalui penerbitan Surat Keputusan atau Instruksi Pimpinan, mendorong pemanfaatannya oleh seluruh pimpinan OPD melalui forum resmi Satu Data Indonesia tingkat Kabupaten Pasaman, serta menunjuk staf pranata komputer cadangan untuk menjamin kontinuitas pemeliharaan sistem."),
        ("3. Bagi Tim Kerja Statistik Sektoral dan Tim IPDS: ", "Diharapkan menggunakan aplikasi SIMPONITAS secara konsisten dan disiplin dalam setiap tahapan pembinaan dinas, mendokumentasikan notulen serta berita acara langsung ke dalam sistem, dan memanfaatkan repositori data statistik sektoral yang telah dihimpun sebagai sumber data pendukung penyusunan publikasi resmi Pasaman Dalam Angka (DDA) dan analisis PDRB daerah.")
    ]
    for b_prefix, b_text in saran_items:
        add_p(doc, b_text, bold_prefix=b_prefix)

    doc.add_page_break()

    # =============================================================
    # DAFTAR PUSTAKA
    # =============================================================
    add_h1(doc, "DAFTAR PUSTAKA")
    
    pustaka_list = [
        "Amelia, Rizki. (2021). Modul Smart ASN: Pelatihan Dasar Calon Pegawai Negeri Sipil. Jakarta: Lembaga Administrasi Negara.",
        "Badan Pusat Statistik. (2023). Peraturan Badan Pusat Statistik Nomor 5 Tahun 2023 tentang Organisasi dan Tata Kerja BPS Provinsi dan BPS Kabupaten/Kota. Jakarta: Badan Pusat Statistik.",
        "Fatimah, Elly, & Irawati, Erna. (2017). Modul Manajemen Aparatur Sipil Negara: Pelatihan Dasar Calon PNS. Jakarta: Lembaga Administrasi Negara.",
        "Ferrijana, Sammy, dkk. (2019). Modul Kesiapsiagaan Bela Negara: Pelatihan Dasar Calon Pegawai Negeri Sipil Golongan II dan Golongan III. Jakarta: Lembaga Administrasi Negara.",
        "Handoko, Ramah. (2021). Modul Akuntabel: Pelatihan Dasar Calon Pegawai Negeri Sipil. Jakarta: Lembaga Administrasi Negara.",
        "Idris, Irfan, dkk. (2019). Modul Analisis Isu Kontemporer: Pelatihan Dasar Calon Pegawai Negeri Sipil Golongan II dan Golongan III. Jakarta: Lembaga Administrasi Negara.",
        "Irawati, Erna, dkk. (2025). Bahan Ajar Pengelolaan Konflik Kepentingan. Jakarta: Lembaga Administrasi Negara & Komisi Pemberantasan Korupsi.",
        "Jalis, Ahmad. (2021). Modul Kompeten: Pelatihan Dasar Calon Pegawai Negeri Sipil. Jakarta: Lembaga Administrasi Negara.",
        "Lembaga Administrasi Negara. (2017). Modul Wawasan Kebangsaan dan Nilai-Nilai Bela Negara: Pelatihan Dasar Calon PNS. Jakarta: Lembaga Administrasi Negara.",
        "Lembaga Administrasi Negara. (2021). Peraturan Lembaga Administrasi Negara Nomor 1 Tahun 2021 tentang Pelatihan Dasar Calon Pegawai Negeri Sipil. Jakarta: Lembaga Administrasi Negara.",
        "Mirdin, Andi Adiyat. (2021). Modul Berorientasi Pelayanan: Pelatihan Dasar Calon Pegawai Negeri Sipil. Jakarta: Lembaga Administrasi Negara.",
        "Rahmanendra, Dwi. (2021). Modul Loyal: Pelatihan Dasar Calon Pegawai Negeri Sipil. Jakarta: Lembaga Administrasi Negara.",
        "Republik Indonesia. (1997). Undang-Undang Nomor 16 Tahun 1997 tentang Statistik. Jakarta: Sekretariat Negara.",
        "Republik Indonesia. (1999). Peraturan Pemerintah Nomor 51 Tahun 1999 tentang Penyelenggaraan Statistik. Jakarta: Sekretariat Negara.",
        "Republik Indonesia. (2019). Peraturan Presiden Nomor 39 Tahun 2019 tentang Satu Data Indonesia. Jakarta: Sekretariat Negara.",
        "Republik Indonesia. (2023). Undang-Undang Nomor 20 Tahun 2023 tentang Aparatur Sipil Negara. Jakarta: Sekretariat Negara.",
        "Sejati, Tri Atmojo. (2021). Modul Kolaboratif: Pelatihan Dasar Calon Pegawai Negeri Sipil. Jakarta: Lembaga Administrasi Negara.",
        "Sembodo, Jarot. (2021). Modul Harmonis: Pelatihan Dasar Calon Pegawai Negeri Sipil. Jakarta: Lembaga Administrasi Negara.",
        "Suwarno, Yogi. (2021). Modul Adaptif: Pelatihan Dasar Calon Pegawai Negeri Sipil. Jakarta: Lembaga Administrasi Negara.",
        "Utomo, Tri Widodo W., dkk. (2017). Modul Aktualisasi: Pelatihan Dasar Calon PNS. Jakarta: Lembaga Administrasi Negara."
    ]
    
    for pustaka in pustaka_list:
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(2)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.line_spacing = 1.15
        p.paragraph_format.left_indent = Inches(0.5)
        p.paragraph_format.first_line_indent = Inches(-0.5)
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        r = p.add_run(pustaka)
        r.font.name = "Calibri"
        r.font.size = Pt(10)
        r.font.color.rgb = COLOR_TEXT

    doc.add_page_break()

print("Part 4 built successfully.")
