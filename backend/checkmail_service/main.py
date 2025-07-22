import sys
import os

# لإتاحة المسارات الداخلية مثل schemas و routes
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import checkmail
from shared.database import check_db_connection  # تأكد أن هذا المسار يعمل

app = FastAPI(
    title="SLASHHR Check Mail Service",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(checkmail.router)

@app.on_event("startup")
def startup_event():
    if check_db_connection():
        print("✅ Database connection successful")
    else:
        print("❌ Failed to connect to the database")
