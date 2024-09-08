import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
    {
        user : {
            type : mongoose.Types.ObjectId,
            ref : "User"
        },
        products : [
        {
            product : {
                type :  mongoose.Types.ObjectId,
                ref : "Product"
            },
            quantity : {
                type : Number,
                required : true,
                default : 1
            }
        }
    ]
    },
    {
        timestamps : true
    }
)

export const Cart = mongoose.model("Cart",cartSchema)