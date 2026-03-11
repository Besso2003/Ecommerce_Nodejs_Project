import express from "express";
import validateToken from "../MiddleWare/validateToken.js";
import { addProductToWishlist, deleteProductFromWishlist } from "../Controller/Wishlist.Controller.js";



const wishlistRouter = express.Router();




wishlistRouter.use(validateToken)

wishlistRouter.post("/add-product-to-wishlist",addProductToWishlist)
wishlistRouter.put("/remove-product-from-wishlist",deleteProductFromWishlist)





export default wishlistRouter