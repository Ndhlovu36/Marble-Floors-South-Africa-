// api/complete.js - Vercel
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { paymentId, txid, customer, network } = req.body;
  if (!paymentId) return res.status(400).json({error:'no paymentId'});

  const PI_KEY = process.env.PI_API_KEY;

  console.log("COMPLETE:", {paymentId, txid, customer, network, time:new Date().toISOString()});

  // TODO: Save to your database / send email here
  // Example: await sendEmail(customer.email, `Order ${paymentId} TX ${txid}`)

  if (!PI_KEY || !txid) {
    return res.json({ok:true, local:true});
  }

  try {
    const r = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: { 'Authorization': `Key ${PI_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ txid })
    });
    const data = await r.text();
    console.log("Complete PI:", data);
    return res.json({ok:true});
  } catch (e) {
    console.error(e);
    return res.json({ok:true, error:e.message});
  }
}