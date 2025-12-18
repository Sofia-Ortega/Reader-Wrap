resource "aws_route53_zone" "main" {
  name = "readerwrap.com"
}

resource "aws_route53_record" "api_dns" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "api.readerwrap.com"
  type    = "A"

  alias {
    name                   = aws_lb.api_lb.dns_name
    zone_id                = aws_lb.api_lb.zone_id
    evaluate_target_health = true
  }

}