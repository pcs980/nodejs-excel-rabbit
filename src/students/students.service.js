'use strict';

const readXlsxFile = require('read-excel-file/node');
const ticketRepository = require('../database/repositories/tickets');

async function receiveStudentsFile(file) {
  try {
    const rows = await readXlsxFile(file.path);
    rows.forEach((student) => console.log(student[1]));
    console.log(JSON.stringify(rows));

    const ticket = ticketRepository.save({
      fileName: file.fileName,
    });
    return ticket;
  } catch (error) {
    console.error('Error reading schedule file', error);
    throw new Error('Error reading schedule file');
  }
}

module.exports = {
  receiveStudentsFile,
};
