import mongoose from "mongoose";
import { imageSchema } from "./Product.model.js";

const productReviewSchema = mongoose.Schema(
  {
    ratingStar: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    reviewImage: imageSchema,
    reviewTitle: {
      type: String,
      required: true,
    },
    reviewDescription: {
      type: String,
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductReview = mongoose.model(
  "ProductReview",
  productReviewSchema
);