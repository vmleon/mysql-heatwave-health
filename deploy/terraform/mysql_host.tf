resource "local_file" "mysql_host" {
  content = templatefile("${path.module}/mysql_host.tftpl",
    {
      mysql_host = oci_mysql_mysql_db_system.mysql_db_system.endpoints[0].hostname
    }
  )
  filename = "${path.module}/generated/mysql_host.txt"
}