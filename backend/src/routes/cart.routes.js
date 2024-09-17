import Router from "express"
import { addToCart, getUserCart, removeFromCart, updateQuantity } from "../controller/cart.controller.js";

const cartRouter = Router();

cartRouter.get('/',getUserCart)
cartRouter.post('/add',addToCart)
cartRouter.patch('/remove/:productId/:varietyId/:sizeOptionId',removeFromCart)
cartRouter.patch('/update/:productId',updateQuantity)

export default cartRouter

