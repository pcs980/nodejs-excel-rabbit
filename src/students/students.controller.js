'use strict';

function getAllStudents(req, res) {
  console.log(req.query);
  res.status(200).send('Not implemented yet');
}

function getStudentById(req, res) {
  console.log(req.query);
  res.status(200).send('Not implemented yet');
}

function updateStudentById(req, res) {
  console.log(req.body);
  res.status(200).send('Not implemented yet');
}

function uploadStudents(req, res) {
  console.log(req.body);
  res.status(200).send('Not implemented yet');
}

module.exports = {
  getAllStudents,
  getStudentById,
  uploadStudents,
  updateStudentById
};
