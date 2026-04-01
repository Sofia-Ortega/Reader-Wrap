resource "aws_security_group" "db_sg" {
  name        = "readerwrap-db-sg"
  description = "Allow DB access only from backend subnet"
  vpc_id      = aws_vpc.main.id

}

resource "aws_vpc_security_group_ingress_rule" "allow_my_app_sg" {
  security_group_id            = aws_security_group.db_sg.id
  referenced_security_group_id = aws_security_group.my_app.id

  from_port   = 5432
  to_port     = 5432
  ip_protocol = "tcp"
}

# allows my computer to ssh into the database instance directly
resource "aws_vpc_security_group_ingress_rule" "ssh_db" {
  security_group_id = aws_security_group.db_sg.id

  cidr_ipv4   = var.my_public_ip_block
  from_port   = 22
  to_port     = 22
  ip_protocol = "tcp"
}



resource "aws_vpc_security_group_egress_rule" "db_allow_outbound" {
  security_group_id = aws_security_group.db_sg.id

  cidr_ipv4   = "0.0.0.0/0"
  ip_protocol = "-1"
}



resource "aws_db_parameter_group" "db" {
  name   = "reader-wrap"
  family = "postgres17"

  parameter {
    name  = "log_connections"
    value = "1"
  }
}

resource "aws_instance" "db" {
  ami                         = var.instance_ami
  instance_type               = "t3.micro"
  availability_zone           = var.availability_zone
  subnet_id                   = aws_subnet.my_app_a.id
  vpc_security_group_ids      = [aws_security_group.db_sg.id]
  associate_public_ip_address = true

  key_name = aws_key_pair.ssh-key.key_name

  user_data = <<-EOF
  #!/bin/bash
  apt update -y
  apt install -y postgresql postgresql-contrib

  # Allow remote connections
  sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/*/main/postgresql.conf

  echo "host all all 0.0.0.0/0 md5" >> /etc/postgresql/*/main/pg_hba.conf

  systemctl restart postgresql

  # Set password for postgres user
  sudo -u postgres psql -c "ALTER USER postgres PASSWORD '${var.db_password}';"

  EOF

  tags = {
    Name = "reader_wrap_db"
  }
}

resource "aws_eip" "db" {
  instance = aws_instance.db.id
  domain   = "vpc"

  tags = {
    Name = "reader_wrap_db"
  }
}

output "db_elastic_ip" {
  value = aws_eip.db.public_ip
}