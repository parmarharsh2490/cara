import mongoose from "mongoose";

const promotionalSchema = mongoose.Schema({
    email : {
        type : String,
        require : true,
        validate: {
            validator: (email) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            },
            message: 'Invalid email format',
        },
    }
})

export const Promotional = mongoose.model("Promotional",promotionalSchema)