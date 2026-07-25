# 🏗️ Jenkins CI/CD Pipeline Architecture & Deployment Guide

This document covers the complete Jenkins CI/CD pipeline setup, multi-branch workflow, credentials configuration, and automated Kubernetes deployment integration for **Uptime Monitoring & Alerting System**.

---

## 🌟 Pipeline Architecture

The CI/CD workflow is defined in `Jenkinsfile` using Declarative Pipeline syntax:

```
[ Git Push ] ➔ [ Checkout ] ➔ [ Parallel Linting ] ➔ [ Pytest Backend ]
                                                             │
[ Slack Notification ]  [ K8s Deployment ]  [ Docker Build & Push ]  [ Build Frontend ]
```

### Pipeline Stages Overview

1. **Checkout**: Pulls code for the active branch and commit hash (`env.GIT_COMMIT`).
2. **Parallel Code Linting**: Runs Python static checks (`flake8`) and React static analysis (`oxlint`) concurrently.
3. **Test Backend**: Executes Pytest suite with XML test reports (`junit`) and coverage reporting.
4. **Test & Build Frontend**: Installs Node modules, builds Vite production distribution, and archives `dist/` artifacts.
5. **Build & Push Docker Images**: Logs into Docker Registry using credentials, builds tagged images (`${BUILD_NUMBER}-${GIT_COMMIT}`), and pushes `latest` tags.
6. **Deploy to Kubernetes**: Applies K8s manifests to target namespace (`staging` or `production`) and waits for `rollout status`.
7. **Post Actions**: Sends Slack notifications on success/failure and cleans up the workspace.

---

## 🚀 Local Jenkins Setup with Docker

You can run a local Jenkins Master server using the provided Compose stack:

```bash
# Start local Jenkins Master
docker-compose -f jenkins/docker-compose.jenkins.yml up -d
```

- **Jenkins Web UI**: [http://localhost:8080](http://localhost:8080)
- **Agent Port**: `50000`

---

## 🔑 Required Jenkins Credentials

Configure these credentials in Jenkins (**Manage Jenkins ➔ Credentials**):

| Credential ID | Type | Description |
| :--- | :--- | :--- |
| `dockerhub-credentials` | Username with Password | Docker Hub login (`DOCKER_USER_VAR`, `DOCKER_PASS_VAR`) |
| `kubeconfig-credentials` | Secret file / Kubeconfig | Kubernetes cluster config file for `kubectl` deployments |

---

## 🔄 Automated Job Provisioning (Job DSL)

Automate creating multibranch pipeline jobs using Job DSL:
- Script location: `jenkins/jobs/uptime_monitor_pipeline.groovy`

---

## ⏪ One-Click Kubernetes Rollback Pipeline

If a production deployment experiences issues, execute the dedicated rollback pipeline:
- Pipeline file: `jenkins/pipelines/rollback.Jenkinsfile`
- Runs `kubectl rollout undo deployment/uptime-monitor-backend`
