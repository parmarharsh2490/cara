import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      businessInformation : {
        businessName: {
          type: String,
        },
        businessAddress: {
          type: String,
        }
      },
      legalInformation : {
        panNumber: {
          type: String,
        },
        aadharNumber: {
          type: String,
        },
        gstin: {
          type: String,
        }
      },
      bankAccountDetails: {
          bankName: {
              type : String,
          },
          ifscCode: {
              type : String,
          },
          accountNumber: {
              type : String,
          }
        },
    },
    { timestamps: true }
  );
  
const Seller = mongoose.model("Seller", sellerSchema);

export default Seller  