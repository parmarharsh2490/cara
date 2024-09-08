import { Router } from "express"
import { createAddress, deleteAddress, getUserAddresses, updateAddress } from "../controller/address.controller.js";

const addressRouter = Router();

addressRouter.post('/create',createAddress)
addressRouter.delete('/delete/:addressId',deleteAddress)
addressRouter.patch('/update/:addressId',updateAddress)
addressRouter.get('/',getUserAddresses)

export default addressRouter