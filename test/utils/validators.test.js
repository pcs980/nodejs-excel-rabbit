const { isValidStudent } = require('../../src/utils/validators');

describe('Student Validator utility', () => {
  const student = {
    name: 'Val Silva',
    email: 'valsilva@gmail.com',
    maritalStatus: 'CASADO(A)',
    birthDate: '12/10/1984',
    gender: 'Feminino',
  };

  test('should identify valid student', () => {
    expect(isValidStudent(student)).toBe(true);
  });

  test('should identify invalid student name', () => {
    expect(isValidStudent({
      ...student,
      name: undefined,
    })).toBe(false);
  });

  test('should identify invalid student email', () => {
    expect(isValidStudent({
      ...student,
      email: 'invalidemail.com.br',
    })).toBe(false);
  });

  test('should identify invalid student birth date', () => {
    expect(isValidStudent({
      ...student,
      birthDate: '16-out-1980',
    })).toBe(false);
  });
});