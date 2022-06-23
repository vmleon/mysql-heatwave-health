#!/bin/sh

podman exec -it \
  mysql bash

: << 'COMMENT'
mysql --host=127.0.0.1 --port=3306 \
  --user=root \
  --password=Str0ngP4ssW0rd \
  example
COMMENT

: << 'COMMENT'
DROP TABLE IF EXISTS limbs;
CREATE TABLE limbs
(
  thing VARCHAR(20),  # what the thing is
  legs  INT,          # number of legs it has
  arms  INT,          # number of arms it has
  PRIMARY KEY(thing)
);

INSERT INTO limbs (thing,legs,arms) VALUES('human',2,2);
INSERT INTO limbs (thing,legs,arms) VALUES('insect',6,0);
INSERT INTO limbs (thing,legs,arms) VALUES('sloths',2,2);
INSERT INTO limbs (thing,legs,arms) VALUES('monkey',2,2);
INSERT INTO limbs (thing,legs,arms) VALUES('lemurs',2,2);
INSERT INTO limbs (thing,legs,arms) VALUES('Octopus',0,8);
INSERT INTO limbs (thing,legs,arms) VALUES('squid',0,10);
INSERT INTO limbs (thing,legs,arms) VALUES('fish',0,0);
INSERT INTO limbs (thing,legs,arms) VALUES('centipede',99,0);
INSERT INTO limbs (thing,legs,arms) VALUES('table',4,0);
INSERT INTO limbs (thing,legs,arms) VALUES('armchair',4,2);
INSERT INTO limbs (thing,legs,arms) VALUES('phonograph',0,1);
INSERT INTO limbs (thing,legs,arms) VALUES('tripod',3,0);
INSERT INTO limbs (thing,legs,arms) VALUES('Peg Leg Pete',1,2);
INSERT INTO limbs (thing,legs,arms) VALUES('space alien',NULL,NULL);
COMMENT
