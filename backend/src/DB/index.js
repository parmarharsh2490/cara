import mongoose from "mongoose";
import { Mongo_DB_URL } from "../constants.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(Mongo_DB_URL);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Use exit code 1 to indicate an error
  }
};
