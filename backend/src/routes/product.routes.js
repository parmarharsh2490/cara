import { Router } from "express";
import { createProduct, deleteProduct, getAdminProducts, getAllProducts, getProductDetails, getTopSelledProducts, updateProduct, viewProduct } from "../controller/Product.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const productRouter = Router();

productRouter.get('/',getAllProducts)
productRouter.get('/seller', verifyJWT,getAdminProducts)
productRouter.get('/topProducts',getTopSelledProducts)
productRouter.get('/:productId',getProductDetails)
productRouter.post('/create',upload.any(), verifyJWT,createProduct) 
productRouter.patch('/update/:productId',upload.any(), verifyJWT, updateProduct) 
productRouter.patch('/view/:productId',viewProduct) 
productRouter.delete('/delete/:productId', verifyJWT,deleteProduct)

export default productRouter