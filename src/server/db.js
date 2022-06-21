const mysql = require('mysql2/promise');

const {MYSQL_HOST, MYSQL_PASSWORD, MYSQL_USER, MYSQL_DATABASE, MYSQL_PORT} = process.env;

async function getConnection() {
  const connection = await mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
    port: MYSQL_PORT,
  });
  return connection;
}

async function query(connection, sql, params) {
  const [results] = await connection.execute(sql, params);
  return results;
}

module.exports = {
  query,
  getConnection,
};
