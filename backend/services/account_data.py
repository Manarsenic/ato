import pandas as pd
import os
import re

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATA_PATH = os.path.join(BASE_DIR, "..", "data", "siem_logs_sample_1000.csv")

df = pd.read_csv(DATA_PATH)


def parse_log(log):

    user = re.search(r'USER=(\S+)', log)
    action = re.search(r'ACTION=(\S+)', log)
    amount = re.search(r'AMOUNT=([\d.]+)', log)
    device = re.search(r'DEVICE=(\S+)', log)
    city = re.search(r'CITY=(\S+)', log)

    return {
        "user": user.group(1) if user else "",
        "action": action.group(1) if action else "",
        "amount": float(amount.group(1)) if amount else 0,
        "device": device.group(1) if device else "",
        "city": city.group(1) if city else ""
    }


def get_accounts(limit=200):

    rows = df.head(limit)

    parsed = []

    for _, row in rows.iterrows():   # ✅ correct way to loop rows
        parsed.append(parse_log(row["raw_log"]))

    return parsed