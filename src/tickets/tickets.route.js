'use strict';

const { checkIdParam } = require('../middlewares/enforceRequest');
const { getTicketById, getAllTickets } = require('./tickets.controller');

module.exports = (app) => {
  app.get('/tickets', getAllTickets);
  app.get('/tickets/:id', checkIdParam, getTicketById);
};
