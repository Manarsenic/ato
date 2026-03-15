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