import crypto from 'crypto';
import { Razorpay_Instance, RAZORPAY_KEY_SECRET } from '../constants.js';
import Order from '../model/Order.model.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import { Payment } from '../model/Payment.model.js';
import { Cart } from '../model/Cart.model.js';
import ApiError from '../utils/ApiError.js';
import mongoose from 'mongoose';
import { Product } from '../model/Product.model.js';


export const createOrder = asyncHandler(async (req, res) => {
  const { amount } = req.body;
  const user = req.user;

  if (!amount || isNaN(amount)) {
    throw new ApiError(400, "Invalid amount provided");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ user: user._id }).populate("products.product", "variety");
    if (!cart || cart.products.length === 0) {
      throw new ApiError(400, "Cart is empty");
    }
    
    let realAmount = 0;
    const cartProducts = [];

    for (const item of cart.products) {
      const { product, variety, sizeOption, quantity } = item;
      const selectedVariety = product.variety.find(v => v._id.toString() === variety.toString());
      const selectedSizeOption = selectedVariety.sizeOptions.find(s => s._id.toString() === sizeOption.toString());

      if (selectedSizeOption.stock < quantity) {
        throw new ApiError(400, `Not enough stock for product: ${product.title}`);
      }

      realAmount += parseFloat(selectedSizeOption.price.discountedPrice) * quantity;
      cartProducts.push({
        product: product._id,
        varietyId: variety,
        sizeOptionId: sizeOption,
        quantity,
        price: selectedSizeOption.price.discountedPrice
      });

      // Reserve stock
      selectedSizeOption.stock -= quantity;
      await product.save({ session });
    }

    realAmount = Math.round(realAmount * 100) / 100;

    if (Math.abs(realAmount - amount) > 0.01) {
      throw new ApiError(400, "Product Amount Mismatched");
    }

    const options = {
      amount: Math.round(realAmount * 100),
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    };
    const razorpayOrder = await Razorpay_Instance.orders.create(options);
    if (!razorpayOrder) {
      throw new ApiError(500, "Razorpay Order Creation Failed");
    }

    const userOrder = await Order.create([{
      user: user._id,
      status: "processing",
      products: cartProducts,
      totalAmount: realAmount
    }], { session });

    const payment = await Payment.create([{
      order: userOrder[0]._id,
      razorpayOrderId: razorpayOrder.id,
      amount: Math.round(realAmount * 100),
      currency: "INR",
      status: "pending"
    }], { session });

    userOrder[0].payment = payment[0]._id;
    await userOrder[0].save({ session });

    await session.commitTransaction();
    res.status(200).json(new ApiResponse(200, { orderId: razorpayOrder.id }, "Order created successfully"));
  } catch (error) {
    await session.abortTransaction();
    throw new ApiError(500, "Creating order failed: " + error.message);
  } finally {
    session.endSession();
  }
});

export const verifyOrder = asyncHandler(async (req, res) => {
  const user = req.user;
  const { amount, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  console.log({ amount, razorpay_order_id, razorpay_payment_id, razorpay_signature });
  
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    throw new ApiError(400, "Missing required payment information");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const shasum = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET);
    shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = shasum.digest('hex');

    const payment = await Payment.findOne({ razorpayOrderId: razorpay_order_id }).session(session);
    if (!payment) {
      throw new ApiError(404, "Payment not found");
    }

    const order = await Order.findOne({ payment: payment._id, user: user._id }).session(session);
    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    if (digest === razorpay_signature) {
      payment.razorpayPaymentId = razorpay_payment_id;
      payment.razorpaySignature = razorpay_signature;
      payment.status = "success";
      order.status = "success";

      const cart = await Cart.findOne({ user: user._id }).session(session);
      cart.products = [];
      await cart.save({ session });

      await payment.save({ session });
      await order.save({ session });

      await session.commitTransaction();
      res.status(200).json(new ApiResponse(200, order, "Order successful"));
    } else {
      payment.status = "failed";
      order.status = "failed";

      // Revert stock changes
      for (const item of order.products) {
        const product = await Product.findById(item.product).select("variety").session(session);
        const variety = product.variety.id(item.varietyId);
        const sizeOption = variety.sizeOptions.id(item.sizeOptionId);
        sizeOption.stock += item.quantity;
        await product.save({ session });
      }

      await payment.save({ session });
      await order.save({ session });

      await session.commitTransaction();
      throw new ApiError(400, "Payment verification failed");
    }
  } catch (error) {
    await session.abortTransaction();
    throw new ApiError(500, "Order verification failed: " + error.message);
  } finally {
    session.endSession();
  }
});

export const getUserOrders = asyncHandler(async (req, res) => {
  const user = req.user;
  let { skip = 0, limit = 10 } = req.query;
  skip = parseInt(skip);
  limit = parseInt(limit);
  if (isNaN(skip) || skip < 0) {
    return res.status(400).json(new ApiResponse(400, null, "Invalid skip value"));
  }

  if (isNaN(limit) || limit <= 0) {
    return res.status(400).json(new ApiResponse(400, null, "Invalid limit value"));
  }

  const orders = await Order.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(user._id),
      },
    },
    {
      $unwind: {
        path: "$products",
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
      $limit: limit, 
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
        product: { $first: "$product" },
        variety: {
          $first: {
            $filter: {
              input: "$product.variety",
              as: "vary",
              cond: { $eq: ["$$vary._id", "$products.varietyId"] },
            },
          },
        },
        sizeOption: {
          $first: {
            $filter: {
              input: "$variety.sizeOptions",
              as: "sp",
              cond: { $eq: ["$$sp._id", "$products.sizeOptionId"] },
            },
          },
        },
        image: { $first: "$variety.images" },
      },
    },
    {
      $project: {
        title: "$product.title",
        color: "$variety.color",
        size: "$sizeOption.size",
        quantity: "$products.quantity",
        imageUrl: "$image.imageUrl",
        paymentId: "$products.payment",
        price: "$products.price",
        createdAt: 1,
      },
    },
  ]);
  if(!orders || orders.length==0){
    return res.status(404).json(new ApiResponse(404, null, "No orders found for this user"));
  }
  return res.status(200).json(new ApiResponse(200, orders, "Successfully retrieved user orders"));
});
