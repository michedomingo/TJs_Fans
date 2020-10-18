const express = require("express");
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const Product = require("../models/Product");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(
    advancedResults(Product, {
      path: "store",
      select: "storeName description",
    }),
    getProducts
  )
  .post(protect, authorize("publisher", "admin"), addProduct);

router
  .route("/:id")
  .get(getProduct)
  .put(protect, authorize("publisher", "admin"), updateProduct)
  .delete(protect, authorize("publisher", "admin"), deleteProduct);

module.exports = router;
