from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from domain.user import user_router
from domain.vet import vet_router

app = FastAPI()

origins = [
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router.router, tags=["User"])
app.include_router(vet_router.router, tags=["Vet"])
