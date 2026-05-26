export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = 'https://wccuzwkswtaehcdijtcf.supabase.co';
  if (!serviceKey) return res.status(500).json({ error: 'Service key not configured' });

  const userId = req.query.id;
  if (!userId) return res.status(400).json({ error: 'Missing user id' });

  const headers = {
    'apikey': serviceKey,
    'Authorization': `Bearer ${serviceKey}`,
    'Content-Type': 'application/json'
  };

  try {
    const [profileRes, toeflRes, userRes] = await Promise.all([
      fetch(`${supabaseUrl}/rest/v1/profiles?user_id=eq.${userId}&select=*`, { headers }),
      fetch(`${supabaseUrl}/rest/v1/toefl_scores?user_id=eq.${userId}&select=*&order=test_date.desc`, { headers }),
      fetch(`${supabaseUrl}/auth/v1/admin/users/${userId}`, { headers })
    ]);

    const profiles = await profileRes.json();
    const toefl = await toeflRes.json();
    const userData = await userRes.json();
    const email = userData?.email || null;

    // Upstash에서 트랙 기록 가져오기
    const redisUrl = process.env.KV_REST_API_URL;
    const redisToken = process.env.KV_REST_API_TOKEN;
    let records = [];
    if (redisUrl && redisToken && email) {
      const r = await fetch(redisUrl, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${redisToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(['LRANGE', 'records', '0', '999'])
      });
      const data = await r.json();
      records = (data.result || [])
        .map(r => { try { return JSON.parse(r); } catch { return null; } })
        .filter(Boolean)
        .filter(r => r.email === email);
    }

    return res.status(200).json({
      profile: profiles[0] || null,
      toefl: Array.isArray(toefl) ? toefl : [],
      records,
      email
    });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
