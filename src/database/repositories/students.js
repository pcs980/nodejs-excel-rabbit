const { Student } = require('../models/student');
let students = [];

function save(student) {
  const newStudent = new Student(student);
  students.push(newStudent);
  return newStudent;
}

function get({ field, value }) {
  if (field) {
    const indexOf = students.findIndex((s) => s[field] === value);
    if (indexOf >= 0) {
      return students[indexOf];
    }
  } else {
    return students.sort((a, b) => a.name.localeCompare(b.name));
  }
}

function update(request) {
  const student = new Student(request);
  students = [
    ...students.filter((s) => s.id !== student.id),
    student,
  ];
  return student;
}

function remove(id) {
  students = [...students.filter((s) => s.id !== id)];
}

module.exports = {
  get,
  remove,
  save,
  update,
};
