output "mysql_ip" {
  value = oci_mysql_mysql_db_system.mysql_db_system.ip_address
}

output "mysql_hostname" {
  value = oci_mysql_mysql_db_system.mysql_db_system.endpoints[0].hostname
}

output "mysql_user" {
  value     = random_string.mysql_user.result
  sensitive = false
}

output "mysql_admin_password" {
  value     = random_password.mysql_admin_password.result
  sensitive = true
}

output "client" {
  value = oci_core_instance.client[0].public_ip
}

output "secure_token" {
  value = random_string.secure_token.result
}
