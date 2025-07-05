// server/models/Transaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    fromAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    toAccount: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
    fromType: { type: String, enum: ['debit', 'credit'], required: true },
    toType: { type: String, enum: ['debit', 'credit'], required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema,'transactions');
