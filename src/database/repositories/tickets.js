const { Ticket } = require('../models/ticket');
let tickets = [];

/**
 * Save ticket
 * @param {object} ticket
 * @param {string} ticket.code
 * @param {string} ticket.fileName
 * @param {string} ticket.status
 * @returns Ticket
 */
function save(ticket) {
  const newTicket = new Ticket(ticket);
  tickets.push(newTicket);
  return tickets;
}

function get(code) {
  if (code) {
    return tickets.find((t) => t.code === code);
  } else {
    return tickets;
  }
}

function update(ticket) {
  tickets = [...tickets.map((t) => t.code !== ticket.code), new Ticket(ticket)];
}

function remove(code) {
  tickets = [...tickets.map((t) => t.code !== code)];
}

module.exports = {
  get,
  remove,
  save,
  update,
};
