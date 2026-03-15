import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts"

function FraudChart({ accounts }) {

  const fraudCount = accounts.filter(a => a.prediction === "fraud").length
  const normalCount = accounts.filter(a => a.prediction === "normal").length

  const data = [
    { name: "Fraud", value: fraudCount },
    { name: "Normal", value: normalCount }
  ]

  const COLORS = ["#ef4444", "#22c55e"]

  return (

    <div className="glass">

      <h3 style={{marginBottom:"10px"}}>Fraud Distribution</h3>

      <PieChart width={350} height={250}>

        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
        >

          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}

        </Pie>

        <Tooltip />
        <Legend />

      </PieChart>

    </div>

  )

}

export default FraudChart