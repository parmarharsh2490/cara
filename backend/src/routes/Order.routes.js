import { Router } from "express";
import { createOrder, verifyOrder } from "../controller/Order.controller.js";

const orderRouter = Router();

orderRouter.post('/create-order',createOrder)
orderRouter.post('/verify-payment',verifyOrder)

export default orderRouter