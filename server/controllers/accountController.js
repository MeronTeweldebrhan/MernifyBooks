// server/controllers/accountController.js
const Account = require('../models/Account');

// Create new account
const createAccount = async (req, res) => {
  try {
    const account = await Account.create(req.body);
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all accounts
const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAccount, getAccounts };
