#!/bin/sh


podman run -it \
  --rm mysql:latest \
  # bash
  mysql --host=127.0.0.1 --port=3306 \
  --user=root \
  --password=Str0ngP4ssW0rd \
  example