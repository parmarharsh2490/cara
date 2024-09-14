import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Product } from "../model/Product.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { uploadImage } from "../utils/Cloudinary.js";
import { getIndexOfVarietyAndImage } from "../utils/index.js";

const getAllProducts = asyncHandler(async (req, res) => {
  const {  searchTerm,  color,  latestProduct,  skip = 0,  limit = 10,  category,  maxPrice,  minPrice,  priceHighToLow,  priceLowToHigh } = req.query;
  console.log("start");
  console.log(latestProduct);
  
  if (latestProduct) {
    const products = await Product.aggregate([
      {
        $project: {
          _id: 1,
          title: 1,
          price: { $arrayElemAt: ["$variety.sizeOptions.price", 0] },
          imageUrl: { $arrayElemAt: ["$variety.images.imageUrl", 0] }
        }
      },
      { $sort: { createdAt: 1 } },
      { $skip: parseInt(skip) },
      { $limit: parseInt(limit) }
    ]);
    return res.status(200).json({ data: products });
  }
  console.log("end");

  const matchConditions = [];
  if (category) matchConditions.push({ category });
  if (color) matchConditions.push({ color });
  if (searchTerm) {
    matchConditions.push({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    });
  }
  if (minPrice && maxPrice) {
    matchConditions.push({ price: { $gte: minPrice, $lte: maxPrice } });
  }

  let sortOptions = {};
  if (priceHighToLow) sortOptions.price = -1;
  if (priceLowToHigh) sortOptions.price = 1;
  if (!priceHighToLow && !priceLowToHigh) sortOptions.createdAt = 1;

  const products = await Product.aggregate([
    { $match: { $and: matchConditions } },
    { $sort: sortOptions },
    { $skip: parseInt(skip) },
    { $limit: parseInt(limit) },
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
  let { title, description, category, variety, gender, rating = 0 } = req.body;
  const parsedVariety =
    typeof variety === "string" ? JSON.parse(variety) : variety;
  const user = req.user;

  // Validate required fields
  if (
    [title, description, category, gender].some((entry) => entry.trim() == "")
  ) {
    throw new ApiError(400, "Entry fields should not be empty");
  }

  // Validate images
  const files = req.files;

  if (!files || files.length === 0) {
    throw new ApiError(400, "At least one image is required");
  }

  // Map images to the variety array
  parsedVariety.forEach((v) => (v.images = []));
  files.forEach((file) => {
    const index = parseInt(file.fieldname.substr(8, 1));
    if (parsedVariety[index]) {
      parsedVariety[index].images.push(file);
    }
  });

  // const images = [];
  // for await(let file of files){
  //   const imageDetails = await uploadImage(file.path);
  //   images.push({ publicId: imageDetails.public_id, imageUrl: imageDetails.secure_url },)
  //   console.log(images);
  // }
  //Promise.all is use because This allows you to handle multiple file uploads concurrently rather than sequentially. It's much faster when you need to upload many images.
  await Promise.all(
    parsedVariety.map(async (variety) => {
      variety.images = await Promise.all(
        variety.images.map(async (file) => {
          const { public_id, secure_url } = await uploadImage(file.path);
          return {
            publicId: public_id,
            imageUrl: secure_url,
          };
        })
      );
    })
  );

  // Create the product
  const product = await Product.create({
    owner: "60d5c5f6973a3b001f6473e9",
    title,
    description,
    category,
    rating,
    variety: parsedVariety,
    gender,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Successfully created product"));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  let { title, description, category, variety, gender } = req.body;

  const parsedVariety =
    typeof variety === "string" ? JSON.parse(variety) : variety;
  const user = req.user;

  if (!productId || !mongoose.isValidObjectId(productId)) {
    throw new ApiError(400, "ProductId should be valid");
  }

  if (
    [title, description, category, gender].some((entry) => entry.trim() === "")
  ) {
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
  if (product.title !== title) updateFields.title = title;
  if (product.description !== description)
    updateFields.description = description;
  if (product.category !== category) updateFields.category = category;
  if (product.gender !== gender) updateFields.gender = gender;

  const files = req.files;

  if (files && Array.isArray(files)) {
    files.forEach((file) => {
      //file.fieldName = variety[0].images[0]
      const { varietyIndex, imageIndex } = getIndexOfVarietyAndImage(
        file.fieldname
      );
      if (
        parsedVariety[varietyIndex] &&
        parsedVariety[varietyIndex].images[imageIndex]
      ) {
        parsedVariety[varietyIndex].images[imageIndex] = file;
      }
    });
  }

  await Promise.all(
    parsedVariety.map(async (variety) => {
      variety.images = await Promise.all(
        variety.images.map(async (file) => {
          if (file && file.path) {
            const { public_id, secure_url } = await uploadImage(file.path);
            return {
              publicId: public_id,
              imageUrl: secure_url,
            };
          }
          return file;
        })
      );
    })
  );
  updateFields.variety = parsedVariety;
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
// done//4th search if(searchTerm) {matchCondtions.push({search : $regex and other in title and description})}
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
