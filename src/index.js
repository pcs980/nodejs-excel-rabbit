'use strict';

const app = require('./app');
const { APP_PORT } = require('./utils/config');

app.listen((APP_PORT), () => {
  console.log(`Service 'Proz Alunos' ready and listening at ${APP_PORT} port`);
});
