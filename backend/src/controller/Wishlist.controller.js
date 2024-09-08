import { isValidObjectId } from "mongoose";
import { Wishlist } from "../model/WishList.model";
import { asyncHandler } from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";


const toggleWishlist = asyncHandler(async (req, res) => {
    const  user  = req.body;
    const { productId } = req.params;

    if (!user || !isValidObjectId(user._id)) {
        throw new ApiError(400, "User is not valid");
    }

    if (!isValidObjectId(productId)) {
        throw new ApiError(400, "Product ID is not valid");
    }

    let userWishList = await Wishlist.findOneAndUpdate(
        {
            user : user._id
        },
        {
                $addToSet : {
                    products : productId
                }
        },
        {
            new : true ,
            upsert : true
        }
    ).select("products").populate("products","images price").lean().exec()

    return res.status(200).json(new ApiResponse(200, userWishList, "Wishlist updated successfully"));
});

export { toggleWishlist };


const getUserWishlist = asyncHandler(async (req, res) => {
    const user  = req.body;

    if (!user || !isValidObjectId(user._id)) {
        throw new ApiError(400, "User is not valid");
    }

    const wishlist = await Wishlist.findOne({ user: user._id }).select('products').lean().exec();
    // const wishlist = await Wishlist.findOne({ user: user._id }).select('products').populate("products","images price").lean().exec();
    if (!wishlist) {
        throw new ApiError(404, "Wishlist not found");
    }

    return res.status(200).json(new ApiResponse(200, wishlist, "Successfully received user wishlist"));
});

export { getUserWishlist };
