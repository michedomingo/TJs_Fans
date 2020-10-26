const express = require('express');
const router = express.Router();

// import controller
const { getProducts } = require('../controllers/products');

router.get('/products', getProducts);

module.exports = router;
