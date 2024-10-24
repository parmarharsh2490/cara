import mongoose from "mongoose";
import { isValidObjectId } from "mongoose";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Product } from "../model/Product.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { uploadImage } from "../utils/Cloudinary.js";
import { getIndexOfVarietyAndImage } from "../utils/index.js";
import Order from "../model/Order.model.js";
import { redis } from "../index.js";
import { Cart } from "../model/Cart.model.js";
const MAX_PRODUCTS = 80;
const getAllProducts = asyncHandler(async (req, res) => {
  const {
    searchTerm,
    color,
    pageParam = 0,
    gender,
    category,
    maxPrice,
    minPrice,
    priceHighToLow,
    priceLowToHigh,
  } = req.query;

  const parsedSkip = parseInt(pageParam*10);
  // console.log(searchTerm,
  //   color,
  //   parsedSkip,
  //   gender,
  //   category,
  //   maxPrice,
  //   minPrice,
  //   priceHighToLow,
  //   priceLowToHigh)
  if (isNaN(parsedSkip) || parsedSkip < 0) {
    throw new ApiError(400, "Invalid skip value");
  }

  const firstMatchConditions = [];
  const secondMatchConditions = {};

  if (category) firstMatchConditions.push({ category });
  if (gender) firstMatchConditions.push({ gender });
  if (searchTerm) {
    firstMatchConditions.push({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
      ],
    });
  }
  if (minPrice && maxPrice) {
    secondMatchConditions["variety.sizeOptions.price.discountedPrice"] = {
      $gte: parseFloat(minPrice),
      $lte: parseFloat(maxPrice),
    };
  }
  if (color) secondMatchConditions["variety.color"] = color;

  let firstSortCondition = {};
  let SecondSortCondition = {};
  if (priceHighToLow === "true") {
    firstSortCondition["variety.sizeOptions.price.discountedPrice"] = -1;
    SecondSortCondition = { discountedPrice: -1 };
  } else if (priceLowToHigh === "true") {
    firstSortCondition["variety.sizeOptions.price.discountedPrice"] = 1;
    SecondSortCondition = { discountedPrice: 1 };
  } else {
    firstSortCondition.createdAt = -1;
    SecondSortCondition = { createdAt: -1 };
  }
  if (priceHighToLow === "true" && priceLowToHigh === "true") {
    throw new ApiError(400, "Conflicting price sort conditions");
  }

  const aggregationPipiline = [];
  if (firstMatchConditions.length !== 0) {
    aggregationPipiline.push({ $match: { $and: firstMatchConditions } });
  }
  aggregationPipiline.push(
    ...[
      { $unwind: { path: "$variety" } },
      { $unwind: { path: "$variety.sizeOptions" } },
      { $match: secondMatchConditions },
      { $sort: firstSortCondition },
      { $limit: MAX_PRODUCTS },
      {
        $group: {
          _id: "$_id",
          products: {
            $push: {
              _id: "$_id",
              title: "$title",
              description: "$description",
              imageUrl: { $first: "$variety.images.imageUrl" },
              originalPrice: "$variety.sizeOptions.price.originalPrice",
              discountedPrice: "$variety.sizeOptions.price.discountedPrice",
              createdAt: "$createdAt",
            },
          },
        },
      },
      {
        $project: {
          product: {
            $first: {
              $sortArray: {
                input: "$products",
                sortBy: SecondSortCondition,
              },
            },
          },
        },
      },
      { $replaceRoot: { newRoot: "$product" } },
      { $sort: SecondSortCondition },
      { $skip: parsedSkip },
      { $limit: 10 },
    ]
  );
  let redisKey = `products:category:${category || "all"}:gender:${
    gender || "all"
  }:color:${color || "all"}:search:${searchTerm || "none"}:priceRange:${
    minPrice || "none"
  }-${maxPrice || "none"}:sort:${
    priceHighToLow === "true"
      ? "highToLow"
      : priceLowToHigh === "true"
      ? "lowToHigh"
      : "recent"
  }:skip:${parsedSkip}`;
  
  const cachedProducts = await redis.lrange(redisKey, 0, -1);
  if (cachedProducts && cachedProducts.length > 0) {
    const data = cachedProducts.map((product) => {
      return JSON.parse(product);
    });
    return res
      .status(200)
      .json(new ApiResponse(200, data, "Successfully fetched products"));
  }
  const products = await Product.aggregate(aggregationPipiline);
  if (!products || products.length == 0) {
    throw new ApiError(400, "Products not found");
  }
  await redis.rpush(
    redisKey,
    ...products.map((product) => JSON.stringify(product))
  );
  await redis.expire(redisKey, 600);
  res
    .status(200)
    .json(new ApiResponse(200, products, "Successfully fetched products"));
});

