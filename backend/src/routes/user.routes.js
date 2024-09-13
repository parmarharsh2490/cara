import { Router } from "express";
import { changePassword, forgetPassword, getUserDetails, loginUser, logoutUser, registerUser, updateUserDetails } from '../controller/User.controller.js';
import { verifyJWT } from "../middleware/auth.middleware.js";
const userRouter = Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/logout',logoutUser)
userRouter.post('/update',verifyJWT,updateUserDetails)
userRouter.get('/',verifyJWT,getUserDetails)
userRouter.post('/forgetpassword',forgetPassword)
// userRouter.post('/user/resetpassword',getUserDetails)
userRouter.post('/changepassword',changePassword)
// userRouter.get('/profile/:userId',getUserDetails)

export default userRouter