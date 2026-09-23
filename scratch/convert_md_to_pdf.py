import os
import subprocess
import markdown
import re

MD_PATH = r"d:\3. BPS\1. 1309_(D) Laptop\1. Project Latsar\Aplikasi 1\laporan\Buku_Pedoman_Penggunaan_Sistem_SIMPONITAS.md"
HTML_PATH = r"d:\3. BPS\1. 1309_(D) Laptop\1. Project Latsar\Aplikasi 1\laporan\Buku_Pedoman_Penggunaan_Sistem_SIMPONITAS.html"
PDF_PATH = r"d:\3. BPS\1. 1309_(D) Laptop\1. Project Latsar\Aplikasi 1\laporan\Buku_Pedoman_Penggunaan_Sistem_SIMPONITAS.pdf"

with open(MD_PATH, "r", encoding="utf-8") as f:
    md_content = f.read()

# Replace mermaid diagram with a styled visual HTML box
mermaid_pattern = r"```mermaid[\s\S]*?```"
styled_diagram = """
<div class="diagram-box">
  <div class="diagram-title">Diagram Arsitektur & Alur Kerja Sistem SIMPONITAS</div>
  <div class="diagram-flow">
    <div class="diagram-step">
      <div class="step-num">1</div>
      <div class="step-card">
        <strong>Pengguna / OPD / BPS</strong>
        <span>Mengakses via Web Browser Desktop / Mobile</span>
      </div>
    </div>
    <div class="diagram-arrow">&#10140;</div>
    <div class="diagram-step">
      <div class="step-num">2</div>
      <div class="step-card" style="border-top-color: #f79039;">
        <strong>Vercel Cloud Platform</strong>
        <span>Hosting SSL HTTPS 256-bit & Edge Network</span>
      </div>
    </div>
    <div class="diagram-arrow">&#10140;</div>
    <div class="diagram-step">
      <div class="step-num">3</div>
      <div class="step-card" style="border-top-color: #0284c7;">
        <strong>React.js SPA + RBAC</strong>
        <span>9 Modul Navigasi & Otorisasi 5 Peran</span>
      </div>
    </div>
    <div class="diagram-arrow">&#10140;</div>
    <div class="diagram-step">
      <div class="step-num">4</div>
      <div class="step-card" style="border-top-color: #16a34a;">
        <strong>Hybrid Datastore</strong>
        <span>LocalStorage + Node.js API /api/*</span>
      </div>
    </div>
  </div>
  <div class="diagram-outputs">
    <span class="out-item">&#128196; Berita Acara PDF</span>
    <span class="out-item">&#128202; Lembar Aliran Data</span>
    <span class="out-item">&#128218; Dokumen Kompromin</span>
    <span class="out-item">&#128214; Modul Knowledgebase</span>
  </div>
</div>
"""

md_processed = re.sub(mermaid_pattern, styled_diagram, md_content)

# Convert markdown to html
body_html = markdown.markdown(md_processed, extensions=['tables', 'fenced_code', 'toc'])

