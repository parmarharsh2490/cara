import mongoose from "mongoose";

const ratingSchema = mongoose.Schema(
    {
        ratingStar: {
            type: Number,
            required: true,
            min: 1, 
            max: 5
        },
        ratingWords: {
            type: String,
            required: true
        },
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

export const Rating = mongoose.model("Rating", ratingSchema);
