import { Router } from "express";
import { changePassword, forgetPassword, getUserDetails, loginUser, logoutUser, registerUser, resetPassword, updateUserDetails, verifyOtp } from '../controller/User.controller.js';
import { verifyJWT } from "../middleware/auth.middleware.js";
const userRouter = Router();
userRouter.get('/',verifyJWT,getUserDetails)
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/logout',logoutUser)
userRouter.post('/update',verifyJWT,updateUserDetails)
userRouter.post('/forgetpassword',forgetPassword)
userRouter.post('/otp/verify',verifyOtp)
userRouter.post('/resetpassword',resetPassword)
userRouter.post('/changepassword',changePassword)

export default userRouter