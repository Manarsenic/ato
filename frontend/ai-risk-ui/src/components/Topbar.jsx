import { Search, Bell } from "lucide-react"

function Topbar(){

return(

<div className="flex justify-between items-center mb-10">

<div className="flex items-center gap-4">

<div className="glass rounded-xl px-4 py-2 flex items-center gap-2">

<Search size={16}/>

<input
placeholder="Search accounts..."
className="bg-transparent outline-none"
/>

</div>

</div>

<div className="flex items-center gap-6">

<Bell size={18} className="cursor-pointer"/>

<div className="glass px-4 py-2 rounded-xl">
Admin
</div>

</div>

</div>

)

}

export default Topbar