import { Link } from "react-router-dom"

function UserSecurity(){

const alerts = [
{type:"New Device Login",time:"2 hours ago"},
{type:"Password Change",time:"1 day ago"}
]

return(

<div className="p-10">

<Link
to="/user"
className="text-blue-500 hover:underline"
>
← Back to Dashboard
</Link>

<h1
className="text-3xl mt-4 mb-6"
style={{fontFamily:"Sora"}}
>
Security Alerts
</h1>

<div className="glass rounded-2xl p-6">

{alerts.map((a,i)=>(
<div key={i} className="border-b py-4">

<p className="font-semibold">
{a.type}
</p>

<p className="text-gray-500 text-sm">
{a.time}
</p>

</div>
))}

</div>

</div>

)

}

export default UserSecurity