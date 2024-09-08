import ApiError from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Rating } from "../model/Rating.model.js";
import { isValidObjectId } from "mongoose";

const createRating = asyncHandler(async(req, res) => {
    const user = req.user;
    const { ratingWords, ratingStar, productId } = req.body;

    if (!ratingWords || !ratingStar || !productId || !ratingStar.trim()) {
        throw new ApiError(400, "Input fields cannot be empty");
    }

    if (isNaN(ratingStar) || ratingStar < 1 || ratingStar > 5) {
        throw new ApiError(400, "Rating star must be a number between 1 and 5");
    }

    const rating = await Rating.create({
        user: user._id,
        ratingStar: Number(ratingStar),
        ratingWords,
        product: productId
    });

    if (!rating) {
        throw new ApiError(500, "Failed to create rating");
    }

    return res.status(201).json({ data: rating });
});

const updateRating = asyncHandler(async(req, res) => {
    const { ratingId, ratingStar, ratingWords } = req.body;

    if (!ratingId || !ratingStar || !ratingWords || isNaN(ratingStar)) {
        throw new ApiError(400, "Invalid input data");
    }

    if (ratingStar < 1 || ratingStar > 5) {
        throw new ApiError(400, "Rating star must be between 1 and 5");
    }

    const updatedRating = await Rating.findByIdAndUpdate(
        ratingId,
        { ratingStar: Number(ratingStar), ratingWords },
        { new: true }
    );

    if (!updatedRating) {
        throw new ApiError(404, "Rating not found");
    }

    return res.status(200).json({ data: updatedRating });
});

const deleteRating = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    const { ratingId } = req.params;

    if (!ratingId || !isValidObjectId(ratingId)) {
        throw new ApiError(400, "Invalid rating ID");
    }

    const rating = await Rating.findById(ratingId);
    if (!rating) {
        throw new ApiError(404, "Rating not found");
    }

    if (!userId.equals(rating.user)) {
        throw new ApiError(403, "Unauthorized to delete this rating");
    }

    await Rating.findByIdAndDelete(ratingId);
    return res.status(200).json({ message: "Rating successfully deleted" });
});

const getAverageRating = asyncHandler(async(req, res) => {
    const { productId } = req.params;

    if (!productId || !isValidObjectId(productId)) {
        throw new ApiError(400, "Invalid product ID");
    }

    const averageRating = await Rating.aggregate([
        {
            $match: { product: productId }  // Filter ratings for the specific product
        },
        {
            $group: {
                _id: "$product",  // Group by product ID
                ratingAverage: { $avg: "$ratingStar" }  // Calculate the average of the ratingStar field
            }
        }
    ]);

    if (averageRating.length === 0) {
        return res.status(404).json({ message: "No ratings found for this product" });
    }

    return res.status(200).json({ data: averageRating[0] });
});

export {
    createRating,
    updateRating,
    deleteRating,
    getAverageRating,
    getProductRating
}
