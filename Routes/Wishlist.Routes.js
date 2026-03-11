import express from "express";
import validateToken from "../MiddleWare/validateToken.js";
import { addProductToWishlist, deleteProductFromWishlist, getUserWishlist } from "../Controller/Wishlist.Controller.js";



const wishlistRouter = express.Router();




wishlistRouter.use(validateToken)

wishlistRouter.post("/add-product-to-wishlist",addProductToWishlist)
wishlistRouter.put("/remove-product-from-wishlist",deleteProductFromWishlist)
wishlistRouter.get("/get-user-wishlist",getUserWishlist)





export default wishlistRouter