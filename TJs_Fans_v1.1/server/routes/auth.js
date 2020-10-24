const express = require('express');
const router = express.Router();

// Import controller
const { register, accountActivation } = require('../controllers/auth');

// Import validators
const { registerValidator } = require('../validators/auth');
const { runValidation } = require('../validators');

router.post('/register', registerValidator, runValidation, register);
router.post('/account-activation', accountActivation);

module.exports = router;
