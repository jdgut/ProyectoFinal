from fastapi import FastAPI

from app.api.trips import router as trip_router
from app.api.users import router as user_router
from app.core.config import settings
from app.core.database import Base, engine

app = FastAPI(title=settings.app_name)


@app.on_event("startup")
def on_startup() -> None:
    Base.metadata.create_all(bind=engine)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(user_router, prefix="/api")
app.include_router(trip_router, prefix="/api")
