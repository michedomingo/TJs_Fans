const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Store = require("../models/Store");

// @desc    Get all stores
// @route   GET /api/v1/stores
// @access  Public
exports.getStores = asyncHandler(async (req, res, next) => {
  const stores = await Store.find();

  res.status(200).json({ success: true, count: stores.length, data: stores });
});

// @desc    Get single Store
// @route   GET /api/v1/stores/:id
// @access  Public
exports.getStore = asyncHandler(async (req, res, next) => {
  const store = await Store.findById(req.params.id);

  if (!store) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: store });
});

// @desc    Create new Store
// @route   POST /api/v1/stores
// @access  Private
exports.createStore = asyncHandler(async (req, res, next) => {
  const store = await Store.create(req.body);

  res.status(201).json({
    success: true,
    data: store,
  });
});

// @desc    Update Store
// @route   POST /api/v1/stores/:id
// @access  Private
exports.updateStore = asyncHandler(async (req, res, next) => {
  const store = await Store.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!store) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: store });
});

// @desc    Delete Store
// @route   POST /api/v1/stores/:id
// @access  Private
exports.deleteStore = asyncHandler(async (req, res, next) => {
  const store = await Store.findByIdAndDelete(req.params.id);

  if (!store) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: {} });
});
