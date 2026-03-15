import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login(){

const nav = useNavigate()

const [user,setUser] = useState("")
const [pass,setPass] = useState("")

function handleLogin(){

if(user==="admin" && pass==="admin123"){
nav("/admin")
}

else if(user==="user" && pass==="user123"){
nav("/user")
}

else{
alert("Invalid credentials")
}

}

return(

<div className="login-wrapper">

<div className="login-card">

<h2>AI Risk</h2>

<p className="login-sub">
Account Security Intelligence Platform
</p>

<input
className="login-input"
placeholder="Username"
value={user}
onChange={e=>setUser(e.target.value)}
/>

<input
className="login-input"
type="password"
placeholder="Password"
value={pass}
onChange={e=>setPass(e.target.value)}
/>

<button className="login-btn" onClick={handleLogin}>
Sign In
</button>

<div className="demo">
Admin → admin / admin123  
User → user / user123
</div>

</div>

</div>

)

}