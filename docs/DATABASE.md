# 🗄️ Database Schema & Persistence Guide

This document details the SQLite database schema, ORM relationships, data persistence, and history endpoints for **Uptime Monitoring & Alerting System**.

---

## 🌟 Entity Relationship Diagram

```
┌───────────────────────────┐         ┌───────────────────────────────┐
│         services          │         │           ping_logs           │
├───────────────────────────┤         ├───────────────────────────────┤
│ id (PK, Integer)          │ 1 ─── N │ id (PK, Integer)              │
│ name (String)             │         │ service_id (FK -> services.id)│
│ url (String, Unique)      │         │ status (String: UP/DOWN)      │
│ status (String: UP/DOWN)  │         │ response_time_ms (Integer)    │
│ ping_ms (Integer)         │         │ timestamp (DateTime)          │
│ created_at (DateTime)     │         └───────────────────────────────┘
└───────────────────────────┘
```

---

## 🛠️ API Endpoints for Data Persistence

1. **`POST /api/monitor`**: Accepts `{ "url": "https://example.com" }`, executes real-time ping, persists or updates the `ServiceModel` entry, and inserts a time-stamped `PingLogModel` record.
2. **`GET /api/status`**: Fetches all monitored services directly from the `services` table.
3. **`GET /api/services/{service_id}/history`**: Retrieves historical ping logs for a specified service up to a configurable limit (default: 50).
