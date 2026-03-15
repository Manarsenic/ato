from fastapi import APIRouter
from backend.services.predictor import predict_risk

router = APIRouter()

@router.post("/predict")
def predict(data: dict):

    result = predict_risk(data)

    return result