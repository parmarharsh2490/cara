import { Router } from "express";
import { getUserWishlist, addToWishlist, removeFromWishlist, getUserWishlistCount } from "../controller/Wishlist.controller.js";

const wishListRouter = Router();

wishListRouter.post('/add', addToWishlist);
wishListRouter.delete('/remove/:wishlistId', removeFromWishlist);
wishListRouter.get('/', getUserWishlist);
wishListRouter.get('/count', getUserWishlistCount);

export default wishListRouter;
