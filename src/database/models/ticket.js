const { generateTicket } = require('../../utils/generators');
const { TICKET_STATUS } = require('../../utils/constants');

class Ticket {
  constructor(ticket) {
    this.code = ticket.code || generateTicket();
    this.filename = ticket.filename || '';
    this.status = TICKET_STATUS.STATUS_CREATED;
    this.error = '';
  }
}

module.exports = {
  Ticket,
};
