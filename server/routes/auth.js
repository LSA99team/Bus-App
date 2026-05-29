const express = require('express');
const router = express.Router();
const users = require('../data/users.json');

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (item) => item.username === username && item.password === password
  );

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
});

module.exports = router;
