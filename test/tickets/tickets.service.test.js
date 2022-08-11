const ticketService = require('../../src/tickets/tickets.service');
const ticketRepository = require('../../src/database/repositories/tickets');
const { TICKET_STATUS } = require('../../src/utils/constants');
const { ALL_TICKETS, SINGLE_TICKET } = require('../fixtures/tickets.mock');

describe('Ticket service', () => {
  test('should save a ticket with random code', async () => {
    const ticket = {};
    const result = await ticketService.saveTicket(ticket);

    expect(result.code).toBeDefined();
    expect(result.code.length).toBe(6);
    expect(result.status).toBe(TICKET_STATUS.STATUS_CREATED);
  });

  test('should save a ticket with given code', async () => {
    const ticket = {
      code: 'AA1111',
    };
    const result = await ticketService.saveTicket(ticket);

    expect(result.code).toBeDefined();
    expect(result.code.length).toBe(6);
    expect(result.code).toBe('AA1111');
    expect(result.status).toBe(TICKET_STATUS.STATUS_CREATED);
    expect.assertions(4);
  });

  test('should get all tickes', async () => {
    jest.spyOn(ticketRepository, 'get')
      .mockResolvedValueOnce(ALL_TICKETS);
    const result = await ticketService.getTickets();
    expect(result).toHaveLength(2);
    expect(result[0].code).toBe('EG3974');
    expect(result[1].code).toBe('CD8351');
    expect.assertions(3);
  });

  test('should update ticket status', async () => {
    jest.spyOn(ticketRepository, 'get')
      .mockResolvedValueOnce(SINGLE_TICKET);

    const ticket = {
      ...SINGLE_TICKET,
      status: TICKET_STATUS.STATUS_ERROR,
      error: 'Invalid student',
    };
    const result = await ticketService.updateTicketStatus(ticket);
    expect(result.code).toBe('EG3974');
    expect(result.status).toBe('STATUS_ERROR');
    expect(result.error).toBe('Invalid student');
    expect.assertions(3);
  });

  test('should throw error when updating ticket that does not exist', async () => {
    jest.spyOn(ticketRepository, 'get')
      .mockResolvedValueOnce(undefined);

    try {
      const ticket = {
        ...SINGLE_TICKET,
        status: TICKET_STATUS.STATUS_ERROR,
        error: 'Invalid student',
      };
      await ticketService.updateTicketStatus(ticket);
    } catch (error) {
      expect(error.message).toBe('Error updating ticket: not found');
    }
    expect.assertions(1);
  });
});