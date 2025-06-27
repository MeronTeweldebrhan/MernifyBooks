// server/controllers/transactionController.js
const Transaction = require('../models/Transaction');

// Create transaction
const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('account', 'name type');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update transaction
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { account, type, amount } = req.body;
  if (!account || !type || !amount) {
    return res.status(400).json({ message: 'account, type, and amount are required.' });
  }
  try {
    const transaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findByIdAndDelete(id);
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction deleted',transaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { createTransaction, getTransactions,updateTransaction,deleteTransaction };
