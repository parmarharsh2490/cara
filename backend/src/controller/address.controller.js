import { isValidObjectId } from "mongoose";
import Address from "../model/Address.model";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";


const createAddress = asyncHandler(async (req, res) => {
    const user = req.user;
    const { street, city, state, postalCode, country } = req.body;

    if ([street, city, state, postalCode, country].some(field => !field.trim())) {
        throw new ApiError(400, "All fields should be valid");
    }

    const newAddress = { street, city, state, postalCode, country };

    const address = await Address.findOneAndUpdate(
        { user: user._id },
        { $addToSet: { addresses: newAddress } },
        { upsert: true, new: true, runValidators: true }
    );

    res.status(200).json(new ApiResponse(200, address, "Successfully created Address"));
});

const deleteAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.params;
    const user = req.user;

    if (!addressId || !isValidObjectId(addressId)) {
        throw new ApiError(400, "Invalid AddressId");
    }

    const result = await Address.updateOne(
        { user: user._id },
        { $pull: { addresses: { _id: addressId } } }
    );

    if (result.modifiedCount === 0) {
        throw new ApiError(404, "Address not found or already deleted");
    }

    res.status(200).json(new ApiResponse(200, result, "Successfully deleted Address"));
});

const updateAddress = asyncHandler(async (req, res) => {
    const { addressId } = req.params;
    const { street, city, state, postalCode, country } = req.body;

    if ([street, city, state, postalCode, country].some(field => !field.trim())) {
        throw new ApiError(400, "All fields should be valid");
    }

    if (!addressId || !isValidObjectId(addressId)) {
        throw new ApiError(400, "Invalid addressId");
    }

    const address = await Address.findOne({
        user: req.user._id,
        'addresses._id': addressId
    }, {
        'addresses.$': 1
    });

    if (!address) {
        throw new ApiError(404, "Address not found");
    }

    const currentAddress = address.addresses[0];
    const updates = {};

    if (street && street !== currentAddress.street) updates['addresses.$.street'] = street;
    if (city && city !== currentAddress.city) updates['addresses.$.city'] = city;
    if (state && state !== currentAddress.state) updates['addresses.$.state'] = state;
    if (postalCode && postalCode !== currentAddress.postalCode) updates['addresses.$.postalCode'] = postalCode;
    if (country && country !== currentAddress.country) updates['addresses.$.country'] = country;

    if (Object.keys(updates).length === 0) {
        throw new ApiError(400, "No valid updates provided");
    }

    const result = await Address.findOneAndUpdate(
        { user: req.user._id, 'addresses._id': addressId },
        { $set: updates },
        { new: true }
    );

    res.status(200).json({
        success: true,
        message: "Address updated successfully",
        data: result
    });
});

const getUserAddresses = asyncHandler(async (req, res) => {
    const user = req.user;

    const addresses = await Address.findOne(
        { user: user._id },
        { 'addresses': 1 }
    );

    if (!addresses) {
        throw new ApiError(404, "Addresses not found");
    }

    res.status(200).json({
        success: true,
        message: "Successfully retrieved user addresses",
        data: addresses
    });
});

// const getAddressById = asyncHandler(async (req, res) => {
//     const { addressId } = req.params;
//     const user = req.user;

//     if (!addressId || !isValidObjectId(addressId)) {
//         throw new ApiError(400, "Invalid AddressId");
//     }

//     const address = await Address.findOne(
//         { user: user._id, 'addresses._id': addressId },
//         { 'addresses.$': 1 }
//     );

//     if (!address) {
//         throw new ApiError(404, "Address not found");
//     }

//     res.status(200).json({
//         success: true,
//         message: "Successfully retrieved address",
//         data: address.addresses[0]
//     });
// });


export {
    createAddress,
    deleteAddress,
    updateAddress,
    getUserAddresses,
    // getAddressById
};
