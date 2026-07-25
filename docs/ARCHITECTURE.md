# 🏛️ System Architecture & Directory Specification

This document details the software architecture, repository organization, and component interaction for **Uptime Monitoring & Alerting System**.

---

## 📁 Clean Repository Layout

```
uptime-monitor/
├── .github/              # GitHub Actions CI workflows
│   └── workflows/
├── backend/              # FastAPI Python backend application & tests
├── frontend/             # React 19 Vite web application & assets
├── deployments/          # DevOps & Infrastructure orchestration
│   ├── docker/           # Docker Compose files & Nginx gateway proxy
│   ├── k8s/              # Kubernetes manifests & Helm charts
│   └── jenkins/          # Jenkins pipelines, Agent Dockerfile & Job DSL
├── docs/                 # System documentation & developer guides
│   ├── ARCHITECTURE.md
│   ├── CONTRIBUTING.md
│   ├── DOCKER.md
│   ├── JENKINS.md
│   └── KUBERNETES.md
├── scripts/              # CLI automation scripts for Docker & K8s
├── Jenkinsfile           # Primary Jenkins Pipeline definition
├── docker-compose.yml    # Root Docker Compose orchestrator
├── LICENSE               # MIT License
└── README.md             # Project overview & quickstart
```

---

## 🔄 Component Interaction Flow

1. **Client Layer**: User interacts with React 19 Frontend (served via Nginx container).
2. **Ingress Gateway**: Requests to `/api/` are proxied to Python FastAPI Backend.
3. **Backend Service**: FastAPI executes async HTTP status checks (`httpx`) and returns status & ping metrics.
4. **Data & Cache**: State persistence via PostgreSQL & Redis caching stores.
5. **Orchestration**: Managed via Kubernetes Pods with HPA auto-scaling and zero-downtime rolling deploys.
