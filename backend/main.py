from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.predict import router as predict_router
from backend.api.accounts import router as accounts_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router)
app.include_router(accounts_router)
from backend.api.alerts import router as alerts_router
app.include_router(alerts_router)
import os
import uvicorn

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port)