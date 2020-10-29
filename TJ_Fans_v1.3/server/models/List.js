// import mongoose, { Schema } from 'mongoose';
import mongoose from 'mongoose';
import pkg from 'mongoose';
const { Schema } = pkg;

export const ListSchema = new Schema({
  user: Schema.Types.ObjectId,
  timestamp: String,
  products: [
    {
      _id: Schema.Types.ObjectId,
      productName: String,
      priceAvg: Number,
      images: [String],
    },
  ],
  listName: {
    title: String,
    notes: String,
  },
});

export const ListModel = mongoose.model('List', ListSchema);
