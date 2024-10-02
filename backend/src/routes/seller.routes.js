import {Router} from "express"
import { getAnalyticsDetails, getDashboardDetails, getSellerDetails, registerSeller, updateSellerDetails } from "../controller/Seller.controller.js"
const sellerRouter = Router()

sellerRouter.get('/',getSellerDetails)
sellerRouter.post('/register',registerSeller)
sellerRouter.patch('/update',updateSellerDetails)
sellerRouter.patch('/update',updateSellerDetails)
sellerRouter.get('/dashboard',getDashboardDetails)
sellerRouter.get('/analytics',getAnalyticsDetails)

export default sellerRouter