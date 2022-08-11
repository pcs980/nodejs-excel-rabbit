'use strict';

const SINGLE_STUDENT = {
  id: 'b0d2b5cd-9e12-4228-b4eb-b74f8db36788',
  name: 'João Santos',
  email: 'joaosantos@gmail.com',
  taxpayerNumber: '111.222.333-44',
  maritalStatus: 'SOLTEIRO(A)',
  gender: 'MASCULINO',
};

const ALL_STUDENTS = [
  { ...SINGLE_STUDENT },
  {
    id: 'ef02bc66-6a4c-4f1f-ab5e-a1f203dbfbc8',
    name: 'Val Silva',
    email: 'valsilva@gmail.com',
    taxpayerNumber: '777.888.999-00',
    maritalStatus: 'CASADO(A)',
    gender: 'FEMININO',
  },
];

module.exports = {
  SINGLE_STUDENT,
  ALL_STUDENTS,
};