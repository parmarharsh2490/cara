import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
    {
        order: {
            type: mongoose.Types.ObjectId,
            ref: "Order",
            required: true
        },
        razorpayOrderId: {
            type: String,
            required: true
        },
        razorpayPaymentId: {
            type: String,
        },
        razorpaySignature: {
            type: String,
        },
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: "INR"
        },
        status: {
            type: String,
            enum: ["pending", "success", "failed"],
            default: "pending"
        },
    },
    {
        timestamps: true
    }
);

export const Payment = mongoose.model("Payment",paymentSchema)