import { Router } from "express"
import { createAddress, deleteAddress, getUserAddress, updateAddress } from "../controller/address.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const addressRouter = Router();

addressRouter.get('/',getUserAddress)
addressRouter.post('/create',upload.none(),createAddress)
addressRouter.delete('/delete',deleteAddress)
addressRouter.patch('/update',updateAddress)

export default addressRouter