'use strict';

const { uploadMiddleware } = require('../middlewares/multer');
const {
  getAllStudents,
  getStudentById,
  updateStudentById,
  uploadStudents,
} = require('./students.controller');

module.exports = (app) => {
  app.get('/students/', getAllStudents);
  app.post('/students/upload', uploadMiddleware.single('file'), uploadStudents);
  app.get('/students/:id', getStudentById);
  app.put('/students/:id', updateStudentById);
};
