import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Wishlist } from "../model/Wishlist.model.js";
import ApiError from "../utils/ApiError.js";

const addToWishlist = asyncHandler(async (req, res) => {
    const user = req.user;
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
        throw new ApiError(400, "Product ID is not valid");
    }

    const userWishList = await Wishlist.findOneAndUpdate(
        { user: user._id },
        { $addToSet: { products: productId } },
        { new: true, upsert: true }
    )
        .select("products")
        .populate("products", "images price")
        .lean()
        .exec();

    return res.status(200).json(new ApiResponse(200, [], "Wishlist updated successfully"));
});

const removeFromWishlist = asyncHandler(async (req, res) => {
    const user = req.user;
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
        throw new ApiError(400, "Product ID is not valid");
    }

    const userWishList = await Wishlist.findOneAndUpdate(
        { user: user._id },
        { $pull: { products: productId } },
        { new: true }
    )
        .select("products")
        .populate("products", "images price")
        .lean()
        .exec();

    return res.status(200).json(new ApiResponse(200, [], "Product removed from wishlist successfully"));
});

const getUserWishlist = asyncHandler(async (req, res) => {
    const user = req.user;
    const { limit = 10, skip = 0 } = req.query;

    const wishlist = await Wishlist.findOne({ user: user._id })
        .select("products")
        .populate("products", "title  variety.0.images") 
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .lean()
        .exec();

    if (!wishlist || wishlist.products.length === 0) {
        throw new ApiError(404, "Wishlist not found");
    }

    return res.status(200).json(new ApiResponse(200, wishlist, "Successfully retrieved user wishlist"));
});

export {
    getUserWishlist,
    addToWishlist,
    removeFromWishlist
};
