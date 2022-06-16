#!/bin/bash
export BASE_DIR=$(pwd)

cd $BASE_DIR/deploy/terraform

terraform init -upgrade

terraform apply -auto-approve

sleep 20

ansible-playbook -i ./generated/client.ini ../ansible/client.yaml