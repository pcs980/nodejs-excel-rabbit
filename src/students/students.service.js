'use strict';
// const EventEmitter = require('events');

const readXlsxFile = require('read-excel-file/node');

async function receiveStudentsFile(file) {
  try {
    const rows = await readXlsxFile(file.path);
    rows.forEach((student) => console.log(student[1]));
    console.log(JSON.stringify(rows));
  } catch (error) {
    console.error('Error reading schedule file', error);
    throw new Error('Error reading schedule file');
  }

  return 'AB123';
}

module.exports = {
  receiveStudentsFile,
};
