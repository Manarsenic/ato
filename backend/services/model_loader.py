import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

rf_model = joblib.load(os.path.join(MODEL_DIR, "random_forest.pkl"))
xgb_model = joblib.load(os.path.join(MODEL_DIR, "xgboost.pkl"))
preprocessor = joblib.load(os.path.join(MODEL_DIR, "preprocessor.pkl"))

# 🔥 Safe TensorFlow loading
autoencoder = None

try:
    from tensorflow.keras.models import load_model
    autoencoder = load_model(
        os.path.join(MODEL_DIR, "autoencoder.h5"),
        compile=False
    )
    print("Autoencoder loaded successfully")
except Exception as e:
    print("Autoencoder not loaded:", e)