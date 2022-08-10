const { sanitizeArray } = require('../../src/utils');

describe('Test Utilities', () => {
  test('should sanitize an array', () => {
    const array = [
      [ null, null, null],
      [ null, 'mary@gmail.com', 'Mary Smith']
    ];

    const result = sanitizeArray(array);
    expect(result).toHaveLength(1);
    expect(result[0][0]).toBe('mary@gmail.com');
  });
});