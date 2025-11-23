


# data "aws_ami" "ubuntu" {
#   most_recent = true

#   filter {
#     name   = "name"
#     values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
#   }

#   owners = ["099720109477"] # Canonical
# }


# resource "aws_instance" "app_server" {
#   ami           = data.aws_ami.ubuntu.id
#   instance_type = "t3.micro"

#   tags = {
#     Name = "reader-wrap-backend"
#   }
# }
