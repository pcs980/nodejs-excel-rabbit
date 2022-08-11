const { generateUuid } = require('../../utils/generators');

class Student {
  constructor(student) {
    this.id = student.id || generateUuid();
    this.name = student.name;
    this.email = student.email;
    this.maritalStatus = student.maritalStatus;
    this.taxpayerNumber = student.taxpayerNumber;
    this.identity = student.identity;
    this.birthDate = student.birthDate;
    this.gender = student.gender;
    this.ticket = student.ticket;
  }
}

module.exports = {
  Student,
};
