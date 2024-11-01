import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Wishlist } from "../model/Wishlist.model.js";
import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";
import { transformedWishlist } from "../utils/TransformUserWishlist.js";
import { redis } from "../index.js";

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
    throw new ApiError(400, "'ID's are not valid");
  }
  try {
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
    if (!userWishList) {
      throw new ApiError(400, "Already in wishlist");
    }
    const transformWish = transformedWishlist(userWishList);
    await redis.incr(`wishlistCount:${user._id}`)
    return res
      .status(200)
      .json(
        new ApiResponse(200, transformWish, "Wishlist updated successfully")
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Already in wishlist");
  } finally {
    const wishlistKeys = await redis.keys(`wishlist:${user._id}:skip:*`);
    if (wishlistKeys.length > 0) {
      await redis.del(wishlistKeys);
    }
  }
});

const removeFromWishlist = asyncHandler(async (req, res) => {
  const user = req.user;
  const { wishlistId } = req.params;

  if (!isValidObjectId(wishlistId)) {
    throw new ApiError(400, "WishlistId is not valid");
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
  await redis.decr(`wishlistCount:${user._id}`)
  const wishlistKeys = await redis.keys(`wishlist:${user._id}:skip:*`);
  if (wishlistKeys.length > 0) {
    await redis.del(wishlistKeys);
  }
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
  let { skip = 0 } = req.query;
  skip = parseInt(skip);
  const cachedWishlist = await redis.get(`wishlist:${user._id}:skip:${skip}`);
  if (cachedWishlist && cachedWishlist.length > 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          JSON.parse(cachedWishlist),
          "Successfully retrieved user wishlist"
        )
      );
  }
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
      $sort: {
        createdAt: 1,
      },
    },
    {
      $skip: parseInt(skip),
    },
    {
      $limit: parseInt(4),
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
        variety: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$product.variety",
                as: "vary",
                cond: { $eq: ["$$vary._id", "$products.varietyId"] },
              },
            },
            0,
          ],
        },
      },
    },
    {
      $addFields: {
        sizeOption: {
          $arrayElemAt: [
            {
              $filter: {
                input: "$variety.sizeOptions",
                as: "so",
                cond: { $eq: ["$$so._id", "$products.sizeOptionId"] },
              },
            },
            0,
          ],
        },
        image: { $arrayElemAt: ["$variety.images", 0] },
      },
    },
    {
      $project: {
        _id: "$products._id",
        title: "$product.title",
        imageUrl: "$image.imageUrl",
        discountedPrice: {
          $ifNull: ["$sizeOption.price.discountedPrice", null],
        },
        originalPrice: { $ifNull: ["$sizeOption.price.originalPrice", null] },
        sizeOptionId: "$products.sizeOptionId",
        productId: "$product._id",
      },
    },
  ]);

  if (!wishlist || wishlist.length === 0) {
    throw new ApiError(404, "Wishlist not found");
  }
  await redis.set(
    `wishlist:${user._id}:skip:${skip}`,
    JSON.stringify(wishlist)
  );
  return res
    .status(200)
    .json(
      new ApiResponse(200, wishlist, "Successfully retrieved user wishlist")
    );
});

const getUserWishlistCount = asyncHandler(async (req, res) => {
  const user = req.user;
  const wishlistCount = await redis.get(`wishlistCount:${user._id}`);
  if (wishlistCount) {
    return res
      .status(200)
      .json(new ApiResponse(200, wishlistCount, "Successfully retrieved user wishlist product count"));
  }
  const userWishlist = await Wishlist.findOne({ user: user._id }).select('products');
  const productCount = userWishlist ? userWishlist.products.length : 0;
  await redis.set(`wishlistCount:${user._id}`,productCount)
  return res
    .status(200)
    .json(
      new ApiResponse(200, productCount, "Successfully retrieved user wishlist product count")
    );
});

export { getUserWishlist, getUserWishlistCount, addToWishlist, removeFromWishlist };
