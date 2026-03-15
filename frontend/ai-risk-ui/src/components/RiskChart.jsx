import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

const data = [
{time:"10:00",risk:0.2},
{time:"11:00",risk:0.4},
{time:"12:00",risk:0.7},
{time:"13:00",risk:0.5},
{time:"14:00",risk:0.9},
]

function RiskChart(){

return(

<div className="glass rounded-3xl p-6 h-[300px]">

<h2
className="text-lg mb-4 font-semibold"
style={{fontFamily:"Sora"}}
>
Risk Activity
</h2>

<ResponsiveContainer width="100%" height="100%">

<LineChart data={data}>

<XAxis dataKey="time"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="risk"
stroke="#6366f1"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

)

}

export default RiskChart