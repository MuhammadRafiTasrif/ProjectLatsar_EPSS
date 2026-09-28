# -*- coding: utf-8 -*-
"""
Main Assembler: Menggabungkan seluruh bagian dokumen laporan aktualisasi
dan menghasilkan berkas docx resmi di folder laporan.
"""

import os
import sys
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

# Tambahkan direktori scratch ke sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from report_styles import (
    COLOR_NAVY, COLOR_ROYAL, COLOR_ORANGE, COLOR_TEXT, COLOR_MUTED
)
from part1_front_matter import build_front_matter
from part2_bab1 import build_bab1
from part3_bab2 import build_bab2
from part4_bab3_dafpus import build_bab3_dafpus
from part5_lampiran import build_lampiran

OUTPUT_DIR = r"d:\3. BPS\1. 1309_(D) Laptop\1. Project Latsar\Aplikasi 1\laporan"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "Laporan_Hasil_Aktualisasi_SIMPONITAS_Muhammad_Rafi_Tasrif.docx")
OUTPUT_FILE_ALT = os.path.join(OUTPUT_DIR, "Laporan_Hasil_Aktualisasi_SIMPONITAS.docx")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def main():
    print("Memulai perakitan dokumen Laporan Hasil Aktualisasi...")
    doc = docx.Document()
    
    # Konfigurasi Halaman Standar (A4)
    for section in doc.sections:
        section.page_width = Inches(8.27)
        section.page_height = Inches(11.69)
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
        
        section.different_first_page_header_footer = True
        
        # Header Halaman
        hdr = section.header
        p_hdr = hdr.paragraphs[0]
        p_hdr.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        r_hdr = p_hdr.add_run("Laporan Hasil Aktualisasi Latsar CPNS BPS: SIMPONITAS Pasaman")
        r_hdr.font.name = "Calibri"
        r_hdr.font.size = Pt(8.5)
        r_hdr.font.italic = True
        r_hdr.font.color.rgb = COLOR_MUTED
        
        # Footer Halaman
        ftr = section.footer
        p_ftr = ftr.paragraphs[0]
        p_ftr.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r_ftr = p_ftr.add_run("Badan Pusat Statistik Kabupaten Pasaman, Provinsi Sumatera Barat")
        r_ftr.font.name = "Calibri"
        r_ftr.font.size = Pt(8.5)
        r_ftr.font.color.rgb = COLOR_MUTED

    print("Membangun Bagian 1: Halaman Depan & Daftar Isi...")
    build_front_matter(doc)
    
    print("Membangun Bagian 2: BAB I Pendahuluan...")
    build_bab1(doc)
    
    print("Membangun Bagian 3: BAB II Capaian Pelaksanaan Aktualisasi...")
    build_bab2(doc)
    
    print("Membangun Bagian 4: BAB III Kesimpulan & Daftar Pustaka...")
    build_bab3_dafpus(doc)
    
    print("Membangun Bagian 5: Lampiran Lengkap (Lampiran 1 s.d. 9)...")
    build_lampiran(doc)
    
    # Verifikasi Antislop: Pengecekan karakter em dash (—)
    print("Menjalankan audit antislop...")
    em_dash_count = 0
    for p in doc.paragraphs:
        if "—" in p.text:
            em_dash_count += p.text.count("—")
            p.text = p.text.replace("—", ", ")
            
    for tbl in doc.tables:
        for row in tbl.rows:
            for cell in row.cells:
                for p in cell.paragraphs:
                    if "—" in p.text:
                        em_dash_count += p.text.count("—")
                        p.text = p.text.replace("—", ", ")
                        
    print(f"Hasil audit antislop em dash: {em_dash_count} em dash dibersihkan/dikonversi.")
    
    # Simpan ke Berkas Utama dan Alternatif
    doc.save(OUTPUT_FILE)
    print(f"Dokumen berhasil disimpan ke:\n-> {OUTPUT_FILE}")
    
    doc.save(OUTPUT_FILE_ALT)
    print(f"Dokumen duplikat berhasil disimpan ke:\n-> {OUTPUT_FILE_ALT}")
    
    file_size_kb = os.path.getsize(OUTPUT_FILE) / 1024
    print(f"Ukuran berkas: {file_size_kb:.1f} KB")
    print(f"Jumlah paragraf: {len(doc.paragraphs)}")
    print(f"Jumlah tabel: {len(doc.tables)}")
    print("Selesai dengan sukses!")

if __name__ == "__main__":
    main()
