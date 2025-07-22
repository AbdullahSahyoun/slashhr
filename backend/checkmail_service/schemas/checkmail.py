from pydantic import BaseModel

class CheckEmailRequest(BaseModel):
    Email: str

class CheckEmailResponse(BaseModel):
    exists: bool
    UserID: int | None = None
    Name: str | None = None
    TenantID: int | None = None
    IsActive: bool | None = None
