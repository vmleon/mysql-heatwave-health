SELECT count(*)
FROM heartrate_seconds a 
join daily_activities b on a.id=b.id
join sleep_day c on c.id=b.id
where a.value>80 and b.total_distance>7.0 
and c.total_minutes_asleep>350
and weight_kilo>40 and weight_kilo<90;

--limit 10000;
--a.id, b.tracker_distance, c.total_minutes_asleep
SELECT  count(*)
FROM heartrate_seconds a 
join daily_activities b on a.id=b.id
join sleep_day c on c.id=b.id
where a.value>10 and b.total_distance>5.0 and
c.total_minutes_asleep>200;

 MySQL  mdsworkshop.private.workshopvcn.oraclevcn.com:33060+ ssl  fitbit  SQL > SELECT  count(*)
                                                                             -> FROM heartrate_seconds a 
                                                                             -> join daily_activities b on a.id=b.id
                                                                             -> join sleep_day c on c.id=b.id
                                                                             -> where a.value>10 and b.total_distance>5.0 and
                                                                             -> c.total_minutes_asleep>200;
+-----------+
| count(*)  |
+-----------+
| 677392290 |
+-----------+
1 row in set (2 min 10.5417 sec)


SELECT count(*) 
FROM heartrate_seconds a 
join daily_activities b on a.id=b.id
join sleep_day c on c.id=b.id
where a.value>80 and b.total_distance>7.0 
and c.total_minutes_asleep>350;

 MySQL  mdsworkshop.private.workshopvcn.oraclevcn.com:33060+ ssl  fitbit  SQL > SELECT count(*) 
                                                                             -> FROM heartrate_seconds a 
                                                                             -> join daily_activities b on a.id=b.id
                                                                             -> join sleep_day c on c.id=b.id
                                                                             -> where a.value>80 and b.total_distance>7.0 
                                                                             -> and c.total_minutes_asleep>350;
+-----------+
| count(*)  |
+-----------+
| 101644774 |
+-----------+
1 row in set (20.0827 sec)


SELECT count(*)
FROM heartrate_seconds a 
join daily_activities b on a.id=b.id
join sleep_day c on c.id=b.id
where a.value>80 and b.total_distance>7.0 
and c.total_minutes_asleep>350;


MySQL  mdsworkshop.private.workshopvcn.oraclevcn.com:33060+ ssl  fitbit  SQL > SELECT count(*)
                                                                             -> FROM heartrate_seconds a 
                                                                             -> join daily_activities b on a.id=b.id
                                                                             -> join sleep_day c on c.id=b.id
                                                                             -> where a.value>80 and b.total_distance>7.0 
                                                                             -> and c.total_minutes_asleep>350;
+-----------+
| count(*)  |
+-----------+
| 101644774 |
+-----------+
1 row in set (22.1115 sec)


and weight_kilo>40 and weight_kilo<90;


a.id, b.tracker_distance, c.total_minutes_asleep



SELECT b.booking_id,
f.flight_id,
pd.passenger_id,
pd.sex,
pd.country,
b.seat,
b.price,
f.flightno,
f.departure,
f.arrival
FROM booking b
JOIN passengerdetails pd ON pd.passenger_id = b.passenger_id
JOIN flight f ON f.flight_id = b.flight_id
JOIN airport ato ON ato.airport_id = f.to
LIMIT 200000;