import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User",
        index : true
    },
    addresses : [{
        _id : {
            type : mongoose.Types.ObjectId,
            // auto : true does not need to write auto it automatically generates id
        },
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        postalCode: {
            type: Number,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
});

const Address = mongoose.model('Address', addressSchema);

export default Address;