const getTopSelledProducts = asyncHandler(async (req, res) => {
  const { skip = 0, limit = 10 } = req.query;
  const cachedProducts = await redis.lrange(
    "topSelledProducts",
    parseInt(skip),
    parseInt(skip + limit)
  );
  if (cachedProducts && cachedProducts.length > 0) {
    let data = cachedProducts.map((product) => JSON.parse(product));
    res
      .status(200)
      .json(
        new ApiResponse(200, data, "Successfully fetched top sold products")
      );
  }
  const products = await Order.aggregate([
    { $unwind: { path: "$products" } },
    {
      $group: {
        _id: "$products.product",
        count: { $sum: "$products.quantity" },
      },
    },
    { $sort: { count: -1 } },
    { $skip: parseInt(skip) },
    { $limit: parseInt(limit) },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    { $addFields: { product: { $first: "$product" } } },
    {
      $project: {
        quantity: "$count",
        title: "$product.title",
        imageUrl: {
          $first: { $arrayElemAt: ["$product.variety.images.imageUrl", 0] },
        },
        originalPrice: {
          $first: {
            $arrayElemAt: [
              "$product.variety.sizeOptions.price.originalPrice",
              0,
            ],
          },
        },
        discountedPrice: {
          $first: {
            $arrayElemAt: [
              "$product.variety.sizeOptions.price.discountedPrice",
              0,
            ],
          },
        },
      },
    },
  ]);
  if (!products || products?.length == 0) {
    throw new ApiError(400, "Top Selled Products not found");
  }
  if (!products || products.length == 0) {
    res
      .status(500)
      .json(new ApiResponse(500, null, "Error fetching top sold products"));
  }
  await redis.lpush(
    "topSelledProducts",
    ...products.map((product) => JSON.stringify(product))
  );
  await redis.expire("topSelledProducts",600)

  res
    .status(200)
    .json(
      new ApiResponse(200, products, "Successfully fetched top sold products")
    );
});

const getProductDetails = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId || !isValidObjectId(productId)) {
    throw new ApiError(400, "ProductId is invalid");
  }
  const cachedProductDetails = await redis.get(`product:${productId}`);
  if (cachedProductDetails) {
    console.log(cachedProductDetails);
    
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          JSON.parse(cachedProductDetails),
          "Successfully retrieved product details"
        )
      );
  }
  const product = await Product.findById(productId).populate("owner").lean();
  const cart = await Cart.findOne({user : req.user._id});
  console.log(product._id);
  product.isAlreadyInCart = cart && cart.products.some(cartProduct => cartProduct.product.toString() === product._id.toString());
  console.log(product.isAlreadyInCart);
  
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  await redis.set(`product:${productId}`, JSON.stringify(product));
  await redis.expire(`product:${productId}`,600)
  return res
    .status(200)
    .json(
      new ApiResponse(200, product, "Successfully retrieved product details")
    );
});

const getAdminProducts = asyncHandler(async (req, res) => {
  const user = req.user;
  let { skip } = req.query;
  skip = parseInt(skip);
  const cachedProducts = await redis.lrange("adminProducts", skip, skip + 10);
  if (cachedProducts && cachedProducts.length > 0) {
    const data = cachedProducts.map((product) => JSON.parse(product));
    return res
      .status(200)
      .json(new ApiResponse(200, data, "Successfully get Admin Products"));
  }
  if (isNaN(skip) || skip < 0) {
    throw new ApiError(400, "Invalid limit or skip value");
  }
  const products = await Product.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(user._id),
      },
    },
    {
      $sort: {
        createdAt: 1,
      },
    },
    {
      $skip: skip,
    },
    {
      $limit: 10,
    },
    {
      $project: {
        title: 1,
        price: {
          $first: { $first: "$variety.sizeOptions.price.discountedPrice" },
        },
        imageUrl: { $first: { $first: "$variety.images.imageUrl" } },
      },
    },
  ]);
  if (!products || products?.length == 0) {
    throw new ApiError(400, "No Products Found");
  }
  await redis.rpush(
    "adminProducts",
    ...products.map((product) => JSON.stringify(product))
  );
  await redis.expire("adminProducts",600);
  return res
    .status(200)
    .json(new ApiResponse(200, products, "Successfully get Admin Products"));
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
  // res.status(200).json(new ApiResponse(200,{user,parsedVariety,files}))
  // const images = [];
  // for await(let file of files){
  //   const imageDetails = await uploadImage(file.path);
  //   images.push({ publicId: imageDetails.public_id, imageUrl: imageDetails.secure_url },)
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
    owner: user._id,
    title,
    description,
    category,
    rating,
    variety: parsedVariety,
    gender,
  });
  await redis.set(`product:${product._id}`,JSON.stringify(product));
  await redis.expire(`product:${product._id}`,600);
  await redis.lpush(
    `products:category:all:gender:all:color:all:search:none:priceRange:none-none:sort:recent:skip:0`,
    JSON.stringify({_id: product._id,
            title: product.title,
            description: product.description,
            imageUrl: product.variety[0].images[0].imageUrl,
            originalPrice: product.variety[0].sizeOptions[0].price.originalPrice,
            discountedPrice: product.variety[0].sizeOptions[0].price.originalPrice,
            createdAt: product.createdAt})
  );
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
  await redis.set(`product:${productId}`, updatedProduct);
  await redis.expire(`product:${productId}`,600);
  await redis.del('topSelledProducts');
await redis.del('adminProducts');
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
  await redis.del(`product:${productId}`);
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Successfully deleted product"));
});

export {
  getAllProducts,
  getAdminProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
  getTopSelledProducts,
};
