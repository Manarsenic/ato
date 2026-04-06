# 🚀 AnomX  
### AI-Powered Account Takeover Detection System

🔗 **Live Demo:** https://ato-kohl.vercel.app/

---

## 🧩 Overview

**AnomX** is a full-stack, AI-driven security system designed to detect and prevent **Account Takeover (ATO)** attacks. It simulates a real-world fraud detection environment by analyzing user behavior and identifying suspicious login activity in real time.

Built using modern web technologies and machine learning, AnomX demonstrates how intelligent systems can outperform traditional rule-based systems.

---

## ⚠️ Problem

Account Takeover attacks are a major threat across platforms like banking, fintech, and e-commerce.

- Compromised credentials enable unauthorized access  
- Financial loss and data breaches are common  
- Traditional rule-based systems fail against evolving attack patterns  

👉 There is a need for **adaptive and intelligent fraud detection systems**.

---

## 💡 Solution

AnomX introduces a behavior-based anomaly detection system that:

- Monitors login activity in real time  
- Assigns dynamic risk scores  
- Flags suspicious behavior instantly  
- Enables administrative intervention  

---

## ✨ Features

### 🔐 Smart Authentication
- Secure login for users and admins  
- Risk-based authentication flow  
- Account lock mechanism  
- OTP simulation for high-risk logins  

### 📊 Admin Dashboard
- System-wide activity overview  
- Fraud statistics and insights  
- Average risk score tracking  
- Real-time alert monitoring  

### 📡 Real-Time Monitoring
- Continuous tracking of user activity  
- Detection of suspicious login patterns  
- Instant updates  

### 🚨 Fraud Alerts & Controls
- Identify high-risk users  
- Lock / unlock accounts  
- Monitor flagged behavior  

### 📈 Analytics & Insights
- Risk trend visualization  
- Device usage distribution  
- City-level fraud insights  
- Interactive charts  

---

## 🧠 Machine Learning

AnomX uses anomaly detection techniques to evaluate user behavior and predict fraud risk.

**Key inputs:**
- Login frequency  
- Device patterns  
- Behavioral anomalies  

**Tools used:**
- Pandas  
- NumPy  
- Scikit-learn  

---

## 🏗 Architecture
-User (Browser)
-↓
-Frontend (React + Vite)
-↓ API Calls
-Backend (FastAPI)
-↓
-ML Model + Data Processing


---

## 🔗 API Endpoints

| Endpoint | Method | Description |
|----------|--------|------------|
| `/login` | POST | Authenticate user |
| `/accounts` | GET | Fetch account data |
| `/stats` | GET | Dashboard statistics |
| `/predict` | POST | Fraud prediction |
| `/risk_timeline/{user_id}` | GET | Risk history |
| `/send_alert` | POST | Trigger alert |

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)  
- JavaScript  
- Tailwind CSS  
- Axios  

**Backend**
- FastAPI (Python)  
- REST API  

**Machine Learning**
- Pandas  
- NumPy  
- Scikit-learn  

**Deployment**
- Vercel (Frontend)  
- Render (Backend)  

---

## ⚙️ Local Setup

### Backend
-cd backend
-pip install -r requirements.txt
-uvicorn main:app --reload


##  Demo Credentials
-Username: user1
-Password: user123


---

## 🚧 Challenges

- Handling CORS between frontend and backend  
- Managing environment-specific API configurations  
- Deploying a monorepo setup  
- Memory limitations on cloud platforms  
- Ensuring seamless frontend-backend communication  

---

## 👤 Author

**Manas Kumar**
