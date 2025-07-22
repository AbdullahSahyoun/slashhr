import sys
import os

# ✅ Add root path to import shared
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routers import auth
from shared.database import SessionLocal, Base, engine, check_db_connection

# ✅ Initialize FastAPI app
app = FastAPI(
    title="SLASHHR Auth Service",
    version="1.0.0",
    description="Auth microservice using FastAPI"
)

# ✅ CORS middleware to allow requests from React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include API routes
app.include_router(auth.router)

# ✅ Check DB on startup
@app.on_event("startup")
def startup_event():
    if check_db_connection():
        print("✅ Database connection successful")
    else:
        print("❌ Failed to connect to the database")
