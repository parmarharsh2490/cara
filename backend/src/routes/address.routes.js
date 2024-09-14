import { Router } from "express"
import { createAddress, deleteAddress, getUserAddress, updateAddress } from "../controller/address.controller.js";

const addressRouter = Router();

addressRouter.post('/create',createAddress)
addressRouter.delete('/delete',deleteAddress)
addressRouter.patch('/update',updateAddress)
addressRouter.get('/',getUserAddress)

export default addressRouter