import numpy as np
import pandas as pd
from datetime import datetime

from services.model_loader import (
    rf_model,
    xgb_model,
    autoencoder,
    preprocessor
)

from services.risk_engine import compute_risk_score


FEATURE_COLUMNS = [
    "transaction_type",
    "amount",
    "device_type",
    "os",
    "browser",
    "ip_city",
    "login_method",
    "failed_login_count",
    "is_new_device",
    "event_velocity",
    "event_hour",
    "event_day",
    "event_month"
]


def predict_risk(data: dict):
    try:
        timestamp = data.get("timestamp")
        dt = datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S")

        mapped_data = {
            "transaction_type": data.get("ACTION"),
            "amount": float(data.get("AMOUNT", 0)),
            "device_type": data.get("DEVICE"),
            "os": data.get("OS"),
            "browser": data.get("BROWSER"),
            "ip_city": data.get("CITY"),
            "login_method": data.get("LOGIN_METHOD"),
            "failed_login_count": int(data.get("FAILED_LOGINS", 0)),
            "is_new_device": int(data.get("NEW_DEVICE", 0)),
            "event_velocity": float(data.get("VELOCITY", 0)),
            "event_hour": dt.hour,
            "event_day": dt.day,
            "event_month": dt.month
        }

        df = pd.DataFrame([[mapped_data[col] for col in FEATURE_COLUMNS]], columns=FEATURE_COLUMNS)

        # 🔥 SAFE preprocessing
        X_processed = preprocessor.transform(df)

        # 🔥 SAFE model predictions
        rf_prob = rf_model.predict_proba(X_processed)[0][1]
        xgb_prob = xgb_model.predict_proba(X_processed)[0][1]

        # 🔥 HANDLE AUTOENCODER SAFELY
        try:
            reconstructed = autoencoder.predict(X_processed)
            error = np.mean((X_processed - reconstructed) ** 2)
        except Exception:
            error = 0.0  # fallback

        risk_score = compute_risk_score(error, rf_prob, xgb_prob)
        alert = risk_score > 0.7

        return {
            "risk_score": float(risk_score),
            "rf_probability": float(rf_prob),
            "xgb_probability": float(xgb_prob),
            "autoencoder_error": float(error),
            "alert": bool(alert)
        }

    except Exception as e:
        return {
            "error": "Prediction failed",
            "details": str(e)
        }