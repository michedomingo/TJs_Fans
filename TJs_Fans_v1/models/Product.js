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
  priceAvg: {
    type: Number,
    required: [true, "Please add product avg cost"],
  },
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

// Static method to get avg of product price avg
ProductSchema.statics.getAverageCost = async function (storeId) {
  const obj = await this.aggregate([
    {
      $match: { store: storeId },
    },
    {
      $group: {
        _id: "$store",
        averageCost: { $avg: "$priceAvg" },
      },
    },
  ]);

  try {
    await this.model("Store").findByIdAndUpdate(storeId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
ProductSchema.post("save", function () {
  this.constructor.getAverageCost(this.store);
});

// Call getAverageCost before remove
ProductSchema.pre("remove", function () {
  this.constructor.getAverageCost(this.store);
});

module.exports = mongoose.model("Product", ProductSchema);
