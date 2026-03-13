import { Router } from "express"
import { orderPlacment,getOrders,deleteOrder } from "../Controller/Order.Controller.js" 
import validateToken from "../MiddleWare/validateToken.js";
const router = Router(); 

router.use(validateToken)
router.get("/orders", getOrders);
router.post("/placeorder", orderPlacment);
// router.delete("/removefromcart/:productId", removeCartItem);
// router.put("/updatequantity", updateItemQuantity);
router.delete("/deleteorder/:orderId", deleteOrder);

export default router; 