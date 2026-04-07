import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const nav = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [otpRequired, setOtpRequired] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      // 🔐 OTP FLOW
      if (otpRequired) {
        const res = await API.post("/verify_otp", {
          user,
          otp
        });

        if (res.data.success) {
          localStorage.setItem("user_id", user);
          nav("/user");
        } else {
          alert("Invalid OTP");
        }

        setLoading(false);
        return;
      }

      const res = await API.post("/login", {
        user,
        password: pass,
      });

      const data = res.data;

      if (!data.success && data.message === "Account locked") {
        alert(`🔒 Account locked\nReason: ${data.reason}`);
        setLoading(false);
        return;
      }

      if (!data.success && data.message === "OTP required") {
        setOtpRequired(true);
        setLoading(false);
        return;
      }

      if (!data.success) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      if (data.role === "admin") {
        nav("/admin");
      } else {
        localStorage.setItem("user_id", user);
        nav("/user");
      }

    } catch (e) {
      alert("Server error");
    }

    setLoading(false);
  }

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleLogin}>

        <h2>AI Risk</h2>

        <p className="login-sub">
          Account Security Intelligence Platform
        </p>

        <input
          className="login-input"
          placeholder="User ID"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          autoFocus
        />

        {!otpRequired && (
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        )}

        {otpRequired && (
          <input
            className="login-input"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Processing..." : otpRequired ? "Verify OTP" : "Sign In"}
        </button>

        <div className="demo">
          Admin → admin/admin123 <br />
          Users → any user id + password user123
        </div>

      </form>
    </div>
  );
}