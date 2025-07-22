from pydantic import BaseModel

class UserLogin(BaseModel):
    Email: str
    Password: str

class UserOut(BaseModel):
    Name: str
    UserID: int
    IsActive: bool
    TenantID: int

  
    class Config:
        orm_mode = True
