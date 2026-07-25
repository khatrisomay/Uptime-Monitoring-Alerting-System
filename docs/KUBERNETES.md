# ☸️ Kubernetes Pod Management & Infrastructure Operations Guide

This document covers the complete Kubernetes infrastructure, Pod management standards, auto-scaling, security contexts, and cluster operations for **Uptime Monitoring & Alerting System**.

---

## 🌟 Cluster Architecture Overview

The Kubernetes deployment architecture provides zero-downtime, self-healing pod management across dedicated environments (`uptime-dev`, `uptime-staging`, `uptime-prod`):

```
                   [ Nginx Ingress Controller ]
                                │
               ┌────────────────┴────────────────┐
               ▼                                 ▼
    [ Frontend Pods (2+) ]            [ Backend Pods (2+) ]
    • Nginx Static Server             • FastAPI Python Server
    • Port 80                         • Port 8000
    • HPA (2 - 8 Replicas)            • HPA (2 - 10 Replicas)
    • Probes (Live/Ready)             • Probes (Live/Ready/Startup)
```

---

## 📦 Resource Directory Structure

```
k8s/
├── namespaces/         # Environment isolation (dev, staging, prod)
├── configmaps/         # Application configuration & env vars
├── secrets/            # Sensitive credentials & keys
├── backend/            # FastAPI deployment, service, probes & limits
├── frontend/           # React Web deployment, service & limits
├── hpa/                # HorizontalPodAutoscalers (CPU/Mem target)
├── pdb/                # PodDisruptionBudgets (High availability)
├── storage/            # PersistentVolumeClaims (PVC)
├── cronjobs/           # Nightly log & database cleanup CronJobs
├── ingress/            # Nginx Ingress routing rules
├── networkpolicy/      # Pod-to-Pod network security isolation
└── helm/               # Production Helm chart template
```

---

## ⚙️ Pod Management & Operations

### 1. Deploying the Kubernetes Stack
```bash
# Apply all Kubernetes manifests
chmod +x scripts/k8s-manage.sh
./scripts/k8s-manage.sh apply
```

### 2. Inspecting Pod Health & Probes
```bash
# Check pod status and IP distribution
kubectl get pods -o wide

# Inspect active probes and events
kubectl describe pod -l app=uptime-monitor-backend
```

### 3. Scaling Pods (Manual & Dynamic HPA)
```bash
# Check current HPA scaling metrics
kubectl get hpa

# Manual scaling override
kubectl scale deployment uptime-monitor-backend --replicas=5
```

### 4. Zero-Downtime Rolling Restarts
```bash
# Trigger graceful rolling restart
kubectl rollout restart deployment/uptime-monitor-backend
kubectl rollout status deployment/uptime-monitor-backend
```

---

## 🛡️ Pod Security & Resilience Hardening

1. **SecurityContext**: Pods execute under unprivileged user (`runAsUser: 10001`, `runAsNonRoot: true`) with dropped Linux capabilities (`drop: ["ALL"]`).
2. **Pod Anti-Affinity**: Ensures replica pods are scheduled across separate worker nodes to prevent single-node downtime.
3. **PodDisruptionBudget (PDB)**: Guarantees at least 1 pod instance remains operational during node maintenance or drains.
4. **NetworkPolicy**: Enforces network traffic isolation so only frontend pods can reach backend API pods on port `8000`.
