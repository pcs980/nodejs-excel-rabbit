const { generateTicket } = require('../../utils');
const { TICKET_STATUS } = require('../../utils/constants');

class Ticket {
  constructor(ticket) {
    this.code = ticket.code || generateTicket();
    this.fileName = ticket.fileName || '';
    this.status = TICKET_STATUS.STATUS_CREATED;
  }
}

module.exports = {
  Ticket,
};
