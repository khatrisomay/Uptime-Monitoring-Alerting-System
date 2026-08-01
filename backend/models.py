import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class ServiceModel(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    url = Column(String, unique=True, index=True)
    status = Column(String, default="UNKNOWN")
    ping_ms = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    logs = relationship("PingLogModel", back_populates="service", cascade="all, delete-orphan")

class PingLogModel(Base):
    __tablename__ = "ping_logs"

    id = Column(Integer, primary_key=True, index=True)
    service_id = Column(Integer, ForeignKey("services.id"))
    status = Column(String)
    response_time_ms = Column(Integer)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    service = relationship("ServiceModel", back_populates="logs")
