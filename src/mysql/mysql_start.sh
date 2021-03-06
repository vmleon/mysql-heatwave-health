#!/bin/sh

podman run \
  --name mysql \
  --rm \
  -e MYSQL_ROOT_PASSWORD=Str0ngP4ssW0rd \
  -e MYSQL_DATABASE=fitbit \
  -e ENABLED_LOCAL_INFILE=true \
  -p 3306:3306 \
  -p 33060:33060 \
  -d \
  mysql:latest

sleep 5;