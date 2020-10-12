const ErrorResponse = require("../utils/errorResponse");
const Store = require("../models/Store");

// @desc    Get all stores
// @route   GET /api/v1/stores
// @access  Public
exports.getStores = async (req, res, next) => {
  try {
    const stores = await Store.find();

    res.status(200).json({ success: true, count: stores.length, data: stores });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single Store
// @route   GET /api/v1/stores/:id
// @access  Public
exports.getStore = async (req, res, next) => {
  try {
    const store = await Store.findById(req.params.id);

    if (!store) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: store });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new Store
// @route   POST /api/v1/stores
// @access  Private
exports.createStore = async (req, res, next) => {
  try {
    const store = await Store.create(req.body);

    res.status(201).json({
      success: true,
      data: store,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update Store
// @route   POST /api/v1/stores/:id
// @access  Private
exports.updateStore = async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
};

// @desc    Delete Store
// @route   POST /api/v1/stores/:id
// @access  Private
exports.deleteStore = async (req, res, next) => {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);

    if (!store) {
      return next(
        new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
