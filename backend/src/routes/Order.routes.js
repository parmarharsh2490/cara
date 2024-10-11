import { Router } from "express";
import { createOrder, getAdminOrders, getUserOrders, updateOrderStatus, verifyOrder } from "../controller/Order.controller.js";

const orderRouter = Router();

orderRouter.get('/',getUserOrders )
orderRouter.get('/seller',getAdminOrders )
orderRouter.patch('/update',updateOrderStatus )
orderRouter.post('/create-order',createOrder)
orderRouter.post('/verify-payment',verifyOrder)

export default orderRouter