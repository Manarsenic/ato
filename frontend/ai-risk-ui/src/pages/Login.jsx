import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login(){

const nav = useNavigate()

const [user,setUser] = useState("")
const [pass,setPass] = useState("")
const [loading,setLoading] = useState(false)

async function handleLogin(){

setLoading(true)

try{

const res = await fetch("http://127.0.0.1:8000/login",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body: JSON.stringify({
user:user,
password:pass
})
})

const data = await res.json()

// 🔒 ACCOUNT LOCKED
if(!data.success && data.message === "Account locked"){
alert(
`🔒 Your account is locked\n\nReason: ${data.reason}\n\nPlease contact admin.`
)
setLoading(false)
return
}

// 🔐 OTP REQUIRED
if(!data.success && data.message === "OTP required"){
alert(
`🔐 Additional verification required\n\nPlease contact admin for access.`
)
setLoading(false)
return
}

// ❌ INVALID LOGIN
if(!data.success){
alert(data.message || "Login failed")
setLoading(false)
return
}

// ✅ SUCCESS LOGIN
if(data.role==="admin"){
nav("/admin")
}else{
localStorage.setItem("user_id", user)
nav("/user")
}

}catch(e){
alert("Server error")
}

setLoading(false)
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
placeholder="User ID"
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

<button
className="login-btn"
onClick={handleLogin}
disabled={loading}
>
{loading ? "Signing in..." : "Sign In"}
</button>

<div className="demo">
Admin → admin/admin123 <br/>
Users → any user id + password user123 <br/>
Example: user1 / user123
</div>

</div>

</div>

)

}