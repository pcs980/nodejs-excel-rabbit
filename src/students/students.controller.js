'use strict';

const { removeUploadedFile } = require('../utils/files');
const studentService = require('./students.service');

async function getAllStudents(_, res) {
  const result = await studentService.getStudents();
  res.status(200).json(result);
}

async function getStudentById(req, res) {
  const { id } = req.params;
  const result = await studentService.getStudents(id);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
}

async function removeStudentById(req, res) {
  const { id } = req.params;

  try {
    const student = await studentService.getStudents(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    await studentService.removeStudent(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateStudentById(req, res) {
  const { id } = req.params;

  try {
    const student = await studentService.getStudents(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const result = await studentService.updateStudent({
      ...student,
      ...req.body,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function uploadStudents(req, res) {
  try {
    const ticket = await studentService.receiveStudentsFile(req.file);
    removeUploadedFile(req.file.filename);
    res.status(201).json({ ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  removeStudentById,
  uploadStudents,
  updateStudentById,
};
