'use strict';

const { app } = require('./app');
const { APP_PORT } = require('./utils/config');
const { connectQueue, consumeQueue } = require('./utils/queue');
const { QUEUE_TICKET_STATUS } = require('./utils/constants');
const { updateTicketStatus } = require('./tickets/tickets.service');
const { createUploadFolder } = require('./utils/files');

(async () => {
  // Create folder to receive sheatsheets with new students
  createUploadFolder();

  // Connect to queue and start consumers
  await connectQueue();
  consumeQueue(QUEUE_TICKET_STATUS, updateTicketStatus);
})();

// Start server
module.exports = app.listen(APP_PORT, () => {
  console.log(`Service 'Proz Alunos' ready and listening at ${APP_PORT} port`);
});
