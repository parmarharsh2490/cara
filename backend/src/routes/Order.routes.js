import { Router } from "express";
import { createOrder, verifyOrder } from "../controller/Order.controller.js";

const orderRouter = Router();

orderRouter.post('/',createOrder)
orderRouter.post('/',verifyOrder)

export default orderRouter