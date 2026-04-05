import { useNavigate } from "react-router-dom"

export default function RiskCard({ title, value, link }) {

const navigate = useNavigate()

const handleClick = () => {
if(link){
navigate(link)
}
}

return(

<div
className="glass p-5 rounded-xl shadow-md hover:scale-105 transition"
onClick={handleClick}
style={{cursor: link ? "pointer" : "default"}}
>

<h4 className="text-gray-400 text-sm mb-2">
{title}
</h4>

<p className="text-3xl font-semibold text-blue-500">
{value}
</p>

</div>

)

}