# Remote State Backend Configuration Template
# To use remote state, uncomment below after creating S3 bucket & DynamoDB table.

# terraform {
#   backend "s3" {
#     bucket         = "uptime-monitor-tfstate-bucket"
#     key            = "terraform/state/uptime-monitor.tfstate"
#     region         = "us-east-1"
#     dynamodb_table = "uptime-monitor-tf-locks"
#     encrypt        = true
#   }
# }
