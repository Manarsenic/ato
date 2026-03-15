import { useEffect, useState } from "react"
import axios from "axios"

import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer,
PieChart,
Pie,
Cell,
BarChart,
Bar,
Legend
} from "recharts"

export default function AdminDashboard(){

const [stats,setStats] = useState({
total_transactions:0,
frauds:0,
avg_risk:0,
alerts:0
})

const [transactions,setTransactions] = useState([])

useEffect(()=>{

axios.get("http://127.0.0.1:8000/stats")
.then(res=>setStats(res.data))

axios.get("http://127.0.0.1:8000/accounts")
.then(res=>setTransactions(res.data.accounts))

},[])

/* ---------- COLOR PALETTE ---------- */

const COLORS = ["#6366f1","#22c55e","#f59e0b","#ef4444"]

/* ---------- RISK TREND DATA ---------- */

const riskTrend = transactions.slice(0,20).map((t,i)=>({
time:i,
risk:t.risk_score
}))

/* ---------- DEVICE DATA ---------- */

const deviceCount = {}

transactions.forEach(t=>{
deviceCount[t.device] = (deviceCount[t.device] || 0) + 1
})

const deviceData = Object.keys(deviceCount).map(device=>({
device:device,
value:deviceCount[device]
}))

/* ---------- CITY FRAUD DATA ---------- */

const cityFraud = {}

transactions.forEach(t=>{
if(t.risk_score > 0.7){
cityFraud[t.city] = (cityFraud[t.city] || 0) + 1
}
})

const cityData = Object.keys(cityFraud).map(city=>({
city:city,
fraud:cityFraud[city]
}))

return(

<div className="page">

{/* ---------- HEADER ---------- */}

<div style={{marginBottom:"30px"}}>

<h1 style={{
fontSize:"34px",
fontWeight:"700",
color:"#111827",
letterSpacing:"-0.5px"
}}>
Admin Security Dashboard
</h1>

<p style={{
marginTop:"6px",
color:"#6b7280",
fontSize:"15px"
}}>
Real-time monitoring of transactions, fraud detection and account security analytics.
</p>

</div>


{/* ---------- METRICS ---------- */}

<div className="metrics-grid">

<div className="glass metric">
<span className="metric-label">Total Transactions</span>
<span className="metric-value">{stats.total_transactions}</span>
</div>

<div className="glass metric">
<span className="metric-label">Fraud Detected</span>
<span className="metric-value">{stats.frauds}</span>
</div>

<div className="glass metric">
<span className="metric-label">Average Risk</span>
<span className="metric-value">{stats.avg_risk.toFixed(2)}</span>
</div>

<div className="glass metric">
<span className="metric-label">Active Alerts</span>
<span className="metric-value">{stats.alerts}</span>
</div>

</div>


{/* ---------- ANALYTICS GRID ---------- */}

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(3,1fr)",
gap:"30px",
marginTop:"40px"
}}
>


{/* ---------- RISK TREND ---------- */}

<div className="glass p-6">

<h3 className="chart-title">
Risk Trend
</h3>

<ResponsiveContainer width="100%" height={260}>

<LineChart data={riskTrend}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="time"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="risk"
stroke="#6366f1"
strokeWidth={3}
dot={{r:4}}
activeDot={{r:6}}
/>

</LineChart>

</ResponsiveContainer>

</div>


{/* ---------- DEVICE DISTRIBUTION ---------- */}

<div className="glass p-6">

<h3 className="chart-title">
Device Distribution
</h3>

<ResponsiveContainer width="100%" height={260}>

<PieChart>

<Pie
data={deviceData}
dataKey="value"
nameKey="device"
cx="50%"
cy="50%"
outerRadius={90}
label
>

{deviceData.map((entry,index)=>(
<Cell key={index} fill={COLORS[index % COLORS.length]}/>
))}

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>

</div>


{/* ---------- CITY FRAUD ---------- */}

<div className="glass p-6">

<h3 className="chart-title">
Top Fraud Cities
</h3>

<ResponsiveContainer width="100%" height={260}>

<BarChart data={cityData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="city"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="fraud"
fill="#ef4444"
radius={[6,6,0,0]}
/>

</BarChart>

</ResponsiveContainer>

</div>


</div>

</div>

)

}