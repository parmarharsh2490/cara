import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    unique : true,
  }],
}, {
  timestamps: true,
});

export const Wishlist = mongoose.model("Wishlist", wishListSchema);
