const path = require('path');

const { supertest } = require('../setup');
const studentService = require('../../src/students/students.service');
const { ALL_STUDENTS, SINGLE_STUDENT } = require('../fixtures/students.mock');
const { SINGLE_TICKET } = require('../fixtures/tickets.mock');

describe('Students routes', () => {
  test('should upload a file with new students', async () => {
    jest.spyOn(studentService, 'receiveStudentsFile')
      .mockResolvedValueOnce(SINGLE_TICKET);

    const { body } = await supertest.post('/students/upload')
      .attach('file', path.join(process.cwd(), '/test/fixtures/planilha_alunos.xlsx'))
      .expect(201);

    expect(body).not.toBeUndefined();
    expect(body.ticket.status).toBe('STATUS_CREATED');
    expect.assertions(2);
  });

  test('should get all students', async () => {
    jest.spyOn(studentService, 'getStudents')
      .mockResolvedValueOnce(ALL_STUDENTS);
    const { body } = await supertest.get('/students')
      .expect(200);

    expect(body).toHaveLength(2);
    expect(body[0].name).toBe('João Santos');
    expect(body[1].name).toBe('Val Silva');
  });

  test('should get a student by id', async () => {
    jest.spyOn(studentService, 'getStudents')
      .mockResolvedValueOnce(SINGLE_STUDENT);

    const id = SINGLE_STUDENT.id;
    const { body } = await supertest.get(`/students/${id}`)
      .expect(200);

    expect(body.id).toBe(id);
    expect(body.name).toBe('João Santos');
  });

  test('should receive error when student does not exist', async () => {
    jest.spyOn(studentService, 'getStudents')
      .mockResolvedValueOnce(undefined);

    const { body } = await supertest.get('/students/a1b2c3-d4e5f6')
      .expect(404);

    expect(body.error).toBe('Student not found');
  });

  test('should update a student', async () => {
    jest.spyOn(studentService, 'getStudents')
      .mockResolvedValueOnce(SINGLE_STUDENT);
    jest.spyOn(studentService, 'updateStudent')
      .mockResolvedValueOnce(SINGLE_STUDENT);

    const { body } = await supertest.put('/students/a1b2c3-d4e5f6')
      .send(SINGLE_STUDENT)
      .expect(200);

    expect(body).not.toBeUndefined();
    expect(body.name).toBe('João Santos');
    expect(body.email).toBe('joaosantos@gmail.com');
    expect.assertions(3);
  });

  test('should receive error when student does not exist', async () => {
    jest.spyOn(studentService, 'getStudents')
      .mockResolvedValueOnce(undefined);
    const spyUpdate = jest.spyOn(studentService, 'updateStudent');

    const { body } = await supertest.put('/students/a1b2c3-d4e5f6')
      .send(SINGLE_STUDENT)
      .expect(404);

    expect(spyUpdate).not.toHaveBeenCalled();
    expect(body).not.toBeUndefined();
    expect(body.error).toBe('Student not found');
    expect.assertions(3);
  });

  test('should remove a student', async () => {
    jest.spyOn(studentService, 'getStudents')
      .mockResolvedValueOnce(SINGLE_STUDENT);
    jest.spyOn(studentService, 'removeStudent')
      .mockResolvedValueOnce(undefined);

    await supertest.delete('/students/a1b2c3-d4e5f6')
      .expect(204);
  });
});
