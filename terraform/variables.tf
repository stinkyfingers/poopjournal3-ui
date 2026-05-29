variable "project_name" {
  type        = string
  description = "Project name used for resource tagging"
  default     = "poopjournal3-ui"
}

variable "aws_region" {
  type        = string
  description = "AWS region for CloudFront, Route53, and ACM resources"
  default     = "us-east-1"
}

variable "bucket_region" {
  type        = string
  description = "AWS region for the S3 site bucket (can differ from aws_region)"
  default     = "us-west-1"
}

variable "aws_profile" {
  type        = string
  description = "AWS CLI profile used by the AWS provider"
  default     = "jds"
}

variable "bucket_name" {
  type        = string
  description = "Globally unique S3 bucket name that stores built frontend assets"
}

variable "acm_certificate_arn" {
  type        = string
  description = "ACM certificate ARN in us-east-1 for custom domain HTTPS; leave null to use default CloudFront certificate"
  default     = null
}

variable "aliases" {
  type        = list(string)
  description = "Optional custom domain aliases for the CloudFront distribution"
  default     = []
}

variable "hosted_zone_name" {
  type        = string
  description = "Public Route53 hosted zone name used to create alias records (for example, poopjournal.com)"
  default     = null
}

variable "price_class" {
  type        = string
  description = "CloudFront price class"
  default     = "PriceClass_100"
}

variable "default_root_object" {
  type        = string
  description = "Default object served by CloudFront"
  default     = "index.html"
}

variable "force_destroy" {
  type        = bool
  description = "Allow S3 bucket deletion even when non-empty"
  default     = false
}

variable "upload_dist" {
  type        = bool
  description = "When true, upload local build artifacts from dist_path to S3"
  default     = false
}

variable "dist_path" {
  type        = string
  description = "Path to the built frontend assets"
  default     = "../dist"
}

variable "tags" {
  type        = map(string)
  description = "Additional tags applied to resources"
  default     = {}
}
