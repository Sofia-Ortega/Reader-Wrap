
variable "availability_zone" {
  description = "Availability zone of resources"
  type        = string
}

variable "ssh_public_key" {
  description = "Public key to ssh into my ec2 container"
  type        = string
}

variable "instance_ami" {
  description = "ID of AMI used for EC2"
  type        = string

}

variable "db_password" {
  description = "password of database"
  type        = string
  sensitive   = true
}