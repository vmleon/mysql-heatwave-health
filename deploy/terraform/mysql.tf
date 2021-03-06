resource "oci_mysql_mysql_db_system" "mysql_db_system" {
    availability_domain = "${lookup(data.oci_identity_availability_domains.ads.availability_domains[0], "name")}"
    compartment_id = var.compartment_ocid
    // TODO get from data.oci_mysql_shapes
    // https://registry.terraform.io/providers/oracle/oci/latest/docs/data-sources/mysql_shapes
    shape_name = "MySQL.HeatWave.VM.Standard.E3"
    subnet_id = oci_core_subnet.privatesubnet.id

    admin_password = random_password.mysql_admin_password.result
    admin_username = random_string.mysql_user.result

    // TODO use variables for these values
    description = "MySQL DB System for Workshop"
    display_name = "MDSWorkshop"
    hostname_label = "mdsworkshop"
    is_highly_available = false
}

resource "oci_mysql_heat_wave_cluster" "mysql_heat_wave_cluster" {
    #Required
    db_system_id = oci_mysql_mysql_db_system.mysql_db_system.id
    cluster_size = 1
    // TODO get from data.oci_mysql_shapes
    shape_name = "MySQL.HeatWave.VM.Standard.E3"
}


resource "random_string" "mysql_user" {
  length           = 6
  special          = false
}

resource "random_password" "mysql_admin_password" {
  length           = 16
  special          = true
  min_numeric = 3
  min_special = 2
  min_lower = 2
  min_upper = 2
  override_special = "@#$^&?-_()[]"
}