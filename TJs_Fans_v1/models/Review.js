const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title for the review"],
    maxlength: 100,
  },
  text: {
    type: String,
    required: [true, "Please add some text"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please add a rating between 1 and 10"],
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
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// Prevent user from submitting more than one review per store
ReviewSchema.index({ store: 1, user: 1 }, { unique: true });

// Static method to get avg rating of store and save
ReviewSchema.statics.getAverageRating = async function (storeId) {
  const obj = await this.aggregate([
    {
      $match: { store: storeId },
    },
    {
      $group: {
        _id: "$store",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  try {
    await this.model("Store").findByIdAndUpdate(storeId, {
      averageRating: obj[0].averageRating,
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.store);
});

// Call getAverageCost before remove
ReviewSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.store);
});

module.exports = mongoose.model("Review", ReviewSchema);
