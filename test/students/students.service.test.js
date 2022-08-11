const path = require('path');

const studentService = require('../../src/students/students.service');
const studentRepository = require('../../src/database/repositories/students');
const { SINGLE_STUDENT } = require('../fixtures/students.mock');
const { TICKET_STATUS } = require('../../src/utils/constants');

jest.mock('../../src/utils/queue', () => ({
  ...jest.requireActual('../../src/utils/queue'),
  publishTicket: jest.fn(),
}));

describe('Student service', () => {
  const file = {
    filename: 'planilha_alunos.xlsx',
    path: path.join(process.cwd(), '/test/fixtures/planilha_alunos.xlsx'),
  };

  test('should process a file and save new students', async () => {
    const result = await studentService.startFileProcessing(file, { code: 'AB1234'});
    expect(result).toHaveLength(3);
  });

  test('should return a ticket when receiving a file with new students', async () => {
    jest.mock('../../src/students/students.service', () => ({
      ...jest.requireActual('../../src/students/students.service'),
      startFileProcessing: undefined,
    }));

    const result = await studentService.receiveStudentsFile(file);
    expect(result.code).toBeDefined();
    expect(result.code).toHaveLength(6);
    expect(result.filename).toBe('planilha_alunos.xlsx');
    expect(result.status).toBe(TICKET_STATUS.STATUS_CREATED);
    expect.assertions(4);
  });

  test('should save a new student', async () => {
    jest.spyOn(studentRepository, 'get')
      .mockResolvedValueOnce(undefined);
    jest.spyOn(studentRepository, 'save')
      .mockResolvedValueOnce(SINGLE_STUDENT);

    const result = await studentService.saveStudent({
      name: 'João Santos',
      email: 'joaosantos@gmail.com',
      maritalStatus: 'SOLTEIRO(A)',
      gender: 'MASCULINO',
    });

    expect(result.id).toBeDefined();
    expect(result.id).toBe(SINGLE_STUDENT.id);
    expect(result.name).toBe(SINGLE_STUDENT.name);
    expect.assertions(3);
  });

  test('should throw error when the e-mail is already registered', async () => {
    jest.spyOn(studentRepository, 'get')
      .mockResolvedValueOnce(SINGLE_STUDENT);
    const spySave = jest.spyOn(studentRepository, 'save');

    try {
      await studentService.saveStudent({
        name: 'João Santos',
        email: 'joaosantos@gmail.com',
        maritalStatus: 'SOLTEIRO(A)',
        gender: 'MASCULINO',
      });
    } catch (error) {
      expect(spySave).not.toBeCalled();
      expect(error.message).toMatch(/E-mail already registered/);
    }
    expect.assertions(2);
  });

  test('should throw error when the taxpayer number is already registered', async () => {
    jest.spyOn(studentRepository, 'get')
      .mockResolvedValueOnce(undefined);
    jest.spyOn(studentRepository, 'get')
      .mockResolvedValueOnce(SINGLE_STUDENT);
    const spySave = jest.spyOn(studentRepository, 'save');

    try {
      await studentService.saveStudent({
        name: 'João Santos',
        email: 'joaosantos@gmail.com',
        taxpayerNumber: '111.222.333-44',
        maritalStatus: 'SOLTEIRO(A)',
        gender: 'MASCULINO',
      });
    } catch (error) {
      expect(spySave).not.toBeCalled();
      expect(error.message).toMatch(/Taxpayer number already registered/);
    }
    expect.assertions(2);
  });

  test('should get student by id', async () => {
    jest.spyOn(studentRepository, 'get')
      .mockResolvedValueOnce(SINGLE_STUDENT);

    const result = await studentService.getStudents(SINGLE_STUDENT.id);
    expect(result.name).toBe('João Santos');
  });

  test('should remove student by id', async () => {
    jest.spyOn(studentRepository, 'remove')
      .mockResolvedValueOnce(undefined);

    const result = await studentService.removeStudent(SINGLE_STUDENT.id);
    expect(result).not.toBeDefined();
  });
});
