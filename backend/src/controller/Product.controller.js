import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Product } from "../model/Product.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";


const getAllProducts = asyncHandler(async (req, res) => {
  const { searchTerm, color, latestProduct, skip = 10, limit = 10, category, maxPrice, minPrice, priceHighToLow, priceLowToHigh } = req.query;

  const matchConditions = [];
  if (category) matchConditions.push({ category });
  if (color) matchConditions.push({ color });
  if (searchTerm) {
    matchConditions.push({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ]
    });
  }
  if (minPrice && maxPrice) {
    matchConditions.push({ price: { $gte: minPrice, $lte: maxPrice } });
  }

  let sortOptions = {};
  if (priceHighToLow) sortOptions.price = -1;
  if (priceLowToHigh) sortOptions.price = 1;
  if (!priceHighToLow && !priceLowToHigh) sortOptions.createdAt = 1;

  if (latestProduct) {
    const products = await Product.find().sort({ createdAt: 1 }).skip(parseInt(skip)).limit(parseInt(limit));
    return res.status(200).json({ length: products.length, data: products });
  }

  const products = await Product.aggregate([
    { $match: { $and: matchConditions } },
    { $sort: sortOptions },
    { $skip: parseInt(skip) },
    { $limit: parseInt(limit) }
  ]);

  res.status(200).json({ data: products, length: products.length });
});

const getProductDetails = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId || !isValidObjectId(productId)) {
    throw new ApiError(400, "ProductId is invalid");
  }
  const product = await Product.findById(productId).populate("owner");
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, product, "Successfully retrieved product details")
    );
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    images,
    sizeOptions,
    rating = 0,
  } = req.body; // Default rating to 0

  // const user = req.user;

  // Validate required fields
  if ([name, description, category].some((entry) => entry.trim() == "")) {
    throw new ApiError(400, "Entry fields should not be empty");
  }

  // Validate images
  if (!Array.isArray(images) || images.length === 0) {
    throw new ApiError(400, "Images not found");
  }

  // Validate sizeOptions
  if (!Array.isArray(sizeOptions) || sizeOptions.length === 0) {
    throw new ApiError(400, "Size options not found");
  }

  // Create the product
  const product = await Product.create({
    owner: req.user._id,
    name,
    description,
    category,
    images,
    rating,
    sizeOptions,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Successfully created product"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, category, sizeOptions } = req.body;
  const { productId } = req.params;
  const user = req.user;

  if (!productId || !mongoose.isValidObjectId(productId)) {
    throw new ApiError(400, "ProductId should be valid");
  }

  if ([name, description, category].some((entry) => entry.trim() === "")) {
    throw new ApiError(400, "Entry fields should not be empty");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Cannot find product");
  }

  if (!product.owner._id.equals(user._id)) {
    throw new ApiError(403, "You are not authorized to update this product");
  }

  const updateFields = {};
  if (product.name !== name) updateFields.name = name;
  if (product.description !== description)
    updateFields.description = description;
  if (product.category !== category) updateFields.category = category;
  if (JSON.stringify(product.sizeOptions) !== JSON.stringify(sizeOptions)) {
    updateFields.sizeOptions = sizeOptions;
  }

  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, "No changes detected");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    updateFields,
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Successfully updated product"));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const user = req.user;
  const { productId } = req.params;
  if (!productId || !mongoose.isValidObjectId(productId)) {
    throw new ApiError(400, "ProductId should be valid");
  }
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Cannot find product");
  }
  if (!product.owner._id.equals(user._id)) {
    throw new ApiError(403, "You are not authorized to delete this product");
  }
  await Product.findByIdAndDelete(productId);
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Successfully deleted product"));
});

export {
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
};



/// my products
// done// 1st without query all products //not needed
// done// 2nd lastest arrival createdAt : -1 
// done//3rd category  if(category){ matchCondtions.push({category : category}) }
// done//4th search if(searchTerm) {matchCondtions.push({search : $regex and other in name and description})}
// done//5th price highToLow and lowToHigh : hard 
// //6th price range $gt $lt can be use
// done//7th color : easy 
//8th season best collection most purchase products

// { tags: { $nin: [ "school" ] } },

// if(ratingHighToLow){
//     // { //1st option in aggregate
//     //     $sort: {
//     //       rating: 1,
//     //     }
//     // }
//     // 2nd option is .sort({ rating : 1 })
//   }