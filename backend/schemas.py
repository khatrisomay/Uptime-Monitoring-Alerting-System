from pydantic import BaseModel
from typing import List, Optional

class ServiceStatusSchema(BaseModel):
    name: str
    url: str
    status: str
    uptime: float
    ping_ms: int

class MonitorRequestSchema(BaseModel):
    url: str

class MonitorResponseSchema(BaseModel):
    status: str
    ping_ms: int

class HealthCheckSchema(BaseModel):
    status: str
    version: str
