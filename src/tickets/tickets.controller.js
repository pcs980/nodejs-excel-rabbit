'use strict';

const ticketService = require('./tickets.service');

async function getAllTickets(_, res) {
  const result = await ticketService.getTickets();
  res.status(200).json(result);
}

async function getTicketById(req, res) {
  const { id } = req.params;
  const result = await ticketService.getTickets(id);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ error: 'Ticket not found' });
  }
}

module.exports = {
  getAllTickets,
  getTicketById,
};
