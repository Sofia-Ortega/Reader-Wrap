
locals {
  dist_files = fileset("${path.module}/../frontend/dist", "**")
}


resource "aws_s3_object" "object-upload-html" {
  for_each = { for f in local.dist_files : f => f }
  bucket   = aws_s3_bucket.frontend-bucket.bucket
  key      = each.value
  source   = "${path.module}/../frontend/dist/${each.value}"
  etag     = filemd5("${path.module}/../frontend/dist/${each.value}")

  content_type = lookup(
    {
      html = "text/html",
      js   = "application/javascript",
      css  = "text/css",
      json = "application/json",
      svg  = "image/svg+xml",
      png  = "image/png",
      jpg  = "image/jpeg",
      jpeg = "image/jpeg",
      ico  = "image/x-icon",
      txt  = "text/plain"
    },
    regex("\\.(\\w+)$", each.value)[0],
    "binary/octet-stream"
  )
}