import { redis } from "../index.js";
import Order from "../model/Order.model.js";
import { Payment } from "../model/Payment.model.js";
import { Product } from "../model/Product.model.js";
import Seller from "../model/Seller.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js"
import mongoose from "mongoose";
export {
    getSellerDetails,
    updateSellerDetails,
    registerSeller,
    getDashboardDetails,
    getAnalyticsDetails
}

const getSellerDetails = asyncHandler(async(req,res) => {
    const user = req.user;
    if(!user){
        throw new ApiError(401,"User not found");
    }
    const cachedSeller = await redis.get(`sellerDetails:${user._id}`);
    if(cachedSeller){
      return res
      .status(200)
      .json(new ApiResponse(200,JSON.parse(cachedSeller),"Successfully get user")) 
    }
    const seller = await Seller.findOne({user : user._id}).populate("bankAccountDetails"); 
    if(!seller){
        throw new ApiError(400,"Seller Details not found")
    }
    await redis.set(`sellerDetails:${user._id}`,JSON.stringify(seller))
    await redis.expire(`sellerDetails:${user._id}`,600)
    return res
    .status(200)
    .json(new ApiResponse(200,seller,"Successfully get user")) 
})

const updateSellerDetails = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  const  {businessInformation,bankAccountDetails,legalInformation}  = req.body;
  if(!businessInformation && !legalInformation && !bankAccountDetails){
    throw new ApiError(400, "Updated Fields not found");
  }

  let seller = await Seller.findOne({ user: user._id }).populate("bankAccountDetails");
  if (!seller) {
    throw new ApiError(400, "Seller Details not found");
  }
  if(businessInformation){
    seller.businessInformation = {...businessInformation}
  }
  if(legalInformation){
    seller.legalInformation = {...legalInformation}
  }
  if(bankAccountDetails){
    seller.bankAccountDetails = {...bankAccountDetails}
  }    
  await seller.save({validationBeforeSave : false});
  // await redis.del(`sellerDetails:${user._id}`)
  await redis.set(`sellerDetails:${user._id}`,seller)
  await redis.expire(`sellerDetails:${user._id}`,600)
  return res
    .status(200)
    .json(new ApiResponse(200, seller, "Successfully updated seller details"));
});


const registerSeller = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  if(user.role === "admin"){
    throw new ApiError(401, "User is Already Admin");
  }
  const seller = await Seller.create({user : user._id})
  if (!seller) {
    throw new ApiError(400, "Seller Creation Failed");
  }
  user.role = "admin"
  user.save({validationBeforeSave : false})
  return res
    .status(200)
    .json(new ApiResponse(200, seller, "Successfully become seller"));
});

const getDashboardDetails = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  if(user.role !== "admin"){
    throw new ApiError(401, "User is not Admin");
  }
  const cachedDashboardReport = await redis.get(`sellerDashboardReport:${user._id}`);
  if(cachedDashboardReport){
    return res
    .status(200)
    .json(new ApiResponse(200,JSON.parse(cachedDashboardReport),"Successfully get user")) 
  }
  const dashboardReport = await Order.aggregate(
    [
      {
        $unwind: {
          path: "$products",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $addFields: {
          product: {
            $first: "$product",
          },
        },
      },
      {
        $match: {
          "product.owner": new mongoose.Types.ObjectId(user._id)
        },
      },
      {
        $facet: {
          orderStatistics: [
            {
              $group: {
                _id: "$products.status",
                orders: {
                  $sum: 1,
                },
                price: {
                  $sum: "$products.price",
                },
              },
            },
            {
              $addFields: {
                succesOrders: {
                  $sum: {
                    $cond: {
                      if: {
                        $eq: ["$_id", "success"],
                      },
                      then: "$orders",
                      else: 0,
                    },
                  },
                },
              },
            },
            {
              $group: {
                _id: null,
                totalSales: {
                  $sum: "$succesOrders",
                },
                totalEarning: {
                  $sum: "$price",
                },
                totalOrders: {
                  $sum: "$orders",
                },
              },
            }
          ],
          topProducts: [
            {
              $group: {
                _id: "$products.product",
                totalTimeSelled: {
                  $sum: 1,
                },
                product: { $first: "$product" },
              },
            },
            {
              $lookup: {
                from: "productreviews",
                localField: "_id",
                foreignField: "product",
                as: "reviews"
              }
            },
            {
              $addFields: {
                averageRating: {
                  $avg: "$reviews.ratingStar"
                }
              }
            },
            {
              $addFields: {
                variety: { $first: "$product.variety" },
              },
            },
            {
              $addFields: {
                image: { $arrayElemAt: ["$variety.images", 0] },
                sizeOption: { $first: "$variety.sizeOptions" },
              },
            },
            {
              $project: {
                imageUrl: "$image.imageUrl",
                price: "$sizeOption.price.discountedPrice",
                title: "$product.title",
                totalTimeSelled: 1,
                averageRating: 1,
              },
            },
            {
              $sort: { totalTimeSelled: -1 },
            },
            {
              $limit: 5,
            },
          ],
           yearReport: [
            
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m",
                    date: "$createdAt",
                  },
                },
                orders: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
          ],
        },
      },
      {
        $project: {
          orderStatistics: { 
            $ifNull: [
              { $arrayElemAt: ["$orderStatistics", 0] },
              { totalSales: 0, totalEarning: 0, totalOrders: 0 }
            ]
          },
          topProducts: { $ifNull: ["$topProducts", []] },
          yearReport: { $ifNull: ["$yearReport", []] },
        },
      },
    ]
  )
  if (!dashboardReport) {
    throw new ApiError(400, "Dashboard Report Failed");
  }
  
  const formatedYearReport = applyMonthByDate(dashboardReport[0].yearReport);
  console.log(formatedYearReport);
  dashboardReport[0].yearReport = formatedYearReport;
  await redis.set(`sellerDashboardReport:${user._id}`,JSON.stringify(dashboardReport[0]));
  await redis.expire(`sellerDashboardReport:${user._id}`,600);
  return res
    .status(200)
    .json(new ApiResponse(200, dashboardReport[0], "Successfully get Dashboard Report"));
});

