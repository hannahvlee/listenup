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

  // POST: 프로필 생성 or 토플 점수 추가
  if (req.method === 'POST') {
    const { user_id, type, name, class: cls, target_score, reading, listening, speaking, writing, total, test_date } = req.body;
    if (!user_id) return res.status(400).json({ error: 'Missing user_id' });

    // 프로필 생성
    if (type === 'create_profile') {
      if (!name || !cls) return res.status(400).json({ error: 'Missing name or class' });
      try {
        const r = await fetch(`${supabaseUrl}/rest/v1/profiles`, {
          method: 'POST',
          headers: { ...headers, 'Prefer': 'return=minimal' },
          body: JSON.stringify({ user_id, name, class: cls, target_score: target_score || null, status: 'active' })
        });
        if (!r.ok) throw new Error('프로필 생성 실패');
        return res.status(200).json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    }

    // 프로필 목표점수/날짜 수정
    if (type === 'update_profile') {
      try {
        const updateData = {};
        if (req.body.class !== undefined) updateData.class = req.body.class;
        if (req.body.target_score !== undefined) updateData.target_score = req.body.target_score;
        if (req.body.target_date !== undefined) updateData.target_date = req.body.target_date;
        const r = await fetch(`${supabaseUrl}/rest/v1/profiles?user_id=eq.${user_id}`, {
          method: 'PATCH',
          headers: { ...headers, 'Prefer': 'return=minimal' },
          body: JSON.stringify(updateData)
        });
        if (!r.ok) {
          const errData = await r.json().catch(() => ({}));
          throw new Error(errData.message || errData.error || '수정 실패');
        }
        return res.status(200).json({ success: true });
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    }

    // 토플 점수 추가
    if (!type || !test_date) return res.status(400).json({ error: 'Missing required fields' });
    try {
      const r = await fetch(`${supabaseUrl}/rest/v1/toefl_scores`, {
        method: 'POST',
        headers: { ...headers, 'Prefer': 'return=representation' },
        body: JSON.stringify({ user_id, type, reading, listening, speaking, writing, total, test_date })
      });
      const data = await r.json();
      return res.status(200).json({ success: true, data });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const userId = req.query.id;
  const quick = req.query.quick === 'true';
  if (!userId) return res.status(400).json({ error: 'Missing user id' });

  // quick 모드: 프로필만 빠르게 반환
  if (quick) {
    try {
      const [profileRes, userRes] = await Promise.all([
        fetch(`${supabaseUrl}/rest/v1/profiles?user_id=eq.${userId}&select=*`, { headers }),
        fetch(`${supabaseUrl}/auth/v1/admin/users/${userId}`, { headers })
      ]);
      const profiles = await profileRes.json();
      const userData = await userRes.json();
      return res.status(200).json({
        profile: profiles[0] || null,
        email: userData?.email || null,
        toefl: [],
        records: []
      });
    } catch (e) {
      return res.status(500).json({ error: e.message });
    }
  }

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
