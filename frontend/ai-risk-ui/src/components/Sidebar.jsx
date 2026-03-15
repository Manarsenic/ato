import { NavLink } from "react-router-dom"

export default function Sidebar(){

return(

<div className="sidebar">

<h2 className="logo">
AI Risk
</h2>

<nav className="menu">

<NavLink to="/admin">Dashboard</NavLink>

<NavLink to="/admin/live">Live Monitoring</NavLink>

<NavLink to="/admin/alerts">Fraud Alerts</NavLink>

<NavLink to="/admin/analytics">Analytics</NavLink>

</nav>

</div>

)

}