from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..schemas.user import UserLogin, UserOut
from ..crud.user import get_user_by_email
from ..utils.auth import verify_password
from shared.database import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/login", response_model=UserOut)
def login(user_login: UserLogin, db: Session = Depends(get_db)):
    user = get_user_by_email(db, user_login.Email)
    if not user or not verify_password(user_login.Password, user.PasswordHash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return user
