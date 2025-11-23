provider "aws" {
  region = "us-east-2"
}


resource "aws_s3_bucket" "frontend-bucket" {
  bucket = "www.readerwrap.com"
}

resource "aws_s3_bucket_public_access_block" "example" {
  bucket = aws_s3_bucket.frontend-bucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}


resource "aws_s3_bucket_ownership_controls" "s3_bucket_acl_ownership" {
  bucket = aws_s3_bucket.frontend-bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }

  depends_on = [aws_s3_bucket_public_access_block.example]
}




resource "aws_s3_bucket_acl" "bucket-acl" {
  bucket     = aws_s3_bucket.frontend-bucket.id
  acl        = "public-read"
  depends_on = [aws_s3_bucket_ownership_controls.s3_bucket_acl_ownership]
}

resource "aws_s3_bucket_website_configuration" "example" {
  bucket = aws_s3_bucket.frontend-bucket.bucket

  index_document {
    suffix = "index.html"
  }
}
