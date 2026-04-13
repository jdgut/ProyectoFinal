from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.users import UserRegisterRequest, UserResponse
from app.services.users import UserService

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/register", response_model=UserResponse)
def register_user(payload: UserRegisterRequest, db: Session = Depends(get_db)) -> UserResponse:
    service = UserService(db)
    return UserResponse.model_validate(service.register(payload))
