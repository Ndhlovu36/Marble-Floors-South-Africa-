export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { paymentId, txid } = req.body;
  const PI_KEY = process.env.PI_API_KEY;
  const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
    method: 'POST',
    headers: { 'Authorization': `Key ${PI_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ txid })
  });
  const data = await r.json();
  return res.status(200).json(data);
}