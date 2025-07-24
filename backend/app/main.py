from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import username, domain, email, ip

app = FastAPI(title="OSINT Portal API", version="1.0.0")

# CORS middleware per permettere connessioni dal frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(username.router, prefix="/api/username", tags=["username"])
app.include_router(domain.router, prefix="/api/domain", tags=["domain"])
app.include_router(email.router, prefix="/api/email", tags=["email"])
app.include_router(ip.router, prefix="/api/ip", tags=["ip"])

@app.get("/")
async def root():
    return {"message": "OSINT Portal API"}
