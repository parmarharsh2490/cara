import dotenv from "dotenv";
import Razorpay from 'razorpay';
dotenv.config();
export const Mongo_DB_URL = process.env.MONGODB_URL
export const PORT = process.env.PORT;
export const cookieOptions = { httpOnly: true, secure: true, sameSite: "None", maxAge: 7 * 24 * 60 * 60 * 1000   }
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
   if (!RAZORPAY_API_KEY_ID || !RAZORPAY_KEY_SECRET) {
     console.error("Razorpay API keys are not set in the environment variables.");
     process.exit(1);
   }

   let Razorpay_Instance;

   try {
     Razorpay_Instance = new Razorpay({
       key_id: RAZORPAY_API_KEY_ID,
       key_secret: RAZORPAY_KEY_SECRET
     });
   } catch (error) {
     console.error("Error initializing Razorpay:", error.message);
     process.exit(1);
   }

   export { Razorpay_Instance };
