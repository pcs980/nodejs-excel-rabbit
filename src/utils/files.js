'use strict';

const fs = require('fs');
const path = require('path');

async function createUploadFolder() {
  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
  }
}

async function removeUploadedFile(filename) {
  fs.unlink(path.join(process.cwd(), '/uploads/', filename), (error) => {
    if (error) {
      console.error('Error deleting file', filename, error);
    }
  });
}

module.exports = {
  createUploadFolder,
  removeUploadedFile,
};
