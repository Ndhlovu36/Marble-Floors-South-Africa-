export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).json({error: 'POST only'});
  
  try {
    const { paymentId } = req.body;
    if (!paymentId) return res.status(400).json({error: 'No paymentId'});
    
    const apiKey = process.env.PI_API_KEY;
    if (!apiKey) return res.status(500).json({error: 'PI_API_KEY missing in Vercel'});

    console.log('Approving:', paymentId);

    // IMPORTANT: Pi API
    const piRes = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await piRes.text();
    console.log('Pi approve response:', data, piRes.status);

    if (!piRes.ok) {
      return res.status(500).json({error: 'Pi approve failed', details: data});
    }

    return res.status(200).json({approved: true});
  } catch (e) {
    console.error(e);
    return res.status(500).json({error: e.message});
  }
}