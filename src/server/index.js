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
  const query = 'SELECT 1 + 1 AS solution';
  try {
    const results = await db.query(query);
    res.json({message: results[0].solution});
  } catch (error) {
    logger.error(`Error while getting ${query} from MySQL: ${error.message}`);
    next(error);
  }
});

app.post('/api/v1/perf', async (req, res) => {
  const query = req.body.query || '';
  const params = req.params;
  logger.debug(params);
  if (!validQuery(query)) {
    res.status(400).json({status: 400, message: 'Invalid query'});
  }
  try {
    const startTime = process.hrtime();
    const results = await db.query(query);
    const elapsedTime = process.hrtime(startTime);
    res.json({message: results[0].solution, elapsedTime});
  } catch (error) {
    logger.error(`Error while getting ${query} from MySQL: ${error.message}`);
    next(error);
  }
});

function validQuery(query) {
  if (!query.length()) {
    return false;
  }
  if (!query.startWith('SELECT ')) {
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
