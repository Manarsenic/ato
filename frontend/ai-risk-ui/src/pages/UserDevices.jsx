import { Link } from "react-router-dom"

function UserDevices(){

const devices=[
{name:"Chrome - Windows",location:"Mumbai"},
{name:"Safari - iPhone",location:"Delhi"}
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
My Devices
</h1>

<div className="glass rounded-2xl p-6">

{devices.map((d,i)=>(
<div key={i} className="border-b py-4">

<p className="font-semibold">
{d.name}
</p>

<p className="text-gray-500 text-sm">
{d.location}
</p>

</div>
))}

</div>

</div>

)

}

export default UserDevices