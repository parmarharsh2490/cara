import {Router} from "express"
import { getSellerDetails, registerSeller, updateSellerDetails } from "../controller/Seller.controller.js"
const sellerRouter = Router()

sellerRouter.get('/',getSellerDetails)
sellerRouter.post('/register',registerSeller)
sellerRouter.patch('/update',updateSellerDetails)

export default sellerRouter