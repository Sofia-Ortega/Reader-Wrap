resource "aws_security_group" "api_lb" {
  name        = "readerwrap-api-lb"
  description = "Allows all incoming traffic from port 443 and port 80; Allows all outgoing traffic"
  vpc_id      = aws_vpc.main.id
}

# incoming traffic arriving at port 22 -> maps to internal port 22
resource "aws_vpc_security_group_ingress_rule" "allow_ssh_lb" {
  security_group_id = aws_security_group.api_lb.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  to_port           = 443
  ip_protocol       = "tcp"
}


# incoming traffic arriving at port 80 -> maps to internal port 80; http listener
resource "aws_vpc_security_group_ingress_rule" "http_nginx_lb" {
  security_group_id = aws_security_group.api_lb.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  to_port           = 80
  ip_protocol       = "tcp"
}


# allows all outgoing traffic
resource "aws_vpc_security_group_egress_rule" "allow_outgoing_traffic_lb" {
  security_group_id = aws_security_group.api_lb.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # any protocol

}

resource "aws_lb" "api_lb" {
  name               = "readerwrap-api-lb"
  internal           = false
  load_balancer_type = "application"

  security_groups = [aws_security_group.api_lb.id]
  subnets         = [aws_subnet.my_app_a.id, aws_subnet.my_app_b.id]
}

resource "aws_lb_target_group" "api_tg" {
  name        = "readerwrap-api"
  port        = 8000
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "instance"

  # health_check {
  #   path = "/beep"
  #   matcher = "200"
  #   interval = 30
  #   healthy_threshold = 2
  #   unhealthy_threshold = 2
  # }

}

resource "aws_lb_target_group_attachment" "api_instance" {
  target_group_arn = aws_lb_target_group.api_tg.arn
  target_id        = aws_instance.my_app.id
  port             = 8000
}


resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.api_lb.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.api_lb.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  certificate_arn   = aws_acm_certificate.api_cert.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api_tg.arn
  }
}