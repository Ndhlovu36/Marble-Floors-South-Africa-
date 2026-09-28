export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({error: 'POST only'});
  try {
    const { paymentId, txid } = req.body;
    const apiKey = process.env.PI_API_KEY;
    
    const piRes = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid })
    });
    
    const data = await piRes.text();
    console.log('Complete:', data);
    return res.status(200).json({completed: true});
  } catch (e) {
    return res.status(500).json({error: e.message});
  }
}