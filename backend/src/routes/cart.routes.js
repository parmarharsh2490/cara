import Router from "express"
import { addToCart, removeFromCart, updateQuantity } from "../controller/cart.controller.js";

const cartRouter = Router();

cartRouter.get('/',getUserCart)
cartRouter.post('/add/:productId',addToCart)
cartRouter.patch('/remove/:productId',removeFromCart)
cartRouter.patch('/update/:productId',updateQuantity)

export default cartRouter

