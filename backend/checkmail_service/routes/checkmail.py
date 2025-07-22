from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.checkmail import CheckEmailRequest, CheckEmailResponse
from shared.database import get_db
from models.user import User  # تأكد أن هذا المسار صحيح بحسب مكان تعريف Model

router = APIRouter()


@router.post("/checkmail", response_model=CheckEmailResponse)
def check_email(data: CheckEmailRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.Email == data.Email).first()

    if user:
        return CheckEmailResponse(
            exists=True,
            UserID=user.UserID,
            Name=user.Name,
            TenantID=user.TenantID,
            IsActive=user.IsActive
        )

    return CheckEmailResponse(exists=False)
