export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { paymentId, txid } = req.body;
  try {
    const PiKey = process.env.PI_API_KEY;
    const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: { 'Authorization': `Key ${PiKey}`, 'Content-Type':'application/json' },
      body: JSON.stringify({ txid })
    });
    const data = await r.json();
    return res.status(200).json(data);
  } catch(e){ return res.status(200).json({ok:true}); }
}
