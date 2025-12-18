
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16" # hosts from 10.0.0.1 - 10.0.225.254
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags = {
    Name = "reader wrap vpc"
  }
}



resource "aws_internet_gateway" "my_app" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "reader wrap"
  }
}

resource "aws_subnet" "my_app_a" {
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 4, 0)
  vpc_id            = aws_vpc.main.id
  availability_zone = var.availability_zone

  tags = {
    Name = "reader_wrap_app_a"
  }
}

resource "aws_subnet" "my_app_b" {
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 4, 1)
  vpc_id            = aws_vpc.main.id
  availability_zone = "us-east-2b"

  tags = {
    Name = "reader_wrap_app_b"
  }
}


resource "aws_subnet" "db_private_a" {
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 4, 2)
  vpc_id            = aws_vpc.main.id
  availability_zone = var.availability_zone

  tags = {
    Name = "reader_wrap_db_private_a"
  }
}

resource "aws_subnet" "db_private_b" {
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 4, 3)
  vpc_id            = aws_vpc.main.id
  availability_zone = "us-east-2b"

  tags = {
    Name = "reader_wrap_db_private_b"
  }

}

resource "aws_db_subnet_group" "db" {
  name       = "reader wrap database"
  subnet_ids = [aws_subnet.db_private_a.id, aws_subnet.db_private_b.id]

  tags = {
    Name = "Reader wrap db"
  }
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

resource "aws_route_table_association" "subnet_association_a" {
  subnet_id      = aws_subnet.my_app_a.id
  route_table_id = aws_route_table.my_app.id
}

resource "aws_route_table_association" "subnet_association_b" {
  subnet_id      = aws_subnet.my_app_b.id
  route_table_id = aws_route_table.my_app.id
}

