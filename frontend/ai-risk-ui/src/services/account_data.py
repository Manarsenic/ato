import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATA_PATH = os.path.join(BASE_DIR, "..", "data", "siem_logs_sample_1000.csv")

df = pd.read_csv(DATA_PATH)

def get_accounts(limit=200):
    return df.head(limit).to_dict(orient="records")