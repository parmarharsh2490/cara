import mongoose from "mongoose";

const paymentWalletTransactionsSchema = new mongoose.Schema(
  {
    status: {
      type: String, 
      enum: ["success", "processing", "failed"],
      default: "processing",
      required: true,
    },
    amount: {
      type: Number, 
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const paymentWalletSchema = mongoose.Schema({
  user : {
    type : mongoose.Types.ObjectId,
    ref : "User",
    index : true,
    unique : true
  },
  currentBalance: {
    type: Number,
    required: true,
  },
  paymentWalletTransactions: [paymentWalletTransactionsSchema], 
});

const PaymentWallet = mongoose.model("PaymentWallet", paymentWalletSchema);

export default PaymentWallet
