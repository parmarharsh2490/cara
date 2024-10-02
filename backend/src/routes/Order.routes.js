import { Router } from "express";
import { createOrder, getUserOrders, verifyOrder } from "../controller/Order.controller.js";

const orderRouter = Router();

orderRouter.get('/',getUserOrders)
orderRouter.post('/create-order',createOrder)
orderRouter.post('/verify-payment',verifyOrder)

export default orderRouter