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

  // GET: 숨긴 트랙 + 트랙 설정 조회
  if (req.method === 'GET') {
    try {
      const [hiddenRes, settingsRes] = await Promise.all([
        fetch(`${supabaseUrl}/rest/v1/hidden_tracks?select=track_id`, { headers }),
        fetch(`${supabaseUrl}/rest/v1/track_settings?select=*`, { headers })
      ]);
      const hiddenData = await hiddenRes.json();
      const settingsData = await settingsRes.json();
      const trackIds = (hiddenData || []).map(d => d.track_id);
      const settings = {};
      (settingsData || []).forEach(s => { settings[s.track_id] = s; });
      return res.status(200).json({ hiddenTracks: trackIds, trackSettings: settings });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  // POST: 숨김 토글 or 트랙 설정 업데이트
  if (req.method === 'POST') {
    const { action, trackId, hidden, toeflType, sortOrder } = req.body;

    // 숨김 토글
    if (action === 'toggle' || hidden !== undefined) {
      if (trackId == null) return res.status(400).json({ error: 'Missing trackId' });
      try {
        if (hidden) {
          await fetch(`${supabaseUrl}/rest/v1/hidden_tracks`, {
            method: 'POST',
            headers: { ...headers, 'Prefer': 'return=minimal' },
            body: JSON.stringify({ track_id: trackId })
          });
        } else {
          await fetch(`${supabaseUrl}/rest/v1/hidden_tracks?track_id=eq.${trackId}`, {
            method: 'DELETE', headers
          });
        }
        return res.status(200).json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    }

    // 트랙 설정 업데이트 (toefl_type, sort_order)
    if (action === 'update_setting') {
      if (trackId == null) return res.status(400).json({ error: 'Missing trackId' });
      try {
        const body = {};
        if (toeflType !== undefined) body.toefl_type = toeflType;
        if (sortOrder !== undefined) body.sort_order = sortOrder;
        await fetch(`${supabaseUrl}/rest/v1/track_settings?track_id=eq.${trackId}`, {
          method: 'PATCH',
          headers: { ...headers, 'Prefer': 'return=minimal' },
          body: JSON.stringify(body)
        });
        // PATCH가 없으면 INSERT
        const checkRes = await fetch(`${supabaseUrl}/rest/v1/track_settings?track_id=eq.${trackId}&select=track_id`, { headers });
        const checkData = await checkRes.json();
        if (!checkData || checkData.length === 0) {
          await fetch(`${supabaseUrl}/rest/v1/track_settings`, {
            method: 'POST',
            headers: { ...headers, 'Prefer': 'return=minimal' },
            body: JSON.stringify({ track_id: trackId, ...body })
          });
        }
        return res.status(200).json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    }

    // 순서 일괄 저장
    if (action === 'save_order') {
      const { orders } = req.body;
      if (!orders) return res.status(400).json({ error: 'Missing orders' });
      try {
        await Promise.all(orders.map(async ({ trackId: tid, sortOrder: order }) => {
          const checkRes = await fetch(`${supabaseUrl}/rest/v1/track_settings?track_id=eq.${tid}&select=track_id`, { headers });
          const checkData = await checkRes.json();
          if (checkData && checkData.length > 0) {
            await fetch(`${supabaseUrl}/rest/v1/track_settings?track_id=eq.${tid}`, {
              method: 'PATCH',
              headers: { ...headers, 'Prefer': 'return=minimal' },
              body: JSON.stringify({ sort_order: order })
            });
          } else {
            await fetch(`${supabaseUrl}/rest/v1/track_settings`, {
              method: 'POST',
              headers: { ...headers, 'Prefer': 'return=minimal' },
              body: JSON.stringify({ track_id: tid, sort_order: order })
            });
          }
        }));
        return res.status(200).json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    }

    return res.status(400).json({ error: 'Unknown action' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
