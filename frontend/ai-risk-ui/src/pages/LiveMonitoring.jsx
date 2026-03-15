import { useEffect, useState } from "react"
import axios from "axios"

export default function LiveMonitoring(){

const [logs,setLogs] = useState([])
const [lastUpdated,setLastUpdated] = useState("")

const fetchData = () => {

axios.get("http://127.0.0.1:8000/accounts")
.then(res=>{
setLogs(res.data.accounts.slice(0,20))
setLastUpdated(new Date().toLocaleTimeString())
})

}

useEffect(()=>{

fetchData()

const interval = setInterval(fetchData,5000)

return ()=>clearInterval(interval)

},[])



/* ---------- RISK COLOR ---------- */

const getRiskClass = (risk) => {

if(risk >= 0.8) return "risk-high"
if(risk >= 0.5) return "risk-medium"
return "risk-low"

}



return(

<div className="page">

<h1 className="text-3xl font-semibold mb-4">
Live Transaction Monitoring
</h1>

<p className="text-sm text-gray-500 mb-6">
Last updated: {lastUpdated}
</p>


<div className="glass p-6 shadow-lg">

<table className="monitor-table">

<thead>

<tr>

<th>User</th>
<th>Action</th>
<th>Amount</th>
<th>City</th>
<th>Device</th>
<th>Risk</th>

</tr>

</thead>

<tbody>

{logs.map((log,i)=>{

const riskClass = getRiskClass(log.risk_score)

return(

<tr
key={i}
className={log.risk_score > 0.8 ? "high-row" : ""}
>

<td>{log.user}</td>

<td>{log.action}</td>

<td>${log.amount}</td>

<td>{log.city}</td>

<td>{log.device}</td>

<td>

<span className={`risk-badge ${riskClass}`}>

{log.risk_score.toFixed(2)}

</span>

</td>

</tr>

)

})}

</tbody>

</table>

</div>

</div>

)

}