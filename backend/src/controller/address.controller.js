import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Address from "../model/Address.model.js";
import { redis } from "../index.js";

const validateRequiredFields = (fields) => {
    if (fields.some(field => field === undefined || field === null || String(field).trim() === '')) {
        throw new ApiError(400, "All fields must be valid and not empty");
    }
};

const createAddress = asyncHandler(async (req, res) => {
    const user = req.user;
    const { address, landMark, city, state, postalCode, country } = req.body;

    validateRequiredFields([address, landMark, city, state, postalCode, country]);

    const newAddress = await Address.findOneAndUpdate(
        { user: user._id },
        { address, landMark, city, state, postalCode, country },
        { upsert: true, new: true, runValidators: true }
    ).select("-user").lean();

    if (!newAddress) {
        throw new ApiError(400, "Creating Address Failed");
    }

        await redis.set(`address:${user._id}`, JSON.stringify(newAddress));
        await redis.expire(`address:${user._id}`,600);
    res.status(201).json(new ApiResponse(200, newAddress, "Successfully created or updated Address"));
});

const deleteAddress = asyncHandler(async (req, res) => {
    const user = req.user;

    const result = await Address.deleteOne({ user: user._id });

    if (result.deletedCount === 0) {
        throw new ApiError(404, "Address not found or already deleted");
    }

    await redis.del(`address:${user._id}`);

    res.status(200).json(new ApiResponse(200, { user: user._id }, "Successfully deleted Address"));
});

const updateAddress = asyncHandler(async (req, res) => {
    const { address, landMark, city, state, postalCode, country } = req.body;

    validateRequiredFields([address, landMark, city, state, postalCode, country]);

    const updatedAddress = await Address.findOneAndUpdate(
        { user: req.user._id },
        { address, landMark, city, state, postalCode, country },
        { new: true, runValidators: true }
    ).select("-user").lean();

    if (!updatedAddress) {
        throw new ApiError(404, "Address not found for the user");
    }

        await redis.set(`address:${user._id}`, JSON.stringify(updatedAddress));
        await redis.expire(`address:${user._id}`,600);

    res.status(200).json(new ApiResponse(200, updatedAddress, "Address updated successfully"));
});

const getUserAddress = asyncHandler(async (req, res) => {
    const user = req.user;

    const cachedAddress = await redis.get(`address:${user._id}`);
    if (cachedAddress) {
        return res.status(200).json(new ApiResponse(200, JSON.parse(cachedAddress), "Successfully retrieved user address"));
    }

    const address = await Address.findOne({ user: user._id }).select("-user").lean();
    if (!address) {
        throw new ApiError(404, "Addresses not found");
    }

    await redis.set(`address:${user._id}`, JSON.stringify(address));
    res.status(200).json(new ApiResponse(200, address, "Successfully retrieved user address"));
});

export {
    createAddress,
    deleteAddress,
    updateAddress,
    getUserAddress,
};
