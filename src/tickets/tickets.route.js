const { getTicketByCode, getAllTickets } = require('./tickets.controller');

module.exports = (app) => {
  app.get('/tickets', getAllTickets);
  app.get('/tickets/:id', getTicketByCode);
};
