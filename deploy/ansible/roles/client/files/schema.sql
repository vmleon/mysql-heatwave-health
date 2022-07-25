CREATE DATABASE IF NOT EXISTS fitbit;
USE fitbit;
--
-- dailyCalories_merged
DROP TABLE IF EXISTS calories;
CREATE TABLE calories (id VARCHAR(20), date DATE, calories INT);
--
-- heartrate_seconds_merged
DROP TABLE IF EXISTS heartrate_seconds;
CREATE TABLE heartrate_seconds (id VARCHAR(20), date DATETIME, value INT);
--
-- dailyActivity_merged
DROP TABLE IF EXISTS daily_activities;
CREATE TABLE daily_activities (
  id VARCHAR(20),
  date DATE,
  steps INT,
  total_distance DECIMAL(5, 3),
  tracker_distance DECIMAL(5, 3),
  logged_activities_distance DECIMAL(5, 3),
  very_active_distance DECIMAL(5, 3),
  moderately_active_distance DECIMAL(5, 3),
  light_active_distance DECIMAL(5, 3),
  sedentary_active_distance DECIMAL(5, 3),
  very_active_minutes INT,
  fairly_active_minutes INT,
  lightly_active_minutes INT,
  sedentary_minutes INT,
  calories INT
);
--
-- sleepDay_merged
DROP TABLE IF EXISTS sleep_day;
CREATE TABLE sleep_day (
  id VARCHAR(20),
  date DATE,
  total_sleep_record INT,
  total_minutes_asleep INT,
  total_time_inbed INT
);