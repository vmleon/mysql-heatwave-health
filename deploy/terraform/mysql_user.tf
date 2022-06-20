resource "local_file" "mysql_user" {
  content = templatefile("${path.module}/mysql_user.tftpl",
    {
      mysql_user = random_string.mysql_user.result
    }
  )
  filename = "${path.module}/generated/mysql_user.txt"
}