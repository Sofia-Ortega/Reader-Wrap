resource "aws_key_pair" "ssh-key" {
  key_name   = "readerwrap-ec2-desktop-linux"
  public_key = file("~/.ssh/readerwrap.pub")
}


resource "aws_security_group" "my_app" {
  name        = "Reader Wrap API"
  description = "Allow traffic only from api load balancer and my personal ssh"
  vpc_id      = aws_vpc.main.id
}


resource "aws_vpc_security_group_ingress_rule" "http" {
  security_group_id = aws_security_group.my_app.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  to_port           = 80
  ip_protocol       = "tcp"
}

# Allow HTTPS
resource "aws_vpc_security_group_ingress_rule" "https" {
  security_group_id = aws_security_group.my_app.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 443
  to_port           = 443
  ip_protocol       = "tcp"
}

# Allow SSH only from your IP
resource "aws_vpc_security_group_ingress_rule" "ssh" {
  security_group_id = aws_security_group.my_app.id
  cidr_ipv4         = var.my_public_ip_block
  from_port         = 22
  to_port           = 22
  ip_protocol       = "tcp"
}
# allows all outgoing traffic
resource "aws_vpc_security_group_egress_rule" "allow_outgoing_traffic" {
  security_group_id = aws_security_group.my_app.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1" # any protocol

}


resource "aws_instance" "my_app" {
  ami                         = var.instance_ami
  instance_type               = "t3.micro"
  availability_zone           = var.availability_zone
  vpc_security_group_ids      = [aws_security_group.my_app.id]
  associate_public_ip_address = true
  subnet_id                   = aws_subnet.my_app_a.id

  key_name = aws_key_pair.ssh-key.key_name

  ### Install Docker
  user_data = <<-EOF
  #!/bin/bash
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  sudo groupadd docker
  sudo usermod -aG docker ubuntu
  newgrp dockerO
  sudo timedatectl set-timezone America/Chicago

  sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
  chmod o+r /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  chmod o+r /etc/apt/sources.list.d/caddy-stable.list
  sudo apt update
  sudo apt install caddy

  sudo tee /etc/caddy/Caddyfile > /dev/null <<CADDYEOF
  api.readerwrap.com {
      reverse_proxy http://127.0.0.1:8000
  }
  CADDYEOF

  sudo systemctl start caddy




  EOF

  tags = {
    Name = "reader_wrap_API"
  }

}

resource "aws_eip" "my_app" {
  instance = aws_instance.my_app.id
  domain   = "vpc"

  tags = {
    Name = "reader_wrap_API"
  }
}

output "ec2_elastic_ip" {
  value = aws_eip.my_app.public_ip
}

