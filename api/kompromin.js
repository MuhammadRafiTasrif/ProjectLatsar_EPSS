// Serverless Node.js API Endpoint for Vercel Deployment
// /api/kompromin

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const mockKompromin = [
    {
      id: 'komp-01',
      judul: 'Kompilasi Produk Administrasi Kesehatan Kabupaten Pasaman Tahun 2025',
      opdNama: 'Dinas Kesehatan Kabupaten Pasaman',
      tahun: 2025,
      statusVerifikasi: 'Terverifikasi',
      nomorSk: 'SK-KOMPROMIN/DINKES/2025-09'
    },
    {
      id: 'komp-02',
      judul: 'Kompilasi Produk Administrasi Pendidikan & Kebudayaan Pasaman 2025',
      opdNama: 'Dinas Pendidikan & Kebudayaan Pasaman',
      tahun: 2025,
      statusVerifikasi: 'Terverifikasi',
      nomorSk: 'SK-KOMPROMIN/DISDIK/2025-10'
    }
  ];

  return res.status(200).json({
    success: true,
    message: 'Repository Kompromin BPS Kabupaten Pasaman',
    data: mockKompromin
  });
}
