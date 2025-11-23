data "aws_iam_policy_document" "iam-policy-2" {
  statement {
    sid    = "AllowPublicRead"
    effect = "Allow"

    resources = [
      "arn:aws:s3:::www.readerwrap.com",
      "arn:aws:s3:::www.readerwrap.com/*",
    ]

    actions = ["S3:GetObject"]
    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }

  depends_on = [aws_s3_bucket_public_access_block.example]
}


resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.frontend-bucket.id
  policy = data.aws_iam_policy_document.iam-policy-2.json
}