'use strict';

const ticketRepository = require('../database/repositories/tickets');

async function getTickets(code) {
  console.log('reach service :(((((');
  return ticketRepository.get(code);
}

async function saveTicket(ticket) {
  return ticketRepository.save(ticket);
}

async function updateTicketStatus({ code, status, error }) {
  const ticket = ticketRepository.get(code);
  if (!ticket) {
    throw new ('Error updating ticket: not found');
  }
  return ticketRepository.update({
    ...ticket,
    code,
    status,
    error,
  });
}

module.exports = {
  getTickets,
  saveTicket,
  updateTicketStatus,
};
