const ticketRepository = require('../../../src/database/repositories/tickets');
const { TICKET_STATUS } = require('../../../src/utils/constants');

describe('Ticket repository', () => {
  test('should save a ticket', async () => {
    const ticket = {
      code: 'AB1234',
      filename: 'planilha.xlsx',
    };

    const result = ticketRepository.save(ticket);
    expect(result).toMatchObject(ticket);
    expect(result.code).toBe('AB1234');
    expect(result.filename).toBe('planilha.xlsx');
    expect(result.status).toBe(TICKET_STATUS.STATUS_CREATED);
    expect.assertions(4);
  });

  test('should update a ticket', async () => {
    const ticket = {
      code: 'AB1234',
      filename: 'planilha.xlsx',
      status: TICKET_STATUS.STATUS_DONE,
    };

    const result = ticketRepository.update(ticket);
    expect(result.code).toBe(ticket.code);
    expect(result.filename).toBe(ticket.filename);
    expect(result.status).toBe(ticket.status);
    expect.assertions(3);
  });

  test('should get a ticket by code', async () => {
    const result = ticketRepository.get('AB1234');
    expect(result.code).toBe('AB1234');
    expect(result.filename).toBe('planilha.xlsx');
    expect(result.status).toBe(TICKET_STATUS.STATUS_DONE);
    expect.assertions(3);
  });

  test('should get all tickets', async () => {
    const result = ticketRepository.get();
    expect(result).toHaveLength(1);
    expect(result[0].code).toBe('AB1234');
    expect(result[0].filename).toBe('planilha.xlsx');
    expect(result[0].status).toBe(TICKET_STATUS.STATUS_DONE);
    expect.assertions(4);
  });
});