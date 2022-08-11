function isValidEmail(email) {
  if (email == null) return false;
  const re = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  return re.test(email);
}

function isValidStudent(student) {
  if (!student.name) {
    return false;
  }
  if (student.email && !isValidEmail(student.email)) {
    return false;
  }
  if (student.birthDate && !isValidDate(student.birthDate)) {
    return false;
  }
  return true;
}

function isValidDate(date) {
  return !(new Date(date).toString() === 'Invalid Date');
}

module.exports = {
  isValidStudent,
};
