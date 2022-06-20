resource "local_file" "backend_params" {
  content = templatefile("${path.module}/backend_params.tftpl",
    {
      mysql_host = oci_mysql_mysql_db_system.mysql_db_system.endpoints[0].hostname
      mysql_password = random_password.mysql_admin_password.result
      mysql_user = random_string.mysql_user.result
    }
  )
  filename = "${path.module}/generated/backend_params.json"
}