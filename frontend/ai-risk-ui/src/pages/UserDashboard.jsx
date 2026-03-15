import { useEffect, useState } from "react"
import axios from "axios"
import RiskCard from "../components/RiskCard"

export default function UserDashboard(){

const [activity,setActivity] = useState([])

useEffect(()=>{

axios.get("http://127.0.0.1:8000/accounts")
.then(res=>{
setActivity(res.data.accounts.slice(0,3))
})

},[])

return(

<div className="page">

<h1 className="text-3xl font-semibold mb-8">
Account Security Overview
</h1>

<div className="metrics-grid">

<RiskCard title="Risk Score" value="0.82"/>
<RiskCard title="Last Login Location" value="Mumbai"/>
<RiskCard title="Device" value="Android"/>
<RiskCard title="Account Status" value="SAFE"/>

</div>

<div className="glass section">

<h2 className="text-xl mb-4">
Recent Login Activity
</h2>

<ul>

{activity.map((a,i)=>(
<li key={i}>
{a.city} — {a.device} — ${a.amount}
</li>
))}

</ul>

</div>

</div>

)

}