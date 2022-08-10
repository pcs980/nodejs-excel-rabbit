function getAllTickets(req, res) {
  console.log(req.query);
  res.status(200).json({ implemented: false });
}

function getTicketByCode(req, res) {
  console.log(req.query);
  res.status(200).json({ implemented: false });
}

module.exports = {
  getAllTickets,
  getTicketByCode,
};
