import numpy as np
import pandas as pd
from datetime import datetime

from backend.services.model_loader import (
    rf_model,
    xgb_model,
    autoencoder,
    preprocessor
)

from backend.services.risk_engine import compute_risk_score


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

    # Extract timestamp
    timestamp = data.get("timestamp")
    dt = datetime.strptime(timestamp, "%Y-%m-%d %H:%M:%S")

    # Map incoming event to model features
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

    # Create dataframe
    df = pd.DataFrame([[mapped_data[col] for col in FEATURE_COLUMNS]], columns=FEATURE_COLUMNS)

    # Random Forest
    rf_prob = rf_model.predict_proba(df)[0][1]

    # XGBoost
    xgb_prob = xgb_model.predict_proba(df)[0][1]

    # Autoencoder
    X_processed = preprocessor.transform(df)

    reconstructed = autoencoder.predict(X_processed)

    error = np.mean((X_processed - reconstructed) ** 2)

    # Hybrid risk score
    risk_score = compute_risk_score(error, rf_prob, xgb_prob)

    alert = risk_score > 0.7

    return {
        "risk_score": float(risk_score),
        "rf_probability": float(rf_prob),
        "xgb_probability": float(xgb_prob),
        "autoencoder_error": float(error),
        "alert": bool(alert)
    }