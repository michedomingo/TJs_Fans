const express = require('express');
const router = express.Router();

// import controller
const { getProducts, getProduct } = require('../controllers/products');

router.get('/products', getProducts);
router.get('/products/:id', getProduct);

module.exports = router;
