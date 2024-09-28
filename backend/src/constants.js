import dotenv from "dotenv";
import Razorpay from 'razorpay';
dotenv.config();
export const Mongo_DB_URL = process.env.MONGODB_URL
export const PORT = process.env.PORT;
export const cookieOptions = { httpOnly: true, secure: false, sameSite: 'Lax' }
export const ACCESS_TOKEN_SECRET_KEY=process.env.ACCESS_TOKEN_SECRET_KEY
export const ACCESS_TOKEN_EXPIRY=process.env.ACCESS_TOKEN_EXPIRY_DATE
export const REFRESH_TOKEN_SECRET_KEY=process.env.REFRESH_TOKEN_SECRET_KEY
export const REFRESH_TOKEN_EXPIRY=process.env.REFRESH_TOKEN_EXPIRY_DATE
export const BCRYPT_SORTORROUNDS=process.env.BCRYPT_SORTORROUNDS 
export const CLOUD_NAME=process.env.CLOUD_NAME 
export const CLOUDINARY_API_KEY=process.env.CLOUDINARY_API_KEY 
export const CLOUDINARY_API_SECRET=process.env.CLOUDINARY_API_SECRET
export const RAZORPAY_API_KEY_ID= process.env.RAZORPAY_API_KEY_ID
export const RAZORPAY_KEY_SECRET= process.env.RAZORPAY_KEY_SECRET
export const Razorpay_Instance = new Razorpay({
    key_id: RAZORPAY_API_KEY_ID, 
    key_secret: RAZORPAY_KEY_SECRET
  });
console.log("Razorpay Instance");
console.log(Razorpay_Instance);
console.log(RAZORPAY_KEY_SECRET);
