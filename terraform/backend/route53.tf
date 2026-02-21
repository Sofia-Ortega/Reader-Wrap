data "aws_route53_zone" "main" {
  name         = "readerwrap.com"
  private_zone = false
}

resource "aws_route53_record" "api_dns" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "api.readerwrap.com"
  type    = "A"
  ttl     = 300

  records = [aws_eip.my_app.public_ip]
}