import { useEffect, useState } from "react"
import axios from "axios"
import {
LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
PieChart, Pie, Cell, BarChart, Bar, Legend
} from "recharts"

export default function AdminDashboard(){

const [stats,setStats] = useState({})
const [transactions,setTransactions] = useState([])
const [loading,setLoading] = useState(true)

// 🔍 SEARCH STATE
const [searchUser,setSearchUser] = useState("")
const [selectedUser,setSelectedUser] = useState(null)

// 📩 ALERT STATE
const [alertMsg,setAlertMsg] = useState("")

useEffect(()=>{

async function loadData(){

try{
const statsRes = await axios.get("http://127.0.0.1:8000/stats")
setStats(statsRes.data)

const txRes = await axios.get("http://127.0.0.1:8000/accounts")
setTransactions(txRes.data.accounts)
}catch(e){
console.log("Load error",e)
}

setLoading(false)

}

loadData()

},[])


// 🔍 SEARCH USER
function handleSearch(){

if(!searchUser){
alert("Enter User ID")
return
}

const found = transactions.find(t => t.user === searchUser)

if(!found){
alert("User not found")
setSelectedUser(null)
return
}

setSelectedUser(found)
}


// 🔥 ACTIONS
const lockUser = async () => {
try{
await axios.post("http://127.0.0.1:8000/lock_account",{
user: selectedUser.user,
reason:"Admin manual lock"
})
alert("User locked")
}catch{
alert("Lock failed")
}
}

const unlockUser = async () => {
try{
await axios.post("http://127.0.0.1:8000/unlock_account",{
user: selectedUser.user
})
alert("User unlocked")
}catch{
alert("Unlock failed")
}
}

const triggerOTP = async () => {
try{
await axios.post("http://127.0.0.1:8000/trigger_otp",{
user: selectedUser.user
})
alert("OTP triggered")
}catch{
alert("OTP failed")
}
}


// 📩 SEND ALERT
const sendAlert = async () => {

if(!selectedUser){
alert("Search user first")
return
}

if(!alertMsg){
alert("Enter message")
return
}

try{

await axios.post("http://127.0.0.1:8000/send_alert",{
user: selectedUser.user,
message: alertMsg,
timestamp: new Date().toLocaleString()
})

alert("Alert sent")
setAlertMsg("")

}catch{
alert("Failed to send alert")
}

}


// ----------------- DATA -----------------

const COLORS = ["#6366f1","#22c55e","#f59e0b","#ef4444"]

const riskTrend = transactions.slice(0,30).map((t,i)=>({
time:i,
risk:t.risk_score
}))

const deviceCount = {}
transactions.forEach(t=>{
deviceCount[t.device] = (deviceCount[t.device] || 0) + 1
})

const deviceData = Object.keys(deviceCount).map(d=>({
device:d,
value:deviceCount[d]
}))

const cityFraud = {}
transactions.forEach(t=>{
if(t.risk_score>0.7){
cityFraud[t.city] = (cityFraud[t.city] || 0) + 1
}
})

const cityData = Object.keys(cityFraud).map(c=>({
city:c,
fraud:cityFraud[c]
}))


// ----------------- UI -----------------

if(loading){
return <div className="page p-10">Loading dashboard...</div>
}

return(

<div className="page p-8">

<h1 className="text-3xl font-bold mb-6">
Admin Security Dashboard
</h1>


{/* METRICS */}
<div className="metrics-grid">

<div className="glass metric">
<span>Total Transactions</span>
<b>{stats.total_transactions}</b>
</div>

<div className="glass metric">
<span>Fraud Detected</span>
<b>{stats.frauds}</b>
</div>

<div className="glass metric">
<span>Average Risk</span>
<b>{stats.avg_risk?.toFixed(2)}</b>
</div>

<div className="glass metric">
<span>Active Alerts</span>
<b>{stats.alerts}</b>
</div>

</div>


{/* 🔍 SEARCH + CONTROL PANEL */}
<div className="glass p-6 mt-8">

<h3 className="font-bold mb-4">
Search & Manage User
</h3>

<div className="flex gap-4 mb-4">

<input
placeholder="Enter User ID"
value={searchUser}
onChange={e=>setSearchUser(e.target.value)}
className="p-2 rounded w-full"
/>

<button
className="bg-blue-500 px-4 py-2 rounded"
onClick={handleSearch}
>
Search
</button>

</div>


{selectedUser && (

<div className="mt-4">

<p><strong>User:</strong> {selectedUser.user}</p>
<p><strong>City:</strong> {selectedUser.city}</p>
<p><strong>Device:</strong> {selectedUser.device}</p>
<p><strong>Amount:</strong> ₹{selectedUser.amount.toLocaleString("en-IN")}</p>
<p><strong>Risk:</strong> {selectedUser.risk_score.toFixed(2)}</p>


{/* ACTION BUTTONS */}
<div className="flex gap-4 mt-4">

<button className="bg-red-500 px-4 py-2 rounded" onClick={lockUser}>
Lock
</button>

<button className="bg-green-500 px-4 py-2 rounded" onClick={unlockUser}>
Unlock
</button>

<button className="bg-yellow-500 px-4 py-2 rounded" onClick={triggerOTP}>
Trigger OTP
</button>

</div>


{/* 📩 SEND ALERT */}
<div className="mt-6">

<h4 className="font-semibold mb-2">
Send Alert
</h4>

<textarea
placeholder="Enter alert message..."
value={alertMsg}
onChange={(e)=>setAlertMsg(e.target.value)}
className="p-2 rounded w-full mb-3"
/>

<button
className="bg-red-500 px-4 py-2 rounded"
onClick={sendAlert}
>
Send Alert
</button>

</div>

</div>

)}

</div>


{/* DASHBOARD VISUALS */}
<div className="grid grid-cols-2 gap-8 mt-8">

<div className="glass p-6">
<h3 className="font-bold mb-4">Risk Trend</h3>

<ResponsiveContainer width="100%" height={260}>
<LineChart data={riskTrend}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="time"/>
<YAxis/>
<Tooltip/>
<Line type="monotone" dataKey="risk" stroke="#6366f1" strokeWidth={3}/>
</LineChart>
</ResponsiveContainer>

</div>


<div className="glass p-6">
<h3 className="font-bold mb-4">Device Distribution</h3>

<ResponsiveContainer width="100%" height={260}>
<PieChart>
<Pie data={deviceData} dataKey="value" nameKey="device" outerRadius={80}>
{deviceData.map((e,i)=>(
<Cell key={i} fill={COLORS[i%COLORS.length]}/>
))}
</Pie>
<Tooltip/>
<Legend/>
</PieChart>
</ResponsiveContainer>

</div>


<div className="glass p-6">
<h3 className="font-bold mb-4">Fraud by City</h3>

<ResponsiveContainer width="100%" height={260}>
<BarChart data={cityData}>
<CartesianGrid strokeDasharray="3 3"/>
<XAxis dataKey="city"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="fraud" fill="#ef4444"/>
</BarChart>
</ResponsiveContainer>

</div>

</div>

</div>

)
}