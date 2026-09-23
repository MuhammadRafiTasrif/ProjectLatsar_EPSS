// Serverless Node.js API Endpoint for Vercel Deployment
// /api/pembinaan

export default function handler(req, res) {
  // Set CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const mockPembinaan = [
    {
      id: 'pem-101',
      opdNama: 'Dinas Kesehatan Kabupaten Pasaman',
      jenis: 'Pendampingan Penyusunan Kompromin',
      topik: 'Penyusunan Kompilasi Data Pelayanan Kesehatan Dasar & Stunting 2025',
      tanggalUsulan: '2026-08-10',
      tanggalPelaksanaan: '2026-08-18',
      status: 'Selesai',
      pembinaBPS: 'Muhammad Rafi Tasrif, S.Tr.Stat'
    },
    {
      id: 'pem-102',
      opdNama: 'Dinas Pertanian Kabupaten Pasaman',
      jenis: 'Pembinaan Metadata Statistik (MS-D)',
      topik: 'Pembinaan Metadata Variabel Komoditas Padi & Jagung',
      tanggalUsulan: '2026-08-14',
      tanggalPelaksanaan: '2026-08-22',
      status: 'Dalam Proses',
      pembinaBPS: 'Muhammad Irfa’issurur'
    },
    {
      id: 'pem-104',
      opdNama: 'Dinas Pendidikan & Kebudayaan Pasaman',
      jenis: 'Konsultasi Teknis Sektoral',
      topik: 'Harmonisasi Data Angka Partisipasi Murni (APM)',
      tanggalUsulan: '2026-09-15',
      tanggalPelaksanaan: '2026-09-15',
      status: 'Menunggu Persetujuan',
      pembinaBPS: 'Tim Statistik Sektoral BPS Pasaman'
    }
  ];

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      message: 'Berhasil mengambil daftar pembinaan statistik sektoral BPS Pasaman',
      data: mockPembinaan
    });
  }

  if (req.method === 'POST') {
    const newBody = req.body || {};
    return res.status(201).json({
      success: true,
      message: 'Permohonan pembinaan berhasil dikirim ke BPS Pasaman',
      data: { id: `pem-${Date.now()}`, ...newBody, status: 'Menunggu Persetujuan' }
    });
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
