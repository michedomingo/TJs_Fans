// import mongoose, { Schema } from 'mongoose';
import mongoose from 'mongoose';
import pkg from 'mongoose';
const { Schema } = pkg;

export const ProductSchema = new Schema({
  productName: String,
  priceAvg: Number,
  images: [String],
  categories: [String],
  featured: Boolean,
});

export const ProductModel = mongoose.model('Product', ProductSchema);
