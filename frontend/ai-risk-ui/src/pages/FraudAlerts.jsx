import { useEffect, useState } from "react"
import axios from "axios"

export default function FraudAlerts(){

const [alerts,setAlerts] = useState([])
const [selected,setSelected] = useState(null)
const [lastUpdated,setLastUpdated] = useState("")
const [caseStatus,setCaseStatus] = useState("Active Alert")
const [notes,setNotes] = useState("")


/* ---------- FETCH DATA ---------- */

const fetchAlerts = async () => {

try{

const res = await axios.get("https://ato-22wq.onrender.com/accounts")

const topRisk = res.data.accounts
.filter(a => a.risk_score >= 0.75)
.sort((a,b)=> b.risk_score - a.risk_score)
.slice(0,12)

setAlerts(topRisk)

setLastUpdated(new Date().toLocaleTimeString())

// ✅ FIX: always keep correct selected user
if(topRisk.length > 0){
setSelected(prev => {
if(!prev) return topRisk[0]

// if previously selected still exists, keep it
const exists = topRisk.find(u => u.user === prev.user)
return exists || topRisk[0]
})
}

}catch(e){
console.log("Fetch error", e)
}

}

useEffect(()=>{
fetchAlerts()
const interval = setInterval(fetchAlerts,10000)
return ()=>clearInterval(interval)
},[])


/* ---------- AI RISK EXPLANATION ---------- */

const getIndicators = (txn) => {

let reasons = []

if(txn.amount > 300000)
reasons.push("Abnormally large transaction")

if(txn.action === "CASH_OUT")
reasons.push("Suspicious withdrawal pattern")

if(txn.action === "TRANSFER")
reasons.push("Potential account takeover transfer")

if(txn.risk_score > 0.95)
reasons.push("AI model confidence extremely high")

if(reasons.length === 0)
reasons.push("Behavioral anomaly detected")

return reasons

}


/* ---------- 🔥 ACTION HANDLERS (FIXED) ---------- */

const triggerOTP = async () => {

if(!selected) return alert("Select user first")

try{
await axios.post("https://ato-22wq.onrender.com/trigger_otp",{
user: selected.user
})

setCaseStatus(`OTP triggered for ${selected.user}`)

}catch(e){
alert("OTP failed")
}

}

const lockAccount = async () => {

if(!selected) return alert("Select user first")

try{
await axios.post("https://ato-22wq.onrender.com/lock_account",{
user: selected.user,
reason: "High risk transaction detected"
})

setCaseStatus(`Account locked: ${selected.user}`)

}catch(e){
alert("Lock failed")
}

}

const unlockAccount = async () => {

if(!selected) return alert("Select user first")

try{
await axios.post("https://ato-22wq.onrender.com/unlock_account",{
user: selected.user
})

setCaseStatus(`Account unlocked: ${selected.user}`)

}catch(e){
alert("Unlock failed")
}

}

const investigate = async () => {

if(!selected) return alert("Select user first")
if(!notes) return alert("Add investigation notes")

try{

await axios.post("https://ato-22wq.onrender.com/send_alert",{
user: selected.user,
message: notes
})

setCaseStatus(`Alert sent to ${selected.user}`)
setNotes("")

}catch(e){
alert("Investigation failed")
}

}


/* ---------- UI ---------- */

return(

<div className="page">

<h1 className="text-3xl font-semibold mb-1">
AI-Powered Fraud Monitoring
</h1>

<p className="text-gray-500 mb-6">
Top risk accounts • Last updated {lastUpdated}
</p>


<div className="fraud-layout">


{/* LEFT PANEL */}

<div className="fraud-list">

<h2 className="mb-4">
Real-Time Fraud Monitoring
</h2>

{alerts.map((a,i)=>(

<div
key={i}
className={`fraud-row ${selected?.user===a.user ? "active":""}`}
onClick={()=>setSelected(a)}
>

<div className="fraud-user">
<div className="flex gap-2 items-center">

<strong>{a.user}</strong>

{a.locked && (
<span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
LOCKED
</span>
)}

{a.otp_required && (
<span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded">
OTP
</span>
)}

</div>
</div>

<div className="fraud-score">
<span className="score-value">
{a.risk_score.toFixed(2)}
</span>
<span>/1.0</span>
</div>

<div className="risk-bar">
<div
className="risk-fill"
style={{width:`${a.risk_score*100}%`}}
/>
</div>

</div>

))}

</div>


{/* RIGHT PANEL */}

{selected && (

<div className="fraud-panel">

<h2>
Account Deep Dive: <span>{selected.user}</span>
</h2>

<p className="case-status">
Status: <strong>{caseStatus}</strong>
</p>

<div className="risk-circle">
<div className="circle-score">
{selected.risk_score.toFixed(2)}
</div>
</div>

<div className="account-details">
<p><strong>Action:</strong> {selected.action}</p>
<p><strong>Amount:</strong> ₹{selected.amount?.toLocaleString("en-IN")}</p>
<p><strong>City:</strong> {selected.city}</p>
<p><strong>Device:</strong> {selected.device}</p>
</div>

<h3 className="mt-4">AI Risk Explanation</h3>

<ul className="indicator-list">
{getIndicators(selected).map((r,i)=>(
<li key={i}>⚠ {r}</li>
))}
</ul>

<h3 className="mt-4">Investigation Notes</h3>

<textarea
className="investigation-notes"
placeholder="Add investigation notes..."
value={notes}
onChange={(e)=>setNotes(e.target.value)}
/>

<div className="fraud-actions">

<button className="btn-primary" onClick={triggerOTP}>
Trigger Step-Up Auth (OTP)
</button>

<button className="btn-warning" onClick={lockAccount}>
Temporary Lock Account
</button>

<button className="btn-success" onClick={unlockAccount}>
Unlock Account
</button>

<button className="btn-neutral" onClick={investigate}>
Dismiss / Investigate
</button>

</div>

</div>

)}

</div>

</div>

)

}