'use strict';

const {
  checkIdParam,
  checkRequestBody,
} = require('../middlewares/enforceRequest');
const { uploadMiddleware } = require('../middlewares/multer');
const {
  getAllStudents,
  getStudentById,
  removeStudentById,
  updateStudentById,
  uploadStudents,
} = require('./students.controller');

module.exports = (app) => {
  app.get('/students', getAllStudents);
  app.post('/students/upload', uploadMiddleware.single('file'), uploadStudents);
  app.get('/students/:id', checkIdParam, getStudentById);
  app.delete('/students/:id', checkIdParam, removeStudentById);
  app.put('/students/:id', checkIdParam, checkRequestBody, updateStudentById);
};
