import { Router } from "express";
import { changePassword, loginUser, logoutUser, registerUser } from '../controller/User.controller.js';
const userRouter = Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/logout',logoutUser)
// userRouter.post('/user/forgetpassword',getUserDetails)
// userRouter.post('/user/resetpassword',getUserDetails)
userRouter.post('/changepassword',changePassword)
// userRouter.get('/profile/:userId',getUserDetails)

export default userRouter