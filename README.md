# 🚀 Uptime Monitoring & Alerting System

![React](https://img.shields.io/badge/Frontend-React_19-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?logo=tailwind-css)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![Docker](https://img.shields.io/badge/Container-Docker-2496ED?logo=docker)
![Kubernetes](https://img.shields.io/badge/Orchestration-Kubernetes-326CE5?logo=kubernetes)
![Jenkins](https://img.shields.io/badge/CI%2FCD-Jenkins-D24939?logo=jenkins)
![Terraform](https://img.shields.io/badge/IaC-Terraform-7B42BC?logo=terraform)

A state-of-the-art, full-stack **Uptime Monitoring and Alerting Platform** built with a futuristic **Vitreous Glass Morphism** design.

---

## 📂 Repository Structure

```
uptime-monitor/
├── .github/              # GitHub Actions CI workflows
├── backend/              # FastAPI Python backend service
├── frontend/             # React 19 Vite web application
├── deployments/          # DevOps & Infrastructure orchestration
│   ├── docker/           # Docker Compose files & Nginx gateway proxy
│   ├── k8s/              # Kubernetes manifests, Helm charts & Pod configs
│   ├── jenkins/          # Jenkins agent Dockerfile, Job DSL & rollback pipelines
│   └── terraform/        # AWS EKS & VPC Infrastructure as Code (IaC)
├── docs/                 # Complete system documentation guides
│   ├── ARCHITECTURE.md   # High-level architecture & design
│   ├── CONTRIBUTING.md   # Collaboration guidelines
│   ├── DOCKER.md         # Container deployment & hardening
│   ├── JENKINS.md        # CI/CD pipeline setup & automation
│   ├── KUBERNETES.md     # Pod management & operations
│   └── TERRAFORM.md      # AWS EKS & VPC IaC guide
├── scripts/              # CLI helper automation scripts
├── docker-compose.yml    # Root Docker Compose file
├── Jenkinsfile           # Primary Jenkins Pipeline script
├── LICENSE               # MIT License
└── README.md             # Project overview
```

---

## 🌟 Key Features

* **Real-time Website Ping & Health Checks**: Instant response time measurements and uptime monitoring.
* **Glass Morphism UI**: Premium futuristic dark mode dashboard with ambient glowing 3D elements.
* **Interactive Latency Graphs**: Visual 24-hour response time analytics powered by Recharts.
* **Live Action Controls**: Parallel service refreshing, status filtering (Operational/Incidents), and service deletion.
* **One-Click CSV Reports**: Export service health metrics to CSV instantly.
* **Authentication Flow**: Complete login and registration user experience.
* **Containerized Architecture**: Production-ready Dockerfiles, Kubernetes manifests, Jenkins pipelines, and Terraform IaC scripts.

---

## 🛠️ Tech Stack & Documentation

- **Frontend**: React 19, Tailwind CSS, Recharts, React Router v7
- **Backend**: Python FastAPI, `httpx`, Pydantic v2, Uvicorn
- **DevOps & IaC**: Docker, Kubernetes, Jenkins, Helm, Terraform (AWS)

### 📚 Detailed Documentation Guides
- 🏛️ [System Architecture](docs/ARCHITECTURE.md)
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

### 2. AWS Infrastructure Provisioning (Terraform)
```bash
cd deployments/terraform
terraform init
terraform plan
```

### 3. Local Development (Without Docker)
```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && pip install -r requirements.txt && python main.py
```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
