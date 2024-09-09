import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getProductDetails, updateProduct } from "../controller/Product.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const productRouter = Router();

productRouter.get('/',getAllProducts)
productRouter.get('/:productId',getProductDetails) //done
productRouter.post('/create',upload.any("image1","image2"),createProduct) //done
productRouter.patch('/update/:productId',updateProduct) //done
productRouter.delete('/delete/:productId',deleteProduct) //done

export default productRouter