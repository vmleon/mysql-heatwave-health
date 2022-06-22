// dailyCalories_merged
util.importTable('/home/opc/fitbit/dailyCalories_merged.csv', {
  schema: 'fitbit',
  table: 'calories',
  columns: [1, 2, 3],
  decodeColumns: {
    id: '@1',
    date: 'STR_TO_DATE(@2, "%m/%d/%Y")',
    calories: '@3',
  },
  dialect: 'csv-unix',
  skipRows: 1,
  showProgress: true,
});

// heartrate_seconds_merged
util.importTable('/home/opc/fitbit/heartrate_seconds_merged.csv', {
  schema: 'fitbit',
  table: 'heartrate_seconds',
  columns: [1, 2, 3],
  decodeColumns: {
    id: '@1',
    date: 'STR_TO_DATE(@2,"%m/%d/%Y %h:%i:%s %p")',
    value: '@3',
  },
  dialect: 'csv-unix',
  skipRows: 1,
  showProgress: true,
});

// dailyActivity_merged
util.importTable('/home/opc/fitbit/dailyActivity_merged.csv', {
  schema: 'fitbit',
  table: 'daily_activities',
  columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  decodeColumns: {
    id: '@1',
    date: 'STR_TO_DATE(@2, "%m/%d/%Y")',
    steps: '@3',
    total_distance: '@4',
    tracker_distance: '@5',
    logged_activities_distance: '@6',
    very_active_distance: '@7',
    moderately_active_distance: '@8',
    light_active_distance: '@9',
    sedentary_active_distance: '@10',
    very_active_minutes: '@11',
    fairly_active_minutes: '@12',
    lightly_active_minutes: '@13',
    sedentary_minutes: '@14',
    calories: '@15',
  },
  dialect: 'csv-unix',
  skipRows: 1,
  showProgress: true,
});

// sleepDay_merged
util.importTable('/home/opc/fitbit/sleepDay_merged.csv', {
  schema: 'fitbit',
  table: 'sleep_day',
  columns: [1, 2, 3, 4, 5],
  decodeColumns: {
    id: '@1',
    date: 'STR_TO_DATE(@2,"%m/%d/%Y %h:%i:%s %p")',
    total_sleep_record: '@3',
    total_minutes_asleep: '@4',
    total_time_inbed: '@5',
  },
  dialect: 'csv-unix',
  skipRows: 1,
  showProgress: true,
});