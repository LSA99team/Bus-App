const express = require('express');
const router = express.Router();
const trips = require('../data/trips.json');

router.get('/', (req, res) => {
  res.json(trips);
});

router.get('/:id', (req, res) => {
  const trip = trips.find((item) => item.id === req.params.id);
  if (!trip) {
    return res.status(404).json({ error: 'Trip not found' });
  }
  res.json(trip);
});

module.exports = router;
