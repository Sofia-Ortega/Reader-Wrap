resource "aws_route53_zone" "main" {
  name = "readerwrap.com"
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "www"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.frontend_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "root" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "readerwrap.com"
  type    = "A"

  alias {
    name                   = aws_s3_bucket.root_bucket.website_domain
    zone_id                = aws_s3_bucket.root_bucket.hosted_zone_id
    evaluate_target_health = false
  }
}