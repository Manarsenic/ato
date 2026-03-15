import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"

import Landing from "./pages/Landing"
import Login from "./pages/Login"

import AdminDashboard from "./pages/AdminDashboard"
import LiveMonitoring from "./pages/LiveMonitoring"
import FraudAlerts from "./pages/FraudAlerts"
import Analytics from "./pages/Analytics"
import UserDashboard from "./pages/UserDashboard"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Landing/>}/>
<Route path="/login" element={<Login/>}/>

<Route path="/admin" element={
<div
style={{
display:"flex",
background:"#f1f5f9",
minHeight:"100vh"
}}
>
<Sidebar/>
<div
style={{
flex:1,
padding:"40px",
margin:"20px",

background:"rgba(255,255,255,0.6)",
backdropFilter:"blur(18px)",
WebkitBackdropFilter:"blur(18px)",

borderRadius:"24px",

boxShadow:"0 25px 50px rgba(0,0,0,0.08)"
}}
>
<AdminDashboard/>
</div>
</div>
}/>

<Route path="/admin/live" element={<LiveMonitoring/>}/>
<Route path="/admin/alerts" element={<FraudAlerts/>}/>
<Route path="/admin/analytics" element={<Analytics/>}/>

<Route path="/user" element={<UserDashboard/>}/>

</Routes>

</BrowserRouter>

)

}

export default App