import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getAllProducts2, getProductDetails, updateProduct } from "../controller/Product.controller.js";

const productRouter = Router();

productRouter.get('/',getAllProducts2)
productRouter.get('/:productId',getProductDetails) //done
productRouter.post('/create',createProduct) //done
productRouter.patch('/update/:productId',updateProduct) //done
productRouter.delete('/delete/:productId',deleteProduct) //done

export default productRouter