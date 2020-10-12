const express = require("express");
const {
  getStores,
  getStore,
  createStore,
  updateStore,
  deleteStore,
  getStoresInRadius,
} = require("../controllers/stores");

const router = express.Router();

router.route("/radius/:zipcode/:distance").get(getStoresInRadius);

router.route("/").get(getStores).post(createStore);

router.route("/:id").get(getStore).put(updateStore).delete(deleteStore);

module.exports = router;
