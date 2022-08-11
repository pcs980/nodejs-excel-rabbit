const { supertest } = require('../setup');
const ticketService = require('../../src/tickets/tickets.service');
const { ALL_TICKETS, SINGLE_TICKET } = require('../fixtures/tickets.mock');

describe('Tickets routes', () => {
  test('should get all tickets', async () => {
    jest.spyOn(ticketService, 'getTickets')
      .mockResolvedValueOnce(ALL_TICKETS);
    const { body } = await supertest.get('/tickets')
      .expect(200);

    expect(body).toHaveLength(2);
  });

  test('should get a ticket by code', async () => {
    jest.spyOn(ticketService, 'getTickets')
      .mockResolvedValueOnce(SINGLE_TICKET);

    const { body } = await supertest.get('/tickets/AB1234')
      .expect(200);

    expect(body.code).toBe('EG3974');
  });

  test('should receive error when ticket does not exist', async () => {
    jest.spyOn(ticketService, 'getTickets')
      .mockResolvedValueOnce(undefined);

    const { body } = await supertest.get('/tickets/AB1234')
      .expect(404);

    expect(body.error).toBe('Ticket not found');
  });
});
