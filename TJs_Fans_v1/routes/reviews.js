const express = require("express");
const { getReviews } = require("../controllers/reviews");

const Review = require("../models/Review");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults");
const { protect, authorize } = require("../middleware/auth");

router.route("/").get(
  advancedResults(Review, {
    path: "store",
    select: "storeName description",
  }),
  getReviews
);

module.exports = router;
