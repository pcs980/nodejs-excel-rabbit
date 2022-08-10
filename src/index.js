'use strict';

const fs = require('fs');

const { app } = require('./app');
const { APP_PORT } = require('./utils/config');

// Create upload folder
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Start server
app.listen(APP_PORT, () => {
  console.log(`Service 'Proz Alunos' ready and listening at ${APP_PORT} port`);
});
