# 🩺 Health Checks & Kubernetes Diagnostics Guide

This document covers system health check endpoints, liveness/readiness probes, and database ping verification for **Uptime Monitoring & Alerting System**.

---

## 🌟 Diagnostic Endpoints Summary

| Endpoint | Type | Purpose | HTTP Success |
| :--- | :--- | :--- | :--- |
| `GET /healthz` | Liveness Probe | Verifies backend process is alive and receiving traffic | `200 OK` |
| `GET /readyz` | Readiness Probe | Verifies database connectivity and storage readiness | `200 OK` |
| `GET /metrics` | Prometheus Metrics | Exposes scrapable metrics for system monitoring | `200 OK` |

---

## ☸️ Kubernetes Pod Manifest Integration

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8000
  initialDelaySeconds: 10
  periodSeconds: 15

readinessProbe:
  httpGet:
    path: /readyz
    port: 8000
  initialDelaySeconds: 15
  periodSeconds: 10
```
