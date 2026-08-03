# 🚀 Uptime Monitoring & Alerting System

![Node](https://img.shields.io/badge/Node.js-20%2B-green?logo=node.js)
![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?logo=tailwind-css)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![SQLite](https://img.shields.io/badge/Database-SQLite_3-003B57?logo=sqlite)
![Prometheus](https://img.shields.io/badge/Metrics-Prometheus-E6522C?logo=prometheus)
![Docker](https://img.shields.io/badge/Container-Docker-2496ED?logo=docker)
![Kubernetes](https://img.shields.io/badge/Orchestration-Kubernetes-326CE5?logo=kubernetes)
![Jenkins](https://img.shields.io/badge/CI%2FCD-Jenkins-D24939?logo=jenkins)
![Terraform](https://img.shields.io/badge/IaC-Terraform-7B42BC?logo=terraform)

A state-of-the-art, full-stack **Uptime Monitoring and Alerting Platform** built with a futuristic **Vitreous Glass Morphism** design.

---

## 📂 Repository Structure

```
uptime-monitor/
├── .github/              # GitHub Actions CI, Security & Issue templates
├── backend/              # FastAPI Python backend service, SQLite ORM & Prometheus metrics
├── frontend/             # React 19 Vite web application
├── deployments/          # DevOps & Infrastructure orchestration
│   ├── docker/           # Docker Compose files & Nginx gateway proxy
│   ├── grafana/          # Grafana monitoring dashboards
│   ├── jenkins/          # Jenkins agent Dockerfile, Job DSL & rollback pipelines
│   ├── k8s/              # Kubernetes manifests, Helm charts & Pod configs
│   ├── prometheus/       # Prometheus scrape config & alerting rules
│   └── terraform/        # AWS EKS & VPC Infrastructure as Code (IaC)
├── docs/                 # Complete system documentation guides
│   ├── ARCHITECTURE.md   # High-level architecture & design
│   ├── ALERTING.md       # Webhook & Incident alert notifications
│   ├── CONTRIBUTING.md   # Collaboration guidelines
│   ├── DATABASE.md       # SQLite schema & persistence guide
│   ├── DOCKER.md         # Container deployment & hardening
│   ├── HEALTHCHECKS.md   # Kubernetes probes & health diagnostics
│   ├── JENKINS.md        # CI/CD pipeline setup & automation
│   ├── KUBERNETES.md     # Pod management & operations
│   ├── OBSERVABILITY.md  # Prometheus metrics & Grafana guide
│   └── TERRAFORM.md      # AWS EKS & VPC IaC guide
├── scripts/              # CLI helper automation scripts
├── .editorconfig         # Code formatting configuration
├── docker-compose.yml    # Root Docker Compose file
├── Jenkinsfile           # Primary Jenkins Pipeline script
├── LICENSE               # MIT License
└── README.md             # Project overview
```

---

## 🌟 Key Features

* **Real-time Website Ping & Health Checks**: Instant response time measurements and uptime monitoring.
* **Kubernetes Diagnostic Probes**: Native `/healthz` and `/readyz` endpoints for liveness & readiness checks.
* **Automated Webhook Alerts**: Instant Slack, Discord, and PagerDuty notifications on status transitions.
* **Database Persistence**: Automatic SQLite storage for monitored service targets and time-stamped ping logs.
* **Prometheus & Grafana Observability**: Native `/metrics` endpoint with latency histograms and alert rules.
* **Glass Morphism UI**: Premium futuristic dark mode dashboard with ambient glowing 3D elements.
* **Interactive Latency Graphs**: Visual 24-hour response time analytics powered by Recharts.
* **Live Action Controls**: Parallel service refreshing, status filtering (Operational/Incidents), and service deletion.
* **One-Click CSV Reports**: Export service health metrics to CSV instantly.
* **Authentication Flow**: Complete login and registration user experience.
* **Containerized Architecture**: Production-ready Dockerfiles, Kubernetes manifests, Jenkins pipelines, and Terraform IaC scripts.

---

## 🛠️ Tech Stack & Requirements

- **Node.js**: v20.12.0+ or v22.x
- **Frontend**: React 19, Tailwind CSS, Recharts, React Router v7
- **Backend**: Python FastAPI, `httpx`, SQLAlchemy, SQLite, Prometheus Client, Pydantic v2, Uvicorn
- **DevOps & Observability**: Docker, Kubernetes, Jenkins, Prometheus, Grafana, Terraform (AWS)

### 📚 Detailed Documentation Guides
- 🏛️ [System Architecture](docs/ARCHITECTURE.md)
- 🩺 [Health Checks & Kubernetes Diagnostics Guide](docs/HEALTHCHECKS.md)
- 🚨 [Alerting & Notifications Guide](docs/ALERTING.md)
- 🗄️ [Database Schema & Persistence Guide](docs/DATABASE.md)
- 📊 [Observability & Prometheus Guide](docs/OBSERVABILITY.md)
- 🐳 [Docker Deployment & Hardening Guide](docs/DOCKER.md)
- 🏗️ [Jenkins CI/CD Pipeline Guide](docs/JENKINS.md)
- ☸️ [Kubernetes Pod Management Guide](docs/KUBERNETES.md)
- 🏗️ [Terraform AWS IaC Infrastructure Guide](docs/TERRAFORM.md)
- 🤝 [Contributing Guidelines](docs/CONTRIBUTING.md)

---

## 🚦 Getting Started

### 1. Running with Docker Compose (Recommended)
```bash
# Start full application (Frontend + Backend)
docker-compose up --build -d
```
- **Frontend App**: [http://localhost:80](http://localhost:80)
- **Backend API**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Health Diagnostics**: [http://localhost:8000/healthz](http://localhost:8000/healthz) | [http://localhost:8000/readyz](http://localhost:8000/readyz)
- **Metrics Endpoint**: [http://localhost:8000/metrics](http://localhost:8000/metrics)

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
