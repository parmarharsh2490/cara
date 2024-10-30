import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET_KEY,
  BCRYPT_SORTORROUNDS,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET_KEY,
} from "../constants.js";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    mobileNumber: {
      type: String,
      match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number.'],
    },
    alternativeNumber: {
      type: String,
      match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number.'],
    },
    dateOfBirth: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    // address : [{
    //   type : mongoose.Schema.Types.ObjectId(),
    //   ref : "Address"
    // }]
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(
      this.password,
      parseInt(BCRYPT_SORTORROUNDS)
    );
  }
  next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const accessToken = Jwt.sign(
    {
      data: {
        _id: this._id,
        name: this.name,
        email: this.email,
      },
    },
    ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
  if (!accessToken) {
    throw new ApiError(400, "Generating Access Token failed");
  }
  return accessToken;
};

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = Jwt.sign(
    {
      data: {
        name: this.name,
        email: this.email,
      },
    },
    REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );
  if (!refreshToken) {
    throw new ApiError(400, "Generating Refresh Token failed");
  }
  return refreshToken;
};

const User = mongoose.model("User", userSchema);

export default User;
