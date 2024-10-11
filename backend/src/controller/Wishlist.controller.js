import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Wishlist } from "../model/Wishlist.model.js";
import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";
import { transformedWishlist } from "../utils/TransformUserWishlist.js";

const addToWishlist = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(400, "User not found");
  }
  const { productId, sizeOptionId, varietyId } = req.body;

  if (
    !isValidObjectId(productId) ||
    !isValidObjectId(sizeOptionId) ||
    !isValidObjectId(varietyId)
  ) {
    throw new ApiError(400, "ID is not valid");
  }
  const userWishList = await Wishlist.findOneAndUpdate(
    {
      user: user._id,
      "products.product": { $ne: new mongoose.Types.ObjectId(productId) }, // Ensure the product isn't already present
      "products.sizeOptionId": {
        $ne: new mongoose.Types.ObjectId(sizeOptionId),
      },
      "products.varietyId": { $ne: new mongoose.Types.ObjectId(varietyId) },
    },
    {
      $addToSet: {
        products: {
          product: new mongoose.Types.ObjectId(productId),
          varietyId: new mongoose.Types.ObjectId(varietyId),
          sizeOptionId: new mongoose.Types.ObjectId(sizeOptionId),
        },
      },
    },
    { new: true, upsert: true }
  ).populate("products.product", "title variety");
  
  const transformWish = transformedWishlist(userWishList);
  
  if (!userWishList) {
    throw new ApiError(400, transformWish, "Already in wishlist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, transformWish, "Wishlist updated successfully"));
});

const removeFromWishlist = asyncHandler(async (req, res) => {
  const user = req.user;
  const { wishlistId} = req.body;
  
  if (!isValidObjectId(wishlistId) ) {
    throw new ApiError(400, "ID is not valid");
  }

  const userWishList = await Wishlist.findOneAndUpdate(
    { user: user._id },
    {
      $pull: {
        products: { _id: wishlistId },
      },
    },
    { new: true }
  )
    .populate("products.product", "title variety")
    .lean()
    .exec();
    
  const transformWish = transformedWishlist(userWishList);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        transformWish,
        "Product removed from wishlist successfully"
      )
    );
});

const getUserWishlist = asyncHandler(async (req, res) => {
  const user = req.user;
  const { skip = 0} = req.query;


  const wishlist = await Wishlist.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(user._id),
      },
    },
    {
      $unwind: "$products",
    },
    {
      $skip: parseInt(skip)
    },
    {
      $limit: parseInt(4)
    },
    {
      $lookup: {
        from: "products",
        localField: "products.product",
        foreignField: "_id",
        as: "productArr"
      }
    },
    {
      $addFields: {
        product: { $arrayElemAt: ["$productArr", 0] }
      }
    },
    {
      $addFields: {
        variety: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$product.variety",
                as: "vary",
                cond: { $eq: ["$$vary._id", "$products.varietyId"] }
              }
            },
            0
          ]
        }
      }
    },
    {
      $addFields: {
        sizeOption: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$variety.sizeOptions",
                as: "so",
                cond: { $eq: ["$$so._id", "$products.sizeOptionId"] }
              }
            },
            0
          ]
        },
        image: { $arrayElemAt: ["$variety.images", 0] },
      }
    },
    {
      $project: {
      _id : 1,
      title: "$product.title",
      imageUrl : "$image.imageUrl",
      discountedPrice: { $ifNull: ["$sizeOption.price.discountedPrice", null] },
      originalPrice: { $ifNull: ["$sizeOption.price.originalPrice", null] },
      sizeOptionId : "$products.sizeOptionId",
      productId : "$_id"
      }
    },
   
  ])
  
  if (!wishlist || wishlist.length === 0) {
    throw new ApiError(404, "Wishlist not found");
  }
  
  return res
    .status(200)
    .json(
      new ApiResponse(200, wishlist, "Successfully retrieved user wishlist")
    );
});

export { getUserWishlist, addToWishlist, removeFromWishlist };
