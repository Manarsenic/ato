import { useEffect, useState } from "react"
import axios from "axios"

export default function FraudAlerts(){

const [alerts,setAlerts] = useState([])
const [selected,setSelected] = useState(null)
const [lastUpdated,setLastUpdated] = useState("")
const [caseStatus,setCaseStatus] = useState("Active Alert")
const [notes,setNotes] = useState("")

/* ---------- FETCH DATA ---------- */

const fetchAlerts = () => {

axios.get("http://127.0.0.1:8000/accounts")
.then(res => {

const topRisk = res.data.accounts
.filter(a => a.risk_score >= 0.75)
.sort((a,b)=> b.risk_score - a.risk_score)
.slice(0,12)

setAlerts(topRisk)

setLastUpdated(new Date().toLocaleTimeString())

if(!selected && topRisk.length > 0){
setSelected(topRisk[0])
}

})

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


/* ---------- ACTION HANDLERS ---------- */

const triggerOTP = () => {
setCaseStatus("Step-Up Authentication Triggered")
}

const lockAccount = () => {
setCaseStatus("Account Temporarily Locked")
}

const investigate = () => {
setCaseStatus("Under Investigation")
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

{alerts.map((a,i)=>{

return(

<div
key={i}
className={`fraud-row ${selected?.user===a.user ? "active":""}`}
onClick={()=>setSelected(a)}
>

<div className="fraud-user">
<strong>{a.user}</strong>
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

)

})}

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


{/* Risk Score Circle */}

<div className="risk-circle">

<div className="circle-score">
{selected.risk_score.toFixed(2)}
</div>

</div>


{/* Account Info */}

<div className="account-details">

<p><strong>Action:</strong> {selected.action}</p>

<p><strong>Amount:</strong> ${selected.amount?.toLocaleString()}</p>

<p><strong>City:</strong> {selected.city}</p>

<p><strong>Device:</strong> {selected.device || "Mobile Device"}</p>

<p><strong>Transaction Type:</strong> {selected.transaction_type || "Financial Event"}</p>

</div>


{/* AI EXPLANATION */}

<h3 className="mt-4">AI Risk Explanation</h3>

<ul className="indicator-list">

{getIndicators(selected).map((r,i)=>(
<li key={i}>⚠ {r}</li>
))}

</ul>


{/* INVESTIGATION NOTES */}

<h3 className="mt-4">Investigation Notes</h3>

<textarea
className="investigation-notes"
placeholder="Add investigation notes..."
value={notes}
onChange={(e)=>setNotes(e.target.value)}
/>


{/* ACTION BUTTONS */}

<div className="fraud-actions">

<button
className="btn-primary"
onClick={triggerOTP}
>
Trigger Step-Up Auth (OTP)
</button>

<button
className="btn-warning"
onClick={lockAccount}
>
Temporary Lock Account
</button>

<button
className="btn-neutral"
onClick={investigate}
>
Dismiss / Investigate
</button>

</div>

</div>

)}

</div>

</div>

)

}