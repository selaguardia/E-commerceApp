const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "You must enter your name."],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    content: {
      type: String,
      required: [true, "You must provide a reason for your review score."],
    },
    // relationship to product
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);


const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;