SHELL := /bin/zsh

TF_DIR ?= terraform
TFVARS ?= terraform.tfvars
AWS_PROFILE ?= jds
AWS_REGION ?= us-east-1

.PHONY: help build tf-init tf-plan tf-apply tf-destroy deploy invalidate

help:
	@echo "Targets:"
	@echo "  make build        - Build frontend assets to dist/"
	@echo "  make tf-init      - Init terraform backend/providers"
	@echo "  make tf-plan      - Terraform plan using $(TF_DIR)/$(TFVARS)"
	@echo "  make tf-apply     - Terraform apply using $(TF_DIR)/$(TFVARS)"
	@echo "  make tf-destroy   - Terraform destroy using $(TF_DIR)/$(TFVARS)"
	@echo "  make deploy       - Build and apply with upload_dist=true"
	@echo "  make invalidate   - Invalidate CloudFront cache"

build:
	npm run build

tf-init:
	terraform -chdir=$(TF_DIR) init -reconfigure -backend-config="profile=$(AWS_PROFILE)"

tf-plan:
	terraform -chdir=$(TF_DIR) plan -var-file=$(TFVARS) -var="aws_profile=$(AWS_PROFILE)"

tf-apply:
	terraform -chdir=$(TF_DIR) apply -var-file=$(TFVARS) -var="aws_profile=$(AWS_PROFILE)"

tf-destroy:
	terraform -chdir=$(TF_DIR) destroy -var-file=$(TFVARS) -var="aws_profile=$(AWS_PROFILE)"

deploy: build
	terraform -chdir=$(TF_DIR) apply -var-file=$(TFVARS) -var="aws_profile=$(AWS_PROFILE)" -var="upload_dist=true"

invalidate:
	aws cloudfront create-invalidation \
		--profile $(AWS_PROFILE) \
		--distribution-id $$(terraform -chdir=$(TF_DIR) output -raw cloudfront_distribution_id) \
		--paths "/*"
