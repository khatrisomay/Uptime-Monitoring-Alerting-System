import time
import httpx
from fastapi import FastAPI, HTTPException
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

class MonitorRequest(BaseModel):
    url: str

@app.post("/api/monitor")
async def monitor_url(req: MonitorRequest):
    """
    Pings a URL and returns its status and response time.
    """
    url = req.url
    if not url.startswith("http"):
        url = "https://" + url

    start_time = time.time()
    try:
        async with httpx.AsyncClient(verify=False) as client:
            response = await client.get(url, timeout=5.0)
        
        ping_ms = int((time.time() - start_time) * 1000)
        
        if response.status_code < 400:
            status = "UP"
        else:
            status = "DOWN"

    except httpx.RequestError:
        status = "DOWN"
        ping_ms = 0
    except Exception:
        status = "DOWN"
        ping_ms = 0

    return {
        "status": status,
        "ping_ms": ping_ms
    }

@app.get("/api/status")
async def get_status():
    """
    Mock endpoint returning the status of monitored services.
    """
    return {
        "services": [
            {
                "name": "Production API",
                "url": "https://api.example.com",
                "status": "UP",
                "uptime": 99.9,
                "ping_ms": 42
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
