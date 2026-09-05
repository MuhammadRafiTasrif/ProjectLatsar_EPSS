// Serverless Node.js API Endpoint for Vercel Deployment
// /api/data-sektoral

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  return res.status(200).json({
    success: true,
    message: 'Data Statistik Sektoral BPS Pasaman',
    data: [
      { id: 'ds-1', indikator: 'Jumlah Rumah Sakit & Puskesmas Rawat Inap', OPD: 'Dinas Kesehatan', nilai: '1 RSUD, 16 Puskesmas', satuan: 'Unit', tahun: 2025 },
      { id: 'ds-2', indikator: 'Angka Partisipasi Murni (APM) SD/MI', OPD: 'Dinas Pendidikan', nilai: '98.42', satuan: 'Persen (%)', tahun: 2025 }
    ]
  });
}
