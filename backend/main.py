import time
import httpx
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST
from fastapi.responses import Response
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from models import ServiceModel, PingLogModel
from notifications import send_webhook_alert

# Auto-create tables on startup
Base.metadata.create_all(bind=engine)

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
    webhook_url: str = None

@app.get("/healthz")
async def healthz():
    """
    Kubernetes Liveness Probe endpoint.
    """
    return {"status": "ok", "service": "uptime-backend"}

@app.get("/readyz")
async def readyz(db: Session = Depends(get_db)):
    """
    Kubernetes Readiness Probe endpoint checking database connectivity.
    """
    try:
        db.execute("SELECT 1")
        return {"status": "ready", "database": "connected"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database unready: {e}")

@app.get("/metrics")
async def metrics():
    """
    Exposes Prometheus metrics endpoint for scraping.
    """
    return Response(content=generate_latest(), media_type=CONTENT_TYPE_LATEST)

@app.post("/api/monitor")
async def monitor_url(req: MonitorRequest, db: Session = Depends(get_db)):
    """
    Pings a URL, returns status/response time, persists results, and dispatches incident alerts.
    """
    url = req.url
    if not url.startswith("http"):
        url = "https://" + url

    start_time = time.time()
    try:
        async with httpx.AsyncClient(verify=False) as client:
            response = await client.get(url, timeout=10.0)
        
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

    # Database Persistence & Incident Alerts
    try:
        hostname = httpx.URL(url).host
        service = db.query(ServiceModel).filter(ServiceModel.url == url).first()
        status_changed = False

        if not service:
            service = ServiceModel(name=hostname, url=url, status=status, ping_ms=ping_ms)
            db.add(service)
            db.commit()
            db.refresh(service)
            status_changed = True
        else:
            if service.status != status:
                status_changed = True
            service.status = status
            service.ping_ms = ping_ms
            db.commit()

        ping_log = PingLogModel(service_id=service.id, status=status, response_time_ms=ping_ms)
        db.add(ping_log)
        db.commit()

        # Dispatch Alert if status changed or if status is DOWN
        if status_changed or status == "DOWN":
            await send_webhook_alert(req.webhook_url, service.name, service.url, status, ping_ms)

    except Exception:
        db.rollback()

    return {
        "status": status,
        "ping_ms": ping_ms
    }

@app.get("/api/status")
async def get_status(db: Session = Depends(get_db)):
    """
    Returns monitored services fetched directly from the database.
    """
    services = db.query(ServiceModel).all()
    if not services:
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
    return {
        "services": [
            {
                "id": s.id,
                "name": s.name,
                "url": s.url,
                "status": s.status,
                "uptime": 100.0 if s.status == "UP" else 0.0,
                "ping_ms": s.ping_ms
            } for s in services
        ]
    }

@app.get("/api/services/{service_id}/history")
async def get_service_history(service_id: int, limit: int = 50, db: Session = Depends(get_db)):
    """
    Returns historical ping logs for a specific service.
    """
    service = db.query(ServiceModel).filter(ServiceModel.id == service_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    logs = db.query(PingLogModel).filter(PingLogModel.service_id == service_id).order_by(PingLogModel.timestamp.desc()).limit(limit).all()
    return {
        "service": service.name,
        "history": [
            {
                "timestamp": log.timestamp.isoformat(),
                "status": log.status,
                "ping_ms": log.response_time_ms
            } for log in reversed(logs)
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
