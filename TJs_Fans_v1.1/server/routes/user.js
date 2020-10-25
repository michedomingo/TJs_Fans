const express = require('express');
const router = express.Router();

// import controller
const { requireLogin } = require('../controllers/auth');
const { read } = require('../controllers/user');

router.get('/user/:id', requireLogin, read);

module.exports = router;
