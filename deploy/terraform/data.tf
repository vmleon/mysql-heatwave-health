data "oci_identity_availability_domains" "ads" {
  compartment_id = "${var.tenancy_ocid}"
}

data "template_file" "ad_names" {
  count    = "${length(data.oci_identity_availability_domains.ads.availability_domains)}"
  template = "${lookup(data.oci_identity_availability_domains.ads.availability_domains[count.index], "name")}"
}