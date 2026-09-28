# -*- coding: utf-8 -*-
"""
Script Generator Dokumen Laporan Hasil Aktualisasi SIMPONITAS
Muhammad Rafi Tasrif - NIP. 200209292026031001
Pranata Komputer Ahli Pertama BPS Kabupaten Pasaman
Pelatihan Dasar CPNS Golongan III BPS Angkatan XVI Tahun 2026
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

# Warna Tema Resmi Dokumen Kedinasan BPS Pasaman
COLOR_NAVY = RGBColor(30, 58, 138)       # #1E3A8A - BPS Navy
COLOR_ROYAL = RGBColor(37, 99, 235)      # #2563EB - Royal Blue
COLOR_ORANGE = RGBColor(247, 144, 57)    # #F79039 - Pasaman Orange
COLOR_TEXT = RGBColor(30, 41, 59)        # #1E293B - Slate 800
COLOR_MUTED = RGBColor(71, 85, 105)      # #475569 - Slate 600

HEX_NAVY = "1E3A8A"
HEX_ROYAL = "2563EB"
HEX_LIGHT_BLUE = "EFF6FF"
HEX_LIGHT_SLATE = "F8FAFC"
HEX_BORDER = "CBD5E1"
HEX_HEADER_GRAY = "F1F5F9"
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

def style_table_header(row, col_widths, hex_bg=HEX_NAVY, text_color=RGBColor(255, 255, 255)):
    for idx, cell in enumerate(row.cells):
        cell.width = col_widths[idx]
        set_cell_background(cell, hex_bg)
        set_cell_margins(cell, top=140, bottom=140, left=140, right=140)
        cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
        for p in cell.paragraphs:
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(0)
            for r in p.runs:
                r.font.name = "Calibri"
                r.font.size = Pt(9.5)
                r.font.bold = True
                r.font.color.rgb = text_color

def style_table_row(row, col_widths, hex_bg="FFFFFF", align_list=None, font_size=9.5):
    for idx, cell in enumerate(row.cells):
        cell.width = col_widths[idx]
        if hex_bg != "FFFFFF":
            set_cell_background(cell, hex_bg)
        set_cell_margins(cell, top=80, bottom=80, left=120, right=120)
        cell.vertical_alignment = WD_ALIGN_VERTICAL.CENTER
        for p in cell.paragraphs:
            if align_list and idx < len(align_list):
                p.alignment = align_list[idx]
            else:
                p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            p.paragraph_format.space_before = Pt(0)
            p.paragraph_format.space_after = Pt(2)
            p.paragraph_format.line_spacing = 1.15
            for r in p.runs:
                r.font.name = "Calibri"
                r.font.size = Pt(font_size)
                r.font.color.rgb = COLOR_TEXT

def create_document():
    doc = docx.Document()
    
    # Atur Margin Halaman Standar Dokumen Latsar BPS (A4)
    for section in doc.sections:
        section.page_width = Inches(8.27)
        section.page_height = Inches(11.69)
        section.top_margin = Inches(1.0)
        section.bottom_margin = Inches(1.0)
        section.left_margin = Inches(1.0)
        section.right_margin = Inches(1.0)
        
        section.different_first_page_header_footer = True
        
        # Header
        hdr = section.header
        p_hdr = hdr.paragraphs[0]
        p_hdr.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        r_hdr = p_hdr.add_run("Laporan Hasil Aktualisasi Latsar CPNS BPS: SIMPONITAS Pasaman")
        r_hdr.font.name = "Calibri"
        r_hdr.font.size = Pt(8.5)
        r_hdr.font.italic = True
        r_hdr.font.color.rgb = COLOR_MUTED
        
        # Footer
        ftr = section.footer
        p_ftr = ftr.paragraphs[0]
        p_ftr.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r_ftr = p_ftr.add_run("Badan Pusat Statistik Kabupaten Pasaman, Provinsi Sumatera Barat")
        r_ftr.font.name = "Calibri"
        r_ftr.font.size = Pt(8.5)
        r_ftr.font.color.rgb = COLOR_MUTED
        
    return doc

print("Docx core initialized.")
