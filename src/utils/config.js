'use strict';

module.exports = {
  APP_PORT: process.env.PORT ?? 3000,
  LOG_LEVEL: process.env.LOG_LEVEL ?? 'debug',
  QUEUE_URL: process.env.QUEUE_URL ?? 'amqp://guest:guest@localhost:5672',
};
