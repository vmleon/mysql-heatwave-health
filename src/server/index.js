const http = require('http');
require('dotenv').config();
const express = require('express');
const pinoHttp = require('pino-http')();
const pino = require('pino');
const compression = require('compression');
const {createTerminus} = require('@godaddy/terminus');
const db = require('./db');

const {PORT, LOG_LEVEL} = process.env;
const logger = pino({level: LOG_LEVEL});

const app = express();

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

app.post('/api/v1/perf', async (req, res, next) => {
  const query = req.body.query;
  // const params = req.params;
  if (!validQuery(query)) {
    res.status(400).json({status: 400, message: 'Invalid query'});
  }
  try {
    const results = await run(query, 10);
    const benchmark = results.map((t) => (t[0] * 1000000000 + t[1]) / 1000000000);
    res.json(benchmark);
  } catch (error) {
    logger.error(`Error while getting "${query}" from MySQL: ${error.message}`);
    next(error);
  }
});

async function run(query, num) {
  const vector = new Array(num).fill();
  for (let index = 0; index < vector.length; index++) {
    const connection = await db.getConnection();
    const startTime = process.hrtime();
    await db.query(connection, query);
    vector[index] = process.hrtime(startTime);
    connection.close();
  }
  return vector;
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
