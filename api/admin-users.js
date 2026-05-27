export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return res.status(500).json({ error: 'Service key not configured' });

  try {
    const [profilesRes, authRes] = await Promise.all([
      fetch('https://wccuzwkswtaehcdijtcf.supabase.co/rest/v1/profiles?select=*&order=name.asc', {
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json'
        }
      }),
      fetch('https://wccuzwkswtaehcdijtcf.supabase.co/auth/v1/admin/users?per_page=1000', {
        headers: {
          'apikey': serviceKey,
          'Authorization': `Bearer ${serviceKey}`,
          'Content-Type': 'application/json'
        }
      })
    ]);
    const users = await profilesRes.json();
    const authData = await authRes.json();
    const authMap = {};
    (authData.users || []).forEach(u => { authMap[u.id] = u.created_at; });
    const merged = users.map(u => ({ ...u, created_at: authMap[u.user_id] || u.created_at || null }));
    const authCount = (authData.users || []).length;
    const authUserIds = (authData.users || []).map(u => u.id);
    return res.status(200).json({ users: merged, authCount, authUserIds });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
