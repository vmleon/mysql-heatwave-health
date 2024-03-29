const http = require('http');
require('dotenv').config();
const express = require('express');
const pinoHttp = require('pino-http')();
const pino = require('pino');
const {Parser} = require('node-sql-parser/build/mysql');
const compression = require('compression');
const {createTerminus} = require('@godaddy/terminus');
const db = require('./db');
const auth = require('./auth');

const {PORT, LOG_LEVEL} = process.env;
const logger = pino({level: LOG_LEVEL});

const app = express();
const sqlParser = new Parser();
const sqlParserOpts = {
  database: 'MySQL',
};

app.use(pinoHttp);
app.use(express.json());
app.use(compression());

app.get('/api/v1/', async (req, res, next) => {
  const query = 'SELECT 1';
  try {
    const results = await db.query(query);
    res.json({message: results[0]});
  } catch (error) {
    logger.error(`Error while getting "${query}" from MySQL: ${error.message}`);
    next(error);
  }
});

app.get('/api/v1/login', auth, async (req, res, next) => {
  res.json({status: 'ok'});
});

app.post('/api/v1/perf', auth, async (req, res, next) => {
  const query = req.body.query;
  const number = req.body.number || 5;
  const limit = req.body.limit || 1000;
  if (!validQuery(query)) {
    res.status(400).json({status: 400, message: 'Invalid query'});
  }
  try {
    const benchmark = await run(query, number, limit);
    res.json(benchmark);
  } catch (error) {
    logger.error(`Error while getting "${query}" from MySQL: ${error.message}`);
    res.status(400).json({error: true, message: error.message});
  }
});

app.post('/api/v1/rapid', auth, async (req, res, next) => {
  const operation = req.body.operation;
  // if (!validQuery(query)) {
  //   res.status(400).json({status: 400, message: 'Invalid query'});
  // }
  try {
    const result = await enableHeatwave();
    logger.info(result);
    res.json(result);
  } catch (error) {
    logger.error(`Error while getting heatwave enabled: ${error.message}`);
    res.status(400).json({error: true, message: error.message});
  }
});

async function run(query, num, limit) {
  const ast = sqlParser.astify(query, sqlParserOpts);
  ast[0].limit = {
    seperator: '',
    value: [
      {
        type: 'number',
        value: limit,
      },
    ],
  };
  const sql = sqlParser.sqlify([ast[0]], sqlParserOpts);
  const vector = new Array(num).fill();
  for (let index = 0; index < vector.length; index++) {
    const connection = await db.getConnection();
    const startTime = process.hrtime();
    await db.query(connection, sql);
    vector[index] = {number: index, responseTime: process.hrtime(startTime)[0]};
    connection.close();
  }
  return vector;
}

async function enableHeatwave() {
  const connection = await db.getConnection();
  try {
    const result = await db.query(
      connection,
      "CALL sys.heatwave_load(JSON_ARRAY('fitbit'), NULL);",
    );
    return result;
  } catch (error) {
    logger.error(`Error while getting heatwave enabled: ${error.message}`);
    throw new Error(error.message);
  } finally {
    connection.close();
  }
}

function validQuery(query) {
  if (!query) {
    return false;
  }
  if (!query.startsWith('SELECT ')) {
    return false;
  }
  return true;
}

const server = http.createServer(app);
// const io = require('socket.io')(server);

// io.on('connection', () => {
//   console.log('Connection...');
// });

function onSignal() {
  logger.info('server is starting cleanup');
}

async function onHealthCheck() {
  return new Promise((resolve) => resolve());
}

createTerminus(server, {
  signal: 'SIGINT',
  healthChecks: {'/healthcheck': onHealthCheck},
  onSignal,
});

server.listen(PORT, () => {
  logger.info(`MySQL Backend app listening on port ${PORT}`);
});
