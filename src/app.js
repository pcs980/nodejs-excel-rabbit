'use strict';

const express = require('express');

const app = express();
app.use(express.json());

require('./students/students.route')(app);
require('./tickets/tickets.route')(app);

// Capture unknown routes
app.use('*', (req, res) => {
  return res.status(404).json({
    message: `Invalid endpoint: ${req.method} ${req.originalUrl}`,
  });
});

module.exports = {
  app,
};
