import { useEffect, useState } from "react"
import axios from "axios"

import {
ResponsiveContainer,
PieChart,
Pie,
Cell,
Tooltip,
Legend,
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
LineChart,
Line
} from "recharts"


export default function Analytics(){

const [transactions,setTransactions] = useState([])

useEffect(()=>{

axios.get("https://ato-22wq.onrender.com/accounts")
.then(res=>setTransactions(res.data.accounts))

},[])



/* ---------- FRAUD VS NORMAL ---------- */

const fraudCount = transactions.filter(t => t.risk_score >= 0.7).length
const normalCount = transactions.length - fraudCount

const fraudData = [

{type:"Fraud", value:fraudCount},
{type:"Normal", value:normalCount}

]



/* ---------- DEVICE ANALYSIS ---------- */

const deviceMap = {}

transactions.forEach(t=>{

deviceMap[t.device] = (deviceMap[t.device] || 0) + 1

})

const deviceData = Object.keys(deviceMap).map(device=>({

device:device,
count:deviceMap[device]

}))



/* ---------- RISK TREND ---------- */

const riskTrend = transactions.slice(0,30).map((t,i)=>({

index:i,
risk:t.risk_score

}))



/* ---------- AMOUNT DISTRIBUTION ---------- */

const amountData = transactions.slice(0,30).map((t,i)=>({

index:i,
amount:t.amount

}))



/* ---------- MODEL METRICS ---------- */

const metrics = [

{name:"Accuracy", value:0.94},
{name:"Precision", value:0.91},
{name:"Recall", value:0.89},
{name:"F1 Score", value:0.90}

]



const COLORS = ["#6366f1","#22c55e","#f59e0b","#ef4444"]



return(

<div className="page">

<h1 className="text-3xl font-semibold mb-8">

Fraud Analytics & AI Insights

</h1>



{/* ---------- GRID ---------- */}

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(2,1fr)",
gap:"30px"
}}
>



{/* FRAUD VS NORMAL */}

<div className="glass p-6 shadow-lg">

<h3 className="mb-4 font-semibold">

Fraud vs Normal Transactions

</h3>

<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie

data={fraudData}

dataKey="value"

nameKey="type"

cx="50%"

cy="50%"

outerRadius={100}

label

>

{fraudData.map((entry,index)=>(

<Cell key={index} fill={COLORS[index]} />

))}

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>

</div>



{/* DEVICE ANALYSIS */}

<div className="glass p-6 shadow-lg">

<h3 className="mb-4 font-semibold">

Device Usage Analysis

</h3>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={deviceData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="device"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="count" fill="#6366f1"/>

</BarChart>

</ResponsiveContainer>

</div>



{/* RISK TREND */}

<div className="glass p-6 shadow-lg">

<h3 className="mb-4 font-semibold">

Risk Score Trend

</h3>

<ResponsiveContainer width="100%" height={300}>

<LineChart data={riskTrend}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="index"/>

<YAxis/>

<Tooltip/>

<Line

type="monotone"

dataKey="risk"

stroke="#ef4444"

strokeWidth={3}

/>

</LineChart>

</ResponsiveContainer>

</div>



{/* AMOUNT DISTRIBUTION */}

<div className="glass p-6 shadow-lg">

<h3 className="mb-4 font-semibold">

Transaction Amount Distribution

</h3>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={amountData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="index"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="amount" fill="#22c55e"/>

</BarChart>

</ResponsiveContainer>

</div>



</div>



{/* ---------- MODEL METRICS ---------- */}

<div

className="glass p-6 shadow-lg"

style={{marginTop:"40px"}}

>

<h3 className="mb-6 font-semibold">

AI Model Performance Metrics

</h3>

<div

style={{

display:"grid",

gridTemplateColumns:"repeat(4,1fr)",

gap:"20px"

}}

>

{metrics.map((m,i)=>(

<div key={i} className="metric">

<h4>{m.name}</h4>

<p style={{fontSize:"24px",fontWeight:"bold"}}>

{(m.value*100).toFixed(1)}%

</p>

</div>

))}

</div>

</div>



</div>

)

}