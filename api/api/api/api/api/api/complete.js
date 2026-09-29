export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin','*');
  if(req.method!=='POST') return res.status(405).end();
  try{
    const {paymentId, txid} = req.body;
    const piRes = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`,{
      method:'POST',
      headers:{
        'Authorization':`Key ${process.env.PI_API_KEY}`,
        'Content-Type':'application/json'
      },
      body: JSON.stringify({txid: txid || ''})
    });
    const data = await piRes.json();
    return res.status(200).json(data);
  }catch(e){ return res.status(200).json({error:e.message}); }
}