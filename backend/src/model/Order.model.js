import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    payment: {
        type: mongoose.Types.ObjectId,
        ref: "Payment"
    },
    products: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
            required: true
        },
        seller: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        sizeOptionId: {
            type: mongoose.Types.ObjectId,
        },
        varietyId: {
            type: mongoose.Types.ObjectId,
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {      
            type: Number,
            required: true
        },
        costPrice: {      
            type: Number,
            required: true
        },
        orderDate : {
            type : String
        },
        status: {
            type: String,
            enum: ["success", "failed", "processing"],
            default: "processing"
        }
    }],
    overallStatus: { 
        type: String,
        enum: ["success", "failed", "processing"],
        default: "processing"
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
