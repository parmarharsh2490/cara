import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import mongoose, { isValidObjectId } from "mongoose";
import { uploadImage } from "../utils/Cloudinary.js";
import { ProductReview } from "../model/ProductReview.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { transformProductReviewData } from "../utils/TransformReviewData.js";
import { redis } from "../index.js";

const createProductReview = asyncHandler(async (req, res) => {
  const user = req.user;
  const { productId } = req.params;
  if (!productId || !isValidObjectId(productId)) {
    throw new ApiError(400, "ProductId is not valid");
  }
  const { ratingStar, reviewTitle, reviewDescription } = req.body;
  const file = req.file;

  if (!ratingStar || !reviewTitle || !reviewDescription) {
    throw new ApiError(400, "Input fields cannot be empty");
  }

  if (isNaN(ratingStar) || ratingStar < 1 || ratingStar > 5) {
    throw new ApiError(400, "Rating star must be a number between 1 and 5");
  }

  if (!file) {
    throw new ApiError(400, "Review image not found");
  }

  const existingProductReview = await ProductReview.findOne({
    user: user._id,
    product: productId,
  });

  if (existingProductReview) {
    throw new ApiError(400, "You have already reviewed this product");
  }

  const image = await uploadImage(file.path);
  if (!image || !image.secure_url) {
    throw new ApiError(500, "Failed to upload image");
  }

  const review = await ProductReview.create({
    user: user._id,
    ratingStar: Number(ratingStar),
    reviewImage: {
      imageUrl: image.secure_url,
      publicId: image.public_id,
    },
    reviewTitle,
    reviewDescription,
    product: productId,
  })

  if (!review) {
    throw new ApiError(500, "Failed to create review");
  }
  review.name = user.name;
  const transformReview = transformProductReviewData(review);
  // await redis.del(`review:${productId}`)
  await redis.lpush(`review:${productId}`,JSON.stringify(transformReview))
  return res.status(201).json(new ApiResponse(201, transformReview, "Review created successfully"));
});

const updateProductReview = asyncHandler(async (req, res) => {
  const user = req.user;
  const { productId } = req.params;
  if (!productId || !isValidObjectId(productId)) {
    throw new ApiError(400, "ProductId is not valid");
  }
  const { ratingStar, reviewTitle, reviewDescription } = req.body;

  if (!ratingStar || !reviewTitle || !reviewDescription) {
    throw new ApiError(400, "Input fields cannot be empty");
  }

  if (isNaN(ratingStar) || ratingStar < 1 || ratingStar > 5) {
    throw new ApiError(400, "Rating star must be a number between 1 and 5");
  }

  const existingProductReview = await ProductReview.findOne({
    user: user._id,
    product: productId,
  }).select('-user -product -updatedAt');
  if (!existingProductReview) {
    throw new ApiError(404, "Product Review not found");
  }

  const file = req.file;
  if (file) {
    let image = await uploadImage(file.path);
    // have to improve delete image functionality here
    existingProductReview.reviewImage = {
      imageUrl: image.url,
      publicId: image.public_id,
    };
  }
  existingProductReview.ratingStar = ratingStar;
  existingProductReview.reviewTitle = reviewTitle;
  existingProductReview.reviewDescription = reviewDescription;
  await existingProductReview.save({ validationBeforeSave: false });
  existingProductReview.name = user.name;
  const transformReview = transformProductReviewData(existingProductReview)
  await redis.del(`review:${productId}`)
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        transformReview,
        "Successfully updated product review"
      )
    );
});

const deleteProductReview = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productReviewId } = req.params;

  if (!productReviewId || !isValidObjectId(productReviewId)) {
    throw new ApiError(400, "Invalid ProductReview ID");
  }

  const productReview = await ProductReview.findById(productReviewId);
  if (!productReview) {
    throw new ApiError(404, "ProductReview not found");
  }

  if (!userId.equals(productReview.user)) {
    throw new ApiError(403, "Unauthorized to delete this ProductReview");
  }

  await ProductReview.findByIdAndDelete(productReviewId);
  await redis.del(`review:${productId}`)
  return res
    .status(204)
    .json(new ApiResponse(204, null, "ProductReview successfully deleted"));
});

const getAverageProductReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const {skip=0}  =req.query;
  const parsedSkip = parseInt(skip);
  
  const cachedProductReviewList = await redis.lrange(`review:${productId}`,parsedSkip,parsedSkip+5);
  console.log(cachedProductReviewList);
  
  if(cachedProductReviewList && cachedProductReviewList.length > 0){
    console.log("cached data");
    const data = cachedProductReviewList.map((review) => {
      return JSON.parse(review)
    })
    return res.status(200).json(new ApiResponse(200,data,"Successfully fetch user cart"))
  }  
  if (isNaN(parsedSkip) || parsedSkip < 0) {
    throw new ApiError(400, "Invalid  skip value");
  }
  if (!productId || !isValidObjectId(productId)) {
    throw new ApiError(400, "Invalid product ID");
  }

  const ratingData = await ProductReview.aggregate([
    {
      $match: {
        product: { $eq: new mongoose.Types.ObjectId(productId) }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $sort : {
        createdAt : 1
      }
    },
    {
      $skip : parsedSkip
    },
    {
      $limit : 5
    },
      {
        $group: {
          _id: "$ratingStar",
          count: { $sum: 1 },
          reviews: {
            $push: {
              _id : "$_id",
              title: "$reviewTitle",
              description: "$reviewDescription",
              image: "$reviewImage",
              rating : "$ratingStar",
              user : {$first : "$user.name"},
              date : { "$dateToString": { "format": "%d-%m-%Y", "date": "$createdAt" } }
            }
          }
        }
      },
      {
        $group: {
          _id: null,
          totalUserCount: { $sum: "$count" },
          weightedSum: {
            $sum: { $multiply: ["$_id", "$count"] }
          },
          ratingStar: {
            $push: {
              k: { $toString: "$_id" },
              v: "$count"
            }
          },
          allReviews: {
            $push: {
              rating: "$_id",
              reviews: "$reviews"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalUserCount: 1,
          averageRating: {
            $round: [
              {
                $divide: [
                  "$weightedSum",
                  "$totalUserCount"
                ]
              },
              2
            ]
          },
          // Add default rating data for ratings 1 to 5
          ratingStar: {
            $arrayToObject: {
              $concatArrays: [
                [
                  { k: "1", v: 0 },
                  { k: "2", v: 0 },
                  { k: "3", v: 0 },
                  { k: "4", v: 0 },
                  { k: "5", v: 0 }
                ],
                "$ratingStar"
              ]
            }
          },
          reviews: {
            $reduce: {
              input: "$allReviews",
              initialValue: [],
              in: {
                $concatArrays: [
                  "$$value",
                  "$$this.reviews"
                ]
              }
            }
          }
        }
      }
    ]    
  )
  
  const reviewsToCache = ratingData[0].reviews.map((review) => JSON.stringify(review));
  await redis.rpush(`review:${productId}`, ...reviewsToCache);
  await redis.expire(`review:${productId}`,600);
return res.status(200).json(new ApiResponse(200, ratingData, "Average rating retrieved successfully"));
});

export {
  createProductReview,
  updateProductReview,
  deleteProductReview,
  getAverageProductReview,
};