function isEmpty(value) {
  if (!value) {
    return true;
  }
  return String(value).trim().length === 0;
}

function isValidDate(date) {
  return !(new Date(date).toString() === 'Invalid Date');
}

module.exports = {
  isEmpty,
  isValidDate,
};
