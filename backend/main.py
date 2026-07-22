from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Uptime Monitor API")

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ServiceStatus(BaseModel):
    name: str
    url: str
    status: str
    uptime: float
    ping_ms: int

@app.get("/api/status")
async def get_status():
    """
    Mock endpoint returning the status of monitored services.
    In the future, this will read from a database populated by a Celery worker.
    """
    return {
        "services": [
            {
                "name": "Production API",
                "url": "api.example.com",
                "status": "UP",
                "uptime": 99.9,
                "ping_ms": 42
            },
            {
                "name": "Payment Gateway",
                "url": "pay.example.com",
                "status": "DOWN",
                "uptime": 95.0,
                "ping_ms": 0
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
