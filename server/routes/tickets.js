const express = require('express');
const router = express.Router();
const tickets = require('../data/tickets.json');

router.get('/', (req, res) => {
  res.json(tickets);
});

router.post('/', (req, res) => {
  const ticket = req.body;
  if (!ticket || !ticket.id) {
    return res.status(400).json({ error: 'Ticket data is required' });
  }

  tickets.push(ticket);
  res.status(201).json(ticket);
});

module.exports = router;
