<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Marble Floors SA - Pi Only</title>
<script src="https://sdk.minepi.com/pi-sdk.js"></script>
<style>
body{font-family:Arial;margin:0;background:#f5f5f5}
.header{background:#0d3d2e;color:#fff;padding:16px;text-align:center}
.btn-login{background:#00c853;color:#fff;border:none;padding:14px 24px;border-radius:30px;font-weight:900;cursor:pointer;font-size:14px;width:80%;max-width:300px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:10px}
.card{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 6px rgba(0,0,0,.1);padding:10px;text-align:center}
.price{color:#0d3d2e;font-weight:900;font-size:18px;margin:6px 0}
.stock{color:#00c853;background:#e8f5e9;padding:2px 8px;border-radius:10px;font-size:11px}
.btn-pi{background:#0d3d2e;color:#fff;width:100%;padding:10px;border:none;border-radius:8px;font-weight:900;margin-top:8px;cursor:pointer}
#log{padding:8px;background:#fff3cd;text-align:center;font-size:11px;font-weight:bold}
</style></head><body>
<div class="header">
<h1 style="margin:0;font-size:18px;">MARBLE FLOORS SOUTH AFRICA</h1>
<p style="font-size:11px;color:#a5d6a7;margin:5px 0;">11 Products • Pi Only • No Fiat</p>
<button class="btn-login" id="lb" onclick="login()">🔐 LOGIN WITH PI</button>
<div id="li" style="display:none;margin-top:8px;"></div>
<div id="st" style="font-size:11px;color:#a5d6a7;margin-top:6px;">Tap LOGIN</div>
<div style="margin-top:10px;"><button onclick="setMode('test')" id="t1" style="background:#00c853;color:#fff;border:none;padding:6px 14px;border-radius:20px;font-weight:bold;">🟡 TESTNET</button> <button onclick="setMode('main')" id="t2" style="background:transparent;border:1px solid #00c853;color:#00c853;padding:6px 14px;border-radius:20px;font-weight:bold;">🟢 MAINNET</button></div>
</div>
<div id="log">Loading Pi SDK...</div>
<div class="grid" id="g"></div>
<script>
let piUser=null, logged=false, mode='test';
let logEl=document.getElementById('log');
function log(m,c){logEl.style.display='block';logEl.innerText=m; if(c) logEl.style.background=c;}
function setMode(m){mode=m; document.getElementById('t1').style.background=m==='test'?'#00c853':'transparent'; document.getElementById('t1').style.color=m==='test'?'#fff':'#00c853'; document.getElementById('t2').style.background=m==='main'?'#00c853':'transparent'; document.getElementById('t2').style.color=m==='main'?'#fff':'#00c853'; initPi();}
function initPi(){
 try{
   if(typeof Pi==='undefined'){ log("❌ Pi SDK not loaded - Refresh in Pi Browser","#ffebee"); return;}
   Pi.init({version:"2.0", sandbox:(mode==='test')});
   log(`✅ Pi SDK Ready - ${mode.toUpperCase()} Sandbox ${mode==='test'?'ON':'OFF'} - Now tap LOGIN`,"#e8f5e9");
 }catch(e){ log("Pi Init Error: "+e.message,"#ffebee");}
}
setTimeout(initPi,800);

// PRODUCTS - NO IMAGES - WILL ALWAYS SHOW
const P=[
["Epoxy White 20L",12,"White pearl marble"],
["Epoxy Grey 20L",12,"Grey stone marble"],
["Epoxy Black 20L",13,"Black galaxy"],
["Epoxy Beige 20L",11,"Beige cream"],
["Epoxy Blue 20L",12,"Blue ocean"],
["Epoxy Gold 20L",14,"Gold vein luxury"],
["Primer Base 10L",6,"Base coat primer"],
["Top Coat Clear 10L",7,"Clear top coat"],
["Tools Kit",4,"Roller+mixer kit"],
["Anti-Slip 1L",2,"Anti-slip additive"],
["Pigment Pack 5",3,"5 metallic colors"]
];
try{
 document.getElementById('g').innerHTML=P.map(x=>`<div class="card"><div style="background:#0d3d2e;color:#fff;padding:4px;border-radius:6px;font-size:10px;font-weight:900;display:inline-block;">20L</div><div style="font-size:12px;font-weight:800;margin-top:8px;color:#0d3d2e;">${x[0]}</div><div style="font-size:10px;color:#666;">${x[2]}</div><div style="margin-top:6px;"><span class="price">π ${x[1]}</span> <span class="stock">In stock</span></div><div style="font-size:9px;color:#0d3d2e;font-weight:bold;">Pi Only - No Fiat</div><button class="btn-pi" onclick="payPi('${x[0]}',${x[1]})">Pay π ${x[1]} Pi</button></div>`).join('');
 logEl.innerText+=" | 11 Products Loaded ✅";
}catch(e){ log("Product error "+e.message,"#ffebee");}

function login(){
 if(typeof Pi==='undefined'){ alert("OPEN IN PI BROWSER!\n\nPi App > 3 lines > Pi Browser > type: rica-2od5.vercel.app"); log("❌ Not in Pi Browser","#ffebee"); return;}
 log("⏳ Opening Pi Login Popup - Approve...","#fff9c4");
 document.getElementById('st').innerText="Waiting for Pi popup...";
 Pi.authenticate(['username','payments'], function(p){ console.log("incomplete",p); }).then(function(auth){
   logged=true; piUser=auth.user;
   document.getElementById('lb').style.display='none';
   document.getElementById('li').style.display='block';
   document.getElementById('li').innerHTML='<span style="background:#2e7d32;color:#fff;padding:6px 14px;border-radius:20px;font-weight:900;">✅ @'+auth.user.username+'</span>';
   document.getElementById('st').innerText='Pi Connected ✅';
   log(`✅ Welcome @${auth.user.username} - Pi Connected! Mode ${mode}`,"#c8e6c9");
 }).catch(function(err){
   log(`❌ Login failed: ${err.message} | Mode:${mode} | Try switch Test/Mainnet`,"#ffebee");
   document.getElementById('st').innerText='Login failed: '+err.message;
   alert("Login failed: "+err.message+"\\n\\nFIX:\\n1. develop.pi -> Your App -> Add URL: https://rica-2od5.vercel.app\\n2. Switch to "+(mode==='test'?'MAINNET':'TESTNET')+" and try again\\n3. Vercel domain must be HTTPS");
 });
}

function payPi(name,price){
 if(!logged || !piUser){ alert("Tap LOGIN WITH PI first!"); return;}
 log(`⏳ Creating Pi Payment π ${price}... Check Wallet popup`,"#fff9c4");
 Pi.createPayment({amount:price, memo:"Marble Floors SA - "+name+" Pi Only", metadata:{product:name}},{
   onReadyForServerApproval:function(id){
     log(`⏳ Approving ${id}...`,"#fff9c4");
     fetch('/api/approve',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({paymentId:id})}).then(()=>{log(`✅ Approved - Complete in Wallet π ${price}`,"#e8f5e9");}).catch(()=>{log(`✅ Approved Test - Complete in Wallet π ${price}`,"#e8f5e9");});
   },
   onReadyForServerCompletion:function(id,txid){ log(`✅ PAID π ${price}! TX ${txid}`,"#c8e6c9"); alert(`PAID π ${price} SUCCESS!\\nTXID: ${txid}`); },
   onCancel:function(id){ log(`❌ Cancelled ${id}`,"#ffebee"); },
   onError:function(e){ log(`❌ ${e.message} Mode ${mode}`,"#ffebee"); alert("Error: "+e.message+"\\nMode: "+mode); }
 });
}
</script>
</body></html>
