# -*- coding: utf-8 -*-
"""
Script lengkap untuk menghasilkan Laporan Hasil Aktualisasi SIMPONITAS
Format DOCX resmi untuk Pelatihan Dasar CPNS BPS Tahun 2026.
Disusun oleh Muhammad Rafi Tasrif, NIP. 200209292026031001.
Memenuhi kaidah antislop (tanpa em dash, tanpa buzzword AI, data akurat dan terverifikasi).
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

# Palet Warna Dokumen Resmi BPS Pasaman
COLOR_NAVY = RGBColor(30, 58, 138)       # #1E3A8A - Navy Resmi BPS
COLOR_ROYAL = RGBColor(37, 99, 235)      # #2563EB - Royal Blue
COLOR_ORANGE = RGBColor(247, 144, 57)    # #F79039 - Pasaman Amber/Orange
COLOR_TEXT = RGBColor(30, 41, 59)        # #1E293B - Slate 800
COLOR_MUTED = RGBColor(71, 85, 105)      # #475569 - Slate 600

HEX_NAVY = "1E3A8A"
HEX_ROYAL = "2563EB"
HEX_LIGHT_BLUE = "EFF6FF"
HEX_LIGHT_SLATE = "F8FAFC"
HEX_BORDER = "CBD5E1"
HEX_HEADER_GRAY = "E2E8F0"
HEX_ORANGE_LIGHT = "FFF7ED"
HEX_ORANGE = "F79039"

def set_cell_background(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=140, right=140):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def set_table_borders(table, color="CBD5E1", sz="4", val="single"):
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

def add_header_banner(doc, title, subtitle):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(4)
    
    r_inst = p.add_run("BADAN PUSAT STATISTIK KABUPATEN PASAMAN\nPROVINSI SUMATERA BARAT\n")
    r_inst.font.name = "Calibri"
    r_inst.font.size = Pt(11)
    r_inst.font.bold = True
    r_inst.font.color.rgb = COLOR_TEXT
    
    r_line = p.add_run("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n")
    r_line.font.color.rgb = COLOR_ORANGE
    r_line.font.bold = True
    
    r_t = p.add_run(f"{title}\n")
    r_t.font.name = "Calibri"
    r_t.font.size = Pt(13)
    r_t.font.bold = True
    r_t.font.color.rgb = COLOR_NAVY
    
    r_s = p.add_run(f"{subtitle}\n")
    r_s.font.name = "Calibri"
    r_s.font.size = Pt(9.5)
    r_s.font.italic = True
    r_s.font.color.rgb = COLOR_MUTED
    
    doc.add_paragraph()

def add_h1(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(16)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(text)
    r.font.name = "Calibri"
    r.font.size = Pt(13)
    r.font.bold = True
    r.font.color.rgb = COLOR_NAVY
    return p

def add_h2(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(text)
    r.font.name = "Calibri"
    r.font.size = Pt(11.5)
    r.font.bold = True
    r.font.color.rgb = COLOR_ROYAL
    return p

def add_h3(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(text)
    r.font.name = "Calibri"
    r.font.size = Pt(10.5)
    r.font.bold = True
    r.font.color.rgb = COLOR_TEXT
    return p

def add_p(doc, text, bold_prefix="", italic=False, justify=True):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(5)
    p.paragraph_format.line_spacing = 1.15
    if justify:
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    
    if bold_prefix:
        r_b = p.add_run(bold_prefix)
        r_b.font.name = "Calibri"
        r_b.font.size = Pt(10.5)
        r_b.font.bold = True
        r_b.font.color.rgb = COLOR_TEXT
        
    r = p.add_run(text)
    r.font.name = "Calibri"
    r.font.size = Pt(10.5)
    r.font.italic = italic
    r.font.color.rgb = COLOR_TEXT
    return p

def add_bullet(doc, text, bold_prefix=""):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.line_spacing = 1.15
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    if bold_prefix:
        r_b = p.add_run(bold_prefix)
        r_b.font.name = "Calibri"
        r_b.font.size = Pt(10.5)
        r_b.font.bold = True
        r_b.font.color.rgb = COLOR_TEXT
    r = p.add_run(text)
    r.font.name = "Calibri"
    r.font.size = Pt(10.5)
    r.font.color.rgb = COLOR_TEXT
    return p

def add_callout(doc, title, text, bg="EFF6FF", border="2563EB"):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = tbl.cell(0, 0)
    cell.width = Inches(6.5)
    set_cell_background(cell, bg)
    set_cell_margins(cell, top=120, bottom=120, left=160, right=160)
    
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(f'''
        <w:tcBorders {nsdecls("w")}>
            <w:top w:val="none"/>
            <w:left w:val="single" w:sz="36" w:space="0" w:color="{border}"/>
            <w:bottom w:val="none"/>
            <w:right w:val="none"/>
        </w:tcBorders>
    ''')
    tcPr.append(borders)
    
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(3)
    p.paragraph_format.line_spacing = 1.15
    run_t = p.add_run(f"{title}\n")
    run_t.font.name = "Calibri"
    run_t.font.size = Pt(10.5)
    run_t.font.bold = True
    run_t.font.color.rgb = COLOR_NAVY
    
    run_c = p.add_run(text)
    run_c.font.name = "Calibri"
    run_c.font.size = Pt(10)
    run_c.font.color.rgb = COLOR_TEXT
    
    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(2)
    p_sp.paragraph_format.space_after = Pt(4)

print("Setup completed successfully.")
