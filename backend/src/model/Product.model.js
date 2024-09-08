import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    enums : ["tshirt","shirt","pant","bottom","jacket","coorder","test"],
    trim: true
  },
  images: [{
    imageUrl: {
      type: String,
      required: true
    },
    publicId: {
      type: String,
      required: true
    },
  }],
  sizeOptions: [{
    size: {
      type: String,
      enum: [
        "XS", "S", "M", "L", "XL", "XXL", "XXXL", 
        "28", "30", "32", "34", "36", "38", "40", "42", "44", "46", 
        "4T", "5T", "6T", "7T", "8T", "10T", "12T"
      ],
      required: true
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    price: {
      originalPrice: {
        type: Number,
        required: true,
        min: 0,
      },
      discountedPrice: {
        type: Number,
        default: 0,
        min: 0,
      }
    },
    gender: {
      type: String,
      enum: ["male", "female", "child", "unisex"],
      required: true
    },
    color: {
      type: String,
      enum: [
        "blue", "red", "yellow", "green", "black", "white", "gray", 
        "orange", "pink", "purple", "brown", "navy", "beige", "maroon"
      ],
      required: true
    }
  }],
  rating: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true
});

export const Product = mongoose.model("Product", productSchema);
