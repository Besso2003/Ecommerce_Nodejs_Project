import { Router } from "express"
import {addToCart, removeCartItem, getCart, updateCart, clearCart} from "../Controller/Cart.Controller.js" // ✅ add .js
import validateToken from "../MiddleWare/validateToken.js";
const router = Router(); 

router.use(validateToken)
router.get("/cart", getCart);
router.post("/addtocart", addToCart);
router.delete("/removefromcart/:productId", removeCartItem);
router.put("/updatecart/:productId", updateCart);
router.delete("/clearcart", clearCart);

export default router;