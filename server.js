const winston = require('winston');
const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const { Logtail } = require('@logtail/node');
const { LogtailTransport } = require('@logtail/winston');

require('dotenv').config()

const logtail = new Logtail(process.env.LOGTAIL_TOKEN);

const app = express();

const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: 'http',
  format: combine(
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
      }),
      json()
  ),
  transports: [new winston.transports.Console(), new LogtailTransport(logtail)],
});

const morganMiddleware = morgan(
    function (tokens, req, res) {
      return JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: Number.parseFloat(tokens.status(req, res)),
        content_length: tokens.res(req, res, 'content-length'),
        response_time: Number.parseFloat(tokens['response-time'](req, res)),
      });
    },
    {
      stream: {
        // Configure Morgan to use our custom logger with the http severity
        write: (message) => {
          const data = JSON.parse(message);
          logger.http(`incoming-request`, data);
        },
      },
    }
);

app.use(morganMiddleware);

app.get('/crypto', async (req, res) => {
  try {
    const response = await axios.get(
        'https://api2.binance.com/api/v3/ticker/24hr'
    );

    const tickerPrice = response.data;

    res.json(tickerPrice);
  } catch (err) {
    logger.error(err);
    res.status(500).send('Internal server error');
  }
});

app.listen('5000', () => {
  console.log('Server is running on port 5000');
});

