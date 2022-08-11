'use strict';

const readXlsxFile = require('read-excel-file/node');

const studentRepository = require('../database/repositories/students');
const ticketService = require('../tickets/tickets.service');
const { sanitizeArray } = require('../utils');
const { TICKET_STATUS } = require('../utils/constants');
const { removeUploadedFile } = require('../utils/files');
const { publishTicket } = require('../utils/queue');
const { isValidStudent } = require('../utils/validators');

async function getStudents(id) {
  return studentRepository.get({
    field: 'id',
    value: id,
  });
}

async function saveStudent(student) {
  let alreadyExists;
  if (student.email) {
    alreadyExists = await studentRepository.get({
      field: 'email',
      value: student.email,
    });
    console.log('alread exists email', alreadyExists);
  } else if (student.idNumber) {
    alreadyExists = await studentRepository.get({
      field: 'idNumber',
      value: student.idNumber,
    });
    console.log('alread exists idNumber', alreadyExists);
  }
  if (alreadyExists) {
    throw new Error(`E-mail already registered: ${student.email}`);
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
  return row.map((cell) => {
    return {
      name: cell[0],
      maritalStatus: cell[1],
      email: cell[2],
      idNumber: cell[3],
      identity: cell[4],
      birthDate: cell[5],
      gender: cell[6],
    };
  });
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
  Promise.all(promises)
    .then((result) => {
      console.log(`File processed successfully with ${result.length} new student(s)`);

      // Set ticket's status to done in case of success
      publishTicket({
        code: ticket.code,
        status: TICKET_STATUS.STATUS_DONE,
      });
    })
    .catch((error) => {
      console.error(`Failed to process file: ${error.message}`);

      // Set ticket's status to error in case of failure
      publishTicket({
        code: ticket.code,
        status: TICKET_STATUS.STATUS_ERROR,
        error: error.message,
      });
    })
    .finally(() => {
      removeUploadedFile(ticket.filename);
    });
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
  return id;
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
  updateStudent,
};
