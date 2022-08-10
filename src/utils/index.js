function generateTicket(length = 5) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const randomArray = Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)],
  );
  return randomArray.join('');
}

function sanitizeArray(rows = []) {
  rows = rows
    .map((row) => {
      const validCells = row.filter((cell) => cell != null);
      if (validCells.length > 0) {
        return validCells;
      }
    })
    .filter((r) => r != undefined);
  return rows;
}

module.exports = {
  generateTicket,
  sanitizeArray,
};
