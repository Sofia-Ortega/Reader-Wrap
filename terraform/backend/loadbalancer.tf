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


# incoming traffic arriving at port 80 -> maps to internal port 80
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