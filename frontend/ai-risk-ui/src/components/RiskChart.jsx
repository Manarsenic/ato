import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
ResponsiveContainer
} from "recharts"

export default function RiskChart({ data }) {

if(!data || data.length === 0){
return (
<div style={{height:300,display:"flex",alignItems:"center",justifyContent:"center"}}>
No data available for chart
</div>
)
}

const chartData = data.map((d,i)=>({
index:i+1,
risk:d.risk_score ?? 0
}))

return(

<div style={{width:"100%",height:300}}>

<ResponsiveContainer>

<LineChart data={chartData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="index"/>

<YAxis domain={[0,1]}/>

<Tooltip/>

<Line
type="monotone"
dataKey="risk"
stroke="#6366f1"
strokeWidth={3}
dot={{r:4}}
/>

</LineChart>

</ResponsiveContainer>

</div>

)

}