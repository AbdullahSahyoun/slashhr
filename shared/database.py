import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.exc import OperationalError
from dotenv import load_dotenv

# ✅ Load variables from .env
load_dotenv()

# ✅ Read DB URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

# ✅ Create SQLAlchemy engine
engine = create_engine(DATABASE_URL, echo=True, pool_pre_ping=True)

# ✅ Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ✅ Base model for ORM
Base = declarative_base()



from sqlalchemy import text  # أضف هذا السطر في الأعلى

def check_db_connection() -> bool:
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))  # ✅ استخدم text() هنا
        return True
    except OperationalError as e:
        print(f"[DB ERROR] Could not connect: {e}")
        return False
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()