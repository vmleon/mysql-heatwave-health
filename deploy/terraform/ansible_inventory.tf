resource "local_file" "ansible_inventory" {
  content = templatefile("${path.module}/ansible_inventory.tftpl",
    {
     client_public_ip = oci_core_instance.client[0].public_ip
    }
  )
  filename = "${path.module}/generated/client.ini"
}