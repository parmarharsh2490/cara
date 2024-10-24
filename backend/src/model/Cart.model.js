import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
    {
        user : {
            type : mongoose.Types.ObjectId,
            ref : "User",
            required : true
        },
        products : [
        {
            product : {
                type :  mongoose.Types.ObjectId,
                ref : "Product"
            },
            sizeOption: {
                type: mongoose.Types.ObjectId,
                ref: "SizeOption"
              },              
            variety : {
                type: mongoose.Types.ObjectId,
                ref: "Variety"
              },              
            quantity : {
                type : Number,
                required : true,
                default : 1
            },
            seller : {
                type: mongoose.Types.ObjectId,
                ref: "User",
                required: true
            },
        }
    ]
    },
    {
        timestamps : true
    }
)

export const Cart = mongoose.model("Cart",cartSchema)