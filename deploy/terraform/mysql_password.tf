resource "local_file" "mysql_password" {
  content = templatefile("${path.module}/mysql_password.tftpl",
    {
      mysql_admin_password = random_password.mysql_admin_password.result
    }
  )
  filename = "${path.module}/generated/mysql_password.txt"
}