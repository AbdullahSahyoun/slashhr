from sqlalchemy import Column, BigInteger, String, Boolean, TIMESTAMP, ForeignKey
from shared.database import Base 

class User(Base):
    __tablename__ = "tblUser"
    __table_args__ = {"schema": "user"}  

    UserID = Column(BigInteger, primary_key=True)
    TenantID = Column(BigInteger, ForeignKey("public.tblTenant.TenantID"))
    Email = Column(String, unique=True, nullable=False)
    PasswordHash = Column(String, nullable=False)
    Name = Column(String)
    IsActive = Column(Boolean, default=True)
    CreatedAt = Column(TIMESTAMP)
