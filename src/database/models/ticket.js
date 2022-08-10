const STATUS_RECEIVED = 0;
// const STATUS_DONE = 1;
// const STATUS_PARTIALLY_DONE = 2;

class Ticket {
  constructor() {
    this.code = 'AB123';
    this.status = STATUS_RECEIVED;
  }
};


module.exports = {
  Ticket,
};
