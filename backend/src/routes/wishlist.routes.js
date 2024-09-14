import { Router } from "express";
import { getUserWishlist, addToWishlist, removeFromWishlist } from "../controller/Wishlist.controller.js";

const wishListRouter = Router();

wishListRouter.post('/add/:productId', addToWishlist);
wishListRouter.delete('/remove/:productId', removeFromWishlist);
wishListRouter.get('/', getUserWishlist);

export default wishListRouter;
