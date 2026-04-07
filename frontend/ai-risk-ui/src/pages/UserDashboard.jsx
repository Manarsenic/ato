import { useEffect, useState } from "react"
import axios from "axios"
import RiskCard from "../components/RiskCard"
import RiskChart from "../components/RiskChart"

export default function UserDashboard(){

const [activity,setActivity] = useState([])
const [alerts,setAlerts] = useState([])
const [risk,setRisk] = useState(0)
const [city,setCity] = useState("Unknown")
const [device,setDevice] = useState("Unknown")
const [loading,setLoading] = useState(true)

const userId = localStorage.getItem("user_id")

useEffect(()=>{

async function fetchData(){

try{
const res = await axios.get(`https://ato-22wq.onrender.com/accounts/${userId}`)
const data = res.data.accounts || []

setActivity(data.slice(0,10))

if(data.length > 0){
setRisk(data[0].risk_score)
setCity(data[0].city)
setDevice(data[0].device)
}
}catch(e){
console.log("Accounts error",e)
}

try{
const al = await axios.get(`https://ato-22wq.onrender.com/alerts/${userId}`)
setAlerts(al.data.alerts || [])
}catch(e){
console.log("Alerts error",e)
}

setLoading(false)
}

fetchData()

},[userId])

if(loading){
return <div className="page p-10">Loading dashboard...</div>
}

const riskColor =
risk < 0.3 ? "text-green-500" :
risk < 0.7 ? "text-yellow-500" :
"text-red-500"

const riskStatus =
risk < 0.40 ? "SAFE" :
risk < 0.7 ? "MEDIUM RISK" :
risk <0.90 ? "HIGH RISK" :
"CRITICAL RISK"

return(

<div className="page p-8 space-y-8">

<h1 className="text-3xl font-bold">
Account Security Overview
</h1>

<p className="text-gray-500">
User ID: <span className="font-semibold text-blue-500">{userId}</span>
</p>

{/* METRICS */}
<div className="grid grid-cols-4 gap-6">

<RiskCard title="Risk Score" value={risk.toFixed(2)} />
<RiskCard title="Last Login" value={city} />
<RiskCard title="Device" value={device} />

<RiskCard
title="Status"
value={<span className={riskColor}>{riskStatus}</span>}
/>

</div>

{/* ACTIVITY + ALERTS */}
<div className="grid grid-cols-2 gap-8">

<div className="glass p-6">
<h2 className="text-xl mb-4">Recent Login Activity</h2>

{activity.length === 0 ? (
<p>No activity</p>
) : (
<ul>
{activity.map((a,i)=>(
<li key={i}>
{a.city} — {a.device} — ₹{a.amount.toLocaleString("en-IN")}
</li>
))}
</ul>
)}
</div>

<div className="glass p-6">
<h2 className="text-xl mb-4">Security Alerts</h2>

{alerts.length === 0 ? (
<p className="text-green-500">✔ No alerts detected</p>
) : (
alerts.map((a,i)=>(
<div key={i} className="bg-red-50 border-l-4 border-red-500 p-3 mb-3 rounded">

<div className="text-red-600 font-semibold">
⚠ Security Alert
</div>

<div className="text-sm text-gray-700">
{a.message}
</div>

<div className="text-xs text-gray-400 mt-1">
{a.timestamp || "No timestamp"}
</div>

</div>
))
)}
</div>

</div>

{/* RISK CHART */}
<div className="glass p-6">
<h2 className="text-xl mb-4">Risk Timeline</h2>
<RiskChart data={activity}/>
</div>

{/* QUICK ACTIONS */}
<div className="glass p-6">

<h2 className="text-xl mb-4">Quick Security Actions</h2>

<div className="flex gap-4">




{/* 🚨 REPORT */}
<button
className="bg-yellow-500 px-4 py-2 rounded text-black"
onClick={async ()=>{

try{
await axios.post("https://ato-22wq.onrender.com/send_alert",{
user: userId,
message: "User reported suspicious activity"
})

alert("Reported to admin")

}catch(e){
alert("Report failed")
}

}}
>
Report Suspicious Activity
</button>


{/* API */}
<button
className="bg-blue-500 px-4 py-2 rounded"
onClick={()=>window.open("https://ato-22wq.onrender.com/docs")}
>
Security API
</button>

</div>

</div>

</div>

)

}