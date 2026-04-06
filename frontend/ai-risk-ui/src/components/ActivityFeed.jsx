import { useEffect, useState } from "react"
import axios from "axios"

export default function ActivityFeed(){

const [data,setData] = useState([])

useEffect(()=>{

axios.get("https://ato-22wq.onrender.com/accounts")
.then(res=>{
setData(res.data.accounts.slice(0,10))
})

},[])

return (

<div className="bg-white/10 p-6 rounded-xl">

<h3 className="font-bold mb-4">
Recent Activity
</h3>

<ul className="space-y-3">

{data.map((item, i) => (

<li key={i} className="border-b border-white/10 pb-2">

<span className="font-semibold">
{item.user}
</span>

{" "}performed{" "}

<span className="text-blue-400">
{item.action}
</span>

{" "}of ${item.amount}

</li>

))}

</ul>

</div>

)

}