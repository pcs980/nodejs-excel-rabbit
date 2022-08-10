'use strict';

const {
  getAllStudents,
  getStudentById,
  updateStudentById,
  uploadStudents,
} = require('./students.controller');

module.exports = (app) => {
  app.get('/students/', getAllStudents);
  app.get('/students/:id', getStudentById);
  app.post('/students', uploadStudents);
  app.put('/students/:id', updateStudentById);
};
