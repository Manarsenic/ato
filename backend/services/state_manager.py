# backend/services/state_manager.py

account_state = {}
otp_state = {}

def lock_account(user_id, reason):
    account_state[user_id] = {
        "status": "LOCKED",
        "reason": reason
    }

def unlock_account(user_id):
    if user_id in account_state:
        account_state[user_id]["status"] = "ACTIVE"

def is_locked(user_id):
    return account_state.get(user_id, {}).get("status") == "LOCKED"

def get_lock_reason(user_id):
    return account_state.get(user_id, {}).get("reason", "")

def trigger_otp(user_id):
    otp_state[user_id] = True

def is_otp_required(user_id):
    return otp_state.get(user_id, False)

def clear_otp(user_id):
    otp_state[user_id] = False