const getAnalyticsDetails = asyncHandler(async (req,res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  if(user.role !== "admin"){
    throw new ApiError(401, "User is not Admin");
  }
  const cachedAnalyticsReport = await redis.get(`sellerAnalyticsReport:${user._id}`);
  if(cachedAnalyticsReport){
    return res
    .status(200)
    .json(new ApiResponse(200,JSON.parse(cachedAnalyticsReport),"Successfully get user")) 
  }
  const analyticsReport = await Order.aggregate(
    [
      {
        $unwind: {
          path: "$products",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "products.product",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $addFields: {
          product: {
            $first: "$product",
          },
        },
      },
      {
        $match: {
          "product.owner": new mongoose.Types.ObjectId(user._id),
        },
      },
      {
        $lookup: {
          from: "payments",
          localField: "payment",
          foreignField: "_id",
          as: "payment",
        },
      },
      {
        $addFields: {
          payment: {
            $first: "$payment",
          },
        },
      },
      {
        $facet: {
          lastWeekOrders: [
            {
              $match: {
                createdAt: {
                  $gt: new Date(
                    new Date().setDate(
                      new Date().getDate() - 7
                    )
                  ),
                  $lt: new Date(),
                },
              },
            },
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m-%d",
                    date: "$createdAt",
                  },
                },
                count: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
          ],
          paymentChart: [
            {
              $group: {
                _id: "$payment.paymentMethod",
                count: { $sum: 1 },
              },
            },
          ],
          topSellingCategory: [
            {
              $group: {
                _id: "$product.category",
                count: { $sum: 1 },
              },
            },
          ],
          revenueMargin: [
            {
              $group: {
                _id: {
                  $dateToString: {
                    format: "%Y-%m",
                    date: "$createdAt",
                  },
                },
                margin: {
                  $sum: {
                    $multiply: [
                      {
                        $ifNull: [
                          "$products.price",
                          0,
                        ],
                      },
                      "$products.quantity",
                    ],
                  },
                },
                revenue: {
                  $sum: {
                    $multiply: [
                      {
                        $ifNull: [
                          "$products.costPrice",
                          0,
                        ],
                      },
                      "$products.quantity",
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    ]
  )
  await redis.set(`sellerAnalyticsReport:${user._id}`,JSON.stringify(analyticsReport));
  await redis.expire(`sellerAnalyticsReport:${user._id}`,600);

  return res
  .status(200)
  .json(new ApiResponse(200, analyticsReport, "Successfully get analyticsReport Report"));
})

export const applyMonthByDate = (data) => {
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const months = monthNames.reduce((acc, month) => ({ ...acc, [month]: 0 }), {});

  if (!data.length) return monthNames.map(name => ({ name, value: 0 }));
  
  data.forEach((date) => {
    const monthIndex = date._id.slice(5); 
    months[monthNames[monthIndex]] += date.orders; 
  });

  return monthNames.map(name => ({ name, value: months[name] }));
};