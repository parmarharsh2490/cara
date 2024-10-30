import { Router } from "express";
import { createProduct, deleteProduct, getAdminProducts, getAllProducts, getProductDetails, getTopSelledProducts, updateProduct, viewProduct } from "../controller/Product.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const productRouter = Router();

productRouter.get('/',getAllProducts)
productRouter.get('/seller',getAdminProducts)
productRouter.get('/topProducts',getTopSelledProducts)
productRouter.get('/:productId',getProductDetails) //done
productRouter.post('/create',upload.any(),createProduct) //done
productRouter.patch('/update/:productId',upload.any(),updateProduct) //done
productRouter.patch('/view/:productId',viewProduct) //done
productRouter.delete('/delete/:productId',deleteProduct) //done

export default productRouter