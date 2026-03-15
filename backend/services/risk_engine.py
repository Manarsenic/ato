def compute_risk_score(ae_score, rf_prob, xgb_prob):

    # normalize anomaly score
    ae_score = ae_score / 100000

    risk_score = (
        0.4 * ae_score +
        0.3 * rf_prob +
        0.3 * xgb_prob
    )

    return risk_score