# 📊 Observability & Monitoring Guide

This document covers the complete observability stack, metrics collection, Grafana dashboards, and alerting rules for **Uptime Monitoring & Alerting System**.

---

## 🌟 Observability Architecture

```
[ FastAPI Backend ] ──(Exposes /metrics)──► [ Prometheus ] ──(Data Source)──► [ Grafana Dashboard ]
                                                  │
                                                  └──(Triggers)──► [ Alertmanager ]
```

---

## 📈 Exported Metrics

The FastAPI backend exposes standard Prometheus metrics at `GET /metrics`:

| Metric Name | Type | Description |
| :--- | :--- | :--- |
| `uptime_ping_requests_total` | Counter | Total number of URL ping checks labeled by status (`UP`/`DOWN`) |
| `uptime_ping_latency_seconds` | Histogram | Request response latency distribution in seconds |
| `process_cpu_seconds_total` | Counter | Process CPU utilization |
| `process_resident_memory_bytes` | Gauge | Memory usage in bytes |

---

## 🚀 Scrape & Alert Configuration

1. **Prometheus Configuration**: `deployments/prometheus/prometheus.yml`
2. **Alerting Rules**: `deployments/prometheus/alerts.yml`
3. **Grafana Dashboards**: `deployments/grafana/uptime-dashboard.json`
