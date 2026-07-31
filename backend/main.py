import time
import httpx
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST
from fastapi.responses import Response

app = FastAPI(title="Uptime Monitor API")

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Prometheus Custom Metrics
PING_REQUESTS_TOTAL = Counter('uptime_ping_requests_total', 'Total number of website ping requests', ['status'])
PING_LATENCY_HISTOGRAM = Histogram('uptime_ping_latency_seconds', 'Website ping latency in seconds')

class ServiceStatus(BaseModel):
    name: str
    url: str
    status: str
    uptime: float
    ping_ms: int

class MonitorRequest(BaseModel):
    url: str

@app.get("/metrics")
async def metrics():
    """
    Exposes Prometheus metrics endpoint for scraping.
    """
    return Response(content=generate_latest(), media_type=CONTENT_TYPE_LATEST)

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
        
        ping_seconds = time.time() - start_time
        ping_ms = int(ping_seconds * 1000)
        
        if response.status_code < 400:
            status = "UP"
        else:
            status = "DOWN"

    except Exception:
        status = "DOWN"
        ping_seconds = 0
        ping_ms = 0

    # Record Prometheus metrics
    PING_REQUESTS_TOTAL.labels(status=status).inc()
    if status == "UP":
        PING_LATENCY_HISTOGRAM.observe(ping_seconds)

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
