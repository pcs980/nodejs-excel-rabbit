const { v4: uuid } = require('uuid');

function generateUuid() {
  return uuid();
}

function generateTicket() {
  const letters = 'ABCDEFGH';
  const numbers = '123456789';
  const randomArray = [
    ...Array.from(
      { length: 2 },
      () => letters[Math.floor(Math.random() * letters.length)]
    ),
    ...Array.from(
      { length: 4 },
      () => numbers[Math.floor(Math.random() * numbers.length)]
    ),
  ];
  return randomArray.join('');
}

module.exports = {
  generateTicket,
  generateUuid,
};
