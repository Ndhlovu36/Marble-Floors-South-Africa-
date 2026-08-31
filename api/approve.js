export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if(req.method === 'OPTIONS') return res.status(200).end();
  
  const { paymentId } = req.body;
  if(!paymentId) return res.status(400).json({error: "no paymentId"});

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {telscflxpglidlntvqsnslc4jflquffrtjyndblmm358uoy8rnwcplkoinfi16fm
        'Authorization': `Key `,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch(e){
    return res.status(500).json({error: e.message});
  }
}
