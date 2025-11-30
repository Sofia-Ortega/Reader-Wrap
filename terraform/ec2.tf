resource "aws_key_pair" "ssh-key" {
  key_name   = "ssh-key"
  public_key = var.ssh_public_key
}


resource "aws_security_group" "my_app" {
  name   = "SSH + Port 3005 for API"
  vpc_id = aws_vpc.main.id

  # incoming traffic arriving at port 22 -> maps to internal port 22
  ingress {
    cidr_blocks = [
      "0.0.0.0/0"
    ]
    from_port = 22
    to_port   = 22
    protocol  = "tcp"
  }

  # incoming traffic arriving at port 80 -> maps to internal port 80
  ingress {
    cidr_blocks = [
      "0.0.0.0/0"
    ]
    from_port = 80
    to_port   = 80
    protocol  = "tcp"
  }

  ingress {
    cidr_blocks = [
      "0.0.0.0/0"
    ]
    from_port = 5000
    to_port   = 5000
    protocol  = "tcp"
  }

  # allows all outgoing traffic
  egress {
    from_port   = 0    # all ports
    to_port     = 0    # all ports
    protocol    = "-1" # any protocol
    cidr_blocks = ["0.0.0.0/0"]
  }
}



resource "aws_instance" "my_app" {
  ami                         = var.instance_ami
  instance_type               = "t3.micro"
  availability_zone           = var.availability_zone
  security_groups             = [aws_security_group.my_app.id]
  associate_public_ip_address = true
  subnet_id                   = aws_subnet.my_app.id

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
  EOF

  tags = {
    Name = "reader_wrap_API"
  }

}

output "ec2_ip_address" {
  value = aws_instance.my_app.public_ip
}


output "ec2_elastic_ip" {
  value = aws_eip.my_app.public_ip
}