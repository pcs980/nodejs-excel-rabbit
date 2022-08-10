'use strict';

const { receiveStudentsFile } = require('./students.service');

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

async function uploadStudents(req, res) {
  try {
    const ticket = await receiveStudentsFile(req.file);
    res.status(200).json({ ticket });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  uploadStudents,
  updateStudentById,
};
