import os
import pandas as pd
import re
from fastapi import APIRouter, Body

from services.state_manager import (
    is_locked,
    get_lock_reason,
    is_otp_required
)

router = APIRouter()

# -------- LOAD DATA --------

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATA_PATH = os.path.join(BASE_DIR, "data", "siem_logs_sample_1000.csv")

df = pd.read_csv(DATA_PATH, header=None)

log_pattern = {
    "user": r"USER=([^\s]+)",
    "action": r"ACTION=([^\s]+)",
    "amount": r"AMOUNT=([^\s]+)",
    "city": r"CITY=([^\s]+)",
    "device": r"DEVICE=([^\s]+)"
}


def extract_value(pattern, text):
    match = re.search(pattern, text)
    return match.group(1) if match else "unknown"


# -------- 🔐 LOGIN API --------

@router.post("/login")
def login(data: dict = Body(...)):

    user = data.get("user")
    password = data.get("password")

    # Admin login
    if user == "admin" and password == "admin123":
        return {"success": True, "role": "admin"}

    # Invalid credentials
    if password != "user123":
        return {"success": False, "message": "Invalid credentials"}

    # 🔒 LOCK CHECK
    if is_locked(user):
        return {
            "success": False,
            "message": "Account locked",
            "reason": get_lock_reason(user)
        }

    # 🔐 OTP CHECK
    if is_otp_required(user):
        return {
            "success": False,
            "message": "OTP required"
        }

    return {"success": True, "role": "user"}


# -------- ACCOUNT ACTIVITY --------

@router.get("/accounts")
def get_accounts():

    results = []

    for _, row in df.iterrows():

        log = str(row[0])

        user = extract_value(log_pattern["user"], log)
        action = extract_value(log_pattern["action"], log)
        amount = extract_value(log_pattern["amount"], log)
        city = extract_value(log_pattern["city"], log)
        device = extract_value(log_pattern["device"], log)

        try:
            amount = float(amount)
        except:
            amount = 0

        risk_score = min(amount / 200000, 1)
        prediction = "fraud" if risk_score > 0.7 else "normal"

        results.append({
            "user": user,
            "action": action,
            "amount": amount,
            "city": city,
            "device": device,
            "risk_score": risk_score,
            "prediction": prediction,

            # 🔥 NEW FLAGS (for UI polish)
            "locked": is_locked(user),
            "otp_required": is_otp_required(user)
        })

    return {"accounts": results}


# -------- ADMIN DASHBOARD STATS --------

@router.get("/stats")
def get_stats():

    total_transactions = len(df)

    frauds = 0
    risk_sum = 0
    alerts = 0

    for _, row in df.iterrows():

        log = str(row[0])
        amount = extract_value(log_pattern["amount"], log)

        try:
            amount = float(amount)
        except:
            amount = 0

        risk = min(amount / 200000, 1)
        risk_sum += risk

        if risk > 0.7:
            frauds += 1
            alerts += 1

    avg_risk = risk_sum / total_transactions

    return {
        "total_transactions": total_transactions,
        "frauds": frauds,
        "avg_risk": avg_risk,
        "alerts": alerts
    }


# -------- USER ACTIVITY --------

@router.get("/accounts/{user_id}")
def get_user_activity(user_id: str):

    results = []

    for _, row in df.iterrows():

        log = str(row[0])
        user = extract_value(log_pattern["user"], log)

        if user != user_id:
            continue

        action = extract_value(log_pattern["action"], log)
        amount = extract_value(log_pattern["amount"], log)
        city = extract_value(log_pattern["city"], log)
        device = extract_value(log_pattern["device"], log)

        try:
            amount = float(amount)
        except:
            amount = 0

        risk_score = min(amount / 200000, 1)
        prediction = "fraud" if risk_score > 0.7 else "normal"

        results.append({
            "user": user,
            "action": action,
            "amount": amount,
            "city": city,
            "device": device,
            "risk_score": risk_score,
            "prediction": prediction,

            # 🔥 ALSO ADD HERE
            "locked": is_locked(user),
            "otp_required": is_otp_required(user)
        })

    return {"accounts": results}


# -------- RISK TIMELINE --------

@router.get("/risk_timeline/{user_id}")
def risk_timeline(user_id: str):

    timeline = []

    for _, row in df.iterrows():

        log = str(row[0])
        user = extract_value(log_pattern["user"], log)

        if user != user_id:
            continue

        amount = extract_value(log_pattern["amount"], log)

        try:
            amount = float(amount)
        except:
            amount = 0

        risk = min(amount / 200000, 1)

        timeline.append({
            "risk": risk
        })

    return {"timeline": timeline}
from services.state_manager import clear_otp

from services.state_manager import clear_otp

@router.post("/verify_otp")
def verify_otp(data: dict):
    user = data.get("user")
    otp = data.get("otp")

    if otp == "123456":
        clear_otp(user)
        return {"success": True}

    return {"success": False}