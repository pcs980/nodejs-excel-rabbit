const { sanitizeArray } = require('../../src/utils');

describe('Test Utilities', () => {
  test('should sanitize an array', () => {
    const array = [
      [ null, null, null],
      [ null, 'mary@gmail.com', 'Mary Smith'],
      [ null, 'john@gmail.com', null],
    ];

    const result = sanitizeArray(array);
    expect(result).toHaveLength(2);
    expect(result[0][0]).toBe('mary@gmail.com');
    expect(result[1][1]).toBe(null);
  });
});