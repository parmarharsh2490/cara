import { isValidObjectId } from "mongoose";
import { cookieOptions } from "../constants.js";
import User from "../model/User.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js"
import otpGenerator from "otp-generator"
import { getTransporter } from "../utils/email.js";



const generateAccessAndRefreshToken = (user) => {
   try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    if(!accessToken || !refreshToken){
        throw new ApiError(400,"Generating Access Token and Refresh Token failed");
    };
    return {
        accessToken,
        refreshToken
    }
   } catch (error) {
    console.log(error);
   }
}

const registerUser = asyncHandler(async(req,res) => {
        const {name,email,password} = req.body;
        if([name,email,password].some((entry) => entry.trim() === "")){
            throw new ApiError(400,"Entry fileds should not be empty");
        };
        const alreadyExitUser = await User.find({email});
        if(!alreadyExitUser.length == 0){
            throw new ApiError(400,"User Already Exit Via Email")
        }
        const user = await User.create({
            name,
            email,
            password,
        });
        if(!user){
            throw new ApiError(400,"Creating User failed");
        }
        const {accessToken,refreshToken} = generateAccessAndRefreshToken(user);
        if(!accessToken || !refreshToken){
            throw new ApiError(400,"Creating Acess Token and Refresh Token failed");
        }

        user.refreshToken = refreshToken;
        await user.save({validationBeforeSave : false});
        return res
        .status(200)
        .cookie("accessToken",accessToken,cookieOptions)
        .cookie("refreshToken",refreshToken,cookieOptions)
        .json(new ApiResponse(200,user,"Successfully created User"))
})

const loginUser = asyncHandler(async(req,res) => {
    const {email,password} = req.body;
    if(!email || !password){
        throw new ApiError(400,"Entry fileds should not be empty");
    }
    const user = await User.findOne({
        email
    });
    if(!user){
        throw new ApiError(400,"User not found by this email address");
    }
    const correctPassword = user.checkPassword(password);
    if(!correctPassword){
        throw new ApiError(401,"Password is not correct");
    };
    const {accessToken,refreshToken} = generateAccessAndRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save({validationBeforeSave : false});
    return res
    .status(200)
    .cookie("accessToken",accessToken,cookieOptions)
    .cookie("refreshToken",refreshToken,cookieOptions)
    .json(new ApiResponse(200,user,"Successfully login User"))
});

const logoutUser = async(req,res) => {
    return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200,[],"Successfully logout User"))
}

const forgetPassword = async(req,res) => {
    const {email} = req.body;
    if(!email){
        throw new ApiError(400,"Entry fileds should not be empty");
    }
    const user = await User.findOne({
        email
    });
    if(!user){
        throw new ApiError(400,"User not found by this email address");
    };
    const transporter = await getTransporter();
    const otp = parseInt(otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false }));
    const expiry = new Date(Date.now() + 15 * 60 * 1000);
    await transporter.sendMail({
      from: `"Cara" <${process.env.NODEMAILER_AUTH_USER}>`,
      to: {email}, // list of receivers
      subject: "Forget Password",
      text: `"This is your otp to forget password ${otp}"`, // plain text body
      html: `<b>This is your otp to forget password ${otp}</b>`, // html body
    });
    await Otp.create({ email, otp, expiry });
    return res
    .status(200)
    .json(new ApiResponse(200,user,"Successfully send otp to your mail"))
}

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
      throw new ApiError(400, "Email and OTP are required");
    }
  
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      throw new ApiError(400, "Invalid OTP");
    }
  
    if (new Date() > otpRecord.expiry) {
      await Otp.deleteOne({ email, otp });
      throw new ApiError(400, "OTP has expired");
    }
  
    await Otp.deleteOne({ email, otp });
  
    return res.status(200).json(new ApiResponse(200, null, "OTP verified successfully"));
};


const changePassword = asyncHandler(async(req,res) => {
     const {email,oldPassword,newPassword} = req.body;
     if(!email || !oldPassword || !newPassword){
         throw new ApiError(400,"Entry fileds should not be empty");
     }
     if(oldPassword === newPassword){
         throw new ApiError(400,"New Password and Old Password must not be same");
     }
     const user = await User.findOne({
         email
     });
     if(!user){
         throw new ApiError(400,"User not found by this email address");
     }
     const correctPassword = user.checkPassword(oldPassword);
     if(!correctPassword){
        throw new ApiError(401,"Password is not correct");
     };
     user.password = newPassword;
     await user.save({validationBeforeSave : false});
     return res
     .status(200)
     .json(new ApiResponse(200,user,"Successfully changed password"))
});

const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      throw new ApiError(400, "Email and new password are required");
    }
  
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "User not found");
    }
  
    user.password = newPassword;
    await user.save();
  
    return res.status(200).json(new ApiResponse(200, null, "Password reset successfully"));
};
  

const getUserDetails = async(req,res) => {
    const user = req.user;
    if(!user){
        throw new ApiError(401,"User not found");
    }
    return res
    .status(200)
    .json(new ApiResponse(200,user,"Successfully get user"))
}

const updateUserDetails = asyncHandler(async (req, res) => {
    const { fullName, contactNumber, alternativeNumber, dateOfBirth, gender } = req.body;
    console.log(fullName, contactNumber, alternativeNumber, dateOfBirth, gender);
    
    const updatedFields = {};
    if (fullName) {
        updatedFields.name = fullName;
    }
    if (contactNumber) {
        updatedFields.mobileNumber = contactNumber;
    }
    if (alternativeNumber) {
        updatedFields.alternativeNumber = alternativeNumber;
    }
    if (dateOfBirth) {
        updatedFields.dateOfBirth = dateOfBirth;
    }
    if (gender) {
        updatedFields.gender = gender;
    }

    if (Object.keys(updatedFields).length === 0) {
        throw new ApiError(400, "No fields to update.");
    }
    
    const user = await User.findByIdAndUpdate(
        req.user._id, 
        updatedFields, 
        { new: true, runValidators: true }
    ).select("-createdAt -updatedAt -refreshToken -password");

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    return res.status(200).json(new ApiResponse(200, user, "Successfully updated user."));
});


export {
    generateAccessAndRefreshToken,
    registerUser,
    loginUser,
    logoutUser,
    forgetPassword,
    resetPassword,
    changePassword,
    getUserDetails,
    updateUserDetails,
    verifyOtp
}