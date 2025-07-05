// server/controllers/transactionController.js
const Transaction = require('../models/Transaction');

// Create transaction (double-entry, single document)
const createTransaction = async (req, res) => {
  const { fromAccount, toAccount, fromType, toType, amount, description } = req.body;

  // Validation
  if (!fromAccount || !toAccount || !fromType || !toType || !amount) {
    return res.status(400).json({ message: 'fromAccount, toAccount, fromType, toType, and amount are required.' });
  }
  if (fromAccount === toAccount) {
    return res.status(400).json({ message: 'fromAccount and toAccount must be different.' });
  }
  if (fromType === toType) {
    return res.status(400).json({ message: 'fromType and toType must be different (one debit, one credit).' });
  }
  if (amount <= 0) {
    return res.status(400).json({ message: 'Amount must be positive.' });
  }
  if (!['debit', 'credit'].includes(fromType) || !['debit', 'credit'].includes(toType)) {
    return res.status(400).json({ message: 'fromType and toType must be either debit or credit.' });
  }

  try {
    const transaction = await Transaction.create({
      fromAccount,
      toAccount,
      fromType,
      toType,
      amount,
      description
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('fromAccount', 'name type')
      .populate('toAccount', 'name type');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update transaction (double-entry, single document)
const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { fromAccount, toAccount, fromType, toType, amount, description } = req.body;

  // Validation
  if (!fromAccount || !toAccount || !fromType || !toType || !amount) {
    return res.status(400).json({ message: 'fromAccount, toAccount, fromType, toType, and amount are required.' });
  }
  if (fromAccount === toAccount) {
    return res.status(400).json({ message: 'fromAccount and toAccount must be different.' });
  }
  if (fromType === toType) {
    return res.status(400).json({ message: 'fromType and toType must be different (one debit, one credit).' });
  }
  if (amount <= 0) {
    return res.status(400).json({ message: 'Amount must be positive.' });
  }
  if (!['debit', 'credit'].includes(fromType) || !['debit', 'credit'].includes(toType)) {
    return res.status(400).json({ message: 'fromType and toType must be either debit or credit.' });
  }

  try {
    const transaction = await Transaction.findByIdAndUpdate(
      id,
      { fromAccount, toAccount, fromType, toType, amount, description },
      { new: true, runValidators: true }
    );
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
    res.json({ message: 'Transaction deleted', transaction });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all accounts
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find().select('_id name type');
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createTransaction, getTransactions, updateTransaction, deleteTransaction,getAccounts };