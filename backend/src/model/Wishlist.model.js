import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true, 
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true, 
      },
      sizeOptionId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
      },
      varietyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
      }
    }
  ],
}, {
  timestamps: true,
});

wishListSchema.index(
  { user: 1, 'products.product': 1, 'products.sizeOptionId': 1, 'products.varietyId': 1 },
  { unique: true }
);

export const Wishlist = mongoose.model("Wishlist", wishListSchema);
