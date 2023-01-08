/*
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});



logger.info('Info message');
logger.error('Error message');
logger.warn('Warning message');

const winston = require('winston');
const { combine, timestamp, json } = winston.format


const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A', // 2022-01-25 03:23:10.350 PM
      })
      , json()),
  transports: [new winston.transports.Console()],
});

logger.info('Info message')

*/
/*

const winston = require('winston');
const { combine, timestamp, printf, colorize, align } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
      colorize({ all: true }),
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
      }),
      align(),
      printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [new winston.transports.Console()],
});

logger.info('Info message');
logger.error('Error message');
logger.warn('Warning message');*/
/*
const winston = require('winston');
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: 'combined.log',
    }),
    new winston.transports.File({
      filename: 'app-error.log',
      level: 'error',
    }),
  ],
});



logger.info('Info message');
logger.error('Error message');
logger.warn('Warning message');


*/
/*

const winston = require('winston');
require('winston-daily-rotate-file');

const { combine, timestamp, json } = winston.format;

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: 'combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), json()),
  transports: [fileRotateTransport],
});

// fired when a log file is created
fileRotateTransport.on('new', (filename) => {
  console.log("a new log file is created");
});
// fired when a log file is rotated
fileRotateTransport.on('rotate', (oldFilename, newFilename) => {
  console.log("a new log file is rotated");
});
// fired when a log file is archived
fileRotateTransport.on('archive', (zipFilename) => {
  console.log("a new log file is archived");
});
// fired when a log file is deleted
fileRotateTransport.on('logRemoved', (removedFilename) => {
  console.log("a new log file is removed");
});



logger.info('Info message');
logger.error('Error message');
logger.warn('Warning message');*/
/*
const winston = require('winston')

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: {
    service: 'admin-service',
  },
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

const childLogger = logger.child({ requestId: 'f9ed4675f1c53513c61a3b3b4e25b4c0' });

childLogger.info('File uploaded successfully', {
  file: 'something.png',
  type: 'image/png',
  userId: 'jdn33d8h2',
});




logger.info('Info message');
logger.error('Error message');
*/
/*
const winston = require("winston");
const { combine, timestamp, json, errors } = winston.format;
const logger = winston.createLogger({
  level: "info",
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [new winston.transports.Console()],
});

logger.error(new Error("an error"));


*/

const winston = require('winston');
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exception.log' }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: 'rejections.log' }),
  ],
});
// start a timer
const profiler = logger.startTimer();

setTimeout(() => {
  // End the timer and log the duration
  profiler.done({ message: 'Logging message' });
}, 1000);








