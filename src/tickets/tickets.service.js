'use strict';

const ticketRepository = require('../database/repositories/tickets');

async function getTickets(code) {
  return ticketRepository.get(code);
}

async function saveTicket(ticket) {
  return ticketRepository.save(ticket);
}

async function updateTicketStatus({ code, status, error }) {
  const ticket = await ticketRepository.get(code);
  if (!ticket) {
    throw new Error('Error updating ticket: not found');
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
