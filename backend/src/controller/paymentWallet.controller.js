import mongoose from "mongoose";
import PaymentWallet from "../model/PaymentWallet.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { redis } from "../index.js";

export { getPaymentWalletDetails, withdrawAmount };

const getPaymentWalletDetails = asyncHandler(async (req, res) => {
  const user = req.user;
  const { pageParam = 0 } = req.query;
  const limit = 15;
  let skip = pageParam * limit;
  if (isNaN(skip) || skip < 0) {
    throw new ApiError(400, "Invalid page parameter");
  }
  const redisData = await redis.get(`paymentWallet:${user._id}:pageParam:${pageParam}`);
  if(redisData){
    return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        JSON.parse(redisData),
        "Successfully received Payment-Wallet Details"
      )
    );
  }
  const paymentWalletDetails = await PaymentWallet.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(user._id),
      },
    },
    {
      $addFields: {
        processingBalance: {
          $sum: {
            $map: {
              input: {
                $filter: {
                  input: "$paymentWalletTransactions",
                  as: "transaction",
                  cond: { $eq: ["$$transaction.status", "processing"] },
                },
              },
              as: "processingTransaction",
              in: "$$processingTransaction.amount",
            },
          },
        },
        sortedTransactions: {
          $slice: [
            {
              $sortArray: {
                input: "$paymentWalletTransactions",
                sortBy: { createdAt: -1 },
              },
            },
            skip,
            limit,
          ],
        },
      },
    },
    {
      $project: {
        user: 1,
        currentBalance: 1,
        processingBalance: 1,
        paymentWalletTransactions: "$sortedTransactions",
      },
    },
  ]
  );

  if (!paymentWalletDetails  || (pageParam > 0 && paymentWalletDetails[0].paymentWalletTransactions.length === 0)) {
    throw new ApiError(400, "No Payment-Wallet Details Found");
  }
  
  await redis.set(`paymentWallet:${user._id}:pageParam:${pageParam}`,JSON.stringify(paymentWalletDetails))
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        paymentWalletDetails,
        "Successfully received Payment-Wallet Details"
      )
    );
});

const withdrawAmount = asyncHandler(async (req, res) => {
  const user = req.user;

  const paymentWallet = await PaymentWallet.findOne({ user: user._id });
  if (!paymentWallet) {
    throw new ApiError(400, "Cannot Withdraw - Payment Wallet not found");
  }

  const currentBalance = paymentWallet.currentBalance;
  if(currentBalance === 0){
    throw new ApiError(400,"Amount is 0.Cant Withdraw")
  }
  const updatedPaymentWallet = await PaymentWallet.findOneAndUpdate(
    { user: user._id },
    {
      $set: { currentBalance: 0 },
      $push: {
        paymentWalletTransactions: {
          status: "processing",
          amount: currentBalance,
        },
      },
    },
    { new: true }
  );

  if (!updatedPaymentWallet) {
    throw new ApiError(400, "Cannot Withdraw");
  }
  const paymentWalletKeys = await redis.keys(`paymentWallet:${user._id}:pageParam:*`);
  if (paymentWalletKeys.length > 0) {
    await redis.del(paymentWalletKeys);
  }
  return res
    .status(200)
    .json(new ApiResponse(200, updatedPaymentWallet, "Successfully Withdrawn"));
});
