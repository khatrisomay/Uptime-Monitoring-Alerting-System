output "vpc_id" {
  description = "ID of the created AWS VPC"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "IDs of the public subnets"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "IDs of the private subnets"
  value       = aws_subnet.private[*].id
}

output "eks_cluster_name" {
  description = "Name of the EKS Cluster"
  value       = aws_eks_cluster.main.name
}

output "eks_cluster_endpoint" {
  description = "Kubernetes API server endpoint"
  value       = aws_eks_cluster.main.endpoint
}

output "alb_dns_name" {
  description = "Public DNS address of Application Load Balancer"
  value       = aws_lb.main.dns_name
}

output "ecr_frontend_repository_url" {
  description = "URL of ECR repository for frontend"
  value       = aws_ecr_repository.frontend.repository_url
}

output "ecr_backend_repository_url" {
  description = "URL of ECR repository for backend"
  value       = aws_ecr_repository.backend.repository_url
}
