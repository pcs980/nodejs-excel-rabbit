const studentRepository = require('../../../src/database/repositories/students');

describe('Student repository', () => {
  test('should save a student', () => {
    const student = {
      id: '04aaf066-a63c-4157-81bd-bcfbedfb1c17',
      name: 'Val Silva',
      email: 'valsilva@gmail.com',
      maritalStatus: 'CASADO(A)',
      taxpayerNumber: '111.222.333-44',
      identity: '88.999-00',
      gender: 'FEMININO',
    };

    const result = studentRepository.save(student);
    expect(result).toMatchObject(student);
    expect(result.id).toBe(student.id);
    expect(result.name).toBe(student.name);
    expect(result.gender).toBe(student.gender);
    expect.assertions(4);
  });

  test('should update a student', () => {
    const student = {
      id: '04aaf066-a63c-4157-81bd-bcfbedfb1c17',
      name: 'Val Silva',
      email: 'vsilva@outlook.com',
      maritalStatus: 'CASADO(A)',
      taxpayerNumber: '111.222.333-44',
      identity: '88.999-00',
      gender: 'FEMININO',
    };

    const result = studentRepository.update(student);
    expect(result.name).toBe(student.name);
    expect(result.email).toBe(student.email);
    expect.assertions(2);
  });

  test('should get a student by id', () => {
    const result = studentRepository.get({
      field: 'id',
      value: '04aaf066-a63c-4157-81bd-bcfbedfb1c17',
    });
    expect(result.id).toBe('04aaf066-a63c-4157-81bd-bcfbedfb1c17');
    expect(result.name).toBe('Val Silva');
    expect.assertions(2);
  });

  test('should get all students', () => {
    const result = studentRepository.get();
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Val Silva');
    expect.assertions(2);
  });

  test('should remove a student', () => {
    studentRepository.remove('04aaf066-a63c-4157-81bd-bcfbedfb1c17');

    const result = studentRepository.get();
    expect(result).toHaveLength(0);
  });
});