import { Router } from "express";
import { createProductReview, deleteProductReview, getAverageProductReview, updateProductReview } from "../controller/ProductReview.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const productReviewRouter = Router();

productReviewRouter.get("/:productId",getAverageProductReview)
productReviewRouter.post("/create/:productId",upload.single("reviewImage"),createProductReview)
productReviewRouter.patch("/update/:productId",upload.single("reviewImage"),updateProductReview)
productReviewRouter.delete("/delete/:productReviewId",deleteProductReview)

export default productReviewRouter