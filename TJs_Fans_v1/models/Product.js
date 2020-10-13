const mongoose = require("mongoose");
const slugify = require("slugify");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please add a product name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  slug: String,
  priceAvg: {
    type: Number,
    required: [false, "Please add a product cost"],
  },
  ingredients: {
    type: String,
    required: [false, "Please add ingredients"],
  },
  nutritionFacts: {
    type: String,
    required: [false, "Please add nutritional facts"],
  },
  productLabel: {
    type: String,
    required: [false, "Please select label(s)"],
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  store: {
    type: mongoose.Schema.ObjectId,
    ref: "Store",
    required: true,
  },
});

// Create product slug from product name
ProductSchema.pre("save", function (next) {
  this.slug = slugify(this.productName, { lower: true });
  next();
});

module.exports = mongoose.model("Product", ProductSchema);
