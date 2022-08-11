const amqplib = require('amqplib');

const { QUEUE_URL } = require('./config');
const { QUEUE_NEW_STUDENTS, QUEUE_TICKET_STATUS } = require('./constants');

const studentQueue = QUEUE_NEW_STUDENTS;
const ticketQueue = QUEUE_TICKET_STATUS;
let queueChannel;

async function connectQueue() {
  const connection = await amqplib.connect(QUEUE_URL);
  connection.on('error', (error) => {
    console.error('Queue connection error', error.message);
  });
  connection.on('close', () => {
    console.error('Queue connection closed. Trying to connect.');
    return setTimeout(connectQueue, 5000);
  });

  queueChannel = await connection.createConfirmChannel();
  queueChannel.on('error', (error) => {
    console.error('Queue channel error', error.message);
  });

  queueChannel.assertQueue(studentQueue);
  queueChannel.assertQueue(ticketQueue);
}

function publishStudent(student) {
  queueChannel?.sendToQueue(studentQueue, Buffer.from(JSON.stringify(student)));
}

function publishTicket(code) {
  queueChannel?.sendToQueue(ticketQueue, Buffer.from(JSON.stringify(code)));
}

function consumeQueue(queue, callback) {
  queueChannel.consume(queue, async (message) => {
    if (message != null) {
      try {
        await callback(JSON.parse(message.content.toString()));
        queueChannel.ack(message);
      } catch (error) {
        console.error(
          'Error consuming message',
          message.content.toString(),
          error.message,
        );
      }
    }
  });
}

module.exports = {
  connectQueue,
  publishStudent,
  publishTicket,
  consumeQueue,
};
