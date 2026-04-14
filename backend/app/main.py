from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.trips import router as trip_router
from app.api.users import router as user_router
from app.core.config import settings
from app.core.database import Base, engine

app = FastAPI(title=settings.app_name)

allowed_origins = [origin.strip() for origin in settings.cors_allowed_origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(user_router, prefix="/api")
app.include_router(trip_router, prefix="/api")
