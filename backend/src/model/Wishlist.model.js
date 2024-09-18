import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    required: true,  // Every wishlist must be associated with a user
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,  // Ensure that each product entry has a product ID
      },
      sizeOptionId: {
        type: mongoose.Schema.Types.ObjectId,  // Store size option identifier
        required: true,  // Ensure sizeOptionId is always present
      },
      varietyId: {
        type: mongoose.Schema.Types.ObjectId,  // Store variety (color) identifier
        required: true,  // Ensure varietyId is always present
      }
    }
  ],
}, {
  timestamps: true,
});

// Ensure uniqueness of products by user, product, varietyId, and sizeOptionId combination
wishListSchema.index(
  { user: 1, 'products.product': 1, 'products.sizeOptionId': 1, 'products.varietyId': 1 },
  { unique: true }
);

export const Wishlist = mongoose.model("Wishlist", wishListSchema);
