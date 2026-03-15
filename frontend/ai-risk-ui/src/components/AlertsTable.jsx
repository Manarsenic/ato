import toast from "react-hot-toast"

function AlertsTable(){

const alerts = [
{user:"A102",risk:0.97,status:"HIGH"},
{user:"A145",risk:0.22,status:"LOW"},
{user:"A178",risk:0.84,status:"HIGH"}
]

function lockAccount(user){

toast.success(`Account ${user} locked`)

}

return(

<div className="glass rounded-2xl p-6">

<h2
className="text-lg font-semibold mb-6"
style={{fontFamily:"Sora"}}
>
Fraud Alerts
</h2>

<table className="w-full">

<thead className="text-gray-500">
<tr>
<th className="text-left">Account</th>
<th>Risk</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{alerts.map((a,i)=>(

<tr key={i} className="border-t">

<td className="py-4">{a.user}</td>

<td className="text-center">
{a.risk}
</td>

<td className="text-center">

<span
className={
a.status==="HIGH"
?"text-red-500 font-semibold"
:"text-green-500"
}
>
{a.status}
</span>

</td>

<td className="text-center">

<button
onClick={()=>lockAccount(a.user)}
className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
>

Lock

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default AlertsTable