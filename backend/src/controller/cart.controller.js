import mongoose from "mongoose";
import { Cart } from "../model/Cart.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { transformCartData } from "../utils/TransformCartData.js";

export { addToCart, removeFromCart, updateQuantity, getUserCart };

const addToCart = asyncHandler(async (req, res) => {
    const user = req.user;
    const { productId, sizeOptionId,varietyId,quantity = 1 } = req.body;
  
    // Step 1: Check if the item already exists in the cart
    const existingCart = await Cart.findOne({
      user: user._id,
      "products": {
        $elemMatch: {
          product: new mongoose.Types.ObjectId(productId),
          sizeOption: new mongoose.Types.ObjectId(sizeOptionId),
          variety: new mongoose.Types.ObjectId(varietyId),
        },
      },
    });
  
    if (existingCart) {
      return res.status(400).json(new ApiResponse(400,"Product is Already in Cart"))
    }
  
    // Step 2: Add the product to the cart if it doesn't exist
    let newCart = await Cart.findOneAndUpdate(
      { user: user._id },
      {
        $push: {
          products: {
            product: productId,
            sizeOption: sizeOptionId,
            variety : varietyId,
            quantity: quantity,
          },
        },
      },
      {
        upsert: true,
        new: true,
      }
    ).select("-user -__v -createdAt -updatedAt").populate("products.product","title variety").lean();
    const transformedCart = transformCartData(newCart.products);
    return res.status(200).json({
      cart: transformedCart,
      message: "Product added to cart successfully",
    });
});
  

const removeFromCart = asyncHandler(async (req, res) => {
  const { productId, sizeOptionId, varietyId } = req.body;
  const user = req.user;

  const updatedCart = await Cart.findOneAndUpdate(
    {
      user: user._id,
      "products.product": new mongoose.Types.ObjectId(productId),
      "products.sizeOption": new mongoose.Types.ObjectId(sizeOptionId),
      "products.variety": new mongoose.Types.ObjectId(varietyId),
    },
    {
      $pull: {
        products: {
          product : productId,
          sizeOption: sizeOptionId,
        },
      },
    },
    {
      new: true,
    }
  ).populate("products.product", "title variety");
  
  if (!updatedCart || updatedCart.products.length === 0) {
    return res
      .status(404)
      .json({ message: "Cart not found or product not in cart" });
  }

  const transformedCart = transformCartData(updatedCart.products);
  return res.status(200).json({
    cart: transformedCart,
    message: "Product removed from cart successfully",
  });
});

const updateQuantity = asyncHandler(async (req, res) => {
  const user = req.user;
  const { quantity , productId , sizeOptionId, varietyId } = req.body;

  if (quantity <= 0 || quantity > 100) {
    return res.status(400).json({ message: "Quantity must be greater than 0 or Less than or Equal to 100" });
  }

  const updatedCart = await Cart.findOneAndUpdate(
    {
      user: user._id,
      "products.product": new mongoose.Types.ObjectId(productId),
      "products.sizeOption": new mongoose.Types.ObjectId(sizeOptionId),
      "products.variety": new mongoose.Types.ObjectId(varietyId),
    },
    {
      $set: { "products.$.quantity": quantity },
    },
    {
      new: true,
    }
  ).select("-user -__v -createdAt -updatedAt").populate("products.product","title variety").lean();

  if (!updatedCart) {
    return res.status(404).json({ message: "Cart or product not found" });
  }
  const transformedCart = transformCartData(updatedCart.products);
  return res.status(200).json({
    cart: transformedCart,
    message: "Quantity updated successfully",
  });
});

const getUserCart = asyncHandler(async (req, res) => {
  const user = req.user;
  const cart = await Cart.aggregate([
    {
      $match: {
        user: user._id,
      },
    },
    {
      $unwind: "$products",
    },
    {
      $lookup: {
        from: "products",
        localField: "products.product",
        foreignField: "_id",
        as: "productArr",
      },
    },
    {
      $addFields: {
        product: { $arrayElemAt: ["$productArr", 0] },
      },
    },
    {
      $addFields: {
        newVariety: {
          $filter: {
            input: "$product.variety",
            as: "vary",
            cond: { $eq: ["$$vary._id", "$products.variety"] },
          },
        },
      },
    },
    {
      $addFields: {
        secvariety: { $arrayElemAt: ["$newVariety", 0] },
      },
    },
    {
      $addFields: {
        sizeArr: {
          $filter: {
            input: "$secvariety.sizeOptions",
            as: "sp",
            cond: { $eq: ["$$sp._id", "$products.sizeOption"] },
          },
        },
      },
    },
    {
      $addFields: {
        image: { $arrayElemAt: ["$secvariety.images", 0] },
      },
    },
    {
    $project: {
      _id: 0,
      title: { $ifNull: ["$product.title", "Unknown Title"] },
      color: { $ifNull: ["$secvariety.color", "Unknown Color"] },
      size: { $ifNull: [{ $arrayElemAt: ["$sizeArr.size", 0] }, "Unknown Size"] },
      price: { $ifNull: [{ $arrayElemAt: ["$sizeArr.price", 0] }, null] },
      quantity: { $ifNull: ["$products.quantity", 0] },
      imageUrl: { $ifNull: ["$image.imageUrl", "default_image_url"] },
    }
  } 
  ])

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  return res.status(200).json(new ApiResponse(200,cart,"Successfully fetch user cart"))
})