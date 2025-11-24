provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}

resource "aws_acm_certificate" "frontend_cert" {
  domain_name               = "www.readerwrap.com"
  validation_method         = "DNS"
  subject_alternative_names = ["readerwrap.com"]

  lifecycle {
    create_before_destroy = true
  }
}



resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.frontend_cert.domain_validation_options : dvo.domain_name => dvo
  }

  zone_id = aws_route53_zone.main.zone_id
  name    = each.value.resource_record_name
  type    = each.value.resource_record_type
  records = [each.value.resource_record_value]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "frontend_cert_validation" {
  certificate_arn         = aws_acm_certificate.frontend_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}


resource "aws_cloudfront_origin_access_identity" "frontend_oai" {
  comment = "OAI for www.readerwrap.com"
}

resource "aws_cloudfront_distribution" "frontend_cdn" {

  enabled = true
  aliases = ["www.readerwrap.com"]

  origin {
    origin_id   = "www-readerwrap-com-origin"
    domain_name = aws_s3_bucket.frontend-bucket.bucket_regional_domain_name

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.frontend_oai.cloudfront_access_identity_path
    }
  }

  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "www-readerwrap-com-origin"


    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate_validation.frontend_cert_validation.certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}
