function sanitizeArray(rows = []) {
  return rows
    .map((row) => {
      const nonNull = row.findIndex((cell) => cell !== null);
      if (nonNull > 0) {
        return row.slice(nonNull);
      }
    })
    .filter((r) => r != undefined);
}

module.exports = {
  sanitizeArray,
};
