import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Address from "../model/Address.model.js"
const createAddress = asyncHandler(async (req, res) => {
    const user = req.user;
    const { address, locality, landMark, city, state, postalCode, country } = req.body;

    const requiredFields = [address, locality, city, state, postalCode, country,landMark];

    if (requiredFields.some(field => field === undefined || field === null || String(field).trim() === '')) {
        throw new ApiError(400, "All fields must be valid and not empty");
    }

    const newAddress = await Address.findOneAndUpdate(
        { user: user._id },
        {  address, locality, landMark, city, state, postalCode, country },
        { upsert: true, new: true, runValidators: true }
    ).select("-user").lean();

    res.status(201).json(new ApiResponse(200, newAddress, "Successfully created or updated Address"));
});

const deleteAddress = asyncHandler(async (req, res) => {
    const user = req.user;

    const result = await Address.deleteOne({ user: user._id });

    if (result.deletedCount === 0) {
        throw new ApiError(404, "Address not found or already deleted");
    }

    res.status(204).json(new ApiResponse(200, result, "Successfully deleted Address"));
});

const updateAddress = asyncHandler(async (req, res) => {
    const { address, locality, landMark, city, state, postalCode, country } = req.body;    

    const requiredFields = [address, locality, landMark, city, state, postalCode, country];
    if (requiredFields.some(field => field === undefined || field === null || String(field).trim() === '')) {
        throw new ApiError(400, "All fields must be valid and not empty");
    }

    const updatedAddress = await Address.findOneAndUpdate(
        { user: req.user._id },
        { address, locality, landMark, city, state, postalCode, country },
        { new: true, runValidators: true }
    ).select("-user").lean();

    if (!updatedAddress) {
        throw new ApiError(404, "Address not found for the user");
    }

    res.status(200).json(new ApiResponse(200, updatedAddress, "Address updated successfully"));
});

const getUserAddress = asyncHandler(async (req, res) => {
    const user = req.user;

    const address = await Address.findOne({ user: user._id }).select("-user").lean();

    if (!address) {
        throw new ApiError(404, "Addresses not found");
    }

    res.status(200).json(new ApiResponse(200, address, "Successfully retrieved user address"));
});

export {
    createAddress,
    deleteAddress,
    updateAddress,
    getUserAddress,
};
