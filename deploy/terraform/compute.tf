variable "num_instances_client" {
  default = "1"
}

variable "instance_shape" {
  default = "VM.Standard.E3.Flex"
}

variable "instance_ocpus" {
  default = 1
}

variable "instance_shape_config_memory_in_gbs" {
  default = 1
}

variable "num_instances_backend" {
  default = "1"
}

data "oci_core_images" "ol8_images" {
  compartment_id           = var.compartment_ocid
  shape                    = var.instance_shape
  operating_system         = "Oracle Linux"
  operating_system_version = "8"
  sort_by                  = "TIMECREATED"
  sort_order               = "DESC"
}

data "oci_identity_availability_domain" "ad" {
  compartment_id = var.tenancy_ocid
  ad_number      = 1
}

resource "random_string" "secure_token" {
  length      = 32
  special     = true
  min_lower   = 4
  min_numeric = 4
  min_special = 4
  min_upper   = 4
}

resource "oci_core_instance" "client" {
  count               = var.num_instances_client
  availability_domain = data.oci_identity_availability_domain.ad.name
  compartment_id      = var.compartment_ocid
  display_name        = "client${count.index}"
  shape               = var.instance_shape

  metadata = {
    ssh_authorized_keys = var.ssh_public_key
  }

  shape_config {
    ocpus         = var.instance_ocpus
    memory_in_gbs = var.instance_shape_config_memory_in_gbs
  }

  create_vnic_details {
    subnet_id                 = oci_core_subnet.publicsubnet.id
    display_name              = "client"
    assign_public_ip          = true
    assign_private_dns_record = true
    hostname_label            = "client${count.index}"
  }

  source_details {
    source_type = "image"
    source_id   = data.oci_core_images.ol8_images.images[0].id
  }

  timeouts {
    create = "60m"
  }
}
