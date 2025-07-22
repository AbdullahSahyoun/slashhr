from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI(
    title="SLASHHR FastAPI Backend",
    description="FastAPI server running with no API routes",
    version="1.0.0",
)

# ✅ Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Serve static files (optional)
app.mount("/static", StaticFiles(directory="public"), name="static")

# ✅ Jinja2 templates (if you use HTML later)
templates = Jinja2Templates(directory="public")

# ✅ Optional root route (or remove it too)
@app.get("/")
def root():
    return {"status": "FastAPI server is running without any APIs."}
