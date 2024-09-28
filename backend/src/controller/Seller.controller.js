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
    registerSeller
}

const getSellerDetails = asyncHandler(async(req,res) => {
    const user = req.user;
    if(!user){
        throw new ApiError(401,"User not found");
    }
    const seller = await Seller.find({user : user._id}).populate("bankAccountDetails"); 
    if(!seller){
        throw new ApiError(400,"Seller Details not found")
    }
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
    throw new ApiError(401, "Updated Fields not found");
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
  return res
    .status(200)
    .json(new ApiResponse(200, seller, "Successfully updated seller details"));
});


const registerSeller = asyncHandler(async (req, res) => {
  const user = req.user;
  console.log(user);
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
  console.log(user);
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  if(user.role !== "admin"){
    throw new ApiError(401, "User is not Admin");
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
                _id: "$status",
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
            },
          ],
          topProducts: [
            {
              $group: {
                _id: "$products.product",
                totalTimeSelled: {
                  $sum: 1,
                },
                product: { $push: "$product" },
              },
            },
            {
              $addFields: {
                variety: {
                  $arrayElemAt: [
                    "$product.variety",
                    0,
                  ],
                },
              },
            },
            {
              $addFields: {
                variety: {
                  $first: "$variety",
                },
              },
            },
            {
              $addFields: {
                image: {
                  $arrayElemAt: [
                    "$variety.images",
                    0,
                  ],
                },
                sizeOption: {
                  $first: "$variety.sizeOptions",
                },
              },
            },
            {
              $project: {
                imageUrl: "$image.imageUrl",
                price:
                  "$sizeOption.price.discountedPrice",
                title: "$product.title",
                totalTimeSelled: 1,
              },
            },
            {
              $sort: { totalTimeSelled: -1 },
            },
            {
              $limit: 5,
            },
          ],
          weekReport: [
            {
              $match: {
                createdAt: {
                  $gt: new Date("2024-09-15"),
                  $lt: new Date("2024-09-23"),
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
        },
      },
    ]
  )
  if (!dashboardReport) {
    throw new ApiError(400, "Dashboard Report Failed");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, dashboardReport, "Successfully get Dashboard Report"));
});

const getAnalyticsDetails = asyncHandler(async (req,res) => {
  const user = req.user;
  console.log(user);
  if (!user) {
    throw new ApiError(401, "User not found");
  }
  if(user.role !== "admin"){
    throw new ApiError(401, "User is not Admin");
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
  return res
  .status(200)
  .json(new ApiResponse(200, analyticsReport, "Successfully get analyticsReport Report"));
})


export const applyMonthByDate = (data) => {
  const createMonth = (monthDate) => {
    let month;
    if(monthDate == 1){
      return "JANUARY"
    }
    else if(monthDate == 2){
      return "FEBRUARY"
    }
    else if(monthDate == 3){
      return "MARCH"
    }
    else if(monthDate == 4){
      return "APRIL"
    }
    else if(monthDate == 5){
      return "MAY"
    }
    else if(monthDate == 6){
      return "JUNE"
    }
    else if(monthDate == 7){
      return "JULY"
    }
    else if(monthDate == 8){
      return "AUGUST"
    }
    else if(monthDate == 9){
      return "SEPTEMBER"
    }
    else if(monthDate == 10){
      return "OCTOBER"
    }
    else if(monthDate == 11){
      return "NOVEMBER"
    }
    return "DECEMBER"
  };
  let months = {
    JANUARY : 0,
    FEBRUARY : 0,
    MARCH : 0,
    APRIL : 0,
    MAY : 0,
    JUNE : 0,
    JULY : 0,
    AUGUST : 0,
    SEPTEMBER : 0,
    OCTOBER : 0,
    NOVEMBER : 0,
    DECEMBER : 0,
  }
  data.map((data) => {
    let month = createMonth(data.month);
    months = {...months,[month] : data.orders}
  })
  return months;
}

const updateOrder = asyncHandler(async() => {
  const orders = await Order.find({});
  Promise.all(orders.map(async(order) => {
    order.products.map(async(product) => {
      product.costPrice = parseFloat(product.price*60/100)
    })
    await order.save({validationBeforeSave : false})
  }))
})
updateOrder()