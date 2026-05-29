locals {
  common_tags = merge(var.tags, {
    Project = var.project_name
  })

  normalized_hosted_zone_name = var.hosted_zone_name == null ? null : (
    endswith(var.hosted_zone_name, ".") ? var.hosted_zone_name : "${var.hosted_zone_name}."
  )

  dns_aliases             = var.hosted_zone_name == null ? [] : var.aliases
  manage_acm_certificate  = var.acm_certificate_arn == null && length(var.aliases) > 0 && var.hosted_zone_name != null
  certificate_domain_name = local.manage_acm_certificate ? var.aliases[0] : null
  certificate_sans        = local.manage_acm_certificate && length(var.aliases) > 1 ? slice(var.aliases, 1, length(var.aliases)) : []
  effective_acm_certificate_arn = var.acm_certificate_arn != null ? var.acm_certificate_arn : (
    local.manage_acm_certificate ? aws_acm_certificate_validation.site[0].certificate_arn : null
  )

  mime_types = {
    css   = "text/css"
    gif   = "image/gif"
    html  = "text/html"
    ico   = "image/x-icon"
    jpeg  = "image/jpeg"
    jpg   = "image/jpeg"
    js    = "application/javascript"
    json  = "application/json"
    map   = "application/json"
    png   = "image/png"
    svg   = "image/svg+xml"
    txt   = "text/plain"
    webp  = "image/webp"
    woff  = "font/woff"
    woff2 = "font/woff2"
    xml   = "application/xml"
  }

  dist_files = var.upload_dist ? fileset(var.dist_path, "**") : []
}

data "aws_route53_zone" "site" {
  count = var.hosted_zone_name == null ? 0 : 1

  name         = local.normalized_hosted_zone_name
  private_zone = false
}

resource "aws_acm_certificate" "site" {
  count = local.manage_acm_certificate ? 1 : 0

  domain_name               = local.certificate_domain_name
  subject_alternative_names = local.certificate_sans
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }

  tags = local.common_tags
}

resource "aws_route53_record" "cert_validation" {
  for_each = local.manage_acm_certificate ? {
    for dvo in aws_acm_certificate.site[0].domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  } : {}

  zone_id = data.aws_route53_zone.site[0].zone_id
  name    = each.value.name
  type    = each.value.type
  records = [each.value.record]
  ttl     = 60

  allow_overwrite = true
}

resource "aws_acm_certificate_validation" "site" {
  count = local.manage_acm_certificate ? 1 : 0

  certificate_arn         = aws_acm_certificate.site[0].arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

resource "aws_s3_bucket" "site" {
  provider      = aws.s3
  bucket        = var.bucket_name
  force_destroy = var.force_destroy

  tags = local.common_tags
}

resource "aws_s3_bucket_ownership_controls" "site" {
  provider = aws.s3
  bucket   = aws_s3_bucket.site.id

  rule {
    object_ownership = "BucketOwnerEnforced"
  }
}

resource "aws_s3_bucket_public_access_block" "site" {
  provider = aws.s3
  bucket   = aws_s3_bucket.site.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "${var.project_name}-oac"
  description                       = "OAC for ${var.project_name}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.project_name} static site"
  default_root_object = var.default_root_object
  aliases             = var.aliases
  price_class         = var.price_class

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "s3-${aws_s3_bucket.site.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    target_origin_id       = "s3-${aws_s3_bucket.site.id}"
    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    compress               = true

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = local.effective_acm_certificate_arn == null
    acm_certificate_arn            = local.effective_acm_certificate_arn
    ssl_support_method             = local.effective_acm_certificate_arn == null ? null : "sni-only"
    minimum_protocol_version       = local.effective_acm_certificate_arn == null ? "TLSv1" : "TLSv1.2_2021"
  }

  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  custom_error_response {
    error_code            = 404
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0
  }

  tags = local.common_tags

  lifecycle {
    precondition {
      condition     = length(var.aliases) == 0 || local.effective_acm_certificate_arn != null
      error_message = "When aliases are configured, provide acm_certificate_arn or set hosted_zone_name so Terraform can request and validate ACM automatically."
    }
  }

  depends_on = [aws_acm_certificate_validation.site]
}

data "aws_iam_policy_document" "site_bucket_policy" {
  statement {
    sid    = "AllowCloudFrontServicePrincipalReadOnly"
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    actions = ["s3:GetObject"]

    resources = ["${aws_s3_bucket.site.arn}/*"]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.site.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "site" {
  provider = aws.s3
  bucket   = aws_s3_bucket.site.id
  policy   = data.aws_iam_policy_document.site_bucket_policy.json
}

resource "aws_s3_object" "dist_files" {
  provider = aws.s3
  for_each = var.upload_dist ? { for file in local.dist_files : file => file } : {}

  bucket = aws_s3_bucket.site.id
  key    = each.value
  source = "${var.dist_path}/${each.value}"
  etag   = filemd5("${var.dist_path}/${each.value}")

  content_type = lookup(
    local.mime_types,
    lower(element(reverse(split(".", each.value)), 0)),
    "application/octet-stream"
  )
}

resource "aws_route53_record" "site_a" {
  for_each = toset(local.dns_aliases)

  zone_id = data.aws_route53_zone.site[0].zone_id
  name    = each.value
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "site_aaaa" {
  for_each = toset(local.dns_aliases)

  zone_id = data.aws_route53_zone.site[0].zone_id
  name    = each.value
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.site.domain_name
    zone_id                = aws_cloudfront_distribution.site.hosted_zone_id
    evaluate_target_health = false
  }
}
