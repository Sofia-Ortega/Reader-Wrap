
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16" # hosts from 10.0.0.1 - 10.0.225.254
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    Name = "reader wrap vpc"
  }
}

resource "aws_eip" "my_app" {
  instance = aws_instance.my_app.id
  domain   = "vpc"
}

resource "aws_internet_gateway" "my_app" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "reader wrap"
  }
}

resource "aws_subnet" "my_app" {
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 3, 1)
  vpc_id            = aws_vpc.main.id
  availability_zone = var.availability_zone
}

resource "aws_route_table" "my_app" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.my_app.id
  }

  tags = {
    Name = "reader wrap"
  }
}

resource "aws_route_table_association" "subnet_association" {
  subnet_id      = aws_subnet.my_app.id
  route_table_id = aws_route_table.my_app.id
}

