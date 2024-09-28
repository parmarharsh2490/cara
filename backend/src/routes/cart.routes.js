import Router from "express"
import { addToCart, getUserCart, removeFromCart, updateQuantity } from "../controller/cart.controller.js";

const cartRouter = Router();

cartRouter.get('/',getUserCart)
cartRouter.post('/add',addToCart)
cartRouter.delete('/remove',removeFromCart)
cartRouter.patch('/update',updateQuantity)

export default cartRouter

