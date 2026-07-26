# 🏗️ Terraform Infrastructure as Code (AWS EKS & VPC)

This document covers the complete Infrastructure as Code (IaC) setup using **Terraform** for provisioning cloud resources on **AWS** for **Uptime Monitoring & Alerting System**.

---

## 🌟 AWS Cloud Infrastructure Architecture

```
                                [ AWS Cloud (us-east-1) ]
                                            │
                                    [ VPC: 10.0.0.0/16 ]
                                            │
                 ┌──────────────────────────┴──────────────────────────┐
                 ▼                                                     ▼
     [ Public Subnets (AZ1/AZ2) ]                         [ Private Subnets (AZ1/AZ2) ]
     • Internet Gateway (IGW)                             • NAT Gateway (Outbound traffic)
     • Application Load Balancer (ALB)                   • EKS Managed Node Group (t3.medium)
     • Port 80 / 443 Ingress                              • Frontend & Backend Kubernetes Pods
```

---

## 📁 Terraform Modules Overview

All IaC definitions reside in `deployments/terraform/`:

| File | Resource Provisioned |
| :--- | :--- |
| `versions.tf` | Terraform `>= 1.5.0` & AWS Provider `~> 5.0` constraint |
| `variables.tf` | Configurable input parameters (`aws_region`, `vpc_cidr`, `environment`) |
| `main.tf` | AWS Provider configuration & default tag rules |
| `backend.tf` | S3 remote state storage & DynamoDB lock configuration template |
| `vpc.tf` | Virtual Private Cloud, public/private subnets, and IGW |
| `nat.tf` | Elastic IP, NAT Gateway, and Route Tables for private subnets |
| `security_groups.tf` | Security Group rules for ALB and EKS worker nodes |
| `iam.tf` | IAM roles & policy attachments (`EKSClusterPolicy`, `EKSWorkerNodePolicy`, `ECRReadOnly`) |
| `eks_cluster.tf` | Managed AWS EKS Control Plane v1.29 with API logging |
| `eks_nodegroup.tf` | Managed EKS Node Group (min 2, max 10, desired 2) |
| `alb.tf` | Application Load Balancer, HTTP listener, and target groups |
| `ecr.tf` | AWS ECR container image repositories with lifecycle cleanup policies |
| `outputs.tf` | Exported cluster endpoints, VPC IDs, ALB DNS names, and ECR URLs |

---

## 🚀 Execution Workflow

### 1. Initialize Terraform Provider
```bash
cd deployments/terraform
terraform init
```

### 2. Validate & Preview Changes
```bash
# Validate HCL syntax
terraform validate

# Preview infrastructure creation plan
terraform plan
```

### 3. Apply Infrastructure (Production Deployment)
```bash
terraform apply
```

---

## 🔒 Security & Credentials Policy
- **No Credentials Hardcoded**: All AWS authentication relies on environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`) or local `~/.aws/credentials` profile.
- **Private Subnet Placement**: EKS worker nodes run inside isolated private subnets with outbound Internet access routed through NAT Gateway.
