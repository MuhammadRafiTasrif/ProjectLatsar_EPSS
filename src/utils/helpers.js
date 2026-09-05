export function formatDateIndo(dateString) {
  if (!dateString || dateString === '-') return '-';
  try {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  } catch (e) {
    return dateString;
  }
}

export function exportToCSV(filename, rows) {
  if (!rows || !rows.length) return;
  const separator = ',';
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    '\n' +
    rows
      .map(row => {
        return keys
          .map(k => {
            let cell = row[k] === null || row[k] === undefined ? '' : row[k];
            cell = cell instanceof Date ? cell.toLocaleString() : cell.toString();
            cell = cell.replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          })
          .join(separator);
      })
      .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function printElement(elementId, title = 'Berita Acara Pembinaan SIMPONITAS BPS Pasaman') {
  const elem = document.getElementById(elementId);
  if (!elem) return;
  const printWindow = window.open('', '', 'height=700,width=900');
  printWindow.document.write('<html><head><title>' + title + '</title>');
  printWindow.document.write('<style>');
  printWindow.document.write(`
    body { font-family: "Plus Jakarta Sans", sans-serif; padding: 30px; color: #1e293b; }
    h1, h2, h3 { color: #f79039; margin-bottom: 8px; }
    .header-box { border-bottom: 3px double #f79039; padding-bottom: 12px; margin-bottom: 24px; text-align: center; }
    .info-table { width: 100%; border-collapse: collapse; margin: 16px 0; }
    .info-table td { padding: 8px 12px; border: 1px solid #cbd5e1; }
    .info-table th { background: #fff7ed; padding: 10px; border: 1px solid #cbd5e1; color: #c76717; text-align: left; }
    .footer-sign { margin-top: 50px; display: flex; justify-content: space-between; text-align: center; }
  `);
  printWindow.document.write('</style></head><body>');
  printWindow.document.write(elem.innerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}
