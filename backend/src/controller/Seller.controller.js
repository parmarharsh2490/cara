import { redis } from "../index.js";
import Order from "../model/Order.model.js";
import { Payment } from "../model/Payment.model.js";
import PaymentWallet from "../model/PaymentWallet.model.js";
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
  await redis.set(`sellerDetails:${user._id}`,JSON.stringify(seller))
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
  const paymentWallet = await PaymentWallet.create({
    user : user._id,
    currentBalance : 0
  });
  if (!paymentWallet) {
    throw new ApiError(400, "PaymentWallet Creation Failed");
  }
  user.role = "admin"
  await user.save({validationBeforeSave : false})
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
                totalSuccessOrders: {
                  $sum: "$succesOrders",
                },
                totalEarning: {
                  $sum: "$price",
                },
                totalSales : {
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
                  $sum: "$products.quantity",
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
          totalVisitors: [
            {
              $group : {
                _id : null
              }
            },
       {
         $lookup: {
           from: "products",
           let: { userId: new mongoose.Types.ObjectId(user._id)  }, // Get the owner's ID
           pipeline: [

             {
               $group: {
                 _id: null,
                 totalVisitorCount: { $sum: "$visitorCount" }, // Sum visitorCount
               },
             },
             {
               $project: {
                 _id: 0,
                 totalVisitorCount: { $ifNull: ["$totalVisitorCount", 0] }, // Default to 0 if no products
               },
             },
           ],
           as: "ownerProducts", 
         },
       },
            {
         $project: {
           _id : 0,
           totalVisitorCount: "$ownerProducts.totalVisitorCount", // Select only the totalVisitorCount
         },
       },
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
          totalVisitors : 1
        },
      },
    ]
  )
  if (!dashboardReport) {
    throw new ApiError(400, "Dashboard Report Failed");
  }
  const formatedYearReport = applyMonthByDate(dashboardReport[0].yearReport);
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
                  $gt: new Date(new Date().setDate(new Date().getDate() - 7)),
                  $lt: new Date(),
                },
              },
            },
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                orders: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
            {
              $addFields: {
                dayOfWeek: {
                  $dayOfWeek: {
                    $dateFromString: { dateString: "$_id" },
                  },
                },
              },
            },
            {
              $project: {
                _id: 0,
                orders: 1,
                name: {
                  $arrayElemAt: [
                    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                    { $subtract: ["$dayOfWeek", 1] },
                  ],
                },
              },
            },
          ],
          paymentChart: [
            {
              $group: {
                _id: "$payment.paymentMethod",
                value: { $sum: 1 },
              },
            },
            {
              $project : {
                name : "$_id",
                _id : 0,
                value : 1
              }
            }
          ],
          topSellingCategory: [
            {
              $group: {
                _id: "$product.category",
                value: { $sum: 1 },
              },
            },
            {
              $project : {
                _id : 0,
                name : "$_id",
                value : 1
              }
            }
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
            {
              $project : {
                _id : 0,
                name : "$_id",
                margin : 1,
                revenue : 1
              }
            }
          ],
          selledProductRatings: [
            {
              $lookup: {
                from: "productreviews",
                localField: "products.product",
                foreignField: "product",
                as: "ratings",
              },
            },
            {
              $unwind: {
                path: "$ratings",
              },
            },
            {
              $group: {
                _id: "$ratings.ratingStar",
                value: {
                  $sum: 1,
                },
              },
            },
            {
              $sort : {
                _id : 1
              }
            },
            {
              $project: {
                value: 1,
                _id: 0,
                name: "$_id",
              },
            },
          ],
        },
      },
    ]
  )
  const colors = ["#C6E7FF","#B03052","#E6C767","#257180","#FF6500"]
   analyticsReport[0].selledProductRatings =  analyticsReport[0].selledProductRatings.map((item,index) => {
     return {
       ...item,
       color: colors[index]
    }
})
 
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
    const monthIndex = date._id.slice(5) - 1; 
    months[monthNames[monthIndex]] += date.orders; 
  });

  return monthNames.map(name => ({ name, value: months[name] }));
};