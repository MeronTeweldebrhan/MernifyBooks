// server/app.js
const express = require('express');
const cors = require('cors');

const accountRoutes =require('./routes/accountRoutes')
const transactionRoutes = require('./routes/transactionRoutes');
const authRoutes = require('./routes/authRoutes');




const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('MernifyBooks API is running...');
});

module.exports = app;
