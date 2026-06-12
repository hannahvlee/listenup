export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = 'https://wccuzwkswtaehcdijtcf.supabase.co';
  if (!serviceKey) return res.status(500).json({ error: 'Service key not configured' });

  const headers = {
    'apikey': serviceKey,
    'Authorization': `Bearer ${serviceKey}`,
    'Content-Type': 'application/json'
  };

  // GET: 숨긴 트랙 목록 조회
  if (req.method === 'GET') {
    try {
      const r = await fetch(`${supabaseUrl}/rest/v1/hidden_tracks?select=track_id`, { headers });
      const data = await r.json();
      const trackIds = (data || []).map(d => d.track_id);
      return res.status(200).json({ hiddenTracks: trackIds });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // POST: 숨김/표시 토글
  if (req.method === 'POST') {
    const { trackId, hidden } = req.body;
    if (trackId == null) return res.status(400).json({ error: 'Missing trackId' });
    try {
      if (hidden) {
        // 숨김 추가
        await fetch(`${supabaseUrl}/rest/v1/hidden_tracks`, {
          method: 'POST',
          headers: { ...headers, 'Prefer': 'return=minimal' },
          body: JSON.stringify({ track_id: trackId })
        });
      } else {
        // 숨김 해제
        await fetch(`${supabaseUrl}/rest/v1/hidden_tracks?track_id=eq.${trackId}`, {
          method: 'DELETE',
          headers
        });
      }
      return res.status(200).json({ success: true });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
