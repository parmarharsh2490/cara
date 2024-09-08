import dotenv from "dotenv";
dotenv.config();
export const Mongo_DB_URL = process.env.MONGODB_URL
export const PORT = process.env.PORT;
export const cookieOptions = { httpOnly: true, secure: true }
export const ACCESS_TOKEN_SECRET_KEY=process.env.ACCESS_TOKEN_SECRET_KEY
export const ACCESS_TOKEN_EXPIRY=process.env.ACCESS_TOKEN_EXPIRY_DATE
export const REFRESH_TOKEN_SECRET_KEY=process.env.REFRESH_TOKEN_SECRET_KEY
export const REFRESH_TOKEN_EXPIRY=process.env.REFRESH_TOKEN_EXPIRY_DATE
export const BCRYPT_SORTORROUNDS=process.env.BCRYPT_SORTORROUNDS 