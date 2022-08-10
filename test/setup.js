const request = require('supertest');
const { app } = require('../src/app');

const supertest = request(app);

module.exports = {
  supertest
};
