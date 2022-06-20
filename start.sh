#!/bin/bash

banner()
{
  echo "+------------------------------------------+"
  printf "| %-40s |\n" "`date`"
  echo "|                                          |"
  printf "|`tput bold` %-40s `tput sgr0`|\n" "$@"
  echo "+------------------------------------------+"
}

if [ -z "$BASE_DIR" ]
then
  export BASE_DIR=$(pwd)
fi

cd $BASE_DIR/deploy/terraform

banner "Terraform Init"

terraform init -upgrade

banner "Terraform Apply"

terraform apply -auto-approve

sleep 2

banner "Ansible Provisioning"

ansible-playbook -i ./generated/client.ini ../ansible/client.yaml \
  --extra-vars "@generated/backend_params.json"

banner "Output"

terraform output