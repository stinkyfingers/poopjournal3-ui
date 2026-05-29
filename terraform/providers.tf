terraform {
  required_version = ">= 1.5.0"

  backend "s3" {
    bucket  = "jds-infra"
    key     = "poopjournal3-ui/terraform.tfstate"
    region  = "us-west-1"
    profile = "jds"
    encrypt = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Default provider — used for CloudFront, Route53, and ACM (must be us-east-1)
provider "aws" {
  region  = var.aws_region
  profile = var.aws_profile
}

# Aliased provider — used only for the S3 site bucket
provider "aws" {
  alias   = "s3"
  region  = var.bucket_region
  profile = var.aws_profile
}
