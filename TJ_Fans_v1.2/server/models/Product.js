const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: String,
  priceAvg: Number,
  images: [String],
  categories: [String],
  featured: Boolean,
});

module.exports = mongoose.model('Product', ProductSchema);
