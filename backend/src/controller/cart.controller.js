import mongoose, { isValidObjectId } from "mongoose";
import { Cart } from "../model/Cart.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { transformCartData } from "../utils/TransformCartData.js";
import { redis } from "../index.js";
import ApiError from "../utils/ApiError.js";
import { Product } from "../model/Product.model.js";

export { addToCart, removeFromCart, updateQuantity, getUserCart };

const addToCart = asyncHandler(async (req, res) => {
    const user = req.user;
    const { productId, sizeOptionId,varietyId,quantity = 1 } = req.body;

  // Step 1: Check if the item already exists in the cart
    const existingCart = await Cart.findOne({
      user: user._id,
      products: {
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
  
    //  Add the product to the cart if it doesn't exist
    const product = await Product.findById(productId);

    //  Check that product have that number of quantity
    const variety = product.variety.id(varietyId);
    if (!variety) {
      throw new ApiError(400, "Variety not found");
    }

    const sizeOption = variety.sizeOptions.id(sizeOptionId);
    if (!sizeOption) {
      throw new ApiError(400, "Size option not found");
    }

    if (sizeOption.stock < quantity) {
      throw new ApiError(400, "Quantity cant be greater than stock");
    }
    let newCart = await Cart.findOneAndUpdate(
      { user: user._id },
      {
        $push: {
          products: {
            product: product._id,
            sizeOption: sizeOptionId,
            variety : varietyId,
            quantity: quantity,
            seller : product.owner
          },
        },
      },
      {
        upsert: true,
        new: true,
      }
    ).select("-user -__v -createdAt -updatedAt").populate("products.product","title variety").lean();
    
    const transformedCart = transformCartData(newCart.products);
    
    await redis.set(`cart:${user._id}`,JSON.stringify(transformedCart))
    await redis.expire(`cart:${user._id}`,600)
    return res.status(200).json( new ApiResponse(200,transformedCart,"Product Add to cart successfully"))
});
  

const removeFromCart = asyncHandler(async (req, res) => {
  const { cartProductId } = req.query;
  
  if (!cartProductId || !isValidObjectId(cartProductId)) {
    throw new ApiError(400, "CartProductId is invalid");
  }
  const user = req.user;

  const updatedCart = await Cart.findOneAndUpdate(
    {
      user: user._id,
    },
    {
      $pull: {
        products: {
          _id : new mongoose.Types.ObjectId(cartProductId)
        },
      },
    },
    {
      new: true,
      upsert : true
    }
  ).populate("products.product", "title variety");
  
  if (!updatedCart) {
  await redis.del(`cart:${user._id}`)
    return res
      .status(404)
      .json({ message: "Cart not found or product not in cart" });
  }
  const transformedCart = transformCartData(updatedCart.products);
  await redis.set(`cart:${user._id}`,JSON.stringify(transformedCart))
  await redis.expire(`cart:${user._id}`,600)
  return res.status(200).json(new ApiResponse(200,transformedCart,"Product removed from cart successfully"))
});

const updateQuantity = asyncHandler(async (req, res) => {
  const user = req.user;
  const {cartProductId,quantity} = req.body;
  
  if (quantity <= 0 || quantity > 100) {
    return res.status(400).json({ message: "Quantity must be greater than 0 or Less than or Equal to 100" });
  }

  const updatedCart = await Cart.findOneAndUpdate(
    {
      user: user._id,
      products : {
        $elemMatch : {
          _id : new mongoose.Types.ObjectId(cartProductId)
        }
      }
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
  await redis.set(`cart:${user._id}`,JSON.stringify(transformedCart))
  await redis.expire(`cart:${user._id}`,600)
  return res.status(200).json(new ApiResponse(200,transformedCart,"Quantity updated successfully"));
});

const getUserCart = asyncHandler(async (req, res) => {
  const user = req.user;
  const cachedCart = await redis.get(`cart:${user._id}`);
  if(cachedCart){
    return res.status(200).json(new ApiResponse(200,JSON.parse(cachedCart),"Successfully fetch user cart"))
  }
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
      _id: "$products._id",
      productId : "$product._id",
      title: { $ifNull: ["$product.title", "Unknown Title"] },
      color: { $ifNull: ["$secvariety.color", "Unknown Color"] },
      size: { $ifNull: [{ $arrayElemAt: ["$sizeArr.size", 0] }, "Unknown Size"] },
      discountedPrice : { $arrayElemAt: ["$sizeArr.price.discountedPrice", 0] },
      originalPrice : { $arrayElemAt: ["$sizeArr.price.originalPrice", 0] },
      quantity: { $ifNull: ["$products.quantity", 0] },
      imageUrl: { $ifNull: ["$image.imageUrl", "default_image_url"] },
      varietyId : "$secvariety._id",
      sizeOptionId : { $arrayElemAt: ["$sizeArr._id",0] },
      inStock : {
        $cond : {
          if : {
            $gt : [{$arrayElemAt : ["$sizeArr.stock",0]},"$products.quantity"]
          },
          then : true,
          else :false
        }
      }
    }
  } 
  ])

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }
  await redis.set(`cart:${user._id}`,JSON.stringify(cart));
  await redis.expire(`cart:${user._id}`,600)
  return res.status(200).json(new ApiResponse(200,cart,"Successfully fetch user cart"))
})