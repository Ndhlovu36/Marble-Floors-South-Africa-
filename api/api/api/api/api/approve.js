// api/approve.js - FIXED - No fake approval
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({error:'POST only'});

  const { paymentId } = req.body;
  if (!paymentId) return res.status(400).json({error:'no paymentId'});

  const PI_KEY = process.env.PI_API_KEY;
  if (!PI_KEY) {
    console.error("CRITICAL: PI_API_KEY missing in Vercel");
    return res.status(500).json({error:'Server not configured - PI_API_KEY missing'});
  }

  try {
    const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: { 'Authorization': `Key ${PI_KEY}` }
    });
    const data = await r.json();
    
    if (!r.ok) {
      console.error("Pi approve failed:", data);
      return res.status(400).json({error:'Pi approve failed', details: data});
    }
    
    console.log("Approve OK:", paymentId);
    return res.status(200).json(data);
  } catch (e) {
    console.error("Approve error", e);
    return res.status(500).json({error:e.message});
  }
}