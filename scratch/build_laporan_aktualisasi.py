# -*- coding: utf-8 -*-
"""
Script untuk menyusun Laporan Hasil Aktualisasi Lengkap SIMPONITAS
Muhammad Rafi Tasrif - NIP. 200209292026031001
Pelatihan Dasar CPNS Golongan III BPS Angkatan XVI Tahun 2026
Sesuai kaidah antislop (tanpa em dash, tanpa kata-kata klise/buzzword AI, data akurat, struktur rapi).
"""

import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn

OUTPUT_DIR = r"d:\3. BPS\1. 1309_(D) Laptop\1. Project Latsar\Aplikasi 1\laporan"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "Laporan_Hasil_Aktualisasi_SIMPONITAS_Muhammad_Rafi_Tasrif.docx")
OUTPUT_FILE_ALT = os.path.join(OUTPUT_DIR, "Laporan_Hasil_Aktualisasi_SIMPONITAS.docx")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Warna Tema Resmi BPS Pasaman & Dokumen Kedinasan
COLOR_PRIMARY_NAVY = RGBColor(30, 58, 138)    # #1E3A8A - Navy Resmi BPS
COLOR_SECONDARY_BLUE = RGBColor(37, 99, 235)  # #2563EB - Royal Blue
COLOR_ACCENT_ORANGE = RGBColor(247, 144, 57)  # #F79039 - Pasaman Orange
COLOR_TEXT_MAIN = RGBColor(30, 41, 59)        # #1E293B - Slate 800 (Kontras tinggi)
COLOR_TEXT_MUTED = RGBColor(71, 85, 105)      # #475569 - Slate 600
HEX_BG_LIGHT = "F8FAFC"                       # Slate 50
HEX_BG_BLUE_LIGHT = "EFF6FF"                  # Blue 50
HEX_BG_NAVY = "1E3A8A"                        # Navy 900
HEX_BORDER = "CBD5E1"                         # Slate 300

def set_cell_background(cell, hex_color):
    """Set background color of a table cell."""
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    """Set inner margins (padding) for a table cell in dxa (1 pt = 20 dxa)."""
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def set_table_borders(table, color="CBD5E1", sz="4", val="single"):
    """Set neat clean borders for entire table."""
    tblPr = table._tbl.tblPr
    borders = parse_xml(f'''
        <w:tblBorders {nsdecls("w")}>
            <w:top w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
            <w:left w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
            <w:bottom w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
            <w:right w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
            <w:insideH w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
            <w:insideV w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>
        </w:tblBorders>
    ''')
    tblPr.append(borders)

def add_callout_box(doc, title, text, bg_hex="EFF6FF", border_hex="2563EB"):
    """Add a clean callout box with a colored left bar and background."""
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = tbl.cell(0, 0)
    cell.width = Inches(6.5)
    
    set_cell_background(cell, bg_hex)
    set_cell_margins(cell, top=120, bottom=120, left=180, right=180)
    
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(f'''
        <w:tcBorders {nsdecls("w")}>
            <w:top w:val="none"/>
            <w:left w:val="single" w:sz="36" w:space="0" w:color="{border_hex}"/>
            <w:bottom w:val="none"/>
            <w:right w:val="none"/>
        </w:tcBorders>
    ''')
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = 1.15
    run_t = p.add_run(f"{title}\n")
    run_t.font.name = "Calibri"
    run_t.font.size = Pt(10.5)
    run_t.font.bold = True
    run_t.font.color.rgb = COLOR_PRIMARY_NAVY
    
    run_c = p.add_run(text)
    run_c.font.name = "Calibri"
    run_c.font.size = Pt(10)
    run_c.font.color.rgb = COLOR_TEXT_MAIN
    
    doc.add_paragraph() # spacing

print("Helper functions initialized.")
