import {Router} from "express"

import { getUserWishlist, toggleWishlist } from "../controller/Wishlist.controller.js"
const wishListRouter = Router()

wishListRouter.post('/:productId',toggleWishlist)
wishListRouter.get('/user',getUserWishlist)
export default wishListRouter