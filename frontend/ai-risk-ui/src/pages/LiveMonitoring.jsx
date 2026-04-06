import { useEffect,useState } from "react"
import axios from "axios"

export default function LiveMonitoring(){

const [logs,setLogs] = useState([])
const [lastUpdated,setLastUpdated] = useState("")

const fetchData = async ()=>{

try{

const res = await axios.get("https://ato-22wq.onrender.com/accounts")

setLogs(res.data.accounts.slice(0,20))

setLastUpdated(new Date().toLocaleTimeString())

}catch(e){
console.log("Monitoring error",e)
}

}

useEffect(()=>{

fetchData()

const interval = setInterval(fetchData,5000)

return ()=>clearInterval(interval)

},[])

const getRiskClass = risk =>{

if(risk>=0.8) return "bg-red-500"
if(risk>=0.5) return "bg-yellow-500"
return "bg-green-500"

}

return(

<div className="page p-8">

<h1 className="text-3xl font-bold mb-4">
Live Transaction Monitoring
</h1>

<p className="text-sm text-gray-500 mb-6">
Last updated: {lastUpdated}
</p>

<div className="glass p-6">

<table className="w-full">

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

{logs.map((log,i)=>(

<tr key={i}>

<td>{log.user}</td>
<td>{log.action}</td>
<td>₹{log.amount?.toLocaleString("en-IN")}</td>
<td>{log.city}</td>
<td>{log.device}</td>

<td>

<span
className={`${getRiskClass(log.risk_score)} text-white px-2 py-1 rounded`}
>

{log.risk_score.toFixed(2)}

</span>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}