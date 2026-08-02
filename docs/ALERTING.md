# 🚨 Alerting & Incident Notification Guide

This document covers the incident alert notification dispatch engine, webhook integrations (Slack, Discord, PagerDuty), and payload specs for **Uptime Monitoring & Alerting System**.

---

## 🌟 Notification Architecture

```
[ Monitor Check ] ──(Status Changed / DOWN)──► [ Alert Dispatcher ] ──► [ Slack / Discord Webhook ]
```

---

## 🔔 Supported Webhook Destinations

1. **Slack Webhooks**: Standard incoming webhook URL (`https://hooks.slack.com/services/...`).
2. **Discord Webhooks**: Embedded color-coded notification cards (`https://discord.com/api/webhooks/...`).
3. **PagerDuty & Generic Webhooks**: HTTP POST JSON payloads containing service status and latency metrics.

---

## 📋 Webhook Payload Spec

```json
{
  "text": "🚨 *Service Alert*: `Production API` is currently *DOWN*!\nURL: https://api.example.com\nResponse Time: 0ms",
  "embeds": [
    {
      "title": "🚨 Uptime Monitor Alert: Production API",
      "description": "Target `https://api.example.com` status transitioned to **DOWN**.",
      "color": 15158332,
      "fields": [
        {"name": "Status", "value": "DOWN", "inline": true},
        {"name": "Response Latency", "value": "0 ms", "inline": true}
      ]
    }
  ]
}
```
