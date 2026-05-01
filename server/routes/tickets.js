const express = require('express');
const router = express.Router();
const tickets = require('../data/tickets.json');

router.get('/', (req, res) => {
  res.json(tickets);
});

router.get('/scan/:stampId', (req, res) => {
  const stampId = req.params.stampId;
  const ticket = tickets.find(t => t.stampId === stampId);
  
  if (!ticket) {
    return res.status(404).json({ error: 'Ticket nicht gefunden' });
  }
  
  if (ticket.scanned) {
    return res.status(400).json({ error: 'Ticket wurde bereits gescannt' });
  }
  
  ticket.scanned = true;
  res.json(ticket);
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
