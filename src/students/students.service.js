'use strict';

const readXlsxFile = require('read-excel-file/node');

const studentRepository = require('../database/repositories/students');
const ticketService = require('../tickets/tickets.service');
const { sanitizeArray } = require('../utils');
const { TICKET_STATUS } = require('../utils/constants');
const { publishTicket } = require('../utils/queue');
const { isValidStudent } = require('../utils/validators');

async function getStudents(id) {
  if (id) {
    return studentRepository.get({
      field: 'id',
      value: id,
    });
  }
  return studentRepository.get();
}

async function validateRequest(student) {
  if (!isValidStudent(student)) {
    return 'Invalid request';
  }

  let alreadyExists;
  if (student.email) {
    alreadyExists = await studentRepository.get({
      field: 'email',
      value: student.email,
    });
    if (alreadyExists) {
      return `E-mail already registered: ${student.email}`;
    }
  }
  if (student.taxpayerNumber) {
    alreadyExists = await studentRepository.get({
      field: 'taxpayerNumber',
      value: student.taxpayerNumber,
    });
    if (alreadyExists) {
      return `Taxpayer number already registered: ${student.taxpayerNumber}`;
    }
  }
}

/**
 * Save new student
 * @param {object} student
 * @param {string} student.name
 * @param {string} student.email
 * @param {string} student.maritalStatus
 * @param {string} student.gender
 * @returns
 */
async function saveStudent(student) {
  const requestError = await validateRequest(student);
  if (requestError) {
    throw new Error(requestError);
  }

  return studentRepository.save(student);
}

/**
 * Parse from array of strings to Student object
 * @param {string[]} row
 * @returns {Student}
 */
function parseStudentsFromArray(row = []) {
  // Create Student object from file row. Example of row:
  // [
  //   'João dos Santos',
  //   'SOLTEIRO(A)',
  //   'joaosantos@gmail.com',
  //   '648.390.370-78',
  //   '31.395.090-8',
  //   '1946-05-27T00:00:00.000Z',
  //   'Masculino'
  // ]
  return row.map((cell) => ({
    name: cell[0],
    maritalStatus: cell[1],
    email: cell[2],
    taxpayerNumber: cell[3],
    identity: cell[4],
    birthDate: cell[5],
    gender: cell[6],
  }));
}

async function startFileProcessing(file, ticket) {
  // Read file and parse rows
  const rows = await readXlsxFile(file?.path);
  const sanitizedRows = sanitizeArray(rows);
  const parsedStudents = parseStudentsFromArray(sanitizedRows);
  const promises = [];

  // Prepare insertion for each student
  parsedStudents.forEach((student) => {
    if (isValidStudent(student)) {
      promises.push(
        saveStudent({
          ...student,
          ticket: ticket.code,
        }),
      );
    }
  });

  // Check insertions results
  try {
    const result = await Promise.all(promises);

    // Set ticket's status to done in case of success
    publishTicket({
      code: ticket.code,
      status: TICKET_STATUS.STATUS_DONE,
    });

    return result;
  } catch (error) {
    // Set ticket's status to error in case of failure
    publishTicket({
      code: ticket.code,
      status: TICKET_STATUS.STATUS_ERROR,
      error: error.message,
    });
  }
}

async function receiveStudentsFile(file) {
  try {
    const ticket = await ticketService.saveTicket({
      filename: file.filename,
    });

    startFileProcessing(file, ticket);

    return ticket;
  } catch (error) {
    console.error('Error reading schedule file', error);
    throw new Error('Error reading schedule file');
  }
}

async function removeStudent(id) {
  return studentRepository.remove(id);
}

/**
 * Update Student
 * @param {string} id
 * @param {object} student
 * @param {string} student.name
 * @param {string} student.email
 */
async function updateStudent(student) {
  return studentRepository.update(student);
}

module.exports = {
  getStudents,
  receiveStudentsFile,
  removeStudent,
  startFileProcessing,
  saveStudent,
  updateStudent,
};
