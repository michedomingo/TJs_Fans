const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Product = require("../models/Product");
const { populate } = require("../models/Product");

// @desc    Get all products
// @route   GET /api/v1/products
// @route   GET /api/v1/stores/:storeId/products
// @access  Public

exports.getProducts = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.storeId) {
    query = Product.find({ store: req.params.storeId });
  } else {
    query = Product.find().populate("store");
  }

  const products = await query;

  res.status(200).json({
    success: true,
    count: products.length,
    data: products,
  });
});

// // @desc    Get single Product
// // @route   GET /api/v1/products/:id
// // @access  Public
// exports.getProduct = (req, res, next) => {
//   res.status(200).json({ success: true, msg: `Show product ${req.params.id}` });
// };

// // @desc    Create new Product
// // @route   POST /api/v1/products
// // @access  Private
// exports.createProduct = (req, res, next) => {
//   res.status(200).json({ success: true, msg: "Create new product" });
// };

// // @desc    Update Product
// // @route   POST /api/v1/products/:id
// // @access  Private
// exports.updateProduct = (req, res, next) => {
//   res
//     .status(200)
//     .json({ success: true, msg: `Update product ${req.params.id}` });
// };

// // @desc    Delete Product
// // @route   POST /api/v1/products/:id
// // @access  Private
// exports.deleteProduct = (req, res, next) => {
//   res
//     .status(200)
//     .json({ success: true, msg: `Delete product ${req.params.id}` });
// };
