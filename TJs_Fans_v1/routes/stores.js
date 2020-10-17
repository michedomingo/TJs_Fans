const express = require("express");
const {
  getStores,
  getStore,
  createStore,
  updateStore,
  deleteStore,
  getStoresInRadius,
  storePhotoUpload,
} = require("../controllers/stores");

const Store = require("../models/Store");
const advancedResults = require("../middleware/advancedResults");

// Include other resource routers
const productRouter = require("./products");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:storeId/products", productRouter);

router.route("/radius/:zipcode/:distance").get(getStoresInRadius);

router
  .route("/:id/photo")
  .put(protect, authorize("publisher", "admin"), storePhotoUpload);

router
  .route("/")
  .get(advancedResults(Store, "products"), getStores)
  .post(protect, authorize("publisher", "admin"), createStore);

router
  .route("/:id")
  .get(getStore)
  .put(protect, authorize("publisher", "admin"), updateStore)
  .delete(protect, authorize("publisher", "admin"), deleteStore);

module.exports = router;
