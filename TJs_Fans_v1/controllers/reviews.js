const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Review = require("../models/Review");
const Store = require("../models/Store");

// @desc    Get reviews
// @route   GET /api/v1/reviews
// @route   GET /api/v1/stores/:storeId/reviews
// @access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.storeId) {
    const reviews = await Review.find({ store: req.params.storeId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});
