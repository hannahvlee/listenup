export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return res.status(500).json({ error: 'Service key not configured' });

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Missing email' });

  try {
    const r = await fetch(`https://wccuzwkswtaehcdijtcf.supabase.co/rest/v1/admins?email=eq.${encodeURIComponent(email)}&select=email,role`, {
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await r.json();
    const isAdmin = Array.isArray(data) && data.length > 0;
    const role = isAdmin ? data[0].role : null;
    return res.status(200).json({ isAdmin, role });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
