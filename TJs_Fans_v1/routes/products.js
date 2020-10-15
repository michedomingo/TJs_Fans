const express = require("express");
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
} = require("../controllers/products");

const router = express.Router({ mergeParams: true });

router.route("/").get(getProducts).post(addProduct);
router.route("/:id").get(getProduct).put(updateProduct);

module.exports = router;
