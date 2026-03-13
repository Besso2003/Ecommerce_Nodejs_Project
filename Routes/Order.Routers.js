import { Router } from "express"
import { orderPlacment } from "../Controller/Order.Controller.js" 
import validateToken from "../MiddleWare/validateToken.js";
const router = Router(); 

router.use(validateToken)
// router.get("/cart", getCart);
router.post("/placeorder", orderPlacment);
// router.delete("/removefromcart/:productId", removeCartItem);
// router.put("/updatequantity", updateItemQuantity);
// router.delete("/clearcart", clearCart);

export default router; 