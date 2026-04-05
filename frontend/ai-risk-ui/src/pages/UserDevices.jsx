import { useEffect, useState } from "react"
import axios from "axios"

export default function UserDevices(){

  const [data,setData] = useState([])

  const userId = localStorage.getItem("user_id")

  useEffect(()=>{

    axios
      .get(`http://127.0.0.1:8000/accounts/${userId}`)
      .then(res=>{
        setData(res.data.accounts)
      })

  },[])

  return(

    <div className="page">

      <h1 className="text-3xl font-semibold mb-8">
        Login History
      </h1>

      <div className="glass section">

        <table className="w-full">

          <thead>

            <tr className="text-left">
              <th>City</th>
              <th>Device</th>
              <th>Amount</th>
              <th>Risk Score</th>
            </tr>

          </thead>

          <tbody>

            {data.map((d,i)=>(

              <tr key={i}>

                <td>{d.city}</td>
                <td>{d.device}</td>
                <td>${d.amount}</td>
                <td>{d.risk_score.toFixed(2)}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}