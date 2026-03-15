import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Landing() {

  const nav = useNavigate();
  const [openCard,setOpenCard] = useState(null);

  const toggleCard = (i)=>{
    setOpenCard(openCard === i ? null : i);
  }

  return (
    <div className="landing">

      <div className="hero-triangle"></div>

      <div className="hero">
        <h1 className="hero-title">
          AnomX  <br />
          <span>Protecting Accounts With AI</span>
        </h1>

        <p className="hero-sub">
          Real-time fraud detection, anomaly monitoring,
          and security intelligence for financial platforms.
        </p>

        <button
          className="hero-btn"
          onClick={() => nav("/login")}
        >
          Sign In
        </button>
      </div>

      <div className="feature-grid">

        {/* CARD 1 */}

        <div
        className={`feature-card ${openCard===1 ? "active":""}`}
        onClick={()=>toggleCard(1)}
        >

          <h3>AI Fraud Detection</h3>

          <p>
          Detect account takeover attempts using behavioral analysis and machine learning.
          </p>

          <div className={`feature-extra ${openCard===1 ? "show":""}`}>
          Our AI analyzes login behavior, device fingerprint changes,
          abnormal transaction patterns and geolocation shifts to
          detect potential account takeover attempts before fraud occurs.
          </div>

        </div>


        {/* CARD 2 */}

        <div
        className={`feature-card ${openCard===2 ? "active":""}`}
        onClick={()=>toggleCard(2)}
        >

          <h3>Live Monitoring</h3>

          <p>
          Track login events, devices and suspicious transactions in real time.
          </p>

          <div className={`feature-extra ${openCard===2 ? "show":""}`}>
          Monitor authentication logs, event velocity, device switching
          and unusual login behavior in real time across all accounts
          through continuous anomaly monitoring.
          </div>

        </div>


        {/* CARD 3 */}

        <div
        className={`feature-card ${openCard===3 ? "active":""}`}
        onClick={()=>toggleCard(3)}
        >

          <h3>Risk Intelligence</h3>

          <p>
          Understand account risk through powerful analytics dashboards.
          </p>

          <div className={`feature-extra ${openCard===3 ? "show":""}`}>
          Hybrid AI risk scoring combines anomaly detection models,
          behavioral analysis and threat intelligence to produce
          a dynamic risk score for every account.
          </div>

        </div>

      </div>

    </div>
  );
}