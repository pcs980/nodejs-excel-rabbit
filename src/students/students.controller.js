'use strict';

const { receiveStudentsFile, getStudents, updateStudent } = require('./students.service');

async function getAllStudents(_, res) {
  const result = await getStudents();
  res.status(200).json(result);
}

async function getStudentById(req, res) {
  const { id } = req.params;
  const result = await getStudents(id);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
}

async function removeStudentById(req, res) {
  const { id } = req.params;

  try {
    const student = await getStudents(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found'});
    }

    res.status(200).json({ implemented: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateStudentById(req, res) {
  const { id } = req.params;

  try {
    const student = await getStudents(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found'});
    }

    const result = await updateStudent({
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
    const ticket = await receiveStudentsFile(req.file);
    res.status(200).json({ ticket });
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
