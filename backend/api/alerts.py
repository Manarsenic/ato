from fastapi import APIRouter
import json
import os

from backend.services.state_manager import (
    lock_account,
    trigger_otp
)

router = APIRouter()

ALERT_FILE = "alerts.json"

if not os.path.exists(ALERT_FILE):
    with open(ALERT_FILE,"w") as f:
        json.dump([],f)


from datetime import datetime

@router.post("/send_alert")
def send_alert(data:dict):

    with open(ALERT_FILE,"r") as f:
        alerts = json.load(f)

    # ✅ ADD TIMESTAMP
    data["timestamp"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    alerts.append(data)

    with open(ALERT_FILE,"w") as f:
        json.dump(alerts,f)

    return {"status":"alert sent"}


@router.get("/alerts/{user}")
def get_alerts(user:str):

    with open(ALERT_FILE,"r") as f:
        alerts = json.load(f)

    user_alerts = [a for a in alerts if a["user"]==user]

    return {"alerts":user_alerts}


# 🔥 NEW ENDPOINTS

@router.post("/lock_account")
def api_lock(data: dict):
    user = data["user"]
    reason = data.get("reason","Suspicious activity")
    lock_account(user, reason)
    return {"status": "locked", "user": user}


@router.post("/trigger_otp")
def api_otp(data: dict):
    user = data["user"]
    trigger_otp(user)
    return {"status": "otp_required", "user": user}
from backend.services.state_manager import unlock_account, clear_otp

@router.post("/unlock_account")
def api_unlock(data: dict):
    user = data["user"]

    unlock_account(user)
    clear_otp(user)   # 🔥 IMPORTANT FIX

    return {"status": "unlocked", "user": user}