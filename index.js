// const winston = require('winston');
//
// const logger = winston.createLogger({
//   level: process.env.LOG_LEVEL || 'info',
//   format: winston.format.cli(),
//   transports: [new winston.transports.Console()],
// });
//
//
//
// logger.info('Info message');
// logger.error('Error message');
// logger.warn('Warning message');

const winston = require('winston');
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), json()),
  transports: [new winston.transports.Console()],
});

logger.info('Info message')

