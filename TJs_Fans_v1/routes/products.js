const express = require('express')
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleateProduct
} = require('../controllers/products');

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(createProduct);

router.route('/:id')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleateProduct);

module.exports = router;
