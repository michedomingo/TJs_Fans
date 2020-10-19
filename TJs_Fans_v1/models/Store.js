const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../utils/geocoder");

const StoreSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    slug: String,
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    phone: {
      type: String,
      maxlength: [20, "Phone number can not be longer than 20 characters"],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    hours: {
      mon: String,
      tue: String,
      wed: String,
      thu: String,
      fri: String,
      sat: String,
      sun: String,
    },
    seniorHours: String,
    averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [10, "Rating must can not be more than 10"],
    },
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    alcohol: {
      type: [String],
      required: true,
      enum: ["Beer", "Wine", "Liquor"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    description: {
      type: String,
      required: [false, "Please add a description"],
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    averageCost: Number,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create store slug from store name
StoreSchema.pre("save", function (next) {
  this.slug = slugify(this.storeName, { lower: true });
  next();
});

// Geocode and create location field
StoreSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  // Do not save address in DB
  this.address = undefined;
  next();
});

// Cascade delete products when a store is deleted
StoreSchema.pre("remove", async function (next) {
  console.log(`Products being removed from store ${this._id}`);
  await this.model("Product").deleteMany({ store: this._id });
  next();
});

// Reverse populate with virtuals
StoreSchema.virtual("products", {
  ref: "Product",
  localField: "_id",
  foreignField: "store",
  justOne: false,
});

module.exports = mongoose.model("Store", StoreSchema);
