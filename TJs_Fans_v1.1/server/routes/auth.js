const express = require('express');
const router = express.Router();

// Import controller
const { register } = require('../controllers/auth');

// Import validators
const { registerValidator } = require('../validators/auth');
const { runValidation } = require('../validators');

router.post('/register', registerValidator, runValidation, register);

module.exports = router;
