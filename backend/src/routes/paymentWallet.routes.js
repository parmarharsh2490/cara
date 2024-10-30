import { Router } from "express";
import { getPaymentWalletDetails, withdrawAmount } from "../controller/paymentWallet.controller.js";

const paymentWalletRouter = Router();

paymentWalletRouter.get('/', getPaymentWalletDetails);
paymentWalletRouter.patch('/withdraw', withdrawAmount);

export {
    paymentWalletRouter
};
