const { Ticket } = require('../models/ticket');

let tickets = [];

function save(ticket) {
  const newTicket = new Ticket(ticket);
  tickets.push(newTicket);
  return newTicket;
}

function get(code) {
  if (code) {
    const indexOf = tickets.findIndex((t) => t.code === code);
    if (indexOf >= 0) {
      return tickets[indexOf];
    }
  } else {
    return tickets;
  }
}

function update(ticket) {
  tickets = [...tickets.filter((t) => t.code !== ticket.code), ticket];
  return ticket;
}

module.exports = {
  get,
  save,
  update,
};
