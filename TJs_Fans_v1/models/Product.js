const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    trim: true,
    required: [true, "Please add a product name"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  store: {
    type: mongoose.Schema.ObjectId,
    ref: "Store",
    required: true,
  },
  priceAvg: Number,
  ingredients: String,
  nutritionFacts: String,
  productLabel: {
    // Array of strings
    type: [String],
    enum: ["Dairy Free", "Gluten Free", "Vegan", "Vegetarian", "Organic"],
  },
  dairyFree: {
    type: Boolean,
    default: false,
  },
  glutenFree: {
    type: Boolean,
    default: false,
  },
  vegan: {
    type: Boolean,
    default: false,
  },
  vegetarian: {
    type: Boolean,
    default: false,
  },
  organic: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
