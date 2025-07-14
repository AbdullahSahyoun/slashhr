# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Replace with your connection URL
DATABASE_URL = "postgresql://slashhr_bteam:bteamX%40ssw0rd@31.97.192.204:5432/slashhr"

# Create the SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Create a configured session class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for ORM models
Base = declarative_base()
