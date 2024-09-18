import { Router } from "express";
import { getUserWishlist, addToWishlist, removeFromWishlist } from "../controller/Wishlist.controller.js";

const wishListRouter = Router();

wishListRouter.post('/add', addToWishlist);
wishListRouter.delete('/remove', removeFromWishlist);
wishListRouter.get('/', getUserWishlist);

export default wishListRouter;
