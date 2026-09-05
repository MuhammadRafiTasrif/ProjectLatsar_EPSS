// Serverless Node.js API Endpoint for Vercel Deployment
// /api/roles

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const roleConfig = {
    system: 'SIMPONITAS BPS Kabupaten Pasaman',
    rolesCount: 5,
    lastUpdated: new Date().toISOString()
  };

  return res.status(200).json({
    success: true,
    message: 'Data Manajemen Role & Access Permission Toggles',
    data: roleConfig
  });
}
