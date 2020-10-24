const express = require('express');
const router = express.Router();

// Import controller
const { register, accountActivation, login } = require('../controllers/auth');

// Import validators
const { registerValidator, loginValidator } = require('../validators/auth');
const { runValidation } = require('../validators');

router.post('/register', registerValidator, runValidation, register);
router.post('/account-activation', accountActivation);
router.post('/login', loginValidator, runValidation, login);

module.exports = router;
