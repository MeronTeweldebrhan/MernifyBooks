// server/app.js
const express = require('express');
const cors = require('cors');

const accountRoutes =require('./routes/accountRoutes')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('MernifyBooks API is running...');
});

module.exports = app;
