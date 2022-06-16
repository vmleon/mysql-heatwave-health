resource "local_file" "myconf" {
  content = templatefile("${path.module}/myconf.tftpl",
    {
      mysql_hostname = oci_mysql_mysql_db_system.mysql_db_system.endpoints[0].hostname
      mysql_user = random_string.mysql_user.result
      mysql_admin_password = random_password.mysql_admin_password.result
    }
  )
  filename = "${path.module}/generated/.my.cnf"
}