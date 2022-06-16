# MySQL and HeatWave for Health

This workshop is a hands-on experience to test the performance advantages and cost savings you can benefit from by using MySQL HeatWave.

XXX ARCHITECTURE DIAGRAM HERE

## HeatWave Introduction

XXX

## Requirements

- Active Oracle Cloud Account

## TODO

- Deploy Network
- Deploy MySQL
- Deploy HeatWave
- Import csv
- Run Query without Heatwave
- Run Query with Heatwave

## Set Up

Clone this repository in OCI Cloud Shell:
```
git clone https://github.com/vmleon/mysql-heatwave-health.git
```

Change directory to the `mysql-heatwave-health`:
```
cd mysql-heatwave-health
```

Export an environment variable with the base directory:
```
export BASE_DIR=$(pwd)
```

## Deployment

Change directory to `deploy/terraform`:
```
cd $BASE_DIR/deploy/terraform
```

Use terraform variables template file to create your own `terraform.tfvars`:
```
cp terraform.tfvars.template terraform.tfvars
```

Edit the variables values with vim or your favorite editor:
```
vim terraform.tfvars
```

Initialize the terraform provider:
```
terraform init
```

Apply the infrastructure, based on the plan from the previous step:
```
terraform apply -auto-approve
```

Print MySQL password:
```
terraform output mysql_admin_password
```

Install MySQL Shell and dataset CSV files on the client:
```
ansible-playbook -i ./generated/client.ini ../ansible/client.yaml
```

## Import Dataset

XXX

## Benchmark HeatWave

XXX

## Clean Up

Destroy all the infrastructure:
```
terraform destroy -auto-approve
```