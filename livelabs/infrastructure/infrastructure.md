# Infrastructure Configuration

## Introduction

In this lab we will build the infrastructure that we will use to run the rest of the workshop. The main three elements that we will be creating are a Virtual Cloud Network which helps you define your own data center network topology inside the Oracle Cloud by defining some of the following components (Subnets, Route Tables, Security Lists, Gateways, etc.), bastion host which is a compute instance that serves as the public entry point for accessing a private network from external networks like the internet, and we will create an Oracle Analytics Cloud instance which is embedded with machine learning, that helps organizations to discover unique insights faster with automation and intelligence. Finally, we will create a MySQL DB Service instance that we will allow us to configure a heatwave cluster later. 

Estimated Time: 35 minutes

### Objectives

In this lab, you will:
-	Create a Virtual Cloud Network and allow traffic through MySQL Database Service port
-	Create a Bastion Host compute instance 
-	Connect to the Bastion Host, install MySQL Shell and download the workshop Dataset
- Create an Oracle Analytics Cloud instance
- Create an Instance of MySQL in the Cloud

### Prerequisites

- Oracle Free Trial Account.
  
[Lab 1 Demo](youtube:W4JaHA-Fzp8)

## Task 1: Create a Virtual Cloud Network and allow traffic through MySQL Database Service port

1. Log-in to your OCI tenancy. Once you have logged-in, select _**Networking >> Virtual Cloud Networks**_ from the _**menu icon**_ on the top left corner.

  As a recap we have created a VCN and added an additional Ingress rules to the Security list, and created a compute instance that serves as a bastion host and launched the cloud shell to import the private keys to connect to the compute instance, we also installed MySQL Shell and the MySQL client, and downloaded the dataset that will be used later on for benchmark analysis.
  Also, we created an Oracle Analytics Cloud instance which we will eventually use later in this workshop. Finally, created MySQL Database instance which will be used to enable the HeatWave service later.

  Well done, you can now proceed to the next lab!

## Acknowledgements
  - **Author** - Victor Martin - Technology Product Strategy Director, Priscila Iruela - Technology Product Strategy Director
  - **Contributors** - XXX
  - **Last Updated By/Date** - XXX
