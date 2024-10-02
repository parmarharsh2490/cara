import { Router } from "express"
import { createAddress, deleteAddress, getUserAddress, updateAddress } from "../controller/address.controller.js";

const addressRouter = Router();

addressRouter.get('/',getUserAddress)
addressRouter.post('/create',createAddress)
addressRouter.delete('/delete',deleteAddress)
addressRouter.patch('/update',updateAddress)

export default addressRouter