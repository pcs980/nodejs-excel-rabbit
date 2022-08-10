const { Student } = require('../models/student');
let students = [];

function save(student) {
  const newStudent = new Student(student);
  students.push(newStudent);
  return students;
}

function get(id) {
  if (id) {
    return students.find((s) => s.id === id);
  } else {
    return students;
  }
}

function update(student) {
  students = [
    ...students.map((s) => s.id !== student.id),
    new Student(student),
  ];
}

function remove(id) {
  students = [...students.map((s) => s.id !== id)];
}

module.exports = {
  get,
  remove,
  save,
  update,
};
