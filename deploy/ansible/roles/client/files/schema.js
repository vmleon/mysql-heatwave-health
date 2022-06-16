const schemaName = 'fitbit';

session.createSchema(schemaName);
session.setCurrentSchema(schemaName);

// Util.importTable: A classic protocol session is required to perform this operation. (RuntimeError)
util.importTable('/home/opc/fitbit/weightLogInfo_merged.csv', {
  schema: 'fitbit',
  table: 'weight',
  dialect: 'csv-unix',
  skipRows: 1,
  showProgress: true,
});

// db.help();

// util.help("importJson");
