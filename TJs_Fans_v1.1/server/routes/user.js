const express = require('express');
const router = express.Router();

// import controller
const { requireLogin } = require('../controllers/auth');
const { read, update } = require('../controllers/user');

router.get('/user/:id', requireLogin, read);
router.put('/user/update', requireLogin, update);

module.exports = router;
