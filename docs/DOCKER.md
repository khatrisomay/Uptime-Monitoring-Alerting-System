# 🐳 Docker Deployment & Architecture Guide

This document covers the complete container architecture, multi-stage builds, environment isolation, and orchestration options for **Uptime Monitoring & Alerting System**.

---

## 🏗️ Architecture Overview

The system consists of containerized services orchestrated via Docker Compose:

1. **Frontend**: React 19 (Vite) compiled to static production assets, served via an optimized Nginx Alpine web server.
2. **Backend**: Python 3.11 FastAPI service running on Uvicorn behind unprivileged non-root security constraints.
3. **Ingress Proxy**: Optional Nginx Gateway reverse-proxy unifying UI and API traffic on port `80`.
4. **Data Layer**: PostgreSQL database and Redis caching store for full-stack state persistence.

---

## 🚀 Quick Start Commands

### 1. Development Mode (Hot-reloading)
Runs containers with volume mounts enabling instant hot-reloading for code edits:
```bash
docker-compose -f docker-compose.dev.yml up --build -d
```
- **Frontend UI**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:8000/docs](http://localhost:8000/docs)

### 2. Production Mode (Optimized & Hardened)
Runs multi-stage production builds with healthchecks and resource limits:
```bash
docker-compose -f docker-compose.prod.yml up --build -d
```
- **Frontend UI**: [http://localhost:80](http://localhost:80)
- **Backend API**: [http://localhost:8000](http://localhost:8000)

### 3. Full-Stack Data Mode (Postgres + Redis)
Runs complete ecosystem with database and cache layers:
```bash
docker-compose -f docker-compose.full-stack.yml up --build -d
```

---

## 🛡️ Security Hardening & Optimizations

- **Multi-Stage Builds**: Dramatically reduces final image size by discarding build tools and intermediate artifacts.
- **Non-Root Execution**: Backend runs under unprivileged user (`appuser`, UID `10001`).
- **Container Health Checks**: Configured `HEALTHCHECK` instructions in both Dockerfiles and Docker Compose files.
- **Build Context Filtering**: Dedicated `.dockerignore` files prevent copying node_modules, pycache, or secret files.
- **Resource Limits**: CPU and memory allocation limits configured in production Compose stacks.

---

## 🛠️ Docker Helper CLI Script

You can use the provided bash script to quickly manage your Docker containers:
```bash
# Make executable
chmod +x scripts/docker-manage.sh

# Run Development Stack
./scripts/docker-manage.sh dev

# Run Production Stack
./scripts/docker-manage.sh prod

# Stop All Containers
./scripts/docker-manage.sh stop

# Cleanup Unused Docker Resources
./scripts/docker-manage.sh clean
```
