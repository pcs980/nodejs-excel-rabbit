class Student {
  constructor(student) {
    this.name = student.name;
    this.email = student.email;
    this.maritalStatus = student.maritalStatus;
    this.idNumber = student.idNumber;
    this.identity = student.identity;
    this.birthDate = student.birthDate;
    this.gender = student.gender;
  }
}

module.exports = {
  Student,
};
