let tickets = [];
let students = [];

class Tickets {

  save(ticket) {
    tickets.push(ticket);
    return tickets;
  }

  get(code) {
    return tickets.find((t) => t.code = code);
  }

  update(code) {
    const ticket = this.get(code);
    tickets = [
      ...tickets,
      { ...ticket, status: 1 }
    ];
  }
}

class Students {

  save(student) {
    students.push(student);
    return students;
  }
}

module.exports = {
  Tickets,
  Students
};
