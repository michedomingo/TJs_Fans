const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Store = require("../models/Store");
const geocoder = require("../utils/geocoder");

// @desc    Get all stores
// @route   GET /api/v1/stores
// @access  Public
exports.getStores = asyncHandler(async (req, res, next) => {
  let query;

  let queryStr = JSON.stringify(req.query);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = Store.find(JSON.parse(queryStr));

  const stores = await query;

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

// @desc    Get stores within a radius
// @route   GET /api/v1/stores/radius/:zipcode/:distance
// @access  Private
exports.getStoresInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocode
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians (unit measurement for spheres)
  // Divide distance by radius of Earth
  // Earth Radius = 3,963 miles / 6,378 km
  const radius = distance / 3963;

  const stores = await Store.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: stores.length,
    data: stores,
  });
});
