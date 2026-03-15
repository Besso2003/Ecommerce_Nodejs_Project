import { Router } from "express"
import { orderPlacement,getOrders,deleteOrder,getOrderByStatus } from "../Controller/Order.Controller.js" 
import validateToken from "../MiddleWare/validateToken.js";
const router = Router(); 

router.use(validateToken)
router.get("/orders", getOrders);
router.get("/getbystatus/:status", getOrderByStatus);
router.post("/placeorder", orderPlacement);
router.delete("/deleteorder/:orderId", deleteOrder);

export default router; 