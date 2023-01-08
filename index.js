const winston = require('winston');

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});



// logger.info('Info message');
// logger.error('Error message');
// logger.warn('Warning message');

logger.emerg("Emergency");
logger.crit("Critical");
logger.warning("Warning");

