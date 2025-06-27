// server/routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const { createAccount, getAccounts } = require('../controllers/accountController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createAccount);
router.get('/', protect, getAccounts);

module.exports = router;
