'use strict';

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: (_, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = {
  uploadMiddleware,
};
