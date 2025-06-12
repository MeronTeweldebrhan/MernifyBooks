// server/models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    type: { type: String, enum: ['debit', 'credit'], required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema,'transactions');
