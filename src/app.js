'use strict';

const express = require('express');

const app = express();
app.use(express.json());

require('./students/students.route')(app);

module.exports = app;