# Complete HTML document with high quality print styling
full_html = f"""<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<title>Buku Pedoman Penggunaan Sistem SIMPONITAS - BPS Pasaman</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  @page {{
    size: A4 portrait;
    margin: 20mm 15mm 20mm 15mm;
    @bottom-right {{
      content: counter(page);
    }}
  }}

  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}

  body {{
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    color: #1e293b;
    background-color: #ffffff;
    line-height: 1.6;
    font-size: 10.5pt;
  }}

  /* Cover Page */
  .cover-page {{
    padding: 40px 20px 20px 20px;
    text-align: center;
    page-break-after: always;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }}

  .cover-header {{
    border-bottom: 3px double #f79039;
    padding-bottom: 20px;
    margin-bottom: 40px;
  }}

  .cover-instansi {{
    font-size: 14pt;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: 1px;
    text-transform: uppercase;
  }}

  .cover-subinstansi {{
    font-size: 11pt;
    font-weight: 600;
    color: #64748b;
  }}

  .cover-badge {{
    display: inline-block;
    background-color: #fff7ed;
    color: #c2410c;
    border: 1.5px solid #fed7aa;
    padding: 6px 18px;
    border-radius: 20px;
    font-size: 11pt;
    font-weight: 700;
    margin: 30px auto;
  }}

  .cover-title {{
    font-size: 24pt;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.25;
    margin: 15px 0;
  }}

  .cover-subtitle {{
    font-size: 13pt;
    font-weight: 600;
    color: #f79039;
    font-style: italic;
    max-width: 600px;
    margin: 0 auto 30px auto;
  }}

  .cover-footer {{
    border-top: 1px solid #e2e8f0;
    padding-top: 25px;
    margin-top: auto;
  }}

  .cover-author {{
    font-size: 11pt;
    font-weight: 700;
    color: #0f172a;
  }}

  .cover-author-desc {{
    font-size: 9.5pt;
    color: #64748b;
    margin-top: 3px;
  }}

  /* Content Styling */
  .content {{
    padding: 0 10px;
  }}

  h1 {{
    font-size: 16pt;
    font-weight: 800;
    color: #0f172a;
    margin-top: 28px;
    margin-bottom: 12px;
    padding-bottom: 6px;
    border-bottom: 2px solid #f79039;
    page-break-after: avoid;
    break-after: avoid;
  }}

  /* Major chapter break */
  h1:not(:first-of-type) {{
    page-break-before: always;
    break-before: always;
  }}

  h2 {{
    font-size: 13pt;
    font-weight: 700;
    color: #1e293b;
    margin-top: 20px;
    margin-bottom: 8px;
    page-break-after: avoid;
  }}

  h3 {{
    font-size: 11.5pt;
    font-weight: 700;
    color: #334155;
    margin-top: 16px;
    margin-bottom: 6px;
    page-break-after: avoid;
  }}

  h4 {{
    font-size: 10.5pt;
    font-weight: 700;
    color: #475569;
    margin-top: 12px;
    margin-bottom: 4px;
    page-break-after: avoid;
  }}

  p {{
    margin-bottom: 10px;
    text-align: justify;
  }}

  ul, ol {{
    margin-left: 22px;
    margin-bottom: 12px;
  }}

  li {{
    margin-bottom: 4px;
  }}

  /* Tables */
  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0 18px 0;
    font-size: 9pt;
    page-break-inside: avoid;
    break-inside: avoid;
  }}

  th, td {{
    border: 1px solid #cbd5e1;
    padding: 7px 10px;
    text-align: left;
    vertical-align: top;
  }}

  th {{
    background-color: #f8fafc;
    color: #0f172a;
    font-weight: 700;
    border-bottom: 2px solid #94a3b8;
  }}

  tr:nth-child(even) td {{
    background-color: #fdfdfd;
  }}

  /* Code & Pre */
  code {{
    font-family: Consolas, 'Courier New', Courier, monospace;
    background-color: #f1f5f9;
    color: #b45309;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 9pt;
  }}

  pre {{
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-left: 4px solid #f79039;
    padding: 10px 12px;
    border-radius: 4px;
    margin: 12px 0;
    overflow-x: auto;
    font-size: 8.5pt;
    line-height: 1.45;
  }}

  pre code {{
    background: transparent;
    padding: 0;
    color: #0f172a;
  }}

  /* Flow Diagram Box */
  .diagram-box {{
    background: #f8fafc;
    border: 1.5px solid #cbd5e1;
    border-radius: 8px;
    padding: 16px;
    margin: 18px 0;
    page-break-inside: avoid;
  }}

  .diagram-title {{
    font-weight: 800;
    font-size: 10.5pt;
    color: #0f172a;
    text-align: center;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }}

  .diagram-flow {{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 12px;
  }}

  .diagram-step {{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }}

  .step-num {{
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #f79039;
    color: #fff;
    font-size: 8.5pt;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 4px;
  }}

  .step-card {{
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-top: 3px solid #2563eb;
    border-radius: 6px;
    padding: 8px;
    width: 100%;
    min-height: 65px;
    font-size: 8pt;
    text-align: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }}

  .step-card strong {{
    display: block;
    color: #0f172a;
    margin-bottom: 3px;
    font-size: 8.5pt;
  }}

  .step-card span {{
    color: #64748b;
    font-size: 7.5pt;
    line-height: 1.25;
    display: block;
  }}

  .diagram-arrow {{
    font-size: 14pt;
    color: #f79039;
    font-weight: bold;
  }}

  .diagram-outputs {{
    display: flex;
    justify-content: center;
    gap: 10px;
    border-top: 1px dashed #cbd5e1;
    padding-top: 10px;
  }}

  .out-item {{
    background: #ffffff;
    border: 1px solid #cbd5e1;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 8pt;
    font-weight: 700;
    color: #334155;
  }}

  blockquote {{
    border-left: 4px solid #f79039;
    background: #fff7ed;
    padding: 10px 14px;
    margin: 12px 0;
    border-radius: 0 4px 4px 0;
    font-size: 9.5pt;
    color: #9a3412;
  }}

  hr {{
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 20px 0;
  }}

  /* Links */
  a {{
    color: #0284c7;
    text-decoration: none;
  }}
</style>
</head>
<body>

<!-- Cover Page -->
<div class="cover-page">
  <div class="cover-header">
    <div class="cover-instansi">Badan Pusat Statistik Kabupaten Pasaman</div>
    <div class="cover-subinstansi">Provinsi Sumatera Barat</div>
  </div>

  <div>
    <div class="cover-badge">BUKU PEDOMAN RESMI PENGGUNA</div>
    <div class="cover-title">PANDUAN PENGGUNAAN SISTEM INFORMASI SIMPONITAS</div>
    <div class="cover-subtitle">
      "Sinergi Pembinaan Statistik Sektoral melalui Penerbitan Kompromin Akurat dan Berkualitas"
    </div>
  </div>

  <div class="cover-footer">
    <div class="cover-author">Muhammad Rafi Tasrif, S.Tr.Stat</div>
    <div class="cover-author-desc">Pranata Komputer Ahli Pertama — BPS Kabupaten Pasaman</div>
    <div class="cover-author-desc" style="margin-top: 8px; font-weight: 600; color: #0f172a;">
      Aktualisasi Pelatihan Dasar CPNS Golongan III BPS Tahun 2026
    </div>
  </div>
</div>

<!-- Main Body -->
<div class="content">
{body_html}
</div>

</body>
</html>
"""

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(full_html)

print("HTML generated successfully at:", HTML_PATH)

# Convert to PDF via headless Microsoft Edge
edge_exe = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(edge_exe):
    # Try 64-bit Program Files
    edge_exe = r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"

cmd = [
    edge_exe,
    "--headless",
    "--disable-gpu",
    "--run-all-compositor-stages-before-draw",
    f"--print-to-pdf={PDF_PATH}",
    HTML_PATH
]

print("Converting HTML to PDF using Microsoft Edge headless...")
result = subprocess.run(cmd, capture_output=True, text=True)

if os.path.exists(PDF_PATH):
    size_kb = os.path.getsize(PDF_PATH) / 1024
    print(f"SUCCESS: PDF generated at: {PDF_PATH} ({size_kb:.1f} KB)")
else:
    print("Error generating PDF:", result.stderr)
