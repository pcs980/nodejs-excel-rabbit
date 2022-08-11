'use strict';

const { TICKET_STATUS } = require('../../src/utils/constants');

const SINGLE_TICKET = {
  code: 'EG3974',
  filename: 'file-1660176979540-planilha_alunos.xlsx',
  status: TICKET_STATUS.STATUS_CREATED,
};

const ALL_TICKETS = [
  { ...SINGLE_TICKET },
  {
    code: 'CD8351',
    filename: 'file-1660176980677-planilha_alunos.xlsx',
    status: TICKET_STATUS.STATUS_ERROR,
    error: 'E-mail already registered: joaosantos@gmail.com',
  },
];

module.exports = {
  ALL_TICKETS,
  SINGLE_TICKET,
};