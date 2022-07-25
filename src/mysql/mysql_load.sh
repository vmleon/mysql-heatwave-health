#!/bin/sh

podman cp ../../deploy/ansible/roles/client/files/fitbit.zip mysql:/fitbit.zip
podman exec mysql microdnf install unzip
podman exec mysql unzip /fitbit.zip

podman exec mysql mysqlsh --sql --password="Str0ngP4ssW0rd" -e "SET GLOBAL local_infile=1"

podman cp ../../deploy/ansible/roles/client/files/schema.sql mysql:/schema.sql
podman exec mysql mysqlsh --mysql --password="Str0ngP4ssW0rd" --file /schema.sql

podman cp ../../deploy/ansible/roles/client/files/load.js mysql:/load.js
podman exec -e CSV_PATH=/fitbit mysql mysqlsh --mysql  --password="Str0ngP4ssW0rd" --file /load.js

# DEBUG
# podman exec -it mysql bash
# podman exec -it mysql mysql --password="Str0ngP4ssW0rd"