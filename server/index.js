const express = require('express');
const tripsRouter = require('./routes/trips');
const authRouter = require('./routes/auth');
const ticketsRouter = require('./routes/tickets');

const app = express();
app.use(express.json());

app.use('/api/trips', tripsRouter);
app.use('/api/auth', authRouter);
app.use('/api/tickets', ticketsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Bus system server is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
