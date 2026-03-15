export default function MetricCard({title,value,icon,color}){

return(

<div className="glass-card flex justify-between items-center card-hover">

<div>

<p className="text-gray-500 text-sm">{title}</p>

<h2 className="text-3xl font-semibold mt-1">
{value}
</h2>

</div>

<div className={`text-3xl ${color}`}>
{icon}
</div>

</div>

)
}