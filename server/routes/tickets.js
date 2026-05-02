const express = require('express');
const router = express.Router();
const tickets = require('../data/tickets.json');

router.get('/', (req, res) => {
  res.json(tickets);
});

router.get('/validate/:ticketId', (req, res) => {
  const ticketId = req.params.ticketId;
  const currentDate = req.query.date;
  const currentTime = req.query.time;
  
  const ticket = tickets.find(t => t.id === ticketId);
  
  if (!ticket) {
    return res.status(404).json({ status: 'ungültig', reason: 'Ticket nicht gefunden' });
  }
  
  // Kombiniere Datum und Zeit zu einem vergleichbaren Format
  let checkDateTime;
  if (currentDate && currentTime) {
    // Format: "2026-04-27" und "19:30:00"
    checkDateTime = new Date(`${currentDate}T${currentTime}:00Z`);
  } else {
    checkDateTime = new Date();
  }
  
  const validFrom = new Date(ticket.validFrom);
  const validTo = new Date(ticket.validTo);
  
  if (checkDateTime >= validFrom && checkDateTime <= validTo) {
    res.json({ status: 'gültig' });
  } else {
    res.json({ status: 'ungültig', reason: 'Ticket nicht mehr gültig' });
  }
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
