const { supertest } = require('../setup');

describe('Tickets routes', () => {
  test('should receive ticket status', async () => {
    const PATH = '/tickets/123';
    const request = {};

    const { body } = await supertest.get(PATH)
      .send(request)
      .expect(200);

    expect(body.implemented).toBe(false);
  });
});
